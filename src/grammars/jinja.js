export default {
  name: "jinja",
  displayName: "Jinja",
  scopeName: "source.jinja",
  patterns: [
    {
      begin: /(\{%)\p{space}*(raw)\p{space}*(%\})/dgv,
      captures: {
        "1": { name: "entity.other.jinja.delimiter.tag" },
        "2": { name: "keyword.control.jinja" },
        "3": { name: "entity.other.jinja.delimiter.tag" }
      },
      end: /(\{%)\p{space}*(endraw)\p{space}*(%\})/dgv,
      name: "comment.block.jinja.raw"
    },
    { include: "#comments" },
    {
      begin: /\{\{-?/dgv,
      captures: [
        { name: "variable.entity.other.jinja.delimiter" }
      ],
      end: /-?\}\}/dgv,
      name: "variable.meta.scope.jinja",
      patterns: [
        { include: "#expression" }
      ]
    },
    {
      begin: /\{%-?/dgv,
      captures: [
        { name: "entity.other.jinja.delimiter.tag" }
      ],
      end: /-?%\}/dgv,
      name: "meta.scope.jinja.tag",
      patterns: [
        { include: "#expression" }
      ]
    }
  ],
  repository: {
    comments: {
      begin: /\{#-?/dgv,
      captures: [
        { name: "entity.other.jinja.delimiter.comment" }
      ],
      end: /-?#\}/dgv,
      name: "comment.block.jinja",
      patterns: [
        { include: "#comments" }
      ]
    },
    escaped_char: {
      match: /\\x[0-9A-F]{2}/dgv,
      name: "constant.character.escape.hex.jinja"
    },
    escaped_unicode_char: {
      captures: {
        "1": { name: "constant.character.escape.unicode.16-bit-hex.jinja" },
        "2": { name: "constant.character.escape.unicode.32-bit-hex.jinja" },
        "3": { name: "constant.character.escape.unicode.name.jinja" }
      },
      match: /(\\U\p{AHex}{8})|(\\u\p{AHex}{4})|(\\N\{[ A-Za-z]+\})/dgv
    },
    expression: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.jinja" },
            "2": { name: "variable.other.jinja.block" }
          },
          match: /\p{space}*\b(block)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control.jinja" },
            "2": { name: "variable.other.jinja.filter" }
          },
          match: /\p{space}*\b(filter)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control.jinja" },
            "2": { name: "variable.other.jinja.test" }
          },
          match: /\p{space}*\b(is)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control.jinja" }
          },
          match: /(?<=\{%-?)\p{space}*\b([A-Z_a-z][0-9A-Z_a-z]*)\b(?!\p{space}*[\,\=])/dgv
        },
        {
          match: /\b(and|else|if|in|import|not|or|recursive|with(out)?\p{space}+context)\b/dgv,
          name: "keyword.control.jinja"
        },
        {
          match: /\b(true|false|none)\b/dgv,
          name: "constant.language.jinja"
        },
        {
          match: /\b(loop|super|self|varargs|kwargs)\b/dgv,
          name: "variable.language.jinja"
        },
        {
          match: /[A-Z_a-z][0-9A-Z_a-z]*/dgv,
          name: "variable.other.jinja"
        },
        {
          match: /([\-\+]|\*\*?|\/\/|[\%\/])/dgv,
          name: "keyword.operator.arithmetic.jinja"
        },
        {
          captures: {
            "1": { name: "punctuation.other.jinja" },
            "2": { name: "variable.other.jinja.filter" }
          },
          match: /(\|)([A-Z_a-z][0-9A-Z_a-z]*)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.other.jinja" },
            "2": { name: "variable.other.jinja.attribute" }
          },
          match: /(\.)([A-Z_a-z][0-9A-Z_a-z]*)/dgv
        },
        {
          begin: /\[/dgv,
          captures: [
            { name: "punctuation.other.jinja" }
          ],
          end: /\]/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /\(/dgv,
          captures: [
            { name: "punctuation.other.jinja" }
          ],
          end: /\)/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /\{/dgv,
          captures: [
            { name: "punctuation.other.jinja" }
          ],
          end: /\}/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /([\,\.\:\|])/dgv,
          name: "punctuation.other.jinja"
        },
        {
          match: /(==|<=|=>|[\<\>]|!=)/dgv,
          name: "keyword.operator.comparison.jinja"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.jinja"
        },
        {
          begin: /"/dgv,
          beginCaptures: [
            { name: "punctuation.definition.string.begin.jinja" }
          ],
          end: /"/dgv,
          endCaptures: [
            { name: "punctuation.definition.string.end.jinja" }
          ],
          name: "string.quoted.double.jinja",
          patterns: [
            { include: "#string" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: [
            { name: "punctuation.definition.string.begin.jinja" }
          ],
          end: /'/dgv,
          endCaptures: [
            { name: "punctuation.definition.string.end.jinja" }
          ],
          name: "string.quoted.single.jinja",
          patterns: [
            { include: "#string" }
          ]
        },
        {
          begin: /@\//dgv,
          beginCaptures: [
            { name: "punctuation.definition.regexp.begin.jinja" }
          ],
          end: /\//dgv,
          endCaptures: [
            { name: "punctuation.definition.regexp.end.jinja" }
          ],
          name: "string.regexp.jinja",
          patterns: [
            { include: "#simple_escapes" }
          ]
        }
      ]
    },
    simple_escapes: {
      captures: {
        "1": { name: "constant.character.escape.newline.jinja" },
        "2": { name: "constant.character.escape.backlash.jinja" },
        "3": { name: "constant.character.escape.double-quote.jinja" },
        "4": { name: "constant.character.escape.single-quote.jinja" },
        "5": { name: "constant.character.escape.bell.jinja" },
        "6": { name: "constant.character.escape.backspace.jinja" },
        "7": { name: "constant.character.escape.formfeed.jinja" },
        "8": { name: "constant.character.escape.linefeed.jinja" },
        "9": { name: "constant.character.escape.return.jinja" },
        "10": { name: "constant.character.escape.tab.jinja" },
        "11": { name: "constant.character.escape.vertical-tab.jinja" }
      },
      match: /(\\\n)|(\\\\)|(\\")|(\\')|(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)/dgv
    },
    string: {
      patterns: [
        { include: "#simple_escapes" },
        { include: "#escaped_char" },
        { include: "#escaped_unicode_char" }
      ]
    }
  },
  dependencies: [
    "jinja-html"
  ]
};
