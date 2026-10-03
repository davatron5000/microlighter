export default {
  name: "gleam",
  displayName: "Gleam",
  scopeName: "source.gleam",
  patterns: [
    { include: "#comments" },
    { include: "#keywords" },
    { include: "#strings" },
    { include: "#constant" },
    { include: "#entity" },
    { include: "#discards" }
  ],
  repository: {
    binary_number: {
      match: /\b0[Bb][01_]*\b/dgv,
      name: "constant.numeric.binary.gleam",
      patterns: []
    },
    comments: {
      patterns: [
        {
          match: /\/\/[^\n]*/dgv,
          name: "comment.line.gleam"
        }
      ]
    },
    constant: {
      patterns: [
        { include: "#binary_number" },
        { include: "#octal_number" },
        { include: "#hexadecimal_number" },
        { include: "#decimal_number" },
        {
          match: /\p{Upper}[\p{Alpha}\p{Nd}]*/dgv,
          name: "entity.name.type.gleam"
        }
      ]
    },
    decimal_number: {
      match: /\b([0-9][0-9_]*)(\.([0-9_]*)?(e-?[0-9]+)?)?\b/dgv,
      name: "constant.numeric.decimal.gleam",
      patterns: []
    },
    discards: {
      match: /\b_(?:[\p{Alpha}\p{M}\p{Nd}\p{Pc}]+)?\b/dgv,
      name: "comment.unused.gleam"
    },
    entity: {
      patterns: [
        {
          begin: /\b(\p{Lower}[\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)\b\p{space}*\(/dgv,
          captures: {
            "1": { name: "entity.name.function.gleam" }
          },
          end: /\)/dgv,
          patterns: [
            { include: "$self" }
          ]
        },
        {
          match: /\b(\p{Lower}[\p{Alpha}\p{M}\p{Nd}\p{Pc}]*):\p{space}/dgv,
          name: "variable.parameter.gleam"
        },
        {
          match: /\b(\p{Lower}[\p{Alpha}\p{M}\p{Nd}\p{Pc}]*):/dgv,
          name: "entity.name.namespace.gleam"
        }
      ]
    },
    hexadecimal_number: {
      match: /\b0[Xx][_\p{AHex}]+\b/dgv,
      name: "constant.numeric.hexadecimal.gleam",
      patterns: []
    },
    keywords: {
      patterns: [
        {
          match: /\b(as|use|case|if|fn|import|let|assert|pub|type|opaque|const|todo|panic|else|echo)\b/dgv,
          name: "keyword.control.gleam"
        },
        {
          match: /(<-|->)/dgv,
          name: "keyword.operator.arrow.gleam"
        },
        {
          match: /\|>/dgv,
          name: "keyword.operator.pipe.gleam"
        },
        {
          match: /\.\./dgv,
          name: "keyword.operator.splat.gleam"
        },
        {
          match: /([\!\=]=)/dgv,
          name: "keyword.operator.comparison.gleam"
        },
        {
          match: /([\<\>]=?\.)/dgv,
          name: "keyword.operator.comparison.float.gleam"
        },
        {
          match: /(<=|>=|[\<\>])/dgv,
          name: "keyword.operator.comparison.int.gleam"
        },
        {
          match: /(&&|\|\|)/dgv,
          name: "keyword.operator.logical.gleam"
        },
        {
          match: /<>/dgv,
          name: "keyword.operator.string.gleam"
        },
        {
          match: /\|/dgv,
          name: "keyword.operator.other.gleam"
        },
        {
          match: /([\-\*\+\/]\.)/dgv,
          name: "keyword.operator.arithmetic.float.gleam"
        },
        {
          match: /([\-\%\*\+\/])/dgv,
          name: "keyword.operator.arithmetic.int.gleam"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.gleam"
        }
      ]
    },
    octal_number: {
      match: /\b0[Oo][0-7_]*\b/dgv,
      name: "constant.numeric.octal.gleam",
      patterns: []
    },
    strings: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.gleam",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.gleam"
        }
      ]
    }
  },
  dependencies: []
};
