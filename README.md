# MicroLighter

[![CI](https://github.com/davatron5000/microlighter/actions/workflows/ci.yml/badge.svg)](https://github.com/davatron5000/microlighter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A tiny, dependency-free syntax highlighter for the web. MicroLighter uses the
[CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API)
and TextMate grammars to colorize code **without** wrapping every token in a
`<span>`. Your markup stays clean; the highlighting lives entirely in the
highlight registry and CSS.

## Usage

MicroLighter ships in three flavors so you can pick the right trade-off between
convenience and control. In every case, mark up code blocks with a `lang`
attribute on the `<pre>`:

```html
<pre lang="javascript"><code>const answer = 42;</code></pre>
```

### 1. Auto (drop-in)

The auto-run entry (`microlighter/microlighter.js`, or the minified
`microlighter/microlighter.min.js`) runs on import: it scans the page for
`pre[lang] > code`, lazily imports only the grammars it needs, tokenizes each
block, registers ranges with `CSS.highlights`, and re-highlights whenever a
`syntax-highlight` event fires.

```html
<body data-syntax-theme="github">
<link rel="stylesheet" href="./src/themes/github.css">
<script type="module" src="./src/microlighter.js"></script>
```

To re-highlight after dynamically adding code (e.g. in a SPA):

```js
document.dispatchEvent(new Event("syntax-highlight"));
```

### 2. Programmatic (side-effect-free)

The default entry (`microlighter`) exports `highlightAll()` and does **nothing**
on import, so it's tree-shakeable and safe to pull into a bundler. Call it when
you're ready:

```js
import { highlightAll } from "microlighter";

await highlightAll();

// Scope to part of the page, or use a custom selector:
await highlightAll({ root: document.querySelector("#docs") });
await highlightAll({ selector: "pre.code > code" });
```

The low-level tokenizer is also available on its own via
`microlighter/highlight.js` if you want to drive grammar resolution yourself.

### 3. CDN / single file

`microlighter/microlighter.min.js` is a prebuilt, minified single-file bundle of
the auto runner (~2 KiB gzip) with no separate grammar requests inlined —
grammars and themes are still fetched on demand:

```html
<script type="module" src="https://cdn.example.com/microlighter/microlighter.min.js"></script>
```

## Themes

Themes are plain CSS files that style the highlight pseudo-elements
(`::highlight(keyword)`, `::highlight(string)`, etc.). Load one theme directly
and set its name in `data-syntax-theme` on `<body>` or any containing element:

```html
<body data-syntax-theme="night-owl">
<link rel="stylesheet" href="./src/themes/night-owl.css">
```

Bundled themes:

- `github`
- `vscode-plus`
- `dracula`
- `monokai`
- `night-owl`
- `solarized-light`

## Languages

Grammars ship as ES modules in `src/grammars/` and are loaded on demand:
`bash`, `css`, `git-diff`, `go`, `html`, `javascript`, `json`, `markdown`,
`python`, `ruby`, `rust`, `scss`, `typescript`, `yaml`. Common aliases (`js`,
`ts`, `sh`, `yml`, `rb`, `md`, `diff`, `patch`, `sass`, `py`, `rs`, …) resolve
automatically.

## Build

Produce the distributable `dist/` folder (copied ESM source plus the minified
single-file bundle `dist/microlighter.min.js`):

```sh
npm run build
```

The build prints a size report: raw / gzip / brotli for the shipped bundle, a
raw / minified / gzip breakdown of every lazily-loaded grammar and theme, and an
average size per category (grammars vs. themes). It fails if the bundle's gzip
size exceeds the `sizeLimit` in `package.json`. Run the report on its own anytime
with:

```sh
npm run size
```

## Tests

End-to-end tests drive the demo site (`docs/index.html`) in a real browser
(system Chrome) with Playwright and assert that highlight ranges register, the
core token categories are present, and theme switching re-highlights cleanly:

```sh
npm test
```

`npm test` first rebuilds `dist/` and the generated `docs/microlighter/` copy so
tests run against current code. Updating the headline gzip size on the demo homepage
(`docs/index.html`) is a separate, explicit step — it is never done automatically:

```sh
npm run docs:update-homepage-stats
```

This rebuilds the bundle and writes the current gzip size into the homepage. Plain
`npm run size` is read-only and never edits the homepage.

## Demo

The demo lives in `docs/` as a self-contained static site. `npm run build`
generates a git-ignored copy of the package in `docs/microlighter/`, which
`docs/index.html` loads. Serve the `docs/` folder over HTTP so ES module imports
resolve:

```sh
npm run build   # populates docs/microlighter/
npx serve docs
```

### Publishing to GitHub Pages

The CI workflow builds and tests the package, uploads the generated `docs/`
directory as a Pages artifact, and deploys it on pushes to `main`. This keeps
the package copy out of Git while avoiding a second build or a `gh-pages`
branch. In **Settings → Pages**, set the source to **GitHub Actions**.

## Contributing

Contributions are welcome — new grammars, themes, bug fixes, and docs. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for the dev setup, project layout, and how
to add a grammar or theme.

## Prior art

MicroLighter stands on the shoulders of a lot of existing work. The technique of
highlighting code with the [CSS Custom Highlight API][highlight-api] — mapping
token ranges to `Highlight` objects instead of wrapping every token in a
`<span>` — is not new, and neither are TextMate grammars. What MicroLighter adds
is a tiny, dependency-free implementation: it parses [TextMate grammars][tm]
with the browser's native `RegExp` (using the [`d` flag][d-flag] for match
indices) rather than shipping the Oniguruma WASM engine, lazily loads grammars,
and maps scopes onto Prism-style category names.

Foundations and inspiration:

- **[TextMate grammars][tm]** — the grammar format (scopes, `begin`/`end`,
  `patterns`, `repository`, `include`) that MicroLighter interprets. Popularized
  by [TextMate][textmate] and adopted by [VS Code][vscode-grammar], which is
  where most of the community `.tmLanguage.json` grammars come from.
- **[Prism.js][prism]** — the token category vocabulary (`keyword`, `string`,
  `punctuation`, `function`, `tag`, etc.) that themes target via
  `::highlight(...)` mirrors Prism's token class names, so existing Prism themes
  are easy to port.
- **[Shiki][shiki]** — the canonical TextMate-grammar-based highlighter for the
  web (backed by VS Code's Oniguruma tokenizer). MicroLighter trades Shiki's
  accuracy and language coverage for zero dependencies and a smaller footprint.
- **[Bramus Van Damme's "Syntax Highlighting code snippets with Prism and the
  Custom Highlight API"][bramus]** — the 2024 write-up that popularized using the
  Custom Highlight API for syntax highlighting.

Similar projects worth knowing about:

- **[textmate-highlighter][tmh]** — TextMate grammars + VS Code themes with a
  CSS Custom Highlights render target (uses Oniguruma).
- **[syntax-highlight-element][she]** — a web component that pairs Prism.js with
  the Custom Highlight API.
- **[shiki-highlight-api][sha]** — renders Shiki tokens through the Custom
  Highlight API.
- **[syntaxp][syntaxp]** — a minimal auto-detecting highlighter over the Custom
  Highlight API.

[highlight-api]: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API
[d-flag]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices
[tm]: https://macromates.com/manual/en/language_grammars
[textmate]: https://macromates.com/
[vscode-grammar]: https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
[prism]: https://prismjs.com/
[shiki]: https://shiki.style/
[bramus]: https://www.bram.us/2024/02/18/custom-highlight-api-for-syntax-highlighting/
[tmh]: https://github.com/fabiospampinato/textmate-highlighter
[she]: https://github.com/andreruffert/syntax-highlight-element
[sha]: https://github.com/shiki-highlights/shiki-highlight-api
[syntaxp]: https://meiert.com/en/blog/custom-highlight-api-syntaxp/

## License

[MIT](./LICENSE) © Dave Rupert
