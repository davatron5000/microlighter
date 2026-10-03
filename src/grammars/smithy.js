export default {
  name: "smithy",
  displayName: "Smithy",
  scopeName: "source.smithy",
  patterns: [
    { include: "#comment" },
    {
      begin: /^(\$)([A-Z_a-z][0-9A-Z_a-z]*)(:)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.control.smithy" },
        "2": { name: "support.type.property-name.smithy" },
        "3": { name: "punctuation.separator.dictionary.pair.smithy" }
      },
      end: /\n/dgv,
      name: "meta.keyword.statement.control.smithy",
      patterns: [
        { include: "#value" },
        {
          match: /[^\n]/dgv,
          name: "invalid.illegal.control.smithy"
        }
      ]
    },
    {
      begin: /^(metadata)\p{space}+("(?:[^"\\]|\\[^\n])*"|[A-Z_a-z][0-9A-Z_a-z]*)\p{space}*(=)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.smithy" },
        "2": { name: "variable.other.smithy" },
        "3": { name: "keyword.operator.smithy" }
      },
      end: /\n/dgv,
      name: "meta.keyword.statement.metadata.smithy",
      patterns: [
        { include: "#value" }
      ]
    },
    {
      begin: /^(namespace)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.smithy" }
      },
      end: /\n/dgv,
      name: "meta.keyword.statement.namespace.smithy",
      patterns: [
        {
          match: /[A-Z_a-z][0-9A-Z_a-z]*(\.[A-Z_a-z][0-9A-Z_a-z]*)*/dgv,
          name: "entity.name.type.smithy"
        },
        { include: "#comment" },
        {
          match: /[^\n]/dgv,
          name: "invalid.illegal.namespace.smithy"
        }
      ]
    },
    {
      begin: /^(use)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.smithy" }
      },
      end: /\n/dgv,
      name: "meta.keyword.statement.use.smithy",
      patterns: [
        {
          match: /[A-Z_a-z][0-9A-Z_a-z]*(\.[A-Z_a-z][0-9A-Z_a-z]*)*#[A-Z_a-z][0-9A-Z_a-z]*(\.[A-Z_a-z][0-9A-Z_a-z]*)*/dgv,
          name: "entity.name.type.smithy"
        },
        { include: "#comment" },
        {
          match: /[^\n]/dgv,
          name: "invalid.illegal.use.smithy"
        }
      ]
    },
    { include: "#trait" },
    {
      begin: /^(byte|short|integer|long|float|double|bigInteger|bigDecimal|boolean|blob|string|timestamp|document|list|set|map|union|service|operation|resource|enum|intEnum)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}+(with)\p{space}+(\[)/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.smithy" },
        "2": { name: "entity.name.type.smithy" },
        "3": { name: "keyword.statement.with.smithy" },
        "4": { name: "punctuation.definition.array.begin.smithy" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.array.end.smithy" }
      },
      name: "meta.keyword.statement.shape.smithy",
      patterns: [
        {
          include: "#shapeid",
          name: "entity.name.type.smithy"
        },
        { include: "#comment" },
        {
          match: /,/dgv,
          name: "punctuation.separator.array.smithy"
        }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.statement.smithy" },
        "2": { name: "entity.name.type.smithy" }
      },
      match: /^(byte|short|integer|long|float|double|bigInteger|bigDecimal|boolean|blob|string|timestamp|document|list|set|map|union|service|operation|resource|enum|intEnum)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)/dgv,
      name: "meta.keyword.statement.shape.smithy"
    },
    {
      begin: /^(structure)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)(?:\p{space}+(for)\p{space}+([\#\.0-9A-Z_a-z]+))?\p{space}+(with)\p{space}+(\[)/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.smithy" },
        "2": { name: "entity.name.type.smithy" },
        "3": { name: "keyword.statement.for-resource.smithy" },
        "4": { name: "entity.name.type.smithy" },
        "5": { name: "keyword.statement.with.smithy" },
        "6": { name: "punctuation.definition.array.begin.smithy" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.array.end.smithy" }
      },
      name: "meta.keyword.statement.shape.smithy",
      patterns: [
        {
          include: "#shapeid",
          name: "entity.name.type.smithy"
        },
        { include: "#comment" },
        {
          match: /,/dgv,
          name: "punctuation.separator.array.smithy"
        }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.statement.smithy" },
        "2": { name: "entity.name.type.smithy" },
        "3": { name: "keyword.statement.for-resource.smithy" },
        "4": { name: "entity.name.type.smithy" }
      },
      match: /^(structure)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)(?:\p{space}+(for)\p{space}+([\#\.0-9A-Z_a-z]+))?/dgv,
      name: "meta.keyword.statement.shape.smithy"
    },
    {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.dictionary.begin.smithy" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.dictionary.end.smithy" }
      },
      patterns: [
        { include: "#shape_inner" }
      ]
    },
    {
      begin: /^(apply)\p{space}+([A-Z_a-z][\#\$\.0-9A-Z_a-z]*)\p{space}*(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.smithy" },
        "2": { name: "entity.name.type.smithy" },
        "3": { name: "punctuation.definition.dictionary.begin.smithy" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.dictionary.end.smithy" }
      },
      name: "meta.keyword.statement.apply.smithy",
      patterns: [
        { include: "#trait" },
        { include: "#comment" }
      ]
    },
    {
      begin: /^(apply)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.smithy" }
      },
      end: /\n/dgv,
      name: "meta.keyword.statement.apply.smithy",
      patterns: [
        { include: "#trait" },
        { include: "#shapeid" },
        { include: "#comment" },
        {
          match: /[^\n]/dgv,
          name: "invalid.illegal.apply.smithy"
        }
      ]
    },
    {
      begin: /^([A-Z_a-z][0-9A-Z_a-z]*)(:)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "support.type.property-name.smithy" },
        "2": { name: "punctuation.separator.dictionary.pair.smithy" }
      },
      end: /\n/dgv,
      name: "meta.keyword.statement.member.smithy",
      patterns: [
        { include: "#shapeid" },
        { include: "#comment" }
      ]
    }
  ],
  repository: {
    array: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.array.begin.smithy" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.array.end.smithy" }
      },
      name: "meta.structure.array.smithy",
      patterns: [
        { include: "#value" },
        {
          match: /,/dgv,
          name: "punctuation.separator.array.smithy"
        },
        {
          match: /[^\]\p{space}]/dgv,
          name: "invalid.illegal.array.smithy"
        }
      ]
    },
    comment: {
      patterns: [
        { include: "#doc_comment" },
        { include: "#line_comment" }
      ]
    },
    doc_comment: {
      match: /(\/\/\/[^\n]*)/dgv,
      name: "comment.block.documentation.smithy"
    },
    dquote: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.smithy" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.smithy" }
      },
      name: "string.quoted.double.smithy",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.smithy"
        }
      ]
    },
    dquote_key: {
      match: /"(?:[^"\\]|\\[^\n])*"(?=\p{space}*:)/dgv,
      name: "support.type.property-name.smithy"
    },
    elided_target: {
      captures: {
        "1": { name: "keyword.statement.elision.smithy" },
        "2": { name: "support.type.property-name.smithy" }
      },
      match: /(\$)([\#\$\.0-9A-Z_a-z]+)/dgv
    },
    identifier: {
      match: /[A-Z_a-z][0-9A-Z_a-z]*/dgv,
      name: "entity.name.type.smithy"
    },
    identifier_key: {
      match: /[\#\$\.0-9A-Z_a-z]+(?=\p{space}*:)/dgv,
      name: "support.type.property-name.smithy"
    },
    keywords: {
      match: /\b(?:true|false|null)\b/dgv,
      name: "constant.language.smithy"
    },
    line_comment: {
      match: /(\/\/[^\n]*)/dgv,
      name: "comment.line.double-slash.smithy"
    },
    number: {
      match: /-?(?:0|[1-9]\p{Nd}*)(?:(?:\.\p{Nd}+)?(?:[Ee][\-\+]?\p{Nd}+)?)?/dgv,
      name: "constant.numeric.smithy"
    },
    object: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.dictionary.begin.smithy" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.dictionary.end.smithy" }
      },
      name: "meta.structure.dictionary.smithy",
      patterns: [
        { include: "#object_inner" }
      ]
    },
    object_inner: {
      patterns: [
        { include: "#comment" },
        { include: "#string_key" },
        {
          match: /:/dgv,
          name: "punctuation.separator.dictionary.key-value.smithy"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.smithy"
        },
        {
          include: "#value",
          name: "meta.structure.dictionary.value.smithy"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.dictionary.pair.smithy"
        }
      ]
    },
    shape_inner: {
      patterns: [
        { include: "#trait" },
        {
          match: /:=/dgv,
          name: "punctuation.separator.dictionary.inline-struct.smithy"
        },
        { include: "#with_statement" },
        { include: "#elided_target" },
        { include: "#object_inner" }
      ]
    },
    shapeid: {
      match: /[A-Z_a-z][\#\$\.0-9A-Z_a-z]*/dgv,
      name: "entity.name.type.smithy"
    },
    string: {
      patterns: [
        { include: "#textblock" },
        { include: "#dquote" },
        { include: "#shapeid" }
      ]
    },
    string_key: {
      patterns: [
        { include: "#identifier_key" },
        { include: "#dquote_key" }
      ]
    },
    textblock: {
      begin: /"""/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.smithy" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.smithy" }
      },
      name: "string.quoted.double.smithy",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.smithy"
        }
      ]
    },
    trait: {
      patterns: [
        {
          begin: /(@)([\#\.0-9A-Z_a-z]+)(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.annotation.smithy" },
            "2": { name: "storage.type.annotation.smithy" },
            "3": { name: "punctuation.definition.dictionary.begin.smithy" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.dictionary.end.smithy" }
          },
          name: "meta.keyword.statement.trait.smithy",
          patterns: [
            { include: "#object_inner" },
            { include: "#value" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.annotation.smithy" },
            "2": { name: "storage.type.annotation.smithy" }
          },
          match: /(@)([\#\.0-9A-Z_a-z]+)/dgv,
          name: "meta.keyword.statement.trait.smithy"
        }
      ]
    },
    value: {
      patterns: [
        { include: "#comment" },
        { include: "#keywords" },
        { include: "#number" },
        { include: "#string" },
        { include: "#array" },
        { include: "#object" }
      ]
    },
    with_statement: {
      begin: /(with)\p{space}+(\[)/dgv,
      beginCaptures: {
        "1": { name: "keyword.statement.with.smithy" },
        "2": { name: "punctuation.definition.array.begin.smithy" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.array.end.smithy" }
      },
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.separator.array.smithy"
        },
        { include: "#shapeid" },
        { include: "#comment" }
      ]
    }
  },
  dependencies: []
};
