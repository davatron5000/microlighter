export default {
  name: "rosmsg",
  displayName: "ROS Interface",
  scopeName: "source.rosmsg",
  patterns: [
    { include: "#separators" },
    { include: "#lines" },
    { include: "#comments" }
  ],
  repository: {
    attributes: {
      match: /@optional\b/dgv,
      name: "storage.modifier.attribute.rosmsg"
    },
    "builtin-types": {
      match: /\b(?:bool|byte|char|u?int(?:8|16|32|64)|float(?:32|64)|w?string|time|duration)\b/dgv,
      name: "storage.type.rosmsg"
    },
    comments: {
      match: /#[^\n]*/dgv,
      name: "comment.line.number-sign.rosmsg"
    },
    "field-other": {
      begin: /(?=\b[A-Z_a-z])/dgv,
      end: /(?=\n?$)|(?=#)/dgv,
      patterns: [
        {
          captures: {
            "0": {
              patterns: [
                { include: "#builtin-types" }
              ]
            }
          },
          match: {
            G: [/￿[\/-9A-Z_a-z]+/dgv, /[\/-9A-Z_a-z]+/dgvy]
          },
          name: "support.type.rosmsg"
        },
        {
          match: /\p{Nd}+/dgv,
          name: "constant.numeric.integer.rosmsg"
        },
        {
          begin: /(?=[A-Z_a-z])/dgv,
          end: /(?=\n?$)|(?=#)/dgv,
          patterns: [
            { include: "#field-other-after-type" }
          ]
        }
      ]
    },
    "field-other-after-type": {
      patterns: [
        {
          match: {
            G: [/￿[0-9A-Z_a-z]+/dgv, /[0-9A-Z_a-z]+/dgvy]
          },
          name: "variable.other.field.rosmsg"
        },
        {
          begin: /(?:)/dgv,
          end: /(?=\n?$)|(?=#)/dgv,
          patterns: [
            { include: "#literal-other" },
            { include: "#literal-other-array" }
          ]
        }
      ]
    },
    "field-string": {
      begin: /(?=\bw?string\b)/dgv,
      end: /(?=\n?$)|(?=#)/dgv,
      patterns: [
        {
          captures: {
            "0": { name: "storage.type.rosmsg" }
          },
          match: {
            G: [/￿w?string\b/dgv, /w?string\b/dgvy]
          }
        },
        {
          match: /\p{Nd}+/dgv,
          name: "constant.numeric.integer.rosmsg"
        },
        {
          begin: /(?=[A-Z_a-z])/dgv,
          end: /(?=\n?$)|(?=#)/dgv,
          patterns: [
            { include: "#field-string-after-type" }
          ]
        }
      ]
    },
    "field-string-after-type": {
      patterns: [
        {
          match: {
            G: [/￿[0-9A-Z_a-z]+/dgv, /[0-9A-Z_a-z]+/dgvy]
          },
          name: "variable.other.field.rosmsg"
        },
        {
          begin: /=|(?<=\p{space})/dgv,
          end: /(?=\n?$)|(?=#)/dgv,
          patterns: [
            { include: "#literal-string" }
          ]
        }
      ]
    },
    "field-string-array": {
      begin: /(?=\bw?string[\<\=\p{Nd}]*\[)/dgv,
      end: /(?=\n?$)|(?=#)/dgv,
      patterns: [
        {
          captures: {
            "0": { name: "storage.type.rosmsg" }
          },
          match: {
            G: [/￿w?string\b/dgv, /w?string\b/dgvy]
          },
          name: "support.type.rosmsg"
        },
        {
          match: /\p{Nd}+/dgv,
          name: "constant.numeric.integer.rosmsg"
        },
        {
          begin: /(?=[A-Z_a-z])/dgv,
          end: /(?=\n?$)|(?=#)/dgv,
          patterns: [
            { include: "#field-string-array-after-type" }
          ]
        }
      ]
    },
    "field-string-array-after-type": {
      patterns: [
        {
          match: {
            G: [/￿[0-9A-Z_a-z]+/dgv, /[0-9A-Z_a-z]+/dgvy]
          },
          name: "variable.other.field.rosmsg"
        },
        {
          begin: /(?<=\p{space})/dgv,
          end: /(?=\n?$)|(?=#)/dgv,
          name: "meta.default-value.rosmsg",
          patterns: [
            { include: "#literal-string-array" }
          ]
        }
      ]
    },
    lines: {
      patterns: [
        { include: "#attributes" },
        { include: "#field-string-array" },
        { include: "#field-string" },
        { include: "#field-other" }
      ]
    },
    "literal-other": {
      patterns: [
        {
          match: /[\-\+]?(?:(?:\p{Nd}+(?:_\p{Nd}+)*)?\.\p{Nd}+(?:_\p{Nd}+)*|\p{Nd}+(?:_\p{Nd}+)*\.)(?:[Ee][\-\+]?\p{Nd}+(?:_\p{Nd}+)*)?/dgv,
          name: "constant.numeric.float.rosmsg"
        },
        {
          match: /[\-\+]?\p{Nd}+(?:_\p{Nd}+)*/dgv,
          name: "constant.numeric.integer.rosmsg"
        },
        {
          match: /\b(?:true|false)\b/dgiv,
          name: "constant.language.boolean.rosmsg"
        }
      ]
    },
    "literal-other-array": {
      patterns: [
        {
          begin: /\[/dgv,
          end: /\]|(?=\n?$)|(?=#)/dgv,
          name: "meta.array.rosmsg",
          patterns: [
            { include: "#literal-other" }
          ]
        }
      ]
    },
    "literal-string": {
      patterns: [
        { include: "#literal-string-quoted" },
        { include: "#literal-string-unquoted" }
      ]
    },
    "literal-string-array": {
      patterns: [
        {
          begin: /\[/dgv,
          end: /\]|(?=\n?$)|(?=#)/dgv,
          name: "meta.array.rosmsg",
          patterns: [
            { include: "#literal-string-quoted" },
            { include: "#literal-string-unquoted-in-array" }
          ]
        }
      ]
    },
    "literal-string-escape": {
      patterns: [
        {
          match: /\\(?:[0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4}|U\p{AHex}{8}|[^\n])/dgv,
          name: "constant.character.escape.rosmsg"
        }
      ]
    },
    "literal-string-quoted": {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.rosmsg" }
          },
          end: /"|(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.rosmsg" }
          },
          name: "string.quoted.double.rosmsg",
          patterns: [
            { include: "#literal-string-escape" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.rosmsg" }
          },
          end: /'|(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.rosmsg" }
          },
          name: "string.quoted.single.rosmsg",
          patterns: [
            { include: "#literal-string-escape" }
          ]
        }
      ]
    },
    "literal-string-unquoted": {
      begin: /(?=[^"'\p{space}])/dgv,
      end: /(?=\p{space}*(?:#|(?=\n?$)))/dgv,
      name: "string.unquoted.rosmsg",
      patterns: [
        { include: "#literal-string-escape" }
      ]
    },
    "literal-string-unquoted-in-array": {
      begin: /(?=[^\]"'\,\p{space}])/dgv,
      end: /(?=\p{space}*(?:(?=\n?$)|[\]\,]))/dgv,
      name: "string.unquoted.rosmsg",
      patterns: [
        { include: "#literal-string-escape" }
      ]
    },
    separators: {
      patterns: [
        {
          match: /^---\p{space}*(?=\n?$)\n?/dgv,
          name: "meta.separator.rosmsg"
        },
        {
          match: /^={3,}\p{space}*(?=\n?$)\n?/dgv,
          name: "meta.separator.rosmsg"
        },
        {
          captures: {
            "1": { name: "entity.name.type.class.rosmsg" }
          },
          match: /^MSG:\p{space}+([\/-9A-Z_a-z]+)\p{space}*(?=\n?$)\n?/dgv,
          name: "meta.separator.rosmsg"
        }
      ]
    }
  },
  dependencies: []
};
