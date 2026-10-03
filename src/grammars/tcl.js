export default {
  name: "tcl",
  displayName: "Tcl",
  scopeName: "source.tcl",
  patterns: [
    {
      begin: /(?<=^|;)\p{space}*((#))/dgv,
      beginCaptures: {
        "1": { name: "comment.line.number-sign.tcl" },
        "2": { name: "punctuation.definition.comment.tcl" }
      },
      contentName: "comment.line.number-sign.tcl",
      end: /\n/dgv,
      patterns: [
        {
          match: /(\\[\n\\])/dgv
        }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.control.tcl" }
      },
      match: /(?<=^|[\;\[\{])\p{space}*(if|while|for|catch|default|return|break|continue|switch|exit|foreach|try|throw)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.control.tcl" }
      },
      match: /(?<=^|\})\p{space}*(then|elseif|else)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.other.tcl" },
        "2": { name: "entity.name.function.tcl" }
      },
      match: /(?<=^|\{)\p{space}*(proc)\p{space}+(\P{space}+)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.other.tcl" }
      },
      match: /(?<=^|[\;\[\{])\p{space}*(after|append|array|auto_execok|auto_import|auto_load|auto_mkindex|auto_mkindex_old|auto_qualify|auto_reset|bgerror|binary|cd|clock|close|concat|dde|encoding|eof|error|eval|exec|expr|fblocked|fconfigure|fcopy|file|fileevent|filename|flush|format|gets|glob|global|history|http|incr|info|interp|join|lappend|library|lindex|linsert|list|llength|load|lrange|lreplace|lsearch|lset|lsort|memory|msgcat|namespace|open|package|parray|pid|pkg::create|pkg_mkIndex|proc|puts|pwd|re_syntax|read|registry|rename|resource|scan|seek|set|socket|SafeBase|source|split|string|subst|Tcl|tcl_endOfWord|tcl_findLibrary|tcl_startOfNextWord|tcl_startOfPreviousWord|tcl_wordBreakAfter|tcl_wordBreakBefore|tcltest|tclvars|tell|time|trace|unknown|unset|update|uplevel|upvar|variable|vwait)\b/dgv
    },
    {
      begin: /(?<=^|[\;\[\{])\p{space}*(reg(?:exp|sub))\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.tcl" }
      },
      end: /[\]\n\;]/dgv,
      patterns: [
        {
          match: /\\(?:[^\n]|\n)/dgv,
          name: "constant.character.escape.tcl"
        },
        {
          match: /-[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*/dgv
        },
        {
          applyEndPatternLast: 1,
          begin: /--\p{space}*/dgv,
          end: /(?:)/dgv,
          patterns: [
            { include: "#regexp" }
          ]
        },
        { include: "#regexp" }
      ]
    },
    { include: "#escape" },
    { include: "#variable" },
    { include: "#operator" },
    { include: "#numeric" },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.tcl" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.tcl" }
      },
      name: "string.quoted.double.tcl",
      patterns: [
        { include: "#escape" },
        { include: "#variable" },
        { include: "#embedded" }
      ]
    }
  ],
  repository: {
    "bare-string": {
      begin: /(?:^|(?<=\p{space}))"/dgv,
      end: /"([^\]\p{space}]*)/dgv,
      endCaptures: {
        "1": { name: "invalid.illegal.tcl" }
      },
      patterns: [
        { include: "#escape" },
        { include: "#variable" }
      ]
    },
    braces: {
      begin: /(?:^|(?<=\p{space}))\{/dgv,
      end: /\}([^\]\p{space}]*)/dgv,
      endCaptures: {
        "1": { name: "invalid.illegal.tcl" }
      },
      patterns: [
        {
          match: /\\[\n\{\}]/dgv,
          name: "constant.character.escape.tcl"
        },
        { include: "#inner-braces" }
      ]
    },
    embedded: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.embedded.begin.tcl" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.end.tcl" }
      },
      name: "source.tcl.embedded",
      patterns: [
        { include: "source.tcl" }
      ]
    },
    escape: {
      match: /\\(\p{Nd}{1,3}|x\p{AHex}+|u\p{AHex}{1,4}|[^\n]|\n)/dgv,
      name: "constant.character.escape.tcl"
    },
    "inner-braces": {
      begin: /\{/dgv,
      end: /\}/dgv,
      patterns: [
        {
          match: /\\[\n\{\}]/dgv,
          name: "constant.character.escape.tcl"
        },
        { include: "#inner-braces" }
      ]
    },
    numeric: {
      match: /(?<![A-Za-z])([\-\+]?([0-9]*\.)?[0-9]+f?)(?![\.A-Za-z])/dgv,
      name: "constant.numeric.tcl"
    },
    operator: {
      match: /(?<=[ \p{Nd}])([\-\+\~]|&{1,2}|\|{1,2}|<{1,2}|>{1,2}|\*{1,2}|[\!\%\/]|<=|>=|={1,2}|!=|\^)(?=[ \p{Nd}])/dgv,
      name: "keyword.operator.tcl"
    },
    regexp: {
      begin: /(?=\P{space})(?![\]\n\;])/dgv,
      end: /(?=[\]\n\;])/dgv,
      patterns: [
        {
          begin: /(?=[^\t\n \;])/dgv,
          end: /(?=[\t\n \;])/dgv,
          name: "string.regexp.tcl",
          patterns: [
            { include: "#braces" },
            { include: "#bare-string" },
            { include: "#escape" },
            { include: "#variable" }
          ]
        },
        {
          begin: /[\t ]/dgv,
          end: /(?=[\]\n\;])/dgv,
          patterns: [
            { include: "#variable" },
            { include: "#embedded" },
            { include: "#escape" },
            { include: "#braces" },
            { include: "#string" }
          ]
        }
      ]
    },
    string: {
      applyEndPatternLast: 1,
      begin: /(?:^|(?<=\p{space}))(?=")/dgv,
      end: /(?:)/dgv,
      name: "string.quoted.double.tcl",
      patterns: [
        { include: "#bare-string" }
      ]
    },
    variable: {
      captures: {
        "1": { name: "punctuation.definition.variable.tcl" }
      },
      match: /(\$)((?:[0-9A-Z_a-z]|::)+(\([^\)]+\))?|\{[^\}]*\})/dgv,
      name: "support.function.tcl"
    }
  },
  dependencies: []
};
