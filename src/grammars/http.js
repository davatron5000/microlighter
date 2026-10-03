export default {
  name: "http",
  displayName: "HTTP",
  scopeName: "source.http",
  patterns: [
    {
      begin: /^\p{space}*(?=curl)/dgv,
      end: /^\p{space}*(#{3,}[^\n]*?)?\p{space}*(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "comment.line.sharp.http" }
      },
      name: "http.request.curl",
      patterns: [
        { include: "source.shell" }
      ]
    },
    {
      begin: /\p{space}*(?=(\[|\{[^\{]))/dgv,
      end: /^\p{space}*(#{3,}[^\n]*?)?\p{space}*(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "comment.line.sharp.http" }
      },
      name: "http.request.body.json",
      patterns: [
        { include: "source.json" }
      ]
    },
    {
      begin: /^\p{space}*(?=<\P{space})/dgv,
      end: /^\p{space}*(#{3,}[^\n]*?)?\p{space}*(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "comment.line.sharp.http" }
      },
      name: "http.request.body.xml",
      patterns: [
        { include: "text.xml" }
      ]
    },
    {
      begin: /\p{space}*(?=(query|mutation))/dgv,
      end: /^\p{space}*(#{3,}[^\n]*?)?\p{space}*(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "comment.line.sharp.http" }
      },
      name: "http.request.body.graphql",
      patterns: [
        { include: "source.graphql" }
      ]
    },
    {
      begin: /\p{space}*(?=(query|mutation))/dgv,
      end: /^\{\p{space}*(?=\n?$)/dgv,
      name: "http.request.body.graphql",
      patterns: [
        { include: "source.graphql" }
      ]
    },
    { include: "#metadata" },
    { include: "#comments" },
    {
      captures: {
        "1": { name: "keyword.other.http" },
        "2": { name: "variable.other.http" },
        "3": { name: "string.other.http" }
      },
      match: /^\p{space}*(@)([^\=\p{space}]+)\p{space}*=\p{space}*([^\n]*?)\p{space}*(?=\n?$)/dgv,
      name: "http.filevariable"
    },
    {
      captures: {
        "1": { name: "keyword.operator.http" },
        "2": { name: "variable.other.http" },
        "3": { name: "string.other.http" }
      },
      match: /^\p{space}*([\&\?])([^\=\p{space}]+)=([^\n]*)(?=\n?$)/dgv,
      name: "http.query"
    },
    {
      captures: {
        "1": { name: "entity.name.tag.http" },
        "2": { name: "keyword.other.http" },
        "3": { name: "string.other.http" }
      },
      match: /^([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(:)\p{space}*([^\/][^\n]*?)\p{space}*(?=\n?$)/dgv,
      name: "http.headers"
    },
    { include: "#request-line" },
    { include: "#response-line" }
  ],
  repository: {
    comments: {
      patterns: [
        {
          match: /^\p{space}*#+[^\n]*(?=\n?$)/dgv,
          name: "comment.line.sharp.http"
        },
        {
          match: /^\p{space}*\/{2,}[^\n]*(?=\n?$)/dgv,
          name: "comment.line.double-slash.http"
        }
      ]
    },
    metadata: {
      patterns: [
        {
          captures: {
            "1": { name: "entity.other.attribute-name" },
            "2": { name: "punctuation.definition.block.tag.metadata" },
            "3": { name: "entity.name.type.http" }
          },
          match: /^\p{space}*#+\p{space}+((@)name)\p{space}+([^\.\p{space}]+)(?=\n?$)/dgv,
          name: "comment.line.sharp.http"
        },
        {
          captures: {
            "1": { name: "entity.other.attribute-name" },
            "2": { name: "punctuation.definition.block.tag.metadata" },
            "3": { name: "entity.name.type.http" }
          },
          match: /^\p{space}*\/{2,}\p{space}+((@)name)\p{space}+([^\.\p{space}]+)(?=\n?$)/dgv,
          name: "comment.line.double-slash.http"
        },
        {
          captures: {
            "1": { name: "entity.other.attribute-name" },
            "2": { name: "punctuation.definition.block.tag.metadata" }
          },
          match: /^\p{space}*#+\p{space}+((@)note)\p{space}*(?=\n?$)/dgv,
          name: "comment.line.sharp.http"
        },
        {
          captures: {
            "1": { name: "entity.other.attribute-name" },
            "2": { name: "punctuation.definition.block.tag.metadata" }
          },
          match: /^\p{space}*\/{2,}\p{space}+((@)note)\p{space}*(?=\n?$)/dgv,
          name: "comment.line.double-slash.http"
        },
        {
          captures: {
            "1": { name: "entity.other.attribute-name" },
            "2": { name: "punctuation.definition.block.tag.metadata" },
            "3": { name: "variable.other.http" },
            "4": { name: "string.other.http" }
          },
          match: /^\p{space}*#+\p{space}+((@)prompt)\p{space}+(\P{space}+)(?:\p{space}+([^\n]*))?\p{space}*(?=\n?$)/dgv,
          name: "comment.line.sharp.http"
        },
        {
          captures: {
            "1": { name: "entity.other.attribute-name" },
            "2": { name: "punctuation.definition.block.tag.metadata" },
            "3": { name: "variable.other.http" },
            "4": { name: "string.other.http" }
          },
          match: /^\p{space}*\/{2,}\p{space}+((@)prompt)\p{space}+(\P{space}+)(?:\p{space}+([^\n]*))?\p{space}*(?=\n?$)/dgv,
          name: "comment.line.double-slash.http"
        }
      ]
    },
    protocol: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.http" },
            "2": { name: "constant.numeric.http" }
          },
          match: /(HTTP)\/(\p{Nd}+[^\n]\p{Nd}+)/dgv,
          name: "http.version"
        }
      ]
    },
    "request-line": {
      captures: {
        "1": { name: "keyword.control.http" },
        "2": { name: "const.language.http" },
        "3": {
          patterns: [
            { include: "#protocol" }
          ]
        }
      },
      match: /^(get|post|put|delete|patch|head|options|connect|trace|lock|unlock|propfind|proppatch|copy|move|mkcol|mkcalendar|acl|search)\p{space}+\p{space}*([^\n]+?)(?:\p{space}+(HTTP\/\P{space}+))?(?=\n?$)/dgiv,
      name: "http.requestline"
    },
    "response-line": {
      captures: {
        "1": {
          patterns: [
            { include: "#protocol" }
          ]
        },
        "2": { name: "constant.numeric.http" },
        "3": { name: "string.other.http" }
      },
      match: /^\p{space}*(HTTP\/\P{space}+)\p{space}([1-5][0-9][0-9])\p{space}([^\n]*)(?=\n?$)/dgiv,
      name: "http.responseLine"
    }
  },
  dependencies: [
    "shellscript",
    "json",
    "xml",
    "graphql"
  ]
};
