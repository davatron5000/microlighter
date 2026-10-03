export default {
  name: "es-tag-sql",
  scopeName: "inline.tagged-template-sql",
  patterns: [
    {
      __COMMENT__: "Literals tagged with an sql function (including optional accessors and types), e.g. sql<User>('user-by-id')`SELECT ...`",
      begin: /(?:([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*)(?:\p{space}*(\??\.)\p{space}*(#?[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*))*\p{space}*(\??\.))?\p{space}*(#?[Ssſ][Qq][Ll]|[Ssſ][Qq][Ll][Ff][Rr][Aa][Gg][Mm][Ee][Nn][Tt])\p{space}*(?=(?:(\?\.\p{space}*)|(!))?((<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?\())/dgv,
      beginCaptures: {
        "1": { name: "meta.function-call.ts variable.other.object.ts" },
        "2": { name: "meta.function-call.ts punctuation.accessor.optional.ts" },
        "3": { name: "meta.function-call.ts variable.other.object.ts" },
        "4": { name: "meta.function-call.ts punctuation.accessor.optional.ts" },
        "5": { name: "meta.function-call.ts entity.name.function.ts" }
      },
      end: /(?<=(`|\)\p{space}*[^\`\p{space}]))/dgv,
      patterns: [
        { include: "source.ts#comment" },
        { include: "source.ts#function-call-optionals" },
        { include: "source.ts#type-arguments" },
        { include: "source.ts#paren-expression" },
        { include: "#embedded-sql" }
      ]
    },
    {
      __COMMENT__: "Literals tagged with an sql comment, e.g. /*sql*/`SELECT ...`",
      begin: /(\/\*\p{space}*sql\p{space}*\*\/)\p{space}*(?=`)/dgiv,
      beginCaptures: {
        "1": { name: "comment.block.ts" }
      },
      end: /(?<=`)/dgv,
      patterns: [
        { include: "#embedded-sql" }
      ]
    },
    {
      __COMMENT__: "Literals tagged with sql (including optional accessors and types), e.g. my.object?.sql<User>`SELECT ...`. This is based on the 1st #template-call pattern in TypeScript.tmLanguage.json",
      begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*\??\.\p{space}*)*|(\??\.\p{space}*)?)(#?[Ssſ][Qq][Ll]|[Ssſ][Qq][Ll][Ff][Rr][Aa][Gg][Mm][Ee][Nn][Tt])(<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?`)/dgv,
      end: /(?<=`)/dgv,
      name: "string.template.ts",
      patterns: [
        {
          begin: /(?=(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*\p{space}*\??\.\p{space}*)*|(\??\.\p{space}*)?)(#?sql|sqlFragment))/dgiv,
          end: /(?=(<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)?`)/dgv,
          patterns: [
            { include: "source.ts#support-function-call-identifiers" },
            {
              match: /(#?sql|sqlFragment)/dgiv,
              name: "entity.name.function.tagged-template.ts"
            }
          ]
        },
        { include: "source.ts#type-arguments" },
        { include: "#embedded-sql" }
      ]
    },
    {
      __COMMENT__: "Literals tagged with sql (including optional types), e.g. sql<User>`SELECT ...`. This is based on the 2nd #template-call pattern in TypeScript.tmLanguage.json",
      begin: /\b([Ssſ][Qq][Ll]|[Ssſ][Qq][Ll][Ff][Rr][Aa][Gg][Mm][Ee][Nn][Tt])\p{space}*(?=(<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))(([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>|<\p{space}*(((keyof|infer|awaited|typeof|readonly)\p{space}+)|(([\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*|(\{([^\{\}]|(\{([^\{\}]|\{[^\{\}]*\})*\}))*\})|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(\[([^\]\[]|(\[([^\]\[]|\[[^\]\[]*\])*\]))*\])|('([^'\\]|\\[^\n])*')|("([^"\\]|\\[^\n])*")|(`([^\\\`]|\\[^\n])*`))(?=\p{space}*([\,\.\<\>\[]|=>|&(?!&)|\|(?!\|)))))([^\(\<\>]|(\(([^\(\)]|(\(([^\(\)]|\([^\(\)]*\))*\)))*\))|(?<==)>)*(?<!=)>))*(?<!=)>)*(?<!=)>\p{space}*)`)/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.tagged-template.ts" }
      },
      end: /(?<=`)/dgv,
      name: "string.template.ts",
      patterns: [
        { include: "source.ts#type-arguments" },
        { include: "#embedded-sql" }
      ]
    },
    {
      __COMMENT__: "Literals tagged with sql, e.g. sql`SELECT ...`. This is based on the 2nd #template pattern in TypeScript.tmLanguage.json",
      begin: /\b(sql|sqlFragment)\p{space}*(?=`)/dgiv,
      beginCaptures: {
        "1": { name: "entity.name.function.tagged-template.ts" }
      },
      end: /(?<=`)/dgv,
      name: "string.template.ts",
      patterns: [
        { include: "#embedded-sql" }
      ]
    }
  ],
  repository: {
    "embedded-sql": {
      begin: /`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.template.begin.js" }
      },
      contentName: "meta.embedded.block.sql",
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.template.end.js" }
      },
      name: "string.template.ts",
      patterns: [
        { include: "source.ts#template-substitution-element" },
        { include: "source.ts#string-character-escape" },
        { include: "source.sql" },
        { include: "source.plpgsql.postgres" },
        {
          match: /[^\n]/dgv
        }
      ]
    }
  },
  injectionSelector: "L:source -comment -string",
  injectTo: [
    "source.ts",
    "source.js"
  ],
  dependencies: [
    "typescript",
    "sql"
  ]
};
