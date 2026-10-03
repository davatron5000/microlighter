import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "erlang",
  displayName: "Erlang",
  aliases: [
    "erl"
  ],
  scopeName: "source.erlang",
  patterns: [
    { include: "#module-directive" },
    { include: "#import-export-directive" },
    { include: "#behaviour-directive" },
    { include: "#record-directive" },
    { include: "#define-directive" },
    { include: "#macro-directive" },
    { include: "#doc-directive" },
    { include: "#directive" },
    { include: "#function" },
    { include: "#everything-else" }
  ],
  repository: {
    atom: {
      patterns: [
        {
          begin: /(')/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.symbol.begin.erlang" }
          },
          end: /(')/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.symbol.end.erlang" }
          },
          name: "constant.other.symbol.quoted.single.erlang",
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.escape.erlang" },
                "3": { name: "punctuation.definition.escape.erlang" }
              },
              match: /(\\)(["'\\bdefnrstv]|(\^)[\@-_a-z]|[0-7]{1,3}|x[A-Fa-f\p{Nd}]{2})/dgv,
              name: "constant.other.symbol.escape.erlang"
            },
            {
              match: /\\\^?[^\n]?/dgv,
              name: "invalid.illegal.atom.erlang"
            }
          ]
        },
        {
          match: new EmulatedRegExp("[a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\1)", "dgv", { hiddenCaptures: [1] }),
          name: "constant.other.symbol.unquoted.erlang"
        }
      ]
    },
    "behaviour-directive": {
      captures: {
        "1": { name: "punctuation.section.directive.begin.erlang" },
        "2": { name: "keyword.control.directive.behaviour.erlang" },
        "3": { name: "punctuation.definition.parameters.begin.erlang" },
        "4": { name: "entity.name.type.class.behaviour.definition.erlang" },
        "5": { name: "punctuation.definition.parameters.end.erlang" },
        "6": { name: "punctuation.section.directive.end.erlang" }
      },
      match: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(behaviour)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\9))(?:(?=(\\p{space}*))\\10)(\\))(?:(?=(\\p{space}*))\\12)(\\.)", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10, 12] }),
      name: "meta.directive.behaviour.erlang"
    },
    binary: {
      begin: /(<<)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.binary.begin.erlang" }
      },
      end: /(>>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.binary.end.erlang" }
      },
      name: "meta.structure.binary.erlang",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.binary.erlang" },
            "2": { name: "punctuation.separator.value-size.erlang" }
          },
          match: /(,)|(:)/dgv
        },
        { include: "#internal-type-specifiers" },
        { include: "#everything-else" }
      ]
    },
    character: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.character.erlang" },
            "2": { name: "constant.character.escape.erlang" },
            "3": { name: "punctuation.definition.escape.erlang" },
            "5": { name: "punctuation.definition.escape.erlang" }
          },
          match: /(\$)((\\)(["'\\bdefnrstv]|(\^)[\@-_a-z]|[0-7]{1,3}|x[A-Fa-f\p{Nd}]{2}))/dgv,
          name: "constant.character.erlang"
        },
        {
          match: /\$\\\^?[^\n]?/dgv,
          name: "invalid.illegal.character.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.character.erlang" }
          },
          match: /(\$)[ \P{space}]/dgv,
          name: "constant.character.erlang"
        },
        {
          match: /\$[^\n]?/dgv,
          name: "invalid.illegal.character.erlang"
        }
      ]
    },
    comment: {
      begin: /(^[\t ]+)?(?=%)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.erlang" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /%/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.erlang" }
          },
          end: /\n/dgv,
          name: "comment.line.percentage.erlang"
        }
      ]
    },
    "define-directive": {
      patterns: [
        {
          begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(define)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)((?:(?=([\\@-Z_a-z\\p{Nd}]+))\\9))(?:(?=(\\p{space}*))\\10)", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10] }),
          beginCaptures: {
            "1": { name: "punctuation.section.directive.begin.erlang" },
            "2": { name: "keyword.control.directive.define.erlang" },
            "3": { name: "punctuation.definition.parameters.begin.erlang" },
            "4": { name: "entity.name.function.macro.definition.erlang" }
          },
          end: new EmulatedRegExp("(\\))(?:(?=(\\p{space}*))\\2)(\\.)", "dgv", { hiddenCaptures: [2] }),
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.erlang" },
            "2": { name: "punctuation.section.directive.end.erlang" }
          },
          name: "meta.directive.define.erlang",
          patterns: [
            { include: "#everything-else" }
          ]
        },
        {
          begin: new EmulatedRegExp("(?=^(?:(?=(\\p{space}*))\\1)-(?:(?=(\\p{space}*))\\2)define(?:(?=(\\p{space}*))\\3)\\((?:(?=(\\p{space}*))\\4)(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\5)(?:(?=(\\p{space}*))\\6)\\()", "dgv", { hiddenCaptures: [1, 2, 3, 4, 5, 6] }),
          end: new EmulatedRegExp("(\\))(?:(?=(\\p{space}*))\\2)(\\.)", "dgv", { hiddenCaptures: [2] }),
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.erlang" },
            "2": { name: "punctuation.section.directive.end.erlang" }
          },
          name: "meta.directive.define.erlang",
          patterns: [
            {
              begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(define)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)((?:(?=([\\@-Z_a-z\\p{Nd}]+))\\9))(?:(?=(\\p{space}*))\\10)(\\()", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10] }),
              beginCaptures: {
                "1": { name: "punctuation.section.directive.begin.erlang" },
                "2": { name: "keyword.control.directive.define.erlang" },
                "3": { name: "punctuation.definition.parameters.begin.erlang" },
                "4": { name: "entity.name.function.macro.definition.erlang" },
                "5": { name: "punctuation.definition.parameters.begin.erlang" }
              },
              end: /(\))\p{space}*(,)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.parameters.end.erlang" },
                "2": { name: "punctuation.separator.parameters.erlang" }
              },
              patterns: [
                {
                  match: /,/dgv,
                  name: "punctuation.separator.parameters.erlang"
                },
                { include: "#everything-else" }
              ]
            },
            {
              match: /\|\||[\,\.\:\;\|]|->/dgv,
              name: "punctuation.separator.define.erlang"
            },
            { include: "#everything-else" }
          ]
        }
      ]
    },
    directive: {
      patterns: [
        {
          begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\5))(?:(?=(\\p{space}*))\\6)(\\(?)", "dgv", { hiddenCaptures: [1, 3, 5, 6] }),
          beginCaptures: {
            "1": { name: "punctuation.section.directive.begin.erlang" },
            "2": { name: "keyword.control.directive.erlang" },
            "3": { name: "punctuation.definition.parameters.begin.erlang" }
          },
          end: new EmulatedRegExp("(\\)?)(?:(?=(\\p{space}*))\\2)(\\.)", "dgv", { hiddenCaptures: [2] }),
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.erlang" },
            "2": { name: "punctuation.section.directive.end.erlang" }
          },
          name: "meta.directive.erlang",
          patterns: [
            { include: "#everything-else" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.section.directive.begin.erlang" },
            "2": { name: "keyword.control.directive.erlang" },
            "3": { name: "punctuation.section.directive.end.erlang" }
          },
          match: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\5))(?:(?=(\\p{space}*))\\6)(\\.)", "dgv", { hiddenCaptures: [1, 3, 5, 6] }),
          name: "meta.directive.erlang"
        }
      ]
    },
    "doc-directive": {
      begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)((module)?doc)\\p{space}*(\\(\\p{space}*)?(~[BSbs]?)?((\"{3,})\\p{space}*)(\\P{space}[^\\n]*)?(?=\\n?$)", "dgv", { hiddenCaptures: [1, 3] }),
      beginCaptures: {
        "1": { name: "punctuation.section.directive.begin.erlang" },
        "2": { name: "keyword.control.directive.doc.erlang" },
        "4": { name: "punctuation.definition.parameters.begin.erlang" },
        "5": { name: "storage.type.string.erlang" },
        "6": { name: "comment.block.documentation.erlang" },
        "7": { name: "punctuation.definition.string.begin.erlang" },
        "8": { name: "invalid.illegal.string.erlang" }
      },
      contentName: "meta.embedded.block.markdown",
      end: /^(\p{space}*(7))\p{space}*(\)\p{space}*)?(\.)/dgv,
      endCaptures: {
        "1": { name: "comment.block.documentation.erlang" },
        "2": { name: "punctuation.definition.string.end.erlang" },
        "3": { name: "punctuation.section.directive.end.Erlang" }
      },
      name: "meta.directive.doc.erlang",
      patterns: [
        { include: "text.html.markdown" }
      ]
    },
    docstring: {
      begin: /(?<!")(("{3,})\p{space}*)(\P{space}[^\n]*)?(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "meta.string.quoted.triple.begin.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" },
        "3": { name: "invalid.illegal.string.erlang" }
      },
      end: /^(\p{space}*(2))(?!")/dgv,
      endCaptures: {
        "1": { name: "meta.string.quoted.triple.end.erlang" },
        "2": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.triple.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "everything-else": {
      patterns: [
        { include: "#comment" },
        { include: "#record-usage" },
        { include: "#macro-usage" },
        { include: "#expression" },
        { include: "#keyword" },
        { include: "#textual-operator" },
        { include: "#language-constant" },
        { include: "#function-call" },
        { include: "#tuple" },
        { include: "#list" },
        { include: "#binary" },
        { include: "#parenthesized-expression" },
        { include: "#character" },
        { include: "#number" },
        { include: "#atom" },
        { include: "#sigil-docstring" },
        { include: "#sigil-docstring-verbatim" },
        { include: "#sigil-string" },
        { include: "#docstring" },
        { include: "#string" },
        { include: "#symbolic-operator" },
        { include: "#variable" }
      ]
    },
    expression: {
      patterns: [
        {
          begin: /\b(if)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.if.erlang" }
          },
          end: /\b(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.erlang" }
          },
          name: "meta.expression.if.erlang",
          patterns: [
            { include: "#internal-expression-punctuation" },
            { include: "#everything-else" }
          ]
        },
        {
          begin: /\b(case)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.case.erlang" }
          },
          end: /\b(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.erlang" }
          },
          name: "meta.expression.case.erlang",
          patterns: [
            { include: "#internal-expression-punctuation" },
            { include: "#everything-else" }
          ]
        },
        {
          begin: /\b(receive)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.receive.erlang" }
          },
          end: /\b(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.erlang" }
          },
          name: "meta.expression.receive.erlang",
          patterns: [
            { include: "#internal-expression-punctuation" },
            { include: "#everything-else" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.control.fun.erlang" },
            "4": { name: "entity.name.type.class.module.erlang" },
            "5": { name: "variable.other.erlang" },
            "6": { name: "punctuation.separator.module-function.erlang" },
            "8": { name: "entity.name.function.erlang" },
            "9": { name: "variable.other.erlang" },
            "10": { name: "punctuation.separator.function-arity.erlang" }
          },
          match: new EmulatedRegExp("\\b(fun)\\p{space}+((([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\5))|(_(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\7)|[A-Z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\8)))(?:(?=(\\p{space}*))\\9)(:)(?:(?=(\\p{space}*))\\11))?(([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\14)|'(?:(?=([^']*))\\15)')|(_(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\17)|[A-Z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\18)))\\p{space}*(/)", "dgv", { hiddenCaptures: [5, 7, 8, 9, 11, 14, 15, 17, 18] }),
          name: "meta.expression.fun.implicit.erlang"
        },
        {
          begin: new EmulatedRegExp("\\b(fun)\\p{space}+(([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\4))|(_(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\6)|[A-Z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\7)))(?:(?=(\\p{space}*))\\8)(:)", "dgv", { hiddenCaptures: [4, 6, 7, 8] }),
          beginCaptures: {
            "1": { name: "keyword.control.fun.erlang" },
            "3": { name: "entity.name.type.class.module.erlang" },
            "4": { name: "variable.other.erlang" },
            "5": { name: "punctuation.separator.module-function.erlang" }
          },
          end: /(\/)/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.function-arity.erlang" }
          },
          name: "meta.expression.fun.implicit.erlang",
          patterns: [
            { include: "#everything-else" }
          ]
        },
        {
          begin: /\b(fun)\p{space}+(?!\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.fun.erlang" }
          },
          end: /(\/)/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.function-arity.erlang" }
          },
          name: "meta.expression.fun.implicit.erlang",
          patterns: [
            { include: "#everything-else" }
          ]
        },
        {
          begin: new EmulatedRegExp("\\b(fun)(?:(?=(\\p{space}*))\\2)(\\()(?=((?:(?=(\\p{space}*))\\5)\\()|(\\)))", "dgv", { hiddenCaptures: [2, 5] }),
          beginCaptures: {
            "1": { name: "entity.name.function.erlang" },
            "2": { name: "punctuation.definition.parameters.begin.erlang" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.erlang" }
          },
          patterns: [
            { include: "#everything-else" }
          ]
        },
        {
          begin: /\b(fun)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.fun.erlang" }
          },
          end: /\b(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.erlang" }
          },
          name: "meta.expression.fun.erlang",
          patterns: [
            {
              begin: /(?=\()/dgv,
              end: /(;)|(?=\bend\b)/dgv,
              endCaptures: {
                "1": { name: "punctuation.separator.clauses.erlang" }
              },
              patterns: [
                { include: "#internal-function-parts" }
              ]
            },
            { include: "#everything-else" }
          ]
        },
        {
          begin: /\b(try)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.try.erlang" }
          },
          end: /\b(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.erlang" }
          },
          name: "meta.expression.try.erlang",
          patterns: [
            { include: "#internal-expression-punctuation" },
            { include: "#everything-else" }
          ]
        },
        {
          begin: /\b(begin)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.begin.erlang" }
          },
          end: /\b(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.erlang" }
          },
          name: "meta.expression.begin.erlang",
          patterns: [
            { include: "#internal-expression-punctuation" },
            { include: "#everything-else" }
          ]
        },
        {
          begin: /\b(maybe)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.maybe.erlang" }
          },
          end: /\b(end)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.erlang" }
          },
          name: "meta.expression.maybe.erlang",
          patterns: [
            { include: "#internal-expression-punctuation" },
            { include: "#everything-else" }
          ]
        }
      ]
    },
    function: {
      begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\3)|'(?:(?=([^']*))\\4)')(?:(?=(\\p{space}*))\\5)(?=\\()", "dgv", { hiddenCaptures: [1, 3, 4, 5] }),
      beginCaptures: {
        "1": { name: "entity.name.function.definition.erlang" }
      },
      end: /(\.)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.function.erlang" }
      },
      name: "meta.function.erlang",
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.erlang" }
          },
          match: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\3)|'(?:(?=([^']*))\\4)')(?:(?=(\\p{space}*))\\5)(?=\\()", "dgv", { hiddenCaptures: [1, 3, 4, 5] })
        },
        {
          begin: /(?=\()/dgv,
          end: /(;)|(?=\.)/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.clauses.erlang" }
          },
          patterns: [
            { include: "#parenthesized-expression" },
            { include: "#internal-function-parts" }
          ]
        },
        { include: "#everything-else" }
      ]
    },
    "function-call": {
      begin: new EmulatedRegExp("(?=([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\2)|'(?:(?=([^']*))\\3)'|_(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\4)|[A-Z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\5))(?:(?=(\\p{space}*))\\6)(\\(|:(?:(?=(\\p{space}*))\\8)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\10)|'(?:(?=([^']*))\\11)'|_(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\12)|[A-Z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\13))(?:(?=(\\p{space}*))\\14)\\())", "dgv", { hiddenCaptures: [2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 14] }),
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.parameters.end.erlang" }
      },
      name: "meta.function-call.erlang",
      patterns: [
        {
          begin: new EmulatedRegExp("((erlang)(?:(?=(\\p{space}*))\\3)(:)(?:(?=(\\p{space}*))\\5))?(is_atom|is_binary|is_constant|is_float|is_function|is_integer|is_list|is_number|is_pid|is_port|is_reference|is_tuple|is_record|abs|element|hd|length|node|round|self|size|tl|trunc)(?:(?=(\\p{space}*))\\7)(\\()", "dgv", { hiddenCaptures: [3, 5, 7] }),
          beginCaptures: {
            "2": { name: "entity.name.type.class.module.erlang" },
            "3": { name: "punctuation.separator.module-function.erlang" },
            "4": { name: "entity.name.function.guard.erlang" },
            "5": { name: "punctuation.definition.parameters.begin.erlang" }
          },
          end: /(?=\))/dgv,
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.separator.parameters.erlang"
            },
            { include: "#everything-else" }
          ]
        },
        {
          begin: new EmulatedRegExp("((([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\4)|'(?:(?=([^']*))\\5)')|(_(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\7)|[A-Z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\8)))(?:(?=(\\p{space}*))\\9)(:)(?:(?=(\\p{space}*))\\11))?(([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\14)|'(?:(?=([^']*))\\15)')|(_(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\17)|[A-Z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\18)))(?:(?=(\\p{space}*))\\19)(\\()", "dgv", { hiddenCaptures: [4, 5, 7, 8, 9, 11, 14, 15, 17, 18, 19] }),
          beginCaptures: {
            "3": { name: "entity.name.type.class.module.erlang" },
            "4": { name: "variable.other.erlang" },
            "5": { name: "punctuation.separator.module-function.erlang" },
            "7": { name: "entity.name.function.erlang" },
            "8": { name: "variable.other.erlang" },
            "9": { name: "punctuation.definition.parameters.begin.erlang" }
          },
          end: /(?=\))/dgv,
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.separator.parameters.erlang"
            },
            { include: "#everything-else" }
          ]
        }
      ]
    },
    "import-export-directive": {
      patterns: [
        {
          begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(import)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\9)|'(?:(?=([^']*))\\10)')(?:(?=(\\p{space}*))\\11)(,)", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10, 11] }),
          beginCaptures: {
            "1": { name: "punctuation.section.directive.begin.erlang" },
            "2": { name: "keyword.control.directive.import.erlang" },
            "3": { name: "punctuation.definition.parameters.begin.erlang" },
            "4": { name: "entity.name.type.class.module.erlang" },
            "5": { name: "punctuation.separator.parameters.erlang" }
          },
          end: new EmulatedRegExp("(\\))(?:(?=(\\p{space}*))\\2)(\\.)", "dgv", { hiddenCaptures: [2] }),
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.erlang" },
            "2": { name: "punctuation.section.directive.end.erlang" }
          },
          name: "meta.directive.import.erlang",
          patterns: [
            { include: "#internal-function-list" }
          ]
        },
        {
          begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(export)(?:(?=(\\p{space}*))\\5)(\\()", "dgv", { hiddenCaptures: [1, 3, 5] }),
          beginCaptures: {
            "1": { name: "punctuation.section.directive.begin.erlang" },
            "2": { name: "keyword.control.directive.export.erlang" },
            "3": { name: "punctuation.definition.parameters.begin.erlang" }
          },
          end: new EmulatedRegExp("(\\))(?:(?=(\\p{space}*))\\2)(\\.)", "dgv", { hiddenCaptures: [2] }),
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.erlang" },
            "2": { name: "punctuation.section.directive.end.erlang" }
          },
          name: "meta.directive.export.erlang",
          patterns: [
            { include: "#internal-function-list" }
          ]
        }
      ]
    },
    "internal-expression-punctuation": {
      captures: {
        "1": { name: "punctuation.separator.clause-head-body.erlang" },
        "2": { name: "punctuation.separator.clauses.erlang" },
        "3": { name: "punctuation.separator.expressions.erlang" }
      },
      match: /(->)|(;)|(,)/dgv
    },
    "internal-function-list": {
      begin: /(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.list.begin.erlang" }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.list.end.erlang" }
      },
      name: "meta.structure.list.function.erlang",
      patterns: [
        {
          begin: new EmulatedRegExp("([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\2)|'(?:(?=([^']*))\\3)')(?:(?=(\\p{space}*))\\4)(/)", "dgv", { hiddenCaptures: [2, 3, 4] }),
          beginCaptures: {
            "1": { name: "entity.name.function.erlang" },
            "2": { name: "punctuation.separator.function-arity.erlang" }
          },
          end: /(,)|(?=\])/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.list.erlang" }
          },
          patterns: [
            { include: "#everything-else" }
          ]
        },
        { include: "#everything-else" }
      ]
    },
    "internal-function-parts": {
      patterns: [
        {
          begin: /(?=\()/dgv,
          end: /(->)/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.clause-head-body.erlang" }
          },
          patterns: [
            {
              begin: /(\()/dgv,
              beginCaptures: {
                "1": { name: "punctuation.definition.parameters.begin.erlang" }
              },
              end: /(\))/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.parameters.end.erlang" }
              },
              patterns: [
                {
                  match: /,/dgv,
                  name: "punctuation.separator.parameters.erlang"
                },
                { include: "#everything-else" }
              ]
            },
            {
              match: /[\,\;]/dgv,
              name: "punctuation.separator.guards.erlang"
            },
            { include: "#everything-else" }
          ]
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.expressions.erlang"
        },
        { include: "#everything-else" }
      ]
    },
    "internal-record-body": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.class.record.begin.erlang" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.class.record.end.erlang" }
      },
      name: "meta.structure.record.erlang",
      patterns: [
        {
          begin: new EmulatedRegExp("(([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\3)|'(?:(?=([^']*))\\4)')|(_))", "dgv", { hiddenCaptures: [3, 4] }),
          beginCaptures: {
            "2": { name: "variable.other.field.erlang" },
            "3": { name: "variable.language.omitted.field.erlang" }
          },
          end: /(,)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.class.record.erlang" }
          },
          patterns: [
            { include: "#everything-else" }
          ]
        },
        { include: "#everything-else" }
      ]
    },
    "internal-string-body": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.escape.erlang" },
            "3": { name: "punctuation.definition.escape.erlang" }
          },
          match: /(\\)(["'\\bdefnrstv]|(\^)[\@-_a-z]|[0-7]{1,3}|x[A-Fa-f\p{Nd}]{2})/dgv,
          name: "constant.character.escape.erlang"
        },
        {
          match: /\\\^?[^\n]?/dgv,
          name: "invalid.illegal.string.erlang"
        },
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "internal-string-body-verbatim": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.placeholder.erlang" },
            "6": { name: "punctuation.separator.placeholder-parts.erlang" },
            "10": { name: "punctuation.separator.placeholder-parts.erlang" }
          },
          match: new EmulatedRegExp("(~)((-)?(?:(?=(\\p{Nd}+))\\4)|(\\*))?((\\.)((?:(?=(\\p{Nd}+))\\9)|(\\*))?((\\.)((\\*)|[^\\n]))?)?[Kklt]*[\\#\\+BPWXbcefginpswx\\~]", "dgv", { hiddenCaptures: [4, 9] }),
          name: "constant.character.format.placeholder.other.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.placeholder.erlang" }
          },
          match: new EmulatedRegExp("(~)(\\*)?((?:(?=(\\p{Nd}+))\\4))?(t)?[\\-\\#acdflsu\\~]", "dgv", { hiddenCaptures: [4] }),
          name: "constant.character.format.placeholder.other.erlang"
        },
        {
          match: /~[^"]?/dgv,
          name: "invalid.illegal.string.erlang"
        }
      ]
    },
    "internal-type-specifiers": {
      begin: /(\/)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.separator.value-type.erlang" }
      },
      end: /(?=[\,\:]|>>)/dgv,
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.erlang" },
            "2": { name: "storage.modifier.signedness.erlang" },
            "3": { name: "storage.modifier.endianness.erlang" },
            "4": { name: "storage.modifier.unit.erlang" },
            "5": { name: "punctuation.separator.unit-specifiers.erlang" },
            "6": { name: "constant.numeric.integer.decimal.erlang" },
            "7": { name: "punctuation.separator.type-specifiers.erlang" }
          },
          match: new EmulatedRegExp("(integer|float|binary|bytes|bitstring|bits|utf8|utf16|utf32)|((?:|un)signed)|(big|little|native)|(unit)(:)((?:(?=(\\p{Nd}+))\\7))|(-)", "dgv", { hiddenCaptures: [7] })
        }
      ]
    },
    keyword: {
      match: /\b(after|begin|case|catch|cond|end|fun|if|let|of|try|receive|when|maybe|else)\b/dgv,
      name: "keyword.control.erlang"
    },
    "language-constant": {
      match: /\b(false|true|undefined)\b/dgv,
      name: "constant.language"
    },
    list: {
      begin: /(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.list.begin.erlang" }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.list.end.erlang" }
      },
      name: "meta.structure.list.erlang",
      patterns: [
        {
          match: /\|\|??|,/dgv,
          name: "punctuation.separator.list.erlang"
        },
        { include: "#everything-else" }
      ]
    },
    "macro-directive": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.section.directive.begin.erlang" },
            "2": { name: "keyword.control.directive.ifdef.erlang" },
            "3": { name: "punctuation.definition.parameters.begin.erlang" },
            "4": { name: "entity.name.function.macro.erlang" },
            "5": { name: "punctuation.definition.parameters.end.erlang" },
            "6": { name: "punctuation.section.directive.end.erlang" }
          },
          match: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(ifdef)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)((?:(?=([\\@-z\\p{Nd}]+))\\9))(?:(?=(\\p{space}*))\\10)(\\))(?:(?=(\\p{space}*))\\12)(\\.)", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10, 12] }),
          name: "meta.directive.ifdef.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.section.directive.begin.erlang" },
            "2": { name: "keyword.control.directive.ifndef.erlang" },
            "3": { name: "punctuation.definition.parameters.begin.erlang" },
            "4": { name: "entity.name.function.macro.erlang" },
            "5": { name: "punctuation.definition.parameters.end.erlang" },
            "6": { name: "punctuation.section.directive.end.erlang" }
          },
          match: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(ifndef)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)((?:(?=([\\@-z\\p{Nd}]+))\\9))(?:(?=(\\p{space}*))\\10)(\\))(?:(?=(\\p{space}*))\\12)(\\.)", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10, 12] }),
          name: "meta.directive.ifndef.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.section.directive.begin.erlang" },
            "2": { name: "keyword.control.directive.undef.erlang" },
            "3": { name: "punctuation.definition.parameters.begin.erlang" },
            "4": { name: "entity.name.function.macro.erlang" },
            "5": { name: "punctuation.definition.parameters.end.erlang" },
            "6": { name: "punctuation.section.directive.end.erlang" }
          },
          match: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(undef)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)((?:(?=([\\@-z\\p{Nd}]+))\\9))(?:(?=(\\p{space}*))\\10)(\\))(?:(?=(\\p{space}*))\\12)(\\.)", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10, 12] }),
          name: "meta.directive.undef.erlang"
        }
      ]
    },
    "macro-usage": {
      captures: {
        "1": { name: "keyword.operator.macro.erlang" },
        "2": { name: "entity.name.function.macro.erlang" }
      },
      match: new EmulatedRegExp("(\\?\\??)(?:(?=(\\p{space}*))\\2)((?:(?=([\\@-Z_a-z\\p{Nd}]+))\\4))", "dgv", { hiddenCaptures: [2, 4] }),
      name: "meta.macro-usage.erlang"
    },
    "module-directive": {
      captures: {
        "1": { name: "punctuation.section.directive.begin.erlang" },
        "2": { name: "keyword.control.directive.module.erlang" },
        "3": { name: "punctuation.definition.parameters.begin.erlang" },
        "4": { name: "entity.name.type.class.module.definition.erlang" },
        "5": { name: "punctuation.definition.parameters.end.erlang" },
        "6": { name: "punctuation.section.directive.end.erlang" }
      },
      match: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(module)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\9))(?:(?=(\\p{space}*))\\10)(\\))(?:(?=(\\p{space}*))\\12)(\\.)", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10, 12] }),
      name: "meta.directive.module.erlang"
    },
    number: {
      begin: /(?=\p{Nd})/dgv,
      end: /(?!\p{Nd})/dgv,
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.integer-float.erlang" },
            "2": { name: "punctuation.separator.float-exponent.erlang" }
          },
          match: new EmulatedRegExp("(?:(?=(\\p{Nd}+))\\1)(\\.)(?:(?=(\\p{Nd}+))\\3)([Ee][\\-\\+]?(?:(?=(\\p{Nd}+))\\5))?", "dgv", { hiddenCaptures: [1, 3, 5] }),
          name: "constant.numeric.float.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("2(#)((?:(?=([01]+))\\3)_)*(?:(?=([01]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.binary.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("3(#)((?:(?=([012]+))\\3)_)*(?:(?=([012]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-3.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("4(#)((?:(?=([0-3]+))\\3)_)*(?:(?=([0-3]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-4.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("5(#)((?:(?=([0-4]+))\\3)_)*(?:(?=([0-4]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-5.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("6(#)((?:(?=([0-5]+))\\3)_)*(?:(?=([0-5]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-6.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("7(#)((?:(?=([0-6]+))\\3)_)*(?:(?=([0-6]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-7.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("8(#)((?:(?=([0-7]+))\\3)_)*(?:(?=([0-7]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.octal.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("9(#)((?:(?=([0-8]+))\\3)_)*(?:(?=([0-8]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-9.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("10(#)((?:(?=(\\p{Nd}+))\\3)_)*(?:(?=(\\p{Nd}+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.decimal.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("11(#)((?:(?=([Aa\\p{Nd}]+))\\3)_)*(?:(?=([Aa\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-11.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("12(#)((?:(?=([ABab\\p{Nd}]+))\\3)_)*(?:(?=([ABab\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-12.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("13(#)((?:(?=([ABCabc\\p{Nd}]+))\\3)_)*(?:(?=([ABCabc\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-13.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("14(#)((?:(?=([A-Da-d\\p{Nd}]+))\\3)_)*(?:(?=([A-Da-d\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-14.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("15(#)((?:(?=([A-Ea-e\\p{Nd}]+))\\3)_)*(?:(?=([A-Ea-e\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-15.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("16(#)((?:(?=([A-Fa-f\\p{Nd}]+))\\3)_)*(?:(?=([A-Fa-f\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.hexadecimal.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("17(#)((?:(?=([A-Ga-g\\p{Nd}]+))\\3)_)*(?:(?=([A-Ga-g\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-17.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("18(#)((?:(?=([A-Ha-h\\p{Nd}]+))\\3)_)*(?:(?=([A-Ha-h\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-18.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("19(#)((?:(?=([A-Ia-i\\p{Nd}]+))\\3)_)*(?:(?=([A-Ia-i\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-19.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("20(#)((?:(?=([A-Ja-j\\p{Nd}]+))\\3)_)*(?:(?=([A-Ja-j\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-20.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("21(#)((?:(?=([A-Ka-k\\p{Nd}]+))\\3)_)*(?:(?=([A-Ka-k\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-21.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("22(#)((?:(?=([A-La-l\\p{Nd}]+))\\3)_)*(?:(?=([A-La-l\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-22.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("23(#)((?:(?=([A-Ma-m\\p{Nd}]+))\\3)_)*(?:(?=([A-Ma-m\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-23.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("24(#)((?:(?=([A-Na-n\\p{Nd}]+))\\3)_)*(?:(?=([A-Na-n\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-24.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("25(#)((?:(?=([A-Oa-o\\p{Nd}]+))\\3)_)*(?:(?=([A-Oa-o\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-25.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("26(#)((?:(?=([A-Pa-p\\p{Nd}]+))\\3)_)*(?:(?=([A-Pa-p\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-26.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("27(#)((?:(?=([A-Qa-q\\p{Nd}]+))\\3)_)*(?:(?=([A-Qa-q\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-27.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("28(#)((?:(?=([A-Ra-r\\p{Nd}]+))\\3)_)*(?:(?=([A-Ra-r\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-28.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("29(#)((?:(?=([A-Sa-s\\p{Nd}]+))\\3)_)*(?:(?=([A-Sa-s\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-29.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("30(#)((?:(?=([A-Ta-t\\p{Nd}]+))\\3)_)*(?:(?=([A-Ta-t\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-30.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("31(#)((?:(?=([A-Ua-u\\p{Nd}]+))\\3)_)*(?:(?=([A-Ua-u\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-31.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("32(#)((?:(?=([A-Va-v\\p{Nd}]+))\\3)_)*(?:(?=([A-Va-v\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-32.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("33(#)((?:(?=([A-Wa-w\\p{Nd}]+))\\3)_)*(?:(?=([A-Wa-w\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-33.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("34(#)((?:(?=([A-Xa-x\\p{Nd}]+))\\3)_)*(?:(?=([A-Xa-x\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-34.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("35(#)((?:(?=([A-Ya-y\\p{Nd}]+))\\3)_)*(?:(?=([A-Ya-y\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-35.erlang"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.base-integer.erlang" }
          },
          match: new EmulatedRegExp("36(#)((?:(?=([A-Za-z\\p{Nd}]+))\\3)_)*(?:(?=([A-Za-z\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [3, 4] }),
          name: "constant.numeric.integer.base-36.erlang"
        },
        {
          match: new EmulatedRegExp("(?:(?=(\\p{Nd}+))\\1)#((?:(?=([A-Za-z\\p{Nd}]+))\\3)_)*(?:(?=([A-Za-z\\p{Nd}]+))\\4)", "dgv", { hiddenCaptures: [1, 3, 4] }),
          name: "invalid.illegal.integer.erlang"
        },
        {
          match: new EmulatedRegExp("((?:(?=(\\p{Nd}+))\\2)_)*(?:(?=(\\p{Nd}+))\\3)", "dgv", { hiddenCaptures: [2, 3] }),
          name: "constant.numeric.integer.decimal.erlang"
        }
      ]
    },
    "parenthesized-expression": {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.expression.begin.erlang" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.expression.end.erlang" }
      },
      name: "meta.expression.parenthesized",
      patterns: [
        { include: "#everything-else" }
      ]
    },
    "record-directive": {
      begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(-)(?:(?=(\\p{space}*))\\3)(record)(?:(?=(\\p{space}*))\\5)(\\()(?:(?=(\\p{space}*))\\7)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\9)|'(?:(?=([^']*))\\10)')(?:(?=(\\p{space}*))\\11)(,)", "dgv", { hiddenCaptures: [1, 3, 5, 7, 9, 10, 11] }),
      beginCaptures: {
        "1": { name: "punctuation.section.directive.begin.erlang" },
        "2": { name: "keyword.control.directive.import.erlang" },
        "3": { name: "punctuation.definition.parameters.begin.erlang" },
        "4": { name: "entity.name.type.class.record.definition.erlang" },
        "5": { name: "punctuation.separator.parameters.erlang" }
      },
      end: new EmulatedRegExp("(\\))(?:(?=(\\p{space}*))\\2)(\\.)", "dgv", { hiddenCaptures: [2] }),
      endCaptures: {
        "1": { name: "punctuation.definition.parameters.end.erlang" },
        "2": { name: "punctuation.section.directive.end.erlang" }
      },
      name: "meta.directive.record.erlang",
      patterns: [
        { include: "#internal-record-body" },
        { include: "#comment" }
      ]
    },
    "record-usage": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.record.erlang" },
            "2": { name: "entity.name.type.class.record.erlang" },
            "3": { name: "punctuation.separator.record-field.erlang" },
            "4": { name: "variable.other.field.erlang" }
          },
          match: new EmulatedRegExp("(#)(?:(?=(\\p{space}*))\\2)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\4)|'(?:(?=([^']*))\\5)')(?:(?=(\\p{space}*))\\6)(\\.)(?:(?=(\\p{space}*))\\8)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\10)|'(?:(?=([^']*))\\11)')", "dgv", { hiddenCaptures: [2, 4, 5, 6, 8, 10, 11] }),
          name: "meta.record-usage.erlang"
        },
        {
          begin: new EmulatedRegExp("(#)(?:(?=(\\p{space}*))\\2)([a-z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\4)|'(?:(?=([^']*))\\5)')", "dgv", { hiddenCaptures: [2, 4, 5] }),
          beginCaptures: {
            "1": { name: "keyword.operator.record.erlang" },
            "2": { name: "entity.name.type.class.record.erlang" }
          },
          end: /(?<=\})/dgv,
          name: "meta.record-usage.erlang",
          patterns: [
            { include: "#internal-record-body" }
          ]
        }
      ]
    },
    "sigil-docstring": {
      begin: /(~[bs])(("{3,})\p{space}*)(\P{space}[^\n]*)?(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "meta.string.quoted.triple.begin.erlang" },
        "3": { name: "punctuation.definition.string.begin.erlang" },
        "4": { name: "invalid.illegal.string.erlang" }
      },
      end: /^(\p{space}*(3))(?!")/dgv,
      endCaptures: {
        "1": { name: "meta.string.quoted.triple.end.erlang" },
        "2": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.tripple.sigil.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "sigil-docstring-verbatim": {
      begin: /(~[BS]?)(("{3,})\p{space}*)(\P{space}[^\n]*)?(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "meta.string.quoted.triple.begin.erlang" },
        "3": { name: "punctuation.definition.string.begin.erlang" },
        "4": { name: "invalid.illegal.string.erlang" }
      },
      end: /^(\p{space}*(3))(?!")/dgv,
      endCaptures: {
        "1": { name: "meta.string.quoted.triple.end.erlang" },
        "2": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.tripple.sigil.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "sigil-string": {
      patterns: [
        { include: "#sigil-string-parenthesis" },
        { include: "#sigil-string-parenthesis-verbatim" },
        { include: "#sigil-string-curly-brackets" },
        { include: "#sigil-string-curly-brackets-verbatim" },
        { include: "#sigil-string-square-brackets" },
        { include: "#sigil-string-square-brackets-verbatim" },
        { include: "#sigil-string-less-greater" },
        { include: "#sigil-string-less-greater-verbatim" },
        { include: "#sigil-string-single-character" },
        { include: "#sigil-string-single-character-verbatim" },
        { include: "#sigil-string-single-quote" },
        { include: "#sigil-string-single-quote-verbatim" },
        { include: "#sigil-string-double-quote" },
        { include: "#sigil-string-double-quote-verbatim" }
      ]
    },
    "sigil-string-curly-brackets": {
      begin: /(~[bs]?)(\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.curly-brackets.sigil.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "sigil-string-curly-brackets-verbatim": {
      begin: /(~[BS])(\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.curly-brackets.sigil.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "sigil-string-double-quote": {
      begin: /(~[bs]?)(")/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(2)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.double.sigil.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "sigil-string-double-quote-verbatim": {
      begin: /(~[BS])(")/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(2)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.double.sigil.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "sigil-string-less-greater": {
      begin: /(~[bs]?)(<)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.less-greater.sigil.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "sigil-string-less-greater-verbatim": {
      begin: /(~[BS])(<)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.less-greater.sigil.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "sigil-string-parenthesis": {
      begin: /(~[bs]?)(\()/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.parenthesis.sigil.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "sigil-string-parenthesis-verbatim": {
      begin: /(~[BS])(\()/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.parenthesis.sigil.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "sigil-string-single-character": {
      begin: /(~[bs]?)([\#\/\`\|])/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(2)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.other.sigil.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "sigil-string-single-character-verbatim": {
      begin: /(~[BS])([\#\/\`\|])/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(2)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.other.sigil.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "sigil-string-single-quote": {
      begin: /(~[bs]?)(')/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(2)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.single.sigil.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "sigil-string-single-quote-verbatim": {
      begin: /(~[BS])(')/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(2)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.single.sigil.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    "sigil-string-square-brackets": {
      begin: /(~[bs]?)(\[)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.square-brackets.sigil.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "sigil-string-square-brackets-verbatim": {
      begin: /(~[BS])(\[)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.string.erlang" },
        "2": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.square-brackets.sigil.erlang",
      patterns: [
        { include: "#internal-string-body-verbatim" }
      ]
    },
    string: {
      begin: /(")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.erlang" }
      },
      end: /(")/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.erlang" }
      },
      name: "string.quoted.double.erlang",
      patterns: [
        { include: "#internal-string-body" }
      ]
    },
    "symbolic-operator": {
      match: /\+\+?|--|[\-\*]|\/=?|=\/=|=:=|==|=<?|<-?|>=|[\!\>]|::|\?=/dgv,
      name: "keyword.operator.symbolic.erlang"
    },
    "textual-operator": {
      match: /\b(andalso|band|and|bxor|xor|bor|orelse|or|bnot|not|bsl|bsr|div|rem)\b/dgv,
      name: "keyword.operator.textual.erlang"
    },
    tuple: {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tuple.begin.erlang" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tuple.end.erlang" }
      },
      name: "meta.structure.tuple.erlang",
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.separator.tuple.erlang"
        },
        { include: "#everything-else" }
      ]
    },
    variable: {
      captures: {
        "1": { name: "variable.other.erlang" },
        "2": { name: "variable.language.omitted.erlang" }
      },
      match: new EmulatedRegExp("(_(?:(?=([\\@-Z_a-z\\p{Nd}]+))\\2)|[A-Z](?:(?=([\\@-Z_a-z\\p{Nd}]*))\\3))|(_)", "dgv", { hiddenCaptures: [2, 3] })
    }
  },
  dependencies: [
    "markdown"
  ]
};
