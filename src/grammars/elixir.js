import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "elixir",
  displayName: "Elixir",
  scopeName: "source.elixir",
  patterns: [
    {
      begin: /\b(fn)\b(?![^\n]*->)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.elixir" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        { include: "#core_syntax" }
      ]
    },
    {
      captures: {
        "1": { name: "entity.name.type.class.elixir" },
        "2": { name: "punctuation.separator.method.elixir" },
        "3": { name: "entity.name.function.elixir" }
      },
      match: /([A-Z][\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\.)\p{space}*([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*[\!\?]?)/dgv
    },
    {
      captures: {
        "1": { name: "constant.other.symbol.elixir" },
        "2": { name: "punctuation.separator.method.elixir" },
        "3": { name: "entity.name.function.elixir" }
      },
      match: /(:[\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\.)\p{space}*(_?[\p{L}\p{M}\p{N}\p{Pc}]*[\!\?]?)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.operator.other.elixir" },
        "2": { name: "entity.name.function.elixir" }
      },
      match: /(\|>)\p{space}*([_a-z][\p{L}\p{M}\p{N}\p{Pc}]*[\!\?]?)/dgv
    },
    {
      match: /\b[_a-z][\p{L}\p{M}\p{N}\p{Pc}]*[\!\?]?(?=\p{space}*\.?\p{space}*\()/dgv,
      name: "entity.name.function.elixir"
    },
    {
      begin: /\b(fn)\b(?=[^\n]*->)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.elixir" }
      },
      end: new EmulatedRegExp("(?:(?=((->)|(when)|(\\))))\\1)", "dgv", { hiddenCaptures: [1] }),
      endCaptures: {
        "1": { name: "keyword.operator.other.elixir" },
        "2": { name: "keyword.control.elixir" },
        "3": { name: "punctuation.section.function.elixir" }
      },
      patterns: [
        { include: "#core_syntax" }
      ]
    },
    { include: "#core_syntax" },
    {
      begin: /^(?=[^\n]*->)((?![^"']*(["'])[^"']*->)|(?=[^\n]*->[^"']*(["'])[^"']*->))((?![^\n]*\([^\)]*->)|(?=[^\(\)]*->)|(?=\p{space}*\([^\n]*\)[^\n]*->))((?![^\n]*\b(fn)\b)|(?=[^\n]*->[^\n]*\bfn\b))/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.elixir" }
      },
      end: new EmulatedRegExp("(?:(?=((->)|(when)|(\\))))\\1)", "dgv", { hiddenCaptures: [1] }),
      endCaptures: {
        "1": { name: "keyword.operator.other.elixir" },
        "2": { name: "keyword.control.elixir" },
        "3": { name: "punctuation.section.function.elixir" }
      },
      patterns: [
        { include: "#core_syntax" }
      ]
    }
  ],
  repository: {
    core_syntax: {
      patterns: [
        {
          begin: /^\p{space}*(defmodule)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.module.elixir" }
          },
          end: /\b(do)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.module.elixir" }
          },
          name: "meta.module.elixir",
          patterns: [
            {
              match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(?=\.)/dgv,
              name: "entity.other.inherited-class.elixir"
            },
            {
              match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
              name: "entity.name.type.class.elixir"
            }
          ]
        },
        {
          begin: /^\p{space}*(defprotocol)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.protocol.elixir" }
          },
          end: /\b(do)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.protocol.elixir" }
          },
          name: "meta.protocol_declaration.elixir",
          patterns: [
            {
              match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
              name: "entity.name.type.protocol.elixir"
            }
          ]
        },
        {
          begin: /^\p{space}*(defimpl)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.protocol.elixir" }
          },
          end: /\b(do)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.control.protocol.elixir" }
          },
          name: "meta.protocol_implementation.elixir",
          patterns: [
            {
              match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
              name: "entity.name.type.protocol.elixir"
            }
          ]
        },
        {
          begin: new EmulatedRegExp("^\\p{space}*(def(?:|macro|delegate|guard))\\p{space}+((?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=(\\.|::))\\4)))\\3)?(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?!>)))\\6)?|===?|>[\\=\\>]?|<=>|<[\\<\\=]?|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\]=?))\\5))((\\()|\\p{space}*)", "dgv", { hiddenCaptures: [3, 4, 5, 6] }),
          beginCaptures: {
            "1": { name: "keyword.control.module.elixir" },
            "2": { name: "entity.name.function.public.elixir" },
            "4": { name: "punctuation.section.function.elixir" }
          },
          end: /\b(do:)|\b(do)\b|(?=\p{space}+(def(?:|n|macro|delegate|guard))\b)/dgv,
          endCaptures: {
            "1": { name: "constant.other.keywords.elixir" },
            "2": { name: "keyword.control.module.elixir" }
          },
          name: "meta.function.public.elixir",
          patterns: [
            { include: "$self" },
            {
              begin: /\p{space}(\\\\)/dgv,
              beginCaptures: {
                "1": { name: "keyword.operator.other.elixir" }
              },
              end: /[\)\,]|(?=\n?$)/dgv,
              patterns: [
                { include: "$self" }
              ]
            },
            {
              match: /\b(is_atom|is_binary|is_bitstring|is_boolean|is_float|is_function|is_integer|is_list|is_map|is_nil|is_number|is_pid|is_port|is_record|is_reference|is_tuple|is_exception|abs|bit_size|byte_size|div|elem|hd|length|map_size|node|rem|round|tl|trunc|tuple_size)\b/dgv,
              name: "keyword.control.elixir"
            }
          ]
        },
        {
          begin: new EmulatedRegExp("^\\p{space}*(def(?:|n|macro|guard)p)\\p{space}+((?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=(\\.|::))\\4)))\\3)?(?:(?=([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?!>)))\\6)?|===?|>[\\=\\>]?|<=>|<[\\<\\=]?|[\\%\\&\\/\\`\\|]|\\*\\*?|=?~|[\\-\\+]@?|\\[\\]=?))\\5))((\\()|\\p{space}*)", "dgv", { hiddenCaptures: [3, 4, 5, 6] }),
          beginCaptures: {
            "1": { name: "keyword.control.module.elixir" },
            "2": { name: "entity.name.function.private.elixir" },
            "4": { name: "punctuation.section.function.elixir" }
          },
          end: /\b(do:)|\b(do)\b|(?=\p{space}+(def(?:p|macrop|guardp))\b)/dgv,
          endCaptures: {
            "1": { name: "constant.other.keywords.elixir" },
            "2": { name: "keyword.control.module.elixir" }
          },
          name: "meta.function.private.elixir",
          patterns: [
            { include: "$self" },
            {
              begin: /\p{space}(\\\\)/dgv,
              beginCaptures: {
                "1": { name: "keyword.operator.other.elixir" }
              },
              end: /[\)\,]|(?=\n?$)/dgv,
              patterns: [
                { include: "$self" }
              ]
            },
            {
              match: /\b(is_atom|is_binary|is_bitstring|is_boolean|is_float|is_function|is_integer|is_list|is_map|is_nil|is_number|is_pid|is_port|is_record|is_reference|is_tuple|is_exception|abs|bit_size|byte_size|div|elem|hd|length|map_size|node|rem|round|tl|trunc|tuple_size)\b/dgv,
              name: "keyword.control.elixir"
            }
          ]
        },
        {
          begin: /\p{space}*~L"""/dgv,
          end: /\p{space}*"""/dgv,
          name: "sigil.leex",
          patterns: [
            { include: "text.elixir" },
            { include: "text.html.basic" }
          ]
        },
        {
          begin: /\p{space}*~H"""/dgv,
          end: /\p{space}*"""/dgv,
          name: "sigil.heex",
          patterns: [
            { include: "text.elixir" },
            { include: "text.html.basic" }
          ]
        },
        {
          begin: /@(module|type)?doc (~[a-z])?"""/dgv,
          end: /\p{space}*"""/dgv,
          name: "comment.block.documentation.heredoc",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /@(module|type)?doc ~[A-Z]"""/dgv,
          end: /\p{space}*"""/dgv,
          name: "comment.block.documentation.heredoc"
        },
        {
          begin: /@(module|type)?doc (~[a-z])?'''/dgv,
          end: /\p{space}*'''/dgv,
          name: "comment.block.documentation.heredoc",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /@(module|type)?doc ~[A-Z]'''/dgv,
          end: /\p{space}*'''/dgv,
          name: "comment.block.documentation.heredoc"
        },
        {
          match: /@(module|type)?doc false/dgv,
          name: "comment.block.documentation.false"
        },
        {
          begin: /@(module|type)?doc "/dgv,
          end: /"/dgv,
          name: "comment.block.documentation.string",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          match: /(?<!\.)\b(do|end|case|bc|lc|for|if|cond|unless|try|receive|fn|defmodule|defp?|defprotocol|defimpl|defrecord|defstruct|defnp?|defmacrop?|defguardp?|defdelegate|defexception|defoverridable|exit|after|rescue|catch|else|raise|reraise|throw|import|require|alias|use|quote|unquote|super|with)\b(?![\!\:\?])/dgv,
          name: "keyword.control.elixir"
        },
        {
          match: /(?<!\.)\b(and|not|or|when|xor|in)\b/dgv,
          name: "keyword.operator.elixir"
        },
        {
          match: /\b[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
          name: "entity.name.type.class.elixir"
        },
        {
          match: /\b(nil|true|false)\b(?![\!\?])/dgv,
          name: "constant.language.elixir"
        },
        {
          match: /\b(__(CALLER|ENV|MODULE|DIR|STACKTRACE)__)\b(?![\!\?])/dgv,
          name: "variable.language.elixir"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.elixir" }
          },
          match: /(@)[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.readwrite.module.elixir"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.elixir" }
          },
          match: /(&)\p{Nd}+/dgv,
          name: "variable.other.anonymous.elixir"
        },
        {
          match: /&(?!&)/dgv,
          name: "variable.other.anonymous.elixir"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.elixir" }
          },
          match: /\^[_a-z][\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.capture.elixir"
        },
        {
          match: new EmulatedRegExp("\\b0x\\p{AHex}(?:(?=(_?\\p{AHex}))\\1)*\\b", "dgv", { hiddenCaptures: [1] }),
          name: "constant.numeric.hex.elixir"
        },
        {
          match: new EmulatedRegExp("\\b\\p{Nd}(?:(?=(_?\\p{Nd}))\\1)*(\\.(?![^\\p{space}\\p{Nd}])(?:(?=(_?\\p{Nd}))\\3)+)([Ee][\\-\\+]?\\p{Nd}(?:(?=(_?\\p{Nd}))\\5)*)?\\b", "dgv", { hiddenCaptures: [1, 3, 5] }),
          name: "constant.numeric.float.elixir"
        },
        {
          match: new EmulatedRegExp("\\b\\p{Nd}(?:(?=(_?\\p{Nd}))\\1)*\\b", "dgv", { hiddenCaptures: [1] }),
          name: "constant.numeric.integer.elixir"
        },
        {
          match: new EmulatedRegExp("\\b0b[01](?:(?=(_?[01]))\\1)*\\b", "dgv", { hiddenCaptures: [1] }),
          name: "constant.numeric.binary.elixir"
        },
        {
          match: new EmulatedRegExp("\\b0o[0-7](?:(?=(_?[0-7]))\\1)*\\b", "dgv", { hiddenCaptures: [1] }),
          name: "constant.numeric.octal.elixir"
        },
        {
          begin: /:'/dgv,
          captures: {
            "0": { name: "punctuation.definition.constant.elixir" }
          },
          end: /'/dgv,
          name: "constant.other.symbol.single-quoted.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /:"/dgv,
          captures: {
            "0": { name: "punctuation.definition.constant.elixir" }
          },
          end: /"/dgv,
          name: "constant.other.symbol.double-quoted.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /'''/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /^\p{space}*'''/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.single.heredoc.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /'/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.single.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /"""/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /^\p{space}*"""/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.double.heredoc.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.double.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /~[a-z]"""/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /^\p{space}*"""/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.heredoc.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /~[a-z]\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /\}[a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /~[a-z]\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /\][a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /~[a-z]</dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: />[a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /~[a-z]\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /\)[a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /~[a-z]([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /1[a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.elixir",
          patterns: [
            { include: "#interpolated_elixir" },
            { include: "#escaped_char" }
          ]
        },
        {
          begin: /~[A-Z]"""/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /^\p{space}*"""/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.heredoc.literal.elixir"
        },
        {
          begin: /~[A-Z]\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /\}[a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.literal.elixir"
        },
        {
          begin: /~[A-Z]\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /\][a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.literal.elixir"
        },
        {
          begin: /~[A-Z]</dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: />[a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.literal.elixir"
        },
        {
          begin: /~[A-Z]\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /\)[a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.literal.elixir"
        },
        {
          begin: /~[A-Z]([^\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.elixir" }
          },
          end: /1[a-z]*/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.elixir" }
          },
          name: "string.quoted.other.sigil.literal.elixir"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.constant.elixir" }
          },
          match: new EmulatedRegExp("(?<!:)(:)(?:(?=([A-Z_a-z][\\@\\p{L}\\p{M}\\p{N}\\p{Pc}]*(?:(?=([\\!\\?]|=(?![\\=\\>])))\\3)?|<>|===?|!==?|<<>>|<<<|>>>|~~~|::|<-|\\|>|=>|=~|[\\/\\=]|\\\\\\\\|\\*\\*?|\\.\\.?\\.?|\\.\\.//|>=?|<=?|&&?&?|\\+\\+?|--?|\\|\\|?\\|?|[\\!\\@]|%?\\{\\}|%|\\[\\]|\\^(\\^\\^)?))\\2)", "dgv", { hiddenCaptures: [2, 3] }),
          name: "constant.other.symbol.elixir"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.constant.elixir" }
          },
          match: new EmulatedRegExp("(?:(?=([A-Z_a-z][\\@\\p{L}\\p{M}\\p{N}\\p{Pc}]*[\\!\\?]?))\\1)(:)(?!:)", "dgv", { hiddenCaptures: [1] }),
          name: "constant.other.keywords.elixir"
        },
        {
          begin: /(^[\t ]+)?(?=##)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.elixir" }
          },
          end: /(?!#)/dgv,
          patterns: [
            {
              begin: /##/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.elixir" }
              },
              end: /\n/dgv,
              name: "comment.line.section.elixir"
            }
          ]
        },
        {
          begin: /(^[\t ]+)?(?=#)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.elixir" }
          },
          end: /(?!#)/dgv,
          patterns: [
            {
              begin: /#/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.elixir" }
              },
              end: /\n/dgv,
              name: "comment.line.number-sign.elixir"
            }
          ]
        },
        {
          match: /\b_([^_][\p{L}\p{M}\p{N}\p{Pc}]+[\!\?]?)/dgv,
          name: "comment.unused.elixir"
        },
        {
          match: /\b_\b/dgv,
          name: "comment.wildcard.elixir"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])\?(\\(x\p{AHex}{1,2}(?!\p{AHex})\b|[^CMx])|[^\\\p{space}])/dgv,
          name: "constant.numeric.elixir"
        },
        {
          match: /\+\+|--|<\|>/dgv,
          name: "keyword.operator.concatenation.elixir"
        },
        {
          match: /\|>|<~>|<>|<<<|>>>|~>>|<<~|~>|<~|<\|>/dgv,
          name: "keyword.operator.sigils_1.elixir"
        },
        {
          match: /&&&?/dgv,
          name: "keyword.operator.sigils_2.elixir"
        },
        {
          match: /<-|\\\\/dgv,
          name: "keyword.operator.sigils_3.elixir"
        },
        {
          match: /===?|!==?|<=?|>=?/dgv,
          name: "keyword.operator.comparison.elixir"
        },
        {
          match: /(\|\|\||&&&|\^\^\^|<<<|>>>|~~~)/dgv,
          name: "keyword.operator.bitwise.elixir"
        },
        {
          match: /(?<=[\t ])!+|\bnot\b|&&|\band\b|\|\||\bor\b|\bxor\b/dgv,
          name: "keyword.operator.logical.elixir"
        },
        {
          match: /([\-\*\+\/])/dgv,
          name: "keyword.operator.arithmetic.elixir"
        },
        {
          match: /\||\+\+|--|\*\*|\\\\|<-|<>|<<|>>|::|\.\.|\/\/|\|>|~|=>|&/dgv,
          name: "keyword.operator.other.elixir"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.elixir"
        },
        {
          match: /:/dgv,
          name: "punctuation.separator.other.elixir"
        },
        {
          match: /;/dgv,
          name: "punctuation.separator.statement.elixir"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.object.elixir"
        },
        {
          match: /\./dgv,
          name: "punctuation.separator.method.elixir"
        },
        {
          match: /[\{\}]/dgv,
          name: "punctuation.section.scope.elixir"
        },
        {
          match: /[\]\[]/dgv,
          name: "punctuation.section.array.elixir"
        },
        {
          match: /[\(\)]/dgv,
          name: "punctuation.section.function.elixir"
        }
      ]
    },
    escaped_char: {
      match: /\\(x[A-Fa-f\p{Nd}]{1,2}|[^\n])/dgv,
      name: "constant.character.escaped.elixir"
    },
    interpolated_elixir: {
      begin: /#\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.embedded.begin.elixir" }
      },
      contentName: "source.elixir",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.end.elixir" }
      },
      name: "meta.embedded.line.elixir",
      patterns: [
        { include: "#nest_curly_and_self" },
        { include: "$self" }
      ]
    },
    nest_curly_and_self: {
      patterns: [
        {
          begin: /\{/dgv,
          captures: {
            "0": { name: "punctuation.section.scope.elixir" }
          },
          end: /\}/dgv,
          patterns: [
            { include: "#nest_curly_and_self" }
          ]
        },
        { include: "$self" }
      ]
    }
  },
  dependencies: [
    "html"
  ]
};
