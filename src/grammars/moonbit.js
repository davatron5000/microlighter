import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "moonbit",
  displayName: "MoonBit",
  aliases: [
    "mbt",
    "mbti"
  ],
  scopeName: "source.moonbit",
  patterns: [
    { include: "#strings" },
    { include: "#comments" },
    { include: "#constants" },
    { include: "#keywords" },
    { include: "#functions" },
    { include: "#support" },
    { include: "#attribute" },
    { include: "#types" },
    { include: "#modules" },
    { include: "#variables" }
  ],
  repository: {
    attribute: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.directive" },
            "2": {
              patterns: [
                { include: "#strings" },
                {
                  match: /[ \.0-9A-Z_a-z]+/dgv,
                  name: "entity.name.tag"
                },
                {
                  match: /=/dgv,
                  name: "keyword.operator.attribute.moonbit"
                }
              ]
            }
          },
          match: /(#[a-z][ \.0-9A-Z_a-z]*)([^\n]*)/dgv
        }
      ]
    },
    comments: {
      patterns: [
        {
          match: /\/\/[^\/][^\n]*/dgv,
          name: "comment.line"
        },
        {
          begin: /\/\/\//dgv,
          name: "comment.block.documentation.moonbit",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)(`{3,}|~{3,})\p{space}*(mbt\p{space}+test|mbt\p{space}+test(async)|mbt|moonbit\p{space}+test|moonbit\p{space}+test(async)|moonbit|)(\p{space}+[^\`\~]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(\\p{space}*)(`{3,}|~{3,})\\p{space}*(mbt\\p{space}+test|mbt\\p{space}+test(async)|mbt|moonbit\\p{space}+test|moonbit\\p{space}+test(async)|moonbit|)(\\p{space}+[^\\`\\~]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "3": { name: "punctuation.definition.markdown" },
                "5": { name: "fenced_code.block.language" },
                "6": { name: "fenced_code.block.language.attributes" }
              },
              end: {
                G: [/(^|￿)(2|\p{space}{0,3})(3)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2|\\p{space}{0,3})(3)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              endCaptures: {
                "3": { name: "punctuation.definition.markdown" }
              },
              name: "markup.fenced_code.block.markdown",
              patterns: [
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.moonbit",
                  patterns: [
                    { include: "$self" }
                  ],
                  while: {
                    G: [/(^|￿)(?!\p{space}*([\`\~]{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*([\\`\\~]{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ],
          while: /\/\/\//dgv
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b\p{Nd}([_\p{Nd}])*(?!\.)((U)?(L)?|N?)\b/dgv,
          name: "constant.numeric.moonbit"
        },
        {
          match: /(?<=\.)\p{Nd}((?=\.)|\b)/dgv,
          name: "constant.numeric.moonbit"
        },
        {
          match: /\b\p{Nd}+(?=\.\.)/dgv,
          name: "constant.numeric.moonbit"
        },
        {
          match: /\b\p{Nd}[_\p{Nd}]*\.[_\p{Nd}]*([Ee][\-\+]?\p{Nd}[_\p{Nd}]*\b)?/dgv,
          name: "constant.numeric.moonbit"
        },
        {
          match: /\b0[Oo][0-7][0-7]*((U)?(L)?|N?)\b/dgv,
          name: "constant.numeric.moonbit"
        },
        {
          match: /\b0[Xx][A-Fa-f\p{Nd}][A-F_a-f\p{Nd}]*(([LU]|UL|N)\b|\.[A-F_a-f\p{Nd}]*([Pp][\-\+]?[A-F_a-f\p{Nd}]+\b)?)?/dgv,
          name: "constant.numeric.moonbit"
        },
        {
          match: /\b(true|false)\b/dgv,
          name: "constant.language.moonbit"
        }
      ]
    },
    escape: {
      patterns: [
        {
          match: /\\["'0\\bnrt]/dgv,
          name: "constant.character.escape.moonbit"
        },
        {
          match: /\\x\p{AHex}{2}/dgv,
          name: "constant.character.escape.moonbit"
        },
        {
          match: /\\o[0-3][0-7]{2}/dgv,
          name: "constant.character.escape.moonbit"
        },
        {
          match: /\\u\p{AHex}{4}/dgv,
          name: "constant.character.escape.unicode.moonbit"
        },
        {
          match: /\\u\{\p{AHex}*\}/dgv,
          name: "constant.character.escape.unicode.moonbit"
        }
      ]
    },
    functions: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.moonbit" },
            "2": { name: "entity.name.type.moonbit" },
            "3": { name: "entity.name.function.moonbit" }
          },
          match: /\b(fn)\b\p{space}*(?:([A-Z][0-9A-Z_a-z]*)::)?([0-9_a-z][0-9A-Z_a-z]*)?\b/dgv
        },
        {
          begin: /(?!\bfn\p{space}+)(?:\.|::)?([0-9_a-z][0-9A-Z_a-z]*([\!\?]|!!)?)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.moonbit" },
            "2": { name: "punctuation.brackets.round.moonbit" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.brackets.round.moonbit" }
          },
          name: "meta.function.call.moonbit",
          patterns: [
            { include: "#comments" },
            { include: "#constants" },
            { include: "#keywords" },
            { include: "#functions" },
            { include: "#support" },
            { include: "#types" },
            { include: "#modules" },
            { include: "#strings" },
            { include: "#variables" }
          ]
        }
      ]
    },
    interpolation: {
      patterns: [
        {
          begin: /\\\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.moonbit" }
          },
          contentName: "source.moonbit",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.moonbit" }
          },
          name: "meta.embedded.line.moonbit",
          patterns: [
            { include: "#interpolation-braces" },
            { include: "$self" }
          ]
        }
      ]
    },
    "interpolation-braces": {
      patterns: [
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          patterns: [
            { include: "#interpolation-braces" },
            { include: "$self" }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(async)\b/dgv,
          name: "keyword.control.moonbit.async"
        },
        {
          match: /\b(guard|if|while|break|continue|return|try|catch|except|raise|noraise|nocancel|nobreak|match|lexmatch|lexscan|using|else|as|in|is|loop|for|async|defer|errdefer)\b/dgv,
          name: "keyword.control.moonbit"
        },
        {
          match: /\b(type!|(type|let|const|enum|extenum|struct|import|trait|derive|test|impl|with|recur|suberror|letrec|and|where|declare)\b)/dgv,
          name: "keyword.moonbit"
        },
        {
          match: /\b(mut|pub|priv|readonly|extern)\b/dgv,
          name: "storage.modifier.moonbit"
        },
        {
          match: /->/dgv,
          name: "storage.type.function.arrow.moonbit"
        },
        {
          match: /=>/dgv,
          name: "storage.type.function.arrow.moonbit"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.moonbit"
        },
        {
          match: /\|>/dgv,
          name: "keyword.operator.other.moonbit"
        },
        {
          match: /(===?|!=|>=|<=|(?<!-)(?<!\|)>(?!>)|<(?!<))/dgv,
          name: "keyword.operator.comparison.moonbit"
        },
        {
          match: /(\bnot\b|&&|\|\|)/dgv,
          name: "keyword.operator.logical.moonbit"
        },
        {
          match: /(\|(?!\|)(?!>)|&(?!&)|\^|<<|>>)/dgv,
          name: "keyword.operator.bitwise.moonbit"
        },
        {
          match: /(\+|-(?!>)|[\%\*\/])/dgv,
          name: "keyword.operator.math.moonbit"
        }
      ]
    },
    modules: {
      patterns: [
        {
          match: /@[A-Za-z][\-\/-9A-Z_a-z]*/dgv,
          name: "entity.name.namespace.moonbit"
        }
      ]
    },
    strings: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.other.moonbit" }
          },
          match: /(#\|)[^\n]*/dgv,
          name: "string.line"
        },
        {
          captures: {
            "1": { name: "keyword.operator.other.moonbit" },
            "2": {
              patterns: [
                { include: "#escape" },
                { include: "#interpolation" }
              ]
            }
          },
          match: /(\$\|)([^\n]*)/dgv,
          name: "string.line"
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.moonbit",
          patterns: [
            { include: "#escape" }
          ]
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.moonbit",
          patterns: [
            { include: "#escape" },
            { include: "#interpolation" }
          ]
        }
      ]
    },
    support: {
      patterns: [
        {
          match: /\b(Eq|Compare|Hash|Show|Default|ToJson|FromJson)\b/dgv,
          name: "support.class.moonbit"
        }
      ]
    },
    types: {
      patterns: [
        {
          match: /\b(?<!@)[A-Z][0-9A-Z_a-z]*((\?)+|\b)/dgv,
          name: "entity.name.type.moonbit"
        }
      ]
    },
    variables: {
      patterns: [
        {
          match: /\b(?<!\.|::)[_a-z][0-9A-Z_a-z]*\b/dgv,
          name: "variable.other.moonbit"
        }
      ]
    }
  },
  dependencies: []
};
