export default {
  name: "awk",
  displayName: "AWK",
  scopeName: "source.awk",
  patterns: [
    { include: "#comment" },
    { include: "#procedure" },
    { include: "#pattern" }
  ],
  repository: {
    "builtin-pattern": {
      match: /\b(BEGINFILE|BEGIN|ENDFILE|END)\b/dgv,
      name: "constant.language.awk"
    },
    command: {
      patterns: [
        {
          match: /\b(?:next|printf??)\b/dgv,
          name: "keyword.other.command.awk"
        },
        {
          match: /\b(?:close|getline|delete|system)\b/dgv,
          name: "keyword.other.command.nawk"
        },
        {
          match: /\b(?:fflush|nextfile)\b/dgv,
          name: "keyword.other.command.bell-awk"
        }
      ]
    },
    comment: {
      match: /#[^\n]*/dgv,
      name: "comment.line.number-sign.awk"
    },
    constant: {
      patterns: [
        { include: "#numeric-constant" },
        { include: "#string-constant" }
      ]
    },
    "escaped-char": {
      match: /\\(?:["\/\\abfnrtv]|x\p{AHex}{2}|[0-7]{3})/dgv,
      name: "constant.character.escape.awk"
    },
    expression: {
      patterns: [
        { include: "#command" },
        { include: "#function" },
        { include: "#constant" },
        { include: "#variable" },
        { include: "#regexp-in-expression" },
        { include: "#operator" },
        { include: "#groupings" }
      ]
    },
    function: {
      patterns: [
        {
          match: /\b(?:exp|int|log|sqrt|index|length|split|sprintf|substr)\b/dgv,
          name: "support.function.awk"
        },
        {
          match: /\b(?:atan2|cos|rand|sin|srand|gsub|match|sub|tolower|toupper)\b/dgv,
          name: "support.function.nawk"
        },
        {
          match: /\b(?:gensub|strftime|systime)\b/dgv,
          name: "support.function.gawk"
        }
      ]
    },
    "function-definition": {
      begin: /\b(function)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)(\()/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.awk" },
        "2": { name: "entity.name.function.awk" },
        "3": { name: "punctuation.definition.parameters.begin.awk" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.awk" }
      },
      patterns: [
        {
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          name: "variable.parameter.function.awk"
        },
        {
          match: /\b(,)\b/dgv,
          name: "punctuation.separator.parameters.awk"
        }
      ]
    },
    groupings: {
      patterns: [
        {
          match: /\(/dgv,
          name: "meta.brace.round.awk"
        },
        {
          match: /\)/dgv,
          name: "meta.brace.round.awk"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.parameters.awk"
        }
      ]
    },
    keyword: {
      match: /\b(?:break|continue|do|while|exit|for|if|else|return)\b/dgv,
      name: "keyword.control.awk"
    },
    "numeric-constant": {
      match: /\b[0-9]+(?:\.[0-9]+)?(?:e[\-\+][0-9]+)?\b/dgv,
      name: "constant.numeric.awk"
    },
    operator: {
      patterns: [
        {
          match: /(!?~|[\!\<\=\>]=|[\<\>])/dgv,
          name: "keyword.operator.comparison.awk"
        },
        {
          match: /\b(in)\b/dgv,
          name: "keyword.operator.comparison.awk"
        },
        {
          match: /([\-\%\*\+\/\^]=|\+\+|--|>>|=)/dgv,
          name: "keyword.operator.assignment.awk"
        },
        {
          match: /(\|\||&&|!)/dgv,
          name: "keyword.operator.boolean.awk"
        },
        {
          match: /([\-\%\*\+\/\^])/dgv,
          name: "keyword.operator.arithmetic.awk"
        },
        {
          match: /([\:\?])/dgv,
          name: "keyword.operator.trinary.awk"
        },
        {
          match: /([\]\[])/dgv,
          name: "keyword.operator.index.awk"
        }
      ]
    },
    pattern: {
      patterns: [
        { include: "#regexp-as-pattern" },
        { include: "#function-definition" },
        { include: "#builtin-pattern" },
        { include: "#expression" }
      ]
    },
    procedure: {
      begin: /\{/dgv,
      end: /\}/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#procedure" },
        { include: "#keyword" },
        { include: "#expression" }
      ]
    },
    "regex-as-assignment": {
      begin: /([^\-\!\%\*\+\/\<\=\>\^]=)\p{space}*(\/)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.assignment.awk" },
        "2": { name: "punctuation.definition.regex.begin.awk" }
      },
      contentName: "string.regexp",
      end: /\//dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.regex.end.awk" }
      },
      patterns: [
        { include: "source.regexp" }
      ]
    },
    "regex-as-comparison": {
      begin: /(!?~)\p{space}*(\/)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.comparison.awk" },
        "2": { name: "punctuation.definition.regex.begin.awk" }
      },
      contentName: "string.regexp",
      end: /\//dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.regex.end.awk" }
      },
      patterns: [
        { include: "source.regexp" }
      ]
    },
    "regex-as-first-argument": {
      begin: /(\()\p{space}*(\/)/dgv,
      beginCaptures: {
        "1": { name: "meta.brace.round.awk" },
        "2": { name: "punctuation.definition.regex.begin.awk" }
      },
      contentName: "string.regexp",
      end: /\//dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.regex.end.awk" }
      },
      patterns: [
        { include: "source.regexp" }
      ]
    },
    "regex-as-nth-argument": {
      begin: /(,)\p{space}*(\/)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.separator.parameters.awk" },
        "2": { name: "punctuation.definition.regex.begin.awk" }
      },
      contentName: "string.regexp",
      end: /\//dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.regex.end.awk" }
      },
      patterns: [
        { include: "source.regexp" }
      ]
    },
    "regexp-as-pattern": {
      begin: /\//dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.regex.begin.awk" }
      },
      contentName: "string.regexp",
      end: /\//dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.regex.end.awk" }
      },
      patterns: [
        { include: "source.regexp" }
      ]
    },
    "regexp-in-expression": {
      patterns: [
        { include: "#regex-as-assignment" },
        { include: "#regex-as-comparison" },
        { include: "#regex-as-first-argument" },
        { include: "#regex-as-nth-argument" }
      ]
    },
    "string-constant": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.awk" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.awk" }
      },
      name: "string.quoted.double.awk",
      patterns: [
        { include: "#escaped-char" }
      ]
    },
    variable: {
      patterns: [
        {
          match: /\$[0-9]+/dgv,
          name: "variable.language.awk"
        },
        {
          match: /\b(?:FILENAME|FS|NF|NR|OFMT|OFS|ORS|RS)\b/dgv,
          name: "variable.language.awk"
        },
        {
          match: /\b(?:ARGC|ARGV|CONVFMT|ENVIRON|FNR|RLENGTH|RSTART|SUBSEP)\b/dgv,
          name: "variable.language.nawk"
        },
        {
          match: /\b(?:ARGIND|ERRNO|FIELDWIDTHS|IGNORECASE|RT)\b/dgv,
          name: "variable.language.gawk"
        }
      ]
    }
  },
  dependencies: []
};
