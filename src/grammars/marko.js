import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "marko",
  displayName: "Marko",
  scopeName: "text.marko",
  patterns: [
    {
      begin: /^\p{space}*(style)(\b\P{space}*\.css)?\p{space}+(\{)/dgv,
      beginCaptures: {
        "1": { name: "support.type.builtin.marko" },
        "2": { name: "storage.modifier.marko.css" },
        "3": { name: "punctuation.section.scope.begin.marko.css" }
      },
      contentName: "source.css",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.scope.end.marko.css" }
      },
      name: "meta.embedded.css",
      patterns: [
        { include: "source.css" }
      ]
    },
    {
      begin: /^\p{space}*(style)\b(\P{space}*\.less)\p{space}+(\{)/dgv,
      beginCaptures: {
        "1": { name: "support.type.builtin.marko" },
        "2": { name: "storage.modifier.marko.css" },
        "3": { name: "punctuation.section.scope.begin.marko.css" }
      },
      contentName: "source.less",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.scope.end.marko.css" }
      },
      name: "meta.embedded.less",
      patterns: [
        { include: "source.css.less" }
      ]
    },
    {
      begin: /^\p{space}*(style)\b(\P{space}*\.scss)\p{space}+(\{)/dgv,
      beginCaptures: {
        "1": { name: "support.type.builtin.marko" },
        "2": { name: "storage.modifier.marko.css" },
        "3": { name: "punctuation.section.scope.begin.marko.css" }
      },
      contentName: "source.scss",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.scope.end.marko.css" }
      },
      name: "meta.embedded.scss",
      patterns: [
        { include: "source.css.scss" }
      ]
    },
    {
      begin: /^\p{space}*(style)\b(\P{space}*\.[jt]s)\p{space}+(\{)/dgv,
      beginCaptures: {
        "1": { name: "support.type.builtin.marko" },
        "2": { name: "storage.modifier.marko.css" },
        "3": { name: "punctuation.section.scope.begin.marko.css" }
      },
      contentName: "source.ts",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.scope.end.marko.css" }
      },
      name: "meta.embedded.ts",
      patterns: [
        { include: "source.ts" }
      ]
    },
    {
      begin: /^\p{space}*(?:((?:static|server|client)(?![\-\$0-9\@-Z_a-z]))|(?=(?:class|import|export)[^\-\$0-9\@-Z_a-z]))/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.static.marko" }
      },
      contentName: "source.ts",
      end: /(?=\n|(?=\n?$))/dgv,
      name: "meta.embedded.ts",
      patterns: [
        { include: "source.ts" }
      ]
    },
    { include: "#content-concise-mode" }
  ],
  repository: {
    "attr-value": {
      begin: /\p{space}*(:?=)\p{space}*/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.ts" }
          ]
        }
      },
      contentName: "source.ts",
      end: /(?=[\]\,\;]|\/>|(?<=[^\=\>])(?:(?<!\p{space})>|>(?!=))|(?<!^|[\!\%\&\*\:\?\^\|\~]|[\-\!\%\&\*\+\/\<-\?\^\|\~]=|[\=\>]>|[^\.]\.|[^\-]-|[^\+]\+|[\]\%\)\.0-9\<A-Za-z\}]\p{space}\/|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]await|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]async|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]class|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]function|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]keyof|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]new|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]readonly|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]infer|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]typeof|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]void)\p{space}+(?![\n\!\%\&\(\*\+\:\?\^\{\|\~]|[\-\/\<\=\>]=|[\=\>]>|\.[^\.]|-[^\-]|\/[^\>]|(?:in|instanceof|satisfies|as|extends)\p{space}+[^\,\/\:\;\=\>]))/dgv,
      name: "meta.embedded.ts",
      patterns: [
        { include: "#javascript-expression" }
      ]
    },
    attrs: {
      patterns: [
        { include: "#javascript-comments" },
        {
          match: /\basync(?=(?:[\t ]+[\$0-9A-Z_a-z][\-\$0-9A-Z_a-z]*|[\t ]*)[\t ]*(?:<[^\<\>]*>)?[\t ]*\([^\(\)]*\)[\t ]*\{)/dgv,
          name: "storage.modifier.async.marko"
        },
        {
          applyEndPatternLast: 1,
          begin: /(?:(key|on[\-\$0-9A-Z_a-z]+|[\$0-9A-Z_a-z]+Change|no-update(?:-body)?(?:-if)?)|([\$0-9A-Z_a-z][\-\$0-9A-Z_a-z]*)|(#[\$0-9A-Z_a-z][\-\$0-9A-Z_a-z]*))(:[\$0-9A-Z_a-z][\-\$0-9A-Z_a-z]*)?/dgv,
          beginCaptures: {
            "1": { name: "support.type.attribute-name.marko" },
            "2": { name: "entity.other.attribute-name.marko" },
            "3": { name: "support.function.attribute-name.marko" },
            "4": { name: "support.function.attribute-name.marko" }
          },
          end: /(?=[^\n]|(?=\n?$))/dgv,
          name: "meta.marko-attribute",
          patterns: [
            { include: "#html-args-or-method" },
            { include: "#attr-value" }
          ]
        },
        {
          begin: /(\.\.\.)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.spread.marko" }
          },
          contentName: "source.ts",
          end: /(?=[\]\,\;]|\/>|(?<=[^\=\>])(?:(?<!\p{space})>|>(?!=))|(?<!^|[\!\%\&\*\:\?\^\|\~]|[\-\!\%\&\*\+\/\<-\?\^\|\~]=|[\=\>]>|[^\.]\.|[^\-]-|[^\+]\+|[\]\%\)\.0-9\<A-Za-z\}]\p{space}\/|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]await|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]async|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]class|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]function|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]keyof|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]new|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]readonly|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]infer|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]typeof|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]void)\p{space}+(?![\n\!\%\&\(\*\+\:\?\^\{\|\~]|[\-\/\<\=\>]=|[\=\>]>|\.[^\.]|-[^\-]|\/[^\>]|(?:in|instanceof|satisfies|as|extends)\p{space}+[^\,\/\:\;\=\>]))/dgv,
          name: "meta.marko-spread-attribute",
          patterns: [
            { include: "#javascript-expression" }
          ]
        },
        {
          begin: /\p{space}*(,(?!,))/dgv,
          captures: {
            "1": { name: "punctuation.separator.comma.marko" }
          },
          end: /(?=\P{space})/dgv
        },
        { include: "#invalid" }
      ]
    },
    cdata: {
      begin: /\p{space}*<!\[CDATA\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.tag.begin.marko" }
      },
      contentName: "string.other.inline-data.marko",
      end: /\]\]>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.marko" }
      },
      name: "meta.tag.metadata.cdata.marko"
    },
    "concise-attr-group": {
      begin: /\p{space}*(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.scope.begin.marko" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.scope.end.marko" }
      },
      patterns: [
        { include: "#concise-attr-group" },
        {
          begin: /\p{space}+/dgv,
          end: /(?=\P{space})/dgv
        },
        { include: "#attrs" },
        { include: "#invalid" }
      ]
    },
    "concise-comment-block": {
      begin: /\p{space}*(--+)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-comment-block",
      patterns: [
        { include: "#content-embedded-comment" }
      ]
    },
    "concise-comment-line": {
      applyEndPatternLast: 1,
      begin: /\p{space}*(--+)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      end: /(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-comment-line",
      patterns: [
        { include: "#content-embedded-comment" }
      ]
    },
    "concise-html-block": {
      begin: /\p{space}*(--+)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-html-block",
      patterns: [
        { include: "#content-html-mode" }
      ]
    },
    "concise-html-line": {
      captures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" },
        "2": {
          patterns: [
            { include: "#cdata" },
            { include: "#doctype" },
            { include: "#declaration" },
            { include: "#javascript-comments-after-whitespace" },
            { include: "#html-comment" },
            { include: "#tag-html" },
            {
              match: /\\[^\n]/dgv,
              name: "text.marko"
            },
            { include: "#placeholder" },
            {
              match: /[^\n]+?/dgv,
              name: "text.marko"
            }
          ]
        },
        "3": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      match: /\p{space}*(--+)(?=\p{space}+\P{space})([^\n]*)(?=\n?$)()/dgv,
      name: "meta.section.marko-html-line"
    },
    "concise-open-tag-content": {
      patterns: [
        { include: "#invalid-close-tag" },
        { include: "#tag-before-attrs" },
        { include: "#concise-semi-eol" },
        {
          begin: /(?!^)[\t \,]/dgv,
          end: /(?=--)|(?=\n)/dgv,
          patterns: [
            { include: "#concise-semi-eol" },
            { include: "#concise-attr-group" },
            {
              begin: /[\t ]+/dgv,
              end: /(?=[\n\P{space}])/dgv
            },
            { include: "#attrs" },
            { include: "#invalid" }
          ]
        }
      ]
    },
    "concise-script-block": {
      begin: /\p{space}*(--+)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-script-block",
      patterns: [
        { include: "#content-embedded-script" }
      ]
    },
    "concise-script-line": {
      applyEndPatternLast: 1,
      begin: /\p{space}*(--+)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      end: /(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-script-line",
      patterns: [
        { include: "#content-embedded-script" }
      ]
    },
    "concise-semi-eol": {
      begin: /\p{space}*(;)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.terminator.marko" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#javascript-comments" },
        { include: "#html-comment" },
        { include: "#invalid" }
      ]
    },
    "concise-style-block": {
      begin: /\p{space}*(--+)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      contentName: "source.css",
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-style-block",
      patterns: [
        { include: "#content-embedded-style" }
      ]
    },
    "concise-style-block-less": {
      begin: /\p{space}*(--+)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      contentName: "source.less",
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-style-block",
      patterns: [
        { include: "#content-embedded-style-less" }
      ]
    },
    "concise-style-block-scss": {
      begin: /\p{space}*(--+)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      contentName: "source.scss",
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-style-block",
      patterns: [
        { include: "#content-embedded-style-scss" }
      ]
    },
    "concise-style-line": {
      applyEndPatternLast: 1,
      begin: /\p{space}*(--+)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      contentName: "source.css",
      end: /(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-style-line",
      patterns: [
        { include: "#content-embedded-style" }
      ]
    },
    "concise-style-line-less": {
      applyEndPatternLast: 1,
      begin: /\p{space}*(--+)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      contentName: "source.less",
      end: /(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-style-line",
      patterns: [
        { include: "#content-embedded-style-less" }
      ]
    },
    "concise-style-line-scss": {
      applyEndPatternLast: 1,
      begin: /\p{space}*(--+)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.embedded.scope.begin.marko" }
      },
      contentName: "source.scss",
      end: /(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.scope.end.marko" }
      },
      name: "meta.section.marko-style-line",
      patterns: [
        { include: "#content-embedded-style-scss" }
      ]
    },
    "content-concise-mode": {
      name: "meta.marko-concise-content",
      patterns: [
        { include: "#scriptlet" },
        { include: "#javascript-comments" },
        { include: "#cdata" },
        { include: "#doctype" },
        { include: "#declaration" },
        { include: "#html-comment" },
        { include: "#concise-html-block" },
        { include: "#concise-html-line" },
        { include: "#invalid-close-tag" },
        { include: "#tag-html" },
        {
          patterns: [
            {
              begin: /^(\p{space}*)(?=html-comment[^\-\$0-9\@-Z_a-z])/dgv,
              patterns: [
                { include: "#concise-open-tag-content" },
                { include: "#concise-comment-block" },
                { include: "#concise-comment-line" }
              ],
              while: /(?=^(?:\p{space}*[\]\)\`\}]|\*\/|\p{space}*(?=\n?$)|1\p{space}+(\P{space}|(?=\n?$))))/dgv
            },
            {
              begin: /^(\p{space}*)(?=style\b\P{space}*\.less\b)/dgv,
              patterns: [
                { include: "#concise-open-tag-content" },
                { include: "#concise-style-block-less" },
                { include: "#concise-style-line-less" }
              ],
              while: /(?=^(?:\p{space}*[\]\)\`\}]|\*\/|\p{space}*(?=\n?$)|1\p{space}+(\P{space}|(?=\n?$))))/dgv
            },
            {
              begin: /^(\p{space}*)(?=style\b\P{space}*\.scss\b)/dgv,
              patterns: [
                { include: "#concise-open-tag-content" },
                { include: "#concise-style-block-scss" },
                { include: "#concise-style-line-scss" }
              ],
              while: /(?=^(?:\p{space}*[\]\)\`\}]|\*\/|\p{space}*(?=\n?$)|1\p{space}+(\P{space}|(?=\n?$))))/dgv
            },
            {
              begin: /^(\p{space}*)(?=style\b\P{space}*\.[jt]s\b)/dgv,
              patterns: [
                { include: "#concise-open-tag-content" },
                { include: "#concise-script-block" },
                { include: "#concise-script-line" }
              ],
              while: /(?=^(?:\p{space}*[\]\)\`\}]|\*\/|\p{space}*(?=\n?$)|1\p{space}+(\P{space}|(?=\n?$))))/dgv
            },
            {
              begin: /^(\p{space}*)(?=(?:html-)?style[^\-\$0-9\@-Z_a-z])/dgv,
              patterns: [
                { include: "#concise-open-tag-content" },
                { include: "#concise-style-block" },
                { include: "#concise-style-line" }
              ],
              while: /(?=^(?:\p{space}*[\]\)\`\}]|\*\/|\p{space}*(?=\n?$)|1\p{space}+(\P{space}|(?=\n?$))))/dgv
            },
            {
              begin: /^(\p{space}*)(?=(?:html-)?script[^\-\$0-9\@-Z_a-z])/dgv,
              patterns: [
                { include: "#concise-open-tag-content" },
                { include: "#concise-script-block" },
                { include: "#concise-script-line" }
              ],
              while: /(?=^(?:\p{space}*[\]\)\`\}]|\*\/|\p{space}*(?=\n?$)|1\p{space}+(\P{space}|(?=\n?$))))/dgv
            },
            {
              begin: /^([\t ]*)(?=[\#\$\.0-9\@-Z_a-z])/dgv,
              patterns: [
                { include: "#concise-open-tag-content" },
                { include: "#content-concise-mode" }
              ],
              while: /(?=^(?:\p{space}*[\]\)\`\}]|\*\/|\p{space}*(?=\n?$)|1\p{space}+(\P{space}|(?=\n?$))))/dgv
            }
          ]
        }
      ]
    },
    "content-embedded-comment": {
      patterns: [
        { include: "#placeholder" },
        {
          match: /[^\n]/dgv,
          name: "comment.block.marko"
        }
      ]
    },
    "content-embedded-script": {
      name: "meta.embedded.ts",
      patterns: [
        { include: "#placeholder" },
        { include: "source.ts" }
      ]
    },
    "content-embedded-style": {
      name: "meta.embedded.css",
      patterns: [
        { include: "#placeholder" },
        { include: "source.css" }
      ]
    },
    "content-embedded-style-less": {
      name: "meta.embedded.css.less",
      patterns: [
        { include: "#placeholder" },
        { include: "source.css.less" }
      ]
    },
    "content-embedded-style-scss": {
      name: "meta.embedded.css.scss",
      patterns: [
        { include: "#placeholder" },
        { include: "source.css.scss" }
      ]
    },
    "content-html-mode": {
      patterns: [
        { include: "#scriptlet" },
        { include: "#cdata" },
        { include: "#doctype" },
        { include: "#declaration" },
        { include: "#javascript-comments-after-whitespace" },
        { include: "#html-comment" },
        { include: "#invalid-close-tag" },
        { include: "#tag-html" },
        {
          match: /\\[^\n]/dgv,
          name: "text.marko"
        },
        { include: "#placeholder" },
        {
          match: /[^\n]+?/dgv,
          name: "text.marko"
        }
      ]
    },
    declaration: {
      begin: /(<\?)\p{space}*([\-\$0-9A-Z_a-z]*)/dgv,
      captures: {
        "1": { name: "punctuation.definition.tag.marko" },
        "2": { name: "entity.name.tag.marko" }
      },
      end: /(\??>)/dgv,
      name: "meta.tag.metadata.processing.xml.marko",
      patterns: [
        {
          captures: {
            "1": { name: "entity.other.attribute-name.marko" },
            "2": { name: "punctuation.separator.key-value.html" },
            "3": { name: "string.quoted.double.marko" },
            "4": { name: "string.quoted.single.marko" },
            "5": { name: "string.unquoted.marko" }
          },
          match: /((?:[^\=\>\?\p{space}]|\?(?!>))+)(=)(?:("(?:[^"\\]|\\[^\n])*")|('(?:[^'\\]|\\[^\n])*')|((?:[^\>\?\p{space}]|\?(?!>))+))/dgv
        }
      ]
    },
    doctype: {
      begin: /\p{space}*<!(?=DOCTYPE\p{space})/dgiv,
      beginCaptures: {
        "0": { name: "punctuation.definition.tag.begin.marko" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.marko" }
      },
      name: "meta.tag.metadata.doctype.marko",
      patterns: [
        {
          match: {
            G: [/￿DOCTYPE/dgiv, /DOCTYPE/dgivy]
          },
          name: "entity.name.tag.marko"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.marko"
        },
        {
          match: /[^\>\p{space}]+/dgv,
          name: "entity.other.attribute-name.marko"
        }
      ]
    },
    "html-args-or-method": {
      patterns: [
        { include: "#tag-type-params" },
        {
          begin: /\p{space}*(?=\()/dgv,
          contentName: "source.ts",
          end: /(?<=\))/dgv,
          name: "meta.embedded.ts",
          patterns: [
            { include: "source.ts#paren-expression" }
          ]
        },
        {
          begin: /(?<=\))\p{space}*(?=\{)/dgv,
          contentName: "source.ts",
          end: /(?<=\})/dgv,
          name: "meta.embedded.ts",
          patterns: [
            { include: "source.ts" }
          ]
        }
      ]
    },
    "html-comment": {
      begin: /\p{space}*(<!(--)?)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.marko" }
      },
      end: /2>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.marko" }
      },
      name: "comment.block.marko"
    },
    invalid: {
      match: /\P{space}/dgv,
      name: "invalid.illegal.character-not-allowed-here.marko"
    },
    "invalid-close-tag": {
      begin: /\p{space}*<\/[^\>]*/dgv,
      end: />/dgv,
      name: "invalid.illegal.character-not-allowed-here.marko"
    },
    "javascript-comments": {
      patterns: [
        {
          begin: /\p{space}*(?=\/\*)/dgv,
          contentName: "source.ts",
          end: /(?<=\*\/)/dgv,
          patterns: [
            { include: "source.ts" }
          ]
        },
        {
          captures: {
            "0": {
              patterns: [
                { include: "source.ts" }
              ]
            }
          },
          contentName: "source.ts",
          match: /\p{space}*\/\/[^\n]*(?=\n?$)/dgv
        }
      ]
    },
    "javascript-comments-after-whitespace": {
      patterns: [
        {
          begin: /(?:^|\p{space}+)(?=\/\*)/dgv,
          contentName: "source.ts",
          end: /(?<=\*\/)/dgv,
          patterns: [
            { include: "source.ts" }
          ]
        },
        {
          captures: {
            "0": {
              patterns: [
                { include: "source.ts" }
              ]
            }
          },
          contentName: "source.ts",
          match: /(?:^|\p{space}+)\/\/[^\n]*(?=\n?$)/dgv
        }
      ]
    },
    "javascript-expression": {
      patterns: [
        { include: "#javascript-comments" },
        {
          captures: {
            "0": {
              patterns: [
                { include: "source.ts" }
              ]
            }
          },
          contentName: "source.ts",
          match: /(?:\p{space}*\b(?:as|await|extends|in|instanceof|satisfies|keyof|new|typeof|void))+\p{space}+(?![\,\/\:\;\=\>])[\#\$0-9\@-Z_a-z]*/dgv
        },
        {
          applyEndPatternLast: 1,
          captures: {
            "0": {
              name: "string.regexp.ts",
              patterns: [
                { include: "source.ts#regexp" },
                { include: "source.ts" }
              ]
            }
          },
          contentName: "source.ts",
          match: /(?<![\]\%\)\.0-9\<A-Za-z\}])\p{space}*\/(?:[^\/\[\\]|\\[^\n]|\[(?:[^\]\\]|\\[^\n])*\])*\/[A-Za-z]*/dgv
        },
        { include: "source.ts" }
      ]
    },
    "javascript-placeholder": {
      begin: /\$\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.ts" }
      },
      contentName: "source.ts",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.ts" }
      },
      patterns: [
        { include: "source.ts" }
      ]
    },
    "open-tag-content": {
      patterns: [
        { include: "#invalid-close-tag" },
        { include: "#tag-before-attrs" },
        {
          begin: /(?!\/?>)/dgv,
          end: /(?=\/?>)/dgv,
          patterns: [
            { include: "#attrs" }
          ]
        }
      ]
    },
    placeholder: {
      begin: /\$!?\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.ts" }
      },
      contentName: "source.ts",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.ts" }
      },
      patterns: [
        { include: "source.ts" }
      ]
    },
    scriptlet: {
      begin: /^\p{space}*(\$)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.scriptlet.marko" }
      },
      contentName: "source.ts",
      end: /(?=\n?$)/dgv,
      name: "meta.embedded.ts",
      patterns: [
        { include: "source.ts" }
      ]
    },
    "tag-before-attrs": {
      patterns: [
        { include: "#tag-name" },
        { include: "#tag-shorthand-class-or-id" },
        {
          begin: /\/(?![\*\/])/dgv,
          beginCaptures: {
            "0": { name: "punctuation.separator.tag-variable.marko" }
          },
          contentName: "source.ts",
          end: /(?=[\(\,\/\;\<\>\|]|:?=|\p{space}+[^\:]|(?=\n?$))/dgv,
          name: "meta.embedded.ts",
          patterns: [
            {
              match: /[\$A-Z_a-z][\$0-9A-Z_a-z]*/dgv,
              name: "variable.other.constant.object.ts"
            },
            {
              begin: /\{/dgv,
              captures: {
                "0": { name: "punctuation.definition.binding-pattern.object.ts" }
              },
              end: /\}/dgv,
              patterns: [
                { include: "source.ts#object-binding-element" },
                { include: "#javascript-expression" }
              ]
            },
            {
              begin: /\[/dgv,
              captures: {
                "0": { name: "punctuation.definition.binding-pattern.array.ts" }
              },
              end: /\]/dgv,
              patterns: [
                { include: "source.ts#array-binding-element" },
                { include: "#javascript-expression" }
              ]
            },
            {
              begin: /\p{space}*(:)(?!=)/dgv,
              beginCaptures: {
                "1": { name: "keyword.operator.type.annotation.ts" }
              },
              end: /(?=[\]\(\,\;]|\/>|(?<=[^\=\>])(?:(?<!\p{space})>|>(?!=))|(?<!^|[\!\%\&\*\:\?\^\|\~]|[\-\!\%\&\*\+\/\<-\?\^\|\~]=|[\=\>]>|[^\.]\.|[^\-]-|[^\+]\+|[\]\%\)\.0-9\<A-Za-z\}]\p{space}\/|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]await|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]async|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]class|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]function|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]keyof|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]new|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]readonly|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]infer|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]typeof|[^\$\.\p{L}\p{M}\p{N}\p{Pc}]void)\p{space}+(?![\n\!\%\&\*\+\:\?\^\{\|\~]|[\-\/\<\=\>]=|[\=\>]>|\.[^\.]|-[^\-]|\/[^\>]|(?:in|instanceof|satisfies|as|extends)\p{space}+[^\,\/\:\;\=\>]))/dgv,
              patterns: [
                { include: "source.ts#type" },
                { include: "#javascript-expression" }
              ]
            },
            { include: "#javascript-expression" }
          ]
        },
        {
          begin: /\p{space}*\|/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.scope.begin.marko" }
          },
          contentName: "source.ts",
          end: /\|/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.scope.end.marko" }
          },
          patterns: [
            { include: "source.ts#comment" },
            { include: "source.ts#string" },
            { include: "source.ts#decorator" },
            { include: "source.ts#destructuring-parameter" },
            { include: "source.ts#parameter-name" },
            {
              begin: /(:)/dgv,
              beginCaptures: {
                "1": { name: "keyword.operator.type.annotation.ts" }
              },
              end: /(?=[\,\|])|(?==[^\>])/dgv,
              name: "meta.type.annotation.ts",
              patterns: [
                { include: "source.ts#type" }
              ]
            },
            { include: "source.ts#variable-initializer" },
            {
              match: /,/dgv,
              name: "punctuation.separator.parameter.ts"
            },
            { include: "source.ts" }
          ]
        },
        { include: "#html-args-or-method" },
        { include: "#attr-value" }
      ]
    },
    "tag-html": {
      patterns: [
        {
          begin: /\p{space}*(<)(?=(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr|const|debug|id|let|lifecycle|log|return)[^\-\$0-9\@-Z_a-z])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.marko" }
          },
          end: /\/?>/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.marko" }
          },
          patterns: [
            { include: "#open-tag-content" }
          ]
        },
        {
          begin: /\p{space}*(<)(?=html-comment[^\-\$0-9\@-Z_a-z])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.marko" }
          },
          end: /\/>|(?<=<\/(?:>|html-comment>))/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.marko" }
          },
          patterns: [
            { include: "#open-tag-content" },
            {
              begin: />/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.tag.end.marko" }
              },
              end: /\p{space}*<\/(?:>|html-comment>)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag.begin.marko" },
                "2": {
                  patterns: [
                    { include: "#tag-name" }
                  ]
                },
                "3": { name: "punctuation.definition.tag.end.marko" }
              },
              patterns: [
                { include: "#content-embedded-comment" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*(<)(?=style\P{space}*\.less\b)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.marko" }
          },
          end: /\/>|(?<=<\/>)|(?<=<\/style>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.marko" }
          },
          patterns: [
            { include: "#open-tag-content" },
            {
              begin: />/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.tag.end.marko" }
              },
              contentName: "source.less",
              end: /\p{space}*(<\/)(style)?(>)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag.begin.marko" },
                "2": {
                  patterns: [
                    { include: "#tag-name" }
                  ]
                },
                "3": { name: "punctuation.definition.tag.end.marko" }
              },
              patterns: [
                { include: "#content-embedded-style-less" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*(<)(?=style\P{space}*\.scss\b)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.marko" }
          },
          end: /\/>|(?<=<\/>)|(?<=<\/style>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.marko" }
          },
          patterns: [
            { include: "#open-tag-content" },
            {
              begin: />/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.tag.end.marko" }
              },
              contentName: "source.scss",
              end: /\p{space}*(<\/)(style)?(>)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag.begin.marko" },
                "2": {
                  patterns: [
                    { include: "#tag-name" }
                  ]
                },
                "3": { name: "punctuation.definition.tag.end.marko" }
              },
              patterns: [
                { include: "#content-embedded-style-scss" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*(<)(?=style\P{space}*\.[jt]s\b)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.marko" }
          },
          end: /\/>|(?<=<\/>)|(?<=<\/style>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.marko" }
          },
          patterns: [
            { include: "#open-tag-content" },
            {
              begin: />/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.tag.end.marko" }
              },
              contentName: "source.ts",
              end: /\p{space}*(<\/)((?:html-)?style)?(>)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag.begin.marko" },
                "2": {
                  patterns: [
                    { include: "#tag-name" }
                  ]
                },
                "3": { name: "punctuation.definition.tag.end.marko" }
              },
              patterns: [
                { include: "#content-embedded-script" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*(<)(?=((?:html-)?style)[^\-\$0-9\@-Z_a-z])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.marko" }
          },
          end: /\/>|(?<=<\/>)|(?<=<\/2>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.marko" }
          },
          patterns: [
            { include: "#open-tag-content" },
            {
              begin: />/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.tag.end.marko" }
              },
              contentName: "source.css",
              end: /\p{space}*(<\/)((?:html-)?style)?(>)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag.begin.marko" },
                "2": {
                  patterns: [
                    { include: "#tag-name" }
                  ]
                },
                "3": { name: "punctuation.definition.tag.end.marko" }
              },
              patterns: [
                { include: "#content-embedded-style" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*(<)(?=((?:html-)?script)[^\-\$0-9\@-Z_a-z])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.marko" }
          },
          end: /\/>|(?<=<\/>)|(?<=<\/2>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.marko" }
          },
          patterns: [
            { include: "#open-tag-content" },
            {
              begin: />/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.tag.end.marko" }
              },
              contentName: "source.ts",
              end: /\p{space}*(<\/)((?:html-)?script)?(>)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag.begin.marko" },
                "2": {
                  patterns: [
                    { include: "#tag-name" }
                  ]
                },
                "3": { name: "punctuation.definition.tag.end.marko" }
              },
              patterns: [
                { include: "#content-embedded-script" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*(<)(?=[\#\$\.]|([\-\$0-9\@-Z_a-z]+))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.marko" }
          },
          end: /\/>|(?<=<\/>)|(?<=<\/2>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.end.marko" }
          },
          patterns: [
            { include: "#open-tag-content" },
            {
              begin: />/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.tag.end.marko" }
              },
              end: /\p{space}*(<\/)([\-\#\$\.0-\:\@-Z_a-z]+)?([^\>]*)(>)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag.begin.marko" },
                "2": {
                  patterns: [
                    { include: "#tag-name" },
                    { include: "#tag-shorthand-class-or-id" }
                  ]
                },
                "3": {
                  patterns: [
                    { include: "#invalid" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.end.marko" }
              },
              patterns: [
                { include: "#content-html-mode" }
              ]
            }
          ]
        }
      ]
    },
    "tag-name": {
      patterns: [
        {
          applyEndPatternLast: 1,
          begin: {
            G: [/￿(style)\b(\.[\-\$0-9A-Z_a-z]+(?:\.[\-\$0-9A-Z_a-z]+)*)|([0-9\@-Z_a-z](?:[\-0-9\@-Z_a-z]|:(?!=))*)/dgv, new EmulatedRegExp("^(style)\\b(\\.[\\-\\$0-9A-Z_a-z]+(?:\\.[\\-\\$0-9A-Z_a-z]+)*)|([0-9\\@-Z_a-z](?:[\\-0-9\\@-Z_a-z]|:(?!=))*)", "dgv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "support.type.builtin.marko" },
            "2": { name: "storage.type.marko.css" },
            "3": {
              patterns: [
                {
                  match: /(script|style|html-script|html-style|html-comment)(?![\-\$0-9\@-Z_a-z])/dgv,
                  name: "support.type.builtin.marko"
                },
                {
                  match: /(for|if|while|else-if|else|try|await|return)(?![\-\$0-9\@-Z_a-z])/dgv,
                  name: "keyword.control.flow.marko"
                },
                {
                  match: /(const|context|debug|define|id|let|log|lifecycle)(?![\-\$0-9\@-Z_a-z])/dgv,
                  name: "support.function.marko"
                },
                {
                  match: /@[^\n]+/dgv,
                  name: "entity.other.attribute-name.marko"
                },
                {
                  match: /[^\n]+/dgv,
                  name: "entity.name.tag.marko"
                }
              ]
            }
          },
          end: /(?=[^\n])/dgv,
          patterns: [
            { include: "#tag-type-args" }
          ]
        },
        {
          begin: /(?=[\$0-9A-Z_a-z]|-[^\-])/dgv,
          end: /(?=[^\-\$0-9A-Z_a-z]|(?=\n?$))/dgv,
          patterns: [
            { include: "#javascript-placeholder" },
            {
              match: /(?:[\-0-9A-Z_a-z]|\$(?!\{))+/dgv,
              name: "entity.name.tag.marko"
            }
          ]
        }
      ]
    },
    "tag-shorthand-class-or-id": {
      begin: /(?=[\#\.])/dgv,
      end: /(?=\n?$)|(?=--|[^\-\#\$\.0-9A-Z_a-z])/dgv,
      patterns: [
        { include: "#javascript-placeholder" },
        {
          match: /(?:[\-\#\.0-9A-Z_a-z]|\$(?!\{))+/dgv,
          name: "entity.other.attribute-name.marko"
        }
      ]
    },
    "tag-type-args": {
      applyEndPatternLast: 1,
      begin: /(?=<)/dgv,
      contentName: "source.ts",
      end: /(?<=>)/dgv,
      name: "meta.embedded.ts",
      patterns: [
        {
          applyEndPatternLast: 1,
          begin: /(?<=>)(?=[\t ]*<)/dgv,
          end: /(?=[^\n])/dgv,
          patterns: [
            { include: "#tag-type-params" }
          ]
        },
        { include: "source.ts#type-arguments" }
      ]
    },
    "tag-type-params": {
      applyEndPatternLast: 1,
      begin: /(?!^)[\t ]*(?=<)/dgv,
      contentName: "source.ts",
      end: /(?<=>)/dgv,
      name: "meta.embedded.ts",
      patterns: [
        { include: "source.ts#type-parameters" }
      ]
    }
  },
  dependencies: [
    "css",
    "less",
    "scss",
    "typescript"
  ]
};
