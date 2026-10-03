export default {
  name: "tasl",
  displayName: "Tasl",
  scopeName: "source.tasl",
  patterns: [
    { include: "#comment" },
    { include: "#namespace" },
    { include: "#type" },
    { include: "#class" },
    { include: "#edge" }
  ],
  repository: {
    class: {
      begin: /^\p{space}*(class)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.tasl.class" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#key" },
        { include: "#export" },
        { include: "#expression" }
      ]
    },
    comment: {
      captures: {
        "1": { name: "punctuation.definition.comment.tasl" }
      },
      match: /(#)[^\n]*(?=\n?$)/dgv,
      name: "comment.line.number-sign.tasl"
    },
    component: {
      begin: /->/dgv,
      beginCaptures: {
        "0": { name: "punctuation.separator.tasl.component" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    coproduct: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.tasl.coproduct" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.tasl.coproduct" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#term" },
        { include: "#option" }
      ]
    },
    datatype: {
      match: /[A-Za-z][0-9A-Za-z]*:(?:[\!\$\&-\;\=\?-Z_a-z\~]|%\p{AHex}{2})+/dgv,
      name: "string.regexp"
    },
    edge: {
      begin: /^\p{space}*(edge)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.tasl.edge" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#key" },
        { include: "#export" },
        {
          match: /=\//dgv,
          name: "punctuation.separator.tasl.edge.source"
        },
        {
          match: /\/=>/dgv,
          name: "punctuation.separator.tasl.edge.target"
        },
        {
          match: /=>/dgv,
          name: "punctuation.separator.tasl.edge"
        },
        { include: "#expression" }
      ]
    },
    export: {
      match: /::/dgv,
      name: "keyword.operator.tasl.export"
    },
    expression: {
      patterns: [
        { include: "#literal" },
        { include: "#uri" },
        { include: "#product" },
        { include: "#coproduct" },
        { include: "#reference" },
        { include: "#optional" },
        { include: "#identifier" }
      ]
    },
    identifier: {
      captures: {
        "1": { name: "variable" }
      },
      match: /([A-Za-z][0-9A-Za-z]*)\b/dgv
    },
    key: {
      match: /[A-Za-z][0-9A-Za-z]*:(?:[\!\$\&-\;\=\?-Z_a-z\~]|%\p{AHex}{2})+/dgv,
      name: "markup.bold entity.name.class"
    },
    literal: {
      patterns: [
        { include: "#datatype" }
      ]
    },
    namespace: {
      captures: {
        "1": { name: "keyword.control.tasl.namespace" },
        "2": {
          patterns: [
            { include: "#namespaceURI" },
            {
              match: /[A-Za-z][0-9A-Za-z]*\b/dgv,
              name: "entity.name"
            }
          ]
        }
      },
      match: /^\p{space}*(namespace)\b([^\n]*)/dgv
    },
    namespaceURI: {
      match: /[a-z]+:[\]\!\#-\;\=\?-\[_a-z\~]+/dgv,
      name: "markup.underline.link"
    },
    option: {
      begin: /<-/dgv,
      beginCaptures: {
        "0": { name: "punctuation.separator.tasl.option" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    optional: {
      begin: /\?/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    product: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.tasl.product" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.tasl.product" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#term" },
        { include: "#component" }
      ]
    },
    reference: {
      captures: {
        "1": { name: "markup.bold keyword.operator" },
        "2": {
          patterns: [
            { include: "#key" }
          ]
        }
      },
      match: /(\*)\p{space}*([^\n]*)/dgv
    },
    term: {
      match: /[A-Za-z][0-9A-Za-z]*:(?:[\!\$\&-\;\=\?-Z_a-z\~]|%\p{AHex}{2})+/dgv,
      name: "entity.other.tasl.key"
    },
    type: {
      begin: /^\p{space}*(type)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.tasl.type" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    uri: {
      match: /<>/dgv,
      name: "variable.other.constant"
    }
  },
  dependencies: []
};
