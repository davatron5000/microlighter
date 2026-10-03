export default {
  name: "cypher",
  displayName: "Cypher",
  aliases: [
    "cql"
  ],
  scopeName: "source.cypher",
  patterns: [
    { include: "#comments" },
    { include: "#constants" },
    { include: "#keywords" },
    { include: "#functions" },
    { include: "#path-patterns" },
    { include: "#operators" },
    { include: "#identifiers" },
    { include: "#properties_literal" },
    { include: "#numbers" },
    { include: "#strings" }
  ],
  repository: {
    comments: {
      patterns: [
        {
          match: /\/\/[^\n]*(?=\n?$)\n?/dgv,
          name: "comment.line.double-slash.cypher"
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\bTRUE|FALSE\b/dgiv,
          name: "constant.language.bool.cypher"
        },
        {
          match: /\bNULL\b/dgiv,
          name: "constant.language.missing.cypher"
        }
      ]
    },
    functions: {
      patterns: [
        {
          match: /\b((NOT)(?=\p{space}*\()|IS\p{space}+NULL|IS\p{space}+NOT\p{space}+NULL)/dgiv,
          name: "keyword.control.function.boolean.cypher"
        },
        {
          match: /\b(ALL|ANY|NONE|SINGLE)(?=\p{space}*\()/dgiv,
          name: "support.function.predicate.cypher"
        },
        {
          match: /\b(LENGTH|TYPE|ID|COALESCE|HEAD|LAST|TIMESTAMP|STARTNODE|ENDNODE|TOINT|TOFLOAT)(?=\p{space}*\()/dgiv,
          name: "support.function.scalar.cypher"
        },
        {
          match: /\b(NODES|RELATIONSHIPS|LABELS|EXTRACT|FILTER|TAIL|RANGE|REDUCE)(?=\p{space}*\()/dgiv,
          name: "support.function.collection.cypher"
        },
        {
          match: /\b(ABS|ACOS|ASIN|ATAN2??|COS|COT|DEGREES|E|EXP|FLOOR|HAVERSIN|LOG|LOG10|PI|RADIANS|RAND|ROUND|SIGN|SIN|SQRT|TAN)(?=\p{space}*\()/dgiv,
          name: "support.function.math.cypher"
        },
        {
          match: /\b(COUNT|sum|avg|max|min|stdevp??|percentileDisc|percentileCont|collect)(?=\p{space}*\()/dgiv,
          name: "support.function.aggregation.cypher"
        },
        {
          match: /\b(STR|REPLACE|SUBSTRING|LEFT|RIGHT|LTRIM|RTRIM|TRIM|LOWER|UPPER|SPLIT)(?=\p{space}*\()/dgiv,
          name: "support.function.string.cypher"
        }
      ]
    },
    identifiers: {
      patterns: [
        {
          match: /`[^\n]+?`/dgv,
          name: "variable.other.quoted-identifier.cypher"
        },
        {
          match: /[_\p{L}][0-9_\p{L}]*/dgv,
          name: "variable.other.identifier.cypher"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(START|MATCH|WHERE|RETURN|UNION|FOREACH|WITH|AS|LIMIT|SKIP|UNWIND|HAS|DISTINCT|OPTIONAL\\s+MATCH|ORDER\p{space}+BY|CALL|YIELD)\b/dgiv,
          name: "keyword.control.clause.cypher"
        },
        {
          match: /\b(ELSE|END|THEN|CASE|WHEN)\b/dgiv,
          name: "keyword.control.case.cypher"
        },
        {
          match: /\b(FIELDTERMINATOR|USING\p{space}+PERIODIC\p{space}+COMMIT|HEADERS|LOAD\p{space}+CSV|FROM)\b/dgiv,
          name: "keyword.data.import.cypher"
        },
        {
          match: /\b(USING\p{space}+INDEX|CREATE\p{space}+INDEX\p{space}+ON|DROP\p{space}+INDEX\p{space}+ON|CREATE\p{space}+CONSTRAINT\p{space}+ON|DROP\p{space}+CONSTRAINT\p{space}+ON)\b/dgiv,
          name: "keyword.other.indexes.cypher"
        },
        {
          match: /\b(MERGE|DELETE|SET|REMOVE|ON\p{space}+CREATE|ON\p{space}+MATCH|CREATE\p{space}+UNIQUE|CREATE)\b/dgiv,
          name: "keyword.data.definition.cypher"
        },
        {
          match: /\b(DESC|ASC)\b/dgiv,
          name: "keyword.other.order.cypher"
        },
        {
          begin: /\b(node|relationship|rel)((:)([\-_\p{L}][0-9_\p{L}]*))?(?=\p{space}*\()/dgiv,
          beginCaptures: {
            "1": { name: "support.class.starting-functions-point.cypher" },
            "2": { name: "keyword.control.index-seperator.cypher" },
            "3": { name: "keyword.control.index-seperator.cypher" },
            "4": { name: "support.class.index.cypher" }
          },
          end: /\)/dgv,
          name: "source.starting-functions.cypher",
          patterns: [
            {
              match: /(`[^\n]+?`|[_\p{L}][0-9_\p{L}]*)/dgv,
              name: "variable.parameter.relationship-name.cypher"
            },
            {
              match: /(\*)/dgv,
              name: "keyword.control.starting-function-params.cypher"
            },
            { include: "#comments" },
            { include: "#numbers" },
            { include: "#strings" }
          ]
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /\b\p{Nd}+(\.\p{Nd}+)?\b/dgv,
          name: "constant.numeric.cypher"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /([\-\!\%\*\+\/\?])/dgv,
          name: "keyword.operator.math.cypher"
        },
        {
          match: /(<=|=>|<>|[\<\>]|=~?)/dgv,
          name: "keyword.operator.compare.cypher"
        },
        {
          match: /\b(OR|AND|XOR|IS)\b/dgiv,
          name: "keyword.operator.logical.cypher"
        },
        {
          match: /\b(IN)\b/dgiv,
          name: "keyword.operator.in.cypher"
        }
      ]
    },
    "path-patterns": {
      patterns: [
        {
          match: /(<--|-->?)/dgv,
          name: "support.function.relationship-pattern.cypher"
        },
        {
          begin: /(<?-)(\[)/dgv,
          beginCaptures: {
            "1": { name: "support.function.relationship-pattern-start.cypher" },
            "2": { name: "keyword.operator.relationship-pattern-start.cypher" }
          },
          end: /(\])(->?)/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.relationship-pattern-end.cypher" },
            "2": { name: "support.function.relationship-pattern-end.cypher" }
          },
          name: "path-pattern.cypher",
          patterns: [
            { include: "#identifiers" },
            {
              captures: {
                "1": { name: "keyword.operator.relationship-type-start.cypher" },
                "2": { name: "entity.name.class.relationship.type.cypher" }
              },
              match: /(:)(`[^\n]+?`|[_\p{L}][0-9_\p{L}]*)/dgv,
              name: "entity.name.class.relationship-type.cypher"
            },
            {
              captures: {
                "1": { name: "support.type.operator.relationship-type-or.cypher" },
                "2": { name: "entity.name.class.relationship.type-or.cypher" }
              },
              match: /(\|)(\p{space}*)(`[^\n]+?`|[_\p{L}][0-9_\p{L}]*)/dgv,
              name: "entity.name.class.relationship-type-ored.cypher"
            },
            {
              match: /(?:\?\*|[\*\?])\p{space}*(?:\p{Nd}+\p{space}*(?:\.\.\p{space}*\p{Nd}+)?)?/dgv,
              name: "support.function.relationship-pattern.quant.cypher"
            },
            { include: "#properties_literal" }
          ]
        }
      ]
    },
    properties_literal: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.properties_literal.cypher" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "keyword.control.properties_literal.cypher" }
          },
          name: "source.cypher",
          patterns: [
            {
              match: /[\,\:]/dgv,
              name: "keyword.control.properties_literal.seperator.cypher"
            },
            { include: "#comments" },
            { include: "#constants" },
            { include: "#functions" },
            { include: "#operators" },
            { include: "#identifiers" },
            { include: "#numbers" },
            { include: "#strings" }
          ]
        }
      ]
    },
    string_escape: {
      captures: {
        "2": { name: "string.quoted.double.cypher" }
      },
      match: /(\\[\\bfnrt])|(\\["'])/dgv,
      name: "constant.character.escape.cypher"
    },
    strings: {
      patterns: [
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.cypher",
          patterns: [
            { include: "#string_escape" }
          ]
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.cypher",
          patterns: [
            { include: "#string_escape" }
          ]
        }
      ]
    }
  },
  dependencies: []
};
