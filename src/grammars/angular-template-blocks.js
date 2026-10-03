export default {
  name: "angular-template-blocks",
  scopeName: "template.blocks.ng",
  patterns: [
    { include: "#block" }
  ],
  repository: {
    block: {
      begin: /(@)(if|else if|else|defer|placeholder|loading|error|switch|case|default|for|empty)\p{space}*/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.block.kind.ng" }
      },
      end: /(?<=\})/dgv,
      name: "control.block.ng",
      patterns: [
        { include: "#blockExpression" },
        { include: "#blockBody" }
      ]
    },
    blockBody: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.ts" }
      },
      contentName: "control.block.body.ng",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.ts" }
      },
      patterns: [
        { include: "text.html.derivative.ng" },
        { include: "template.ng" }
      ]
    },
    blockExpression: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.ts" }
      },
      contentName: "control.block.expression.ng",
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.ts" }
      },
      patterns: [
        { include: "#blockExpressionOfClause" },
        { include: "#blockExpressionLetBinding" },
        { include: "#blockExpressionTrackClause" },
        { include: "expression.ng" }
      ]
    },
    blockExpressionLetBinding: {
      begin: /\blet\b/dgv,
      beginCaptures: {
        "0": { name: "storage.type.ng" }
      },
      end: /(?=[\$\)])|(?<=;)/dgv,
      patterns: [
        { include: "expression.ng" }
      ]
    },
    blockExpressionOfClause: {
      begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}+(of)\b/dgv,
      beginCaptures: {
        "1": { name: "variable.other.constant.ng" },
        "2": { name: "keyword.operator.expression.of.ng" }
      },
      end: /(?=[\$\)])|(?<=;)/dgv,
      patterns: [
        { include: "expression.ng" }
      ]
    },
    blockExpressionTrackClause: {
      begin: /\btrack\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.track.ng" }
      },
      end: /(?=[\$\)])|(?<=;)/dgv,
      patterns: [
        { include: "expression.ng" }
      ]
    },
    transition: {
      match: /@/dgv,
      name: "keyword.control.block.transition.ng"
    }
  },
  injectionSelector: "L:text.html -comment -expression.ng -meta.tag -source.css -source.js",
  injectTo: [
    "text.html.derivative",
    "text.html.derivative.ng",
    "source.ts.ng"
  ],
  dependencies: [
    "angular-expression",
    "angular-template"
  ]
};
