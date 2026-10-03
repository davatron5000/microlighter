export default {
  name: "elm",
  displayName: "Elm",
  scopeName: "source.elm",
  patterns: [
    { include: "#import" },
    { include: "#module" },
    { include: "#debug" },
    { include: "#comments" },
    {
      match: /\b(_)\b/dgv,
      name: "keyword.unused.elm"
    },
    { include: "#type-signature" },
    { include: "#type-declaration" },
    { include: "#type-alias-declaration" },
    { include: "#string-triple" },
    { include: "#string-quote" },
    { include: "#char" },
    {
      match: /\b([0-9]+\.[0-9]+([Ee][\-\+]?[0-9]+)?|[0-9]+[Ee][\-\+]?[0-9]+)\b/dgv,
      name: "constant.numeric.float.elm"
    },
    {
      match: /\b([0-9]+)\b/dgv,
      name: "constant.numeric.elm"
    },
    {
      match: /\b(0x\p{AHex}+)\b/dgv,
      name: "constant.numeric.elm"
    },
    { include: "#glsl" },
    { include: "#record-prefix" },
    { include: "#module-prefix" },
    { include: "#constructor" },
    {
      captures: {
        "1": { name: "punctuation.bracket.elm" },
        "2": { name: "record.name.elm" },
        "3": { name: "keyword.pipe.elm" },
        "4": { name: "entity.name.record.field.elm" }
      },
      match: /(\{)\p{space}+([a-z][0-9A-Z_a-z]*)\p{space}+(\|)\p{space}+([a-z][0-9A-Z_a-z]*)/dgv,
      name: "meta.record.field.update.elm"
    },
    {
      captures: {
        "1": { name: "keyword.pipe.elm" },
        "2": { name: "entity.name.record.field.elm" },
        "3": { name: "keyword.operator.assignment.elm" }
      },
      match: /(\|)\p{space}+([a-z][0-9A-Z_a-z]*)\p{space}+(=)/dgv,
      name: "meta.record.field.update.elm"
    },
    {
      captures: {
        "1": { name: "punctuation.bracket.elm" },
        "2": { name: "record.name.elm" }
      },
      match: /(\{)\p{space}+([a-z][0-9A-Z_a-z]*)\p{space}+(?=\n?$)/dgv,
      name: "meta.record.field.update.elm"
    },
    {
      captures: {
        "1": { name: "punctuation.bracket.elm" },
        "2": { name: "entity.name.record.field.elm" },
        "3": { name: "keyword.operator.assignment.elm" }
      },
      match: /(\{)\p{space}+([a-z][0-9A-Z_a-z]*)\p{space}+(=)/dgv,
      name: "meta.record.field.elm"
    },
    {
      captures: {
        "1": { name: "punctuation.separator.comma.elm" },
        "2": { name: "entity.name.record.field.elm" },
        "3": { name: "keyword.operator.assignment.elm" }
      },
      match: /(,)\p{space}+([a-z][0-9A-Z_a-z]*)\p{space}+(=)/dgv,
      name: "meta.record.field.elm"
    },
    {
      match: /([\{\}])/dgv,
      name: "punctuation.bracket.elm"
    },
    { include: "#unit" },
    { include: "#comma" },
    { include: "#parens" },
    {
      match: /(->)/dgv,
      name: "keyword.operator.arrow.elm"
    },
    { include: "#infix_op" },
    {
      match: /([\:\=\\\|])/dgv,
      name: "keyword.other.elm"
    },
    {
      match: /\b(type|as|port|exposing|alias|infixl|infixr?)\p{space}+/dgv,
      name: "keyword.other.elm"
    },
    {
      match: /\b(if|then|else|case|of|let|in)\p{space}+/dgv,
      name: "keyword.control.elm"
    },
    { include: "#record-accessor" },
    { include: "#top_level_value" },
    { include: "#value" },
    { include: "#period" },
    { include: "#square_brackets" }
  ],
  repository: {
    block_comment: {
      applyEndPatternLast: 1,
      begin: /\{-(?!#)/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.elm" }
      },
      end: /-\}/dgv,
      name: "comment.block.elm",
      patterns: [
        { include: "#block_comment" }
      ]
    },
    char: {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.char.begin.elm" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.char.end.elm" }
      },
      name: "string.quoted.single.elm",
      patterns: [
        {
          match: /\\(NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|["\&'\\abfnrtv]|x\p{AHex}{1,5})/dgv,
          name: "constant.character.escape.elm"
        },
        {
          match: /\^[\@-_]/dgv,
          name: "constant.character.escape.control.elm"
        }
      ]
    },
    comma: {
      match: /(,)/dgv,
      name: "punctuation.separator.comma.elm"
    },
    comments: {
      patterns: [
        {
          begin: /--/dgv,
          captures: {
            "1": { name: "punctuation.definition.comment.elm" }
          },
          end: /(?=\n?$)/dgv,
          name: "comment.line.double-dash.elm"
        },
        { include: "#block_comment" }
      ]
    },
    constructor: {
      match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
      name: "constant.type-constructor.elm"
    },
    debug: {
      match: /\b(Debug)\b/dgv,
      name: "invalid.illegal.debug.elm"
    },
    glsl: {
      begin: /(\[)(glsl)(\|)/dgv,
      beginCaptures: {
        "1": { name: "entity.glsl.bracket.elm" },
        "2": { name: "entity.glsl.name.elm" },
        "3": { name: "entity.glsl.bracket.elm" }
      },
      end: /(\|\])/dgv,
      endCaptures: {
        "1": { name: "entity.glsl.bracket.elm" }
      },
      name: "meta.embedded.block.glsl",
      patterns: [
        { include: "source.glsl" }
      ]
    },
    import: {
      begin: /^\b(import)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.import.elm" }
      },
      end: /\n(?!\p{space})/dgv,
      name: "meta.import.elm",
      patterns: [
        {
          match: /(as|exposing)/dgv,
          name: "keyword.control.elm"
        },
        { include: "#module_chunk" },
        { include: "#period" },
        {
          match: /\p{space}+/dgv,
          name: "punctuation.spaces.elm"
        },
        { include: "#module-exports" }
      ]
    },
    infix_op: {
      match: /(<\/>|<\?>|<\||<=|\|\||&&|>=|\|>|\|=|\|\.|\+\+|::|\/=|==|\/\/|>>|<<|[\-\*\+\/\<\>\^])/dgv,
      name: "keyword.operator.elm"
    },
    module: {
      begin: /^\b((port |effect )?module)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.elm" }
      },
      end: /\n(?!\p{space})/dgv,
      endCaptures: {
        "1": { name: "keyword.other.elm" }
      },
      name: "meta.declaration.module.elm",
      patterns: [
        { include: "#module_chunk" },
        { include: "#period" },
        {
          match: /(exposing)/dgv,
          name: "keyword.other.elm"
        },
        {
          match: /\p{space}+/dgv,
          name: "punctuation.spaces.elm"
        },
        { include: "#module-exports" }
      ]
    },
    "module-exports": {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.parens.module-export.elm" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parens.module-export.elm" }
      },
      name: "meta.declaration.exports.elm",
      patterns: [
        {
          match: /\b[a-z]['0-9A-Z_a-z]*/dgv,
          name: "entity.name.function.elm"
        },
        {
          match: /\b[A-Z]['0-9A-Z_a-z]*/dgv,
          name: "storage.type.elm"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.elm"
        },
        {
          match: /\p{space}+/dgv,
          name: "punctuation.spaces.elm"
        },
        { include: "#comma" },
        {
          match: /\(\.\.\)/dgv,
          name: "punctuation.parens.ellipses.elm"
        },
        {
          match: /\.\./dgv,
          name: "punctuation.parens.ellipses.elm"
        },
        { include: "#infix_op" },
        {
          match: /\([^\n]*?\)/dgv,
          name: "meta.other.unknown.elm"
        }
      ]
    },
    "module-prefix": {
      captures: {
        "1": { name: "support.module.elm" },
        "2": { name: "keyword.other.period.elm" }
      },
      match: /([A-Z][0-9A-Z_a-z]*)(\.)/dgv,
      name: "meta.module.name.elm"
    },
    module_chunk: {
      match: /[A-Z][0-9A-Z_a-z]*/dgv,
      name: "support.module.elm"
    },
    parens: {
      match: /([\(\)])/dgv,
      name: "punctuation.parens.elm"
    },
    period: {
      match: /\./dgv,
      name: "keyword.other.period.elm"
    },
    "record-accessor": {
      captures: {
        "1": { name: "keyword.other.period.elm" },
        "2": { name: "entity.name.record.field.accessor.elm" }
      },
      match: /(\.)([a-z][0-9A-Z_a-z]*)/dgv,
      name: "meta.record.accessor"
    },
    "record-prefix": {
      captures: {
        "1": { name: "record.name.elm" },
        "2": { name: "keyword.other.period.elm" },
        "3": { name: "entity.name.record.field.accessor.elm" }
      },
      match: /([a-z][0-9A-Z_a-z]*)(\.)([a-z][0-9A-Z_a-z]*)/dgv,
      name: "record.accessor.elm"
    },
    square_brackets: {
      match: /[\]\[]/dgv,
      name: "punctuation.definition.list.elm"
    },
    "string-quote": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.elm" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.elm" }
      },
      name: "string.quoted.double.elm",
      patterns: [
        {
          match: /\\(NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|["\&'\\abfnrtv]|x\p{AHex}{1,5})/dgv,
          name: "constant.character.escape.elm"
        },
        {
          match: /\^[\@-_]/dgv,
          name: "constant.character.escape.control.elm"
        }
      ]
    },
    "string-triple": {
      begin: /"""/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.elm" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.elm" }
      },
      name: "string.quoted.triple.elm",
      patterns: [
        {
          match: /\\(NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|["\&'\\abfnrtv]|x\p{AHex}{1,5})/dgv,
          name: "constant.character.escape.elm"
        },
        {
          match: /\^[\@-_]/dgv,
          name: "constant.character.escape.control.elm"
        }
      ]
    },
    top_level_value: {
      match: /^[a-z][0-9A-Z_a-z]*\b/dgv,
      name: "entity.name.function.top_level.elm"
    },
    "type-alias-declaration": {
      begin: /^(type\p{space}+)(alias\p{space}+)([A-Z]['0-9A-Z_a-z]*)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.type.elm" },
        "2": { name: "keyword.type-alias.elm" },
        "3": { name: "storage.type.elm" }
      },
      end: /^(?=\P{space})/dgv,
      name: "meta.function.type-declaration.elm",
      patterns: [
        {
          match: /\n\p{space}+/dgv,
          name: "punctuation.spaces.elm"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.elm"
        },
        { include: "#module-prefix" },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
          name: "storage.type.elm"
        },
        {
          match: /\b[a-z][0-9A-Z_a-z]*\b/dgv,
          name: "variable.type.elm"
        },
        { include: "#comments" },
        { include: "#type-record" }
      ]
    },
    "type-declaration": {
      begin: /^(type\p{space}+)([A-Z]['0-9A-Z_a-z]*)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.type.elm" },
        "2": { name: "storage.type.elm" }
      },
      end: /^(?=\P{space})/dgv,
      name: "meta.function.type-declaration.elm",
      patterns: [
        {
          captures: {
            "1": { name: "constant.type-constructor.elm" }
          },
          match: /^\p{space}*([A-Z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.record.field.elm"
        },
        {
          match: /\p{space}+/dgv,
          name: "punctuation.spaces.elm"
        },
        {
          captures: {
            "1": { name: "keyword.operator.assignment.elm" },
            "2": { name: "constant.type-constructor.elm" }
          },
          match: /([\=\|])\p{space}+([A-Z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.record.field.elm"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.elm"
        },
        {
          match: /->/dgv,
          name: "keyword.operator.arrow.elm"
        },
        { include: "#module-prefix" },
        {
          match: /\b[a-z][0-9A-Z_a-z]*\b/dgv,
          name: "variable.type.elm"
        },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
          name: "storage.type.elm"
        },
        { include: "#comments" },
        { include: "#type-record" }
      ]
    },
    "type-record": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.braces.begin" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.braces.end" }
      },
      name: "meta.function.type-record.elm",
      patterns: [
        {
          match: /\p{space}+/dgv,
          name: "punctuation.spaces.elm"
        },
        {
          match: /->/dgv,
          name: "keyword.operator.arrow.elm"
        },
        {
          captures: {
            "1": { name: "entity.name.record.field.elm" },
            "2": { name: "keyword.other.elm" }
          },
          match: /([a-z][0-9A-Z_a-z]*)\p{space}+(:)/dgv,
          name: "meta.record.field.elm"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.elm"
        },
        { include: "#module-prefix" },
        {
          match: /\b[a-z][0-9A-Z_a-z]*\b/dgv,
          name: "variable.type.elm"
        },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
          name: "storage.type.elm"
        },
        { include: "#comments" },
        { include: "#type-record" }
      ]
    },
    "type-signature": {
      begin: /^(port\p{space}+)?([_a-z]['0-9A-Z_a-z]*)\p{space}+(:)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.port.elm" },
        "2": { name: "entity.name.function.elm" },
        "3": { name: "keyword.other.colon.elm" }
      },
      end: /^(((?=[a-z]))|(?=\n?$))/dgv,
      name: "meta.function.type-declaration.elm",
      patterns: [
        { include: "#type-signature-chunk" }
      ]
    },
    "type-signature-chunk": {
      patterns: [
        {
          match: /->/dgv,
          name: "keyword.operator.arrow.elm"
        },
        {
          match: /\p{space}+/dgv,
          name: "punctuation.spaces.elm"
        },
        { include: "#module-prefix" },
        {
          match: /\b[a-z][0-9A-Z_a-z]*\b/dgv,
          name: "variable.type.elm"
        },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
          name: "storage.type.elm"
        },
        {
          match: /\(\)/dgv,
          name: "constant.unit.elm"
        },
        { include: "#comma" },
        { include: "#parens" },
        { include: "#comments" },
        { include: "#type-record" }
      ]
    },
    unit: {
      match: /\(\)/dgv,
      name: "constant.unit.elm"
    },
    value: {
      match: /\b[a-z][0-9A-Z_a-z]*\b/dgv,
      name: "meta.value.elm"
    }
  },
  dependencies: [
    "glsl"
  ]
};
