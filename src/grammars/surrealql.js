export default {
  name: "surrealql",
  displayName: "SurrealQL",
  aliases: [
    "surql"
  ],
  scopeName: "source.surrealql",
  patterns: [
    { include: "#comment" },
    { include: "#type-clause" },
    { include: "#keywords" },
    { include: "#operators" },
    { include: "#js-function" },
    { include: "#function" },
    { include: "#value" }
  ],
  repository: {
    "analyzer-tokenizer": {
      match: /\b(blank|camel|class|punct)\b/dgiv,
      name: "support.constant.analyzer-tokenizer.surrealql"
    },
    array: {
      begin: /\[/dgv,
      end: /\]/dgv,
      patterns: [
        { include: "#array-content" }
      ]
    },
    "array-content": {
      patterns: [
        { include: "$self" },
        {
          match: /,/dgv,
          name: "punctuation.separator.array"
        }
      ]
    },
    block: {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "surrealql.block",
      patterns: [
        { include: "#block-content" }
      ]
    },
    "block-content": {
      patterns: [
        { include: "#string" },
        { include: "#object-key" },
        { include: "$self" }
      ]
    },
    boolean: {
      match: /\b(true|TRUE|false|FALSE|True|False)\b/dgv,
      name: "constant.language.bool"
    },
    comment: {
      patterns: [
        { include: "#comment.line.dash" },
        { include: "#comment.line.slash" },
        { include: "#comment.line.hash" },
        { include: "#comment.block" }
      ]
    },
    "comment.block": {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.surrealql"
    },
    "comment.line.dash": {
      begin: /--/dgv,
      end: /\n/dgv,
      name: "comment.line.double-dash"
    },
    "comment.line.hash": {
      begin: /#/dgv,
      end: /\n/dgv,
      name: "comment.line.number-sign"
    },
    "comment.line.slash": {
      begin: /\/\//dgv,
      end: /\n/dgv,
      name: "comment.line.double-slash"
    },
    "distance-name": {
      match: /\b(chebyshev|euclidean|manhattan|minkowski|hamming|jaccard|pearson|cosine)\b/dgiv,
      name: "support.constant.distance.surrealql"
    },
    duration: {
      match: /(\p{Nd}+(?:_\p{Nd}+)* *(?:ns|µs|ms|[dhmswy])(?![A-Z_a-z]))+/dgv,
      name: "constant.other"
    },
    "filter-name": {
      match: /\b(edgengram|uppercase|snowball|ascii|ngram)\b/dgiv,
      name: "support.constant.filter.surrealql"
    },
    function: {
      begin: /(?=(\b[\p{L}\p{M}\p{N}\p{Pc}]+(?:::\b[\p{L}\p{M}\p{N}\p{Pc}]+)+|count|rand)\p{space}*\()/dgv,
      beginCaptures: {
        "1": { name: "support.function" }
      },
      end: /(?<=\))/dgv,
      patterns: [
        { include: "#comment" },
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          name: "meta.function.arguments",
          patterns: [
            { include: "#value" }
          ]
        }
      ]
    },
    ident: {
      patterns: [
        {
          begin: /`/dgv,
          end: /(?<!\\)`/dgv,
          name: "support.type.property-name"
        },
        {
          begin: /⟨/dgv,
          end: /(?<!\\)⟩/dgv,
          name: "support.type.property-name"
        }
      ]
    },
    identifier: {
      match: /\b[A-Z_a-z][0-9A-Z_a-z]*\b/dgv,
      name: "variable.other.surrealql"
    },
    "index-type": {
      match: /\b(f32|f64|i16|i32|i64)\b/dgiv,
      name: "constant.language.index-type.surrealql"
    },
    "js-function": {
      begin: /(?=\b(function)\b)/dgv,
      beginCaptures: {
        "1": { name: "support.function.js" }
      },
      end: /(?<=\})/dgv,
      patterns: [
        { include: "#comment" },
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          name: "meta.function.arguments",
          patterns: [
            { include: "#value" }
          ]
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.embedded.block.javascript",
          patterns: [
            { include: "source.js" }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(keep_pruned_connections|doc_lengths_cache|doc_lengths_order|extend_candidates|postings_cache|postings_order|doc_ids_cache|doc_ids_order|authenticate|concurrently|mtree_cache|permissions|terms_cache|terms_order|transaction|changefeed|highlights|middleware|schemafull|schemaless|tokenizers|algorithm|dimension|duplicate|functions|namespace|overwrite|reference|structure|tempfiles|analyzer|capacity|computed|continue|database)\b/dgiv,
          name: "keyword.control keyword.control.surrealql"
        },
        {
          match: /\b(duration|enforced|flexible|function|parallel|passhash|password|readonly|relation|backend|cascade|changes|collate|columns|comment|content|default|exclude|explain|expunge|filters|graphql|include|noindex|numeric|rebuild|replace|session|timeout|version|access|always|assert|bucket|cancel)\b/dgiv,
          name: "keyword.control keyword.control.surrealql"
        },
        {
          match: /\b(commit|config|create|define|delete|exists|fields|ignore|insert|issuer|normal|option|record|reject|relate|remove|return|search|select|signin|signup|strict|tables|unique|update|upsert|values|alter|async|begin|break|defer|event|fetch|field)\b/dgiv,
          name: "keyword.control keyword.control.surrealql"
        },
        {
          match: /\b(group|index|limit|merge|mtree|order|param|patch|roles|scope|since|sleep|split|start|table|throw|token|trace|unset|value|where|auto|bm25|desc|dist|drop|else|from|hnsw|info|into|kill|live|omit|only)\b/dgiv,
          name: "keyword.control keyword.control.surrealql"
        },
        {
          match: /\b(root|show|then|type|user|when|with|all|any|api|asc|efc|end|for|get|jwt|key|let|not|out|put|set|url|use|as|at|by|db|if|in|lm|m0|ns|on|sc)\b/dgiv,
          name: "keyword.control keyword.control.surrealql"
        },
        {
          match: /\b(tb|to|m)\b/dgiv,
          name: "keyword.control keyword.control.surrealql"
        }
      ]
    },
    "literal-keyword": {
      match: /\b(diff|full)\b/dgiv,
      name: "constant.language.literal.surrealql"
    },
    number: {
      patterns: [
        {
          match: /\b\p{Nd}+(?:_\p{Nd}+)*(?:\.\p{Nd}+(?:_\p{Nd}+)*)?(?:[Ee][\-\+]?\p{Nd}+(?:_\p{Nd}+)*)?dec\b/dgv,
          name: "constant.numeric.decimal"
        },
        {
          match: /\b(?:\p{Nd}+(?:_\p{Nd}+)*f|\p{Nd}+(?:_\p{Nd}+)*(?:\.\p{Nd}+(?:_\p{Nd}+)*(?:[Ee][\-\+]?\p{Nd}+(?:_\p{Nd}+)*)?|[Ee][\-\+]?\p{Nd}+(?:_\p{Nd}+)*)f?)\b/dgv,
          name: "constant.numeric.decimal"
        },
        {
          match: /\b\p{Nd}+(?:_\p{Nd}+)*\b/dgv,
          name: "constant.numeric.int"
        }
      ]
    },
    "object-key": {
      patterns: [
        {
          captures: {
            "1": { name: "string.quoted.double" }
          },
          match: /(?:^|[\,\{])[\t ]*("[^"\(\)\:\?]+")(?=:(?!:))/dgv
        },
        {
          captures: {
            "1": { name: "string.quoted.single" }
          },
          match: /(?:^|[\,\{])[\t ]*('[^'\(\)\:\?]+')(?=:(?!:))/dgv
        },
        {
          captures: {
            "2": { name: "meta.object-literal.key" }
          },
          match: /(^|[\,\{])[\t ]*([0-9A-Z_a-z]+)(?=:(?!:))/dgv
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /<->|->|<-|<~/dgv,
          name: "keyword.operator.arrow.surrealql"
        },
        { include: "#regex-literal" },
        {
          match: /\.\.(?==)/dgv,
          name: "keyword.operator.range.surrealql"
        },
        {
          match: /\.\.(?!\.)/dgv,
          name: "keyword.operator.range.surrealql"
        },
        {
          match: /\b(containsnone|containsnot|containsall|containsany|noneinside|intersects|notinside|allinside|anyinside|contains|outside|inside|and|or)\b/dgiv,
          name: "keyword.operator.word.surrealql"
        },
        {
          match: /&&/dgv,
          name: "keyword.operator.logical-and.surrealql"
        },
        {
          match: /\|\|/dgv,
          name: "keyword.operator.logical-or.surrealql"
        },
        {
          match: /\b(IS NOT|is not)\b|!=/dgv,
          name: "keyword.operator.is-not.surrealql"
        },
        {
          match: /\b(IS|is)\b|=/dgv,
          name: "keyword.operator.is.surrealql"
        },
        {
          match: /\b(CONTAINSSOME|containssome)\b/dgv,
          name: "keyword.operator.containssome.surrealql"
        },
        {
          match: /∋/dgv,
          name: "keyword.operator.contains.surrealql"
        },
        {
          match: /⊇/dgv,
          name: "keyword.operator.containsall.surrealql"
        },
        {
          match: /⊃/dgv,
          name: "keyword.operator.containsany.surrealql"
        },
        {
          match: /⊅/dgv,
          name: "keyword.operator.containsnone.surrealql"
        },
        {
          match: /∌/dgv,
          name: "keyword.operator.containsnot.surrealql"
        },
        {
          match: /⊆/dgv,
          name: "keyword.operator.allinside.surrealql"
        },
        {
          match: /⊂/dgv,
          name: "keyword.operator.anyinside.surrealql"
        },
        {
          match: /⊄/dgv,
          name: "keyword.operator.noneinside.surrealql"
        },
        {
          match: /∉/dgv,
          name: "keyword.operator.notinside.surrealql"
        },
        {
          match: /∈/dgv,
          name: "keyword.operator.inside.surrealql"
        },
        {
          match: /==/dgv,
          name: "keyword.operator.equal.surrealql"
        },
        {
          match: /\*=/dgv,
          name: "keyword.operator.all-equal.surrealql"
        },
        {
          match: /\?=/dgv,
          name: "keyword.operator.any-equal.surrealql"
        },
        {
          match: /!~/dgv,
          name: "keyword.operator.fuzzy-inequal.surrealql"
        },
        {
          match: /\*~/dgv,
          name: "keyword.operator.fuzzy-all-equal.surrealql"
        },
        {
          match: /\?~/dgv,
          name: "keyword.operator.fuzzy-any-equal.surrealql"
        },
        {
          match: /~/dgv,
          name: "keyword.operator.fuzzy-equal.surrealql"
        },
        {
          match: /<=/dgv,
          name: "keyword.operator.less-or-equal.surrealql"
        },
        {
          match: /<(?!-|[a-z]+[^\:])/dgv,
          name: "keyword.operator.less.surrealql"
        },
        {
          match: />=/dgv,
          name: "keyword.operator.more-or-equal.surrealql"
        },
        {
          match: /(?<!-)>/dgv,
          name: "keyword.operator.more.surrealql"
        },
        {
          match: /\+/dgv,
          name: "keyword.operator.add.surrealql"
        },
        {
          match: /-/dgv,
          name: "keyword.operator.subtract.surrealql"
        },
        {
          match: /[\*×∙]/dgv,
          name: "keyword.operator.multiply.surrealql"
        },
        {
          match: /[\/÷]/dgv,
          name: "keyword.operator.devide.surrealql"
        },
        {
          captures: {
            "1": { name: "constant.numeric.int" }
          },
          match: /@([0-9]+)?@/dgv,
          name: "keyword.operator.matches.surrealql"
        },
        {
          match: /\.\?/dgv,
          name: "keyword.operator.optional.surrealql"
        },
        {
          match: /\?:/dgv,
          name: "keyword.operator.either.surrealql"
        },
        {
          match: /\?\?/dgv,
          name: "keyword.operator.truthy.surrealql"
        },
        {
          match: /<\|([\,A-Za-z\|\p{Nd}])+\|>/dgv,
          name: "keyword.operator.knn.surrealql"
        }
      ]
    },
    positional: {
      match: /\b(AFTER|after|BEFORE|before)\b/dgv,
      name: "constant.language.positional"
    },
    query: {
      patterns: [
        { include: "$self" }
      ]
    },
    record: {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.class" },
            "2": { name: "entity.name.class" }
          },
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b:⟨([^⟩]+)⟩/dgv
        },
        {
          captures: {
            "1": { name: "entity.name.class" },
            "2": { name: "entity.name.class" }
          },
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b:`([^\`]+)`/dgv
        },
        {
          begin: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b:(?=\b([\:\p{L}\p{M}\p{N}\p{Pc}]+)\b\p{space}*\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.class" },
            "2": { name: "support.function" }
          },
          end: /(?<=\))/dgv,
          patterns: [
            { include: "#comment" },
            {
              begin: /\(/dgv,
              end: /\)/dgv,
              name: "meta.function.arguments",
              patterns: [
                { include: "#value" }
              ]
            }
          ]
        },
        {
          captures: {
            "1": { name: "entity.name.class" },
            "2": { name: "entity.name.class" }
          },
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b:\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv
        },
        {
          begin: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b:\[/dgv,
          captures: {
            "1": { name: "entity.name.class" }
          },
          end: /\]/dgv,
          patterns: [
            { include: "#array-content" }
          ]
        },
        {
          begin: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b:(?=\{)/dgv,
          captures: {
            "1": { name: "entity.name.class" }
          },
          end: /\}/dgv,
          patterns: [
            { include: "#block-content" }
          ]
        }
      ]
    },
    "regex-literal": {
      match: /(?<![0-9A-Za-z])(\/)(?:[^\/\\]|\\[^\n]|\[(?:[^\]\\]|\\[^\n])*\])*(\/)([a-z]*)/dgv,
      name: "string.regexp.surrealql"
    },
    string: {
      patterns: [
        {
          begin: /[a-z]?"/dgv,
          end: /(?<!\\)"/dgv,
          name: "string.quoted.double"
        },
        {
          begin: /[a-z]?'/dgv,
          end: /(?<!\\)'/dgv,
          name: "string.quoted.single"
        }
      ]
    },
    subquery: {
      begin: /\(/dgv,
      end: /\)/dgv,
      patterns: [
        { include: "#query" },
        { include: "#value" }
      ]
    },
    "token-type": {
      match: /\b(eddsa|es256|es384|es512|ps256|ps384|ps512|rs256|rs384|rs512|jwks)\b/dgiv,
      name: "support.constant.token-type.surrealql"
    },
    type: {
      captures: {
        "0": {
          patterns: [
            {
              match: /[\<\>]/dgv,
              name: "entity.name.type.surrealql"
            },
            { include: "#number" },
            { include: "#void-type" }
          ]
        }
      },
      match: /[a-z]*<[A-Za-z][ \,0-9\<\>A-Z_a-z\|]+[0-9\>A-Za-z]+>/dgv,
      name: "meta.type.annotation.surrealql"
    },
    "type-clause": {
      begin: /\b(TYPE)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.surrealql" }
      },
      end: /(?=\b(DEFAULT|ASSERT|VALUE|COMMENT|PERMISSIONS|REFERENCE|READONLY|FLEXIBLE|COMPUTED|DIST|DIMENSION|EFC|M|LM|M0)\b|;|(?=\n?$))/dgv,
      name: "meta.type.annotation.surrealql",
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#number" },
        { include: "#void-type" },
        {
          match: /\|/dgv,
          name: "keyword.operator.union.surrealql"
        },
        {
          match: /[\]\<\>\[]/dgv,
          name: "punctuation.definition.type.surrealql"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.type.surrealql"
        },
        { include: "#index-type" },
        {
          match: /\b[A-Z_a-z][0-9A-Z_a-z]*\b/dgv,
          name: "entity.name.type.surrealql"
        }
      ]
    },
    value: {
      patterns: [
        { include: "#comment" },
        { include: "#js-function" },
        { include: "#function" },
        { include: "#block" },
        { include: "#array" },
        { include: "#var-name" },
        { include: "#boolean" },
        { include: "#string" },
        { include: "#ident" },
        { include: "#void-type" },
        { include: "#positional" },
        { include: "#duration" },
        { include: "#number" },
        { include: "#record" },
        { include: "#subquery" },
        { include: "#type" },
        { include: "#index-type" },
        { include: "#token-type" },
        { include: "#distance-name" },
        { include: "#filter-name" },
        { include: "#analyzer-tokenizer" },
        { include: "#literal-keyword" },
        { include: "#regex-literal" },
        { include: "#identifier" }
      ]
    },
    "var-name": {
      patterns: [
        {
          match: /\$[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
          name: "variable.name"
        },
        {
          match: /\$`[\p{L}\p{M}\p{N}\p{Pc}]+`/dgv,
          name: "variable.name"
        },
        {
          match: /\$⟨[\p{L}\p{M}\p{N}\p{Pc}]+⟩/dgv,
          name: "variable.name"
        }
      ]
    },
    "void-type": {
      match: /\b(null|NULL|none|NONE)\b/dgv,
      name: "constant.language.void"
    }
  },
  dependencies: [
    "javascript"
  ]
};
