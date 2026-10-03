import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "polar",
  displayName: "Polar",
  scopeName: "source.polar",
  patterns: [
    { include: "#comment" },
    { include: "#rule" },
    { include: "#rule-type" },
    { include: "#inline-query" },
    { include: "#resource-block" },
    { include: "#test-block" },
    { include: "#fixture" }
  ],
  repository: {
    boolean: {
      match: /\b(true|false)\b/dgv,
      name: "constant.language.boolean"
    },
    comment: {
      match: /#[^\n]*/dgv,
      name: "comment.line.number-sign"
    },
    fixture: {
      patterns: [
        {
          match: /\bfixture\b/dgv,
          name: "keyword.control"
        },
        {
          begin: /\btest\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control" }
          },
          end: /\bfixture\b/dgv,
          endCaptures: {
            "0": { name: "keyword.control" }
          }
        }
      ]
    },
    "inline-query": {
      begin: /\?=/dgv,
      beginCaptures: {
        "0": { name: "keyword.control" }
      },
      end: /;/dgv,
      name: "meta.inline-query",
      patterns: [
        { include: "#term" }
      ]
    },
    keyword: {
      patterns: [
        {
          match: /\b(cut|or|debug|print|in|forall|if|and|of|not|matches|type|on|global)\b/dgv,
          name: "constant.character"
        }
      ]
    },
    number: {
      patterns: [
        {
          match: /\b[\-\+]?\p{Nd}+(?:(\.)\p{Nd}+(?:e[\-\+]?\p{Nd}+)?|e[\-\+]?\p{Nd}+)\b/dgv,
          name: "constant.numeric.float"
        },
        {
          match: /\b([\-\+])\p{Nd}+\b/dgv,
          name: "constant.numeric.integer"
        },
        {
          match: /\b\p{Nd}+\b/dgv,
          name: "constant.numeric.natural"
        }
      ]
    },
    "object-literal": {
      begin: /([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "entity.name.type.resource" }
      },
      end: /\}/dgv,
      name: "constant.other.object-literal",
      patterns: [
        { include: "#string" },
        { include: "#number" },
        { include: "#boolean" }
      ]
    },
    operator: {
      captures: {
        "1": { name: "keyword.control" }
      },
      match: /([\-\!\*\+\/\<\=\>])/dgv
    },
    "resource-block": {
      begin: new EmulatedRegExp("(?<resourceType>[A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*){0}((resource|actor)\\p{space}+(([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*))(?:\\p{space}+(extends)\\p{space}+(([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*)(?:\\p{space}*,\\p{space}*([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*))*)\\p{space}*,?\\p{space}*)?|(global))\\p{space}*\\{", "dgv", { hiddenCaptures: [5, 8, 9], transfers: [[1, [5, 8, 9]]] }),
      beginCaptures: {
        "3": { name: "keyword.control" },
        "4": { name: "entity.name.type" },
        "5": { name: "keyword.control" },
        "6": {
          patterns: [
            {
              match: /([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*)/dgv,
              name: "entity.name.type"
            }
          ]
        },
        "7": { name: "keyword.control" }
      },
      end: /\}/dgv,
      name: "meta.resource-block",
      patterns: [
        {
          match: /;/dgv,
          name: "punctuation.separator.sequence.declarations"
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.relation-declaration",
          patterns: [
            { include: "#specializer" },
            { include: "#comment" },
            {
              match: /,/dgv,
              name: "punctuation.separator.sequence.dict"
            }
          ]
        },
        { include: "#term" }
      ]
    },
    rule: {
      name: "meta.rule",
      patterns: [
        { include: "#rule-functor" },
        {
          begin: /\bif\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.if" }
          },
          end: /;/dgv,
          patterns: [
            { include: "#term" }
          ]
        },
        {
          match: /;/dgv
        }
      ]
    },
    "rule-functor": {
      begin: /([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*)\p{space}*\(/dgv,
      beginCaptures: {
        "1": { name: "support.function.rule" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#specializer" },
        {
          match: /,/dgv,
          name: "punctuation.separator.sequence.list"
        },
        { include: "#term" }
      ]
    },
    "rule-type": {
      begin: /\btype\b/dgv,
      beginCaptures: {
        "0": { name: "keyword.other.type-decl" }
      },
      end: /;/dgv,
      name: "meta.rule-type",
      patterns: [
        { include: "#rule-functor" }
      ]
    },
    specializer: {
      captures: {
        "1": { name: "entity.name.type.resource" }
      },
      match: /[A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*\p{space}*:\p{space}*([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*)/dgv
    },
    string: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape"
        }
      ]
    },
    term: {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#number" },
        { include: "#keyword" },
        { include: "#operator" },
        { include: "#boolean" },
        { include: "#object-literal" },
        {
          begin: /\[/dgv,
          end: /\]/dgv,
          name: "meta.bracket.list",
          patterns: [
            { include: "#term" },
            {
              match: /,/dgv,
              name: "punctuation.separator.sequence.list"
            }
          ]
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.bracket.dict",
          patterns: [
            { include: "#term" },
            {
              match: /,/dgv,
              name: "punctuation.separator.sequence.dict"
            }
          ]
        },
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          name: "meta.parens",
          patterns: [
            { include: "#term" }
          ]
        }
      ]
    },
    "test-block": {
      begin: /(test)\p{space}+("[^"]*")\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "keyword.control" },
        "2": { name: "string.quoted.double" }
      },
      end: /\}/dgv,
      name: "meta.test-block",
      patterns: [
        {
          begin: /(setup)\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control" }
          },
          end: /\}/dgv,
          name: "meta.test-setup",
          patterns: [
            { include: "#rule" },
            { include: "#comment" },
            { include: "#fixture" }
          ]
        },
        { include: "#rule" },
        {
          match: /\b(assert(?:|_not))\b/dgv,
          name: "keyword.other"
        },
        { include: "#comment" },
        {
          name: "meta.iff-rule",
          patterns: [
            { include: "#rule-functor" },
            {
              begin: /\biff\b/dgv,
              beginCaptures: {
                "0": { name: "keyword.control" }
              },
              end: /;/dgv,
              patterns: [
                { include: "#term" }
              ]
            },
            {
              match: /;/dgv
            }
          ]
        }
      ]
    }
  },
  dependencies: []
};
