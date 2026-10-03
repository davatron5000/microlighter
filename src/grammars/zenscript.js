export default {
  name: "zenscript",
  displayName: "ZenScript",
  scopeName: "source.zenscript",
  patterns: [
    {
      match: /\b((0([Xx])\p{AHex}*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)([DFLUdflu]|UL|ul)?\b/dgv,
      name: "constant.numeric.zenscript"
    },
    {
      match: /\b-?(0[BOXbox])(0|[1-9A-Fa-f][_\p{AHex}]*)[A-Z_a-z]*\b/dgv,
      name: "constant.numeric.zenscript"
    },
    { include: "#code" },
    {
      match: /\b((?:[a-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*)(?=\[)/dgv,
      name: "storage.type.object.array.zenscript"
    }
  ],
  repository: {
    brackets: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.zenscript" },
            "2": { name: "keyword.other.zenscript" },
            "3": { name: "keyword.control.zenscript" },
            "4": { name: "variable.other.zenscript" },
            "5": { name: "keyword.control.zenscript" },
            "6": { name: "constant.numeric.zenscript" },
            "7": { name: "keyword.control.zenscript" }
          },
          match: /(<)\b([^\n]*?)(:([^\n]*?(:(\*|\p{Nd}+)?)?)?)(>)/dgv,
          name: "keyword.other.zenscript"
        }
      ]
    },
    class: {
      captures: {
        "1": { name: "storage.type.zenscript" },
        "2": { name: "entity.name.type.class.zenscript" }
      },
      match: /(zenClass)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      name: "meta.class.zenscript"
    },
    code: {
      patterns: [
        { include: "#class" },
        { include: "#functions" },
        { include: "#dots" },
        { include: "#quotes" },
        { include: "#brackets" },
        { include: "#comments" },
        { include: "#var" },
        { include: "#keywords" },
        { include: "#constants" },
        { include: "#operators" }
      ]
    },
    comments: {
      patterns: [
        {
          match: /\/\/[^\n]*/dgv,
          name: "comment.line.double=slash"
        },
        {
          begin: /\/\*/dgv,
          beginCaptures: {
            "0": { name: "comment.block" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "comment.block" }
          },
          name: "comment.block"
        }
      ]
    },
    dots: {
      captures: {
        "1": { name: "storage.type.zenscript" },
        "2": { name: "keyword.control.zenscript" },
        "5": { name: "keyword.control.zenscript" }
      },
      match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)(\.)([\p{L}\p{M}\p{N}\p{Pc}]+)((\.)([\p{L}\p{M}\p{N}\p{Pc}]+))*/dgv,
      name: "plain.text.zenscript"
    },
    functions: {
      captures: {
        "0": { name: "storage.type.function.zenscript" },
        "1": { name: "entity.name.function.zenscript" }
      },
      match: /function\p{space}+([\$A-Z_a-z][\$\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?=\()/dgv,
      name: "meta.function.zenscript"
    },
    keywords: {
      patterns: [
        {
          match: /\b(instanceof|get|implements|set|import|function|override|const|if|else|do|while|for|throw|panic|lock|try|catch|finally|return|break|continue|switch|case|default|in|is|as|match|throws|super|new)\b/dgv,
          name: "keyword.control.zenscript"
        },
        {
          match: /\b(zenClass|zenConstructor|alias|class|interface|enum|struct|expand|variant|set|void|bool|byte|sbyte|short|ushort|int|uint|long|ulong|usize|float|double|char|string)\b/dgv,
          name: "storage.type.zenscript"
        },
        {
          match: /\b(variant|abstract|final|private|public|export|internal|static|protected|implicit|virtual|extern|immutable)\b/dgv,
          name: "storage.modifier.zenscript"
        },
        {
          match: /\b(Native|Precondition)\b/dgv,
          name: "entity.other.attribute-name"
        },
        {
          match: /\b(null|true|false)\b/dgv,
          name: "constant.language"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /\b(\.\.??|\.\.\.|[\+\,]|\+=|\+\+|-=??|--|~=??|\*=??|\/=??|%=??|\|=??|\|\||&=??|&&|\^=??|\?\.??|\?\?|<=??|<<=??|>=??|>>=??|>>>=??|=>?|===??|!=??|!==|[\$\`])\b/dgv,
          name: "keyword.control"
        },
        {
          match: /\b([\:\;])\b/dgv,
          name: "keyword.control"
        }
      ]
    },
    quotes: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.zenscript" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.zenscript" }
          },
          name: "string.quoted.double.zenscript",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.zenscript"
            }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.zenscript" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.zenscript" }
          },
          name: "string.quoted.single.zenscript",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.zenscript"
            }
          ]
        }
      ]
    },
    var: {
      match: /\b(va[lr])\b/dgv,
      name: "storage.type"
    }
  },
  dependencies: []
};
