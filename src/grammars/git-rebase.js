export default {
  name: "git-rebase",
  displayName: "Git Rebase Message",
  scopeName: "text.git-rebase",
  patterns: [
    {
      captures: {
        "1": { name: "punctuation.definition.comment.git-rebase" }
      },
      match: /^\p{space}*(#)[^\n]*(?=\n?$)\n?/dgv,
      name: "comment.line.number-sign.git-rebase"
    },
    {
      captures: {
        "1": { name: "support.function.git-rebase" },
        "2": { name: "constant.sha.git-rebase" },
        "3": { name: "meta.commit-message.git-rebase" }
      },
      match: /^\p{space}*(pick|p|reword|r|edit|e|squash|s|fixup|f|drop|d)\p{space}+([0-9a-f]+)\p{space}+([^\n]*)(?=\n?$)/dgv,
      name: "meta.commit-command.git-rebase"
    },
    {
      captures: {
        "1": { name: "support.function.git-rebase" },
        "2": {
          patterns: [
            { include: "source.shell" }
          ]
        }
      },
      match: /^\p{space}*(exec|x)\p{space}+([^\n]*)(?=\n?$)/dgv,
      name: "meta.commit-command.git-rebase"
    },
    {
      captures: {
        "1": { name: "support.function.git-rebase" }
      },
      match: /^\p{space}*(b(?:reak|))\p{space}*(?=\n?$)/dgv,
      name: "meta.commit-command.git-rebase"
    }
  ],
  dependencies: [
    "shellscript"
  ]
};
