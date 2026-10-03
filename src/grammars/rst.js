export default {
  name: "rst",
  displayName: "reStructuredText",
  scopeName: "source.rst",
  patterns: [
    { include: "#body" }
  ],
  repository: {
    anchor: {
      match: /^\.{2}\p{space}+(_[^\:]+:)\p{space}*/dgv,
      name: "entity.name.tag.anchor"
    },
    block: {
      begin: /^(\p{space}*)(\.{2}\p{space}+\P{space}+::)([^\n]*)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "3": { name: "variable" }
      },
      end: /^(?!1\p{space}|\p{space}*(?=\n?$))/dgv,
      patterns: [
        { include: "#block-param" },
        { include: "#body" }
      ]
    },
    "block-comment": {
      begin: /^(\p{space}*)\.{2}(\p{space}+|(?=\n?$))/dgv,
      end: /^(?:(?=\P{space})|\p{space}*(?=\n?$))/dgv,
      name: "comment.block",
      patterns: [
        {
          begin: /^\p{space}{3,}(?=\P{space})/dgv,
          name: "comment.block",
          while: /^(?:\p{space}{3}[^\n]*|\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    "block-param": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control" },
            "2": { name: "variable.parameter" }
          },
          match: /(:param\p{space}+([^\n]+?):)(?:\p{space}|(?=\n?$))/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control" },
            "2": {
              patterns: [
                {
                  match: /\b(0x[A-Fa-f\p{Nd}]+|\p{Nd}+)\b/dgv,
                  name: "constant.numeric"
                },
                { include: "#inline-markup" }
              ]
            }
          },
          match: /(:[^\n]+?:)(?:(?=\n?$)|\p{space}+([^\n]*))/dgv
        }
      ]
    },
    blocks: {
      patterns: [
        { include: "#domains" },
        { include: "#doctest" },
        { include: "#code-block-cpp" },
        { include: "#code-block-py" },
        { include: "#code-block-console" },
        { include: "#code-block-javascript" },
        { include: "#code-block-yaml" },
        { include: "#code-block-cmake" },
        { include: "#code-block-kconfig" },
        { include: "#code-block-ruby" },
        { include: "#code-block-dts" },
        { include: "#code-block" },
        { include: "#doctest-block" },
        { include: "#raw-html" },
        { include: "#block" },
        { include: "#literal-block" },
        { include: "#block-comment" }
      ]
    },
    body: {
      patterns: [
        { include: "#title" },
        { include: "#inline-markup" },
        { include: "#anchor" },
        { include: "#line-block" },
        { include: "#replace-include" },
        { include: "#footnote" },
        { include: "#substitution" },
        { include: "#blocks" },
        { include: "#table" },
        { include: "#simple-table" },
        { include: "#options-list" }
      ]
    },
    bold: {
      begin: /(?<=["'\(\<\[\{\p{space}]|^)\*{2}[^\*\p{space}]/dgv,
      end: /\*{2}|^\p{space}*(?=\n?$)/dgv,
      name: "markup.bold"
    },
    citation: {
      applyEndPatternLast: 0,
      begin: /(?<=["'\(\<\[\{\p{space}]|^)`[^\`\p{space}]/dgv,
      end: /`_{0,2}|^\p{space}*(?=\n?$)/dgv,
      name: "entity.name.tag"
    },
    "code-block": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" }
      },
      patterns: [
        { include: "#block-param" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-cmake": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*(cmake)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.cmake" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.cmake" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-console": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*(console|shell|bash)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.console" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.shell" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-cpp": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*(c|c\+\+|cpp|C|C\+\+|CPP|Cpp)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.cpp" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.cpp" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-dts": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*(dts|DTS|devicetree)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.dts" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.dts" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-javascript": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*(javascript)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.js" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.js" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-kconfig": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*([Kk]config)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.kconfig" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.kconfig" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-py": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*(python)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.py" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.python" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-ruby": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*(ruby)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.ruby" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.ruby" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "code-block-yaml": {
      begin: /^(\p{space}*)(\.{2}\p{space}+(code(?:|-block))::)\p{space}*(ya?ml)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "4": { name: "variable.parameter.codeblock.yaml" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.yaml" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    doctest: {
      begin: /^(>>>)\p{space}*([^\n]*)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control" },
        "2": {
          patterns: [
            { include: "source.python" }
          ]
        }
      },
      end: /^\p{space}*(?=\n?$)/dgv
    },
    "doctest-block": {
      begin: /^(\p{space}*)(\.{2}\p{space}+doctest::)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "source.python" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "domain-auto": {
      begin: /^(\p{space}*)(\.{2}\p{space}+auto(?:class|module|exception|function|decorator|data|method|attribute|property)::)\p{space}*([^\n]*)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control.py" },
        "3": {
          patterns: [
            { include: "source.python" }
          ]
        }
      },
      patterns: [
        { include: "#block-param" },
        { include: "#body" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "domain-cpp": {
      begin: /^(\p{space}*)(\.{2}\p{space}+c(?:pp|):(?:class|struct|function|member|var|type|enum|enum-struct|enum-class|enumerator|union|concept)::)\p{space}*(?:(@[\p{L}\p{M}\p{N}\p{Pc}]+)|([^\n]*))/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "3": { name: "entity.name.tag" },
        "4": {
          patterns: [
            { include: "source.cpp" }
          ]
        }
      },
      patterns: [
        { include: "#block-param" },
        { include: "#body" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    "domain-js": {
      begin: /^(\p{space}*)(\.{2}\p{space}+js:[\p{L}\p{M}\p{N}\p{Pc}]+::)\p{space}*([^\n]*)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "3": {
          patterns: [
            { include: "source.js" }
          ]
        }
      },
      end: /^(?!1[\t ]|(?=\n?$))/dgv,
      patterns: [
        { include: "#block-param" },
        { include: "#body" }
      ]
    },
    "domain-py": {
      begin: /^(\p{space}*)(\.{2}\p{space}+py:(?:module|function|data|exception|class|attribute|property|method|staticmethod|classmethod|decorator|decoratormethod)::)\p{space}*([^\n]*)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "3": {
          patterns: [
            { include: "source.python" }
          ]
        }
      },
      patterns: [
        { include: "#block-param" },
        { include: "#body" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    domains: {
      patterns: [
        { include: "#domain-cpp" },
        { include: "#domain-py" },
        { include: "#domain-auto" },
        { include: "#domain-js" }
      ]
    },
    escaped: {
      match: /\\[^\n]/dgv,
      name: "constant.character.escape"
    },
    footnote: {
      match: /^\p{space}*\.{2}\p{space}+\[(?:[\-\.\p{L}\p{M}\p{N}\p{Pc}]+|[\#\*]|#[\p{L}\p{M}\p{N}\p{Pc}]+)\]\p{space}+/dgv,
      name: "entity.name.tag"
    },
    "footnote-ref": {
      match: /\[(?:[\-\.\p{L}\p{M}\p{N}\p{Pc}]+|[\#\*])\]_/dgv,
      name: "entity.name.tag"
    },
    ignore: {
      patterns: [
        {
          match: /'[\*\`]+'/dgv
        },
        {
          match: /<[\*\`]+>/dgv
        },
        {
          match: /\{[\*\`]+\}/dgv
        },
        {
          match: /\([\*\`]+\)/dgv
        },
        {
          match: /\[[\*\`]+\]/dgv
        },
        {
          match: /"[\*\`]+"/dgv
        }
      ]
    },
    "inline-markup": {
      patterns: [
        { include: "#escaped" },
        { include: "#ignore" },
        { include: "#ref" },
        { include: "#literal" },
        { include: "#monospaced" },
        { include: "#citation" },
        { include: "#bold" },
        { include: "#italic" },
        { include: "#list" },
        { include: "#macro" },
        { include: "#reference" },
        { include: "#footnote-ref" }
      ]
    },
    italic: {
      begin: /(?<=["'\(\<\[\{\p{space}]|^)\*[^\*\p{space}]/dgv,
      end: /\*|^\p{space}*(?=\n?$)/dgv,
      name: "markup.italic"
    },
    "line-block": {
      match: /^\|\p{space}+/dgv,
      name: "keyword.control"
    },
    list: {
      match: /^\p{space}*(\p{Nd}+\.|\* -|[\#A-Za-z]\.|[CIMVXcimvx]+\.|\(\p{Nd}+\)|\p{Nd}+\)|[\-\*\+])\p{space}+/dgv,
      name: "keyword.control"
    },
    literal: {
      captures: {
        "1": { name: "keyword.control" },
        "2": { name: "entity.name.tag" }
      },
      match: /(:\P{space}+:)(`[^\n]*?`\\?)/dgv
    },
    "literal-block": {
      begin: /^(\p{space}*)([^\n]*)(::)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": {
          patterns: [
            { include: "#inline-markup" }
          ]
        },
        "3": { name: "keyword.control" }
      },
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    macro: {
      match: /\|[^\|]+\|/dgv,
      name: "entity.name.tag"
    },
    monospaced: {
      begin: /(?<=["'\(\<\[\{\p{space}]|^)``[^\`\p{space}]/dgv,
      end: /``|^\p{space}*(?=\n?$)/dgv,
      name: "string.interpolated"
    },
    "options-list": {
      match: /(?:(?:^|,\p{space}+)(?:[\-\+][\p{L}\p{M}\p{N}\p{Pc}]|--?[A-Za-z][\-\p{L}\p{M}\p{N}\p{Pc}]+|\/[\p{L}\p{M}\p{N}\p{Pc}]+)(?:[ \=](?:[\p{L}\p{M}\p{N}\p{Pc}]+|<[^\<\>]+?>))?)+(?=  |\t|(?=\n?$))/dgv,
      name: "variable.parameter"
    },
    "raw-html": {
      begin: /^(\p{space}*)(\.{2}\p{space}+raw\p{space}*::)\p{space}+(html)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "2": { name: "keyword.control" },
        "3": { name: "variable.parameter.html" }
      },
      patterns: [
        { include: "#block-param" },
        { include: "text.html.derivative" }
      ],
      while: /^(?:1(?=\p{space})|\p{space}*(?=\n?$))/dgv
    },
    ref: {
      begin: /(:ref:)`/dgv,
      beginCaptures: {
        "1": { name: "keyword.control" }
      },
      end: /`|^\p{space}*(?=\n?$)/dgv,
      name: "entity.name.tag",
      patterns: [
        {
          match: /<[^\n]*?>/dgv,
          name: "markup.underline.link"
        }
      ]
    },
    reference: {
      match: /[\-\p{L}\p{M}\p{N}\p{Pc}]*[\-A-Za-z\p{Nd}]__?\b/dgv,
      name: "entity.name.tag"
    },
    "replace-include": {
      captures: {
        "1": { name: "keyword.control" },
        "2": { name: "entity.name.tag" },
        "3": { name: "keyword.control" }
      },
      match: /^\p{space}*(\.{2})\p{space}+(\|[^\|]+\|)\p{space}+(replace::)/dgv
    },
    "simple-table": {
      match: /^[\=\p{space}]+(?=\n?$)/dgv,
      name: "keyword.control.table"
    },
    substitution: {
      match: /^\.{2}\p{space}*\|([^\|]+)\|/dgv,
      name: "entity.name.tag"
    },
    table: {
      begin: /^\p{space}*\+[\-\+\=]+\+\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.table" }
      },
      end: /^(?![\+\|])/dgv,
      patterns: [
        {
          match: /[\-\+\=\|]/dgv,
          name: "keyword.control.table"
        }
      ]
    },
    title: {
      match: /^(\*{3,}|#{3,}|={3,}|~{3,}|\+{3,}|-{3,}|`{3,}|\^{3,}|:{3,}|"{3,}|_{3,}|'{3,})(?=\n?$)/dgv,
      name: "markup.heading"
    }
  },
  dependencies: [
    "html-derivative",
    "cpp",
    "python",
    "javascript",
    "shellscript",
    "yaml",
    "cmake",
    "ruby"
  ]
};
