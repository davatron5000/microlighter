export default {
  name: "angular-html",
  displayName: "Angular HTML",
  scopeName: "text.html.derivative.ng",
  patterns: [
    { include: "text.html.basic#core-minus-invalid" },
    {
      begin: /(<\/?)([\p{L}\p{M}\p{N}\p{Pc}][^\>\p{space}]*)(?<!\/)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html" },
        "2": { name: "entity.name.tag.html" }
      },
      end: /((?: ?\/)?>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html" }
      },
      name: "meta.tag.other.unrecognized.html.derivative",
      patterns: [
        { include: "text.html.basic#attribute" }
      ]
    }
  ],
  injections: {
    "R:text.html - (comment.block, text.html meta.embedded, meta.tag.*.*.html, meta.tag.*.*.*.html, meta.tag.*.*.*.*.html)": {
      patterns: [
        {
          match: /</dgv,
          name: "invalid.illegal.bad-angle-bracket.html"
        }
      ]
    }
  },
  dependencies: [
    "html",
    "angular-expression",
    "angular-let-declaration",
    "angular-template",
    "angular-template-blocks"
  ]
};
