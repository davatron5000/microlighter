export default {
  name: "qmldir",
  displayName: "QML Directory",
  scopeName: "source.qmldir",
  patterns: [
    { include: "#comment" },
    { include: "#keywords" },
    { include: "#version" },
    { include: "#names" }
  ],
  repository: {
    comment: {
      patterns: [
        {
          begin: /#/dgv,
          end: /(?=\n?$)/dgv,
          name: "comment.line.number-sign.qmldir"
        }
      ]
    },
    "file-name": {
      patterns: [
        {
          match: /\b[\p{L}\p{M}\p{N}\p{Pc}]+\.(qmltypes|qml|js)\b/dgv,
          name: "string.unquoted.qmldir"
        }
      ]
    },
    identifier: {
      patterns: [
        {
          match: /\b[\p{L}\p{M}\p{N}\p{Pc}]+\b/dgv,
          name: "variable.parameter.qmldir"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(module|singleton|internal|plugin|classname|typeinfo|depends|designersupported)\b/dgv,
          name: "keyword.other.qmldir"
        }
      ]
    },
    "module-name": {
      patterns: [
        {
          match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
          name: "entity.name.type.qmldir"
        }
      ]
    },
    names: {
      patterns: [
        { include: "#file-name" },
        { include: "#module-name" },
        { include: "#identifier" }
      ]
    },
    version: {
      patterns: [
        {
          match: /\b\p{Nd}+\.\p{Nd}+\b/dgv,
          name: "constant.numeric.qml"
        }
      ]
    }
  },
  dependencies: []
};
