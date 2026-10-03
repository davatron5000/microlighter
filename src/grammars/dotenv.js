export default {
  name: "dotenv",
  displayName: "dotEnv",
  scopeName: "source.dotenv",
  patterns: [
    {
      captures: {
        "1": {
          patterns: [
            { include: "#line-comment" }
          ]
        }
      },
      match: /^\p{space}?(#[^\n]*)(?=\n?$)\n/dgv
    },
    {
      captures: {
        "1": {
          patterns: [
            { include: "#key" }
          ]
        },
        "2": { name: "keyword.operator.assignment.dotenv" },
        "3": { name: "constant.numeric.dotenv" },
        "4": { name: "comment.line.dotenv" }
      },
      match: /^([\t ]*(?:export[\t ]+)?[\-\.\p{L}\p{M}\p{N}\p{Pc}]+[\t ]*)(=)[\t ]*([\-\+]?[0-9](?:[0-9_]*[0-9])?(?:\.[0-9](?:[0-9_]*[0-9])?)?)[\t ]*(#[^\n]*)?(?=\n?$)/dgv
    },
    {
      captures: {
        "1": {
          patterns: [
            { include: "#key" }
          ]
        },
        "2": { name: "keyword.operator.assignment.dotenv" },
        "3": {
          name: "property.value.dotenv",
          patterns: [
            { include: "#line-comment" },
            { include: "#double-quoted-string" },
            { include: "#single-quoted-string" },
            { include: "#interpolation" }
          ]
        }
      },
      match: /^\p{space}?([^\n]*?)\p{space}?(=)([^\n]*)(?=\n?$)/dgv
    }
  ],
  repository: {
    "double-quoted-string": {
      captures: {
        "1": {
          patterns: [
            { include: "#interpolation" },
            { include: "#escape-characters" }
          ]
        }
      },
      match: /"([^\n]*)"/dgv,
      name: "string.quoted.double.dotenv"
    },
    "escape-characters": {
      match: /\\(?:["'\\bfnrt]|u[0-9A-F]{4})/dgv,
      name: "constant.character.escape.dotenv"
    },
    interpolation: {
      captures: {
        "1": { name: "keyword.interpolation.begin.dotenv" },
        "2": { name: "variable.interpolation.dotenv" },
        "3": { name: "keyword.interpolation.end.dotenv" }
      },
      match: /(\$\{)([^\n]*)(\})/dgv
    },
    key: {
      captures: {
        "1": { name: "keyword.key.export.dotenv" },
        "2": {
          name: "variable.key.dotenv",
          patterns: [
            { include: "#variable" }
          ]
        }
      },
      match: /(export\p{space})?([^\n]*)/dgv
    },
    "line-comment": {
      match: /#[^\n]*(?=\n?$)/dgv,
      name: "comment.line.dotenv"
    },
    "single-quoted-string": {
      match: /'([^\n]*)'/dgv,
      name: "string.quoted.single.dotenv"
    },
    variable: {
      match: /[A-Z_a-z]+[0-9A-Z_a-z]*/dgv
    }
  },
  dependencies: []
};
