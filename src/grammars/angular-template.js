export default {
  name: "angular-template",
  scopeName: "template.ng",
  patterns: [
    { include: "#interpolation" }
  ],
  repository: {
    interpolation: {
      begin: /\{\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.ts" }
      },
      contentName: "expression.ng",
      end: /\}\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.ts" }
      },
      patterns: [
        { include: "expression.ng" }
      ]
    }
  },
  injectionSelector: "L:text.html -comment",
  injectTo: [
    "text.html.derivative",
    "text.html.derivative.ng",
    "source.ts.ng"
  ],
  dependencies: [
    "angular-expression"
  ]
};
