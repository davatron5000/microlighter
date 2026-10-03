export default {
  name: "plsql",
  displayName: "PL/SQL",
  scopeName: "source.plsql.oracle",
  patterns: [
    {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.oracle"
    },
    {
      match: /--[^\n]*(?=\n?$)/dgv,
      name: "comment.line.double-dash.oracle"
    },
    {
      match: /^\p{space}*rem\p{space}+[^\n]*(?=\n?$)/dgiv,
      name: "comment.line.sqlplus.oracle"
    },
    {
      match: /^\p{space}*prompt\p{space}+[^\n]*(?=\n?$)/dgiv,
      name: "comment.line.sqlplus-prompt.oracle"
    },
    {
      captures: {
        "1": { name: "keyword.other.oracle" },
        "2": { name: "keyword.other.oracle" }
      },
      match: /^\p{space}*(create)(\p{space}+or\p{space}+replace)?\p{space}+/dgiv,
      name: "meta.create.oracle"
    },
    {
      captures: {
        "1": { name: "keyword.other.oracle" },
        "2": { name: "keyword.other.oracle" },
        "3": { name: "entity.name.type.oracle" }
      },
      match: /\b(package)(\p{space}+body)?\p{space}+(\P{space}+)/dgiv,
      name: "meta.package.oracle"
    },
    {
      captures: {
        "1": { name: "keyword.other.oracle" },
        "2": { name: "entity.name.type.oracle" }
      },
      match: /\b(type)\p{space}+"([^"]+)"/dgiv,
      name: "meta.type.oracle"
    },
    {
      captures: {
        "1": { name: "keyword.other.oracle" },
        "2": { name: "entity.name.function.oracle" }
      },
      match: /^\p{space}*(function|procedure)\p{space}+"?([\-0-9_a-z]+)"?/dgiv,
      name: "meta.procedure.oracle"
    },
    {
      match: /[\!\:\<\>]?=|<>|[\+\<\>]|(?<!\.)\*|-|(?<!^)\/|\|\|/dgv,
      name: "keyword.operator.oracle"
    },
    {
      match: /\b(true|false|null|is\p{space}+(not\p{space}+)?null)\b/dgiv,
      name: "constant.language.oracle"
    },
    {
      match: /\b\p{Nd}+(\.\p{Nd}+)?\b/dgv,
      name: "constant.numeric.oracle"
    },
    {
      match: /\b(if|elsif|else|end\p{space}+if|loop|end\p{space}+loop|for|while|case|end\p{space}+case|continue|return|goto)\b/dgiv,
      name: "keyword.control.oracle"
    },
    {
      match: /\b(or|and|not|like)\b/dgiv,
      name: "keyword.other.oracle"
    },
    {
      match: /\b(%(isopen|found|notfound|rowcount)|commit|rollback|sqlerrm)\b/dgiv,
      name: "support.function.oracle"
    },
    {
      match: /\b(sql(?:|code))\b/dgiv,
      name: "variable.language.oracle"
    },
    {
      match: /\b(ascii|asciistr|chr|compose|concat|convert|decompose|dump|initcap|instrb??|instrc|instr2|instr4|unistr|lengthb??|lengthc|length2|length4|lower|lpad|ltrim|nchr|replace|rpad|rtrim|soundex|substr|translate|trim|upper|vsize)\b/dgiv,
      name: "support.function.builtin.char.oracle"
    },
    {
      match: /\b(add_months|current_date|current_timestamp|dbtimezone|last_day|localtimestamp|months_between|new_time|next_day|round|sessiontimezone|sysdate|tz_offset|systimestamp)\b/dgiv,
      name: "support.function.builtin.date.oracle"
    },
    {
      match: /\b(avg|count|sum|max|min|median|corr|corr_[\p{L}\p{M}\p{N}\p{Pc}]+|covar_(pop|samp)|cume_dist|dense_rank|first|group_id|grouping|grouping_id|last|percentile_cont|percentile_disc|percent_rank|rank|regr_[\p{L}\p{M}\p{N}\p{Pc}]+|row_number|stats_binomial_test|stats_crosstab|stats_f_test|stats_ks_test|stats_mode|stats_mw_test|stats_one_way_anova|stats_t_test_[\p{L}\p{M}\p{N}\p{Pc}]+|stats_wsr_test|stddev|stddev_pop|stddev_samp|var_pop|var_samp|variance)\b/dgiv,
      name: "support.function.builtin.aggregate.oracle"
    },
    {
      match: /\b(bfilename|cardinality|coalesce|decode|empty_([bc]lob)|lag|lead|listagg|lnnvl|nanvl|nullif|nvl2??|sys_(context|guid|typeid|connect_by_path|extract_utc)|uid|(current\p{space}+)?user|userenv|cardinality|(bulk\p{space}+)?collect|powermultiset(_by_cardinality)?|ora_hash|standard_hash|execute\p{space}+immediate|alter\p{space}+session)\b/dgiv,
      name: "support.function.builtin.advanced.oracle"
    },
    {
      match: /\b(bin_to_num|cast|chartorowid|from_tz|hextoraw|numtodsinterval|numtoyminterval|rawtohex|rawtonhex|to_char|to_clob|to_date|to_dsinterval|to_lob|to_multi_byte|to_nclob|to_number|to_single_byte|to_timestamp|to_timestamp_tz|to_yminterval|scn_to_timestamp|timestamp_to_scn|rowidtochar|rowidtonchar|to_binary_double|to_binary_float|to_blob|to_nchar|con_dbid_to_id|con_guid_to_id|con_name_to_id|con_uid_to_id)\b/dgiv,
      name: "support.function.builtin.convert.oracle"
    },
    {
      match: /\b(abs|acos|asin|atan2??|bit_(and|or|xor)|ceil|cosh??|exp|extract|floor|greatest|least|ln|log|mod|power|remainder|round|sign|sinh??|sqrt|tanh??|trunc)\b/dgiv,
      name: "support.function.builtin.math.oracle"
    },
    {
      match: /\b(\.(count|delete|exists|extend|first|last|limit|next|prior|trim|reverse))\b/dgiv,
      name: "support.function.builtin.collection.oracle"
    },
    {
      match: /\b(cluster_details|cluster_distance|cluster_id|cluster_probability|cluster_set|feature_details|feature_id|feature_set|feature_value|prediction|prediction_bounds|prediction_cost|prediction_details|prediction_probability|prediction_set)\b/dgiv,
      name: "support.function.builtin.data_mining.oracle"
    },
    {
      match: /\b(appendchildxml|deletexml|depth|extract|existsnode|extractvalue|insertchildxml|insertxmlbefore|xmlcast|xmldiff|xmlelement|xmlexists|xmlisvalid|insertchildxmlafter|insertchildxmlbefore|path|sys_dburigen|sys_xmlagg|sys_xmlgen|updatexml|xmlagg|xmlcdata|xmlcolattval|xmlcomment|xmlconcat|xmlforest|xmlparse|xmlpi|xmlquery|xmlroot|xmlsequence|xmlserialize|xmltable|xmltransform)\b/dgiv,
      name: "support.function.builtin.xml.oracle"
    },
    {
      match: /\b(pragma\p{space}+(autonomous_transaction|serially_reusable|restrict_references|exception_init|inline))\b/dgiv,
      name: "keyword.other.pragma.oracle"
    },
    {
      match: /\b(p([io]|io)_[\-0-9_a-z]+)\b/dgiv,
      name: "variable.parameter.oracle"
    },
    {
      match: /\b(l_[\-0-9_a-z]+)\b/dgiv,
      name: "variable.other.oracle"
    },
    {
      match: /:\b(new|old)\b/dgiv,
      name: "variable.trigger.oracle"
    },
    {
      match: /\b(connect\p{space}+by\p{space}+(nocycle\p{space}+)?(prior|level)|connect_by_(root|icycle)|level|start\p{space}+with)\b/dgiv,
      name: "keyword.hierarchical.sql.oracle"
    },
    {
      match: /\b(language|name|java|c)\b/dgiv,
      name: "keyword.wrapper.oracle"
    },
    {
      match: /\b(end|then|deterministic|exception|when|declare|begin|in|out|nocopy|is|as|exit|open|fetch|into|close|subtype|type|rowtype|default|exclusive|mode|lock|record|index\p{space}+by|result_cache|constant|comment|\.((?:next|curr)val))\b/dgiv,
      name: "keyword.other.oracle"
    },
    {
      match: /\b(grant|revoke|alter|drop|force|add|check|constraint|primary\p{space}+key|foreign\p{space}+key|references|unique(\p{space}+index)?|column|sequence|increment\p{space}+by|cache|(materialized\p{space}+)?view|trigger|storage|tablespace|pct(free|used)|(init|max)trans|logging)\b/dgiv,
      name: "keyword.other.ddl.oracle"
    },
    {
      match: /\b(with|select|from|where|order\p{space}+(siblings\p{space}+)?by|group\p{space}+by|rollup|cube|((left|right|cross|natural)\p{space}+(outer\p{space}+)?)?join|on|asc|desc|update|set|insert|into|values|delete|distinct|union|minus|intersect|having|limit|table|between|like|of|row|(r(?:ange|ows))\p{space}+between|nulls\p{space}+first|nulls\p{space}+last|before|after|all|any|exists|rownum|cursor|returning|over|partition\p{space}+by|merge|using|matched|pivot|unpivot)\b/dgiv,
      name: "keyword.other.sql.oracle"
    },
    {
      match: /\b(define|whenever\p{space}+sqlerror|exec|timing\p{space}+start|timing\p{space}+stop)\b/dgiv,
      name: "keyword.other.sqlplus.oracle"
    },
    {
      match: /\b(access_into_null|case_not_found|collection_is_null|cursor_already_open|dup_val_on_index|invalid_cursor|invalid_number|login_denied|no_data_found|not_logged_on|program_error|rowtype_mismatch|self_is_null|storage_error|subscript_beyond_count|subscript_outside_limit|sys_invalid_rowid|timeout_on_resource|too_many_rows|value_error|zero_divide|others)\b/dgiv,
      name: "support.type.exception.oracle"
    },
    {
      captures: {
        "3": { name: "support.class.oracle" }
      },
      match: /\b((dbms|utl|owa|apex)_[\p{L}\p{M}\p{N}\p{Pc}]+\.([\p{L}\p{M}\p{N}\p{Pc}]+))\b/dgiv,
      name: "support.function.oracle"
    },
    {
      captures: {
        "3": { name: "support.class.oracle" }
      },
      match: /\b((ht[fp])\.([\p{L}\p{M}\p{N}\p{Pc}]+))\b/dgiv,
      name: "support.function.oracle"
    },
    {
      captures: {
        "3": { name: "support.class.user-defined.oracle" }
      },
      match: /\b(([\p{L}\p{M}\p{N}\p{Pc}]+_pkg|pkg_[\p{L}\p{M}\p{N}\p{Pc}]+)\.([\p{L}\p{M}\p{N}\p{Pc}]+))\b/dgiv,
      name: "support.function.user-defined.oracle"
    },
    {
      match: /\b(raise(?:|_application_error))\b/dgiv,
      name: "support.function.oracle"
    },
    {
      begin: /'/dgv,
      end: /'/dgv,
      name: "string.quoted.single.oracle"
    },
    {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.oracle"
    },
    {
      match: /\b(char|varchar2??|nchar|nvarchar2|boolean|date|timestamp(\p{space}+with(\p{space}+local)?\p{space}+time\p{space}+zone)?|interval\p{space}*day(\(\p{Nd}*\))?\p{space}*to\p{space}*month|interval\p{space}*year(\(\p{Nd}*\))?\p{space}*to\p{space}*second(\(\p{Nd}*\))?|xmltype|blob|clob|nclob|bfile|long|long\p{space}+raw|raw|number|integer|decimal|smallint|float|binary_(float|double|integer)|pls_(float|double|integer)|rowid|urowid|vararray|naturaln??|positiven??|signtype|simple_(float|double|integer))\b/dgiv,
      name: "storage.type.oracle"
    }
  ],
  dependencies: []
};
