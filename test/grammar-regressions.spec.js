import assert from "node:assert/strict";
import test from "node:test";

import csharp from "../src/grammars/csharp.js";
import javascript from "../src/grammars/javascript.js";
import powershell from "../src/grammars/powershell.js";
import yaml from "../src/grammars/yaml.js";

const matchesEntirely = (pattern, value) =>
  new RegExp(`^(?:${pattern})$`).test(value);

test("C# interpolated strings preserve escaped and interpolation braces", () => {
  const strings = csharp.repository.strings.patterns;

  assert.equal(matchesEntirely(strings[1].match, "$@\"{{escaped}} {value}\""), true);
  assert.equal(matchesEntirely(strings[2].match, "@$\"{{escaped}} {value}\""), true);
  assert.equal(matchesEntirely(strings[3].match, "$\"{{escaped}} {value}\""), true);
});

test("JavaScript regex literals require complete character classes", () => {
  const pattern = javascript.repository.regexp.match;

  assert.equal(matchesEntirely(pattern, "/[a/]/"), true);
  assert.equal(matchesEntirely(pattern, "/[/]/"), true);
  assert.equal(matchesEntirely(pattern, "/[abc/"), false);
});

test("PowerShell double-quoted strings support backtick escapes and continuations", () => {
  const pattern = powershell.repository.strings.patterns[1].match;

  assert.equal(matchesEntirely(pattern, "\"escaped `\"quote\""), true);
  assert.equal(matchesEntirely(pattern, "\"continued`\nstring\""), true);
  assert.equal(matchesEntirely(pattern, "\"dangling`\""), false);
});

test("YAML quoted scalars preserve indented continuation lines", () => {
  const singleQuoted = yaml.patterns[4].match;
  const doubleQuoted = yaml.patterns[5].match;

  assert.equal(matchesEntirely(singleQuoted, "'continued\n  value'"), true);
  assert.equal(matchesEntirely(doubleQuoted, "\"continued\n  value\""), true);
  assert.equal(matchesEntirely(doubleQuoted, "\"continued\nvalue\""), false);
});