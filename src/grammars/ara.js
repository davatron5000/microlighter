import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "ara",
  displayName: "Ara",
  scopeName: "source.ara",
  patterns: [
    { include: "#namespace" },
    { include: "#named-arguments" },
    { include: "#comments" },
    { include: "#keywords" },
    { include: "#strings" },
    { include: "#numbers" },
    { include: "#operators" },
    { include: "#type" },
    { include: "#function-call" }
  ],
  repository: {
    "class-name": {
      patterns: [
        {
          begin: /\b(?<!\$)(?=[A-Z\\_a-z])/dgiv,
          end: /([_a-z][0-9_a-z]*)?(?=[^0-9\\_a-z])\b/dgiv,
          endCaptures: {
            "1": { name: "support.class.ara" }
          },
          patterns: [
            { include: "#namespace" }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.ara" }
          },
          end: /\*\//dgv,
          name: "comment.block.ara"
        },
        {
          begin: /(^[\t ]+)?(?=\/\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.ara" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /\/\//dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.ara" }
              },
              end: /\n/dgv,
              name: "comment.line.double-slash.ara"
            }
          ]
        }
      ]
    },
    "function-call": {
      patterns: [
        {
          begin: /(?=\\?[0-9\\_a-z]+\\[_a-z][0-9_a-z]*\p{space}*(\(|(::<)))/dgiv,
          end: /(?=\p{space}*(\(|(::<)))/dgv,
          patterns: [
            { include: "#user-function-call" }
          ]
        },
        {
          begin: /(\\)?(?=\b[_a-z][0-9_a-z]*\p{space}*(\(|(::<)))/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.separator.inheritance.php" }
          },
          end: /(?=\p{space}*(\(|(::<)))/dgv,
          patterns: [
            { include: "#user-function-call" }
          ]
        }
      ]
    },
    interpolation: {
      patterns: [
        {
          match: /\\[0-7]{1,3}/dgv,
          name: "constant.numeric.octal.ara"
        },
        {
          match: /\\x\p{AHex}{1,2}/dgv,
          name: "constant.numeric.hex.ara"
        },
        {
          match: /\\["\$\\nrt]/dgv,
          name: "constant.character.escape.ara"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(await|async|concurrently|break|continue|do|else|elseif|for|if|loop|while|foreach|match|return|try|yield|from|catch|finally|default|exit)\b/dgv,
          name: "keyword.control.ara"
        },
        {
          match: /\b(const|enum|class|interface|trait|namespace|type|case|function|fn)\b/dgv,
          name: "storage.decl.ara"
        },
        {
          match: /\b(final|abstract|static|readonly|public|private|protected)\b/dgv,
          name: "storage.modifier.ara"
        },
        {
          match: /\b(as|is|extends|implements|use|where|clone|new)\b/dgv,
          name: "keyword.other.ara"
        }
      ]
    },
    "named-arguments": {
      captures: {
        "1": { name: "entity.name.variable.parameter.ara" },
        "2": { name: "punctuation.separator.colon.ara" }
      },
      match: /(?<=^|[\(\,])\p{space}*([_a-z\x7F-\u{10FFFF}][0-9_a-z\x7F-\u{10FFFF}]*)\p{space}*(:)(?!:)/dgiv
    },
    namespace: {
      begin: /((namespace)|[0-9_a-z]+)?(\\)(?=[^\n]*?[^0-9\\_a-z])/dgiv,
      beginCaptures: {
        "1": { name: "entity.name.type.namespace.php" },
        "3": { name: "punctuation.separator.inheritance.php" }
      },
      end: /(?=[0-9_a-z]*[^0-9\\_a-z])/dgiv,
      name: "support.other.namespace.php",
      patterns: [
        {
          match: /[0-9_a-z]+(?=\\)/dgiv,
          name: "entity.name.type.namespace.php"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.inheritance.php" }
          },
          match: /(\\)/dgv
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /0[Xx]\p{AHex}+(?:_\p{AHex}+)*/dgv,
          name: "constant.numeric.hex.ara"
        },
        {
          match: /0[Bb][01]+(?:_[01]+)*/dgv,
          name: "constant.numeric.binary.ara"
        },
        {
          match: /0[Oo][0-7]+(?:_[0-7]+)*/dgv,
          name: "constant.numeric.octal.ara"
        },
        {
          match: /0(?:_?[0-7]+)+/dgv,
          name: "constant.numeric.octal.ara"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.decimal.period.ara" },
            "2": { name: "punctuation.separator.decimal.period.ara" }
          },
          match: /(?:[0-9]+(?:_[0-9]+)*)?(\.)[0-9]+(?:_[0-9]+)*(?:[Ee][\-\+]?[0-9]+(?:_[0-9]+)*)?|[0-9]+(?:_[0-9]+)*(\.)(?:[0-9]+(?:_[0-9]+)*)?(?:[Ee][\-\+]?[0-9]+(?:_[0-9]+)*)?|[0-9]+(?:_[0-9]+)*[Ee][\-\+]?[0-9]+(?:_[0-9]+)*/dgv,
          name: "constant.numeric.decimal.ara"
        },
        {
          match: /0|[1-9](?:_?[0-9]+)*/dgv,
          name: "constant.numeric.decimal.ara"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /((?:[\-\%\*\+\/\^]|&&|[\&\<\>\|]|<<|>>|\?\?)=)/dgv,
          name: "keyword.assignments.ara"
        },
        {
          match: /([\^\|]|\|\||&&|>>|<<|[\&\~]|<<|>>|[\<\>]|<=>|\?\?|[\:\?]|\?:)(?!=)/dgv,
          name: "keyword.operators.ara"
        },
        {
          match: /(===??|!==?|<=|>=|[\<\>])(?!=)/dgv,
          name: "keyword.operator.comparison.ara"
        },
        {
          match: /(([\%\+]|(\*(?![\p{L}\p{M}\p{N}\p{Pc}])))(?!=))|(-(?!>))|(\/(?!\/))/dgv,
          name: "keyword.operator.math.ara"
        },
        {
          match: /(?<![\<\>])=(?![\=\>])/dgv,
          name: "keyword.operator.assignment.ara"
        },
        {
          captures: {
            "1": { name: "punctuation.brackets.round.ara" },
            "2": { name: "punctuation.brackets.square.ara" },
            "3": { name: "punctuation.brackets.curly.ara" },
            "4": { name: "keyword.operator.comparison.ara" },
            "5": { name: "punctuation.brackets.round.ara" },
            "6": { name: "punctuation.brackets.square.ara" },
            "7": { name: "punctuation.brackets.curly.ara" }
          },
          match: /(?:\b|(?:(\))|(\])|(\})))[\t ]+([\<\>])[\t ]+(?:\b|(?:(\()|(\[)|(\{)))/dgv
        },
        {
          match: /\???->/dgv,
          name: "keyword.operator.arrow.ara"
        },
        {
          match: /=>/dgv,
          name: "keyword.operator.double-arrow.ara"
        },
        {
          match: /::/dgv,
          name: "keyword.operator.static.ara"
        },
        {
          match: /\(\.\.\.\)/dgv,
          name: "keyword.operator.closure.ara"
        },
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.spread.ara"
        },
        {
          match: /\\/dgv,
          name: "keyword.operator.namespace.ara"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.ara",
          patterns: [
            {
              match: /\\['\\]/dgv,
              name: "constant.character.escape.ara"
            }
          ]
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.ara",
          patterns: [
            { include: "#interpolation" }
          ]
        }
      ]
    },
    type: {
      name: "support.type.php",
      patterns: [
        {
          match: /\b(?:void|true|false|null|never|float|bool|int|string|dict|vec|object|mixed|nonnull|resource|self|static|parent|iterable)\b/dgv,
          name: "support.type.php"
        },
        {
          begin: /([A-Z_a-z][0-9A-Z_a-z]*)</dgv,
          beginCaptures: {
            "1": { name: "support.class.php" }
          },
          end: />/dgv,
          patterns: [
            { include: "#type-annotation" }
          ]
        },
        {
          begin: /(shape\()/dgv,
          end: /((,|\.\.\.)?\p{space}*\))/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.key.php" }
          },
          name: "storage.type.shape.php",
          patterns: [
            { include: "#type-annotation" },
            { include: "#strings" },
            { include: "#constants" }
          ]
        },
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          patterns: [
            { include: "#type-annotation" }
          ]
        },
        {
          begin: /\(fn\(/dgv,
          end: /\)/dgv,
          patterns: [
            { include: "#type-annotation" }
          ]
        },
        { include: "#class-name" },
        { include: "#comments" }
      ]
    },
    "user-function-call": {
      begin: /(?=[0-9\\_a-z]*[_a-z][0-9_a-z]*\p{space}*\()/dgiv,
      end: /[_a-z][0-9_a-z]*(?=\p{space}*\()/dgiv,
      endCaptures: {
        "0": { name: "entity.name.function.php" }
      },
      name: "meta.function-call.php",
      patterns: [
        { include: "#namespace" }
      ]
    }
  },
  dependencies: []
};
