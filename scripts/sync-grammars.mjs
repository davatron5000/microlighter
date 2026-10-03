#!/usr/bin/env node
// Precompile Shiki's source TextMate grammars (`@shikijs/langs`) into
// `src/grammars/*.js` with oniguruma-to-es, keeping the TextMate semantics
// the runtime scanner needs and that generic precompilation loses:
//
// - `\G` and `\A` anchors are emitted as variants, the way vscode-textmate
//   compiles them: one where the anchor may match and one where it never can
//   (`\uFFFF`). The scanner picks a variant by position.
// - `\N` backreferences in `end`/`while` refer to the *begin* match. They are
//   replaced by private-use markers before conversion so the scanner can
//   substitute the captured text without disturbing group numbering.
// - Each grammar is written once; embedded languages become `dependencies`
//   resolved by the runtime loader instead of being copied into every file.

import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { EmulatedRegExp, toRegExp } from "oniguruma-to-es";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(root, "node_modules/@shikijs/langs/dist");
const outputDirectory = path.join(root, "src/grammars");

export const BACKREFERENCE_OPEN = "\uE000";
export const BACKREFERENCE_CLOSE = "\uE001";
const NEVER = "\\uFFFF";

/**
 * Shiki's oniguruma-to-es options. `ES2024` uses the RegExp `v` flag, which
 * every browser with the CSS Custom Highlight API also supports (Chrome 112+,
 * Safari 17+, Firefox 116+). `singleline` is right because the scanner works
 * one line at a time.
 * @type {import("oniguruma-to-es").ToRegExpOptions}
 */
const regexOptions = {
  global: true,
  hasIndices: true,
  target: "ES2024",
  lazyCompileLength: 3000,
  rules: {
    allowOrphanBackrefs: true,
    asciiWordBoundaries: true,
    captureGroup: true,
    recursionLimit: 5,
    singleline: true
  }
};

const PATTERN_KEYS = ["match", "begin", "end", "while"];
// `displayName` and `aliases` are kept for scripts/sync-samples.mjs.
const GRAMMAR_KEYS = [
  "name", "displayName", "aliases", "scopeName", "patterns", "repository",
  "injections", "injectionSelector", "injectTo"
];

/**
 * Find unescaped `\A` / `\G` anchors in an Oniguruma pattern.
 * @param {string} pattern
 */
const findAnchors = pattern => {
  let A = false;
  let G = false;
  for (let index = 0; index < pattern.length; index++) {
    if (pattern[index] !== "\\") continue;
    if (pattern[index + 1] === "A") A = true;
    if (pattern[index + 1] === "G") G = true;
    index++;
  }
  return { A, G };
};

/**
 * Replace unescaped `\A` / `\G` with a character that never occurs in text.
 * @param {string} pattern
 * @param {string} anchors Letters to disable.
 */
const disableAnchors = (pattern, anchors) =>
  pattern.replace(/\\(.)/gs, (escape, letter) => anchors.includes(letter) ? NEVER : escape);

/** Compiled regex source code, emitted verbatim by `serialize`. */
class Code {
  /** @param {string} text */
  constructor(text) {
    this.text = text;
  }
}

/**
 * @typedef {object} Compiled
 * @property {string[]} failures Patterns that could not be converted.
 * @property {boolean} emulated Whether any regex needs `EmulatedRegExp`.
 */

/**
 * Compile one TextMate pattern to JavaScript source: a regex literal, an
 * `EmulatedRegExp` construction, or an anchored variant set of those.
 * @param {string} pattern
 * @param {string} key Rule key the pattern came from.
 * @param {Compiled} compiled
 * @returns {Code | Record<string, Code[]> | null}
 */
const compilePattern = (pattern, key, compiled) => {
  if (key === "end" || key === "while") {
    // Mirrors vscode-textmate's `\\(\d+)` scan, escaped backslashes included.
    pattern = pattern.replace(/\\(\d+)/g, `${BACKREFERENCE_OPEN}$1${BACKREFERENCE_CLOSE}`);
  }

  /** @param {string} source */
  const convert = source => {
    const regex = toRegExp(source, regexOptions);
    if (source.includes(BACKREFERENCE_OPEN) && !regex.source.includes(BACKREFERENCE_OPEN)) {
      throw new Error("backreference marker was altered by oniguruma-to-es");
    }
    if (regex instanceof EmulatedRegExp) {
      compiled.emulated = true;
      return new Code(`new EmulatedRegExp(${JSON.stringify(regex.source)}, ${JSON.stringify(regex.flags)}, ${inline(regex.rawOptions)})`);
    }
    // Normalize through the constructor so `/` and line terminators are escaped.
    const { source: literal, flags } = new RegExp(regex.source, regex.flags);
    return new Code(`/${literal}/${flags}`);
  };

  try {
    const { A, G } = findAnchors(pattern);
    if (!A && !G) return convert(pattern);

    // Variant index: (`\A` allowed ? 2 : 0) + (`\G` allowed ? 1 : 0), with
    // the unused dimension collapsed so single-anchor patterns have two.
    const variants = [];
    for (const allowA of A ? [false, true] : [null]) {
      for (const allowG of G ? [false, true] : [null]) {
        const disabled = (allowA === false ? "A" : "") + (allowG === false ? "G" : "");
        variants.push(convert(disableAnchors(pattern, disabled)));
      }
    }
    return { [`${A ? "A" : ""}${G ? "G" : ""}`]: variants };
  } catch (error) {
    compiled.failures.push(`${key}: ${pattern.slice(0, 60)} (${/** @type {Error} */ (error).message})`);
    return null;
  }
};

/**
 * Walk a grammar, compiling patterns and dropping fields the runtime ignores.
 * @param {unknown} value
 * @param {Compiled} compiled
 * @returns {unknown}
 */
const transform = (value, compiled) => {
  if (Array.isArray(value)) return value.map(item => transform(item, compiled));
  if (!value || typeof value !== "object") return value;

  /** @type {Record<string, unknown>} */
  const output = {};
  for (const [key, item] of Object.entries(value)) {
    // Drop documentation strings, but not repository rules named `comment`.
    if (key === "comment" && typeof item === "string") continue;
    output[key] = PATTERN_KEYS.includes(key) && typeof item === "string"
      ? compilePattern(item, key, compiled)
      : transform(item, compiled);
  }
  return output;
};

/** @param {string} key */
const formatKey = key => /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);

/**
 * Single-line JavaScript for small plain values (regex options, variants).
 * @param {unknown} value
 * @returns {string}
 */
const inline = value => {
  if (value instanceof Code) return value.text;
  if (Array.isArray(value)) return `[${value.map(inline).join(", ")}]`;
  if (value && typeof value === "object") {
    return `{ ${Object.entries(value).map(([key, item]) => `${formatKey(key)}: ${inline(item)}`).join(", ")} }`;
  }
  return JSON.stringify(value);
};

/**
 * Pretty-print a transformed grammar as a JavaScript object literal.
 * @param {unknown} value
 * @param {string} [indent]
 * @returns {string}
 */
const serialize = (value, indent = "") => {
  if (value instanceof Code) return value.text;
  if (!value || typeof value !== "object") return JSON.stringify(value);

  const inner = `${indent}  `;
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    // Anchored variant sets stay on one line; rule lists get one entry per line.
    if (value.every(item => item instanceof Code)) return inline(value);
    return `[\n${value.map(item => `${inner}${serialize(item, inner)}`).join(",\n")}\n${indent}]`;
  }

  const entries = Object.entries(value);
  if (!entries.length) return "{}";
  // `{ include: "#x" }` rules are by far the most common; keep them compact.
  if (entries.length === 1 && typeof entries[0][1] === "string") return inline(value);
  return `{\n${entries
    .map(([key, item]) => `${inner}${formatKey(key)}: ${serialize(item, inner)}`)
    .join(",\n")}\n${indent}}`;
};

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const files = (await readdir(sourceDirectory))
  .filter(file => file.endsWith(".mjs") && file !== "index.mjs")
  .sort();

/** @type {string[]} */
const report = [];
let written = 0;
let aliased = 0;

for (const file of files) {
  const stem = file.replace(/\.mjs$/, "");
  const { default: entries } = await import(pathToFileURL(path.join(sourceDirectory, file)).href);
  const source = entries.at(-1);
  const target = path.join(outputDirectory, `${stem}.js`);

  // Shiki ships alias files (e.g. `chpl.mjs`) that re-export another grammar.
  if (source.name !== stem) {
    await writeFile(target, `export { default } from "./${source.name}.js";\n`);
    aliased++;
    continue;
  }

  /** @type {Compiled} */
  const compiled = { failures: [], emulated: false };
  /** @type {Record<string, unknown>} */
  const grammar = {};
  for (const key of GRAMMAR_KEYS) {
    if (source[key] !== undefined) grammar[key] = transform(source[key], compiled);
  }
  grammar.dependencies = source.embeddedLangs ?? [];

  const header = compiled.emulated ? 'import { EmulatedRegExp } from "oniguruma-to-es";\n\n' : "";
  await writeFile(target, `${header}export default ${serialize(grammar)};\n`);
  written++;

  if (compiled.failures.length) {
    report.push(`${stem}: ${compiled.failures.length} pattern(s) skipped\n    ${compiled.failures.join("\n    ")}`);
  }
}

console.log(`Compiled ${written} grammars (+${aliased} aliases) to ${path.relative(root, outputDirectory)}`);
if (report.length) console.warn(`Unsupported patterns:\n  ${report.join("\n  ")}`);
