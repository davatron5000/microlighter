import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "kusto",
  displayName: "Kusto",
  aliases: [
    "kql"
  ],
  scopeName: "source.kusto",
  patterns: [
    {
      match: /\b(by|from|of|to|step|with)\b/dgv,
      name: "keyword.other.operator.kusto"
    },
    {
      match: /\b(let|set|alias|declare|pattern|query_parameters|restrict|access|set)\b/dgv,
      name: "keyword.control.kusto"
    },
    {
      match: /\b(and|or|has_all|has_any|matches|regex)\b/dgv,
      name: "keyword.other.operator.kusto"
    },
    {
      captures: {
        "1": { name: "support.function.kusto" },
        "2": {
          patterns: [
            { include: "#Strings" }
          ]
        }
      },
      match: /\b(cluster|database)(?:\p{space}*\(\p{space}*([^\n]+?)\p{space}*\))?(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "meta.special.database.kusto"
    },
    {
      match: /\b(external_table|materialized_view|materialize|table|toscalar)\b/dgv,
      name: "support.function.kusto"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(!?between)\b/dgv,
      name: "keyword.other.operator.kusto"
    },
    {
      captures: {
        "1": { name: "support.function.kusto" },
        "2": {
          patterns: [
            { include: "#Numeric" }
          ]
        },
        "3": {
          patterns: [
            { include: "#Numeric" }
          ]
        }
      },
      match: /\b(binary_(?:and|or|shift_left|shift_right|xor))(?:\p{space}*\(\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*,\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*\))?(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "meta.scalar.bitwise.kusto"
    },
    {
      captures: {
        "1": { name: "support.function.kusto" },
        "2": {
          patterns: [
            { include: "#Numeric" }
          ]
        }
      },
      match: /\b(bi(?:nary_not|tset_count_ones))(?:\p{space}*\(\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*\))?(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "meta.scalar.bitwise.kusto"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(!?in~?)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "keyword.other.operator.kusto"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(!?(?:contains|endswith|hasprefix|hassuffix|has|startswith)(?:_cs)?)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "keyword.other.operator.kusto"
    },
    {
      captures: {
        "1": { name: "support.function.kusto" },
        "2": {
          patterns: [
            { include: "#DateTimeTimeSpanDataTypes" },
            { include: "#TimeSpanLiterals" },
            { include: "#DateTimeTimeSpanFunctions" },
            { include: "#Numeric" }
          ]
        },
        "3": {
          patterns: [
            { include: "#DateTimeTimeSpanDataTypes" },
            { include: "#TimeSpanLiterals" },
            { include: "#DateTimeTimeSpanFunctions" },
            { include: "#Numeric" }
          ]
        },
        "4": {
          patterns: [
            { include: "#DateTimeTimeSpanDataTypes" },
            { include: "#TimeSpanLiterals" },
            { include: "#DateTimeTimeSpanFunctions" },
            { include: "#Numeric" }
          ]
        }
      },
      match: /\b(range)\p{space}*\((?:\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+(?:\([^\n]*?\))?)\p{space}*,\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+(?:\([^\n]*?\))?)\p{space}*,?(?:\p{space}*)?([\p{L}\p{M}\p{N}\p{Pc}]+(?:\([^\n]*?\))?)?\p{space}*\))?(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "meta.scalar.function.range.kusto"
    },
    {
      match: /\b(abs|acos|around|array_concat|array_iff|array_index_of|array_length|array_reverse|array_rotate_left|array_rotate_right|array_shift_left|array_shift_right|array_slice|array_sort_asc|array_sort_desc|array_split|array_sum|asin|assert|atan2?|bag_has_key|bag_keys|bag_merge|bag_remove_keys|base64_decode_toarray|base64_decode_tostring|base64_decode_toguid|base64_encode_fromarray|base64_encode_tostring|base64_encode_fromguid|beta_cdf|beta_inv|beta_pdf|bin_at|bin_auto|case|ceiling|coalesce|column_ifexists|convert_angle|convert_energy|convert_force|convert_length|convert_mass|convert_speed|convert_temperature|convert_volume|cos|cot|countof|current_cluster_endpoint|current_database|current_principal_details|current_principal_is_member_of|current_principal|cursor_after|cursor_before_or_at|cursor_current|current_cursor|dcount_hll|degrees|dynamic_to_json|estimate_data_size|exp10|exp2?|extent_id|extent_tags|extract_all|extract_json|extractjson|extract|floor|format_bytes|format_ipv4_mask|format_ipv4|gamma|gettype|gzip_compress_to_base64_string|gzip_decompress_from_base64_string|has_any_index|has_any_ipv4_prefix|has_any_ipv4|has_ipv4_prefix|has_ipv4|hash_combine|hash_many|hash_md5|hash_sha1|hash_sha256|hash_xxhash64|hash|iff|iif|indexof_regex|indexof|ingestion_time|ipv4_compare|ipv4_is_in_range|ipv4_is_in_any_range|ipv4_is_match|ipv4_is_private|ipv4_netmask_suffix|ipv6_compare|ipv6_is_match|isascii|isempty|isfinite|isinf|isnan|isnotempty|notempty|isnotnull|notnull|isnull|isutf8|jaccard_index|log10|log2|loggamma|log|make_string|max_of|min_of|new_guid|not|bag_pack|pack_all|pack_array|pack_dictionary|pack|parse_command_line|parse_csv|parse_ipv4_mask|parse_ipv4|parse_ipv6_mask|parse_ipv6|parse_path|parse_urlquery|parse_url|parse_user_agent|parse_version|parse_xml|percentile_tdigest|percentile_array_tdigest|percentrank_tdigest|pi|pow|radians|rand|rank_tdigest|regex_quote|repeat|replace_regex|replace_string|reverse|round|set_difference|set_has_element|set_intersect|set_union|sign|sin|split|sqrt|strcat_array|strcat_delim|strcmp|strcat|string_size|strlen|strrep|substring|tan|to_utf8|tobool|todecimal|todouble|toreal|toguid|tohex|toint|tolong|tolower|tostring|toupper|translate|treepath|trim_end|trim_start|trim|unixtime_microseconds_todatetime|unixtime_milliseconds_todatetime|unixtime_nanoseconds_todatetime|unixtime_seconds_todatetime|url_decode|url_encode_component|url_encode|welch_test|zip|zlib_compress_to_base64_string|zlib_decompress_from_base64_string)\b/dgv,
      name: "support.function.kusto"
    },
    {
      captures: {
        "1": { name: "support.function.kusto" },
        "2": {
          patterns: [
            { include: "#DateTimeTimeSpanDataTypes" },
            { include: "#TimeSpanLiterals" },
            { include: "#DateTimeTimeSpanFunctions" },
            { include: "#Numeric" }
          ]
        },
        "3": {
          patterns: [
            { include: "#TimeSpanLiterals" },
            { include: "#Numeric" }
          ]
        }
      },
      match: /\b(bin)(?:\p{space}*\(\p{space}*([^\n]+?)\p{space}*,\p{space}*([^\n]+?)\p{space}*\))?(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "meta.scalar.function.bin.kusto"
    },
    {
      match: /\b(count)\p{space}*\(\p{space}*\)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "support.function.kusto"
    },
    {
      match: /\b(arg_max|arg_min|avgif|avg|binary_all_and|binary_all_or|binary_all_xor|buildschema|countif|dcount|dcountif|hll|hll_merge|make_bag_if|make_bag|make_list_with_nulls|make_list_if|make_list|make_set_if|make_set|maxif|max|minif|min|percentilesw_array|percentiles_array|percentilesw|percentilew|percentiles?|stdevif|stdevp?|sumif|sum|take_anyif|take_any|tdigest_merge|merge_tdigest|tdigest|varianceif|variancep?)\b/dgv,
      name: "support.function.kusto"
    },
    {
      match: /\b(geo_(?:distance_2points|distance_point_to_line|distance_point_to_polygon|intersects_2lines|intersects_2polygons|intersects_line_with_polygon|intersection_2lines|intersection_2polygons|intersection_line_with_polygon|line_centroid|line_densify|line_length|line_simplify|polygon_area|polygon_centroid|polygon_densify|polygon_perimeter|polygon_simplify|polygon_to_s2cells|point_in_circle|point_in_polygon|point_to_geohash|point_to_h3cell|point_to_s2cell|geohash_to_central_point|geohash_neighbors|geohash_to_polygon|s2cell_to_central_point|s2cell_neighbors|s2cell_to_polygon|h3cell_to_central_point|h3cell_neighbors|h3cell_to_polygon|h3cell_parent|h3cell_children|h3cell_level|h3cell_rings|simplify_polygons_array|union_lines_array|union_polygons_array))\b/dgv,
      name: "support.function.kusto"
    },
    {
      match: /\b(next|prev|row_cumsum|row_number|row_rank|row_window_session)\b/dgv,
      name: "support.function.kusto"
    },
    {
      match: /\.(create-or-alter|replace)/dgv,
      name: "keyword.control.kusto"
    },
    {
      match: /(?<=let )[^\n]+(?=[^\p{L}\p{M}\p{N}\p{Pc}]*=)/dgv,
      name: "entity.function.name.lambda.kusto"
    },
    {
      match: /\b(folder|docstring|skipvalidation)\b/dgv,
      name: "keyword.other.operator.kusto"
    },
    {
      match: /\b(function)\b/dgv,
      name: "storage.type.kusto"
    },
    {
      match: /\b(bool|boolean|decimal|dynamic|guid|int|long|real|string)\b/dgv,
      name: "storage.type.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": { name: "variable.other.kusto" }
      },
      match: /\b(as)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
      name: "meta.query.as.kusto"
    },
    {
      match: /\b(datatable)(?=[^\p{L}\p{M}\p{N}\p{Pc}]*\()/dgv,
      name: "keyword.other.query.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": { name: "keyword.other.operator.kusto" }
      },
      match: /\b(facet)(?:\p{space}+(by))?\b/dgv,
      name: "meta.query.facet.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": { name: "entity.name.function.kusto" }
      },
      match: /\b(invoke)(?:\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?\b/dgv,
      name: "meta.query.invoke.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": { name: "keyword.other.operator.kusto" },
        "3": { name: "variable.other.column.kusto" }
      },
      match: /\b(order)(?:\p{space}+(by)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?\b/dgv,
      name: "meta.query.order.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": { name: "variable.other.column.kusto" },
        "3": { name: "keyword.other.operator.kusto" },
        "4": {
          patterns: [
            { include: "#TimeSpanLiterals" },
            { include: "#DateTimeTimeSpanFunctions" },
            { include: "#Numeric" }
          ]
        },
        "5": { name: "keyword.other.operator.kusto" },
        "6": {
          patterns: [
            { include: "#TimeSpanLiterals" },
            { include: "#DateTimeTimeSpanFunctions" },
            { include: "#Numeric" }
          ]
        },
        "7": { name: "keyword.other.operator.kusto" },
        "8": {
          patterns: [
            { include: "#TimeSpanLiterals" },
            { include: "#DateTimeTimeSpanFunctions" },
            { include: "#Numeric" }
          ]
        }
      },
      match: /\b(range)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+(from)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+(?:\([\p{L}\p{M}\p{N}\p{Pc}]*\))?)\p{space}+(to)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+(?:\([\p{L}\p{M}\p{N}\p{Pc}]*\))?)\p{space}+(step)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+(?:\([\p{L}\p{M}\p{N}\p{Pc}]*\))?)\b/dgv,
      name: "meta.query.range.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": {
          patterns: [
            { include: "#Numeric" }
          ]
        }
      },
      match: /\b(sample)(?:\p{space}+(\p{Nd}+))?(?![\-\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "meta.query.sample.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": {
          patterns: [
            { include: "#Numeric" }
          ]
        },
        "3": { name: "keyword.other.operator.kusto" },
        "4": { name: "variable.other.column.kusto" }
      },
      match: /\b(sample-distinct)(?:\p{space}+(\p{Nd}+)\p{space}+(of)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?\b/dgv,
      name: "meta.query.sample-distinct.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": { name: "keyword.other.operator.kusto" }
      },
      match: /\b(sort)(?:\p{space}+(by))?\b/dgv,
      name: "meta.query.sort.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": {
          patterns: [
            { include: "#Numeric" }
          ]
        }
      },
      match: /\b(take|limit)\p{space}+(\p{Nd}+)\b/dgv,
      name: "meta.query.take.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": {
          patterns: [
            { include: "#Numeric" }
          ]
        },
        "3": { name: "keyword.other.operator.kusto" },
        "4": { name: "variable.other.column.kusto" }
      },
      match: /\b(top)(?:\p{space}+(\p{Nd}+)\p{space}+(by)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?(?![\-\p{L}\p{M}\p{N}\p{Pc}])\b/dgv,
      name: "meta.query.top.kusto"
    },
    {
      captures: {
        "1": { name: "keyword.other.query.kusto" },
        "2": {
          patterns: [
            { include: "#Numeric" }
          ]
        },
        "3": { name: "keyword.other.operator.kusto" },
        "4": { name: "variable.other.column.kusto" },
        "5": { name: "keyword.other.operator.kusto" },
        "6": { name: "variable.other.column.kusto" }
      },
      match: /\b(top-hitters)(?:\p{space}+(\p{Nd}+)\p{space}+(of)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)(?:\p{space}+(by)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?)?\b/dgv,
      name: "meta.query.top-hitters.kusto"
    },
    {
      match: /\b(consume|count|distinct|evaluate|extend|externaldata|find|fork|getschema|join|lookup|make-series|mv-apply|mv-expand|project-away|project-keep|project-rename|project-reorder|project|parse|parse-where|parse-kv|partition|print|reduce|render|scan|search|serialize|shuffle|summarize|top-nested|union|where)\b/dgv,
      name: "keyword.other.query.kusto"
    },
    {
      match: /\b(active_users_count|activity_counts_metrics|activity_engagement|new_activity_metrics|activity_metrics|autocluster|azure_digital_twins_query_request|bag_unpack|basket|cosmosdb_sql_request|dcount_intersect|diffpatterns|funnel_sequence_completion|funnel_sequence|http_request_post|http_request|infer_storage_schema|ipv4_lookup|mysql_request|narrow|pivot|preview|rolling_percentile|rows_near|schema_merge|session_count|sequence_detect|sliding_window_counts|sql_request)\b/dgv,
      name: "support.function.kusto"
    },
    {
      match: /\b(on|kind|hint\.remote|hint\.strategy)\b/dgv,
      name: "keyword.other.operator.kusto"
    },
    {
      match: /(\$(?:left|right))\b/dgv,
      name: "keyword.other.kusto"
    },
    {
      match: /\b(innerunique|inner|leftouter|rightouter|fullouter|leftanti|anti|leftantisemi|rightanti|rightantisemi|leftsemi|rightsemi|broadcast)\b/dgv,
      name: "keyword.other.kusto"
    },
    {
      match: /\b(series_(?:abs|acos|add|asin|atan|cos|decompose|decompose_anomalies|decompose_forecast|divide|equals|exp|fft|fill_backward|fill_const|fill_forward|fill_linear|fir|fit_2lines_dynamic|fit_2lines|fit_line_dynamic|fit_line|fit_poly|greater_equals|greater|ifft|iir|less_equals|less|multiply|not_equals|outliers|pearson_correlation|periods_detect|periods_validate|pow|seasonal|sign|sin|stats|stats_dynamic|subtract|tan))\b/dgv,
      name: "support.function.kusto"
    },
    {
      match: /\b(bag|array)\b/dgv,
      name: "keyword.other.operator.kusto"
    },
    {
      match: /\b(asc|desc|nulls first|nulls last)\b/dgv,
      name: "keyword.other.kusto"
    },
    {
      match: /\b(regex|simple|relaxed)\b/dgv,
      name: "keyword.other.kusto"
    },
    {
      match: /\b(anomalychart|areachart|barchart|card|columnchart|ladderchart|linechart|piechart|pivotchart|scatterchart|stackedareachart|timechart|timepivot)\b/dgv,
      name: "support.function.kusto"
    },
    { include: "#Strings" },
    {
      match: /\{[^\n]*?\}/dgv,
      name: "string.other.kusto"
    },
    {
      match: /\/\/[^\n]*/dgv,
      name: "comment.line.kusto"
    },
    { include: "#TimeSpanLiterals" },
    { include: "#DateTimeTimeSpanFunctions" },
    { include: "#DateTimeTimeSpanDataTypes" },
    { include: "#Numeric" },
    {
      match: /\b(true|false|null)\b/dgv,
      name: "constant.language.kusto"
    },
    {
      match: /\b(anyif|any|array_strcat|base64_decodestring|base64_encodestring|make_dictionary|makelist|makeset|mvexpand|todynamic|parse_json|replace|weekofyear)(?=[^\p{L}\p{M}\p{N}\p{Pc}]*\(|\b)/dgv,
      name: "invalid.deprecated.kusto"
    }
  ],
  repository: {
    DateTimeTimeSpanDataTypes: {
      patterns: [
        {
          match: /\b(datetime|timespan|time)\b/dgv,
          name: "storage.type.kusto"
        }
      ]
    },
    DateTimeTimeSpanFunctions: {
      patterns: [
        {
          captures: {
            "1": { name: "support.function.kusto" },
            "2": {
              patterns: [
                { include: "#DateTimeTimeSpanDataTypes" }
              ]
            },
            "3": {
              patterns: [
                { include: "#Strings" }
              ]
            }
          },
          match: /\b(format_datetime)(?:\p{space}*\(\p{space}*([^\n]+?)\p{space}*,\p{space}*(["'][^\n]*?["'])\p{space}*\))?(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "meta.scalar.function.format_datetime.kusto"
        },
        {
          match: /\b(ago|datetime_add|datetime_diff|datetime_local_to_utc|datetime_part|datetime_utc_to_local|dayofmonth|dayofweek|dayofyear|endofday|endofmonth|endofweek|endofyear|format_timespan|getmonth|getyear|hourofday|make_datetime|make_timespan|monthofyear|now|startofday|startofmonth|startofweek|startofyear|todatetime|totimespan|week_of_year)(?=[^\p{L}\p{M}\p{N}\p{Pc}]*\()/dgv,
          name: "support.function.kusto"
        }
      ]
    },
    Escapes: {
      patterns: [
        {
          match: /\\["'\\nt]/dgv,
          name: "constant.character.escape.kusto"
        }
      ]
    },
    Numeric: {
      patterns: [
        {
          match: new EmulatedRegExp("\\b((0([Xx])\\p{AHex}*)|(([0-9]+\\.?(?:(?=([0-9]*))\\6))|(\\.[0-9]+))(([Ee])([\\-\\+])?[0-9]+)?)([Ll]|UL|ul|[FUfu]|ll|LL|ull|ULL)?(?=\\b|[\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgv", { hiddenCaptures: [6] }),
          name: "constant.numeric.kusto"
        }
      ]
    },
    Strings: {
      patterns: [
        {
          begin: /([\@h]?")/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.kusto" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.kusto" }
          },
          name: "string.quoted.double.kusto",
          patterns: [
            { include: "#Escapes" }
          ]
        },
        {
          begin: /([\@h]?')/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.kusto" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.kusto" }
          },
          name: "string.quoted.single.kusto",
          patterns: [
            { include: "#Escapes" }
          ]
        },
        {
          begin: /([\@h]?```)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.kusto" }
          },
          end: /```/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.kusto" }
          },
          name: "string.quoted.multi.kusto",
          patterns: [
            { include: "#Escapes" }
          ]
        }
      ]
    },
    TimeSpanLiterals: {
      patterns: [
        {
          match: /[\-\+]?(?:\p{Nd}*\.)?\p{Nd}+(?:microseconds?|ticks?|seconds?|ms|[dhms])\b/dgv,
          name: "constant.numeric.kusto"
        }
      ]
    }
  },
  dependencies: []
};
