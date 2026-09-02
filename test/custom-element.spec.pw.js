import { test, expect } from "@playwright/test";

test.describe("MicroLighter custom element", () => {
  test("renders the custom element demo page", async ({ page }) => {
    await page.goto("/docs/custom-element.html", { waitUntil: "networkidle" });

    await expect(page.locator("micro-lighter")).toHaveCount(4);
    await expect(page.getByRole("button", { name: "Copy" })).toHaveCount(4);

    await expect.poll(() => page.evaluate(() => {
      let total = 0;
      for (const highlight of CSS.highlights.values()) total += highlight.size;
      return total;
    })).toBeGreaterThan(0);

    await page.selectOption("#theme", "dracula");
    await expect(page.locator("html")).toHaveAttribute("data-syntax-theme", "dracula");

    expect(await page.evaluate(() => {
      return document.documentElement.scrollWidth <= document.documentElement.clientWidth;
    })).toBe(true);

    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => {
      return document.documentElement.scrollWidth <= document.documentElement.clientWidth;
    })).toBe(true);
    await expect.poll(() => page.locator("micro-lighter[line-numbers]").first().evaluate(element => {
      const gutter = element.shadowRoot.querySelector(".line-numbers");
      const gutterStyle = getComputedStyle(gutter);
      const preStyle = getComputedStyle(element.querySelector("pre"));
      return {
        lineHeight: gutterStyle.lineHeight === preStyle.lineHeight,
        paddingTop: gutterStyle.paddingBlockStart === preStyle.paddingBlockStart
      };
    })).toEqual({ lineHeight: true, paddingTop: true });

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect.poll(() => page.locator("micro-lighter[line-numbers]").first().evaluate(element => {
      const gutter = element.shadowRoot.querySelector(".line-numbers");
      const gutterStyle = getComputedStyle(gutter);
      const preStyle = getComputedStyle(element.querySelector("pre"));
      return {
        lineHeight: gutterStyle.lineHeight === preStyle.lineHeight,
        paddingTop: gutterStyle.paddingBlockStart === preStyle.paddingBlockStart
      };
    })).toEqual({ lineHeight: true, paddingTop: true });
  });

  test("supports the micro-lighter custom element", async ({ page }) => {
    await page.goto("/docs/", { waitUntil: "networkidle" });

    await page.evaluate(async () => {
      window.copyWrites = [];
      window.notifications = [];
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: value => window.copyWrites.push(value) }
      });
      Object.defineProperty(HTMLElement.prototype, "ariaNotify", {
        configurable: true,
        value(message) {
          window.notifications.push(message);
        }
      });

      await import("/docs/microlighter/micro-lighter-element.min.js");
      document.body.insertAdjacentHTML("beforeend", `
        <micro-lighter id="explicit" language="javascript" controls="copy">
          <pre><code data-language="python">const explicit = true;</code></pre>
        </micro-lighter>
        <micro-lighter id="inferred" line-numbers>
          <pre><code class="language-javascript">const inferred = true;
const secondLine = false;</code></pre>
        </micro-lighter>
        <micro-lighter id="many-lines" line-numbers>
          <pre><code></code></pre>
        </micro-lighter>
      `);
      document.querySelector("#many-lines code").textContent = Array.from(
        { length: 1000 },
        (_, index) => `line ${index + 1}`
      ).join("\n");
    });

    await expect.poll(() => page.evaluate(() => {
      const highlighted = new Set();
      for (const ranges of CSS.highlights.values()) {
        for (const range of ranges) {
          const id = range.startContainer.parentElement?.closest("micro-lighter")?.id;
          if (id) highlighted.add(id);
        }
      }
      return [...highlighted].sort();
    })).toEqual(["explicit", "inferred"]);

    await expect.poll(() => page.locator("#many-lines").evaluate(element => {
      return element.shadowRoot.querySelector(".line-numbers").textContent.endsWith("1000");
    })).toBe(true);

    expect(await page.locator("#many-lines").evaluate(element => {
      const gutter = element.shadowRoot.querySelector(".line-numbers");
      const gutterBox = gutter.getBoundingClientRect();
      const gutterStyle = getComputedStyle(gutter);
      const pre = element.querySelector("pre");
      const preBox = pre.getBoundingClientRect();
      const preStyle = getComputedStyle(pre);
      return {
        border: gutterStyle.borderInlineEndWidth,
        columnsMeet: Math.abs(gutterBox.right - preBox.left) < 1,
        endRadius: preStyle.borderEndStartRadius,
        paddingIsSymmetric: gutterStyle.paddingInlineStart === gutterStyle.paddingInlineEnd,
        startRadius: preStyle.borderStartStartRadius,
        widerThanThreeRem: gutterBox.width > 48
      };
    })).toEqual({
      border: "0px",
      columnsMeet: true,
      endRadius: "0px",
      paddingIsSymmetric: true,
      startRadius: "0px",
      widerThanThreeRem: true
    });

    expect(await page.locator("#explicit code").getAttribute("data-language"))
      .toBe("javascript");

    expect(await page.locator("#explicit").evaluate(element => {
      const button = getComputedStyle(element.shadowRoot.querySelector("button"));
      const pre = getComputedStyle(element.querySelector("pre"));
      return {
        backgroundMatches: button.backgroundColor === pre.backgroundColor,
        borderStyle: button.borderStyle,
        colorMatches: button.color === pre.color
      };
    })).toEqual({
      backgroundMatches: true,
      borderStyle: "solid",
      colorMatches: true
    });

    await page.locator("#explicit button").click();
    await expect(page.locator("#explicit button")).toHaveText("Copied");
    expect(await page.evaluate(() => ({
      notifications: window.notifications,
      writes: window.copyWrites
    }))).toEqual({
      notifications: ["Copied to clipboard"],
      writes: ["const explicit = true;"]
    });
    await expect(page.locator("#inferred button")).toBeHidden();

    expect(await page.locator("#inferred").evaluate(element => {
      const gutter = element.shadowRoot.querySelector(".line-numbers");
      const pre = element.querySelector("pre");
      const gutterBox = gutter.getBoundingClientRect();
      const preBox = pre.getBoundingClientRect();
      const gutterStyle = getComputedStyle(gutter);
      const preStyle = getComputedStyle(pre);
      return {
        ariaHidden: gutter.getAttribute("aria-hidden"),
        code: element.querySelector("code").textContent,
        columnsMeet: Math.abs(gutterBox.right - preBox.left) < 1,
        hidden: gutter.hidden,
        lineHeightMatches: gutterStyle.lineHeight === preStyle.lineHeight,
        numbers: gutter.textContent.trim(),
        paddingTopMatches: gutterStyle.paddingBlockStart === preStyle.paddingBlockStart
      };
    })).toEqual({
      ariaHidden: "true",
      code: "const inferred = true;\nconst secondLine = false;",
      columnsMeet: true,
      hidden: false,
      lineHeightMatches: true,
      numbers: "1\n2",
      paddingTopMatches: true
    });

    await page.locator("#inferred code").evaluate(codeBlock => {
      codeBlock.append("\nconst thirdLine = null;");
    });
    await expect.poll(() => page.locator("#inferred").evaluate(element => {
      return element.shadowRoot.querySelector(".line-numbers").textContent;
    })).toBe("1\n2\n3");

    await page.locator("#inferred").evaluate(element => element.removeAttribute("line-numbers"));
    expect(await page.locator("#inferred").evaluate(element => {
      return element.shadowRoot.querySelector(".line-numbers").hidden;
    })).toBe(true);

    await page.locator("#explicit").evaluate(element => element.removeAttribute("language"));
    await expect.poll(() => page.locator("#explicit code").getAttribute("data-language"))
      .toBe("python");
  });
});
