import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "sas",
  displayName: "SAS",
  scopeName: "source.sas",
  patterns: [
    { include: "#starComment" },
    { include: "#blockComment" },
    { include: "#macro" },
    { include: "#constant" },
    { include: "#quote" },
    { include: "#operator" },
    {
      begin: /\b(data)\p{space}+/dgiv,
      beginCaptures: {
        "1": { name: "keyword.other.sas" }
      },
      end: /(;)/dgv,
      patterns: [
        { include: "#blockComment" },
        { include: "#dataSet" },
        {
          captures: {
            "1": { name: "keyword.other.sas" },
            "2": { name: "keyword.other.sas" }
          },
          match: /(?:(stack|pgm|view|source)\p{space}?=\p{space}?|(debug|nesting|nolist))/dgiv
        }
      ]
    },
    {
      begin: /\b(set|update|modify|merge)\p{space}+/dgiv,
      beginCaptures: {
        "1": { name: "support.function.sas" },
        "2": { name: "entity.name.class.sas" },
        "3": { name: "entity.name.class.sas" }
      },
      end: /(;)/dgv,
      patterns: [
        { include: "#blockComment" },
        { include: "#dataSet" }
      ]
    },
    {
      match: /\b(if|while|until|for|do|end|then|else|run|quit|cancel|options)\b/dgiv,
      name: "keyword.control.sas"
    },
    {
      captures: {
        "1": { name: "support.class.sas" },
        "3": { name: "entity.name.function.sas" }
      },
      match: /(%(bquote|do|else|end|eval|global|goto|if|inc|include|index|input|length|let|list|local|lowcase|macro|mend|nrbquote|nrquote|nrstr|put|qscan|qsysfunc|quote|run|scan|str|substr|syscall|sysevalf|sysexec|sysfunc|sysrc|then|to|unquote|upcase|until|while|window))\b\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]*)/dgiv,
      name: "keyword.other.sas"
    },
    {
      begin: /\b(proc\p{space}*(sql))\b/dgiv,
      beginCaptures: {
        "1": { name: "support.function.sas" },
        "2": { name: "support.class.sas" }
      },
      end: /\b(quit)\p{space}*;/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.sas" }
      },
      name: "meta.sql.sas",
      patterns: [
        { include: "#starComment" },
        { include: "#blockComment" },
        { include: "source.sql" }
      ]
    },
    {
      match: /\b(by|label|format)\b/dgiv,
      name: "keyword.datastep.sas"
    },
    {
      captures: {
        "1": { name: "support.function.sas" },
        "2": { name: "support.class.sas" }
      },
      match: /\b(proc ([\p{L}\p{M}\p{N}\p{Pc}]+))\b/dgiv,
      name: "meta.function-call.sas"
    },
    {
      match: /\b(_(?:n_|error_))\b/dgiv,
      name: "variable.language.sas"
    },
    {
      captures: {
        "1": { name: "support.class.sas" }
      },
      match: new EmulatedRegExp("\\b(_all_|_character_|_cmd_|_freq_|_i_|_infile_|_last_|_msg_|_null_|_numeric_|_temporary_|_type_|abort|abs|addr|adjrsq|airy|alpha|alter|altlog|altprint|and|arcos|array|arsin|as|atan|attrc|attrib|attrn|authserver|autoexec|awscontrol|awsdef|awsmenu|awsmenumerge|awstitle|backward|band|base|betainv|between|blocksize|blshift|bnot|bor|brshift|bufno|bufsize|bxor|by|byerr|byline|byte|calculated|call|cards4??|case|catcache|cbufno|cdf|ceil|center|cexist|change|chisq|cinv|class|cleanup|close|cnonct|cntllev|coalesce|codegen|col|collate|collin|column|comamid|comaux1|comaux2|comdef|compbl|compound|compress|config|continue|convert|cosh??|cpuid|create|cross|crosstab|css|curobs|cv|daccdb|daccdbsl|daccsl|daccsyd|dacctab|dairy|datalines4??|date|datejul|datepart|datetime|day|dbcslang|dbcstype|dclose|ddm|delete|delimiter|depdb|depdbsl|depsl|depsyd|deptab|dequote|descending|descript|design=|device|dflang|dhms|dif|digamma|dim|dinfo|display|distinct|dkricond|dkrocond|dlm|dnum|do|dopen|doptname|doptnum|dread|drop|dropnote|dsname|dsnferr|echo|else|emaildlg|emailid|emailpw|emailserver|emailsys|encrypt|end|endsas|engine|eof|eov|erfc??|error|errorcheck|errors|exist|exp|fappend|fclose|fcol|fdelete|feedback|fetch|fetchobs|fexist|fget|file|fileclose|fileexist|filefmt|filename|fileref|filevar|finfo|finv|fipnamel??|fipstate|first|firstobs|floor|fmterr|fmtsearch|fnonct|fnote|font|fontalias|footnote[1-9]?|fopen|foptname|foptnum|force|formatted|formchar|formdelim|formdlim|forward|fpoint|fpos|fput|fread|frewind|frlen|from|fsep|full|fullstimer|fuzz|fwrite|gaminv|gamma|getoption|getvarc|getvarn|go|goto|group|gwindow|hbar|hbound|helpenv|helploc|hms|honorappearance|hosthelp|hostprint|hour|hpct|html|hvar|ibessel|ibr|id|if|indexc??|indexw|infile|informat|initcmd|initstmt|inner|inputc??|inputn|inr|insert|int|intck|intnx|into|intrr|invaliddata|irr|is|jbessel|join|juldate|keep|kentb|kurtosis|label|lag|last|lbound|leave|left|length|levels|lgamma|lib|libname|library|libref|line|linesize|link|list|log|log10|log2|logpdf|logpmf|logsdf|lostcard|lowcase|lrecl|ls|macro|macrogen|maps|mautosource|max|maxdec|maxr|mdy|mean|measures|median|memtype|merge|merror|min|minute|missing|missover|mlogic|mode??|model|modify|month|mopen|mort|mprint|mrecall|msglevel|msymtabmax|mvarsize|myy|n|nest|netpv|news??|nmiss|no|nobatch|nobs|nocaps|nocardimage|nocenter|nocharcode|nocmdmac|nocol|nocum|nodate|nodbcs|nodetails|nodmr|nodms|nodmsbatch|nodup|nodupkey|noduplicates|noechoauto|noequals|noerrorabend|noexitwindows|nofullstimer|noicon|noimplmac|noint|nolist|noloadlist|nomiss|nomlogic|nomprint|nomrecall|nomsgcase|nomstored|nomultenvappl|nonotes|nonumber|noobs|noovp|nopad|nopercent|noprint|noprintinit|normal|norow|norsasuser|nosetinit|nosource2??|nosplash|nosymbolgen|notes??|notitles??|notsorted|noverbose|noxsync|noxwait|npv|null|number|numkeys|nummousekeys|nway|obs|ods|on|open|option|order|ordinal|otherwise|out|outer|outp=|output|over|ovp|p([15]|10|25|50|75|90|95|99)|pad2??|page|pageno|pagesize|paired|parm|parmcards|path|pathdll|pathname|pdf|peekc??|pfkey|pmf|point|poisson|poke|position|printer|probbeta|probbnml|probchi|probf|probgam|probhypr|probit|probnegb|probnorm|probsig|probt|procleave|project|prt|propcase|prxmatch|prxparse|prxchange|prxposn|ps|putc??|putn|pw|pwreq|qtr|quote|r|ranbin|rancau|ranexp|rangam|range|ranks|rannor|ranpoi|rantbl|rantri|ranuni|read|recfm|register|regr|remote|remove|rename|repeat|replace|resolve|retain|return|reuse|reverse|rewind|right|round|rsquare|rtf|rtrace|rtraceloc|s2??|samploc|sasautos|sascontrol|sasfrscr|sashelp|sasmsg|sasmstore|sasscript|sasuser|saving|scan|sdf|second|select|selection|separated|seq|serror|set|setcomm|setot|sign|simple|sinh??|siteinfo|skewness|skip|sle|sls|sortedby|sortpgm|sortseq|sortsize|soundex|source2|spedis|splashlocation|split|spool|sqrt|start|std|stderr|stdin|stfips|stimer|stnamel??|stop|stopover|strip|subgroup|subpopn|substr|sum|sumwgt|symbol|symbolgen|symget|symput|sysget|sysin|sysleave|sysmsg|sysparm|sysprint|sysprintfont|sysprod|sysrc|system|t|tables??|tanh??|tapeclose|tbufsize|terminal|test|then|time|timepart|tinv|title[1-9]?|tnonct|to|today|tol|tooldef|totper|transformout|translate|trantab|tranwrd|trigamma|trimn??|trunc|truncover|type|unformatted|uniform|union|until|upcase|update|user|usericon|uss|validate|value|var|varfmt|varinfmt|varlabel|varlen|varname|varnum|varrayx??|vartype|verify|vformatd??|vformatdx|vformatnx??|vformatwx??|vformatx|vinarrayx??|vinformatd??|vinformatdx|vinformatnx??|vinformatwx??|vinformatx|vlabelx??|vlengthx??|vnamex??|vnferr|vtypex??|weekday|weight|when|where|while|wincharset|window|work|workinit|workterm|write|wsumx??|x|xsync|xwait|year|yearcutoff|yes|yyq|zipfips|zipnamel??|zipstate)\\b", "dgiv", { lazyCompile: true }),
      name: "support.function.sas"
    }
  ],
  repository: {
    blockComment: {
      patterns: [
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.slashstar.sas"
        }
      ]
    },
    constant: {
      patterns: [
        {
          match: /(?<![\&\}])\b[0-9]*\.?[0-9]+([DEde][\-\+]?[0-9]+)?\b/dgv,
          name: "constant.numeric.sas"
        },
        {
          match: /(')([^']+)(')(dt|[dt])/dgv,
          name: "constant.numeric.quote.single.sas"
        },
        {
          match: /(")([^"]+)(")(dt|[dt])/dgv,
          name: "constant.numeric.quote.double.sas"
        }
      ]
    },
    dataSet: {
      patterns: [
        {
          begin: /(([\p{L}\p{M}\p{N}\p{Pc}]+)\.)?([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}?\(/dgv,
          beginCaptures: {
            "2": { name: "entity.name.class.libref.sas" },
            "3": { name: "entity.name.class.dsname.sas" }
          },
          end: /\)/dgv,
          patterns: [
            { include: "#dataSetOptions" },
            { include: "#blockComment" },
            { include: "#macro" },
            { include: "#constant" },
            { include: "#quote" },
            { include: "#operator" }
          ]
        },
        {
          captures: {
            "2": { name: "entity.name.class.libref.sas" },
            "3": { name: "entity.name.class.dsname.sas" }
          },
          match: /\b(([\p{L}\p{M}\p{N}\p{Pc}]+)\.)?([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv
        }
      ]
    },
    dataSetOptions: {
      patterns: [
        {
          match: /(?<=[\(\)\p{space}])(?:ALTER|BUFNO|BUFSIZE|CNTLLEV|COMPRESS|DLDMGACTION|ENCRYPT|ENCRYPTKEY|EXTENDOBSCOUNTER|GENMAX|GENNUM|INDEX|LABEL|OBSBUF|OUTREP|PW|PWREQ|READ|REPEMPTY|REPLACE|REUSE|ROLE|SORTEDBY|SPILL|TOBSNO|TYPE|WRITE|FILECLOSE|FIRSTOBS|IN|OBS|POINTOBS|WHERE|WHEREUP|IDXNAME|IDXWHERE|DROP|KEEP|RENAME)\p{space}?=/dgiv,
          name: "keyword.other.sas"
        }
      ]
    },
    macro: {
      patterns: [
        {
          match: /(&+[_a-z]([0-9_a-z]+)?(\.+)?)\b/dgiv,
          name: "variable.other.macro.sas"
        }
      ]
    },
    operator: {
      patterns: [
        {
          match: /([\-\*\+\/\^])/dgv,
          name: "keyword.operator.arithmetic.sas"
        },
        {
          match: /\b(eq|ne|gt|lt|ge|le|in|not|&|and|or|min|max)\b/dgiv,
          name: "keyword.operator.comparison.sas"
        },
        {
          match: /([\<\>\^\~¬]?=(:)?|[\!\<\>\|¦¬]|^|~|<>|><|\|\|)/dgv,
          name: "keyword.operator.sas"
        }
      ]
    },
    quote: {
      patterns: [
        {
          begin: /(?<!%)(')/dgv,
          end: /(')([bx])?/dgv,
          name: "string.quoted.single.sas"
        },
        {
          begin: /(")/dgv,
          end: /(")([bx])?/dgv,
          name: "string.quoted.double.sas"
        }
      ]
    },
    starComment: {
      patterns: [
        { include: "#blockcomment" },
        {
          begin: /(?<=;)[\%\p{space}]*\*/dgv,
          end: /;/dgv,
          name: "comment.line.inline.star.sas"
        },
        {
          begin: /^[\%\p{space}]*\*/dgv,
          end: /;/dgv,
          name: "comment.line.start.sas"
        }
      ]
    }
  },
  dependencies: [
    "sql"
  ]
};
