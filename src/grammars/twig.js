import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "twig",
  displayName: "Twig",
  scopeName: "text.html.twig",
  patterns: [
    { include: "#twig-verbatim" },
    {
      begin: /(\{%[\-\~]?)\p{space}*(js|includejs|javascript)\p{space}*([\-\~]?%\})/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.tag.twig" },
        "2": { name: "keyword.control.twig" },
        "3": { name: "punctuation.section.tag.twig" }
      },
      contentName: "source.js.embedded.twig",
      end: /(\{%[\-\~]?)\p{space}*end2\p{space}*([\-\~]?%\})/dgv,
      endCaptures: {
        "0": { name: "keyword.control.twig" }
      },
      patterns: [
        { include: "source.js" }
      ]
    },
    {
      begin: /(\{%[\-\~]?)\p{space}*((?:|include|includehires)css)\p{space}*([\-\~]?%\})/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.tag.twig" },
        "2": { name: "keyword.control.twig" },
        "3": { name: "punctuation.section.tag.twig" }
      },
      contentName: "source.css.embedded.twig",
      end: /(\{%[\-\~]?)\p{space}*end2\p{space}*([\-\~]?%\})/dgv,
      endCaptures: {
        "0": { name: "keyword.control.twig" }
      },
      patterns: [
        { include: "source.css" }
      ]
    },
    {
      begin: /(\{%[\-\~]?)\p{space}*((?:|include|includehires)scss)\p{space}*([\-\~]?%\})/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.tag.twig" },
        "2": { name: "keyword.control.twig" },
        "3": { name: "punctuation.section.tag.twig" }
      },
      contentName: "source.css.scss.embedded.twig",
      end: /(\{%[\-\~]?)\p{space}*end2\p{space}*([\-\~]?%\})/dgv,
      endCaptures: {
        "0": { name: "keyword.control.twig" }
      },
      patterns: [
        { include: "source.css.scss" }
      ]
    },
    {
      begin: new EmulatedRegExp("(<)((?:(?=([\\-\\.0-\\:A-Za-z]+))\\3))(?=[^\\>]*></\\2>)", "dgv", { hiddenCaptures: [3] }),
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.html" },
        "2": { name: "entity.name.tag.html" }
      },
      end: /(>(<)\/)(2)(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.html" },
        "2": { name: "meta.scope.between-tag-pair.html" },
        "3": { name: "entity.name.tag.html" },
        "4": { name: "punctuation.definition.tag.html" }
      },
      name: "meta.tag.any.html",
      patterns: [
        { include: "#tag-stuff" }
      ]
    },
    {
      begin: /(<\?)(xml)/dgv,
      captures: {
        "1": { name: "punctuation.definition.tag.html" },
        "2": { name: "entity.name.tag.xml.html" }
      },
      end: /(\?>)/dgv,
      name: "meta.tag.preprocessor.xml.html",
      patterns: [
        { include: "#tag-generic-attribute" },
        { include: "#string-double-quoted" },
        { include: "#string-single-quoted" }
      ]
    },
    {
      begin: /<!--/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.html" }
      },
      end: /--\p{space}*>/dgv,
      name: "comment.block.html",
      patterns: [
        {
          match: /--/dgv,
          name: "invalid.illegal.bad-comments-or-CDATA.html"
        },
        { include: "#embedded-code" }
      ]
    },
    {
      begin: /<!/dgv,
      captures: {
        "0": { name: "punctuation.definition.tag.html" }
      },
      end: />/dgv,
      name: "meta.tag.sgml.html",
      patterns: [
        {
          begin: /DOCTYPE/dgiv,
          captures: {
            "1": { name: "entity.name.tag.doctype.html" }
          },
          end: /(?=>)/dgv,
          name: "meta.tag.sgml.doctype.html",
          patterns: [
            {
              match: /"[^"\>]*"/dgv,
              name: "string.quoted.double.doctype.identifiers-and-DTDs.html"
            }
          ]
        },
        {
          begin: /\[CDATA\[/dgv,
          end: /\]\](?=>)/dgv,
          name: "constant.other.inline-data.html"
        },
        {
          match: /(\p{space}*)(?!--|>)\P{space}(\p{space}*)/dgv,
          name: "invalid.illegal.bad-comments-or-CDATA.html"
        }
      ]
    },
    { include: "#embedded-code" },
    {
      begin: /(?:^\p{space}+)?(<)(style)\b(?![^\>]*\/>)/dgiv,
      captures: {
        "1": { name: "punctuation.definition.tag.html" },
        "2": { name: "entity.name.tag.style.html" },
        "3": { name: "punctuation.definition.tag.html" }
      },
      end: /(<\/)(style)(>)(?:\p{space}*\n)?/dgiv,
      name: "source.css.embedded.html",
      patterns: [
        { include: "#tag-stuff" },
        {
          begin: /(>)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.html" }
          },
          end: /(?=<\/style)/dgiv,
          patterns: [
            { include: "#embedded-code" },
            { include: "source.css" }
          ]
        }
      ]
    },
    {
      begin: /(?:^\p{space}+)?(<)(script)\b(?![^\>]*\/>)/dgiv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.html" },
        "2": { name: "entity.name.tag.script.html" }
      },
      end: /(?<=<\/(script|SCRIPT))(>)(?:\p{space}*\n)?/dgv,
      endCaptures: {
        "2": { name: "punctuation.definition.tag.html" }
      },
      name: "source.js.embedded.html",
      patterns: [
        { include: "#tag-stuff" },
        {
          begin: /(?<!<\/(?:script|SCRIPT))(>)/dgv,
          captures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.script.html" }
          },
          end: /(<\/)(script)/dgiv,
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.comment.js" }
              },
              match: /(\/\/)[^\n]*?((?=<\/script)|(?=\n?$)\n?)/dgv,
              name: "comment.line.double-slash.js"
            },
            {
              begin: /\/\*/dgv,
              captures: {
                "0": { name: "punctuation.definition.comment.js" }
              },
              end: /\*\/|(?=<\/script)/dgv,
              name: "comment.block.js"
            },
            { include: "#php" },
            { include: "#twig-print-tag" },
            { include: "#twig-statement-tag" },
            { include: "#twig-comment-tag" },
            { include: "source.js" }
          ]
        }
      ]
    },
    {
      begin: /(<\/?)((?:body|head|html))\b/dgiv,
      captures: {
        "1": { name: "punctuation.definition.tag.html" },
        "2": { name: "entity.name.tag.structure.any.html" }
      },
      end: /(>)/dgv,
      name: "meta.tag.structure.any.html",
      patterns: [
        { include: "#tag-stuff" }
      ]
    },
    {
      begin: /(<\/?)((?:address|blockquote|dd|div|dl|dt|fieldset|form|frame|frameset|h1|h2|h3|h4|h5|h6|iframe|noframes|object|ol|p|ul|applet|center|dir|hr|menu|pre))\b/dgiv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html" },
        "2": { name: "entity.name.tag.block.any.html" }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html" }
      },
      name: "meta.tag.block.any.html",
      patterns: [
        { include: "#tag-stuff" }
      ]
    },
    {
      begin: /(<\/?)((?:a|abbr|acronym|area|b|base|basefont|bdo|big|br|button|caption|cite|code|col|colgroup|del|dfn|em|font|head|html|i|img|input|ins|isindex|kbd|label|legend|li|link|map|meta|noscript|optgroup|option|param|[qs]|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|u|var))\b/dgiv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html" },
        "2": { name: "entity.name.tag.inline.any.html" }
      },
      end: /((?: ?\/)?>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html" }
      },
      name: "meta.tag.inline.any.html",
      patterns: [
        { include: "#tag-stuff" }
      ]
    },
    {
      begin: /(<\/?)([\-\.0-\:A-Za-z]+)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html" },
        "2": { name: "entity.name.tag.other.html" }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html" }
      },
      name: "meta.tag.other.html",
      patterns: [
        { include: "#tag-stuff" }
      ]
    },
    { include: "#entities" },
    {
      match: /<>/dgv,
      name: "invalid.illegal.incomplete.html"
    },
    {
      match: /</dgv,
      name: "invalid.illegal.bad-angle-bracket.html"
    },
    { include: "#twig-verbatim" },
    { include: "#twig-print-tag" },
    { include: "#twig-statement-tag" },
    { include: "#twig-comment-tag" }
  ],
  repository: {
    "embedded-code": {
      patterns: [
        { include: "#twig-verbatim" },
        { include: "#ruby" },
        { include: "#php" },
        { include: "#twig-print-tag" },
        { include: "#twig-statement-tag" },
        { include: "#twig-comment-tag" },
        { include: "#python" }
      ]
    },
    entities: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.entity.html" },
            "3": { name: "punctuation.definition.entity.html" }
          },
          match: /(&)([0-9A-Za-z]+|#[0-9]+|#x\p{AHex}+)(;)/dgv,
          name: "constant.character.entity.html"
        },
        {
          match: /&/dgv,
          name: "invalid.illegal.bad-ampersand.html"
        }
      ]
    },
    php: {
      begin: /(?=(^\p{space}*)?<\?)/dgv,
      end: /(?!(^\p{space}*)?<\?)/dgv,
      patterns: [
        { include: "source.php" }
      ]
    },
    python: {
      begin: /^\p{space}*<\?python(?![^\n]*\?>)/dgv,
      end: /\?>(?:\p{space}*(?=\n?$)\n)?/dgv,
      name: "source.python.embedded.html",
      patterns: [
        { include: "source.python" }
      ]
    },
    ruby: {
      patterns: [
        {
          begin: /<%+#/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.erb" }
          },
          end: /%>/dgv,
          name: "comment.block.erb"
        },
        {
          begin: /<%+(?!>)=?/dgv,
          captures: {
            "0": { name: "punctuation.section.embedded.ruby" }
          },
          end: /-?%>/dgv,
          name: "source.ruby.embedded.html",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.comment.ruby" }
              },
              match: /(#)[^\n]*?(?=-?%>)/dgv,
              name: "comment.line.number-sign.ruby"
            },
            { include: "source.ruby" }
          ]
        },
        {
          begin: /<\?r(?!>)=?/dgv,
          captures: {
            "0": { name: "punctuation.section.embedded.ruby.nitro" }
          },
          end: /-?\?>/dgv,
          name: "source.ruby.nitro.embedded.html",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.comment.ruby.nitro" }
              },
              match: /(#)[^\n]*?(?=-?\?>)/dgv,
              name: "comment.line.number-sign.ruby.nitro"
            },
            { include: "source.ruby" }
          ]
        }
      ]
    },
    "string-double-quoted": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.html" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.html" }
      },
      name: "string.quoted.double.html",
      patterns: [
        { include: "#embedded-code" },
        { include: "#entities" }
      ]
    },
    "string-single-quoted": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.html" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.html" }
      },
      name: "string.quoted.single.html",
      patterns: [
        { include: "#embedded-code" },
        { include: "#entities" }
      ]
    },
    "tag-generic-attribute": {
      match: /\b([\-\:A-Za-z]+)/dgv,
      name: "entity.other.attribute-name.html"
    },
    "tag-id-attribute": {
      begin: /\b(id)\b\p{space}*(=)/dgv,
      captures: {
        "1": { name: "entity.other.attribute-name.id.html" },
        "2": { name: "punctuation.separator.key-value.html" }
      },
      end: /(?<=["'])/dgv,
      name: "meta.attribute-with-value.id.html",
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.html" }
          },
          contentName: "meta.toc-list.id.html",
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.html" }
          },
          name: "string.quoted.double.html",
          patterns: [
            { include: "#embedded-code" },
            { include: "#entities" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.html" }
          },
          contentName: "meta.toc-list.id.html",
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.html" }
          },
          name: "string.quoted.single.html",
          patterns: [
            { include: "#embedded-code" },
            { include: "#entities" }
          ]
        }
      ]
    },
    "tag-stuff": {
      patterns: [
        {
          begin: /(=)\p{space}*(?=[^"'\<\=\>\`\p{space}])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.key-value.html" }
          },
          contentName: "string.unquoted.html",
          end: /(?=[\>\p{space}])/dgv,
          patterns: [
            { include: "#embedded-code" }
          ]
        },
        { include: "#tag-id-attribute" },
        { include: "#tag-generic-attribute" },
        { include: "#string-double-quoted" },
        { include: "#string-single-quoted" },
        { include: "#embedded-code" }
      ]
    },
    "twig-arrays": {
      begin: /(?<=[\(\,\:\[\{\p{space}])\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.twig" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.twig" }
      },
      name: "meta.array.twig",
      patterns: [
        { include: "#twig-arrays" },
        { include: "#twig-hashes" },
        { include: "#twig-constants" },
        { include: "#twig-operators" },
        { include: "#twig-strings" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        {
          match: /,/dgv,
          name: "punctuation.separator.object.twig"
        }
      ]
    },
    "twig-comment-tag": {
      begin: /\{#[\-\~]?/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.begin.twig" }
      },
      end: /[\-\~]?#\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.end.twig" }
      },
      name: "comment.block.twig"
    },
    "twig-constants": {
      patterns: [
        {
          match: /(?<=[\(\,\:\[\{\p{space}])(?:true|false|null|none)(?=[\]\)\,\}\p{space}])/dgiv,
          name: "constant.language.twig"
        },
        {
          match: /(?<=[\(\,\:\[\{\p{space}]|\.\.|\*\*)[0-9]+(?:\.[0-9]+)?(?=[\]\)\,\}\p{space}]|\.\.|\*\*)/dgv,
          name: "constant.numeric.twig"
        }
      ]
    },
    "twig-embedded-blocks": {
      patterns: [
        {
          begin: /(\{%[\-\~]?)\p{space}*(js|includejs|javascript)\p{space}*([\-\~]?%\})/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.tag.twig" },
            "2": { name: "keyword.control.twig" },
            "3": { name: "punctuation.section.tag.twig" }
          },
          contentName: "source.js.embedded.twig",
          end: /(\{%[\-\~]?)\p{space}*end2\p{space}*([\-\~]?%\})/dgv,
          endCaptures: {
            "0": { name: "keyword.control.twig" }
          },
          patterns: [
            { include: "source.js" }
          ]
        },
        {
          begin: /(\{%[\-\~]?)\p{space}*((?:|include|includehires)css)\p{space}*([\-\~]?%\})/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.tag.twig" },
            "2": { name: "keyword.control.twig" },
            "3": { name: "punctuation.section.tag.twig" }
          },
          contentName: "source.css.embedded.twig",
          end: /(\{%[\-\~]?)\p{space}*end2\p{space}*([\-\~]?%\})/dgv,
          endCaptures: {
            "0": { name: "keyword.control.twig" }
          },
          patterns: [
            { include: "source.css" }
          ]
        },
        {
          begin: /(\{%[\-\~]?)\p{space}*((?:|include|includehires)scss)\p{space}*([\-\~]?%\})/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.tag.twig" },
            "2": { name: "keyword.control.twig" },
            "3": { name: "punctuation.section.tag.twig" }
          },
          contentName: "source.css.scss.embedded.twig",
          end: /(\{%[\-\~]?)\p{space}*end2\p{space}*([\-\~]?%\})/dgv,
          endCaptures: {
            "0": { name: "keyword.control.twig" }
          },
          patterns: [
            { include: "source.css.scss" }
          ]
        }
      ]
    },
    "twig-filters": {
      captures: {
        "1": { name: "support.function.twig" }
      },
      match: /(?<=[\]"'\)0-9A-Z_a-z\x7F-ÿ]\||\{%\p{space}filter\p{space})(default|abs|capitalize|e(?:scape)?|first|join|(?:json|url)_encode|keys|last|length|lower|nl2br|number_format|raw|reverse|round|sort|striptags|title|trim|upper)(?=[\]\)\,\:\|\}\p{space}]|\.\.|\*\*)/dgv
    },
    "twig-filters-ud": {
      captures: {
        "1": { name: "meta.function-call.other.twig" }
      },
      match: /(?<=[\]"'\)0-9A-Z_a-z\x7F-ÿ]\||\{%\p{space}filter\p{space})([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*)/dgv
    },
    "twig-filters-warg": {
      begin: /(?<=[\]"'\)0-9A-Z_a-z\x7F-ÿ]\||\{%\p{space}filter\p{space})(batch|convert_encoding|date|date_modify|default|e(?:scape)?|format|join|merge|number_format|replace|round|slice|split|trim)(\()/dgv,
      beginCaptures: {
        "1": { name: "support.function.twig" },
        "2": { name: "punctuation.definition.parameters.begin.twig" }
      },
      contentName: "meta.function.arguments.twig",
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.twig" }
      },
      patterns: [
        { include: "#twig-constants" },
        { include: "#twig-operators" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        { include: "#twig-strings" },
        { include: "#twig-arrays" },
        { include: "#twig-hashes" }
      ]
    },
    "twig-filters-warg-ud": {
      begin: /(?<=[\]"'\)0-9A-Z_a-z\x7F-ÿ]\||\{%\p{space}filter\p{space})([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*)(\()/dgv,
      beginCaptures: {
        "1": { name: "meta.function-call.other.twig" },
        "2": { name: "punctuation.definition.parameters.begin.twig" }
      },
      contentName: "meta.function.arguments.twig",
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.twig" }
      },
      patterns: [
        { include: "#twig-constants" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        { include: "#twig-strings" },
        { include: "#twig-arrays" },
        { include: "#twig-hashes" }
      ]
    },
    "twig-functions": {
      captures: {
        "1": { name: "keyword.operator.logical.twig" },
        "2": { name: "support.function.twig" }
      },
      match: /(?<=is\p{space})(?:(not)\p{space}+)?(defined|empty|even|iterable|odd|null|same\p{space}+as)/dgv
    },
    "twig-functions-warg": {
      begin: /(?<=[\(\,\:\[\{\p{space}])(attribute|block|constant|cycle|date|divisible by|dump|include|max|min|parent|random|range|same as|source|template_from_string)(\()/dgv,
      beginCaptures: {
        "1": { name: "support.function.twig" },
        "2": { name: "punctuation.definition.parameters.begin.twig" }
      },
      contentName: "meta.function.arguments.twig",
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.twig" }
      },
      patterns: [
        { include: "#twig-constants" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        { include: "#twig-strings" },
        { include: "#twig-arrays" }
      ]
    },
    "twig-hashes": {
      begin: /(?<=[\(\,\:\[\{\p{space}])\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.hash.begin.twig" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.hash.end.twig" }
      },
      name: "meta.hash.twig",
      patterns: [
        { include: "#twig-hashes" },
        { include: "#twig-arrays" },
        { include: "#twig-constants" },
        { include: "#twig-operators" },
        { include: "#twig-strings" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        {
          match: /:/dgv,
          name: "punctuation.separator.key-value.twig"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.object.twig"
        }
      ]
    },
    "twig-injected-statement": {
      begin: /\{%(?![\-\~]?\p{space}*end(?:js|javascript|includejs|css|includecss|includehirescss|scss|includescss|includehiresscss)\b)[\-\~]?/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.tag.twig" }
      },
      end: /[\-\~]?%\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.tag.twig" }
      },
      name: "meta.tag.template.block.twig",
      patterns: [
        { include: "#twig-constants" },
        { include: "#twig-keywords" },
        { include: "#twig-operators" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-strings" },
        { include: "#twig-arrays" },
        { include: "#twig-hashes" }
      ]
    },
    "twig-keywords": {
      match: /\b(?:(?:end)?(?:apply|autoescape|block|cache|deprecated|embed|filter|for|if|macro|raw|sandbox|set|spaceless|trans|verbatim|with)|as|do|else|elseif|extends|flush|from|import|include|only|types|use)\b/dgv,
      name: "keyword.control.twig"
    },
    "twig-macros": {
      begin: /(?<=[\(\,\:\[\{\p{space}])([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*)(?:(\.)([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*))?(\()/dgv,
      beginCaptures: {
        "1": { name: "meta.function-call.twig" },
        "2": { name: "punctuation.separator.property.twig" },
        "3": { name: "variable.other.property.twig" },
        "4": { name: "punctuation.definition.parameters.begin.twig" }
      },
      contentName: "meta.function.arguments.twig",
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.twig" }
      },
      patterns: [
        { include: "#twig-constants" },
        { include: "#twig-operators" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        { include: "#twig-strings" },
        { include: "#twig-arrays" },
        { include: "#twig-hashes" }
      ]
    },
    "twig-objects": {
      captures: {
        "1": { name: "variable.other.twig" }
      },
      match: /(?<=[\(\,\:\[\{\p{space}])([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*)(?=[\]\(\)\,\.\:\[\|\}\p{space}])/dgv
    },
    "twig-operators": {
      patterns: [
        {
          match: /\?\?|\?:|\?\.|<=>|=>|===|!==/dgv,
          name: "keyword.operator.twig"
        },
        {
          captures: {
            "1": { name: "keyword.operator.arithmetic.twig" }
          },
          match: /(?<=\p{space})([\-\+]|\/\/?|%|\*\*?)(?=\p{space})/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.assignment.twig" }
          },
          match: /(?<=\p{space})([\=\~])(?=\p{space})/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.bitwise.twig" }
          },
          match: /(?<=\p{space})(b-(?:and|or|xor))(?=\p{space})/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.comparison.twig" }
          },
          match: /(?<=\p{space})([\!\=]=|<=?|>=?|(?:not )?in|is(?: not)?|(?:ends|starts) with|matches)(?=\p{space})/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.logical.twig" }
          },
          match: /(?<=\p{space})([\:\?]|\?:|\?\?|and|not|or)(?=\p{space})/dgv
        },
        {
          captures: {
            "0": { name: "keyword.operator.other.twig" }
          },
          match: /(?<=[\]"'\)0-9A-Z_a-z\x7F-ÿ])\.\.(?=["'0-9A-Z_a-z\x7F-ÿ])/dgv
        },
        {
          captures: {
            "0": { name: "keyword.operator.other.twig" }
          },
          match: /(?<=[\]"'\)0-9A-Z_a-z\}\x7F-ÿ])\|(?=[A-Z_a-z\x7F-ÿ])/dgv
        }
      ]
    },
    "twig-print-tag": {
      begin: /\{\{[\-\~]?/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.tag.twig" }
      },
      end: /[\-\~]?\}\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.tag.twig" }
      },
      name: "meta.tag.template.value.twig",
      patterns: [
        { include: "#twig-constants" },
        { include: "#twig-operators" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        { include: "#twig-strings" },
        { include: "#twig-arrays" },
        { include: "#twig-hashes" }
      ]
    },
    "twig-properties": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.property.twig" },
            "2": { name: "variable.other.property.twig" }
          },
          match: /(?<=[0-9A-Z_a-z\x7F-ÿ])(\.)([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*)(?=[\]\)\,\.\:\[\|\}\p{space}])/dgv
        },
        {
          begin: /(?<=[0-9A-Z_a-z\x7F-ÿ])(\.)([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*)(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.property.twig" },
            "2": { name: "variable.other.property.twig" },
            "3": { name: "punctuation.definition.parameters.begin.twig" }
          },
          contentName: "meta.function.arguments.twig",
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.parameters.end.twig" }
          },
          patterns: [
            { include: "#twig-constants" },
            { include: "#twig-functions-warg" },
            { include: "#twig-functions" },
            { include: "#twig-macros" },
            { include: "#twig-objects" },
            { include: "#twig-properties" },
            { include: "#twig-filters-warg" },
            { include: "#twig-filters" },
            { include: "#twig-filters-warg-ud" },
            { include: "#twig-filters-ud" },
            { include: "#twig-strings" },
            { include: "#twig-arrays" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.section.array.begin.twig" },
            "2": { name: "variable.other.property.twig" },
            "3": { name: "punctuation.section.array.end.twig" },
            "4": { name: "punctuation.section.array.begin.twig" },
            "5": { name: "variable.other.property.twig" },
            "6": { name: "punctuation.section.array.end.twig" },
            "7": { name: "punctuation.section.array.begin.twig" },
            "8": { name: "variable.other.property.twig" },
            "9": { name: "punctuation.section.array.end.twig" }
          },
          match: /(?<=[\]0-9A-Z_a-z\x7F-ÿ])(?:(\[)('[A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*')(\])|(\[)("[A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*")(\])|(\[)([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*)(\]))/dgv
        }
      ]
    },
    "twig-statement-tag": {
      begin: /\{%[\-\~]?/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.tag.twig" }
      },
      end: /[\-\~]?%\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.tag.twig" }
      },
      name: "meta.tag.template.block.twig",
      patterns: [
        { include: "#twig-constants" },
        { include: "#twig-keywords" },
        { include: "#twig-operators" },
        { include: "#twig-functions-warg" },
        { include: "#twig-functions" },
        { include: "#twig-macros" },
        { include: "#twig-filters-warg" },
        { include: "#twig-filters" },
        { include: "#twig-filters-warg-ud" },
        { include: "#twig-filters-ud" },
        { include: "#twig-objects" },
        { include: "#twig-properties" },
        { include: "#twig-strings" },
        { include: "#twig-arrays" },
        { include: "#twig-hashes" }
      ]
    },
    "twig-strings": {
      patterns: [
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.twig" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.twig" }
          },
          name: "string.quoted.single.twig",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.twig"
            }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.twig" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.twig" }
          },
          name: "string.quoted.double.twig",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.twig"
            }
          ]
        }
      ]
    },
    "twig-verbatim": {
      begin: /(\{%[\-\~]?)\p{space}*(verbatim)\p{space}*([\-\~]?%\})/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.twig" },
        "2": { name: "keyword.control.twig" },
        "3": { name: "punctuation.definition.tag.twig" }
      },
      contentName: "string.unquoted.verbatim.twig",
      end: /(\{%[\-\~]?)\p{space}*(endverbatim)\p{space}*([\-\~]?%\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.twig" },
        "2": { name: "keyword.control.twig" },
        "3": { name: "punctuation.definition.tag.twig" }
      },
      name: "meta.tag.template.verbatim.twig"
    }
  },
  injections: {
    "L:text.html.twig -meta.tag.template -comment.block.twig -string.unquoted.verbatim.twig": {
      patterns: [
        { include: "#twig-verbatim" },
        { include: "#twig-embedded-blocks" },
        { include: "#twig-comment-tag" },
        { include: "#twig-print-tag" },
        { include: "#twig-injected-statement" }
      ]
    }
  },
  dependencies: [
    "javascript",
    "css",
    "scss",
    "php",
    "python",
    "ruby"
  ]
};
