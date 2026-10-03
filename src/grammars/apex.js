import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "apex",
  displayName: "Apex",
  scopeName: "source.apex",
  patterns: [
    { include: "#javadoc-comment" },
    { include: "#comment" },
    { include: "#directives" },
    { include: "#declarations" },
    { include: "#script-top-level" }
  ],
  repository: {
    "annotation-declaration": {
      begin: /(@[_\p{Alpha}]+)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.type.annotation.apex" }
      },
      end: /(?=\p{space}(?!\())|(?=\p{space}*(?=\n?$))|(?<=\p{space}*\))/dgv,
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#statement" }
      ]
    },
    "argument-list": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.open.apex" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.apex" }
      },
      patterns: [
        { include: "#named-argument" },
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "array-creation-expression": {
      begin: new EmulatedRegExp("\\b(new)\\b\\p{space}*(?<type_name>(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)?\\p{space}*(?=\\[)", "dgv", { hiddenCaptures: [5, 7, 8, 9], transfers: [[3, [5, 8]], [4, [7]], [6, [9]]] }),
      beginCaptures: {
        "1": { name: "keyword.control.new.apex" },
        "2": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        }
      },
      end: /(?<=\])/dgv,
      patterns: [
        { include: "#bracketed-argument-list" }
      ]
    },
    block: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.apex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.apex" }
      },
      patterns: [
        { include: "#statement" }
      ]
    },
    "boolean-literal": {
      patterns: [
        {
          match: /(?<!\.)\btrue\b/dgv,
          name: "constant.language.boolean.true.apex"
        },
        {
          match: /(?<!\.)\bfalse\b/dgv,
          name: "constant.language.boolean.false.apex"
        }
      ]
    },
    "bracketed-argument-list": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.squarebracket.open.apex" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.squarebracket.close.apex" }
      },
      patterns: [
        { include: "#soql-query-expression" },
        { include: "#named-argument" },
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "break-or-continue-statement": {
      captures: {
        "1": { name: "keyword.control.flow.break.apex" },
        "2": { name: "keyword.control.flow.continue.apex" }
      },
      match: /(?<!\.)\b(?:(break)|(continue))\b/dgv
    },
    "cast-expression": {
      captures: {
        "1": { name: "punctuation.parenthesis.open.apex" },
        "2": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        },
        "6": { name: "punctuation.parenthesis.close.apex" }
      },
      match: new EmulatedRegExp("(\\()\\p{space}*(?<type_name>(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}*(\\))(?=\\p{space}*@?[\\(_\\p{Alpha}\\p{Nd}])", "dgv", { hiddenCaptures: [5, 7, 8, 9], transfers: [[3, [5, 8]], [4, [7]], [6, [9]]] })
    },
    "catch-clause": {
      begin: /(?<!\.)\b(catch)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.try.catch.apex" }
      },
      end: /(?<=\})/dgv,
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "#support-type" },
                    { include: "#type" }
                  ]
                },
                "5": { name: "entity.name.variable.local.apex" }
              },
              match: new EmulatedRegExp("(?<type_name>(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}*(?:((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))\\b)?", "dgv", { hiddenCaptures: [4, 6, 7, 8, 10], transfers: [[2, [4, 7, 10]], [3, [6]], [5, [8]]] })
            }
          ]
        },
        { include: "#comment" },
        { include: "#block" }
      ]
    },
    "class-declaration": {
      begin: /(?=\bclass\b)/dgv,
      end: /(?<=\})/dgv,
      patterns: [
        {
          begin: /\b(class)\b\p{space}+(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.class.apex" },
            "2": { name: "entity.name.type.class.apex" }
          },
          end: /(?=\{)/dgv,
          patterns: [
            { include: "#javadoc-comment" },
            { include: "#comment" },
            { include: "#type-parameter-list" },
            { include: "#extends-class" },
            { include: "#implements-class" }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.curlybrace.open.apex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.curlybrace.close.apex" }
          },
          patterns: [
            { include: "#class-or-trigger-members" }
          ]
        },
        { include: "#javadoc-comment" },
        { include: "#comment" }
      ]
    },
    "class-or-trigger-members": {
      patterns: [
        { include: "#javadoc-comment" },
        { include: "#comment" },
        { include: "#storage-modifier" },
        { include: "#sharing-modifier" },
        { include: "#type-declarations" },
        { include: "#field-declaration" },
        { include: "#property-declaration" },
        { include: "#indexer-declaration" },
        { include: "#variable-initializer" },
        { include: "#constructor-declaration" },
        { include: "#method-declaration" },
        { include: "#initializer-block" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "colon-expression": {
      match: /:/dgv,
      name: "keyword.operator.conditional.colon.apex"
    },
    comment: {
      patterns: [
        {
          begin: /\/\*(\*)?/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.apex" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.apex" }
          },
          name: "comment.block.apex"
        },
        {
          begin: /(^\p{space}+)?(?=\/\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.apex" }
          },
          end: /(?=(?=\n?$))/dgv,
          patterns: [
            {
              begin: /(?<!\/)\/\/\/(?!\/)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.apex" }
              },
              end: /(?=(?=\n?$))/dgv,
              name: "comment.block.documentation.apex",
              patterns: [
                { include: "#xml-doc-comment" }
              ]
            },
            {
              begin: /(?<!\/)\/\/(?:(?!\/)|(?=\/\/))/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.apex" }
              },
              end: /(?=(?=\n?$))/dgv,
              name: "comment.line.double-slash.apex"
            }
          ]
        }
      ]
    },
    "conditional-operator": {
      begin: /(?<!\?)\?(?!\?|\.(?!\p{Nd})|\[)/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.conditional.question-mark.apex" }
      },
      end: /:/dgv,
      endCaptures: {
        "0": { name: "keyword.operator.conditional.colon.apex" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    "constructor-declaration": {
      begin: /(?=@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*\p{space}*\()/dgv,
      end: /(?<=\})|(?=;)/dgv,
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.apex" }
          },
          match: /(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\b/dgv
        },
        {
          begin: /(:)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.colon.apex" }
          },
          end: /(?=\{|=>)/dgv,
          patterns: [
            { include: "#constructor-initializer" }
          ]
        },
        { include: "#parenthesized-parameter-list" },
        { include: "#comment" },
        { include: "#expression-body" },
        { include: "#block" }
      ]
    },
    "constructor-initializer": {
      begin: /\b(this)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.this.apex" }
      },
      end: /(?<=\))/dgv,
      patterns: [
        { include: "#argument-list" }
      ]
    },
    "date-literal-with-params": {
      captures: {
        "1": { name: "keyword.operator.query.date.apex" }
      },
      match: /\b(((?:LAST_N_DAY|NEXT_N_DAY|NEXT_N_WEEK|LAST_N_WEEK|NEXT_N_MONTH|LAST_N_MONTH|NEXT_N_QUARTER|LAST_N_QUARTER|NEXT_N_YEAR|LAST_N_YEAR|NEXT_N_FISCAL_QUARTER|LAST_N_FISCAL_QUARTER|NEXT_N_FISCAL_YEAR|LAST_N_FISCAL_YEAR)S)\p{space}*:\p{Nd}+)\b/dgv
    },
    "date-literals": {
      captures: {
        "1": { name: "keyword.operator.query.date.apex" }
      },
      match: /\b(YESTERDAY|TODAY|TOMORROW|LAST_WEEK|THIS_WEEK|NEXT_WEEK|LAST_MONTH|THIS_MONTH|NEXT_MONTH|LAST_90_DAYS|NEXT_90_DAYS|THIS_QUARTER|LAST_QUARTER|NEXT_QUARTER|THIS_YEAR|LAST_YEAR|NEXT_YEAR|THIS_FISCAL_QUARTER|LAST_FISCAL_QUARTER|NEXT_FISCAL_QUARTER|THIS_FISCAL_YEAR|LAST_FISCAL_YEAR|NEXT_FISCAL_YEAR)\b\p{space}*/dgv
    },
    declarations: {
      patterns: [
        { include: "#type-declarations" },
        { include: "#punctuation-semicolon" }
      ]
    },
    directives: {
      patterns: [
        { include: "#punctuation-semicolon" }
      ]
    },
    "dml-expression": {
      begin: /\b(delete|insert|undelete|update|upsert)\b\p{space}+(?!new\b)/dgv,
      beginCaptures: {
        "1": { name: "support.function.apex" }
      },
      end: /(?<=;)/dgv,
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "do-statement": {
      begin: /(?<!\.)\b(do)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.loop.do.apex" }
      },
      end: /(?=[\;\}])/dgv,
      patterns: [
        { include: "#statement" }
      ]
    },
    "element-access-expression": {
      begin: /(?:(\??\.)\p{space}*)?(?:(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\p{space}*)?(?:(\?)\p{space}*)?(?=\[)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#punctuation-accessor" },
            { include: "#operator-safe-navigation" }
          ]
        },
        "2": { name: "variable.other.object.property.apex" },
        "3": { name: "keyword.operator.null-conditional.apex" }
      },
      end: /(?<=\])(?!\p{space}*\[)/dgv,
      patterns: [
        { include: "#bracketed-argument-list" }
      ]
    },
    "else-part": {
      begin: /(?<!\.)\b(else)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.conditional.else.apex" }
      },
      end: /(?<=\})|(?=;)/dgv,
      patterns: [
        { include: "#statement" }
      ]
    },
    "enum-declaration": {
      begin: /(?=\benum\b)/dgv,
      end: /(?<=\})/dgv,
      patterns: [
        {
          begin: /(?=enum)/dgv,
          end: /(?=\{)/dgv,
          patterns: [
            { include: "#javadoc-comment" },
            { include: "#comment" },
            {
              captures: {
                "1": { name: "keyword.other.enum.apex" },
                "2": { name: "entity.name.type.enum.apex" }
              },
              match: /(enum)\p{space}+(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)/dgv
            }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.curlybrace.open.apex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.curlybrace.close.apex" }
          },
          patterns: [
            { include: "#javadoc-comment" },
            { include: "#comment" },
            { include: "#punctuation-comma" },
            {
              begin: /@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
              beginCaptures: {
                "0": { name: "entity.name.variable.enum-member.apex" }
              },
              end: /(?=([\,\}]))/dgv,
              patterns: [
                { include: "#javadoc-comment" },
                { include: "#comment" },
                { include: "#variable-initializer" }
              ]
            }
          ]
        },
        { include: "#javadoc-comment" },
        { include: "#comment" }
      ]
    },
    expression: {
      patterns: [
        { include: "#comment" },
        { include: "#dml-expression" },
        { include: "#merge-expression" },
        { include: "#support-expression" },
        { include: "#throw-expression" },
        { include: "#this-expression" },
        { include: "#trigger-context-declaration" },
        { include: "#conditional-operator" },
        { include: "#expression-operators" },
        { include: "#soql-query-expression" },
        { include: "#object-creation-expression" },
        { include: "#array-creation-expression" },
        { include: "#invocation-expression" },
        { include: "#member-access-expression" },
        { include: "#element-access-expression" },
        { include: "#cast-expression" },
        { include: "#literal" },
        { include: "#parenthesized-expression" },
        { include: "#initializer-expression" },
        { include: "#identifier" }
      ]
    },
    "expression-body": {
      begin: /=>/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.arrow.apex" }
      },
      end: /(?=[\)\,\;\}])/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    "expression-operators": {
      patterns: [
        {
          match: /[\-\%\*\+\/]=/dgv,
          name: "keyword.operator.assignment.compound.apex"
        },
        {
          match: /(?:[\&\^]|<<|>>|\|)=/dgv,
          name: "keyword.operator.assignment.compound.bitwise.apex"
        },
        {
          match: /<<|>>/dgv,
          name: "keyword.operator.bitwise.shift.apex"
        },
        {
          match: /[\!\=]=/dgv,
          name: "keyword.operator.comparison.apex"
        },
        {
          match: /<=|>=|[\<\>]/dgv,
          name: "keyword.operator.relational.apex"
        },
        {
          match: /!|&&|\|\|/dgv,
          name: "keyword.operator.logical.apex"
        },
        {
          match: /[\&\^\|\~]/dgv,
          name: "keyword.operator.bitwise.apex"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.apex"
        },
        {
          match: /--/dgv,
          name: "keyword.operator.decrement.apex"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.increment.apex"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.apex"
        }
      ]
    },
    "extends-class": {
      begin: /(extends)\b\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.extends.apex" }
      },
      end: /(?=\{|implements)/dgv,
      patterns: [
        {
          begin: /(?=[_\p{Alpha}][_\p{Alpha}\p{Nd}]*\p{space}*\.)/dgv,
          end: /(?=\{|implements)/dgv,
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        },
        {
          captures: {
            "1": { name: "entity.name.type.extends.apex" }
          },
          match: /([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)/dgv
        }
      ]
    },
    "field-declaration": {
      begin: new EmulatedRegExp("(?<type_name>(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}+((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))\\p{space}*(?!=[\\=\\>])(?=[\\,\\;\\=]|(?=\\n?$))", "dgv", { hiddenCaptures: [4, 6, 7, 8, 10], transfers: [[2, [4, 7, 10]], [3, [6]], [5, [8]]] }),
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        },
        "5": { name: "entity.name.variable.field.apex" }
      },
      end: /(?=;)/dgv,
      patterns: [
        {
          match: /@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
          name: "entity.name.variable.field.apex"
        },
        { include: "#punctuation-comma" },
        { include: "#comment" },
        { include: "#variable-initializer" },
        { include: "#class-or-trigger-members" }
      ]
    },
    "finally-clause": {
      begin: /(?<!\.)\b(finally)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.try.finally.apex" }
      },
      end: /(?<=\})/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#block" }
      ]
    },
    "for-apex-syntax": {
      captures: {
        "1": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        },
        "2": { name: "entity.name.variable.local.apex" },
        "3": { name: "keyword.operator.iterator.colon.apex" }
      },
      match: /([\._\p{Alpha}][\._\p{Alpha}\p{Nd}]+)\p{space}+([\._\p{Alpha}][\._\p{Alpha}\p{Nd}]*)\p{space}*(:)/dgv
    },
    "for-statement": {
      begin: /(?<!\.)\b(for)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.loop.for.apex" }
      },
      end: /(?<=\})|(?=;)/dgv,
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            { include: "#for-apex-syntax" },
            { include: "#local-variable-declaration" },
            { include: "#expression" },
            { include: "#punctuation-comma" },
            { include: "#punctuation-semicolon" },
            { include: "#colon-expression" }
          ]
        },
        { include: "#statement" }
      ]
    },
    "from-clause": {
      captures: {
        "1": { name: "keyword.operator.query.from.apex" },
        "2": { name: "storage.type.apex" }
      },
      match: /(FROM)\b\p{space}*([\._\p{Alpha}\p{Nd}]+\b)?/dgv
    },
    "goto-statement": {
      begin: /(?<!\.)\b(goto)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.goto.apex" }
      },
      end: /(?=;)/dgv,
      patterns: [
        {
          begin: /\b(case)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.case.apex" }
          },
          end: /(?=;)/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.control.default.apex" }
          },
          match: /\b(default)\b/dgv
        },
        {
          match: /@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
          name: "entity.name.label.apex"
        }
      ]
    },
    identifier: {
      match: /@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
      name: "variable.other.readwrite.apex"
    },
    "if-statement": {
      begin: /(?<!\.)\b(if)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.conditional.if.apex" }
      },
      end: /(?<=\})|(?=;)/dgv,
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#statement" }
      ]
    },
    "implements-class": {
      begin: /(implements)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.implements.apex" }
      },
      end: /(?=\{|extends)/dgv,
      patterns: [
        {
          begin: /(?=[_\p{Alpha}][_\p{Alpha}\p{Nd}]*\p{space}*\.)/dgv,
          end: /(?=\{|extends|,)/dgv,
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        },
        {
          captures: {
            "1": { name: "entity.name.type.implements.apex" },
            "2": { name: "punctuation.separator.comma.apex" }
          },
          match: /([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\b\p{space}*(,)?/dgv
        },
        { include: "#punctuation-comma" }
      ]
    },
    "indexer-declaration": {
      begin: new EmulatedRegExp("(?<return_type>(?<type_name>(?:ref\\p{space}+)?(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}+)(?<interface_name>((?:ref\\p{space}+)?(?:(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}*\\.\\p{space}*)?(?<indexer_name>this)\\p{space}*(?=\\[)", "dgv", { hiddenCaptures: [5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18], transfers: [[3, [5, 8, 12, 14, 17]], [4, [7, 13, 16]], [6, [9, 15, 18]], [2, [11]]] }),
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#type" }
          ]
        },
        "6": {
          patterns: [
            { include: "#type" },
            { include: "#punctuation-accessor" }
          ]
        },
        "7": { name: "keyword.other.this.apex" }
      },
      end: /(?<=\})|(?=;)/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#property-accessors" },
        { include: "#expression-body" },
        { include: "#variable-initializer" }
      ]
    },
    "initializer-block": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.apex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.apex" }
      },
      patterns: [
        { include: "#statement" }
      ]
    },
    "initializer-expression": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.apex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.apex" }
      },
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "interface-declaration": {
      begin: /(?=\binterface\b)/dgv,
      end: /(?<=\})/dgv,
      patterns: [
        {
          begin: /(interface)\b\p{space}+(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.interface.apex" },
            "2": { name: "entity.name.type.interface.apex" }
          },
          end: /(?=\{)/dgv,
          patterns: [
            { include: "#javadoc-comment" },
            { include: "#comment" },
            { include: "#type-parameter-list" },
            { include: "#extends-class" }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.curlybrace.open.apex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.curlybrace.close.apex" }
          },
          patterns: [
            { include: "#interface-members" }
          ]
        },
        { include: "#javadoc-comment" },
        { include: "#comment" }
      ]
    },
    "interface-members": {
      patterns: [
        { include: "#javadoc-comment" },
        { include: "#comment" },
        { include: "#property-declaration" },
        { include: "#indexer-declaration" },
        { include: "#method-declaration" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "invocation-expression": {
      begin: new EmulatedRegExp("(?:(\\??\\.)\\p{space}*)?(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<([^\\<\\>]|(?:\\p{space}*<([^\\<\\>]|(?:\\p{space}*<([^\\<\\>]|(?:\\p{space}*<([^\\<\\>]|(?:\\p{space}*<([^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?\\p{space}*(?=\\()", "dgv", { hiddenCaptures: [5, 6, 7, 8] }),
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#punctuation-accessor" },
            { include: "#operator-safe-navigation" }
          ]
        },
        "2": { name: "entity.name.function.apex" },
        "3": {
          patterns: [
            { include: "#type-arguments" }
          ]
        }
      },
      end: /(?<=\))/dgv,
      patterns: [
        { include: "#argument-list" }
      ]
    },
    "javadoc-comment": {
      patterns: [
        {
          begin: /^\p{space}*(\/\*\*)(?!\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.apex" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.apex" }
          },
          name: "comment.block.javadoc.apex",
          patterns: [
            {
              match: /@(deprecated|author|return|see|serial|since|version|usage|name|link)\b/dgv,
              name: "keyword.other.documentation.javadoc.apex"
            },
            {
              captures: {
                "1": { name: "keyword.other.documentation.javadoc.apex" },
                "2": { name: "entity.name.variable.parameter.apex" }
              },
              match: /(@param)\p{space}+(\P{space}+)/dgv
            },
            {
              captures: {
                "1": { name: "keyword.other.documentation.javadoc.apex" },
                "2": { name: "entity.name.type.class.apex" }
              },
              match: /(@(?:exception|throws))\p{space}+(\P{space}+)/dgv
            },
            {
              captures: {
                "1": { name: "string.quoted.single.apex" }
              },
              match: /(`([^\`]+?)`)/dgv
            }
          ]
        }
      ]
    },
    literal: {
      patterns: [
        { include: "#boolean-literal" },
        { include: "#null-literal" },
        { include: "#numeric-literal" },
        { include: "#multiline-string-literal" },
        { include: "#string-literal" }
      ]
    },
    "local-constant-declaration": {
      begin: new EmulatedRegExp("\\b(?<const_keyword>const)\\b\\p{space}*(?<type_name>(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}+((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))\\p{space}*(?=[\\,\\;\\=])", "dgv", { hiddenCaptures: [5, 7, 8, 9, 11], transfers: [[3, [5, 8, 11]], [4, [7]], [6, [9]]] }),
      beginCaptures: {
        "1": { name: "storage.modifier.apex" },
        "2": {
          patterns: [
            { include: "#type" }
          ]
        },
        "6": { name: "entity.name.variable.local.apex" }
      },
      end: /(?=;)/dgv,
      patterns: [
        {
          match: /@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
          name: "entity.name.variable.local.apex"
        },
        { include: "#punctuation-comma" },
        { include: "#comment" },
        { include: "#variable-initializer" }
      ]
    },
    "local-declaration": {
      patterns: [
        { include: "#local-constant-declaration" },
        { include: "#local-variable-declaration" }
      ]
    },
    "local-variable-declaration": {
      begin: new EmulatedRegExp("(?:(?:\\b(ref)\\p{space}+)?\\b(var)\\b|(?<type_name>(?:ref\\p{space}+)?(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*))\\p{space}+((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))\\p{space}*(?=[\\)\\,\\;\\=])", "dgv", { hiddenCaptures: [6, 8, 9, 10, 12], transfers: [[4, [6, 9, 12]], [5, [8]], [7, [10]]] }),
      beginCaptures: {
        "1": { name: "storage.modifier.apex" },
        "2": { name: "keyword.other.var.apex" },
        "3": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        },
        "7": { name: "entity.name.variable.local.apex" }
      },
      end: /(?=[\)\;])/dgv,
      patterns: [
        {
          match: /@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
          name: "entity.name.variable.local.apex"
        },
        { include: "#punctuation-comma" },
        { include: "#comment" },
        { include: "#variable-initializer" }
      ]
    },
    "member-access-expression": {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "#punctuation-accessor" },
                { include: "#operator-safe-navigation" }
              ]
            },
            "2": { name: "variable.other.object.property.apex" }
          },
          match: /(\??\.)\p{space}*(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\p{space}*(?![\(_\p{Alpha}\p{Nd}]|(\?)?\[|<)/dgv
        },
        {
          captures: {
            "1": {
              patterns: [
                { include: "#punctuation-accessor" },
                { include: "#operator-safe-navigation" }
              ]
            },
            "2": { name: "variable.other.object.apex" },
            "3": {
              patterns: [
                { include: "#type-arguments" }
              ]
            }
          },
          match: new EmulatedRegExp("(\\??\\.)?\\p{space}*(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)(?<type_params>\\p{space}*<([^\\<\\>]|(?:\\p{space}*<([^\\<\\>]|(?:\\p{space}*<([^\\<\\>]|(?:\\p{space}*<([^\\<\\>]|(?:\\p{space}*<([^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)(?=(\\p{space}*\\?)?\\p{space}*\\.\\p{space}*@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)", "dgv", { hiddenCaptures: [5, 6, 7, 8] })
        },
        {
          captures: {
            "1": { name: "variable.other.object.apex" }
          },
          match: /(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)(?=(\p{space}*\?)?\p{space}*\.\p{space}*@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)/dgv
        }
      ]
    },
    "merge-expression": {
      begin: /(merge)\b\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "support.function.apex" }
      },
      end: /(?<=;)/dgv,
      patterns: [
        { include: "#object-creation-expression" },
        { include: "#merge-type-statement" },
        { include: "#expression" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "merge-type-statement": {
      captures: {
        "1": { name: "variable.other.readwrite.apex" },
        "2": { name: "variable.other.readwrite.apex" },
        "3": { name: "punctuation.terminator.statement.apex" }
      },
      match: /([_\p{Alpha}]*)\b\p{space}+([_\p{Alpha}]*)\b\p{space}*(;)/dgv
    },
    "method-declaration": {
      begin: new EmulatedRegExp("(?<return_type>(?<type_name>(?:ref\\p{space}+)?(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}+)(?<interface_name>((?:ref\\p{space}+)?(?:(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}*\\.\\p{space}*)?((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))\\p{space}*(<([^\\<\\>]+)>)?\\p{space}*(?=\\()", "dgv", { hiddenCaptures: [5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 20], transfers: [[3, [5, 8, 12, 14, 17, 20]], [4, [7, 13, 16]], [6, [9, 15, 18]], [2, [11]]] }),
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        },
        "6": {
          patterns: [
            { include: "#type" },
            { include: "#punctuation-accessor" }
          ]
        },
        "7": {
          patterns: [
            { include: "#support-type" },
            { include: "#method-name-custom" }
          ]
        },
        "8": {
          patterns: [
            { include: "#type-parameter-list" }
          ]
        }
      },
      end: /(?<=\})|(?=;)/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#parenthesized-parameter-list" },
        { include: "#expression-body" },
        { include: "#block" }
      ]
    },
    "method-name-custom": {
      match: /@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
      name: "entity.name.function.apex"
    },
    "multiline-string-literal": {
      begin: /'''(?=(?=\n?$))/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.apex" }
      },
      end: /'''/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.apex" }
      },
      name: "string.quoted.single.apex string.quoted.single.multiline.apex",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    "named-argument": {
      begin: /(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.variable.parameter.apex" },
        "2": { name: "punctuation.separator.colon.apex" }
      },
      end: /(?=([\]\)\,]))/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    "null-literal": {
      match: /(?<!\.)\bnull\b/dgv,
      name: "constant.language.null.apex"
    },
    "numeric-literal": {
      patterns: [
        {
          match: /\b(\p{Nd}{4}-\p{Nd}{2}-\p{Nd}{2}T\p{Nd}{2}:\p{Nd}{2}:\p{Nd}{2}(\.\p{Nd}{1,3})?([\-\+])\p{Nd}{2}:\p{Nd}{2})\b/dgv,
          name: "constant.numeric.datetime.apex"
        },
        {
          match: /\b(\p{Nd}{4}-\p{Nd}{2}-\p{Nd}{2}T\p{Nd}{2}:\p{Nd}{2}:\p{Nd}{2}(\.\p{Nd}{1,3})?(Z)?)\b/dgv,
          name: "constant.numeric.datetime.apex"
        },
        {
          match: /\b(\p{Nd}{4}-\p{Nd}{2}-\p{Nd}{2})\b/dgv,
          name: "constant.numeric.date.apex"
        },
        {
          match: /\b0([Xx])[_\p{AHex}]+([LUlu]|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/dgv,
          name: "constant.numeric.hex.apex"
        },
        {
          match: /\b0([Bb])[01_]+([LUlu]|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/dgv,
          name: "constant.numeric.binary.apex"
        },
        {
          match: /\b([0-9_]+)?\.[0-9_]+(([Ee])[0-9]+)?([DFMdfm])?\b/dgv,
          name: "constant.numeric.decimal.apex"
        },
        {
          match: /\b[0-9_]+([Ee])[0-9_]+([DFMdfm])?\b/dgv,
          name: "constant.numeric.decimal.apex"
        },
        {
          match: /\b[0-9_]+([DFMdfm])\b/dgv,
          name: "constant.numeric.decimal.apex"
        },
        {
          match: /\b[0-9_]+([LUlu]|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/dgv,
          name: "constant.numeric.decimal.apex"
        }
      ]
    },
    "object-creation-expression": {
      patterns: [
        { include: "#object-creation-expression-with-parameters" },
        { include: "#object-creation-expression-with-no-parameters" },
        { include: "#punctuation-comma" }
      ]
    },
    "object-creation-expression-with-no-parameters": {
      captures: {
        "1": { name: "support.function.apex" },
        "2": { name: "keyword.control.new.apex" },
        "3": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        }
      },
      match: new EmulatedRegExp("(delete|insert|undelete|update|upsert)?\\p{space}*(new)\\p{space}+(?<type_name>(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}*(?=\\{|(?=\\n?$))", "dgv", { hiddenCaptures: [6, 8, 9, 10], transfers: [[4, [6, 9]], [5, [8]], [7, [10]]] })
    },
    "object-creation-expression-with-parameters": {
      begin: new EmulatedRegExp("(delete|insert|undelete|update|upsert)?\\p{space}*(new)\\p{space}+(?<type_name>(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}*(?=\\()", "dgv", { hiddenCaptures: [6, 8, 9, 10], transfers: [[4, [6, 9]], [5, [8]], [7, [10]]] }),
      beginCaptures: {
        "1": { name: "support.function.apex" },
        "2": { name: "keyword.control.new.apex" },
        "3": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        }
      },
      end: /(?<=\))/dgv,
      patterns: [
        { include: "#argument-list" }
      ]
    },
    "operator-assignment": {
      match: /(?<![\!\=])(=)(?!=)/dgv,
      name: "keyword.operator.assignment.apex"
    },
    "operator-safe-navigation": {
      match: /\?\./dgv,
      name: "keyword.operator.safe-navigation.apex"
    },
    "orderby-clause": {
      captures: {
        "1": { name: "keyword.operator.query.orderby.apex" }
      },
      match: /\b(ORDER BY)\b\p{space}*/dgv,
      patterns: [
        { include: "#ordering-direction" },
        { include: "#ordering-nulls" }
      ]
    },
    "ordering-direction": {
      captures: {
        "1": { name: "keyword.operator.query.ascending.apex" },
        "2": { name: "keyword.operator.query.descending.apex" }
      },
      match: /\b(?:(ASC)|(DESC))\b/dgv
    },
    "ordering-nulls": {
      captures: {
        "1": { name: "keyword.operator.query.nullsfirst.apex" },
        "2": { name: "keyword.operator.query.nullslast.apex" }
      },
      match: /\b(?:(NULLS FIRST)|(NULLS LAST))\b/dgv
    },
    parameter: {
      captures: {
        "1": { name: "storage.modifier.apex" },
        "2": {
          patterns: [
            { include: "#support-type" },
            { include: "#type" }
          ]
        },
        "6": { name: "entity.name.variable.parameter.apex" }
      },
      match: new EmulatedRegExp("(?:\\b(this|final)\\b\\p{space}+)?(?<type_name>(?:ref\\p{space}+)?(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}+((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))", "dgv", { hiddenCaptures: [5, 7, 8, 9, 11], transfers: [[3, [5, 8, 11]], [4, [7]], [6, [9]]] })
    },
    "parenthesized-expression": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.open.apex" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.apex" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    "parenthesized-parameter-list": {
      begin: /(\()/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.open.apex" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.apex" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#parameter" },
        { include: "#punctuation-comma" },
        { include: "#variable-initializer" }
      ]
    },
    "property-accessors": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.apex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.apex" }
      },
      patterns: [
        {
          match: /\b(pr(?:ivate|otected))\b/dgv,
          name: "storage.modifier.apex"
        },
        {
          match: /\b(get)\b/dgv,
          name: "keyword.other.get.apex"
        },
        {
          match: /\b(set)\b/dgv,
          name: "keyword.other.set.apex"
        },
        { include: "#comment" },
        { include: "#expression-body" },
        { include: "#block" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "property-declaration": {
      begin: new EmulatedRegExp("(?![^\\n]*\\b(?:class|interface|enum)\\b)\\p{space}*(?<return_type>(?<type_name>(?:ref\\p{space}+)?(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}+)(?<interface_name>((?:ref\\p{space}+)?(?:(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}*\\.\\p{space}*)?(?<property_name>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))\\p{space}*(?=\\{|=>|(?=\\n?$))", "dgv", { hiddenCaptures: [5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 20], transfers: [[3, [5, 8, 12, 14, 17, 20]], [4, [7, 13, 16]], [6, [9, 15, 18]], [2, [11]]] }),
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#type" }
          ]
        },
        "6": {
          patterns: [
            { include: "#type" },
            { include: "#punctuation-accessor" }
          ]
        },
        "7": { name: "entity.name.variable.property.apex" }
      },
      end: /(?<=\})|(?=;)/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#property-accessors" },
        { include: "#expression-body" },
        { include: "#variable-initializer" },
        { include: "#class-or-trigger-members" }
      ]
    },
    "punctuation-accessor": {
      match: /\./dgv,
      name: "punctuation.accessor.apex"
    },
    "punctuation-comma": {
      match: /,/dgv,
      name: "punctuation.separator.comma.apex"
    },
    "punctuation-semicolon": {
      match: /;/dgv,
      name: "punctuation.terminator.statement.apex"
    },
    "query-operators": {
      captures: {
        "1": { name: "keyword.operator.query.apex" }
      },
      match: /\b(ABOVE|AND|AT|FOR REFERENCE|FOR UPDATE|FOR VIEW|GROUP BY|HAVING|IN|LIKE|LIMIT|NOT IN|NOT|OFFSET|OR|TYPEOF|UPDATE TRACKING|UPDATE VIEWSTAT|WITH DATA CATEGORY|WITH)\b\p{space}*/dgv
    },
    "return-statement": {
      begin: /(?<!\.)\b(return)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.flow.return.apex" }
      },
      end: /(?=;)/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    "script-top-level": {
      patterns: [
        { include: "#method-declaration" },
        { include: "#statement" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "sharing-modifier": {
      match: /(?<!\.)\b((?:with|without|inherited) sharing)\b/dgv,
      name: "sharing.modifier.apex"
    },
    "soql-colon-method-statement": {
      begin: /(:?\.)?([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)(?=\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.accessor.apex" },
        "2": { name: "entity.name.function.apex" }
      },
      end: /(?<=\))/dgv,
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#statement" }
      ]
    },
    "soql-colon-vars": {
      begin: /(:)\p{space}*/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.conditional.colon.apex" }
      },
      end: /(?![\(_\p{Alpha}\p{Nd}]|(\?)?\[|<)/dgv,
      patterns: [
        { include: "#trigger-context-declaration" },
        {
          captures: {
            "1": { name: "variable.other.object.apex" },
            "2": {
              patterns: [
                { include: "#punctuation-accessor" },
                { include: "#operator-safe-navigation" }
              ]
            }
          },
          match: /([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)(\??\.)/dgv
        },
        { include: "#soql-colon-method-statement" },
        {
          match: /[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
          name: "entity.name.variable.local.apex"
        }
      ]
    },
    "soql-functions": {
      begin: /\b(AVG|CALENDAR_MONTH|CALENDAR_QUARTER|CALENDAR_YEAR|convertCurrency|convertTimezone|COUNT|COUNT_DISTINCT|DAY_IN_MONTH|DAY_IN_WEEK|DAY_IN_YEAR|DAY_ONLY|toLabel|INCLUDES|EXCLUDES|FISCAL_MONTH|FISCAL_QUARTER|FISCAL_YEAR|FORMAT|GROUPING|GROUP BY CUBE|GROUP BY ROLLUP|HOUR_IN_DAY|MAX|MIN|SUM|WEEK_IN_MONTH|WEEK_IN_YEAR)\p{space}*(\()/dgv,
      beginCaptures: {
        "1": { name: "support.function.query.apex" },
        "2": { name: "punctuation.parenthesis.open.apex" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.apex" }
      },
      patterns: [
        { include: "#literal" },
        { include: "#punctuation-comma" },
        { include: "#soql-functions" },
        {
          match: /[\._\p{Alpha}][\._\p{Alpha}\p{Nd}]*/dgv,
          name: "keyword.query.field.apex"
        }
      ]
    },
    "soql-group-clauses": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.open.apex" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.apex" }
      },
      patterns: [
        { include: "#soql-query-expression" },
        { include: "#soql-colon-vars" },
        { include: "#soql-group-clauses" },
        { include: "#punctuation-comma" },
        { include: "#operator-assignment" },
        { include: "#literal" },
        { include: "#query-operators" },
        { include: "#date-literals" },
        { include: "#date-literal-with-params" },
        { include: "#using-scope" },
        {
          match: /[\._\p{Alpha}][\._\p{Alpha}\p{Nd}]*/dgv,
          name: "keyword.query.field.apex"
        }
      ]
    },
    "soql-query-body": {
      patterns: [
        { include: "#trigger-context-declaration" },
        { include: "#soql-colon-vars" },
        { include: "#soql-functions" },
        { include: "#from-clause" },
        { include: "#where-clause" },
        { include: "#query-operators" },
        { include: "#date-literals" },
        { include: "#date-literal-with-params" },
        { include: "#using-scope" },
        { include: "#soql-group-clauses" },
        { include: "#orderby-clause" },
        { include: "#ordering-direction" },
        { include: "#ordering-nulls" }
      ]
    },
    "soql-query-expression": {
      begin: /\b(SELECT)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.query.select.apex" }
      },
      end: /(?=;)|(?=\])|(?=\))/dgv,
      patterns: [
        { include: "#soql-query-body" },
        { include: "#comment" },
        { include: "#punctuation-comma" },
        { include: "#operator-assignment" },
        { include: "#parenthesized-expression" },
        { include: "#expression-operators" },
        { include: "#literal" },
        {
          captures: {
            "1": { name: "keyword.query.field.apex" },
            "2": { name: "punctuation.separator.comma.apex" }
          },
          match: /([\._\p{Alpha}][\._\p{Alpha}\p{Nd}]*)\p{space}*(,)?/dgv
        }
      ]
    },
    statement: {
      patterns: [
        { include: "#comment" },
        { include: "#while-statement" },
        { include: "#do-statement" },
        { include: "#for-statement" },
        { include: "#switch-statement" },
        { include: "#when-else-statement" },
        { include: "#when-sobject-statement" },
        { include: "#when-statement" },
        { include: "#when-multiple-statement" },
        { include: "#if-statement" },
        { include: "#else-part" },
        { include: "#goto-statement" },
        { include: "#return-statement" },
        { include: "#break-or-continue-statement" },
        { include: "#throw-statement" },
        { include: "#try-statement" },
        { include: "#soql-query-expression" },
        { include: "#local-declaration" },
        { include: "#block" },
        { include: "#expression" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "storage-modifier": {
      match: /(?<!\.)\b(new|public|protected|private|abstract|virtual|override|global|static|final|transient)\b/dgv,
      name: "storage.modifier.apex"
    },
    "string-character-escape": {
      match: /\\[^\n]/dgv,
      name: "constant.character.escape.apex"
    },
    "string-literal": {
      begin: /'(?!'')/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.apex" }
      },
      end: /(')|([^\n\\])(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.apex" },
        "2": { name: "invalid.illegal.newline.apex" }
      },
      name: "string.quoted.single.apex",
      patterns: [
        { include: "#string-character-escape" },
        { include: "#string-template-expression" }
      ]
    },
    "string-template-expression": {
      begin: /(?<!\\)\$\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.apex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.apex" }
      },
      name: "meta.template-expression.apex",
      patterns: [
        {
          match: {
            G: [/￿@?[A-Z_a-z][0-9A-Z_a-z]*(?:\.[A-Z_a-z][0-9A-Z_a-z]*)*/dgv, /@?[A-Z_a-z][0-9A-Z_a-z]*(?:\.[A-Z_a-z][0-9A-Z_a-z]*)*/dgvy]
          },
          name: "variable.other.readwrite.apex"
        }
      ]
    },
    "support-arguments": {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.typeparameters.begin.apex" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.typeparameters.end.apex" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#support-type" },
        { include: "#punctuation-comma" }
      ]
    },
    "support-class": {
      captures: {
        "1": { name: "support.class.apex" }
      },
      match: /\b(ApexPages|Database|DMLException|Exception|PageReference|Savepoint|SchedulableContext|Schema|SObject|System|Test)\b/dgv
    },
    "support-expression": {
      begin: /(ApexPages|Database|DMLException|Exception|PageReference|Savepoint|SchedulableContext|Schema|SObject|System|Test)(?=[\.\p{space}])/dgv,
      beginCaptures: {
        "1": { name: "support.class.apex" }
      },
      end: /(?<=\)|(?=\n?$))|(?=\})|(?=;)|(?=\)|(?=\]))|(?=,)/dgv,
      patterns: [
        { include: "#support-type" },
        {
          captures: {
            "1": { name: "punctuation.accessor.apex" },
            "2": { name: "support.function.apex" }
          },
          match: /(\.)(\p{Alpha}*)(?=\()/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.apex" },
            "2": { name: "support.type.apex" }
          },
          match: /(\.)(\p{Alpha}+)/dgv
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            { include: "#expression" },
            { include: "#punctuation-comma" }
          ]
        },
        { include: "#comment" },
        { include: "#statement" }
      ]
    },
    "support-functions": {
      captures: {
        "1": { name: "support.function.apex" }
      },
      match: /\b(delete|execute|finish|insert|start|undelete|update|upsert)\b/dgv
    },
    "support-name": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.accessor.apex" },
            "2": { name: "support.function.apex" }
          },
          match: /(\.)\p{space}*(\p{Alpha}*)(?=\()/dgv
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            { include: "#expression" },
            { include: "#punctuation-comma" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.apex" },
            "2": { name: "support.type.apex" }
          },
          match: /(\.)\p{space}*([_\p{Alpha}]*)/dgv
        }
      ]
    },
    "support-type": {
      name: "support.apex",
      patterns: [
        { include: "#comment" },
        { include: "#support-class" },
        { include: "#support-functions" },
        { include: "#support-name" }
      ]
    },
    "switch-statement": {
      begin: /(switch)\b\p{space}+(on)\b\p{space}+([^\n]*)(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.switch.apex" },
        "2": { name: "keyword.control.switch.on.apex" },
        "3": {
          patterns: [
            { include: "#statement" },
            { include: "#parenthesized-expression" }
          ]
        },
        "4": { name: "punctuation.curlybrace.open.apex" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.apex" }
      },
      patterns: [
        { include: "#when-string" },
        { include: "#when-else-statement" },
        { include: "#when-sobject-statement" },
        { include: "#when-statement" },
        { include: "#when-multiple-statement" },
        { include: "#expression" },
        { include: "#punctuation-comma" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "this-expression": {
      captures: {
        "1": { name: "keyword.other.this.apex" }
      },
      match: /\b(this)\b/dgv
    },
    "throw-expression": {
      captures: {
        "1": { name: "keyword.control.flow.throw.apex" }
      },
      match: /(?<!\.)\b(throw)\b/dgv
    },
    "throw-statement": {
      begin: /(?<!\.)\b(throw)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.flow.throw.apex" }
      },
      end: /(?=;)/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    "trigger-context-declaration": {
      begin: /\b(Trigger)\b(\.)\b/dgv,
      beginCaptures: {
        "1": { name: "support.class.trigger.apex" },
        "2": { name: "punctuation.accessor.apex" }
      },
      end: /(?=\})|(?=;)|(?=\)|(?=\]))/dgv,
      patterns: [
        {
          match: /\b(isExecuting|isInsert|isUpdate|isDelete|isBefore|isAfter|isUndelete|new|newMap|old|oldMap|size)\b/dgv,
          name: "support.type.trigger.apex"
        },
        {
          captures: {
            "1": {
              patterns: [
                { include: "#punctuation-accessor" },
                { include: "#operator-safe-navigation" }
              ]
            },
            "2": { name: "support.function.trigger.apex" }
          },
          match: /(\??\.)(\p{Alpha}+)(?=\()/dgv
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            { include: "#trigger-type-statement" },
            { include: "#javadoc-comment" },
            { include: "#comment" },
            { include: "#expression" }
          ]
        },
        { include: "#expression" }
      ]
    },
    "trigger-declaration": {
      begin: /(?=\btrigger\b)/dgv,
      end: /(?<=\})/dgv,
      patterns: [
        {
          begin: /\b(trigger)\b\p{space}+(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\p{space}*\b(on)\b\p{space}+([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.trigger.apex" },
            "2": { name: "entity.name.type.trigger.apex" },
            "3": { name: "keyword.operator.trigger.on.apex" },
            "4": { name: "storage.type.apex" }
          },
          end: /(?=\{)/dgv,
          patterns: [
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.parenthesis.open.apex" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.parenthesis.close.apex" }
              },
              patterns: [
                { include: "#trigger-type-statement" },
                { include: "#trigger-operator-statement" },
                { include: "#punctuation-comma" },
                { include: "#expression" }
              ]
            },
            { include: "#javadoc-comment" },
            { include: "#comment" },
            { include: "#type-parameter-list" }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.curlybrace.open.apex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.curlybrace.close.apex" }
          },
          patterns: [
            { include: "#statement" },
            { include: "#class-or-trigger-members" }
          ]
        },
        { include: "#javadoc-comment" },
        { include: "#comment" }
      ]
    },
    "trigger-operator-statement": {
      match: /\b(insert|update|delete|merge|upsert|undelete)\b/dgv,
      name: "keyword.operator.trigger.apex"
    },
    "trigger-type-statement": {
      captures: {
        "1": { name: "keyword.control.trigger.before.apex" },
        "2": { name: "keyword.control.trigger.after.apex" }
      },
      match: /\b(?:(before)|(after))\b/dgv
    },
    "try-block": {
      begin: /(?<!\.)\b(try)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.try.apex" }
      },
      end: /(?<=\})/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#block" }
      ]
    },
    "try-statement": {
      patterns: [
        { include: "#try-block" },
        { include: "#catch-clause" },
        { include: "#finally-clause" }
      ]
    },
    type: {
      name: "meta.type.apex",
      patterns: [
        { include: "#comment" },
        { include: "#type-builtin" },
        { include: "#type-name" },
        { include: "#type-arguments" },
        { include: "#type-array-suffix" },
        { include: "#type-nullable-suffix" }
      ]
    },
    "type-arguments": {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.typeparameters.begin.apex" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.typeparameters.end.apex" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#support-type" },
        { include: "#type" },
        { include: "#punctuation-comma" }
      ]
    },
    "type-array-suffix": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.squarebracket.open.apex" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.squarebracket.close.apex" }
      },
      patterns: [
        { include: "#punctuation-comma" }
      ]
    },
    "type-builtin": {
      captures: {
        "1": { name: "keyword.type.apex" }
      },
      match: /\b(Blob|Boolean|byte|Date|Datetime|Decimal|Double|Id|ID|Integer|Long|Object|String|Time|void)\b/dgv
    },
    "type-declarations": {
      patterns: [
        { include: "#javadoc-comment" },
        { include: "#comment" },
        { include: "#annotation-declaration" },
        { include: "#storage-modifier" },
        { include: "#sharing-modifier" },
        { include: "#class-declaration" },
        { include: "#enum-declaration" },
        { include: "#interface-declaration" },
        { include: "#trigger-declaration" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "type-name": {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.apex" },
            "2": { name: "punctuation.accessor.apex" }
          },
          match: /(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\p{space}*(\.)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.apex" },
            "2": { name: "storage.type.apex" }
          },
          match: /(\.)\p{space}*(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)/dgv
        },
        {
          match: /@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
          name: "storage.type.apex"
        }
      ]
    },
    "type-nullable-suffix": {
      captures: {
        "0": { name: "punctuation.separator.question-mark.apex" }
      },
      match: /\?/dgv
    },
    "type-parameter-list": {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.typeparameters.begin.apex" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.typeparameters.end.apex" }
      },
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.type.type-parameter.apex" }
          },
          match: /(@?[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\b/dgv
        },
        { include: "#comment" },
        { include: "#punctuation-comma" }
      ]
    },
    "using-scope": {
      captures: {
        "1": { name: "keyword.operator.query.using.apex" }
      },
      match: /((USING SCOPE)\b\p{space}*(Delegated|Everything|Mine|My_Territory|My_Team_Territory|Team))\b\p{space}*/dgv
    },
    "variable-initializer": {
      begin: /(?<![\!\=])(=)(?![\=\>])/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.assignment.apex" }
      },
      end: /(?=[\]\)\,\;\}])/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    "when-else-statement": {
      begin: /(when)\b\p{space}+(else)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.switch.when.apex" },
        "2": { name: "keyword.control.switch.else.apex" }
      },
      end: /(?=\})|(?=when\b)/dgv,
      patterns: [
        { include: "#block" },
        { include: "#expression" }
      ]
    },
    "when-multiple-statement": {
      begin: /(when)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.switch.when.apex" }
      },
      end: /(?=\})|(?=when\b)/dgv,
      patterns: [
        { include: "#block" },
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "when-sobject-statement": {
      begin: /(when)\b\p{space}+([_\p{Alpha}\p{Nd}]+)\p{space}+([_\p{Alpha}\p{Nd}]+)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.switch.when.apex" },
        "2": { name: "storage.type.apex" },
        "3": { name: "entity.name.variable.local.apex" }
      },
      end: /(?=\})|(?=when\b)/dgv,
      patterns: [
        { include: "#block" },
        { include: "#expression" }
      ]
    },
    "when-statement": {
      begin: /(when)\b\p{space}+([\-_\p{Alpha}\p{Nd}]+)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.switch.when.apex" },
        "2": {
          patterns: [
            { include: "#expression" }
          ]
        }
      },
      end: /(?=\})|(?=when\b)/dgv,
      patterns: [
        { include: "#block" },
        { include: "#expression" }
      ]
    },
    "when-string": {
      begin: /(when)\b\p{space}*('[^\n']*')(\p{space}*(,)\p{space}*('[^\n']*'))*\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.switch.when.apex" },
        "2": {
          patterns: [
            { include: "#multiline-string-literal" },
            { include: "#string-literal" }
          ]
        },
        "4": {
          patterns: [
            { include: "#punctuation-comma" }
          ]
        },
        "5": {
          patterns: [
            { include: "#multiline-string-literal" },
            { include: "#string-literal" }
          ]
        }
      },
      end: /(?=\})|(?=when\b)/dgv,
      patterns: [
        { include: "#block" },
        { include: "#expression" }
      ]
    },
    "where-clause": {
      captures: {
        "1": { name: "keyword.operator.query.where.apex" }
      },
      match: /\b(WHERE)\b\p{space}*/dgv
    },
    "while-statement": {
      begin: /(?<!\.)\b(while)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.loop.while.apex" }
      },
      end: /(?<=\})|(?=;)/dgv,
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.parenthesis.open.apex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.parenthesis.close.apex" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#statement" }
      ]
    },
    "xml-attribute": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.other.attribute-name.apex" },
            "2": { name: "entity.other.attribute-name.namespace.apex" },
            "3": { name: "punctuation.separator.colon.apex" },
            "4": { name: "entity.other.attribute-name.localname.apex" },
            "5": { name: "punctuation.separator.equals.apex" }
          },
          match: /(?:^|\p{space}+)((?:([\-_\p{Alpha}\p{Nd}]+)(:))?([\-_\p{Alpha}\p{Nd}]+))(=)/dgv
        },
        { include: "#xml-string" }
      ]
    },
    "xml-cdata": {
      begin: /<!\[CDATA\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.apex" }
      },
      end: /\]\]>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.apex" }
      },
      name: "string.unquoted.cdata.apex"
    },
    "xml-character-entity": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.constant.apex" },
            "3": { name: "punctuation.definition.constant.apex" }
          },
          match: /(&)([\:_\p{Alpha}][\-\.\:_\p{Alpha}\p{Nd}]*|#\p{Nd}+|#x\p{AHex}+)(;)/dgv,
          name: "constant.character.entity.apex"
        },
        {
          match: /&/dgv,
          name: "invalid.illegal.bad-ampersand.apex"
        }
      ]
    },
    "xml-comment": {
      begin: /<!--/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.apex" }
      },
      end: /-->/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.apex" }
      },
      name: "comment.block.apex"
    },
    "xml-doc-comment": {
      patterns: [
        { include: "#xml-comment" },
        { include: "#xml-character-entity" },
        { include: "#xml-cdata" },
        { include: "#xml-tag" }
      ]
    },
    "xml-string": {
      patterns: [
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.apex" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.apex" }
          },
          name: "string.quoted.single.apex",
          patterns: [
            { include: "#xml-character-entity" }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.stringdoublequote.begin.apex" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.stringdoublequote.end.apex" }
          },
          name: "string.quoted.double.apex",
          patterns: [
            { include: "#xml-character-entity" }
          ]
        }
      ]
    },
    "xml-tag": {
      begin: /(<\/?)((?:([\-_\p{Alpha}\p{Nd}]+)(:))?([\-_\p{Alpha}\p{Nd}]+))/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.apex" },
        "2": { name: "entity.name.tag.apex" },
        "3": { name: "entity.name.tag.namespace.apex" },
        "4": { name: "punctuation.separator.colon.apex" },
        "5": { name: "entity.name.tag.localname.apex" }
      },
      end: /(\/?>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.apex" }
      },
      name: "meta.tag.apex",
      patterns: [
        { include: "#xml-attribute" }
      ]
    }
  },
  dependencies: []
};
