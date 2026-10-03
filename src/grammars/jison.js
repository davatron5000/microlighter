export default {
  name: "jison",
  displayName: "Jison",
  scopeName: "source.jison",
  patterns: [
    {
      begin: /%%/dgv,
      beginCaptures: {
        "0": { name: "meta.separator.section.jison" }
      },
      end: /$/dgv,
      patterns: [
        {
          begin: /%%/dgv,
          beginCaptures: {
            "0": { name: "meta.separator.section.jison" }
          },
          end: /$/dgv,
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              contentName: "source.js.embedded.jison",
              end: /$/dgv,
              name: "meta.section.epilogue.jison",
              patterns: [
                { include: "#epilogue_section" }
              ]
            }
          ]
        },
        {
          begin: {
            G: [/￿/dgv, /(?:)/dgv]
          },
          end: /(?=%%)/dgv,
          name: "meta.section.rules.jison",
          patterns: [
            { include: "#rules_section" }
          ]
        }
      ]
    },
    {
      begin: /^/dgv,
      end: /(?=%%)/dgv,
      name: "meta.section.declarations.jison",
      patterns: [
        { include: "#declarations_section" }
      ]
    }
  ],
  repository: {
    actions: {
      patterns: [
        {
          begin: /\{\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.action.begin.jison" }
          },
          contentName: "source.js.embedded.jison",
          end: /\}\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.action.end.jison" }
          },
          name: "meta.action.jison",
          patterns: [
            { include: "source.js" }
          ]
        },
        {
          begin: /(?=%\{)/dgv,
          end: /(?<=%\})/dgv,
          name: "meta.action.jison",
          patterns: [
            { include: "#user_code_blocks" }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /\/\//dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.jison" }
          },
          end: /(?=\n?$)/dgv,
          name: "comment.line.double-slash.jison"
        },
        {
          begin: /\/\*/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.jison" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.jison" }
          },
          name: "comment.block.jison"
        }
      ]
    },
    declarations_section: {
      patterns: [
        { include: "#comments" },
        {
          begin: /^\p{space}*(%lex)\p{space}*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.lexer.begin.jison" }
          },
          end: /^\p{space}*(\/lex)\b/dgv,
          endCaptures: {
            "1": { name: "entity.name.tag.lexer.end.jison" }
          },
          patterns: [
            {
              begin: /%%/dgv,
              beginCaptures: {
                "0": { name: "meta.separator.section.jisonlex" }
              },
              end: /(?=\/lex)/dgv,
              patterns: [
                {
                  begin: /^%%/dgv,
                  beginCaptures: {
                    "0": { name: "meta.separator.section.jisonlex" }
                  },
                  end: /(?=\/lex)/dgv,
                  patterns: [
                    {
                      begin: {
                        G: [/￿/dgv, /(?:)/dgv]
                      },
                      contentName: "source.js.embedded.jisonlex",
                      end: /(?=\/lex)/dgv,
                      name: "meta.section.user-code.jisonlex",
                      patterns: [
                        { include: "source.jisonlex#user_code_section" }
                      ]
                    }
                  ]
                },
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /^(?=%%|\/lex)/dgv,
                  name: "meta.section.rules.jisonlex",
                  patterns: [
                    { include: "source.jisonlex#rules_section" }
                  ]
                }
              ]
            },
            {
              begin: /^/dgv,
              end: /(?=%%|\/lex)/dgv,
              name: "meta.section.definitions.jisonlex",
              patterns: [
                { include: "source.jisonlex#definitions_section" }
              ]
            }
          ]
        },
        {
          begin: /(?=%\{)/dgv,
          end: /(?<=%\})/dgv,
          name: "meta.section.prologue.jison",
          patterns: [
            { include: "#user_code_blocks" }
          ]
        },
        { include: "#options_declarations" },
        {
          match: /%(ebnf|left|nonassoc|parse-param|right|start)\b/dgv,
          name: "keyword.other.declaration.$1.jison"
        },
        { include: "#include_declarations" },
        {
          begin: /%(code)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.declaration.$1.jison" }
          },
          end: /(?=\n?$)/dgv,
          name: "meta.code.jison",
          patterns: [
            { include: "#comments" },
            { include: "#rule_actions" },
            {
              match: /(init|required)/dgv,
              name: "keyword.other.code-qualifier.$1.jison"
            },
            { include: "#quoted_strings" },
            {
              match: /\b[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?\b/dgv,
              name: "string.unquoted.jison"
            }
          ]
        },
        {
          begin: /%(parser-type)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.declaration.$1.jison" }
          },
          end: /(?=\n?$)/dgv,
          name: "meta.parser-type.jison",
          patterns: [
            { include: "#comments" },
            { include: "#quoted_strings" },
            {
              match: /\b[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?\b/dgv,
              name: "string.unquoted.jison"
            }
          ]
        },
        {
          begin: /%(token)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.declaration.$1.jison" }
          },
          end: /(?=\n?$)|(%%|;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.declaration.token.jison" }
          },
          name: "meta.token.jison",
          patterns: [
            { include: "#comments" },
            { include: "#numbers" },
            { include: "#quoted_strings" },
            {
              match: /<[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?>/dgv,
              name: "invalid.unimplemented.jison"
            },
            {
              match: /\P{space}+/dgv,
              name: "entity.other.token.jison"
            }
          ]
        },
        {
          match: /%(debug|import)\b/dgv,
          name: "keyword.other.declaration.$1.jison"
        },
        {
          match: /%prec\b/dgv,
          name: "invalid.illegal.jison"
        },
        {
          match: /%[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?\b/dgv,
          name: "invalid.unimplemented.jison"
        },
        { include: "#numbers" },
        { include: "#quoted_strings" }
      ]
    },
    epilogue_section: {
      patterns: [
        { include: "#user_code_include_declarations" },
        { include: "source.js" }
      ]
    },
    include_declarations: {
      patterns: [
        {
          begin: /(%(include))\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.declaration.$2.jison" }
          },
          end: /(?<=["'])|(?=\p{space})/dgv,
          name: "meta.include.jison",
          patterns: [
            { include: "#include_paths" }
          ]
        }
      ]
    },
    include_paths: {
      patterns: [
        { include: "#quoted_strings" },
        {
          begin: /(?=\P{space})/dgv,
          end: /(?=\p{space})/dgv,
          name: "string.unquoted.jison",
          patterns: [
            { include: "source.js#string_escapes" }
          ]
        }
      ]
    },
    numbers: {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.number.jison" },
            "2": { name: "constant.numeric.integer.hexadecimal.jison" }
          },
          match: /(0[Xx])(\p{AHex}+)/dgv
        },
        {
          match: /\p{Nd}+/dgv,
          name: "constant.numeric.integer.decimal.jison"
        }
      ]
    },
    options_declarations: {
      patterns: [
        {
          begin: /%options\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.options.jison" }
          },
          end: /^(?=\P{space}|\p{space}*(?=\n?$))/dgv,
          name: "meta.options.jison",
          patterns: [
            { include: "#comments" },
            {
              match: /\b[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?\b/dgv,
              name: "entity.name.constant.jison"
            },
            {
              begin: /(=)\p{space}*/dgv,
              beginCaptures: {
                "1": { name: "keyword.operator.option.assignment.jison" }
              },
              end: /(?<=["'])|(?=\p{space})/dgv,
              patterns: [
                { include: "#comments" },
                {
                  match: /\b(true|false)\b/dgv,
                  name: "constant.language.boolean.$1.jison"
                },
                { include: "#numbers" },
                { include: "#quoted_strings" },
                {
                  match: /\P{space}+/dgv,
                  name: "string.unquoted.jison"
                }
              ]
            },
            { include: "#quoted_strings" }
          ]
        }
      ]
    },
    quoted_strings: {
      patterns: [
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.jison",
          patterns: [
            { include: "source.js#string_escapes" }
          ]
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.jison",
          patterns: [
            { include: "source.js#string_escapes" }
          ]
        }
      ]
    },
    rule_actions: {
      patterns: [
        { include: "#actions" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.action.begin.jison" }
          },
          contentName: "source.js.embedded.jison",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.action.end.jison" }
          },
          name: "meta.action.jison",
          patterns: [
            { include: "source.js" }
          ]
        },
        { include: "#include_declarations" },
        {
          begin: /->|→/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.action.arrow.jison" }
          },
          contentName: "source.js.embedded.jison",
          end: /(?=\n?$)/dgv,
          name: "meta.action.jison",
          patterns: [
            { include: "source.js" }
          ]
        }
      ]
    },
    rules_section: {
      patterns: [
        { include: "#comments" },
        { include: "#actions" },
        { include: "#include_declarations" },
        {
          begin: /\b[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?\b/dgv,
          beginCaptures: {
            "0": { name: "entity.name.constant.rule-result.jison" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.rule.jison" }
          },
          name: "meta.rule.jison",
          patterns: [
            { include: "#comments" },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.rule-components.assignment.jison" }
              },
              end: /(?=;)/dgv,
              name: "meta.rule-components.jison",
              patterns: [
                { include: "#comments" },
                { include: "#quoted_strings" },
                {
                  captures: {
                    "1": { name: "punctuation.definition.named-reference.begin.jison" },
                    "2": { name: "entity.name.other.reference.jison" },
                    "3": { name: "punctuation.definition.named-reference.end.jison" }
                  },
                  match: /(\[)([_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?)(\])/dgv
                },
                {
                  begin: /(%(prec))\p{space}*/dgv,
                  beginCaptures: {
                    "1": { name: "keyword.other.$2.jison" }
                  },
                  end: /(?<=["'])|(?=\p{space})/dgv,
                  name: "meta.prec.jison",
                  patterns: [
                    { include: "#comments" },
                    { include: "#quoted_strings" },
                    {
                      begin: /(?=\P{space})/dgv,
                      end: /(?=\p{space})/dgv,
                      name: "constant.other.token.jison"
                    }
                  ]
                },
                {
                  match: /\|/dgv,
                  name: "keyword.operator.rule-components.separator.jison"
                },
                {
                  match: /\b(?:EOF|error)\b/dgv,
                  name: "keyword.other.$0.jison"
                },
                {
                  match: /(?:%e(?:mpty|psilon)|\b[Ɛɛεϵ])\b/dgv,
                  name: "keyword.other.empty.jison"
                },
                { include: "#rule_actions" }
              ]
            }
          ]
        }
      ]
    },
    user_code_blocks: {
      patterns: [
        {
          begin: /%\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.user-code-block.begin.jison" }
          },
          contentName: "source.js.embedded.jison",
          end: /%\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.user-code-block.end.jison" }
          },
          name: "meta.user-code-block.jison",
          patterns: [
            { include: "source.js" }
          ]
        }
      ]
    },
    user_code_include_declarations: {
      patterns: [
        {
          begin: /^(%(include))\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.declaration.$2.jison" }
          },
          end: /(?<=["'])|(?=\p{space})/dgv,
          name: "meta.include.jison",
          patterns: [
            { include: "#include_paths" }
          ]
        }
      ]
    }
  },
  injections: {
    "L:(meta.action.jison - (comment | string)), source.js.embedded.jison - (comment | string), source.js.embedded.source - (comment | string.quoted.double | string.quoted.single)": {
      patterns: [
        {
          match: /\${2}/dgv,
          name: "variable.language.semantic-value.jison"
        },
        {
          match: /@\$/dgv,
          name: "variable.language.result-location.jison"
        },
        {
          match: /##\$|\byysp\b/dgv,
          name: "variable.language.stack-index-0.jison"
        },
        {
          match: /#\P{space}+#/dgv,
          name: "support.variable.token-reference.jison"
        },
        {
          match: /#\$/dgv,
          name: "variable.language.result-id.jison"
        },
        {
          match: /\$(?:-?\p{Nd}+|[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?)/dgv,
          name: "support.variable.token-value.jison"
        },
        {
          match: /@(?:-?\p{Nd}+|[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?)/dgv,
          name: "support.variable.token-location.jison"
        },
        {
          match: /##(?:-?\p{Nd}+|[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?)/dgv,
          name: "support.variable.stack-index.jison"
        },
        {
          match: /#(?:-?\p{Nd}+|[_\p{Alpha}](?:[\-\p{L}\p{M}\p{N}\p{Pc}]*[\p{L}\p{M}\p{N}\p{Pc}])?)/dgv,
          name: "support.variable.token-id.jison"
        },
        {
          match: /\byy(?:l(?:eng|ineno|oc|stack)|rulelength|s(?:tate|s?tack)|text|vstack)\b/dgv,
          name: "variable.language.jison"
        },
        {
          match: /\byy(?:clearin|erro[kr])\b/dgv,
          name: "keyword.other.jison"
        }
      ]
    }
  },
  dependencies: [
    "javascript"
  ]
};
