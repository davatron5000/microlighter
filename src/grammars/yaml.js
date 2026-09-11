// Reference: Microsoft VS Code (MIT) — https://github.com/microsoft/vscode/blob/main/extensions/yaml/syntaxes/yaml.tmLanguage.json
export default {
  scopeName: "source.yaml",
  patterns: [
    { match: "#.*$", name: "comment.line.number-sign" },
    { match: "^(?:---|\\.\\.\\.)\\s*$|^%YAML\\b.*$", name: "keyword.control.document" },
    { match: "^\\s*(?:-\\s+)?([^#\\s][^\\r\\n:#]*?)(?=\\s*:)", captures: { 1: { name: "entity.name.key" } } },
    { match: "[&*][a-zA-Z_][\\w-]*|![^\\s]+", name: "entity.name.anchor" },
    { match: "'(?:\\\\.|[^'\\\\\\r\\n])*(?:\\r?\\n[ \\t](?:\\\\.|[^'\\\\\\r\\n])*)*'", name: "string.quoted.single" },
    { match: "\"(?:\\\\.|[^\"\\\\\\r\\n])*(?:\\r?\\n[ \\t](?:\\\\.|[^\"\\\\\\r\\n])*)*\"", name: "string.quoted.double" },
    { match: "(?<=:\\s)[|>][-+]?\\s*$", name: "keyword.control.block-scalar" },
    { match: "\\b(?:true|false|yes|no|on|off)\\b", name: "constant.language.boolean" },
    { match: "\\bnull\\b|~", name: "constant.language" },
    { match: "(?<![\\w.-])-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b", name: "constant.numeric" }
  ]
};
