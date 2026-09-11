// Reference: Microsoft VS Code (MIT) — https://github.com/microsoft/vscode/blob/main/extensions/csharp/syntaxes/csharp.tmLanguage.json
export default {
  scopeName: "source.cs",
  patterns: [
    { include: "#comments" },
    { include: "#strings" },
    { include: "#attributes" },
    { include: "#class-declaration" },
    { include: "#keywords" },
    { include: "#builtin-types" },
    { include: "#constants" },
    { include: "#numbers" },
    { include: "#operators" },
    { include: "#function-declaration" }
  ],
  repository: {
    comments: {
      patterns: [
        { match: "///.*$", name: "comment.line.documentation" },
        { match: "//.*$", name: "comment.line.double-slash" },
        { begin: "/\\*", end: "\\*/", name: "comment.block" }
      ]
    },
    strings: {
      patterns: [
        { match: "@\"(?:\"\"|[^\"])*\"", name: "string.quoted.double.verbatim" },
        { match: "\\$@\"(?:\"\"|[^\"])*\"", name: "string.quoted.double.interpolated" },
        { match: "@\\$\"(?:\"\"|[^\"])*\"", name: "string.quoted.double.interpolated" },
        { match: "\\$\"(?:\\\\.|[^\"\\\\\\r\\n])*\"", name: "string.quoted.double.interpolated" },
        { match: "\"(?:\\\\.|[^\"\\\\\\r\\n])*\"", name: "string.quoted.double" },
        { match: "'(?:\\\\.|[^'\\\\\\r\\n])'", name: "string.quoted.char" }
      ]
    },
    attributes: { match: "\\[[A-Za-z_][\\w.]*\\]", name: "entity.name.decorator" },
    "class-declaration": {
      match: "\\b(class|interface|struct|enum|record)\\s+([A-Za-z_]\\w*)",
      captures: {
        1: { name: "storage.type.class" },
        2: { name: "entity.name.type.class" }
      }
    },
    keywords: {
      match: "\\b(?:abstract|as|async|await|base|break|case|catch|checked|const|continue|default|delegate|do|else|event|explicit|extern|finally|fixed|for|foreach|goto|if|implicit|in|internal|is|lock|namespace|new|null|operator|out|override|params|partial|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|switch|this|throw|try|typeof|unchecked|unsafe|using|virtual|volatile|while|yield)\\b",
      name: "keyword.control"
    },
    "builtin-types": {
      match: "\\b(?:bool|byte|char|decimal|double|dynamic|float|int|long|object|sbyte|short|string|uint|ulong|ushort|var|void)\\b",
      name: "support.class.builtin"
    },
    constants: {
      patterns: [
        { match: "\\b(?:true|false)\\b", name: "constant.language.boolean" },
        { match: "\\bnull\\b", name: "constant.language" }
      ]
    },
    numbers: {
      match: "(?<![\\w.])(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|\\d(?:_?\\d)*(?:\\.\\d(?:_?\\d)*)?(?:[eE][+-]?\\d+)?)[uUlLfFdDmM]*\\b",
      name: "constant.numeric"
    },
    operators: {
      match: "(?:=>|\\?\\?=?|\\?\\.|::|&&|\\|\\||==|!=|<=|>=|<<=?|>>=?|[+\\-*/%&|^!~<>=]=?)",
      name: "keyword.operator"
    },
    "function-declaration": {
      match: "\\b([A-Za-z_]\\w*)(?=\\s*(?:<[^>]*>)?\\s*\\()",
      name: "entity.name.function"
    }
  }
};
