export default {
  name: "just",
  displayName: "Just",
  aliases: [
    "justfile"
  ],
  scopeName: "source.just",
  patterns: [
    { include: "#comments" },
    { include: "#import" },
    { include: "#module" },
    { include: "#alias" },
    { include: "#assignment" },
    { include: "#builtins" },
    { include: "#keywords" },
    { include: "#expression-operators" },
    { include: "#backtick" },
    { include: "#strings" },
    { include: "#parenthesis" },
    { include: "#recipes" },
    { include: "#recipe-operators" },
    { include: "#embedded-languages" },
    { include: "#escaping" }
  ],
  repository: {
    alias: {
      captures: {
        "1": { name: "keyword.other.reserved.just" },
        "2": { name: "variable.name.alias.just" },
        "3": { name: "keyword.operator.assignment.just" },
        "4": { name: "variable.other.just" }
      },
      match: /^(alias)\p{space}+([A-Z_a-z][\-0-9A-Z_a-z]*)\p{space}*(:=)\p{space}*([A-Z_a-z][\-0-9A-Z_a-z]*)/dgv
    },
    assignment: {
      patterns: [
        { include: "#variable-assignment" },
        { include: "#setting-assignment" }
      ]
    },
    backtick: {
      patterns: [
        {
          begin: /(```)/dgv,
          beginCaptures: {
            "1": { name: "string.interpolated.just" }
          },
          contentName: "source.shell",
          end: /(```)/dgv,
          endCaptures: {
            "1": { name: "string.interpolated.just" }
          },
          patterns: [
            { include: "source.shell" }
          ]
        },
        {
          captures: {
            "1": { name: "string.interpolated.just" },
            "2": {
              name: "source.shell",
              patterns: [
                { include: "source.shell" }
              ]
            },
            "3": { name: "string.interpolated.just" }
          },
          match: /(`)([^\`]*)(`)/dgv
        }
      ]
    },
    boolean: {
      patterns: [
        {
          match: /\b(true|false)\b/dgv,
          name: "constant.language.boolean.just"
        }
      ]
    },
    "builtin-functions": {
      patterns: [
        {
          match: /\b(arch|num_cpus|os|os_family|shell|env_var|env_var_or_default|env|is_dependency|invocation_directory|invocation_dir|invocation_directory_native|invocation_dir_native|justfile|justfile_directory|justfile_dir|just_executable|just_pid|source_file|source_directory|source_dir|module_file|module_directory|module_dir|append|prepend|encode_uri_component|quote|replace|replace_regex|trim|trim_end|trim_end_match|trim_end_matches|trim_start|trim_start_match|trim_start_matches|capitalize|kebabcase|lowercamelcase|lowercase|shoutykebabcase|shoutysnakecase|snakecase|titlecase|uppercamelcase|uppercase|absolute_path|blake3|blake3_file|canonicalize|extension|file_name|file_stem|parent_directory|parent_dir|without_extension|clean|join|path_exists|error|assert|sha256|sha256_file|uuid|choose|datetime|datetime_utc|semver_matches|style|cache_directory|cache_dir|config_directory|config_dir|config_local_directory|config_local_dir|data_directory|data_dir|data_local_directory|data_local_dir|executable_directory|executable_dir|home_directory|home_dir|which|require|read)\b/dgv,
          name: "support.function.builtin.just"
        }
      ]
    },
    builtins: {
      patterns: [
        {
          match: /\b(HEX|HEXLOWER|HEXUPPER|PATH_SEP|PATH_VAR_SEP|CLEAR|NORMAL|BOLD|ITALIC|UNDERLINE|INVERT|HIDE|STRIKETHROUGH|BLACK|RED|GREEN|YELLOW|BLUE|MAGENTA|CYAN|WHITE|BG_BLACK|BG_RED|BG_GREEN|BG_YELLOW|BG_BLUE|BG_MAGENTA|BG_CYAN|BG_WHITE)\b/dgv,
          name: "constant.language.const.just"
        },
        { include: "#builtin-functions" },
        { include: "#literal" }
      ]
    },
    comments: {
      patterns: [
        {
          match: /#(?!!)[^\n]*(?=\n?$)/dgv,
          name: "comment.line.number-sign.just"
        }
      ]
    },
    "control-keywords": {
      patterns: [
        {
          match: /\b(if|else)\b/dgv,
          name: "keyword.control.conditional.just"
        }
      ]
    },
    "embedded-languages": {
      patterns: [
        {
          begin: /^\p{space}+(#!\/usr\/bin\/env\p{space}+(?:-S\p{space}+)?node[^\n]*)(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "comment.line.number-sign.shebang.just" }
          },
          contentName: "source.js",
          patterns: [
            { include: "source.js" }
          ],
          while: /^(?=\p{space}*(?=\n?$)|\p{space})/dgv
        },
        {
          begin: /^\p{space}+(#!\/usr\/bin\/env\p{space}+(?:-S\p{space}+)?deno[^\n]*)(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "comment.line.number-sign.shebang.just" }
          },
          contentName: "source.ts",
          patterns: [
            { include: "source.ts" }
          ],
          while: /^(?=\p{space}*(?=\n?$)|\p{space})/dgv
        },
        {
          begin: /^\p{space}+(#!\/usr\/bin\/env\p{space}+(?:-S\p{space}+)?perl[^\n]*)(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "comment.line.number-sign.shebang.just" }
          },
          contentName: "source.perl",
          patterns: [
            { include: "source.perl" }
          ],
          while: /^(?=\p{space}*(?=\n?$)|\p{space})/dgv
        },
        {
          begin: /^\p{space}+(#!\/usr\/bin\/env\p{space}+(?:-S\p{space}+)?python[^\n]*)(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "comment.line.number-sign.shebang.just" }
          },
          contentName: "source.python",
          patterns: [
            { include: "source.python" }
          ],
          while: /^(?=\p{space}*(?=\n?$)|\p{space})/dgv
        },
        {
          begin: /^\p{space}+(#!\/usr\/bin\/env\p{space}+(?:-S\p{space}+)?ruby[^\n]*)(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "comment.line.number-sign.shebang.just" }
          },
          contentName: "source.ruby",
          patterns: [
            { include: "source.ruby" }
          ],
          while: /^(?=\p{space}*(?=\n?$)|\p{space})/dgv
        },
        {
          begin: /^\p{space}+(#!\/usr\/bin\/env\p{space}+(?:-S\p{space}+)?(?:|ba|z|fi)sh[^\n]*)(?=\n?$)/dgv,
          beginCaptures: {
            "1": { name: "comment.line.number-sign.shebang.just" }
          },
          contentName: "source.shell",
          patterns: [
            { include: "source.shell" }
          ],
          while: /^(?=\p{space}*(?=\n?$)|\p{space})/dgv
        }
      ]
    },
    escaping: {
      patterns: [
        {
          captures: {
            "1": { name: "string.interpolated.escape.just" },
            "2": {
              patterns: [
                { include: "#expression" }
              ]
            },
            "3": { name: "string.interpolated.escape.just" }
          },
          match: /(?<!\{)(\{\{)\{?(?!\{)([^\n]*?)(\}\})/dgv,
          name: "string.interpolated.escaping.just"
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#backtick" },
        { include: "#builtins" },
        { include: "#control-keywords" },
        { include: "#expression-operators" },
        { include: "#parenthesis" },
        { include: "#strings" }
      ]
    },
    "expression-operators": {
      patterns: [
        {
          match: /\//dgv,
          name: "keyword.operator.path-join.just"
        },
        {
          match: /\+/dgv,
          name: "keyword.operator.concat.just"
        },
        {
          match: /&&/dgv,
          name: "keyword.operator.and.just"
        },
        {
          match: /\|\|/dgv,
          name: "keyword.operator.or.just"
        },
        {
          match: /(==|=~|!=)/dgv,
          name: "keyword.operator.equality.just"
        }
      ]
    },
    import: {
      begin: /^(import)(\?)?\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.reserved.just" },
        "2": { name: "punctuation.optional.just" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#strings" }
      ]
    },
    keywords: {
      patterns: [
        { include: "#reserved-keywords" },
        { include: "#control-keywords" }
      ]
    },
    literal: {
      patterns: [
        { include: "#boolean" },
        { include: "#number" }
      ]
    },
    module: {
      begin: /^(mod)(\?)?\p{space}+([A-Z_a-z][\-0-9A-Z_a-z]*)(?=[\$\p{space}])/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.reserved.just" },
        "2": { name: "punctuation.optional.just" },
        "3": { name: "variable.name.module.just" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#strings" }
      ]
    },
    number: {
      patterns: [
        {
          match: /(?<![\-A-Z_a-z])(?:\.\p{Nd}+|\p{Nd}+\.\p{Nd}+|\p{Nd}+\.|[1-9]\p{Nd}*)/dgv,
          name: "constant.numeric.just"
        },
        {
          match: /\b[0-9]+[\-A-Z_a-z]+\b/dgv,
          name: "invalid.illegal.name.just"
        }
      ]
    },
    parenthesis: {
      begin: /\(/dgv,
      end: /\)/dgv,
      patterns: [
        { include: "#expression" },
        { include: "#parenthesis" }
      ]
    },
    "recipe-attributes": {
      patterns: [
        {
          captures: {
            "1": { name: "support.function.system.just" },
            "2": { name: "support.function.system.just" }
          },
          match: /^\[([\-A-z]+)\p{space}*(?:,(\p{space}*[\-A-z]+\p{space}*))*\]\p{space}*(?=\n?$)/dgv
        },
        {
          captures: {
            "1": { name: "support.function.system.just" },
            "2": { name: "keyword.operator.attribute.end.just" },
            "3": {
              patterns: [
                { include: "#strings" }
              ]
            },
            "4": {
              patterns: [
                { include: "#strings" }
              ]
            }
          },
          match: /^\[([\-A-z]+)(?:(:)([^\n]*?)|(\(([^\n]*?)\)))?\]\p{space}*(?=\n?$)/dgv
        }
      ]
    },
    "recipe-dependencies": {
      captures: {
        "1": { name: "entity.name.function.just" },
        "2": {
          patterns: [
            {
              captures: {
                "1": { name: "entity.name.function.just" },
                "2": {
                  patterns: [
                    { include: "#expression" }
                  ]
                }
              },
              match: /\(([A-Z_a-z][\-0-9A-Z_a-z]*)([^\n]*)\)/dgv
            }
          ]
        },
        "3": { name: "keyword.operator.and.just" }
      },
      match: /([A-Z_a-z][\-0-9A-Z_a-z]*)|(\((?:[^\(\)]|\([^\)]*\))*\))|(&&)/dgv
    },
    "recipe-operators": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.quiet.just" }
          },
          match: /^\p{space}+(@)/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.error-suppression.just" }
          },
          match: /^\p{space}+(-)/dgv
        }
      ]
    },
    "recipe-params": {
      captures: {
        "1": { name: "keyword.other.recipe.variadic.just" },
        "2": { name: "variable.parameter.recipe.just" },
        "3": { name: "keyword.operator.default.just" },
        "4": {
          patterns: [
            { include: "#strings" }
          ]
        },
        "5": {
          patterns: [
            { include: "#backtick" }
          ]
        },
        "6": {
          patterns: [
            { include: "#parenthesis" }
          ]
        }
      },
      match: /([\$\*\+])?([A-Z_a-z][0-9A-Z_a-z]*)(?:(=)(?:[A-Z_a-z][0-9A-Z_a-z]*|("[^\n]*?"|'[^\n]*?')|(`[^\n]*?`)|(\((?:[^\(\)]|\([^\)]*\))*\))))?/dgv
    },
    recipes: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.recipe.prefix.just" },
            "2": { name: "entity.name.function.just" },
            "3": {
              patterns: [
                { include: "#recipe-params" }
              ]
            },
            "4": { name: "keyword.operator.recipe.end.just" },
            "5": {
              patterns: [
                { include: "#recipe-dependencies" }
              ]
            }
          },
          match: /^(@_|_@|[\@_])?([A-Za-z][\-0-9A-Z_a-z]*)(?:\p{space}+([^\n]*?))?\p{space}*(:)([^\n]*)/dgv
        },
        { include: "#recipe-operators" },
        { include: "#recipe-attributes" },
        { include: "#embedded-languages" }
      ]
    },
    "reserved-keywords": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.reserved.just" }
          },
          match: /^(alias|export|unexport|import|mod|set)\p{space}+/dgv
        }
      ]
    },
    "setting-assignment": {
      patterns: [
        {
          begin: /^(set)\p{space}+([A-Z_a-z][\-0-9A-Z_a-z]*)\p{space}*(:=)?/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.reserved.just" },
            "2": { name: "variable.other.just" },
            "3": { name: "keyword.operator.assignment.just" }
          },
          end: /(?=\n?$)/dgv,
          patterns: [
            { include: "#expression" },
            { include: "#comments" }
          ]
        }
      ]
    },
    strings: {
      patterns: [
        {
          match: /(["']{1,3})\{+(\1)/dgv,
          name: "string.quoted.double.indented.just"
        },
        {
          begin: /([fx])?(""")/dgv,
          beginCaptures: {
            "1": { name: "constant.character.expanded.just" },
            "2": { name: "string.quoted.double.indented.just" }
          },
          end: /"""/dgv,
          name: "string.quoted.double.indented.just",
          patterns: [
            {
              match: /\\[^\n](?:(?<=u)\{[^\n]+?\})?/dgv,
              name: "constant.character.escape.just"
            },
            { include: "#escaping" }
          ]
        },
        {
          begin: /([fx])?(")/dgv,
          beginCaptures: {
            "1": { name: "constant.character.expanded.just" },
            "2": { name: "string.quoted.double.just" }
          },
          end: /"/dgv,
          name: "string.quoted.double.just",
          patterns: [
            {
              match: /\\[^\n](?:(?<=u)\{[^\n]+?\})?/dgv,
              name: "constant.character.escape.just"
            },
            { include: "#escaping" }
          ]
        },
        {
          begin: /([fx])?(''')/dgv,
          beginCaptures: {
            "1": { name: "constant.character.expanded.just" },
            "2": { name: "string.quoted.single.indented.just" }
          },
          end: /'''/dgv,
          name: "string.quoted.single.indented.just",
          patterns: [
            { include: "#escaping" }
          ]
        },
        {
          begin: /([fx])?(')/dgv,
          beginCaptures: {
            "1": { name: "constant.character.expanded.just" },
            "2": { name: "string.quoted.single.just" }
          },
          end: /'/dgv,
          name: "string.quoted.single.just",
          patterns: [
            { include: "#escaping" }
          ]
        }
      ]
    },
    "variable-assignment": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.reserved.just" },
            "2": { name: "variable.other.just" }
          },
          match: /^(unexport)\p{space}+([A-Z_a-z][\-0-9A-Z_a-z]*)/dgv
        },
        {
          begin: /^(?:(export)\p{space}+)?([A-Z_a-z][\-0-9A-Z_a-z]*)\p{space}*(:=)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.reserved.just" },
            "2": { name: "variable.other.just" },
            "3": { name: "keyword.operator.assignment.just" }
          },
          end: /(?=\n?$)/dgv,
          patterns: [
            { include: "#expression" },
            { include: "#comments" }
          ]
        }
      ]
    }
  },
  dependencies: [
    "shellscript",
    "javascript",
    "typescript",
    "perl",
    "python",
    "ruby"
  ]
};
