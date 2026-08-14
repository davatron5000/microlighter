/**
 * Convert TextMate grammar matches into CSS Custom Highlight ranges.
 * @param {HTMLElement[]} blocks
 * @param {(code: HTMLElement) => Object | undefined} grammarFor
 * @param {Map<string, Object>} grammarsByScope
 */
export const highlight = (blocks, grammarFor, grammarsByScope) => {
  const highlights = new Map();
  const regexes = new Map();

  const categoryFor = scope => {
    if (/comment|markup\.quote/.test(scope)) return "comment";
    if (/markup\.inserted/.test(scope)) return "inserted";
    if (/markup\.deleted/.test(scope)) return "deleted";
    if (/constant\.character\.entity/.test(scope)) return "entity";
    if (/keyword\.control\.doctype/.test(scope)) return "doctype";
    if (/keyword\.control\.at-rule/.test(scope)) return "atrule";
    if (/keyword\.other\.important|entity\.name\.section/.test(scope)) return "important";
    if (/string\.regexp/.test(scope)) return "regex";
    if (/string\..*attribute-value/.test(scope)) return "attr-value";
    if (/string\.other\.link|entity\.name\.link/.test(scope)) return "url";
    if (/string|markup\.raw/.test(scope)) return "string";
    if (/constant\.numeric|\bnumeric\b/.test(scope)) return "number";
    if (/constant\.language\.boolean/.test(scope)) return "boolean";
    if (/constant\.other\.symbol/.test(scope)) return "symbol";
    if (/constant/.test(scope)) return "constant";
    if (/keyword\.operator/.test(scope)) return "operator";
    if (/storage|keyword/.test(scope)) return "keyword";
    if (/support\.class/.test(scope)) return "builtin";
    if (/entity\.name\.type\.(?:class|constant)/.test(scope)) return "class-name";
    if (/entity\.name\.(?:function|decorator|animation)/.test(scope)) return "function";
    if (/variable|entity\.name\.(?:variable|interpolation)/.test(scope)) return "variable";
    if (/support\.type\.property-name|entity\.name\.(?:property|key)/.test(scope)) return "property";
    if (/entity\.name\.tag/.test(scope)) return "tag";
    if (/entity\.other\.attribute-name/.test(scope)) return "attr-name";
    if (/entity\.name\.selector/.test(scope)) return "selector";
    if (/punctuation/.test(scope)) return "punctuation";
    if (/entity|support/.test(scope)) return "symbol";
  };

  const addRange = (node, start, end, scope) => {
    const category = categoryFor(scope);
    if (!category || start === end) return;

    const range = new Range();
    range.setStart(node, start);
    range.setEnd(node, end);

    if (!highlights.has(category)) highlights.set(category, new Highlight());
    highlights.get(category).add(range);
  };

  const addCaptures = (node, match, captures = {}) => {
    Object.entries(captures).forEach(([index, capture]) => {
      const offsets = match.indices[index];
      if (offsets) addRange(node, ...offsets, capture.name);
    });
  };

  const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expandEnd = (pattern, beginMatch) => pattern.replace(/\\(\d+)/g, (reference, index) => {
    return beginMatch[index] === undefined ? reference : escapeRegex(beginMatch[index]);
  });

  const exec = (pattern, node, start, end) => {
    if (!regexes.has(pattern)) regexes.set(pattern, new RegExp(pattern, "dgm"));
    const regex = regexes.get(pattern);
    regex.lastIndex = start;
    const match = regex.exec(node.data);
    return match && match.indices[0][0] < end && match.indices[0][1] <= end ? match : null;
  };

  const rulesFor = rule => {
    if (!rule) return [];
    if (Array.isArray(rule)) return rule;
    if (rule.match || rule.begin || rule.include) return [rule];
    return rule.patterns || [];
  };

  const resolveInclude = (include, grammar, baseGrammar) => {
    if (include === "$self") return { grammar, rules: grammar.patterns };
    if (include === "$base") return { grammar: baseGrammar, rules: baseGrammar.patterns };

    if (include.startsWith("#")) {
      return { grammar, rules: rulesFor(grammar.repository?.[include.slice(1)]) };
    }

    const [scopeName, repositoryName] = include.split("#");
    const includedGrammar = grammarsByScope.get(scopeName);
    if (!includedGrammar) return null;

    return {
      grammar: includedGrammar,
      rules: repositoryName
        ? rulesFor(includedGrammar.repository?.[repositoryName])
        : includedGrammar.patterns
    };
  };

  const expandRules = (rules, grammar, baseGrammar, activeIncludes = new Set()) => {
    const expanded = [];

    rules.forEach(rule => {
      if (rule.include) {
        const includeKey = `${grammar.scopeName}:${rule.include}`;
        if (activeIncludes.has(includeKey)) return;

        const included = resolveInclude(rule.include, grammar, baseGrammar);
        if (!included) return;

        const nestedIncludes = new Set(activeIncludes);
        nestedIncludes.add(includeKey);
        expanded.push(...expandRules(included.rules, included.grammar, baseGrammar, nestedIncludes));
        return;
      }

      if (rule.match || (rule.begin && rule.end)) expanded.push({ grammar, rule });
    });

    return expanded;
  };

  const nextRule = (node, contexts, start, end) => {
    let winner = null;

    contexts.forEach(context => {
      const pattern = context.rule.match || context.rule.begin;
      const match = exec(pattern, node, start, end);
      if (!match) return;

      if (!winner || match.indices[0][0] < winner.match.indices[0][0]) {
        winner = { ...context, match };
      }
    });

    return winner;
  };

  const scanRegion = (node, rules, start, end, grammar, baseGrammar = grammar, closing = null) => {
    const contexts = expandRules(rules, grammar, baseGrammar);
    let cursor = start;

    while (cursor < end) {
      const candidate = nextRule(node, contexts, cursor, end);
      const endMatch = closing ? exec(closing.pattern, node, cursor, end) : null;
      const candidateStart = candidate?.match.indices[0][0] ?? Infinity;
      const endStart = endMatch?.indices[0][0] ?? Infinity;

      if (endMatch && (endStart < candidateStart || (endStart === candidateStart && !closing.applyEndPatternLast))) {
        return { contentEnd: endStart, end: endMatch.indices[0][1], match: endMatch };
      }

      if (!candidate) return { contentEnd: end, end, match: null };

      const { rule, match, grammar: ruleGrammar } = candidate;
      if (rule.match) {
        if (rule.name) addRange(node, ...match.indices[0], rule.name);
        addCaptures(node, match, rule.captures);
        cursor = match.indices[0][1] > cursor ? match.indices[0][1] : cursor + 1;
        continue;
      }

      const nested = scanRegion(
        node,
        rule.patterns || [],
        match.indices[0][1],
        end,
        ruleGrammar,
        baseGrammar,
        { pattern: expandEnd(rule.end, match), applyEndPatternLast: rule.applyEndPatternLast }
      );

      if (rule.name) addRange(node, match.indices[0][0], nested.end, rule.name);
      if (rule.contentName) addRange(node, match.indices[0][1], nested.contentEnd, rule.contentName);
      addCaptures(node, match, rule.beginCaptures || rule.captures);
      if (nested.match) addCaptures(node, nested.match, rule.endCaptures || rule.captures);

      cursor = nested.end > cursor ? nested.end : cursor + 1;
    }

    return { contentEnd: end, end, match: null };
  };

  blocks.forEach(code => {
    const grammar = grammarFor(code);
    const node = code.firstChild;
    if (!grammar || code.childNodes.length !== 1 || node.nodeType !== Node.TEXT_NODE) return;

    scanRegion(node, grammar.patterns, 0, node.data.length, grammar);
  });

  highlights.forEach((ranges, category) => {
    CSS.highlights.set(category, ranges);
  });
};
