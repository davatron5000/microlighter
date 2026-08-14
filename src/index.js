import { highlight } from "./highlight.js";

export { highlight };

const aliases = {
  diff: "git-diff",
  golang: "go",
  htm: "html",
  js: "javascript",
  jsx: "javascript",
  md: "markdown",
  patch: "git-diff",
  py: "python",
  rb: "ruby",
  rs: "rust",
  sass: "scss",
  sh: "bash",
  shell: "bash",
  ts: "typescript",
  tsx: "typescript",
  yml: "yaml",
  zsh: "bash"
};

const grammarModules = new Map();
const grammarsByScope = new Map();

const languageFor = code => {
  const language = code.parentElement.lang.toLowerCase();
  return aliases[language] || language;
};

/**
 * Convert a TextMate scope name to its grammar module filename.
 * @param {string} scope
 * @returns {string | null}
 */
const languageForScope = scope => {
  const match = scope.match(/^(?:source|text)\.([a-z0-9_-]+)/);
  return match ? aliases[match[1]] || match[1] : null;
};

/**
 * Import and register a grammar once per page.
 * @param {string} language
 * @returns {Promise<Object | null>}
 */
const loadGrammar = language => {
  if (!grammarModules.has(language)) {
    const grammarModule = import(`./grammars/${language}.js`)
      .then(module => {
        grammarsByScope.set(module.default.scopeName, module.default);
        return module.default;
      })
      .catch(() => null);
    grammarModules.set(language, grammarModule);
  }

  return grammarModules.get(language);
};

/**
 * Collect external scope includes from a grammar or repository rule.
 * @param {*} value
 * @param {Set<string>} includes
 * @returns {Set<string>}
 */
const externalIncludesFor = (value, includes = new Set()) => {
  if (Array.isArray(value)) {
    value.forEach(item => externalIncludesFor(item, includes));
  } else if (value && typeof value === "object") {
    if (typeof value.include === "string" && !/^[#$]/.test(value.include)) {
      includes.add(value.include.split("#")[0]);
    }
    Object.values(value).forEach(item => externalIncludesFor(item, includes));
  }

  return includes;
};

/**
 * Scan the DOM for code blocks, lazily load the grammars they need, and
 * register CSS Custom Highlight ranges. Side effects happen only when called.
 *
 * @param {Object} [options]
 * @param {ParentNode} [options.root=document] Root to query within.
 * @param {string} [options.selector="pre[lang] > code"] Code block selector.
 * @returns {Promise<HTMLElement[]>} The highlighted code elements.
 */
export const highlightAll = async ({ root = document, selector = "pre[lang] > code" } = {}) => {
  const blocks = () => [...root.querySelectorAll(selector)];
  const languages = [...new Set(blocks().map(languageFor))]
    .filter(language => /^[a-z0-9_-]+$/.test(language));

  let pendingLanguages = languages;
  while (pendingLanguages.length) {
    const loadedGrammars = (await Promise.all(pendingLanguages.map(loadGrammar))).filter(Boolean);
    pendingLanguages = [...new Set(loadedGrammars
      .flatMap(grammar => [...externalIncludesFor(grammar)])
      .map(languageForScope)
      .filter(Boolean))]
      .filter(language => !grammarModules.has(language));
  }

  const grammarEntries = await Promise.all([...grammarModules].map(async ([language, grammarModule]) => {
    return [language, await grammarModule];
  }));
  const grammars = Object.fromEntries(grammarEntries.filter(([, grammar]) => grammar));

  const codeBlocks = blocks();
  highlight(codeBlocks, code => grammars[languageFor(code)], grammarsByScope);
  return codeBlocks;
};
