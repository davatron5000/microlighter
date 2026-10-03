export default {
  name: "bicep",
  displayName: "Bicep",
  scopeName: "source.bicep",
  patterns: [
    { include: "#expression" },
    { include: "#comments" }
  ],
  repository: {
    "array-literal": {
      begin: /\[(?!(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*\bfor\b)/dgv,
      end: /\]/dgv,
      name: "meta.array-literal.bicep",
      patterns: [
        { include: "#expression" },
        { include: "#comments" }
      ]
    },
    "block-comment": {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.bicep"
    },
    comments: {
      patterns: [
        { include: "#line-comment" },
        { include: "#block-comment" }
      ]
    },
    decorator: {
      begin: /@(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*(?=\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b)/dgv,
      end: /(?:)/dgv,
      name: "meta.decorator.bicep",
      patterns: [
        { include: "#expression" },
        { include: "#comments" }
      ]
    },
    directive: {
      begin: /#\b[\-0-9A-Z_a-z]+\b/dgv,
      end: /(?=\n?$)/dgv,
      name: "meta.directive.bicep",
      patterns: [
        { include: "#directive-variable" },
        { include: "#comments" }
      ]
    },
    "directive-variable": {
      match: /\b[\-0-9A-Z_a-z]+\b/dgv,
      name: "keyword.control.declaration.bicep"
    },
    "escape-character": {
      match: /\\(u\{\p{AHex}+\}|['\\nrt]|\$\{)/dgv,
      name: "constant.character.escape.bicep"
    },
    expression: {
      patterns: [
        { include: "#string-literal" },
        { include: "#multiline-string" },
        { include: "#multiline-string-1-interp" },
        { include: "#multiline-string-2-interp" },
        { include: "#numeric-literal" },
        { include: "#named-literal" },
        { include: "#object-literal" },
        { include: "#array-literal" },
        { include: "#keyword" },
        { include: "#identifier" },
        { include: "#function-call" },
        { include: "#decorator" },
        { include: "#lambda-start" },
        { include: "#directive" }
      ]
    },
    "function-call": {
      begin: /\b([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\b(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*\(/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.bicep" }
      },
      end: /\)/dgv,
      name: "meta.function-call.bicep",
      patterns: [
        { include: "#expression" },
        { include: "#comments" }
      ]
    },
    identifier: {
      match: /\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b(?!(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*\()/dgv,
      name: "variable.other.readwrite.bicep"
    },
    keyword: {
      match: /\b(metadata|targetScope|resource|module|param|var|output|for|in|if|existing|import|as|type|with|using|extends|func|assert|extension)\b/dgv,
      name: "keyword.control.declaration.bicep"
    },
    "lambda-start": {
      begin: /(\((?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*(,(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*)*\)|\((?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*\)|(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*)(?=(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*=>)/dgv,
      beginCaptures: {
        "1": {
          name: "meta.undefined.bicep",
          patterns: [
            { include: "#identifier" },
            { include: "#comments" }
          ]
        }
      },
      end: /(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*=>/dgv,
      name: "meta.lambda-start.bicep"
    },
    "line-comment": {
      match: /\/\/[^\n]*(?=(?=\n?$))/dgv,
      name: "comment.line.double-slash.bicep"
    },
    "multiline-1-string-subst": {
      begin: /(\$\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.template-expression.begin.bicep" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.template-expression.end.bicep" }
      },
      name: "meta.multiline-1-string-subst.bicep",
      patterns: [
        { include: "#expression" },
        { include: "#comments" }
      ]
    },
    "multiline-2-string-subst": {
      begin: /(\$\$\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.template-expression.begin.bicep" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.template-expression.end.bicep" }
      },
      name: "meta.multiline-2-string-subst.bicep",
      patterns: [
        { include: "#expression" },
        { include: "#comments" }
      ]
    },
    "multiline-string": {
      begin: /'''/dgv,
      end: /'''(?!')/dgv,
      name: "string.quoted.multi.bicep",
      patterns: []
    },
    "multiline-string-1-interp": {
      begin: /(?<!\$)\$'''/dgv,
      end: /'''(?!')/dgv,
      name: "string.quoted.multi.bicep",
      patterns: [
        { include: "#multiline-1-string-subst" }
      ]
    },
    "multiline-string-2-interp": {
      begin: /\$\$'''/dgv,
      end: /'''(?!')/dgv,
      name: "string.quoted.multi.bicep",
      patterns: [
        { include: "#multiline-2-string-subst" }
      ]
    },
    "named-literal": {
      match: /\b(true|false|null)\b/dgv,
      name: "constant.language.bicep"
    },
    "numeric-literal": {
      match: /[0-9]+/dgv,
      name: "constant.numeric.bicep"
    },
    "object-literal": {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "meta.object-literal.bicep",
      patterns: [
        { include: "#object-property-key" },
        { include: "#expression" },
        { include: "#comments" }
      ]
    },
    "object-property-key": {
      match: /\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b(?=(?:[\t\n\r ]|\/\*(?:\*(?!\/)|[^\*])*\*\/)*:)/dgv,
      name: "variable.other.property.bicep"
    },
    "string-literal": {
      begin: /'(?!'')/dgv,
      end: /'/dgv,
      name: "string.quoted.single.bicep",
      patterns: [
        { include: "#escape-character" },
        { include: "#string-subst" }
      ]
    },
    "string-subst": {
      begin: /(?<!\\)(\$\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.template-expression.begin.bicep" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.template-expression.end.bicep" }
      },
      name: "meta.string-subst.bicep",
      patterns: [
        { include: "#expression" },
        { include: "#comments" }
      ]
    }
  },
  dependencies: []
};
