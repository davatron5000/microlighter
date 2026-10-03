export default {
  name: "c3",
  displayName: "C3",
  scopeName: "source.c3",
  patterns: [
    { include: "#top_level" },
    { include: "#statements" }
  ],
  repository: {
    assign_right_expression: {
      begin: /=/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.assignment.c3" }
      },
      end: /(?=;)/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#expression" }
      ]
    },
    attribute: {
      patterns: [
        {
          begin: /@(?:(?:align|allow_deprecated|benchmark|bigendian|builtin|callconv|cname|compact|const|constinit|deprecated|dynamic|export|finalizer|format|if|inline|init|jump|link|littleendian|local|maydiscard|mustinit|naked|noalias|nodiscard|noinit|noinline|nopadding|norecurse|noreturn|nosanitize|nostrip|obfuscate|operator|operator_r|operator_s|optional|overlap|packed|private|public|pure|reflect|safeinfer|safemacro|simd|section|tag|test|unused|used|wasm|weak|weaklink|winmain)|\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.annotation.c3" }
          },
          end: /(?=[^\t \(])|(?<=\))/dgv,
          name: "meta.annotation.c3",
          patterns: [
            { include: "#parens" }
          ]
        }
      ]
    },
    block: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.block.begin.c3" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.c3" }
          },
          name: "meta.block.c3",
          patterns: [
            { include: "#statements" }
          ]
        }
      ]
    },
    block_comment: {
      begin: /\/\*/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.begin.c3" }
      },
      end: /\*\//dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.end.c3" }
      },
      name: "comment.block.c3",
      patterns: [
        { include: "#block_comment_body" }
      ]
    },
    block_comment_body: {
      patterns: [
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          patterns: [
            { include: "#block_comment_body" }
          ]
        }
      ]
    },
    brackets: {
      patterns: [
        {
          begin: /\[<?/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.brackets.begin.c3" }
          },
          end: />?\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.brackets.end.c3" }
          },
          name: "meta.brackets.c3",
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    builtin: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.language.c3" },
            "2": { name: "entity.name.function.builtin.c3" }
          },
          match: /(?:(\$\$\b_*[A-Z][0-9A-Z_]*)|(\$\$\b_*[a-z][0-9A-Z_a-z]*))\b/dgv
        }
      ]
    },
    bytes_literal: {
      patterns: [
        {
          begin: /(x)(["'\`])/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.c3" },
            "2": { name: "punctuation.definition.string.begin.c3" }
          },
          end: /2/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.c3" }
          },
          name: "string.quoted.other.c3",
          patterns: [
            {
              match: /[f\p{space}\p{AHex}]+/dgv,
              name: "constant.numeric.integer.c3"
            }
          ]
        },
        {
          begin: /(b64)(["'\`])/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.c3" },
            "2": { name: "punctuation.definition.string.begin.c3" }
          },
          end: /2/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.c3" }
          },
          name: "string.quoted.other.c3",
          patterns: [
            {
              match: /[\+\/-9\=A-Za-z\p{space}]+/dgv,
              name: "constant.numeric.integer.c3"
            }
          ]
        }
      ]
    },
    char_literal: {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.c3" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.c3" }
      },
      name: "string.quoted.single.c3",
      patterns: [
        { include: "#escape_sequence" }
      ]
    },
    comments: {
      patterns: [
        { include: "#line_comment" },
        { include: "#block_comment" },
        { include: "#doc_comment" }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b(true|false|null)\b/dgv,
          name: "constant.language.c3"
        },
        {
          begin: /\b_*[A-Z][0-9A-Z_]*\b/dgv,
          beginCaptures: {
            "0": { name: "variable.other.constant.c3" }
          },
          end: /(?=[^\t \{])|(?<=\})/dgv,
          patterns: [
            { include: "#generic_args" }
          ]
        }
      ]
    },
    contract_expression: {
      patterns: [
        { include: "#comments" },
        { include: "#function" },
        { include: "#constants" },
        { include: "#builtin" },
        { include: "#real_literal" },
        { include: "#integer_literal" },
        { include: "#operators" },
        { include: "#keywords" },
        { include: "#type" },
        { include: "#path" },
        { include: "#function_call" },
        { include: "#variable" },
        { include: "#parens" },
        { include: "#brackets" },
        { include: "#block" },
        { include: "#punctuation" },
        { include: "#leftover_at_ident" }
      ]
    },
    control_statements: {
      patterns: [
        {
          begin: /\$for\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.ct.c3" }
          },
          end: /:/dgv,
          endCaptures: {
            "0": { name: "punctuation.separator.c3" }
          },
          patterns: [
            { include: "#statements" }
          ]
        },
        {
          begin: /\$foreach\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.ct.c3" }
          },
          end: /(?<=:)/dgv,
          patterns: [
            { include: "#comments" },
            {
              match: /\$\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "variable.other.c3"
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.c3"
            },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.c3" }
              },
              end: /:/dgv,
              endCaptures: {
                "0": { name: "punctuation.separator.c3" }
              },
              patterns: [
                { include: "#expression" }
              ]
            }
          ]
        },
        {
          begin: /\bfor\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.c3" }
          },
          end: /(?<=\))/dgv,
          patterns: [
            { include: "#comments" },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.group.begin.c3" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.group.end.c3" }
              },
              patterns: [
                { include: "#statements" }
              ]
            }
          ]
        },
        {
          begin: /\$(?:switch|case|default|if)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.ct.c3" }
          },
          end: /:/dgv,
          endCaptures: {
            "0": { name: "punctuation.separator.c3" }
          },
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /\b(?:case|default)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.c3" }
          },
          end: /:/dgv,
          endCaptures: {
            "0": { name: "punctuation.separator.c3" }
          },
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    doc_comment: {
      begin: /(?=<\*)/dgv,
      end: /(\*>)/dgv,
      endCaptures: {
        "0": { name: "comment.block.documentation.c3" },
        "1": { name: "punctuation.definition.comment.end.c3" }
      },
      patterns: [
        { include: "#doc_comment_body" }
      ]
    },
    doc_comment_body: {
      patterns: [
        {
          begin: /(<\*)\p{space}*(?=@)/dgv,
          beginCaptures: {
            "0": { name: "comment.block.documentation.c3" },
            "1": { name: "punctuation.definition.comment.begin.c3" }
          },
          end: /(?=\*>)/dgv,
          patterns: [
            {
              captures: {
                "0": { name: "comment.block.documentation.c3" },
                "1": { name: "variable.parameter.c3" },
                "2": { name: "support.type.c3" },
                "3": { name: "keyword.operator.variadic.c3" }
              },
              match: /@param(?:\p{space}*\[&?(?:in|out|inout)\])?\p{space}*(?:([\#\$]?\b_*[a-z][0-9A-Z_a-z]*)\b|(\$\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*)\b|(\.\.\.))/dgv
            },
            {
              begin: /@(?:require\b|ensure\b|return\?)/dgv,
              beginCaptures: {
                "0": { name: "comment.block.documentation.c3" }
              },
              end: /(?=:|\*>|(?=\n?$))/dgv,
              patterns: [
                { include: "#contract_expression" }
              ]
            },
            {
              match: /@\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "comment.block.documentation.c3"
            },
            {
              match: /:/dgv,
              name: "comment.block.documentation.c3"
            },
            {
              match: /`[^\`]*`|"[^"]*"/dgv,
              name: "comment.block.documentation.c3"
            }
          ]
        },
        {
          begin: /(<\*)/dgv,
          beginCaptures: {
            "0": { name: "comment.block.documentation.c3" },
            "1": { name: "punctuation.definition.comment.begin.c3" }
          },
          end: /(?=^\p{space}*@|\*>)/dgv,
          name: "comment.block.documentation.c3"
        },
        {
          begin: /(?:)/dgv,
          end: /(?=\*>)/dgv,
          patterns: [
            {
              captures: {
                "0": { name: "comment.block.documentation.c3" },
                "1": { name: "variable.parameter.c3" },
                "2": { name: "support.type.c3" },
                "3": { name: "keyword.operator.variadic.c3" }
              },
              match: /^\p{space}*@param(?:\p{space}*\[&?(?:in|out|inout)\])?\p{space}*(?:([\#\$]?\b_*[a-z][0-9A-Z_a-z]*)\b|(\$\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*)\b|(\.\.\.))/dgv
            },
            {
              begin: /^\p{space}*@(?:require\b|ensure\b|return\?)/dgv,
              beginCaptures: {
                "0": { name: "comment.block.documentation.c3" }
              },
              end: /(?=:|\*>|(?=\n?$))/dgv,
              patterns: [
                { include: "#contract_expression" }
              ]
            },
            {
              match: /^\p{space}*@\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "comment.block.documentation.c3"
            },
            {
              match: /:/dgv,
              name: "comment.block.documentation.c3"
            },
            {
              match: /`[^\`]*`|"[^"]*"/dgv,
              name: "comment.block.documentation.c3"
            }
          ]
        }
      ]
    },
    escape_sequence: {
      match: /\\(["'0\\abefnrtv]|x\p{AHex}{2}|u\p{AHex}{4}|U\p{AHex}{8})/dgv,
      name: "constant.character.escape.c3"
    },
    expression: {
      patterns: [
        { include: "#comments" },
        { include: "#function" },
        { include: "#constants" },
        { include: "#builtin" },
        { include: "#literals" },
        { include: "#operators" },
        { include: "#keywords" },
        { include: "#type" },
        { include: "#path" },
        { include: "#function_call" },
        { include: "#variable" },
        { include: "#parens" },
        { include: "#brackets" },
        { include: "#block" },
        { include: "#punctuation" },
        { include: "#leftover_at_ident" }
      ]
    },
    function: {
      begin: /(?=\b(fn|macro)\b)/dgv,
      end: /(?=[\;\=\{])/dgv,
      patterns: [
        {
          begin: /\b(fn|macro)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.declaration.function.c3" }
          },
          end: /(?=\()/dgv,
          name: "meta.function.c3",
          patterns: [
            { include: "#comments" },
            { include: "#function_header" }
          ]
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.group.begin.c3" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.group.end.c3" }
          },
          name: "meta.function.parameters.c3",
          patterns: [
            { include: "#parameters" }
          ]
        },
        {
          begin: /(?<=\))/dgv,
          contentName: "meta.function.c3",
          end: /(?=[\;\=\{])/dgv,
          patterns: [
            { include: "#comments" },
            { include: "#generic_params" },
            { include: "#attribute" }
          ]
        }
      ]
    },
    function_call: {
      begin: /([\#\@]?\b_*[a-z][0-9A-Z_a-z]*)\b(?=\p{space}*(\{[^\n]*\})?\p{space}*\()/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.c3" }
      },
      end: /(?<=\))/dgv,
      name: "meta.function_call.c3",
      patterns: [
        { include: "#generic_args" },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.group.begin.c3" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.group.end.c3" }
          },
          name: "meta.group.c3",
          patterns: [
            { include: "#comments" },
            {
              begin: /([\#\$]?\b_*[a-z][0-9A-Z_a-z]*|\$\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*)\b\p{space}*(:)(?!:)/dgv,
              beginCaptures: {
                "1": { name: "variable.parameter.c3" },
                "2": { name: "punctuation.separator.c3" }
              },
              end: /(?=\))|([\,\;])/dgv,
              endCaptures: {
                "1": { name: "punctuation.separator.c3" }
              },
              patterns: [
                { include: "#expression" }
              ]
            },
            {
              begin: /(?=\P{space})/dgv,
              end: /(?=\))|([\,\;])/dgv,
              endCaptures: {
                "1": { name: "punctuation.separator.c3" }
              },
              patterns: [
                { include: "#expression" }
              ]
            },
            {
              match: /;/dgv,
              name: "punctuation.separator.c3"
            }
          ]
        }
      ]
    },
    function_header: {
      patterns: [
        { include: "#type" },
        {
          match: /\./dgv,
          name: "punctuation.accessor.c3"
        },
        {
          match: /@?\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
          name: "entity.name.function.c3"
        }
      ]
    },
    generic_args: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.generic.begin.c3" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.generic.end.c3" }
          },
          name: "meta.generic.c3",
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    generic_params: {
      patterns: [
        {
          begin: /</dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.generic.begin.c3" }
          },
          end: />/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.generic.end.c3" }
          },
          name: "meta.generic.c3",
          patterns: [
            { include: "#comments" },
            {
              match: /\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "support.type.c3"
            },
            {
              match: /\b_*[A-Z][0-9A-Z_]*\b/dgv,
              name: "variable.other.constant.c3"
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.c3"
            }
          ]
        }
      ]
    },
    integer_literal: {
      match: /\b(?:0[Xx]\p{AHex}(?:_?\p{AHex})*|0[Oo][0-7](_?[0-7])*|0[Bb][01](_?[01])*|[0-9](?:_?[0-9])*)(?:[IUiu](?:8|16|32|64|128)|[Uu][Ll]{0,2}|[Ll]{1,2})?/dgv,
      name: "constant.numeric.integer.c3"
    },
    keywords: {
      patterns: [
        {
          match: /\$(?:alignof|assert|assignable|default|defined|echo|embed|eval|error|exec|expand|extnameof|feature|include|reflect|is_const|kindof|nameof|offsetof|qnameof|sizeof|stringify|vacount|vaconst|vaarg|vaexpr|vasplat)\b/dgv,
          name: "keyword.other.ct.c3"
        },
        {
          match: /\$(?:case|else|endfor|endforeach|endif|endswitch|for|foreach|if|switch)\b/dgv,
          name: "keyword.control.ct.c3"
        },
        {
          match: /\b(?:assert|asm|catch|inline|import|module|interface|try|var)\b/dgv,
          name: "keyword.other.c3"
        },
        {
          match: /\b(?:break|case|continue|default|defer|do|else|for|foreach|foreach_r|if|nextcase|return|switch|while)\b/dgv,
          name: "keyword.control.c3"
        }
      ]
    },
    leftover_at_ident: {
      patterns: [
        {
          captures: {
            "0": { name: "keyword.annotation.c3" }
          },
          match: /@(?:pure|inline|noinline)/dgv,
          name: "meta.annotation.c3"
        },
        {
          begin: /@\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
          beginCaptures: {
            "0": { name: "entity.name.function.c3" }
          },
          end: /(?=[^\t \{])|(?<=\})/dgv,
          patterns: [
            { include: "#generic_args" }
          ]
        }
      ]
    },
    line_comment: {
      match: /\/\/[^\n]*(?=\n?$)/dgv,
      name: "comment.line.double-slash.c3"
    },
    literals: {
      patterns: [
        { include: "#string_literal" },
        { include: "#char_literal" },
        { include: "#raw_string_literal" },
        { include: "#real_literal" },
        { include: "#integer_literal" },
        { include: "#bytes_literal" }
      ]
    },
    modifier_keywords: {
      patterns: [
        {
          match: /\b(?:const|extern|static|tlocal|inline)\b/dgv,
          name: "storage.modifier.c3"
        }
      ]
    },
    module_path: {
      patterns: [
        { include: "#path" },
        {
          captures: {
            "1": { name: "entity.name.scope-resolution.c3" }
          },
          match: /\b(_*[a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.path.c3"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /=>/dgv,
          name: "keyword.declaration.function.arrow.c3"
        },
        {
          match: /(?:[\-\%\&\*\+\/\^\|]|>>|<<|\+\+\+)=/dgv,
          name: "keyword.operator.assignment.augmented.c3"
        },
        {
          match: /<=|>=|==|[\<\>]|!=/dgv,
          name: "keyword.operator.comparison.c3"
        },
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.variadic.c3"
        },
        {
          match: /\.\./dgv,
          name: "keyword.operator.range.c3"
        },
        {
          match: /\+\+\+?|--/dgv,
          name: "keyword.operator.arithmetic.c3"
        },
        {
          match: /<<|>>|&&&?|\|\|\|?/dgv,
          name: "keyword.operator.arithmetic.c3"
        },
        {
          match: /[\-\%\+\/\^\|\~]/dgv,
          name: "keyword.operator.arithmetic.c3"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.c3"
        },
        {
          match: /\?\?\??|\?:|[\!\&\*\:\?]/dgv,
          name: "keyword.operator.c3"
        }
      ]
    },
    parameters: {
      patterns: [
        { include: "#comments" },
        {
          begin: /\$\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*\b/dgv,
          beginCaptures: {
            "0": { name: "support.type.c3" }
          },
          end: /(?=[\)\,\;])/dgv,
          patterns: [
            { include: "#comments" },
            { include: "#attribute" },
            {
              begin: /=/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.assignment.c3" }
              },
              end: /(?=[\)\,\;])/dgv,
              patterns: [
                { include: "#expression" }
              ]
            }
          ]
        },
        { include: "#type" },
        { include: "#punctuation" },
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.variadic.c3"
        },
        {
          match: /&/dgv,
          name: "keyword.operator.address.c3"
        },
        {
          begin: /;/dgv,
          beginCaptures: {
            "0": { name: "punctuation.separator.c3" }
          },
          end: /(?=\))/dgv,
          patterns: [
            { include: "#comments" },
            {
              match: /@\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "entity.name.function.c3"
            },
            { include: "#parameters" }
          ]
        },
        {
          begin: /[\#\$]?\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
          beginCaptures: {
            "0": { name: "variable.parameter.c3" }
          },
          end: /(?=[\)\,\;])/dgv,
          patterns: [
            { include: "#comments" },
            { include: "#attribute" },
            {
              match: /\.\.\./dgv,
              name: "keyword.operator.variadic.c3"
            },
            {
              begin: /=/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.assignment.c3" }
              },
              end: /(?=[\)\,\;])/dgv,
              patterns: [
                { include: "#expression" }
              ]
            }
          ]
        }
      ]
    },
    parens: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.group.begin.c3" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.group.end.c3" }
          },
          name: "meta.group.c3",
          patterns: [
            { include: "#expression" }
          ]
        }
      ]
    },
    path: {
      captures: {
        "1": { name: "entity.name.scope-resolution.c3" },
        "2": { name: "punctuation.separator.scope-resolution.c3" }
      },
      match: /\b(_*[a-z][0-9A-Z_a-z]*)\b\p{space}*(::)/dgv,
      name: "meta.path.c3"
    },
    punctuation: {
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.separator.c3"
        },
        {
          match: /:/dgv,
          name: "punctuation.separator.c3"
        },
        {
          match: /\.(?!\.\.)/dgv,
          name: "punctuation.accessor.c3"
        }
      ]
    },
    raw_string_literal: {
      begin: /`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.c3" }
      },
      end: /`(?!`)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.c3" }
      },
      name: "string.quoted.other.c3",
      patterns: [
        {
          match: /``/dgv,
          name: "constant.character.escape.c3"
        }
      ]
    },
    real_literal: {
      patterns: [
        {
          match: /\b[0-9](?:_?[0-9])*(?:[Ff](?:16|32|64|128)?|[Dd])/dgv,
          name: "constant.numeric.float.c3"
        },
        {
          match: /\b(?:[0-9](?:_?[0-9])*[Ee][\-\+]?[0-9]+|[0-9](?:_?[0-9])*\.(?!\.)(?:[0-9](?:_?[0-9])*)?(?:[Ee][\-\+]?[0-9]+)?)(?:[Ff](?:16|32|64|128)?|[Dd])?/dgv,
          name: "constant.numeric.float.c3"
        },
        {
          match: /\b0[Xx]\p{AHex}(?:_?\p{AHex})*(?:\.(?:\p{AHex}(?:_?\p{AHex})*)?)?[Pp][\-\+]?[0-9]+(?:[Ff](?:16|32|64|128)?|[Dd])?/dgv,
          name: "constant.numeric.float.c3"
        }
      ]
    },
    statements: {
      patterns: [
        { include: "#comments" },
        { include: "#modifier_keywords" },
        {
          match: /;/dgv,
          name: "punctuation.terminator.c3"
        },
        { include: "#control_statements" },
        { include: "#attribute" },
        { include: "#block" },
        { include: "#expression" }
      ]
    },
    string_literal: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.c3" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.c3" }
      },
      name: "string.quoted.double.c3",
      patterns: [
        { include: "#escape_sequence" }
      ]
    },
    structlike: {
      begin: /(?=\b(?:((?:|bit)struct)|(union))\b)/dgv,
      end: /(?<=\})/dgv,
      patterns: [
        {
          begin: /\b(?:((?:|bit)struct)|(union))\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.declaration.struct.c3" },
            "2": { name: "keyword.declaration.union.c3" }
          },
          end: /(?=\{)/dgv,
          name: "meta.struct.c3",
          patterns: [
            { include: "#comments" },
            {
              match: /\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "entity.name.type.struct.c3"
            },
            {
              match: /\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "variable.other.member.c3"
            },
            { include: "#generic_params" },
            { include: "#attribute" },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "punctuation.separator.c3" }
              },
              end: /(?=\{)/dgv,
              patterns: [
                { include: "#comments" },
                { include: "#type_no_generics" },
                { include: "#generic_params" },
                { include: "#attribute" }
              ]
            },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.group.begin.c3" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.group.end.c3" }
              },
              name: "meta.group.c3",
              patterns: [
                { include: "#comments" },
                { include: "#path" },
                { include: "#type" },
                { include: "#punctuation" }
              ]
            }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.block.begin.c3" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.c3" }
          },
          name: "meta.struct.body.c3",
          patterns: [
            { include: "#comments" },
            { include: "#structlike" },
            { include: "#modifier_keywords" },
            { include: "#type" },
            {
              match: /\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
              name: "variable.other.member.c3"
            },
            { include: "#attribute" },
            {
              match: /;/dgv,
              name: "punctuation.terminator.c3"
            },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "punctuation.separator.c3" }
              },
              end: /(?=;)/dgv,
              patterns: [
                { include: "#attribute" },
                { include: "#expression" }
              ]
            }
          ]
        }
      ]
    },
    top_level: {
      patterns: [
        { include: "#comments" },
        { include: "#modifier_keywords" },
        {
          begin: /\$(?:assert|include|echo|exec)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.c3" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.c3" }
          },
          patterns: [
            { include: "#comments" },
            { include: "#expression" }
          ]
        },
        {
          begin: /\bmodule\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.declaration.module.c3" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.c3" }
          },
          name: "meta.module.c3",
          patterns: [
            { include: "#comments" },
            { include: "#attribute" },
            { include: "#module_path" },
            { include: "#generic_args" },
            { include: "#generic_params" }
          ]
        },
        {
          begin: /\bimport\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.declaration.import.c3" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.c3" }
          },
          name: "meta.import.c3",
          patterns: [
            { include: "#comments" },
            { include: "#attribute" },
            { include: "#module_path" },
            {
              match: /,/dgv,
              name: "punctuation.separator.c3"
            }
          ]
        },
        { include: "#function" },
        {
          begin: /\balias\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.declaration.alias.c3" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.c3" }
          },
          name: "meta.alias.c3",
          patterns: [
            { include: "#comments" },
            {
              begin: /(?=\b(_*[a-z][0-9A-Z_a-z]*)\b\p{space}*=\p{space}*module)/dgv,
              end: /(?=;)/dgv,
              patterns: [
                {
                  begin: /\b(_*[a-z][0-9A-Z_a-z]*)\b/dgv,
                  end: /(?=;)/dgv,
                  patterns: [
                    { include: "#comments" },
                    { include: "#attribute" },
                    {
                      begin: /=/dgv,
                      beginCaptures: {
                        "0": { name: "keyword.operator.assignment.c3" }
                      },
                      end: /(?=;)/dgv,
                      patterns: [
                        { include: "#comments" },
                        {
                          begin: /module/dgv,
                          beginCaptures: {
                            "0": { name: "keyword.declaration.module.c3" }
                          },
                          end: /(?=;)/dgv,
                          patterns: [
                            { include: "#comments" },
                            { include: "#module_path" }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              begin: /(?:(@\b_*[a-z][0-9A-Z_a-z]*)|\b(_*[a-z][0-9A-Z_a-z]*)|\b(_*[A-Z][0-9A-Z_]*))\b/dgv,
              beginCaptures: {
                "1": { name: "entity.name.function.c3" },
                "2": { name: "variable.global.c3" },
                "3": { name: "variable.other.constant.c3" }
              },
              end: /(?=;)/dgv,
              patterns: [
                { include: "#comments" },
                { include: "#generic_params" },
                { include: "#attribute" },
                { include: "#assign_right_expression" }
              ]
            },
            {
              begin: /\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*\b/dgv,
              beginCaptures: {
                "0": { name: "entity.name.type.c3" }
              },
              end: /(?=;)/dgv,
              patterns: [
                { include: "#comments" },
                { include: "#generic_params" },
                { include: "#attribute" },
                { include: "#assign_right_expression" }
              ]
            }
          ]
        },
        {
          begin: /\btypedef\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.declaration.typedef.c3" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.c3" }
          },
          name: "meta.typedef.c3",
          patterns: [
            { include: "#comments" },
            {
              begin: /\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*\b/dgv,
              beginCaptures: {
                "0": { name: "entity.name.type.c3" }
              },
              end: /(?=;)/dgv,
              patterns: [
                { include: "#comments" },
                { include: "#parens" },
                { include: "#generic_params" },
                { include: "#attribute" },
                { include: "#assign_right_expression" }
              ]
            }
          ]
        },
        {
          begin: /\bfaultdef\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.declaration.faultdef.c3" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.c3" }
          },
          name: "meta.faultdef.c3",
          patterns: [
            { include: "#comments" },
            { include: "#attribute" },
            {
              match: /\b_*[A-Z][0-9A-Z_]*\b/dgv,
              name: "variable.other.constant.c3"
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.c3"
            }
          ]
        },
        {
          begin: /\battrdef\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.declaration.attrdef.c3" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.c3" }
          },
          name: "meta.attrdef.c3",
          patterns: [
            { include: "#comments" },
            {
              begin: /@\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*\b/dgv,
              beginCaptures: {
                "0": { name: "keyword.annotation.c3" }
              },
              end: /(?=;)/dgv,
              patterns: [
                { include: "#comments" },
                { include: "#attribute" },
                {
                  begin: /\(/dgv,
                  beginCaptures: {
                    "0": { name: "punctuation.section.group.begin.c3" }
                  },
                  end: /\)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.group.end.c3" }
                  },
                  name: "meta.group.c3",
                  patterns: [
                    { include: "#parameters" }
                  ]
                },
                {
                  begin: /=/dgv,
                  beginCaptures: {
                    "0": { name: "keyword.operator.assignment.c3" }
                  },
                  end: /(?=;)/dgv,
                  patterns: [
                    { include: "#comments" },
                    { include: "#attribute" },
                    {
                      match: /,/dgv,
                      name: "punctuation.separator.c3"
                    }
                  ]
                }
              ]
            }
          ]
        },
        { include: "#structlike" },
        {
          begin: /(?=\b(?:enum|constdef)\b)/dgv,
          end: /(?<=\})/dgv,
          patterns: [
            {
              begin: /\b(enum)|(constdef)\b/dgv,
              beginCaptures: {
                "1": { name: "keyword.declaration.enum.c3" },
                "2": { name: "keyword.declaration.constdef.c3" }
              },
              end: /(?=\{)/dgv,
              name: "meta.enum.c3",
              patterns: [
                { include: "#comments" },
                {
                  match: /\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*\b/dgv,
                  name: "entity.name.type.enum.c3"
                },
                { include: "#generic_params" },
                { include: "#attribute" },
                {
                  begin: /:/dgv,
                  beginCaptures: {
                    "0": { name: "punctuation.separator.c3" }
                  },
                  end: /(?=\{)/dgv,
                  patterns: [
                    { include: "#comments" },
                    {
                      match: /\b(?:inline|const)\b/dgv,
                      name: "storage.modifier.c3"
                    },
                    { include: "#type_no_generics" },
                    {
                      begin: /\(/dgv,
                      beginCaptures: {
                        "0": { name: "punctuation.section.group.begin.c3" }
                      },
                      contentName: "meta.group.c3",
                      end: /\)/dgv,
                      endCaptures: {
                        "0": { name: "punctuation.section.group.end.c3" }
                      },
                      patterns: [
                        { include: "#comments" },
                        {
                          match: /\binline\b/dgv,
                          name: "storage.modifier.c3"
                        },
                        { include: "#parameters" }
                      ]
                    },
                    { include: "#generic_params" },
                    { include: "#attribute" }
                  ]
                }
              ]
            },
            {
              begin: /\{/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.block.begin.c3" }
              },
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.block.end.c3" }
              },
              name: "meta.enum.body.c3",
              patterns: [
                { include: "#comments" },
                {
                  begin: /=/dgv,
                  beginCaptures: {
                    "0": { name: "keyword.operator.assignment.c3" }
                  },
                  end: /(?=[\,\}])/dgv,
                  patterns: [
                    { include: "#expression" }
                  ]
                },
                { include: "#block" },
                { include: "#attribute" },
                {
                  match: /\b_*[A-Z][0-9A-Z_]*\b/dgv,
                  name: "variable.other.constant.c3"
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.c3"
                }
              ]
            }
          ]
        },
        {
          begin: /(?=\binterface\b)/dgv,
          end: /(?<=\})/dgv,
          patterns: [
            {
              begin: /\binterface\b/dgv,
              beginCaptures: {
                "0": { name: "keyword.declaration.interface.c3" }
              },
              end: /(?=\{)/dgv,
              name: "meta.interface.c3",
              patterns: [
                { include: "#comments" },
                {
                  match: /\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*\b/dgv,
                  name: "entity.name.type.interface.c3"
                },
                { include: "#generic_params" },
                { include: "#attribute" },
                {
                  begin: /:/dgv,
                  beginCaptures: {
                    "0": { name: "punctuation.separator.c3" }
                  },
                  end: /(?=\{)/dgv,
                  patterns: [
                    { include: "#comments" },
                    { include: "#punctuation" },
                    { include: "#type_no_generics" }
                  ]
                }
              ]
            },
            {
              begin: /\{/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.block.begin.c3" }
              },
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.block.end.c3" }
              },
              name: "meta.interface.body.c3",
              patterns: [
                { include: "#comments" },
                {
                  match: /;/dgv,
                  name: "punctuation.terminator.c3"
                },
                { include: "#function" }
              ]
            }
          ]
        }
      ]
    },
    type: {
      patterns: [
        {
          begin: /(?:\b(void|bool|char|double|float|float16|bfloat|int128|ichar|int|iptr|isz|sz|long|short|uint128|uint|ulong|uptr|ushort|usz|float128|any|fault|typeid|untypedlist)|(\$?\b\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*)\b)\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.built-in.primitive.c3" },
            "2": { name: "support.type.c3" }
          },
          end: /(?=\*>|[^\t \*\:\?\[\{]|:(?!:))/dgv,
          patterns: [
            { include: "#comments" },
            { include: "#generic_args" },
            { include: "#type_suffix" },
            { include: "#type_access" }
          ]
        },
        { include: "#type_expr" },
        { include: "#path" }
      ]
    },
    type_access: {
      captures: {
        "1": { name: "punctuation.accessor.c3" },
        "2": { name: "variable.other.constant.c3" }
      },
      match: /(::)\p{space}*\b(_*[a-z][0-9A-Z_a-z]*)\b/dgv
    },
    type_expr: {
      patterns: [
        {
          begin: /\$(?:Typeof|Typefrom|typeof|typefrom|evaltype|vatype)\b/dgv,
          beginCaptures: {
            "0": { name: "support.type.c3" }
          },
          end: /(?=[^\t \(\*\:\?\[]|:(?!:))/dgv,
          patterns: [
            { include: "#parens" },
            { include: "#type_suffix" },
            { include: "#type_access" }
          ]
        }
      ]
    },
    type_no_generics: {
      patterns: [
        { include: "#path" },
        {
          begin: /(?:\b(void|bool|char|double|float|float16|bfloat|int128|ichar|int|iptr|isz|sz|long|short|uint128|uint|ulong|uptr|ushort|usz|float128|any|fault|typeid|untypedlist)|(\$?\b\b_*[A-Z][0-9A-Z_]*[a-z][0-9A-Z_a-z]*)\b)\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.built-in.primitive.c3" },
            "2": { name: "support.type.c3" }
          },
          end: /(?=[^\t \*\?\[])/dgv,
          patterns: [
            { include: "#comments" },
            { include: "#type_suffix" }
          ]
        },
        { include: "#type_expr" }
      ]
    },
    type_suffix: {
      patterns: [
        { include: "#brackets" },
        {
          match: /\*/dgv,
          name: "keyword.operator.address.c3"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.c3"
        }
      ]
    },
    variable: {
      begin: /(?<!#)\$?\b_*[a-z][0-9A-Z_a-z]*\b/dgv,
      beginCaptures: {
        "0": { name: "variable.other.c3" }
      },
      end: /(?=[^\t \{])|(?<=\})/dgv,
      patterns: [
        { include: "#generic_args" }
      ]
    }
  },
  dependencies: []
};
