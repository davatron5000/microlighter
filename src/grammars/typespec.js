export default {
  name: "typespec",
  displayName: "TypeSpec",
  aliases: [
    "tsp"
  ],
  scopeName: "source.tsp",
  patterns: [
    { include: "#statement" }
  ],
  repository: {
    "alias-id": {
      begin: /(=)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.assignment.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.alias-id.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    "alias-statement": {
      begin: /(?:(internal)\p{space}+)?\b(alias)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" },
        "3": { name: "entity.name.type.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.alias-statement.typespec",
      patterns: [
        { include: "#alias-id" },
        { include: "#type-parameters" }
      ]
    },
    "augment-decorator-statement": {
      begin: /((@@)\b[\$_\p{Alpha}](?:[\$_\p{Alpha}\p{Nd}]|\.[\$_\p{Alpha}])*)\b/dgv,
      beginCaptures: {
        "1": { name: "entity.name.tag.tsp" },
        "2": { name: "entity.name.tag.tsp" }
      },
      end: /(?=([\$_\`\p{Alpha}]))|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.augment-decorator-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#parenthesized-expression" }
      ]
    },
    "block-comment": {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.tsp"
    },
    "boolean-literal": {
      match: /\b(true|false)\b/dgv,
      name: "constant.language.tsp"
    },
    callExpression: {
      begin: /\b([\$_\p{Alpha}](?:[\$_\p{Alpha}\p{Nd}]|\.[\$_\p{Alpha}])*)\b\p{space}*(\()/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.tsp" },
        "2": { name: "punctuation.parenthesis.open.tsp" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.tsp" }
      },
      name: "meta.callExpression.typespec",
      patterns: [
        { include: "#token" },
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "const-statement": {
      begin: /(?:(internal)\p{space}+)?\b(const)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" },
        "3": { name: "variable.name.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.const-statement.typespec",
      patterns: [
        { include: "#type-annotation" },
        { include: "#operator-assignment" },
        { include: "#expression" }
      ]
    },
    decorator: {
      begin: /((@)\b[\$_\p{Alpha}](?:[\$_\p{Alpha}\p{Nd}]|\.[\$_\p{Alpha}])*)\b/dgv,
      beginCaptures: {
        "1": { name: "entity.name.tag.tsp" },
        "2": { name: "entity.name.tag.tsp" }
      },
      end: /(?=([\$_\`\p{Alpha}]))|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.decorator.typespec",
      patterns: [
        { include: "#token" },
        { include: "#parenthesized-expression" }
      ]
    },
    "decorator-declaration-statement": {
      begin: /(?:(internal)\p{space}+)?(?:(extern)\p{space}+)?\b(dec)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" },
        "3": { name: "keyword.other.tsp" },
        "4": { name: "entity.name.function.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.decorator-declaration-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#operation-parameters" }
      ]
    },
    directive: {
      begin: /\p{space}*(#)\b([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.name.tsp" },
        "2": { name: "keyword.directive.name.tsp" }
      },
      end: /(?=\n?$)|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.directive.typespec",
      patterns: [
        { include: "#string-literal" },
        { include: "#identifier-expression" }
      ]
    },
    "doc-comment": {
      begin: /\/\*\*/dgv,
      beginCaptures: {
        "0": { name: "comment.block.tsp" }
      },
      end: /\*\//dgv,
      endCaptures: {
        "0": { name: "comment.block.tsp" }
      },
      name: "comment.block.tsp",
      patterns: [
        { include: "#doc-comment-block" }
      ]
    },
    "doc-comment-block": {
      patterns: [
        { include: "#doc-comment-param" },
        { include: "#doc-comment-return-tag" },
        { include: "#doc-comment-unknown-tag" }
      ]
    },
    "doc-comment-param": {
      captures: {
        "1": { name: "keyword.tag.tspdoc" },
        "2": { name: "keyword.tag.tspdoc" },
        "3": { name: "variable.name.tsp" }
      },
      match: /((@)(?:param|template|prop))\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)\b/dgv,
      name: "comment.block.tsp"
    },
    "doc-comment-return-tag": {
      captures: {
        "1": { name: "keyword.tag.tspdoc" },
        "2": { name: "keyword.tag.tspdoc" }
      },
      match: /((@)returns)\b/dgv,
      name: "comment.block.tsp"
    },
    "doc-comment-unknown-tag": {
      captures: {
        "1": { name: "entity.name.tag.tsp" },
        "2": { name: "entity.name.tag.tsp" }
      },
      match: /((@)(?:\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`))\b/dgv,
      name: "comment.block.tsp"
    },
    "enum-body": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.tsp" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.tsp" }
      },
      name: "meta.enum-body.typespec",
      patterns: [
        { include: "#enum-member" },
        { include: "#token" },
        { include: "#directive" },
        { include: "#decorator" },
        { include: "#punctuation-comma" }
      ]
    },
    "enum-expression": {
      begin: /\b(enum)\b(?:\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`))?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" },
        "2": { name: "entity.name.type.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.enum-expression.typespec",
      patterns: [
        { include: "#token" },
        { include: "#enum-body" }
      ]
    },
    "enum-member": {
      begin: /(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)\p{space}*(:?)/dgv,
      beginCaptures: {
        "1": { name: "variable.name.tsp" },
        "2": { name: "keyword.operator.type.annotation.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.enum-member.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-annotation" }
      ]
    },
    "enum-statement": {
      begin: /(?:(internal)\p{space}+)?\b(enum)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" },
        "3": { name: "entity.name.type.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.enum-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#enum-body" }
      ]
    },
    "escape-character": {
      match: /\\[^\n]/dgv,
      name: "constant.character.escape.tsp"
    },
    expression: {
      patterns: [
        { include: "#token" },
        { include: "#directive" },
        { include: "#parenthesized-expression" },
        { include: "#valueof" },
        { include: "#typeof" },
        { include: "#type-arguments" },
        { include: "#object-literal" },
        { include: "#tuple-literal" },
        { include: "#tuple-expression" },
        { include: "#model-expression-keyword" },
        { include: "#scalar-expression" },
        { include: "#enum-expression" },
        { include: "#union-expression" },
        { include: "#model-expression" },
        { include: "#callExpression" },
        { include: "#identifier-expression" }
      ]
    },
    "function-declaration-statement": {
      begin: /(?:(internal)\p{space}+)?(?:(extern)\p{space}+)?\b(fn)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" },
        "3": { name: "keyword.other.tsp" },
        "4": { name: "entity.name.function.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.function-declaration-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#operation-parameters" },
        { include: "#type-annotation" }
      ]
    },
    "identifier-expression": {
      match: /\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`/dgv,
      name: "entity.name.type.tsp"
    },
    "import-statement": {
      begin: /\b(import)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.import-statement.typespec",
      patterns: [
        { include: "#token" }
      ]
    },
    "interface-body": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.tsp" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.tsp" }
      },
      name: "meta.interface-body.typespec",
      patterns: [
        { include: "#token" },
        { include: "#directive" },
        { include: "#decorator" },
        { include: "#interface-member" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "interface-heritage": {
      begin: /\b(extends)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /((?=\{)|(?=[\)\;\@\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b))/dgv,
      name: "meta.interface-heritage.typespec",
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "interface-member": {
      begin: /(?:\b(op)\b\p{space}+)?(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" },
        "2": { name: "entity.name.function.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.interface-member.typespec",
      patterns: [
        { include: "#token" },
        { include: "#operation-signature" }
      ]
    },
    "interface-statement": {
      begin: /(?:(internal)\p{space}+)?\b(interface)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.interface-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-parameters" },
        { include: "#interface-heritage" },
        { include: "#interface-body" },
        { include: "#expression" }
      ]
    },
    "line-comment": {
      match: /\/\/[^\n]*(?=\n?$)/dgv,
      name: "comment.line.double-slash.tsp"
    },
    "model-expression": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.tsp" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.tsp" }
      },
      name: "meta.model-expression.typespec",
      patterns: [
        { include: "#model-property" },
        { include: "#token" },
        { include: "#directive" },
        { include: "#decorator" },
        { include: "#spread-operator" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "model-expression-keyword": {
      begin: /\b(model)\b(?:\p{space}+(?!(?:extend|i)s\b)(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`))?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" },
        "2": { name: "entity.name.type.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.model-expression-keyword.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-parameters" },
        { include: "#model-heritage" },
        { include: "#expression" }
      ]
    },
    "model-heritage": {
      begin: /\b(extends|is)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /((?=\{)|(?=[\)\;\@\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b))/dgv,
      name: "meta.model-heritage.typespec",
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "model-property": {
      begin: /(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)|("(?:[^"\\]|\\[^\n])*")/dgv,
      beginCaptures: {
        "1": { name: "variable.name.tsp" },
        "2": { name: "string.quoted.double.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.model-property.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-annotation" },
        { include: "#operator-assignment" },
        { include: "#expression" }
      ]
    },
    "model-statement": {
      begin: /(?:(internal)\p{space}+)?\b(model)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.model-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-parameters" },
        { include: "#model-heritage" },
        { include: "#expression" }
      ]
    },
    "namespace-body": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.tsp" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.tsp" }
      },
      name: "meta.namespace-body.typespec",
      patterns: [
        { include: "#statement" }
      ]
    },
    "namespace-name": {
      begin: /(?=([\$_\`\p{Alpha}]))/dgv,
      end: /((?=\{)|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b))/dgv,
      name: "meta.namespace-name.typespec",
      patterns: [
        { include: "#identifier-expression" },
        { include: "#punctuation-accessor" }
      ]
    },
    "namespace-statement": {
      begin: /\b(namespace)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /((?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b))/dgv,
      name: "meta.namespace-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#namespace-name" },
        { include: "#namespace-body" }
      ]
    },
    "numeric-literal": {
      match: /\b(?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$)|\b(?<!\$)0[Bb][01][01_]*(n)?\b(?!\$)|(?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$)/dgv,
      name: "constant.numeric.tsp"
    },
    "object-literal": {
      begin: /#\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.hashcurlybrace.open.tsp" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.tsp" }
      },
      name: "meta.object-literal.typespec",
      patterns: [
        { include: "#token" },
        { include: "#object-literal-property" },
        { include: "#directive" },
        { include: "#spread-operator" },
        { include: "#punctuation-comma" }
      ]
    },
    "object-literal-property": {
      begin: /(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "variable.name.tsp" },
        "2": { name: "keyword.operator.type.annotation.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.object-literal-property.typespec",
      patterns: [
        { include: "#token" },
        { include: "#expression" }
      ]
    },
    "operation-heritage": {
      begin: /\b(is)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.operation-heritage.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    "operation-parameters": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.open.tsp" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.tsp" }
      },
      name: "meta.operation-parameters.typespec",
      patterns: [
        { include: "#token" },
        { include: "#decorator" },
        { include: "#model-property" },
        { include: "#spread-operator" },
        { include: "#punctuation-comma" }
      ]
    },
    "operation-signature": {
      patterns: [
        { include: "#type-parameters" },
        { include: "#operation-heritage" },
        { include: "#operation-parameters" },
        { include: "#type-annotation" }
      ]
    },
    "operation-statement": {
      begin: /(?:(internal)\p{space}+)?\b(op)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" },
        "3": { name: "entity.name.function.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.operation-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#operation-signature" }
      ]
    },
    "operator-assignment": {
      match: /=/dgv,
      name: "keyword.operator.assignment.tsp"
    },
    "parenthesized-expression": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.open.tsp" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.tsp" }
      },
      name: "meta.parenthesized-expression.typespec",
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "punctuation-accessor": {
      match: /\./dgv,
      name: "punctuation.accessor.tsp"
    },
    "punctuation-comma": {
      match: /,/dgv,
      name: "punctuation.comma.tsp"
    },
    "punctuation-semicolon": {
      match: /;/dgv,
      name: "punctuation.terminator.statement.tsp"
    },
    "scalar-body": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.tsp" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.tsp" }
      },
      name: "meta.scalar-body.typespec",
      patterns: [
        { include: "#token" },
        { include: "#directive" },
        { include: "#scalar-constructor" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "scalar-constructor": {
      begin: /\b(init)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" },
        "2": { name: "entity.name.function.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.scalar-constructor.typespec",
      patterns: [
        { include: "#token" },
        { include: "#operation-parameters" }
      ]
    },
    "scalar-expression": {
      begin: /\b(scalar)\b(?:\p{space}+(?!extends\b)(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`))?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" },
        "2": { name: "entity.name.type.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.scalar-expression.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-parameters" },
        { include: "#scalar-extends" },
        { include: "#scalar-body" }
      ]
    },
    "scalar-extends": {
      begin: /\b(extends)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /(?=[\)\;\@\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.scalar-extends.typespec",
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "scalar-statement": {
      begin: /(?:(internal)\p{space}+)?\b(scalar)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" },
        "3": { name: "entity.name.type.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.scalar-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-parameters" },
        { include: "#scalar-extends" },
        { include: "#scalar-body" }
      ]
    },
    "spread-operator": {
      begin: /\.\.\./dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.spread.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.spread-operator.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    statement: {
      patterns: [
        { include: "#token" },
        { include: "#directive" },
        { include: "#augment-decorator-statement" },
        { include: "#decorator" },
        { include: "#model-statement" },
        { include: "#scalar-statement" },
        { include: "#union-statement" },
        { include: "#interface-statement" },
        { include: "#enum-statement" },
        { include: "#alias-statement" },
        { include: "#const-statement" },
        { include: "#namespace-statement" },
        { include: "#operation-statement" },
        { include: "#import-statement" },
        { include: "#using-statement" },
        { include: "#decorator-declaration-statement" },
        { include: "#function-declaration-statement" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "string-literal": {
      begin: /"/dgv,
      end: /"|(?=\n?$)/dgv,
      name: "string.quoted.double.tsp",
      patterns: [
        { include: "#template-expression" },
        { include: "#escape-character" }
      ]
    },
    "template-expression": {
      begin: /\$\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.tsp" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.tsp" }
      },
      name: "meta.template-expression.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    token: {
      patterns: [
        { include: "#doc-comment" },
        { include: "#line-comment" },
        { include: "#block-comment" },
        { include: "#triple-quoted-string-literal" },
        { include: "#string-literal" },
        { include: "#boolean-literal" },
        { include: "#numeric-literal" }
      ]
    },
    "triple-quoted-string-literal": {
      begin: /"""/dgv,
      end: /"""/dgv,
      name: "string.quoted.triple.tsp",
      patterns: [
        { include: "#template-expression" },
        { include: "#escape-character" }
      ]
    },
    "tuple-expression": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.squarebracket.open.tsp" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.squarebracket.close.tsp" }
      },
      name: "meta.tuple-expression.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    "tuple-literal": {
      begin: /#\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.hashsquarebracket.open.tsp" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.squarebracket.close.tsp" }
      },
      name: "meta.tuple-literal.typespec",
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "type-annotation": {
      begin: /\p{space}*(\??)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.optional.tsp" },
        "2": { name: "keyword.operator.type.annotation.tsp" }
      },
      end: /(?=[\)\,\;\=\@\}]|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.type-annotation.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    "type-argument": {
      begin: /(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)\p{space}*(=)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.type.tsp" },
        "2": { name: "keyword.operator.assignment.tsp" }
      },
      end: /(?=>)|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      endCaptures: {
        "0": { name: "keyword.operator.assignment.tsp" }
      },
      name: "meta.type-argument.typespec",
      patterns: [
        { include: "#token" },
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "type-arguments": {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.typeparameters.begin.tsp" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.typeparameters.end.tsp" }
      },
      name: "meta.type-arguments.typespec",
      patterns: [
        { include: "#type-argument" },
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "type-parameter": {
      begin: /(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.type.tsp" }
      },
      end: /(?=>)|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.type-parameter.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-parameter-constraint" },
        { include: "#type-parameter-default" }
      ]
    },
    "type-parameter-constraint": {
      begin: /extends/dgv,
      beginCaptures: {
        "0": { name: "keyword.other.tsp" }
      },
      end: /(?=>)|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.type-parameter-constraint.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    "type-parameter-default": {
      begin: /=/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.assignment.tsp" }
      },
      end: /(?=>)|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.type-parameter-default.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    "type-parameters": {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.typeparameters.begin.tsp" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.typeparameters.end.tsp" }
      },
      name: "meta.type-parameters.typespec",
      patterns: [
        { include: "#type-parameter" },
        { include: "#punctuation-comma" }
      ]
    },
    typeof: {
      begin: /\b(typeof)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /(?=>)|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.typeof.typespec",
      patterns: [
        { include: "#expression" }
      ]
    },
    "union-body": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.curlybrace.open.tsp" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.curlybrace.close.tsp" }
      },
      name: "meta.union-body.typespec",
      patterns: [
        { include: "#union-variant" },
        { include: "#token" },
        { include: "#directive" },
        { include: "#decorator" },
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "union-expression": {
      begin: /\b(union)\b(?:\p{space}+(?!extends\b)(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`))?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" },
        "2": { name: "entity.name.type.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.union-expression.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-parameters" },
        { include: "#union-extends" },
        { include: "#union-body" }
      ]
    },
    "union-extends": {
      begin: /\b(extends)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /((?=\{)|(?=[\)\;\@\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b))/dgv,
      name: "meta.union-extends.typespec",
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "union-statement": {
      begin: /(?:(internal)\p{space}+)?\b(union)\b\p{space}+(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.tsp" },
        "2": { name: "keyword.other.tsp" },
        "3": { name: "entity.name.type.tsp" }
      },
      end: /(?<=\})|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.union-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#type-parameters" },
        { include: "#union-extends" },
        { include: "#union-body" }
      ]
    },
    "union-variant": {
      begin: /(\b[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\b|`(?:[^\\\`]|\\[^\n])*`)\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "variable.name.tsp" },
        "2": { name: "keyword.operator.type.annotation.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.union-variant.typespec",
      patterns: [
        { include: "#token" },
        { include: "#expression" }
      ]
    },
    "using-statement": {
      begin: /\b(using)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.using-statement.typespec",
      patterns: [
        { include: "#token" },
        { include: "#identifier-expression" },
        { include: "#punctuation-accessor" }
      ]
    },
    valueof: {
      begin: /\b(valueof)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tsp" }
      },
      end: /(?=>)|(?=[\,\;\@]|#[a-z]|[\)\}]|\b(?:extern|internal)\b|\b(?:namespace|op|using|import|alias|interface|dec|fn)\b)/dgv,
      name: "meta.valueof.typespec",
      patterns: [
        { include: "#expression" }
      ]
    }
  },
  dependencies: []
};
