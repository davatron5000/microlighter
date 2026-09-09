/**
 * @import { Grammar, GrammarValue } from "./grammar.js"
 */

/**
 * @typedef {object} LoadedGrammars
 * @property {Record<string, Grammar>} languages Grammars keyed by module name.
 * @property {Map<string, Grammar>} scopes Grammars keyed by TextMate scope name.
 */

/** @type {Record<string, string>} */
const languageAliases = {
  docker: "dockerfile",
  gql: "graphql",
  js: "javascript",
  jsx: "javascript",
  md: "markdown",
  py: "python",
  rb: "ruby",
  sass: "scss",
  sh: "bash",
  shell: "bash",
  ts: "typescript",
  yml: "yaml",
  zsh: "bash"
};

/**
 * Convert a supported language alias to its grammar module name.
 * @param {string} language
 * @param {Record<string, string>} [aliases]
 * @returns {string}
 */
export const normalizeLanguage = (language, aliases = {}) =>
  aliases[language] || languageAliases[language] || language;

/**
 * Find grammar modules referenced by external TextMate scope includes.
 * Local repository references (`#...`, `$self`, and `$base`) are ignored.
 * @param {GrammarValue} value Grammar or nested grammar rule to inspect.
 * @returns {Set<string>} Normalized grammar module names.
 */
export const getExternalLanguages = value => {
  /** @type {Set<string>} */
  const languages = new Set();

  /** @param {GrammarValue} item */
  const visit = item => {
    if (Array.isArray(item)) {
      item.forEach(visit);
    } else if (item && typeof item === "object") {
      if (typeof item.include === "string" && !/^[#$]/.test(item.include)) {
        const scope = item.include.split("#")[0];
        const match = scope.match(/^(?:source|text)\.([a-z0-9_-]+)/);
        if (match) languages.add(match[1]);
      }
      Object.values(item).forEach(visit);
    }
  };

  visit(value);
  return languages;
};

/**
 * Dynamically import a shipped grammar.
 * @param {string} language
 * @returns {Promise<Grammar | null>}
 */
const getGrammar = language => import(`./grammars/${language}.js`)
  .then(module => module.default)
  .catch(() => null);

/**
 * Create a cached loader that also resolves external grammar dependencies.
 * @param {(language: string) => Promise<Grammar | null>} [importLanguage]
 * @returns {(languages: string[]) => Promise<LoadedGrammars>}
 */
export const createGrammarLoader = (importLanguage = getGrammar) => {
  /** @type {Map<string, Promise<Grammar | null>>} */
  const loadingLanguages = new Map();
  /** @type {LoadedGrammars} */
  const grammars = {
    languages: {},
    scopes: new Map()
  };

  /**
   * Import and index a grammar once for the lifetime of this loader.
   * @param {string} language
   * @returns {Promise<Grammar | null>}
   */
  const loadGrammar = language => {
    if (!loadingLanguages.has(language)) {
      const grammarModule = importLanguage(language).then(grammar => {
        if (grammar) {
          grammars.languages[language] = grammar;
          grammars.scopes.set(grammar.scopeName, grammar);
        }
        return grammar;
      });
      loadingLanguages.set(language, grammarModule);
    }

    return /** @type {Promise<Grammar | null>} */ (loadingLanguages.get(language));
  };

  return async languages => {
    const visited = new Set();
    let pending = [...new Set(languages)]
      .filter(language => /^[a-z0-9_-]+$/.test(language));

    while (pending.length) {
      pending.forEach(language => visited.add(language));
      const loaded = /** @type {Grammar[]} */ (
        (await Promise.all(pending.map(loadGrammar))).filter(Boolean)
      );
      pending = [...new Set(loaded.flatMap(grammar =>
        grammar.dependencies || [...getExternalLanguages(grammar)]
      ))].map(language => normalizeLanguage(language)).filter(language => !visited.has(language));
    }

    return grammars;
  };
};
