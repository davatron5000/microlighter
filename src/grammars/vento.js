// Reference: Microsoft VS Code (MIT) — https://github.com/microsoft/vscode/blob/main/extensions/html/syntaxes/html.tmLanguage.json
export default {
  scopeName: "source.vento",
  dependencies: ["html", "yaml", "javascript"],
  patterns: [
    { include: "#front_matter" },
    { include: "#comments" },
    { include: "#js_code" },
    { include: "#template_tag" },
    { include: "#tag_with_vento_attrs" },
    { include: "text.html.basic" }
  ],
  repository: {
    tag_with_vento_attrs: {
      begin: "(<)([A-Za-z][^\\s/>]*)",
      beginCaptures: {
        1: { name: "punctuation.definition.tag.begin.html" },
        2: { name: "entity.name.tag.html" }
      },
      end: "(/?>)",
      endCaptures: {
        1: { name: "punctuation.definition.tag.end.html" }
      },
      patterns: [
        { include: "#attr_with_vento" }
      ]
    },
    attr_with_vento: {
      patterns: [
        {
          // double-quoted attr value
          begin: "([:@A-Za-z_][-:A-Za-z0-9_\\.]*)\\s*=\\s*(\")",
          beginCaptures: {
            1: { name: "entity.other.attribute-name.html" },
            2: { name: "punctuation.definition.string.begin.html" }
          },
          end: "\"",
          endCaptures: {
            0: { name: "punctuation.definition.string.end.html" }
          },
          contentName: "string.quoted.double.html",
          patterns: [
            { include: "#js_code" },
            { include: "#template_tag" }
          ]
        },
        {
          // single-quoted attr value
          begin: "([:@A-Za-z_][-:A-Za-z0-9_\\.]*)\\s*=\\s*(')",
          beginCaptures: {
            1: { name: "entity.other.attribute-name.html" },
            2: { name: "punctuation.definition.string.begin.html" }
          },
          end: "'",
          endCaptures: {
            0: { name: "punctuation.definition.string.end.html" }
          },
          contentName: "string.quoted.single.html",
          patterns: [
            { include: "#js_code" },
            { include: "#template_tag" }
          ]
        }
      ]
    },
    front_matter: {
      contentName: "source.yaml",
      name: "meta.embedded.block.yaml",
      begin: "^---[a-zA-Z0-9_-]*\\s*\\n",
      end: "---\\s*\\n",
      patterns: [ { "include": "source.yaml" } ]
    },
    comments: {
      patterns: [
        { begin: "{{#", end: "#}}", name: "comment.vento" },
        { begin: "<!--", end: "-->", name: "comment.html" }
      ]
    },
    js_code: {
      begin: "{{(-)?>",
      end: "(-)?}}",
      contentName: "source.js.embedded.vento",
      patterns: [{ include: "source.js" }]
    },
    template_tag: {
      begin: "{{(-)?",
      end: "(-)?}}",
      "captures": { "0": { "name": "punctuation.definition.tag.vento" } },
      contentName: "source.js.embedded.vento",
      patterns: [
        { include: "#template_keyword" },
        { include: "source.js" }
      ]
    },
    template_keyword: {
      "match": "/(if|for|set|layout|echo|function|slot|default)\\b|\\b(for|of|if|else\\s+if|else|include|set|layout|echo|function|async\\s+function|import|from|export|await|continue|break|slot|default)\\b",
      "name": "keyword.vento"
    },
  }
};
