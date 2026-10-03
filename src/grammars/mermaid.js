import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "mermaid",
  displayName: "Mermaid",
  aliases: [
    "mmd"
  ],
  scopeName: "markdown.mermaid.codeblock",
  patterns: [
    { include: "#mermaid-code-block" },
    { include: "#mermaid-code-block-with-attributes" },
    { include: "#mermaid-ado-code-block" },
    { include: "#mermaid" }
  ],
  repository: {
    mermaid: {
      patterns: [
        {
          begin: /^\p{space}*(architecture-beta)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "4": { name: "string" },
                "5": { name: "keyword.control.mermaid" },
                "6": { name: "string" },
                "7": { name: "punctuation.definition.typeparameters.end.mermaid" },
                "8": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "9": { name: "string" },
                "10": { name: "punctuation.definition.typeparameters.end.mermaid" },
                "11": { name: "keyword.control.mermaid" },
                "12": { name: "variable" }
              },
              match: /\p{space}*(group|service)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\()?([\-\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)?(:)?([\-\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)?(\))?\p{space}*(\[)?([\-\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)?\p{space}*(\])?\p{space}*(in)?\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)?/dgiv
            },
            {
              captures: {
                "1": { name: "variable" },
                "2": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.definition.typeparameters.end.mermaid" },
                "5": { name: "keyword.control.mermaid" },
                "6": { name: "entity.name.function.mermaid" },
                "7": { name: "keyword.control.mermaid" },
                "8": { name: "entity.name.function.mermaid" },
                "9": { name: "keyword.control.mermaid" },
                "10": { name: "variable" },
                "11": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "12": { name: "variable" },
                "13": { name: "punctuation.definition.typeparameters.end.mermaid" }
              },
              match: /\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\{)?\p{space}*(group)?(\})?\p{space}*(:)\p{space}*([BLRT])\p{space}+(<?-->?)\p{space}+([BLRT])\p{space}*(:)\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\{)?\p{space}*(group)?(\})?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "variable" }
              },
              match: /\p{space}*(junction)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(in)?\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)?/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(C4Component)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(Person(?:|_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Person(?:|_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(System(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(System(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.section.group.begin.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.section.group.end.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "variable" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.section.group.end.mermaid" }
              },
              match: /^\p{space}*(Rel|BiRel|Rel_U|Rel_D|Rel_L|Rel_R|Rel_Up|Rel_Down|Rel_Left|Rel_Right)\b(\()?\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(\))?(,\p{space}*)([\p{L}\p{M}\p{N}\p{Pc}]+)(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Rel|BiRel|Rel_U|Rel_D|Rel_L|Rel_R|Rel_Up|Rel_Down|Rel_Left|Rel_Right)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*((?:|Enterprise_|System_)Boundary)\b(\()?\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(\))?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*((?:|Enterprise_|System_)Boundary)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(LAYOUT_TOP_DOWN|LAYOUT_LEFT_RIGHT|LAYOUT_LANDSCAPE|LAYOUT_WITH_LEGEND|SHOW_LEGEND|HIDE_STEREOTYPE)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(UpdateElementStyle)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(UpdateRelStyle)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Add(?:Element|Rel|Boundary|Person|System)Tag)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(Component(?:|Db|Queue|_Ext|Db_Ext|Queue_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)?(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(Component(?:|Db|Queue|_Ext|Db_Ext|Queue_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)?(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Component(?:|Db|Queue|_Ext|Db_Ext|Queue_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Deployment_Node|Node|Node_L|Node_R)\b/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(C4Container)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(Person(?:|_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Person(?:|_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(System(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(System(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(Container(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)?(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Container(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.section.group.begin.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.section.group.end.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "variable" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.section.group.end.mermaid" }
              },
              match: /^\p{space}*(Rel|BiRel|Rel_U|Rel_D|Rel_L|Rel_R|Rel_Up|Rel_Down|Rel_Left|Rel_Right)\b(\()?\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(\))?(,\p{space}*)([\p{L}\p{M}\p{N}\p{Pc}]+)(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Rel|BiRel|Rel_U|Rel_D|Rel_L|Rel_R|Rel_Up|Rel_Down|Rel_Left|Rel_Right)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*((?:|Enterprise_|System_|Container_)Boundary)\b(\()?\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(\))?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*((?:|Enterprise_|System_|Container_)Boundary)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(LAYOUT_TOP_DOWN|LAYOUT_LEFT_RIGHT|LAYOUT_LANDSCAPE|LAYOUT_WITH_LEGEND|SHOW_LEGEND|HIDE_STEREOTYPE)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(UpdateElementStyle)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(UpdateRelStyle)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Deployment_Node|Node|Node_L|Node_R)\b/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(C4Deployment)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(Person(?:|_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Person(?:|_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(System(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(System(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.section.group.begin.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.section.group.end.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "variable" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.section.group.end.mermaid" }
              },
              match: /^\p{space}*(Rel|BiRel|Rel_U|Rel_D|Rel_L|Rel_R|Rel_Up|Rel_Down|Rel_Left|Rel_Right)\b(\()?\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(\))?(,\p{space}*)([\p{L}\p{M}\p{N}\p{Pc}]+)(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Rel|BiRel|Rel_U|Rel_D|Rel_L|Rel_R|Rel_Up|Rel_Down|Rel_Left|Rel_Right)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*((?:|Enterprise_|System_)Boundary)\b(\()?\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(\))?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*((?:|Enterprise_|System_)Boundary)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(LAYOUT_TOP_DOWN|LAYOUT_LEFT_RIGHT|LAYOUT_LANDSCAPE|LAYOUT_WITH_LEGEND|SHOW_LEGEND|HIDE_STEREOTYPE)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(UpdateElementStyle)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(UpdateRelStyle)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Add(?:Element|Rel|Boundary|Person|System)Tag)\b/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(C4Dynamic)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(Person(?:|_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Person(?:|_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(System(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b(\()?([\p{L}\p{M}\p{N}\p{Pc}]+)(\))?(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(System(?:|_Ext|Db|Db_Ext|Queue|Queue_Ext))\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.section.group.begin.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.section.group.end.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "variable" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.section.group.end.mermaid" }
              },
              match: /^\p{space}*(Rel|BiRel|Rel_U|Rel_D|Rel_L|Rel_R|Rel_Up|Rel_Down|Rel_Left|Rel_Right)\b(\()?\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(\))?(,\p{space}*)([\p{L}\p{M}\p{N}\p{Pc}]+)(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Rel|BiRel|Rel_U|Rel_D|Rel_L|Rel_R|Rel_Up|Rel_Down|Rel_Left|Rel_Right)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "constant.numeric.mermaid" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "variable" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "variable" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.separator.comma.mermaid" },
                "12": { name: "string.quoted.double.mermaid" },
                "13": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*(RelIndex)\b(\()?(\p{Nd}+)(\))?(,\p{space}*)([\p{L}\p{M}\p{N}\p{Pc}]+)(,\p{space}*)([\p{L}\p{M}\p{N}\p{Pc}]+)(,\p{space}*)("(?:[^"\\]|\\[^\n])*")(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(RelIndex)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "variable" },
                "4": { name: "punctuation.parenthesis.close.mermaid" },
                "5": { name: "punctuation.separator.comma.mermaid" },
                "6": { name: "string.quoted.double.mermaid" },
                "7": { name: "punctuation.separator.comma.mermaid" },
                "8": { name: "string.quoted.double.mermaid" },
                "9": { name: "punctuation.separator.comma.mermaid" },
                "10": { name: "string.quoted.double.mermaid" },
                "11": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /^\p{space}*((?:|Enterprise_|System_)Boundary)\b(\()?\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(\))?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(,\p{space}*)?("(?:[^"\\]|\\[^\n])*")?(\))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*((?:|Enterprise_|System_)Boundary)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(LAYOUT_TOP_DOWN|LAYOUT_LEFT_RIGHT|LAYOUT_LANDSCAPE|LAYOUT_WITH_LEGEND|SHOW_LEGEND|HIDE_STEREOTYPE)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(UpdateElementStyle)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(UpdateRelStyle)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(Add(?:Element|Rel|Boundary|Person|System)Tag)\b/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(classDiagram)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "punctuation.definition.string.begin.mermaid" },
                "4": { name: "entity.name.type.class.mermaid" },
                "5": { name: "punctuation.definition.string.end.mermaid" },
                "6": { name: "entity.name.type.class.mermaid" },
                "7": { name: "string.quoted.double.mermaid" }
              },
              match: /^\p{space}*(note)\p{space}+(for)\p{space}+(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))\p{space}+("[^"]*")\p{space}*(?=\n?$)/dgiv
            },
            {
              begin: /^\p{space}*(namespace)\p{space}+([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\{)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable.other.namespace.mermaid" },
                "3": { name: "keyword.control.mermaid" }
              },
              end: /^\p{space}*(\})/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  match: /%%[^\n]*/dgv,
                  name: "comment"
                },
                {
                  begin: /(class)\p{space}+(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?)\p{space}*(\{)/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "punctuation.definition.string.begin.mermaid" },
                    "3": { name: "entity.name.type.class.mermaid" },
                    "4": { name: "punctuation.definition.string.end.mermaid" },
                    "5": { name: "entity.name.type.class.mermaid" },
                    "6": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                    "7": { name: "storage.type.mermaid" },
                    "8": { name: "punctuation.definition.typeparameters.end.mermaid" },
                    "9": { name: "keyword.control.mermaid" }
                  },
                  end: /(\})/dgv,
                  endCaptures: {
                    "1": { name: "keyword.control.mermaid" }
                  },
                  patterns: [
                    {
                      match: /%%[^\n]*/dgv,
                      name: "comment"
                    },
                    {
                      begin: /\p{space}([\-\#\+\~])?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)(\()/dgv,
                      beginCaptures: {
                        "1": { name: "keyword.control.mermaid" },
                        "2": { name: "entity.name.function.mermaid" },
                        "3": { name: "punctuation.parenthesis.open.mermaid" }
                      },
                      end: /(\))([\$\*]{0,2})\p{space}?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?(?=\n?$)/dgv,
                      endCaptures: {
                        "1": { name: "punctuation.parenthesis.closed.mermaid" },
                        "2": { name: "keyword.control.mermaid" },
                        "3": { name: "storage.type.mermaid" },
                        "4": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                        "5": { name: "storage.type.mermaid" },
                        "6": { name: "punctuation.definition.typeparameters.end.mermaid" }
                      },
                      patterns: [
                        {
                          captures: {
                            "1": { name: "storage.type.mermaid" },
                            "2": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                            "3": { name: "storage.type.mermaid" },
                            "4": { name: "punctuation.definition.typeparameters.end.mermaid" },
                            "5": { name: "entity.name.variable.parameter.mermaid" }
                          },
                          match: /\p{space}*,?\p{space}*([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?\p{space}?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?/dgv
                        }
                      ]
                    },
                    {
                      captures: {
                        "1": { name: "keyword.control.map.mermaid" },
                        "2": { name: "punctuation.definition.generic.begin.mermaid" },
                        "3": { name: "support.type.primitive.mermaid" },
                        "4": { name: "punctuation.separator.comma.mermaid" },
                        "5": { name: "support.type.primitive.mermaid" },
                        "6": { name: "punctuation.definition.generic.end.mermaid" }
                      },
                      match: /^\p{space}*(map)(~)([^\,\~]+)(,)([^\~]+)(~)\p{space}*(?=\n?$)/dgiv
                    },
                    {
                      captures: {
                        "1": { name: "keyword.control.mermaid" },
                        "2": { name: "storage.type.mermaid" },
                        "3": { name: "entity.name.variable.field.mermaid" }
                      },
                      match: /\p{space}([\-\#\+\~])?\p{space}*((?:\[\]\*?|\*|\*?\*?)[\.\p{L}\p{M}\p{N}\p{Pc}]+(?:\.[\.\p{L}\p{M}\p{N}\p{Pc}]+)*(?:\[\])?)\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\n?$)/dgv
                    },
                    {
                      captures: {
                        "1": { name: "keyword.control.mermaid" },
                        "2": { name: "storage.type.mermaid" },
                        "3": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                        "4": { name: "storage.type.mermaid" },
                        "5": { name: "punctuation.definition.typeparameters.end.mermaid" },
                        "6": { name: "entity.name.variable.field.mermaid" }
                      },
                      match: /\p{space}([\-\#\+\~])?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?\p{space}([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(?=\n?$)/dgv
                    },
                    {
                      captures: {
                        "1": { name: "punctuation.definition.stereotype.begin.mermaid" },
                        "2": { name: "entity.name.tag.stereotype.mermaid" },
                        "3": { name: "punctuation.definition.stereotype.end.mermaid" },
                        "4": { name: "entity.name.type.class.mermaid" }
                      },
                      match: /(<<)([\-\p{L}\p{M}\p{N}\p{Pc}]+)(>>)\p{space}?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?/dgv
                    }
                  ]
                }
              ]
            },
            {
              captures: {
                "1": { name: "punctuation.definition.string.begin.mermaid" },
                "2": { name: "entity.name.type.class.mermaid" },
                "3": { name: "punctuation.definition.string.end.mermaid" },
                "4": { name: "entity.name.type.class.mermaid" },
                "5": { name: "keyword.control.mermaid" },
                "6": { name: "keyword.control.mermaid" },
                "7": { name: "keyword.control.mermaid" },
                "8": { name: "punctuation.definition.string.begin.mermaid" },
                "9": { name: "entity.name.type.class.mermaid" },
                "10": { name: "punctuation.definition.string.end.mermaid" },
                "11": { name: "entity.name.type.class.mermaid" },
                "12": { name: "keyword.control.mermaid" },
                "13": { name: "string" }
              },
              match: /(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))\p{space}*("(?:\p{Nd}+|\*|0[^\n][^\n]\p{Nd}+|1[^\n][^\n]\p{Nd}+|1[^\n][^\n]\*)")?\p{space}*(--o|--\*|<--|-->|<\.\.|\.\.>|<\|\.\.|\.\.\|>|<\|--|--\|>|--\*?|\.\.|\*--|o--)\p{space}*("(?:\p{Nd}+|\*|0[^\n][^\n]\p{Nd}+|1[^\n][^\n]\p{Nd}+|1[^\n][^\n]\*)")?\p{space}*(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))\p{space}*(:)?\p{space}*([^\n]*)(?=\n?$)/dgiv
            },
            {
              captures: {
                "1": { name: "punctuation.definition.string.begin.mermaid" },
                "2": { name: "entity.name.type.class.mermaid" },
                "3": { name: "punctuation.definition.string.end.mermaid" },
                "4": { name: "entity.name.type.class.mermaid" },
                "5": { name: "keyword.control.mermaid" },
                "6": { name: "keyword.control.mermaid" },
                "7": { name: "entity.name.function.mermaid" },
                "8": { name: "punctuation.parenthesis.open.mermaid" },
                "9": { name: "storage.type.mermaid" },
                "10": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "11": { name: "storage.type.mermaid" },
                "12": { name: "punctuation.definition.typeparameters.end.mermaid" },
                "13": { name: "entity.name.variable.parameter.mermaid" },
                "14": { name: "punctuation.parenthesis.closed.mermaid" },
                "15": { name: "keyword.control.mermaid" },
                "16": { name: "storage.type.mermaid" },
                "17": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "18": { name: "storage.type.mermaid" },
                "19": { name: "punctuation.definition.typeparameters.end.mermaid" }
              },
              match: /(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))\p{space}?(:)\p{space}([\-\#\+\~])?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)(\()([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?\p{space}?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(\))([\$\*]{0,2})\p{space}?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?(?=\n?$)/dgv
            },
            {
              captures: {
                "1": { name: "punctuation.definition.string.begin.mermaid" },
                "2": { name: "entity.name.type.class.mermaid" },
                "3": { name: "punctuation.definition.string.end.mermaid" },
                "4": { name: "entity.name.type.class.mermaid" },
                "5": { name: "keyword.control.mermaid" },
                "6": { name: "keyword.control.mermaid" },
                "7": { name: "storage.type.mermaid" },
                "8": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "9": { name: "storage.type.mermaid" },
                "10": { name: "punctuation.definition.typeparameters.end.mermaid" },
                "11": { name: "entity.name.variable.field.mermaid" }
              },
              match: /(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))\p{space}?(:)\p{space}([\-\#\+\~])?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?\p{space}([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(?=\n?$)/dgv
            },
            {
              captures: {
                "1": { name: "punctuation.definition.stereotype.begin.mermaid" },
                "2": { name: "entity.name.tag.stereotype.mermaid" },
                "3": { name: "punctuation.definition.stereotype.end.mermaid" },
                "4": { name: "punctuation.definition.string.begin.mermaid" },
                "5": { name: "entity.name.type.class.mermaid" },
                "6": { name: "punctuation.definition.string.end.mermaid" },
                "7": { name: "entity.name.type.class.mermaid" }
              },
              match: /(<<)([\-\p{L}\p{M}\p{N}\p{Pc}]+)(>>)\p{space}?(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))?/dgv
            },
            {
              begin: /(class)\p{space}+(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?\p{space}?(\{)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.definition.string.begin.mermaid" },
                "3": { name: "entity.name.type.class.mermaid" },
                "4": { name: "punctuation.definition.string.end.mermaid" },
                "5": { name: "entity.name.type.class.mermaid" },
                "6": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "7": { name: "storage.type.mermaid" },
                "8": { name: "punctuation.definition.typeparameters.end.mermaid" },
                "9": { name: "keyword.control.mermaid" }
              },
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  match: /%%[^\n]*/dgv,
                  name: "comment"
                },
                {
                  begin: /\p{space}([\-\#\+\~])?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)(\()/dgv,
                  beginCaptures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "entity.name.function.mermaid" },
                    "3": { name: "punctuation.parenthesis.open.mermaid" }
                  },
                  end: /(\))([\$\*]{0,2})\p{space}?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.parenthesis.closed.mermaid" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "storage.type.mermaid" },
                    "4": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                    "5": { name: "storage.type.mermaid" },
                    "6": { name: "punctuation.definition.typeparameters.end.mermaid" }
                  },
                  patterns: [
                    {
                      captures: {
                        "1": { name: "storage.type.mermaid" },
                        "2": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                        "3": { name: "storage.type.mermaid" },
                        "4": { name: "punctuation.definition.typeparameters.end.mermaid" },
                        "5": { name: "entity.name.variable.parameter.mermaid" }
                      },
                      match: /\p{space}*,?\p{space}*([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?\p{space}?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?/dgv
                    }
                  ]
                },
                {
                  captures: {
                    "1": { name: "keyword.control.map.mermaid" },
                    "2": { name: "punctuation.definition.generic.begin.mermaid" },
                    "3": { name: "support.type.primitive.mermaid" },
                    "4": { name: "punctuation.separator.comma.mermaid" },
                    "5": { name: "support.type.primitive.mermaid" },
                    "6": { name: "punctuation.definition.generic.end.mermaid" }
                  },
                  match: /^\p{space}*(map)(~)([^\,\~]+)(,)([^\~]+)(~)\p{space}*(?=\n?$)/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "storage.type.mermaid" },
                    "3": { name: "entity.name.variable.field.mermaid" }
                  },
                  match: /\p{space}([\-\#\+\~])?\p{space}*((?:\[\]\*?|\*|\*?\*?)[\.\p{L}\p{M}\p{N}\p{Pc}]+(?:\.[\.\p{L}\p{M}\p{N}\p{Pc}]+)*(?:\[\])?)\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\n?$)/dgv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "storage.type.mermaid" },
                    "3": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                    "4": { name: "storage.type.mermaid" },
                    "5": { name: "punctuation.definition.typeparameters.end.mermaid" },
                    "6": { name: "entity.name.variable.field.mermaid" }
                  },
                  match: /\p{space}([\-\#\+\~])?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?\p{space}([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(?=\n?$)/dgv
                },
                {
                  captures: {
                    "1": { name: "punctuation.definition.stereotype.begin.mermaid" },
                    "2": { name: "entity.name.tag.stereotype.mermaid" },
                    "3": { name: "punctuation.definition.stereotype.end.mermaid" },
                    "4": { name: "entity.name.type.class.mermaid" }
                  },
                  match: /(<<)([\-\p{L}\p{M}\p{N}\p{Pc}]+)(>>)\p{space}?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?/dgv
                }
              ]
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.definition.string.begin.mermaid" },
                "3": { name: "entity.name.type.class.mermaid" },
                "4": { name: "punctuation.definition.string.end.mermaid" },
                "5": { name: "entity.name.type.class.mermaid" },
                "6": { name: "punctuation.definition.typeparameters.begin.mermaid" },
                "7": { name: "storage.type.mermaid" },
                "8": { name: "punctuation.definition.typeparameters.end.mermaid" }
              },
              match: /(class)\p{space}+(?:(`)([^\`]+)(`)|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))(~)?([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)?(~)?/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(erDiagram)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "string" },
                "4": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\[)?\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\-\p{L}\p{M}\p{N}\p{Pc}\p{space}]+")?\p{space}*(\])?(?=\n?$)/dgv
            },
            {
              begin: /\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\[)?\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\-\p{L}\p{M}\p{N}\p{Pc}\p{space}]+")?\p{space}*(\])?\p{space}*(\{)/dgv,
              beginCaptures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "string" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "keyword.control.mermaid" }
              },
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  captures: {
                    "1": { name: "storage.type.mermaid" },
                    "2": { name: "variable" },
                    "3": { name: "keyword.control.mermaid" },
                    "4": { name: "string" }
                  },
                  match: /\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+([FPU]K(?:,\p{space}*[FPU]K){0,2})?\p{space}*("[^\n\r"]*")?\p{space}*/dgiv
                },
                {
                  match: /%%[^\n]*/dgv,
                  name: "comment"
                }
              ]
            },
            {
              captures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "variable" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "string" }
              },
              match: /\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*((?:\|o|\|\||\}o|\}\||one or (?:zero|more|many)|zero or (?:one|more|many)|many\([01]\)|only one|0\+|1\+?)(?:[^\n][^\n]|--)(?:o\||\|\||o\{|\|\{|one or (?:zero|more|many)|zero or (?:one|more|many)|many\([01]\)|only one|0\+|1\+?))\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)\p{space}*("[\p{L}\p{M}\p{N}\p{Pc}\p{space}]*"|[\-\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(gantt)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "entity.name.function.mermaid" }
              },
              match: /^\p{space}*(dateFormat)\p{space}+([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "entity.name.function.mermaid" }
              },
              match: /^\p{space}*(axisFormat)\p{space}+([\-\%\.\/\\\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /(tickInterval)\p{space}+(([1-9][0-9]*)(millisecond|second|minute|hour|day|week|month))/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(excludes)\p{space}+((?:[\-\,\p{Nd}\p{space}]|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekends)+)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}+(todayMarker)\p{space}+([^\n]*)(?=\n?$)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(section)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              begin: /^\p{space}([^\n]*)(:)/dgv,
              beginCaptures: {
                "1": { name: "string" },
                "2": { name: "keyword.control.mermaid" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  match: /(crit|done|active|after)/dgv,
                  name: "entity.name.function.mermaid"
                },
                {
                  match: /%%[^\n]*/dgv,
                  name: "comment"
                }
              ]
            }
          ]
        },
        {
          begin: /^\p{space}*(gitGraph)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              begin: /^\p{space}*(commit)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "string" }
                  },
                  match: /\p{space}*(id)(:)\p{space}?("[^\n"]*")/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "entity.name.function.mermaid" }
                  },
                  match: /\p{space}*(type)(:)\p{space}?(NORMAL|REVERSE|HIGHLIGHT)/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "string" }
                  },
                  match: /\p{space}*(tag)(:)\p{space}?("[\!\#-\(\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*")/dgiv
                }
              ]
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" }
              },
              match: /^\p{space}*(checkout)\p{space}*([^"\p{space}]*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "constant.numeric.decimal.mermaid" }
              },
              match: /^\p{space}*(branch)\p{space}*([^"\p{space}]*)\p{space}*(?:(order)(:)\p{space}?(\p{Nd}+))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "string" }
              },
              match: /^\p{space}*(merge)\p{space}*([^"\p{space}]*)\p{space}*(?:(tag)(:)\p{space}?("[^\n"]*"))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "string" }
              },
              match: /^\p{space}*(cherry-pick)\p{space}+(id)(:)\p{space}*("[^\n"]*")/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(graph|flowchart)\p{space}+([ 0-9\p{L}]+)?/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" },
            "2": { name: "entity.name.function.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "string" },
                "5": { name: "keyword.control.mermaid" }
              },
              match: /^\p{space}*(subgraph)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)(\[)("?[\!\#-'\*-\/\:\<-\?\\\^\`\p{L}\p{M}\p{N}\p{Pc}\p{space}]*"?)(\])/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "entity.name.function.mermaid" }
              },
              match: /^\p{space}*(subgraph)\p{space}+([ 0-9\<\>\p{L}]+)/dgv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "entity.name.function.mermaid" }
              },
              match: /^\p{space}*(direction)\p{space}+(RB|BT|RL|TD|LR)/dgiv
            },
            {
              match: /\b(end)\b/dgv,
              name: "keyword.control.mermaid"
            },
            {
              begin: /\b((?:(?!--|==)[\-\p{L}\p{M}\p{N}\p{Pc}])+\b\p{space}*)(\(\[|\[\[|\[\(?|\(+|[\>\{]|\(\()/dgv,
              beginCaptures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "string" }
              },
              end: /(\]\)|\]\]|\)\]|\]|\)+|\}|\)\))/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  begin: /\p{space}*(")/dgv,
                  beginCaptures: {
                    "1": { name: "string" }
                  },
                  end: /(")/dgv,
                  endCaptures: {
                    "1": { name: "string" }
                  },
                  patterns: [
                    {
                      begin: /([^"]*)/dgv,
                      beginCaptures: {
                        "1": { name: "string" }
                      },
                      end: /(?=")/dgv,
                      patterns: [
                        {
                          captures: {
                            "1": { name: "comment" }
                          },
                          match: /([^"]*)/dgv
                        }
                      ]
                    }
                  ]
                },
                {
                  captures: {
                    "1": { name: "string" }
                  },
                  match: /\p{space}*([\!\#-'\*\+\,\.\/\:\;\<\>\?\\\^_\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)/dgv
                }
              ]
            },
            {
              begin: /\p{space}*((?:-?\.{1,4}-|-{2,5}|={2,5})[\>ox]?\|)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              end: /(\|)/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  begin: /\p{space}*(")/dgv,
                  beginCaptures: {
                    "1": { name: "string" }
                  },
                  end: /(")/dgv,
                  endCaptures: {
                    "1": { name: "string" }
                  },
                  patterns: [
                    {
                      begin: /([^"]*)/dgv,
                      beginCaptures: {
                        "1": { name: "string" }
                      },
                      end: /(?=")/dgv,
                      patterns: [
                        {
                          captures: {
                            "1": { name: "comment" }
                          },
                          match: /([^"]*)/dgv
                        }
                      ]
                    }
                  ]
                },
                {
                  captures: {
                    "1": { name: "string" }
                  },
                  match: /\p{space}*([\!\#-'\*\+\,\.\/\:\;\<\>\?\\\^_\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)/dgv
                }
              ]
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" },
                "3": { name: "keyword.control.mermaid" }
              },
              match: /\p{space}*([\<ox]?(?:-{2,5}|={2,5}|-\.{1,3}|-\.))((?:(?!--|==)[\!-'\*-\/\:\<-\?\[-\^\`\p{L}\p{M}\p{N}\p{Pc}\p{space}])*)((?:-{2,5}|={2,5}|\.{1,3}-|\.-)[\>ox]?)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /\p{space}*([\<ox]?(?:-?\.{1,4}-|-{1,4}|={1,4})[\>ox]?)/dgiv
            },
            {
              match: /\b((?:(?!--|==)[\-\p{L}\p{M}\p{N}\p{Pc}])+\b\p{space}*)/dgv,
              name: "variable"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "string" }
              },
              match: /\p{space}*(class)\p{space}+\b([\-\,\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "string" }
              },
              match: /\p{space}*(classDef)\p{space}+\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b\p{space}+\b([\-\#\,\:\;\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "variable" },
                "4": { name: "string" }
              },
              match: /\p{space}*(click)\p{space}+\b([\-\p{L}\p{M}\p{N}\p{Pc}]+\b\p{space}*)(\b[\p{L}\p{M}\p{N}\p{Pc}]+\b)?\p{space}("*[^\n]*")/dgiv
            },
            {
              begin: /\p{space}*(@\{)/dgv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "entity.name.function.mermaid" },
                    "3": { name: "keyword.control.mermaid" }
                  },
                  match: /\p{space}*(shape\p{space}*:)([^\,\}]*)(,)?/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "string" },
                    "3": { name: "keyword.control.mermaid" }
                  },
                  match: /\p{space}*(label\p{space}*:)([^\,\}]*)(,)?/dgiv
                }
              ]
            }
          ]
        },
        {
          begin: /^\p{space}*(mindmap)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /(\p{space}*:::)(\p{space}*[\!-\$\&'\*-\/\;-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "punctuation.parenthesis.open.mermaid" },
                "3": { name: "string" },
                "4": { name: "punctuation.parenthesis.close.mermaid" }
              },
              match: /(\p{space}*::icon)(\p{space}*\()(\p{space}*[\!-\$\&'\*-\/\;-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)(\p{space}*\))/dgiv
            },
            {
              captures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "string" },
                "4": { name: "keyword.control.mermaid" }
              },
              match: /(\p{space}*[\!-\$\&'\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)(\p{space}*\({1,2}|\){1,2}|\{\{|\[)(\p{space}*[\!-\$\&'\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)(\p{space}*\){1,2}|\({1,2}|\}\}|\])/dgv
            },
            {
              match: /^(\p{space}*[\!-\$\&'\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgv,
              name: "string"
            }
          ]
        },
        {
          begin: /^\p{space}*(pie)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              begin: /\p{space}([^\n]*)(:)/dgv,
              beginCaptures: {
                "1": { name: "string" },
                "2": { name: "keyword.control.mermaid" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  match: /%%[^\n]*/dgv,
                  name: "comment"
                }
              ]
            }
          ]
        },
        {
          begin: /^\p{space}*(quadrantChart)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title)\p{space}*([\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              begin: /^\p{space}*([xy]-axis)\p{space}+((?:(?!-->)[\!\#-'\*-\/\=\?\\\p{L}\p{M}\p{N}\p{Pc}\p{space}])*)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "string" }
                  },
                  match: /\p{space}*(-->)\p{space}*([\!\#-'\*-\/\=\?\\\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgv
                }
              ]
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(quadrant-[1-4])\p{space}*([\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              captures: {
                "1": { name: "string" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "constant.numeric.decimal.mermaid" },
                "5": { name: "keyword.control.mermaid" },
                "6": { name: "constant.numeric.decimal.mermaid" },
                "7": { name: "keyword.control.mermaid" }
              },
              match: /\p{space}*([\!\#-'\*-\/\=\?\\\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)\p{space}*(:)\p{space}*(\[)\p{space}*(\p{Nd}\.\p{Nd}+)\p{space}*(,)\p{space}*(\p{Nd}\.\p{Nd}+)\p{space}*(\])/dgv
            }
          ]
        },
        {
          begin: /^\p{space}*(requirementDiagram)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              begin: /^\p{space}*((?:functional|interface|performance|physical)?requirement|designConstraint)\p{space}*([\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)\p{space}*(\{)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "keyword.control.mermaid" }
              },
              end: /\p{space}*(\})/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "variable" }
                  },
                  match: /\p{space}*(id:)\p{space}*([\!\#-'\*\+\,\.\/\:\;\<\>\?\\\^_\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "string" }
                  },
                  match: /\p{space}*(text:)\p{space}*([\!\#-'\*\+\,\.\/\:\;\<\>\?\\\^_\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "entity.name.function.mermaid" }
                  },
                  match: /\p{space}*(risk:)\p{space}*(low|medium|high)\p{space}*(?=\n?$)/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "entity.name.function.mermaid" }
                  },
                  match: /\p{space}*(verifymethod:)\p{space}*(analysis|inspection|test|demonstration)\p{space}*(?=\n?$)/dgiv
                }
              ]
            },
            {
              begin: /^\p{space}*(element)\p{space}*([\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)\p{space}*(\{)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "keyword.control.mermaid" }
              },
              end: /\p{space}*(\})/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "variable" }
                  },
                  match: /\p{space}*(type:)\p{space}*([\!-'\*\+\,\.\/\:\;\<\>\?\\\^_\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "variable" }
                  },
                  match: /\p{space}*(docref:)\p{space}*([\!\#-'\*\+\,\.\/\:\;\<\>\?\\\^_\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)/dgiv
                }
              ]
            },
            {
              captures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "variable" }
              },
              match: /^\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(-)\p{space}*((?:contain|copie|derive|satisfie|verifie|refine|trace)s)\p{space}*(->)\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\n?$)/dgiv
            },
            {
              captures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "variable" }
              },
              match: /^\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(<-)\p{space}*((?:contain|copie|derive|satisfie|verifie|refine|trace)s)\p{space}*(-)\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\n?$)/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(sequenceDiagram)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /(%%|#)[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "string" }
              },
              match: /(title)\p{space}*(:)?\p{space}+(\p{space}*[\!-\/\:\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "string" }
              },
              match: /\p{space}*(participant|actor)\p{space}+((?:(?! as )[\!-\*\.\/\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}])+)\p{space}*(as)?\p{space}([\!-\*\,\.\/\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" }
              },
              match: /\p{space}*((?:de)?activate)\p{space}+\b([\!-\*\.\/\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]+\b\)?\p{space}*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "entity.name.function.mermaid" },
                "3": { name: "variable" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "variable" },
                "6": { name: "keyword.control.mermaid" },
                "7": { name: "string" }
              },
              match: /\p{space}*(Note)\p{space}+((?:left|right)\p{space}of|over)\p{space}+\b([\!-\*\.\/\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]+\b\)?\p{space}*)(,)?(\b[\!-\*\.\/\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]+\b\)?\p{space}*)?(:)(?:\p{space}+([^\#\;]*))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /\p{space}*(loop)(?:\p{space}+([^\#\;]*))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /\p{space}*(end)/dgv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /\p{space}*(alt|else|option|par|and|rect|autonumber|critical|opt)(?:\p{space}+([^\#\;]*))?(?=\n?$)/dgiv
            },
            {
              captures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "variable" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "string" }
              },
              match: /\p{space}*\b([\!-\*\.\/\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]+\b\)?)\p{space}*(-?-[\)\>x]>?[\-\+]?)\p{space}*([\!-\*\.\/\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]+\b\)?)\p{space}*(:)\p{space}*([^\#\;]*)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "entity.name.function.mermaid" },
                "3": { name: "string" }
              },
              match: /\p{space}*(box)\p{space}+(transparent)(?:\p{space}+([^\#\;]*))?/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /\p{space}*(box)(?:\p{space}+([^\#\;]*))?/dgiv
            }
          ]
        },
        {
          begin: /^\p{space}*(stateDiagram(?:-v2)?)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "entity.name.function.mermaid" }
              },
              match: /^\p{space}*(direction)\p{space}+(BT|RL|TB|LR)/dgiv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /\p{space}+(\})\p{space}+/dgv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" }
              },
              match: /\p{space}+(--)\p{space}+/dgv
            },
            {
              match: /^\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)(?=\n?$)/dgv,
              name: "variable"
            },
            {
              captures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "string" }
              },
              match: /([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)\p{space}*(\p{space}*[^\:]+)/dgv
            },
            {
              begin: /^\p{space}*(state)\p{space}+/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  captures: {
                    "1": { name: "string" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "variable" },
                    "4": { name: "keyword.control.mermaid" }
                  },
                  match: /\p{space}*("[^"]+")\p{space}*(as)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\{)?/dgiv
                },
                {
                  captures: {
                    "1": { name: "variable" },
                    "2": { name: "keyword.control.mermaid" }
                  },
                  match: /\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+(\{)/dgv
                },
                {
                  captures: {
                    "1": { name: "variable" },
                    "2": { name: "keyword.control.mermaid" }
                  },
                  match: /\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+(<<(?:fork|join)>>)/dgiv
                }
              ]
            },
            {
              begin: /([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(-->)/dgv,
              beginCaptures: {
                "1": { name: "variable" },
                "2": { name: "keyword.control.mermaid" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  captures: {
                    "1": { name: "variable" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "string" }
                  },
                  match: /\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)?\p{space}*([^\n\:]+)?/dgv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "string" }
                  },
                  match: /(\[\*\])\p{space}*(:)?\p{space}*([^\n\:]+)?/dgv
                }
              ]
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "variable" },
                "4": { name: "keyword.control.mermaid" },
                "5": { name: "string" }
              },
              match: /(\[\*\])\p{space}*(-->)\p{space}*([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)?\p{space}*([^\n\:]+)?/dgv
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" },
                "3": { name: "keyword.control.mermaid" },
                "4": { name: "string" }
              },
              match: /^\p{space}*(note (?:left|right) of)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)\p{space}*([^\n\:]+)/dgiv
            },
            {
              begin: /^\p{space}*(note (?:left|right) of)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+)([^\n]|\n)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "variable" }
              },
              contentName: "string",
              end: /(end note)/dgiv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              }
            }
          ]
        },
        {
          begin: /^\p{space}*(journey)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title|section)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              begin: /\p{space}*([\!"\$-\/\<-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)\p{space}*(:)\p{space}*(\p{Nd}+)\p{space}*(:)/dgv,
              beginCaptures: {
                "1": { name: "string" },
                "2": { name: "keyword.control.mermaid" },
                "3": { name: "constant.numeric.decimal.mermaid" },
                "4": { name: "keyword.control.mermaid" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  captures: {
                    "1": { name: "variable" }
                  },
                  match: /\p{space}*,?\p{space}*([^\n\#\,]+)/dgv
                }
              ]
            }
          ]
        },
        {
          begin: /^\p{space}*(xychart(?:-beta)?(?:\p{space}+horizontal)?)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.mermaid" }
          },
          end: {
            G: [/(^|￿)(?=\p{space}*[\:\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\:\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              match: /%%[^\n]*/dgv,
              name: "comment"
            },
            {
              captures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "string" }
              },
              match: /^\p{space}*(title)\p{space}+(\p{space}*[\!-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*)/dgiv
            },
            {
              begin: /^\p{space}*(x-axis)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  captures: {
                    "1": { name: "constant.numeric.decimal.mermaid" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "constant.numeric.decimal.mermaid" }
                  },
                  match: /\p{space}*([\-\+]?\p{Nd}+\.?\p{Nd}*)\p{space}*(-->)\p{space}*([\-\+]?\p{Nd}+\.?\p{Nd}*)/dgv
                },
                {
                  captures: {
                    "1": { name: "string" }
                  },
                  match: /\p{space}+("[\!\#-\(\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*")/dgv
                },
                {
                  captures: {
                    "1": { name: "string" }
                  },
                  match: /\p{space}+([\!\#-\(\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
                },
                {
                  begin: /\p{space}*(\[)/dgv,
                  beginCaptures: {
                    "1": { name: "keyword.control.mermaid" }
                  },
                  end: /\p{space}*(\])/dgv,
                  endCaptures: {
                    "1": { name: "keyword.control.mermaid" }
                  },
                  patterns: [
                    {
                      captures: {
                        "1": { name: "constant.numeric.decimal.mermaid" }
                      },
                      match: /\p{space}*([\-\+]?\p{Nd}+\.?\p{Nd}*)/dgv
                    },
                    {
                      captures: {
                        "1": { name: "string" }
                      },
                      match: /\p{space}*("[\!\#-\(\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*")/dgv
                    },
                    {
                      captures: {
                        "1": { name: "string" }
                      },
                      match: /\p{space}*([\-\!\#-\(\*\+\.\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)/dgv
                    },
                    {
                      captures: {
                        "1": { name: "keyword.control.mermaid" }
                      },
                      match: /\p{space}*(,)/dgv
                    }
                  ]
                }
              ]
            },
            {
              begin: /^\p{space}*(y-axis)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                {
                  captures: {
                    "1": { name: "constant.numeric.decimal.mermaid" },
                    "2": { name: "keyword.control.mermaid" },
                    "3": { name: "constant.numeric.decimal.mermaid" }
                  },
                  match: /\p{space}*([\-\+]?\p{Nd}+\.?\p{Nd}*)\p{space}*(-->)\p{space}*([\-\+]?\p{Nd}+\.?\p{Nd}*)/dgv
                },
                {
                  captures: {
                    "1": { name: "string" }
                  },
                  match: /\p{space}+("[\!\#-\(\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}\p{space}]*")/dgv
                },
                {
                  captures: {
                    "1": { name: "string" }
                  },
                  match: /\p{space}+([\!\#-\(\*-\/\:-\?\\\^\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
                }
              ]
            },
            {
              begin: /^\p{space}*(line|bar)\p{space}*(\[)/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.mermaid" },
                "2": { name: "keyword.control.mermaid" }
              },
              end: /\p{space}*(\])/dgv,
              endCaptures: {
                "1": { name: "keyword.control.mermaid" }
              },
              patterns: [
                {
                  captures: {
                    "1": { name: "constant.numeric.decimal.mermaid" }
                  },
                  match: /\p{space}*([\-\+]?\p{Nd}+\.?\p{Nd}*)/dgv
                },
                {
                  captures: {
                    "1": { name: "keyword.control.mermaid" }
                  },
                  match: /\p{space}*(,)/dgv
                }
              ]
            }
          ]
        }
      ]
    },
    "mermaid-ado-code-block": {
      begin: /\p{space}*:::\p{space}*mermaid\p{space}*(?=\n?$)/dgiv,
      contentName: "meta.embedded.block.mermaid",
      end: /\p{space}*:::\p{space}*/dgv,
      patterns: [
        { include: "#mermaid" }
      ]
    },
    "mermaid-code-block": {
      begin: /(?<=[\`\~])\p{space}*mermaid(\p{space}+[^\`\~]*)?(?=\n?$)/dgiv,
      contentName: "meta.embedded.block.mermaid",
      end: {
        G: [/(^|￿)(?=\p{space}*[\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        { include: "#mermaid" }
      ]
    },
    "mermaid-code-block-with-attributes": {
      begin: /(?<=[\`\~])\p{space}*\{\p{space}*\.?mermaid(\p{space}+[^\`\~]*)?(?=\n?$)/dgiv,
      contentName: "meta.embedded.block.mermaid",
      end: {
        G: [/(^|￿)(?=\p{space}*[\`\~]{3,}\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?=\\p{space}*[\\`\\~]{3,}\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        { include: "#mermaid" }
      ]
    }
  },
  injectionSelector: "L:text.html.markdown",
  dependencies: []
};
