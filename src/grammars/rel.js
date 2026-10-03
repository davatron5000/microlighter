export default {
  name: "rel",
  displayName: "Rel",
  scopeName: "source.rel",
  patterns: [
    { include: "#strings" },
    { include: "#comment" },
    { include: "#single-line-comment-consuming-line-ending" },
    { include: "#deprecated-temporary" },
    { include: "#operators" },
    { include: "#symbols" },
    { include: "#keywords" },
    { include: "#otherkeywords" },
    { include: "#types" },
    { include: "#constants" }
  ],
  repository: {
    comment: {
      patterns: [
        {
          begin: /\/\*\*(?!\/)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.rel" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.rel" }
          },
          name: "comment.block.documentation.rel",
          patterns: [
            { include: "#docblock" }
          ]
        },
        {
          begin: /(\/\*)(?:\p{space}*((@)internal)(?=\p{space}|(\*\/)))?/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.rel" },
            "2": { name: "storage.type.internaldeclaration.rel" },
            "3": { name: "punctuation.decorator.internaldeclaration.rel" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.rel" }
          },
          name: "comment.block.rel"
        },
        {
          begin: /doc"""/dgv,
          end: /"""/dgv,
          name: "comment.block.documentation.rel"
        },
        {
          begin: /(^[\t ]+)?((\/\/)(?:\p{space}*((@)internal)(?=\p{space}|(?=\n?$)))?)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.rel" },
            "2": { name: "comment.line.double-slash.rel" },
            "3": { name: "punctuation.definition.comment.rel" },
            "4": { name: "storage.type.internaldeclaration.rel" },
            "5": { name: "punctuation.decorator.internaldeclaration.rel" }
          },
          contentName: "comment.line.double-slash.rel",
          end: /(?=(?=\n?$))/dgv
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b((true|false))\b/dgv,
          name: "constant.language.rel"
        }
      ]
    },
    "deprecated-temporary": {
      patterns: [
        {
          match: /@inspect/dgv,
          name: "keyword.other.rel"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b((def|entity|bound|include|ic|forall|exists|[∀∃]|return|module|^end))\b|(((<)?\|(>)?)|[∀∃])/dgv,
          name: "keyword.control.rel"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /\b((if|then|else|and|or|not|eq|neq|lt|lt_eq|gt|gt_eq))\b|([\-\%\*\+\/\=\^÷]|!=|[\<≠]|<=|[\>≤]|>=|[\&≥])|\p{space}+(end)/dgv,
          name: "keyword.other.rel"
        }
      ]
    },
    otherkeywords: {
      patterns: [
        {
          match: /\p{space}*(@inline)\p{space}*|\p{space}*(@auto_number)\p{space}*|\p{space}*(function)\p{space}|\b((implies|select|from|∈|where|for|in))\b|(((<)?\|(>)?)|∈)/dgv,
          name: "keyword.other.rel"
        }
      ]
    },
    "single-line-comment-consuming-line-ending": {
      begin: /(^[\t ]+)?((\/\/)(?:\p{space}*((@)internal)(?=\p{space}|(?=\n?$)))?)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.rel" },
        "2": { name: "comment.line.double-slash.rel" },
        "3": { name: "punctuation.definition.comment.rel" },
        "4": { name: "storage.type.internaldeclaration.rel" },
        "5": { name: "punctuation.decorator.internaldeclaration.rel" }
      },
      contentName: "comment.line.double-slash.rel",
      end: /(?=^)/dgv
    },
    strings: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.rel",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.rel"
        }
      ]
    },
    symbols: {
      patterns: [
        {
          match: /(:[\$\[_\p{Alpha}](\]|[\$_\p{Alpha}\p{Nd}]*))/dgv,
          name: "variable.parameter.rel"
        }
      ]
    },
    types: {
      patterns: [
        {
          match: /\b((Symbol|Char|Bool|Rational|FixedDecimal|Float16|Float32|Float64|Int8|Int16|Int32|Int64|Int128|UInt8|UInt16|UInt32|UInt64|UInt128|Date|DateTime|Day|Week|Month|Year|Nanosecond|Microsecond|Millisecond|Second|Minute|Hour|FilePos|HashValue|AutoNumberValue))\b/dgv,
          name: "entity.name.type.rel"
        }
      ]
    }
  },
  dependencies: []
};
