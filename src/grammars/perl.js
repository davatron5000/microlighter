import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "perl",
  displayName: "Perl",
  scopeName: "source.perl",
  patterns: [
    { include: "#line_comment" },
    {
      begin: /^(?==[A-Za-z]+)/dgv,
      end: /^(=cut\b[^\n]*)(?=\n?$)/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#pod" }
          ]
        }
      },
      name: "comment.block.documentation.perl",
      patterns: [
        { include: "#pod" }
      ]
    },
    { include: "#variable" },
    {
      applyEndPatternLast: 1,
      begin: /\b(?=qr\p{space}*[^\p{space}\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      end: /((([acdegil-prsux]*)))(?=(\p{space}+\P{space}|\p{space}*[\#\)\,\;\{\}]|\p{space}*(?=\n?$)))/dgv,
      endCaptures: {
        "1": { name: "string.regexp.compile.perl" },
        "2": { name: "punctuation.definition.string.perl" },
        "3": { name: "keyword.control.regexp-option.perl" }
      },
      patterns: [
        {
          begin: /(qr)\p{space}*\{/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\}/dgv,
          name: "string.regexp.compile.nested_braces.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_braces_interpolated" }
          ]
        },
        {
          begin: /(qr)\p{space}*\[/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\]/dgv,
          name: "string.regexp.compile.nested_brackets.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_brackets_interpolated" }
          ]
        },
        {
          begin: /(qr)\p{space}*</dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: />/dgv,
          name: "string.regexp.compile.nested_ltgt.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_ltgt_interpolated" }
          ]
        },
        {
          begin: /(qr)\p{space}*\(/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\)/dgv,
          name: "string.regexp.compile.nested_parens.perl",
          patterns: [
            {
              match: /\$(?=[^'\(\<\[\\\{\p{space}\p{L}\p{M}\p{N}\p{Pc}])/dgv
            },
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_parens_interpolated" }
          ]
        },
        {
          begin: /(qr)\p{space}*'/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /'/dgv,
          name: "string.regexp.compile.single-quote.perl",
          patterns: [
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /(qr)\p{space}*([^'\(\<\[\{\p{space}\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /2/dgv,
          name: "string.regexp.compile.simple-delimiter.perl",
          patterns: [
            {
              match: /\$(?=[^'\(\<\[\{\p{space}\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "keyword.control.anchor.perl"
            },
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_parens_interpolated" }
          ]
        }
      ]
    },
    {
      applyEndPatternLast: 1,
      begin: /(?<![\-\+\{])\b(?=m\p{space}*[^0-9A-Za-z\p{space}])/dgv,
      end: /((([acdegil-prsux]*)))(?=(\p{space}+\P{space}|\p{space}*[\#\)\,\;\{\}]|\p{space}*(?=\n?$)))/dgv,
      endCaptures: {
        "1": { name: "string.regexp.find-m.perl" },
        "2": { name: "punctuation.definition.string.perl" },
        "3": { name: "keyword.control.regexp-option.perl" }
      },
      patterns: [
        {
          begin: /(m)\p{space}*\{/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\}/dgv,
          name: "string.regexp.find-m.nested_braces.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_braces_interpolated" }
          ]
        },
        {
          begin: /(m)\p{space}*\[/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\]/dgv,
          name: "string.regexp.find-m.nested_brackets.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_brackets_interpolated" }
          ]
        },
        {
          begin: /(m)\p{space}*</dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: />/dgv,
          name: "string.regexp.find-m.nested_ltgt.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_ltgt_interpolated" }
          ]
        },
        {
          begin: /(m)\p{space}*\(/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\)/dgv,
          name: "string.regexp.find-m.nested_parens.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_parens_interpolated" }
          ]
        },
        {
          begin: /(m)\p{space}*'/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /'/dgv,
          name: "string.regexp.find-m.single-quote.perl",
          patterns: [
            { include: "#escaped_char" }
          ]
        },
        {
          begin: {
            G: [/￿(?<![\-\+\{])(m)(?!_)\p{space}*([^'\(0-9\<A-\[a-\{\p{space}])/dgv, /(?<![\-\+\{])(m)(?!_)\p{space}*([^'\(0-9\<A-\[a-\{\p{space}])/dgvy]
          },
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /2/dgv,
          name: "string.regexp.find-m.simple-delimiter.perl",
          patterns: [
            {
              match: /\$(?=[^'\(0-9\<A-\[a-\{\p{space}])/dgv,
              name: "keyword.control.anchor.perl"
            },
            { include: "#escaped_char" },
            { include: "#variable" },
            {
              begin: /\[/dgv,
              beginCaptures: {
                "1": { name: "punctuation.definition.character-class.begin.perl" }
              },
              end: /\]/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.character-class.end.perl" }
              },
              name: "constant.other.character-class.set.perl",
              patterns: [
                {
                  match: /\$(?=[^'\(\<\[\{\p{space}\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "keyword.control.anchor.perl"
                },
                { include: "#escaped_char" }
              ]
            },
            { include: "#nested_parens_interpolated" }
          ]
        }
      ]
    },
    {
      applyEndPatternLast: 1,
      begin: /\b(?=(?<!&)(s)(\p{space}+\P{space}|\p{space}*[\(\)\,\;\<\[\{\}]|(?=\n?$)))/dgv,
      end: /((([acdegil-prsux]*)))(?=(\p{space}+\P{space}|\p{space}*[\]\)\,\;\>\{\}]|\p{space}*(?=\n?$)))/dgv,
      endCaptures: {
        "1": { name: "string.regexp.replace.perl" },
        "2": { name: "punctuation.definition.string.perl" },
        "3": { name: "keyword.control.regexp-option.perl" }
      },
      patterns: [
        {
          begin: /(s)\p{space}*\{/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\}/dgv,
          name: "string.regexp.nested_braces.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#nested_braces" }
          ]
        },
        {
          begin: /(s)\p{space}*\[/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\]/dgv,
          name: "string.regexp.nested_brackets.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#nested_brackets" }
          ]
        },
        {
          begin: /(s)\p{space}*</dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: />/dgv,
          name: "string.regexp.nested_ltgt.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#nested_ltgt" }
          ]
        },
        {
          begin: /(s)\p{space}*\(/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /\)/dgv,
          name: "string.regexp.nested_parens.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#nested_parens" }
          ]
        },
        {
          begin: /\{/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /\}/dgv,
          name: "string.regexp.format.nested_braces.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_braces_interpolated" }
          ]
        },
        {
          begin: /\[/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /\]/dgv,
          name: "string.regexp.format.nested_brackets.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_brackets_interpolated" }
          ]
        },
        {
          begin: /</dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: />/dgv,
          name: "string.regexp.format.nested_ltgt.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_ltgt_interpolated" }
          ]
        },
        {
          begin: /\(/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /\)/dgv,
          name: "string.regexp.format.nested_parens.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" },
            { include: "#nested_parens_interpolated" }
          ]
        },
        {
          begin: /'/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /'/dgv,
          name: "string.regexp.format.single_quote.perl",
          patterns: [
            {
              match: /\\['\\]/dgv,
              name: "constant.character.escape.perl"
            }
          ]
        },
        {
          begin: /([^\(\;\<\[\{\p{space}\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /1/dgv,
          name: "string.regexp.format.simple_delimiter.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" }
          ]
        },
        {
          match: /\p{space}+/dgv
        }
      ]
    },
    {
      begin: /\b(?=s([^\(0-9\<A-\[a-\{\p{space}])[^\n]*\1([acdegil-prsux]*)([\)\,\;\}]|\p{space}+))/dgv,
      end: /((([acdegil-prsux]*)))(?=([\)\,\;\}]|\p{space}+|\p{space}*(?=\n?$)))/dgv,
      endCaptures: {
        "1": { name: "string.regexp.replace.perl" },
        "2": { name: "punctuation.definition.string.perl" },
        "3": { name: "keyword.control.regexp-option.perl" }
      },
      patterns: [
        {
          begin: /(s\p{space}*)([^\(0-9\<A-\[a-\{\p{space}])/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /(?=2)/dgv,
          name: "string.regexp.replaceXXX.simple_delimiter.perl",
          patterns: [
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /'/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /'/dgv,
          name: "string.regexp.replaceXXX.format.single_quote.perl",
          patterns: [
            {
              match: /\\['\\]/dgv,
              name: "constant.character.escape.perl.perl"
            }
          ]
        },
        {
          begin: /([^\(0-9\<A-\[a-\{\p{space}])/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /1/dgv,
          name: "string.regexp.replaceXXX.format.simple_delimiter.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" }
          ]
        }
      ]
    },
    {
      begin: /\b(?=(?<!\\)s\p{space}*([^\(\<\>\[\{\p{space}\p{L}\p{M}\p{N}\p{Pc}]))/dgv,
      end: /((([acdegilmoprsu]*x[acdegilmoprsu]*)))\b/dgv,
      endCaptures: {
        "1": { name: "string.regexp.replace.perl" },
        "2": { name: "punctuation.definition.string.perl" },
        "3": { name: "keyword.control.regexp-option.perl" }
      },
      patterns: [
        {
          begin: /(s)\p{space}*([^\n])/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" },
            "1": { name: "support.function.perl" }
          },
          end: /(?=2)/dgv,
          name: "string.regexp.replace.extended.simple_delimiter.perl",
          patterns: [
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /'/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /'(?=[acdegilmoprsu]*x[acdegilmoprsu]*)\b/dgv,
          name: "string.regexp.replace.extended.simple_delimiter.perl",
          patterns: [
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /([^\n])/dgv,
          captures: {
            "0": { name: "punctuation.definition.string.perl" }
          },
          end: /1(?=[acdegilmoprsu]*x[acdegilmoprsu]*)\b/dgv,
          name: "string.regexp.replace.extended.simple_delimiter.perl",
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" }
          ]
        }
      ]
    },
    {
      begin: /(?<=[\&\(\{\|\~]|if|unless|^)\p{space}*((\/))/dgv,
      beginCaptures: {
        "1": { name: "string.regexp.find.perl" },
        "2": { name: "punctuation.definition.string.perl" }
      },
      contentName: "string.regexp.find.perl",
      end: /((1([acdegil-prsux]*)))(?=(\p{space}+\P{space}|\p{space}*[\#\)\,\;\{\}]|\p{space}*(?=\n?$)))/dgv,
      endCaptures: {
        "1": { name: "string.regexp.find.perl" },
        "2": { name: "punctuation.definition.string.perl" },
        "3": { name: "keyword.control.regexp-option.perl" }
      },
      patterns: [
        {
          match: /\$(?=\/)/dgv,
          name: "keyword.control.anchor.perl"
        },
        { include: "#escaped_char" },
        { include: "#variable" }
      ]
    },
    {
      captures: {
        "1": { name: "constant.other.key.perl" }
      },
      match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?==>)/dgv
    },
    {
      match: /(?<=\{)\p{space}*[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*(?=\})/dgv,
      name: "constant.other.bareword.perl"
    },
    {
      captures: {
        "1": { name: "keyword.control.perl" },
        "2": { name: "entity.name.type.class.perl" }
      },
      match: /^\p{space}*(package)\p{space}+([^\;\p{space}]+)/dgv,
      name: "meta.class.perl"
    },
    {
      captures: {
        "1": { name: "storage.type.sub.perl" },
        "2": { name: "entity.name.function.perl" },
        "3": { name: "storage.type.method.perl" }
      },
      match: /\b(sub)(?:\p{space}+([\-0-9A-Z_a-z]+))?\p{space}*(?:\([\$\*\;\@]*\))?[^\{\p{L}\p{M}\p{N}\p{Pc}]/dgv,
      name: "meta.function.perl"
    },
    {
      captures: {
        "1": { name: "entity.name.function.perl" },
        "2": { name: "punctuation.definition.parameters.perl" },
        "3": { name: "variable.parameter.function.perl" }
      },
      match: /^\p{space}*(BEGIN|UNITCHECK|CHECK|INIT|END|DESTROY)\b/dgv,
      name: "meta.function.perl"
    },
    {
      begin: /^(?=(\t| {4}))/dgv,
      end: /(?=[^\t\p{space}])/dgv,
      name: "meta.leading-tabs",
      patterns: [
        {
          captures: {
            "1": { name: "meta.odd-tab" },
            "2": { name: "meta.even-tab" }
          },
          match: /(\t| {4})(\t| {4})?/dgv
        }
      ]
    },
    {
      captures: {
        "1": { name: "support.function.perl" },
        "2": { name: "punctuation.definition.string.perl" },
        "5": { name: "punctuation.definition.string.perl" },
        "8": { name: "punctuation.definition.string.perl" }
      },
      match: /\b(tr|y)\p{space}*([^0-9A-Za-z\p{space}])([^\n]*?)(?<!\\)(\\{2})*(\2)([^\n]*?)(?<!\\)(\\{2})*(\2)/dgv,
      name: "string.regexp.replace.perl"
    },
    {
      match: /\b(__(?:FILE|LINE|PACKAGE|SUB)__)\b/dgv,
      name: "constant.language.perl"
    },
    {
      begin: /\b(__(?:DATA__|END__))\n?/dgv,
      beginCaptures: {
        "1": { name: "constant.language.perl" }
      },
      contentName: "comment.block.documentation.perl",
      end: /$/dgv,
      patterns: [
        { include: "#pod" }
      ]
    },
    {
      match: /(?<!->)\b(continue|default|die|do|else|elsif|exit|for|foreach|given|goto|if|last|next|redo|return|select|unless|until|wait|when|while|switch|case|require|use|eval)\b/dgv,
      name: "keyword.control.perl"
    },
    {
      match: /\b(my|our|local)\b/dgv,
      name: "storage.modifier.perl"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])-[ABCMORSTWXb-gklopr-uwxz]\b/dgv,
      name: "keyword.operator.filetest.perl"
    },
    {
      match: /\b(and|or|xor|as|not)\b/dgv,
      name: "keyword.operator.logical.perl"
    },
    {
      match: /((?:<=|[\-\=])>)/dgv,
      name: "keyword.operator.comparison.perl"
    },
    { include: "#heredoc" },
    {
      begin: /\bqq\p{space}*([^\(\<\[\{\p{L}\p{M}\p{N}\p{Pc}\p{space}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.qq.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#variable" }
      ]
    },
    {
      begin: /\bqx\p{space}*([^'\(\<\[\{\p{L}\p{M}\p{N}\p{Pc}\p{space}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.interpolated.qx.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#variable" }
      ]
    },
    {
      begin: /\bqx\p{space}*'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.interpolated.qx.single-quote.perl",
      patterns: [
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.double.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#variable" }
      ]
    },
    {
      begin: /(?<!->)\bqw?\p{space}*([^\(\<\[\{\p{L}\p{M}\p{N}\p{Pc}\p{space}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.q.perl"
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.single.perl",
      patterns: [
        {
          match: /\\['\\]/dgv,
          name: "constant.character.escape.perl"
        }
      ]
    },
    {
      begin: /`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.interpolated.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#variable" }
      ]
    },
    {
      begin: /(?<!->)\bqq\p{space}*\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.qq-paren.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_parens_interpolated" },
        { include: "#variable" }
      ]
    },
    {
      begin: /\bqq\p{space}*\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.qq-brace.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_braces_interpolated" },
        { include: "#variable" }
      ]
    },
    {
      begin: /\bqq\p{space}*\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.qq-bracket.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_brackets_interpolated" },
        { include: "#variable" }
      ]
    },
    {
      begin: /\bqq\p{space}*</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.qq-ltgt.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_ltgt_interpolated" },
        { include: "#variable" }
      ]
    },
    {
      begin: /(?<!->)\bqx\p{space}*\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.interpolated.qx-paren.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_parens_interpolated" },
        { include: "#variable" }
      ]
    },
    {
      begin: /\bqx\p{space}*\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.interpolated.qx-brace.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_braces_interpolated" },
        { include: "#variable" }
      ]
    },
    {
      begin: /\bqx\p{space}*\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.interpolated.qx-bracket.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_brackets_interpolated" },
        { include: "#variable" }
      ]
    },
    {
      begin: /\bqx\p{space}*</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.interpolated.qx-ltgt.perl",
      patterns: [
        { include: "#escaped_char" },
        { include: "#nested_ltgt_interpolated" },
        { include: "#variable" }
      ]
    },
    {
      begin: /(?<!->)\bqw?\p{space}*\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.q-paren.perl",
      patterns: [
        { include: "#nested_parens" }
      ]
    },
    {
      begin: /\bqw?\p{space}*\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.q-brace.perl",
      patterns: [
        { include: "#nested_braces" }
      ]
    },
    {
      begin: /\bqw?\p{space}*\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.q-bracket.perl",
      patterns: [
        { include: "#nested_brackets" }
      ]
    },
    {
      begin: /\bqw?\p{space}*</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.quoted.other.q-ltgt.perl",
      patterns: [
        { include: "#nested_ltgt" }
      ]
    },
    {
      begin: /^__[\p{L}\p{M}\p{N}\p{Pc}]+__/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.perl" }
      },
      end: /(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.perl" }
      },
      name: "string.unquoted.program-block.perl"
    },
    {
      begin: /\b(format)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*=/dgv,
      beginCaptures: {
        "1": { name: "support.function.perl" },
        "2": { name: "entity.name.function.format.perl" }
      },
      end: /^\.\p{space}*(?=\n?$)/dgv,
      name: "meta.format.perl",
      patterns: [
        { include: "#line_comment" },
        { include: "#variable" }
      ]
    },
    {
      captures: {
        "1": { name: "support.function.perl" },
        "2": { name: "entity.name.function.perl" }
      },
      match: /\b(x)\p{space}*(\p{Nd}+)\b/dgv
    },
    {
      match: /\b(ARGV|DATA|ENV|SIG|STDERR|STDIN|STDOUT|atan2|bind|binmode|bless|caller|chdir|chmod|chomp|chop|chown|chr|chroot|close|closedir|cmp|connect|cos|crypt|dbmclose|dbmopen|defined|delete|dump|each|endgrent|endhostent|endnetent|endprotoent|endpwent|endservent|eof|eq|eval|exec|exists|exp|fcntl|fileno|flock|fork|formline|ge|getc|getgrent|getgrgid|getgrnam|gethostbyaddr|gethostbyname|gethostent|getlogin|getnetbyaddr|getnetbyname|getnetent|getpeername|getpgrp|getppid|getpriority|getprotobyname|getprotobynumber|getprotoent|getpwent|getpwnam|getpwuid|getservbyname|getservbyport|getservent|getsockname|getsockopt|glob|gmtime|grep|gt|hex|import|index|int|ioctl|join|keys|kill|lc|lcfirst|le|length|link|listen|local|localtime|log|lstat|lt|m|map|mkdir|msgctl|msgget|msgrcv|msgsnd|ne|no|oct|open|opendir|ord|pack|pipe|pop|pos|printf??|push|quotemeta|rand|read|readdir|readlink|recv|ref|rename|reset|reverse|rewinddir|rindex|rmdir|s|say|scalar|seek|seekdir|semctl|semget|semop|send|setgrent|sethostent|setnetent|setpgrp|setpriority|setprotoent|setpwent|setservent|setsockopt|shift|shmctl|shmget|shmread|shmwrite|shutdown|sin|sleep|socket|socketpair|sort|splice|split|sprintf|sqrt|srand|stat|study|substr|symlink|syscall|sysopen|sysread|system|syswrite|tell|telldir|tied??|times??|tr|truncate|uc|ucfirst|umask|undef|unlink|unpack|unshift|untie|utime|values|vec|waitpid|wantarray|warn|write|y)\b/dgv,
      name: "support.function.perl"
    },
    {
      captures: {
        "1": { name: "punctuation.section.scope.begin.perl" },
        "2": { name: "punctuation.section.scope.end.perl" }
      },
      match: /(\{)(\})/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.section.scope.begin.perl" },
        "2": { name: "punctuation.section.scope.end.perl" }
      },
      match: /(\()(\))/dgv
    }
  ],
  repository: {
    escaped_char: {
      patterns: [
        {
          match: /\\\p{Nd}+/dgv,
          name: "constant.character.escape.perl"
        },
        {
          match: /\\c[^\\\p{space}]/dgv,
          name: "constant.character.escape.perl"
        },
        {
          match: /\\g(?:\{(?:[\p{L}\p{M}\p{N}\p{Pc}]*|-\p{Nd}+)\}|\p{Nd}+)/dgv,
          name: "constant.character.escape.perl"
        },
        {
          match: /\\k(?:\{[\p{L}\p{M}\p{N}\p{Pc}]*\}|<[\p{L}\p{M}\p{N}\p{Pc}]*>|'[\p{L}\p{M}\p{N}\p{Pc}]*')/dgv,
          name: "constant.character.escape.perl"
        },
        {
          match: /\\N\{[^\}]*\}/dgv,
          name: "constant.character.escape.perl"
        },
        {
          match: /\\o\{\p{Nd}*\}/dgv,
          name: "constant.character.escape.perl"
        },
        {
          match: /\\[Pp](?:\{[\p{L}\p{M}\p{N}\p{Pc}]*\}|P)/dgv,
          name: "constant.character.escape.perl"
        },
        {
          match: /\\x(?:[0-9A-Za-z]{2}|\{[\p{L}\p{M}\p{N}\p{Pc}]*\})?/dgv,
          name: "constant.character.escape.perl"
        },
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.perl"
        }
      ]
    },
    heredoc: {
      patterns: [
        {
          begin: /((((<<(~)?) *')(HTML)(')))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.raw.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.raw.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.raw.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.html",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "text.html.basic",
              patterns: [
                { include: "text.html.basic" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *')(XML)(')))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.raw.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.raw.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.raw.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.xml",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "text.xml",
              patterns: [
                { include: "text.xml" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *')(CSS)(')))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.raw.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.raw.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.raw.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.css",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.css",
              patterns: [
                { include: "source.css" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *')(JAVASCRIPT)(')))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.raw.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.raw.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.raw.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.js",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.js",
              patterns: [
                { include: "source.js" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *')(SQL)(')))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.raw.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.raw.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.raw.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.sql",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.sql",
              patterns: [
                { include: "source.sql" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *')(POSTSCRIPT)(')))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.raw.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.raw.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.raw.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.postscript",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.postscript",
              patterns: [
                { include: "source.postscript" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *')([^']*)(')))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.raw.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.raw.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.raw.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          }
        },
        {
          begin: /((((<<(~)?) *\\)((?![ \$\(\=\p{Nd}])[^"'\)\,\;\`\p{space}]*)()))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.raw.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.raw.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.raw.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          }
        },
        {
          begin: /((((<<(~)?) *")(HTML)(")))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.html",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "text.html.basic",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "text.html.basic" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *")(XML)(")))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.xml",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "text.xml",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "text.xml" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *")(CSS)(")))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.css",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.css",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "source.css" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *")(JAVASCRIPT)(")))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.js",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.js",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "source.js" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *")(SQL)(")))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.sql",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.sql",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "source.sql" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *")(POSTSCRIPT)(")))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.postscript",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.postscript",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "source.postscript" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *")([^"]*)(")))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" }
          ]
        },
        {
          begin: /((((<<(~)?) *)(HTML)()))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.html",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "text.html.basic",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "text.html.basic" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *)(XML)()))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.xml",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "text.xml",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "text.xml" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *)(CSS)()))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.css",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.css",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "source.css" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *)(JAVASCRIPT)()))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.js",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.js",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "source.js" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *)(SQL)()))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.sql",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.sql",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "source.sql" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *)(POSTSCRIPT)()))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          name: "meta.embedded.block.postscript",
          patterns: [
            {
              begin: /^/dgv,
              end: /\n/dgv,
              name: "source.postscript",
              patterns: [
                { include: "#escaped_char" },
                { include: "#variable" },
                { include: "source.postscript" }
              ]
            }
          ]
        },
        {
          begin: /((((<<(~)?) *)((?![ \$\(\=\p{Nd}])[^"'\)\,\;\`\p{space}]*)()))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.interpolated.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" }
          ]
        },
        {
          begin: /((((<<(~)?) *`)([^\`]*)(`)))([^\n]*)\n?/dgv,
          beginCaptures: {
            "1": { name: "string.unquoted.heredoc.interpolated.perl" },
            "2": { name: "punctuation.definition.string.begin.perl" },
            "3": { name: "punctuation.definition.delimiter.begin.perl" },
            "7": { name: "punctuation.definition.delimiter.end.perl" },
            "8": {
              patterns: [
                { include: "$self" }
              ]
            }
          },
          contentName: "string.unquoted.heredoc.shell.perl",
          end: /^((?!5)\p{space}+)?((6))(?=\n?$)/dgv,
          endCaptures: {
            "2": { name: "string.unquoted.heredoc.interpolated.perl" },
            "3": { name: "punctuation.definition.string.end.perl" }
          },
          patterns: [
            { include: "#escaped_char" },
            { include: "#variable" }
          ]
        }
      ]
    },
    line_comment: {
      patterns: [
        {
          begin: /(^[\t ]+)?(?=#)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.perl" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /#/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.perl" }
              },
              end: /\n/dgv,
              name: "comment.line.number-sign.perl"
            }
          ]
        }
      ]
    },
    nested_braces: {
      begin: /\{/dgv,
      captures: {
        "1": { name: "punctuation.section.scope.perl" }
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
        "1": { name: "punctuation.section.scope.perl" }
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
        "1": { name: "punctuation.section.scope.perl" }
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
        "1": { name: "punctuation.section.scope.perl" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#escaped_char" },
        { include: "#variable" },
        { include: "#nested_brackets_interpolated" }
      ]
    },
    nested_ltgt: {
      begin: /</dgv,
      captures: {
        "1": { name: "punctuation.section.scope.perl" }
      },
      end: />/dgv,
      patterns: [
        { include: "#nested_ltgt" }
      ]
    },
    nested_ltgt_interpolated: {
      begin: /</dgv,
      captures: {
        "1": { name: "punctuation.section.scope.perl" }
      },
      end: />/dgv,
      patterns: [
        { include: "#variable" },
        { include: "#nested_ltgt_interpolated" }
      ]
    },
    nested_parens: {
      begin: /\(/dgv,
      captures: {
        "1": { name: "punctuation.section.scope.perl" }
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
        "1": { name: "punctuation.section.scope.perl" }
      },
      end: /\)/dgv,
      patterns: [
        {
          match: /\$(?=[^'\(\<\[\{\p{space}\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "keyword.control.anchor.perl"
        },
        { include: "#escaped_char" },
        { include: "#variable" },
        { include: "#nested_parens_interpolated" }
      ]
    },
    pod: {
      patterns: [
        {
          match: /^=(pod|back|cut)\b/dgv,
          name: "storage.type.class.pod.perl"
        },
        {
          begin: /^(=begin)\p{space}+(html)\p{space}*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.pod.perl" },
            "2": { name: "variable.other.pod.perl" }
          },
          contentName: "text.embedded.html.basic",
          end: /^(?:(=end)\p{space}+(html)|(?==cut))/dgv,
          endCaptures: {
            "1": { name: "storage.type.class.pod.perl" },
            "2": { name: "variable.other.pod.perl" }
          },
          name: "meta.embedded.pod.perl",
          patterns: [
            { include: "text.html.basic" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.class.pod.perl" },
            "2": {
              name: "variable.other.pod.perl",
              patterns: [
                { include: "#pod-formatting" }
              ]
            }
          },
          match: /^(=(?:head[1-4]|item|over|encoding|begin|end|for))\b\p{space}*([^\n]*)/dgv
        },
        { include: "#pod-formatting" }
      ]
    },
    "pod-formatting": {
      patterns: [
        {
          captures: {
            "1": { name: "markup.italic.pod.perl" },
            "2": { name: "markup.italic.pod.perl" }
          },
          match: /I(?:<([^\<\>]+)>|<+(\p{space}+(?:(?<!\p{space})>|[^\>])+\p{space}+)>+)/dgv,
          name: "entity.name.type.instance.pod.perl"
        },
        {
          captures: {
            "1": { name: "markup.bold.pod.perl" },
            "2": { name: "markup.bold.pod.perl" }
          },
          match: /B(?:<([^\<\>]+)>|<+(\p{space}+(?:(?<!\p{space})>|[^\>])+\p{space}+)>+)/dgv,
          name: "entity.name.type.instance.pod.perl"
        },
        {
          captures: {
            "1": { name: "markup.raw.pod.perl" },
            "2": { name: "markup.raw.pod.perl" }
          },
          match: /C(?:<([^\<\>]+)>|<+(\\s+(?:(?<!\\s)>|[^\>])+\\s+)>+)/dgv,
          name: "entity.name.type.instance.pod.perl"
        },
        {
          captures: {
            "1": { name: "markup.underline.link.hyperlink.pod.perl" }
          },
          match: /L<([^\>]+)>/dgv,
          name: "entity.name.type.instance.pod.perl"
        },
        {
          match: /[EFSXZ]<[^\>]*>/dgv,
          name: "entity.name.type.instance.pod.perl"
        }
      ]
    },
    variable: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$)&(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.regexp.match.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$)`(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.regexp.pre-match.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$)'(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.regexp.post-match.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$)\+(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.regexp.last-paren-match.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$)"(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.readwrite.list-separator.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$)0(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.predefined.program-name.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$)[\!\#\$\%\(\)\*\,-\/\:-\@\[-_ab\|\~](?![0-9A-Z_a-z])/dgv,
          name: "variable.other.predefined.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$)[0-9]+(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.subpattern.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /([\$\%\@](#)?)([\$7A-Za-z]|::)([\$0-9A-Z_a-z]|::)*\b/dgv,
          name: "variable.other.readwrite.global.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" },
            "2": { name: "punctuation.definition.variable.perl" }
          },
          match: /(\$\{)(?:[\$7A-Za-z]|::)(?:[\$0-9A-Z_a-z]|::)*(\})/dgv,
          name: "variable.other.readwrite.global.perl"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.perl" }
          },
          match: /([\$\%\@](#)?)[0-9_]\b/dgv,
          name: "variable.other.readwrite.global.special.perl"
        }
      ]
    }
  },
  dependencies: [
    "html",
    "xml",
    "css",
    "javascript",
    "sql"
  ]
};
