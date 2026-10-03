export default {
  name: "cue",
  displayName: "CUE",
  scopeName: "source.cue",
  patterns: [
    { include: "#whitespace" },
    { include: "#comment" },
    {
      captures: {
        "1": { name: "keyword.other.package" },
        "2": { name: "entity.name.namespace" }
      },
      match: /(?<![\#\$_\p{L}\p{Nd}])(package)[\t ]+([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*)(?![\#\$_\p{L}\p{Nd}])/dgv
    },
    {
      patterns: [
        {
          begin: /(?<![\#\$_\p{L}\p{Nd}])(import)[\t ]+(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.import" },
            "2": { name: "punctuation.section.parens.begin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.parens.end" }
          },
          name: "meta.imports",
          patterns: [
            { include: "#whitespace" },
            { include: "#comment" },
            {
              captures: {
                "1": { name: "entity.name.namespace" },
                "2": { name: "punctuation.definition.string.begin" },
                "3": { name: "string.quoted.double-import" },
                "4": { name: "punctuation.colon" },
                "5": { name: "entity.name" },
                "6": { name: "punctuation.definition.string.end" }
              },
              match: /(?:([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*)[\t ]+)?(")([^"\:]+)(?:(:)([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*))?(")/dgv,
              name: "meta.import-spec"
            },
            {
              match: /;/dgv,
              name: "punctuation.separator"
            },
            { include: "#invalid_in_parens" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.other.import" },
            "2": { name: "entity.name.namespace" },
            "3": { name: "punctuation.definition.string.begin" },
            "4": { name: "string.quoted.double-import" },
            "5": { name: "punctuation.colon" },
            "6": { name: "entity.name" },
            "7": { name: "punctuation.definition.string.end" }
          },
          match: /(?<![\#\$_\p{L}\p{Nd}])(import)[\t ]+(?:([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*)[\t ]+)?(")([^"\:]+)(?:(:)([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*))?(")/dgv,
          name: "meta.import"
        }
      ]
    },
    { include: "#punctuation_comma" },
    { include: "#declaration" },
    { include: "#invalid_in_braces" }
  ],
  repository: {
    attribute_element: {
      patterns: [
        {
          begin: /([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+)(=)/dgv,
          beginCaptures: {
            "1": { name: "variable.other" },
            "2": { name: "punctuation.bind" }
          },
          end: /(?=[\)\,])/dgv,
          patterns: [
            { include: "#attribute_string" }
          ]
        },
        {
          begin: /([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+)(\()/dgv,
          beginCaptures: {
            "1": { name: "variable.other" },
            "2": { name: "punctuation.attribute-elements.begin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.attribute-elements.end" }
          },
          patterns: [
            { include: "#punctuation_comma" },
            { include: "#attribute_element" }
          ]
        },
        { include: "#attribute_string" }
      ]
    },
    attribute_string: {
      patterns: [
        { include: "#string" },
        {
          match: /[^\n"\#'\(\)\,\=]+/dgv,
          name: "string.unquoted"
        },
        {
          match: /[^\)\,]+/dgv,
          name: "invalid"
        }
      ]
    },
    comment: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.comment" }
          },
          match: /(\/\/)[^\n]*(?=\n?$)\n?/dgv,
          name: "comment.line"
        },
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment" }
          },
          end: /\*\//dgv,
          name: "comment.block"
        }
      ]
    },
    declaration: {
      patterns: [
        {
          begin: /(@)([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+)(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.annotation" },
            "2": { name: "variable.annotation" },
            "3": { name: "punctuation.attribute-elements.begin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.attribute-elements.end" }
          },
          name: "meta.annotation",
          patterns: [
            { include: "#punctuation_comma" },
            { include: "#attribute_element" }
          ]
        },
        {
          match: /(?<!:)::(?!:)/dgv,
          name: "punctuation.isa"
        },
        { include: "#punctuation_colon" },
        {
          match: /\?/dgv,
          name: "punctuation.option"
        },
        {
          match: /(?<![\!\<\=\>])=(?![\=\~])/dgv,
          name: "punctuation.bind"
        },
        {
          match: /<-/dgv,
          name: "punctuation.arrow"
        },
        { include: "#expression" }
      ]
    },
    expression: {
      patterns: [
        {
          patterns: [
            {
              captures: {
                "1": { name: "keyword.control.for" },
                "2": { name: "variable.other" },
                "3": { name: "punctuation.separator" },
                "4": { name: "variable.other" },
                "5": { name: "keyword.control.in" }
              },
              match: /(?<![\#\$_\p{L}\p{Nd}])(for)[\t ]+([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+)(?:[\t ]*(,)[\t ]*([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+))?[\t ]+(in)(?![\#\$_\p{L}\p{Nd}])/dgv
            },
            {
              match: /(?<![\#\$_\p{L}\p{Nd}])if(?![\#\$_\p{L}\p{Nd}])/dgv,
              name: "keyword.control.conditional"
            },
            {
              captures: {
                "1": { name: "keyword.control.let" },
                "2": { name: "variable.other" },
                "3": { name: "punctuation.bind" }
              },
              match: /(?<![\#\$_\p{L}\p{Nd}])(let)[\t ]+([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+)[\t ]*(=)(?!=)/dgv
            }
          ]
        },
        {
          patterns: [
            {
              match: /[\-\*\+]|\/(?![\*\/])/dgv,
              name: "keyword.operator"
            },
            {
              match: /(?<![\#\$_\p{L}\p{Nd}])(?:div|mod|quo|rem)(?![\#\$_\p{L}\p{Nd}])/dgv,
              name: "keyword.operator.word"
            },
            {
              match: /=[\=\~]|![\=\~]|<=|>=|<(?![\-\=])|>(?!=)/dgv,
              name: "keyword.operator.comparison"
            },
            {
              match: /&{2}|\|{2}|!(?![\=\~])/dgv,
              name: "keyword.operator.logical"
            },
            {
              match: /&(?!&)|\|(?!\|)/dgv,
              name: "keyword.operator.set"
            }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.accessor" },
            "2": { name: "variable.other.member" }
          },
          match: /(?<!\.)(\.)([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+)(?![\#\$_\p{L}\p{Nd}])/dgv
        },
        {
          patterns: [
            {
              match: /(?<![\#\$_\p{L}\p{Nd}])_(?!\|)(?![\#\$_\p{L}\p{Nd}])/dgv,
              name: "constant.language.top"
            },
            {
              match: /(?<![\#\$_\p{L}\p{Nd}])_\|_(?![\#\$_\p{L}\p{Nd}])/dgv,
              name: "constant.language.bottom"
            },
            {
              match: /(?<![\#\$_\p{L}\p{Nd}])null(?![\#\$_\p{L}\p{Nd}])/dgv,
              name: "constant.language.null"
            },
            {
              match: /(?<![\#\$_\p{L}\p{Nd}])(?:true|false)(?![\#\$_\p{L}\p{Nd}])/dgv,
              name: "constant.language.bool"
            },
            {
              patterns: [
                {
                  patterns: [
                    {
                      match: /(?<![\._\p{L}\p{Nd}])[0-9](?:_?[0-9])*\.(?:[0-9](?:_?[0-9])*)?(?:[Ee][\-\+]?[0-9](?:_?[0-9])*)?(?![\._\p{L}\p{Nd}])/dgv,
                      name: "constant.numeric.float.decimal"
                    },
                    {
                      match: /(?<![\._\p{L}\p{Nd}])[0-9](?:_?[0-9])*[Ee][\-\+]?[0-9](?:_?[0-9])*(?![\._\p{L}\p{Nd}])/dgv,
                      name: "constant.numeric.float.decimal"
                    },
                    {
                      match: /(?<![\._\p{L}\p{Nd}])\.[0-9](?:_?[0-9])*(?:[Ee][\-\+]?[0-9](?:_?[0-9])*)?(?![\._\p{L}\p{Nd}])/dgv,
                      name: "constant.numeric.float.decimal"
                    }
                  ]
                },
                {
                  patterns: [
                    {
                      patterns: [
                        {
                          match: /(?<![\._\p{L}\p{Nd}])(?:0|[1-9](?:_?[0-9])*)(?:\.[0-9](?:_?[0-9])*)?[EGKMPTYZ]i?(?![\._\p{L}\p{Nd}])/dgv,
                          name: "constant.numeric.integer.other"
                        },
                        {
                          match: /(?<![\._\p{L}\p{Nd}])\.[0-9](?:_?[0-9])*[EGKMPTYZ]i?(?![\._\p{L}\p{Nd}])/dgv,
                          name: "constant.numeric.integer.other"
                        }
                      ]
                    },
                    {
                      match: /(?<![\._\p{L}\p{Nd}])(?:0|[1-9](?:_?[0-9])*)(?![\._\p{L}\p{Nd}])/dgv,
                      name: "constant.numeric.integer.decimal"
                    },
                    {
                      match: /(?<![\._\p{L}\p{Nd}])0b[01](?:_?[01])*(?![\._\p{L}\p{Nd}])/dgv,
                      name: "constant.numeric.integer.binary"
                    },
                    {
                      match: /(?<![\._\p{L}\p{Nd}])0[Xx]\p{AHex}(?:_?\p{AHex})*(?![\._\p{L}\p{Nd}])/dgv,
                      name: "constant.numeric.integer.hexadecimal"
                    },
                    {
                      match: /(?<![\._\p{L}\p{Nd}])0o?[0-7](?:_?[0-7])*(?![\._\p{L}\p{Nd}])/dgv,
                      name: "constant.numeric.integer.octal"
                    }
                  ]
                }
              ]
            },
            { include: "#string" },
            {
              match: /(?<![\#\$_\p{L}\p{Nd}])(?:bool|u?int(?:8|16|32|64|128)?|float(?:32|64)?|string|bytes|number|rune)(?![\#\$_\p{L}\p{Nd}])/dgv,
              name: "support.type"
            },
            {
              patterns: [
                {
                  begin: /(?<![\#\$_\p{L}\p{Nd}])(len|close|and|or)(\()/dgv,
                  beginCaptures: {
                    "1": { name: "support.function" },
                    "2": { name: "punctuation.section.parens.begin" }
                  },
                  end: /\)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.parens.end" }
                  },
                  name: "meta.function-call",
                  patterns: [
                    { include: "#whitespace" },
                    { include: "#comment" },
                    { include: "#punctuation_comma" },
                    { include: "#expression" },
                    { include: "#invalid_in_parens" }
                  ]
                },
                {
                  begin: /(?<![\#\$_\p{L}\p{Nd}])([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*)(\.)(\p{Lu}[\#\$_\p{L}\p{Nd}]*)(\()/dgv,
                  beginCaptures: {
                    "1": { name: "support.module" },
                    "2": { name: "punctuation" },
                    "3": { name: "support.function" },
                    "4": { name: "punctuation.section.parens.begin" }
                  },
                  end: /\)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.parens.end" }
                  },
                  name: "meta.function-call",
                  patterns: [
                    { include: "#whitespace" },
                    { include: "#comment" },
                    { include: "#punctuation_comma" },
                    { include: "#expression" },
                    { include: "#invalid_in_parens" }
                  ]
                }
              ]
            },
            {
              match: /(?<![\#\$_\p{L}\p{Nd}])(?:[\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+)(?![\#\$_\p{L}\p{Nd}])/dgv,
              name: "variable.other"
            },
            {
              begin: /\{/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.struct.begin" }
              },
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.struct.end" }
              },
              name: "meta.struct",
              patterns: [
                { include: "#whitespace" },
                { include: "#comment" },
                { include: "#punctuation_comma" },
                { include: "#punctuation_ellipsis" },
                { include: "#declaration" },
                { include: "#invalid_in_braces" }
              ]
            },
            {
              begin: /\[/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.brackets.begin" }
              },
              end: /\]/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.brackets.end" }
              },
              name: "meta.brackets",
              patterns: [
                { include: "#whitespace" },
                { include: "#comment" },
                { include: "#punctuation_colon" },
                { include: "#punctuation_comma" },
                { include: "#punctuation_ellipsis" },
                {
                  captures: {
                    "1": { name: "variable.other" },
                    "2": { name: "punctuation.alias" }
                  },
                  match: /([\#\$\p{L}][\#\$_\p{L}\p{Nd}]*|_[\#\$_\p{L}\p{Nd}]+)[\t ]*(=)/dgv
                },
                { include: "#expression" },
                {
                  match: /[^\]]+/dgv,
                  name: "invalid"
                }
              ]
            },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.parens.begin" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.parens.end" }
              },
              name: "meta.parens",
              patterns: [
                { include: "#whitespace" },
                { include: "#comment" },
                { include: "#punctuation_comma" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            }
          ]
        }
      ]
    },
    invalid_in_braces: {
      match: /[^\}]+/dgv,
      name: "invalid"
    },
    invalid_in_parens: {
      match: /[^\)]+/dgv,
      name: "invalid"
    },
    punctuation_colon: {
      match: /(?<!:):(?!:)/dgv,
      name: "punctuation.colon"
    },
    punctuation_comma: {
      match: /,/dgv,
      name: "punctuation.separator"
    },
    punctuation_ellipsis: {
      match: /(?<!\.)\.{3}(?!\.)/dgv,
      name: "punctuation.ellipsis"
    },
    string: {
      patterns: [
        {
          begin: /#"""/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.double-multiline",
          end: /"""#/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string",
          patterns: [
            {
              match: /\\#(?:"""|[\/\\abfnrtv]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape"
            },
            {
              match: /\\#(?:[0-7]{3}|x\p{AHex}{2})/dgv,
              name: "invalid.illegal"
            },
            {
              begin: /\\#\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.interpolation.begin" }
              },
              contentName: "source.cue.embedded",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.interpolation.end" }
              },
              name: "meta.interpolation",
              patterns: [
                { include: "#whitespace" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            },
            {
              match: /\\#[^\n]/dgv,
              name: "invalid.illegal"
            }
          ]
        },
        {
          begin: /#"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.double",
          end: /"#/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string",
          patterns: [
            {
              match: /\\#(?:["\/\\abfnrtv]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape"
            },
            {
              match: /\\#(?:[0-7]{3}|x\p{AHex}{2})/dgv,
              name: "invalid.illegal"
            },
            {
              begin: /\\#\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.interpolation.begin" }
              },
              contentName: "source.cue.embedded",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.interpolation.end" }
              },
              name: "meta.interpolation",
              patterns: [
                { include: "#whitespace" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            },
            {
              match: /\\#[^\n]/dgv,
              name: "invalid.illegal"
            }
          ]
        },
        {
          begin: /#'''/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.single-multiline",
          end: /'''#/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string",
          patterns: [
            {
              match: /\\#(?:'''|[\/\\abfnrtv]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape"
            },
            {
              match: /\\#(?:[0-7]{3}|x\p{AHex}{2})/dgv,
              name: "constant.character.escape"
            },
            {
              begin: /\\#\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.interpolation.begin" }
              },
              contentName: "source.cue.embedded",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.interpolation.end" }
              },
              name: "meta.interpolation",
              patterns: [
                { include: "#whitespace" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            },
            {
              match: /\\#[^\n]/dgv,
              name: "invalid.illegal"
            }
          ]
        },
        {
          begin: /#'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.single",
          end: /'#/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string",
          patterns: [
            {
              match: /\\#(?:['\/\\abfnrtv]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape"
            },
            {
              match: /\\#(?:[0-7]{3}|x\p{AHex}{2})/dgv,
              name: "constant.character.escape"
            },
            {
              begin: /\\#\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.interpolation.begin" }
              },
              contentName: "source.cue.embedded",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.interpolation.end" }
              },
              name: "meta.interpolation",
              patterns: [
                { include: "#whitespace" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            },
            {
              match: /\\#[^\n]/dgv,
              name: "invalid.illegal"
            }
          ]
        },
        {
          begin: /"""/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.double-multiline",
          end: /"""/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string",
          patterns: [
            {
              match: /\\(?:"""|[\/\\abfnrtv]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape"
            },
            {
              match: /\\(?:[0-7]{3}|x\p{AHex}{2})/dgv,
              name: "invalid.illegal"
            },
            {
              begin: /\\\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.interpolation.begin" }
              },
              contentName: "source.cue.embedded",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.interpolation.end" }
              },
              name: "meta.interpolation",
              patterns: [
                { include: "#whitespace" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            },
            {
              match: /\\[^\n]/dgv,
              name: "invalid.illegal"
            }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.double",
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string",
          patterns: [
            {
              match: /\\(?:["\/\\abfnrtv]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape"
            },
            {
              match: /\\(?:[0-7]{3}|x\p{AHex}{2})/dgv,
              name: "invalid.illegal"
            },
            {
              begin: /\\\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.interpolation.begin" }
              },
              contentName: "source.cue.embedded",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.interpolation.end" }
              },
              name: "meta.interpolation",
              patterns: [
                { include: "#whitespace" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            },
            {
              match: /\\[^\n]/dgv,
              name: "invalid.illegal"
            }
          ]
        },
        {
          begin: /'''/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.single-multiline",
          end: /'''/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string",
          patterns: [
            {
              match: /\\(?:'''|[\/\\abfnrtv]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape"
            },
            {
              match: /\\(?:[0-7]{3}|x\p{AHex}{2})/dgv,
              name: "constant.character.escape"
            },
            {
              begin: /\\\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.interpolation.begin" }
              },
              contentName: "source.cue.embedded",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.interpolation.end" }
              },
              name: "meta.interpolation",
              patterns: [
                { include: "#whitespace" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            },
            {
              match: /\\[^\n]/dgv,
              name: "invalid.illegal"
            }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.single",
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string",
          patterns: [
            {
              match: /\\(?:['\/\\abfnrtv]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape"
            },
            {
              match: /\\(?:[0-7]{3}|x\p{AHex}{2})/dgv,
              name: "constant.character.escape"
            },
            {
              begin: /\\\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.interpolation.begin" }
              },
              contentName: "source.cue.embedded",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.interpolation.end" }
              },
              name: "meta.interpolation",
              patterns: [
                { include: "#whitespace" },
                { include: "#expression" },
                { include: "#invalid_in_parens" }
              ]
            },
            {
              match: /\\[^\n]/dgv,
              name: "invalid.illegal"
            }
          ]
        },
        {
          begin: /`/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin" }
          },
          contentName: "string.quoted.backtick",
          end: /`/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end" }
          },
          name: "meta.string"
        }
      ]
    },
    whitespace: {
      match: /[\t\n\r ]+/dgv
    }
  },
  dependencies: []
};
