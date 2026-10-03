export default {
  name: "powerquery",
  displayName: "PowerQuery",
  scopeName: "source.powerquery",
  patterns: [
    { include: "#Noise" },
    { include: "#LiteralExpression" },
    { include: "#Keywords" },
    { include: "#ImplicitVariable" },
    { include: "#IntrinsicVariable" },
    { include: "#Operators" },
    { include: "#DotOperators" },
    { include: "#TypeName" },
    { include: "#RecordExpression" },
    { include: "#Punctuation" },
    { include: "#QuotedIdentifier" },
    { include: "#Identifier" }
  ],
  repository: {
    BlockComment: {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.powerquery"
    },
    DecimalNumber: {
      match: /(?<![\p{Nd}\p{L}\p{M}\p{N}\p{Pc}])(\p{Nd}*\.\p{Nd}+)\b/dgv,
      name: "constant.numeric.decimal.powerquery"
    },
    DotOperators: {
      captures: {
        "1": { name: "keyword.operator.ellipsis.powerquery" },
        "2": { name: "keyword.operator.list.powerquery" }
      },
      match: /(?<!\.)(?:(\.\.\.)|(\.\.))(?!\.)/dgv
    },
    EscapeSequence: {
      begin: /#\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.escapesequence.begin.powerquery" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.escapesequence.end.powerquery" }
      },
      name: "constant.character.escapesequence.powerquery",
      patterns: [
        {
          match: /(#|\p{AHex}{4}|\p{AHex}{8}|cr|lf|tab)(?:,(#|\p{AHex}{4}|\p{AHex}{8}|cr|lf|tab))*/dgv
        },
        {
          match: /[^\)]/dgv,
          name: "invalid.illegal.escapesequence.powerquery"
        }
      ]
    },
    FloatNumber: {
      match: /(\p{Nd}*\.)?\p{Nd}+([Ee])([\-\+])?\p{Nd}+/dgv,
      name: "constant.numeric.float.powerquery"
    },
    HexNumber: {
      match: /0([Xx])\p{AHex}+/dgv,
      name: "constant.numeric.integer.hexadecimal.powerquery"
    },
    Identifier: {
      captures: {
        "1": { name: "keyword.operator.inclusiveidentifier.powerquery" },
        "2": { name: "entity.name.powerquery" }
      },
      match: /(?<![\._\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}\p{Nl}\p{Nd}\p{Pc}\p{Mn}\p{Mc}\p{Cf}])(@?)([_\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}\p{Nl}][_\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}\p{Nl}\p{Nd}\p{Pc}\p{Mn}\p{Mc}\p{Cf}]*(?:\.[_\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}\p{Nl}][_\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Lo}\p{Nl}\p{Nd}\p{Pc}\p{Mn}\p{Mc}\p{Cf}])*)\b/dgv
    },
    ImplicitVariable: {
      match: /\b_\b/dgv,
      name: "keyword.operator.implicitvariable.powerquery"
    },
    InclusiveIdentifier: {
      captures: {
        "0": { name: "inclusiveidentifier.powerquery" }
      },
      match: /@/dgv
    },
    IntNumber: {
      captures: {
        "1": { name: "constant.numeric.integer.powerquery" }
      },
      match: /\b(\p{Nd}+)\b/dgv
    },
    IntrinsicVariable: {
      captures: {
        "1": { name: "constant.language.intrinsicvariable.powerquery" }
      },
      match: /(?<![\p{Nd}\p{L}\p{M}\p{N}\p{Pc}])(#s(?:ections|hared))\b/dgv
    },
    Keywords: {
      captures: {
        "1": { name: "keyword.operator.word.logical.powerquery" },
        "2": { name: "keyword.control.conditional.powerquery" },
        "3": { name: "keyword.control.exception.powerquery" },
        "4": { name: "keyword.other.powerquery" },
        "5": { name: "keyword.powerquery" }
      },
      match: /\b(?:(and|or|not)|(if|then|else)|(try|otherwise)|(as|each|in|is|let|meta|type|error)|(s(?:ection|hared)))\b/dgv
    },
    LineComment: {
      match: /\/\/[^\n]*/dgv,
      name: "comment.line.double-slash.powerquery"
    },
    LiteralExpression: {
      patterns: [
        { include: "#String" },
        { include: "#NumericConstant" },
        { include: "#LogicalConstant" },
        { include: "#NullConstant" },
        { include: "#FloatNumber" },
        { include: "#DecimalNumber" },
        { include: "#HexNumber" },
        { include: "#IntNumber" }
      ]
    },
    LogicalConstant: {
      match: /\b(true|false)\b/dgv,
      name: "constant.language.logical.powerquery"
    },
    Noise: {
      patterns: [
        { include: "#BlockComment" },
        { include: "#LineComment" },
        { include: "#Whitespace" }
      ]
    },
    NullConstant: {
      match: /\b(null)\b/dgv,
      name: "constant.language.null.powerquery"
    },
    NumericConstant: {
      captures: {
        "1": { name: "constant.language.numeric.float.powerquery" }
      },
      match: /(?<![\p{Nd}\p{L}\p{M}\p{N}\p{Pc}])(#(?:infinity|nan))\b/dgv
    },
    Operators: {
      captures: {
        "1": { name: "keyword.operator.function.powerquery" },
        "2": { name: "keyword.operator.assignment-or-comparison.powerquery" },
        "3": { name: "keyword.operator.comparison.powerquery" },
        "4": { name: "keyword.operator.combination.powerquery" },
        "5": { name: "keyword.operator.arithmetic.powerquery" },
        "6": { name: "keyword.operator.sectionaccess.powerquery" },
        "7": { name: "keyword.operator.optional.powerquery" }
      },
      match: /(=>)|(=)|(<>|[\<\>]|<=|>=)|(&)|([\-\*\+\/])|(!)|(\?)/dgv
    },
    Punctuation: {
      captures: {
        "1": { name: "punctuation.separator.powerquery" },
        "2": { name: "punctuation.section.parens.begin.powerquery" },
        "3": { name: "punctuation.section.parens.end.powerquery" },
        "4": { name: "punctuation.section.braces.begin.powerquery" },
        "5": { name: "punctuation.section.braces.end.powerquery" }
      },
      match: /(,)|(\()|(\))|(\{)|(\})/dgv
    },
    QuotedIdentifier: {
      begin: /#"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.quotedidentifier.begin.powerquery" }
      },
      end: /"(?!")/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.quotedidentifier.end.powerquery" }
      },
      name: "entity.name.powerquery",
      patterns: [
        {
          match: /""/dgv,
          name: "constant.character.escape.quote.powerquery"
        },
        { include: "#EscapeSequence" }
      ]
    },
    RecordExpression: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.brackets.begin.powerquery" }
      },
      contentName: "meta.recordexpression.powerquery",
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.brackets.end.powerquery" }
      },
      patterns: [
        { include: "$self" }
      ]
    },
    String: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.powerquery" }
      },
      end: /"(?!")/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.powerquery" }
      },
      name: "string.quoted.double.powerquery",
      patterns: [
        {
          match: /""/dgv,
          name: "constant.character.escape.quote.powerquery"
        },
        { include: "#EscapeSequence" }
      ]
    },
    TypeName: {
      captures: {
        "1": { name: "storage.modifier.powerquery" },
        "2": { name: "storage.type.powerquery" }
      },
      match: /\b(?:(optional|nullable)|(action|any|anynonnull|binary|date|datetime|datetimezone|duration|function|list|logical|none|null|number|record|table|text|type))\b/dgv
    },
    Whitespace: {
      match: /\p{space}+/dgv
    }
  },
  dependencies: []
};
