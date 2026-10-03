export default {
  name: "hjson",
  displayName: "Hjson",
  scopeName: "source.hjson",
  patterns: [
    { include: "#comments" },
    { include: "#value" },
    {
      match: /\P{space}/dgv,
      name: "invalid.illegal.excess-characters.hjson"
    }
  ],
  repository: {
    array: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.array.begin.hjson" }
      },
      end: /(\])(?:\p{space}*([^\,\p{space}]+))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.array.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "meta.structure.array.hjson",
      patterns: [
        { include: "#arrayContent" }
      ]
    },
    arrayArray: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.array.begin.hjson" }
      },
      end: /(\])(?:\p{space}*([^\]\,\p{space}]+))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.array.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "meta.structure.array.hjson",
      patterns: [
        { include: "#arrayContent" }
      ]
    },
    arrayConstant: {
      captures: {
        "1": { name: "constant.language.hjson" },
        "2": { name: "punctuation.separator.array.after-const.hjson" }
      },
      match: /\b(true|false|null)(?:[\t ]*(?=,)|[\t ]*(?:(,)[\t ]*)?(?=(?=\n?$)|#|\/\*|\/\/|\]))/dgv
    },
    arrayContent: {
      name: "meta.structure.array.hjson",
      patterns: [
        { include: "#comments" },
        { include: "#arrayValue" },
        {
          begin: /(?<=\[)|,/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.dictionary.pair.hjson" }
          },
          end: /(?=[^\#\,\/\p{space}])|(?=\/[^\*\/])/dgv,
          patterns: [
            { include: "#comments" },
            {
              match: /,/dgv,
              name: "invalid.illegal.extra-comma.hjson"
            }
          ]
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.array.hjson"
        },
        {
          match: /[^\]\p{space}]/dgv,
          name: "invalid.illegal.expected-array-separator.hjson"
        }
      ]
    },
    arrayJstring: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.hjson" }
          },
          end: /(")(?:\p{space}*((?:[^\]\#\,\/\p{space}]|\/[^\*\/])+))?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.hjson" },
            "2": { name: "invalid.illegal.value.hjson" }
          },
          name: "string.quoted.double.hjson",
          patterns: [
            { include: "#jstringDoubleContent" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.hjson" }
          },
          end: /(')(?:\p{space}*((?:[^\]\#\,\/\p{space}]|\/[^\*\/])+))?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.hjson" },
            "2": { name: "invalid.illegal.value.hjson" }
          },
          name: "string.quoted.single.hjson",
          patterns: [
            { include: "#jstringSingleContent" }
          ]
        }
      ]
    },
    arrayMstring: {
      begin: /'''/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.hjson" }
      },
      end: /(''')(?:\p{space}*((?:[^\]\#\,\/\p{space}]|\/[^\*\/])+))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "string.quoted.multiline.hjson"
    },
    arrayNumber: {
      captures: {
        "1": { name: "constant.numeric.hjson" },
        "2": { name: "punctuation.separator.array.after-num.hjson" }
      },
      match: /(-?(?:0|[1-9]\p{Nd}*)(?:\.\p{Nd}+)?(?:[Ee][\-\+]?\p{Nd}+)?)(?:[\t ]*(?=,)|[\t ]*(?:(,)[\t ]*)?(?=(?=\n?$)|#|\/\*|\/\/|\]))/dgv
    },
    arrayObject: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.dictionary.begin.hjson" }
      },
      end: /(\}|(?<=\}))(?:\p{space}*([^\]\,\p{space}]+))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.dictionary.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "meta.structure.dictionary.hjson",
      patterns: [
        { include: "#objectContent" }
      ]
    },
    arrayString: {
      patterns: [
        { include: "#arrayMstring" },
        { include: "#arrayJstring" },
        { include: "#ustring" }
      ]
    },
    arrayValue: {
      patterns: [
        { include: "#arrayNumber" },
        { include: "#arrayConstant" },
        { include: "#arrayString" },
        { include: "#arrayObject" },
        { include: "#arrayArray" }
      ]
    },
    comments: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          match: /^\p{space}*(#)[^\n]*\n?/dgv,
          name: "comment.line.hash"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          match: /^\p{space}*(\/\/)[^\n]*\n?/dgv,
          name: "comment.line.double-slash"
        },
        {
          begin: /^\p{space}*\/\*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          end: /\*\/(?:\p{space}*\n)?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          name: "comment.block.double-slash"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          match: /(#)[^\n]*/dgv,
          name: "comment.line.hash"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          match: /(\/\/)[^\n]*/dgv,
          name: "comment.line.double-slash"
        },
        {
          begin: /\/\*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          name: "comment.block.double-slash"
        }
      ]
    },
    commentsNewline: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          match: /(#)[^\n]*\n/dgv,
          name: "comment.line.hash"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          match: /(\/\/)[^\n]*\n/dgv,
          name: "comment.line.double-slash"
        },
        {
          begin: /\/\*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          end: /\*\/(\p{space}*\n)?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.comment.hjson" }
          },
          name: "comment.block.double-slash"
        }
      ]
    },
    constant: {
      captures: {
        "1": { name: "constant.language.hjson" }
      },
      match: /\b(true|false|null)[\t ]*(?=(?=\n?$)|#|\/\*|\/\/|\])/dgv
    },
    jstring: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.hjson" }
          },
          end: /(")(?:\p{space}*((?:[^\#\/\p{space}]|\/[^\*\/])[^\n]*)(?=\n?$))?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.hjson" },
            "2": { name: "invalid.illegal.value.hjson" }
          },
          name: "string.quoted.double.hjson",
          patterns: [
            { include: "#jstringDoubleContent" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.hjson" }
          },
          end: /(')(?:\p{space}*((?:[^\#\/\p{space}]|\/[^\*\/])[^\n]*)(?=\n?$))?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.hjson" },
            "2": { name: "invalid.illegal.value.hjson" }
          },
          name: "string.quoted.single.hjson",
          patterns: [
            { include: "#jstringSingleContent" }
          ]
        }
      ]
    },
    jstringDoubleContent: {
      patterns: [
        {
          match: /\\(?:["'\/\\bfnrt]|u\p{AHex}{4})/dgv,
          name: "constant.character.escape.hjson"
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.unrecognized-string-escape.hjson"
        },
        {
          match: /[^"]*[^\n\r"\\](?=\n?$)/dgv,
          name: "invalid.illegal.string.hjson"
        }
      ]
    },
    jstringSingleContent: {
      patterns: [
        {
          match: /\\(?:["'\/\\bfnrt]|u\p{AHex}{4})/dgv,
          name: "constant.character.escape.hjson"
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.unrecognized-string-escape.hjson"
        },
        {
          match: /[^']*[^\n\r'\\](?=\n?$)/dgv,
          name: "invalid.illegal.string.hjson"
        }
      ]
    },
    key: {
      begin: /([^\]"'\,\:\[\{\}\p{space}][^\]\,\:\[\{\}\p{space}]*|'(?:[^'\\]|(\\(?:["'\/\\bfnrt]|u\p{AHex}{4}))|(\\[^\n]))*'|"(?:[^"\\]|(\\(?:["'\/\\bfnrt]|u\p{AHex}{4}))|(\\[^\n]))*")\p{space}*(?!\n)([\]\,\[\{\}]*)/dgv,
      beginCaptures: {
        "0": { name: "meta.structure.key-value.begin.hjson" },
        "1": { name: "support.type.property-name.hjson" },
        "2": { name: "constant.character.escape.hjson" },
        "3": { name: "invalid.illegal.unrecognized-string-escape.hjson" },
        "4": { name: "constant.character.escape.hjson" },
        "5": { name: "invalid.illegal.unrecognized-string-escape.hjson" },
        "6": { name: "invalid.illegal.separator.hjson" },
        "7": { name: "invalid.illegal.property-name.hjson" }
      },
      end: /(?<!^|:)\p{space}*\n|(?=\})|(,)/dgv,
      endCaptures: {
        "1": { name: "punctuation.separator.dictionary.pair.hjson" }
      },
      patterns: [
        { include: "#commentsNewline" },
        { include: "#keyValue" },
        {
          match: /\P{space}/dgv,
          name: "invalid.illegal.object-property.hjson"
        }
      ]
    },
    keyValue: {
      begin: /\p{space}*(:)\p{space}*([\]\,\}]*)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.separator.dictionary.key-value.hjson" },
        "2": { name: "invalid.illegal.object-property.hjson" }
      },
      end: /(?<!^)\p{space}*(?=\n)|(?=[\,\}])/dgv,
      name: "meta.structure.key-value.hjson",
      patterns: [
        { include: "#comments" },
        {
          match: /^\p{space}+/dgv
        },
        { include: "#objectValue" },
        {
          captures: {
            "1": { name: "invalid.illegal.object-property.closing-bracket.hjson" }
          },
          match: /^\p{space}*(\})/dgv
        },
        {
          match: /\P{space}/dgv,
          name: "invalid.illegal.object-property.hjson"
        }
      ]
    },
    mstring: {
      begin: /'''/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.hjson" }
      },
      end: /(''')(?:\p{space}*((?:[^\#\/\p{space}]|\/[^\*\/])[^\n]*)(?=\n?$))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "string.quoted.multiline.hjson"
    },
    number: {
      captures: {
        "1": { name: "constant.numeric.hjson" }
      },
      match: /(-?(?:0|[1-9]\p{Nd}*)(?:\.\p{Nd}+)?(?:[Ee][\-\+]?\p{Nd}+)?)[\t ]*(?=(?=\n?$)|#|\/\*|\/\/|\])/dgv
    },
    object: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.dictionary.begin.hjson" }
      },
      end: /(\}|(?<=\}))(?:\p{space}*([^\,\p{space}]+))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.dictionary.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "meta.structure.dictionary.hjson",
      patterns: [
        { include: "#objectContent" }
      ]
    },
    objectArray: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.array.begin.hjson" }
      },
      end: /(\])(?:\p{space}*([^\,\}\p{space}]+))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.array.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "meta.structure.array.hjson",
      patterns: [
        { include: "#arrayContent" }
      ]
    },
    objectConstant: {
      captures: {
        "1": { name: "constant.language.hjson" },
        "2": { name: "punctuation.separator.dictionary.pair.after-const.hjson" }
      },
      match: /\b(true|false|null)(?:[\t ]*(?=,)|[\t ]*(?:(,)[\t ]*)?(?=(?=\n?$)|#|\/\*|\/\/|\}))/dgv
    },
    objectContent: {
      patterns: [
        { include: "#comments" },
        { include: "#key" },
        {
          match: /:[\.\|\p{space}]/dgv,
          name: "invalid.illegal.object-property.hjson"
        },
        {
          begin: /(?<=[\,\{])|,/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.dictionary.pair.hjson" }
          },
          end: /(?=[^\#\,\/\p{space}])|(?=\/[^\*\/])/dgv,
          patterns: [
            { include: "#comments" },
            {
              match: /,/dgv,
              name: "invalid.illegal.extra-comma.hjson"
            }
          ]
        },
        {
          match: /\P{space}/dgv,
          name: "invalid.illegal.object-property.hjson"
        }
      ]
    },
    objectJstring: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.hjson" }
          },
          end: /(")(?:\p{space}*((?:[^\#\,\/\}\p{space}]|\/[^\*\/])+))?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.hjson" },
            "2": { name: "invalid.illegal.value.hjson" }
          },
          name: "string.quoted.double.hjson",
          patterns: [
            { include: "#jstringDoubleContent" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.hjson" }
          },
          end: /(')(?:\p{space}*((?:[^\#\,\/\}\p{space}]|\/[^\*\/])+))?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.hjson" },
            "2": { name: "invalid.illegal.value.hjson" }
          },
          name: "string.quoted.single.hjson",
          patterns: [
            { include: "#jstringSingleContent" }
          ]
        }
      ]
    },
    objectMstring: {
      begin: /'''/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.hjson" }
      },
      end: /(''')(?:\p{space}*((?:[^\#\,\/\}\p{space}]|\/[^\*\/])+))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "string.quoted.multiline.hjson"
    },
    objectNumber: {
      captures: {
        "1": { name: "constant.numeric.hjson" },
        "2": { name: "punctuation.separator.dictionary.pair.after-num.hjson" }
      },
      match: /(-?(?:0|[1-9]\p{Nd}*)(?:\.\p{Nd}+)?(?:[Ee][\-\+]?\p{Nd}+)?)(?:[\t ]*(?=,)|[\t ]*(?:(,)[\t ]*)?(?=(?=\n?$)|#|\/\*|\/\/|\}))/dgv
    },
    objectObject: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.dictionary.begin.hjson" }
      },
      end: /(\}|(?<=\})\}?)(?:\p{space}*([^\,\}\p{space}]+))?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.dictionary.end.hjson" },
        "2": { name: "invalid.illegal.value.hjson" }
      },
      name: "meta.structure.dictionary.hjson",
      patterns: [
        { include: "#objectContent" }
      ]
    },
    objectString: {
      patterns: [
        { include: "#objectMstring" },
        { include: "#objectJstring" },
        { include: "#ustring" }
      ]
    },
    objectValue: {
      patterns: [
        { include: "#objectNumber" },
        { include: "#objectConstant" },
        { include: "#objectString" },
        { include: "#objectObject" },
        { include: "#objectArray" }
      ]
    },
    string: {
      patterns: [
        { include: "#mstring" },
        { include: "#jstring" },
        { include: "#ustring" }
      ]
    },
    ustring: {
      match: /([^\]\,\:\[\{\}\p{space}][^\n]*)(?=\n?$)/dgv,
      name: "string.quoted.none.hjson"
    },
    value: {
      patterns: [
        { include: "#number" },
        { include: "#constant" },
        { include: "#string" },
        { include: "#object" },
        { include: "#array" }
      ]
    }
  },
  dependencies: []
};
