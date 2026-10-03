export default {
  name: "edge",
  displayName: "Edge",
  scopeName: "text.html.edge",
  patterns: [
    { include: "text.html.basic" },
    { include: "text.html.derivative" }
  ],
  repository: {
    comment: {
      begin: /\{\{--/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.begin.edge" }
      },
      end: /--\}\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.end.edge" }
      },
      name: "comment.block"
    },
    escapedMustache: {
      begin: /@\{\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.begin.edge" }
      },
      end: /\}\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.end.edge" }
      },
      name: "comment.block"
    },
    mustache: {
      begin: /\{\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.mustache.begin" }
      },
      end: /\}\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.mustache.end" }
      },
      name: "meta.embedded.block.javascript",
      patterns: [
        { include: "source.ts#expression" }
      ]
    },
    nonSeekableTag: {
      captures: {
        "2": { name: "support.function.edge" }
      },
      match: /^(\p{space}*)((@{1,2})(!)?([\.A-Z_a-z]+))(~)?(?=\n?$)/dgv,
      name: "meta.embedded.block.javascript",
      patterns: [
        { include: "source.ts#expression" }
      ]
    },
    safeMustache: {
      begin: /\{\{\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.mustache.begin" }
      },
      end: /\}\}\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.mustache.end" }
      },
      name: "meta.embedded.block.javascript",
      patterns: [
        { include: "source.ts#expression" }
      ]
    },
    tag: {
      begin: /^(\p{space}*)((@{1,2})(!)?([\.A-Z_a-z]+)(\p{space}{0,2}))(\()/dgv,
      beginCaptures: {
        "2": { name: "support.function.edge" },
        "7": { name: "punctuation.paren.open" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.paren.close" }
      },
      name: "meta.embedded.block.javascript",
      patterns: [
        { include: "source.ts#expression" }
      ]
    }
  },
  injections: {
    "text.html.edge - (meta.embedded | meta.tag | comment.block.edge), L:(text.html.edge meta.tag - (comment.block.edge | meta.embedded.block.edge)), L:(source.ts.embedded.html - (comment.block.edge | meta.embedded.block.edge))": {
      patterns: [
        { include: "#comment" },
        { include: "#escapedMustache" },
        { include: "#safeMustache" },
        { include: "#mustache" },
        { include: "#nonSeekableTag" },
        { include: "#tag" }
      ]
    }
  },
  dependencies: [
    "typescript",
    "html",
    "html-derivative"
  ]
};
