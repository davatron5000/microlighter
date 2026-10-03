export default {
  name: "ron",
  displayName: "RON",
  scopeName: "source.ron",
  patterns: [
    { include: "#expression" }
  ],
  repository: {
    array: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ron" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ron" }
      },
      patterns: [
        { include: "#value" },
        { include: "#struct-name" },
        { meta_scope: "meta.structure.array.ron" }
      ]
    },
    block_comment: {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.ron",
      patterns: [
        { include: "#block_comment" }
      ]
    },
    character: {
      begin: /'/dgv,
      contentName: "constant.character.ron",
      end: /'/dgv,
      name: "string.quoted.single",
      patterns: [
        { include: "#escapes" }
      ]
    },
    constant: {
      match: /\b(true|false)\b/dgv,
      name: "constant.language.ron"
    },
    dictionary: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.dictionary.begin.ron" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.dictionary.end.ron" }
      },
      patterns: [
        { include: "#value" },
        { include: "#struct-name" },
        { include: "#object" },
        { include: "#enum-variant" },
        {
          match: /,/dgv,
          name: "punctuation.separator.dictionary.ron"
        },
        {
          match: /:/dgv,
          name: "punctuation.separator.dictionary.key-value.ron"
        }
      ]
    },
    "enum-variant": {
      match: /[_a-z][0-9A-Z_a-z]*/dgv,
      name: "entity.name.tag.ron"
    },
    escapes: {
      captures: {
        "1": { name: "constant.character.escape.backslash.ron" },
        "2": { name: "constant.character.escape.bit.ron" },
        "3": { name: "constant.character.escape.unicode.ron" },
        "4": { name: "constant.character.escape.unicode.punctuation.ron" },
        "5": { name: "constant.character.escape.unicode.punctuation.ron" }
      },
      match: /(\\)(?:(x[0-7][0-7A-Fa-f])|(u(\{)[A-Fa-f\p{Nd}]{4,6}(\}))|[^\n])/dgv,
      name: "constant.character.escape.ron"
    },
    expression: {
      patterns: [
        { include: "#array" },
        { include: "#block_comment" },
        { include: "#constant" },
        { include: "#dictionary" },
        { include: "#line_comment" },
        { include: "#number" },
        { include: "#raw_string" },
        { include: "#struct-field" },
        { include: "#struct-name" },
        { include: "#object" },
        { include: "#string" },
        { include: "#character" },
        { include: "#enum-variant" }
      ]
    },
    line_comment: {
      begin: /\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.double-slash.ron"
    },
    number: {
      patterns: [
        {
          match: /-?\b0x[_\p{AHex}]+\b/dgv,
          name: "constant.numeric.hex.ron"
        },
        {
          match: /-?\b0b[01_]+\b/dgv,
          name: "constant.numeric.binary.ron"
        },
        {
          match: /-?\b0o[0-7_]+\b/dgv,
          name: "constant.numeric.octal.ron"
        },
        {
          match: /-?\b[0-9][0-9_]*(?:\.[0-9][0-9_]*)?(?:[Ee][\-\+]?[0-9_]+)?\b/dgv,
          name: "constant.numeric.ron"
        }
      ]
    },
    object: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.parens.begin.ron" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.end.ron" }
      },
      patterns: [
        { include: "#value" },
        { include: "#dictionary" },
        { include: "#struct-field" },
        { include: "#struct-name" },
        { include: "#enum-variant" },
        { include: "#object" }
      ]
    },
    raw_string: {
      patterns: [
        {
          begin: /r#{5}"/dgv,
          end: /"#{5}/dgv,
          name: "string.quoted.other.raw.ron"
        },
        {
          begin: /r#{4}"/dgv,
          end: /"#{4}/dgv,
          name: "string.quoted.other.raw.ron"
        },
        {
          begin: /r#{3}"/dgv,
          end: /"#{3}/dgv,
          name: "string.quoted.other.raw.ron"
        },
        {
          begin: /r#{2}"/dgv,
          end: /"#{2}/dgv,
          name: "string.quoted.other.raw.ron"
        },
        {
          begin: /r#"/dgv,
          end: /"#/dgv,
          name: "string.quoted.other.raw.ron"
        },
        {
          begin: /r"/dgv,
          end: /"/dgv,
          name: "string.quoted.other.raw.ron"
        }
      ]
    },
    string: {
      begin: /(b?)(")/dgv,
      end: /"/dgv,
      name: "string.quoted.double",
      patterns: [
        { include: "#escapes" }
      ]
    },
    "struct-field": {
      captures: {
        "1": { name: "variable.other.member.ron" },
        "2": { name: "punctuation.separator.key-value.ron" }
      },
      match: /([_a-z][0-9A-Z_a-z]*)\p{space}*(:)/dgv
    },
    "struct-name": {
      match: /[A-Z][0-9A-Z_a-z]*/dgv,
      name: "entity.name.type.ron"
    },
    value: {
      patterns: [
        { include: "#array" },
        { include: "#block_comment" },
        { include: "#constant" },
        { include: "#dictionary" },
        { include: "#line_comment" },
        { include: "#number" },
        { include: "#object" },
        { include: "#raw_string" },
        { include: "#string" },
        { include: "#character" }
      ]
    }
  },
  dependencies: []
};
