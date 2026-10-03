export default {
  name: "jsonnet",
  displayName: "Jsonnet",
  scopeName: "source.jsonnet",
  patterns: [
    { include: "#expression" },
    { include: "#keywords" }
  ],
  repository: {
    "builtin-functions": {
      patterns: [
        {
          match: /\bstd\.(acos|asin|atan|ceil|char|codepoint|cos|exp|exponent)\b/dgv,
          name: "support.function.jsonnet"
        },
        {
          match: /\bstd\.(filter|floor|force|length|log|makeArray|mantissa)\b/dgv,
          name: "support.function.jsonnet"
        },
        {
          match: /\bstd\.(objectFields|objectHas|pow|sin|sqrt|tan|type|thisFile)\b/dgv,
          name: "support.function.jsonnet"
        },
        {
          match: /\bstd\.(acos|asin|atan|ceil|char|codepoint|cos|exp|exponent)\b/dgv,
          name: "support.function.jsonnet"
        },
        {
          match: /\bstd\.(abs|assertEqual|escapeString(Bash|Dollars|Json|Python))\b/dgv,
          name: "support.function.jsonnet"
        },
        {
          match: /\bstd\.(filterMap|flattenArrays|foldl|foldr|format|join)\b/dgv,
          name: "support.function.jsonnet"
        },
        {
          match: /\bstd\.(lines|manifest(Ini|Python(Vars)?)|map|max|min|mod)\b/dgv,
          name: "support.function.jsonnet"
        },
        {
          match: /\bstd\.(s(?:et(Diff|Inter|Member|Union)??|ort))\b/dgv,
          name: "support.function.jsonnet"
        },
        {
          match: /\bstd\.(range|split|stringChars|substr|toString|uniq)\b/dgv,
          name: "support.function.jsonnet"
        }
      ]
    },
    comment: {
      patterns: [
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.jsonnet"
        },
        {
          match: /\/\/[^\n]*(?=\n?$)/dgv,
          name: "comment.line.jsonnet"
        },
        {
          match: /#[^\n]*(?=\n?$)/dgv,
          name: "comment.block.jsonnet"
        }
      ]
    },
    "double-quoted-strings": {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.jsonnet",
      patterns: [
        {
          match: /\\(["\/\\bfnrt]|(u\p{AHex}{4}))/dgv,
          name: "constant.character.escape.jsonnet"
        },
        {
          match: /\\[^"\/\\bfnrtu]/dgv,
          name: "invalid.illegal.jsonnet"
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#literals" },
        { include: "#comment" },
        { include: "#single-quoted-strings" },
        { include: "#double-quoted-strings" },
        { include: "#triple-quoted-strings" },
        { include: "#builtin-functions" },
        { include: "#functions" }
      ]
    },
    functions: {
      patterns: [
        {
          begin: /\b([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*\(/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.jsonnet" }
          },
          end: /\)/dgv,
          name: "meta.function",
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /[\-\!\%\&\*\+\/\:\<\=\>\^\|\~]/dgv,
          name: "keyword.operator.jsonnet"
        },
        {
          match: /\$/dgv,
          name: "keyword.other.jsonnet"
        },
        {
          match: /\b(self|super|import|importstr|local|tailstrict)\b/dgv,
          name: "keyword.other.jsonnet"
        },
        {
          match: /\b(if|then|else|for|in|error|assert)\b/dgv,
          name: "keyword.control.jsonnet"
        },
        {
          match: /\b(function)\b/dgv,
          name: "storage.type.jsonnet"
        },
        {
          match: /[A-Z_a-z][0-9A-Z_a-z]*\p{space}*(\+??:::)/dgv,
          name: "variable.parameter.jsonnet"
        },
        {
          match: /[A-Z_a-z][0-9A-Z_a-z]*\p{space}*(\+??::)/dgv,
          name: "entity.name.type"
        },
        {
          match: /[A-Z_a-z][0-9A-Z_a-z]*\p{space}*(\+??:)/dgv,
          name: "variable.parameter.jsonnet"
        }
      ]
    },
    literals: {
      patterns: [
        {
          match: /\b(true|false|null)\b/dgv,
          name: "constant.language.jsonnet"
        },
        {
          match: /\b(\p{Nd}+([Ee][\-\+]?\p{Nd}+)?)\b/dgv,
          name: "constant.numeric.jsonnet"
        },
        {
          match: /\b\p{Nd}+\.\p{Nd}*([Ee][\-\+]?\p{Nd}+)?\b/dgv,
          name: "constant.numeric.jsonnet"
        },
        {
          match: /\b\.\p{Nd}+([Ee][\-\+]?\p{Nd}+)?\b/dgv,
          name: "constant.numeric.jsonnet"
        }
      ]
    },
    "single-quoted-strings": {
      begin: /'/dgv,
      end: /'/dgv,
      name: "string.quoted.double.jsonnet",
      patterns: [
        {
          match: /\\(['\/\\bfnrt]|(u\p{AHex}{4}))/dgv,
          name: "constant.character.escape.jsonnet"
        },
        {
          match: /\\[^'\/\\bfnrtu]/dgv,
          name: "invalid.illegal.jsonnet"
        }
      ]
    },
    "triple-quoted-strings": {
      patterns: [
        {
          begin: /\|\|\|/dgv,
          end: /\|\|\|/dgv,
          name: "string.quoted.triple.jsonnet"
        }
      ]
    }
  },
  dependencies: []
};
