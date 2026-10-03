export default {
  name: "luau",
  displayName: "Luau",
  scopeName: "source.luau",
  patterns: [
    { include: "#function-definition" },
    { include: "#number" },
    { include: "#string" },
    { include: "#shebang" },
    { include: "#comment" },
    { include: "#local-declaration" },
    { include: "#const-declaration" },
    { include: "#for-loop" },
    { include: "#type-function" },
    { include: "#type-alias-declaration" },
    { include: "#keyword" },
    { include: "#language_constant" },
    { include: "#standard_library" },
    { include: "#generics-instantiation" },
    { include: "#identifier" },
    { include: "#operator" },
    { include: "#parentheses" },
    { include: "#table" },
    { include: "#type_cast" },
    { include: "#type_annotation" },
    { include: "#attribute" }
  ],
  repository: {
    attribute: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.attribute.luau" },
            "2": { name: "storage.type.attribute.luau" }
          },
          match: /(@)([A-Z_a-z][0-9A-Z_a-z]*)/dgv,
          name: "meta.attribute.luau"
        }
      ]
    },
    comment: {
      patterns: [
        {
          begin: /--\[(=*)\[/dgv,
          end: /\]1\]/dgv,
          name: "comment.block.luau",
          patterns: [
            {
              begin: /(```luau?)\p{space}*(?=\n?$)/dgv,
              beginCaptures: {
                "1": { name: "comment.luau" }
              },
              name: "keyword.operator.other.luau",
              patterns: [
                { include: "source.luau" }
              ],
              while: /^(?!\p{space}*```)/dgv
            },
            {
              captures: {
                "1": { name: "comment.luau" }
              },
              match: /(```)/dgv,
              name: "keyword.operator.other.luau"
            },
            { include: "#doc_comment_tags" }
          ]
        },
        {
          begin: /---/dgv,
          end: /\n/dgv,
          name: "comment.line.double-dash.documentation.luau",
          patterns: [
            { include: "#doc_comment_tags" }
          ]
        },
        {
          begin: /--/dgv,
          end: /\n/dgv,
          name: "comment.line.double-dash.luau"
        }
      ]
    },
    "const-declaration": {
      begin: /\b(?:(export)\p{space}+)?(const)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.visibility.luau" },
        "2": { name: "storage.modifier.const.luau" }
      },
      end: /(?=\p{space}*[\;\=]|\p{space}*(?=\n?$))/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#attribute" },
        {
          begin: /(:)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.luau" }
          },
          end: /(?=\p{space}*[\,\;\=]|\p{space}*(?=\n?$))/dgv,
          patterns: [
            { include: "#type_literal" }
          ]
        },
        {
          match: /\b([A-Z_][0-9A-Z_]*)\b/dgv,
          name: "variable.other.constant.luau"
        },
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "variable.other.readwrite.luau"
        }
      ]
    },
    doc_comment_tags: {
      patterns: [
        {
          match: /@[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
          name: "storage.type.class.luadoc.luau"
        },
        {
          captures: {
            "1": { name: "storage.type.class.luadoc.luau" },
            "2": { name: "variable.parameter.luau" }
          },
          match: /((?<=[\!\*\/\p{space}])[\@\\]param)\p{space}+\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv
        }
      ]
    },
    "for-loop": {
      begin: /\b(for)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.luau" }
      },
      end: /\b(in)\b|(=)/dgv,
      endCaptures: {
        "1": { name: "keyword.control.luau" },
        "2": { name: "keyword.operator.assignment.luau" }
      },
      patterns: [
        {
          begin: /(:)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.luau" }
          },
          end: /(?=\p{space}*in\b|\p{space}*[\,\=]|\p{space}*(?=\n?$))/dgv,
          patterns: [
            { include: "#type_literal" }
          ]
        },
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "variable.parameter.luau"
        }
      ]
    },
    "function-definition": {
      begin: /\b(?:(local)\p{space}+|(const)\p{space}+|(export)\p{space}+)?(function)\b(?![\,\:])/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.local.luau" },
        "2": { name: "storage.modifier.const.luau" },
        "3": { name: "storage.modifier.visibility.luau" },
        "4": { name: "keyword.control.luau" }
      },
      end: /(?<=[\-\]"'\)\[\{\}])/dgv,
      name: "meta.function.luau",
      patterns: [
        { include: "#comment" },
        { include: "#generics-declaration" },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.parameters.begin.luau" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.luau" }
          },
          name: "meta.parameter.luau",
          patterns: [
            { include: "#comment" },
            {
              match: /\.\.\./dgv,
              name: "variable.parameter.function.varargs.luau"
            },
            {
              match: /[A-Z_a-z][0-9A-Z_a-z]*/dgv,
              name: "variable.parameter.function.luau"
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.arguments.luau"
            },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.type.luau" }
              },
              end: /(?=[\)\,])/dgv,
              patterns: [
                { include: "#type_literal" }
              ]
            }
          ]
        },
        {
          match: /\b(__(?:add|call|concat|div|eq|index|len??|lt|metatable|mode??|mul|newindex|pow|sub|tostring|unm|iter|idiv))\b/dgv,
          name: "variable.language.metamethod.luau"
        },
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "entity.name.function.luau"
        }
      ]
    },
    "generics-declaration": {
      begin: /(<)/dgv,
      end: /(>)/dgv,
      patterns: [
        {
          match: /[A-Z_a-z][0-9A-Z_a-z]*/dgv,
          name: "entity.name.type.luau"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.luau"
        },
        { include: "#type_literal" }
      ]
    },
    "generics-instantiation": {
      begin: /(<<)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.typeparameters.begin.luau" }
      },
      end: /(>>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.typeparameters.end.luau" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#type_literal" }
      ]
    },
    identifier: {
      patterns: [
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b(?=\p{space}*(?:<<|["'\(\{]|\[\[))/dgv,
          name: "entity.name.function.luau"
        },
        {
          match: /(?<=[^\.]\.|:)\b([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "variable.other.property.luau"
        },
        {
          match: /\b([A-Z_][0-9A-Z_]*)\b/dgv,
          name: "variable.other.constant.luau"
        },
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "variable.other.readwrite.luau"
        }
      ]
    },
    interpolated_string_expression: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.interpolated-string-expression.begin.luau" }
      },
      contentName: "meta.embedded.line.luau",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.interpolated-string-expression.end.luau" }
      },
      name: "meta.template.expression.luau",
      patterns: [
        { include: "source.luau" }
      ]
    },
    keyword: {
      patterns: [
        {
          match: /\b(break|do|else|for|if|elseif|return|then|repeat|while|until|end|in|continue)\b/dgv,
          name: "keyword.control.luau"
        },
        {
          match: /\b(local)\b/dgv,
          name: "storage.modifier.local.luau"
        },
        {
          match: /\b(const)\b/dgv,
          name: "storage.modifier.const.luau"
        },
        {
          match: /\b(function)\b(?![\,\:])/dgv,
          name: "keyword.control.luau"
        },
        {
          match: /(?<![^\.]\.|:)\b(self)\b/dgv,
          name: "variable.language.self.luau"
        },
        {
          match: /\b(and|or|not)\b/dgv,
          name: "keyword.operator.logical.luau keyword.operator.wordlike.luau"
        },
        {
          match: /(?<=[^\.]\.|:)\b(__(?:add|call|concat|div|eq|index|len??|lt|metatable|mode??|mul|newindex|pow|sub|tostring|unm))\b/dgv,
          name: "variable.language.metamethod.luau"
        },
        {
          match: /(?<!\.)\.{3}(?!\.)/dgv,
          name: "keyword.other.unit.luau"
        }
      ]
    },
    language_constant: {
      patterns: [
        {
          match: /(?<![^\.]\.|:)\b(false)\b/dgv,
          name: "constant.language.boolean.false.luau"
        },
        {
          match: /(?<![^\.]\.|:)\b(true)\b/dgv,
          name: "constant.language.boolean.true.luau"
        },
        {
          match: /(?<![^\.]\.|:)\b(nil(?!:))\b/dgv,
          name: "constant.language.nil.luau"
        }
      ]
    },
    "local-declaration": {
      begin: /\b(?:(export)\p{space}+)?(local)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.visibility.luau" },
        "2": { name: "storage.modifier.local.luau" }
      },
      end: /(?=\p{space}*do\b|\p{space}*[\;\=]|\p{space}*(?=\n?$))/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#attribute" },
        {
          begin: /(:)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.luau" }
          },
          end: /(?=\p{space}*do\b|\p{space}*[\,\;\=]|\p{space}*(?=\n?$))/dgv,
          patterns: [
            { include: "#type_literal" }
          ]
        },
        {
          match: /\b([A-Z_][0-9A-Z_]*)\b/dgv,
          name: "variable.other.constant.luau"
        },
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "variable.other.readwrite.luau"
        }
      ]
    },
    number: {
      patterns: [
        {
          match: /\b0_*[Xx]_*[A-Fa-f\p{Nd}][A-F_a-f\p{Nd}]*i?/dgv,
          name: "constant.numeric.hex.luau"
        },
        {
          match: /\b0_*[Bb]_*[01][01_]*i?/dgv,
          name: "constant.numeric.binary.luau"
        },
        {
          match: /\p{Nd}[_\p{Nd}]*i/dgv,
          name: "constant.numeric.decimal.luau"
        },
        {
          match: /(?:\p{Nd}[_\p{Nd}]*(?:\.[_\p{Nd}]*)?|\.\p{Nd}[_\p{Nd}]*)(?:[Ee][\-\+]?_*\p{Nd}[_\p{Nd}]*)?/dgv,
          name: "constant.numeric.decimal.luau"
        }
      ]
    },
    operator: {
      patterns: [
        {
          match: /==|~=|<=?|>=?/dgv,
          name: "keyword.operator.comparison.luau"
        },
        {
          match: /(?:[\-\+]|\/\/??|[\%\*\^]|\.\.|)=/dgv,
          name: "keyword.operator.assignment.luau"
        },
        {
          match: /[\-\%\*\+]|\/\/|[\/\^]/dgv,
          name: "keyword.operator.arithmetic.luau"
        },
        {
          match: /#|(?<!\.)\.{2}(?!\.)/dgv,
          name: "keyword.operator.other.luau"
        }
      ]
    },
    parentheses: {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.arguments.begin.luau" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.arguments.end.luau" }
      },
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.separator.arguments.luau"
        },
        { include: "source.luau" }
      ]
    },
    shebang: {
      captures: {
        "1": { name: "punctuation.definition.comment.luau" }
      },
      match: {
        A: [/￿(#!)[^\n]*(?=\n?$)\n?/dgv, /^(#!)[^\n]*(?=\n?$)\n?/dgv]
      },
      name: "comment.line.shebang.luau"
    },
    standard_library: {
      patterns: [
        {
          match: /(?<![^\.]\.|:)\b(assert|collectgarbage|error|gcinfo|getfenv|getmetatable|ipairs|loadstring|newproxy|next|pairs|pcall|print|rawequal|rawset|require|select|setfenv|setmetatable|tonumber|tostring|type|typeof|unpack|xpcall)\b/dgv,
          name: "support.function.luau"
        },
        {
          match: /(?<![^\.]\.|:)\b(_(?:G|VERSION))\b/dgv,
          name: "constant.language.luau"
        },
        {
          match: /(?<![^\.]\.|:)\b(bit32\.(?:arshift|band|bnot|bor|btest|bxor|extract|lrotate|lshift|replace|rrotate|rshift|countlz|countrz|byteswap)|coroutine\.(?:create|isyieldable|resume|running|status|wrap|yield|close)|debug\.(?:info|loadmodule|profilebegin|profileend|traceback)|integer\.(?:add|arshift|band|bnot|bor|bswap|btest|bxor|clamp|countlz|countrz|create|div|extract|fromstring|ge|gt|idiv|le|lrotate|lshift|lt|max|min|mod|mul|neg|rem|replace|rrotate|rshift|sub|tonumber|udiv|uge|ugt|ule|ult|urem)|math\.(?:abs|acos|asin|atan2??|ceil|clamp|cosh??|deg|exp|floor|fmod|frexp|isfinite|isinf|isnan|ldexp|lerp|log|log10|map|max|min|modf|noise|pow|rad|random|randomseed|round|sign|sinh??|sqrt|tanh??)|os\.(?:clock|date|difftime|time)|string\.(?:byte|char|find|format|gmatch|gsub|len|lower|match|pack|packsize|rep|reverse|split|sub|unpack|upper)|table\.(?:concat|create|find|foreachi??|getn|insert|maxn|move|pack|remove|sort|unpack|clear|freeze|isfrozen|clone)|task\.(?:spawn|synchronize|desynchronize|wait|defer|delay)|utf8\.(?:char|codepoint|codes|graphemes|len|nfcnormalize|nfdnormalize|offset)|buffer\.(?:create|fromstring|tostring|len|readbits|readi8|readu8|readi16|readu16|readi32|readu32|readinteger|readf32|readf64|writebits|writei8|writeu8|writei16|writeu16|writei32|writeu32|writeinteger|writef32|writef64|readstring|writestring|copy|fill)|vector\.(?:abs|angle|ceil|clamp|create|cross|dot|floor|lerp|magnitude|max|min|normalize|sign))\b/dgv,
          name: "support.function.luau"
        },
        {
          match: /(?<![^\.]\.|:)\b(bit32|buffer|coroutine|debug|integer(\.(m(?:ax|in)signed))?|math(\.(huge|pi|nan|e|phi|sqrt2|tau))?|os|string|table|task|utf8(\.charpattern)?|vector(\.(one|zero))?)\b/dgv,
          name: "support.constant.luau"
        },
        {
          match: /(?<![^\.]\.|:)\b(delay|DebuggerManager|elapsedTime|PluginManager|printidentity|settings|spawn|stats|tick|time|UserSettings|version|wait|warn)\b/dgv,
          name: "support.function.luau"
        },
        {
          match: /(?<![^\.]\.|:)\b(game|plugin|shared|script|workspace|Enum(?:\.[\p{L}\p{M}\p{N}\p{Pc}]+){0,2})\b/dgv,
          name: "constant.language.luau"
        }
      ]
    },
    string: {
      patterns: [
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.luau",
          patterns: [
            { include: "#string_escape" }
          ]
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.luau",
          patterns: [
            { include: "#string_escape" }
          ]
        },
        {
          begin: /\[(=*)\[/dgv,
          end: /\]1\]/dgv,
          name: "string.other.multiline.luau"
        },
        {
          begin: /`/dgv,
          end: /`/dgv,
          name: "string.interpolated.luau",
          patterns: [
            { include: "#interpolated_string_expression" },
            { include: "#string_escape" }
          ]
        }
      ]
    },
    string_escape: {
      patterns: [
        {
          match: /\\["'\\\`abfnrtvz\{]/dgv,
          name: "constant.character.escape.luau"
        },
        {
          match: /\\\p{Nd}{1,3}/dgv,
          name: "constant.character.escape.luau"
        },
        {
          match: /\\x\p{AHex}{2}/dgv,
          name: "constant.character.escape.luau"
        },
        {
          match: /\\u\{\p{AHex}*\}/dgv,
          name: "constant.character.escape.luau"
        },
        {
          match: /\\(?=\n?$)/dgv,
          name: "constant.character.escape.luau"
        }
      ]
    },
    table: {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.table.begin.luau" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.table.end.luau" }
      },
      patterns: [
        {
          match: /[\,\;]/dgv,
          name: "punctuation.separator.fields.luau"
        },
        { include: "source.luau" }
      ]
    },
    "type-alias-declaration": {
      begin: /(?<![^\.]\.|:)\b(?:(export)\p{space}+)?(type)\b(?=\p{space}+(?!function\b)[A-Z_a-z][0-9A-Z_a-z]*)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.visibility.luau" },
        "2": { name: "storage.type.luau" }
      },
      end: /(?=[\]\)\,\}](?!\p{space}*[\&\|]))|(?=\p{space}*;)|(?=\p{space}*(?:[\%\*\+\^]|\/\/?|(?<!\.)\.\.(?!\.)|-(?![\-\>\`])|~=|==))|(?=\p{space}*\b(?:and|or|break|const|continue|do|else|elseif|end|for|function|if|in|local|repeat|return|then|until|while)\b)|(?=^\p{space}*(?=\n?$))|(?=^\p{space}*(?:@|\b(?:export\p{space}+)?type\b))|(?=^\p{space}*[A-Z_a-z][0-9A-Z_a-z]*(?:\.[A-Z_a-z][0-9A-Z_a-z]*)*\p{space}*(?:(?:[\-\%\*\+\/\^]|\.\.)?=(?!=)|[\(\:\[]))/dgv,
      patterns: [
        { include: "#type_literal" },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.luau"
        }
      ]
    },
    "type-function": {
      begin: /(?<![^\.]\.|:)\b(?:(export)\p{space}+)?(type)\p{space}+(function)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.visibility.luau" },
        "2": { name: "storage.type.luau" },
        "3": { name: "keyword.control.luau" }
      },
      end: /(?<=[\-\]"'\)\[\{\}])/dgv,
      name: "meta.function.luau",
      patterns: [
        { include: "#comment" },
        { include: "#generics-declaration" },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.parameters.begin.luau" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.luau" }
          },
          name: "meta.parameter.luau",
          patterns: [
            { include: "#comment" },
            {
              match: /\.\.\./dgv,
              name: "variable.parameter.function.varargs.luau"
            },
            {
              match: /[A-Z_a-z][0-9A-Z_a-z]*/dgv,
              name: "variable.parameter.function.luau"
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.arguments.luau"
            },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.type.luau" }
              },
              end: /(?=[\)\,])/dgv,
              patterns: [
                { include: "#type_literal" }
              ]
            }
          ]
        },
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "entity.name.type.luau"
        }
      ]
    },
    type_annotation: {
      begin: /:(?!\b([A-Z_a-z][0-9A-Z_a-z]*)\b(?=\p{space}*(?:<<|["'\(\{]|\[\[)))/dgv,
      end: /(?<=\))(?!\p{space}*->)|[\;\=]|(?=\n?$)|(?=\breturn\b)|(?=\bend\b)/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#type_literal" }
      ]
    },
    type_cast: {
      begin: /(::)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.typecast.luau" }
      },
      end: /(?=[\]\)\,\}](?!\p{space}*[\&\|]))|(?=\p{space}*;)|(?=\p{space}*(?:[\%\*\+\^]|\/\/?|(?<!\.)\.\.(?!\.)|-(?![\-\>\`])|~=|==))|(?=\p{space}*\b(?:and|or|break|const|continue|do|else|elseif|end|for|function|if|in|local|repeat|return|then|until|while)\b)|(?=^\p{space}*(?=\n?$))|(?=^\p{space}*(?:@|\b(?:export\p{space}+)?type\b))|(?=^\p{space}*[A-Z_a-z][0-9A-Z_a-z]*(?:\.[A-Z_a-z][0-9A-Z_a-z]*)*\p{space}*(?:(?:[\-\%\*\+\/\^]|\.\.)?=(?!=)|[\(\:\[]))/dgv,
      patterns: [
        { include: "#type_literal" }
      ]
    },
    type_literal: {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        {
          match: /[\&\?\|]/dgv,
          name: "keyword.operator.type.luau"
        },
        {
          match: /->/dgv,
          name: "keyword.operator.type.function.luau"
        },
        {
          match: /\b(false)\b/dgv,
          name: "constant.language.boolean.false.luau"
        },
        {
          match: /\b(true)\b/dgv,
          name: "constant.language.boolean.true.luau"
        },
        {
          match: /\b(nil|string|number|integer|boolean|thread|vector|buffer|unknown|never|any)\b/dgv,
          name: "support.type.primitive.luau"
        },
        {
          begin: /\b(typeof)\b(\()/dgv,
          beginCaptures: {
            "1": { name: "support.function.luau" },
            "2": { name: "punctuation.arguments.begin.typeof.luau" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.arguments.end.typeof.luau" }
          },
          patterns: [
            { include: "source.luau" }
          ]
        },
        {
          begin: /(<)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.typeparameters.begin.luau" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.typeparameters.end.luau" }
          },
          patterns: [
            {
              match: /=/dgv,
              name: "keyword.operator.assignment.luau"
            },
            { include: "#type_literal" }
          ]
        },
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "entity.name.type.luau"
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          patterns: [
            {
              begin: /\[/dgv,
              end: /\]/dgv,
              patterns: [
                { include: "#type_literal" }
              ]
            },
            {
              captures: {
                "1": { name: "storage.modifier.access.luau" },
                "2": { name: "variable.property.luau" },
                "3": { name: "keyword.operator.type.luau" }
              },
              match: /\b(?:(read|write)\p{space}+)?([A-Z_a-z][0-9A-Z_a-z]*)\b(:)/dgv
            },
            { include: "#type_literal" },
            {
              match: /[\,\;]/dgv,
              name: "punctuation.separator.fields.type.luau"
            }
          ]
        },
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "variable.parameter.luau" },
                "2": { name: "keyword.operator.type.luau" }
              },
              match: /\b([A-Z_a-z][0-9A-Z_a-z]*)\b(:)/dgv,
              name: "variable.parameter.luau"
            },
            { include: "#type_literal" }
          ]
        }
      ]
    }
  },
  dependencies: []
};
