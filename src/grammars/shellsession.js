export default {
  name: "shellsession",
  displayName: "Shell Session",
  aliases: [
    "console"
  ],
  scopeName: "text.shell-session",
  patterns: [
    {
      captures: {
        "1": { name: "entity.other.prompt-prefix.shell-session" },
        "2": { name: "punctuation.separator.prompt.shell-session" },
        "3": {
          name: "source.shell",
          patterns: [
            { include: "source.shell" }
          ]
        }
      },
      match: /^(?:((?:\(\P{space}+\)\p{space}*)?(?:sh\P{space}*?|[\p{L}\p{M}\p{N}\p{Pc}]+\P{space}+[\:\@]\P{space}+(?:\p{space}+\P{space}+)?|\[\P{space}+?[\:\@][^\n]+?\][^\n]*?))\p{space}*)?([\#\$\%\>❯➜\p{sc=Greek}])\p{space}+([^\n]*)(?=\n?$)/dgv
    },
    {
      match: /^[^\n]+(?=\n?$)/dgv,
      name: "meta.output.shell-session"
    }
  ],
  dependencies: [
    "shellscript"
  ]
};
