export default {
  name: "bibtex",
  displayName: "BibTeX",
  scopeName: "text.bibtex",
  patterns: [
    {
      captures: {
        "0": { name: "punctuation.definition.comment.bibtex" }
      },
      match: /@comment(?=[\(\{\p{space}])/dgiv,
      name: "comment.block.at-sign.bibtex"
    },
    { include: "#preamble" },
    { include: "#string" },
    { include: "#entry" },
    {
      begin: /[^\n\@]/dgv,
      end: /(?=@)/dgv,
      name: "comment.block.bibtex"
    }
  ],
  repository: {
    entry: {
      patterns: [
        {
          begin: /((@)[\-\!\$\&\*\+\.\/\:\;\<\>-z\|\~][\!\$\&\*\+\--\<\>-z\|\~]*)\p{space}*(\{)\p{space}*([^\,\}\p{space}]*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.entry-type.bibtex" },
            "2": { name: "punctuation.definition.keyword.bibtex" },
            "3": { name: "punctuation.section.entry.begin.bibtex" },
            "4": { name: "entity.name.type.entry-key.bibtex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.entry.end.bibtex" }
          },
          name: "meta.entry.braces.bibtex",
          patterns: [
            {
              begin: /([\-\!\$\&\*\+\.\/\:\;\<\>-z\|\~][\!\$\&\*\+\--\<\>-z\|\~]*)\p{space}*(=)/dgv,
              beginCaptures: {
                "1": { name: "support.function.key.bibtex" },
                "2": { name: "punctuation.separator.key-value.bibtex" }
              },
              end: /(?=[\,\}])/dgv,
              name: "meta.key-assignment.bibtex",
              patterns: [
                { include: "#field_value" }
              ]
            }
          ]
        },
        {
          begin: /((@)[\-\!\$\&\*\+\.\/\:\;\<\>-z\|\~][\!\$\&\*\+\--\<\>-z\|\~]*)\p{space}*(\()\p{space}*([^\,\p{space}]*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.entry-type.bibtex" },
            "2": { name: "punctuation.definition.keyword.bibtex" },
            "3": { name: "punctuation.section.entry.begin.bibtex" },
            "4": { name: "entity.name.type.entry-key.bibtex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.entry.end.bibtex" }
          },
          name: "meta.entry.parenthesis.bibtex",
          patterns: [
            {
              begin: /([\-\!\$\&\*\+\.\/\:\;\<\>-z\|\~][\!\$\&\*\+\--\<\>-z\|\~]*)\p{space}*(=)/dgv,
              beginCaptures: {
                "1": { name: "support.function.key.bibtex" },
                "2": { name: "punctuation.separator.key-value.bibtex" }
              },
              end: /(?=[\)\,])/dgv,
              name: "meta.key-assignment.bibtex",
              patterns: [
                { include: "#field_value" }
              ]
            }
          ]
        }
      ]
    },
    field_value: {
      patterns: [
        { include: "#string_content" },
        { include: "#integer" },
        { include: "#string_var" },
        {
          match: /#/dgv,
          name: "keyword.operator.bibtex"
        }
      ]
    },
    integer: {
      captures: {
        "1": { name: "constant.numeric.bibtex" }
      },
      match: /\p{space}*(\p{Nd}+)\p{space}*/dgv
    },
    nested_braces: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.group.begin.bibtex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.group.end.bibtex" }
      },
      patterns: [
        { include: "#nested_braces" }
      ]
    },
    preamble: {
      patterns: [
        {
          begin: /((@)preamble)\p{space}*(\{)\p{space}*/dgiv,
          beginCaptures: {
            "1": { name: "keyword.other.preamble.bibtex" },
            "2": { name: "punctuation.definition.keyword.bibtex" },
            "3": { name: "punctuation.section.preamble.begin.bibtex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.preamble.end.bibtex" }
          },
          name: "meta.preamble.braces.bibtex",
          patterns: [
            { include: "#field_value" }
          ]
        },
        {
          begin: /((@)preamble)\p{space}*(\()\p{space}*/dgiv,
          beginCaptures: {
            "1": { name: "keyword.other.preamble.bibtex" },
            "2": { name: "punctuation.definition.keyword.bibtex" },
            "3": { name: "punctuation.section.preamble.begin.bibtex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.preamble.end.bibtex" }
          },
          name: "meta.preamble.parenthesis.bibtex",
          patterns: [
            { include: "#field_value" }
          ]
        }
      ]
    },
    string: {
      patterns: [
        {
          begin: /((@)[Ssſ][Tt][Rr][Ii][Nn][Gg])\p{space}*(\{)\p{space}*([\-\!\$\&\*\+\.\/\:\;\<\>-z\|\~][\!\$\&\*\+\--\<\>-z\|\~]*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.string-constant.bibtex" },
            "2": { name: "punctuation.definition.keyword.bibtex" },
            "3": { name: "punctuation.section.string-constant.begin.bibtex" },
            "4": { name: "variable.other.bibtex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.string-constant.end.bibtex" }
          },
          name: "meta.string-constant.braces.bibtex",
          patterns: [
            { include: "#field_value" }
          ]
        },
        {
          begin: /((@)[Ssſ][Tt][Rr][Ii][Nn][Gg])\p{space}*(\()\p{space}*([\-\!\$\&\*\+\.\/\:\;\<\>-z\|\~][\!\$\&\*\+\--\<\>-z\|\~]*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.string-constant.bibtex" },
            "2": { name: "punctuation.definition.keyword.bibtex" },
            "3": { name: "punctuation.section.string-constant.begin.bibtex" },
            "4": { name: "variable.other.bibtex" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.string-constant.end.bibtex" }
          },
          name: "meta.string-constant.parenthesis.bibtex",
          patterns: [
            { include: "#field_value" }
          ]
        }
      ]
    },
    string_content: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.bibtex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.bibtex" }
          },
          patterns: [
            { include: "#nested_braces" }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.bibtex" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.bibtex" }
          },
          patterns: [
            { include: "#nested_braces" }
          ]
        }
      ]
    },
    string_var: {
      captures: {
        "0": { name: "support.variable.bibtex" }
      },
      match: /[\-\!\$\&\*\+\.\/\:\;\<\>-z\|\~][\!\$\&\*\+\--\<\>-z\|\~]*/dgv
    }
  },
  dependencies: []
};
