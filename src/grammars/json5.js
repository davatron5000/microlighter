export default {
  name: "json5",
  displayName: "JSON5",
  scopeName: "source.json5",
  patterns: [
    { include: "#comments" },
    { include: "#value" }
  ],
  repository: {
    array: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.array.begin.json5" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.array.end.json5" }
      },
      name: "meta.structure.array.json5",
      patterns: [
        { include: "#comments" },
        { include: "#value" },
        {
          match: /,/dgv,
          name: "punctuation.separator.array.json5"
        },
        {
          match: /[^\]\p{space}]/dgv,
          name: "invalid.illegal.expected-array-separator.json5"
        }
      ]
    },
    comments: {
      patterns: [
        {
          match: /\/{2}[^\n]*/dgv,
          name: "comment.single.json5"
        },
        {
          begin: /\/\*\*(?!\/)/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.json5" }
          },
          end: /\*\//dgv,
          name: "comment.block.documentation.json5"
        },
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.json5" }
          },
          end: /\*\//dgv,
          name: "comment.block.json5"
        }
      ]
    },
    constant: {
      match: /\b(?:true|false|null|Infinity|NaN)\b/dgv,
      name: "constant.language.json5"
    },
    infinity: {
      match: /(-)*\b(?:Infinity|NaN)\b/dgv,
      name: "constant.language.json5"
    },
    key: {
      name: "string.key.json5",
      patterns: [
        { include: "#stringSingle" },
        { include: "#stringDouble" },
        {
          match: /[\-0-9A-Z_a-z]/dgv,
          name: "string.key.json5"
        }
      ]
    },
    number: {
      patterns: [
        {
          match: /(0x)[0-9A-f]*/dgv,
          name: "constant.hex.numeric.json5"
        },
        {
          match: /[\+-\.]?(?=[1-9]|0(?!\p{Nd}))\p{Nd}+(\.\p{Nd}+)?([Ee][\-\+]?\p{Nd}+)?/dgv,
          name: "constant.dec.numeric.json5"
        }
      ]
    },
    object: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.dictionary.begin.json5" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.dictionary.end.json5" }
      },
      name: "meta.structure.dictionary.json5",
      patterns: [
        { include: "#comments" },
        { include: "#key" },
        {
          begin: /:/dgv,
          beginCaptures: {
            "0": { name: "punctuation.separator.dictionary.key-value.json5" }
          },
          end: /(,)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.dictionary.pair.json5" }
          },
          name: "meta.structure.dictionary.value.json5",
          patterns: [
            { include: "#value" },
            {
              match: /[^\,\p{space}]/dgv,
              name: "invalid.illegal.expected-dictionary-separator.json5"
            }
          ]
        },
        {
          match: /[^\}\p{space}]/dgv,
          name: "invalid.illegal.expected-dictionary-separator.json5"
        }
      ]
    },
    stringDouble: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.json5" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.json5" }
      },
      name: "string.quoted.json5",
      patterns: [
        {
          match: /\\(?:["\/\\bfnrt]|u\p{AHex}{4})/dgv,
          name: "constant.character.escape.json5"
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.unrecognized-string-escape.json5"
        }
      ]
    },
    stringSingle: {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.json5" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.json5" }
      },
      name: "string.quoted.json5",
      patterns: [
        {
          match: /\\(?:["\/\\bfnrt]|u\p{AHex}{4})/dgv,
          name: "constant.character.escape.json5"
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.unrecognized-string-escape.json5"
        }
      ]
    },
    value: {
      patterns: [
        { include: "#constant" },
        { include: "#infinity" },
        { include: "#number" },
        { include: "#stringSingle" },
        { include: "#stringDouble" },
        { include: "#array" },
        { include: "#object" }
      ]
    }
  },
  dependencies: []
};
