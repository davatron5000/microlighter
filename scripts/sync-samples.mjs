#!/usr/bin/env node

// Pulls the per-language code samples maintained alongside Shiki's grammars
// into docs/samples/ and regenerates docs/languages.js, the manifest the demo
// site and the exhaustive browser fixture use to enumerate every grammar.
// Samples that exist locally but not upstream (hand-written ones) are kept.

import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const grammarsDirectory = path.join(root, "src/grammars");
const samplesDirectory = path.join(root, "docs/samples");
const manifestPath = path.join(root, "docs/languages.js");

const SAMPLES_API = "https://api.github.com/repos/shikijs/textmate-grammars-themes/contents/samples";
const SAMPLES_RAW = "https://raw.githubusercontent.com/shikijs/textmate-grammars-themes/main/samples";

/**
 * Grammars that only exist to be embedded in other grammars. They have no
 * upstream sample and are not meaningful as a `language-*` class on their own,
 * so they are left out of the manifest.
 */
const embeddedOnlyGrammars = new Set([
  "angular-expression", "angular-inline-style", "angular-inline-template",
  "angular-let-declaration", "angular-template", "angular-template-blocks",
  "cpp-macro", "es-tag-css", "es-tag-glsl", "es-tag-html", "es-tag-sql", "es-tag-xml",
  "html-derivative", "jinja-html", "markdown-nix", "markdown-vue", "nextflow-groovy",
  "vue-directives", "vue-interpolations", "vue-sfc-style-variable-injection"
]);

/** Display groups for the "Supported languages" index, in display order. */
const groups = {
  "Web": [
    "html", "css", "scss", "sass", "less", "stylus", "postcss", "javascript", "typescript",
    "jsx", "tsx", "coffee", "imba", "wasm", "wgsl", "wit", "graphql", "http", "hurl", "regexp"
  ],
  "Frameworks & templates": [
    "astro", "svelte", "vue", "vue-html", "vue-vine", "angular-html", "angular-ts", "glimmer-js",
    "glimmer-ts", "marko", "ts-tags", "blade", "edge", "erb", "haml", "handlebars", "jinja",
    "liquid", "pug", "razor", "soy", "twig", "templ", "mdc", "mdx"
  ],
  "Systems": [
    "c", "cpp", "objective-c", "objective-cpp", "rust", "go", "zig", "d", "v", "odin", "nim", "c3",
    "ada", "pascal", "asm", "mipsasm", "riscv", "llvm", "vala", "genie", "mojo",
    "fortran-fixed-form", "fortran-free-form"
  ],
  "Application": [
    "java", "kotlin", "scala", "groovy", "csharp", "fsharp", "vb", "swift", "dart", "haxe", "apex",
    "actionscript-3", "ballerina", "abap", "cobol", "crystal", "ruby", "rbs", "python", "php", "ara", "perl",
    "raku", "lua", "luau", "elixir", "erlang", "gleam", "moonbit", "hack", "dream-maker", "smalltalk",
    "wenyan", "bsl"
  ],
  "Functional & logic": [
    "haskell", "ocaml", "purescript", "elm", "clojure", "common-lisp", "scheme", "racket",
    "emacs-lisp", "fennel", "hy", "lean", "coq", "prolog", "rel", "apl"
  ],
  "Scripting & shells": [
    "shellscript", "shellsession", "fish", "nushell", "powershell", "bat", "awk", "tcl",
    "applescript", "ahk", "ahk2", "viml", "berry", "talonscript"
  ],
  "Data, config & docs": [
    "json", "jsonc", "json5", "jsonl", "yaml", "toml", "ini", "csv", "tsv", "hjson", "ron", "kdl",
    "pkl", "cue", "jsonnet", "dotenv", "xml", "xsl", "diff", "git-commit", "git-rebase", "log", "po",
    "fluent", "codeowners", "desktop", "reg", "ssh-config", "systemd", "markdown", "asciidoc", "rst",
    "org", "latex", "tex", "bibtex", "typst", "wikitext", "mermaid", "gherkin"
  ],
  "Queries & schemas": [
    "sql", "plsql", "sdbl", "kusto", "cypher", "sparql", "surrealql", "dax", "powerquery", "splunk",
    "prisma", "proto", "rosmsg", "typespec", "smithy", "tasl", "turtle", "codeql", "polar"
  ],
  "Infrastructure & build": [
    "docker", "nginx", "apache", "terraform", "hcl", "bicep", "puppet", "nix", "make", "cmake", "gn",
    "just", "nsis", "hxml", "qmldir", "bird2", "nextflow", "jssm", "jison", "beancount"
  ],
  "Scientific": ["r", "julia", "matlab", "sas", "stata", "wolfram", "gnuplot", "chapel"],
  "Graphics, hardware & games": [
    "glsl", "hlsl", "gdshader", "shaderlab", "gdscript", "gdresource", "qml", "qss", "openscad",
    "verilog", "system-verilog", "vhdl", "narrat", "zenscript", "logo"
  ],
  "Smart contracts": ["solidity", "vyper", "move", "cadence", "clarity", "cairo"]
};

const groupOf = new Map(
  Object.entries(groups).flatMap(([group, names]) => names.map(name => [name, group]))
);

/**
 * Load every grammar module and keep the ones whose file name is the grammar's
 * own name (alias files such as `js.js` re-export `javascript`).
 * @returns {Promise<Map<string, {displayName?: string, aliases?: string[]}>>}
 */
const loadCanonicalGrammars = async () => {
  const canonical = new Map();
  for (const file of await readdir(grammarsDirectory)) {
    if (!file.endsWith(".js")) continue;
    const name = file.replace(/\.js$/, "");
    let grammar;
    try {
      grammar = (await import(pathToFileURL(path.join(grammarsDirectory, file)).href)).default;
    } catch {
      continue;
    }
    if (grammar?.name === name) canonical.set(name, grammar);
  }
  return canonical;
};

/** @param {string} url */
const fetchText = async url => {
  const response = await fetch(url, { headers: { "user-agent": "microlighter-sync-samples" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
};

/**
 * Run async tasks with bounded concurrency.
 * @template T
 * @param {T[]} items
 * @param {(item: T) => Promise<void>} task
 * @param {number} limit
 */
const forEachLimited = async (items, task, limit) => {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) await task(/** @type {T} */ (queue.shift()));
  });
  await Promise.all(workers);
};

const canonical = await loadCanonicalGrammars();
await mkdir(samplesDirectory, { recursive: true });

/** @type {{name: string}[]} */
const upstream = JSON.parse(await fetchText(SAMPLES_API));
const upstreamNames = upstream
  .map(entry => entry.name.replace(/\.sample$/, ""))
  .filter(name => canonical.has(name));

await forEachLimited(upstreamNames, async name => {
  const sample = await fetchText(`${SAMPLES_RAW}/${name}.sample`);
  await writeFile(path.join(samplesDirectory, `${name}.sample`), sample);
}, 8);

// Drop samples for grammars that no longer ship.
for (const file of await readdir(samplesDirectory)) {
  if (file.endsWith(".sample") && !canonical.has(file.replace(/\.sample$/, ""))) {
    await unlink(path.join(samplesDirectory, file));
  }
}

const sampled = new Set((await readdir(samplesDirectory))
  .filter(file => file.endsWith(".sample"))
  .map(file => file.replace(/\.sample$/, "")));

const manifest = [...canonical]
  .filter(([name]) => !embeddedOnlyGrammars.has(name))
  .map(([name, grammar]) => ({
    name,
    label: grammar.displayName || name,
    group: groupOf.get(name) ?? "Other languages",
    aliases: grammar.aliases ?? []
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const missingSamples = manifest.filter(({ name }) => !sampled.has(name)).map(({ name }) => name);
const ungrouped = manifest.filter(({ group }) => group === "Other languages").map(({ name }) => name);
const staleEmbedded = [...embeddedOnlyGrammars].filter(name => !canonical.has(name));

await writeFile(manifestPath, [
  "// Generated by scripts/sync-samples.mjs — do not edit by hand.",
  "// One entry per canonical grammar that has a sample in docs/samples/.",
  "",
  "/** Display groups, in the order the language index should show them. */",
  `export const groups = ${JSON.stringify(Object.keys(groups), null, 2)};`,
  "",
  "/** Shipped grammars that only exist to be embedded by others, so are not listed. */",
  `export const embeddedOnly = ${JSON.stringify([...embeddedOnlyGrammars].sort(), null, 2)};`,
  "",
  "/** @type {{name: string, label: string, group: string, aliases: string[]}[]} */",
  `const languages = ${JSON.stringify(manifest, null, 2)};`,
  "",
  "export default languages;",
  ""
].join("\n"));

console.log(`Synced ${upstreamNames.length} upstream samples; manifest lists ${manifest.length} languages`);
if (missingSamples.length) console.warn(`No sample (write one in docs/samples/): ${missingSamples.join(", ")}`);
if (ungrouped.length) console.warn(`Ungrouped (add to groups in this script): ${ungrouped.join(", ")}`);
if (staleEmbedded.length) console.warn(`embeddedOnlyGrammars entries with no grammar: ${staleEmbedded.join(", ")}`);
