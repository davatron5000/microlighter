export default {
  name: "jinja-html",
  displayName: "jinja-html",
  scopeName: "text.html.jinja",
  patterns: [
    { include: "source.jinja" },
    { include: "text.html.basic" }
  ],
  dependencies: [
    "html"
  ]
};
