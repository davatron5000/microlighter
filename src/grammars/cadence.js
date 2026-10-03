import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "cadence",
  displayName: "Cadence",
  aliases: [
    "cdc"
  ],
  scopeName: "source.cadence",
  patterns: [
    { include: "#comments" },
    { include: "#declarations" },
    { include: "#keywords" },
    { include: "#code-block" },
    { include: "#expressions" },
    { include: "#composite" },
    { include: "#event" }
  ],
  repository: {
    "code-block": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.scope.begin.cadence" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.scope.end.cadence" }
      },
      patterns: [
        { include: "$self" }
      ]
    },
    comments: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.comment.cadence" }
          },
          match: {
            A: [/￿^(#!)[^\n]*(?=\n?$)\n?/dgv, /^^(#!)[^\n]*(?=\n?$)\n?/dgv]
          },
          name: "comment.line.number-sign.cadence"
        },
        {
          begin: /\/\*\*(?!\/)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.cadence" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.cadence" }
          },
          name: "comment.block.documentation.cadence",
          patterns: [
            { include: "#nested" }
          ]
        },
        {
          begin: /\/\*:/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.cadence" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.cadence" }
          },
          name: "comment.block.documentation.playground.cadence",
          patterns: [
            { include: "#nested" }
          ]
        },
        {
          begin: /\/\*/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.cadence" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.cadence" }
          },
          name: "comment.block.cadence",
          patterns: [
            { include: "#nested" }
          ]
        },
        {
          match: /\*\//dgv,
          name: "invalid.illegal.unexpected-end-of-block-comment.cadence"
        },
        {
          begin: /(^[\t ]+)?(?=\/\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.cadence" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /\/\/\//dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.cadence" }
              },
              end: /(?=\n?$)/dgv,
              name: "comment.line.triple-slash.documentation.cadence"
            },
            {
              begin: /\/\/:/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.cadence" }
              },
              end: /(?=\n?$)/dgv,
              name: "comment.line.double-slash.documentation.cadence"
            },
            {
              begin: /\/\//dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.cadence" }
              },
              end: /(?=\n?$)/dgv,
              name: "comment.line.double-slash.cadence"
            }
          ]
        }
      ],
      repository: {
        nested: {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          patterns: [
            { include: "#nested" }
          ]
        }
      }
    },
    composite: {
      begin: /\b((?:struct|resource|contract|attachment)(?:\p{space}+interface)?|enum)\p{space}+([_\p{L}][_\p{L}\p{N}\p{M}]*)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.$1.cadence" },
        "2": { name: "entity.name.type.$1.cadence" }
      },
      end: /(?<=\})|(?=\p{space}*(?=\n?$))/dgv,
      name: "meta.definition.type.composite.cadence",
      patterns: [
        { include: "#comments" },
        { include: "#conformance-clause" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.type.begin.cadence" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.type.end.cadence" }
          },
          name: "meta.definition.type.body.cadence",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "conformance-clause": {
      begin: /(:)(?=\p{space}*\{)|(:)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "invalid.illegal.empty-conformance-clause.cadence" },
        "2": { name: "punctuation.separator.conformance-clause.cadence" }
      },
      end: {
        G: [/(?!￿)(?=\n?$)|(?=[\=\{\}])/dgv, new EmulatedRegExp("(?!^)(?=\\n?$)|(?=[\\=\\{\\}])", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.conformance-clause.cadence",
      patterns: [
        {
          begin: {
            G: [/￿/dgv, /(?:)/dgv]
          },
          end: {
            G: [/(?!￿)(?=\n?$)|(?=[\=\{\}])/dgv, new EmulatedRegExp("(?!^)(?=\\n?$)|(?=[\\=\\{\\}])", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            { include: "#comments" },
            { include: "#type" }
          ]
        }
      ]
    },
    declarations: {
      patterns: [
        { include: "#var-let-declaration" },
        { include: "#function" },
        { include: "#initializer" },
        { include: "#prepare-execute" },
        { include: "#execute-phase" },
        { include: "#pre-post" },
        { include: "#transaction" }
      ]
    },
    event: {
      begin: /\b(event)\b\p{space}+([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "storage.type.event.cadence" },
        "2": { name: "entity.name.type.event.cadence" }
      },
      end: /(?<=\))/dgv,
      name: "meta.definition.type.event.cadence",
      patterns: [
        { include: "#comments" },
        { include: "#parameter-clause" }
      ]
    },
    "execute-phase": {
      begin: /(?<!\.)\b(execute)\b\p{space}*(?=\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.phase.cadence" }
      },
      end: /(?<=\})/dgv,
      name: "meta.definition.transaction.phase.cadence",
      patterns: [
        { include: "#comments" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.phase.begin.cadence" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.phase.end.cadence" }
          },
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "expression-element-list": {
      patterns: [
        { include: "#comments" },
        {
          begin: /([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}*(:)/dgv,
          beginCaptures: {
            "1": { name: "variable.parameter.function-call.cadence" },
            "2": { name: "punctuation.separator.argument-label.cadence" }
          },
          end: /(?=[\]\)\,])/dgv,
          patterns: [
            { include: "#expressions" }
          ]
        },
        {
          begin: /(?![\]\)\,])(?=\P{space})/dgv,
          end: /(?=[\]\)\,])/dgv,
          patterns: [
            { include: "#expressions" }
          ]
        }
      ]
    },
    expressions: {
      patterns: [
        { include: "#comments" },
        { include: "#keywords" },
        { include: "#language-variables" },
        { include: "#function-expression" },
        { include: "#path-literals" },
        {
          begin: /(?!\b(?:if|while|for|return|create|destroy|emit|as)\b)([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}*(<)(?=[\&\(\@\[_\{\p{Lu}]|auth\b|\p{space}*(?=\n?$))/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.cadence" },
            "2": { name: "punctuation.definition.type-arguments.begin.cadence" }
          },
          end: /(>)(?!\p{space}*[\<\=\>])/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.type-arguments.end.cadence" }
          },
          name: "meta.type.arguments.cadence",
          patterns: [
            { include: "#type" },
            {
              match: /,/dgv,
              name: "punctuation.separator.type-argument.cadence"
            }
          ]
        },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.arguments.begin.cadence" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.arguments.end.cadence" }
          },
          name: "meta.group.cadence",
          patterns: [
            { include: "#expression-element-list" }
          ]
        },
        {
          begin: /(?<=\.)([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.cadence" },
            "2": { name: "punctuation.definition.arguments.begin.cadence" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.arguments.end.cadence" }
          },
          name: "meta.function-call.method.cadence",
          patterns: [
            { include: "#expression-element-list" }
          ]
        },
        {
          match: /(?<=\.)[_\p{L}][_\p{L}\p{N}\p{M}]*/dgv,
          name: "variable.other.member.cadence"
        },
        { include: "#function-call-expression" },
        {
          match: /(?<!\.)\b(?!(?:contract|struct|resource|event|enum|attachment|entitlement|import|fun|let|var|if|else|switch|case|default|while|for|in|break|continue|return|emit|as|create|destroy|attach|to|remove|from|pub|priv|access|all|self|view|auth|transaction|prepare|execute|pre|post|init|true|false|nil|Type|Int|UInt|Int8|Int16|Int32|Int64|Int128|Int256|UInt8|UInt16|UInt32|UInt64|UInt128|UInt256|Word8|Word16|Word32|Word64|Fix64|Fix128|UFix64|UFix128|String|Character|Bool|Address|Void|AnyStruct|AnyResource|Any|Never|mapping|include)\b)[_\p{L}][_\p{L}\p{N}\p{M}]*\b/dgv,
          name: "variable.other.readwrite.cadence"
        },
        { include: "#literals" },
        { include: "#operators" }
      ]
    },
    function: {
      begin: /\b(fun)\b\p{space}+([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.cadence" },
        "2": { name: "entity.name.function.cadence" }
      },
      end: /(?<=\})|;|(?=\}\p{space}*(?=\n?$))|(?=\n?$)/dgv,
      name: "meta.definition.function.cadence",
      patterns: [
        { include: "#comments" },
        { include: "#parameter-clause" },
        { include: "#function-result" },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.function.begin.cadence" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.function.end.cadence" }
          },
          name: "meta.definition.function.body.cadence",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "function-call-expression": {
      patterns: [
        {
          begin: /(?<!\.)\b(?!set|init|transaction|prepare|execute|access|auth)([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.cadence" },
            "2": { name: "punctuation.definition.arguments.begin.cadence" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.arguments.end.cadence" }
          },
          name: "meta.function-call.cadence",
          patterns: [
            { include: "#expression-element-list" }
          ]
        }
      ]
    },
    "function-expression": {
      begin: /(?<!\.)\b(?:(view)\p{space}+)?(fun)\b(?=\p{space}*\()/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.view.cadence" },
        "2": { name: "storage.type.function.cadence" }
      },
      end: /(?<=\})|(?=\n?$)/dgv,
      name: "meta.function.expression.cadence",
      patterns: [
        { include: "#comments" },
        { include: "#parameter-clause" },
        { include: "#function-result" },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.function.begin.cadence" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.function.end.cadence" }
          },
          name: "meta.definition.function.body.cadence",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "function-result": {
      begin: /(?<![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])(:)(?![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.function-result.cadence" }
      },
      end: {
        G: [/(?<![\&\<\@\[])(?!￿)(?=\p{space}*\{)|(?=;|(?<!\{)\})|(?=\n?$)/dgv, new EmulatedRegExp("(?<![\\&\\<\\@\\[])(?!^)(?=\\p{space}*\\{)|(?=;|(?<!\\{)\\})|(?=\\n?$)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.function-result.cadence",
      patterns: [
        { include: "#type" }
      ]
    },
    initializer: {
      begin: /(?<!\.)\b(init)\p{space}*(?=[\(\<])/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.cadence" }
      },
      end: /(?<=\})|(?=\n?$)/dgv,
      name: "meta.definition.function.initializer.cadence",
      patterns: [
        { include: "#comments" },
        { include: "#parameter-clause" },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.function.begin.cadence" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.function.end.cadence" }
          },
          name: "meta.definition.function.body.cadence",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /(?<!\.)\bvar\b/dgv,
          name: "storage.type.var.cadence"
        },
        {
          match: /(?<!\.)\blet\b/dgv,
          name: "storage.type.let.cadence"
        },
        {
          begin: /(?<!\.)\b(entitlement)\p{space}+(mapping)\p{space}+([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}*(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.declaration.entitlement.cadence" },
            "2": { name: "keyword.other.mapping.cadence" },
            "3": { name: "entity.name.type.entitlement-mapping.cadence" },
            "4": { name: "punctuation.definition.type.begin.cadence" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.type.end.cadence" }
          },
          name: "meta.definition.entitlement-mapping.cadence",
          patterns: [
            { include: "#comments" },
            {
              match: /\binclude\b/dgv,
              name: "keyword.other.mapping.include.cadence"
            },
            {
              captures: {
                "1": { name: "entity.name.type.entitlement-mapping.cadence" }
              },
              match: /(?<=\binclude)\p{space}+([_\p{L}][\._\p{L}\p{N}\p{M}]*)/dgv
            },
            {
              match: /[_\p{L}][\._\p{L}\p{N}\p{M}]*/dgv,
              name: "entity.name.type.entitlement.cadence"
            },
            {
              match: /->/dgv,
              name: "punctuation.separator.mapping.cadence"
            }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.declaration.entitlement.cadence" },
            "2": { name: "entity.name.type.entitlement.cadence" }
          },
          match: /(?<!\.)\b(entitlement)\b\p{space}+([_\p{L}][_\p{L}\p{N}\p{M}]*)/dgv
        },
        {
          begin: /(?<!\.)\b(access)\b\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.access.cadence" },
            "2": { name: "punctuation.section.group.begin.cadence" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.group.end.cadence" }
          },
          name: "meta.access.modifier.cadence",
          patterns: [
            { include: "#comments" },
            {
              match: /\bmapping\b/dgv,
              name: "keyword.other.mapping.cadence"
            },
            {
              captures: {
                "1": { name: "entity.name.type.entitlement-mapping.cadence" }
              },
              match: /(?<=\bmapping)\p{space}+([_\p{L}][\._\p{L}\p{N}\p{M}]*)/dgv
            },
            {
              match: /\b(?:all|self|contract|account)\b/dgv,
              name: "constant.language.access.audience.cadence"
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.entitlement.cadence"
            },
            {
              match: /\|/dgv,
              name: "punctuation.separator.entitlement.cadence"
            },
            {
              match: /[_\p{L}][\._\p{L}\p{N}\p{M}]*/dgv,
              name: "entity.name.type.entitlement.cadence"
            }
          ]
        },
        {
          match: /(?<!\.)\b(?:if|else|switch|case|default)\b/dgv,
          name: "keyword.control.branch.cadence"
        },
        {
          match: /(?<!\.)\b(?:return|continue|break)\b/dgv,
          name: "keyword.control.transfer.cadence"
        },
        {
          match: /(?<!\.)\b(?:while|for|in)\b/dgv,
          name: "keyword.control.loop.cadence"
        },
        {
          match: /(?<!\.)\b(?:create|destroy|emit|attach|to|remove|from)\b/dgv,
          name: "keyword.other.cadence"
        },
        {
          match: /(?<!\.)\b(p(?:ub|riv))\b/dgv,
          name: "invalid.deprecated.keyword.cadence"
        },
        {
          match: /(?<!\.)\bview\b/dgv,
          name: "storage.modifier.view.cadence"
        },
        {
          match: /(?<!\.)\b(auth)\b/dgv,
          name: "keyword.other.auth.cadence"
        },
        {
          begin: /(?<!\.)\b(import)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.import.cadence" }
          },
          end: /(?=(?=\n?$)|\/\/|\/\*|;)/dgv,
          name: "meta.import.cadence",
          patterns: [
            {
              match: /\bfrom\b/dgv,
              name: "keyword.control.import.cadence"
            },
            { include: "#literals" },
            {
              match: /\b[_\p{L}][_\p{L}\p{N}\p{M}]*\b/dgv,
              name: "variable.other.readwrite.cadence"
            }
          ]
        }
      ]
    },
    "language-variables": {
      patterns: [
        {
          match: /\b(self)\b/dgv,
          name: "variable.language.cadence"
        }
      ]
    },
    literals: {
      patterns: [
        { include: "#boolean" },
        { include: "#numeric" },
        { include: "#string" },
        {
          match: /\bnil\b/dgv,
          name: "constant.language.nil.cadence"
        }
      ],
      repository: {
        boolean: {
          match: /\b(true|false)\b/dgv,
          name: "constant.language.boolean.cadence"
        },
        numeric: {
          patterns: [
            { include: "#binary" },
            { include: "#octal" },
            { include: "#hexadecimal" },
            { include: "#fixed-point" },
            { include: "#decimal" }
          ],
          repository: {
            binary: {
              match: /(\B-|\b)0b[01]([01_]*[01])?\b/dgv,
              name: "constant.numeric.integer.binary.cadence"
            },
            decimal: {
              match: /(\B-|\b)[0-9]([0-9_]*[0-9])?\b/dgv,
              name: "constant.numeric.integer.decimal.cadence"
            },
            "fixed-point": {
              match: /(\B-|\b)[0-9]([0-9_]*[0-9])?\.[0-9]([0-9_]*[0-9])?\b/dgv,
              name: "constant.numeric.float.cadence"
            },
            hexadecimal: {
              match: /(\B-|\b)0x\p{AHex}([_\p{AHex}]*\p{AHex})?\b/dgv,
              name: "constant.numeric.integer.hexadecimal.cadence"
            },
            octal: {
              match: /(\B-|\b)0o[0-7]([0-7_]*[0-7])?\b/dgv,
              name: "constant.numeric.integer.octal.cadence"
            }
          }
        },
        string: {
          patterns: [
            {
              begin: /"/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.string.begin.cadence" }
              },
              end: /"/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.string.end.cadence" }
              },
              name: "string.quoted.double.single-line.cadence",
              patterns: [
                {
                  match: /[\n\r]/dgv,
                  name: "invalid.illegal.returns-not-allowed.cadence"
                },
                {
                  begin: /\\\(/dgv,
                  beginCaptures: {
                    "0": { name: "punctuation.section.embedded.begin.cadence meta.embedded.cadence" }
                  },
                  contentName: "meta.embedded.line.cadence",
                  end: /\)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.embedded.end.cadence meta.embedded.cadence" }
                  },
                  name: "meta.interpolation.cadence",
                  patterns: [
                    {
                      begin: /\(/dgv,
                      beginCaptures: {
                        "0": { name: "punctuation.section.group.begin.cadence" }
                      },
                      end: /\)/dgv,
                      endCaptures: {
                        "0": { name: "punctuation.section.group.end.cadence" }
                      },
                      patterns: [
                        { include: "#expressions" }
                      ]
                    },
                    { include: "#expressions" }
                  ]
                },
                { include: "#string-guts" }
              ]
            }
          ],
          repository: {
            "string-guts": {
              patterns: [
                {
                  match: /\\["'0\\nrt]/dgv,
                  name: "constant.character.escape.cadence"
                },
                {
                  match: /\\u\{\p{AHex}{1,8}\}/dgv,
                  name: "constant.character.escape.unicode.cadence"
                }
              ]
            }
          }
        }
      }
    },
    operators: {
      patterns: [
        {
          match: /<->/dgv,
          name: "keyword.operator.swap.cadence"
        },
        {
          match: /\?\./dgv,
          name: "keyword.operator.optional.chain.cadence"
        },
        {
          begin: /\b(as(?:\?|!?))\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.type.cast.cadence" }
          },
          end: /(?=(?=\n?$)|;|\/\/|\/\\*|")|(?=[\)\,\}])|(?<=>)(?=\p{space}*\{(?!\p{space}*[_\p{L}][\._\p{L}\p{N}\p{M}]*\p{space}*:))|(?<=[\]\)\>\?\}\p{L}\p{N}])(?=\p{space}*\{(?!\p{space}*[_\p{L}][\._\p{L}\p{N}\p{M}]*\p{space}*:))|(?=\?\?)/dgv,
          name: "meta.type.cast-target.cadence",
          patterns: [
            {
              begin: /\{(?=\p{space}*[_\p{L}][\._\p{L}\p{N}\p{M}]*\p{space}*:)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.type.dictionary.begin.cadence" }
              },
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.type.dictionary.end.cadence" }
              },
              name: "meta.type.dictionary.cadence",
              patterns: [
                { include: "#comments" },
                { include: "#type" },
                {
                  match: /:/dgv,
                  name: "punctuation.separator.type.dictionary.cadence"
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.type.dictionary.cadence"
                }
              ]
            },
            { include: "#type" }
          ]
        },
        {
          match: /-/dgv,
          name: "keyword.operator.arithmetic.unary.cadence"
        },
        {
          match: /(?<=\))!/dgv,
          name: "keyword.operator.force-unwrap.cadence"
        },
        {
          match: /!/dgv,
          name: "keyword.operator.logical.not.cadence"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.cadence"
        },
        {
          match: /<-/dgv,
          name: "keyword.operator.move.cadence"
        },
        {
          match: /<-!/dgv,
          name: "keyword.operator.force-move.cadence"
        },
        {
          match: /[\-\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.cadence"
        },
        {
          match: /%/dgv,
          name: "keyword.operator.arithmetic.remainder.cadence"
        },
        {
          match: />>/dgv,
          name: "keyword.operator.bitwise.shift.cadence"
        },
        {
          match: /<</dgv,
          name: "keyword.operator.bitwise.shift.cadence"
        },
        {
          match: /==|!=|[\<\>]|>=|<=/dgv,
          name: "keyword.operator.comparison.cadence"
        },
        {
          match: /\?\?/dgv,
          name: "keyword.operator.coalescing.cadence"
        },
        {
          match: /&&|\|\|/dgv,
          name: "keyword.operator.logical.cadence"
        },
        {
          match: /[\!\?]/dgv,
          name: "keyword.operator.type.optional.cadence"
        }
      ]
    },
    "parameter-clause": {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.parameters.begin.cadence" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.parameters.end.cadence" }
      },
      name: "meta.parameter-clause.cadence",
      patterns: [
        { include: "#comments" },
        { include: "#parameter-list" }
      ]
    },
    "parameter-list": {
      patterns: [
        { include: "#comments" },
        {
          captures: {
            "1": { name: "keyword.operator.unnamed-parameter.cadence" },
            "2": { name: "variable.parameter.cadence" }
          },
          match: /(_)\p{space}+([_\p{L}][_\p{L}\p{N}\p{M}]*)(?=\p{space}*:)/dgv
        },
        {
          captures: {
            "1": { name: "entity.name.label.cadence" },
            "2": { name: "variable.parameter.cadence" }
          },
          match: /([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}+([_\p{L}][_\p{L}\p{N}\p{M}]*)(?=\p{space}*:)/dgv
        },
        {
          captures: {
            "1": { name: "variable.parameter.cadence" }
          },
          match: /([_\p{L}][_\p{L}\p{N}\p{M}]*)(?=\p{space}*:)/dgv
        },
        {
          begin: /:\p{space}*(?!\p{space})/dgv,
          end: /(?=[\)\,])/dgv,
          patterns: [
            { include: "#type" },
            {
              match: /:/dgv,
              name: "invalid.illegal.extra-colon-in-parameter-list.cadence"
            }
          ]
        }
      ]
    },
    "path-literals": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.path.cadence" },
            "2": { name: "constant.other.path.cadence" }
          },
          match: /(\/)((storage|public)(\/[_\p{L}][_\p{L}\p{N}\p{M}]*)?)/dgv
        }
      ]
    },
    "pre-post": {
      begin: /(?<!\.)\b(p(?:re|ost))\b\p{space}*(?=\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.phase.cadence" }
      },
      end: /(?<=\})/dgv,
      name: "meta.definition.transaction.phase.cadence",
      patterns: [
        { include: "#comments" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.phase.begin.cadence" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.phase.end.cadence" }
          },
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "prepare-execute": {
      begin: /(?<!\.)\b(prepare)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.phase.cadence" }
      },
      end: /(?<=\})/dgv,
      name: "meta.definition.transaction.phase.cadence",
      patterns: [
        { include: "#comments" },
        { include: "#parameter-clause" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.phase.begin.cadence" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.phase.end.cadence" }
          },
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    transaction: {
      begin: /\b(transaction)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.type.transaction.cadence" }
      },
      end: /(?<=\))|(?<=\})/dgv,
      name: "meta.definition.transaction.cadence",
      patterns: [
        { include: "#comments" },
        { include: "#parameter-clause" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.transaction.begin.cadence" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.transaction.end.cadence" }
          },
          name: "meta.definition.transaction.body.cadence",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    type: {
      patterns: [
        {
          begin: /(?<!\.)\b(?:(view)\p{space}+)?(fun)\b\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.view.cadence" },
            "2": { name: "storage.type.function.cadence" },
            "3": { name: "punctuation.definition.parameters.begin.cadence" }
          },
          end: /(?=[\]\)\,\>\}]|(?=\n?$))/dgv,
          name: "meta.type.function.cadence",
          patterns: [
            { include: "#comments" },
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: /(\))/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.parameters.end.cadence" }
              },
              patterns: [
                { include: "#type" },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.parameter.cadence"
                }
              ]
            },
            {
              begin: /(:)/dgv,
              beginCaptures: {
                "1": { name: "keyword.operator.function-result.cadence" }
              },
              end: /(?=[\]\)\,\>\}]|(?=\n?$))/dgv,
              name: "meta.function-result.cadence",
              patterns: [
                { include: "#type" }
              ]
            }
          ]
        },
        { include: "#comments" },
        {
          begin: /(?<!\.)([_\p{L}][_\p{L}\p{N}\p{M}]*)\p{space}*(<)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.type.cadence" },
            "2": { name: "punctuation.definition.type-arguments.begin.cadence" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.type-arguments.end.cadence" }
          },
          name: "meta.type.arguments.cadence",
          patterns: [
            { include: "#type" },
            {
              match: /,/dgv,
              name: "punctuation.separator.type-argument.cadence"
            }
          ]
        },
        {
          begin: /(?<!\.)\b(auth)\b\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.auth.cadence" },
            "2": { name: "punctuation.section.group.begin.cadence" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.group.end.cadence" }
          },
          name: "meta.auth.entitlements.cadence",
          patterns: [
            { include: "#comments" },
            {
              match: /\bmapping\b/dgv,
              name: "keyword.other.mapping.cadence"
            },
            {
              captures: {
                "1": { name: "entity.name.type.entitlement-mapping.cadence" }
              },
              match: /(?<=\bmapping)\p{space}+([_\p{L}][\._\p{L}\p{N}\p{M}]*)/dgv
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.entitlement.cadence"
            },
            {
              match: /\|/dgv,
              name: "punctuation.separator.entitlement.cadence"
            },
            {
              match: /[_\p{L}][\._\p{L}\p{N}\p{M}]*/dgv,
              name: "entity.name.type.entitlement.cadence"
            }
          ]
        },
        {
          begin: /\{(?![^\}]*:)(?![^\n]*\}\p{space}*\()/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.type.intersection.begin.cadence" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.type.intersection.end.cadence" }
          },
          patterns: [
            { include: "#comments" },
            { include: "#type" },
            {
              match: /,/dgv,
              name: "punctuation.separator.type.intersection.cadence"
            }
          ]
        },
        {
          begin: /\{(?=\p{space}*[_\p{L}][\._\p{L}\p{N}\p{M}]*\p{space}*:)(?![^\n]*\}\p{space}*\()/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.type.dictionary.begin.cadence" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.type.dictionary.end.cadence" }
          },
          name: "meta.type.dictionary.cadence",
          patterns: [
            { include: "#comments" },
            { include: "#type" },
            {
              match: /:/dgv,
              name: "punctuation.separator.type.dictionary.cadence"
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.type.dictionary.cadence"
            }
          ]
        },
        {
          begin: /\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.type.array.begin.cadence" }
          },
          end: /(\])/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.type.array.end.cadence" }
          },
          name: "meta.type.array.cadence",
          patterns: [
            { include: "#comments" },
            { include: "#type" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.type.reference.cadence" }
          },
          match: /([\&\@])(?=\p{space}*\{)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.definition.type.reference.cadence" },
            "2": { name: "entity.name.type.cadence" }
          },
          match: /([\&\@])\p{space}*([_\p{L}][\._\p{L}\p{N}\p{M}]*)/dgv
        },
        {
          match: /([_\p{L}][_\p{L}\p{N}\p{M}]*)/dgv,
          name: "entity.name.type.cadence"
        },
        {
          match: /[\!\?]/dgv,
          name: "keyword.operator.type.optional.cadence"
        }
      ]
    },
    "var-let-declaration": {
      begin: /\b(var|let)\b\p{space}+([_\p{L}][_\p{L}\p{N}\p{M}]*)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.$1.cadence" },
        "2": { name: "variable.other.declaration.cadence" }
      },
      end: /=|<-!??|;|(?=\/\/)|(?=\n?$)/dgv,
      patterns: [
        { include: "#comments" },
        {
          begin: /:\p{space}*(?!\p{space})/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.type.annotation.cadence" }
          },
          end: /(?=\/\/|=|<-!??|;|(?=\n?$))/dgv,
          patterns: [
            { include: "#type" },
            { include: "#comments" }
          ]
        }
      ]
    }
  },
  dependencies: []
};
