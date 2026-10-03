export default {
  name: "vue",
  displayName: "Vue",
  scopeName: "text.html.vue",
  patterns: [
    { include: "#vue-comments" },
    { include: "#self-closing-tag" },
    {
      begin: /(<)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html.vue" }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html.vue" }
      },
      patterns: [
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)md\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "text.html.markdown",
              patterns: [
                { include: "text.html.markdown" }
              ]
            }
          ]
        },
        {
          begin: /(?!template(?![\-0-\:A-Za-z]))([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)html\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          contentName: "text.html.derivative",
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            { include: "#html-stuff" }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)pug\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "text.pug",
              patterns: [
                { include: "text.pug" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)stylus\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.stylus",
              patterns: [
                { include: "source.stylus" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)postcss\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.postcss",
              patterns: [
                { include: "source.postcss" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)sass\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.sass",
              patterns: [
                { include: "source.sass" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)css\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.css",
              patterns: [
                { include: "source.css" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)scss\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.css.scss",
              patterns: [
                { include: "source.css.scss" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)less\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.css.less",
              patterns: [
                { include: "source.css.less" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)js\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.js",
              patterns: [
                { include: "source.js" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)ts\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)(?=[^\n]*<\/script[\>\p{space}])/dgv,
              end: /(?=<\/script[\>\p{space}])/dgv,
              name: "source.ts",
              patterns: [
                { include: "source.ts" }
              ]
            },
            {
              begin: /(?<=>)/dgv,
              name: "source.ts",
              patterns: [
                { include: "source.ts" }
              ],
              while: /^(?!\p{space}*<\/script[\>\p{space}])/dgv
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)jsx\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.js.jsx",
              patterns: [
                { include: "source.js.jsx" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)tsx\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)(?=[^\n]*<\/script[\>\p{space}])/dgv,
              end: /(?=<\/script[\>\p{space}])/dgv,
              name: "source.tsx",
              patterns: [
                { include: "source.tsx" }
              ]
            },
            {
              begin: /(?<=>)/dgv,
              name: "source.tsx",
              patterns: [
                { include: "source.tsx" }
              ],
              while: /^(?!\p{space}*<\/script[\>\p{space}])/dgv
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)coffee\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.coffee",
              patterns: [
                { include: "source.coffee" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)json\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.json",
              patterns: [
                { include: "source.json" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)jsonc\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.json.comments",
              patterns: [
                { include: "source.json.comments" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)json5\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.json5",
              patterns: [
                { include: "source.json5" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)yaml\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.yaml",
              patterns: [
                { include: "source.yaml" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)toml\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.toml",
              patterns: [
                { include: "source.toml" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)(g(?:ql|raphql))\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "source.graphql",
              patterns: [
                { include: "source.graphql" }
              ]
            }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)\b(?=[^\>]*\blang\p{space}*=\p{space}*(["']?)vue\b\2)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "text.html.vue",
              patterns: [
                { include: "text.html.vue" }
              ]
            }
          ]
        },
        {
          begin: /(template)(?=\p{space}|\/?>)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/template[\>\p{space}])/dgv,
              name: "text.html.derivative",
              patterns: [
                { include: "#html-stuff" }
              ]
            }
          ]
        },
        {
          begin: /(script)(?=\p{space}|\/?>)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#multi-line-script-tag-stuff" }
          ]
        },
        {
          begin: /(style)(?=\p{space}|\/?>)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#multi-line-style-tag-stuff" }
          ]
        },
        {
          begin: /([\-0-\:A-Za-z]+)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.$1.html.vue" }
          },
          end: /(<\/)(1)\p{space}*(?=>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html.vue" },
            "2": { name: "entity.name.tag.$2.html.vue" }
          },
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/)/dgv,
              name: "text"
            }
          ]
        }
      ]
    }
  ],
  repository: {
    "capitalized-tag": {
      begin: /(<)([A-Z][\-0-\:A-Za-z]*)(?=\p{space}|\/?>)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html.vue" },
        "2": { name: "entity.name.tag.html.vue" }
      },
      end: /\/?>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.html.vue" }
      },
      name: "meta.tag.structure.$2.start.html.vue",
      patterns: [
        {
          begin: {
            G: [/￿/dgv, /(?:)/dgv]
          },
          end: /(?=\/?>)/dgv,
          patterns: [
            { include: "#vue-directives" },
            { include: "text.html.basic#attribute" }
          ]
        }
      ]
    },
    "html-stuff": {
      patterns: [
        { include: "#template-tag" },
        { include: "#capitalized-tag" },
        { include: "text.html.derivative" },
        { include: "text.html.basic" }
      ]
    },
    "multi-line-script-tag-stuff": {
      begin: {
        G: [/￿/dgv, /(?:)/dgv]
      },
      end: /(?=<\/script[\>\p{space}])/dgv,
      patterns: [
        {
          begin: {
            G: [/￿(?!\blang\p{space}*=\p{space}*["']?(?:tsx??|jsx|coffee)\b)/dgv, /(?!\blang\p{space}*=\p{space}*["']?(?:tsx??|jsx|coffee)\b)/dgvy]
          },
          end: /(?=\blang\p{space}*=\p{space}*["']?(?:tsx??|jsx|coffee)\b)|(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html.vue" }
          },
          name: "meta.tag-stuff",
          patterns: [
            { include: "#vue-directives" },
            { include: "text.html.basic#attribute" }
          ]
        },
        {
          begin: /(?=\blang\p{space}*=\p{space}*["']?ts\b)/dgv,
          end: /(?=<\/script[\>\p{space}])/dgv,
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)(?=[^\n]*<\/script[\>\p{space}])/dgv,
              end: /(?=<\/script[\>\p{space}])/dgv,
              name: "source.ts",
              patterns: [
                { include: "source.ts" }
              ]
            },
            {
              begin: /(?<=>)/dgv,
              name: "source.ts",
              patterns: [
                { include: "source.ts" }
              ],
              while: /^(?!\p{space}*<\/script[\>\p{space}])/dgv
            }
          ]
        },
        {
          begin: /(?=\blang\p{space}*=\p{space}*["']?tsx\b)/dgv,
          end: /(?=<\/script[\>\p{space}])/dgv,
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)(?=[^\n]*<\/script[\>\p{space}])/dgv,
              end: /(?=<\/script[\>\p{space}])/dgv,
              name: "source.tsx",
              patterns: [
                { include: "source.tsx" }
              ]
            },
            {
              begin: /(?<=>)/dgv,
              name: "source.tsx",
              patterns: [
                { include: "source.tsx" }
              ],
              while: /^(?!\p{space}*<\/script[\>\p{space}])/dgv
            }
          ]
        },
        {
          begin: /(?=\blang\p{space}*=\p{space}*["']?jsx\b)/dgv,
          end: /(?=<\/script[\>\p{space}])/dgv,
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/script[\>\p{space}])/dgv,
              name: "source.js.jsx",
              patterns: [
                { include: "source.js.jsx" }
              ]
            }
          ]
        },
        {
          begin: /(?=\blang\p{space}*=\p{space}*["']?coffee\b)/dgv,
          end: /(?=<\/script[\>\p{space}])/dgv,
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/script[\>\p{space}])/dgv,
              name: "source.coffee",
              patterns: [
                { include: "source.coffee" }
              ]
            }
          ]
        },
        {
          begin: /(?<=>)/dgv,
          end: /(?=<\/script[\>\p{space}])/dgv,
          name: "source.js",
          patterns: [
            { include: "source.js" }
          ]
        }
      ]
    },
    "multi-line-style-tag-stuff": {
      begin: {
        G: [/￿/dgv, /(?:)/dgv]
      },
      end: /(?=<\/style[\>\p{space}])/dgv,
      patterns: [
        {
          begin: {
            G: [/￿(?!\blang\p{space}*=\p{space}*["']?(?:scss|stylus|less|postcss)\b)/dgv, /(?!\blang\p{space}*=\p{space}*["']?(?:scss|stylus|less|postcss)\b)/dgvy]
          },
          end: /(?=\blang\p{space}*=\p{space}*["']?(?:scss|stylus|less|postcss)\b)|(>)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.tag.end.html.vue" }
          },
          name: "meta.tag-stuff",
          patterns: [
            { include: "#vue-directives" },
            { include: "text.html.basic#attribute" }
          ]
        },
        {
          begin: /(?=\blang\p{space}*=\p{space}*["']?scss\b)/dgv,
          end: /(?=<\/style[\>\p{space}])/dgv,
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/style[\>\p{space}])/dgv,
              name: "source.css.scss",
              patterns: [
                { include: "source.css.scss" }
              ]
            }
          ]
        },
        {
          begin: /(?=\blang\p{space}*=\p{space}*["']?stylus\b)/dgv,
          end: /(?=<\/style[\>\p{space}])/dgv,
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/style[\>\p{space}])/dgv,
              name: "source.stylus",
              patterns: [
                { include: "source.stylus" }
              ]
            }
          ]
        },
        {
          begin: /(?=\blang\p{space}*=\p{space}*["']?less\b)/dgv,
          end: /(?=<\/style[\>\p{space}])/dgv,
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/style[\>\p{space}])/dgv,
              name: "source.css.less",
              patterns: [
                { include: "source.css.less" }
              ]
            }
          ]
        },
        {
          begin: /(?=\blang\p{space}*=\p{space}*["']?postcss\b)/dgv,
          end: /(?=<\/style[\>\p{space}])/dgv,
          patterns: [
            { include: "#tag-stuff" },
            {
              begin: /(?<=>)/dgv,
              end: /(?=<\/style[\>\p{space}])/dgv,
              name: "source.postcss",
              patterns: [
                { include: "source.postcss" }
              ]
            }
          ]
        },
        {
          begin: /(?<=>)/dgv,
          end: /(?=<\/style[\>\p{space}])/dgv,
          name: "source.css",
          patterns: [
            { include: "source.css" }
          ]
        }
      ]
    },
    "self-closing-tag": {
      begin: /(<)([\-0-\:A-Za-z]+)(?=([^\>]+\/>))/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html.vue" },
        "2": { name: "entity.name.tag.$2.html.vue" }
      },
      end: /(\/>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html.vue" }
      },
      name: "self-closing-tag",
      patterns: [
        { include: "#tag-stuff" }
      ]
    },
    "tag-stuff": {
      begin: {
        G: [/￿/dgv, /(?:)/dgv]
      },
      end: /(?=\/>)|(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html.vue" }
      },
      name: "meta.tag-stuff",
      patterns: [
        { include: "#vue-directives" },
        { include: "text.html.basic#attribute" }
      ]
    },
    "template-tag": {
      patterns: [
        { include: "#template-tag-1" },
        { include: "#template-tag-2" }
      ]
    },
    "template-tag-1": {
      begin: /(<)(template)\b(>)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html.vue" },
        "2": { name: "entity.name.tag.$2.html.vue" },
        "3": { name: "punctuation.definition.tag.end.html.vue" }
      },
      end: /(\/?>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html.vue" }
      },
      name: "meta.template-tag.start",
      patterns: [
        {
          begin: {
            G: [/￿/dgv, /(?:)/dgv]
          },
          end: /(?=\/>)|((<\/)(template)(?=[\>\p{space}]))/dgv,
          endCaptures: {
            "2": { name: "punctuation.definition.tag.begin.html.vue" },
            "3": { name: "entity.name.tag.$3.html.vue" }
          },
          name: "meta.template-tag.end",
          patterns: [
            { include: "#html-stuff" }
          ]
        }
      ]
    },
    "template-tag-2": {
      begin: /(<)(template)(?=\p{space}|\/?>)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html.vue" },
        "2": { name: "entity.name.tag.$2.html.vue" }
      },
      end: /(\/?>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.html.vue" }
      },
      name: "meta.template-tag.start",
      patterns: [
        {
          begin: {
            G: [/￿/dgv, /(?:)/dgv]
          },
          end: /(?=\/>)|((<\/)(template)(?=[\>\p{space}]))/dgv,
          endCaptures: {
            "2": { name: "punctuation.definition.tag.begin.html.vue" },
            "3": { name: "entity.name.tag.$3.html.vue" }
          },
          name: "meta.template-tag.end",
          patterns: [
            { include: "#tag-stuff" },
            { include: "#html-stuff" }
          ]
        }
      ]
    },
    "vue-comments": {
      patterns: [
        { include: "#vue-comments-key-value" },
        {
          begin: /<!--/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.vue" }
          },
          end: /-->/dgv,
          name: "comment.block.vue"
        }
      ]
    },
    "vue-comments-key-value": {
      begin: /(<!--)\p{space}*(@)([\$\p{L}\p{M}\p{N}\p{Pc}]+)(?=\p{space})/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.vue" },
        "2": { name: "punctuation.definition.block.tag.comment.vue" },
        "3": { name: "storage.type.class.comment.vue" }
      },
      end: /(-->)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.comment.vue" }
      },
      name: "comment.block.vue",
      patterns: [
        { include: "source.json#value" }
      ]
    },
    "vue-directives": {
      patterns: [
        { include: "#vue-directives-control" },
        { include: "#vue-directives-generic-attr" },
        { include: "#vue-directives-style-attr" },
        { include: "#vue-directives-original" }
      ]
    },
    "vue-directives-control": {
      begin: /(?:(v-for)|(v-(?:if|else-if|else)))(?=[\)\/\=\>\p{space}])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.loop.vue" },
        "2": { name: "keyword.control.conditional.vue" }
      },
      end: /(?=\p{space}*[^\=\p{space}])/dgv,
      name: "meta.attribute.directive.control.vue",
      patterns: [
        { include: "#vue-directives-expression" }
      ]
    },
    "vue-directives-expression": {
      patterns: [
        {
          begin: /(=)\p{space}*(["'\`])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.key-value.html.vue" },
            "2": { name: "punctuation.definition.string.begin.html.vue" }
          },
          end: /(2)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.html.vue" }
          },
          patterns: [
            {
              begin: /(?<=(["'\`]))/dgv,
              end: /(?=1)/dgv,
              name: "source.ts.embedded.html.vue",
              patterns: [
                { include: "source.ts#expression" }
              ]
            }
          ]
        },
        {
          begin: /(=)\p{space}*(?=[^"'\`])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.key-value.html.vue" }
          },
          end: /(?=([\>\p{space}]|\/>))/dgv,
          patterns: [
            {
              begin: /(?=[^"'\`])/dgv,
              end: /(?=([\>\p{space}]|\/>))/dgv,
              name: "source.ts.embedded.html.vue",
              patterns: [
                { include: "source.ts#expression" }
              ]
            }
          ]
        }
      ]
    },
    "vue-directives-generic-attr": {
      begin: /\b(generic)\p{space}*(=)/dgv,
      beginCaptures: {
        "1": { name: "entity.other.attribute-name.html.vue" },
        "2": { name: "punctuation.separator.key-value.html.vue" }
      },
      end: /(?<=["'])/dgv,
      name: "meta.attribute.generic.vue",
      patterns: [
        {
          begin: /(["'])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.html.vue" }
          },
          end: /(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.html.vue" }
          },
          name: "meta.type.parameters.vue",
          patterns: [
            { include: "source.ts#comment" },
            {
              match: /(?<![\$_\p{Alpha}\p{Nd}])(?:(?<=\.\.\.)|(?<!\.))(extends|in|out)(?![\$_\p{Alpha}\p{Nd}])(?:(?=\.\.\.)|(?!\.))/dgv,
              name: "storage.modifier.ts"
            },
            { include: "source.ts#type" },
            { include: "source.ts#punctuation-comma" },
            {
              match: /(=)(?!>)/dgv,
              name: "keyword.operator.assignment.ts"
            }
          ]
        }
      ]
    },
    "vue-directives-original": {
      begin: /(?:(v-[\-\p{L}\p{M}\p{N}\p{Pc}]+)(:)?|([\.\:])|(@)|(#))(?:(\[)([^\]]*)(\])|([\-\p{L}\p{M}\p{N}\p{Pc}]+))?/dgv,
      beginCaptures: {
        "1": { name: "entity.other.attribute-name.html.vue" },
        "2": { name: "punctuation.separator.key-value.html.vue" },
        "3": { name: "punctuation.attribute-shorthand.bind.html.vue" },
        "4": { name: "punctuation.attribute-shorthand.event.html.vue" },
        "5": { name: "punctuation.attribute-shorthand.slot.html.vue" },
        "6": { name: "punctuation.separator.key-value.html.vue" },
        "7": {
          name: "source.ts.embedded.html.vue",
          patterns: [
            { include: "source.ts#expression" }
          ]
        },
        "8": { name: "punctuation.separator.key-value.html.vue" },
        "9": { name: "entity.other.attribute-name.html.vue" }
      },
      end: /(?=\p{space}*[^\=\p{space}])/dgv,
      name: "meta.attribute.directive.vue",
      patterns: [
        {
          "1": { name: "punctuation.separator.key-value.html.vue" },
          "2": { name: "entity.other.attribute-name.html.vue" },
          match: /(\.)([\-\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
        },
        { include: "#vue-directives-expression" }
      ]
    },
    "vue-directives-style-attr": {
      begin: /\b(style)\p{space}*(=)/dgv,
      beginCaptures: {
        "1": { name: "entity.other.attribute-name.html.vue" },
        "2": { name: "punctuation.separator.key-value.html.vue" }
      },
      end: /(?<=["'])/dgv,
      name: "meta.attribute.style.vue",
      patterns: [
        {
          begin: /(["'])/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.html.vue" }
          },
          end: /(1)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.html.vue" }
          },
          name: "source.css.embedded.html.vue",
          patterns: [
            { include: "source.css#comment-block" },
            { include: "source.css#escapes" },
            { include: "source.css#font-features" },
            {
              match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])--[\-A-Z_a-z[^\x00-\x7F]](?:[\-0-9A-Z_a-z[^\x00-\x7F]]|\\(?:\p{AHex}{1,6}|[^\n]))*/dgv,
              name: "variable.css"
            },
            {
              begin: /(?<![\-A-Za-z])(?=[\-A-Za-z])/dgv,
              end: /(?=\n?$)|(?![\-A-Za-z])/dgv,
              name: "meta.property-name.css",
              patterns: [
                { include: "source.css#property-names" }
              ]
            },
            {
              begin: /(:)\p{space}*/dgv,
              beginCaptures: {
                "1": { name: "punctuation.separator.key-value.css" }
              },
              contentName: "meta.property-value.css",
              end: /\p{space}*(;)|\p{space}*(?=["'])/dgv,
              endCaptures: {
                "1": { name: "punctuation.terminator.rule.css" }
              },
              patterns: [
                { include: "source.css#comment-block" },
                { include: "source.css#property-values" }
              ]
            },
            {
              match: /;/dgv,
              name: "punctuation.terminator.rule.css"
            }
          ]
        }
      ]
    },
    "vue-interpolations": {
      patterns: [
        {
          begin: /(\{\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.interpolation.begin.html.vue" }
          },
          end: /(\}\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.interpolation.end.html.vue" }
          },
          name: "expression.embedded.vue",
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: /(?=\}\})/dgv,
              name: "source.ts.embedded.html.vue",
              patterns: [
                { include: "source.ts#expression" }
              ]
            }
          ]
        }
      ]
    }
  },
  dependencies: [
    "css",
    "javascript",
    "typescript",
    "json",
    "html",
    "html-derivative",
    "markdown-vue",
    "vue-directives",
    "vue-interpolations",
    "vue-sfc-style-variable-injection"
  ]
};
