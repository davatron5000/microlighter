export default {
  name: "vala",
  displayName: "Vala",
  scopeName: "source.vala",
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
          match: /(?<=^|[^\.\@\p{L}\p{M}\p{N}\p{Pc}])(as|do|if|in|is|not|or|and|for|get|new|out|ref|set|try|var|base|case|else|enum|lock|null|this|true|void|weak|async|break|catch|class|const|false|owned|throw|using|while|with|yield|delete|extern|inline|params|public|return|sealed|signal|sizeof|static|struct|switch|throws|typeof|unlock|default|dynamic|ensures|finally|foreach|private|unowned|virtual|abstract|continue|delegate|internal|override|requires|volatile|construct|interface|namespace|protected|errordomain)\b/dgv,
          name: "keyword.vala"
        },
        {
          match: /(?<=^|[^\.\@\p{L}\p{M}\p{N}\p{Pc}])(bool|double|float|unichar2??|char|uchar|int|uint|long|ulong|short|ushort|size_t|ssize_t|string|string16|string32|void|signal|int8|int16|int32|int64|uint8|uint16|uint32|uint64|va_list|time_t)\b/dgv,
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
          match: /(?<=^|[^\.\@\p{L}\p{M}\p{N}\p{Pc}])(bool|double|float|unichar2??|char|uchar|int|uint|long|ulong|short|ushort|size_t|ssize_t|string|string16|string32|void|signal|int8|int16|int32|int64|uint8|uint16|uint32|uint64|va_list|time_t)\b/dgv,
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
