// Reference: a5huynh/vscode-ron (MIT) - https://github.com/a5huynh/vscode-ron/blob/master/syntaxes/ron.tmGrammar.json
export default {
  "scopeName": "source.ron",
  "patterns": [
    {
      "include": "#expression"
    }
  ],
  "repository": {
    "expression": {
      "patterns": [
        {
          "include": "#array"
        },
        {
          "include": "#block_comment"
        },
        {
          "include": "#constant"
        },
        {
          "include": "#dictionary"
        },
        {
          "include": "#line_comment"
        },
        {
          "include": "#number"
        },
        {
          "include": "#raw_string"
        },
        {
          "include": "#struct-field"
        },
        {
          "include": "#struct-name"
        },
        {
          "include": "#object"
        },
        {
          "include": "#string"
        },
        {
          "include": "#character"
        },
        {
          "include": "#enum-variant"
        }
      ]
    },
    "array": {
      "begin": "\\[",
      "end": "\\]",
      "beginCaptures": {
        "0": {
          "name": "punctuation.section.array.begin.ron"
        }
      },
      "endCaptures": {
        "0": {
          "name": "punctuation.section.array.end.ron"
        }
      },
      "patterns": [
        {
          "include": "#value"
        },
        {
          "include": "#struct-name"
        },
        {
          "meta_scope": "meta.structure.array.ron"
        }
      ]
    },
    "block_comment": {
      "name": "comment.block.ron",
      "begin": "/\\*",
      "end": "\\*/",
      "patterns": [
        {
          "include": "#block_comment"
        }
      ]
    },
    "constant": {
      "match": "\\b(true|false)\\b",
      "name": "constant.language.ron"
    },
    "dictionary": {
      "begin": "\\{",
      "end": "\\}",
      "beginCaptures": {
        "0": {
          "name": "punctuation.section.dictionary.begin.ron"
        }
      },
      "endCaptures": {
        "0": {
          "name": "punctuation.section.dictionary.end.ron"
        }
      },
      "patterns": [
        {
          "include": "#value"
        },
        {
          "include": "#struct-name"
        },
        {
          "include": "#object"
        },
        {
          "include": "#enum-variant"
        },
        {
          "match": ",",
          "name": "punctuation.separator.dictionary.ron"
        },
        {
          "match": ":",
          "name": "punctuation.separator.dictionary.key-value.ron"
        }
      ]
    },
    "line_comment": {
      "name": "comment.line.double-slash.ron",
      "begin": "//",
      "end": "$"
    },
    "struct-field": {
      "comment": "Struct field key: identifier followed by :",
      "match": "([a-z_][A-Za-z_0-9]*)\\s*(:)",
      "captures": {
        "1": {
          "name": "variable.other.member.ron"
        },
        "2": {
          "name": "punctuation.separator.key-value.ron"
        }
      }
    },
    "struct-name": {
      "comment": "Struct/type name: capitalized identifier typically followed by ( or {",
      "match": "[A-Z][A-Za-z_0-9]*",
      "name": "entity.name.type.ron"
    },
    "enum-variant": {
      "comment": "Enum variant or field name (lowercase identifier not followed by :)",
      "match": "[a-z_][A-Za-z_0-9]*",
      "name": "entity.name.tag.ron"
    },
    "object": {
      "begin": "\\(",
      "end": "\\)",
      "beginCaptures": {
        "0": {
          "name": "punctuation.section.parens.begin.ron"
        }
      },
      "endCaptures": {
        "0": {
          "name": "punctuation.section.parens.end.ron"
        }
      },
      "patterns": [
        {
          "include": "#value"
        },
        {
          "include": "#dictionary"
        },
        {
          "include": "#struct-field"
        },
        {
          "include": "#struct-name"
        },
        {
          "include": "#enum-variant"
        },
        {
          "include": "#object"
        }
      ]
    },
    "number": {
      "patterns": [
        {
          "comment": "Hexadecimal integer",
          "match": "-?\\b0x[0-9a-fA-F_]+\\b",
          "name": "constant.numeric.hex.ron"
        },
        {
          "comment": "Binary integer",
          "match": "-?\\b0b[01_]+\\b",
          "name": "constant.numeric.binary.ron"
        },
        {
          "comment": "Octal integer",
          "match": "-?\\b0o[0-7_]+\\b",
          "name": "constant.numeric.octal.ron"
        },
        {
          "comment": "Float or decimal integer",
          "match": "-?\\b[0-9][0-9_]*(?:\\.[0-9][0-9_]*)?(?:[eE][+-]?[0-9_]+)?\\b",
          "name": "constant.numeric.ron"
        }
      ]
    },
    "raw_string": {
      "patterns": [
        {
          "comment": "Raw string r#####\"...\"#####",
          "begin": "r#{5}\"",
          "end": "\"#{5}",
          "name": "string.quoted.other.raw.ron"
        },
        {
          "comment": "Raw string r####\"...\"####",
          "begin": "r#{4}\"",
          "end": "\"#{4}",
          "name": "string.quoted.other.raw.ron"
        },
        {
          "comment": "Raw string r###\"...\"###",
          "begin": "r#{3}\"",
          "end": "\"#{3}",
          "name": "string.quoted.other.raw.ron"
        },
        {
          "comment": "Raw string r##\"...\"##",
          "begin": "r#{2}\"",
          "end": "\"#{2}",
          "name": "string.quoted.other.raw.ron"
        },
        {
          "comment": "Raw string r#\"...\"#",
          "begin": "r#\"",
          "end": "\"#",
          "name": "string.quoted.other.raw.ron"
        },
        {
          "comment": "Raw string r\"...\"",
          "begin": "r\"",
          "end": "\"",
          "name": "string.quoted.other.raw.ron"
        }
      ]
    },
    "string": {
      "begin": "(b?)(\")",
      "end": "\"",
      "name": "string.quoted.double",
      "patterns": [
        {
          "include": "#escapes"
        }
      ]
    },
    "character": {
      "begin": "'",
      "end": "'",
      "contentName": "constant.character.ron",
      "name": "string.quoted.single",
      "patterns": [
        {
          "include": "#escapes"
        }
      ]
    },
    "value": {
      "patterns": [
        {
          "include": "#array"
        },
        {
          "include": "#block_comment"
        },
        {
          "include": "#constant"
        },
        {
          "include": "#dictionary"
        },
        {
          "include": "#line_comment"
        },
        {
          "include": "#number"
        },
        {
          "include": "#object"
        },
        {
          "include": "#raw_string"
        },
        {
          "include": "#string"
        },
        {
          "include": "#character"
        }
      ]
    },
    "escapes": {
      "comment": "escapes: ASCII, byte, Unicode, quote, regex",
      "name": "constant.character.escape.ron",
      "match": "(\\\\)(?:(?:(x[0-7][0-7a-fA-F])|(u(\\{)[\\da-fA-F]{4,6}(\\}))|.))",
      "captures": {
        "1": {
          "name": "constant.character.escape.backslash.ron"
        },
        "2": {
          "name": "constant.character.escape.bit.ron"
        },
        "3": {
          "name": "constant.character.escape.unicode.ron"
        },
        "4": {
          "name": "constant.character.escape.unicode.punctuation.ron"
        },
        "5": {
          "name": "constant.character.escape.unicode.punctuation.ron"
        }
      }
    }
  }
};
