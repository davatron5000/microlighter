import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "crystal",
  displayName: "Crystal",
  scopeName: "source.crystal",
  patterns: [
    {
      captures: {
        "1": { name: "keyword.control.class.crystal" },
        "2": { name: "keyword.control.class.crystal" },
        "3": { name: "entity.name.type.class.crystal" },
        "5": { name: "punctuation.separator.crystal" },
        "6": { name: "support.class.other.type-param.crystal" },
        "7": { name: "entity.other.inherited-class.crystal" },
        "8": { name: "punctuation.separator.crystal" },
        "9": { name: "punctuation.separator.crystal" },
        "10": { name: "support.class.other.type-param.crystal" },
        "11": { name: "punctuation.definition.variable.crystal" }
      },
      match: /^\p{space}*(abstract)?\p{space}*(class|struct|union|annotation|enum)\p{space}+(([\.\:A-Z_\x80-\u{10FFFF}][\.\:\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*(\(([\,\.0-\:A-Z_a-z\x80-\u{10FFFF}\p{space}]+)\))?(\p{space}*(<)\p{space}*[\.\:A-Z\x80-\u{10FFFF}][\.\:\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*(\(([\.0-\:A-Z_a-z]+\p{space},)\))?)?)|((<<)\p{space}*[\.0-\:A-Z_\x80-\u{10FFFF}]+))/dgv,
      name: "meta.class.crystal"
    },
    {
      captures: {
        "1": { name: "keyword.control.module.crystal" },
        "2": { name: "entity.name.type.module.crystal" },
        "3": { name: "entity.other.inherited-class.module.first.crystal" },
        "4": { name: "punctuation.separator.inheritance.crystal" },
        "5": { name: "entity.other.inherited-class.module.second.crystal" },
        "6": { name: "punctuation.separator.inheritance.crystal" },
        "7": { name: "entity.other.inherited-class.module.third.crystal" },
        "8": { name: "punctuation.separator.inheritance.crystal" }
      },
      match: /^\p{space}*(module)\p{space}+(([A-Z\x80-\u{10FFFF}][\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*(::))?([A-Z\x80-\u{10FFFF}][\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*(::))?([A-Z\x80-\u{10FFFF}][\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*(::))*[A-Z\x80-\u{10FFFF}][\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      name: "meta.module.crystal"
    },
    {
      captures: {
        "1": { name: "keyword.control.lib.crystal" },
        "2": { name: "entity.name.type.lib.crystal" },
        "3": { name: "entity.other.inherited-class.lib.first.crystal" },
        "4": { name: "punctuation.separator.inheritance.crystal" },
        "5": { name: "entity.other.inherited-class.lib.second.crystal" },
        "6": { name: "punctuation.separator.inheritance.crystal" },
        "7": { name: "entity.other.inherited-class.lib.third.crystal" },
        "8": { name: "punctuation.separator.inheritance.crystal" }
      },
      match: /^\p{space}*(lib)\p{space}+(([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))?([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))?([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))*[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      name: "meta.lib.crystal"
    },
    {
      captures: {
        "1": { name: "keyword.control.lib.type.crystal" },
        "2": { name: "entity.name.lib.type.crystal" },
        "3": { name: "keyword.control.lib.crystal" },
        "4": { name: "entity.name.lib.type.value.crystal" }
      },
      match: /(?<!\.)\b(type)\p{space}+([A-Z][\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)\p{space}*([^\n]+)/dgv,
      name: "meta.lib.type.crystal"
    },
    {
      match: /(?<!\.)\b(fun|begin|case|class|else|elsif|end|ensure|enum|for|if|macro|module|rescue|struct|then|union|unless|until|when|while)\b(?![\!\:\?])/dgv,
      name: "keyword.control.crystal"
    },
    {
      match: /(?<!\.)\b(abstract|alias|asm|break|extend|in|include|next|of|private|protected|struct|return|select|super|with|yield)\b(?![\!\:\?])/dgv,
      name: "keyword.control.primary.crystal"
    },
    {
      match: /(?<!\.)\b(describe|context|it|expect_raises)\b(?![\!\:\?])/dgv,
      name: "keyword.control.crystal"
    },
    {
      match: /(?<!\.)\bdo\b\p{space}*/dgv,
      name: "keyword.control.start-block.crystal"
    },
    {
      match: /(?<=\{)(\p{space}+)/dgv,
      name: "meta.syntax.crystal.start-block"
    },
    {
      match: /(?<!\.)\b(pointerof|typeof|sizeof|instance_sizeof|offsetof|previous_def|forall|out|uninitialized)\b(?![\!\:\?])|\.(is_a\?|nil\?|responds_to\?|as\?|as\x08)/dgv,
      name: "keyword.control.pseudo-method.crystal"
    },
    {
      match: /\bnil\b(?![\!\:\?])/dgv,
      name: "constant.language.nil.crystal"
    },
    {
      match: /\b(true|false)\b(?![\!\:\?])/dgv,
      name: "constant.language.boolean.crystal"
    },
    {
      match: /\b(__(DIR|FILE|LINE|END_LINE)__)\b(?![\!\:\?])/dgv,
      name: "variable.language.crystal"
    },
    {
      match: /\b(self)\b(?![\!\:\?])/dgv,
      name: "variable.language.self.crystal"
    },
    {
      match: /(?<!\.)\b(((class_)?((getter|property)\b[\!\?]?|setter\b))|(def_(clone|equals|equals_and_hash|hash)|delegate|forward_missing_to)\b)(?![\!\:\?])/dgv,
      name: "support.function.kernel.crystal"
    },
    {
      begin: /\b(require)\b/dgv,
      captures: {
        "1": { name: "keyword.other.special-method.crystal" }
      },
      end: /(?=\n?$)|(?=#)/dgv,
      name: "meta.require.crystal",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.crystal" }
      },
      match: /(@)[A-Z_a-z\x80-\u{10FFFF}][\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*[\!\=\?]?/dgv,
      name: "variable.other.readwrite.instance.crystal"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.crystal" }
      },
      match: /(@@)[A-Z_a-z\x80-\u{10FFFF}][\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*[\!\=\?]?/dgv,
      name: "variable.other.readwrite.class.crystal"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.crystal" }
      },
      match: /(\$)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.readwrite.global.crystal"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.crystal" }
      },
      match: /(?!%[Qiqrwx]?[\(\<\[\{\|])%([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.readwrite.fresh.crystal"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.crystal" }
      },
      match: /(\$)([\!\&'\+\@\`]|\p{Nd}+|["\$\*\,\.\/\:-\?\\_\~]|-[0FIadilpv])/dgv,
      name: "variable.other.readwrite.global.pre-defined.crystal"
    },
    {
      begin: /\b(ENV)\[/dgv,
      beginCaptures: {
        "1": { name: "variable.other.constant.crystal" }
      },
      end: /\]/dgv,
      name: "meta.environment-variable.crystal",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      match: /\b[A-Z\x80-\u{10FFFF}][\x80-\u{10FFFF}\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "support.class.crystal"
    },
    {
      match: /(?<!\.)\b(abort|at_exit|caller|exit|gets|loop|main|pp??|printf??|puts|raise|rand|read_line|sleep|spawn|sprintf|system|debugger|record|spawn)\b(?![\!\:\?])/dgv,
      name: "support.function.kernel.crystal"
    },
    {
      match: /\b[A-Z_]+\b/dgv,
      name: "variable.other.constant.crystal"
    },
    {
      begin: new EmulatedRegExp("(?=def\\b)(?<=^|\\p{space})(def)\\p{space}+((?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=(\\.|::))\\4)))\\3)?(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?!>)))\\6)?|\\^|===?|!=|>[\\=\\>]?|<=>|<[\\<\\=]?|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\][\\=\\?]?|\\[\\]=?))\\5))\\p{space}*(\\()", "dgv", { hiddenCaptures: [3, 4, 5, 6] }),
      beginCaptures: {
        "1": { name: "keyword.control.def.crystal" },
        "2": { name: "entity.name.function.crystal" },
        "3": { name: "punctuation.definition.parameters.crystal" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.crystal" }
      },
      name: "meta.function.method.with-arguments.crystal",
      patterns: [
        {
          begin: /(?![\)\,\p{space}])/dgv,
          end: /(?=,|\)\p{space}*)/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "storage.type.variable.crystal" },
                "2": { name: "constant.other.symbol.hashkey.parameter.function.crystal" },
                "3": { name: "punctuation.definition.constant.hashkey.crystal" },
                "4": { name: "variable.parameter.function.crystal" }
              },
              match: {
                G: [/￿([\&\*]?)(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*(:))|([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))/dgv, /([\&\*]?)(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*(:))|([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))/dgvy]
              }
            },
            { include: "$self" }
          ]
        }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.control.def.crystal" },
        "3": { name: "entity.name.function.crystal" }
      },
      match: new EmulatedRegExp("(?=def\\b)(?<=^|\\p{space})(def)\\b(\\p{space}+((?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=(\\.|::))\\5)))\\4)?(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?!>)))\\7)?|\\^|===?|!=|>[\\=\\>]?|<=>|<[\\<\\=]?|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\][\\=\\?]?|\\[\\]=?))\\6)))?", "dgv", { hiddenCaptures: [4, 5, 6, 7] }),
      name: "meta.function.method.without-arguments.crystal"
    },
    {
      match: /\b[0-9][0-9_]*\.[0-9][0-9_]*([Ee][\-\+]?[0-9_]+)?(f(?:32|64))?\b/dgv,
      name: "constant.numeric.float.crystal"
    },
    {
      match: /\b[0-9][0-9_]*(\.[0-9][0-9_]*)?[Ee][\-\+]?[0-9_]+(f(?:32|64))?\b/dgv,
      name: "constant.numeric.float.crystal"
    },
    {
      match: /\b[0-9][0-9_]*(\.[0-9][0-9_]*)?([Ee][\-\+]?[0-9_]+)?(f(?:32|64))\b/dgv,
      name: "constant.numeric.float.crystal"
    },
    {
      match: /\b(?!0[0-9])[0-9][0-9_]*([iu](8|16|32|64|128))?\b/dgv,
      name: "constant.numeric.integer.decimal.crystal"
    },
    {
      match: /\b0x[_\p{AHex}]+([iu](8|16|32|64|128))?\b/dgv,
      name: "constant.numeric.integer.hexadecimal.crystal"
    },
    {
      match: /\b0o[0-7_]+([iu](8|16|32|64|128))?\b/dgv,
      name: "constant.numeric.integer.octal.crystal"
    },
    {
      match: /\b0b[01_]+([iu](8|16|32|64|128))?\b/dgv,
      name: "constant.numeric.integer.binary.crystal"
    },
    {
      begin: /:'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.symbol.begin.crystal" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.symbol.end.crystal" }
      },
      name: "constant.other.symbol.crystal",
      patterns: [
        {
          match: /\\['\\]/dgv,
          name: "constant.character.escape.crystal"
        }
      ]
    },
    {
      begin: /:"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.symbol.begin.crystal" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.symbol.end.crystal" }
      },
      name: "constant.other.symbol.interpolated.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      match: /(?<!\()\/=/dgv,
      name: "keyword.operator.assignment.augmented.crystal"
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.single.crystal",
      patterns: [
        {
          match: /\\['\\]/dgv,
          name: "constant.character.escape.crystal"
        }
      ]
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.double.interpolated.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.interpolated.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /%x\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.interpolated.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_curly_i" }
      ]
    },
    {
      begin: /%x\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.interpolated.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_brackets_i" }
      ]
    },
    {
      begin: /%x</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.interpolated.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_ltgt_i" }
      ]
    },
    {
      begin: /%x\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.interpolated.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_parens_i" }
      ]
    },
    {
      begin: /%x\|/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\|/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.interpolated.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /(?:^|(?<=[\&\(\,\:\;\=\>\?\[\|\~]|[\;\p{space}]if\p{space}|[\;\p{space}]elsif\p{space}|[\;\p{space}]while\p{space}|[\;\p{space}]unless\p{space}|[\;\p{space}]when\p{space}|[\;\p{space}]assert_match\p{space}|[\;\p{space}]or\p{space}|[\;\p{space}]and\p{space}|[\;\p{space}]not\p{space}|[\.\p{space}]index\p{space}|[\.\p{space}]scan\p{space}|[\.\p{space}]sub\p{space}|[\.\p{space}]sub!\p{space}|[\.\p{space}]gsub\p{space}|[\.\p{space}]gsub!\p{space}|[\.\p{space}]match\p{space})|(?<=^(?:when|if|elsif|while|unless)\p{space}))\p{space}*((\/))(?![\*\+\?\{\}])/dgv,
      captures: {
        "1": { name: "string.regexp.classic.crystal" },
        "2": { name: "punctuation.definition.string.crystal" }
      },
      contentName: "string.regexp.classic.crystal",
      end: /((\/[imsx]*))/dgv,
      patterns: [
        { include: "#regex_sub" }
      ]
    },
    {
      begin: /%r\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\}[imsx]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.regexp.mod-r.crystal",
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_curly_r" }
      ]
    },
    {
      begin: /%r\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\][imsx]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.regexp.mod-r.crystal",
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_brackets_r" }
      ]
    },
    {
      begin: /%r\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\)[imsx]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.regexp.mod-r.crystal",
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_parens_r" }
      ]
    },
    {
      begin: /%r</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: />[imsx]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.regexp.mod-r.crystal",
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_ltgt_r" }
      ]
    },
    {
      begin: /%r\|/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\|[imsx]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.regexp.mod-r.crystal",
      patterns: [
        { include: "#regex_sub" }
      ]
    },
    {
      begin: /%Q?\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.upper.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_parens_i" }
      ]
    },
    {
      begin: /%Q?\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.upper.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_brackets_i" }
      ]
    },
    {
      begin: /%Q?</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.upper.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_ltgt_i" }
      ]
    },
    {
      begin: /%Q?\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.double.crystal.mod",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_curly_i" }
      ]
    },
    {
      begin: /%Q\|/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\|/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.upper.crystal",
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /%[iqw]\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.lower.crystal",
      patterns: [
        {
          match: /\\[\)\\]/dgv,
          name: "constant.character.escape.crystal"
        },
        { include: "#nest_parens" }
      ]
    },
    {
      begin: /%[iqw]</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.lower.crystal",
      patterns: [
        {
          match: /\\[\>\\]/dgv,
          name: "constant.character.escape.crystal"
        },
        { include: "#nest_ltgt" }
      ]
    },
    {
      begin: /%[iqw]\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.lower.crystal",
      patterns: [
        {
          match: /\\[\]\\]/dgv,
          name: "constant.character.escape.crystal"
        },
        { include: "#nest_brackets" }
      ]
    },
    {
      begin: /%[iqw]\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.lower.crystal",
      patterns: [
        {
          match: /\\[\\\}]/dgv,
          name: "constant.character.escape.crystal"
        },
        { include: "#nest_curly" }
      ]
    },
    {
      begin: /%[iqw]\|/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\|/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.quoted.other.literal.lower.crystal",
      patterns: [
        {
          match: /\\[^\n]/dgv
        }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.definition.constant.crystal" }
      },
      match: new EmulatedRegExp("(?<!:)(:)(?:(?=([A-Z_a-z\\x80-\\u{10FFFF}][\\x80-\\u{10FFFF}\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?![\\=\\>])))\\3)?|===?|>[\\=\\>]?|<[\\<\\=]?|<=>|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\][\\=\\?]?|@@?[A-Z_a-z\\x80-\\u{10FFFF}][\\x80-\\u{10FFFF}\\p{L}\\p{M}\\p{N}\\p{Pc}]*))\\2)", "dgv", { hiddenCaptures: [2, 3] }),
      name: "constant.other.symbol.crystal"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.constant.crystal" }
      },
      match: new EmulatedRegExp("(?:(?=([A-Z_a-z\\x80-\\u{10FFFF}][\\x80-\\u{10FFFF}\\p{L}\\p{M}\\p{N}\\p{Pc}]*[\\!\\?]?))\\1)(:)(?!:)", "dgv", { hiddenCaptures: [1] }),
      name: "constant.other.symbol.crystal.19syntax"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.comment.crystal" }
      },
      match: /(?:^[\t ]+)?(#)[^\n]*(?=\n?$)\n?/dgv,
      name: "comment.line.number-sign.crystal"
    },
    {
      match: /(?<!\}\})\b_([\p{L}\p{M}\p{N}\p{Pc}]+[\!\?]?)\b(?!\()/dgv,
      name: "comment.unused.crystal"
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)HTML)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.html.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.html.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "text.html.basic" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)SQL)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.sql.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.sql.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "source.sql" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)CSS)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.css.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.css.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "source.css" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)CPP)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.c++.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.cplusplus.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "source.c++" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)C)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.c.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.c.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "source.c" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)J(?:S|AVASCRIPT))\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.js.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.js.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "source.js" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)JQUERY)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.js.jquery.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.js.jquery.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "source.js.jquery" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)SH(?:|ELL))\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.shell.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.shell.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "source.shell" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-('?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)CRYSTAL)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      contentName: "text.crystal.embedded.crystal",
      end: /\p{space}*2\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.embedded.crystal.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "source.crystal" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-'([\\p{L}\\p{M}\\p{N}\\p{Pc}]+)'))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\p{space}*1\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.heredoc.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(<<-([\\p{L}\\p{M}\\p{N}\\p{Pc}]+)\\b))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.crystal" }
      },
      end: /\p{space}*1\b/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.crystal" }
      },
      name: "string.unquoted.heredoc.crystal",
      patterns: [
        { include: "#heredoc" },
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /(?<=\{\p{space}??|[^0-9A-Z_a-z]do|^do|[^0-9A-Z_a-z]do\p{space}|^do\p{space})(\|)/dgv,
      captures: {
        "1": { name: "punctuation.separator.variable.crystal" }
      },
      end: /(?<!\|)(\|)(?!\|)/dgv,
      patterns: [
        { include: "source.crystal" },
        {
          match: /[A-Z_a-z][0-9A-Z_a-z]*/dgv,
          name: "variable.other.block.crystal"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.variable.crystal"
        }
      ]
    },
    {
      match: /=>/dgv,
      name: "punctuation.separator.key-value"
    },
    {
      match: /->/dgv,
      name: "support.function.kernel.crystal"
    },
    {
      match: /<<=|%=|&{1,2}=|\*=|\*\*=|\+=|-=|\^=|\|{1,2}=|<</dgv,
      name: "keyword.operator.assignment.augmented.crystal"
    },
    {
      match: /<=>|<(?![\<\=])|>(?![\<\=\>])|<=|>=|===?|=~|!=|!~|(?<=[\t ])\?/dgv,
      name: "keyword.operator.comparison.crystal"
    },
    {
      match: /(?<=^|[\t ])!|&&|\|\||\^/dgv,
      name: "keyword.operator.logical.crystal"
    },
    {
      match: /(\{%|%\}|\{\{|\}\})/dgv,
      name: "keyword.operator.macro.crystal"
    },
    {
      captures: {
        "1": { name: "punctuation.separator.method.crystal" }
      },
      match: /(&\.)\p{space}*(?![A-Z])/dgv
    },
    {
      match: /([\%\&]|\*\*|[\-\*\+\/])/dgv,
      name: "keyword.operator.arithmetic.crystal"
    },
    {
      match: /=/dgv,
      name: "keyword.operator.assignment.crystal"
    },
    {
      match: /[\|\~]|>>/dgv,
      name: "keyword.operator.other.crystal"
    },
    {
      match: /:/dgv,
      name: "punctuation.separator.other.crystal"
    },
    {
      match: /;/dgv,
      name: "punctuation.separator.statement.crystal"
    },
    {
      match: /,/dgv,
      name: "punctuation.separator.object.crystal"
    },
    {
      match: /\.|::/dgv,
      name: "punctuation.separator.method.crystal"
    },
    {
      match: /[\{\}]/dgv,
      name: "punctuation.section.scope.crystal"
    },
    {
      match: /[\]\[]/dgv,
      name: "punctuation.section.array.crystal"
    },
    {
      match: /[\(\)]/dgv,
      name: "punctuation.section.function.crystal"
    },
    {
      begin: /(?=[\!0-9\?A-Z_a-z]+\()/dgv,
      end: /(?<=\))/dgv,
      name: "meta.function-call.crystal",
      patterns: [
        {
          match: /([\!0-9\?A-Z_a-z]+)(?=\()/dgv,
          name: "entity.name.function.crystal"
        },
        { include: "$self" }
      ]
    },
    {
      match: /((?<=[^\p{L}\p{M}\p{N}\p{Pc}])\b|^)[\p{L}\p{M}\p{N}\p{Pc}]+\b(?=\p{space}*([\]\$\)-\/\=\^\}]|<\p{space}|<<[\.\|\p{space}]))/dgv,
      name: "variable.other.crystal"
    }
  ],
  repository: {
    escaped_char: {
      match: /\\(?:[0-7]{1,3}|x\p{AHex}{2}|u\p{AHex}{4}|u\{[ \p{AHex}]+\}|[^\n])/dgv,
      name: "constant.character.escape.crystal"
    },
    heredoc: {
      begin: /^<<-?[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "$self" }
      ]
    },
    interpolated_crystal: {
      patterns: [
        {
          begin: /#\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.crystal" }
          },
          contentName: "source.crystal",
          end: /(\})/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.crystal" },
            "1": { name: "source.crystal" }
          },
          name: "meta.embedded.line.crystal",
          patterns: [
            { include: "#nest_curly_and_self" },
            { include: "$self" }
          ],
          repository: {
            nest_curly_and_self: {
              patterns: [
                {
                  begin: /\{/dgv,
                  captures: {
                    "0": { name: "punctuation.section.scope.crystal" }
                  },
                  end: /\}/dgv,
                  patterns: [
                    { include: "#nest_curly_and_self" }
                  ]
                },
                { include: "$self" }
              ]
            }
          }
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.crystal" }
          },
          match: /(#@)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.readwrite.instance.crystal"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.crystal" }
          },
          match: /(#@@)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.readwrite.class.crystal"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.crystal" }
          },
          match: /(#\$)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.readwrite.global.crystal"
        }
      ]
    },
    nest_brackets: {
      begin: /\[/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#nest_brackets" }
      ]
    },
    nest_brackets_i: {
      begin: /\[/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_brackets_i" }
      ]
    },
    nest_brackets_r: {
      begin: /\[/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_brackets_r" }
      ]
    },
    nest_curly: {
      begin: /\{/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#nest_curly" }
      ]
    },
    nest_curly_and_self: {
      patterns: [
        {
          begin: /\{/dgv,
          captures: {
            "0": { name: "punctuation.section.scope.crystal" }
          },
          end: /\}/dgv,
          patterns: [
            { include: "#nest_curly_and_self" }
          ]
        },
        { include: "$self" }
      ]
    },
    nest_curly_i: {
      begin: /\{/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_curly_i" }
      ]
    },
    nest_curly_r: {
      begin: /\{/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_curly_r" }
      ]
    },
    nest_ltgt: {
      begin: /</dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: />/dgv,
      patterns: [
        { include: "#nest_ltgt" }
      ]
    },
    nest_ltgt_i: {
      begin: /</dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: />/dgv,
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_ltgt_i" }
      ]
    },
    nest_ltgt_r: {
      begin: /</dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: />/dgv,
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_ltgt_r" }
      ]
    },
    nest_parens: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#nest_parens" }
      ]
    },
    nest_parens_i: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        { include: "#nest_parens_i" }
      ]
    },
    nest_parens_r: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.crystal" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_parens_r" }
      ]
    },
    regex_sub: {
      patterns: [
        { include: "#interpolated_crystal" },
        { include: "#escaped_char" },
        {
          captures: {
            "1": { name: "punctuation.definition.arbitrary-repetition.crystal" },
            "3": { name: "punctuation.definition.arbitrary-repetition.crystal" }
          },
          match: /(\{)\p{Nd}+(,\p{Nd}+)?(\})/dgv,
          name: "string.regexp.arbitrary-repetition.crystal"
        },
        {
          begin: /\[(?:\^?\])?/dgv,
          captures: {
            "0": { name: "punctuation.definition.character-class.crystal" }
          },
          end: /\]/dgv,
          name: "string.regexp.character-class.crystal",
          patterns: [
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /\(/dgv,
          captures: {
            "0": { name: "punctuation.definition.group.crystal" }
          },
          end: /\)/dgv,
          name: "string.regexp.group.crystal",
          patterns: [
            { include: "#regex_sub" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.crystal" }
          },
          match: /(?<=^|\p{space})(#)\p{space}[\-\t \!\,\.0-9\?A-Za-z[^\x00-\x7F]]*(?=\n?$)/dgv,
          name: "comment.line.number-sign.crystal"
        }
      ]
    }
  },
  dependencies: [
    "html",
    "sql",
    "css",
    "c",
    "javascript",
    "shellscript"
  ]
};
