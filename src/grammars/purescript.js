import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "purescript",
  displayName: "PureScript",
  scopeName: "source.purescript",
  patterns: [
    { include: "#module_declaration" },
    { include: "#module_import" },
    { include: "#type_synonym_declaration" },
    { include: "#data_type_declaration" },
    { include: "#typeclass_declaration" },
    { include: "#instance_declaration" },
    { include: "#derive_declaration" },
    { include: "#infix_op_declaration" },
    { include: "#foreign_import_data" },
    { include: "#foreign_import" },
    { include: "#function_type_declaration" },
    { include: "#function_type_declaration_arrow_first" },
    { include: "#typed_hole" },
    { include: "#keywords_orphan" },
    { include: "#control_keywords" },
    { include: "#function_infix" },
    { include: "#data_ctor" },
    { include: "#infix_op" },
    { include: "#constants_numeric_decimal" },
    { include: "#constant_numeric" },
    { include: "#constant_boolean" },
    { include: "#string_triple_quoted" },
    { include: "#string_single_quoted" },
    { include: "#string_double_quoted" },
    { include: "#markup_newline" },
    { include: "#string_double_colon_parens" },
    { include: "#double_colon_parens" },
    { include: "#double_colon_inlined" },
    { include: "#comments" },
    {
      match: /<-|->/dgv,
      name: "keyword.other.arrow.purescript"
    },
    {
      match: /[[\p{S}\p{P}]&&[^\]"'\(\)\,\;\[_\`\{\}]]+/dgv,
      name: "keyword.operator.purescript"
    },
    {
      match: /,/dgv,
      name: "punctuation.separator.comma.purescript"
    }
  ],
  repository: {
    block_comment: {
      patterns: [
        {
          applyEndPatternLast: 1,
          begin: /\{-\p{space}*\|/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.documentation.purescript" }
          },
          end: /-\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.documentation.purescript" }
          },
          name: "comment.block.documentation.purescript",
          patterns: [
            { include: "#block_comment" }
          ]
        },
        {
          applyEndPatternLast: 1,
          begin: /\{-/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.purescript" }
          },
          end: /-\}/dgv,
          name: "comment.block.purescript",
          patterns: [
            { include: "#block_comment" }
          ]
        }
      ]
    },
    characters: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.character.escape.purescript" },
            "2": { name: "constant.character.escape.octal.purescript" },
            "3": { name: "constant.character.escape.hexadecimal.purescript" },
            "4": { name: "constant.character.escape.control.purescript" }
          },
          match: /[ -\[\]-\~]|(\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|["\&'\\abfnrtv]))|(\\o[0-7]+)|(\\x\p{AHex}+)|(\^[\@-_])/dgv
        }
      ]
    },
    class_constraint: {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                {
                  match: /\b[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*/dgv,
                  name: "entity.name.type.purescript"
                }
              ]
            },
            "2": {
              patterns: [
                { include: "#type_name" },
                { include: "#generic_type" }
              ]
            }
          },
          match: /([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*)\p{space}+(?<classConstraint>(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)(?:\p{space}*\p{space}+\p{space}*(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*))*)/dgv,
          name: "meta.class-constraint.purescript"
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /(^[\t ]+)?(?=--+)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.purescript" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /--/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.purescript" }
              },
              end: /\n/dgv,
              name: "comment.line.double-dash.purescript"
            }
          ]
        },
        { include: "#block_comment" }
      ]
    },
    constant_boolean: {
      patterns: [
        {
          match: /\b(true|false)(?!')\b/dgv,
          name: "constant.language.boolean.purescript"
        }
      ]
    },
    constant_numeric: {
      patterns: [
        {
          match: /\b(([0-9]+_?)*[0-9]+|0([Xx]\p{AHex}+|[Oo][0-7]+))\b/dgv,
          name: "constant.numeric.purescript"
        }
      ]
    },
    constants_numeric_decimal: {
      patterns: [
        {
          captures: {
            "0": { name: "constant.numeric.decimal.purescript" },
            "1": { name: "meta.delimiter.decimal.period.purescript" },
            "2": { name: "meta.delimiter.decimal.period.purescript" },
            "3": { name: "meta.delimiter.decimal.period.purescript" },
            "4": { name: "meta.delimiter.decimal.period.purescript" },
            "5": { name: "meta.delimiter.decimal.period.purescript" },
            "6": { name: "meta.delimiter.decimal.period.purescript" }
          },
          match: /(?<!\$)\b(?:[0-9]+(\.)[0-9]+[Ee][\-\+]?[0-9]+\b|[0-9]+[Ee][\-\+]?[0-9]+\b|[0-9]+(\.)[0-9]+\b|[0-9]+\b(?!\.))(?!\$)/dgv,
          name: "constant.numeric.decimal.purescript"
        }
      ]
    },
    control_keywords: {
      patterns: [
        {
          match: /\b(do|ado|if|then|else|case|of|let|in)(?!('|\p{space}*([\:\=])))\b/dgv,
          name: "keyword.control.purescript"
        }
      ]
    },
    data_ctor: {
      patterns: [
        {
          match: /\b[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*/dgv,
          name: "entity.name.tag.purescript"
        }
      ]
    },
    data_type_declaration: {
      patterns: [
        {
          begin: /^(\p{space})*(data|newtype)\p{space}+([^\n]+?)\p{space}*(?==|(?=\n?$))/dgv,
          beginCaptures: {
            "2": { name: "storage.type.data.purescript" },
            "3": {
              name: "meta.type-signature.purescript",
              patterns: [
                { include: "#type_signature" }
              ]
            }
          },
          end: /^(?!1[\t ]|[\t ]*(?=\n?$))/dgv,
          name: "meta.declaration.type.data.purescript",
          patterns: [
            { include: "#comments" },
            {
              captures: {
                "2": {
                  patterns: [
                    { include: "#data_ctor" }
                  ]
                }
              },
              match: /(?<=([\=\|])\p{space}*)([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)/dgv
            },
            {
              captures: {
                "0": { name: "keyword.operator.pipe.purescript" }
              },
              match: /\|/dgv
            },
            { include: "#record_types" },
            { include: "#type_signature" }
          ]
        }
      ]
    },
    derive_declaration: {
      patterns: [
        {
          begin: /^\p{space}*\b(derive)(\p{space}+newtype)?(\p{space}+instance)?(?!')\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.purescript" },
            "2": { name: "keyword.other.purescript" },
            "3": { name: "keyword.other.purescript" },
            "4": { name: "keyword.other.purescript" }
          },
          contentName: "meta.type-signature.purescript",
          end: /^(?=\P{space})/dgv,
          endCaptures: {
            "1": { name: "keyword.other.purescript" }
          },
          name: "meta.declaration.derive.purescript",
          patterns: [
            { include: "#type_signature" }
          ]
        }
      ]
    },
    double_colon: {
      patterns: [
        {
          match: /::|∷/dgv,
          name: "keyword.other.double-colon.purescript"
        }
      ]
    },
    double_colon_inlined: {
      patterns: [
        {
          patterns: [
            {
              captures: {
                "1": { name: "keyword.other.double-colon.purescript" },
                "2": {
                  name: "meta.type-signature.purescript",
                  patterns: [
                    { include: "#type_signature" }
                  ]
                }
              },
              match: /(::|∷)([^\n]*?)(?=<-| """)/dgv
            }
          ]
        },
        {
          patterns: [
            {
              begin: /(::|∷)/dgv,
              beginCaptures: {
                "1": { name: "keyword.other.double-colon.purescript" }
              },
              end: /(?=^([\p{space}\P{space}]))/dgv,
              patterns: [
                { include: "#type_signature" }
              ]
            }
          ]
        }
      ]
    },
    double_colon_orphan: {
      patterns: [
        {
          begin: /(\p{space}*)(::|∷)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "2": { name: "keyword.other.double-colon.purescript" }
          },
          end: /^(?!1[\t ]*|[\t ]*(?=\n?$))/dgv,
          patterns: [
            { include: "#type_signature" }
          ]
        }
      ]
    },
    double_colon_parens: {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "$self" }
              ]
            },
            "2": { name: "keyword.other.double-colon.purescript" },
            "3": {
              name: "meta.type-signature.purescript",
              patterns: [
                { include: "#type_signature" }
              ]
            }
          },
          match: /\((?<paren>(?:[^\(\)]|\((?:(?:[^\(\)]|\((?:(?:[^\(\)]|\((?:(?:[^\(\)]|\((?:(?:[^\(\)]|\((?:)\))*)\))*)\))*)\))*)\))*)(::|∷)(?<paren2>(?:[^\(\)\}]|\((?:(?:[^\(\)\}]|\((?:(?:[^\(\)\}]|\((?:(?:[^\(\)\}]|\((?:(?:[^\(\)\}]|\((?:)\))*)\))*)\))*)\))*)\))*)\)/dgv
        }
      ]
    },
    foreign_import: {
      patterns: [
        {
          begin: /^(\p{space}*)(foreign)\p{space}+(import)\p{space}+([_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)/dgv,
          beginCaptures: {
            "2": { name: "keyword.other.purescript" },
            "3": { name: "keyword.other.purescript" },
            "4": { name: "entity.name.function.purescript" }
          },
          contentName: "meta.type-signature.purescript",
          end: /^(?!1[\t ]|[\t ]*(?=\n?$))/dgv,
          name: "meta.foreign.purescript",
          patterns: [
            { include: "#double_colon" },
            { include: "#type_signature" },
            { include: "#record_types" }
          ]
        }
      ]
    },
    foreign_import_data: {
      patterns: [
        {
          begin: /^(\p{space}*)(foreign)\p{space}+(import)\p{space}+(data)\p{space}(?:\p{space}+([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)\p{space}*(::|∷))?/dgv,
          beginCaptures: {
            "2": { name: "keyword.other.purescript" },
            "3": { name: "keyword.other.purescript" },
            "4": { name: "keyword.other.purescript" },
            "5": { name: "entity.name.type.purescript" },
            "6": { name: "keyword.other.double-colon.purescript" }
          },
          contentName: "meta.kind-signature.purescript",
          end: /^(?!1[\t ]|[\t ]*(?=\n?$))/dgv,
          name: "meta.foreign.data.purescript",
          patterns: [
            { include: "#comments" },
            { include: "#type_signature" },
            { include: "#record_types" }
          ]
        }
      ]
    },
    function_infix: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.entity.purescript" },
            "2": { name: "punctuation.definition.entity.purescript" }
          },
          match: /(`)(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*[^\n]*(`)/dgv,
          name: "keyword.operator.function.infix.purescript"
        }
      ]
    },
    function_type_declaration: {
      patterns: [
        {
          begin: /^(\p{space}*)([_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)\p{space}*(::|∷)(?![^\n]*<-)/dgv,
          beginCaptures: {
            "2": { name: "entity.name.function.purescript" },
            "3": { name: "keyword.other.double-colon.purescript" }
          },
          contentName: "meta.type-signature.purescript",
          end: /^(?!1[\t ]|[\t ]*(?=\n?$))/dgv,
          name: "meta.function.type-declaration.purescript",
          patterns: [
            { include: "#double_colon" },
            { include: "#type_signature" },
            { include: "#record_types" },
            { include: "#row_types" }
          ]
        }
      ]
    },
    function_type_declaration_arrow_first: {
      patterns: [
        {
          begin: /^(\p{space}*)\p{space}(::|∷)(?![^\n]*<-)/dgv,
          beginCaptures: {
            "2": { name: "keyword.other.double-colon.purescript" }
          },
          contentName: "meta.type-signature.purescript",
          end: /^(?!1[\t ]|[\t ]*(?=\n?$))/dgv,
          name: "meta.function.type-declaration.purescript",
          patterns: [
            { include: "#double_colon" },
            { include: "#type_signature" },
            { include: "#record_types" },
            { include: "#row_types" }
          ]
        }
      ]
    },
    generic_type: {
      patterns: [
        {
          match: /\b(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*/dgv,
          name: "variable.other.generic-type.purescript"
        }
      ]
    },
    infix_op: {
      patterns: [
        {
          match: /\((?!--+\))[[\p{S}\p{P}]&&[^\]"'\(\)\,\;\[_\`\{\}]]+\)/dgv,
          name: "entity.name.function.infix.purescript"
        }
      ]
    },
    infix_op_declaration: {
      patterns: [
        {
          begin: /^\b(infix[lr\|]?)(?!')\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.purescript" }
          },
          end: /(?=\n?$)()/dgv,
          name: "meta.infix.declaration.purescript",
          patterns: [
            { include: "#comments" },
            { include: "#data_ctor" },
            {
              match: / \p{Nd}+ /dgv,
              name: "constant.numeric.purescript"
            },
            {
              captures: {
                "1": { name: "keyword.other.purescript" }
              },
              match: /([[\p{S}\p{P}]&&[^\]"'\(\)\,\;\[_\`\{\}]]+)/dgv
            },
            {
              captures: {
                "1": { name: "keyword.other.purescript" },
                "2": { name: "entity.name.type.purescript" }
              },
              match: /\b(type)\p{space}+([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*)\b/dgv
            },
            {
              captures: {
                "1": { name: "keyword.other.purescript" }
              },
              match: /\b(as|type)\b/dgv
            }
          ]
        }
      ]
    },
    instance_declaration: {
      patterns: [
        {
          begin: /^\p{space}*\b(else\p{space}+)?(newtype\p{space}+)?(instance)(?!')\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.purescript" },
            "2": { name: "keyword.other.purescript" },
            "3": { name: "keyword.other.purescript" },
            "4": { name: "keyword.other.purescript" }
          },
          contentName: "meta.type-signature.purescript",
          end: /(\bwhere\b|(?=^\P{space}))/dgv,
          endCaptures: {
            "1": { name: "keyword.other.purescript" }
          },
          name: "meta.declaration.instance.purescript",
          patterns: [
            { include: "#type_signature" }
          ]
        }
      ]
    },
    keywords_orphan: {
      patterns: [
        {
          match: /^\p{space}*\b(derive|where|data|type|newtype|foreign(\p{space}+import)?(\p{space}+data)?)(?!')\b/dgv,
          name: "keyword.other.purescript"
        }
      ]
    },
    kind_signature: {
      patterns: [
        {
          match: /\*/dgv,
          name: "keyword.other.star.purescript"
        },
        {
          match: /!/dgv,
          name: "keyword.other.exclaimation-point.purescript"
        },
        {
          match: /#/dgv,
          name: "keyword.other.pound-sign.purescript"
        },
        {
          match: /->|→/dgv,
          name: "keyword.other.arrow.purescript"
        }
      ]
    },
    markup_newline: {
      patterns: [
        {
          match: /\\(?=\n?$)/dgv,
          name: "markup.other.escape.newline.purescript"
        }
      ]
    },
    module_declaration: {
      patterns: [
        {
          begin: /^\p{space}*\b(module)(?!')\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.purescript" }
          },
          end: /\b(where)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.other.purescript" }
          },
          name: "meta.declaration.module.purescript",
          patterns: [
            { include: "#comments" },
            { include: "#module_name" },
            { include: "#module_exports" },
            {
              match: /[a-z]+/dgv,
              name: "invalid.purescript"
            }
          ]
        }
      ]
    },
    module_exports: {
      patterns: [
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          name: "meta.declaration.exports.purescript",
          patterns: [
            { include: "#comments" },
            {
              match: /\b(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*/dgv,
              name: "entity.name.function.purescript"
            },
            { include: "#type_name" },
            {
              match: /,/dgv,
              name: "punctuation.separator.comma.purescript"
            },
            { include: "#infix_op" },
            {
              match: /\([^\n]*?\)/dgv,
              name: "meta.other.constructor-list.purescript"
            }
          ]
        }
      ]
    },
    module_import: {
      patterns: [
        {
          begin: /^\p{space}*\b(import)(?!')\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.purescript" }
          },
          end: /^(?=\P{space})/dgv,
          name: "meta.import.purescript",
          patterns: [
            { include: "#module_name" },
            { include: "#string_double_quoted" },
            { include: "#comments" },
            { include: "#module_exports" },
            {
              captures: {
                "1": { name: "keyword.other.purescript" }
              },
              match: /\b(as|hiding)\b/dgv
            }
          ]
        }
      ]
    },
    module_name: {
      patterns: [
        {
          match: /(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)*[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.?/dgv,
          name: "support.other.module.purescript"
        }
      ]
    },
    record_field_declaration: {
      patterns: [
        {
          begin: /([ \,]"(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)"|[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)\p{space}*(::|∷)/dgv,
          beginCaptures: {
            "1": {
              patterns: [
                {
                  match: /(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*/dgv,
                  name: "entity.other.attribute-name.purescript"
                },
                {
                  match: /"([_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*|[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)"/dgv,
                  name: "string.quoted.double.purescript"
                }
              ]
            },
            "2": { name: "keyword.other.double-colon.purescript" }
          },
          contentName: "meta.type-signature.purescript",
          end: /(?=([ \,]"(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)"|[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)\p{space}*(::|∷)|\}| \)|^(?!1[\t ]|[\t ]*(?=\n?$)))/dgv,
          name: "meta.record-field.type-declaration.purescript",
          patterns: [
            { include: "#record_types" },
            { include: "#type_signature" },
            { include: "#comments" }
          ]
        }
      ]
    },
    record_types: {
      patterns: [
        {
          begin: /\{(?!-)/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.type.record.begin.purescript" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "keyword.operator.type.record.end.purescript" }
          },
          name: "meta.type.record.purescript",
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.separator.comma.purescript"
            },
            { include: "#comments" },
            { include: "#record_field_declaration" },
            { include: "#type_signature" }
          ]
        }
      ]
    },
    row_types: {
      patterns: [
        {
          begin: /\((?=\p{space}*([_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*|"[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*"|"[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*")\p{space}*(::|∷))/dgv,
          end: /(?=^\P{space})/dgv,
          name: "meta.type.row.purescript",
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.separator.comma.purescript"
            },
            { include: "#comments" },
            { include: "#record_field_declaration" },
            { include: "#type_signature" }
          ]
        }
      ]
    },
    string_double_colon_parens: {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "$self" }
              ]
            },
            "2": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          match: /\(([^\n]*?)("(?:[ -\[\]-\~]|(\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|["\&'\\abfnrtv]))|(\\o[0-7]+)|(\\x\p{AHex}+)|(\^[\@-_]))*(::|∷)([ -\[\]-\~]|(\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|["\&'\\abfnrtv]))|(\\o[0-7]+)|(\\x\p{AHex}+)|(\^[\@-_]))*")/dgv
        }
      ]
    },
    string_double_quoted: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.purescript" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.purescript" }
          },
          name: "string.quoted.double.purescript",
          patterns: [
            { include: "#characters" },
            {
              begin: /\\\p{space}/dgv,
              beginCaptures: {
                "0": { name: "markup.other.escape.newline.begin.purescript" }
              },
              end: /\\/dgv,
              endCaptures: {
                "0": { name: "markup.other.escape.newline.end.purescript" }
              },
              patterns: [
                {
                  match: /\P{space}+/dgv,
                  name: "invalid.illegal.character-not-allowed-here.purescript"
                }
              ]
            }
          ]
        }
      ]
    },
    string_single_quoted: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.string.begin.purescript" },
            "2": {
              patterns: [
                { include: "#characters" }
              ]
            },
            "7": { name: "punctuation.definition.string.end.purescript" }
          },
          match: /(')([ -\[\]-\~]|(\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|["\&'\\abfnrtv]))|(\\o[0-7]+)|(\\x\p{AHex}+)|(\^[\@-_]))(')/dgv,
          name: "string.quoted.single.purescript"
        }
      ]
    },
    string_triple_quoted: {
      patterns: [
        {
          begin: /"""/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.purescript" }
          },
          end: /"""/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.purescript" }
          },
          name: "string.quoted.triple.purescript"
        }
      ]
    },
    type_kind_signature: {
      patterns: [
        {
          begin: /^(data|newtype)\p{space}+([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)\p{space}*(::|∷)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.data.purescript" },
            "2": {
              name: "meta.type-signature.purescript",
              patterns: [
                { include: "#type_signature" }
              ]
            },
            "3": { name: "keyword.other.double-colon.purescript" }
          },
          end: /(?=^\P{space})/dgv,
          name: "meta.declaration.type.data.signature.purescript",
          patterns: [
            { include: "#type_signature" },
            {
              captures: {
                "0": { name: "keyword.operator.assignment.purescript" }
              },
              match: /=/dgv
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "#data_ctor" }
                  ]
                },
                "2": {
                  name: "meta.type-signature.purescript",
                  patterns: [
                    { include: "#type_signature" }
                  ]
                }
              },
              match: /\b([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*)\p{space}+(?<ctorArgs>(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*|(?:(?:[\]'\(\)\,\[→⇒\p{L}\p{M}\p{N}\p{Pc}]|->|=>)+\p{space}*)+)(?:\p{space}*\p{space}+\p{space}*(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*|(?:(?:[\]'\(\)\,\[→⇒\p{L}\p{M}\p{N}\p{Pc}]|->|=>)+\p{space}*)+))*)?/dgv
            },
            {
              captures: {
                "0": { name: "keyword.operator.pipe.purescript" }
              },
              match: /\|/dgv
            },
            { include: "#record_types" }
          ]
        }
      ]
    },
    type_name: {
      patterns: [
        {
          match: /\b[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*/dgv,
          name: "entity.name.type.purescript"
        }
      ]
    },
    type_signature: {
      patterns: [
        { include: "#record_types" },
        {
          captures: {
            "1": {
              patterns: [
                { include: "#class_constraint" }
              ]
            },
            "6": { name: "keyword.other.big-arrow.purescript" }
          },
          match: /\((?<classConstraints>([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*)\p{space}+(?<classConstraint>(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)(?:\p{space}*\p{space}+\p{space}*(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*))*)(?:\p{space}*,\p{space}*([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*)\p{space}+((?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)(?:\p{space}*\p{space}+\p{space}*(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*))*))*)\)\p{space}*(=>|<=|[⇐⇒])/dgv,
          name: "meta.class-constraints.purescript"
        },
        {
          captures: {
            "1": {
              patterns: [
                { include: "#class_constraint" }
              ]
            },
            "4": { name: "keyword.other.big-arrow.purescript" }
          },
          match: /(([\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*)\p{space}+(?<classConstraint>(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)(?:\p{space}*\p{space}+\p{space}*(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*|(?:[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*(?:\.[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)*\.)?[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*))*))\p{space}*(=>|<=|[⇐⇒])/dgv,
          name: "meta.class-constraints.purescript"
        },
        {
          match: /(?<![[\p{S}\p{P}]&&[^\]"'\(\)\,\;\[_\`\{\}]])(->|→)/dgv,
          name: "keyword.other.arrow.purescript"
        },
        {
          match: /(?<![[\p{S}\p{P}]&&[^\]"'\(\)\,\;\[_\`\{\}]])(=>|⇒)/dgv,
          name: "keyword.other.big-arrow.purescript"
        },
        {
          match: /<=|⇐/dgv,
          name: "keyword.other.big-arrow-left.purescript"
        },
        {
          match: /forall|∀/dgv,
          name: "keyword.other.forall.purescript"
        },
        { include: "#string_double_quoted" },
        { include: "#generic_type" },
        { include: "#type_name" },
        { include: "#comments" },
        {
          match: /[[\p{S}\p{P}]&&[^\]"'\(\)\,\;\[_\`\{\}]]+/dgv,
          name: "keyword.other.purescript"
        }
      ]
    },
    type_synonym_declaration: {
      patterns: [
        {
          begin: /^(\p{space})*(type)\p{space}+([^\n]+?)\p{space}*(?==|(?=\n?$))/dgv,
          beginCaptures: {
            "2": { name: "storage.type.data.purescript" },
            "3": {
              name: "meta.type-signature.purescript",
              patterns: [
                { include: "#type_signature" }
              ]
            }
          },
          contentName: "meta.type-signature.purescript",
          end: /^(?!1[\t ]|[\t ]*(?=\n?$))/dgv,
          name: "meta.declaration.type.type.purescript",
          patterns: [
            {
              captures: {
                "0": { name: "keyword.operator.assignment.purescript" }
              },
              match: /=/dgv
            },
            { include: "#type_signature" },
            { include: "#record_types" },
            { include: "#row_types" },
            { include: "#comments" }
          ]
        }
      ]
    },
    typeclass_declaration: {
      patterns: [
        {
          begin: /^\p{space}*\b(class)(?!')\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.purescript" }
          },
          end: /(\bwhere\b|(?=^\P{space}))/dgv,
          endCaptures: {
            "1": { name: "keyword.other.purescript" }
          },
          name: "meta.declaration.typeclass.purescript",
          patterns: [
            { include: "#type_signature" }
          ]
        }
      ]
    },
    typed_hole: {
      patterns: [
        {
          match: /\?(?:[_\p{Ll}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*|[\p{Lu}\p{Lt}]['_\p{Ll}\p{Lu}\p{Lt}\p{Nd}]*)/dgv,
          name: "entity.name.function.typed-hole.purescript"
        }
      ]
    }
  },
  dependencies: []
};
