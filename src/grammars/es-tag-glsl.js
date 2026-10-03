export default {
  name: "es-tag-glsl",
  scopeName: "inline.es6-glsl",
  patterns: [
    {
      begin: /(\p{space}?\/\*\p{space}?((?:|inline-)glsl)\p{space}?\*\/\p{space}?)(`)/dgiv,
      beginCaptures: {
        "1": { name: "comment.block" }
      },
      end: /(`)/dgv,
      patterns: [
        { include: "source.ts#template-substitution-element" },
        { include: "source.glsl" },
        { include: "inline.es6-htmlx#template" }
      ]
    },
    {
      begin: /(\p{space}*((?:|inline-)glsl))(`)/dgiv,
      beginCaptures: {
        "1": { name: "comment.block" }
      },
      end: /(`)/dgv,
      patterns: [
        { include: "source.ts#template-substitution-element" },
        { include: "source.glsl" },
        { include: "inline.es6-htmlx#template" },
        { include: "string.quoted.other.template.js" }
      ]
    },
    {
      begin: /(?<=[\(\,\:\=\p{space}]|\$\()\p{space}*(((\/\*)|(\/\/))\p{space}?((?:|inline-)glsl) {0,1000}\*?\/?) {0,1000}(?=\n?$)/dgiv,
      beginCaptures: {
        "1": { name: "comment.line" }
      },
      end: /(`)[^\n]*/dgv,
      patterns: [
        {
          begin: {
            G: [/￿()/dgv, /()/dgvy]
          },
          end: /(`)/dgv
        },
        { include: "source.ts#template-substitution-element" },
        { include: "source.glsl" }
      ]
    },
    {
      begin: /(\$\{)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.tag" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "entity.name.tag" }
      },
      patterns: [
        { include: "source.ts#template-substitution-element" },
        { include: "source.js" }
      ]
    }
  ],
  injections: {
    "L:source": {
      patterns: [
        {
          match: /</dgv,
          name: "invalid.illegal.bad-angle-bracket.html"
        }
      ]
    }
  },
  injectionSelector: "L:source.js -comment -string, L:source.js -comment -string, L:source.jsx -comment -string,  L:source.js.jsx -comment -string, L:source.ts -comment -string, L:source.tsx -comment -string, L:source.rescript -comment -string",
  injectTo: [
    "source.ts",
    "source.js"
  ],
  dependencies: [
    "typescript",
    "glsl",
    "javascript"
  ]
};
