export default {
  name: "beancount",
  displayName: "Beancount",
  scopeName: "text.beancount",
  patterns: [
    {
      match: /;[^\n]*/dgv,
      name: "comment.line.beancount"
    },
    {
      begin: /^\p{space}*(p(?:op|ush)tag)\p{space}+(#)([\--9A-Z_a-z]+)/dgv,
      beginCaptures: {
        "1": { name: "support.function.beancount" },
        "2": { name: "keyword.operator.tag.beancount" },
        "3": { name: "entity.name.tag.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.tag.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /^\p{space}*(include)\p{space}+("[^\n]*")/dgv,
      beginCaptures: {
        "1": { name: "support.function.beancount" },
        "2": { name: "string.quoted.double.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.include.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /^\p{space}*(option)\p{space}+("[^\n]*")\p{space}+("[^\n]*")/dgv,
      beginCaptures: {
        "1": { name: "support.function.beancount" },
        "2": { name: "support.variable.beancount" },
        "3": { name: "string.quoted.double.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.option.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /^\p{space}*(plugin)\p{space}*("([^\n]*?)")\p{space}*("[^\n]*?")?/dgv,
      beginCaptures: {
        "1": { name: "support.function.beancount" },
        "2": { name: "string.quoted.double.beancount" },
        "3": { name: "entity.name.function.beancount" },
        "4": { name: "string.quoted.double.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "keyword.operator.directive.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}+(open|close|pad)\b/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": { name: "support.function.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.dated.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#meta" },
        { include: "#account" },
        { include: "#commodity" },
        {
          match: /,/dgv,
          name: "punctuation.separator.beancount"
        },
        { include: "#illegal" }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}+(custom)\b/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": { name: "support.function.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.dated.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#meta" },
        { include: "#string" },
        { include: "#bool" },
        { include: "#amount" },
        { include: "#number" },
        { include: "#date" },
        { include: "#account" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}(event)/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": { name: "support.function.directive.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.dated.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#meta" },
        { include: "#string" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}(commodity)/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": { name: "support.function.directive.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.dated.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#meta" },
        { include: "#commodity" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}(note|document)/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": { name: "support.function.directive.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.dated.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#meta" },
        { include: "#account" },
        { include: "#string" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}+(query)\p{space}+("(?:[^"\\]|\\[^\n])*")\p{space}+(")/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": { name: "support.function.directive.beancount" },
        "7": { name: "string.quoted.double.beancount" },
        "8": { name: "punctuation.definition.string.begin.beancount" }
      },
      end: /(")/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.beancount" }
      },
      name: "meta.directive.query.beancount",
      patterns: [
        { include: "#comments" },
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.bql"
        },
        {
          match: /\b[0-9]{4}-[0-9]{2}-[0-9]{2}\b/dgv,
          name: "constant.numeric.date.bql"
        },
        {
          match: /\b(?:SELECT|FROM|WHERE|GROUP|ORDER|HAVING|LIMIT|PIVOT|AND|OR|NOT|IN|IS|BETWEEN|AS|DISTINCT|ASC|DESC|TRUE|FALSE|NULL|CREATE|TABLE|USING|INSERT|INTO|BALANCES|JOURNAL|PRINT|BY)\b/dgiv,
          name: "keyword.control.bql"
        },
        {
          match: /\b(?:abs|bool|int|decimal|str|date|year|month|day|yearmonth|quarter|weekday|today|root|parent|leaf|grepn??|subst|upper|lower|maxwidth|substr|splitcomp|length|repr|round|safediv|neg|open_date|close_date|open_meta|meta|entry_meta|any_meta|currency_meta|commodity_meta|account_sortkey|has_account|units|cost|value|getprice|number|currency|commodity|findfirst|joinstr|only|empty|filter_currency|convert|parse_date|date_diff|date_add|date_trunc|date_part|interval|date_bin|getitem|possign|sum|count|first|last|min|max)\b(?=\p{space}*\()/dgiv,
          name: "support.function.bql"
        },
        {
          match: /\b(?:id|type|filename|lineno|location|date|year|month|day|flag|payee|narration|description|tags|links|meta|accounts?|other_accounts|posting_flag|number|currency|cost_number|cost_currency|cost_date|cost_label|position|price|weight|balance|entry)\b/dgiv,
          name: "variable.other.column.bql"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.bql",
          patterns: [
            {
              match: /""/dgv,
              name: "constant.character.escape.bql"
            }
          ]
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.bql",
          patterns: [
            {
              match: /''/dgv,
              name: "constant.character.escape.bql"
            }
          ]
        },
        {
          match: /\b\p{Nd}+(\.\p{Nd}+)?\b/dgv,
          name: "constant.numeric.bql"
        },
        {
          match: /<=|>=|!=|[\<\=\>]|\?~|!~|~/dgv,
          name: "keyword.operator.comparison.bql"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.bql"
        },
        {
          match: /[\(\)\,]/dgv,
          name: "punctuation.bql"
        }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}(price)/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": { name: "support.function.directive.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.dated.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#meta" },
        { include: "#commodity" },
        { include: "#amount" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}(balance)/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": { name: "support.function.directive.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.dated.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#meta" },
        { include: "#account" },
        { include: "#amount" },
        { include: "#illegal" }
      ]
    },
    {
      begin: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})\p{space}*(txn|[\!\#\%\&\*\?CMPR-U])\p{space}*("[^\n]*?")?\p{space}*("[^\n]*?")?/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" },
        "6": {
          name: "support.function.directive.beancount",
          patterns: [
            {
              match: /txn|\*/dgv,
              name: "support.function.directive.txn.completed.beancount"
            },
            {
              match: /!/dgv,
              name: "support.function.directive.txn.incomplete.beancount"
            },
            {
              match: /P/dgv,
              name: "support.function.directive.txn.padding.beancount"
            }
          ]
        },
        "7": { name: "string.quoted.tiers.beancount" },
        "8": { name: "string.quoted.narration.beancount" }
      },
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}))/dgv,
      name: "meta.directive.transaction.beancount",
      patterns: [
        { include: "#comments" },
        { include: "#posting" },
        { include: "#meta" },
        { include: "#tag" },
        { include: "#link" },
        { include: "#illegal" }
      ]
    }
  ],
  repository: {
    account: {
      begin: /([A-Z][a-z]+)(:)/dgv,
      beginCaptures: {
        "1": { name: "variable.language.beancount" },
        "2": { name: "punctuation.separator.beancount" }
      },
      end: /\p{space}/dgv,
      name: "meta.account.beancount",
      patterns: [
        {
          begin: /(\P{space}+)(:?)/dgv,
          beginCaptures: {
            "1": { name: "variable.other.account.beancount" },
            "2": { name: "punctuation.separator.beancount" }
          },
          end: /(:?)|(\p{space})/dgv,
          patterns: [
            { include: "$self" },
            { include: "#illegal" }
          ]
        }
      ]
    },
    amount: {
      captures: {
        "1": { name: "keyword.operator.modifier.beancount" },
        "2": { name: "constant.numeric.currency.beancount" },
        "3": { name: "entity.name.type.commodity.beancount" }
      },
      match: /([\-\+\|]?)(\p{Nd}+(?:,\p{Nd}{3})*(?:\.\p{Nd}*)?)\p{space}*([A-Z][\-'\.0-9A-Z_]{0,22}[0-9A-Z])/dgv,
      name: "meta.amount.beancount"
    },
    bool: {
      captures: {
        "0": { name: "constant.language.bool.beancount" },
        "2": { name: "constant.numeric.currency.beancount" },
        "3": { name: "entity.name.type.commodity.beancount" }
      },
      match: /TRUE|FALSE/dgv
    },
    comments: {
      captures: {
        "1": { name: "comment.line.beancount" }
      },
      match: /(;[^\n]*)(?=\n?$)/dgv
    },
    commodity: {
      match: /([A-Z][\-'\.0-9A-Z_]{0,22}[0-9A-Z])/dgv,
      name: "entity.name.type.commodity.beancount"
    },
    cost: {
      begin: /\{\{?/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.assignment.beancount" }
      },
      end: /\}\}?/dgv,
      endCaptures: {
        "0": { name: "keyword.operator.assignment.beancount" }
      },
      name: "meta.cost.beancount",
      patterns: [
        { include: "#amount" },
        { include: "#date" },
        {
          match: /,/dgv,
          name: "punctuation.separator.beancount"
        },
        { include: "#illegal" }
      ]
    },
    date: {
      captures: {
        "1": { name: "constant.numeric.date.year.beancount" },
        "2": { name: "punctuation.separator.beancount" },
        "3": { name: "constant.numeric.date.month.beancount" },
        "4": { name: "punctuation.separator.beancount" },
        "5": { name: "constant.numeric.date.day.beancount" }
      },
      match: /([0-9]{4})([\-\/\|])([0-9]{2})([\-\/\|])([0-9]{2})/dgv,
      name: "meta.date.beancount"
    },
    flag: {
      match: /(?<=\p{space})([\!\#\%\&\*\?CMPR-U])(?=\p{space}+)/dgv,
      name: "keyword.other.beancount"
    },
    illegal: {
      match: /\P{space}/dgv,
      name: "invalid.illegal.unrecognized.beancount"
    },
    link: {
      captures: {
        "1": { name: "keyword.operator.link.beancount" },
        "2": { name: "markup.underline.link.beancount" }
      },
      match: /(\^)([\--9A-Z_a-z]+)/dgv
    },
    meta: {
      begin: /^\p{space}*([a-z][\-0-9A-Z_a-z]+)(:)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.directive.beancount" },
        "2": { name: "punctuation.separator.beancount" }
      },
      end: /\n/dgv,
      name: "meta.meta.beancount",
      patterns: [
        { include: "#string" },
        { include: "#account" },
        { include: "#bool" },
        { include: "#commodity" },
        { include: "#date" },
        { include: "#tag" },
        { include: "#amount" },
        { include: "#number" },
        { include: "#comments" },
        { include: "#illegal" }
      ]
    },
    number: {
      captures: {
        "1": { name: "keyword.operator.modifier.beancount" },
        "2": { name: "constant.numeric.currency.beancount" }
      },
      match: /([\-\+\|]?)(\p{Nd}+(?:,\p{Nd}{3})*(?:\.\p{Nd}*)?)/dgv
    },
    posting: {
      begin: /^\p{space}+(?=([\!A-Z]))/dgv,
      end: /(?=^(\p{space}*(?=\n?$)|\P{space}|\p{space}*[A-Z]))/dgv,
      name: "meta.posting.beancount",
      patterns: [
        { include: "#meta" },
        { include: "#comments" },
        { include: "#flag" },
        { include: "#account" },
        { include: "#amount" },
        { include: "#cost" },
        { include: "#date" },
        { include: "#price" },
        { include: "#illegal" }
      ]
    },
    price: {
      begin: /@@?/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.assignment.beancount" }
      },
      end: /(?=([\n\;]))/dgv,
      name: "meta.price.beancount",
      patterns: [
        { include: "#amount" },
        { include: "#illegal" }
      ]
    },
    string: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.beancount",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.beancount"
        }
      ]
    },
    tag: {
      captures: {
        "1": { name: "keyword.operator.tag.beancount" },
        "2": { name: "entity.name.tag.beancount" }
      },
      match: /(#)([\--9A-Z_a-z]+)/dgv
    }
  },
  dependencies: []
};
