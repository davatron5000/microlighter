import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "verilog",
  displayName: "Verilog",
  scopeName: "source.verilog",
  patterns: [
    { include: "#comments" },
    { include: "#module_pattern" },
    { include: "#keywords" },
    { include: "#constants" },
    { include: "#strings" },
    { include: "#operators" },
    { include: "#identifiers" }
  ],
  repository: {
    comments: {
      patterns: [
        {
          begin: /(^[\t ]+)?(?=\/\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.verilog" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /\/\//dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.verilog" }
              },
              end: /\n/dgv,
              name: "comment.line.double-slash.verilog"
            }
          ]
        },
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.c-style.verilog"
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /`(?!(celldefine|endcelldefine|default_nettype|define|undef|ifdef|ifndef|else|endif|include|resetall|timescale|unconnected_drive|nounconnected_drive))[A-Z_a-z][\$0-9A-Z_a-z]*/dgv,
          name: "variable.other.constant.verilog"
        },
        {
          match: /[0-9]*'[BDHObdho][XZ_xz\p{AHex}]+\b/dgv,
          name: "constant.numeric.sized_integer.verilog"
        },
        {
          captures: {
            "1": { name: "constant.numeric.integer.verilog" },
            "2": { name: "punctuation.separator.range.verilog" },
            "3": { name: "constant.numeric.integer.verilog" }
          },
          match: /\b(\p{Nd}+)(:)(\p{Nd}+)\b/dgv,
          name: "meta.block.numeric.range.verilog"
        },
        {
          match: /\b\p{Nd}[_\p{Nd}]*(?:e\p{Nd}+)?\b/dgiv,
          name: "constant.numeric.integer.verilog"
        },
        {
          match: /\b\p{Nd}+\.\p{Nd}+(?:e\p{Nd}+)?\b/dgiv,
          name: "constant.numeric.real.verilog"
        },
        {
          match: /#\p{Nd}+/dgv,
          name: "constant.numeric.delay.verilog"
        },
        {
          match: /\b[01XZxz]+\b/dgv,
          name: "constant.numeric.logic.verilog"
        }
      ]
    },
    identifiers: {
      patterns: [
        {
          match: /(?<![\$0-9A-Z_a-z])[A-Z_a-z][\$0-9A-Z_a-z]*(?![\$0-9A-Z_a-z])/dgv,
          name: "variable.other.identifier.verilog"
        }
      ]
    },
    instantiation_patterns: {
      patterns: [
        { include: "#keywords" },
        {
          begin: /^\p{space}*(?!always|and|assign|output|input|inout|wire|module)([A-Z_a-z][\$0-9A-Z_a-z]*)\p{space}+([A-Z_a-z][\$0-9A-Z_a-z]*)(?<!begin|if)\p{space}*(?=\(|(?=\n?$))/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.module.reference.verilog" },
            "2": { name: "entity.name.tag.module.identifier.verilog" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.expression.verilog" }
          },
          name: "meta.block.instantiation.parameterless.verilog",
          patterns: [
            { include: "#comments" },
            { include: "#constants" },
            { include: "#strings" },
            { include: "#identifiers" }
          ]
        },
        {
          begin: /^\p{space}*([A-Z_a-z][\$0-9A-Z_a-z]*)\p{space}*(#)(?=\p{space}*\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.module.reference.verilog" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.expression.verilog" }
          },
          name: "meta.block.instantiation.with.parameters.verilog",
          patterns: [
            { include: "#parenthetical_list" },
            {
              match: /[A-Z_a-z][\$0-9A-Z_a-z]*/dgv,
              name: "entity.name.tag.module.identifier.verilog"
            }
          ]
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(always|and|assign|attribute|begin|buf|bufif0|bufif1|case[xz]?|cmos|deassign|default|defparam|disable|edge|else|end(attribute|case|function|generate|module|primitive|specify|table|task)?|event|for|force|forever|fork|function|generate|genvar|highz(01)|if(none)?|initial|inout|input|integer|join|localparam|medium|module|large|macromodule|nand|negedge|nmos|nor|not|notif(01)|or|output|parameter|pmos|posedge|primitive|pull0|pull1|pulldown|pullup|rcmos|real|realtime|reg|release|repeat|rnmos|rpmos|rtran|rtranif(01)|scalared|signed|small|specify|specparam|strength|strong0|strong1|supply0|supply1|table|task|time|tran|tranif(01)|tri(01)?|tri(and|or|reg)|unsigned|vectored|wait|wand|weak(01)|while|wire|wor|xnor|xor)\b/dgv,
          name: "keyword.other.verilog"
        },
        {
          match: /^\p{space}*`((cell)?define|default_(decay_time|nettype|trireg_strength)|delay_mode_(path|unit|zero)|ifdef|ifndef|include|end(if|celldefine)|else|(no)?unconnected_drive|resetall|timescale|undef)\b/dgv,
          name: "keyword.other.compiler.directive.verilog"
        },
        {
          match: /(?<![\$0-9A-Z_a-z])\$(f(open|close)|readmem([bh])|timeformat|printtimescale|stop|finish|(s|real)?time|realtobits|bitstoreal|rtoi|itor|(f)?(display|write([bh])))(?![\$0-9A-Z_a-z])/dgv,
          name: "support.function.system.console.tasks.verilog"
        },
        {
          match: /(?<![\$0-9A-Z_a-z])\$(random|dist_(chi_square|erlang|exponential|normal|poisson|t|uniform))(?![\$0-9A-Z_a-z])/dgv,
          name: "support.function.system.random_number.tasks.verilog"
        },
        {
          match: /(?<![\$0-9A-Z_a-z])\$((a)?sync\$((n)?and|(n)or)\$(array|plane))(?![\$0-9A-Z_a-z])/dgv,
          name: "support.function.system.pld_modeling.tasks.verilog"
        },
        {
          match: /(?<![\$0-9A-Z_a-z])\$(q_(initialize|add|remove|full|exam))(?![\$0-9A-Z_a-z])/dgv,
          name: "support.function.system.stochastic.tasks.verilog"
        },
        {
          match: /(?<![\$0-9A-Z_a-z])\$(hold|nochange|period|recovery|setup(hold)?|skew|width)(?![\$0-9A-Z_a-z])/dgv,
          name: "support.function.system.timing.tasks.verilog"
        },
        {
          match: /(?<![\$0-9A-Z_a-z])\$(dump(file|vars|off|on|all|limit|flush))(?![\$0-9A-Z_a-z])/dgv,
          name: "support.function.system.vcd.tasks.verilog"
        },
        {
          match: /(?<![\$0-9A-Z_a-z])\$(countdrivers|list|input|scope|showscopes|(no)?(key|log)|reset(_(?:count|value))?|(inc)?save|restart|showvars|getpattern|sreadmem([bh])|scale)(?![\$0-9A-Z_a-z])/dgv,
          name: "support.function.non-standard.tasks.verilog"
        }
      ]
    },
    module_pattern: {
      patterns: [
        {
          begin: /\b(module)\p{space}+([A-Z_a-z][\$0-9A-Z_a-z]*)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.module.verilog" },
            "2": { name: "entity.name.type.module.verilog" }
          },
          end: /\bendmodule\b/dgv,
          endCaptures: {
            "0": { name: "storage.type.module.verilog" }
          },
          name: "meta.block.module.verilog",
          patterns: [
            { include: "#comments" },
            { include: "#keywords" },
            { include: "#constants" },
            { include: "#strings" },
            { include: "#instantiation_patterns" },
            { include: "#operators" },
            { include: "#identifiers" }
          ]
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /[\-\%\*\+\/]|([\<\>])=?|([\!\=])?==?|!|&&?|\|\|?|\^?~|~\^?/dgv,
          name: "keyword.operator.verilog"
        }
      ]
    },
    parenthetical_list: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.list.verilog" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.list.verilog" }
          },
          name: "meta.block.parenthetical_list.verilog",
          patterns: [
            { include: "#parenthetical_list" },
            { include: "#comments" },
            { include: "#keywords" },
            { include: "#constants" },
            { include: "#strings" },
            { include: "#identifiers" }
          ]
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.verilog",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.verilog"
            }
          ]
        }
      ]
    }
  },
  dependencies: []
};
