import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "svelte",
  displayName: "Svelte",
  scopeName: "source.svelte",
  patterns: [
    { include: "#scope" }
  ],
  repository: {
    attributes: {
      patterns: [
        { include: "#attributes-comments" },
        { include: "#attributes-directives" },
        { include: "#attributes-keyvalue" },
        { include: "#attributes-attach" },
        { include: "#attributes-interpolated" }
      ]
    },
    "attributes-attach": {
      begin: /(?<![\:\=])\p{space}*(\{@attach\p{space})/dgv,
      captures: {
        "1": { name: "entity.other.attribute-name.svelte" }
      },
      contentName: "meta.embedded.expression.svelte source.ts",
      end: /(\})/dgv,
      patterns: [
        { include: "source.ts" }
      ]
    },
    "attributes-comments": {
      patterns: [
        {
          match: /\/\/[^\n]*(?=\n?$)/dgv,
          name: "comment.line.double-slash.svelte"
        },
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.svelte"
        }
      ]
    },
    "attributes-directives": {
      begin: /(?<!<)(on|use|bind|transition|in|out|animate|let|class|style)(:)(?:((?:--)?[\$_\p{Alpha}][\-\$_\p{Alpha}\p{Nd}]*(?=\p{space}*=))|((?:--)?[\$_\p{Alpha}][\-\$_\p{Alpha}\p{Nd}]*))((\|[\p{L}\p{M}\p{N}\p{Pc}]+)*)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#attributes-directives-keywords" }
          ]
        },
        "2": { name: "punctuation.definition.keyword.svelte" },
        "3": {
          patterns: [
            { include: "#attributes-directives-types-assigned" }
          ]
        },
        "4": {
          patterns: [
            { include: "#attributes-directives-types" }
          ]
        },
        "5": {
          patterns: [
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "support.function.svelte"
            },
            {
              match: /\|/dgv,
              name: "punctuation.separator.svelte"
            }
          ]
        }
      },
      end: new EmulatedRegExp("(?=(?:(?=(\\p{space}*))\\1)[^\\=\\p{space}])", "dgv", { hiddenCaptures: [1] }),
      name: "meta.directive.$1.svelte",
      patterns: [
        {
          begin: /=/dgv,
          beginCaptures: {
            "0": { name: "punctuation.separator.key-value.svelte" }
          },
          end: /(?<=[^\=\p{space}])(?!\p{space}*=)|(?=\/?>)/dgv,
          patterns: [
            { include: "#attributes-value" }
          ]
        }
      ]
    },
    "attributes-directives-keywords": {
      patterns: [
        {
          match: /on|use|bind/dgv,
          name: "keyword.control.svelte"
        },
        {
          match: /transition|in|out|animate/dgv,
          name: "keyword.other.animation.svelte"
        },
        {
          match: /let/dgv,
          name: "storage.type.svelte"
        },
        {
          match: /class|style/dgv,
          name: "entity.other.attribute-name.svelte"
        }
      ]
    },
    "attributes-directives-types": {
      patterns: [
        {
          match: /(?<=(on):)[^\n]*(?=\n?$)/dgv,
          name: "entity.name.type.svelte"
        },
        {
          match: /(?<=(bind):)[^\n]*(?=\n?$)/dgv,
          name: "variable.parameter.svelte"
        },
        {
          match: /(?<=(use|transition|in|out|animate):)[^\n]*(?=\n?$)/dgv,
          name: "variable.function.svelte"
        },
        {
          match: /(?<=(let|class|style):)[^\n]*(?=\n?$)/dgv,
          name: "variable.parameter.svelte"
        }
      ]
    },
    "attributes-directives-types-assigned": {
      patterns: [
        {
          match: /(?<=(bind):)this(?=\n?$)/dgv,
          name: "variable.language.svelte"
        },
        {
          match: /(?<=(bind):)[^\n]*(?=\n?$)/dgv,
          name: "entity.name.type.svelte"
        },
        {
          match: /(?<=(class):)[^\n]*(?=\n?$)/dgv,
          name: "entity.other.attribute-name.class.svelte"
        },
        {
          match: /(?<=(style):)[^\n]*(?=\n?$)/dgv,
          name: "support.type.property-name.svelte"
        },
        { include: "#attributes-directives-types" }
      ]
    },
    "attributes-generics": {
      begin: /(generics)(=)(["'])/dgv,
      beginCaptures: {
        "1": { name: "entity.other.attribute-name.svelte" },
        "2": { name: "punctuation.separator.key-value.svelte" },
        "3": { name: "punctuation.definition.string.begin.svelte" }
      },
      contentName: "meta.embedded.expression.svelte source.ts",
      end: /(3)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.svelte" }
      },
      patterns: [
        { include: "#type-parameters" }
      ]
    },
    "attributes-interpolated": {
      begin: /(?<![\:\=])\p{space}*(\{)/dgv,
      captures: {
        "1": { name: "entity.other.attribute-name.svelte" }
      },
      contentName: "meta.embedded.expression.svelte source.ts",
      end: /(\})/dgv,
      patterns: [
        { include: "source.ts" }
      ]
    },
    "attributes-keyvalue": {
      begin: /((?:--)?[\$_\p{Alpha}][\-\$_\p{Alpha}\p{Nd}]*)/dgv,
      beginCaptures: {
        "0": {
          patterns: [
            {
              match: /--[^\n]*/dgv,
              name: "support.type.property-name.svelte"
            },
            {
              match: /[^\n]*/dgv,
              name: "entity.other.attribute-name.svelte"
            }
          ]
        }
      },
      end: new EmulatedRegExp("(?=(?:(?=(\\p{space}*))\\1)[^\\=\\p{space}])", "dgv", { hiddenCaptures: [1] }),
      name: "meta.attribute.$1.svelte",
      patterns: [
        {
          begin: /=/dgv,
          beginCaptures: {
            "0": { name: "punctuation.separator.key-value.svelte" }
          },
          end: /(?<=[^\=\p{space}])(?!\p{space}*=)|(?=\/?>)/dgv,
          patterns: [
            { include: "#attributes-value" }
          ]
        }
      ]
    },
    "attributes-value": {
      patterns: [
        { include: "#interpolation" },
        {
          captures: {
            "1": { name: "punctuation.definition.string.begin.svelte" },
            "2": { name: "constant.numeric.decimal.svelte" },
            "3": { name: "punctuation.definition.string.end.svelte" },
            "4": { name: "constant.numeric.decimal.svelte" }
          },
          match: /(["'])([\.0-9_]+[\%\p{L}\p{M}\p{N}\p{Pc}]{0,4})(\1)|([\.0-9_]+[\%\p{L}\p{M}\p{N}\p{Pc}]{0,4})(?=\p{space}|\/?>)/dgv
        },
        {
          match: /([^"'\/\<\=\>\`\p{space}]|\/(?!>))+/dgv,
          name: "string.unquoted.svelte",
          patterns: [
            { include: "#interpolation" }
          ]
        },
        {
          begin: /(["'])/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.svelte" }
          },
          end: /1/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.svelte" }
          },
          name: "string.quoted.svelte",
          patterns: [
            { include: "#interpolation" }
          ]
        }
      ]
    },
    comments: {
      begin: /<!--/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.svelte" }
      },
      end: /-->/dgv,
      name: "comment.block.svelte",
      patterns: [
        {
          begin: /(@)(component)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.keyword.svelte" },
            "2": { name: "storage.type.class.component.svelte keyword.declaration.class.component.svelte" }
          },
          contentName: "comment.block.documentation.svelte",
          end: /(?=-->)/dgv,
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    { include: "text.html.markdown" }
                  ]
                }
              },
              match: /[^\n]*?(?=-->)/dgv
            },
            { include: "text.html.markdown" }
          ]
        },
        {
          match: {
            G: [/￿-?>|<!--(?!>)|<!-(?=-->)|--!>/dgv, new EmulatedRegExp("^-?>|<!--(?!>)|<!-(?=-->)|--!>", "dgv", { strategy: "clip_search" })]
          },
          name: "invalid.illegal.characters-not-allowed-here.svelte"
        }
      ]
    },
    destructuring: {
      patterns: [
        {
          begin: /(?=\{)/dgv,
          end: /(?<=\})/dgv,
          name: "meta.embedded.expression.svelte source.ts",
          patterns: [
            { include: "source.ts#object-binding-pattern" }
          ]
        },
        {
          begin: /(?=\[)/dgv,
          end: /(?<=\])/dgv,
          name: "meta.embedded.expression.svelte source.ts",
          patterns: [
            { include: "source.ts#array-binding-pattern" }
          ]
        }
      ]
    },
    "destructuring-const": {
      patterns: [
        {
          begin: /(?=\{)/dgv,
          end: /(?<=\})/dgv,
          name: "meta.embedded.expression.svelte source.ts",
          patterns: [
            { include: "source.ts#object-binding-pattern-const" }
          ]
        },
        {
          begin: /(?=\[)/dgv,
          end: /(?<=\])/dgv,
          name: "meta.embedded.expression.svelte source.ts",
          patterns: [
            { include: "source.ts#array-binding-pattern-const" }
          ]
        }
      ]
    },
    interpolation: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.svelte" }
          },
          contentName: "meta.embedded.expression.svelte source.ts",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.svelte" }
          },
          patterns: [
            {
              begin: {
                G: [/￿\p{space}*(?=\{)/dgv, /\p{space}*(?=\{)/dgvy]
              },
              end: /(?<=\})/dgv,
              patterns: [
                { include: "source.ts#object-literal" }
              ]
            },
            { include: "source.ts" }
          ]
        }
      ]
    },
    scope: {
      patterns: [
        { include: "#comments" },
        { include: "#special-tags" },
        { include: "#tags" },
        { include: "#interpolation" },
        {
          begin: /(?<=[\>\}])/dgv,
          end: /(?=[\<\{])/dgv,
          name: "text.svelte"
        }
      ]
    },
    "special-tags": {
      patterns: [
        { include: "#special-tags-void" },
        { include: "#special-tags-block-begin" },
        { include: "#special-tags-block-end" }
      ]
    },
    "special-tags-block-begin": {
      begin: /(\{)\p{space}*(#([a-z]*))/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.block.begin.svelte" },
        "2": {
          patterns: [
            { include: "#special-tags-keywords" }
          ]
        }
      },
      end: /(\})/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.end.svelte" }
      },
      name: "meta.special.$3.svelte meta.special.start.svelte",
      patterns: [
        { include: "#special-tags-modes" }
      ]
    },
    "special-tags-block-end": {
      begin: /(\{)\p{space}*(\/(?![\*\/])([a-z]*))/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.block.begin.svelte" },
        "2": {
          patterns: [
            { include: "#special-tags-keywords" }
          ]
        }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.block.end.svelte" }
      },
      name: "meta.special.$3.svelte meta.special.end.svelte"
    },
    "special-tags-keywords": {
      captures: {
        "1": { name: "punctuation.definition.keyword.svelte" },
        "2": {
          patterns: [
            {
              match: /if|else\p{space}+if|else/dgv,
              name: "keyword.control.conditional.svelte"
            },
            {
              match: /each|key/dgv,
              name: "keyword.control.svelte"
            },
            {
              match: /await|then|catch/dgv,
              name: "keyword.control.flow.svelte"
            },
            {
              match: /snippet/dgv,
              name: "keyword.control.svelte"
            },
            {
              match: /html/dgv,
              name: "keyword.other.svelte"
            },
            {
              match: /render/dgv,
              name: "keyword.other.svelte"
            },
            {
              match: /debug/dgv,
              name: "keyword.other.debugger.svelte"
            },
            {
              match: /const/dgv,
              name: "storage.type.svelte"
            }
          ]
        }
      },
      match: /([\#\/\:\@])(else\p{space}+if|[a-z]*)/dgv
    },
    "special-tags-modes": {
      patterns: [
        {
          begin: {
            G: [/(?<=(if|key|then|catch|html|render)[^\n]*?)￿/dgv, /(?<=(if|key|then|catch|html|render)[^\n]*?)/dgvy]
          },
          end: /(?=\})/dgv,
          name: "meta.embedded.expression.svelte source.ts",
          patterns: [
            { include: "source.ts" }
          ]
        },
        {
          begin: {
            G: [/(?<=snippet[^\n]*?)￿/dgv, /(?<=snippet[^\n]*?)/dgvy]
          },
          end: /(?=\})/dgv,
          name: "meta.embedded.expression.svelte source.ts",
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.function.ts" }
              },
              match: {
                G: [/￿\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?=<)/dgv, /\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?=<)/dgvy]
              }
            },
            {
              begin: /(?<=<)/dgv,
              contentName: "meta.type.parameters.ts",
              end: /(?=>)/dgv,
              patterns: [
                { include: "source.ts" }
              ]
            },
            {
              begin: /(?<=>\p{space}*\()/dgv,
              end: /(?=\})/dgv,
              name: "meta.embedded.expression.svelte source.ts",
              patterns: [
                { include: "source.ts" }
              ]
            },
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: /(?=\})/dgv,
              name: "meta.embedded.expression.svelte source.ts",
              patterns: [
                { include: "source.ts" }
              ]
            }
          ]
        },
        {
          begin: {
            G: [/(?<=const[^\n]*?)￿/dgv, /(?<=const[^\n]*?)/dgvy]
          },
          end: /(?=\})/dgv,
          patterns: [
            { include: "#destructuring-const" },
            {
              begin: {
                G: [/￿\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]+)\p{space}*/dgv, /\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]+)\p{space}*/dgvy]
              },
              beginCaptures: {
                "1": { name: "variable.other.constant.svelte" }
              },
              end: /(?=[\:\=])/dgv
            },
            {
              begin: /(?=:)/dgv,
              end: /(?==)/dgv,
              name: "meta.type.annotation.svelte",
              patterns: [
                { include: "source.ts" }
              ]
            },
            {
              begin: /(?==)/dgv,
              end: /(?=\})/dgv,
              name: "meta.embedded.expression.svelte source.ts",
              patterns: [
                { include: "source.ts" }
              ]
            }
          ]
        },
        {
          begin: {
            G: [/(?<=each[^\n]*?)￿/dgv, /(?<=each[^\n]*?)/dgvy]
          },
          end: /(?=\})/dgv,
          patterns: [
            {
              begin: {
                G: [/￿\p{space}*?(?=\P{space})/dgv, /\p{space}*?(?=\P{space})/dgvy]
              },
              contentName: "meta.embedded.expression.svelte source.ts",
              end: /(?=(?:^\p{space}*|\p{space}+)(as)|\p{space}*([\,\}]))/dgv,
              patterns: [
                { include: "source.ts" }
              ]
            },
            {
              begin: /(as)|(?=[\,\}])/dgv,
              beginCaptures: {
                "1": { name: "keyword.control.as.svelte" }
              },
              end: /(?=\})/dgv,
              patterns: [
                { include: "#destructuring" },
                {
                  begin: /\(/dgv,
                  captures: {
                    "0": { name: "meta.brace.round.svelte" }
                  },
                  contentName: "meta.embedded.expression.svelte source.ts",
                  end: /\)|(?=\})/dgv,
                  patterns: [
                    { include: "source.ts" }
                  ]
                },
                {
                  captures: {
                    "1": {
                      name: "meta.embedded.expression.svelte source.ts",
                      patterns: [
                        { include: "source.ts" }
                      ]
                    }
                  },
                  match: /(\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*)/dgv
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.svelte"
                }
              ]
            }
          ]
        },
        {
          begin: {
            G: [/(?<=await[^\n]*?)￿/dgv, /(?<=await[^\n]*?)/dgvy]
          },
          end: /(?=\})/dgv,
          patterns: [
            {
              begin: {
                G: [/￿\p{space}*?(?=\P{space})/dgv, /\p{space}*?(?=\P{space})/dgvy]
              },
              contentName: "meta.embedded.expression.svelte source.ts",
              end: /\p{space}+(then)|(?=\})/dgv,
              endCaptures: {
                "1": { name: "keyword.control.flow.svelte" }
              },
              patterns: [
                { include: "source.ts" }
              ]
            },
            {
              begin: /(?<=then\b)/dgv,
              contentName: "meta.embedded.expression.svelte source.ts",
              end: /(?=\})/dgv,
              patterns: [
                { include: "source.ts" }
              ]
            }
          ]
        },
        {
          begin: {
            G: [/(?<=debug[^\n]*?)￿/dgv, /(?<=debug[^\n]*?)/dgvy]
          },
          end: /(?=\})/dgv,
          patterns: [
            {
              captures: {
                "0": {
                  name: "meta.embedded.expression.svelte source.ts",
                  patterns: [
                    { include: "source.ts" }
                  ]
                }
              },
              match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.svelte"
            }
          ]
        }
      ]
    },
    "special-tags-void": {
      begin: /(\{)\p{space}*([\:\@](else\p{space}+if|[a-z]*))/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.block.begin.svelte" },
        "2": {
          patterns: [
            { include: "#special-tags-keywords" }
          ]
        }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.end.svelte" }
      },
      name: "meta.special.$3.svelte",
      patterns: [
        { include: "#special-tags-modes" }
      ]
    },
    tags: {
      patterns: [
        { include: "#tags-lang" },
        { include: "#tags-void" },
        { include: "#tags-general-end" },
        { include: "#tags-general-start" }
      ]
    },
    "tags-end-node": {
      captures: {
        "1": { name: "meta.tag.end.svelte punctuation.definition.tag.begin.svelte" },
        "2": {
          name: "meta.tag.end.svelte",
          patterns: [
            { include: "#tags-name" }
          ]
        },
        "3": { name: "meta.tag.end.svelte punctuation.definition.tag.end.svelte" },
        "4": { name: "meta.tag.start.svelte punctuation.definition.tag.end.svelte" }
      },
      match: /(<\/)([^\n]*?)\p{space}*(>)|(\/>)/dgv
    },
    "tags-general-end": {
      begin: /(<\/)([^\/\>\p{space}]*)/dgv,
      beginCaptures: {
        "1": { name: "meta.tag.end.svelte punctuation.definition.tag.begin.svelte" },
        "2": {
          name: "meta.tag.end.svelte",
          patterns: [
            { include: "#tags-name" }
          ]
        }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": { name: "meta.tag.end.svelte punctuation.definition.tag.end.svelte" }
      },
      name: "meta.scope.tag.$2.svelte"
    },
    "tags-general-start": {
      begin: /(<)([^\/\>\p{space}]*)/dgv,
      beginCaptures: {
        "0": {
          patterns: [
            { include: "#tags-start-node" }
          ]
        }
      },
      end: /(\/?>)/dgv,
      endCaptures: {
        "1": { name: "meta.tag.start.svelte punctuation.definition.tag.end.svelte" }
      },
      name: "meta.scope.tag.$2.svelte",
      patterns: [
        { include: "#tags-start-attributes" }
      ]
    },
    "tags-lang": {
      begin: /<(script|style|template)/dgv,
      beginCaptures: {
        "0": {
          patterns: [
            { include: "#tags-start-node" }
          ]
        }
      },
      end: /<\/1\p{space}*>|\/>/dgv,
      endCaptures: {
        "0": {
          patterns: [
            { include: "#tags-end-node" }
          ]
        }
      },
      name: "meta.$1.svelte",
      patterns: [
        {
          begin: {
            G: [/￿(?=\p{space}*[^\>]*?(type|lang)\p{space}*=\p{space}*(["']?)(?:text\/)?([\p{L}\p{M}\p{N}\p{Pc}]+)\2)/dgv, /(?=\p{space}*[^\>]*?(type|lang)\p{space}*=\p{space}*(["']?)(?:text\/)?([\p{L}\p{M}\p{N}\p{Pc}]+)\2)/dgvy]
          },
          end: /(?=<\/|\/>)/dgv,
          name: "meta.lang.$3.svelte",
          patterns: [
            { include: "#tags-lang-start-attributes" }
          ]
        },
        { include: "#tags-lang-start-attributes" }
      ]
    },
    "tags-lang-start-attributes": {
      begin: {
        G: [/￿/dgv, /(?:)/dgv]
      },
      end: /(?=\/>)|>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.svelte" }
      },
      name: "meta.tag.start.svelte",
      patterns: [
        { include: "#attributes-generics" },
        { include: "#attributes" }
      ]
    },
    "tags-name": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.svelte" },
            "2": { name: "punctuation.definition.keyword.svelte" },
            "3": { name: "entity.name.tag.svelte" }
          },
          match: /(svelte)(:)([a-z][\-\:\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
        },
        {
          match: /slot/dgv,
          name: "keyword.control.svelte"
        },
        {
          captures: {
            "1": {
              patterns: [
                {
                  match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
                  name: "support.class.component.svelte"
                },
                {
                  match: /\./dgv,
                  name: "punctuation.definition.keyword.svelte"
                }
              ]
            },
            "2": { name: "support.class.component.svelte" }
          },
          match: /([\p{L}\p{M}\p{N}\p{Pc}]+(?:\.[\p{L}\p{M}\p{N}\p{Pc}]+)+)|([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
        },
        {
          match: /[a-z][0-\:\p{L}\p{M}\p{N}\p{Pc}]*-[\-0-\:\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "meta.tag.custom.svelte entity.name.tag.svelte"
        },
        {
          match: /[a-z][\-0-\:\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "entity.name.tag.svelte"
        }
      ]
    },
    "tags-start-attributes": {
      begin: {
        G: [/￿/dgv, /(?:)/dgv]
      },
      end: /(?=\/?>)/dgv,
      name: "meta.tag.start.svelte",
      patterns: [
        { include: "#attributes" }
      ]
    },
    "tags-start-node": {
      captures: {
        "1": { name: "punctuation.definition.tag.begin.svelte" },
        "2": {
          patterns: [
            { include: "#tags-name" }
          ]
        }
      },
      match: /(<)([^\/\>\p{space}]*)/dgv,
      name: "meta.tag.start.svelte"
    },
    "tags-void": {
      begin: /(<)(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(?=\p{space}|\/?>)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.svelte" },
        "2": { name: "entity.name.tag.svelte" }
      },
      end: /\/?>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.begin.svelte" }
      },
      name: "meta.tag.void.svelte",
      patterns: [
        { include: "#attributes" }
      ]
    },
    "type-parameters": {
      name: "meta.type.parameters.ts",
      patterns: [
        { include: "source.ts#comment" },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(extends|in|out|const)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "storage.modifier.ts"
        },
        { include: "source.ts#type" },
        { include: "source.ts#punctuation-comma" },
        {
          match: /(=)(?!>)/dgv,
          name: "keyword.operator.assignment.ts"
        }
      ]
    }
  },
  injections: {
    "L:(meta.script.svelte | meta.style.svelte) (meta.lang.js | meta.lang.javascript) - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.js",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.js" }
          ]
        }
      ]
    },
    "L:(meta.script.svelte | meta.style.svelte) (meta.lang.ts | meta.lang.typescript) - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?=[^\n]+<\/(s(?:cript|tyle))[\>\p{space}])/dgv,
          contentName: "source.ts",
          end: /(?=<\/(s(?:cript|tyle))[\>\p{space}])/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.ts" }
          ]
        },
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.ts",
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.ts" }
          ],
          while: /^(?!\p{space}*<\/(s(?:cript|tyle))[\>\p{space}])/dgv
        }
      ]
    },
    "L:(meta.script.svelte | meta.style.svelte) meta.lang.coffee - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.coffee",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.coffee" }
          ]
        }
      ]
    },
    "L:(source.ts, source.js, source.coffee)": {
      patterns: [
        {
          match: /(?<!["\$'\.\/_\p{Alpha}\p{Nd}])\$(?=[_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          name: "punctuation.definition.variable.svelte"
        },
        {
          match: /(?<!["\$'\.\/_\p{Alpha}\p{Nd}])(\$\$)(?=props|restProps|slots)/dgv,
          name: "punctuation.definition.variable.svelte"
        }
      ]
    },
    "L:meta.script.svelte - meta.lang - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.js",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.js" }
          ]
        }
      ]
    },
    "L:meta.style.svelte - meta.lang - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.css",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.css" }
          ]
        }
      ]
    },
    "L:meta.style.svelte meta.lang.css - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.css",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.css" }
          ]
        }
      ]
    },
    "L:meta.style.svelte meta.lang.less - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.css.less",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.css.less" }
          ]
        }
      ]
    },
    "L:meta.style.svelte meta.lang.postcss - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.css.postcss",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.css.postcss" }
          ]
        }
      ]
    },
    "L:meta.style.svelte meta.lang.sass - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.sass",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.sass" }
          ]
        }
      ]
    },
    "L:meta.style.svelte meta.lang.scss - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.css.scss",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.css.scss" }
          ]
        }
      ]
    },
    "L:meta.style.svelte meta.lang.stylus - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "source.stylus",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "source.stylus" }
          ]
        }
      ]
    },
    "L:meta.template.svelte - meta.lang - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)\p{space}/dgv,
          end: /(?=<\/template)/dgv,
          patterns: [
            { include: "#scope" }
          ]
        }
      ]
    },
    "L:meta.template.svelte meta.lang.pug - (meta source)": {
      patterns: [
        {
          begin: /(?<=>)(?!<\/)/dgv,
          contentName: "text.pug",
          end: /(?=<\/)/dgv,
          name: "meta.embedded.block.svelte",
          patterns: [
            { include: "text.pug" }
          ]
        }
      ]
    }
  },
  dependencies: [
    "javascript",
    "typescript",
    "css",
    "postcss"
  ]
};
