export default {
  name: "odin",
  displayName: "Odin",
  scopeName: "source.odin",
  patterns: [
    { include: "#file-tags" },
    { include: "#package-name-declaration" },
    { include: "#import-declaration" },
    { include: "#statements" }
  ],
  repository: {
    assignments: {
      patterns: [
        { include: "#procedure-assignment" },
        { include: "#type-assignment" },
        { include: "#distinct-type-assignment" },
        { include: "#constant-assignment" },
        { include: "#variable-assignment" },
        { include: "#type-annotation" }
      ]
    },
    attribute: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.attribute.odin" },
            "2": { name: "entity.other.attribute-name.odin" }
          },
          match: /(@)\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
          name: "meta.attribute.odin"
        },
        {
          begin: /(@)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.attribute.odin" },
            "2": { name: "meta.brace.round.odin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.odin" }
          },
          name: "meta.attribute.odin",
          patterns: [
            {
              match: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
              name: "entity.other.attribute-name.odin"
            },
            {
              match: /,/dgv,
              name: "punctuation.odin"
            },
            {
              begin: /=/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.assignment.odin" }
              },
              end: /(?=[\)\,])/dgv,
              patterns: [
                { include: "#expressions" }
              ]
            }
          ]
        }
      ]
    },
    "basic-types": {
      patterns: [
        {
          match: /\b(i(?:8|16|32|64|128|nt))\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(u(?:8|16|32|64|128|int|intptr))\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b((?:u16|u32|u64|u128|i16|i32|i64|i128)le)\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b((?:i16|i32|i64|i128|u16|u32|u64|u128)be)\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(f(?:16|32|64))\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(f(?:16|32|64)le)\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(f(?:16|32|64)be)\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(complex(?:32|64|128))\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(quaternion(?:64|128|256))\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(b(?:ool|8|16|32|64))\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(string|cstring|rune)\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(rawptr)\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(any|typeid)\b/dgv,
          name: "support.type.primitive.odin"
        },
        {
          match: /\b(byte)\b/dgv,
          name: "support.type.primitive.odin"
        }
      ]
    },
    "block-comment": {
      begin: /\/\*/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.begin.odin" }
      },
      end: /\*\//dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.end.odin" }
      },
      name: "comment.block.odin",
      patterns: [
        { include: "#block-comment" }
      ]
    },
    "block-definition": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.odin" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.odin" }
      },
      name: "meta.block.odin",
      patterns: [
        { include: "#statements" }
      ]
    },
    "block-label": {
      captures: {
        "1": { name: "entity.name.label.odin" },
        "2": { name: "punctuation.definition.label.odin" }
      },
      match: /([\p{L}\p{M}\p{N}\p{Pc}]+)(:)\p{space}*(?=for|switch|if|\{)/dgv,
      name: "meta.block.label.odin"
    },
    "case-clause": {
      begin: /\b(case)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.case.odin" }
      },
      end: /:/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.section.case-statement.odin" }
      },
      name: "meta.case-clause.expr.odin",
      patterns: [
        { include: "#expressions" }
      ]
    },
    comments: {
      patterns: [
        { include: "#block-comment" },
        {
          begin: /\/\//dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.odin" }
          },
          end: /\n/dgv,
          name: "comment.line.double-slash.odin"
        },
        {
          begin: /#!/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.odin" }
          },
          end: /\n/dgv,
          name: "comment.line.shebang.odin"
        }
      ]
    },
    "constant-assignment": {
      captures: {
        "1": { name: "variable.other.constant.odin" },
        "2": { name: "keyword.operator.assignment.odin" }
      },
      match: /([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(:\p{space}*:)/dgv,
      name: "meta.definition.variable.odin"
    },
    "distinct-type-assignment": {
      begin: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(:\p{space}*:)\p{space}*(?=(distinct)\b)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.type.odin" },
        "2": { name: "keyword.operator.assignment.odin" },
        "3": { name: "storage.type.odin" }
      },
      end: /(?=^)|(?<=\})/dgv,
      name: "meta.definition.variable.odin",
      patterns: [
        { include: "#type-declaration" }
      ]
    },
    expressions: {
      patterns: [
        { include: "#comments" },
        { include: "#ternary" },
        { include: "#map-bitset" },
        { include: "#slice" },
        { include: "#keywords" },
        { include: "#type-parameter" },
        { include: "#basic-types" },
        { include: "#procedure-calls" },
        { include: "#property-access" },
        { include: "#union-member-access" },
        { include: "#union-non-nil-access" },
        { include: "#strings" },
        { include: "#punctuation" },
        { include: "#variable-name" }
      ]
    },
    "file-tags": {
      begin: /#\+[A-Z_a-z][\-0-9A-Z_a-z]*/dgv,
      beginCaptures: {
        "0": { name: "entity.name.tag.odin" }
      },
      end: /\n/dgv,
      name: "comment.line.double-slash.odin",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.odin"
        },
        {
          match: /!/dgv,
          name: "keyword.operator.logical.odin"
        },
        {
          match: /[A-Z_a-z][\-0-9A-Z_a-z]*/dgv,
          name: "entity.other.attribute-name.odin"
        }
      ]
    },
    "import-declaration": {
      begin: /\b((?:|foreign\p{space}+)import)\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.import.odin" }
      },
      end: /(?=^|;)/dgv,
      name: "meta.import.odin",
      patterns: [
        {
          begin: /\b[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          beginCaptures: {
            "0": { name: "entity.name.namespace.odin" }
          },
          end: /(?=^|;)/dgv,
          name: "entity.name.alias.odin",
          patterns: [
            { include: "#strings" },
            { include: "#comments" }
          ]
        },
        { include: "#strings" },
        { include: "#comments" }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(import|foreign|package)\b/dgv,
          name: "keyword.control.odin"
        },
        {
          match: /\b(if|else|or_else|when|where|for|in|not_in|defer|switch|return|or_return)\b/dgv,
          name: "keyword.control.odin"
        },
        {
          captures: {
            "1": { name: "keyword.control.odin" },
            "2": { name: "entity.name.label.odin" }
          },
          match: /\b((?:|or_)(?:break|continue))\b\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?/dgv
        },
        {
          match: /\b(fallthrough|case|dynamic)\b/dgv,
          name: "keyword.control.odin"
        },
        {
          match: /\b(do|force_inline|no_inline)\b/dgv,
          name: "keyword.control.odin"
        },
        {
          match: /\b(asm)\b/dgv,
          name: "keyword.control.odin"
        },
        {
          match: /\b(auto_cast|distinct|using)\b/dgv,
          name: "storage.modifier.odin"
        },
        {
          match: /\b(context)\b/dgv,
          name: "keyword.context.odin"
        },
        {
          match: /\b(ODIN_(?:ARCH|OS))\b/dgv,
          name: "variable.other.constant.odin"
        },
        {
          match: /\b(nil|true|false)\b/dgv,
          name: "constant.language.odin"
        },
        {
          match: /---/dgv,
          name: "constant.language.odin"
        },
        {
          match: /\b(\p{Nd}([_\p{Nd}])*(\.\p{Nd}([_\p{Nd}])*)?)(([Ee])([\-\+])?\p{Nd}+)?[ijk]?\b/dgv,
          name: "constant.numeric.odin"
        },
        {
          match: /\b((0b([01_])+)|(0o([_\p{Nd}])+)|(0d([_\p{Nd}])+)|(0[Xhx]([_\p{AHex}])+))i?\b/dgv,
          name: "constant.numeric.odin"
        },
        {
          match: /\b(struct|enum|union|map|bit_set|bit_field|matrix)\b/dgv,
          name: "storage.type.odin"
        },
        {
          match: /[\-\%\*\+\/]=|%%=/dgv,
          name: "keyword.operator.assignment.compound.odin"
        },
        {
          match: /(?:[\|\~]|&~?|<<|>>)=/dgv,
          name: "keyword.operator.assignment.compound.bitwise.odin"
        },
        {
          match: /[\!\=]=/dgv,
          name: "keyword.operator.comparison.odin"
        },
        {
          match: /[\<\>]=?/dgv,
          name: "keyword.operator.relational.odin"
        },
        {
          match: /\.\.[\<\=]/dgv,
          name: "keyword.operator.range.odin"
        },
        {
          match: /\.\./dgv,
          name: "keyword.operator.spread.odin"
        },
        {
          match: /:[\:\=]|=/dgv,
          name: "keyword.operator.assignment.odin"
        },
        {
          match: /&/dgv,
          name: "keyword.operator.address.odin"
        },
        {
          match: /\^/dgv,
          name: "keyword.operator.address.odin"
        },
        {
          match: /->/dgv,
          name: "storage.type.function.arrow.odin"
        },
        {
          match: /@|([\-\!\%\*\+\/\:\|]|<<?|>>?|~)=?|=|: : ?|\$/dgv,
          name: "keyword.operator.odin"
        },
        {
          match: /#[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "entity.name.tag.odin"
        }
      ]
    },
    "map-bitset": {
      begin: /\b(bit_set|map)\b/dgv,
      beginCaptures: {
        "0": { name: "storage.type.odin" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.bracket.square.odin" }
      },
      patterns: [
        {
          match: /\[/dgv,
          name: "punctuation.definition.bracket.square.odin"
        },
        { include: "#type-declaration" }
      ]
    },
    "object-definition": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.odin" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.odin" }
      },
      name: "meta.object.type.odin",
      patterns: [
        { include: "#statements" }
      ]
    },
    "package-name-declaration": {
      captures: {
        "1": { name: "keyword.control.odin" },
        "2": { name: "entity.name.type.module.odin" }
      },
      match: /^\p{space}*(package)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
    },
    parameters: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.parameters.begin.odin" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.odin" }
      },
      name: "meta.parameters.odin",
      patterns: [
        { include: "#assignments" },
        { include: "#expressions" }
      ]
    },
    "procedure-assignment": {
      begin: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(:\p{space}*:|=)\p{space}*(#[\p{L}\p{M}\p{N}\p{Pc}]+)?\p{space}*(?=proc\b)/dgv,
      beginCaptures: {
        "1": { name: "meta.definition.function.odin entity.name.function.odin" },
        "2": { name: "keyword.operator.assignment.odin" },
        "3": { name: "keyword.other.odin" }
      },
      end: /(?=^)|(?<=\})/dgv,
      name: "meta.definition.variable.odin",
      patterns: [
        { include: "#type-declaration" }
      ]
    },
    "procedure-calls": {
      patterns: [
        {
          begin: /\b(cast|transmute)\b\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.function.odin" },
            "2": { name: "meta.brace.round.odin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.odin" }
          },
          name: "meta.function-call.odin",
          patterns: [
            { include: "#type-declaration" }
          ]
        },
        {
          begin: /\b((?:size|align)_of)\b\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "support.function.builtin.odin" },
            "2": { name: "meta.brace.round.odin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.odin" }
          },
          name: "meta.function-call.odin",
          patterns: [
            { include: "#type-declaration" }
          ]
        },
        {
          begin: /\b(len|cap|offset_of_selector|offset_of_member|offset_of|offset_of_by_string|type_of|type_info_of|typeid_of|swizzle|complex|quaternion|real|imag|jmag|kmag|conj|expand_values|min|max|abs|clamp|soa_zip|soa_unzip|make|new|new_clone|resize|reserve|append|delete|free|free_all|assert|panic)\b\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "support.function.builtin.odin" },
            "2": { name: "meta.brace.round.odin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.odin" }
          },
          name: "meta.function-call.odin",
          patterns: [
            { include: "#expressions" }
          ]
        },
        {
          begin: /([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.odin" },
            "2": { name: "meta.brace.round.odin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.odin" }
          },
          name: "meta.function-call.odin",
          patterns: [
            { include: "#expressions" }
          ]
        }
      ]
    },
    "property-access": {
      captures: {
        "1": { name: "variable.other.object.odin" },
        "2": { name: "punctuation.accessor.odin" }
      },
      match: /([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\.)\p{space}*(?=[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
    },
    punctuation: {
      match: /[\]\(\)\,\.\;\[\\\{\}]/dgv,
      name: "punctuation.odin"
    },
    "return-type-declaration": {
      begin: /->/dgv,
      beginCaptures: {
        "0": { name: "storage.type.function.arrow.odin" }
      },
      end: /(?=^|[\)\,\;\{]|where)/dgv,
      name: "meta.return.type.odin",
      patterns: [
        { include: "#comments" },
        { include: "#keywords" },
        { include: "#basic-types" },
        { include: "#property-access" },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.parameters.begin.odin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.parameters.end.odin" }
          },
          name: "meta.parameters.odin",
          patterns: [
            { include: "#comments" },
            { include: "#assignments" },
            { include: "#keywords" },
            { include: "#basic-types" },
            { include: "#property-access" },
            { include: "#type-name" },
            { include: "#punctuation" }
          ]
        },
        { include: "#type-name" }
      ]
    },
    slice: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.square.odin" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.odin" }
      },
      name: "meta.slice.odin",
      patterns: [
        {
          match: /\?/dgv,
          name: "keyword.operator.array.odin"
        },
        {
          match: /:/dgv,
          name: "keyword.operator.slice.odin"
        },
        { include: "#expressions" }
      ]
    },
    statements: {
      patterns: [
        { include: "#attribute" },
        { include: "#procedure-assignment" },
        { include: "#type-assignment" },
        { include: "#distinct-type-assignment" },
        { include: "#constant-assignment" },
        { include: "#variable-assignment" },
        { include: "#case-clause" },
        { include: "#block-label" },
        { include: "#type-annotation" },
        { include: "#block-definition" },
        { include: "#expressions" }
      ]
    },
    "string-escaped-char": {
      patterns: [
        {
          match: /\\(x1b|e|033)\[[0-9\;]*m/dgv,
          name: "constant.character.escape.ansi-color-sequence.odin"
        },
        {
          match: /\\(["'\\abefnrtuv]|x\p{AHex}{2}|u\p{AHex}{4}|U\p{AHex}{8}|[0-7]{3})/dgv,
          name: "constant.character.escape.odin"
        },
        {
          match: /%([\%E-HMTUXb-imo-tvwxz])/dgv,
          name: "constant.character.escape.placeholders.odin"
        },
        {
          match: /%(\p{Nd}*\.?\p{Nd}*f)/dgv,
          name: "constant.character.escape.placeholders-floats.odin"
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.unknown-escape.odin"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.odin" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.odin" }
          },
          name: "string.quoted.double.odin",
          patterns: [
            { include: "#string-escaped-char" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.odin" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.odin" }
          },
          name: "string.quoted.single.odin",
          patterns: [
            { include: "#string-escaped-char" }
          ]
        },
        {
          begin: /`/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.odin" }
          },
          end: /`/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.odin" }
          },
          name: "string.quoted.raw.odin"
        }
      ]
    },
    ternary: {
      begin: /\?/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.ternary.odin" }
      },
      end: /:/dgv,
      endCaptures: {
        "0": { name: "keyword.operator.ternary.odin" }
      },
      name: "meta.ternary.odin",
      patterns: [
        { include: "#expressions" }
      ]
    },
    "type-annotation": {
      begin: /(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(,)\p{space}*)?(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(,)\p{space}*)?([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "variable.name.odin" },
        "2": { name: "punctuation.odin" },
        "3": { name: "variable.name.odin" },
        "4": { name: "punctuation.odin" },
        "5": { name: "variable.name.odin" },
        "6": { name: "keyword.operator.type.annotation.odin" }
      },
      end: /(?=^|[\)\,\:\;\=]|for|switch|if|\{)/dgv,
      name: "meta.type.annotation.odin",
      patterns: [
        { include: "#type-declaration" }
      ]
    },
    "type-assignment": {
      begin: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(:\p{space}*:)\p{space}*(?=(struct|union|enum|bit_set|bit_field)\b)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.type.odin" },
        "2": { name: "keyword.operator.assignment.odin" },
        "3": { name: "storage.type.odin" }
      },
      end: /(?=^)|(?<=\})/dgv,
      name: "meta.definition.variable.odin",
      patterns: [
        { include: "#type-declaration" }
      ]
    },
    "type-declaration": {
      name: "meta.type.declaration.odin",
      patterns: [
        { include: "#map-bitset" },
        {
          begin: /\b(proc|struct|union|enum|bit_field)\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.odin" }
          },
          end: /(?=^|[\)\,\;])|(?<=\})/dgv,
          patterns: [
            { include: "#parameters" },
            { include: "#return-type-declaration" },
            { include: "#object-definition" },
            { include: "#expressions" }
          ]
        },
        { include: "#comments" },
        { include: "#strings" },
        { include: "#block-definition" },
        { include: "#keywords" },
        { include: "#basic-types" },
        { include: "#slice" },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.typeparameters.begin.odin" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.typeparameters.end.odin" }
          },
          patterns: [
            { include: "#type-declaration" }
          ]
        },
        { include: "#property-access" },
        { include: "#punctuation" },
        { include: "#type-name" }
      ]
    },
    "type-name": {
      match: /\b[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
      name: "entity.name.type.odin"
    },
    "type-parameter": {
      captures: {
        "1": { name: "keyword.operator.odin" },
        "2": { name: "entity.name.type.parameter.odin" }
      },
      match: /(\$)\p{space}*\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv
    },
    "union-member-access": {
      begin: /([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\.)\p{space}*(\()/dgv,
      beginCaptures: {
        "1": { name: "variable.other.object.odin" },
        "2": { name: "punctuation.accessor.odin" },
        "3": { name: "meta.brace.round.odin" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.odin" }
      },
      patterns: [
        { include: "#type-declaration" }
      ]
    },
    "union-non-nil-access": {
      captures: {
        "1": { name: "variable.other.object.odin" },
        "2": { name: "punctuation.accessor.odin" },
        "3": { name: "punctuation.accessor.optional.odin" }
      },
      match: /([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\.)\p{space}*(\?)/dgv
    },
    "variable-assignment": {
      captures: {
        "1": { name: "variable.name.odin" },
        "2": { name: "punctuation.odin" },
        "3": { name: "variable.name.odin" },
        "4": { name: "punctuation.odin" },
        "5": { name: "variable.name.odin" },
        "6": { name: "keyword.operator.assignment.odin" }
      },
      match: /(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(,)\p{space}*)?(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(,)\p{space}*)?([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(:\p{space}*=)/dgv,
      name: "meta.definition.variable.odin"
    },
    "variable-name": {
      match: /\b[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
      name: "variable.name.odin"
    }
  },
  dependencies: []
};
