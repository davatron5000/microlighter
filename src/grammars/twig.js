// Reference: Twig templates documentation — https://twig.symfony.com/doc/3.x/templates.html
export default {
  scopeName: "text.html.twig",
  dependencies: ["html"],
  patterns: [
    { include: "#twig" },
    { include: "text.html.basic#comments" },
    { include: "text.html.basic#doctype" },
    { include: "#embedded-css" },
    { include: "text.html.basic#embedded-json" },
    { include: "#embedded-javascript" },
    { include: "#raw-text" },
    { include: "#tags" },
    { include: "text.html.basic" }
  ],
  repository: {
    twig: {
      patterns: [
        { include: "#comments" },
        { include: "#verbatim" },
        { include: "#statement" },
        { include: "#output" }
      ]
    },
    comments: { begin: "\\{#", end: "#\\}", name: "comment.block" },
    verbatim: {
      begin: "(\\{%[-~]?)\\s*(verbatim|raw)\\s*([-~]?%\\})",
      end: "(\\{%[-~]?)\\s*(endverbatim|endraw)\\s*([-~]?%\\})",
      captures: {
        1: { name: "punctuation.section.embedded.begin" },
        2: { name: "keyword.control" },
        3: { name: "punctuation.section.embedded.end" }
      }
    },
    statement: {
      begin: "(\\{%[-~]?)\\s*([a-zA-Z_]\\w*)?",
      end: "[-~]?%\\}",
      beginCaptures: {
        1: { name: "punctuation.section.embedded.begin" },
        2: { name: "keyword.control" }
      },
      endCaptures: { 0: { name: "punctuation.section.embedded.end" } },
      patterns: [
        { match: "\\b(?:as|with|only|ignore\\s+missing|from|import|if|else)\\b", name: "keyword.control" },
        { include: "#expression" }
      ]
    },
    output: {
      begin: "\\{\\{[-~]?",
      end: "[-~]?\\}\\}",
      beginCaptures: { 0: { name: "punctuation.section.embedded.begin" } },
      endCaptures: { 0: { name: "punctuation.section.embedded.end" } },
      patterns: [{ include: "#expression" }]
    },
    expression: {
      patterns: [
        { include: "#strings" },
        { match: "\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b", name: "constant.numeric" },
        { match: "\\b(?:true|false|TRUE|FALSE)\\b", name: "constant.language.boolean" },
        { match: "\\b(?:null|none|NULL|NONE)\\b", name: "constant.language" },
        {
          match: "\\b(is)(?:\\s+(not))?\\s+(divisible\\s+by|same\\s+as|[a-zA-Z_]\\w*)",
          captures: {
            1: { name: "keyword.operator" },
            2: { name: "keyword.operator" },
            3: { name: "entity.name.function" }
          }
        },
        {
          match: "\\b(?:and|or|not|in|xor|b-and|b-or|b-xor|matches|starts\\s+with|ends\\s+with|has\\s+some|has\\s+every)\\b",
          name: "keyword.operator"
        },
        {
          match: "(\\|)\\s*([a-zA-Z_]\\w*)",
          captures: {
            2: { name: "entity.name.function" }
          }
        },
        {
          match: "(\\.)(?:([a-zA-Z_]\\w*)(?=\\s*\\()|([a-zA-Z_]\\w*))",
          captures: {
            2: { name: "entity.name.function" },
            3: { name: "variable.other.property" }
          }
        },
        { match: "\\b([a-zA-Z_]\\w*)\\s*(?=\\()", captures: { 1: { name: "entity.name.function" } } },
        { match: "\\b[a-zA-Z_]\\w*\\b", name: "variable.other" },
        { match: "\\?\\?|\\?:|\\.\\.|\\*\\*|//|[=!<>]=|[-+*/%~?:<>=]", name: "keyword.operator" },
        { include: "#hash" }
      ]
    },
    hash: {
      begin: "\\{",
      end: "\\}",
      captures: { 0: { name: "punctuation.section.hash" } },
      patterns: [{ include: "#expression" }]
    },
    strings: {
      patterns: [
        {
          begin: "\"",
          end: "\"",
          name: "string.quoted.double",
          patterns: [
            { match: "\\\\.", name: "constant.character.escape" },
            {
              begin: "#\\{",
              end: "\\}",
              captures: { 0: { name: "punctuation.section.interpolation" } },
              contentName: "meta.interpolation",
              patterns: [{ include: "#expression" }]
            }
          ]
        },
        {
          begin: "'",
          end: "'",
          name: "string.quoted.single",
          patterns: [{ match: "\\\\.", name: "constant.character.escape" }]
        }
      ]
    },
    "embedded-css": {
      begin: "<([Ss][Tt][Yy][Ll][Ee])\\b(?:\"[^\"]*\"|'[^']*'|[^'\">])*>",
      end: "</([Ss][Tt][Yy][Ll][Ee])[ \\t]*>",
      beginCaptures: { 1: { name: "entity.name.tag" } },
      endCaptures: { 1: { name: "entity.name.tag" } },
      contentName: "source.css.embedded.twig",
      patterns: [{ include: "#twig" }, { include: "source.css" }]
    },
    "embedded-javascript": {
      begin: "<([Ss][Cc][Rr][Ii][Pp][Tt])\\b(?:(?![^>]*\\b[Tt][Yy][Pp][Ee]\\s*=)|(?=[^>]*\\b[Tt][Yy][Pp][Ee]\\s*=\\s*(['\"])(?:module|(?:text|application)/(?:java|ecma)script)\\2))(?:\"[^\"]*\"|'[^']*'|[^'\">])*>",
      end: "</([Ss][Cc][Rr][Ii][Pp][Tt])[ \\t]*>",
      beginCaptures: { 1: { name: "entity.name.tag" } },
      endCaptures: { 1: { name: "entity.name.tag" } },
      contentName: "source.js.embedded.twig",
      patterns: [{ include: "#twig" }, { include: "source.js" }]
    },
    "raw-text": {
      begin: "<([Tt][Ee][Xx][Tt][Aa][Rr][Ee][Aa]|[Tt][Ii][Tt][Ll][Ee])\\b(?:\"[^\"]*\"|'[^']*'|[^'\">])*>",
      end: "</([Tt][Ee][Xx][Tt][Aa][Rr][Ee][Aa]|[Tt][Ii][Tt][Ll][Ee])[ \\t]*>",
      beginCaptures: { 1: { name: "entity.name.tag" } },
      endCaptures: { 1: { name: "entity.name.tag" } },
      patterns: [{ include: "#twig" }]
    },
    tags: {
      begin: "<(/?)([a-zA-Z][\\w.:-]*)",
      end: ">",
      beginCaptures: { 2: { name: "entity.name.tag" } },
      patterns: [
        { include: "#twig" },
        { include: "text.html.basic#inline-css" },
        { include: "text.html.basic#inline-javascript" },
        { include: "#attributes" },
        { include: "text.html.basic#unquoted-attributes" },
        { include: "text.html.basic#boolean-attributes" }
      ]
    },
    attributes: {
      begin: "[ \\t]+([a-zA-Z_:][\\w:.-]*)\\s*=\\s*(['\"])",
      end: "\\2",
      beginCaptures: {
        1: { name: "entity.other.attribute-name" },
        2: { name: "punctuation.definition.string.begin" }
      },
      endCaptures: { 0: { name: "punctuation.definition.string.end" } },
      contentName: "string.quoted.attribute-value",
      patterns: [{ include: "#twig" }, { include: "text.html.basic#entities" }]
    }
  }
};
