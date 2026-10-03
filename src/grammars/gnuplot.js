export default {
  name: "gnuplot",
  displayName: "Gnuplot",
  scopeName: "source.gnuplot",
  patterns: [
    {
      match: /(\\(?!\n)[^\n]*)/dgv,
      name: "invalid.illegal.backslash.gnuplot"
    },
    {
      match: /(;)/dgv,
      name: "punctuation.separator.statement.gnuplot"
    },
    { include: "#LineComment" },
    { include: "#DataBlock" },
    { include: "#MacroExpansion" },
    { include: "#VariableDecl" },
    { include: "#ArrayDecl" },
    { include: "#FunctionDecl" },
    { include: "#ShellCommand" },
    { include: "#Command" }
  ],
  repository: {
    ArrayDecl: {
      begin: /\b(array)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?/dgv,
      beginCaptures: {
        "1": { name: "support.type.array.gnuplot" },
        "2": {
          name: "entity.name.variable.gnuplot",
          patterns: [
            { include: "#InvalidVariableDecl" },
            { include: "#BuiltinVariable" }
          ]
        }
      },
      end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
      name: "meta.variable.gnuplot",
      patterns: [
        { include: "#Expression" }
      ]
    },
    BuiltinFunction: {
      patterns: [
        {
          match: /\bdefined\b/dgv,
          name: "invalid.deprecated.function.gnuplot"
        },
        {
          match: /\b(?:abs|acosh??|airy|arg|asinh??|atan2??|atanh|EllipticK|EllipticE|EllipticPi|besj0|besj1|besy0|besy1|ceil|cosh??|erfc??|exp|expint|floor|gamma|ibeta|inverf|igamma|imag|invnorm|int|lambertw|lgamma|log|log10|norm|rand|real|sgn|sinh??|sqrt|tanh??|voigt|cerf|cdawson|faddeeva|erfi|VP)\b/dgv,
          name: "support.function.math.gnuplot"
        },
        {
          match: /\b(?:gprintf|sprintf|strlen|strstrt|substr|strftime|strptime|system|words??)\b/dgv,
          name: "support.function.string.gnuplot"
        },
        {
          match: /\b(?:column|columnhead|exists|hsv2rgb|stringcolumn|timecolumn|tm_hour|tm_mday|tm_min|tm_mon|tm_sec|tm_wday|tm_yday|tm_year|time|valid|value)\b/dgv,
          name: "support.function.other.gnuplot"
        }
      ]
    },
    BuiltinOperator: {
      patterns: [
        {
          match: /(&&|\|\|)/dgv,
          name: "keyword.operator.logical.gnuplot"
        },
        {
          match: /(<<|>>|[\&\^\|])/dgv,
          name: "keyword.operator.bitwise.gnuplot"
        },
        {
          match: /(==|!=|<=?|>=?)/dgv,
          name: "keyword.operator.comparison.gnuplot"
        },
        {
          match: /(=)/dgv,
          name: "keyword.operator.assignment.gnuplot"
        },
        {
          match: /([\-\!\+\~])/dgv,
          name: "keyword.operator.arithmetic.gnuplot"
        },
        {
          match: /(\*\*|[\-\%\*\+\/])/dgv,
          name: "keyword.operator.arithmetic.gnuplot"
        },
        {
          captures: {
            "2": { name: "keyword.operator.word.gnuplot" }
          },
          match: /(\.|\b(eq|ne)\b)/dgv,
          name: "keyword.operator.strings.gnuplot"
        }
      ]
    },
    BuiltinVariable: {
      patterns: [
        {
          match: /\bFIT_(?:LIMIT|MAXITER|START_LAMBDA|LAMBDA_FACTOR|SKIP|INDEX)\b/dgv,
          name: "invalid.deprecated.variable.gnuplot"
        },
        {
          match: /\b(GPVAL_[\p{L}\p{M}\p{N}\p{Pc}]*|MOUSE_[\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
          name: "support.constant.gnuplot"
        },
        {
          match: /\b(ARG[0-9C]|GPFUN_[\p{L}\p{M}\p{N}\p{Pc}]*|FIT_[\p{L}\p{M}\p{N}\p{Pc}]*|STATS_[\p{L}\p{M}\p{N}\p{Pc}]*|pi|NaN)\b/dgv,
          name: "support.variable.gnuplot"
        }
      ]
    },
    ColumnIndexLiteral: {
      match: /(\$[0-9]+)\b/dgv,
      name: "support.constant.columnindex.gnuplot"
    },
    Command: {
      patterns: [
        {
          begin: /\bupdate\b/dgv,
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          name: "invalid.deprecated.command.gnuplot"
        },
        {
          begin: /\b(?:break|clear|continue|pwd|refresh|replot|reread|shell)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.command.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#InvalidWord" }
          ]
        },
        {
          begin: /\b(?:cd|call|eval|exit|help|history|load|lower|pause|print|printerr|quit|raise|save|stats|system|test|toggle)\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.other.command.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#Expression" }
          ]
        },
        {
          begin: /\b(import)\p{space}([^\n]+)\p{space}(from)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.import.gnuplot" },
            "2": {
              patterns: [
                { include: "#FunctionDecl" }
              ]
            },
            "3": { name: "keyword.control.import.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#SingleQuotedStringLiteral" },
            { include: "#DoubleQuotedStringLiteral" },
            { include: "#InvalidWord" }
          ]
        },
        {
          begin: /\b(reset)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.command.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            {
              match: /\b(bind|error(state)?|session)\b/dgv,
              name: "support.class.reset.gnuplot"
            },
            { include: "#InvalidWord" }
          ]
        },
        {
          begin: /\b(undefine)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.command.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#BuiltinVariable" },
            { include: "#BuiltinFunction" },
            {
              match: /(?<=\p{space})(\$?[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*\*?)(?=\p{space})/dgv,
              name: "source.gnuplot"
            },
            { include: "#InvalidWord" }
          ]
        },
        {
          begin: /\b(if|while)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.conditional.gnuplot" }
          },
          end: /(?=([\#\{]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#Expression" }
          ]
        },
        {
          begin: /\b(else)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.conditional.gnuplot" }
          },
          end: /(?=([\#\{]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv
        },
        {
          begin: /\b(do)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.flow.gnuplot" }
          },
          end: /(?=([\#\{]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#ForIterationExpr" }
          ]
        },
        {
          begin: /\b(set)(?=\p{space}+pm3d)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.command.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            {
              match: /\b(hidden3d|map|transparent|solid)\b/dgv,
              name: "invalid.deprecated.options.gnuplot"
            },
            { include: "#SetUnsetOptions" },
            { include: "#ForIterationExpr" },
            { include: "#Expression" }
          ]
        },
        {
          begin: /\b((un)?set)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.command.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#SetUnsetOptions" },
            { include: "#ForIterationExpr" },
            { include: "#Expression" }
          ]
        },
        {
          begin: /\b(show)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.command.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#ExtraShowOptions" },
            { include: "#SetUnsetOptions" },
            { include: "#Expression" }
          ]
        },
        {
          begin: /\b(fit|(s)?plot)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.command.gnuplot" }
          },
          end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
          patterns: [
            { include: "#ColumnIndexLiteral" },
            { include: "#PlotModifiers" },
            { include: "#ForIterationExpr" },
            { include: "#Expression" }
          ]
        }
      ]
    },
    DataBlock: {
      begin: /(\$[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(<<)\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?=(#|(?=\n?$)))/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#SpecialVariable" }
          ]
        },
        "3": { name: "constant.language.datablock.gnuplot" }
      },
      end: /^(3)\b([^\n]*)/dgv,
      endCaptures: {
        "1": { name: "constant.language.datablock.gnuplot" },
        "2": { name: "invalid.illegal.datablock.gnuplot" }
      },
      name: "meta.datablock.gnuplot",
      patterns: [
        { include: "#LineComment" },
        { include: "#NumberLiteral" },
        { include: "#DoubleQuotedStringLiteral" }
      ]
    },
    DeprecatedScriptArgsLiteral: {
      match: /(\$[\#0-9])/dgv,
      name: "invalid.illegal.scriptargs.gnuplot"
    },
    DoubleQuotedStringLiteral: {
      begin: /(")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.gnuplot" }
      },
      end: /((")|(?=(?<!\\)\n(?=\n?$)))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.gnuplot" }
      },
      name: "string.quoted.double.gnuplot",
      patterns: [
        { include: "#EscapedChar" },
        { include: "#RGBColorSpec" },
        { include: "#DeprecatedScriptArgsLiteral" },
        { include: "#InterpolatedStringLiteral" }
      ]
    },
    EscapedChar: {
      match: /(\\[^\n])/dgv,
      name: "constant.character.escape.gnuplot"
    },
    Expression: {
      patterns: [
        { include: "#Literal" },
        { include: "#SpecialVariable" },
        { include: "#BuiltinVariable" },
        { include: "#BuiltinOperator" },
        { include: "#TernaryExpr" },
        { include: "#FunctionCallExpr" },
        { include: "#SummationExpr" }
      ]
    },
    ExtraShowOptions: {
      match: /\b(?:all|bind|colornames|functions|plot|variables|version)\b/dgv,
      name: "support.class.options.gnuplot"
    },
    ForIterationExpr: {
      begin: /\b(for)\p{space}*(\[)\p{space}*(?:([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+(in)\b)?/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.flow.gnuplot" },
        "2": {
          patterns: [
            { include: "#RangeSeparators" }
          ]
        },
        "3": { name: "variable.other.iterator.gnuplot" },
        "4": { name: "keyword.control.flow.gnuplot" }
      },
      end: /((\])|(?=(#|\\(?!\n)|(?<!\\)\n(?=\n?$))))/dgv,
      endCaptures: {
        "2": {
          patterns: [
            { include: "#RangeSeparators" }
          ]
        }
      },
      patterns: [
        { include: "#Expression" },
        { include: "#RangeSeparators" }
      ]
    },
    FunctionCallExpr: {
      begin: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\()/dgv,
      beginCaptures: {
        "1": {
          name: "variable.function.gnuplot",
          patterns: [
            { include: "#BuiltinFunction" }
          ]
        },
        "2": { name: "punctuation.definition.arguments.begin.gnuplot" }
      },
      end: /((\))|(?=(#|\\(?!\n)|(?<!\\)\n(?=\n?$))))/dgv,
      endCaptures: {
        "2": { name: "punctuation.definition.arguments.end.gnuplot" }
      },
      name: "meta.function-call.gnuplot",
      patterns: [
        { include: "#Expression" }
      ]
    },
    FunctionDecl: {
      begin: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*((\()\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?:(,)\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*)*(\)))/dgv,
      beginCaptures: {
        "1": {
          name: "entity.name.function.gnuplot",
          patterns: [
            { include: "#BuiltinFunction" }
          ]
        },
        "2": { name: "meta.function.parameters.gnuplot" },
        "3": { name: "punctuation.definition.parameters.begin.gnuplot" },
        "4": { name: "variable.parameter.function.language.gnuplot" },
        "5": { name: "punctuation.separator.parameters.gnuplot" },
        "6": { name: "variable.parameter.function.language.gnuplot" },
        "7": { name: "punctuation.definition.parameters.end.gnuplot" }
      },
      end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
      name: "meta.function.gnuplot",
      patterns: [
        { include: "#Expression" }
      ]
    },
    InterpolatedStringLiteral: {
      begin: /(`)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.gnuplot" }
      },
      end: /((`)|(?=(?<!\\)\n(?=\n?$)))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.gnuplot" }
      },
      name: "string.interpolated.gnuplot",
      patterns: [
        { include: "#EscapedChar" }
      ]
    },
    InvalidVariableDecl: {
      match: /\b(GPVAL_[\p{L}\p{M}\p{N}\p{Pc}]*|MOUSE_[\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
      name: "invalid.illegal.variable.gnuplot"
    },
    InvalidWord: {
      match: /([^\#\;\\\p{space}]+)/dgv,
      name: "invalid.illegal.gnuplot"
    },
    LineComment: {
      begin: /(#)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.begin.gnuplot" }
      },
      end: /(?=(?<!\\)\n(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.end.gnuplot" }
      },
      name: "comment.line.number-sign.gnuplot"
    },
    Literal: {
      patterns: [
        { include: "#NumberLiteral" },
        { include: "#DeprecatedScriptArgsLiteral" },
        { include: "#SingleQuotedStringLiteral" },
        { include: "#DoubleQuotedStringLiteral" },
        { include: "#InterpolatedStringLiteral" }
      ]
    },
    MacroExpansion: {
      begin: /(@[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#SpecialVariable" }
          ]
        }
      },
      end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
      patterns: [
        { include: "#Expression" }
      ]
    },
    NumberLiteral: {
      patterns: [
        {
          match: /((\b([0-9]+)|(?<!\p{Nd})))(\.[0-9]+)([Ee][\-\+]?[0-9]+)?(cm|in)?\b/dgv,
          name: "constant.numeric.float.gnuplot"
        },
        {
          match: /\b([0-9]+)((([Ee][\-\+]?[0-9]+))\b|(\.([Ee][\-\+]?[0-9]+\b)?))((?:cm|in)\b)?/dgv,
          name: "constant.numeric.float.gnuplot"
        },
        {
          match: /\b(0[Xx]\p{AHex}+)(cm|in)?\b/dgv,
          name: "constant.numeric.hex.gnuplot"
        },
        {
          match: /\b(0+)(cm|in)?\b/dgv,
          name: "constant.numeric.dec.gnuplot"
        },
        {
          match: /\b(0[0-7]+)(cm|in)?\b/dgv,
          name: "constant.numeric.oct.gnuplot"
        },
        {
          match: /\b(0[0-9]+)(cm|in)?\b/dgv,
          name: "invalid.illegal.oct.gnuplot"
        },
        {
          match: /\b([0-9]+)(cm|in)?\b/dgv,
          name: "constant.numeric.dec.gnuplot"
        }
      ]
    },
    PlotModifiers: {
      patterns: [
        {
          match: /\b(thru)\b/dgv,
          name: "invalid.deprecated.plot.gnuplot"
        },
        {
          match: /\b(?:in(dex)?|every|us(ing)?|wi(th)?|via)\b/dgv,
          name: "storage.type.plot.gnuplot"
        },
        {
          match: /\b(newhist(ogram)?)\b/dgv,
          name: "storage.type.plot.gnuplot"
        }
      ]
    },
    RGBColorSpec: {
      match: {
        G: [/￿(0x|#)((\p{AHex}{6})|(\p{AHex}{8}))\b/dgv, /(0x|#)((\p{AHex}{6})|(\p{AHex}{8}))\b/dgvy]
      },
      name: "constant.other.placeholder.gnuplot"
    },
    RangeSeparators: {
      patterns: [
        {
          match: /(\[)/dgv,
          name: "punctuation.section.brackets.begin.gnuplot"
        },
        {
          match: /(:)/dgv,
          name: "punctuation.separator.range.gnuplot"
        },
        {
          match: /(\])/dgv,
          name: "punctuation.section.brackets.end.gnuplot"
        }
      ]
    },
    SetUnsetOptions: {
      patterns: [
        {
          match: {
            G: [/￿\p{space}*\b(?:clabel|data|function|historysize|macros|ticslevel|ticscale|(style\p{space}+increment\p{space}+[\p{L}\p{M}\p{N}\p{Pc}]+))\b/dgv, /\p{space}*\b(?:clabel|data|function|historysize|macros|ticslevel|ticscale|(style\p{space}+increment\p{space}+[\p{L}\p{M}\p{N}\p{Pc}]+))\b/dgvy]
          },
          name: "invalid.deprecated.options.gnuplot"
        },
        {
          match: {
            G: [/￿\p{space}*\b(?:angles|arrow|autoscale|border|boxwidth|clip|cntr(label|param)|color(box|sequence)?|contour|(dash|line)type|datafile|decimal(sign)?|dgrid3d|dummy|encoding|(error)?bars|fit|fontpath|format|grid|hidden3d|history|(iso)?samples|jitter|key|label|link|loadpath|locale|logscale|mapping|[blrt]margin|margins|micro|minus(sign)?|mono(chrome)?|mouse|multiplot|nonlinear|object|offsets|origin|output|parametric|([pr])axis|pm3d|palette|pointintervalbox|pointsize|polar|print|psdir|size|style|surface|table|terminal|termoption|theta|tics|timestamp|timefmt|title|view|xyplane|zero|(no)?(m)?(x2??|y2??|z|cb|[rt])tics|(x2??|y2??|z|cb)data|(x2??|y2??|z|cb|r)label|(x2??|y2??|z|cb)dtics|(x2??|y2??|z|cb)mtics|(x2??|y2??|z|cb|[rtuv])range|(x2??|y2??|z)?zeroaxis)\b/dgv, /\p{space}*\b(?:angles|arrow|autoscale|border|boxwidth|clip|cntr(label|param)|color(box|sequence)?|contour|(dash|line)type|datafile|decimal(sign)?|dgrid3d|dummy|encoding|(error)?bars|fit|fontpath|format|grid|hidden3d|history|(iso)?samples|jitter|key|label|link|loadpath|locale|logscale|mapping|[blrt]margin|margins|micro|minus(sign)?|mono(chrome)?|mouse|multiplot|nonlinear|object|offsets|origin|output|parametric|([pr])axis|pm3d|palette|pointintervalbox|pointsize|polar|print|psdir|size|style|surface|table|terminal|termoption|theta|tics|timestamp|timefmt|title|view|xyplane|zero|(no)?(m)?(x2??|y2??|z|cb|[rt])tics|(x2??|y2??|z|cb)data|(x2??|y2??|z|cb|r)label|(x2??|y2??|z|cb)dtics|(x2??|y2??|z|cb)mtics|(x2??|y2??|z|cb|[rtuv])range|(x2??|y2??|z)?zeroaxis)\b/dgvy]
          },
          name: "support.class.options.gnuplot"
        }
      ]
    },
    ShellCommand: {
      begin: /(!)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.shell.gnuplot" }
      },
      end: /(?=(#|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
      patterns: [
        {
          match: /([^\#]|\\(?=\n))/dgv,
          name: "string.unquoted"
        }
      ]
    },
    SingleQuotedStringLiteral: {
      begin: /(')/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.gnuplot" }
      },
      end: /((')(?!')|(?=(?<!\\)\n(?=\n?$)))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.gnuplot" }
      },
      name: "string.quoted.single.gnuplot",
      patterns: [
        { include: "#RGBColorSpec" },
        {
          match: /('')/dgv,
          name: "constant.character.escape.gnuplot"
        }
      ]
    },
    SpecialVariable: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.language.wildcard.gnuplot" }
          },
          match: /(?<=[\:\=\[])\p{space}*(\*)\p{space}*(?=[\]\:])/dgv
        },
        {
          captures: {
            "2": { name: "punctuation.definition.variable.gnuplot" }
          },
          match: /(([\$\@])[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
          name: "constant.language.special.gnuplot"
        }
      ]
    },
    SummationExpr: {
      begin: /\b(sum)\p{space}*(\[)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.sum.gnuplot" },
        "2": {
          patterns: [
            { include: "#RangeSeparators" }
          ]
        }
      },
      end: /((\])|(?=(#|\\(?!\n)|(?<!\\)\n(?=\n?$))))/dgv,
      endCaptures: {
        "2": {
          patterns: [
            { include: "#RangeSeparators" }
          ]
        }
      },
      patterns: [
        { include: "#Expression" },
        { include: "#RangeSeparators" }
      ]
    },
    TernaryExpr: {
      begin: /(?<!\?)(\?)(?!\?)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.ternary.gnuplot" }
      },
      end: /((?<!:)(:)(?!:)|(?=(#|\\(?!\n)|(?<!\\)\n(?=\n?$))))/dgv,
      endCaptures: {
        "2": { name: "keyword.operator.ternary.gnuplot" }
      },
      patterns: [
        { include: "#Expression" }
      ]
    },
    VariableDecl: {
      begin: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?:(\[)\p{space}*([^\n]*)\p{space}*(\])\p{space}*)?(?=(=)(?!\p{space}*=))/dgv,
      beginCaptures: {
        "1": {
          name: "entity.name.variable.gnuplot",
          patterns: [
            { include: "#InvalidVariableDecl" },
            { include: "#BuiltinVariable" }
          ]
        },
        "3": {
          patterns: [
            { include: "#Expression" }
          ]
        }
      },
      end: /(?=([\#\;]|\\(?!\n)|(?<!\\)\n(?=\n?$)))/dgv,
      name: "meta.variable.gnuplot",
      patterns: [
        { include: "#Expression" }
      ]
    }
  },
  dependencies: []
};
