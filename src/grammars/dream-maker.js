import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "dream-maker",
  displayName: "Dream Maker",
  scopeName: "source.dm",
  patterns: [
    { include: "#preprocessor-rule-enabled" },
    { include: "#preprocessor-rule-disabled" },
    { include: "#preprocessor-rule-other" },
    { include: "#comments" },
    {
      captures: {
        "1": { name: "storage.type.dm" },
        "2": { name: "storage.modifier.dm" },
        "3": { name: "storage.type.dm" },
        "5": { name: "variable.other.dm" }
      },
      match: /(var)[ \/](?:(static|global|tmp|const)\/)?(?:(datum|atom(?:\/movable)?|obj|mob|turf|area|savefile|list|client|sound|image|database|matrix|regex|exception)\/)?(?:([\-\$0-9A-Z_a-z]*)\/)*([\$0-9A-Z_a-z]*)\b/dgv,
      name: "meta.initialization.dm"
    },
    {
      match: /\b((0([Xx])\p{AHex}*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)\b/dgv,
      name: "constant.numeric.dm"
    },
    {
      match: /\b(sleep|spawn|break|continue|do|else|for|goto|if|return|switch|while)\b/dgv,
      name: "keyword.control.dm"
    },
    {
      match: /\b(del|new)\b/dgv,
      name: "keyword.other.dm"
    },
    {
      match: /\b(proc|verb|datum|atom(\/movable)?|obj|mob|turf|area|savefile|list|client|sound|image|database|matrix|regex|exception)\b/dgv,
      name: "storage.type.dm"
    },
    {
      match: /\b(as|const|global|set|static|tmp)\b/dgv,
      name: "storage.modifier.dm"
    },
    {
      match: /\b(usr|world|src|args)\b/dgv,
      name: "variable.language.dm"
    },
    {
      match: /(\?|([\<\>])(=)?|[\.\:]|\/(=)?|~|\+([\+\=])?|-([\-\=])?|\*([\*\=])?|%|>>|<<|=(=)?|!(=)?|<>|&&??|[\^\|]|\|\||\bto\b|\bin\b|\bstep\b)/dgv,
      name: "keyword.operator.dm"
    },
    {
      match: /\b([A-Z_][0-9A-Z_]*)\b/dgv,
      name: "constant.language.dm"
    },
    {
      match: /\bnull\b/dgv,
      name: "constant.language.dm"
    },
    {
      begin: /\{"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.dm" }
      },
      end: /"\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.dm" }
      },
      name: "string.quoted.triple.dm",
      patterns: [
        { include: "#string_escaped_char" },
        { include: "#string_embedded_expression" }
      ]
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.dm" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.dm" }
      },
      name: "string.quoted.double.dm",
      patterns: [
        { include: "#string_escaped_char" },
        { include: "#string_embedded_expression" }
      ]
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.dm" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.dm" }
      },
      name: "string.quoted.single.dm",
      patterns: [
        { include: "#string_escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("^\\p{space}*((#)\\p{space}*define)\\p{space}+((?<id>[A-Z_a-z][0-9A-Z_a-z]*))(\\()(\\p{space}*([A-Z_a-z][0-9A-Z_a-z]*)\\p{space}*((,)\\p{space}*([A-Z_a-z][0-9A-Z_a-z]*)\\p{space}*)*(?:\\.\\.\\.)?)(\\))", "dgv", { hiddenCaptures: [7, 10], transfers: [[4, [7, 10]]] }),
      beginCaptures: {
        "1": { name: "keyword.control.directive.define.dm" },
        "2": { name: "punctuation.definition.directive.dm" },
        "3": { name: "entity.name.function.preprocessor.dm" },
        "5": { name: "punctuation.definition.parameters.begin.dm" },
        "6": { name: "variable.parameter.preprocessor.dm" },
        "8": { name: "punctuation.separator.parameters.dm" },
        "9": { name: "punctuation.definition.parameters.end.dm" }
      },
      end: /(?=\/[\*\/])|(?<!\\)(?=\n)/dgv,
      name: "meta.preprocessor.macro.dm",
      patterns: [
        { include: "$base" }
      ]
    },
    {
      begin: /^\p{space}*((#)\p{space}*define)\p{space}+((?<id>[A-Z_a-z][0-9A-Z_a-z]*))/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.directive.define.dm" },
        "2": { name: "punctuation.definition.directive.dm" },
        "3": { name: "variable.other.preprocessor.dm" }
      },
      end: /(?=\/[\*\/])|(?<!\\)(?=\n)/dgv,
      name: "meta.preprocessor.macro.dm",
      patterns: [
        { include: "$base" }
      ]
    },
    {
      begin: /^\p{space}*(#\p{space}*(error|warn))\b/dgv,
      captures: {
        "1": { name: "keyword.control.import.error.dm" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.preprocessor.diagnostic.dm",
      patterns: [
        {
          match: new EmulatedRegExp("(?:(?=(\\\\\\p{space}*\\n))\\1)", "dgv", { hiddenCaptures: [1] }),
          name: "punctuation.separator.continuation.dm"
        }
      ]
    },
    {
      begin: /^\p{space}*(?:((#)\p{space}*(?:elif|else|if|ifdef|ifndef))|((#)\p{space}*(undef|include)))\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.directive.conditional.dm" },
        "2": { name: "punctuation.definition.directive.dm" },
        "3": { name: "keyword.control.directive.$5.dm" },
        "4": { name: "punctuation.definition.directive.dm" }
      },
      end: /(?=\/[\*\/])|(?<!\\)(?=\n)/dgv,
      name: "meta.preprocessor.dm",
      patterns: [
        {
          match: new EmulatedRegExp("(?:(?=(\\\\\\p{space}*\\n))\\1)", "dgv", { hiddenCaptures: [1] }),
          name: "punctuation.separator.continuation.dm"
        }
      ]
    },
    { include: "#block" },
    {
      begin: new EmulatedRegExp("(?:^|(?:(?=\\p{space})(?<!else|new|return)(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=\\p{space}*[A-Z_a-z])(?<!&&)(?<=[\\&\\*\\>])))(\\p{space}*)(?!(while|for|do|if|else|switch|catch|enumerate|return|r?iterate)\\p{space}*\\()((?:(?=((?:[A-Z_a-z](?:(?=([0-9A-Z_a-z]*))\\5)|::)+))\\4)|(?<=operator)(?:[\\-\\!\\&\\*\\+\\<\\=\\>]+|\\(\\)|\\[\\]))\\p{space}*(?=\\()", "dgv", { hiddenCaptures: [4, 5] }),
      beginCaptures: {
        "1": { name: "punctuation.whitespace.function.leading.dm" },
        "3": { name: "entity.name.function.dm" },
        "4": { name: "punctuation.definition.parameters.dm" }
      },
      end: /(?<=\})|(?=#)|(;)?/dgv,
      name: "meta.function.dm",
      patterns: [
        { include: "#comments" },
        { include: "#parens" },
        {
          match: /\bconst\b/dgv,
          name: "storage.modifier.dm"
        },
        { include: "#block" }
      ]
    }
  ],
  repository: {
    access: {
      match: /\.[A-Z_a-z][0-9A-Z_a-z]*\b(?!\p{space}*\()/dgv,
      name: "variable.other.dot-access.dm"
    },
    block: {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "meta.block.dm",
      patterns: [
        { include: "#block_innards" }
      ]
    },
    block_innards: {
      patterns: [
        { include: "#preprocessor-rule-enabled-block" },
        { include: "#preprocessor-rule-disabled-block" },
        { include: "#preprocessor-rule-other-block" },
        { include: "#access" },
        {
          captures: {
            "1": { name: "punctuation.whitespace.function-call.leading.dm" },
            "2": { name: "support.function.any-method.dm" },
            "3": { name: "punctuation.definition.parameters.dm" }
          },
          match: new EmulatedRegExp("(?:(?=\\p{space})(?:(?<=else|new|return)|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}]))(\\p{space}+))?\\b((?!(while|for|do|if|else|switch|catch|enumerate|return|r?iterate)\\p{space}*\\()(?:(?=((?:(?!NS)[A-Z_a-z](?:(?=([0-9A-Z_a-z]*))\\5)\\b|::)+))\\4))\\p{space}*(\\()", "dgv", { hiddenCaptures: [4, 5] }),
          name: "meta.function-call.dm"
        },
        { include: "#block" },
        { include: "$base" }
      ]
    },
    comments: {
      patterns: [
        {
          captures: {
            "1": { name: "meta.toc-list.banner.block.dm" }
          },
          match: /^\/\* =(\p{space}*[^\n]*?)\p{space}*= \*\/(?=\n?$)\n?/dgv,
          name: "comment.block.dm"
        },
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.dm" }
          },
          end: /\*\//dgv,
          name: "comment.block.dm",
          patterns: [
            { include: "#comments" }
          ]
        },
        {
          match: /\*\/[^\n]*\n/dgv,
          name: "invalid.illegal.stray-comment-end.dm"
        },
        {
          captures: {
            "1": { name: "meta.toc-list.banner.line.dm" }
          },
          match: /^\/\/ =(\p{space}*[^\n]*?)\p{space}*=\p{space}*(?=\n?$)\n?/dgv,
          name: "comment.line.banner.dm"
        },
        {
          begin: /\/\//dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.dm" }
          },
          end: /(?=\n?$)\n?/dgv,
          name: "comment.line.double-slash.dm",
          patterns: [
            {
              match: new EmulatedRegExp("(?:(?=(\\\\\\p{space}*\\n))\\1)", "dgv", { hiddenCaptures: [1] }),
              name: "punctuation.separator.continuation.dm"
            }
          ]
        }
      ]
    },
    disabled: {
      begin: /^\p{space}*#\p{space}*if(n?def)?\b[^\n]*(?=\n?$)/dgv,
      end: /^\p{space}*#\p{space}*endif\b[^\n]*(?=\n?$)/dgv,
      patterns: [
        { include: "#disabled" }
      ]
    },
    parens: {
      begin: /\(/dgv,
      end: /\)/dgv,
      name: "meta.parens.dm",
      patterns: [
        { include: "$base" }
      ]
    },
    "preprocessor-rule-disabled": {
      begin: /^\p{space}*(#(if)\p{space}+(0))\b[^\n]*/dgv,
      captures: {
        "1": { name: "meta.preprocessor.dm" },
        "2": { name: "keyword.control.import.if.dm" },
        "3": { name: "constant.numeric.preprocessor.dm" }
      },
      end: /^\p{space}*(#\p{space}*(endif))\b/dgv,
      patterns: [
        {
          begin: /^\p{space}*(#\p{space}*(else))\b/dgv,
          captures: {
            "1": { name: "meta.preprocessor.dm" },
            "2": { name: "keyword.control.import.else.dm" }
          },
          end: /(?=^\p{space}*#\p{space}*endif\b[^\n]*(?=\n?$))/dgv,
          patterns: [
            { include: "$base" }
          ]
        },
        {
          begin: /(?:)/dgv,
          end: /(?=^\p{space}*#\p{space}*(e(?:lse|ndif))\b[^\n]*(?=\n?$))/dgv,
          name: "comment.block.preprocessor.if-branch",
          patterns: [
            { include: "#disabled" }
          ]
        }
      ]
    },
    "preprocessor-rule-disabled-block": {
      begin: /^\p{space}*(#(if)\p{space}+(0))\b[^\n]*/dgv,
      captures: {
        "1": { name: "meta.preprocessor.dm" },
        "2": { name: "keyword.control.import.if.dm" },
        "3": { name: "constant.numeric.preprocessor.dm" }
      },
      end: /^\p{space}*(#\p{space}*(endif))\b/dgv,
      patterns: [
        {
          begin: /^\p{space}*(#\p{space}*(else))\b/dgv,
          captures: {
            "1": { name: "meta.preprocessor.dm" },
            "2": { name: "keyword.control.import.else.dm" }
          },
          end: /(?=^\p{space}*#\p{space}*endif\b[^\n]*(?=\n?$))/dgv,
          patterns: [
            { include: "#block_innards" }
          ]
        },
        {
          begin: /(?:)/dgv,
          end: /(?=^\p{space}*#\p{space}*(e(?:lse|ndif))\b[^\n]*(?=\n?$))/dgv,
          name: "comment.block.preprocessor.if-branch.in-block",
          patterns: [
            { include: "#disabled" }
          ]
        }
      ]
    },
    "preprocessor-rule-enabled": {
      begin: /^\p{space}*(#(if)\p{space}+(0*1))\b/dgv,
      captures: {
        "1": { name: "meta.preprocessor.dm" },
        "2": { name: "keyword.control.import.if.dm" },
        "3": { name: "constant.numeric.preprocessor.dm" }
      },
      end: /^\p{space}*(#\p{space}*(endif))\b/dgv,
      patterns: [
        {
          begin: /^\p{space}*(#\p{space}*(else))\b[^\n]*/dgv,
          captures: {
            "1": { name: "meta.preprocessor.dm" },
            "2": { name: "keyword.control.import.else.dm" }
          },
          contentName: "comment.block.preprocessor.else-branch",
          end: /(?=^\p{space}*#\p{space}*endif\b[^\n]*(?=\n?$))/dgv,
          patterns: [
            { include: "#disabled" }
          ]
        },
        {
          begin: /(?:)/dgv,
          end: /(?=^\p{space}*#\p{space}*(e(?:lse|ndif))\b[^\n]*(?=\n?$))/dgv,
          patterns: [
            { include: "$base" }
          ]
        }
      ]
    },
    "preprocessor-rule-enabled-block": {
      begin: /^\p{space}*(#(if)\p{space}+(0*1))\b/dgv,
      captures: {
        "1": { name: "meta.preprocessor.dm" },
        "2": { name: "keyword.control.import.if.dm" },
        "3": { name: "constant.numeric.preprocessor.dm" }
      },
      end: /^\p{space}*(#\p{space}*(endif))\b/dgv,
      patterns: [
        {
          begin: /^\p{space}*(#\p{space}*(else))\b[^\n]*/dgv,
          captures: {
            "1": { name: "meta.preprocessor.dm" },
            "2": { name: "keyword.control.import.else.dm" }
          },
          contentName: "comment.block.preprocessor.else-branch.in-block",
          end: /(?=^\p{space}*#\p{space}*endif\b[^\n]*(?=\n?$))/dgv,
          patterns: [
            { include: "#disabled" }
          ]
        },
        {
          begin: /(?:)/dgv,
          end: /(?=^\p{space}*#\p{space}*(e(?:lse|ndif))\b[^\n]*(?=\n?$))/dgv,
          patterns: [
            { include: "#block_innards" }
          ]
        }
      ]
    },
    "preprocessor-rule-other": {
      begin: /^\p{space}*((#\p{space}*(if(n?def)?))\b[^\n]*?(?:(?=\/[\*\/])|(?=\n?$)))/dgv,
      captures: {
        "1": { name: "meta.preprocessor.dm" },
        "2": { name: "keyword.control.import.dm" }
      },
      end: /^\p{space}*((#\p{space}*(endif)))\b[^\n]*(?=\n?$)/dgv,
      patterns: [
        { include: "$base" }
      ]
    },
    "preprocessor-rule-other-block": {
      begin: /^\p{space}*(#\p{space}*(if(n?def)?)\b[^\n]*?(?:(?=\/[\*\/])|(?=\n?$)))/dgv,
      captures: {
        "1": { name: "meta.preprocessor.dm" },
        "2": { name: "keyword.control.import.dm" }
      },
      end: /^\p{space}*(#\p{space}*(endif))\b[^\n]*(?=\n?$)/dgv,
      patterns: [
        { include: "#block_innards" }
      ]
    },
    string_embedded_expression: {
      patterns: [
        {
          begin: /(?<!\\)\[/dgv,
          end: /\]/dgv,
          name: "string.interpolated.dm",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    string_escaped_char: {
      patterns: [
        {
          match: /\\(h(?:(?:er|im)self|ers|im)|([STst]?he)|He|[Hh]is|[Aa]n?|(?:im)?proper|\.\.\.|(?:icon|ref|[Rr]oman)(?=\[)|[\n "\<\>\[ns])/dgv,
          name: "constant.character.escape.dm"
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.unknown-escape.dm"
        }
      ]
    }
  },
  dependencies: []
};
