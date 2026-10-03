import { test, expect } from "@playwright/test";
import languages from "../docs/languages.js";

// Playwright serves the whole repo root (see playwright.config.js), so the
// published demo lives under /docs/ and its module graph resolves from
// /docs/microlighter/*.js (the build.sh output copy), not /microlighter/*.js.
const HOMEPAGE = "/docs/";

const canonicalGrammars = languages.map(language => language.name).sort();

/**
 * Read the live CSS Custom Highlight registry state from the page.
 */
const readHighlights = page =>
  page.evaluate(() => {
    let total = 0;
    for (const highlight of CSS.highlights.values()) total += highlight.size;
    return {
      categories: [...CSS.highlights.keys()].sort(),
      total,
      blocks: document.querySelectorAll("pre > code[class*='language-']").length
    };
  });

/**
 * Highlight a single injected code block and read back its ranges by category.
 */
const highlightSnippet = (page, language, code) =>
  page.evaluate(async ({ language, code }) => {
    const root = document.createElement("div");
    const block = document.createElement("code");
    const pre = document.createElement("pre");
    block.className = `language-${language}`;
    block.textContent = code;
    pre.append(block);
    root.append(pre);
    document.body.append(root);

    const { highlightAll } = await import("/docs/microlighter/index.js");
    await highlightAll({ root });

    const ranges = {};
    for (const [category, highlight] of CSS.highlights) {
      for (const range of highlight) {
        if (range.startContainer.parentElement !== block) continue;
        (ranges[category] ??= []).push(range.toString());
      }
    }
    return ranges;
  }, { language, code });

test.describe("MicroLighter demo site (docs/index.html)", () => {
  test("registers highlight ranges across every code block", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const { categories, total, blocks } = await readHighlights(page);

    expect(blocks).toBeGreaterThan(0);
    expect(categories.length).toBeGreaterThan(10);
    expect(total).toBeGreaterThan(100);
  });

  test("exposes the core token categories", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const { categories } = await readHighlights(page);

    for (const category of ["keyword", "string", "comment", "function", "numeric"]) {
      expect(categories).toContain(category);
    }
  });

  test("re-highlights after switching themes via the syntax-highlight event", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const before = await readHighlights(page);

    await page.evaluate(() => {
      document.documentElement.dataset.syntaxTheme = "dracula";
      document.dispatchEvent(new Event("syntax-highlight"));
    });
    await page.waitForTimeout(200);

    const theme = await page.evaluate(() => document.documentElement.dataset.syntaxTheme);
    const after = await readHighlights(page);

    expect(theme).toBe("dracula");
    expect(after.total).toBe(before.total);
  });

  test("loads every bundled theme without changing highlight ranges", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const before = await readHighlights(page);
    const themes = await page.locator("#theme option").evaluateAll(options =>
      options.map(option => option.value)
    );

    expect(themes).toEqual(expect.arrayContaining([
      "github", "vscode-plus", "dracula", "monokai", "night-owl",
      "solarized-light", "vesper", "min", "cobalt2", "tokyo-night"
    ]));

    for (const theme of themes) {
      await page.selectOption("#theme", theme);

      await expect.poll(() => page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue("--syntax-background")
          .trim()
      )).not.toBe("");

      const styles = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        // Find a live, currently-rendered code block robustly: one of the
        // curated static samples is always present, regardless of which
        // playground language happens to be selected.
        const pre = document.querySelector("pre > code[class*='language-']")?.closest("pre");
        const codeStyle = getComputedStyle(pre);
        return {
          theme: document.documentElement.dataset.syntaxTheme,
          background: root.getPropertyValue("--syntax-background").trim(),
          foreground: root.getPropertyValue("--syntax-foreground").trim(),
          inserted: root.getPropertyValue("--syntax-inserted").trim(),
          deleted: root.getPropertyValue("--syntax-deleted").trim(),
          codeBackground: codeStyle.backgroundColor
        };
      });

      expect(styles.theme).toBe(theme);
      expect(styles.background).not.toBe("");
      expect(styles.foreground).not.toBe("");
      expect(styles.inserted).not.toBe("");
      expect(styles.deleted).not.toBe("");
      expect(styles.codeBackground).not.toBe("rgba(0, 0, 0, 0)");
      expect((await readHighlights(page)).total).toBe(before.total);
    }
  });

  test("supports standard classes, data attributes, and deprecated lang attributes", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const highlighted = await page.evaluate(async () => {
      const fixtures = [
        '<pre><code id="class-language" class="example language-js">const classValue = true;</code></pre>',
        '<pre><code id="code-data-language" data-language="json">{"code": true}</code></pre>',
        '<pre data-language="python"><code id="pre-data-language">value = True</code></pre>',
        '<pre lang="ruby"><code id="legacy-lang">legacy = true</code></pre>'
      ];
      document.body.insertAdjacentHTML("beforeend", fixtures.join(""));
      document.dispatchEvent(new Event("syntax-highlight"));
      await new Promise(resolve => setTimeout(resolve, 100));

      const ids = new Set();
      for (const highlight of CSS.highlights.values()) {
        for (const range of highlight) {
          const id = range.startContainer.parentElement?.closest("code")?.id;
          if (id) ids.add(id);
        }
      }
      return [...ids];
    });

    expect(highlighted).toEqual(expect.arrayContaining([
      "class-language",
      "code-data-language",
      "pre-data-language",
      "legacy-lang"
    ]));
  });

  test("normalizes adjacent text nodes before highlighting", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    await page.evaluate(() => {
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.id = "adjacent-text-nodes";
      code.className = "language-javascript";
      code.append(new Text("const answer"), new Text(" = 42;"));
      pre.append(code);
      document.body.append(pre);
      document.dispatchEvent(new Event("syntax-highlight"));
    });

    await expect.poll(() => page.evaluate(() => {
      const code = document.querySelector("#adjacent-text-nodes");
      let highlighted = false;
      for (const highlight of CSS.highlights.values()) {
        for (const range of highlight) {
          if (range.startContainer.parentElement === code) highlighted = true;
        }
      }
      return { childNodes: code.childNodes.length, highlighted };
    })).toEqual({ childNodes: 1, highlighted: true });
  });

  test("accepts built-in and custom language aliases through the import API", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const highlighted = await page.evaluate(async () => {
      const root = document.createElement("div");
      root.innerHTML = [
        '<pre><code id="exported-alias" class="language-js">const exported = true;</code></pre>',
        '<pre><code id="custom-alias" class="language-ecmascript">const custom = true;</code></pre>'
      ].join("");
      document.body.append(root);

      const { highlightAll } = await import("/docs/microlighter/index.js");
      await highlightAll({
        root,
        languageAliases: {
          ecmascript: "javascript"
        }
      });

      const ids = new Set();
      for (const highlight of CSS.highlights.values()) {
        for (const range of highlight) {
          const id = range.startContainer.parentElement?.closest("code")?.id;
          if (id) ids.add(id);
        }
      }
      return [...ids];
    });

    expect(highlighted).toEqual(expect.arrayContaining([
      "exported-alias",
      "custom-alias"
    ]));
  });

  test("removes stale ranges when code blocks disappear", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    await page.evaluate(() => {
      document.querySelectorAll("pre > code[class*='language-']").forEach(codeBlock => codeBlock.remove());
      document.dispatchEvent(new Event("syntax-highlight"));
    });

    await expect.poll(() => readHighlights(page)).toMatchObject({
      categories: [],
      total: 0
    });
  });

  test("keeps blocks highlighted when overlapping calls see different languages", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const highlighted = await page.evaluate(async () => {
      const { highlightAll } = await import("/docs/microlighter/index.js");
      const root = document.createElement("div");
      root.innerHTML = [
        '<pre><code id="early" class="language-css">a { color: red; }</code></pre>',
        '<pre><code id="late">const late = true;</code></pre>'
      ].join("");
      document.body.append(root);

      // Mirrors <micro-lighter> upgrade: a scan starts before a later element
      // stamps its language, then a second scan starts that sees both blocks.
      const first = highlightAll({ root });
      root.querySelector("#late").dataset.language = "javascript";
      const second = highlightAll({ root });
      await Promise.all([first, second]);

      const ids = new Set();
      for (const highlight of CSS.highlights.values()) {
        for (const range of highlight) {
          const id = range.startContainer.parentElement?.closest("code")?.id;
          if (id) ids.add(id);
        }
      }
      return [...ids].sort();
    });

    expect(highlighted).toEqual(["early", "late"]);
  });

  test("curates exactly six full static language samples", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const sampleLanguages = await page.evaluate(() =>
      [...document.querySelectorAll("section.sample:not(.playground) > pre > code[class*='language-']")]
        .map(codeBlock => [...codeBlock.classList]
          .find(className => className.startsWith("language-"))
          .slice("language-".length)));

    expect(sampleLanguages).toEqual(["html", "markdown", "python", "sql", "cpp", "tsx"]);
  });

  test("stops unterminated quotes from swallowing later lines", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const css = await highlightSnippet(page, "css", [
      "a { font-family: Don't; }",
      'b { content: "kept"; }',
      "c { font-family: Won't; }"
    ].join("\n"));
    const yaml = await highlightSnippet(page, "yaml", [
      "first: don't",
      'second: "kept"',
      "third: won't"
    ].join("\n"));

    // The grammars (like VS Code) may flag the stray quote as an unclosed
    // string, but it must end at the line break rather than consume the rest.
    expect(css.string).toContain('"kept"');
    expect(css.string.every(value => !value.includes("\n"))).toBe(true);
    expect(yaml.string).toContain('"kept"');
    expect(yaml.string.every(value => !value.includes("\n"))).toBe(true);
  });

  test("keeps single-line string literals on their own line", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    // `first = "kept"` is not valid CSS or GraphQL, so those grammars (like
    // VS Code) do not tokenize the quotes as strings.
    const languages = [
      "asm", "c", "csharp", "dart",
      "java", "kotlin", "lua", "swift", "toml"
    ];
    const unexpected = {};

    for (const language of languages) {
      const ranges = await highlightSnippet(page, language, 'first = "kept"\nsecond = "also"\nthird = 1\n');
      const strings = ranges.string ?? [];
      if (!strings.includes('"kept"') || !strings.includes('"also"') || strings.some(value => value.includes("\n"))) {
        unexpected[language] = strings;
      }
    }

    expect(unexpected).toEqual({});
  });

  test("keeps highlighting yaml quoted scalars folded over several lines", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const ranges = await highlightSnippet(page, "yaml", 'key: "folded\n  continuation"\nnext: 1\n');

    expect(ranges.string).toContain('"folded\n  continuation"');
  });

  test("categorizes block at-rules as at-rule keywords, not selectors", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const ranges = await highlightSnippet(page, "css", [
      '@font-face { font-family: "Example"; }',
      "@page { margin: 1cm; }",
      "@counter-style thumbs { system: cyclic; }",
      "@view-transition { navigation: auto; }"
    ].join("\n"));

    expect(ranges["at-rule"]).toEqual([
      "@font-face",
      "@page",
      "@counter-style",
      "@view-transition"
    ]);
    expect(ranges.selector ?? []).toEqual([]);
  });

  test("scopes multi-line selectors per line without trailing whitespace", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const ranges = await highlightSnippet(page, "css", "a,\nb\n{\n  color: red;\n}\n");

    // TextMate grammars scan line by line; `meta.selector.css` ends at `$`.
    expect(ranges.selector).toEqual(["a,", "b"]);
  });

  test("highlights a large stylesheet without pathological rescanning", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const duration = await page.evaluate(async () => {
      const { highlightAll } = await import("/docs/microlighter/index.js");
      const sources = Array.from({ length: 60 }, (_, index) =>
        `       url("https://fonts.example/font-${index}.woff2") format("woff2")`).join(",\n");
      const rule = `@font-face {\n  font-family: "Example";\n  src:\n${sources};\n}\n`;

      let css = "/* unterminated apostrophe: don't */\n";
      while (css.length < 32 * 1024) css += rule;

      const code = document.createElement("code");
      code.className = "language-css";
      code.textContent = css;
      const pre = document.createElement("pre");
      pre.append(code);
      document.body.append(pre);

      const start = performance.now();
      await highlightAll();
      return performance.now() - start;
    });

    expect(duration).toBeLessThan(5000);
  });

  test("loads without runtime errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", error => errors.push(String(error)));
    page.on("console", message => {
      if (message.type() !== "error") return;
      // Ignore the harmless missing-favicon request the demo makes; its URL
      // lives on the message location, not in the generic error text.
      const url = message.location()?.url ?? "";
      if (/favicon\.ico/.test(url) || /favicon\.ico/.test(message.text())) return;
      errors.push(message.text());
    });

    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });
    await page.waitForTimeout(200);

    expect(errors).toEqual([]);
  });
});

test.describe("Supported languages index", () => {
  test("lists every canonical grammar grouped by category", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const listed = await page.evaluate(() =>
      [...document.querySelectorAll(".language-index [data-lang]")].map(item => item.dataset.lang));

    expect(listed.sort()).toEqual(canonicalGrammars);
    expect(new Set(listed).size).toBe(listed.length);
  });

  test("organizes languages into meaningful, labeled groups", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const groups = await page.evaluate(() =>
      [...document.querySelectorAll(".language-group")].map(group => ({
        name: group.querySelector("h3")?.textContent.trim(),
        languages: [...group.querySelectorAll("[data-lang]")].map(item => item.dataset.lang)
      })));

    const byName = Object.fromEntries(groups.map(group => [group.name, group.languages]));

    expect(Object.keys(byName).length).toBeGreaterThanOrEqual(4);
    // Formats and markup/styling languages aren't shoved into "programming".
    expect(byName["Web"]).toEqual(expect.arrayContaining(["html", "css", "scss"]));
    expect(byName["Data, config & docs"]).toEqual(expect.arrayContaining(["diff", "toml", "yaml"]));
  });
});

test.describe("Language playground", () => {
  test("defaults to a language not already shown as a static sample", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const staticSamples = ["html", "markdown", "python", "sql", "cpp", "tsx"];
    const selected = await page.locator("#playground-language").inputValue();

    expect(staticSamples).not.toContain(selected);
    await expect(page.locator(`#playground-output code.language-${selected}`)).toHaveCount(1);
  });

  test("keeps every language sample inert until selected", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });
    await expect(page.locator("#playground-output code[class*='language-']")).toHaveCount(1);

    const { optionCount, renderedBlocks } = await page.evaluate(() => ({
      optionCount: document.querySelectorAll("#playground-language option").length,
      // Samples are fetched on selection, so only the chosen one is ever in the DOM.
      renderedBlocks: document.querySelectorAll(".playground-body pre").length
    }));

    expect(optionCount).toBeGreaterThan(10);
    expect(renderedBlocks).toBe(1);
  });

  test("renders exactly one sample at a time and lazily highlights the new selection", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    await page.selectOption("#playground-language", "rust");
    await expect(page.locator("#playground-output code[class*='language-']")).toHaveCount(1);
    await expect(page.locator("#playground-output code.language-rust")).toHaveCount(1);

    await expect.poll(() => page.evaluate(() => {
      const codeBlock = document.querySelector("#playground-output code.language-rust");
      for (const highlight of CSS.highlights.values()) {
        for (const range of highlight) {
          if (range.startContainer.parentElement?.closest("#playground-output pre > code") === codeBlock) return true;
        }
      }
      return false;
    })).toBe(true);

    await page.selectOption("#playground-language", "yaml");
    await expect(page.locator("#playground-output code[class*='language-']")).toHaveCount(1);
    await expect(page.locator("#playground-output code.language-yaml")).toHaveCount(1);
    await expect(page.locator("#playground-output code.language-rust")).toHaveCount(0);
  });

  test("edits and re-highlights the selected sample", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const codeBlock = page.locator("#playground-output code.language-css");
    await expect(codeBlock).toHaveAttribute("contenteditable", "plaintext-only");
    await codeBlock.fill(".playground { color: hotpink; }");
    await codeBlock.press("End");
    await codeBlock.press("Enter");
    await codeBlock.pressSequentially("/* Still editable */");
    await expect(codeBlock).toHaveText(".playground { color: hotpink; }\n/* Still editable */");

    await expect.poll(() => page.evaluate(() => {
      const editableCode = document.querySelector("#playground-output code.language-css");
      if (editableCode.childNodes.length !== 1 || editableCode.firstChild.nodeType !== Node.TEXT_NODE) return false;
      for (const highlight of CSS.highlights.values()) {
        for (const range of highlight) {
          if (range.startContainer === editableCode.firstChild) return true;
        }
      }
      return false;
    })).toBe(true);
  });

  test("select options cover every canonical grammar with a readable label", async ({ page }) => {
    await page.goto(HOMEPAGE, { waitUntil: "networkidle" });

    const options = await page.evaluate(() =>
      [...document.querySelectorAll("#playground-language option")].map(option => ({
        value: option.value,
        label: option.textContent.trim()
      })));

    expect(options.map(option => option.value).sort()).toEqual(canonicalGrammars);
    expect(options.every(option => option.label.length > 0)).toBe(true);
  });
});
