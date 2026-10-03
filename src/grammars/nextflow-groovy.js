export default {
  name: "nextflow-groovy",
  displayName: "Nextflow Groovy",
  scopeName: "source.nextflow-groovy",
  patterns: [
    {
      captures: {
        "1": { name: "punctuation.definition.comment.groovy" }
      },
      match: /^(#!)[^\n]+(?=\n?$)\n/dgv,
      name: "comment.line.hashbang.groovy"
    },
    { include: "#groovy" }
  ],
  repository: {
    braces: {
      begin: /\{/dgv,
      end: /\}/dgv,
      patterns: [
        { include: "#groovy-code" }
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
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.groovy" }
          },
          end: /\*\//dgv,
          name: "comment.block.groovy"
        },
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
    "constructor-call": {
      begin: /\bnew\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.new.groovy" }
      },
      end: /(?<=\))|(?=\n?$)/dgv,
      patterns: [
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
        }
      ]
    },
    groovy: {
      patterns: [
        { include: "#comments" },
        { include: "#variables" },
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
        { include: "#keyword-language" },
        { include: "#values" },
        { include: "#keyword-operator" },
        { include: "#types" },
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
          match: /\b(try|catch|throw)\b/dgv,
          name: "keyword.control.exception.groovy"
        },
        {
          match: /\b((?<!\.)(?:return|if|else))\b/dgv,
          name: "keyword.control.groovy"
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
          match: /(==|!=|<=|>=|<=>|<>|[\<\>]|<<)/dgv,
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
    "nest-curly": {
      begin: /\{/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.groovy" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#nest-curly" }
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
          match: /\b(?:[A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*(?:[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*[a-z]+[\p{L}\p{M}\p{N}\p{Pc}]*|UR[IL])\b/dgv,
          name: "storage.type.groovy"
        }
      ]
    },
    parameters: {
      patterns: [
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
    "primitive-types": {
      patterns: [
        {
          match: /\b(?:boolean|byte|char|short|int|float|long|double)\b/dgv,
          name: "storage.type.primitive.groovy"
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
            { include: "#nest-curly" }
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
    "string-slashy": {
      patterns: [
        {
          match: /(?<=[\]"'\)\}\p{L}\p{M}\p{N}\p{Pc}])\p{space}*\/(?![\*\/])/dgv,
          name: "keyword.operator.arithmetic.groovy"
        },
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
    strings: {
      patterns: [
        { include: "#string-quoted-double-multiline" },
        { include: "#string-quoted-single-multiline" },
        { include: "#string-quoted-double" },
        { include: "#string-quoted-single" },
        { include: "#string-slashy" }
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
    types: {
      patterns: [
        {
          match: /\b(def)\b/dgv,
          name: "storage.type.def.groovy"
        },
        { include: "#primitive-types" },
        { include: "#object-types" }
      ]
    },
    values: {
      patterns: [
        { include: "#strings" },
        { include: "#numbers" },
        { include: "#constants" },
        { include: "#types" },
        { include: "#structures" },
        { include: "#method-call" },
        { include: "#constructor-call" }
      ]
    },
    variables: {
      patterns: [
        {
          applyEndPatternLast: 1,
          begin: /(?=(?:def|(?:boolean|byte|char|short|int|float|long|double)|(?:[a-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+[\]\,\<\>\[_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}\p{space}]+(?:=|(?=\n?$)))/dgv,
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
              captures: {
                "1": { name: "storage.type.groovy" }
              },
              match: /: ([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
              patterns: [
                { include: "#types" }
              ]
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
