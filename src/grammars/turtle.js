export default {
  name: "turtle",
  displayName: "Turtle",
  scopeName: "source.turtle",
  patterns: [
    { include: "#rule-constraint" },
    { include: "#iriref" },
    { include: "#prefix" },
    { include: "#prefixed-name" },
    { include: "#comment" },
    { include: "#special-predicate" },
    { include: "#literals" },
    { include: "#language-tag" }
  ],
  repository: {
    boolean: {
      match: /\b(?:true|false)\b/dgiv,
      name: "constant.language.sparql"
    },
    comment: {
      match: /#[^\n]*(?=\n?$)/dgv,
      name: "comment.line.number-sign.turtle"
    },
    integer: {
      match: /[\-\+]?(?:\p{Nd}+|[0-9]+\.[0-9]*|\.[0-9]+(?:[Ee][\-\+]?\p{Nd}+)?)/dgv,
      name: "constant.numeric.turtle"
    },
    iriref: {
      match: /<[^ "\<\>\\\^\`\{\|\}]*>/dgv,
      name: "entity.name.type.iriref.turtle"
    },
    "language-tag": {
      captures: {
        "1": { name: "entity.name.class.turtle" }
      },
      match: /@([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      name: "meta.string-literal-language-tag.turtle"
    },
    literals: {
      patterns: [
        { include: "#string" },
        { include: "#numeric" },
        { include: "#boolean" }
      ]
    },
    numeric: {
      patterns: [
        { include: "#integer" }
      ]
    },
    prefix: {
      match: /(?:@?base|@?prefix)\p{space}/dgiv,
      name: "keyword.operator.turtle"
    },
    "prefixed-name": {
      captures: {
        "1": { name: "storage.type.PNAME_NS.turtle" },
        "2": { name: "support.variable.PN_LOCAL.turtle" }
      },
      match: /([\p{L}\p{M}\p{N}\p{Pc}]*:)([\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      name: "constant.complex.turtle"
    },
    "rule-constraint": {
      begin: /(rule:content) (""")/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#prefixed-name" }
          ]
        },
        "2": { name: "string.quoted.triple.turtle" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "string.quoted.triple.turtle" }
      },
      name: "meta.rule-constraint.turtle",
      patterns: [
        { include: "source.srs" }
      ]
    },
    "single-dquote-string-literal": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.turtle" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.turtle" }
      },
      name: "string.quoted.double.turtle",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    "single-squote-string-literal": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.turtle" }
      },
      end: /'/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.turtle" },
        "2": { name: "invalid.illegal.newline.turtle" }
      },
      name: "string.quoted.single.turtle",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    "special-predicate": {
      captures: {
        "1": { name: "keyword.control.turtle" }
      },
      match: /\p{space}(a)\p{space}/dgv,
      name: "meta.specialPredicate.turtle"
    },
    string: {
      patterns: [
        { include: "#triple-squote-string-literal" },
        { include: "#triple-dquote-string-literal" },
        { include: "#single-squote-string-literal" },
        { include: "#single-dquote-string-literal" },
        { include: "#triple-tick-string-literal" }
      ]
    },
    "string-character-escape": {
      match: /\\(x\p{AHex}{2}|[012][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|[^\n]|(?=\n?$))/dgv,
      name: "constant.character.escape.turtle"
    },
    "triple-dquote-string-literal": {
      begin: /"""/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.turtle" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.turtle" }
      },
      name: "string.quoted.triple.turtle",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    "triple-squote-string-literal": {
      begin: /'''/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.turtle" }
      },
      end: /'''/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.turtle" }
      },
      name: "string.quoted.triple.turtle",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    "triple-tick-string-literal": {
      begin: /```/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.turtle" }
      },
      end: /```/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.turtle" }
      },
      name: "string.quoted.triple.turtle",
      patterns: [
        { include: "#string-character-escape" }
      ]
    }
  },
  dependencies: []
};
