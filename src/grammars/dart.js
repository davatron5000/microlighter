export default {
  name: "dart",
  displayName: "Dart",
  scopeName: "source.dart",
  patterns: [
    {
      match: /^(#![^\n]*)(?=\n?$)/dgv,
      name: "meta.preprocessor.script.dart"
    },
    {
      begin: /^[\p{L}\p{M}\p{N}\p{Pc}]*\b(augment\p{space}+library|library|import\p{space}+augment|import|part\p{space}+of|part|export)\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.other.import.dart" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.dart" }
      },
      name: "meta.declaration.dart",
      patterns: [
        { include: "#strings" },
        { include: "#comments" },
        {
          match: /\b(as|show|hide)\b/dgv,
          name: "keyword.other.import.dart"
        },
        {
          match: /\b(if)\b/dgv,
          name: "keyword.control.dart"
        }
      ]
    },
    { include: "#comments" },
    { include: "#punctuation" },
    { include: "#annotations" },
    { include: "#keywords" },
    { include: "#constants-and-special-vars" },
    { include: "#class-identifier-with-optional-factory-method" },
    { include: "#function-identifier" },
    { include: "#operators" },
    { include: "#strings" }
  ],
  repository: {
    annotations: {
      patterns: [
        {
          match: /@[A-Za-z]+/dgv,
          name: "storage.type.annotation.dart"
        }
      ]
    },
    "class-identifier": {
      patterns: [
        {
          match: /(?<!\$)\b(bool|num|int|double|dynamic)\b(?!\$)/dgv,
          name: "support.class.dart"
        },
        {
          match: /(?<!\$)\bvoid\b(?!\$)/dgv,
          name: "storage.type.primitive.dart"
        },
        {
          begin: /(?<![\$0-9A-Z_a-z])([\$_]*[A-Z][\$0-9A-Z_a-z]*)\b/dgv,
          beginCaptures: {
            "1": { name: "support.class.dart" }
          },
          end: /(?!<)/dgv,
          patterns: [
            { include: "#type-args" }
          ]
        }
      ]
    },
    "class-identifier-with-optional-factory-method": {
      patterns: [
        {
          captures: {
            "1": { name: "support.class.dart" },
            "2": { name: "entity.name.function.dart" }
          },
          match: /(?<!\$)\b(bool|num|int|double|dynamic)\b(?!\$)\p{space}*(factory\b)?/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.primitive.dart" },
            "2": { name: "entity.name.function.dart" }
          },
          match: /(?<!\$)\b(void)\b(?!\$)\p{space}*(factory\b)?/dgv
        },
        {
          begin: /(?<![\$0-9A-Z_a-z])([\$_]*[A-Z][\$0-9A-Z_a-z]*)\b\p{space}*(factory\b)?/dgv,
          beginCaptures: {
            "1": { name: "support.class.dart" },
            "2": { name: "entity.name.function.dart" }
          },
          end: /(?!<)/dgv,
          patterns: [
            { include: "#type-args" }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        {
          captures: {
            "0": { name: "punctuation.definition.comment.dart" }
          },
          match: /\/\*\*\//dgv,
          name: "comment.block.empty.dart"
        },
        { include: "#comments-doc-oldschool" },
        { include: "#comments-doc" },
        { include: "#comments-inline" }
      ]
    },
    "comments-block": {
      patterns: [
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.dart",
          patterns: [
            { include: "#comments-block" }
          ]
        }
      ]
    },
    "comments-doc": {
      patterns: [
        {
          begin: /\/\/\//dgv,
          end: /^(?!\p{space}*\/\/\/)/dgv,
          name: "comment.block.documentation.dart",
          patterns: [
            { include: "#dartdoc" }
          ]
        }
      ]
    },
    "comments-doc-oldschool": {
      patterns: [
        {
          begin: /\/\*\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.documentation.dart",
          patterns: [
            { include: "#comments-doc-oldschool" },
            { include: "#comments-block" },
            { include: "#dartdoc" }
          ]
        }
      ]
    },
    "comments-inline": {
      patterns: [
        { include: "#comments-block" },
        {
          captures: {
            "1": { name: "comment.line.double-slash.dart" }
          },
          match: /((\/\/)[^\n]*)(?=\n?$)/dgv
        }
      ]
    },
    "constants-and-special-vars": {
      patterns: [
        {
          match: /(?<!\$)\b(true|false|null)\b(?!\$)/dgv,
          name: "constant.language.dart"
        },
        {
          match: /(?<!\$)\b(this|super|augmented)\b(?!\$)/dgv,
          name: "variable.language.dart"
        },
        {
          match: /(?<!\$)\b((0([Xx])\p{AHex}[_\p{AHex}]*)|(([0-9][0-9_]*\.?[0-9_]*)|(\.[0-9][0-9_]*))(([Ee])([\-\+])?[0-9][0-9_]*)?)\b(?!\$)/dgv,
          name: "constant.numeric.dart"
        }
      ]
    },
    dartdoc: {
      patterns: [
        {
          captures: {
            "0": { name: "variable.name.source.dart" }
          },
          match: /(\[[^\n]*?\])/dgv
        },
        {
          begin: /^\p{space}*\/\/\/\p{space}*(```)/dgv,
          end: /^(?:\p{space}*\/\/\/\p{space}*(```)|(?!\p{space}*\/\/\/))/dgv,
          patterns: [
            { include: "#dartdoc-codeblock-triple" }
          ]
        },
        {
          begin: /^\p{space}*\*\p{space}*(```)/dgv,
          end: /^(?:\p{space}*\*\p{space}*(```)|(?=\p{space}*\*\/))/dgv,
          patterns: [
            { include: "#dartdoc-codeblock-block" }
          ]
        },
        {
          match: /`[^\n\`]+`/dgv,
          name: "variable.other.source.dart"
        },
        {
          captures: {
            "1": { name: "variable.other.source.dart" }
          },
          match: /(?:\*|\/\/)\p{space}{4,}([^\n]*?)(?=((?=\n?$)|\*\/))/dgv
        }
      ]
    },
    "dartdoc-codeblock-block": {
      begin: /^\p{space}*\*\p{space}*(?!(\p{space}*```|\/))/dgv,
      contentName: "variable.other.source.dart",
      end: /(?=\n?$)/dgv
    },
    "dartdoc-codeblock-triple": {
      begin: /^\p{space}*\/\/\/\p{space}*(?!\p{space}*```)/dgv,
      contentName: "variable.other.source.dart",
      end: /(?=\n?$)/dgv
    },
    expression: {
      patterns: [
        { include: "#constants-and-special-vars" },
        { include: "#class-identifier-with-optional-factory-method" },
        { include: "#function-identifier" },
        { include: "#strings" },
        {
          match: /[0-9A-Z_a-z]+/dgv,
          name: "variable.parameter.dart"
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    "function-identifier": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.dart" },
            "2": {
              patterns: [
                { include: "#type-args" }
              ]
            }
          },
          match: /([\$_]*[a-z][\$0-9A-Z_a-z]*)(<(?:[\$0-9\<\>\?A-Z_a-z]|,\p{space}*|\p{space}+extends\p{space}+)+>)?[\!\?]?\(/dgv
        },
        {
          match: /(?<=\.)new\b/dgv,
          name: "entity.name.function.dart"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /(?<!\$)\bas\b(?!\$)/dgv,
          name: "keyword.cast.dart"
        },
        {
          match: /(?<!\$)\b(try|on|catch|finally|throw|rethrow)\b(?!\$)/dgv,
          name: "keyword.control.catch-exception.dart"
        },
        {
          match: /(?<!\$)\b(break|case|continue|default|do|else|for|if|in|switch|while|when)\b(?!\$)/dgv,
          name: "keyword.control.dart"
        },
        {
          match: /(?<!\$)\b(sync(\*)?|async(\*)?|await|yield(\*)?)\b(?!\$)/dgv,
          name: "keyword.control.dart"
        },
        {
          match: /(?<!\$)\bassert\b(?!\$)/dgv,
          name: "keyword.control.dart"
        },
        {
          match: /(?<![\$\.])\b(new)\b(?!\$)/dgv,
          name: "keyword.new.dart"
        },
        {
          match: /(?<!\$)\b(return)\b(?!\$)/dgv,
          name: "keyword.control.return.dart"
        },
        {
          match: /(?<!\$)\b(abstract|sealed|base|interface|class|enum|extends|extension\p{space}+type|extension|external|factory|implements|get(?![\(\<])|mixin|native|operator|set(?![\(\<])|typedef|with|covariant)\b(?!\$)/dgv,
          name: "keyword.declaration.dart"
        },
        {
          match: /(?<!\$)\b(macro|augment|static|final|const|required|late)\b(?!\$)/dgv,
          name: "storage.modifier.dart"
        },
        {
          match: /(?<!\$)\bvar\b(?!\$)/dgv,
          name: "storage.type.primitive.dart"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /(?<!\$)\b(is!?)\b(?!\$)/dgv,
          name: "keyword.operator.dart"
        },
        {
          match: /[\:\?]/dgv,
          name: "keyword.operator.ternary.dart"
        },
        {
          match: /(<<|>>>?|[\&\^\|\~])/dgv,
          name: "keyword.operator.bitwise.dart"
        },
        {
          match: /(([\&\^\|]|<<|>>>?)=)/dgv,
          name: "keyword.operator.assignment.bitwise.dart"
        },
        {
          match: /(=>)/dgv,
          name: "keyword.operator.closure.dart"
        },
        {
          match: /(==|!=|<=?|>=?)/dgv,
          name: "keyword.operator.comparison.dart"
        },
        {
          match: /(([\-\%\*\+\/\~])=)/dgv,
          name: "keyword.operator.assignment.arithmetic.dart"
        },
        {
          match: /(=)/dgv,
          name: "keyword.operator.assignment.dart"
        },
        {
          match: /(--|\+\+)/dgv,
          name: "keyword.operator.increment-decrement.dart"
        },
        {
          match: /([\-\*\+\/]|~\/|%)/dgv,
          name: "keyword.operator.arithmetic.dart"
        },
        {
          match: /(!|&&|\|\|)/dgv,
          name: "keyword.operator.logical.dart"
        }
      ]
    },
    punctuation: {
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.comma.dart"
        },
        {
          match: /;/dgv,
          name: "punctuation.terminator.dart"
        },
        {
          match: /\./dgv,
          name: "punctuation.dot.dart"
        }
      ]
    },
    "string-interp": {
      patterns: [
        {
          captures: {
            "1": { name: "variable.parameter.dart" }
          },
          match: /\$([0-9A-Z_a-z]+)/dgv,
          name: "meta.embedded.expression.dart"
        },
        {
          begin: /\$\{/dgv,
          end: /\}/dgv,
          name: "meta.embedded.expression.dart",
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.dart"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /(?<!r)"""/dgv,
          end: /"""(?!")/dgv,
          name: "string.interpolated.triple.double.dart",
          patterns: [
            { include: "#string-interp" }
          ]
        },
        {
          begin: /(?<!r)'''/dgv,
          end: /'''(?!')/dgv,
          name: "string.interpolated.triple.single.dart",
          patterns: [
            { include: "#string-interp" }
          ]
        },
        {
          begin: /r"""/dgv,
          end: /"""(?!")/dgv,
          name: "string.quoted.triple.double.dart"
        },
        {
          begin: /r'''/dgv,
          end: /'''(?!')/dgv,
          name: "string.quoted.triple.single.dart"
        },
        {
          begin: /(?<!\|r)"/dgv,
          end: /"/dgv,
          name: "string.interpolated.double.dart",
          patterns: [
            {
              match: /\n/dgv,
              name: "invalid.string.newline"
            },
            { include: "#string-interp" }
          ]
        },
        {
          begin: /r"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.dart",
          patterns: [
            {
              match: /\n/dgv,
              name: "invalid.string.newline"
            }
          ]
        },
        {
          begin: /(?<!\|r)'/dgv,
          end: /'/dgv,
          name: "string.interpolated.single.dart",
          patterns: [
            {
              match: /\n/dgv,
              name: "invalid.string.newline"
            },
            { include: "#string-interp" }
          ]
        },
        {
          begin: /r'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.dart",
          patterns: [
            {
              match: /\n/dgv,
              name: "invalid.string.newline"
            }
          ]
        }
      ]
    },
    "type-args": {
      begin: /(<)/dgv,
      beginCaptures: {
        "1": { name: "other.source.dart" }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": { name: "other.source.dart" }
      },
      patterns: [
        { include: "#class-identifier" },
        {
          match: /,/dgv
        },
        {
          match: /extends/dgv,
          name: "keyword.declaration.dart"
        },
        { include: "#comments" }
      ]
    }
  },
  dependencies: []
};
