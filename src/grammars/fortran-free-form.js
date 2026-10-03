import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "fortran-free-form",
  displayName: "Fortran (Free Form)",
  aliases: [
    "f90",
    "f95",
    "f03",
    "f08",
    "f18"
  ],
  scopeName: "source.fortran.free",
  patterns: [
    { include: "#preprocessor" },
    { include: "#comments" },
    { include: "#constants" },
    { include: "#operators" },
    { include: "#array-constructor" },
    { include: "#parentheses" },
    { include: "#include-statement" },
    { include: "#import-statement" },
    { include: "#block-data-definition" },
    { include: "#function-definition" },
    { include: "#module-definition" },
    { include: "#program-definition" },
    { include: "#submodule-definition" },
    { include: "#subroutine-definition" },
    { include: "#procedure-definition" },
    { include: "#derived-type-definition" },
    { include: "#enum-block-construct" },
    { include: "#interface-block-constructs" },
    { include: "#procedure-specification-statement" },
    { include: "#type-specification-statements" },
    { include: "#specification-statements" },
    { include: "#control-constructs" },
    { include: "#control-statements" },
    { include: "#execution-statements" },
    { include: "#intrinsic-functions" },
    { include: "#variable" }
  ],
  repository: {
    "IO-item-list": {
      begin: /(?=\p{space}*["'0-9a-z])/dgiv,
      contentName: "meta.name-list.fortran",
      end: /(?=[\n\!\)\;])/dgv,
      patterns: [
        { include: "#constants" },
        { include: "#operators" },
        { include: "#intrinsic-functions" },
        { include: "#array-constructor" },
        { include: "#parentheses" },
        { include: "#brackets" },
        { include: "#assignment-keyword" },
        { include: "#operator-keyword" },
        { include: "#variable" }
      ]
    },
    "IO-keywords": {
      begin: {
        G: [/￿\p{space}*\b(?:(read)|(write))\p{space}*(\()/dgiv, /\p{space}*\b(?:(read)|(write))\p{space}*(\()/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.generic-spec.read.fortran" },
        "2": { name: "keyword.control.generic-spec.write.fortran" },
        "3": { name: "punctuation.parentheses.left.fortran" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.generic-spec.formatted.fortran" },
            "2": { name: "keyword.control.generic-spec.unformatted.fortran" }
          },
          match: {
            G: [/￿\p{space}*\b(?:(formatted)|(unformatted))\b/dgiv, /\p{space}*\b(?:(formatted)|(unformatted))\b/dgivy]
          }
        },
        { include: "#invalid-word" }
      ]
    },
    "IO-statements": {
      patterns: [
        {
          begin: /\b(format)(?=\p{space}*[\!\&\(])/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.format.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          name: "meta.statement.IO.fortran",
          patterns: [
            { include: "#comments" },
            { include: "#line-continuation-operator" },
            { include: "#format-parentheses" }
          ]
        },
        {
          begin: /\b(?:(backspace)|(close)|(endfile)|(inquire)|(open)|(read)|(rewind)|(write))\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.backspace.fortran" },
            "2": { name: "keyword.control.close.fortran" },
            "3": { name: "keyword.control.endfile.fortran" },
            "4": { name: "keyword.control.inquire.fortran" },
            "5": { name: "keyword.control.open.fortran" },
            "6": { name: "keyword.control.read.fortran" },
            "7": { name: "keyword.control.rewind.fortran" },
            "8": { name: "keyword.control.write.fortran" },
            "9": { name: "punctuation.parentheses.left.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          name: "meta.statement.IO.fortran",
          patterns: [
            { include: "#parentheses-dummy-variables" },
            { include: "#IO-item-list" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.control.backspace.fortran" },
            "2": { name: "keyword.control.endfile.fortran" },
            "3": { name: "keyword.control.format.fortran" },
            "4": { name: "keyword.control.print.fortran" },
            "5": { name: "keyword.control.read.fortran" },
            "6": { name: "keyword.control.rewind.fortran" }
          },
          match: /\b(?:(backspace)|(endfile)|(format)|(print)|(read)|(rewind))\b/dgiv
        },
        {
          begin: /\b(?:(flush)|(wait))\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.flush.fortran" },
            "2": { name: "keyword.control.wait.fortran" },
            "3": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.control.flush.fortran" }
          },
          match: /\b(flush)\b/dgiv
        }
      ]
    },
    "abstract-attribute": {
      captures: {
        "1": { name: "storage.modifier.fortran.fortran" }
      },
      match: {
        G: [/￿\p{space}*\b(abstract)\b/dgiv, /\p{space}*\b(abstract)\b/dgivy]
      }
    },
    "abstract-interface-block-construct": {
      begin: /\b(abstract)\p{space}+(interface)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.other.attribute.fortran.modern" },
        "2": { name: "keyword.control.interface.fortran" }
      },
      end: /\b(end\p{space}*interface)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.endinterface.fortran.modern" }
      },
      name: "meta.interface.abstract.fortran",
      patterns: [
        { include: "$base" }
      ]
    },
    "access-attribute": {
      patterns: [
        { include: "#private-attribute" },
        { include: "#public-attribute" }
      ]
    },
    "allocatable-attribute": {
      captures: {
        "1": { name: "storage.modifier.allocatable.fortran" }
      },
      match: /\p{space}*\b(allocatable)\b/dgiv
    },
    "allocate-statement": {
      begin: /\b(allocate)\p{space}*(?=\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.allocate.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      name: "meta.statement.allocate.fortran",
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "arithmetic-operators": {
      captures: {
        "1": { name: "keyword.operator.subtraction.fortran" },
        "2": { name: "keyword.operator.addition.fortran" },
        "3": { name: "keyword.operator.division.fortran" },
        "4": { name: "keyword.operator.power.fortran" },
        "5": { name: "keyword.operator.multiplication.fortran" }
      },
      match: /(-)|(\+)|\/(?![\/\=\\])|(\*\*)|(\*)/dgv
    },
    "array-constructor": {
      begin: /(?<!\n)(?=\p{space}*(\[|\(\/))/dgv,
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.contructor.array",
      patterns: [
        { include: "#brackets" },
        {
          begin: /\p{space}*(\(\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.bracket.left.fortran" }
          },
          end: /(\/\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.bracket.left.fortran" }
          },
          patterns: [
            { include: "#comments" },
            { include: "#constants" },
            { include: "#operators" },
            { include: "#array-constructor" },
            { include: "#parentheses" },
            { include: "#intrinsic-functions" },
            { include: "#variable" }
          ]
        }
      ]
    },
    "assign-statement": {
      patterns: [
        {
          begin: /\b(assign)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.assign.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          name: "meta.statement.control.assign.fortran",
          patterns: [
            {
              captures: {
                "1": { name: "keyword.control.to.fortran" }
              },
              match: /\p{space}*\b(to)\b/dgiv
            },
            { include: "$base" }
          ]
        }
      ]
    },
    "assignment-keyword": {
      begin: {
        G: [/￿\p{space}*\b(assignment)\p{space}*(\()/dgiv, /\p{space}*\b(assignment)\p{space}*(\()/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.generic-spec.assignment.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      patterns: [
        { include: "#assignment-operator" },
        { include: "#invalid-word" }
      ]
    },
    "assignment-operator": {
      match: /(?<![\/\<\=\>])(=)(?![\=\>])/dgv,
      name: "keyword.operator.assignment.fortran"
    },
    "associate-construct": {
      begin: /\b(associate)\b(?=\p{space}*\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.associate.fortran" }
      },
      contentName: "meta.block.associate.fortran",
      end: /\b(end\p{space}*associate)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.endassociate.fortran" }
      },
      patterns: [
        { include: "$base" }
      ]
    },
    "asynchronous-attribute": {
      captures: {
        "1": { name: "storage.modifier.asynchronous.fortran" }
      },
      match: {
        G: [/￿\p{space}*\b(asynchronous)\b/dgiv, /\p{space}*\b(asynchronous)\b/dgivy]
      }
    },
    "attribute-specification-statement": {
      begin: /(?=\b(?:allocatable|asynchronous|contiguous|external|intrinsic|optional|parameter|pointer|private|protected|public|save|target|value|volatile)\b|(bind|dimension|intent)\p{space}*\(|(codimension)\p{space}*\[)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.attribute-specification.fortran",
      patterns: [
        { include: "#access-attribute" },
        { include: "#allocatable-attribute" },
        { include: "#asynchronous-attribute" },
        { include: "#codimension-attribute" },
        { include: "#contiguous-attribute" },
        { include: "#dimension-attribute" },
        { include: "#external-attribute" },
        { include: "#intent-attribute" },
        { include: "#intrinsic-attribute" },
        { include: "#language-binding-attribute" },
        { include: "#optional-attribute" },
        { include: "#parameter-attribute" },
        { include: "#pointer-attribute" },
        { include: "#protected-attribute" },
        { include: "#save-attribute" },
        { include: "#target-attribute" },
        { include: "#value-attribute" },
        { include: "#volatile-attribute" },
        {
          begin: /(?=\p{space}*::)/dgv,
          contentName: "meta.attribute-list.normal.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            { include: "#invalid-word" }
          ]
        },
        { include: "#name-list" }
      ]
    },
    "block-construct": {
      begin: /\b(block)\b(?!\p{space}*\bdata\b)/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.associate.fortran" }
      },
      contentName: "meta.block.block.fortran",
      end: /\b(end\p{space}*block)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.endassociate.fortran" }
      },
      patterns: [
        { include: "$base" }
      ]
    },
    "block-data-definition": {
      begin: /\b(block\p{space}*data)\b(?:\p{space}+([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b)?/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.block-data.fortran" },
        "2": { name: "entity.name.block-data.fortran" }
      },
      end: /\b(?:(end\p{space}*block\p{space}*data)(?:\p{space}+(2))?|(end))\b(?:\p{space}*(\P{space}((?!\n)[^\n])*))?/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.end-block-data.fortran" },
        "2": { name: "entity.name.block-data.fortran" },
        "3": { name: "keyword.control.end-block-data.fortran" },
        "4": { name: "invalid.error.block-data-definition.fortran" }
      },
      name: "meta.block-data.fortran",
      patterns: [
        { include: "$base" }
      ]
    },
    brackets: {
      begin: /\p{space}*(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.bracket.left.fortran" }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": { name: "punctuation.bracket.left.fortran" }
      },
      patterns: [
        { include: "#comments" },
        { include: "#constants" },
        { include: "#operators" },
        { include: "#array-constructor" },
        { include: "#parentheses" },
        { include: "#intrinsic-functions" },
        { include: "#variable" }
      ]
    },
    "call-statement": {
      patterns: [
        {
          applyEndPatternLast: 1,
          begin: /\p{space}*\b(call)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.call.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          name: "meta.statement.control.call.fortran",
          patterns: [
            {
              begin: /(?=\p{space}*[a-z][\p{L}\p{M}\p{N}\p{Pc}]*\p{space}*%)/dgiv,
              end: /(?=[\n\!\;])/dgv,
              patterns: [
                { include: "#comments" },
                { include: "#line-continuation-operator" },
                {
                  captures: {
                    "1": { name: "variable.other.fortran" },
                    "2": { name: "keyword.accessor.fortran" }
                  },
                  match: /\p{space}*([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(%)/dgiv
                },
                {
                  captures: {
                    "1": { name: "entity.name.function.subroutine.fortran" }
                  },
                  match: /\p{space}*([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgiv
                },
                { include: "#parentheses-dummy-variables" }
              ]
            },
            { include: "#intrinsic-subroutines" },
            {
              begin: {
                G: [/￿\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?=\()/dgiv, /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?=\()/dgivy]
              },
              beginCaptures: {
                "1": { name: "entity.name.function.subroutine.fortran" },
                "2": { name: "punctuation.parentheses.left.fortran" }
              },
              end: {
                G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
              },
              endCaptures: {
                "1": { name: "punctuation.parentheses.right.fortran" }
              },
              patterns: [
                { include: "#parentheses-dummy-variables" }
              ]
            },
            {
              captures: {
                "1": { name: "entity.name.function.subroutine.fortran" }
              },
              match: {
                G: [/￿\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b(?=\p{space}*[\n\!\;])/dgiv, /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b(?=\p{space}*[\n\!\;])/dgivy]
              }
            },
            { include: "$base" }
          ]
        }
      ]
    },
    "character-type": {
      patterns: [
        {
          begin: /\b(character)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.character.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          contentName: "meta.type-spec.fortran",
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.character.fortran" },
            "2": { name: "keyword.operator.multiplication.fortran" },
            "3": { name: "constant.numeric.fortran" }
          },
          match: /\b(character)\b(?:\p{space}*(\*)\p{space}*(\p{Nd}*))?/dgiv
        }
      ]
    },
    "codimension-attribute": {
      begin: {
        G: [/￿\p{space}*\b(codimension)(?=\p{space}*\[)/dgiv, /\p{space}*\b(codimension)(?=\p{space}*\[)/dgivy]
      },
      beginCaptures: {
        "1": { name: "storage.modifier.codimension.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        { include: "#brackets" }
      ]
    },
    comments: {
      begin: /!/dgv,
      end: /(?=\n)/dgv,
      name: "comment.line.fortran"
    },
    "common-statement": {
      begin: /\b(common)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.common.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      patterns: [
        { include: "$base" }
      ]
    },
    "concurrent-attribute": {
      begin: {
        G: [/￿\p{space}*\b(concurrent)\b/dgiv, /\p{space}*\b(concurrent)\b/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.while.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      patterns: [
        { include: "#parentheses" },
        { include: "#invalid-word" }
      ]
    },
    constants: {
      patterns: [
        { include: "#logical-constant" },
        { include: "#numeric-constant" },
        { include: "#string-constant" }
      ]
    },
    "contiguous-attribute": {
      captures: {
        "1": { name: "storage.modifier.contigous.fortran" }
      },
      match: {
        G: [/￿\p{space}*\b(contiguous)\b/dgiv, /\p{space}*\b(contiguous)\b/dgivy]
      }
    },
    "continue-statement": {
      patterns: [
        {
          begin: /\p{space}*\b(continue)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.continue.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          name: "meta.statement.control.continue.fortran",
          patterns: [
            { include: "#invalid-character" }
          ]
        }
      ]
    },
    "control-constructs": {
      patterns: [
        { include: "#named-control-constructs" },
        { include: "#unnamed-control-constructs" }
      ]
    },
    "control-statements": {
      patterns: [
        { include: "#assign-statement" },
        { include: "#call-statement" },
        { include: "#continue-statement" },
        { include: "#cycle-statement" },
        { include: "#entry-statement" },
        { include: "#error-stop-statement" },
        { include: "#exit-statement" },
        { include: "#goto-statement" },
        { include: "#pause-statement" },
        { include: "#return-statement" },
        { include: "#stop-statement" },
        { include: "#where-statement" },
        { include: "#image-control-statement" }
      ]
    },
    "cpp-numeric-constant": {
      captures: {
        "0": {
          patterns: [
            {
              begin: /(?=[^\n])/dgv,
              beginCaptures: {},
              end: /(?=\n?$)/dgv,
              endCaptures: {},
              patterns: [
                {
                  captures: {
                    "1": { name: "keyword.other.unit.hexadecimal.cpp" },
                    "2": {
                      name: "constant.numeric.hexadecimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "3": { name: "punctuation.separator.constant.numeric.cpp" },
                    "4": { name: "constant.numeric.hexadecimal.cpp" },
                    "5": {
                      name: "constant.numeric.hexadecimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "6": { name: "punctuation.separator.constant.numeric.cpp" },
                    "7": { name: "keyword.other.unit.exponent.hexadecimal.cpp" },
                    "8": { name: "keyword.operator.plus.exponent.hexadecimal.cpp" },
                    "9": { name: "keyword.operator.minus.exponent.hexadecimal.cpp" },
                    "10": {
                      name: "constant.numeric.exponent.hexadecimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "11": { name: "keyword.other.unit.suffix.floating-point.cpp" },
                    "12": { name: "keyword.other.unit.user-defined.cpp" }
                  },
                  match: {
                    G: [/￿(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=\p{AHex})\.|\.(?=\p{AHex}))(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=\p{AHex})\.|\.(?=\p{AHex}))(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                  }
                },
                {
                  captures: {
                    "1": {
                      name: "constant.numeric.decimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "2": { name: "punctuation.separator.constant.numeric.cpp" },
                    "3": { name: "constant.numeric.decimal.point.cpp" },
                    "4": {
                      name: "constant.numeric.decimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "5": { name: "punctuation.separator.constant.numeric.cpp" },
                    "6": { name: "keyword.other.unit.exponent.decimal.cpp" },
                    "7": { name: "keyword.operator.plus.exponent.decimal.cpp" },
                    "8": { name: "keyword.operator.minus.exponent.decimal.cpp" },
                    "9": {
                      name: "constant.numeric.exponent.decimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "10": { name: "keyword.other.unit.suffix.floating-point.cpp" },
                    "11": { name: "keyword.other.unit.user-defined.cpp" }
                  },
                  match: {
                    G: [/￿(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=[0-9])\.|\.(?=[0-9]))([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=[0-9])\.|\.(?=[0-9]))([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                  }
                },
                {
                  captures: {
                    "1": { name: "keyword.other.unit.binary.cpp" },
                    "2": {
                      name: "constant.numeric.binary.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "3": { name: "punctuation.separator.constant.numeric.cpp" },
                    "4": { name: "keyword.other.unit.suffix.integer.cpp" },
                    "5": { name: "keyword.other.unit.user-defined.cpp" }
                  },
                  match: {
                    G: [/￿(0[Bb])([01](?:[01]|((?<=\p{AHex})'(?=\p{AHex})))*)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Bb])([01](?:[01]|((?<=\p{AHex})'(?=\p{AHex})))*)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                  }
                },
                {
                  captures: {
                    "1": { name: "keyword.other.unit.octal.cpp" },
                    "2": {
                      name: "constant.numeric.octal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "3": { name: "punctuation.separator.constant.numeric.cpp" },
                    "4": { name: "keyword.other.unit.suffix.integer.cpp" },
                    "5": { name: "keyword.other.unit.user-defined.cpp" }
                  },
                  match: {
                    G: [/￿(0)((?:[0-7]|((?<=\p{AHex})'(?=\p{AHex})))+)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0)((?:[0-7]|((?<=\p{AHex})'(?=\p{AHex})))+)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                  }
                },
                {
                  captures: {
                    "1": { name: "keyword.other.unit.hexadecimal.cpp" },
                    "2": {
                      name: "constant.numeric.hexadecimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "3": { name: "punctuation.separator.constant.numeric.cpp" },
                    "4": { name: "keyword.other.unit.exponent.hexadecimal.cpp" },
                    "5": { name: "keyword.operator.plus.exponent.hexadecimal.cpp" },
                    "6": { name: "keyword.operator.minus.exponent.hexadecimal.cpp" },
                    "7": {
                      name: "constant.numeric.exponent.hexadecimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "8": { name: "keyword.other.unit.suffix.integer.cpp" },
                    "9": { name: "keyword.other.unit.user-defined.cpp" }
                  },
                  match: {
                    G: [/￿(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                  }
                },
                {
                  captures: {
                    "1": {
                      name: "constant.numeric.decimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "2": { name: "punctuation.separator.constant.numeric.cpp" },
                    "3": { name: "keyword.other.unit.exponent.decimal.cpp" },
                    "4": { name: "keyword.operator.plus.exponent.decimal.cpp" },
                    "5": { name: "keyword.operator.minus.exponent.decimal.cpp" },
                    "6": {
                      name: "constant.numeric.exponent.decimal.cpp",
                      patterns: [
                        {
                          match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                          name: "punctuation.separator.constant.numeric.cpp"
                        }
                      ]
                    },
                    "7": { name: "keyword.other.unit.suffix.integer.cpp" },
                    "8": { name: "keyword.other.unit.user-defined.cpp" }
                  },
                  match: {
                    G: [/￿(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                  }
                },
                {
                  match: /(?:['\.0-9A-Z_a-z]|(?<=[EPep])[\-\+])+/dgv,
                  name: "invalid.illegal.constant.numeric.cpp"
                }
              ]
            }
          ]
        }
      },
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])\.?\p{Nd}(?:['\.0-9A-Z_a-z]|(?<=[EPep])[\-\+])*/dgv
    },
    "critical-construct": {
      begin: /\b(critical)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.associate.fortran" }
      },
      contentName: "meta.block.critical.fortran",
      end: /\b(end\p{space}*critical)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.endassociate.fortran" }
      },
      patterns: [
        { include: "$base" }
      ]
    },
    "cycle-statement": {
      patterns: [
        {
          begin: /\p{space}*\b(cycle)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.cycle.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          name: "meta.statement.control.fortran",
          patterns: []
        }
      ]
    },
    "data-statement": {
      begin: /\b(data)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.data.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      patterns: [
        { include: "$base" }
      ]
    },
    "deallocate-statement": {
      begin: /\b(deallocate)\p{space}*(?=\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.deallocate.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      name: "meta.statement.deallocate.fortran",
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "deferred-attribute": {
      captures: {
        "1": { name: "storage.modifier.deferred.fortran" }
      },
      match: /\p{space}*\b(deferred)\b/dgiv
    },
    "derived-type": {
      begin: /\b(?:(class)|(type))\p{space}*(\()\p{space}*(([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)|\*)/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.class.fortran" },
        "2": { name: "storage.type.type.fortran" },
        "3": { name: "punctuation.parentheses.left.fortran" },
        "4": { name: "entity.name.type.fortran" }
      },
      contentName: "meta.type-spec.fortran",
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      name: "meta.specification.type.derived.fortran",
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "derived-type-component-attribute-specification": {
      begin: /(?=\p{space}*\b(?:private|sequence)\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.attribute-specification.fortran",
      patterns: [
        { include: "#access-attribute" },
        { include: "#sequence-attribute" },
        { include: "#invalid-character" }
      ]
    },
    "derived-type-component-parameter-specification": {
      captures: {
        "1": { name: "storage.type.integer.fortran" },
        "2": { name: "punctuation.comma.fortran" },
        "3": { name: "keyword.other.attribute.derived-type.parameter.fortran" },
        "4": { name: "keyword.operator.double-colon.fortran" },
        "5": { name: "entity.name.derived-type.parameter.fortran" }
      },
      match: /\b(integer)\p{space}*(,)\p{space}*(kind|len)\p{space}*(?:(::)\p{space}*([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?)?\p{space}*(?=[\n\!\;])/dgiv
    },
    "derived-type-component-procedure-specification": {
      begin: /(?=\bprocedure\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.specification.procedure.fortran",
      patterns: [
        { include: "#procedure-type" },
        {
          begin: /(?=\p{space}*(,|::|\())/dgv,
          contentName: "meta.attribute-list.derived-type-component-procedure.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            {
              begin: /(,)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\,\;])/dgv,
              patterns: [
                { include: "#access-attribute" },
                { include: "#pass-attribute" },
                { include: "#nopass-attribute" },
                { include: "#invalid-word" },
                { include: "#pointer-attribute" }
              ]
            }
          ]
        },
        { include: "#procedure-name-list" }
      ]
    },
    "derived-type-component-type-specification": {
      begin: /(?=\b(?:character|class|complex|double\p{space}*precision|double\p{space}*complex|integer|logical|real|type)\b(?![^\n\!"'\:\;]*\bfunction\b))/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.specification.derived-type.fortran",
      patterns: [
        { include: "#types" },
        { include: "#line-continuation-operator" },
        {
          begin: /(?=\p{space}*(,|::))/dgv,
          contentName: "meta.attribute-list.derived-type-component-type.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            {
              begin: /(,)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\,\;])/dgv,
              patterns: [
                { include: "#access-attribute" },
                { include: "#allocatable-attribute" },
                { include: "#codimension-attribute" },
                { include: "#contiguous-attribute" },
                { include: "#dimension-attribute" },
                { include: "#pointer-attribute" },
                { include: "#invalid-word" }
              ]
            }
          ]
        },
        { include: "#name-list" }
      ]
    },
    "derived-type-contains-attribute-specification": {
      begin: /(?=\bprivate\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.attribute-specification.fortran",
      patterns: [
        { include: "#access-attribute" },
        { include: "#invalid-character" }
      ]
    },
    "derived-type-contains-final-procedure-specification": {
      begin: /\b(final)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.final-procedure.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.specification.procedure.final.fortran",
      patterns: [
        {
          begin: /(?=\p{space}*(::))/dgv,
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          name: "meta.attribute-list.derived-type-contains-final-procedure.fortran",
          patterns: [
            { include: "#invalid-word" }
          ]
        },
        { include: "#procedure-name" }
      ]
    },
    "derived-type-contains-generic-procedure-specification": {
      begin: /\b(generic)\b/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.procedure.generic.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.specification.procedure.generic.fortran",
      patterns: [
        {
          begin: /(?=\p{space}*(,|::|\())/dgv,
          contentName: "meta.attribute-list.derived-type-contains-generic-procedure.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            {
              begin: /(,)|^|(?<=&)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\&\,\;])/dgv,
              patterns: [
                { include: "#access-attribute" },
                { include: "#invalid-word" }
              ]
            }
          ]
        },
        {
          begin: /(?=\p{space}*[a-z])/dgv,
          contentName: "meta.name-list.fortran",
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            { include: "#IO-keywords" },
            { include: "#assignment-keyword" },
            { include: "#operator-keyword" },
            { include: "#procedure-name" },
            { include: "#pointer-operators" }
          ]
        }
      ]
    },
    "derived-type-contains-procedure-specification": {
      begin: /(?=\bprocedure\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.specification.procedure.fortran",
      patterns: [
        { include: "#procedure-type" },
        {
          begin: /(?=\p{space}*(,|::|\())/dgv,
          contentName: "meta.attribute-list.derived-type-contains-procedure.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            {
              begin: /(,)|^|(?<=&)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\&\,\;])/dgv,
              name: "meta.something.fortran",
              patterns: [
                { include: "#access-attribute" },
                { include: "#deferred-attribute" },
                { include: "#non-overridable-attribute" },
                { include: "#nopass-attribute" },
                { include: "#pass-attribute" },
                { include: "#invalid-word" }
              ]
            }
          ]
        },
        { include: "#procedure-name-list" }
      ]
    },
    "derived-type-definition": {
      begin: /\b(type)\b(?!\p{space}*(\(|is\b|=))/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.type.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.derived-type.definition.fortran",
      patterns: [
        {
          begin: {
            G: [/￿(?=\p{space}*(,|::))/dgv, /(?=\p{space}*(,|::))/dgvy]
          },
          contentName: "meta.attribute-list.derived-type.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            {
              begin: /(,)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\,\;])/dgv,
              patterns: [
                { include: "#access-attribute" },
                { include: "#abstract-attribute" },
                { include: "#language-binding-attribute" },
                { include: "#extends-attribute" },
                { include: "#invalid-word" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv,
          beginCaptures: {
            "1": { name: "entity.name.type.fortran" }
          },
          end: /(?:^|(?<=;))\p{space}*(end\p{space}*type)(?:\p{space}+(?:(1)|([\p{L}\p{M}\p{N}\p{Pc}]+)))?\b/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.endtype.fortran" },
            "2": { name: "entity.name.type.fortran" },
            "3": { name: "invalid.error.derived-type.fortran" }
          },
          patterns: [
            { include: "#dummy-variable-list" },
            { include: "#comments" },
            {
              begin: /^(?!\p{space}*\b(?:contains|end\p{space}*type)\b)/dgiv,
              end: /^(?=\p{space}*\b(?:contains|end\p{space}*type)\b)/dgiv,
              name: "meta.block.specification.derived-type.fortran",
              patterns: [
                { include: "#comments" },
                { include: "#derived-type-component-attribute-specification" },
                { include: "#derived-type-component-parameter-specification" },
                { include: "#derived-type-component-procedure-specification" },
                { include: "#derived-type-component-type-specification" }
              ]
            },
            {
              begin: /\b(contains)\b/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.contains.fortran" }
              },
              end: /(?=\p{space}*end\p{space}*type\b)/dgiv,
              name: "meta.block.contains.fortran",
              patterns: [
                { include: "#comments" },
                { include: "#derived-type-contains-attribute-specification" },
                { include: "#derived-type-contains-final-procedure-specification" },
                { include: "#derived-type-contains-generic-procedure-specification" },
                { include: "#derived-type-contains-procedure-specification" }
              ]
            }
          ]
        }
      ]
    },
    "derived-type-operators": {
      captures: {
        "1": { name: "keyword.other.selector.fortran" }
      },
      match: /\p{space}*(%)/dgv
    },
    "dimension-attribute": {
      begin: /\p{space}*\b(dimension)(?=\p{space}*\()/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.dimension.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "do-construct": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.enddo.fortran" }
          },
          match: /\b(end\p{space}*do)\b/dgiv
        },
        {
          begin: /\b(do)\p{space}+(\p{Nd}{1,5})/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.do.fortran" },
            "2": { name: "constant.numeric.fortran" }
          },
          end: /(?:^|(?<=;))(?=\p{space}*\b2\b)/dgv,
          name: "meta.do.labeled.fortran",
          patterns: [
            {
              begin: {
                G: [/￿(?:\p{space}*(,)|(?!\p{space}*[\n\!\;]))/dgv, /(?:\p{space}*(,)|(?!\p{space}*[\n\!\;]))/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=[\n\!\;])/dgv,
              patterns: [
                { include: "#concurrent-attribute" },
                { include: "#while-attribute" },
                { include: "$base" }
              ]
            },
            { include: "$base" }
          ]
        },
        {
          begin: /\b(do)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.do.fortran" }
          },
          end: /\b(?:(continue)|(end\p{space}*do))\b/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.continue.fortran" },
            "2": { name: "keyword.control.enddo.fortran" }
          },
          name: "meta.block.do.unlabeled.fortran",
          patterns: [
            {
              begin: {
                G: [/￿(?:\p{space}*(,)|(?!\p{space}*[\n\!\;]))/dgv, /(?:\p{space}*(,)|(?!\p{space}*[\n\!\;]))/dgvy]
              },
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=[\n\!\;])/dgv,
              name: "meta.loop-control.fortran",
              patterns: [
                { include: "#concurrent-attribute" },
                { include: "#while-attribute" },
                { include: "$base" }
              ]
            },
            {
              begin: /(?!\p{space}*\b(continue|end\p{space}*do)\b)/dgiv,
              end: /(?=\p{space}*\b(continue|end\p{space}*do)\b)/dgiv,
              patterns: [
                { include: "$base" }
              ]
            }
          ]
        }
      ]
    },
    "dummy-variable": {
      captures: {
        "1": { name: "variable.parameter.fortran" }
      },
      match: /(?:^|(?<=[\&\(\,]))\p{space}*([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgiv
    },
    "dummy-variable-list": {
      begin: {
        G: [/￿\p{space}*(\()/dgv, /\p{space}*(\()/dgvy]
      },
      beginCaptures: {
        "1": { name: "punctuation.definition.parameters.begin.fortran" }
      },
      end: /\)|(?=\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.fortran" }
      },
      name: "meta.dummy-variable-list",
      patterns: [
        { include: "#dummy-variable" }
      ]
    },
    "elemental-attribute": {
      captures: {
        "1": { name: "storage.modifier.elemental.fortran" }
      },
      match: /\p{space}*\b(elemental)\b/dgiv
    },
    "entry-statement": {
      patterns: [
        {
          begin: /\p{space}*\b(entry)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.entry.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          name: "meta.statement.control.entry.fortran",
          patterns: [
            {
              begin: /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv,
              beginCaptures: {
                "1": { name: "entity.name.function.entry.fortran" }
              },
              end: /(?=[\n\!\;])/dgv,
              patterns: [
                { include: "#dummy-variable-list" },
                { include: "#result-statement" },
                { include: "#language-binding-attribute" }
              ]
            }
          ]
        }
      ]
    },
    "enum-block-construct": {
      begin: /\b(enum)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.enum.fortran" }
      },
      end: /\b(end\p{space}*enum)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.end-enum.fortran" }
      },
      name: "meta.enum.fortran",
      patterns: [
        {
          begin: {
            G: [/￿\p{space}*(,)/dgv, /\p{space}*(,)/dgvy]
          },
          beginCaptures: {
            "1": { name: "punctuation.comma.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            { include: "#language-binding-attribute" },
            { include: "#invalid-word" }
          ]
        },
        {
          begin: /(?!\p{space}*\b(end\p{space}*enum)\b)/dgiv,
          end: /(?=\b(end\p{space}*enum)\b)/dgiv,
          name: "meta.block.specification.enum.fortran",
          patterns: [
            { include: "#comments" },
            {
              begin: /\b(enumerator)\b/dgiv,
              beginCaptures: {
                "1": { name: "keyword.other.enumerator.fortran" }
              },
              end: /(?=[\n\!\;])/dgv,
              name: "meta.statement.enumerator-specification.fortran",
              patterns: [
                {
                  begin: /(?=\p{space}*(,|::))/dgv,
                  contentName: "meta.attribute-list.enum.fortran",
                  end: /(::)|(?=[\n\!\;])/dgv,
                  endCaptures: {
                    "1": { name: "keyword.operator.double-colon.fortran" }
                  },
                  patterns: [
                    { include: "#invalid-word" }
                  ]
                },
                { include: "#comments" },
                { include: "#name-list" }
              ]
            }
          ]
        }
      ]
    },
    "equivalence-statement": {
      begin: /\b(equivalence)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.common.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      patterns: [
        {
          begin: {
            G: [/￿|(,)/dgv, /|(,)/dgv]
          },
          beginCaptures: {
            "1": { name: "puntuation.comma.fortran" }
          },
          end: /(?=[\n\!\,\;])/dgv,
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        }
      ]
    },
    "error-stop-statement": {
      begin: /\p{space}*\b(error\p{space}+stop)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.errorstop.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.control.errorstop.fortran",
      patterns: [
        { include: "#constants" },
        { include: "#string-operators" },
        { include: "#variable" },
        { include: "#invalid-character" }
      ]
    },
    "event-statement": {
      begin: /\b(event (?:post|wait))\p{space}*(?=\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.event.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      name: "meta.statement.event.fortran",
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "execution-statements": {
      patterns: [
        { include: "#allocate-statement" },
        { include: "#deallocate-statement" },
        { include: "#IO-statements" },
        { include: "#nullify-statement" }
      ]
    },
    "exit-statement": {
      begin: /\p{space}*\b(exit)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.exit.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.control.exit.fortran",
      patterns: []
    },
    "explicit-interface-block-construct": {
      begin: /\b(interface)\b(?=\p{space}*[\n\!\;])/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.interface.fortran" }
      },
      end: /\b(end\p{space}*interface)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.endinterface.fortran.modern" }
      },
      name: "meta.interface.explicit.fortran",
      patterns: [
        { include: "$base" }
      ]
    },
    "extends-attribute": {
      begin: /\p{space}*\b(extends)\p{space}*\(/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.extends.fortran" }
      },
      end: /\)|(?=\n)/dgv,
      patterns: [
        {
          match: /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv,
          name: "entity.name.type.fortran"
        }
      ]
    },
    "external-attribute": {
      captures: {
        "1": { name: "storage.modifier.external.fortran" }
      },
      match: /\p{space}*\b(external)\b/dgiv
    },
    "fail-image-statement": {
      captures: {
        "1": { name: "keyword.control.fail-image.fortran" }
      },
      match: /\b(fail image)\b/dgv,
      name: "meta.statement.fail-image.fortran"
    },
    "forall-construct": {
      applyEndPatternLast: 1,
      begin: /\b(forall)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.forall.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: {
            G: [/￿(?!\p{space}*[\n\!\;])/dgv, /(?!\p{space}*[\n\!\;])/dgvy]
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          name: "meta.loop-control.fortran",
          patterns: [
            { include: "#parentheses" },
            { include: "#invalid-word" }
          ]
        },
        {
          begin: /(?<=\))(?=\p{space}*[\n\!\;])/dgv,
          end: /\b(end\p{space}*forall)\b/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.endforall.fortran" }
          },
          name: "meta.block.forall.fortran",
          patterns: [
            { include: "$base" }
          ]
        },
        {
          begin: /(?<=\))(?!\p{space}*[\n\!\;])/dgv,
          end: /\n/dgv,
          name: "meta.statement.control.forall.fortran",
          patterns: [
            { include: "$base" }
          ]
        }
      ]
    },
    "form-team-statement": {
      begin: /\b(form team)\p{space}*(?=\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.form-team.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      name: "meta.statement.form-team.fortran",
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "format-descriptor": {
      begin: /\(\//dgv,
      beginCaptures: {
        "0": { name: "punctuation.bracket.left.fortran" }
      },
      contentName: "meta.format-descriptor.fortran",
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.bracket.right.fortran" }
      },
      patterns: [
        { include: "#comments" },
        { include: "#constants" },
        { include: "#operators" },
        { include: "#parentheses" },
        { include: "#intrinsic-functions" },
        { include: "#variable" }
      ]
    },
    "format-descriptors": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.format-descriptor.fortran" }
          },
          match: /(?:\b|(?<=\p{Nd})|(?<=P))(EN|ES|EX|DT|DC|DP|RC|RD|RN|RP|RU|RZ|BN|BZ|SP|SS|TL|TR|[ABD-GILOPQSTXZ])(?=(?=\n?$)|[^A-Z_a-z]|[D-G])/dgiv
        },
        {
          match: /\//dgv,
          name: "keyword.operator.format.newline.fortran"
        },
        {
          match: /:/dgv,
          name: "keyword.operator.format.separator.fortran"
        },
        {
          match: /[\$\\]/dgv,
          name: "keyword.other.format-descriptor.nonstandard.fortran"
        },
        {
          match: /(?:\b|(?<=\p{Nd}))\p{Nd}+H/dgiv,
          name: "keyword.other.format-descriptor.legacy.fortran"
        }
      ]
    },
    "format-parentheses": {
      begin: /\p{space}*(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.parentheses.left.fortran" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      patterns: [
        { include: "#comments" },
        { include: "#line-continuation-operator" },
        {
          match: /(?:\b|[\-\+])\p{Nd}+(?=[A-Za-z])/dgv,
          name: "constant.numeric.fortran"
        },
        { include: "#format-descriptors" },
        { include: "#format-parentheses" },
        { include: "#parentheses-common" }
      ]
    },
    "function-definition": {
      begin: /(?=([^\n\!"'\:\;](?!\bend)(?!\bsubroutine\b))*\bfunction\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.function.fortran",
      patterns: [
        {
          begin: {
            G: [/(?=￿\p{space}*(?!\bfunction\b))/dgiv, new EmulatedRegExp("(?=^\\p{space}*(?!\\bfunction\\b))", "dgiv", { strategy: "clip_search" })]
          },
          end: /(?=\bfunction\b)/dgiv,
          name: "meta.attribute-list.function.fortran",
          patterns: [
            { include: "#elemental-attribute" },
            { include: "#module-attribute" },
            { include: "#pure-attribute" },
            { include: "#recursive-attribute" },
            { include: "#types" },
            { include: "#invalid-word" }
          ]
        },
        {
          begin: /\b(function)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.other.function.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              begin: {
                G: [/￿\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv, /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgivy]
              },
              beginCaptures: {
                "1": { name: "entity.name.function.fortran" }
              },
              end: /\p{space}*\b(?:(end\p{space}*function)(?:\p{space}+([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?|(end))\b\p{space}*([^\n\!\;]+)?(?=[\n\!\;])/dgiv,
              endCaptures: {
                "1": { name: "keyword.other.endfunction.fortran" },
                "2": { name: "entity.name.function.fortran" },
                "3": { name: "keyword.other.endfunction.fortran" },
                "4": { name: "invalid.error.function.fortran" }
              },
              patterns: [
                {
                  begin: {
                    G: [/￿(?!\p{space}*[\n\!\;])/dgv, /(?!\p{space}*[\n\!\;])/dgvy]
                  },
                  end: /(?=[\n\!\;])/dgv,
                  name: "meta.function.first-line.fortran",
                  patterns: [
                    { include: "#dummy-variable-list" },
                    { include: "#result-statement" },
                    { include: "#language-binding-attribute" }
                  ]
                },
                {
                  begin: /(?!\bend(?:\p{space}*[\n\!\;]|\p{space}*function\b))/dgiv,
                  end: /(?=\bend(?:\p{space}*[\n\!\;]|\p{space}*function\b))/dgiv,
                  name: "meta.block.specification.function.fortran",
                  patterns: [
                    {
                      begin: /\b(contains)\b/dgiv,
                      beginCaptures: {
                        "1": { name: "keyword.control.contains.fortran" }
                      },
                      end: /(?=end(?:\p{space}*[\n\!\;]|\p{space}*function\b))/dgiv,
                      name: "meta.block.contains.fortran",
                      patterns: [
                        { include: "$base" }
                      ]
                    },
                    { include: "$base" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "generic-interface-block-construct": {
      begin: /\b(interface)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.interface.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.interface.generic.fortran",
      patterns: [
        {
          begin: {
            G: [/￿\p{space}*\b(assignment)\p{space}*(\()\p{space}*(?:(=)|(\P{space}[^\n]*))\p{space}*(\))/dgiv, /\p{space}*\b(assignment)\p{space}*(\()\p{space}*(?:(=)|(\P{space}[^\n]*))\p{space}*(\))/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.other.assignment.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" },
            "3": { name: "keyword.operator.assignment.fortran" },
            "4": { name: "invalid.error.generic-interface.fortran" },
            "5": { name: "punctuation.parentheses.right.fortran" }
          },
          end: /\b(end\p{space}*interface)\b(?:\p{space}*\b(1)\b\p{space}*(\()\p{space}*(?:(3)|(\P{space}[^\n]*))\p{space}*(\)))?/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.endinterface.fortran" },
            "2": { name: "keyword.other.assignment.fortran" },
            "3": { name: "punctuation.parentheses.left.fortran" },
            "4": { name: "keyword.operator.assignment.fortran" },
            "5": { name: "invalid.error.generic-interface-end.fortran" },
            "6": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#interface-procedure-statement" },
            { include: "$base" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(operator)\p{space}*(\()\p{space}*(?:(\.[a-z]+\.|==|\/=|>=|[\<\>]|<=|[\-\+\/]|\/\/|\*\*?)|(\P{space}[^\n]*))\p{space}*(\))/dgiv, /\p{space}*\b(operator)\p{space}*(\()\p{space}*(?:(\.[a-z]+\.|==|\/=|>=|[\<\>]|<=|[\-\+\/]|\/\/|\*\*?)|(\P{space}[^\n]*))\p{space}*(\))/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.other.operator.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" },
            "3": { name: "keyword.operator.fortran" },
            "4": { name: "invalid.error.generic-interface-block-op.fortran" },
            "5": { name: "punctuation.parentheses.right.fortran" }
          },
          end: /\b(end\p{space}*interface)\b(?:\p{space}*\b(1)\b\p{space}*(\()\p{space}*(?:(3)|(\P{space}[^\n]*))\p{space}*(\)))?/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.endinterface.fortran" },
            "2": { name: "keyword.other.operator.fortran" },
            "3": { name: "punctuation.parentheses.left.fortran" },
            "4": { name: "keyword.operator.fortran" },
            "5": { name: "invalid.error.generic-interface-block-op-end.fortran" },
            "6": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#interface-procedure-statement" },
            { include: "$base" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(?:(read)|(write))\p{space}*(\()\p{space}*(?:(formatted)|(unformatted)|(\P{space}[^\n]*))\p{space}*(\))/dgiv, /\p{space}*\b(?:(read)|(write))\p{space}*(\()\p{space}*(?:(formatted)|(unformatted)|(\P{space}[^\n]*))\p{space}*(\))/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.other.read.fortran" },
            "2": { name: "keyword.other.write.fortran" },
            "3": { name: "punctuation.parentheses.left.fortran" },
            "4": { name: "keyword.other.formatted.fortran" },
            "5": { name: "keyword.other.unformatted.fortran" },
            "6": { name: "invalid.error.generic-interface-block.fortran" },
            "7": { name: "punctuation.parentheses.right.fortran" }
          },
          end: /\b(end\p{space}*interface)\b(?:\p{space}*\b(?:(2)|(3))\b\p{space}*(\()\p{space}*(?:(4)|(5)|(\P{space}[^\n]*))\p{space}*(\)))?/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.endinterface.fortran" },
            "2": { name: "keyword.other.read.fortran" },
            "3": { name: "keyword.other.write.fortran" },
            "4": { name: "punctuation.parentheses.left.fortran" },
            "5": { name: "keyword.other.formatted.fortran" },
            "6": { name: "keyword.other.unformatted.fortran" },
            "7": { name: "invalid.error.generic-interface-block-end.fortran" },
            "8": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#interface-procedure-statement" },
            { include: "$base" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv, /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgivy]
          },
          beginCaptures: {
            "1": { name: "entity.name.function.fortran" }
          },
          end: /\b(end\p{space}*interface)\b(?:\p{space}*\b(1)\b)?/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.endinterface.fortran" },
            "2": { name: "entity.name.function.fortran" }
          },
          patterns: [
            { include: "#interface-procedure-statement" },
            { include: "$base" }
          ]
        }
      ]
    },
    "goto-statement": {
      begin: /\p{space}*\b(go\p{space}*to)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.goto.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.control.goto.fortran",
      patterns: [
        { include: "$base" }
      ]
    },
    "if-construct": {
      patterns: [
        {
          begin: /\b(if)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.if.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            { include: "#logical-control-expression" },
            {
              begin: /\p{space}*\b(then)\b/dgiv,
              beginCaptures: {
                "1": { name: "keyword.control.then.fortran" }
              },
              contentName: "meta.block.if.fortran",
              end: /\b(end\p{space}*if)\b/dgiv,
              endCaptures: {
                "1": { name: "keyword.control.endif.fortran" }
              },
              patterns: [
                {
                  begin: /\b(else\p{space}*if)\b/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.elseif.fortran" }
                  },
                  end: /(?=[\n\!\;])/dgv,
                  patterns: [
                    { include: "#parentheses" },
                    {
                      captures: {
                        "1": { name: "keyword.control.then.fortran" },
                        "2": { name: "meta.label.elseif.fortran" }
                      },
                      match: /\b(then)\b(\p{space}*[a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?/dgiv
                    },
                    { include: "#invalid-word" }
                  ]
                },
                {
                  begin: /\b(else)\b/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.else.fortran" }
                  },
                  end: /(?=\b(end\p{space}*if)\b)/dgiv,
                  patterns: [
                    {
                      begin: /(?!(\p{space}*([\n\!\;])))/dgv,
                      end: /\p{space}*(?=[\n\!\;])/dgv,
                      patterns: [
                        {
                          captures: {
                            "1": { name: "meta.label.else.fortran" },
                            "2": { name: "invalid.error.label.else.fortran" }
                          },
                          match: /\p{space}*([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?\p{space}*\b([\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv
                        },
                        { include: "#invalid-word" }
                      ]
                    },
                    {
                      begin: /(?!\b(end\p{space}*if)\b)/dgiv,
                      end: /(?=\b(end\p{space}*if)\b)/dgiv,
                      patterns: [
                        { include: "$base" }
                      ]
                    }
                  ]
                },
                { include: "$base" }
              ]
            },
            {
              begin: /(?=\p{space}*[a-z])/dgiv,
              end: /(?=[\n\!\;])/dgv,
              name: "meta.statement.control.if.fortran",
              patterns: [
                { include: "$base" }
              ]
            }
          ]
        }
      ]
    },
    "image-control-statement": {
      patterns: [
        { include: "#sync-all-statement" },
        { include: "#sync-statement" },
        { include: "#event-statement" },
        { include: "#form-team-statement" },
        { include: "#fail-image-statement" }
      ]
    },
    "implicit-statement": {
      begin: /\b(implicit)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.other.implicit.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.implicit.fortran",
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.none.fortran" }
          },
          match: /\p{space}*\b(none)\b/dgiv
        },
        { include: "$base" }
      ]
    },
    "import-statement": {
      begin: /\b(import)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.include.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.include.fortran",
      patterns: [
        {
          begin: {
            G: [/￿\p{space}*(?:(::)|(?=[a-z]))/dgiv, /\p{space}*(?:(::)|(?=[a-z]))/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            { include: "#name-list" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*(,)/dgv, /\p{space}*(,)/dgvy]
          },
          beginCaptures: {
            "1": { name: "punctuation.comma.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "keyword.other.all.fortran" }
              },
              match: {
                G: [/￿\p{space}*\b(all)\b/dgiv, /\p{space}*\b(all)\b/dgivy]
              }
            },
            {
              captures: {
                "1": { name: "keyword.other.none.fortran" }
              },
              match: {
                G: [/￿\p{space}*\b(none)\b/dgiv, /\p{space}*\b(none)\b/dgivy]
              }
            },
            {
              begin: {
                G: [/￿\p{space}*\b(only)\p{space}*(:)/dgiv, /\p{space}*\b(only)\p{space}*(:)/dgivy]
              },
              beginCaptures: {
                "1": { name: "keyword.other.only.fortran" },
                "2": { name: "keyword.other.colon.fortran" }
              },
              end: /(?=[\n\!\;])/dgv,
              patterns: [
                { include: "#name-list" }
              ]
            },
            { include: "#invalid-word" }
          ]
        }
      ]
    },
    "include-statement": {
      begin: /\b(include)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.include.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.include.fortran",
      patterns: [
        { include: "#string-constant" },
        { include: "#invalid-character" }
      ]
    },
    "intent-attribute": {
      begin: /\p{space}*\b(intent)\p{space}*(\()/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.intent.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: /(\))|(?=[\n\!\;])/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.left.fortran" }
      },
      patterns: [
        {
          captures: {
            "1": { name: "storage.modifier.intent.in-out.fortran" },
            "2": { name: "storage.modifier.intent.in.fortran" },
            "3": { name: "storage.modifier.intent.out.fortran" }
          },
          match: /\b(?:(in\p{space}*out)|(in)|(out))\b/dgiv
        },
        { include: "#invalid-word" }
      ]
    },
    "interface-block-constructs": {
      patterns: [
        { include: "#abstract-interface-block-construct" },
        { include: "#explicit-interface-block-construct" },
        { include: "#generic-interface-block-construct" }
      ]
    },
    "interface-procedure-statement": {
      begin: /(?=[^\n\!"'\;]*\bprocedure\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.procedure.fortran",
      patterns: [
        {
          begin: {
            G: [/(?=￿\p{space}*(?!\bprocedure\b))/dgiv, new EmulatedRegExp("(?=^\\p{space}*(?!\\bprocedure\\b))", "dgiv", { strategy: "clip_search" })]
          },
          end: /(?=\bprocedure\b)/dgiv,
          name: "meta.attribute-list.interface.fortran",
          patterns: [
            { include: "#module-attribute" },
            { include: "#invalid-word" }
          ]
        },
        {
          begin: /\p{space}*\b(procedure)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.other.procedure.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "keyword.operator.double-colon.fortran" }
              },
              match: {
                G: [/￿\p{space}*(::)/dgv, /\p{space}*(::)/dgvy]
              }
            },
            { include: "#procedure-name-list" }
          ]
        }
      ]
    },
    "intrinsic-attribute": {
      captures: {
        "1": { name: "storage.modifier.intrinsic.fortran" }
      },
      match: /\p{space}*\b(intrinsic)\b/dgiv
    },
    "intrinsic-functions": {
      patterns: [
        {
          begin: /\b(acosh|asinh|atanh|bge|bgt|ble|blt|dshiftl|dshiftr|findloc|hypot|iall|iany|image_index|iparity|is_contiguous|lcobound|leadz|mask[lr]|merge_bits|norm2|num_images|parity|popcnt|poppar|shift[alr]|storage_size|this_image|trailz|ucobound)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b(bessel_[jy][01n]|erf(c(_scaled)?)?|gamma|log_gamma)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b(command_argument_count|extends_type_of|is_iostat_end|is_iostat_eor|new_line|same_type_as|selected_char_kind)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b(ieee_(class|copy_sign|is_(finite|nan|negative|normal)|logb|next_after|rem|rint|scalb|selected_real_kind|support_(datatype|denormal|divide|inf|io|nan|rounding|sqrt|standard|underflow_control)|unordered|value))\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b(ieee_support_(flag|halting))\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b(c_(associated|funloc|loc|sizeof))\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b(compiler_(options|version))\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b(null)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b(achar|adjustl|adjustr|all|allocated|associated|any|bit_size|btest|ceiling|count|cshift|digits|dot_product|eoshift|epsilon|exponent|floor|fraction|huge|iachar|iand|ibclr|ibits|ibset|ieor|ior|ishftc?|kind|lbound|len_trim|logical|matmul|maxexponent|maxloc|maxval|merge|minexponent|minloc|minval|modulo|nearest|not|pack|precision|present|product|radix|range|repeat|reshape|rrspacing|scale|scan|selected_(int|real)_kind|set_exponent|shape|size|spacing|spread|sum|tiny|transfer|transpose|trim|ubound|unpack|verify)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: /\b([cdi]?abs|acos|[ad]int|[ad]nint|aimag|amax[01]|amin[01]|d?asin|d?atan|d?atan2|char|conjg|[cd]?cos|d?cosh|cmplx|dble|i?dim|dmax1|dmin1|dprod|[cd]?exp|float|ichar|idint|ifix|index|int|len|lge|lgt|lle|llt|[acd]?log|[ad]?log10|max[01]?|min[01]?|[ad]?mod|(id)?nint|real|[di]?sign|[cd]?sin|d?sinh|sngl|[cd]?sqrt|d?tan|d?tanh)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "support.function.intrinsic.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        }
      ]
    },
    "intrinsic-subroutines": {
      patterns: [
        {
          begin: {
            G: [/￿\p{space}*\b(date_and_time|mvbits|random_number|random_seed|system_clock)\p{space}*(?=\()/dgiv, /\p{space}*\b(date_and_time|mvbits|random_number|random_seed|system_clock)\p{space}*(?=\()/dgivy]
          },
          beginCaptures: {
            "1": { name: "entity.name.function.subroutine.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(cpu_time)\p{space}*(?=\()/dgiv, /\p{space}*\b(cpu_time)\p{space}*(?=\()/dgivy]
          },
          beginCaptures: {
            "1": { name: "entity.name.function.subroutine.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(ieee_([gs]et)_(rounding|underflow)_mode)\p{space}*(?=\()/dgiv, /\p{space}*\b(ieee_([gs]et)_(rounding|underflow)_mode)\p{space}*(?=\()/dgivy]
          },
          beginCaptures: {
            "1": { name: "entity.name.function.subroutine.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(ieee_([gs]et)_(flag|halting_mode|status))\p{space}*(?=\()/dgiv, /\p{space}*\b(ieee_([gs]et)_(flag|halting_mode|status))\p{space}*(?=\()/dgivy]
          },
          beginCaptures: {
            "1": { name: "entity.name.function.subroutine.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(c_f_(p(?:|rocp)ointer))\p{space}*(?=\()/dgiv, /\p{space}*\b(c_f_(p(?:|rocp)ointer))\p{space}*(?=\()/dgivy]
          },
          beginCaptures: {
            "1": { name: "entity.name.function.subroutine.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(execute_command_line|get_command|get_command_argument|get_environment_variable|move_alloc)\p{space}*(?=\()/dgiv, /\p{space}*\b(execute_command_line|get_command|get_command_argument|get_environment_variable|move_alloc)\p{space}*(?=\()/dgivy]
          },
          beginCaptures: {
            "1": { name: "entity.name.function.subroutine.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        }
      ]
    },
    "invalid-character": {
      match: /[^\n\!\;\p{space}]+/dgv,
      name: "invalid.error.character.fortran"
    },
    "invalid-word": {
      match: /\b[\p{L}\p{M}\p{N}\p{Pc}]+\b/dgv,
      name: "invalid.error.word.fortran"
    },
    "language-binding-attribute": {
      begin: /\p{space}*\b(bind)\p{space}*\(/dgiv,
      beginCaptures: {
        "1": { name: "storage.modifier.bind.fortran" }
      },
      end: /\)|(?=\n)/dgv,
      patterns: [
        {
          match: /\b(c)\b/dgiv,
          name: "variable.parameter.fortran"
        },
        { include: "#dummy-variable" },
        { include: "$base" }
      ]
    },
    "line-continuation-operator": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.line-continuation.fortran" }
          },
          match: /(?:^|(?<=;))\p{space}*(&)/dgv
        },
        {
          begin: /\p{space}*(&)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.line-continuation.fortran" }
          },
          contentName: "meta.line-continuation.fortran",
          end: /^(?:\p{space}*(&))?/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.line-continuation.fortran" }
          },
          patterns: [
            { include: "#comments" },
            {
              match: /\P{space}[^\!]*/dgv,
              name: "invalid.error.line-cont.fortran"
            }
          ]
        }
      ]
    },
    "logical-constant": {
      captures: {
        "1": { name: "constant.language.logical.false.fortran" },
        "2": { name: "constant.language.logical.true.fortran" }
      },
      match: /\p{space}*(?:(\.false\.)|(\.true\.))/dgiv
    },
    "logical-control-expression": {
      begin: {
        G: [/￿(?=\p{space}*\()/dgv, /(?=\p{space}*\()/dgvy]
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.expression.control.logical.fortran",
      patterns: [
        { include: "#parentheses" }
      ]
    },
    "logical-operators": {
      patterns: [
        {
          match: /(\p{space}*\.(and|eqv??|le|lt|ge|gt|ne|neqv|not|or)\.)/dgiv,
          name: "keyword.logical.fortran"
        },
        {
          match: /(==|\/=|>=|(?<!=)>|<=?)/dgv,
          name: "keyword.logical.fortran.modern"
        }
      ]
    },
    "logical-type": {
      patterns: [
        {
          begin: /\b(logical)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.logical.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          contentName: "meta.type-spec.fortran",
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.character.fortran" },
            "2": { name: "keyword.operator.multiplication.fortran" },
            "3": { name: "constant.numeric.fortran" }
          },
          match: /\b(logical)\b(?:\p{space}*(\*)\p{space}*(\p{Nd}*))?/dgiv
        }
      ]
    },
    "module-attribute": {
      captures: {
        "1": { name: "storage.modifier.module.fortran" }
      },
      match: /\p{space}*\b(module)\b(?=\p{space}*(?:[\n\!\;]|[^\n\!"'\;]*\b(?:function|procedure|subroutine)\b))/dgiv
    },
    "module-definition": {
      begin: /(?=\b(module)\b)(?![^\n\!"'\;]*\b(?:function|procedure|subroutine)\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.module.fortran",
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.program.fortran" }
          },
          match: {
            G: [/￿\p{space}*\b(module)\b/dgiv, /\p{space}*\b(module)\b/dgivy]
          }
        },
        {
          applyEndPatternLast: 1,
          begin: /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv,
          beginCaptures: {
            "1": { name: "entity.name.class.module.fortran" }
          },
          end: /\b(?:(end\p{space}*module)(?:\p{space}+([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?|(end))\b\p{space}*([^\n\!\;]+)?(?=[\n\!\;])/dgiv,
          endCaptures: {
            "1": { name: "keyword.other.endmodule.fortran" },
            "2": { name: "entity.name.class.module.fortran" },
            "3": { name: "keyword.other.endmodule.fortran" },
            "4": { name: "invalid.error.module-definition.fortran" }
          },
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: /(?=\bend(?:\p{space}*[\n\!\;]|\p{space}*module\b))/dgiv,
              name: "meta.block.specification.module.fortran",
              patterns: [
                {
                  begin: /\b(contains)\b/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.contains.fortran" }
                  },
                  end: /(?=\p{space}*end(?:\p{space}*[\n\!\;]|\p{space}*module\b))/dgiv,
                  name: "meta.block.contains.fortran",
                  patterns: [
                    { include: "$base" }
                  ]
                },
                { include: "$base" }
              ]
            }
          ]
        }
      ]
    },
    "name-list": {
      begin: /(?=\p{space}*[a-z])/dgiv,
      contentName: "meta.name-list.fortran",
      end: /(?=[\n\!\)\;])/dgv,
      patterns: [
        { include: "#constants" },
        { include: "#operators" },
        { include: "#intrinsic-functions" },
        { include: "#array-constructor" },
        { include: "#parentheses" },
        { include: "#brackets" },
        { include: "#assignment-keyword" },
        { include: "#operator-keyword" },
        { include: "#variable" }
      ]
    },
    "named-control-constructs": {
      applyEndPatternLast: 1,
      begin: /([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(:)(?=\p{space}*(?:associate|block(?!\p{space}*data)|critical|do|forall|if|select\p{space}*case|select\p{space}*type|select\p{space}*rank|where)\b)/dgiv,
      contentName: "meta.named-construct.fortran.modern",
      end: /(?!\p{space}*\b(?:associate|block(?!\p{space}*data)|critical|do|forall|if|select\p{space}*case|select\p{space}*type|select\p{space}*rank|where)\b)(?:\b(1)\b)?([^\n\!\;\p{space}]*?)?(?=\p{space}*[\n\!\;])/dgiv,
      endCaptures: {
        "1": { name: "meta.label.end.name.fortran" },
        "2": { name: "invalid.error.named-control-constructs.fortran.modern" }
      },
      patterns: [
        { include: "#unnamed-control-constructs" }
      ]
    },
    "namelist-statement": {
      begin: /\b(namelist)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.namelist.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      patterns: [
        { include: "$base" }
      ]
    },
    "non-intrinsic-attribute": {
      captures: {
        "1": { name: "storage.modifier.non-intrinsic.fortran" }
      },
      match: /\p{space}*\b(non_intrinsic)\b/dgiv
    },
    "non-overridable-attribute": {
      captures: {
        "1": { name: "storage.modifier.non-overridable.fortran" }
      },
      match: /\p{space}*\b(non_overridable)\b/dgiv
    },
    "nopass-attribute": {
      captures: {
        "1": { name: "storage.modifier.nopass.fortran" }
      },
      match: /\p{space}*\b(nopass)\b/dgiv
    },
    "nullify-statement": {
      begin: /\b(nullify)\p{space}*(?=\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.nullify.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      name: "meta.statement.nullify.fortran",
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "numeric-constant": {
      match: /[\-\+]?(\b\p{Nd}+\.?\p{Nd}*|\.\p{Nd}+)(_[\p{L}\p{M}\p{N}\p{Pc}]+|d[\-\+]?\p{Nd}+|e[\-\+]?\p{Nd}+(_[\p{L}\p{M}\p{N}\p{Pc}]+)?)?(?![_a-z])/dgiv,
      name: "constant.numeric.fortran"
    },
    "numeric-type": {
      patterns: [
        {
          begin: /\b(?:(complex)|(double\p{space}*precision)|(double\p{space}*complex)|(integer)|(real))\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.complex.fortran" },
            "2": { name: "storage.type.double.fortran" },
            "3": { name: "storage.type.doublecomplex.fortran" },
            "4": { name: "storage.type.integer.fortran" },
            "5": { name: "storage.type.real.fortran" },
            "6": { name: "punctuation.parentheses.left.fortran" }
          },
          contentName: "meta.type-spec.fortran",
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#parentheses-dummy-variables" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.complex.fortran" },
            "2": { name: "storage.type.double.fortran" },
            "3": { name: "storage.type.doublecomplex.fortran" },
            "4": { name: "storage.type.integer.fortran" },
            "5": { name: "storage.type.real.fortran" },
            "6": { name: "storage.type.dimension.fortran" },
            "7": { name: "keyword.operator.multiplication.fortran" },
            "8": { name: "constant.numeric.fortran" }
          },
          match: /\b(?:(complex)|(double\p{space}*precision)|(double\p{space}*complex)|(integer)|(real)|(dimension))\b(?:\p{space}*(\*)\p{space}*(\p{Nd}*))?/dgiv
        }
      ]
    },
    "operator-keyword": {
      begin: /\p{space}*\b(operator)\p{space}*(\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.generic-spec.operator.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      patterns: [
        { include: "#arithmetic-operators" },
        { include: "#logical-operators" },
        { include: "#user-defined-operators" },
        { include: "#invalid-word" }
      ]
    },
    operators: {
      patterns: [
        { include: "#arithmetic-operators" },
        { include: "#assignment-operator" },
        { include: "#derived-type-operators" },
        { include: "#logical-operators" },
        { include: "#pointer-operators" },
        { include: "#string-operators" },
        { include: "#user-defined-operators" }
      ]
    },
    "optional-attribute": {
      captures: {
        "1": { name: "storage.modifier.optional.fortran" }
      },
      match: /\p{space}*\b(optional)\b/dgiv
    },
    "parameter-attribute": {
      captures: {
        "1": { name: "storage.modifier.parameter.fortran" }
      },
      match: /\p{space}*\b(parameter)\b/dgiv
    },
    parentheses: {
      begin: /\p{space}*(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.parentheses.left.fortran" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      patterns: [
        { include: "#array-constructor" },
        { include: "#parentheses" },
        { include: "#parentheses-common" }
      ]
    },
    "parentheses-common": {
      patterns: [
        { include: "#comments" },
        { include: "#constants" },
        { include: "#operators" },
        { include: "#intrinsic-functions" },
        { include: "#variable" }
      ]
    },
    "parentheses-dummy-variables": {
      begin: /\p{space}*(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.parentheses.left.fortran" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      patterns: [
        { include: "#procedure-call-dummy-variable" },
        { include: "#array-constructor" },
        { include: "#parentheses" },
        { include: "#parentheses-common" }
      ]
    },
    "pass-attribute": {
      patterns: [
        {
          begin: /\p{space}*\b(pass)\p{space}*\(/dgiv,
          beginCaptures: {
            "1": { name: "storage.modifier.pass.fortran" }
          },
          end: /\)|(?=\n)/dgv,
          patterns: []
        },
        {
          captures: {
            "1": { name: "storage.modifier.pass.fortran" }
          },
          match: /\p{space}*\b(pass)\b/dgiv
        }
      ]
    },
    "pause-statement": {
      begin: /\p{space}*\b(pause)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.pause.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.control.pause.fortran",
      patterns: [
        { include: "#constants" },
        { include: "#invalid-character" }
      ]
    },
    "pointer-attribute": {
      captures: {
        "1": { name: "storage.modifier.pointer.fortran" }
      },
      match: /\p{space}*\b(pointer)\b/dgiv
    },
    "pointer-operators": {
      match: /(=>)/dgv,
      name: "keyword.other.point.fortran"
    },
    preprocessor: {
      begin: /^\p{space}*(#:?)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.preprocessor.indicator.fortran" }
      },
      end: /\n/dgv,
      name: "meta.preprocessor",
      patterns: [
        { include: "#preprocessor-if-construct" },
        { include: "#preprocessor-statements" }
      ]
    },
    "preprocessor-arithmetic-operators": {
      captures: {
        "1": { name: "keyword.operator.subtraction.fortran" },
        "2": { name: "keyword.operator.addition.fortran" },
        "3": { name: "keyword.operator.division.fortran" },
        "4": { name: "keyword.operator.multiplication.fortran" }
      },
      match: /(-)|(\+)|(\/)|(\*)/dgv
    },
    "preprocessor-assignment-operator": {
      match: /(?<!=)(=)(?!=)/dgv,
      name: "keyword.operator.assignment.preprocessor.fortran"
    },
    "preprocessor-comments": {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.preprocessor"
    },
    "preprocessor-constants": {
      patterns: [
        { include: "#cpp-numeric-constant" },
        { include: "#preprocessor-string-constant" }
      ]
    },
    "preprocessor-define-statement": {
      begin: {
        G: [/￿\p{space}*\b(define)\b/dgiv, /\p{space}*\b(define)\b/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.preprocessor.define.fortran" }
      },
      end: /(?=\n)/dgv,
      name: "meta.preprocessor.macro.fortran",
      patterns: [
        { include: "#preprocessor-comments" },
        { include: "#preprocessor-constants" },
        { include: "#preprocessor-line-continuation-operator" }
      ]
    },
    "preprocessor-defined-function": {
      captures: {
        "1": { name: "keyword.control.preprocessor.defined.fortran" }
      },
      match: /\b(defined)\b/dgiv
    },
    "preprocessor-error-statement": {
      begin: {
        G: [/￿\p{space}*(error)\b/dgiv, /\p{space}*(error)\b/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.preprocessor.error.fortran" }
      },
      end: /(?=\n)/dgv,
      name: "meta.preprocessor.macro.fortran",
      patterns: [
        { include: "#preprocessor-comments" },
        { include: "#preprocessor-string-constant" },
        { include: "#preprocessor-line-continuation-operator" }
      ]
    },
    "preprocessor-if-construct": {
      patterns: [
        {
          begin: {
            G: [/￿\p{space}*\b(if)\b/dgiv, /\p{space}*\b(if)\b/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.control.preprocessor.if.fortran" }
          },
          end: /(?=\n)/dgv,
          name: "meta.preprocessor.conditional.fortran",
          patterns: [
            { include: "#preprocessor-comments" },
            { include: "#cpp-numeric-constant" },
            { include: "#preprocessor-logical-operators" },
            { include: "#preprocessor-arithmetic-operators" },
            { include: "#preprocessor-defined-function" },
            { include: "#preprocessor-line-continuation-operator" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(ifdef)\b/dgiv, /\p{space}*\b(ifdef)\b/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.control.preprocessor.ifdef.fortran" }
          },
          end: /(?=\n)/dgv,
          patterns: [
            { include: "#preprocessor-comments" },
            { include: "#cpp-numeric-constant" },
            { include: "#preprocessor-logical-operators" },
            { include: "#preprocessor-arithmetic-operators" },
            { include: "#preprocessor-line-continuation-operator" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(ifndef)\b/dgiv, /\p{space}*\b(ifndef)\b/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.control.preprocessor.ifndef.fortran" }
          },
          end: /(?=\n)/dgv,
          patterns: [
            { include: "#preprocessor-comments" },
            { include: "#cpp-numeric-constant" },
            { include: "#preprocessor-logical-operators" },
            { include: "#preprocessor-arithmetic-operators" },
            { include: "#preprocessor-line-continuation-operator" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(else)\b/dgiv, /\p{space}*\b(else)\b/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.control.preprocessor.else.fortran" }
          },
          end: /(?=\n)/dgv,
          patterns: [
            { include: "#preprocessor-comments" },
            { include: "#cpp-numeric-constant" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(elif)\b/dgiv, /\p{space}*\b(elif)\b/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.control.preprocessor.elif.fortran" }
          },
          end: /(?=\n)/dgv,
          patterns: [
            { include: "#preprocessor-comments" },
            { include: "#cpp-numeric-constant" },
            { include: "#preprocessor-logical-operators" },
            { include: "#preprocessor-arithmetic-operators" },
            { include: "#preprocessor-defined-function" },
            { include: "#preprocessor-line-continuation-operator" }
          ]
        },
        {
          begin: {
            G: [/￿\p{space}*\b(endif)\b/dgiv, /\p{space}*\b(endif)\b/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.control.preprocessor.endif.fortran" }
          },
          end: /(?=\n)/dgv,
          patterns: [
            { include: "#preprocessor-comments" }
          ]
        }
      ]
    },
    "preprocessor-include-statement": {
      begin: {
        G: [/￿\p{space}*(include)\b/dgiv, /\p{space}*(include)\b/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.preprocessor.include.fortran" }
      },
      end: /(?=\n)/dgv,
      name: "meta.preprocessor.include.fortran",
      patterns: [
        { include: "#preprocessor-comments" },
        { include: "#preprocessor-string-constant" },
        {
          begin: /</dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.preprocessor.fortran" }
          },
          end: />/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.preprocessor.fortran" }
          },
          name: "string.quoted.other.lt-gt.include.preprocessor.fortran"
        },
        { include: "#line-continuation-operator" }
      ]
    },
    "preprocessor-line-continuation-operator": {
      begin: /\p{space}*(\\)/dgv,
      beginCaptures: {
        "1": { name: "constant.character.escape.line-continuation.preprocessor.fortran" }
      },
      end: /^/dgv
    },
    "preprocessor-logical-operators": {
      captures: {
        "1": { name: "keyword.operator.logical.preprocessor.and.fortran" },
        "2": { name: "keyword.operator.logical.preprocessor.equals.fortran" },
        "3": { name: "keyword.operator.logical.preprocessor.not_equals.fortran" },
        "4": { name: "keyword.operator.logical.preprocessor.or.fortran" },
        "5": { name: "keyword.operator.logical.preprocessor.less_eq.fortran" },
        "6": { name: "keyword.operator.logical.preprocessor.more_eq.fortran" },
        "7": { name: "keyword.operator.logical.preprocessor.less.fortran" },
        "8": { name: "keyword.operator.logical.preprocessor.more.fortran" },
        "9": { name: "keyword.operator.logical.preprocessor.complementary.fortran" },
        "10": { name: "keyword.operator.logical.preprocessor.xor.fortran" },
        "11": { name: "keyword.operator.logical.preprocessor.bitand.fortran" },
        "12": { name: "keyword.operator.logical.preprocessor.not.fortran" },
        "13": { name: "keyword.operator.logical.preprocessor.bitor.fortran" }
      },
      match: /(&&)|(==)|(!=)|(\|\|)|(<=)|(>=)|(<)|(>)|(~)|(\^)|(&)|(!)|(\|)/dgv,
      name: "keyword.operator.logical.preprocessor.fortran"
    },
    "preprocessor-operators": {
      patterns: [
        { include: "#preprocessor-line-continuation-operator" },
        { include: "#preprocessor-logical-operators" },
        { include: "#preprocessor-arithmetic-operators" }
      ]
    },
    "preprocessor-pragma-statement": {
      begin: {
        G: [/￿\p{space}*\b(pragma)\b/dgiv, /\p{space}*\b(pragma)\b/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.preprocessor.pragma.fortran" }
      },
      end: /(?=\n)/dgv,
      name: "meta.preprocessor.pragma.fortran",
      patterns: [
        { include: "#preprocessor-comments" },
        { include: "#preprocessor-string-constant" }
      ]
    },
    "preprocessor-statements": {
      patterns: [
        { include: "#preprocessor-define-statement" },
        { include: "#preprocessor-error-statement" },
        { include: "#preprocessor-include-statement" },
        { include: "#preprocessor-preprocessor-pragma-statement" },
        { include: "#preprocessor-undefine-statement" }
      ]
    },
    "preprocessor-string-constant": {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.preprocessor.fortran" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.preprocessor.fortran" }
          },
          name: "string.quoted.double.include.preprocessor.fortran"
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.preprocessor.fortran" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.preprocessor.fortran" }
          },
          name: "string.quoted.single.include.preprocessor.fortran"
        }
      ]
    },
    "preprocessor-undefine-statement": {
      begin: {
        G: [/￿\p{space}*\b(undef)\b/dgiv, /\p{space}*\b(undef)\b/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.preprocessor.undef.fortran" }
      },
      end: /(?=\n)/dgv,
      name: "meta.preprocessor.undef.fortran",
      patterns: [
        { include: "#preprocessor-comments" },
        { include: "#preprocessor-line-continuation-operator" }
      ]
    },
    "private-attribute": {
      captures: {
        "1": { name: "storage.modifier.private.fortran" }
      },
      match: /\p{space}*\b(private)\b/dgiv
    },
    "procedure-call-dummy-variable": {
      match: /\p{space}*([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)(?=\p{space}*=)(?!\p{space}*==)/dgiv,
      name: "variable.parameter.dummy-variable.fortran.modern"
    },
    "procedure-definition": {
      begin: /(?=[^\n\!"'\;]*\bmodule\p{space}+procedure\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.procedure.fortran",
      patterns: [
        {
          begin: /\p{space}*\b(module\p{space}+procedure)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.other.procedure.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              begin: {
                G: [/￿\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv, /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgivy]
              },
              beginCaptures: {
                "1": { name: "entity.name.function.procedure.fortran" }
              },
              end: /\p{space}*\b(?:(end\p{space}*procedure)(?:\p{space}+([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?|(end))\b\p{space}*([^\n\!\;]+)?(?=[\n\!\;])/dgiv,
              endCaptures: {
                "1": { name: "keyword.other.endprocedure.fortran" },
                "2": { name: "entity.name.function.procedure.fortran" },
                "3": { name: "keyword.other.endprocedure.fortran" },
                "4": { name: "invalid.error.procedure-definition.fortran" }
              },
              patterns: [
                {
                  begin: {
                    G: [/￿(?!\p{space}*[\n\!\;])/dgv, /(?!\p{space}*[\n\!\;])/dgvy]
                  },
                  end: /(?=[\n\!\;])/dgv,
                  name: "meta.first-line.fortran",
                  patterns: [
                    { include: "#invalid-character" }
                  ]
                },
                {
                  begin: /(?!\p{space}*(?:contains\b|end\p{space}*[\n\!\;]|end\p{space}*procedure\b))/dgiv,
                  end: /(?=\p{space}*(?:contains\b|end\p{space}*[\n\!\;]|end\p{space}*procedure\b))/dgiv,
                  name: "meta.block.specification.procedure.fortran",
                  patterns: [
                    { include: "$self" }
                  ]
                },
                {
                  begin: /\p{space}*(contains)\b/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.contains.fortran" }
                  },
                  end: /(?=\p{space}*end(?:\p{space}*[\n\!\;]|\p{space}*procedure\b))/dgiv,
                  name: "meta.block.contains.fortran",
                  patterns: [
                    { include: "$self" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "procedure-name": {
      captures: {
        "1": { name: "entity.name.function.procedure.fortran" }
      },
      match: /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv
    },
    "procedure-name-list": {
      begin: /(?=\p{space}*[a-z])/dgiv,
      contentName: "meta.name-list.fortran",
      end: /(?=[\n\!\;])/dgv,
      patterns: [
        {
          begin: /(?!\p{space}*\n)/dgv,
          end: /(,)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "punctuation.comma.fortran" }
          },
          patterns: [
            { include: "#procedure-name" },
            { include: "#pointer-operators" }
          ]
        }
      ]
    },
    "procedure-specification-statement": {
      begin: /(?=\bprocedure\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.specification.procedure.fortran",
      patterns: [
        { include: "#procedure-type" },
        {
          begin: /(?=\p{space}*(,|::|\())/dgv,
          contentName: "meta.attribute-list.procedure.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            {
              begin: /(,)|^|(?<=&)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\&\,\;])/dgv,
              patterns: [
                { include: "#access-attribute" },
                { include: "#intent-attribute" },
                { include: "#optional-attribute" },
                { include: "#pointer-attribute" },
                { include: "#protected-attribute" },
                { include: "#save-attribute" },
                { include: "#invalid-word" }
              ]
            }
          ]
        },
        { include: "#procedure-name-list" }
      ]
    },
    "procedure-type": {
      patterns: [
        {
          begin: /\b(procedure)\p{space}*(\()/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.procedure.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" }
          },
          contentName: "meta.type-spec.fortran",
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.parentheses.right.fortran" }
          },
          patterns: [
            { include: "#types" },
            { include: "#procedure-name" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.procedure.fortran" }
          },
          match: /\b(procedure)\b/dgiv
        }
      ]
    },
    "program-definition": {
      begin: /(?=\b(program)\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.program.fortran",
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.program.fortran" }
          },
          match: {
            G: [/￿\p{space}*\b(program)\b/dgiv, /\p{space}*\b(program)\b/dgivy]
          }
        },
        {
          applyEndPatternLast: 1,
          begin: /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv,
          beginCaptures: {
            "1": { name: "entity.name.program.fortran" }
          },
          end: /\b(?:(end\p{space}*program)(?:\p{space}+([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?|(end))\b\p{space}*([^\n\!\;]+)?(?=[\n\!\;])/dgiv,
          endCaptures: {
            "1": { name: "keyword.control.endprogram.fortran" },
            "2": { name: "entity.name.program.fortran" },
            "3": { name: "keyword.control.endprogram.fortran" },
            "4": { name: "invalid.error.program-definition.fortran" }
          },
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: /(?=\bend(?:\p{space}*[\n\!\;]|\p{space}*program\b))/dgiv,
              name: "meta.block.specification.program.fortran",
              patterns: [
                {
                  begin: /\b(contains)\b/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.contains.fortran" }
                  },
                  end: /(?=end(?:\p{space}*[\n\!\;]|\p{space}*program\b))/dgiv,
                  name: "meta.block.contains.fortran",
                  patterns: [
                    { include: "$base" }
                  ]
                },
                { include: "$base" }
              ]
            }
          ]
        }
      ]
    },
    "protected-attribute": {
      captures: {
        "1": { name: "storage.modifier.protected.fortran" }
      },
      match: /\p{space}*\b(protected)\b/dgiv
    },
    "public-attribute": {
      captures: {
        "1": { name: "storage.modifier.public.fortran" }
      },
      match: /\p{space}*\b(public)\b/dgiv
    },
    "pure-attribute": {
      captures: {
        "1": { name: "storage.modifier.impure.fortran" },
        "2": { name: "storage.modifier.pure.fortran" }
      },
      match: /\p{space}*\b(?:(impure)|(pure))\b/dgiv
    },
    "recursive-attribute": {
      captures: {
        "1": { name: "storage.modifier.non_recursive.fortran" },
        "2": { name: "storage.modifier.recursive.fortran" }
      },
      match: /\p{space}*\b(?:(non_recursive)|(recursive))\b/dgiv
    },
    "result-statement": {
      begin: /\p{space}*\b(result)\p{space}*(\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.result.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      patterns: [
        { include: "#dummy-variable" }
      ]
    },
    "return-statement": {
      begin: /\p{space}*\b(return)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.return.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.control.return.fortran",
      patterns: [
        { include: "#invalid-character" }
      ]
    },
    "save-attribute": {
      captures: {
        "1": { name: "storage.modifier.save.fortran" }
      },
      match: /\p{space}*\b(save)\b/dgiv
    },
    "select-case-construct": {
      begin: /\b(select\p{space}*case)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.selectcase.fortran" }
      },
      end: /\b(end\p{space}*select)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.endselect.fortran" }
      },
      name: "meta.block.select.case.fortran",
      patterns: [
        { include: "#parentheses" },
        {
          begin: /\b(case)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.case.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "keyword.control.default.fortran" }
              },
              match: {
                G: [/￿\p{space}*\b(default)\b/dgiv, /\p{space}*\b(default)\b/dgivy]
              }
            },
            { include: "#parentheses" },
            { include: "#invalid-word" }
          ]
        },
        { include: "$base" }
      ]
    },
    "select-rank-construct": {
      begin: /\b(select\p{space}*rank)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.selectrank.fortran" }
      },
      end: /\b(end\p{space}*select)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.endselect.fortran" }
      },
      name: "meta.block.select.rank.fortran",
      patterns: [
        { include: "#parentheses" },
        {
          begin: /\b(rank)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.rank.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "keyword.control.default.fortran" }
              },
              match: {
                G: [/￿\p{space}*\b(default)\b/dgiv, /\p{space}*\b(default)\b/dgivy]
              }
            },
            { include: "#parentheses" },
            { include: "#invalid-word" }
          ]
        },
        { include: "$base" }
      ]
    },
    "select-type-construct": {
      begin: /\b(select\p{space}*type)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.selecttype.fortran" }
      },
      end: /\b(end\p{space}*select)\b/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.endselect.fortran" }
      },
      name: "meta.block.select.type.fortran",
      patterns: [
        { include: "#parentheses" },
        {
          begin: /\b(?:(class)|(type))\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.class.fortran" },
            "2": { name: "keyword.control.type.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "keyword.control.default.fortran" }
              },
              match: {
                G: [/￿\p{space}*\b(default)\b/dgiv, /\p{space}*\b(default)\b/dgivy]
              }
            },
            {
              captures: {
                "1": { name: "keyword.control.is.fortran" }
              },
              match: {
                G: [/￿\p{space}*\b(is)\b/dgiv, /\p{space}*\b(is)\b/dgivy]
              }
            },
            { include: "#parentheses" },
            { include: "#invalid-word" }
          ]
        },
        { include: "$base" }
      ]
    },
    "sequence-attribute": {
      captures: {
        "1": { name: "storage.modifier.sequence.fortran" }
      },
      match: /\p{space}*\b(sequence)\b/dgiv
    },
    "specification-statements": {
      patterns: [
        { include: "#attribute-specification-statement" },
        { include: "#common-statement" },
        { include: "#data-statement" },
        { include: "#equivalence-statement" },
        { include: "#implicit-statement" },
        { include: "#namelist-statement" },
        { include: "#use-statement" }
      ]
    },
    "stop-statement": {
      begin: /\p{space}*\b(stop)\b(?:\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b)?/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.stop.fortran" },
        "2": { name: "meta.label.stop.stop" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.control.stop.fortran",
      patterns: [
        { include: "#constants" },
        { include: "#string-operators" },
        { include: "#invalid-character" }
      ]
    },
    "string-constant": {
      patterns: [
        {
          applyEndPatternLast: 1,
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.fortran" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.fortran" }
          },
          name: "string.quoted.single.fortran",
          patterns: [
            {
              match: /''/dgv,
              name: "constant.character.escape.apostrophe.fortran"
            }
          ]
        },
        {
          applyEndPatternLast: 1,
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.fortran" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.fortran" }
          },
          name: "string.quoted.double.fortran",
          patterns: [
            {
              match: /""/dgv,
              name: "constant.character.escape.quote.fortran"
            }
          ]
        }
      ]
    },
    "string-line-continuation-operator": {
      begin: /(&)(?=\p{space}*\n)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.line-continuation.fortran" }
      },
      end: /^(?:(?=\p{space}*[^\!\&\p{space}])|\p{space}*(&))/dgv,
      endCaptures: {
        "1": { name: "keyword.operator.line-continuation.fortran" }
      },
      patterns: [
        { include: "#comments" },
        {
          match: /\P{space}[^\n]*/dgv,
          name: "invalid.error.string-line-cont.fortran"
        }
      ]
    },
    "string-operators": {
      match: /(\/\/)/dgv,
      name: "keyword.other.concatination.fortran"
    },
    "submodule-definition": {
      begin: /(?=\b(submodule)\p{space}*\()/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.submodule.fortran",
      patterns: [
        {
          begin: {
            G: [/￿\p{space}*\b(submodule)\p{space}*(\()\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv, /\p{space}*\b(submodule)\p{space}*(\()\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)/dgivy]
          },
          beginCaptures: {
            "1": { name: "keyword.other.submodule.fortran" },
            "2": { name: "punctuation.parentheses.left.fortran" },
            "3": { name: "entity.name.class.submodule.fortran" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.parentheses.left.fortran" }
          },
          patterns: []
        },
        {
          applyEndPatternLast: 1,
          begin: /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv,
          beginCaptures: {
            "1": { name: "entity.name.module.submodule.fortran" }
          },
          end: /\p{space}*\b(?:(end\p{space}*submodule)(?:\p{space}+([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?|(end))\b\p{space}*([^\n\!\;]+)?(?=[\n\!\;])/dgiv,
          endCaptures: {
            "1": { name: "keyword.other.endsubmodule.fortran" },
            "2": { name: "entity.name.module.submodule.fortran" },
            "3": { name: "keyword.other.endsubmodule.fortran" },
            "4": { name: "invalid.error.submodule.fortran" }
          },
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: /(?=\bend(?:\p{space}*[\n\!\;]|\p{space}*submodule\b))/dgiv,
              name: "meta.block.specification.submodule.fortran",
              patterns: [
                {
                  begin: /\b(contains)\b/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.contains.fortran" }
                  },
                  end: /(?=\p{space}*end(?:\p{space}*[\n\!\;]|\p{space}*submodule\b))/dgiv,
                  name: "meta.block.contains.fortran",
                  patterns: [
                    { include: "$base" }
                  ]
                },
                { include: "$base" }
              ]
            }
          ]
        }
      ]
    },
    "subroutine-definition": {
      begin: /(?=([^\n\!"'\:\;](?!\bend))*\bsubroutine\b)/dgiv,
      end: /(?=[\n\!\;])/dgv,
      name: "meta.subroutine.fortran",
      patterns: [
        {
          begin: {
            G: [/(?=￿\p{space}*(?!\bsubroutine\b))/dgiv, new EmulatedRegExp("(?=^\\p{space}*(?!\\bsubroutine\\b))", "dgiv", { strategy: "clip_search" })]
          },
          end: /(?=\bsubroutine\b)/dgiv,
          name: "meta.attribute-list.subroutine.fortran",
          patterns: [
            { include: "#elemental-attribute" },
            { include: "#module-attribute" },
            { include: "#pure-attribute" },
            { include: "#recursive-attribute" },
            { include: "#invalid-word" }
          ]
        },
        {
          begin: /\p{space}*\b(subroutine)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.other.subroutine.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              begin: {
                G: [/￿\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv, /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgivy]
              },
              beginCaptures: {
                "1": { name: "entity.name.function.subroutine.fortran" }
              },
              end: /\b(?:(end\p{space}*subroutine)(?:\p{space}+([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?|(end))\b\p{space}*([^\n\!\;]+)?(?=[\n\!\;])/dgiv,
              endCaptures: {
                "1": { name: "keyword.other.endsubroutine.fortran" },
                "2": { name: "entity.name.function.subroutine.fortran" },
                "3": { name: "keyword.other.endsubroutine.fortran" },
                "4": { name: "invalid.error.subroutine.fortran" }
              },
              patterns: [
                {
                  begin: {
                    G: [/￿(?!\p{space}*[\n\!\;])/dgv, /(?!\p{space}*[\n\!\;])/dgvy]
                  },
                  end: /(?=[\n\!\;])/dgv,
                  name: "meta.first-line.fortran",
                  patterns: [
                    { include: "#dummy-variable-list" },
                    { include: "#language-binding-attribute" }
                  ]
                },
                {
                  begin: /(?!\bend(?:\p{space}*[\n\!\;]|\p{space}*subroutine\b))/dgiv,
                  end: /(?=\bend(?:\p{space}*[\n\!\;]|\p{space}*subroutine\b))/dgiv,
                  name: "meta.block.specification.subroutine.fortran",
                  patterns: [
                    {
                      begin: /\b(contains)\b/dgiv,
                      beginCaptures: {
                        "1": { name: "keyword.control.contains.fortran" }
                      },
                      end: /(?=end(?:\p{space}*[\n\!\;]|\p{space}*subroutine\b))/dgiv,
                      name: "meta.block.contains.fortran",
                      patterns: [
                        { include: "$base" }
                      ]
                    },
                    { include: "$base" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "sync-all-statement": {
      begin: /\b(sync (?:all|memory))(\p{space}*(?=\())?/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.sync-all-memory.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      name: "meta.statement.sync-all-memory.fortran",
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "sync-statement": {
      begin: /\b(sync (?:images|team))\p{space}*(?=\()/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.sync-images-team.fortran" },
        "2": { name: "punctuation.parentheses.left.fortran" }
      },
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "1": { name: "punctuation.parentheses.right.fortran" }
      },
      name: "meta.statement.sync-images-team.fortran",
      patterns: [
        { include: "#parentheses-dummy-variables" }
      ]
    },
    "target-attribute": {
      captures: {
        "1": { name: "storage.modifier.target.fortran" }
      },
      match: /\p{space}*\b(target)\b/dgiv
    },
    "type-specification-statements": {
      begin: /(?=\b(?:character|class|complex|double\p{space}*precision|double\p{space}*complex|integer|logical|real|type|dimension)\b(?![^\n\!"'\:\;]*\bfunction\b))/dgiv,
      end: /(?=[\n\!\)\;])/dgv,
      name: "meta.specification.type.fortran",
      patterns: [
        { include: "#types" },
        {
          begin: /(?=\p{space}*(,|::))/dgv,
          contentName: "meta.attribute-list.type-specification-statements.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            {
              begin: /(,)|^|(?<=&)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\&\,\;])/dgv,
              patterns: [
                { include: "#access-attribute" },
                { include: "#allocatable-attribute" },
                { include: "#asynchronous-attribute" },
                { include: "#codimension-attribute" },
                { include: "#contiguous-attribute" },
                { include: "#dimension-attribute" },
                { include: "#external-attribute" },
                { include: "#intent-attribute" },
                { include: "#intrinsic-attribute" },
                { include: "#language-binding-attribute" },
                { include: "#optional-attribute" },
                { include: "#parameter-attribute" },
                { include: "#pointer-attribute" },
                { include: "#protected-attribute" },
                { include: "#save-attribute" },
                { include: "#target-attribute" },
                { include: "#value-attribute" },
                { include: "#volatile-attribute" },
                { include: "#invalid-word" }
              ]
            }
          ]
        },
        { include: "#name-list" }
      ]
    },
    types: {
      patterns: [
        { include: "#character-type" },
        { include: "#derived-type" },
        { include: "#logical-type" },
        { include: "#numeric-type" }
      ]
    },
    "unnamed-control-constructs": {
      patterns: [
        { include: "#associate-construct" },
        { include: "#block-construct" },
        { include: "#critical-construct" },
        { include: "#do-construct" },
        { include: "#forall-construct" },
        { include: "#if-construct" },
        { include: "#select-case-construct" },
        { include: "#select-type-construct" },
        { include: "#select-rank-construct" },
        { include: "#where-construct" }
      ]
    },
    "use-statement": {
      begin: /\b(use)\b/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.use.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      name: "meta.statement.use.fortran",
      patterns: [
        {
          begin: /(?=\p{space}*(,|::|\())/dgv,
          contentName: "meta.attribute-list.namelist.fortran",
          end: /(::)|(?=[\n\!\;])/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.double-colon.fortran" }
          },
          patterns: [
            {
              begin: /(,)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\,\;])/dgv,
              patterns: [
                { include: "#intrinsic-attribute" },
                { include: "#non-intrinsic-attribute" },
                { include: "#invalid-word" }
              ]
            }
          ]
        },
        {
          begin: /\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv,
          beginCaptures: {
            "1": { name: "entity.name.class.module.fortran" }
          },
          end: /(?=[\n\!\;])/dgv,
          patterns: [
            {
              begin: /(,)/dgv,
              beginCaptures: {
                "1": { name: "punctuation.comma.fortran" }
              },
              end: /(?=::|[\n\!\;])/dgv,
              patterns: [
                {
                  begin: /\p{space}*\b(only\p{space}*:)/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.only.fortran" }
                  },
                  end: /(?=[\n\!\;])/dgv,
                  patterns: [
                    { include: "#operator-keyword" },
                    { include: "$base" }
                  ]
                },
                {
                  begin: /(?=\p{space}*[a-z])/dgiv,
                  contentName: "meta.name-list.fortran",
                  end: /(?=[\n\!\;])/dgv,
                  patterns: [
                    { include: "#operator-keyword" },
                    { include: "$base" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "user-defined-operators": {
      captures: {
        "1": { name: "keyword.operator.user-defined.fortran" }
      },
      match: /\p{space}*(\.[a-z]+\.)/dgiv
    },
    "value-attribute": {
      captures: {
        "1": { name: "storage.modifier.value.fortran" }
      },
      match: /\p{space}*\b(value)\b/dgiv
    },
    variable: {
      applyEndPatternLast: 1,
      begin: /\b(?=[a-z])/dgiv,
      end: {
        G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.parameter.fortran",
      patterns: [
        { include: "#brackets" },
        { include: "#derived-type-operators" },
        { include: "#parentheses-dummy-variables" },
        { include: "#word" }
      ]
    },
    "volatile-attribute": {
      captures: {
        "1": { name: "storage.modifier.volatile.fortran" }
      },
      match: /\p{space}*\b(volatile)\b/dgiv
    },
    "where-construct": {
      patterns: [
        {
          applyEndPatternLast: 1,
          begin: /\b(where)\b/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.where.fortran" }
          },
          end: {
            G: [/(?<!￿)/dgv, new EmulatedRegExp("(?<!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            { include: "#logical-control-expression" },
            {
              begin: /(?<=\))(?=\p{space}*[\n\!\;])/dgv,
              end: /\b(end\p{space}*where)\b/dgiv,
              endCaptures: {
                "1": { name: "keyword.control.endwhere.fortran" }
              },
              name: "meta.block.where.fortran",
              patterns: [
                {
                  begin: /\p{space}*\b(else\p{space}*where)\b/dgiv,
                  beginCaptures: {
                    "1": { name: "keyword.control.elsewhere.fortran" }
                  },
                  end: /\p{space}*(?=[\n\!\;])/dgv,
                  patterns: [
                    { include: "#parentheses" },
                    {
                      captures: {
                        "1": { name: "meta.label.elsewhere.fortran" }
                      },
                      match: /(\p{space}*[a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?/dgiv
                    },
                    { include: "#invalid-word" }
                  ]
                },
                { include: "$base" }
              ]
            },
            {
              begin: /(?<=\))(?!\p{space}*[\n\!\;])/dgv,
              end: /\n/dgv,
              name: "meta.statement.control.where.fortran",
              patterns: [
                { include: "$base" }
              ]
            }
          ]
        }
      ]
    },
    "while-attribute": {
      begin: {
        G: [/￿\p{space}*\b(while)\b/dgiv, /\p{space}*\b(while)\b/dgivy]
      },
      beginCaptures: {
        "1": { name: "keyword.control.while.fortran" }
      },
      end: /(?=[\n\!\;])/dgv,
      patterns: [
        { include: "#parentheses" },
        { include: "#invalid-word" }
      ]
    },
    word: {
      patterns: [
        {
          match: {
            G: [/(?:￿|(?<=%))\p{space}*\b([a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgiv, new EmulatedRegExp("(?:^|(?<=%))\\p{space}*\\b([a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*)\\b", "dgiv", { strategy: "clip_search" })]
          }
        }
      ]
    }
  },
  injections: {
    "source.fortran.free - ( string | comment | meta.preprocessor )": {
      patterns: [
        { include: "#line-continuation-operator" },
        { include: "#preprocessor" }
      ]
    },
    "string.quoted.double.fortran": {
      patterns: [
        { include: "#string-line-continuation-operator" }
      ]
    },
    "string.quoted.single.fortran": {
      patterns: [
        { include: "#string-line-continuation-operator" }
      ]
    }
  },
  dependencies: []
};
