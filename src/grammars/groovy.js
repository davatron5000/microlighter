export default {
  name: "groovy",
  displayName: "Groovy",
  scopeName: "source.groovy",
  patterns: [
    {
      captures: {
        "1": { name: "punctuation.definition.comment.groovy" }
      },
      match: /^(#!)[^\n]+(?=\n?$)\n/dgv,
      name: "comment.line.hashbang.groovy"
    },
    {
      captures: {
        "1": { name: "keyword.other.package.groovy" },
        "2": { name: "storage.modifier.package.groovy" },
        "3": { name: "punctuation.terminator.groovy" }
      },
      match: /^\p{space}*(package)\b(?:\p{space}*([^ \$\;]+)\p{space}*(;)?)?/dgv,
      name: "meta.package.groovy"
    },
    {
      begin: /(import static)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.import.static.groovy" }
      },
      captures: {
        "1": { name: "keyword.other.import.groovy" },
        "2": { name: "storage.modifier.import.groovy" },
        "3": { name: "punctuation.terminator.groovy" }
      },
      contentName: "storage.modifier.import.groovy",
      end: /\p{space}*(?:(?=\n?$)|(?=%>)(;))/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.groovy" }
      },
      name: "meta.import.groovy",
      patterns: [
        {
          match: /\./dgv,
          name: "punctuation.separator.groovy"
        },
        {
          match: /\p{space}/dgv,
          name: "invalid.illegal.character_not_allowed_here.groovy"
        }
      ]
    },
    {
      begin: /(import)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.import.groovy" }
      },
      captures: {
        "1": { name: "keyword.other.import.groovy" },
        "2": { name: "storage.modifier.import.groovy" },
        "3": { name: "punctuation.terminator.groovy" }
      },
      contentName: "storage.modifier.import.groovy",
      end: /\p{space}*(?:(?=\n?$)|(?=%>)|(;))/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.groovy" }
      },
      name: "meta.import.groovy",
      patterns: [
        {
          match: /\./dgv,
          name: "punctuation.separator.groovy"
        },
        {
          match: /\p{space}/dgv,
          name: "invalid.illegal.character_not_allowed_here.groovy"
        }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.other.import.groovy" },
        "2": { name: "keyword.other.import.static.groovy" },
        "3": { name: "storage.modifier.import.groovy" },
        "4": { name: "punctuation.terminator.groovy" }
      },
      match: /^\p{space}*(import)\p{space}+(static)\p{space}+\b(?:\p{space}*([^ \$\;]+)\p{space}*(;)?)?/dgv,
      name: "meta.import.groovy"
    },
    { include: "#groovy" }
  ],
  repository: {
    annotations: {
      patterns: [
        {
          begin: /(?<!\.)(@[^ \(]+)(\()/dgv,
          beginCaptures: {
            "1": { name: "storage.type.annotation.groovy" },
            "2": { name: "punctuation.definition.annotation-arguments.begin.groovy" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.annotation-arguments.end.groovy" }
          },
          name: "meta.declaration.annotation.groovy",
          patterns: [
            {
              captures: {
                "1": { name: "constant.other.key.groovy" },
                "2": { name: "keyword.operator.assignment.groovy" }
              },
              match: /([\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(=)/dgv
            },
            { include: "#values" },
            {
              match: /,/dgv,
              name: "punctuation.definition.seperator.groovy"
            }
          ]
        },
        {
          match: /(?<!\.)@\P{space}+/dgv,
          name: "storage.type.annotation.groovy"
        }
      ]
    },
    "anonymous-classes-and-new": {
      begin: /\bnew\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.new.groovy" }
      },
      end: /(?<=[\]\)])(?!\p{space}*\{)|(?<=\})|(?=;)|(?=\n?$)/dgv,
      patterns: [
        {
          begin: /([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\[)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.groovy" }
          },
          end: /\}|(?=\p{space}*[\)\,\;])|(?=\n?$)/dgv,
          patterns: [
            {
              begin: /\[/dgv,
              end: /\]/dgv,
              patterns: [
                { include: "#groovy" }
              ]
            },
            {
              begin: /\{/dgv,
              end: /(?=\})/dgv,
              patterns: [
                { include: "#groovy" }
              ]
            }
          ]
        },
        {
          begin: /(?=[\p{L}\p{M}\p{N}\p{Pc}][^\n]*\(?)/dgv,
          end: /(?<=\))|(?=\n?$)/dgv,
          patterns: [
            { include: "#object-types" },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "1": { name: "storage.type.groovy" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "#groovy" }
              ]
            }
          ]
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.inner-class.groovy",
          patterns: [
            { include: "#class-body" }
          ]
        }
      ]
    },
    braces: {
      begin: /\{/dgv,
      end: /\}/dgv,
      patterns: [
        { include: "#groovy-code" }
      ]
    },
    class: {
      begin: /(?=[\p{L}\p{M}\p{N}\p{Pc}]?[\p{L}\p{M}\p{N}\p{Pc}\p{space}]*(?:class|@?interface|enum)\p{space}+[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.class.end.groovy" }
      },
      name: "meta.definition.class.groovy",
      patterns: [
        { include: "#storage-modifiers" },
        { include: "#comments" },
        {
          captures: {
            "1": { name: "storage.modifier.groovy" },
            "2": { name: "entity.name.type.class.groovy" }
          },
          match: /(class|@?interface|enum)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          name: "meta.class.identifier.groovy"
        },
        {
          begin: /extends/dgv,
          beginCaptures: {
            "0": { name: "storage.modifier.extends.groovy" }
          },
          end: /(?=\{|implements)/dgv,
          name: "meta.definition.class.inherited.classes.groovy",
          patterns: [
            { include: "#object-types-inherited" },
            { include: "#comments" }
          ]
        },
        {
          begin: /(implements)\p{space}/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.implements.groovy" }
          },
          end: /(?=\p{space}*extends|\{)/dgv,
          name: "meta.definition.class.implemented.interfaces.groovy",
          patterns: [
            { include: "#object-types-inherited" },
            { include: "#comments" }
          ]
        },
        {
          begin: /\{/dgv,
          end: /(?=\})/dgv,
          name: "meta.class.body.groovy",
          patterns: [
            { include: "#class-body" }
          ]
        }
      ]
    },
    "class-body": {
      patterns: [
        { include: "#enum-values" },
        { include: "#constructors" },
        { include: "#groovy" }
      ]
    },
    closures: {
      begin: /\{(?=[^\n]*?->)/dgv,
      end: /\}/dgv,
      patterns: [
        {
          begin: /(?<=\{)(?=[^\}]*?->)/dgv,
          end: /->/dgv,
          endCaptures: {
            "0": { name: "keyword.operator.groovy" }
          },
          patterns: [
            {
              begin: /(?!->)/dgv,
              end: /(?=->)/dgv,
              name: "meta.closure.parameters.groovy",
              patterns: [
                {
                  begin: /(?!,|->)/dgv,
                  end: /(?=,|->)/dgv,
                  name: "meta.closure.parameter.groovy",
                  patterns: [
                    {
                      begin: /=/dgv,
                      beginCaptures: {
                        "0": { name: "keyword.operator.assignment.groovy" }
                      },
                      end: /(?=,|->)/dgv,
                      name: "meta.parameter.default.groovy",
                      patterns: [
                        { include: "#groovy-code" }
                      ]
                    },
                    { include: "#parameters" }
                  ]
                }
              ]
            }
          ]
        },
        {
          begin: /(?=[^\}])/dgv,
          end: /(?=\})/dgv,
          patterns: [
            { include: "#groovy-code" }
          ]
        }
      ]
    },
    "comment-block": {
      begin: /\/\*/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.groovy" }
      },
      end: /\*\//dgv,
      name: "comment.block.groovy"
    },
    comments: {
      patterns: [
        {
          captures: {
            "0": { name: "punctuation.definition.comment.groovy" }
          },
          match: /\/\*\*\//dgv,
          name: "comment.block.empty.groovy"
        },
        { include: "text.html.javadoc" },
        { include: "#comment-block" },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.groovy" }
          },
          match: /(\/\/)[^\n]*(?=\n?$)\n?/dgv,
          name: "comment.line.double-slash.groovy"
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b([A-Z][0-9A-Z_]+)\b/dgv,
          name: "constant.other.groovy"
        },
        {
          match: /\b(true|false|null)\b/dgv,
          name: "constant.language.groovy"
        }
      ]
    },
    constructors: {
      applyEndPatternLast: 1,
      begin: /(?<=;|^)(?=\p{space}*(?:(?:private|protected|public|native|synchronized|abstract|threadsafe|transient|static|final)\p{space}+)*[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\()/dgv,
      end: /\}/dgv,
      patterns: [
        { include: "#method-content" }
      ]
    },
    "enum-values": {
      patterns: [
        {
          begin: /(?<=;|^)\p{space}*\b([0-9A-Z_]+)(?=\p{space}*(?:[\(\,\;\}]|(?=\n?$)))/dgv,
          beginCaptures: {
            "1": { name: "constant.enum.name.groovy" }
          },
          end: /[\,\;]|(?=\})|^(?!\p{space}*[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*(?:,|(?=\n?$)))/dgv,
          patterns: [
            {
              begin: /\(/dgv,
              end: /\)/dgv,
              name: "meta.enum.value.groovy",
              patterns: [
                {
                  match: /,/dgv,
                  name: "punctuation.definition.seperator.parameter.groovy"
                },
                { include: "#groovy-code" }
              ]
            }
          ]
        }
      ]
    },
    groovy: {
      patterns: [
        { include: "#comments" },
        { include: "#class" },
        { include: "#variables" },
        { include: "#methods" },
        { include: "#annotations" },
        { include: "#groovy-code" }
      ]
    },
    "groovy-code": {
      patterns: [
        { include: "#groovy-code-minus-map-keys" },
        { include: "#map-keys" }
      ]
    },
    "groovy-code-minus-map-keys": {
      patterns: [
        { include: "#comments" },
        { include: "#annotations" },
        { include: "#support-functions" },
        { include: "#keyword-language" },
        { include: "#values" },
        { include: "#anonymous-classes-and-new" },
        { include: "#keyword-operator" },
        { include: "#types" },
        { include: "#storage-modifiers" },
        { include: "#parens" },
        { include: "#closures" },
        { include: "#braces" }
      ]
    },
    keyword: {
      patterns: [
        { include: "#keyword-operator" },
        { include: "#keyword-language" }
      ]
    },
    "keyword-language": {
      patterns: [
        {
          match: /\b(try|catch|finally|throw)\b/dgv,
          name: "keyword.control.exception.groovy"
        },
        {
          match: /\b((?<!\.)(?:return|break|continue|default|do|while|for|switch|if|else))\b/dgv,
          name: "keyword.control.groovy"
        },
        {
          begin: /\bcase\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.groovy" }
          },
          end: /:/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.case-terminator.groovy" }
          },
          name: "meta.case.groovy",
          patterns: [
            { include: "#groovy-code-minus-map-keys" }
          ]
        },
        {
          begin: /\b(assert)\p{space}/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.assert.groovy" }
          },
          end: /(?=\n?$)|[\;\}]/dgv,
          name: "meta.declaration.assertion.groovy",
          patterns: [
            {
              match: /:/dgv,
              name: "keyword.operator.assert.expression-seperator.groovy"
            },
            { include: "#groovy-code-minus-map-keys" }
          ]
        },
        {
          match: /\b(throws)\b/dgv,
          name: "keyword.other.throws.groovy"
        }
      ]
    },
    "keyword-operator": {
      patterns: [
        {
          match: /\b(as)\b/dgv,
          name: "keyword.operator.as.groovy"
        },
        {
          match: /\b(in)\b/dgv,
          name: "keyword.operator.in.groovy"
        },
        {
          match: /\?:/dgv,
          name: "keyword.operator.elvis.groovy"
        },
        {
          match: /\*:/dgv,
          name: "keyword.operator.spreadmap.groovy"
        },
        {
          match: /\.\./dgv,
          name: "keyword.operator.range.groovy"
        },
        {
          match: /->/dgv,
          name: "keyword.operator.arrow.groovy"
        },
        {
          match: /<</dgv,
          name: "keyword.operator.leftshift.groovy"
        },
        {
          match: /(?<=\P{space})\.(?=\P{space})/dgv,
          name: "keyword.operator.navigation.groovy"
        },
        {
          match: /(?<=\P{space})\?\.(?=\P{space})/dgv,
          name: "keyword.operator.safe-navigation.groovy"
        },
        {
          begin: /\?/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.ternary.groovy" }
          },
          end: /(?=(?=\n?$)|[\]\)\}])/dgv,
          name: "meta.evaluation.ternary.groovy",
          patterns: [
            {
              match: /:/dgv,
              name: "keyword.operator.ternary.expression-seperator.groovy"
            },
            { include: "#groovy-code-minus-map-keys" }
          ]
        },
        {
          match: /==~/dgv,
          name: "keyword.operator.match.groovy"
        },
        {
          match: /=~/dgv,
          name: "keyword.operator.find.groovy"
        },
        {
          match: /\b(instanceof)\b/dgv,
          name: "keyword.operator.instanceof.groovy"
        },
        {
          match: /(===?|!=|<=|>=|<=>|<>|[\<\>]|<<)/dgv,
          name: "keyword.operator.comparison.groovy"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.groovy"
        },
        {
          match: /(--|\+\+)/dgv,
          name: "keyword.operator.increment-decrement.groovy"
        },
        {
          match: /([\-\%\*\+\/])/dgv,
          name: "keyword.operator.arithmetic.groovy"
        },
        {
          match: /(!|&&|\|\|)/dgv,
          name: "keyword.operator.logical.groovy"
        }
      ]
    },
    "language-variables": {
      patterns: [
        {
          match: /\b(this|super)\b/dgv,
          name: "variable.language.groovy"
        }
      ]
    },
    "map-keys": {
      patterns: [
        {
          captures: {
            "1": { name: "constant.other.key.groovy" },
            "2": { name: "punctuation.definition.seperator.key-value.groovy" }
          },
          match: /([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)/dgv
        }
      ]
    },
    "method-call": {
      begin: /([\$\p{L}\p{M}\p{N}\p{Pc}]+)(\()/dgv,
      beginCaptures: {
        "1": { name: "meta.method.groovy" },
        "2": { name: "punctuation.definition.method-parameters.begin.groovy" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.method-parameters.end.groovy" }
      },
      name: "meta.method-call.groovy",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.definition.seperator.parameter.groovy"
        },
        { include: "#groovy-code" }
      ]
    },
    "method-content": {
      patterns: [
        {
          match: /\p{space}/dgv
        },
        { include: "#annotations" },
        {
          begin: /(?=[\<\p{L}\p{M}\p{N}\p{Pc}][^\(]*\p{space}+[\$\<\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*\()/dgv,
          end: /(?=[\$\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*\()/dgv,
          name: "meta.method.return-type.java",
          patterns: [
            { include: "#storage-modifiers" },
            { include: "#types" }
          ]
        },
        {
          begin: /([\$\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*\(/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.java" }
          },
          end: /\)/dgv,
          name: "meta.definition.method.signature.java",
          patterns: [
            {
              begin: /(?=[^\)])/dgv,
              end: /(?=\))/dgv,
              name: "meta.method.parameters.groovy",
              patterns: [
                {
                  begin: /(?=[^\)\,])/dgv,
                  end: /(?=[\)\,])/dgv,
                  name: "meta.method.parameter.groovy",
                  patterns: [
                    {
                      match: /,/dgv,
                      name: "punctuation.definition.separator.groovy"
                    },
                    {
                      begin: /=/dgv,
                      beginCaptures: {
                        "0": { name: "keyword.operator.assignment.groovy" }
                      },
                      end: /(?=[\)\,])/dgv,
                      name: "meta.parameter.default.groovy",
                      patterns: [
                        { include: "#groovy-code" }
                      ]
                    },
                    { include: "#parameters" }
                  ]
                }
              ]
            }
          ]
        },
        {
          begin: /(?=<)/dgv,
          end: /(?=\p{space})/dgv,
          name: "meta.method.paramerised-type.groovy",
          patterns: [
            {
              begin: /</dgv,
              end: />/dgv,
              name: "storage.type.parameters.groovy",
              patterns: [
                { include: "#types" },
                {
                  match: /,/dgv,
                  name: "punctuation.definition.seperator.groovy"
                }
              ]
            }
          ]
        },
        {
          begin: /throws/dgv,
          beginCaptures: {
            "0": { name: "storage.modifier.groovy" }
          },
          end: /(?=[\;\{])|^(?=\p{space}*(?:[^\{\p{space}]|(?=\n?$)))/dgv,
          name: "meta.throwables.groovy",
          patterns: [
            { include: "#object-types" }
          ]
        },
        {
          begin: /\{/dgv,
          end: /(?=\})/dgv,
          name: "meta.method.body.java",
          patterns: [
            { include: "#groovy-code" }
          ]
        }
      ]
    },
    methods: {
      applyEndPatternLast: 1,
      begin: /(?<=;|^|\{)(?=\p{space}*(?:(?:private|protected|public|native|synchronized|abstract|threadsafe|transient|static|final)|def|(?:(?:void|boolean|byte|char|short|int|float|long|double)|@?(?:[A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*)[\]\[]*(?:<[^\n]*>)?)\p{space}+([^\=]+\p{space}+)?[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*\()/dgv,
      end: /\}|(?=[^\{])/dgv,
      name: "meta.definition.method.groovy",
      patterns: [
        { include: "#method-content" }
      ]
    },
    nest_curly: {
      begin: /\{/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.groovy" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#nest_curly" }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /((0([Xx])\p{AHex}*)|([\-\+])?\b(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)([DFLUdfglu]|UL|ul)?\b/dgv,
          name: "constant.numeric.groovy"
        }
      ]
    },
    "object-types": {
      patterns: [
        {
          begin: /\b((?:[a-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*(?:[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*[a-z]+[\p{L}\p{M}\p{N}\p{Pc}]*|UR[IL]))</dgv,
          end: /[\>[^\]\,\<\?\[\p{L}\p{M}\p{N}\p{Pc}\p{space}]]/dgv,
          name: "storage.type.generic.groovy",
          patterns: [
            { include: "#object-types" },
            {
              begin: /</dgv,
              end: /[\>[^\]\,\<\[\p{L}\p{M}\p{N}\p{Pc}\p{space}]]/dgv,
              name: "storage.type.generic.groovy"
            }
          ]
        },
        {
          begin: /\b((?:[a-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*[a-z]+[\p{L}\p{M}\p{N}\p{Pc}]*)(?=\[)/dgv,
          end: /(?=[^\]\p{space}])/dgv,
          name: "storage.type.object.array.groovy",
          patterns: [
            {
              begin: /\[/dgv,
              end: /\]/dgv,
              patterns: [
                { include: "#groovy" }
              ]
            }
          ]
        },
        {
          match: /\b(?:[A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*(?:[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*[a-z]+[\p{L}\p{M}\p{N}\p{Pc}]*|UR[IL])\b/dgv,
          name: "storage.type.groovy"
        }
      ]
    },
    "object-types-inherited": {
      patterns: [
        {
          begin: /\b((?:[A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*[a-z]+[\p{L}\p{M}\p{N}\p{Pc}]*)</dgv,
          end: /[\>[^\]\,\<\?\[\p{L}\p{M}\p{N}\p{Pc}\p{space}]]/dgv,
          name: "entity.other.inherited-class.groovy",
          patterns: [
            { include: "#object-types-inherited" },
            {
              begin: /</dgv,
              end: /[\>[^\]\,\<\[\p{L}\p{M}\p{N}\p{Pc}\p{space}]]/dgv,
              name: "storage.type.generic.groovy"
            }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.operator.dereference.groovy" }
          },
          match: /\b(?:[A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*(\.))*[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*[a-z]+[\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
          name: "entity.other.inherited-class.groovy"
        }
      ]
    },
    parameters: {
      patterns: [
        { include: "#annotations" },
        { include: "#storage-modifiers" },
        { include: "#types" },
        {
          match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
          name: "variable.parameter.method.groovy"
        }
      ]
    },
    parens: {
      begin: /\(/dgv,
      end: /\)/dgv,
      patterns: [
        { include: "#groovy-code" }
      ]
    },
    "primitive-arrays": {
      patterns: [
        {
          match: /\b(?:void|boolean|byte|char|short|int|float|long|double)(\[\])*\b/dgv,
          name: "storage.type.primitive.array.groovy"
        }
      ]
    },
    "primitive-types": {
      patterns: [
        {
          match: /\b(?:void|boolean|byte|char|short|int|float|long|double)\b/dgv,
          name: "storage.type.primitive.groovy"
        }
      ]
    },
    regexp: {
      patterns: [
        {
          begin: /\/(?=[^\/]+\/([^\>]|(?=\n?$)))/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.regexp.begin.groovy" }
          },
          end: /\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.regexp.end.groovy" }
          },
          name: "string.regexp.groovy",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.groovy"
            }
          ]
        },
        {
          begin: /~"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.regexp.begin.groovy" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.regexp.end.groovy" }
          },
          name: "string.regexp.compiled.groovy",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.groovy"
            }
          ]
        }
      ]
    },
    "storage-modifiers": {
      patterns: [
        {
          match: /\b(p(?:rivate|rotected|ublic))\b/dgv,
          name: "storage.modifier.access-control.groovy"
        },
        {
          match: /\b(static)\b/dgv,
          name: "storage.modifier.static.groovy"
        },
        {
          match: /\b(final)\b/dgv,
          name: "storage.modifier.final.groovy"
        },
        {
          match: /\b(native|synchronized|abstract|threadsafe|transient)\b/dgv,
          name: "storage.modifier.other.groovy"
        }
      ]
    },
    "string-quoted-double": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.groovy" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.groovy" }
      },
      name: "string.quoted.double.groovy",
      patterns: [
        { include: "#string-quoted-double-contents" }
      ]
    },
    "string-quoted-double-contents": {
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.groovy"
        },
        {
          applyEndPatternLast: 1,
          begin: /\$[\p{L}\p{M}\p{N}\p{Pc}]/dgv,
          end: /(?=[^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "variable.other.interpolated.groovy",
          patterns: [
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]/dgv,
              name: "variable.other.interpolated.groovy"
            },
            {
              match: /\./dgv,
              name: "keyword.other.dereference.groovy"
            }
          ]
        },
        {
          begin: /\$\{/dgv,
          captures: {
            "0": { name: "punctuation.section.embedded.groovy" }
          },
          end: /\}/dgv,
          name: "source.groovy.embedded.source",
          patterns: [
            { include: "#nest_curly" }
          ]
        }
      ]
    },
    "string-quoted-double-multiline": {
      begin: /"""/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.groovy" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.groovy" }
      },
      name: "string.quoted.double.multiline.groovy",
      patterns: [
        { include: "#string-quoted-double-contents" }
      ]
    },
    "string-quoted-single": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.groovy" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.groovy" }
      },
      name: "string.quoted.single.groovy",
      patterns: [
        { include: "#string-quoted-single-contents" }
      ]
    },
    "string-quoted-single-contents": {
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.groovy"
        }
      ]
    },
    "string-quoted-single-multiline": {
      begin: /'''/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.groovy" }
      },
      end: /'''/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.groovy" }
      },
      name: "string.quoted.single.multiline.groovy",
      patterns: [
        { include: "#string-quoted-single-contents" }
      ]
    },
    strings: {
      patterns: [
        { include: "#string-quoted-double-multiline" },
        { include: "#string-quoted-single-multiline" },
        { include: "#string-quoted-double" },
        { include: "#string-quoted-single" },
        { include: "#regexp" }
      ]
    },
    structures: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.structure.begin.groovy" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.structure.end.groovy" }
      },
      name: "meta.structure.groovy",
      patterns: [
        { include: "#groovy-code" },
        {
          match: /,/dgv,
          name: "punctuation.definition.separator.groovy"
        }
      ]
    },
    "support-functions": {
      patterns: [
        {
          match: /\b(?:sprintf|print(?:f|ln)?)\b/dgv,
          name: "support.function.print.groovy"
        },
        {
          match: /\b(?:shouldFail|fail(?:NotEquals)?|ass(?:ume|ert(?:S(?:cript|ame)|N(?:ot(?:Same|Null)|ull)|Contains|T(?:hat|oString|rue)|Inspect|Equals|False|Length|ArrayEquals)))\b/dgv,
          name: "support.function.testing.groovy"
        }
      ]
    },
    types: {
      patterns: [
        {
          match: /\b(def)\b/dgv,
          name: "storage.type.def.groovy"
        },
        { include: "#primitive-types" },
        { include: "#primitive-arrays" },
        { include: "#object-types" }
      ]
    },
    values: {
      patterns: [
        { include: "#language-variables" },
        { include: "#strings" },
        { include: "#numbers" },
        { include: "#constants" },
        { include: "#types" },
        { include: "#structures" },
        { include: "#method-call" }
      ]
    },
    variables: {
      applyEndPatternLast: 1,
      patterns: [
        {
          begin: /(?=(?:(?:private|protected|public|native|synchronized|abstract|threadsafe|transient|static|final)|def|(?:void|boolean|byte|char|short|int|float|long|double)|(?:[a-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+[\]\,\<\>\[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}\p{space}]+(?:=|(?=\n?$)))/dgv,
          end: /;|(?=\n?$)/dgv,
          name: "meta.definition.variable.groovy",
          patterns: [
            {
              match: /\p{space}/dgv
            },
            {
              captures: {
                "1": { name: "constant.variable.groovy" }
              },
              match: /([0-9A-Z_]+)\p{space}+(?==)/dgv
            },
            {
              captures: {
                "1": { name: "meta.definition.variable.name.groovy" }
              },
              match: /([\p{L}\p{M}\p{N}\p{Pc}][^\,\p{space}]*)\p{space}+(?==)/dgv
            },
            {
              begin: /=/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.assignment.groovy" }
              },
              end: /(?=\n?$)/dgv,
              patterns: [
                { include: "#groovy-code" }
              ]
            },
            {
              captures: {
                "1": { name: "meta.definition.variable.name.groovy" }
              },
              match: /([\p{L}\p{M}\p{N}\p{Pc}][^\=\p{space}]*)(?=\p{space}*((?=\n?$)|;))/dgv
            },
            { include: "#groovy-code" }
          ]
        }
      ]
    }
  },
  dependencies: []
};
