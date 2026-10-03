import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "vue-vine",
  displayName: "Vue Vine",
  scopeName: "source.vue-vine",
  patterns: [
    { include: "#directives" },
    { include: "#statements" },
    { include: "#shebang" }
  ],
  repository: {
    "access-modifier": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(abstract|declare|override|public|protected|private|readonly|static)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "storage.modifier.vue-vine"
    },
    "after-operator-block-as-object-literal": {
      begin: /(?<!\+\+|--)(?<=[\!\(\+\,\:\=\>\?\[]|^await|[^\$\._\p{Alpha}\p{Nd}]await|^return|[^\$\._\p{Alpha}\p{Nd}]return|^yield|[^\$\._\p{Alpha}\p{Nd}]yield|^throw|[^\$\._\p{Alpha}\p{Nd}]throw|^in|[^\$\._\p{Alpha}\p{Nd}]in|^of|[^\$\._\p{Alpha}\p{Nd}]of|^typeof|[^\$\._\p{Alpha}\p{Nd}]typeof|&&|\|\||\*)\p{space}*(\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.block.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      name: "meta.objectliteral.vue-vine",
      patterns: [
        { include: "#object-member" }
      ]
    },
    "array-binding-pattern": {
      begin: /(?:(\.\.\.)\p{space}*)?(\[)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "punctuation.definition.binding-pattern.array.vue-vine" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.array.vue-vine" }
      },
      patterns: [
        { include: "#binding-element" },
        { include: "#punctuation-comma" }
      ]
    },
    "array-binding-pattern-const": {
      begin: /(?:(\.\.\.)\p{space}*)?(\[)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "punctuation.definition.binding-pattern.array.vue-vine" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.array.vue-vine" }
      },
      patterns: [
        { include: "#binding-element-const" },
        { include: "#punctuation-comma" }
      ]
    },
    "array-literal": {
      begin: /\p{space}*(\[)/dgv,
      beginCaptures: {
        "1": { name: "meta.brace.square.vue-vine" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.vue-vine" }
      },
      name: "meta.array.literal.vue-vine",
      patterns: [
        { include: "#expression" },
        { include: "#punctuation-comma" }
      ]
    },
    "arrow-function": {
      patterns: [
        {
          captures: {
            "1": { name: "storage.modifier.async.vue-vine" },
            "2": { name: "variable.parameter.vue-vine" }
          },
          match: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))\b(async)\p{space}+)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?==>)/dgv,
          name: "meta.arrow.vue-vine"
        },
        {
          begin: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))\b(async))?((?<![\]\!\)\}])\p{space}*(?=((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*)?\(\p{space}*(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)*((\)\p{space}*:)|((\.\.\.\p{space}*)?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*:)))|((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*)?\(\p{space}*(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)*(([\$_\p{Alpha}]|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|(\.\.\.\p{space}*[\$_\p{Alpha}]))([^"'\(\)\`]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))*)?\)(\p{space}*:\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+)?\p{space}*=>)))/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.async.vue-vine" }
          },
          end: /(?==>|\{|^(\p{space}*(export|function|class|interface|let|var|const|import|enum|namespace|module|type|abstract|declare)\p{space}+))/dgv,
          name: "meta.arrow.vue-vine",
          patterns: [
            { include: "#comment" },
            { include: "#type-parameters" },
            { include: "#function-parameters" },
            { include: "#arrow-return-type" },
            { include: "#possibly-arrow-return-type" }
          ]
        },
        {
          begin: /=>/dgv,
          beginCaptures: {
            "0": { name: "storage.type.function.arrow.vue-vine" }
          },
          end: /((?<=[\}\P{space}])(?<!=>)|((?!\{)(?=\P{space})))(?!\/[\*\/])/dgv,
          name: "meta.arrow.vue-vine",
          patterns: [
            { include: "#single-line-comment-consuming-line-ending" },
            { include: "#decl-block" },
            { include: "#expression" }
          ]
        }
      ]
    },
    "arrow-return-type": {
      begin: /(?<=\))\p{space}*(:)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.type.annotation.vue-vine" }
      },
      end: /(?==>|\{|^(\p{space}*(export|function|class|interface|let|var|const|import|enum|namespace|module|type|abstract|declare)\p{space}+))/dgv,
      name: "meta.return.type.arrow.vue-vine",
      patterns: [
        { include: "#arrow-return-type-body" }
      ]
    },
    "arrow-return-type-body": {
      patterns: [
        {
          begin: /(?<=:)(?=\p{space}*\{)/dgv,
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#type-object" }
          ]
        },
        { include: "#type-predicate-operator" },
        { include: "#type" }
      ]
    },
    "async-modifier": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(async)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "storage.modifier.async.vue-vine"
    },
    "binding-element": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#numeric-literal" },
        { include: "#regex" },
        { include: "#object-binding-pattern" },
        { include: "#array-binding-pattern" },
        { include: "#destructuring-variable-rest" },
        { include: "#variable-initializer" }
      ]
    },
    "binding-element-const": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#numeric-literal" },
        { include: "#regex" },
        { include: "#object-binding-pattern-const" },
        { include: "#array-binding-pattern-const" },
        { include: "#destructuring-variable-rest-const" },
        { include: "#variable-initializer" }
      ]
    },
    "boolean-literal": {
      patterns: [
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))true(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "constant.language.boolean.true.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))false(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "constant.language.boolean.false.vue-vine"
        }
      ]
    },
    brackets: {
      patterns: [
        {
          begin: /\{/dgv,
          end: /\}|(?=\*\/)/dgv,
          patterns: [
            { include: "#brackets" }
          ]
        },
        {
          begin: /\[/dgv,
          end: /\]|(?=\*\/)/dgv,
          patterns: [
            { include: "#brackets" }
          ]
        }
      ]
    },
    cast: {
      patterns: [
        {
          captures: {
            "1": { name: "meta.brace.angle.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" },
            "3": { name: "meta.brace.angle.vue-vine" }
          },
          match: /\p{space}*(<)\p{space}*(const)\p{space}*(>)/dgv,
          name: "cast.expr.vue-vine"
        },
        {
          begin: /(?<!\+\+|--)(?<=^return|[^\$\._\p{Alpha}\p{Nd}]return|^throw|[^\$\._\p{Alpha}\p{Nd}]throw|^yield|[^\$\._\p{Alpha}\p{Nd}]yield|^await|[^\$\._\p{Alpha}\p{Nd}]await|^default|[^\$\._\p{Alpha}\p{Nd}]default|[\&\(\*\,\:\=\>\?\^\|]|[^\$_\p{Alpha}\p{Nd}](?:\+\+|--)|[^\+]\+|[^\-]-)\p{space}*(<)(?!<?=)(?!\p{space}*(?=\n?$))/dgv,
          beginCaptures: {
            "1": { name: "meta.brace.angle.vue-vine" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "meta.brace.angle.vue-vine" }
          },
          name: "cast.expr.vue-vine",
          patterns: [
            { include: "#type" }
          ]
        },
        {
          begin: /(?<=^)\p{space}*(<)(?=[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*>)/dgv,
          beginCaptures: {
            "1": { name: "meta.brace.angle.vue-vine" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "meta.brace.angle.vue-vine" }
          },
          name: "cast.expr.vue-vine",
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    "class-declaration": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(?:(abstract)\p{space}+)?\b(class)\b(?=\p{space}+|\/[\*\/])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.export.vue-vine" },
        "2": { name: "storage.modifier.vue-vine" },
        "3": { name: "storage.modifier.vue-vine" },
        "4": { name: "storage.type.class.vue-vine" }
      },
      end: /(?<=\})/dgv,
      name: "meta.class.vue-vine",
      patterns: [
        { include: "#class-declaration-or-expression-patterns" }
      ]
    },
    "class-declaration-or-expression-patterns": {
      patterns: [
        { include: "#comment" },
        { include: "#class-or-interface-heritage" },
        {
          captures: {
            "0": { name: "entity.name.type.class.vue-vine" }
          },
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv
        },
        { include: "#type-parameters" },
        { include: "#class-or-interface-body" }
      ]
    },
    "class-expression": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(abstract)\p{space}+)?(class)\b(?=\p{space}+|[\<\{]|\/[\*\/])/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.vue-vine" },
        "2": { name: "storage.type.class.vue-vine" }
      },
      end: /(?<=\})/dgv,
      name: "meta.class.vue-vine",
      patterns: [
        { include: "#class-declaration-or-expression-patterns" }
      ]
    },
    "class-or-interface-body": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#decorator" },
        {
          begin: /(?<=:)\p{space}*/dgv,
          end: /(?=[\-\]\)\+\,\:\;\}\p{space}]|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        { include: "#method-declaration" },
        { include: "#indexer-declaration" },
        { include: "#field-declaration" },
        { include: "#string" },
        { include: "#type-annotation" },
        { include: "#variable-initializer" },
        { include: "#access-modifier" },
        { include: "#property-accessor" },
        { include: "#async-modifier" },
        { include: "#after-operator-block-as-object-literal" },
        { include: "#decl-block" },
        { include: "#expression" },
        { include: "#punctuation-comma" },
        { include: "#punctuation-semicolon" }
      ]
    },
    "class-or-interface-heritage": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))\b(extends|implements)\b(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.vue-vine" }
      },
      end: /(?=\{)/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#class-or-interface-heritage" },
        { include: "#type-parameters" },
        { include: "#expressionWithoutIdentifiers" },
        {
          captures: {
            "1": { name: "entity.name.type.module.vue-vine" },
            "2": { name: "punctuation.accessor.vue-vine" },
            "3": { name: "punctuation.accessor.optional.vue-vine" }
          },
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))(?=\p{space}*[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*(\p{space}*\??\.\p{space}*[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)*\p{space}*)/dgv
        },
        {
          captures: {
            "1": { name: "entity.other.inherited-class.vue-vine" }
          },
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        },
        { include: "#expressionPunctuations" }
      ]
    },
    comment: {
      patterns: [
        {
          begin: /\/\*\*(?!\/)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.vue-vine" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.vue-vine" }
          },
          name: "comment.block.documentation.vue-vine",
          patterns: [
            { include: "#docblock" }
          ]
        },
        {
          begin: /(\/\*)(?:\p{space}*((@)internal)(?=\p{space}|(\*\/)))?/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.vue-vine" },
            "2": { name: "storage.type.internaldeclaration.vue-vine" },
            "3": { name: "punctuation.decorator.internaldeclaration.vue-vine" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.vue-vine" }
          },
          name: "comment.block.vue-vine"
        },
        {
          begin: /(^[\t ]+)?((\/\/)(?:\p{space}*((@)internal)(?=\p{space}|(?=\n?$)))?)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.vue-vine" },
            "2": { name: "comment.line.double-slash.vue-vine" },
            "3": { name: "punctuation.definition.comment.vue-vine" },
            "4": { name: "storage.type.internaldeclaration.vue-vine" },
            "5": { name: "punctuation.decorator.internaldeclaration.vue-vine" }
          },
          contentName: "comment.line.double-slash.vue-vine",
          end: /(?=(?=\n?$))/dgv
        }
      ]
    },
    "control-statement": {
      patterns: [
        { include: "#switch-statement" },
        { include: "#for-loop" },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(catch|finally|throw|try)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.trycatch.vue-vine"
        },
        {
          captures: {
            "1": { name: "keyword.control.loop.vue-vine" },
            "2": { name: "entity.name.label.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(break|continue|goto)\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(break|continue|do|goto|while)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.loop.vue-vine"
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(return)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.flow.vue-vine" }
          },
          end: /(?=[\;\}]|(?=\n?$)|;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(case|default|switch)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.switch.vue-vine"
        },
        { include: "#if-statement" },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(else|if)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.conditional.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(with)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.with.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(package)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(debugger)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.other.debugger.vue-vine"
        }
      ]
    },
    "decl-block": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      name: "meta.block.vue-vine",
      patterns: [
        { include: "#statements" }
      ]
    },
    declaration: {
      patterns: [
        { include: "#decorator" },
        { include: "#var-expr" },
        { include: "#function-declaration" },
        { include: "#class-declaration" },
        { include: "#interface-declaration" },
        { include: "#enum-declaration" },
        { include: "#namespace-declaration" },
        { include: "#type-alias-declaration" },
        { include: "#import-equals-declaration" },
        { include: "#import-declaration" },
        { include: "#export-declaration" },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(declare|export)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "storage.modifier.vue-vine"
        }
      ]
    },
    decorator: {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))@/dgv,
      beginCaptures: {
        "0": { name: "punctuation.decorator.vue-vine" }
      },
      end: /(?=\p{space})/dgv,
      name: "meta.decorator.vue-vine",
      patterns: [
        { include: "#expression" }
      ]
    },
    "destructuring-const": {
      patterns: [
        {
          begin: /(?<![\:\=]|^of|[^\$\._\p{Alpha}\p{Nd}]of|^in|[^\$\._\p{Alpha}\p{Nd}]in)\p{space}*(?=\{)/dgv,
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+))/dgv,
          name: "meta.object-binding-pattern-variable.vue-vine",
          patterns: [
            { include: "#object-binding-pattern-const" },
            { include: "#type-annotation" },
            { include: "#comment" }
          ]
        },
        {
          begin: /(?<![\:\=]|^of|[^\$\._\p{Alpha}\p{Nd}]of|^in|[^\$\._\p{Alpha}\p{Nd}]in)\p{space}*(?=\[)/dgv,
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+))/dgv,
          name: "meta.array-binding-pattern-variable.vue-vine",
          patterns: [
            { include: "#array-binding-pattern-const" },
            { include: "#type-annotation" },
            { include: "#comment" }
          ]
        }
      ]
    },
    "destructuring-parameter": {
      patterns: [
        {
          begin: /(?<![\:\=])\p{space}*(?:(\.\.\.)\p{space}*)?(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.rest.vue-vine" },
            "2": { name: "punctuation.definition.binding-pattern.object.vue-vine" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.binding-pattern.object.vue-vine" }
          },
          name: "meta.parameter.object-binding-pattern.vue-vine",
          patterns: [
            { include: "#parameter-object-binding-element" }
          ]
        },
        {
          begin: /(?<![\:\=])\p{space}*(?:(\.\.\.)\p{space}*)?(\[)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.rest.vue-vine" },
            "2": { name: "punctuation.definition.binding-pattern.array.vue-vine" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.binding-pattern.array.vue-vine" }
          },
          name: "meta.paramter.array-binding-pattern.vue-vine",
          patterns: [
            { include: "#parameter-binding-element" },
            { include: "#punctuation-comma" }
          ]
        }
      ]
    },
    "destructuring-parameter-rest": {
      captures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "variable.parameter.vue-vine" }
      },
      match: /(?:(\.\.\.)\p{space}*)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
    },
    "destructuring-variable": {
      patterns: [
        {
          begin: /(?<![\:\=]|^of|[^\$\._\p{Alpha}\p{Nd}]of|^in|[^\$\._\p{Alpha}\p{Nd}]in)\p{space}*(?=\{)/dgv,
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+))/dgv,
          name: "meta.object-binding-pattern-variable.vue-vine",
          patterns: [
            { include: "#object-binding-pattern" },
            { include: "#type-annotation" },
            { include: "#comment" }
          ]
        },
        {
          begin: /(?<![\:\=]|^of|[^\$\._\p{Alpha}\p{Nd}]of|^in|[^\$\._\p{Alpha}\p{Nd}]in)\p{space}*(?=\[)/dgv,
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+))/dgv,
          name: "meta.array-binding-pattern-variable.vue-vine",
          patterns: [
            { include: "#array-binding-pattern" },
            { include: "#type-annotation" },
            { include: "#comment" }
          ]
        }
      ]
    },
    "destructuring-variable-rest": {
      captures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "meta.definition.variable.ts variable.other.readwrite.vue-vine" }
      },
      match: /(?:(\.\.\.)\p{space}*)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
    },
    "destructuring-variable-rest-const": {
      captures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "meta.definition.variable.ts variable.other.constant.vue-vine" }
      },
      match: /(?:(\.\.\.)\p{space}*)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
    },
    directives: {
      begin: /^(\/\/\/)\p{space}*(?=<(reference|amd-dependency|amd-module)(\p{space}+(path|types|no-default-lib|lib|name|resolution-mode)\p{space}*=\p{space}*(('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)))+\p{space}*\/>\p{space}*(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.vue-vine" }
      },
      end: /(?=(?=\n?$))/dgv,
      name: "comment.line.triple-slash.directive.vue-vine",
      patterns: [
        {
          begin: /(<)(reference|amd-dependency|amd-module)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.directive.vue-vine" },
            "2": { name: "entity.name.tag.directive.vue-vine" }
          },
          end: /\/>/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tag.directive.vue-vine" }
          },
          name: "meta.tag.vue-vine",
          patterns: [
            {
              match: /path|types|no-default-lib|lib|name|resolution-mode/dgv,
              name: "entity.other.attribute-name.directive.vue-vine"
            },
            {
              match: /=/dgv,
              name: "keyword.operator.assignment.vue-vine"
            },
            { include: "#string" }
          ]
        }
      ]
    },
    docblock: {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "constant.language.access-type.jsdoc" }
          },
          match: /((@)a(?:ccess|pi))\p{space}+(p(?:rivate|rotected|ublic))\b/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
            "4": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
            "5": { name: "constant.other.email.link.underline.jsdoc" },
            "6": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
          },
          match: /((@)author)\p{space}+([^\*\/\<\>\@\p{space}](?:[^\*\/\<\>\@]|\*[^\/])*)(?:\p{space}*(<)([^\>\p{space}]+)(>))?/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
            "4": { name: "keyword.operator.control.jsdoc" },
            "5": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)borrows)\p{space}+((?:[^\*\/\@\p{space}]|\*[^\/])+)\p{space}+(as)\p{space}+((?:[^\*\/\@\p{space}]|\*[^\/])+)/dgv
        },
        {
          begin: /((@)example)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=@|\*\/)/dgv,
          name: "meta.example.jsdoc",
          patterns: [
            {
              match: /^\p{space}\*\p{space}+/dgv
            },
            {
              begin: {
                G: [/￿(<)caption(>)/dgv, /(<)caption(>)/dgvy]
              },
              beginCaptures: {
                "0": { name: "entity.name.tag.inline.jsdoc" },
                "1": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
                "2": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
              },
              contentName: "constant.other.description.jsdoc",
              end: /(<\/)caption(>)|(?=\*\/)/dgv,
              endCaptures: {
                "0": { name: "entity.name.tag.inline.jsdoc" },
                "1": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
                "2": { name: "punctuation.definition.bracket.angle.end.jsdoc" }
              }
            },
            {
              captures: {
                "0": { name: "source.embedded.vue-vine" }
              },
              match: /[^\*\@\p{space}](?:[^\*]|\*[^\/])*/dgv
            }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "constant.language.symbol-type.jsdoc" }
          },
          match: /((@)kind)\p{space}+(class|constant|event|external|file|function|member|mixin|module|namespace|typedef)\b/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.link.underline.jsdoc" },
            "4": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)see)\p{space}+(?:((?=https?:\/\/)(?:[^\*\p{space}]|\*[^\/])+)|((?!https?:\/\/|(?:\[[^\]\[]*\])?\{@(?:link|linkcode|linkplain|tutorial)\b)(?:[^\*\/\@\p{space}]|\*[^\/])+))/dgv
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" }
          },
          match: /((@)template)\p{space}+([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*(?:\p{space}*,\p{space}*[\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)*)/dgv
        },
        {
          begin: /((@)template)\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" },
            {
              match: /([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
              name: "variable.other.jsdoc"
            }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" }
          },
          match: /((@)(?:arg|argument|const|constant|member|namespace|param|var))\p{space}+([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
        },
        {
          begin: /((@)typedef)\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" },
            {
              match: /(?:[^\*\/\@\p{space}]|\*[^\/])+/dgv,
              name: "entity.name.type.instance.jsdoc"
            }
          ]
        },
        {
          begin: /((@)(?:arg|argument|const|constant|member|namespace|param|prop|property|var))\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" },
            {
              match: /([\$A-Z_a-z][\]\$\.\[\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
              name: "variable.other.jsdoc"
            },
            {
              captures: {
                "1": { name: "punctuation.definition.optional-value.begin.bracket.square.jsdoc" },
                "2": { name: "keyword.operator.assignment.jsdoc" },
                "3": { name: "source.embedded.vue-vine" },
                "4": { name: "punctuation.definition.optional-value.end.bracket.square.jsdoc" },
                "5": { name: "invalid.illegal.syntax.jsdoc" }
              },
              match: new EmulatedRegExp("(\\[)\\p{space}*[\\$\\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:(?:\\[\\])?\\.[\\$\\p{L}\\p{M}\\p{N}\\p{Pc}]+)*(?:\\p{space}*(=)\\p{space}*((?:(?=(\"(?:\\*(?!/)|\\\\(?!\")|[^\\*\\\\])*?\"|'(?:\\*(?!/)|\\\\(?!')|[^\\*\\\\])*?'|\\[(?:\\*(?!/)|[^\\*])*?\\]|(?:\\*(?!/)|\\p{space}(?!\\p{space}*\\])|\\[[^\\n]*?(?:\\]|(?=\\*/))|[^\\]\\*\\[\\p{space}])*))\\4)*))?\\p{space}*(?:(\\])((?:[^\\*\\p{space}]|\\*[^\\/\\p{space}])+)?|(?=\\*/))", "dgv", { hiddenCaptures: [4] }),
              name: "variable.other.jsdoc"
            }
          ]
        },
        {
          begin: /((@)(?:define|enum|exception|export|extends|lends|implements|modifies|namespace|private|protected|returns?|satisfies|suppress|this|throws|type|yields?))\p{space}+(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          end: /(?=\p{space}|\*\/|[^\]\$A-\[_a-\{\}])/dgv,
          patterns: [
            { include: "#jsdoctype" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" }
          },
          match: /((@)(?:alias|augments|callback|constructs|emits|event|fires|exports?|extends|external|function|func|host|lends|listens|interface|memberof!?|method|module|mixes|mixin|name|requires|see|this|typedef|uses))\p{space}+((?:[^\*\@\{\}\p{space}]|\*[^\/])+)/dgv
        },
        {
          begin: /((@)(?:default(?:value)?|license|version))\p{space}+((["']))/dgv,
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" },
            "4": { name: "punctuation.definition.string.begin.jsdoc" }
          },
          contentName: "variable.other.jsdoc",
          end: /(3)|(?=(?=\n?$)|\*\/)/dgv,
          endCaptures: {
            "0": { name: "variable.other.jsdoc" },
            "1": { name: "punctuation.definition.string.end.jsdoc" }
          }
        },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" }
          },
          match: /((@)(?:default(?:value)?|license|tutorial|variation|version))\p{space}+([^\*\p{space}]+)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          match: /(@)(?:abstract|access|alias|api|arg|argument|async|attribute|augments|author|beta|borrows|bubbles|callback|chainable|class|classdesc|code|config|const|constant|constructor|constructs|copyright|default|defaultvalue|define|deprecated|desc|description|dict|emits|enum|event|example|exception|exports?|extends|extension(?:_?for)?|external|externs|file|fileoverview|final|fires|for|func|function|generator|global|hideconstructor|host|ignore|implements|implicitCast|inherit[Dd]oc|inner|instance|interface|internal|kind|lends|license|listens|main|member|memberof!?|method|mixes|mixins?|modifies|module|name|namespace|noalias|nocollapse|nocompile|nosideeffects|override|overview|package|param|polymer(?:Behavior)?|preserve|private|prop|property|protected|public|read[Oo]nly|record|require[ds]|returns?|see|since|static|struct|submodule|summary|suppress|template|this|throws|todo|tutorial|type|typedef|unrestricted|uses|var|variation|version|virtual|writeOnce|yields?)\b/dgv,
          name: "storage.type.class.jsdoc"
        },
        { include: "#inline-tags" },
        {
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" }
          },
          match: /((@)[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?=\p{space}+)/dgv
        }
      ]
    },
    "enum-declaration": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?(?:\b(const)\p{space}+)?\b(enum)\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.export.vue-vine" },
        "2": { name: "storage.modifier.vue-vine" },
        "3": { name: "storage.modifier.vue-vine" },
        "4": { name: "storage.type.enum.vue-vine" },
        "5": { name: "entity.name.type.enum.vue-vine" }
      },
      end: /(?<=\})/dgv,
      name: "meta.enum.declaration.vue-vine",
      patterns: [
        { include: "#comment" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.vue-vine" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.vue-vine" }
          },
          patterns: [
            { include: "#comment" },
            {
              begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
              beginCaptures: {
                "0": { name: "variable.other.enummember.vue-vine" }
              },
              end: /(?=[\,\}]|(?=\n?$))/dgv,
              patterns: [
                { include: "#comment" },
                { include: "#variable-initializer" }
              ]
            },
            {
              begin: /(?=(('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\])))/dgv,
              end: /(?=[\,\}]|(?=\n?$))/dgv,
              patterns: [
                { include: "#string" },
                { include: "#array-literal" },
                { include: "#comment" },
                { include: "#variable-initializer" }
              ]
            },
            { include: "#punctuation-comma" }
          ]
        }
      ]
    },
    "export-declaration": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.export.vue-vine" },
            "2": { name: "keyword.control.as.vue-vine" },
            "3": { name: "storage.type.namespace.vue-vine" },
            "4": { name: "entity.name.type.module.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(export)\p{space}+(as)\p{space}+(namespace)\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(export)(?:\p{space}+(type))?(?:\p{space}*(=)|\p{space}+(default)(?=\p{space}+))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.export.vue-vine" },
            "2": { name: "keyword.control.type.vue-vine" },
            "3": { name: "keyword.operator.assignment.vue-vine" },
            "4": { name: "keyword.control.default.vue-vine" }
          },
          end: /(?=(?=\n?$)|;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
          name: "meta.export.default.vue-vine",
          patterns: [
            { include: "#interface-declaration" },
            { include: "#expression" }
          ]
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(export)(?:\p{space}+(type))?\b(?!(\$)|(\p{space}*:))((?=\p{space}*[\*\{])|((?=\p{space}*[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*([\,\p{space}]))(?!\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.export.vue-vine" },
            "2": { name: "keyword.control.type.vue-vine" }
          },
          end: /(?=(?=\n?$)|;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
          name: "meta.export.vue-vine",
          patterns: [
            { include: "#import-export-declaration" }
          ]
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#expressionWithoutIdentifiers" },
        { include: "#identifiers" },
        { include: "#expressionPunctuations" }
      ]
    },
    "expression-inside-possibly-arrow-parens": {
      patterns: [
        { include: "#expressionWithoutIdentifiers" },
        { include: "#comment" },
        { include: "#string" },
        { include: "#decorator" },
        { include: "#destructuring-parameter" },
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(override|public|protected|private|readonly)\p{space}+(?=(override|public|protected|private|readonly)\p{space}+)/dgv
        },
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "keyword.operator.rest.vue-vine" },
            "3": { name: "entity.name.function.ts variable.language.this.vue-vine" },
            "4": { name: "entity.name.function.vue-vine" },
            "5": { name: "keyword.operator.optional.vue-vine" }
          },
          match: new EmulatedRegExp("(?:(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\p{space}+)?(?:(\\.\\.\\.)\\p{space}*)?(?<![\\:\\=])(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*))(?![\\$_\\p{Alpha}\\p{Nd}])(?:(?=\\.\\.\\.)|(?!\\.))\\p{space}*(\\??)(?=\\p{space}*(=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))|(:\\p{space}*((<)|(\\(\\p{space}*((\\))|(\\.\\.\\.)|([\\$_\\p{Alpha}\\p{Nd}]+\\p{space}*(([\\,\\:\\=\\?])|(\\)\\p{space}*=>)))))))|(:\\p{space}*(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![\\$_\\p{Alpha}\\p{Nd}])(?:(?=\\.\\.\\.)|(?!\\.)))|(:\\p{space}*((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))))))|(:\\p{space}*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^\\<\\>]*>)|[^\\(\\)\\,\\<\\=\\>])+=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>))))))", "dgv", { lazyCompile: true })
        },
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "keyword.operator.rest.vue-vine" },
            "3": { name: "variable.parameter.ts variable.language.this.vue-vine" },
            "4": { name: "variable.parameter.vue-vine" },
            "5": { name: "keyword.operator.optional.vue-vine" }
          },
          match: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(override|public|private|protected|readonly)\p{space}+)?(?:(\.\.\.)\p{space}*)?(?<![\:\=])(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(this)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))\p{space}*(\??)(?=\p{space}*[\,\:]|(?=\n?$))/dgv
        },
        { include: "#type-annotation" },
        { include: "#variable-initializer" },
        {
          match: /,/dgv,
          name: "punctuation.separator.parameter.vue-vine"
        },
        { include: "#identifiers" },
        { include: "#expressionPunctuations" }
      ]
    },
    "expression-operators": {
      patterns: [
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(await)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.control.flow.vue-vine"
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(yield)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))(?=\p{space}*\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*\*)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.flow.vue-vine" }
          },
          end: /\*/dgv,
          endCaptures: {
            "0": { name: "keyword.generator.asterisk.vue-vine" }
          },
          patterns: [
            { include: "#comment" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.control.flow.vue-vine" },
            "2": { name: "keyword.generator.asterisk.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(yield)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))(?:\p{space}*(\*))?/dgv
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))delete(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.operator.expression.delete.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))in(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))(?!\()/dgv,
          name: "keyword.operator.expression.in.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))of(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))(?!\()/dgv,
          name: "keyword.operator.expression.of.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))instanceof(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.operator.expression.instanceof.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))new(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.operator.new.vue-vine"
        },
        { include: "#typeof-operator" },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))void(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.operator.expression.void.vue-vine"
        },
        {
          captures: {
            "1": { name: "keyword.control.as.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(as)\p{space}+(const)(?=\p{space}*((?=\n?$)|[\]\)\,\:\;\}]))/dgv
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(as)|(satisfies))\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.as.vue-vine" },
            "2": { name: "keyword.control.satisfies.vue-vine" }
          },
          end: /(?=^|[\-\]\)\+\,\:\;\>\?\}]|\|\||&&|!==|(?=\n?$)|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(as|satisfies)\p{space}+)|(\p{space}+<))/dgv,
          patterns: [
            { include: "#type" }
          ]
        },
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.spread.vue-vine"
        },
        {
          match: /(?:\*|(?<!\()\/|[\-\%\+])=/dgv,
          name: "keyword.operator.assignment.compound.vue-vine"
        },
        {
          match: /(?:[\&\^]|<<|>>>??|\|)=/dgv,
          name: "keyword.operator.assignment.compound.bitwise.vue-vine"
        },
        {
          match: /<<|>>>?/dgv,
          name: "keyword.operator.bitwise.shift.vue-vine"
        },
        {
          match: /[\!\=]==?/dgv,
          name: "keyword.operator.comparison.vue-vine"
        },
        {
          match: /<=|>=|<>|[\<\>]/dgv,
          name: "keyword.operator.relational.vue-vine"
        },
        {
          captures: {
            "1": { name: "keyword.operator.logical.vue-vine" },
            "2": { name: "keyword.operator.assignment.compound.vue-vine" },
            "3": { name: "keyword.operator.arithmetic.vue-vine" }
          },
          match: /(?<=[\$_\p{Alpha}\p{Nd}])(!)\p{space}*(?:(\/=)|(\/)(?![\*\/]))/dgv
        },
        {
          match: /!|&&|\|\||\?\?/dgv,
          name: "keyword.operator.logical.vue-vine"
        },
        {
          match: /[\&\^\|\~]/dgv,
          name: "keyword.operator.bitwise.vue-vine"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.vue-vine"
        },
        {
          match: /--/dgv,
          name: "keyword.operator.decrement.vue-vine"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.increment.vue-vine"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.vue-vine"
        },
        {
          begin: /(?<=[\]\$\)_\p{Alpha}\p{Nd}])\p{space}*(?=(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)+(?:(\/=)|(\/)(?![\*\/])))/dgv,
          end: /(\/=)|(\/)(?!\*([^\*]|(\*[^\/]))*\*\/)/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.assignment.compound.vue-vine" },
            "2": { name: "keyword.operator.arithmetic.vue-vine" }
          },
          patterns: [
            { include: "#comment" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.operator.assignment.compound.vue-vine" },
            "2": { name: "keyword.operator.arithmetic.vue-vine" }
          },
          match: /(?<=[\]\$\)_\p{Alpha}\p{Nd}])\p{space}*(?:(\/=)|(\/)(?![\*\/]))/dgv
        }
      ]
    },
    expressionPunctuations: {
      patterns: [
        { include: "#punctuation-comma" },
        { include: "#punctuation-accessor" }
      ]
    },
    expressionWithoutIdentifiers: {
      patterns: [
        { include: "#string" },
        { include: "#regex" },
        { include: "#comment" },
        { include: "#function-expression" },
        { include: "#class-expression" },
        { include: "#arrow-function" },
        { include: "#paren-expression-possibly-arrow" },
        { include: "#cast" },
        { include: "#ternary-expression" },
        { include: "#new-expr" },
        { include: "#instanceof-expr" },
        { include: "#object-literal" },
        { include: "#expression-operators" },
        { include: "#function-call" },
        { include: "#literal" },
        { include: "#support-objects" },
        { include: "#paren-expression" }
      ]
    },
    "field-declaration": {
      begin: /(?<!\()(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(readonly)\p{space}+)?(?=\p{space}*(\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(?:(?:(\?)|(!))\p{space}*)?([\,\:\;\=\}]|(?=\n?$)))/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.vue-vine" }
      },
      end: /(?=[\,\;\}]|(?=\n?$)|^((?!\p{space}*(\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(?:(?:(\?)|(!))\p{space}*)?([\,\:\;\=]|(?=\n?$)))))|(?<=\})/dgv,
      name: "meta.field.declaration.vue-vine",
      patterns: [
        { include: "#variable-initializer" },
        { include: "#type-annotation" },
        { include: "#string" },
        { include: "#array-literal" },
        { include: "#numeric-literal" },
        { include: "#comment" },
        {
          captures: {
            "1": { name: "meta.definition.property.ts entity.name.function.vue-vine" },
            "2": { name: "keyword.operator.optional.vue-vine" },
            "3": { name: "keyword.operator.definiteassignment.vue-vine" }
          },
          match: new EmulatedRegExp("(#?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*)(?:(\\?)|(!))?(?=\\p{space}*\\p{space}*(=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))|(:\\p{space}*((<)|(\\(\\p{space}*((\\))|(\\.\\.\\.)|([\\$_\\p{Alpha}\\p{Nd}]+\\p{space}*(([\\,\\:\\=\\?])|(\\)\\p{space}*=>)))))))|(:\\p{space}*(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![\\$_\\p{Alpha}\\p{Nd}])(?:(?=\\.\\.\\.)|(?!\\.)))|(:\\p{space}*((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))))))|(:\\p{space}*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^\\<\\>]*>)|[^\\(\\)\\,\\<\\=\\>])+=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>))))))", "dgv", { lazyCompile: true })
        },
        {
          match: /#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          name: "meta.definition.property.ts variable.object.property.vue-vine"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.optional.vue-vine"
        },
        {
          match: /!/dgv,
          name: "keyword.operator.definiteassignment.vue-vine"
        }
      ]
    },
    "for-loop": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))for(?=((\p{space}+|(\p{space}*\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*))await)?\p{space}*(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)?(\())/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.loop.vue-vine" }
      },
      end: /(?<=\))/dgv,
      patterns: [
        { include: "#comment" },
        {
          match: /await/dgv,
          name: "keyword.control.loop.vue-vine"
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "meta.brace.round.vue-vine" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.vue-vine" }
          },
          patterns: [
            { include: "#var-expr" },
            { include: "#expression" },
            { include: "#punctuation-semicolon" }
          ]
        }
      ]
    },
    "function-body": {
      patterns: [
        { include: "#comment" },
        { include: "#type-parameters" },
        { include: "#function-parameters" },
        { include: "#return-type" },
        { include: "#type-function-return-type" },
        { include: "#decl-block" },
        {
          match: /\*/dgv,
          name: "keyword.generator.asterisk.vue-vine"
        }
      ]
    },
    "function-call": {
      patterns: [
        {
          begin: /(?=(((([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\p{space}*\??\.\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))*)|(\??\.\p{space}*#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))|(?<=\)))\p{space}*(?:(\?\.\p{space}*)|(!))?((<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?\())/dgv,
          end: /(?<=\))(?!(((([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\p{space}*\??\.\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))*)|(\??\.\p{space}*#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))|(?<=\)))\p{space}*(?:(\?\.\p{space}*)|(!))?((<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?\())/dgv,
          patterns: [
            {
              begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\p{space}*\??\.\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))*)|(\??\.\p{space}*#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))/dgv,
              end: /(?=\p{space}*(?:(\?\.\p{space}*)|(!))?((<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?\())/dgv,
              name: "meta.function-call.vue-vine",
              patterns: [
                { include: "#function-call-target" }
              ]
            },
            { include: "#comment" },
            { include: "#function-call-optionals" },
            { include: "#type-arguments" },
            { include: "#paren-expression" }
          ]
        },
        {
          begin: /(?=(((([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\p{space}*\??\.\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))*)|(\??\.\p{space}*#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))|(?<=\)))(<\p{space}*[\(\[\{]\p{space}*)(?=\n?$))/dgv,
          end: /(?<=>)(?!(((([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\p{space}*\??\.\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))*)|(\??\.\p{space}*#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))|(?<=\)))(<\p{space}*[\(\[\{]\p{space}*)(?=\n?$))/dgv,
          patterns: [
            {
              begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(\p{space}*\??\.\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))*)|(\??\.\p{space}*#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))/dgv,
              end: /(?=(<\p{space}*[\(\[\{]\p{space}*)(?=\n?$))/dgv,
              name: "meta.function-call.vue-vine",
              patterns: [
                { include: "#function-call-target" }
              ]
            },
            { include: "#comment" },
            { include: "#function-call-optionals" },
            { include: "#type-arguments" }
          ]
        }
      ]
    },
    "function-call-optionals": {
      patterns: [
        {
          match: /\?\./dgv,
          name: "meta.function-call.ts punctuation.accessor.optional.vue-vine"
        },
        {
          match: /!/dgv,
          name: "meta.function-call.ts keyword.operator.definiteassignment.vue-vine"
        }
      ]
    },
    "function-call-target": {
      patterns: [
        { include: "#support-function-call-identifiers" },
        {
          match: /(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          name: "entity.name.function.vue-vine"
        }
      ]
    },
    "function-declaration": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?(?:(async)\p{space}+)?(function)\b(?:\p{space}*(\*))?(?:(?:\p{space}+|(?<=\*))([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))?\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.export.vue-vine" },
        "2": { name: "storage.modifier.vue-vine" },
        "3": { name: "storage.modifier.async.vue-vine" },
        "4": { name: "storage.type.function.vue-vine" },
        "5": { name: "keyword.generator.asterisk.vue-vine" },
        "6": { name: "meta.definition.function.ts entity.name.function.vue-vine" }
      },
      end: /(?=;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)|(?<=\})/dgv,
      name: "meta.function.vue-vine",
      patterns: [
        { include: "#function-name" },
        { include: "#function-body" }
      ]
    },
    "function-expression": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(async)\p{space}+)?(function)\b(?:\p{space}*(\*))?(?:(?:\p{space}+|(?<=\*))([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))?\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.async.vue-vine" },
        "2": { name: "storage.type.function.vue-vine" },
        "3": { name: "keyword.generator.asterisk.vue-vine" },
        "4": { name: "meta.definition.function.ts entity.name.function.vue-vine" }
      },
      end: /(?=;)|(?<=\})/dgv,
      name: "meta.function.expression.vue-vine",
      patterns: [
        { include: "#function-name" },
        { include: "#single-line-comment-consuming-line-ending" },
        { include: "#function-body" }
      ]
    },
    "function-name": {
      match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
      name: "meta.definition.function.ts entity.name.function.vue-vine"
    },
    "function-parameters": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.parameters.begin.vue-vine" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.vue-vine" }
      },
      name: "meta.parameters.vue-vine",
      patterns: [
        { include: "#function-parameters-body" }
      ]
    },
    "function-parameters-body": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#decorator" },
        { include: "#destructuring-parameter" },
        { include: "#parameter-name" },
        { include: "#parameter-type-annotation" },
        { include: "#variable-initializer" },
        {
          match: /,/dgv,
          name: "punctuation.separator.parameter.vue-vine"
        }
      ]
    },
    identifiers: {
      patterns: [
        { include: "#object-identifiers" },
        {
          captures: {
            "1": { name: "punctuation.accessor.vue-vine" },
            "2": { name: "punctuation.accessor.optional.vue-vine" },
            "3": { name: "entity.name.function.vue-vine" }
          },
          match: new EmulatedRegExp("(?:(?:(\\.)|(\\?\\.(?!\\p{space}*\\p{Nd})))\\p{space}*)?([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*)(?=\\p{space}*=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))", "dgv", { lazyCompile: true })
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.vue-vine" },
            "2": { name: "punctuation.accessor.optional.vue-vine" },
            "3": { name: "variable.other.constant.property.vue-vine" }
          },
          match: /(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(#?\p{Upper}[\$_\p{Nd}\p{Upper}]*)(?![\$_\p{Alpha}\p{Nd}])/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.vue-vine" },
            "2": { name: "punctuation.accessor.optional.vue-vine" },
            "3": { name: "variable.other.property.vue-vine" }
          },
          match: /(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        },
        {
          match: /(\p{Upper}[\$_\p{Nd}\p{Upper}]*)(?![\$_\p{Alpha}\p{Nd}])/dgv,
          name: "variable.other.constant.vue-vine"
        },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          name: "variable.other.readwrite.vue-vine"
        }
      ]
    },
    "if-statement": {
      patterns: [
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?=\bif\p{space}*(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))\p{space}*(?!\{))/dgv,
          end: /(?=;|(?=\n?$)|\})/dgv,
          patterns: [
            { include: "#comment" },
            {
              begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(if)\p{space}*(\()/dgv,
              beginCaptures: {
                "1": { name: "keyword.control.conditional.vue-vine" },
                "2": { name: "meta.brace.round.vue-vine" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "meta.brace.round.vue-vine" }
              },
              patterns: [
                { include: "#expression" }
              ]
            },
            {
              begin: /(?<=\))\p{space}*\/(?![\*\/])(?=(?:[^\/\[\\]|\\[^\n]|\[([^\]\\]|\\[^\n])*\])+\/([dgimsuy]+|(?![\*\/])|(?=\/\*))(?!\p{space}*[\$0-9A-Z_a-z]))/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.string.begin.vue-vine" }
              },
              end: /(\/)([dgimsuy]*)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.string.end.vue-vine" },
                "2": { name: "keyword.other.vue-vine" }
              },
              name: "string.regexp.vue-vine",
              patterns: [
                { include: "#regexp" }
              ]
            },
            { include: "#statements" }
          ]
        }
      ]
    },
    "import-declaration": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(import)(?:\p{space}+(type)(?!\p{space}+from))?(?!\p{space}*[\(\:])(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.export.vue-vine" },
        "2": { name: "storage.modifier.vue-vine" },
        "3": { name: "keyword.control.import.vue-vine" },
        "4": { name: "keyword.control.type.vue-vine" }
      },
      end: /(?<!(?:^|[^\$\._\p{Alpha}\p{Nd}])import)(?=;|(?=\n?$)|^)/dgv,
      name: "meta.import.vue-vine",
      patterns: [
        { include: "#single-line-comment-consuming-line-ending" },
        { include: "#comment" },
        { include: "#string" },
        {
          begin: /(?<=(?:^|[^\$\._\p{Alpha}\p{Nd}])import)(?!\p{space}*["'])/dgv,
          end: /\bfrom\b/dgv,
          endCaptures: {
            "0": { name: "keyword.control.from.vue-vine" }
          },
          patterns: [
            { include: "#import-export-declaration" }
          ]
        },
        { include: "#import-export-declaration" }
      ]
    },
    "import-equals-declaration": {
      patterns: [
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(import)(?:\p{space}+(type))?\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(=)\p{space}*(require)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.export.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" },
            "3": { name: "keyword.control.import.vue-vine" },
            "4": { name: "keyword.control.type.vue-vine" },
            "5": { name: "variable.other.readwrite.alias.vue-vine" },
            "6": { name: "keyword.operator.assignment.vue-vine" },
            "7": { name: "keyword.control.require.vue-vine" },
            "8": { name: "meta.brace.round.vue-vine" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.vue-vine" }
          },
          name: "meta.import-equals.external.vue-vine",
          patterns: [
            { include: "#comment" },
            { include: "#string" }
          ]
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(import)(?:\p{space}+(type))?\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(=)\p{space}*(?!require\b)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.export.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" },
            "3": { name: "keyword.control.import.vue-vine" },
            "4": { name: "keyword.control.type.vue-vine" },
            "5": { name: "variable.other.readwrite.alias.vue-vine" },
            "6": { name: "keyword.operator.assignment.vue-vine" }
          },
          end: /(?=;|(?=\n?$)|^)/dgv,
          name: "meta.import-equals.internal.vue-vine",
          patterns: [
            { include: "#single-line-comment-consuming-line-ending" },
            { include: "#comment" },
            {
              captures: {
                "1": { name: "entity.name.type.module.vue-vine" },
                "2": { name: "punctuation.accessor.vue-vine" },
                "3": { name: "punctuation.accessor.optional.vue-vine" }
              },
              match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))/dgv
            },
            {
              match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
              name: "variable.other.readwrite.vue-vine"
            }
          ]
        }
      ]
    },
    "import-export-assert-clause": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(assert)\p{space}*(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.assert.vue-vine" },
        "2": { name: "punctuation.definition.block.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*(?=(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)*:)/dgv,
          name: "meta.object-literal.key.vue-vine"
        },
        {
          match: /:/dgv,
          name: "punctuation.separator.key-value.vue-vine"
        }
      ]
    },
    "import-export-block": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      name: "meta.block.vue-vine",
      patterns: [
        { include: "#import-export-clause" }
      ]
    },
    "import-export-clause": {
      patterns: [
        { include: "#comment" },
        {
          captures: {
            "1": { name: "keyword.control.type.vue-vine" },
            "2": { name: "keyword.control.default.vue-vine" },
            "3": { name: "constant.language.import-export-all.vue-vine" },
            "4": { name: "variable.other.readwrite.vue-vine" },
            "5": { name: "keyword.control.as.vue-vine" },
            "6": { name: "keyword.control.default.vue-vine" },
            "7": { name: "variable.other.readwrite.alias.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(type)\p{space}+)?(?:\b(default)|(\*)|\b([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))\p{space}+(as)\p{space}+(?:(default(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))/dgv
        },
        { include: "#punctuation-comma" },
        {
          match: /\*/dgv,
          name: "constant.language.import-export-all.vue-vine"
        },
        {
          match: /\b(default)\b/dgv,
          name: "keyword.control.default.vue-vine"
        },
        {
          captures: {
            "1": { name: "keyword.control.type.vue-vine" },
            "2": { name: "variable.other.readwrite.alias.vue-vine" }
          },
          match: /(?:\b(type)\p{space}+)?([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        }
      ]
    },
    "import-export-declaration": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#import-export-block" },
        {
          match: /\bfrom\b/dgv,
          name: "keyword.control.from.vue-vine"
        },
        { include: "#import-export-assert-clause" },
        { include: "#import-export-clause" }
      ]
    },
    "indexer-declaration": {
      begin: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(readonly)\p{space}*)?\p{space}*(\[)\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?=:)/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.vue-vine" },
        "2": { name: "meta.brace.square.vue-vine" },
        "3": { name: "variable.parameter.vue-vine" }
      },
      end: /(\])\p{space}*(\?\p{space}*)?|(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "meta.brace.square.vue-vine" },
        "2": { name: "keyword.operator.optional.vue-vine" }
      },
      name: "meta.indexer.declaration.vue-vine",
      patterns: [
        { include: "#type-annotation" }
      ]
    },
    "indexer-mapped-type-declaration": {
      begin: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))([\-\+])?(readonly)\p{space}*)?\p{space}*(\[)\p{space}*([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}+(in)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.type.modifier.vue-vine" },
        "2": { name: "storage.modifier.vue-vine" },
        "3": { name: "meta.brace.square.vue-vine" },
        "4": { name: "entity.name.type.vue-vine" },
        "5": { name: "keyword.operator.expression.in.vue-vine" }
      },
      end: /(\])([\-\+])?\p{space}*(\?\p{space}*)?|(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "meta.brace.square.vue-vine" },
        "2": { name: "keyword.operator.type.modifier.vue-vine" },
        "3": { name: "keyword.operator.optional.vue-vine" }
      },
      name: "meta.indexer.mappedtype.declaration.vue-vine",
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.as.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(as)\p{space}+/dgv
        },
        { include: "#type" }
      ]
    },
    "inline-tags": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.bracket.square.begin.jsdoc" },
            "2": { name: "punctuation.definition.bracket.square.end.jsdoc" }
          },
          match: /(\[)[^\]]+(\])(?=\{@(?:link|linkcode|linkplain|tutorial))/dgv,
          name: "constant.other.description.jsdoc"
        },
        {
          begin: /(\{)((@)(?:link(?:code|plain)?|tutorial))\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.bracket.curly.begin.jsdoc" },
            "2": { name: "storage.type.class.jsdoc" },
            "3": { name: "punctuation.definition.inline.tag.jsdoc" }
          },
          end: /\}|(?=\*\/)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.bracket.curly.end.jsdoc" }
          },
          name: "entity.name.type.instance.jsdoc",
          patterns: [
            {
              captures: {
                "1": { name: "variable.other.link.underline.jsdoc" },
                "2": { name: "punctuation.separator.pipe.jsdoc" }
              },
              match: {
                G: [/￿((?=https?:\/\/)(?:[^\*\|\}\p{space}]|\*\/)+)(\|)?/dgv, /((?=https?:\/\/)(?:[^\*\|\}\p{space}]|\*\/)+)(\|)?/dgvy]
              }
            },
            {
              captures: {
                "1": { name: "variable.other.description.jsdoc" },
                "2": { name: "punctuation.separator.pipe.jsdoc" }
              },
              match: {
                G: [/￿((?:[^\*\@\{\|\}\p{space}]|\*[^\/])+)(\|)?/dgv, /((?:[^\*\@\{\|\}\p{space}]|\*[^\/])+)(\|)?/dgvy]
              }
            }
          ]
        }
      ]
    },
    "instanceof-expr": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(instanceof)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.expression.instanceof.vue-vine" }
      },
      end: /(?<=\))|(?=[\-\]\)\+\,\:\;\>\?\}]|\|\||&&|!==|(?=\n?$)|([\!\=]==?)|(([\&\^\|\~]\p{space}*)?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}+instanceof(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))function((\p{space}+[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|(\p{space}*\())))/dgv,
      patterns: [
        { include: "#type" }
      ]
    },
    "interface-declaration": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(?:(abstract)\p{space}+)?\b(interface)\b(?=\p{space}+|\/[\*\/])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.export.vue-vine" },
        "2": { name: "storage.modifier.vue-vine" },
        "3": { name: "storage.modifier.vue-vine" },
        "4": { name: "storage.type.interface.vue-vine" }
      },
      end: /(?<=\})/dgv,
      name: "meta.interface.vue-vine",
      patterns: [
        { include: "#comment" },
        { include: "#class-or-interface-heritage" },
        {
          captures: {
            "0": { name: "entity.name.type.interface.vue-vine" }
          },
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv
        },
        { include: "#type-parameters" },
        { include: "#class-or-interface-body" }
      ]
    },
    jsdoctype: {
      patterns: [
        {
          begin: {
            G: [/￿(\{)/dgv, /(\{)/dgvy]
          },
          beginCaptures: {
            "0": { name: "entity.name.type.instance.jsdoc" },
            "1": { name: "punctuation.definition.bracket.curly.begin.jsdoc" }
          },
          contentName: "entity.name.type.instance.jsdoc",
          end: /((\}))\p{space}*|(?=\*\/)/dgv,
          endCaptures: {
            "1": { name: "entity.name.type.instance.jsdoc" },
            "2": { name: "punctuation.definition.bracket.curly.end.jsdoc" }
          },
          patterns: [
            { include: "#brackets" }
          ]
        }
      ]
    },
    label: {
      patterns: [
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(:)(?=\p{space}*\{)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.label.vue-vine" },
            "2": { name: "punctuation.separator.label.vue-vine" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#decl-block" }
          ]
        },
        {
          captures: {
            "1": { name: "entity.name.label.vue-vine" },
            "2": { name: "punctuation.separator.label.vue-vine" }
          },
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(:)/dgv
        }
      ]
    },
    literal: {
      patterns: [
        { include: "#numeric-literal" },
        { include: "#boolean-literal" },
        { include: "#null-literal" },
        { include: "#undefined-literal" },
        { include: "#numericConstant-literal" },
        { include: "#array-literal" },
        { include: "#this-literal" },
        { include: "#super-literal" }
      ]
    },
    "method-declaration": {
      patterns: [
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(override)\p{space}+)?(?:\b(p(?:ublic|rivate|rotected))\p{space}+)?(?:\b(abstract)\p{space}+)?(?:\b(async)\p{space}+)?\p{space}*\b(constructor)\b(?!:)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" },
            "3": { name: "storage.modifier.vue-vine" },
            "4": { name: "storage.modifier.async.vue-vine" },
            "5": { name: "storage.type.vue-vine" }
          },
          end: /(?=[\,\;\}]|(?=\n?$))|(?<=\})/dgv,
          name: "meta.method.declaration.vue-vine",
          patterns: [
            { include: "#method-declaration-name" },
            { include: "#function-body" }
          ]
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(override)\p{space}+)?(?:\b(p(?:ublic|rivate|rotected))\p{space}+)?(?:\b(abstract)\p{space}+)?(?:\b(async)\p{space}+)?(?:\p{space}*\b(new)\b(?!:)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))|(?:(\*)\p{space}*)?)(?=\p{space}*((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*))?\()/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" },
            "3": { name: "storage.modifier.vue-vine" },
            "4": { name: "storage.modifier.async.vue-vine" },
            "5": { name: "keyword.operator.new.vue-vine" },
            "6": { name: "keyword.generator.asterisk.vue-vine" }
          },
          end: /(?=[\,\;\}]|(?=\n?$))|(?<=\})/dgv,
          name: "meta.method.declaration.vue-vine",
          patterns: [
            { include: "#method-declaration-name" },
            { include: "#function-body" }
          ]
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(override)\p{space}+)?(?:\b(p(?:ublic|rivate|rotected))\p{space}+)?(?:\b(abstract)\p{space}+)?(?:\b(async)\p{space}+)?(?:\b([gs]et)\p{space}+)?(?:(\*)\p{space}*)?(?=\p{space}*((\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(\??))\p{space}*((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*))?\()/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" },
            "3": { name: "storage.modifier.vue-vine" },
            "4": { name: "storage.modifier.async.vue-vine" },
            "5": { name: "storage.type.property.vue-vine" },
            "6": { name: "keyword.generator.asterisk.vue-vine" }
          },
          end: /(?=[\,\;\}]|(?=\n?$))|(?<=\})/dgv,
          name: "meta.method.declaration.vue-vine",
          patterns: [
            { include: "#method-declaration-name" },
            { include: "#function-body" }
          ]
        }
      ]
    },
    "method-declaration-name": {
      begin: /(?=(\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(\??)\p{space}*[\(\<])/dgv,
      end: /(?=[\(\<])/dgv,
      patterns: [
        { include: "#string" },
        { include: "#array-literal" },
        { include: "#numeric-literal" },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          name: "meta.definition.method.ts entity.name.function.vue-vine"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.optional.vue-vine"
        }
      ]
    },
    "namespace-declaration": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(namespace|module)\p{space}+(?=["\$'_\`\p{Alpha}])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.export.vue-vine" },
        "2": { name: "storage.modifier.vue-vine" },
        "3": { name: "storage.type.namespace.vue-vine" }
      },
      end: /(?<=\})|(?=;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
      name: "meta.namespace.declaration.vue-vine",
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        {
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          name: "entity.name.type.module.vue-vine"
        },
        { include: "#punctuation-accessor" },
        { include: "#decl-block" }
      ]
    },
    "new-expr": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(new)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.new.vue-vine" }
      },
      end: /(?<=\))|(?=[\-\]\)\+\,\:\;\>\?\}]|\|\||&&|!==|(?=\n?$)|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))new(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))function((\p{space}+[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|(\p{space}*\())))/dgv,
      name: "new.expr.vue-vine",
      patterns: [
        { include: "#expression" }
      ]
    },
    "null-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))null(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "constant.language.null.vue-vine"
    },
    "numeric-literal": {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.numeric.bigint.vue-vine" }
          },
          match: /\b(?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$)/dgv,
          name: "constant.numeric.hex.vue-vine"
        },
        {
          captures: {
            "1": { name: "storage.type.numeric.bigint.vue-vine" }
          },
          match: /\b(?<!\$)0[Bb][01][01_]*(n)?\b(?!\$)/dgv,
          name: "constant.numeric.binary.vue-vine"
        },
        {
          captures: {
            "1": { name: "storage.type.numeric.bigint.vue-vine" }
          },
          match: /\b(?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$)/dgv,
          name: "constant.numeric.octal.vue-vine"
        },
        {
          captures: {
            "0": { name: "constant.numeric.decimal.vue-vine" },
            "1": { name: "meta.delimiter.decimal.period.vue-vine" },
            "2": { name: "storage.type.numeric.bigint.vue-vine" },
            "3": { name: "meta.delimiter.decimal.period.vue-vine" },
            "4": { name: "storage.type.numeric.bigint.vue-vine" },
            "5": { name: "meta.delimiter.decimal.period.vue-vine" },
            "6": { name: "storage.type.numeric.bigint.vue-vine" },
            "7": { name: "storage.type.numeric.bigint.vue-vine" },
            "8": { name: "meta.delimiter.decimal.period.vue-vine" },
            "9": { name: "storage.type.numeric.bigint.vue-vine" },
            "10": { name: "meta.delimiter.decimal.period.vue-vine" },
            "11": { name: "storage.type.numeric.bigint.vue-vine" },
            "12": { name: "meta.delimiter.decimal.period.vue-vine" },
            "13": { name: "storage.type.numeric.bigint.vue-vine" },
            "14": { name: "storage.type.numeric.bigint.vue-vine" }
          },
          match: /(?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$)/dgv
        }
      ]
    },
    "numericConstant-literal": {
      patterns: [
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))NaN(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "constant.language.nan.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))Infinity(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "constant.language.infinity.vue-vine"
        }
      ]
    },
    "object-binding-element": {
      patterns: [
        { include: "#comment" },
        {
          begin: /(?=(\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(:))/dgv,
          end: /(?=[\,\}])/dgv,
          patterns: [
            { include: "#object-binding-element-propertyName" },
            { include: "#binding-element" }
          ]
        },
        { include: "#object-binding-pattern" },
        { include: "#destructuring-variable-rest" },
        { include: "#variable-initializer" },
        { include: "#punctuation-comma" }
      ]
    },
    "object-binding-element-const": {
      patterns: [
        { include: "#comment" },
        {
          begin: /(?=(\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(:))/dgv,
          end: /(?=[\,\}])/dgv,
          patterns: [
            { include: "#object-binding-element-propertyName" },
            { include: "#binding-element-const" }
          ]
        },
        { include: "#object-binding-pattern-const" },
        { include: "#destructuring-variable-rest-const" },
        { include: "#variable-initializer" },
        { include: "#punctuation-comma" }
      ]
    },
    "object-binding-element-propertyName": {
      begin: /(?=(\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(:))/dgv,
      end: /(:)/dgv,
      endCaptures: {
        "0": { name: "punctuation.destructuring.vue-vine" }
      },
      patterns: [
        { include: "#string" },
        { include: "#array-literal" },
        { include: "#numeric-literal" },
        {
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          name: "variable.object.property.vue-vine"
        }
      ]
    },
    "object-binding-pattern": {
      begin: /(?:(\.\.\.)\p{space}*)?(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "punctuation.definition.binding-pattern.object.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.object.vue-vine" }
      },
      patterns: [
        { include: "#object-binding-element" }
      ]
    },
    "object-binding-pattern-const": {
      begin: /(?:(\.\.\.)\p{space}*)?(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "punctuation.definition.binding-pattern.object.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.object.vue-vine" }
      },
      patterns: [
        { include: "#object-binding-element-const" }
      ]
    },
    "object-identifiers": {
      patterns: [
        {
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?=\p{space}*\??\.\p{space}*prototype\b(?!\$))/dgv,
          name: "support.class.vue-vine"
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.vue-vine" },
            "2": { name: "punctuation.accessor.optional.vue-vine" },
            "3": { name: "variable.other.constant.object.property.vue-vine" },
            "4": { name: "variable.other.object.property.vue-vine" }
          },
          match: /(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(?:(#?\p{Upper}[\$_\p{Nd}\p{Upper}]*)|(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?=\p{space}*\??\.\p{space}*#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        },
        {
          captures: {
            "1": { name: "variable.other.constant.object.vue-vine" },
            "2": { name: "variable.other.object.vue-vine" }
          },
          match: /(?:(\p{Upper}[\$_\p{Nd}\p{Upper}]*)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?=\p{space}*\??\.\p{space}*#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv
        }
      ]
    },
    "object-literal": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      name: "meta.objectliteral.vue-vine",
      patterns: [
        { include: "#object-member" }
      ]
    },
    "object-literal-method-declaration": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(async)\p{space}+)?(?:\b([gs]et)\p{space}+)?(?:(\*)\p{space}*)?(?=\p{space}*((\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(\??))\p{space}*((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*))?\()/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.async.vue-vine" },
        "2": { name: "storage.type.property.vue-vine" },
        "3": { name: "keyword.generator.asterisk.vue-vine" }
      },
      end: /(?=[\,\;\}])|(?<=\})/dgv,
      name: "meta.method.declaration.vue-vine",
      patterns: [
        { include: "#method-declaration-name" },
        { include: "#function-body" },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(async)\p{space}+)?(?:\b([gs]et)\p{space}+)?(?:(\*)\p{space}*)?(?=\p{space}*((\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(\??))\p{space}*((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*))?\()/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.async.vue-vine" },
            "2": { name: "storage.type.property.vue-vine" },
            "3": { name: "keyword.generator.asterisk.vue-vine" }
          },
          end: /(?=[\(\<])/dgv,
          patterns: [
            { include: "#method-declaration-name" }
          ]
        }
      ]
    },
    "object-member": {
      patterns: [
        { include: "#comment" },
        { include: "#object-literal-method-declaration" },
        {
          begin: /(?=\[)/dgv,
          end: /(?=:)|((?<=\])(?=\p{space}*[\(\<]))/dgv,
          name: "meta.object.member.ts meta.object-literal.key.vue-vine",
          patterns: [
            { include: "#comment" },
            { include: "#array-literal" }
          ]
        },
        {
          begin: /(?=["'\`])/dgv,
          end: /(?=:)|((?<=["'\`])(?=((\p{space}*[\(\,\<\}])|(\p{space}+(as|satisifies)\p{space}+))))/dgv,
          name: "meta.object.member.ts meta.object-literal.key.vue-vine",
          patterns: [
            { include: "#comment" },
            { include: "#string" }
          ]
        },
        {
          begin: /(?=\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$)))/dgv,
          end: /(?=:)|(?=\p{space}*([\(\,\<\}])|(\p{space}+as|satisifies\p{space}+))/dgv,
          name: "meta.object.member.ts meta.object-literal.key.vue-vine",
          patterns: [
            { include: "#comment" },
            { include: "#numeric-literal" }
          ]
        },
        {
          begin: /(?<=[\]"'\`])(?=\p{space}*[\(\<])/dgv,
          end: /(?=[\,\;\}])|(?<=\})/dgv,
          name: "meta.method.declaration.vue-vine",
          patterns: [
            { include: "#function-body" }
          ]
        },
        {
          captures: {
            "0": { name: "meta.object-literal.key.vue-vine" },
            "1": { name: "constant.numeric.decimal.vue-vine" }
          },
          match: /(?![\$_\p{Alpha}])(\p{Nd}+)\p{space}*(?=(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)*:)/dgv,
          name: "meta.object.member.vue-vine"
        },
        {
          captures: {
            "0": { name: "meta.object-literal.key.vue-vine" },
            "1": { name: "entity.name.function.vue-vine" }
          },
          match: new EmulatedRegExp("([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?=(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*:(\\p{space}*/\\*([^\\*]|(\\*[^\\/]))*\\*/)*\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))", "dgv", { lazyCompile: true }),
          name: "meta.object.member.vue-vine"
        },
        {
          captures: {
            "0": { name: "meta.object-literal.key.vue-vine" }
          },
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*(?=(\/\*([^\*]|(\*[^\/]))*\*\/\p{space}*)*:)/dgv,
          name: "meta.object.member.vue-vine"
        },
        {
          begin: /\.\.\./dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.spread.vue-vine" }
          },
          end: /(?=[\,\}])/dgv,
          name: "meta.object.member.vue-vine",
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          captures: {
            "1": { name: "variable.other.readwrite.vue-vine" }
          },
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?=[\,\}]|(?=\n?$)|\/\/|\/\*)/dgv,
          name: "meta.object.member.vue-vine"
        },
        {
          captures: {
            "1": { name: "keyword.control.as.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(as)\p{space}+(const)(?=\p{space}*([\,\}]|(?=\n?$)))/dgv,
          name: "meta.object.member.vue-vine"
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(as)|(satisfies))\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.as.vue-vine" },
            "2": { name: "keyword.control.satisfies.vue-vine" }
          },
          end: /(?=[\-\]\)\+\,\:\;\>\?\}]|\|\||&&|!==|(?=\n?$)|^|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(as|satisifies)\p{space}+))/dgv,
          name: "meta.object.member.vue-vine",
          patterns: [
            { include: "#type" }
          ]
        },
        {
          begin: /(?=[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*=)/dgv,
          end: /(?=[\,\}]|(?=\n?$)|\/\/|\/\*)/dgv,
          name: "meta.object.member.vue-vine",
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /:/dgv,
          beginCaptures: {
            "0": { name: "meta.object-literal.key.ts punctuation.separator.key-value.vue-vine" }
          },
          end: /(?=[\,\}])/dgv,
          name: "meta.object.member.vue-vine",
          patterns: [
            {
              begin: /(?<=:)\p{space}*(async)?(?=\p{space}*(<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*)\(\p{space}*((([\[\{]\p{space}*)?)(?=\n?$)|((\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})\p{space}*((:\p{space}*\{?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))|((\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])\p{space}*((:\p{space}*\[?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))))/dgv,
              beginCaptures: {
                "1": { name: "storage.modifier.async.vue-vine" }
              },
              end: /(?<=\))/dgv,
              patterns: [
                { include: "#type-parameters" },
                {
                  begin: /\(/dgv,
                  beginCaptures: {
                    "0": { name: "meta.brace.round.vue-vine" }
                  },
                  end: /\)/dgv,
                  endCaptures: {
                    "0": { name: "meta.brace.round.vue-vine" }
                  },
                  patterns: [
                    { include: "#expression-inside-possibly-arrow-parens" }
                  ]
                }
              ]
            },
            {
              begin: /(?<=:)\p{space}*(async)?\p{space}*(\()(?=\p{space}*((([\[\{]\p{space}*)?)(?=\n?$)|((\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})\p{space}*((:\p{space}*\{?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))|((\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])\p{space}*((:\p{space}*\[?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))))/dgv,
              beginCaptures: {
                "1": { name: "storage.modifier.async.vue-vine" },
                "2": { name: "meta.brace.round.vue-vine" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "meta.brace.round.vue-vine" }
              },
              patterns: [
                { include: "#expression-inside-possibly-arrow-parens" }
              ]
            },
            {
              begin: /(?<=:)\p{space}*(async)?\p{space}*(?=<\p{space}*(?=\n?$))/dgv,
              beginCaptures: {
                "1": { name: "storage.modifier.async.vue-vine" }
              },
              end: /(?<=>)/dgv,
              patterns: [
                { include: "#type-parameters" }
              ]
            },
            {
              begin: /(?<=>)\p{space}*(\()(?=\p{space}*((([\[\{]\p{space}*)?)(?=\n?$)|((\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})\p{space}*((:\p{space}*\{?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))|((\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])\p{space}*((:\p{space}*\[?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))))/dgv,
              beginCaptures: {
                "1": { name: "meta.brace.round.vue-vine" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "meta.brace.round.vue-vine" }
              },
              patterns: [
                { include: "#expression-inside-possibly-arrow-parens" }
              ]
            },
            { include: "#possibly-arrow-return-type" },
            { include: "#expression" }
          ]
        },
        { include: "#punctuation-comma" },
        { include: "#decl-block" }
      ]
    },
    "parameter-array-binding-pattern": {
      begin: /(?:(\.\.\.)\p{space}*)?(\[)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "punctuation.definition.binding-pattern.array.vue-vine" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.array.vue-vine" }
      },
      patterns: [
        { include: "#parameter-binding-element" },
        { include: "#punctuation-comma" }
      ]
    },
    "parameter-binding-element": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#numeric-literal" },
        { include: "#regex" },
        { include: "#parameter-object-binding-pattern" },
        { include: "#parameter-array-binding-pattern" },
        { include: "#destructuring-parameter-rest" },
        { include: "#variable-initializer" }
      ]
    },
    "parameter-name": {
      patterns: [
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(override|public|protected|private|readonly)\p{space}+(?=(override|public|protected|private|readonly)\p{space}+)/dgv
        },
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "keyword.operator.rest.vue-vine" },
            "3": { name: "entity.name.function.ts variable.language.this.vue-vine" },
            "4": { name: "entity.name.function.vue-vine" },
            "5": { name: "keyword.operator.optional.vue-vine" }
          },
          match: new EmulatedRegExp("(?:(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\p{space}+)?(?:(\\.\\.\\.)\\p{space}*)?(?<![\\:\\=])(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*))(?![\\$_\\p{Alpha}\\p{Nd}])(?:(?=\\.\\.\\.)|(?!\\.))\\p{space}*(\\??)(?=\\p{space}*(=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))|(:\\p{space}*((<)|(\\(\\p{space}*((\\))|(\\.\\.\\.)|([\\$_\\p{Alpha}\\p{Nd}]+\\p{space}*(([\\,\\:\\=\\?])|(\\)\\p{space}*=>)))))))|(:\\p{space}*(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![\\$_\\p{Alpha}\\p{Nd}])(?:(?=\\.\\.\\.)|(?!\\.)))|(:\\p{space}*((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))))))|(:\\p{space}*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^\\<\\>]*>)|[^\\(\\)\\,\\<\\=\\>])+=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>))))))", "dgv", { lazyCompile: true })
        },
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "keyword.operator.rest.vue-vine" },
            "3": { name: "variable.parameter.ts variable.language.this.vue-vine" },
            "4": { name: "variable.parameter.vue-vine" },
            "5": { name: "keyword.operator.optional.vue-vine" }
          },
          match: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(override|public|private|protected|readonly)\p{space}+)?(?:(\.\.\.)\p{space}*)?(?<![\:\=])(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(this)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))\p{space}*(\??)/dgv
        }
      ]
    },
    "parameter-object-binding-element": {
      patterns: [
        { include: "#comment" },
        {
          begin: /(?=(\b((?<!\$)0[Xx]\p{AHex}[_\p{AHex}]*(n)?\b(?!\$))|\b((?<!\$)0[Bb][01][01_]*(n)?\b(?!\$))|\b((?<!\$)0[Oo]?[0-7][0-7_]*(n)?\b(?!\$))|((?<!\$)(?:\b[0-9][0-9_]*(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\B(\.)[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*[Ee][\-\+]?[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(\.)(n)?\B|\B(\.)[0-9][0-9_]*(n)?\b|\b[0-9][0-9_]*(n)?\b(?!\.))(?!\$))|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`)|(\[([^\]\[]|\[[^\]\[]*\])+\]))\p{space}*(:))/dgv,
          end: /(?=[\,\}])/dgv,
          patterns: [
            { include: "#object-binding-element-propertyName" },
            { include: "#parameter-binding-element" },
            { include: "#paren-expression" }
          ]
        },
        { include: "#parameter-object-binding-pattern" },
        { include: "#destructuring-parameter-rest" },
        { include: "#variable-initializer" },
        { include: "#punctuation-comma" }
      ]
    },
    "parameter-object-binding-pattern": {
      begin: /(?:(\.\.\.)\p{space}*)?(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.rest.vue-vine" },
        "2": { name: "punctuation.definition.binding-pattern.object.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.object.vue-vine" }
      },
      patterns: [
        { include: "#parameter-object-binding-element" }
      ]
    },
    "parameter-type-annotation": {
      patterns: [
        {
          begin: /(:)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.vue-vine" }
          },
          end: /(?=[\)\,])|(?==[^\>])/dgv,
          name: "meta.type.annotation.vue-vine",
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    "paren-expression": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.vue-vine" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.vue-vine" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    "paren-expression-possibly-arrow": {
      patterns: [
        {
          begin: /(?<=[\(\,\=])\p{space}*(async)?(?=\p{space}*((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*))?\(\p{space}*((([\[\{]\p{space}*)?)(?=\n?$)|((\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})\p{space}*((:\p{space}*\{?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))|((\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])\p{space}*((:\p{space}*\[?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))))/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.async.vue-vine" }
          },
          end: /(?<=\))/dgv,
          patterns: [
            { include: "#paren-expression-possibly-arrow-with-typeparameters" }
          ]
        },
        {
          begin: /(?<=[\(\,\=]|=>|^return|[^\$\._\p{Alpha}\p{Nd}]return)\p{space}*(async)?(?=\p{space}*((((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*))?\()|(<)|((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*)))\p{space}*(?=\n?$))/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.async.vue-vine" }
          },
          end: /(?<=\))/dgv,
          patterns: [
            { include: "#paren-expression-possibly-arrow-with-typeparameters" }
          ]
        },
        { include: "#possibly-arrow-return-type" }
      ]
    },
    "paren-expression-possibly-arrow-with-typeparameters": {
      patterns: [
        { include: "#type-parameters" },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "meta.brace.round.vue-vine" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.vue-vine" }
          },
          patterns: [
            { include: "#expression-inside-possibly-arrow-parens" }
          ]
        }
      ]
    },
    "possibly-arrow-return-type": {
      begin: /(?<=\)|^)\p{space}*(:)(?=\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*=>)/dgv,
      beginCaptures: {
        "1": { name: "meta.arrow.ts meta.return.type.arrow.ts keyword.operator.type.annotation.vue-vine" }
      },
      contentName: "meta.arrow.ts meta.return.type.arrow.vue-vine",
      end: /(?==>|\{|^(\p{space}*(export|function|class|interface|let|var|const|import|enum|namespace|module|type|abstract|declare)\p{space}+))/dgv,
      patterns: [
        { include: "#arrow-return-type-body" }
      ]
    },
    "property-accessor": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(accessor|get|set)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "storage.type.property.vue-vine"
    },
    "punctuation-accessor": {
      captures: {
        "1": { name: "punctuation.accessor.vue-vine" },
        "2": { name: "punctuation.accessor.optional.vue-vine" }
      },
      match: /(\.)|(\?\.(?!\p{space}*\p{Nd}))/dgv
    },
    "punctuation-comma": {
      match: /,/dgv,
      name: "punctuation.separator.comma.vue-vine"
    },
    "punctuation-semicolon": {
      match: /;/dgv,
      name: "punctuation.terminator.statement.vue-vine"
    },
    "qstring-double": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.vue-vine" }
      },
      end: /(")|([^\n\\])(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.vue-vine" },
        "2": { name: "invalid.illegal.newline.vue-vine" }
      },
      name: "string.quoted.double.vue-vine",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    "qstring-single": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.vue-vine" }
      },
      end: /(')|([^\n\\])(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.vue-vine" },
        "2": { name: "invalid.illegal.newline.vue-vine" }
      },
      name: "string.quoted.single.vue-vine",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    regex: {
      patterns: [
        {
          begin: /(?<!\+\+|--|\})(?<=[\!\(\+\,\:\=\?\[]|^return|[^\$\._\p{Alpha}\p{Nd}]return|^case|[^\$\._\p{Alpha}\p{Nd}]case|=>|&&|\|\||\*\/)\p{space}*(\/)(?![\*\/])(?=(?:[^\(\)\/\[\\]|\\[^\n]|\[([^\]\\]|\\[^\n])+\]|\(([^\)\\]|\\[^\n])+\))+\/([dgimsuy]+|(?![\*\/])|(?=\/\*))(?!\p{space}*[\$0-9A-Z_a-z]))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.vue-vine" }
          },
          end: /(\/)([dgimsuy]*)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.vue-vine" },
            "2": { name: "keyword.other.vue-vine" }
          },
          name: "string.regexp.vue-vine",
          patterns: [
            { include: "#regexp" }
          ]
        },
        {
          begin: /((?<![\]\$\)_\p{Alpha}\p{Nd}]|\+\+|--|\}|\*\/)|((?<=^return|[^\$\._\p{Alpha}\p{Nd}]return|^case|[^\$\._\p{Alpha}\p{Nd}]case))\p{space}*)\/(?![\*\/])(?=(?:[^\/\[\\]|\\[^\n]|\[([^\]\\]|\\[^\n])*\])+\/([dgimsuy]+|(?![\*\/])|(?=\/\*))(?!\p{space}*[\$0-9A-Z_a-z]))/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.vue-vine" }
          },
          end: /(\/)([dgimsuy]*)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.vue-vine" },
            "2": { name: "keyword.other.vue-vine" }
          },
          name: "string.regexp.vue-vine",
          patterns: [
            { include: "#regexp" }
          ]
        }
      ]
    },
    "regex-character-class": {
      patterns: [
        {
          match: /\\[DSWdfnrstvw]|\./dgv,
          name: "constant.other.character-class.regexp"
        },
        {
          match: /\\([0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4})/dgv,
          name: "constant.character.numeric.regexp"
        },
        {
          match: /\\c[A-Z]/dgv,
          name: "constant.character.control.regexp"
        },
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.backslash.regexp"
        }
      ]
    },
    regexp: {
      patterns: [
        {
          match: /\\[Bb]|[\$\^]/dgv,
          name: "keyword.control.anchor.regexp"
        },
        {
          captures: {
            "0": { name: "keyword.other.back-reference.regexp" },
            "1": { name: "variable.other.regexp" }
          },
          match: /\\(?:[1-9]\p{Nd}*|k<([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)>)/dgv
        },
        {
          match: /[\*\+\?]|\{(\p{Nd}+,\p{Nd}+|\p{Nd}+,|,\p{Nd}+|\p{Nd}+)\}\??/dgv,
          name: "keyword.operator.quantifier.regexp"
        },
        {
          match: /\|/dgv,
          name: "keyword.operator.or.regexp"
        },
        {
          begin: /(\()((\?=)|(\?!)|(\?<=)|(\?<!))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.group.regexp" },
            "2": { name: "punctuation.definition.group.assertion.regexp" },
            "3": { name: "meta.assertion.look-ahead.regexp" },
            "4": { name: "meta.assertion.negative-look-ahead.regexp" },
            "5": { name: "meta.assertion.look-behind.regexp" },
            "6": { name: "meta.assertion.negative-look-behind.regexp" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.assertion.regexp",
          patterns: [
            { include: "#regexp" }
          ]
        },
        {
          begin: /\((?:(\?:)|\?<([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)>)?/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.group.regexp" },
            "1": { name: "punctuation.definition.group.no-capture.regexp" },
            "2": { name: "variable.other.regexp" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.regexp",
          patterns: [
            { include: "#regexp" }
          ]
        },
        {
          begin: /(\[)(\^)?/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.character-class.regexp" },
            "2": { name: "keyword.operator.negation.regexp" }
          },
          end: /(\])/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.character-class.regexp" }
          },
          name: "constant.other.character-class.set.regexp",
          patterns: [
            {
              captures: {
                "1": { name: "constant.character.numeric.regexp" },
                "2": { name: "constant.character.control.regexp" },
                "3": { name: "constant.character.escape.backslash.regexp" },
                "4": { name: "constant.character.numeric.regexp" },
                "5": { name: "constant.character.control.regexp" },
                "6": { name: "constant.character.escape.backslash.regexp" }
              },
              match: /(?:[^\n]|(\\(?:[0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4}))|(\\c[A-Z])|(\\[^\n]))-(?:[^\]\\]|(\\(?:[0-7]{3}|x\p{AHex}{2}|u\p{AHex}{4}))|(\\c[A-Z])|(\\[^\n]))/dgv,
              name: "constant.other.character-class.range.regexp"
            },
            { include: "#regex-character-class" }
          ]
        },
        { include: "#regex-character-class" }
      ]
    },
    "return-type": {
      patterns: [
        {
          begin: /(?<=\))\p{space}*(:)(?=\p{space}*\P{space})/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.vue-vine" }
          },
          end: /(?<![\&\:\|])(?=(?=\n?$)|^|[\,\;\{\}]|\/\/)/dgv,
          name: "meta.return.type.vue-vine",
          patterns: [
            { include: "#return-type-core" }
          ]
        },
        {
          begin: /(?<=\))\p{space}*(:)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.vue-vine" }
          },
          end: /(?<![\&\:\|])((?=[\,\;\{\}]|\/\/|^\p{space}*(?=\n?$))|((?<=\P{space})(?=\p{space}*(?=\n?$))))/dgv,
          name: "meta.return.type.vue-vine",
          patterns: [
            { include: "#return-type-core" }
          ]
        }
      ]
    },
    "return-type-core": {
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<=[\&\:\|])(?=\p{space}*\{)/dgv,
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#type-object" }
          ]
        },
        { include: "#type-predicate-operator" },
        { include: "#type" }
      ]
    },
    shebang: {
      captures: {
        "1": { name: "punctuation.definition.comment.vue-vine" }
      },
      match: {
        A: [/￿(#!)[^\n]*(?=(?=\n?$))/dgv, /^(#!)[^\n]*(?=(?=\n?$))/dgv]
      },
      name: "comment.line.shebang.vue-vine"
    },
    "single-line-comment-consuming-line-ending": {
      begin: /(^[\t ]+)?((\/\/)(?:\p{space}*((@)internal)(?=\p{space}|(?=\n?$)))?)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.vue-vine" },
        "2": { name: "comment.line.double-slash.vue-vine" },
        "3": { name: "punctuation.definition.comment.vue-vine" },
        "4": { name: "storage.type.internaldeclaration.vue-vine" },
        "5": { name: "punctuation.decorator.internaldeclaration.vue-vine" }
      },
      contentName: "comment.line.double-slash.vue-vine",
      end: /(?=^)/dgv
    },
    statements: {
      patterns: [
        { include: "#declaration" },
        { include: "#control-statement" },
        { include: "#after-operator-block-as-object-literal" },
        { include: "#decl-block" },
        { include: "#label" },
        { include: "#expression" },
        { include: "#punctuation-semicolon" },
        { include: "#string" },
        { include: "#comment" }
      ]
    },
    string: {
      patterns: [
        { include: "#qstring-single" },
        { include: "#qstring-double" },
        { include: "#vine-template" },
        { include: "#vine-style-css" },
        { include: "#vine-style-scss" },
        { include: "#vine-style-sass" },
        { include: "#vine-style-less" },
        { include: "#vine-style-stylus" },
        { include: "#template" }
      ]
    },
    "string-character-escape": {
      match: /\\(x\p{AHex}{2}|u\p{AHex}{4}|u\{\p{AHex}+\}|[012][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|[^\n]|(?=\n?$))/dgv,
      name: "constant.character.escape.vue-vine"
    },
    "super-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))super\b(?!\$)/dgv,
      name: "variable.language.super.vue-vine"
    },
    "support-function-call-identifiers": {
      patterns: [
        { include: "#literal" },
        { include: "#support-objects" },
        { include: "#object-identifiers" },
        { include: "#punctuation-accessor" },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))import(?=\p{space}*\(\p{space}*["'\`])/dgv,
          name: "keyword.operator.expression.import.vue-vine"
        }
      ]
    },
    "support-objects": {
      patterns: [
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(arguments)\b(?!\$)/dgv,
          name: "variable.language.arguments.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(Promise)\b(?!\$)/dgv,
          name: "support.class.promise.vue-vine"
        },
        {
          captures: {
            "1": { name: "keyword.control.import.vue-vine" },
            "2": { name: "punctuation.accessor.vue-vine" },
            "3": { name: "punctuation.accessor.optional.vue-vine" },
            "4": { name: "support.variable.property.importmeta.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(import)\p{space}*(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(meta)\b(?!\$)/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.new.vue-vine" },
            "2": { name: "punctuation.accessor.vue-vine" },
            "3": { name: "punctuation.accessor.optional.vue-vine" },
            "4": { name: "support.variable.property.target.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(new)\p{space}*(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(target)\b(?!\$)/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.accessor.vue-vine" },
            "2": { name: "punctuation.accessor.optional.vue-vine" },
            "3": { name: "support.variable.property.vue-vine" },
            "4": { name: "support.constant.vue-vine" }
          },
          match: /(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(?:(constructor|length|prototype|__proto__)\b(?!\$|\p{space}*(<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*)?\()|(EPSILON|MAX_SAFE_INTEGER|MAX_VALUE|MIN_SAFE_INTEGER|MIN_VALUE|NEGATIVE_INFINITY|POSITIVE_INFINITY)\b(?!\$))/dgv
        },
        {
          captures: {
            "1": { name: "support.type.object.module.vue-vine" },
            "2": { name: "support.type.object.module.vue-vine" },
            "3": { name: "punctuation.accessor.vue-vine" },
            "4": { name: "punctuation.accessor.optional.vue-vine" },
            "5": { name: "support.type.object.module.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(exports)|(module)(?:(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))(exports|id|filename|loaded|parent|children))?)\b(?!\$)/dgv
        }
      ]
    },
    "switch-statement": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?=\bswitch\p{space}*\()/dgv,
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      name: "switch-statement.expr.vue-vine",
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(switch)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.switch.vue-vine" },
            "2": { name: "meta.brace.round.vue-vine" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.vue-vine" }
          },
          name: "switch-expression.expr.vue-vine",
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.vue-vine" }
          },
          end: /(?=\})/dgv,
          name: "switch-block.expr.vue-vine",
          patterns: [
            {
              begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(case|default(?=:))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
              beginCaptures: {
                "1": { name: "keyword.control.switch.vue-vine" }
              },
              end: /(?=:)/dgv,
              name: "case-clause.expr.vue-vine",
              patterns: [
                { include: "#expression" }
              ]
            },
            {
              begin: /(:)\p{space}*(\{)/dgv,
              beginCaptures: {
                "1": { name: "case-clause.expr.ts punctuation.definition.section.case-statement.vue-vine" },
                "2": { name: "meta.block.ts punctuation.definition.block.vue-vine" }
              },
              contentName: "meta.block.vue-vine",
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "meta.block.ts punctuation.definition.block.vue-vine" }
              },
              patterns: [
                { include: "#statements" }
              ]
            },
            {
              captures: {
                "0": { name: "case-clause.expr.ts punctuation.definition.section.case-statement.vue-vine" }
              },
              match: /(:)/dgv
            },
            { include: "#statements" }
          ]
        }
      ]
    },
    template: {
      patterns: [
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)?(`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.vue-vine" },
            "2": { name: "punctuation.definition.string.template.begin.vue-vine" }
          },
          contentName: "string.template.vue-vine",
          end: /`/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.template.end.vue-vine" }
          },
          patterns: [
            { include: "#template-substitution-element" },
            { include: "#string-character-escape" },
            { include: "source.css" },
            { include: "source.css.scss" },
            { include: "source.css.sass" },
            { include: "source.css.less" },
            { include: "source.stylus" }
          ]
        },
        { include: "#template-call" }
      ]
    },
    "template-call": {
      patterns: [
        {
          begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*\??\.\p{space}*)*|(\??\.\p{space}*)?)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?`)/dgv,
          end: /(?=`)/dgv,
          patterns: [
            {
              begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*\??\.\p{space}*)*|(\??\.\p{space}*)?)([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))/dgv,
              end: /(?=(<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?`)/dgv,
              patterns: [
                { include: "#support-function-call-identifiers" },
                {
                  match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
                  name: "entity.name.function.tagged-template.vue-vine"
                }
              ]
            },
            { include: "#type-arguments" }
          ]
        },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)?\p{space}*(?=(<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.vue-vine" }
          },
          end: /(?=`)/dgv,
          patterns: [
            { include: "#type-arguments" }
          ]
        }
      ]
    },
    "template-substitution-element": {
      begin: /\$\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.vue-vine" }
      },
      contentName: "meta.embedded.line.vue-vine",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.vue-vine" }
      },
      name: "meta.template.expression.vue-vine",
      patterns: [
        { include: "#expression" }
      ]
    },
    "template-type": {
      patterns: [
        { include: "#template-call" },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)?(`)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.vue-vine" },
            "2": { name: "string.template.ts punctuation.definition.string.template.begin.vue-vine" }
          },
          contentName: "string.template.vue-vine",
          end: /`/dgv,
          endCaptures: {
            "0": { name: "string.template.ts punctuation.definition.string.template.end.vue-vine" }
          },
          patterns: [
            { include: "#template-type-substitution-element" },
            { include: "#string-character-escape" }
          ]
        }
      ]
    },
    "template-type-substitution-element": {
      begin: /\$\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.vue-vine" }
      },
      contentName: "meta.embedded.line.vue-vine",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.vue-vine" }
      },
      name: "meta.template.expression.vue-vine",
      patterns: [
        { include: "#type" }
      ]
    },
    "ternary-expression": {
      begin: /(?!\?\.\p{space}*\P{Nd})(\?)(?!\?)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.ternary.vue-vine" }
      },
      end: /\p{space}*(:)/dgv,
      endCaptures: {
        "1": { name: "keyword.operator.ternary.vue-vine" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    "text-vue-html": {
      patterns: [
        { include: "source.vue#vue-interpolations" },
        {
          begin: /(<)([A-Z][\-0-\:A-Za-z]*)(?=[^\>]*><\/\2>)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "support.class.component.html" }
          },
          end: /(>)(<)(\/)(2)(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html" },
            "2": { name: "punctuation.definition.tag.begin.html meta.scope.between-tag-pair.html" },
            "3": { name: "punctuation.definition.tag.begin.html" },
            "4": { name: "support.class.component.html" },
            "5": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.tag.any.html",
          patterns: [
            { include: "#tag-stuff" }
          ]
        },
        {
          begin: /(<)([a-z][\-0-\:A-Za-z]*)(?=[^\>]*><\/\2>)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.html" }
          },
          end: /(>)(<)(\/)(2)(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html" },
            "2": { name: "punctuation.definition.tag.begin.html meta.scope.between-tag-pair.html" },
            "3": { name: "punctuation.definition.tag.begin.html" },
            "4": { name: "entity.name.tag.html" },
            "5": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.tag.any.html",
          patterns: [
            { include: "#vue-html-tag-stuff" }
          ]
        },
        {
          begin: /(<\?)(xml)/dgv,
          captures: {
            "1": { name: "punctuation.definition.tag.html" },
            "2": { name: "entity.name.tag.xml.html" }
          },
          end: /(\?>)/dgv,
          name: "meta.tag.preprocessor.xml.html",
          patterns: [
            { include: "#vue-html-tag-generic-attribute" },
            { include: "#vue-html-string-double-quoted" },
            { include: "#vue-html-string-single-quoted" }
          ]
        },
        {
          begin: /<!--/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.html" }
          },
          end: /-->/dgv,
          name: "comment.block.html"
        },
        {
          begin: /<!/dgv,
          captures: {
            "0": { name: "punctuation.definition.tag.html" }
          },
          end: />/dgv,
          name: "meta.tag.sgml.html",
          patterns: [
            {
              begin: /DOCTYPE/dgiv,
              captures: {
                "1": { name: "entity.name.tag.doctype.html" }
              },
              end: /(?=>)/dgv,
              name: "meta.tag.sgml.doctype.html",
              patterns: [
                {
                  match: /"[^"\>]*"/dgv,
                  name: "string.quoted.double.doctype.identifiers-and-DTDs.html"
                }
              ]
            },
            {
              begin: /\[CDATA\[/dgv,
              end: /\]\](?=>)/dgv,
              name: "constant.other.inline-data.html"
            },
            {
              match: /(\p{space}*)(?!--|>)\P{space}(\p{space}*)/dgv,
              name: "invalid.illegal.bad-comments-or-CDATA.html"
            }
          ]
        },
        {
          begin: /(<\/?)([A-Z][\-0-\:A-Za-z]*)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "support.class.component.html" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.tag.block.any.html",
          patterns: [
            { include: "#vue-html-tag-stuff" }
          ]
        },
        {
          begin: /(<\/?)([a-z][\-0-\:A-Za-z]*)\b/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.block.any.html" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.tag.block.any.html",
          patterns: [
            { include: "#vue-html-tag-stuff" }
          ]
        },
        {
          begin: /(<\/?)((?:body|head|html))\b/dgiv,
          captures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.structure.any.html" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.tag.structure.any.html",
          patterns: [
            { include: "#vue-html-tag-stuff" }
          ]
        },
        {
          begin: /(<\/?)((?:address|blockquote|dd|div|dl|dt|fieldset|form|frame|frameset|h1|h2|h3|h4|h5|h6|iframe|noframes|object|ol|p|ul|applet|center|dir|hr|menu|pre)(?!-))\b/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.block.any.html" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.tag.block.any.html",
          patterns: [
            { include: "#vue-html-tag-stuff" }
          ]
        },
        {
          begin: /(<\/?)((?:a|abbr|acronym|area|b|base|basefont|bdo|big|br|button|caption|cite|code|col|colgroup|del|dfn|em|font|head|html|i|img|input|ins|isindex|kbd|label|legend|li|link|map|meta|noscript|optgroup|option|param|[qs]|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|u|var)(?!-))\b/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.inline.any.html" }
          },
          end: /(\/?>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.tag.inline.any.html",
          patterns: [
            { include: "#vue-html-tag-stuff" }
          ]
        },
        {
          begin: /(<\/?)([\-0-\:A-Za-z]+)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "entity.name.tag.other.html" }
          },
          end: /(\/?>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html" }
          },
          name: "meta.tag.other.html",
          patterns: [
            { include: "#vue-html-tag-stuff" }
          ]
        },
        { include: "#entities" },
        {
          match: /<>/dgv,
          name: "invalid.illegal.incomplete.html"
        },
        {
          match: /</dgv,
          name: "invalid.illegal.bad-angle-bracket.html"
        }
      ]
    },
    "this-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))this\b(?!\$)/dgv,
      name: "variable.language.this.vue-vine"
    },
    type: {
      patterns: [
        { include: "#comment" },
        { include: "#type-string" },
        { include: "#numeric-literal" },
        { include: "#type-primitive" },
        { include: "#type-builtin-literals" },
        { include: "#type-parameters" },
        { include: "#type-tuple" },
        { include: "#type-object" },
        { include: "#type-operators" },
        { include: "#type-conditional" },
        { include: "#type-fn-type-parameters" },
        { include: "#type-paren-or-function-parameters" },
        { include: "#type-function-return-type" },
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(readonly)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))\p{space}*/dgv
        },
        { include: "#type-name" }
      ]
    },
    "type-alias-declaration": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(type)\b\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.export.vue-vine" },
        "2": { name: "storage.modifier.vue-vine" },
        "3": { name: "storage.type.type.vue-vine" },
        "4": { name: "entity.name.type.alias.vue-vine" }
      },
      end: /(?=[\;\}]|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
      name: "meta.type.declaration.vue-vine",
      patterns: [
        { include: "#comment" },
        { include: "#type-parameters" },
        {
          begin: /(=)\p{space}*(intrinsic)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.vue-vine" },
            "2": { name: "keyword.control.intrinsic.vue-vine" }
          },
          end: /(?=[\;\}]|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
          patterns: [
            { include: "#type" }
          ]
        },
        {
          begin: /(=)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.vue-vine" }
          },
          end: /(?=[\;\}]|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    "type-annotation": {
      patterns: [
        {
          begin: /(:)(?=\p{space}*\P{space})/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.vue-vine" }
          },
          end: /(?<![\&\:\|])(?!\p{space}*[\&\|]\p{space}+)((?=^|[\]\)\,\;\}]|\/\/)|(?==[^\>])|((?<=[\]\$\)\>_\}\p{Alpha}])\p{space}*(?=\{)))/dgv,
          name: "meta.type.annotation.vue-vine",
          patterns: [
            { include: "#type" }
          ]
        },
        {
          begin: /(:)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.vue-vine" }
          },
          end: /(?<![\&\:\|])((?=[\]\)\,\;\}]|\/\/)|(?==[^\>])|(?=^\p{space}*(?=\n?$))|((?<=[\]\$\)\>_\}\p{Alpha}])\p{space}*(?=\{)))/dgv,
          name: "meta.type.annotation.vue-vine",
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    "type-arguments": {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.typeparameters.begin.vue-vine" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.typeparameters.end.vue-vine" }
      },
      name: "meta.type.parameters.vue-vine",
      patterns: [
        { include: "#type-arguments-body" }
      ]
    },
    "type-arguments-body": {
      patterns: [
        {
          captures: {
            "0": { name: "keyword.operator.type.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(_)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv
        },
        { include: "#type" },
        { include: "#punctuation-comma" }
      ]
    },
    "type-builtin-literals": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(this|true|false|undefined|null|object)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "support.type.builtin.vue-vine"
    },
    "type-conditional": {
      patterns: [
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(extends)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.vue-vine" }
          },
          end: /(?<=:)/dgv,
          patterns: [
            {
              begin: /\?/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.ternary.vue-vine" }
              },
              end: /:/dgv,
              endCaptures: {
                "0": { name: "keyword.operator.ternary.vue-vine" }
              },
              patterns: [
                { include: "#type" }
              ]
            },
            { include: "#type" }
          ]
        }
      ]
    },
    "type-fn-type-parameters": {
      patterns: [
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(abstract)\p{space}+)?(new)\b(?=\p{space}*<)/dgv,
          beginCaptures: {
            "1": { name: "meta.type.constructor.ts storage.modifier.vue-vine" },
            "2": { name: "meta.type.constructor.ts keyword.control.new.vue-vine" }
          },
          end: /(?<=>)/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#type-parameters" }
          ]
        },
        {
          begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(abstract)\p{space}+)?(new)\b\p{space}*(?=\()/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "keyword.control.new.vue-vine" }
          },
          end: /(?<=\))/dgv,
          name: "meta.type.constructor.vue-vine",
          patterns: [
            { include: "#function-parameters" }
          ]
        },
        {
          begin: /((?=\(\p{space}*((\))|(\.\.\.)|([\$_\p{Alpha}\p{Nd}]+\p{space}*(([\,\:\=\?])|(\)\p{space}*=>))))))/dgv,
          end: /(?<=\))/dgv,
          name: "meta.type.function.vue-vine",
          patterns: [
            { include: "#function-parameters" }
          ]
        }
      ]
    },
    "type-function-return-type": {
      patterns: [
        {
          begin: /(=>)(?=\p{space}*\P{space})/dgv,
          beginCaptures: {
            "1": { name: "storage.type.function.arrow.vue-vine" }
          },
          end: /(?<!=>)(?<![\&\|])(?=[\]\)\,\:\;\=\>\?\{\}]|\/\/|(?=\n?$))/dgv,
          name: "meta.type.function.return.vue-vine",
          patterns: [
            { include: "#type-function-return-type-core" }
          ]
        },
        {
          begin: /=>/dgv,
          beginCaptures: {
            "0": { name: "storage.type.function.arrow.vue-vine" }
          },
          end: /(?<!=>)(?<![\&\|])((?=[\]\)\,\:\;\=\>\?\{\}]|\/\/|^\p{space}*(?=\n?$))|((?<=\P{space})(?=\p{space}*(?=\n?$))))/dgv,
          name: "meta.type.function.return.vue-vine",
          patterns: [
            { include: "#type-function-return-type-core" }
          ]
        }
      ]
    },
    "type-function-return-type-core": {
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<==>)(?=\p{space}*\{)/dgv,
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#type-object" }
          ]
        },
        { include: "#type-predicate-operator" },
        { include: "#type" }
      ]
    },
    "type-infer": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.expression.infer.vue-vine" },
            "2": { name: "entity.name.type.vue-vine" },
            "3": { name: "keyword.operator.expression.extends.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(infer)\p{space}+([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))(?:\p{space}+(extends)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))?/dgv,
          name: "meta.type.infer.vue-vine"
        }
      ]
    },
    "type-name": {
      patterns: [
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))\p{space}*(<)/dgv,
          captures: {
            "1": { name: "entity.name.type.module.vue-vine" },
            "2": { name: "punctuation.accessor.vue-vine" },
            "3": { name: "punctuation.accessor.optional.vue-vine" },
            "4": { name: "meta.type.parameters.ts punctuation.definition.typeparameters.begin.vue-vine" }
          },
          contentName: "meta.type.parameters.vue-vine",
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "meta.type.parameters.ts punctuation.definition.typeparameters.end.vue-vine" }
          },
          patterns: [
            { include: "#type-arguments-body" }
          ]
        },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(<)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.type.vue-vine" },
            "2": { name: "meta.type.parameters.ts punctuation.definition.typeparameters.begin.vue-vine" }
          },
          contentName: "meta.type.parameters.vue-vine",
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "meta.type.parameters.ts punctuation.definition.typeparameters.end.vue-vine" }
          },
          patterns: [
            { include: "#type-arguments-body" }
          ]
        },
        {
          captures: {
            "1": { name: "entity.name.type.module.vue-vine" },
            "2": { name: "punctuation.accessor.vue-vine" },
            "3": { name: "punctuation.accessor.optional.vue-vine" }
          },
          match: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(?:(\.)|(\?\.(?!\p{space}*\p{Nd})))/dgv
        },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          name: "entity.name.type.vue-vine"
        }
      ]
    },
    "type-object": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.block.vue-vine" }
      },
      name: "meta.object.type.vue-vine",
      patterns: [
        { include: "#comment" },
        { include: "#method-declaration" },
        { include: "#indexer-declaration" },
        { include: "#indexer-mapped-type-declaration" },
        { include: "#field-declaration" },
        { include: "#type-annotation" },
        {
          begin: /\.\.\./dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.spread.vue-vine" }
          },
          end: /(?=[\,\;\}]|(?=\n?$))|(?<=\})/dgv,
          patterns: [
            { include: "#type" }
          ]
        },
        { include: "#punctuation-comma" },
        { include: "#punctuation-semicolon" },
        { include: "#type" }
      ]
    },
    "type-operators": {
      patterns: [
        { include: "#typeof-operator" },
        { include: "#type-infer" },
        {
          begin: /([\&\|])(?=\p{space}*\{)/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.type.vue-vine" }
          },
          end: /(?<=\})/dgv,
          patterns: [
            { include: "#type-object" }
          ]
        },
        {
          begin: /[\&\|]/dgv,
          beginCaptures: {
            "0": { name: "keyword.operator.type.vue-vine" }
          },
          end: /(?=\P{space})/dgv
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))keyof(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.operator.expression.keyof.vue-vine"
        },
        {
          match: /([\:\?])/dgv,
          name: "keyword.operator.ternary.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))import(?=\p{space}*\()/dgv,
          name: "keyword.operator.expression.import.vue-vine"
        }
      ]
    },
    "type-parameters": {
      begin: /(<)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.typeparameters.begin.vue-vine" }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.typeparameters.end.vue-vine" }
      },
      name: "meta.type.parameters.vue-vine",
      patterns: [
        { include: "#comment" },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(extends|in|out|const)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "storage.modifier.vue-vine"
        },
        { include: "#type" },
        { include: "#punctuation-comma" },
        {
          match: /(=)(?!>)/dgv,
          name: "keyword.operator.assignment.vue-vine"
        }
      ]
    },
    "type-paren-or-function-parameters": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.vue-vine" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.vue-vine" }
      },
      name: "meta.type.paren.cover.vue-vine",
      patterns: [
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "keyword.operator.rest.vue-vine" },
            "3": { name: "entity.name.function.ts variable.language.this.vue-vine" },
            "4": { name: "entity.name.function.vue-vine" },
            "5": { name: "keyword.operator.optional.vue-vine" }
          },
          match: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(public|private|protected|readonly)\p{space}+)?(?:(\.\.\.)\p{space}*)?(?<![\:\=])(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(this)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))\p{space}*(\??)(?=\p{space}*(:\p{space}*((<)|(\(\p{space}*((\))|(\.\.\.)|([\$_\p{Alpha}\p{Nd}]+\p{space}*(([\,\:\=\?])|(\)\p{space}*=>)))))))|(:\p{space}*(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))Function(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))|(:\p{space}*((<\p{space}*)(?=\n?$)|((<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<]|<\p{space}*(((const\p{space}+)?[\$_\p{Alpha}])|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\]))([^\<\=\>]|=[^\<])*>)*>)*>\p{space}*)?\(\p{space}*((([\[\{]\p{space}*)?)(?=\n?$)|((\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})\p{space}*((:\p{space}*\{?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*)))|((\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])\p{space}*((:\p{space}*\[?)(?=\n?$)|((\p{space}*([^\(\)\<\>\{\}]|<([^\<\>]|<([^\<\>]|<[^\<\>]+>)+>)+>|\([^\(\)]+\)|\{[^\{\}]+\})+\p{space}*)?=\p{space}*))))))))/dgv
        },
        {
          captures: {
            "1": { name: "storage.modifier.vue-vine" },
            "2": { name: "keyword.operator.rest.vue-vine" },
            "3": { name: "variable.parameter.ts variable.language.this.vue-vine" },
            "4": { name: "variable.parameter.vue-vine" },
            "5": { name: "keyword.operator.optional.vue-vine" }
          },
          match: /(?:(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(public|private|protected|readonly)\p{space}+)?(?:(\.\.\.)\p{space}*)?(?<![\:\=])(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(this)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))\p{space}*(\??)(?=:)/dgv
        },
        { include: "#type-annotation" },
        {
          match: /,/dgv,
          name: "punctuation.separator.parameter.vue-vine"
        },
        { include: "#type" }
      ]
    },
    "type-predicate-operator": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.type.asserts.vue-vine" },
            "2": { name: "variable.parameter.ts variable.language.this.vue-vine" },
            "3": { name: "variable.parameter.vue-vine" },
            "4": { name: "keyword.operator.expression.is.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:(asserts)\p{space}+)?(?!asserts)(?:(this)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))\p{space}(is)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.type.asserts.vue-vine" },
            "2": { name: "variable.parameter.ts variable.language.this.vue-vine" },
            "3": { name: "variable.parameter.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(asserts)\p{space}+(?!is)(?:(this)|([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))asserts(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.operator.type.asserts.vue-vine"
        },
        {
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))is(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
          name: "keyword.operator.expression.is.vue-vine"
        }
      ]
    },
    "type-primitive": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(string|number|bigint|boolean|symbol|any|void|never|unknown)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "support.type.primitive.vue-vine"
    },
    "type-string": {
      patterns: [
        { include: "#qstring-single" },
        { include: "#qstring-double" },
        { include: "#template-type" }
      ]
    },
    "type-tuple": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.square.vue-vine" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.vue-vine" }
      },
      name: "meta.type.tuple.vue-vine",
      patterns: [
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.rest.vue-vine"
        },
        {
          captures: {
            "1": { name: "entity.name.label.vue-vine" },
            "2": { name: "keyword.operator.optional.vue-vine" },
            "3": { name: "punctuation.separator.label.vue-vine" }
          },
          match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)\p{space}*(\?)?\p{space}*(:)/dgv
        },
        { include: "#type" },
        { include: "#punctuation-comma" }
      ]
    },
    "typeof-operator": {
      begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))typeof(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.expression.typeof.vue-vine" }
      },
      end: /(?=[\]\&\)\,\:\;\=\>\?\{\|\}]|(extends\p{space}+)|(?=\n?$)|;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)/dgv,
      patterns: [
        { include: "#type-arguments" },
        { include: "#expression" }
      ]
    },
    "undefined-literal": {
      match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))undefined(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
      name: "constant.language.undefined.vue-vine"
    },
    "var-expr": {
      patterns: [
        {
          begin: /(?=(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(var|let)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))/dgv,
          end: /(?!(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(var|let)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))((?=^|[\;\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)|((?<!^let|[^\$\._\p{Alpha}\p{Nd}]let|^var|[^\$\._\p{Alpha}\p{Nd}]var)(?=\p{space}*(?=\n?$))))/dgv,
          name: "meta.var.expr.vue-vine",
          patterns: [
            {
              begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(var|let)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))\p{space}*/dgv,
              beginCaptures: {
                "1": { name: "keyword.control.export.vue-vine" },
                "2": { name: "storage.modifier.vue-vine" },
                "3": { name: "storage.type.vue-vine" }
              },
              end: /(?=\P{space})/dgv
            },
            { include: "#destructuring-variable" },
            { include: "#var-single-variable" },
            { include: "#variable-initializer" },
            { include: "#comment" },
            {
              begin: /(,)\p{space}*(?=(?=\n?$)|\/\/)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.separator.comma.vue-vine" }
              },
              end: /(?<!,)(((?=[\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|^\p{space}*(?=\n?$)))|((?<=\P{space})(?=\p{space}*(?=\n?$))))/dgv,
              patterns: [
                { include: "#single-line-comment-consuming-line-ending" },
                { include: "#comment" },
                { include: "#destructuring-variable" },
                { include: "#var-single-variable" },
                { include: "#punctuation-comma" }
              ]
            },
            { include: "#punctuation-comma" }
          ]
        },
        {
          begin: /(?=(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(const(?!\p{space}+enum\b))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.export.vue-vine" },
            "2": { name: "storage.modifier.vue-vine" },
            "3": { name: "storage.type.vue-vine" }
          },
          end: /(?!(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(const(?!\p{space}+enum\b))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.)))((?=^|[\;\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b)|((?<!(?:^|[^\$\._\p{Alpha}\p{Nd}])const)(?=\p{space}*(?=\n?$))))/dgv,
          name: "meta.var.expr.vue-vine",
          patterns: [
            {
              begin: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(?:\b(export)\p{space}+)?(?:\b(declare)\p{space}+)?\b(const(?!\p{space}+enum\b))(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))\p{space}*/dgv,
              beginCaptures: {
                "1": { name: "keyword.control.export.vue-vine" },
                "2": { name: "storage.modifier.vue-vine" },
                "3": { name: "storage.type.vue-vine" }
              },
              end: /(?=\P{space})/dgv
            },
            { include: "#destructuring-const" },
            { include: "#var-single-const" },
            { include: "#variable-initializer" },
            { include: "#comment" },
            {
              begin: /(,)\p{space}*(?=(?=\n?$)|\/\/)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.separator.comma.vue-vine" }
              },
              end: /(?<!,)(((?=[\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|^\p{space}*(?=\n?$)))|((?<=\P{space})(?=\p{space}*(?=\n?$))))/dgv,
              patterns: [
                { include: "#single-line-comment-consuming-line-ending" },
                { include: "#comment" },
                { include: "#destructuring-const" },
                { include: "#var-single-const" },
                { include: "#punctuation-comma" }
              ]
            },
            { include: "#punctuation-comma" }
          ]
        }
      ]
    },
    "var-single-const": {
      patterns: [
        {
          begin: new EmulatedRegExp("([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*)(?=\\p{space}*(=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))|(:\\p{space}*((<)|(\\(\\p{space}*((\\))|(\\.\\.\\.)|([\\$_\\p{Alpha}\\p{Nd}]+\\p{space}*(([\\,\\:\\=\\?])|(\\)\\p{space}*=>)))))))|(:\\p{space}*(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![\\$_\\p{Alpha}\\p{Nd}])(?:(?=\\.\\.\\.)|(?!\\.)))|(:\\p{space}*((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))))))|(:\\p{space}*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^\\<\\>]*>)|[^\\(\\)\\,\\<\\=\\>])+=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>))))))", "dgv", { lazyCompile: true }),
          beginCaptures: {
            "1": { name: "meta.definition.variable.ts variable.other.constant.ts entity.name.function.vue-vine" }
          },
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|(;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b))/dgv,
          name: "meta.var-single-variable.expr.vue-vine",
          patterns: [
            { include: "#var-single-variable-type-annotation" }
          ]
        },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)/dgv,
          beginCaptures: {
            "1": { name: "meta.definition.variable.ts variable.other.constant.vue-vine" }
          },
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|(;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b))/dgv,
          name: "meta.var-single-variable.expr.vue-vine",
          patterns: [
            { include: "#var-single-variable-type-annotation" }
          ]
        }
      ]
    },
    "var-single-variable": {
      patterns: [
        {
          begin: new EmulatedRegExp("([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*)(!)?(?=\\p{space}*(=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>)))))|(:\\p{space}*((<)|(\\(\\p{space}*((\\))|(\\.\\.\\.)|([\\$_\\p{Alpha}\\p{Nd}]+\\p{space}*(([\\,\\:\\=\\?])|(\\)\\p{space}*=>)))))))|(:\\p{space}*(?<![\\$_\\p{Alpha}\\p{Nd}])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![\\$_\\p{Alpha}\\p{Nd}])(?:(?=\\.\\.\\.)|(?!\\.)))|(:\\p{space}*((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))))))|(:\\p{space}*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^\\<\\>]*>)|[^\\(\\)\\,\\<\\=\\>])+=\\p{space}*(((async\\p{space}+)?((function\\p{space}*[\\(\\*\\<])|(function\\p{space}+)|([\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*=>)))|((async\\p{space}*)?(((<\\p{space}*)(?=\\n?$)|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*((([\\[\\{]\\p{space}*)?)(?=\\n?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\p{space}*((:\\p{space}*\\{?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*)))|((\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])\\p{space}*((:\\p{space}*\\[?)(?=\\n?$)|((\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\p{space}*)?=\\p{space}*))))))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*((\\)\\p{space}*:)|((\\.\\.\\.\\p{space}*)?[\\$_\\p{Alpha}][\\$_\\p{Alpha}\\p{Nd}]*\\p{space}*:)))|((<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<]|<\\p{space}*(((const\\p{space}+)?[\\$_\\p{Alpha}])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\]))([^\\<\\=\\>]|=[^\\<])*>)*>)*>\\p{space}*)?\\(\\p{space}*(/\\*([^\\*]|(\\*[^\\/]))*\\*/\\p{space}*)*(([\\$_\\p{Alpha}]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\]\\[]|(\\[([^\\]\\[]|\\[[^\\]\\[]*\\])*\\]))*\\])|(\\.\\.\\.\\p{space}*[\\$_\\p{Alpha}]))([^\"'\\(\\)\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|('([^'\\\\]|\\\\[^\\n])*')|(\"([^\"\\\\]|\\\\[^\\n])*\")|(`([^\\\\\\`]|\\\\[^\\n])*`))*)?\\)(\\p{space}*:\\p{space}*([^\\(\\)\\<\\>\\{\\}]|<([^\\<\\>]|<([^\\<\\>]|<[^\\<\\>]+>)+>)+>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?\\p{space}*=>))))))", "dgv", { lazyCompile: true }),
          beginCaptures: {
            "1": { name: "meta.definition.variable.ts entity.name.function.vue-vine" },
            "2": { name: "keyword.operator.definiteassignment.vue-vine" }
          },
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|(;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b))/dgv,
          name: "meta.var-single-variable.expr.vue-vine",
          patterns: [
            { include: "#var-single-variable-type-annotation" }
          ]
        },
        {
          begin: /(\p{Upper}[\$_\p{Nd}\p{Upper}]*)(?![\$_\p{Alpha}\p{Nd}])(!)?/dgv,
          beginCaptures: {
            "1": { name: "meta.definition.variable.ts variable.other.constant.vue-vine" },
            "2": { name: "keyword.operator.definiteassignment.vue-vine" }
          },
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|(;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b))/dgv,
          name: "meta.var-single-variable.expr.vue-vine",
          patterns: [
            { include: "#var-single-variable-type-annotation" }
          ]
        },
        {
          begin: /([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(!)?/dgv,
          beginCaptures: {
            "1": { name: "meta.definition.variable.ts variable.other.readwrite.vue-vine" },
            "2": { name: "keyword.operator.definiteassignment.vue-vine" }
          },
          end: /(?=(?=\n?$)|^|[\,\;\=\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+)|(;|^\p{space}*(?=\n?$)|^\p{space}*(?:abstract|async|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|var|while)\b))/dgv,
          name: "meta.var-single-variable.expr.vue-vine",
          patterns: [
            { include: "#var-single-variable-type-annotation" }
          ]
        }
      ]
    },
    "var-single-variable-type-annotation": {
      patterns: [
        { include: "#type-annotation" },
        { include: "#string" },
        { include: "#comment" }
      ]
    },
    "variable-initializer": {
      patterns: [
        {
          begin: /(?<![\!\=])(=)(?!=)(?=\p{space}*\P{space})(?!\p{space}*[^\n]*=>\p{space}*(?=\n?$))/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.vue-vine" }
          },
          end: /(?=(?=\n?$)|^|[\]\)\,\;\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+))/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /(?<![\!\=])(=)(?!=)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.vue-vine" }
          },
          end: /(?=[\]\)\,\;\}]|((?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(of|in)\p{space}+))|(?=^\p{space}*(?=\n?$))|(?<![\-\&\*\+\/\|])(?<=\P{space})(?<!=)(?=\p{space}*(?=\n?$))/dgv,
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    "vine-style-css": {
      begin: /(css)(`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.vine-style-css.vue-vine" },
        "2": { name: "punctuation.definition.string.vine-style-css.begin.vue-vine" }
      },
      contentName: "variable.vine-style-css.vue-vine",
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.vine-style-css.end.vue-vine" }
      },
      patterns: [
        { include: "source.css" }
      ]
    },
    "vine-style-less": {
      begin: /(less)(`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.vine-style-less.vue-vine" },
        "2": { name: "punctuation.definition.string.vine-style-less.begin.vue-vine" }
      },
      contentName: "variable.vine-style-less.vue-vine",
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.vine-style-less.end.vue-vine" }
      },
      patterns: [
        { include: "source.css.less" }
      ]
    },
    "vine-style-postcss": {
      begin: /(postcss)(`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.vine-style-postcss.vue-vine" },
        "2": { name: "punctuation.definition.string.vine-style-postcss.begin.vue-vine" }
      },
      contentName: "variable.vine-style-postcss.vue-vine",
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.vine-style-postcss.end.vue-vine" }
      },
      patterns: [
        { include: "source.css.postcss" }
      ]
    },
    "vine-style-sass": {
      begin: /(sass)(`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.vine-style-sass.vue-vine" },
        "2": { name: "punctuation.definition.string.vine-style-sass.begin.vue-vine" }
      },
      contentName: "variable.vine-style-sass.vue-vine",
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.vine-style-sass.end.vue-vine" }
      },
      patterns: [
        { include: "source.css.sass" }
      ]
    },
    "vine-style-scss": {
      begin: /(scss)(`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.vine-style-scss.vue-vine" },
        "2": { name: "punctuation.definition.string.vine-style-scss.begin.vue-vine" }
      },
      contentName: "variable.vine-style-scss.vue-vine",
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.vine-style-scss.end.vue-vine" }
      },
      patterns: [
        { include: "source.css.scss" }
      ]
    },
    "vine-style-stylus": {
      begin: /(stylus)(`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.vine-style-stylus.vue-vine" },
        "2": { name: "punctuation.definition.string.vine-style-stylus.begin.vue-vine" }
      },
      contentName: "variable.vine-style-stylus.vue-vine",
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.vine-style-stylus.end.vue-vine" }
      },
      patterns: [
        { include: "source.stylus" }
      ]
    },
    "vine-template": {
      begin: /(vine)(`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.vine-template.vue-vine" },
        "2": { name: "punctuation.definition.string.vine-template.begin.vue-vine" }
      },
      contentName: "variable.vine-template.vue-vine",
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.vine-template.end.vue-vine" }
      },
      patterns: [
        { include: "#text-vue-html" }
      ]
    },
    "vue-html-entities": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.entity.html" },
            "3": { name: "punctuation.definition.entity.html" }
          },
          match: /(&)([0-9A-Za-z]+|#[0-9]+|#x\p{AHex}+)(;)/dgv,
          name: "constant.character.entity.html"
        },
        {
          match: /&/dgv,
          name: "invalid.illegal.bad-ampersand.html"
        }
      ]
    },
    "vue-html-string-double-quoted": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.html" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.html" }
      },
      name: "string.quoted.double.html",
      patterns: [
        { include: "source.vue#vue-interpolations" },
        { include: "#vue-html-entities" }
      ]
    },
    "vue-html-string-single-quoted": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.html" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.html" }
      },
      name: "string.quoted.single.html",
      patterns: [
        { include: "source.vue#vue-interpolations" },
        { include: "#vue-html-entities" }
      ]
    },
    "vue-html-tag-generic-attribute": {
      match: /(?<=[^\=])\b([\-0-\:A-Z_a-z]+)/dgv,
      name: "entity.other.attribute-name.html"
    },
    "vue-html-tag-id-attribute": {
      begin: /\b(id)\b\p{space}*(=)/dgv,
      captures: {
        "1": { name: "entity.other.attribute-name.id.html" },
        "2": { name: "punctuation.separator.key-value.html" }
      },
      end: {
        G: [/(?!￿)(?<=["'[^\/\<\>\p{space}]])/dgv, new EmulatedRegExp("(?!^)(?<=[\"'[^\\/\\<\\>\\p{space}]])", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.attribute-with-value.id.html",
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.html" }
          },
          contentName: "meta.toc-list.id.html",
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.html" }
          },
          name: "string.quoted.double.html",
          patterns: [
            { include: "source.vue#vue-interpolations" },
            { include: "#vue-html-entities" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.html" }
          },
          contentName: "meta.toc-list.id.html",
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.html" }
          },
          name: "string.quoted.single.html",
          patterns: [
            { include: "source.vue#vue-interpolations" },
            { include: "#vue-html-entities" }
          ]
        },
        {
          captures: {
            "0": { name: "meta.toc-list.id.html" }
          },
          match: /(?<==)(?:[^"'\/\<\>\p{space}]|\/(?!>))+/dgv,
          name: "string.unquoted.html"
        }
      ]
    },
    "vue-html-tag-stuff": {
      patterns: [
        { include: "#vue-html-vue-directives" },
        { include: "#vue-html-tag-id-attribute" },
        { include: "#vue-html-tag-generic-attribute" },
        { include: "#vue-html-string-double-quoted" },
        { include: "#vue-html-string-single-quoted" },
        { include: "#vue-html-unquoted-attribute" }
      ]
    },
    "vue-html-unquoted-attribute": {
      match: /(?<==)(?:[^"'\/\<\>\p{space}]|\/(?!>))+/dgv,
      name: "string.unquoted.html"
    },
    "vue-html-vue-directives": {
      begin: /(?:\b(v-)|([\#\:\@]))([\-0-9A-Z_a-z]+)(?::([\-A-Z_a-z]+))?(?:\.([\-A-Z_a-z]+))*\p{space}*(=)/dgv,
      captures: {
        "1": { name: "entity.other.attribute-name.html" },
        "2": { name: "punctuation.separator.key-value.html" },
        "3": { name: "entity.other.attribute-name.html" },
        "4": { name: "entity.other.attribute-name.html" },
        "5": { name: "entity.other.attribute-name.html" },
        "6": { name: "punctuation.separator.key-value.html" }
      },
      end: /(?<=["'])|(?=[\<\>\`\p{space}])/dgv,
      name: "meta.directive.vue",
      patterns: [
        {
          begin: /`/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.html" }
          },
          end: /`/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.html" }
          },
          name: "source.directive.vue",
          patterns: [
            { include: "source.js#expression" }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.html" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.html" }
          },
          name: "source.directive.vue",
          patterns: [
            { include: "source.js#expression" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.html" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.html" }
          },
          name: "source.directive.vue",
          patterns: [
            { include: "source.js#expression" }
          ]
        }
      ]
    }
  },
  dependencies: [
    "css",
    "scss",
    "less",
    "stylus",
    "postcss",
    "javascript"
  ]
};
