import { readdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const FIXTURE = "/test/fixtures/grammar-exhaustive.html";

const canonicalGrammars = readdirSync(new URL("../src/grammars", import.meta.url))
  .map(file => file.replace(/\.js$/, ""))
  .sort();

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

    await page.goto(FIXTURE, { waitUntil: "networkidle" });
    await page.waitForTimeout(200);

    expect(errors).toEqual([]);
  });

  test("declares a non-empty code[class*='language-'] block for every canonical grammar", async ({ page }) => {
    await page.goto(FIXTURE, { waitUntil: "networkidle" });

    const blocks = await readBlockCoverage(page);
    const declaredLangs = blocks.map(block => block.lang).sort();

    expect(declaredLangs).toEqual(canonicalGrammars);
    expect(blocks.every(block => block.nonEmpty)).toBe(true);
  });

  test("highlights every canonical grammar's block with no unhighlighted leftovers", async ({ page }) => {
    await page.goto(FIXTURE, { waitUntil: "networkidle" });

    const blocks = await readBlockCoverage(page);
    const unhighlighted = blocks.filter(block => !block.highlighted).map(block => block.lang);

    expect(unhighlighted).toEqual([]);
  });

  test("registers highlight ranges for every core token category across the grammar set", async ({ page }) => {
    await page.goto(FIXTURE, { waitUntil: "networkidle" });

    const categories = await page.evaluate(() => [...CSS.highlights.keys()].sort());

    for (const category of ["keyword", "string", "comment", "function", "numeric"]) {
      expect(categories).toContain(category);
    }
  });

  test("categorizes inserted and deleted git-diff lines correctly", async ({ page }) => {
    await page.goto(FIXTURE, { waitUntil: "networkidle" });

    const diffHighlights = await page.evaluate(() => {
      const getLines = category => [...CSS.highlights.get(category) ?? []]
        .filter(range => range.startContainer.parentElement?.closest("pre > code.language-git-diff"))
        .map(range => range.toString());

      return {
        inserted: getLines("inserted"),
        deleted: getLines("deleted"),
        keywords: getLines("keyword")
      };
    });

    expect(diffHighlights.inserted).toEqual(expect.arrayContaining(["+const answer = 42;"]));
    expect(diffHighlights.deleted).toEqual(expect.arrayContaining(["-const answer = 0;"]));
    expect(diffHighlights.keywords).toEqual([]);
  });

  test("categorizes Svelte and Vue component syntax", async ({ page }) => {
    await page.goto(FIXTURE, { waitUntil: "networkidle" });

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

    expect(componentHighlights.svelteAttributes).toContain("on:click");
    expect(componentHighlights.svelteKeywords).toContain("if");
    expect(componentHighlights.vueAttributes).toContain("@click");
    expect(componentHighlights.vueStorage).toContain("const");
  });

  test("categorizes Elixir embedded in HEEx templates", async ({ page }) => {
    await page.goto(FIXTURE, { waitUntil: "networkidle" });

    const heexHighlights = await page.evaluate(() => {
      const getRanges = category => [...CSS.highlights.get(category) ?? []]
        .filter(range => range.startContainer.parentElement?.closest("code.language-heex"))
        .map(range => range.toString());

      return {
        attributes: getRanges("attribute-name"),
        functions: getRanges("function"),
        variables: getRanges("variable")
      };
    });

    expect(heexHighlights.attributes).toEqual(expect.arrayContaining(["phx-click", ":if"]));
    expect(heexHighlights.functions).toContain("gettext");
    expect(heexHighlights.variables).toEqual(expect.arrayContaining(["@enabled", "@count"]));
  });

  test("categorizes Twig tags, filters, and expressions inside HTML", async ({ page }) => {
    await page.goto(FIXTURE, { waitUntil: "networkidle" });

    const twigHighlights = await page.evaluate(() => {
      const getRanges = category => [...CSS.highlights.get(category) ?? []]
        .filter(range => range.startContainer.parentElement?.closest("code.language-twig"))
        .map(range => range.toString());

      return {
        attributes: getRanges("attribute-name"),
        comments: getRanges("comment"),
        functions: getRanges("function"),
        keywords: getRanges("keyword"),
        operators: getRanges("operator"),
        punctuation: getRanges("punctuation"),
        strings: getRanges("string"),
        tags: getRanges("tag"),
        variables: getRanges("variable")
      };
    });

    expect(twigHighlights.attributes).toContain("class");
    expect(twigHighlights.comments).toContain("{# Render the visible items #}");
    expect(twigHighlights.functions).toEqual(expect.arrayContaining(["length", "upper"]));
    expect(twigHighlights.keywords).toEqual(expect.arrayContaining(["for", "if", "endfor"]));
    expect(twigHighlights.operators).toEqual(expect.arrayContaining(["in", ">", "?"]));
    expect(twigHighlights.operators).not.toContain("|");
    expect(twigHighlights.punctuation).not.toContain(".");
    expect(twigHighlights.strings).toEqual(expect.arrayContaining(["'grid'", "'list'"]));
    expect(twigHighlights.tags).toEqual(expect.arrayContaining(["ul", "li"]));
    expect(twigHighlights.variables).toEqual(expect.arrayContaining(["items", "item", "visible", "name"]));
  });
});
