import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "glimmer-js",
  displayName: "Glimmer JS",
  aliases: [
    "gjs"
  ],
  scopeName: "source.gjs",
  patterns: [
    { include: "#main" },
    { include: "source.js" }
  ],
  repository: {
    "as-keyword": {
      match: /\p{space}\b(as)\b(?=\p{space}\|)/dgv,
      name: "keyword.control",
      patterns: []
    },
    "as-params": {
      begin: /(?<!\|)(\|)/dgv,
      beginCaptures: {
        "1": { name: "constant.other.symbol.begin.ember-handlebars" }
      },
      end: /(\|)(?!\|)/dgv,
      endCaptures: {
        "1": { name: "constant.other.symbol.end.ember-handlebars" }
      },
      name: "keyword.block-params.ember-handlebars",
      patterns: [
        { include: "#variable" }
      ]
    },
    attention: {
      match: /@?(TODO|FIXME|CHANGED|XXX|IDEA|HACK|NOTE|REVIEW|NB|BUG|QUESTION|TEMP)\b/dgv,
      name: "storage.type.class.${1:/downcase}",
      patterns: []
    },
    boolean: {
      captures: {
        "0": { name: "string.regexp" },
        "1": { name: "string.regexp" },
        "2": { name: "string.regexp" }
      },
      match: /true|false|undefined|null/dgv,
      patterns: []
    },
    "component-tag": {
      begin: /(<\/?)(@|this[^\n])?([\-\$\.0-\:A-Z_a-z]+)\b/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag" },
        "2": {
          name: "support.function",
          patterns: [
            {
              match: /(@|this)/dgv,
              name: "variable.language"
            },
            {
              match: /(\.)+/dgv,
              name: "punctuation.definition.tag"
            }
          ]
        },
        "3": {
          name: "entity.name.type",
          patterns: [
            { include: "#glimmer-component-path" },
            {
              match: /([\$\:\@])/dgv,
              name: "markup.bold"
            }
          ]
        }
      },
      end: /(\/?)(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag" },
        "2": { name: "punctuation.definition.tag" }
      },
      name: "meta.tag.any.ember-handlebars",
      patterns: [
        { include: "#tag-like-content" }
      ]
    },
    digit: {
      captures: {
        "0": { name: "constant.numeric" },
        "1": { name: "constant.numeric" },
        "2": { name: "constant.numeric" }
      },
      match: /\p{Nd}*(\.)?\p{Nd}+/dgv,
      patterns: []
    },
    entities: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.entity.html.ember-handlebars" },
            "3": { name: "punctuation.definition.entity.html.ember-handlebars" }
          },
          match: /(&)([0-9A-Za-z]+|#[0-9]+|#x\p{AHex}+)(;)/dgv,
          name: "constant.character.entity.html.ember-handlebars"
        },
        {
          match: /&/dgv,
          name: "invalid.illegal.bad-ampersand.html.ember-handlebars"
        }
      ]
    },
    "glimmer-argument": {
      captures: {
        "1": {
          name: "entity.other.attribute-name.ember-handlebars.argument",
          patterns: [
            {
              match: /(@)/dgv,
              name: "markup.italic"
            }
          ]
        },
        "2": { name: "punctuation.separator.key-value.html.ember-handlebars" }
      },
      match: /\p{space}(@[\-\.0-\:A-Z_a-z]+)(=)?/dgv
    },
    "glimmer-as-stuff": {
      patterns: [
        { include: "#as-keyword" },
        { include: "#as-params" }
      ]
    },
    "glimmer-block": {
      begin: /(\{\{~?)([\#\/])(([\$\--9\@-Z_a-z]+))/dgv,
      captures: {
        "1": { name: "punctuation.definition.tag" },
        "2": { name: "punctuation.definition.tag" },
        "3": {
          name: "keyword.control",
          patterns: [
            { include: "#glimmer-component-path" },
            {
              match: /(\/)+/dgv,
              name: "punctuation.definition.tag"
            },
            {
              match: /(\.)+/dgv,
              name: "punctuation.definition.tag"
            }
          ]
        }
      },
      end: /(~?\}\})/dgv,
      name: "entity.expression.ember-handlebars",
      patterns: [
        { include: "#glimmer-as-stuff" },
        { include: "#glimmer-supexp-content" }
      ]
    },
    "glimmer-bools": {
      captures: {
        "0": { name: "keyword.operator" },
        "1": { name: "keyword.operator" },
        "2": { name: "string.regexp" },
        "3": { name: "string.regexp" },
        "4": { name: "keyword.operator" }
      },
      match: /(\{\{~?)(true|false|null|undefined|\p{Nd}*(\.)?\p{Nd}+)(~?\}\})/dgv,
      name: "entity.expression.ember-handlebars"
    },
    "glimmer-comment-block": {
      begin: /\{\{!--/dgv,
      captures: {
        "0": { name: "punctuation.definition.block.comment.glimmer" }
      },
      end: /--\}\}/dgv,
      name: "comment.block.glimmer",
      patterns: [
        { include: "#script" },
        { include: "#attention" }
      ]
    },
    "glimmer-comment-inline": {
      begin: /\{\{!/dgv,
      captures: {
        "0": { name: "punctuation.definition.block.comment.glimmer" }
      },
      end: /\}\}/dgv,
      name: "comment.inline.glimmer",
      patterns: [
        { include: "#script" },
        { include: "#attention" }
      ]
    },
    "glimmer-component-path": {
      captures: {
        "1": { name: "punctuation.definition.tag" }
      },
      match: /(::|[\$\._])/dgv
    },
    "glimmer-control-expression": {
      begin: /(\{\{~?)(([\-\/-9A-Z_a-z]+)\p{space})/dgv,
      captures: {
        "1": { name: "keyword.operator" },
        "2": { name: "keyword.operator" },
        "3": { name: "keyword.control" }
      },
      end: /(~?\}\})/dgv,
      name: "entity.expression.ember-handlebars",
      patterns: [
        { include: "#glimmer-supexp-content" }
      ]
    },
    "glimmer-else-block": {
      captures: {
        "0": { name: "punctuation.definition.tag" },
        "1": { name: "punctuation.definition.tag" },
        "2": { name: "keyword.control" },
        "3": {
          name: "keyword.control",
          patterns: [
            { include: "#glimmer-subexp" },
            { include: "#string-single-quoted-handlebars" },
            { include: "#string-double-quoted-handlebars" },
            { include: "#boolean" },
            { include: "#digit" },
            { include: "#param" },
            { include: "#glimmer-parameter-name" },
            { include: "#glimmer-parameter-value" }
          ]
        },
        "4": { name: "punctuation.definition.tag" }
      },
      match: /(\{\{~?)(else(?:\p{space}[a-z]+\p{space}|))([\x08\(\)\.0-9\@-Za-z\p{space}]+)?(~?\}\})/dgv,
      name: "entity.expression.ember-handlebars"
    },
    "glimmer-expression": {
      begin: /(\{\{~?)(([\-\(\)\.0-9\@-Z_a-z\p{space}]+))/dgv,
      captures: {
        "1": { name: "keyword.operator" },
        "2": { name: "keyword.operator" },
        "3": {
          name: "support.function",
          patterns: [
            {
              match: /\(+/dgv,
              name: "string.regexp"
            },
            {
              match: /\)+/dgv,
              name: "string.regexp"
            },
            {
              match: /(\.)+/dgv,
              name: "punctuation.definition.tag"
            },
            { include: "#glimmer-supexp-content" }
          ]
        }
      },
      end: /(~?\}\})/dgv,
      name: "entity.expression.ember-handlebars",
      patterns: [
        { include: "#glimmer-supexp-content" }
      ]
    },
    "glimmer-expression-property": {
      begin: /(\{\{~?)((@|this[^\n])([\-\.0-9A-Z_a-z]+))/dgv,
      captures: {
        "1": { name: "keyword.operator" },
        "2": { name: "keyword.operator" },
        "3": {
          name: "support.function",
          patterns: [
            {
              match: /(@|this)/dgv,
              name: "variable.language"
            },
            {
              match: /(\.)+/dgv,
              name: "punctuation.definition.tag"
            }
          ]
        },
        "4": {
          name: "support.function",
          patterns: [
            {
              match: /(\.)+/dgv,
              name: "punctuation.definition.tag"
            }
          ]
        }
      },
      end: /(~?\}\})/dgv,
      name: "entity.expression.ember-handlebars",
      patterns: [
        { include: "#glimmer-supexp-content" }
      ]
    },
    "glimmer-parameter-name": {
      captures: {
        "1": { name: "variable.parameter.name.ember-handlebars" },
        "2": { name: "punctuation.definition.expression.ember-handlebars" }
      },
      match: /\b([\-0-9A-Z_a-z]+)(\p{space}?=)/dgv,
      patterns: []
    },
    "glimmer-parameter-value": {
      captures: {
        "1": {
          name: "support.function",
          patterns: [
            {
              match: /(\.)+/dgv,
              name: "punctuation.definition.tag"
            }
          ]
        }
      },
      match: /\b([\-\.0-\:A-Z_a-z]+)\b(?!=)/dgv,
      patterns: []
    },
    "glimmer-special-block": {
      captures: {
        "0": { name: "keyword.operator" },
        "1": { name: "keyword.operator" },
        "2": { name: "keyword.control" },
        "3": { name: "keyword.operator" }
      },
      match: /(\{\{~?)(yield|outlet)(~?\}\})/dgv,
      name: "entity.expression.ember-handlebars"
    },
    "glimmer-subexp": {
      begin: /(\()([\-\.0-9\@-Za-z]+)/dgv,
      captures: {
        "1": { name: "keyword.other" },
        "2": { name: "keyword.control" }
      },
      end: /(\))/dgv,
      name: "entity.subexpression.ember-handlebars",
      patterns: [
        { include: "#glimmer-supexp-content" }
      ]
    },
    "glimmer-supexp-content": {
      patterns: [
        { include: "#glimmer-subexp" },
        { include: "#string-single-quoted-handlebars" },
        { include: "#string-double-quoted-handlebars" },
        { include: "#boolean" },
        { include: "#digit" },
        { include: "#param" },
        { include: "#glimmer-parameter-name" },
        { include: "#glimmer-parameter-value" }
      ]
    },
    "glimmer-unescaped-expression": {
      begin: /\{\{\{/dgv,
      captures: {
        "0": { name: "keyword.operator" }
      },
      end: /\}\}\}/dgv,
      name: "entity.unescaped.expression.ember-handlebars",
      patterns: [
        { include: "#string-single-quoted-handlebars" },
        { include: "#string-double-quoted-handlebars" },
        { include: "#glimmer-subexp" },
        { include: "#param" }
      ]
    },
    "html-attribute": {
      captures: {
        "1": {
          name: "entity.other.attribute-name.ember-handlebars",
          patterns: [
            {
              match: /(\.\.\.attributes)/dgv,
              name: "markup.bold"
            }
          ]
        },
        "2": { name: "punctuation.separator.key-value.html.ember-handlebars" }
      },
      match: /\p{space}([\-\.0-\:A-Z_a-z]+)(=)?/dgv
    },
    "html-comment": {
      begin: /<!--/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.html.ember-handlebars" }
      },
      end: /--\p{space}*>/dgv,
      name: "comment.block.html.ember-handlebars",
      patterns: [
        { include: "#attention" },
        {
          match: /--/dgv,
          name: "invalid.illegal.bad-comments-or-CDATA.html.ember-handlebars"
        }
      ]
    },
    "html-tag": {
      begin: /(<\/?)([\-0-9a-z]+)(?![\.\:])\b/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag" },
        "2": { name: "entity.name.tag.html.ember-handlebars" }
      },
      end: /(\/?)(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag" },
        "2": { name: "punctuation.definition.tag" }
      },
      name: "meta.tag.any.ember-handlebars",
      patterns: [
        { include: "#tag-like-content" }
      ]
    },
    main: {
      patterns: [
        {
          begin: /\p{space}*(<)(template)\p{space}*(>)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.other.html" },
            "3": { name: "punctuation.definition.tag.html" }
          },
          end: /(<\/)(template)(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.other.html" },
            "3": { name: "punctuation.definition.tag.html" }
          },
          name: "meta.js.embeddedTemplateWithoutArgs",
          patterns: [
            { include: "#style" },
            { include: "#script" },
            { include: "#glimmer-else-block" },
            { include: "#glimmer-bools" },
            { include: "#glimmer-special-block" },
            { include: "#glimmer-unescaped-expression" },
            { include: "#glimmer-comment-block" },
            { include: "#glimmer-comment-inline" },
            { include: "#glimmer-expression-property" },
            { include: "#glimmer-control-expression" },
            { include: "#glimmer-expression" },
            { include: "#glimmer-block" },
            { include: "#html-tag" },
            { include: "#component-tag" },
            { include: "#html-comment" },
            { include: "#entities" }
          ]
        },
        {
          begin: /(<)(template)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.other.html" }
          },
          end: /(<\/)(template)(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.other.html" },
            "3": { name: "punctuation.definition.tag.html" }
          },
          name: "meta.js.embeddedTemplateWithArgs",
          patterns: [
            {
              begin: /(?<=<template)/dgv,
              end: /(?=>)/dgv,
              patterns: [
                { include: "#tag-like-content" }
              ]
            },
            {
              begin: /(>)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.definition.tag.end.js" }
              },
              contentName: "meta.html.embedded.block",
              end: /(?=<\/template>)/dgv,
              patterns: [
                { include: "#style" },
                { include: "#script" },
                { include: "#glimmer-else-block" },
                { include: "#glimmer-bools" },
                { include: "#glimmer-special-block" },
                { include: "#glimmer-unescaped-expression" },
                { include: "#glimmer-comment-block" },
                { include: "#glimmer-comment-inline" },
                { include: "#glimmer-expression-property" },
                { include: "#glimmer-control-expression" },
                { include: "#glimmer-expression" },
                { include: "#glimmer-block" },
                { include: "#html-tag" },
                { include: "#component-tag" },
                { include: "#html-comment" },
                { include: "#entities" }
              ]
            }
          ]
        },
        {
          begin: /\b((?:[\p{L}\p{M}\p{N}\p{Pc}]+\.)*h(?:bs|tml)\p{space}*)(`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.js" },
            "2": { name: "punctuation.definition.string.template.begin.js" }
          },
          contentName: "meta.embedded.block.html",
          end: /(`)/dgv,
          endCaptures: {
            "0": { name: "string.js" },
            "1": { name: "punctuation.definition.string.template.end.js" }
          },
          patterns: [
            { include: "source.ts#template-substitution-element" },
            { include: "#style" },
            { include: "#script" },
            { include: "#glimmer-else-block" },
            { include: "#glimmer-bools" },
            { include: "#glimmer-special-block" },
            { include: "#glimmer-unescaped-expression" },
            { include: "#glimmer-comment-block" },
            { include: "#glimmer-comment-inline" },
            { include: "#glimmer-expression-property" },
            { include: "#glimmer-control-expression" },
            { include: "#glimmer-expression" },
            { include: "#glimmer-block" },
            { include: "#html-tag" },
            { include: "#component-tag" },
            { include: "#html-comment" },
            { include: "#entities" }
          ]
        },
        {
          begin: /((createTemplate|hbs|html))(\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.ts" },
            "2": { name: "meta.function-call.ts" },
            "3": { name: "meta.brace.round.ts" }
          },
          contentName: "meta.embedded.block.html",
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "meta.brace.round.ts" }
          },
          patterns: [
            {
              begin: /((["'\`]))/dgv,
              beginCaptures: {
                "1": { name: "string.template.ts" },
                "2": { name: "punctuation.definition.string.template.begin.ts" }
              },
              end: /((["'\`]))/dgv,
              endCaptures: {
                "1": { name: "string.template.ts" },
                "2": { name: "punctuation.definition.string.template.end.ts" }
              },
              patterns: [
                { include: "#style" },
                { include: "#script" },
                { include: "#glimmer-else-block" },
                { include: "#glimmer-bools" },
                { include: "#glimmer-special-block" },
                { include: "#glimmer-unescaped-expression" },
                { include: "#glimmer-comment-block" },
                { include: "#glimmer-comment-inline" },
                { include: "#glimmer-expression-property" },
                { include: "#glimmer-control-expression" },
                { include: "#glimmer-expression" },
                { include: "#glimmer-block" },
                { include: "#html-tag" },
                { include: "#component-tag" },
                { include: "#html-comment" },
                { include: "#entities" }
              ]
            }
          ]
        },
        {
          begin: /((precompileTemplate)\p{space}*)(\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.ts" },
            "2": { name: "meta.function-call.ts" },
            "3": { name: "meta.brace.round.ts" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "meta.brace.round.ts" }
          },
          patterns: [
            {
              begin: /((["'\`]))/dgv,
              beginCaptures: {
                "1": { name: "string.template.ts" },
                "2": { name: "punctuation.definition.string.template.begin.ts" }
              },
              contentName: "meta.embedded.block.html",
              end: /((["'\`]))/dgv,
              endCaptures: {
                "1": { name: "string.template.ts" },
                "2": { name: "punctuation.definition.string.template.end.ts" }
              },
              patterns: [
                { include: "#style" },
                { include: "#script" },
                { include: "#glimmer-else-block" },
                { include: "#glimmer-bools" },
                { include: "#glimmer-special-block" },
                { include: "#glimmer-unescaped-expression" },
                { include: "#glimmer-comment-block" },
                { include: "#glimmer-comment-inline" },
                { include: "#glimmer-expression-property" },
                { include: "#glimmer-control-expression" },
                { include: "#glimmer-expression" },
                { include: "#glimmer-block" },
                { include: "#html-tag" },
                { include: "#component-tag" },
                { include: "#html-comment" },
                { include: "#entities" }
              ]
            },
            { include: "source.ts#object-literal" },
            { include: "source.ts" }
          ]
        }
      ]
    },
    param: {
      captures: {
        "0": {
          name: "support.function",
          patterns: [
            {
              match: /(@|this)/dgv,
              name: "variable.language"
            },
            {
              match: /(\.)+/dgv,
              name: "punctuation.definition.tag"
            }
          ]
        },
        "1": {
          name: "support.function",
          patterns: [
            {
              match: /(\.)+/dgv,
              name: "punctuation.definition.tag"
            }
          ]
        }
      },
      match: /(@|this[^\n])([\-\.0-9A-Z_a-z]+)/dgv,
      patterns: []
    },
    script: {
      begin: /(^[\t ]+)?(?=<script\b(?!-))/dgiv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.embedded.leading.html" }
      },
      end: {
        G: [/(?!￿)([\t ]*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)([\\t ]*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.whitespace.embedded.trailing.html" }
      },
      patterns: [
        {
          begin: /(<)(script)\b/dgiv,
          beginCaptures: {
            "0": { name: "meta.tag.metadata.script.start.html" },
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.html" }
          },
          end: /(\/)(script)(>)/dgiv,
          endCaptures: {
            "0": { name: "meta.tag.metadata.script.end.html" },
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.html" },
            "3": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.embedded.block.html",
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: /(?=\/)/dgv,
              patterns: [
                {
                  begin: /(>)/dgv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.script.start.html" },
                    "1": { name: "punctuation.definition.tag.end.html" }
                  },
                  end: /((<))(?=\/script)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.script.end.html" },
                    "1": { name: "punctuation.definition.tag.begin.html" },
                    "2": { name: "source.js-ignored-vscode" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/￿/dgv, /(?:)/dgv]
                      },
                      end: /(?=<\/script)/dgiv,
                      name: "source.js",
                      patterns: [
                        {
                          begin: /(^[\t ]+)?(?=\/\/)/dgv,
                          beginCaptures: {
                            "1": { name: "punctuation.whitespace.comment.leading.js" }
                          },
                          end: {
                            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
                          },
                          patterns: [
                            {
                              begin: /\/\//dgv,
                              beginCaptures: {
                                "0": { name: "punctuation.definition.comment.js" }
                              },
                              end: /(?=<\/script)|\n/dgv,
                              name: "comment.line.double-slash.js"
                            }
                          ]
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
                  begin: /(?=type\p{space}*=\p{space}*(["']?)text\/(x-handlebars|(x-(handlebars-)?|ng-)?template|html)["'\>\p{space}])/dgiv,
                  end: /((<))(?=\/script)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.script.end.html" },
                    "1": { name: "punctuation.definition.tag.begin.html" },
                    "2": { name: "text.html.basic" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
                      },
                      end: /(?=<\/script)/dgiv,
                      name: "text.html.basic",
                      patterns: [
                        { include: "text.html.basic" }
                      ]
                    }
                  ]
                },
                {
                  begin: /(?=type)/dgiv,
                  end: /(<)(?=\/script)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.script.end.html" },
                    "1": { name: "punctuation.definition.tag.begin.html" }
                  }
                },
                { include: "#string-double-quoted-html" },
                { include: "#string-single-quoted-html" },
                { include: "#glimmer-argument" },
                { include: "#html-attribute" }
              ]
            }
          ]
        }
      ]
    },
    "string-double-quoted-handlebars": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ember-handlebars" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ember-handlebars" }
      },
      name: "string.quoted.double.ember-handlebars",
      patterns: [
        {
          match: /\\"/dgv,
          name: "constant.character.escape.ember-handlebars"
        }
      ]
    },
    "string-double-quoted-html": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ember-handlebars" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ember-handlebars" }
      },
      name: "string.quoted.double.html.ember-handlebars",
      patterns: [
        {
          match: /\\"/dgv,
          name: "constant.character.escape.ember-handlebars"
        },
        { include: "#glimmer-bools" },
        { include: "#glimmer-expression-property" },
        { include: "#glimmer-control-expression" },
        { include: "#glimmer-expression" },
        { include: "#glimmer-block" }
      ]
    },
    "string-single-quoted-handlebars": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ember-handlebars" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ember-handlebars" }
      },
      name: "string.quoted.single.ember-handlebars",
      patterns: [
        {
          match: /\\'/dgv,
          name: "constant.character.escape.ember-handlebars"
        }
      ]
    },
    "string-single-quoted-html": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ember-handlebars" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ember-handlebars" }
      },
      name: "string.quoted.single.html.ember-handlebars",
      patterns: [
        {
          match: /\\'/dgv,
          name: "constant.character.escape.ember-handlebars"
        },
        { include: "#glimmer-bools" },
        { include: "#glimmer-expression-property" },
        { include: "#glimmer-control-expression" },
        { include: "#glimmer-expression" },
        { include: "#glimmer-block" }
      ]
    },
    style: {
      begin: /(^[\t ]+)?(?=<style\b(?!-))/dgiv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.embedded.leading.html" }
      },
      end: {
        G: [/(?!￿)([\t ]*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)([\\t ]*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.whitespace.embedded.trailing.html" }
      },
      patterns: [
        {
          begin: /(<)(style)(?=\p{space}|\/?>)/dgiv,
          beginCaptures: {
            "0": { name: "meta.tag.metadata.style.start.html" },
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.html" }
          },
          end: /((<)\/)(style)\p{space}*(>)/dgiv,
          endCaptures: {
            "0": { name: "meta.tag.metadata.style.end.html" },
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "source.css-ignored-vscode" },
            "3": { name: "entity.name.tag.html" },
            "4": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.embedded.block.html",
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              captures: {
                "1": { name: "punctuation.definition.tag.end.html" }
              },
              end: /(>)/dgv,
              name: "meta.tag.metadata.style.start.html",
              patterns: [
                { include: "#glimmer-argument" },
                { include: "#html-attribute" }
              ]
            },
            {
              begin: {
                G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
              },
              end: /(?=<\/style)/dgiv,
              name: "source.css",
              patterns: [
                { include: "source.css" }
              ]
            }
          ]
        }
      ]
    },
    "tag-like-content": {
      patterns: [
        { include: "#glimmer-bools" },
        { include: "#glimmer-unescaped-expression" },
        { include: "#glimmer-comment-block" },
        { include: "#glimmer-comment-inline" },
        { include: "#glimmer-expression-property" },
        { include: "#boolean" },
        { include: "#digit" },
        { include: "#glimmer-control-expression" },
        { include: "#glimmer-expression" },
        { include: "#glimmer-block" },
        { include: "#string-double-quoted-html" },
        { include: "#string-single-quoted-html" },
        { include: "#glimmer-as-stuff" },
        { include: "#glimmer-argument" },
        { include: "#html-attribute" }
      ]
    },
    variable: {
      match: /\b([\-0-9A-Z_a-z]+)\b/dgv,
      name: "support.function",
      patterns: []
    }
  },
  injections: {
    "L:source.gjs -comment -(string -meta.embedded)": {
      patterns: [
        { include: "#main" }
      ]
    }
  },
  dependencies: [
    "javascript",
    "typescript",
    "css",
    "html"
  ]
};
