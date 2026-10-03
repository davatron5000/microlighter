import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "pascal",
  displayName: "Pascal",
  scopeName: "source.pascal",
  patterns: [
    {
      match: /\b(absolute|abstract|add|all|and_then|array|asc??|asm|assembler|async|attribute|autoreleasepool|await|begin|bindable|block|by|case|cdecl|class|concat|const|constref|copy|cppdecl|contains|default|delegate|deprecated|desc|distinct|div|each|else|empty|end|ensure|enum|equals|event|except|exports??|extension|external|far|file|finalization|finalizer|finally|flags|forward|from|future|generic|goto|group|has|helper|if|implements|implies|import|in|index|inherited|initialization|inline|interrupt|into|invariants|is|iterator|label|library|join|lazy|lifetimestrategy|locked|locking|loop|mapped|matching|message|method|mod|module|name|namespace|near|nested|new|nostackframe|not|notify|nullable|object|of|old|oldfpccall|on|only|operator|optional|or_else|order|otherwise|out|override|package|packed|parallel|params|partial|pascal|pinned|platform|pow|private|program|protected|public|published|interface|implementation|qualified|queryable|raises|read|readonly|record|reference|register|remove|resident|requires??|resourcestring|restricted|result|reverse|safecall|sealed|segment|select|selector|sequence|set|shl|shr|skip|specialize|soft|static|stored|stdcall|step|strict|strong|take|then|threadvar|to|try|tuple|type|unconstrained|unit|unmanaged|unretained|unsafe|uses|using|var|view|virtual|volatile|weak|dynamic|overload|reintroduce|where|with|write|xor|yield)\b/dgiv,
      name: "keyword.pascal"
    },
    {
      captures: {
        "1": { name: "storage.type.prototype.pascal" },
        "2": { name: "entity.name.function.prototype.pascal" }
      },
      match: /\b(function|procedure|constructor|destructor)\b\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+(\.[\p{L}\p{M}\p{N}\p{Pc}]+)?)(\([^\n]*?\))?;\p{space}*(?=(?:attribute|forward|external))/dgiv,
      name: "meta.function.prototype.pascal"
    },
    {
      captures: {
        "1": { name: "storage.type.function.pascal" },
        "2": { name: "entity.name.function.pascal" }
      },
      match: /\b(function|procedure|constructor|destructor|property|read|write)\b\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+(\.[\p{L}\p{M}\p{N}\p{Pc}]+)?)/dgiv,
      name: "meta.function.pascal"
    },
    {
      match: /\b(self|result)\b/dgiv,
      name: "token.variable"
    },
    {
      match: /\b(and|or)\b/dgiv,
      name: "keyword.operator.pascal"
    },
    {
      match: /\b(break|continue|exit|abort|while|do|downto|for|raise|repeat|until)\b/dgiv,
      name: "keyword.control.pascal"
    },
    {
      begin: /\{\$/dgv,
      captures: {
        "0": { name: "string.regexp" }
      },
      end: /\}/dgv,
      name: "string.regexp"
    },
    {
      match: /\b(ansichar|ansistring|boolean|byte|cardinal|char|comp|currency|double|dword|extended|file|integer|int8|int16|int32|int64|longint|longword|nativeint|nativeuint|olevariant|pansichar|pchar|pwidechar|pointer|real|shortint|shortstring|single|smallint|string|uint8|uint16|uint32|uint64|variant|widechar|widestring|word|wordbool|uintptr|intptr)\b/dgiv,
      name: "storage.support.type.pascal"
    },
    {
      match: /\b(\p{Nd}+)|(\p{Nd}*\.\p{Nd}+([Ee][\-\+]?\p{Nd}+)?)\b/dgv,
      name: "constant.numeric.pascal"
    },
    {
      match: /\$\p{AHex}{1,16}\b/dgv,
      name: "constant.numeric.hex.pascal"
    },
    {
      match: /\b(true|false|nil)\b/dgiv,
      name: "constant.language.pascal"
    },
    {
      match: /\b(Assert)\b/dgiv,
      name: "keyword.control"
    },
    {
      begin: /(^[\t ]+)?(?=\/\/)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.pascal" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /\/\//dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.pascal" }
          },
          end: /\n/dgv,
          name: "comment.line.double-slash.pascal.two"
        }
      ]
    },
    {
      begin: /\(\*/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.pascal" }
      },
      end: /\*\)/dgv,
      name: "comment.block.pascal.one"
    },
    {
      begin: /\{(?!\$)/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.pascal" }
      },
      end: /\}/dgv,
      name: "comment.block.pascal.two"
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.pascal" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.pascal" }
      },
      name: "string.quoted.single.pascal",
      patterns: [
        {
          match: /''/dgv,
          name: "constant.character.escape.apostrophe.pascal"
        }
      ]
    },
    {
      match: /#\p{Nd}+/dgv,
      name: "string.other.pascal"
    }
  ],
  dependencies: []
};
