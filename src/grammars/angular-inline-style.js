export default {
  name: "angular-inline-style",
  scopeName: "inline-styles.ng",
  patterns: [
    { include: "#inlineStyles" }
  ],
  repository: {
    inlineStyles: {
      begin: /(styles)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "meta.object-literal.key.ts" },
        "2": { name: "meta.object-literal.key.ts punctuation.separator.key-value.ts" }
      },
      end: /(?=[\,\}])/dgv,
      patterns: [
        { include: "#tsParenExpression" },
        { include: "#tsBracketExpression" },
        { include: "#style" }
      ]
    },
    style: {
      begin: /\p{space}*(["'\`\|])/dgv,
      beginCaptures: {
        "1": { name: "string" }
      },
      contentName: "source.css.scss",
      end: /1/dgv,
      endCaptures: {
        "0": { name: "string" }
      },
      patterns: [
        { include: "source.css.scss" }
      ]
    },
    tsBracketExpression: {
      begin: {
        G: [/￿\p{space}*(\[)/dgv, /\p{space}*(\[)/dgvy]
      },
      beginCaptures: {
        "1": { name: "meta.array.literal.ts meta.brace.square.ts" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.array.literal.ts meta.brace.square.ts" }
      },
      patterns: [
        { include: "#style" }
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
        { include: "$self" },
        { include: "#tsBracketExpression" },
        { include: "#style" }
      ]
    }
  },
  injectionSelector: "L:source.ts#meta.decorator.ts -comment",
  injectTo: [
    "source.ts.ng"
  ],
  dependencies: [
    "scss"
  ]
};
