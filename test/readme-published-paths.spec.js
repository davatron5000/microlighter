import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

// Issue #27: the README's CDN and <script src> / <link href> examples pointed
// straight at "microlighter/microlighter.min.js" and
// "microlighter/themes/github.css", but package.json's "files" only publishes
// "dist", so those paths 404 both on jsdelivr and after a plain npm install.
// This walks every such reference in the README and checks it actually
// resolves to a file that gets published.

const root = fileURLToPath(new URL("..", import.meta.url));

test("README examples reference paths inside the published package directory", async () => {
  const [pkgRaw, readme] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8")
  ]);
  const pkg = JSON.parse(pkgRaw);

  // The one directory package.json actually ships to npm (besides files like
  // package.json/README/LICENSE that npm always includes).
  const [publishedDir] = pkg.files;
  assert.equal(pkg.files.length, 1, "expected exactly one published directory");

  const references = [];
  const attrPattern = /(?:href|src)="([^"]+)"/g;
  let match;
  while ((match = attrPattern.exec(readme))) {
    const url = match[1];

    const cdnPrefix = `https://cdn.jsdelivr.net/npm/${pkg.name}@2/`;
    const localPrefix = `./node_modules/${pkg.name}/`;

    if (url.startsWith(cdnPrefix)) {
      references.push(url.slice(cdnPrefix.length));
    } else if (url.startsWith(localPrefix)) {
      references.push(url.slice(localPrefix.length));
    }
  }

  // Guards the test itself: if the README stops mentioning the CDN/local
  // install paths at all, this test would otherwise pass vacuously.
  assert.ok(references.length > 0, "expected README to reference published asset paths");

  for (const relativePath of references) {
    assert.match(
      relativePath,
      new RegExp(`^${publishedDir}/`),
      `"${relativePath}" is outside the published "${publishedDir}/" directory ` +
        `(package.json "files" only publishes "${publishedDir}")`
    );
    assert.ok(
      existsSync(`${root}${relativePath}`),
      `${relativePath} does not exist (run "./build.sh" first)`
    );
  }
});
