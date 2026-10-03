export default {
  name: "zig",
  displayName: "Zig",
  scopeName: "source.zig",
  patterns: [
    { include: "#comments" },
    { include: "#strings" },
    { include: "#keywords" },
    { include: "#operators" },
    { include: "#punctuation" },
    { include: "#numbers" },
    { include: "#support" },
    { include: "#variables" }
  ],
  repository: {
    commentContents: {
      patterns: [
        {
          match: /\b(TODO|FIXME|XXX|NOTE)\b:?/dgv,
          name: "keyword.todo.zig"
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /\/\/[\!\/](?=[^\/])/dgv,
          end: /(?=\n?$)/dgv,
          name: "comment.line.documentation.zig",
          patterns: [
            { include: "#commentContents" }
          ]
        },
        {
          begin: /\/\//dgv,
          end: /(?=\n?$)/dgv,
          name: "comment.line.double-slash.zig",
          patterns: [
            { include: "#commentContents" }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\binline\b(?!\p{space}*\bfn\b)/dgv,
          name: "keyword.control.repeat.zig"
        },
        {
          match: /\b(while|for)\b/dgv,
          name: "keyword.control.repeat.zig"
        },
        {
          match: /\b(extern|packed|export|pub|noalias|inline|comptime|volatile|align|linksection|threadlocal|allowzero|noinline|callconv)\b/dgv,
          name: "keyword.storage.zig"
        },
        {
          match: /\b(struct|enum|union|opaque)\b/dgv,
          name: "keyword.structure.zig"
        },
        {
          match: /\b(asm|unreachable)\b/dgv,
          name: "keyword.statement.zig"
        },
        {
          match: /\b(break|return|continue|defer|errdefer)\b/dgv,
          name: "keyword.control.flow.zig"
        },
        {
          match: /\b(resume|suspend|nosuspend)\b/dgv,
          name: "keyword.control.async.zig"
        },
        {
          match: /\b(try|catch)\b/dgv,
          name: "keyword.control.trycatch.zig"
        },
        {
          match: /\b(if|else|switch|orelse)\b/dgv,
          name: "keyword.control.conditional.zig"
        },
        {
          match: /\b(null|undefined)\b/dgv,
          name: "keyword.constant.default.zig"
        },
        {
          match: /\b(true|false)\b/dgv,
          name: "keyword.constant.bool.zig"
        },
        {
          match: /\b(test|and|or)\b/dgv,
          name: "keyword.default.zig"
        },
        {
          match: /\b(bool|void|noreturn|type|error|anyerror|anyframe|anytype|anyopaque)\b/dgv,
          name: "keyword.type.zig"
        },
        {
          match: /\b(f16|f32|f64|f80|f128|u\p{Nd}+|i\p{Nd}+|isize|usize|comptime_int|comptime_float)\b/dgv,
          name: "keyword.type.integer.zig"
        },
        {
          match: /\b(c_(?:char|short|ushort|int|uint|long|ulong|longlong|ulonglong|longdouble))\b/dgv,
          name: "keyword.type.c.zig"
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /\b0x\p{AHex}[_\p{AHex}]*(\.\p{AHex}[_\p{AHex}]*)?([Pp][\-\+]?[_\p{AHex}]+)?\b/dgv,
          name: "constant.numeric.hexfloat.zig"
        },
        {
          match: /\b[0-9][0-9_]*(\.[0-9][0-9_]*)?([Ee][\-\+]?[0-9_]+)?\b/dgv,
          name: "constant.numeric.float.zig"
        },
        {
          match: /\b[0-9][0-9_]*\b/dgv,
          name: "constant.numeric.decimal.zig"
        },
        {
          match: /\b0x[_\p{AHex}]+\b/dgv,
          name: "constant.numeric.hexadecimal.zig"
        },
        {
          match: /\b0o[0-7_]+\b/dgv,
          name: "constant.numeric.octal.zig"
        },
        {
          match: /\b0b[01_]+\b/dgv,
          name: "constant.numeric.binary.zig"
        },
        {
          match: /\b[0-9](([EPep][\-\+])|[0-9A-Z_a-z])*(\.(([EPep][\-\+])|[0-9A-Z_a-z])*)?([EPep][\-\+])?[0-9A-Z_a-z]*\b/dgv,
          name: "constant.numeric.invalid.zig"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /(?<=\[)\*c(?=\])/dgv,
          name: "keyword.operator.c-pointer.zig"
        },
        {
          match: /\b((and|or))\b|(==|!=|<=|>=|[\<\>])/dgv,
          name: "keyword.operator.comparison.zig"
        },
        {
          match: /(-%?|\+%?|\*%?|[\%\/])=?/dgv,
          name: "keyword.operator.arithmetic.zig"
        },
        {
          match: /(<<%?|>>|[\!\&\^\|\~])=?/dgv,
          name: "keyword.operator.bitwise.zig"
        },
        {
          match: /(==|\+\+|\*\*|->)/dgv,
          name: "keyword.operator.special.zig"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.zig"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.question.zig"
        }
      ]
    },
    punctuation: {
      patterns: [
        {
          match: /\./dgv,
          name: "punctuation.accessor.zig"
        },
        {
          match: /,/dgv,
          name: "punctuation.comma.zig"
        },
        {
          match: /:/dgv,
          name: "punctuation.separator.key-value.zig"
        },
        {
          match: /;/dgv,
          name: "punctuation.terminator.statement.zig"
        }
      ]
    },
    stringcontent: {
      patterns: [
        {
          match: /\\(["'\\nrt]|(x\p{AHex}{2})|(u\{\p{AHex}+\}))/dgv,
          name: "constant.character.escape.zig"
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.unrecognized-string-escape.zig"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.zig",
          patterns: [
            { include: "#stringcontent" }
          ]
        },
        {
          begin: /\\\\/dgv,
          end: /(?=\n?$)/dgv,
          name: "string.multiline.zig"
        },
        {
          match: /'([^'\\]|\\(x\p{AHex}{2}|[012][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|[^\n]))'/dgv,
          name: "string.quoted.single.zig"
        }
      ]
    },
    support: {
      patterns: [
        {
          match: /@[A-Z_a-z][0-9A-Z_a-z]*/dgv,
          name: "support.function.builtin.zig"
        }
      ]
    },
    variables: {
      patterns: [
        {
          name: "meta.function.declaration.zig",
          patterns: [
            {
              captures: {
                "1": { name: "storage.type.function.zig" },
                "2": { name: "entity.name.type.zig" }
              },
              match: /\b(fn)\p{space}+([A-Z][0-9A-Za-z]*)\b/dgv
            },
            {
              captures: {
                "1": { name: "storage.type.function.zig" },
                "2": { name: "entity.name.function.zig" }
              },
              match: /\b(fn)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\b/dgv
            },
            {
              begin: /\b(fn)\p{space}+@"/dgv,
              beginCaptures: {
                "1": { name: "storage.type.function.zig" }
              },
              end: /"/dgv,
              name: "entity.name.function.string.zig",
              patterns: [
                { include: "#stringcontent" }
              ]
            },
            {
              match: /\b(const|var|fn)\b/dgv,
              name: "keyword.default.zig"
            }
          ]
        },
        {
          name: "meta.function.call.zig",
          patterns: [
            {
              match: /([A-Z][0-9A-Za-z]*)(?=\p{space}*\()/dgv,
              name: "entity.name.type.zig"
            },
            {
              match: /([A-Z_a-z][0-9A-Z_a-z]*)(?=\p{space}*\()/dgv,
              name: "entity.name.function.zig"
            }
          ]
        },
        {
          name: "meta.variable.zig",
          patterns: [
            {
              match: /\b[A-Z_a-z][0-9A-Z_a-z]*\b/dgv,
              name: "variable.zig"
            },
            {
              begin: /@"/dgv,
              end: /"/dgv,
              name: "variable.string.zig",
              patterns: [
                { include: "#stringcontent" }
              ]
            }
          ]
        }
      ]
    }
  },
  dependencies: []
};
