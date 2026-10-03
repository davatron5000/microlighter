export default {
  name: "codeowners",
  displayName: "CODEOWNERS",
  scopeName: "text.codeowners",
  patterns: [
    { include: "#comment" },
    { include: "#pattern" },
    { include: "#owner" }
  ],
  repository: {
    comment: {
      patterns: [
        {
          begin: /^\p{space}*#/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.codeowners" }
          },
          end: /(?=\n?$)/dgv,
          name: "comment.line.codeowners"
        }
      ]
    },
    owner: {
      match: /\P{space}*@\P{space}+/dgv,
      name: "storage.type.function.codeowners"
    },
    pattern: {
      match: /^\p{space}*(\P{space}+)/dgv,
      name: "variable.other.codeowners"
    }
  },
  dependencies: []
};
