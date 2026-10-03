import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "make",
  displayName: "Makefile",
  aliases: [
    "makefile"
  ],
  scopeName: "source.makefile",
  patterns: [
    { include: "#comment" },
    { include: "#variables" },
    { include: "#variable-assignment" },
    { include: "#directives" },
    { include: "#recipe" },
    { include: "#target" }
  ],
  repository: {
    "another-variable-braces": {
      patterns: [
        {
          begin: /(?<=\{)(?!\})/dgv,
          end: /(?=\}|((?<!\\)\n))/dgv,
          name: "variable.other.makefile",
          patterns: [
            { include: "#variables" },
            {
              match: /\\\n/dgv,
              name: "constant.character.escape.continuation.makefile"
            }
          ]
        }
      ]
    },
    "another-variable-parentheses": {
      patterns: [
        {
          begin: /(?<=\()(?!\))/dgv,
          end: /(?=\)|((?<!\\)\n))/dgv,
          name: "variable.other.makefile",
          patterns: [
            { include: "#variables" },
            {
              match: /\\\n/dgv,
              name: "constant.character.escape.continuation.makefile"
            }
          ]
        }
      ]
    },
    "braces-interpolation": {
      begin: /\{/dgv,
      end: /\}/dgv,
      patterns: [
        { include: "#variables" },
        { include: "#interpolation" }
      ]
    },
    "builtin-variable-braces": {
      patterns: [
        {
          match: /(?<=\{)(MAKEFILES|VPATH|SHELL|MAKESHELL|MAKE|MAKELEVEL|MAKEFLAGS|MAKECMDGOALS|CURDIR|SUFFIXES|\.LIBPATTERNS)(?=\p{space}*\})/dgv,
          name: "variable.language.makefile"
        }
      ]
    },
    "builtin-variable-parentheses": {
      patterns: [
        {
          match: /(?<=\()(MAKEFILES|VPATH|SHELL|MAKESHELL|MAKE|MAKELEVEL|MAKEFLAGS|MAKECMDGOALS|CURDIR|SUFFIXES|\.LIBPATTERNS)(?=\p{space}*\))/dgv,
          name: "variable.language.makefile"
        }
      ]
    },
    comma: {
      match: /,/dgv,
      name: "punctuation.separator.delimeter.comma.makefile"
    },
    comment: {
      begin: /(^ +)?((?<!\\)(\\\\)*)(?=#)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.makefile" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.makefile" }
          },
          end: /(?=[^\\])(?=\n?$)/dgv,
          name: "comment.line.number-sign.makefile",
          patterns: [
            {
              match: /\\\n/dgv,
              name: "constant.character.escape.continuation.makefile"
            }
          ]
        }
      ]
    },
    directives: {
      patterns: [
        {
          begin: /^ *([\-s]?include)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.include.makefile" }
          },
          end: /^/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#variables" },
            {
              match: /%/dgv,
              name: "constant.other.placeholder.makefile"
            }
          ]
        },
        {
          begin: /^ *(vpath)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.vpath.makefile" }
          },
          end: /^/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#variables" },
            {
              match: /%/dgv,
              name: "constant.other.placeholder.makefile"
            }
          ]
        },
        {
          begin: /^\p{space}*(?:(override)\p{space}*)?(define)\p{space}*(\P{space}+)\p{space}*([\+\:\?]??=)?(?=\p{space})/dgv,
          captures: {
            "1": { name: "keyword.control.override.makefile" },
            "2": { name: "keyword.control.define.makefile" },
            "3": { name: "variable.other.makefile" },
            "4": { name: "punctuation.separator.key-value.makefile" }
          },
          end: /^\p{space}*(endef)\b/dgv,
          name: "meta.scope.conditional.makefile",
          patterns: [
            {
              begin: {
                G: [/￿(?!\n)/dgv, /(?!\n)/dgvy]
              },
              end: /^/dgv,
              patterns: [
                { include: "#comment" }
              ]
            },
            { include: "#variables" },
            { include: "#directives" }
          ]
        },
        {
          begin: /^ *(export)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.$1.makefile" }
          },
          end: /^/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#variable-assignment" },
            {
              match: /\P{space}+/dgv,
              name: "variable.other.makefile"
            }
          ]
        },
        {
          begin: /^ *(override|private)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.$1.makefile" }
          },
          end: /^/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#variable-assignment" }
          ]
        },
        {
          begin: /^ *(un(?:export|define))\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.$1.makefile" }
          },
          end: /^/dgv,
          patterns: [
            { include: "#comment" },
            {
              match: /\P{space}+/dgv,
              name: "variable.other.makefile"
            }
          ]
        },
        {
          begin: /^\p{space}*(ifn??(?:eq|def))(?=\p{space})/dgv,
          captures: {
            "1": { name: "keyword.control.$1.makefile" }
          },
          end: /^\p{space}*(endif)\b/dgv,
          name: "meta.scope.conditional.makefile",
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: /^/dgv,
              name: "meta.scope.condition.makefile",
              patterns: [
                { include: "#comma" },
                { include: "#variables" },
                { include: "#comment" }
              ]
            },
            {
              begin: /^\p{space}*else(?=\p{space})\p{space}*(ifn??(?:eq|def))*(?=\p{space})/dgv,
              beginCaptures: {
                "0": { name: "keyword.control.else.makefile" }
              },
              end: /^/dgv,
              patterns: [
                { include: "#comma" },
                { include: "#variables" },
                { include: "#comment" }
              ]
            },
            { include: "$self" }
          ]
        }
      ]
    },
    "flavor-variable-braces": {
      patterns: [
        {
          begin: /(?<=\{)(origin|flavor)\p{space}(?=[^\}\p{space}]+\p{space}*\})/dgv,
          beginCaptures: {
            "1": { name: "support.function.$1.makefile" }
          },
          contentName: "variable.other.makefile",
          end: /(?=\})/dgv,
          name: "meta.scope.function-call.makefile",
          patterns: [
            { include: "#variables" }
          ]
        }
      ]
    },
    "flavor-variable-parentheses": {
      patterns: [
        {
          begin: /(?<=\()(origin|flavor)\p{space}(?=[^\)\p{space}]+\p{space}*\))/dgv,
          beginCaptures: {
            "1": { name: "support.function.$1.makefile" }
          },
          contentName: "variable.other.makefile",
          end: /(?=\))/dgv,
          name: "meta.scope.function-call.makefile",
          patterns: [
            { include: "#variables" }
          ]
        }
      ]
    },
    "function-variable-braces": {
      patterns: [
        {
          begin: /(?<=\{)(subst|patsubst|strip|findstring|filter(-out)?|sort|word(list)?|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|info|error|warning|shell|foreach|if|or|and|call|eval|value|file|guile)\p{space}/dgv,
          beginCaptures: {
            "1": { name: "support.function.$1.makefile" }
          },
          end: /(?=\}|((?<!\\)\n))/dgv,
          name: "meta.scope.function-call.makefile",
          patterns: [
            { include: "#comma" },
            { include: "#variables" },
            { include: "#interpolation" },
            {
              match: /[\%\*]/dgv,
              name: "constant.other.placeholder.makefile"
            },
            {
              match: /\\\n/dgv,
              name: "constant.character.escape.continuation.makefile"
            }
          ]
        }
      ]
    },
    "function-variable-parentheses": {
      patterns: [
        {
          begin: /(?<=\()(subst|patsubst|strip|findstring|filter(-out)?|sort|word(list)?|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|info|error|warning|shell|foreach|if|or|and|call|eval|value|file|guile)\p{space}/dgv,
          beginCaptures: {
            "1": { name: "support.function.$1.makefile" }
          },
          end: /(?=\)|((?<!\\)\n))/dgv,
          name: "meta.scope.function-call.makefile",
          patterns: [
            { include: "#comma" },
            { include: "#variables" },
            { include: "#interpolation" },
            {
              match: /[\%\*]/dgv,
              name: "constant.other.placeholder.makefile"
            },
            {
              match: /\\\n/dgv,
              name: "constant.character.escape.continuation.makefile"
            }
          ]
        }
      ]
    },
    interpolation: {
      patterns: [
        { include: "#parentheses-interpolation" },
        { include: "#braces-interpolation" }
      ]
    },
    "parentheses-interpolation": {
      begin: /\(/dgv,
      end: /\)/dgv,
      patterns: [
        { include: "#variables" },
        { include: "#interpolation" }
      ]
    },
    recipe: {
      begin: /^\t([\-\+\@]*)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.$1.makefile" }
      },
      end: /[^\\](?=\n?$)/dgv,
      name: "meta.scope.recipe.makefile",
      patterns: [
        {
          match: /\\\n/dgv,
          name: "constant.character.escape.continuation.makefile"
        },
        { include: "#variables" }
      ]
    },
    "simple-variable": {
      patterns: [
        {
          match: /\$[^\(\)\{\}]/dgv,
          name: "variable.language.makefile"
        }
      ]
    },
    target: {
      begin: /^(?!\t)([^\:]*)(:)(?!=)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            {
              captures: {
                "1": { name: "support.function.target.$1.makefile" }
              },
              match: /^\p{space}*(\.(PHONY|SUFFIXES|DEFAULT|PRECIOUS|INTERMEDIATE|SECONDARY|SECONDEXPANSION|DELETE_ON_ERROR|IGNORE|LOW_RESOLUTION_TIME|SILENT|EXPORT_ALL_VARIABLES|NOTPARALLEL|ONESHELL|POSIX))\p{space}*(?=\n?$)/dgv
            },
            {
              begin: /(?=\P{space})/dgv,
              end: /(?=\p{space}|(?=\n?$))/dgv,
              name: "entity.name.function.target.makefile",
              patterns: [
                { include: "#variables" },
                {
                  match: /%/dgv,
                  name: "constant.other.placeholder.makefile"
                }
              ]
            }
          ]
        },
        "2": { name: "punctuation.separator.key-value.makefile" }
      },
      end: /[^\\](?=\n?$)/dgv,
      name: "meta.scope.target.makefile",
      patterns: [
        {
          begin: {
            G: [/￿/dgv, /(?:)/dgv]
          },
          end: /(?=[^\\])(?=\n?$)/dgv,
          name: "meta.scope.prerequisites.makefile",
          patterns: [
            {
              match: /\\\n/dgv,
              name: "constant.character.escape.continuation.makefile"
            },
            {
              match: /[\%\*]/dgv,
              name: "constant.other.placeholder.makefile"
            },
            { include: "#comment" },
            { include: "#variables" }
          ]
        }
      ]
    },
    "variable-assignment": {
      begin: {
        G: [/(^ *|￿\p{space}*)([^\#\:\=\p{space}]+)\p{space}*((?:(?<![\!\+\:\?])|[\!\+\:\?])=)/dgv, new EmulatedRegExp("(^ *|^\\p{space}*)([^\\#\\:\\=\\p{space}]+)\\p{space}*((?:(?<![\\!\\+\\:\\?])|[\\!\\+\\:\\?])=)", "dgv", { strategy: "clip_search" })]
      },
      beginCaptures: {
        "2": {
          name: "variable.other.makefile",
          patterns: [
            { include: "#variables" }
          ]
        },
        "3": { name: "punctuation.separator.key-value.makefile" }
      },
      end: /\n/dgv,
      patterns: [
        {
          match: /\\\n/dgv,
          name: "constant.character.escape.continuation.makefile"
        },
        { include: "#comment" },
        { include: "#variables" }
      ]
    },
    "variable-braces": {
      patterns: [
        {
          begin: /\$\{/dgv,
          captures: {
            "0": { name: "punctuation.definition.variable.makefile" }
          },
          end: /\}|((?<!\\)\n)/dgv,
          name: "string.interpolated.makefile",
          patterns: [
            { include: "#variables" },
            { include: "#builtin-variable-braces" },
            { include: "#function-variable-braces" },
            { include: "#flavor-variable-braces" },
            { include: "#another-variable-braces" }
          ]
        }
      ]
    },
    "variable-parentheses": {
      patterns: [
        {
          begin: /\$\(/dgv,
          captures: {
            "0": { name: "punctuation.definition.variable.makefile" }
          },
          end: /\)|((?<!\\)\n)/dgv,
          name: "string.interpolated.makefile",
          patterns: [
            { include: "#variables" },
            { include: "#builtin-variable-parentheses" },
            { include: "#function-variable-parentheses" },
            { include: "#flavor-variable-parentheses" },
            { include: "#another-variable-parentheses" }
          ]
        }
      ]
    },
    variables: {
      patterns: [
        { include: "#simple-variable" },
        { include: "#variable-parentheses" },
        { include: "#variable-braces" }
      ]
    }
  },
  dependencies: []
};
