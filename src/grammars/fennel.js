export default {
  name: "fennel",
  displayName: "Fennel",
  scopeName: "source.fnl",
  patterns: [
    { include: "#expression" }
  ],
  repository: {
    comment: {
      patterns: [
        {
          begin: /;/dgv,
          end: /(?=\n?$)/dgv,
          name: "comment.line.semicolon.fennel"
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /nil/dgv,
          name: "constant.language.nil.fennel"
        },
        {
          match: /false|true/dgv,
          name: "constant.language.boolean.fennel"
        },
        {
          match: /(-?\p{Nd}+\.\p{Nd}+([Ee][\-\+]?\p{Nd}+)?)/dgv,
          name: "constant.numeric.double.fennel"
        },
        {
          match: /(-?\p{Nd}+)/dgv,
          name: "constant.numeric.integer.fennel"
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#comment" },
        { include: "#constants" },
        { include: "#sexp" },
        { include: "#table" },
        { include: "#vector" },
        { include: "#keywords" },
        { include: "#special" },
        { include: "#lua" },
        { include: "#strings" },
        { include: "#methods" },
        { include: "#symbols" }
      ]
    },
    keywords: {
      match: /:[^ ]+/dgv,
      name: "constant.keyword.fennel"
    },
    lua: {
      patterns: [
        {
          match: /\b(assert|collectgarbage|dofile|error|getmetatable|ipairs|load|loadfile|next|pairs|pcall|print|rawequal|rawget|rawlen|rawset|require|select|setmetatable|tonumber|tostring|type|xpcall)\b/dgv,
          name: "support.function.fennel"
        },
        {
          match: /\b(coroutine|coroutine[^\n]create|coroutine[^\n]isyieldable|coroutine[^\n]resume|coroutine[^\n]running|coroutine[^\n]status|coroutine[^\n]wrap|coroutine[^\n]yield|debug|debug[^\n]debug|debug[^\n]gethook|debug[^\n]getinfo|debug[^\n]getlocal|debug[^\n]getmetatable|debug[^\n]getregistry|debug[^\n]getupvalue|debug[^\n]getuservalue|debug[^\n]sethook|debug[^\n]setlocal|debug[^\n]setmetatable|debug[^\n]setupvalue|debug[^\n]setuservalue|debug[^\n]traceback|debug[^\n]upvalueid|debug[^\n]upvaluejoin|io|io[^\n]close|io[^\n]flush|io[^\n]input|io[^\n]lines|io[^\n]open|io[^\n]output|io[^\n]popen|io[^\n]read|io[^\n]stderr|io[^\n]stdin|io[^\n]stdout|io[^\n]tmpfile|io[^\n]type|io[^\n]write|math|math[^\n]abs|math[^\n]acos|math[^\n]asin|math[^\n]atan|math[^\n]ceil|math[^\n]cos|math[^\n]deg|math[^\n]exp|math[^\n]floor|math[^\n]fmod|math[^\n]huge|math[^\n]log|math[^\n]max|math[^\n]maxinteger|math[^\n]min|math[^\n]mininteger|math[^\n]modf|math[^\n]pi|math[^\n]rad|math[^\n]random|math[^\n]randomseed|math[^\n]sin|math[^\n]sqrt|math[^\n]tan|math[^\n]tointeger|math[^\n]type|math[^\n]ult|os|os[^\n]clock|os[^\n]date|os[^\n]difftime|os[^\n]execute|os[^\n]exit|os[^\n]getenv|os[^\n]remove|os[^\n]rename|os[^\n]setlocale|os[^\n]time|os[^\n]tmpname|package|package[^\n]config|package[^\n]cpath|package[^\n]loaded|package[^\n]loadlib|package[^\n]path|package[^\n]preload|package[^\n]searchers|package[^\n]searchpath|string|string[^\n]byte|string[^\n]char|string[^\n]dump|string[^\n]find|string[^\n]format|string[^\n]gmatch|string[^\n]gsub|string[^\n]len|string[^\n]lower|string[^\n]match|string[^\n]pack|string[^\n]packsize|string[^\n]rep|string[^\n]reverse|string[^\n]sub|string[^\n]unpack|string[^\n]upper|table|table[^\n]concat|table[^\n]insert|table[^\n]move|table[^\n]pack|table[^\n]remove|table[^\n]sort|table[^\n]unpack|utf8|utf8[^\n]char|utf8[^\n]charpattern|utf8[^\n]codepoint|utf8[^\n]codes|utf8[^\n]len|utf8[^\n]offset)\b/dgv,
          name: "support.function.library.fennel"
        },
        {
          match: /\b(_(?:G|VERSION))\b/dgv,
          name: "constant.language.fennel"
        }
      ]
    },
    methods: {
      patterns: [
        {
          match: /[\p{L}\p{M}\p{N}\p{Pc}]+:[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
          name: "entity.name.function.method.fennel"
        }
      ]
    },
    sexp: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.paren.open.fennel" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.paren.close.fennel" }
      },
      name: "sexp.fennel",
      patterns: [
        { include: "#expression" }
      ]
    },
    special: {
      patterns: [
        {
          match: /[\#\%\*\+]|\?\.|(\.)?\.|(\/)?\/|:|<=?|=|>=?|\^/dgv,
          name: "keyword.special.fennel"
        },
        {
          match: /(->(>)?)/dgv,
          name: "keyword.special.fennel"
        },
        {
          match: /-\?>(>)?/dgv,
          name: "keyword.special.fennel"
        },
        {
          match: /-/dgv,
          name: "keyword.special.fennel"
        },
        {
          match: /not=/dgv,
          name: "keyword.special.fennel"
        },
        {
          match: /set-forcibly!/dgv,
          name: "keyword.special.fennel"
        },
        {
          match: /\b(and|band|bnot|bor|bxor|collect|comment|doc??|doto|each|eval-compiler|for|global|hashfn|icollect|if|import-macros|include|lambda|length|let|local|lshift|lua|macro|macrodebug|macros|match|not=?|or|partial|pick-args|pick-values|quote|require-macros|rshift|set|tset|values|var|when|while|with-open)\b/dgv,
          name: "keyword.special.fennel"
        },
        {
          match: /\b(fn)\b/dgv,
          name: "keyword.control.fennel"
        },
        {
          match: /~=/dgv,
          name: "keyword.special.fennel"
        },
        {
          match: /λ/dgv,
          name: "keyword.special.fennel"
        }
      ]
    },
    strings: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.fennel",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.fennel"
        }
      ]
    },
    symbols: {
      patterns: [
        {
          match: /[\p{L}\p{M}\p{N}\p{Pc}]+(?:\.[\p{L}\p{M}\p{N}\p{Pc}]+)+/dgv,
          name: "entity.name.function.symbol.fennel"
        },
        {
          match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
          name: "variable.other.fennel"
        }
      ]
    },
    table: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.table.bracket.open.fennel" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.table.bracket.close.fennel" }
      },
      name: "table.fennel",
      patterns: [
        { include: "#expression" }
      ]
    },
    vector: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.vector.bracket.open.fennel" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.vector.bracket.close.fennel" }
      },
      name: "meta.vector.fennel",
      patterns: [
        { include: "#expression" }
      ]
    }
  },
  dependencies: []
};
