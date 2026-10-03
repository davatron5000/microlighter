export default {
  name: "genie",
  displayName: "Genie",
  scopeName: "source.genie",
  patterns: [
    { include: "#code" }
  ],
  repository: {
    code: {
      patterns: [
        { include: "#comments" },
        { include: "#constants" },
        { include: "#strings" },
        { include: "#keywords" },
        { include: "#types" },
        { include: "#functions" },
        { include: "#variables" }
      ]
    },
    comments: {
      patterns: [
        {
          captures: {
            "0": { name: "punctuation.definition.comment.vala" }
          },
          match: /\/\*\*\//dgv,
          name: "comment.block.empty.vala"
        },
        { include: "text.html.javadoc" },
        { include: "#comments-inline" }
      ]
    },
    "comments-inline": {
      patterns: [
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.vala" }
          },
          end: /\*\//dgv,
          name: "comment.block.vala"
        },
        {
          captures: {
            "1": { name: "comment.line.double-slash.vala" },
            "2": { name: "punctuation.definition.comment.vala" }
          },
          match: /\p{space}*((\/\/)[^\n]*(?=\n?$)\n?)/dgv
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b((0([Xx])\p{AHex}*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)([DFLUdflu]|UL|ul)?\b/dgv,
          name: "constant.numeric.vala"
        },
        {
          match: /\b([A-Z][0-9A-Z_]+)\b/dgv,
          name: "variable.other.constant.vala"
        }
      ]
    },
    functions: {
      patterns: [
        {
          match: /([\p{L}\p{M}\p{N}\p{Pc}]+)(?=\p{space}*(<[\.\p{space}\p{L}\p{M}\p{N}\p{Pc}]+>\p{space}*)?\()/dgv,
          name: "entity.name.function.vala"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /(?<=^|[^\.\@\p{L}\p{M}\p{N}\p{Pc}])(as|do|if|in|is|of|or|to|and|def|for|get|isa|new|not|out|ref|set|try|var|case|dict|else|enum|init|list|lock|null|pass|prop|self|true|uses|void|weak|when|array|async|break|class|const|event|false|final|owned|print|super|raise|while|yield|assert|delete|downto|except|extern|inline|params|public|raises|return|sealed|sizeof|static|struct|typeof|default|dynamic|ensures|finally|private|unowned|virtual|abstract|continue|delegate|internal|override|readonly|requires|volatile|construct|errordomain|interface|namespace|protected|implements)\b/dgv,
          name: "keyword.vala"
        },
        {
          match: /(?<=^|[^\.\@\p{L}\p{M}\p{N}\p{Pc}])(bool|double|float|unichar|char|uchar|int|uint|long|ulong|short|ushort|size_t|ssize_t|string|void|signal|int8|int16|int32|int64|uint8|uint16|uint32|uint64)\b/dgv,
          name: "keyword.vala"
        },
        {
          match: /(#(?:if|elif|else|endif))/dgv,
          name: "keyword.vala"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /"""/dgv,
          end: /"""/dgv,
          name: "string.quoted.triple.vala"
        },
        {
          begin: /@"/dgv,
          end: /"/dgv,
          name: "string.quoted.interpolated.vala",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.vala"
            },
            {
              match: /\$[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "constant.character.escape.vala"
            },
            {
              match: /\$\(([^\(\)]|\(([^\(\)]|\([^\)]*\))*\))*\)/dgv,
              name: "constant.character.escape.vala"
            }
          ]
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.vala",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.vala"
            }
          ]
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.vala",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.vala"
            }
          ]
        },
        {
          match: /\/((\\\/)|([^\/]))*\/(?=\p{space}*[\n\)\,\.\;])/dgv,
          name: "string.regexp.vala"
        }
      ]
    },
    types: {
      patterns: [
        {
          match: /(?<=^|[^\.\@\p{L}\p{M}\p{N}\p{Pc}])(bool|double|float|unichar|char|uchar|int|uint|long|ulong|short|ushort|size_t|ssize_t|string|void|signal|int8|int16|int32|int64|uint8|uint16|uint32|uint64)\b/dgv,
          name: "storage.type.primitive.vala"
        },
        {
          match: /\b([A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
          name: "entity.name.type.vala"
        }
      ]
    },
    variables: {
      patterns: [
        {
          match: /\b([_a-z]+[\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
          name: "variable.other.vala"
        }
      ]
    }
  },
  dependencies: []
};
