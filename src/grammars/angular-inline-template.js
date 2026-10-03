export default {
  name: "angular-inline-template",
  scopeName: "inline-template.ng",
  patterns: [
    { include: "#inlineTemplate" }
  ],
  repository: {
    inlineTemplate: {
      begin: /(template)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "meta.object-literal.key.ts" },
        "2": { name: "meta.object-literal.key.ts punctuation.separator.key-value.ts" }
      },
      end: /(?=[\,\}])/dgv,
      patterns: [
        { include: "#tsParenExpression" },
        { include: "#ngTemplate" }
      ]
    },
    ngTemplate: {
      begin: {
        G: [/￿\p{space}*(["'\`\|])/dgv, /\p{space}*(["'\`\|])/dgvy]
      },
      beginCaptures: {
        "1": { name: "string" }
      },
      contentName: "text.html.derivative.ng",
      end: /1/dgv,
      endCaptures: {
        "0": { name: "string" }
      },
      patterns: [
        { include: "text.html.derivative.ng" },
        { include: "template.ng" }
      ]
    },
    tsParenExpression: {
      begin: {
        G: [/￿\p{space}*(\()/dgv, /\p{space}*(\()/dgvy]
      },
      beginCaptures: {
        "1": { name: "meta.brace.round.ts" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.ts" }
      },
      patterns: [
        { include: "#tsParenExpression" },
        { include: "#ngTemplate" }
      ]
    }
  },
  injectionSelector: "L:meta.decorator.ts -comment -text.html",
  injectTo: [
    "source.ts.ng"
  ],
  dependencies: [
    "angular-html",
    "angular-template"
  ]
};
