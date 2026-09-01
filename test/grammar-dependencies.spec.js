import assert from "node:assert/strict";
import test from "node:test";

import {
  createGrammarLoader,
  getExternalLanguages,
  normalizeLanguage
} from "../src/grammar-dependencies.js";
import cpp from "../src/grammars/cpp.js";
import heex from "../src/grammars/heex.js";
import html from "../src/grammars/html.js";
import markdown from "../src/grammars/markdown.js";
import objectiveC from "../src/grammars/objective-c.js";
import scss from "../src/grammars/scss.js";
import tsx from "../src/grammars/tsx.js";
import typescript from "../src/grammars/typescript.js";
import svelte from "../src/grammars/svelte.js";
import vue from "../src/grammars/vue.js";
import xml from "../src/grammars/xml.js";

test("finds external grammar languages in nested rules", () => {
  const grammar = {
    patterns: [
      { include: "#comments" },
      { include: "$self" },
      { include: "source.js#strings" }
    ],
    repository: {
      frontMatter: {
        patterns: [
          { include: "source.yaml" },
          { include: "source.js#comments" }
        ]
      }
    }
  };

  assert.deepEqual([...getExternalLanguages(grammar)], ["js", "yaml"]);
});

test("recognizes source and text scopes but ignores unsupported includes", () => {
  const grammar = {
    patterns: [
      { include: "text.html#tags" },
      { include: "source.css" },
      { include: "meta.embedded.block" }
    ]
  };

  assert.deepEqual([...getExternalLanguages(grammar)], ["html", "css"]);
});

test("normalizes language aliases and preserves canonical names", () => {
  assert.equal(normalizeLanguage("jsx"), "javascript");
  assert.equal(normalizeLanguage("sass"), "scss");
  assert.equal(normalizeLanguage("python"), "python");
  assert.equal(normalizeLanguage("custom-language"), "custom-language");
});

test("reports dependencies used by the shipped grammars", () => {
  assert.deepEqual([...getExternalLanguages(scss)], ["css"]);
  assert.deepEqual([...getExternalLanguages(markdown)], ["yaml"]);
  assert.deepEqual([...getExternalLanguages(typescript)], ["js"]);
  assert.deepEqual([...getExternalLanguages(html)], ["css", "json", "js"]);
  assert.deepEqual([...getExternalLanguages(cpp)], ["c"]);
  assert.deepEqual([...getExternalLanguages(tsx)], ["js", "ts"]);
  assert.deepEqual([...getExternalLanguages(objectiveC)], ["c"]);
  assert.deepEqual([...getExternalLanguages(xml)], ["java"]);
  assert.deepEqual(heex.dependencies, ["html", "elixir"]);
  assert.deepEqual(svelte.dependencies, ["html", "css", "scss", "javascript", "typescript"]);
  assert.deepEqual(vue.dependencies, ["html", "css", "scss", "javascript", "typescript"]);
});

test("loads external dependencies once and indexes grammars by language and scope", async () => {
  const grammarFixtures = {
    html: {
      scopeName: "text.html",
      dependencies: ["javascript"],
      patterns: [{ include: "source.js" }]
    },
    javascript: {
      scopeName: "source.js",
      patterns: []
    }
  };
  const importedLanguages = [];
  const load = createGrammarLoader(async language => {
    importedLanguages.push(language);
    return grammarFixtures[language] ?? null;
  });

  const loaded = await load(["html"]);
  await load(["html"]);

  assert.deepEqual(importedLanguages, ["html", "javascript"]);
  assert.deepEqual(loaded.languages, grammarFixtures);
  assert.equal(loaded.scopes.get("text.html"), grammarFixtures.html);
  assert.equal(loaded.scopes.get("source.js"), grammarFixtures.javascript);
});

test("shares in-flight grammar imports between concurrent loads", async () => {
  const grammar = { scopeName: "source.js", patterns: [] };
  let finishImport;
  let importCount = 0;
  const pendingImport = new Promise(resolve => {
    finishImport = resolve;
  });
  const load = createGrammarLoader(() => {
    importCount++;
    return pendingImport;
  });

  const firstLoad = load(["javascript"]);
  await Promise.resolve();
  let secondResolved = false;
  const secondLoad = load(["javascript"]).then(loaded => {
    secondResolved = true;
    return loaded;
  });
  await Promise.resolve();

  assert.equal(secondResolved, false);
  finishImport(grammar);
  const [first, second] = await Promise.all([firstLoad, secondLoad]);

  assert.equal(importCount, 1);
  assert.equal(first.languages.javascript, grammar);
  assert.equal(second.languages.javascript, grammar);
});

test("loads user-provided canonical language names", async () => {
  const customGrammar = { scopeName: "source.custom", patterns: [] };
  const load = createGrammarLoader(async language =>
    language === "custom-language" ? customGrammar : null
  );

  const loaded = await load(["custom-language"]);

  assert.equal(loaded.languages["custom-language"], customGrammar);
});

test("indexes grammars by canonical language only", async () => {
  const grammarFixtures = {
    javascript: { scopeName: "source.js", patterns: [] },
    json: { scopeName: "source.json", patterns: [] }
  };
  const importedLanguages = [];
  const load = createGrammarLoader(async language => {
    importedLanguages.push(language);
    return grammarFixtures[language] ?? null;
  });

  const loaded = await load(["javascript", "json"]);

  assert.deepEqual(importedLanguages, ["javascript", "json"]);
  assert.deepEqual(loaded.languages, grammarFixtures);
});

test("dynamically loads every new canonical grammar and transitively resolves its dependencies", async () => {
  const load = createGrammarLoader();
  const newLanguages = [
    "sql", "dockerfile", "toml", "c", "cpp", "csharp", "java", "php",
    "graphql", "kotlin", "swift", "powershell", "tsx"
  ];

  const loaded = await load(newLanguages);

  for (const language of newLanguages) {
    assert.ok(loaded.languages[language], `expected ${language} to load`);
  }

  // cpp reuses the shared C grammar via external includes.
  assert.ok(loaded.languages.c, "cpp should transitively load c");
  assert.equal(loaded.scopes.get("source.c"), loaded.languages.c);

  // tsx reuses TypeScript and JavaScript via external includes.
  assert.ok(loaded.languages.javascript, "tsx should transitively load javascript");
  assert.ok(loaded.languages.typescript, "tsx should transitively load typescript");
});

test("loads normalized first-party aliases by canonical language", async () => {
  const load = createGrammarLoader();
  const loaded = await load([normalizeLanguage("js")]);

  assert.ok(loaded.languages.javascript);
  assert.equal(loaded.languages.js, undefined);
  assert.equal(loaded.scopes.get("source.js"), loaded.languages.javascript);
});

test("dynamically loads every second-batch canonical grammar and transitively resolves its dependencies", async () => {
  const load = createGrammarLoader();
  const newLanguages = ["objective-c", "lua", "dart", "assembly", "perl", "r"];

  const loaded = await load(newLanguages);

  for (const language of newLanguages) {
    assert.ok(loaded.languages[language], `expected ${language} to load`);
  }

  // objective-c reuses the shared C grammar via external includes.
  assert.ok(loaded.languages.c, "objective-c should transitively load c");
  assert.equal(loaded.scopes.get("source.c"), loaded.languages.c);
});
