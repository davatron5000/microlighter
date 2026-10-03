export default {
  name: "nix",
  displayName: "Nix",
  scopeName: "source.nix",
  patterns: [
    { include: "#expression" }
  ],
  repository: {
    "attribute-bind": {
      patterns: [
        { include: "#attribute-name" },
        { include: "#attribute-bind-from-equals" }
      ]
    },
    "attribute-bind-from-equals": {
      begin: /=/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.bind.nix" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.bind.nix" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    "attribute-inherit": {
      begin: /\binherit\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.other.inherit.nix" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.inherit.nix" }
      },
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.function.arguments.nix" }
          },
          end: /(?=;)/dgv,
          patterns: [
            {
              begin: /\)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.function.arguments.nix" }
              },
              end: /(?=;)/dgv,
              patterns: [
                { include: "#bad-reserved" },
                { include: "#attribute-name-single" },
                { include: "#others" }
              ]
            },
            { include: "#expression" }
          ]
        },
        {
          begin: /(?=[A-Z_a-z])/dgv,
          end: /(?=;)/dgv,
          patterns: [
            { include: "#bad-reserved" },
            { include: "#attribute-name-single" },
            { include: "#others" }
          ]
        },
        { include: "#others" }
      ]
    },
    "attribute-name": {
      patterns: [
        {
          match: /\b[A-Z_a-z][\-'0-9A-Z_a-z]*/dgv,
          name: "entity.other.attribute-name.multipart.nix"
        },
        {
          match: /\./dgv
        },
        { include: "#string-quoted" },
        { include: "#interpolation" }
      ]
    },
    "attribute-name-single": {
      match: /\b[A-Z_a-z][\-'0-9A-Z_a-z]*/dgv,
      name: "entity.other.attribute-name.single.nix"
    },
    "attrset-contents": {
      patterns: [
        { include: "#attribute-inherit" },
        { include: "#bad-reserved" },
        { include: "#attribute-bind" },
        { include: "#others" }
      ]
    },
    "attrset-definition": {
      begin: /(?=\{)/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.attrset.nix" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.attrset.nix" }
          },
          patterns: [
            { include: "#attrset-contents" }
          ]
        },
        {
          begin: /(?<=\})/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression-cont" }
          ]
        }
      ]
    },
    "attrset-definition-brace-opened": {
      patterns: [
        {
          begin: /(?<=\})/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression-cont" }
          ]
        },
        {
          begin: /(?=[^\n]?)/dgv,
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.attrset.nix" }
          },
          patterns: [
            { include: "#attrset-contents" }
          ]
        }
      ]
    },
    "attrset-for-sure": {
      patterns: [
        {
          begin: /(?=\brec\b)/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            {
              begin: /\brec\b/dgv,
              beginCaptures: {
                "0": { name: "keyword.other.nix" }
              },
              end: /(?=\{)/dgv,
              patterns: [
                { include: "#others" }
              ]
            },
            { include: "#attrset-definition" },
            { include: "#others" }
          ]
        },
        {
          begin: /(?=\{\p{space}*(\}|[^\,\?]*([\;\=])))/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#attrset-definition" },
            { include: "#others" }
          ]
        }
      ]
    },
    "attrset-or-function": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.attrset-or-function.nix" }
      },
      end: /(?=([\]\)\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        {
          begin: /(?=(\p{space}*\}|"|\binherit\b|\$\{|\b[A-Z_a-z][\-'0-9A-Z_a-z]*(\p{space}*\.|\p{space}*=[^\=])))/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#attrset-definition-brace-opened" }
          ]
        },
        {
          begin: /(?=(\.\.\.|\b[A-Z_a-z][\-'0-9A-Z_a-z]*\p{space}*[\,\?]))/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#function-definition-brace-opened" }
          ]
        },
        { include: "#bad-reserved" },
        {
          begin: /\b[A-Z_a-z][\-'0-9A-Z_a-z]*/dgv,
          beginCaptures: {
            "0": { name: "variable.parameter.function.maybe.nix" }
          },
          end: /(?=([\]\)\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            {
              begin: /(?=\.)/dgv,
              end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
              patterns: [
                { include: "#attrset-definition-brace-opened" }
              ]
            },
            {
              begin: /\p{space}*(,)/dgv,
              beginCaptures: {
                "1": { name: "keyword.operator.nix" }
              },
              end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
              patterns: [
                { include: "#function-definition-brace-opened" }
              ]
            },
            {
              begin: /(?==)/dgv,
              end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
              patterns: [
                { include: "#attribute-bind-from-equals" },
                { include: "#attrset-definition-brace-opened" }
              ]
            },
            {
              begin: /(?=\?)/dgv,
              end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
              patterns: [
                { include: "#function-parameter-default" },
                {
                  begin: /,/dgv,
                  beginCaptures: {
                    "0": { name: "keyword.operator.nix" }
                  },
                  end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
                  patterns: [
                    { include: "#function-definition-brace-opened" }
                  ]
                }
              ]
            },
            { include: "#others" }
          ]
        },
        { include: "#others" }
      ]
    },
    "bad-reserved": {
      match: /(?<![\-'\p{L}\p{M}\p{N}\p{Pc}])(if|then|else|assert|with|let|in|rec|inherit)(?![\-'\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "invalid.illegal.reserved.nix"
    },
    comment: {
      patterns: [
        {
          begin: /\/\*([^\*]|\*[^\/])*/dgv,
          end: /\*\//dgv,
          name: "comment.block.nix"
        },
        {
          begin: /#/dgv,
          end: /(?=\n?$)/dgv,
          name: "comment.line.number-sign.nix"
        }
      ]
    },
    constants: {
      patterns: [
        {
          begin: /\b(builtins|true|false|null)\b/dgv,
          beginCaptures: {
            "0": { name: "constant.language.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression-cont" }
          ]
        },
        {
          begin: /\b(scopedImport|import|isNull|abort|throw|baseNameOf|dirOf|removeAttrs|map|toString|derivationStrict|derivation)\b/dgv,
          beginCaptures: {
            "0": { name: "support.function.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression-cont" }
          ]
        },
        {
          begin: /\b[0-9]+\b/dgv,
          beginCaptures: {
            "0": { name: "constant.numeric.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression-cont" }
          ]
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#parens-and-cont" },
        { include: "#list-and-cont" },
        { include: "#string" },
        { include: "#interpolation" },
        { include: "#with-assert" },
        { include: "#function-for-sure" },
        { include: "#attrset-for-sure" },
        { include: "#attrset-or-function" },
        { include: "#let" },
        { include: "#if" },
        { include: "#operator-unary" },
        { include: "#operator-binary" },
        { include: "#constants" },
        { include: "#bad-reserved" },
        { include: "#parameter-name-and-cont" },
        { include: "#others" }
      ]
    },
    "expression-cont": {
      begin: /(?=[^\n]?)/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        { include: "#parens" },
        { include: "#list" },
        { include: "#string" },
        { include: "#interpolation" },
        { include: "#function-for-sure" },
        { include: "#attrset-for-sure" },
        { include: "#attrset-or-function" },
        { include: "#operator-binary" },
        { include: "#constants" },
        { include: "#bad-reserved" },
        { include: "#parameter-name" },
        { include: "#others" }
      ]
    },
    "function-body": {
      begin: /(@\p{space}*([A-Z_a-z][\-'0-9A-Z_a-z]*)\p{space}*)?(:)/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    "function-body-from-colon": {
      begin: /(:)/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.function.nix" }
      },
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    "function-contents": {
      patterns: [
        { include: "#bad-reserved" },
        { include: "#function-parameter" },
        { include: "#others" }
      ]
    },
    "function-definition": {
      begin: /(?=[^\n]?)/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        { include: "#function-body-from-colon" },
        {
          begin: /(?=[^\n]?)/dgv,
          end: /(?=:)/dgv,
          patterns: [
            {
              begin: /\b([A-Z_a-z][\-'0-9A-Z_a-z]*)/dgv,
              beginCaptures: {
                "0": { name: "variable.parameter.function.4.nix" }
              },
              end: /(?=:)/dgv,
              patterns: [
                {
                  begin: /@/dgv,
                  end: /(?=:)/dgv,
                  patterns: [
                    { include: "#function-header-until-colon-no-arg" },
                    { include: "#others" }
                  ]
                },
                { include: "#others" }
              ]
            },
            {
              begin: /(?=\{)/dgv,
              end: /(?=:)/dgv,
              patterns: [
                { include: "#function-header-until-colon-with-arg" }
              ]
            }
          ]
        },
        { include: "#others" }
      ]
    },
    "function-definition-brace-opened": {
      begin: /(?=[^\n]?)/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        { include: "#function-body-from-colon" },
        {
          begin: /(?=[^\n]?)/dgv,
          end: /(?=:)/dgv,
          patterns: [
            { include: "#function-header-close-brace-with-arg" },
            {
              begin: /(?=[^\n]?)/dgv,
              end: /(?=\})/dgv,
              patterns: [
                { include: "#function-contents" }
              ]
            }
          ]
        },
        { include: "#others" }
      ]
    },
    "function-for-sure": {
      patterns: [
        {
          begin: /(?=(\b[A-Z_a-z][\-'0-9A-Z_a-z]*\p{space}*[\:\@]|\{[^"'\}]*\}\p{space}*:|\{[^"\#'\/\=\}]*[\,\?]))/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#function-definition" }
          ]
        }
      ]
    },
    "function-header-close-brace-no-arg": {
      begin: /\}/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.entity.function.nix" }
      },
      end: /(?=:)/dgv,
      patterns: [
        { include: "#others" }
      ]
    },
    "function-header-close-brace-with-arg": {
      begin: /\}/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.entity.function.nix" }
      },
      end: /(?=:)/dgv,
      patterns: [
        { include: "#function-header-terminal-arg" },
        { include: "#others" }
      ]
    },
    "function-header-open-brace": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.entity.function.2.nix" }
      },
      end: /(?=\})/dgv,
      patterns: [
        { include: "#function-contents" }
      ]
    },
    "function-header-terminal-arg": {
      begin: /(?=@)/dgv,
      end: /(?=:)/dgv,
      patterns: [
        {
          begin: /@/dgv,
          end: /(?=:)/dgv,
          patterns: [
            {
              begin: /\b([A-Z_a-z][\-'0-9A-Z_a-z]*)/dgv,
              end: /(?=:)/dgv,
              name: "variable.parameter.function.3.nix"
            },
            { include: "#others" }
          ]
        },
        { include: "#others" }
      ]
    },
    "function-header-until-colon-no-arg": {
      begin: /(?=\{)/dgv,
      end: /(?=:)/dgv,
      patterns: [
        { include: "#function-header-open-brace" },
        { include: "#function-header-close-brace-no-arg" }
      ]
    },
    "function-header-until-colon-with-arg": {
      begin: /(?=\{)/dgv,
      end: /(?=:)/dgv,
      patterns: [
        { include: "#function-header-open-brace" },
        { include: "#function-header-close-brace-with-arg" }
      ]
    },
    "function-parameter": {
      patterns: [
        {
          begin: /(\.\.\.)/dgv,
          end: /(,|(?=\}))/dgv,
          name: "keyword.operator.nix",
          patterns: [
            { include: "#others" }
          ]
        },
        {
          begin: /\b[A-Z_a-z][\-'0-9A-Z_a-z]*/dgv,
          beginCaptures: {
            "0": { name: "variable.parameter.function.1.nix" }
          },
          end: /(,|(?=\}))/dgv,
          endCaptures: {
            "0": { name: "keyword.operator.nix" }
          },
          patterns: [
            { include: "#whitespace" },
            { include: "#comment" },
            { include: "#function-parameter-default" },
            { include: "#expression" }
          ]
        },
        { include: "#others" }
      ]
    },
    "function-parameter-default": {
      begin: /\?/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.nix" }
      },
      end: /(?=[\,\}])/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    if: {
      begin: /(?=\bif\b)/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        {
          begin: /\bif\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.nix" }
          },
          end: /\bth(?=en\b)/dgv,
          endCaptures: {
            "0": { name: "keyword.other.nix" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /(?<=th)en\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.nix" }
          },
          end: /\bel(?=se\b)/dgv,
          endCaptures: {
            "0": { name: "keyword.other.nix" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /(?<=el)se\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          endCaptures: {
            "0": { name: "keyword.other.nix" }
          },
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    illegal: {
      match: /[^\n]/dgv,
      name: "invalid.illegal"
    },
    interpolation: {
      begin: /\$\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.embedded.begin.nix" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.end.nix" }
      },
      name: "meta.embedded",
      patterns: [
        { include: "#expression" }
      ]
    },
    let: {
      begin: /(?=\blet\b)/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        {
          begin: /\blet\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(in|else|then)\b))/dgv,
          patterns: [
            {
              begin: /(?=\{)/dgv,
              end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
              patterns: [
                {
                  begin: /\{/dgv,
                  end: /\}/dgv,
                  patterns: [
                    { include: "#attrset-contents" }
                  ]
                },
                {
                  begin: /(^|(?<=\}))/dgv,
                  end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
                  patterns: [
                    { include: "#expression-cont" }
                  ]
                },
                { include: "#others" }
              ]
            },
            { include: "#attrset-contents" },
            { include: "#others" }
          ]
        },
        {
          begin: /\bin\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    list: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.list.nix" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.list.nix" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    "list-and-cont": {
      begin: /(?=\[)/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        { include: "#list" },
        { include: "#expression-cont" }
      ]
    },
    "operator-binary": {
      match: /(\bor\b|\.|\|>|<\||==|!=?|<=?|>=?|&&|\|\||->|\/\/|\?|\+\+|[\-\*]|\/(?=([^\*]|(?=\n?$)))|\+)/dgv,
      name: "keyword.operator.nix"
    },
    "operator-unary": {
      match: /([\-\!])/dgv,
      name: "keyword.operator.unary.nix"
    },
    others: {
      patterns: [
        { include: "#whitespace" },
        { include: "#comment" },
        { include: "#illegal" }
      ]
    },
    "parameter-name": {
      captures: {
        "0": { name: "variable.parameter.name.nix" }
      },
      match: /\b[A-Z_a-z][\-'0-9A-Z_a-z]*/dgv
    },
    "parameter-name-and-cont": {
      begin: /\b[A-Z_a-z][\-'0-9A-Z_a-z]*/dgv,
      beginCaptures: {
        "0": { name: "variable.parameter.name.nix" }
      },
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        { include: "#expression-cont" }
      ]
    },
    parens: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.expression.nix" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.expression.nix" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    "parens-and-cont": {
      begin: /(?=\()/dgv,
      end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
      patterns: [
        { include: "#parens" },
        { include: "#expression-cont" }
      ]
    },
    string: {
      patterns: [
        {
          begin: /(?='')/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            {
              begin: /''/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.string.other.start.nix" }
              },
              end: /''(?![\$']|\\[^\n])/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.string.other.end.nix" }
              },
              name: "string.quoted.other.nix",
              patterns: [
                {
                  match: /''([\$']|\\[^\n])/dgv,
                  name: "constant.character.escape.nix"
                },
                { include: "#interpolation" }
              ]
            },
            { include: "#expression-cont" }
          ]
        },
        {
          begin: /(?=")/dgv,
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#string-quoted" },
            { include: "#expression-cont" }
          ]
        },
        {
          begin: /(~?[\-\+\.0-9A-Z_a-z]*(\/[\-\+\.0-9A-Z_a-z]+)+)/dgv,
          beginCaptures: {
            "0": { name: "string.unquoted.path.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression-cont" }
          ]
        },
        {
          begin: /(<[\-\+\.0-9A-Z_a-z]+(\/[\-\+\.0-9A-Z_a-z]+)*>)/dgv,
          beginCaptures: {
            "0": { name: "string.unquoted.spath.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression-cont" }
          ]
        },
        {
          begin: /([A-Za-z][\-\+\.0-9A-Za-z]*:[\!\$-'\*-\:\=\?-Z_a-z\~]+)/dgv,
          beginCaptures: {
            "0": { name: "string.unquoted.url.nix" }
          },
          end: /(?=([\]\)\,\;\}]|\b(else|then)\b))/dgv,
          patterns: [
            { include: "#expression-cont" }
          ]
        }
      ]
    },
    "string-quoted": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.double.start.nix" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.double.end.nix" }
      },
      name: "string.quoted.double.nix",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.nix"
        },
        { include: "#interpolation" }
      ]
    },
    whitespace: {
      match: /\p{space}+/dgv
    },
    "with-assert": {
      begin: /(?<![\-'\p{L}\p{M}\p{N}\p{Pc}])(with|assert)(?![\-'\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "keyword.other.nix" }
      },
      end: /;/dgv,
      patterns: [
        { include: "#expression" }
      ]
    }
  },
  dependencies: [
    "markdown-nix"
  ]
};
