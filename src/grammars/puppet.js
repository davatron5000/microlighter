export default {
  name: "puppet",
  displayName: "Puppet",
  scopeName: "source.puppet",
  patterns: [
    { include: "#line_comment" },
    { include: "#constants" },
    {
      begin: /^\p{space}*\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.puppet"
    },
    {
      begin: /\b(node)\b/dgv,
      captures: {
        "1": { name: "storage.type.puppet" },
        "2": { name: "entity.name.type.class.puppet" }
      },
      end: /(?=\{)/dgv,
      name: "meta.definition.class.puppet",
      patterns: [
        {
          match: /\bdefault\b/dgv,
          name: "keyword.puppet"
        },
        { include: "#strings" },
        { include: "#regex-literal" }
      ]
    },
    {
      begin: /\b(class)\p{space}+((?:[a-z][0-9_a-z]*)?(?:::[a-z][0-9_a-z]*)+|[a-z][0-9_a-z]*)\p{space}*/dgv,
      captures: {
        "1": { name: "storage.type.puppet" },
        "2": { name: "entity.name.type.class.puppet" }
      },
      end: /(?=\{)/dgv,
      name: "meta.definition.class.puppet",
      patterns: [
        {
          begin: /\b(inherits)\b\p{space}+/dgv,
          captures: {
            "1": { name: "storage.modifier.puppet" }
          },
          end: /(?=[\(\{])/dgv,
          name: "meta.definition.class.inherits.puppet",
          patterns: [
            {
              match: /\b((?:[\-"\.0-9A-Z_a-z]+::)*[\-"\.0-9A-Z_a-z]+)\b/dgv,
              name: "support.type.puppet"
            }
          ]
        },
        { include: "#line_comment" },
        { include: "#resource-parameters" },
        { include: "#parameter-default-types" }
      ]
    },
    {
      begin: /^\p{space}*(plan)\p{space}+((?:[a-z][0-9_a-z]*)?(?:::[a-z][0-9_a-z]*)+|[a-z][0-9_a-z]*)\p{space}*/dgv,
      captures: {
        "1": { name: "storage.type.puppet" },
        "2": { name: "entity.name.type.plan.puppet" }
      },
      end: /(?=\{)/dgv,
      name: "meta.definition.plan.puppet",
      patterns: [
        { include: "#line_comment" },
        { include: "#resource-parameters" },
        { include: "#parameter-default-types" }
      ]
    },
    {
      begin: /^\p{space}*(define|function)\p{space}+([a-z][0-9_a-z]*|(?:[a-z][0-9_a-z]*)?(?:::[a-z][0-9_a-z]*)+)\p{space}*(\()/dgv,
      captures: {
        "1": { name: "storage.type.function.puppet" },
        "2": { name: "entity.name.function.puppet" }
      },
      end: /(?=\{)/dgv,
      name: "meta.function.puppet",
      patterns: [
        { include: "#line_comment" },
        { include: "#resource-parameters" },
        { include: "#parameter-default-types" }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.control.puppet" }
      },
      match: /\b(case|else|elsif|if|unless)(?!::)\b/dgv
    },
    { include: "#keywords" },
    { include: "#resource-definition" },
    { include: "#heredoc" },
    { include: "#strings" },
    { include: "#puppet-datatypes" },
    { include: "#array" },
    {
      match: /((\$?)"?[A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*"?):(?=\p{space}+|(?=\n?$))/dgv,
      name: "entity.name.section.puppet"
    },
    { include: "#numbers" },
    { include: "#variable" },
    {
      begin: /\b(import|include|contain|require)\p{space}+(?![^\n]*=>)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.import.include.puppet" }
      },
      contentName: "variable.parameter.include.puppet",
      end: /(?=\p{space}|(?=\n?$))/dgv,
      name: "meta.include.puppet"
    },
    {
      match: /\b[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*(?==>)\p{space}*/dgv,
      name: "constant.other.key.puppet"
    },
    {
      match: /(?<=\{)\p{space}*[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*(?=\})/dgv,
      name: "constant.other.bareword.puppet"
    },
    {
      match: /\b(alert|crit|debug|defined|emerg|err|escape|fail|failed|file|generate|gsub|info|notice|package|realize|search|tag|tagged|template|warning)\b(?![^\n]*\{)/dgv,
      name: "support.function.puppet"
    },
    {
      match: /=>/dgv,
      name: "punctuation.separator.key-value.puppet"
    },
    {
      match: /->/dgv,
      name: "keyword.control.orderarrow.puppet"
    },
    {
      match: /~>/dgv,
      name: "keyword.control.notifyarrow.puppet"
    },
    { include: "#regex-literal" }
  ],
  repository: {
    array: {
      begin: /(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.array.begin.puppet" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.array.end.puppet" }
      },
      name: "meta.array.puppet",
      patterns: [
        {
          match: /\p{space}*,\p{space}*/dgv
        },
        { include: "#parameter-default-types" },
        { include: "#line_comment" }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b(absent|directory|false|file|present|running|stopped|true)\b(?![^\n]*\{)/dgv,
          name: "constant.language.puppet"
        }
      ]
    },
    "double-quoted-string": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.puppet" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.puppet" }
      },
      name: "string.quoted.double.interpolated.puppet",
      patterns: [
        { include: "#escaped_char" },
        { include: "#interpolated_puppet" }
      ]
    },
    escaped_char: {
      match: /\\[^\n]/dgv,
      name: "constant.character.escape.puppet"
    },
    function_call: {
      begin: /([A-Z_a-z][0-9A-Z_a-z]*)(\()/dgv,
      end: /\)/dgv,
      name: "meta.function-call.puppet",
      patterns: [
        { include: "#parameter-default-types" },
        {
          match: /,/dgv,
          name: "punctuation.separator.parameters.puppet"
        }
      ]
    },
    hash: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.hash.begin.puppet" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.hash.end.puppet" }
      },
      name: "meta.hash.puppet",
      patterns: [
        {
          match: /\b[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*(?==>)\p{space}*/dgv,
          name: "constant.other.key.puppet"
        },
        { include: "#parameter-default-types" },
        { include: "#line_comment" }
      ]
    },
    heredoc: {
      patterns: [
        {
          begin: /@\([\p{Zs}\t]*"([^\t \)\/\:]+)"[\p{Zs}\t]*(:[\p{Zs}\t]*[a-z][\+0-9A-Z_a-z]*[\p{Zs}\t]*)?(\/[\p{Zs}\t]*[\$Lnrst]*)?[\p{Zs}\t]*\)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.puppet" }
          },
          end: /^[\p{Zs}\t]*(\|[\p{Zs}\t]*-|[\-\|])?[\p{Zs}\t]*1/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.puppet" }
          },
          name: "string.interpolated.heredoc.puppet",
          patterns: [
            { include: "#escaped_char" },
            { include: "#interpolated_puppet" }
          ]
        },
        {
          begin: /@\([\p{Zs}\t]*([^\t \)\/\:]+)[\p{Zs}\t]*(:[\p{Zs}\t]*[a-z][\+0-9A-Z_a-z]*[\p{Zs}\t]*)?(\/[\p{Zs}\t]*[\$Lnrst]*)?[\p{Zs}\t]*\)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.puppet" }
          },
          end: /^[\p{Zs}\t]*(\|[\p{Zs}\t]*-|[\-\|])?[\p{Zs}\t]*1/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.puppet" }
          },
          name: "string.unquoted.heredoc.puppet"
        }
      ]
    },
    interpolated_puppet: {
      patterns: [
        {
          begin: /(\$\{)(\p{Nd}+)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.embedded.begin.puppet" },
            "2": { name: "source.puppet variable.other.readwrite.global.pre-defined.puppet" }
          },
          contentName: "source.puppet",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.puppet" }
          },
          name: "meta.embedded.line.puppet",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(\$\{)(_[0-9A-Z_a-z]*)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.embedded.begin.puppet" },
            "2": { name: "source.puppet variable.other.readwrite.global.puppet" }
          },
          contentName: "source.puppet",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.puppet" }
          },
          name: "meta.embedded.line.puppet",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(\$\{)(([a-z][0-9_a-z]*)?(?:::[a-z][0-9_a-z]*)*)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.embedded.begin.puppet" },
            "2": { name: "source.puppet variable.other.readwrite.global.puppet" }
          },
          contentName: "source.puppet",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.puppet" }
          },
          name: "meta.embedded.line.puppet",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\$\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.puppet" }
          },
          contentName: "source.puppet",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.puppet" }
          },
          name: "meta.embedded.line.puppet",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    keywords: {
      captures: {
        "1": { name: "keyword.puppet" }
      },
      match: /\b(undef)\b/dgv
    },
    line_comment: {
      patterns: [
        {
          captures: {
            "1": { name: "comment.line.number-sign.puppet" },
            "2": { name: "punctuation.definition.comment.puppet" }
          },
          match: /^((#)[^\n]*(?=\n?$)\n?)/dgv,
          name: "meta.comment.full-line.puppet"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.puppet" }
          },
          match: /(#)[^\n]*(?=\n?$)\n?/dgv,
          name: "comment.line.number-sign.puppet"
        }
      ]
    },
    nested_braces: {
      begin: /\{/dgv,
      captures: {
        "1": { name: "punctuation.section.scope.puppet" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_braces" }
      ]
    },
    nested_braces_interpolated: {
      begin: /\{/dgv,
      captures: {
        "1": { name: "punctuation.section.scope.puppet" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#escaped_char" },
        { include: "#variable" },
        { include: "#nested_braces_interpolated" }
      ]
    },
    nested_brackets: {
      begin: /\[/dgv,
      captures: {
        "1": { name: "punctuation.section.scope.puppet" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_brackets" }
      ]
    },
    nested_brackets_interpolated: {
      begin: /\[/dgv,
      captures: {
        "1": { name: "punctuation.section.scope.puppet" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#escaped_char" },
        { include: "#variable" },
        { include: "#nested_brackets_interpolated" }
      ]
    },
    nested_parens: {
      begin: /\(/dgv,
      captures: {
        "1": { name: "punctuation.section.scope.puppet" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_parens" }
      ]
    },
    nested_parens_interpolated: {
      begin: /\(/dgv,
      captures: {
        "1": { name: "punctuation.section.scope.puppet" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#escaped_char" },
        { include: "#variable" },
        { include: "#nested_parens_interpolated" }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])([\-\+]?)0x(?:[0-9a-f])+(?![\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])/dgiv,
          name: "constant.numeric.hexadecimal.puppet"
        },
        {
          match: /(?<![\.\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?)(?<!\p{Nd})\p{Nd}+(?:e([\-\+])?\p{Nd}+)?(?![\.\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])/dgiv,
          name: "constant.numeric.integer.puppet"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?)\p{Nd}+\.\p{Nd}+(?:e([\-\+])?\p{Nd}+)?(?![\p{L}\p{M}\p{N}\p{Pc}\p{Nd}])/dgiv,
          name: "constant.numeric.integer.puppet"
        }
      ]
    },
    "parameter-default-types": {
      patterns: [
        { include: "#strings" },
        { include: "#numbers" },
        { include: "#variable" },
        { include: "#hash" },
        { include: "#array" },
        { include: "#function_call" },
        { include: "#constants" },
        { include: "#puppet-datatypes" }
      ]
    },
    "puppet-datatypes": {
      patterns: [
        {
          match: /(?<![\$A-Za-z])([A-Z][0-9A-Z_a-z]*)(?![0-9A-Z_a-z])/dgv,
          name: "storage.type.puppet"
        }
      ]
    },
    "regex-literal": {
      match: /(\/)([^\n]+?)[^\\]\//dgv,
      name: "string.regexp.literal.puppet"
    },
    "resource-definition": {
      begin: /(?:^|\b)(::[a-z][0-9_a-z]*|[a-z][0-9_a-z]*|(?:[a-z][0-9_a-z]*)?(?:::[a-z][0-9_a-z]*)+)\p{space}*(\{)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "meta.definition.resource.puppet storage.type.puppet" }
      },
      contentName: "entity.name.section.puppet",
      end: /:/dgv,
      patterns: [
        { include: "#strings" },
        { include: "#variable" },
        { include: "#array" }
      ]
    },
    "resource-parameters": {
      patterns: [
        {
          captures: {
            "1": { name: "variable.other.puppet" },
            "2": { name: "punctuation.definition.variable.puppet" }
          },
          match: /((\$+)[A-Z_a-z][0-9A-Z_a-z]*)\p{space}*(?=[\)\,])/dgv,
          name: "meta.function.argument.puppet"
        },
        {
          begin: /((\$+)[A-Z_a-z][0-9A-Z_a-z]*)\p{space}*(=)\p{space}*\p{space}*/dgv,
          captures: {
            "1": { name: "variable.other.puppet" },
            "2": { name: "punctuation.definition.variable.puppet" },
            "3": { name: "keyword.operator.assignment.puppet" }
          },
          end: /(?=[\)\,])/dgv,
          name: "meta.function.argument.puppet",
          patterns: [
            { include: "#parameter-default-types" }
          ]
        }
      ]
    },
    "single-quoted-string": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.puppet" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.puppet" }
      },
      name: "string.quoted.single.puppet",
      patterns: [
        { include: "#escaped_char" }
      ]
    },
    strings: {
      patterns: [
        { include: "#double-quoted-string" },
        { include: "#single-quoted-string" }
      ]
    },
    variable: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.variable.puppet" }
          },
          match: /(\$)(\p{Nd}+)/dgv,
          name: "variable.other.readwrite.global.pre-defined.puppet"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.puppet" }
          },
          match: /(\$)_[0-9A-Z_a-z]*/dgv,
          name: "variable.other.readwrite.global.puppet"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.puppet" }
          },
          match: /(\$)(([a-z][0-9A-Z_a-z]*)?(?:::[a-z][0-9A-Z_a-z]*)*)/dgv,
          name: "variable.other.readwrite.global.puppet"
        }
      ]
    }
  },
  dependencies: []
};
