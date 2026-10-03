import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "matlab",
  displayName: "MATLAB",
  scopeName: "source.matlab",
  patterns: [
    { include: "#all_before_command_dual" },
    { include: "#command_dual" },
    { include: "#all_after_command_dual" }
  ],
  repository: {
    all_after_command_dual: {
      patterns: [
        { include: "#string" },
        { include: "#line_continuation" },
        { include: "#comments" },
        { include: "#conjugate_transpose" },
        { include: "#transpose" },
        { include: "#constants" },
        { include: "#variables" },
        { include: "#numbers" },
        { include: "#operators" }
      ]
    },
    all_before_command_dual: {
      patterns: [
        { include: "#classdef" },
        { include: "#function" },
        { include: "#blocks" },
        { include: "#control_statements" },
        { include: "#global_persistent" },
        { include: "#parens" },
        { include: "#square_brackets" },
        { include: "#indexing_curly_brackets" },
        { include: "#curly_brackets" }
      ]
    },
    blocks: {
      patterns: [
        {
          begin: /\p{space}*(?:^|[\,\;\p{space}])(for)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.for.matlab" }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.for.matlab" }
          },
          name: "meta.for.matlab",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\p{space}*(?:^|[\,\;\p{space}])(if)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.if.matlab" }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.if.matlab" },
            "2": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          name: "meta.if.matlab",
          patterns: [
            {
              captures: {
                "2": { name: "keyword.control.elseif.matlab" },
                "3": {
                  patterns: [
                    { include: "$self" }
                  ]
                }
              },
              end: /^/dgv,
              match: /(\p{space}*)(?:^|[\,\;\p{space}])(elseif)\b([^\n]*)(?=\n?$)\n?/dgv,
              name: "meta.elseif.matlab"
            },
            {
              captures: {
                "2": { name: "keyword.control.else.matlab" },
                "3": {
                  patterns: [
                    { include: "$self" }
                  ]
                }
              },
              end: /^/dgv,
              match: /(\p{space}*)(?:^|[\,\;\p{space}])(else)\b([^\n]*)?(?=\n?$)\n?/dgv,
              name: "meta.else.matlab"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /\p{space}*(?:^|[\,\;\p{space}])(parfor)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.for.matlab" }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.for.matlab" }
          },
          name: "meta.parfor.matlab",
          patterns: [
            {
              begin: {
                G: [/￿(?!(?=\n?$))/dgv, /(?!(?=\n?$))/dgvy]
              },
              end: /(?=\n?$)\n?/dgv,
              name: "meta.parfor-quantity.matlab",
              patterns: [
                { include: "$self" }
              ]
            },
            { include: "$self" }
          ]
        },
        {
          begin: /\p{space}*(?:^|[\,\;\p{space}])(spmd)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.spmd.matlab" }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.spmd.matlab" }
          },
          name: "meta.spmd.matlab",
          patterns: [
            {
              begin: {
                G: [/￿(?!(?=\n?$))/dgv, /(?!(?=\n?$))/dgvy]
              },
              end: /(?=\n?$)\n?/dgv,
              name: "meta.spmd-statement.matlab",
              patterns: [
                { include: "$self" }
              ]
            },
            { include: "$self" }
          ]
        },
        {
          begin: /\p{space}*(?:^|[\,\;\p{space}])(switch)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.switch.matlab" }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.switch.matlab" }
          },
          name: "meta.switch.matlab",
          patterns: [
            {
              captures: {
                "2": { name: "keyword.control.case.matlab" },
                "3": {
                  patterns: [
                    { include: "$self" }
                  ]
                }
              },
              end: /^/dgv,
              match: /(\p{space}*)(?:^|[\,\;\p{space}])(case)\b([^\n]*)(?=\n?$)\n?/dgv,
              name: "meta.case.matlab"
            },
            {
              captures: {
                "2": { name: "keyword.control.otherwise.matlab" },
                "3": {
                  patterns: [
                    { include: "$self" }
                  ]
                }
              },
              end: /^/dgv,
              match: /(\p{space}*)(?:^|[\,\;\p{space}])(otherwise)\b([^\n]*)?(?=\n?$)\n?/dgv,
              name: "meta.otherwise.matlab"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /\p{space}*(?:^|[\,\;\p{space}])(try)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.try.matlab" }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.try.matlab" }
          },
          name: "meta.try.matlab",
          patterns: [
            {
              captures: {
                "2": { name: "keyword.control.catch.matlab" },
                "3": {
                  patterns: [
                    { include: "$self" }
                  ]
                }
              },
              end: /^/dgv,
              match: /(\p{space}*)(?:^|[\,\;\p{space}])(catch)\b([^\n]*)?(?=\n?$)\n?/dgv,
              name: "meta.catch.matlab"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /\p{space}*(?:^|[\,\;\p{space}])(while)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.while.matlab" }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.while.matlab" }
          },
          name: "meta.while.matlab",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    braced_validator_list: {
      begin: /\p{space}*(\{)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "storage.type.matlab" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "storage.type.matlab" }
      },
      patterns: [
        { include: "#braced_validator_list" },
        { include: "#validator_strings" },
        { include: "#line_continuation" },
        {
          captures: {
            "1": { name: "storage.type.matlab" }
          },
          match: /([^"'\.\{\}]+)/dgv
        },
        {
          match: /\./dgv,
          name: "storage.type.matlab"
        }
      ]
    },
    classdef: {
      patterns: [
        {
          begin: /^(\p{space}*)(classdef)\b\p{space}*([^\n]*)/dgv,
          beginCaptures: {
            "2": { name: "storage.type.class.matlab" },
            "3": {
              patterns: [
                {
                  captures: {
                    "1": {
                      patterns: [
                        {
                          match: /[A-Za-z][0-9A-Z_a-z]*/dgv,
                          name: "variable.parameter.class.matlab"
                        },
                        {
                          begin: /=\p{space}*/dgv,
                          end: /,|(?=\))/dgv,
                          patterns: [
                            {
                              match: /true|false/dgv,
                              name: "constant.language.boolean.matlab"
                            },
                            { include: "#string" }
                          ]
                        }
                      ]
                    },
                    "2": { name: "meta.class-declaration.matlab" },
                    "3": { name: "entity.name.section.class.matlab" },
                    "4": { name: "keyword.operator.other.matlab" },
                    "5": {
                      patterns: [
                        {
                          match: /[A-Za-z][0-9A-Z_a-z]*(\.[A-Za-z][0-9A-Z_a-z]*)*/dgv,
                          name: "entity.other.inherited-class.matlab"
                        },
                        {
                          match: /&/dgv,
                          name: "keyword.operator.other.matlab"
                        }
                      ]
                    },
                    "6": {
                      patterns: [
                        { include: "$self" }
                      ]
                    }
                  },
                  match: /(\([^\)]*\))?\p{space}*(([A-Za-z][0-9A-Z_a-z]*)(?:\p{space}*(<)\p{space}*([^\%]*))?)\p{space}*((?=\n?$)|(?=(%|[^\n][^\n][^\n]))[^\n]*)/dgv
                }
              ]
            }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.class.matlab" }
          },
          name: "meta.class.matlab",
          patterns: [
            {
              begin: /^(\p{space}*)(properties)\b([^\%]*)\p{space}*(\([^\)]*\))?\p{space}*((?=\n?$)|(?=%))/dgv,
              beginCaptures: {
                "2": { name: "keyword.control.properties.matlab" },
                "3": {
                  patterns: [
                    {
                      match: /[A-Za-z][0-9A-Z_a-z]*/dgv,
                      name: "variable.parameter.properties.matlab"
                    },
                    {
                      begin: /=\p{space}*/dgv,
                      end: /,|(?=\))/dgv,
                      patterns: [
                        {
                          match: /true|false/dgv,
                          name: "constant.language.boolean.matlab"
                        },
                        {
                          match: /p(?:ublic|rotected|rivate)/dgv,
                          name: "constant.language.access.matlab"
                        }
                      ]
                    }
                  ]
                }
              },
              end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
              endCaptures: {
                "1": { name: "keyword.control.end.properties.matlab" }
              },
              name: "meta.properties.matlab",
              patterns: [
                { include: "#validators" },
                { include: "$self" }
              ]
            },
            {
              begin: /^(\p{space}*)(methods)\b([^\%]*)\p{space}*(\([^\)]*\))?\p{space}*((?=\n?$)|(?=%))/dgv,
              beginCaptures: {
                "2": { name: "keyword.control.methods.matlab" },
                "3": {
                  patterns: [
                    {
                      match: /[A-Za-z][0-9A-Z_a-z]*/dgv,
                      name: "variable.parameter.methods.matlab"
                    },
                    {
                      begin: /=\p{space}*/dgv,
                      end: /,|(?=\))/dgv,
                      patterns: [
                        {
                          match: /true|false/dgv,
                          name: "constant.language.boolean.matlab"
                        },
                        {
                          match: /p(?:ublic|rotected|rivate)/dgv,
                          name: "constant.language.access.matlab"
                        }
                      ]
                    }
                  ]
                }
              },
              end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
              endCaptures: {
                "1": { name: "keyword.control.end.methods.matlab" }
              },
              name: "meta.methods.matlab",
              patterns: [
                { include: "$self" }
              ]
            },
            {
              begin: /^(\p{space}*)(events)\b([^\%]*)\p{space}*(\([^\)]*\))?\p{space}*((?=\n?$)|(?=%))/dgv,
              beginCaptures: {
                "2": { name: "keyword.control.events.matlab" },
                "3": {
                  patterns: [
                    {
                      match: /[A-Za-z][0-9A-Z_a-z]*/dgv,
                      name: "variable.parameter.events.matlab"
                    },
                    {
                      begin: /=\p{space}*/dgv,
                      end: /,|(?=\))/dgv,
                      patterns: [
                        {
                          match: /true|false/dgv,
                          name: "constant.language.boolean.matlab"
                        },
                        {
                          match: /p(?:ublic|rotected|rivate)/dgv,
                          name: "constant.language.access.matlab"
                        }
                      ]
                    }
                  ]
                }
              },
              end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
              endCaptures: {
                "1": { name: "keyword.control.end.events.matlab" }
              },
              name: "meta.events.matlab",
              patterns: [
                { include: "$self" }
              ]
            },
            {
              begin: /^(\p{space}*)(enumeration)\b([^\%]*)\p{space}*((?=\n?$)|(?=%))/dgv,
              beginCaptures: {
                "2": { name: "keyword.control.enumeration.matlab" }
              },
              end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
              endCaptures: {
                "1": { name: "keyword.control.end.enumeration.matlab" }
              },
              name: "meta.enumeration.matlab",
              patterns: [
                { include: "$self" }
              ]
            },
            { include: "$self" }
          ]
        }
      ]
    },
    command_dual: {
      captures: {
        "1": { name: "string.interpolated.matlab" },
        "2": { name: "variable.other.command.matlab" },
        "28": { name: "comment.line.percentage.matlab" }
      },
      match: /^\p{space}*(([A-HJ-MO-Zbcdfghklmoq-z][\p{L}\p{M}\p{N}\p{Pc}]*|an??|a([0-9A-Z_a-mo-z][\p{L}\p{M}\p{N}\p{Pc}]*|n[0-9A-Z_a-rt-z][\p{L}\p{M}\p{N}\p{Pc}]*|ns[\p{L}\p{M}\p{N}\p{Pc}]+)|ep??|e([0-9A-Z_a-oq-z][\p{L}\p{M}\p{N}\p{Pc}]*|p[0-9A-Z_a-rt-z][\p{L}\p{M}\p{N}\p{Pc}]*|ps[\p{L}\p{M}\p{N}\p{Pc}]+)|in|i([0-9A-Z_a-mo-z][\p{L}\p{M}\p{N}\p{Pc}]*|n[0-9A-Z_a-eg-z][\p{L}\p{M}\p{N}\p{Pc}]*|nf[\p{L}\p{M}\p{N}\p{Pc}]+)|In??|I([0-9A-Z_a-mo-z][\p{L}\p{M}\p{N}\p{Pc}]*|n[0-9A-Z_a-eg-z][\p{L}\p{M}\p{N}\p{Pc}]*|nf[\p{L}\p{M}\p{N}\p{Pc}]+)|j[\p{L}\p{M}\p{N}\p{Pc}]+|Na??|N([0-9A-Z_b-z][\p{L}\p{M}\p{N}\p{Pc}]*|a[0-9A-MO-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*|aN[\p{L}\p{M}\p{N}\p{Pc}]+)|na??|narg??|nargi|nargou??|n([0-9A-Z_b-z][\p{L}\p{M}\p{N}\p{Pc}]*|a([0-9A-Z_a-mopqs-z][\p{L}\p{M}\p{N}\p{Pc}]*|n[\p{L}\p{M}\p{N}\p{Pc}]+|r([0-9A-Z_a-fh-z][\p{L}\p{M}\p{N}\p{Pc}]*|g([0-9A-Z_a-hj-nq-z][\p{L}\p{M}\p{N}\p{Pc}]*|i([0-9A-Z_a-mo-z][\p{L}\p{M}\p{N}\p{Pc}]*|n[\p{L}\p{M}\p{N}\p{Pc}]+)|o([0-9A-Z_a-tv-z][\p{L}\p{M}\p{N}\p{Pc}]*|u([A-Za-su-z][\p{L}\p{M}\p{N}\p{Pc}]*|t[\p{L}\p{M}\p{N}\p{Pc}]+))))))|p|p[0-9A-Z_a-hj-z][\p{L}\p{M}\p{N}\p{Pc}]*|pi[\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+((([^"\%-\/\:-\>\@\\\^\{\|\~\p{space}]|(?=')|(?="))|(\.\^|\.\*|\.\/|\.\\|\.'|\.\(|&&|==|\|\||&(?=[^\&])|\|(?=[^\|])|~=|<=|>=|~(?!=)|<(?!=)|>(?!=)|[\-\*\+\/\:\@\\\^])(\P{space}|\p{space}*(?=%)|\p{space}+(?=\n?$)|\p{space}+([\]\&\)\*\,\/\:-\>\@\\\^\|\}]|(\.(?:[^\.\p{Nd}]|\.[^\.]))))|(\.[^'\(\*\/A-Z\\\^a-z\p{space}]))([^\%]|'[^']*'|"[^"]*")*|(\.(?=\p{space})|\.[A-Za-z]|(?=\{))([^"\%'\(\=]|==|'[^']*'|"[^"]*"|\(|\([^\%\)]*\)|\[|\[[^\]\%]*\]|\{|\{[^\%\}]*\})*(\.\.\.[^\%]*)?((?=%)|(?=\n?$))))(%[^\n]*)?(?=\n?$)/dgv
    },
    comment_block: {
      begin: new EmulatedRegExp("^(\\p{space}*)%\\{(?:(?=([^\\n\\P{space}]*))\\2)\\n", "dgv", { hiddenCaptures: [2] }),
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.matlab" }
      },
      end: new EmulatedRegExp("^\\p{space}*%\\}(?:(?=([^\\n\\P{space}]*))\\1)(?:\\n|(?=\\n?$))", "dgv", { hiddenCaptures: [1] }),
      name: "comment.block.percentage.matlab",
      patterns: [
        { include: "#comment_block" },
        {
          match: /^[^\n]*\n/dgv
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /(^[\t ]+)?(?=%%\p{space})/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.matlab" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /%%/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.matlab" }
              },
              end: /\n/dgv,
              name: "comment.line.double-percentage.matlab",
              patterns: [
                {
                  begin: {
                    G: [/￿[^\n\P{space}]*(?![\n\p{space}])/dgv, /[^\n\P{space}]*(?![\n\p{space}])/dgvy]
                  },
                  contentName: "meta.cell.matlab",
                  end: /(?=\n)/dgv
                }
              ]
            }
          ]
        },
        { include: "#comment_block" },
        {
          begin: /(^[\t ]+)?(?=%)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.matlab" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /%/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.matlab" }
              },
              end: /\n/dgv,
              name: "comment.line.percentage.matlab"
            }
          ]
        }
      ]
    },
    conjugate_transpose: {
      match: /((?<=\P{space})|(?<=\])|(?<=\))|(?<=\}))'/dgv,
      name: "keyword.operator.transpose.matlab"
    },
    constants: {
      match: /(?<!\.)\b(eps|false|Inf|inf|intmax|intmin|namelengthmax|NaN|nan|on|off|realmax|realmin|true|pi)\b/dgv,
      name: "constant.language.matlab"
    },
    control_statements: {
      captures: {
        "1": { name: "keyword.control.matlab" }
      },
      match: /\p{space}*(?:^|[\,\;\p{space}])(break|continue|return)\b/dgv,
      name: "meta.control.matlab"
    },
    curly_brackets: {
      begin: /\{/dgv,
      end: /\}/dgv,
      patterns: [
        { include: "#end_in_parens" },
        { include: "#all_before_command_dual" },
        { include: "#all_after_command_dual" },
        { include: "#end_in_parens" },
        { include: "#block_keywords" }
      ]
    },
    end_in_parens: {
      match: /\bend\b/dgv,
      name: "keyword.operator.symbols.matlab"
    },
    function: {
      patterns: [
        {
          begin: /^(\p{space}*)(function)\p{space}+(?:(?:(\[)([^\]]*)(\])|([A-Za-z][0-9A-Z_a-z]*))\p{space}*=\p{space}*)?([A-Za-z][0-9A-Z_a-z]*(\.[A-Za-z][0-9A-Z_a-z]*)*)\p{space}*/dgv,
          beginCaptures: {
            "2": { name: "storage.type.function.matlab" },
            "3": { name: "punctuation.definition.arguments.begin.matlab" },
            "4": {
              patterns: [
                {
                  match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
                  name: "variable.parameter.output.matlab"
                }
              ]
            },
            "5": { name: "punctuation.definition.arguments.end.matlab" },
            "6": { name: "variable.parameter.output.function.matlab" },
            "7": { name: "entity.name.function.matlab" }
          },
          end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b(\p{space}*\n)?/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.function.matlab" }
          },
          name: "meta.function.matlab",
          patterns: [
            {
              begin: {
                G: [/￿\(/dgv, /\(/dgvy]
              },
              end: /\)/dgv,
              name: "meta.arguments.function.matlab",
              patterns: [
                { include: "#line_continuation" },
                {
                  match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
                  name: "variable.parameter.input.matlab"
                }
              ]
            },
            {
              begin: /^(\p{space}*)(arguments)\b([^\%]*)\p{space}*(\([^\)]*\))?\p{space}*((?=\n?$)|(?=%))/dgv,
              beginCaptures: {
                "2": { name: "keyword.control.arguments.matlab" },
                "3": {
                  patterns: [
                    {
                      match: /[A-Za-z][0-9A-Z_a-z]*/dgv,
                      name: "variable.parameter.arguments.matlab"
                    }
                  ]
                }
              },
              end: /\p{space}*(?:^|[\,\;\p{space}])(end)\b/dgv,
              endCaptures: {
                "1": { name: "keyword.control.end.arguments.matlab" }
              },
              name: "meta.arguments.matlab",
              patterns: [
                { include: "#validators" },
                { include: "$self" }
              ]
            },
            { include: "$self" }
          ]
        }
      ]
    },
    global_persistent: {
      captures: {
        "1": { name: "keyword.control.globalpersistent.matlab" }
      },
      match: /^\p{space}*(global|persistent)\b/dgv,
      name: "meta.globalpersistent.matlab"
    },
    indexing_curly_brackets: {
      Comment: "Match identifier{idx, idx, } and stop at newline without ... This helps with partially written code like x{idx ",
      begin: /([A-Za-z][\.0-9A-Z_a-z]*\p{space}*)\{/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "$self" }
          ]
        }
      },
      end: /(\}|(?<!\.\.\.)[^\n]\n)/dgv,
      patterns: [
        { include: "#end_in_parens" },
        { include: "#all_before_command_dual" },
        { include: "#all_after_command_dual" },
        { include: "#end_in_parens" },
        { include: "#block_keywords" }
      ]
    },
    line_continuation: {
      captures: {
        "1": { name: "keyword.operator.symbols.matlab" },
        "2": { name: "comment.line.continuation.matlab" }
      },
      match: /(\.\.\.)([^\n]*)(?=\n?$)/dgv,
      name: "meta.linecontinuation.matlab"
    },
    numbers: {
      match: /(?<=[\(\*-\-\/\:\=\[\\\{\p{space}]|^)\p{Nd}*\.?\p{Nd}+([Ee][\-\+]?\p{Nd})?([[0-9]&&[^\.]])*([ij])?\b/dgv,
      name: "constant.numeric.matlab"
    },
    operators: {
      match: /(?<=\p{space})(==|~=|>=??|<=??|&&??|[\:\|]|\|\||[\-\*\+]|\.\*|\/|\.\/|\\|\.\\|\^|\.\^)(?=\p{space})/dgv,
      name: "keyword.operator.symbols.matlab"
    },
    parens: {
      begin: /\(/dgv,
      end: /(\)|(?<!\.\.\.)[^\n]\n)/dgv,
      patterns: [
        { include: "#end_in_parens" },
        { include: "#all_before_command_dual" },
        { include: "#all_after_command_dual" },
        { include: "#block_keywords" }
      ]
    },
    square_brackets: {
      begin: /\[/dgv,
      end: /\]/dgv,
      patterns: [
        { include: "#all_before_command_dual" },
        { include: "#all_after_command_dual" },
        { include: "#block_keywords" }
      ]
    },
    string: {
      patterns: [
        {
          captures: {
            "1": { name: "string.interpolated.matlab" },
            "2": { name: "punctuation.definition.string.begin.matlab" }
          },
          match: /^\p{space}*((!)[^\n]*(?=\n?$)\n?)/dgv
        },
        {
          begin: /((?<=([\&\(\*-\/\:-\>\[\\\^\{\|\~\p{space}]))|^)'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.matlab" }
          },
          end: /'(?=([\&\(-\/\:-\>\[-\^\{-\~\p{space}]))/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.matlab" }
          },
          name: "string.quoted.single.matlab",
          patterns: [
            {
              match: /''/dgv,
              name: "constant.character.escape.matlab"
            },
            {
              match: /'(?=[^\n])/dgv,
              name: "invalid.illegal.unescaped-quote.matlab"
            },
            {
              match: /((%([\-\+0]?\p{Nd}{0,3}(\.\p{Nd}{1,3})?)([EGc-gs]|(([bt])?([Xoux]))))|%%|\\([\\bfnrt]))/dgv,
              name: "constant.character.escape.matlab"
            }
          ]
        },
        {
          begin: /((?<=([\&\(\*-\/\:-\>\[\\\^\{\|\~\p{space}]))|^)"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.matlab" }
          },
          end: /"(?=([\&\(-\/\:-\>\[-\^\{-\~\p{space}]))/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.matlab" }
          },
          name: "string.quoted.double.matlab",
          patterns: [
            {
              match: /""/dgv,
              name: "constant.character.escape.matlab"
            },
            {
              match: /"(?=[^\n])/dgv,
              name: "invalid.illegal.unescaped-quote.matlab"
            }
          ]
        }
      ]
    },
    transpose: {
      match: /\.'/dgv,
      name: "keyword.operator.transpose.matlab"
    },
    validator_strings: {
      patterns: [
        {
          patterns: [
            {
              begin: /((?<=([\&\(\*-\/\:-\>\[\\\^\{\|\~\p{space}]))|^)'/dgv,
              end: /'(?=([\&\(-\/\:-\>\[-\^\{-\~\p{space}]))/dgv,
              name: "storage.type.matlab",
              patterns: [
                {
                  match: /''/dgv
                },
                {
                  match: /'(?=[^\n])/dgv
                },
                {
                  match: /([^']+)/dgv
                }
              ]
            },
            {
              begin: /((?<=([\&\(\*-\/\:-\>\[\\\^\{\|\~\p{space}]))|^)"/dgv,
              end: /"(?=([\&\(-\/\:-\>\[-\^\{-\~\p{space}]))/dgv,
              name: "storage.type.matlab",
              patterns: [
                {
                  match: /""/dgv
                },
                {
                  match: /"(?=[^\n])/dgv
                },
                {
                  match: /[^"]+/dgv
                }
              ]
            }
          ]
        }
      ]
    },
    validators: {
      begin: /\p{space}*;?\p{space}*([A-Za-z][\.0-9\?A-Z_a-z]*)/dgv,
      end: /([\n\%\;\=][^\n]*)/dgv,
      endCaptures: {
        "1": {
          patterns: [
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "$self" }
                  ]
                }
              },
              match: /(%[^\n]*)/dgv
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "$self" }
                  ]
                }
              },
              match: /(=[^\;]*)/dgv
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "#validators" }
                  ]
                }
              },
              match: /([\n\;]\p{space}*[A-Za-z][^\n]*)/dgv
            },
            { include: "$self" }
          ]
        }
      },
      patterns: [
        { include: "#line_continuation" },
        {
          match: /\p{space}*(\([^\)]*\))/dgv,
          name: "storage.type.matlab"
        },
        {
          match: /([A-Za-z][\.0-9A-Z_a-z]*)/dgv,
          name: "storage.type.matlab"
        },
        { include: "#braced_validator_list" }
      ]
    },
    variables: {
      match: /(?<!\.)\b(nargin|nargout|varargin|varargout)\b/dgv,
      name: "variable.other.function.matlab"
    }
  },
  dependencies: []
};
