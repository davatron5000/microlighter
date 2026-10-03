export default {
  name: "openscad",
  displayName: "OpenSCAD",
  aliases: [
    "scad"
  ],
  scopeName: "source.scad",
  patterns: [
    {
      captures: {
        "1": { name: "keyword.control.scad" }
      },
      match: /^(module)\p{space}[^\n]*(?=\n?$)/dgv,
      name: "meta.function.scad"
    },
    {
      match: /\b(if|else|for|intersection_for|assign|render|function|include|use)\b/dgv,
      name: "keyword.control.scad"
    },
    {
      begin: /\/\*\*(?!\/)/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.scad" }
      },
      end: /\*\//dgv,
      name: "comment.block.documentation.scad"
    },
    {
      begin: /\/\*/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.scad" }
      },
      end: /\*\//dgv,
      name: "comment.block.scad"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.comment.scad" }
      },
      match: /(\/\/)[^\n]*(?=\n?$)\n?/dgv,
      name: "comment.line.double-slash.scad"
    },
    {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.scad",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.scad"
        }
      ]
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.scad" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.scad" }
      },
      name: "string.quoted.single.scad",
      patterns: [
        {
          match: /\\(x\p{AHex}{2}|[012][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|[^\n])/dgv,
          name: "constant.character.escape.scad"
        }
      ]
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.scad" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.scad" }
      },
      name: "string.quoted.double.scad",
      patterns: [
        {
          match: /\\(x\p{AHex}{2}|[012][0-7]{0,2}|3[0-6][0-7]|37[0-7]?|[4-7][0-7]?|[^\n])/dgv,
          name: "constant.character.escape.scad"
        }
      ]
    },
    {
      match: /\b(abs|acos|asun|atan2??|ceil|cos|exp|floor|ln|log|lookup|max|min|pow|rands|round|sign|sin|sqrt|tan|str|cube|sphere|cylinder|polyhedron|scale|rotate|translate|mirror|multimatrix|color|minkowski|hull|union|difference|intersection|echo)\b/dgv,
      name: "support.function.scad"
    },
    {
      match: /;/dgv,
      name: "punctuation.terminator.statement.scad"
    },
    {
      match: /,[\t \|]*/dgv,
      name: "meta.delimiter.object.comma.scad"
    },
    {
      match: /\./dgv,
      name: "meta.delimiter.method.period.scad"
    },
    {
      match: /[\{\}]/dgv,
      name: "meta.brace.curly.scad"
    },
    {
      match: /[\(\)]/dgv,
      name: "meta.brace.round.scad"
    },
    {
      match: /[\]\[]/dgv,
      name: "meta.brace.square.scad"
    },
    {
      match: /[\!\$\%\&\*]|--?|\+\+|[\+\~]|===?|=|!==??|<=|>=|<<=|>>=|>>>=|<>|[\!\<\>]|&&|\|\||\?:|\*=|(?<!\()\/=|%=|\+=|-=|&=|\^=|\b(in|instanceof|new|delete|typeof|void)\b/dgv,
      name: "keyword.operator.scad"
    },
    {
      match: /\b((0([Xx])\p{AHex}+)|([0-9]+(\.[0-9]+)?))\b/dgv,
      name: "constant.numeric.scad"
    },
    {
      match: /\btrue\b/dgv,
      name: "constant.language.boolean.true.scad"
    },
    {
      match: /\bfalse\b/dgv,
      name: "constant.language.boolean.false.scad"
    }
  ],
  dependencies: []
};
