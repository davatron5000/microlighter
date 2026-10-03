import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "v",
  displayName: "V",
  scopeName: "source.v",
  patterns: [
    { include: "#comments" },
    { include: "#function-decl" },
    { include: "#as-is" },
    { include: "#attributes" },
    { include: "#assignment" },
    { include: "#module-decl" },
    { include: "#import-decl" },
    { include: "#hash-decl" },
    { include: "#brackets" },
    { include: "#builtin-fix" },
    { include: "#escaped-fix" },
    { include: "#operators" },
    { include: "#function-limited-overload-decl" },
    { include: "#function-extend-decl" },
    { include: "#function-exist" },
    { include: "#generic" },
    { include: "#constants" },
    { include: "#type" },
    { include: "#enum" },
    { include: "#interface" },
    { include: "#struct" },
    { include: "#keywords" },
    { include: "#storage" },
    { include: "#numbers" },
    { include: "#strings" },
    { include: "#types" },
    { include: "#punctuations" },
    { include: "#variable-assign" },
    { include: "#function-decl" }
  ],
  repository: {
    "as-is": {
      begin: /\p{space}+([ai]s)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.$1.v" }
      },
      end: /([\.\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      endCaptures: {
        "1": { name: "entity.name.alias.v" }
      }
    },
    assignment: {
      captures: {
        "1": {
          patterns: [
            { include: "#operators" }
          ]
        }
      },
      match: /\p{space}+([\-\%\&\*\+\/\:\^\|]?=)\p{space}+/dgv,
      name: "meta.definition.variable.v"
    },
    attributes: {
      captures: {
        "1": { name: "meta.function.attribute.v" },
        "2": { name: "punctuation.definition.begin.bracket.square.v" },
        "3": { name: "storage.modifier.attribute.v" },
        "4": { name: "punctuation.definition.end.bracket.square.v" }
      },
      match: /^\p{space}*((\[)(deprecated|unsafe|console|heap|manualfree|typedef|live|inline|flag|ref_only|direct_array_access|callconv)(\]))/dgv,
      name: "meta.definition.attribute.v"
    },
    brackets: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.bracket.curly.begin.v" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.bracket.curly.end.v" }
          },
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.bracket.round.begin.v" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.bracket.round.end.v" }
          },
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.bracket.square.begin.v" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.bracket.square.end.v" }
          },
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "builtin-fix": {
      patterns: [
        {
          patterns: [
            {
              match: /(const)(?=\p{space}*\()/dgv,
              name: "storage.modifier.v"
            },
            {
              match: /\b(fn|type|enum|struct|union|interface|map|assert|sizeof|typeof|__offsetof)\b(?=\p{space}*\()/dgv,
              name: "keyword.$1.v"
            }
          ]
        },
        {
          patterns: [
            {
              match: /(\$(?:if|else))(?=\p{space}*\()/dgv,
              name: "keyword.control.v"
            },
            {
              match: /\b(as|in|is|or|break|continue|default|unsafe|match|if|else|for|go|spawn|goto|defer|return|shared|select|rlock|lock|atomic|asm)\b(?=\p{space}*\()/dgv,
              name: "keyword.control.v"
            }
          ]
        },
        {
          patterns: [
            {
              captures: {
                "1": { name: "storage.type.numeric.v" }
              },
              match: /(?<![^\n])(i?(?:8|16|nt|64|128)|u?(?:16|32|64|128)|f?(?:32|64))(?=\p{space}*\()/dgv,
              name: "meta.expr.numeric.cast.v"
            },
            {
              captures: {
                "1": { name: "storage.type.$1.v" }
              },
              match: /(bool|byte|byteptr|charptr|voidptr|string|rune|size_t|[iu]size)(?=\p{space}*\()/dgv,
              name: "meta.expr.bool.cast.v"
            }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /\/\*/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.v" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.v" }
          },
          name: "comment.block.documentation.v",
          patterns: [
            { include: "#comments" }
          ]
        },
        {
          begin: /\/\//dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.v" }
          },
          end: /(?=\n?$)/dgv,
          name: "comment.line.double-slash.v"
        }
      ]
    },
    constants: {
      match: /\b(true|false|none)\b/dgv,
      name: "constant.language.v"
    },
    enum: {
      captures: {
        "1": { name: "storage.modifier.$1.v" },
        "2": { name: "storage.type.enum.v" },
        "3": { name: "entity.name.enum.v" }
      },
      match: /^\p{space}*(?:(pub)?\p{space}+)?(enum)\p{space}+(?:[\p{L}\p{M}\p{N}\p{Pc}]+\.)?([\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      name: "meta.definition.enum.v"
    },
    "function-decl": {
      captures: {
        "1": { name: "storage.modifier.v" },
        "2": { name: "keyword.fn.v" },
        "3": { name: "entity.name.function.v" },
        "4": {
          patterns: [
            { include: "#generic" }
          ]
        }
      },
      match: /^(\bpub\b\p{space}+)?\b(fn)\b\p{space}+(?:\([^\)]+\)\p{space}+)?(?:C\.)?([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*((?<=[\+\p{L}\p{M}\p{N}\p{Pc}\p{space}])(<)([\p{L}\p{M}\p{N}\p{Pc}]+)(>))?/dgv,
      name: "meta.definition.function.v"
    },
    "function-exist": {
      captures: {
        "0": { name: "meta.function.call.v" },
        "1": {
          patterns: [
            { include: "#illegal-name" },
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "entity.name.function.v"
            }
          ]
        },
        "2": {
          patterns: [
            { include: "#generic" }
          ]
        }
      },
      match: /([\p{L}\p{M}\p{N}\p{Pc}]+)((?<=[\+\p{L}\p{M}\p{N}\p{Pc}\p{space}])(<)([\p{L}\p{M}\p{N}\p{Pc}]+)(>))?(?=\p{space}*\()/dgv,
      name: "meta.support.function.v"
    },
    "function-extend-decl": {
      captures: {
        "1": { name: "storage.modifier.v" },
        "2": { name: "keyword.fn.v" },
        "3": { name: "punctuation.definition.bracket.round.begin.v" },
        "4": {
          patterns: [
            { include: "#brackets" },
            { include: "#storage" },
            { include: "#generic" },
            { include: "#types" },
            { include: "#punctuation" }
          ]
        },
        "5": { name: "punctuation.definition.bracket.round.end.v" },
        "6": {
          patterns: [
            { include: "#illegal-name" },
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "entity.name.function.v"
            }
          ]
        },
        "7": {
          patterns: [
            { include: "#generic" }
          ]
        }
      },
      match: /^\p{space}*(pub)?\p{space}*(fn)\p{space}*(\()([^\)]*)(\))\p{space}*(?:C\.)?([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*((?<=[\+\p{L}\p{M}\p{N}\p{Pc}\p{space}])(<)([\p{L}\p{M}\p{N}\p{Pc}]+)(>))?/dgv,
      name: "meta.definition.function.v"
    },
    "function-limited-overload-decl": {
      captures: {
        "1": { name: "storage.modifier.v" },
        "2": { name: "keyword.fn.v" },
        "3": { name: "punctuation.definition.bracket.round.begin.v" },
        "4": {
          patterns: [
            { include: "#brackets" },
            { include: "#storage" },
            { include: "#generic" },
            { include: "#types" },
            { include: "#punctuation" }
          ]
        },
        "5": { name: "punctuation.definition.bracket.round.end.v" },
        "6": {
          patterns: [
            { include: "#operators" }
          ]
        },
        "7": { name: "punctuation.definition.bracket.round.begin.v" },
        "8": {
          patterns: [
            { include: "#brackets" },
            { include: "#storage" },
            { include: "#generic" },
            { include: "#types" },
            { include: "#punctuation" }
          ]
        },
        "9": { name: "punctuation.definition.bracket.round.end.v" },
        "10": {
          patterns: [
            { include: "#illegal-name" },
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "entity.name.function.v"
            }
          ]
        }
      },
      match: /^\p{space}*(pub)?\p{space}*(fn)\p{space}*(\()([^\)]*)(\))\p{space}*([\-\*\+\/])?\p{space}*(\()([^\)]*)(\))\p{space}*(?:C\.)?([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      name: "meta.definition.function.v"
    },
    generic: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.bracket.angle.begin.v" },
            "2": {
              patterns: [
                { include: "#illegal-name" },
                {
                  match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
                  name: "entity.name.generic.v"
                }
              ]
            },
            "3": { name: "punctuation.definition.bracket.angle.end.v" }
          },
          match: /(?<=[\+\p{L}\p{M}\p{N}\p{Pc}\p{space}])(<)([\p{L}\p{M}\p{N}\p{Pc}]+)(>)/dgv,
          name: "meta.definition.generic.v"
        }
      ]
    },
    "hash-decl": {
      begin: /^\p{space}*(#)/dgv,
      end: /(?=\n?$)/dgv,
      name: "markup.bold.v"
    },
    "illegal-name": {
      match: /\p{Nd}[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
      name: "invalid.illegal.v"
    },
    "import-decl": {
      begin: /^\p{space}*(import)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.import.v" }
      },
      end: /([\.\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      endCaptures: {
        "1": { name: "entity.name.import.v" }
      },
      name: "meta.import.v"
    },
    interface: {
      captures: {
        "1": { name: "storage.modifier.$1.v" },
        "2": { name: "keyword.interface.v" },
        "3": {
          patterns: [
            { include: "#illegal-name" },
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "entity.name.interface.v"
            }
          ]
        }
      },
      match: /^\p{space}*(?:(pub)?\p{space}+)?(interface)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      name: "meta.definition.interface.v"
    },
    keywords: {
      patterns: [
        {
          match: /(\$(?:if|else))/dgv,
          name: "keyword.control.v"
        },
        {
          match: /(?<!@)\b(as|it|is|in|or|break|continue|default|unsafe|match|if|else|for|go|spawn|goto|defer|return|shared|select|rlock|lock|atomic|asm)\b/dgv,
          name: "keyword.control.v"
        },
        {
          match: /(?<!@)\b(fn|type|typeof|enum|struct|interface|map|assert|sizeof|__offsetof)\b/dgv,
          name: "keyword.$1.v"
        }
      ]
    },
    "module-decl": {
      begin: /^\p{space}*(module)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.module.v" }
      },
      end: /([\.\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      endCaptures: {
        "1": { name: "entity.name.module.v" }
      },
      name: "meta.module.v"
    },
    numbers: {
      patterns: [
        {
          match: /([0-9]+(_?))+(\.)([0-9]+[Ee][\-\+]?[0-9]+)/dgv,
          name: "constant.numeric.exponential.v"
        },
        {
          match: /([0-9]+(_?))+(\.)([0-9]+)/dgv,
          name: "constant.numeric.float.v"
        },
        {
          match: /0b(?:[01]+_?)+/dgv,
          name: "constant.numeric.binary.v"
        },
        {
          match: /0o(?:[0-7]+_?)+/dgv,
          name: "constant.numeric.octal.v"
        },
        {
          match: /0x(?:\p{AHex}+_?)+/dgv,
          name: "constant.numeric.hex.v"
        },
        {
          match: /(?:[0-9]+_?)+/dgv,
          name: "constant.numeric.integer.v"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /([\-\%\*\+\/]|\+\+|--|>>|<<)/dgv,
          name: "keyword.operator.arithmetic.v"
        },
        {
          match: /(==|!=|[\<\>]|>=|<=)/dgv,
          name: "keyword.operator.relation.v"
        },
        {
          match: /((?::?|[\-\%\&\*\+\/\^\|\~]|&&|\|\||>>|<<)=)/dgv,
          name: "keyword.operator.assignment.v"
        },
        {
          match: /([\&\^\|\~]|<(?!<)|>(?!>))/dgv,
          name: "keyword.operator.bitwise.v"
        },
        {
          match: /(&&|\|\||!)/dgv,
          name: "keyword.operator.logical.v"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.optional.v"
        }
      ]
    },
    punctuation: {
      patterns: [
        {
          match: /\./dgv,
          name: "punctuation.delimiter.period.dot.v"
        },
        {
          match: /,/dgv,
          name: "punctuation.delimiter.comma.v"
        },
        {
          match: /:/dgv,
          name: "punctuation.separator.key-value.colon.v"
        },
        {
          match: /;/dgv,
          name: "punctuation.definition.other.semicolon.v"
        },
        {
          match: /\?/dgv,
          name: "punctuation.definition.other.questionmark.v"
        },
        {
          match: /#/dgv,
          name: "punctuation.hash.v"
        }
      ]
    },
    punctuations: {
      patterns: [
        {
          match: /\./dgv,
          name: "punctuation.accessor.v"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.v"
        }
      ]
    },
    storage: {
      match: /\b(const|mut|pub)\b/dgv,
      name: "storage.modifier.v"
    },
    "string-escaped-char": {
      patterns: [
        {
          match: /\\([0-7]{3}|["\$'\\abfnrtv]|x\p{AHex}{2}|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
          name: "constant.character.escape.v"
        },
        {
          match: /\\[^"\$'0-7Uabfnrtuvx]/dgv,
          name: "invalid.illegal.unknown-escape.v"
        }
      ]
    },
    "string-interpolation": {
      patterns: [
        {
          begin: /(\$\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.template-expression.begin.v" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.template-expression.end.v" }
          },
          name: "meta.string.interpolation.v",
          patterns: [
            { include: "#operators" },
            { include: "#numbers" },
            { include: "#function-exist" },
            { include: "#types" },
            { include: "#constants" },
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "variable.other.v"
            }
          ]
        }
      ]
    },
    "string-placeholder": {
      match: /%(\[\p{Nd}+\])?([\- \#\+0]{0,2}((\p{Nd}+|\*)?(\.?(\p{Nd}+|\*|(\[\p{Nd}+\])\*?)?(\[\p{Nd}+\])?)?))?[\%EFGTUXb-gopqstvx]/dgv,
      name: "constant.other.placeholder.v"
    },
    strings: {
      patterns: [
        {
          begin: /`/dgv,
          end: /`/dgv,
          name: "string.quoted.rune.v",
          patterns: [
            { include: "#string-escaped-char" },
            { include: "#string-interpolation" },
            { include: "#string-placeholder" }
          ]
        },
        {
          begin: /(r)'/dgv,
          beginCaptures: {
            "1": { name: "storage.type.string.v" }
          },
          end: /'/dgv,
          name: "string.quoted.raw.v",
          patterns: [
            { include: "#string-placeholder" }
          ]
        },
        {
          begin: /(r)"/dgv,
          beginCaptures: {
            "1": { name: "storage.type.string.v" }
          },
          end: /"/dgv,
          name: "string.quoted.raw.v",
          patterns: [
            { include: "#string-placeholder" }
          ]
        },
        {
          begin: /(c?)'/dgv,
          beginCaptures: {
            "1": { name: "storage.type.string.v" }
          },
          end: /'/dgv,
          name: "string.quoted.v",
          patterns: [
            { include: "#string-escaped-char" },
            { include: "#string-interpolation" },
            { include: "#string-placeholder" }
          ]
        },
        {
          begin: /(c?)"/dgv,
          beginCaptures: {
            "1": { name: "storage.type.string.v" }
          },
          end: /"/dgv,
          name: "string.quoted.v",
          patterns: [
            { include: "#string-escaped-char" },
            { include: "#string-interpolation" },
            { include: "#string-placeholder" }
          ]
        }
      ]
    },
    struct: {
      patterns: [
        {
          begin: /^\p{space}*(?:(mut|pub(?:\p{space}+mut)?|__global)\p{space}+)?(struct|union)\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*|(\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.$1.v" },
            "2": { name: "storage.type.struct.v" },
            "3": { name: "entity.name.type.v" },
            "4": { name: "punctuation.definition.bracket.curly.begin.v" }
          },
          end: /\p{space}*|(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.bracket.curly.end.v" }
          },
          name: "meta.definition.struct.v",
          patterns: [
            { include: "#struct-access-modifier" },
            {
              captures: {
                "1": { name: "variable.other.property.v" },
                "2": {
                  patterns: [
                    { include: "#numbers" },
                    { include: "#brackets" },
                    { include: "#types" },
                    {
                      match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
                      name: "storage.type.other.v"
                    }
                  ]
                },
                "3": { name: "keyword.operator.assignment.v" },
                "4": {
                  patterns: [
                    { include: "$self" }
                  ]
                }
              },
              match: new EmulatedRegExp("\\b([\\p{L}\\p{M}\\p{N}\\p{Pc}]+)\\p{space}+([\\]\\&\\*\\.\\[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)(?:\\p{space}*(=)\\p{space}*((?:(?=((?:[^\\n](?=(?=\\n?$)|//|/\\*))*))\\5)))?", "dgv", { hiddenCaptures: [5] })
            },
            { include: "#types" },
            { include: "$self" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.modifier.$1.v" },
            "2": { name: "storage.type.struct.v" },
            "3": { name: "entity.name.struct.v" }
          },
          match: /^\p{space}*(mut|pub(?:\p{space}+mut)?|__global)\p{space}+?(struct)\p{space}+(?:\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+))?/dgv,
          name: "meta.definition.struct.v"
        }
      ]
    },
    "struct-access-modifier": {
      captures: {
        "1": { name: "storage.modifier.$1.v" },
        "2": { name: "punctuation.separator.struct.key-value.v" }
      },
      match: /(?<=\p{space}|^)(mut|pub(?:\p{space}+mut)?|__global)(:|\b)/dgv
    },
    type: {
      captures: {
        "1": { name: "storage.modifier.$1.v" },
        "2": { name: "storage.type.type.v" },
        "3": {
          patterns: [
            { include: "#illegal-name" },
            { include: "#types" },
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "entity.name.type.v"
            }
          ]
        },
        "4": {
          patterns: [
            { include: "#illegal-name" },
            { include: "#types" },
            {
              match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "entity.name.type.v"
            }
          ]
        }
      },
      match: /^\p{space}*(?:(pub)?\p{space}+)?(type)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+(?:[\p{L}\p{M}\p{N}\p{Pc}]+\.+)?([\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      name: "meta.definition.type.v"
    },
    types: {
      patterns: [
        {
          match: /(?<!\.)\b(i(8|16|nt|64|128)|u(8|16|32|64|128)|f(32|64))\b/dgv,
          name: "storage.type.numeric.v"
        },
        {
          match: /(?<!\.)\b(bool|byte|byteptr|charptr|voidptr|string|ustring|rune)\b/dgv,
          name: "storage.type.$1.v"
        }
      ]
    },
    "variable-assign": {
      captures: {
        "0": {
          patterns: [
            {
              match: /[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
              name: "variable.other.assignment.v"
            },
            { include: "#punctuation" }
          ]
        }
      },
      match: /[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*(?:,\p{space}*[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)*(?=\p{space}*:??=)/dgv
    }
  },
  dependencies: []
};
