export default {
  name: "smalltalk",
  displayName: "GNU Smalltalk",
  scopeName: "source.smalltalk.gnu",
  patterns: [
    { include: "#shebang" },
    { include: "#comments" },
    { include: "#gst_definition_structures" },
    { include: "#gst_other_constructs" },
    { include: "#message_sends" },
    { include: "#assignments_and_returns" },
    { include: "#block_structures" },
    { include: "#all_literals" },
    { include: "#identifiers_and_variables" },
    { include: "#gst_file_out_chunk_separators" },
    { include: "#punctuation_general" }
  ],
  repository: {
    all_literals: {
      patterns: [
        { include: "#literals_string" },
        { include: "#literals_character" },
        { include: "#literals_numeric" },
        { include: "#literals_symbol" },
        { include: "#literals_array_static" },
        { include: "#literals_byte_array" },
        { include: "#gst_literals_special" }
      ]
    },
    assignments_and_returns: {
      patterns: [
        {
          match: /:=/dgv,
          name: "keyword.operator.assignment.smalltalk"
        },
        {
          match: /_/dgv,
          name: "keyword.operator.assignment.underscore.gst.smalltalk"
        },
        {
          match: /\^/dgv,
          name: "keyword.control.return.smalltalk"
        }
      ]
    },
    block_structures: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.begin.smalltalk" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.end.smalltalk" }
      },
      name: "meta.block.literal.smalltalk",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.variable.parameter.block.smalltalk" },
            "2": { name: "variable.parameter.block.smalltalk" }
          },
          match: /(:)([a-z][0-9A-Z_a-z]*)/dgv
        },
        {
          match: /\|/dgv,
          name: "punctuation.separator.variable.block.smalltalk"
        },
        {
          begin: /(\|)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.variable.local.begin.smalltalk" }
          },
          end: /(\|)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.variable.local.end.smalltalk" }
          },
          name: "meta.variable.local.definition.smalltalk",
          patterns: [
            {
              match: /\b[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "variable.other.local.smalltalk"
            }
          ]
        },
        { include: "$self" }
      ]
    },
    comments: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.begin.smalltalk" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.end.smalltalk" }
      },
      name: "comment.block.double-quoted.smalltalk"
    },
    gst_definition_structures: {
      patterns: [
        {
          begin: /\b(Namespace)\p{space}+(current:)\p{space}+([^\[\p{space}]+)\p{space}*(\[)/dgv,
          beginCaptures: {
            "1": { name: "support.class.gst.smalltalk" },
            "2": { name: "keyword.declaration.namespace.gst.smalltalk" },
            "3": { name: "entity.name.namespace.gst.smalltalk" },
            "4": { name: "punctuation.definition.namespace.body.begin.gst.smalltalk" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.namespace.body.end.gst.smalltalk" }
          },
          name: "meta.namespace.definition.gst.smalltalk",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\b([A-Z][0-9A-Z_a-z]*)\p{space}+(extend)\p{space}*(\[)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.type.class.gst.smalltalk" },
            "2": { name: "keyword.declaration.class.extend.gst.smalltalk" },
            "3": { name: "punctuation.definition.class.body.begin.gst.smalltalk" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.class.body.end.gst.smalltalk" }
          },
          name: "meta.class.extension.gst.smalltalk",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\b([A-Z][0-9A-Z_a-z]*)(?:\p{space}+(class))?\p{space}+(>>)\p{space}+([^\[\p{space}]+)\p{space}*(\[)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.type.class.gst.smalltalk" },
            "2": { name: "storage.modifier.class-side.smalltalk" },
            "3": { name: "punctuation.definition.method.scoped.gst.smalltalk" },
            "4": { name: "entity.name.function.definition.gst.smalltalk" },
            "5": { name: "punctuation.definition.method.body.begin.gst.smalltalk" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.method.body.end.gst.smalltalk" }
          },
          name: "meta.method.definition.gst.smalltalk",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    gst_file_out_chunk_separators: {
      patterns: [
        {
          match: /!/dgv,
          name: "punctuation.separator.chunk.gst.smalltalk"
        }
      ]
    },
    gst_literals_special: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.array.constructor.begin.gst.smalltalk" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.array.constructor.end.gst.smalltalk" }
          },
          name: "meta.array.constructor.dynamic.gst.smalltalk",
          patterns: [
            {
              match: /\./dgv,
              name: "punctuation.separator.array.constructor.gst.smalltalk"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /#\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.binding.begin.gst.smalltalk" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.binding.end.gst.smalltalk" }
          },
          name: "constant.other.binding.gst.smalltalk",
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.namespace.gst.smalltalk" },
                "2": { name: "punctuation.separator.namespace.gst.smalltalk" },
                "3": { name: "entity.name.type.class.smalltalk" }
              },
              match: /([A-Z][0-9A-Z_a-z]*)(::)([A-Z][0-9A-Z_a-z]*)/dgv
            },
            {
              match: /[A-Z][0-9A-Z_a-z]*/dgv,
              name: "entity.name.type.class.smalltalk"
            }
          ]
        },
        {
          begin: /(##)(\()/dgv,
          beginCaptures: {
            "1": { name: "constant.other.compile-time.marker.gst.smalltalk" },
            "2": { name: "punctuation.definition.compile-time.begin.gst.smalltalk" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.compile-time.end.gst.smalltalk" }
          },
          name: "meta.compile-time-constant.gst.smalltalk",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    gst_other_constructs: {
      patterns: [
        {
          begin: /\b(Eval)\p{space}*(\[)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.eval.gst.smalltalk" },
            "2": { name: "punctuation.definition.eval.body.begin.gst.smalltalk" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.eval.body.end.gst.smalltalk" }
          },
          name: "meta.eval.gst.smalltalk",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /</dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.attribute.begin.gst.smalltalk" }
          },
          end: />/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.attribute.end.gst.smalltalk" }
          },
          name: "meta.attribute.gst.smalltalk",
          patterns: [
            {
              captures: {
                "1": { name: "keyword.control.primitive.gst.smalltalk" },
                "2": { name: "entity.name.function.primitive.gst.smalltalk" }
              },
              match: /\b(primitive:)\p{space}*([0-9A-Z_a-z]+|'[^']*')/dgv
            },
            { include: "$self" }
          ]
        }
      ]
    },
    identifiers_and_variables: {
      patterns: [
        {
          match: /\bself\b/dgv,
          name: "variable.language.self.smalltalk"
        },
        {
          match: /\bsuper\b/dgv,
          name: "variable.language.super.smalltalk"
        },
        {
          match: /\bthisContext\b/dgv,
          name: "variable.language.this-context.gst.smalltalk"
        },
        {
          match: /\bnil\b/dgv,
          name: "constant.language.nil.smalltalk"
        },
        {
          match: /\b(true|false)\b/dgv,
          name: "constant.language.boolean.smalltalk"
        },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
          name: "entity.name.type.class.smalltalk"
        },
        {
          match: /\b[_a-z][0-9A-Z_a-z]*\b/dgv,
          name: "variable.other.smalltalk"
        }
      ]
    },
    literals_array_static: {
      begin: /#\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.array.begin.smalltalk" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.array.end.smalltalk" }
      },
      name: "meta.array.literal.smalltalk",
      patterns: [
        { include: "#literals_string" },
        { include: "#literals_character" },
        { include: "#literals_numeric" },
        { include: "#literals_symbol" },
        { include: "#literals_array_static" },
        {
          match: /\bnil\b/dgv,
          name: "constant.language.nil.smalltalk"
        },
        {
          match: /\b(true|false)\b/dgv,
          name: "constant.language.boolean.smalltalk"
        }
      ]
    },
    literals_byte_array: {
      begin: /#\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.bytearray.begin.smalltalk" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.bytearray.end.smalltalk" }
      },
      name: "meta.bytearray.literal.smalltalk",
      patterns: [
        {
          match: /\b([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\b/dgv,
          name: "constant.numeric.integer.byte.smalltalk"
        },
        {
          match: /[^\]0-9\p{space}]+/dgv,
          name: "invalid.illegal.byte-value.smalltalk"
        }
      ]
    },
    literals_character: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.character.numeric.begin.gst.smalltalk" },
            "2": { name: "constant.numeric.radix.base.smalltalk" },
            "3": { name: "constant.numeric.integer.smalltalk" },
            "4": { name: "constant.numeric.integer.smalltalk" },
            "5": { name: "punctuation.definition.character.numeric.end.gst.smalltalk" }
          },
          match: /(\$<)(?:([0-9]+r)([0-9A-Za-z]+)|([0-9]+))(>)/dgv,
          name: "constant.character.numeric.gst.smalltalk"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.character.smalltalk" }
          },
          match: /(\$)([^\n])/dgv,
          name: "constant.character.simple.smalltalk"
        }
      ]
    },
    literals_numeric: {
      patterns: [
        {
          captures: {
            "2": { name: "constant.numeric.radix.base.smalltalk" },
            "3": { name: "constant.numeric.radix.number.smalltalk" },
            "4": { name: "constant.numeric.radix.number.smalltalk" },
            "5": { name: "constant.numeric.scaled-decimal.scale-indicator.gst.smalltalk" },
            "6": { name: "constant.numeric.integer.scale-value.gst.smalltalk" }
          },
          match: /(-)?(\p{Nd}+r)([0-9A-Z_a-z]+)(?:\.([0-9A-Z_a-z]+))?(s)(-?\p{Nd}+)?/dgv,
          name: "constant.numeric.scaled-decimal.gst.smalltalk"
        },
        {
          captures: {
            "4": { name: "constant.numeric.scaled-decimal.scale-indicator.gst.smalltalk" },
            "5": { name: "constant.numeric.integer.scale-value.gst.smalltalk" }
          },
          match: /(-)?([0-9][0-9_]*)\.([0-9][0-9_]*)(s)(-?\p{Nd}+)?/dgv,
          name: "constant.numeric.scaled-decimal.gst.smalltalk"
        },
        {
          captures: {
            "3": { name: "constant.numeric.scaled-decimal.scale-indicator.gst.smalltalk" },
            "4": { name: "constant.numeric.integer.scale-value.gst.smalltalk" }
          },
          match: /(-)?([0-9][0-9_]*)(s)(-?\p{Nd}+)?/dgv,
          name: "constant.numeric.scaled-decimal.gst.smalltalk"
        },
        {
          captures: {
            "2": { name: "constant.numeric.radix.base.smalltalk" },
            "3": { name: "constant.numeric.radix.number.smalltalk" },
            "4": { name: "constant.numeric.radix.number.smalltalk" },
            "5": { name: "constant.numeric.float.exponent-indicator.smalltalk" },
            "6": { name: "constant.numeric.integer.smalltalk" }
          },
          match: /(-)?(\p{Nd}+r)([0-9A-Z_a-z]+)\.([0-9A-Z_a-z]+)([deq])(-?\p{Nd}+)?/dgv,
          name: "constant.numeric.float.smalltalk"
        },
        {
          captures: {
            "2": { name: "constant.numeric.radix.base.smalltalk" },
            "3": { name: "constant.numeric.radix.number.smalltalk" },
            "4": { name: "constant.numeric.radix.number.smalltalk" },
            "5": { name: "constant.numeric.float.exponent-indicator.smalltalk" }
          },
          match: /(-)?(\p{Nd}+r)([0-9A-Z_a-z]+)\.([0-9A-Z_a-z]+)([deq])/dgv,
          name: "constant.numeric.float.smalltalk"
        },
        {
          captures: {
            "2": { name: "constant.numeric.radix.base.smalltalk" },
            "3": { name: "constant.numeric.radix.number.smalltalk" },
            "4": { name: "constant.numeric.float.exponent-indicator.smalltalk" },
            "5": { name: "constant.numeric.integer.smalltalk" }
          },
          match: /(-)?(\p{Nd}+r)([0-9A-Z_a-z]+)([deq])(-?\p{Nd}+)?/dgv,
          name: "constant.numeric.float.smalltalk"
        },
        {
          captures: {
            "2": { name: "constant.numeric.radix.base.smalltalk" },
            "3": { name: "constant.numeric.radix.number.smalltalk" },
            "4": { name: "constant.numeric.radix.number.smalltalk" }
          },
          match: /(-)?(\p{Nd}+r)([0-9A-Z_a-z]+)\.([0-9A-Z_a-z]+)/dgv,
          name: "constant.numeric.float.smalltalk"
        },
        {
          captures: {
            "4": { name: "constant.numeric.float.exponent-indicator.smalltalk" },
            "5": { name: "constant.numeric.integer.smalltalk" }
          },
          match: /(-)?([0-9][0-9_]*)\.([0-9][0-9_]*)([deq])(-?\p{Nd}+)?/dgv,
          name: "constant.numeric.float.smalltalk"
        },
        {
          captures: {
            "4": { name: "constant.numeric.float.exponent-indicator.smalltalk" }
          },
          match: /(-)?([0-9][0-9_]*)\.([0-9][0-9_]*)([deq])/dgv,
          name: "constant.numeric.float.smalltalk"
        },
        {
          captures: {
            "3": { name: "constant.numeric.float.exponent-indicator.smalltalk" },
            "4": { name: "constant.numeric.integer.smalltalk" }
          },
          match: /(-)?([0-9][0-9_]*)([deq])(-?\p{Nd}+)?/dgv,
          name: "constant.numeric.float.smalltalk"
        },
        {
          captures: {
            "2": { name: "constant.numeric.radix.base.smalltalk" },
            "3": { name: "constant.numeric.radix.number.smalltalk" }
          },
          match: /(-)?(\p{Nd}+r)([0-9A-Z_a-z]+)/dgv,
          name: "constant.numeric.integer.radix.smalltalk"
        },
        {
          match: /(-)?([0-9][0-9_]*)\.([0-9][0-9_]*)/dgv,
          name: "constant.numeric.float.smalltalk"
        },
        {
          match: /(-)?([0-9][0-9_]*)/dgv,
          name: "constant.numeric.integer.smalltalk"
        }
      ]
    },
    literals_string: {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.smalltalk" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.smalltalk" }
      },
      name: "string.quoted.single.smalltalk",
      patterns: [
        {
          match: /''/dgv,
          name: "constant.character.escape.apostrophe.smalltalk"
        }
      ]
    },
    literals_symbol: {
      patterns: [
        {
          begin: /(#)(')/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.symbol.smalltalk" },
            "2": { name: "punctuation.definition.string.begin.symbol.smalltalk" }
          },
          contentName: "string.quoted.single.symbol.smalltalk",
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.symbol.smalltalk" }
          },
          name: "constant.other.symbol.quoted.smalltalk",
          patterns: [
            {
              match: /''/dgv,
              name: "constant.character.escape.apostrophe.smalltalk"
            }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.symbol.smalltalk" }
          },
          match: /(#)([\%\&\*-\-\/\<-\@\\\|\~]+)/dgv,
          name: "constant.other.symbol.operator.smalltalk"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.symbol.smalltalk" }
          },
          match: /(#)(\p{Nd}+(\.\p{Nd}+)?(s\p{Nd}*)?)/dgv,
          name: "constant.other.symbol.numeric.smalltalk"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.symbol.smalltalk" },
            "2": { name: "entity.name.function.keyword.symbol.smalltalk" }
          },
          match: /(#)([A-Za-z][0-9A-Z_a-z]*:([A-Za-z][0-9A-Z_a-z]*:)*)/dgv,
          name: "constant.other.symbol.keyword.smalltalk"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.symbol.smalltalk" }
          },
          match: /(#)([A-Za-z][0-9A-Z_a-z]*)/dgv,
          name: "constant.other.symbol.identifier.smalltalk"
        }
      ]
    },
    message_send_components: {
      patterns: [
        {
          match: /\b([A-Za-z][0-9A-Z_a-z]*:)/dgv,
          name: "entity.name.function.keyword.smalltalk"
        },
        {
          match: /([ \!\%\&\*-\-\/\<-\@\\\|\~]+)/dgv,
          name: "keyword.operator.binary.smalltalk"
        }
      ]
    },
    message_sends: {
      patterns: [
        { include: "#message_send_components" }
      ]
    },
    punctuation_general: {
      patterns: [
        {
          match: /\./dgv,
          name: "punctuation.terminator.statement.smalltalk"
        },
        {
          match: /;/dgv,
          name: "punctuation.separator.cascade.smalltalk"
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.group.begin.smalltalk" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.group.end.smalltalk" }
          },
          name: "meta.expression.parenthesized.smalltalk",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    shebang: {
      captures: {
        "0": { name: "comment.line.shebang.gst.smalltalk" },
        "1": { name: "punctuation.definition.comment.shebang.gst.smalltalk" },
        "2": { name: "comment.line.shebang.content.gst.smalltalk" }
      },
      match: /^(#!)([^\n]*)/dgv
    }
  },
  dependencies: []
};
