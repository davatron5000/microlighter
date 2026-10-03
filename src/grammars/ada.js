export default {
  name: "ada",
  displayName: "Ada",
  scopeName: "source.ada",
  patterns: [
    { include: "#library_unit" },
    { include: "#comment" },
    { include: "#use_clause" },
    { include: "#with_clause" },
    { include: "#pragma" },
    { include: "#keyword" }
  ],
  repository: {
    abort_statement: {
      begin: /\babort\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.abort.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        {
          match: /\b([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
          name: "entity.name.task.ada"
        }
      ]
    },
    accept_statement: {
      begin: /\b(accept)\p{space}+([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "entity.name.accept.ada" }
      },
      end: /(?:\b(end)\p{space}*(\p{space}2)?\p{space}*)?(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "entity.name.accept.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.statement.accept.ada",
      patterns: [
        {
          begin: /\bdo\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /\b(?=end)\b/dgiv,
          patterns: [
            { include: "#statement" }
          ]
        },
        { include: "#parameter_profile" }
      ]
    },
    access_definition: {
      captures: {
        "1": { name: "storage.visibility.ada" },
        "2": { name: "storage.visibility.ada" },
        "3": { name: "storage.modifier.ada" },
        "4": { name: "entity.name.type.ada" }
      },
      match: /(not\p{space}+null\p{space}+)?(access)\p{space}+(constant\p{space}+)?([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      name: "meta.declaration.access.definition.ada"
    },
    access_type_definition: {
      begin: /\b(not\p{space}+null\p{space}+)?(access)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.visibility.ada" },
        "2": { name: "storage.visibility.ada" }
      },
      end: /(?=(with|;))/dgiv,
      name: "meta.declaration.type.definition.access.ada",
      patterns: [
        {
          match: /\ball\b/dgiv,
          name: "storage.visibility.ada"
        },
        {
          match: /\bconstant\b/dgiv,
          name: "storage.modifier.ada"
        },
        { include: "#subtype_mark" }
      ]
    },
    actual_parameter_part: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.ada" }
      },
      end: /\)/dgv,
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        { include: "#parameter_association" }
      ]
    },
    adding_operator: {
      match: /([\-\&\+])/dgv,
      name: "keyword.operator.adding.ada"
    },
    array_aggregate: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.ada" }
      },
      end: /\)/dgv,
      name: "meta.definition.array.aggregate.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        { include: "#positional_array_aggregate" },
        { include: "#array_component_association" }
      ]
    },
    array_component_association: {
      captures: {
        "1": { name: "variable.name.ada" },
        "2": { name: "keyword.other.ada" },
        "3": {
          patterns: [
            {
              match: /<>/dgv,
              name: "keyword.modifier.unknown.ada"
            },
            { include: "#expression" }
          ]
        }
      },
      match: /\b([^\(\)\=\>]*)\p{space}*(=>)\p{space}*([^\)\,]+)/dgv,
      name: "meta.definition.array.aggregate.component.ada"
    },
    array_dimensions: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.ada" }
      },
      end: /\)/dgv,
      name: "meta.declaration.type.definition.array.dimensions.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        {
          match: /\brange\b/dgiv,
          name: "storage.modifier.ada"
        },
        {
          match: /<>/dgv,
          name: "keyword.modifier.unknown.ada"
        },
        {
          match: /\.\./dgv,
          name: "keyword.ada"
        },
        { include: "#expression" },
        {
          patterns: [
            { include: "#subtype_mark" }
          ]
        }
      ]
    },
    array_type_definition: {
      begin: /\barray\b/dgiv,
      beginCaptures: {
        "0": { name: "storage.modifier.ada" }
      },
      end: /(?=(with|;))/dgiv,
      name: "meta.declaration.type.definition.array.ada",
      patterns: [
        { include: "#array_dimensions" },
        {
          match: /\bof\b/dgiv,
          name: "storage.modifier.ada"
        },
        {
          match: /\baliased\b/dgiv,
          name: "storage.visibility.ada"
        },
        { include: "#access_definition" },
        { include: "#subtype_mark" }
      ]
    },
    aspect_clause: {
      begin: /\b(for)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" },
        "2": {
          patterns: [
            { include: "#subtype_mark" }
          ]
        },
        "3": { name: "punctuation.ada" },
        "5": { name: "keyword.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.aspect.clause.ada",
      patterns: [
        {
          begin: /\buse\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=;)/dgv,
          endCaptures: {
            "0": { name: "punctuation.ada" }
          },
          patterns: [
            { include: "#record_representation_clause" },
            { include: "#array_aggregate" },
            { include: "#expression" }
          ]
        },
        {
          begin: /(?<=for)/dgiv,
          captures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=use)/dgiv,
          patterns: [
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "#subtype_mark" }
                  ]
                },
                "2": {
                  patterns: [
                    { include: "#attribute" }
                  ]
                }
              },
              match: /([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)('([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+))?/dgv
            }
          ]
        }
      ]
    },
    aspect_definition: {
      begin: /=>/dgv,
      beginCaptures: {
        "0": { name: "keyword.other.ada" }
      },
      end: /(?=([\,\;]|\bis\b))/dgiv,
      name: "meta.aspect.definition.ada",
      patterns: [
        { include: "#expression" }
      ]
    },
    aspect_mark: {
      captures: {
        "1": { name: "keyword.control.directive.ada" },
        "2": { name: "punctuation.ada" },
        "3": { name: "entity.other.attribute-name.ada" }
      },
      match: /\b([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)(?:(')(class))?\b/dgiv,
      name: "meta.aspect.mark.ada"
    },
    aspect_specification: {
      begin: /\bwith\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.ada" }
      },
      end: /(?=(;|\bis\b))/dgiv,
      name: "meta.aspect.specification.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        {
          captures: {
            "1": { name: "storage.modifier.ada" },
            "2": { name: "storage.modifier.ada" }
          },
          match: /\b(null)\p{space}+(record)\b/dgiv
        },
        {
          begin: /\brecord\b/dgiv,
          beginCaptures: {
            "0": { name: "storage.modifier.ada" }
          },
          end: /\b(end)\p{space}+(record)\b/dgiv,
          endCaptures: {
            "1": { name: "keyword.ada" },
            "2": { name: "storage.modifier.ada" }
          },
          patterns: [
            { include: "#component_item" }
          ]
        },
        {
          captures: {
            "0": { name: "storage.visibility.ada" }
          },
          match: /\bprivate\b/dgiv
        },
        { include: "#aspect_definition" },
        { include: "#aspect_mark" },
        { include: "#comment" }
      ]
    },
    assignment_statement: {
      begin: /\b(["'\(\)\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}\p{space}]+)\p{space}*(:=)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            {
              match: /([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)/dgv,
              name: "variable.name.ada"
            },
            {
              begin: /\(/dgv,
              captures: {
                "0": { name: "punctuation.ada" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "#expression" }
              ]
            }
          ]
        },
        "2": { name: "keyword.operator.new.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.assignment.ada",
      patterns: [
        { include: "#expression" },
        { include: "#comment" }
      ]
    },
    attribute: {
      captures: {
        "1": { name: "punctuation.ada" },
        "2": { name: "entity.other.attribute-name.ada" }
      },
      match: /(')([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgv,
      name: "meta.attribute.ada"
    },
    based_literal: {
      captures: {
        "1": { name: "constant.numeric.base.ada" },
        "2": { name: "punctuation.ada" },
        "3": { name: "punctuation.ada" },
        "4": { name: "punctuation.radix-point.ada" },
        "5": { name: "punctuation.ada" },
        "6": { name: "constant.numeric.base.ada" },
        "7": {
          patterns: [
            { include: "#exponent_part" }
          ]
        }
      },
      match: /(\p{Nd}(?:(_)?\p{Nd})*#)[0-9a-f](?:(_)?[0-9a-f])*(?:(\.)[0-9a-f](?:(_)?[0-9a-f])*)?(#)([Ee][\-\+]?\p{Nd}(?:_?\p{Nd})*)?/dgiv,
      name: "constant.numeric.ada"
    },
    basic_declaration: {
      patterns: [
        { include: "#type_declaration" },
        { include: "#subtype_declaration" },
        { include: "#exception_declaration" },
        { include: "#object_declaration" },
        { include: "#single_protected_declaration" },
        { include: "#single_task_declaration" },
        { include: "#subprogram_specification" },
        { include: "#package_declaration" },
        { include: "#pragma" },
        { include: "#comment" }
      ]
    },
    basic_declarative_item: {
      patterns: [
        { include: "#basic_declaration" },
        { include: "#aspect_clause" },
        { include: "#use_clause" },
        { include: "#keyword" }
      ]
    },
    block_statement: {
      begin: /\bdeclare\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.ada" }
      },
      end: /\b(end)(\p{space}+[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)?\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.label.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.statement.block.ada",
      patterns: [
        {
          begin: /(?<=declare)/dgiv,
          end: /\bbegin\b/dgiv,
          endCaptures: {
            "0": { name: "keyword.ada" }
          },
          patterns: [
            { include: "#body" },
            { include: "#basic_declarative_item" }
          ]
        },
        {
          begin: /(?<=begin)/dgiv,
          end: /(?=end)/dgiv,
          patterns: [
            { include: "#statement" }
          ]
        }
      ]
    },
    body: {
      patterns: [
        { include: "#subprogram_body" },
        { include: "#package_body" },
        { include: "#task_body" },
        { include: "#protected_body" }
      ]
    },
    case_statement: {
      begin: /\bcase\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /\b(end)\p{space}+(case)\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "keyword.control.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.statement.case.ada",
      patterns: [
        {
          begin: /(?<=case)\b/dgiv,
          end: /\bis\b/dgiv,
          endCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /\bwhen\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /=>/dgv,
          endCaptures: {
            "0": { name: "punctuation.ada" }
          },
          name: "meta.statement.case.alternative.ada",
          patterns: [
            {
              match: /\bothers\b/dgiv,
              name: "keyword.modifier.unknown.ada"
            },
            {
              match: /\|/dgv,
              name: "punctuation.ada"
            },
            { include: "#expression" }
          ]
        },
        { include: "#statement" }
      ]
    },
    character_literal: {
      captures: {
        "0": {
          patterns: [
            {
              match: /'/dgv,
              name: "punctuation.definition.string.ada"
            }
          ]
        }
      },
      match: /'[^\n]'/dgv,
      name: "string.quoted.single.ada"
    },
    comment: {
      patterns: [
        { include: "#preprocessor" },
        { include: "#comment-section" },
        { include: "#comment-doc" },
        { include: "#comment-line" }
      ]
    },
    "comment-doc": {
      captures: {
        "1": { name: "comment.line.double-dash.ada" },
        "2": { name: "punctuation.definition.tag.ada" },
        "3": { name: "entity.name.tag.ada" },
        "4": { name: "comment.line.double-dash.ada" }
      },
      match: /(--)\p{space}*(@)([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+([^\n]*)(?=\n?$)/dgv,
      name: "comment.block.documentation.ada"
    },
    "comment-line": {
      match: /--[^\n]*(?=\n?$)/dgv,
      name: "comment.line.double-dash.ada"
    },
    "comment-section": {
      captures: {
        "1": { name: "entity.name.section.ada" }
      },
      match: /--\p{space}*([^\-][^\n]*?[^\-])\p{space}*--\p{space}*(?=\n?$)/dgv,
      name: "comment.line.double-dash.ada"
    },
    component_clause: {
      begin: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgv,
      beginCaptures: {
        "0": { name: "variable.name.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.aspect.clause.record.representation.component.ada",
      patterns: [
        {
          begin: /\bat\b/dgiv,
          beginCaptures: {
            "0": { name: "storage.modifier.ada" }
          },
          end: /\b(?=range)\b/dgiv,
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#range_constraint" }
      ]
    },
    component_declaration: {
      begin: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+(?:\p{space}*,\p{space}*[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)?)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.ada"
            },
            {
              match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
              name: "variable.name.ada"
            }
          ]
        },
        "2": { name: "punctuation.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.declaration.type.definition.record.component.ada",
      patterns: [
        {
          patterns: [
            {
              match: /:=/dgv,
              name: "keyword.operator.new.ada"
            },
            { include: "#expression" }
          ]
        },
        { include: "#component_definition" }
      ]
    },
    component_definition: {
      patterns: [
        {
          match: /\baliased\b/dgiv,
          name: "storage.visibility.ada"
        },
        {
          match: /\brange\b/dgiv,
          name: "storage.modifier.ada"
        },
        {
          match: /\.\./dgv,
          name: "keyword.ada"
        },
        { include: "#access_definition" },
        { include: "#subtype_mark" }
      ]
    },
    component_item: {
      patterns: [
        { include: "#component_declaration" },
        { include: "#variant_part" },
        { include: "#comment" },
        { include: "#aspect_clause" },
        {
          captures: {
            "1": { name: "keyword.ada" },
            "2": { name: "punctuation.ada" }
          },
          match: /\b(null)\p{space}*(;)/dgiv
        }
      ]
    },
    composite_constraint: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.ada" }
      },
      end: /\)/dgv,
      name: "meta.declaration.constraint.composite.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        {
          match: /\.\./dgv,
          name: "keyword.ada"
        },
        {
          captures: {
            "1": { name: "variable.name.ada" },
            "2": { name: "keyword.other.ada" },
            "3": {
              patterns: [
                { include: "#expression" }
              ]
            }
          },
          match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\p{space}*(=>)\p{space}*([^\)\,])+\b/dgv
        },
        { include: "#expression" }
      ]
    },
    decimal_literal: {
      captures: {
        "1": { name: "punctuation.ada" },
        "2": { name: "punctuation.radix-point.ada" },
        "3": { name: "punctuation.ada" },
        "4": {
          patterns: [
            { include: "#exponent_part" }
          ]
        }
      },
      match: /\p{Nd}(?:(_)?\p{Nd})*(?:(\.)\p{Nd}(?:(_)?\p{Nd})*)?([Ee][\-\+]?\p{Nd}(?:_?\p{Nd})*)?/dgv,
      name: "constant.numeric.ada"
    },
    declarative_item: {
      patterns: [
        { include: "#body" },
        { include: "#basic_declarative_item" }
      ]
    },
    delay_relative_statement: {
      begin: /\b(delay)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    delay_statement: {
      patterns: [
        { include: "#delay_until_statement" },
        { include: "#delay_relative_statement" }
      ]
    },
    delay_until_statement: {
      begin: /\b(delay)\p{space}+(until)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "keyword.control.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.delay.until.ada",
      patterns: [
        { include: "#expression" }
      ]
    },
    derived_type_definition: {
      name: "meta.declaration.type.definition.derived.ada",
      patterns: [
        {
          begin: /\bnew\b/dgiv,
          beginCaptures: {
            "0": { name: "storage.modifier.ada" }
          },
          end: /(?=(\bwith\b|;))/dgiv,
          patterns: [
            {
              match: /\band\b/dgiv,
              name: "storage.modifier.ada"
            },
            { include: "#subtype_mark" }
          ]
        },
        {
          match: /\b(abstract|and|limited|tagged)\b/dgiv,
          name: "storage.modifier.ada"
        },
        {
          match: /\bprivate\b/dgiv,
          name: "storage.visibility.ada"
        },
        { include: "#subtype_mark" }
      ]
    },
    discriminant_specification: {
      begin: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+(?:\p{space}*,\p{space}*[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)?)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.ada"
            },
            {
              match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
              name: "variable.name.ada"
            }
          ]
        },
        "2": { name: "punctuation.ada" }
      },
      end: /(?=([\)\;]))/dgv,
      patterns: [
        {
          begin: /:=/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.new.ada" }
          },
          end: /(?=([\)\;]))/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.visibility.ada" },
            "2": {
              patterns: [
                { include: "#subtype_mark" }
              ]
            }
          },
          match: /(not\p{space}+null\p{space}+)?([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv
        },
        { include: "#access_definition" }
      ]
    },
    entry_body: {
      begin: /\b(entry)\p{space}+([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.entry.ada" }
      },
      end: /\b(end)\p{space}*(\p{space}2)\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.entry.ada" },
        "3": { name: "punctuation.ada" }
      },
      patterns: [
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(?=begin)\b/dgiv,
          patterns: [
            { include: "#declarative_item" }
          ]
        },
        {
          begin: /\bbegin\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(?=end)\b/dgiv,
          patterns: [
            { include: "#statement" }
          ]
        },
        {
          begin: /\bwhen\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(?=is)\b/dgiv,
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#parameter_profile" }
      ]
    },
    entry_declaration: {
      begin: /\b(?:(not)?\p{space}+(overriding)\p{space}+)?(entry)\p{space}+([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.ada" },
        "2": { name: "storage.modifier.ada" },
        "3": { name: "keyword.ada" },
        "4": { name: "entity.name.entry.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      patterns: [
        { include: "#parameter_profile" }
      ]
    },
    enumeration_type_definition: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.ada" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.declaration.type.definition.enumeration.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        {
          match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
          name: "variable.name.ada"
        },
        { include: "#comment" }
      ]
    },
    exception_declaration: {
      begin: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+(?:\p{space}*,\p{space}*[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)?)\p{space}*(:)\p{space}*(exception)/dgiv,
      beginCaptures: {
        "1": {
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.ada"
            },
            {
              match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
              name: "entity.name.exception.ada"
            }
          ]
        },
        "2": { name: "punctuation.ada" },
        "3": { name: "storage.type.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.declaration.exception.ada",
      patterns: [
        {
          match: /\b(renames)\p{space}+(([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+)/dgiv,
          name: "entity.name.exception.ada"
        }
      ]
    },
    exit_statement: {
      begin: /\bexit\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.exit.ada",
      patterns: [
        {
          begin: /\bwhen\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /(?=;)/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+/dgv,
          name: "entity.name.label.ada"
        }
      ]
    },
    exponent_part: {
      captures: {
        "1": { name: "punctuation.exponent-mark.ada" },
        "2": { name: "keyword.operator.unary.ada" },
        "3": { name: "punctuation.ada" }
      },
      match: /([Ee])([\-\+])?\p{Nd}(?:(_)?\p{Nd})*/dgv
    },
    expression: {
      name: "meta.expression.ada",
      patterns: [
        {
          match: /\bnull\b/dgiv,
          name: "constant.language.ada"
        },
        {
          match: /=>(\+)?/dgv,
          name: "keyword.other.ada"
        },
        {
          begin: /\(/dgv,
          captures: {
            "0": { name: "punctuation.ada" }
          },
          end: /\)/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        {
          match: /\.\./dgv,
          name: "keyword.ada"
        },
        { include: "#value" },
        { include: "#attribute" },
        { include: "#comment" },
        { include: "#operator" },
        {
          match: /\b(and|or|xor)\b/dgiv,
          name: "keyword.ada"
        },
        {
          match: /\b(if|then|else|elsif|in|for|(?<!\.)all|some|\.\.|delta|with)\b/dgiv,
          name: "keyword.ada"
        }
      ]
    },
    for_loop_statement: {
      begin: /\bfor\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /\b(end)\p{space}+(loop)(\p{space}+[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)?\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "keyword.control.ada" },
        "3": { name: "entity.name.label.ada" },
        "4": { name: "punctuation.ada" }
      },
      name: "meta.statement.loop.for.ada",
      patterns: [
        {
          begin: /(?<=for)/dgiv,
          end: /\bloop\b/dgiv,
          endCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "variable.name.ada" },
                "2": { name: "keyword.control.ada" },
                "3": { name: "keyword.control.ada" }
              },
              match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\p{space}+(in)(\p{space}+reverse)?\b/dgiv
            },
            {
              captures: {
                "1": { name: "variable.name.ada" },
                "2": { name: "punctuation.ada" },
                "3": {
                  patterns: [
                    { include: "#subtype_mark" }
                  ]
                },
                "4": { name: "keyword.control.ada" },
                "5": { name: "keyword.control.ada" }
              },
              match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)(?:\p{space}*(:)\p{space}*([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+))?\p{space}+(of)(\p{space}+reverse)?\b/dgiv
            },
            { include: "#expression" }
          ]
        },
        { include: "#statement" }
      ]
    },
    full_type_declaration: {
      patterns: [
        { include: "#task_type_declaration" },
        { include: "#regular_type_declaration" }
      ]
    },
    function_body: {
      begin: /\b(overriding\p{space}+)?(function)\p{space}+(?:([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b|("[^\n]+"))/dgiv,
      beginCaptures: {
        "1": { name: "storage.visibility.ada" },
        "2": { name: "keyword.ada" },
        "3": { name: "entity.name.function.ada" },
        "4": {
          patterns: [
            { include: "#string_literal" }
          ]
        }
      },
      end: /(?:\b(end)\p{space}+(3|4)\p{space}*)?(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.function.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.function.body.ada",
      patterns: [
        {
          begin: /\bbegin\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=end)/dgiv,
          patterns: [
            { include: "#handled_sequence_of_statements" }
          ]
        },
        { include: "#aspect_specification" },
        { include: "#result_profile" },
        { include: "#subprogram_renaming_declaration" },
        { include: "#parameter_profile" },
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=(with|begin|;))/dgiv,
          name: "meta.function.body.spec_part.ada",
          patterns: [
            {
              begin: /\bnew\b/dgiv,
              beginCaptures: {
                "0": { name: "keyword.operator.new.ada" }
              },
              end: /(?=;)/dgv,
              name: "meta.declaration.package.generic.ada",
              patterns: [
                {
                  match: /([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)/dgv,
                  name: "entity.name.function.ada"
                },
                { include: "#actual_parameter_part" }
              ]
            },
            {
              captures: {
                "0": { name: "storage.modifier.ada" }
              },
              match: /\babstract\b/dgiv,
              name: "meta.declaration.function.abstract.ada"
            },
            { include: "#declarative_item" },
            { include: "#subprogram_renaming_declaration" },
            { include: "#expression" }
          ]
        }
      ]
    },
    function_specification: {
      patterns: [
        { include: "#function_body" }
      ]
    },
    goto_statement: {
      begin: /\bgoto\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.goto.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.goto.ada",
      patterns: [
        {}
      ]
    },
    guard: {
      begin: /\bwhen\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /=>/dgv,
      endCaptures: {
        "0": { name: "keyword.other.ada" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    handled_sequence_of_statements: {
      patterns: [
        {
          begin: /\bexception\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(?=end)\b/dgiv,
          name: "meta.handler.exception.ada",
          patterns: [
            {
              begin: /\bwhen\b/dgiv,
              beginCaptures: {
                "0": { name: "keyword.ada" }
              },
              end: /=>/dgv,
              endCaptures: {
                "0": { name: "keyword.other.ada" }
              },
              patterns: [
                {
                  captures: {
                    "1": { name: "variable.name.ada" },
                    "2": { name: "punctuation.ada" }
                  },
                  match: /\b([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\p{space}*(:)/dgv
                },
                {
                  match: /\|/dgv,
                  name: "punctuation.ada"
                },
                {
                  match: /\bothers\b/dgiv,
                  name: "keyword.ada"
                },
                {
                  match: /[\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+/dgv,
                  name: "entity.name.exception.ada"
                }
              ]
            },
            { include: "#statement" }
          ]
        },
        { include: "#statement" }
      ]
    },
    highest_precedence_operator: {
      match: /(\*\*|\babs\b|\bnot\b)/dgiv,
      name: "keyword.operator.highest-precedence.ada"
    },
    if_statement: {
      begin: /\bif\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /\b(end)\p{space}+(if)\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "keyword.control.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.statement.if.ada",
      patterns: [
        {
          begin: /\belsif\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /(?<!\p{space}and)\p{space}+(?=then)/dgiv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /\belse\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /(?=end)/dgiv,
          patterns: [
            { include: "#statement" }
          ]
        },
        {
          begin: /(?<=if)\b/dgiv,
          end: /(?<!\p{space}and)\p{space}+(?=then)/dgiv,
          endCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /\bthen\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /(?=(e(?:lsif|lse|nd)))/dgiv,
          patterns: [
            { include: "#statement" }
          ]
        }
      ]
    },
    integer_type_definition: {
      name: "meta.declaration.type.definition.integer.ada",
      patterns: [
        { include: "#signed_integer_type_definition" },
        { include: "#modular_type_definition" }
      ]
    },
    interface_type_definition: {
      begin: /\b(?:(limited|task|protected|synchronized)\p{space}+)?(interface)/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.ada" },
        "2": { name: "storage.modifier.ada" }
      },
      end: /(?=(with|;))/dgiv,
      name: "meta.declaration.type.definition.interface.ada",
      patterns: [
        {
          match: /\band\b/dgiv,
          name: "storage.modifier.ada"
        },
        { include: "#subtype_mark" }
      ]
    },
    keyword: {
      patterns: [
        {
          match: /\b(abort|abs|accept|all|and|at|begin|body|declare|delay|end|entry|exception|function|generic|in|is|mod|new|not|null|of|or|others|out|package|pragma|procedure|range|record|rem|renames|requeue|reverse|select|separate|some|subtype|then|type|use|when|with|xor)\b/dgiv,
          name: "keyword.ada"
        },
        {
          match: /\b(case|do|else|elsif|exit|for|goto|if|loop|raise|return|terminate|until|while)\b/dgiv,
          name: "keyword.control.ada"
        },
        {
          match: /\b(abstract|access|aliased|array|constant|delta|digits|interface|limited|protected|synchronized|tagged|task)\b/dgiv,
          name: "storage.modifier.ada"
        },
        {
          match: /\b(private|overriding)\b/dgiv,
          name: "storage.visibility.ada"
        },
        {
          match: /<>/dgv,
          name: "keyword.modifier.unknown.ada"
        },
        {
          match: /([\-\*\+\/])/dgv,
          name: "keyword.operator.arithmetic.ada"
        },
        {
          match: /:=/dgv,
          name: "keyword.operator.assignment.ada"
        },
        {
          match: /(=|\/=|[\<\>]|<=|>=)/dgv,
          name: "keyword.operator.logic.ada"
        },
        {
          match: /&/dgv,
          name: "keyword.operator.concatenation.ada"
        }
      ]
    },
    known_discriminant_part: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.ada" }
      },
      end: /\)/dgv,
      name: "meta.declaration.type.discriminant.ada",
      patterns: [
        {
          match: /;/dgv,
          name: "punctuation.ada"
        },
        { include: "#discriminant_specification" }
      ]
    },
    label: {
      captures: {
        "1": { name: "punctuation.label.ada" },
        "2": { name: "entity.name.label.ada" },
        "3": { name: "punctuation.label.ada" }
      },
      match: /(<<)?([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\p{space}*(:[^\=]|>>)/dgv,
      name: "meta.label.ada"
    },
    library_unit: {
      name: "meta.library.unit.ada",
      patterns: [
        { include: "#package_body" },
        { include: "#package_specification" },
        { include: "#subprogram_body" }
      ]
    },
    loop_statement: {
      patterns: [
        { include: "#simple_loop_statement" },
        { include: "#while_loop_statement" },
        { include: "#for_loop_statement" }
      ]
    },
    modular_type_definition: {
      begin: /\b(mod)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.ada" }
      },
      end: /(?=(with|;))/dgiv,
      patterns: [
        {
          match: /<>/dgv,
          name: "keyword.modifier.unknown.ada"
        },
        { include: "#expression" }
      ]
    },
    multiplying_operator: {
      match: /([\*\/]|\bmod\b|\brem\b)/dgiv,
      name: "keyword.operator.multiplying.ada"
    },
    null_statement: {
      captures: {
        "1": { name: "keyword.ada" },
        "2": { name: "punctuation.ada" }
      },
      match: /\b(null)\p{space}*(;)/dgiv,
      name: "meta.statement.null.ada"
    },
    object_declaration: {
      begin: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+(?:\p{space}*,\p{space}*[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)*)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.ada"
            },
            {
              match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
              name: "variable.name.ada"
            }
          ]
        },
        "2": { name: "punctuation.ada" }
      },
      end: /(;)/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.declaration.object.ada",
      patterns: [
        {
          begin: /(?<=:)/dgv,
          end: /(?=;)|(:=)|\b(renames)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.new.ada" },
            "2": { name: "keyword.ada" }
          },
          patterns: [
            {
              match: /\bconstant\b/dgiv,
              name: "storage.modifier.ada"
            },
            {
              match: /\baliased\b/dgiv,
              name: "storage.visibility.ada"
            },
            { include: "#aspect_specification" },
            { include: "#subtype_mark" }
          ]
        },
        {
          begin: /(?<=:=)/dgv,
          end: /(?=;)/dgv,
          patterns: [
            { include: "#aspect_specification" },
            { include: "#expression" }
          ]
        },
        {
          begin: /(?<=renames)/dgv,
          end: /(?=;)/dgv,
          patterns: [
            { include: "#aspect_specification" }
          ]
        }
      ]
    },
    operator: {
      patterns: [
        { include: "#highest_precedence_operator" },
        { include: "#multiplying_operator" },
        { include: "#adding_operator" },
        { include: "#relational_operator" },
        { include: "#logical_operator" }
      ]
    },
    package_body: {
      begin: /\b(package)\p{space}+(body)\p{space}+([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "keyword.ada" },
        "3": {
          patterns: [
            { include: "#package_mark" }
          ]
        }
      },
      end: /\b(end)\p{space}+(3)\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": {
          patterns: [
            { include: "#package_mark" }
          ]
        },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.package.body.ada",
      patterns: [
        {
          begin: /\bbegin\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(?=end)\b/dgiv,
          patterns: [
            { include: "#handled_sequence_of_statements" }
          ]
        },
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=\b(begin|end)\b)/dgiv,
          patterns: [
            {
              match: /\bprivate\b/dgiv,
              name: "keyword.ada"
            },
            { include: "#declarative_item" },
            { include: "#comment" }
          ]
        },
        { include: "#aspect_specification" }
      ]
    },
    package_declaration: {
      patterns: [
        { include: "#package_specification" }
      ]
    },
    package_mark: {
      match: /\b([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
      name: "entity.name.package.ada"
    },
    package_specification: {
      begin: /\b(package)\p{space}+([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" },
        "2": {
          patterns: [
            { include: "#package_mark" }
          ]
        }
      },
      end: /(?:\b(end)\p{space}+(2)\p{space}*)?(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": {
          patterns: [
            { include: "#package_mark" }
          ]
        },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.package.specification.ada",
      patterns: [
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=(end|;))/dgv,
          patterns: [
            {
              begin: /\bnew\b/dgiv,
              beginCaptures: {
                "0": { name: "keyword.operator.new.ada" }
              },
              end: /(?=;)/dgv,
              name: "meta.declaration.package.generic.ada",
              patterns: [
                { include: "#package_mark" },
                { include: "#actual_parameter_part" }
              ]
            },
            {
              match: /\bprivate\b/dgiv,
              name: "keyword.ada"
            },
            { include: "#basic_declarative_item" },
            { include: "#comment" }
          ]
        },
        { include: "#aspect_specification" }
      ]
    },
    parameter_association: {
      patterns: [
        {
          captures: {
            "1": { name: "variable.parameter.ada" },
            "2": { name: "keyword.other.ada" }
          },
          match: /([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\p{space}*(=>)/dgv
        },
        { include: "#expression" }
      ]
    },
    parameter_profile: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.ada" }
      },
      end: /\)/dgv,
      patterns: [
        {
          match: /;/dgv,
          name: "punctuation.ada"
        },
        { include: "#parameter_specification" }
      ]
    },
    parameter_specification: {
      patterns: [
        {
          begin: /:(?!=)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.ada" }
          },
          end: /(?=[\)\:\;])/dgv,
          name: "meta.type.annotation.ada",
          patterns: [
            {
              match: /\b(in|out)\b/dgiv,
              name: "keyword.ada"
            },
            { include: "#subtype_mark" }
          ]
        },
        {
          begin: /:=/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.new.ada" }
          },
          end: /(?=[\)\:\;])/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        {
          match: /\b[\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+\b/dgv,
          name: "variable.parameter.ada"
        },
        { include: "#comment" }
      ]
    },
    positional_array_aggregate: {
      name: "meta.definition.array.aggregate.positional.ada",
      patterns: [
        {
          captures: {
            "1": { name: "keyword.ada" },
            "2": { name: "keyword.other.ada" },
            "3": {
              patterns: [
                {
                  match: /<>/dgv,
                  name: "keyword.modifier.unknown.ada"
                },
                { include: "#expression" }
              ]
            }
          },
          match: /\b(others)\p{space}*(=>)\p{space}*([^\)\,]+)/dgiv
        },
        { include: "#expression" }
      ]
    },
    pragma: {
      begin: /\b(pragma)\p{space}+([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "keyword.control.directive.ada" }
      },
      end: /(;)/dgv,
      endCaptures: {
        "1": { name: "punctuation.ada" }
      },
      name: "meta.pragma.ada",
      patterns: [
        { include: "#expression" }
      ]
    },
    preprocessor: {
      name: "meta.preprocessor.ada",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.directive.ada" },
            "2": { name: "keyword.control.directive.conditional.ada" },
            "3": {
              patterns: [
                { include: "#expression" }
              ]
            }
          },
          match: /^\p{space}*(#)(if|elsif)\p{space}+([^\n]*)(?=\n?$)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.definition.directive.ada" },
            "2": { name: "keyword.control.directive.conditional" },
            "3": { name: "punctuation.ada" }
          },
          match: /^\p{space}*(#)(end if)(;)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.definition.directive.ada" },
            "2": { name: "keyword.control.directive.conditional" }
          },
          match: /^\p{space}*(#)(else)/dgv
        }
      ]
    },
    procedure_body: {
      begin: /\b(overriding\p{space}+)?(procedure)\p{space}+([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.visibility.ada" },
        "2": { name: "keyword.ada" },
        "3": { name: "entity.name.function.ada" }
      },
      end: /(?:\b(end)\p{space}+(3)\p{space}*)?(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.function.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.procedure.body.ada",
      patterns: [
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=(with|begin|;))/dgiv,
          patterns: [
            {
              begin: /\bnew\b/dgiv,
              beginCaptures: {
                "0": { name: "keyword.operator.new.ada" }
              },
              end: /(?=;)/dgv,
              name: "meta.declaration.package.generic.ada",
              patterns: [
                {
                  match: /([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)/dgv,
                  name: "entity.name.function.ada"
                },
                { include: "#actual_parameter_part" }
              ]
            },
            {
              match: /\b(null|abstract)\b/dgiv,
              name: "storage.modifier.ada"
            },
            { include: "#declarative_item" }
          ]
        },
        {
          begin: /\bbegin\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=\bend\b)/dgiv,
          patterns: [
            { include: "#handled_sequence_of_statements" }
          ]
        },
        { include: "#subprogram_renaming_declaration" },
        { include: "#aspect_specification" },
        { include: "#parameter_profile" },
        { include: "#comment" }
      ]
    },
    procedure_call_statement: {
      begin: /\b([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.call.ada",
      patterns: [
        { include: "#attribute" },
        { include: "#actual_parameter_part" },
        { include: "#comment" }
      ]
    },
    procedure_specification: {
      patterns: [
        { include: "#procedure_body" }
      ]
    },
    protected_body: {
      begin: /\b(protected)\p{space}+(body)\p{space}+([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.ada" },
        "2": { name: "keyword.ada" },
        "3": { name: "entity.name.body.ada" }
      },
      end: /\b(end)\p{space}*(\p{space}3)\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.body.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.procedure.body.ada",
      patterns: [
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(?=end)\b/dgiv,
          patterns: [
            { include: "#protected_operation_item" }
          ]
        }
      ]
    },
    protected_element_declaration: {
      patterns: [
        { include: "#subprogram_specification" },
        { include: "#aspect_clause" },
        { include: "#entry_declaration" },
        { include: "#component_declaration" },
        { include: "#pragma" }
      ]
    },
    protected_operation_item: {
      patterns: [
        { include: "#subprogram_specification" },
        { include: "#subprogram_body" },
        { include: "#aspect_clause" },
        { include: "#entry_body" }
      ]
    },
    raise_expression: {
      begin: /\braise\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /(?=;)/dgv,
      name: "meta.expression.raise.ada",
      patterns: [
        {
          begin: /\bwith\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=([\)\;]))/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
          name: "entity.name.exception.ada"
        }
      ]
    },
    raise_statement: {
      begin: /\braise\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.raise.ada",
      patterns: [
        {
          begin: /\bwith\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /(?=;)/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /\b([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
          name: "entity.name.exception.ada"
        }
      ]
    },
    range_constraint: {
      begin: /\brange\b/dgiv,
      beginCaptures: {
        "0": { name: "storage.modifier.ada" }
      },
      end: /(?=(\bwith\b|;))/dgv,
      patterns: [
        {
          match: /\.\./dgv,
          name: "keyword.ada"
        },
        {
          match: /<>/dgv,
          name: "keyword.modifier.unknown.ada"
        },
        { include: "#expression" }
      ]
    },
    real_type_definition: {
      name: "meta.declaration.type.definition.real-type.ada",
      patterns: [
        { include: "#scalar_constraint" }
      ]
    },
    record_representation_clause: {
      begin: /\b(record)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.ada" }
      },
      end: /\b(end)\p{space}+(record)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "storage.modifier.ada" }
      },
      name: "meta.aspect.clause.record.representation.ada",
      patterns: [
        { include: "#component_clause" },
        { include: "#comment" }
      ]
    },
    record_type_definition: {
      patterns: [
        {
          captures: {
            "1": { name: "storage.modifier.ada" },
            "2": { name: "storage.modifier.ada" },
            "3": { name: "storage.modifier.ada" },
            "4": { name: "storage.modifier.ada" },
            "5": { name: "storage.modifier.ada" }
          },
          match: /\b(?:(abstract)\p{space}+)?(?:(tagged)\p{space}+)?(?:(limited)\p{space}+)?(null)\p{space}+(record)\b/dgiv,
          name: "meta.declaration.type.definition.record.null.ada",
          patterns: [
            { include: "#component_item" }
          ]
        },
        {
          begin: /\b(?:(abstract)\p{space}+)?(?:(tagged)\p{space}+)?(?:(limited)\p{space}+)?(record)\b/dgiv,
          beginCaptures: {
            "1": { name: "storage.modifier.ada" },
            "2": { name: "storage.modifier.ada" },
            "3": { name: "storage.modifier.ada" },
            "4": { name: "storage.modifier.ada" }
          },
          end: /\b(end)\p{space}+(record)\b/dgiv,
          endCaptures: {
            "1": { name: "keyword.ada" },
            "2": { name: "storage.modifier.ada" }
          },
          name: "meta.declaration.type.definition.record.ada",
          patterns: [
            { include: "#component_item" }
          ]
        }
      ]
    },
    regular_type_declaration: {
      begin: /\b(type)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.declaration.type.definition.regular.ada",
      patterns: [
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=(with(?!\p{space}+(private))|;))/dgiv,
          patterns: [
            { include: "#type_definition" }
          ]
        },
        {
          begin: /\b(?<=type)\b/dgiv,
          end: /(?=(is|;))/dgiv,
          patterns: [
            { include: "#known_discriminant_part" },
            { include: "#subtype_mark" }
          ]
        },
        { include: "#aspect_specification" }
      ]
    },
    relational_operator: {
      match: /(=|\/=|<=??|>=??)/dgv,
      name: "keyword.operator.relational.ada"
    },
    requeue_statement: {
      begin: /\brequeue\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.requeue.ada",
      patterns: [
        {
          match: /\b(with|abort)\b/dgiv,
          name: "keyword.control.ada"
        },
        {
          match: /\b([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+\b/dgv,
          name: "entity.name.function.ada"
        }
      ]
    },
    result_profile: {
      begin: /\breturn\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.ada" }
      },
      end: /(?=(is|with|renames|;))/dgv,
      patterns: [
        { include: "#subtype_mark" }
      ]
    },
    return_statement: {
      begin: /\breturn\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.statement.return.ada",
      patterns: [
        {
          begin: /\bdo\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /\b(end)\p{space}+(return)\p{space}*(?=;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.ada" },
            "2": { name: "keyword.control.ada" }
          },
          patterns: [
            { include: "#label" },
            { include: "#statement" }
          ]
        },
        {
          captures: {
            "1": { name: "variable.name.ada" },
            "2": { name: "punctuation.ada" },
            "3": { name: "entity.name.type.ada" }
          },
          match: /\b([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\p{space}*(:)\p{space}*([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgv
        },
        {
          match: /:=/dgv,
          name: "keyword.operator.new.ada"
        },
        { include: "#expression" }
      ]
    },
    scalar_constraint: {
      name: "meta.declaration.constraint.scalar.ada",
      patterns: [
        {
          begin: /\b(d(?:igits|elta))\b/dgiv,
          beginCaptures: {
            "1": { name: "storage.modifier.ada" }
          },
          end: /(?=\brange\b|\bdigits\b|\bwith\b|;)/dgiv,
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#range_constraint" },
        { include: "#expression" }
      ]
    },
    select_alternative: {
      patterns: [
        {
          begin: /\bterminate\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.ada" }
          }
        },
        { include: "#statement" }
      ]
    },
    select_statement: {
      begin: /\bselect\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /\b(end)\p{space}+(select)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "keyword.control.ada" }
      },
      name: "meta.statement.select.ada",
      patterns: [
        {
          begin: /\b(?:(or)|(?<=select))\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.ada" }
          },
          end: /\b(?=(or|else|end))\b/dgiv,
          patterns: [
            { include: "#guard" },
            { include: "#select_alternative" }
          ]
        },
        {
          begin: /\belse\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          end: /\b(?=end)\b/dgiv,
          patterns: [
            { include: "#statement" }
          ]
        }
      ]
    },
    signed_integer_type_definition: {
      patterns: [
        { include: "#range_constraint" }
      ]
    },
    simple_loop_statement: {
      begin: /\bloop\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /\b(end)\p{space}+(loop)(\p{space}+[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)?\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "keyword.control.ada" },
        "3": { name: "entity.name.label.ada" },
        "4": { name: "punctuation.ada" }
      },
      name: "meta.statement.loop.ada",
      patterns: [
        { include: "#statement" }
      ]
    },
    single_protected_declaration: {
      begin: /\b(protected)\p{space}+([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.protected.ada" }
      },
      end: /(?:\b(end)\p{space}*(\p{space}2)?\p{space}*)?(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.protected.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.protected.ada",
      patterns: [
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=(\bend\b|;))/dgiv,
          patterns: [
            {
              begin: /\bnew\b/dgiv,
              captures: {
                "0": { name: "keyword.ada" }
              },
              end: /\bwith\b/dgiv,
              patterns: [
                {
                  match: /\band\b/dgiv,
                  name: "keyword.ada"
                },
                { include: "#subtype_mark" },
                { include: "#comment" }
              ]
            },
            {
              match: /\bprivate\b/dgiv,
              name: "keyword.ada"
            },
            { include: "#protected_element_declaration" },
            { include: "#comment" }
          ]
        },
        { include: "#comment" }
      ]
    },
    single_task_declaration: {
      begin: /\b(task)\p{space}+([_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.task.ada" }
      },
      end: /(?:\b(end)\p{space}*(\p{space}2)?\p{space}*)?(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.task.ada" },
        "3": { name: "punctuation.ada" }
      },
      patterns: [
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(?=end)\b/dgiv,
          patterns: [
            {
              begin: /\bnew\b/dgiv,
              captures: {
                "0": { name: "keyword.ada" }
              },
              end: /\bwith\b/dgiv,
              patterns: [
                {
                  match: /\band\b/dgiv,
                  name: "keyword.ada"
                },
                { include: "#subtype_mark" },
                { include: "#comment" }
              ]
            },
            {
              match: /\bprivate\b/dgiv,
              name: "keyword.ada"
            },
            { include: "#task_item" },
            { include: "#comment" }
          ]
        },
        { include: "#comment" }
      ]
    },
    statement: {
      patterns: [
        {
          begin: /\bbegin\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(end)\p{space}*(;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.ada" },
            "2": { name: "punctuation.ada" }
          },
          patterns: [
            { include: "#handled_sequence_of_statements" }
          ]
        },
        { include: "#label" },
        { include: "#null_statement" },
        { include: "#return_statement" },
        { include: "#assignment_statement" },
        { include: "#exit_statement" },
        { include: "#goto_statement" },
        { include: "#requeue_statement" },
        { include: "#delay_statement" },
        { include: "#abort_statement" },
        { include: "#raise_statement" },
        { include: "#if_statement" },
        { include: "#case_statement" },
        { include: "#loop_statement" },
        { include: "#block_statement" },
        { include: "#select_statement" },
        { include: "#accept_statement" },
        { include: "#pragma" },
        { include: "#procedure_call_statement" },
        { include: "#comment" }
      ]
    },
    string_literal: {
      captures: {
        "1": { name: "punctuation.definition.string.ada" },
        "2": { name: "punctuation.definition.string.ada" }
      },
      match: /(")[^\n]*?(")/dgv,
      name: "string.quoted.double.ada"
    },
    subprogram_body: {
      name: "meta.declaration.subprogram.body.ada",
      patterns: [
        { include: "#procedure_body" },
        { include: "#function_body" }
      ]
    },
    subprogram_renaming_declaration: {
      begin: /\brenames\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.ada" }
      },
      end: /(?=(with|;))/dgv,
      patterns: [
        {
          match: /[\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+/dgv,
          name: "entity.name.function.ada"
        }
      ]
    },
    subprogram_specification: {
      name: "meta.declaration.subprogram.specification.ada",
      patterns: [
        { include: "#procedure_specification" },
        { include: "#function_specification" }
      ]
    },
    subtype_declaration: {
      begin: /\bsubtype\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.declaration.subtype.ada",
      patterns: [
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=;)/dgv,
          patterns: [
            {
              match: /\b(not\p{space}+null)\b/dgiv,
              name: "storage.modifier.ada"
            },
            { include: "#composite_constraint" },
            { include: "#aspect_specification" },
            { include: "#subtype_indication" }
          ]
        },
        {
          begin: /(?<=subtype)/dgiv,
          end: /\b(?=is)\b/dgiv,
          patterns: [
            { include: "#subtype_mark" }
          ]
        }
      ]
    },
    subtype_indication: {
      name: "meta.declaration.indication.subtype.ada",
      patterns: [
        { include: "#scalar_constraint" },
        { include: "#subtype_mark" }
      ]
    },
    subtype_mark: {
      patterns: [
        {
          match: /\b(access|aliased|not\p{space}+null|constant)\b/dgiv,
          name: "storage.visibility.ada"
        },
        { include: "#attribute" },
        { include: "#actual_parameter_part" },
        {
          begin: /\b(procedure|function)\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=([\)\;]))/dgv,
          patterns: [
            { include: "#parameter_profile" },
            {
              begin: /\breturn\b/dgiv,
              beginCaptures: {
                "0": { name: "keyword.ada" }
              },
              end: /(?=([\)\;]))/dgv,
              patterns: [
                { include: "#subtype_mark" }
              ]
            }
          ]
        },
        {
          captures: {
            "0": {
              patterns: [
                {
                  match: /[\._]/dgv,
                  name: "punctuation.ada"
                }
              ]
            }
          },
          match: /\b[\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+\b/dgv,
          name: "entity.name.type.ada"
        },
        { include: "#comment" }
      ]
    },
    task_body: {
      begin: /\b(task)\p{space}+(body)\p{space}+(([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "keyword.ada" },
        "3": { name: "entity.name.task.ada" }
      },
      end: /(?:\b(end)\p{space}*(?:\p{space}(3))?\p{space}*)?(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.task.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.task.body.ada",
      patterns: [
        {
          begin: /\bbegin\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=end)/dgiv,
          patterns: [
            { include: "#handled_sequence_of_statements" }
          ]
        },
        { include: "#aspect_specification" },
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /(?=(with|begin))/dgiv,
          patterns: [
            { include: "#declarative_item" }
          ]
        }
      ]
    },
    task_item: {
      patterns: [
        { include: "#aspect_clause" },
        { include: "#entry_declaration" }
      ]
    },
    task_type_declaration: {
      begin: /\b(task)\p{space}+(type)\p{space}+(([\._\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])+)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.ada" },
        "2": { name: "keyword.ada" },
        "3": { name: "entity.name.task.ada" }
      },
      end: /(?:\b(end)\p{space}*(?:\p{space}(3))?\p{space}*)?(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "entity.name.task.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.type.task.ada",
      patterns: [
        { include: "#known_discriminant_part" },
        {
          begin: /\bis\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.ada" }
          },
          end: /\b(?=end)\b/dgiv,
          patterns: [
            {
              begin: /\bnew\b/dgiv,
              captures: {
                "0": { name: "keyword.ada" }
              },
              end: /\bwith\b/dgiv,
              patterns: [
                {
                  match: /\band\b/dgiv,
                  name: "keyword.ada"
                },
                { include: "#subtype_mark" },
                { include: "#comment" }
              ]
            },
            {
              match: /\bprivate\b/dgiv,
              name: "keyword.ada"
            },
            { include: "#task_item" },
            { include: "#comment" }
          ]
        },
        { include: "#comment" }
      ]
    },
    type_declaration: {
      name: "meta.declaration.type.ada",
      patterns: [
        { include: "#full_type_declaration" }
      ]
    },
    type_definition: {
      name: "meta.declaration.type.definition.ada",
      patterns: [
        { include: "#enumeration_type_definition" },
        { include: "#integer_type_definition" },
        { include: "#record_type_definition" },
        { include: "#real_type_definition" },
        { include: "#array_type_definition" },
        { include: "#access_type_definition" },
        { include: "#interface_type_definition" },
        { include: "#derived_type_definition" }
      ]
    },
    use_clause: {
      name: "meta.context.use.ada",
      patterns: [
        { include: "#use_type_clause" },
        { include: "#use_package_clause" }
      ]
    },
    use_package_clause: {
      begin: /\buse\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.other.using.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.context.use.package.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        { include: "#package_mark" }
      ]
    },
    use_type_clause: {
      begin: /\b(use)\p{space}+(?:(all)\p{space}+)?(type)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.other.using.ada" },
        "2": { name: "keyword.modifier.ada" },
        "3": { name: "keyword.modifier.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.context.use.type.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        { include: "#subtype_mark" }
      ]
    },
    value: {
      patterns: [
        { include: "#based_literal" },
        { include: "#decimal_literal" },
        { include: "#character_literal" },
        { include: "#string_literal" }
      ]
    },
    variant_part: {
      begin: /\bcase\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.ada" }
      },
      end: /\b(end)\p{space}+(case);/dgiv,
      endCaptures: {
        "1": { name: "keyword.ada" },
        "2": { name: "keyword.ada" },
        "3": { name: "punctuation.ada" }
      },
      name: "meta.declaration.variant.ada",
      patterns: [
        {
          begin: /\b(?<=case)\b/dgiv,
          end: /\bis\b/dgiv,
          endCaptures: {
            "0": { name: "keyword.ada" }
          },
          patterns: [
            {
              match: /[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+/dgv,
              name: "variable.name.ada"
            },
            { include: "#comment" }
          ]
        },
        {
          begin: /\b(?<=is)\b/dgiv,
          end: /\b(?=end)\b/dgiv,
          patterns: [
            {
              begin: /\bwhen\b/dgiv,
              beginCaptures: {
                "0": { name: "keyword.ada" }
              },
              end: /=>/dgv,
              endCaptures: {
                "0": { name: "keyword.other.ada" }
              },
              patterns: [
                {
                  match: /\|/dgv,
                  name: "punctuation.ada"
                },
                {
                  match: /\bothers\b/dgiv,
                  name: "keyword.ada"
                },
                { include: "#expression" }
              ]
            },
            { include: "#component_item" }
          ]
        }
      ]
    },
    while_loop_statement: {
      begin: /\bwhile\b/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.ada" }
      },
      end: /\b(end)\p{space}+(loop)(\p{space}+[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+)?\p{space}*(;)/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.ada" },
        "2": { name: "keyword.control.ada" },
        "3": { name: "entity.name.label.ada" },
        "4": { name: "punctuation.ada" }
      },
      name: "meta.statement.loop.while.ada",
      patterns: [
        {
          begin: /(?<=while)\b/dgiv,
          end: /\bloop\b/dgiv,
          endCaptures: {
            "0": { name: "keyword.control.ada" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#statement" }
      ]
    },
    with_clause: {
      begin: /\b(?:(limited)\p{space}+)?(?:(private)\p{space}+)?(with)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.modifier.ada" },
        "2": { name: "storage.visibility.ada" },
        "3": { name: "keyword.other.using.ada" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.ada" }
      },
      name: "meta.context.with.ada",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.ada"
        },
        { include: "#package_mark" }
      ]
    }
  },
  dependencies: []
};
