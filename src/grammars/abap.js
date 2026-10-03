import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "abap",
  displayName: "ABAP",
  scopeName: "source.abap",
  patterns: [
    {
      captures: {
        "1": { name: "punctuation.definition.comment.abap" }
      },
      match: /^\*[^\n]*\n?/dgv,
      name: "comment.line.full.abap"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.comment.abap" }
      },
      match: /"[^\n]*\n?/dgv,
      name: "comment.line.partial.abap"
    },
    {
      match: /(?<!\P{space})##[^\n]*?(?=([\,\.\:\p{space}]))/dgv,
      name: "comment.line.pragma.abap"
    },
    {
      match: /(?<=[\-\~\p{space}])(?<=[\-\=]>)([\/_a-z][\/-9_a-z]*)(?=\p{space}+(?:|[\-\*\+\/]|&&?)=\p{space}+)/dgiv,
      name: "variable.other.abap"
    },
    {
      match: /\b[0-9]+(\b|[\,\.])/dgv,
      name: "constant.numeric.abap"
    },
    {
      match: /(^|\p{space}+)((P(?:UBLIC|RIVATE|ROTECTED))\p{space}SECTION)(?=\p{space}+|[\.\:])/dgiv,
      name: "storage.modifier.class.abap"
    },
    {
      begin: /(?<!\\)(\|)([^\n]*?)/dgv,
      beginCaptures: {
        "1": { name: "constant.character.escape.abap" }
      },
      end: /(?<!\\)(\||(\\\\\|))/dgv,
      endCaptures: {
        "1": { name: "constant.character.escape.abap" }
      },
      name: "string.interpolated.abap",
      patterns: [
        {
          match: /(\{ )|( \})/dgv,
          name: "constant.character.escape"
        },
        {
          match: /\\\|/dgv,
          name: "constant.character.escape.abap"
        },
        {
          match: /(?<=\p{space})(align|alpha|case|country|currency|date|decimals|exponent|number|pad|sign|style|time|timestamp|timezone|width|xsd|zero)(?=\p{space}=)/dgiv,
          name: "entity.name.property.stringtemplate.abap"
        },
        {
          match: /(?<==\p{space})(center|engineering|environment|in|iso|left|leftplus|leftspace|lower|no|out|raw|right|rightplus|rightspace|scale_preserving|scale_preserving_scientific|scientific|scientific_with_leading_zero|sign_as_postfix|simple|space|upper|user|yes)(?=\p{space})/dgiv,
          name: "entity.value.property.stringtemplate.abap"
        }
      ]
    },
    {
      begin: /'/dgv,
      end: /'/dgv,
      name: "string.quoted.single.abap",
      patterns: [
        {
          match: /''/dgv,
          name: "constant.character.escape.abap"
        }
      ]
    },
    {
      begin: /`/dgv,
      end: /`/dgv,
      name: "string.quoted.single.abap",
      patterns: [
        {
          match: /``/dgv,
          name: "constant.character.escape.abap"
        }
      ]
    },
    {
      begin: /^\p{space}*(class)\p{space}([\/_a-z][\/-9_a-z]*)/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.block.abap" },
        "2": { name: "entity.name.type.block.abap" }
      },
      end: /\p{space}*\.\p{space}*\n?/dgv,
      name: "meta.block.begin.implementation.abap",
      patterns: [
        {
          match: /(^|\p{space}+)(definition|implementation|public|inheriting\p{space}+from|final|deferred|abstract|shared\p{space}+memory\p{space}+enabled|(global|local)*\p{space}*friends|(create\p{space}+(p(?:ublic|rotected|rivate)))|for\p{space}+behavior\p{space}+of|for\p{space}+testing|risk\p{space}+level\p{space}+(critical|dangerous|harmless))|duration\p{space}(short|medium|long)(?=\p{space}+|\.)/dgiv,
          name: "storage.modifier.class.abap"
        },
        {
          begin: /(?=[A-Z_a-z][0-9A-Z_a-z]*)/dgv,
          contentName: "entity.name.type.block.abap",
          end: /(?![0-9A-Z_a-z])/dgv,
          patterns: [
            { include: "#generic_names" }
          ]
        }
      ]
    },
    {
      begin: /^\p{space}*(method)\p{space}(?:([\/_a-z][\/-9_a-z]*)~)?([\/_a-z][\/-9_a-z]*)/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.block.abap" },
        "2": { name: "entity.name.type.abap" },
        "3": { name: "entity.name.function.abap" }
      },
      end: /\p{space}*\.\p{space}*\n?/dgv,
      patterns: [
        {
          match: /(?<=^|\p{space})(BY(?:\p{space}+DATABASE(\p{space}+PROCEDURE|\p{space}+FUNCTION|\p{space}+GRAPH\p{space}+WORKSPACE)|\p{space}+KERNEL\p{space}+MODULE))(?=\p{space}+|\.)/dgiv,
          name: "storage.modifier.method.abap"
        },
        {
          match: /(?<=^|\p{space})(FOR\p{space}+(HDB|LLANG))(?=\p{space}+|\.)/dgiv,
          name: "storage.modifier.method.abap"
        },
        {
          match: /(?<=\p{space})(OPTIONS\p{space}+(READ-ONLY|DETERMINISTIC|SUPPRESS\p{space}+SYNTAX\p{space}+ERRORS))(?=\p{space}+|\.)/dgiv,
          name: "storage.modifier.method.abap"
        },
        {
          match: /(?<=^|\p{space})(LANGUAGE\p{space}+(SQLSCRIPT|SQL|GRAPH))(?=\p{space}+|\.)/dgiv,
          name: "storage.modifier.method.abap"
        },
        {
          captures: {
            "1": { name: "storage.modifier.method.abap" }
          },
          match: /(?<=\p{space})(USING)\p{space}+([\/_a-z][\/-9\=\>_a-z]*)+(?=\p{space}+|\.)/dgiv
        },
        {
          begin: /(?=[A-Z_a-z][0-9A-Z_a-z]*)/dgv,
          end: /(?![0-9A-Z_a-z])/dgv,
          patterns: [
            { include: "#generic_names" }
          ]
        }
      ]
    },
    {
      begin: /^\p{space}*(INTERFACE)\p{space}([\/_a-z][\/-9_a-z]*)/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.block.abap" },
        "2": { name: "entity.name.type.abap" }
      },
      end: /\p{space}*\.\p{space}*\n?/dgv,
      patterns: [
        {
          match: /(?<=^|\p{space})(DEFERRED|PUBLIC)(?=\p{space}+|\.)/dgiv,
          name: "storage.modifier.method.abap"
        }
      ]
    },
    {
      begin: /^\p{space}*(FORM)\p{space}([\/_a-z][\-\/-9\?_a-z]*)/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.block.abap" },
        "2": { name: "entity.name.type.abap" }
      },
      end: /\p{space}*\.\p{space}*\n?/dgv,
      patterns: [
        {
          match: /(?<=^|\p{space})(USING|TABLES|CHANGING|RAISING|IMPLEMENTATION|DEFINITION)(?=\p{space}+|\.)/dgiv,
          name: "storage.modifier.form.abap"
        },
        { include: "#abaptypes" },
        { include: "#keywords_followed_by_braces" }
      ]
    },
    {
      match: /(end(?:class|method|form|interface))/dgiv,
      name: "storage.type.block.end.abap"
    },
    {
      match: /(<[A-Z_a-z][0-9A-Z_a-z]*>)/dgiv,
      name: "variable.other.field.symbol.abap"
    },
    { include: "#keywords" },
    { include: "#abap_constants" },
    { include: "#reserved_names" },
    { include: "#operators" },
    { include: "#builtin_functions" },
    { include: "#abaptypes" },
    { include: "#system_fields" },
    { include: "#sql_functions" },
    { include: "#sql_types" }
  ],
  repository: {
    abap_constants: {
      match: /(?<=\p{space})(initial|null|@?space|@?abap_true|@?abap_false|@?abap_undefined|table_line|%_final|%_hints|%_predefined|col_background|col_group|col_heading|col_key|col_negative|col_normal|col_positive|col_total|adabas|as400|db2|db6|hdb|oracle|sybase|mssqlnt|pos_low|pos_high)(?=[\,\.\p{space}])/dgiv,
      name: "constant.language.abap"
    },
    abaptypes: {
      patterns: [
        {
          match: /\p{space}(abap_bool|string|xstring|any|clike|csequence|numeric|xsequence|decfloat|decfloat16|decfloat34|utclong|simple|int8|[cdfinptx])(?=[\,\.\p{space}])/dgiv,
          name: "support.type.abap"
        },
        {
          match: /\p{space}(TYPE|REF|TO|LIKE|LINE|OF|STRUCTURE|STANDARD|SORTED|HASHED|INDEX|TABLE|WITH|UNIQUE|NON-UNIQUE|SECONDARY|DEFAULT|KEY)(?=[\,\.\p{space}])/dgiv,
          name: "keyword.control.simple.abap"
        }
      ]
    },
    arithmetic_operator: {
      match: /(?<=\p{space})([\-\*\+]|\*\*|[\%\/]|DIV|MOD|BIT-AND|BIT-OR|BIT-XOR|BIT-NOT)(?=\p{space})/dgiv,
      name: "keyword.control.simple.abap"
    },
    builtin_functions: {
      match: /(?<=\p{space})(abs|sign|ceil|floor|trunc|frac|acos|asin|atan|cos|sin|tan|cosh|sinh|tanh|exp|log|log10|sqrt|strlen|xstrlen|charlen|lines|numofchar|dbmaxlen|round|rescale|nmax|nmin|cmax|cmin|boolc|boolx|xsdbool|contains|contains_any_of|contains_any_not_of|matches|line_exists|ipow|char_off|count|count_any_of|count_any_not_of|distance|condense|concat_lines_of|escape|find|find_end|find_any_of|find_any_not_of|insert|match|repeat|replace|reverse|segment|shift_left|shift_right|substring|substring_after|substring_from|substring_before|substring_to|to_upper|to_lower|to_mixed|from_mixed|translate|bit-set|line_index)(?=\()/dgiv,
      name: "entity.name.function.builtin.abap"
    },
    comparison_operator: {
      match: /(?<=\p{space})([\<\>]|<=|>=|=|<>|eq|ne|lt|le|gt|ge|cs|cp|co|cn|ca|na|ns|np|byte-co|byte-cn|byte-ca|byte-na|byte-cs|byte-ns|[moz])(?=\p{space})/dgiv,
      name: "keyword.control.simple.abap"
    },
    control_keywords: {
      match: /(^|\p{space})(at|case|catch|continue|do|elseif|else|endat|endcase|endcatch|enddo|endif|endloop|endon|endtry|endwhile|if|loop|on|raise|try|while)(?=[\.\:\p{space}])/dgiv,
      name: "keyword.control.flow.abap"
    },
    generic_names: {
      match: /[A-Z_a-z][0-9A-Z_a-z]*/dgv
    },
    keywords: {
      patterns: [
        { include: "#main_keywords" },
        { include: "#text_symbols" },
        { include: "#control_keywords" },
        { include: "#keywords_followed_by_braces" }
      ]
    },
    keywords_followed_by_braces: {
      captures: {
        "1": { name: "keyword.control.simple.abap" },
        "2": { name: "variable.other.abap" }
      },
      match: /\b(data|value|field-symbol|final|reference|resumable)\((<?[\/_a-z][\/-9_a-z]*>?)\)/dgiv
    },
    logical_operator: {
      match: /(?<=\p{space})(not|or|and)(?=\p{space})/dgiv,
      name: "keyword.control.simple.abap"
    },
    main_keywords: {
      match: new EmulatedRegExp("(?<=^|\\p{space})(abap-source|abstract|accept|accepting|access|according|action|activation|actual|add|add-corresponding|adjacent|after|alias|aliases|all|allocate|amdp|analysis|analyzer|append|appending|application|archive|area|arithmetic|as|ascending|assert|assign|assigned|assigning|association|asynchronous|at|attributes|authority|authority-check|authorization|auto|back|background|backward|badi|base|before|begin|behavior|between|binary|bit|blanks??|blocks??|bound|boundaries|bounds|boxed|break|break-point|buffer|by|bypassing|byte|byte-order|call|calling|cast|casting|cds|centered|change|changing|channels|char-to-hex|character|check|checkbox|cid|circular|class|class-data|class-events|class-methods??|class-pool|cleanup|clear|clients??|clock|clone|close|cnt|code|collect|color|column|comments??|commit|common|communication|comparing|components??|compression|compute|concatenate|cond|condense|condition|connection|constants??|contexts??|controls??|conv|conversion|convert|copy|corresponding|count|country|cover|create|currency|current|cursor|customer-function|data|database|datainfo|dataset|date|daylight|ddl|deallocate|decimals|declarations|deep|default|deferred|define|delete|deleting|demand|descending|describe|destination|detail|determine|dialog|did|directory|discarding|display|display-mode|distance|distinct|divide|divide-corresponding|dummy|duplicates??|duration|during|dynpro|edit|editor-call|empty|enabled|enabling|encoding|end|end-enhancement-section|end-of-definition|end-of-page|end-of-selection|end-test-injection|end-test-seam|endenhancement|endexec|endfunction|endian|ending|endmodule|endprovide|endselect|endwith|enhancement|enhancement-point|enhancement-section|enhancements|entities|entity|entries|entry|enum|equiv|errors|escape|escaping|events??|exact|except|exception|exception-table|exceptions|excluding|exec|execute|exists|exit|exit-command|expanding|explicit|exponent|export|exporting|extended|extension|extract|fail|failed|features|fetch|field|field-groups|field-symbols|fields|file|fill|filters??|final|find|first|first-line|fixed-point|flush|following|for|format|forward|found|frames??|free|from|full|function|function-pool|generate|get|giving|graph|groups??|handler??|hashed|having|headers??|heading|help-id|help-request|hide|hint|hold|hotspot|icon|id|identification|identifier|ignore|ignoring|immediately|implemented|implicit|import|importing|in|inactive|incl|includes??|including|increment|index|index-line|indicators|infotypes|inheriting|init|initial|initialization|inner|input|insert|instances??|intensified|interface|interface-pool|interfaces|internal|intervals|into|inverse|inverted-date|is|job|join|keep|keeping|kernel|keys??|keywords|kind|language|last|late|layout|leading|leave|left|left-justified|legacy|length|let|levels??|like|line|line-count|line-selection|line-size|linefeed|lines|link|list|list-processing|listbox|load|load-of-program|locale??|locks??|log-point|logical|lower|mapped|mapping|margin|mark|mask|match|matchcode|maximum|members|memory|mesh|message|message-id|messages|messaging|methods??|mode|modif|modifier|modify|module|move|move-corresponding|multiply|multiply-corresponding|name|nametab|native|nested|nesting|new|new-line|new-page|new-section|next|no-display|no-extension|no-gaps??|no-grouping|no-heading|no-scrolling|no-sign|no-title|no-zero|nodes|non-unicode|non-unique|number|objects??|objmgr|obligatory|occurences??|occurrences??|occurs|of|offset|on|only|open|optional|options??|order|others|out|outer|output|output-length|overflow|overlay|pack|package|padding|page|parameter|parameter-table|parameters|part|partially|pcre|perform|performing|permissions|pf-status|places|pool|position|pragmas|preceding|precompiled|preferred|preserving|primary|print|print-control|private|privileged|procedure|process|program|property|protected|provide|push|pushbutton|put|query|queue-only|queueonly|quickinfo|radiobutton|raising|ranges??|read|read-only|received??|receiving|redefinition|reduce|ref|reference|refresh|regex|reject|renaming|replace|replacement|replacing|report|reported|request|requested|required|reserve|reset|resolution|respecting|response|restore|results??|resumable|resume|retry|return|returning|right|right-justified|rollback|rows|rp-provide-from-last|run|sap|sap-spool|save|saving|scan|screen|scroll|scroll-boundary|scrolling|search|seconds|section|select|select-options|selection|selection-screen|selection-sets??|selection-table|selections|send|separated??|session|set|shared|shift|shortdump|shortdump-id|sign|simple|simulation|single|size|skip|skipping|smart|some|sort|sortable|sorted|source|specified|split|spool|spots|sql|stable|stamp|standard|start-of-selection|starting|state|statements??|statics??|statusinfo|step|step-loop|stop|structures??|style|subkey|submatches|submit|subroutine|subscreen|substring|subtract|subtract-corresponding|suffix|sum|summary|supplied|supply|suppress|switch|symbol|syntax-check|syntax-trace|system-call|system-exceptions|tab|tabbed|tables??|tableview|tabstrip|target|tasks??|test|test-injection|test-seam|testing|text|textpool|then|throw|times??|title|titlebar|to|tokens|top-lines|top-of-page|trace-file|trace-table|trailing|transaction|transfer|transformation|translate|transporting|trmac|truncate|truncation|type|type-pools??|types|uline|unassign|unbounded|under|unicode|union|unique|unit|unix|unpack|until|unwind|up|update|upper|user|user-command|using|utf-8|uuid|valid|validate|value|value-request|values|vary|varying|version|via|visible|wait|when|where|windows??|with|with-heading|with-title|without|word|work|workspace|write|xml|zone)(?=[\\,\\.\\:\\p{space}])", "dgiv", { lazyCompile: true }),
      name: "keyword.control.simple.abap"
    },
    operators: {
      patterns: [
        { include: "#other_operator" },
        { include: "#arithmetic_operator" },
        { include: "#comparison_operator" },
        { include: "#logical_operator" }
      ]
    },
    other_operator: {
      match: /(?<=\p{space})(&&?|\?=|\+=|-=|\/=|\*=|&&=|&=)(?=\p{space})/dgv,
      name: "keyword.control.simple.abap"
    },
    reserved_names: {
      match: /(?<=\p{space})(me|super)(?=[\,\.\p{space}]|->)/dgiv,
      name: "constant.language.abap"
    },
    sql_functions: {
      match: /(?<=\p{space})(abap_system_timezone|abap_user_timezone|abs|add_days|add_months|allow_precision_loss|as_geo_json|avg|bintohex|cast|ceil|coalesce|concat_with_space|concat|corr_spearman|corr|count|currency_conversion|datn_add_days|datn_add_months|datn_days_between|dats_add_days|dats_add_months|dats_days_between|dats_from_datn|dats_is_valid|dats_tims_to_tstmp|dats_to_datn|dayname|days_between|dense_rank|division|div|extract_day|extract_hour|extract_minute|extract_month|extract_second|extract_year|first_value|floor|grouping|hextobin|initcap|instr|is_valid|lag|last_value|lead|left|length|like_regexpr|locate_regexpr_after|locate_regexpr|locate|lower|lpad|ltrim|max|median|min|mod|monthname|ntile|occurrences_regexpr|over|product|rank|replace_regexpr|replace|rigth|round|row_number|rpad|rtrim|stddev|string_agg|substring_regexpr|substring|sum|tims_from_timn|tims_is_valid|tims_to_timn|to_blob|to_clob|tstmp_add_seconds|tstmp_current_utctimestamp|tstmp_is_valid|tstmp_seconds_between|tstmp_to_dats|tstmp_to_dst|tstmp_to_tims|tstmpl_from_utcl|tstmpl_to_utcl|unit_conversion|upper|utcl_add_seconds|utcl_current|utcl_seconds_between|uuid|var|weekday)(?=\()/dgiv,
      name: "entity.name.function.sql.abap"
    },
    sql_types: {
      match: /(?<=\p{space})(char|clnt|cuky|curr|datn|dats|dec|decfloat16|decfloat34|fltp|int1|int2|int4|int8|lang|numc|quan|raw|sstring|timn|tims|unit|utclong)(?=[\(\)\p{space}])/dgiv,
      name: "entity.name.type.sql.abap"
    },
    system_fields: {
      captures: {
        "1": { name: "variable.language.abap" },
        "2": { name: "variable.language.abap" }
      },
      match: /\b(sy)-(abcde|batch|binpt|calld|callr|colno|cpage|cprog|cucol|curow|datar|datlo|datum|dayst|dbcnt|dbnam|dbsysc|dyngr|dynnr|fdayw|fdpos|host|index|langu|ldbpg|lilli|linct|linno|linsz|lisel|listi|loopc|lsind|macol|mandt|marow|modno|msgid|msgli|msgno|msgty|msgv[1-4]|opsysc|pagno|pfkey|repid|saprl|scols|slset|spono|srows|staco|staro|stepl|subrc|sysid|tabix|tcode|tfill|timlo|title|tleng|tvar[0-9]|tzone|ucomm|uline|uname|uzeit|vline|wtitl|zonlo)(?=[\.\p{space}])/dgiv
    },
    text_symbols: {
      captures: {
        "1": { name: "keyword.control.simple.abap" },
        "2": { name: "constant.numeric.abap" }
      },
      match: /(?<=^|\p{space})(text)-([0-9A-Z]{1,3})(?=[\,\.\:\p{space}])/dgiv
    }
  },
  dependencies: []
};
