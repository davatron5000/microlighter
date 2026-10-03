import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "erb",
  displayName: "ERB",
  scopeName: "text.html.erb",
  patterns: [
    { include: "text.html.basic" }
  ],
  repository: {
    comment: {
      patterns: [
        {
          begin: /<%+#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.erb" }
          },
          end: /%>/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.erb" }
          },
          name: "comment.block.erb"
        }
      ]
    },
    tags: {
      patterns: [
        {
          begin: /<%+(?!>)[\-\=]?(?![^\%]*%>)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.erb" }
          },
          contentName: "source.ruby",
          end: /(-?%)>/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.erb" },
            "1": { name: "source.ruby" }
          },
          name: "meta.embedded.block.erb",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.comment.erb" }
              },
              match: /(#)[^\n]*?(?=-?%>)/dgv,
              name: "comment.line.number-sign.erb"
            },
            { include: "source.ruby" }
          ]
        },
        {
          begin: /<%+(?!>)[\-\=]?/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.erb" }
          },
          contentName: "source.ruby",
          end: /(-?%)>/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.erb" },
            "1": { name: "source.ruby" }
          },
          name: "meta.embedded.line.erb",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.comment.erb" }
              },
              match: /(#)[^\n]*?(?=-?%>)/dgv,
              name: "comment.line.number-sign.erb"
            },
            { include: "source.ruby" }
          ]
        }
      ]
    }
  },
  injections: {
    "text.html.erb - (meta.embedded.block.erb | meta.embedded.line.erb | comment)": {
      patterns: [
        {
          begin: /^(\p{space}*)(?=<%+#(?![^\%]*%>))/dgv,
          beginCaptures: {
            "0": { name: "punctuation.whitespace.comment.leading.erb" }
          },
          end: {
            G: [/(?!￿)(\p{space}*(?=\n?$)\n)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n)?", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "0": { name: "punctuation.whitespace.comment.trailing.erb" }
          },
          patterns: [
            { include: "#comment" }
          ]
        },
        {
          begin: /^(\p{space}*)(?=<%(?![^\%]*%>))/dgv,
          beginCaptures: {
            "0": { name: "punctuation.whitespace.embedded.leading.erb" }
          },
          end: {
            G: [/(?!￿)(\p{space}*(?=\n?$)\n)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n)?", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "0": { name: "punctuation.whitespace.embedded.trailing.erb" }
          },
          patterns: [
            { include: "#tags" }
          ]
        },
        { include: "#comment" },
        { include: "#tags" }
      ]
    }
  },
  dependencies: [
    "html",
    "ruby"
  ]
};
