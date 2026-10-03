import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "wikitext",
  displayName: "Wikitext",
  aliases: [
    "mediawiki",
    "wiki"
  ],
  scopeName: "source.wikitext",
  patterns: [
    { include: "#wikitext" },
    { include: "text.html.basic" }
  ],
  repository: {
    wikitext: {
      patterns: [
        { include: "#signature" },
        { include: "#redirect" },
        { include: "#magic-words" },
        { include: "#argument" },
        { include: "#template" },
        { include: "#convert" },
        { include: "#list" },
        { include: "#table" },
        { include: "#font-style" },
        { include: "#internal-link" },
        { include: "#external-link" },
        { include: "#heading" },
        { include: "#break" },
        { include: "#wikixml" },
        { include: "#extension-comments" }
      ],
      repository: {
        argument: {
          begin: /(\{\{\{)/dgv,
          end: /(\}\}\})/dgv,
          name: "variable.parameter.wikitext",
          patterns: [
            {
              captures: {
                "1": { name: "variable.other.wikitext" },
                "2": { name: "keyword.operator.wikitext" }
              },
              match: {
                G: [/(?:^|￿)([^\]\#\:\[\{\|\}]*)(\|)/dgv, new EmulatedRegExp("(?:^|^)([^\\]\\#\\:\\[\\{\\|\\}]*)(\\|)", "dgv", { strategy: "clip_search" })]
              }
            },
            { include: "$self" }
          ]
        },
        break: {
          match: /^-{4,}/dgv,
          name: "markup.changed.wikitext"
        },
        convert: {
          begin: /(-\{(?!\{))([A-Za-z](\|))?/dgv,
          captures: {
            "1": { name: "punctuation.definition.tag.template.wikitext" },
            "2": { name: "entity.name.function.type.wikitext" },
            "3": { name: "keyword.operator.wikitext" }
          },
          end: /(\}-)/dgv,
          patterns: [
            { include: "$self" },
            {
              captures: {
                "1": { name: "entity.name.tag.language.wikitext" },
                "2": { name: "punctuation.separator.key-value.wikitext" },
                "3": {
                  name: "string.unquoted.text.wikitext",
                  patterns: [
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.terminator.rule.wikitext" }
              },
              match: /(?:([\-A-Za-z]*)(:))?([^\n]*?)(?:(;)|(?=\}-))/dgv
            }
          ]
        },
        "extension-comments": {
          begin: /(<%--)\p{space}*(\[)([A-Z_]*)(\])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.extension.wikitext" },
            "2": { name: "punctuation.definition.tag.extension.wikitext" },
            "3": { name: "storage.type.extension.wikitext" },
            "4": { name: "punctuation.definition.tag.extension.wikitext" }
          },
          end: /(\[)([A-Z_]*)(\])\p{space}*(--%>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.extension.wikitext" },
            "2": { name: "storage.type.extension.wikitext" },
            "3": { name: "punctuation.definition.tag.extension.wikitext" },
            "4": { name: "punctuation.definition.comment.extension.wikitext" }
          },
          name: "comment.block.documentation.special.extension.wikitext",
          patterns: [
            {
              captures: {
                "0": { name: "meta.object.member.extension.wikitext" },
                "1": { name: "meta.object-literal.key.extension.wikitext" },
                "2": { name: "punctuation.separator.dictionary.key-value.extension.wikitext" },
                "3": { name: "punctuation.definition.string.begin.extension.wikitext" },
                "4": { name: "string.quoted.other.extension.wikitext" },
                "5": { name: "punctuation.definition.string.end.extension.wikitext" }
              },
              match: /([\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(=)\p{space}*(#)([^\n]*?)(#)/dgv
            }
          ]
        },
        "external-link": {
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.tag.link.external.wikitext" },
                "2": { name: "entity.name.tag.url.wikitext" },
                "3": {
                  name: "string.other.link.external.title.wikitext",
                  patterns: [
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.link.external.wikitext" }
              },
              match: /(\[)((?:https?|ftps?):\/\/[\-\.\p{L}\p{M}\p{N}\p{Pc}]+(?:\.[\-\.\p{L}\p{M}\p{N}\p{Pc}]+)+[\!\#-\/\:\;\=\?\@\~\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*?([^\]]*)(\])/dgv,
              name: "meta.link.external.wikitext"
            },
            {
              captures: {
                "1": { name: "punctuation.definition.tag.link.external.wikitext" },
                "2": { name: "invalid.illegal.bad-url.wikitext" },
                "3": {
                  name: "string.other.link.external.title.wikitext",
                  patterns: [
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.link.external.wikitext" }
              },
              match: /(\[)([\-\.\p{L}\p{M}\p{N}\p{Pc}]+(?:\.[\-\.\p{L}\p{M}\p{N}\p{Pc}]+)+[\!\#-\/\:\;\=\?\@\~\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*?([^\]]*)(\])/dgv,
              name: "invalid.illegal.bad-link.wikitext"
            }
          ]
        },
        "font-style": {
          patterns: [
            { include: "#bold" },
            { include: "#italic" }
          ],
          repository: {
            bold: {
              begin: /(''')/dgv,
              end: /(''')|(?=\n?$)/dgv,
              name: "markup.bold.wikitext",
              patterns: [
                { include: "#italic" },
                { include: "$self" }
              ]
            },
            italic: {
              begin: /('')/dgv,
              end: /((?=[^'])|(?=''))''((?=[^'])|(?=''))|(?=\n?$)/dgv,
              name: "markup.italic.wikitext",
              patterns: [
                { include: "#bold" },
                { include: "$self" }
              ]
            }
          }
        },
        heading: {
          captures: {
            "2": {
              name: "string.quoted.other.heading.wikitext",
              patterns: [
                { include: "$self" }
              ]
            }
          },
          match: /^(={1,6})\p{space}*([^\n]+?)\p{space}*(\1)(?=\n?$)/dgv,
          name: "markup.heading.wikitext"
        },
        "internal-link": {
          TODO: "SINGLE LINE",
          begin: /(\[\[)(([^\]\#\:\[\{\|\}]*:)*)?([^\]\[\|]*)?/dgv,
          captures: {
            "1": { name: "punctuation.definition.tag.link.internal.wikitext" },
            "2": { name: "entity.name.tag.namespace.wikitext" },
            "4": { name: "entity.other.attribute-name.wikitext" }
          },
          end: /(\]\])/dgv,
          name: "string.quoted.internal-link.wikitext",
          patterns: [
            { include: "$self" },
            {
              captures: {
                "1": { name: "keyword.operator.wikitext" },
                "5": { name: "entity.other.attribute-name.localname.wikitext" }
              },
              match: /(\|)|\p{space}*(?:([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)((:)))?([\-\.\:\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)/dgv
            }
          ]
        },
        list: {
          name: "markup.list.wikitext",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.list.begin.markdown.wikitext" }
              },
              match: /^([\#\*\:\;]+)/dgv
            }
          ]
        },
        "magic-words": {
          patterns: [
            { include: "#behavior-switches" },
            { include: "#outdated-behavior-switches" },
            { include: "#variables" }
          ],
          repository: {
            "behavior-switches": {
              match: /(__)(NOTOC|FORCETOC|TOC|NOEDITSECTION|NEWSECTIONLINK|NOGALLERY|HIDDENCAT|EXPECTUNUSEDCATEGORY|NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|NOINDEX|STATICREDIRECT|NOGLOBAL|DISAMBIG)(__)/dgiv,
              name: "constant.language.behavior-switcher.wikitext"
            },
            "outdated-behavior-switches": {
              match: /(__)(START|END)(__)/dgiv,
              name: "invalid.deprecated.behavior-switcher.wikitext"
            },
            variables: {
              patterns: [
                {
                  match: /(\{\{)(CURRENTYEAR|CURRENTMONTH1??|CURRENTMONTHNAME|CURRENTMONTHNAMEGEN|CURRENTMONTHABBREV|CURRENTDAY2??|CURRENTDOW|CURRENTDAYNAME|CURRENTTIME|CURRENTHOUR|CURRENTWEEK|CURRENTTIMESTAMP|LOCALYEAR|LOCALMONTH1??|LOCALMONTHNAME|LOCALMONTHNAMEGEN|LOCALMONTHABBREV|LOCALDAY2??|LOCALDOW|LOCALDAYNAME|LOCALTIME|LOCALHOUR|LOCALWEEK|LOCALTIMESTAMP)(\}\})/dgiv,
                  name: "constant.language.variables.time.wikitext"
                },
                {
                  match: /(\{\{)(SITENAME|SERVER|SERVERNAME|DIRMARK|DIRECTIONMARK|SCRIPTPATH|STYLEPATH|CURRENTVERSION|CONTENTLANGUAGE|CONTENTLANG|PAGEID|PAGELANGUAGE|CASCADINGSOURCES|REVISIONID|REVISIONDAY2??|REVISIONMONTH1??|REVISIONYEAR|REVISIONTIMESTAMP|REVISIONUSER|REVISIONSIZE)(\}\})/dgiv,
                  name: "constant.language.variables.metadata.wikitext"
                },
                {
                  match: /ISBN\p{space}+((9[\-\p{space}]?7[\-\p{space}]?[89][\-\p{space}]?)?([0-9][\-\p{space}]?){10})/dgv,
                  name: "constant.language.variables.isbn.wikitext"
                },
                {
                  match: /RFC\p{space}+[0-9]+/dgv,
                  name: "constant.language.variables.rfc.wikitext"
                },
                {
                  match: /PMID\p{space}+[0-9]+/dgv,
                  name: "constant.language.variables.pmid.wikitext"
                }
              ]
            }
          }
        },
        redirect: {
          patterns: [
            {
              captures: {
                "1": { name: "keyword.control.redirect.wikitext" },
                "2": { name: "punctuation.definition.tag.link.internal.begin.wikitext" },
                "3": { name: "entity.name.tag.namespace.wikitext" },
                "4": null,
                "5": { name: "entity.other.attribute-name.wikitext" },
                "6": { name: "invalid.deprecated.ineffective.wikitext" },
                "7": { name: "punctuation.definition.tag.link.internal.end.wikitext" }
              },
              match: /^(\p{space}*?#REDIRECT)\p{space}*(\[\[)(([^\]\#\:\[\{\|\}]*?:)*)?([^\]\[\|]*)?(\|[^\]\[]*?)?(\]\])/dgiv
            }
          ]
        },
        signature: {
          patterns: [
            {
              match: /~{3,5}/dgv,
              name: "keyword.other.signature.wikitext"
            }
          ]
        },
        table: {
          patterns: [
            {
              begin: /^\p{space}*(\{\|)([^\n]*)(?=\n?$)/dgv,
              captures: {
                "1": { name: "punctuation.definition.tag.table.wikitext" },
                "2": {
                  patterns: [
                    { include: "text.html.basic#attribute" }
                  ]
                }
              },
              end: /^\p{space}*(\|\})/dgv,
              name: "meta.tag.block.table.wikitext",
              patterns: [
                { include: "$self" },
                {
                  captures: {
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": {
                      patterns: [
                        { include: "$self" },
                        {
                          match: /\|[^\n]*/dgv,
                          name: "invalid.illegal.bad-table-context.wikitext"
                        },
                        { include: "text.html.basic#attribute" }
                      ]
                    }
                  },
                  match: /^\p{space}*(\|-)\p{space}*([^\n]*)(?=\n?$)/dgv,
                  name: "meta.tag.block.table-row.wikitext"
                },
                {
                  begin: /^\p{space}*(!)(([^\[]*?)(\|))?([^\n]*?)(?=(!!)|(?=\n?$))/dgv,
                  beginCaptures: {
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": null,
                    "3": {
                      patterns: [
                        { include: "$self" },
                        { include: "text.html.basic#attribute" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.wikitext" },
                    "5": { name: "markup.bold.style.wikitext" }
                  },
                  end: /(?=\n?$)/dgv,
                  name: "meta.tag.block.th.heading",
                  patterns: [
                    {
                      captures: {
                        "1": { name: "punctuation.definition.tag.begin.wikitext" },
                        "3": {
                          patterns: [
                            { include: "$self" },
                            { include: "text.html.basic#attribute" }
                          ]
                        },
                        "4": { name: "punctuation.definition.tag.wikitext" },
                        "5": { name: "markup.bold.style.wikitext" }
                      },
                      match: /(!!)(([^\[]*?)(\|))?([^\n]*?)(?=(!!)|(?=\n?$))/dgv,
                      name: "meta.tag.block.th.inline.wikitext"
                    },
                    { include: "$self" }
                  ]
                },
                {
                  captures: {
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "string.unquoted.caption.wikitext" }
                  },
                  end: /(?=\n?$)/dgv,
                  match: /^\p{space}*(\|\+)([^\n]*?)(?=\n?$)/dgv,
                  name: "meta.tag.block.caption.wikitext",
                  patterns: [
                    { include: "$self" }
                  ]
                },
                {
                  begin: /^\p{space}*(\|)/dgv,
                  beginCaptures: {
                    "1": { name: "punctuation.definition.tag.wikitext" }
                  },
                  end: /(?=\n?$)/dgv,
                  patterns: [
                    {
                      captures: {
                        "1": {
                          patterns: [
                            { include: "$self" },
                            { include: "text.html.basic#attribute" }
                          ]
                        },
                        "2": { name: "punctuation.definition.tag.wikitext" }
                      },
                      match: /\p{space}*([^\|]+)\p{space}*(?<!\|)(\|)(?!\|)/dgv
                    },
                    {
                      match: /\|\|/dgv,
                      name: "punctuation.definition.tag.wikitext"
                    },
                    { include: "$self" }
                  ]
                }
              ]
            }
          ]
        },
        template: {
          begin: /(\{\{)\p{space}*(([^\]\#\:\[\{\|\}]*(:))*)\p{space}*((#[^\]\#\:\[\{\|\}]+(:))*)([^\]\#\:\[\{\|\}]*)/dgv,
          captures: {
            "1": { name: "punctuation.definition.tag.template.wikitext" },
            "2": { name: "entity.name.tag.local-name.wikitext" },
            "4": { name: "punctuation.separator.namespace.wikitext" },
            "5": { name: "entity.name.function.wikitext" },
            "7": { name: "punctuation.separator.namespace.wikitext" },
            "8": { name: "entity.name.tag.local-name.wikitext" }
          },
          end: /(\}\})/dgv,
          patterns: [
            { include: "$self" },
            {
              match: /(\|)/dgv,
              name: "keyword.operator.wikitext"
            },
            {
              captures: {
                "1": { name: "entity.other.attribute-name.namespace.wikitext" },
                "2": { name: "punctuation.separator.namespace.wikitext" },
                "3": { name: "entity.other.attribute-name.local-name.wikitext" },
                "4": { name: "keyword.operator.equal.wikitext" }
              },
              match: /(?<=\|)\p{space}*(?:([\-\.\p{L}\p{M}\p{N}\p{Pc}]+)(:))?([\-\.\:\p{L}\p{M}\p{N}\p{Pc}\p{space}]+)\p{space}*(=)/dgv
            }
          ]
        },
        wikixml: {
          patterns: [
            { include: "#wiki-self-closed-tags" },
            { include: "#normal-wiki-tags" },
            { include: "#nowiki" },
            { include: "#ref" },
            { include: "#jsonin" },
            { include: "#math" },
            { include: "#syntax-highlight" }
          ],
          repository: {
            jsonin: {
              begin: /(<)(graph|templatedata)(\p{space}+[^\>]+)?\p{space}*(>)/dgiv,
              beginCaptures: {
                "0": { name: "meta.tag.metadata.start.wikitext" },
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": {
                  patterns: [
                    { include: "text.html.basic#attribute" },
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.end.wikitext" }
              },
              contentName: "meta.embedded.block.json",
              end: /(<\/)(2)\p{space}*(>)/dgv,
              endCaptures: {
                "0": { name: "meta.tag.metadata.end.wikitext" },
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": { name: "punctuation.definition.tag.end.wikitext" }
              },
              patterns: [
                { include: "source.json" }
              ]
            },
            math: {
              begin: /(<)(math|chem|ce)(\p{space}+[^\>]+)?\p{space}*(>)/dgiv,
              beginCaptures: {
                "0": { name: "meta.tag.metadata.start.wikitext" },
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": {
                  patterns: [
                    { include: "text.html.basic#attribute" },
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.end.wikitext" }
              },
              contentName: "meta.embedded.block.latex",
              end: /(<\/)(2)\p{space}*(>)/dgv,
              endCaptures: {
                "0": { name: "meta.tag.metadata.end.wikitext" },
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": { name: "punctuation.definition.tag.end.wikitext" }
              },
              patterns: [
                { include: "text.html.markdown.math#math" }
              ]
            },
            "normal-wiki-tags": {
              captures: {
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": {
                  patterns: [
                    { include: "text.html.basic#attribute" },
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.end.wikitext" }
              },
              match: /(<\/?)(includeonly|onlyinclude|noinclude)(\p{space}+[^\>]+)?\p{space}*(>)/dgiv,
              name: "meta.tag.metedata.normal.wikitext"
            },
            nowiki: {
              begin: /(<)(nowiki)(\p{space}+[^\>]+)?\p{space}*(>)/dgiv,
              beginCaptures: {
                "0": { name: "meta.tag.metadata.nowiki.start.wikitext" },
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": {
                  patterns: [
                    { include: "text.html.basic#attribute" },
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.end.wikitext" }
              },
              contentName: "meta.embedded.block.plaintext",
              end: /(<\/)(nowiki)\p{space}*(>)/dgiv,
              endCaptures: {
                "0": { name: "meta.tag.metadata.nowiki.end.wikitext" },
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": { name: "punctuation.definition.tag.end.wikitext" }
              }
            },
            ref: {
              begin: /(<)(ref)(\p{space}+[^\>]+)?\p{space}*(>)/dgiv,
              beginCaptures: {
                "0": { name: "meta.tag.metadata.ref.start.wikitext" },
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": {
                  patterns: [
                    { include: "text.html.basic#attribute" },
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.end.wikitext" }
              },
              contentName: "meta.block.ref.wikitext",
              end: /(<\/)(ref)\p{space}*(>)/dgiv,
              endCaptures: {
                "0": { name: "meta.tag.metadata.ref.end.wikitext" },
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": { name: "punctuation.definition.tag.end.wikitext" }
              },
              patterns: [
                { include: "$self" }
              ]
            },
            "syntax-highlight": {
              patterns: [
                { include: "#hl-css" },
                { include: "#hl-html" },
                { include: "#hl-ini" },
                { include: "#hl-java" },
                { include: "#hl-lua" },
                { include: "#hl-makefile" },
                { include: "#hl-perl" },
                { include: "#hl-r" },
                { include: "#hl-ruby" },
                { include: "#hl-php" },
                { include: "#hl-sql" },
                { include: "#hl-vb-net" },
                { include: "#hl-xml" },
                { include: "#hl-xslt" },
                { include: "#hl-yaml" },
                { include: "#hl-bat" },
                { include: "#hl-clojure" },
                { include: "#hl-coffee" },
                { include: "#hl-c" },
                { include: "#hl-cpp" },
                { include: "#hl-diff" },
                { include: "#hl-dockerfile" },
                { include: "#hl-go" },
                { include: "#hl-groovy" },
                { include: "#hl-pug" },
                { include: "#hl-js" },
                { include: "#hl-json" },
                { include: "#hl-less" },
                { include: "#hl-objc" },
                { include: "#hl-swift" },
                { include: "#hl-scss" },
                { include: "#hl-perl6" },
                { include: "#hl-powershell" },
                { include: "#hl-python" },
                { include: "#hl-julia" },
                { include: "#hl-rust" },
                { include: "#hl-scala" },
                { include: "#hl-shell" },
                { include: "#hl-ts" },
                { include: "#hl-csharp" },
                { include: "#hl-fsharp" },
                { include: "#hl-dart" },
                { include: "#hl-handlebars" },
                { include: "#hl-markdown" },
                { include: "#hl-erlang" },
                { include: "#hl-elixir" },
                { include: "#hl-latex" },
                { include: "#hl-bibtex" }
              ],
              repository: {
                "hl-bat": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)(["']?)(?:batch|bat|dosbatch|winbatch)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.bat",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.batchfile" }
                      ]
                    }
                  ]
                },
                "hl-bibtex": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)bib(?:tex|)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.bibtex",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "text.bibtex" }
                      ]
                    }
                  ]
                },
                "hl-c": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)c\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.c",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.c" }
                      ]
                    }
                  ]
                },
                "hl-clojure": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)cl(?:ojure|j)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.clojure",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.clojure" }
                      ]
                    }
                  ]
                },
                "hl-coffee": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)coffee(?:script|-script|)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.coffee",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.coffee" }
                      ]
                    }
                  ]
                },
                "hl-cpp": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)c(?:pp|\+\+)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.cpp",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.cpp" }
                      ]
                    }
                  ]
                },
                "hl-csharp": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)c(?:sharp|[\#s])\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.csharp",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.cs" }
                      ]
                    }
                  ]
                },
                "hl-css": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)css\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.css",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.css" }
                      ]
                    }
                  ]
                },
                "hl-dart": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)dart\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.dart",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.dart" }
                      ]
                    }
                  ]
                },
                "hl-diff": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)u??diff\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.diff",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.diff" }
                      ]
                    }
                  ]
                },
                "hl-dockerfile": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)docker(?:|file)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.dockerfile",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.dockerfile" }
                      ]
                    }
                  ]
                },
                "hl-elixir": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)e(?:lixir|xs??)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.elixir",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.elixir" }
                      ]
                    }
                  ]
                },
                "hl-erlang": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)erlang\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.erlang",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.erlang" }
                      ]
                    }
                  ]
                },
                "hl-fsharp": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)f(?:sharp|#)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.fsharp",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.fsharp" }
                      ]
                    }
                  ]
                },
                "hl-go": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)go(?:|lang)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.go",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.go" }
                      ]
                    }
                  ]
                },
                "hl-groovy": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)groovy\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.groovy",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.groovy" }
                      ]
                    }
                  ]
                },
                "hl-handlebars": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)handlebars\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.handlebars",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "text.html.handlebars" }
                      ]
                    }
                  ]
                },
                "hl-html": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)html\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.html",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "text.html.basic" }
                      ]
                    }
                  ]
                },
                "hl-ini": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)(?:ini|cfg|dosini)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.ini",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.ini" }
                      ]
                    }
                  ]
                },
                "hl-java": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)java\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.java",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.java" }
                      ]
                    }
                  ]
                },
                "hl-js": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)j(?:avascript|s)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.js",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.js" }
                      ]
                    }
                  ]
                },
                "hl-json": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"json"|'json'|"json-object"|'json-object')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.json",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.json.comments" }
                      ]
                    }
                  ]
                },
                "hl-julia": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"julia"|'julia'|"jl"|'jl')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.julia",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.julia" }
                      ]
                    }
                  ]
                },
                "hl-latex": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)(?:|la)tex\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.latex",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "text.tex.latex" }
                      ]
                    }
                  ]
                },
                "hl-less": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"less"|'less')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.less",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.css.less" }
                      ]
                    }
                  ]
                },
                "hl-lua": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)lua\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.lua",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.lua" }
                      ]
                    }
                  ]
                },
                "hl-makefile": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)(?:make|makefile|mf|bsdmake)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.makefile",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.makefile" }
                      ]
                    }
                  ]
                },
                "hl-markdown": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)m(?:arkdown|d)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.markdown",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "text.html.markdown" }
                      ]
                    }
                  ]
                },
                "hl-objc": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"objective-c"|'objective-c'|"objectivec"|'objectivec'|"obj-c"|'obj-c'|"objc"|'objc')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.objc",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.objc" }
                      ]
                    }
                  ]
                },
                "hl-perl": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)p(?:erl|le)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.perl",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.perl" }
                      ]
                    }
                  ]
                },
                "hl-perl6": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"perl6"|'perl6'|"pl6"|'pl6'|"raku"|'raku')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.perl6",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.perl.6" }
                      ]
                    }
                  ]
                },
                "hl-php": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)php[345]??\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.php",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.php" }
                      ]
                    }
                  ]
                },
                "hl-powershell": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"powershell"|'powershell'|"pwsh"|'pwsh'|"posh"|'posh'|"ps1"|'ps1'|"psm1"|'psm1')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.powershell",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.powershell" }
                      ]
                    }
                  ]
                },
                "hl-pug": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)(?:pug|jade)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.pug",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "text.pug" }
                      ]
                    }
                  ]
                },
                "hl-python": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"python"|'python'|"py"|'py'|"sage"|'sage'|"python3"|'python3'|"py3"|'py3')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.python",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.python" }
                      ]
                    }
                  ]
                },
                "hl-r": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)(?:splus|[rs])\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.r",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.r" }
                      ]
                    }
                  ]
                },
                "hl-ruby": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)(?:ruby|rb|duby)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.ruby",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.ruby" }
                      ]
                    }
                  ]
                },
                "hl-rust": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"rust"|'rust'|"rs"|'rs')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: null,
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.rust" }
                      ]
                    }
                  ]
                },
                "hl-scala": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"scala"|'scala')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.scala",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.scala" }
                      ]
                    }
                  ]
                },
                "hl-scss": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"scss"|'scss')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.scss",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.css.scss" }
                      ]
                    }
                  ]
                },
                "hl-shell": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"bash"|'bash'|"sh"|'sh'|"ksh"|'ksh'|"zsh"|'zsh'|"shell"|'shell')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.shell",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.shell" }
                      ]
                    }
                  ]
                },
                "hl-sql": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)sql\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.sql",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.sql" }
                      ]
                    }
                  ]
                },
                "hl-swift": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"swift"|'swift')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.swift",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.swift" }
                      ]
                    }
                  ]
                },
                "hl-ts": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(?:"typescript"|'typescript'|"ts"|'ts')(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "4": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.ts",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.ts" }
                      ]
                    }
                  ]
                },
                "hl-vb-net": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)(?:vb\.net|vbnet|lobas|oobas|sobas)\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.vb-net",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.asp.vb.net" }
                      ]
                    }
                  ]
                },
                "hl-xml": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)xml\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.xml",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "text.xml" }
                      ]
                    }
                  ]
                },
                "hl-xslt": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)xslt\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.xslt",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "text.xml.xsl" }
                      ]
                    }
                  ]
                },
                "hl-yaml": {
                  begin: /(<)(syntaxhighlight)((?:\p{space}+[^\>]+)?\p{space}+lang=(["']?)yaml\4(?:\p{space}+[^\>]+)?)\p{space}*(>)/dgiv,
                  beginCaptures: {
                    "0": { name: "meta.tag.metadata.start.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": {
                      patterns: [
                        { include: "text.html.basic#attribute" },
                        { include: "$self" }
                      ]
                    },
                    "5": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  end: /(<\/)(syntaxhighlight)\p{space}*(>)/dgiv,
                  endCaptures: {
                    "0": { name: "meta.tag.metadata.end.wikitext" },
                    "1": { name: "punctuation.definition.tag.begin.wikitext" },
                    "2": { name: "entity.name.tag.wikitext" },
                    "3": { name: "punctuation.definition.tag.end.wikitext" }
                  },
                  patterns: [
                    {
                      begin: {
                        G: [/(^|￿)/dgv, new EmulatedRegExp("(^|^)", "dgv", { strategy: "clip_search" })]
                      },
                      contentName: "meta.embedded.block.yaml",
                      end: /(?=<\/syntaxhighlight\p{space}*>)/dgiv,
                      patterns: [
                        { include: "source.yaml" }
                      ]
                    }
                  ]
                }
              }
            },
            "wiki-self-closed-tags": {
              captures: {
                "1": { name: "punctuation.definition.tag.begin.wikitext" },
                "2": { name: "entity.name.tag.wikitext" },
                "3": {
                  patterns: [
                    { include: "text.html.basic#attribute" },
                    { include: "$self" }
                  ]
                },
                "4": { name: "punctuation.definition.tag.end.wikitext" }
              },
              match: /(<)(templatestyles|ref|nowiki|onlyinclude|includeonly)(\p{space}+[^\>]+)?\p{space}*(\/>)/dgiv,
              name: "meta.tag.metedata.void.wikitext"
            }
          }
        }
      }
    }
  },
  dependencies: []
};
