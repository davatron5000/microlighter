import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "ahk2",
  displayName: "AutoHotkey2",
  scopeName: "source.ahk2",
  patterns: [
    { include: "#comments" },
    { include: "#hotkey_hotstring" },
    { include: "#switch_statement" },
    { include: "#object_property" },
    { include: "#reserved" },
    { include: "#numbers" },
    { include: "#operators" },
    { include: "#strings" },
    { include: "#pre_definition" },
    { include: "#class_block" },
    { include: "#block" },
    { include: "#continuation_section" },
    { include: "#parens" },
    { include: "#function_call" },
    { include: "#property" },
    { include: "#variables" }
  ],
  repository: {
    block: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.block.begin.ahk2" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.ahk2" }
          },
          patterns: [
            { include: "#block_innards" }
          ]
        }
      ]
    },
    block_innards: {
      patterns: [
        { include: "#object_property" },
        {
          begin: new EmulatedRegExp("(?=[\\t ])(?<!else|return)(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])[\\t ]+(and|not|or|xor)((?:(?=((?:[_\\p{Alpha}](?:(?=([_\\p{Alpha}\\p{Nd}]*))\\4)|::)+))\\3)|(?<=operator)(?:[\\-\\!\\&\\*\\+\\<\\=\\>]+|\\(\\)|\\[\\]))[\\t ]*(\\()", "dgv", { hiddenCaptures: [3, 4] }),
          beginCaptures: {
            "1": { name: "variable.other.ahk2" },
            "2": { name: "punctuation.section.parens.begin.bracket.round.initialization.ahk2" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.parens.end.bracket.round.initialization.ahk2" }
          },
          name: "meta.initialization.ahk2",
          patterns: [
            { include: "$base" }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.block.begin.ahk2" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.ahk2" }
          },
          patterns: [
            { include: "#block_innards" }
          ]
        },
        { include: "$base" }
      ]
    },
    brackets: {
      patterns: [
        {
          match: /^\p{space}*\*\p{space}+/dgv,
          name: "comment.block.ahk2"
        },
        {
          match: /(["'])(`\1|[^\n](?<!\1))*\1/dgv,
          name: "string.quoted.ahk2"
        },
        {
          begin: /\{/dgv,
          end: /\}|(?=\*\/)/dgv,
          patterns: [
            { include: "#brackets" }
          ]
        },
        {
          begin: /\[/dgv,
          end: /\]|(?=\*\/)/dgv,
          patterns: [
            { include: "#brackets" }
          ]
        }
      ]
    },
    case_statement: {
      begin: /(?<=^[\t ]*\{?[\t ]*)(case)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.case.ahk2" }
      },
      end: /(:)/dgv,
      endCaptures: {
        "1": { name: "punctuation.separator.colon.case.ahk2" }
      },
      name: "meta.conditional.case.ahk2",
      patterns: [
        { include: "#strings" },
        { include: "#numbers" },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.ahk2"
        },
        {
          match: /\.(?=[\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "punctuation.accessor.ahk2"
        },
        { include: "#function_call" },
        {
          match: /\{/dgv,
          name: "punctuation.section.block.begin.ahk2"
        },
        {
          match: /\}/dgv,
          name: "punctuation.section.block.end.ahk2"
        },
        {
          match: /[\(\[]/dgv,
          name: "punctuation.section.parens.begin.ahk2"
        },
        {
          match: /[\]\)]/dgv,
          name: "punctuation.section.parens.end.ahk2"
        },
        { include: "#operators" },
        { include: "#variables" },
        { include: "#comments" }
      ]
    },
    class_block: {
      applyEndPatternLast: 1,
      begin: /(?<=^([\t ]*\*\/)?[\t ]*(?:export[\t ]+(default[\t ]+)?)?)(class|struct)[\t ]+(\$?[\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv,
      beginCaptures: {
        "3": { name: "storage.type.class.ahk2" },
        "4": { name: "entity.name.type.class.ahk2" }
      },
      end: /(\})|(?=^[\t ]*[^\t\n\r \{])/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.block.class.end.ahk2" }
      },
      name: "meta.block.class.ahk2",
      patterns: [
        {
          applyEndPatternLast: 1,
          begin: {
            G: [/￿(?!\{)/dgv, /(?!\{)/dgvy]
          },
          end: /(?=\{)|(?=^[\t ]*[^\t\n\r \{])/dgv,
          patterns: [
            { include: "#comments" },
            {
              begin: {
                G: [/￿(<)/dgv, /(<)/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.typeparameters.begin.ahk2" }
              },
              end: />/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.typeparameters.end.ahk2" }
              },
              patterns: [
                {
                  match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
                  name: "entity.name.type.parameter"
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.comma.ahk2"
                },
                {
                  match: /=/dgv,
                  name: "keyword.operator.assignment.ahk2"
                },
                {
                  match: /\./dgv,
                  name: "punctuation.accessor.ahk2"
                },
                {
                  match: /\|/dgv,
                  name: "keyword.operator.ahk2"
                }
              ]
            },
            {
              captures: {
                "1": { name: "storage.modifier.ahk2" },
                "3": {
                  patterns: [
                    {
                      match: /\.(?=[\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                      name: "punctuation.accessor.ahk2"
                    },
                    { include: "#default_classes" },
                    {
                      match: /\b[^\.]+\b/dgv,
                      name: "entity.name.type.class.ahk2"
                    }
                  ]
                }
              },
              match: /\b(extends)([\t ]+([\.\p{L}\p{M}\p{N}\p{Pc}]+))?/dgiv
            }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.class.begin.ahk2" }
          },
          end: /(?=\})/dgv,
          name: "meta.block.class.body.ahk2",
          patterns: [
            { include: "#comments" },
            {
              match: /(?<=^[\t ]*)static(?=[\t ]+[\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
              name: "storage.modifier.ahk2"
            },
            {
              begin: /(?<=^[\t ]*(?:static[\t ]+)?)([\p{L}\p{M}\p{N}\p{Pc}]+)[\t ]*(=>)/dgiv,
              beginCaptures: {
                "1": {
                  name: "variable.other.property.ahk2",
                  patterns: [
                    { include: "#metafunction" }
                  ]
                },
                "2": { name: "storage.type.function.arrow.ahk2" }
              },
              end: /(?=^)/dgv,
              name: "meta.block.property.body.ahk2",
              patterns: [
                { include: "$base" },
                { include: "#line_continue" }
              ]
            },
            {
              captures: {
                "0": {
                  name: "variable.other.property.ahk2",
                  patterns: [
                    { include: "#metafunction" }
                  ]
                }
              },
              match: /(?<=(^[\t ]*(?:static[\t ]+)?|,[\t ]*))[\p{L}\p{M}\p{N}\p{Pc}]+(?=[\t ]*:=?)/dgiv
            },
            {
              begin: /(?<=^[\t ]*(?:static[\t ]+)?)([\p{L}\p{M}\p{N}\p{Pc}]+)(?=\()/dgiv,
              beginCaptures: {
                "1": {
                  name: "entity.name.function.method.ahk2",
                  patterns: [
                    { include: "#metafunction" }
                  ]
                }
              },
              end: /(?=^)/dgv,
              name: "meta.block.method.ahk2",
              patterns: [
                {
                  begin: {
                    G: [/￿\(/dgv, /\(/dgvy]
                  },
                  beginCaptures: {
                    "0": { name: "punctuation.definition.parameters.begin.ahk2" }
                  },
                  end: /\)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.definition.parameters.end.ahk2" }
                  },
                  patterns: [
                    { include: "$base" }
                  ]
                },
                {
                  begin: /\{/dgv,
                  beginCaptures: {
                    "0": { name: "punctuation.definition.block.method.begin.ahk2" }
                  },
                  end: /\}/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.definition.block.method.end.ahk2" }
                  },
                  name: "meta.block.method.body.ahk2",
                  patterns: [
                    { include: "$base" }
                  ]
                },
                {
                  begin: /(=>)/dgv,
                  beginCaptures: {
                    "1": { name: "storage.type.function.arrow.ahk2" }
                  },
                  end: /(?=^)/dgv,
                  name: "meta.block.method.body.ahk2",
                  patterns: [
                    { include: "$base" },
                    { include: "#line_continue" }
                  ]
                },
                { include: "#comments" }
              ]
            },
            {
              begin: /(?<=^[\t ]*(?:static[\t ]+)?)\b[\p{L}\p{M}\p{N}\p{Pc}]+\b(?=(\[|[\t ]*\{?([\t ];[^\n]*)?\n))/dgiv,
              beginCaptures: {
                "0": {
                  name: "variable.other.property.ahk2",
                  patterns: [
                    { include: "#metafunction" }
                  ]
                }
              },
              end: /(?=^)/dgv,
              name: "meta.block.property.ahk2",
              patterns: [
                {
                  begin: {
                    G: [/￿\[/dgv, /\[/dgvy]
                  },
                  beginCaptures: {
                    "0": { name: "punctuation.definition.parameters.begin.ahk2" }
                  },
                  end: /\]/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.definition.parameters.end.ahk2" }
                  },
                  patterns: [
                    { include: "$base" }
                  ]
                },
                { include: "#comments" },
                {
                  begin: /\{/dgv,
                  beginCaptures: {
                    "0": { name: "punctuation.definition.block.property.begin.ahk2" }
                  },
                  end: /(?=\})/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.definition.block.property.end.ahk2" }
                  },
                  name: "meta.block.property.body.ahk2",
                  patterns: [
                    {
                      begin: /(?<=^[\t ]*)set\b/dgiv,
                      beginCaptures: {
                        "0": { name: "storage.type.setter.ahk2" }
                      },
                      end: /(?=^)/dgv,
                      patterns: [
                        { include: "#comments" },
                        {
                          begin: /\{/dgv,
                          beginCaptures: {
                            "0": { name: "punctuation.definition.block.property.setter.begin.ahk2" }
                          },
                          end: /\}/dgv,
                          endCaptures: {
                            "0": { name: "punctuation.definition.block.property.setter.end.ahk2" }
                          },
                          name: "meta.block.property.setter.body.ahk2",
                          patterns: [
                            { include: "$base" }
                          ]
                        },
                        {
                          begin: /(=>)/dgv,
                          beginCaptures: {
                            "1": { name: "storage.type.function.arrow.ahk2" }
                          },
                          end: /(?=^)/dgv,
                          name: "meta.block.property.setter.body.ahk2",
                          patterns: [
                            { include: "$base" },
                            { include: "#line_continue" }
                          ]
                        }
                      ]
                    },
                    {
                      begin: /(?<=^[\t ]*)get\b/dgiv,
                      beginCaptures: {
                        "0": { name: "storage.type.getter.ahk2" }
                      },
                      end: /(?=^)/dgv,
                      patterns: [
                        { include: "#comments" },
                        {
                          begin: /\{/dgv,
                          beginCaptures: {
                            "0": { name: "punctuation.definition.block.property.getter.begin.ahk2" }
                          },
                          end: /\}/dgv,
                          endCaptures: {
                            "0": { name: "punctuation.definition.block.property.getter.end.ahk2" }
                          },
                          name: "meta.block.property.getter.body.ahk2",
                          patterns: [
                            { include: "$base" }
                          ]
                        },
                        {
                          begin: /(=>)/dgv,
                          beginCaptures: {
                            "1": { name: "storage.type.function.arrow.ahk2" }
                          },
                          end: /(?=^)/dgv,
                          name: "meta.block.property.getter.body.ahk2",
                          patterns: [
                            { include: "$base" },
                            { include: "#line_continue" }
                          ]
                        }
                      ]
                    },
                    { include: "$base" }
                  ]
                },
                {
                  begin: /(=>)/dgv,
                  beginCaptures: {
                    "1": { name: "storage.type.function.arrow.ahk2" }
                  },
                  end: /(?=^)/dgv,
                  name: "meta.block.property.getter.body.ahk2",
                  patterns: [
                    { include: "$base" },
                    { include: "#line_continue" }
                  ]
                },
                { include: "#variables" }
              ]
            },
            { include: "#class_block" },
            { include: "$base" }
          ]
        }
      ]
    },
    comment_line: {
      begin: /(?<=(^[\t ]*|[\t ]));/dgv,
      end: /\n/dgv,
      name: "comment.line.ahk2",
      patterns: [
        { include: "#comment_tag" }
      ]
    },
    comment_tag: {
      captures: {
        "2": { name: "storage.type.class.todo" },
        "3": { name: "storage.type.class.fixme" },
        "4": { name: "storage.type.class.note" }
      },
      match: {
        G: [/(?<=(￿|^\p{space}*\*?)\p{space}*)(?:(todo\b:?)|(fixme\b:?)|(note\b:?))/dgiv, new EmulatedRegExp("(?<=(^|^\\p{space}*\\*?)\\p{space}*)(?:(todo\\b:?)|(fixme\\b:?)|(note\\b:?))", "dgiv", { strategy: "clip_search" })]
      }
    },
    comments: {
      patterns: [
        { include: "#compiler_directive" },
        {
          begin: /(?<=^[\t ]*)(\/\*\*)(?!\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.begin.ahk2" }
          },
          end: /(^[\t ]*\*\/|\*\/(?=[\t ]*(?=\n?$)))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.comment.end.ahk2" }
          },
          name: "comment.block.jsdoc.ahk2",
          patterns: [
            { include: "#comment_tag" },
            { include: "#docblock" }
          ]
        },
        {
          begin: /(?<=^[\t ]*)(\/\*)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.begin.ahk2" }
          },
          end: /(^[\t ]*\*\/|\*\/(?=[\t ]*(?=\n?$)))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.comment.end.ahk2" }
          },
          name: "comment.block.ahk2",
          patterns: [
            { include: "#comment_tag" }
          ]
        },
        { include: "#comment_line" }
      ]
    },
    compiler_directive: {
      patterns: [
        {
          begin: /^[\t ]*(\/\*)(@ahk2exe-keep)/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.begin.ahk2" },
            "2": { name: "keyword.control.directive.conditional.ahk2" }
          },
          end: /^[\t ]*(\*\/)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.comment.end.ahk2" }
          },
          name: "comment.block.ahk2"
        },
        {
          begin: /(?<=^[\t ]*)(;[\t ]*@[\-\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.directive.ahk2" }
          },
          end: /\n/dgv,
          patterns: [
            {
              begin: /[^\t \;]/dgv,
              end: /(?=[\t ]+;|\n)/dgv,
              name: "string.literal.include.ahk2"
            },
            { include: "#comment_line" }
          ]
        }
      ]
    },
    conditional_context: {
      patterns: [
        { include: "$self" },
        { include: "#block_innards" }
      ]
    },
    continuation_section: {
      begin: /(?<=^[\t ]*)(\()(((join[^\t ]*|[^\t \(\)\;]+)(?=[\t ]|(?=\n?$))|[\t ]+)*)((?<=[\t ]);[^\n]*)?(?=\n?$)/dgiv,
      beginCaptures: {
        "1": { name: "punctuation.section.parens.begin.ahk2" },
        "2": {
          patterns: [
            {
              match: /(?<=[\t ]|^[\t ]*\()(?:c(om(ments?)?)?|[lr]trim0?|`|join(`s|[^\t ]){0,15})(?=[\t ]|(?=\n?$))/dgiv,
              name: "string.options.ahk2 markup.italic"
            },
            {
              match: /[^\t ]+/dgv,
              name: "invalid.options.ahk2 markup.strikethrough"
            }
          ]
        },
        "5": {
          patterns: [
            { include: "#comment_line" }
          ]
        }
      },
      end: /^[\t ]*(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.parens.end.ahk2" }
      },
      name: "meta.parens.continuation_section.ahk2",
      patterns: [
        { include: "#continuation_section_innards" }
      ]
    },
    continuation_section_innards: {
      patterns: [
        {
          begin: /(["'])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.ahk2" }
          },
          end: /(1)|(?=^[\t ]*\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.ahk2" }
          },
          name: "string.continuation_section_innards.ahk2",
          patterns: [
            { include: "#string_escaped_char" }
          ]
        },
        { include: "#variables" },
        {
          match: /\{/dgv,
          name: "punctuation.section.block.begin.ahk2"
        },
        {
          match: /\}/dgv,
          name: "punctuation.section.block.end.ahk2"
        },
        {
          match: /\[/dgv,
          name: "punctuation.section.parens.begin.ahk2"
        },
        {
          match: /\]/dgv,
          name: "punctuation.section.parens.end.ahk2"
        },
        { include: "#parens" },
        { include: "$base" }
      ]
    },
    continuation_string: {
      patterns: [
        {
          begin: /(?<=^[\t ]*)(\()(((join[^\t ]*|[^\t \(\)]+(?<![\t ];[^\n]*))(?=[\t ]|(?=\n?$))|[\t ]+)*)(?<=([\t ]|^[\t ]*\()c(om(ments?)?)?([\t ][^\n]*|(?=\n?$)))((?<=[\t ]);[^\n]*)?(?=\n?$)/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.section.parens.begin.bracket.round.ahk2" },
            "2": {
              patterns: [
                {
                  match: /(?<=[\t ]|^[\t ]*\()(?:c(om(ments?)?)?|[lr]trim0?|`|join(`s|[^\t ]){0,15})(?=[\t ]|(?=\n?$))/dgiv,
                  name: "string.options.ahk2 markup.italic"
                },
                {
                  match: /[^\t ]+/dgv,
                  name: "invalid.options.ahk2 markup.strikethrough"
                }
              ]
            },
            "9": {
              patterns: [
                { include: "#comment_line" }
              ]
            }
          },
          end: /(?<=^[\t ]*)(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.parens.end.bracket.round.ahk2" }
          },
          name: "string.continuation.with.comment",
          patterns: [
            { include: "#comment_line" },
            {
              match: /(?<=^[\t ]*)`\)/dgv,
              name: "constant.character.escape.ahk2"
            },
            { include: "#string_escaped_char" }
          ]
        },
        {
          begin: /(?<=^[\t ]*)(\()(((join[^\t ]*|[^\t \(\)]+)(?=[\t ]|(?=\n?$))|[\t ]+(;[^\n]*(?=\n?$))?)*)(?=\n?$)/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.section.parens.begin.bracket.round.ahk2" },
            "2": {
              patterns: [
                {
                  match: /(?<=[\t ]|^[\t ]*\()(?:[lr]trim0?|`|join(`s|[^\t ]){0,15})(?=[\t ]|(?=\n?$))/dgiv,
                  name: "string.options.ahk2 markup.italic"
                },
                { include: "#comment_line" },
                {
                  match: /[^\t ]+/dgv,
                  name: "invalid.options.ahk2 markup.strikethrough"
                }
              ]
            }
          },
          end: /(?<=^[\t ]*)(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.parens.end.bracket.round.ahk2" }
          },
          name: "string.continuation",
          patterns: [
            {
              match: /(?<=^[\t ]*)`\)/dgv,
              name: "constant.character.escape.ahk2"
            },
            { include: "#string_escaped_char" }
          ]
        }
      ]
    },
    default_classes: {
      patterns: [
        {
          begin: /(?<!\.)\bGui\b/dgiv,
          beginCaptures: {
            "0": { name: "support.class.ahk2" }
          },
          end: /(?=([\n[^\t \.\;]]|\.[^\p{L}\p{M}\p{N}\p{Pc}]))/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.accessor.ahk2" },
                "2": { name: "support.class.guicontrol.ahk2" }
              },
              match: /(\.)(ActiveX|Button|CheckBox|ComboBox|Control|Custom|DateTime|DDL|Edit|GroupBox|Hotkey|Link|List|ListBox|ListView|MonthCal|Pic|Progress|Radio|Slider|StatusBar|Tab|Text|TreeView|UpDown)\b/dgiv
            }
          ]
        },
        {
          match: /(?<!\.)\b(?:Any|Array|BoundFunc|Buffer|Class|ClipboardAll|Closure|ComObjArray|ComObject|ComValue|ComValueRef|Enumerator|Error|File|Float|Func|Gui|IndexError|InputHook|Integer|KeyError|Map|MemberError|MemoryError|Menu|MenuBar|MethodError|Number|Object|OSError|Primitive|PropertyError|RegExMatchInfo|String|TargetError|TimeoutError|TypeError|ValueError|VarRef|ZeroDivisionError)\b/dgiv,
          name: "support.class.ahk2"
        }
      ]
    },
    default_statement: {
      captures: {
        "1": { name: "keyword.control.default.ahk2" },
        "2": { name: "punctuation.separator.colon.case.default.ahk2" }
      },
      match: /(?<=^[\t ]*\{?[\t ]*)(default)[\t ]*(:)(?!=)/dgiv,
      name: "meta.conditional.default.ahk2"
    },
    docblock: {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "constant.language.access-type.jsdoc" }
          },
          match: /((@)a(?:ccess|pi))\p{space}+(p(?:rivate|rotected|ublic))\b/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
            "4": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
            "5": { name: "constant.other.email.link.underline.jsdoc" },
            "6": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
          },
          match: /((@)author)\p{space}+([^\*\/\<\>\@\p{space}](?:[^\*\/\<\>\@]|\*[^\/])*)(?:\p{space}*(<)([^\>\p{space}]+)(>))?/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
            "4": { name: "keyword.operator.control.jsdoc" },
            "5": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)borrows)\p{space}+((?:[^\*\/\@\p{space}]|\*[^\/])+)\p{space}+(as)\p{space}+((?:[^\*\/\@\p{space}]|\*[^\/])+)/dgv
        },
        {
          begin: /((@)example)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=@|\*+\/)/dgv,
          name: "meta.example.jsdoc",
          patterns: [
            {
              match: /^\p{space}*\*\p{space}+/dgv,
              name: "comment.block.ahk2"
            },
            {
              begin: {
                G: [/￿(<)caption(>)/dgv, /(<)caption(>)/dgvy]
              },
              beginCaptures: {
                "0": { name: "entity.name.tag.inline.jsdoc" },
                "1": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
                "2": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
              },
              contentName: "constant.other.description.jsdoc",
              end: /(<\/)caption(>)|(?=\*\/)/dgv,
              endCaptures: {
                "0": { name: "entity.name.tag.inline.jsdoc" },
                "1": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
                "2": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
              },
              patterns: [
                {
                  match: /^\p{space}*\*\p{space}/dgv,
                  name: "comment.block.ahk2"
                }
              ]
            },
            { include: "$base" }
          ]
        },
        {
          begin: /((@)overload)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\n|^\p{space}*\*)/dgv,
          name: "meta.overload.ahk2",
          patterns: [
            { include: "$base" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "constant.language.symbol-type.jsdoc" }
          },
          match: /((@)kind)\p{space}+(class|constant|event|external|file|function|member|mixin|module|namespace|typedef)\b/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.link.underline.jsdoc" },
            "4": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)see)\p{space}+(?:((?=https?:\/\/)(?:[^\*\p{space}]|\*[^\/])+)|((?!https?:\/\/|(?:\[[^\]\[]*\])?\{@(?:link|linkcode|linkplain|tutorial)\b)(?:[^\*\/\@\p{space}]|\*[^\/])+))/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" }
          },
          match: /((@)template)\p{space}+([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*(?:\p{space}*,\p{space}*[\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)*)/dgv
        },
        {
          begin: /((@)typedef)\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" },
            {
              match: /(?:[^\*\/\@\p{space}]|\*[^\/])+/dgv,
              name: "entity.name.type.instance.jsdoc"
            }
          ]
        },
        {
          begin: /((@)(?:arg|argument|const|constant|member|namespace|param|prop|property|var))\p{space}+(?=[\[\{]|(?!\p{Nd})[\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\[\{\}\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          patterns: [
            { include: "#jsdoctype" },
            {
              match: /((?!\p{Nd})[\p{L}\p{M}\p{N}\p{Pc}][\]\.\[\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
              name: "variable.other.jsdoc"
            },
            {
              captures: {
                "1": { name: "punctuation.definition.optional-value.begin.bracket.square.jsdoc" },
                "2": { name: "keyword.operator.assignment.jsdoc" },
                "3": { name: "meta.embedded.ahk2" },
                "4": { name: "punctuation.definition.optional-value.end.bracket.square.jsdoc" },
                "5": { name: "invalid.illegal.syntax.jsdoc" }
              },
              match: new EmulatedRegExp("(\\[)\\p{space}*[\\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:(?:\\[\\])?\\.[\\$\\p{L}\\p{M}\\p{N}\\p{Pc}]+)*(?:\\p{space}*(=)\\p{space}*((?:(?=(\"(?:\\*(?!/)|\\\\(?!\")|[^\\*\\\\])*?\"|'(?:\\*(?!/)|\\\\(?!')|[^\\*\\\\])*?'|\\[(?:\\*(?!/)|[^\\*])*?\\]|(?:\\*(?!/)|\\p{space}(?!\\p{space}*\\])|\\[[^\\n]*?(?:\\]|(?=\\*/))|[^\\]\\*\\[\\p{space}])*))\\4)*))?\\p{space}*(?:(\\])((?:[^\\*\\p{space}]|\\*[^\\/\\p{space}])+)?|(?=\\*/))", "dgv", { hiddenCaptures: [4] }),
              name: "variable.other.jsdoc"
            }
          ]
        },
        {
          begin: /((@)(?:define|enum|exception|export|extends|lends|implements|modifies|namespace|private|protected|returns?|suppress|this|throws|type|yields?))\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.function.method.ahk2" }
          },
          match: /((@)method)\b\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}[^\x00-\x7F]])+)?/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)(?:alias|augments|callback|constructs|emits|event|fires|exports?|extends|external|function|func|host|lends|listens|interface|memberof!?|module|mixes|mixin|name|requires|see|this|typedef|uses))\p{space}+((?:[^\*\@\{\}\p{space}]|\*[^\/])+)/dgv
        },
        {
          begin: /((@)(?:default(?:value)?|license|version))\p{space}+((["']))/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" },
            "4": { name: "punctuation.definition.string.begin.jsdoc" }
          },
          contentName: "variable.other.jsdoc",
          end: /(3)|(?=(?=\n?$)|\*\/)/dgv,
          endCaptures: {
            "0": { name: "variable.other.jsdoc" },
            "1": { name: "punctuation.definition.string.end.jsdoc" }
          }
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" }
          },
          match: /((@)(?:default(?:value)?|license|tutorial|variation|version))\p{space}+([^\*\p{space}]+)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          match: /(@)(?:abstract|access|alias|api|arg|argument|async|attribute|augments|author|beta|borrows|bubbles|callback|chainable|class|classdesc|code|config|const|constant|constructor|constructs|copyright|default|defaultvalue|define|deprecated|desc|description|dict|emits|enum|event|example|exception|exports?|extends|extension(?:_?for)?|external|externs|file|fileoverview|final|fires|for|func|function|generator|global|hideconstructor|host|ignore|implements|implicitCast|inherit[Dd]oc|inner|instance|interface|internal|kind|lends|license|listens|main|member|memberof!?|method|mixes|mixins?|modifies|module|name|namespace|noalias|nocollapse|nocompile|nosideeffects|override|overview|package|param|polymer(?:Behavior)?|preserve|private|prop|property|protected|public|read[Oo]nly|record|require[ds]|returns?|see|since|static|struct|submodule|summary|suppress|template|this|throws|todo|tutorial|type|typedef|unrestricted|uses|var|variation|version|virtual|writeOnce|yields?)\b/dgv,
          name: "storage.type.class.jsdoc"
        },
        { include: "#inline-tags" },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          match: /((@)[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?=\p{space}+)/dgv
        }
      ]
    },
    function_call: {
      captures: {
        "1": {
          name: "entity.name.function.ahk2",
          patterns: [
            {
              match: /(?<=\.)[^\n]+/dgv,
              name: "entity.name.function.method.ahk2"
            },
            { include: "#variables_language" }
          ]
        }
      },
      match: new EmulatedRegExp("([_\\p{Alpha}](?:(?=([_\\p{Alpha}\\p{Nd}]*))\\2))(?=\\()", "dgv", { hiddenCaptures: [2] })
    },
    function_call_notparens: {
      patterns: [
        {
          captures: {
            "0": {
              patterns: [
                { include: "#function_defaultLibrary" }
              ]
            }
          },
          match: /(?<=^[\t ]*(\{[\t ]*)?|::[\t ]*|(try|else|finally)[\t ]+)([_\p{Alpha}][_\p{Alpha}\p{Nd}]*\b(?<!^[\t ]*class\b))(?=(?=\n?$)|[\t ]((?!([\t ]*[\-\&\*\+\.\/\:\^\|]?=|<<=|>>=|[\?\{]))|(?=\n?$)))/dgiv,
          name: "entity.name.function.ahk2"
        },
        {
          match: /(?<=(^[\t ]*(\{[\t ]*)?|::[\t ]*|(try|else|finally)[\t ]+)([_\p{Alpha}][_\p{Alpha}\p{Nd}]*\.)+)([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\b(?=(?=\n?$)|[\t ]((?!([\t ]*[\-\&\*\+\.\/\:\^\|]?=|<<=|>>=|[\?\{]))|(?=\n?$)))/dgiv,
          name: "entity.name.function.method.ahk2"
        }
      ]
    },
    function_defaultLibrary: {
      patterns: [
        {
          match: new EmulatedRegExp("(?<!\\.)\\b(?:Abs|ACos|ASin|ATan|BlockInput|CallbackCreate|CallbackFree|CaretGetPos|Ceil|Chr|Click|ClipWait|ComCall|ComObjActive|ComObjConnect|ComObjFlags|ComObjFromPtr|ComObjGet|ComObjQuery|ComObjType|ComObjValue|ControlAddItem|ControlChooseIndex|ControlChooseString|ControlClick|ControlDeleteItem|ControlFindItem|ControlFocus|ControlGetChecked|ControlGetChoice|ControlGetClassNN|ControlGetEnabled|ControlGetExStyle|ControlGetFocus|ControlGetHwnd|ControlGetIndex|ControlGetItems|ControlGetPos|ControlGetStyle|ControlGetText|ControlGetVisible|ControlHide|ControlHideDropDown|ControlMove|ControlSend|ControlSendText|ControlSetChecked|ControlSetEnabled|ControlSetExStyle|ControlSetStyle|ControlSetText|ControlShow|ControlShowDropDown|CoordMode|Cos|Critical|DateAdd|DateDiff|DetectHiddenText|DetectHiddenWindows|DirCopy|DirCreate|DirDelete|DirExist|DirMove|DirSelect|DllCall|Download|DriveEject|DriveGetCapacity|DriveGetFilesystem|DriveGetLabel|DriveGetList|DriveGetSerial|DriveGetSpaceFree|DriveGetStatus|DriveGetStatusCD|DriveGetType|DriveLock|DriveRetract|DriveSetLabel|DriveUnlock|Edit|EditGetCurrentCol|EditGetCurrentLine|EditGetLine|EditGetLineCount|EditGetSelectedText|EditPaste|EnvGet|EnvSet|Exit|ExitApp|Exp|FileAppend|FileCopy|FileCreateShortcut|FileDelete|FileEncoding|FileExist|FileGetAttrib|FileGetShortcut|FileGetSize|FileGetTime|FileGetVersion|FileInstall|FileMove|FileOpen|FileRead|FileRecycle|FileRecycleEmpty|FileSelect|FileSetAttrib|FileSetTime|Floor|Format|FormatTime|GetKeyName|GetKeySC|GetKeyState|GetKeyVK|GetMethod|GroupActivate|GroupAdd|GroupClose|GroupDeactivate|GuiCtrlFromHwnd|GuiFromHwnd|HasBase|HasMethod|HasProp|HotIf|HotIfWinActive|HotIfWinExist|HotIfWinNotActive|HotIfWinNotExist|Hotkey|Hotstring|IL_Add|IL_Create|IL_Destroy|ImageSearch|IniDelete|IniRead|IniWrite|InputBox|InstallKeybdHook|InstallMouseHook|InStr|IsAlnum|IsAlpha|IsDigit|IsFloat|IsInteger|IsLabel|IsLower|IsNumber|IsObject|IsSetRef|IsSpace|IsTime|IsUpper|IsXDigit|KeyHistory|KeyWait|ListHotkeys|ListLines|ListVars|ListViewGetContent|Ln|LoadPicture|Log|LTrim|Max|MenuFromHandle|MenuSelect|Min|Mod|MonitorGet|MonitorGetCount|MonitorGetName|MonitorGetPrimary|MonitorGetWorkArea|MouseClick|MouseClickDrag|MouseGetPos|MouseMove|MsgBox|NumGet|NumPut|ObjAddRef|ObjBindMethod|ObjFromPtr|ObjFromPtrAddRef|ObjGetBase|ObjGetCapacity|ObjHasOwnProp|ObjOwnPropCount|ObjOwnProps|ObjPtr|ObjPtrAddRef|ObjRelease|ObjSetBase|ObjSetCapacity|OnClipboardChange|OnError|OnExit|OnMessage|Ord|OutputDebug|Pause|Persistent|PixelGetColor|PixelSearch|PostMessage|ProcessClose|ProcessExist|ProcessSetPriority|ProcessWait|ProcessWaitClose|Random|RegDelete|RegDeleteKey|RegExMatch|RegExReplace|RegRead|RegWrite|Reload|Round|RTrim|Run|RunAs|RunWait|Send|SendEvent|SendInput|SendLevel|SendMessage|SendMode|SendPlay|SendText|SetCapslockState|SetControlDelay|SetDefaultMouseSpeed|SetKeyDelay|SetMouseDelay|SetNumlockState|SetRegView|SetScrollLockState|SetStoreCapsLockMode|SetTimer|SetTitleMatchMode|SetWinDelay|SetWorkingDir|Shutdown|Sin|Sleep|Sort|SoundBeep|SoundGetInterface|SoundGetMute|SoundGetName|SoundGetVolume|SoundPlay|SoundSetMute|SoundSetVolume|SplitPath|Sqrt|StatusBarGetText|StatusBarWait|StrCompare|StrGet|StrLen|StrLower|StrPtr|StrPut|StrReplace|StrSplit|StrTitle|StrUpper|SubStr|Suspend|SysGet|SysGetIPAddresses|Tan|Thread|ToolTip|TraySetIcon|TrayTip|Trim|Type|VarSetStrCapacity|VerCompare|WinActivate|WinActivateBottom|WinActive|WinClose|WinExist|WinGetClass|WinGetClientPos|WinGetControls|WinGetControlsHwnd|WinGetCount|WinGetExStyle|WinGetID|WinGetIDLast|WinGetList|WinGetMinMax|WinGetPID|WinGetPos|WinGetProcessName|WinGetProcessPath|WinGetStyle|WinGetText|WinGetTitle|WinGetTransColor|WinGetTransparent|WinHide|WinKill|WinMaximize|WinMinimize|WinMinimizeAll|WinMinimizeAllUndo|WinMove|WinMoveBottom|WinMoveTop|WinRedraw|WinRestore|WinSetAlwaysOnTop|WinSetEnabled|WinSetExStyle|WinSetRegion|WinSetStyle|WinSetTitle|WinSetTransColor|WinSetTransparent|WinShow|WinWait|WinWaitActive|WinWaitClose|WinWaitNotActive)\\b", "dgiv", { lazyCompile: true }),
          name: "support.function.ahk2"
        }
      ]
    },
    hotkey_hotstring: {
      patterns: [
        {
          begin: /^[\t ]*((#)[Hh][Oo][Tt][Ssſ][Tt][Rr][Ii][Nn][Gg])[\t ]+((?!(?:[Nn][Oo][Mm][Oo][Uu][Ssſ][Ee]|[Ee][Nn][Dd][Cc][Hh][Aa][Rr][Ssſ]))[^\;]+(?<=[Xx]([^0][^\n]*)?)(?=[\t ]|(?=\n?$)))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.directive.ahk2" },
            "2": { name: "punctuation.definition.directive.ahk2" },
            "3": { name: "string.literal.ahk2" }
          },
          patterns: [
            {
              begin: /^[\t ]*(:)(([^\:Xx]*[Xx]0[^\:Xx]*))(:)((`[^\n]|[^\`])*?)(::)(?![\t ]*\{[\t ]*([\t ];[^\n]*)?(?=\n?$))([^\n]*?)([\t ];[^\n]*)?(?=\n?$)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.definition.colon" },
                "2": {
                  patterns: [
                    {
                      match: /(s[eip]|[\*\?borstz]0?|c[01]?|k-1|[kp]\p{Nd}+|x0)/dgiv,
                      name: "string.options.ahk2 markup.italic"
                    },
                    {
                      match: /[^\t ]/dgv,
                      name: "invalid.options.ahk2 markup.strikethrough"
                    }
                  ]
                },
                "4": { name: "punctuation.definition.colon" },
                "5": { name: "keyword.keys.ahk2 markup.underline" },
                "7": { name: "punctuation.definition.colon" },
                "9": { name: "string.literal.ahk2" },
                "10": {
                  patterns: [
                    { include: "#comment_line" }
                  ]
                }
              },
              end: /(?=^([\t ]*([^\t\n\r \(\/\;]|\/(?!\*)|\((?!((join[^\t ]*|[^\t \(\)]+)(?=[\t ]|(?=\n?$))|[\t ]+(;[^\n]*(?=\n?$))?)*(?=\n?$)))))/dgiv,
              name: "hotstring.ahk2",
              patterns: [
                { include: "#comments" },
                { include: "#continuation_string" },
                {
                  match: /(?<=^[\t ]*\))[^\n]+(?=\n?$)/dgv,
                  name: "string.literal.ahk2"
                }
              ]
            },
            { include: "#hotstring_execute" },
            { include: "$base" }
          ]
        },
        {
          begin: /^[\t ]*((#)[Hh][Oo][Tt][Ssſ][Tt][Rr][Ii][Nn][Gg])[\t ]+((?!(?:[Nn][Oo][Mm][Oo][Uu][Ssſ][Ee]|[Ee][Nn][Dd][Cc][Hh][Aa][Rr][Ssſ]))[^\;]*(?<=#[^Xx]+([Xx]0)?[^Xx]*))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.directive.ahk2" },
            "2": { name: "punctuation.definition.directive.ahk2" },
            "3": { name: "string.literal.ahk2" }
          },
          patterns: [
            { include: "$base" }
          ]
        },
        {
          begin: /^[\t ]*(:)(([^\:Xx]|[Xx]0)*)(:)((`[^\n]|[^\`])*?)(::)(?![\t ]*\{[\t ]*([\t ];[^\n]*)?(?=\n?$))([^\n]*?)([\t ];[^\n]*)?(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.colon" },
            "2": {
              patterns: [
                {
                  match: /(s[eip]|[\*\?borstz]0?|c[01]?|k-1|[kp]\p{Nd}+|x0)/dgiv,
                  name: "string.options.ahk2 markup.italic"
                },
                {
                  match: /[^\t ]/dgv,
                  name: "invalid.options.ahk2 markup.strikethrough"
                }
              ]
            },
            "4": { name: "punctuation.definition.colon" },
            "5": { name: "keyword.keys.ahk2 markup.underline" },
            "7": { name: "punctuation.definition.colon" },
            "9": { name: "string.literal.ahk2" },
            "10": {
              patterns: [
                { include: "#comment_line" }
              ]
            }
          },
          end: /(?=^([\t ]*([^\t\n\r \(\/\;]|\/(?!\*)|\((?!((join[^\t ]*|[^\t \(\)]+)(?=[\t ]|(?=\n?$))|[\t ]+(;[^\n]*(?=\n?$))?)*(?=\n?$)))))/dgiv,
          name: "hotstring.ahk2",
          patterns: [
            { include: "#comments" },
            { include: "#continuation_string" },
            {
              match: /(?<=^[\t ]*\))[^\n]+(?=\n?$)/dgv,
              name: "string.literal.ahk2"
            }
          ]
        },
        { include: "#hotstring_execute" },
        {
          begin: /^[\t ]*((([\!\#\$\*\+\<\>\^\~]*?)(`;|(?<=[^\t ]);|[\!-\:\<-\~]|[^\x00-\/\:-\@\[-\^\`\{-\x7F]+))|~?(`;|(?<=[^\t ]);|[\!-\:\<-\~]|[^\x00-\/\:-\@\[-\^\`\{-\x7F]+)[\t ]+&[\t ]+~?(`;|(?<=[^\t ]);|[\!-\:\<-\~]|[^\x00-\/\:-\@\[-\^\`\{-\x7F]+))([\t ]+up)?(::)/dgiv,
          beginCaptures: {
            "1": {
              name: "hotkey.ahk2",
              patterns: [
                {
                  match: /(?<=[\t ])&(?=[\t ]+[^\t ]+(?:[\t ]+up)?(?=\n?$))/dgiv,
                  name: "keyword.operator.ahk2"
                },
                {
                  match: null,
                  name: "keyword.keys.ahk2"
                }
              ]
            },
            "7": { name: "keyword.keys.up.ahk2" },
            "8": { name: "punctuation.definition.colon" }
          },
          end: /(?=\n)/dgv,
          patterns: [
            {
              match: {
                G: [/(?<=￿[\t ]*)((?:alttab|alttabandmenu|alttabmenu|alttabmenudismiss|shiftalttab)\b|([\<\>]?[\!\#\+\^]){0,4}(`[\;\{]|(?<=￿);|[^\;\{]|(?:shift|lshift|rshift|alt|lalt|ralt|control|lcontrol|rcontrol|ctrl|lctrl|rctrl|lwin|rwin|appskey|lbutton|rbutton|mbutton|wheeldown|wheelup|wheelleft|wheelright|xbutton[12]|space|tab|enter|escape|esc|backspace|bs|delete|del|insert|ins|pgdn|pgup|home|end|up|down|left|right|printscreen|ctrlbreak|pause|help|sleep|scrolllock|capslock|numlock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpadmult|numpadadd|numpadsub|numpaddiv|numpaddot|numpaddel|numpadins|numpadclear|numpadleft|numpadright|numpaddown|numpadup|numpadhome|numpadend|numpadpgdn|numpadpgup|numpadenter|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|f20|f21|f22|f23|f24|browser_back|browser_forward|browser_refresh|browser_stop|browser_search|browser_favorites|browser_home|volume_mute|volume_down|volume_up|media_next|media_prev|media_stop|media_play_pause|launch_mail|launch_media|launch_app1|launch_app2|vk[a-f\p{Nd}]{1,2}(sc[a-f\p{Nd}]+)?|sc[a-f\p{Nd}]+))(?=([\t ]+;[^\n]*|[\t ]*)\n))/dgiv, new EmulatedRegExp("(?<=^[\\t ]*)((?:alttab|alttabandmenu|alttabmenu|alttabmenudismiss|shiftalttab)\\b|([\\<\\>]?[\\!\\#\\+\\^]){0,4}(`[\\;\\{]|(?<=^);|[^\\;\\{]|(?:shift|lshift|rshift|alt|lalt|ralt|control|lcontrol|rcontrol|ctrl|lctrl|rctrl|lwin|rwin|appskey|lbutton|rbutton|mbutton|wheeldown|wheelup|wheelleft|wheelright|xbutton[12]|space|tab|enter|escape|esc|backspace|bs|delete|del|insert|ins|pgdn|pgup|home|end|up|down|left|right|printscreen|ctrlbreak|pause|help|sleep|scrolllock|capslock|numlock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpadmult|numpadadd|numpadsub|numpaddiv|numpaddot|numpaddel|numpadins|numpadclear|numpadleft|numpadright|numpaddown|numpadup|numpadhome|numpadend|numpadpgdn|numpadpgup|numpadenter|f1|f2|f3|f4|f5|f6|f7|f8|f9|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|f20|f21|f22|f23|f24|browser_back|browser_forward|browser_refresh|browser_stop|browser_search|browser_favorites|browser_home|volume_mute|volume_down|volume_up|media_next|media_prev|media_stop|media_play_pause|launch_mail|launch_media|launch_app1|launch_app2|vk[a-f\\p{Nd}]{1,2}(sc[a-f\\p{Nd}]+)?|sc[a-f\\p{Nd}]+))(?=([\\t ]+;[^\\n]*|[\\t ]*)\\n))", "dgiv", { strategy: "clip_search" })]
              },
              name: "keyword.keys.ahk2"
            },
            { include: "$base" }
          ]
        },
        {
          captures: {
            "1": { name: "entity.name.label.ahk2" },
            "2": { name: "punctuation.definition.colon" }
          },
          match: /(?<=^[\t ]*\{?[\t ]*)([\p{L}\p{M}\p{N}\p{Pc}]+)(:)(?=[\t ]*([\t ];[^\n]*)?(?=\n?$))/dgv
        }
      ]
    },
    hotstring_execute: {
      captures: {
        "1": { name: "punctuation.definition.colon" },
        "2": {
          patterns: [
            {
              match: /(s[eip]|[\*\?borstz]0?|c[01]?|k-1|[kp]\p{Nd}+|x1?)/dgiv,
              name: "string.options.ahk2 markup.italic"
            },
            {
              match: /[^\t ]/dgv,
              name: "invalid.options.ahk2 markup.strikethrough"
            }
          ]
        },
        "3": { name: "punctuation.definition.colon" },
        "4": { name: "keyword.keys.ahk2 markup.underline" },
        "6": { name: "punctuation.definition.colon" }
      },
      match: /^[\t ]*(:)([^\:]*)(:)((`[^\n]|[^\`])*?)(::)/dgv,
      name: "hotstring.ahk2"
    },
    "inline-tags": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.bracket.square.begin.jsdoc" },
            "2": { name: "punctuation.definition.bracket.square.end.jsdoc" }
          },
          match: /(\[)[^\]]+(\])(?=\{@(?:link|linkcode|linkplain|tutorial))/dgv,
          name: "constant.other.description.jsdoc"
        },
        {
          begin: /(\{)((@)(?:link(?:code|plain)?|tutorial))\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.bracket.curly.begin.jsdoc" },
            "2": { name: "storage.type.class.jsdoc" },
            "3": { name: "punctuation.definition.inline.tag.jsdoc" }
          },
          end: /\}|(?=\*\/)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.bracket.curly.end.jsdoc" }
          },
          name: "entity.name.type.instance.jsdoc",
          patterns: [
            {
              captures: {
                "1": { name: "variable.other.link.underline.jsdoc" },
                "2": { name: "punctuation.separator.pipe.jsdoc" }
              },
              match: {
                G: [/￿((?=https?:\/\/)(?:[^\*\|\}\p{space}]|\*\/)+)(\|)?/dgv, /((?=https?:\/\/)(?:[^\*\|\}\p{space}]|\*\/)+)(\|)?/dgvy]
              }
            },
            {
              captures: {
                "1": { name: "variable.other.description.jsdoc" },
                "2": { name: "punctuation.separator.pipe.jsdoc" }
              },
              match: {
                G: [/￿((?:[^\*\@\{\|\}\p{space}]|\*[^\/])+)(\|)?/dgv, /((?:[^\*\@\{\|\}\p{space}]|\*[^\/])+)(\|)?/dgvy]
              }
            }
          ]
        }
      ]
    },
    jsdoctype: {
      patterns: [
        {
          begin: {
            G: [/￿(\{)/dgv, /(\{)/dgvy]
          },
          beginCaptures: {
            "0": { name: "entity.name.type.instance.jsdoc" },
            "1": { name: "punctuation.definition.bracket.curly.begin.jsdoc" }
          },
          contentName: "meta.embedded.ahk2 entity.name.type.instance.jsdoc",
          end: /((\}))\p{space}*|(?=\*\/)/dgv,
          endCaptures: {
            "1": { name: "entity.name.type.instance.jsdoc" },
            "2": { name: "punctuation.definition.bracket.curly.end.jsdoc" }
          },
          patterns: [
            { include: "#brackets" }
          ]
        }
      ]
    },
    line_continue: {
      patterns: [
        { include: "#line_s" },
        { include: "#line_p" }
      ]
    },
    line_p: {
      begin: /(?=\n)/dgv,
      end: /(?=^[\t ]*[\}\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      patterns: [
        { include: "$base" }
      ]
    },
    line_s: {
      applyEndPatternLast: 1,
      begin: /(?<=([\!\&\*-\/\:-\=\?\^\|\~]|\b(?:and|contain|in|is|or|not))[\t ]*)\n/dgiv,
      end: /(?=\n)/dgv,
      patterns: [
        { include: "$base" },
        {
          match: /(?<=^[\t ]*)\n/dgv
        }
      ]
    },
    metafunction: {
      match: /\b(__(?:new|init|item|enum|get|call|set|delete|ref|value))\b/dgiv,
      name: "storage.type.metafunction.ahk2"
    },
    numbers: {
      captures: {
        "0": {
          patterns: [
            {
              begin: /(?=[^\n])/dgv,
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  match: /((0[Xx][A-Fa-f\p{Nd}]+)|((\p{Nd}+(\.\p{Nd}*)?|\.\p{Nd}+)([Ee][\-\+]?\p{Nd}+)?))(?=\n?$)/dgv,
                  name: "constant.numeric.ahk2"
                },
                {
                  match: /(?:[\.\p{L}\p{M}\p{N}\p{Pc}]|(?<=[Ee])[\-\+])+/dgv,
                  name: "invalid.illegal.constant.numeric"
                }
              ]
            }
          ]
        }
      },
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}]\.?)\.?\p{Nd}(?:[\.\p{L}\p{M}\p{N}\p{Pc}]|(?<=[Ee])[\-\+])*/dgv
    },
    object_property: {
      patterns: [
        {
          captures: {
            "1": { name: "variable.other.property.ahk2" },
            "2": { name: "punctuation.separator.key-value.ahk2" }
          },
          match: /(?<=[\,\{][\t ]*)([\p{L}\p{M}\p{N}\p{Pc}]+)[\t ]*(:(?!=))/dgv,
          name: "meta.objectliteral.ahk2"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /(?<!\.)\b(?:and|or|not|in|is|contains)\b(?![\t ]*:)/dgiv,
          name: "keyword.operator.expression.ahk2"
        },
        {
          match: /--/dgv,
          name: "keyword.operator.decrement.ahk2"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.increment.ahk2"
        },
        {
          match: /=>/dgv,
          name: "storage.type.function.arrow.ahk2"
        },
        {
          match: /(?:[\-\*\+\.]|\/?\/)=/dgv,
          name: "keyword.operator.assignment.compound.ahk2"
        },
        {
          match: /(?:[\&\^]|<<|>>>?|\|)=/dgv,
          name: "keyword.operator.assignment.compound.bitwise.ahk2"
        },
        {
          match: /<<|>>>?/dgv,
          name: "keyword.operator.bitwise.shift.ahk2"
        },
        {
          match: /!=|<=|>=|=?=|[\<\>]/dgv,
          name: "keyword.operator.comparison.ahk2"
        },
        {
          match: /~=/dgv,
          name: "keyword.operator.regexp.ahk2"
        },
        {
          match: /\?\?|&&|!|\|\|/dgv,
          name: "keyword.operator.logical.ahk2"
        },
        {
          match: /[\&\^\|\~]/dgv,
          name: "keyword.operator.ahk2"
        },
        {
          match: /:=/dgv,
          name: "keyword.operator.assignment.ahk2"
        },
        {
          match: /\.(?=[\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "punctuation.accessor.ahk2"
        },
        {
          match: /[\-\*\+\.\/]/dgv,
          name: "keyword.operator.ahk2"
        },
        {
          match: /%/dgv,
          name: "punctuation.parens.percent.ahk2"
        },
        {
          match: /\[/dgv,
          name: "punctuation.square.begin.ahk2"
        },
        {
          match: /\]/dgv,
          name: "punctuation.square.end.ahk2"
        },
        {
          match: /\?(?=[\t ]*[\]\)\,\}])/dgv,
          name: "keyword.operator.optional.ahk2"
        },
        {
          match: /\?|:(?!:)/dgv,
          name: "keyword.operator.ternary.ahk2"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.ahk2"
        }
      ]
    },
    parens: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.parens.begin.bracket.round.ahk2" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.end.bracket.round.ahk2" }
      },
      name: "meta.parens.ahk2",
      patterns: [
        { include: "$base" }
      ]
    },
    pre_definition: {
      patterns: [
        {
          begin: /^[\t ]*((#)(?:dllload|hotstring|include(again)?|mapcasesense|module|requires|errorstdout|definedefault(array|map|object)value|windowclass(gui|main)|singleinstance|targetcontrolerror|targetwindowerror))\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.directive.ahk2" },
            "2": { name: "punctuation.definition.directive.ahk2" }
          },
          end: /\n|(?=[\t ];)/dgv,
          name: "meta.preprocessor.ahk2",
          patterns: [
            {
              match: /[^\n]*?(?=[\t ];|(?=\n?$))/dgv,
              name: "string.literal.ahk2"
            }
          ]
        },
        {
          begin: /^[\t ]*((#)warn)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.directive.ahk2" },
            "2": { name: "punctuation.definition.directive.ahk2" }
          },
          end: /\n|(?=[\t ];)/dgv,
          name: "meta.preprocessor.ahk2",
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.separator.comma.ahk2"
            },
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "string.literal.ahk2"
            }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.control.directive.ahk2" },
            "2": { name: "punctuation.definition.directive.ahk2" }
          },
          match: /^[\t ]*((#)(?:clipboardtimeout|criticalobject(sleeptime|timeout)|hotif|hotiftimeout|import|inputlevel|initexec|maxthreads|maxthreadsbuffer|maxthreadsperhotkey|notrayicon|structpack|suspendexempt|usehook|usestdlib|warn|warncontinuableexception|winactivateforce))\b/dgiv
        },
        {
          begin: /^[\t ]*((#)dllimport)([\t ]+([\p{L}\p{M}\p{N}\p{Pc}]+))?/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.directive.ahk2" },
            "2": { name: "punctuation.definition.directive.ahk2" },
            "4": { name: "entity.name.function.ahk2" }
          },
          end: /\n|(?=[\t ];)/dgv,
          name: "meta.preprocessor.ahk2",
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.separator.comma.ahk2"
            },
            {
              match: /[^\,]*?(?=,|[\t ];|(?=\n?$))/dgv,
              name: "string.literal.ahk2"
            }
          ]
        }
      ]
    },
    property: {
      patterns: [
        {
          match: /\b(?<=\.)[_\p{Alpha}\p{Nd}]+\b/dgv,
          name: "variable.other.property.ahk2"
        }
      ]
    },
    reserved: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.ahk2" },
            "2": { name: "entity.name.label.ahk2" }
          },
          match: /(?<![\%\.])((?:break|continue|goto))[\t ]+([^\t \;][^\t ]*)/dgiv
        },
        {
          captures: {
            "1": { name: "keyword.control.ahk2" },
            "3": {
              patterns: [
                {
                  match: /\bas\b/dgiv,
                  name: "keyword.control.ahk2"
                },
                { include: "#default_classes" },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.comma.ahk2"
                },
                {
                  match: /(?<!\.)\b[\p{L}\p{M}\p{N}\p{Pc}]+\b/dgv,
                  name: "entity.name.type.class.ahk2"
                }
              ]
            },
            "6": { name: "keyword.control.ahk2" },
            "7": { name: "variable.other.ahk2" }
          },
          match: /(?<![\%\.])(catch)([\t ]+\(?[\t ]*([\.\p{L}\p{M}\p{N}\p{Pc}]+([\t ]*,[\t ]*[\.\p{L}\p{M}\p{N}\p{Pc}]+)*)?([\t ]+(as)[\t ]+([\p{L}\p{M}\p{N}\p{Pc}]+))?)?[\t ]*\)?/dgiv
        },
        {
          captures: {
            "1": { name: "keyword.control.ahk2" },
            "3": { name: "keyword.control.ahk2" }
          },
          match: /^[\t ]*(export)[\t ]+((default)[\t ]+)?/dgiv
        },
        {
          match: /(?<![\%\.])\b(?:break|continue|until|else|for|goto|if|throw|try|finally|return|while)\b(?!%)/dgiv,
          name: "keyword.control.ahk2"
        },
        {
          match: /(?<![\%\.])\bloop([\t ]+(?:files|parse|read|reg))?\b(?!%)/dgiv,
          name: "keyword.control.ahk2"
        },
        {
          match: /(?<![\%\.])\b(?:global|local|static)\b(?!%)/dgiv,
          name: "storage.modifier.ahk2"
        },
        {
          match: /(?<=^[\t ]*)macro(?=[\t ]+[\p{L}\p{M}\p{N}\p{Pc}]+\()/dgiv,
          name: "storage.modifier.ahk2"
        }
      ]
    },
    string_escaped_char: {
      patterns: [
        {
          match: /`["'\`abefnprstv]/dgiv,
          name: "constant.character.escape.ahk2"
        },
        {
          match: /(?<=^[\t ]*)`\)/dgv,
          name: "constant.character.escape.ahk2"
        },
        {
          match: /`[^\n]/dgv,
          name: "invalid.illegal.unknown-escape.ahk2"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /(["'])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.ahk2" }
          },
          end: /(1)|(?=^([\t ]*([^\t\n\r \(\/\;]|\/(?!\*)|\((?!((join[^\t ]*|[^\t \(\)]+)(?=[\t ]|(?=\n?$))|[\t ]+(;[^\n]*(?=\n?$))?)*(?=\n?$)))))/dgiv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.ahk2" }
          },
          name: "string.quoted.ahk2",
          patterns: [
            { include: "#string_escaped_char" },
            { include: "#comments" },
            { include: "#continuation_string" }
          ]
        }
      ]
    },
    switch_conditional_parentheses: {
      begin: {
        A: [new EmulatedRegExp("((?:(?=((?:(?:(?=((?<![\\t ])[\\t ]+))\\3)|(/\\*)((?:(?=((?:[^\\*]|(?:(?=(\\*+))\\7)[^\\/])*))\\6)((?:(?=(\\*+))\\9)/)))+|(?:(?:(?:(?:\\b|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}]))|￿)|(?=\\n?$))))\\2))(\\()", "dgv", { hiddenCaptures: [2, 3, 6, 7, 9] }), new EmulatedRegExp("((?:(?=((?:(?:(?=((?<![\\t ])[\\t ]+))\\3)|(/\\*)((?:(?=((?:[^\\*]|(?:(?=(\\*+))\\7)[^\\/])*))\\6)((?:(?=(\\*+))\\9)/)))+|(?:(?:(?:(?:\\b|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}]))|^)|(?=\\n?$))))\\2))(\\()", "dgv", { hiddenCaptures: [2, 3, 6, 7, 9] })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#comments" }
          ]
        },
        "2": { name: "comment.block.ahk2 punctuation.definition.comment.begin.ahk2" },
        "3": { name: "comment.block.ahk2" },
        "4": {
          patterns: [
            {
              match: /\*\//dgv,
              name: "comment.block.ahk2 punctuation.definition.comment.end.ahk2"
            },
            {
              match: /\*/dgv,
              name: "comment.block.ahk2"
            }
          ]
        },
        "5": { name: "punctuation.section.parens.begin.bracket.round.conditional.switch.ahk2" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.parens.end.bracket.round.conditional.switch.ahk2" }
      },
      name: "meta.conditional.switch.ahk2",
      patterns: [
        { include: "#conditional_context" }
      ]
    },
    switch_statement: {
      begin: {
        A: [new EmulatedRegExp("(((?:(?=((?:(?:(?=((?<![\\t ])[\\t ]+))\\4)|(/\\*)((?:(?=((?:[^\\*]|(?:(?=(\\*+))\\8)[^\\/])*))\\7)((?:(?=(\\*+))\\10)/)))+|(?:(?:(?:(?:\\b|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}]))|￿)|(?=\\n?$))))\\3))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])switch(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))", "dgiv", { hiddenCaptures: [3, 4, 7, 8, 10] }), new EmulatedRegExp("(((?:(?=((?:(?:(?=((?<![\\t ])[\\t ]+))\\4)|(/\\*)((?:(?=((?:[^\\*]|(?:(?=(\\*+))\\8)[^\\/])*))\\7)((?:(?=(\\*+))\\10)/)))+|(?:(?:(?:(?:\\b|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}]))|^)|(?=\\n?$))))\\3))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])switch(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))", "dgiv", { hiddenCaptures: [3, 4, 7, 8, 10] })]
      },
      beginCaptures: {
        "1": { name: "meta.head.switch.ahk2" },
        "2": {
          patterns: [
            { include: "#comments" }
          ]
        },
        "3": { name: "comment.block.ahk2 punctuation.definition.comment.begin.ahk2" },
        "4": { name: "comment.block.ahk2" },
        "5": {
          patterns: [
            {
              match: /\*\//dgv,
              name: "comment.block.ahk2 punctuation.definition.comment.end.ahk2"
            },
            {
              match: /\*/dgv,
              name: "comment.block.ahk2"
            }
          ]
        },
        "6": { name: "keyword.control.ahk2" }
      },
      end: /(?<=\})|(?=[\]\=\>\[])/dgv,
      name: "meta.block.switch.ahk2",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          end: /(?<!^[\t ]*)(\{)(?=[\t ]*(;[^\n]*)?(?=\n?$))|(?<=^[\t ]*)(\{)/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.block.begin.switch.ahk2" },
            "3": { name: "punctuation.section.block.begin.switch.ahk2" }
          },
          name: "meta.head.switch.ahk2",
          patterns: [
            { include: "#switch_conditional_parentheses" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{)/dgv,
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.block.end.switch.ahk2" }
          },
          name: "meta.body.switch.ahk2",
          patterns: [
            { include: "#default_statement" },
            { include: "#case_statement" },
            { include: "$self" },
            { include: "#block_innards" }
          ]
        },
        {
          begin: /(?<=\})[\t\n ]*/dgv,
          end: /[\t\n ]*/dgv,
          name: "meta.tail.switch.ahk2",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    variables: {
      captures: {
        "0": {
          patterns: [
            { include: "#variables_language" }
          ]
        }
      },
      match: /\b[_\p{Alpha}][_\p{Alpha}\p{Nd}]*\b/dgv,
      name: "variable.other.ahk2"
    },
    variables_language: {
      patterns: [
        {
          match: /\b(?:true|false|unset)\b/dgiv,
          name: "constant.language.ahk2"
        },
        {
          match: /\b(?:this|super)\b/dgiv,
          name: "variable.language.this.ahk2"
        },
        {
          match: /\bvalue\b/dgiv,
          name: "variable.language.value.ahk2"
        },
        {
          match: /\bthishotkey\b/dgiv,
          name: "variable.language.thishotkey.ahk2"
        },
        {
          match: /\bA_(?:AhkPath|AhkVersion|AllowMainWindow|AppData|AppDataCommon|Args|Clipboard|ComSpec|ComputerName|ControlDelay|CoordModeCaret|CoordModeMenu|CoordModeMouse|CoordModePixel|CoordModeToolTip|Cursor|DDD??|DDDD|DefaultMouseSpeed|Desktop|DesktopCommon|DetectHiddenText|DetectHiddenWindows|EndChar|EventInfo|FileEncoding|HotkeyModifierTimeout|HotkeyInterval|HotIf|Hour|IconFile|IconHidden|IconNumber|IconTip|Index|InitialWorkingDir|Is64bitOS|IsAdmin|IsCompiled|IsCritical|IsPaused|IsSuspended|KeybdHookInstalled|KeyDelay|KeyDelayPlay|KeyDuration|KeyDurationPlay|Language|LastError|LineFile|LineNumber|ListLines|LoopField|LoopFileAttrib|LoopFileDir|LoopFileExt|LoopFileFullPath|LoopFileName|LoopFilePath|LoopFileShortName|LoopFileShortPath|LoopFileSize|LoopFileSizeKB|LoopFileSizeMB|LoopFileTimeAccessed|LoopFileTimeCreated|LoopFileTimeModified|LoopReadLine|LoopRegKey|LoopRegName|LoopRegTimeModified|LoopRegType|MaxHotkeysPerInterval|MDay|MenuMaskKey|MMM??|MMMM|MSec|Min|Mon|MouseDelay|MouseDelayPlay|MouseHookInstalled|MyDocuments|Now|NowUTC|OSVersion|PriorHotkey|PriorKey|ProgramFiles|Programs|ProgramsCommon|PtrSize|RegView|ScreenDPI|ScreenHeight|ScreenWidth|ScriptDir|ScriptFullPath|ScriptHwnd|ScriptName|Sec|SendLevel|SendMode|Space|StartMenu|StartMenuCommon|Startup|StartupCommon|StoreCapsLockMode|Tab|Temp|ThisFunc|ThisHotkey|TickCount|TimeIdle|TimeIdleKeyboard|TimeIdleMouse|TimeIdlePhysical|TimeSincePriorHotkey|TimeSinceThisHotkey|TitleMatchMode|TitleMatchModeSpeed|TrayMenu|UserName|WDay|WinDelay|WinDir|WorkingDir|YDay|YWeek|YYYY|Year)\b/dgiv,
          name: "variable.language.ahk2"
        },
        {
          match: /\bA_(?:PriorLine|WorkFileName)\b/dgiv,
          name: "variable.language.compiler.ahk2"
        },
        {
          match: /\bA_(?:AhkDir|DllDir|DllPath|GlobalStruct|IsDll|MainThreadID|MemoryModule|ModuleHandle|ScriptStruct|ThreadID|ZipCompressionLevel)\b/dgiv,
          name: "variable.language.ahkh.ahk2"
        },
        { include: "#default_classes" },
        { include: "#function_defaultLibrary" }
      ]
    }
  },
  dependencies: []
};
