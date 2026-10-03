export default {
  name: "prisma",
  displayName: "Prisma",
  scopeName: "source.prisma",
  patterns: [
    { include: "#triple_comment" },
    { include: "#double_comment" },
    { include: "#multi_line_comment" },
    { include: "#types_block_definition" },
    { include: "#namespace_block_definition" },
    { include: "#model_block_definition" },
    { include: "#config_block_definition" },
    { include: "#enum_block_definition" },
    { include: "#type_definition" }
  ],
  repository: {
    array: {
      begin: /\[/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.prisma" }
      },
      end: /\]/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.prisma" }
      },
      name: "source.prisma.array",
      patterns: [
        { include: "#value" }
      ]
    },
    assignment: {
      patterns: [
        {
          begin: /^\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "variable.other.assignment.prisma" },
            "2": { name: "keyword.operator.terraform" }
          },
          end: /\n/dgv,
          patterns: [
            { include: "#value" },
            { include: "#double_comment_inline" }
          ]
        }
      ]
    },
    attribute: {
      captures: {
        "1": { name: "entity.name.function.attribute.prisma" }
      },
      match: /(@@?[\.\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      name: "source.prisma.attribute"
    },
    attribute_with_arguments: {
      begin: /(@@?[\.\p{L}\p{M}\p{N}\p{Pc}]+)(\()/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.attribute.prisma" },
        "2": { name: "punctuation.definition.tag.prisma" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.prisma" }
      },
      name: "source.prisma.attribute.with_arguments",
      patterns: [
        { include: "#named_argument" },
        { include: "#value" }
      ]
    },
    boolean: {
      match: /\b(true|false)\b/dgv,
      name: "constant.language.boolean.prisma"
    },
    config_block_definition: {
      begin: /^\p{space}*(generator|datasource)\p{space}+([A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+(\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.config.prisma" },
        "2": { name: "entity.name.type.config.prisma" },
        "3": { name: "punctuation.definition.tag.prisma" }
      },
      end: /\p{space}*\}/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.prisma" }
      },
      name: "source.prisma.embedded.source",
      patterns: [
        { include: "#triple_comment" },
        { include: "#double_comment" },
        { include: "#multi_line_comment" },
        { include: "#assignment" }
      ]
    },
    double_comment: {
      begin: /\/\//dgv,
      end: /(?=\n?$)\n?/dgv,
      name: "comment.prisma"
    },
    double_comment_inline: {
      match: /\/\/[^\n]*/dgv,
      name: "comment.prisma"
    },
    double_quoted_string: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "string.quoted.double.start.prisma" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "string.quoted.double.end.prisma" }
      },
      name: "unnamed",
      patterns: [
        { include: "#string_interpolation" },
        {
          match: /([\-\%\.\/\:\=\?\@\\_\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          name: "string.quoted.double.prisma"
        }
      ]
    },
    enum_block_definition: {
      begin: /^\p{space}*(enum)\p{space}+([A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+(\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.enum.prisma" },
        "2": { name: "entity.name.type.enum.prisma" },
        "3": { name: "punctuation.definition.tag.prisma" }
      },
      end: /\p{space}*\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.prisma" }
      },
      name: "source.prisma.embedded.source",
      patterns: [
        { include: "#triple_comment" },
        { include: "#double_comment" },
        { include: "#multi_line_comment" },
        { include: "#enum_value_definition" }
      ]
    },
    enum_value_definition: {
      patterns: [
        {
          captures: {
            "1": { name: "variable.other.assignment.prisma" }
          },
          match: /^\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*/dgv
        },
        { include: "#attribute_with_arguments" },
        { include: "#attribute" }
      ]
    },
    field_definition: {
      name: "scalar.field",
      patterns: [
        {
          captures: {
            "1": { name: "variable.other.assignment.prisma" },
            "2": { name: "invalid.illegal.colon.prisma" },
            "3": { name: "variable.language.relations.prisma" },
            "4": { name: "support.type.primitive.prisma" },
            "5": { name: "keyword.operator.list_type.prisma" },
            "6": { name: "keyword.operator.optional_type.prisma" },
            "7": { name: "invalid.illegal.required_type.prisma" }
          },
          match: /^\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)(\p{space}*:)?\p{space}+((?!(?:Int|BigInt|String|DateTime|Bytes|Decimal|Float|Json|Boolean)\b)\b[\p{L}\p{M}\p{N}\p{Pc}]+)?(Int|BigInt|String|DateTime|Bytes|Decimal|Float|Json|Boolean)?(\[\])?(\?)?(!)?/dgv
        },
        { include: "#attribute_with_arguments" },
        { include: "#attribute" }
      ]
    },
    functional: {
      begin: /([\p{L}\p{M}\p{N}\p{Pc}]+)(\()/dgv,
      beginCaptures: {
        "1": { name: "support.function.functional.prisma" },
        "2": { name: "punctuation.definition.tag.prisma" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.prisma" }
      },
      name: "source.prisma.functional",
      patterns: [
        { include: "#value" }
      ]
    },
    identifier: {
      patterns: [
        {
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}])+\b/dgv,
          name: "support.constant.constant.prisma"
        }
      ]
    },
    literal: {
      name: "source.prisma.literal",
      patterns: [
        { include: "#boolean" },
        { include: "#number" },
        { include: "#double_quoted_string" },
        { include: "#identifier" }
      ]
    },
    map_key: {
      name: "source.prisma.key",
      patterns: [
        {
          captures: {
            "1": { name: "variable.parameter.key.prisma" },
            "2": { name: "punctuation.definition.separator.key-value.prisma" }
          },
          match: /([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)\p{space}*/dgv
        }
      ]
    },
    model_block_definition: {
      begin: /^\p{space}*(model|type|view)\p{space}+([A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.model.prisma" },
        "2": { name: "entity.name.type.model.prisma" },
        "3": { name: "punctuation.definition.tag.prisma" }
      },
      end: /\p{space}*\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.prisma" }
      },
      name: "source.prisma.embedded.source",
      patterns: [
        { include: "#triple_comment" },
        { include: "#double_comment" },
        { include: "#multi_line_comment" },
        { include: "#field_definition" }
      ]
    },
    multi_line_comment: {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.prisma"
    },
    named_argument: {
      name: "source.prisma.named_argument",
      patterns: [
        { include: "#map_key" },
        { include: "#value" }
      ]
    },
    namespace_block_definition: {
      begin: /^\p{space}*(namespace)\p{space}+([A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.namespace.prisma" },
        "2": { name: "entity.name.type.namespace.prisma" },
        "3": { name: "punctuation.definition.tag.prisma" }
      },
      end: /\p{space}*\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.prisma" }
      },
      name: "source.prisma.embedded.source",
      patterns: [
        { include: "#triple_comment" },
        { include: "#double_comment" },
        { include: "#multi_line_comment" },
        { include: "#model_block_definition" },
        { include: "#enum_block_definition" },
        { include: "#type_definition" }
      ]
    },
    number: {
      match: /((0([Xx])\p{AHex}*)|([\-\+])?\b(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)([DFLUdfglu]|UL|ul)?\b/dgv,
      name: "constant.numeric.prisma"
    },
    string_interpolation: {
      patterns: [
        {
          begin: /\$\{/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.interpolation.start.prisma" }
          },
          end: /\p{space}*\}/dgv,
          endCaptures: {
            "0": { name: "keyword.control.interpolation.end.prisma" }
          },
          name: "source.tag.embedded.source.prisma",
          patterns: [
            { include: "#value" }
          ]
        }
      ]
    },
    triple_comment: {
      begin: /\/\/\//dgv,
      end: /(?=\n?$)\n?/dgv,
      name: "comment.prisma"
    },
    type_alias_definition: {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.type.alias.prisma" },
            "2": { name: "keyword.operator.assignment.prisma" },
            "3": { name: "support.type.primitive.prisma" }
          },
          match: /^\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv
        },
        { include: "#attribute_with_arguments" },
        { include: "#attribute" }
      ]
    },
    type_definition: {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.type.prisma" },
            "2": { name: "entity.name.type.type.prisma" },
            "3": { name: "support.type.primitive.prisma" }
          },
          match: /^\p{space}*(type)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*=\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv
        },
        { include: "#attribute_with_arguments" },
        { include: "#attribute" }
      ]
    },
    types_block_definition: {
      begin: /^\p{space}*(types)\p{space}*(\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.types.prisma" },
        "2": { name: "punctuation.definition.tag.prisma" }
      },
      end: /\p{space}*\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.prisma" }
      },
      name: "source.prisma.embedded.source",
      patterns: [
        { include: "#triple_comment" },
        { include: "#double_comment" },
        { include: "#multi_line_comment" },
        { include: "#type_alias_definition" }
      ]
    },
    value: {
      name: "source.prisma.value",
      patterns: [
        { include: "#array" },
        { include: "#functional" },
        { include: "#literal" }
      ]
    }
  },
  dependencies: []
};
