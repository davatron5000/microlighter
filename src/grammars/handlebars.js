export default {
  name: "handlebars",
  displayName: "Handlebars",
  aliases: [
    "hbs"
  ],
  scopeName: "text.html.handlebars",
  patterns: [
    { include: "#escaped_backslash" },
    { include: "#escaped_expression" },
    { include: "#yfm" },
    { include: "#extends" },
    { include: "#block_comments" },
    { include: "#comments" },
    { include: "#block_helper" },
    { include: "#end_block" },
    { include: "#else_token" },
    { include: "#partial_and_var" },
    { include: "#inline_script" },
    { include: "#html_tags" },
    { include: "text.html.basic" }
  ],
  repository: {
    block_comments: {
      patterns: [
        {
          begin: /\{\{~?!--/dgv,
          end: /--~?\}\}/dgv,
          name: "comment.block.handlebars",
          patterns: [
            {
              match: /@[\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
              name: "keyword.annotation.handlebars"
            },
            { include: "#comments" }
          ]
        },
        {
          begin: /<!--/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.html" }
          },
          end: /-{2,3}\p{space}*>/dgv,
          name: "comment.block.html",
          patterns: [
            {
              match: /--/dgv,
              name: "invalid.illegal.bad-comments-or-CDATA.html"
            }
          ]
        }
      ]
    },
    block_helper: {
      begin: /(\{\{)(~?#)([\-\.\/\>_\p{L}\p{N}]+)\p{space}?(@?[\-\.\/_\p{L}\p{N}]+)*\p{space}?(@?[\-\.\/_\p{L}\p{N}]+)*\p{space}?(@?[\-\.\/_\p{L}\p{N}]+)*/dgv,
      beginCaptures: {
        "1": { name: "support.constant.handlebars" },
        "2": { name: "support.constant.handlebars keyword.control" },
        "3": { name: "support.constant.handlebars keyword.control" },
        "4": { name: "variable.parameter.handlebars" },
        "5": { name: "support.constant.handlebars" },
        "6": { name: "variable.parameter.handlebars" },
        "7": { name: "support.constant.handlebars" }
      },
      end: /(~?\}\})/dgv,
      endCaptures: {
        "1": { name: "support.constant.handlebars" }
      },
      name: "meta.function.block.start.handlebars",
      patterns: [
        { include: "#string" },
        { include: "#handlebars_attribute" }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /\{\{~?!/dgv,
          end: /~?\}\}/dgv,
          name: "comment.block.handlebars",
          patterns: [
            {
              match: /@[\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
              name: "keyword.annotation.handlebars"
            },
            { include: "#comments" }
          ]
        },
        {
          begin: /<!--/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.html" }
          },
          end: /-{2,3}\p{space}*>/dgv,
          name: "comment.block.html",
          patterns: [
            {
              match: /--/dgv,
              name: "invalid.illegal.bad-comments-or-CDATA.html"
            }
          ]
        }
      ]
    },
    else_token: {
      begin: /(\{\{)(~?else)(@?\p{space}(if)\p{space}([\-\(\)\.\/_\p{L}\p{N}\p{space}]+))?/dgv,
      beginCaptures: {
        "1": { name: "support.constant.handlebars" },
        "2": { name: "support.constant.handlebars keyword.control" },
        "3": { name: "support.constant.handlebars" },
        "4": { name: "variable.parameter.handlebars" }
      },
      end: /(~?\}\}\}*)/dgv,
      endCaptures: {
        "1": { name: "support.constant.handlebars" }
      },
      name: "meta.function.inline.else.handlebars"
    },
    end_block: {
      begin: /(\{\{)(~?\/)([\-\.\/_\p{L}\p{N}]+)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "support.constant.handlebars" },
        "2": { name: "support.constant.handlebars keyword.control" },
        "3": { name: "support.constant.handlebars keyword.control" }
      },
      end: /(~?\}\})/dgv,
      endCaptures: {
        "1": { name: "support.constant.handlebars" }
      },
      name: "meta.function.block.end.handlebars",
      patterns: []
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
    "escaped-double-quote": {
      match: /\\"/dgv,
      name: "constant.character.escape.js"
    },
    "escaped-single-quote": {
      match: /\\'/dgv,
      name: "constant.character.escape.js"
    },
    escaped_backslash: {
      match: /\\\\(?=\\*\{{2,3})/dgv,
      name: "constant.character.escape.handlebars"
    },
    escaped_expression: {
      match: /\\\{{2,3}/dgv,
      name: "constant.character.escape.handlebars"
    },
    extends: {
      patterns: [
        {
          begin: /(\{\{!<)\p{space}([\-\.\/_\p{L}\p{N}]+)/dgv,
          beginCaptures: {
            "1": { name: "support.function.handlebars" },
            "2": { name: "support.class.handlebars" }
          },
          end: /(\}\})/dgv,
          endCaptures: {
            "1": { name: "support.function.handlebars" }
          },
          name: "meta.preprocessor.handlebars"
        }
      ]
    },
    handlebars_attribute: {
      patterns: [
        { include: "#handlebars_attribute_name" },
        { include: "#handlebars_attribute_value" }
      ]
    },
    handlebars_attribute_name: {
      begin: /\b([\-\._\p{L}\p{N}]+)\b=/dgv,
      captures: {
        "1": { name: "variable.parameter.handlebars" }
      },
      end: /(?=["']?)/dgv,
      name: "entity.other.attribute-name.handlebars"
    },
    handlebars_attribute_value: {
      begin: /([\-\.\/_\p{L}\p{N}]+)\b/dgv,
      captures: {
        "1": { name: "variable.parameter.handlebars" }
      },
      end: /(["']?)/dgv,
      name: "entity.other.attribute-value.handlebars",
      patterns: [
        { include: "#string" }
      ]
    },
    html_tags: {
      patterns: [
        {
          begin: /(<)([\-0-\:A-Za-z]+)(?=[^\>]*><\/\2>)/dgv,
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
            { include: "#tag_generic_attribute" },
            { include: "#string" }
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
            }
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
              begin: /(DOCTYPE|doctype)/dgv,
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
          begin: /(<\/?)((?:address|blockquote|dd|div|header|section|footer|aside|nav|dl|dt|fieldset|form|frame|frameset|h1|h2|h3|h4|h5|h6|iframe|noframes|object|ol|p|ul|applet|center|dir|hr|menu|pre))\b/dgiv,
          captures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.block.any.html" }
          },
          end: /(>)/dgv,
          name: "meta.tag.block.any.html",
          patterns: [
            { include: "#tag-stuff" }
          ]
        },
        {
          begin: /(<\/?)((?:a|abbr|acronym|area|b|base|basefont|bdo|big|br|button|caption|cite|code|col|colgroup|del|dfn|em|font|head|html|i|img|input|ins|isindex|kbd|label|legend|li|link|map|meta|noscript|optgroup|option|param|[qs]|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|u|var))\b/dgiv,
          captures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.inline.any.html" }
          },
          end: /((?: ?\/)?>)/dgv,
          name: "meta.tag.inline.any.html",
          patterns: [
            { include: "#tag-stuff" }
          ]
        },
        {
          begin: /(<\/?)([\-0-\:A-Za-z]+)/dgv,
          captures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.other.html" }
          },
          end: /(>)/dgv,
          name: "meta.tag.other.html",
          patterns: [
            { include: "#tag-stuff" }
          ]
        },
        {
          begin: /(<\/?)([\-0-\:A-Za-\{\}]+)/dgv,
          captures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.tokenised.html" }
          },
          end: /(>)/dgv,
          name: "meta.tag.tokenised.html",
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
        }
      ]
    },
    inline_script: {
      begin: /(?:^\p{space}+)?(<)([Ssſ][Cc][Rr][Ii][Pp][Tt])\b(?=[^\>]*\p{space}type=["'](?:text\/x-handlebars-template|text\/x-handlebars|text\/template|x-tmpl-handlebars)["'])(?![^\>]*\/>)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.html" },
        "2": { name: "entity.name.tag.script.html" }
      },
      end: /(?<=<\/(script|SCRIPT))(>)(?:\p{space}*\n)?/dgv,
      endCaptures: {
        "2": { name: "punctuation.definition.tag.html" }
      },
      name: "source.handlebars.embedded.html",
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
            { include: "#escaped_backslash" },
            { include: "#escaped_expression" },
            { include: "#block_comments" },
            { include: "#comments" },
            { include: "#block_helper" },
            { include: "#end_block" },
            { include: "#else_token" },
            { include: "#partial_and_var" },
            { include: "#html_tags" },
            { include: "text.html.basic" }
          ]
        }
      ]
    },
    partial_and_var: {
      begin: /(\{\{~?\{*(>|!<)*)\p{space}*(@?[\-\$\.\/_\p{L}\p{N}]+)*/dgv,
      beginCaptures: {
        "1": { name: "support.constant.handlebars" },
        "3": { name: "variable.parameter.handlebars" }
      },
      end: /(~?\}\}\}*)/dgv,
      endCaptures: {
        "1": { name: "support.constant.handlebars" }
      },
      name: "meta.function.inline.other.handlebars",
      patterns: [
        { include: "#string" },
        { include: "#handlebars_attribute" }
      ]
    },
    string: {
      patterns: [
        { include: "#string-single-quoted" },
        { include: "#string-double-quoted" }
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
      name: "string.quoted.double.handlebars",
      patterns: [
        { include: "#escaped-double-quote" },
        { include: "#block_comments" },
        { include: "#comments" },
        { include: "#block_helper" },
        { include: "#else_token" },
        { include: "#end_block" },
        { include: "#partial_and_var" }
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
      name: "string.quoted.single.handlebars",
      patterns: [
        { include: "#escaped-single-quote" },
        { include: "#block_comments" },
        { include: "#comments" },
        { include: "#block_helper" },
        { include: "#else_token" },
        { include: "#end_block" },
        { include: "#partial_and_var" }
      ]
    },
    "tag-stuff": {
      patterns: [
        { include: "#tag_id_attribute" },
        { include: "#tag_generic_attribute" },
        { include: "#string" },
        { include: "#block_comments" },
        { include: "#comments" },
        { include: "#block_helper" },
        { include: "#end_block" },
        { include: "#else_token" },
        { include: "#partial_and_var" }
      ]
    },
    tag_generic_attribute: {
      begin: /\b([\-0-9A-Z_a-z]+)\b\p{space}*(=)/dgv,
      captures: {
        "1": { name: "entity.other.attribute-name.generic.html" },
        "2": { name: "punctuation.separator.key-value.html" }
      },
      end: /(?<=["']?)/dgv,
      name: "entity.other.attribute-name.html",
      patterns: [
        { include: "#string" }
      ]
    },
    tag_id_attribute: {
      begin: /\b(id)\b\p{space}*(=)/dgv,
      captures: {
        "1": { name: "entity.other.attribute-name.id.html" },
        "2": { name: "punctuation.separator.key-value.html" }
      },
      end: /(?<=["']?)/dgv,
      name: "meta.attribute-with-value.id.html",
      patterns: [
        { include: "#string" }
      ]
    },
    yfm: {
      patterns: [
        {
          begin: {
            A: [/￿-{3}(?=\n?$)/dgv, /^-{3}(?=\n?$)/dgv]
          },
          end: /^-{3}(?=\n?$)/dgv,
          name: "markup.raw.yaml.front-matter",
          patterns: [
            { include: "source.yaml" }
          ]
        }
      ]
    }
  },
  dependencies: [
    "html",
    "css",
    "javascript",
    "yaml"
  ]
};
