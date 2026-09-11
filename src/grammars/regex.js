// Reference: Microsoft VS Code (MIT) - https://github.com/microsoft/vscode/blob/main/extensions/javascript/syntaxes/JavaScript.tmLanguage.json
export default {
  "scopeName": "source.regexp",
  "patterns": [
    {
      "include": "#regexp"
    }
  ],
  "repository": {
    "regexp": {
      "patterns": [
        {
          "name": "keyword.control.anchor.regexp",
          "match": "\\\\[bB]|\\^|\\$"
        },
        {
          "match": "\\\\[1-9]\\d*|\\\\k<([a-zA-Z_$][\\w$]*)>",
          "captures": {
            "0": {
              "name": "keyword.other.back-reference.regexp"
            },
            "1": {
              "name": "variable.other.regexp"
            }
          }
        },
        {
          "name": "keyword.operator.quantifier.regexp",
          "match": "[?+*]|\\{(\\d+,\\d+|\\d+,|,\\d+|\\d+)\\}\\??"
        },
        {
          "name": "keyword.operator.or.regexp",
          "match": "\\|"
        },
        {
          "name": "meta.group.assertion.regexp",
          "begin": "(\\()((\\?=)|(\\?!)|(\\?<=)|(\\?<!))",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.group.regexp"
            },
            "2": {
              "name": "punctuation.definition.group.assertion.regexp"
            },
            "3": {
              "name": "meta.assertion.look-ahead.regexp"
            },
            "4": {
              "name": "meta.assertion.negative-look-ahead.regexp"
            },
            "5": {
              "name": "meta.assertion.look-behind.regexp"
            },
            "6": {
              "name": "meta.assertion.negative-look-behind.regexp"
            }
          },
          "end": "(\\))",
          "endCaptures": {
            "1": {
              "name": "punctuation.definition.group.regexp"
            }
          },
          "patterns": [
            {
              "include": "#regexp"
            }
          ]
        },
        {
          "name": "meta.group.regexp",
          "begin": "\\((?:(\\?:)|(?:\\?<([a-zA-Z_$][\\w$]*)>))?",
          "beginCaptures": {
            "0": {
              "name": "punctuation.definition.group.regexp"
            },
            "1": {
              "name": "punctuation.definition.group.no-capture.regexp"
            },
            "2": {
              "name": "variable.other.regexp"
            }
          },
          "end": "\\)",
          "endCaptures": {
            "0": {
              "name": "punctuation.definition.group.regexp"
            }
          },
          "patterns": [
            {
              "include": "#regexp"
            }
          ]
        },
        {
          "name": "constant.other.character-class.set.regexp",
          "begin": "(\\[)(\\^)?",
          "beginCaptures": {
            "1": {
              "name": "punctuation.definition.character-class.regexp"
            },
            "2": {
              "name": "keyword.operator.negation.regexp"
            }
          },
          "end": "(\\])",
          "endCaptures": {
            "1": {
              "name": "punctuation.definition.character-class.regexp"
            }
          },
          "patterns": [
            {
              "name": "constant.other.character-class.range.regexp",
              "match": "(?:.|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\c[A-Z])|(\\\\.))\\-(?:[^\\]\\\\]|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\c[A-Z])|(\\\\.))",
              "captures": {
                "1": {
                  "name": "constant.character.numeric.regexp"
                },
                "2": {
                  "name": "constant.character.control.regexp"
                },
                "3": {
                  "name": "constant.character.escape.backslash.regexp"
                },
                "4": {
                  "name": "constant.character.numeric.regexp"
                },
                "5": {
                  "name": "constant.character.control.regexp"
                },
                "6": {
                  "name": "constant.character.escape.backslash.regexp"
                }
              }
            },
            {
              "include": "#regex-character-class"
            }
          ]
        },
        {
          "include": "#regex-character-class"
        }
      ]
    },
    "regex-character-class": {
      "patterns": [
        {
          "name": "constant.other.character-class.regexp",
          "match": "\\\\[wWsSdDtrnvf]|\\."
        },
        {
          "name": "constant.character.numeric.regexp",
          "match": "\\\\([0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4})"
        },
        {
          "name": "constant.character.control.regexp",
          "match": "\\\\c[A-Z]"
        },
        {
          "name": "constant.character.escape.backslash.regexp",
          "match": "\\\\."
        }
      ]
    }
  }
};
