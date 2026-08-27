// Reference: Microsoft VS Code (MIT) — https://github.com/microsoft/vscode/blob/main/extensions/ini/syntaxes/ini.tmLanguage.json
// Comment rules rewritten without upstream's `(?!\G)` container (native JS RegExp lacks `\G`).
export default {
  scopeName: "source.ini",
  patterns: [
    {
      begin: "#",
      beginCaptures: { 0: { name: "punctuation.definition.comment.ini" } },
      end: "\\n",
      name: "comment.line.number-sign.ini"
    },
    {
      begin: ";",
      beginCaptures: { 0: { name: "punctuation.definition.comment.ini" } },
      end: "\\n",
      name: "comment.line.semicolon.ini"
    },
    {
      match: "\\b([a-zA-Z0-9_.-]+)\\b\\s*(=)",
      captures: {
        1: { name: "keyword.other.definition.ini" },
        2: { name: "punctuation.separator.key-value.ini" }
      }
    },
    {
      match: "^(\\[)(.*?)(\\])",
      name: "entity.name.section.group-title.ini",
      captures: {
        1: { name: "punctuation.definition.entity.ini" },
        3: { name: "punctuation.definition.entity.ini" }
      }
    },
    {
      begin: "'",
      beginCaptures: { 0: { name: "punctuation.definition.string.begin.ini" } },
      end: "'",
      endCaptures: { 0: { name: "punctuation.definition.string.end.ini" } },
      name: "string.quoted.single.ini",
      patterns: [
        { match: "\\\\.", name: "constant.character.escape.ini" }
      ]
    },
    {
      begin: "\"",
      beginCaptures: { 0: { name: "punctuation.definition.string.begin.ini" } },
      end: "\"",
      endCaptures: { 0: { name: "punctuation.definition.string.end.ini" } },
      name: "string.quoted.double.ini"
    }
  ]
};