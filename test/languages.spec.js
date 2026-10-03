import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import test from "node:test";

import languages, { embeddedOnly, groups } from "../docs/languages.js";

const grammarsDirectory = new URL("../src/grammars/", import.meta.url);
const samplesDirectory = new URL("../docs/samples/", import.meta.url);

/** Grammar files whose name is the grammar's own name, not an alias re-export. */
const loadCanonicalGrammars = async () => {
  const canonical = [];
  for (const file of readdirSync(grammarsDirectory)) {
    if (!file.endsWith(".js")) continue;
    const name = file.replace(/\.js$/, "");
    const grammar = (await import(new URL(file, grammarsDirectory))).default;
    if (grammar.name === name) canonical.push(name);
  }
  return canonical.sort();
};

test("docs/languages.js lists every canonical grammar that is not embedded-only", async () => {
  const canonical = await loadCanonicalGrammars();
  const listed = new Set(languages.map(language => language.name));
  const excluded = new Set(embeddedOnly);

  const unaccounted = canonical.filter(name => !listed.has(name) && !excluded.has(name));
  assert.deepEqual(unaccounted, [], "run `npm run sync-samples` to add new grammars to the manifest");

  const stale = [...listed, ...excluded].filter(name => !canonical.includes(name));
  assert.deepEqual(stale, [], "manifest names a grammar that no longer ships");

  const overlap = [...listed].filter(name => excluded.has(name));
  assert.deepEqual(overlap, []);
});

test("every listed language has a sample, a label and a known group", () => {
  const names = languages.map(language => language.name);
  assert.equal(new Set(names).size, names.length, "duplicate language entries");

  for (const { name, label, group } of languages) {
    assert.ok(existsSync(new URL(`${name}.sample`, samplesDirectory)), `missing docs/samples/${name}.sample`);
    assert.ok(label.length > 0, `${name} has no label`);
    assert.ok(groups.includes(group), `${name} has unknown group "${group}"`);
  }
});

test("every sample belongs to a listed language", () => {
  const listed = new Set(languages.map(language => language.name));
  const orphaned = readdirSync(samplesDirectory)
    .filter(file => file.endsWith(".sample"))
    .map(file => file.replace(/\.sample$/, ""))
    .filter(name => !listed.has(name));

  assert.deepEqual(orphaned, []);
});
