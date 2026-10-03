import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "cobol",
  displayName: "COBOL",
  scopeName: "source.cobol",
  patterns: [
    {
      match: /^([ \*][ \*][ \*][ \*][ \*][ \*])([Dd]\p{space}[^\n]*)(?=\n?$)/dgv,
      name: "token.info-token.cobol"
    },
    {
      captures: {
        "1": { name: "constant.numeric.cobol" },
        "2": { name: "comment.line.cobol.newpage" }
      },
      match: /^([ \*][ \*][ \*][ \*][ \*][ \*])(\/[^\n]*)(?=\n?$)/dgv
    },
    {
      captures: {
        "1": { name: "constant.numeric.cobol" },
        "2": { name: "comment.line.cobol.fixed" }
      },
      match: /^([ \*][ \*][ \*][ \*][ \*][ \*])(\*[^\n]*)(?=\n?$)/dgv
    },
    {
      captures: {
        "1": { name: "constant.numeric.cobol" },
        "2": { name: "comment.line.cobol.newpage" }
      },
      match: /^([0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}])(\/[^\n]*)(?=\n?$)/dgv
    },
    {
      match: /^[0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}](?=\n?$)/dgv,
      name: "constant.numeric.cobol"
    },
    {
      captures: {
        "1": { name: "constant.numeric.cobol" },
        "2": { name: "comment.line.cobol.fixed" }
      },
      match: /^([0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}][0-9\p{space}])(\*[^\n]*)(?=\n?$)/dgv
    },
    {
      captures: {
        "1": { name: "constant.numeric.cobol" },
        "2": { name: "comment.line.cobol.fixed" }
      },
      match: /^([\- \#\$\%\+\.0-9\@-Za-z\p{space}][\- \#\$\%\+\.0-9\@-Za-z\p{space}][\- \#\$\%\+\.0-9\@-Za-z\p{space}][\- \#\$\%\+\.0-9\@-Za-z\p{space}][\- \#\$\%\+\.0-9\@-Za-z\p{space}][\- \#\$\%\+\.0-9\@-Za-z\p{space}])(\*[^\n]*)(?=\n?$)/dgv
    },
    {
      captures: {
        "1": { name: "constant.numeric.cobol" },
        "2": { name: "variable.other.constant" }
      },
      match: /^\p{space}+(78)\p{space}+([0-9A-Za-z][\-0-9A-Z_a-z]+)/dgv
    },
    {
      captures: {
        "1": { name: "constant.numeric.cobol" },
        "2": { name: "variable.other.constant" },
        "3": { name: "keyword.identifers.cobol" }
      },
      match: /^\p{space}+([0-9]+)\p{space}+([0-9A-Za-z][\-0-9A-Z_a-z]+)\p{space}+([Cc][Oo][Nn][Ssſ][Tt][Aa][Nn][Tt])/dgv
    },
    {
      captures: {
        "1": { name: "constant.cobol" },
        "2": { name: "comment.line.cobol.newpage" }
      },
      match: /^([\#\$\%\.0-9\@-Za-z\p{space}][\#\$\%\.0-9\@-Za-z\p{space}][\#\$\%\.0-9\@-Za-z\p{space}][\#\$\%\.0-9\@-Za-z\p{space}][\#\$\%\.0-9\@-Za-z\p{space}][\#\$\%\.0-9\@-Za-z\p{space}])(\/[^\n]*)(?=\n?$)/dgv
    },
    {
      match: /^\*[^\n]*(?=\n?$)/dgv,
      name: "comment.line.cobol.fixed"
    },
    {
      captures: {
        "1": { name: "keyword.control.directive.conditional.cobol" },
        "2": { name: "entity.name.function.preprocessor.cobol" },
        "3": { name: "entity.name.function.cobol" },
        "4": { name: "keyword.control.directive.conditional.cobol" }
      },
      match: /((?:^|\p{space}+)\$[Ssſ][Ee][Tt]\p{space}+)([Cc][Oo][Nn][Ssſ][Tt][Aa][Nn][Tt]\p{space}+)([0-9A-Za-z][\-0-9A-Za-z]+\p{space}*)([\-0-9A-Za-z]*)/dgv
    },
    {
      captures: {
        "1": { name: "entity.name.function.preprocessor.cobol" },
        "2": { name: "storage.modifier.import.cobol" },
        "3": { name: "punctuation.begin.bracket.round.cobol" },
        "4": { name: "string.quoted.other.cobol" },
        "5": { name: "punctuation.end.bracket.round.cobol" }
      },
      match: /(\$\p{space}*[Ssſ][Ee][Tt]\p{space}+(ilusing)(\()([^\n]*)(\)))/dgv
    },
    {
      captures: {
        "1": { name: "entity.name.function.preprocessor.cobol" },
        "2": { name: "storage.modifier.import.cobol" },
        "3": { name: "punctuation.definition.string.begin.cobol" },
        "4": { name: "string.quoted.other.cobol" },
        "5": { name: "punctuation.definition.string.begin.cobol" }
      },
      match: /(\$\p{space}*[Ssſ][Ee][Tt]\p{space}+(ilusing)(")([^\n]*)("))/dgv
    },
    {
      captures: {
        "1": { name: "keyword.control.directive.conditional.cobol" },
        "2": { name: "entity.name.function.preprocessor.cobol" },
        "3": { name: "punctuation.definition.string.begin.cobol" },
        "4": { name: "string.quoted.other.cobol" },
        "5": { name: "punctuation.definition.string.begin.cobol" }
      },
      match: /(\$set)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(")([\p{L}\p{M}\p{N}\p{Pc}]*)(")/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.control.directive.conditional.cobol" },
        "2": { name: "entity.name.function.preprocessor.cobol" },
        "3": { name: "punctuation.begin.bracket.round.cobol" },
        "4": { name: "string.quoted.other.cobol" },
        "5": { name: "punctuation.end.bracket.round.cobol" }
      },
      match: /(\$set)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\()([^\n]*)(\))/dgiv
    },
    {
      captures: {
        "0": { name: "keyword.control.directive.conditional.cobol" },
        "1": { name: "invalid.illegal.directive" },
        "2": { name: "comment.line.set.cobol" }
      },
      match: /(?:^|\p{space}+)\$\p{space}*set\p{space}((?:01SHUFFLE|64KPARA|64KSECT|AUXOPT|CHIP|DATALIT|EANIM|EXPANDDATA|FIXING|FLAG-CHIP|MASM|MODEL|OPTSIZE|OPTSPEED|PARAS|PROTMODE|REGPARM|SEGCROSS|SEGSIZE|SIGNCOMPARE|SMALLDD|TABLESEGCROSS|TRICKLECHECK|\p{space})+)[^\n]*(?=\n?$)/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.control.directive.cobol" },
        "2": { name: "entity.other.attribute-name.preprocessor.cobol" }
      },
      match: /(\$(?:region|end-region))([^\n]*)(?=\n?$)/dgiv
    },
    {
      begin: /\$doc([^\n]*)(?=\n?$)/dgiv,
      end: /\$end-doc([^\n]*)(?=\n?$)/dgiv,
      name: "invalid.illegal.iscobol"
    },
    {
      match: />>\p{space}*(?:turn|page|listing|leap-seconds|d)\p{space}+[^\n]*(?=\n?$)/dgiv,
      name: "invalid.illegal.meta.preprocessor.cobolit"
    },
    {
      match: /substitute(?:-case|)\p{space}+/dgiv,
      name: "invalid.illegal.functions.cobolit"
    },
    {
      captures: {
        "1": { name: "invalid.illegal.keyword.control.directive.conditional.cobol" },
        "2": { name: "invalid.illegal.entity.name.function.preprocessor.cobol" },
        "3": { name: "invalid.illegal.entity.name.function.preprocessor.cobol" }
      },
      match: /((((>>|\$)\p{space}*)elif)([^\n]*))(?=\n?$)/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.control.directive.conditional.cobol" },
        "2": { name: "entity.name.function.preprocessor.cobol" },
        "3": { name: "entity.name.function.preprocessor.cobol" }
      },
      match: /((((>>|\$)\p{space}*)(?:if|else|elif|end-if|end-evaluate|end|define|evaluate|when|display|call-convention|set))([^\n]*))(?=\n?$)/dgiv
    },
    {
      captures: {
        "1": { name: "comment.line.scantoken.cobol" },
        "2": { name: "keyword.cobol" },
        "3": { name: "string.cobol" }
      },
      match: /(\*>)\p{space}+(@[0-9A-Za-z][\-0-9A-Za-z]+)\p{space}+([^\n]*)(?=\n?$)/dgv
    },
    {
      match: /(\*>[^\n]*)(?=\n?$)/dgv,
      name: "comment.line.modern"
    },
    {
      match: /(>>[^\n]*)(?=\n?$)/dgv,
      name: "strong comment.line.set.cobol"
    },
    {
      match: /([NUnu][Xx]|[HXhx])'\p{AHex}*'/dgv,
      name: "constant.numeric.integer.hexadecimal.cobol"
    },
    {
      match: /([NUnu][Xx]|[HXhx])'[^\n]*'/dgv,
      name: "invalid.illegal.hexadecimal.cobol"
    },
    {
      match: /([NUnu][Xx]|[HXhx])"\p{AHex}*"/dgv,
      name: "constant.numeric.integer.hexadecimal.cobol"
    },
    {
      match: /([NUnu][Xx]|[HXhx])"[^\n]*"/dgv,
      name: "invalid.illegal.hexadecimal.cobol"
    },
    {
      match: /[Bb]"[01]"/dgv,
      name: "constant.numeric.integer.boolean.cobol"
    },
    {
      match: /[Bb]'[01]'/dgv,
      name: "constant.numeric.integer.boolean.cobol"
    },
    {
      match: /[Oo]"[0-7]*"/dgv,
      name: "constant.numeric.integer.octal.cobol"
    },
    {
      match: /[Oo]"[^\n]*"/dgv,
      name: "invalid.illegal.octal.cobol"
    },
    {
      match: /(#)([0-9A-Za-z][\-0-9A-Za-z]+)/dgv,
      name: "meta.symbol.forced.cobol"
    },
    {
      begin: /((?<![\-\(\)0-9A-Z_a-z])(?:[Ii][Nn][Ssſ][Tt][Aa][Ll][Ll][Aa][Tt][Ii][Oo][Nn]|[Aa][Uu][Tt][Hh][Oo][Rr]|[Ssſ][Oo][Uu][Rr][Cc][Ee]-[Cc][Oo][Mm][Pp][Uu][Tt][Ee][Rr]|[Oo][Bb][Jj][Ee][Cc][Tt]-[Cc][Oo][Mm][Pp][Uu][Tt][Ee][Rr]|[Dd][Aa][Tt][Ee]-[Ww][Rr][Ii][Tt][Tt][Ee][Nn]|[Ssſ][Ee][Cc][Uu][Rr][Ii][Tt][Yy]|[Dd][Aa][Tt][Ee]-[Cc][Oo][Mm][Pp][Ii][Ll][Ee][Dd])(\.|(?=\n?$)))/dgv,
      beginCaptures: {
        "0": { name: "keyword.identifiers.cobol" }
      },
      end: /(?=((?<![\-_])(?:remarks|author|date-written|source-computer|object-computer|installation|date-compiled|special-names|security|environment\p{space}+division|data\p{space}+division|working-storage\p{space}+section|input-output\p{space}+section|linkage\p{space}+section|procedure\p{space}+division|local-storage\p{space}+section)|^[ \*][ \*][ \*][ \*][ \*][ \*]\*[^\n]*(?=\n?$)|^\+(?=\n?$)))/dgiv,
      name: "comment.block.cobol.remark",
      patterns: [
        {
          match: /^([ 0-9][ 0-9][ 0-9][ 0-9][ 0-9][ 0-9])/dgv,
          name: "constant.numeric.cobol"
        }
      ]
    },
    {
      captures: {
        "1": { name: "keyword.start.bracket.cobol" },
        "2": { name: "constant.numeric.cobol" },
        "3": { name: "keyword.end.bracket.cobol" }
      },
      match: /(?<=([\(\[]))((-\+)*\p{space}*[ \*-9]+)(?=([\]\)]))/dgv,
      name: "constant.numeric.cobol"
    },
    { include: "#number-complex-constant" },
    { include: "#number-simple-constant" },
    {
      match: /(?<![\-_])(?:[Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ssſ][Ee]|[Nn][Uu][Ll][Ll][Ssſ]??)(?![\-0-9A-Z_a-z])/dgv,
      name: "constant.language.cobol"
    },
    {
      match: /(?<![\-_])(?:zeroes|alphabetic-lower|alphabetic-upper|alphanumeric-edited|alphabetic|alphabet|alphanumeric|zeros?|spaces?|quotes?|low-values?|high-values?)(?=\p{space}+|[\)\,\.])/dgiv,
      name: "constant.language.figurative.cobol"
    },
    {
      begin: /exec(?:\p{space}+sqlims|\p{space}+sql)/dgiv,
      contentName: "meta.embedded.block.openesql",
      end: /end-exec/dgiv,
      name: "keyword.verb.cobol",
      patterns: [
        {
          match: /^(\p{space}*\*[^\n]*)(?=\n?$)/dgv,
          name: "comment.line.sql"
        },
        {
          match: /(--[^\n]*)(?=\n?$)/dgv,
          name: "comment.line.sql"
        },
        {
          match: /(\*>[^\n]*)(?=\n?$)/dgv,
          name: "comment.line.modern"
        },
        {
          match: /(:([\-0-9A-Z_a-z])*)/dgv,
          name: "variable.cobol"
        },
        { include: "source.openesql" }
      ]
    },
    {
      begin: /exec\p{space}+cics/dgiv,
      contentName: "meta.embedded.block.cics",
      end: /end-exec/dgiv,
      name: "keyword.verb.cobol",
      patterns: [
        {
          match: /(\()/dgv,
          name: "meta.symbol.cobol"
        },
        { include: "#cics-keywords" },
        { include: "#string-double-quoted-constant" },
        { include: "#string-quoted-constant" },
        { include: "#number-complex-constant" },
        { include: "#number-simple-constant" },
        {
          match: /([\-0-9A-Z_a-z]*[0-9A-Za-z]|(#?[0-9A-Za-z]+[\-0-9A-Z_a-z]*[0-9A-Za-z]))/dgv,
          name: "variable.cobol"
        }
      ]
    },
    {
      begin: /exec\p{space}+dli/dgiv,
      contentName: "meta.embedded.block.dli",
      end: /end-exec/dgiv,
      name: "keyword.verb.cobol",
      patterns: [
        {
          match: /(\()/dgv,
          name: "meta.symbol.cobol"
        },
        { include: "#dli-keywords" },
        { include: "#dli-options" },
        { include: "#string-double-quoted-constant" },
        { include: "#string-quoted-constant" },
        { include: "#number-complex-constant" },
        { include: "#number-simple-constant" },
        {
          match: /([\-0-9A-Z_a-z]*[0-9A-Za-z]|(#?[0-9A-Za-z]+[\-0-9A-Z_a-z]*[0-9A-Za-z]))/dgv,
          name: "variable.cobol"
        }
      ]
    },
    {
      begin: /exec\p{space}+sqlims/dgiv,
      contentName: "meta.embedded.block.openesql",
      end: /end-exec/dgiv,
      name: "keyword.verb.cobol",
      patterns: [
        {
          match: /(\*>[^\n]*)(?=\n?$)/dgv,
          name: "comment.line.modern"
        },
        {
          match: /(:([\-A-Za-z])*)/dgv,
          name: "variable.cobol"
        },
        { include: "source.openesql" }
      ]
    },
    {
      begin: /exec\p{space}+ado/dgiv,
      contentName: "meta.embedded.block.openesql",
      end: /end-exec/dgiv,
      name: "keyword.verb.cobol",
      patterns: [
        {
          match: /(--[^\n]*)(?=\n?$)/dgv,
          name: "comment.line.sql"
        },
        {
          match: /(\*>[^\n]*)(?=\n?$)/dgv,
          name: "comment.line.modern"
        },
        {
          match: /(:([\-A-Za-z])*)/dgv,
          name: "variable.cobol"
        },
        { include: "source.openesql" }
      ]
    },
    {
      begin: /exec\p{space}+html/dgiv,
      contentName: "meta.embedded.block.html",
      end: /end-exec/dgiv,
      name: "keyword.verb.cobol",
      patterns: [
        { include: "text.html.basic" }
      ]
    },
    {
      begin: /exec\p{space}+java/dgiv,
      contentName: "meta.embedded.block.java",
      end: /end-exec/dgiv,
      name: "keyword.verb.cobol",
      patterns: [
        { include: "source.java" }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.definition.string.begin.cobol" },
        "2": { name: "support.function.cobol" },
        "3": { name: "punctuation.definition.string.end.cobol" }
      },
      match: /(")(CBL_[^\n]*)(")/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.definition.string.begin.cobol" },
        "2": { name: "support.function.cobol" },
        "3": { name: "punctuation.definition.string.end.cobol" }
      },
      match: /(")(PC_[^\n]*)(")/dgv
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /("|(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.double.cobol"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.string.begin.cobol" },
        "2": { name: "support.function.cobol" },
        "3": { name: "punctuation.definition.string.end.cobol" }
      },
      match: /(')(CBL_[^\n]*)(')/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.definition.string.begin.cobol" },
        "2": { name: "support.function.cobol" },
        "3": { name: "punctuation.definition.string.end.cobol" }
      },
      match: /(')(PC_[^\n]*)(')/dgv
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /('|(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.single.cobol"
    },
    {
      begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])[GZgz]"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /("|(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.double.cobol"
    },
    {
      begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])[GZgz]'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.single.cobol"
    },
    {
      begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])[GNgn]"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /("|(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.double.cobol"
    },
    {
      begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])[GNgn]'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.single.cobol"
    },
    {
      begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])[Uu]"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /("|(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.utf8.double.cobol"
    },
    {
      begin: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])[Uu]'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.utf8.single.cobol"
    },
    {
      match: new EmulatedRegExp("(?<![\\-_])(?:[Ii][Dd]\\p{space}+[Dd][Ii][Vv][Ii][Ssſ][Ii][Oo][Nn]|[Ii][Dd][Ee][Nn][Tt][Ii][Ff][Ii][Cc][Aa][Tt][Ii][Oo][Nn]\\p{space}+[Dd][Ii][Vv][Ii][Ssſ][Ii][Oo][Nn]|[Ii][Dd][Ee][Nn][Tt][Ii][Ff][Ii][Cc][Aa][Tt][Ii][Oo][Nn]|[Ii][Dd]|[Pp][Rr][Oo][Pp][Ee][Rr][Tt][Yy]-[Ii][Dd]|[Gg][Ee][Tt][Tt][Ee][Rr]|[Ssſ][Ee][Tt][Tt][Ee][Rr]|[Ee][Nn][Tt][Rr][Yy]|[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn]-[Ii][Dd]|[Ee][Nn][Dd]\\p{space}+[Aa][Tt][Tt][Rr][Ii][Bb][Uu][Tt][Ee]|[Aa][Tt][Tt][Rr][Ii][Bb][Uu][Tt][Ee]|[Ii][Nn][Tt][Ee][Rr][Ff][Aa][Cc][Ee]-[Ii][Dd]|[Ii][Nn][Dd][Ee][Xx][Ee][Rr]-[Ii][Dd]|[Ff][Aa][Cc][Tt][Oo][Rr][Yy]|[Cc][Tt][Ll]|[Cc][Ll][Aa][Ssſ][Ssſ]-[Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Oo][Pp][Tt][Ii][Oo][Nn][Ssſ]|[Ee][Nn][Vv][Ii][Rr][Oo][Nn][Mm][Ee][Nn][Tt]\\p{space}+[Dd][Ii][Vv][Ii][Ssſ][Ii][Oo][Nn]|[Ee][Nn][Vv][Ii][Rr][Oo][Nn][Mm][Ee][Nn][Tt]-[Nn][Aa][Mm][Ee]|[Ee][Nn][Vv][Ii][Rr][Oo][Nn][Mm][Ee][Nn][Tt]-[Vv][Aa][Ll][Uu][Ee]|[Ee][Nn][Vv][Ii][Rr][Oo][Nn][Mm][Ee][Nn][Tt]|[Cc][Oo][Nn][Ff][Ii][Gg][Uu][Rr][Aa][Tt][Ii][Oo][Nn]\\p{space}+[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Cc][Oo][Nn][Ff][Ii][Gg][Uu][Rr][Aa][Tt][Ii][Oo][Nn]|[Dd][Ee][Cc][Ii][Mm][Aa][Ll]-[Pp][Oo][Ii][Nn][Tt]\\p{space}+[Ii][Ssſ]|[Dd][Ee][Cc][Ii][Mm][Aa][Ll]-[Pp][Oo][Ii][Nn][Tt]|[Cc][Oo][Nn][Ssſ][Oo][Ll][Ee]\\p{space}+[Ii][Ssſ]|[Cc][Aa][Ll][Ll]-[Cc][Oo][Nn][Vv][Ee][Nn][Tt][Ii][Oo][Nn]|[Ssſ][Pp][Ee][Cc][Ii][Aa][Ll]-[Nn][Aa][Mm][Ee][Ssſ]|[Cc][Uu][Rr][Ssſ][Oo][Rr]\\p{space}+[Ii][Ssſ]|[Uu][Pp][Dd][Aa][Tt][Ee]|[Pp][Ii][Cc][Tt][Uu][Rr][Ee]\\p{space}+[Ssſ][Yy][Mm][Bb][Oo][Ll]|[Cc][Uu][Rr][Rr][Ee][Nn][Cc][Yy]\\p{space}+[Ssſ][Ii][Gg][Nn]|[Cc][Uu][Rr][Rr][Ee][Nn][Cc][Yy]|[Rr][Ee][Pp][Oo][Ssſ][Ii][Tt][Oo][Rr][Yy]|[Ii][Nn][Pp][Uu][Tt]-[Oo][Uu][Tt][Pp][Uu][Tt]\\p{space}+[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ii][Nn][Pp][Uu][Tt]-[Oo][Uu][Tt][Pp][Uu][Tt]|[Ff][Ii][Ll][Ee]\\p{space}+[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ff][Ii][Ll][Ee]-[Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Ssſ][Ee][Ll][Ee][Cc][Tt]|[Oo][Pp][Tt][Ii][Oo][Nn][Aa][Ll]|[Ii]-[Oo]-[Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Dd][Aa][Tt][Aa]\\p{space}+[Dd][Ii][Vv][Ii][Ssſ][Ii][Oo][Nn]|[Ww][Oo][Rr][KKk][Ii][Nn][Gg]-[Ssſ][Tt][Oo][Rr][Aa][Gg][Ee]\\p{space}+[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ww][Oo][Rr][KKk][Ii][Nn][Gg]-[Ssſ][Tt][Oo][Rr][Aa][Gg][Ee]|[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ll][Oo][Cc][Aa][Ll]-[Ssſ][Tt][Oo][Rr][Aa][Gg][Ee]|[Ll][Ii][Nn][KKk][Aa][Gg][Ee]\\p{space}+[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ll][Ii][Nn][KKk][Aa][Gg][Ee]|[Cc][Oo][Mm][Mm][Uu][Nn][Ii][Cc][Aa][Tt][Ii][Oo][Nn]|[Rr][Ee][Pp][Oo][Rr][Tt]|[Ssſ][Cc][Rr][Ee][Ee][Nn]\\p{space}+[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Oo][Bb][Jj][Ee][Cc][Tt]-[Ssſ][Tt][Oo][Rr][Aa][Gg][Ee]|[Oo][Bb][Jj][Ee][Cc][Tt]\\p{space}+[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Cc][Ll][Aa][Ssſ][Ssſ]-[Oo][Bb][Jj][Ee][Cc][Tt]|[Ff][Dd]|[Rr][Dd]|[Cc][Dd]|[Ssſ][Dd]|[Pp][Rr][Ii][Nn][Tt][Ii][Nn][Gg]|[Pp][Rr][Oo][Cc][Ee][Dd][Uu][Rr][Ee]\\p{space}+[Dd][Ii][Vv][Ii][Ssſ][Ii][Oo][Nn]|[Pp][Rr][Oo][Cc][Ee][Dd][Uu][Rr][Ee]|[Dd][Ii][Vv][Ii][Ssſ][Ii][Oo][Nn]|[Rr][Ee][Ff][Ee][Rr][Ee][Nn][Cc][Ee][Ssſ]|[Dd][Ee][Bb][Uu][Gg][Gg][Ii][Nn][Gg]|[Ee][Nn][Dd]\\p{space}+[Dd][Ee][Cc][Ll][Aa][Rr][Aa][Tt][Ii][Vv][Ee][Ssſ]|[Dd][Ee][Cc][Ll][Aa][Rr][Aa][Tt][Ii][Vv][Ee][Ssſ]|[Ee][Nn][Dd]\\p{space}+[Ssſ][Tt][Aa][Tt][Ii][Cc]|[Ee][Nn][Dd]\\p{space}+[Ff][Aa][Cc][Tt][Oo][Rr][Yy]|[Ee][Nn][Dd]\\p{space}+[Cc][Ll][Aa][Ssſ][Ssſ]-[Oo][Bb][Jj][Ee][Cc][Tt]|[Bb][Aa][Ssſ][Ee][Dd]-[Ssſ][Tt][Oo][Rr][Aa][Gg][Ee]|[Ssſ][Ii][Zz][Ee]|[Ff][Oo][Nn][Tt]|[Nn][Aa][Tt][Ii][Oo][Nn][Aa][Ll]-[Ee][Dd][Ii][Tt][Ee][Dd]|[Nn][Aa][Tt][Ii][Oo][Nn][Aa][Ll])(?![\\-0-9A-Z_a-z])", "dgv", { lazyCompile: true }),
      name: "keyword.identifiers.cobol"
    },
    {
      captures: {
        "1": { name: "keyword.verb.cobol" },
        "2": { name: "entity.name.function.cobol" }
      },
      match: /(?<![\-_])((?:[Vv][Aa][Ll][Uu][Ee][Tt][Yy][Pp][Ee]-[Ii][Dd]|[Oo][Pp][Ee][Rr][Aa][Tt][Oo][Rr]-[Ii][Dd]|[Mm][Ee][Tt][Hh][Oo][Dd]-[Ii][Dd]|[Mm][Ee][Tt][Hh][Oo][Dd]|[Pp][Rr][Oo][Pp][Ee][Rr][Tt][Yy]-[Ii][Dd]|[Aa][Tt][Tt][Rr][Ii][Bb][Uu][Tt][Ee]-[Ii][Dd]|[Ee][Nn][Uu][Mm]-[Ii][Dd]|[Ii][Tt][Ee][Rr][Aa][Tt][Oo][Rr]-[Ii][Dd]|[Cc][Ll][Aa][Ssſ][Ssſ]-[Ii][Dd]|[Pp][Rr][Oo][Gg][Rr][Aa][Mm]-[Ii][Dd]|[Oo][Pp][Ee][Rr][Aa][Tt][Oo][Rr]-[Ii][Dd]|[Ee][Nn][Dd]\p{space}+[Pp][Rr][Oo][Gg][Rr][Aa][Mm]|[Ee][Nn][Dd]\p{space}+[Vv][Aa][Ll][Uu][Ee][Tt][Yy][Pp][Ee]|[Ee][Xx][Tt][Ee][Nn][Ssſ][Ii][Oo][Nn]))\.*\p{space}+([\-0-9A-Z_a-z]*)/dgv
    },
    {
      match: /(?<![\-_])(?:implements|inherits|constraints|constrain)(?=[\.\p{space}])/dgiv,
      name: "keyword.verb.cobol"
    },
    {
      match: /(?<![\-_])(?:end\p{space}+enum|end\p{space}+interface|end\p{space}+class|end\p{space}+property|end\p{space}+method|end\p{space}+object|end\p{space}+iterator|end\p{space}+function|end\p{space}+operator|end\p{space}+program|end\p{space}+indexer|create|reset|instance|delegate|end-delegate|delegate-id|declare|exception-object|as|stop\p{space}+iterator|stop\p{space}+run|stop)(?=[\)\,\.\p{space}])/dgiv,
      name: "keyword.identifiers.cobol"
    },
    {
      match: /\p{space}+(?:attach\p{space}+method|attach\p{space}+del|attach|detach\p{space}+del|detach\p{space}+method|detach|method|del)(?=[\.\p{space}]|(?=\n?$))/dgiv,
      name: "keyword.identifiers.cobol"
    },
    {
      match: /\p{space}+sync\p{space}+on(?=[\.\p{space}])/dgiv,
      name: "keyword.other.sync.cobol"
    },
    {
      match: /\p{space}+(?:try|finally|catch|end-try|throw)(?=[\.\p{space}]|(?=\n?$))/dgiv,
      name: "keyword.control.catch-exception.cobol"
    },
    {
      match: /(?<![\-_])(?:select|use|thru|varying|giving|remainder|tallying|through|until|execute|returning|using|chaining|yielding|\+\+include|copy|replace)(?=\p{space})/dgiv,
      name: "keyword.otherverb.cobol"
    },
    {
      match: /dynamic\p{space}+length(?=[\.\p{space}])/dgiv,
      name: "storage.type.dynamiclength.cobol"
    },
    {
      match: /(?<![\-_])(?:assign|external|prototype|organization|organisation|indexed|column|plus|line\*s*sequential|sequential|access|dynamic|relative|label|block|contains|standard|records|record\p{space}+key|record|is|alternate|duplicates|reel|tape|terminal|disk\p{space}filename|disk|disc|recording\p{space}mode|mode|random)(?=[\.\p{space}])/dgiv,
      name: "keyword.identifers.cobol"
    },
    {
      match: /(?<![\-_])(?:max|min|integer-of-date|integer-of-day|integer-part|integer|date-to-yyyymmdd|year-to-yyyy|day-to-yyyyddd|exp|exception-file|exception-location|exception-statement|exception-status|e|variance|integer-of-date|rem|pi|factorial|sqrt|log10|fraction-part|mean|exp|log|char|day-of-integer|date-of-integer|exp10|atan|integer-part|tan|sin|cos|midrange|addr|acos|asin|annuity|present-value|integer-of-day|ord-max|ord-min|ord|random|integer-of-date|sum|standard-deviation|median|reverse|abs|upper-case|lower-case|char-national|numval|mod|range|length|locale-date|locale-time-from-seconds|locale-time|seconds-past-midnight|stored-char-length|seconds-from-formatted-time|seconds-past-midnight|trim|length-an|numval-c|current-date|national-of|display-of|when-compiled|integer-of-boolean|combined-datetime|concatenate)(?=[\(\)\.\p{space}])/dgiv,
      name: "support.function.cobol"
    },
    {
      captures: {
        "0": { name: "support.function.cics.cobol" },
        "1": { name: "punctuation.definition.string.end.cobol" },
        "2": { name: "keyword.identifers.cobol" },
        "3": { name: "punctuation.definition.string.end.cobol" }
      },
      match: /(?<![\-_])[Dd][Ff][Hh](?:[Rr][Ee][Ssſ][Pp]|[Vv][Aa][Ll][Uu][Ee])(\p{space}*\(\p{space}*)([A-Za-z]*)(\p{space}*\))/dgv
    },
    {
      match: /(?<![\-_])function(?=[\.\p{space}])/dgiv,
      name: "keyword.verb.cobol"
    },
    {
      match: /(?<![\-_])(?:[Ee][Nn][Dd]-[Aa][Cc][Cc][Ee][Pp][Tt]|[Ee][Nn][Dd]-[Aa][Dd][Dd]|[Ee][Nn][Dd]-[Ssſ][Yy][Nn][Cc]|[Ee][Nn][Dd]-[Cc][Oo][Mm][Pp][Uu][Tt][Ee]|[Ee][Nn][Dd]-[Dd][Ee][Ll][Ee][Tt][Ee]|[Ee][Nn][Dd]-[Dd][Ii][Ssſ][Pp][Ll][Aa][Yy]|[Ee][Nn][Dd]-[Dd][Ii][Vv][Ii][Dd][Ee]|[Ee][Nn][Dd]-[Ssſ][Ee][Tt]|[Ee][Nn][Dd]-[Mm][Uu][Ll][Tt][Ii][Pp][Ll][Yy]|[Ee][Nn][Dd]-[Oo][Ff]-[Pp][Aa][Gg][Ee]|[Ee][Nn][Dd]-[Rr][Ee][Aa][Dd]|[Ee][Nn][Dd]-[Rr][Ee][Cc][Ee][Ii][Vv][Ee]|[Ee][Nn][Dd]-[Rr][Ee][Tt][Uu][Rr][Nn]|[Ee][Nn][Dd]-[Rr][Ee][Ww][Rr][Ii][Tt][Ee]|[Ee][Nn][Dd]-[Ssſ][Ee][Aa][Rr][Cc][Hh]|[Ee][Nn][Dd]-[Ssſ][Tt][Aa][Rr][Tt]|[Ee][Nn][Dd]-[Ssſ][Tt][Rr][Ii][Nn][Gg]|[Ee][Nn][Dd]-[Ssſ][Uu][Bb][Tt][Rr][Aa][Cc][Tt]|[Ee][Nn][Dd]-[Uu][Nn][Ssſ][Tt][Rr][Ii][Nn][Gg]|[Ee][Nn][Dd]-[Ww][Rr][Ii][Tt][Ee]|[Pp][Rr][Oo][Gg][Rr][Aa][Mm]|[Cc][Ll][Aa][Ssſ][Ssſ]|[Ii][Nn][Tt][Ee][Rr][Ff][Aa][Cc][Ee]|[Ee][Nn][Uu][Mm]|[Ii][Nn][Tt][Ee][Rr][Ff][Aa][Cc][Ee])(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.verb.cobol"
    },
    {
      match: /(?<![\-_])(?:by value|by reference|by content|property-value)(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.other.cobol"
    },
    {
      match: new EmulatedRegExp("(?<![\\-_])(?:[Aa][Tt][Tt][Rr]-[Ssſ][Tt][Rr][Ii][Nn][Gg]|[Aa][Uu][Tt][Oo][Mm][Aa][Tt][Ii][Cc]|[Aa][Uu][Tt][Oo]-[Ssſ][KKk][Ii][Pp]|[Ff][Oo][Oo][Tt][Ii][Nn][Gg]|[Nn][Ee][Xx][Tt]|[Gg][Rr][Oo][Uu][Pp]|[Ii][Nn][Dd][Ii][Cc][Aa][Tt][Ee]|[Ssſ][Oo][Uu][Rr][Cc][Ee]|[Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Ff][Uu][Ll][Ll]|[Rr][Ee][Qq][Uu][Ii][Rr][Ee][Dd]|[Oo][Ff]|[Ii][Nn][Pp][Uu][Tt]|[Oo][Uu][Tt][Pp][Uu][Tt]|[Ii]-[Oo]|[Ee][Xx][Tt][Ee][Nn][Dd]|[Ff][Ii][Ll][Ee]|[Ee][Rr][Rr][Oo][Rr]|[Ee][Xx][Cc][Ee][Pp][Tt][Ii][Oo][Nn]|[Oo][Vv][Ee][Rr][Ff][Ll][Oo][Ww]|[Gg][Oo][Tt][Oo]|[Oo][Ff][Ff]|[Oo][Nn]|[Pp][Rr][Oo][Cc][Ee][Ee][Dd]|[Pp][Rr][Oo][Cc][Ee][Dd][Uu][Rr][Ee][Ssſ]?|[Tt][Hh][Rr][Oo][Uu][Gg][Hh]|[Ii][Nn][Vv][Aa][Ll][Ii][Dd]|[Dd][Aa][Tt][Aa]|[Nn][Oo][Rr][Mm][Aa][Ll]|[Ee][Oo][Pp]|[Rr][Ee][Tt][Uu][Rr][Nn][Ii][Nn][Gg]|[Tt][Oo]|[Ff][Oo][Rr]|[Gg][Ii][Vv][Ii][Nn][Gg]|[Ii][Nn][Tt][Oo]|[Bb][Yy]|[Pp][Aa][Rr][Aa][Mm][Ssſ]|[Rr][Ee][Mm][Aa][Ii][Nn][Dd][Ee][Rr]|[Aa][Ll][Ssſ][Oo]|[Nn][Uu][Mm][Ee][Rr][Ii][Cc]|[Ff][Rr][Ee][Ee]|[Dd][Ee][Pp][Ee][Nn][Dd][Ii][Nn][Gg]|[Cc][Oo][Nn][Vv][Ee][Rr][Tt][Ii][Nn][Gg]|[Rr][Ee][Pp][Ll][Aa][Cc][Ii][Nn][Gg]|[Aa][Ff][Tt][Ee][Rr]|[Bb][Ee][Ff][Oo][Rr][Ee]|[Aa][Ll][Ll]|[Ll][Ee][Aa][Dd][Ii][Nn][Gg]|[Ff][Ii][Rr][Ssſ][Tt]|[Rr][Ee][Cc][Uu][Rr][Ssſ][Ii][Vv][Ee]|[Ii][Nn][Ii][Tt][Ii][Aa][Ll][Ii][Zz][Ee][Dd]|[Gg][Ll][Oo][Bb][Aa][Ll]|[Cc][Oo][Mm][Mm][Oo][Nn]|[Ii][Nn][Ii][Tt][Ii][Aa][Ll]|[Rr][Ee][Ssſ][Ii][Dd][Ee][Nn][Tt]|[Rr][Ee][Ff][Ee][Rr][Ee][Nn][Cc][Ee]|[Cc][Oo][Nn][Tt][Ee][Nn][Tt]|[Aa][Rr][Ee]\\p{space}[Ssſ][Tt][Aa][Nn][Dd][Aa][Rr][Dd]|[Aa][Rr][Ee]|[Rr][Ee][Nn][Aa][Mm][Ee][Ssſ]|[Ll][Ii][KKk][Ee]|[Ff][Oo][Rr][Mm][Aa][Tt]\\p{space}[Tt][Ii][Mm][Ee]|[Vv][Aa][Ll][Uu][Ee][Ssſ]|[Oo][Mm][Ii][Tt][Tt][Ee][Dd]|[Vv][Aa][Ll][Uu][Ee]|[Cc][Oo][Nn][Ssſ][Tt][Aa][Nn][Tt]|[Aa][Ssſ][Cc][Ee][Nn][Dd][Ii][Nn][Gg]|[Dd][Ee][Ssſ][Cc][Ee][Nn][Dd][Ii][Nn][Gg]|[KKk][Ee][Yy]|[Rr][Ee][Tt][Rr][Yy]|[Uu][Nn][Tt][Ii][Ll]|[Vv][Aa][Rr][Yy][Ii][Nn][Gg]|[Ww][Ii][Tt][Hh]|[Nn][Oo]|[Aa][Dd][Vv][Aa][Nn][Cc][Ii][Nn][Gg]|[Uu][Pp]|[Dd][Oo][Ww][Nn]|[Uu][Cc][Cc][Uu][Rr][Ssſ]|[Ii][Gg][Nn][Oo][Rr][Ee]\\p{space}+[Ll][Oo][Cc][KKk]|[Ll][Oo][Cc][KKk]|[Ll][Ee][Nn][Gg][Tt][Hh]|[Dd][Ee][Ll][Ii][Mm][Ii][Tt][Ee][Dd]|[Cc][Oo][Uu][Nn][Tt]|[Dd][Ee][Ll][Ii][Mm][Ii][Tt][Ee][Rr]|[Rr][Ee][Dd][Ee][Ff][Ii][Nn][Ee][Ssſ]|[Ff][Rr][Oo][Mm]\\p{space}+[Cc][Oo][Nn][Ssſ][Oo][Ll][Ee]|[Ff][Rr][Oo][Mm]\\p{space}+[Cc][Oo][Mm][Mm][Aa][Nn][Dd]-[Ll][Ii][Nn][Ee]|[Ff][Rr][Oo][Mm]\\p{space}+[Uu][Ssſ][Ee][Rr]\\p{space}+[Nn][Aa][Mm][Ee]|[Ff][Rr][Oo][Mm]\\p{space}+[Dd][Aa][Yy]\\p{space}+[Yy][Yy][Yy][Yy][Dd][Dd][Dd]|[Ff][Rr][Oo][Mm]\\p{space}+[Dd][Aa][Yy]|[Ff][Rr][Oo][Mm]\\p{space}+[Tt][Ii][Mm][Ee]|[Ff][Rr][Oo][Mm]\\p{space}+[Dd][Aa][Yy]-[Oo][Ff]-[Ww][Ee][Ee][KKk]|[Ff][Rr][Oo][Mm]\\p{space}+[Ee][Ssſ][Cc][Aa][Pp][Ee]|[Ff][Rr][Oo][Mm]\\p{space}+[Dd][Aa][Yy]\\p{space}+[Yy][Yy][Yy][Yy][Dd][Dd][Dd]|[Ff][Rr][Oo][Mm]\\p{space}+[Dd][Aa][Tt][Ee]\\p{space}+[Yy][Yy][Yy][Yy][Mm][Mm][Dd][Dd]|[Ff][Rr][Oo][Mm]\\p{space}+[Dd][Aa][Tt][Ee]|[Ff][Rr][Oo][Mm]|[Rr][Aa][Ii][Ssſ][Ii][Nn][Gg]|[Cc][Rr][Tt]\\p{space}+[Ssſ][Tt][Aa][Tt][Uu][Ssſ]|[Ssſ][Tt][Aa][Tt][Uu][Ssſ]|[Cc][Ll][Aa][Ssſ][Ssſ]|[Uu][Pp][Oo][Nn]\\p{space}+[Cc][Rr][Tt]|[Uu][Pp][Oo][Nn]|[Ll][Ii][Nn][Ee][Ssſ]|[Cc][Oo][Ll][Uu][Mm][Nn][Ssſ]|[Ssſ][Tt][Ee][Pp]|[Ll][Ii][Nn][Aa][Gg][Ee]|[Aa][Uu][Tt][Oo]|[Ll][Ii][Nn][Ee]|[Pp][Oo][Ssſ][Ii][Tt][Ii][Oo][Nn]|[Cc][Oo][Ll]|[Rr][Ee][Pp][Oo][Rr][Tt][Ssſ]|[Cc][Oo][Dd][Ee]-[Ssſ][Ee][Tt]|[Rr][Ee][Pp][Oo][Rr][Tt][Ii][Nn][Gg]|[Aa][Rr][Ii][Tt][Hh][Mm][Ee][Tt][Ii][Cc]|[Ll][Oo][Cc][Aa][Ll][Ii][Zz][Ee]|[Pp][Rr][Oo][Gg][Rr][Aa][Mm]|[Cc][Ll][Aa][Ssſ][Ssſ]|[Ii][Nn][Tt][Ee][Rr][Ff][Aa][Cc][Ee]|[Ii][Nn]|[Aa][Tt]\\p{space}+[Ee][Nn][Dd]|[Pp][Aa][Gg][Ee]|[Nn][Aa][Mm][Ee])(?![\\-0-9A-Z_a-z])", "dgv", { lazyCompile: true }),
      name: "keyword.identifers.cobol"
    },
    {
      captures: {
        "0": { name: "keyword.verb.cobol" },
        "1": { name: "storage.type.cobol" }
      },
      match: /(?<![\-_])(?:[Tt][Yy][Pp][Ee]|[Nn][Ee][Ww])\p{space}+([A-Za-z][\-\$\.0-9A-Z_a-z]*|[A-Za-z])(?=\.(?=\n?$))/dgv
    },
    {
      match: /(?<![\-_])[Ssſ][Tt][Rr][Ii][Nn][Gg](?=\p{space}+value|\.)/dgv,
      name: "storage.type.cobol"
    },
    {
      match: /(?<![\-_])(?:bit|byte|binary-char|binary-char-unsigned|binary-short|binary-short-unsigned|binary[^\n]long|binary-c-long|binary-long-unsigned|binary-long|binary-double|binary-double-unsigned|float-short|float-extended|float-long|bit|condition-value|characters|character\p{space}+type|character|comma|crt|decimal|object\+sreference|object-reference|object|list|dictionary|unsigned)(?=[\]\,\.\[\p{space}])/dgiv,
      name: "storage.type.cobol"
    },
    {
      captures: {
        "1": { name: "keyword.other.verb.cobol" },
        "2": { name: "meta.symbol.cobol" }
      },
      match: /(operator-id\p{space}+[\-\*\+\/])/dgv,
      name: "keyword.operator-id.cobol"
    },
    {
      captures: {
        "1": { name: "punctuation.accessor.cobol.b3" },
        "2": { name: "entity.name.function.b3" }
      },
      match: /[Ssſ][Ee][Ll][Ff](::)([\-\.0-9A-Z_a-z]*)(?=\.(?=\n?$))/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.accessor.cobol" },
        "2": { name: "entity.name.function.cobol" }
      },
      match: /(::)([\-\.0-9A-Z_a-z]*)/dgv
    },
    {
      captures: {
        "0": { name: "keyword.verb.cobol.aa" },
        "1": { name: "storage.type.cobol.bb" }
      },
      match: /(?<![\-_])[Tt][Yy][Pp][Ee]\p{space}+([\.0-9A-Za-z]*)/dgv
    },
    {
      match: /(?<![\-_])(?:[Ii][Ff]|[Ee][Ll][Ssſ][Ee]|[Ee][Nn][Dd]-[Ii][Ff]|[Ee][Xx][Ii][Tt]\p{space}+[Ii][Tt][Ee][Rr][Aa][Tt][Oo][Rr]|[Ee][Xx][Ii][Tt]\p{space}+[Pp][Rr][Oo][Gg][Rr][Aa][Mm]|[Ee][Xx][Ii][Tt]\p{space}+[Mm][Ee][Tt][Hh][Oo][Dd]|[Ee][Vv][Aa][Ll][Uu][Aa][Tt][Ee]|[Ee][Nn][Dd]-[Ee][Vv][Aa][Ll][Uu][Aa][Tt][Ee]|[Ee][Xx][Ii][Tt]\p{space}+[Pp][Ee][Rr][Ff][Oo][Rr][Mm]|[Pp][Ee][Rr][Ff][Oo][Rr][Mm]|[Ee][Nn][Dd]-[Pp][Ee][Rr][Ff][Oo][Rr][Mm]|[Ww][Hh][Ee][Nn]\p{space}+[Oo][Tt][Hh][Ee][Rr]|[Ww][Hh][Ee][Nn]|[Cc][Oo][Nn][Tt][Ii][Nn][Uu][Ee]|[Cc][Aa][Ll][Ll]|[Ee][Nn][Dd]-[Cc][Aa][Ll][Ll]|[Cc][Hh][Aa][Ii][Nn]|[Ee][Nn][Dd]-[Cc][Hh][Aa][Ii][Nn]|[Ii][Nn][Vv][Oo][KKk][Ee]|[Ee][Nn][Dd]\p{space}+[Ii][Nn][Vv][Oo][KKk][Ee]|[Ee][Nn][Dd]-[Xx][Mm][Ll]|[Gg][Oo]\p{space}+[Tt][Oo]|[Gg][Oo]|[Ssſ][Oo][Rr][Tt]|[Mm][Ee][Rr][Gg][Ee]|[Uu][Ssſ][Ee]|[Xx][Mm][Ll]\p{space}+[Pp][Aa][Rr][Ssſ][Ee]|[Xx][Mm][Ll]|[Tt][Oo][Pp]\p{space}+[Rr][Uu][Nn]|[Gg][Oo][Bb][Aa][Cc][KKk]\p{space}+[Rr][Ee][Tt][Uu][Rr][Nn][Ii][Nn][Gg]|[Gg][Oo][Bb][Aa][Cc][KKk]|[Rr][Aa][Ii][Ssſ][Ee]|[Ee][Xx][Ii][Tt]\p{space}+[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn]|[Ee][Xx][Ii][Tt]\p{space}[Pp][Aa][Rr][Aa][Gg][Rr][Aa][Pp][Hh]|[Aa][Ww][Aa][Ii][Tt])(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.control.cobol"
    },
    {
      captures: {
        "1": { name: "storage.type.picture10.cobol" },
        "2": { name: "constant.numeric.cobol" },
        "3": { name: "storage.type.picture10.cobol" },
        "4": { name: "constant.numeric.cobol" }
      },
      match: /(?<![\-_])([Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[\$\*-09ABNPSUXZabnpsuxz]*)\(([0-9]*)\)([Vv][\$\*-09ABNPSUXZabnpsuxz]*)\(([0-9]*)\)[\-\+\|]/dgv
    },
    {
      captures: {
        "1": { name: "storage.type.picture9.cobol" },
        "2": { name: "constant.numeric.cobol" },
        "3": { name: "storage.type.picture9.cobol" },
        "4": { name: "constant.numeric.cobol" }
      },
      match: /(?<![\-_])([Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[\$\*-09ABNPSUXZabnpsuxz]*)\(([0-9]*)\)([Vv][\$\*-09ABNPSUXZabnpsuxz]*)\(([0-9]*)\)/dgv
    },
    {
      captures: {
        "1": { name: "storage.type.picture8.cobol" },
        "2": { name: "constant.numeric.cobol" },
        "3": { name: "storage.type.picture8.cobol" }
      },
      match: /(?<![\-_])([Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[\$\*-09ABNPSUXZabnpsuxz]*)\(([0-9]*)\)([\.Vv][\$\*-\-\/09ABNSUXZabnsuxz]*[\(\)\.0-9])*/dgv
    },
    {
      match: /(?<![\-_])[Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[\$\*-09ABNPSUXZabnpsuxz]*\([0-9]*\)[\.Vv][\$\*-\-\/09ABNPSUXZabnpsuxz]*/dgv,
      name: "storage.type.picture7.cobol"
    },
    {
      match: /(?<![\-_])[Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[\$\*-09ABNPSUXZabnpsuxz]*\([0-9]*\)[\$\*-\-\/09ABNPSUXZabnpsuxz]*[\.Vv][\$\*-\-\/09ABNPSUXZabnpsuxz]*/dgv,
      name: "storage.type.picture6.cobol"
    },
    {
      captures: {
        "1": { name: "storage.type.picture5.cobol" },
        "2": { name: "constant.numeric.cobol" }
      },
      match: /(?<![\-_])([Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[\$\*-09ABNPSUXZabnpsuxz]*)\(([0-9]*)\)[\$\*-\-\/09ABNPSUXZabnpsuxz]*/dgv
    },
    {
      match: /(?<![\-_])[Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[\$\*-09ABNSUXZabnpsuxz]*\([0-9]*\)/dgv,
      name: "storage.type.picture4.cobol"
    },
    {
      match: /(?<![\-_])[Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[Ss]?[9ABNSUXZabnsuxz]*[Vv][9AUXZabuxz]*\([0-9]*\)/dgv,
      name: "storage.type.picture3.cobol"
    },
    {
      match: /(?<![\-_])[Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[Ss]?[9ABNSUXZabnsuxz]*[Vv][9AUXZabuxz]*/dgv,
      name: "storage.type.picture2.cobol"
    },
    {
      match: /(?<![\-_])[Pp][Ii][Cc](?:[Tt][Uu][Rr][Ee]\p{space}+[Ii][Ssſ]|[Tt][Uu][Rr][Ee]|\p{space}+[Ii][Ssſ]|)\p{space}+[\$\*-\/9ABNPSUVXZabnpsuvxz]*/dgv,
      name: "storage.type.picture1.cobol"
    },
    {
      captures: {
        "1": { name: "invalid.illegal.keyword.verb.acu.cobol" },
        "2": { name: "invalid.illegal.constant.numeric.integer" }
      },
      match: /((?<![\-_])(?:binary|computational-4|comp-4|computational-5|comp-5))\(([0-9]*)\)/dgiv
    },
    {
      match: /cblt-(?:x1-compx-const|x2-compx-const|x4-compx-const|alphanum-const|x9-compx|x8-compx|x8-comp5|x4-compx|x4-comp5|x2-compx|x2-comp5|x1-compx|x1-comp5|x1|vfile-status|vfile-handle|sx8-comp5|sx4-comp5|sx2-comp5|sx1-comp5|subsys-params|splitjoin-buf|screen-position|rtncode|request-context|reqhand-service-info|reqhand-service-funcs|reqhand-response|reqhand-funcs|prog-info-params|prog-info-arg-info|printer-properties|printer-name|printer-info|printer-default|ppointer|pointer|os-ssize|os-size|os-offset|os-info-params|os-flags|node-name|nls-msg-params|nls-msg-number-pair|nls-msg-ins-struct|nls-msg-buffer|mouse-shape|mouse-rect|mouse-pos|mouse-event|mem-validate-param|idp-exit-service-funcs|idp-exit-info|HWND|HINSTANCE|get-scr-line-draw-buffer|get-scr-graphics-buffer|generic-attr-value|generic-attr-rgb-values|generic-attr-information|file-status|fileexist-buf|exit-params|exit-info-params|cancel-proc-params|bytestream-handle|alphanum)/dgiv,
      name: "support.function.cbltypes.cobol"
    },
    {
      match: /(?<![\-_])(?:computational-1|comp-1|computational-2|comp-2|computational-3|comp-3|computational-4|comp-4|computational-x|comp-x|computational-5|comp-5|computational-6|comp-6|computational-n|comp-n|packed-decimal|index|float|double|signed-short|unsigned-short|signed-int|unsigned-int|signed-long|unsigned-long|comp|computational|group-usage|usage\p{space}is\p{space}display|usage\p{space}is\p{space}font|usage\p{space}+display|binary|mutex-pointer|data-pointer|thread-pointer|sempahore-pointer|event-pointer|program-pointer|procedure-pointer|pointer-32|pointer|window|subwindow|control-type|thread|menu|variant|layout-manager|occurs|typedef|any|times|display\p{space}+blank\p{space}+when|blank\p{space}+when|blank\p{space}+screen|blank|usage\p{space}is|is\p{space}partial|usage|justified|just|right|signed|trailing\p{space}+separate|sign|seperate|sql)(?=[\)\.\p{space}])/dgiv,
      name: "storage.type.picture.cobol"
    },
    {
      match: /byte-length\p{space}+[0-9]+/dgiv,
      name: "storage.type.length.cobol"
    },
    {
      match: /(?<![\-_])(?:[Aa][Cc][Cc][Ee][Pp][Tt]|[Aa][Dd][Dd]|[Aa][Dd][Dd][Rr][Ee][Ssſ][Ssſ]|[Aa][Ll][Ll][Oo][Cc][Aa][Tt][Ee]|[Cc][Aa][Nn][Cc][Ee][Ll]|[Cc][Ll][Oo][Ssſ][Ee]|[Cc][Oo][Mm][Mm][Ii][Tt]|[Cc][Oo][Mm][Pp][Uu][Tt][Ee]|[Cc][Oo][Nn][Tt][Ii][Nn][Uu][Ee]|[Dd][Ee][Ll][Ee][Tt][Ee]|[Dd][Ii][Ssſ][Aa][Bb][Ll][Ee]|[Dd][Ii][Ssſ][Pp][Ll][Aa][Yy]|[Bb][Ee][Ll][Ll]|[Dd][Ii][Vv][Ii][Dd][Ee]|[Ee][Jj][Ee][Cc][Tt]|[Ee][Nn][Aa][Bb][Ll][Ee]|[Ee][Nn][Tt][Ee][Rr]|[Ee][Vv][Aa][Ll][Uu][Aa][Tt][Ee]|[Ee][Xx][Hh][Ii][Bb][Ii][Tt]|[Nn][Aa][Mm][Ee][Dd]|[Ee][Xx][Ii][Tt]|[Ff][Rr][Ee][Ee]|[Gg][Ee][Nn][Ee][Rr][Aa][Tt][Ee]|[Gg][Oo]\p{space}+[Tt][Oo]|[Ii][Nn][Ii][Tt][Ii][Aa][Ll][Ii][Zz][Ee]\p{space}[Oo][Nn][Ll][Yy]|[Ii][Nn][Ii][Tt][Ii][Aa][Ll][Ii][Zz][Ee]|[Ii][Nn][Ii][Tt][Ii][Aa][Tt][Ee]|[Ii][Nn][Ssſ][Pp][Ee][Cc][Tt]|[Mm][Ee][Rr][Gg][Ee]|[Ee][Nn][Dd]-[Ssſ][Ee][Tt]|[Ssſ][Ee][Tt]|[Ee][Nn][Dd]-[Ii][Nn][Vv][Oo][KKk][Ee]|[Ii][Nn][Vv][Oo][KKk][Ee]\p{space}+[Rr][Uu][Nn]|[Ii][Nn][Vv][Oo][KKk][Ee]|[Mm][Oo][Vv][Ee]|[Cc][Oo][Rr][Rr][Ee][Ssſ][Pp][Oo][Nn][Dd][Ii][Nn][Gg]|[Cc][Oo][Rr][Rr]|[Mm][Uu][Ll][Tt][Ii][Pp][Ll][Yy]|[Oo][Tt][Hh][Ee][Rr][Ww][Ii][Ssſ][Ee]|[Oo][Pp][Ee][Nn]|[Ssſ][Hh][Aa][Rr][Ii][Nn][Gg]|[Ssſ][Oo][Rr][Tt]-[Mm][Ee][Rr][Gg][Ee]|[Pp][Uu][Rr][Gg][Ee]|[Rr][Ee][Aa][Dd][Yy]?|[KKk][Ee][Pp][Tt]|[Rr][Ee][Cc][Ee][Ii][Vv][Ee]|[Rr][Ee][Ll][Ee][Aa][Ssſ][Ee]|[Rr][Ee][Tt][Uu][Rr][Nn]|[Rr][Ee][Ww][Rr][Ii][Tt][Ee]|[Rr][Oo][Uu][Nn][Dd][Ee][Dd]|[Rr][Oo][Ll][Ll][Bb][Aa][Cc][KKk]|[Ssſ][Ee][Aa][Rr][Cc][Hh]|[Ssſ][Ee][Nn][Dd]|[Ssſ][Oo][Rr][Tt]|[Cc][Oo][Ll][Ll][Aa][Tt][Ii][Nn][Gg]\p{space}+[Ssſ][Ee][Qq][Uu][Ee][Nn][Cc][Ee]|[Cc][Oo][Ll][Ll][Aa][Tt][Ii][Nn][Gg]|[Ssſ][Tt][Aa][Rr][Tt]|[Ssſ][Ee][Rr][Vv][Ii][Cc][Ee]|[Ssſ][Uu][Bb][Tt][Rr][Aa][Cc][Tt]|[Ssſ][Uu][Pp][Pp][Rr][Ee][Ssſ][Ssſ]|[Tt][Ee][Rr][Mm][Ii][Nn][Aa][Tt][Ee]|[Tt][Hh][Ee][Nn]|[Uu][Nn][Ll][Oo][Cc][KKk]|[Ssſ][Tt][Rr][Ii][Nn][Gg]|[Uu][Nn][Ssſ][Tt][Rr][Ii][Nn][Gg]|[Vv][Aa][Ll][Ii][Dd][Aa][Tt][Ee]|[Ww][Rr][Ii][Tt][Ee]|[Nn][Ee][Xx][Tt]|[Ssſ][Tt][Aa][Tt][Ee][Mm][Ee][Nn][Tt]|[Ssſ][Ee][Nn][Tt][Ee][Nn][Cc][Ee])(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.verb.cobol"
    },
    {
      match: /(?<![\-_])[Tt][Hh][Rr][Ee][Aa][Dd]-[Ll][Oo][Cc][Aa][Ll](?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.verb.cobol"
    },
    {
      match: /(\p{space}+|^)(?:[Ff][Oo][Rr][Ee][Gg][Rr][Oo][Uu][Nn][Dd]-[Cc][Oo][Ll][Oo][Rr]|[Bb][Aa][Cc][KKk][Gg][Rr][Oo][Uu][Nn][Dd]-[Cc][Oo][Ll][Oo][Rr]|[Pp][Rr][Oo][Mm][Pp][Tt]|[Uu][Nn][Dd][Ee][Rr][Ll][Ii][Nn][Ee]|[Rr][Ee][Vv][Ee][Rr][Ssſ][Ee]-[Vv][Ii][Dd][Ee][Oo]|[Nn][Oo]-[Ee][Cc][Hh][Oo]|[Hh][Ii][Gg][Hh][Ll][Ii][Gg][Hh][Tt]|[Bb][Ll][Ii][Nn][KKk])(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.screens.cobol"
    },
    {
      match: /(\p{space}+|^)(?:[Bb][Oo][Ll][Dd]|[Hh][Ii][Gg][Hh]|[Ll][Oo][Ww][Ll][Ii][Gg][Hh][Tt]|[Ll][Oo][Ww]|[Bb][Aa][Cc][KKk][Gg][Rr][Oo][Uu][Nn][Dd]-[Hh][Ii][Gg][Hh]|[Bb][Aa][Cc][KKk][Gg][Rr][Oo][Uu][Nn][Dd]-[Ll][Oo][Ww]|[Bb][Aa][Cc][KKk][Gg][Rr][Oo][Uu][Nn][Dd]-[Ssſ][Tt][Aa][Nn][Dd][Aa][Rr][Dd])(?![\-0-9A-Z_a-z])/dgv,
      name: "invalid.illegal.screens.acu.cobol"
    },
    {
      match: /(?<![\-_])(?:internal|public|protected|final|private|static|new|abstract|override|readonly|property|async-void|async-value|async)(?=[\.\p{space}])/dgiv,
      name: "storage.modifier.cobol"
    },
    {
      match: /[\<\=\>]|<=|>=|<>|[\-\*\+\/]|(?<![\-_])(?:[Bb]-[Aa][Nn][Dd]|[Bb]-[Oo][Rr]|[Bb]-[Xx][Oo][Rr]|[Bb]-[Ee][Xx][Oo][Rr]|[Bb]-[Nn][Oo][Tt]|[Bb]-[Ll][Ee][Ff][Tt]|[Bb]-[Rr][Ii][Gg][Hh][Tt]|[Aa][Nn][Dd]|[Oo][Rr]|[Ee][Qq][Uu][Aa][Ll][Ssſ]?|[Gg][Rr][Ee][Aa][Tt][Ee][Rr]\p{space}+[Tt][Hh][Aa][Nn]|[Ll][Ee][Ssſ][Ssſ]\p{space}+[Tt][Hh][Aa][Nn]|[Gg][Rr][Ee][Aa][Tt][Ee][Rr])(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.operator.cobol"
    },
    {
      match: /[Nn][Oo][Tt]\p{space}+[Aa][Tt]\p{space}+[Ee][Nn][Dd](?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.verb.cobol"
    },
    {
      match: /(?<![\-_])[Nn][Oo][Tt](?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.operator.cobol"
    },
    {
      match: /(?<![\-_])(?:[Ssſ][Yy][Ssſ][Oo][Uu][Tt]-[Ff][Ll][Uu][Ssſ][Hh]|[Ssſ][Yy][Ssſ][Ii][Nn]|[Ssſ][Tt][Dd][Ee][Rr][Rr]|[Ssſ][Tt][Dd][Oo][Uu][Tt]|[Cc][Ssſ][Pp]|[Ssſ][Tt][Dd][Ii][Nn]|[Ssſ][Yy][Ssſ][Ii][Pp][Tt]|[Ssſ][Yy][Ssſ][Oo][Uu][Tt]|[Ssſ][Yy][Ssſ][Pp][Rr][Ii][Nn][Tt]|[Ssſ][Yy][Ssſ][Ll][Ii][Ssſ][Tt]|[Ssſ][Yy][Ssſ][Ll][Ssſ][Tt]|[Pp][Rr][Ii][Nn][Tt][Ee][Rr]|[Ssſ][Yy][Ssſ][Ee][Rr][Rr]|[Cc][Oo][Nn][Ssſ][Oo][Ll][Ee]|[Cc]01|[Cc]02|[Cc]03|[Cc]04|[Cc]05|[Cc]06|[Cc]07|[Cc]08|[Cc]09|[Cc]10|[Cc]11|[Cc]12|[Ff][Oo][Rr][Mm][Ff][Ee][Ee][Dd]|[Ssſ][Ww][Ii][Tt][Cc][Hh]-0|[Ssſ][Ww][Ii][Tt][Cc][Hh]-10|[Ssſ][Ww][Ii][Tt][Cc][Hh]-11|[Ssſ][Ww][Ii][Tt][Cc][Hh]-12|[Ssſ][Ww][Ii][Tt][Cc][Hh]-13|[Ssſ][Ww][Ii][Tt][Cc][Hh]-14|[Ssſ][Ww][Ii][Tt][Cc][Hh]-15?|[Ssſ][Ww][Ii][Tt][Cc][Hh]-2|[Ssſ][Ww][Ii][Tt][Cc][Hh]-3|[Ssſ][Ww][Ii][Tt][Cc][Hh]-4|[Ssſ][Ww][Ii][Tt][Cc][Hh]-5|[Ssſ][Ww][Ii][Tt][Cc][Hh]-6|[Ssſ][Ww][Ii][Tt][Cc][Hh]-7|[Ssſ][Ww][Ii][Tt][Cc][Hh]-8|[Ssſ][Ww][Ii][Tt][Cc][Hh]-9|[Ssſ][Ww]0|[Ssſ][Ww]11|[Ssſ][Ww]12|[Ssſ][Ww]13|[Ssſ][Ww]14|[Ssſ][Ww]15?|[Ssſ][Ww]2|[Ssſ][Ww]3|[Ssſ][Ww]4|[Ssſ][Ww]5|[Ssſ][Ww]6|[Ssſ][Ww]7|[Ssſ][Ww]8|[Ssſ][Ww]9|[Ssſ][Ww]10|[Ll][Cc]_[Aa][Ll][Ll]|[Ll][Cc]_[Cc][Oo][Ll][Ll][Aa][Tt][Ee]|[Ll][Cc]_[Cc][Tt][Yy][Pp][Ee]|[Ll][Cc]_[Mm][Ee][Ssſ][Ssſ][Aa][Gg][Ee][Ssſ]|[Ll][Cc]_[Mm][Oo][Nn][Ee][Tt][Aa][Rr][Yy]|[Ll][Cc]_[Nn][Uu][Mm][Ee][Rr][Ii][Cc]|[Ll][Cc]_[Tt][Ii][Mm][Ee]|[Uu][Cc][Ssſ]-4|[Uu][Tt][Ff]-8|[Uu][Tt][Ff]-16)(?![\-0-9A-Z_a-z])/dgv,
      name: "support.type.cobol"
    },
    {
      match: /(?<![\-_])(?:[Pp][Rr][Oo][Cc][Ee][Ssſ][Ssſ][Ii][Nn][Gg][^\n]*[Pp][Rr][Oo][Cc][Ee][Dd][Uu][Rr][Ee]|[Xx][Mm][Ll]-[Ii][Nn][Ff][Oo][Rr][Mm][Aa][Tt][Ii][Oo][Nn]|[Xx][Mm][Ll]-[Tt][Ee][Xx][Tt]|[Xx][Mm][Ll]-[Ssſ][Cc][Hh][Ee][Mm][Aa][Ll]|[Xx][Mm][Ll]-[Dd][Ee][Cc][Ll][Aa][Rr][Aa][Tt][Ii][Oo][Nn])(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.xml.cobol"
    },
    {
      match: /(?<![\-_])(?:[Jj][Ssſ][Oo][Nn]\p{space}+[Gg][Ee][Nn][Ee][Rr][Aa][Tt][Ee]|[Jj][Ssſ][Oo][Nn]|[Ee][Nn][Dd]-[Jj][Ssſ][Oo][Nn]|[Nn][Aa][Mm][Ee]\p{space}[Oo][Ff])(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.json.cobol"
    },
    {
      match: /(?<![\-_])(?:modify|inquire|tab|title|event|center|label-offset|cell|help-id|cells|push-button|radio-button|page-layout-screen|entry-field|list-box|label|default-font|id|no-tab|unsorted|color|height|width|bind|thread|erase|modeless|scroll|system|menu|title-bar|wrap|destroy|resizeable|user-gray|large-font|newline|3-d|data-columns|display-columns|alignment|separation|cursor-frame-width|divider-color|drag-color|heading-color|heading-divider-color|num-rows|record-data|tiled-headings|vpadding|centered-headings|column-headings|self-act|cancel-button|vscroll|report-composer|clsid|primary-interface|active-x-control|default-interface|default-source|auto-minimize|auto-resize|resource|engraved|initial-state|frame|acuactivexcontrol|activex-res|grid|box|message|namespace|class-name|module|constructor|version|strong|culture|method|handle|exception-value|read-only|dividers|graphical|indexed|termination-value|permanent|boxed|visible|centered|record-position|convert)(?=[\,\.\;\p{space}]|(?=\n?$))/dgiv,
      name: "invalid.illegal.acu.cobol"
    },
    {
      match: /(?<![\-_])(?:actual|auto|automatic|based-storage|complex|connect|contained|core-index|db-access-control-key|db-data-name|db-exception|db-record-name|db-set-name|db-status|dead-lock|endcobol|end-disable|end-enable|end-send|end-transceive|eos|file-limits?|formatted|sort-status|usage-mode)(?=[\,\.\;\p{space}]|(?=\n?$))/dgiv,
      name: "invalid.illegal.netcobol.cobol"
    },
    {
      match: /(?<![\-_])(?:[Ssſ][Yy][Ssſ][Tt][Ee][Mm]|[Tt][Ee][Rr][Mm][Ii][Nn][Aa][Ll])-[Ii][Nn][Ff][Oo](?![\-0-9A-Z_a-z])/dgv,
      name: "support.type.cobol.acu strong"
    },
    {
      match: /(?<![\-_])alter(?=[\.\p{space}])/dgiv,
      name: "invalid.illegal.cobol"
    },
    {
      match: /(?<![\-_])(?:[Aa][Pp][Pp][Ll][Yy]|[Aa][Rr][Ee][Aa][Ssſ]?|[Cc][Ll][Oo][Cc][KKk]-[Uu][Nn][Ii][Tt][Ssſ]|[Cc][Oo][Dd][Ee]|[Cc][Oo][Mm]-[Rr][Ee][Gg]|[Cc][Oo][Nn][Tt][Rr][Oo][Ll][Ssſ]|[Dd][Bb][Cc][Ssſ]|[Dd][Ee][Ssſ][Tt][Ii][Nn][Aa][Tt][Ii][Oo][Nn]|[Dd][Ee][Tt][Aa][Ii][Ll]|[Dd][Ii][Ssſ][Pp][Ll][Aa][Yy]-1|[Ee][Nn][Dd][Ii][Nn][Gg]|[Ee][Vv][Ee][Rr][Yy]|[Ii][Nn][Ssſ][Ee][Rr][Tt]|[KKk][Aa][Nn][Jj][Ii][KKk][Ee][Yy]|[Ll][Aa][Ssſ][Tt]|[Ll][Ee][Ff][Tt]|[Ll][Ee][Ssſ][Ssſ]|[Ll][Ii][Mm][Ii][Tt][Ssſ]?|[Mm][Ee][Mm][Oo][Rr][Yy]|[Mm][Ee][Tt][Aa][Cc][Ll][Aa][Ssſ][Ssſ]|[Mm][Oo][Dd][Uu][Ll][Ee][Ssſ]|[Mm][Oo][Rr][Ee]-[Ll][Aa][Bb][Ee][Ll][Ssſ]|[Mm][Uu][Ll][Tt][Ii][Pp][Ll][Ee]|[Nn][Aa][Tt][Ii][Vv][Ee]_[Bb][Ii][Nn][Aa][Rr][Yy]|[Nn][Aa][Tt][Ii][Vv][Ee]|[Nn][Ee][Gg][Aa][Tt][Ii][Vv][Ee]|[Nn][Uu][Mm][Bb][Ee][Rr]|[Nn][Uu][Mm][Ee][Rr][Ii][Cc]-[Ee][Dd][Ii][Tt][Ee][Dd]|[Oo][Tt][Hh][Ee][Rr]|[Pp][Aa][Dd][Dd][Ii][Nn][Gg]|[Pp][Aa][Ssſ][Ssſ][Ww][Oo][Rr][Dd]|[Pp][Ff]|[Pp][Hh]|[Pp][Oo][Ssſ][Tt][Ii][Vv][Ee]|[Pp][Rr][Oo][Cc][Ee][Ssſ][Ssſ][Ii][Nn][Gg]|[Qq][Uu][Ee][Uu][Ee]|[Rr][Ee][Cc][Oo][Rr][Dd][Ii][Nn][Gg]|[Rr][Ee][Ll][Oo][Aa][Dd]|[Rr][Ee][Mm][Oo][Vv][Aa][Ll]|[Rr][Ee][Rr][Uu][Nn]|[Rr][Ee][Ssſ][Ee][Rr][Vv][Ee][Dd]??|[Rr][Ee][Ww][Ii][Nn][Dd]|[Ssſ][Ee][Gg][Mm][Ee][Nn][Tt]-[Ll][Ii][Mm][Ii][Tt]|[Ssſ][Ee][Gg][Mm][Ee][Nn][Tt]|[Ssſ][Ee][Pp][Aa][Rr][Aa][Tt][Ee]|[Ssſ][Ee][Qq][Uu][Ee][Nn][Cc][Ee]|[Ssſ][KKk][Ii][Pp]1|[Ssſ][KKk][Ii][Pp]2|[Ssſ][KKk][Ii][Pp]3|[Ssſ][Tt][Aa][Nn][Dd][Aa][Rr][Dd]-1|[Ssſ][Tt][Aa][Nn][Dd][Aa][Rr][Dd]-2|[Ssſ][Uu][Bb]-[Qq][Uu][Ee][Uu][Ee]-1|[Ssſ][Uu][Bb]-[Qq][Uu][Ee][Uu][Ee]-2|[Ssſ][Uu][Bb]-[Qq][Uu][Ee][Uu][Ee]-3|[Ssſ][Uu][Mm]|[Ssſ][Yy][Mm][Bb][Oo][Ll][Ii][Cc]|[Ssſ][Yy][Nn][Cc][Hh][Rr][Oo][Nn][Ii][Zz][Ee][Dd]|[Ssſ][Yy][Nn][Cc]|[Tt][Aa][Bb][Ll][Ee]|[Tt][Ee][Ssſ][Tt]|[Tt][Ee][Xx][Tt]|[Tt][Hh][Aa][Nn]|[Tt][Oo][Pp]|[Tt][Rr][Aa][Cc][Ee]|[Tt][Rr][Aa][Ii][Ll][Ii][Nn][Gg]|[Uu][Nn][Ii][Tt]|[Ww][Oo][Rr][Dd][Ssſ]|[Ww][Rr][Ii][Tt][Ee]-[Oo][Nn][Ll][Yy]|[Aa][Tt]|[Bb][Aa][Ssſ][Ii][Ssſ]|[Bb][Ee][Gg][Ii][Nn][Nn][Ii][Nn][Gg]|[Bb][Oo][Tt][Tt][Oo][Mm]|[Cc][Bb][Ll]|[Cc][Ff]|[Cc][Hh]|[Dd][Ee]|[Pp][Oo][Ssſ][Ii][Tt][Ii][Vv][Ee]|[Ee][Gg][Cc][Ssſ]|[Ee][Gg][Ii]|[Ee][Mm][Ii]|[Ee][Nn][Dd]|[Rr][Ee][Vv][Ee][Rr][Ssſ][Ee][Dd]|[Rr][Ff]|[Rr][Hh]|[Rr][Uu][Nn]|[Ssſ][Aa][Mm][Ee]|[Oo][Rr][Dd][Ee][Rr]|[Hh][Ee][Aa][Dd][Ii][Nn][Gg]|[Ee][Ssſ][Ii])(?![\-0-9A-Z_a-z])/dgv,
      name: "keyword.ibmreserved.cobol"
    },
    {
      match: /(?<![\-_])(?:[Aa][Cc][Tt][Ii][Vv][Ee]-[Cc][Ll][Aa][Ssſ][Ssſ]|[Aa][Ll][Ii][Gg][Nn][Ee][Dd]|[Aa][Nn][Yy][Cc][Aa][Ssſ][Ee]|[Bb][Oo][Oo][Ll][Ee][Aa][Nn]|[Cc][Oo][Ll][Ssſ]?|[Cc][Oo][Nn][Dd][Ii][Tt][Ii][Oo][Nn]|[Ee][Cc]|[Ee][Oo]|[Ssſ][Yy][Ssſ][Tt][Ee][Mm]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn]-[Pp][Oo][Ii][Nn][Tt][Ee][Rr])(?![\-0-9A-Z_a-z])/dgv,
      name: "strong keyword.potential.reserved.cobol"
    },
    {
      match: /filler/dgiv,
      name: "keyword.filler.cobol"
    },
    {
      match: /(?<![\-_])(?:[Aa][Dd][Dd][Rr][Ee][Ssſ][Ssſ]-[Oo][Ff]|[Dd][Aa][Tt][Ee]|[Dd][Aa][Yy]-[Oo][Ff]-[Ww][Ee][Ee][KKk]|[Dd][Aa][Yy]|[Dd][Ee][Bb][Uu][Gg]-[Cc][Oo][Nn][Tt][Ee][Nn][Tt]|[Dd][Ee][Bb][Uu][Gg]-[Ii][Tt][Ee][Mm]|[Dd][Ee][Bb][Uu][Gg]-[Ll][Ii][Nn][Ee]|[Dd][Ee][Bb][Uu][Gg]-[Ii][Tt][Ee][Mm]|[Dd][Ee][Bb][Uu][Gg]-[Ssſ][Uu][Bb]-1|[Dd][Ee][Bb][Uu][Gg]-[Ssſ][Uu][Bb]-2|[Dd][Ee][Bb][Uu][Gg]-[Ssſ][Uu][Bb]-3|[Ssſ][Hh][Ii][Ff][Tt]-[Ii][Nn]|[Ssſ][Hh][Ii][Ff][Tt]-[Oo][Uu][Tt]|[Ssſ][Oo][Rr][Tt]-[Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Ssſ][Oo][Rr][Tt]-[Cc][Oo][Rr][Ee]-[Ssſ][Ii][Zz][Ee]|[Ssſ][Oo][Rr][Tt]-[Ff][Ii][Ll][Ee]-[Ssſ][Ii][Zz][Ee]|[Ssſ][Oo][Rr][Tt]-[Mm][Ee][Ssſ][Ssſ][Aa][Gg][Ee]|[Ssſ][Oo][Rr][Tt]-[Rr][Ee][Tt][Uu][Rr][Nn]|[Ssſ][Oo][Rr][Tt]-[Mm][Oo][Dd][Ee]-[Ssſ][Ii][Zz][Ee]|[Ssſ][Oo][Rr][Tt]-[Rr][Ee][Tt][Uu][Rr][Nn]|[Tt][Aa][Ll][Ll][Yy]|[Tt][Ii][Mm][Ee]|[Ww][Hh][Ee][Nn]-[Cc][Oo][Mm][Pp][Ii][Ll][Ee][Dd]|[Ll][Ii][Nn][Ee]-[Cc][Oo][Uu][Nn][Tt][Ee][Rr]|[Pp][Aa][Gg][Ee]-[Cc][Oo][Uu][Nn][Tt][Ee][Rr]|[Rr][Ee][Tt][Uu][Rr][Nn]-[Cc][Oo][Dd][Ee]|[Ll][Ii][Nn][Aa][Gg][Ee]-[Cc][Oo][Uu][Nn][Tt][Ee][Rr]|[Dd][Ee][Bb][Uu][Gg]-[Ll][Ii][Nn][Ee]|[Dd][Ee][Bb][Uu][Gg]-[Nn][Aa][Mm][Ee]|[Dd][Ee][Bb][Uu][Gg]-[Cc][Oo][Nn][Tt][Ee][Nn][Tt][Ssſ]|[Jj][Ssſ][Oo][Nn]-[Cc][Oo][Dd][Ee]|[Jj][Ssſ][Oo][Nn]-[Ssſ][Tt][Aa][Tt][Uu][Ssſ]|[Xx][Mm][Ll]-[Cc][Oo][Dd][Ee]|[Xx][Mm][Ll]-[Ee][Vv][Ee][Nn][Tt]|[Xx][Mm][Ll]-[Ii][Nn][Ff][Oo][Rr][Mm][Aa][Tt][Ii][Oo][Nn]|[Xx][Mm][Ll]-[Nn][Aa][Mm][Ee][Ssſ][Pp][Aa][Cc][Ee]-[Pp][Rr][Ee][Ff][Ii][Xx]|[Xx][Mm][Ll]-[Nn][Aa][Mm][Ee][Ssſ][Pp][Aa][Cc][Ee]|[Xx][Mm][Ll]-[Nn][Nn][Aa][Mm][Ee][Ssſ][Pp][Aa][Cc][Ee]-[Rr][Ee][Pp][Ff][Ii][Xx]|[Xx][Mm][Ll]-[Nn][Nn][Aa][Mm][Ee][Ssſ][Pp][Aa][Cc][Ee]|[Xx][Mm][Ll]-[Nn][Tt][Ee][Xx][Tt]|[Jj][Nn][Ii][Ee][Nn][Vv][Pp][Tt][Rr]|[Ii][Gg][Yy]-[Jj][Aa][Vv][Aa][Ii][Oo][Pp]-[Cc][Aa][Ll][Ll]-[Ee][Xx][Cc][Ee][Pp][Tt][Ii][Oo][Nn])(?![\-0-9A-Z_a-z])/dgv,
      name: "variable.language"
    },
    {
      match: /(?<![\-_])(?:shortint1|shortint2|shortint3|shortint4|shortint5|shortint6|shortint7|longint1|longint2|longint3|longint4|longint5|longint6|bigint1|bigint2|blob-locator|clob-locator|dbclob-locator|dbclob-file|blob-file|clob-file|clob|dbclob|blob|varbinary|long-varbinary|time-record|timestamp-record|timestamp-offset-record|timestamp-offset|timestamp|rowid|xml|long-varchar)(?=[\(\)\.\p{space}])/dgiv,
      name: "storage.type.sql.picture.cobol"
    },
    {
      match: /(?<![\-_])self/dgiv,
      name: "keyword.other.self.cobol"
    },
    {
      match: /(?<![\-_])super/dgiv,
      name: "keyword.other.super.cobol"
    },
    {
      match: /^([0-9][0-9][0-9][0-9][0-9][0-9])/dgv,
      name: "constant.numeric.cobol"
    },
    {
      captures: {
        "1": { name: "meta.symbol.cobol" },
        "2": { name: "constant.numeric.integer" },
        "3": { name: "meta.symbol.cobol" },
        "4": { name: "constant.numeric.integer" },
        "5": { name: "meta.symbol.cobol" }
      },
      match: /(\()([0-9]*)(:)([0-9]*)(\))/dgv
    },
    {
      match: /([\-0-9A-Z_a-z]*[0-9A-Za-z]|(#?[0-9A-Za-z]+[\-0-9A-Z_a-z]*[0-9A-Za-z]))/dgv,
      name: "meta.symbol.cobol"
    }
  ],
  repository: {
    "cics-keywords": {
      match: new EmulatedRegExp("(?<![\\-\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:abcode|abdump|abend|abort|abprogram|abstime|accum|acee|acqactivity|acqprocess|acquactivity|action|activity|activityid|actpartn|add|address|after|aid|alarm|all|allocate|alter|alternate|altscrnht|altscrnwd|and|anykey|aplkybd|apltext|applid|asa??|asis|asktime|asraintrpt|asrakey|asrapsw|asraregs|asraspc|asrastg|assign|asynchronous|at|attach|attachid|attributes|authenticate|autopage|auxiliary|base64|basicauth|below|bif|binary|bit|bodycharset|bookmark|brdata|brdatalength|brexit|bridge|browsetoken|btrans|buffer|build|burgeability|caddrlength|cancel|card|cbuff|ccsid|certificate|change|changetime|channel|char|characterset|check|chunkend|chunking|chunkno|chunkyes|cicsdatakey|ciphers|class|clear|cliconvert|client|clientaddr|clientaddrnu|clientconv|clientname|clntaddr6nu|clntipfamily|close|closestatus|clrpartn|cmdsec|cnamelength|cnotcompl|codepage|color|commarea|commonname|commonnamlen|comparemax|comparemin|complete|composite|compstatus|condition|confirm|confirmation|connect|consistent|console|container|contexttype|control|convdata|converse|convertst|converttime|convid|copy|counter|country|countrylen|create|critical|ctlchar|current|cursor|cwa|cwaleng|data1??|data2|datalength|datalenth|dataonly|datapointer|dataset|datastr|datatoxml|datatype|datcontainer|date|dateform|datesep|datestring|day|daycount|dayofmonth|dayofweek|dayofyear|days|daysleft|day-of-week|dcounter|ddmmyy|ddmmyyyy|debkey|debrec|debug-contents|debug-item|debug-line|debug-name|debug-sub-1|debug-sub-2|debug-sub-3|deedit|default|define|defresp|defscrnht|defscrnwd|delay|deleteq??|delimiter|deq|destcount|destid|destidleng|detail|detaillength|dfhresp|dfhvalue|digest|digesttype|disconnect|docdelete|docsize|docstatus|doctoken|document|ds3270|dsscs|dump|dumpcode|dumpid|duprec|ecaddr|ecblist|eib|elemname|elemnamelen|elemns|elemnslen|end|endactivity|endbr|endbrowse|endfile|endoutput|enq|enter|entry|entryname|eoc|eods|eprfield|eprfrom|eprinto|eprlength|eprset|eprtype|equal|erase|eraseaup|error|errterm|esmreason|esmresp|event|eventtype|eventual|ewasupp|exception|expect|expirytime|extds|external|extract|facility|facilitytokn|false|faultactlen|faultactor|faultcode|faultcodelen|faultcodestr|faultstring|faultstrlen|fci|fct|field|file|firestatus|flength|fmh|fmhparm|for|force|formattime|formfeed|formfield|free|freekb|freemain|from|fromactivity|fromccsid|fromchannel|fromcodepage|fromdoc|fromflength|fromlength|fromprocess|frset|fulldate|function|gchars|gcodes|gds|generic|get|getmain|getnext|gmmi|groupid|gtec|gteq|handle|head|header|hex|high-values??|hilight|hold|honeom|host|hostcodepage|hostlength|hosttype|hours|httpheader|httpmethod|httprnum|httpversion|httpvnum|ignore|immediate|in|increment|initimg|initparm|initparmlen|inpartn|input|inputevent|inputmsg|inputmsglen|inquire|insert|integer|interval|into|intoccsid|intocodepage|invalidcount|invite|invmpsz|invoke|invokingprog|invpartn|invreq|issuer??|item|iutype|journalname|jtypeid|jusfirst|juslast|justify|katakana|keep|keylength|keynumber|l40|l64|l80|label|langinuse|languagecode|last|lastusetime|ldc|ldcmnem|ldcnum|leavekb|length|lengthlist|level|lightpen|linage-counter|line|lineaddr|line-counter|link|list|listlength|llid|load|locality|localitylen|logmessage|logmode|logonlogmode|logonmsg|low-values??|luname|main|map|mapcolumn|mapfail|mapheight|mapline|maponly|mapped|mappingdev|mapset|mapwidth|massinsert|maxdatalen|maxflength|maximum|maxlength|maxlifetime|maxproclen|mcc|mediatype|message|messageid|metadata|metadatalen|method|methodlength|milliseconds|minimum|minutes|mmddyy|mmddyyyy|mode|modename|monitor|month|monthofyear|move|msr|msrcontrol|name|namelength|natlang|natlanginuse|netname|newpassword|newphrase|newphraselen|next|nexttransid|nleom|noautopage|nocc|nocheck|nocliconvert|noclose|nodata|node|nodocdelete|nodump|noedit|noflush|nohandle|noinconvert|none|nooutconert|noqueue|noquiesce|nosrvconvert|nosuspend|note|notpurgeable|notruncate|nowait|nscontainer|nulls??|numciphers|numevents|numitems|numrec|numroutes|numsegments|numtab|of|oidcard|on|opclass|open|operation|operator|operid|operkeys|operpurge|opid|opsecurity|options|or|orgabcode|organization|organizatlen|orgunit|orgunitlen|outdescr|outline|outpartn|output|owner|pa1|pa2|pa3|page|pagenum|page-counter|paging|parse|partn|partner|partnfail|partnpage|partns|partnset|pass|passbk|password|passwordlen|path|pathlength|pct|pf10??|pf11|pf12|pf13|pf14|pf15|pf16|pf17|pf18|pf19|pf20??|pf21|pf22|pf23|pf24|pf3|pf4|pf5|pf6|pf7|pf8|pf9|pfxleng|phrase|phraselen|piplength|piplist|point|pool|pop|portnumber|portnumnu|post|ppt|predicate|prefix|prepare|princonvid|prinsysid|print|priority|privacy|process|processtype|proclength|procname|profile|program|protect|ps|punch|purge|purgeable|push|put|qname|query|queryparm|querystring|querystrlen|queue|quotes??|random|rba|rbn|rdatt|read|readnext|readprev|readq|reattach|receiver??|recfm|record|recordlen|recordlength|reduce|refparms|refparmslen|relatesindex|relatestype|relatesuri|release|remove|repeatable|repetable|replace|reply|replylength|reqid|requesttype|resclass|reset|resetbr|resid|residlength|resource|resp2??|ressec|restart|restype|result|resume|retain|retcode|retcord|retriece|retrieve|return|returnprog|return-code|rewind|rewrite|ridfld|role|rolelength|rollback|route|routecodes|rprocess|rresource|rrn|rtermid|rtransid|run|saddrlength|scheme|schemename|scope|scopelen|scrnht|scrnwd|seconds|security|segmentlist|send|sender|serialnum|serialnumlen|server|serveraddr|serveraddrnu|serverconv|servername|service|session|sesstoken|set|shared|shift-in|shift-out|sigdata|signal|signoff|signon|sit|snamelength|soapfault|sort-control|sort-core-size|sort-file-size|sort-message|sort-mode-size|sort-return|sosi|spaces??|spoolclose|spoolopen|spoolread|spoolwrite|srvconvert|srvraddr6nu|srvripfamily|ssltype|start|startbr|startbrowse|startcode|state|statelen|stationid|status|statuscode|statuslen|statustext|storage|strfield|stringformat|subaddr|subcodelen|subcodestr|subevent1??|subevent2|subevent3|subevent4|subevent5|subevent6|subevent7|subevent8|sum|suspend|suspstatus|symbol|symbollist|synchronous|synclevel|synconreturn|syncpoint|sysid|tables|tally|task|taskpriority|tcpip|tcpipservice|tct|tctua|tctualeng|td|tellerid|template|termcode|termid|terminal|termpriority|test|text|textkybd|textlength|textprint|time|timeout|timer|timesep|title|to|toactivity|tochannel|tocontainer|toflength|token|tolength|toprocess|trace|tracenum|trailer|tranpriority|transaction|transform|transid|trigger|trt|true|ts|twa|twaleng|type|typename|typenamelen|typens|typenslen|unattend|uncommitted|unescaped|unexpin|unlock|until|uow|update|uri|urimap|url|urllength|userdatakey|userid|username|usernamelen|userpriority|using|validation|value|valuelength|verify|versionlen|volume|volumeleng|wait|waitcics|web|when-compiled|wpmedia1|wpmedia2|wpmedia3|wpmedia4|wrap|writeq??|wsacontext|wsaepr|xctl|xmlcontainer|xmltodata|xmltransform|xrba|year|yyddd|yyddmm|yymmdd|yyyyddd|yyyyddmm|yyyymmdd|zero|zeroes|zeros)(?![\\-\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgiv", { lazyCompile: true }),
      name: "keyword.verb.cics"
    },
    "dli-keywords": {
      match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(?:accept|chkp|deq|dlet|gnp?|gu|isrt|load|log|pos|query|refresh|repl|retrieve|rolb|roll|rols|schd|sets|setu|symchkp|term|xrst)(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
      name: "keyword.verb.dli"
    },
    "dli-options": {
      match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(?:statusgroup|checkpoint|chkp|id|lockclass|segment|info|where|from|using|keyfeedback|feedbacklen|variable|first|last|current|seglength|offset|locked|movenext|getfirst|set|setcond|setzero|setparent|fieldlength|keys|maxlength|length[0-9]*|area[0-9]*|psc|pcs|pcb|sysserve|into)(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
      name: "keyword.other.dli"
    },
    "number-complex-constant": {
      match: /([\-\+])?((([0-9]+(\.[0-9]+))|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)([DFLUdflu]|UL|ul)?(?=\p{space}|\.(?=\n?$)|[\)\,])/dgv,
      name: "constant.numeric.cobol"
    },
    "number-simple-constant": {
      match: /([\-\+])?([0-9]+)(?=\p{space}|\.(?=\n?$)|[\)\,])/dgv,
      name: "constant.numeric.cobol"
    },
    "string-double-quoted-constant": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /("|(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      }
    },
    "string-quoted-constant": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.cobol" }
      },
      end: /('|(?=\n?$))/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.cobol" }
      },
      name: "string.quoted.single.cobol"
    }
  },
  dependencies: [
    "html",
    "java"
  ]
};
