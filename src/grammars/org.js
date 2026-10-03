import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "org",
  displayName: "Org Markup",
  scopeName: "source.org",
  patterns: [
    {
      begin: /^\p{space}*\*{1}\p{space}+/dgv,
      end: /(?=\n?$)/dgv,
      name: "markup.heading.org",
      patterns: [
        { include: "#header-matches" }
      ]
    },
    {
      begin: /^\p{space}*\*{2}\p{space}+/dgv,
      end: /(?=\n?$)/dgv,
      name: "entity.name.type.org",
      patterns: [
        { include: "#header-matches" }
      ]
    },
    {
      begin: /^\p{space}*\*{3}\p{space}+/dgv,
      end: /(?=\n?$)/dgv,
      name: "entity.name.function.org",
      patterns: [
        { include: "#header-matches" }
      ]
    },
    {
      begin: /^\p{space}*\*{4}\p{space}+/dgv,
      end: /(?=\n?$)/dgv,
      name: "entity.other.attribute-name.org",
      patterns: [
        { include: "#header-matches" }
      ]
    },
    { include: "#common" },
    { include: "#src-blocks" },
    { include: "#blocks" }
  ],
  repository: {
    blocks: {
      patterns: [
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_([\p{L}\p{M}\p{N}\p{Pc}]+))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_([\\p{L}\\p{M}\\p{N}\\p{Pc}]+))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_2)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_2)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.${2:/downcase}",
          patterns: [
            { include: "#common" }
          ]
        }
      ]
    },
    bold: {
      patterns: [
        {
          match: /(^|\p{space})\*\P{space}([^\n]*?\P{space})?\*((?=\n?$)|[^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "markup.bold.org"
        }
      ]
    },
    code: {
      patterns: [
        {
          match: /(^|\p{space})~\P{space}([^\n]*?\P{space})?~((?=\n?$)|[^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "variable.org"
        }
      ]
    },
    comment: {
      patterns: [
        {
          captures: {
            "2": { name: "punctuation.definition.comment" },
            "3": { name: "comment.line" }
          },
          match: /(^|\p{space})(#)\p{space}([^\n]*)(?=\n?$)/dgv
        }
      ]
    },
    common: {
      patterns: [
        { include: "#timestamp" },
        { include: "#link" },
        { include: "#bold" },
        { include: "#italic" },
        { include: "#underline" },
        { include: "#literal" },
        { include: "#code" },
        { include: "#verbatim" },
        { include: "#comment" },
        { include: "#keywords" }
      ]
    },
    done: {
      patterns: [
        {
          match: /\bDONE\b/dgv,
          name: "keyword.control.org"
        }
      ]
    },
    "header-matches": {
      patterns: [
        { include: "#common" },
        { include: "#todo" },
        { include: "#done" },
        { include: "#userKeywords" }
      ]
    },
    italic: {
      patterns: [
        {
          match: /(^|\p{space})\/\P{space}([^\n]*?\P{space})?\/((?=\n?$)|[^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "markup.italic.org"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          captures: {
            "1": { name: "support.type.property-name.org" },
            "2": { name: "meta.structure.dictionary.value.org" }
          },
          match: /^(#\+[\p{L}\p{M}\p{N}\p{Pc}]+:)\p{space}([^\n]*)(?=\n?$)/dgv
        }
      ]
    },
    link: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.string.begin.org" },
            "2": { name: "markup.underline.link.org" },
            "3": { name: "punctuation.definition.string.end.org" },
            "4": { name: "punctuation.definition.string.begin.org" },
            "5": { name: "string.other.link.title.org" },
            "6": { name: "punctuation.definition.string.end.org" },
            "7": { name: "punctuation.definition.string.end.org" },
            "8": { name: "punctuation.definition.string.end.org" }
          },
          match: /(\[\[)([^\]\[]+)(\])(?:(\[)([^\]\[]+)(\]))?(\])/dgv,
          name: "meta.link.inline.org"
        }
      ]
    },
    literal: {
      patterns: [
        {
          match: /^:[^\n]+/dgv,
          name: "markup.italic.org"
        }
      ]
    },
    "src-blocks": {
      patterns: [
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(js|javascript|mjs|es6|jsx)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(js|javascript|mjs|es6|jsx)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.js.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.js",
              patterns: [
                { include: "source.js" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+((?:js[^\n]|)regexp)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+((?:js[^\\n]|)regexp)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.js.regexp.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.js.regexp",
              patterns: [
                { include: "source.js.regexp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(t(?:s|ypescript))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(t(?:s|ypescript))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.ts.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ts",
              patterns: [
                { include: "source.ts" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(tsx)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(tsx)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.tsx.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.tsx",
              patterns: [
                { include: "source.tsx" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(java)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(java)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.java.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.java",
              patterns: [
                { include: "source.java" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.python.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.python",
              patterns: [
                { include: "source.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(re(?:gexp[^\n]python|))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(re(?:gexp[^\\n]python|))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.regexp.python.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.regexp.python",
              patterns: [
                { include: "source.regexp.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(css)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(css)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.css.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.css",
              patterns: [
                { include: "source.css" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(lua)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(lua)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.lua.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.lua",
              patterns: [
                { include: "source.lua" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(ini|conf|properties)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(ini|conf|properties)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.ini.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ini",
              patterns: [
                { include: "source.ini" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+((?:mak|Mal)efile)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+((?:mak|Mal)efile)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.makefile.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.makefile",
              patterns: [
                { include: "source.makefile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(p(?:erl|[lm]))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(p(?:erl|[lm]))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.perl.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl",
              patterns: [
                { include: "source.perl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+([RSrs]|Rprofile)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+([RSrs]|Rprofile)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.r.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.r",
              patterns: [
                { include: "source.r" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile[^\n]lock|Thorfile|Puppetfile)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile[^\\n]lock|Thorfile|Puppetfile)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.ruby.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ruby",
              patterns: [
                { include: "source.ruby" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(php3??|php4|php5|phpt|phtml|aw|ctp)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(php3??|php4|php5|phpt|phtml|aw|ctp)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.php.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.php",
              patterns: [
                { include: "source.php" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(sql|ddl|dml)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(sql|ddl|dml)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.sql.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.sql",
              patterns: [
                { include: "source.sql" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(asp[^\n]vb[^\n]net|vb)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(asp[^\\n]vb[^\\n]net|vb)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.asp.vb.net.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.asp.vb.net",
              patterns: [
                { include: "source.asp.vb.net" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(dosbatch|batch|bat)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(dosbatch|batch|bat)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.dosbatch.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dosbatch",
              patterns: [
                { include: "source.dosbatch" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(cl(?:ojure|js??))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(cl(?:ojure|js??))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.clojure.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.clojure",
              patterns: [
                { include: "source.clojure" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(coffee|Cakefile|coffe[^\n]erb)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(coffee|Cakefile|coffe[^\\n]erb)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.coffee.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.coffee",
              patterns: [
                { include: "source.coffee" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+([ch])\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+([ch])\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.c.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.c",
              patterns: [
                { include: "source.c" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(c(?:pp|\+\+|xx))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(c(?:pp|\\+\\+|xx))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.cpp.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cpp",
              patterns: [
                { include: "source.cpp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(objc|objectivec|objective-c|mm?|obj-c)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(objc|objectivec|objective-c|mm?|obj-c)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.objc.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.objc",
              patterns: [
                { include: "source.objc" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(diff|patch|rej)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(diff|patch|rej)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.diff.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.diff",
              patterns: [
                { include: "source.diff" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+([Dd]ockerfile)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+([Dd]ockerfile)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.dockerfile.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dockerfile",
              patterns: [
                { include: "source.dockerfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(go(?:|lang))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(go(?:|lang))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.go.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.go",
              patterns: [
                { include: "source.go" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(g(?:roovy|vy))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(g(?:roovy|vy))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.groovy.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.groovy",
              patterns: [
                { include: "source.groovy" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+((?:|emacs-|common-)lisp)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+((?:|emacs-|common-)lisp)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.lisp.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.lisp",
              patterns: [
                { include: "source.lisp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(pug|jade)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(pug|jade)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.pug.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.pug",
              patterns: [
                { include: "source.pug" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+((?:css[^\n]|)less)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+((?:css[^\\n]|)less)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.css.less.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.css.less",
              patterns: [
                { include: "source.css.less" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+((?:css[^\n]|)scss)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+((?:css[^\\n]|)scss)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.css.scss.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.css.scss",
              patterns: [
                { include: "source.css.scss" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(perl[^\n]6|perl6|p6|pl6|pm6|nqp)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(perl[^\\n]6|perl6|p6|pl6|pm6|nqp)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.perl.6.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl.6",
              patterns: [
                { include: "source.perl.6" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(r(?:ust|s))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(r(?:ust|s))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.rust.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.rust",
              patterns: [
                { include: "source.rust" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(s(?:cala|bt))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(s(?:cala|bt))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.scala.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scala",
              patterns: [
                { include: "source.scala" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(shell|sh|bash|zsh|bashrc|bash_profile)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(shell|sh|bash|zsh|bashrc|bash_profile)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.shell.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.shell",
              patterns: [
                { include: "source.shell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(c(?:s|sharp|#))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(c(?:s|sharp|#))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.cs.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cs",
              patterns: [
                { include: "source.cs" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(f(?:s|sharp|#))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(f(?:s|sharp|#))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.fs.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.fs",
              patterns: [
                { include: "source.fs" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(dart)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(dart)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.dart.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dart",
              patterns: [
                { include: "source.dart" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(nim)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(nim)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.nim.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.nim",
              patterns: [
                { include: "source.nim" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(elixir)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(elixir)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.elixir.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.elixir",
              patterns: [
                { include: "source.elixir" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(erlang|erl|grl)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(erlang|erl|grl)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.erlang.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.erlang",
              patterns: [
                { include: "source.erlang" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(ocaml)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(ocaml)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.ocaml.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ocaml",
              patterns: [
                { include: "source.ocaml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(zig)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(zig)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.zig.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.zig",
              patterns: [
                { include: "source.zig" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(ya?ml)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(ya?ml)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.yaml.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.yaml",
              patterns: [
                { include: "source.yaml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(json)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(json)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.json.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.json",
              patterns: [
                { include: "source.json" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.xml.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xml",
              patterns: [
                { include: "text.xml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(xslt??)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(xslt??)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.xsl.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xsl",
              patterns: [
                { include: "text.xml.xsl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(m(?:arkdown|d))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(m(?:arkdown|d))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.markdown.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.markdown",
              patterns: [
                { include: "text.html.markdown" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(org(?:mode|))\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(org(?:mode|))\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.orgmode.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.orgmode",
              patterns: [
                { include: "source.org" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(html?|shtml|xhtml|inc|tmpl|tpl)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(html?|shtml|xhtml|inc|tmpl|tpl)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.html.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.html",
              patterns: [
                { include: "text.html.basic" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+((?:COMMIT_EDIT|MERGE_)MSG)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+((?:COMMIT_EDIT|MERGE_)MSG)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.COMMIT_EDITMSG.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.COMMIT_EDITMSG",
              patterns: [
                { include: "text.git-commit" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+(git-rebase-todo)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+(git-rebase-todo)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.git-rebase-todo.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-rebase-todo",
              patterns: [
                { include: "text.git-rebase" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+((?:la|)tex)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+((?:la|)tex)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.latex.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.latex",
              patterns: [
                { include: "text.tex.latex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(?:^|￿)\p{space}*(#\+BEGIN_SRC)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b\p{space}*([^\n]*)(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+BEGIN_SRC)\\p{space}+([\\p{L}\\p{M}\\p{N}\\p{Pc}]+)\\b\\p{space}*([^\\n]*)(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "1": { name: "keyword.control.block.org" },
            "2": { name: "constant.other.language.org" },
            "3": { name: "string.other.header-args.org" }
          },
          end: {
            G: [/(?:^|￿)\p{space}*(#\+END_SRC)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(#\\+END_SRC)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "keyword.control.block.org" }
          },
          name: "meta.block.source.unknown.org",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.unknown",
              while: {
                G: [/(^|￿)(?!\p{space}*#\+END_SRC\p{space}*)/dgiv, new EmulatedRegExp("(^|^)(?!\\p{space}*#\\+END_SRC\\p{space}*)", "dgiv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    timestamp: {
      patterns: [
        {
          match: /\[\p{Nd}{4}-\p{Nd}{1,2}-\p{Nd}{1,2}(?: [\p{L}\p{M}\p{N}\p{Pc}]{3})?\]/dgv,
          name: "variable.org"
        }
      ]
    },
    todo: {
      patterns: [
        {
          match: /\bTODO\b/dgv,
          name: "invalid.illegal.org"
        }
      ]
    },
    underline: {
      patterns: [
        {
          match: /(^|\p{space})_\P{space}([^\n]*?\P{space})?_((?=\n?$)|[^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "markup.underline.org"
        }
      ]
    },
    userKeywords: {
      patterns: [
        {
          match: /\b([A-Z]{3,})\b/dgv,
          name: "string.quoted.double.org"
        }
      ]
    },
    verbatim: {
      patterns: [
        {
          match: /(^|\p{space})=\P{space}([^\n]*?\P{space})?=((?=\n?$)|[^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "variable.org"
        }
      ]
    }
  },
  dependencies: [
    "javascript",
    "typescript",
    "tsx",
    "java",
    "python",
    "regexp",
    "css",
    "lua",
    "ini",
    "make",
    "perl",
    "r",
    "ruby",
    "php",
    "sql",
    "vb",
    "clojure",
    "coffee",
    "c",
    "cpp",
    "objective-c",
    "diff",
    "docker",
    "go",
    "groovy",
    "less",
    "scss",
    "raku",
    "rust",
    "scala",
    "shellscript",
    "csharp",
    "dart",
    "nim",
    "elixir",
    "erlang",
    "ocaml",
    "zig",
    "yaml",
    "json",
    "xml",
    "xsl",
    "markdown",
    "html",
    "git-commit",
    "git-rebase",
    "latex"
  ]
};
