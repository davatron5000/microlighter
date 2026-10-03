import assert from "node:assert/strict";
import test from "node:test";

import {
  createGrammarLoader,
  getExternalLanguages,
  normalizeLanguage
} from "../src/grammar-dependencies.js";
import cpp from "../src/grammars/cpp.js";
import html from "../src/grammars/html.js";
import markdown from "../src/grammars/markdown.js";
import objectiveC from "../src/grammars/objective-c.js";
import scss from "../src/grammars/scss.js";
import tsx from "../src/grammars/tsx.js";
import typescript from "../src/grammars/typescript.js";
import svelte from "../src/grammars/svelte.js";
import vue from "../src/grammars/vue.js";

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

test("normalizes only aliases that cannot be grammar file names", () => {
  assert.equal(normalizeLanguage("c#"), "csharp");
  assert.equal(normalizeLanguage("c++"), "cpp");
  // File-name-safe aliases resolve through re-export modules instead.
  assert.equal(normalizeLanguage("js"), "js");
  assert.equal(normalizeLanguage("python"), "python");
  assert.equal(normalizeLanguage("custom-language"), "custom-language");
  assert.equal(normalizeLanguage("ecmascript", { ecmascript: "javascript" }), "javascript");
});

test("declares embedded grammars as dependencies of each precompiled grammar", () => {
  assert.deepEqual(scss.dependencies, ["css"]);
  assert.deepEqual(html.dependencies, ["javascript", "css"]);
  assert.deepEqual(markdown.dependencies, []);
  assert.deepEqual(cpp.dependencies, ["cpp-macro", "regexp", "glsl"]);
  assert.ok(svelte.dependencies.includes("javascript"));
  assert.ok(vue.dependencies.includes("vue-directives"));
  // Scope includes are not scanned when a grammar declares its dependencies.
  assert.deepEqual([...getExternalLanguages(typescript)], []);
  assert.deepEqual([...getExternalLanguages(tsx)], []);
  assert.deepEqual([...getExternalLanguages(objectiveC)], []);
});

test("compiles anchors as variants and end backreferences as markers", () => {
  const styleBlock = html.repository["tags-valid"].patterns[0].patterns[0].patterns[1];
  assert.deepEqual(Object.keys(styleBlock.begin), ["G"]);
  assert.equal(styleBlock.begin.G.length, 2);
  assert.ok(styleBlock.begin.G.every(variant => variant instanceof RegExp));

  const frontMatter = markdown.repository.frontMatter.begin;
  assert.deepEqual(Object.keys(frontMatter), ["A"]);

  const langTag = vue.patterns.find(rule => rule.end instanceof RegExp && rule.patterns)?.patterns[0];
  assert.match(langTag.end.source, /\uE0001\uE001/);
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

  // cpp declares c, glsl and regexp as dependencies; they load once and are
  // indexed by scope for the includes that reference them.
  assert.equal(loaded.scopes.get("source.c"), loaded.languages.c);
  assert.ok(loaded.languages.glsl, "cpp should transitively load glsl");
  assert.equal(loaded.scopes.get("source.glsl"), loaded.languages.glsl);
  assert.equal(loaded.scopes.get("source.tsx"), loaded.languages.tsx);
});

test("loads first-party aliases through their re-export modules", async () => {
  const load = createGrammarLoader();
  const loaded = await load(["js", "javascript"]);

  assert.equal(loaded.languages.js, loaded.languages.javascript);
  assert.equal(loaded.languages.js.scopeName, "source.js");
  assert.equal(loaded.scopes.get("source.js"), loaded.languages.javascript);
});

test("dynamically loads every second-batch canonical grammar", async () => {
  const load = createGrammarLoader();
  const newLanguages = ["objective-c", "lua", "dart", "asm", "perl", "r"];

  const loaded = await load(newLanguages);

  for (const language of newLanguages) {
    assert.ok(loaded.languages[language], `expected ${language} to load`);
  }

  // lua depends on the shared C grammar for its embedded C API blocks.
  assert.ok(loaded.languages.c, "lua should transitively load c");
  assert.equal(loaded.scopes.get("source.c"), loaded.languages.c);
  assert.equal(loaded.scopes.get("source.objc"), loaded.languages["objective-c"]);
});
