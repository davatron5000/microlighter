import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";

import { check } from "recheck";

const grammarDirectory = new URL("../src/grammars/", import.meta.url);
const regexFields = new Set(["begin", "end", "match"]);

const collectPatterns = (value, location, patterns) => {
  if (!value || typeof value !== "object") return;

  Object.entries(value).forEach(([key, child]) => {
    const childLocation = `${location}.${key}`;

    if (regexFields.has(key) && typeof child === "string") {
      const locations = patterns.get(child) || [];
      locations.push(childLocation);
      patterns.set(child, locations);
      return;
    }

    collectPatterns(child, childLocation, patterns);
  });
};

test("grammar regexes avoid exponential backtracking", async () => {
  const options = { checker: "automaton", timeout: 500 };
  const control = await check("^(a+)+$", "gm", options);
  assert.equal(control.status, "vulnerable", "recheck should detect the control pattern");
  assert.equal(control.complexity.type, "exponential");

  const files = (await readdir(grammarDirectory))
    .filter(file => file.endsWith(".js"))
    .sort();
  const patterns = new Map();

  for (const file of files) {
    const grammar = (await import(new URL(file, grammarDirectory))).default;
    collectPatterns(grammar, file, patterns);
  }

  const results = await Promise.all([...patterns].map(async ([pattern, locations]) => ({
    locations,
    pattern,
    result: await check(pattern, "gm", options)
  })));
  const vulnerable = results
    .filter(({ result }) =>
      result.status === "vulnerable" && result.complexity.type === "exponential"
    )
    .map(({ locations, pattern }) => `${locations.join(", ")}: /${pattern}/gm`);

  assert.deepEqual(vulnerable, []);
});
