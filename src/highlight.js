import { createGrammarLoader, normalizeLanguage } from "./grammar-dependencies.js";

/**
 * @import { AnchoredPattern, Grammar, GrammarCaptures, GrammarPattern, GrammarRepositoryEntry, GrammarRule } from "./grammar.js"
 */

/**
 * @typedef {object} HighlightAllOptions
 * @property {ParentNode} [root=document] Element or document to search.
 * @property {string} [selector="pre > code"] Selector used to find code blocks.
 * @property {Record<string, string>} [languageAliases] Extra aliases mapped to bundled grammar names.
 */

/**
 * Start and end offsets per capture group. Group 0 spans the whole match; a
 * group that did not participate in the match is `undefined`.
 * @typedef {RegExpIndicesArray & {0: [number, number]}} MatchIndices
 */

/**
 * A match from a `d`-flagged expression, with offsets relative to the whole
 * text node rather than the scanned line.
 * @typedef {RegExpExecArray & {indices: MatchIndices}} Match
 */

/**
 * A single line of the text node being scanned.
 * @typedef {{start: number, text: string}} Line
 */

/** @typedef {Record<string, GrammarRepositoryEntry>} Repository */

/** @typedef {{grammar: Grammar, rules: GrammarRule[], repository: Repository}} Included */

/**
 * @typedef {object} RuleContext
 * @property {Grammar} grammar Grammar the rule was resolved from.
 * @property {GrammarRule} rule Directly matchable rule.
 * @property {Repository} repository Repository in effect for the rule's includes.
 * @property {number} [priority] Injection priority: -1 for `L:`, 1 for `R:`.
 */

/**
 * An open begin/end rule on the scan stack.
 * @typedef {object} StackEntry
 * @property {GrammarRule[]} rules Patterns active inside the rule.
 * @property {Grammar} grammar Grammar the rule was resolved from.
 * @property {Repository} repository Repository in effect inside the rule.
 * @property {string[]} scopes Scope names in effect inside the rule.
 * @property {RuleContext[]} [contexts] Expanded `rules`, cached on first use.
 * @property {RuleContext[]} [injected] Injection rules whose selector matches `scopes`.
 * @property {GrammarRule | null} rule The open rule; `null` for the root.
 * @property {Match | null} begin The rule's begin match.
 * @property {number} enter Offset the rule was pushed at.
 * @property {number} anchor `\G` anchor to restore when the rule closes.
 * @property {GrammarPattern | null} end Resolved end pattern.
 */

/** @param {Element} element */
const getLanguageClass = element => [...element.classList]
  .find(className => className.startsWith("language-"))
  ?.slice("language-".length);

/** @param {HTMLElement} codeBlock */
const getLanguage = codeBlock => {
  const pre = /** @type {HTMLElement} */ (codeBlock.parentElement);
  const language = getLanguageClass(codeBlock)
    || codeBlock.dataset.language
    || getLanguageClass(pre)
    || pre.dataset.language
    // Deprecated: `lang` describes human language, not programming language.
    || pre.getAttribute("lang")
    || "";

  return language.toLowerCase();
};
const loadGrammars = createGrammarLoader();

/**
 * Highlight sets retained between scans so stale registered ranges can be
 * removed before replacements are created.
 * @type {Map<string, Highlight>}
 */
const highlights = new Map();

/**
 * Flatten a TextMate scope to a stable semantic CSS highlight category.
 * @param {string} scope
 * @returns {string | undefined}
 */
const getCategory = scope => {
  const parts = scope.split(".");
  const [first, second, third] = parts;

  if (first === "markup" && ["quote", "inserted", "deleted", "raw"].includes(second)) return second;
  if (first === "meta") return second === "selector" ? "selector" : undefined;
  if (first === "entity" && second === "name") return third;
  if (scope.startsWith("constant.character.entity")) return "character-entity";
  if (parts.includes("numeric")) return "numeric";
  if (scope.startsWith("support.type.property-name")) return "property";
  if (parts.includes("attribute-value")) return "attribute-value";
  if (scope.startsWith("string.other.link")) return "link";

  // Real grammars suffix scopes with the language (`keyword.control.at-rule.css`),
  // so look for these tokens anywhere rather than only at the end.
  const token = [
    "doctype", "at-rule", "important", "regexp", "boolean",
    "symbol", "operator", "attribute-name"
  ].find(candidate => parts.includes(candidate));
  if (token) return token;

  if ([
    "comment", "string", "constant", "storage", "keyword",
    "variable", "punctuation", "entity", "support"
  ].includes(first)) return first;
};

/**
 * Register a matched text span under its CSS highlight categories. A scope
 * name may be a space-separated list, as in
 * `meta.property-name.css support.type.property-name.css`.
 * @param {Text} node
 * @param {number} start
 * @param {number} end
 * @param {string} scopes
 * @returns {void}
 */
const addRange = (node, start, end, scopes) => {
  if (start === end) return;

  for (const scope of scopes.split(" ")) {
    const category = getCategory(scope);
    if (!category) continue;

    const range = new Range();
    range.setStart(node, start);
    range.setEnd(node, end);

    if (!highlights.has(category)) highlights.set(category, new Highlight());
    /** @type {Highlight} */ (highlights.get(category)).add(range);
  }
};

/**
 * Escape text before inserting it into a regular expression. Only syntax
 * characters are escaped: identity escapes of anything else are errors under
 * the `v` flag the precompiled grammars use.
 * @param {string} value
 * @returns {string}
 */
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Rebuild a precompiled regex with a new source. This goes through the
 * constructor rather than copying because lazily compiled EmulatedRegExps have
 * an empty underlying pattern until first use; `rawOptions` is ignored by
 * plain RegExp.
 * @param {RegExp} regex
 * @param {string} source
 * @returns {RegExp}
 */
const rebuild = (regex, source) =>
  new (/** @type {new (s: string, f: string, o?: unknown) => RegExp} */ (regex.constructor))(
    source,
    regex.flags,
    /** @type {any} */ (regex).rawOptions
  );

/**
 * Pick the compiled variant of a pattern for the current position: `\A` may
 * only match on the first line, `\G` only where the enclosing rule began.
 * @param {Exclude<GrammarPattern, null>} pattern
 * @param {boolean} firstLine
 * @param {boolean} atAnchor
 * @returns {RegExp}
 */
const select = (pattern, firstLine, atAnchor) => {
  if (pattern instanceof RegExp) return pattern;
  if ("A" in pattern) return pattern.A[+firstLine];
  if ("G" in pattern) return pattern.G[+atAnchor];
  return pattern.AG[(firstLine ? 2 : 0) + (atAnchor ? 1 : 0)];
};

/**
 * Replace TextMate end-pattern backreferences, carried as `\uE000N\uE001`
 * markers (see scripts/sync-grammars.mjs), with escaped begin captures.
 * @param {Exclude<GrammarPattern, null>} pattern
 * @param {Match} beginMatch
 * @returns {Exclude<GrammarPattern, null>}
 */
const expandEnd = (pattern, beginMatch) => {
  /** @param {RegExp} variant */
  const expand = variant => variant.source.includes("\uE000")
    ? rebuild(variant, variant.source.replace(/\uE000(\d+)\uE001/g, (_reference, index) =>
      beginMatch[index] === undefined ? "" : escapeRegex(beginMatch[index])
    ))
    : variant;

  if (pattern instanceof RegExp) return expand(pattern);
  const [kind, variants] = /** @type {[string, RegExp[]]} */ (Object.entries(pattern)[0]);
  return /** @type {AnchoredPattern} */ ({ [kind]: variants.map(expand) });
};

/** @typedef {(scopes: string[]) => boolean} ScopeMatcher */

/**
 * Parse a TextMate injection selector into one matcher per comma-separated
 * alternative, following vscode-textmate: `L:`/`R:` set priority, a space-
 * separated path matches scopes in order by dotted prefix, `-` negates, `|`
 * (or `,` inside parentheses) alternates.
 * @param {string} selector
 * @returns {{priority: number, test: ScopeMatcher}[]}
 */
const parseSelector = selector => {
  const tokens = selector.match(/[LR]:|[\w.:][\w.:-]*|[,|()-]/g) || [];
  let index = 0;
  /** @param {string | undefined} token */
  const isName = token => token !== undefined && /^[\w.:]/.test(token) && !/^[LR]:$/.test(token);

  /** @param {string[]} names @returns {ScopeMatcher} */
  const nameMatcher = names => scopes => {
    let position = 0;
    return names.every(name => {
      while (position < scopes.length) {
        const scope = scopes[position++];
        if (scope === name || scope.startsWith(`${name}.`)) return true;
      }
      return false;
    });
  };

  /** @returns {ScopeMatcher | null} */
  const parseOperand = () => {
    const token = tokens[index];
    if (token === "-") {
      index++;
      const operand = parseOperand();
      return operand && (scopes => !operand(scopes));
    }
    if (token === "(") {
      index++;
      const inner = parseExpression();
      if (tokens[index] === ")") index++;
      return inner;
    }
    if (!isName(token)) return null;
    const names = [];
    while (isName(tokens[index])) names.push(/** @type {string} */ (tokens[index++]));
    return nameMatcher(names);
  };

  /** @returns {ScopeMatcher} */
  const parseConjunction = () => {
    /** @type {ScopeMatcher[]} */
    const operands = [];
    for (let operand = parseOperand(); operand; operand = parseOperand()) operands.push(operand);
    return scopes => operands.length > 0 && operands.every(operand => operand(scopes));
  };

  /** @returns {ScopeMatcher} */
  const parseExpression = () => {
    const alternatives = [parseConjunction()];
    while (tokens[index] === "|" || tokens[index] === ",") {
      index++;
      alternatives.push(parseConjunction());
    }
    return scopes => alternatives.some(alternative => alternative(scopes));
  };

  const matchers = [];
  while (index < tokens.length) {
    const priority = tokens[index] === "L:" ? -1 : tokens[index] === "R:" ? 1 : 0;
    if (priority) index++;
    matchers.push({ priority, test: parseConjunction() });
    if (tokens[index] !== ",") break;
    index++;
  }
  return matchers;
};

/**
 * Normalize a grammar rule or repository entry to a rule array.
 * @param {GrammarRule | GrammarRule[] | undefined} rule
 * @returns {GrammarRule[]}
 */
const getRules = rule => {
  if (!rule) return [];
  if (Array.isArray(rule)) return rule;

  if (rule.match || rule.begin || rule.include) return [rule];
  return rule.patterns || [];
};

/**
 * Find code blocks, load their TextMate grammars, and register CSS highlights.
 * @param {HighlightAllOptions} [options]
 * @returns {Promise<HTMLElement[]>}
 */
export const highlightAll = async ({
  root = document,
  selector = "pre > code",
  languageAliases
} = {}) => {
  const codeBlocks = /** @type {HTMLElement[]} */ ([...root.querySelectorAll(selector)])
    .filter(getLanguage);
  const languages = codeBlocks.map(codeBlock =>
    normalizeLanguage(getLanguage(codeBlock), languageAliases)
  );
  const grammars = await loadGrammars(languages);
  /**
   * Last search per regex on the current line, reused when it started at or
   * before the new position and found nothing or a match at or after it.
   * @type {Map<RegExp, {from: number, match: Match | null}>}
   */
  let searches = new Map();

  // Drop only ranges this scan replaces: its own blocks, blocks that have since
  // lost their language, and ranges collapsed by DOM removal. Overlapping calls
  // (e.g. several <micro-lighter> elements upgrading at once) would otherwise
  // clobber blocks that gained a language after an earlier call started.
  /** @type {Set<Element | null>} */
  const rescanned = new Set(codeBlocks);
  root.querySelectorAll(selector).forEach(block => {
    if (!getLanguage(/** @type {HTMLElement} */ (block))) rescanned.add(block);
  });
  highlights.forEach(ranges => {
    ranges.forEach(range => {
      if (range.collapsed || rescanned.has(range.startContainer.parentElement)) ranges.delete(range);
    });
  });

  /**
   * Run a regex against a line, shifting the result to text-node offsets.
   * @param {RegExp} regex
   * @param {Line} line
   * @param {number} position
   * @returns {Match | null}
   */
  const run = (regex, line, position) => {
    regex.lastIndex = position - line.start;
    const match = /** @type {Match | null} */ (regex.exec(line.text));
    if (match && line.start) {
      match.index += line.start;
      match.indices = /** @type {MatchIndices} */ (match.indices.map(offsets =>
        offsets && [offsets[0] + line.start, offsets[1] + line.start]
      ));
    }
    return match;
  };

  /**
   * Find the next match of a pattern on the current line. `anchor` is where
   * the enclosing rule's begin match ended, i.e. TextMate's `\G`.
   * @param {Exclude<GrammarPattern, null>} pattern
   * @param {Line} line
   * @param {number} position
   * @param {number} anchor
   * @returns {Match | null}
   */
  const exec = (pattern, line, position, anchor) => {
    const regex = select(pattern, line.start === 0, position === anchor);

    // Sticky and clip-search regexes (oniguruma-to-es's `\G` emulation, only
    // ever selected at the anchor) depend on the exact start position.
    if (regex.sticky || /** @type {any} */ (regex).rawOptions?.strategy) return run(regex, line, position);

    const last = searches.get(regex);
    if (last && last.from <= position && (!last.match || last.match.index >= position)) {
      return last.match;
    }
    const match = run(regex, line, position);
    searches.set(regex, { from: position, match });
    return match;
  };

  /**
   * Rules reachable from a repository entry, with that entry's own repository
   * (if any) layered over the one in effect.
   * @param {Grammar} grammar
   * @param {Repository} repository
   * @param {GrammarRule | undefined} entry
   * @returns {Included}
   */
  const fromEntry = (grammar, repository, entry) => ({
    grammar,
    rules: getRules(entry),
    repository: entry?.repository ? { ...repository, ...entry.repository } : repository
  });

  /**
   * Resolve local, base, and external TextMate include references.
   * @param {string} include
   * @param {Grammar} grammar
   * @param {Repository} repository Repository in effect where the include appears.
   * @param {Grammar} baseGrammar
   * @returns {Included | null}
   */
  const resolveInclude = (include, grammar, repository, baseGrammar) => {
    if (include === "$self") return { grammar, rules: grammar.patterns, repository: grammar.repository || {} };
    if (include === "$base") return { grammar: baseGrammar, rules: baseGrammar.patterns, repository: baseGrammar.repository || {} };
    if (include[0] === "#") return fromEntry(grammar, repository, repository[include.slice(1)]);

    const [scopeName, repositoryName] = include.split("#");
    const includedGrammar = grammars.scopes.get(scopeName);
    if (!includedGrammar) return null;

    const includedRepository = includedGrammar.repository || {};
    return repositoryName
      ? fromEntry(includedGrammar, includedRepository, includedRepository[repositoryName])
      : { grammar: includedGrammar, rules: includedGrammar.patterns, repository: includedRepository };
  };

  /**
   * Expand include rules into directly matchable rule contexts.
   * @param {GrammarRule[]} rules
   * @param {Grammar} grammar
   * @param {Repository} repository
   * @param {Grammar} baseGrammar
   * @param {Set<string>} [activeIncludes]
   * @returns {RuleContext[]}
   */
  const expandRules = (rules, grammar, repository, baseGrammar, activeIncludes = new Set()) => {
    /** @type {RuleContext[]} */
    const expanded = [];

    rules.forEach(rule => {
      const local = rule.repository ? { ...repository, ...rule.repository } : repository;

      if (rule.include) {
        const includeKey = `${grammar.scopeName}:${rule.include}`;
        if (activeIncludes.has(includeKey)) return;

        const included = resolveInclude(rule.include, grammar, local, baseGrammar);
        if (!included) return;

        const nestedIncludes = new Set(activeIncludes);
        nestedIncludes.add(includeKey);
        expanded.push(...expandRules(included.rules, included.grammar, included.repository, baseGrammar, nestedIncludes));
        return;
      }

      if (rule.match || (rule.begin && rule.end)) expanded.push({ grammar, rule, repository: local });
    });

    return expanded;
  };

  /**
   * Select the rule with the earliest match on the line; ties go to the rule
   * listed first.
   * @param {RuleContext[]} contexts
   * @param {Line} line
   * @param {number} position
   * @param {number} anchor
   * @returns {(RuleContext & {match: Match}) | null}
   */
  const nextRule = (contexts, line, position, anchor) => {
    /** @type {(RuleContext & {match: Match}) | null} */
    let winner = null;

    for (const context of contexts) {
      const pattern = /** @type {Exclude<GrammarPattern, null>} */ (context.rule.match || context.rule.begin);
      const match = exec(pattern, line, position, anchor);
      if (!match) continue;
      if (match.index === position) return { ...context, match };
      if (!winner || match.index < winner.match.index) winner = { ...context, match };
    }

    return winner;
  };

  /**
   * Register the scopes of a begin/end rule once its extent is known.
   * @param {Text} node
   * @param {StackEntry} entry
   * @param {number} contentEnd
   * @param {number} end
   */
  const closeRule = (node, entry, contentEnd, end) => {
    const { rule, begin } = /** @type {{rule: GrammarRule, begin: Match}} */ (entry);
    if (rule.name) addRange(node, begin.indices[0][0], end, rule.name);
    if (rule.contentName) addRange(node, begin.indices[0][1], contentEnd, rule.contentName);
  };

  /**
   * Collect injections targeting a grammar: its own `injections`, plus loaded
   * grammars whose `injectionSelector` is declared to inject into its scope.
   * @param {Grammar} grammar
   * @returns {{priority: number, test: ScopeMatcher, rules: GrammarRule[], grammar: Grammar}[]}
   */
  const getInjections = grammar => {
    /** @type {{priority: number, test: ScopeMatcher, rules: GrammarRule[], grammar: Grammar}[]} */
    const injections = [];
    /** @param {string} selector @param {GrammarRule[]} rules @param {Grammar} source */
    const add = (selector, rules, source) => parseSelector(selector)
      .forEach(({ priority, test }) => injections.push({ priority, test, rules, grammar: source }));

    Object.entries(grammar.injections || {}).forEach(([selector, value]) =>
      add(selector, getRules(/** @type {GrammarRule} */ (value)), grammar)
    );
    grammars.scopes.forEach(other => {
      if (typeof other.injectionSelector === "string" && /** @type {string[]} */ (other.injectTo || []).includes(grammar.scopeName)) {
        add(other.injectionSelector, other.patterns, other);
      }
    });
    return injections.sort((a, b) => a.priority - b.priority);
  };

  /**
   * Tokenize a text node line by line with a rule stack, as TextMate does.
   * @param {Text} node
   * @param {Grammar} grammar
   */
  const scan = (node, grammar) => {
    const injections = getInjections(grammar);
    /** @type {StackEntry[]} */
    const stack = [{
      rules: grammar.patterns, grammar, repository: grammar.repository || {}, scopes: [grammar.scopeName], rule: null, begin: null, enter: 0, anchor: -1, end: null
    }];
    const text = node.data;

    /**
     * Add capture-group scopes from a match. A capture may carry `patterns`
     * instead of (or as well as) a name, in which case the captured text is
     * tokenized again with those patterns, seeing nothing past its end.
     * @param {Match} match
     * @param {Line} line
     * @param {StackEntry} top
     * @param {GrammarCaptures} [captures]
     */
    const addCaptures = (match, line, top, captures = {}) => {
      Object.entries(captures).forEach(([index, capture]) => {
        const offsets = match.indices[+index];
        if (!offsets || offsets[0] === offsets[1]) return;
        if (capture.name) addRange(node, ...offsets, capture.name);
        if (!capture.patterns) return;

        const saved = searches;
        searches = new Map();
        tokenize(
          [{ ...top, rules: capture.patterns, contexts: undefined, injected: undefined, rule: null, begin: null, end: null }],
          { start: line.start, text: line.text.slice(0, offsets[1] - line.start) },
          offsets[0],
          -1
        );
        searches = saved;
      });
    };

    /**
     * Tokenize the rest of a line from `position`, pushing and popping rules.
     * @param {StackEntry[]} stack
     * @param {Line} line
     * @param {number} position
     * @param {number} anchor
     */
    const tokenize = (stack, line, position, anchor) => {
      const lineEnd = line.start + line.text.length;

      while (position < lineEnd) {
        const top = /** @type {StackEntry} */ (stack.at(-1));
        top.contexts ??= expandRules(top.rules, top.grammar, top.repository, grammar);
        top.injected ??= injections
          .filter(injection => injection.test(top.scopes))
          .flatMap(injection => expandRules(injection.rules, injection.grammar, injection.grammar.repository || {}, grammar)
            .map(context => ({ ...context, priority: injection.priority })));

        let candidate = nextRule(top.contexts, line, position, anchor);
        const endMatch = top.end ? exec(top.end, line, position, anchor) : null;
        const endStart = endMatch?.index ?? Infinity;
        let useEnd = !!endMatch && (endStart < (candidate?.match.index ?? Infinity)
          || (endStart === candidate?.match.index && !top.rule?.applyEndPatternLast));

        // An injection beats the rule's own patterns (and its end) when it
        // matches earlier, or at the same offset with `L:` priority.
        const injected = nextRule(top.injected, line, position, anchor);
        const bestStart = useEnd ? endStart : (candidate?.match.index ?? Infinity);
        if (injected && (injected.match.index < bestStart || (injected.priority === -1 && injected.match.index === bestStart))) {
          candidate = injected;
          useEnd = false;
        }

        if (useEnd) {
          const rule = /** @type {GrammarRule} */ (top.rule);
          const end = /** @type {Match} */ (endMatch).indices[0][1];
          closeRule(node, top, endStart, end);
          addCaptures(/** @type {Match} */ (endMatch), line, top, rule.endCaptures || rule.captures);
          stack.pop();
          anchor = top.anchor;
          // A rule that was pushed and popped without consuming text would
          // loop forever; give up on this line like vscode-textmate does.
          if (end === position && top.enter === position) return;
          position = end;
          continue;
        }

        if (!candidate) return;

        const { rule, match, grammar: ruleGrammar, repository } = candidate;
        const end = match.indices[0][1];

        if (rule.match) {
          if (rule.name) addRange(node, ...match.indices[0], rule.name);
          addCaptures(match, line, { ...top, grammar: ruleGrammar, repository }, rule.captures);
          if (end === position) return;
          position = end;
          continue;
        }

        /** @type {StackEntry} */
        const entry = {
          rules: rule.patterns || [],
          grammar: ruleGrammar,
          repository,
          scopes: [...top.scopes, rule.name, rule.contentName]
            .flatMap(scope => scope ? scope.split(" ") : []),
          rule,
          begin: match,
          enter: position,
          anchor,
          end: expandEnd(/** @type {Exclude<GrammarPattern, null>} */ (rule.end), match)
        };
        addCaptures(match, line, entry, rule.beginCaptures || rule.captures);
        stack.push(entry);
        anchor = end;
        position = end;
      }
    };

    for (let lineStart = 0; lineStart < text.length;) {
      const newline = text.indexOf("\n", lineStart);
      const lineEnd = newline === -1 ? text.length : newline + 1;
      searches = new Map();
      tokenize(stack, { start: lineStart, text: text.slice(lineStart, lineEnd) }, lineStart, -1);
      lineStart = lineEnd;
    }

    // Rules still open at the end of the text extend to its end.
    while (stack.length > 1) closeRule(node, /** @type {StackEntry} */ (stack.pop()), text.length, text.length);
  };

  codeBlocks.forEach((codeBlock, index) => {
    const grammar = grammars.languages[languages[index]];
    if (!grammar) return;

    codeBlock.normalize();
    const node = /** @type {Text | null} */ (codeBlock.firstChild);
    if (node?.nodeType !== Node.TEXT_NODE || node.nextSibling) return;

    scan(node, grammar);
  });

  highlights.forEach((ranges, category) => {
    if (ranges.size) CSS.highlights.set(category, ranges);
    else if (CSS.highlights.get(category) === ranges) CSS.highlights.delete(category);
  });

  return codeBlocks;
};
