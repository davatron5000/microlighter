import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "asciidoc",
  displayName: "AsciiDoc",
  aliases: [
    "adoc"
  ],
  scopeName: "text.asciidoc",
  patterns: [
    { include: "#comment" },
    { include: "#callout-list-item" },
    { include: "#titles" },
    { include: "#attribute-entry" },
    { include: "#blocks" },
    { include: "#block-title" },
    { include: "#tables" },
    { include: "#horizontal-rule" },
    { include: "#list" },
    { include: "#inlines" },
    { include: "#block-attribute" },
    { include: "#line-break" }
  ],
  repository: {
    "admonition-paragraph": {
      patterns: [
        {
          begin: new EmulatedRegExp("(?=(?:(?=(^\\[(NOTE|TIP|IMPORTANT|WARNING|CAUTION)([\\#\\%\\,\\.][^\\]]+)*\\](?=\\n?$)))\\1))", "dgv", { hiddenCaptures: [1] }),
          end: /((?<=--|====)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.admonition.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[(NOTE|TIP|IMPORTANT|WARNING|CAUTION)([\#\%\,\.]([^\]\,]+))*\](?=\n?$)/dgv
            },
            { include: "#inlines" },
            { include: "#block-title" },
            {
              begin: /^(={4,})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "$self" }
              ]
            },
            {
              begin: /^(-{2})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "$self" }
              ]
            }
          ]
        },
        {
          begin: /^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):[\p{Zs}\t]+/dgv,
          captures: {
            "1": { name: "entity.name.function.asciidoc" }
          },
          end: /^[\p{Zs}\t]*(?=\n?$)|(?=^\/{2})/dgv,
          name: "markup.admonition.asciidoc",
          patterns: [
            { include: "#inlines" }
          ]
        }
      ]
    },
    "anchor-macro": {
      patterns: [
        {
          captures: {
            "1": { name: "support.constant.asciidoc" },
            "2": { name: "markup.blockid.asciidoc" },
            "3": { name: "string.unquoted.asciidoc" },
            "4": { name: "support.constant.asciidoc" }
          },
          match: /(?<!\\)(\[{2})([\:_\p{Alpha}][\-\.\:\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)(?:,[\p{Zs}\t]*(\P{space}[^\n]*?))?(\]{2})/dgv,
          name: "markup.other.anchor.asciidoc"
        },
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "markup.blockid.asciidoc" },
            "3": { name: "string.unquoted.asciidoc" }
          },
          match: /(?<!\\)(anchor):(\P{space}+)\[([^\n]*?[^\\])?\]/dgv,
          name: "markup.other.anchor.asciidoc"
        }
      ]
    },
    "attribute-entry": {
      patterns: [
        {
          begin: /^(:)(!?[\p{L}\p{M}\p{N}\p{Pc}][^\n]*?)(:)([\p{Zs}\t]+[^\n]+[\p{Zs}\t][\+\\])(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.attribute-entry.asciidoc" },
            "2": { name: "support.constant.attribute-name.asciidoc" },
            "3": { name: "punctuation.separator.attribute-entry.asciidoc" },
            "4": {
              name: "string.unquoted.attribute-value.asciidoc",
              patterns: [
                { include: "#inlines" },
                { include: "#hard-break-backslash" },
                { include: "#line-break" },
                { include: "#line-break-backslash" }
              ]
            }
          },
          contentName: "string.unquoted.attribute-value.asciidoc",
          end: /^(?:[\p{Zs}\t]+[^\n]+(?=\n?$)(?<![\+\\])|[\p{Zs}\t]*(?=\n?$))/dgv,
          endCaptures: {
            "0": { name: "string.unquoted.attribute-value.asciidoc" }
          },
          name: "meta.definition.attribute-entry.asciidoc",
          patterns: [
            { include: "#inlines" },
            { include: "#hard-break-backslash" },
            { include: "#line-break" },
            { include: "#line-break-backslash" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.separator.asciidoc" },
            "2": { name: "support.constant.attribute-name.asciidoc" },
            "3": { name: "punctuation.separator.asciidoc" },
            "4": {
              name: "string.unquoted.attribute-value.asciidoc",
              patterns: [
                { include: "#inlines" },
                { include: "#line-break" }
              ]
            }
          },
          match: /^(:)(!?[\p{L}\p{M}\p{N}\p{Pc}][^\n]*?)(:)([\p{Zs}\t]+([^\n]*))?(?=\n?$)/dgv,
          name: "meta.definition.attribute-entry.asciidoc"
        }
      ]
    },
    "attribute-reference": {
      patterns: [
        {
          captures: {
            "2": { name: "entity.name.function.asciidoc" },
            "3": { name: "punctuation.separator.asciidoc" },
            "4": { name: "support.constant.attribute-name.asciidoc" },
            "6": { name: "punctuation.separator.asciidoc" },
            "7": { name: "string.unquoted.attribute-value.asciidoc" }
          },
          match: /(?<!\\)(\{)(set|counter2?)(:)([\-\!_\p{Alpha}\p{Nd}]+)((:)([^\n]*?))?(?<!\\)(\})/dgv,
          name: "markup.substitution.attribute-reference.asciidoc"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.attribute-reference.begin.asciidoc" },
            "2": { name: "support.constant.attribute-name.asciidoc" },
            "3": { name: "punctuation.definition.attribute-reference.end.asciidoc" }
          },
          match: /(?<!\\)(\{)([\p{L}\p{M}\p{N}\p{Pc}]+(?:-[\p{L}\p{M}\p{N}\p{Pc}]+)*)(?<!\\)(\})/dgv,
          name: "markup.substitution.attribute-reference.asciidoc"
        }
      ]
    },
    "bibliography-anchor": {
      patterns: [
        {
          captures: {
            "1": { name: "support.constant.asciidoc" },
            "2": { name: "markup.biblioref.asciidoc" },
            "3": { name: "support.constant.asciidoc" }
          },
          match: /(?<!\\)(\[{3})([\:\p{Alpha}\p{M}\p{Nd}\p{Pc}][\-\.\:\p{Alpha}\p{M}\p{Nd}\p{Pc}]*?)(\]{3})/dgv,
          name: "bibliography-anchor.asciidoc"
        }
      ]
    },
    "bibtex-macro": {
      patterns: [
        {
          begin: /(?<!\\)(citenp:)([\,a-z]*)(\[)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "markup.meta.attribute-list.asciidoc" }
          },
          contentName: "string.unquoted.asciidoc",
          end: /(?<!\\)\]|^(?=\n?$)/dgv,
          name: "markup.macro.inline.bibtex.asciidoc"
        }
      ]
    },
    "block-attribute": {
      patterns: [
        {
          captures: {
            "0": {
              patterns: [
                { include: "#block-attribute-inner" }
              ]
            }
          },
          match: /^\[(|[\p{Zs}\t]*["\#\%'\,\.\{\p{Alpha}\p{M}\p{Nd}\p{Pc}][^\n]*)\](?=\n?$)/dgv,
          name: "markup.heading.block-attribute.asciidoc"
        }
      ]
    },
    "block-attribute-inner": {
      patterns: [
        {
          match: /([\#\%\,\.])/dgv,
          name: "punctuation.separator.asciidoc"
        },
        {
          captures: {
            "0": {
              name: "markup.meta.attribute-list.asciidoc",
              patterns: [
                { include: "#keywords" }
              ]
            }
          },
          match: /(?<=\[)([^\]\#\%\,\.\=\[]+)/dgv
        },
        {
          captures: {
            "0": {
              patterns: [
                { include: "#attribute-reference" }
              ]
            }
          },
          match: /(?<=[\,\{]|[^\n]|["\#\%'])((?:[^\]\#\%\,\.]|\](?=[\t ]*\P{space}))+)/dgv,
          name: "markup.meta.attribute-list.asciidoc"
        }
      ]
    },
    "block-callout": {
      patterns: [
        {
          captures: {
            "2": { name: "constant.other.symbol.asciidoc" },
            "4": { name: "constant.numeric.asciidoc" },
            "5": { name: "constant.other.symbol.asciidoc" }
          },
          match: /(?:(?:\/\/|#|--|;;) ?)?( )?(?<!\\)(<)!?(--|)(\p{Nd}+)\3(>)(?=(?: ?<!?\3\p{Nd}+\3>)*(?=\n?$))/dgv,
          name: "callout.source.code.asciidoc"
        }
      ]
    },
    "block-title": {
      patterns: [
        {
          begin: /^\.([^\.\p{Zs}\t][^\n]*)/dgv,
          captures: {
            "1": { name: "markup.heading.blocktitle.asciidoc" }
          },
          end: /(?=\n?$)/dgv
        }
      ]
    },
    blocks: {
      patterns: [
        { include: "#front-matter-block" },
        { include: "#comment-paragraph" },
        { include: "#admonition-paragraph" },
        { include: "#quote-paragraph" },
        { include: "#listing-paragraph" },
        { include: "#source-paragraphs" },
        { include: "#passthrough-paragraph" },
        { include: "#example-paragraph" },
        { include: "#sidebar-paragraph" },
        { include: "#literal-paragraph" },
        { include: "#open-block" }
      ]
    },
    "callout-list-item": {
      patterns: [
        {
          captures: {
            "1": { name: "constant.other.symbol.asciidoc" },
            "2": { name: "constant.numeric.asciidoc" },
            "3": { name: "constant.other.symbol.asciidoc" },
            "4": {
              patterns: [
                { include: "#inlines" }
              ]
            }
          },
          match: /^(<)(\p{Nd}+)(>)[\p{Zs}\t]+([^\n]*)(?=\n?$)/dgv,
          name: "callout.asciidoc"
        }
      ]
    },
    characters: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.character.asciidoc" },
            "3": { name: "constant.character.asciidoc" }
          },
          match: /(?<!\\)(&)(\P{space}+?)(;)/dgv,
          name: "markup.character-reference.asciidoc"
        }
      ]
    },
    comment: {
      patterns: [
        {
          begin: /^(\/{4,})(?=\n?$)/dgv,
          end: /^1(?=\n?$)/dgv,
          name: "comment.block.asciidoc",
          patterns: [
            { include: "#inlines" }
          ]
        },
        {
          match: /^\/{2}([^\/][^\n]*)?(?=\n?$)/dgv,
          name: "comment.inline.asciidoc"
        }
      ]
    },
    "comment-paragraph": {
      patterns: [
        {
          begin: new EmulatedRegExp("(?=(?:(?=(^\\[(comment)([\\#\\%\\,\\.][^\\]]+)*\\](?=\\n?$)))\\1))", "dgv", { hiddenCaptures: [1] }),
          end: /((?<=--)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "comment.block.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[(comment)([\#\%\,\.]([^\]\,]+))*\](?=\n?$)/dgv
            },
            { include: "#block-title" },
            {
              begin: /^(-{2})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "#inlines" },
                { include: "#list" }
              ]
            },
            { include: "#inlines" }
          ]
        }
      ]
    },
    emphasis: {
      patterns: [
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.italic.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<!\\\\)(\[[^\]]+?\])?((__)((?!_)[^\n]+?)(__))/dgv,
          name: "markup.emphasis.unconstrained.asciidoc"
        },
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.italic.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?!_{4,}\p{space}*(?=\n?$))(?<=^|[^\:\;\p{Alpha}\p{M}\p{Nd}\p{Pc}])(\[[^\]]+?\])?((_)(\P{space}(?:|[^\n]*?\P{space}))(_))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          name: "markup.emphasis.constrained.asciidoc"
        }
      ]
    },
    "example-paragraph": {
      patterns: [
        {
          begin: new EmulatedRegExp("(?=(?:(?=(^\\[(example)([\\#\\%\\,\\.][^\\]]+)*\\](?=\\n?$)))\\1))", "dgv", { hiddenCaptures: [1] }),
          end: /((?<=--|====)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.block.example.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[(example)([\#\%\,\.]([^\]\,]+))*\](?=\n?$)/dgv
            },
            { include: "#block-title" },
            {
              begin: /^(={4,})(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "$self" }
              ]
            },
            {
              begin: /^(-{2})(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "$self" }
              ]
            },
            { include: "#inlines" }
          ]
        },
        {
          begin: /^(={4,})(?=\n?$)/dgv,
          end: /^(1)(?=\n?$)/dgv,
          name: "markup.block.example.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "footnote-macro": {
      patterns: [
        {
          begin: /(?<!\\)footnote(?:(ref):|:([\-\p{L}\p{M}\p{N}\p{Pc}]+)?)\[([^\n]*?[^\\])??/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "support.constant.attribute-name.asciidoc" }
          },
          contentName: "string.unquoted.asciidoc",
          end: /(?<!\\)\]|^(?=\n?$)/dgv,
          name: "markup.other.footnote.asciidoc",
          patterns: [
            { include: "#inlines" }
          ]
        }
      ]
    },
    "front-matter-block": {
      patterns: [
        {
          begin: {
            A: [/￿(-{3})(?=\n?$)/dgv, /^(-{3})(?=\n?$)/dgv]
          },
          end: /^(1)(?=\n?$)/dgv,
          name: "markup.block.front-matter.asciidoc",
          patterns: [
            { include: "source.yaml" }
          ]
        }
      ]
    },
    "general-block-macro": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "punctuation.separator.asciidoc" },
            "3": {
              name: "markup.link.asciidoc",
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "4": { name: "punctuation.separator.asciidoc" },
            "5": {
              name: "string.unquoted.asciidoc",
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "6": { name: "punctuation.separator.asciidoc" }
          },
          match: /^([\p{Alpha}\p{M}\p{Nd}\p{Pc}]+)(::)(\P{space}*?)(\[)((?:\\\]|[^\]])*?)(\])[\t ]*(?=\n?$)/dgv,
          name: "markup.macro.block.general.asciidoc"
        }
      ]
    },
    "hard-break-backslash": {
      patterns: [
        {
          captures: {
            "1": { name: "constant.other.symbol.hard-break.asciidoc" }
          },
          match: /(?<=\P{space})[\p{Zs}\t]+(\+ \\)(?=\n?$)/dgv
        }
      ]
    },
    "horizontal-rule": {
      patterns: [
        {
          match: /^(?:['\<]{3,}| {0,3}([\-'\*])( *)\1\2\1)(?=\n?$)/dgv,
          name: "constant.other.symbol.horizontal-rule.asciidoc"
        }
      ]
    },
    "image-macro": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "markup.link.asciidoc" },
            "3": { name: "string.unquoted.asciidoc" }
          },
          match: /(?<!\\)(i(?:mage|con)):([^\:\[][^\[]*)\[((?:\\\]|[^\]])*?)\]/dgv,
          name: "markup.macro.image.asciidoc"
        }
      ]
    },
    "include-directive": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "punctuation.separator.asciidoc" },
            "3": {
              name: "markup.link.asciidoc",
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "4": { name: "punctuation.separator.asciidoc" },
            "5": {
              name: "string.unquoted.asciidoc",
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "6": { name: "punctuation.separator.asciidoc" }
          },
          match: /^(include)(::)([^\[]+)(\[)([^\n]*?)(\])(?=\n?$)/dgv
        }
      ]
    },
    "indexterm-concealed": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.indexterm.begin.asciidoc" },
            "2": {
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "3": { name: "punctuation.definition.indexterm.end.asciidoc" }
          },
          match: /(?<!\\)(\(\(\()([^\n]*?)(\)\)\))/dgv,
          name: "markup.other.indexterm.concealed.asciidoc"
        },
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "punctuation.separator.asciidoc" },
            "3": { name: "punctuation.definition.indexterm.begin.asciidoc" },
            "4": {
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "5": { name: "punctuation.definition.indexterm.end.asciidoc" }
          },
          match: /(?<!\\)(indexterm)(:)(\[)((?:\\\]|[^\]])*?)(\])/dgv,
          name: "markup.other.indexterm.concealed.asciidoc"
        }
      ]
    },
    "indexterm-flow": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.indexterm.begin.asciidoc" },
            "2": {
              name: "markup.other.indexterm.flow.asciidoc",
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "3": { name: "punctuation.definition.indexterm.end.asciidoc" }
          },
          match: /(?<![\(\\])(\(\()([^\(][^\n]*?)(\)\))/dgv
        },
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "punctuation.separator.asciidoc" },
            "3": { name: "punctuation.definition.indexterm.begin.asciidoc" },
            "4": {
              name: "markup.other.indexterm.flow.asciidoc",
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "5": { name: "punctuation.definition.indexterm.end.asciidoc" }
          },
          match: /(?<!\\)(indexterm2)(:)(\[)((?:\\\]|[^\]])*?)(\])/dgv
        }
      ]
    },
    inlines: {
      patterns: [
        { include: "#typographic-quotes" },
        { include: "#strong" },
        { include: "#monospace" },
        { include: "#emphasis" },
        { include: "#superscript" },
        { include: "#subscript" },
        { include: "#mark" },
        { include: "#general-block-macro" },
        { include: "#anchor-macro" },
        { include: "#footnote-macro" },
        { include: "#indexterm-concealed" },
        { include: "#indexterm-flow" },
        { include: "#image-macro" },
        { include: "#kbd-macro" },
        { include: "#link-macro" },
        { include: "#stem-macro" },
        { include: "#menu-macro" },
        { include: "#passthrough-macro" },
        { include: "#xref-macro" },
        { include: "#attribute-reference" },
        { include: "#characters" },
        { include: "#bibtex-macro" },
        { include: "#bibliography-anchor" }
      ]
    },
    "kbd-macro": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "3": { name: "string.unquoted.asciidoc" }
          },
          match: /(?<!\\)(kbd|btn):(\[)((?:\\\]|[^\]])+?)(\])/dgv,
          name: "markup.macro.kbd.asciidoc"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /(NOTE|TIP|IMPORTANT|WARNING|CAUTION)/dgv,
          name: "entity.name.function.asciidoc"
        },
        {
          match: /(comment|example|literal|listing|normal|pass|quote|sidebar|source|verse|abstract|partintro)/dgv,
          name: "entity.name.function.asciidoc"
        },
        {
          match: /(actdiag|blockdiag|ditaa|graphviz|tikz|meme|mermaid|nwdiag|packetdiag|pikchr|plantuml|rackdiag|seqdiag|shaape|wavedrom)/dgv,
          name: "entity.name.function.asciidoc"
        },
        {
          match: /(sect[1-4]|preface|colophon|dedication|glossary|bibliography|synopsis|appendix|index|normal|partintro|music|latex|stem)/dgv,
          name: "entity.name.function.asciidoc"
        }
      ]
    },
    "line-break": {
      patterns: [
        {
          captures: {
            "1": { name: "variable.line-break.asciidoc" }
          },
          match: /(?<=\P{space})[\p{Zs}\t]+(\+)(?=\n?$)/dgv
        }
      ]
    },
    "line-break-backslash": {
      patterns: [
        {
          captures: {
            "1": { name: "variable.line-break.asciidoc" }
          },
          match: /(?<=\P{space})[\p{Zs}\t]+(\\)(?=\n?$)/dgv
        }
      ]
    },
    "link-macro": {
      patterns: [
        {
          captures: {
            "1": {
              name: "markup.link.asciidoc",
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "2": { name: "string.unquoted.asciidoc" }
          },
          match: /(?:^|[\]\(\)\;\<\>\[\p{space}])((?<!\\)(?:https?|file|ftp|irc):\/\/[^\]\<\[\p{space}]*[^\]\)\,\.\<\[\p{space}])(?:\[((?:\\\]|[^\]])*?)\])?/dgv,
          name: "markup.other.url.asciidoc"
        },
        {
          captures: {
            "1": { name: "markup.substitution.attribute-reference.asciidoc" },
            "2": { name: "string.unquoted.asciidoc" }
          },
          match: /(?:^|[\]\(\)\;\<\>\[\p{Zs}\t])((?<!\\)\{uri-[\p{L}\p{M}\p{N}\p{Pc}]+(?:-[\p{L}\p{M}\p{N}\p{Pc}]+)*(?<!\\)\})\[((?:\\\]|[^\]])*?)\]/dgv,
          name: "markup.other.url.asciidoc"
        },
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": {
              name: "markup.link.asciidoc",
              patterns: [
                { include: "#attribute-reference" }
              ]
            },
            "3": { name: "string.unquoted.asciidoc" }
          },
          match: /(?<!\\)(link|mailto):([^\[\p{space}]+)\[((?:\\\]|[^\]])*?)\]/dgv,
          name: "markup.other.url.asciidoc"
        },
        {
          match: /[\p{Alpha}\p{M}\p{Nd}\p{Pc}][\-\%\+\.\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(@)[\p{Alpha}\p{Nd}][\-\.\p{Alpha}\p{Nd}]*(\.)\p{Alpha}{2,4}\b/dgv,
          name: "markup.link.email.asciidoc"
        }
      ]
    },
    list: {
      patterns: [
        {
          captures: {
            "0": { name: "punctuation.definition.list.begin.asciidoc punctuation.definition.list.begin.markdown" },
            "1": { name: "punctuation.definition.metadata.asciidoc punctuation.definition.metadata.markdown" }
          },
          match: /^\p{space}*(-)[\p{Zs}\t](\[[\*x\p{Zs}\t]\])(?=[\p{Zs}\t])/dgv,
          name: "markup.list.todo.asciidoc"
        },
        {
          captures: {
            "0": { name: "punctuation.definition.list.begin.asciidoc punctuation.definition.list.begin.markdown" }
          },
          match: /^[\p{Zs}\t]*(-|\*{1,5}|•{1,5})(?=[\p{Zs}\t])/dgv,
          name: "markup.list.unnumbered.asciidoc markup.list.unnumbered.markdown"
        },
        {
          captures: {
            "0": { name: "punctuation.definition.list.begin.asciidoc punctuation.definition.list.begin.markdown" }
          },
          match: /^[\p{Zs}\t]*(\.{1,5}|\p{Nd}+\.|[A-Za-z]\.|[IVXivx]+\))(?=[\p{Zs}\t])/dgv,
          name: "markup.list.numbered.asciidoc markup.list.numbered.markdown"
        },
        {
          captures: {
            "1": {
              patterns: [
                { include: "#link-macro" },
                { include: "#attribute-reference" }
              ]
            },
            "2": { name: "markup.list.bullet.asciidoc" }
          },
          match: /^[\p{Zs}\t]*([^\n]*?\P{space})(:{2,4}|;;)((?=\n?$)|[\p{Zs}\t]+)/dgv,
          name: "markup.heading.list.asciidoc"
        }
      ]
    },
    "listing-paragraph": {
      patterns: [
        {
          begin: new EmulatedRegExp("(?=(?:(?=(^\\[(listing)([\\#\\%\\,\\.][^\\]]+)*\\](?=\\n?$)))\\1))", "dgv", { hiddenCaptures: [1] }),
          end: /((?<=--|\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.block.listing.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[(listing)([\#\%\,\.]([^\]\,]+))*\](?=\n?$)/dgv
            },
            { include: "#block-title" },
            {
              begin: /^(-{4,})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv
            },
            {
              begin: /^(\.{4,})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv
            },
            {
              begin: /^(-{2})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv
            },
            { include: "#inlines" }
          ]
        }
      ]
    },
    "literal-paragraph": {
      patterns: [
        {
          begin: new EmulatedRegExp("(?=(?:(?=(^\\[(literal)([\\#\\%\\,\\.][^\\]]+)*\\](?=\\n?$)))\\1))", "dgv", { hiddenCaptures: [1] }),
          end: /((?<=--|\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.block.literal.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[(literal)([\#\%\,\.]([^\]\,]+))*\](?=\n?$)/dgv
            },
            { include: "#block-title" },
            {
              begin: /^(\.{4,})(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv
            },
            {
              begin: /^(-{2})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv
            },
            { include: "#inlines" }
          ]
        },
        {
          begin: /^(\.{4,})(?=\n?$)/dgv,
          end: /^(1)(?=\n?$)/dgv,
          name: "markup.block.literal.asciidoc"
        }
      ]
    },
    mark: {
      patterns: [
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.mark.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<!\\\\)(\[[^\]]+?\])((##)([^\n]+?)(##))/dgv,
          name: "markup.mark.unconstrained.asciidoc"
        },
        {
          captures: {
            "1": { name: "markup.highlight.asciidoc" },
            "2": { name: "punctuation.definition.asciidoc" },
            "4": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<!\\\\)((##)([^\n]+?)(##))/dgv,
          name: "markup.mark.unconstrained.asciidoc"
        },
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.mark.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<![\#\:\;\\\p{Alpha}\p{M}\p{Nd}\p{Pc}])(\[[^\]]+?\])((#)(\P{space}(?:|[^\n]*?\P{space}))(#)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}]))/dgv,
          name: "markup.mark.constrained.asciidoc"
        },
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.highlight.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<![\#\:\;\\\p{Alpha}\p{M}\p{Nd}\p{Pc}])(\[[^\]]+?\])?((#)(\P{space}(?:|[^\n]*?\P{space}))(#)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}]))/dgv,
          name: "markup.mark.constrained.asciidoc"
        }
      ]
    },
    "menu-macro": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "markup.link.asciidoc" },
            "3": { name: "string.unquoted.asciidoc" }
          },
          match: /(?<!\\)(menu):([\p{Alpha}\p{M}\p{Nd}\p{Pc}](?:|[^\n]*?\P{space}))\[[\p{Zs}\t]*([^\n]+?)?\]/dgv,
          name: "markup.other.menu.asciidoc"
        }
      ]
    },
    monospace: {
      patterns: [
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.inline.raw.monospace.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<!\\)(\[[^\n]+?\])?((``)([^\n]+?)(``))/dgv,
          name: "markup.monospace.unconstrained.asciidoc"
        },
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.inline.raw.monospace.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<!["'\:\;\\\`\p{Alpha}\p{M}\p{Nd}\p{Pc}])(\[[^\n]+?\])?((`)(\P{space}(?:|[^\n]*?\P{space}))(`))(?!["'\`\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          name: "markup.monospace.constrained.asciidoc"
        }
      ]
    },
    "open-block": {
      patterns: [
        {
          begin: /^(-{2})(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "constant.other.symbol.asciidoc" }
          },
          end: /^(1)(?=\n?$)/dgv,
          endCaptures: {
            "1": { name: "constant.other.symbol.asciidoc" }
          },
          name: "markup.block.open.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "passthrough-macro": {
      patterns: [
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "3": { name: "support.constant.asciidoc" },
            "4": {
              name: "string.unquoted.asciidoc",
              patterns: [
                { include: "text.html.basic" }
              ]
            },
            "5": { name: "support.constant.asciidoc" }
          },
          match: /(?:(?<!\\)(\[([^\]]+?)\]))?\\{0,2}(?<delim>\+{2,3}|\${2})([^\n]*?)(\3)/dgv,
          name: "markup.macro.inline.passthrough.asciidoc"
        },
        {
          begin: /(?<!\\)(pass:)([\,a-z]*)(\[)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "markup.meta.attribute-list.asciidoc" }
          },
          contentName: "string.unquoted.asciidoc",
          end: /(?<!\\)\]|^(?=\n?$)/dgv,
          name: "markup.macro.inline.passthrough.asciidoc",
          patterns: [
            { include: "text.html.basic" }
          ]
        }
      ]
    },
    "passthrough-paragraph": {
      patterns: [
        {
          begin: new EmulatedRegExp("(?=(?:(?=(^\\[(pass)([\\#\\%\\,\\.][^\\]]+)*\\](?=\\n?$)))\\1))", "dgv", { hiddenCaptures: [1] }),
          end: /((?<=--|\+\+)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.block.passthrough.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[(pass)([\#\%\,\.]([^\]\,]+))*\](?=\n?$)/dgv
            },
            { include: "#block-title" },
            {
              begin: /^(\+{4,})\p{space}*(?=\n?$)/dgv,
              end: /(?<=1)/dgv,
              patterns: [
                { include: "text.html.basic" }
              ]
            },
            {
              begin: /^(-{2})\p{space}*(?=\n?$)/dgv,
              end: /(?<=1)/dgv,
              patterns: [
                { include: "text.html.basic" }
              ]
            }
          ]
        },
        {
          begin: /^(\+{4,})(?=\n?$)/dgv,
          end: /1/dgv,
          name: "markup.block.passthrough.asciidoc",
          patterns: [
            { include: "text.html.basic" }
          ]
        }
      ]
    },
    "quote-paragraph": {
      patterns: [
        {
          begin: new EmulatedRegExp("(?=(?:(?=(^\\[(quote|verse)([\\#\\%\\,\\.](?:[^\\]\\,]|\\](?=[\\t ]*\\P{space}))+)*\\](?=\\n?$)))\\1))", "dgv", { hiddenCaptures: [1] }),
          end: /((?<=____|""|--)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.italic.quotes.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[(quote|verse)([\#\%\,\.](?:[^\]\,]|\](?=[\t ]*\P{space}))+)*\](?=\n?$)/dgv
            },
            { include: "#block-title" },
            { include: "#inlines" },
            {
              begin: /^(_{4,})\p{space}*(?=\n?$)/dgv,
              end: /(?<=1)/dgv,
              patterns: [
                { include: "#inlines" },
                { include: "#list" }
              ]
            },
            {
              begin: /^("{2})\p{space}*(?=\n?$)/dgv,
              end: /(?<=1)/dgv,
              patterns: [
                { include: "#inlines" },
                { include: "#list" }
              ]
            },
            {
              begin: /^(-{2})\p{space}*(?=\n?$)/dgv,
              end: /(?<=1)(?=\n?$)/dgv,
              patterns: [
                { include: "#inlines" },
                { include: "#list" }
              ]
            },
            {
              begin: /^(-{4,})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "#inlines" },
                { include: "#list" }
              ]
            },
            {
              begin: /^(\.{4,})\p{space}*(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "#inlines" },
                { include: "#list" }
              ]
            }
          ]
        },
        {
          begin: /^("")(?=\n?$)/dgv,
          end: /^1(?=\n?$)/dgv,
          name: "markup.italic.quotes.asciidoc",
          patterns: [
            { include: "#inlines" },
            { include: "#list" }
          ]
        },
        {
          begin: /^[\p{Zs}\t]*(>) /dgv,
          end: /^[\p{Zs}\t]*?(?=\n?$)/dgv,
          name: "markup.italic.quotes.asciidoc",
          patterns: [
            { include: "#inlines" },
            { include: "#list" }
          ]
        }
      ]
    },
    "sidebar-paragraph": {
      patterns: [
        {
          begin: new EmulatedRegExp("(?=(?:(?=(^\\[(sidebar)([\\#\\%\\,\\.][^\\]]+)*\\](?=\\n?$)))\\1))", "dgv", { hiddenCaptures: [1] }),
          end: /((?<=--|\*\*\*\*)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.block.sidebar.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[(sidebar)([\#\%\,\.]([^\]\,]+))*\](?=\n?$)/dgv
            },
            { include: "#block-title" },
            {
              begin: /^(\*{4,})(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "$self" }
              ]
            },
            {
              begin: /^(-{2})(?=\n?$)/dgv,
              end: /^(1)(?=\n?$)/dgv,
              patterns: [
                { include: "$self" }
              ]
            },
            { include: "#inlines" }
          ]
        },
        {
          begin: /^(\*{4,})(?=\n?$)/dgv,
          end: /^(1)(?=\n?$)/dgv,
          name: "markup.block.sidebar.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "source-asciidoctor": {
      patterns: [
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(css(?:|[^\n]erb))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.css.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(css(?:|[^\n]erb))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.css",
                  patterns: [
                    { include: "source.css" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.css",
                  patterns: [
                    { include: "source.css" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.css",
                  patterns: [
                    { include: "source.css" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(html?|shtml|xhtml|inc|tmpl|tpl)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.basic.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(html?|shtml|xhtml|inc|tmpl|tpl)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.html",
                  patterns: [
                    { include: "text.html.basic" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.html",
                  patterns: [
                    { include: "text.html.basic" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.html",
                  patterns: [
                    { include: "text.html.basic" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(ini|conf)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.ini.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(ini|conf)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.ini",
                  patterns: [
                    { include: "source.ini" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.ini",
                  patterns: [
                    { include: "source.ini" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.ini",
                  patterns: [
                    { include: "source.ini" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(java|bsh)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.java.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(java|bsh)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.java",
                  patterns: [
                    { include: "source.java" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.java",
                  patterns: [
                    { include: "source.java" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.java",
                  patterns: [
                    { include: "source.java" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(lua)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.lua.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(lua)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.lua",
                  patterns: [
                    { include: "source.lua" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.lua",
                  patterns: [
                    { include: "source.lua" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.lua",
                  patterns: [
                    { include: "source.lua" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*((?:[Mm]|GNUm|OCamlM)akefile)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.makefile.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*((?:[Mm]|GNUm|OCamlM)akefile)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.makefile",
                  patterns: [
                    { include: "source.makefile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.makefile",
                  patterns: [
                    { include: "source.makefile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.makefile",
                  patterns: [
                    { include: "source.makefile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(perl|pl|pm|pod|t|PL|psgi|vcl)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.perl.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(perl|pl|pm|pod|t|PL|psgi|vcl)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.perl",
                  patterns: [
                    { include: "source.perl" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.perl",
                  patterns: [
                    { include: "source.perl" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.perl",
                  patterns: [
                    { include: "source.perl" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*([RSrs]|Rprofile|\{\.r[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.r.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*([RSrs]|Rprofile|\{\.r[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.r",
                  patterns: [
                    { include: "source.r" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.r",
                  patterns: [
                    { include: "source.r" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.r",
                  patterns: [
                    { include: "source.r" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile[^\n]lock|Thorfile|Puppetfile)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.ruby.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile[^\n]lock|Thorfile|Puppetfile)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.ruby",
                  patterns: [
                    { include: "source.ruby" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.ruby",
                  patterns: [
                    { include: "source.ruby" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.ruby",
                  patterns: [
                    { include: "source.ruby" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(php3??|php4|php5|phpt|phtml|aw|ctp)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.php.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(php3??|php4|php5|phpt|phtml|aw|ctp)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.php",
                  patterns: [
                    { include: "text.html.basic" },
                    { include: "source.php" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.php",
                  patterns: [
                    { include: "text.html.basic" },
                    { include: "source.php" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.php",
                  patterns: [
                    { include: "text.html.basic" },
                    { include: "source.php" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(sql|ddl|dml)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.sql.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(sql|ddl|dml)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.sql",
                  patterns: [
                    { include: "source.sql" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.sql",
                  patterns: [
                    { include: "source.sql" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.sql",
                  patterns: [
                    { include: "source.sql" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(vb)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.vs_net.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(vb)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.vs_net",
                  patterns: [
                    { include: "source.asp.vb.net" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.vs_net",
                  patterns: [
                    { include: "source.asp.vb.net" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.vs_net",
                  patterns: [
                    { include: "source.asp.vb.net" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.xml.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.xml",
                  patterns: [
                    { include: "text.xml" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.xml",
                  patterns: [
                    { include: "text.xml" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.xml",
                  patterns: [
                    { include: "text.xml" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(xslt??)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.xsl.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(xslt??)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.xsl",
                  patterns: [
                    { include: "text.xml.xsl" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.xsl",
                  patterns: [
                    { include: "text.xml.xsl" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.xsl",
                  patterns: [
                    { include: "text.xml.xsl" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(ya?ml)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.yaml.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(ya?ml)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.yaml",
                  patterns: [
                    { include: "source.yaml" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.yaml",
                  patterns: [
                    { include: "source.yaml" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.yaml",
                  patterns: [
                    { include: "source.yaml" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(bat(?:|ch))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.dosbatch.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(bat(?:|ch))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dosbatch",
                  patterns: [
                    { include: "source.batchfile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dosbatch",
                  patterns: [
                    { include: "source.batchfile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dosbatch",
                  patterns: [
                    { include: "source.batchfile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(cl(?:js??|ojure))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.clojure.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(cl(?:js??|ojure))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.clojure",
                  patterns: [
                    { include: "source.clojure" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.clojure",
                  patterns: [
                    { include: "source.clojure" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.clojure",
                  patterns: [
                    { include: "source.clojure" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(coffee|Cakefile|coffee[^\n]erb)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.coffee.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(coffee|Cakefile|coffee[^\n]erb)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.coffee",
                  patterns: [
                    { include: "source.coffee" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.coffee",
                  patterns: [
                    { include: "source.coffee" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.coffee",
                  patterns: [
                    { include: "source.coffee" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*([ch])([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.c.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*([ch])([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.c",
                  patterns: [
                    { include: "source.c" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.c",
                  patterns: [
                    { include: "source.c" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.c",
                  patterns: [
                    { include: "source.c" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(c(?:pp|\+\+|xx))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.cpp.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(c(?:pp|\+\+|xx))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.cpp source.cpp",
                  patterns: [
                    { include: "source.cpp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.cpp source.cpp",
                  patterns: [
                    { include: "source.cpp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.cpp source.cpp",
                  patterns: [
                    { include: "source.cpp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(patch|diff|rej)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.diff.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(patch|diff|rej)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.diff",
                  patterns: [
                    { include: "source.diff" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.diff",
                  patterns: [
                    { include: "source.diff" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.diff",
                  patterns: [
                    { include: "source.diff" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*([Dd]ockerfile)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.dockerfile.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*([Dd]ockerfile)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dockerfile",
                  patterns: [
                    { include: "source.dockerfile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dockerfile",
                  patterns: [
                    { include: "source.dockerfile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dockerfile",
                  patterns: [
                    { include: "source.dockerfile" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*((?:COMMIT_EDIT|MERGE_)MSG)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.git_commit.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*((?:COMMIT_EDIT|MERGE_)MSG)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.git_commit",
                  patterns: [
                    { include: "text.git-commit" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.git_commit",
                  patterns: [
                    { include: "text.git-commit" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.git_commit",
                  patterns: [
                    { include: "text.git-commit" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(git-rebase-todo)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.git_rebase.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(git-rebase-todo)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.git_rebase",
                  patterns: [
                    { include: "text.git-rebase" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.git_rebase",
                  patterns: [
                    { include: "text.git-rebase" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.git_rebase",
                  patterns: [
                    { include: "text.git-rebase" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(go(?:|lang))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.go.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(go(?:|lang))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.go",
                  patterns: [
                    { include: "source.go" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.go",
                  patterns: [
                    { include: "source.go" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.go",
                  patterns: [
                    { include: "source.go" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(g(?:roovy|vy))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.groovy.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(g(?:roovy|vy))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.groovy",
                  patterns: [
                    { include: "source.groovy" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.groovy",
                  patterns: [
                    { include: "source.groovy" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.groovy",
                  patterns: [
                    { include: "source.groovy" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(jade|pug)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.pug.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(jade|pug)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.pug",
                  patterns: [
                    { include: "text.pug" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.pug",
                  patterns: [
                    { include: "text.pug" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.pug",
                  patterns: [
                    { include: "text.pug" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(jsx??|javascript|es6|mjs|cjs|dataviewjs|\{\.js[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.js.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(jsx??|javascript|es6|mjs|cjs|dataviewjs|\{\.js[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.javascript",
                  patterns: [
                    { include: "source.js" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.javascript",
                  patterns: [
                    { include: "source.js" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.javascript",
                  patterns: [
                    { include: "source.js" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(regexp)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.js_regexp.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(regexp)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.js_regexp",
                  patterns: [
                    { include: "source.js.regexp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.js_regexp",
                  patterns: [
                    { include: "source.js.regexp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.js_regexp",
                  patterns: [
                    { include: "source.js.regexp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.json.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.json",
                  patterns: [
                    { include: "source.json" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.json",
                  patterns: [
                    { include: "source.json" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.json",
                  patterns: [
                    { include: "source.json" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(jsonc)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.jsonc.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(jsonc)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.jsonc",
                  patterns: [
                    { include: "source.json.comments" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.jsonc",
                  patterns: [
                    { include: "source.json.comments" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.jsonc",
                  patterns: [
                    { include: "source.json.comments" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(less)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.less.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(less)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.less",
                  patterns: [
                    { include: "source.css.less" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.less",
                  patterns: [
                    { include: "source.css.less" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.less",
                  patterns: [
                    { include: "source.css.less" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(objectivec|objective-c|mm|objc|obj-c|[hm])([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.objc.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(objectivec|objective-c|mm|objc|obj-c|[hm])([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.objc",
                  patterns: [
                    { include: "source.objc" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.objc",
                  patterns: [
                    { include: "source.objc" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.objc",
                  patterns: [
                    { include: "source.objc" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(swift)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.swift.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(swift)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.swift",
                  patterns: [
                    { include: "source.swift" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.swift",
                  patterns: [
                    { include: "source.swift" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.swift",
                  patterns: [
                    { include: "source.swift" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(scss)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.scss.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(scss)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.scss",
                  patterns: [
                    { include: "source.css.scss" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.scss",
                  patterns: [
                    { include: "source.css.scss" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.scss",
                  patterns: [
                    { include: "source.css.scss" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(perl6|p6|pl6|pm6|nqp)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.perl6.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(perl6|p6|pl6|pm6|nqp)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.perl6",
                  patterns: [
                    { include: "source.perl.6" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.perl6",
                  patterns: [
                    { include: "source.perl.6" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.perl6",
                  patterns: [
                    { include: "source.perl.6" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(p(?:owershell|s1|sm1|sd1|wsh))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.powershell.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(p(?:owershell|s1|sm1|sd1|wsh))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.powershell",
                  patterns: [
                    { include: "source.powershell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.powershell",
                  patterns: [
                    { include: "source.powershell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.powershell",
                  patterns: [
                    { include: "source.powershell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??|\{\.python[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.python.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??|\{\.python[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.python",
                  patterns: [
                    { include: "source.python" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.python",
                  patterns: [
                    { include: "source.python" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.python",
                  patterns: [
                    { include: "source.python" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(julia|\{\.julia[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.julia.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(julia|\{\.julia[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.julia",
                  patterns: [
                    { include: "source.julia" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.julia",
                  patterns: [
                    { include: "source.julia" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.julia",
                  patterns: [
                    { include: "source.julia" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(re)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.regexp_python.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(re)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.regexp_python",
                  patterns: [
                    { include: "source.regexp.python" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.regexp_python",
                  patterns: [
                    { include: "source.regexp.python" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.regexp_python",
                  patterns: [
                    { include: "source.regexp.python" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(rust|rs|\{\.rust[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.rust.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(rust|rs|\{\.rust[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.rust",
                  patterns: [
                    { include: "source.rust" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.rust",
                  patterns: [
                    { include: "source.rust" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.rust",
                  patterns: [
                    { include: "source.rust" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(s(?:cala|bt))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.scala.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(s(?:cala|bt))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.scala",
                  patterns: [
                    { include: "source.scala" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.scala",
                  patterns: [
                    { include: "source.scala" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.scala",
                  patterns: [
                    { include: "source.scala" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|[^\n]textmate_init|\{\.bash[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.shell.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|[^\n]textmate_init|\{\.bash[^\n]+?\})([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.shellscript",
                  patterns: [
                    { include: "source.shell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.shellscript",
                  patterns: [
                    { include: "source.shell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.shellscript",
                  patterns: [
                    { include: "source.shell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(t(?:ypescript|s))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.ts.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(t(?:ypescript|s))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.typescript",
                  patterns: [
                    { include: "source.ts" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.typescript",
                  patterns: [
                    { include: "source.ts" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.typescript",
                  patterns: [
                    { include: "source.ts" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(tsx)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.tsx.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(tsx)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.typescriptreact",
                  patterns: [
                    { include: "source.tsx" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.typescriptreact",
                  patterns: [
                    { include: "source.tsx" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.typescriptreact",
                  patterns: [
                    { include: "source.tsx" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(c(?:s|sharp|#))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.csharp.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(c(?:s|sharp|#))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.csharp",
                  patterns: [
                    { include: "source.cs" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.csharp",
                  patterns: [
                    { include: "source.cs" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.csharp",
                  patterns: [
                    { include: "source.cs" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(f(?:s|sharp|#))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.fsharp.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(f(?:s|sharp|#))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.fsharp",
                  patterns: [
                    { include: "source.fsharp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.fsharp",
                  patterns: [
                    { include: "source.fsharp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.fsharp",
                  patterns: [
                    { include: "source.fsharp" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(dart)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.dart.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(dart)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dart",
                  patterns: [
                    { include: "source.dart" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dart",
                  patterns: [
                    { include: "source.dart" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.dart",
                  patterns: [
                    { include: "source.dart" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(h(?:andlebars|bs))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.handlebars.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(h(?:andlebars|bs))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.handlebars",
                  patterns: [
                    { include: "text.html.handlebars" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.handlebars",
                  patterns: [
                    { include: "text.html.handlebars" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.handlebars",
                  patterns: [
                    { include: "text.html.handlebars" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(m(?:arkdown|d))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.markdown.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(m(?:arkdown|d))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.markdown",
                  patterns: [
                    { include: "text.html.markdown" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.markdown",
                  patterns: [
                    { include: "text.html.markdown" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.markdown",
                  patterns: [
                    { include: "text.html.markdown" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(log)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.log.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(log)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.log",
                  patterns: [
                    { include: "text.log" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.log",
                  patterns: [
                    { include: "text.log" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.log",
                  patterns: [
                    { include: "text.log" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(erlang)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.erlang.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(erlang)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.erlang",
                  patterns: [
                    { include: "source.erlang" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.erlang",
                  patterns: [
                    { include: "source.erlang" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.erlang",
                  patterns: [
                    { include: "source.erlang" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(elixir)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.elixir.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(elixir)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.elixir",
                  patterns: [
                    { include: "source.elixir" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.elixir",
                  patterns: [
                    { include: "source.elixir" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.elixir",
                  patterns: [
                    { include: "source.elixir" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*((?:la|)tex)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.latex.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*((?:la|)tex)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.latex",
                  patterns: [
                    { include: "text.tex.latex" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.latex",
                  patterns: [
                    { include: "text.tex.latex" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.latex",
                  patterns: [
                    { include: "text.tex.latex" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(bibtex)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.bibtex.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(bibtex)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.bibtex",
                  patterns: [
                    { include: "text.bibtex" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.bibtex",
                  patterns: [
                    { include: "text.bibtex" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.bibtex",
                  patterns: [
                    { include: "text.bibtex" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(twig)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.twig.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(twig)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.twig",
                  patterns: [
                    { include: "source.twig" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.twig",
                  patterns: [
                    { include: "source.twig" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.twig",
                  patterns: [
                    { include: "source.twig" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(yang)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.yang.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(yang)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.yang",
                  patterns: [
                    { include: "source.yang" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.yang",
                  patterns: [
                    { include: "source.yang" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.yang",
                  patterns: [
                    { include: "source.yang" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(abap)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.abap.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(abap)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.abap",
                  patterns: [
                    { include: "source.abap" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.abap",
                  patterns: [
                    { include: "source.abap" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.abap",
                  patterns: [
                    { include: "source.abap" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(r(?:estructuredtext|st))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.restructuredtext.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(r(?:estructuredtext|st))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.restructuredtext",
                  patterns: [
                    { include: "source.rst" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.restructuredtext",
                  patterns: [
                    { include: "source.rst" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.restructuredtext",
                  patterns: [
                    { include: "source.rst" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(haskell)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.haskell.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(haskell)([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.haskell",
                  patterns: [
                    { include: "source.haskell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.haskell",
                  patterns: [
                    { include: "source.haskell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.haskell",
                  patterns: [
                    { include: "source.haskell" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        },
        {
          begin: /(?=^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(k(?:otlin|t))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$))/dgiv,
          end: /((?<=--|\.\.\.\.)|^[\p{Zs}\t]*)(?=\n?$)/dgv,
          name: "markup.code.kotlin.asciidoc",
          patterns: [
            {
              captures: {
                "0": {
                  name: "markup.heading.asciidoc",
                  patterns: [
                    { include: "#block-attribute-inner" }
                  ]
                }
              },
              match: /^\[([^\,]*)[\p{Zs}\t]*,[\p{Zs}\t]*(k(?:otlin|t))([\p{Zs}\t]*,[\p{Zs}\t]*[^\]]*)?\](?=\n?$)/dgiv
            },
            { include: "#block-title" },
            {
              begin: {
                G: [/(^|￿)(-{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.kotlin",
                  patterns: [
                    { include: "source.kotlin" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(-{2})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(-{2})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.kotlin",
                  patterns: [
                    { include: "source.kotlin" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(-{2})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(-{2})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: {
                G: [/(^|￿)(\.{4,})\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(\\.{4,})\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              end: {
                G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#block-callout" },
                { include: "#include-directive" },
                {
                  begin: {
                    G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
                  },
                  contentName: "meta.embedded.block.kotlin",
                  patterns: [
                    { include: "source.kotlin" }
                  ],
                  while: {
                    G: [/(^|￿)(?!(\.{4,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!(\\.{4,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    "source-markdown": {
      patterns: [
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(css(?:|[^\n]erb))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(css(?:|[^\\n]erb))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.css.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.css",
              patterns: [
                { include: "source.css" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(html?|shtml|xhtml|inc|tmpl|tpl)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(html?|shtml|xhtml|inc|tmpl|tpl)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.basic.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.html",
              patterns: [
                { include: "text.html.basic" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(ini|conf)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(ini|conf)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.ini.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ini",
              patterns: [
                { include: "source.ini" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(java|bsh)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(java|bsh)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.java.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.java",
              patterns: [
                { include: "source.java" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(lua)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(lua)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.lua.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.lua",
              patterns: [
                { include: "source.lua" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*((?:[Mm]|GNUm|OCamlM)akefile)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*((?:[Mm]|GNUm|OCamlM)akefile)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.makefile.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.makefile",
              patterns: [
                { include: "source.makefile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(perl|pl|pm|pod|t|PL|psgi|vcl)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(perl|pl|pm|pod|t|PL|psgi|vcl)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.perl.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl",
              patterns: [
                { include: "source.perl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*([RSrs]|Rprofile|\{\.r[^\n]+?\})((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*([RSrs]|Rprofile|\\{\\.r[^\\n]+?\\})((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.r.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.r",
              patterns: [
                { include: "source.r" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile[^\n]lock|Thorfile|Puppetfile)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(ruby|rbx??|rjs|Rakefile|rake|cgi|fcgi|gemspec|irbrc|Capfile|ru|prawn|Cheffile|Gemfile|Guardfile|Hobofile|Vagrantfile|Appraisals|Rantfile|Berksfile|Berksfile[^\\n]lock|Thorfile|Puppetfile)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.ruby.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.ruby",
              patterns: [
                { include: "source.ruby" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(php3??|php4|php5|phpt|phtml|aw|ctp)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(php3??|php4|php5|phpt|phtml|aw|ctp)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.php.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.php",
              patterns: [
                { include: "text.html.basic" },
                { include: "source.php" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(sql|ddl|dml)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(sql|ddl|dml)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.sql.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.sql",
              patterns: [
                { include: "source.sql" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(vb)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(vb)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.vs_net.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.vs_net",
              patterns: [
                { include: "source.asp.vb.net" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(xml|xsd|tld|jsp|pt|cpt|dtml|rss|opml)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.xml.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xml",
              patterns: [
                { include: "text.xml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(xslt??)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(xslt??)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.xsl.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.xsl",
              patterns: [
                { include: "text.xml.xsl" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(ya?ml)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(ya?ml)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.yaml.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.yaml",
              patterns: [
                { include: "source.yaml" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(bat(?:|ch))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(bat(?:|ch))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.dosbatch.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dosbatch",
              patterns: [
                { include: "source.batchfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(cl(?:js??|ojure))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(cl(?:js??|ojure))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.clojure.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.clojure",
              patterns: [
                { include: "source.clojure" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(coffee|Cakefile|coffee[^\n]erb)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(coffee|Cakefile|coffee[^\\n]erb)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.coffee.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.coffee",
              patterns: [
                { include: "source.coffee" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*([ch])((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*([ch])((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.c.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.c",
              patterns: [
                { include: "source.c" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(c(?:pp|\+\+|xx))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(c(?:pp|\\+\\+|xx))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.cpp.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.cpp source.cpp",
              patterns: [
                { include: "source.cpp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(patch|diff|rej)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(patch|diff|rej)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.diff.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.diff",
              patterns: [
                { include: "source.diff" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*([Dd]ockerfile)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*([Dd]ockerfile)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.dockerfile.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dockerfile",
              patterns: [
                { include: "source.dockerfile" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*((?:COMMIT_EDIT|MERGE_)MSG)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*((?:COMMIT_EDIT|MERGE_)MSG)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.git_commit.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git_commit",
              patterns: [
                { include: "text.git-commit" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(git-rebase-todo)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(git-rebase-todo)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.git_rebase.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.git_rebase",
              patterns: [
                { include: "text.git-rebase" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(go(?:|lang))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(go(?:|lang))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.go.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.go",
              patterns: [
                { include: "source.go" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(g(?:roovy|vy))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(g(?:roovy|vy))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.groovy.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.groovy",
              patterns: [
                { include: "source.groovy" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(jade|pug)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(jade|pug)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.pug.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.pug",
              patterns: [
                { include: "text.pug" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(jsx??|javascript|es6|mjs|cjs|dataviewjs|\{\.js[^\n]+?\})((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(jsx??|javascript|es6|mjs|cjs|dataviewjs|\\{\\.js[^\\n]+?\\})((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.js.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.javascript",
              patterns: [
                { include: "source.js" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(regexp)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(regexp)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.js_regexp.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.js_regexp",
              patterns: [
                { include: "source.js.regexp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(json5??|sublime-settings|sublime-menu|sublime-keymap|sublime-mousemap|sublime-theme|sublime-build|sublime-project|sublime-completions)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.json.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.json",
              patterns: [
                { include: "source.json" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(jsonc)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(jsonc)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.jsonc.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.jsonc",
              patterns: [
                { include: "source.json.comments" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(less)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(less)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.less.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.less",
              patterns: [
                { include: "source.css.less" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(objectivec|objective-c|mm|objc|obj-c|[hm])((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(objectivec|objective-c|mm|objc|obj-c|[hm])((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.objc.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.objc",
              patterns: [
                { include: "source.objc" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(swift)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(swift)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.swift.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.swift",
              patterns: [
                { include: "source.swift" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(scss)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(scss)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.scss.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scss",
              patterns: [
                { include: "source.css.scss" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(perl6|p6|pl6|pm6|nqp)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(perl6|p6|pl6|pm6|nqp)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.perl6.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.perl6",
              patterns: [
                { include: "source.perl.6" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(p(?:owershell|s1|sm1|sd1|wsh))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(p(?:owershell|s1|sm1|sd1|wsh))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.powershell.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.powershell",
              patterns: [
                { include: "source.powershell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??|\{\.python[^\n]+?\})((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(python|py3??|rpy|pyw|cpy|SConstruct|Sconstruct|sconstruct|SConscript|gypi??|\\{\\.python[^\\n]+?\\})((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.python.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.python",
              patterns: [
                { include: "source.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(julia|\{\.julia[^\n]+?\})((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(julia|\\{\\.julia[^\\n]+?\\})((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.julia.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.julia",
              patterns: [
                { include: "source.julia" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(re)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(re)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.regexp_python.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.regexp_python",
              patterns: [
                { include: "source.regexp.python" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(rust|rs|\{\.rust[^\n]+?\})((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(rust|rs|\\{\\.rust[^\\n]+?\\})((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.rust.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.rust",
              patterns: [
                { include: "source.rust" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(s(?:cala|bt))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(s(?:cala|bt))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.scala.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.scala",
              patterns: [
                { include: "source.scala" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|[^\n]textmate_init|\{\.bash[^\n]+?\})((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(shell|sh|bash|zsh|bashrc|bash_profile|bash_login|profile|bash_logout|[^\\n]textmate_init|\\{\\.bash[^\\n]+?\\})((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.shell.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.shellscript",
              patterns: [
                { include: "source.shell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(t(?:ypescript|s))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(t(?:ypescript|s))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.ts.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typescript",
              patterns: [
                { include: "source.ts" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(tsx)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(tsx)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.tsx.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.typescriptreact",
              patterns: [
                { include: "source.tsx" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(c(?:s|sharp|#))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(c(?:s|sharp|#))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.csharp.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.csharp",
              patterns: [
                { include: "source.cs" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(f(?:s|sharp|#))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(f(?:s|sharp|#))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.fsharp.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.fsharp",
              patterns: [
                { include: "source.fsharp" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(dart)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(dart)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.dart.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.dart",
              patterns: [
                { include: "source.dart" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(h(?:andlebars|bs))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(h(?:andlebars|bs))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.handlebars.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.handlebars",
              patterns: [
                { include: "text.html.handlebars" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(m(?:arkdown|d))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(m(?:arkdown|d))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.markdown.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.markdown",
              patterns: [
                { include: "text.html.markdown" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(log)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(log)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.log.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.log",
              patterns: [
                { include: "text.log" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(erlang)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(erlang)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.erlang.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.erlang",
              patterns: [
                { include: "source.erlang" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(elixir)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(elixir)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.elixir.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.elixir",
              patterns: [
                { include: "source.elixir" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*((?:la|)tex)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*((?:la|)tex)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.latex.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.latex",
              patterns: [
                { include: "text.tex.latex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(bibtex)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(bibtex)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.bibtex.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.bibtex",
              patterns: [
                { include: "text.bibtex" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(twig)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(twig)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.twig.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.twig",
              patterns: [
                { include: "source.twig" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(yang)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(yang)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.yang.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.yang",
              patterns: [
                { include: "source.yang" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(abap)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(abap)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.abap.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.abap",
              patterns: [
                { include: "source.abap" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(r(?:estructuredtext|st))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(r(?:estructuredtext|st))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.restructuredtext.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.restructuredtext",
              patterns: [
                { include: "source.rst" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(haskell)((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(haskell)((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.haskell.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.haskell",
              patterns: [
                { include: "source.haskell" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: {
            G: [/(^|￿)(`{3,})\p{space}*(k(?:otlin|t))((\p{space}+|[\,\:\?\{])[^\`]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(`{3,})\\p{space}*(k(?:otlin|t))((\\p{space}+|[\\,\\:\\?\\{])[^\\`]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          end: {
            G: [/(^|￿)(2)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
          },
          name: "markup.code.kotlin.asciidoc",
          patterns: [
            { include: "#block-callout" },
            {
              begin: {
                G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
              },
              contentName: "meta.embedded.block.kotlin",
              patterns: [
                { include: "source.kotlin" }
              ],
              while: {
                G: [/(^|￿)(?!\p{space}*(`{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*(`{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        }
      ]
    },
    "source-paragraphs": {
      patterns: [
        { include: "#source-asciidoctor" },
        { include: "#source-markdown" }
      ]
    },
    "stem-macro": {
      patterns: [
        {
          begin: /(?<!\\)(stem|(?:latex|ascii)math):([\,a-z]*)(\[)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "markup.meta.attribute-list.asciidoc" }
          },
          contentName: "string.unquoted.asciidoc",
          end: /(?<!\\)\]|^(?=\n?$)/dgv,
          name: "markup.macro.inline.stem.asciidoc"
        }
      ]
    },
    strong: {
      patterns: [
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.bold.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<!\\\\)(\[[^\n]+?\])?((\*\*)([^\n]+?)(\*\*))/dgv,
          name: "markup.strong.unconstrained.asciidoc"
        },
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "2": { name: "markup.bold.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<![\*\:\;\\\p{Alpha}\p{M}\p{Nd}\p{Pc}])(\[[^\n]+?\])?((\*)(\P{space}(?:|[^\n]*?\P{space}))(\*)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}]))/dgv,
          name: "markup.strong.constrained.asciidoc"
        }
      ]
    },
    subscript: {
      patterns: [
        {
          captures: {
            "1": { name: "markup.meta.sub.attribute-list.asciidoc" },
            "2": { name: "markup.sub.subscript.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<!\\)(\[[^\n]+?\])?((~)(\P{space}+?)(~))/dgv,
          name: "markup.subscript.asciidoc"
        }
      ]
    },
    superscript: {
      patterns: [
        {
          captures: {
            "1": { name: "markup.meta.super.attribute-list.asciidoc" },
            "2": { name: "markup.super.superscript.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?<!\\)(\[[^\n]+?\])?((\^)(\P{space}+?)(\^))/dgv,
          name: "markup.superscript.asciidoc"
        }
      ]
    },
    "table-csv": {
      patterns: [
        {
          begin: /^(,===)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "markup.table.delimiter.asciidoc" }
          },
          contentName: "string.unquoted.asciidoc",
          end: /^(1)(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "markup.table.delimiter.asciidoc" }
          },
          name: "markup.table.csv.asciidoc",
          patterns: [
            { include: "text.csv" },
            {
              captures: {
                "0": { name: "markup.table.cell.delimiter.asciidoc" }
              },
              match: /,/dgv
            },
            { include: "#general-block-macro" }
          ]
        }
      ]
    },
    "table-dsv": {
      patterns: [
        {
          begin: /^(:===)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "markup.table.delimiter.asciidoc" }
          },
          contentName: "string.unquoted.asciidoc",
          end: /^(1)(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "markup.table.delimiter.asciidoc" }
          },
          name: "markup.table.dsv.asciidoc",
          patterns: [
            {
              captures: {
                "0": { name: "markup.table.cell.delimiter.asciidoc" }
              },
              match: /:/dgv
            },
            { include: "#general-block-macro" }
          ]
        }
      ]
    },
    "table-nested": {
      patterns: [
        {
          begin: /^(!===)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "markup.table.delimiter.asciidoc" }
          },
          contentName: "markup.table.content.asciidoc",
          end: /^(1)(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "markup.table.delimiter.asciidoc" }
          },
          name: "markup.table.nested.asciidoc",
          patterns: [
            {
              captures: {
                "1": { name: "markup.meta.attribute-list.asciidoc" },
                "2": { name: "markup.table.cell.delimiter.asciidoc" }
              },
              match: /(^|[^\\\p{Zs}\t]*)(?<!\\)(!)/dgv
            },
            { include: "#tables-includes" }
          ]
        }
      ]
    },
    "table-psv": {
      patterns: [
        {
          begin: /^(\|===)\p{space}*(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "markup.table.delimiter.asciidoc" }
          },
          contentName: "markup.table.content.asciidoc",
          end: /^(1)\p{space}*(?=\n?$)/dgv,
          endCaptures: {
            "0": { name: "markup.table.delimiter.asciidoc" }
          },
          name: "markup.table.asciidoc",
          patterns: [
            {
              captures: {
                "1": { name: "markup.meta.attribute-list.asciidoc" },
                "2": { name: "markup.table.cell.delimiter.asciidoc" }
              },
              match: /(^|[^\\\p{Zs}\t]*)(?<!\\)(\|)/dgv
            },
            { include: "#tables-includes" }
          ]
        }
      ]
    },
    tables: {
      patterns: [
        { include: "#table-psv" },
        { include: "#table-nested" },
        { include: "#table-csv" },
        { include: "#table-dsv" }
      ]
    },
    "tables-includes": {
      patterns: [
        { include: "#comment" },
        { include: "#callout-list-item" },
        { include: "#attribute-entry" },
        { include: "#block-title" },
        { include: "#explicit-paragraph" },
        { include: "#section" },
        { include: "#blocks" },
        { include: "#list" },
        { include: "#inlines" },
        { include: "#line-break" }
      ]
    },
    titles: {
      patterns: [
        {
          begin: /^([\#\=]{6})([\p{Zs}\t]+)(?=\P{space}+)/dgv,
          beginCaptures: {
            "1": { name: "markup.heading.marker.asciidoc" },
            "2": { name: "markup.heading.space.asciidoc" }
          },
          end: /(?=\n?$)/dgv,
          name: "markup.heading.heading-5.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^([\#\=]{5})([\p{Zs}\t]+)(?=\P{space}+)/dgv,
          beginCaptures: {
            "1": { name: "markup.heading.marker.asciidoc" },
            "2": { name: "markup.heading.space.asciidoc" }
          },
          end: /(?=\n?$)/dgv,
          name: "markup.heading.heading-4.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^([\#\=]{4})([\p{Zs}\t]+)(?=\P{space}+)/dgv,
          beginCaptures: {
            "1": { name: "markup.heading.marker.asciidoc" },
            "2": { name: "markup.heading.space.asciidoc" }
          },
          end: /(?=\n?$)/dgv,
          name: "markup.heading.heading-3.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^([\#\=]{3})([\p{Zs}\t]+)(?=\P{space}+)/dgv,
          beginCaptures: {
            "1": { name: "markup.heading.marker.asciidoc" },
            "2": { name: "markup.heading.space.asciidoc" }
          },
          end: /(?=\n?$)/dgv,
          name: "markup.heading.heading-2.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^([\#\=]{2})([\p{Zs}\t]+)(?=\P{space}+)/dgv,
          beginCaptures: {
            "1": { name: "markup.heading.marker.asciidoc" },
            "2": { name: "markup.heading.space.asciidoc" }
          },
          end: /(?=\n?$)/dgv,
          name: "markup.heading.heading-1.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^([\#\=]{1})([\p{Zs}\t]+)(?=\P{space}+)/dgv,
          beginCaptures: {
            "1": { name: "markup.heading.marker.asciidoc" },
            "2": { name: "markup.heading.space.asciidoc" }
          },
          end: /(?=\n?$)/dgv,
          name: "markup.heading.heading-0.asciidoc",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "typographic-quotes": {
      patterns: [
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?:^|(?<![\:\;\p{Alpha}\p{M}\p{Nd}\p{Pc}]))(\[([^\]]+?)\])?("`)(\P{space}(?:|[^\n]*?\P{space}))(`")(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          name: "markup.italic.quote.typographic-quotes.asciidoc"
        },
        {
          captures: {
            "1": { name: "markup.meta.attribute-list.asciidoc" },
            "3": { name: "punctuation.definition.asciidoc" },
            "5": { name: "punctuation.definition.asciidoc" }
          },
          match: /(?:^|(?<![\:\;\p{Alpha}\p{M}\p{Nd}\p{Pc}]))(\[([^\]]+?)\])?('`)(\P{space}(?:|[^\n]*?\P{space}))(`')(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          name: "markup.italic.quote.typographic-quotes.asciidoc"
        }
      ]
    },
    "xref-macro": {
      patterns: [
        {
          captures: {
            "1": { name: "constant.asciidoc" },
            "2": { name: "markup.meta.attribute-list.asciidoc" },
            "3": { name: "string.unquoted.asciidoc" },
            "4": { name: "constant.asciidoc" }
          },
          match: /(?<!\\)(<<)(["\.\/\:\p{Alpha}\p{M}\p{Nd}\p{Pc}]+,)?([^\n]*?)(>>)/dgv,
          name: "markup.reference.xref.asciidoc"
        },
        {
          begin: /(?<!\\)(xref:)(["\.\/\:\p{Alpha}\p{M}\p{Nd}\p{Pc}][^\n]*?)(\[)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.asciidoc" },
            "2": { name: "markup.meta.attribute-list.asciidoc" }
          },
          contentName: "string.unquoted.asciidoc",
          end: /(?<!\\)\]|^(?=\n?$)/dgv,
          name: "markup.reference.xref.asciidoc"
        }
      ]
    }
  },
  dependencies: []
};
