import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "po",
  displayName: "Gettext PO",
  aliases: [
    "pot",
    "potx"
  ],
  scopeName: "source.po",
  patterns: [
    {
      begin: /^(?:(?=(msg(?:id(_plural)?|ctxt))\p{space}*"[^"])|\p{space}*(?=\n?$))/dgv,
      end: /$/dgv,
      patterns: [
        { include: "#body" }
      ]
    },
    { include: "#comments" },
    {
      match: /^msg(id|str)\p{space}+""\p{space}*(?=\n?$)\n?/dgv,
      name: "comment.line.number-sign.po"
    },
    {
      captures: {
        "1": { name: "constant.language.po" },
        "2": { name: "punctuation.separator.key-value.po" },
        "3": { name: "string.other.po" }
      },
      match: /^"(?:([^\:\p{space}]+)(:)\p{space}+)?([^"]*)"\p{space}*(?=\n?$)\n?/dgv,
      name: "meta.header.po"
    }
  ],
  repository: {
    body: {
      patterns: [
        {
          begin: /^(msgid(_plural)?)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.msgid.po" }
          },
          end: /^(?!")/dgv,
          name: "meta.scope.msgid.po",
          patterns: [
            {
              begin: {
                G: [/(￿|^)"/dgv, new EmulatedRegExp("(^|^)\"", "dgv", { strategy: "clip_search" })]
              },
              end: /"/dgv,
              name: "string.quoted.double.po",
              patterns: [
                {
                  match: /\\["\\]/dgv,
                  name: "constant.character.escape.po"
                }
              ]
            }
          ]
        },
        {
          begin: /^(msgstr)(?:(\[)(\p{Nd}+)(\]))?\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.msgstr.po" },
            "2": { name: "keyword.control.msgstr.po" },
            "3": { name: "constant.numeric.po" },
            "4": { name: "keyword.control.msgstr.po" }
          },
          end: /^(?!")/dgv,
          name: "meta.scope.msgstr.po",
          patterns: [
            {
              begin: {
                G: [/(￿|^)"/dgv, new EmulatedRegExp("(^|^)\"", "dgv", { strategy: "clip_search" })]
              },
              end: /"/dgv,
              name: "string.quoted.double.po",
              patterns: [
                {
                  match: /\\["\\]/dgv,
                  name: "constant.character.escape.po"
                }
              ]
            }
          ]
        },
        {
          begin: /^(msgctxt)(?:(\[)(\p{Nd}+)(\]))?\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.msgctxt.po" },
            "2": { name: "keyword.control.msgctxt.po" },
            "3": { name: "constant.numeric.po" },
            "4": { name: "keyword.control.msgctxt.po" }
          },
          end: /^(?!")/dgv,
          name: "meta.scope.msgctxt.po",
          patterns: [
            {
              begin: {
                G: [/(￿|^)"/dgv, new EmulatedRegExp("(^|^)\"", "dgv", { strategy: "clip_search" })]
              },
              end: /"/dgv,
              name: "string.quoted.double.po",
              patterns: [
                {
                  match: /\\["\\]/dgv,
                  name: "constant.character.escape.po"
                }
              ]
            }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.po" }
          },
          match: /^(#~)[^\n]*(?=\n?$)\n?/dgv,
          name: "comment.line.number-sign.obsolete.po"
        },
        { include: "#comments" },
        {
          match: /^(?!\p{space}*(?=\n?$))[^"\#][^\n]*(?=\n?$)\n?/dgv,
          name: "invalid.illegal.po"
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /^(?=#)/dgv,
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /(#,)\p{space}+/dgv,
              beginCaptures: {
                "1": { name: "punctuation.definition.comment.po" }
              },
              end: /\n/dgv,
              name: "comment.line.number-sign.flag.po",
              patterns: [
                {
                  captures: {
                    "1": { name: "entity.name.type.flag.po" }
                  },
                  match: {
                    G: [/(?:￿|,\p{space}*)(fuzzy|(?:no-)?(?:c|objc|sh|lisp|elisp|librep|scheme|smalltalk|java|csharp|awk|object-pascal|ycp|tcl|perl|perl-brace|php|gcc-internal|qt|boost)-format)/dgv, new EmulatedRegExp("(?:^|,\\p{space}*)(fuzzy|(?:no-)?(?:c|objc|sh|lisp|elisp|librep|scheme|smalltalk|java|csharp|awk|object-pascal|ycp|tcl|perl|perl-brace|php|gcc-internal|qt|boost)-format)", "dgv", { strategy: "clip_search" })]
                  }
                }
              ]
            },
            {
              begin: /#\./dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.po" }
              },
              end: /\n/dgv,
              name: "comment.line.number-sign.extracted.po"
            },
            {
              begin: /(#:)[\t ]*/dgv,
              beginCaptures: {
                "1": { name: "punctuation.definition.comment.po" }
              },
              end: /\n/dgv,
              name: "comment.line.number-sign.reference.po",
              patterns: [
                {
                  match: /(\P{space}+:)([\;\p{Nd}]*)/dgv,
                  name: "storage.type.class.po"
                }
              ]
            },
            {
              begin: /#\|/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.po" }
              },
              end: /\n/dgv,
              name: "comment.line.number-sign.previous.po"
            },
            {
              begin: /#/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.po" }
              },
              end: /\n/dgv,
              name: "comment.line.number-sign.po"
            }
          ]
        }
      ]
    }
  },
  dependencies: []
};
