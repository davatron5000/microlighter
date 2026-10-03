export default {
  name: "hy",
  displayName: "Hy",
  scopeName: "source.hy",
  patterns: [
    { include: "#all" }
  ],
  repository: {
    all: {
      patterns: [
        { include: "#comment" },
        { include: "#constants" },
        { include: "#keywords" },
        { include: "#strings" },
        { include: "#operators" },
        { include: "#keysym" },
        { include: "#builtin" },
        { include: "#symbol" }
      ]
    },
    builtin: {
      patterns: [
        {
          match: /(?<![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])(abs|all|any|ascii|bin|breakpoint|callable|chr|compile|delattr|dir|divmod|eval|exec|format|getattr|globals|hasattr|hash|hex|id|input|isinstance|issubclass|iter|aiter|len|locals|max|min|next|anext|oct|ord|pow|print|repr|round|setattr|sorted|sum|vars|False|None|True|NotImplemented|bool|memoryview|bytearray|bytes|classmethod|complex|dict|enumerate|filter|float|frozenset|property|int|list|map|object|range|reversed|set|slice|staticmethod|str|super|tuple|type|zip|open|quit|exit|copyright|credits|help)(?![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "storage.builtin.hy"
        },
        {
          match: /(?<=\(\p{space}*)\.\.\.(?![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "storage.builtin.dots.hy"
        }
      ]
    },
    comment: {
      patterns: [
        {
          match: /(;)[^\n]*(?=\n?$)/dgv,
          name: "comment.line.hy"
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /(?<=[\(\[\{\p{space}])([0-9]+(\.[0-9]+)?|(#x)\p{AHex}+|(#o)[0-7]+|(#b)[01]+)(?=[\]"'\(\)\,\;\[\{\}\p{space}])/dgv,
          name: "constant.numeric.hy"
        }
      ]
    },
    keysym: {
      match: /(?<![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}]):[\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.constant"
    },
    keywords: {
      patterns: [
        {
          match: /(?<![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])(and|await|match|let|annotate|assert|break|chainc|cond|continue|deftype|do|except\*?|finally|else|defreader|([dgls])?for|set[vx]|defclass|defmacro|del|export|eval-and-compile|eval-when-compile|get|global|if|import|(de)?fn|nonlocal|not-in|or|(quasi)?quote|require|return|cut|raise|try|unpack-iterable|unpack-mapping|unquote|unquote-splice|when|while|with|yield|local-macros|in|is|py(s)?|pragma|nonlocal|(is-)?not)(?![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "keyword.control.hy"
        },
        {
          match: /(?<=\(\p{space}*)\.(?![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "keyword.control.dot.hy"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /(?<![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])(\+=?|\/\/?=?|\*\*?=?|--?=?|[\!\<\>]?=|@=?|%=?|<<?=?|>>?=?|&=?|\|=?|\^|~@|~=?|#\*\*?)(?![\-\!\$\%\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "keyword.control.hy"
        }
      ]
    },
    strings: {
      begin: /(f?"|\}(?=[^\n]*?["\{]))/dgv,
      end: /("|(?<=["\}][^\n]*?)\{)/dgv,
      name: "string.quoted.double.hy",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.hy"
        }
      ]
    },
    symbol: {
      match: /(?<![\-\!\#-\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}])[\-\!\#\$\%\*\.\/\<-Z\^_a-zΑ-Ωα-ω][\-\!\#-\&\*\.\/\:\<-\@\^_\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.hy"
    }
  },
  dependencies: []
};
