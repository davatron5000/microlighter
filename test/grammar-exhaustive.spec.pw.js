import { test, expect } from "@playwright/test";
import languages from "../docs/languages.js";

const FIXTURE = "/test/fixtures/grammar-exhaustive.html";

const canonicalGrammars = languages.map(language => language.name).sort();

/** Load the fixture and wait for its own highlightAll() pass to finish. */
const gotoFixture = async page => {
  await page.goto(FIXTURE, { waitUntil: "networkidle" });
  await page.waitForSelector("html[data-highlighted]", { timeout: 60_000 });
};

/**
 * Map every live pre > code[class*='language-'] block to whether any CSS
 * Custom Highlight range currently points into it.
 */
const readBlockCoverage = page =>
  page.evaluate(() => {
    const highlightedCodes = new Set();
    for (const highlight of CSS.highlights.values()) {
      for (const range of highlight) {
        const codeBlock = range.startContainer.parentElement?.closest("pre > code[class*='language-']");
        if (codeBlock) highlightedCodes.add(codeBlock);
      }
    }

    return [...document.querySelectorAll("pre > code[class*='language-']")].map(codeBlock => ({
      lang: [...codeBlock.classList]
        .find(className => className.startsWith("language-"))
        .slice("language-".length),
      nonEmpty: codeBlock.textContent.trim().length > 0,
      highlighted: highlightedCodes.has(codeBlock)
    }));
  });

test.describe("Grammar exhaustive fixture (test/fixtures/grammar-exhaustive.html)", () => {
  test("loads without runtime errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", error => errors.push(String(error)));
    page.on("console", message => {
      if (message.type() !== "error") return;
      // Ignore the harmless missing-favicon request; this fixture has none.
      const url = message.location()?.url ?? "";
      if (/favicon\.ico/.test(url) || /favicon\.ico/.test(message.text())) return;
      errors.push(message.text());
    });

    await gotoFixture(page);
    await page.waitForTimeout(200);

    expect(errors).toEqual([]);
  });

  test("declares a non-empty code[class*='language-'] block for every canonical grammar", async ({ page }) => {
    await gotoFixture(page);

    const blocks = await readBlockCoverage(page);
    const declaredLangs = blocks.map(block => block.lang).sort();

    expect(declaredLangs).toEqual(canonicalGrammars);
    expect(blocks.every(block => block.nonEmpty)).toBe(true);
  });

  test("highlights every canonical grammar's block with no unhighlighted leftovers", async ({ page }) => {
    await gotoFixture(page);

    const blocks = await readBlockCoverage(page);
    const unhighlighted = blocks.filter(block => !block.highlighted).map(block => block.lang);

    expect(unhighlighted).toEqual([]);
  });

  test("registers highlight ranges for every core token category across the grammar set", async ({ page }) => {
    await gotoFixture(page);

    const categories = await page.evaluate(() => [...CSS.highlights.keys()].sort());

    for (const category of ["keyword", "string", "comment", "function", "numeric"]) {
      expect(categories).toContain(category);
    }
  });

  test("categorizes inserted and deleted diff lines correctly", async ({ page }) => {
    await gotoFixture(page);

    const diffHighlights = await page.evaluate(() => {
      const getLines = category => [...CSS.highlights.get(category) ?? []]
        .filter(range => range.startContainer.parentElement?.closest("pre > code.language-diff"))
        .map(range => range.toString());

      return {
        inserted: getLines("inserted"),
        deleted: getLines("deleted"),
        keywords: getLines("keyword")
      };
    });

    expect(diffHighlights.inserted.some(line => line.startsWith("+"))).toBe(true);
    expect(diffHighlights.deleted.some(line => line.startsWith("-"))).toBe(true);
    expect(diffHighlights.keywords).toEqual([]);
  });

  test("categorizes Svelte and Vue component syntax", async ({ page }) => {
    await gotoFixture(page);

    const componentHighlights = await page.evaluate(() => {
      const getRanges = (language, category) => [...CSS.highlights.get(category) ?? []]
        .filter(range => range.startContainer.parentElement?.closest(`code.language-${language}`))
        .map(range => range.toString());

      return {
        svelteAttributes: getRanges("svelte", "attribute-name"),
        svelteKeywords: getRanges("svelte", "keyword"),
        vueAttributes: getRanges("vue", "attribute-name"),
        vueStorage: getRanges("vue", "storage")
      };
    });

    // Svelte scopes `bind:` / `on:` directives as keywords, not attribute names.
    expect(componentHighlights.svelteAttributes.length).toBeGreaterThan(0);
    expect(componentHighlights.svelteKeywords).toContain("bind");
    expect(componentHighlights.svelteKeywords).toContain("if");
    expect(componentHighlights.vueAttributes.some(name => /^[@:]|^v-/.test(name))).toBe(true);
    expect(componentHighlights.vueStorage.length).toBeGreaterThan(0);
  });

  test("categorizes Ruby embedded in ERB templates", async ({ page }) => {
    await gotoFixture(page);

    const erbHighlights = await page.evaluate(() => {
      const getRanges = category => [...CSS.highlights.get(category) ?? []]
        .filter(range => range.startContainer.parentElement?.closest("code.language-erb"))
        .map(range => range.toString());

      return {
        tags: getRanges("tag"),
        keywords: getRanges("keyword"),
        variables: getRanges("variable")
      };
    });

    // HTML tags come from the embedded HTML grammar; keywords/variables from Ruby.
    expect(erbHighlights.tags.length).toBeGreaterThan(0);
    expect(erbHighlights.keywords.length).toBeGreaterThan(0);
    expect(erbHighlights.variables.length).toBeGreaterThan(0);
  });
});
