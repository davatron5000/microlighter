import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "latex",
  displayName: "LaTeX",
  scopeName: "text.tex.latex",
  patterns: [
    {
      match: /(?<=\\(?:[\@\p{L}\p{M}\p{N}\p{Pc}]|[\@\p{L}\p{M}\p{N}\p{Pc}]{2}|[\@\p{L}\p{M}\p{N}\p{Pc}]{3}|[\@\p{L}\p{M}\p{N}\p{Pc}]{4}|[\@\p{L}\p{M}\p{N}\p{Pc}]{5}|[\@\p{L}\p{M}\p{N}\p{Pc}]{6}))\p{space}/dgv,
      name: "meta.space-after-command.latex"
    },
    { include: "#songs-env" },
    { include: "#embedded-code-env" },
    { include: "#verbatim-env" },
    { include: "#document-env" },
    { include: "#all-balanced-env" },
    { include: "#documentclass-usepackage-macro" },
    { include: "#input-macro" },
    { include: "#sections-macro" },
    { include: "#hyperref-macro" },
    { include: "#newcommand-macro" },
    { include: "#text-font-macro" },
    { include: "#citation-macro" },
    { include: "#references-macro" },
    { include: "#label-macro" },
    { include: "#verb-macro" },
    { include: "#inline-code-macro" },
    { include: "#all-other-macro" },
    { include: "#display-math" },
    { include: "#inline-math" },
    { include: "#column-specials" },
    { include: "text.tex" }
  ],
  repository: {
    "all-balanced-env": {
      patterns: [
        {
          begin: /\p{space}*((\\)begin)(\{)((?:\+?array|equation|(?:IEEE|sub)?eqnarray|multline|align|aligned|alignat|alignedat|flalign|flaligned|flalignat|split|gather|gathered|(?:[\+dr]|dr)?cases|(?:display)?math|\+?[A-Za-z]*matrix|[BVbpv]?NiceMatrix|[BVbpv]?NiceArray|(?:arg)?m(?:ini|axi))[\!\*]?)(\})(\p{space}*\n)?/dgv,
          captures: {
            "1": { name: "support.function.be.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.arguments.begin.latex" },
            "4": { name: "variable.parameter.function.latex" },
            "5": { name: "punctuation.definition.arguments.end.latex" }
          },
          contentName: "meta.math.block.latex support.class.math.block.environment.latex",
          end: /\p{space}*((\\)end)(\{)(4)(\})(?:\p{space}*\n)?/dgv,
          name: "meta.function.environment.math.latex",
          patterns: [
            {
              match: /(?<!\\)&/dgv,
              name: "keyword.control.equation.align.latex"
            },
            {
              match: /\\\\/dgv,
              name: "keyword.control.equation.newline.latex"
            },
            { include: "#label-macro" },
            { include: "text.tex#math-content" },
            { include: "$self" }
          ]
        },
        {
          begin: /\p{space}*(\\begin\{empheq\}(?:\[[^\n]*\])?)/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "meta.math.block.latex support.class.math.block.environment.latex",
          end: /\p{space}*(\\end\{empheq\})/dgv,
          name: "meta.function.environment.math.latex",
          patterns: [
            {
              match: /(?<!\\)&/dgv,
              name: "keyword.control.equation.align.latex"
            },
            {
              match: /\\\\/dgv,
              name: "keyword.control.equation.newline.latex"
            },
            { include: "#label-macro" },
            { include: "text.tex#math-content" },
            { include: "$self" }
          ]
        },
        {
          begin: /(\p{space}*\\begin\{(tabular[\*xy]?|xltabular|longtable|(?:long)?tabu|(?:long|tall)?tblr|NiceTabular[\*X]?|booktabs)\}(\p{space}*\n)?)/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "meta.data.environment.tabular.latex",
          end: /(\p{space}*\\end\{(2)\}(?:\p{space}*\n)?)/dgv,
          name: "meta.function.environment.tabular.latex",
          patterns: [
            {
              match: /(?<!\\)&/dgv,
              name: "keyword.control.table.cell.latex"
            },
            {
              match: /\\\\/dgv,
              name: "keyword.control.table.newline.latex"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /(\p{space}*\\begin\{(itemize|enumerate|description|list)\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /(\\end\{2\}(?:\p{space}*\n)?)/dgv,
          name: "meta.function.environment.list.latex",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(\p{space}*\\begin\{tikzpicture\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /(\\end\{tikzpicture\}(?:\p{space}*\n)?)/dgv,
          name: "meta.function.environment.latex.tikz",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(\p{space}*\\begin\{frame\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /(\\end\{frame\})/dgv,
          name: "meta.function.environment.frame.latex",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(\p{space}*\\begin\{(mpost\*?)\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /(\\end\{2\}(?:\p{space}*\n)?)/dgv,
          name: "meta.function.environment.latex.mpost"
        },
        {
          begin: /(\p{space}*\\begin\{markdown\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "meta.embedded.markdown_latex_combined",
          end: /(\\end\{markdown\})/dgv,
          patterns: [
            { include: "text.tex.markdown_latex_combined" }
          ]
        },
        {
          begin: /(\p{space}*\\begin\{(\p{Alphabetic}+\*?)\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /(\\end\{2\}(?:\p{space}*\n)?)/dgv,
          name: "meta.function.environment.general.latex",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "all-other-macro": {
      patterns: [
        {
          match: /\\(?:newline|pagebreak|clearpage|linebreak|pause)\b/dgv,
          name: "keyword.control.layout.latex"
        },
        {
          begin: /((\\)marginpar)((?:\[[^\[]*?\])*)(\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.marginpar.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": {
              patterns: [
                { include: "#optional-arg-bracket" }
              ]
            },
            "4": { name: "punctuation.definition.marginpar.begin.latex" }
          },
          contentName: "meta.paragraph.margin.latex",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.marginpar.end.latex" }
          },
          patterns: [
            { include: "#braces" },
            { include: "$self" }
          ]
        },
        {
          begin: /((\\)footnote)((?:\[[^\[]*?\])*)(\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.footnote.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": {
              patterns: [
                { include: "#optional-arg-bracket" }
              ]
            },
            "4": { name: "punctuation.definition.footnote.begin.latex" }
          },
          contentName: "entity.name.footnote.latex",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.footnote.end.latex" }
          },
          patterns: [
            { include: "#braces" },
            { include: "$self" }
          ]
        },
        {
          captures: {
            "0": { name: "keyword.other.item.latex" },
            "1": { name: "punctuation.definition.keyword.latex" }
          },
          match: /(\\)item\b/dgv,
          name: "meta.scope.item.latex"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.constant.latex" }
          },
          match: /(\\)(text(s(terling|ixoldstyle|urd|e(ction|venoldstyle|rvicemark))|yen|n(ineoldstyle|umero|aira)|c(ircledP|o(py(left|right)|lonmonetary)|urrency|e(nt(oldstyle)?|lsius))|t(hree(superior|oldstyle|quarters(emdash)?)|i(ldelow|mes)|w(o(superior|oldstyle)|elveudash)|rademark)|interrobang(down)?|zerooldstyle|o(hm|ne(superior|half|oldstyle|quarter)|penbullet|rd((?:femin|mascul)ine))|d(i(scount|ed|v(orced)?)|o(ng|wnarrow|llar(oldstyle)?)|egree|agger(dbl)?|blhyphen(char)?)|uparrow|p(ilcrow|e(so|r(t((?:|ent)housand)|iodcentered))|aragraph|m)|e(stimated|ightoldstyle|uro)|quotes(traight((?:dbl|)base)|ingle)|f(iveoldstyle|ouroldstyle|lorin|ractionsolidus)|won|l(not|ira|e(ftarrow|af)|quill|angle|brackdbl)|a(s(cii(caron|dieresis|acute|grave|macron|breve)|teriskcentered)|cutedbl)|r(ightarrow|e(cipe|ferencemark|gistered)|quill|angle|brackdbl)|g(uarani|ravedbl)|m(ho|inus|u(sicalnote)?|arried)|b(igcircle|orn|ullet|lank|a(ht|rdbl)|rokenbar)))\b/dgv,
          name: "constant.character.latex"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.latex" }
          },
          match: /(\\)(?:[cgl]_+[\@_\p{Alphabetic}]+_[a-z]+|[qs]_[\@_\p{Alphabetic}]+[\@\p{Alphabetic}])/dgv,
          name: "variable.other.latex3.latex"
        }
      ]
    },
    "autocites-arg": {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "#optional-arg-parenthesis-no-highlight" }
              ]
            },
            "2": {
              patterns: [
                { include: "#optional-arg-bracket-no-highlight" }
              ]
            },
            "3": { name: "punctuation.definition.arguments.begin.latex" },
            "4": { name: "constant.other.reference.citation.latex" },
            "5": { name: "punctuation.definition.arguments.end.latex" },
            "6": {
              patterns: [
                { include: "#autocites-arg" }
              ]
            }
          },
          match: /((?:\([^\)]*\)){0,2})((?:\[[^\]]*\]){0,2})(\{)([\-\.\:_\p{Alphabetic}\p{N}]+)(\})([^\n]*)/dgv
        }
      ]
    },
    braces: {
      begin: /(?<!\\)\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.group.begin.latex" }
      },
      end: /(?<!\\)\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.group.end.latex" }
      },
      name: "meta.group.braces.latex",
      patterns: [
        { include: "#text-font-macro" },
        { include: "#citation-macro" },
        { include: "#references-macro" },
        { include: "#label-macro" },
        { include: "#macro-with-args-tokenizer" },
        { include: "#all-other-macro" },
        { include: "text.tex" },
        { include: "#braces" }
      ]
    },
    "citation-macro": {
      begin: /((\\)(?:[Aa]uto|foot|full|footfull|no|ref|short|[Tt]ext|[Pp]aren|[Ss]mart|[FPfp]vol|vol)?[Cc]ite(?:al)?(?:[pst]|author|year(?:par)?|title|url|date)?[ANP]*\*?)((?:(?:\([^\)]*\)){0,2}(?:\[[^\]]*\]){0,2}\{[\-\.\:_\p{Alphabetic}\p{N}]*\})*)(<[^\]\<\>]*>)?((?:\[[^\]]*\])*)(\{)/dgv,
      captures: {
        "1": { name: "keyword.control.cite.latex" },
        "2": { name: "punctuation.definition.keyword.latex" },
        "3": {
          patterns: [
            { include: "#autocites-arg" }
          ]
        },
        "4": {
          patterns: [
            { include: "#optional-arg-angle-no-highlight" }
          ]
        },
        "5": {
          patterns: [
            { include: "#optional-arg-bracket-no-highlight" }
          ]
        },
        "6": { name: "punctuation.definition.arguments.begin.latex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.latex" }
      },
      name: "meta.citation.latex",
      patterns: [
        {
          captures: {
            "1": { name: "comment.line.percentage.tex" },
            "2": { name: "punctuation.definition.comment.tex" }
          },
          match: /((%)[^\n]*)(?=\n?$)/dgv
        },
        {
          match: /[\-\.\:\p{Alphabetic}\p{N}]+/dgv,
          name: "constant.other.reference.citation.latex"
        }
      ]
    },
    "column-specials": {
      captures: {
        "1": { name: "punctuation.definition.column-specials.begin.latex" },
        "2": { name: "punctuation.definition.column-specials.end.latex" }
      },
      match: /[\<\>](\{)\$(\})/dgv,
      name: "meta.column-specials.latex"
    },
    "display-math": {
      patterns: [
        {
          begin: /\\\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.latex" }
          },
          end: /\\\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.latex" }
          },
          name: "meta.math.block.latex support.class.math.block.environment.latex",
          patterns: [
            { include: "text.tex#math-content" },
            { include: "$self" }
          ]
        },
        {
          begin: /\$\$/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.latex" }
          },
          end: /\$\$/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.latex" }
          },
          name: "meta.math.block.latex support.class.math.block.environment.latex",
          patterns: [
            {
              match: /\\\$/dgv,
              name: "constant.character.escape.latex"
            },
            { include: "text.tex#math-content" },
            { include: "$self" }
          ]
        }
      ]
    },
    "document-env": {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          match: /(\p{space}*\\begin\{document\})/dgv,
          name: "meta.function.begin-document.latex"
        },
        {
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          match: /(\p{space}*\\end\{document\})/dgv,
          name: "meta.function.end-document.latex"
        }
      ]
    },
    "documentclass-usepackage-macro": {
      begin: /((\\)(?:usepackage|documentclass))\b(?=[\[\{])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.preamble.latex" },
        "2": { name: "punctuation.definition.function.latex" }
      },
      end: /(?<=\})/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.latex" }
      },
      name: "meta.preamble.latex",
      patterns: [
        { include: "#multiline-optional-arg" },
        {
          begin: {
            G: [/((?:￿|(?<=\]))\{)/dgv, new EmulatedRegExp("((?:^|(?<=\\]))\\{)", "dgv", { strategy: "clip_search" })]
          },
          beginCaptures: {
            "0": { name: "punctuation.definition.arguments.begin.latex" }
          },
          contentName: "support.class.latex",
          end: /(\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.latex" }
          },
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "embedded-code-env": {
      patterns: [
        {
          begin: /(?:^\p{space}*)?\\begin\{(lstlisting|minted|pyglist)\}(?=[\[\{])/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\\end\{1\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(asy(?:|mptote))(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(asy(?:|mptote))(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.asy",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.asy" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(bash)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(bash)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.shell",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.shell" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(c(?:|pp))(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(c(?:|pp))(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.cpp.embedded.latex",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.cpp.embedded.latex" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(css)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(css)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.css",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.css" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(gnuplot)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(gnuplot)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.gnuplot",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.gnuplot" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(h(?:s|askell))(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(h(?:s|askell))(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.haskell",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.haskell" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(html)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(html)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "text.html",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "text.html.basic" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(java)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(java)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.java",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.java" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(j(?:l|ulia))(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(j(?:l|ulia))(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.julia",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.julia" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(j(?:s|avascript))(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(j(?:s|avascript))(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.js",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.js" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(lua)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(lua)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.lua",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.lua" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(py|python|sage)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(py|python|sage)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.python",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.python" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(r(?:b|uby))(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(r(?:b|uby))(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.ruby",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.ruby" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(rust)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(rust)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.rust",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.rust" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(t(?:s|ypescript))(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(t(?:s|ypescript))(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.ts",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.ts" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(xml)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(xml)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "text.xml",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "text.xml" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)(yaml)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)(yaml)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "source.yaml",
              end: /^\p{space}*(?=\\end\{(?:minted|lstlisting|pyglist)\})/dgv,
              patterns: [
                { include: "source.yaml" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(?:(\{)([A-Za-z]*)(\}))?/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(?:(\\{)([A-Za-z]*)(\\}))?", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "meta.function.embedded.latex",
              end: /^\p{space}*(?=\\end\{(?:lstlisting|minted|pyglist)\})/dgv,
              name: "meta.embedded.block.generic.latex"
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{asy(?:|code)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{asy(?:|code)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.asymptote",
              end: /^\p{space}*(?=\\end\{asy(?:|code)\*?\})/dgv,
              patterns: [
                { include: "source.asymptote" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{cppcode\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{cppcode\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.cpp.embedded.latex",
              end: /^\p{space}*(?=\\end\{cppcode\*?\})/dgv,
              patterns: [
                { include: "source.cpp.embedded.latex" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{dot(?:2tex|code)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{dot(?:2tex|code)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.dot",
              end: /^\p{space}*(?=\\end\{dot(?:2tex|code)\*?\})/dgv,
              patterns: [
                { include: "source.dot" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{gnuplot\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{gnuplot\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.gnuplot",
              end: /^\p{space}*(?=\\end\{gnuplot\*?\})/dgv,
              patterns: [
                { include: "source.gnuplot" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{hscode\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{hscode\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.haskell",
              end: /^\p{space}*(?=\\end\{hscode\*?\})/dgv,
              patterns: [
                { include: "source.haskell" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{java(?:code|verbatim|block|concode|console|converbatim)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{java(?:code|verbatim|block|concode|console|converbatim)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.java",
              end: /^\p{space}*(?=\\end\{java(?:code|verbatim|block|concode|console|converbatim)\*?\})/dgv,
              patterns: [
                { include: "source.java" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{jl(?:code|verbatim|block|concode|console|converbatim)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{jl(?:code|verbatim|block|concode|console|converbatim)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.julia",
              end: /^\p{space}*(?=\\end\{jl(?:code|verbatim|block|concode|console|converbatim)\*?\})/dgv,
              patterns: [
                { include: "source.julia" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{julia(?:code|verbatim|block|concode|console|converbatim)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{julia(?:code|verbatim|block|concode|console|converbatim)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.julia",
              end: /^\p{space}*(?=\\end\{julia(?:code|verbatim|block|concode|console|converbatim)\*?\})/dgv,
              patterns: [
                { include: "source.julia" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{lua(?:code|draw)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{lua(?:code|draw)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.lua",
              end: /^\p{space}*(?=\\end\{lua(?:code|draw)\*?\})/dgv,
              patterns: [
                { include: "source.lua" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{py(?:code|verbatim|block|concode|console|converbatim)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{py(?:code|verbatim|block|concode|console|converbatim)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.python",
              end: /^\p{space}*(?=\\end\{py(?:code|verbatim|block|concode|console|converbatim)\*?\})/dgv,
              patterns: [
                { include: "source.python" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{pylab(?:code|verbatim|block|concode|console|converbatim)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{pylab(?:code|verbatim|block|concode|console|converbatim)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.python",
              end: /^\p{space}*(?=\\end\{pylab(?:code|verbatim|block|concode|console|converbatim)\*?\})/dgv,
              patterns: [
                { include: "source.python" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{(?:sageblock|sagesilent|sageverbatim|sageexample|sagecommandline|pythonq??|pythonrepl)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{(?:sageblock|sagesilent|sageverbatim|sageexample|sagecommandline|pythonq??|pythonrepl)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.python",
              end: /^\p{space}*(?=\\end\{(?:sageblock|sagesilent|sageverbatim|sageexample|sagecommandline|pythonq??|pythonrepl)\*?\})/dgv,
              patterns: [
                { include: "source.python" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{scalacode\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{scalacode\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.scala",
              end: /^\p{space}*(?=\\end\{scalacode\*?\})/dgv,
              patterns: [
                { include: "source.scala" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{sympy(?:code|verbatim|block|concode|console|converbatim)\*?\}(?:\[[\-0-9A-Z_a-z]*\])?(?=[\[\{]|\p{space}*(?=\n?$))/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\p{space}*\\end\{sympy(?:code|verbatim|block|concode|console|converbatim)\*?\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "variable.parameter.function.latex",
              end: /(\})/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.arguments.end.latex" }
              }
            },
            {
              begin: /^(?=\p{space}*)/dgv,
              contentName: "source.python",
              end: /^\p{space}*(?=\\end\{sympy(?:code|verbatim|block|concode|console|converbatim)\*?\})/dgv,
              patterns: [
                { include: "source.python" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\\begin\{((?:[A-Za-z]*code|lstlisting|minted|pyglist)\*?)\}(?:\[[^\n]*\])?(?:\{[^\n]*\})?/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "meta.function.embedded.latex",
          end: /\\end\{1\}(?:\p{space}*\n)?/dgv,
          name: "meta.embedded.block.generic.latex"
        },
        {
          begin: /((?:^\p{space}*)?\\begin\{((?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?))\})(?:\[[^\]]*\]){0,2}(?=\{)/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /(\\end\{2\})/dgv,
          patterns: [
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Aa][Ssſ][Yy](?:|[Mm][Pp][Tt][Oo][Tt][Ee])/dgv, /(\{)(?:__|[a-z\p{space}]*)[Aa][Ssſ][Yy](?:|[Mm][Pp][Tt][Oo][Tt][Ee])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.asy",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.asy" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Bb][Aa][Ssſ][Hh]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Bb][Aa][Ssſ][Hh]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.shell",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.shell" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Cc](?:|[Pp][Pp])/dgv, /(\{)(?:__|[a-z\p{space}]*)[Cc](?:|[Pp][Pp])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.cpp.embedded.latex",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.cpp.embedded.latex" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Cc][Ssſ][Ssſ]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Cc][Ssſ][Ssſ]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.css",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.css" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Gg][Nn][Uu][Pp][Ll][Oo][Tt]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Gg][Nn][Uu][Pp][Ll][Oo][Tt]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.gnuplot",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.gnuplot" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Hh](?:[Ssſ]|[Aa][Ssſ][KKk][Ee][Ll][Ll])/dgv, /(\{)(?:__|[a-z\p{space}]*)[Hh](?:[Ssſ]|[Aa][Ssſ][KKk][Ee][Ll][Ll])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.haskell",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.haskell" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Hh][Tt][Mm][Ll]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Hh][Tt][Mm][Ll]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "text.html",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "text.html.basic" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Jj][Aa][Vv][Aa]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Jj][Aa][Vv][Aa]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.java",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.java" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Jj](?:[Ll]|[Uu][Ll][Ii][Aa])/dgv, /(\{)(?:__|[a-z\p{space}]*)[Jj](?:[Ll]|[Uu][Ll][Ii][Aa])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.julia",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.julia" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Jj](?:[Ssſ]|[Aa][Vv][Aa][Ssſ][Cc][Rr][Ii][Pp][Tt])/dgv, /(\{)(?:__|[a-z\p{space}]*)[Jj](?:[Ssſ]|[Aa][Vv][Aa][Ssſ][Cc][Rr][Ii][Pp][Tt])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.js",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.js" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Ll][Uu][Aa]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Ll][Uu][Aa]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.lua",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.lua" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)(?:[Pp][Yy]|[Pp][Yy][Tt][Hh][Oo][Nn]|[Ssſ][Aa][Gg][Ee])/dgv, /(\{)(?:__|[a-z\p{space}]*)(?:[Pp][Yy]|[Pp][Yy][Tt][Hh][Oo][Nn]|[Ssſ][Aa][Gg][Ee])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.python",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.python" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Rr](?:[Bb]|[Uu][Bb][Yy])/dgv, /(\{)(?:__|[a-z\p{space}]*)[Rr](?:[Bb]|[Uu][Bb][Yy])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.ruby",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.ruby" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Rr][Uu][Ssſ][Tt]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Rr][Uu][Ssſ][Tt]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.rust",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.rust" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Tt](?:[Ssſ]|[Yy][Pp][Ee][Ssſ][Cc][Rr][Ii][Pp][Tt])/dgv, /(\{)(?:__|[a-z\p{space}]*)[Tt](?:[Ssſ]|[Yy][Pp][Ee][Ssſ][Cc][Rr][Ii][Pp][Tt])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.ts",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.ts" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Xx][Mm][Ll]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Xx][Mm][Ll]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "text.xml",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "text.xml" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Yy][Aa][Mm][Ll]/dgv, /(\{)(?:__|[a-z\p{space}]*)[Yy][Aa][Mm][Ll]/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "source.yaml",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "source.yaml" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)(?:__|[a-z\p{space}]*)[Tt][Ii][KKk][Zz](?:|[Pp][Ii][Cc][Tt][Uu][Rr][Ee])/dgv, /(\{)(?:__|[a-z\p{space}]*)[Tt][Ii][KKk][Zz](?:|[Pp][Ii][Cc][Tt][Uu][Rr][Ee])/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "text.tex.latex",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  patterns: [
                    { include: "text.tex.latex" }
                  ]
                }
              ]
            },
            {
              begin: {
                G: [/￿(\{)/dgv, /(\{)/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" }
              },
              end: /(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
              patterns: [
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  end: /(\})\p{space}*(?=\n?$)/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.definition.arguments.end.latex" }
                  },
                  patterns: [
                    { include: "text.tex#braces" },
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^(\p{space}*)/dgv,
                  contentName: "meta.function.embedded.latex",
                  end: /^\p{space}*(?=\\end\{(?:RobExt)?(?:CacheMeCode|PlaceholderPathFromCode\*?|PlaceholderFromCode\*?|SetPlaceholderCode\*?)\})/dgv,
                  name: "meta.embedded.block.generic.latex"
                }
              ]
            }
          ]
        },
        {
          begin: /(?:^\p{space}*)?\\begin\{(terminal\*?)\}(?=[\[\{])/dgv,
          captures: {
            "0": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          end: /\\end\{1\}/dgv,
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)([A-Za-z]*)(\})/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)([A-Za-z]*)(\\})", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "variable.parameter.function.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" }
              },
              contentName: "meta.function.embedded.latex",
              end: /^\p{space}*(?=\\end\{terminal\*?\})/dgv,
              name: "meta.embedded.block.generic.latex"
            }
          ]
        }
      ]
    },
    "hyperref-macro": {
      patterns: [
        {
          begin: /\p{space}*((\\)h(?:ref|yperref|yperimage))(?=[\[\{])/dgv,
          beginCaptures: {
            "1": { name: "support.function.url.latex" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.arguments.end.latex" }
          },
          name: "meta.function.hyperlink.latex",
          patterns: [
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(\{)([^\}]*)(\})(?:\{[^\}]*\}){2}?(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(\\{)([^\\}]*)(\\})(?:\\{[^\\}]*\\}){2}?(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "markup.underline.link.latex" },
                "3": { name: "punctuation.definition.arguments.end.latex" },
                "4": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "meta.variable.parameter.function.latex",
              end: /(?=\})/dgv,
              patterns: [
                { include: "$self" }
              ]
            },
            {
              begin: {
                G: [/(?:￿|(?<=\]))(?:(\{)[^\}]*(\}))?(\{)/dgv, new EmulatedRegExp("(?:^|(?<=\\]))(?:(\\{)[^\\}]*(\\}))?(\\{)", "dgv", { strategy: "clip_search" })]
              },
              beginCaptures: {
                "1": { name: "punctuation.definition.arguments.begin.latex" },
                "2": { name: "punctuation.definition.arguments.end.latex" },
                "3": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "meta.variable.parameter.function.latex",
              end: /(?=\})/dgv,
              patterns: [
                { include: "$self" }
              ]
            }
          ]
        },
        {
          captures: {
            "1": { name: "support.function.url.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.arguments.begin.latex" },
            "4": { name: "markup.underline.link.latex" },
            "5": { name: "punctuation.definition.arguments.end.latex" }
          },
          match: /\p{space}*((\\)(?:url|path))(\{)([^\}]*)(\})/dgv,
          name: "meta.function.link.url.latex"
        }
      ]
    },
    "inline-code-macro": {
      patterns: [
        {
          begin: /((\\)addplot)\+?(\[[^\[]*\])*\p{space}*(gnuplot)\p{space}*(\[[^\[]*\])*\p{space}*(\{)/dgv,
          captures: {
            "1": { name: "support.function.be.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": {
              patterns: [
                { include: "#optional-arg-bracket" }
              ]
            },
            "4": { name: "variable.parameter.function.latex" },
            "5": {
              patterns: [
                { include: "#optional-arg-bracket" }
              ]
            },
            "6": { name: "punctuation.definition.arguments.begin.latex" }
          },
          end: /\p{space}*(\};)/dgv,
          patterns: [
            {
              begin: /%/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.latex" }
              },
              end: /(?=\n?$)\n?/dgv,
              name: "comment.line.percentage.latex"
            },
            { include: "source.gnuplot" }
          ]
        },
        {
          captures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": {
              patterns: [
                { include: "#optional-arg-bracket" }
              ]
            },
            "4": { name: "punctuation.definition.arguments.begin.latex" },
            "5": { name: "punctuation.definition.arguments.end.latex" },
            "6": { name: "punctuation.definition.verb.latex" },
            "7": { name: "markup.raw.verb.latex" },
            "8": { name: "punctuation.definition.verb.latex" },
            "9": { name: "punctuation.definition.verb.latex" },
            "10": { name: "markup.raw.verb.latex" },
            "11": { name: "punctuation.definition.verb.latex" }
          },
          match: /((\\)mint(?:|inline))((?:\[[^\[]*?\])?)(\{)[A-Za-z]*(\})(?:([^A-Za-\{])([^\n]*?)(\6)|(\{)([^\n]*?)(\}))/dgv,
          name: "meta.function.verb.latex"
        },
        {
          captures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": {
              patterns: [
                { include: "#optional-arg-bracket" }
              ]
            },
            "4": { name: "punctuation.definition.verb.latex" },
            "5": { name: "markup.raw.verb.latex" },
            "6": { name: "punctuation.definition.verb.latex" },
            "7": { name: "punctuation.definition.verb.latex" },
            "8": { name: "markup.raw.verb.latex" },
            "9": { name: "punctuation.definition.verb.latex" }
          },
          match: /((\\)[a-z]+inline)((?:\[[^\[]*?\])?)(?:([^A-Za-\{])([^\n]*?)(\4)|(\{)([^\n]*?)(\}))/dgv,
          name: "meta.function.verb.latex"
        },
        {
          captures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": {
              patterns: [
                { include: "#optional-arg-bracket" }
              ]
            },
            "4": { name: "punctuation.definition.verb.latex" },
            "5": {
              name: "source.python",
              patterns: [
                { include: "source.python" }
              ]
            },
            "6": { name: "punctuation.definition.verb.latex" },
            "7": { name: "punctuation.definition.verb.latex" },
            "8": {
              name: "source.python",
              patterns: [
                { include: "source.python" }
              ]
            },
            "9": { name: "punctuation.definition.verb.latex" }
          },
          match: /((\\)(?:(?:py|pycon|pylab|pylabcon|sympy|sympycon)[cv]?|pyq|pycq|pyif))((?:\[[^\[]*?\])?)(?:([^\]\(\)\,\;A-\[a-\{\}\p{space}])([^\n]*?)(\4)|(\{)([^\n]*?)(\}))/dgv,
          name: "meta.function.verb.latex"
        },
        {
          captures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": {
              patterns: [
                { include: "#optional-arg-bracket" }
              ]
            },
            "4": { name: "punctuation.definition.verb.latex" },
            "5": {
              name: "source.julia",
              patterns: [
                { include: "source.julia" }
              ]
            },
            "6": { name: "punctuation.definition.verb.latex" },
            "7": { name: "punctuation.definition.verb.latex" },
            "8": {
              name: "source.julia",
              patterns: [
                { include: "source.julia" }
              ]
            },
            "9": { name: "punctuation.definition.verb.latex" }
          },
          match: /((\\)j(?:l|ulia)[cv]?)((?:\[[^\[]*?\])?)(?:([^A-Za-\{])([^\n]*?)(\4)|(\{)([^\n]*?)(\}))/dgv,
          name: "meta.function.verb.latex"
        },
        {
          begin: /((\\)(?:directlua|luadirect|luaexec))(\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.arguments.begin.latex" }
          },
          contentName: "source.lua",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.latex" }
          },
          patterns: [
            { include: "source.lua" },
            { include: "text.tex#braces" }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Aa][Ssſ][Yy](?:|[Mm][Pp][Tt][Oo][Tt][Ee])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.asy",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.asy" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Bb][Aa][Ssſ][Hh]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.shell",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.shell" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Cc](?:|[Pp][Pp])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.cpp.embedded.latex",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.cpp.embedded.latex" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Cc][Ssſ][Ssſ]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.css",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.css" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Gg][Nn][Uu][Pp][Ll][Oo][Tt]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.gnuplot",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.gnuplot" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Hh](?:[Ssſ]|[Aa][Ssſ][KKk][Ee][Ll][Ll])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.haskell",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.haskell" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Hh][Tt][Mm][Ll]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "text.html",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "text.html.basic" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Jj][Aa][Vv][Aa]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.java",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.java" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Jj](?:[Ll]|[Uu][Ll][Ii][Aa])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.julia",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.julia" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Jj](?:[Ssſ]|[Aa][Vv][Aa][Ssſ][Cc][Rr][Ii][Pp][Tt])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.js",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.js" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Ll][Uu][Aa]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.lua",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.lua" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[(?:[Pp][Yy]|[Pp][Yy][Tt][Hh][Oo][Nn]|[Ssſ][Aa][Gg][Ee])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.python",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.python" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Rr](?:[Bb]|[Uu][Bb][Yy])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.ruby",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.ruby" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Rr][Uu][Ssſ][Tt]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.rust",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.rust" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Tt](?:[Ssſ]|[Yy][Pp][Ee][Ssſ][Cc][Rr][Ii][Pp][Tt])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.ts",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.ts" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Xx][Mm][Ll]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "text.xml",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "text.xml" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Yy][Aa][Mm][Ll]\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "source.yaml",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "source.yaml" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=\[[Tt][Ii][KKk][Zz](?:|[Pp][Ii][Cc][Tt][Uu][Rr][Ee])\b|\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "text.tex.latex",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "text.tex.latex" }
              ]
            }
          ]
        },
        {
          begin: /((\\)cacheMeCode)(?=[\[\{])/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "text.tex.latex#multiline-optional-arg-no-highlight" },
            {
              begin: /(?<=\])(\{)/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.latex" }
              },
              contentName: "meta.embedded.block.generic.latex",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.latex" }
              },
              patterns: [
                { include: "text.tex#braces" }
              ]
            }
          ]
        },
        {
          begin: /((\\)sys_get_shell:nnN(?:TF)?\p{space}?)(\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.arguments.begin.latex" }
          },
          contentName: "markup.raw.verb.latex",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.latex" }
          }
        }
      ]
    },
    "inline-math": {
      patterns: [
        {
          begin: /\\\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.latex" }
          },
          end: /\\\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.latex" }
          },
          name: "meta.math.block.latex support.class.math.block.environment.latex",
          patterns: [
            { include: "text.tex#math-content" },
            { include: "$self" }
          ]
        },
        {
          begin: /\$(?!\$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.tex" }
          },
          end: /(?<!\$)\$/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.tex" }
          },
          name: "meta.math.block.tex support.class.math.block.tex",
          patterns: [
            {
              match: /\\\$/dgv,
              name: "constant.character.escape.latex"
            },
            { include: "text.tex#math-content" },
            { include: "$self" }
          ]
        }
      ]
    },
    "input-macro": {
      begin: /((\\)in(?:clude|put))(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.include.latex" },
        "2": { name: "punctuation.definition.function.latex" },
        "3": { name: "punctuation.definition.arguments.begin.latex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.latex" }
      },
      name: "meta.include.latex",
      patterns: [
        { include: "$self" }
      ]
    },
    "label-macro": {
      begin: /((\\)z?label)((?:\[[^\[]*?\])*)(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.label.latex" },
        "2": { name: "punctuation.definition.keyword.latex" },
        "3": {
          patterns: [
            { include: "#optional-arg-bracket" }
          ]
        },
        "4": { name: "punctuation.definition.arguments.begin.latex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.latex" }
      },
      name: "meta.definition.label.latex",
      patterns: [
        {
          match: /[\!\*\,-\/\:\^_\p{Alphabetic}\p{N}]+/dgv,
          name: "variable.parameter.definition.label.latex"
        }
      ]
    },
    "macro-with-args-tokenizer": {
      captures: {
        "1": { name: "support.function.be.latex" },
        "2": { name: "punctuation.definition.function.latex" },
        "3": { name: "punctuation.definition.arguments.begin.latex" },
        "4": { name: "variable.parameter.function.latex" },
        "5": { name: "punctuation.definition.arguments.end.latex" },
        "6": { name: "punctuation.definition.arguments.optional.begin.latex" },
        "7": {
          patterns: [
            { include: "$self" }
          ]
        },
        "8": { name: "punctuation.definition.arguments.optional.end.latex" },
        "9": { name: "punctuation.definition.arguments.begin.latex" },
        "10": { name: "variable.parameter.function.latex" },
        "11": { name: "punctuation.definition.arguments.end.latex" }
      },
      match: /\p{space}*((\\)\p{Alphabetic}+)(\{)(\\?\p{Alphabetic}+\*?)(\})(?:(\[)([^\]]*)(\])){0,2}(?:(\{)([^\{\}]*)(\}))?/dgv
    },
    "multiline-arg-no-highlight": {
      begin: {
        G: [/￿\{/dgv, /\{/dgvy]
      },
      beginCaptures: {
        "0": { name: "punctuation.definition.arguments.begin.latex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.latex" }
      },
      name: "meta.parameter.latex",
      patterns: [
        { include: "#documentclass-usepackage-macro" },
        { include: "#input-macro" },
        { include: "#sections-macro" },
        { include: "#hyperref-macro" },
        { include: "#newcommand-macro" },
        { include: "#text-font-macro" },
        { include: "#citation-macro" },
        { include: "#references-macro" },
        { include: "#label-macro" },
        { include: "#verb-macro" },
        { include: "#inline-code-macro" },
        { include: "#all-other-macro" },
        { include: "#display-math" },
        { include: "#inline-math" },
        { include: "#column-specials" },
        { include: "#braces" },
        { include: "text.tex" }
      ]
    },
    "multiline-optional-arg": {
      begin: {
        G: [/￿\[/dgv, /\[/dgvy]
      },
      beginCaptures: {
        "0": { name: "punctuation.definition.arguments.optional.begin.latex" }
      },
      contentName: "variable.parameter.function.latex",
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.optional.end.latex" }
      },
      name: "meta.parameter.optional.latex",
      patterns: [
        { include: "$self" }
      ]
    },
    "multiline-optional-arg-no-highlight": {
      begin: {
        G: [/(?:￿|(?<=\}))\p{space}*\[/dgv, new EmulatedRegExp("(?:^|(?<=\\}))\\p{space}*\\[", "dgv", { strategy: "clip_search" })]
      },
      beginCaptures: {
        "0": { name: "punctuation.definition.arguments.optional.begin.latex" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.optional.end.latex" }
      },
      name: "meta.parameter.optional.latex",
      patterns: [
        { include: "$self" }
      ]
    },
    "newcommand-macro": {
      begin: /((\\)(?:newcommand|renewcommand|(?:re)?newrobustcmd|DeclareRobustCommand)\*?)(\{)?((\\)[\@\p{Alphabetic}]+\*?)(\})?(?:(\[)[^\]]*(\])){0,2}(\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.latex" },
        "2": { name: "punctuation.definition.function.latex" },
        "3": { name: "punctuation.definition.begin.latex" },
        "4": { name: "support.function.general.latex" },
        "5": { name: "punctuation.definition.function.latex" },
        "6": { name: "punctuation.definition.end.latex" },
        "7": { name: "punctuation.definition.arguments.optional.begin.latex" },
        "8": { name: "punctuation.definition.arguments.optional.end.latex" },
        "9": { name: "punctuation.definition.arguments.begin.latex" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.latex" }
      },
      name: "meta.parameter.newcommand.latex",
      patterns: [
        { include: "#documentclass-usepackage-macro" },
        { include: "#unbalanced-env" },
        { include: "#input-macro" },
        { include: "#sections-macro" },
        { include: "#hyperref-macro" },
        { include: "#text-font-macro" },
        { include: "#citation-macro" },
        { include: "#references-macro" },
        { include: "#label-macro" },
        { include: "#verb-macro" },
        { include: "#inline-code-macro" },
        { include: "#macro-with-args-tokenizer" },
        { include: "#all-other-macro" },
        { include: "#display-math" },
        { include: "#inline-math" },
        { include: "#column-specials" },
        { include: "#braces" },
        { include: "text.tex" }
      ]
    },
    "optional-arg-angle-no-highlight": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.arguments.optional.begin.latex" },
            "2": { name: "punctuation.definition.arguments.optional.end.latex" }
          },
          match: /(<)[^\<]*?(>)/dgv,
          name: "meta.parameter.optional.latex"
        }
      ]
    },
    "optional-arg-bracket": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.arguments.optional.begin.latex" },
            "2": { name: "variable.parameter.function.latex" },
            "3": { name: "punctuation.definition.arguments.optional.end.latex" }
          },
          match: /(\[)([^\[]*?)(\])/dgv,
          name: "meta.parameter.optional.latex"
        }
      ]
    },
    "optional-arg-bracket-no-highlight": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.arguments.optional.begin.latex" },
            "2": { name: "punctuation.definition.arguments.optional.end.latex" }
          },
          match: /(\[)[^\[]*?(\])/dgv,
          name: "meta.parameter.optional.latex"
        }
      ]
    },
    "optional-arg-parenthesis": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.arguments.optional.begin.latex" },
            "2": { name: "variable.parameter.function.latex" },
            "3": { name: "punctuation.definition.arguments.optional.end.latex" }
          },
          match: /(\()([^\(]*?)(\))/dgv,
          name: "meta.parameter.optional.latex"
        }
      ]
    },
    "optional-arg-parenthesis-no-highlight": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.arguments.optional.begin.latex" },
            "2": { name: "punctuation.definition.arguments.optional.end.latex" }
          },
          match: /(\()[^\(]*?(\))/dgv,
          name: "meta.parameter.optional.latex"
        }
      ]
    },
    "references-macro": {
      patterns: [
        {
          begin: /((\\)[\p{L}\p{M}\p{N}\p{Pc}]*[Rr]ef\*?)(?:\[[^\]]*\])?(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.ref.latex" },
            "2": { name: "punctuation.definition.keyword.latex" },
            "3": { name: "punctuation.definition.arguments.begin.latex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.latex" }
          },
          name: "meta.reference.label.latex",
          patterns: [
            {
              match: /[\!\*\,-\/\:\^_\p{Alphabetic}\p{N}]+/dgv,
              name: "constant.other.reference.label.latex"
            }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.control.ref.latex" },
            "2": { name: "punctuation.definition.keyword.latex" },
            "3": { name: "punctuation.definition.arguments.begin.latex" },
            "4": { name: "constant.other.reference.label.latex" },
            "5": { name: "punctuation.definition.arguments.end.latex" },
            "6": { name: "punctuation.definition.arguments.begin.latex" },
            "7": { name: "constant.other.reference.label.latex" },
            "8": { name: "punctuation.definition.arguments.end.latex" }
          },
          match: /((\\)[\p{L}\p{M}\p{N}\p{Pc}]*[Rr]efrange\*?)(?:\[[^\]]*\])?(\{)([\!\*\,-\/\:\^_\p{Alphabetic}\p{N}]+)(\})(\{)([\!\*\,-\/\:\^_\p{Alphabetic}\p{N}]+)(\})/dgv
        },
        {
          begin: /((\\)bibentry)(\{)/dgv,
          captures: {
            "1": { name: "keyword.control.cite.latex" },
            "2": { name: "punctuation.definition.keyword.latex" },
            "3": { name: "punctuation.definition.arguments.begin.latex" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.latex" }
          },
          name: "meta.citation.latex",
          patterns: [
            {
              match: /[\.\:\p{Alphabetic}\p{N}]+/dgv,
              name: "constant.other.reference.citation.latex"
            }
          ]
        }
      ]
    },
    "sections-macro": {
      begin: /((\\)((?:sub){0,2}section|(?:sub)?paragraph|chapter|part|addpart|addchap|addsec|minisec|frametitle)\*?)((?:\[[^\[]*?\]){0,2})(\{)/dgv,
      beginCaptures: {
        "1": { name: "support.function.section.latex" },
        "2": { name: "punctuation.definition.function.latex" },
        "4": {
          patterns: [
            { include: "#optional-arg-bracket" }
          ]
        },
        "5": { name: "punctuation.definition.arguments.begin.latex" }
      },
      contentName: "entity.name.section.latex",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.latex" }
      },
      name: "meta.function.section.$3.latex",
      patterns: [
        { include: "#braces" },
        { include: "$self" }
      ]
    },
    "songs-chords": {
      patterns: [
        {
          begin: /\\\[/dgv,
          end: /\]/dgv,
          name: "meta.chord.block.latex support.class.chord.block.environment.latex",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          match: /\^/dgv,
          name: "meta.chord.block.latex support.class.chord.block.environment.latex"
        },
        { include: "$self" }
      ]
    },
    "songs-env": {
      patterns: [
        {
          begin: /(\p{space}*\\begin\{songs\}\{[^\n]*\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "meta.data.environment.songs.latex",
          end: /(\\end\{songs\}(?:\p{space}*\n)?)/dgv,
          name: "meta.function.environment.songs.latex",
          patterns: [
            { include: "text.tex.latex#songs-chords" }
          ]
        },
        {
          begin: /\p{space}*((\\)beginsong)(?=\{)/dgv,
          captures: {
            "1": { name: "support.function.be.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.arguments.begin.latex" },
            "4": { name: "punctuation.definition.arguments.end.latex" }
          },
          end: /((\\)endsong)(?:\p{space}*\n)?/dgv,
          name: "meta.function.environment.song.latex",
          patterns: [
            { include: "#multiline-arg-no-highlight" },
            { include: "#multiline-optional-arg-no-highlight" },
            {
              begin: {
                G: [/(?:￿|(?<=[\]\}]))\p{space}*/dgv, new EmulatedRegExp("(?:^|(?<=[\\]\\}]))\\p{space}*", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.data.environment.song.latex",
              end: /\p{space}*(?=\\endsong)/dgv,
              patterns: [
                { include: "text.tex.latex#songs-chords" }
              ]
            }
          ]
        }
      ]
    },
    "text-font-macro": {
      patterns: [
        {
          begin: /((\\)emph)(\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.emph.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.emph.begin.latex" }
          },
          contentName: "markup.italic.emph.latex",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.emph.end.latex" }
          },
          name: "meta.function.emph.latex",
          patterns: [
            { include: "#braces" },
            { include: "$self" }
          ]
        },
        {
          begin: /((\\)textit)(\{)/dgv,
          captures: {
            "1": { name: "support.function.textit.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.textit.begin.latex" }
          },
          contentName: "markup.italic.textit.latex",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.textit.end.latex" }
          },
          name: "meta.function.textit.latex",
          patterns: [
            { include: "#braces" },
            { include: "$self" }
          ]
        },
        {
          begin: /((\\)textbf)(\{)/dgv,
          captures: {
            "1": { name: "support.function.textbf.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.textbf.begin.latex" }
          },
          contentName: "markup.bold.textbf.latex",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.textbf.end.latex" }
          },
          name: "meta.function.textbf.latex",
          patterns: [
            { include: "#braces" },
            { include: "$self" }
          ]
        },
        {
          begin: /((\\)texttt)(\{)/dgv,
          captures: {
            "1": { name: "support.function.texttt.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.texttt.begin.latex" }
          },
          contentName: "markup.raw.texttt.latex",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.texttt.end.latex" }
          },
          name: "meta.function.texttt.latex",
          patterns: [
            { include: "#braces" },
            { include: "$self" }
          ]
        }
      ]
    },
    "unbalanced-env": {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          match: /(\p{space}*\\(?:begin|end)\{(\p{Alphabetic}+\*?)\})/dgv,
          name: "meta.function.environment.general.latex"
        }
      ]
    },
    "verb-macro": {
      patterns: [
        {
          begin: /((\\)(?:[Vv]|spv)erb\*?)\p{space}*((\\)scantokens)(\{)/dgv,
          beginCaptures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "support.function.verb.latex" },
            "4": { name: "punctuation.definition.verb.latex" },
            "5": { name: "punctuation.definition.begin.latex" }
          },
          contentName: "markup.raw.verb.latex",
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.end.latex" }
          },
          name: "meta.function.verb.latex",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          captures: {
            "1": { name: "support.function.verb.latex" },
            "2": { name: "punctuation.definition.function.latex" },
            "3": { name: "punctuation.definition.verb.latex" },
            "4": { name: "markup.raw.verb.latex" },
            "5": { name: "punctuation.definition.verb.latex" }
          },
          match: /((\\)(?:[Vv]|spv)erb\*?)\p{space}*((?<=\p{space})\P{space}|[^A-Za-z])([^\n]*?)(\3|(?=\n?$))/dgv,
          name: "meta.function.verb.latex"
        }
      ]
    },
    "verbatim-env": {
      patterns: [
        {
          begin: /(\p{space}*\\begin\{((?:fboxv|boxedv|[Vv]|spv)erbatim\*?)\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "markup.raw.verbatim.latex",
          end: /(\\end\{2\})/dgv,
          name: "meta.function.verbatim.latex"
        },
        {
          begin: /(\p{space}*\\begin\{VerbatimOut\}\{[^\}]*\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "markup.raw.verbatim.latex",
          end: /(\\end\{VerbatimOut\})/dgv,
          name: "meta.function.verbatim.latex"
        },
        {
          begin: /(\p{space}*\\begin\{alltt\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "markup.raw.verbatim.latex",
          end: /(\\end\{alltt\})/dgv,
          name: "meta.function.alltt.latex",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.function.latex" }
              },
              match: /(\\)[A-Za-z]+/dgv,
              name: "support.function.general.latex"
            }
          ]
        },
        {
          begin: /(\p{space}*\\begin\{([Cc]omment)\})/dgv,
          captures: {
            "1": {
              patterns: [
                { include: "#macro-with-args-tokenizer" }
              ]
            }
          },
          contentName: "comment.line.percentage.latex",
          end: /(\\end\{2\})/dgv,
          name: "meta.function.verbatim.latex"
        }
      ]
    }
  },
  dependencies: [
    "tex"
  ]
};
