export default {
  name: "proto",
  displayName: "Protocol Buffer 3",
  aliases: [
    "protobuf"
  ],
  scopeName: "source.proto",
  patterns: [
    { include: "#comments" },
    { include: "#syntax" },
    { include: "#package" },
    { include: "#import" },
    { include: "#optionStmt" },
    { include: "#message" },
    { include: "#enum" },
    { include: "#service" }
  ],
  repository: {
    comments: {
      patterns: [
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.proto"
        },
        {
          begin: /\/\//dgv,
          end: /(?=\n?$)\n?/dgv,
          name: "comment.line.double-slash.proto"
        }
      ]
    },
    constants: {
      match: /\b(true|false|max|[A-Z_]+)\b/dgv,
      name: "constant.language.proto"
    },
    enum: {
      begin: /(enum)(\p{space}+)([A-Za-z][0-9A-Z_a-z]*)(\p{space}*)(\{)?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.proto" },
        "3": { name: "entity.name.class.proto" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#reserved" },
        { include: "#optionStmt" },
        { include: "#comments" },
        {
          begin: /([A-Za-z][0-9A-Z_a-z]*)\p{space}*(=)\p{space}*(-?0[Xx]\p{AHex}+|-?[0-9]+)/dgv,
          beginCaptures: {
            "1": { name: "variable.other.proto" },
            "2": { name: "keyword.operator.assignment.proto" },
            "3": { name: "constant.numeric.proto" }
          },
          end: /(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.proto" }
          },
          patterns: [
            { include: "#fieldOptions" }
          ]
        }
      ]
    },
    field: {
      begin: /\p{space}*(optional|repeated|required)?\p{space}*(\.?[\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)\p{space}*(0[Xx]\p{AHex}+|[0-9]+)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.proto" },
        "2": { name: "storage.type.proto" },
        "3": { name: "variable.other.proto" },
        "4": { name: "keyword.operator.assignment.proto" },
        "5": { name: "constant.numeric.proto" }
      },
      end: /(;)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.proto" }
      },
      patterns: [
        { include: "#fieldOptions" }
      ]
    },
    fieldOptions: {
      begin: /\[/dgv,
      end: /\]/dgv,
      patterns: [
        { include: "#constants" },
        { include: "#number" },
        { include: "#string" },
        { include: "#subMsgOption" },
        { include: "#optionName" }
      ]
    },
    ident: {
      match: /\.?[A-Za-z][\.0-9A-Z_a-z]*/dgv,
      name: "entity.name.class.proto"
    },
    import: {
      captures: {
        "1": { name: "keyword.other.proto" },
        "2": { name: "keyword.other.proto" },
        "3": { name: "string.quoted.double.proto.import" },
        "4": { name: "punctuation.terminator.proto" }
      },
      match: /\p{space}*(import)\p{space}+(weak|public)?\p{space}*("[^"]+")\p{space}*(;)/dgv
    },
    kv: {
      begin: /([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.proto" },
        "2": { name: "punctuation.separator.key-value.proto" }
      },
      end: /(;)|,|(?=[\/A-Z_a-z\}])/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.proto" }
      },
      patterns: [
        { include: "#constants" },
        { include: "#number" },
        { include: "#string" },
        { include: "#subMsgOption" }
      ]
    },
    mapfield: {
      begin: /\p{space}*(map)\p{space}*(<)\p{space}*(\.?[\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*,\p{space}*(\.?[\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(>)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)\p{space}*(\p{Nd}+)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.proto" },
        "2": { name: "punctuation.definition.typeparameters.begin.proto" },
        "3": { name: "storage.type.proto" },
        "4": { name: "storage.type.proto" },
        "5": { name: "punctuation.definition.typeparameters.end.proto" },
        "6": { name: "variable.other.proto" },
        "7": { name: "keyword.operator.assignment.proto" },
        "8": { name: "constant.numeric.proto" }
      },
      end: /(;)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.proto" }
      },
      patterns: [
        { include: "#fieldOptions" }
      ]
    },
    message: {
      begin: /(message|extend)(\p{space}+)([A-Z_a-z][\.0-9A-Z_a-z]*)(\p{space}*)(\{)?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.proto" },
        "3": { name: "entity.name.class.message.proto" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#reserved" },
        { include: "$self" },
        { include: "#enum" },
        { include: "#optionStmt" },
        { include: "#comments" },
        { include: "#oneof" },
        { include: "#field" },
        { include: "#mapfield" }
      ]
    },
    method: {
      begin: /(rpc)\p{space}+([A-Za-z][0-9A-Z_a-z]*)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.proto" },
        "2": { name: "entity.name.function" }
      },
      end: /\}|(;)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.proto" }
      },
      patterns: [
        { include: "#comments" },
        { include: "#optionStmt" },
        { include: "#rpcKeywords" },
        { include: "#ident" }
      ]
    },
    number: {
      match: /\b((0([Xx])\p{AHex}*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)\b/dgv,
      name: "constant.numeric.proto"
    },
    oneof: {
      begin: /(oneof)\p{space}+([A-Za-z][0-9A-Z_a-z]*)\p{space}*\{?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.proto" },
        "2": { name: "variable.other.proto" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#optionStmt" },
        { include: "#comments" },
        { include: "#field" }
      ]
    },
    optionName: {
      captures: {
        "1": { name: "support.other.proto" },
        "2": { name: "support.other.proto" },
        "3": { name: "support.other.proto" }
      },
      match: /([\p{L}\p{M}\p{N}\p{Pc}]+|\([\p{L}\p{M}\p{N}\p{Pc}]+(\.[\p{L}\p{M}\p{N}\p{Pc}]+)*\))(\.[\p{L}\p{M}\p{N}\p{Pc}]+)*/dgv
    },
    optionStmt: {
      begin: /(option)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+|\([\p{L}\p{M}\p{N}\p{Pc}]+(\.[\p{L}\p{M}\p{N}\p{Pc}]+)*\))(\.[\p{L}\p{M}\p{N}\p{Pc}]+)*\p{space}*(=)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.proto" },
        "2": { name: "support.other.proto" },
        "3": { name: "support.other.proto" },
        "4": { name: "support.other.proto" },
        "5": { name: "keyword.operator.assignment.proto" }
      },
      end: /(;)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.proto" }
      },
      patterns: [
        { include: "#constants" },
        { include: "#number" },
        { include: "#string" },
        { include: "#subMsgOption" }
      ]
    },
    package: {
      captures: {
        "1": { name: "keyword.other.proto" },
        "2": { name: "string.unquoted.proto.package" },
        "3": { name: "punctuation.terminator.proto" }
      },
      match: /\p{space}*(package)\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(;)/dgv
    },
    reserved: {
      begin: /(reserved)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.proto" }
      },
      end: /(;)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.proto" }
      },
      patterns: [
        {
          captures: {
            "1": { name: "constant.numeric.proto" },
            "3": { name: "keyword.other.proto" },
            "4": { name: "constant.numeric.proto" }
          },
          match: /(\p{Nd}+)(\p{space}+(to)\p{space}+(\p{Nd}+))?/dgv
        },
        { include: "#string" }
      ]
    },
    rpcKeywords: {
      match: /\b(stream|returns)\b/dgv,
      name: "keyword.other.proto"
    },
    service: {
      begin: /(service)\p{space}+([A-Za-z][\.0-9A-Z_a-z]*)\p{space}*\{?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.proto" },
        "2": { name: "entity.name.class.message.proto" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#optionStmt" },
        { include: "#method" }
      ]
    },
    storagetypes: {
      match: /\b(double|float|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|bool|string|bytes)\b/dgv,
      name: "storage.type.proto"
    },
    string: {
      match: /(["'])(?:\\[^\n]|[^\\])*?\1/dgv,
      name: "string.quoted.double.proto"
    },
    subMsgOption: {
      begin: /\{/dgv,
      end: /\}/dgv,
      patterns: [
        { include: "#kv" },
        { include: "#comments" }
      ]
    },
    syntax: {
      captures: {
        "1": { name: "keyword.other.proto" },
        "2": { name: "keyword.operator.assignment.proto" },
        "3": { name: "string.quoted.double.proto.syntax" },
        "4": { name: "punctuation.terminator.proto" }
      },
      match: /\p{space}*(syntax)\p{space}*(=)\p{space}*("proto[23]")\p{space}*(;)/dgv
    }
  },
  dependencies: []
};
