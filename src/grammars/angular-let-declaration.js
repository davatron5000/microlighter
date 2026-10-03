export default {
  name: "angular-let-declaration",
  scopeName: "template.let.ng",
  patterns: [
    { include: "#letDeclaration" }
  ],
  repository: {
    letDeclaration: {
      begin: /(@let)\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(=)?/dgv,
      beginCaptures: {
        "1": { name: "storage.type.ng" },
        "2": { name: "variable.other.constant.ng" },
        "3": { name: "keyword.operator.assignment.ng" }
      },
      end: /(?<=;)/dgv,
      name: "meta.definition.variable.ng",
      patterns: [
        { include: "#letInitializer" }
      ]
    },
    letInitializer: {
      begin: /\p{space}*/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.assignment.ng" }
      },
      contentName: "meta.definition.variable.initializer.ng",
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.statement.ng" }
      },
      patterns: [
        { include: "expression.ng" }
      ]
    }
  },
  injectionSelector: "L:text.html -comment -expression.ng -meta.tag -source.css -source.js",
  injectTo: [
    "text.html.derivative",
    "text.html.derivative.ng",
    "source.ts.ng"
  ],
  dependencies: [
    "angular-expression"
  ]
};
