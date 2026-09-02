import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("build emits matching unminified and minified auto-run bundles", async () => {
  const [bundle, minifiedBundle] = await Promise.all([
    readFile(new URL("../dist/microlighter.js", import.meta.url), "utf8"),
    readFile(new URL("../dist/microlighter.min.js", import.meta.url), "utf8")
  ]);

  assert.doesNotMatch(bundle, /from\s+["']\.\/index\.js["']/);
  assert.match(bundle, /document\.addEventListener\(["']syntax-highlight["']/);
  assert.match(minifiedBundle, /document\.addEventListener\(["']syntax-highlight["']/);
  assert.ok(bundle.length > minifiedBundle.length);
});

test("includes first-party language aliases in the core bundle", async () => {
  const bundle = await readFile(
    new URL("../dist/microlighter.min.js", import.meta.url),
    "utf8"
  );

  assert.match(bundle, /jsx:"javascript"/);
});

test("build emits complete custom-element bundles", async () => {
  const [bundle, minifiedBundle] = await Promise.all([
    readFile(new URL("../dist/micro-lighter-element.js", import.meta.url), "utf8"),
    readFile(new URL("../dist/micro-lighter-element.min.js", import.meta.url), "utf8")
  ]);

  assert.doesNotMatch(bundle, /from\s+["']\.\/highlight-all\.js["']/);
  assert.match(bundle, /customElements\.define\(["']micro-lighter["']/);
  assert.match(minifiedBundle, /customElements\.define\(["']micro-lighter["']/);
  assert.ok(bundle.length > minifiedBundle.length);
});

test("build emits declarations for every entry point", async () => {
  const [grammar, minifiedBundle, minifiedElementBundle] = await Promise.all([
    readFile(new URL("../dist/grammars/javascript.d.ts", import.meta.url), "utf8"),
    readFile(new URL("../dist/microlighter.min.d.ts", import.meta.url), "utf8"),
    readFile(new URL("../dist/micro-lighter-element.min.d.ts", import.meta.url), "utf8")
  ]);

  assert.match(grammar, /declare const grammar: Grammar;/);
  assert.match(grammar, /export default grammar;/);
  assert.match(minifiedBundle, /export \{\};/);
  assert.match(minifiedElementBundle, /class MicroLighter extends HTMLElement/);
});

test("build whitespace-minifies grammar and theme files", async () => {
  const [grammar, theme] = await Promise.all([
    readFile(new URL("../dist/grammars/javascript.js", import.meta.url), "utf8"),
    readFile(new URL("../dist/themes/github.css", import.meta.url), "utf8")
  ]);

  assert.equal(grammar.trim().split("\n").length, 1);
  assert.match(grammar, /export default\{scopeName:"source\.js"/);
  assert.equal(theme.trim().split("\n").length, 1);
  assert.match(theme, /\[data-syntax-theme=(?:"github"|github)\]/);
});
