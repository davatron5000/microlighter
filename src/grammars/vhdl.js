export default {
  name: "vhdl",
  displayName: "VHDL",
  scopeName: "source.vhdl",
  patterns: [
    { include: "#block_processing" },
    { include: "#cleanup" }
  ],
  repository: {
    architecture_pattern: {
      patterns: [
        {
          begin: /\b([Aa][Rr][Cc][Hh][Ii][Tt][Ee][Cc][Tt][Uu][Rr][Ee])\p{space}+(([A-z][0-9A-z]*)|([^\n]+))(?=\p{space})\p{space}+([Oo][Ff])\p{space}+(([A-Za-z][0-9A-Z_a-z]*)|([^\n]+?))(?=\p{space}*[Ii][Ssſ])\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.type.architecture.begin.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "5": { name: "keyword.language.vhdl" },
            "7": { name: "entity.name.type.entity.reference.vhdl" },
            "8": { name: "invalid.illegal.invalid.identifier.vhdl" }
          },
          end: /\b(end)(\p{space}+(architecture))?(\p{space}+((3)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "6": { name: "entity.name.type.architecture.end.vhdl" },
            "7": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          name: "support.block.architecture",
          patterns: [
            { include: "#block_pattern" },
            { include: "#function_definition_pattern" },
            { include: "#procedure_definition_pattern" },
            { include: "#component_pattern" },
            { include: "#if_pattern" },
            { include: "#process_pattern" },
            { include: "#type_pattern" },
            { include: "#record_pattern" },
            { include: "#for_pattern" },
            { include: "#entity_instantiation_pattern" },
            { include: "#component_instantiation_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    attribute_list: {
      patterns: [
        {
          begin: /'\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          patterns: [
            { include: "#parenthetical_list" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    block_pattern: {
      patterns: [
        {
          begin: /^\p{space}*(([A-Za-z][0-9A-Z_a-z]*)\p{space}*(:)\p{space}*)?(\p{space}*[Bb][Ll][Oo][Cc][KKk])/dgv,
          beginCaptures: {
            "2": { name: "meta.block.block.name" },
            "3": { name: "keyword.language.vhdl" },
            "4": { name: "keyword.language.vhdl" }
          },
          end: /(end\p{space}+block)(\p{space}+((2)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "2": { name: "meta.block.block.end" },
            "5": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          name: "meta.block.block",
          patterns: [
            { include: "#control_patterns" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    block_processing: {
      patterns: [
        { include: "#package_pattern" },
        { include: "#package_body_pattern" },
        { include: "#entity_pattern" },
        { include: "#architecture_pattern" }
      ]
    },
    case_pattern: {
      patterns: [
        {
          begin: /^\p{space}*((([A-Za-z][0-9A-Z_a-z]*)|([^\n]+?))\p{space}*:\p{space}*)?\b([Cc][Aa][Ssſ][Ee])\b/dgv,
          beginCaptures: {
            "3": { name: "entity.name.tag.case.begin.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "5": { name: "keyword.language.vhdl" }
          },
          end: /\b(end)\p{space}*(\p{space}+((case)|([^\n]*?)))(\p{space}+((2)|([^\n]*?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "4": { name: "keyword.language.vhdl" },
            "5": { name: "invalid.illegal.case.required.vhdl" },
            "8": { name: "entity.name.tag.case.end.vhdl" },
            "9": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#control_patterns" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    cleanup: {
      patterns: [
        { include: "#comments" },
        { include: "#constants_numeric" },
        { include: "#strings" },
        { include: "#attribute_list" },
        { include: "#syntax_highlighting" }
      ]
    },
    comments: {
      patterns: [
        {
          match: /--[^\n]*(?=\n?$)\n?/dgv,
          name: "comment.line.double-dash.vhdl"
        }
      ]
    },
    component_instantiation_pattern: {
      patterns: [
        {
          begin: /^\p{space}*([A-Za-z][0-9A-Z_a-z]*)\p{space}*(:)\p{space}*([A-Za-z][0-9A-Z_a-z]*)\b(?=\p{space}*((?=\n?$)|generic|port))/dgv,
          beginCaptures: {
            "1": { name: "entity.name.section.component_instantiation.vhdl" },
            "2": { name: "punctuation.vhdl" },
            "3": { name: "entity.name.tag.component.reference.vhdl" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          patterns: [
            { include: "#parenthetical_list" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    component_pattern: {
      patterns: [
        {
          begin: /^\p{space}*\b([Cc][Oo][Mm][Pp][Oo][Nn][Ee][Nn][Tt])\p{space}+(([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*|([^\n]+?))(?=\b(?:[Ii][Ssſ]|[Pp][Oo][Rr][Tt])\b|(?=\n?$)|--)(\b([Ii][Ssſ]\b))?/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.type.component.begin.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "6": { name: "keyword.language.vhdl" }
          },
          end: /\b(end)\p{space}+((component\b)|([^\n]+?))(?=\p{space}*|;)(\p{space}+((3)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "4": { name: "invalid.illegal.component.keyword.required.vhdl" },
            "7": { name: "entity.name.type.component.end.vhdl" },
            "8": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#generic_list_pattern" },
            { include: "#port_list_pattern" },
            { include: "#comments" }
          ]
        }
      ]
    },
    constants_numeric: {
      patterns: [
        {
          match: /\b([\-\+]?[_\p{Nd}]+\.[_\p{Nd}]+([Ee][\-\+]?[_\p{Nd}]+)?)\b/dgv,
          name: "constant.numeric.floating_point.vhdl"
        },
        {
          match: /\b\p{Nd}+#[_\p{AHex}]+#\b/dgv,
          name: "constant.numeric.base_pound_number_pound.vhdl"
        },
        {
          match: /\b[_\p{Nd}]+([Ee][_\p{Nd}]+)?\b/dgv,
          name: "constant.numeric.integer.vhdl"
        },
        {
          match: /[Xx]"[\-HLUWXZ_hluwxz\p{AHex}]+"/dgv,
          name: "constant.numeric.quoted.double.string.hex.vhdl"
        },
        {
          match: /[Oo]"[\-0-7HLUWXZ_hluwxz]+"/dgv,
          name: "constant.numeric.quoted.double.string.octal.vhdl"
        },
        {
          match: /[Bb]?"[\-01HLUWXZ_hluwxz]+"/dgv,
          name: "constant.numeric.quoted.double.string.binary.vhdl"
        },
        {
          captures: {
            "1": { name: "invalid.illegal.quoted.double.string.vhdl" }
          },
          match: /([BOXbox]"[^\n]+?")/dgv,
          name: "constant.numeric.quoted.double.string.illegal.vhdl"
        },
        {
          match: /'[\-01HLUWXZhluwxz]'/dgv,
          name: "constant.numeric.quoted.single.std_logic"
        }
      ]
    },
    control_patterns: {
      patterns: [
        { include: "#case_pattern" },
        { include: "#if_pattern" },
        { include: "#for_pattern" },
        { include: "#while_pattern" },
        { include: "#loop_pattern" }
      ]
    },
    entity_instantiation_pattern: {
      patterns: [
        {
          begin: /^\p{space}*([A-Za-z][0-9A-Z_a-z]*)\p{space}*(:)\p{space}*(([Uu][Ssſ][Ee])\p{space}+)?([Ee][Nn][Tt][Ii][Tt][Yy])\p{space}+((([A-Za-z][0-9A-Z_a-z]*)|([^\n]+?))(\.))?(([A-Za-z][0-9A-Z_a-z]*)|([^\n]+?))(?=\p{space}*(\(|(?=\n?$)|(?:[Pp][Oo][Rr][Tt]|[Gg][Ee][Nn][Ee][Rr][Ii][Cc])))(\p{space}*(\()\p{space}*(([A-Za-z][0-9A-Z_a-z]*)|([^\n]+?))(?=\p{space}*\))\p{space}*(\)))?/dgv,
          beginCaptures: {
            "1": { name: "entity.name.section.entity_instantiation.vhdl" },
            "2": { name: "punctuation.vhdl" },
            "4": { name: "keyword.language.vhdl" },
            "5": { name: "keyword.language.vhdl" },
            "8": { name: "entity.name.tag.library.reference.vhdl" },
            "9": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "10": { name: "punctuation.vhdl" },
            "12": { name: "entity.name.tag.entity.reference.vhdl" },
            "13": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "16": { name: "punctuation.vhdl" },
            "18": { name: "entity.name.tag.architecture.reference.vhdl" },
            "19": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "21": { name: "punctuation.vhdl" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          patterns: [
            { include: "#parenthetical_list" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    entity_pattern: {
      patterns: [
        {
          begin: /^\p{space}*([Ee][Nn][Tt][Ii][Tt][Yy]\b)\p{space}+(([A-Za-z][A-Z_a-z\p{Nd}]*)|([^\n]+?))(?=\p{space})/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.type.entity.begin.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" }
          },
          end: /\b(end\b)(\p{space}+(entity))?(\p{space}+((3)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "6": { name: "entity.name.type.entity.end.vhdl" },
            "7": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#comments" },
            { include: "#generic_list_pattern" },
            { include: "#port_list_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    for_pattern: {
      patterns: [
        {
          begin: /^\p{space}*(([A-Za-z][0-9A-Z_a-z]*)\p{space}*(:)\p{space}*)?(?![Ww][Aa][Ii][Tt]\p{space}*)\b([Ff][Oo][Rr])\b(?!\p{space}*[Aa][Ll][Ll])/dgv,
          beginCaptures: {
            "2": { name: "entity.name.tag.for.generate.begin.vhdl" },
            "3": { name: "punctuation.vhdl" },
            "4": { name: "keyword.language.vhdl" }
          },
          end: /\b(end)\p{space}+(((?:generate|loop))|(\P{space}+))\b(\p{space}+((2)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "4": { name: "invalid.illegal.loop.or.generate.required.vhdl" },
            "7": { name: "entity.name.tag.for.generate.end.vhdl" },
            "8": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#control_patterns" },
            { include: "#entity_instantiation_pattern" },
            { include: "#component_pattern" },
            { include: "#component_instantiation_pattern" },
            { include: "#process_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    function_definition_pattern: {
      patterns: [
        {
          begin: /^\p{space}*((?:[Ii][Mm][Pp][Uu][Rr][Ee])?\p{space}*[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn])\p{space}+(([A-Za-z][A-Z_a-z\p{Nd}]*)|("\P{space}+")|(\\[^\n]+\\)|([^\n]+?))(?=\p{space}*(\(|\b[Rr][Ee][Tt][Uu][Rr][Nn]\b))/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.function.function.begin.vhdl" },
            "4": { name: "entity.name.function.function.begin.vhdl" },
            "5": { name: "entity.name.function.function.begin.vhdl" },
            "6": { name: "invalid.illegal.invalid.identifier.vhdl" }
          },
          end: /^\p{space}*(end)(\p{space}+(function))?(\p{space}+((3|4|5)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "6": { name: "entity.name.function.function.end.vhdl" },
            "7": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#control_patterns" },
            { include: "#parenthetical_list" },
            { include: "#type_pattern" },
            { include: "#record_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    function_prototype_pattern: {
      patterns: [
        {
          begin: /^\p{space}*((?:[Ii][Mm][Pp][Uu][Rr][Ee])?\p{space}*[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn])\p{space}+(([A-Za-z][A-Z_a-z\p{Nd}]*)|("\P{space}+")|(\\[^\n]+\\)|([^\n]+?))(?=\p{space}*(\(|\b[Rr][Ee][Tt][Uu][Rr][Nn]\b))/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.function.function.prototype.vhdl" },
            "4": { name: "entity.name.function.function.prototype.vhdl" },
            "5": { name: "entity.name.function.function.prototype.vhdl" },
            "6": { name: "invalid.illegal.function.name.vhdl" }
          },
          end: /(?<=;)/dgv,
          patterns: [
            {
              begin: /\breturn(?=\p{space}+[^\;]+\p{space}*;)/dgiv,
              beginCaptures: {
                "0": { name: "keyword.language.vhdl" }
              },
              end: /;/dgv,
              endCaptures: {
                "0": { name: "punctuation.terminator.function_prototype.vhdl" }
              },
              patterns: [
                { include: "#parenthetical_list" },
                { include: "#cleanup" }
              ]
            },
            { include: "#parenthetical_list" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    generic_list_pattern: {
      patterns: [
        {
          begin: /\bgeneric\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.language.vhdl" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          patterns: [
            { include: "#parenthetical_list" }
          ]
        }
      ]
    },
    if_pattern: {
      patterns: [
        {
          begin: /(([A-Za-z][0-9A-Z_a-z]*)\p{space}*(:)\p{space}*)?\b([Ii][Ff])\b/dgv,
          beginCaptures: {
            "2": { name: "entity.name.tag.if.generate.begin.vhdl" },
            "3": { name: "punctuation.vhdl" },
            "4": { name: "keyword.language.vhdl" }
          },
          end: /\b(end)\p{space}+((((?:generate|if))|(\P{space}+))\b(\p{space}+((2)|([^\n]+?)))?)?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "4": { name: "keyword.language.vhdl" },
            "5": { name: "invalid.illegal.if.or.generate.required.vhdl" },
            "8": { name: "entity.name.tag.if.generate.end.vhdl" },
            "9": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#control_patterns" },
            { include: "#process_pattern" },
            { include: "#entity_instantiation_pattern" },
            { include: "#component_pattern" },
            { include: "#component_instantiation_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /'(?:active|ascending|base|delayed|driving|driving_value|event|high|image|instance|instance_name|last|last_value|left|leftof|length|low|path|path_name|pos|pred|quiet|range|reverse|reverse_range|right|rightof|simple|simple_name|stable|succ|transaction|val|value)\b/dgiv,
          name: "keyword.attributes.vhdl"
        },
        {
          match: /\b(?:abs|access|after|alias|all|and|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|context|deallocate|disconnect|downto|else|elsif|end|entity|exit|file|for|force|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|mod|nand|new|next|nor|not|null|of|on|open|or|others|out|package|port|postponed|procedure|process|protected|pure|range|record|register|reject|release|rem|report|return|rol|ror|select|severity|shared|signal|sla|sll|sra|srl|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with|xnor|xor)\b/dgiv,
          name: "keyword.language.vhdl"
        },
        {
          match: /\b(?:std|ieee|work|standard|textio|std_logic_1164|std_logic_arith|std_logic_misc|std_logic_signed|std_logic_textio|std_logic_unsigned|numeric_bit|numeric_std|math_complex|math_real|vital_primitives|vital_timing)\b/dgiv,
          name: "standard.library.language.vhdl"
        },
        {
          match: /([\-\+]|<=|=>??|:=|>=|[\&\/\<\>\|]|(\*{1,2}))/dgv,
          name: "keyword.operator.vhdl"
        }
      ]
    },
    loop_pattern: {
      patterns: [
        {
          begin: /^\p{space}*(([A-Za-z][0-9A-Z_a-z]*)\p{space}*(:)\p{space}*)?\b([Ll][Oo][Oo][Pp])\b/dgv,
          beginCaptures: {
            "2": { name: "entity.name.tag.loop.begin.vhdl" },
            "3": { name: "punctuation.vhdl" },
            "4": { name: "keyword.language.vhdl" }
          },
          end: /\b(end)\p{space}+((loop)|(\P{space}+))\b(\p{space}+((2)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "4": { name: "invalid.illegal.loop.keyword.required.vhdl" },
            "7": { name: "entity.name.tag.loop.end.vhdl" },
            "8": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#control_patterns" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    package_body_pattern: {
      patterns: [
        {
          begin: /\b([Pp][Aa][Cc][KKk][Aa][Gg][Ee])\p{space}+([Bb][Oo][Dd][Yy])\p{space}+(([A-Za-z][A-Z_a-z\p{Nd}]*)|([^\n]+?))\p{space}+([Ii][Ssſ])\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "2": { name: "keyword.language.vhdl" },
            "4": { name: "entity.name.section.package_body.begin.vhdl" },
            "5": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "6": { name: "keyword.language.vhdl" }
          },
          end: /\b(end\b)(\p{space}+(package)\p{space}+(body))?(\p{space}+((4)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "4": { name: "keyword.language.vhdl" },
            "7": { name: "entity.name.section.package_body.end.vhdl" },
            "8": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#protected_body_pattern" },
            { include: "#function_definition_pattern" },
            { include: "#procedure_definition_pattern" },
            { include: "#type_pattern" },
            { include: "#subtype_pattern" },
            { include: "#record_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    package_pattern: {
      patterns: [
        {
          begin: /\b([Pp][Aa][Cc][KKk][Aa][Gg][Ee])\p{space}+(?![Bb][Oo][Dd][Yy])(([A-Za-z][A-Z_a-z\p{Nd}]*)|([^\n]+?))\p{space}+([Ii][Ssſ])\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.section.package.begin.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "5": { name: "keyword.language.vhdl" }
          },
          end: /\b(end\b)(\p{space}+(package))?(\p{space}+((2)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "6": { name: "entity.name.section.package.end.vhdl" },
            "7": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#protected_pattern" },
            { include: "#function_prototype_pattern" },
            { include: "#procedure_prototype_pattern" },
            { include: "#type_pattern" },
            { include: "#subtype_pattern" },
            { include: "#record_pattern" },
            { include: "#component_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    parenthetical_list: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          end: /(?<=\))/dgv,
          patterns: [
            {
              begin: /(?=["'0-9A-Za-z])/dgv,
              end: /([\)\,\;])/dgv,
              endCaptures: {
                "0": { name: "punctuation.vhdl" }
              },
              name: "source.vhdl",
              patterns: [
                { include: "#comments" },
                { include: "#parenthetical_pair" },
                { include: "#cleanup" }
              ]
            },
            {
              match: /\)/dgv,
              name: "invalid.illegal.unexpected.parenthesis.vhdl"
            },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    parenthetical_pair: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          patterns: [
            { include: "#parenthetical_pair" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    port_list_pattern: {
      patterns: [
        {
          begin: /\bport\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.language.vhdl" }
          },
          end: /(?<=\))\p{space}*;/dgv,
          endCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          patterns: [
            { include: "#parenthetical_list" }
          ]
        }
      ]
    },
    procedure_definition_pattern: {
      patterns: [
        {
          begin: /^\p{space}*([Pp][Rr][Oo][Cc][Ee][Dd][Uu][Rr][Ee])\p{space}+(([A-Za-z][A-Z_a-z\p{Nd}]*)|("\P{space}+")|([^\n]+?))(?=\p{space}*(\(|[Ii][Ssſ]))/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.function.procedure.begin.vhdl" },
            "4": { name: "entity.name.function.procedure.begin.vhdl" },
            "5": { name: "invalid.illegal.invalid.identifier.vhdl" }
          },
          end: /^\p{space}*(end)(\p{space}+(procedure))?(\p{space}+((3|4)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "6": { name: "entity.name.function.procedure.end.vhdl" },
            "7": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#parenthetical_list" },
            { include: "#control_patterns" },
            { include: "#type_pattern" },
            { include: "#record_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    procedure_prototype_pattern: {
      patterns: [
        {
          begin: /\b([Pp][Rr][Oo][Cc][Ee][Dd][Uu][Rr][Ee])\p{space}+(([A-Za-z][0-9A-Z_a-z]*)|([^\n]+?))(?=\p{space}*([\(\;]))/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.function.procedure.begin.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctual.vhdl" }
          },
          patterns: [
            { include: "#parenthetical_list" }
          ]
        }
      ]
    },
    process_pattern: {
      patterns: [
        {
          begin: /^\p{space}*(([A-Za-z][0-9A-Z_a-z]*)\p{space}*(:)\p{space}*)?((?:postponed\p{space}+)?[Pp][Rr][Oo][Cc][Ee][Ssſ][Ssſ]\b)/dgv,
          beginCaptures: {
            "2": { name: "entity.name.section.process.begin.vhdl" },
            "3": { name: "punctuation.vhdl" },
            "4": { name: "keyword.language.vhdl" }
          },
          end: /([Ee][Nn][Dd])(\p{space}+((?:postponed\p{space}+)?[Pp][Rr][Oo][Cc][Ee][Ssſ][Ssſ]))(\p{space}+((2)|([^\n]+?)))?(?=\p{space}*;)/dgv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "6": { name: "entity.name.section.process.end.vhdl" },
            "7": { name: "invalid.illegal.invalid.identifier.vhdl" }
          },
          patterns: [
            { include: "#control_patterns" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    protected_body_pattern: {
      patterns: [
        {
          begin: /\b([Tt][Yy][Pp][Ee])\p{space}+(([A-Za-z][A-Z_a-z\p{Nd}]*)|([^\n]+?))\p{space}+\b([Ii][Ssſ]\p{space}+[Pp][Rr][Oo][Tt][Ee][Cc][Tt][Ee][Dd]\p{space}+[Bb][Oo][Dd][Yy])\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.section.protected_body.begin.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "5": { name: "keyword.language.vhdl" }
          },
          end: /\b(end\p{space}+protected\p{space}+body)(\p{space}+((3)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "4": { name: "entity.name.section.protected_body.end.vhdl" },
            "5": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#function_definition_pattern" },
            { include: "#procedure_definition_pattern" },
            { include: "#type_pattern" },
            { include: "#subtype_pattern" },
            { include: "#record_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    protected_pattern: {
      patterns: [
        {
          begin: /\b([Tt][Yy][Pp][Ee])\p{space}+(([A-Za-z][A-Z_a-z\p{Nd}]*)|([^\n]+?))\p{space}+\b([Ii][Ssſ]\p{space}+[Pp][Rr][Oo][Tt][Ee][Cc][Tt][Ee][Dd])\p{space}+(?![Bb][Oo][Dd][Yy])/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdls" },
            "3": { name: "entity.name.section.protected.begin.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "5": { name: "keyword.language.vhdl" }
          },
          end: /\b(end\p{space}+protected)(\p{space}+((3)|([^\n]+?)))?(?!body)(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "4": { name: "entity.name.section.protected.end.vhdl" },
            "5": { name: "invalid.illegal.mismatched.identifier.vhdl" }
          },
          patterns: [
            { include: "#function_prototype_pattern" },
            { include: "#procedure_prototype_pattern" },
            { include: "#type_pattern" },
            { include: "#subtype_pattern" },
            { include: "#record_pattern" },
            { include: "#component_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    punctuation: {
      patterns: [
        {
          match: /([\(\)\,\.\:\;])/dgv,
          name: "punctuation.vhdl"
        }
      ]
    },
    record_pattern: {
      patterns: [
        {
          begin: /\brecord\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.language.vhdl" }
          },
          end: /\b([Ee][Nn][Dd])\p{space}+([Rr][Ee][Cc][Oo][Rr][Dd])(\p{space}+(([A-Za-z][A-Z_a-z\p{Nd}]*)|([^\n]*?)))?(?=\p{space}*;)/dgv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "2": { name: "keyword.language.vhdl" },
            "5": { name: "entity.name.type.record.vhdl" },
            "6": { name: "invalid.illegal.invalid.identifier.vhdl" }
          },
          patterns: [
            { include: "#cleanup" }
          ]
        },
        { include: "#cleanup" }
      ]
    },
    strings: {
      patterns: [
        {
          match: /'[^\n]'/dgv,
          name: "string.quoted.single.vhdl"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.vhdl",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.vhdl"
            }
          ]
        },
        {
          begin: /\\/dgv,
          end: /\\/dgv,
          name: "string.other.backslash.vhdl"
        }
      ]
    },
    subtype_pattern: {
      patterns: [
        {
          begin: /\b([Ssſ][Uu][Bb][Tt][Yy][Pp][Ee])\p{space}+(([A-Za-z][0-9A-Z_a-z]*)|([^\n]+?))\p{space}+([Ii][Ssſ])\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.type.subtype.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "5": { name: "keyword.language.vhdl" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          patterns: [
            { include: "#cleanup" }
          ]
        }
      ]
    },
    support_constants: {
      patterns: [
        {
          match: /\bmath_(?:1_over_e|1_over_pi|1_over_sqrt_2|2_pi|3_pi_over_2|deg_to_rad|e|log10_of_e|log2_of_e|log_of_10|log_of_2|pi|pi_over_2|pi_over_3|pi_over_4|rad_to_deg|sqrt_2|sqrt_pi)\b/dgiv,
          name: "support.constant.ieee.math_real.vhdl"
        },
        {
          match: /\b(?:math_cbase_1|math_cbase_j|math_czero|positive_real|principal_value)\b/dgiv,
          name: "support.constant.ieee.math_complex.vhdl"
        },
        {
          match: /\b(?:true|false)\b/dgiv,
          name: "support.constant.std.standard.vhdl"
        }
      ]
    },
    support_functions: {
      patterns: [
        {
          match: /\b(?:finish|stop|resolution_limit)\b/dgiv,
          name: "support.function.std.env.vhdl"
        },
        {
          match: /\b(?:readline|read|writeline|write|endfile|endline)\b/dgiv,
          name: "support.function.std.textio.vhdl"
        },
        {
          match: /\b(?:rising_edge|falling_edge|to_bit|to_bitvector|to_stdulogic|to_stdlogicvector|to_stdulogicvector|is_x)\b/dgiv,
          name: "support.function.ieee.std_logic_1164.vhdl"
        },
        {
          match: /\b(?:shift_left|shift_right|rotate_left|rotate_right|resize|to_integer|to_unsigned|to_signed)\b/dgiv,
          name: "support.function.ieee.numeric_std.vhdl"
        },
        {
          match: /\b(?:arccos(h?)|arcsin(h?)|arctanh??|cbrt|ceil|cosh??|exp|floor|log10|log2?|realmax|realmin|round|sign|sinh??|sqrt|tanh??|trunc)\b/dgiv,
          name: "support.function.ieee.math_real.vhdl"
        },
        {
          match: /\b(?:arg|cmplx|complex_to_polar|conj|get_principal_value|polar_to_complex)\b/dgiv,
          name: "support.function.ieee.math_complex.vhdl"
        }
      ]
    },
    support_types: {
      patterns: [
        {
          match: /\b(?:boolean|bit|character|severity_level|integer|real|time|delay_length|now|natural|positive|string|bit_vector|file_open_kind|file_open_status|fs|ps|ns|us|ms|sec|min|hr|severity_level|note|warning|error|failure)\b/dgiv,
          name: "support.type.std.standard.vhdl"
        },
        {
          match: /\b(?:line|text|side|width|input|output)\b/dgiv,
          name: "support.type.std.textio.vhdl"
        },
        {
          match: /\bstd_u??logic(?:|_vector)\b/dgiv,
          name: "support.type.ieee.std_logic_1164.vhdl"
        },
        {
          match: /\b(?:|un)signed\b/dgiv,
          name: "support.type.ieee.numeric_std.vhdl"
        },
        {
          match: /\bcomplex(?:|_polar)\b/dgiv,
          name: "support.type.ieee.math_complex.vhdl"
        }
      ]
    },
    syntax_highlighting: {
      patterns: [
        { include: "#keywords" },
        { include: "#punctuation" },
        { include: "#support_constants" },
        { include: "#support_types" },
        { include: "#support_functions" }
      ]
    },
    type_pattern: {
      patterns: [
        {
          begin: /\b([Tt][Yy][Pp][Ee])\p{space}+(([A-Za-z][0-9A-Z_a-z]*)|([^\n]+?))((?=\p{space}*;)|(\p{space}+([Ii][Ssſ])))\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "entity.name.type.type.vhdl" },
            "4": { name: "invalid.illegal.invalid.identifier.vhdl" },
            "7": { name: "keyword.language.vhdl" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.vhdl" }
          },
          patterns: [
            { include: "#record_pattern" },
            { include: "#cleanup" }
          ]
        }
      ]
    },
    while_pattern: {
      patterns: [
        {
          begin: /^\p{space}*(([A-Za-z][0-9A-Z_a-z]*)\p{space}*(:)\p{space}*)?\b([Ww][Hh][Ii][Ll][Ee])\b/dgv,
          beginCaptures: {
            "2": { name: "" },
            "3": { name: "punctuation.vhdl" },
            "4": { name: "keyword.language.vhdl" }
          },
          end: /\b(end)\p{space}+((loop)|(\P{space}+))\b(\p{space}+((2)|([^\n]+?)))?(?=\p{space}*;)/dgiv,
          endCaptures: {
            "1": { name: "keyword.language.vhdl" },
            "3": { name: "keyword.language.vhdl" },
            "4": { name: "invalid.illegal.loop.keyword.required.vhdl" },
            "7": { name: "entity.name.tag.while.loop.vhdl" },
            "8": { name: "invalid.illegal.mismatched.identifier" }
          },
          patterns: [
            { include: "#control_patterns" },
            { include: "#cleanup" }
          ]
        }
      ]
    }
  },
  dependencies: []
};
