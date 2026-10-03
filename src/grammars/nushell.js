import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "nushell",
  displayName: "nushell",
  aliases: [
    "nu"
  ],
  scopeName: "source.nushell",
  patterns: [
    { include: "#define-variable" },
    { include: "#define-alias" },
    { include: "#function" },
    { include: "#extern" },
    { include: "#module" },
    { include: "#use-module" },
    { include: "#expression" },
    { include: "#comment" }
  ],
  repository: {
    binary: {
      begin: /\b(0x)(\[)/dgv,
      beginCaptures: {
        "1": { name: "constant.numeric.nushell" },
        "2": { name: "meta.brace.square.begin.nushell" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.begin.nushell" }
      },
      name: "constant.binary.nushell",
      patterns: [
        {
          match: /\p{AHex}{2}/dgv,
          name: "constant.numeric.nushell"
        }
      ]
    },
    "braced-expression": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.block.begin.bracket.curly.nushell" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.block.end.bracket.curly.nushell" }
      },
      name: "meta.expression.braced.nushell",
      patterns: [
        {
          begin: /(?<=\{)\p{space}*\|/dgv,
          end: /\|/dgv,
          name: "meta.closure.parameters.nushell",
          patterns: [
            { include: "#function-parameter" }
          ]
        },
        {
          begin: /(?!\p{Nd}{4}-\p{Nd}{2}-\p{Nd}{2}T\p{Nd}{2}:\p{Nd}{2}:\p{Nd}{2})([^"\#\$'\(\)\,\:\;\[\{\|\}\p{space}][^"'\(\)\,\:\;\[\{\|\}\p{space}]*)\p{space}*(:)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "string.bare.nushell variable.other.nushell" },
            "2": { name: "keyword.control.nushell" }
          },
          end: /(?=[\,\}])|(?<=[^\:\p{space}])(?=\p{space})/dgv,
          name: "meta.record-entry.nushell",
          patterns: [
            { include: "#record-value" }
          ]
        },
        {
          begin: /(\$"((?:[^"\\]|\\[^\n])*)")\p{space}*(:)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "variable.other.nushell" },
            "2": {
              name: "variable.other.nushell",
              patterns: [
                { include: "#paren-expression" }
              ]
            },
            "3": { name: "keyword.control.nushell" }
          },
          end: /(?=[\,\}])|(?<=[^\:\p{space}])(?=\p{space})/dgv,
          name: "meta.record-entry.nushell",
          patterns: [
            { include: "#record-value" }
          ]
        },
        {
          begin: /("(?:[^"\\]|\\[^\n])*")\p{space}*(:)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "string.quoted.double.nushell variable.other.nushell" },
            "2": { name: "keyword.control.nushell" }
          },
          end: /(?=[\,\}])|(?<=[^\:\p{space}])(?=\p{space})/dgv,
          name: "meta.record-entry.nushell",
          patterns: [
            { include: "#record-value" }
          ]
        },
        {
          begin: /(\$'([^']*)')\p{space}*(:)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "variable.other.nushell" },
            "2": {
              name: "variable.other.nushell",
              patterns: [
                { include: "#paren-expression" }
              ]
            },
            "3": { name: "keyword.control.nushell" }
          },
          end: /(?=[\,\}])|(?<=[^\:\p{space}])(?=\p{space})/dgv,
          name: "meta.record-entry.nushell",
          patterns: [
            { include: "#record-value" }
          ]
        },
        {
          begin: /('[^']*')\p{space}*(:)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "string.quoted.single.nushell variable.other.nushell" },
            "2": { name: "keyword.control.nushell" }
          },
          end: /(?=[\,\}])|(?<=[^\:\p{space}])(?=\p{space})/dgv,
          name: "meta.record-entry.nushell",
          patterns: [
            { include: "#record-value" }
          ]
        },
        { include: "#spread" },
        { include: "source.nushell" }
      ]
    },
    command: {
      begin: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:(\^)|(?![\$0-9]))([\!\.\p{L}\p{M}\p{N}\p{Pc}]+(?: (?!-)[\-\!\.\p{L}\p{M}\p{N}\p{Pc}]+(?:(?=[ \)])|(?=\n?$))|[\-\!\.\p{L}\p{M}\p{N}\p{Pc}]+)*|(?<=\^)\$?(?:"[^"]+"|'[^']+'))/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.nushell" },
        "2": {
          patterns: [
            { include: "#control-keywords" },
            {
              captures: {
                "0": { name: "keyword.other.builtin.nushell" }
              },
              match: /(?:ansi|char) [\p{L}\p{M}\p{N}\p{Pc}]+/dgv
            },
            {
              captures: {
                "1": { name: "keyword.other.builtin.nushell" },
                "2": {
                  patterns: [
                    { include: "#value" }
                  ]
                }
              },
              match: new EmulatedRegExp("(a(?:l(?:ias|l)|n(?:si(?: (?:gradient|link|strip))?|y)|ppend|st|ttr(?: (?:c(?:ategory|omplete(?: external)?)|deprecated|example|search-terms))?)|b(?:its(?: (?:and|not|or|ro[lr]|sh[lr]|xor))?|reak|ytes(?: (?:a(?:dd|t)|build|collect|ends-with|index-of|length|re(?:move|place|verse)|s(?:plit|tarts-with)))?)|c(?:al|d|h(?:ar|unk(?:-by|s))|l(?:ear|ip(?: (?:copy|paste))?)|o(?:l(?:lect|umns)|m(?:mandline(?: (?:edit|get-cursor|set-cursor))?|p(?:act|lete))|n(?:fig(?: (?:env|flatten|nu|reset|use-colors))?|st|tinue))|p)|d(?:ate(?: (?:f(?:ormat|rom-human)|humanize|list-timezone|now|to-timezone))?|e(?:bug(?: (?:e(?:nv|xperimental-options)|info|profile))?|code(?: (?:base(?:32(?:hex)?|64)|hex))?|f(?:ault)?|scribe|tect(?: (?:columns|type))?)|o|rop(?: (?:column|nth))?|t(?: (?:add|diff|format|now|part|to|utcnow))?|u)|e(?:ach(?: while)?|cho|moji|n(?:code(?: (?:base(?:32(?:hex)?|64)|hex))?|umerate)|rror(?: make)?|very|x(?:ec|it|p(?:l(?:ain|ore(?: (?:config|regex))?)|ort(?: (?:alias|const|def|extern|module|use)|-env)?)|tern))|f(?:i(?:l(?:[el]|ter)|nd|rst)|latten|or(?:mat(?: (?:bits|d(?:ate|uration)|filesize|number|pattern))?)?|rom(?: (?:csv|eml|i(?:cs|ni)|json|m(?:d|sgpackz?)|nuon|ods|p(?:arquet|list)|ssv|t(?:o(?:ml|on)|sv)|url|vcf|x(?:lsx|ml)|ya?ml))?)|g(?:e(?:nerate|t)|lob|r(?:id|oup-by)|stat)|h(?:ash(?: (?:md5|sha256))?|e(?:aders|lp(?: (?:aliases|commands|e(?:scapes|xterns)|modules|operators|pipe-and-redirect))?)|i(?:de(?:-env)?|sto(?:gram|ry(?: (?:import|session))?))|ttp(?: (?:delete|get|head|options|p(?:atch|o(?:ol|st)|ut)))?)|i(?:f|gnore|n(?:c|put(?: list(?:en)?)?|s(?:ert|pect)|t(?:erleave|o(?: (?:b(?:inary|ool)|cell-path|d(?:atetime|uration)|f(?:ilesize|loat)|glob|int|record|s(?:qlite|tring)|value))?))|s-(?:admin|empty|not-empty|terminal)|tems)|j(?:o(?:b(?: (?:describe|flush|id|kill|list|recv|s(?:end|pawn)|unfreeze))?|in)|s(?:on path|p)|walk)|k(?:eybindings(?: (?:default|list(?:en)?))?|ill)|l(?:ast|e(?:ngth|t(?:-env)?)|ines|o(?:ad-env|op))|m(?:at(?:ch|h(?: (?:a(?:bs|rc(?:cosh?|sinh?|tanh?)|vg)|c(?:eil|osh?)|exp|floor|l(?:n|og)|m(?:ax|edian|in|ode)|product|round|s(?:inh?|qrt|tddev|um)|tanh?|variance))?)|e(?:rge(?: deep)?|tadata(?: (?:access|set))?)|k(?:dir|temp)|o(?:dule|ve)|ut|v)|nu-(?:check|highlight)|o(?:pen|verlay(?: (?:hide|list|new|use))?)|p(?:a(?:nic|r(?:-each|se)|th(?: (?:basename|dirname|ex(?:ists|pand)|join|parse|relative-to|s(?:elf|plit)|type))?)|lugin(?: (?:add|list|rm|stop|use))?|o(?:lars(?: (?:a(?:gg(?:-groups)?|ll-(?:false|true)|ppend|rg-(?:m(?:ax|in)|sort|true|unique|where)|s(?:-date(?:time)?)?)|c(?:a(?:che|st)|o(?:l(?:lect|umns)?|n(?:cat(?:-str)?|tains|vert-time-zone)|unt(?:-null)?)|u(?:mulative|t))|d(?:atepart|ecimal|rop(?:-(?:duplicates|nulls))?|ummies)|e(?:ntropy|xp(?:lode|r-not))|f(?:i(?:l(?:l-n(?:an|ull)|ter(?:-with)?)|rst)|latten)|g(?:et(?:-(?:day|hour|m(?:inute|onth)|nanosecond|ordinal|second|week(?:day)?|year))?|roup-by)|horizontal|i(?:mplode|nt(?:eger|o-(?:d(?:f|type)|lazy|nu|repr|schema))|s-(?:duplicated|in|n(?:ot-n|)ull|unique))|join(?:-where)?|l(?:ast|en|i(?:st-contains|t)|owercase)|m(?:a(?:th|x)|e(?:an|dian)|in)|n(?:-unique|ot)|o(?:pen|therwise|ver)|p(?:ivot|rofile)|q(?:cut|u(?:antile|ery))|r(?:e(?:name|place(?:-time-zone)?|verse)|olling)|s(?:a(?:mple|ve)|chema|e(?:lect(?:or(?: (?:all|by-(?:dtype|name)|ends-with|f(?:irst|loat)|integer|last|matches|n(?:ot|umeric)|s(?:igned-integer|tarts-with)|unsigned-integer))?)?|t(?:-with-idx)?)|h(?:ape|ift)|lice|ort-by|t(?:d|ore-(?:get|ls|rm)|r(?:-(?:join|lengths|replace(?:-all)?|s(?:lice|plit|trip-chars))|ftime|uct-json-encode))|um(?:mary)?)|t(?:ake|runcate)|u(?:n(?:ique|nest|pivot)|ppercase)|va(?:lue-counts|r)|w(?:hen|ith-column)))?|rt)|r(?:epend|int)|s)|query(?: (?:db|git|json|web(?:page-info)?|xml))?|r(?:andom(?: (?:b(?:inary|ool)|chars|float|int|uuid))?|e(?:duce|g(?:ex|istry(?: query)?)|ject|name|turn|verse)|[gm]|o(?:ll(?: (?:down|left|right|up))?|tate)|un-(?:ex|in)ternal)|s(?:ave|c(?:hema|ope(?: (?:aliases|commands|e(?:ngine-stats|xterns)|modules|variables))?)|e(?:lect|q(?: (?:char|date))?)|huffle|kip(?: (?:until|while))?|l(?:eep|ice)|o(?:rt(?:-by)?|urce(?:-env)?)|plit(?: (?:c(?:ell-path|hars|olumn)|list|row|words))?|t(?:art|or(?: (?:create|delete|export|i(?:mport|nsert)|open|reset|update))?|r(?: (?:c(?:a(?:mel-case|pitalize)|o(?:mpress|ntains))|d(?:e(?:compress|dent|unicode)|istance|owncase)|e(?:nds-with|scape-regex|xpand)|inde(?:nt|x-of)|join|kebab-case|length|pascal-case|re(?:place|verse)|s(?:creaming-snake-case|hl-(?:quote|split)|imilarity|lug|nake-case|ta(?:rts-with|ts)|ubstring)|t(?:itle-case|rim)|upcase|wrap)|ess_internals)?)|ys(?: (?:cpu|disks|host|mem|net|temp|users))?)|t(?:a(?:ble|ke(?: (?:until|while))?)|e(?:e|rm(?: (?:query|size))?)|imeit|o(?: (?:csv|gui|html|json|m(?:d|sgpackz?)|nuon|p(?:arquet|list)|t(?:ext|o(?:ml|on)|sv)|xml|ya?ml)|uch)?|r(?:anspose|ee|y)|utor)|u(?:limit|mask|n(?:ame|iq(?:-by)?|let)|p(?:date(?: cells)?|sert)|rl(?: (?:build-query|decode|encode|join|parse|split-query))?|se)|v(?:alues|ersion(?: check)?|iew(?: (?:blocks|files|ir|s(?:ource|pan)))?)|w(?:atch|h(?:ere|i(?:ch|le)|oami)|i(?:ndow|th-env)|rap)|zip)(?![\\-\\p{L}\\p{M}\\p{N}\\p{Pc}])( ([^\\n]*))?", "dgv", { lazyCompile: true })
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "#paren-expression" }
                  ]
                }
              },
              match: /(?<=\^)(?:\$("[^"]+"|'[^']+')|"[^"]+"|'[^']+')/dgv,
              name: "entity.name.type.external.nushell"
            },
            {
              captures: {
                "1": { name: "entity.name.type.external.nushell" },
                "2": {
                  patterns: [
                    { include: "#value" }
                  ]
                }
              },
              match: /([\.\p{L}\p{M}\p{N}\p{Pc}]+(?:-[\!\.\p{L}\p{M}\p{N}\p{Pc}]+)*)(?: ([^\n]*))?/dgv
            },
            { include: "#value" }
          ]
        }
      },
      end: /(?=[\)\;\|\}])|(?=\n?$)/dgv,
      name: "meta.command.nushell",
      patterns: [
        { include: "#parameters" },
        { include: "#spread" },
        { include: "#value" }
      ]
    },
    comment: {
      match: /(#[^\n]*)(?=\n?$)/dgv,
      name: "comment.nushell"
    },
    "constant-keywords": {
      match: /\b(?:true|false|null)\b/dgv,
      name: "constant.language.nushell"
    },
    "constant-value": {
      patterns: [
        { include: "#constant-keywords" },
        { include: "#datetime" },
        { include: "#numbers" },
        { include: "#numbers-hexa" },
        { include: "#numbers-octal" },
        { include: "#numbers-binary" },
        { include: "#binary" }
      ]
    },
    "control-keywords": {
      match: /(?<![\--\:A-Z\\_a-z])(?:break|continue|else(?: if)?|for|if|loop|mut|return|try|while)(?![\--\:A-Z\\_a-z])/dgv,
      name: "keyword.control.nushell"
    },
    datetime: {
      match: /\b\p{Nd}{4}-\p{Nd}{2}-\p{Nd}{2}(?:T\p{Nd}{2}:\p{Nd}{2}:\p{Nd}{2}(?:\.\p{Nd}+)?(?:\+\p{Nd}{2}:?\p{Nd}{2}|Z)?)?\b/dgv,
      name: "constant.numeric.nushell"
    },
    "define-alias": {
      captures: {
        "1": { name: "storage.type.alias.nushell" },
        "2": { name: "entity.name.function.nushell" },
        "3": {
          patterns: [
            { include: "#operators" }
          ]
        }
      },
      match: /((?:export )?alias)\p{space}+([\-\!\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)/dgv
    },
    "define-variable": {
      captures: {
        "1": { name: "keyword.other.nushell" },
        "2": { name: "variable.other.nushell" },
        "3": { name: "punctuation.separator.nushell" },
        "4": {
          patterns: [
            { include: "#types" }
          ]
        },
        "5": {
          patterns: [
            { include: "#operators" }
          ]
        }
      },
      match: /(let|mut|(?:export\p{space}+)?const)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)(?:\p{space}*(:)\p{space}*([^\=]+?))?\p{space}+(=)/dgv
    },
    expression: {
      patterns: [
        { include: "#pre-command" },
        { include: "#for-loop" },
        { include: "#operators" },
        {
          match: /\|/dgv,
          name: "keyword.control.nushell"
        },
        { include: "#control-keywords" },
        { include: "#constant-value" },
        { include: "#string-raw" },
        { include: "#command" },
        { include: "#value" }
      ]
    },
    extern: {
      begin: /((?:export\p{space}+)?extern)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+")/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.nushell" },
        "2": { name: "entity.name.function.nushell" }
      },
      end: /(?<=\])/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.function.end.nushell" }
      },
      patterns: [
        { include: "#function-parameters" }
      ]
    },
    "for-loop": {
      begin: /(for)\p{space}+(\$?[\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+(in)\p{space}+([^\n]+)\p{space}*(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.nushell" },
        "2": { name: "variable.other.nushell" },
        "3": { name: "keyword.other.nushell" },
        "4": {
          patterns: [
            { include: "#value" }
          ]
        },
        "5": { name: "punctuation.section.block.begin.bracket.curly.nushell" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.block.end.bracket.curly.nushell" }
      },
      name: "meta.for-loop.nushell",
      patterns: [
        { include: "source.nushell" }
      ]
    },
    function: {
      begin: /((?:export\p{space}+)?def)(?:\p{space}+(--[\p{L}\p{M}\p{N}\p{Pc}]+(?:\p{space}+--[\p{L}\p{M}\p{N}\p{Pc}]+)*))?\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"|'[\- \p{L}\p{M}\p{N}\p{Pc}]+'|`[\- \p{L}\p{M}\p{N}\p{Pc}]+`)(?:\p{space}+(--[\p{L}\p{M}\p{N}\p{Pc}]+(?:\p{space}+--[\p{L}\p{M}\p{N}\p{Pc}]+)*))?/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.nushell" },
        "2": { name: "storage.modifier.nushell" },
        "3": { name: "entity.name.function.nushell" },
        "4": { name: "storage.modifier.nushell" }
      },
      end: /(?<=\})/dgv,
      patterns: [
        { include: "#function-parameters" },
        { include: "#function-body" },
        { include: "#function-inout" }
      ]
    },
    "function-body": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.function.begin.nushell" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.function.end.nushell" }
      },
      name: "meta.function.body.nushell",
      patterns: [
        { include: "source.nushell" }
      ]
    },
    "function-inout": {
      patterns: [
        { include: "#types" },
        {
          match: /->/dgv,
          name: "keyword.operator.nushell"
        },
        { include: "#function-multiple-inout" }
      ]
    },
    "function-multiple-inout": {
      begin: /(?<=\]\p{space}*)(:)\p{space}+(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.in-out.nushell" },
        "2": { name: "meta.brace.square.begin.nushell" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.end.nushell" }
      },
      patterns: [
        { include: "#types" },
        {
          captures: {
            "1": { name: "punctuation.separator.nushell" }
          },
          match: /\p{space}*(,)\p{space}*/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.nushell" }
          },
          match: /\p{space}+(->)\p{space}+/dgv
        }
      ]
    },
    "function-parameter": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.nushell" }
          },
          match: /(-{0,2}|\.{3})[\-\p{L}\p{M}\p{N}\p{Pc}]+(?:\((-[\?\p{L}\p{M}\p{N}\p{Pc}])\))?/dgv,
          name: "variable.parameter.nushell"
        },
        {
          begin: /\??:\p{space}*/dgv,
          end: /(?=\p{space}+(?:-{0,2}|\.{3})[\-\p{L}\p{M}\p{N}\p{Pc}]+|\p{space}*(?:[\]\#\,\=\@\|]|(?=\n?$)))/dgv,
          patterns: [
            { include: "#types" }
          ]
        },
        {
          begin: /@(?=["'])/dgv,
          end: /(?<=["'])/dgv,
          patterns: [
            { include: "#string" }
          ]
        },
        {
          begin: /=\p{space}*/dgv,
          end: /(?=\p{space}+-{0,2}[\-\p{L}\p{M}\p{N}\p{Pc}]+|\p{space}*(?:[\]\#\,\|]|(?=\n?$)))/dgv,
          name: "default.value.nushell",
          patterns: [
            { include: "#value" }
          ]
        }
      ]
    },
    "function-parameters": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.square.begin.nushell" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.end.nushell" }
      },
      name: "meta.function.parameters.nushell",
      patterns: [
        { include: "#function-parameter" },
        { include: "#comment" }
      ]
    },
    "internal-variables": {
      match: /\$(?:nu|env)\b/dgv,
      name: "variable.language.nushell"
    },
    keyword: {
      match: /def(?:-env)?/dgv,
      name: "keyword.other.nushell"
    },
    module: {
      begin: /((?:export\p{space}+)?module)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.module.nushell" },
        "2": { name: "entity.name.namespace.nushell" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.module.end.nushell" }
      },
      name: "meta.module.nushell",
      patterns: [
        { include: "source.nushell" }
      ]
    },
    numbers: {
      match: new EmulatedRegExp("(?<![\\-\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(_*))\\1)[\\-\\+]?(?:(?=(_*))\\2)(?:(?:NaN|infinity|inf)(?:(?=(_*))\\3)|(?:\\p{Nd}(?:(?=([_\\p{Nd}]*))\\4)\\.?|\\.(?:(?=(_*))\\5)\\p{Nd})(?:(?=([_\\p{Nd}]*))\\6)(?:E(?:(?=(_*))\\7)[\\-\\+]?(?:(?=(_*))\\8)\\p{Nd}(?:(?=([_\\p{Nd}]*))\\9))?)(?:ns|us|µs|ms|sec|min|hr|day|wk|b|kb|mb|gb|tb|pt|eb|zb|kib|mib|gib|tib|pit|eib|zib)?(?:(?![\\.\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=\\.\\.))", "dgiv", { hiddenCaptures: [1, 2, 3, 4, 5, 6, 7, 8, 9] }),
      name: "constant.numeric.nushell"
    },
    "numbers-binary": {
      match: new EmulatedRegExp("(?<![\\-\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(_*))\\1)0(?:(?=(_*))\\2)b(?:(?=(_*))\\3)[01](?:(?=([01_]*))\\4)(?![\\.\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgv", { hiddenCaptures: [1, 2, 3, 4] }),
      name: "constant.numeric.nushell"
    },
    "numbers-hexa": {
      match: new EmulatedRegExp("(?<![\\-\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(_*))\\1)0(?:(?=(_*))\\2)x(?:(?=(_*))\\3)\\p{AHex}(?:(?=([_\\p{AHex}]*))\\4)(?![\\.\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgv", { hiddenCaptures: [1, 2, 3, 4] }),
      name: "constant.numeric.nushell"
    },
    "numbers-octal": {
      match: new EmulatedRegExp("(?<![\\-\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(_*))\\1)0(?:(?=(_*))\\2)o(?:(?=(_*))\\3)[0-7](?:(?=([0-7_]*))\\4)(?![\\.\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgv", { hiddenCaptures: [1, 2, 3, 4] }),
      name: "constant.numeric.nushell"
    },
    operators: {
      patterns: [
        { include: "#operators-word" },
        { include: "#operators-symbols" },
        { include: "#ranges" }
      ]
    },
    "operators-symbols": {
      match: /(?<= )(?:[\-\*\+\/]=?|\/\/|\*\*|!=|[\<\=\>]=?|[\!\=]~|\+\+=?)(?= |(?=\n?$))/dgv,
      name: "keyword.control.nushell"
    },
    "operators-word": {
      match: /(?<=[ \(])(?:mod|in|not-(?:in|like|has)|not|and|or|xor|bit-(?:or|and|xor|shl|shr)|starts-with|ends-with|like|has)(?=[ \)]|(?=\n?$))/dgv,
      name: "keyword.control.nushell"
    },
    parameters: {
      captures: {
        "1": { name: "keyword.control.nushell" }
      },
      match: /(?<=\p{space})(-{1,2})[\-\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
      name: "variable.parameter.nushell"
    },
    "paren-expression": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.round.begin.nushell" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "meta.brace.round.end.nushell" }
      },
      name: "meta.expression.parenthesis.nushell",
      patterns: [
        { include: "#expression" }
      ]
    },
    "pre-command": {
      begin: /([\p{L}\p{M}\p{N}\p{Pc}]+)(=)/dgv,
      beginCaptures: {
        "1": { name: "variable.other.nushell" },
        "2": {
          patterns: [
            { include: "#operators" }
          ]
        }
      },
      end: /(?=\p{space}+)/dgv,
      patterns: [
        { include: "#value" }
      ]
    },
    ranges: {
      match: /\.\.<?/dgv,
      name: "keyword.control.nushell"
    },
    "record-value": {
      patterns: [
        { include: "#variables" },
        { include: "#variable-fields" },
        { include: "#constant-value" },
        { include: "#table" },
        { include: "#spread" },
        { include: "#ranges" },
        { include: "#paren-expression" },
        { include: "#braced-expression" },
        { include: "#string" },
        { include: "#comment" }
      ]
    },
    spread: {
      match: /\.\.\.(?=[^\]\}\p{space}])/dgv,
      name: "keyword.control.nushell"
    },
    string: {
      patterns: [
        { include: "#string-single-quote" },
        { include: "#string-backtick" },
        { include: "#string-double-quote" },
        { include: "#string-interpolated-double" },
        { include: "#string-interpolated-single" },
        { include: "#string-raw" },
        { include: "#string-bare" }
      ]
    },
    "string-backtick": {
      begin: /`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nushell" }
      },
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nushell" }
      },
      name: "string.quoted.single.nushell"
    },
    "string-bare": {
      match: /[^"\#\$'\(\,\;\[\{\|\p{space}][^\]"'\(\)\,\;\[\{\|\}\p{space}]*/dgv,
      name: "string.bare.nushell"
    },
    "string-double-quote": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nushell" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nushell" }
      },
      name: "string.quoted.double.nushell",
      patterns: [
        {
          match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv
        },
        { include: "#string-escape" }
      ]
    },
    "string-escape": {
      match: /\\(?:["'\/\\bfnrt]|u\p{AHex}{4})/dgv,
      name: "constant.character.escape.nushell"
    },
    "string-interpolated-double": {
      begin: /\$"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nushell" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nushell" }
      },
      name: "string.interpolated.double.nushell",
      patterns: [
        {
          match: /\\[\(\)]/dgv,
          name: "constant.character.escape.nushell"
        },
        { include: "#string-escape" },
        { include: "#paren-expression" }
      ]
    },
    "string-interpolated-single": {
      begin: /\$'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nushell" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nushell" }
      },
      name: "string.interpolated.single.nushell",
      patterns: [
        { include: "#paren-expression" }
      ]
    },
    "string-raw": {
      begin: /r(#+)'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nushell" }
      },
      end: /'1/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nushell" }
      },
      name: "string.raw.nushell"
    },
    "string-single-quote": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nushell" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nushell" }
      },
      name: "string.quoted.single.nushell"
    },
    table: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "meta.brace.square.begin.nushell" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "meta.brace.square.end.nushell" }
      },
      name: "meta.table.nushell",
      patterns: [
        { include: "#spread" },
        { include: "#value" },
        {
          match: /,/dgv,
          name: "punctuation.separator.nushell"
        }
      ]
    },
    types: {
      patterns: [
        {
          begin: /\b(list)\p{space}*</dgv,
          beginCaptures: {
            "1": { name: "entity.name.type.nushell" }
          },
          end: />/dgv,
          name: "meta.list.nushell",
          patterns: [
            { include: "#types" }
          ]
        },
        {
          begin: /\b(record)\p{space}*</dgv,
          beginCaptures: {
            "1": { name: "entity.name.type.nushell" }
          },
          end: />/dgv,
          name: "meta.record.nushell",
          patterns: [
            {
              captures: {
                "1": { name: "variable.parameter.nushell" }
              },
              match: /([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"|'[^']+')\p{space}*:\p{space}*/dgv
            },
            { include: "#types" }
          ]
        },
        {
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          name: "entity.name.type.nushell"
        }
      ]
    },
    "use-module": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.import.nushell" },
            "2": { name: "entity.name.namespace.nushell" },
            "3": { name: "keyword.other.nushell" }
          },
          match: /^\p{space}*((?:export )?use)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"|'[\- \p{L}\p{M}\p{N}\p{Pc}]+')(?:\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"|'[\- \p{L}\p{M}\p{N}\p{Pc}]+'|\*))?\p{space}*;?(?=\n?$)/dgv
        },
        {
          begin: /^\p{space}*((?:export )?use)\p{space}+([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"|'[\- \p{L}\p{M}\p{N}\p{Pc}]+')\p{space}*\[/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.import.nushell" },
            "2": { name: "entity.name.namespace.nushell" }
          },
          end: /(\])\p{space}*;?\p{space}*(?=\n?$)/dgv,
          endCaptures: {
            "1": { name: "meta.brace.square.end.nushell" }
          },
          patterns: [
            {
              captures: {
                "1": { name: "keyword.other.nushell" }
              },
              match: /([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"|'[\- \p{L}\p{M}\p{N}\p{Pc}]+'|\*),?/dgv
            },
            { include: "#comment" }
          ]
        },
        {
          captures: {
            "2": { name: "keyword.control.import.nushell" },
            "3": {
              name: "string.bare.nushell",
              patterns: [
                {
                  captures: {
                    "1": { name: "entity.name.namespace.nushell" }
                  },
                  match: /([\- \p{L}\p{M}\p{N}\p{Pc}]+)(?:\.nu)?(?=(?=\n?$)|["'])/dgv
                }
              ]
            },
            "4": { name: "keyword.other.nushell" }
          },
          match: new EmulatedRegExp("(?<path>(?:[\\/\\\\]|~[\\/\\\\]|\\.\\.?[\\/\\\\])?(?:[^\\/\\\\]+[\\/\\\\])*[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:\\.nu)?){0}^\\p{space}*((?:export )?use)\\p{space}+(\"((?:[\\/\\\\]|~[\\/\\\\]|\\.\\.?[\\/\\\\])?(?:[^\\/\\\\]+[\\/\\\\])*[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:\\.nu)?)\"|'((?:[\\/\\\\]|~[\\/\\\\]|\\.\\.?[\\/\\\\])?(?:[^\\/\\\\]+[\\/\\\\])*[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:\\.nu)?)'|(?![\"'])((?:[\\/\\\\]|~[\\/\\\\]|\\.\\.?[\\/\\\\])?(?:[^\\/\\\\]+[\\/\\\\])*[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:\\.nu)?))(?:\\p{space}+([\\-\\p{L}\\p{M}\\p{N}\\p{Pc}]+|\"[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+\"|'[^']+'|\\*))?\\p{space}*;?(?=\\n?$)", "dgv", { hiddenCaptures: [4, 5, 6], transfers: [[1, [4, 5, 6]]] })
        },
        {
          begin: new EmulatedRegExp("(?<path>(?:[\\/\\\\]|~[\\/\\\\]|\\.\\.?[\\/\\\\])?(?:[^\\/\\\\]+[\\/\\\\])*[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:\\.nu)?){0}^\\p{space}*((?:export )?use)\\p{space}+(\"((?:[\\/\\\\]|~[\\/\\\\]|\\.\\.?[\\/\\\\])?(?:[^\\/\\\\]+[\\/\\\\])*[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:\\.nu)?)\"|'((?:[\\/\\\\]|~[\\/\\\\]|\\.\\.?[\\/\\\\])?(?:[^\\/\\\\]+[\\/\\\\])*[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:\\.nu)?)'|(?![\"'])((?:[\\/\\\\]|~[\\/\\\\]|\\.\\.?[\\/\\\\])?(?:[^\\/\\\\]+[\\/\\\\])*[\\- \\p{L}\\p{M}\\p{N}\\p{Pc}]+(?:\\.nu)?))\\p{space}+\\[", "dgv", { hiddenCaptures: [4, 5, 6], transfers: [[1, [4, 5, 6]]] }),
          beginCaptures: {
            "2": { name: "keyword.control.import.nushell" },
            "3": {
              name: "string.bare.nushell",
              patterns: [
                {
                  captures: {
                    "1": { name: "entity.name.namespace.nushell" }
                  },
                  match: /([\- \p{L}\p{M}\p{N}\p{Pc}]+)(?:\.nu)?(?=(?=\n?$)|["'])/dgv
                }
              ]
            }
          },
          end: /(\])\p{space}*;?\p{space}*(?=\n?$)/dgv,
          endCaptures: {
            "1": { name: "meta.brace.square.end.nushell" }
          },
          patterns: [
            {
              captures: {
                "0": { name: "keyword.other.nushell" }
              },
              match: /([\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"|'[\- \p{L}\p{M}\p{N}\p{Pc}]+'|\*),?/dgv
            },
            { include: "#comment" }
          ]
        },
        {
          captures: {
            "0": { name: "keyword.control.import.nushell" }
          },
          match: /^\p{space}*(?:export )?use\b/dgv
        }
      ]
    },
    value: {
      patterns: [
        { include: "#variables" },
        { include: "#variable-fields" },
        { include: "#control-keywords" },
        { include: "#constant-value" },
        { include: "#table" },
        { include: "#operators" },
        { include: "#paren-expression" },
        { include: "#braced-expression" },
        { include: "#string" },
        { include: "#comment" }
      ]
    },
    "variable-fields": {
      match: /(?<=[\]\)\}])(?:\.(?:[\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"))+/dgv,
      name: "variable.other.nushell"
    },
    variables: {
      captures: {
        "1": {
          patterns: [
            { include: "#internal-variables" },
            {
              match: /\$[^\n]+/dgv,
              name: "variable.other.nushell"
            }
          ]
        },
        "2": { name: "variable.other.nushell" }
      },
      match: /(\$[0-9A-Z_a-z]+)((?:\.(?:[\-\p{L}\p{M}\p{N}\p{Pc}]+|"[\- \p{L}\p{M}\p{N}\p{Pc}]+"))*)/dgv
    }
  },
  dependencies: []
};
