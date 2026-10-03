import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "ini",
  displayName: "INI",
  aliases: [
    "properties"
  ],
  scopeName: "source.ini",
  patterns: [
    {
      begin: /(^[\t ]+)?(?=#)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.ini" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.ini" }
          },
          end: /\n/dgv,
          name: "comment.line.number-sign.ini"
        }
      ]
    },
    {
      begin: /(^[\t ]+)?(?=;)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.ini" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /;/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.ini" }
          },
          end: /\n/dgv,
          name: "comment.line.semicolon.ini"
        }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.other.definition.ini" },
        "2": { name: "punctuation.separator.key-value.ini" }
      },
      match: /\b([\-\.0-9A-Z_a-z]+)\b\p{space}*(=)/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.definition.entity.ini" },
        "3": { name: "punctuation.definition.entity.ini" }
      },
      match: /^(\[)([^\n]*?)(\])/dgv,
      name: "entity.name.section.group-title.ini"
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ini" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ini" }
      },
      name: "string.quoted.single.ini",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.ini"
        }
      ]
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ini" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ini" }
      },
      name: "string.quoted.double.ini"
    }
  ],
  dependencies: []
};
