export default {
  name: "hurl",
  displayName: "Hurl",
  scopeName: "source.hurl",
  patterns: [
    { include: "#comments" },
    { include: "#sections" },
    { include: "#http" },
    { include: "#strings" },
    { include: "#body" },
    { include: "#request" }
  ],
  repository: {
    body: {
      patterns: [
        {
          begin: /```graphql(,[\p{L}\p{M}\p{N}\p{Pc}]+)*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "support.type" }
          },
          end: /```(?=\n?$)/dgv,
          name: "meta.embedded.block.graphql.hurl",
          patterns: [
            { include: "source.graphql" }
          ]
        },
        {
          begin: /```xml(,[\p{L}\p{M}\p{N}\p{Pc}]+)*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "support.type" }
          },
          end: /```(?=\n?$)/dgv,
          name: "meta.embedded.block.xml.hurl",
          patterns: [
            { include: "text.xml" }
          ]
        },
        {
          begin: /```json(,[\p{L}\p{M}\p{N}\p{Pc}]+)*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "support.type" }
          },
          end: /```(?=\n?$)/dgv,
          name: "meta.embedded.block.json.hurl",
          patterns: [
            { include: "text.json" }
          ]
        },
        {
          begin: /```csv(,[\p{L}\p{M}\p{N}\p{Pc}]+)*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "support.type" }
          },
          end: /```(?=\n?$)/dgv,
          name: "meta.embedded.block.csv.hurl",
          patterns: [
            { include: "text.csv" }
          ]
        },
        {
          begin: /```hex(,[\p{L}\p{M}\p{N}\p{Pc}]+)*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "support.type" }
          },
          contentName: "text.plain",
          end: /```(?=\n?$)/dgv,
          name: "string.quoted.multiline.hurl"
        },
        {
          begin: /```base64(,[\p{L}\p{M}\p{N}\p{Pc}]+)*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "support.type" }
          },
          contentName: "text.plain",
          end: /```(?=\n?$)/dgv,
          name: "string.quoted.multiline.hurl"
        },
        {
          begin: /```([^\,]*)(,[\p{L}\p{M}\p{N}\p{Pc}]+)*(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "support.type" },
            "2": { name: "support.type" }
          },
          end: /```(?=\n?$)/dgv,
          name: "string.quoted.multiline.hurl"
        },
        {
          match: /`(\\[^\n]|[^\\\`])*`/dgv,
          name: "string.quoted.backtick.hurl",
          patterns: [
            { include: "#escapes" }
          ]
        },
        {
          begin: /\b(base64|hex),/dgv,
          beginCaptures: {
            "1": { name: "support.function.name" }
          },
          contentName: "text.plain",
          end: /;/dgv,
          endCaptures: {
            "0": { name: "support.function" }
          },
          name: "support.function",
          patterns: [
            { include: "#placeholders" }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        {
          match: /#[^\n]*(?=\n?$)/dgv,
          name: "comment.line.number-sign.hurl"
        }
      ]
    },
    escapes: {
      patterns: [
        {
          match: /\\["\#\\\`bnrtu]/dgv,
          name: "constant.character.escape.hurl"
        }
      ]
    },
    http: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.language.version.hurl" },
            "3": { name: "constant.numeric.status.hurl" }
          },
          match: /\b(HTTP(\/(?:1\.0|1\.1|2))?)([\t ]+([0-9]{3}))?\b/dgv
        }
      ]
    },
    placeholders: {
      patterns: [
        {
          begin: /(\{\{)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "string.interpolated.hurl" }
          },
          contentName: "variable.other.hurl",
          end: /\p{space}*(\}\})/dgv,
          endCaptures: {
            "1": { name: "string.interpolated.hurl" }
          }
        }
      ]
    },
    request: {
      patterns: [
        {
          match: /\b(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT)\b/dgv,
          name: "keyword.control.method.hurl"
        },
        {
          captures: {
            "1": {
              name: "string.unquoted.url.hurl",
              patterns: [
                { include: "#placeholders" }
              ]
            }
          },
          match: /(https?:\/\/[^\t\n]+)\p{space}*(?=\n?$)/dgv,
          name: "string.unquoted.url.hurl"
        },
        {
          begin: /^([\-0-9A-Za-z]+)(:)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.header.hurl" },
            "2": { name: "punctuation.separator.key-value.hurl" }
          },
          contentName: "string.unquoted.hurl",
          end: /(?=\n?$)/dgv,
          name: "entity.name.tag.header.hurl",
          patterns: [
            { include: "#placeholders" }
          ]
        }
      ]
    },
    sections: {
      patterns: [
        {
          match: /^\p{space}*\[(QueryStringParams|Query|FormParams|Form|MultipartFormData|Multipart|Cookies|Captures|Asserts|BasicAuth|Options)\]/dgv,
          name: "entity.name.section.hurl"
        }
      ]
    },
    strings: {
      patterns: [
        {
          match: /"(\\[^\n]|[^"\\])*"/dgv,
          name: "string.quoted.double.hurl",
          patterns: [
            { include: "#escapes" }
          ]
        }
      ]
    }
  },
  dependencies: [
    "graphql",
    "xml",
    "csv"
  ]
};
