// Reference: Apache HTTP Server configuration syntax (httpd.conf, .htaccess).
export default {
    scopeName: "source.apacheconf",
    patterns: [
        { include: "#comments" },
        { include: "#sections" },
        { include: "#directives" },
        { include: "#strings" },
        { include: "#variables" },
        { include: "#flags" },
        { include: "#constants" },
        { include: "#numbers" }
    ],
    repository: {
        comments: { match: "#.*$", name: "comment.line.number-sign" },
        sections: {
            begin: "(</?)([A-Za-z_][\\w-]*)",
            beginCaptures: {
                1: { name: "punctuation.definition.tag.begin" },
                2: { name: "entity.name.tag" }
            },
            end: ">",
            endCaptures: {
                0: { name: "punctuation.definition.tag.end" }
            },
            patterns: [
                { include: "#strings" },
                { include: "#variables" },
                { include: "#numbers" }
            ]
        },
        directives: {
            match: "^\\s*([A-Za-z_][\\w-]*)",
            captures: {
                1: { name: "keyword.other.directive" }
            }
        },
        strings: {
            patterns: [
                { match: "\"(?:\\\\.|[^\"\\\\])*\"", name: "string.quoted.double" },
                { match: "'(?:\\\\.|[^'\\\\])*'", name: "string.quoted.single" }
            ]
        },
        variables: {
            patterns: [
                { match: "%\\{[^}]*\\}", name: "variable.other.server" },
                { match: "\\$\\{[^}]*\\}", name: "variable.other.environment" },
                { match: "[$%]\\d+", name: "variable.other.backreference" }
            ]
        },
        flags: {
            match: "\\[[^\\]]*\\]",
            name: "support.other.flag"
        },
        constants: {
            patterns: [
                {
                    match: "\\b(?:On|Off|on|off|Yes|No|yes|no|True|False|true|false)\\b",
                    name: "constant.language.boolean"
                },
                {
                    match: "\\b(?:All|None|Any|Indexes|Includes|FollowSymLinks|SymLinksIfOwnerMatch|ExecCGI|MultiViews|allow|deny|require|valid-user|from|env)\\b",
                    name: "constant.language"
                }
            ]
        },
        numbers: {
            match: "(?<![\\w.])[-+]?\\d+(?:\\.\\d+)?\\b",
            name: "constant.numeric"
        }
    }
};
