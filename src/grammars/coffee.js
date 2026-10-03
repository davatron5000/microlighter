import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "coffee",
  displayName: "CoffeeScript",
  aliases: [
    "coffeescript"
  ],
  scopeName: "source.coffee",
  patterns: [
    { include: "#jsx" },
    {
      captures: {
        "1": { name: "keyword.operator.new.coffee" },
        "2": { name: "storage.type.class.coffee" },
        "3": { name: "entity.name.type.instance.coffee" },
        "4": { name: "entity.name.type.instance.coffee" }
      },
      match: /(new)\p{space}+(?:(class)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+(?:\.[\p{L}\p{M}\p{N}\p{Pc}]*)*)?|([\p{L}\p{M}\p{N}\p{Pc}]+(?:\.[\p{L}\p{M}\p{N}\p{Pc}]*)*))/dgv,
      name: "meta.class.instance.constructor.coffee"
    },
    {
      begin: /'''/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.coffee" }
      },
      end: /'''/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.coffee" }
      },
      name: "string.quoted.single.heredoc.coffee",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.escape.backslash.coffee" }
          },
          match: /(\\)[^\n]/dgv,
          name: "constant.character.escape.backslash.coffee"
        }
      ]
    },
    {
      begin: /"""/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.coffee" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.coffee" }
      },
      name: "string.quoted.double.heredoc.coffee",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.escape.backslash.coffee" }
          },
          match: /(\\)[^\n]/dgv,
          name: "constant.character.escape.backslash.coffee"
        },
        { include: "#interpolated_coffee" }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.definition.string.begin.coffee" },
        "2": {
          name: "source.js.embedded.coffee",
          patterns: [
            { include: "source.js" }
          ]
        },
        "3": { name: "punctuation.definition.string.end.coffee" }
      },
      match: /(`)([^\n]*)(`)/dgv,
      name: "string.quoted.script.coffee"
    },
    {
      begin: /(?<!#)###(?!#)/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.coffee" }
      },
      end: /###/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.coffee" }
      },
      name: "comment.block.coffee",
      patterns: [
        {
          match: /(?<=^|\p{space})@[\p{L}\p{M}\p{N}\p{Pc}]*(?=\p{space})/dgv,
          name: "storage.type.annotation.coffee"
        }
      ]
    },
    {
      begin: /#/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.coffee" }
      },
      end: /(?=\n?$)/dgv,
      name: "comment.line.number-sign.coffee"
    },
    {
      begin: /\/\/\//dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.coffee" }
      },
      end: /(\/\/\/)[gimuy]*/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.coffee" }
      },
      name: "string.regexp.multiline.coffee",
      patterns: [
        { include: "#heregexp" }
      ]
    },
    {
      begin: /(?<![\$\p{L}\p{M}\p{N}\p{Pc}])(\/)(?=(?![\*\+\/\?])([^\n]+)(\/)[gimuy]*(?!\p{space}*[\$\(\/\p{L}\p{M}\p{N}\p{Pc}]))/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.coffee" }
      },
      end: /(\/)[gimuy]*(?!\p{space}*[\$\(\/\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.coffee" }
      },
      name: "string.regexp.coffee",
      patterns: [
        { include: "source.js.regexp" }
      ]
    },
    {
      match: /\b(?<![\$\.])(break|by|catch|continue|else|finally|for|in|of|if|return|switch|then|throw|try|unless|when|while|until|loop|do|export|import|default|from|as|yield|async|await|(?<=for)\p{space}+own)(?!\p{space}*:)\b/dgv,
      name: "keyword.control.coffee"
    },
    {
      match: /\b(?<![\$\.])(delete|instanceof|new|typeof)(?!\p{space}*:)\b/dgv,
      name: "keyword.operator.$1.coffee"
    },
    {
      match: /\b(?<![\$\.])(case|function|var|void|with|const|let|enum|native|__hasProp|__extends|__slice|__bind|__indexOf|implements|interface|package|private|protected|public|static)(?!\p{space}*:)\b/dgv,
      name: "keyword.reserved.coffee"
    },
    {
      begin: /(?<=\p{space}|^)((@)?[\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*([\:\=])\p{space}*(?=(\([^\(\)]*\)\p{space}*)?[\-\=]>)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.coffee" },
        "2": { name: "variable.other.readwrite.instance.coffee" },
        "3": { name: "keyword.operator.assignment.coffee" }
      },
      end: /[\-\=]>/dgv,
      endCaptures: {
        "0": { name: "storage.type.function.coffee" }
      },
      name: "meta.function.coffee",
      patterns: [
        { include: "#function_params" }
      ]
    },
    {
      begin: /(?<=\p{space}|^)(?:((')([^']*?)('))|((")([^"]*?)(")))\p{space}*([\:\=])\p{space}*(?=(\([^\(\)]*\)\p{space}*)?[\-\=]>)/dgv,
      beginCaptures: {
        "1": { name: "string.quoted.single.coffee" },
        "2": { name: "punctuation.definition.string.begin.coffee" },
        "3": { name: "entity.name.function.coffee" },
        "4": { name: "punctuation.definition.string.end.coffee" },
        "5": { name: "string.quoted.double.coffee" },
        "6": { name: "punctuation.definition.string.begin.coffee" },
        "7": { name: "entity.name.function.coffee" },
        "8": { name: "punctuation.definition.string.end.coffee" },
        "9": { name: "keyword.operator.assignment.coffee" }
      },
      end: /[\-\=]>/dgv,
      endCaptures: {
        "0": { name: "storage.type.function.coffee" }
      },
      name: "meta.function.coffee",
      patterns: [
        { include: "#function_params" }
      ]
    },
    {
      begin: /(?=(\([^\(\)]*\)\p{space}*)?[\-\=]>)/dgv,
      end: /[\-\=]>/dgv,
      endCaptures: {
        "0": { name: "storage.type.function.coffee" }
      },
      name: "meta.function.inline.coffee",
      patterns: [
        { include: "#function_params" }
      ]
    },
    {
      begin: /(?<=\p{space}|^)(\{)(?=[^"\#']+?\}[\]\}\p{space}]*=)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.destructuring.begin.bracket.curly.coffee" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.destructuring.end.bracket.curly.coffee" }
      },
      name: "meta.variable.assignment.destructured.object.coffee",
      patterns: [
        { include: "$self" },
        {
          match: /[\$A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.assignment.coffee"
        }
      ]
    },
    {
      begin: /(?<=\p{space}|^)(\[)(?=[^"\#']+?\][\]\}\p{space}]*=)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.destructuring.begin.bracket.square.coffee" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.destructuring.end.bracket.square.coffee" }
      },
      name: "meta.variable.assignment.destructured.array.coffee",
      patterns: [
        { include: "$self" },
        {
          match: /[\$A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.assignment.coffee"
        }
      ]
    },
    {
      match: /\b(?<!\.|::)(true|on|yes)(?!\p{space}*[\:\=][^\=])\b/dgv,
      name: "constant.language.boolean.true.coffee"
    },
    {
      match: /\b(?<!\.|::)(false|off|no)(?!\p{space}*[\:\=][^\=])\b/dgv,
      name: "constant.language.boolean.false.coffee"
    },
    {
      match: /\b(?<!\.|::)null(?!\p{space}*[\:\=][^\=])\b/dgv,
      name: "constant.language.null.coffee"
    },
    {
      match: /\b(?<!\.|::)extends(?!\p{space}*[\:\=])\b/dgv,
      name: "variable.language.coffee"
    },
    {
      match: /(?<!\.)\b(?<!\$)(super|this|arguments)(?!\p{space}*[\:\=][^\=]|\$)\b/dgv,
      name: "variable.language.$1.coffee"
    },
    {
      captures: {
        "1": { name: "storage.type.class.coffee" },
        "2": { name: "keyword.control.inheritance.coffee" },
        "3": { name: "entity.other.inherited-class.coffee" }
      },
      match: /(?<=\p{space}|^|[\(\[])(class)\p{space}+(extends)\p{space}+(@?[\$\.A-Z_a-z][\.\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      name: "meta.class.coffee"
    },
    {
      captures: {
        "1": { name: "storage.type.class.coffee" },
        "2": { name: "entity.name.type.class.coffee" },
        "3": { name: "keyword.control.inheritance.coffee" },
        "4": { name: "entity.other.inherited-class.coffee" }
      },
      match: /(?<=\p{space}|^|[\(\[])(class)\b\p{space}+(@?[\$A-Z_a-z][\.\p{L}\p{M}\p{N}\p{Pc}]*)?(?:\p{space}+(extends)\p{space}+(@?[\$\.A-Z_a-z][\.\p{L}\p{M}\p{N}\p{Pc}]*))?/dgv,
      name: "meta.class.coffee"
    },
    {
      match: /\b(debugger|\\)\b/dgv,
      name: "keyword.other.coffee"
    },
    {
      match: /\b(Array|ArrayBuffer|Blob|Boolean|Date|document|Function|Int(8|16|32|64)Array|Math|Map|Number|Object|Proxy|RegExp|Set|String|WeakMap|window|Uint(8|16|32|64)Array|XMLHttpRequest)\b/dgv,
      name: "support.class.coffee"
    },
    {
      match: /\b(console)\b/dgv,
      name: "entity.name.type.object.coffee"
    },
    {
      match: /((?<=console\.)(debug|warn|info|log|error|time|timeEnd|assert))\b/dgv,
      name: "support.function.console.coffee"
    },
    {
      match: /((?<=\.)(apply|call|concat|every|filter|forEach|from|hasOwnProperty|indexOf|isPrototypeOf|join|lastIndexOf|map|of|pop|propertyIsEnumerable|push|reduce(Right)?|reverse|shift|slice|some|sort|splice|to(Locale)?String|unshift|valueOf))\b/dgv,
      name: "support.function.method.array.coffee"
    },
    {
      match: /((?<=Array\.)(isArray))\b/dgv,
      name: "support.function.static.array.coffee"
    },
    {
      match: /((?<=Object\.)(create|definePropert(ies|y)|freeze|getOwnProperty(Descriptors?|Names)|getProperty(Descriptor|Names)|getPrototypeOf|is(Extensible|Frozen|Sealed)?|isnt|keys|preventExtensions|seal))\b/dgv,
      name: "support.function.static.object.coffee"
    },
    {
      match: /((?<=Math\.)(abs|acosh??|asinh??|atan2??|atanh|ceil|cosh??|exp|expm1|floor|hypot|log|log10|log1p|log2|max|min|pow|random|round|sign|sinh??|sqrt|tanh??|trunc))\b/dgv,
      name: "support.function.static.math.coffee"
    },
    {
      match: /((?<=Number\.)(is(Finite|Integer|NaN)|toInteger))\b/dgv,
      name: "support.function.static.number.coffee"
    },
    {
      match: /(?<!\.)\b(module|exports|__filename|__dirname|global|process)(?!\p{space}*:)\b/dgv,
      name: "support.variable.coffee"
    },
    {
      match: /\b(Infinity|NaN|undefined)\b/dgv,
      name: "constant.language.coffee"
    },
    { include: "#operators" },
    { include: "#method_calls" },
    { include: "#function_calls" },
    { include: "#numbers" },
    { include: "#objects" },
    { include: "#properties" },
    {
      match: /::/dgv,
      name: "keyword.operator.prototype.coffee"
    },
    {
      match: /(?<!\$)\b[0-9]+[\$\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "invalid.illegal.identifier.coffee"
    },
    {
      match: /;/dgv,
      name: "punctuation.terminator.statement.coffee"
    },
    {
      match: /,/dgv,
      name: "punctuation.separator.delimiter.coffee"
    },
    {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.curly.coffee" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "meta.brace.curly.coffee" }
      },
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.array.begin.bracket.square.coffee" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.array.end.bracket.square.coffee" }
      },
      patterns: [
        {
          match: /(?<!\.)\.{3}/dgv,
          name: "keyword.operator.slice.exclusive.coffee"
        },
        {
          match: /(?<!\.)\.{2}/dgv,
          name: "keyword.operator.slice.inclusive.coffee"
        },
        { include: "$self" }
      ]
    },
    {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.coffee" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.coffee" }
      },
      patterns: [
        { include: "$self" }
      ]
    },
    { include: "#instance_variable" },
    { include: "#single_quoted_string" },
    { include: "#double_quoted_string" }
  ],
  repository: {
    arguments: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.arguments.begin.bracket.round.coffee" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.bracket.round.coffee" }
          },
          name: "meta.arguments.coffee",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(?=(@|@?[\$\p{L}\p{M}\p{N}\p{Pc}]+|[\-\=]>|-\p{Nd}|["'\[\{]))/dgv,
          end: /(?=\p{space}*(?<![\$\p{L}\p{M}\p{N}\p{Pc}])(of|in|then|is|isnt|and|or|for|else|when|if|unless|by|instanceof)(?![\$\p{L}\p{M}\p{N}\p{Pc}]))|(?=\p{space}*([\]\#\)\}]|(?=\n?$)))/dgv,
          name: "meta.arguments.coffee",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    double_quoted_string: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.coffee" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.coffee" }
          },
          name: "string.quoted.double.coffee",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.escape.backslash.coffee" }
              },
              match: /(\\)(x\p{AHex}{2}|[012][0-7]{0,2}|3[0-6][0-7]|37[0-7]?|[4-7][0-7]?|[^\n])/dgv,
              name: "constant.character.escape.backslash.coffee"
            },
            { include: "#interpolated_coffee" }
          ]
        }
      ]
    },
    embedded_comment: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.comment.coffee" }
          },
          match: /(?<!\\)(#)[^\n]*(?=\n?$)\n?/dgv,
          name: "comment.line.number-sign.coffee"
        }
      ]
    },
    function_calls: {
      patterns: [
        {
          begin: /(@)?([\$\p{L}\p{M}\p{N}\p{Pc}]+)(?=\()/dgv,
          beginCaptures: {
            "1": { name: "variable.other.readwrite.instance.coffee" },
            "2": {
              patterns: [
                { include: "#function_names" }
              ]
            }
          },
          end: /(?<=\))/dgv,
          name: "meta.function-call.coffee",
          patterns: [
            { include: "#arguments" }
          ]
        },
        {
          begin: /(@)?([\$\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\p{space}+(?!(?<![\$\p{L}\p{M}\p{N}\p{Pc}])(of|in|then|is|isnt|and|or|for|else|when|if|unless|by|instanceof)(?![\$\p{L}\p{M}\p{N}\p{Pc}]))(?=(@?[\$\p{L}\p{M}\p{N}\p{Pc}]+|[\-\=]>|-\p{Nd}|["'\[\{])))/dgv,
          beginCaptures: {
            "1": { name: "variable.other.readwrite.instance.coffee" },
            "2": {
              patterns: [
                { include: "#function_names" }
              ]
            }
          },
          end: /(?=\p{space}*(?<![\$\p{L}\p{M}\p{N}\p{Pc}])(of|in|then|is|isnt|and|or|for|else|when|if|unless|by|instanceof)(?![\$\p{L}\p{M}\p{N}\p{Pc}]))|(?=\p{space}*([\]\#\)\}]|(?=\n?$)))/dgv,
          name: "meta.function-call.coffee",
          patterns: [
            { include: "#arguments" }
          ]
        }
      ]
    },
    function_names: {
      patterns: [
        {
          match: /\b(isNaN|isFinite|eval|uneval|parseInt|parseFloat|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|unescape|require|set(Interval|Timeout)|clear(Interval|Timeout))\b/dgv,
          name: "support.function.coffee"
        },
        {
          match: /[\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "entity.name.function.coffee"
        },
        {
          match: /\p{Nd}[\$\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "invalid.illegal.identifier.coffee"
        }
      ]
    },
    function_params: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.parameters.begin.bracket.round.coffee" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.parameters.end.bracket.round.coffee" }
          },
          name: "meta.parameters.coffee",
          patterns: [
            {
              captures: {
                "1": { name: "variable.parameter.function.coffee" },
                "2": { name: "keyword.operator.splat.coffee" }
              },
              match: /([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)(\.\.\.)?/dgv
            },
            {
              captures: {
                "1": { name: "variable.parameter.function.readwrite.instance.coffee" },
                "2": { name: "keyword.operator.splat.coffee" }
              },
              match: /(@(?:[\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)?)(\.\.\.)?/dgv
            },
            { include: "$self" }
          ]
        }
      ]
    },
    heregexp: {
      patterns: [
        {
          match: /\\[Bb]|[\$\^]/dgv,
          name: "keyword.control.anchor.regexp"
        },
        {
          match: /\\[1-9]\p{Nd}*/dgv,
          name: "keyword.other.back-reference.regexp"
        },
        {
          match: /[\*\+\?]|\{(\p{Nd}+,\p{Nd}+|\p{Nd}+,|,\p{Nd}+|\p{Nd}+)\}\??/dgv,
          name: "keyword.operator.quantifier.regexp"
        },
        {
          match: /\|/dgv,
          name: "keyword.operator.or.regexp"
        },
        {
          begin: /(\()((\?=)|(\?!))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.group.regexp" },
            "3": { name: "meta.assertion.look-ahead.regexp" },
            "4": { name: "meta.assertion.negative-look-ahead.regexp" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.assertion.regexp",
          patterns: [
            { include: "#heregexp" }
          ]
        },
        {
          begin: /\((\?:)?/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.group.regexp" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.regexp",
          patterns: [
            { include: "#heregexp" }
          ]
        },
        {
          begin: /(\[)(\^)?/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.character-class.regexp" },
            "2": { name: "keyword.operator.negation.regexp" }
          },
          end: /(\])/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.character-class.regexp" }
          },
          name: "constant.other.character-class.set.regexp",
          patterns: [
            {
              captures: {
                "1": { name: "constant.character.numeric.regexp" },
                "2": { name: "constant.character.control.regexp" },
                "3": { name: "constant.character.escape.backslash.regexp" },
                "4": { name: "constant.character.numeric.regexp" },
                "5": { name: "constant.character.control.regexp" },
                "6": { name: "constant.character.escape.backslash.regexp" }
              },
              match: /(?:[^\n]|(\\(?:[0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4}))|(\\c[A-Z])|(\\[^\n]))-(?:[^\]\\]|(\\(?:[0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4}))|(\\c[A-Z])|(\\[^\n]))/dgv,
              name: "constant.other.character-class.range.regexp"
            },
            { include: "#regex-character-class" }
          ]
        },
        { include: "#regex-character-class" },
        { include: "#interpolated_coffee" },
        { include: "#embedded_comment" }
      ]
    },
    instance_variable: {
      patterns: [
        {
          match: /(@)([\$A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?/dgv,
          name: "variable.other.readwrite.instance.coffee"
        }
      ]
    },
    interpolated_coffee: {
      patterns: [
        {
          begin: /#\{/dgv,
          captures: {
            "0": { name: "punctuation.section.embedded.coffee" }
          },
          end: /\}/dgv,
          name: "source.coffee.embedded.source",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    jsx: {
      patterns: [
        { include: "#jsx-tag" },
        { include: "#jsx-end-tag" }
      ]
    },
    "jsx-attribute": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.other.attribute-name.coffee" },
            "2": { name: "keyword.operator.assignment.coffee" }
          },
          match: /(?:^|\p{space}+)([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)/dgv
        },
        { include: "#double_quoted_string" },
        { include: "#single_quoted_string" },
        { include: "#jsx-expression" }
      ]
    },
    "jsx-end-tag": {
      patterns: [
        {
          begin: /(<\/)([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.coffee" },
            "2": { name: "entity.name.tag.coffee" }
          },
          end: /(\/?>)/dgv,
          name: "meta.tag.coffee"
        }
      ]
    },
    "jsx-expression": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.curly.coffee" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "meta.brace.curly.coffee" }
      },
      patterns: [
        { include: "#double_quoted_string" },
        { include: "$self" }
      ]
    },
    "jsx-tag": {
      patterns: [
        {
          begin: /(<)([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.coffee" },
            "2": { name: "entity.name.tag.coffee" }
          },
          end: /(\/?>)/dgv,
          name: "meta.tag.coffee",
          patterns: [
            { include: "#jsx-attribute" }
          ]
        }
      ]
    },
    method_calls: {
      patterns: [
        {
          begin: /(?:(\.)|(::))\p{space}*([\$\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.method.period.coffee" },
            "2": { name: "keyword.operator.prototype.coffee" },
            "3": {
              patterns: [
                { include: "#method_names" }
              ]
            }
          },
          end: /(?<=\))/dgv,
          name: "meta.method-call.coffee",
          patterns: [
            { include: "#arguments" }
          ]
        },
        {
          begin: /(?:(\.)|(::))\p{space}*([\$\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\p{space}+(?!(?<![\$\p{L}\p{M}\p{N}\p{Pc}])(of|in|then|is|isnt|and|or|for|else|when|if|unless|by|instanceof)(?![\$\p{L}\p{M}\p{N}\p{Pc}]))(?=(@|@?[\$\p{L}\p{M}\p{N}\p{Pc}]+|[\-\=]>|-\p{Nd}|["'\[\{])))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.method.period.coffee" },
            "2": { name: "keyword.operator.prototype.coffee" },
            "3": {
              patterns: [
                { include: "#method_names" }
              ]
            }
          },
          end: /(?=\p{space}*(?<![\$\p{L}\p{M}\p{N}\p{Pc}])(of|in|then|is|isnt|and|or|for|else|when|if|unless|by|instanceof)(?![\$\p{L}\p{M}\p{N}\p{Pc}]))|(?=\p{space}*([\]\#\)\}]|(?=\n?$)))/dgv,
          name: "meta.method-call.coffee",
          patterns: [
            { include: "#arguments" }
          ]
        }
      ]
    },
    method_names: {
      patterns: [
        {
          match: /\bon(Rowsinserted|Rowsdelete|Rowenter|Rowexit|Resize|Resizestart|Resizeend|Reset|Readystatechange|Mouseout|Mouseover|Mousedown|Mouseup|Mousemove|Before(cut|deactivate|unload|update|paste|print|editfocus|activate)|Blur|Scrolltop|Submit|Select|Selectstart|Selectionchange|Hover|Help|Change|Contextmenu|Controlselect|Cut|Cellchange|Clock|Close|Deactivate|Datasetchanged|Datasetcomplete|Dataavailable|Drop|Drag|Dragstart|Dragover|Dragdrop|Dragenter|Dragend|Dragleave|Dblclick|Unload|Paste|Propertychange|Error|Errorupdate|Keydown|Keyup|Keypress|Focus|Load|Activate|Afterupdate|Afterprint|Abort)\b/dgv,
          name: "support.function.event-handler.coffee"
        },
        {
          match: /\b(shift|showModelessDialog|showModalDialog|showHelp|scrollX??|scrollByPages|scrollByLines|scrollY|scrollTo|stop|strike|sizeToContent|sidebar|signText|sort|sup|sub|substr|substring|splice|split|send|set(Milliseconds|Seconds|Minutes|Hours|Month|Year|FullYear|Date|UTC(Milliseconds|Seconds|Minutes|Hours|Month|FullYear|Date)|Time|Hotkeys|Cursor|ZOptions|Active|Resizable|RequestHeader)|search|slice|savePreferences|small|home|handleEvent|navigate|char|charCodeAt|charAt|concat|contextual|confirm|compile|clear|captureEvents|call|createStyleSheet|createPopup|createEventObject|to(GMTString|UTCString|String|Source|UpperCase|LowerCase|LocaleString)|test|taint|taintEnabled|indexOf|italics|disableExternalCapture|dump|detachEvent|unshift|untaint|unwatch|updateCommands|join|javaEnabled|pop|push|plugins[^\n]refresh|paddings|parse|print|prompt|preference|enableExternalCapture|exec|execScript|valueOf|UTC|find|file|fileModifiedDate|fileSize|fileCreatedDate|fileUpdatedDate|fixed|fontsize|fontcolor|forward|fromCharCode|watch|link|load|lastIndexOf|anchor|attachEvent|atob|apply|alert|abort|routeEvents|resize|resizeBy|resizeTo|recalc|returnValue|replace|reverse|reload|releaseCapture|releaseEvents|go|get(Milliseconds|Seconds|Minutes|Hours|Month|Day|Year|FullYear|Time|Date|TimezoneOffset|UTC(Milliseconds|Seconds|Minutes|Hours|Day|Month|FullYear|Date)|Attention|Selection|ResponseHeader|AllResponseHeaders)|moveBy|moveBelow|moveTo|moveToAbsolute|moveAbove|mergeAttributes|match|margins|btoa|big|bold|borderWidths|blink|back)\b/dgv,
          name: "support.function.coffee"
        },
        {
          match: new EmulatedRegExp("\\b(acceptNode|add|addEventListener|addTextTrack|adoptNode|after|animate|append|appendChild|appendData|before|blur|canPlayType|captureStream|caretPositionFromPoint|caretRangeFromPoint|checkValidity|clear|click|cloneContents|cloneNode|cloneRange|close|closest|collapse|compareBoundaryPoints|compareDocumentPosition|comparePoint|contains|convertPointFromNode|convertQuadFromNode|convertRectFromNode|createAttribute|createAttributeNS|createCaption|createCDATASection|createComment|createContextualFragment|createDocument|createDocumentFragment|createDocumentType|createElement|createElementNS|createEntityReference|createEvent|createExpression|createHTMLDocument|createNodeIterator|createNSResolver|createProcessingInstruction|createRange|createShadowRoot|createTBody|createTextNode|createTFoot|createTHead|createTreeWalker|delete|deleteCaption|deleteCell|deleteContents|deleteData|deleteRow|deleteTFoot|deleteTHead|detach|disconnect|dispatchEvent|elementFromPoint|elementsFromPoint|enableStyleSheetsForSet|entries|evaluate|execCommand|exitFullscreen|exitPointerLock|expand|extractContents|fastSeek|firstChild|focus|forEach|get|getAll|getAnimations|getAttribute|getAttributeNames|getAttributeNode|getAttributeNodeNS|getAttributeNS|getBoundingClientRect|getBoxQuads|getClientRects|getContext|getDestinationInsertionPoints|getElementById|getElementsByClassName|getElementsByName|getElementsByTagName|getElementsByTagNameNS|getItem|getNamedItem|getSelection|getStartDate|getVideoPlaybackQuality|has|hasAttribute|hasAttributeNS|hasAttributes|hasChildNodes|hasFeature|hasFocus|importNode|initEvent|insertAdjacentElement|insertAdjacentHTML|insertAdjacentText|insertBefore|insertCell|insertData|insertNode|insertRow|intersectsNode|isDefaultNamespace|isEqualNode|isPointInRange|isSameNode|item|keys??|lastChild|load|lookupNamespaceURI|lookupPrefix|matches|move|moveAttribute|moveAttributeNode|moveChild|moveNamedItem|namedItem|nextNode|nextSibling|normalize|observe|open|parentNode|pause|play|postMessage|prepend|preventDefault|previousNode|previousSibling|probablySupportsContext|queryCommandEnabled|queryCommandIndeterm|queryCommandState|queryCommandSupported|queryCommandValue|querySelector|querySelectorAll|registerContentHandler|registerElement|registerProtocolHandler|releaseCapture|releaseEvents|remove|removeAttribute|removeAttributeNode|removeAttributeNS|removeChild|removeEventListener|removeItem|replace|replaceChild|replaceData|replaceWith|reportValidity|requestFullscreen|requestPointerLock|reset|scroll|scrollBy|scrollIntoView|scrollTo|seekToNextFrame|select|selectNode|selectNodeContents|set|setAttribute|setAttributeNode|setAttributeNodeNS|setAttributeNS|setCapture|setCustomValidity|setEnd|setEndAfter|setEndBefore|setItem|setNamedItem|setRangeText|setSelectionRange|setSinkId|setStart|setStartAfter|setStartBefore|slice|splitText|stepDown|stepUp|stopImmediatePropagation|stopPropagation|submit|substringData|supports|surroundContents|takeRecords|terminate|toBlob|toDataURL|toggle|toString|values|write|writeln)\\b", "dgv", { lazyCompile: true }),
          name: "support.function.dom.coffee"
        },
        {
          match: /[\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "entity.name.function.coffee"
        },
        {
          match: /\p{Nd}[\$\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "invalid.illegal.identifier.coffee"
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /\b(?<!\$)0([Xx])\p{AHex}+\b(?!\$)/dgv,
          name: "constant.numeric.hex.coffee"
        },
        {
          match: /\b(?<!\$)0([Bb])[01]+\b(?!\$)/dgv,
          name: "constant.numeric.binary.coffee"
        },
        {
          match: /\b(?<!\$)0([Oo])?[0-7]+\b(?!\$)/dgv,
          name: "constant.numeric.octal.coffee"
        },
        {
          captures: {
            "0": { name: "constant.numeric.decimal.coffee" },
            "1": { name: "punctuation.separator.decimal.period.coffee" },
            "2": { name: "punctuation.separator.decimal.period.coffee" },
            "3": { name: "punctuation.separator.decimal.period.coffee" },
            "4": { name: "punctuation.separator.decimal.period.coffee" },
            "5": { name: "punctuation.separator.decimal.period.coffee" },
            "6": { name: "punctuation.separator.decimal.period.coffee" }
          },
          match: /(?<!\$)(?:\b[0-9]+(\.)[0-9]+[Ee][\-\+]?[0-9]+\b|\b[0-9]+(\.)[Ee][\-\+]?[0-9]+\b|\B(\.)[0-9]+[Ee][\-\+]?[0-9]+\b|\b[0-9]+[Ee][\-\+]?[0-9]+\b|\b[0-9]+(\.)[0-9]+\b|\b[0-9]+(?=\.{2,3})|\b[0-9]+(\.)\B|\B(\.)[0-9]+\b|\b[0-9]+\b(?!\.))(?!\$)/dgv
        }
      ]
    },
    objects: {
      patterns: [
        {
          match: /[A-Z][\$0-9A-Z_]*(?=\p{space}*\??(\.\p{space}*[\$A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*|::))/dgv,
          name: "constant.other.object.coffee"
        },
        {
          match: /[\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*(?=\p{space}*\??(\.\p{space}*[\$A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*|::))/dgv,
          name: "variable.other.object.coffee"
        }
      ]
    },
    operators: {
      patterns: [
        {
          captures: {
            "1": { name: "variable.assignment.coffee" },
            "2": { name: "keyword.operator.assignment.compound.coffee" }
          },
          match: /(?:([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)?\p{space}+|(?<![\$\p{L}\p{M}\p{N}\p{Pc}]))(and=|or=)/dgv
        },
        {
          captures: {
            "1": { name: "variable.assignment.coffee" },
            "2": { name: "keyword.operator.assignment.compound.coffee" }
          },
          match: /([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)?\p{space}*((?:[\-\%\*\+]|&&|\|\||\?|(?<!\()\/)=)/dgv
        },
        {
          captures: {
            "1": { name: "variable.assignment.coffee" },
            "2": { name: "keyword.operator.assignment.compound.bitwise.coffee" }
          },
          match: /([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)?\p{space}*((?:[\&\^]|<<|>>>??|\|)=)/dgv
        },
        {
          match: /<<|>>>?/dgv,
          name: "keyword.operator.bitwise.shift.coffee"
        },
        {
          match: /!=|<=|>=|==|[\<\>]/dgv,
          name: "keyword.operator.comparison.coffee"
        },
        {
          match: /&&|!|\|\|/dgv,
          name: "keyword.operator.logical.coffee"
        },
        {
          match: /[\&\^\|\~]/dgv,
          name: "keyword.operator.bitwise.coffee"
        },
        {
          captures: {
            "1": { name: "variable.assignment.coffee" },
            "2": { name: "keyword.operator.assignment.coffee" }
          },
          match: /([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)?\p{space}*(=|:(?!:))(?![\=\>])/dgv
        },
        {
          match: /--/dgv,
          name: "keyword.operator.decrement.coffee"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.increment.coffee"
        },
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.splat.coffee"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.existential.coffee"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.coffee"
        },
        {
          captures: {
            "1": { name: "keyword.operator.logical.coffee" },
            "2": { name: "keyword.operator.comparison.coffee" }
          },
          match: /\b(?<![\$\.])(?:(and|or|not)|(is(?:|nt)))(?!\p{space}*:)\b/dgv
        }
      ]
    },
    properties: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.property.period.coffee" },
            "2": { name: "keyword.operator.prototype.coffee" },
            "3": { name: "constant.other.object.property.coffee" }
          },
          match: /(?:(\.)|(::))\p{space}*([A-Z][\$0-9A-Z_]*\b\$*)(?=\p{space}*\??(\.\p{space}*[\$A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*|::))/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.separator.property.period.coffee" },
            "2": { name: "keyword.operator.prototype.coffee" },
            "3": { name: "variable.other.object.property.coffee" }
          },
          match: /(?:(\.)|(::))\p{space}*(\$*[\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)(?=\p{space}*\??(\.\p{space}*[\$A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*|::))/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.separator.property.period.coffee" },
            "2": { name: "keyword.operator.prototype.coffee" },
            "3": { name: "constant.other.property.coffee" }
          },
          match: /(?:(\.)|(::))\p{space}*([A-Z][\$0-9A-Z_]*\b\$*)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.separator.property.period.coffee" },
            "2": { name: "keyword.operator.prototype.coffee" },
            "3": { name: "variable.other.property.coffee" }
          },
          match: /(?:(\.)|(::))\p{space}*(\$*[\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.separator.property.period.coffee" },
            "2": { name: "keyword.operator.prototype.coffee" },
            "3": { name: "invalid.illegal.identifier.coffee" }
          },
          match: /(?:(\.)|(::))\p{space}*([0-9][\$\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
        }
      ]
    },
    "regex-character-class": {
      patterns: [
        {
          match: /\\[DSWdsw]|\./dgv,
          name: "constant.character.character-class.regexp"
        },
        {
          match: /\\([0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4})/dgv,
          name: "constant.character.numeric.regexp"
        },
        {
          match: /\\c[A-Z]/dgv,
          name: "constant.character.control.regexp"
        },
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.backslash.regexp"
        }
      ]
    },
    single_quoted_string: {
      patterns: [
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.coffee" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.coffee" }
          },
          name: "string.quoted.single.coffee",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.escape.backslash.coffee" }
              },
              match: /(\\)(x\p{AHex}{2}|[012][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|[^\n])/dgv,
              name: "constant.character.escape.backslash.coffee"
            }
          ]
        }
      ]
    }
  },
  dependencies: [
    "javascript"
  ]
};
