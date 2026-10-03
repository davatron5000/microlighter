export default {
  name: "fluent",
  displayName: "Fluent",
  aliases: [
    "ftl"
  ],
  scopeName: "source.ftl",
  patterns: [
    { include: "#comment" },
    { include: "#message" },
    { include: "#wrong-line" }
  ],
  repository: {
    attributes: {
      begin: /\p{space}*(\.[A-Za-z][\-0-9A-Z_a-z]*\p{space}*=\p{space}*)/dgv,
      beginCaptures: {
        "1": { name: "support.class.attribute-begin.fluent" }
      },
      end: /^(?=\p{space}*[^\.])/dgv,
      patterns: [
        { include: "#placeable" }
      ]
    },
    comment: {
      match: /^##?#?\p{space}[^\n]*(?=\n?$)/dgv,
      name: "comment.fluent"
    },
    "function-comma": {
      match: /,/dgv,
      name: "support.function.function-comma.fluent"
    },
    "function-named-argument": {
      begin: /([0-9A-Za-z]+:)\p{space}*(["0-9A-Za-z]+)/dgv,
      beginCaptures: {
        "1": { name: "support.function.named-argument.name.fluent" },
        "2": { name: "variable.other.named-argument.value.fluent" }
      },
      end: /(?=[\)\,\p{space}])/dgv,
      name: "variable.other.named-argument.fluent"
    },
    "function-positional-argument": {
      match: /\$[\-0-9A-Z_a-z]+/dgv,
      name: "variable.other.function.positional-argument.fluent"
    },
    "invalid-placeable-string-missing-end-quote": {
      match: /"[^"]+(?=\n?$)/dgv,
      name: "invalid.illegal.wrong-placeable-missing-end-quote.fluent"
    },
    "invalid-placeable-wrong-placeable-missing-end": {
      match: /([^A-Z\}]*|[^\-][^\>])(?=\n?$)\b/dgv,
      name: "invalid.illegal.wrong-placeable-missing-end.fluent"
    },
    message: {
      begin: /^(-?[A-Za-z][\-0-9A-Z_a-z]*\p{space}*=\p{space}*)/dgv,
      beginCaptures: {
        "1": { name: "support.class.message-identifier.fluent" }
      },
      contentName: "string.fluent",
      end: /^(?=\P{space})/dgv,
      patterns: [
        { include: "#attributes" },
        { include: "#placeable" }
      ]
    },
    placeable: {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.placeable.begin.fluent" }
      },
      contentName: "variable.other.placeable.content.fluent",
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "keyword.placeable.end.fluent" }
      },
      patterns: [
        { include: "#placeable-string" },
        { include: "#placeable-function" },
        { include: "#placeable-reference-or-number" },
        { include: "#selector" },
        { include: "#invalid-placeable-wrong-placeable-missing-end" },
        { include: "#invalid-placeable-string-missing-end-quote" },
        { include: "#invalid-placeable-wrong-function-name" }
      ]
    },
    "placeable-function": {
      begin: /([A-Z][\-0-9A-Z_]*\()/dgv,
      beginCaptures: {
        "1": { name: "support.function.placeable-function.call.begin.fluent" }
      },
      contentName: "string.placeable-function.fluent",
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "support.function.placeable-function.call.end.fluent" }
      },
      patterns: [
        { include: "#function-comma" },
        { include: "#function-positional-argument" },
        { include: "#function-named-argument" }
      ]
    },
    "placeable-reference-or-number": {
      match: /(([\-\$])[\-0-9A-Z_a-z]+|[A-Za-z][\-0-9A-Z_a-z]*|[0-9]+)/dgv,
      name: "variable.other.placeable.reference-or-number.fluent"
    },
    "placeable-string": {
      begin: /(")(?=[^\n]*")/dgv,
      beginCaptures: {
        "1": { name: "variable.other.placeable-string-begin.fluent" }
      },
      contentName: "string.placeable-string-content.fluent",
      end: /(")/dgv,
      endCaptures: {
        "1": { name: "variable.other.placeable-string-end.fluent" }
      }
    },
    selector: {
      begin: /(->)/dgv,
      beginCaptures: {
        "1": { name: "support.function.selector.begin.fluent" }
      },
      contentName: "string.selector.content.fluent",
      end: /^(?=\p{space}*\})/dgv,
      patterns: [
        { include: "#selector-item" }
      ]
    },
    "selector-item": {
      begin: /(\p{space}*\*?\[)([\-0-9A-Z_a-z]+)(\]\p{space}*)/dgv,
      beginCaptures: {
        "1": { name: "support.function.selector-item.begin.fluent" },
        "2": { name: "variable.other.selector-item.begin.fluent" },
        "3": { name: "support.function.selector-item.begin.fluent" }
      },
      contentName: "string.selector-item.content.fluent",
      end: /^(?=(\p{space}*\})|(\p{space}*\[)|(\p{space}*\*))/dgv,
      patterns: [
        { include: "#placeable" }
      ]
    },
    "wrong-line": {
      match: /[^\n]*/dgv,
      name: "invalid.illegal.wrong-line.fluent"
    }
  },
  dependencies: []
};
