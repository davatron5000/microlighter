import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "nginx",
  displayName: "Nginx",
  scopeName: "source.nginx",
  patterns: [
    {
      match: /#[^\n]*/dgv,
      name: "comment.line.number-sign"
    },
    {
      begin: /\b((?:content|rewrite|access|init_worker|init|set|log|balancer|ssl_(?:client_hello|session_fetch|certificate))_by_lua(?:_block)?)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      contentName: "meta.embedded.block.lua",
      end: /\}/dgv,
      name: "meta.context.lua.nginx",
      patterns: [
        { include: "source.lua" }
      ]
    },
    {
      begin: /\b((?:content|rewrite|access|init_worker|init|set|log|balancer|ssl_(?:client_hello|session_fetch|certificate))_by_lua)\p{space}*'/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      contentName: "meta.embedded.block.lua",
      end: /'/dgv,
      name: "meta.context.lua.nginx",
      patterns: [
        { include: "source.lua" }
      ]
    },
    {
      begin: /\b(events) +\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.events.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(http) +\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.http.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(mail) +\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.mail.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(stream) +\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.stream.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(server) +\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.server.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(location) +(\^?~\*?|=) +([^\n]*?)\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" },
        "2": { name: "keyword.operator.nginx" },
        "3": { name: "string.regexp.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.location.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(location) +([^\n]*?)\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" },
        "2": { name: "entity.name.context.location.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.location.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(limit_except) +\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.limit_except.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(if) +\(/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.nginx" }
      },
      end: /\)/dgv,
      name: "meta.context.if.nginx",
      patterns: [
        { include: "#if_condition" }
      ]
    },
    {
      begin: /\b(upstream) +([^\n]*?)\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" },
        "2": { name: "entity.name.context.location.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.upstream.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(types) +\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.types.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(map) +(\$)([0-9A-Z_a-z]+) +(\$)([0-9A-Z_a-z]+) *\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.directive.context.nginx" },
        "2": { name: "punctuation.definition.variable.nginx" },
        "3": { name: "variable.parameter.nginx" },
        "4": { name: "punctuation.definition.variable.nginx" },
        "5": { name: "variable.other.nginx" }
      },
      end: /\}/dgv,
      name: "meta.context.map.nginx",
      patterns: [
        { include: "#values" },
        {
          match: /;/dgv,
          name: "punctuation.terminator.nginx"
        },
        {
          match: /#[^\n]*/dgv,
          name: "comment.line.number-sign"
        }
      ]
    },
    {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "meta.block.nginx",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /\b(return)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.nginx" }
      },
      end: /;/dgv,
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /\b(rewrite)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" }
      },
      end: /(last|break|redirect|permanent)?(;)/dgv,
      endCaptures: {
        "1": { name: "keyword.other.nginx" },
        "2": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /\b(server)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#server_parameters" }
      ]
    },
    {
      begin: /\b(internal|empty_gif|f4f|flv|hls|mp4|break|status|stub_status|ip_hash|ntlm|least_conn|upstream_conf|least_conn|zone_sync)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" }
      },
      end: /(;|(?=\n?$))/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.nginx" }
      }
    },
    {
      begin: /(["'\p{space}]|^)(accept_)(mutex(?:|_delay))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(debug_)(connection|points)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(error_)(log|page)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(ssl_)(engine|buffer_size|certificate|certificate_key|ciphers|client_certificate|conf_command|crl|dhparam|early_data|ecdh_curve|ocsp|ocsp_cache|ocsp_responder|password_file|prefer_server_ciphers|protocols|reject_handshake|session_cache|session_ticket_key|session_tickets|session_timeout|stapling|stapling_file|stapling_responder|stapling_verify|trusted_certificate|verify_client|verify_depth|alpn|handshake_timeout|preread)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(worker_)(aio_requests|connections|cpu_affinity|priority|processes|rlimit_core|rlimit_nofile|shutdown_timeout)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(auth_)(delay|basic|basic_user_file|jwt|jwt_claim_set|jwt_header_set|jwt_key_cache|jwt_key_file|jwt_key_request|jwt_leeway|jwt_type|jwt_require|request|request_set|http|http_header|http_pass_client_cert|http_timeout)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(client_)(body_buffer_size|body_in_file_only|body_in_single_buffer|body_temp_path|body_timeout|header_buffer_size|header_timeout|max_body_size)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(keepalive_)(disable|requests|time|timeout)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(limit_)(rate|rate_after|conn|conn_dry_run|conn_log_level|conn_status|conn_zone|zone|req|req_dry_run|req_log_level|req_status|req_zone)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(lingering_)(close|time|timeout)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(log_)(not_found|subrequest|format)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(max_)(ranges|errors)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(msie_)(padding|refresh)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(open_)(file_cache|file_cache_errors|file_cache_min_uses|file_cache_valid|log_file_cache)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(send_)(lowat|timeout)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(server_)(name|name_in_redirect|names_hash_bucket_size|names_hash_max_size|tokens)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(tcp_)(no(?:delay|push))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(types_)(hash_(?:bucket|max)_size)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(variables_)(hash_(?:bucket|max)_size)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(add_)(before_body|after_body|header|trailer)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(status_)(zone|format)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(autoindex_)(exact_size|format|localtime)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(ancient_)(browser(?:|_value))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(modern_)(browser(?:|_value))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(charset_)(map|types)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(dav_)(access|methods)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(fastcgi_)(bind|buffer_size|buffering|buffers|busy_buffers_size|cache|cache_background_update|cache_bypass|cache_key|cache_lock|cache_lock_age|cache_lock_timeout|cache_max_range_offset|cache_methods|cache_min_uses|cache_path|cache_purge|cache_revalidate|cache_use_stale|cache_valid|catch_stderr|connect_timeout|force_ranges|hide_header|ignore_client_abort|ignore_headers|index|intercept_errors|keep_conn|limit_rate|max_temp_file_size|next_upstream|next_upstream_timeout|next_upstream_tries|no_cache|param|pass|pass_header|pass_request_body|pass_request_headers|read_timeout|request_buffering|send_lowat|send_timeout|socket_keepalive|split_path_info|store|store_access|temp_file_write_size|temp_path)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(geoip_)(country|city|org|proxy|proxy_recursive)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(grpc_)(bind|buffer_size|connect_timeout|hide_header|ignore_headers|intercept_errors|next_upstream|next_upstream_timeout|next_upstream_tries|pass|pass_header|read_timeout|send_timeout|set_header|socket_keepalive|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_conf_command|ssl_crl|ssl_name|ssl_password_file|ssl_protocols|ssl_server_name|ssl_session_reuse|ssl_trusted_certificate|ssl_verify|ssl_verify_depth)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(gzip_)(buffers|comp_level|disable|http_version|min_length|proxied|types|vary|static)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(hls_)(buffers|forward_args|fragment|mp4_buffer_size|mp4_max_buffer_size)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(image_)(filter(?:|_buffer|_interlace|_jpeg_quality|_sharpen|_transparency|_webp_quality))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(map_)(hash_(?:bucket|max)_size)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(memcached_)(bind|buffer_size|connect_timeout|gzip_flag|next_upstream|next_upstream_timeout|next_upstream_tries|pass|read_timeout|send_timeout|socket_keepalive)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(mp4_)(buffer_size|max_buffer_size|limit_rate|limit_rate_after|start_key_frame)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(perl_)(modules|require|set)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(proxy_)(bind|buffer_size|buffering|buffers|busy_buffers_size|cache|cache_background_update|cache_bypass|cache_convert_head|cache_key|cache_lock|cache_lock_age|cache_lock_timeout|cache_max_range_offset|cache_methods|cache_min_uses|cache_path|cache_purge|cache_revalidate|cache_use_stale|cache_valid|connect_timeout|cookie_domain|cookie_flags|cookie_path|force_ranges|headers_hash_bucket_size|headers_hash_max_size|hide_header|http_version|ignore_client_abort|ignore_headers|intercept_errors|limit_rate|max_temp_file_size|method|next_upstream|next_upstream_timeout|next_upstream_tries|no_cache|pass|pass_header|pass_request_body|pass_request_headers|read_timeout|redirect|request_buffering|send_lowat|send_timeout|set_body|set_header|socket_keepalive|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_conf_command|ssl_crl|ssl_name|ssl_password_file|ssl_protocols|ssl_server_name|ssl_session_reuse|ssl_trusted_certificate|ssl_verify|ssl_verify_depth|store|store_access|temp_file_write_size|temp_path|buffer|pass_error_message|protocol|smtp_auth|timeout|protocol_timeout|download_rate|half_close|requests|responses|session_drop|ssl|upload_rate)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(real_)(ip_(?:header|recursive))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(referer_)(hash_(?:bucket|max)_size)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(scgi_)(bind|buffer_size|buffering|buffers|busy_buffers_size|cache|cache_background_update|cache_bypass|cache_key|cache_lock|cache_lock_age|cache_lock_timeout|cache_max_range_offset|cache_methods|cache_min_uses|cache_path|cache_purge|cache_revalidate|cache_use_stale|cache_valid|connect_timeout|force_ranges|hide_header|ignore_client_abort|ignore_headers|intercept_errors|limit_rate|max_temp_file_size|next_upstream|next_upstream_timeout|next_upstream_tries|no_cache|param|pass|pass_header|pass_request_body|pass_request_headers|read_timeout|request_buffering|send_timeout|socket_keepalive|store|store_access|temp_file_write_size|temp_path)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(secure_)(link(?:|_md5|_secret))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(session_)(log(?:|_format|_zone))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(ssi_)(last_modified|min_file_chunk|silent_errors|types|value_length)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(sub_)(filter(?:|_last_modified|_once|_types))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(health_)(check(?:|_timeout))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(userid_)(domain|expires|flags|mark|name|p3p|path|service)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(uwsgi_)(bind|buffer_size|buffering|buffers|busy_buffers_size|cache|cache_background_update|cache_bypass|cache_key|cache_lock|cache_lock_age|cache_lock_timeout|cache_max_range_offset|cache_methods|cache_min_uses|cache_path|cache_purge|cache_revalidate|cache_use_stale|cache_valid|connect_timeout|force_ranges|hide_header|ignore_client_abort|ignore_headers|intercept_errors|limit_rate|max_temp_file_size|modifier1|modifier2|next_upstream|next_upstream_timeout|next_upstream_tries|no_cache|param|pass|pass_header|pass_request_body|pass_request_headers|read_timeout|request_buffering|send_timeout|socket_keepalive|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_conf_command|ssl_crl|ssl_name|ssl_password_file|ssl_protocols|ssl_server_name|ssl_session_reuse|ssl_trusted_certificate|ssl_verify|ssl_verify_depth|store|store_access|temp_file_write_size|temp_path)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(http2_)(body_preread_size|chunk_size|idle_timeout|max_concurrent_pushes|max_concurrent_streams|max_field_size|max_header_size|max_requests|push|push_preload|recv_buffer_size|recv_timeout)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(http3_)(hq|max_concurrent_streams|stream_buffer_size)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(quic_)(active_connection_id_limit|bpf|gso|host_key|retry)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(xslt_)(last_modified|param|string_param|stylesheet|types)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(imap_)(auth|capabilities|client_buffer)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(pop3_)(auth|capabilities)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(smtp_)(auth|capabilities|client_buffer|greeting_delay)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(preread_)(buffer_size|timeout)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(mqtt_)(preread|buffers|rewrite_buffer_size|set_connect)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(zone_)(sync_(?:buffers|connect_retry_interval|connect_timeout|interval|recv_buffer_size|server|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_conf_command|ssl_crl|ssl_name|ssl_password_file|ssl_protocols|ssl_server_name|ssl_trusted_certificate|ssl_verify|ssl_verify_depth|timeout))(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(otel_)(exporter|service_name|trace|trace_context|span_name|span_attr)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(js_)(body_filter|content|fetch_buffer_size|fetch_ciphers|fetch_max_response_buffer_size|fetch_protocols|fetch_timeout|fetch_trusted_certificate|fetch_verify|fetch_verify_depth|header_filter|import|include|path|periodic|preload_object|set|shared_dict_zone|var|access|filter|preread)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" },
        "4": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /(["'\p{space}]|^)(daemon|env|include|pid|user??|aio|alias|directio|etag|listen|resolver|root|satisfy|sendfile|allow|deny|api|autoindex|charset|geo|gunzip|gzip|expires|index|keyval|mirror|perl|set|slice|ssi|ssl|zone|state|hash|keepalive|queue|random|sticky|match|userid|http2|http3|protocol|timeout|xclient|starttls|mqtt|load_module|lock_file|master_process|multi_accept|pcre_jit|thread_pool|timer_resolution|working_directory|absolute_redirect|aio_write|chunked_transfer_encoding|connection_pool_size|default_type|directio_alignment|disable_symlinks|if_modified_since|ignore_invalid_headers|large_client_header_buffers|merge_slashes|output_buffers|port_in_redirect|postpone_output|read_ahead|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver_timeout|sendfile_max_chunk|subrequest_output_buffer_size|try_files|underscores_in_headers|addition_types|override_charset|source_charset|create_full_put_path|min_delete_depth|f4f_buffer_size|gunzip_buffers|internal_redirect|keyval_zone|access_log|mirror_request_body|random_index|set_real_ip_from|valid_referers|rewrite_log|uninitialized_variable_warn|split_clients|least_time|sticky_cookie_insert|xml_entities|google_perftools_profiles)(["'\p{space}]|(?=\n?$))/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.nginx" },
        "2": { name: "keyword.directive.nginx" },
        "3": { name: "keyword.directive.nginx" }
      },
      end: /;/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /\b([0-9A-Z_a-z]+)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.directive.unknown.nginx" }
      },
      end: /(;|(?=\n?$))/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    },
    {
      begin: /\b([a-z]+\/[\-\+\.0-9A-Za-z]+)\b/dgv,
      beginCaptures: {
        "1": { name: "constant.other.mediatype.nginx" }
      },
      end: /(;)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.nginx" }
      },
      patterns: [
        { include: "#values" }
      ]
    }
  ],
  repository: {
    if_condition: {
      patterns: [
        { include: "#variables" },
        {
          match: /!?~\*?\p{space}/dgv,
          name: "keyword.operator.nginx"
        },
        {
          match: /!?-[defx]\p{space}/dgv,
          name: "keyword.operator.nginx"
        },
        {
          match: /!?=[^\=]/dgv,
          name: "keyword.operator.nginx"
        },
        { include: "#regexp_and_string" }
      ]
    },
    regexp_and_string: {
      patterns: [
        {
          match: /\^[^\n]*?\$/dgv,
          name: "string.regexp.nginx"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.nginx",
          patterns: [
            {
              match: /\\["'\\nt]/dgv,
              name: "constant.character.escape.nginx"
            },
            { include: "#variables" }
          ]
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.nginx",
          patterns: [
            {
              match: /\\["'\\nt]/dgv,
              name: "constant.character.escape.nginx"
            },
            { include: "#variables" }
          ]
        }
      ]
    },
    server_parameters: {
      patterns: [
        {
          captures: {
            "1": { name: "variable.parameter.nginx" },
            "2": { name: "keyword.operator.nginx" },
            "3": { name: "constant.numeric.nginx" }
          },
          match: /(?:^|\p{space})(weight|max_conn|max_fails|fail_timeout|slow_start)(=)(\p{Nd}[\.\p{Nd}]*[BDGHKMSTbdghkmst]?)(?:[\;\p{space}]|(?=\n?$))/dgv
        },
        { include: "#values" }
      ]
    },
    values: {
      patterns: [
        { include: "#variables" },
        {
          match: /#[^\n]*/dgv,
          name: "comment.line.number-sign"
        },
        {
          captures: {
            "1": { name: "constant.numeric.nginx" }
          },
          match: {
            G: [/(?<=￿|\p{space})(=?[0-9][\.0-9]*[BDGHKMSTbdghkmst]?)(?=[\t \;])/dgv, new EmulatedRegExp("(?<=^|\\p{space})(=?[0-9][\\.0-9]*[BDGHKMSTbdghkmst]?)(?=[\\t \\;])", "dgv", { strategy: "clip_search" })]
          }
        },
        {
          match: {
            G: [/(?<=￿|\p{space})(on|off|true|false)(?=[\t \;])/dgv, new EmulatedRegExp("(?<=^|\\p{space})(on|off|true|false)(?=[\\t \\;])", "dgv", { strategy: "clip_search" })]
          },
          name: "constant.language.nginx"
        },
        {
          match: {
            G: [/(?<=￿|\p{space})(kqueue|rtsig|epoll|\/dev\/poll|select|poll|eventport|max|all|default_server|default|main|crit|error|debug|warn|notice|last)(?=[\t \;])/dgv, new EmulatedRegExp("(?<=^|\\p{space})(kqueue|rtsig|epoll|/dev/poll|select|poll|eventport|max|all|default_server|default|main|crit|error|debug|warn|notice|last)(?=[\\t \\;])", "dgv", { strategy: "clip_search" })]
          },
          name: "constant.language.nginx"
        },
        {
          match: /\\[^\n]* |~\*?|!~\*?/dgv,
          name: "keyword.operator.nginx"
        },
        { include: "#regexp_and_string" }
      ]
    },
    variables: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.variable.nginx" },
            "2": { name: "variable.other.nginx" }
          },
          match: /(\$)([0-9A-Z_a-z]+)\b/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.nginx" },
            "2": { name: "variable.other.nginx" },
            "3": { name: "punctuation.definition.variable.nginx" }
          },
          match: /(\$\{)([0-9A-Z_a-z]+)(\})/dgv
        }
      ]
    }
  },
  dependencies: [
    "lua"
  ]
};
