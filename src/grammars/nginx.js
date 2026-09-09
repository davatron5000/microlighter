// Reference: nginx configuration syntax conventions (community grammar style)
export default {
    scopeName: "source.nginx",
    patterns: [
        { include: "#comments" },
        { include: "#directives" },
        { include: "#block-delimiters" },
        { include: "#variables" },
        { include: "#strings" },
        { include: "#numbers" },
        { include: "#keywords" }
    ],
    repository: {
        comments: { match: "#.*$", name: "comment.line.number-sign" },
        directives: {
            match: "^\\s*([A-Za-z_][\\w-]*)\\s*(?=\\S)",
            captures: {
                1: { name: "keyword.other.directive" }
            }
        },
        "block-delimiters": {
            match: "[{};]",
            name: "punctuation.section.block"
        },
        variables: {
            match: "\\$[A-Za-z_][\\w-]*|\\$\\{[^}]+\\}",
            name: "variable.other"
        },
        strings: {
            patterns: [
                { match: "\"(?:\\\\.|[^\"\\\\])*\"", name: "string.quoted.double" },
                { match: "'(?:\\\\.|[^'\\\\])*'", name: "string.quoted.single" }
            ]
        },
        numbers: {
            match: "(?<![\\w.])[-+]?\\d+(?:\\.\\d+)?(?:[kKmMgG]?)\\b",
            name: "constant.numeric"
        },
        keywords: {
            match: "\\b(?:on|off|yes|no|default|auto|none|http|https|tcp|udp|unix|listen|server_name|proxy_pass|root|index|rewrite|return|include|location|upstream|server)\\b",
            name: "keyword"
        }
    }
};
