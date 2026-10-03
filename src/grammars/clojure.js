export default {
  name: "clojure",
  displayName: "Clojure",
  aliases: [
    "clj"
  ],
  scopeName: "source.clojure",
  patterns: [
    { include: "#comment" },
    { include: "#shebang-comment" },
    { include: "#quoted-sexp" },
    { include: "#sexp" },
    { include: "#keyfn" },
    { include: "#string" },
    { include: "#vector" },
    { include: "#set" },
    { include: "#map" },
    { include: "#regexp" },
    { include: "#var" },
    { include: "#constants" },
    { include: "#dynamic-variables" },
    { include: "#metadata" },
    { include: "#namespace-symbol" },
    { include: "#symbol" }
  ],
  repository: {
    comment: {
      begin: /(?<!\\);/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.clojure" }
      },
      end: /(?=\n?$)/dgv,
      name: "comment.line.semicolon.clojure"
    },
    constants: {
      patterns: [
        {
          match: /(nil)(?=([\]\)\}\p{space}]))/dgv,
          name: "constant.language.nil.clojure"
        },
        {
          match: /(true|false)/dgv,
          name: "constant.language.boolean.clojure"
        },
        {
          match: /(##(?:Inf|-Inf|NaN))/dgv,
          name: "constant.numeric.symbol.clojure"
        },
        {
          match: /([\-\+]?\p{Nd}+\/\p{Nd}+)/dgv,
          name: "constant.numeric.ratio.clojure"
        },
        {
          match: /([\-\+]?(?:3[0-6]|[12]\p{Nd}|[2-9])[Rr][0-9A-Za-z]+N?)/dgv,
          name: "constant.numeric.arbitrary-radix.clojure"
        },
        {
          match: /([\-\+]?0[Xx]\p{AHex}+N?)/dgv,
          name: "constant.numeric.hexadecimal.clojure"
        },
        {
          match: /([\-\+]?0[0-7]+N?)/dgv,
          name: "constant.numeric.octal.clojure"
        },
        {
          match: /([\-\+]?[0-9]+(\.|(?=[EMe]))[0-9]*([Ee][\-\+]?[0-9]+)?M?)/dgv,
          name: "constant.numeric.double.clojure"
        },
        {
          match: /([\-\+]?\p{Nd}+N?)/dgv,
          name: "constant.numeric.long.clojure"
        },
        { include: "#keyword" }
      ]
    },
    "dynamic-variables": {
      match: /\*[\-\!\+\.\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]+\*/dgv,
      name: "meta.symbol.dynamic.clojure"
    },
    keyfn: {
      patterns: [
        {
          match: /(?<=([\(\[\{\p{space}]))(if(-[\-\?\p{Ll}]*)?|when(-[\-\p{Ll}]*)?|for(-[\-\p{Ll}]*)?|cond|do|let(-[\-\?\p{Ll}]*)?|binding|loop|recur|fn|throw[\-\p{Ll}]*|try|catch|finally|(\p{Ll}*case))(?=([\]\)\}\p{space}]))/dgv,
          name: "storage.control.clojure"
        },
        {
          match: /(?<=([\(\[\{\p{space}]))(declare-?|(in-)?ns|import|use|require|load|compile|(def[\-\p{Ll}]*))(?=([\]\)\}\p{space}]))/dgv,
          name: "keyword.control.clojure"
        }
      ]
    },
    keyword: {
      match: /(?<=([\(\[\{\p{space}])):[\-\!\#\*\+\.\/\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}]+(?=([\]\)\,\}\p{space}]))/dgv,
      name: "constant.keyword.clojure"
    },
    map: {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.map.begin.clojure" }
      },
      end: /(\}(?=[\]\)\}\p{space}]*(?:;|(?=\n?$))))|(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.map.end.trailing.clojure" },
        "2": { name: "punctuation.section.map.end.clojure" }
      },
      name: "meta.map.clojure",
      patterns: [
        { include: "$self" }
      ]
    },
    metadata: {
      patterns: [
        {
          begin: /(\^\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.metadata.map.begin.clojure" }
          },
          end: /(\}(?=[\]\)\}\p{space}]*(?:;|(?=\n?$))))|(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.metadata.map.end.trailing.clojure" },
            "2": { name: "punctuation.section.metadata.map.end.clojure" }
          },
          name: "meta.metadata.map.clojure",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(\^)/dgv,
          end: /(\p{space})/dgv,
          name: "meta.metadata.simple.clojure",
          patterns: [
            { include: "#keyword" },
            { include: "$self" }
          ]
        }
      ]
    },
    "namespace-symbol": {
      patterns: [
        {
          captures: {
            "1": { name: "meta.symbol.namespace.clojure" }
          },
          match: /([\-\!\*\+\.\<-\?_\p{L}][\-\!\*\+\.\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]*)\//dgv
        }
      ]
    },
    "quoted-sexp": {
      begin: /(['\`]\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.expression.begin.clojure" }
      },
      end: /(\))(?=\n?$)|(\)(?=[\]\)\}\p{space}]*(?:;|(?=\n?$))))|(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.expression.end.trailing.clojure" },
        "2": { name: "punctuation.section.expression.end.trailing.clojure" },
        "3": { name: "punctuation.section.expression.end.clojure" }
      },
      name: "meta.quoted-expression.clojure",
      patterns: [
        { include: "$self" }
      ]
    },
    regexp: {
      begin: /#"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.regexp.begin.clojure" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.regexp.end.clojure" }
      },
      name: "string.regexp.clojure",
      patterns: [
        { include: "#regexp_escaped_char" }
      ]
    },
    regexp_escaped_char: {
      match: /\\[^\n]/dgv,
      name: "constant.character.escape.clojure"
    },
    set: {
      begin: /(#\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.set.begin.clojure" }
      },
      end: /(\}(?=[\]\)\}\p{space}]*(?:;|(?=\n?$))))|(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.set.end.trailing.clojure" },
        "2": { name: "punctuation.section.set.end.clojure" }
      },
      name: "meta.set.clojure",
      patterns: [
        { include: "$self" }
      ]
    },
    sexp: {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.expression.begin.clojure" }
      },
      end: /(\))(?=\n?$)|(\)(?=[\]\)\}\p{space}]*(?:;|(?=\n?$))))|(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.expression.end.trailing.clojure" },
        "2": { name: "punctuation.section.expression.end.trailing.clojure" },
        "3": { name: "punctuation.section.expression.end.clojure" }
      },
      name: "meta.expression.clojure",
      patterns: [
        {
          begin: /(?<=\()(ns|declare|def[\-\!\*\+\.\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]*|[\-\!\*\+\.\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}][\-\!\*\+\.\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]*\/def[\-\!\*\+\.\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]*)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.clojure" }
          },
          end: /(?=\))/dgv,
          name: "meta.definition.global.clojure",
          patterns: [
            { include: "#metadata" },
            { include: "#dynamic-variables" },
            {
              match: /([\-\!\*\+\.\<-\?_\p{L}][\-\!\*\+\.\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]*)/dgv,
              name: "entity.global.clojure"
            },
            { include: "$self" }
          ]
        },
        { include: "#keyfn" },
        { include: "#constants" },
        { include: "#vector" },
        { include: "#map" },
        { include: "#set" },
        { include: "#sexp" },
        {
          captures: {
            "1": { name: "entity.name.function.clojure" }
          },
          match: /(?<=\()([^\n]+?)(?=[\)\p{space}])/dgv,
          patterns: [
            { include: "$self" }
          ]
        },
        { include: "$self" }
      ]
    },
    "shebang-comment": {
      begin: /^(#!)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.shebang.clojure" }
      },
      end: /(?=\n?$)/dgv,
      name: "comment.line.shebang.clojure"
    },
    string: {
      begin: /(?<!\\)(")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.clojure" }
      },
      end: /(")/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.clojure" }
      },
      name: "string.quoted.double.clojure",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.clojure"
        }
      ]
    },
    symbol: {
      patterns: [
        {
          match: /([\-\!\*\+\.\<-\?_\p{L}][\-\!\*\+\.\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]*)/dgv,
          name: "meta.symbol.clojure"
        }
      ]
    },
    var: {
      match: /(?<=([\(\[\{\p{space}])#)'[\-\!\*\+\.\/\:\<-\?_\p{L}\p{M}\p{N}\p{Pc}]+(?=([\]\)\}\p{space}]))/dgv,
      name: "meta.var.clojure"
    },
    vector: {
      begin: /(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.vector.begin.clojure" }
      },
      end: /(\](?=[\]\)\}\p{space}]*(?:;|(?=\n?$))))|(\])/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.vector.end.trailing.clojure" },
        "2": { name: "punctuation.section.vector.end.clojure" }
      },
      name: "meta.vector.clojure",
      patterns: [
        { include: "$self" }
      ]
    }
  },
  dependencies: []
};
