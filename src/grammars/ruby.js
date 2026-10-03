import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "ruby",
  displayName: "Ruby",
  aliases: [
    "rb"
  ],
  scopeName: "source.ruby",
  patterns: [
    {
      captures: {
        "1": { name: "keyword.control.class.ruby" },
        "2": { name: "entity.name.type.class.ruby" },
        "5": { name: "punctuation.separator.namespace.ruby" },
        "7": { name: "punctuation.separator.inheritance.ruby" },
        "8": { name: "entity.other.inherited-class.ruby" },
        "11": { name: "punctuation.separator.namespace.ruby" }
      },
      match: /\b(class)\p{space}+(([0-9A-Z_a-z]+)((::)[0-9A-Z_a-z]+)*)\p{space}*((<)\p{space}*(([0-9A-Z_a-z]+)((::)[0-9A-Z_a-z]+)*))?/dgv,
      name: "meta.class.ruby"
    },
    {
      captures: {
        "1": { name: "keyword.control.module.ruby" },
        "2": { name: "entity.name.type.module.ruby" },
        "5": { name: "punctuation.separator.namespace.ruby" }
      },
      match: /\b(module)\p{space}+(([0-9A-Z_a-z]+)((::)[0-9A-Z_a-z]+)*)/dgv,
      name: "meta.module.ruby"
    },
    {
      captures: {
        "1": { name: "keyword.control.class.ruby" },
        "2": { name: "punctuation.separator.inheritance.ruby" }
      },
      match: /\b(class)\p{space}*(<<)\p{space}*/dgv,
      name: "meta.class.ruby"
    },
    {
      match: /(?<!\.)\belse(\p{space})+if\b/dgv,
      name: "invalid.deprecated.ruby"
    },
    {
      captures: {
        "1": { name: "variable.ruby" },
        "2": { name: "keyword.operator.assignment.augmented.ruby" }
      },
      match: /^\p{space}*([_a-z][0-9A-Z_a-z]*)\p{space}*((&&|\|\|)=)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.control.ruby" },
        "3": { name: "variable.ruby" },
        "4": { name: "keyword.operator.assignment.augmented.ruby" }
      },
      match: /(?<!\.)\b(case|if|elsif|unless|until|while)\b\p{space}*(\()*?\p{space}*([_a-z][0-9A-Z_a-z]*)\p{space}*((&&|\|\|)=)/dgv
    },
    {
      captures: {
        "1": { name: "variable.ruby" },
        "2": { name: "keyword.operator.assignment.augmented.ruby" }
      },
      match: /^\p{space}*([_a-z][0-9A-Z_a-z]*)\p{space}*(([\-\%\*\+\/]|\*\*|[\&\^\|]|<<|>>)=)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.control.ruby" },
        "3": { name: "variable.ruby" },
        "4": { name: "keyword.operator.assignment.augmented.ruby" }
      },
      match: /(?<!\.)\b(case|if|elsif|unless|until|while)\b\p{space}*(\()*?\p{space}*([_a-z][0-9A-Z_a-z]*)\p{space}*(([\-\%\*\+\/]|\*\*|[\&\^\|]|<<|>>)=)/dgv
    },
    {
      captures: {
        "1": { name: "variable.ruby" }
      },
      match: /^\p{space}*([_a-z][0-9A-Z_a-z]*)\p{space}*(?==[^\=\>])/dgv
    },
    {
      captures: {
        "1": { name: "keyword.control.ruby" },
        "3": { name: "variable.ruby" }
      },
      match: /(?<!\.)\b(case|if|elsif|unless|until|while)\b\p{space}*(\()*?\p{space}*([_a-z][0-9A-Z_a-z]*)\p{space}*=[^\=\>]/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.definition.constant.hashkey.ruby" }
      },
      match: new EmulatedRegExp("(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*[\\!\\?]?))\\1)(:)(?!:)", "dgv", { hiddenCaptures: [1] }),
      name: "constant.language.symbol.hashkey.ruby"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.constant.ruby" }
      },
      match: new EmulatedRegExp("(?<!:)(:)(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*[\\!\\?]?))\\2)(?=\\p{space}*=>)", "dgv", { hiddenCaptures: [2] }),
      name: "constant.language.symbol.hashkey.ruby"
    },
    {
      match: /(?<!\.)\b(BEGIN|begin|case|class|else|elsif|END|end|ensure|for|if|in|module|rescue|then|unless|until|when|while)\b(?![\!\?])/dgv,
      name: "keyword.control.ruby"
    },
    {
      match: /(?<!\.)\bdo\b/dgv,
      name: "keyword.control.start-block.ruby"
    },
    {
      match: /(?<=\{)(\p{space}+)/dgv,
      name: "meta.syntax.ruby.start-block"
    },
    {
      match: /(?<!\.)\b(alias|alias_method|break|next|redo|retry|return|super|undef|yield)\b(?![\!\?])|\bdefined\?|\b(block_given|iterator)\?/dgv,
      name: "keyword.control.pseudo-method.ruby"
    },
    {
      match: /\bnil\b(?![\!\?])/dgv,
      name: "constant.language.nil.ruby"
    },
    {
      match: /\b(true|false)\b(?![\!\?])/dgv,
      name: "constant.language.boolean.ruby"
    },
    {
      match: /\b(__(FILE|LINE)__)\b(?![\!\?])/dgv,
      name: "variable.language.ruby"
    },
    {
      match: /\bself\b(?![\!\?])/dgv,
      name: "variable.language.self.ruby"
    },
    {
      match: /\b(initialize|new|loop|include|extend|prepend|raise|fail|attr_reader|attr_writer|attr_accessor|attr|catch|throw|private|private_class_method|module_function|public|public_class_method|protected|refine|using)\b(?![\!\?])/dgv,
      name: "keyword.other.special-method.ruby"
    },
    {
      begin: /\b(?<!\.|::)(require(?:|_relative))\b(?![\!\?])/dgv,
      captures: {
        "1": { name: "keyword.other.special-method.ruby" }
      },
      end: /(?=\n?$)|(?=[\#\}])/dgv,
      name: "meta.require.ruby",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.ruby" }
      },
      match: /(@)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.readwrite.instance.ruby"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.ruby" }
      },
      match: /(@@)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.readwrite.class.ruby"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.ruby" }
      },
      match: /(\$)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.readwrite.global.ruby"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.ruby" }
      },
      match: /(\$)([\!\&'\+\@\`]|\p{Nd}+|["\$\*\,\.\/\:-\?\\_\~]|-[0FIadilpv])/dgv,
      name: "variable.other.readwrite.global.pre-defined.ruby"
    },
    {
      begin: /\b(ENV)\[/dgv,
      beginCaptures: {
        "1": { name: "variable.other.constant.ruby" }
      },
      end: /\]/dgv,
      name: "meta.environment-variable.ruby",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(?=((\.|::)[A-Za-z]|\[))/dgv,
      name: "support.class.ruby"
    },
    {
      match: /\b((abort|at_exit|autoload|binding|callcc|caller|caller_locations|chomp|chop|eval|exec|exit|fork|format|gets|global_variables|gsub|lambda|load|local_variables|open|p|printf??|proc|putc|puts|rand|readlines??|select|set_trace_func|sleep|spawn|sprintf|srand|sub|syscall|system|test|trace_var|trap|untrace_var|warn)\b(?![\!\?])|autoload\?|exit!)/dgv,
      name: "support.function.kernel.ruby"
    },
    {
      match: /\b[A-Z_][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
      name: "variable.other.constant.ruby"
    },
    {
      begin: /(->)\(/dgv,
      beginCaptures: {
        "1": { name: "support.function.kernel.ruby" }
      },
      end: /\)/dgv,
      patterns: [
        {
          begin: /(?=[\&\*A-Z_a-z])/dgv,
          end: /(?=[\)\,])/dgv,
          patterns: [
            { include: "#method_parameters" }
          ]
        },
        { include: "#method_parameters" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=def\\b)(?<=^|\\p{space})(def)\\p{space}+((?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=(\\.|::))\\4)))\\3)?(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?!>)))\\6)?|===?|!=|>[\\=\\>]?|<=>|<[\\<\\=]?|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\]=?))\\5))\\p{space}*(\\()", "dgv", { hiddenCaptures: [3, 4, 5, 6] }),
      beginCaptures: {
        "1": { name: "keyword.control.def.ruby" },
        "2": { name: "entity.name.function.ruby" },
        "3": { name: "punctuation.definition.parameters.ruby" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.ruby" }
      },
      name: "meta.function.method.with-arguments.ruby",
      patterns: [
        {
          begin: /(?=[\&\*A-Z_a-z])/dgv,
          end: /(?=[\)\,])/dgv,
          patterns: [
            { include: "#method_parameters" }
          ]
        },
        { include: "#method_parameters" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=def\\b)(?<=^|\\p{space})(def)\\p{space}+((?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=(\\.|::))\\4)))\\3)?(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?!>)))\\6)?|===?|!=|>[\\=\\>]?|<=>|<[\\<\\=]?|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\]=?))\\5))[\\t ](?=[\\t ]*[^\\#\\;\\p{space}])", "dgv", { hiddenCaptures: [3, 4, 5, 6] }),
      beginCaptures: {
        "1": { name: "keyword.control.def.ruby" },
        "2": { name: "entity.name.function.ruby" }
      },
      end: /(?=;)|(?<=[\]\!"'\)\?\`\}\p{L}\p{M}\p{N}\p{Pc}])(?=\p{space}*#|\p{space}*(?=\n?$))/dgv,
      name: "meta.function.method.with-arguments.ruby",
      patterns: [
        {
          begin: /(?=[\&\*A-Z_a-z])/dgv,
          end: /(?=[\,\;]|\p{space}*#|\p{space}*(?=\n?$))/dgv,
          patterns: [
            { include: "#method_parameters" }
          ]
        },
        { include: "#method_parameters" }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.control.def.ruby" },
        "3": { name: "entity.name.function.ruby" }
      },
      match: new EmulatedRegExp("(?=def\\b)(?<=^|\\p{space})(def)\\b(\\p{space}+((?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=(\\.|::))\\5)))\\4)?(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?!>)))\\7)?|===?|!=|>[\\=\\>]?|<=>|<[\\<\\=]?|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\]=?))\\6)))?", "dgv", { hiddenCaptures: [4, 5, 6, 7] }),
      name: "meta.function.method.without-arguments.ruby"
    },
    {
      match: new EmulatedRegExp("\\b(\\p{Nd}(?:(?=(_?\\p{Nd}))\\2)*(\\.(?![^\\p{space}\\p{Nd}])(?:(?=(_?\\p{Nd}))\\4)*)?([Ee][\\-\\+]?\\p{Nd}(?:(?=(_?\\p{Nd}))\\6)*)?|0(?:[Xx]\\p{AHex}(?:(?=(_?\\p{AHex}))\\7)*|[Oo]?[0-7](?:(?=(_?[0-7]))\\8)*|[Bb][01](?:(?=(_?[01]))\\9)*|[Dd]\\p{Nd}(?:(?=(_?\\p{Nd}))\\10)*))\\b", "dgv", { hiddenCaptures: [2, 4, 6, 7, 8, 9, 10] }),
      name: "constant.numeric.ruby"
    },
    {
      begin: /:'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.symbol.begin.ruby" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.symbol.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\['\\]/dgv,
          name: "constant.character.escape.ruby"
        }
      ]
    },
    {
      begin: /:"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.symbol.begin.ruby" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.symbol.end.ruby" }
      },
      name: "constant.language.symbol.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      match: /(?<!\()\/=/dgv,
      name: "keyword.operator.assignment.augmented.ruby"
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.single.ruby",
      patterns: [
        {
          match: /\\['\\]/dgv,
          name: "constant.character.escape.ruby"
        }
      ]
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.double.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /(?<!\.)`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?<![\\)\\p{L}\\p{M}\\p{N}\\p{Pc}])((/))(?![\\*\\+\\?])(?!\\p{space}*(?=\\n?$))(?=(?:(?=((?:\\\\/|[^\\/])*))\\3)/[eimnosux]*\\p{space}*(?:[\\]\\#\\)\\,\\.\\:\\?\\}]|\\|\\||&&|<=>|=>|==|=~|!~|!=|;|(?=\\n?$)|if|else|elsif|then|do|end|unless|while|until|or|and))", "dgv", { hiddenCaptures: [3] }),
      captures: {
        "1": { name: "string.regexp.interpolated.ruby" },
        "2": { name: "punctuation.section.regexp.ruby" }
      },
      contentName: "string.regexp.interpolated.ruby",
      end: /((\/[eimnosux]*))/dgv,
      patterns: [
        { include: "#regex_sub" }
      ]
    },
    {
      begin: /%r\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.regexp.begin.ruby" }
      },
      end: /\}[eimnosux]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.regexp.end.ruby" }
      },
      name: "string.regexp.interpolated.ruby",
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_curly_r" }
      ]
    },
    {
      begin: /%r\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.regexp.begin.ruby" }
      },
      end: /\][eimnosux]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.regexp.end.ruby" }
      },
      name: "string.regexp.interpolated.ruby",
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_brackets_r" }
      ]
    },
    {
      begin: /%r\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.regexp.begin.ruby" }
      },
      end: /\)[eimnosux]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.regexp.end.ruby" }
      },
      name: "string.regexp.interpolated.ruby",
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_parens_r" }
      ]
    },
    {
      begin: /%r</dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.regexp.begin.ruby" }
      },
      end: />[eimnosux]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.regexp.end.ruby" }
      },
      name: "string.regexp.interpolated.ruby",
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_ltgt_r" }
      ]
    },
    {
      begin: /%r([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.regexp.begin.ruby" }
      },
      end: /1[eimnosux]*/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.regexp.end.ruby" }
      },
      name: "string.regexp.interpolated.ruby",
      patterns: [
        { include: "#regex_sub" }
      ]
    },
    {
      begin: /%I\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_brackets_i" }
      ]
    },
    {
      begin: /%I\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_parens_i" }
      ]
    },
    {
      begin: /%I</dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_ltgt_i" }
      ]
    },
    {
      begin: /%I\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_curly_i" }
      ]
    },
    {
      begin: /%I([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /%i\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[\]\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_brackets" }
      ]
    },
    {
      begin: /%i\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[\)\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_parens" }
      ]
    },
    {
      begin: /%i</dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[\>\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_ltgt" }
      ]
    },
    {
      begin: /%i\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[\\\}]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_curly" }
      ]
    },
    {
      begin: /%i([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[^\n]/dgv
        }
      ]
    },
    {
      begin: /%W\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_brackets_i" }
      ]
    },
    {
      begin: /%W\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_parens_i" }
      ]
    },
    {
      begin: /%W</dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_ltgt_i" }
      ]
    },
    {
      begin: /%W\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_curly_i" }
      ]
    },
    {
      begin: /%W([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /%w\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[\]\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_brackets" }
      ]
    },
    {
      begin: /%w\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[\)\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_parens" }
      ]
    },
    {
      begin: /%w</dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[\>\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_ltgt" }
      ]
    },
    {
      begin: /%w\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[\\\}]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_curly" }
      ]
    },
    {
      begin: /%w([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.array.begin.ruby" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.array.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[^\n]/dgv
        }
      ]
    },
    {
      begin: /%[Qx]?\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_parens_i" }
      ]
    },
    {
      begin: /%[Qx]?\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_brackets_i" }
      ]
    },
    {
      begin: /%[Qx]?\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_curly_i" }
      ]
    },
    {
      begin: /%[Qx]?</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_ltgt_i" }
      ]
    },
    {
      begin: /%[Qx]([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /%([^\=\p{L}\p{M}\p{N}\p{Pc}\p{space}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.interpolated.ruby",
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /%q\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[\)\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_parens" }
      ]
    },
    {
      begin: /%q</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[\>\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_ltgt" }
      ]
    },
    {
      begin: /%q\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[\]\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_brackets" }
      ]
    },
    {
      begin: /%q\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[\\\}]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_curly" }
      ]
    },
    {
      begin: /%q([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.ruby" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.ruby" }
      },
      name: "string.quoted.other.ruby",
      patterns: [
        {
          match: /\\[^\n]/dgv
        }
      ]
    },
    {
      begin: /%s\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.symbol.begin.ruby" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.symbol.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[\)\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_parens" }
      ]
    },
    {
      begin: /%s</dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.symbol.begin.ruby" }
      },
      end: />/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.symbol.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[\>\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_ltgt" }
      ]
    },
    {
      begin: /%s\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.symbol.begin.ruby" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.symbol.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[\]\\]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_brackets" }
      ]
    },
    {
      begin: /%s\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.symbol.begin.ruby" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.symbol.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[\\\}]/dgv,
          name: "constant.character.escape.ruby"
        },
        { include: "#nest_curly" }
      ]
    },
    {
      begin: /%s([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.symbol.begin.ruby" }
      },
      end: /1/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.symbol.end.ruby" }
      },
      name: "constant.language.symbol.ruby",
      patterns: [
        {
          match: /\\[^\n]/dgv
        }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.definition.constant.ruby" }
      },
      match: new EmulatedRegExp("(?<!:)(:)(?:(?=([\\$A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?![\\=\\>])))\\3)?|===?|<=>|>[\\=\\>]?|<[\\<\\=]?|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\]=?|@@?[A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*))\\2)", "dgv", { hiddenCaptures: [2, 3] }),
      name: "constant.language.symbol.ruby"
    },
    {
      begin: /^=begin/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.ruby" }
      },
      end: /^=end/dgv,
      name: "comment.block.documentation.ruby"
    },
    { include: "#yard" },
    {
      begin: /(^[\t ]+)?(?=#)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.ruby" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.ruby" }
          },
          end: /\n/dgv,
          name: "comment.line.number-sign.ruby"
        }
      ]
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])\?(\\(x\p{AHex}{1,2}(?!\p{AHex})\b|0[0-7]{0,2}(?![0-7])\b|[^0CMx])|(\\[CM]-)+[\p{L}\p{M}\p{N}\p{Pc}]|[^\\\p{space}])/dgv,
      name: "constant.numeric.ruby"
    },
    {
      begin: /^__END__\n/dgv,
      captures: {
        "0": { name: "string.unquoted.program-block.ruby" }
      },
      contentName: "text.plain",
      end: /(?=not)impossible/dgv,
      patterns: [
        {
          begin: /(?=<?xml|<[Hh][Tt][Mm][Ll]\b|!DOCTYPE [Hh][Tt][Mm][Ll]\b)/dgv,
          end: /(?=not)impossible/dgv,
          name: "text.html.embedded.ruby",
          patterns: [
            { include: "text.html.basic" }
          ]
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)HTML)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)HTML)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.html",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)HTML)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "text.html",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "text.html.basic" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)HTML)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)HAML)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)HAML)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.haml",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)HAML)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "text.haml",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "text.haml" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)HAML)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)XML)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)XML)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.xml",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)XML)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "text.xml",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "text.xml" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)XML)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)SQL)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)SQL)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.sql",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)SQL)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.sql",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.sql" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)SQL)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)G(?:RAPHQL|QL))\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)G(?:RAPHQL|QL))(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.graphql",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)G(?:RAPHQL|QL))\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.graphql",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.graphql" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)G(?:RAPHQL|QL))\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)CSS)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)CSS)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.css",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)CSS)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.css",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.css" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)CSS)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)CPP)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)CPP)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.cpp",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)CPP)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.cpp",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.cpp" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)CPP)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)C)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)C)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.c",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)C)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.c",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.c" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)C)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)J(?:S|AVASCRIPT))\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)J(?:S|AVASCRIPT))(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.js",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)J(?:S|AVASCRIPT))\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.js",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.js" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)J(?:S|AVASCRIPT))\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)JQUERY)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)JQUERY)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.js.jquery",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)JQUERY)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.js.jquery",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.js.jquery" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)JQUERY)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)SH(?:|ELL))\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)SH(?:|ELL))(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.shell",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)SH(?:|ELL))\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.shell",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.shell" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)SH(?:|ELL))\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)LUA)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)LUA)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.lua",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)LUA)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.lua",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.lua" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)LUA)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)RUBY)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)RUBY)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.ruby",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)RUBY)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.ruby",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.ruby" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)RUBY)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)YA?ML)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)YA?ML)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.yaml",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)YA?ML)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "source.yaml",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "source.yaml" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)YA?ML)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?=(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)SLIM)\\b\\2))\\1))", "dgv", { hiddenCaptures: [1] }),
      end: /^\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)SLIM)(?=\n?$)\n?/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      name: "meta.embedded.block.slim",
      patterns: [
        {
          begin: new EmulatedRegExp("(?:(?=(<<[\\-\\~]?([\"'\\`]?)((?:[_\\p{L}\\p{M}\\p{N}\\p{Pc}]+_|)SLIM)\\b\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "string.definition.begin.ruby" }
          },
          contentName: "text.slim",
          patterns: [
            { include: "#heredoc" },
            { include: "#interpolated_ruby" },
            { include: "text.slim" },
            { include: "#escaped_char" }
          ],
          while: /^(?!\p{space}*((?:[_\p{L}\p{M}\p{N}\p{Pc}]+_|)SLIM)\p{space}*(?=\n?$))/dgv
        }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(=\\p{space}*<<([\"'\\`]?)([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*)\\2))\\1)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "string.definition.begin.ruby" }
      },
      contentName: "string.unquoted.heredoc.ruby",
      end: /^2(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      patterns: [
        { include: "#heredoc" },
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: new EmulatedRegExp("(?:(?=(((<<[\\-\\~]?([\"'\\`]?)([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*)\\4,\\p{space}?)*<<[\\-\\~]?([\"'\\`]?)([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*)\\6)))\\1)([^\\n]*)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "1": { name: "string.definition.begin.ruby" },
        "7": {
          patterns: [
            { include: "source.ruby" }
          ]
        }
      },
      contentName: "string.unquoted.heredoc.ruby",
      end: /^\p{space}*6(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "string.definition.end.ruby" }
      },
      patterns: [
        { include: "#heredoc" },
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" }
      ]
    },
    {
      begin: /(?<=\{|\{\p{space}+|[^\$0-\:\@-Z_a-z]do|^do|[^\$0-\:\@-Z_a-z]do\p{space}+|^do\p{space}+)(\|)/dgv,
      captures: {
        "1": { name: "punctuation.separator.variable.ruby" }
      },
      end: /(?<!\|)(\|)(?!\|)/dgv,
      name: "meta.block.parameters.ruby",
      patterns: [
        {
          begin: /(?![\(\,\|\p{space}])/dgv,
          end: /(?=,|\|\p{space}*)/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "storage.type.variable.ruby" },
                "2": { name: "variable.other.block.ruby" }
              },
              match: {
                G: [/￿((?:&|\*\*?)?)([A-Z_a-z][_\p{L}\p{M}\p{N}\p{Pc}]*)/dgv, /((?:&|\*\*?)?)([A-Z_a-z][_\p{L}\p{M}\p{N}\p{Pc}]*)/dgvy]
              }
            }
          ]
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.variable.ruby"
        }
      ]
    },
    {
      match: /=>/dgv,
      name: "punctuation.separator.key-value"
    },
    {
      match: /->/dgv,
      name: "support.function.kernel.ruby"
    },
    {
      match: /<<=|%=|&{1,2}=|\*=|\*\*=|\+=|-=|\^=|\|{1,2}=|<</dgv,
      name: "keyword.operator.assignment.augmented.ruby"
    },
    {
      match: /<=>|<(?![\<\=])|>(?![\<\=\>])|<=|>=|===?|=~|!=|!~|(?<=[\t ])\?/dgv,
      name: "keyword.operator.comparison.ruby"
    },
    {
      match: /(?<!\.)\b(and|not|or)\b(?![\!\?])/dgv,
      name: "keyword.operator.logical.ruby"
    },
    {
      match: /(?<=^|[\t \!])!|&&|\|\||\^/dgv,
      name: "keyword.operator.logical.ruby"
    },
    {
      captures: {
        "1": { name: "keyword.operator.logical.ruby" }
      },
      match: /(&\.)\p{space}*(?![A-Z])/dgv
    },
    {
      match: /([\%\&]|\*\*|[\-\*\+\/])/dgv,
      name: "keyword.operator.arithmetic.ruby"
    },
    {
      match: /=/dgv,
      name: "keyword.operator.assignment.ruby"
    },
    {
      match: /[\|\~]|>>/dgv,
      name: "keyword.operator.other.ruby"
    },
    {
      match: /;/dgv,
      name: "punctuation.separator.statement.ruby"
    },
    {
      match: /,/dgv,
      name: "punctuation.separator.object.ruby"
    },
    {
      captures: {
        "1": { name: "punctuation.separator.namespace.ruby" }
      },
      match: /(::)\p{space}*(?=[A-Z])/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.separator.method.ruby" }
      },
      match: /(\.|::)\p{space}*(?![A-Z])/dgv
    },
    {
      match: /:/dgv,
      name: "punctuation.separator.other.ruby"
    },
    {
      match: /\{/dgv,
      name: "punctuation.section.scope.begin.ruby"
    },
    {
      match: /\}/dgv,
      name: "punctuation.section.scope.end.ruby"
    },
    {
      match: /\[/dgv,
      name: "punctuation.section.array.begin.ruby"
    },
    {
      match: /\]/dgv,
      name: "punctuation.section.array.end.ruby"
    },
    {
      match: /[\(\)]/dgv,
      name: "punctuation.section.function.ruby"
    },
    {
      begin: /(?<=[^\.]\.|::)(?=[A-Za-z][\!0-9\?A-Z_a-z]*[^\!0-9\?A-Z_a-z])/dgv,
      end: /(?<=[\!0-9\?A-Z_a-z])(?=[^\!0-9\?A-Z_a-z])/dgv,
      name: "meta.function-call.ruby",
      patterns: [
        {
          match: /([A-Za-z][\!0-9\?A-Z_a-z]*)(?=[^\!0-9\?A-Z_a-z])/dgv,
          name: "entity.name.function.ruby"
        }
      ]
    },
    {
      begin: /([A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*[\!\?]?)(\()/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.ruby" },
        "2": { name: "punctuation.section.function.ruby" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.function.ruby" }
      },
      name: "meta.function-call.ruby",
      patterns: [
        { include: "$self" }
      ]
    }
  ],
  repository: {
    escaped_char: {
      match: /\\(?:[0-7]{1,3}|x[A-Fa-f\p{Nd}]{1,2}|[^\n])/dgv,
      name: "constant.character.escape.ruby"
    },
    heredoc: {
      begin: /^<<[\-\~]?[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "$self" }
      ]
    },
    interpolated_ruby: {
      patterns: [
        {
          begin: /#\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.ruby" }
          },
          contentName: "source.ruby",
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.ruby" }
          },
          name: "meta.embedded.line.ruby",
          patterns: [
            { include: "#nest_curly_and_self" },
            { include: "$self" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.ruby" }
          },
          match: /(#@)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.readwrite.instance.ruby"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.ruby" }
          },
          match: /(#@@)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.readwrite.class.ruby"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.ruby" }
          },
          match: /(#\$)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.readwrite.global.ruby"
        }
      ]
    },
    method_parameters: {
      patterns: [
        { include: "#parens" },
        { include: "#braces" },
        { include: "#brackets" },
        { include: "#params" },
        { include: "$self" }
      ],
      repository: {
        braces: {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.scope.begin.ruby" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.scope.end.ruby" }
          },
          patterns: [
            { include: "#parens" },
            { include: "#braces" },
            { include: "#brackets" },
            { include: "$self" }
          ]
        },
        brackets: {
          begin: /\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.array.begin.ruby" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.array.end.ruby" }
          },
          patterns: [
            { include: "#parens" },
            { include: "#braces" },
            { include: "#brackets" },
            { include: "$self" }
          ]
        },
        params: {
          captures: {
            "1": { name: "storage.type.variable.ruby" },
            "2": { name: "constant.other.symbol.hashkey.parameter.function.ruby" },
            "3": { name: "punctuation.definition.constant.ruby" },
            "4": { name: "variable.parameter.function.ruby" }
          },
          match: {
            G: [/￿(&|\*\*?)?(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*[\!\?]?(:))|([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))/dgv, /(&|\*\*?)?(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*[\!\?]?(:))|([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))/dgvy]
          }
        },
        parens: {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.function.begin.ruby" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.ruby" }
          },
          patterns: [
            { include: "#parens" },
            { include: "#braces" },
            { include: "#brackets" },
            { include: "$self" }
          ]
        }
      }
    },
    nest_brackets: {
      begin: /\[/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.ruby" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#nest_brackets" }
      ]
    },
    nest_brackets_i: {
      begin: /\[/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.ruby" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_brackets_i" }
      ]
    },
    nest_brackets_r: {
      begin: /\[/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.ruby" }
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
        "0": { name: "punctuation.section.scope.ruby" }
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
            "0": { name: "punctuation.section.scope.ruby" }
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
        "0": { name: "punctuation.section.scope.ruby" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_curly_i" }
      ]
    },
    nest_curly_r: {
      begin: /\{/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.ruby" }
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
        "0": { name: "punctuation.section.scope.ruby" }
      },
      end: />/dgv,
      patterns: [
        { include: "#nest_ltgt" }
      ]
    },
    nest_ltgt_i: {
      begin: /</dgv,
      captures: {
        "0": { name: "punctuation.section.scope.ruby" }
      },
      end: />/dgv,
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_ltgt_i" }
      ]
    },
    nest_ltgt_r: {
      begin: /</dgv,
      captures: {
        "0": { name: "punctuation.section.scope.ruby" }
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
        "0": { name: "punctuation.section.scope.ruby" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#nest_parens" }
      ]
    },
    nest_parens_i: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.ruby" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        { include: "#nest_parens_i" }
      ]
    },
    nest_parens_r: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.section.scope.ruby" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#regex_sub" },
        { include: "#nest_parens_r" }
      ]
    },
    regex_sub: {
      patterns: [
        { include: "#interpolated_ruby" },
        { include: "#escaped_char" },
        {
          captures: {
            "1": { name: "punctuation.definition.arbitrary-repetition.ruby" },
            "3": { name: "punctuation.definition.arbitrary-repetition.ruby" }
          },
          match: /(\{)\p{Nd}+(,\p{Nd}+)?(\})/dgv,
          name: "string.regexp.arbitrary-repetition.ruby"
        },
        {
          begin: /\[(?:\^?\])?/dgv,
          captures: {
            "0": { name: "punctuation.definition.character-class.ruby" }
          },
          end: /\]/dgv,
          name: "string.regexp.character-class.ruby",
          patterns: [
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /\(\?#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.ruby" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.ruby" }
          },
          name: "comment.line.number-sign.ruby",
          patterns: [
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /\(/dgv,
          captures: {
            "0": { name: "punctuation.definition.group.ruby" }
          },
          end: /\)/dgv,
          name: "string.regexp.group.ruby",
          patterns: [
            { include: "#regex_sub" }
          ]
        },
        {
          begin: /(?<=^|\p{space})(#)\p{space}(?=[\-\t \!\,\.0-9\?A-Za-z[^\x00-\x7F]]*(?=\n?$))/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.ruby" }
          },
          end: /(?=\n?$)\n?/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.ruby" }
          },
          name: "comment.line.number-sign.ruby"
        }
      ]
    },
    yard: {
      patterns: [
        { include: "#yard_comment" },
        { include: "#yard_param_types" },
        { include: "#yard_option" },
        { include: "#yard_tag" },
        { include: "#yard_types" },
        { include: "#yard_directive" },
        { include: "#yard_see" },
        { include: "#yard_macro_attribute" }
      ]
    },
    yard_comment: {
      begin: /^(\p{space}*)(#)(\p{space}*)(@)(abstract|api|author|deprecated|example|macro|note|overload|since|todo|version)(?=\p{space}|(?=\n?$))/dgv,
      beginCaptures: {
        "2": { name: "punctuation.definition.comment.ruby" },
        "4": { name: "comment.line.keyword.punctuation.yard.ruby" },
        "5": { name: "comment.line.keyword.yard.ruby" }
      },
      contentName: "comment.line.string.yard.ruby",
      end: /^(?!\p{space}*#3\p{space}{2,}|\p{space}*#\p{space}*(?=\n?$))/dgv,
      name: "comment.line.number-sign.ruby",
      patterns: [
        { include: "#yard" },
        { include: "#yard_continuation" }
      ]
    },
    yard_continuation: {
      match: /^\p{space}*#/dgv,
      name: "punctuation.definition.comment.ruby"
    },
    yard_directive: {
      begin: /^(\p{space}*)(#)(\p{space}*)(@!)(endgroup|group|method|parse|scope|visibility)(\p{space}+((\[)[^\n]+(\])))?(?=\p{space})/dgv,
      beginCaptures: {
        "2": { name: "punctuation.definition.comment.ruby" },
        "4": { name: "comment.line.keyword.punctuation.yard.ruby" },
        "5": { name: "comment.line.keyword.yard.ruby" },
        "7": { name: "comment.line.type.yard.ruby" },
        "8": { name: "comment.line.punctuation.yard.ruby" },
        "9": { name: "comment.line.punctuation.yard.ruby" }
      },
      contentName: "comment.line.string.yard.ruby",
      end: /^(?!\p{space}*#3\p{space}{2,}|\p{space}*#\p{space}*(?=\n?$))/dgv,
      name: "comment.line.number-sign.ruby",
      patterns: [
        { include: "#yard" },
        { include: "#yard_continuation" }
      ]
    },
    yard_macro_attribute: {
      begin: /^(\p{space}*)(#)(\p{space}*)(@!)(attribute|macro)(\p{space}+((\[)[^\n]+(\])))?(?=\p{space})(\p{space}+([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*:?))?/dgv,
      beginCaptures: {
        "2": { name: "punctuation.definition.comment.ruby" },
        "4": { name: "comment.line.keyword.punctuation.yard.ruby" },
        "5": { name: "comment.line.keyword.yard.ruby" },
        "7": { name: "comment.line.type.yard.ruby" },
        "8": { name: "comment.line.punctuation.yard.ruby" },
        "9": { name: "comment.line.punctuation.yard.ruby" },
        "11": { name: "comment.line.parameter.yard.ruby" }
      },
      contentName: "comment.line.string.yard.ruby",
      end: /^(?!\p{space}*#3\p{space}{2,}|\p{space}*#\p{space}*(?=\n?$))/dgv,
      name: "comment.line.number-sign.ruby",
      patterns: [
        { include: "#yard" },
        { include: "#yard_continuation" }
      ]
    },
    yard_option: {
      begin: new EmulatedRegExp("^(\\p{space}*)(#)(\\p{space}*)(@)(option)(?=\\p{space})(?:(?=(\\p{space}+([_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*:?)))\\6)?(?:(?=(\\p{space}+((\\[)[^\\n]+(\\]))))\\8)?(?:(?=(\\p{space}+((\\P{space}*))))\\12)?(?:(?=(\\p{space}+((\\()[^\\n]+(\\)))))\\15)?", "dgv", { hiddenCaptures: [6, 8, 12, 15] }),
      beginCaptures: {
        "2": { name: "punctuation.definition.comment.ruby" },
        "4": { name: "comment.line.keyword.punctuation.yard.ruby" },
        "5": { name: "comment.line.keyword.yard.ruby" },
        "6": { name: "comment.line.parameter.yard.ruby" },
        "7": { name: "comment.line.type.yard.ruby" },
        "8": { name: "comment.line.punctuation.yard.ruby" },
        "9": { name: "comment.line.punctuation.yard.ruby" },
        "10": { name: "comment.line.keyword.yard.ruby" },
        "11": { name: "comment.line.hashkey.yard.ruby" },
        "12": { name: "comment.line.defaultvalue.yard.ruby" },
        "13": { name: "comment.line.punctuation.yard.ruby" },
        "14": { name: "comment.line.punctuation.yard.ruby" }
      },
      contentName: "comment.line.string.yard.ruby",
      end: /^(?!\p{space}*#3\p{space}{2,}|\p{space}*#\p{space}*(?=\n?$))/dgv,
      name: "comment.line.number-sign.ruby",
      patterns: [
        { include: "#yard" },
        { include: "#yard_continuation" }
      ]
    },
    yard_param_types: {
      begin: new EmulatedRegExp("^(\\p{space}*)(#)(\\p{space}*)(@)(attr|attr_reader|attr_writer|yieldparam|param)(?=\\p{space})(?:(?=(\\p{space}+(?:(?=(([_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*:?)|((\\[)[^\\n]+(\\]))))\\7)))\\6)?(?:(?=(\\p{space}+(?:(?=(((\\[)[^\\n]+(\\]))|([_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*:?)))\\13)))\\12)?", "dgv", { hiddenCaptures: [6, 7, 12, 13] }),
      beginCaptures: {
        "2": { name: "punctuation.definition.comment.ruby" },
        "4": { name: "comment.line.keyword.punctuation.yard.ruby" },
        "5": { name: "comment.line.keyword.yard.ruby" },
        "6": { name: "comment.line.parameter.yard.ruby" },
        "7": { name: "comment.line.type.yard.ruby" },
        "8": { name: "comment.line.punctuation.yard.ruby" },
        "9": { name: "comment.line.punctuation.yard.ruby" },
        "10": { name: "comment.line.type.yard.ruby" },
        "11": { name: "comment.line.punctuation.yard.ruby" },
        "12": { name: "comment.line.punctuation.yard.ruby" },
        "13": { name: "comment.line.parameter.yard.ruby" }
      },
      contentName: "comment.line.string.yard.ruby",
      end: /^(?!\p{space}*#3\p{space}{2,}|\p{space}*#\p{space}*(?=\n?$))/dgv,
      name: "comment.line.number-sign.ruby",
      patterns: [
        { include: "#yard" },
        { include: "#yard_continuation" }
      ]
    },
    yard_see: {
      begin: /^(\p{space}*)(#)(\p{space}*)(@)(see)(?=\p{space})(\p{space}+([^\n]+?))?(?=\p{space}|(?=\n?$))/dgv,
      beginCaptures: {
        "2": { name: "punctuation.definition.comment.ruby" },
        "4": { name: "comment.line.keyword.punctuation.yard.ruby" },
        "5": { name: "comment.line.keyword.yard.ruby" },
        "7": { name: "comment.line.parameter.yard.ruby" }
      },
      contentName: "comment.line.string.yard.ruby",
      end: /^(?!\p{space}*#3\p{space}{2,}|\p{space}*#\p{space}*(?=\n?$))/dgv,
      name: "comment.line.number-sign.ruby",
      patterns: [
        { include: "#yard" },
        { include: "#yard_continuation" }
      ]
    },
    yard_tag: {
      captures: {
        "2": { name: "punctuation.definition.comment.ruby" },
        "4": { name: "comment.line.keyword.punctuation.yard.ruby" },
        "5": { name: "comment.line.keyword.yard.ruby" }
      },
      match: /^(\p{space}*)(#)(\p{space}*)(@)(private)(?=\n?$)/dgv,
      name: "comment.line.number-sign.ruby"
    },
    yard_types: {
      begin: /^(\p{space}*)(#)(\p{space}*)(@)(raise|return|yield(?:return)?)(?=\p{space})(\p{space}+((\[)[^\n]+(\])))?/dgv,
      beginCaptures: {
        "2": { name: "punctuation.definition.comment.ruby" },
        "4": { name: "comment.line.keyword.punctuation.yard.ruby" },
        "5": { name: "comment.line.keyword.yard.ruby" },
        "7": { name: "comment.line.type.yard.ruby" },
        "8": { name: "comment.line.punctuation.yard.ruby" },
        "9": { name: "comment.line.punctuation.yard.ruby" }
      },
      contentName: "comment.line.string.yard.ruby",
      end: /^(?!\p{space}*#3\p{space}{2,}|\p{space}*#\p{space}*(?=\n?$))/dgv,
      name: "comment.line.number-sign.ruby",
      patterns: [
        { include: "#yard" },
        { include: "#yard_continuation" }
      ]
    }
  },
  dependencies: [
    "html",
    "haml",
    "xml",
    "sql",
    "graphql",
    "css",
    "cpp",
    "c",
    "javascript",
    "shellscript",
    "lua",
    "yaml"
  ]
};
