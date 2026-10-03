import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "codeql",
  displayName: "CodeQL",
  aliases: [
    "ql"
  ],
  scopeName: "source.ql",
  patterns: [
    { include: "#module-member" }
  ],
  repository: {
    abstract: {
      match: /\babstract(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.abstract.ql"
    },
    additional: {
      match: /\badditional(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.additional.ql"
    },
    and: {
      match: /\band(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.and.ql"
    },
    annotation: {
      patterns: [
        { include: "#bindingset-annotation" },
        { include: "#language-annotation" },
        { include: "#pragma-annotation" },
        { include: "#annotation-keyword" }
      ]
    },
    "annotation-keyword": {
      patterns: [
        { include: "#abstract" },
        { include: "#additional" },
        { include: "#bindingset" },
        { include: "#cached" },
        { include: "#default" },
        { include: "#deprecated" },
        { include: "#external" },
        { include: "#final" },
        { include: "#language" },
        { include: "#library" },
        { include: "#override" },
        { include: "#pragma" },
        { include: "#private" },
        { include: "#query" },
        { include: "#signature" },
        { include: "#transient" }
      ]
    },
    any: {
      match: /\bany(?![0-9A-Z_a-z])/dgv,
      name: "keyword.quantifier.any.ql"
    },
    "arithmetic-operator": {
      match: /[\-\%\*\+\/]/dgv,
      name: "keyword.operator.arithmetic.ql"
    },
    as: {
      match: /\bas(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.as.ql"
    },
    asc: {
      match: /\basc(?![0-9A-Z_a-z])/dgv,
      name: "keyword.order.asc.ql"
    },
    "at-lower-id": {
      match: /@[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv
    },
    avg: {
      match: /\bavg(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.avg.ql"
    },
    bindingset: {
      match: /\bbindingset(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.bindingset.ql"
    },
    "bindingset-annotation": {
      begin: /\b(bindingset(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#bindingset" }
          ]
        }
      },
      end: /(?!(?:\p{space}|(?=\n?$)|\/[\*\/])|\[)|(?<=\])/dgv,
      name: "meta.block.bindingset-annotation.ql",
      patterns: [
        { include: "#bindingset-annotation-body" },
        { include: "#non-context-sensitive" }
      ]
    },
    "bindingset-annotation-body": {
      begin: /(\[)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#open-bracket" }
          ]
        }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#close-bracket" }
          ]
        }
      },
      name: "meta.block.bindingset-annotation-body.ql",
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "variable.parameter.ql"
        }
      ]
    },
    boolean: {
      match: /\bboolean(?![0-9A-Z_a-z])/dgv,
      name: "keyword.type.boolean.ql"
    },
    by: {
      match: /\bby(?![0-9A-Z_a-z])/dgv,
      name: "keyword.order.by.ql"
    },
    cached: {
      match: /\bcached(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.cached.ql"
    },
    class: {
      match: /\bclass(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.class.ql"
    },
    "class-body": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#open-brace" }
          ]
        }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#close-brace" }
          ]
        }
      },
      name: "meta.block.class-body.ql",
      patterns: [
        { include: "#class-member" }
      ]
    },
    "class-declaration": {
      begin: /\b(class(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#class" }
          ]
        }
      },
      end: /(?<=[\;\}])/dgv,
      name: "meta.block.class-declaration.ql",
      patterns: [
        { include: "#class-body" },
        { include: "#extends-clause" },
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.class.ql"
        }
      ]
    },
    "class-member": {
      patterns: [
        { include: "#predicate-or-field-declaration" },
        { include: "#annotation" },
        { include: "#non-context-sensitive" }
      ]
    },
    "close-angle": {
      match: />/dgv,
      name: "punctuation.anglebracket.close.ql"
    },
    "close-brace": {
      match: /\}/dgv,
      name: "punctuation.curlybrace.close.ql"
    },
    "close-bracket": {
      match: /\]/dgv,
      name: "punctuation.squarebracket.close.ql"
    },
    "close-paren": {
      match: /\)/dgv,
      name: "punctuation.parenthesis.close.ql"
    },
    comma: {
      match: /,/dgv,
      name: "punctuation.separator.comma.ql"
    },
    comment: {
      patterns: [
        {
          begin: /\/\*\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.documentation.ql",
          patterns: [
            {
              begin: /(?<=\/\*\*)([^\*]|\*(?!\/))*(?=\n?$)/dgv,
              patterns: [
                {
                  match: {
                    G: [/￿\p{space}*(@\P{space}+)/dgv, /\p{space}*(@\P{space}+)/dgvy]
                  },
                  name: "keyword.tag.ql"
                }
              ],
              while: {
                G: [/(^|￿)\p{space}*([^\*]|\*(?!\/))(?=([^\*]|\*(?!\/))*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)\\p{space}*([^\\*]|\\*(?!/))(?=([^\\*]|\\*(?!/))*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
              }
            }
          ]
        },
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.ql"
        },
        {
          match: /\/\/[^\n]*(?=\n?$)/dgv,
          name: "comment.line.double-slash.ql"
        }
      ]
    },
    "comment-start": {
      match: /\/[\*\/]/dgv
    },
    "comparison-operator": {
      match: /!??=/dgv,
      name: "keyword.operator.comparison.ql"
    },
    concat: {
      match: /\bconcat(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.concat.ql"
    },
    count: {
      match: /\bcount(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.count.ql"
    },
    date: {
      match: /\bdate(?![0-9A-Z_a-z])/dgv,
      name: "keyword.type.date.ql"
    },
    default: {
      match: /\bdefault(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.default.ql"
    },
    deprecated: {
      match: /\bdeprecated(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.deprecated.ql"
    },
    desc: {
      match: /\bdesc(?![0-9A-Z_a-z])/dgv,
      name: "keyword.order.desc.ql"
    },
    "dont-care": {
      match: /\b_(?![0-9A-Z_a-z])/dgv,
      name: "variable.language.dont-care.ql"
    },
    dot: {
      match: /\./dgv,
      name: "punctuation.accessor.ql"
    },
    dotdot: {
      match: /\.\./dgv,
      name: "punctuation.operator.range.ql"
    },
    else: {
      match: /\belse(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.else.ql"
    },
    "end-of-as-clause": {
      match: /(?<=[0-9A-Z_a-z])(?![0-9A-Z_a-z])(?<!(?<![0-9A-Z_a-z])as)|(?=\p{space}*(?!\/[\*\/]|\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z]))\P{space})|(?=\p{space}*\b(?:_(?![0-9A-Z_a-z])|and(?![0-9A-Z_a-z])|any(?![0-9A-Z_a-z])|as(?![0-9A-Z_a-z])|asc(?![0-9A-Z_a-z])|avg(?![0-9A-Z_a-z])|boolean(?![0-9A-Z_a-z])|by(?![0-9A-Z_a-z])|class(?![0-9A-Z_a-z])|concat(?![0-9A-Z_a-z])|count(?![0-9A-Z_a-z])|date(?![0-9A-Z_a-z])|desc(?![0-9A-Z_a-z])|else(?![0-9A-Z_a-z])|exists(?![0-9A-Z_a-z])|extends(?![0-9A-Z_a-z])|false(?![0-9A-Z_a-z])|float(?![0-9A-Z_a-z])|forall(?![0-9A-Z_a-z])|forex(?![0-9A-Z_a-z])|from(?![0-9A-Z_a-z])|if(?![0-9A-Z_a-z])|implies(?![0-9A-Z_a-z])|import(?![0-9A-Z_a-z])|in(?![0-9A-Z_a-z])|instanceof(?![0-9A-Z_a-z])|int(?![0-9A-Z_a-z])|max(?![0-9A-Z_a-z])|min(?![0-9A-Z_a-z])|module(?![0-9A-Z_a-z])|newtype(?![0-9A-Z_a-z])|none(?![0-9A-Z_a-z])|not(?![0-9A-Z_a-z])|or(?![0-9A-Z_a-z])|order(?![0-9A-Z_a-z])|predicate(?![0-9A-Z_a-z])|rank(?![0-9A-Z_a-z])|result(?![0-9A-Z_a-z])|select(?![0-9A-Z_a-z])|strictconcat(?![0-9A-Z_a-z])|strictcount(?![0-9A-Z_a-z])|strictsum(?![0-9A-Z_a-z])|string(?![0-9A-Z_a-z])|sum(?![0-9A-Z_a-z])|super(?![0-9A-Z_a-z])|then(?![0-9A-Z_a-z])|this(?![0-9A-Z_a-z])|true(?![0-9A-Z_a-z])|unique(?![0-9A-Z_a-z])|where(?![0-9A-Z_a-z])))/dgv
    },
    "end-of-id": {
      match: /(?![0-9A-Z_a-z])/dgv
    },
    exists: {
      match: /\bexists(?![0-9A-Z_a-z])/dgv,
      name: "keyword.quantifier.exists.ql"
    },
    "expr-as-clause": {
      begin: /\b(as(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#as" }
          ]
        }
      },
      end: /(?<=[0-9A-Z_a-z])(?![0-9A-Z_a-z])(?<!(?<![0-9A-Z_a-z])as)|(?=\p{space}*(?!\/[\*\/]|\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z]))\P{space})|(?=\p{space}*\b(?:_(?![0-9A-Z_a-z])|and(?![0-9A-Z_a-z])|any(?![0-9A-Z_a-z])|as(?![0-9A-Z_a-z])|asc(?![0-9A-Z_a-z])|avg(?![0-9A-Z_a-z])|boolean(?![0-9A-Z_a-z])|by(?![0-9A-Z_a-z])|class(?![0-9A-Z_a-z])|concat(?![0-9A-Z_a-z])|count(?![0-9A-Z_a-z])|date(?![0-9A-Z_a-z])|desc(?![0-9A-Z_a-z])|else(?![0-9A-Z_a-z])|exists(?![0-9A-Z_a-z])|extends(?![0-9A-Z_a-z])|false(?![0-9A-Z_a-z])|float(?![0-9A-Z_a-z])|forall(?![0-9A-Z_a-z])|forex(?![0-9A-Z_a-z])|from(?![0-9A-Z_a-z])|if(?![0-9A-Z_a-z])|implies(?![0-9A-Z_a-z])|import(?![0-9A-Z_a-z])|in(?![0-9A-Z_a-z])|instanceof(?![0-9A-Z_a-z])|int(?![0-9A-Z_a-z])|max(?![0-9A-Z_a-z])|min(?![0-9A-Z_a-z])|module(?![0-9A-Z_a-z])|newtype(?![0-9A-Z_a-z])|none(?![0-9A-Z_a-z])|not(?![0-9A-Z_a-z])|or(?![0-9A-Z_a-z])|order(?![0-9A-Z_a-z])|predicate(?![0-9A-Z_a-z])|rank(?![0-9A-Z_a-z])|result(?![0-9A-Z_a-z])|select(?![0-9A-Z_a-z])|strictconcat(?![0-9A-Z_a-z])|strictcount(?![0-9A-Z_a-z])|strictsum(?![0-9A-Z_a-z])|string(?![0-9A-Z_a-z])|sum(?![0-9A-Z_a-z])|super(?![0-9A-Z_a-z])|then(?![0-9A-Z_a-z])|this(?![0-9A-Z_a-z])|true(?![0-9A-Z_a-z])|unique(?![0-9A-Z_a-z])|where(?![0-9A-Z_a-z])))/dgv,
      name: "meta.block.expr-as-clause.ql",
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.ql"
        }
      ]
    },
    extends: {
      match: /\bextends(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.extends.ql"
    },
    "extends-clause": {
      begin: /\b(extends(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#extends" }
          ]
        }
      },
      end: /(?=\{)/dgv,
      name: "meta.block.extends-clause.ql",
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])|@[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.ql"
        }
      ]
    },
    external: {
      match: /\bexternal(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.external.ql"
    },
    false: {
      match: /\bfalse(?![0-9A-Z_a-z])/dgv,
      name: "constant.language.boolean.false.ql"
    },
    final: {
      match: /\bfinal(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.final.ql"
    },
    float: {
      match: /\bfloat(?![0-9A-Z_a-z])/dgv,
      name: "keyword.type.float.ql"
    },
    "float-literal": {
      match: /-?[0-9]+\.[0-9]+(?![0-9])/dgv,
      name: "constant.numeric.decimal.ql"
    },
    forall: {
      match: /\bforall(?![0-9A-Z_a-z])/dgv,
      name: "keyword.quantifier.forall.ql"
    },
    forex: {
      match: /\bforex(?![0-9A-Z_a-z])/dgv,
      name: "keyword.quantifier.forex.ql"
    },
    from: {
      match: /\bfrom(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.from.ql"
    },
    "from-section": {
      begin: /\b(from(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#from" }
          ]
        }
      },
      end: /(?=\b(?:select(?![0-9A-Z_a-z])|where(?![0-9A-Z_a-z])))/dgv,
      name: "meta.block.from-section.ql",
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])(?=\p{space}*(?:,|\bwhere(?![0-9A-Z_a-z])|\bselect(?![0-9A-Z_a-z])|(?=\n?$)))/dgv,
          name: "variable.parameter.ql"
        },
        { include: "#module-qualifier" },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])|@[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.ql"
        },
        {
          match: /\b[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "variable.parameter.ql"
        }
      ]
    },
    "id-character": {
      match: /[0-9A-Z_a-z]/dgv
    },
    if: {
      match: /\bif(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.if.ql"
    },
    implements: {
      match: /\bimplements(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.implements.ql"
    },
    "implements-clause": {
      begin: /\b(implements(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#implements" }
          ]
        }
      },
      end: /(?=\{)/dgv,
      name: "meta.block.implements-clause.ql",
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])|@[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.ql"
        }
      ]
    },
    implies: {
      match: /\bimplies(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.implies.ql"
    },
    import: {
      match: /\bimport(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.import.ql"
    },
    "import-as-clause": {
      begin: /\b(as(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#as" }
          ]
        }
      },
      end: /(?<=[0-9A-Z_a-z])(?![0-9A-Z_a-z])(?<!(?<![0-9A-Z_a-z])as)|(?=\p{space}*(?!\/[\*\/]|\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z]))\P{space})|(?=\p{space}*\b(?:_(?![0-9A-Z_a-z])|and(?![0-9A-Z_a-z])|any(?![0-9A-Z_a-z])|as(?![0-9A-Z_a-z])|asc(?![0-9A-Z_a-z])|avg(?![0-9A-Z_a-z])|boolean(?![0-9A-Z_a-z])|by(?![0-9A-Z_a-z])|class(?![0-9A-Z_a-z])|concat(?![0-9A-Z_a-z])|count(?![0-9A-Z_a-z])|date(?![0-9A-Z_a-z])|desc(?![0-9A-Z_a-z])|else(?![0-9A-Z_a-z])|exists(?![0-9A-Z_a-z])|extends(?![0-9A-Z_a-z])|false(?![0-9A-Z_a-z])|float(?![0-9A-Z_a-z])|forall(?![0-9A-Z_a-z])|forex(?![0-9A-Z_a-z])|from(?![0-9A-Z_a-z])|if(?![0-9A-Z_a-z])|implies(?![0-9A-Z_a-z])|import(?![0-9A-Z_a-z])|in(?![0-9A-Z_a-z])|instanceof(?![0-9A-Z_a-z])|int(?![0-9A-Z_a-z])|max(?![0-9A-Z_a-z])|min(?![0-9A-Z_a-z])|module(?![0-9A-Z_a-z])|newtype(?![0-9A-Z_a-z])|none(?![0-9A-Z_a-z])|not(?![0-9A-Z_a-z])|or(?![0-9A-Z_a-z])|order(?![0-9A-Z_a-z])|predicate(?![0-9A-Z_a-z])|rank(?![0-9A-Z_a-z])|result(?![0-9A-Z_a-z])|select(?![0-9A-Z_a-z])|strictconcat(?![0-9A-Z_a-z])|strictcount(?![0-9A-Z_a-z])|strictsum(?![0-9A-Z_a-z])|string(?![0-9A-Z_a-z])|sum(?![0-9A-Z_a-z])|super(?![0-9A-Z_a-z])|then(?![0-9A-Z_a-z])|this(?![0-9A-Z_a-z])|true(?![0-9A-Z_a-z])|unique(?![0-9A-Z_a-z])|where(?![0-9A-Z_a-z])))/dgv,
      name: "meta.block.import-as-clause.ql",
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.namespace.ql"
        }
      ]
    },
    "import-directive": {
      begin: /\b(import(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#import" }
          ]
        }
      },
      end: /(?<!\bimport)(?<=[0-9\>A-Z_a-z])(?!\p{space}*(\.|::|[\,\<]))/dgv,
      name: "meta.block.import-directive.ql",
      patterns: [
        { include: "#instantiation-args" },
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.namespace.ql"
        }
      ]
    },
    in: {
      match: /\bin(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.in.ql"
    },
    instanceof: {
      match: /\binstanceof(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.instanceof.ql"
    },
    "instantiation-args": {
      begin: /(<)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#open-angle" }
          ]
        }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#close-angle" }
          ]
        }
      },
      name: "meta.type.parameters.ql",
      patterns: [
        { include: "#instantiation-args" },
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.namespace.ql"
        }
      ]
    },
    int: {
      match: /\bint(?![0-9A-Z_a-z])/dgv,
      name: "keyword.type.int.ql"
    },
    "int-literal": {
      match: /-?[0-9]+(?![0-9])/dgv,
      name: "constant.numeric.decimal.ql"
    },
    keyword: {
      patterns: [
        { include: "#dont-care" },
        { include: "#and" },
        { include: "#any" },
        { include: "#as" },
        { include: "#asc" },
        { include: "#avg" },
        { include: "#boolean" },
        { include: "#by" },
        { include: "#class" },
        { include: "#concat" },
        { include: "#count" },
        { include: "#date" },
        { include: "#desc" },
        { include: "#else" },
        { include: "#exists" },
        { include: "#extends" },
        { include: "#false" },
        { include: "#float" },
        { include: "#forall" },
        { include: "#forex" },
        { include: "#from" },
        { include: "#if" },
        { include: "#implies" },
        { include: "#import" },
        { include: "#in" },
        { include: "#instanceof" },
        { include: "#int" },
        { include: "#max" },
        { include: "#min" },
        { include: "#module" },
        { include: "#newtype" },
        { include: "#none" },
        { include: "#not" },
        { include: "#or" },
        { include: "#order" },
        { include: "#predicate" },
        { include: "#rank" },
        { include: "#result" },
        { include: "#select" },
        { include: "#strictconcat" },
        { include: "#strictcount" },
        { include: "#strictsum" },
        { include: "#string" },
        { include: "#sum" },
        { include: "#super" },
        { include: "#then" },
        { include: "#this" },
        { include: "#true" },
        { include: "#unique" },
        { include: "#where" }
      ]
    },
    language: {
      match: /\blanguage(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.language.ql"
    },
    "language-annotation": {
      begin: /\b(language(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#language" }
          ]
        }
      },
      end: /(?!(?:\p{space}|(?=\n?$)|\/[\*\/])|\[)|(?<=\])/dgv,
      name: "meta.block.language-annotation.ql",
      patterns: [
        { include: "#language-annotation-body" },
        { include: "#non-context-sensitive" }
      ]
    },
    "language-annotation-body": {
      begin: /(\[)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#open-bracket" }
          ]
        }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#close-bracket" }
          ]
        }
      },
      name: "meta.block.language-annotation-body.ql",
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\bmonotonicAggregates(?![0-9A-Z_a-z])/dgv,
          name: "storage.modifier.ql"
        }
      ]
    },
    library: {
      match: /\blibrary(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.library.ql"
    },
    literal: {
      patterns: [
        { include: "#float-literal" },
        { include: "#int-literal" },
        { include: "#string-literal" }
      ]
    },
    "lower-id": {
      match: /\b[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv
    },
    max: {
      match: /\bmax(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.max.ql"
    },
    min: {
      match: /\bmin(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.min.ql"
    },
    module: {
      match: /\bmodule(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.module.ql"
    },
    "module-body": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#open-brace" }
          ]
        }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#close-brace" }
          ]
        }
      },
      name: "meta.block.module-body.ql",
      patterns: [
        { include: "#module-member" }
      ]
    },
    "module-declaration": {
      begin: /\b(module(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#module" }
          ]
        }
      },
      end: /(?<=[\;\}])/dgv,
      name: "meta.block.module-declaration.ql",
      patterns: [
        { include: "#module-body" },
        { include: "#implements-clause" },
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.namespace.ql"
        }
      ]
    },
    "module-member": {
      patterns: [
        { include: "#import-directive" },
        { include: "#import-as-clause" },
        { include: "#module-declaration" },
        { include: "#newtype-declaration" },
        { include: "#newtype-branch-name-with-prefix" },
        { include: "#predicate-parameter-list" },
        { include: "#predicate-body" },
        { include: "#class-declaration" },
        { include: "#select-clause" },
        { include: "#predicate-or-field-declaration" },
        { include: "#non-context-sensitive" },
        { include: "#annotation" }
      ]
    },
    "module-qualifier": {
      match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])(?=\p{space}*::)/dgv,
      name: "entity.name.type.namespace.ql"
    },
    newtype: {
      match: /\bnewtype(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.newtype.ql"
    },
    "newtype-branch-name-with-prefix": {
      begin: /=|\bor(?![0-9A-Z_a-z])/dgv,
      beginCaptures: {
        "0": {
          patterns: [
            { include: "#or" },
            { include: "#comparison-operator" }
          ]
        }
      },
      end: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
      endCaptures: {
        "0": { name: "entity.name.type.ql" }
      },
      name: "meta.block.newtype-branch-name-with-prefix.ql",
      patterns: [
        { include: "#non-context-sensitive" }
      ]
    },
    "newtype-declaration": {
      begin: /\b(newtype(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#newtype" }
          ]
        }
      },
      end: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
      endCaptures: {
        "0": { name: "entity.name.type.ql" }
      },
      name: "meta.block.newtype-declaration.ql",
      patterns: [
        { include: "#non-context-sensitive" }
      ]
    },
    "non-context-sensitive": {
      patterns: [
        { include: "#comment" },
        { include: "#literal" },
        { include: "#operator-or-punctuation" },
        { include: "#keyword" }
      ]
    },
    none: {
      match: /\bnone(?![0-9A-Z_a-z])/dgv,
      name: "keyword.quantifier.none.ql"
    },
    not: {
      match: /\bnot(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.not.ql"
    },
    "open-angle": {
      match: /</dgv,
      name: "punctuation.anglebracket.open.ql"
    },
    "open-brace": {
      match: /\{/dgv,
      name: "punctuation.curlybrace.open.ql"
    },
    "open-bracket": {
      match: /\[/dgv,
      name: "punctuation.squarebracket.open.ql"
    },
    "open-paren": {
      match: /\(/dgv,
      name: "punctuation.parenthesis.open.ql"
    },
    "operator-or-punctuation": {
      patterns: [
        { include: "#relational-operator" },
        { include: "#comparison-operator" },
        { include: "#arithmetic-operator" },
        { include: "#comma" },
        { include: "#semicolon" },
        { include: "#dot" },
        { include: "#dotdot" },
        { include: "#pipe" },
        { include: "#open-paren" },
        { include: "#close-paren" },
        { include: "#open-brace" },
        { include: "#close-brace" },
        { include: "#open-bracket" },
        { include: "#close-bracket" },
        { include: "#open-angle" },
        { include: "#close-angle" }
      ]
    },
    or: {
      match: /\bor(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.or.ql"
    },
    order: {
      match: /\border(?![0-9A-Z_a-z])/dgv,
      name: "keyword.order.order.ql"
    },
    override: {
      match: /\boverride(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.override.ql"
    },
    pipe: {
      match: /\|/dgv,
      name: "punctuation.separator.pipe.ql"
    },
    pragma: {
      match: /\bpragma(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.pragma.ql"
    },
    "pragma-annotation": {
      begin: /\b(pragma(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#pragma" }
          ]
        }
      },
      end: /(?!(?:\p{space}|(?=\n?$)|\/[\*\/])|\[)|(?<=\])/dgv,
      name: "meta.block.pragma-annotation.ql",
      patterns: [
        { include: "#pragma-annotation-body" },
        { include: "#non-context-sensitive" }
      ]
    },
    "pragma-annotation-body": {
      begin: /(\[)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#open-bracket" }
          ]
        }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#close-bracket" }
          ]
        }
      },
      name: "meta.block.pragma-annotation-body.ql",
      patterns: [
        {
          match: /\b(?:inline|noinline|nomagic|noopt)\b/dgv,
          name: "storage.modifier.ql"
        }
      ]
    },
    predicate: {
      match: /\bpredicate(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.predicate.ql"
    },
    "predicate-body": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#open-brace" }
          ]
        }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#close-brace" }
          ]
        }
      },
      name: "meta.block.predicate-body.ql",
      patterns: [
        { include: "#predicate-body-contents" }
      ]
    },
    "predicate-body-contents": {
      patterns: [
        { include: "#expr-as-clause" },
        { include: "#non-context-sensitive" },
        { include: "#module-qualifier" },
        {
          match: /\b[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])\p{space}*[\*\+]?\p{space}*(?=\()/dgv,
          name: "entity.name.function.ql"
        },
        {
          match: /\b[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.ql"
        },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])|@[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.ql"
        }
      ]
    },
    "predicate-or-field-declaration": {
      begin: /(?=\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z]))(?!\b(?:(?:_(?![0-9A-Z_a-z])|and(?![0-9A-Z_a-z])|any(?![0-9A-Z_a-z])|as(?![0-9A-Z_a-z])|asc(?![0-9A-Z_a-z])|avg(?![0-9A-Z_a-z])|boolean(?![0-9A-Z_a-z])|by(?![0-9A-Z_a-z])|class(?![0-9A-Z_a-z])|concat(?![0-9A-Z_a-z])|count(?![0-9A-Z_a-z])|date(?![0-9A-Z_a-z])|desc(?![0-9A-Z_a-z])|else(?![0-9A-Z_a-z])|exists(?![0-9A-Z_a-z])|extends(?![0-9A-Z_a-z])|false(?![0-9A-Z_a-z])|float(?![0-9A-Z_a-z])|forall(?![0-9A-Z_a-z])|forex(?![0-9A-Z_a-z])|from(?![0-9A-Z_a-z])|if(?![0-9A-Z_a-z])|implies(?![0-9A-Z_a-z])|import(?![0-9A-Z_a-z])|in(?![0-9A-Z_a-z])|instanceof(?![0-9A-Z_a-z])|int(?![0-9A-Z_a-z])|max(?![0-9A-Z_a-z])|min(?![0-9A-Z_a-z])|module(?![0-9A-Z_a-z])|newtype(?![0-9A-Z_a-z])|none(?![0-9A-Z_a-z])|not(?![0-9A-Z_a-z])|or(?![0-9A-Z_a-z])|order(?![0-9A-Z_a-z])|predicate(?![0-9A-Z_a-z])|rank(?![0-9A-Z_a-z])|result(?![0-9A-Z_a-z])|select(?![0-9A-Z_a-z])|strictconcat(?![0-9A-Z_a-z])|strictcount(?![0-9A-Z_a-z])|strictsum(?![0-9A-Z_a-z])|string(?![0-9A-Z_a-z])|sum(?![0-9A-Z_a-z])|super(?![0-9A-Z_a-z])|then(?![0-9A-Z_a-z])|this(?![0-9A-Z_a-z])|true(?![0-9A-Z_a-z])|unique(?![0-9A-Z_a-z])|where(?![0-9A-Z_a-z]))|(?:abstract(?![0-9A-Z_a-z])|additional(?![0-9A-Z_a-z])|bindingset(?![0-9A-Z_a-z])|cached(?![0-9A-Z_a-z])|default(?![0-9A-Z_a-z])|deprecated(?![0-9A-Z_a-z])|external(?![0-9A-Z_a-z])|final(?![0-9A-Z_a-z])|language(?![0-9A-Z_a-z])|library(?![0-9A-Z_a-z])|override(?![0-9A-Z_a-z])|pragma(?![0-9A-Z_a-z])|private(?![0-9A-Z_a-z])|query(?![0-9A-Z_a-z])|signature(?![0-9A-Z_a-z])|transient(?![0-9A-Z_a-z]))))|(?=\b(?:boolean(?![0-9A-Z_a-z])|date(?![0-9A-Z_a-z])|float(?![0-9A-Z_a-z])|int(?![0-9A-Z_a-z])|predicate(?![0-9A-Z_a-z])|string(?![0-9A-Z_a-z])))|(?=@[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z]))/dgv,
      end: /(?<=[\;\}])/dgv,
      name: "meta.block.predicate-or-field-declaration.ql",
      patterns: [
        { include: "#predicate-parameter-list" },
        { include: "#predicate-body" },
        { include: "#non-context-sensitive" },
        { include: "#module-qualifier" },
        {
          match: /\b[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])(?=\p{space}*;)/dgv,
          name: "variable.field.ql"
        },
        {
          match: /\b[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.function.ql"
        },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])|@[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.ql"
        }
      ]
    },
    "predicate-parameter-list": {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#open-paren" }
          ]
        }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": {
          patterns: [
            { include: "#close-paren" }
          ]
        }
      },
      name: "meta.block.predicate-parameter-list.ql",
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])(?=\p{space}*[\)\,])/dgv,
          name: "variable.parameter.ql"
        },
        { include: "#module-qualifier" },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])|@[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "entity.name.type.ql"
        },
        {
          match: /\b[a-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "variable.parameter.ql"
        }
      ]
    },
    "predicate-start-keyword": {
      patterns: [
        { include: "#boolean" },
        { include: "#date" },
        { include: "#float" },
        { include: "#int" },
        { include: "#predicate" },
        { include: "#string" }
      ]
    },
    private: {
      match: /\bprivate(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.private.ql"
    },
    query: {
      match: /\bquery(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.query.ql"
    },
    rank: {
      match: /\brank(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.rank.ql"
    },
    "relational-operator": {
      match: /<=?|>=?/dgv,
      name: "keyword.operator.relational.ql"
    },
    result: {
      match: /\bresult(?![0-9A-Z_a-z])/dgv,
      name: "variable.language.result.ql"
    },
    select: {
      match: /\bselect(?![0-9A-Z_a-z])/dgv,
      name: "keyword.query.select.ql"
    },
    "select-as-clause": {
      begin: /\b(as(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#as" }
          ]
        }
      },
      end: /(?<=[0-9A-Z_a-z])(?![0-9A-Z_a-z])/dgv,
      match: /meta[^\n]block[^\n]select-as-clause[^\n]ql/dgv,
      patterns: [
        { include: "#non-context-sensitive" },
        {
          match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv,
          name: "variable.other.ql"
        }
      ]
    },
    "select-clause": {
      begin: /(?=\b(?:from(?![0-9A-Z_a-z])|where(?![0-9A-Z_a-z])|select(?![0-9A-Z_a-z])))/dgv,
      end: /(?!\b(?:from(?![0-9A-Z_a-z])|where(?![0-9A-Z_a-z])|select(?![0-9A-Z_a-z])))/dgv,
      name: "meta.block.select-clause.ql",
      patterns: [
        { include: "#from-section" },
        { include: "#where-section" },
        { include: "#select-section" }
      ]
    },
    "select-section": {
      begin: /\b(select(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#select" }
          ]
        }
      },
      end: /(?=\n)/dgv,
      name: "meta.block.select-section.ql",
      patterns: [
        { include: "#predicate-body-contents" },
        { include: "#select-as-clause" }
      ]
    },
    semicolon: {
      match: /;/dgv,
      name: "punctuation.separator.statement.ql"
    },
    signature: {
      match: /\bsignature(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.signature.ql"
    },
    "simple-id": {
      match: /\b[A-Za-z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv
    },
    strictconcat: {
      match: /\bstrictconcat(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.strictconcat.ql"
    },
    strictcount: {
      match: /\bstrictcount(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.strictcount.ql"
    },
    strictsum: {
      match: /\bstrictsum(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.strictsum.ql"
    },
    string: {
      match: /\bstring(?![0-9A-Z_a-z])/dgv,
      name: "keyword.type.string.ql"
    },
    "string-escape": {
      match: /\\["\\nrt]/dgv,
      name: "constant.character.escape.ql"
    },
    "string-literal": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ql" }
      },
      end: /(")|([^\n\\])(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.ql" },
        "2": { name: "invalid.illegal.newline.ql" }
      },
      name: "string.quoted.double.ql",
      patterns: [
        { include: "#string-escape" }
      ]
    },
    sum: {
      match: /\bsum(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.sum.ql"
    },
    super: {
      match: /\bsuper(?![0-9A-Z_a-z])/dgv,
      name: "variable.language.super.ql"
    },
    then: {
      match: /\bthen(?![0-9A-Z_a-z])/dgv,
      name: "keyword.other.then.ql"
    },
    this: {
      match: /\bthis(?![0-9A-Z_a-z])/dgv,
      name: "variable.language.this.ql"
    },
    transient: {
      match: /\btransient(?![0-9A-Z_a-z])/dgv,
      name: "storage.modifier.transient.ql"
    },
    true: {
      match: /\btrue(?![0-9A-Z_a-z])/dgv,
      name: "constant.language.boolean.true.ql"
    },
    unique: {
      match: /\bunique(?![0-9A-Z_a-z])/dgv,
      name: "keyword.aggregate.unique.ql"
    },
    "upper-id": {
      match: /\b[A-Z][0-9A-Z_a-z]*(?![0-9A-Z_a-z])/dgv
    },
    where: {
      match: /\bwhere(?![0-9A-Z_a-z])/dgv,
      name: "keyword.query.where.ql"
    },
    "where-section": {
      begin: /\b(where(?![0-9A-Z_a-z]))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#where" }
          ]
        }
      },
      end: /(?=\bselect(?![0-9A-Z_a-z]))/dgv,
      name: "meta.block.where-section.ql",
      patterns: [
        { include: "#predicate-body-contents" }
      ]
    },
    "whitespace-or-comment-start": {
      match: /\p{space}|(?=\n?$)|\/[\*\/]/dgv
    }
  },
  dependencies: []
};
