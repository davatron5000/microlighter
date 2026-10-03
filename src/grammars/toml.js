import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "toml",
  displayName: "TOML",
  scopeName: "source.toml",
  patterns: [
    { include: "#comments" },
    { include: "#groups" },
    { include: "#key_pair" },
    { include: "#invalid" }
  ],
  repository: {
    comments: {
      begin: /(^[\t ]+)?(?=#)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.toml" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.toml" }
          },
          end: /\n/dgv,
          name: "comment.line.number-sign.toml"
        }
      ]
    },
    groups: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.section.begin.toml" },
            "2": {
              patterns: [
                {
                  match: /[^\.\p{space}]+/dgv,
                  name: "entity.name.section.toml"
                }
              ]
            },
            "3": { name: "punctuation.definition.section.begin.toml" }
          },
          match: /^\p{space}*(\[)([^\]\[]*)(\])/dgv,
          name: "meta.group.toml"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.section.begin.toml" },
            "2": {
              patterns: [
                {
                  match: /[^\.\p{space}]+/dgv,
                  name: "entity.name.section.toml"
                }
              ]
            },
            "3": { name: "punctuation.definition.section.begin.toml" }
          },
          match: /^\p{space}*(\[\[)([^\]\[]*)(\]\])/dgv,
          name: "meta.group.double.toml"
        }
      ]
    },
    invalid: {
      match: /\P{space}+(\p{space}*(?=\P{space}))?/dgv,
      name: "invalid.illegal.not-allowed-here.toml"
    },
    key_pair: {
      patterns: [
        {
          begin: /([\-0-9A-Z_a-z]+)\p{space}*(=)\p{space}*/dgv,
          captures: {
            "1": { name: "variable.other.key.toml" },
            "2": { name: "punctuation.separator.key-value.toml" }
          },
          end: /(?<=\P{space})(?<!=)|(?=\n?$)/dgv,
          patterns: [
            { include: "#primatives" }
          ]
        },
        {
          begin: /((")([^\n]*?)("))\p{space}*(=)\p{space}*/dgv,
          captures: {
            "1": { name: "variable.other.key.toml" },
            "2": { name: "punctuation.definition.variable.begin.toml" },
            "3": {
              patterns: [
                {
                  match: /\\(["\\bfnrt]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
                  name: "constant.character.escape.toml"
                },
                {
                  match: /\\[^"\\bfnrt]/dgv,
                  name: "invalid.illegal.escape.toml"
                },
                {
                  match: /"/dgv,
                  name: "invalid.illegal.not-allowed-here.toml"
                }
              ]
            },
            "4": { name: "punctuation.definition.variable.end.toml" },
            "5": { name: "punctuation.separator.key-value.toml" }
          },
          end: /(?<=\P{space})(?<!=)|(?=\n?$)/dgv,
          patterns: [
            { include: "#primatives" }
          ]
        },
        {
          begin: /((')([^']*)('))\p{space}*(=)\p{space}*/dgv,
          captures: {
            "1": { name: "variable.other.key.toml" },
            "2": { name: "punctuation.definition.variable.begin.toml" },
            "4": { name: "punctuation.definition.variable.end.toml" },
            "5": { name: "punctuation.separator.key-value.toml" }
          },
          end: /(?<=\P{space})(?<!=)|(?=\n?$)/dgv,
          patterns: [
            { include: "#primatives" }
          ]
        },
        {
          begin: /(((?:[\-0-9A-Z_a-z]+|"(?:[^"\\]|\\[^\n])*"|'[^']*')(?:\p{space}*\.\p{space}*|(?=\p{space}*=))){2,})\p{space}*(=)\p{space}*/dgv,
          captures: {
            "1": {
              name: "variable.other.key.toml",
              patterns: [
                {
                  match: /\./dgv,
                  name: "punctuation.separator.variable.toml"
                },
                {
                  captures: {
                    "1": { name: "punctuation.definition.variable.begin.toml" },
                    "2": {
                      patterns: [
                        {
                          match: /\\(["\\bfnrt]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
                          name: "constant.character.escape.toml"
                        },
                        {
                          match: /\\[^"\\bfnrt]/dgv,
                          name: "invalid.illegal.escape.toml"
                        }
                      ]
                    },
                    "3": { name: "punctuation.definition.variable.end.toml" }
                  },
                  match: /(")((?:[^"\\]|\\[^\n])*)(")/dgv
                },
                {
                  captures: {
                    "1": { name: "punctuation.definition.variable.begin.toml" },
                    "2": { name: "punctuation.definition.variable.end.toml" }
                  },
                  match: /(')[^']*(')/dgv
                }
              ]
            },
            "3": { name: "punctuation.separator.key-value.toml" }
          },
          end: /(?<=\P{space})(?<!=)|(?=\n?$)/dgv,
          patterns: [
            { include: "#primatives" }
          ]
        }
      ]
    },
    primatives: {
      patterns: [
        {
          begin: {
            G: [/￿"""/dgv, /"""/dgvy]
          },
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.toml" }
          },
          end: /"{3,5}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.toml" }
          },
          name: "string.quoted.triple.double.toml",
          patterns: [
            {
              match: /\\(["\\bfnrt]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape.toml"
            },
            {
              match: /\\[^\n"\\bfnrt]/dgv,
              name: "invalid.illegal.escape.toml"
            }
          ]
        },
        {
          begin: {
            G: [/￿"/dgv, /"/dgvy]
          },
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.toml" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.toml" }
          },
          name: "string.quoted.double.toml",
          patterns: [
            {
              match: /\\(["\\bfnrt]|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape.toml"
            },
            {
              match: /\\[^"\\bfnrt]/dgv,
              name: "invalid.illegal.escape.toml"
            }
          ]
        },
        {
          begin: {
            G: [/￿'''/dgv, /'''/dgvy]
          },
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.toml" }
          },
          end: /'{3,5}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.toml" }
          },
          name: "string.quoted.triple.single.toml"
        },
        {
          begin: {
            G: [/￿'/dgv, /'/dgvy]
          },
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.toml" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.toml" }
          },
          name: "string.quoted.single.toml"
        },
        {
          match: {
            G: [/￿[0-9]{4}-(0[1-9]|1[012])-(?!00|3[2-9])[0-3][0-9]([ Tt](?!2[5-9])[012][0-9]:[0-5][0-9]:(?!6[1-9])[0-6][0-9](\.[0-9]+)?(Z|[\-\+](?!2[5-9])[012][0-9]:[0-5][0-9])?)?/dgv, /[0-9]{4}-(0[1-9]|1[012])-(?!00|3[2-9])[0-3][0-9]([ Tt](?!2[5-9])[012][0-9]:[0-5][0-9]:(?!6[1-9])[0-6][0-9](\.[0-9]+)?(Z|[\-\+](?!2[5-9])[012][0-9]:[0-5][0-9])?)?/dgvy]
          },
          name: "constant.other.date.toml"
        },
        {
          match: {
            G: [/￿(?!2[5-9])[012][0-9]:[0-5][0-9]:(?!6[1-9])[0-6][0-9](\.[0-9]+)?/dgv, /(?!2[5-9])[012][0-9]:[0-5][0-9]:(?!6[1-9])[0-6][0-9](\.[0-9]+)?/dgvy]
          },
          name: "constant.other.time.toml"
        },
        {
          match: {
            G: [/￿(true|false)/dgv, /(true|false)/dgvy]
          },
          name: "constant.language.boolean.toml"
        },
        {
          match: {
            G: [/￿0x\p{AHex}(_??\p{AHex})*/dgv, /0x\p{AHex}(_??\p{AHex})*/dgvy]
          },
          name: "constant.numeric.hex.toml"
        },
        {
          match: {
            G: [/￿0o[0-7]([0-7]|_[0-7])*/dgv, /0o[0-7]([0-7]|_[0-7])*/dgvy]
          },
          name: "constant.numeric.octal.toml"
        },
        {
          match: {
            G: [/￿0b[01]([01]|_[01])*/dgv, /0b[01]([01]|_[01])*/dgvy]
          },
          name: "constant.numeric.binary.toml"
        },
        {
          match: {
            G: [/￿[\-\+]?(inf|nan)/dgv, /[\-\+]?(inf|nan)/dgvy]
          },
          name: "constant.numeric.toml"
        },
        {
          match: {
            G: [/￿([\-\+]?(0|([1-9](([0-9]|_[0-9])+)?)))(?=[\.Ee])(\.([0-9](([0-9]|_[0-9])+)?))?([Ee]([\-\+]?[0-9](([0-9]|_[0-9])+)?))?/dgv, /([\-\+]?(0|([1-9](([0-9]|_[0-9])+)?)))(?=[\.Ee])(\.([0-9](([0-9]|_[0-9])+)?))?([Ee]([\-\+]?[0-9](([0-9]|_[0-9])+)?))?/dgvy]
          },
          name: "constant.numeric.float.toml"
        },
        {
          match: {
            G: [/￿([\-\+]?(0|([1-9](([0-9]|_[0-9])+)?)))/dgv, /([\-\+]?(0|([1-9](([0-9]|_[0-9])+)?)))/dgvy]
          },
          name: "constant.numeric.integer.toml"
        },
        {
          begin: {
            G: [/￿\[/dgv, /\[/dgvy]
          },
          beginCaptures: {
            "0": { name: "punctuation.definition.array.begin.toml" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.array.end.toml" }
          },
          name: "meta.array.toml",
          patterns: [
            {
              begin: /(?=["']|[\-\+]?[0-9]|[\-\+]?(inf|nan)|true|false|[\[\{])/dgv,
              end: /,|(?=\])/dgv,
              endCaptures: {
                "0": { name: "punctuation.separator.array.toml" }
              },
              patterns: [
                { include: "#primatives" },
                { include: "#comments" },
                { include: "#invalid" }
              ]
            },
            { include: "#comments" },
            { include: "#invalid" }
          ]
        },
        {
          begin: {
            G: [/￿\{/dgv, /\{/dgvy]
          },
          beginCaptures: {
            "0": { name: "punctuation.definition.inline-table.begin.toml" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.inline-table.end.toml" }
          },
          name: "meta.inline-table.toml",
          patterns: [
            {
              begin: /(?=\P{space})/dgv,
              end: /,|(?=\})/dgv,
              endCaptures: {
                "0": { name: "punctuation.separator.inline-table.toml" }
              },
              patterns: [
                { include: "#key_pair" }
              ]
            },
            { include: "#comments" }
          ]
        }
      ]
    }
  },
  dependencies: []
};
