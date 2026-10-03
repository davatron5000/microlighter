export default {
  name: "es-tag-xml",
  scopeName: "inline.es6-xml",
  patterns: [
    {
      begin: /(\p{space}?\/\*\p{space}?(xml|svg|inline-svg|inline-xml)\p{space}?\*\/\p{space}?)(`)/dgiv,
      beginCaptures: {
        "1": { name: "comment.block" }
      },
      end: /(`)/dgv,
      patterns: [
        { include: "text.xml" }
      ]
    },
    {
      begin: /(\p{space}*((?:|inline-)xml))(`)/dgiv,
      beginCaptures: {
        "1": { name: "comment.block" }
      },
      end: /(`)/dgv,
      patterns: [
        { include: "text.xml" }
      ]
    },
    {
      begin: /(?<=[\(\,\:\=\p{space}]|\$\()\p{space}*(((\/\*)|(\/\/))\p{space}?(xml|svg|inline-svg|inline-xml) {0,1000}\*?\/?) {0,1000}(?=\n?$)/dgiv,
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
        { include: "text.xml" }
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
    "xml"
  ]
};
