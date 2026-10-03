export default {
  name: "angular-expression",
  scopeName: "expression.ng",
  patterns: [
    { include: "#ngExpression" }
  ],
  repository: {
    arrayLiteral: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.square.ts" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.ts" }
      },
      name: "meta.array.literal.ts",
      patterns: [
        { include: "#ngExpression" },
        { include: "#punctuationComma" }
      ]
    },
    booleanLiteral: {
      patterns: [
        {
          match: /(?<![\$\.])\btrue\b(?!\$)/dgv,
          name: "constant.language.boolean.true.ts"
        },
        {
          match: /(?<![\$\.])\bfalse\b(?!\$)/dgv,
          name: "constant.language.boolean.false.ts"
        }
      ]
    },
    expressionOperator: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.logical.ts" },
            "2": { name: "entity.name.function.pipe.ng" }
          },
          match: /((?<!\|)\|(?!\|))\p{space}?([\-\$0-9A-Z_a-z]*)/dgv
        },
        {
          match: /(?<![\$\.])\b(let)\b(?!\$)/dgv,
          name: "storage.type.ts"
        },
        {
          match: /(?<![\$\.])\b(await)\b(?!\$)/dgv,
          name: "keyword.control.flow.ts"
        },
        {
          match: /(?<![\$\.])\bdelete\b(?!\$)/dgv,
          name: "keyword.operator.expression.delete.ts"
        },
        {
          match: /(?<![\$\.])\bin\b(?!\$)/dgv,
          name: "keyword.operator.expression.in.ts"
        },
        {
          match: /(?<![\$\.])\bof\b(?!\$)/dgv,
          name: "keyword.operator.expression.of.ts"
        },
        {
          match: /(?<![\$\.])\bif\b(?!\$)/dgv,
          name: "keyword.control.if.ts"
        },
        {
          match: /(?<![\$\.])\belse\b(?!\$)/dgv,
          name: "keyword.control.else.ts"
        },
        {
          match: /(?<![\$\.])\bthen\b(?!\$)/dgv,
          name: "keyword.control.then.ts"
        },
        {
          match: /(?<![\$\.])\binstanceof\b(?!\$)/dgv,
          name: "keyword.operator.expression.instanceof.ts"
        },
        {
          match: /(?<![\$\.])\bnew\b(?!\$)/dgv,
          name: "keyword.operator.new.ts"
        },
        {
          match: /(?<![\$\.])\bvoid\b(?!\$)/dgv,
          name: "keyword.operator.expression.void.ts"
        },
        {
          begin: /(?<![\$\.])\bas\b(?!\$)/dgv,
          beginCaptures: {
            "0": { name: "storage.type.as.ts" }
          },
          end: /(?=(?=\n?$)|[\]"'\)\,\:\;\}])/dgv,
          patterns: [
            { include: "#type" }
          ]
        },
        {
          match: /(?:\*|(?<!\()\/|[\-\%\+])=/dgv,
          name: "keyword.operator.assignment.compound.ts"
        },
        {
          match: /(?:[\&\^]|<<|>>>??|\|)=/dgv,
          name: "keyword.operator.assignment.compound.bitwise.ts"
        },
        {
          match: /<<|>>>?/dgv,
          name: "keyword.operator.bitwise.shift.ts"
        },
        {
          match: /[\!\=]==?/dgv,
          name: "keyword.operator.comparison.ts"
        },
        {
          match: /<=|>=|<>|[\<\>]/dgv,
          name: "keyword.operator.relational.ts"
        },
        {
          match: /!|&&|\?\?|\|\|/dgv,
          name: "keyword.operator.logical.ts"
        },
        {
          match: /[\&\^\|\~]/dgv,
          name: "keyword.operator.bitwise.ts"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.ts"
        },
        {
          match: /--/dgv,
          name: "keyword.operator.decrement.ts"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.increment.ts"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.ts"
        },
        {
          captures: {
            "1": { name: "keyword.operator.arithmetic.ts" }
          },
          match: /(?<=[\$_\p{Alpha}\p{Nd}])\p{space}*(\/)(?![\*\/])/dgv
        },
        { include: "#typeofOperator" }
      ]
    },
    functionCall: {
      begin: /(?=(\??\.\p{space}*)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(<([^\<\>]|<[^\<\>]+>)+>\p{space}*)?\()/dgv,
      end: /(?<=\))(?!(\??\.\p{space}*)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(<([^\<\>]|<[^\<\>]+>)+>\p{space}*)?\()/dgv,
      patterns: [
        {
          match: /\?/dgv,
          name: "punctuation.accessor.ts"
        },
        {
          match: /\./dgv,
          name: "punctuation.accessor.ts"
        },
        {
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          name: "entity.name.function.ts"
        },
        {
          begin: /</dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.typeparameters.begin.ts" }
          },
          end: />/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.typeparameters.end.ts" }
          },
          name: "meta.type.parameters.ts",
          patterns: [
            { include: "#type" },
            { include: "#punctuationComma" }
          ]
        },
        { include: "#parenExpression" }
      ]
    },
    functionParameters: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.parameters.begin.ts" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.ts" }
      },
      name: "meta.parameters.ts",
      patterns: [
        { include: "#decorator" },
        { include: "#parameterName" },
        { include: "#variableInitializer" },
        {
          match: /,/dgv,
          name: "punctuation.separator.parameter.ts"
        }
      ]
    },
    identifiers: {
      patterns: [
        {
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?=\p{space}*\.\p{space}*prototype\b(?!\$))/dgv,
          name: "support.class.ts"
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.ts" },
            "2": { name: "constant.other.object.property.ts" },
            "3": { name: "variable.other.object.property.ts" }
          },
          match: /([\!\?]?\.)\p{space}*(?:(\p{Upper}[\$_\p{Nd}\p{Upper}]*)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?=\p{space}*\.\p{space}*[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.ts" },
            "2": { name: "entity.name.function.ts" }
          },
          match: /(?:([\!\?]?\.)\p{space}*)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?=\p{space}*=\p{space}*((async\p{space}+)|(function\p{space}*[\(\<])|(function\p{space}+)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*=>)|((<([^\<\>]|<[^\<\>]+>)+>\p{space}*)?\(([^\(\)]|\([^\(\)]*\))*\)(\p{space}*:\p{space}*([^\n])*)?\p{space}*=>)))/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.ts" },
            "2": { name: "constant.other.property.ts" }
          },
          match: /([\!\?]?\.)\p{space}*(\p{Upper}[\$_\p{Nd}\p{Upper}]*)(?![\$_\p{Alpha}\p{Nd}])/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.ts" },
            "2": { name: "variable.other.property.ts" }
          },
          match: /([\!\?]?\.)\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        },
        {
          captures: {
            "1": { name: "constant.other.object.ts" },
            "2": { name: "variable.other.object.ts" }
          },
          match: /(?:(\p{Upper}[\$_\p{Nd}\p{Upper}]*)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?=\p{space}*\.\p{space}*[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        },
        {
          match: /(\p{Upper}[\$_\p{Nd}\p{Upper}]*)(?![\$_\p{Alpha}\p{Nd}])/dgv,
          name: "constant.character.other"
        },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          name: "variable.other.readwrite.ts"
        }
      ]
    },
    literal: {
      name: "literal.ts",
      patterns: [
        { include: "#numericLiteral" },
        { include: "#booleanLiteral" },
        { include: "#nullLiteral" },
        { include: "#undefinedLiteral" },
        { include: "#numericConstantLiteral" },
        { include: "#arrayLiteral" },
        { include: "#thisLiteral" }
      ]
    },
    ngExpression: {
      name: "meta.expression.ng",
      patterns: [
        { include: "#string" },
        { include: "#literal" },
        { include: "#ternaryExpression" },
        { include: "#expressionOperator" },
        { include: "#functionCall" },
        { include: "#identifiers" },
        { include: "#parenExpression" },
        { include: "#punctuationComma" },
        { include: "#punctuationSemicolon" },
        { include: "#punctuationAccessor" }
      ]
    },
    nullLiteral: {
      match: /(?<![\$\.])\bnull\b(?!\$)/dgv,
      name: "constant.language.null.ts"
    },
    numericConstantLiteral: {
      patterns: [
        {
          match: /(?<![\$\.])\bNaN\b(?!\$)/dgv,
          name: "constant.language.nan.ts"
        },
        {
          match: /(?<![\$\.])\bInfinity\b(?!\$)/dgv,
          name: "constant.language.infinity.ts"
        }
      ]
    },
    numericLiteral: {
      patterns: [
        {
          match: /\b(?<!\$)0([Xx])\p{AHex}+\b(?!\$)/dgv,
          name: "constant.numeric.hex.ts"
        },
        {
          match: /\b(?<!\$)0([Bb])[01]+\b(?!\$)/dgv,
          name: "constant.numeric.binary.ts"
        },
        {
          match: /\\b(?<!\$)0([Oo])?[0-7]+\b(?!\$)/dgv,
          name: "constant.numeric.octal.ts"
        },
        {
          captures: {
            "0": { name: "constant.numeric.decimal.ts" },
            "1": { name: "meta.delimiter.decimal.period.ts" },
            "2": { name: "meta.delimiter.decimal.period.ts" },
            "3": { name: "meta.delimiter.decimal.period.ts" },
            "4": { name: "meta.delimiter.decimal.period.ts" },
            "5": { name: "meta.delimiter.decimal.period.ts" },
            "6": { name: "meta.delimiter.decimal.period.ts" }
          },
          match: /(?<!\$)(?:\b[0-9]+(\.)[0-9]+[Ee][\-\+]?[0-9]+\b|\b[0-9]+(\.)[Ee][\-\+]?[0-9]+\b|\B(\.)[0-9]+[Ee][\-\+]?[0-9]+\b|\b[0-9]+[Ee][\-\+]?[0-9]+\b|\b[0-9]+(\.)\B|\B(\.)[0-9]+\b|\b[0-9]+\b(?!\.))(?!\$)/dgv
        }
      ]
    },
    parameterName: {
      patterns: [
        {
          captures: {
            "1": { name: "storage.modifier.ts" },
            "2": { name: "storage.modifier.ts" },
            "3": { name: "keyword.operator.rest.ts" },
            "4": { name: "entity.name.function.ts" },
            "5": { name: "keyword.operator.optional.ts" }
          },
          match: /(?:\p{space}*\b(readonly)\p{space}+)?(?:\p{space}*\b(p(?:ublic|rivate|rotected))\p{space}+)?(\.\.\.)?\p{space}*(?<![\:\=])([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(\??)(?=\p{space}*(=\p{space}*((async\p{space}+)|(function\p{space}*[\(\<])|(function\p{space}+)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*=>)|((<([^\<\>]|<[^\<\>]+>)+>\p{space}*)?\(([^\(\)]|\([^\(\)]*\))*\)(\p{space}*:\p{space}*([^\n])*)?\p{space}*=>)))|(:\p{space}*((<)|(\(\p{space}*((\))|(\.\.\.)|([\$_\p{Alpha}\p{Nd}]+\p{space}*(([\,\:\=\?])|(\)\p{space}*=>))))))))/dgv
        },
        {
          captures: {
            "1": { name: "storage.modifier.ts" },
            "2": { name: "storage.modifier.ts" },
            "3": { name: "keyword.operator.rest.ts" },
            "4": { name: "variable.parameter.ts" },
            "5": { name: "keyword.operator.optional.ts" }
          },
          match: /(?:\p{space}*\b(readonly)\p{space}+)?(?:\p{space}*\b(p(?:ublic|rivate|rotected))\p{space}+)?(\.\.\.)?\p{space}*(?<![\:\=])([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(\??)/dgv
        }
      ]
    },
    parenExpression: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.ts" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.ts" }
      },
      patterns: [
        { include: "#ngExpression" },
        { include: "#punctuationComma" }
      ]
    },
    punctuationAccessor: {
      match: /(?:\?|!?)\./dgv,
      name: "punctuation.accessor.ts"
    },
    punctuationComma: {
      match: /,/dgv,
      name: "punctuation.separator.comma.ts"
    },
    punctuationSemicolon: {
      match: /;/dgv,
      name: "punctuation.terminator.statement.ts"
    },
    qstringDouble: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ts" }
      },
      end: /(")|([^\n\\])(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.ts" },
        "2": { name: "invalid.illegal.newline.ts" }
      },
      name: "string.quoted.double.ts",
      patterns: [
        { include: "#stringCharacterEscape" }
      ]
    },
    qstringSingle: {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ts" }
      },
      end: /(')|([^\n\\])(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.ts" },
        "2": { name: "invalid.illegal.newline.ts" }
      },
      name: "string.quoted.single.ts",
      patterns: [
        { include: "#stringCharacterEscape" }
      ]
    },
    string: {
      patterns: [
        { include: "#qstringSingle" },
        { include: "#qstringDouble" },
        { include: "#templateLiteral" }
      ]
    },
    stringCharacterEscape: {
      match: /\\(x\p{AHex}{2}|[012][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|[^\n]|(?=\n?$))/dgv,
      name: "constant.character.escape.ts"
    },
    templateLiteral: {
      patterns: [
        { include: "#templateLiteralCall" },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)?(`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.ts" },
            "2": { name: "string.template.ts punctuation.definition.string.template.begin.ts" }
          },
          contentName: "string.template.ts",
          end: /`/dgv,
          endCaptures: {
            "0": { name: "string.template.ts punctuation.definition.string.template.end.ts" }
          },
          patterns: [
            { include: "#templateLiteralSubstitutionElement" },
            { include: "#stringCharacterEscape" }
          ]
        }
      ]
    },
    templateLiteralCall: {
      patterns: [
        {
          begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*\??\.\p{space}*)*|(\??\.\p{space}*)?)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?`)/dgv,
          end: /(?=`)/dgv,
          patterns: [
            {
              begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*\??\.\p{space}*)*|(\??\.\p{space}*)?)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))/dgv,
              end: /(?=(<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?`)/dgv,
              patterns: [
                { include: "#support-function-call-identifiers" },
                {
                  match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
                  name: "entity.name.function.tagged-template.ts"
                }
              ]
            },
            { include: "#typeArguments" }
          ]
        },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)?\p{space}*(?=(<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.ts" }
          },
          end: /(?=`)/dgv,
          patterns: [
            { include: "#typeArguments" }
          ]
        }
      ]
    },
    templateLiteralSubstitutionElement: {
      begin: /\$\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.ts" }
      },
      contentName: "meta.embedded.line.ts",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.ts" }
      },
      name: "meta.template.expression.ts",
      patterns: [
        { include: "#ngExpression" }
      ]
    },
    ternaryExpression: {
      begin: /(?!\?\.\p{space}*\P{Nd})(\?)(?!\?)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.ternary.ts" }
      },
      end: /\p{space}*(:)/dgv,
      endCaptures: {
        "1": { name: "keyword.operator.ternary.ts" }
      },
      patterns: [
        { include: "#ngExpression" }
      ]
    },
    thisLiteral: {
      match: /(?<![\$\.])\bthis\b(?!\$)/dgv,
      name: "variable.language.this.ts"
    },
    type: {
      name: "meta.type.ts",
      patterns: [
        { include: "#string" },
        { include: "#numericLiteral" },
        { include: "#typeBuiltinLiterals" },
        { include: "#typeTuple" },
        { include: "#typeObject" },
        { include: "#typeOperators" },
        { include: "#typeFnTypeParameters" },
        { include: "#typeParenOrFunctionParameters" },
        { include: "#typeName" }
      ]
    },
    typeAnnotation: {
      begin: /:/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.type.annotation.ts" }
      },
      end: /(?=(?=\n?$)|[\]\)\,\;\}]|\/\/|")|(?==[^\>])|(?<=[\]\$\)\>_\}\p{Alpha}])\p{space}*(?=\{)/dgv,
      name: "meta.type.annotation.ts",
      patterns: [
        { include: "#type" }
      ]
    },
    typeArguments: {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.typeparameters.begin.ts" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.typeparameters.end.ts" }
      },
      name: "meta.type.parameters.ts",
      patterns: [
        { include: "#typeArgumentsBody" }
      ]
    },
    typeArgumentsBody: {
      patterns: [
        {
          captures: {
            "0": { name: "keyword.operator.type.ts" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(_)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv
        },
        { include: "#type" },
        { include: "#punctuationComma" }
      ]
    },
    typeBuiltinLiterals: {
      match: /(?<![\$\.])\b(this|true|false|undefined|null)\b(?!\$)/dgv,
      name: "support.type.builtin.ts"
    },
    typeFnTypeParameters: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.new.ts" }
          },
          match: /(?<![\$\.])\b(new)\b(?=\p{space}*<)/dgv,
          name: "meta.type.constructor.ts"
        },
        {
          begin: /(?<![\$\.])\b(new)\b\p{space}*(?=\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.new.ts" }
          },
          end: /(?<=\))/dgv,
          name: "meta.type.constructor.ts",
          patterns: [
            { include: "#functionParameters" }
          ]
        },
        {
          begin: /(?<=>)\p{space}*(?=\()/dgv,
          end: /(?<=\))/dgv,
          include: "#typeofOperator",
          name: "meta.type.function.ts",
          patterns: [
            { include: "#functionParameters" }
          ]
        },
        {
          begin: /((?=\(\p{space}*((\))|(\.\.\.)|([\$_\p{Alpha}\p{Nd}]+\p{space}*(([\,\:\=\?])|(\)\p{space}*=>))))))/dgv,
          end: /(?<=\))/dgv,
          name: "meta.type.function.ts",
          patterns: [
            { include: "#functionParameters" }
          ]
        }
      ]
    },
    typeName: {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.type.module.ts" },
            "2": { name: "punctuation.accessor.ts" }
          },
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*([\!\?]?\.)/dgv
        },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          name: "entity.name.type.ts"
        }
      ]
    },
    typeObject: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.ts" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.ts" }
      },
      name: "meta.object.type.ts",
      patterns: [
        { include: "#typeObjectMembers" }
      ]
    },
    typeObjectMembers: {
      patterns: [
        { include: "#typeAnnotation" },
        { include: "#punctuationComma" },
        { include: "#punctuationSemicolon" }
      ]
    },
    typeOperators: {
      patterns: [
        { include: "#typeofOperator" },
        {
          match: /[\&\|]/dgv,
          name: "keyword.operator.type.ts"
        },
        {
          match: /(?<![\$\.])\bkeyof\b(?!\$)/dgv,
          name: "keyword.operator.expression.keyof.ts"
        }
      ]
    },
    typeParenOrFunctionParameters: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.ts" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.ts" }
      },
      name: "meta.type.paren.cover.ts",
      patterns: [
        { include: "#type" },
        { include: "#functionParameters" }
      ]
    },
    typeTuple: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.square.ts" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.ts" }
      },
      name: "meta.type.tuple.ts",
      patterns: [
        { include: "#type" },
        { include: "#punctuationComma" }
      ]
    },
    typeofOperator: {
      match: /(?<![\$\.])\btypeof\b(?!\$)/dgv,
      name: "keyword.operator.expression.typeof.ts"
    },
    undefinedLiteral: {
      match: /(?<![\$\.])\bundefined\b(?!\$)/dgv,
      name: "constant.language.undefined.ts"
    },
    variableInitializer: {
      begin: /(?<![\!\=])(=)(?!=)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.assignment.ts" }
      },
      end: /(?=(?=\n?$)|[\]\)\,\;\}])/dgv,
      patterns: [
        { include: "#ngExpression" }
      ]
    }
  },
  injectionSelector: "L:text.html -comment",
  dependencies: []
};
