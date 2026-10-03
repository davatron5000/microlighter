export default {
  name: "git-commit",
  displayName: "Git Commit Message",
  scopeName: "text.git-commit",
  patterns: [
    {
      begin: /(?=^diff --git)/dgv,
      contentName: "source.diff",
      end: /$/dgv,
      name: "meta.embedded.diff.git-commit",
      patterns: [
        { include: "source.diff" }
      ]
    },
    {
      begin: /^(?!#)/dgv,
      end: /^(?=#)/dgv,
      name: "meta.scope.message.git-commit",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.deprecated.line-too-long.git-commit" },
            "2": { name: "invalid.illegal.line-too-long.git-commit" }
          },
          match: {
            G: [/￿[^\n]{0,50}([^\n]{0,22}([^\n]*))(?=\n?$)/dgv, /[^\n]{0,50}([^\n]{0,22}([^\n]*))(?=\n?$)/dgvy]
          },
          name: "meta.scope.subject.git-commit"
        }
      ]
    },
    {
      begin: /^(?=#)/dgv,
      contentName: "comment.line.number-sign.git-commit",
      end: /^(?!#)/dgv,
      name: "meta.scope.metadata.git-commit",
      patterns: [
        {
          captures: {
            "1": { name: "markup.changed.git-commit" }
          },
          match: /^#\t((modified|renamed):[^\n]*)(?=\n?$)/dgv
        },
        {
          captures: {
            "1": { name: "markup.inserted.git-commit" }
          },
          match: /^#\t(new file:[^\n]*)(?=\n?$)/dgv
        },
        {
          captures: {
            "1": { name: "markup.deleted.git-commit" }
          },
          match: /^#\t(deleted[^\n]*)(?=\n?$)/dgv
        },
        {
          captures: {
            "1": { name: "keyword.other.file-type.git-commit" },
            "2": { name: "string.unquoted.filename.git-commit" }
          },
          match: /^#\t([^\:]+): *([^\n]*)(?=\n?$)/dgv
        }
      ]
    }
  ],
  dependencies: [
    "diff"
  ]
};
