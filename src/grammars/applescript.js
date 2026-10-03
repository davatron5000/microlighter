import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "applescript",
  displayName: "AppleScript",
  scopeName: "source.applescript",
  patterns: [
    { include: "#blocks" },
    { include: "#inline" }
  ],
  repository: {
    "attributes.considering-ignoring": {
      patterns: [
        {
          match: /,/dgv,
          name: "punctuation.separator.array.attributes.applescript"
        },
        {
          match: /\b(and)\b/dgv,
          name: "keyword.control.attributes.and.applescript"
        },
        {
          match: /\b(?:case|diacriticals|hyphens|numeric\p{space}+strings|punctuation|white\p{space}+space)\b/dgiv,
          name: "constant.other.attributes.text.applescript"
        },
        {
          match: /\bapplication\p{space}+responses\b/dgiv,
          name: "constant.other.attributes.application.applescript"
        }
      ]
    },
    blocks: {
      patterns: [
        {
          begin: /^\p{space}*(script)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.script.applescript" },
            "2": { name: "entity.name.type.script-object.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+script)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.script.applescript" }
          },
          name: "meta.block.script.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(to|on)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)(\()((?:[\,\:\{\}\p{space}]*(?:[\p{L}\p{M}\p{N}\p{Pc}]+)?)*)(\))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.function.applescript" },
            "2": { name: "entity.name.function.handler.applescript" },
            "3": { name: "punctuation.definition.parameters.begin.applescript" },
            "4": { name: "variable.parameter.handler.applescript" },
            "5": { name: "punctuation.definition.parameters.end.applescript" }
          },
          end: /^\p{space}*(end)(?:\p{space}+(2))?(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.function.applescript" }
          },
          name: "meta.function.positional.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(to|on)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)(?:\p{space}+(of|in)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?(?=\p{space}+(above|against|apart\p{space}+from|around|aside\p{space}+from|at|below|beneath|beside|between|by|for|from|instead\p{space}+of|into|on|onto|out\p{space}+of|over|thru|under)\b)/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.function.applescript" },
            "2": { name: "entity.name.function.handler.applescript" },
            "3": { name: "keyword.control.function.applescript" },
            "4": { name: "variable.parameter.handler.direct.applescript" }
          },
          end: /^\p{space}*(end)(?:\p{space}+(2))?(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.function.applescript" }
          },
          name: "meta.function.prepositional.applescript",
          patterns: [
            {
              captures: {
                "1": { name: "keyword.control.preposition.applescript" },
                "2": { name: "variable.parameter.handler.applescript" }
              },
              match: /\b(?:above|against|apart\p{space}+from|around|aside\p{space}+from|at|below|beneath|beside|between|by|for|from|instead\p{space}+of|into|on|onto|out\p{space}+of|over|thru|under)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgiv
            },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(to|on)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.function.applescript" },
            "2": { name: "entity.name.function.handler.applescript" }
          },
          end: /^\p{space}*(end)(?:\p{space}+(2))?(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.function.applescript" }
          },
          name: "meta.function.parameterless.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        { include: "#blocks.tell" },
        { include: "#blocks.repeat" },
        { include: "#blocks.statement" },
        { include: "#blocks.other" }
      ]
    },
    "blocks.other": {
      patterns: [
        {
          begin: /^\p{space}*(considering)\b/dgv,
          end: /^\p{space}*(end(?:\p{space}+considering)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.considering.applescript",
          patterns: [
            {
              begin: /(?<=considering)/dgv,
              end: /(?<!¬)(?=\n?$)/dgv,
              name: "meta.array.attributes.considering.applescript",
              patterns: [
                { include: "#attributes.considering-ignoring" }
              ]
            },
            {
              begin: /(?<=ignoring)/dgv,
              end: /(?<!¬)(?=\n?$)/dgv,
              name: "meta.array.attributes.ignoring.applescript",
              patterns: [
                { include: "#attributes.considering-ignoring" }
              ]
            },
            {
              match: /\b(but)\b/dgv,
              name: "keyword.control.but.applescript"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(ignoring)\b/dgv,
          end: /^\p{space}*(end(?:\p{space}+ignoring)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.ignoring.applescript",
          patterns: [
            {
              begin: /(?<=considering)/dgv,
              end: /(?<!¬)(?=\n?$)/dgv,
              name: "meta.array.attributes.considering.applescript",
              patterns: [
                { include: "#attributes.considering-ignoring" }
              ]
            },
            {
              begin: /(?<=ignoring)/dgv,
              end: /(?<!¬)(?=\n?$)/dgv,
              name: "meta.array.attributes.ignoring.applescript",
              patterns: [
                { include: "#attributes.considering-ignoring" }
              ]
            },
            {
              match: /\b(but)\b/dgv,
              name: "keyword.control.but.applescript"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(if)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.if.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+if)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.if.applescript",
          patterns: [
            {
              match: /\b(then)\b/dgv,
              name: "keyword.control.then.applescript"
            },
            {
              match: /\b(else\p{space}+if)\b/dgv,
              name: "keyword.control.else-if.applescript"
            },
            {
              match: /\b(else)\b/dgv,
              name: "keyword.control.else.applescript"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(try)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.try.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+(try|error))?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.try.applescript",
          patterns: [
            {
              begin: /^\p{space}*(on\p{space}+error)\b/dgv,
              beginCaptures: {
                "1": { name: "keyword.control.exception.on-error.applescript" }
              },
              end: /(?<!¬)(?=\n?$)/dgv,
              name: "meta.property.error.applescript",
              patterns: [
                {
                  match: /\b(?:number|partial|from|to)\b/dgiv,
                  name: "keyword.control.exception.modifier.applescript"
                },
                { include: "#inline" }
              ]
            },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(using\p{space}+terms\p{space}+from)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.terms.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+using\p{space}+terms\p{space}+from)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.terms.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(with\p{space}+timeout(\p{space}+of)?)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.timeout.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+timeout)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.timeout.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(with\p{space}+transaction(\p{space}+of)?)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.transaction.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+transaction)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.transaction.applescript",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "blocks.repeat": {
      patterns: [
        {
          begin: /^\p{space}*(repeat)\p{space}+(until)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.repeat.applescript" },
            "2": { name: "keyword.control.until.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+repeat)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.repeat.until.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(repeat)\p{space}+(while)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.repeat.applescript" },
            "2": { name: "keyword.control.while.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+repeat)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.repeat.while.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(repeat)\p{space}+(with)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.repeat.applescript" },
            "2": { name: "keyword.control.until.applescript" },
            "3": { name: "variable.parameter.loop.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+repeat)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.repeat.with.applescript",
          patterns: [
            {
              match: /\b(from|to|by)\b/dgv,
              name: "keyword.control.modifier.range.applescript"
            },
            {
              match: /\b(in)\b/dgv,
              name: "keyword.control.modifier.list.applescript"
            },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(repeat)\b(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.repeat.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+repeat)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.repeat.forever.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(repeat)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.repeat.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+repeat)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          endCaptures: {
            "1": { name: "keyword.control.end.applescript" }
          },
          name: "meta.block.repeat.times.applescript",
          patterns: [
            {
              match: /\b(times)\b/dgv,
              name: "keyword.control.times.applescript"
            },
            { include: "$self" }
          ]
        }
      ]
    },
    "blocks.statement": {
      patterns: [
        {
          begin: /\b(prop(?:erty)?)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.def.property.applescript" },
            "2": { name: "variable.other.property.applescript" }
          },
          end: /(?<!¬)(?=\n?$)/dgv,
          name: "meta.statement.property.applescript",
          patterns: [
            {
              match: /:/dgv,
              name: "punctuation.separator.key-value.property.applescript"
            },
            { include: "#inline" }
          ]
        },
        {
          begin: /\b(set)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+(to)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.def.set.applescript" },
            "2": { name: "variable.other.readwrite.set.applescript" },
            "3": { name: "keyword.control.def.set.applescript" }
          },
          end: /(?<!¬)(?=\n?$)/dgv,
          name: "meta.statement.set.applescript",
          patterns: [
            { include: "#inline" }
          ]
        },
        {
          begin: /\b(local)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.def.local.applescript" }
          },
          end: /(?<!¬)(?=\n?$)/dgv,
          name: "meta.statement.local.applescript",
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.separator.variables.local.applescript"
            },
            {
              match: /\b[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "variable.other.readwrite.local.applescript"
            },
            { include: "#inline" }
          ]
        },
        {
          begin: /\b(global)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.def.global.applescript" }
          },
          end: /(?<!¬)(?=\n?$)/dgv,
          name: "meta.statement.global.applescript",
          patterns: [
            {
              match: /,/dgv,
              name: "punctuation.separator.variables.global.applescript"
            },
            {
              match: /\b[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "variable.other.readwrite.global.applescript"
            },
            { include: "#inline" }
          ]
        },
        {
          begin: /\b(error)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.exception.error.applescript" }
          },
          end: /(?<!¬)(?=\n?$)/dgv,
          name: "meta.statement.error.applescript",
          patterns: [
            {
              match: /\b(number|partial|from|to)\b/dgv,
              name: "keyword.control.exception.modifier.applescript"
            },
            { include: "#inline" }
          ]
        },
        {
          begin: /\b(if)\b(?=[^\n]*\bthen\b(?!\p{space}*(--[^\n]*?)?(?=\n?$)))/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.if.applescript" }
          },
          end: /(?<!¬)(?=\n?$)/dgv,
          name: "meta.statement.if-then.applescript",
          patterns: [
            { include: "#inline" }
          ]
        }
      ]
    },
    "blocks.tell": {
      patterns: [
        {
          begin: /^\p{space}*(tell)\p{space}+(?=app(lication)?\p{space}+"[Tt][Ee][Xx][Tt][Mm][Aa][Tt][Ee]")(?![^\n]*\bto(?!\p{space}+tell)\b)/dgv,
          captures: {
            "1": { name: "keyword.control.tell.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+tell)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.tell.application.textmate.applescript",
          patterns: [
            { include: "#textmate" },
            { include: "#standard-suite" },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(tell)\p{space}+(?=app(lication)?\p{space}+"[Ff][Ii][Nn][Dd][Ee][Rr]")(?![^\n]*\bto(?!\p{space}+tell)\b)/dgv,
          captures: {
            "1": { name: "keyword.control.tell.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+tell)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.tell.application.finder.applescript",
          patterns: [
            { include: "#finder" },
            { include: "#standard-suite" },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(tell)\p{space}+(?=app(lication)?\p{space}+"[Ssſ][Yy][Ssſ][Tt][Ee][Mm] [Ee][Vv][Ee][Nn][Tt][Ssſ]")(?![^\n]*\bto(?!\p{space}+tell)\b)/dgv,
          captures: {
            "1": { name: "keyword.control.tell.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+tell)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.tell.application.system-events.applescript",
          patterns: [
            { include: "#system-events" },
            { include: "#standard-suite" },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(tell)\p{space}+(?=app(lication)?\p{space}+"[Ii][Tt][Uu][Nn][Ee][Ssſ]")(?![^\n]*\bto(?!\p{space}+tell)\b)/dgv,
          captures: {
            "1": { name: "keyword.control.tell.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+tell)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.tell.application.itunes.applescript",
          patterns: [
            { include: "#itunes" },
            { include: "#standard-suite" },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(tell)\p{space}+(?=app(lication)?\p{space}+process\b)(?![^\n]*\bto(?!\p{space}+tell)\b)/dgv,
          captures: {
            "1": { name: "keyword.control.tell.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+tell)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.tell.application-process.generic.applescript",
          patterns: [
            { include: "#standard-suite" },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(tell)\p{space}+(?=app(lication)?\b)(?![^\n]*\bto(?!\p{space}+tell)\b)/dgv,
          captures: {
            "1": { name: "keyword.control.tell.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+tell)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.tell.application.generic.applescript",
          patterns: [
            { include: "#standard-suite" },
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(tell)\p{space}+(?![^\n]*\bto(?!\p{space}+tell)\b)/dgv,
          captures: {
            "1": { name: "keyword.control.tell.applescript" }
          },
          end: /^\p{space}*(end(?:\p{space}+tell)?)(?=\p{space}*(--[^\n]*?)?(?=\n?$))/dgv,
          name: "meta.block.tell.generic.applescript",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /^\p{space}*(tell)\p{space}+(?=[^\n]*\bto\b)/dgv,
          captures: {
            "1": { name: "keyword.control.tell.applescript" }
          },
          end: /(?<!¬)(?=\n?$)/dgv,
          name: "meta.block.tell.generic.applescript",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "built-in": {
      patterns: [
        { include: "#built-in.constant" },
        { include: "#built-in.keyword" },
        { include: "#built-in.support" },
        { include: "#built-in.punctuation" }
      ]
    },
    "built-in.constant": {
      patterns: [
        {
          match: /\b(?:true|false|yes|no)\b/dgiv,
          name: "constant.language.boolean.applescript"
        },
        {
          match: /\b(?:null|missing\p{space}+value)\b/dgiv,
          name: "constant.language.null.applescript"
        },
        {
          match: /-?\b\p{Nd}+((\.(\p{Nd}+\b)?)?(?:e\+?\p{Nd}*\b)?|\b)/dgiv,
          name: "constant.numeric.applescript"
        },
        {
          match: /\b(?:space|tab|return|linefeed|quote)\b/dgiv,
          name: "constant.other.text.applescript"
        },
        {
          match: /\b(?:all\p{space}+(caps|lowercase)|bold|condensed|expanded|hidden|italic|outline|plain|shadow|small\p{space}+caps|strikethrough|(su(?:b|per))script|underline)\b/dgiv,
          name: "constant.other.styles.applescript"
        },
        {
          match: /\b(?:Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\b/dgiv,
          name: "constant.other.time.month.applescript"
        },
        {
          match: /\b(?:Mon(day)?|Tue(sday)?|Wed(nesday)?|Thu(rsday)?|Fri(day)?|Sat(urday)?|Sun(day)?)\b/dgiv,
          name: "constant.other.time.weekday.applescript"
        },
        {
          match: /\b(?:AppleScript|pi|result|version|current\p{space}+application|its?|m[ey])\b/dgiv,
          name: "constant.other.miscellaneous.applescript"
        },
        {
          match: /\b(?:text\p{space}+item\p{space}+delimiters|print\p{space}+(length|depth))\b/dgiv,
          name: "variable.language.applescript"
        }
      ]
    },
    "built-in.keyword": {
      patterns: [
        {
          match: /([\-\&\*\+\/\^÷])/dgv,
          name: "keyword.operator.arithmetic.applescript"
        },
        {
          match: /([\<\=\>≠≥]|>=|≤|<=)/dgv,
          name: "keyword.operator.comparison.applescript"
        },
        {
          match: /\b(and|or|div|mod|as|not|(a\p{space}+)?(ref(?:(\p{space}+to)?|erence\p{space}+to))|equal(s|\p{space}+to)|contains?|comes\p{space}+(after|before)|(start|begin|end)s?\p{space}+with)\b/dgiv,
          name: "keyword.operator.word.applescript"
        },
        {
          match: /\b(is(n't|\p{space}+not)?(\p{space}+(equal(\p{space}+to)?|(less|greater)\p{space}+than(\p{space}+or\p{space}+equal(\p{space}+to)?)?|in|contained\p{space}+by))?|does(n't|\p{space}+not)\p{space}+(equal|come\p{space}+(before|after)|contain))\b/dgiv,
          name: "keyword.operator.word.applescript"
        },
        {
          match: /\b(?:some|every|whose|where|that|id|index|\p{Nd}+(st|nd|rd|th)|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|last|front|back|middle|named|beginning|end|from|to|thr(u|ough)|before|(front|back|beginning|end)\p{space}+of|after|behind|in\p{space}+(front|back|beginning|end)\p{space}+of)\b/dgiv,
          name: "keyword.operator.reference.applescript"
        },
        {
          match: /\b(?:continue|return|exit(\p{space}+repeat)?)\b/dgiv,
          name: "keyword.control.loop.applescript"
        },
        {
          match: /\b(?:about|above|after|against|and|apart\p{space}+from|around|as|aside\p{space}+from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|contains??|contains|copy|div|does|eighth|else|end|equals??|error|every|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead\p{space}+of|into|is|its??|last|local|me|middle|mod|my|ninth|not|of|on|onto|or|out\p{space}+of|over|prop|property|put|ref|reference|repeat|returning|script|second|set|seventh|since|sixth|some|tell|tenth|that|then??|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/dgiv,
          name: "keyword.other.applescript"
        }
      ]
    },
    "built-in.punctuation": {
      patterns: [
        {
          match: /¬/dgv,
          name: "punctuation.separator.continuation.line.applescript"
        },
        {
          match: /:/dgv,
          name: "punctuation.separator.key-value.property.applescript"
        },
        {
          match: /[\(\)]/dgv,
          name: "punctuation.section.group.applescript"
        }
      ]
    },
    "built-in.support": {
      patterns: [
        {
          match: /\b(?:POSIX\p{space}+path|frontmost|id|name|running|version|days?|weekdays?|months?|years?|time|date\p{space}+string|time\p{space}+string|length|rest|reverse|items?|contents|quoted\p{space}+form|characters?|paragraphs?|words?)\b/dgiv,
          name: "support.function.built-in.property.applescript"
        },
        {
          match: /\b(?:activate|log|clipboard\p{space}+info|set\p{space}+the\p{space}+clipboard\p{space}+to|the\p{space}+clipboard|info\p{space}+for|list\p{space}+(disks|folder)|mount\p{space}+volume|path\p{space}+to(\p{space}+resource)?|close\p{space}+access|get\p{space}+eof|open\p{space}+for\p{space}+access|read|set\p{space}+eof|write|open\p{space}+location|current\p{space}+date|do\p{space}+shell\p{space}+script|get\p{space}+volume\p{space}+settings|random\p{space}+number|round|set\p{space}+volume|system\p{space}+(attribute|info)|time\p{space}+to\p{space}+GMT|load\p{space}+script|run\p{space}+script|scripting\p{space}+components|store\p{space}+script|copy|count|get|launch|run|set|ASCII\p{space}+(character|number)|localized\p{space}+string|offset|summarize|beep|choose\p{space}+(application|color|file(\p{space}+name)?|folder|from\p{space}+list|remote\p{space}+application|URL)|delay|display\p{space}+(alert|dialog)|say)\b/dgiv,
          name: "support.function.built-in.command.applescript"
        },
        {
          match: /\b(?:get|run)\b/dgiv,
          name: "support.function.built-in.applescript"
        },
        {
          match: /\b(?:anything|data|text|upper\p{space}+case|propert(y|ies))\b/dgiv,
          name: "support.class.built-in.applescript"
        },
        {
          match: /\b(?:[Aa][Ll][Ii][Aa][Ssſ]|[Cc][Ll][Aa][Ssſ][Ssſ])(es)?\b/dgv,
          name: "support.class.built-in.applescript"
        },
        {
          match: /\b(?:[Aa][Pp][Pp]([Ll][Ii][Cc][Aa][Tt][Ii][Oo][Nn])?|[Bb][Oo][Oo][Ll][Ee][Aa][Nn]|[Cc][Hh][Aa][Rr][Aa][Cc][Tt][Ee][Rr]|[Cc][Oo][Nn][Ssſ][Tt][Aa][Nn][Tt]|[Dd][Aa][Tt][Ee]|[Ee][Vv][Ee][Nn][Tt]|[Ff][Ii][Ll][Ee](\p{space}+[Ssſ][Pp][Ee][Cc][Ii][Ff][Ii][Cc][Aa][Tt][Ii][Oo][Nn])?|[Hh][Aa][Nn][Dd][Ll][Ee][Rr]|[Ii][Nn][Tt][Ee][Gg][Ee][Rr]|[Ii][Tt][Ee][Mm]|[KKk][Ee][Yy][Ssſ][Tt][Rr][Oo][KKk][Ee]|[Ll][Ii][Nn][KKk][Ee][Dd]\p{space}+[Ll][Ii][Ssſ][Tt]|[Ll][Ii][Ssſ][Tt]|[Mm][Aa][Cc][Hh][Ii][Nn][Ee]|[Nn][Uu][Mm][Bb][Ee][Rr]|[Pp][Ii][Cc][Tt][Uu][Rr][Ee]|[Pp][Rr][Ee][Pp][Oo][Ssſ][Ii][Tt][Ii][Oo][Nn]|[Pp][Oo][Ssſ][Ii][Xx]\p{space}+[Ff][Ii][Ll][Ee]|[Rr][Ee][Aa][Ll]|[Rr][Ee][Cc][Oo][Rr][Dd]|[Rr][Ee][Ff][Ee][Rr][Ee][Nn][Cc][Ee](\p{space}+[Ff][Oo][Rr][Mm])?|[Rr][Gg][Bb]\p{space}+[Cc][Oo][Ll][Oo][Rr]|[Ssſ][Cc][Rr][Ii][Pp][Tt]|[Ssſ][Oo][Uu][Nn][Dd]|[Tt][Ee][Xx][Tt]\p{space}+[Ii][Tt][Ee][Mm]|[Tt][Yy][Pp][Ee]\p{space}+[Cc][Ll][Aa][Ssſ][Ssſ]|[Vv][Ee][Cc][Tt][Oo][Rr]|[Ww][Rr][Ii][Tt][Ii][Nn][Gg]\p{space}+[Cc][Oo][Dd][Ee](\p{space}+[Ii][Nn][Ff][Oo])?|[Zz][Oo][Nn][Ee]|(([Ii][Nn][Tt][Ee][Rr][Nn][Aa][Tt][Ii][Oo][Nn][Aa][Ll]|[Ssſ][Tt][Yy][Ll][Ee][Dd](\p{space}+([Cc][Ll][Ii][Pp][Bb][Oo][Aa][Rr][Dd]|[Uu][Nn][Ii][Cc][Oo][Dd][Ee]))?|[Uu][Nn][Ii][Cc][Oo][Dd][Ee])\p{space}+)?[Tt][Ee][Xx][Tt]|(([Cc]|[Ee][Nn][Cc][Oo][Dd][Ee][Dd]|[Pp][Aa][Ssſ][Cc][Aa][Ll])\p{space}+)?[Ssſ][Tt][Rr][Ii][Nn][Gg])s?\b/dgv,
          name: "support.class.built-in.applescript"
        },
        {
          match: /\b((cubic\p{space}+(centi)?|square\p{space}+(kilo)?|centi|kilo)met(er|re)s|square\p{space}+(yards|feet|miles)|cubic\p{space}+(yards|feet|inches)|miles|inches|lit(re|er)s|gallons|quarts|(kilo)?grams|ounces|pounds|degrees\p{space}+(Celsius|Fahrenheit|Kelvin))\b/dgiv,
          name: "support.class.built-in.unit.applescript"
        },
        {
          match: /\b(?:seconds|minutes|hours|days)\b/dgiv,
          name: "support.class.built-in.time.applescript"
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /^\p{space}*(#!)/dgv,
          captures: {
            "1": { name: "punctuation.definition.comment.applescript" }
          },
          end: /\n/dgv,
          name: "comment.line.number-sign.applescript"
        },
        {
          begin: /(^[\t ]+)?(?=#)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.applescript" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /#/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.applescript" }
              },
              end: /\n/dgv,
              name: "comment.line.number-sign.applescript"
            }
          ]
        },
        {
          begin: /(^[\t ]+)?(?=--)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.applescript" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /--/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.applescript" }
              },
              end: /\n/dgv,
              name: "comment.line.double-dash.applescript"
            }
          ]
        },
        {
          begin: /\(\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.applescript" }
          },
          end: /\*\)/dgv,
          name: "comment.block.applescript",
          patterns: [
            { include: "#comments.nested" }
          ]
        }
      ]
    },
    "comments.nested": {
      patterns: [
        {
          begin: /\(\*/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.applescript" }
          },
          end: /\*\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.applescript" }
          },
          name: "comment.block.applescript",
          patterns: [
            { include: "#comments.nested" }
          ]
        }
      ]
    },
    "data-structures": {
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.array.begin.applescript" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.array.end.applescript" }
          },
          name: "meta.array.applescript",
          patterns: [
            {
              captures: {
                "1": { name: "constant.other.key.applescript" },
                "2": { name: "meta.identifier.applescript" },
                "3": { name: "punctuation.definition.identifier.applescript" },
                "4": { name: "punctuation.definition.identifier.applescript" },
                "5": { name: "punctuation.separator.key-value.applescript" }
              },
              match: /([\p{L}\p{M}\p{N}\p{Pc}]+|((\|)[^\n\|]*(\|)))\p{space}*(:)/dgv
            },
            {
              match: /:/dgv,
              name: "punctuation.separator.key-value.applescript"
            },
            {
              match: /,/dgv,
              name: "punctuation.separator.array.applescript"
            },
            { include: "#inline" }
          ]
        },
        {
          begin: /(?:(?<=application )|(?<=app ))(")/dgv,
          captures: {
            "1": { name: "punctuation.definition.string.applescript" }
          },
          end: /(")/dgv,
          name: "string.quoted.double.application-name.applescript",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.applescript"
            }
          ]
        },
        {
          begin: /(")/dgv,
          captures: {
            "1": { name: "punctuation.definition.string.applescript" }
          },
          end: /(")/dgv,
          name: "string.quoted.double.applescript",
          patterns: [
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.applescript"
            }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.identifier.applescript" },
            "2": { name: "punctuation.definition.identifier.applescript" }
          },
          match: /(\|)[^\n\|]*(\|)/dgv,
          name: "meta.identifier.applescript"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.data.applescript" },
            "2": { name: "support.class.built-in.applescript" },
            "3": { name: "storage.type.utxt.applescript" },
            "4": { name: "string.unquoted.data.applescript" },
            "5": { name: "punctuation.definition.data.applescript" },
            "6": { name: "keyword.operator.applescript" },
            "7": { name: "support.class.built-in.applescript" }
          },
          match: /(«)(data) (ut(?:xt|f8))(\p{AHex}*)(»)(?:\p{space}+(as)\p{space}+[Uu][Nn][Ii][Cc][Oo][Dd][Ee]\p{space}+[Tt][Ee][Xx][Tt])?/dgv,
          name: "constant.other.data.utxt.applescript"
        },
        {
          begin: /(«)([\p{L}\p{M}\p{N}\p{Pc}]+)\b(?=\p{space})/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.data.applescript" },
            "2": { name: "support.class.built-in.applescript" }
          },
          end: /(»)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.data.applescript" }
          },
          name: "constant.other.data.raw.applescript"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.data.applescript" },
            "2": { name: "punctuation.definition.data.applescript" }
          },
          match: /(«)[^»]*(»)/dgv,
          name: "invalid.illegal.data.applescript"
        }
      ]
    },
    finder: {
      patterns: [
        {
          match: /\b(item|container|(computer|disk|trash)-object|disk|folder|((alias|application|document|internet location) )?file|clipping|package)s?\b/dgv,
          name: "support.class.finder.items.applescript"
        },
        {
          match: /\b((Finder|desktop|information|preferences|clipping) )windows?\b/dgv,
          name: "support.class.finder.window-classes.applescript"
        },
        {
          match: /\b(preferences|(icon|column|list) view options|(label|column|alias list)s?)\b/dgv,
          name: "support.class.finder.type-definitions.applescript"
        },
        {
          match: /\b(copy|find|sort|clean up|eject|empty( trash)|erase|reveal|update)\b/dgv,
          name: "support.function.finder.items.applescript"
        },
        {
          match: /\b(insertion location|product version|startup disk|desktop|trash|home|computer container|finder preferences)\b/dgv,
          name: "support.constant.finder.applescript"
        },
        {
          match: /\b(visible)\b/dgv,
          name: "support.variable.finder.applescript"
        }
      ]
    },
    inline: {
      patterns: [
        { include: "#comments" },
        { include: "#data-structures" },
        { include: "#built-in" },
        { include: "#standardadditions" }
      ]
    },
    itunes: {
      patterns: [
        {
          match: /\b(artwork|application|encoder|EQ preset|item|source|visual|(EQ |browser )?window|((audio CD|device|shared|URL|file) )?track|playlist window|((audio CD|device|radio tuner|library|folder|user) )?playlist)s?\b/dgv,
          name: "support.class.itunes.applescript"
        },
        {
          match: /\b(add|back track|convert|fast forward|(next|previous) track|pause|play(pause)?|refresh|resume|rewind|search|stop|update|eject|subscribe|update(Podcast|AllPodcasts)|download)\b/dgv,
          name: "support.function.itunes.applescript"
        },
        {
          match: /\b(current (playlist|stream (title|URL)|track)|player state)\b/dgv,
          name: "support.constant.itunes.applescript"
        },
        {
          match: /\b(current (encoder|EQ preset|visual)|EQ enabled|fixed indexing|full screen|mute|player position|sound volume|visuals enabled|visual size)\b/dgv,
          name: "support.variable.itunes.applescript"
        }
      ]
    },
    "standard-suite": {
      patterns: [
        {
          match: /\b(colors?|documents?|items?|windows?)\b/dgv,
          name: "support.class.standard-suite.applescript"
        },
        {
          match: /\b(close|count|delete|duplicate|exists|make|move|open|print|quit|save|activate|select|data size)\b/dgv,
          name: "support.function.standard-suite.applescript"
        },
        {
          match: /\b(name|frontmost|version)\b/dgv,
          name: "support.constant.standard-suite.applescript"
        },
        {
          match: /\b(selection)\b/dgv,
          name: "support.variable.standard-suite.applescript"
        },
        {
          match: /\b(attachments?|attribute runs?|characters?|paragraphs?|texts?|words?)\b/dgv,
          name: "support.class.text-suite.applescript"
        }
      ]
    },
    standardadditions: {
      patterns: [
        {
          match: /\b((alert|dialog) reply)\b/dgv,
          name: "support.class.standardadditions.user-interaction.applescript"
        },
        {
          match: /\b(file information)\b/dgv,
          name: "support.class.standardadditions.file.applescript"
        },
        {
          match: /\b(POSIX files?|system information|volume settings)\b/dgv,
          name: "support.class.standardadditions.miscellaneous.applescript"
        },
        {
          match: /\b(URLs?|internet address(es)?|web pages?|FTP items?)\b/dgv,
          name: "support.class.standardadditions.internet.applescript"
        },
        {
          match: /\b(info for|list (disks|folder)|mount volume|path to( resource)?)\b/dgv,
          name: "support.function.standardadditions.file.applescript"
        },
        {
          match: /\b(beep|choose (application|color|file( name)?|folder|from list|remote application|URL)|delay|display (alert|dialog)|say)\b/dgv,
          name: "support.function.standardadditions.user-interaction.applescript"
        },
        {
          match: /\b(ASCII (character|number)|localized string|offset|summarize)\b/dgv,
          name: "support.function.standardadditions.string.applescript"
        },
        {
          match: /\b(set the clipboard to|the clipboard|clipboard info)\b/dgv,
          name: "support.function.standardadditions.clipboard.applescript"
        },
        {
          match: /\b(open for access|close access|read|write|get eof|set eof)\b/dgv,
          name: "support.function.standardadditions.file-i-o.applescript"
        },
        {
          match: /\b((load|store|run) script|scripting components)\b/dgv,
          name: "support.function.standardadditions.scripting.applescript"
        },
        {
          match: /\b(current date|do shell script|get volume settings|random number|round|set volume|system attribute|system info|time to GMT)\b/dgv,
          name: "support.function.standardadditions.miscellaneous.applescript"
        },
        {
          match: /\b(opening folder|((?:clos|mov)ing) folder window for|adding folder items to|removing folder items from)\b/dgv,
          name: "support.function.standardadditions.folder-actions.applescript"
        },
        {
          match: /\b(open location|handle CGI request)\b/dgv,
          name: "support.function.standardadditions.internet.applescript"
        }
      ]
    },
    "system-events": {
      patterns: [
        {
          match: /\b(audio (data|file))\b/dgv,
          name: "support.class.system-events.audio-file.applescript"
        },
        {
          match: /\b(alias(es)?|(Classic|local|network|system|user) domain objects?|disk( item)?s?|domains?|file( package)?s?|folders?|items?)\b/dgv,
          name: "support.class.system-events.disk-folder-file.applescript"
        },
        {
          match: /\b(delete|open|move)\b/dgv,
          name: "support.function.system-events.disk-folder-file.applescript"
        },
        {
          match: /\b(folder actions?|scripts?)\b/dgv,
          name: "support.class.system-events.folder-actions.applescript"
        },
        {
          match: /\b(attach action to|attached scripts|edit action of|remove action from)\b/dgv,
          name: "support.function.system-events.folder-actions.applescript"
        },
        {
          match: /\b(movie (?:data|file))\b/dgv,
          name: "support.class.system-events.movie-file.applescript"
        },
        {
          match: /\b(log out|restart|shut down|sleep)\b/dgv,
          name: "support.function.system-events.power.applescript"
        },
        {
          match: /\b(((application |desk accessory )?process|(c(?:heck|ombo ))?box)(es)?|(action|attribute|browser|(busy|progress|relevance) indicator|color well|column|drawer|group|grow area|image|incrementor|list|menu( bar)?( item)?|(menu |pop up |radio )?button|outline|(radio|tab|splitter) group|row|scroll (area|bar)|sheet|slider|splitter|static text|table|text (area|field)|tool bar|UI element|window)s?)\b/dgv,
          name: "support.class.system-events.processes.applescript"
        },
        {
          match: /\b(click|key code|keystroke|perform|select)\b/dgv,
          name: "support.function.system-events.processes.applescript"
        },
        {
          match: /\b(property list (file|item))\b/dgv,
          name: "support.class.system-events.property-list.applescript"
        },
        {
          match: /\b(annotation|QuickTime (data|file)|track)s?\b/dgv,
          name: "support.class.system-events.quicktime-file.applescript"
        },
        {
          match: /\b((abort|begin|end) transaction)\b/dgv,
          name: "support.function.system-events.system-events.applescript"
        },
        {
          match: /\b(XML (attribute|data|element|file)s?)\b/dgv,
          name: "support.class.system-events.xml.applescript"
        },
        {
          match: /\b(print settings|users?|login items?)\b/dgv,
          name: "support.class.sytem-events.other.applescript"
        }
      ]
    },
    textmate: {
      patterns: [
        {
          match: /\b(print settings)\b/dgv,
          name: "support.class.textmate.applescript"
        },
        {
          match: /\b(get url|insert|reload bundles)\b/dgv,
          name: "support.function.textmate.applescript"
        }
      ]
    }
  },
  dependencies: []
};
