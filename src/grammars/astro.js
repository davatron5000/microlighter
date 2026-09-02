// Reference: Astro Language Tools (MIT) - https://github.com/withastro/astro/tree/HEAD/packages/language-tools/vscode/syntaxes/astro.tmLanguage.json
export default {
  scopeName: "source.astro",
  dependencies: ["html", "css", "scss", "javascript", "typescript", "tsx"],
  patterns: [
    { include: "#frontmatter" },
    { include: "#script" },
    { include: "#style" },
    { include: "#interpolation" },
    { include: "text.html.basic" }
  ],
  repository: {
    frontmatter: {
      begin: "^---\\s*$",
      end: "^---\\s*$",
      beginCaptures: {
        0: { name: "punctuation.definition.frontmatter.begin.astro" }
      },
      endCaptures: {
        0: { name: "punctuation.definition.frontmatter.end.astro" }
      },
      contentName: "meta.embedded.block.astro",
      patterns: [{ include: "source.ts" }]
    },
    script: {
      patterns: [
        {
          begin: "<(script)\\s*>",
          end: "</(script)\\s*>",
          beginCaptures: {
            1: { name: "entity.name.tag" }
          },
          endCaptures: {
            1: { name: "entity.name.tag" }
          },
          contentName: "source.ts.embedded.astro",
          patterns: [{ include: "source.ts" }]
        },
        { include: "text.html.basic#embedded-javascript" }
      ]
    },
    style: {
      patterns: [
        {
          begin: "<(style)\\b(?=[^>]*\\blang\\s*=\\s*(['\"])scss\\2)[^>]*>",
          end: "</(style)\\s*>",
          beginCaptures: {
            1: { name: "entity.name.tag" }
          },
          endCaptures: {
            1: { name: "entity.name.tag" }
          },
          contentName: "source.scss.embedded.astro",
          patterns: [{ include: "source.scss" }]
        },
        { include: "source.css" }
      ]
    },
    interpolation: {
      begin: "\\{",
      end: "\\}",
      beginCaptures: {
        0: { name: "punctuation.section.embedded.begin.astro" }
      },
      endCaptures: {
        0: { name: "punctuation.section.embedded.end.astro" }
      },
      contentName: "meta.embedded.expression.astro",
      patterns: [{ include: "text.html.basic#comments" }, { include: "source.tsx" }]
    }
  }
};
