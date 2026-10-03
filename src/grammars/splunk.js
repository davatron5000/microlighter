export default {
  name: "splunk",
  displayName: "Splunk Query Language",
  aliases: [
    "spl"
  ],
  scopeName: "source.splunk_search",
  patterns: [
    {
      match: /(?<=([\[\|]))(\p{space}*)\b(abstract|accum|addcoltotals|addinfo|addtotals|analyzefields|anomalies|anomalousvalue|append|appendcols|appendpipe|arules|associate|audit|autoregress|bucket|bucketdir|chart|cluster|collect|concurrency|contingency|convert|correlate|crawl|datamodel|dbinspect|dbxquery|dbxlookup|dedup|delete|delta|diff|dispatch|erex|eval|eventcount|eventstats|extract|fieldformat|fields|fieldsummary|file|filldown|fillnull|findtypes|folderize|foreach|format|from|gauge|gentimes|geostats|head|highlight|history|input|inputcsv|inputlookup|iplocation|join|kmeans|kvform|loadjob|localize|localop|lookup|makecontinuous|makemv|makeresults|map|metadata|metasearch|multikv|multisearch|mvcombine|mvexpand|nomv|outlier|outputcsv|outputlookup|outputtext|overlap|pivot|predict|rangemap|rare|regex|relevancy|reltime|rename|replace|rest|return|reverse|rex|rtorder|run|savedsearch|script|scrub|search|searchtxn|selfjoin|sendemail|set|setfields|sichart|sirare|sistats|sitimechart|sitop|sort|spath|stats|strcat|streamstats|table|tags|tail|timechart|top|transaction|transpose|trendline|tscollect|tstats|typeahead|typelearner|typer|uniq|untable|where|x11|xmlkv|xmlunescape|xpath|xyseries)\b(?=\p{space})/dgv,
      name: "support.class.splunk_search"
    },
    {
      match: /\b(abs|acosh??|asinh??|atan2??|atanh|case|cidrmatch|ceiling|coalesce|commands|cosh??|exact|exp|floor|hypot|if|in|isbool|isint|isnotnull|isnull|isnum|isstr|len|like|ln|log|lower|ltrim|match|max|md5|min|mvappend|mvcount|mvdedup|mvfilter|mvfind|mvindex|mvjoin|mvrange|mvsort|mvzip|now|null|nullif|pi|pow|printf|random|relative_time|replace|round|rtrim|searchmatch|sha1|sha256|sha512|sigfig|sinh??|spath|split|sqrt|strftime|strptime|substr|tanh??|time|tonumber|tostring|trim|typeof|upper|urldecode|validate)(?=\()\b/dgv,
      name: "support.function.splunk_search"
    },
    {
      match: /\b(avg|count|distinct_count|estdc|estdc_error|eval|max|mean|median|min|mode|percentile|range|stdevp??|sum|sumsq|varp??|first|last|list|values|earliest|earliest_time|latest|latest_time|per_day|per_hour|per_minute|per_second|rate)\b/dgv,
      name: "support.function.splunk_search"
    },
    {
      match: /(?<=`)[\p{L}\p{M}\p{N}\p{Pc}]+(?=[\(\`])/dgv,
      name: "entity.name.function.splunk_search"
    },
    {
      match: /\b(\p{Nd}+)\b/dgv,
      name: "constant.numeric.splunk_search"
    },
    {
      match: /(\\[\*\=\\\|])/dgv,
      name: "contant.character.escape.splunk_search"
    },
    {
      match: /(\|,)/dgv,
      name: "keyword.operator.splunk_search"
    },
    {
      match: /(?:\b([Aa][Ssſ]|[Bb][Yy]|[Oo][Rr]|[Aa][Nn][Dd]|[Oo][Vv][Ee][Rr]|[Ww][Hh][Ee][Rr][Ee]|[Oo][Uu][Tt][Pp][Uu][Tt]|[Oo][Uu][Tt][Pp][Uu][Tt][Nn][Ee][Ww])|\b(NOT|true|false))\b/dgv,
      name: "constant.language.splunk_search"
    },
    {
      match: /(?<=[\(\,]|[^\=]\p{space}{300})([^"\(\)\,\=]+)(?=[\)\,])/dgv,
      name: "variable.parameter.splunk_search"
    },
    {
      match: /([\.\p{L}\p{M}\p{N}\p{Pc}]+)(\[\]|\{\})?(\p{space}*)(?==)/dgv,
      name: "variable.splunk_search"
    },
    {
      match: /=/dgv,
      name: "keyword.operator.splunk_search"
    },
    {
      begin: /(?<!\\)"/dgv,
      end: /(?<!\\)"/dgv,
      name: "string.quoted.double.splunk_search"
    },
    {
      begin: /(?<!\\)'/dgv,
      end: /(?<!\\)'/dgv,
      name: "string.quoted.single.splunk_search"
    },
    {
      begin: /query="/dgv,
      end: /(?<!\\)"/dgv,
      name: "meta.embedded.block.sql"
    },
    {
      begin: /(?<!\\)```/dgv,
      end: /(?<!\\)```/dgv,
      name: "comment.block.splunk_search"
    },
    {
      begin: /`comment\(/dgv,
      end: /\)`/dgv,
      name: "comment.block.splunk_search"
    }
  ],
  dependencies: []
};
