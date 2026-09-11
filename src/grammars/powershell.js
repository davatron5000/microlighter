// Reference: Microsoft VS Code (MIT) — https://github.com/microsoft/vscode/blob/main/extensions/powershell/syntaxes/powershell.tmLanguage.json
export default {
  scopeName: "source.powershell",
  patterns: [
    { include: "#comments" },
    { include: "#strings" },
    { include: "#constants" },
    { include: "#variables" },
    { include: "#function-declaration" },
    { include: "#operators" },
    { include: "#keywords" },
    { include: "#parameters" },
    { include: "#cmdlets" },
    { include: "#numbers" }
  ],
  repository: {
    comments: {
      patterns: [
        { begin: "<#", end: "#>", name: "comment.block" },
        { match: "#.*$", name: "comment.line.number-sign" }
      ]
    },
    strings: {
      patterns: [
        { match: "'(?:''|[^'])*'", name: "string.quoted.single" },
        { match: "\"(?:`[\\s\\S]|[^\"`])*\"", name: "string.quoted.double" }
      ]
    },
    variables: {
      match: "\\$(?:\\{[^}]+\\}|[A-Za-z_][\\w:]*)",
      name: "entity.name.variable"
    },
    "function-declaration": {
      match: "\\b(function|filter)\\s+([A-Za-z_][\\w-]*)",
      captures: {
        1: { name: "storage.type.function" },
        2: { name: "entity.name.function" }
      }
    },
    operators: {
      match: "-(?:eq|ne|gt|lt|ge|le|like|notlike|match|notmatch|contains|notcontains|in|notin|and|or|not|xor|replace|split|join|is|isnot|as)\\b",
      name: "keyword.operator"
    },
    keywords: {
      match: "\\b(?:begin|break|catch|class|continue|do|dynamicparam|else|elseif|end|exit|finally|for|foreach|if|in|param|process|return|switch|throw|trap|try|until|while)\\b",
      name: "keyword.control"
    },
    constants: {
      patterns: [
        { match: "\\$(?:true|false)\\b", name: "constant.language.boolean" },
        { match: "\\$(?:null)\\b", name: "constant.language" }
      ]
    },
    parameters: { match: "(?<![\\w-])-[A-Za-z][\\w]*", name: "constant.language.option" },
    cmdlets: { match: "\\b[A-Z][a-zA-Z]*-[A-Za-z]+\\b", name: "entity.name.function" },
    numbers: {
      match: "(?<![\\w.])-?\\d+(?:\\.\\d+)?(?:[kKmMgGtTpP][bB])?\\b",
      name: "constant.numeric"
    }
  }
};
