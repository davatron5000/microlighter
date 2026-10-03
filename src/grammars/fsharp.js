export default {
  name: "fsharp",
  displayName: "F#",
  aliases: [
    "f#",
    "fs"
  ],
  scopeName: "source.fsharp",
  patterns: [
    { include: "#compiler_directives" },
    { include: "#comments" },
    { include: "#constants" },
    { include: "#strings" },
    { include: "#chars" },
    { include: "#double_tick" },
    { include: "#definition" },
    { include: "#abstract_definition" },
    { include: "#attributes" },
    { include: "#modules" },
    { include: "#anonymous_functions" },
    { include: "#du_declaration" },
    { include: "#record_declaration" },
    { include: "#records" },
    { include: "#strp_inlined" },
    { include: "#keywords" },
    { include: "#cexprs" },
    { include: "#text" }
  ],
  repository: {
    abstract_definition: {
      begin: /\b(static\p{space}+)?(abstract)\p{space}+(member)?(\p{space}+\[<[^\n]*>\])?\p{space}*([\,\.0-9_\`\p{Alpha}\p{space}]+)(<)?/dgv,
      beginCaptures: {
        "1": { name: "keyword.fsharp" },
        "2": { name: "keyword.fsharp" },
        "3": { name: "keyword.fsharp" },
        "4": { name: "support.function.attribute.fsharp" },
        "5": { name: "keyword.symbol.fsharp" }
      },
      end: /\p{space}*(with)\b|=|(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "keyword.fsharp" }
      },
      name: "abstract.definition.fsharp",
      patterns: [
        { include: "#comments" },
        { include: "#common_declaration" },
        {
          captures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "variable.parameter.fsharp" },
            "3": { name: "keyword.symbol.fsharp" },
            "4": { name: "entity.name.type.fsharp" }
          },
          match: /(\??)([ '\.0-9\^_\`\p{Alpha}]+)\p{space}*(:)((?!with\b)\b([ '\.0-9\^_\`\p{L}\p{M}\p{N}\p{Pc}]+))?/dgv
        },
        {
          captures: {
            "1": { name: "entity.name.type.fsharp" }
          },
          comments: "Here we need the \\w modifier in order to check that the words isn't blacklisted",
          match: /(?!with|get|set\b)\p{space}*(['\.0-9\^_\`\p{L}\p{M}\p{N}\p{Pc}]+)/dgv
        },
        { include: "#keywords" }
      ]
    },
    anonymous_functions: {
      patterns: [
        {
          begin: /\b(fun)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" }
          },
          end: /(->)/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.arrow.fsharp" }
          },
          name: "function.anonymous",
          patterns: [
            { include: "#comments" },
            {
              begin: /(\()/dgv,
              beginCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              end: /\p{space}*(?=(->))/dgv,
              endCaptures: {
                "1": { name: "keyword.symbol.arrow.fsharp" }
              },
              patterns: [
                { include: "#member_declaration" }
              ]
            },
            { include: "#variables" }
          ]
        }
      ]
    },
    anonymous_record_declaration: {
      begin: /(\{\|)/dgv,
      beginCaptures: {
        "1": { name: "keyword.symbol.fsharp" }
      },
      end: /(\|\})/dgv,
      endCaptures: {
        "1": { name: "keyword.symbol.fsharp" }
      },
      patterns: [
        {
          captures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          match: /[ '0-9\^_\`\p{Alpha}]+(:)/dgv
        },
        {
          captures: {
            "1": { name: "entity.name.type.fsharp" }
          },
          match: /([ '0-9\^_\`\p{Alpha}]+)/dgv
        },
        { include: "#anonymous_record_declaration" },
        { include: "#keywords" }
      ]
    },
    attributes: {
      patterns: [
        {
          begin: /\[</dgv,
          end: />?\]/dgv,
          name: "support.function.attribute.fsharp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    cexprs: {
      patterns: [
        {
          captures: {
            "0": { name: "keyword.fsharp" }
          },
          match: /\b(async|seq|promise|task|maybe|asyncMaybe|controller|scope|application|pipeline)(?=\p{space}*\{)/dgv,
          name: "cexpr.fsharp"
        }
      ]
    },
    chars: {
      patterns: [
        {
          captures: {
            "1": { name: "string.quoted.single.fsharp" }
          },
          match: /('\\?[^\n]')/dgv,
          name: "char.fsharp"
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /^\p{space}*(\(\*\*(?!\)))((?!\*\))[^\n])*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "comment.block.fsharp" }
          },
          name: "comment.block.markdown.fsharp",
          patterns: [
            { include: "text.html.markdown" }
          ],
          while: /^(?!\p{space}*(\*)+\)\p{space}*(?=\n?$))/dgv,
          whileCaptures: {
            "1": { name: "comment.block.fsharp" }
          }
        },
        {
          begin: /(\(\*(?!\)))/dgv,
          beginCaptures: {
            "1": { name: "comment.block.fsharp" }
          },
          end: /(\*+\))/dgv,
          endCaptures: {
            "1": { name: "comment.block.fsharp" }
          },
          name: "comment.block.fsharp",
          patterns: [
            {
              comments: "Capture // when inside of (* *) like that the rule which capture comments starting by // is not trigger. See https://github.com/ionide/ionide-fsgrammar/issues/155",
              match: /\/\//dgv,
              name: "fast-capture.comment.line.double-slash.fsharp"
            },
            {
              comments: "Capture (*) when inside of (* *) so that it doesn't prematurely end the comment block.",
              match: /\(\*\)/dgv,
              name: "fast-capture.comment.line.mul-operator.fsharp"
            },
            { include: "#comments" }
          ]
        },
        {
          captures: {
            "1": { name: "comment.block.fsharp" }
          },
          match: /((?<!\()(\*)+\))/dgv,
          name: "comment.block.markdown.fsharp.end"
        },
        {
          begin: /(?<![\!\%\&\+-\/\<-\@\^\|])\/\/\/(?!\/)/dgv,
          name: "comment.line.markdown.fsharp",
          patterns: [
            { include: "text.html.markdown" }
          ],
          while: /(?<![\!\%\&\+-\/\<-\@\^\|])\/\/\/(?!\/)/dgv
        },
        {
          match: /(?<![\!\%\&\+-\/\<-\@\^\|])\/\/([^\n]*)(?=\n?$)/dgv,
          name: "comment.line.double-slash.fsharp"
        }
      ]
    },
    common_binding_definition: {
      patterns: [
        { include: "#comments" },
        { include: "#attributes" },
        {
          begin: /(:)\p{space}*(\()\p{space}*((?:static |)member)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "keyword.symbol.fsharp" },
            "3": { name: "keyword.fsharp" }
          },
          comments: "SRTP syntax support",
          end: /(\))\p{space}*((?=,)|(?==))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /(\^['\.0-9_\p{Alpha}]+)/dgv
            },
            { include: "#variables" },
            { include: "#keywords" }
          ]
        },
        {
          begin: /(:)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "keyword.symbol.fsharp" }
          },
          end: /(\)\p{space}*(([ '\.0-9\?\^_\`\p{Alpha}]*)))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "entity.name.type.fsharp" }
          },
          patterns: [
            { include: "#tuple_signature" }
          ]
        },
        {
          begin: /(:)\p{space}*(\^['\.0-9_\p{Alpha}]+)\p{space}*(when)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "entity.name.type.fsharp" },
            "3": { name: "keyword.fsharp" }
          },
          end: /(?=:)/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              match: /\b(and|when|or)\b/dgv,
              name: "keyword.fsharp"
            },
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /(['\.0-9\^_\p{Alpha}]+)/dgv
            },
            {
              match: /([\(\)])/dgv,
              name: "keyword.symbol.fsharp"
            }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "entity.name.type.fsharp" },
            "4": { name: "entity.name.type.fsharp" }
          },
          match: /(:)\p{space}*([ '\.0-9\?\^_\`\p{Alpha}]+)(\|\p{space}*(null))?/dgv
        },
        {
          captures: {
            "1": { name: "keyword.symbol.arrow.fsharp" },
            "2": { name: "keyword.symbol.fsharp" },
            "3": { name: "entity.name.type.fsharp" }
          },
          match: /(->)\p{space}*(\()?\p{space}*([ '\.0-9\?\^_\`\p{Alpha}]+)*/dgv
        },
        {
          begin: /(\*)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "keyword.symbol.fsharp" }
          },
          end: /(\)\p{space}*(([ '\.0-9\?\^_\`\p{Alpha}]+))*)/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "entity.name.type.fsharp" }
          },
          patterns: [
            { include: "#tuple_signature" }
          ]
        },
        {
          begin: /(\*)(\p{space}*([ '\.0-9\?\^_\`\p{Alpha}]+))*/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "entity.name.type.fsharp" }
          },
          end: /(?==)|(?=\))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            { include: "#tuple_signature" }
          ]
        },
        {
          begin: /(<+(?!\p{space}*\)))/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          beginComment: "The group (?![[:space:]]*\\) is for protection against overload operator. static member (<)",
          end: /((?<!:)>|\))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          endComment: "The group (?<!:) prevent us from stopping on :> when using SRTP synthax",
          patterns: [
            { include: "#generic_declaration" }
          ]
        },
        { include: "#anonymous_record_declaration" },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            { include: "#record_signature" }
          ]
        },
        { include: "#definition" },
        { include: "#variables" },
        { include: "#keywords" }
      ]
    },
    common_declaration: {
      patterns: [
        {
          begin: /\p{space}*(->)\p{space}*([ '\.0-9\^_\`\p{Alpha}]+)(<)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.arrow.fsharp" },
            "2": { name: "entity.name.type.fsharp" },
            "3": { name: "keyword.symbol.fsharp" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /([ '\.0-9\^_\`\p{Alpha}]+)/dgv
            },
            { include: "#keywords" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.symbol.arrow.fsharp" },
            "2": { name: "entity.name.type.fsharp" }
          },
          match: /\p{space}*(->)\p{space}*(?!with|get|set\b)\b(['\.0-9\^_\`\p{L}\p{M}\p{N}\p{Pc}]+)/dgv
        },
        { include: "#anonymous_record_declaration" },
        {
          begin: /(\??)([ '\.0-9\^_\`\p{Alpha}]+)\p{space}*(:)(\p{space}*([ '\.0-9\?\^_\`\p{Alpha}]+)(<))/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "variable.parameter.fsharp" },
            "3": { name: "keyword.symbol.fsharp" },
            "4": { name: "keyword.symbol.fsharp" },
            "5": { name: "entity.name.type.fsharp" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /([ '\.0-9\^_\`\p{Alpha}]+)/dgv
            },
            { include: "#keywords" }
          ]
        }
      ]
    },
    compiler_directives: {
      patterns: [
        {
          captures: {},
          match: /\p{space}?(#(?:if|elif|elseif|else|endif|light|nowarn|warnon))/dgv,
          name: "keyword.control.directive.fsharp"
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\(\)/dgv,
          name: "keyword.symbol.fsharp"
        },
        {
          match: /\b-?[0-9][0-9_]*((\.(?!\.)([0-9][0-9_]*([Ee][\-\+]??[0-9][0-9_]*)?)?)|([Ee][\-\+]??[0-9][0-9_]*))/dgv,
          name: "constant.numeric.float.fsharp"
        },
        {
          match: /\b(-?((0([Xx])\p{AHex}[_\p{AHex}]*)|(0([Oo])[0-7][0-7_]*)|(0([Bb])[01][01_]*)|([0-9][0-9_]*)))/dgv,
          name: "constant.numeric.integer.nativeint.fsharp"
        },
        {
          match: /\b(true|false)\b/dgv,
          name: "constant.language.boolean.fsharp"
        },
        {
          match: /\b(null|void)\b/dgv,
          name: "constant.other.fsharp"
        }
      ]
    },
    definition: {
      patterns: [
        {
          begin: /\b(let mutable|static let mutable|static let|let inline|let|and inline|and|member val|member inline|static member inline|static member val|static member|default|member|override|let!)(\p{space}+rec|mutable)?(\p{space}+\[<[^\n]*>\])?\p{space}*(private|internal|public)?\p{space}+(\[[^\-\=]*\]|[_\p{Alpha}]([\.0-9_\p{Alpha}]+)*|``[_\p{Alpha}]([\.0-9_\`\p{Alpha}\p{space}]+|(?<=,)\p{space})*)?/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" },
            "2": { name: "keyword.fsharp" },
            "3": { name: "support.function.attribute.fsharp" },
            "4": { name: "storage.modifier.fsharp" },
            "5": { name: "variable.fsharp" }
          },
          end: /\p{space}*((with(?: inline|))\b|(=|\n+=|(?<==)))/dgv,
          endCaptures: {
            "2": { name: "keyword.fsharp" },
            "3": { name: "keyword.symbol.fsharp" }
          },
          name: "binding.fsharp",
          patterns: [
            { include: "#common_binding_definition" }
          ]
        },
        {
          begin: /\b(use!??|and!??)\p{space}+(\[[^\-\=]*\]|[_\p{Alpha}]([\.0-9_\p{Alpha}]+)*|``[_\p{Alpha}]([\.0-9_\`\p{Alpha}\p{space}]+|(?<=,)\p{space})*)?/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" }
          },
          end: /\p{space}*(=)/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          name: "binding.fsharp",
          patterns: [
            { include: "#common_binding_definition" }
          ]
        },
        {
          begin: /(?<=with|and)\p{space}*\b(([gs]et)\p{space}*(?=\())(\[[^\-\=]*\]|[_\p{Alpha}]([\.0-9_\p{Alpha}]+)*|``[_\p{Alpha}]([\.0-9_\`\p{Alpha}\p{space}]+|(?<=,)\p{space})*)?/dgv,
          beginCaptures: {
            "4": { name: "variable.fsharp" }
          },
          end: /\p{space}*(=|\n+=|(?<==))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          name: "binding.fsharp",
          patterns: [
            { include: "#common_binding_definition" }
          ]
        },
        {
          begin: /\b(static val mutable|val mutable|val inline|val)(\p{space}+rec|mutable)?(\p{space}+\[<[^\n]*>\])?\p{space}*(private|internal|public)?\p{space}+(\[[^\-\=]*\]|[_\p{Alpha}]([\,\.0-9_\p{Alpha}]+)*|``[_\p{Alpha}]([\,\.0-9_\`\p{Alpha}\p{space}]+|(?<=,)\p{space})*)?/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" },
            "2": { name: "keyword.fsharp" },
            "3": { name: "support.function.attribute.fsharp" },
            "4": { name: "storage.modifier.fsharp" },
            "5": { name: "variable.fsharp" }
          },
          end: /\n(?=\n?$)/dgv,
          name: "binding.fsharp",
          patterns: [
            { include: "#common_binding_definition" }
          ]
        },
        {
          begin: /\b(new)\b\p{space}+(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" },
            "2": { name: "keyword.symbol.fsharp" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          name: "binding.fsharp",
          patterns: [
            { include: "#common_binding_definition" }
          ]
        }
      ]
    },
    double_tick: {
      patterns: [
        {
          captures: {
            "1": { name: "string.quoted.single.fsharp" },
            "2": { name: "variable.other.binding.fsharp" },
            "3": { name: "string.quoted.single.fsharp" }
          },
          match: /(``)([^\`]*)(``)/dgv,
          name: "variable.other.binding.fsharp"
        }
      ]
    },
    du_declaration: {
      patterns: [
        {
          begin: /\b(of)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" }
          },
          end: /(?=\n?$)|(\|)/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          name: "du_declaration.fsharp",
          patterns: [
            { include: "#comments" },
            {
              captures: {
                "1": { name: "variable.parameter.fsharp" },
                "2": { name: "keyword.symbol.fsharp" },
                "3": { name: "entity.name.type.fsharp" }
              },
              match: /(['\.0-9\<\>\^_\`\p{Alpha}]+|``[ '\.0-9\<\>\^_\p{Alpha}]+``)\p{space}*(:)\p{space}*(['\.0-9\<\>\^_\`\p{Alpha}]+|``[ '\.0-9\<\>\^_\p{Alpha}]+``)/dgv
            },
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /(``([ '\.0-9\^_\p{Alpha}]+)``|['\.0-9\^_\`\p{Alpha}]+)/dgv
            },
            { include: "#anonymous_record_declaration" },
            { include: "#keywords" }
          ]
        }
      ]
    },
    generic_declaration: {
      patterns: [
        {
          begin: /(:)\p{space}*(\()\p{space}*((?:static |)member)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "keyword.symbol.fsharp" },
            "3": { name: "keyword.fsharp" }
          },
          comments: "SRTP syntax support",
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              begin: /(\()/dgv,
              beginCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              end: /(\))/dgv,
              endCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              patterns: [
                { include: "#member_declaration" }
              ]
            },
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /((['\^])['\.0-9_\p{Alpha}]+)/dgv
            },
            { include: "#variables" },
            { include: "#keywords" }
          ]
        },
        {
          match: /\b(private|to|public|internal|function|yield!?|class|exception|match|delegate|of|new|in|as|if|then|else|elif|for|begin|end|inherit|do|let!|return!?|interface|with|abstract|enum|member|try|finally|and|when|or|use!??|struct|while|mutable|assert|base|done|downcast|downto|extern|fixed|global|lazy|upcast|not)(?!')\b/dgv,
          name: "keyword.fsharp"
        },
        {
          match: /:/dgv,
          name: "keyword.symbol.fsharp"
        },
        { include: "#constants" },
        {
          captures: {
            "1": { name: "entity.name.type.fsharp" }
          },
          match: /((['\^])['\.0-9_\p{Alpha}]+)/dgv
        },
        {
          begin: /(<)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /((['\^])['\.0-9_\p{Alpha}]+)/dgv
            },
            { include: "#tuple_signature" },
            { include: "#generic_declaration" }
          ]
        },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /(([ '\.0-9\?\^_\`\p{Alpha}]+))+/dgv
            },
            { include: "#tuple_signature" }
          ]
        },
        {
          captures: {
            "1": { name: "entity.name.type.fsharp" }
          },
          comments: "Here we need the \\w modifier in order to check that the words are allowed",
          match: /(?!when|and|or\b)\b(['\.0-9\^_\`\p{L}\p{M}\p{N}\p{Pc}]+)/dgv
        },
        {
          captures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          comments: "Prevent captures of `|>` as a keyword when defining custom operator like `<|>`",
          match: /(\|)/dgv
        },
        { include: "#keywords" }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(private|public|internal)\b/dgv,
          name: "storage.modifier"
        },
        {
          match: /\b(private|to|public|internal|function|class|exception|delegate|of|new|as|begin|end|inherit|let!|interface|abstract|enum|member|and|when|or|use!??|struct|mutable|assert|base|done|downcast|downto|extern|fixed|global|lazy|upcast|not)(?!')\b/dgv,
          name: "keyword.fsharp"
        },
        {
          match: /\b(match|yield!??|with|if|then|else|elif|for|in|return!?|try|finally|while|do)(?!')\b/dgv,
          name: "keyword.control"
        },
        {
          match: /(->|<-)/dgv,
          name: "keyword.symbol.arrow.fsharp"
        },
        {
          match: /[\.\?]*(&&&|\|\|\||\^\^\^|~~~|~\+|~-|<<<|>>>|\|>|:>|:\?>|[\]\:\;\[]|<>|[\=\@]|\|\||&&|[\%\&_\{\|\}]|\.\.|[\!\*-\-\/\>\^]|>=|>>|<=??|[\(\)]|<<)[\.\?]*/dgv,
          name: "keyword.symbol.fsharp"
        }
      ]
    },
    member_declaration: {
      patterns: [
        { include: "#comments" },
        { include: "#common_declaration" },
        {
          begin: /(:)\p{space}*(\()\p{space}*((?:static |)member)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "keyword.symbol.fsharp" },
            "3": { name: "keyword.fsharp" }
          },
          comments: "SRTP syntax support",
          end: /(\))\p{space}*((?=,)|(?==))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              begin: /(\()/dgv,
              beginCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              end: /(\))/dgv,
              endCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              patterns: [
                { include: "#member_declaration" }
              ]
            },
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /(\^['\.0-9_\p{Alpha}]+)/dgv
            },
            { include: "#variables" },
            { include: "#keywords" }
          ]
        },
        {
          captures: {
            "1": { name: "entity.name.type.fsharp" }
          },
          match: /(\^['\.0-9_\p{Alpha}]+)/dgv
        },
        {
          match: /\b(and|when|or)\b/dgv,
          name: "keyword.fsharp"
        },
        {
          match: /([\(\)])/dgv,
          name: "keyword.symbol.fsharp"
        },
        {
          captures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "variable.parameter.fsharp" },
            "3": { name: "keyword.symbol.fsharp" },
            "4": { name: "entity.name.type.fsharp" },
            "7": { name: "entity.name.type.fsharp" }
          },
          match: /(\??)(['\.0-9\^_\`\p{Alpha}]+|``[ '\,\.0-\:\^_\`\p{Alpha}]+``)\p{space}*(:?)(\p{space}*([ '\.0-9\<\>\?_\`\p{Alpha}]+))?(\|\p{space}*(null))?/dgv
        },
        { include: "#keywords" }
      ]
    },
    modules: {
      patterns: [
        {
          begin: /\b(?:(namespace global)|(namespace|module)\p{space}*(public|internal|private|rec)?\p{space}+([\`\|\p{Alpha}][ '\.0-9_\p{Alpha}]*))/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" },
            "2": { name: "keyword.fsharp" },
            "3": { name: "storage.modifier.fsharp" },
            "4": { name: "entity.name.section.fsharp" }
          },
          end: /(\p{space}?=|\p{space}|(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          name: "entity.name.section.fsharp",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.separator.namespace-reference.fsharp" },
                "2": { name: "entity.name.section.fsharp" }
              },
              match: /(\.)([A-Z]['0-9_\p{Alpha}]*)/dgv,
              name: "entity.name.section.fsharp"
            }
          ]
        },
        {
          begin: /\b(open(?: type|))\p{space}+([\`\|\p{Alpha}]['0-9_\p{Alpha}]*)(?=(\.[A-Z][0-9_\p{Alpha}]*)*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" },
            "2": { name: "entity.name.section.fsharp" }
          },
          end: /(\p{space}|(?=\n?$))/dgv,
          name: "namespace.open.fsharp",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.separator.namespace-reference.fsharp" },
                "2": { name: "entity.name.section.fsharp" }
              },
              match: /(\.)(\p{Alpha}['0-9_\p{Alpha}]*)/dgv,
              name: "entity.name.section.fsharp"
            },
            { include: "#comments" }
          ]
        },
        {
          begin: /^\p{space}*(module)\p{space}+([A-Z]['0-9_\p{Alpha}]*)\p{space}*(=)\p{space}*([A-Z]['0-9_\p{Alpha}]*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" },
            "2": { name: "entity.name.type.namespace.fsharp" },
            "3": { name: "keyword.symbol.fsharp" },
            "4": { name: "entity.name.section.fsharp" }
          },
          end: /(\p{space}|(?=\n?$))/dgv,
          name: "namespace.alias.fsharp",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.separator.namespace-reference.fsharp" },
                "2": { name: "entity.name.section.fsharp" }
              },
              match: /(\.)([A-Z]['0-9_\p{Alpha}]*)/dgv,
              name: "entity.name.section.fsharp"
            }
          ]
        }
      ]
    },
    record_declaration: {
      patterns: [
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#comments" },
            {
              begin: /(((mutable)\p{space}\p{Alpha}+)|['\.0-9\<\>\^_\`\p{Alpha}]*)\p{space}*((?<!:):(?!:))\p{space}*/dgv,
              beginCaptures: {
                "3": { name: "keyword.fsharp" },
                "4": { name: "keyword.symbol.fsharp" }
              },
              end: /(?=\n?$)|([\;\}])/dgv,
              endCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              patterns: [
                { include: "#comments" },
                {
                  captures: {
                    "1": { name: "entity.name.type.fsharp" }
                  },
                  match: /([ '0-9\^_\`\p{Alpha}]+)/dgv
                },
                { include: "#keywords" }
              ]
            },
            { include: "#compiler_directives" },
            { include: "#constants" },
            { include: "#strings" },
            { include: "#chars" },
            { include: "#double_tick" },
            { include: "#definition" },
            { include: "#attributes" },
            { include: "#anonymous_functions" },
            { include: "#keywords" },
            { include: "#cexprs" },
            { include: "#text" }
          ]
        }
      ]
    },
    record_signature: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "variable.parameter.fsharp" }
          },
          match: /[ '0-9\^_\`\p{Alpha}]+(=)([ '0-9\^_\`\p{Alpha}]+)/dgv
        },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "keyword.symbol.fsharp" },
                "2": { name: "variable.parameter.fsharp" }
              },
              match: /[ '0-9\^_\`\p{Alpha}]+(=)([ '0-9\^_\`\p{Alpha}]+)/dgv
            },
            { include: "#record_signature" }
          ]
        },
        { include: "#keywords" }
      ]
    },
    records: {
      patterns: [
        {
          begin: /\b(type)\p{space}+(private|internal|public)?\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "keyword.fsharp" },
            "2": { name: "storage.modifier.fsharp" }
          },
          end: /\p{space}*((with)|((as)\p{space}+(['0-9\p{Alpha}]+))|(=)|[\n\=]|(\(\)))/dgv,
          endCaptures: {
            "2": { name: "keyword.fsharp" },
            "3": { name: "keyword.fsharp" },
            "4": { name: "keyword.fsharp" },
            "5": { name: "variable.parameter.fsharp" },
            "6": { name: "keyword.symbol.fsharp" },
            "7": { name: "keyword.symbol.fsharp" }
          },
          name: "record.fsharp",
          patterns: [
            { include: "#comments" },
            { include: "#attributes" },
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /(['\.0-9\^_\p{Alpha}]+|``[ '\,\.0-\:\^_\`\p{Alpha}]+``)/dgv
            },
            {
              begin: /(<)/dgv,
              beginCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              end: /((?<!:)>)/dgv,
              endCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              patterns: [
                {
                  captures: {
                    "1": { name: "entity.name.type.fsharp" }
                  },
                  match: /((['\^])``[ \,\.0-\:\^_\`\p{Alpha}]+``|(['\^])[\.0-\:\^_\`\p{Alpha}]+)/dgv
                },
                {
                  match: /\b(interface|with|abstract|and|when|or|not|struct|equality|comparison|unmanaged|delegate|enum)\b/dgv,
                  name: "keyword.fsharp"
                },
                {
                  begin: /(\()/dgv,
                  beginCaptures: {
                    "1": { name: "keyword.symbol.fsharp" }
                  },
                  end: /(\))/dgv,
                  endCaptures: {
                    "1": { name: "keyword.symbol.fsharp" }
                  },
                  patterns: [
                    {
                      captures: {
                        "1": { name: "keyword.fsharp" }
                      },
                      match: /(static member|member|new)/dgv
                    },
                    { include: "#common_binding_definition" }
                  ]
                },
                {
                  captures: {
                    "1": { name: "entity.name.type.fsharp" }
                  },
                  comments: "Here we need the \\w modifier in order to check that the words isn't blacklisted",
                  match: /(['\.0-9\^_\`\p{L}\p{M}\p{N}\p{Pc}]+)/dgv
                },
                { include: "#keywords" }
              ]
            },
            {
              captures: {
                "1": { name: "storage.modifier.fsharp" }
              },
              match: /\p{space}*(private|internal|public)/dgv
            },
            {
              begin: /(\()/dgv,
              beginCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              end: /\p{space}*(?=(=)|[\n\=]|(\(\))|(as))/dgv,
              endCaptures: {
                "1": { name: "keyword.symbol.fsharp" }
              },
              patterns: [
                { include: "#member_declaration" }
              ]
            },
            { include: "#keywords" }
          ]
        }
      ]
    },
    string_formatter: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.format.specifier.fsharp" }
          },
          match: /(%0?-?(\p{Nd}+)?(([at])|(\.\p{Nd}+)?([EFGMefg])|([Xbcdiosux])|([Obs])|(\+?A)))/dgv,
          name: "entity.name.type.format.specifier.fsharp"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /(?=[^\\])(@")/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.fsharp" }
          },
          end: /(")(?!")/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.fsharp" }
          },
          name: "string.quoted.literal.fsharp",
          patterns: [
            {
              match: /"(")/dgv,
              name: "constant.character.string.escape.fsharp"
            }
          ]
        },
        {
          begin: /(?=[^\\])(""")/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.fsharp" }
          },
          end: /(""")/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.fsharp" }
          },
          name: "string.quoted.triple.fsharp",
          patterns: [
            { include: "#string_formatter" }
          ]
        },
        {
          begin: /(?=[^\\])(")/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.fsharp" }
          },
          end: /(")/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.fsharp" }
          },
          name: "string.quoted.double.fsharp",
          patterns: [
            {
              match: /\\(?=\n?$)[\t ]*/dgv,
              name: "punctuation.separator.string.ignore-eol.fsharp"
            },
            {
              match: /\\(["'\\abfnrtv]|([01][0-9][0-9]|2[0-4][0-9]|25[0-5])|(x\p{AHex}{2})|(u\p{AHex}{4})|(U00(0\p{AHex}|10)\p{AHex}{4}))/dgv,
              name: "constant.character.string.escape.fsharp"
            },
            {
              match: /\\(([0-9]{1,3})|(x\P{space}{0,2})|(u\P{space}{0,4})|(U\P{space}{0,8})|\P{space})/dgv,
              name: "invalid.illegal.character.string.fsharp"
            },
            { include: "#string_formatter" }
          ]
        }
      ]
    },
    strp_inlined: {
      patterns: [
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            { include: "#strp_inlined_body" }
          ]
        }
      ]
    },
    strp_inlined_body: {
      patterns: [
        { include: "#comments" },
        { include: "#anonymous_functions" },
        {
          captures: {
            "1": { name: "entity.name.type.fsharp" }
          },
          match: /(\^['\.0-9_\p{Alpha}]+)/dgv
        },
        {
          match: /\b(and|when|or)\b/dgv,
          name: "keyword.fsharp"
        },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            { include: "#strp_inlined_body" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.fsharp" },
            "2": { name: "variable.fsharp" },
            "3": { name: "keyword.symbol.fsharp" }
          },
          match: /((?:static |)member)\p{space}*(['\.0-9\<\>\^_\`\p{Alpha}]+|``[ '\.0-9\<\>\^_\p{Alpha}]+``)\p{space}*(:)/dgv
        },
        { include: "#compiler_directives" },
        { include: "#constants" },
        { include: "#strings" },
        { include: "#chars" },
        { include: "#double_tick" },
        { include: "#keywords" },
        { include: "#text" },
        { include: "#definition" },
        { include: "#attributes" },
        { include: "#keywords" },
        { include: "#cexprs" },
        { include: "#text" }
      ]
    },
    text: {
      patterns: [
        {
          match: /\\/dgv,
          name: "text.fsharp"
        }
      ]
    },
    tuple_signature: {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.type.fsharp" }
          },
          match: /(([ '\.0-9\?\^_\`\p{Alpha}]+))+/dgv
        },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "keyword.symbol.fsharp" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.type.fsharp" }
              },
              match: /(([ '\.0-9\?\^_\`\p{Alpha}]+))+/dgv
            },
            { include: "#tuple_signature" }
          ]
        },
        { include: "#keywords" }
      ]
    },
    variables: {
      patterns: [
        {
          match: /\(\)/dgv,
          name: "keyword.symbol.fsharp"
        },
        {
          captures: {
            "1": { name: "keyword.symbol.fsharp" },
            "2": { name: "variable.parameter.fsharp" }
          },
          match: /(\??)(``[ '\,\.0-\:\^_\`\p{Alpha}]+``|(?!private|struct\b)\b[ '\.0-9\<\>\^_\`\p{L}\p{M}\p{N}\p{Pc}\p{Alpha}]+)/dgv
        }
      ]
    }
  },
  dependencies: [
    "markdown"
  ]
};
