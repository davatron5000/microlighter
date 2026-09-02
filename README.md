# MicroLighter

[![CI](https://github.com/davatron5000/microlighter/actions/workflows/ci.yml/badge.svg)](https://github.com/davatron5000/microlighter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A tiny, dependency-free syntax highlighter for the web.

MicroLighter uses the [CSS Custom Highlight API][highlight-api] and TextMate
grammars. It highlights code without adding a `<span>` around every token, so
your markup stays clean and editable.

## Features

- About 2 KiB compressed
- No runtime dependencies
- 35 languages, loaded on demand
- 10 bundled themes
- Clean DOM with no token markup
- Programmatic, automatic, and web component APIs
- Editable code block support

## Install

```sh
npm install microlighter
```

## Quick start

Add a language class to your code:

```html
<pre><code class="language-javascript">const answer = 42;</code></pre>
```

Import a theme and run the highlighter:

```js
import "microlighter/themes/github.css";
import { highlightAll } from "microlighter";

document.body.dataset.syntaxTheme = "github";
await highlightAll();
```

That's it. MicroLighter finds every `pre > code` block with a supported
language and highlights it.

## Usage

### Programmatic API

The main package exports `highlightAll()`. Importing it has no side effects.

```js
import { highlightAll } from "microlighter";

await highlightAll();
```

Pass options to limit the scan or add project-specific language aliases:

```js
await highlightAll({
  root: document.querySelector("#docs"),
  selector: "pre.code > code",
  languageAliases: {
    ecmascript: "javascript",
    shellsession: "bash"
  }
});
```

| Option | Default | Description |
| --- | --- | --- |
| `root` | `document` | Element or document to search |
| `selector` | `"pre > code"` | Selector used to find code blocks |
| `languageAliases` | `{}` | Extra aliases mapped to bundled grammars |

`highlightAll()` returns a promise containing the highlighted code elements.

### Automatic highlighting

Import the auto runner to highlight the page as soon as the module loads:

```html
<link rel="stylesheet" href="./node_modules/microlighter/themes/github.css">
<script type="module" src="./node_modules/microlighter/microlighter.min.js"></script>

<body data-syntax-theme="github">
```

After adding or changing code, dispatch this event to highlight again:

```js
document.dispatchEvent(new Event("syntax-highlight"));
```

The event can also bubble from a code block or one of its parents.

### CDN

Use the auto runner directly from a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/microlighter@2/themes/github.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/microlighter@2/microlighter.min.js"></script>

<body data-syntax-theme="github">
  <pre><code class="language-javascript">const answer = 42;</code></pre>
</body>
```

### Web component

Import the optional `<micro-lighter>` custom element:

```html
<link rel="stylesheet" href="./node_modules/microlighter/themes/github.css">
<script type="module" src="./node_modules/microlighter/micro-lighter-element.min.js"></script>

<body data-syntax-theme="github">
  <micro-lighter language="javascript" controls="copy" line-numbers>
    <pre><code>const answer = 42;</code></pre>
  </micro-lighter>
</body>
```

| Attribute | Description |
| --- | --- |
| `language` | Language to use. Overrides language metadata on `<pre>` or `<code>` |
| `controls="copy"` | Adds a copy button |
| `line-numbers` | Adds a line number gutter without changing copied code |

Style the controls with `::part(copy-button)` and `::part(line-numbers)`.

### TypeScript

Declarations ship with the package, including for the grammar and auto-run
entry points. They are generated from the JSDoc types in `src/`, so the source
and the published types cannot drift.

```ts
import { highlightAll, type HighlightAllOptions } from "microlighter";
import javascript from "microlighter/grammars/javascript.js";
```

Importing `microlighter/micro-lighter-element.js` also registers
`<micro-lighter>` in `HTMLElementTagNameMap`, so `querySelector`
returns a typed element.

## Language detection

The recommended format is a `language-*` class:

```html
<pre><code class="language-typescript">const answer: number = 42;</code></pre>
```

You can also use `data-language` on `<code>` or `<pre>`:

```html
<pre data-language="typescript"><code>const answer: number = 42;</code></pre>
```

Avoid `<pre lang="typescript">` in new code. MicroLighter supports it for
compatibility, but the HTML `lang` attribute should describe human language.

Common aliases work automatically:

| Aliases | Language |
| --- | --- |
| `js`, `jsx` | `javascript` |
| `ts` | `typescript` |
| `sh`, `shell`, `zsh` | `bash` |
| `yml` | `yaml` |
| `md` | `markdown` |
| `sass` | `scss` |
| `docker` | `dockerfile` |
| `py` | `python` |
| `rb` | `ruby` |
| `gql` | `graphql` |

Custom aliases passed to `highlightAll()` must point to a bundled language.

## Languages

MicroLighter includes these grammars:

`assembly`, `bash`, `c`, `cpp`, `csharp`, `css`, `dart`, `dockerfile`, `elixir`,
`git-diff`, `go`, `graphql`, `heex`, `html`, `java`, `javascript`, `json`,
`kotlin`, `lua`, `markdown`, `objective-c`, `perl`, `php`, `powershell`,
`python`, `r`, `ruby`, `rust`, `scss`, `sql`, `svelte`, `swift`, `toml`, `tsx`,
`typescript`, `vue`, and `yaml`.

Grammars are ES modules and load on demand.

## Themes

Load one theme and set the matching `data-syntax-theme` value on `<body>` or
any container:

```html
<link rel="stylesheet" href="./node_modules/microlighter/themes/night-owl.css">

<section data-syntax-theme="night-owl">
  <!-- code blocks -->
</section>
```

Bundled themes:

- `cobalt2`
- `dracula`
- `github`
- `gruvbox`
- `min`
- `monokai`
- `night-owl`
- `solarized-light`
- `tokyo-night`
- `vesper`
- `vscode-plus`

Themes use CSS custom properties for a small color palette:

| Property | Token categories |
| --- | --- |
| `--syntax-comment` | Comments and quotes |
| `--syntax-keyword` | Keywords, storage, at-rules, and sections |
| `--syntax-operator` | Operators and punctuation |
| `--syntax-string` | Strings, regular expressions, links, and attribute values |
| `--syntax-constant` | Numbers, booleans, constants, symbols, and entities |
| `--syntax-function` | Functions, decorators, and animations |
| `--syntax-type` | Types and support tokens |
| `--syntax-variable` | Variables and interpolation |
| `--syntax-property` | Properties, keys, and attribute names |
| `--syntax-tag` | Tags |
| `--syntax-selector` | Selectors |
| `--syntax-inserted` | Inserted text |
| `--syntax-deleted` | Deleted text |

## Editable code

MicroLighter keeps code as plain text, so code blocks can remain editable. Call
the highlighter after each change:

```html
<editable-code>
  <pre><code class="language-javascript">const answer = 42;</code></pre>
</editable-code>

<script type="module">
  import "microlighter/microlighter.min.js";

  class EditableCode extends HTMLElement {
    connectedCallback() {
      const code = this.querySelector("pre > code");
      if (!code) return;

      code.contentEditable = "plaintext-only";
      code.spellcheck = false;
      code.setAttribute("aria-label", "Editable code");
      this.addEventListener("input", () => {
        this.dispatchEvent(new Event("syntax-highlight", { bubbles: true }));
      });
    }
  }

  customElements.define("editable-code", EditableCode);
</script>
```

Keep `<pre><code>` in the light DOM so MicroLighter can find it.

## How it works

MicroLighter reads TextMate grammars with the browser's native `RegExp`. It
turns matching token ranges into `Highlight` objects and styles them with
`::highlight()`. It does not use Oniguruma, WebAssembly, or generated token
markup.

This keeps the library small. The trade-off is less language coverage and
grammar accuracy than larger tools such as [Shiki][shiki].

The low-level tokenizer is available from `microlighter/highlight.js` for
advanced integrations.

## Development

Requires Node.js 18 or newer.

```sh
npm install
npm run build
npm test
```

Useful commands:

| Command | Description |
| --- | --- |
| `npm run build` | Build `dist/`, update the local demo package, and report sizes |
| `npm test` | Build and run Node.js and Playwright tests |
| `npm run size` | Print the size report without changing files |
| `npm run docs:update-homepage-stats` | Update the homepage bundle size |
| `npx serve docs` | Serve the demo at `http://localhost:3000` |

The build fails when the minified bundle exceeds the gzip size limit in
`package.json`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the project structure and guides
for adding grammars and themes.

## Prior art

MicroLighter builds on [TextMate grammars][tm] and work across the syntax
highlighting community:

- [Prism.js][prism] inspired the semantic CSS categories.
- [Shiki][shiki] is the full-featured TextMate highlighter for the web.
- [Bramus Van Damme's Custom Highlight API article][bramus] popularized this
  rendering technique.
- Related projects include [textmate-highlighter][tmh],
  [syntax-highlight-element][she], [shiki-highlight-api][sha], and
  [syntaxp][syntaxp].

## License

[MIT](./LICENSE) © Dave Rupert

[highlight-api]: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API
[tm]: https://macromates.com/manual/en/language_grammars
[prism]: https://prismjs.com/
[shiki]: https://shiki.style/
[bramus]: https://www.bram.us/2024/02/18/custom-highlight-api-for-syntax-highlighting/
[tmh]: https://github.com/fabiospampinato/textmate-highlighter
[she]: https://github.com/andreruffert/syntax-highlight-element
[sha]: https://github.com/shiki-highlights/shiki-highlight-api
[syntaxp]: https://github.com/j9t/syntaxp
