// Reference: Microsoft VS Code (MIT) — https://github.com/microsoft/vscode/blob/main/extensions/ini/syntaxes/ini.tmLanguage.json
export default {
    scopeName: "source.ini",
    patterns: [
        { include: "#comments" },
        { include: "#section-headers" },
        { include: "#key-value" },
        { include: "#strings" },
        { include: "#constants" },
        { include: "#numbers" }
    ],
    repository: {
        comments: { match: "^\\s*[;#].*$", name: "comment.line" },
        "section-headers": {
            match: "^\\s*\\[([^\\[\\]]+)\\]\\s*$",
            captures: {
                1: { name: "entity.name.section" }
            }
        },
        "key-value": {
            match: "^\\s*([^=;#\\s][^=;#]*?)\\s*(?==)",
            captures: { 1: { name: "entity.name.key" } }
        },
        strings: {
            patterns: [
                { match: "'(?:\\\\.|[^'\\\\])*'", name: "string.quoted.single" },
                { match: "\"(?:\\\\.|[^\"\\\\])*\"", name: "string.quoted.double" }
            ]
        },
        constants: {
            patterns: [
                { match: "\\b(?:true|false|yes|no|on|off)\\b", name: "constant.language.boolean" },
                { match: "\\b(?:null|none)\\b", name: "constant.language" }
            ]
        },
        numbers: { match: "(?<![\\w.])[+-]?\\d+(?:\\.\\d+)?\\b", name: "constant.numeric" }
    }
};