export default {
  name: "gdresource",
  displayName: "GDResource",
  aliases: [
    "tscn",
    "tres"
  ],
  scopeName: "source.gdresource",
  patterns: [
    { include: "#embedded_shader" },
    { include: "#embedded_gdscript" },
    { include: "#comment" },
    { include: "#heading" },
    { include: "#key_value" }
  ],
  repository: {
    comment: {
      captures: {
        "1": { name: "punctuation.definition.comment.gdresource" }
      },
      match: /(;)[^\n]*(?=\n?$)\n?/dgv,
      name: "comment.line.gdresource"
    },
    data: {
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(\{)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.table.inline.gdresource" }
          },
          end: /\p{space}*(\})(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.table.inline.gdresource" }
          },
          patterns: [
            { include: "#key_value" },
            { include: "#data" }
          ]
        },
        {
          begin: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(\[)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.array.gdresource" }
          },
          end: /\p{space}*(\])(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.array.gdresource" }
          },
          patterns: [
            { include: "#data" }
          ]
        },
        {
          begin: /"""/dgv,
          end: /"""/dgv,
          name: "string.quoted.triple.basic.block.gdresource",
          patterns: [
            {
              match: /\\([\n "\/\\bfnrt]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape.gdresource"
            },
            {
              match: /\\[^\n"\/\\bfnrt]/dgv,
              name: "invalid.illegal.escape.gdresource"
            }
          ]
        },
        {
          match: /"res:\/\/[^"\\]*(?:\\[^\n][^"\\]*)*"/dgv,
          name: "support.function.any-method.gdresource"
        },
        {
          match: /(?<=type=)"[^"\\]*(?:\\[^\n][^"\\]*)*"/dgv,
          name: "support.class.library.gdresource"
        },
        {
          match: /(?<=NodePath\(|parent=|name=)"[^"\\]*(?:\\[^\n][^"\\]*)*"/dgv,
          name: "constant.character.escape.gdresource"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.basic.line.gdresource",
          patterns: [
            {
              match: /\\([\n "\/\\bfnrt]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape.gdresource"
            },
            {
              match: /\\[^\n"\/\\bfnrt]/dgv,
              name: "invalid.illegal.escape.gdresource"
            }
          ]
        },
        {
          match: /'[^\n]*?'/dgv,
          name: "string.quoted.single.literal.line.gdresource"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(true|false)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "constant.language.gdresource"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?(0|([1-9](([0-9]|_[0-9])+)?))(?:(?:\.(0|([1-9](([0-9]|_[0-9])+)?)))?[Ee][\-\+]?[1-9]_?[0-9]*|\.[0-9_]*))(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "constant.numeric.float.gdresource"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?(0|([1-9](([0-9]|_[0-9])+)?)))(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "constant.numeric.integer.gdresource"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?inf)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "constant.numeric.inf.gdresource"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?nan)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "constant.numeric.nan.gdresource"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(0x((\p{AHex}((_??\p{AHex})+)?)))(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "constant.numeric.hex.gdresource"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(0o[0-7](_?[0-7])*)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "constant.numeric.oct.gdresource"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(0b[01](_?[01])*)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "constant.numeric.bin.gdresource"
        },
        {
          begin: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(Vector2i??|Vector3i??|Color|Rect2i??|Array|Basis|Dictionary|Plane|Quat|RID|Rect3|Transform|Transform2D|Transform3D|AABB|String|Color|NodePath|Object|PoolByteArray|PoolIntArray|PoolRealArray|PoolStringArray|PoolVector2Array|PoolVector3Array|PoolColorArray|bool|int|float|StringName|Quaternion|PackedByteArray|PackedInt32Array|PackedInt64Array|PackedFloat32Array|PackedFloat64Array|PackedStringArray|PackedVector2Array|PackedVector2iArray|PackedVector3Array|PackedVector3iArray|PackedColorArray)(\()\p{space}?/dgv,
          beginCaptures: {
            "1": { name: "support.class.library.gdresource" }
          },
          end: /\p{space}?(\))/dgv,
          patterns: [
            { include: "#key_value" },
            { include: "#data" }
          ]
        },
        {
          begin: /(?<![\p{L}\p{M}\p{N}\p{Pc}])((?:Ext|Sub)Resource)(\()\p{space}?/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.gdresource" }
          },
          end: /\p{space}?(\))/dgv,
          patterns: [
            { include: "#key_value" },
            { include: "#data" }
          ]
        }
      ]
    },
    embedded_gdscript: {
      begin: /(script\/source) = "/dgv,
      beginCaptures: {
        "1": { name: "variable.other.property.gdresource" }
      },
      end: /"/dgv,
      patterns: [
        { include: "source.gdscript" }
      ]
    },
    embedded_shader: {
      begin: /(code) = "/dgv,
      beginCaptures: {
        "1": { name: "variable.other.property.gdresource" }
      },
      end: /"/dgv,
      name: "meta.embedded.block.gdshader",
      patterns: [
        { include: "source.gdshader" }
      ]
    },
    heading: {
      begin: /\[([_a-z]*)\p{space}?/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.gdresource" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#heading_properties" },
        { include: "#data" }
      ]
    },
    heading_properties: {
      patterns: [
        {
          match: /(\p{space}*[\-A-Z_a-z][\-0-9A-Z_a-z]*\p{space}*=)(?=\p{space}*(?=\n?$))/dgv,
          name: "invalid.illegal.noValue.gdresource"
        },
        {
          begin: /\p{space}*([\-A-Z_a-z]\P{space}*|"[^\n]+"|'[^\n]+'|[0-9]+)\p{space}*(=)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "variable.other.property.gdresource" },
            "2": { name: "punctuation.definition.keyValue.gdresource" }
          },
          end: /((?=\n?$)|(?==)|,?|\p{space}*(?=\}))/dgv,
          patterns: [
            { include: "#data" }
          ]
        }
      ]
    },
    key_value: {
      patterns: [
        {
          match: /(\p{space}*[\-A-Z_a-z][\-0-9A-Z_a-z]*\p{space}*=)(?=\p{space}*(?=\n?$))/dgv,
          name: "invalid.illegal.noValue.gdresource"
        },
        {
          begin: /\p{space}*([\-A-Z_a-z]\P{space}*|"[^\n]+"|'[^\n]+'|[0-9]+)\p{space}*(=)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "variable.other.property.gdresource" },
            "2": { name: "punctuation.definition.keyValue.gdresource" }
          },
          end: /((?=\n?$)|(?==)|,|\p{space}*(?=\}))/dgv,
          patterns: [
            { include: "#data" }
          ]
        }
      ]
    }
  },
  dependencies: [
    "gdshader",
    "gdscript"
  ]
};
