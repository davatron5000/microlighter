import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "bird2",
  displayName: "BIRD2 Configuration",
  aliases: [
    "bird"
  ],
  scopeName: "source.bird2",
  patterns: [
    { include: "#comments" },
    { include: "#strings" },
    { include: "#ip-addresses" },
    { include: "#prefixes" },
    { include: "#vpn-rd" },
    { include: "#bytestrings" },
    { include: "#bgp-paths" },
    { include: "#print-statements" },
    { include: "#template-definitions" },
    { include: "#filter-definitions" },
    { include: "#function-definitions" },
    { include: "#protocol-definitions" },
    { include: "#next-hop-statements" },
    { include: "#neighbor-statements" },
    { include: "#import-export-statements" },
    { include: "#variable-declarations" },
    { include: "#method-calls" },
    { include: "#function-calls" },
    { include: "#method-properties" },
    { include: "#route-attributes" },
    { include: "#data-types" },
    { include: "#constants" },
    { include: "#protocol-phrases" },
    { include: "#structural-keywords" },
    { include: "#functional-keywords" },
    { include: "#semantic-modifiers" },
    { include: "#builtin-functions" },
    { include: "#filter-names" },
    { include: "#user-variables" },
    { include: "#operators" },
    { include: "#numbers" },
    { include: "#symbols" },
    { include: "#blocks" }
  ],
  repository: {
    "bgp-paths": {
      patterns: [
        {
          begin: /\[=/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.bgp-path.begin.bird" }
          },
          end: /=\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.bgp-path.end.bird" }
          },
          name: "meta.bgp-path.bird",
          patterns: [
            {
              match: /[\*\+\?]/dgv,
              name: "keyword.operator.wildcard.bird"
            },
            {
              match: /\b[0-9]+\b/dgv,
              name: "constant.numeric.asn.bird"
            },
            { include: "#operators" },
            { include: "#symbols" }
          ]
        }
      ]
    },
    blocks: {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.block.begin.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.block.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.set.begin.bird" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.set.end.bird" }
          },
          name: "meta.set.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.tuple.begin.bird" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.tuple.end.bird" }
          },
          name: "meta.tuple.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          match: /;/dgv,
          name: "punctuation.terminator.statement.bird"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.bird"
        }
      ]
    },
    "builtin-functions": {
      patterns: [
        {
          match: /\b(?:defined|unset|roa_check|aspa_check|aspa_check_downstream|aspa_check_upstream|from_hex|format|append|prepend|add|delete|empty|reset|bt_assert|bt_check_assign|bt_test_suite|bt_test_same)\b/dgv,
          name: "support.function.builtin.bird"
        }
      ]
    },
    bytestrings: {
      patterns: [
        {
          match: /\bhex:\p{AHex}{2}(?:[\-\.\:\p{space}]*\p{AHex}{2})*\b/dgv,
          name: "constant.numeric.bytestring.bird"
        },
        {
          match: /\b(?:\p{AHex}{2}[\-\.\:\p{space}]*){15,}\p{AHex}{2}\b/dgv,
          name: "constant.numeric.bytestring.bird"
        },
        {
          match: /\b\p{AHex}{32,}\b/dgv,
          name: "constant.numeric.bytestring.bird"
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.bird" }
          },
          end: /(?=\n?$)/dgv,
          name: "comment.line.number-sign.bird"
        },
        {
          begin: /\/\*/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.bird" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.bird" }
          },
          name: "comment.block.bird"
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b(?:on|off|yes|no|true|false)\b/dgv,
          name: "constant.language.boolean.bird"
        },
        {
          match: /\b(?:empty|unknown|generic|rt|ro|one|ten)\b/dgv,
          name: "constant.language.special.bird"
        },
        {
          match: /\bSCOPE_(?:HOST|LINK|SITE|ORGANIZATION|UNIVERSE|UNDEFINED)\b/dgv,
          name: "constant.language.scope.bird"
        },
        {
          match: /\bRTS_(?:STATIC|INHERIT|DEVICE|STATIC_DEVICE|REDIRECT|RIP|OSPF|OSPF_IA|OSPF_EXT1|OSPF_EXT2|BGP|PIPE|BABEL|RPKI|L3VPN|AGGREGATED|BRIDGE|EVPN)\b/dgv,
          name: "constant.language.source.bird"
        },
        {
          match: /\bRTD_(?:UNICAST|ROUTER|DEVICE|MULTIPATH|BLACKHOLE|UNREACHABLE|PROHIBIT)\b/dgv,
          name: "constant.language.dest.bird"
        },
        {
          match: /\bROA_(?:UNKNOWN|INVALID|VALID)\b/dgv,
          name: "constant.language.roa.bird"
        },
        {
          match: /\bASPA_(?:UNKNOWN|INVALID|VALID)\b/dgv,
          name: "constant.language.aspa.bird"
        },
        {
          match: /\bORIGIN_(?:IGP|EGP|INCOMPLETE)\b/dgv,
          name: "constant.language.bgp-origin.bird"
        },
        {
          match: /\bRA_PREF_(?:LOW|MEDIUM|HIGH)\b/dgv,
          name: "constant.language.ra-preference.bird"
        },
        {
          match: /\bAF_IPV[46]\b/dgv,
          name: "constant.language.address-family.bird"
        },
        {
          match: /\bKBR_SRC_(?:BIRD|LOCAL|STATIC|DYNAMIC)\b/dgv,
          name: "constant.language.bridge-source.bird"
        },
        {
          match: /\bNET_(?:IP4|IP6|IP6_SADR|VPN4|VPN6|ROA4|ROA6|FLOW4|FLOW6|MPLS|ETH|ASPA|EVPN|EVPN_EAD|EVPN_MAC|EVPN_IMET|EVPN_ES|NEIGHBOR)\b/dgv,
          name: "constant.language.net-type.bird"
        },
        {
          match: /\bMPLS_POLICY_(?:NONE|STATIC|PREFIX|AGGREGATE|VRF)\b/dgv,
          name: "constant.language.mpls.bird"
        }
      ]
    },
    "data-types": {
      patterns: [
        {
          match: /\b(?:(?:int|pair|quad|ip|prefix|mac|ec|lc|rd|enum)\p{space}+set|int|bool|ip|prefix|mac|rd|pair|quad|ec|lc|string|bytestring|bgpmask|bgppath|clist|eclist|lclist|set|enum|route)\b/dgv,
          name: "storage.type.bird"
        }
      ]
    },
    "filter-definitions": {
      patterns: [
        {
          begin: /\b(filter)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.filter.bird" },
            "2": { name: "entity.name.function.filter.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.filter-definition.bird",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "filter-names": {
      patterns: [
        {
          match: /\b[A-Z_a-z][0-9A-Z_a-z]*_filter\b/dgv,
          name: "entity.name.function.filter.bird"
        }
      ]
    },
    "function-calls": {
      patterns: [
        {
          begin: /\b([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*\(/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.call.bird" }
          },
          end: /\)/dgv,
          name: "meta.function-call.bird",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "function-definitions": {
      patterns: [
        {
          begin: /\b(function)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')(?=\p{space}*\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.function.bird" },
            "2": { name: "entity.name.function.user-defined.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.function-definition.bird",
          patterns: [
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.parameters.begin.bird" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.parameters.end.bird" }
              },
              name: "meta.function-parameters.bird",
              patterns: [
                { include: "#data-types" },
                { include: "#symbols" }
              ]
            },
            {
              begin: /->/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.return-type.bird" }
              },
              end: /(?=\{)/dgv,
              name: "meta.function-return-type.bird",
              patterns: [
                { include: "#data-types" }
              ]
            },
            { include: "$self" }
          ]
        }
      ]
    },
    "functional-keywords": {
      patterns: [
        {
          match: /\b(?:static|rip|ospf|bgp|babel|rpki|bfd|bmp|device|direct|kernel|pipe|perf|mrt|aggregator|l3vpn|radv|bridge|evpn)\b/dgv,
          name: "keyword.control.protocol-type.bird"
        },
        {
          match: /\b(?:graceful|restart|preference|disabled|hold|keepalive|connect|retry|start|delay|error|wait|forget|scan|randomize|router|id)\b/dgv,
          name: "keyword.control.routing.bird"
        },
        {
          match: /\b(?:interface|type|wired|wireless|tunnel|rxcost|limit|hello|update|interval|port|tx|class|dscp|priority|rx|buffer|length|check|link|rtt|cost|min|max|decay|send|timestamps)\b/dgv,
          name: "keyword.other.interface.bird"
        },
        {
          match: /\bpreferred\b/dgv,
          name: "keyword.other.device.bird"
        },
        {
          match: /\b(?:(?:refresh\p{space}+keep|retry\p{space}+keep|expire\p{space}+keep|transport\p{space}+tcp|transport\p{space}+ssh|authentication\p{space}+none|authentication\p{space}+md5|local\p{space}+address|ignore\p{space}+max\p{space}+length|min\p{space}+version|max\p{space}+version|bird\p{space}+private\p{space}+key|remote\p{space}+public\p{space}+key)|(?:refresh|retry|expire|transport|ssh|tcp|user|address|version|ignore|private|public|key))\b/dgv,
          name: "keyword.other.rpki.bird"
        },
        {
          match: /\b(?:cmac\p{space}+aes128|authentication|none|mac|permissive|ao|password|keys??|secret|deprecated|preferred|generate|accept|from|to|algorithm|hmac|cmac|aes128|sha1|sha224|sha256|sha384|sha512|blake2s128|blake2s256|blake2b256|blake2b512)\b/dgv,
          name: "keyword.other.auth.bird"
        },
        {
          match: /\btime\b/dgv,
          name: "keyword.other.time.bird"
        },
        {
          match: /\b(?:hostname|description|debug|log|syslog|stderr|udp|cli|bird|protocols|tables|channels|timeouts|passwords|bfd|confederation|cluster|stub|dead|neighbors|area|md5|multihop|passive|rfc1583compat|tick|ls|retransmit|transmit|ack|state|database|summary|external|nssa|translator|always|candidate|never|role|stability|election|action|warn|warning|auth|bug|fatal|info|trace|block|disable|keep|filtered|receive|modify|add|delete|withdraw|unreachable|blackhole|prohibit|unreach|igp_metric|localpref|med|origin|community|large_community|ext_community|as_path|prepend|weight|gateway|scope|onlink|recursive|multipath|igp|channel|sadr|src|learn|persist|via|ng|threads?|group|cork|threshold|settle|digest|fixed|ping|wakeup|scheduling|sockets|allocator|timers|mrtdump|timeformat|preexport|noexport|exported|stats|count|rpki|reload)\b/dgv,
          name: "keyword.other.config.bird"
        },
        {
          match: /\b(?:flow4|flow6|dst|src|proto|header|dport|sport|icmp|code|tcp|flags|dscp|dont_fragment|is_fragment|first_fragment|last_fragment|fragment|label|offset)\b/dgv,
          name: "keyword.other.flowspec.bird"
        },
        {
          match: /\b(?:ipv4-mpls|ipv6-mpls|ipv6-sadr|vpn4-mc|vpn4-mpls|vpn6-mc|vpn6-mpls|ipv4_mc|ipv6_mc|vpn4|vpn6|mpls|aspa|roa4|roa6|eth|evpn|neighbor|pri|sec)\b/dgv,
          name: "keyword.other.address.bird"
        },
        {
          match: /\b(?:all|none)\b/dgv,
          name: "keyword.other.quick-declaration.bird"
        }
      ]
    },
    "import-export-statements": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.import-export.bird" },
            "2": { name: "keyword.control.filter.bird" },
            "3": { name: "entity.name.function.filter.bird" }
          },
          match: /\b(import)\p{space}+(filter)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\b/dgv,
          name: "meta.import-statement.bird"
        },
        {
          begin: /\b(import)\p{space}+(filter)\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.import-export.bird" },
            "2": { name: "keyword.control.filter.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.import-filter-inline.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\b(export)\p{space}+(where)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.import-export.bird" },
            "2": { name: "keyword.control.where.bird" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.statement.bird" }
          },
          name: "meta.export-where-clause.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\b(export\p{space}+in)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.import-export.bird" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.statement.bird" }
          },
          name: "meta.export-prefilter-clause.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.control.import-export.bird" },
            "2": { name: "keyword.control.filter.bird" },
            "3": { name: "entity.name.function.filter.bird" }
          },
          match: /\b(export)\p{space}+(filter)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\b/dgv,
          name: "meta.export-statement.bird"
        }
      ]
    },
    "ip-addresses": {
      patterns: [
        {
          match: /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?:\/[0-9]{1,2})?\b/dgv,
          name: "constant.numeric.ip.ipv4.bird"
        },
        {
          match: /\b(?:\p{AHex}{0,4}:){2,7}\p{AHex}{0,4}(?:\/[0-9]{1,3})?\b/dgv,
          name: "constant.numeric.ip.ipv6.bird"
        },
        {
          match: /::(?:\p{AHex}{0,4}:){0,6}\p{AHex}{0,4}(?:\/[0-9]{1,3})?\b/dgv,
          name: "constant.numeric.ip.ipv6.bird"
        },
        {
          match: /\b(?:\p{AHex}{0,4}:){1,6}::(?:\p{AHex}{0,4}:){0,5}\p{AHex}{0,4}(?:\/[0-9]{1,3})?\b/dgv,
          name: "constant.numeric.ip.ipv6.bird"
        }
      ]
    },
    "method-calls": {
      patterns: [
        {
          begin: /\.\p{space}*([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*\(/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.method.bird" }
          },
          end: /\)/dgv,
          name: "meta.method-call.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          captures: {
            "1": { name: "variable.other.property.bird" }
          },
          match: /\.\p{space}*([A-Z_a-z][0-9A-Z_a-z]*)/dgv,
          name: "meta.method-access.bird"
        }
      ]
    },
    "method-properties": {
      patterns: [
        {
          match: /(?<=\.)\p{space}*(?:first|last|last_nonaggregated|len|asn|data1??|data2|is_v4|ip|src|dst|rd|maxlen|type|mask|min|max|mac|vlan_id|evpn_type|evpn_tag|evpn_esi|router_ip)\b(?!\p{space}*\()/dgv,
          name: "support.variable.property.bird"
        }
      ]
    },
    "neighbor-statements": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.local.bird" },
            "2": { name: "entity.name.symbol.local-address.bird" },
            "3": { name: "keyword.control.port.bird" },
            "4": { name: "constant.numeric.port.bird" },
            "5": { name: "keyword.control.as.bird" },
            "6": { name: "constant.numeric.asn.bird" }
          },
          match: /\b(local)\p{space}+([\.\:\p{AHex}]+|[A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')(?:\p{space}+(port)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*))?\p{space}+(as)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.local-as-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.local.bird" },
            "2": { name: "keyword.control.as.bird" },
            "3": { name: "constant.numeric.asn.bird" }
          },
          match: /\b(local)\p{space}+(as)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.local-as-template-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.neighbor.bird" },
            "2": { name: "constant.numeric.ip-address.bird" },
            "3": { name: "meta.interface-reference.bird" },
            "4": { name: "string.quoted.single.interface.bird" },
            "5": { name: "variable.other.interface.bird" },
            "6": { name: "keyword.control.as.bird" },
            "7": { name: "constant.numeric.asn.bird" },
            "8": { name: "keyword.control.port.bird" },
            "9": { name: "constant.numeric.port.bird" }
          },
          match: /\b(neighbor)\p{space}+([\.\:\p{AHex}]+)\p{space}*(%\p{space}*(?:'([\-\.0-\:A-Z_a-z]+)'|([\-\.0-\:A-Z_a-z]+)))?(?:\p{space}+(as)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*))?\p{space}+(port)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.neighbor-port-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.neighbor.bird" },
            "2": { name: "entity.name.symbol.neighbor-address.bird" },
            "3": { name: "meta.interface-reference.bird" },
            "4": { name: "string.quoted.single.interface.bird" },
            "5": { name: "variable.other.interface.bird" },
            "6": { name: "keyword.control.as.bird" },
            "7": { name: "constant.numeric.asn.bird" },
            "8": { name: "keyword.control.port.bird" },
            "9": { name: "constant.numeric.port.bird" }
          },
          match: /\b(neighbor)\p{space}+('[\-\.0-\:A-Z_a-z]+'|(?!(?:as|range)\b)[A-Z_a-z][0-9A-Z_a-z]*)\p{space}*(%\p{space}*(?:'([\-\.0-\:A-Z_a-z]+)'|([\-\.0-\:A-Z_a-z]+)))?(?:\p{space}+(as)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*))?\p{space}+(port)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.neighbor-port-symbolic-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.neighbor.bird" },
            "2": { name: "constant.numeric.ip-address.bird" },
            "3": { name: "meta.interface-reference.bird" },
            "4": { name: "string.quoted.single.interface.bird" },
            "5": { name: "variable.other.interface.bird" },
            "6": { name: "keyword.control.as.bird" },
            "7": { name: "constant.numeric.asn.bird" }
          },
          match: /\b(neighbor)\p{space}+([\.\:\p{AHex}]+)\p{space}*(%\p{space}*(?:'([\-\.0-\:A-Z_a-z]+)'|([\-\.0-\:A-Z_a-z]+)))?\p{space}+(as)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.neighbor-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.neighbor.bird" },
            "2": { name: "entity.name.symbol.neighbor-address.bird" },
            "3": { name: "meta.interface-reference.bird" },
            "4": { name: "string.quoted.single.interface.bird" },
            "5": { name: "variable.other.interface.bird" },
            "6": { name: "keyword.control.as.bird" },
            "7": { name: "constant.numeric.asn.bird" }
          },
          match: /\b(neighbor)\p{space}+('[\-\.0-\:A-Z_a-z]+'|(?!(?:as|range)\b)[A-Z_a-z][0-9A-Z_a-z]*)\p{space}*(%\p{space}*(?:'([\-\.0-\:A-Z_a-z]+)'|([\-\.0-\:A-Z_a-z]+)))?\p{space}+(as)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.neighbor-symbolic-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.neighbor.bird" },
            "2": { name: "keyword.control.as.bird" },
            "3": { name: "constant.numeric.asn.bird" }
          },
          match: /\b(neighbor)\p{space}+(as)\p{space}+([0-9]+|[A-Z_a-z][0-9A-Z_a-z]*)\b/dgv,
          name: "meta.neighbor-template-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.neighbor.bird" },
            "2": { name: "entity.name.symbol.neighbor-address.bird" },
            "3": { name: "keyword.other.semantic-modifier.bird" }
          },
          match: /\b(neighbor)\p{space}+([\.\:\p{AHex}]+|(?:'[\-\.0-\:A-Z_a-z]+'|(?!(?:as|range)\b)[A-Z_a-z][0-9A-Z_a-z]*))\p{space}+((?:in|ex)ternal)\b/dgv,
          name: "meta.neighbor-role-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.neighbor.bird" },
            "2": { name: "entity.name.symbol.neighbor-address.bird" },
            "3": { name: "keyword.other.semantic-modifier.bird" }
          },
          match: /\b(neighbor)\p{space}+([\.\:\p{AHex}]+|(?:'[\-\.0-\:A-Z_a-z]+'|(?!(?:as|range)\b)[A-Z_a-z][0-9A-Z_a-z]*))\p{space}+(onlink)\b/dgv,
          name: "meta.neighbor-onlink-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.source.bird" },
            "2": { name: "constant.numeric.ip-address.bird" }
          },
          match: /\b(source address)\p{space}+([\.\:\p{AHex}]+)\b/dgv,
          name: "meta.source-address-statement.bird"
        }
      ]
    },
    "next-hop-statements": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.routing.bird" },
            "2": { name: "keyword.other.ip-version.bird" },
            "3": { name: "constant.numeric.ip-address.bird" }
          },
          match: /\b(next hop)\p{space}+(ipv4)\p{space}+([\.0-9]+)\b/dgv,
          name: "meta.next-hop-ipv4.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.routing.bird" },
            "2": { name: "keyword.other.ip-version.bird" },
            "3": { name: "constant.numeric.ip-address.bird" }
          },
          match: /\b(next hop)\p{space}+(ipv6)\p{space}+([\:\p{AHex}]+)\b/dgv,
          name: "meta.next-hop-ipv6.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.routing.bird" },
            "2": { name: "keyword.other.semantic-modifier.bird" }
          },
          match: /\b(next hop)\p{space}+(self)\b/dgv,
          name: "meta.next-hop-simple.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.routing.bird" },
            "2": { name: "keyword.other.semantic-modifier.bird" }
          },
          match: /\b(next hop prefer)\p{space}+(global|local|native|ipv6)\b/dgv,
          name: "meta.next-hop-prefer-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.routing.bird" },
            "2": { name: "keyword.other.semantic-modifier.bird" }
          },
          match: /\b(next hop keep)(?:\p{space}+([ei]bgp))?\b/dgv,
          name: "meta.next-hop-keep-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.routing.bird" },
            "2": { name: "keyword.other.semantic-modifier.bird" }
          },
          match: /\b(extended next hop)\p{space}+(o(?:n|ff))\b/dgv,
          name: "meta.extended-next-hop-statement.bird"
        },
        {
          captures: {
            "1": { name: "keyword.control.routing.bird" },
            "2": { name: "keyword.other.semantic-modifier.bird" }
          },
          match: /\b(require extended next hop)\p{space}+(yes|no|on|off|true|false)\b/dgv,
          name: "meta.require-extended-next-hop-statement.bird"
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /\b0x\p{AHex}+\b/dgv,
          name: "constant.numeric.hex.bird"
        },
        {
          match: /\b[0-9]+\b/dgv,
          name: "constant.numeric.decimal.bird"
        },
        {
          captures: {
            "1": { name: "keyword.other.unit.bird" }
          },
          match: /\b[0-9]+\p{space}*([mu]??s)\b/dgv,
          name: "constant.numeric.time.bird"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /==|!=|<=|>=|!~|[\<\=\>\~]/dgv,
          name: "keyword.operator.comparison.bird"
        },
        {
          match: /&&|\|\||!|->/dgv,
          name: "keyword.operator.logical.bird"
        },
        {
          match: /(?<!&)&(?!&)|(?<!\|)\|(?!\|)/dgv,
          name: "keyword.operator.bitwise.bird"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.concat.bird"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.bird"
        },
        {
          match: /\.\./dgv,
          name: "keyword.operator.range.bird"
        },
        {
          match: /\./dgv,
          name: "keyword.operator.accessor.bird"
        }
      ]
    },
    prefixes: {
      patterns: [
        {
          match: /(?<![0-\:A-Z_a-z])(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}|(?:\p{AHex}{0,4}:){1,7}\p{AHex}{0,4})\/[0-9]{1,3}(?:[\-\+]|\{[0-9]+,[0-9]+\})?(?![0-9A-Z_a-z])/dgv,
          name: "constant.numeric.prefix.bird"
        }
      ]
    },
    "print-statements": {
      patterns: [
        {
          begin: /\b(printn??)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.print.bird" }
          },
          end: /;/dgv,
          endCaptures: {
            "0": { name: "punctuation.terminator.statement.bird" }
          },
          name: "meta.print-statement.bird",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "protocol-definitions": {
      patterns: [
        {
          begin: /\b(protocol)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\p{space}+(from)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.protocol.bird" },
            "2": { name: "entity.name.type.protocol.bird" },
            "3": { name: "entity.name.function.protocol.bird" },
            "4": { name: "keyword.control.template-reference.bird" },
            "5": { name: "entity.name.function.template.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.protocol-definition-with-template.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\b(protocol)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.protocol.bird" },
            "2": { name: "entity.name.type.protocol.bird" },
            "3": { name: "entity.name.function.protocol.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.protocol-definition-with-name.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\b(protocol)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.protocol.bird" },
            "2": { name: "entity.name.type.protocol.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.protocol-definition-anonymous.bird",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "protocol-phrases": {
      patterns: [
        {
          match: /\b(?:strict\p{space}+bind|zero\p{space}+udp6\p{space}+checksum\p{space}+rx|idle\p{space}+tx\p{space}+interval|min\p{space}+rx\p{space}+interval|min\p{space}+tx\p{space}+interval|accept\p{space}+ipv4|accept\p{space}+multihop|authentication\p{space}+meticulous\p{space}+keyed\p{space}+sha1|keyed\p{space}+md5|keyed\p{space}+sha1|meticulous\p{space}+keyed\p{space}+md5|meticulous\p{space}+keyed\p{space}+sha1|express\p{space}+thread\p{space}+group|multiplier|keyed|meticulous)\b/dgv,
          name: "keyword.other.bfd.phrase.bird"
        },
        {
          match: /\b(?:hello\p{space}+interval|update\p{space}+interval|send\p{space}+timestamps|rtt\p{space}+(?:cost|min|max|decay)|next\p{space}+hop\p{space}+prefer\p{space}+ipv6|next\p{space}+hop\p{space}+prefer|next\p{space}+hop\p{space}+ipv4|next\p{space}+hop\p{space}+ipv6|authentication\p{space}+mac\p{space}+permissive|authentication\p{space}+mac|randomize\p{space}+router\p{space}+id|show\p{space}+babel\p{space}+interfaces|show\p{space}+babel\p{space}+neighbors|show\p{space}+babel\p{space}+entries|show\p{space}+babel\p{space}+routes|prefer|native)\b/dgv,
          name: "keyword.other.babel.phrase.bird"
        },
        {
          match: new EmulatedRegExp("\\b(?:ipv4\\p{space}+multicast|ipv4\\p{space}+mpls|ipv6\\p{space}+multicast|ipv6\\p{space}+mpls|vpn4\\p{space}+multicast|vpn4\\p{space}+mpls|vpn6\\p{space}+multicast|vpn6\\p{space}+mpls|rr\\p{space}+cluster\\p{space}+id|confederation\\p{space}+member|hold\\p{space}+time|min\\p{space}+hold\\p{space}+time|startup\\p{space}+hold\\p{space}+time|path\\p{space}+metric|prefer\\p{space}+older|connect\\p{space}+delay\\p{space}+time|connect\\p{space}+retry\\p{space}+time|keepalive\\p{space}+time|min\\p{space}+keepalive\\p{space}+time|send\\p{space}+hold\\p{space}+time|error\\p{space}+forget\\p{space}+time|error\\p{space}+wait\\p{space}+time|min\\p{space}+graceful\\p{space}+restart\\p{space}+time|max\\p{space}+graceful\\p{space}+restart\\p{space}+time|long\\p{space}+lived\\p{space}+graceful\\p{space}+restart\\p{space}+aware|min\\p{space}+long\\p{space}+lived\\p{space}+stale\\p{space}+time|max\\p{space}+long\\p{space}+lived\\p{space}+stale\\p{space}+time|disable\\p{space}+rx|send\\p{space}+id|recv\\p{space}+id|next\\p{space}+hop\\p{space}+self|next\\p{space}+hop\\p{space}+address|next\\p{space}+hop\\p{space}+ibgp|next\\p{space}+hop\\p{space}+ebgp|next\\p{space}+hop\\p{space}+prefer\\p{space}+global|next\\p{space}+hop\\p{space}+prefer\\p{space}+local|next\\p{space}+hop\\p{space}+keep|link\\p{space}+local\\p{space}+next\\p{space}+hop\\p{space}+format|import\\p{space}+table|export\\p{space}+table|base\\p{space}+table|igp\\p{space}+table|add\\p{space}+paths\\p{space}+rx|add\\p{space}+paths\\p{space}+tx|add\\p{space}+paths|require\\p{space}+add\\p{space}+paths|gateway\\p{space}+direct|aigp\\p{space}+originate|long\\p{space}+lived\\p{space}+graceful\\p{space}+restart|long\\p{space}+lived\\p{space}+stale\\p{space}+time|dynamic\\p{space}+name(?:\\p{space}+digits)?|free\\p{space}+bind|ttl\\p{space}+security|multihop\\p{space}+password|authentication\\p{space}+ao|tx\\p{space}+size\\p{space}+warning|rr\\p{space}+client|rs\\p{space}+client|advertise\\p{space}+hostname|interpret\\p{space}+communities|deterministic\\p{space}+med|default\\p{space}+bgp_local_pref|default\\p{space}+bgp_med|med\\p{space}+metric|igp\\p{space}+metric|missing\\p{space}+lladdr|gateway\\p{space}+address|forwarding\\p{space}+addressed|gateway\\p{space}+recursive|allow\\p{space}+local\\p{space}+as|allow\\p{space}+bogus\\p{space}+as|allow\\p{space}+bgp_local_pref|allow\\p{space}+bgp_med|allow\\p{space}+as\\p{space}+sets|enable\\p{space}+route\\p{space}+refresh|enable\\p{space}+enhanced\\p{space}+route\\p{space}+refresh|require\\p{space}+route\\p{space}+refresh|require\\p{space}+enhanced\\p{space}+route\\p{space}+refresh|enable\\p{space}+as4|require\\p{space}+as4|enable\\p{space}+extended\\p{space}+messages|require\\p{space}+extended\\p{space}+messages|require\\p{space}+hostname|require\\p{space}+graceful\\p{space}+restart|require\\p{space}+long\\p{space}+lived\\p{space}+graceful\\p{space}+restart|require\\p{space}+extended\\p{space}+next\\p{space}+hop|disable\\p{space}+after\\p{space}+error|disable\\p{space}+after\\p{space}+cease|prefix\\p{space}+limit\\p{space}+hit|administrative\\p{space}+shutdown|peer\\p{space}+deconfigured|administrative\\p{space}+reset|connection\\p{space}+rejected|configuration\\p{space}+change|connection\\p{space}+collision|out\\p{space}+of\\p{space}+resources|enforce\\p{space}+first\\p{space}+as|neighbor\\p{space}+range|interface\\p{space}+range|originate\\p{space}+community|full\\p{space}+route\\p{space}+table|link\\p{space}+local\\p{space}+next\\p{space}+hop\\p{space}+format\\p{space}+(?:native|single|double)|mandatory|secondary|validate|capabilities|primary|aigp|setkey|drop|single|double)\\b", "dgv", { lazyCompile: true }),
          name: "keyword.other.bgp.phrase.bird"
        },
        {
          match: /\b(?:local\p{space}+role|require\p{space}+roles)\b/dgv,
          name: "keyword.other.bgp-role.phrase.bird"
        },
        {
          match: /\b(?:provider|customer|rs_server|rs_client)\b/dgv,
          name: "constant.language.bgp-role.bird"
        },
        {
          match: /\b(?:mpls\p{space}+domain|label\p{space}+range\p{space}+static|label\p{space}+range\p{space}+dynamic|label\p{space}+range|label\p{space}+policy|static\p{space}+label|dynamic\p{space}+label)\b/dgv,
          name: "keyword.other.mpls.phrase.bird"
        },
        {
          match: /\b(?:recursive\p{space}+mpls|show\p{space}+static|igp\p{space}+table|check\p{space}+link)\b/dgv,
          name: "keyword.other.static.phrase.bird"
        },
        {
          match: /\b(?:generate\p{space}+from|generate\p{space}+to|accept\p{space}+from|accept\p{space}+to)\b/dgv,
          name: "keyword.other.auth-window.phrase.bird"
        },
        {
          match: /\b(?:import\p{space}+|export\p{space}+)limit\b/dgv,
          name: "keyword.other.channel-limit.phrase.bird"
        },
        {
          match: /\btx(?:\p{space}+class|\p{space}+dscp|\p{space}+priority)\b/dgv,
          name: "keyword.other.socket.phrase.bird"
        },
        {
          match: /\b(?:rx\p{space}+buffer|tx\p{space}+length|check\p{space}+link)\b/dgv,
          name: "keyword.other.interface.phrase.bird"
        },
        {
          match: /\b(?:debug\p{space}+latency\p{space}+limit|debug\p{space}+latency|debug\p{space}+show\p{space}+route|debug\p{space}+protocols|debug\p{space}+channels|debug\p{space}+tables|debug\p{space}+commands|debug\p{space}+all|debug\p{space}+(?:events|filters|interfaces|off|packets|routes|states)|watchdog\p{space}+warning|watchdog\p{space}+timeout|states|routes|filters|interfaces|events|packets|messages)\b/dgv,
          name: "keyword.other.diagnostics.phrase.bird"
        },
        {
          match: /\b(?:min\p{space}+settle\p{space}+time|max\p{space}+settle\p{space}+time|gc\p{space}+threshold|gc\p{space}+period|export\p{space}+settle\p{space}+time|sorted|trie|roa)\b/dgv,
          name: "keyword.other.table.phrase.bird"
        },
        {
          match: /\b(?:peer\p{space}+table|aggregate\p{space}+on|merge\p{space}+by)\b/dgv,
          name: "keyword.other.aggregator.phrase.bird"
        },
        {
          match: /\b(?:merge\p{space}+paths\p{space}+limit|merge\p{space}+paths|kernel\p{space}+table|netlink\p{space}+rx\p{space}+buffer)\b/dgv,
          name: "keyword.other.kernel.phrase.bird"
        },
        {
          match: /\b(?:route\p{space}+distinguisher|import\p{space}+target|export\p{space}+target|route\p{space}+target)\b/dgv,
          name: "keyword.other.l3vpn.phrase.bird"
        },
        {
          match: /\b(?:encapsulation\p{space}+vxlan|vlan\p{space}+filtering|vlan\p{space}+range|vni|vid|bridge\p{space}+device|kbr\p{space}+source)\b/dgv,
          name: "keyword.other.evpn-bridge.phrase.bird"
        },
        {
          match: /\b(?:tunnel\p{space}+device|router\p{space}+address|evpn\p{space}+(?:ead|mac|imet|es)|tag)\b/dgv,
          name: "keyword.other.evpn.phrase.bird"
        },
        {
          match: /\b(?:monitoring\p{space}+rib\p{space}+in\p{space}+pre_policy|monitoring\p{space}+rib\p{space}+in\p{space}+post_policy|system\p{space}+description|system\p{space}+name|tx\p{space}+buffer\p{space}+limit|station\p{space}+address|station)\b/dgv,
          name: "keyword.other.bmp.phrase.bird"
        },
        {
          match: /\b(?:solicited\p{space}+ra\p{space}+unicast|router\p{space}+discovery|min\p{space}+ra\p{space}+interval|max\p{space}+ra\p{space}+interval|min\p{space}+delay|link\p{space}+mtu|default\p{space}+lifetime|route\p{space}+lifetime|default\p{space}+preference|route\p{space}+preference|prefix\p{space}+linger\p{space}+time|route\p{space}+linger\p{space}+time|current\p{space}+hop\p{space}+limit|propagate\p{space}+routes|other\p{space}+config|reachable\p{space}+time|retrans\p{space}+timer|valid\p{space}+lifetime|preferred\p{space}+lifetime|lifetime\p{space}+mult|pd\p{space}+preferred|rdnss\p{space}+local|dnssl\p{space}+local|custom\p{space}+option\p{space}+type|custom\p{space}+option\p{space}+local|managed|trigger|sensitive|autonomous|skip|low|medium|high|rdnss|dnssl|domain|lifetime|value|ns)\b/dgv,
          name: "keyword.other.radv.phrase.bird"
        },
        {
          match: /\b(?:rip\p{space}+ng|mode\p{space}+multicast|mode\p{space}+broadcast|version\p{space}+only|check\p{space}+zero|update\p{space}+time|timeout\p{space}+time|garbage\p{space}+time|retransmit\p{space}+time|split\p{space}+horizon|poison\p{space}+reverse|demand\p{space}+circuit|ecmp\p{space}+limit|ecmp\p{space}+weight|infinity|show\p{space}+rip\p{space}+interfaces|show\p{space}+rip\p{space}+neighbors|ttl\p{space}+security\p{space}+tx\p{space}+only|authentication\p{space}+plaintext|authentication\p{space}+cryptographic)\b/dgv,
          name: "keyword.other.rip.phrase.bird"
        },
        {
          match: /\b(?:link\p{space}+lsa\p{space}+suppression|stub\p{space}+router|graceful\p{space}+restart\p{space}+aware|graceful\p{space}+restart\p{space}+time|ecmp\p{space}+limit|merge\p{space}+external|rfc5838|vpn\p{space}+pe|instance\p{space}+id|default\p{space}+nssa|default\p{space}+cost2?|stub\p{space}+cost|summary|networks|stubnet|hidden|translator\p{space}+stability|virtual\p{space}+link|transmit\p{space}+delay|dead\p{space}+count|poll|type\p{space}+bcast|type\p{space}+nbma|type\p{space}+pointopoint|type\p{space}+ptp|type\p{space}+ptmp|type\p{space}+pointomultipoint|eligible|real\p{space}+broadcast|ptp\p{space}+netmask|ptp\p{space}+address|strict\p{space}+nonbroadcast|rx\p{space}+buffer\p{space}+normal|rx\p{space}+buffer\p{space}+large|authentication\p{space}+simple|show\p{space}+ospf\p{space}+interface|show\p{space}+ospf\p{space}+neighbors|show\p{space}+ospf\p{space}+topology\p{space}+all|show\p{space}+ospf\p{space}+topology|show\p{space}+ospf\p{space}+state\p{space}+all|show\p{space}+ospf\p{space}+state|show\p{space}+ospf\p{space}+lsadb\p{space}+global|show\p{space}+ospf\p{space}+lsadb\p{space}+area|show\p{space}+ospf\p{space}+lsadb\p{space}+link|show\p{space}+ospf\p{space}+lsadb\p{space}+type|show\p{space}+ospf\p{space}+lsadb\p{space}+lsid|show\p{space}+ospf\p{space}+lsadb\p{space}+self|show\p{space}+ospf\p{space}+lsadb\p{space}+router|show\p{space}+ospf\p{space}+lsadb|show\p{space}+ospf|ospf\p{space}+v2|ospf\p{space}+v3|instance|tag|v2|v3)\b/dgv,
          name: "keyword.other.ospf.phrase.bird"
        },
        {
          match: /\b(?:aspa\p{space}+providers|transit\p{space}+providers|route\p{space}+aspa)\b/dgv,
          name: "keyword.other.aspa.phrase.bird"
        },
        {
          match: /\b(?:next\p{space}+header|icmp\p{space}+type|icmp\p{space}+code|tcp\p{space}+flags)\b/dgv,
          name: "keyword.other.flowspec.phrase.bird"
        },
        {
          match: /\b(?:thread\p{space}+group|show\p{space}+threads\p{space}+all|show\p{space}+threads|cork\p{space}+threshold|route\p{space}+refresh\p{space}+export\p{space}+settle\p{space}+time|digest\p{space}+settle\p{space}+time|filter\p{space}+stacks|max\p{space}+generation)\b/dgv,
          name: "keyword.other.threading.phrase.bird"
        },
        {
          match: /\b(?:always\p{space}+add\p{space}+path|filename)\b/dgv,
          name: "keyword.other.mrt.phrase.bird"
        },
        {
          match: /\b(?:mode\p{space}+import|mode\p{space}+export|exp\p{space}+from|exp\p{space}+to|threshold\p{space}+min|threshold\p{space}+max|repeat)\b/dgv,
          name: "keyword.other.perf.phrase.bird"
        },
        {
          match: /\b(?:router\p{space}+id\p{space}+from|graceful\p{space}+restart\p{space}+wait|vrf\p{space}+default|receive\p{space}+limit|import\p{space}+keep\p{space}+filtered|export\p{space}+in|rpki\p{space}+reload|mrtdump\p{space}+protocols)\b/dgv,
          name: "keyword.other.operations.phrase.bird"
        },
        {
          match: /\bshow(?:\p{space}+status|\p{space}+protocols\p{space}+all|\p{space}+protocols|\p{space}+interfaces\p{space}+summary|\p{space}+interfaces|\p{space}+symbols\p{space}+table|\p{space}+symbols\p{space}+filter|\p{space}+symbols\p{space}+function|\p{space}+symbols\p{space}+protocol|\p{space}+symbols\p{space}+template|\p{space}+symbols|\p{space}+route\p{space}+for|\p{space}+route\p{space}+in|\p{space}+route\p{space}+table|\p{space}+route\p{space}+filter|\p{space}+route\p{space}+where|\p{space}+route\p{space}+all|\p{space}+route\p{space}+primary|\p{space}+route\p{space}+filtered|\p{space}+route\p{space}+import|\p{space}+route\p{space}+export|\p{space}+route\p{space}+exported|\p{space}+route\p{space}+preexport|\p{space}+route\p{space}+noexport|\p{space}+route\p{space}+protocol|\p{space}+route\p{space}+stats|\p{space}+route\p{space}+count|\p{space}+bfd\p{space}+sessions\p{space}+address|\p{space}+bfd\p{space}+sessions\p{space}+direct|\p{space}+bfd\p{space}+sessions\p{space}+multihop|\p{space}+bfd\p{space}+sessions\p{space}+interface|\p{space}+bfd\p{space}+sessions\p{space}+dev|\p{space}+bfd\p{space}+sessions\p{space}+all|\p{space}+bfd\p{space}+sessions\p{space}+ipv4|\p{space}+bfd\p{space}+sessions\p{space}+ipv6|\p{space}+bfd\p{space}+sessions|\p{space}+mpls\p{space}+ranges|\p{space}+memory|\p{space}+route)\b/dgv,
          name: "keyword.other.cli-show.phrase.bird"
        },
        {
          match: /\breload(?:\p{space}+filters\p{space}+in|\p{space}+filters\p{space}+out|\p{space}+filters|\p{space}+bgp\p{space}+in|\p{space}+bgp\p{space}+out|\p{space}+bgp|\p{space}+in|\p{space}+out)\b/dgv,
          name: "keyword.other.cli-reload.phrase.bird"
        },
        {
          match: /\bpartial\b/dgv,
          name: "keyword.other.cli-reload-modifier.bird"
        },
        {
          match: /\b(?:dump\p{space}+tables|dump\p{space}+attribute\p{space}+stats|dump\p{space}+ao\p{space}+keys|dump\p{space}+filter\p{space}+all|dump\p{space}+resources|dump\p{space}+sockets|dump\p{space}+events|dump\p{space}+interfaces|dump\p{space}+neighbors|dump\p{space}+attributes|dump\p{space}+routes|dump\p{space}+protocols|mrt\p{space}+dump\p{space}+table|mrt\p{space}+dump\p{space}+where|mrt\p{space}+dump\p{space}+to|mrt\p{space}+dump\p{space}+filter|mrt\p{space}+dump|timeformat\p{space}+route|timeformat\p{space}+protocol|timeformat\p{space}+base|timeformat\p{space}+log|timeformat\p{space}+iso|configure\p{space}+soft\p{space}+timeout|configure\p{space}+soft|configure\p{space}+timeout|configure\p{space}+confirm|configure\p{space}+undo|configure\p{space}+status|configure\p{space}+check|restrict|echo|enable|disable|restart|debug|mrtdump|quit|exit|help)\b/dgv,
          name: "keyword.other.cli-dump.phrase.bird"
        },
        {
          match: /\b(?:configure|down|graceful\p{space}+restart|timeformat\p{space}+(?:short|long|ms|us))\b/dgv,
          name: "keyword.other.cli-control.phrase.bird"
        }
      ]
    },
    "route-attributes": {
      patterns: [
        {
          match: /\b(?:net|scope|preference|from|gw|proto|source|dest|ifname|ifindex|weight|gw_mpls|gw_mpls_stack|onlink|igp_metric|local_metric|nexthop|hostentry|flowspec_valid|aspa_providers|roa_aggregated|mpls_label|mpls_policy|mpls_class|bgp_path|bgp_origin|bgp_next_hop|bgp_med|bgp_local_pref|bgp_community|bgp_ext_community|bgp_large_community|bgp_originator_id|bgp_cluster_list|bgp_atomic_aggr|bgp_aggregator|bgp_aigp|bgp_pmsi_tunnel|bgp_otc|bgp_mpls_label_stack|bgp_mp_reach_nlri|bgp_mp_unreach_nlri|bgp_as4_path|bgp_as4_aggregator|bgp_unknown_0x\p{AHex}{2}|ospf_metric1|ospf_metric2|ospf_tag|ospf_router_id|rip_metric|rip_tag|rip_from|babel_metric|babel_router_id|babel_seqno|radv_preference|radv_lifetime|ra_preference|ra_lifetime|krt_source|krt_metric|krt_prefsrc|krt_realm|krt_scope|krt_mtu|krt_window|krt_rtt|krt_rttvar|krt_ssthresh|krt_sstresh|krt_cwnd|krt_advmss|krt_reordering|krt_hoplimit|krt_initcwnd|krt_rto_min|krt_initrwnd|krt_quickack|krt_congctl|krt_fastopen_no_cookie|krt_lock_mtu|krt_lock_window|krt_lock_rtt|krt_lock_rttvar|krt_lock_ssthresh|krt_lock_sstresh|krt_lock_cwnd|krt_lock_advmss|krt_lock_reordering|krt_lock_hoplimit|krt_lock_initcwnd|krt_lock_rto_min|krt_lock_initrwnd|krt_lock_quickack|krt_lock_congctl|krt_lock_fastopen_no_cookie|krt_feature_allfrag|krt_feature_ecn|kbr_source|iface_type|iface_bridge_vlan_filtering|iface_vxlan_id|iface_vxlan_learning|iface_vxlan_ip_addr|mypath|mylclist)\b/dgv,
          name: "support.variable.route-attribute.bird"
        },
        {
          match: /\b(?:proto_name|proto_protocol_name|proto_protocol_type|proto_main_table_id|proto_state|proto_last_modified|proto_info|proto_proto_id|ea_proto_channel_list|proto_channel_id|channel_in_keep|rtable|proto_bgp_rem_id|proto_bgp_rem_as|proto_bgp_loc_as|proto_bgp_rem_ip|bgp_afi|bgp_peer_type|bgp_extended_next_hop|bgp_add_path_rx|bgp_in_conn_local_open_msg|bgp_in_conn_remote_open_msg|bgp_out_conn_local_open_msg|bgp_out_conn_remote_open_msg|bgp_in_conn_state|bgp_out_conn_state|bgp_in_conn_sk|bgp_out_conn_sk|bgp_state_startup|bgp_close_bmp|bgp_as4_session|bgp_as4_in_conn|bgp_as4_out_conn)\b/dgv,
          name: "support.variable.runtime.bird"
        }
      ]
    },
    "semantic-modifiers": {
      patterns: [
        {
          match: /\b(?:self|on|off|remote|extended|native|ipv6|internal|external)\b/dgv,
          name: "keyword.other.semantic-modifier.bird"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.bird" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.bird" }
          },
          name: "string.quoted.double.bird",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.bird"
            }
          ]
        },
        {
          match: /'[\-\.0-\:A-Z_a-z]+'/dgv,
          name: "entity.name.symbol.quoted.bird"
        }
      ]
    },
    "structural-keywords": {
      patterns: [
        {
          match: /\b(?:if|then|else|case|for|do|while|break|continue|return|in)\b/dgv,
          name: "keyword.control.bird"
        },
        {
          match: /\belse\p{space}*:/dgv,
          name: "keyword.control.case.else.bird"
        },
        {
          match: /\b(?:accept|reject|error)\b/dgv,
          name: "keyword.control.flow.bird"
        },
        {
          match: /\b(?:protocol|table|define|include|attribute|eval|ipv6\p{space}+sadr|ipv4\p{space}+mpls|ipv6\p{space}+mpls|vpn4\p{space}+mpls|vpn6\p{space}+mpls|ipv4|ipv6|local|as|from|where|cost|limit|action)\b/dgv,
          name: "keyword.control.structure.bird"
        }
      ]
    },
    symbols: {
      patterns: [
        {
          match: /\b[A-Z_a-z][0-9A-Z_a-z]*\b/dgv,
          name: "variable.other.bird"
        }
      ]
    },
    "template-definitions": {
      patterns: [
        {
          begin: /\b(template)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\p{space}+(from)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.template.bird" },
            "2": { name: "entity.name.type.protocol.bird" },
            "3": { name: "entity.name.function.template.bird" },
            "4": { name: "keyword.control.template-reference.bird" },
            "5": { name: "entity.name.function.template.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.template-definition-with-from.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\b(template)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*|'[\-\.0-\:A-Z_a-z]+')\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.template.bird" },
            "2": { name: "entity.name.type.protocol.bird" },
            "3": { name: "entity.name.function.template.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.template-definition-with-name.bird",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /\b(template)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*\{/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.template.bird" },
            "2": { name: "entity.name.type.protocol.bird" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.block.end.bird" }
          },
          name: "meta.template-definition-anonymous.bird",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "user-variables": {
      patterns: [
        {
          match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
          name: "variable.other.user-defined.bird"
        }
      ]
    },
    "variable-declarations": {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.bird" },
            "2": { name: "variable.other.declaration.bird" }
          },
          match: /\b((?:int|pair|quad|ip|prefix|mac|ec|lc|rd|enum)\p{space}+set|int|bool|ip|prefix|mac|rd|pair|quad|ec|lc|string|bytestring|bgpmask|bgppath|clist|eclist|lclist|set|enum|route)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)(?:\p{space}*=|;)/dgv,
          name: "meta.variable-declaration.bird"
        }
      ]
    },
    "vpn-rd": {
      match: /\b(?:[0-9]+:[0-9]+|[012]:[0-9]+:[0-9]+|(?:[0-9]{1,3}\.){3}[0-9]{1,3}:[0-9]+)\b/dgv,
      name: "constant.numeric.vpn-rd.bird"
    }
  },
  dependencies: []
};
