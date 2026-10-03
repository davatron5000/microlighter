import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "typst",
  displayName: "Typst",
  aliases: [
    "typ"
  ],
  scopeName: "source.typst",
  patterns: [
    { include: "#shebang" },
    { include: "#markup" }
  ],
  repository: {
    agda: {
      lang: "agda",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.agda",
              patterns: [
                { include: "source.agda" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(agda)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(agda)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.agda",
              patterns: [
                { include: "source.agda" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(agda)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.agda",
              patterns: [
                { include: "source.agda" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(agda)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.agda",
              patterns: [
                { include: "source.agda" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(agda)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.agda",
              patterns: [
                { include: "source.agda" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    arrayOrDict: {
      patterns: [
        {
          captures: {
            "1": { name: "meta.brace.round.typst" },
            "2": { name: "meta.brace.round.typst" }
          },
          match: /(\()\p{space}*(\))/dgv
        },
        {
          captures: {
            "1": { name: "meta.brace.round.typst" },
            "2": { name: "punctuation.separator.colon.typst" },
            "3": { name: "meta.brace.round.typst" }
          },
          match: /(\()\p{space}*(:)\p{space}*(\))/dgv
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "meta.brace.round.typst" }
          },
          end: /\)|(?=[\]\;\}])/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.typst" }
          },
          patterns: [
            { include: "#literalContent" }
          ]
        }
      ]
    },
    batchfile: {
      lang: "batchfile",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.batchfile",
              patterns: [
                { include: "source.batchfile" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(bat(?:chfile||ch))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(bat(?:chfile||ch))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.batchfile",
              patterns: [
                { include: "source.batchfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(bat(?:chfile||ch))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.batchfile",
              patterns: [
                { include: "source.batchfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(bat(?:chfile||ch))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.batchfile",
              patterns: [
                { include: "source.batchfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(bat(?:chfile||ch))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.batchfile",
              patterns: [
                { include: "source.batchfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    bibtex: {
      lang: "bibtex",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.bibtex",
              patterns: [
                { include: "text.bibtex" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(bibtex)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(bibtex)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.bibtex",
              patterns: [
                { include: "text.bibtex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(bibtex)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.bibtex",
              patterns: [
                { include: "text.bibtex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(bibtex)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.bibtex",
              patterns: [
                { include: "text.bibtex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(bibtex)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.bibtex",
              patterns: [
                { include: "text.bibtex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    blockComment: {
      begin: /\/\*/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.typst" }
      },
      end: /\*\//dgv,
      name: "comment.block.typst",
      patterns: [
        { include: "#blockComment" }
      ]
    },
    blockRaw: {
      patterns: [
        { include: "#agda" },
        { include: "#batchfile" },
        { include: "#bibtex" },
        { include: "#c" },
        { include: "#clojure" },
        { include: "#coffee" },
        { include: "#cpp" },
        { include: "#css" },
        { include: "#cs" },
        { include: "#dart" },
        { include: "#diff" },
        { include: "#dockerfile" },
        { include: "#elixir" },
        { include: "#erlang" },
        { include: "#fs" },
        { include: "#git-commit" },
        { include: "#git-rebase" },
        { include: "#go" },
        { include: "#groovy" },
        { include: "#handlebars" },
        { include: "#html" },
        { include: "#ini" },
        { include: "#java" },
        { include: "#js" },
        { include: "#jsonc" },
        { include: "#json" },
        { include: "#julia" },
        { include: "#latex" },
        { include: "#less" },
        { include: "#log" },
        { include: "#lua" },
        { include: "#makefile" },
        { include: "#markdown" },
        { include: "#objc" },
        { include: "#perl" },
        { include: "#perl6" },
        { include: "#php" },
        { include: "#powershell" },
        { include: "#pug" },
        { include: "#r" },
        { include: "#regexp" },
        { include: "#re" },
        { include: "#ruby" },
        { include: "#scss" },
        { include: "#sql" },
        { include: "#swift" },
        { include: "#typst" },
        { include: "#typst-code" },
        { include: "#xml" },
        { include: "#xsl" },
        { include: "#yaml" },
        { include: "#python" },
        { include: "#rust" },
        { include: "#scala" },
        { include: "#shell" },
        { include: "#ts" },
        { include: "#tsx" },
        { include: "#twig" },
        { include: "#verilog" },
        { include: "#systemverilog" },
        { include: "#vb" },
        { include: "#blockRawGeneral" }
      ]
    },
    blockRawGeneral: {
      begin: /(`{3,})([_\p{XIDS}][\-_\p{XIDC}]*\b)?/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.raw.begin.typst" },
        "2": { name: "fenced_code.block.language.typst" }
      },
      end: /(1)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.raw.end.typst" }
      },
      name: "markup.raw.block.typst"
    },
    c: {
      lang: "c",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.c",
              patterns: [
                { include: "source.c" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})([ch])\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})([ch])\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.c",
              patterns: [
                { include: "source.c" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})([ch])\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.c",
              patterns: [
                { include: "source.c" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})([ch])\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.c",
              patterns: [
                { include: "source.c" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})([ch])\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.c",
              patterns: [
                { include: "source.c" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    callArgs: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.typst" }
      },
      end: /\)|(?=[\]\;\}])/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.typst" }
      },
      patterns: [
        { include: "#patternOrArgsBody" }
      ]
    },
    clojure: {
      lang: "clojure",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.clojure",
              patterns: [
                { include: "source.clojure" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(cl(?:ojure|js??))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(cl(?:ojure|js??))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.clojure",
              patterns: [
                { include: "source.clojure" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(cl(?:ojure|js??))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.clojure",
              patterns: [
                { include: "source.clojure" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(cl(?:ojure|js??))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.clojure",
              patterns: [
                { include: "source.clojure" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(cl(?:ojure|js??))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.clojure",
              patterns: [
                { include: "source.clojure" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    code: {
      patterns: [
        { include: "#common" },
        { include: "#comments" },
        {
          match: /;/dgv,
          name: "punctuation.terminator.statement.typst"
        },
        { include: "#expression" }
      ]
    },
    codeBlock: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.curly.typst" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "meta.brace.curly.typst" }
      },
      patterns: [
        { include: "#code" }
      ]
    },
    codeMath: {
      begin: /(?<![\]\)])\$/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.math.typst" }
      },
      end: /\$/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.math.typst" }
      },
      name: "markup.math.typst",
      patterns: [
        { include: "#math" }
      ]
    },
    coffee: {
      lang: "coffee",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.coffee",
              patterns: [
                { include: "source.coffee" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(coffee|Cakefile|coffee\.erb)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(coffee|Cakefile|coffee\.erb)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.coffee",
              patterns: [
                { include: "source.coffee" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(coffee|Cakefile|coffee\.erb)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.coffee",
              patterns: [
                { include: "source.coffee" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(coffee|Cakefile|coffee\.erb)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.coffee",
              patterns: [
                { include: "source.coffee" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(coffee|Cakefile|coffee\.erb)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.coffee",
              patterns: [
                { include: "source.coffee" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        { include: "#blockComment" },
        { include: "#lineComment" }
      ]
    },
    common: {
      patterns: [
        { include: "#strictComments" },
        { include: "#blockRaw" },
        { include: "#inlineRaw" }
      ]
    },
    constants: {
      patterns: [
        {
          match: /(?:\p{Nd}+\.(?!\p{Nd})|\p{Nd}*\.?\p{Nd}+(?:[Ee][\-\+]?\p{Nd}+)?)(?<!\.)(mm|pt|cm|in|em)((?=\n?$)|\b)/dgv,
          name: "constant.numeric.length.typst"
        },
        {
          match: /(?:\p{Nd}+\.(?!\p{Nd})|\p{Nd}*\.?\p{Nd}+(?:[Ee][\-\+]?\p{Nd}+)?)(?<!\.)(rad|deg)((?=\n?$)|\b)/dgv,
          name: "constant.numeric.angle.typst"
        },
        {
          match: /(?:\p{Nd}+\.(?!\p{Nd})|\p{Nd}*\.?\p{Nd}+(?:[Ee][\-\+]?\p{Nd}+)?)%/dgv,
          name: "constant.numeric.percentage.typst"
        },
        {
          match: /(?:\p{Nd}+\.(?!\p{Nd})|\p{Nd}*\.?\p{Nd}+(?:[Ee][\-\+]?\p{Nd}+)?)(?<!\.)fr/dgv,
          name: "constant.numeric.fr.typst"
        },
        {
          match: /(?<![\]\)\}])(^|(?<=[\#\p{space}])|\b)\p{Nd}+\b(?!\.(?:[^_\p{XIDS}]|(?=\n?$))|[Ee])/dgv,
          name: "constant.numeric.integer.typst"
        },
        {
          match: /(?<![\]\)\}])(^|(?<=[\#\p{space}])|\b)0x\p{AHex}+\b/dgv,
          name: "constant.numeric.hex.typst"
        },
        {
          match: /(?<![\]\)\}])(^|(?<=[\#\p{space}])|\b)0o[0-7]+\b/dgv,
          name: "constant.numeric.octal.typst"
        },
        {
          match: /(?<![\]\)\}])(^|(?<=[\#\p{space}])|\b)0b[01]+\b/dgv,
          name: "constant.numeric.binary.typst"
        },
        {
          match: /\p{Nd}+\.(?!\p{Nd})|\p{Nd}*\.?\p{Nd}+(?:[Ee][\-\+]?\p{Nd}+)?/dgv,
          name: "constant.numeric.float.typst"
        },
        { include: "#stringLiteral" }
      ]
    },
    contentBlock: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.square.typst" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.typst" }
      },
      patterns: [
        { include: "#contentBlock" },
        { include: "#markup" }
      ]
    },
    contextStatement: {
      begin: /\bcontext\b(?!-)/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.other.typst" }
      },
      end: /(?<=[\]\}])|(?<!\bcontext\p{space}*)(?=[\[\{])|(?=[\]\n\#\$\)\;\}]|(?=\n?$))/dgv,
      name: "meta.expr.context.typst",
      patterns: [
        { include: "#expression" }
      ]
    },
    cpp: {
      lang: "cpp",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.cpp",
              patterns: [
                { include: "source.cpp" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(c(?:pp|\+\+|xx))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(c(?:pp|\+\+|xx))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cpp",
              patterns: [
                { include: "source.cpp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(c(?:pp|\+\+|xx))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cpp",
              patterns: [
                { include: "source.cpp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(c(?:pp|\+\+|xx))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cpp",
              patterns: [
                { include: "source.cpp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(c(?:pp|\+\+|xx))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cpp",
              patterns: [
                { include: "source.cpp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    cs: {
      lang: "cs",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.cs",
              patterns: [
                { include: "source.cs" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(c(?:s|sharp|#))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(c(?:s|sharp|#))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cs",
              patterns: [
                { include: "source.cs" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(c(?:s|sharp|#))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cs",
              patterns: [
                { include: "source.cs" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(c(?:s|sharp|#))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cs",
              patterns: [
                { include: "source.cs" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(c(?:s|sharp|#))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cs",
              patterns: [
                { include: "source.cs" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    css: {
      lang: "css",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.css",
              patterns: [
                { include: "source.css" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(css(?:|\.erb))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(css(?:|\.erb))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.css",
              patterns: [
                { include: "source.css" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(css(?:|\.erb))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.css",
              patterns: [
                { include: "source.css" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(css(?:|\.erb))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.css",
              patterns: [
                { include: "source.css" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(css(?:|\.erb))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.css",
              patterns: [
                { include: "source.css" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    dart: {
      lang: "dart",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.dart",
              patterns: [
                { include: "source.dart" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(dart)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(dart)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dart",
              patterns: [
                { include: "source.dart" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(dart)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dart",
              patterns: [
                { include: "source.dart" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(dart)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dart",
              patterns: [
                { include: "source.dart" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(dart)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dart",
              patterns: [
                { include: "source.dart" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    diff: {
      lang: "diff",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.diff",
              patterns: [
                { include: "source.diff" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(diff|patch|rej)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(diff|patch|rej)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.diff",
              patterns: [
                { include: "source.diff" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(diff|patch|rej)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.diff",
              patterns: [
                { include: "source.diff" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(diff|patch|rej)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.diff",
              patterns: [
                { include: "source.diff" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(diff|patch|rej)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.diff",
              patterns: [
                { include: "source.diff" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    dockerfile: {
      lang: "dockerfile",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.dockerfile",
              patterns: [
                { include: "source.dockerfile" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})([Dd]ockerfile)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})([Dd]ockerfile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dockerfile",
              patterns: [
                { include: "source.dockerfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})([Dd]ockerfile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dockerfile",
              patterns: [
                { include: "source.dockerfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})([Dd]ockerfile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dockerfile",
              patterns: [
                { include: "source.dockerfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})([Dd]ockerfile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dockerfile",
              patterns: [
                { include: "source.dockerfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    elixir: {
      lang: "elixir",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.elixir",
              patterns: [
                { include: "source.elixir" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(elixir)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(elixir)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.elixir",
              patterns: [
                { include: "source.elixir" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(elixir)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.elixir",
              patterns: [
                { include: "source.elixir" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(elixir)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.elixir",
              patterns: [
                { include: "source.elixir" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(elixir)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.elixir",
              patterns: [
                { include: "source.elixir" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    elseClause: {
      match: /\belse\b(?!-)/dgv,
      name: "keyword.control.conditional.typst"
    },
    erlang: {
      lang: "erlang",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.erlang",
              patterns: [
                { include: "source.erlang" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(erlang)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(erlang)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.erlang",
              patterns: [
                { include: "source.erlang" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(erlang)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.erlang",
              patterns: [
                { include: "source.erlang" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(erlang)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.erlang",
              patterns: [
                { include: "source.erlang" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(erlang)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.erlang",
              patterns: [
                { include: "source.erlang" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#comments" },
        { include: "#arrayOrDict" },
        { include: "#contentBlock" },
        {
          match: /\b(else)\b(?!-)/dgv,
          name: "keyword.control.conditional.typst"
        },
        {
          match: /\b(break|continue)\b(?!-)/dgv,
          name: "keyword.control.loop.typst"
        },
        {
          match: /\b(in)\b(?!-)/dgv,
          name: "keyword.other.range.typst"
        },
        {
          match: /\b(and|or|not)\b(?!-)/dgv,
          name: "keyword.other.logical.typst"
        },
        {
          match: /\b(return)\b(?!-)/dgv,
          name: "keyword.control.flow.typst"
        },
        { include: "#markupLabel" },
        { include: "#blockRaw" },
        { include: "#inlineRaw" },
        { include: "#codeBlock" },
        { include: "#letStatement" },
        { include: "#showStatement" },
        { include: "#contextStatement" },
        { include: "#setStatement" },
        { include: "#forStatement" },
        { include: "#whileStatement" },
        { include: "#ifStatement" },
        { include: "#importStatement" },
        { include: "#includeStatement" },
        { include: "#strictFuncCallOrPropAccess" },
        { include: "#primitiveColors" },
        { include: "#primitiveFunctions" },
        { include: "#primitiveTypes" },
        { include: "#keywordConstants" },
        { include: "#identifier" },
        { include: "#constants" },
        { include: "#codeMath" },
        {
          match: /(as)\b(?!-)/dgv,
          name: "keyword.control.typst"
        },
        {
          match: /(in)\b(?!-)/dgv,
          name: "keyword.operator.range.typst"
        },
        {
          match: /\.\./dgv,
          name: "keyword.operator.spread.typst"
        },
        {
          match: /:/dgv,
          name: "punctuation.separator.colon.typst"
        },
        {
          match: /\./dgv,
          name: "keyword.operator.accessor.typst"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.typst"
        },
        {
          match: /=>/dgv,
          name: "storage.type.function.arrow.typst"
        },
        {
          match: /==|!=|<=?|>=?/dgv,
          name: "keyword.operator.relational.typst"
        },
        {
          begin: /((?:[\-\*\+]|\/?)=)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.typst" }
          },
          end: /(?=[\]\n\)\;\}])/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /[\-\*\+\/\\]/dgv,
          name: "keyword.operator.arithmetic.typst"
        }
      ]
    },
    forClause: {
      begin: /(for)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.loop.typst" }
      },
      end: /(?<!(?:while|and|not|if|or|in|!=|==|<=|>=|[\-\*\+\/\<\>]|=>?|\+=|-=|\*=|\/=)\p{space}*)(?=[\n\[\{])|(?=[\]\n\#\$\)\,\;\}]|(?=\n?$))/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    forStatement: {
      begin: /(?=(for\b(?!-))\p{space}*)/dgv,
      end: /(?<=[\]\}])(?![\[\{])|(?=[\]\n\$\)\;\}]|(?=\n?$))/dgv,
      name: "meta.expr.for.typst",
      patterns: [
        { include: "#comments" },
        { include: "#forClause" },
        { include: "#codeBlock" },
        { include: "#contentBlock" }
      ]
    },
    fs: {
      lang: "fs",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.fs",
              patterns: [
                { include: "source.fsharp" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(f(?:s|sharp|#))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(f(?:s|sharp|#))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.fs",
              patterns: [
                { include: "source.fsharp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(f(?:s|sharp|#))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.fs",
              patterns: [
                { include: "source.fsharp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(f(?:s|sharp|#))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.fs",
              patterns: [
                { include: "source.fsharp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(f(?:s|sharp|#))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.fs",
              patterns: [
                { include: "source.fsharp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    "git-commit": {
      lang: "git-commit",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.git-commit",
              patterns: [
                { include: "text.git-commit" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(git-commit|COMMIT_EDITMSG|MERGE_MSG)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(git-commit|COMMIT_EDITMSG|MERGE_MSG)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-commit",
              patterns: [
                { include: "text.git-commit" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(git-commit|COMMIT_EDITMSG|MERGE_MSG)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-commit",
              patterns: [
                { include: "text.git-commit" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(git-commit|COMMIT_EDITMSG|MERGE_MSG)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-commit",
              patterns: [
                { include: "text.git-commit" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(git-commit|COMMIT_EDITMSG|MERGE_MSG)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-commit",
              patterns: [
                { include: "text.git-commit" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    "git-rebase": {
      lang: "git-rebase",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.git-rebase",
              patterns: [
                { include: "text.git-rebase" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(git-rebase(?:|-todo))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(git-rebase(?:|-todo))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-rebase",
              patterns: [
                { include: "text.git-rebase" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(git-rebase(?:|-todo))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-rebase",
              patterns: [
                { include: "text.git-rebase" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(git-rebase(?:|-todo))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-rebase",
              patterns: [
                { include: "text.git-rebase" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(git-rebase(?:|-todo))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git-rebase",
              patterns: [
                { include: "text.git-rebase" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    go: {
      lang: "go",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.go",
              patterns: [
                { include: "source.go" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(go(?:|lang))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(go(?:|lang))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.go",
              patterns: [
                { include: "source.go" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(go(?:|lang))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.go",
              patterns: [
                { include: "source.go" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(go(?:|lang))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.go",
              patterns: [
                { include: "source.go" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(go(?:|lang))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.go",
              patterns: [
                { include: "source.go" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    groovy: {
      lang: "groovy",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.groovy",
              patterns: [
                { include: "source.groovy" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(g(?:roovy|vy))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(g(?:roovy|vy))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.groovy",
              patterns: [
                { include: "source.groovy" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(g(?:roovy|vy))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.groovy",
              patterns: [
                { include: "source.groovy" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(g(?:roovy|vy))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.groovy",
              patterns: [
                { include: "source.groovy" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(g(?:roovy|vy))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.groovy",
              patterns: [
                { include: "source.groovy" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    handlebars: {
      lang: "handlebars",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.handlebars",
              patterns: [
                { include: "text.html.handlebars" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(h(?:andlebars|bs))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(h(?:andlebars|bs))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.handlebars",
              patterns: [
                { include: "text.html.handlebars" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(h(?:andlebars|bs))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.handlebars",
              patterns: [
                { include: "text.html.handlebars" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(h(?:andlebars|bs))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.handlebars",
              patterns: [
                { include: "text.html.handlebars" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(h(?:andlebars|bs))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.handlebars",
              patterns: [
                { include: "text.html.handlebars" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    html: {
      lang: "html",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.html",
              patterns: [
                { include: "text.html.basic" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(html?|shtml|xhtml|inc|tmpl|tpl)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(html?|shtml|xhtml|inc|tmpl|tpl)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.html",
              patterns: [
                { include: "text.html.basic" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(html?|shtml|xhtml|inc|tmpl|tpl)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.html",
              patterns: [
                { include: "text.html.basic" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(html?|shtml|xhtml|inc|tmpl|tpl)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.html",
              patterns: [
                { include: "text.html.basic" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(html?|shtml|xhtml|inc|tmpl|tpl)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.html",
              patterns: [
                { include: "text.html.basic" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    identifier: {
      match: /(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*/dgv,
      name: "variable.other.readwrite.typst"
    },
    ifClause: {
      begin: /\bif\b(?!-)/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.conditional.typst" }
      },
      end: /(?<!(?:while|and|not|if|or|in|!=|==|<=|>=|[\-\*\+\/\<\>]|=>?|\+=|-=|\*=|\/=)\p{space}*)(?=[\n\[\{])|(?=[\]\n\#\$\)\,\;\}]|(?=\n?$))/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    ifStatement: {
      begin: /(?=(else\p{space}+)?(if\b(?!-)))/dgv,
      end: /(?<=[\]\}])(?!\p{space}*(else)\b(?!-)|[\[\{])|(?<=else)(?!\p{space}*(?:if\b(?!-)|[\[\{]))|(?=[\]\n\$\)\;\}]|(?=\n?$))/dgv,
      name: "meta.expr.if.typst",
      patterns: [
        { include: "#comments" },
        { include: "#ifClause" },
        { include: "#elseClause" },
        { include: "#codeBlock" },
        { include: "#contentBlock" }
      ]
    },
    importAsClause: {
      begin: /\b(as)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.import.typst" }
      },
      end: /(?=[\]\)\:\;\}\p{space}])/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#identifier" }
      ]
    },
    importPathClause: {
      begin: /\b(import\b(?!-))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.import.typst" }
      },
      end: /(?=:|as)/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#expression" }
      ]
    },
    importStatement: {
      begin: /\b(import\b(?!-))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.import.typst" }
      },
      end: /(?=[\]\n\)\;\}])/dgv,
      name: "meta.expr.import.typst",
      patterns: [
        { include: "#comments" },
        { include: "#importPathClause" },
        {
          match: /:/dgv,
          name: "punctuation.separator.colon.typst"
        },
        {
          match: /\*/dgv,
          name: "keyword.operator.wildcard.typst"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.typst"
        },
        { include: "#importAsClause" },
        { include: "#expression" }
      ]
    },
    includeStatement: {
      begin: /\b(include\b(?!-))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.import.typst" }
      },
      end: /(?=[\]\n\)\;\}])/dgv,
      name: "meta.expr.include.typst",
      patterns: [
        { include: "#comments" },
        { include: "#expression" }
      ]
    },
    ini: {
      lang: "ini",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.ini",
              patterns: [
                { include: "source.ini" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(ini|conf)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(ini|conf)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ini",
              patterns: [
                { include: "source.ini" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(ini|conf)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ini",
              patterns: [
                { include: "source.ini" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(ini|conf)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ini",
              patterns: [
                { include: "source.ini" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(ini|conf)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ini",
              patterns: [
                { include: "source.ini" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    inlineRaw: {
      begin: /`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.raw.inline.typst" }
      },
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.raw.inline.typst" }
      },
      name: "markup.raw.inline.typst string.other.raw.typst"
    },
    java: {
      lang: "java",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.java",
              patterns: [
                { include: "source.java" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(java|bsh)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(java|bsh)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.java",
              patterns: [
                { include: "source.java" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(java|bsh)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.java",
              patterns: [
                { include: "source.java" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(java|bsh)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.java",
              patterns: [
                { include: "source.java" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(java|bsh)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.java",
              patterns: [
                { include: "source.java" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    js: {
      lang: "js",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.js",
              patterns: [
                { include: "source.js" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(jsx??|javascript|es6|mjs|cjs|dataviewjs)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(jsx??|javascript|es6|mjs|cjs|dataviewjs)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.js",
              patterns: [
                { include: "source.js" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(jsx??|javascript|es6|mjs|cjs|dataviewjs)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.js",
              patterns: [
                { include: "source.js" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(jsx??|javascript|es6|mjs|cjs|dataviewjs)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.js",
              patterns: [
                { include: "source.js" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(jsx??|javascript|es6|mjs|cjs|dataviewjs)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.js",
              patterns: [
                { include: "source.js" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    json: {
      lang: "json",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.json",
              patterns: [
                { include: "source.json" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.json",
              patterns: [
                { include: "source.json" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.json",
              patterns: [
                { include: "source.json" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.json",
              patterns: [
                { include: "source.json" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.json",
              patterns: [
                { include: "source.json" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    jsonc: {
      lang: "jsonc",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.jsonc",
              patterns: [
                { include: "source.json.comments" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(jsonc)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(jsonc)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.jsonc",
              patterns: [
                { include: "source.json.comments" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(jsonc)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.jsonc",
              patterns: [
                { include: "source.json.comments" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(jsonc)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.jsonc",
              patterns: [
                { include: "source.json.comments" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(jsonc)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.jsonc",
              patterns: [
                { include: "source.json.comments" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    julia: {
      lang: "julia",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.julia",
              patterns: [
                { include: "source.julia" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(julia)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(julia)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.julia",
              patterns: [
                { include: "source.julia" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(julia)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.julia",
              patterns: [
                { include: "source.julia" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(julia)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.julia",
              patterns: [
                { include: "source.julia" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(julia)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.julia",
              patterns: [
                { include: "source.julia" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    keywordConstants: {
      patterns: [
        {
          match: /(?<![\]\)\}])\bnone\b(?!-)/dgv,
          name: "keyword.other.none.typst"
        },
        {
          match: /(?<![\]\)\}])\bauto\b(?!-)/dgv,
          name: "keyword.other.auto.typst"
        },
        {
          match: /(?<![\]\)\}])\b(false|true)\b(?!-)/dgv,
          name: "constant.language.boolean.typst"
        }
      ]
    },
    latex: {
      lang: "latex",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.latex",
              patterns: [
                { include: "text.tex.latex" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})((?:la|)tex)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})((?:la|)tex)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.latex",
              patterns: [
                { include: "text.tex.latex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})((?:la|)tex)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.latex",
              patterns: [
                { include: "text.tex.latex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})((?:la|)tex)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.latex",
              patterns: [
                { include: "text.tex.latex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})((?:la|)tex)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.latex",
              patterns: [
                { include: "text.tex.latex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    less: {
      lang: "less",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.less",
              patterns: [
                { include: "source.css.less" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(less)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(less)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.less",
              patterns: [
                { include: "source.css.less" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(less)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.less",
              patterns: [
                { include: "source.css.less" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(less)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.less",
              patterns: [
                { include: "source.css.less" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(less)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.less",
              patterns: [
                { include: "source.css.less" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    letBindingClause: {
      begin: /(let\b(?!-))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "storage.type.typst" }
      },
      end: /(?=[\]\n\;\=\}])/dgv,
      patterns: [
        { include: "#comments" },
        {
          begin: /\b([_\p{XIDS}][\-_\p{XIDC}]*)(\()/dgv,
          beginCaptures: {
            "1": {
              name: "entity.name.function.typst",
              patterns: [
                { include: "#primitiveFunctions" }
              ]
            },
            "2": { name: "meta.brace.round.typst" }
          },
          end: /\)|(?=[\]\;\}])/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.typst" }
          },
          patterns: [
            { include: "#patternOrArgsBody" }
          ]
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "meta.brace.round.typst" }
          },
          end: /\)|(?=[\]\;\}])/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.typst" }
          },
          patterns: [
            { include: "#patternOrArgsBody" }
          ]
        },
        { include: "#identifier" }
      ]
    },
    letInitClause: {
      begin: /=\p{space}*/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.assignment.typst" }
      },
      end: /(?=[\]\n\)\;\}])/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#expression" }
      ]
    },
    letStatement: {
      begin: /(?=(let\b(?!-)))/dgv,
      end: /(?!=)(?=[\]\)\;\}\p{space}])/dgv,
      name: "meta.expr.let.typst",
      patterns: [
        { include: "#comments" },
        { include: "#letBindingClause" },
        { include: "#letInitClause" }
      ]
    },
    lineComment: {
      begin: /\/\//dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.typst" }
      },
      end: /(?=(?=\n?$)|\n)/dgv,
      name: "comment.line.double-slash.typst"
    },
    literalContent: {
      patterns: [
        { include: "#paramOrArgName" },
        { include: "#expression" }
      ]
    },
    log: {
      lang: "log",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.log",
              patterns: [
                { include: "text.log" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(log)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(log)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.log",
              patterns: [
                { include: "text.log" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(log)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.log",
              patterns: [
                { include: "text.log" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(log)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.log",
              patterns: [
                { include: "text.log" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(log)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.log",
              patterns: [
                { include: "text.log" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    lua: {
      lang: "lua",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.lua",
              patterns: [
                { include: "source.lua" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(lua)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(lua)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.lua",
              patterns: [
                { include: "source.lua" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(lua)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.lua",
              patterns: [
                { include: "source.lua" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(lua)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.lua",
              patterns: [
                { include: "source.lua" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(lua)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.lua",
              patterns: [
                { include: "source.lua" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    makefile: {
      lang: "makefile",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.makefile",
              patterns: [
                { include: "source.makefile" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})((?:m|GNUm|OCamlM)akefile)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})((?:m|GNUm|OCamlM)akefile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.makefile",
              patterns: [
                { include: "source.makefile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})((?:m|GNUm|OCamlM)akefile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.makefile",
              patterns: [
                { include: "source.makefile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})((?:m|GNUm|OCamlM)akefile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.makefile",
              patterns: [
                { include: "source.makefile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})((?:m|GNUm|OCamlM)akefile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.makefile",
              patterns: [
                { include: "source.makefile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    markdown: {
      lang: "markdown",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.markdown",
              patterns: [
                { include: "text.html.markdown" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(m(?:arkdown|d))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(m(?:arkdown|d))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.markdown",
              patterns: [
                { include: "text.html.markdown" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(m(?:arkdown|d))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.markdown",
              patterns: [
                { include: "text.html.markdown" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(m(?:arkdown|d))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.markdown",
              patterns: [
                { include: "text.html.markdown" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(m(?:arkdown|d))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.markdown",
              patterns: [
                { include: "text.html.markdown" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    markup: {
      patterns: [
        { include: "#common" },
        { include: "#markupEnterCode" },
        { include: "#markupEscape" },
        {
          match: /\\/dgv,
          name: "punctuation.definition.linebreak.typst"
        },
        {
          match: /~/dgv,
          name: "punctuation.definition.nonbreaking-space.typst"
        },
        {
          match: /-\?/dgv,
          name: "punctuation.definition.shy.typst"
        },
        {
          match: /---/dgv,
          name: "punctuation.definition.em-dash.typst"
        },
        {
          match: /--/dgv,
          name: "punctuation.definition.en-dash.typst"
        },
        {
          match: /\.\.\./dgv,
          name: "punctuation.definition.ellipsis.typst"
        },
        { include: "#markupLink" },
        { include: "#markupMath" },
        { include: "#markupHeading" },
        {
          match: /^\p{space}*-\p{space}+/dgv,
          name: "punctuation.definition.list.unnumbered.typst"
        },
        {
          match: /^\p{space}*([0-9]+\.|\+)\p{space}+/dgv,
          name: "punctuation.definition.list.numbered.typst"
        },
        { include: "#markupLabel" },
        { include: "#markupReference" },
        { include: "#markupBrace" }
      ]
    },
    markupBold: {
      begin: /(^\*|\*(?=\n?$)|((?<=[[^\p{L}\p{M}\p{N}\p{Pc}]\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])\*)|(\*(?=[[^\p{L}\p{M}\p{N}\p{Pc}]\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])))/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.bold.typst" }
      },
      end: /(^\*|\*(?=\n?$)|((?<=[[^\p{L}\p{M}\p{N}\p{Pc}]\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])\*)|(\*(?=[[^\p{L}\p{M}\p{N}\p{Pc}]\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])))|\n|(?=\])/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.bold.typst" }
      },
      name: "markup.bold.typst",
      patterns: [
        { include: "#markup" }
      ]
    },
    markupBrace: {
      match: /[\]\(\)\[\{\}]/dgv,
      name: "markup.content.brace.typst"
    },
    markupEnterCode: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.hash.typst" }
          },
          match: /(#)\p{space}/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.definition.hash.typst" },
            "2": { name: "punctuation.terminator.statement.typst" }
          },
          match: /(#)(;)/dgv
        },
        {
          begin: /#(?=(?:break|continue|and|or|not|return|as|in|include|import|let|else|if|for|while|context|set|show)\b(?!-))/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /#(?=(?:any|str|int|float|bool|type|length|content|array|dictionary|arguments)\b(?!-))/dgv,
          beginCaptures: {
            "0": { name: "entity.name.type.primitive.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /#(?=none\b(?!-))/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.none.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /#(?=(?:false|true)\b(?!-))/dgv,
          beginCaptures: {
            "0": { name: "constant.language.boolean.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /#(?=[_\p{XIDS}][\-_\p{XIDC}]*[\(\[])/dgv,
          beginCaptures: {
            "0": { name: "entity.name.function.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /#(?=[_\p{XIDS}])/dgv,
          beginCaptures: {
            "0": { name: "variable.other.readwrite.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /#(?=")/dgv,
          beginCaptures: {
            "0": { name: "string.hash.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /#(?=\.??\p{Nd})/dgv,
          beginCaptures: {
            "0": { name: "constant.numeric.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /#/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.hash.typst" }
          },
          end: /(?<=;)|(?<=[\]\)\}])(?![\$\(\;\[]|\.(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))|(?<!#)(?=["\\_\{])|(?<![\]\#\}])(?=\[)|(?=\.(?:[^0-9_\p{XIDS}]|(?=\n?$)))|(?=[\]\#\$\)-\-\/\=\}\p{space}]|(?=\n?$))|(;)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.typst" }
          },
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    markupEscape: {
      match: /\\(?:[^u]|u\{?[0-9A-Za-z]*\}?)/dgv,
      name: "constant.character.escape.content.typst"
    },
    markupHeading: {
      begin: /^\p{space}*(=+)(?:(?=[\n\r]|(?=\n?$))|[^\n\P{space}]+)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.heading.typst" }
      },
      end: /\n|(?=<)/dgv,
      name: "markup.heading.typst",
      patterns: [
        { include: "#markup" }
      ]
    },
    markupItalic: {
      begin: /(^_|_(?=\n?$)|((?<=[[^\p{L}\p{M}\p{N}\p{Pc}]\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])_)|(_(?=[[^\p{L}\p{M}\p{N}\p{Pc}]\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])))/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.italic.typst" }
      },
      end: /(^_|_(?=\n?$)|((?<=[[^\p{L}\p{M}\p{N}\p{Pc}]\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])_)|(_(?=[[^\p{L}\p{M}\p{N}\p{Pc}]\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])))|\n|(?=\])/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.italic.typst" }
      },
      name: "markup.italic.typst",
      patterns: [
        { include: "#markup" }
      ]
    },
    markupLabel: {
      match: /<[_\p{XIDS}][\-\.\:_\p{XIDC}]*>/dgv,
      name: "string.other.label.typst"
    },
    markupLink: {
      begin: /https?:\/\//dgv,
      end: /(?=[\]\)\p{space}]|(?=[\!'\,\.\:\;\?](?:[\]\)\p{space}]|(?=\n?$))))/dgv,
      name: "markup.underline.link.typst",
      patterns: [
        { include: "#markupLinkParen" },
        { include: "#markupLinkBracket" },
        {
          match: {
            G: [/(^|￿)(?:[\-\#-\&\*\+\/-9\=\@-Z_a-z\~]+|[\!'\,\.\:\;\?]+(?![\]\)\p{space}]|(?=\n?$)))/dgv, new EmulatedRegExp("(^|^)(?:[\\-\\#-\\&\\*\\+\\/-9\\=\\@-Z_a-z\\~]+|[\\!'\\,\\.\\:\\;\\?]+(?![\\]\\)\\p{space}]|(?=\\n?$)))", "dgv", { strategy: "clip_search" })]
          }
        }
      ]
    },
    markupLinkBracket: {
      begin: /\[/dgv,
      end: /\]|(?=[\)\p{space}])/dgv,
      patterns: [
        { include: "#markupLink" }
      ]
    },
    markupLinkParen: {
      begin: /\(/dgv,
      end: /\)|(?=[\]\p{space}])/dgv,
      patterns: [
        { include: "#markupLink" }
      ]
    },
    markupMath: {
      begin: /\$/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.math.typst" }
      },
      end: /\$/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.math.typst" }
      },
      name: "markup.math.typst",
      patterns: [
        { include: "#math" }
      ]
    },
    markupReference: {
      captures: {
        "1": { name: "punctuation.definition.reference.typst" }
      },
      match: /(@)[_\p{XIDS}](?:[\-_\p{XIDC}]|[\.\:](?!:\p{space}|(?=\n?$)|([\.\:]*[^\-\.\:_\p{XIDC}])))*/dgv,
      name: "string.other.reference.typst"
    },
    math: {
      patterns: [
        { include: "#markupEscape" },
        { include: "#stringLiteral" },
        { include: "#markupEnterCode" },
        {
          begin: /([\/\^_√∛∜])\p{space}*([\(\[\{⌈⌊⌜⌞❲⟦⟨⟪⟬⟮⦃⦅⦇⦉⦋⦍⦏⦑⦓⦕⦗⧘⧚⧼])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.math.operator.typst" },
            "2": { name: "constant.other.symbol.typst" }
          },
          end: /([\]\)\}⌉⌋⌝⌟❳⟧⟩⟫⟭⟯⦄⦆⦈⦊⦌⦎⦐⦒⦔⦖⦘⧙⧛⧽])|(?=\$)|(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "constant.other.symbol.typst" }
          },
          patterns: [
            { include: "#mathParen" },
            { include: "#math" }
          ]
        },
        {
          match: /[\&'\/\^_√∛∜]/dgv,
          name: "punctuation.math.operator.typst"
        },
        { include: "#strictMathFuncCallOrPropAccess" },
        { include: "#mathPrimary" },
        { include: "#mathMoreBrace" }
      ]
    },
    mathBrace: {
      match: /[\{\}]/dgv,
      name: "markup.content.brace.typst"
    },
    mathCallArgs: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.typst" }
      },
      end: /\)|(?=\$)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.typst" }
      },
      patterns: [
        { include: "#comments" },
        { include: "#mathParen" },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.typst"
        },
        { include: "#math" }
      ]
    },
    mathIdentifier: {
      match: /(?:(?<=_)|\b)(?!_)\p{XIDS}(?:(?!_)\p{XIDC})+/dgv,
      name: "variable.other.readwrite.typst"
    },
    mathMoreBrace: {
      match: /[\]\(\)\[\{\}]/dgv,
      name: "markup.content.brace.typst"
    },
    mathParen: {
      begin: /[\(\[\{⌈⌊⌜⌞❲⟦⟨⟪⟬⟮⦃⦅⦇⦉⦋⦍⦏⦑⦓⦕⦗⧘⧚⧼]/dgv,
      beginCaptures: {
        "0": { name: "markup.content.brace.typst" }
      },
      end: /([\]\)\}⌉⌋⌝⌟❳⟧⟩⟫⟭⟯⦄⦆⦈⦊⦌⦎⦐⦒⦔⦖⦘⧙⧛⧽])|(?=\$)|(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "markup.content.brace.typst" }
      },
      patterns: [
        { include: "#mathParen" },
        { include: "#math" }
      ]
    },
    mathPrimary: {
      begin: /(?:(?<=_)|\b)(?!_)\p{XIDS}(?:(?!_)\p{XIDC})+/dgv,
      beginCaptures: {
        "0": { name: "variable.other.readwrite.typst" }
      },
      end: /(?!\(|\.\p{XIDS})|(?=\$)/dgv,
      patterns: [
        { include: "#strictMathFuncCallOrPropAccess" },
        {
          captures: {
            "1": { name: "keyword.operator.accessor.typst" },
            "2": { name: "variable.other.readwrite.typst" }
          },
          match: /(\.)((?!_)\p{XIDS}(?:(?!_)\p{XIDC})*)/dgv
        },
        { include: "#mathCallArgs" },
        { include: "#mathIdentifier" }
      ]
    },
    objc: {
      lang: "objc",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.objc",
              patterns: [
                { include: "source.objc" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(objc|objective-c|mm|obj-c|m)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(objc|objective-c|mm|obj-c|m)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.objc",
              patterns: [
                { include: "source.objc" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(objc|objective-c|mm|obj-c|m)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.objc",
              patterns: [
                { include: "source.objc" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(objc|objective-c|mm|obj-c|m)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.objc",
              patterns: [
                { include: "source.objc" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(objc|objective-c|mm|obj-c|m)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.objc",
              patterns: [
                { include: "source.objc" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    paramOrArgName: {
      captures: {
        "2": { name: "variable.other.readwrite.typst" },
        "3": { name: "punctuation.separator.colon.typst" }
      },
      match: /(?!(show|import|include)\p{space}*:)((?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*)\p{space}*(:)/dgv
    },
    patternOrArgsBody: {
      patterns: [
        { include: "#comments" },
        { include: "#paramOrArgName" },
        { include: "#expression" }
      ]
    },
    perl: {
      lang: "perl",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.perl",
              patterns: [
                { include: "source.perl" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(perl|pl|pm|pod|t|PL|psgi|vcl)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(perl|pl|pm|pod|t|PL|psgi|vcl)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl",
              patterns: [
                { include: "source.perl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(perl|pl|pm|pod|t|PL|psgi|vcl)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl",
              patterns: [
                { include: "source.perl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(perl|pl|pm|pod|t|PL|psgi|vcl)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl",
              patterns: [
                { include: "source.perl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(perl|pl|pm|pod|t|PL|psgi|vcl)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl",
              patterns: [
                { include: "source.perl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    perl6: {
      lang: "perl6",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.perl6",
              patterns: [
                { include: "source.perl.6" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(perl6|p6|pl6|pm6|nqp)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(perl6|p6|pl6|pm6|nqp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl6",
              patterns: [
                { include: "source.perl.6" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(perl6|p6|pl6|pm6|nqp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl6",
              patterns: [
                { include: "source.perl.6" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(perl6|p6|pl6|pm6|nqp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl6",
              patterns: [
                { include: "source.perl.6" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(perl6|p6|pl6|pm6|nqp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl6",
              patterns: [
                { include: "source.perl.6" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    php: {
      lang: "php",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.php",
              patterns: [
                { include: "text.html.basic" },
                { include: "source.php" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(php3??|php4|php5|phtml|aw|ctp)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(php3??|php4|php5|phtml|aw|ctp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.php",
              patterns: [
                { include: "text.html.basic" },
                { include: "source.php" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(php3??|php4|php5|phtml|aw|ctp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.php",
              patterns: [
                { include: "text.html.basic" },
                { include: "source.php" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(php3??|php4|php5|phtml|aw|ctp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.php",
              patterns: [
                { include: "text.html.basic" },
                { include: "source.php" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(php3??|php4|php5|phtml|aw|ctp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.php",
              patterns: [
                { include: "text.html.basic" },
                { include: "source.php" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    powershell: {
      lang: "powershell",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.powershell",
              patterns: [
                { include: "source.powershell" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(p(?:owershell|s1|sm1|sd1))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(p(?:owershell|s1|sm1|sd1))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.powershell",
              patterns: [
                { include: "source.powershell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(p(?:owershell|s1|sm1|sd1))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.powershell",
              patterns: [
                { include: "source.powershell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(p(?:owershell|s1|sm1|sd1))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.powershell",
              patterns: [
                { include: "source.powershell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(p(?:owershell|s1|sm1|sd1))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.powershell",
              patterns: [
                { include: "source.powershell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    primitiveColors: {
      match: /\b(red|blue|green|black|white|gray|silver|eastern|navy|aqua|teal|purple|fuchsia|maroon|orange|yellow|olive|lime|ltr|rtl|ttb|btt|start|left|center|right|end|top|horizon|bottom)\b(?!-)/dgv,
      name: "variable.other.constant.builtin.typst"
    },
    primitiveFunctions: {
      match: /\b(?:luma|oklab|oklch|rgb|cmyk|range)\b(?!-)/dgv,
      name: "support.function.builtin.typst"
    },
    primitiveTypes: {
      match: /\b(any|str|int|float|bool|type|length|content|array|dictionary|arguments)\b(?!-)/dgv,
      name: "entity.name.type.primitive.typst"
    },
    pug: {
      lang: "pug",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.pug",
              patterns: [
                { include: "text.pug" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(pug|jade)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(pug|jade)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.pug",
              patterns: [
                { include: "text.pug" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(pug|jade)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.pug",
              patterns: [
                { include: "text.pug" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(pug|jade)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.pug",
              patterns: [
                { include: "text.pug" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(pug|jade)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.pug",
              patterns: [
                { include: "text.pug" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    python: {
      lang: "python",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.python",
              patterns: [
                { include: "source.python" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.python",
              patterns: [
                { include: "source.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.python",
              patterns: [
                { include: "source.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.python",
              patterns: [
                { include: "source.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.python",
              patterns: [
                { include: "source.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    r: {
      lang: "r",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.r",
              patterns: [
                { include: "source.r" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})([RSrs]|Rprofile)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})([RSrs]|Rprofile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.r",
              patterns: [
                { include: "source.r" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})([RSrs]|Rprofile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.r",
              patterns: [
                { include: "source.r" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})([RSrs]|Rprofile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.r",
              patterns: [
                { include: "source.r" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})([RSrs]|Rprofile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.r",
              patterns: [
                { include: "source.r" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    re: {
      lang: "re",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.re",
              patterns: [
                { include: "source.regexp.python" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(re)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(re)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.re",
              patterns: [
                { include: "source.regexp.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(re)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.re",
              patterns: [
                { include: "source.regexp.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(re)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.re",
              patterns: [
                { include: "source.regexp.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(re)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.re",
              patterns: [
                { include: "source.regexp.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    regexp: {
      lang: "regexp",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.regexp",
              patterns: [
                { include: "source.js.regexp" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(regexp)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(regexp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.regexp",
              patterns: [
                { include: "source.js.regexp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(regexp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.regexp",
              patterns: [
                { include: "source.js.regexp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(regexp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.regexp",
              patterns: [
                { include: "source.js.regexp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(regexp)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.regexp",
              patterns: [
                { include: "source.js.regexp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    ruby: {
      lang: "ruby",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.ruby",
              patterns: [
                { include: "source.ruby" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile\.lock|Thorfile|Puppetfile)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile\.lock|Thorfile|Puppetfile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ruby",
              patterns: [
                { include: "source.ruby" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile\.lock|Thorfile|Puppetfile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ruby",
              patterns: [
                { include: "source.ruby" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile\.lock|Thorfile|Puppetfile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ruby",
              patterns: [
                { include: "source.ruby" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile\.lock|Thorfile|Puppetfile)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ruby",
              patterns: [
                { include: "source.ruby" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    rust: {
      lang: "rust",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.rust",
              patterns: [
                { include: "source.rust" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(r(?:ust|s))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(r(?:ust|s))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.rust",
              patterns: [
                { include: "source.rust" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(r(?:ust|s))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.rust",
              patterns: [
                { include: "source.rust" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(r(?:ust|s))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.rust",
              patterns: [
                { include: "source.rust" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(r(?:ust|s))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.rust",
              patterns: [
                { include: "source.rust" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    scala: {
      lang: "scala",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.scala",
              patterns: [
                { include: "source.scala" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(s(?:cala|bt))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(s(?:cala|bt))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scala",
              patterns: [
                { include: "source.scala" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(s(?:cala|bt))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scala",
              patterns: [
                { include: "source.scala" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(s(?:cala|bt))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scala",
              patterns: [
                { include: "source.scala" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(s(?:cala|bt))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scala",
              patterns: [
                { include: "source.scala" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    scss: {
      lang: "scss",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.scss",
              patterns: [
                { include: "source.css.scss" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(scss)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(scss)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scss",
              patterns: [
                { include: "source.css.scss" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(scss)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scss",
              patterns: [
                { include: "source.css.scss" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(scss)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scss",
              patterns: [
                { include: "source.css.scss" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(scss)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scss",
              patterns: [
                { include: "source.css.scss" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    setClause: {
      begin: /(set)\b\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.other.typst" }
      },
      end: /(?=if)|(?=[\]\n\$\)\;\[\{\}])/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#strictFuncCallOrPropAccess" },
        { include: "#identifier" }
      ]
    },
    setIfClause: {
      begin: /(if\b(?!-))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.conditional.typst" }
      },
      end: /(?<=\P{space})(?<!and|or|not|in|!=|==|<=|>=|[\-\*\+\/\<\=\>]|\+=|-=|\*=|\/=)(?!\p{space}*(?:and|or|not|in|!=|==|<=|>=|[\-\*\+\/\<\=\>]|\+=|-=|\*=|\/=|\.))|(?=[\]\n\)\;\}])/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#expression" }
      ]
    },
    setStatement: {
      begin: /(?=(set\b(?!-))\p{space}*(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*)/dgv,
      end: /(?<=\))(?!\p{space}*if\b)|(?=[\]\$\)\;\[\{\}\p{space}])/dgv,
      name: "meta.expr.set.typst",
      patterns: [
        { include: "#comments" },
        { include: "#setClause" },
        { include: "#setIfClause" }
      ]
    },
    shebang: {
      begin: /^(#!)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.line.shebang.typst" }
      },
      end: /\n/dgv,
      name: "comment.line.shebang.typst"
    },
    shell: {
      lang: "shell",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.shell",
              patterns: [
                { include: "source.shell" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|\.textmate_init)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|\.textmate_init)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.shell",
              patterns: [
                { include: "source.shell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|\.textmate_init)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.shell",
              patterns: [
                { include: "source.shell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|\.textmate_init)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.shell",
              patterns: [
                { include: "source.shell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|\.textmate_init)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.shell",
              patterns: [
                { include: "source.shell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    showAnyClause: {
      captures: {
        "1": { name: "keyword.control.other.typst" }
      },
      match: /(show)\b\p{space}*(?=:)/dgv
    },
    showSelectClause: {
      begin: /(show)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.other.typst" }
      },
      end: /(?=[\]\n\$\:\;\}])/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#markupLabel" },
        { include: "#expression" }
      ]
    },
    showStatement: {
      begin: /(?=(show\b(?!-)))/dgv,
      end: /(?=[\]\$\)\;\[\{\}\p{space}])/dgv,
      name: "meta.expr.show.typst",
      patterns: [
        { include: "#comments" },
        { include: "#showAnyClause" },
        { include: "#showSelectClause" },
        { include: "#showSubstClause" }
      ]
    },
    showSubstClause: {
      begin: /(:)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "punctuation.separator.colon.typst" }
      },
      end: /(?=[\]\n\)\;\}])/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#expression" }
      ]
    },
    sql: {
      lang: "sql",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.sql",
              patterns: [
                { include: "source.sql" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(sql|ddl|dml)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(sql|ddl|dml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.sql",
              patterns: [
                { include: "source.sql" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(sql|ddl|dml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.sql",
              patterns: [
                { include: "source.sql" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(sql|ddl|dml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.sql",
              patterns: [
                { include: "source.sql" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(sql|ddl|dml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.sql",
              patterns: [
                { include: "source.sql" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    strictComments: {
      patterns: [
        { include: "#blockComment" },
        { include: "#strictLineComment" }
      ]
    },
    strictFuncCallOrPropAccess: {
      begin: /(?=(\.)?(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[]))/dgv,
      end: /(?<=[\]\)])(?![\(\.\[])|(?=[\]\#\$\)\,\;\}\p{space}]|(?=\n?$))/dgv,
      name: "meta.expr.call.typst",
      patterns: [
        {
          match: /\./dgv,
          name: "keyword.operator.accessor.typst"
        },
        {
          captures: {
            "0": {
              patterns: [
                { include: "#primitiveFunctions" },
                { include: "#primitiveTypes" },
                {
                  match: /[^\n]*/dgv,
                  name: "entity.name.function.typst"
                }
              ]
            }
          },
          match: /(?<![\]\)\}])\b[_\p{XIDS}][\-_\p{XIDC}]*(?=[\(\[])/dgv
        },
        { include: "#identifier" },
        {
          captures: {
            "1": { name: "meta.brace.round.typst" },
            "2": { name: "meta.brace.round.typst" }
          },
          match: /(\()\p{space}*(\))/dgv
        },
        { include: "#callArgs" },
        { include: "#contentBlock" }
      ]
    },
    strictLineComment: {
      begin: /(?<!:)\/\//dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.typst" }
      },
      end: /(?=(?=\n?$)|\n)/dgv,
      name: "comment.line.double-slash.typst"
    },
    strictMathFuncCallOrPropAccess: {
      begin: /(?=(?:(\.)((?!_)\p{XIDS}(?:(?!_)\p{XIDC})*)|(?:(?<=_)|\b)(?!_)\p{XIDS}(?:(?!_)\p{XIDC})+)(?=\())/dgv,
      end: /(?<=\))(?![\(\.]|(?:(?<=_)|\b)(?!_)\p{XIDS}(?:(?!_)\p{XIDC})+(?=\())|(?=[\]\$\)\,\;\}\p{space}]|(?=\n?$))/dgv,
      name: "meta.expr.call.typst",
      patterns: [
        {
          match: /\./dgv,
          name: "keyword.operator.accessor.typst"
        },
        {
          captures: {
            "0": {
              name: "entity.name.function.typst",
              patterns: [
                { include: "#primitiveFunctions" },
                { include: "#primitiveTypes" },
                {
                  match: /[^\n]*/dgv,
                  name: "entity.name.function.typst"
                }
              ]
            }
          },
          match: /(?:(?<=_)|\b)(?!_)\p{XIDS}(?:(?!_)\p{XIDC})+(?=\()/dgv,
          name: "entity.name.function.typst"
        },
        { include: "#mathIdentifier" },
        {
          captures: {
            "1": { name: "meta.brace.round.typst" },
            "2": { name: "meta.brace.round.typst" }
          },
          match: /(\()\p{space}*(\))/dgv
        },
        { include: "#mathCallArgs" }
      ]
    },
    stringLiteral: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.typst" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.typst" }
      },
      name: "string.quoted.double.typst",
      patterns: [
        {
          captures: {
            "1": { name: "constant.character.escape.string.typst" }
          },
          match: /(\\(?:[^u]|u\{?[0-9A-Za-z]*\}?))|[^"\\]+/dgv
        }
      ]
    },
    swift: {
      lang: "swift",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.swift",
              patterns: [
                { include: "source.swift" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(swift)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(swift)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.swift",
              patterns: [
                { include: "source.swift" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(swift)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.swift",
              patterns: [
                { include: "source.swift" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(swift)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.swift",
              patterns: [
                { include: "source.swift" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(swift)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.swift",
              patterns: [
                { include: "source.swift" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    systemverilog: {
      lang: "systemverilog",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.systemverilog",
              patterns: [
                { include: "source.systemverilog" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(s(?:ystemverilog|vh??))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(s(?:ystemverilog|vh??))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.systemverilog",
              patterns: [
                { include: "source.systemverilog" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(s(?:ystemverilog|vh??))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.systemverilog",
              patterns: [
                { include: "source.systemverilog" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(s(?:ystemverilog|vh??))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.systemverilog",
              patterns: [
                { include: "source.systemverilog" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(s(?:ystemverilog|vh??))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.systemverilog",
              patterns: [
                { include: "source.systemverilog" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    ts: {
      lang: "ts",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.ts",
              patterns: [
                { include: "source.ts" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(t(?:s|ypescript))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(t(?:s|ypescript))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ts",
              patterns: [
                { include: "source.ts" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(t(?:s|ypescript))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ts",
              patterns: [
                { include: "source.ts" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(t(?:s|ypescript))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ts",
              patterns: [
                { include: "source.ts" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(t(?:s|ypescript))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ts",
              patterns: [
                { include: "source.ts" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    tsx: {
      lang: "tsx",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.tsx",
              patterns: [
                { include: "source.tsx" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(tsx)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(tsx)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.tsx",
              patterns: [
                { include: "source.tsx" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(tsx)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.tsx",
              patterns: [
                { include: "source.tsx" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(tsx)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.tsx",
              patterns: [
                { include: "source.tsx" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(tsx)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.tsx",
              patterns: [
                { include: "source.tsx" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    twig: {
      lang: "twig",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.twig",
              patterns: [
                { include: "text.html.twig" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(twig)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(twig)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.twig",
              patterns: [
                { include: "text.html.twig" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(twig)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.twig",
              patterns: [
                { include: "text.html.twig" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(twig)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.twig",
              patterns: [
                { include: "text.html.twig" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(twig)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.twig",
              patterns: [
                { include: "text.html.twig" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    typst: {
      lang: "typst",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.typst",
              patterns: [
                { include: "source.typst" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(typ(?:st|))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(typ(?:st|))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typst",
              patterns: [
                { include: "source.typst" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(typ(?:st|))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typst",
              patterns: [
                { include: "source.typst" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(typ(?:st|))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typst",
              patterns: [
                { include: "source.typst" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(typ(?:st|))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typst",
              patterns: [
                { include: "source.typst" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    "typst-code": {
      lang: "typst-code",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.typst-code",
              patterns: [
                { include: "#code" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(typ(?:st-code|c))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(typ(?:st-code|c))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typst-code",
              patterns: [
                { include: "#code" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(typ(?:st-code|c))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typst-code",
              patterns: [
                { include: "#code" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(typ(?:st-code|c))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typst-code",
              patterns: [
                { include: "#code" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(typ(?:st-code|c))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typst-code",
              patterns: [
                { include: "#code" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    vb: {
      lang: "vb",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.vb",
              patterns: [
                { include: "source.asp.vb.net" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(vb)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(vb)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.vb",
              patterns: [
                { include: "source.asp.vb.net" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(vb)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.vb",
              patterns: [
                { include: "source.asp.vb.net" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(vb)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.vb",
              patterns: [
                { include: "source.asp.vb.net" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(vb)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.vb",
              patterns: [
                { include: "source.asp.vb.net" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    verilog: {
      lang: "verilog",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.verilog",
              patterns: [
                { include: "source.verilog" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(v(?:erilog||h))\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(v(?:erilog||h))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.verilog",
              patterns: [
                { include: "source.verilog" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(v(?:erilog||h))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.verilog",
              patterns: [
                { include: "source.verilog" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(v(?:erilog||h))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.verilog",
              patterns: [
                { include: "source.verilog" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(v(?:erilog||h))\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.verilog",
              patterns: [
                { include: "source.verilog" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    whileClause: {
      begin: /(while)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.loop.typst" }
      },
      end: /(?<!(?:while|and|not|if|or|in|!=|==|<=|>=|[\-\*\+\/\<\>]|=>?|\+=|-=|\*=|\/=)\p{space}*)(?=[\n\[\{])|(?=[\]\n\#\$\)\,\;\}]|(?=\n?$))/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    whileStatement: {
      begin: /(?=(while\b(?!-)))/dgv,
      end: /(?<=[\]\}])(?![\[\{])|(?=[\]\n\$\)\;\}]|(?=\n?$))/dgv,
      name: "meta.expr.while.typst",
      patterns: [
        { include: "#comments" },
        { include: "#whileClause" },
        { include: "#codeBlock" },
        { include: "#contentBlock" }
      ]
    },
    xml: {
      lang: "xml",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.xml",
              patterns: [
                { include: "text.xml" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xml",
              patterns: [
                { include: "text.xml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xml",
              patterns: [
                { include: "text.xml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xml",
              patterns: [
                { include: "text.xml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xml",
              patterns: [
                { include: "text.xml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    xsl: {
      lang: "xsl",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.xsl",
              patterns: [
                { include: "text.xml.xsl" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(xslt??)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(xslt??)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xsl",
              patterns: [
                { include: "text.xml.xsl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(xslt??)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xsl",
              patterns: [
                { include: "text.xml.xsl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(xslt??)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xsl",
              patterns: [
                { include: "text.xml.xsl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(xslt??)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xsl",
              patterns: [
                { include: "text.xml.xsl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    yaml: {
      lang: "yaml",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" },
            "3": {
              name: "meta.embedded.block.yaml",
              patterns: [
                { include: "source.yaml" }
              ]
            },
            "4": { name: "punctuation.definition.raw.end.typst" }
          },
          match: /(`{3,})(ya?ml)\b([^\n]*?)(\1)/dgv,
          name: "markup.raw.block.typst"
        },
        {
          begin: /(`{6})(ya?ml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.yaml",
              patterns: [
                { include: "source.yaml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{6,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{6,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{5})(ya?ml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.yaml",
              patterns: [
                { include: "source.yaml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{5,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{5,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{4})(ya?ml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.yaml",
              patterns: [
                { include: "source.yaml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{4,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{4,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /(`{3})(ya?ml)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.raw.begin.typst" },
            "2": { name: "fenced_code.block.language.typst" }
          },
          end: /\p{space}*(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.raw.end.typst" }
          },
          name: "markup.raw.block.typst",
          patterns: [
            {
              begin: {
                G: [/(^|￿)(\p{space}*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.yaml",
              patterns: [
                { include: "source.yaml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*`{3,}\p{space}*)/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*`{3,}\\p{space}*)", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    }
  },
  dependencies: [
    "bat",
    "bibtex",
    "c",
    "clojure",
    "coffee",
    "cpp",
    "css",
    "csharp",
    "dart",
    "diff",
    "docker",
    "elixir",
    "erlang",
    "fsharp",
    "git-commit",
    "git-rebase",
    "go",
    "groovy",
    "handlebars",
    "html",
    "ini",
    "java",
    "javascript",
    "jsonc",
    "json",
    "julia",
    "latex",
    "less",
    "log",
    "lua",
    "make",
    "markdown",
    "objective-c",
    "perl",
    "raku",
    "php",
    "powershell",
    "pug",
    "r",
    "regexp",
    "ruby",
    "scss",
    "sql",
    "swift",
    "xml",
    "xsl",
    "yaml",
    "python",
    "rust",
    "scala",
    "shellscript",
    "typescript",
    "tsx",
    "twig",
    "verilog",
    "system-verilog",
    "vb"
  ]
};
