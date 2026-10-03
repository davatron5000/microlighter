import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "nim",
  displayName: "Nim",
  scopeName: "source.nim",
  patterns: [
    {
      begin: /[\t ]*##\[/dgv,
      contentName: "comment.block.doc-comment.content.nim",
      end: /\]##/dgv,
      name: "comment.block.doc-comment.nim",
      patterns: [
        {
          include: "#multilinedoccomment",
          name: "comment.block.doc-comment.nested.nim"
        }
      ]
    },
    {
      begin: /[\t ]*#\[/dgv,
      contentName: "comment.block.content.nim",
      end: /\]#/dgv,
      name: "comment.block.nim",
      patterns: [
        {
          include: "#multilinecomment",
          name: "comment.block.nested.nim"
        }
      ]
    },
    {
      begin: /(^[\t ]+)?(?=##)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.nim" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /##/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.nim" }
          },
          end: /\n/dgv,
          name: "comment.line.number-sign.doc-comment.nim"
        }
      ]
    },
    {
      begin: /(^[\t ]+)?(?=#[^\[])/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.nim" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.nim" }
          },
          end: /\n/dgv,
          name: "comment.line.number-sign.nim"
        }
      ]
    },
    {
      name: "meta.proc.nim",
      patterns: [
        {
          begin: /\b(proc|method|template|macro|iterator|converter|func)\p{space}+`?([^\(\*\:\`\{\p{space}]*)`?(\p{space}*\*)?\p{space}*(?=[\n\(\:\=\[\{])/dgv,
          captures: {
            "1": { name: "keyword.other" },
            "2": { name: "entity.name.function.nim" },
            "3": { name: "keyword.control.export" }
          },
          end: /\)/dgv,
          patterns: [
            { include: "source.nim" }
          ]
        }
      ]
    },
    {
      begin: /discard """/dgv,
      end: /"""(?!")/dgv,
      name: "comment.line.discarded.nim"
    },
    { include: "#float_literal" },
    { include: "#integer_literal" },
    {
      match: /(?<=`)[^ \`]+(?=`)/dgv,
      name: "entity.name.function.nim"
    },
    {
      captures: {
        "1": { name: "keyword.control.export" }
      },
      match: /\b\p{space}*(\*)(?:\p{space}*(?=[\,\:])|\p{space}+(?==))/dgv
    },
    {
      captures: {
        "1": { name: "support.type.nim" },
        "2": { name: "keyword.control.export" }
      },
      match: /\b([A-Z][\p{L}\p{M}\p{N}\p{Pc}]+)(\*)/dgv
    },
    { include: "#string_literal" },
    {
      match: /\b(true|false|Inf|NegInf|NaN|nil)\b/dgv,
      name: "constant.language.nim"
    },
    {
      match: /\b(block|break|case|continue|do|elif|else|end|except|finally|for|if|raise|return|try|when|while|yield)\b/dgv,
      name: "keyword.control.nim"
    },
    {
      match: /\b((and|in|is|isnot|not|notin|or|xor))\b/dgv,
      name: "keyword.boolean.nim"
    },
    {
      match: /([\-\!\$\%\&\*\+\.\/\:\<-\@\\\^\~])+/dgv,
      name: "keyword.operator.nim"
    },
    {
      match: /\b((addr|asm??|atomic|bind|cast|const|converter|concept|defer|discard|distinct|div|enum|export|from|import|include|let|mod|mixin|object|of|ptr|ref|shl|shr|static|type|using|var|tuple|iterator|macro|func|method|proc|template))\b/dgv,
      name: "keyword.other.nim"
    },
    {
      match: /\b((generic|interface|lambda|out|shared))\b/dgv,
      name: "invalid.illegal.invalid-keyword.nim"
    },
    {
      match: /\b(new|await|assert|echo|defined|declared|newException|countup|countdown|high|low)\b/dgv,
      name: "keyword.other.common.function.nim"
    },
    {
      match: /\b(((u?int)(8|16|32|64)?)|float(32|64)?|bool|string|auto|cstring|char|byte|tobject|typedesc|stmt|expr|any|untyped|typed)\b/dgv,
      name: "storage.type.concrete.nim"
    },
    {
      match: /\b(range|array|seq|set|pointer)\b/dgv,
      name: "storage.type.generic.nim"
    },
    {
      match: /\b(openarray|varargs|void)\b/dgv,
      name: "storage.type.generic.nim"
    },
    {
      match: /\b[A-Z][0-9A-Z_]+\b/dgv,
      name: "support.constant.nim"
    },
    {
      match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]+\b/dgv,
      name: "support.type.nim"
    },
    {
      match: /\b[\p{L}\p{M}\p{N}\p{Pc}]+\b(?=(\[([\,0-9A-Z_a-z\p{space}])+\])?\()/dgv,
      name: "support.function.any-method.nim"
    },
    {
      match: /(?!(openarray|varargs|void|range|array|seq|set|pointer|new|await|assert|echo|defined|declared|newException|countup|countdown|high|low|((u?int)(8|16|32|64)?)|float(32|64)?|bool|string|auto|cstring|char|byte|tobject|typedesc|stmt|expr|any|untyped|typed|addr|asm??|atomic|bind|cast|const|converter|concept|defer|discard|distinct|div|enum|export|from|import|include|let|mod|mixin|object|of|ptr|ref|shl|shr|static|type|using|var|tuple|iterator|macro|func|method|proc|template|and|in|is|isnot|not|notin|or|xor|proc|method|template|macro|iterator|converter|func|true|false|Inf|NegInf|NaN|nil|block|break|case|continue|do|elif|else|end|except|finally|for|if|raise|return|try|when|while|yield)\b)[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}+(?!(and|in|is|isnot|not|notin|or|xor|[^"'-\+0-9A-Z_-z]+)\b)(?=["'-\+0-9A-Z_-z])/dgv,
      name: "support.function.any-method.nim"
    },
    {
      begin: /(^\p{space}*)?(?=\{\.emit: ?""")/dgv,
      beginCaptures: {
        "0": { name: "punctuation.whitespace.embedded.leading.nim" }
      },
      end: {
        G: [/(?!￿)(\p{space}*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "0": { name: "punctuation.whitespace.embedded.trailing.nim" }
      },
      patterns: [
        {
          begin: /\{\.(emit:) ?(""")/dgv,
          captures: {
            "1": { name: "keyword.other.nim" },
            "2": { name: "punctuation.section.embedded.begin.nim" }
          },
          contentName: "source.c",
          end: /(")""(?!")(\.?\})?/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.nim" },
            "1": { name: "source.c" }
          },
          name: "meta.embedded.block.c",
          patterns: [
            {
              begin: /`/dgv,
              end: /`/dgv,
              name: "keyword.operator.nim"
            },
            { include: "source.c" }
          ]
        }
      ]
    },
    {
      begin: /\{\./dgv,
      beginCaptures: {
        "0": { name: "punctuation.pragma.start.nim" }
      },
      end: /\.?\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.pragma.end.nim" }
      },
      patterns: [
        {
          begin: /\b(\p{Alpha}[\p{L}\p{M}\p{N}\p{Pc}]*)(?:\p{space}|\p{space}*:)/dgv,
          beginCaptures: {
            "1": { name: "meta.preprocessor.pragma.nim" }
          },
          end: /(?=\.?\}|,)/dgv,
          patterns: [
            { include: "source.nim" }
          ]
        },
        {
          begin: /\b(\p{Alpha}[\p{L}\p{M}\p{N}\p{Pc}]*)\(/dgv,
          beginCaptures: {
            "1": { name: "meta.preprocessor.pragma.nim" }
          },
          end: /\)/dgv,
          patterns: [
            { include: "source.nim" }
          ]
        },
        {
          captures: {
            "1": { name: "meta.preprocessor.pragma.nim" }
          },
          match: /\b(\p{Alpha}[\p{L}\p{M}\p{N}\p{Pc}]*)(?=\.?\}|,)/dgv
        },
        {
          begin: /\b(\p{Alpha}[\p{L}\p{M}\p{N}\p{Pc}]*)(""")/dgv,
          beginCaptures: {
            "1": { name: "meta.preprocessor.pragma.nim" },
            "2": { name: "punctuation.definition.string.begin.nim" }
          },
          end: /"""(?!")/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.nim" }
          },
          name: "string.quoted.triple.raw.nim"
        },
        {
          begin: /\b(\p{Alpha}[\p{L}\p{M}\p{N}\p{Pc}]*)(")/dgv,
          beginCaptures: {
            "1": { name: "meta.preprocessor.pragma.nim" },
            "2": { name: "punctuation.definition.string.begin.nim" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.nim" }
          },
          name: "string.quoted.double.raw.nim"
        },
        {
          begin: /\b(hint\[[\p{L}\p{M}\p{N}\p{Pc}]+\]):/dgv,
          beginCaptures: {
            "1": { name: "meta.preprocessor.pragma.nim" }
          },
          end: /(?=\.?\}|,)/dgv,
          patterns: [
            { include: "source.nim" }
          ]
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.comma.nim"
        }
      ]
    },
    {
      begin: /(^\p{space}*)?(?=asm """)/dgv,
      beginCaptures: {
        "0": { name: "punctuation.whitespace.embedded.leading.nim" }
      },
      end: {
        G: [/(?!￿)(\p{space}*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "0": { name: "punctuation.whitespace.embedded.trailing.nim" }
      },
      patterns: [
        {
          begin: /(asm) (""")/dgv,
          captures: {
            "1": { name: "keyword.other.nim" },
            "2": { name: "punctuation.section.embedded.begin.nim" }
          },
          contentName: "source.asm",
          end: /(")""(?!")/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.nim" },
            "1": { name: "source.asm" }
          },
          name: "meta.embedded.block.asm",
          patterns: [
            {
              begin: /`/dgv,
              end: /`/dgv,
              name: "keyword.operator.nim"
            },
            { include: "source.asm" }
          ]
        }
      ]
    },
    {
      captures: {
        "1": { name: "storage.type.function.nim" },
        "2": { name: "keyword.operator.nim" }
      },
      match: /(tmpl(i)?)(?=( (html|xml|js|css|glsl|md))?""")/dgv
    },
    {
      begin: /(^\p{space}*)?(?=html""")/dgv,
      beginCaptures: {
        "0": { name: "punctuation.whitespace.embedded.leading.nim" }
      },
      end: {
        G: [/(?!￿)(\p{space}*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "0": { name: "punctuation.whitespace.embedded.trailing.nim" }
      },
      patterns: [
        {
          begin: /(html)(""")/dgv,
          captures: {
            "1": { name: "keyword.other.nim" },
            "2": { name: "punctuation.section.embedded.begin.nim" }
          },
          contentName: "text.html",
          end: /(")""(?!")/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.nim" },
            "1": { name: "text.html" }
          },
          name: "meta.embedded.block.html",
          patterns: [
            {
              begin: /(?<!\$)(\$)\(/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)\{/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /\}/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)(for|while|case|of|when|if|else|elif)( )/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /([\n\{])/dgv,
              endCaptures: {
                "1": { name: "plain" }
              },
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              match: /(?<!\$)(\$[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
              name: "keyword.operator.nim"
            },
            { include: "text.html.basic" }
          ]
        }
      ]
    },
    {
      begin: /(^\p{space}*)?(?=xml""")/dgv,
      beginCaptures: {
        "0": { name: "punctuation.whitespace.embedded.leading.nim" }
      },
      end: {
        G: [/(?!￿)(\p{space}*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "0": { name: "punctuation.whitespace.embedded.trailing.nim" }
      },
      patterns: [
        {
          begin: /(xml)(""")/dgv,
          captures: {
            "1": { name: "keyword.other.nim" },
            "2": { name: "punctuation.section.embedded.begin.nim" }
          },
          contentName: "text.xml",
          end: /(")""(?!")/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.nim" },
            "1": { name: "text.xml" }
          },
          name: "meta.embedded.block.xml",
          patterns: [
            {
              begin: /(?<!\$)(\$)\(/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)\{/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /\}/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)(for|while|case|of|when|if|else|elif)( )/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /([\n\{])/dgv,
              endCaptures: {
                "1": { name: "plain" }
              },
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              match: /(?<!\$)(\$[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
              name: "keyword.operator.nim"
            },
            { include: "text.xml" }
          ]
        }
      ]
    },
    {
      begin: /(^\p{space}*)?(?=js""")/dgv,
      beginCaptures: {
        "0": { name: "punctuation.whitespace.embedded.leading.nim" }
      },
      end: {
        G: [/(?!￿)(\p{space}*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "0": { name: "punctuation.whitespace.embedded.trailing.nim" }
      },
      patterns: [
        {
          begin: /(js)(""")/dgv,
          captures: {
            "1": { name: "keyword.other.nim" },
            "2": { name: "punctuation.section.embedded.begin.nim" }
          },
          contentName: "source.js",
          end: /(")""(?!")/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.nim" },
            "1": { name: "source.js" }
          },
          name: "meta.embedded.block.js",
          patterns: [
            {
              begin: /(?<!\$)(\$)\(/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)\{/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /\}/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)(for|while|case|of|when|if|else|elif)( )/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /([\n\{])/dgv,
              endCaptures: {
                "1": { name: "plain" }
              },
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              match: /(?<!\$)(\$[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
              name: "keyword.operator.nim"
            },
            { include: "source.js" }
          ]
        }
      ]
    },
    {
      begin: /(^\p{space}*)?(?=css""")/dgv,
      beginCaptures: {
        "0": { name: "punctuation.whitespace.embedded.leading.nim" }
      },
      end: {
        G: [/(?!￿)(\p{space}*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "0": { name: "punctuation.whitespace.embedded.trailing.nim" }
      },
      patterns: [
        {
          begin: /(css)(""")/dgv,
          captures: {
            "1": { name: "keyword.other.nim" },
            "2": { name: "punctuation.section.embedded.begin.nim" }
          },
          contentName: "source.css",
          end: /(")""(?!")/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.nim" },
            "1": { name: "source.css" }
          },
          name: "meta.embedded.block.css",
          patterns: [
            {
              begin: /(?<!\$)(\$)\(/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)\{/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /\}/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)(for|while|case|of|when|if|else|elif)( )/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /([\n\{])/dgv,
              endCaptures: {
                "1": { name: "plain" }
              },
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              match: /(?<!\$)(\$[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
              name: "keyword.operator.nim"
            },
            { include: "source.css" }
          ]
        }
      ]
    },
    {
      begin: /(^\p{space}*)?(?=glsl""")/dgv,
      beginCaptures: {
        "0": { name: "punctuation.whitespace.embedded.leading.nim" }
      },
      end: {
        G: [/(?!￿)(\p{space}*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "0": { name: "punctuation.whitespace.embedded.trailing.nim" }
      },
      patterns: [
        {
          begin: /(glsl)(""")/dgv,
          captures: {
            "1": { name: "keyword.other.nim" },
            "2": { name: "punctuation.section.embedded.begin.nim" }
          },
          contentName: "source.glsl",
          end: /(")""(?!")/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.nim" },
            "1": { name: "source.glsl" }
          },
          name: "meta.embedded.block.glsl",
          patterns: [
            {
              begin: /(?<!\$)(\$)\(/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)\{/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /\}/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)(for|while|case|of|when|if|else|elif)( )/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /([\n\{])/dgv,
              endCaptures: {
                "1": { name: "plain" }
              },
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              match: /(?<!\$)(\$[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
              name: "keyword.operator.nim"
            },
            { include: "source.glsl" }
          ]
        }
      ]
    },
    {
      begin: /(^\p{space}*)?(?=md""")/dgv,
      beginCaptures: {
        "0": { name: "punctuation.whitespace.embedded.leading.nim" }
      },
      end: {
        G: [/(?!￿)(\p{space}*(?=\n?$)\n?)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n?)?", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "0": { name: "punctuation.whitespace.embedded.trailing.nim" }
      },
      patterns: [
        {
          begin: /(md)(""")/dgv,
          captures: {
            "1": { name: "keyword.other.nim" },
            "2": { name: "punctuation.section.embedded.begin.nim" }
          },
          contentName: "text.html.markdown",
          end: /(")""(?!")/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.nim" },
            "1": { name: "text.html.markdown" }
          },
          name: "meta.embedded.block.html.markdown",
          patterns: [
            {
              begin: /(?<!\$)(\$)\(/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)\{/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /\}/dgv,
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              begin: /(?<!\$)(\$)(for|while|case|of|when|if|else|elif)( )/dgv,
              captures: {
                "1": { name: "keyword.operator.nim" },
                "2": { name: "keyword.operator.nim" }
              },
              end: /([\n\{])/dgv,
              endCaptures: {
                "1": { name: "plain" }
              },
              patterns: [
                { include: "source.nim" }
              ]
            },
            {
              match: /(?<!\$)(\$[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
              name: "keyword.operator.nim"
            },
            { include: "text.html.markdown" }
          ]
        }
      ]
    }
  ],
  repository: {
    char_escapes: {
      patterns: [
        {
          match: /\\[CRcr]/dgv,
          name: "constant.character.escape.carriagereturn.nim"
        },
        {
          match: /\\[LNln]/dgv,
          name: "constant.character.escape.linefeed.nim"
        },
        {
          match: /\\[Ff]/dgv,
          name: "constant.character.escape.formfeed.nim"
        },
        {
          match: /\\[Tt]/dgv,
          name: "constant.character.escape.tabulator.nim"
        },
        {
          match: /\\[Vv]/dgv,
          name: "constant.character.escape.verticaltabulator.nim"
        },
        {
          match: /\\"/dgv,
          name: "constant.character.escape.double-quote.nim"
        },
        {
          match: /\\'/dgv,
          name: "constant.character.escape.single-quote.nim"
        },
        {
          match: /\\[0-9]+/dgv,
          name: "constant.character.escape.chardecimalvalue.nim"
        },
        {
          match: /\\[Aa]/dgv,
          name: "constant.character.escape.alert.nim"
        },
        {
          match: /\\[Bb]/dgv,
          name: "constant.character.escape.backspace.nim"
        },
        {
          match: /\\[Ee]/dgv,
          name: "constant.character.escape.escape.nim"
        },
        {
          match: /\\[Xx]\p{AHex}\p{AHex}/dgv,
          name: "constant.character.escape.hex.nim"
        },
        {
          match: /\\\\/dgv,
          name: "constant.character.escape.backslash.nim"
        }
      ]
    },
    extended_string_quoted_double_raw: {
      begin: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)(")/dgv,
      beginCaptures: {
        "1": { name: "support.function.any-method.nim" },
        "2": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.double.raw.nim",
      patterns: [
        { include: "#raw_string_escapes" }
      ]
    },
    extended_string_quoted_triple_raw: {
      begin: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)(""")/dgv,
      beginCaptures: {
        "1": { name: "support.function.any-method.nim" },
        "2": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.triple.raw.nim"
    },
    float_literal: {
      patterns: [
        {
          match: /\b\p{Nd}[_\p{Nd}]*((\.\p{Nd}[_\p{Nd}]*([Ee][\-\+]?\p{Nd}[_\p{Nd}]*)?)|([Ee][\-\+]?\p{Nd}[_\p{Nd}]*))('([Ff](32|64|128)|[DFdf]))?/dgv,
          name: "constant.numeric.float.decimal.nim"
        },
        {
          match: /\b0[Xx]\p{AHex}[_\p{AHex}]*'([Ff](32|64|128)|[DFdf])/dgv,
          name: "constant.numeric.float.hexadecimal.nim"
        },
        {
          match: /\b0o[0-7][0-7_]*'([Ff](32|64|128)|[DFdf])/dgv,
          name: "constant.numeric.float.octal.nim"
        },
        {
          match: /\b0([Bb])[01][01_]*'([Ff](32|64|128)|[DFdf])/dgv,
          name: "constant.numeric.float.binary.nim"
        },
        {
          match: /\b(\p{Nd}[_\p{Nd}]*)'([Ff](32|64|128)|[DFdf])/dgv,
          name: "constant.numeric.float.decimal.nim"
        }
      ]
    },
    fmt_interpolation: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.template-expression.begin.nim" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.nim" }
      },
      name: "meta.template.expression.nim",
      patterns: [
        {
          begin: /:/dgv,
          end: /(?=\})/dgv,
          name: "meta.template.format-specifier.nim"
        },
        { include: "source.nim" }
      ]
    },
    fmt_string: {
      begin: /\b(fmt)(")/dgv,
      beginCaptures: {
        "1": { name: "support.function.any-method.nim" },
        "2": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.double.raw.nim",
      patterns: [
        {
          match: /(?<!")"(?!")/dgv,
          name: "invalid.illegal.nim"
        },
        { include: "#raw_string_escapes" },
        { include: "#fmt_interpolation" }
      ]
    },
    fmt_string_call: {
      begin: /(fmt)\((?=")/dgv,
      beginCaptures: {
        "1": { name: "support.function.any-method.nim" }
      },
      end: /\)/dgv,
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.nim" }
          },
          end: /"(?=\))/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.nim" }
          },
          name: "string.quoted.double.nim",
          patterns: [
            {
              match: /"/dgv,
              name: "invalid.illegal.nim"
            },
            { include: "#string_escapes" },
            { include: "#fmt_interpolation" }
          ]
        }
      ]
    },
    fmt_string_operator: {
      begin: /(&)(")/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.nim" },
        "2": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.double.nim",
      patterns: [
        {
          match: /"/dgv,
          name: "invalid.illegal.nim"
        },
        { include: "#string_escapes" },
        { include: "#fmt_interpolation" }
      ]
    },
    fmt_string_triple: {
      begin: /\b(fmt)(""")/dgv,
      beginCaptures: {
        "1": { name: "support.function.any-method.nim" },
        "2": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.triple.raw.nim",
      patterns: [
        { include: "#fmt_interpolation" }
      ]
    },
    fmt_string_triple_operator: {
      begin: /(&)(""")/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.nim" },
        "2": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.triple.raw.nim",
      patterns: [
        { include: "#fmt_interpolation" }
      ]
    },
    integer_literal: {
      patterns: [
        {
          match: /\b(0[Xx]\p{AHex}[_\p{AHex}]*)('(([IUiu](8|16|32|64))|[Uu]))?/dgv,
          name: "constant.numeric.integer.hexadecimal.nim"
        },
        {
          match: /\b(0o[0-7][0-7_]*)('(([IUiu](8|16|32|64))|[Uu]))?/dgv,
          name: "constant.numeric.integer.octal.nim"
        },
        {
          match: /\b(0([Bb])[01][01_]*)('(([IUiu](8|16|32|64))|[Uu]))?/dgv,
          name: "constant.numeric.integer.binary.nim"
        },
        {
          match: /\b(\p{Nd}[_\p{Nd}]*)('(([IUiu](8|16|32|64))|[Uu]))?/dgv,
          name: "constant.numeric.integer.decimal.nim"
        }
      ]
    },
    multilinecomment: {
      begin: /#\[/dgv,
      end: /\]#/dgv,
      patterns: [
        { include: "#multilinecomment" }
      ]
    },
    multilinedoccomment: {
      begin: /##\[/dgv,
      end: /\]##/dgv,
      patterns: [
        { include: "#multilinedoccomment" }
      ]
    },
    raw_string_escapes: {
      captures: {
        "1": { name: "constant.character.escape.double-quote.nim" }
      },
      match: /[^"]("")/dgv
    },
    string_escapes: {
      patterns: [
        {
          match: /\\[Pp]/dgv,
          name: "constant.character.escape.newline.nim"
        },
        {
          match: /\\[Uu]\p{AHex}\p{AHex}\p{AHex}\p{AHex}/dgv,
          name: "constant.character.escape.hex.nim"
        },
        {
          match: /\\[Uu]\{\p{AHex}+\}/dgv,
          name: "constant.character.escape.hex.nim"
        },
        { include: "#char_escapes" }
      ]
    },
    string_literal: {
      patterns: [
        { include: "#fmt_string_triple" },
        { include: "#fmt_string_triple_operator" },
        { include: "#extended_string_quoted_triple_raw" },
        { include: "#string_quoted_triple_raw" },
        { include: "#fmt_string_operator" },
        { include: "#fmt_string" },
        { include: "#fmt_string_call" },
        { include: "#string_quoted_double_raw" },
        { include: "#extended_string_quoted_double_raw" },
        { include: "#string_quoted_single" },
        { include: "#string_quoted_triple" },
        { include: "#string_quoted_double" }
      ]
    },
    string_quoted_double: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.double.nim",
      patterns: [
        { include: "#string_escapes" }
      ]
    },
    string_quoted_double_raw: {
      begin: /\br"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.double.raw.nim",
      patterns: [
        { include: "#raw_string_escapes" }
      ]
    },
    string_quoted_single: {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.single.nim",
      patterns: [
        { include: "#char_escapes" },
        {
          match: /([^']{2,}?)/dgv,
          name: "invalid.illegal.character.nim"
        }
      ]
    },
    string_quoted_triple: {
      begin: /"""/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"""(?!")/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.triple.nim"
    },
    string_quoted_triple_raw: {
      begin: /r"""/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nim" }
      },
      end: /"""/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nim" }
      },
      name: "string.quoted.triple.raw.nim"
    }
  },
  dependencies: [
    "c",
    "html",
    "xml",
    "javascript",
    "css",
    "glsl",
    "markdown"
  ]
};
