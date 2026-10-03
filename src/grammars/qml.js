export default {
  name: "qml",
  displayName: "QML",
  scopeName: "source.qml",
  patterns: [
    {
      match: /\bpragma\p{space}+Singleton\b/dgv,
      name: "constant.language.qml"
    },
    { include: "#import-statements" },
    { include: "#object" },
    { include: "#comment" }
  ],
  repository: {
    "attributes-dictionary": {
      patterns: [
        { include: "#typename" },
        { include: "#keywords" },
        { include: "#identifier" },
        { include: "#attributes-value" },
        { include: "#comment" }
      ]
    },
    "attributes-value": {
      patterns: [
        {
          begin: /(?<=[\p{L}\p{M}\p{N}\p{Pc}])\p{space}*:\p{space}*(?=[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\p{space}*\{)/dgv,
          description: "A QML object as value.",
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#object" }
          ]
        },
        {
          begin: /(?<=[\p{L}\p{M}\p{N}\p{Pc}])\p{space}*:\p{space}*\[/dgv,
          description: "A list as value.",
          end: /\]([^\n]*)(?=\n?$)/dgv,
          endCaptures: {
            "0": {
              patterns: [
                { include: "source.js" }
              ]
            }
          },
          patterns: [
            { include: "#object" },
            { include: "source.js" }
          ]
        },
        {
          begin: /(?<=[\p{L}\p{M}\p{N}\p{Pc}])\p{space}*:(?=\p{space}*\{?\p{space}*(?=\n?$))/dgv,
          description: "A block of JavaScript code as value.",
          end: /(?<=\})/dgv,
          patterns: [
            {
              begin: /\{/dgv,
              contentName: "meta.embedded.block.js",
              end: /\}/dgv,
              patterns: [
                { include: "source.js" }
              ]
            }
          ]
        },
        {
          begin: /(?<=[\p{L}\p{M}\p{N}\p{Pc}])\p{space}*:/dgv,
          contentName: "meta.embedded.line.js",
          description: "A JavaScript expression as value.",
          end: /;|(?=\n?$)|(?=\})/dgv,
          patterns: [
            { include: "source.js" }
          ]
        }
      ]
    },
    comment: {
      patterns: [
        {
          begin: /(\/\/:)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.qml.tr" }
          },
          end: /(?=\n?$)/dgv,
          patterns: [
            { include: "#comment-contents" }
          ]
        },
        {
          begin: /(\/\/[\=\|\~])\p{space}*([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.qml.tr" },
            "2": { name: "variable.other.qml.tr" }
          },
          end: /(?=\n?$)/dgv,
          patterns: [
            { include: "#comment-contents" }
          ]
        },
        {
          begin: /(\/\/)/dgv,
          beginCaptures: {
            "1": { name: "comment.line.double-slash.qml" }
          },
          end: /(?=\n?$)/dgv,
          patterns: [
            { include: "#comment-contents" }
          ]
        },
        {
          begin: /(\/\*)/dgv,
          beginCaptures: {
            "1": { name: "comment.line.double-slash.qml" }
          },
          end: /(\*\/)/dgv,
          endCaptures: {
            "1": { name: "comment.line.double-slash.qml" }
          },
          patterns: [
            { include: "#comment-contents" }
          ]
        }
      ]
    },
    "comment-contents": {
      patterns: [
        {
          match: /\b(TODO|DEBUG|XXX)\b/dgv,
          name: "constant.language.qml"
        },
        {
          match: /\b(BUG|FIXME)\b/dgv,
          name: "invalid"
        },
        {
          match: /[^\n]/dgv,
          name: "comment.line.double-slash.qml"
        }
      ]
    },
    "data-types": {
      patterns: [
        {
          description: "QML basic data types.",
          match: /\b(bool|double|enum|int|list|real|string|url|variant|var)\b/dgv,
          name: "storage.type.qml"
        },
        {
          description: "QML modules basic data types.",
          match: /\b(date|point|rect|size)\b/dgv,
          name: "support.type.qml"
        }
      ]
    },
    "group-attributes": {
      patterns: [
        {
          begin: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "variable.parameter.qml" }
          },
          end: /\}/dgv,
          patterns: [
            { include: "$self" },
            { include: "#comment" },
            { include: "#attributes-dictionary" }
          ]
        }
      ]
    },
    identifier: {
      description: "The name of variable, key, signal and etc.",
      patterns: [
        {
          match: /\b[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
          name: "variable.parameter.qml"
        }
      ]
    },
    "import-statements": {
      patterns: [
        {
          begin: /\b(import)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.import.qml" }
          },
          end: /(?=\n?$)/dgv,
          patterns: [
            {
              match: /\bas\b/dgv,
              name: "keyword.control.as.qml"
            },
            { include: "#string" },
            {
              description: "<Version.Number>",
              match: /\b\p{Nd}+\.\p{Nd}+\b/dgv,
              name: "constant.numeric.qml"
            },
            {
              description: "as <Namespace>",
              match: /(?<=as)\p{space}+[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
              name: "entity.name.type.qml"
            },
            { include: "#identifier" },
            { include: "#comment" }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        { include: "#data-types" },
        { include: "#reserved-words" }
      ]
    },
    "method-attributes": {
      patterns: [
        {
          begin: /\b(function)\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.qml" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            {
              begin: /([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*\(/dgv,
              beginCaptures: {
                "1": { name: "entity.name.function.qml" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "#identifier" }
              ]
            },
            {
              begin: /\{/dgv,
              contentName: "meta.embedded.block.js",
              end: /\}/dgv,
              patterns: [
                { include: "source.js" }
              ]
            }
          ]
        }
      ]
    },
    object: {
      patterns: [
        {
          begin: /\b([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "entity.name.type.qml" }
          },
          end: /\}/dgv,
          patterns: [
            { include: "$self" },
            { include: "#group-attributes" },
            { include: "#method-attributes" },
            { include: "#signal-attributes" },
            { include: "#comment" },
            { include: "#attributes-dictionary" }
          ]
        }
      ]
    },
    "reserved-words": {
      patterns: [
        {
          description: "Attribute modifier.",
          match: /\b(default|alias|readonly|required)\b/dgv,
          name: "storage.modifier.qml"
        },
        {
          match: /\b(property|id|on)\b/dgv,
          name: "keyword.other.qml"
        },
        {
          description: "Special words for signal handlers including property change.",
          match: /\b(on[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(Changed)?)\b/dgv,
          name: "keyword.control.qml"
        }
      ]
    },
    "signal-attributes": {
      patterns: [
        {
          begin: /\b(signal)\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.qml" }
          },
          end: /(?=\n?$)/dgv,
          patterns: [
            {
              begin: /([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*\(/dgv,
              beginCaptures: {
                "1": { name: "entity.name.function.qml" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "#keywords" },
                { include: "#identifier" }
              ]
            },
            { include: "#identifier" },
            { include: "#comment" }
          ]
        }
      ]
    },
    string: {
      description: "String literal with double or signle quote.",
      patterns: [
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.qml"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.qml"
        }
      ]
    },
    typename: {
      description: "The name of type. First letter must be uppercase.",
      patterns: [
        {
          match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
          name: "entity.name.type.qml"
        }
      ]
    }
  },
  dependencies: [
    "javascript"
  ]
};
