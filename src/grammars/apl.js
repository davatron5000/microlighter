import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "apl",
  displayName: "APL",
  scopeName: "source.apl",
  patterns: [
    {
      match: {
        A: [/￿#![^\n]*(?=\n?$)/dgv, /^#![^\n]*(?=\n?$)/dgv]
      },
      name: "comment.line.shebang.apl"
    },
    { include: "#heredocs" },
    { include: "#main" },
    {
      begin: /^\p{space}*((\))OFF|(\])NEXTFILE)\b([^\n]*)(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.command.eof.apl" },
        "2": { name: "punctuation.definition.command.apl" },
        "3": { name: "punctuation.definition.command.apl" },
        "4": {
          patterns: [
            { include: "#comment" }
          ]
        }
      },
      contentName: "text.embedded.apl",
      end: /(?=N)A/dgv
    },
    {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.round.bracket.begin.apl" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.round.bracket.end.apl" }
      },
      name: "meta.round.bracketed.group.apl",
      patterns: [
        { include: "#main" }
      ]
    },
    {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.square.bracket.begin.apl" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.square.bracket.end.apl" }
      },
      name: "meta.square.bracketed.group.apl",
      patterns: [
        { include: "#main" }
      ]
    },
    {
      begin: /^\p{space}*((\))\P{space}+)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.command.apl" },
        "2": { name: "punctuation.definition.command.apl" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.system.command.apl",
      patterns: [
        { include: "#command-arguments" },
        { include: "#command-switches" },
        { include: "#main" }
      ]
    },
    {
      begin: /^\p{space}*((\])\P{space}+)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.command.apl" },
        "2": { name: "punctuation.definition.command.apl" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.user.command.apl",
      patterns: [
        { include: "#command-arguments" },
        { include: "#command-switches" },
        { include: "#main" }
      ]
    }
  ],
  repository: {
    class: {
      patterns: [
        {
          begin: /(?<=\p{space}|^)((:)Class)\p{space}+('[^']*'?|[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)\p{space}*((:)\p{space}*(?:('[^']*'?|[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)\p{space}*)?)?([^\n]*?)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "meta.class.apl" },
            "1": { name: "keyword.control.class.apl" },
            "2": { name: "punctuation.definition.class.apl" },
            "3": {
              name: "entity.name.type.class.apl",
              patterns: [
                { include: "#strings" }
              ]
            },
            "4": { name: "entity.other.inherited-class.apl" },
            "5": { name: "punctuation.separator.inheritance.apl" },
            "6": {
              patterns: [
                { include: "#strings" }
              ]
            },
            "7": {
              name: "entity.other.class.interfaces.apl",
              patterns: [
                { include: "#csv" }
              ]
            }
          },
          end: /(?<=\p{space}|^)((:)EndClass)(?=\b)/dgv,
          endCaptures: {
            "1": { name: "keyword.control.class.apl" },
            "2": { name: "punctuation.definition.class.apl" }
          },
          patterns: [
            {
              begin: /(?<=\p{space}|^)(:)Field(?=\p{space})/dgv,
              beginCaptures: {
                "0": { name: "keyword.control.field.apl" },
                "1": { name: "punctuation.definition.field.apl" }
              },
              end: /\p{space}*(←[^\n]*)?(?:(?=\n?$)|(?=⍝))/dgv,
              endCaptures: {
                "0": { name: "entity.other.initial-value.apl" },
                "1": {
                  patterns: [
                    { include: "#main" }
                  ]
                }
              },
              name: "meta.field.apl",
              patterns: [
                {
                  match: /(?<=\p{space}|^)Public(?=\p{space}|(?=\n?$))/dgv,
                  name: "storage.modifier.access.public.apl"
                },
                {
                  match: /(?<=\p{space}|^)Private(?=\p{space}|(?=\n?$))/dgv,
                  name: "storage.modifier.access.private.apl"
                },
                {
                  match: /(?<=\p{space}|^)Shared(?=\p{space}|(?=\n?$))/dgv,
                  name: "storage.modifier.shared.apl"
                },
                {
                  match: /(?<=\p{space}|^)Instance(?=\p{space}|(?=\n?$))/dgv,
                  name: "storage.modifier.instance.apl"
                },
                {
                  match: /(?<=\p{space}|^)ReadOnly(?=\p{space}|(?=\n?$))/dgv,
                  name: "storage.modifier.readonly.apl"
                },
                {
                  captures: {
                    "1": {
                      patterns: [
                        { include: "#strings" }
                      ]
                    }
                  },
                  match: /('[^']*'?|[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)/dgv,
                  name: "entity.name.type.apl"
                }
              ]
            },
            { include: "$self" }
          ]
        }
      ]
    },
    "command-arguments": {
      patterns: [
        {
          begin: /\b(?=\P{space})/dgv,
          end: /\b(?=\p{space})/dgv,
          name: "variable.parameter.argument.apl",
          patterns: [
            { include: "#main" }
          ]
        }
      ]
    },
    "command-switches": {
      patterns: [
        {
          begin: /(?<=\p{space})(-)([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)(=)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.delimiter.switch.apl" },
            "2": { name: "entity.name.switch.apl" },
            "3": { name: "punctuation.assignment.switch.apl" }
          },
          end: /\b(?=\p{space})/dgv,
          name: "variable.parameter.switch.apl",
          patterns: [
            { include: "#main" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.delimiter.switch.apl" },
            "2": { name: "entity.name.switch.apl" }
          },
          match: /(?<=\p{space})(-)([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)(?!=)/dgv,
          name: "variable.parameter.switch.apl"
        }
      ]
    },
    comment: {
      patterns: [
        {
          begin: /⍝/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.apl" }
          },
          end: /(?=\n?$)/dgv,
          name: "comment.line.apl"
        }
      ]
    },
    csv: {
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.separator.apl"
        },
        { include: "$self" }
      ]
    },
    definition: {
      patterns: [
        {
          begin: new EmulatedRegExp("^\\p{space}*?(∇)(?:\\p{space}*(?:([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)|\\p{space}*((\\{)(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\})|(\\()(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\))|(\\(\\p{space}*\\{)(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\}\\p{space}*\\))|(\\{\\p{space}*\\()(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\)\\p{space}*\\}))\\p{space}*)\\p{space}*(←))?\\p{space}*(?:([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)\\p{space}*((\\[)\\p{space}*(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*([^\\n]*?)|([^\\]]*))\\p{space}*(\\]))?\\p{space}*?((?<=[\\]\\p{space}])[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*|(\\()(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\)))\\p{space}*(?=;|(?=\\n?$))|(?:([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}+)|((\\{)(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\})|(\\(\\p{space}*\\{)(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\}\\p{space}*\\))|(\\{\\p{space}*\\()(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\)\\p{space}*\\})))?\\p{space}*(?:([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)\\p{space}*((\\[)\\p{space}*(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*([^\\n]*?)|([^\\]]*))\\p{space}*(\\]))?|((\\()(\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)?\\p{space}*([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)\\p{space}*?((\\[)\\p{space}*(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*([^\\n]*?)|([^\\]]*))\\p{space}*(\\]))?\\p{space}*([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)?(\\))))\\p{space}*((?<=[\\]\\p{space}])[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*|\\p{space}*(\\()(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)*(\\)))?)\\p{space}*([^\\;]+)?(((?:(?=(\\p{space}*;(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙⎕Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)+))\\53)+)|([^⍝]+))?\\p{space}*(⍝[^\\n]*)?(?=\\n?$)", "dgv", { hiddenCaptures: [53] }),
          beginCaptures: {
            "0": { name: "entity.function.definition.apl" },
            "1": { name: "keyword.operator.nabla.apl" },
            "2": { name: "entity.function.return-value.apl" },
            "3": { name: "entity.function.return-value.shy.apl" },
            "4": { name: "punctuation.definition.return-value.begin.apl" },
            "5": { name: "punctuation.definition.return-value.end.apl" },
            "6": { name: "punctuation.definition.return-value.begin.apl" },
            "7": { name: "punctuation.definition.return-value.end.apl" },
            "8": { name: "punctuation.definition.return-value.begin.apl" },
            "9": { name: "punctuation.definition.return-value.end.apl" },
            "10": { name: "punctuation.definition.return-value.begin.apl" },
            "11": { name: "punctuation.definition.return-value.end.apl" },
            "12": { name: "keyword.operator.assignment.apl" },
            "13": {
              name: "entity.function.name.apl",
              patterns: [
                { include: "#embolden" }
              ]
            },
            "14": { name: "entity.function.axis.apl" },
            "15": { name: "punctuation.definition.axis.begin.apl" },
            "16": { name: "invalid.illegal.extra-characters.apl" },
            "17": { name: "invalid.illegal.apl" },
            "18": { name: "punctuation.definition.axis.end.apl" },
            "19": { name: "entity.function.arguments.right.apl" },
            "20": { name: "punctuation.definition.arguments.begin.apl" },
            "21": { name: "punctuation.definition.arguments.end.apl" },
            "22": { name: "entity.function.arguments.left.apl" },
            "23": { name: "entity.function.arguments.left.optional.apl" },
            "24": { name: "punctuation.definition.arguments.begin.apl" },
            "25": { name: "punctuation.definition.arguments.end.apl" },
            "26": { name: "punctuation.definition.arguments.begin.apl" },
            "27": { name: "punctuation.definition.arguments.end.apl" },
            "28": { name: "punctuation.definition.arguments.begin.apl" },
            "29": { name: "punctuation.definition.arguments.end.apl" },
            "30": {
              name: "entity.function.name.apl",
              patterns: [
                { include: "#embolden" }
              ]
            },
            "31": { name: "entity.function.axis.apl" },
            "32": { name: "punctuation.definition.axis.begin.apl" },
            "33": { name: "invalid.illegal.extra-characters.apl" },
            "34": { name: "invalid.illegal.apl" },
            "35": { name: "punctuation.definition.axis.end.apl" },
            "36": { name: "entity.function.operands.apl" },
            "37": { name: "punctuation.definition.operands.begin.apl" },
            "38": { name: "entity.function.operands.left.apl" },
            "39": {
              name: "entity.function.name.apl",
              patterns: [
                { include: "#embolden" }
              ]
            },
            "40": { name: "entity.function.axis.apl" },
            "41": { name: "punctuation.definition.axis.begin.apl" },
            "42": { name: "invalid.illegal.extra-characters.apl" },
            "43": { name: "invalid.illegal.apl" },
            "44": { name: "punctuation.definition.axis.end.apl" },
            "45": { name: "entity.function.operands.right.apl" },
            "46": { name: "punctuation.definition.operands.end.apl" },
            "47": { name: "entity.function.arguments.right.apl" },
            "48": { name: "punctuation.definition.arguments.begin.apl" },
            "49": { name: "punctuation.definition.arguments.end.apl" },
            "50": { name: "invalid.illegal.arguments.right.apl" },
            "51": { name: "entity.function.local-variables.apl" },
            "52": {
              patterns: [
                {
                  match: /;/dgv,
                  name: "punctuation.separator.apl"
                }
              ]
            },
            "53": { name: "invalid.illegal.local-variables.apl" },
            "54": { name: "comment.line.apl" }
          },
          end: /^\p{space}*?(?:(∇)|(⍫))\p{space}*?(⍝[^\n]*?)?(?=\n?$)/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.nabla.apl" },
            "2": { name: "keyword.operator.lock.apl" },
            "3": { name: "comment.line.apl" }
          },
          name: "meta.function.apl",
          patterns: [
            {
              captures: {
                "0": { name: "entity.function.local-variables.apl" },
                "1": {
                  patterns: [
                    {
                      match: /;/dgv,
                      name: "punctuation.separator.apl"
                    }
                  ]
                }
              },
              match: new EmulatedRegExp("^\\p{space}*((?:(?=(;(?:\\p{space}*[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙⎕Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*\\p{space}*)+))\\2)+)", "dgv", { hiddenCaptures: [2] }),
              name: "entity.function.definition.apl"
            },
            { include: "$self" }
          ]
        }
      ]
    },
    "embedded-apl": {
      patterns: [
        {
          begin: /(<([\%\?])(?:apl(?=\p{space}+)|=))/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.section.embedded.begin.apl" }
          },
          end: /(?<=\p{space})(2>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.embedded.end.apl" }
          },
          name: "meta.embedded.block.apl",
          patterns: [
            { include: "#main" }
          ]
        }
      ]
    },
    embolden: {
      patterns: [
        {
          match: /[^\n]+/dgv,
          name: "markup.bold.identifier.apl"
        }
      ]
    },
    heredocs: {
      patterns: [
        {
          begin: /^[^\n]*?⎕INP\p{space}+(["'])([^\n]*?[Hh][Tt][Mm][Ll]?[^\n]*?|[Ee][Nn][Dd]-[Oo][Ff]-⎕[Ii][Nn][Pp])\1[^\n]*(?=\n?$)/dgv,
          beginCaptures: {
            "0": {
              patterns: [
                { include: "#main" }
              ]
            }
          },
          contentName: "text.embedded.html.basic",
          end: /^[^\n]*?2[^\n]*?(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "constant.other.apl" }
          },
          name: "meta.heredoc.apl",
          patterns: [
            { include: "text.html.basic" },
            { include: "#embedded-apl" }
          ]
        },
        {
          begin: /^[^\n]*?⎕INP\p{space}+(["'])([^\n]*?(?:[Xx][Mm][Ll]|[Xx][Ssſ][Ll][Tt]|[Ssſ][Vv][Gg]|[Rr][Ssſ][Ssſ])[^\n]*?)\1[^\n]*(?=\n?$)/dgv,
          beginCaptures: {
            "0": {
              patterns: [
                { include: "#main" }
              ]
            }
          },
          contentName: "text.embedded.xml",
          end: /^[^\n]*?2[^\n]*?(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "constant.other.apl" }
          },
          name: "meta.heredoc.apl",
          patterns: [
            { include: "text.xml" },
            { include: "#embedded-apl" }
          ]
        },
        {
          begin: /^[^\n]*?⎕INP\p{space}+(["'])([^\n]*?(?:[Cc][Ssſ][Ssſ]|[Ssſ][Tt][Yy][Ll][Ee][Ssſ][Hh][Ee][Ee][Tt])[^\n]*?)\1[^\n]*(?=\n?$)/dgv,
          beginCaptures: {
            "0": {
              patterns: [
                { include: "#main" }
              ]
            }
          },
          contentName: "source.embedded.css",
          end: /^[^\n]*?2[^\n]*?(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "constant.other.apl" }
          },
          name: "meta.heredoc.apl",
          patterns: [
            { include: "source.css" },
            { include: "#embedded-apl" }
          ]
        },
        {
          begin: /^[^\n]*?⎕INP\p{space}+(["'])([^\n]*?(?:[Jj][Ssſ](?![Oo][Nn])|(?:[Ee][Cc][Mm][Aa]|[Jj]|[Jj][Aa][Vv][Aa])[^\n]?[Ssſ][Cc][Rr][Ii][Pp][Tt])[^\n]*?)\1[^\n]*(?=\n?$)/dgv,
          beginCaptures: {
            "0": {
              patterns: [
                { include: "#main" }
              ]
            }
          },
          contentName: "source.embedded.js",
          end: /^[^\n]*?2[^\n]*?(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "constant.other.apl" }
          },
          name: "meta.heredoc.apl",
          patterns: [
            { include: "source.js" },
            { include: "#embedded-apl" }
          ]
        },
        {
          begin: /^[^\n]*?⎕INP\p{space}+(["'])([^\n]*?[Jj][Ssſ][Oo][Nn][^\n]*?)\1[^\n]*(?=\n?$)/dgv,
          beginCaptures: {
            "0": {
              patterns: [
                { include: "#main" }
              ]
            }
          },
          contentName: "source.embedded.json",
          end: /^[^\n]*?2[^\n]*?(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "constant.other.apl" }
          },
          name: "meta.heredoc.apl",
          patterns: [
            { include: "source.json" },
            { include: "#embedded-apl" }
          ]
        },
        {
          begin: /^[^\n]*?⎕INP\p{space}+(["'])((?:[Rr][Aa][Ww]|[Pp][Ll][Aa][Ii][Nn])?\p{space}*[Tt][Ee]?[Xx][Tt])\1[^\n]*(?=\n?$)/dgv,
          beginCaptures: {
            "0": {
              patterns: [
                { include: "#main" }
              ]
            }
          },
          contentName: "text.embedded.plain",
          end: /^[^\n]*?2[^\n]*?(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "constant.other.apl" }
          },
          name: "meta.heredoc.apl",
          patterns: [
            { include: "#embedded-apl" }
          ]
        },
        {
          begin: /^[^\n]*?⎕INP\p{space}+(["'])([^\n]*?)\1[^\n]*(?=\n?$)/dgv,
          beginCaptures: {
            "0": {
              patterns: [
                { include: "#main" }
              ]
            }
          },
          end: /^[^\n]*?2[^\n]*?(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "constant.other.apl" }
          },
          name: "meta.heredoc.apl",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    label: {
      patterns: [
        {
          captures: {
            "1": { name: "entity.label.name.apl" },
            "2": { name: "punctuation.definition.label.end.apl" }
          },
          match: /^\p{space}*([A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*)(:)/dgv,
          name: "meta.label.apl"
        }
      ]
    },
    lambda: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.lambda.begin.apl" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.lambda.end.apl" }
      },
      name: "meta.lambda.function.apl",
      patterns: [
        { include: "#main" },
        { include: "#lambda-variables" }
      ]
    },
    "lambda-variables": {
      patterns: [
        {
          match: /⍺⍺/dgv,
          name: "constant.language.lambda.operands.left.apl"
        },
        {
          match: /⍵⍵/dgv,
          name: "constant.language.lambda.operands.right.apl"
        },
        {
          match: /[⍶⍺]/dgv,
          name: "constant.language.lambda.arguments.left.apl"
        },
        {
          match: /[⍵⍹]/dgv,
          name: "constant.language.lambda.arguments.right.apl"
        },
        {
          match: /χ/dgv,
          name: "constant.language.lambda.arguments.axis.apl"
        },
        {
          match: /∇∇/dgv,
          name: "constant.language.lambda.operands.self.operator.apl"
        },
        {
          match: /∇/dgv,
          name: "constant.language.lambda.operands.self.function.apl"
        },
        {
          match: /λ/dgv,
          name: "constant.language.lambda.symbol.apl"
        }
      ]
    },
    main: {
      patterns: [
        { include: "#class" },
        { include: "#definition" },
        { include: "#comment" },
        { include: "#label" },
        { include: "#sck" },
        { include: "#strings" },
        { include: "#number" },
        { include: "#lambda" },
        { include: "#sysvars" },
        { include: "#symbols" },
        { include: "#name" }
      ]
    },
    name: {
      patterns: [
        {
          match: /[A-Z_a-zÀ-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ][0-9A-Z_a-z¯À-ÖØ-Ýß-öø-üþ∆⍙Ⓐ-Ⓩ]*/dgv,
          name: "variable.other.readwrite.apl"
        }
      ]
    },
    number: {
      patterns: [
        {
          match: /¯?[0-9][0-9A-Za-z¯]*(?:\.[0-9Ee¯][0-9A-Za-z¯]*)*|¯?\.[0-9Ee][0-9A-Za-z¯]*/dgv,
          name: "constant.numeric.apl"
        }
      ]
    },
    sck: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.sck.begin.apl" }
          },
          match: /(?<=\p{space}|^)(:)[A-Za-z]+/dgv,
          name: "keyword.control.sck.apl"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.apl" }
          },
          end: /'|(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.apl" }
          },
          name: "string.quoted.single.apl",
          patterns: [
            {
              match: /[^']*[^\n\r'\\](?=\n?$)/dgv,
              name: "invalid.illegal.string.apl"
            }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.apl" }
          },
          end: /"|(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.apl" }
          },
          name: "string.quoted.double.apl",
          patterns: [
            {
              match: /[^"]*[^\n\r"\\](?=\n?$)/dgv,
              name: "invalid.illegal.string.apl"
            }
          ]
        }
      ]
    },
    symbols: {
      patterns: [
        {
          match: /(?<=\p{space})←(?=\p{space}|(?=\n?$))/dgv,
          name: "keyword.spaced.operator.assignment.apl"
        },
        {
          match: /(?<=\p{space})→(?=\p{space}|(?=\n?$))/dgv,
          name: "keyword.spaced.control.goto.apl"
        },
        {
          match: /(?<=\p{space})≡(?=\p{space}|(?=\n?$))/dgv,
          name: "keyword.spaced.operator.identical.apl"
        },
        {
          match: /(?<=\p{space})≢(?=\p{space}|(?=\n?$))/dgv,
          name: "keyword.spaced.operator.not-identical.apl"
        },
        {
          match: /\+/dgv,
          name: "keyword.operator.plus.apl"
        },
        {
          match: /[\-−]/dgv,
          name: "keyword.operator.minus.apl"
        },
        {
          match: /×/dgv,
          name: "keyword.operator.times.apl"
        },
        {
          match: /÷/dgv,
          name: "keyword.operator.divide.apl"
        },
        {
          match: /⌊/dgv,
          name: "keyword.operator.floor.apl"
        },
        {
          match: /⌈/dgv,
          name: "keyword.operator.ceiling.apl"
        },
        {
          match: /[\|∣]/dgv,
          name: "keyword.operator.absolute.apl"
        },
        {
          match: /[\*⋆]/dgv,
          name: "keyword.operator.exponent.apl"
        },
        {
          match: /⍟/dgv,
          name: "keyword.operator.logarithm.apl"
        },
        {
          match: /○/dgv,
          name: "keyword.operator.circle.apl"
        },
        {
          match: /!/dgv,
          name: "keyword.operator.factorial.apl"
        },
        {
          match: /∧/dgv,
          name: "keyword.operator.and.apl"
        },
        {
          match: /∨/dgv,
          name: "keyword.operator.or.apl"
        },
        {
          match: /⍲/dgv,
          name: "keyword.operator.nand.apl"
        },
        {
          match: /⍱/dgv,
          name: "keyword.operator.nor.apl"
        },
        {
          match: /</dgv,
          name: "keyword.operator.less.apl"
        },
        {
          match: /≤/dgv,
          name: "keyword.operator.less-or-equal.apl"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.equal.apl"
        },
        {
          match: /≥/dgv,
          name: "keyword.operator.greater-or-equal.apl"
        },
        {
          match: />/dgv,
          name: "keyword.operator.greater.apl"
        },
        {
          match: /≠/dgv,
          name: "keyword.operator.not-equal.apl"
        },
        {
          match: /[\~∼]/dgv,
          name: "keyword.operator.tilde.apl"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.random.apl"
        },
        {
          match: /[∈∊]/dgv,
          name: "keyword.operator.member-of.apl"
        },
        {
          match: /⍷/dgv,
          name: "keyword.operator.find.apl"
        },
        {
          match: /,/dgv,
          name: "keyword.operator.comma.apl"
        },
        {
          match: /⍪/dgv,
          name: "keyword.operator.comma-bar.apl"
        },
        {
          match: /⌷/dgv,
          name: "keyword.operator.squad.apl"
        },
        {
          match: /⍳/dgv,
          name: "keyword.operator.iota.apl"
        },
        {
          match: /⍴/dgv,
          name: "keyword.operator.rho.apl"
        },
        {
          match: /↑/dgv,
          name: "keyword.operator.take.apl"
        },
        {
          match: /↓/dgv,
          name: "keyword.operator.drop.apl"
        },
        {
          match: /⊣/dgv,
          name: "keyword.operator.left.apl"
        },
        {
          match: /⊢/dgv,
          name: "keyword.operator.right.apl"
        },
        {
          match: /⊤/dgv,
          name: "keyword.operator.encode.apl"
        },
        {
          match: /⊥/dgv,
          name: "keyword.operator.decode.apl"
        },
        {
          match: /\//dgv,
          name: "keyword.operator.slash.apl"
        },
        {
          match: /⌿/dgv,
          name: "keyword.operator.slash-bar.apl"
        },
        {
          match: /\\/dgv,
          name: "keyword.operator.backslash.apl"
        },
        {
          match: /⍀/dgv,
          name: "keyword.operator.backslash-bar.apl"
        },
        {
          match: /⌽/dgv,
          name: "keyword.operator.rotate-last.apl"
        },
        {
          match: /⊖/dgv,
          name: "keyword.operator.rotate-first.apl"
        },
        {
          match: /⍉/dgv,
          name: "keyword.operator.transpose.apl"
        },
        {
          match: /⍋/dgv,
          name: "keyword.operator.grade-up.apl"
        },
        {
          match: /⍒/dgv,
          name: "keyword.operator.grade-down.apl"
        },
        {
          match: /⌹/dgv,
          name: "keyword.operator.quad-divide.apl"
        },
        {
          match: /≡/dgv,
          name: "keyword.operator.identical.apl"
        },
        {
          match: /≢/dgv,
          name: "keyword.operator.not-identical.apl"
        },
        {
          match: /⊂/dgv,
          name: "keyword.operator.enclose.apl"
        },
        {
          match: /⊃/dgv,
          name: "keyword.operator.pick.apl"
        },
        {
          match: /∩/dgv,
          name: "keyword.operator.intersection.apl"
        },
        {
          match: /∪/dgv,
          name: "keyword.operator.union.apl"
        },
        {
          match: /⍎/dgv,
          name: "keyword.operator.hydrant.apl"
        },
        {
          match: /⍕/dgv,
          name: "keyword.operator.thorn.apl"
        },
        {
          match: /⊆/dgv,
          name: "keyword.operator.underbar-shoe-left.apl"
        },
        {
          match: /⍸/dgv,
          name: "keyword.operator.underbar-iota.apl"
        },
        {
          match: /¨/dgv,
          name: "keyword.operator.each.apl"
        },
        {
          match: /⍤/dgv,
          name: "keyword.operator.rank.apl"
        },
        {
          match: /⌸/dgv,
          name: "keyword.operator.quad-equal.apl"
        },
        {
          match: /⍨/dgv,
          name: "keyword.operator.commute.apl"
        },
        {
          match: /⍣/dgv,
          name: "keyword.operator.power.apl"
        },
        {
          match: /\./dgv,
          name: "keyword.operator.dot.apl"
        },
        {
          match: /∘/dgv,
          name: "keyword.operator.jot.apl"
        },
        {
          match: /⍠/dgv,
          name: "keyword.operator.quad-colon.apl"
        },
        {
          match: /&/dgv,
          name: "keyword.operator.ampersand.apl"
        },
        {
          match: /⌶/dgv,
          name: "keyword.operator.i-beam.apl"
        },
        {
          match: /⌺/dgv,
          name: "keyword.operator.quad-diamond.apl"
        },
        {
          match: /@/dgv,
          name: "keyword.operator.at.apl"
        },
        {
          match: /◊/dgv,
          name: "keyword.operator.lozenge.apl"
        },
        {
          match: /;/dgv,
          name: "keyword.operator.semicolon.apl"
        },
        {
          match: /¯/dgv,
          name: "keyword.operator.high-minus.apl"
        },
        {
          match: /←/dgv,
          name: "keyword.operator.assignment.apl"
        },
        {
          match: /→/dgv,
          name: "keyword.control.goto.apl"
        },
        {
          match: /⍬/dgv,
          name: "constant.language.zilde.apl"
        },
        {
          match: /⋄/dgv,
          name: "keyword.operator.diamond.apl"
        },
        {
          match: /⍫/dgv,
          name: "keyword.operator.lock.apl"
        },
        {
          match: /⎕/dgv,
          name: "keyword.operator.quad.apl"
        },
        {
          match: /##/dgv,
          name: "constant.language.namespace.parent.apl"
        },
        {
          match: /#/dgv,
          name: "constant.language.namespace.root.apl"
        },
        {
          match: /⌻/dgv,
          name: "keyword.operator.quad-jot.apl"
        },
        {
          match: /⌼/dgv,
          name: "keyword.operator.quad-circle.apl"
        },
        {
          match: /⌾/dgv,
          name: "keyword.operator.circle-jot.apl"
        },
        {
          match: /⍁/dgv,
          name: "keyword.operator.quad-slash.apl"
        },
        {
          match: /⍂/dgv,
          name: "keyword.operator.quad-backslash.apl"
        },
        {
          match: /⍃/dgv,
          name: "keyword.operator.quad-less.apl"
        },
        {
          match: /⍄/dgv,
          name: "keyword.operator.greater.apl"
        },
        {
          match: /⍅/dgv,
          name: "keyword.operator.vane-left.apl"
        },
        {
          match: /⍆/dgv,
          name: "keyword.operator.vane-right.apl"
        },
        {
          match: /⍇/dgv,
          name: "keyword.operator.quad-arrow-left.apl"
        },
        {
          match: /⍈/dgv,
          name: "keyword.operator.quad-arrow-right.apl"
        },
        {
          match: /⍊/dgv,
          name: "keyword.operator.tack-down.apl"
        },
        {
          match: /⍌/dgv,
          name: "keyword.operator.quad-caret-down.apl"
        },
        {
          match: /⍍/dgv,
          name: "keyword.operator.quad-del-up.apl"
        },
        {
          match: /⍏/dgv,
          name: "keyword.operator.vane-up.apl"
        },
        {
          match: /⍐/dgv,
          name: "keyword.operator.quad-arrow-up.apl"
        },
        {
          match: /⍑/dgv,
          name: "keyword.operator.tack-up.apl"
        },
        {
          match: /⍓/dgv,
          name: "keyword.operator.quad-caret-up.apl"
        },
        {
          match: /⍔/dgv,
          name: "keyword.operator.quad-del-down.apl"
        },
        {
          match: /⍖/dgv,
          name: "keyword.operator.vane-down.apl"
        },
        {
          match: /⍗/dgv,
          name: "keyword.operator.quad-arrow-down.apl"
        },
        {
          match: /⍘/dgv,
          name: "keyword.operator.underbar-quote.apl"
        },
        {
          match: /⍚/dgv,
          name: "keyword.operator.underbar-diamond.apl"
        },
        {
          match: /⍛/dgv,
          name: "keyword.operator.underbar-jot.apl"
        },
        {
          match: /⍜/dgv,
          name: "keyword.operator.underbar-circle.apl"
        },
        {
          match: /⍞/dgv,
          name: "keyword.operator.quad-quote.apl"
        },
        {
          match: /⍡/dgv,
          name: "keyword.operator.dotted-tack-up.apl"
        },
        {
          match: /⍢/dgv,
          name: "keyword.operator.dotted-del.apl"
        },
        {
          match: /⍥/dgv,
          name: "keyword.operator.dotted-circle.apl"
        },
        {
          match: /⍦/dgv,
          name: "keyword.operator.stile-shoe-up.apl"
        },
        {
          match: /⍧/dgv,
          name: "keyword.operator.stile-shoe-left.apl"
        },
        {
          match: /⍩/dgv,
          name: "keyword.operator.dotted-greater.apl"
        },
        {
          match: /⍭/dgv,
          name: "keyword.operator.stile-tilde.apl"
        },
        {
          match: /⍮/dgv,
          name: "keyword.operator.underbar-semicolon.apl"
        },
        {
          match: /⍯/dgv,
          name: "keyword.operator.quad-not-equal.apl"
        },
        {
          match: /⍰/dgv,
          name: "keyword.operator.quad-question.apl"
        }
      ]
    },
    sysvars: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.quad.apl" },
            "2": { name: "punctuation.definition.quad-quote.apl" }
          },
          match: /(?:(⎕)|(⍞))[A-Za-z]*/dgv,
          name: "support.system.variable.apl"
        }
      ]
    }
  },
  dependencies: [
    "html",
    "xml",
    "css",
    "javascript",
    "json"
  ]
};
