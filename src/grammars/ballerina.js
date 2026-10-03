import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "ballerina",
  displayName: "Ballerina",
  scopeName: "source.ballerina",
  patterns: [
    { include: "#statements" }
  ],
  repository: {
    "access-modifier": {
      patterns: [
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(p(?:ublic|rivate))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "storage.modifier.ballerina keyword.other.ballerina"
        }
      ]
    },
    annotationAttachment: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.decorator.ballerina" },
            "2": { name: "support.type.ballerina" },
            "3": { name: "punctuation.decorator.ballerina" },
            "4": { name: "support.type.ballerina" }
          },
          match: /(@)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(:?)\p{space}*((?:[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)?)/dgv
        }
      ]
    },
    annotationDefinition: {
      patterns: [
        {
          begin: /\bannotation\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.ballerina" }
          },
          end: /;/dgv,
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    "array-literal": {
      begin: /\p{space}*(\[)/dgv,
      beginCaptures: {
        "1": { name: "meta.brace.square.ballerina" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.ballerina" }
      },
      name: "meta.array.literal.ballerina",
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    booleans: {
      patterns: [
        {
          match: /\b(true|false)\b/dgv,
          name: "constant.language.boolean.ballerina"
        }
      ]
    },
    butClause: {
      patterns: [
        {
          begin: /=>/dgv,
          beginCaptures: {
            "0": { name: "meta.arrow.ballerina storage.type.function.arrow.ballerina" }
          },
          end: /,|(?=\})/dgv,
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    butExp: {
      patterns: [
        {
          begin: /\bbut\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.ballerina" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina.documentation" }
          },
          patterns: [
            { include: "#butExpBody" },
            { include: "#comment" }
          ]
        }
      ]
    },
    butExpBody: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina.documentation" }
          },
          end: /(?=\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina.documentation" }
          },
          patterns: [
            { include: "#parameter" },
            { include: "#butClause" },
            { include: "#comment" }
          ]
        }
      ]
    },
    call: {
      patterns: [
        {
          match: /'?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?=\()/dgv,
          name: "entity.name.function.ballerina"
        }
      ]
    },
    callableUnitBody: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          end: /(?=\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          patterns: [
            { include: "#workerDef" },
            { include: "#service-decl" },
            { include: "#objectDec" },
            { include: "#function-defn" },
            { include: "#forkStatement" },
            { include: "#code" }
          ]
        }
      ]
    },
    "class-body": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.ballerina" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.ballerina" }
      },
      name: "meta.class.body.ballerina",
      patterns: [
        { include: "#comment" },
        { include: "#mdDocumentation" },
        { include: "#function-defn" },
        { include: "#var-expr" },
        { include: "#variable-initializer" },
        { include: "#access-modifier" },
        { include: "#keywords" },
        {
          begin: /(?<=:)\p{space}*/dgv,
          end: /(?=[\-\]\)\+\,\:\;\}\p{space}]|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\b)/dgv
        },
        { include: "#decl-block" },
        { include: "#expression" },
        { include: "#punctuation-comma" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "class-defn": {
      begin: /(\p{space}+)(class)\b|^class\b(?=\p{space}+|\/[\*\/])/dgv,
      beginCaptures: {
        "0": { name: "storage.type.class.ballerina keyword.other.ballerina" }
      },
      end: /(?<=\})/dgv,
      name: "meta.class.ballerina",
      patterns: [
        { include: "#keywords" },
        {
          captures: {
            "0": { name: "entity.name.type.class.ballerina" }
          },
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv
        },
        { include: "#class-body" }
      ]
    },
    code: {
      patterns: [
        { include: "#booleans" },
        { include: "#matchStatement" },
        { include: "#butExp" },
        { include: "#xml" },
        { include: "#stringTemplate" },
        { include: "#keywords" },
        { include: "#strings" },
        { include: "#comment" },
        { include: "#mdDocumentation" },
        { include: "#annotationAttachment" },
        { include: "#numbers" },
        { include: "#maps" },
        { include: "#paranthesised" },
        { include: "#paranthesisedBracket" },
        { include: "#regex" }
      ]
    },
    comment: {
      patterns: [
        {
          match: /\/\/[^\n]*/dgv,
          name: "comment.ballerina"
        }
      ]
    },
    constrainType: {
      patterns: [
        {
          begin: /</dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.parameters.begin.ballerina" }
          },
          end: />/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.parameters.end.ballerina" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#constrainType" },
            {
              match: /\b([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\b/dgv,
              name: "storage.type.ballerina"
            }
          ]
        }
      ]
    },
    "control-statement": {
      patterns: [
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(return)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.flow.ballerina" }
          },
          end: /(?=[\;\}]|(?=\n?$)|;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\b)/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#for-loop" },
        { include: "#if-statement" },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(else|if)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.conditional.ballerina"
        }
      ]
    },
    "decl-block": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.ballerina" }
      },
      end: /(?=\} external;)|(\})/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.ballerina" }
      },
      name: "meta.block.ballerina",
      patterns: [
        { include: "#statements" },
        { include: "#mdDocumentation" }
      ]
    },
    declaration: {
      patterns: [
        { include: "#import-declaration" },
        { include: "#var-expr" },
        { include: "#typeDefinition" },
        { include: "#function-defn" },
        { include: "#service-decl" },
        { include: "#class-defn" },
        { include: "#enum-decl" },
        { include: "#source" },
        { include: "#keywords" }
      ]
    },
    defaultValue: {
      patterns: [
        {
          begin: /[\:\=]/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.ballerina" }
          },
          end: /(?=[\)\,])/dgv,
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    defaultWithParentheses: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          }
        }
      ]
    },
    documentationBody: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina.documentation" }
          },
          end: /(?=\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina.documentation" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "keyword.other.ballerina.documentation" },
                "2": { name: "keyword.other.ballerina.documentation" },
                "3": { name: "variable.parameter.ballerina.documentation" },
                "4": { name: "keyword.other.ballerina.documentation" }
              },
              match: /([FPRTV])(\{\{)([^\n]*)(\}\})/dgv
            },
            {
              begin: /```/dgv,
              end: /```/dgv,
              name: "comment.block.code.ballerina.documentation"
            },
            {
              begin: /``/dgv,
              end: /``/dgv,
              name: "comment.block.code.ballerina.documentation"
            },
            {
              begin: /`/dgv,
              end: /`/dgv,
              name: "comment.block.code.ballerina.documentation"
            },
            {
              match: /[^\n]/dgv,
              name: "comment.block.ballerina.documentation"
            }
          ]
        }
      ]
    },
    documentationDef: {
      patterns: [
        {
          begin: /\bd(?:ocumentation|eprecated)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.ballerina" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "delimiter.curly" }
          },
          patterns: [
            { include: "#documentationBody" },
            { include: "#comment" }
          ]
        }
      ]
    },
    "enum-decl": {
      begin: /(?:\b(const)\p{space}+)?\b(enum)\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.ballerina" },
        "2": { name: "keyword.other.ballerina" },
        "3": { name: "entity.name.type.enum.ballerina" }
      },
      end: /(?<=\})/dgv,
      name: "meta.enum.declaration.ballerina",
      patterns: [
        { include: "#comment" },
        { include: "#mdDocumentation" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#mdDocumentation" },
            {
              begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
              beginCaptures: {
                "0": { name: "variable.other.enummember.ballerina" }
              },
              end: /(?=[\,\}]|(?=\n?$))/dgv,
              patterns: [
                { include: "#comment" },
                { include: "#variable-initializer" }
              ]
            },
            {
              begin: /(?=(('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\])))/dgv,
              end: /(?=[\,\}]|(?=\n?$))/dgv,
              patterns: [
                { include: "#string" },
                { include: "#array-literal" },
                { include: "#comment" },
                { include: "#variable-initializer" }
              ]
            },
            { include: "#punctuation-comma" }
          ]
        }
      ]
    },
    errorDestructure: {
      patterns: [
        {
          begin: /error/dgv,
          beginCaptures: {
            "0": { name: "storage.type.ballerina" }
          },
          end: /(?==>)/dgv,
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#keywords" },
        { include: "#expressionWithoutIdentifiers" },
        { include: "#identifiers" },
        { include: "#regex" }
      ]
    },
    "expression-operators": {
      patterns: [
        {
          match: /(?:\*|(?<!\()\/|[\-\%\+])=/dgv,
          name: "keyword.operator.assignment.compound.ballerina"
        },
        {
          match: /(?:[\&\^]|<<|>>>??|\|)=/dgv,
          name: "keyword.operator.assignment.compound.bitwise.ballerina"
        },
        {
          match: /<<|>>>?/dgv,
          name: "keyword.operator.bitwise.shift.ballerina"
        },
        {
          match: /[\!\=]==?/dgv,
          name: "keyword.operator.comparison.ballerina"
        },
        {
          match: /<=|>=|<>|[\<\>]/dgv,
          name: "keyword.operator.relational.ballerina"
        },
        {
          captures: {
            "1": { name: "keyword.operator.logical.ballerina" },
            "2": { name: "keyword.operator.assignment.compound.ballerina" },
            "3": { name: "keyword.operator.arithmetic.ballerina" }
          },
          match: /(?<=[\$_\p{Alpha}\p{Nd}])(!)\p{space}*(?:(\/=)|(\/)(?![\*\/]))/dgv
        },
        {
          match: /!|&&|\|\||\?\?/dgv,
          name: "keyword.operator.logical.ballerina"
        },
        {
          match: /[\&\^\|\~]/dgv,
          name: "keyword.operator.bitwise.ballerina"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.ballerina"
        },
        {
          match: /--/dgv,
          name: "keyword.operator.decrement.ballerina"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.increment.ballerina"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.ballerina"
        }
      ]
    },
    expressionWithoutIdentifiers: {
      patterns: [
        { include: "#xml" },
        { include: "#string" },
        { include: "#stringTemplate" },
        { include: "#comment" },
        { include: "#object-literal" },
        { include: "#ternary-expression" },
        { include: "#expression-operators" },
        { include: "#literal" },
        { include: "#paranthesised" },
        { include: "#regex" }
      ]
    },
    "flags-on-off": {
      name: "meta.flags.regexp.ballerina",
      patterns: [
        {
          begin: /(\??)([imsx]*)(-?)([imsx]*)(:)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.other.non-capturing-group-begin.regexp.ballerina" },
            "2": { name: "keyword.other.non-capturing-group.flags-on.regexp.ballerina" },
            "3": { name: "punctuation.other.non-capturing-group.off.regexp.ballerina" },
            "4": { name: "keyword.other.non-capturing-group.flags-off.regexp.ballerina" },
            "5": { name: "punctuation.other.non-capturing-group-end.regexp.ballerina" }
          },
          end: /()/dgv,
          name: "constant.other.flag.regexp.ballerina",
          patterns: [
            { include: "#regexp" },
            { include: "#template-substitution-element" }
          ]
        }
      ]
    },
    "for-loop": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))foreach\p{space}*/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.loop.ballerina" },
        "1": { name: "support.type.primitive.ballerina" }
      },
      end: /(?=\{)/dgv,
      patterns: [
        {
          match: /\bin\b/dgv,
          name: "keyword.other.ballerina"
        },
        { include: "#identifiers" },
        { include: "#comment" },
        { include: "#var-expr" },
        { include: "#expression" }
      ]
    },
    forkBody: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          end: /(?=\})/dgv,
          patterns: [
            { include: "#workerDef" }
          ]
        }
      ]
    },
    forkStatement: {
      patterns: [
        {
          begin: /\bfork\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.ballerina" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          patterns: [
            { include: "#forkBody" }
          ]
        }
      ]
    },
    "function-body": {
      patterns: [
        { include: "#comment" },
        { include: "#functionParameters" },
        { include: "#decl-block" },
        {
          begin: /=>/dgv,
          beginCaptures: {
            "0": { name: "meta.arrow.ballerina storage.type.function.arrow.ballerina" }
          },
          end: /(?=;)|(?=,)|(?=\);)/dgv,
          name: "meta.block.ballerina",
          patterns: [
            { include: "#natural-expr" },
            { include: "#statements" },
            { include: "#punctuation-comma" }
          ]
        },
        {
          match: /\*/dgv,
          name: "keyword.generator.asterisk.ballerina"
        }
      ]
    },
    "function-defn": {
      begin: /(?:(p(?:ublic|rivate))\p{space}+)?(function)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.ballerina" },
        "2": { name: "keyword.other.ballerina" }
      },
      end: /(?<=;)|(?<=\})|(?<=,)|(?=\);)/dgv,
      name: "meta.function.ballerina",
      patterns: [
        {
          match: /\bexternal\b/dgv,
          name: "keyword.ballerina"
        },
        { include: "#stringTemplate" },
        { include: "#annotationAttachment" },
        { include: "#functionReturns" },
        { include: "#functionName" },
        { include: "#functionParameters" },
        { include: "#punctuation-semicolon" },
        { include: "#function-body" },
        { include: "#regex" }
      ]
    },
    "function-parameters-body": {
      patterns: [
        { include: "#comment" },
        { include: "#numbers" },
        { include: "#string" },
        { include: "#annotationAttachment" },
        { include: "#recordLiteral" },
        { include: "#keywords" },
        { include: "#parameter-name" },
        { include: "#array-literal" },
        { include: "#variable-initializer" },
        { include: "#identifiers" },
        { include: "#regex" },
        {
          match: /,/dgv,
          name: "punctuation.separator.parameter.ballerina"
        }
      ]
    },
    functionName: {
      patterns: [
        {
          match: /\bfunction\b/dgv,
          name: "keyword.other.ballerina"
        },
        { include: "#type-primitive" },
        { include: "#self-literal" },
        { include: "#string" },
        {
          captures: {
            "2": { name: "variable.language.this.ballerina" },
            "3": { name: "keyword.other.ballerina" },
            "4": { name: "support.type.primitive.ballerina" },
            "5": { name: "storage.type.ballerina" },
            "6": { name: "meta.definition.function.ballerina entity.name.function.ballerina" }
          },
          match: /\p{space}+(\b(self)|\b(is|new|isolated|null|function|in)\b|(string|int|boolean|float|byte|decimal|json|xml|anydata)\b|\b(readonly|error|map)\b|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))/dgv
        }
      ]
    },
    functionParameters: {
      begin: /[\(\[]/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.parameters.begin.ballerina" }
      },
      end: /[\]\)]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.ballerina" }
      },
      name: "meta.parameters.ballerina",
      patterns: [
        { include: "#function-parameters-body" }
      ]
    },
    functionReturns: {
      begin: /\p{space}*(returns)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.ballerina" }
      },
      end: /(?==>)|(=)|(?=\{)|(\))|(?=;)/dgv,
      endCaptures: {
        "1": { name: "keyword.operator.ballerina" }
      },
      name: "meta.type.function.return.ballerina",
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#numbers" },
        { include: "#keywords" },
        { include: "#type-primitive" },
        {
          captures: {
            "1": { name: "support.type.primitive.ballerina" }
          },
          match: /\p{space}*\b(var)(?=\p{space}+|[\?\[])/dgv
        },
        {
          match: /\|/dgv,
          name: "keyword.operator.ballerina"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.optional.ballerina"
        },
        { include: "#type-annotation" },
        { include: "#type-tuple" },
        { include: "#keywords" },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          name: "variable.other.readwrite.ballerina"
        }
      ]
    },
    functionType: {
      patterns: [
        {
          begin: /\bfunction\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.ballerina" }
          },
          end: /(?=,)|(?=\|)|(?=:)|(?==>)|(?=\))|(?=\])/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#functionTypeParamList" },
            { include: "#functionTypeReturns" }
          ]
        }
      ]
    },
    functionTypeParamList: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "delimiter.parenthesis" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "delimiter.parenthesis" }
          },
          patterns: [
            {
              match: /public/dgv,
              name: "keyword"
            },
            { include: "#annotationAttachment" },
            { include: "#recordLiteral" },
            { include: "#record" },
            { include: "#objectDec" },
            { include: "#functionType" },
            { include: "#constrainType" },
            { include: "#parameterTuple" },
            { include: "#functionTypeType" },
            { include: "#comment" }
          ]
        }
      ]
    },
    functionTypeReturns: {
      patterns: [
        {
          begin: /\breturns\b/dgv,
          beginCaptures: {
            "0": { name: "keyword" }
          },
          end: /(?=,)|\||(?=\])|(?=\))/dgv,
          patterns: [
            { include: "#functionTypeReturnsParameter" },
            { include: "#comment" }
          ]
        }
      ]
    },
    functionTypeReturnsParameter: {
      patterns: [
        {
          begin: /((?=record|object|function)|[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          beginCaptures: {
            "0": { name: "storage.type.ballerina" }
          },
          end: /(?=,)|[\:\|]|(?==>)|(?=\))|(?=\])/dgv,
          patterns: [
            { include: "#record" },
            { include: "#objectDec" },
            { include: "#functionType" },
            { include: "#constrainType" },
            { include: "#defaultValue" },
            { include: "#comment" },
            { include: "#parameterTuple" },
            {
              match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
              name: "default.variable.parameter.ballerina"
            }
          ]
        }
      ]
    },
    functionTypeType: {
      patterns: [
        {
          begin: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          beginCaptures: {
            "0": { name: "storage.type.ballerina" }
          },
          end: /(?=,)|\||(?=\])|(?=\))/dgv
        }
      ]
    },
    identifiers: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.accessor.ballerina" },
            "2": { name: "punctuation.accessor.optional.ballerina" },
            "3": { name: "entity.name.function.ballerina" }
          },
          match: new EmulatedRegExp("(?:(?:(\\.)|(\\?\\.(?!\\p{space}*\\p{Nd})))\\p{space}*)?([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*)(?=\\p{space}*=\\p{space}*((((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((((<\\p{space}*)(?=\\n?$)|((<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))", "dgv", { lazyCompile: true })
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.ballerina" },
            "2": { name: "punctuation.accessor.optional.ballerina" },
            "3": { name: "entity.name.function.ballerina" }
          },
          match: /(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?=\()/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.ballerina" },
            "2": { name: "punctuation.accessor.optional.ballerina" },
            "3": { name: "variable.other.property.ballerina" }
          },
          match: /(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        },
        { include: "#type-primitive" },
        { include: "#self-literal" },
        {
          match: /\b(check|foreach|if|checkpanic)\b/dgv,
          name: "keyword.control.ballerina"
        },
        { include: "#natural-expr" },
        { include: "#call" },
        {
          match: /\b(var)\b/dgv,
          name: "support.type.primitive.ballerina"
        },
        {
          captures: {
            "1": { name: "variable.other.readwrite.ballerina" },
            "3": { name: "punctuation.accessor.ballerina" },
            "4": { name: "entity.name.function.ballerina" },
            "5": { name: "punctuation.definition.parameters.begin.ballerina" },
            "6": { name: "punctuation.definition.parameters.end.ballerina" }
          },
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)((\.)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\()(\)))?/dgv
        },
        {
          match: /(')([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          name: "variable.other.property.ballerina"
        },
        { include: "#type-annotation" }
      ]
    },
    "if-statement": {
      patterns: [
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?=\bif\b\p{space}*(?!\{))/dgv,
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#comment" },
            {
              begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(if)\p{space}*(\()?/dgv,
              beginCaptures: {
                "1": { name: "keyword.control.conditional.ballerina" },
                "2": { name: "meta.brace.round.ballerina" }
              },
              end: /(\))|(?=\{)/dgv,
              endCaptures: {
                "1": { name: "meta.brace.round.ballerina" }
              },
              patterns: [
                { include: "#decl-block" },
                { include: "#keywords" },
                { include: "#identifiers" },
                { include: "#type-primitive" },
                { include: "#xml" },
                { include: "#string" },
                { include: "#stringTemplate" },
                { include: "#comment" },
                { include: "#ternary-expression" },
                { include: "#expression-operators" },
                { include: "#literal" },
                { include: "#paranthesised" },
                { include: "#regex" }
              ]
            },
            {
              begin: /(?<=\))(?=[\=\p{space}])/dgv,
              end: /(?=\{)/dgv,
              patterns: [
                { include: "#literal" },
                { include: "#keywords" }
              ]
            },
            { include: "#decl-block" }
          ]
        }
      ]
    },
    "import-clause": {
      patterns: [
        { include: "#comment" },
        {
          captures: {
            "1": { name: "keyword.control.default.ballerina" },
            "3": { name: "variable.other.readwrite.ballerina meta.import.module.ballerina" },
            "5": { name: "keyword.control.default.ballerina" },
            "6": { name: "variable.other.readwrite.alias.ballerina" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(default)|(\*)|\b([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))/dgv
        },
        {
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          name: "variable.other.readwrite.alias.ballerina"
        }
      ]
    },
    "import-declaration": {
      begin: /\bimport\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.import.ballerina" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.statement.ballerina" }
      },
      name: "meta.import.ballerina",
      patterns: [
        {
          match: /(')([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          name: "variable.other.property.ballerina"
        },
        { include: "#keywords" },
        { include: "#comment" },
        { include: "#import-clause" },
        { include: "#punctuation-accessor" }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(fork|join|while|returns|transaction|transactional|retry|commit|rollback|typeof|enum|wait|match)\b/dgv,
          name: "keyword.control.ballerina"
        },
        {
          match: /\b(return|break|continue|check|checkpanic|panic|trap|from|where)\b/dgv,
          name: "keyword.control.flow.ballerina"
        },
        {
          match: /\b(public|private|external|return|record|object|remote|abstract|client|true|false|fail|import|version)\b/dgv,
          name: "keyword.other.ballerina"
        },
        {
          match: /\b(as|on|function|resource|listener|const|final|is|null|lock|annotation|source|worker|parameter|field|isolated|in)\b/dgv,
          name: "keyword.other.ballerina"
        },
        {
          match: /\b(xmlns|table|key|let|new|select|start|flush|default|do|base16|base64|conflict)\b/dgv,
          name: "keyword.other.ballerina"
        },
        {
          match: /\b(limit|outer|equals|order|by|ascending|descending|class|configurable|variable|module|service|group|collect)\b/dgv,
          name: "keyword.other.ballerina"
        },
        {
          match: /(=>)/dgv,
          name: "meta.arrow.ballerina storage.type.function.arrow.ballerina"
        },
        {
          match: /([\-\!\%\+]|~=|===?|=|!==??|[\&\<\>\|]|\?:|\.\.\.|<=|>=|&&|\|\||~|>>>??)/dgv,
          name: "keyword.operator.ballerina"
        },
        { include: "#types" },
        { include: "#self-literal" },
        { include: "#type-primitive" }
      ]
    },
    literal: {
      patterns: [
        { include: "#booleans" },
        { include: "#numbers" },
        { include: "#strings" },
        { include: "#maps" },
        { include: "#self-literal" },
        { include: "#array-literal" }
      ]
    },
    maps: {
      patterns: [
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    matchBindingPattern: {
      patterns: [
        {
          begin: /var/dgv,
          beginCaptures: {
            "0": { name: "storage.type.ballerina" }
          },
          end: /(?==>)|,/dgv,
          patterns: [
            { include: "#errorDestructure" },
            { include: "#code" },
            {
              match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
              name: "variable.parameter.ballerina"
            }
          ]
        }
      ]
    },
    matchStatement: {
      patterns: [
        {
          begin: /\bmatch\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.ballerina" }
          },
          end: /\}/dgv,
          patterns: [
            { include: "#matchStatementBody" },
            { include: "#comment" },
            { include: "#code" }
          ]
        }
      ]
    },
    matchStatementBody: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina.documentation" }
          },
          end: /(?=\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina.documentation" }
          },
          patterns: [
            { include: "#literal" },
            { include: "#matchBindingPattern" },
            { include: "#matchStatementPatternClause" },
            { include: "#comment" },
            { include: "#code" }
          ]
        }
      ]
    },
    matchStatementPatternClause: {
      patterns: [
        {
          begin: /=>/dgv,
          beginCaptures: {
            "0": { name: "keyword.ballerina" }
          },
          end: /((\})|[\,\;])/dgv,
          patterns: [
            { include: "#callableUnitBody" },
            { include: "#code" }
          ]
        }
      ]
    },
    mdDocumentation: {
      begin: /#/dgv,
      end: /[\n\r]+/dgv,
      name: "comment.mddocs.ballerina",
      patterns: [
        { include: "#mdDocumentationReturnParamDescription" },
        { include: "#mdDocumentationParamDescription" }
      ]
    },
    mdDocumentationParamDescription: {
      patterns: [
        {
          begin: /(\+\p{space}+)('?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\p{space}*-\p{space}+)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.ballerina" },
            "2": { name: "variable.other.readwrite.ballerina" },
            "3": { name: "keyword.operator.ballerina" }
          },
          end: /(?=[^\n\r\#]|# *?\+)/dgv,
          patterns: [
            {
              match: /#[^\n]*/dgv,
              name: "comment.mddocs.paramdesc.ballerina"
            }
          ]
        }
      ]
    },
    mdDocumentationReturnParamDescription: {
      patterns: [
        {
          begin: /(#) *?(\+) *(return) *(-)?([^\n]*)/dgv,
          beginCaptures: {
            "1": { name: "comment.mddocs.ballerina" },
            "2": { name: "keyword.ballerina" },
            "3": { name: "keyword.ballerina" },
            "4": { name: "keyword.ballerina" },
            "5": { name: "comment.mddocs.returnparamdesc.ballerina" }
          },
          end: /(?=[^\n\r\#]|# *?\+)/dgv,
          patterns: [
            {
              match: /#[^\n]*/dgv,
              name: "comment.mddocs.returnparamdesc.ballerina"
            }
          ]
        }
      ]
    },
    multiType: {
      patterns: [
        {
          match: /(?<=\|)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?=\|)/dgv,
          name: "storage.type.ballerina"
        },
        {
          match: /\|/dgv,
          name: "keyword.operator.ballerina"
        }
      ]
    },
    "natural-expr": {
      patterns: [
        {
          begin: /natural/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.ballerina" }
          },
          end: /(?=\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          patterns: [
            { include: "#natural-expr-body" }
          ]
        }
      ]
    },
    "natural-expr-body": {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          contentName: "string.template.ballerina",
          end: /(?=\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          patterns: [
            { include: "#template-substitution-element" },
            { include: "#string-character-escape" },
            { include: "#templateVariable" }
          ]
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /\b(?:0[Xx][A-Fa-f\p{Nd}]+\b|\p{Nd}+(?:\.(?:\p{Nd}+|(?=\n?$)))?)/dgv,
          name: "constant.numeric.decimal.ballerina"
        }
      ]
    },
    "object-literal": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.ballerina" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.ballerina" }
      },
      name: "meta.objectliteral.ballerina",
      patterns: [
        { include: "#object-member" },
        { include: "#punctuation-comma" }
      ]
    },
    "object-member": {
      patterns: [
        { include: "#comment" },
        { include: "#function-defn" },
        { include: "#literal" },
        { include: "#keywords" },
        { include: "#expression" },
        {
          begin: /(?=\[)/dgv,
          end: /(?=:)|((?<=\])(?=\p{space}*[\(\<]))/dgv,
          name: "meta.object.member.ballerina meta.object-literal.key.ballerina",
          patterns: [
            { include: "#comment" }
          ]
        },
        {
          begin: /(?=["'\`])/dgv,
          end: /(?=:)|((?<=["'\`])(?=((\p{space}*[\(\,\<\}])|(\n*\})|(\p{space}+(as)\p{space}+))))/dgv,
          name: "meta.object.member.ballerina meta.object-literal.key.ballerina",
          patterns: [
            { include: "#comment" },
            { include: "#string" }
          ]
        },
        {
          begin: /(?=\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$)))/dgv,
          end: /(?=:)|(?=\p{space}*([\(\,\<\}])|(\p{space}+as\p{space}+))/dgv,
          name: "meta.object.member.ballerina meta.object-literal.key.ballerina",
          patterns: [
            { include: "#comment" },
            { include: "#numbers" }
          ]
        },
        {
          begin: /(?<=[\]"'\`])(?=\p{space}*[\(\<])/dgv,
          end: /(?=[\,\;\}])|(?<=\})/dgv,
          name: "meta.method.declaration.ballerina",
          patterns: [
            { include: "#function-body" }
          ]
        },
        {
          captures: {
            "0": { name: "meta.object-literal.key.ballerina" },
            "1": { name: "constant.numeric.decimal.ballerina" }
          },
          match: /(?![\$_\p{Alpha}])(\p{Nd}+)\p{space}*(?=(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)*:)/dgv,
          name: "meta.object.member.ballerina"
        },
        {
          captures: {
            "0": { name: "meta.object-literal.key.ballerina" },
            "1": { name: "entity.name.function.ballerina" }
          },
          match: new EmulatedRegExp("([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?=(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*:(\\p{space}*/\\*([^\\*]|(\\*[^\\/]))*\\*/)*\\p{space}*((((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((((<\\p{space}*)(?=\\n?$)|((<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))", "dgv", { lazyCompile: true }),
          name: "meta.object.member.ballerina"
        },
        {
          captures: {
            "0": { name: "meta.object-literal.key.ballerina" }
          },
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*(?=(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)*:)/dgv,
          name: "meta.object.member.ballerina"
        },
        {
          begin: /\.\.\./dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.spread.ballerina" }
          },
          end: /(?=[\,\}])/dgv,
          name: "meta.object.member.ballerina",
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          captures: {
            "1": { name: "variable.other.readwrite.ballerina" }
          },
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?=[\,\}]|(?=\n?$)|\/\/|\/\*)/dgv,
          name: "meta.object.member.ballerina"
        },
        {
          captures: {
            "1": { name: "keyword.control.as.ballerina" },
            "2": { name: "storage.modifier.ballerina" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(as)\p{space}+(const)(?=\p{space}*([\,\}]|(?=\n?$)))/dgv,
          name: "meta.object.member.ballerina"
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(as)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.as.ballerina" }
          },
          end: /(?=[\-\]\)\+\,\:\;\>\?\}]|\|\||&&|!==|(?=\n?$)|^|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(as)\p{space}+))/dgv,
          name: "meta.object.member.ballerina"
        },
        {
          begin: /(?=[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*=)/dgv,
          end: /(?=[\,\}]|(?=\n?$)|\/\/|\/\*)/dgv,
          name: "meta.object.member.ballerina",
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    objectDec: {
      patterns: [
        {
          begin: /\bobject\b(?!:)/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.ballerina" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#decl-block" }
          ]
        }
      ]
    },
    objectInitBody: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          end: /(?=\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#code" }
          ]
        }
      ]
    },
    objectInitParameters: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.parameters.begin.ballerina" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.parameters.end.ballerina" }
          },
          patterns: [
            { include: "#code" },
            {
              match: /\b([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\b/dgv,
              name: "variable.parameter.ballerina"
            }
          ]
        }
      ]
    },
    objectMemberFunctionDec: {
      patterns: [
        {
          begin: /\bfunction\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.ballerina" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          patterns: [
            { include: "#functionParameters" },
            {
              match: /\breturns\b/dgv,
              name: "keyword.ballerina"
            },
            { include: "#code" }
          ]
        }
      ]
    },
    parameter: {
      patterns: [
        {
          begin: /((?=record|object|function)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?=\|)|[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          beginCaptures: {
            "0": { name: "storage.type.ballerina" }
          },
          end: /[\,\:\|]|(?==>)|(?=\))|(?=\])/dgv,
          patterns: [
            { include: "#parameterWithDescriptor" },
            { include: "#record" },
            { include: "#objectDec" },
            { include: "#functionType" },
            { include: "#constrainType" },
            { include: "#defaultValue" },
            { include: "#comment" },
            { include: "#parameterTuple" },
            {
              match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
              name: "default.variable.parameter.ballerina"
            }
          ]
        }
      ]
    },
    "parameter-name": {
      patterns: [
        {
          captures: {
            "1": { name: "support.type.primitive.ballerina" }
          },
          match: /\p{space}*\b(var)\p{space}+/dgv
        },
        {
          captures: {
            "2": { name: "keyword.operator.rest.ballerina" },
            "3": { name: "support.type.primitive.ballerina" },
            "4": { name: "keyword.other.ballerina" },
            "5": { name: "constant.language.boolean.ballerina" },
            "6": { name: "keyword.control.flow.ballerina" },
            "7": { name: "storage.type.ballerina" },
            "8": { name: "variable.parameter.ballerina" },
            "9": { name: "variable.parameter.ballerina" },
            "10": { name: "keyword.operator.optional.ballerina" }
          },
          match: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))\p{space}+)?(?:(\.\.\.)\p{space}*)?(?<![\:\=])(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(this)|(string|int|boolean|float|byte|decimal|json|xml|anydata)|\b(is|new|isolated|null|function|in)\b|\b(true|false)\b|\b(check|foreach|if|checkpanic)\b|\b(readonly|error|map)\b|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))\p{space}*(\??)/dgv
        }
      ]
    },
    parameterTuple: {
      patterns: [
        {
          begin: /\[/dgv,
          end: /(?=,)|(?=\|)|(?=:)|(?==>)|(?=\))/dgv,
          patterns: [
            { include: "#record" },
            { include: "#objectDec" },
            { include: "#parameterTupleType" },
            { include: "#parameterTupleEnd" },
            { include: "#comment" }
          ]
        }
      ]
    },
    parameterTupleEnd: {
      patterns: [
        {
          begin: /\]/dgv,
          end: /(?=,)|(?=\|)|(?=:)|(?==>)|(?=\))/dgv,
          patterns: [
            { include: "#defaultWithParentheses" },
            {
              match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
              name: "default.variable.parameter.ballerina"
            }
          ]
        }
      ]
    },
    parameterTupleType: {
      patterns: [
        {
          begin: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          beginCaptures: {
            "0": { name: "storage.type.ballerina" }
          },
          end: /[\,\|]|(?=\])/dgv
        }
      ]
    },
    parameterWithDescriptor: {
      patterns: [
        {
          begin: /&/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.ballerina" }
          },
          end: /(?=,)|(?=\|)|(?=\))/dgv,
          patterns: [
            { include: "#parameter" }
          ]
        }
      ]
    },
    parameters: {
      patterns: [
        {
          match: /\p{space}*(return|break|continue|check|checkpanic|panic|trap|from|where)\b/dgv,
          name: "keyword.control.flow.ballerina"
        },
        {
          match: /\p{space}*(let|select)\b/dgv,
          name: "keyword.other.ballerina"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.parameter.ballerina"
        }
      ]
    },
    paranthesised: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.ballerina" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.ballerina" }
      },
      name: "meta.brace.round.block.ballerina",
      patterns: [
        { include: "#self-literal" },
        { include: "#function-defn" },
        { include: "#decl-block" },
        { include: "#comment" },
        { include: "#string" },
        { include: "#parameters" },
        { include: "#annotationAttachment" },
        { include: "#recordLiteral" },
        { include: "#stringTemplate" },
        { include: "#parameter-name" },
        { include: "#variable-initializer" },
        { include: "#expression" },
        { include: "#regex" }
      ]
    },
    paranthesisedBracket: {
      patterns: [
        {
          begin: /\[/dgv,
          end: /\]/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#code" }
          ]
        }
      ]
    },
    "punctuation-accessor": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.accessor.ballerina" },
            "2": { name: "punctuation.accessor.optional.ballerina" }
          },
          match: /(\.)|(\?\.(?!\p{space}*\p{Nd}))/dgv
        }
      ]
    },
    "punctuation-comma": {
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.ballerina"
        }
      ]
    },
    "punctuation-semicolon": {
      patterns: [
        {
          match: /;/dgv,
          name: "punctuation.terminator.statement.ballerina"
        }
      ]
    },
    record: {
      begin: /\brecord\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.other.ballerina" }
      },
      end: /(?<=\})/dgv,
      name: "meta.record.ballerina",
      patterns: [
        { include: "#recordBody" }
      ]
    },
    recordBody: {
      patterns: [
        { include: "#decl-block" }
      ]
    },
    recordLiteral: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.ballerina" }
          },
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    regex: {
      patterns: [
        {
          begin: /\b(re)(\p{space}*)(`)/dgv,
          beginCaptures: {
            "1": { name: "support.type.primitive.ballerina" },
            "3": { name: "punctuation.definition.regexp.template.begin.ballerina" }
          },
          end: /`/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.regexp.template.end.ballerina" }
          },
          name: "regexp.template.ballerina",
          patterns: [
            { include: "#template-substitution-element" },
            { include: "#regexp" }
          ]
        }
      ]
    },
    "regex-character-class": {
      patterns: [
        {
          match: /\\[DSWdnrstw]|\./dgv,
          name: "keyword.other.character-class.regexp.ballerina"
        },
        {
          match: /\\[^Ppu]/dgv,
          name: "constant.character.escape.backslash.regexp"
        }
      ]
    },
    "regex-unicode-properties-general-category": {
      patterns: [
        {
          match: /(Lu|Ll|Lt|Lm|Lo?|Mn|Mc|Me?|Nd|Nl|No?|Pc|Pd|Ps|Pe|Pi|Pf|Po?|Sm|Sc|Sk|So?|Zs|Zl|Zp?|Cf|Cc|Cn|Co?)/dgv,
          name: "constant.other.unicode-property-general-category.regexp.ballerina"
        }
      ]
    },
    "regex-unicode-property-key": {
      patterns: [
        {
          begin: /([gs]c=)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.unicode-property-key.regexp.ballerina" }
          },
          end: /()/dgv,
          endCaptures: {
            "1": { name: "punctuation.other.unicode-property.end.regexp.ballerina" }
          },
          name: "keyword.other.unicode-property-key.regexp.ballerina",
          patterns: [
            { include: "#regex-unicode-properties-general-category" }
          ]
        }
      ]
    },
    regexp: {
      patterns: [
        {
          match: /[\$\^]/dgv,
          name: "keyword.control.assertion.regexp.ballerina"
        },
        {
          match: /[\*\+\?]|\{(\p{Nd}+,\p{Nd}+|\p{Nd}+,|,\p{Nd}+|\p{Nd}+)\}\??/dgv,
          name: "keyword.operator.quantifier.regexp.ballerina"
        },
        {
          match: /\|/dgv,
          name: "keyword.operator.or.regexp.ballerina"
        },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.group.regexp.ballerina" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.group.regexp.ballerina" }
          },
          name: "meta.group.assertion.regexp.ballerina",
          patterns: [
            { include: "#template-substitution-element" },
            { include: "#regexp" },
            { include: "#flags-on-off" },
            { include: "#unicode-property-escape" }
          ]
        },
        {
          begin: /(\[)(\^)?/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.character-class.start.regexp.ballerina" },
            "2": { name: "keyword.operator.negation.regexp.ballerina" }
          },
          end: /(\])/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.character-class.end.regexp.ballerina" }
          },
          name: "constant.other.character-class.set.regexp.ballerina",
          patterns: [
            {
              captures: {
                "1": { name: "constant.character.numeric.regexp" },
                "2": { name: "constant.character.escape.backslash.regexp" },
                "3": { name: "constant.character.numeric.regexp" },
                "4": { name: "constant.character.escape.backslash.regexp" }
              },
              match: /(?:[^\n]|(\\(?:[0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4}))|(\\[^Ppu]))-(?:[^\]\\]|(\\(?:[0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4}))|(\\[^Ppu]))/dgv,
              name: "constant.other.character-class.range.regexp.ballerina"
            },
            { include: "#regex-character-class" },
            { include: "#unicode-values" },
            { include: "#unicode-property-escape" }
          ]
        },
        { include: "#template-substitution-element" },
        { include: "#regex-character-class" },
        { include: "#unicode-values" },
        { include: "#unicode-property-escape" }
      ]
    },
    "self-literal": {
      patterns: [
        {
          captures: {
            "1": { name: "variable.language.this.ballerina" },
            "2": { name: "punctuation.accessor.ballerina" },
            "3": { name: "entity.name.function.ballerina" }
          },
          match: /\b(self)\b\p{space}*([^\n])\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?=\()/dgv
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))self\b(?!\$)/dgv,
          name: "variable.language.this.ballerina"
        }
      ]
    },
    "service-decl": {
      begin: /\bservice\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.ballerina" }
      },
      end: /(?=;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\b)|(?<=\})|(?<=,)/dgv,
      name: "meta.service.declaration.ballerina",
      patterns: [
        { include: "#class-defn" },
        { include: "#serviceName" },
        { include: "#serviceOn" },
        { include: "#serviceBody" },
        { include: "#objectDec" }
      ]
    },
    serviceBody: {
      patterns: [
        { include: "#comment" },
        { include: "#mdDocumentation" },
        { include: "#documentationDef" },
        { include: "#decl-block" }
      ]
    },
    serviceName: {
      patterns: [
        { include: "#string" },
        {
          match: /(\/([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|"[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*")/dgv,
          name: "entity.service.path.ballerina"
        }
      ]
    },
    serviceOn: {
      patterns: [
        {
          begin: /on/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.ballerina" }
          },
          end: /(?=\{)/dgv,
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    source: {
      patterns: [
        {
          begin: /\b(source)\b\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.ballerina" },
            "2": { name: "variable.other.readwrite.ballerina" }
          },
          end: /(?=,)|(?=;)/dgv
        }
      ]
    },
    statements: {
      patterns: [
        { include: "#stringTemplate" },
        { include: "#declaration" },
        { include: "#control-statement" },
        { include: "#decl-block" },
        { include: "#expression" },
        { include: "#punctuation-semicolon" },
        { include: "#string" },
        { include: "#comment" },
        { include: "#mdDocumentation" },
        { include: "#keywords" },
        { include: "#annotationAttachment" },
        { include: "#regex" }
      ]
    },
    string: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.ballerina" }
          },
          end: /(")|([^\n\\])(?=\n?$)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.ballerina" },
            "2": { name: "invalid.illegal.newline.ballerina" }
          },
          name: "string.quoted.double.ballerina",
          patterns: [
            { include: "#string-character-escape" }
          ]
        }
      ]
    },
    "string-character-escape": {
      patterns: [
        {
          match: /\\(x\p{AHex}{2}|u\p{AHex}{4}|u\{\p{AHex}+\}|[012][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|[^\n]|(?=\n?$))/dgv,
          name: "constant.character.escape.ballerina"
        }
      ]
    },
    stringTemplate: {
      patterns: [
        {
          begin: /((string)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))?(`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.ballerina" },
            "2": { name: "support.type.primitive.ballerina" },
            "4": { name: "punctuation.definition.string.template.begin.ballerina" }
          },
          end: /\\?`/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.template.end.ballerina" }
          },
          name: "string.template.ballerina",
          patterns: [
            { include: "#template-substitution-element" },
            { include: "#string-character-escape" }
          ]
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "string.begin.ballerina" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "string.end.ballerina" }
          },
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.ballerina"
            },
            {
              match: /[^\n]/dgv,
              name: "string"
            }
          ]
        }
      ]
    },
    "template-substitution-element": {
      patterns: [
        {
          begin: /\$\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.template-expression.begin.ballerina" }
          },
          contentName: "meta.embedded.line.ballerina",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.template-expression.end.ballerina" }
          },
          name: "meta.template.expression.ballerina",
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    templateVariable: {
      patterns: [
        {
          begin: /\$\{/dgv,
          beginCaptures: {
            "0": { name: "constant.character.escape.ballerina" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "constant.character.escape.ballerina" }
          },
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    "ternary-expression": {
      begin: /(?!\?\.\p{space}*\P{Nd})(\?)(?!\?)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.ternary.ballerina" }
      },
      end: /\p{space}*/dgv,
      endCaptures: {
        "1": { name: "keyword.operator.ternary.ballerina" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    tupleType: {
      patterns: [
        {
          begin: /\[/dgv,
          end: /(?=[\]\;])/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#constrainType" },
            { include: "#paranthesisedBracket" },
            {
              match: /\b([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\b/dgv,
              name: "storage.type.ballerina"
            }
          ]
        }
      ]
    },
    type: {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#numbers" },
        { include: "#type-primitive" },
        { include: "#type-tuple" }
      ]
    },
    "type-annotation": {
      patterns: [
        {
          begin: /(:)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.ballerina" }
          },
          end: /(?<![\&\:\|])((?=(?=\n?$)|^|[\]\)\,\;\=\>\?\}]|\/\/)|(?==[^\>])|((?<=[\]\$\)\>_\}\p{Alpha}])\p{space}*(?=\{)))(\?)?/dgv,
          name: "meta.type.annotation.ballerina",
          patterns: [
            { include: "#booleans" },
            { include: "#stringTemplate" },
            { include: "#regex" },
            { include: "#self-literal" },
            { include: "#xml" },
            { include: "#call" },
            {
              captures: {
                "1": { name: "keyword.other.ballerina" },
                "2": { name: "constant.language.boolean.ballerina" },
                "3": { name: "keyword.control.ballerina" },
                "4": { name: "storage.type.ballerina" },
                "5": { name: "support.type.primitive.ballerina" },
                "6": { name: "variable.other.readwrite.ballerina" },
                "8": { name: "punctuation.accessor.ballerina" },
                "9": { name: "entity.name.function.ballerina" },
                "10": { name: "punctuation.definition.parameters.begin.ballerina" },
                "11": { name: "punctuation.definition.parameters.end.ballerina" }
              },
              match: /\b(is|new|isolated|null|function|in)\b|\b(true|false)\b|\b(check|foreach|if|checkpanic)\b|\b(readonly|error|map)\b|\b(var)\b|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)((\.)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\()(\)))?/dgv
            },
            {
              match: /\?/dgv,
              name: "keyword.operator.optional.ballerina"
            },
            { include: "#multiType" },
            { include: "#type" },
            { include: "#paranthesised" }
          ]
        }
      ]
    },
    "type-primitive": {
      patterns: [
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(string|int|boolean|float|byte|decimal|json|xml|anydata)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "support.type.primitive.ballerina"
        }
      ]
    },
    "type-tuple": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.square.ballerina" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.ballerina" }
      },
      name: "meta.type.tuple.ballerina",
      patterns: [
        { include: "#self-literal" },
        { include: "#booleans" },
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.rest.ballerina"
        },
        {
          captures: {
            "1": { name: "entity.name.label.ballerina" },
            "2": { name: "keyword.operator.optional.ballerina" },
            "3": { name: "punctuation.separator.label.ballerina" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(\?)?\p{space}*(:)/dgv
        },
        { include: "#identifiers" },
        { include: "#type" },
        { include: "#punctuation-comma" }
      ]
    },
    typeDefinition: {
      patterns: [
        {
          begin: /\b(type)\b\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.ballerina" },
            "2": { name: "entity.name.type.ballerina" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.statement.ballerina" }
          },
          patterns: [
            { include: "#functionParameters" },
            { include: "#functionReturns" },
            { include: "#mdDocumentation" },
            { include: "#record" },
            { include: "#string" },
            { include: "#keywords" },
            { include: "#multiType" },
            { include: "#type-primitive" },
            {
              match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
              name: "variable.other.readwrite.ballerina"
            },
            { include: "#type-annotation" },
            { include: "#typeDescription" },
            { include: "#decl-block" }
          ]
        }
      ]
    },
    typeDescription: {
      patterns: [
        {
          begin: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          end: /(?=;)/dgv,
          patterns: [
            { include: "#numbers" },
            { include: "#decl-block" },
            { include: "#type-primitive" },
            {
              match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
              name: "storage.type.ballerina"
            }
          ]
        }
      ]
    },
    types: {
      patterns: [
        {
          match: /\b(handle|any|future|typedesc)\b/dgv,
          name: "storage.type.ballerina"
        },
        {
          match: /\b(boolean|int|string|float|decimal|byte|json|xml|anydata)\b/dgv,
          name: "support.type.primitive.ballerina"
        },
        {
          match: /\b(map|error|never|readonly|distinct)\b/dgv,
          name: "storage.type.ballerina"
        },
        {
          match: /\b(stream)\b/dgv,
          name: "storage.type.ballerina"
        }
      ]
    },
    "unicode-property-escape": {
      patterns: [
        {
          begin: /(\\[Pp])(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.unicode-property.regexp.ballerina" },
            "2": { name: "punctuation.other.unicode-property.begin.regexp.ballerina" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.other.unicode-property.end.regexp.ballerina" }
          },
          name: "keyword.other.unicode-property.regexp.ballerina",
          patterns: [
            { include: "#regex-unicode-properties-general-category" },
            { include: "#regex-unicode-property-key" }
          ]
        }
      ]
    },
    "unicode-values": {
      patterns: [
        {
          begin: /(\\u)(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.unicode-value.regexp.ballerina" },
            "2": { name: "punctuation.other.unicode-value.begin.regexp.ballerina" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.other.unicode-value.end.regexp.ballerina" }
          },
          name: "keyword.other.unicode-value.ballerina",
          patterns: [
            {
              match: /(\p{AHex}{1,6})/dgv,
              name: "constant.other.unicode-value.regexp.ballerina"
            }
          ]
        }
      ]
    },
    "var-expr": {
      patterns: [
        {
          begin: /(?=\b(var))/dgv,
          beginCaptures: {
            "0": { name: "storage.modifier.ballerina support.type.primitive.ballerina" }
          },
          end: /(?!\b(var))((?=[\;\}]|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\b)|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?=(if)\p{space}+))|((?<!^string|[^\$\._\p{Alpha}\p{Nd}]string|^int|[^\$\._\p{Alpha}\p{Nd}]int)(?=\p{space}*(?=\n?$))))/dgv,
          name: "meta.var.expr.ballerina",
          patterns: [
            {
              begin: /\b(var)(?=\p{space}+|[\:\?\[\|])/dgv,
              beginCaptures: {
                "0": { name: "support.type.primitive.ballerina" }
              },
              end: /(?=\P{space})/dgv
            },
            {
              match: /\|/dgv,
              name: "keyword.operator.type.annotation.ballerina"
            },
            {
              match: /\bin\b/dgv,
              name: "keyword.other.ballerina"
            },
            { include: "#comment" },
            { include: "#string" },
            { include: "#stringTemplate" },
            { include: "#numbers" },
            { include: "#multiType" },
            { include: "#self-literal" },
            { include: "#var-single-variable" },
            { include: "#variable-initializer" },
            { include: "#punctuation-comma" },
            { include: "#type-annotation" },
            { include: "#keywords" },
            { include: "#type-tuple" },
            { include: "#regex" }
          ]
        },
        { include: "#punctuation-comma" },
        {
          begin: /(?=\b(const(?!\p{space}+enum\b)))/dgv,
          end: /(?!\b(const(?!\p{space}+enum\b)))((?=\bannotation\b|[\;\}]|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\b)|((?<!^string|[^\$\._\p{Alpha}\p{Nd}]string|^int|[^\$\._\p{Alpha}\p{Nd}]int)(?=\p{space}*(?=\n?$))))/dgv,
          name: "meta.var.expr.ballerina",
          patterns: [
            {
              begin: /\b(const(?!\p{space}+enum\b))\p{space}+/dgv,
              beginCaptures: {
                "0": { name: "keyword.other.ballerina" }
              },
              end: /(?=\P{space})/dgv
            },
            { include: "#comment" },
            { include: "#string" },
            { include: "#stringTemplate" },
            { include: "#var-single-const" },
            { include: "#variable-initializer" },
            { include: "#punctuation-comma" },
            { include: "#type-annotation" }
          ]
        },
        { include: "#punctuation-comma" },
        {
          begin: /(string|int|boolean|float|byte|decimal|json|xml|anydata)(?=\p{space}+|[\:\?\[\|])/dgv,
          beginCaptures: {
            "0": { name: "support.type.primitive.ballerina" }
          },
          end: /(?!\b(var))((?=[\;\}]|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|service|type|var)\b)|((?<!^string|[^\$\._\p{Alpha}\p{Nd}]string|^int|[^\$\._\p{Alpha}\p{Nd}]int)(?=\p{space}*(?=\n?$))))/dgv,
          name: "meta.var.expr.ballerina",
          patterns: [
            { include: "#xml" },
            {
              begin: /(string|int|boolean|float|byte|decimal|json|xml|anydata)(?=\p{space}+|[\:\?\[\|])/dgv,
              beginCaptures: {
                "0": { name: "support.type.primitive.ballerina" }
              },
              end: /(?=\P{space})/dgv
            },
            {
              match: /\|/dgv,
              name: "keyword.operator.type.annotation.ballerina"
            },
            { include: "#string" },
            { include: "#stringTemplate" },
            { include: "#numbers" },
            { include: "#multiType" },
            { include: "#var-single-variable" },
            { include: "#variable-initializer" },
            { include: "#punctuation-comma" },
            { include: "#type-annotation" },
            { include: "#keywords" },
            { include: "#type-tuple" },
            { include: "#regex" }
          ]
        },
        { include: "#punctuation-comma" }
      ]
    },
    "var-single-const": {
      patterns: [
        { name: "meta.var-single-variable.expr.ballerina" },
        {
          begin: /\b(var)\p{space}*/dgv,
          beginCaptures: {
            "0": { name: "support.type.primitive.ballerina" }
          },
          end: /(?=\P{space})/dgv
        },
        { include: "#types" },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          beginCaptures: {
            "1": { name: "meta.definition.variable.ballerina variable.other.constant.ballerina" }
          },
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))\p{space}+))/dgv
        }
      ]
    },
    "var-single-variable": {
      patterns: [
        {
          begin: /((string|int|boolean|float|byte|decimal|json|xml|anydata)|\b(readonly|error|map)\b|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?=\p{space}+|[\;\>\|])/dgv,
          beginCaptures: {
            "2": { name: "support.type.primitive.ballerina" },
            "3": { name: "storage.type.ballerina" },
            "4": { name: "meta.definition.variable.ballerina variable.other.readwrite.ballerina" }
          },
          end: /(?=(?=\n?$)|^|[\,\;\=\}])/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.statement.ballerina" }
          },
          name: "meta.var-single-variable.expr.ballerina",
          patterns: [
            { include: "#call" },
            { include: "#self-literal" },
            { include: "#if-statement" },
            { include: "#string" },
            { include: "#numbers" },
            { include: "#keywords" }
          ]
        },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}+(!)?/dgv,
          beginCaptures: {
            "1": { name: "meta.definition.variable.ballerina variable.other.readwrite.ballerina" },
            "2": { name: "keyword.operator.definiteassignment.ballerina" }
          },
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))\p{space}+))/dgv,
          name: "meta.var-single-variable.expr.ballerina"
        }
      ]
    },
    "variable-initializer": {
      patterns: [
        {
          begin: /(?<![\!\=])(=)(?![\=\>])(?=\p{space}*\P{space})/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.ballerina" }
          },
          end: /(?=(?=\n?$)|[\]\)\,\;\}])/dgv,
          patterns: [
            {
              match: /(')([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
              name: "variable.other.property.ballerina"
            },
            { include: "#xml" },
            { include: "#function-defn" },
            { include: "#expression" },
            { include: "#punctuation-accessor" },
            { include: "#regex" }
          ]
        },
        {
          begin: /(?<![\!\=])(=)(?![\=\>])/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.ballerina" }
          },
          end: /(?=[\]\)\,\;\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))\p{space}+))|(?=^\p{space}*(?=\n?$))|(?<=\P{space})(?<!=)(?=\p{space}*(?=\n?$))/dgv,
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    variableDef: {
      patterns: [
        {
          begin: /(?!\+)[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*[\t ]|(?=\()/dgv,
          beginCaptures: {
            "0": { name: "storage.type.ballerina" }
          },
          end: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(?=,)|(?=;)|\.\.\./dgv,
          patterns: [
            { include: "#tupleType" },
            { include: "#constrainType" },
            { include: "#comment" }
          ]
        }
      ]
    },
    variableDefInline: {
      patterns: [
        {
          begin: /(?=record)|(?=object)/dgv,
          end: /(?=;)/dgv,
          patterns: [
            { include: "#record" },
            { include: "#objectDec" }
          ]
        }
      ]
    },
    workerBody: {
      patterns: [
        {
          begin: /\{/dgv,
          end: /(?=\})/dgv,
          patterns: [
            { include: "#code" }
          ]
        }
      ]
    },
    workerDef: {
      patterns: [
        {
          begin: /\bworker\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.ballerina" }
          },
          end: /\}/dgv,
          patterns: [
            { include: "#functionReturns" },
            { include: "#workerBody" }
          ]
        }
      ]
    },
    xml: {
      patterns: [
        {
          begin: /\b(xml)(\p{space}*)(`)/dgv,
          beginCaptures: {
            "1": { name: "support.type.primitive.ballerina" },
            "3": { name: "punctuation.definition.string.template.begin.ballerina" }
          },
          end: /`/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.template.end.ballerina" }
          },
          name: "string.template.ballerina",
          patterns: [
            { include: "#xmlTag" },
            { include: "#xmlComment" },
            { include: "#templateVariable" },
            {
              match: /[^\n]/dgv,
              name: "string"
            }
          ]
        }
      ]
    },
    xmlComment: {
      patterns: [
        {
          begin: /<!--/dgv,
          beginCaptures: {
            "0": { name: "comment.block.xml.ballerina" }
          },
          end: /-->/dgv,
          endCaptures: {
            "0": { name: "comment.block.xml.ballerina" }
          },
          name: "comment.block.xml.ballerina"
        }
      ]
    },
    xmlDoubleQuotedString: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "string.begin.ballerina" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "string.end.ballerina" }
          },
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.ballerina"
            },
            {
              match: /[^\n]/dgv,
              name: "string"
            }
          ]
        }
      ]
    },
    xmlSingleQuotedString: {
      patterns: [
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "string.begin.ballerina" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "string.end.ballerina" }
          },
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.ballerina"
            },
            {
              match: /[^\n]/dgv,
              name: "string"
            }
          ]
        }
      ]
    },
    xmlTag: {
      patterns: [
        {
          begin: /(<\/?\??)\p{space}*([\-0-9A-Z_a-z]+)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.xml.ballerina" },
            "2": { name: "entity.name.tag.xml.ballerina" }
          },
          end: /\??\/?>/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.xml.ballerina" }
          },
          patterns: [
            { include: "#xmlSingleQuotedString" },
            { include: "#xmlDoubleQuotedString" },
            {
              match: /xmlns/dgv,
              name: "keyword.other.ballerina"
            },
            {
              match: /([\-0-9A-Za-z]+)/dgv,
              name: "entity.other.attribute-name.xml.ballerina"
            }
          ]
        }
      ]
    }
  },
  dependencies: []
};
