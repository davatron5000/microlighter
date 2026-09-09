#!/usr/bin/env node
import { gzipSync, brotliCompressSync, constants } from "node:zlib";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

const gzip = buffer => gzipSync(buffer, { level: 9 }).length;
const brotli = buffer =>
  brotliCompressSync(buffer, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 }
  }).length;

const kib = bytes => `${(bytes / 1024).toFixed(2)} KiB`;
const pad = (value, width) => String(value).padStart(width);

const WORD = /[A-Za-z0-9_$]/;

// Approximate a minified build of our hand-authored chunks (data-style ES
// module grammars and plain CSS themes) without pulling in a real minifier:
// strip comments and redundant whitespace while copying string-literal
// contents byte-for-byte. Close enough to estimate the minified transfer size.
const minify = (code, { css = false } = {}) => {
  let out = "";
  let i = 0;
  const n = code.length;

  while (i < n) {
    const ch = code[i];
    const next = code[i + 1];

    // String literals ('...', "...", `...`) are copied verbatim.
    if (ch === "\"" || ch === "'" || ch === "`") {
      out += ch;
      i++;
      while (i < n) {
        out += code[i];
        if (code[i] === "\\") {
          out += code[i + 1] ?? "";
          i += 2;
          continue;
        }
        if (code[i] === ch) {
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    if (ch === "/" && next === "*") {
      i += 2;
      while (i < n && !(code[i] === "*" && code[i + 1] === "/")) i++;
      i += 2;
      continue;
    }

    if (!css && ch === "/" && next === "/") {
      i += 2;
      while (i < n && code[i] !== "\n") i++;
      continue;
    }

    if (/\s/.test(ch)) {
      let j = i;
      while (j < n && /\s/.test(code[j])) j++;
      const prev = out[out.length - 1] || "";
      const following = code[j] || "";
      // CSS: keep single spaces except around block punctuation, so descendant
      // combinators (e.g. `] pre`) survive. JS: a space is only needed between
      // two identifier characters (e.g. `return x`).
      const keep = css
        ? prev !== "" && following !== "" && !"{};,".includes(prev) && !"{};,".includes(following)
        : WORD.test(prev) && WORD.test(following);
      if (keep) out += " ";
      i = j;
      continue;
    }

    out += ch;
    i++;
  }

  return out;
};

const getSizes = path => {
  const buffer = readFileSync(join(root, path));
  return { raw: buffer.length, gzip: gzip(buffer), brotli: brotli(buffer) };
};

const listing = dir =>
  readdirSync(join(root, dir))
    .filter(name => !name.startsWith("index.") && !name.endsWith(".d.ts"))
    .sort()
    .map(name => join(dir, name));

const printTable = (title, rows, columns) => {
  console.log(`\n${title}`);
  const widths = columns.map((column, index) =>
    Math.max(column.length, ...rows.map(row => row[index].length))
  );
  const line = cells =>
    "  " + cells.map((cell, index) => pad(cell, widths[index])).join("  ");
  console.log(line(columns));
  console.log(line(widths.map(width => "-".repeat(width))));
  rows.forEach(row => console.log(line(row)));
};

const bundle = "dist/microlighter.min.js";
const bundleSizes = getSizes(bundle);
const customElement = 'dist/micro-lighter-element.min.js';
const customElementSizes = getSizes(customElement);

printTable(
  "Bundles",
  [
    [bundle, kib(bundleSizes.raw), kib(bundleSizes.gzip), kib(bundleSizes.brotli)],
    [customElement, kib(customElementSizes.raw), kib(customElementSizes.gzip), kib(customElementSizes.brotli)]
  ],
  ["file", "raw", "gzip", "brotli"]
);

const analyzeChunk = path => {
  const buffer = readFileSync(join(root, path));
  const minified = Buffer.from(minify(buffer.toString("utf8"), { css: path.endsWith(".css") }));
  return { path, raw: buffer.length, min: minified.length, gzip: gzip(minified) };
};

const grammarChunks = listing("dist/grammars").map(analyzeChunk);
const themeChunks = listing("dist/themes").map(analyzeChunk);

const chunkRows = [...grammarChunks, ...themeChunks].map(chunk => [
  relative("dist", chunk.path),
  kib(chunk.raw),
  kib(chunk.gzip)
]);

printTable(
  "Lazy-loaded chunks (fetched on demand)\n",
  chunkRows,
  ["file", "raw (min)", "gzip"]
);

const average = (chunks, field) =>
  chunks.reduce((sum, chunk) => sum + chunk[field], 0) / chunks.length;

const averageRow = (label, chunks) => [
  label,
  String(chunks.length),
  kib(average(chunks, "raw")),
  kib(average(chunks, "gzip"))
];

printTable(
  "Average chunk size\n",
  [averageRow("grammars", grammarChunks), averageRow("themes", themeChunks)],
  ["category", "files", "raw (min)", "gzip"]
);

// Keep the homepage's headline gzip figure in sync with the real bundle.
if (process.argv.includes("--update-homepage")) {
  const homepage = join(root, "docs/index.html");
  const gzipKb = (bundleSizes.gzip / 1024).toFixed(2);
  const html = readFileSync(homepage, "utf8");
  const pattern = /(<span class="size-value">)([^<]*)(<\/span>)/;

  if (!pattern.test(html)) {
    console.error("\nCould not find the .size-value element in docs/index.html.");
    process.exit(1);
  }

  const updated = html.replace(pattern, `$1${gzipKb}$3`);
  if (updated !== html) {
    writeFileSync(homepage, updated);
    console.log(`\nHomepage size updated: docs/index.html size-value -> ${gzipKb} kb gzip`);
  } else {
    console.log(`\nHomepage size already current: ${gzipKb} kb gzip`);
  }
}

const limits = pkg.sizeLimit || {};
const limit = limits[bundle];
if (limit != null) {
  const over = bundleSizes.gzip > limit;
  console.log(
    `\nBudget: ${bundle} gzip ${kib(bundleSizes.gzip)} / ${kib(limit)} ` +
      `(${over ? "OVER" : "ok"})`
  );
  if (over) {
    console.error(
      `\nSize budget exceeded: ${bundle} gzip is ${bundleSizes.gzip} bytes, ` +
        `limit is ${limit} bytes.`
    );
    process.exit(1);
  }
}
