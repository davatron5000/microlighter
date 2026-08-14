import { test, expect } from "@playwright/test";

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
      blocks: document.querySelectorAll("pre[lang] > code").length
    };
  });

test.describe("MicroLighter demo site (docs/index.html)", () => {
  test("registers highlight ranges across every code block", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const { categories, total, blocks } = await readHighlights(page);

    expect(blocks).toBeGreaterThan(0);
    expect(categories.length).toBeGreaterThan(10);
    expect(total).toBeGreaterThan(100);
  });

  test("exposes the core token categories", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const { categories } = await readHighlights(page);

    for (const category of ["keyword", "string", "comment", "function", "number"]) {
      expect(categories).toContain(category);
    }
  });

  test("highlights inserted and deleted git diff lines", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const diffHighlights = await page.evaluate(() => {
      const linesFor = category => [...CSS.highlights.get(category) ?? []]
        .filter(range => range.startContainer.parentElement?.closest("pre[lang='git-diff']"))
        .map(range => range.toString());

      return {
        inserted: linesFor("inserted"),
        deleted: linesFor("deleted"),
        keywords: linesFor("keyword")
      };
    });

    expect(diffHighlights.inserted).toEqual(expect.arrayContaining([
      '+  diff: "git-diff",',
      '+  html: "html",'
    ]));
    expect(diffHighlights.deleted).toContain('-  htm: "html",');
    expect(diffHighlights.keywords).toEqual([]);
  });

  test("re-highlights after switching themes via the syntax-highlight event", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

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

  test("highlights every non-empty code block, including python, go, rust, and typescript", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const { langs, unhighlighted } = await page.evaluate(() => {
      const highlighted = new Set();
      for (const highlight of CSS.highlights.values()) {
        for (const range of highlight) {
          const code = range.startContainer.parentElement?.closest("pre[lang] > code");
          if (code) highlighted.add(code);
        }
      }

      const blocks = [...document.querySelectorAll("pre[lang] > code")]
        .filter(code => code.textContent.trim().length > 0);

      return {
        langs: [...new Set(blocks.map(code => code.parentElement.getAttribute("lang")))],
        unhighlighted: blocks
          .filter(code => !highlighted.has(code))
          .map(code => code.parentElement.getAttribute("lang"))
      };
    });

    expect(langs).toEqual(expect.arrayContaining(["python", "go", "rust", "typescript"]));
    expect(unhighlighted).toEqual([]);
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

    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(200);

    expect(errors).toEqual([]);
  });
});
