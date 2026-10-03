export default {
  name: "ts-tags",
  displayName: "TypeScript with Tags",
  aliases: [
    "lit"
  ],
  scopeName: "source.ts.tags",
  patterns: [
    { include: "source.ts" }
  ],
  dependencies: [
    "typescript",
    "es-tag-css",
    "es-tag-glsl",
    "es-tag-html",
    "es-tag-sql",
    "es-tag-xml"
  ]
};
