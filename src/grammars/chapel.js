import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "chapel",
  displayName: "Chapel",
  aliases: [
    "chpl"
  ],
  scopeName: "source.chapel",
  patterns: [
    { include: "#extern_block" },
    { include: "#comments" },
    { include: "#strings" },
    { include: "#keywords" },
    { include: "#constants" },
    { include: "#variables" },
    { include: "#important_globals" },
    { include: "#operators" },
    { include: "#attributes" }
  ],
  repository: {
    attributes: {
      patterns: [
        {
          match: /(@[A-Z_a-z][0-9A-Z_a-z]*(?:\.[A-Z_a-z][0-9A-Z_a-z]*)?)/dgv,
          name: "storage.type.attribute.chapel"
        }
      ]
    },
    blockcomments: {
      patterns: [
        {
          captures: {
            "1": { name: "meta.toc-list.banner.block.chapel" }
          },
          match: /^\/\* =(\p{space}*[^\n]*?)\p{space}*= \*\/(?=\n?$)\n?/dgv,
          name: "comment.block.chapel"
        },
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.chapel" }
          },
          end: /\*\//dgv,
          name: "comment.block.chapel",
          patterns: [
            { include: "#blockcomments" }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        { include: "#blockcomments" },
        {
          match: /\*\/[^\n]*\n/dgv,
          name: "invalid.illegal.stray-comment-end.chapel"
        },
        {
          captures: {
            "1": { name: "meta.toc-list.banner.line.chapel" }
          },
          match: /^\/\/ =(\p{space}*[^\n]*?)\p{space}*=\p{space}*(?=\n?$)\n?/dgv,
          name: "comment.line.banner.c++"
        },
        {
          begin: /\/\//dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.chapel" }
          },
          end: /(?=\n?$)\n?/dgv,
          name: "comment.line.double-slash.chapel",
          patterns: [
            {
              match: new EmulatedRegExp("(?:(?=(\\\\\\p{space}*\\n))\\1)", "dgv", { hiddenCaptures: [1] }),
              name: "punctuation.separator.continuation.chapel"
            }
          ]
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b(true|false|nil|none)\b/dgv,
          name: "constant.language.chapel"
        },
        { include: "#integers" },
        { include: "#floats" }
      ]
    },
    extern_block: {
      patterns: [
        {
          begin: /\b(extern)\p{space}*(?<!\{)\{(?!\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.chapel" }
          },
          end: /(?<!\})\}(?!\})/dgv,
          name: "meta.extern.chapel",
          patterns: [
            { include: "source.c" }
          ]
        }
      ]
    },
    floats: {
      patterns: [
        {
          match: /\.([0-9][0-9_]*)([Ee]([\-\+])?([0-9][0-9_]*))?i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b([0-9][0-9_]*)\.([0-9][0-9_]*)([Ee]([\-\+])?([0-9][0-9_]*))?i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b([0-9][0-9_]*)\.([Ee]([\-\+])?([0-9][0-9_]*))i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b([0-9][0-9_]*)([Ee]([\-\+])?([0-9][0-9_]*))i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b0[Xx](\p{AHex}[_\p{AHex}]*)?\.(\p{AHex}[_\p{AHex}]*)([Pp]([\-\+])?(\p{AHex}[_\p{AHex}]*))?i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b0[Xx](\p{AHex}[_\p{AHex}]*)\.([Pp]([\-\+])?(\p{AHex}[_\p{AHex}]*))i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b0[Xx](\p{AHex}[_\p{AHex}]*)([Pp]([\-\+])?(\p{AHex}[_\p{AHex}]*))i?\b/dgv,
          name: "constant.numeric.chapel"
        }
      ]
    },
    important_globals: {
      patterns: [
        {
          match: /\b(here|LocaleSpace|Locales|numLocales)\b/dgv,
          name: "support.variable.chapel"
        }
      ]
    },
    integers: {
      patterns: [
        {
          match: /\b([0-9][0-9_]*)i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b(0[Xx]\p{AHex}[_\p{AHex}]*)i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b(0[Bb][01][01_]*)i?\b/dgv,
          name: "constant.numeric.chapel"
        },
        {
          match: /\b(0[Oo][0-7][0-7_]*)i?\b/dgv,
          name: "constant.numeric.chapel"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(align|as|atomic|begin|break|by|catch|class|cobegin|coforall|deinit|continue|defer|delete|dmapped|do|else|enum|except|export|extern|for|forall|foreach|forwarding|if|import|in|include|index|init=??|inline|inout|interface|implements|iter|label|lambda|let|lifetime|local|manage|module|new|noinit|on|only|operator|otherwise|out|override|postinit|__primitive|pragma|private|proc|prototype|public|record|reduce|require|return|scan|select|serial|then|these|throws??|try|union|use|when|where|while|with|yield|zip)\b/dgv,
          name: "keyword.control.chapel"
        },
        {
          match: /\b(bool|bytes|complex|dmap|domain|imag|int|locale|nothing|opaque|range|real|string|subdomain|tuple|uint|void)\b/dgv,
          name: "storage.type.chapel"
        },
        {
          match: /\b(borrowed|config|const|owned|param|private|public|ref|shared|sparse|sync|type|unmanaged|var)\b/dgv,
          name: "storage.modifier.chapel"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /<=|>=|==|[\<\>]|!=/dgv,
          name: "keyword.operator.comparison.chapel"
        },
        {
          match: /\+=|-=|\*=|\/=|%=|&=|(\|=)|\^=|>>=|<<=|\*\*=/dgv,
          name: "keyword.operator.assignment.augmented.chapel"
        },
        {
          match: /[\-\*\+]|\*\*|[\%\/]|<<|>>|&|(\|)|[\^\~]|<=>|\.\.<|#|\.\.\.?/dgv,
          name: "keyword.operator.arithmetic.chapel"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.chapel"
        },
        {
          match: /[\!\:\?]|->/dgv,
          name: "keyword.operator.others.chapel"
        },
        {
          match: /[\]\[]|=>/dgv,
          name: "keyword.operator.domain.chapel"
        }
      ]
    },
    string_escapes: {
      patterns: [
        {
          match: /\\(["'\?\\abefnprtv]|[0-3]\p{Nd}{0,2}|[4-7]\p{Nd}?|x\p{AHex}{0,2}|u\p{AHex}{0,4}|U\p{AHex}{0,8})/dgv,
          name: "constant.character.escape.chapel"
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.unknown-escape.chapel"
        }
      ]
    },
    string_format: {
      patterns: [
        {
          match: /(%\?)/dgv,
          name: "constant.other.placeholder.chapel"
        },
        {
          match: /(%\{(#+|#+\.#*|#*\.#+)\})/dgv,
          name: "constant.other.placeholder.chapel"
        },
        {
          match: /(%\{([^\n]*?)\})/dgv,
          name: "constant.other.placeholder.chapel"
        },
        {
          match: /(%([\+0\<\>\@\^])*(\*|[0-9]+)?(\.[0-9]*)?(?:[Xbdhjox]|\\?["']S)?[Ee]?([Scimnrsuz]|(\{([^\n]S|\*S|[^\n]S[^\n])\})|(\/[^\n]*\/)|(\{\/[^\n]*\/[A-Za-z]+\}))?)/dgv,
          name: "constant.other.placeholder.chapel"
        },
        {
          match: /(%%)/dgv,
          name: "constant.other.placeholder.chapel"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /"""/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.chapel" }
          },
          end: /"""/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.chapel" }
          },
          name: "string.quoted.double.multi.chapel",
          patterns: [
            { include: "#string_escapes" },
            { include: "#string_format" }
          ]
        },
        {
          begin: /'''/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.chapel" }
          },
          end: /'''/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.chapel" }
          },
          name: "string.quoted.single.multi.chapel",
          patterns: [
            { include: "#string_escapes" },
            { include: "#string_format" }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.chapel" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.chapel" }
          },
          name: "string.quoted.double.chapel",
          patterns: [
            { include: "#string_escapes" },
            { include: "#string_format" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.chapel" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.chapel" }
          },
          name: "string.quoted.single.chapel",
          patterns: [
            { include: "#string_escapes" },
            { include: "#string_format" }
          ]
        }
      ]
    },
    variables: {
      patterns: [
        {
          match: /\b(this|super)\b/dgv,
          name: "variable.language.chapel"
        }
      ]
    }
  },
  dependencies: [
    "c"
  ]
};
