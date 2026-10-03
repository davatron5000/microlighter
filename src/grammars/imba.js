import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "imba",
  displayName: "Imba",
  scopeName: "source.imba",
  patterns: [
    { include: "#root" },
    {
      captures: {
        "1": { name: "punctuation.definition.comment.imba" }
      },
      match: {
        A: [/￿(#!)[^\n]*(?=(?=\n?$))/dgv, /^(#!)[^\n]*(?=(?=\n?$))/dgv]
      },
      name: "comment.line.shebang.imba"
    }
  ],
  repository: {
    "array-literal": {
      begin: /\p{space}*(\[)/dgv,
      beginCaptures: {
        "1": { name: "meta.brace.square.imba" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.imba" }
      },
      name: "meta.array.literal.imba",
      patterns: [
        { include: "#expr" },
        { include: "#punctuation-comma" }
      ]
    },
    block: {
      patterns: [
        { include: "#style-declaration" },
        { include: "#mixin-declaration" },
        { include: "#object-keys" },
        { include: "#generics-literal" },
        { include: "#tag-literal" },
        { include: "#regex" },
        { include: "#keywords" },
        { include: "#comment" },
        { include: "#literal" },
        { include: "#plain-identifiers" },
        { include: "#plain-accessors" },
        { include: "#pairs" },
        { include: "#invalid-indentation" }
      ]
    },
    "boolean-literal": {
      patterns: [
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(true|yes)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "constant.language.boolean.true.imba"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(false|no)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "constant.language.boolean.false.imba"
        }
      ]
    },
    brackets: {
      patterns: [
        {
          begin: /\{/dgv,
          end: /\}|(?=\*\/)/dgv,
          patterns: [
            { include: "#brackets" }
          ]
        },
        {
          begin: /\[/dgv,
          end: /\]|(?=\*\/)/dgv,
          patterns: [
            { include: "#brackets" }
          ]
        }
      ]
    },
    comment: {
      patterns: [
        {
          begin: /\/\*\*(?!\/)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.imba" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.imba" }
          },
          name: "comment.block.documentation.imba",
          patterns: [
            { include: "#docblock" }
          ]
        },
        {
          begin: /(\/\*)(?:\p{space}*((@)internal)(?=\p{space}|(\*\/)))?/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.imba" },
            "2": { name: "storage.type.internaldeclaration.imba" },
            "3": { name: "punctuation.decorator.internaldeclaration.imba" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.imba" }
          },
          name: "comment.block.imba"
        },
        {
          begin: /(### @ts(?=\p{space}|(?=\n?$)))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.imba" }
          },
          contentName: "source.ts.embedded.imba",
          end: /###/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.imba" }
          },
          name: "ts.block.imba"
        },
        {
          begin: /(###)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.imba" }
          },
          end: /###[\t ]*\n/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.imba" }
          },
          name: "comment.block.imba"
        },
        {
          begin: /(^[\t ]+)?((\/\/|#\p{space})(?:\p{space}*((@)internal)(?=\p{space}|(?=\n?$)))?)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.imba" },
            "2": { name: "comment.line.double-slash.imba" },
            "3": { name: "punctuation.definition.comment.imba" },
            "4": { name: "storage.type.internaldeclaration.imba" },
            "5": { name: "punctuation.decorator.internaldeclaration.imba" }
          },
          contentName: "comment.line.double-slash.imba",
          end: /(?=(?=\n?$))/dgv
        }
      ]
    },
    "css-color-keywords": {
      patterns: [
        {
          match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
          name: "support.constant.color.w3c-standard-color-name.css"
        },
        {
          match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(aliceblue|antiquewhite|aquamarine|azure|beige|bisque|blanchedalmond|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|gold|goldenrod|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|limegreen|linen|magenta|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|oldlace|olivedrab|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|rebeccapurple|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|thistle|tomato|transparent|turquoise|violet|wheat|whitesmoke|yellowgreen)(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
          name: "support.constant.color.w3c-extended-color-name.css"
        },
        {
          match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])currentColor(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
          name: "support.constant.color.current.css"
        }
      ]
    },
    "css-combinators": {
      patterns: [
        {
          match: />>>?|[\+\>\~]/dgv,
          name: "punctuation.separator.combinator.css"
        },
        {
          match: /&/dgv,
          name: "keyword.other.parent-selector.css"
        }
      ]
    },
    "css-commas": {
      match: /,/dgv,
      name: "punctuation.separator.list.comma.css"
    },
    "css-comment": {
      patterns: [
        {
          match: /#(\p{space}[^\n]+)?(\n|(?=\n?$))/dgv,
          name: "comment.line.imba"
        },
        {
          match: /^(\t+)(#(\p{space}[^\n]+)?(\n|(?=\n?$)))/dgv,
          name: "comment.line.imba"
        }
      ]
    },
    "css-escapes": {
      patterns: [
        {
          match: /\\\p{AHex}{1,6}/dgv,
          name: "constant.character.escape.codepoint.css"
        },
        {
          begin: /\\(?=\n?$)\p{space}*/dgv,
          end: {
            G: [/^(?<!￿)/dgv, new EmulatedRegExp("^(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          name: "constant.character.escape.newline.css"
        },
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.css"
        }
      ]
    },
    "css-functions": {
      patterns: [
        {
          begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(calc)(\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.calc.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.bracket.round.css" }
          },
          name: "meta.function.calc.css",
          patterns: [
            {
              match: /[\*\/]|(?<=\p{space}|^)[\-\+](?=\p{space}|(?=\n?$))/dgv,
              name: "keyword.operator.arithmetic.css"
            },
            { include: "#css-property-values" }
          ]
        },
        {
          begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(rgba?|hsla?)(\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.misc.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.bracket.round.css" }
          },
          name: "meta.function.color.css",
          patterns: [
            { include: "#css-property-values" }
          ]
        },
        {
          begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])((?:-(?:webkit-|moz-|o-))?(?:repeating-)?(?:linear|radial|conic)-gradient)(\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.gradient.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.bracket.round.css" }
          },
          name: "meta.function.gradient.css",
          patterns: [
            {
              match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(from|to|at)(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
              name: "keyword.operator.gradient.css"
            },
            { include: "#css-property-values" }
          ]
        },
        {
          begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(-webkit-gradient)(\()/dgiv,
          beginCaptures: {
            "1": { name: "invalid.deprecated.gradient.function.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.bracket.round.css" }
          },
          name: "meta.function.gradient.invalid.deprecated.gradient.css",
          patterns: [
            {
              begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(from|to|color-stop)(\()/dgiv,
              beginCaptures: {
                "1": { name: "invalid.deprecated.function.css" },
                "2": { name: "punctuation.section.function.begin.bracket.round.css" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.function.end.bracket.round.css" }
              },
              patterns: [
                { include: "#css-property-values" }
              ]
            },
            { include: "#css-property-values" }
          ]
        },
        {
          begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(annotation|attr|blur|brightness|character-variant|contrast|counters?|cross-fade|drop-shadow|element|fit-content|format|grayscale|hue-rotate|image-set|invert|local|minmax|opacity|ornaments|repeat|saturate|sepia|styleset|stylistic|swash|symbols)(\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.misc.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.bracket.round.css" }
          },
          name: "meta.function.misc.css",
          patterns: [
            {
              match: /(?<=["\,\p{space}]|\*\/|^)\p{Nd}+x(?=["'\)\,\p{space}]|\/\*|(?=\n?$))/dgiv,
              name: "constant.numeric.other.density.css"
            },
            { include: "#css-property-values" },
            {
              match: /[^"'\)\,\p{space}]+/dgv,
              name: "variable.parameter.misc.css"
            }
          ]
        },
        {
          begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(circle|ellipse|inset|polygon|rect)(\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.shape.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.bracket.round.css" }
          },
          name: "meta.function.shape.css",
          patterns: [
            {
              match: /(?<=\p{space}|^|\*\/)(at|round)(?=\p{space}|\/\*|(?=\n?$))/dgiv,
              name: "keyword.operator.shape.css"
            },
            { include: "#css-property-values" }
          ]
        },
        {
          begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(cubic-bezier|steps)(\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.timing-function.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.bracket.round.css" }
          },
          name: "meta.function.timing-function.css",
          patterns: [
            {
              match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(start|end)(?=\p{space}*\)|(?=\n?$))/dgiv,
              name: "support.constant.step-direction.css"
            },
            { include: "#css-property-values" }
          ]
        },
        {
          begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])((?:translate|scale|rotate)(?:[XYZ]|3D)?|matrix(?:3D)?|skew[XY]?|perspective)(\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.transform.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.bracket.round.css" }
          },
          patterns: [
            { include: "#css-property-values" }
          ]
        }
      ]
    },
    "css-numeric-values": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.constant.css" }
          },
          match: /(#)(?:\p{AHex}{3,4}|\p{AHex}{6}|\p{AHex}{8})\b/dgv,
          name: "constant.other.color.rgb-value.hex.css"
        },
        {
          captures: {
            "1": { name: "keyword.other.unit.percentage.css" },
            "2": { name: "keyword.other.unit.${2:/downcase}.css" }
          },
          match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])[\-\+]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:(?<=[0-9])E[\-\+]?[0-9]+)?(?:(%)|(deg|grad|rad|turn|Hz|kHz|ch|cm|em|ex|fr|in|mm|mozmm|pc|pt|px|q|rem|vh|vmax|vmin|vw|dpi|dpcm|dppx|s|ms)\b)?/dgiv,
          name: "constant.numeric.css"
        }
      ]
    },
    "css-property-values": {
      patterns: [
        { include: "#css-commas" },
        { include: "#css-escapes" },
        { include: "#css-functions" },
        { include: "#css-numeric-values" },
        { include: "#css-size-keywords" },
        { include: "#css-color-keywords" },
        { include: "#string" },
        {
          match: /!\p{space}*important(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "keyword.other.important.css"
        }
      ]
    },
    "css-pseudo-classes": {
      captures: {
        "1": { name: "punctuation.definition.entity.css" },
        "2": { name: "invalid.illegal.colon.css" }
      },
      match: /(:)(:*)(?:active|any-link|checked|default|defined|disabled|empty|enabled|first|(?:first|last|only)-(?:child|of-type)|focus|focus-visible|focus-within|fullscreen|host|hover|in-range|indeterminate|invalid|left|link|optional|out-of-range|placeholder-shown|read-only|read-write|required|right|root|scope|target|unresolved|valid|visited)(?![\-\p{L}\p{M}\p{N}\p{Pc}]|\p{space}*[\;\}])/dgiv,
      name: "entity.other.attribute-name.pseudo-class.css"
    },
    "css-pseudo-elements": {
      captures: {
        "1": { name: "punctuation.definition.entity.css" },
        "2": { name: "punctuation.definition.entity.css" }
      },
      match: /(?:(::?)(?:after|before|first-letter|first-line|(?:-(?:ah|apple|atsc|epub|hp|khtml|moz|ms|o|rim|ro|tc|wap|webkit|xv)|(?:mso|prince))-[\-a-z]+)|(::)(?:backdrop|content|grammar-error|marker|placeholder|selection|shadow|spelling-error))(?![\-\p{L}\p{M}\p{N}\p{Pc}]|\p{space}*[\;\}])/dgiv,
      name: "entity.other.attribute-name.pseudo-element.css"
    },
    "css-selector": {
      begin: /(?<=css\p{space})(?![\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=][^\:])/dgv,
      end: /(\p{space}*(?=[\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=][^\:])|\p{space}*(?=\n?$)|(?=\p{space}+#\p{space}))/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.sel-properties.css" }
      },
      name: "meta.selector.css",
      patterns: [
        { include: "#css-selector-innards" }
      ]
    },
    "css-selector-innards": {
      patterns: [
        { include: "#css-commas" },
        { include: "#css-escapes" },
        { include: "#css-combinators" },
        {
          match: /(%[\-\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          name: "entity.other.attribute-name.mixin.css"
        },
        {
          match: /\*/dgv,
          name: "entity.name.tag.wildcard.css"
        },
        {
          begin: /\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.entity.begin.bracket.square.css" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.entity.end.bracket.square.css" }
          },
          name: "meta.attribute-selector.css",
          patterns: [
            { include: "#string" },
            {
              captures: {
                "1": { name: "storage.modifier.ignore-case.css" }
              },
              match: /(?<=["'\p{space}]|^|\*\/)\p{space}*([Ii])\p{space}*(?=[\]\p{space}]|\/\*|(?=\n?$))/dgv
            },
            {
              captures: {
                "1": { name: "string.unquoted.attribute-value.css" }
              },
              match: /(?<==)\p{space}*((?!\/\*)(?:[^\]"'\\\p{space}]|\\[^\n])+)/dgv
            },
            { include: "#css-escapes" },
            {
              match: /[\$\*\^\|\~]?=/dgv,
              name: "keyword.operator.pattern.css"
            },
            {
              match: /\|/dgv,
              name: "punctuation.separator.css"
            },
            {
              captures: {
                "1": { name: "entity.other.namespace-prefix.css" }
              },
              match: /(-?(?!\p{Nd})(?:[\-\p{L}\p{M}\p{N}\p{Pc}[^0-\\x]]|\\(?:\p{AHex}{1,6}|[^\n]))+|\*)(?=\|(?![\=\p{space}]|(?=\n?$)|\])(?:-?(?!\p{Nd})|[\-\\\p{L}\p{M}\p{N}\p{Pc}[^0-\\x]]))/dgv
            },
            {
              captures: {
                "1": { name: "entity.other.attribute-name.css" }
              },
              match: new EmulatedRegExp("(-?(?!\\p{Nd})(?:(?=([\\-\\p{L}\\p{M}\\p{N}\\p{Pc}[^0-\\\\x]]|\\\\(?:\\p{AHex}{1,6}|[^\\n])))\\2)+)\\p{space}*(?=[\\]\\$\\*\\=\\^\\|\\~]|/\\*)", "dgv", { hiddenCaptures: [2] })
            }
          ]
        },
        { include: "#css-pseudo-classes" },
        { include: "#css-pseudo-elements" },
        { include: "#css-mixin" }
      ]
    },
    "css-size-keywords": {
      patterns: [
        {
          match: /(x+s|sm-|md-|lg-|sm|md|lg|x+l|hg|x+h)(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "support.constant.size.property-value.css"
        }
      ]
    },
    "curly-braces": {
      begin: /\p{space}*(\{)/dgv,
      beginCaptures: {
        "1": { name: "meta.brace.curly.imba" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "meta.brace.curly.imba" }
      },
      patterns: [
        { include: "#expr" },
        { include: "#punctuation-comma" }
      ]
    },
    decorator: {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))@(?!@)/dgv,
      beginCaptures: {
        "0": { name: "punctuation.decorator.imba" }
      },
      end: /(?=\p{space})/dgv,
      name: "meta.decorator.imba",
      patterns: [
        { include: "#expr" }
      ]
    },
    directives: {
      begin: /^(\/\/\/)\p{space}*(?=<(reference|amd-dependency|amd-module)(\p{space}+(path|types|no-default-lib|lib|name)\p{space}*=\p{space}*(('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)))+\p{space}*\/>\p{space}*(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.imba" }
      },
      end: /(?=(?=\n?$))/dgv,
      name: "comment.line.triple-slash.directive.imba",
      patterns: [
        {
          begin: /(<)(reference|amd-dependency|amd-module)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.directive.imba" },
            "2": { name: "entity.name.tag.directive.imba" }
          },
          end: /\/>/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.directive.imba" }
          },
          name: "meta.tag.imba",
          patterns: [
            {
              match: /path|types|no-default-lib|lib|name/dgv,
              name: "entity.other.attribute-name.directive.imba"
            },
            {
              match: /=/dgv,
              name: "keyword.operator.assignment.imba"
            },
            { include: "#string" }
          ]
        }
      ]
    },
    docblock: {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "constant.language.access-type.jsdoc" }
          },
          match: /((@)a(?:ccess|pi))\p{space}+(p(?:rivate|rotected|ublic))\b/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
            "4": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
            "5": { name: "constant.other.email.link.underline.jsdoc" },
            "6": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
          },
          match: /((@)author)\p{space}+([^\*\/\<\>\@\p{space}](?:[^\*\/\<\>\@]|\*[^\/])*)(?:\p{space}*(<)([^\>\p{space}]+)(>))?/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
            "4": { name: "keyword.operator.control.jsdoc" },
            "5": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)borrows)\p{space}+((?:[^\*\/\@\p{space}]|\*[^\/])+)\p{space}+(as)\p{space}+((?:[^\*\/\@\p{space}]|\*[^\/])+)/dgv
        },
        {
          begin: /((@)example)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=@|\*\/)/dgv,
          name: "meta.example.jsdoc",
          patterns: [
            {
              match: /^\p{space}\*\p{space}+/dgv
            },
            {
              begin: {
                G: [/￿(<)caption(>)/dgv, /(<)caption(>)/dgvy]
              },
              beginCaptures: {
                "0": { name: "entity.name.tag.inline.jsdoc" },
                "1": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
                "2": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
              },
              contentName: "constant.other.description.jsdoc",
              end: /(<\/)caption(>)|(?=\*\/)/dgv,
              endCaptures: {
                "0": { name: "entity.name.tag.inline.jsdoc" },
                "1": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
                "2": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
              }
            },
            {
              captures: {
                "0": { name: "source.embedded.imba" }
              },
              match: /[^\*\@\p{space}](?:[^\*]|\*[^\/])*/dgv
            }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "constant.language.symbol-type.jsdoc" }
          },
          match: /((@)kind)\p{space}+(class|constant|event|external|file|function|member|mixin|module|namespace|typedef)\b/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.link.underline.jsdoc" },
            "4": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)see)\p{space}+(?:((?=https?:\/\/)(?:[^\*\p{space}]|\*[^\/])+)|((?!https?:\/\/|(?:\[[^\]\[]*\])?\{@(?:link|linkcode|linkplain|tutorial)\b)(?:[^\*\/\@\p{space}]|\*[^\/])+))/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" }
          },
          match: /((@)template)\p{space}+([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*(?:\p{space}*,\p{space}*[\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)*)/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" }
          },
          match: /((@)(?:arg|argument|const|constant|member|namespace|param|var))\p{space}+([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
        },
        {
          begin: /((@)typedef)\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" },
            {
              match: /(?:[^\*\/\@\p{space}]|\*[^\/])+/dgv,
              name: "entity.name.type.instance.jsdoc"
            }
          ]
        },
        {
          begin: /((@)(?:arg|argument|const|constant|member|namespace|param|prop|property|var))\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" },
            {
              match: /([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
              name: "variable.other.jsdoc"
            },
            {
              captures: {
                "1": { name: "punctuation.definition.optional-value.begin.bracket.square.jsdoc" },
                "2": { name: "keyword.operator.assignment.jsdoc" },
                "3": { name: "source.embedded.imba" },
                "4": { name: "punctuation.definition.optional-value.end.bracket.square.jsdoc" },
                "5": { name: "invalid.illegal.syntax.jsdoc" }
              },
              match: new EmulatedRegExp("(\\[)\\p{space}*[\\$\\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:(?:\\[\\])?\\.[\\$\\p{L}\\p{M}\\p{N}\\p{Pc}]+)*(?:\\p{space}*(=)\\p{space}*((?:(?=(\"(?:\\*(?!/)|\\\\(?!\")|[^\\*\\\\])*?\"|'(?:\\*(?!/)|\\\\(?!')|[^\\*\\\\])*?'|\\[(?:\\*(?!/)|[^\\*])*?\\]|(?:\\*(?!/)|\\p{space}(?!\\p{space}*\\])|\\[[^\\n]*?(?:\\]|(?=\\*/))|[^\\]\\*\\[\\p{space}])*))\\4)*))?\\p{space}*(?:(\\])((?:[^\\*\\p{space}]|\\*[^\\/\\p{space}])+)?|(?=\\*/))", "dgv", { hiddenCaptures: [4] }),
              name: "variable.other.jsdoc"
            }
          ]
        },
        {
          begin: /((@)(?:define|enum|exception|export|extends|lends|implements|modifies|namespace|private|protected|returns?|suppress|this|throws|type|yields?))\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)(?:alias|augments|callback|constructs|emits|event|fires|exports?|extends|external|function|func|host|lends|listens|interface|memberof!?|method|module|mixes|mixin|name|requires|see|this|typedef|uses))\p{space}+((?:[^\*\@\{\}\p{space}]|\*[^\/])+)/dgv
        },
        {
          begin: /((@)(?:default(?:value)?|license|version))\p{space}+((["']))/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" },
            "4": { name: "punctuation.definition.string.begin.jsdoc" }
          },
          contentName: "variable.other.jsdoc",
          end: /(3)|(?=(?=\n?$)|\*\/)/dgv,
          endCaptures: {
            "0": { name: "variable.other.jsdoc" },
            "1": { name: "punctuation.definition.string.end.jsdoc" }
          }
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" }
          },
          match: /((@)(?:default(?:value)?|license|tutorial|variation|version))\p{space}+([^\*\p{space}]+)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          match: /(@)(?:abstract|access|alias|api|arg|argument|async|attribute|augments|author|beta|borrows|bubbles|callback|chainable|class|classdesc|code|config|const|constant|constructor|constructs|copyright|default|defaultvalue|define|deprecated|desc|description|dict|emits|enum|event|example|exception|exports?|extends|extension(?:_?for)?|external|externs|file|fileoverview|final|fires|for|func|function|generator|global|hideconstructor|host|ignore|implements|implicitCast|inherit[Dd]oc|inner|instance|interface|internal|kind|lends|license|listens|main|member|memberof!?|method|mixes|mixins?|modifies|module|name|namespace|noalias|nocollapse|nocompile|nosideeffects|override|overview|package|param|polymer(?:Behavior)?|preserve|private|prop|property|protected|public|read[Oo]nly|record|require[ds]|returns?|see|since|static|struct|submodule|summary|suppress|template|this|throws|todo|tutorial|type|typedef|unrestricted|uses|var|variation|version|virtual|writeOnce|yields?)\b/dgv,
          name: "storage.type.class.jsdoc"
        },
        { include: "#inline-tags" },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          match: /((@)[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?)(?=\p{space}+)/dgv
        }
      ]
    },
    expr: {
      patterns: [
        { include: "#style-declaration" },
        { include: "#object-keys" },
        { include: "#generics-literal" },
        { include: "#tag-literal" },
        { include: "#regex" },
        { include: "#keywords" },
        { include: "#comment" },
        { include: "#literal" },
        { include: "#plain-identifiers" },
        { include: "#plain-accessors" },
        { include: "#pairs" }
      ]
    },
    expression: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "meta.brace.round.imba" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.imba" }
          },
          patterns: [
            { include: "#expr" }
          ]
        },
        { include: "#tag-literal" },
        { include: "#expressionWithoutIdentifiers" },
        { include: "#identifiers" },
        { include: "#expressionPunctuations" }
      ]
    },
    expressionPunctuations: {
      patterns: [
        { include: "#punctuation-comma" },
        { include: "#punctuation-accessor" }
      ]
    },
    expressionWithoutIdentifiers: {
      patterns: [
        { include: "#string" },
        { include: "#regex" },
        { include: "#comment" },
        { include: "#function-expression" },
        { include: "#class-expression" },
        { include: "#ternary-expression" },
        { include: "#new-expr" },
        { include: "#instanceof-expr" },
        { include: "#object-literal" },
        { include: "#expression-operators" },
        { include: "#literal" },
        { include: "#support-objects" }
      ]
    },
    "generics-literal": {
      begin: /(?<=[\]\)\p{L}\p{M}\p{N}\p{Pc}])</dgv,
      beginCaptures: {
        "1": { name: "meta.generics.annotation.open.imba" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "meta.generics.annotation.close.imba" }
      },
      name: "meta.generics.annotation.imba",
      patterns: [
        { include: "#type-brackets" }
      ]
    },
    "global-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(global)\b(?!\$)/dgv,
      name: "variable.language.global.imba"
    },
    identifiers: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.accessor.imba" },
            "2": { name: "punctuation.accessor.optional.imba" },
            "3": { name: "entity.name.function.property.imba" }
          },
          match: /(?:(?:(\.)|(\.\.(?!\p{space}*\p{Nd}|\p{space}+)))\p{space}*)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?)(?=\p{space}*=\{\{functionOrArrowLookup\}\})/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.imba" },
            "2": { name: "punctuation.accessor.optional.imba" },
            "3": { name: "variable.other.constant.property.imba" }
          },
          match: /(?:(\.)|(\.\.(?!\p{space}*\p{Nd}|\p{space}+)))\p{space}*(#?\p{Upper}[\$_\p{Nd}\p{Upper}]*)(?![\$_\p{Alpha}\p{Nd}])/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.imba" },
            "2": { name: "punctuation.accessor.optional.imba" },
            "3": { name: "variable.other.class.property.imba" }
          },
          match: /(?:(\.)|(\.\.(?!\p{space}*\p{Nd}|\p{space}+)))(\p{Upper}[\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*!?)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.imba" },
            "2": { name: "punctuation.accessor.optional.imba" },
            "3": { name: "variable.other.property.imba" }
          },
          match: /(?:(\.)|(\.\.(?!\p{space}*\p{Nd}|\p{space}+)))(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?)/dgv
        },
        {
          match: /(for own|for|if|unless|when)\b/dgv,
          name: "keyword.other"
        },
        {
          match: /require/dgv,
          name: "support.function.require"
        },
        { include: "#plain-identifiers" },
        { include: "#type-literal" },
        { include: "#generics-literal" }
      ]
    },
    "inline-css-selector": {
      begin: /^(\t+)(?![\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=])/dgv,
      end: /(\p{space}*(?=[\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=]|[\]\)])|\p{space}*(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.sel-properties.css" }
      },
      name: "meta.selector.css",
      patterns: [
        { include: "#css-selector-innards" }
      ]
    },
    "inline-styles": {
      patterns: [
        { include: "#style-property" },
        { include: "#css-property-values" },
        { include: "#style-expr" }
      ]
    },
    "inline-tags": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.bracket.square.begin.jsdoc" },
            "2": { name: "punctuation.definition.bracket.square.end.jsdoc" }
          },
          match: /(\[)[^\]]+(\])(?=\{@(?:link|linkcode|linkplain|tutorial))/dgv,
          name: "constant.other.description.jsdoc"
        },
        {
          begin: /(\{)((@)(?:link(?:code|plain)?|tutorial))\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.bracket.curly.begin.jsdoc" },
            "2": { name: "storage.type.class.jsdoc" },
            "3": { name: "punctuation.definition.inline.tag.jsdoc" }
          },
          end: /\}|(?=\*\/)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.bracket.curly.end.jsdoc" }
          },
          name: "entity.name.type.instance.jsdoc",
          patterns: [
            {
              captures: {
                "1": { name: "variable.other.link.underline.jsdoc" },
                "2": { name: "punctuation.separator.pipe.jsdoc" }
              },
              match: {
                G: [/￿((?=https?:\/\/)(?:[^\*\|\}\p{space}]|\*\/)+)(\|)?/dgv, /((?=https?:\/\/)(?:[^\*\|\}\p{space}]|\*\/)+)(\|)?/dgvy]
              }
            },
            {
              captures: {
                "1": { name: "variable.other.description.jsdoc" },
                "2": { name: "punctuation.separator.pipe.jsdoc" }
              },
              match: {
                G: [/￿((?:[^\*\@\{\|\}\p{space}]|\*[^\/])+)(\|)?/dgv, /((?:[^\*\@\{\|\}\p{space}]|\*[^\/])+)(\|)?/dgvy]
              }
            }
          ]
        }
      ]
    },
    "invalid-indentation": {
      patterns: [
        {
          match: /^ +/dgv,
          name: "invalid.whitespace"
        },
        {
          match: /^\t+\p{space}+/dgv,
          name: "invalid.whitespace"
        }
      ]
    },
    jsdoctype: {
      patterns: [
        {
          match: {
            G: [/￿\{(?:[^\*\}]|\*[^\/\}])+(?=\n?$)/dgv, /\{(?:[^\*\}]|\*[^\/\}])+(?=\n?$)/dgvy]
          },
          name: "invalid.illegal.type.jsdoc"
        },
        {
          begin: {
            G: [/￿(\{)/dgv, /(\{)/dgvy]
          },
          beginCaptures: {
            "0": { name: "entity.name.type.instance.jsdoc" },
            "1": { name: "punctuation.definition.bracket.curly.begin.jsdoc" }
          },
          contentName: "entity.name.type.instance.jsdoc",
          end: /((\}))\p{space}*|(?=\*\/)/dgv,
          endCaptures: {
            "1": { name: "entity.name.type.instance.jsdoc" },
            "2": { name: "punctuation.definition.bracket.curly.end.jsdoc" }
          },
          patterns: [
            { include: "#brackets" }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /(if|elif|else|unless|switch|when|then|do|import|export|for own|for|while|until|return|yield|try|catch|await|rescue|finally|throw|as|continue|break|extend|augment)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.imba"
        },
        {
          match: /(?<=export)\p{space}+(default)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.imba"
        },
        {
          match: /(?<=import)\p{space}+(type)(?=\p{space}+[\$_\{\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "keyword.control.imba"
        },
        {
          match: /(extend|global|abstract)\p{space}+(?=class|tag|abstract|mixin|interface)/dgv,
          name: "keyword.control.imba"
        },
        {
          match: /(?<=[\$\*\}\p{L}\p{M}\p{N}\p{Pc}])\p{space}+(from)(?=\p{space}+["'])/dgv,
          name: "keyword.control.imba"
        },
        {
          match: /(def|get|set)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "storage.type.function.imba"
        },
        {
          match: /(pr(?:otected|ivate))\p{space}+(?=def|get|set)/dgv,
          name: "keyword.control.imba"
        },
        {
          match: /(tag|class|struct|mixin|interface)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "storage.type.class.imba"
        },
        {
          match: /(let|const|constructor)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "storage.type.imba"
        },
        {
          match: /(prop|attr)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "storage.type.imba"
        },
        {
          match: /(static)\p{space}+/dgv,
          name: "storage.modifier.imba"
        },
        {
          match: /(declare)\p{space}+/dgv,
          name: "storage.modifier.imba"
        },
        { include: "#ops" },
        {
          match: /((?:|\|\||\?\?|&&|[\-\%\*\+\^])=)/dgv,
          name: "keyword.operator.assignment.imba"
        },
        {
          match: /(>=?|<=?)/dgv,
          name: "keyword.operator.imba"
        },
        {
          match: /(of|delete|!?isa|typeof|!?in|new|!?is|isnt)(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.operator.imba"
        }
      ]
    },
    literal: {
      patterns: [
        { include: "#number-with-unit-literal" },
        { include: "#numeric-literal" },
        { include: "#boolean-literal" },
        { include: "#null-literal" },
        { include: "#undefined-literal" },
        { include: "#numericConstant-literal" },
        { include: "#this-literal" },
        { include: "#global-literal" },
        { include: "#super-literal" },
        { include: "#type-literal" },
        { include: "#generics-literal" },
        { include: "#string" }
      ]
    },
    "mixin-css-selector": {
      begin: /(%[\-\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      beginCaptures: {
        "1": { name: "entity.other.attribute-name.mixin.css" }
      },
      end: /(\p{space}*(?=[\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=][^\:])|\p{space}*(?=\n?$)|(?=\p{space}+#\p{space}))/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.sel-properties.css" }
      },
      name: "meta.selector.css",
      patterns: [
        { include: "#css-selector-innards" }
      ]
    },
    "mixin-css-selector-after": {
      begin: /(?<=%[\-\p{L}\p{M}\p{N}\p{Pc}]+)(?![\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=][^\:])/dgv,
      end: /(\p{space}*(?=[\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=][^\:])|\p{space}*(?=\n?$)|(?=\p{space}+#\p{space}))/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.sel-properties.css" }
      },
      name: "meta.selector.css",
      patterns: [
        { include: "#css-selector-innards" }
      ]
    },
    "mixin-declaration": {
      begin: /^(\t*)(%[\-\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      beginCaptures: {
        "2": { name: "entity.other.attribute-name.mixin.css" }
      },
      end: /^(?!(1\t|\p{space}*(?=\n?$)))/dgv,
      name: "meta.style.imba",
      patterns: [
        { include: "#mixin-css-selector-after" },
        { include: "#css-comment" },
        { include: "#nested-css-selector" },
        { include: "#inline-styles" }
      ]
    },
    "nested-css-selector": {
      begin: /^(\t+)(?![\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=][^\:])/dgv,
      end: /(\p{space}*(?=[\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=][^\:])|\p{space}*(?=\n?$)|(?=\p{space}+#\p{space}))/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.sel-properties.css" }
      },
      name: "meta.selector.css",
      patterns: [
        { include: "#css-selector-innards" }
      ]
    },
    "nested-style-declaration": {
      begin: /^(\t+)(?=[\n\^]*&)/dgv,
      end: /^(?!(1\t|\p{space}*(?=\n?$)))/dgv,
      name: "meta.style.imba",
      patterns: [
        { include: "#nested-css-selector" },
        { include: "#inline-styles" }
      ]
    },
    "null-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))null(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "constant.language.null.imba"
    },
    "number-with-unit-literal": {
      patterns: [
        {
          captures: {
            "1": { name: "constant.numeric.imba" },
            "2": { name: "keyword.other.unit.imba" }
          },
          match: /([0-9]+)([a-z]+|%)/dgv
        },
        {
          captures: {
            "1": { name: "constant.numeric.decimal.imba" },
            "2": { name: "keyword.other.unit.imba" }
          },
          match: /([0-9]*\.[0-9]+(?:[Ee][\-\+]?[0-9]+)?)([a-z]+|%)/dgv
        }
      ]
    },
    "numeric-literal": {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.numeric.bigint.imba" }
          },
          match: /\b(?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$)/dgv,
          name: "constant.numeric.hex.imba"
        },
        {
          captures: {
            "1": { name: "storage.type.numeric.bigint.imba" }
          },
          match: /\b(?<!\$)0[Bb][01][01_]*(n)?\b(?!\$)/dgv,
          name: "constant.numeric.binary.imba"
        },
        {
          captures: {
            "1": { name: "storage.type.numeric.bigint.imba" }
          },
          match: /\b(?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$)/dgv,
          name: "constant.numeric.octal.imba"
        },
        {
          captures: {
            "0": { name: "constant.numeric.decimal.imba" },
            "1": { name: "meta.delimiter.decimal.period.imba" },
            "2": { name: "storage.type.numeric.bigint.imba" },
            "3": { name: "meta.delimiter.decimal.period.imba" },
            "4": { name: "storage.type.numeric.bigint.imba" },
            "5": { name: "meta.delimiter.decimal.period.imba" },
            "6": { name: "storage.type.numeric.bigint.imba" },
            "7": { name: "storage.type.numeric.bigint.imba" },
            "8": { name: "meta.delimiter.decimal.period.imba" },
            "9": { name: "storage.type.numeric.bigint.imba" },
            "10": { name: "meta.delimiter.decimal.period.imba" },
            "11": { name: "storage.type.numeric.bigint.imba" },
            "12": { name: "meta.delimiter.decimal.period.imba" },
            "13": { name: "storage.type.numeric.bigint.imba" },
            "14": { name: "storage.type.numeric.bigint.imba" }
          },
          match: /(?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b)(?!\$)/dgv
        }
      ]
    },
    "numericConstant-literal": {
      patterns: [
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))NaN(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "constant.language.nan.imba"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))Infinity(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "constant.language.infinity.imba"
        }
      ]
    },
    "object-keys": {
      patterns: [
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?:/dgv,
          name: "meta.object-literal.key"
        }
      ]
    },
    ops: {
      patterns: [
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.spread.imba"
        },
        {
          match: /\*=|(?<!\()\/=|%=|\+=|-=|\?=|\?\?=|=\?/dgv,
          name: "keyword.operator.assignment.compound.imba"
        },
        {
          match: /\^=\?|\|=\?|~=\?|&=|\^=|<<=|>>=|>>>=|\|=/dgv,
          name: "keyword.operator.assignment.compound.bitwise.imba"
        },
        {
          match: /<<|>>>?/dgv,
          name: "keyword.operator.bitwise.shift.imba"
        },
        {
          match: /(?:==|!=|[\!\=\~])=/dgv,
          name: "keyword.operator.comparison.imba"
        },
        {
          match: /<=|>=|<>|[\<\>]/dgv,
          name: "keyword.operator.relational.imba"
        },
        {
          captures: {
            "1": { name: "keyword.operator.logical.imba" },
            "2": { name: "keyword.operator.arithmetic.imba" }
          },
          match: /(!)\p{space}*(\/)(?![\*\/])/dgv
        },
        {
          match: /!|&&|\|\||\?\?|or\b(?=\p{space}|(?=\n?$))|and\b(?=\p{space}|(?=\n?$))|@\b(?=\p{space}|(?=\n?$))/dgv,
          name: "keyword.operator.logical.imba"
        },
        {
          match: /\?(?=\p{space}|(?=\n?$))/dgv,
          name: "keyword.operator.bitwise.imba"
        },
        {
          match: /[\&\^\|\~]/dgv,
          name: "keyword.operator.ternary.imba"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.imba"
        },
        {
          match: /--/dgv,
          name: "keyword.operator.decrement.imba"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.increment.imba"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.imba"
        }
      ]
    },
    pairs: {
      patterns: [
        { include: "#curly-braces" },
        { include: "#square-braces" },
        { include: "#round-braces" }
      ]
    },
    "plain-accessors": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.accessor.imba" },
            "2": { name: "variable.other.property.imba" }
          },
          match: /(\.\.?)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?)/dgv
        }
      ]
    },
    "plain-identifiers": {
      patterns: [
        {
          match: /(\p{Upper}[\$_\p{Nd}\p{Upper}]*)(?![\$_\p{Alpha}\p{Nd}])/dgv,
          name: "variable.other.constant.imba"
        },
        {
          match: /\p{Upper}[\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*!?/dgv,
          name: "variable.other.class.imba"
        },
        {
          match: /\$\p{Nd}+/dgv,
          name: "variable.special.imba"
        },
        {
          match: /\$[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?/dgv,
          name: "variable.other.internal.imba"
        },
        {
          match: /@@+[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?/dgv,
          name: "variable.other.symbol.imba"
        },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?/dgv,
          name: "variable.other.readwrite.imba"
        },
        {
          match: /@[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?/dgv,
          name: "variable.other.instance.imba"
        },
        {
          match: /#+[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?/dgv,
          name: "variable.other.private.imba"
        },
        {
          match: /:[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?/dgv,
          name: "string.symbol.imba"
        }
      ]
    },
    "punctuation-accessor": {
      captures: {
        "1": { name: "punctuation.accessor.imba" },
        "2": { name: "punctuation.accessor.optional.imba" }
      },
      match: /(\.)|(\.\.(?!\p{space}*\p{Nd}|\p{space}+))/dgv
    },
    "punctuation-comma": {
      match: /,/dgv,
      name: "punctuation.separator.comma.imba"
    },
    "punctuation-semicolon": {
      match: /;/dgv,
      name: "punctuation.terminator.statement.imba"
    },
    "qstring-double": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.imba" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.imba" }
      },
      name: "string.quoted.double.imba",
      patterns: [
        { include: "#template-substitution-element" },
        { include: "#string-character-escape" }
      ]
    },
    "qstring-single": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.imba" }
      },
      end: /(')|([^\n\\])(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.imba" },
        "2": { name: "invalid.illegal.newline.imba" }
      },
      name: "string.quoted.single.imba",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    "qstring-single-multi": {
      begin: /'''/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.imba" }
      },
      end: /'''/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.imba" }
      },
      name: "string.quoted.single.imba",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    regex: {
      patterns: [
        {
          begin: /(?<!\+\+|--|\})(?<=[\!\(\+\,\:\=\?\[]|^return|[^\$\._\p{Alpha}\p{Nd}]return|^case|[^\$\._\p{Alpha}\p{Nd}]case|=>|&&|\|\||\*\/)\p{space}*(\/)(?![\*\/])(?=(?:[^\(\)\/\[\\]|\\[^\n]|\[([^\]\\]|\\[^\n])+\]|\(([^\)\\]|\\[^\n])+\))+\/([gimsuy]+|(?![\*\/])|(?=\/\*))(?!\p{space}*[\$0-9A-Z_a-z]))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.imba" }
          },
          end: /(\/)([gimsuy]*)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.imba" },
            "2": { name: "keyword.other.imba" }
          },
          name: "string.regexp.imba",
          patterns: [
            { include: "#regexp" }
          ]
        },
        {
          begin: /((?<![\]\$\)_\p{Alpha}\p{Nd}]|\+\+|--|\}|\*\/)|((?<=^return|[^\$\._\p{Alpha}\p{Nd}]return|^case|[^\$\._\p{Alpha}\p{Nd}]case))\p{space}*)\/(?![\*\/])(?=(?:[^\/\[\\]|\\[^\n]|\[([^\]\\]|\\[^\n])+\])+\/([gimsuy]+|(?![\*\/])|(?=\/\*))(?!\p{space}*[\$0-9A-Z_a-z]))/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.imba" }
          },
          end: /(\/)([gimsuy]*)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.imba" },
            "2": { name: "keyword.other.imba" }
          },
          name: "string.regexp.imba",
          patterns: [
            { include: "#regexp" }
          ]
        }
      ]
    },
    "regex-character-class": {
      patterns: [
        {
          match: /\\[DSWdfnrstvw]|\./dgv,
          name: "constant.other.character-class.regexp"
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
    regexp: {
      patterns: [
        {
          match: /\\[Bb]|[\$\^]/dgv,
          name: "keyword.control.anchor.regexp"
        },
        {
          captures: {
            "0": { name: "keyword.other.back-reference.regexp" },
            "1": { name: "variable.other.regexp" }
          },
          match: /\\(?:[1-9]\p{Nd}*|k<([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)>)/dgv
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
          begin: /(\()((\?=)|(\?!)|(\?<=)|(\?<!))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.group.regexp" },
            "2": { name: "punctuation.definition.group.assertion.regexp" },
            "3": { name: "meta.assertion.look-ahead.regexp" },
            "4": { name: "meta.assertion.negative-look-ahead.regexp" },
            "5": { name: "meta.assertion.look-behind.regexp" },
            "6": { name: "meta.assertion.negative-look-behind.regexp" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.assertion.regexp",
          patterns: [
            { include: "#regexp" }
          ]
        },
        {
          begin: /\((?:(\?:)|\?<([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)>)?/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.group.regexp" },
            "1": { name: "punctuation.definition.group.no-capture.regexp" },
            "2": { name: "variable.other.regexp" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.regexp",
          patterns: [
            { include: "#regexp" }
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
        { include: "#regex-character-class" }
      ]
    },
    root: {
      patterns: [
        { include: "#block" }
      ]
    },
    "round-braces": {
      begin: /\p{space}*(\()/dgv,
      beginCaptures: {
        "1": { name: "meta.brace.round.imba" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.imba" }
      },
      patterns: [
        { include: "#expr" },
        { include: "#punctuation-comma" }
      ]
    },
    "single-line-comment-consuming-line-ending": {
      begin: /(^[\t ]+)?((\/\/|#\p{space})(?:\p{space}*((@)internal)(?=\p{space}|(?=\n?$)))?)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.imba" },
        "2": { name: "comment.line.double-slash.imba" },
        "3": { name: "punctuation.definition.comment.imba" },
        "4": { name: "storage.type.internaldeclaration.imba" },
        "5": { name: "punctuation.decorator.internaldeclaration.imba" }
      },
      contentName: "comment.line.double-slash.imba",
      end: /(?=^)/dgv
    },
    "square-braces": {
      begin: /\p{space}*(\[)/dgv,
      beginCaptures: {
        "1": { name: "meta.brace.square.imba" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.imba" }
      },
      patterns: [
        { include: "#expr" },
        { include: "#punctuation-comma" }
      ]
    },
    string: {
      patterns: [
        { include: "#qstring-single-multi" },
        { include: "#qstring-double-multi" },
        { include: "#qstring-single" },
        { include: "#qstring-double" },
        { include: "#template" }
      ]
    },
    "string-character-escape": {
      match: /\\(x\p{AHex}{2}|u\p{AHex}{4}|u\{\p{AHex}+\}|[012][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|[^\n]|(?=\n?$))/dgv,
      name: "constant.character.escape.imba"
    },
    "style-declaration": {
      begin: /^(\t*)(?:(global|local|export)\p{space}+)?(?:(scoped)\p{space}+)?(css)\p{space}/dgv,
      beginCaptures: {
        "2": { name: "keyword.control.export.imba" },
        "3": { name: "storage.modifier.imba" },
        "4": { name: "storage.type.style.imba" }
      },
      end: /^(?!(1\t|\p{space}*(?=\n?$)))/dgv,
      name: "meta.style.imba",
      patterns: [
        { include: "#css-selector" },
        { include: "#css-comment" },
        { include: "#nested-css-selector" },
        { include: "#inline-styles" }
      ]
    },
    "style-expr": {
      patterns: [
        {
          captures: {
            "1": { name: "constant.numeric.integer.decimal.css" },
            "2": { name: "keyword.other.unit.css" }
          },
          match: /\b([0-9][0-9_]*)([\p{L}\p{M}\p{N}\p{Pc}]+|%)?/dgv
        },
        {
          match: /--[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?/dgv,
          name: "support.constant.property-value.var.css"
        },
        {
          match: /(x+s|sm-|md-|lg-|sm|md|lg|x+l|hg|x+h)(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "support.constant.property-value.size.css"
        },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?/dgv,
          name: "support.constant.property-value.css"
        },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\)/dgv,
          name: "meta.function.css",
          patterns: [
            { include: "#style-expr" }
          ]
        }
      ]
    },
    "style-property": {
      patterns: [
        {
          begin: /(?=[\-\!\$\%\.\@\^\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*[\:\=])/dgv,
          beginCaptures: {
            "1": { name: "support.function.calc.css" },
            "2": { name: "punctuation.section.function.begin.bracket.round.css" }
          },
          end: /\p{space}*[\:\=]/dgv,
          endCaptures: {
            "0": { name: "punctuation.separator.key-value.css" }
          },
          name: "meta.property-name.css",
          patterns: [
            {
              match: /(?:--|\$)[\-\$\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "support.type.property-name.variable.css"
            },
            {
              match: /@[\!\<\>]?[0-9]+/dgv,
              name: "support.type.property-name.modifier.breakpoint.css"
            },
            {
              match: /\^?@+[\-\$\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "support.type.property-name.modifier.css"
            },
            {
              match: /\^?\.+[\-\$\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "support.type.property-name.modifier.flag.css"
            },
            {
              match: /\^?%+[\-\$\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "support.type.property-name.modifier.state.css"
            },
            {
              match: /\.\.[\-\$\p{L}\p{M}\p{N}\p{Pc}]+|\^+[\%\.\@][\-\$\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "support.type.property-name.modifier.up.css"
            },
            {
              match: /\.[\-\$\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "support.type.property-name.modifier.is.css"
            },
            {
              match: /[\-\$\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "support.type.property-name.css"
            }
          ]
        }
      ]
    },
    "super-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))super\b(?!\$)/dgv,
      name: "variable.language.super.imba"
    },
    "tag-attr-name": {
      begin: /([\$_\p{L}\p{M}\p{N}\p{Pc}]+(?:-[\$_\p{L}\p{M}\p{N}\p{Pc}]+)*)/dgv,
      beginCaptures: {
        "0": { name: "entity.other.attribute-name.imba" }
      },
      contentName: "entity.other.attribute-name.imba",
      end: /(?=[\.\=\>\[\p{space}])/dgv
    },
    "tag-attr-value": {
      begin: /(=)/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.tag.assignment" }
      },
      contentName: "meta.tag.attribute-value.imba",
      end: /(?=[\>\p{space}])/dgv,
      patterns: [
        { include: "#expr" }
      ]
    },
    "tag-classname": {
      begin: /\./dgv,
      contentName: "entity.other.attribute-name.class.css",
      end: /(?=[\(\.\=\>\[\p{space}])/dgv,
      patterns: [
        { include: "#tag-interpolated-content" }
      ]
    },
    "tag-content": {
      patterns: [
        { include: "#tag-name" },
        { include: "#tag-expr-name" },
        { include: "#tag-interpolated-content" },
        { include: "#tag-interpolated-parens" },
        { include: "#tag-interpolated-brackets" },
        { include: "#tag-event-handler" },
        { include: "#tag-mixin-name" },
        { include: "#tag-classname" },
        { include: "#tag-ref" },
        { include: "#tag-attr-value" },
        { include: "#tag-attr-name" },
        { include: "#comment" }
      ]
    },
    "tag-event-handler": {
      begin: /(@[\$_\p{L}\p{M}\p{N}\p{Pc}]+(?:-[\$_\p{L}\p{M}\p{N}\p{Pc}]+)*)/dgv,
      beginCaptures: {
        "0": { name: "entity.other.event-name.imba" }
      },
      contentName: "entity.other.tag.event",
      end: /(?=[\=\>\[\p{space}])/dgv,
      patterns: [
        { include: "#tag-interpolated-content" },
        { include: "#tag-interpolated-parens" },
        {
          begin: /\./dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.tag" }
          },
          end: /(?=[\.\=\>\[\p{space}]|(?=\n?$))/dgv,
          name: "entity.other.event-modifier.imba",
          patterns: [
            { include: "#tag-interpolated-parens" },
            { include: "#tag-interpolated-content" }
          ]
        }
      ]
    },
    "tag-expr-name": {
      begin: /(?<=<)(?=[\{\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      contentName: "entity.name.tag.imba",
      end: /(?=[\#\$\%\(\.\>\[\p{space}])/dgv,
      patterns: [
        { include: "#tag-interpolated-content" }
      ]
    },
    "tag-interpolated-brackets": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.tag.imba" }
      },
      contentName: "meta.embedded.line.imba",
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.tag.imba" }
      },
      name: "meta.tag.expression.imba",
      patterns: [
        { include: "#inline-css-selector" },
        { include: "#inline-styles" }
      ]
    },
    "tag-interpolated-content": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.tag.imba" }
      },
      contentName: "meta.embedded.line.imba",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.tag.imba" }
      },
      name: "meta.tag.expression.imba",
      patterns: [
        { include: "#expression" }
      ]
    },
    "tag-interpolated-parens": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.tag.imba" }
      },
      contentName: "meta.embedded.line.imba",
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.tag.imba" }
      },
      name: "meta.tag.expression.imba",
      patterns: [
        { include: "#expression" }
      ]
    },
    "tag-literal": {
      patterns: [
        {
          begin: /(<)(?=[\#\$\%\(\.\@\[\{\~\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.tag.open.imba" }
          },
          contentName: "meta.tag.attributes.imba",
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.tag.close.imba" }
          },
          name: "meta.tag.imba",
          patterns: [
            { include: "#tag-content" }
          ]
        }
      ]
    },
    "tag-mixin-name": {
      match: /(%[\-\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      name: "entity.other.tag-mixin.imba"
    },
    "tag-name": {
      patterns: [
        {
          match: /(?<=<)(self|global|slot)(?=[\(\.\>\[\p{space}])/dgv,
          name: "entity.name.tag.special.imba"
        }
      ]
    },
    "tag-ref": {
      match: /(\$[\-\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      name: "entity.other.tag-ref.imba"
    },
    template: {
      patterns: [
        {
          begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?\p{space}*\??\.\p{space}*)*|(\??\.\p{space}*)?)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?)(\{\{typeArguments\}\}\p{space}*)?`)/dgv,
          end: /(?=`)/dgv,
          name: "string.template.imba",
          patterns: [
            {
              begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?\p{space}*\??\.\p{space}*)*|(\??\.\p{space}*)?)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?))/dgv,
              end: /(?=(\{\{typeArguments\}\}\p{space}*)?`)/dgv,
              patterns: [
                {
                  match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?)/dgv,
                  name: "entity.name.function.tagged-template.imba"
                }
              ]
            }
          ]
        },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?)\p{space}*(?=(\{\{typeArguments\}\}\p{space}*)`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.imba" }
          },
          end: /(?=`)/dgv,
          name: "string.template.imba",
          patterns: [
            { include: "#type-arguments" }
          ]
        },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(?:-[\$_\p{Alpha}\p{Nd}]+)*[\!\?]?)?(`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.imba" },
            "2": { name: "punctuation.definition.string.template.begin.imba" }
          },
          end: /`/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.template.end.imba" }
          },
          name: "string.template.imba",
          patterns: [
            { include: "#template-substitution-element" },
            { include: "#string-character-escape" }
          ]
        }
      ]
    },
    "template-substitution-element": {
      begin: /(?<!\\)\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.imba" }
      },
      contentName: "meta.embedded.line.imba",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.imba" }
      },
      name: "meta.template.expression.imba",
      patterns: [
        { include: "#expr" }
      ]
    },
    "this-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(this|self)\b(?!\$)/dgv,
      name: "variable.language.this.imba"
    },
    "type-annotation": {
      patterns: [
        { include: "#type-literal" }
      ]
    },
    "type-brackets": {
      patterns: [
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          patterns: [
            { include: "#type-brackets" }
          ]
        },
        {
          begin: /\[/dgv,
          end: /\]/dgv,
          patterns: [
            { include: "#type-brackets" }
          ]
        },
        {
          begin: /</dgv,
          end: />/dgv,
          patterns: [
            { include: "#type-brackets" }
          ]
        },
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          patterns: [
            { include: "#type-brackets" }
          ]
        }
      ]
    },
    "type-literal": {
      begin: /(\\)/dgv,
      beginCaptures: {
        "1": { name: "meta.type.annotation.open.imba" }
      },
      end: /(?=[\]\)\,\.\=\}\p{space}]|(?=\n?$))/dgv,
      name: "meta.type.annotation.imba",
      patterns: [
        { include: "#type-brackets" }
      ]
    },
    "undefined-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))undefined(?![\-\$\?_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "constant.language.undefined.imba"
    }
  },
  dependencies: []
};
