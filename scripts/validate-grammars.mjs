#!/usr/bin/env node
// Check the output of sync-grammars.mjs: every grammar module loads, every
// rule pattern is a compiled regex (or an anchored variant set, or `null` for
// an unsupported pattern), and every dependency / alias target exists.

import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(root, "src/grammars");
const sourceDirectory = path.join(root, "node_modules/@shikijs/langs/dist");
const PATTERN_KEYS = ["match", "begin", "end", "while"];

const files = (await readdir(directory)).filter(file => file.endsWith(".js")).sort();
const names = new Set(files.map(file => file.replace(/\.js$/, "")));
/** @type {string[]} */
const problems = [];
/** @type {string[]} */
const upstreamDangling = [];
let grammars = 0;
let patterns = 0;
let unsupported = 0;

/**
 * @param {unknown} value
 * @returns {boolean}
 */
const isPattern = value => {
  if (value === null || value instanceof RegExp) return true;
  if (!value || typeof value !== "object") return false;
  const entries = Object.entries(value);
  if (entries.length !== 1) return false;
  const [kind, variants] = entries[0];
  const expected = { A: 2, G: 2, AG: 4 }[kind];
  return Array.isArray(variants) && variants.length === expected && variants.every(variant => variant instanceof RegExp);
};

/**
 * Collect every `#name` the grammar includes that has no repository entry in
 * scope, honouring rule-level repositories.
 * @param {unknown} value
 * @param {Set<string>} repository
 * @param {Set<string>} dangling
 */
const collectDangling = (value, repository, dangling) => {
  if (Array.isArray(value)) return value.forEach(item => collectDangling(item, repository, dangling));
  if (!value || typeof value !== "object" || value instanceof RegExp) return;
  if ("repository" in value && value.repository && typeof value.repository === "object") {
    repository = new Set([...repository, ...Object.keys(value.repository)]);
  }
  for (const [key, item] of Object.entries(value)) {
    if (key === "include" && typeof item === "string" && item[0] === "#" && !repository.has(item.slice(1))) {
      dangling.add(item);
    } else {
      collectDangling(item, repository, dangling);
    }
  }
};

/**
 * @param {{patterns?: unknown, repository?: object, injections?: unknown}} grammar
 */
const danglingIncludes = grammar => {
  const dangling = new Set();
  const repository = new Set(Object.keys(grammar.repository ?? {}));
  for (const part of [grammar.patterns, grammar.repository, grammar.injections]) collectDangling(part, repository, dangling);
  return dangling;
};

/**
 * @param {unknown} value
 * @param {string} where
 */
const walk = (value, where) => {
  if (Array.isArray(value)) return value.forEach((item, index) => walk(item, `${where}[${index}]`));
  if (!value || typeof value !== "object" || value instanceof RegExp) return;
  for (const [key, item] of Object.entries(value)) {
    if (PATTERN_KEYS.includes(key) && key in value && !("include" in value && key === "match" && item === undefined)) {
      patterns++;
      if (item === null) unsupported++;
      else if (!isPattern(item)) problems.push(`${where}.${key} is not a compiled pattern`);
      continue;
    }
    walk(item, `${where}.${key}`);
  }
};

for (const file of files) {
  const name = file.replace(/\.js$/, "");
  let grammar;
  try {
    ({ default: grammar } = await import(pathToFileURL(path.join(directory, file)).href));
  } catch (error) {
    problems.push(`${name}: failed to load (${/** @type {Error} */ (error).message})`);
    continue;
  }

  if (grammar.name !== name) continue; // alias re-export; validated via its target
  grammars++;

  if (typeof grammar.scopeName !== "string") problems.push(`${name}: missing scopeName`);
  if (!Array.isArray(grammar.patterns)) problems.push(`${name}: missing patterns`);
  for (const dependency of grammar.dependencies ?? []) {
    if (!names.has(dependency)) problems.push(`${name}: dependency "${dependency}" has no grammar file`);
  }
  walk(grammar.patterns, `${name}.patterns`);
  walk(grammar.repository, `${name}.repository`);
  walk(grammar.injections, `${name}.injections`);

  // Includes with no repository entry are a sync bug only if the upstream
  // source grammar resolves them; otherwise they are upstream's own.
  const dangling = danglingIncludes(grammar);
  if (dangling.size) {
    const source = (await import(pathToFileURL(path.join(sourceDirectory, `${name}.mjs`)).href)).default.at(-1);
    const upstream = danglingIncludes(source);
    for (const include of dangling) {
      (upstream.has(include) ? upstreamDangling : problems)
        .push(upstream.has(include) ? `${name}: ${include}` : `${name}: include "${include}" resolves upstream but not here`);
    }
  }
}

if (problems.length) {
  console.error(`${problems.length} problem(s):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`Validated ${grammars} grammars, ${files.length - grammars} aliases, ${patterns} patterns (${unsupported} unsupported)`);
if (upstreamDangling.length) {
  console.log(`${upstreamDangling.length} include(s) are dangling in the upstream grammars themselves (ignored)`);
}
