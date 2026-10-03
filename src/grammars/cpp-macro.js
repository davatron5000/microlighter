import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "cpp-macro",
  displayName: "C++",
  scopeName: "source.cpp.embedded.macro",
  patterns: [
    { include: "#ever_present_context" },
    { include: "#constructor_root" },
    { include: "#destructor_root" },
    { include: "#function_definition" },
    { include: "source.cpp#simple_array_assignment" },
    { include: "#operator_overload" },
    { include: "#using_namespace" },
    { include: "source.cpp#type_alias" },
    { include: "source.cpp#using_name" },
    { include: "source.cpp#namespace_alias" },
    { include: "#namespace_block" },
    { include: "#extern_block" },
    { include: "#typedef_class" },
    { include: "#typedef_struct" },
    { include: "#typedef_union" },
    { include: "source.cpp#misc_keywords" },
    { include: "source.cpp#standard_declares" },
    { include: "#class_block" },
    { include: "#struct_block" },
    { include: "#union_block" },
    { include: "#enum_block" },
    { include: "source.cpp#template_isolated_definition" },
    { include: "#template_definition" },
    { include: "source.cpp#template_explicit_instantiation" },
    { include: "source.cpp#access_control_keywords" },
    { include: "#block" },
    { include: "#static_assert" },
    { include: "#assembly" },
    { include: "#function_pointer" },
    { include: "#evaluation_context" }
  ],
  repository: {
    alignas_attribute: {
      begin: /alignas\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.attribute.begin.cpp" }
      },
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.attribute.end.cpp" }
      },
      name: "support.other.attribute.cpp",
      patterns: [
        { include: "#attributes_context" },
        {
          begin: /\(/dgv,
          beginCaptures: {},
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          patterns: [
            { include: "#attributes_context" },
            { include: "#string_context" },
            { include: "#ever_present_context" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.other.using.directive.cpp" },
            "2": { name: "entity.name.namespace.cpp" }
          },
          match: /(using)\p{space}+((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))/dgv
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.attribute.cpp"
        },
        {
          match: /:/dgv,
          name: "punctuation.accessor.attribute.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])(?=::)/dgv,
          name: "entity.name.namespace.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "entity.other.attribute.$0.cpp"
        },
        { include: "source.cpp#number_literal" },
        { include: "#ever_present_context" }
      ]
    },
    alignas_operator: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])alignas(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])alignas(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.operator.functionlike.cpp keyword.operator.alignas.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.alignas.cpp" }
      },
      contentName: "meta.arguments.operator.alignas",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.operator.alignas.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    alignof_operator: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])alignof(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])alignof(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.operator.functionlike.cpp keyword.operator.alignof.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.alignof.cpp" }
      },
      contentName: "meta.arguments.operator.alignof",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.operator.alignof.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    assembly: {
      begin: /\b(__asm__|asm)\b(?:\p{space}+)?((?:volatile)?)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.asm.cpp" },
        "2": { name: "storage.modifier.cpp" }
      },
      end: {
        G: [/(?!￿)|(?=(?<!\\)\n)/dgv, new EmulatedRegExp("(?!^)|(?=(?<!\\\\)\\n)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {},
      name: "meta.asm.cpp",
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "3": { name: "comment.block.cpp" },
            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:\\n|(?=\\n?$))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:\\n|(?=\\n?$))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
          }
        },
        { include: "#comments" },
        {
          begin: {
            A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))\\(", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))\\(", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
          },
          beginCaptures: {
            "0": { name: "punctuation.section.parens.begin.bracket.round.assembly.cpp" },
            "1": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "3": { name: "comment.block.cpp" },
            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.parens.end.bracket.round.assembly.cpp" }
          },
          patterns: [
            {
              begin: /(R?)(")/dgv,
              beginCaptures: {
                "1": { name: "meta.encoding.cpp" },
                "2": { name: "punctuation.definition.string.begin.assembly.cpp" }
              },
              contentName: "meta.embedded.assembly",
              end: /"|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.string.end.assembly.cpp" }
              },
              name: "string.quoted.double.cpp",
              patterns: [
                { include: "source.asm" },
                { include: "source.x86" },
                { include: "source.x86_64" },
                { include: "source.arm" },
                { include: "source.cpp#backslash_escapes" },
                { include: "source.cpp#string_escaped_char" }
              ]
            },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.parens.begin.bracket.round.assembly.inner.cpp" }
              },
              end: /\)|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.parens.end.bracket.round.assembly.inner.cpp" }
              },
              patterns: [
                { include: "#evaluation_context" }
              ]
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "5": { name: "variable.other.asm.label.cpp" },
                "6": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "8": { name: "comment.block.cpp" },
                "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("\\[((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))\\]", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19] }), new EmulatedRegExp("\\[((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))\\]", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19] })]
              }
            },
            {
              match: /:/dgv,
              name: "punctuation.separator.delimiter.colon.assembly.cpp"
            },
            { include: "#comments" }
          ]
        }
      ]
    },
    attributes_context: {
      patterns: [
        { include: "#cpp_attributes" },
        { include: "#gcc_attributes" },
        { include: "#ms_attributes" },
        { include: "#alignas_attribute" }
      ]
    },
    block: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.block.begin.bracket.curly.cpp" }
      },
      end: /\}|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.block.end.bracket.curly.cpp" }
      },
      name: "meta.block.cpp",
      patterns: [
        { include: "#function_body_context" }
      ]
    },
    block_comment: {
      applyEndPatternLast: 1,
      begin: new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)(/\\*)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.begin.cpp" }
      },
      end: /\*\/|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.end.cpp" }
      },
      name: "comment.block.cpp",
      patterns: [
        {
          match: /[^\*]*\n/dgv
        }
      ]
    },
    builtin_storage_type_initilizer: {
      begin: new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:(?:(unsigned|wchar_t|double|signed|short|float|auto|void|long|char|bool|int)|(uint_least32_t|uint_least64_t|uint_least16_t|uint_fast64_t|uint_least8_t|int_least64_t|int_least32_t|int_least16_t|uint_fast16_t|uint_fast32_t|int_least8_t|int_fast16_t|int_fast32_t|int_fast64_t|uint_fast8_t|int_fast8_t|suseconds_t|useconds_t|uintmax_t|in_port_t|uintmax_t|in_addr_t|blksize_t|uintptr_t|intmax_t|intptr_t|blkcnt_t|intmax_t|u_quad_t|uint16_t|uint32_t|uint64_t|ssize_t|fixpt_t|qaddr_t|u_short|int16_t|int32_t|int64_t|uint8_t|daddr_t|caddr_t|swblk_t|clock_t|segsz_t|nlink_t|time_t|u_long|ushort|quad_t|mode_t|size_t|u_char|int8_t|u_int|uid_t|off_t|pid_t|gid_t|dev_t|div_t|key_t|ino_t|id_t|uint))|(pthread_(?:rwlockattr_|mutexattr_|condattr_|rwlock_|mutex_|cond_|attr_|once_|key_|)t))|([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*_t))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\6)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(\\()", "dgv", { hiddenCaptures: [1, 6] }),
      beginCaptures: {
        "1": { name: "storage.type.primitive.cpp storage.type.built-in.primitive.cpp" },
        "2": { name: "storage.type.cpp storage.type.built-in.cpp" },
        "3": { name: "support.type.posix-reserved.pthread.cpp support.type.built-in.posix-reserved.pthread.cpp" },
        "4": { name: "support.type.posix-reserved.cpp support.type.built-in.posix-reserved.cpp" },
        "5": { name: "punctuation.section.arguments.begin.bracket.round.initializer.cpp" }
      },
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.initializer.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    case_statement: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])case(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])case(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "keyword.control.case.cpp" }
      },
      end: /:|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.colon.case.cpp" }
      },
      name: "meta.conditional.case.cpp",
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    class_block: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])class(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])class(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] })]
      },
      beginCaptures: {
        "0": { name: "meta.head.class.cpp" },
        "1": { name: "storage.type.$1.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "7": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "9": { name: "comment.block.cpp" },
        "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "11": {
          patterns: [
            {
              captures: {
                "1": { name: "storage.type.modifier.final.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            {
              captures: {
                "1": { name: "entity.name.type.class.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "storage.type.modifier.final.cpp" },
                "7": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "9": { name: "comment.block.cpp" },
                "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] })]
              }
            },
            {
              match: /DLLEXPORT/dgv,
              name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cpp"
            },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cpp"
            }
          ]
        },
        "12": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "14": { name: "comment.block.cpp" },
        "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "16": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "18": { name: "comment.block.cpp" },
        "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "20": { name: "punctuation.separator.colon.inheritance.cpp" }
      },
      end: /(?:(?:(?<=\}|%>|\?\?>)(?:\p{space}+)?(;)|(;))|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.statement.cpp" },
        "2": { name: "punctuation.terminator.statement.cpp" }
      },
      name: "meta.block.class.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.class.cpp" }
          },
          name: "meta.head.class.cpp",
          patterns: [
            { include: "#ever_present_context" },
            { include: "#inheritance_context" },
            { include: "#template_call_range_helper" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.class.cpp" }
          },
          name: "meta.body.class.cpp",
          patterns: [
            { include: "#function_pointer" },
            { include: "#static_assert" },
            { include: "#constructor_inline" },
            { include: "#destructor_inline" },
            { include: "#operator_overload" },
            { include: "#normal_variable_declaration" },
            { include: "#normal_variable_assignment" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.class.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: new EmulatedRegExp("^(?:(?=((?:\\p{space}+)?))\\1)(//[\\!\\/]+)", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.documentation.cpp" }
          },
          end: /(?<=\n)(?<!\\\n)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "comment.line.double-slash.documentation.cpp",
          patterns: [
            { include: "source.cpp#line_continuation_character" },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:callergraph|callgraph|else|endif|f\$|f\[|f\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|["-\%\.\<\=\>]|::|\||---??)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              captures: {
                "1": { name: "storage.type.class.doxygen.cpp" },
                "2": { name: "markup.italic.doxygen.cpp" }
              },
              match: /((?<=[\!\*\/\p{space}])[\@\\](?:a|em?))\p{space}+(\P{space}+)/dgv
            },
            {
              captures: {
                "1": { name: "storage.type.class.doxygen.cpp" },
                "2": { name: "markup.bold.doxygen.cpp" }
              },
              match: /((?<=[\!\*\/\p{space}])[\@\\]b)\p{space}+(\P{space}+)/dgv
            },
            {
              captures: {
                "1": { name: "storage.type.class.doxygen.cpp" },
                "2": { name: "markup.inline.raw.string.cpp" }
              },
              match: /((?<=[\!\*\/\p{space}])[\@\\][cp])\p{space}+(\P{space}+)/dgv
            },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:a|anchor|[bc]|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|em??|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              captures: {
                "1": { name: "storage.type.class.doxygen.cpp" },
                "2": {
                  patterns: [
                    {
                      match: /in|out/dgv,
                      name: "keyword.other.parameter.direction.$0.cpp"
                    }
                  ]
                },
                "3": {
                  patterns: [
                    {
                      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                      name: "variable.parameter.cpp"
                    },
                    {
                      match: /,/dgv,
                      name: "punctuation.cpp"
                    }
                  ]
                },
                "4": { name: "variable.parameter.cpp" },
                "5": { name: "punctuation.cpp" },
                "6": { name: "variable.parameter.cpp" }
              },
              match: /((?<=[\!\*\/\p{space}])[\@\\]param)(?:\p{space}*\[((?:,?(?:\p{space}+)?(?:in|out)(?:\p{space}+)?)+)\])?(\p{space}+((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))(?:(,)(?:\p{space}+)?((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])))*)/dgv
            },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:arg|attention|authors??|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remarks??|result|returns??|retval|sa|see|short|since|test|throws??|todo|tparam|version|warning|xrefitem)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|startuml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              match: /\b[A-Z]+:|@[_a-z]+:/dgv,
              name: "storage.type.class.gtkdoc.cpp"
            }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.begin.documentation.cpp" },
            "2": {
              patterns: [
                {
                  match: /(?<=[\!\*\/\p{space}])[\@\\](?:callergraph|callgraph|else|endif|f\$|f\[|f\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|["-\%\.\<\=\>]|::|\||---??)\b(?:\{[^\}]*\})?/dgv,
                  name: "storage.type.class.doxygen.cpp"
                },
                {
                  captures: {
                    "1": { name: "storage.type.class.doxygen.cpp" },
                    "2": { name: "markup.italic.doxygen.cpp" }
                  },
                  match: /((?<=[\!\*\/\p{space}])[\@\\](?:a|em?))\p{space}+(\P{space}+)/dgv
                },
                {
                  captures: {
                    "1": { name: "storage.type.class.doxygen.cpp" },
                    "2": { name: "markup.bold.doxygen.cpp" }
                  },
                  match: /((?<=[\!\*\/\p{space}])[\@\\]b)\p{space}+(\P{space}+)/dgv
                },
                {
                  captures: {
                    "1": { name: "storage.type.class.doxygen.cpp" },
                    "2": { name: "markup.inline.raw.string.cpp" }
                  },
                  match: /((?<=[\!\*\/\p{space}])[\@\\][cp])\p{space}+(\P{space}+)/dgv
                },
                {
                  match: /(?<=[\!\*\/\p{space}])[\@\\](?:a|anchor|[bc]|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|em??|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\b(?:\{[^\}]*\})?/dgv,
                  name: "storage.type.class.doxygen.cpp"
                },
                {
                  match: /(?<=[\!\*\/\p{space}])[\@\\](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\b(?:\{[^\}]*\})?/dgv,
                  name: "storage.type.class.doxygen.cpp"
                },
                {
                  captures: {
                    "1": { name: "storage.type.class.doxygen.cpp" },
                    "2": {
                      patterns: [
                        {
                          match: /in|out/dgv,
                          name: "keyword.other.parameter.direction.$0.cpp"
                        }
                      ]
                    },
                    "3": {
                      patterns: [
                        {
                          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                          name: "variable.parameter.cpp"
                        },
                        {
                          match: /,/dgv,
                          name: "punctuation.cpp"
                        }
                      ]
                    },
                    "4": { name: "variable.parameter.cpp" },
                    "5": { name: "punctuation.cpp" },
                    "6": { name: "variable.parameter.cpp" }
                  },
                  match: /((?<=[\!\*\/\p{space}])[\@\\]param)(?:\p{space}*\[((?:,?(?:\p{space}+)?(?:in|out)(?:\p{space}+)?)+)\])?(\p{space}+((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))(?:(,)(?:\p{space}+)?((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])))*)/dgv
                },
                {
                  match: /(?<=[\!\*\/\p{space}])[\@\\](?:arg|attention|authors??|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remarks??|result|returns??|retval|sa|see|short|since|test|throws??|todo|tparam|version|warning|xrefitem)\b(?:\{[^\}]*\})?/dgv,
                  name: "storage.type.class.doxygen.cpp"
                },
                {
                  match: /(?<=[\!\*\/\p{space}])[\@\\](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|startuml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\b(?:\{[^\}]*\})?/dgv,
                  name: "storage.type.class.doxygen.cpp"
                },
                {
                  match: /\b[A-Z]+:|@[_a-z]+:/dgv,
                  name: "storage.type.class.gtkdoc.cpp"
                }
              ]
            },
            "3": { name: "punctuation.definition.comment.end.documentation.cpp" }
          },
          match: /(\/\*[\!\*]+(?=\p{space}))([^\n]+)([\!\*]*\*\/)/dgv,
          name: "comment.block.documentation.cpp"
        },
        {
          begin: new EmulatedRegExp("(?:(?=((?:\\p{space}+)?))\\1)/\\*[\\!\\*]+(?:(?:\\n|(?=\\n?$))|(?=\\p{space}))", "dgv", { hiddenCaptures: [1] }),
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.documentation.cpp" }
          },
          end: /[\!\*]*\*\/|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.documentation.cpp" }
          },
          name: "comment.block.documentation.cpp",
          patterns: [
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:callergraph|callgraph|else|endif|f\$|f\[|f\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|["-\%\.\<\=\>]|::|\||---??)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              captures: {
                "1": { name: "storage.type.class.doxygen.cpp" },
                "2": { name: "markup.italic.doxygen.cpp" }
              },
              match: /((?<=[\!\*\/\p{space}])[\@\\](?:a|em?))\p{space}+(\P{space}+)/dgv
            },
            {
              captures: {
                "1": { name: "storage.type.class.doxygen.cpp" },
                "2": { name: "markup.bold.doxygen.cpp" }
              },
              match: /((?<=[\!\*\/\p{space}])[\@\\]b)\p{space}+(\P{space}+)/dgv
            },
            {
              captures: {
                "1": { name: "storage.type.class.doxygen.cpp" },
                "2": { name: "markup.inline.raw.string.cpp" }
              },
              match: /((?<=[\!\*\/\p{space}])[\@\\][cp])\p{space}+(\P{space}+)/dgv
            },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:a|anchor|[bc]|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|em??|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              captures: {
                "1": { name: "storage.type.class.doxygen.cpp" },
                "2": {
                  patterns: [
                    {
                      match: /in|out/dgv,
                      name: "keyword.other.parameter.direction.$0.cpp"
                    }
                  ]
                },
                "3": {
                  patterns: [
                    {
                      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                      name: "variable.parameter.cpp"
                    },
                    {
                      match: /,/dgv,
                      name: "punctuation.cpp"
                    }
                  ]
                },
                "4": { name: "variable.parameter.cpp" },
                "5": { name: "punctuation.cpp" },
                "6": { name: "variable.parameter.cpp" }
              },
              match: /((?<=[\!\*\/\p{space}])[\@\\]param)(?:\p{space}*\[((?:,?(?:\p{space}+)?(?:in|out)(?:\p{space}+)?)+)\])?(\p{space}+((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))(?:(,)(?:\p{space}+)?((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])))*)/dgv
            },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:arg|attention|authors??|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remarks??|result|returns??|retval|sa|see|short|since|test|throws??|todo|tparam|version|warning|xrefitem)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              match: /(?<=[\!\*\/\p{space}])[\@\\](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|startuml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\b(?:\{[^\}]*\})?/dgv,
              name: "storage.type.class.doxygen.cpp"
            },
            {
              match: /\b[A-Z]+:|@[_a-z]+:/dgv,
              name: "storage.type.class.gtkdoc.cpp"
            }
          ]
        },
        { include: "source.cpp#emacs_file_banner" },
        { include: "#block_comment" },
        { include: "#line_comment" },
        { include: "source.cpp#invalid_comment_end" }
      ]
    },
    constructor_inline: {
      begin: {
        A: [new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*)((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=\\())", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] }), new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*)((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=\\())", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] })]
      },
      beginCaptures: {
        "0": { name: "meta.head.function.definition.special.constructor.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": {
          patterns: [
            { include: "source.cpp#functional_specifiers_pre_parameters" }
          ]
        },
        "6": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "8": { name: "comment.block.cpp" },
        "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "10": { name: "storage.type.modifier.calling-convention.cpp" },
        "11": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "13": { name: "comment.block.cpp" },
        "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "15": { name: "entity.name.function.constructor.cpp entity.name.function.definition.special.constructor.cpp" }
      },
      end: /(?:(?<=\}|%>|\?\?>)|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.function.definition.special.constructor.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.function.definition.special.constructor.cpp" }
          },
          name: "meta.head.function.definition.special.constructor.cpp",
          patterns: [
            { include: "#ever_present_context" },
            {
              captures: {
                "1": { name: "keyword.operator.assignment.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "keyword.other.default.function.cpp keyword.other.default.constructor.cpp" },
                "7": { name: "keyword.other.delete.function.cpp keyword.other.delete.constructor.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            { include: "source.cpp#functional_specifiers_pre_parameters" },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "punctuation.separator.initializers.cpp" }
              },
              end: /(?=\{)|(?=(?<!\\)\n)/dgv,
              endCaptures: {},
              patterns: [
                {
                  begin: new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\12)|\\*+(?!/))*))\\11)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\29))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\30))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\31))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\32))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\33))*>)(?:(?=(\\p{space}*))\\34))?(\\()", "dgv", { hiddenCaptures: [6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34] }),
                  beginCaptures: {
                    "1": { name: "entity.name.function.call.initializer.cpp" },
                    "2": {
                      name: "meta.template.call.cpp",
                      patterns: [
                        { include: "#template_call_range_helper" }
                      ]
                    },
                    "3": {},
                    "4": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "5": { name: "comment.block.cpp" },
                    "6": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "7": { name: "punctuation.section.arguments.begin.bracket.round.function.call.initializer.cpp" }
                  },
                  contentName: "meta.parameter.initialization",
                  end: /\)|(?=(?<!\\)\n)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.arguments.end.bracket.round.function.call.initializer.cpp" }
                  },
                  patterns: [
                    { include: "#evaluation_context" }
                  ]
                },
                {
                  begin: /((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))(\{)/dgv,
                  beginCaptures: {
                    "1": { name: "entity.name.function.call.initializer.cpp" },
                    "2": { name: "punctuation.section.arguments.begin.bracket.round.function.call.initializer.cpp" }
                  },
                  contentName: "meta.parameter.initialization",
                  end: /\}|(?=(?<!\\)\n)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.arguments.end.bracket.round.function.call.initializer.cpp" }
                  },
                  patterns: [
                    { include: "#evaluation_context" }
                  ]
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.delimiter.comma.cpp"
                },
                { include: "#comments" }
              ]
            },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.parameters.begin.bracket.round.special.constructor.cpp" }
              },
              contentName: "meta.function.definition.parameters.special.constructor",
              end: /\)|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.parameters.end.bracket.round.special.constructor.cpp" }
              },
              patterns: [
                { include: "#function_parameter_context" },
                { include: "#evaluation_context" }
              ]
            },
            { include: "#qualifiers_and_specifiers_post_parameters" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.function.definition.special.constructor.cpp" }
          },
          name: "meta.body.function.definition.special.constructor.cpp",
          patterns: [
            { include: "#function_body_context" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.function.definition.special.constructor.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    constructor_root: {
      begin: {
        A: [new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\14)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\20)|\\*+(?!/))*))\\19)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\24)|\\*+(?!/))*))\\23)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\27))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\28))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\29))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\30))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\31))*>)(?:(?=(\\p{space}*))\\32))?::)*))\\13))(((?:(?=((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))\\35))((?:(?:(?=(\\p{space}*))\\37)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\41)|\\*+(?!/))*))\\40)(\\*/))(?:(?=(\\p{space}*))\\43))+|(?:(?=(\\p{space}+))\\44)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))::((?:(?:(?=(\\p{space}*))\\46)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\50)|\\*+(?!/))*))\\49)(\\*/))(?:(?=(\\p{space}*))\\52))+|(?:(?=(\\p{space}+))\\53)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))\\34((?:(?:(?=(\\p{space}*))\\55)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\59)|\\*+(?!/))*))\\58)(\\*/))(?:(?=(\\p{space}*))\\61))+|(?:(?=(\\p{space}+))\\62)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=\\())", "dgv", { hiddenCaptures: [1, 4, 7, 8, 10, 11, 13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 35, 37, 40, 41, 43, 44, 46, 49, 50, 52, 53, 55, 58, 59, 61, 62] }), new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\14)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\20)|\\*+(?!/))*))\\19)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\24)|\\*+(?!/))*))\\23)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\27))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\28))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\29))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\30))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\31))*>)(?:(?=(\\p{space}*))\\32))?::)*))\\13))(((?:(?=((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))\\35))((?:(?:(?=(\\p{space}*))\\37)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\41)|\\*+(?!/))*))\\40)(\\*/))(?:(?=(\\p{space}*))\\43))+|(?:(?=(\\p{space}+))\\44)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))::((?:(?:(?=(\\p{space}*))\\46)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\50)|\\*+(?!/))*))\\49)(\\*/))(?:(?=(\\p{space}*))\\52))+|(?:(?=(\\p{space}+))\\53)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))\\34((?:(?:(?=(\\p{space}*))\\55)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\59)|\\*+(?!/))*))\\58)(\\*/))(?:(?=(\\p{space}*))\\61))+|(?:(?=(\\p{space}+))\\62)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=\\())", "dgv", { hiddenCaptures: [1, 4, 7, 8, 10, 11, 13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 35, 37, 40, 41, 43, 44, 46, 49, 50, 52, 53, 55, 58, 59, 61, 62] })]
      },
      beginCaptures: {
        "0": { name: "meta.head.function.definition.special.constructor.cpp" },
        "1": { name: "storage.type.modifier.calling-convention.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.constructor.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.constructor.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "7": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "8": {},
        "9": {
          patterns: [
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?=:)/dgv,
              name: "entity.name.type.constructor.cpp"
            },
            {
              match: /(?<=:)(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.function.definition.special.constructor.cpp"
            },
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.constructor.cpp"
            }
          ]
        },
        "10": {},
        "11": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "13": { name: "comment.block.cpp" },
        "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "15": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "16": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "17": { name: "comment.block.cpp" },
        "18": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "19": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "20": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "21": { name: "comment.block.cpp" },
        "22": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      end: /(?:(?<=\}|%>|\?\?>)|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.function.definition.special.constructor.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.function.definition.special.constructor.cpp" }
          },
          name: "meta.head.function.definition.special.constructor.cpp",
          patterns: [
            { include: "#ever_present_context" },
            {
              captures: {
                "1": { name: "keyword.operator.assignment.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "keyword.other.default.function.cpp keyword.other.default.constructor.cpp" },
                "7": { name: "keyword.other.delete.function.cpp keyword.other.delete.constructor.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            { include: "source.cpp#functional_specifiers_pre_parameters" },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "punctuation.separator.initializers.cpp" }
              },
              end: /(?=\{)|(?=(?<!\\)\n)/dgv,
              endCaptures: {},
              patterns: [
                {
                  begin: new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\12)|\\*+(?!/))*))\\11)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\29))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\30))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\31))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\32))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\33))*>)(?:(?=(\\p{space}*))\\34))?(\\()", "dgv", { hiddenCaptures: [6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34] }),
                  beginCaptures: {
                    "1": { name: "entity.name.function.call.initializer.cpp" },
                    "2": {
                      name: "meta.template.call.cpp",
                      patterns: [
                        { include: "#template_call_range_helper" }
                      ]
                    },
                    "3": {},
                    "4": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "5": { name: "comment.block.cpp" },
                    "6": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "7": { name: "punctuation.section.arguments.begin.bracket.round.function.call.initializer.cpp" }
                  },
                  contentName: "meta.parameter.initialization",
                  end: /\)|(?=(?<!\\)\n)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.arguments.end.bracket.round.function.call.initializer.cpp" }
                  },
                  patterns: [
                    { include: "#evaluation_context" }
                  ]
                },
                {
                  begin: /((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))(\{)/dgv,
                  beginCaptures: {
                    "1": { name: "entity.name.function.call.initializer.cpp" },
                    "2": { name: "punctuation.section.arguments.begin.bracket.round.function.call.initializer.cpp" }
                  },
                  contentName: "meta.parameter.initialization",
                  end: /\}|(?=(?<!\\)\n)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.arguments.end.bracket.round.function.call.initializer.cpp" }
                  },
                  patterns: [
                    { include: "#evaluation_context" }
                  ]
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.delimiter.comma.cpp"
                },
                { include: "#comments" }
              ]
            },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.parameters.begin.bracket.round.special.constructor.cpp" }
              },
              contentName: "meta.function.definition.parameters.special.constructor",
              end: /\)|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.parameters.end.bracket.round.special.constructor.cpp" }
              },
              patterns: [
                { include: "#function_parameter_context" },
                { include: "#evaluation_context" }
              ]
            },
            { include: "#qualifiers_and_specifiers_post_parameters" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.function.definition.special.constructor.cpp" }
          },
          name: "meta.body.function.definition.special.constructor.cpp",
          patterns: [
            { include: "#function_body_context" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.function.definition.special.constructor.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    cpp_attributes: {
      begin: /\[\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.attribute.begin.cpp" }
      },
      end: /\]\]|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.attribute.end.cpp" }
      },
      name: "support.other.attribute.cpp",
      patterns: [
        { include: "#attributes_context" },
        {
          begin: /\(/dgv,
          beginCaptures: {},
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          patterns: [
            { include: "#attributes_context" },
            { include: "#string_context" },
            { include: "#ever_present_context" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.other.using.directive.cpp" },
            "2": { name: "entity.name.namespace.cpp" }
          },
          match: /(using)\p{space}+((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))/dgv
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.attribute.cpp"
        },
        {
          match: /:/dgv,
          name: "punctuation.accessor.attribute.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])(?=::)/dgv,
          name: "entity.name.namespace.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "entity.other.attribute.$0.cpp"
        },
        { include: "source.cpp#number_literal" },
        { include: "#ever_present_context" }
      ]
    },
    curly_initializer: {
      begin: {
        A: [new EmulatedRegExp("((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\5)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)(\\*/))(?:(?=(\\p{space}*))\\11))+|(?:(?=(\\p{space}+))\\12)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\24)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\39)|\\*+(?!/))*))\\38)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\45))*>)(?:(?=(\\p{space}*))\\46))?::)*))\\23))((?:(?:(?=(\\p{space}*))\\48)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)(\\*/))(?:(?=(\\p{space}*))\\54))+|(?:(?=(\\p{space}+))\\55)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\66)|\\*+(?!/))*))\\65)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\73)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)(\\*/))(?:(?=(\\p{space}*))\\79))+|(?:(?=(\\p{space}+))\\80)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\{)", "dgv", { hiddenCaptures: [2, 5, 8, 9, 11, 12, 14, 17, 18, 20, 21, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 73, 76, 77, 79, 80], lazyCompile: true }), new EmulatedRegExp("((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\5)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)(\\*/))(?:(?=(\\p{space}*))\\11))+|(?:(?=(\\p{space}+))\\12)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\24)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\39)|\\*+(?!/))*))\\38)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\45))*>)(?:(?=(\\p{space}*))\\46))?::)*))\\23))((?:(?:(?=(\\p{space}*))\\48)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)(\\*/))(?:(?=(\\p{space}*))\\54))+|(?:(?=(\\p{space}+))\\55)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\66)|\\*+(?!/))*))\\65)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\73)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)(\\*/))(?:(?=(\\p{space}*))\\79))+|(?:(?=(\\p{space}+))\\80)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\{)", "dgv", { hiddenCaptures: [2, 5, 8, 9, 11, 12, 14, 17, 18, 20, 21, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 73, 76, 77, 79, 80], lazyCompile: true })]
      },
      beginCaptures: {
        "1": {
          name: "meta.qualified-type.cpp",
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "storage.type.$0.cpp"
            },
            { include: "#attributes_context" },
            { include: "#storage_types" },
            { include: "source.cpp#number_literal" },
            { include: "#string_context" },
            { include: "source.cpp#comma" },
            { include: "source.cpp#scope_resolution_inner_generated" },
            { include: "#template_call_range_helper" },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.type.cpp"
            }
          ]
        },
        "2": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "3": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "4": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "5": { name: "comment.block.cpp" },
        "6": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "7": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "9": { name: "comment.block.cpp" },
        "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "11": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.type.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "12": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "13": {},
        "14": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "15": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "16": { name: "comment.block.cpp" },
        "17": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "18": {},
        "19": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "20": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "21": { name: "comment.block.cpp" },
        "22": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "23": { name: "punctuation.section.arguments.begin.bracket.curly.initializer.cpp" }
      },
      end: /\}|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.curly.initializer.cpp" }
      },
      name: "meta.initialization.cpp",
      patterns: [
        {
          begin: /(\.)((?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.accessor.initializer.cpp variable.parameter.initializer.cpp" },
            "2": { name: "variable.parameter.initializer.cpp" }
          },
          end: /(?:(,)|(?=\}))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.delimiter.comma.cpp" }
          },
          name: "meta.initialization.parameter.cpp",
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        { include: "#evaluation_context" },
        { include: "source.cpp#comma" }
      ]
    },
    decltype: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])decltype(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])decltype(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.operator.functionlike.cpp keyword.other.decltype.cpp storage.type.decltype.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.decltype.cpp" }
      },
      contentName: "meta.arguments.decltype",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.decltype.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    decltype_specifier: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])decltype(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])decltype(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.operator.functionlike.cpp keyword.other.decltype.cpp storage.type.decltype.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.decltype.cpp" }
      },
      contentName: "meta.arguments.decltype",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.decltype.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    default_statement: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])default(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])default(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "keyword.control.default.cpp" }
      },
      end: /:|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.colon.case.default.cpp" }
      },
      name: "meta.conditional.case.cpp",
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    destructor_inline: {
      begin: {
        A: [new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*)(~(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=\\())", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] }), new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*)(~(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=\\())", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] })]
      },
      beginCaptures: {
        "0": { name: "meta.head.function.definition.special.member.destructor.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "storage.type.modifier.calling-convention.cpp" },
        "6": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "8": { name: "comment.block.cpp" },
        "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "10": {
          patterns: [
            { include: "source.cpp#functional_specifiers_pre_parameters" }
          ]
        },
        "11": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "13": { name: "comment.block.cpp" },
        "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "15": { name: "entity.name.function.destructor.cpp entity.name.function.definition.special.member.destructor.cpp" }
      },
      end: /(?:(?<=\}|%>|\?\?>)|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.function.definition.special.member.destructor.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.function.definition.special.member.destructor.cpp" }
          },
          name: "meta.head.function.definition.special.member.destructor.cpp",
          patterns: [
            { include: "#ever_present_context" },
            {
              captures: {
                "1": { name: "keyword.operator.assignment.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "keyword.other.default.function.cpp keyword.other.default.constructor.cpp keyword.other.default.destructor.cpp" },
                "7": { name: "keyword.other.delete.function.cpp keyword.other.delete.constructor.cpp keyword.other.delete.destructor.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.parameters.begin.bracket.round.special.member.destructor.cpp" }
              },
              contentName: "meta.function.definition.parameters.special.member.destructor",
              end: /\)|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.parameters.end.bracket.round.special.member.destructor.cpp" }
              },
              patterns: []
            },
            { include: "#qualifiers_and_specifiers_post_parameters" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.function.definition.special.member.destructor.cpp" }
          },
          name: "meta.body.function.definition.special.member.destructor.cpp",
          patterns: [
            { include: "#function_body_context" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.function.definition.special.member.destructor.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    destructor_root: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\22)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\30)|\\*+(?!/))*))\\29)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\34)|\\*+(?!/))*))\\33)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\35))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\36))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\37))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\38))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)(?:(?=(\\p{space}*))\\40))?::)*))\\21))(((?:(?=((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))\\43))((?:(?:(?=(\\p{space}*))\\45)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\49)|\\*+(?!/))*))\\48)(\\*/))(?:(?=(\\p{space}*))\\51))+|(?:(?=(\\p{space}+))\\52)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))::((?:(?:(?=(\\p{space}*))\\54)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)(\\*/))(?:(?=(\\p{space}*))\\60))+|(?:(?=(\\p{space}+))\\61)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))~\\42((?:(?:(?=(\\p{space}*))\\63)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)(\\*/))(?:(?=(\\p{space}*))\\69))+|(?:(?=(\\p{space}+))\\70)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=\\())", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 21, 22, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 45, 48, 49, 51, 52, 54, 57, 58, 60, 61, 63, 66, 67, 69, 70], lazyCompile: true }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\22)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\30)|\\*+(?!/))*))\\29)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\34)|\\*+(?!/))*))\\33)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\35))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\36))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\37))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\38))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)(?:(?=(\\p{space}*))\\40))?::)*))\\21))(((?:(?=((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))\\43))((?:(?:(?=(\\p{space}*))\\45)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\49)|\\*+(?!/))*))\\48)(\\*/))(?:(?=(\\p{space}*))\\51))+|(?:(?=(\\p{space}+))\\52)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))::((?:(?:(?=(\\p{space}*))\\54)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)(\\*/))(?:(?=(\\p{space}*))\\60))+|(?:(?=(\\p{space}+))\\61)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))~\\42((?:(?:(?=(\\p{space}*))\\63)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)(\\*/))(?:(?=(\\p{space}*))\\69))+|(?:(?=(\\p{space}+))\\70)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=\\())", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 21, 22, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 45, 48, 49, 51, 52, 54, 57, 58, 60, 61, 63, 66, 67, 69, 70], lazyCompile: true })]
      },
      beginCaptures: {
        "0": { name: "meta.head.function.definition.special.member.destructor.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "storage.type.modifier.calling-convention.cpp" },
        "6": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "8": { name: "comment.block.cpp" },
        "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "10": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.destructor.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.destructor.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "11": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "12": {},
        "13": {
          patterns: [
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?=:)/dgv,
              name: "entity.name.type.destructor.cpp"
            },
            {
              match: /(?<=:)~(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.function.definition.special.member.destructor.cpp"
            },
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.destructor.cpp"
            }
          ]
        },
        "14": {},
        "15": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "16": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "17": { name: "comment.block.cpp" },
        "18": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "19": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "20": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "21": { name: "comment.block.cpp" },
        "22": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "23": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "24": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "25": { name: "comment.block.cpp" },
        "26": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      end: /(?:(?<=\}|%>|\?\?>)|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.function.definition.special.member.destructor.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.function.definition.special.member.destructor.cpp" }
          },
          name: "meta.head.function.definition.special.member.destructor.cpp",
          patterns: [
            { include: "#ever_present_context" },
            {
              captures: {
                "1": { name: "keyword.operator.assignment.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "keyword.other.default.function.cpp keyword.other.default.constructor.cpp keyword.other.default.destructor.cpp" },
                "7": { name: "keyword.other.delete.function.cpp keyword.other.delete.constructor.cpp keyword.other.delete.destructor.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.parameters.begin.bracket.round.special.member.destructor.cpp" }
              },
              contentName: "meta.function.definition.parameters.special.member.destructor",
              end: /\)|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.parameters.end.bracket.round.special.member.destructor.cpp" }
              },
              patterns: []
            },
            { include: "#qualifiers_and_specifiers_post_parameters" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.function.definition.special.member.destructor.cpp" }
          },
          name: "meta.body.function.definition.special.member.destructor.cpp",
          patterns: [
            { include: "#function_body_context" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.function.definition.special.member.destructor.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    diagnostic: {
      begin: {
        A: [new EmulatedRegExp("^(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(#)(?:\\p{space}+)?(error|warning))\\b(?:\\p{space}+)?", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("^(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(#)(?:\\p{space}+)?(error|warning))\\b(?:\\p{space}+)?", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.control.directive.diagnostic.$7.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.definition.directive.cpp" },
        "7": {}
      },
      end: /(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$)))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.preprocessor.diagnostic.$reference(directive).cpp",
      patterns: [
        { include: "#comments" },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.cpp" }
          },
          end: /(?:(")|(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$))))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.cpp" }
          },
          name: "string.quoted.double.cpp",
          patterns: [
            { include: "source.cpp#line_continuation_character" }
          ]
        },
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.cpp" }
          },
          end: /(?:(')|(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$))))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.cpp" }
          },
          name: "string.quoted.single.cpp",
          patterns: [
            { include: "source.cpp#line_continuation_character" }
          ]
        },
        {
          begin: /[^"']/dgv,
          beginCaptures: {},
          end: /(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$)))|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "string.unquoted.cpp",
          patterns: [
            { include: "source.cpp#line_continuation_character" },
            { include: "#comments" }
          ]
        }
      ]
    },
    enum_block: {
      begin: new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])enum(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))(?:\\p{space}+(class|struct))?(?:(?:\\p{space}+|((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\))))|(?=\\{))(?:\\p{space}+)?((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))?)(?:(?:\\p{space}+)?(:)(?:\\p{space}+)?(?:((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\8)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\12)|\\*+(?!/))*))\\11)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)(?:(?=(\\p{space}*))\\45))?::)*(?:(?=(\\p{space}*))\\46))((?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))(?:(?=(\\p{space}*))\\48)(((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\59)|\\*+(?!/))*))\\58)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\69)|\\*+(?!/))*))\\68)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\74)|\\*+(?!/))*))\\73)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\76))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\77))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\78))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)(?:(?=(\\p{space}*))\\81))?(::))?(?:\\p{space}+)?((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))?", "dgv", { hiddenCaptures: [8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 53, 54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81], lazyCompile: true }),
      beginCaptures: {
        "0": { name: "meta.head.enum.cpp" },
        "1": { name: "storage.type.enum.cpp" },
        "2": { name: "storage.type.enum.enum-key.$2.cpp" },
        "3": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "4": { name: "entity.name.type.enum.cpp" },
        "5": { name: "punctuation.separator.colon.type-specifier.cpp" },
        "6": {
          patterns: [
            { include: "source.cpp#scope_resolution_inner_generated" }
          ]
        },
        "7": { name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp" },
        "8": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "9": {},
        "10": { name: "entity.name.scope-resolution.cpp" },
        "11": {
          name: "meta.template.call.cpp",
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "12": {},
        "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "14": { name: "comment.block.cpp" },
        "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "16": { name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp" },
        "17": { name: "storage.type.integral.$17.cpp" }
      },
      end: /(?:(?:(?<=\}|%>|\?\?>)(?:\p{space}+)?(;)|(;))|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.statement.cpp" },
        "2": { name: "punctuation.terminator.statement.cpp" }
      },
      name: "meta.block.enum.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.enum.cpp" }
          },
          name: "meta.head.enum.cpp",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.enum.cpp" }
          },
          name: "meta.body.enum.cpp",
          patterns: [
            { include: "#ever_present_context" },
            { include: "source.cpp#enumerator_list" },
            { include: "#comments" },
            { include: "source.cpp#comma" },
            { include: "source.cpp#semicolon" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.enum.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    evaluation_context: {
      patterns: [
        { include: "#ever_present_context" },
        { include: "#string_context" },
        { include: "source.cpp#number_literal" },
        { include: "#method_access" },
        { include: "source.cpp#member_access" },
        { include: "source.cpp#predefined_macros" },
        { include: "#operators" },
        { include: "source.cpp#memory_operators" },
        { include: "source.cpp#wordlike_operators" },
        { include: "source.cpp#type_casting_operators" },
        { include: "source.cpp#control_flow_keywords" },
        { include: "source.cpp#exception_keywords" },
        { include: "source.cpp#the_this_keyword" },
        { include: "source.cpp#language_constants" },
        { include: "source.cpp#constructor_bracket_call" },
        { include: "source.cpp#simple_constructor_call" },
        { include: "source.cpp#simple_array_assignment" },
        { include: "#builtin_storage_type_initilizer" },
        { include: "#qualifiers_and_specifiers_post_parameters" },
        { include: "source.cpp#functional_specifiers_pre_parameters" },
        { include: "#storage_types" },
        { include: "#lambdas" },
        { include: "#attributes_context" },
        { include: "#parentheses" },
        { include: "#function_call" },
        { include: "source.cpp#scope_resolution_inner_generated" },
        { include: "#square_brackets" },
        { include: "source.cpp#semicolon" },
        { include: "source.cpp#comma" },
        { include: "source.cpp#unknown_variable" }
      ]
    },
    ever_present_context: {
      patterns: [
        { include: "source.cpp#pragma_mark" },
        { include: "#pragma" },
        { include: "source.cpp#include" },
        { include: "#line" },
        { include: "#diagnostic" },
        { include: "source.cpp#undef" },
        { include: "#preprocessor_conditional_range" },
        { include: "#macro" },
        { include: "source.cpp#preprocessor_conditional_standalone" },
        { include: "source.cpp#macro_argument" },
        { include: "#comments" },
        { include: "source.cpp#line_continuation_character" }
      ]
    },
    extern_block: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(extern)(?=\\p{space}*\")", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(extern)(?=\\p{space}*\")", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "0": { name: "meta.head.extern.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "storage.type.extern.cpp" }
      },
      end: /(?:(?:(?<=\}|%>|\?\?>)(?:\p{space}+)?(;)|(;))|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.statement.cpp" },
        "2": { name: "punctuation.terminator.statement.cpp" }
      },
      name: "meta.block.extern.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.extern.cpp" }
          },
          name: "meta.head.extern.cpp",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.extern.cpp" }
          },
          name: "meta.body.extern.cpp",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.extern.cpp",
          patterns: [
            { include: "$self" }
          ]
        },
        { include: "$self" }
      ]
    },
    function_body_context: {
      patterns: [
        { include: "#ever_present_context" },
        { include: "source.cpp#simple_array_assignment" },
        { include: "#using_namespace" },
        { include: "source.cpp#type_alias" },
        { include: "source.cpp#using_name" },
        { include: "source.cpp#namespace_alias" },
        { include: "#typedef_class" },
        { include: "#typedef_struct" },
        { include: "#typedef_union" },
        { include: "source.cpp#misc_keywords" },
        { include: "source.cpp#standard_declares" },
        { include: "#class_block" },
        { include: "#struct_block" },
        { include: "#union_block" },
        { include: "#enum_block" },
        { include: "source.cpp#access_control_keywords" },
        { include: "#block" },
        { include: "#static_assert" },
        { include: "#assembly" },
        { include: "#function_pointer" },
        { include: "source.cpp#over_qualified_types" },
        { include: "#normal_variable_assignment" },
        { include: "#normal_variable_declaration" },
        { include: "#switch_statement" },
        { include: "source.cpp#goto_statement" },
        { include: "#evaluation_context" },
        { include: "source.cpp#label" }
      ]
    },
    function_call: {
      patterns: [
        {
          begin: {
            A: [new EmulatedRegExp("((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\3)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\12)|\\*+(?!/))*))\\11)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\34))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\35))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\36))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\37))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\38))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)(?:(?=(\\p{space}*))\\40))?::)*(?:(?=(\\p{space}*))\\41))([A-Z][0-9A-Z_]*)\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:reinterpret_cast|atomic_noexcept|uint_least16_t|uint_least32_t|uint_least64_t|atomic_cancel|atomic_commit|uint_least8_t|uint_fast16_t|uint_fast32_t|int_least16_t|int_least32_t|int_least64_t|uint_fast64_t|thread_local|int_fast16_t|int_fast32_t|int_fast64_t|synchronized|uint_fast8_t|dynamic_cast|int_least8_t|int_fast8_t|static_cast|suseconds_t|const_cast|useconds_t|constinit|co_return|uintmax_t|constexpr|consteval|constexpr|consteval|protected|namespace|blksize_t|co_return|in_addr_t|in_port_t|uintptr_t|template|noexcept|continue|co_await|co_yield|unsigned|u_quad_t|blkcnt_t|uint16_t|uint32_t|uint64_t|intptr_t|intmax_t|volatile|register|restrict|explicit|volatile|noexcept|operator|decltype|typename|requires|co_await|co_yield|reflexpr|swblk_t|virtual|ssize_t|concept|mutable|fixpt_t|int16_t|int32_t|int64_t|uint8_t|typedef|daddr_t|caddr_t|qaddr_t|default|nlink_t|segsz_t|u_short|wchar_t|private|__asm__|alignas|alignof|mutable|nullptr|clock_t|mode_t|public|size_t|double|quad_t|static|time_t|module|import|export|extern|inline|xor_eq|and_eq|return|friend|not_eq|signed|struct|int8_t|ushort|switch|u_long|typeid|u_char|sizeof|bitand|delete|ino_t|key_t|pid_t|off_t|uid_t|short|break|catch|compl|while|false|class|union|const|or_eq|const|throw|bitor|u_int|using|div_t|dev_t|gid_t|float|long|goto|uint|id_t|case|auto|void|enum|true|char|id_t|NULL|this|bool|else|for|new|not|xor|and|asm|int|try|do|if|or))((?:(?:(?=(\\p{space}*))\\44)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\48)|\\*+(?!/))*))\\47)(\\*/))(?:(?=(\\p{space}*))\\50))+|(?:(?=(\\p{space}+))\\51)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\57)|\\*+(?!/))*))\\56)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\72)|\\*+(?!/))*))\\71)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\81))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\82))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\83))*>)(?:(?=(\\p{space}*))\\84))?(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 44, 47, 48, 50, 51, 56, 57, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84], lazyCompile: true }), new EmulatedRegExp("((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\3)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\12)|\\*+(?!/))*))\\11)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\34))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\35))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\36))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\37))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\38))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)(?:(?=(\\p{space}*))\\40))?::)*(?:(?=(\\p{space}*))\\41))([A-Z][0-9A-Z_]*)\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:reinterpret_cast|atomic_noexcept|uint_least16_t|uint_least32_t|uint_least64_t|atomic_cancel|atomic_commit|uint_least8_t|uint_fast16_t|uint_fast32_t|int_least16_t|int_least32_t|int_least64_t|uint_fast64_t|thread_local|int_fast16_t|int_fast32_t|int_fast64_t|synchronized|uint_fast8_t|dynamic_cast|int_least8_t|int_fast8_t|static_cast|suseconds_t|const_cast|useconds_t|constinit|co_return|uintmax_t|constexpr|consteval|constexpr|consteval|protected|namespace|blksize_t|co_return|in_addr_t|in_port_t|uintptr_t|template|noexcept|continue|co_await|co_yield|unsigned|u_quad_t|blkcnt_t|uint16_t|uint32_t|uint64_t|intptr_t|intmax_t|volatile|register|restrict|explicit|volatile|noexcept|operator|decltype|typename|requires|co_await|co_yield|reflexpr|swblk_t|virtual|ssize_t|concept|mutable|fixpt_t|int16_t|int32_t|int64_t|uint8_t|typedef|daddr_t|caddr_t|qaddr_t|default|nlink_t|segsz_t|u_short|wchar_t|private|__asm__|alignas|alignof|mutable|nullptr|clock_t|mode_t|public|size_t|double|quad_t|static|time_t|module|import|export|extern|inline|xor_eq|and_eq|return|friend|not_eq|signed|struct|int8_t|ushort|switch|u_long|typeid|u_char|sizeof|bitand|delete|ino_t|key_t|pid_t|off_t|uid_t|short|break|catch|compl|while|false|class|union|const|or_eq|const|throw|bitor|u_int|using|div_t|dev_t|gid_t|float|long|goto|uint|id_t|case|auto|void|enum|true|char|id_t|NULL|this|bool|else|for|new|not|xor|and|asm|int|try|do|if|or))((?:(?:(?=(\\p{space}*))\\44)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\48)|\\*+(?!/))*))\\47)(\\*/))(?:(?=(\\p{space}*))\\50))+|(?:(?=(\\p{space}+))\\51)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\57)|\\*+(?!/))*))\\56)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\72)|\\*+(?!/))*))\\71)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\81))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\82))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\83))*>)(?:(?=(\\p{space}*))\\84))?(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 44, 47, 48, 50, 51, 56, 57, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84], lazyCompile: true })]
          },
          beginCaptures: {
            "1": {
              patterns: [
                { include: "source.cpp#scope_resolution_function_call_inner_generated" }
              ]
            },
            "2": { name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.function.call.cpp" },
            "3": {
              patterns: [
                { include: "#template_call_range_helper" }
              ]
            },
            "4": {},
            "5": { name: "entity.name.function.call.upper-case.cpp entity.name.function.call.cpp" },
            "6": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "8": { name: "comment.block.cpp" },
            "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "10": {
              name: "meta.template.call.cpp",
              patterns: [
                { include: "#template_call_range_helper" }
              ]
            },
            "11": {},
            "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "13": { name: "comment.block.cpp" },
            "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "15": { name: "punctuation.section.arguments.begin.bracket.round.function.call.cpp punctuation.section.arguments.begin.bracket.round.function.call.upper-case.cpp" }
          },
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.function.call.cpp punctuation.section.arguments.begin.bracket.round.function.call.upper-case.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          begin: {
            A: [new EmulatedRegExp("((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\3)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\12)|\\*+(?!/))*))\\11)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\34))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\35))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\36))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\37))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\38))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)(?:(?=(\\p{space}*))\\40))?::)*(?:(?=(\\p{space}*))\\41))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:reinterpret_cast|atomic_noexcept|uint_least16_t|uint_least32_t|uint_least64_t|atomic_cancel|atomic_commit|uint_least8_t|uint_fast16_t|uint_fast32_t|int_least16_t|int_least32_t|int_least64_t|uint_fast64_t|thread_local|int_fast16_t|int_fast32_t|int_fast64_t|synchronized|uint_fast8_t|dynamic_cast|int_least8_t|int_fast8_t|static_cast|suseconds_t|const_cast|useconds_t|constinit|co_return|uintmax_t|constexpr|consteval|constexpr|consteval|protected|namespace|blksize_t|co_return|in_addr_t|in_port_t|uintptr_t|template|noexcept|continue|co_await|co_yield|unsigned|u_quad_t|blkcnt_t|uint16_t|uint32_t|uint64_t|intptr_t|intmax_t|volatile|register|restrict|explicit|volatile|noexcept|operator|decltype|typename|requires|co_await|co_yield|reflexpr|swblk_t|virtual|ssize_t|concept|mutable|fixpt_t|int16_t|int32_t|int64_t|uint8_t|typedef|daddr_t|caddr_t|qaddr_t|default|nlink_t|segsz_t|u_short|wchar_t|private|__asm__|alignas|alignof|mutable|nullptr|clock_t|mode_t|public|size_t|double|quad_t|static|time_t|module|import|export|extern|inline|xor_eq|and_eq|return|friend|not_eq|signed|struct|int8_t|ushort|switch|u_long|typeid|u_char|sizeof|bitand|delete|ino_t|key_t|pid_t|off_t|uid_t|short|break|catch|compl|while|false|class|union|const|or_eq|const|throw|bitor|u_int|using|div_t|dev_t|gid_t|float|long|goto|uint|id_t|case|auto|void|enum|true|char|id_t|NULL|this|bool|else|for|new|not|xor|and|asm|int|try|do|if|or))((?:(?:(?=(\\p{space}*))\\44)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\48)|\\*+(?!/))*))\\47)(\\*/))(?:(?=(\\p{space}*))\\50))+|(?:(?=(\\p{space}+))\\51)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\57)|\\*+(?!/))*))\\56)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\72)|\\*+(?!/))*))\\71)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\81))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\82))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\83))*>)(?:(?=(\\p{space}*))\\84))?(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 44, 47, 48, 50, 51, 56, 57, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84], lazyCompile: true }), new EmulatedRegExp("((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\3)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\12)|\\*+(?!/))*))\\11)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\22)|\\*+(?!/))*))\\21)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\34))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\35))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\36))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\37))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\38))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)(?:(?=(\\p{space}*))\\40))?::)*(?:(?=(\\p{space}*))\\41))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:reinterpret_cast|atomic_noexcept|uint_least16_t|uint_least32_t|uint_least64_t|atomic_cancel|atomic_commit|uint_least8_t|uint_fast16_t|uint_fast32_t|int_least16_t|int_least32_t|int_least64_t|uint_fast64_t|thread_local|int_fast16_t|int_fast32_t|int_fast64_t|synchronized|uint_fast8_t|dynamic_cast|int_least8_t|int_fast8_t|static_cast|suseconds_t|const_cast|useconds_t|constinit|co_return|uintmax_t|constexpr|consteval|constexpr|consteval|protected|namespace|blksize_t|co_return|in_addr_t|in_port_t|uintptr_t|template|noexcept|continue|co_await|co_yield|unsigned|u_quad_t|blkcnt_t|uint16_t|uint32_t|uint64_t|intptr_t|intmax_t|volatile|register|restrict|explicit|volatile|noexcept|operator|decltype|typename|requires|co_await|co_yield|reflexpr|swblk_t|virtual|ssize_t|concept|mutable|fixpt_t|int16_t|int32_t|int64_t|uint8_t|typedef|daddr_t|caddr_t|qaddr_t|default|nlink_t|segsz_t|u_short|wchar_t|private|__asm__|alignas|alignof|mutable|nullptr|clock_t|mode_t|public|size_t|double|quad_t|static|time_t|module|import|export|extern|inline|xor_eq|and_eq|return|friend|not_eq|signed|struct|int8_t|ushort|switch|u_long|typeid|u_char|sizeof|bitand|delete|ino_t|key_t|pid_t|off_t|uid_t|short|break|catch|compl|while|false|class|union|const|or_eq|const|throw|bitor|u_int|using|div_t|dev_t|gid_t|float|long|goto|uint|id_t|case|auto|void|enum|true|char|id_t|NULL|this|bool|else|for|new|not|xor|and|asm|int|try|do|if|or))((?:(?:(?=(\\p{space}*))\\44)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\48)|\\*+(?!/))*))\\47)(\\*/))(?:(?=(\\p{space}*))\\50))+|(?:(?=(\\p{space}+))\\51)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(((?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\57)|\\*+(?!/))*))\\56)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\72)|\\*+(?!/))*))\\71)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)(\\*/))|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\81))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\82))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\83))*>)(?:(?=(\\p{space}*))\\84))?(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 44, 47, 48, 50, 51, 56, 57, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84], lazyCompile: true })]
          },
          beginCaptures: {
            "1": {
              patterns: [
                { include: "source.cpp#scope_resolution_function_call_inner_generated" }
              ]
            },
            "2": { name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.function.call.cpp" },
            "3": {
              patterns: [
                { include: "#template_call_range_helper" }
              ]
            },
            "4": {},
            "5": { name: "entity.name.function.call.cpp" },
            "6": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "8": { name: "comment.block.cpp" },
            "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "10": {
              name: "meta.template.call.cpp",
              patterns: [
                { include: "#template_call_range_helper" }
              ]
            },
            "11": {},
            "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "13": { name: "comment.block.cpp" },
            "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "15": { name: "punctuation.section.arguments.begin.bracket.round.function.call.cpp" }
          },
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.function.call.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        }
      ]
    },
    function_definition: {
      begin: {
        AG: [new EmulatedRegExp("(?:(?:^|￿|(?<=[\\;\\}]))|(?<=>|\\*/))(?:(?=(\\p{space}*))\\1)(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])template(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)|(?:thread_local|volatile|register|restrict|static|extern|const))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\16)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\20)|\\*+(?!/))*))\\19)(\\*/))(?:(?=(\\p{space}*))\\22))+|(?:(?=(\\p{space}+))\\23)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*)((?:(?=(\\p{space}*))\\25)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\28)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))(?:(?=(\\p{space}*))\\34))+|(?:(?=(\\p{space}+))\\35)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\37)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\41)|\\*+(?!/))*))\\40)(\\*/))(?:(?=(\\p{space}*))\\43))+|(?:(?=(\\p{space}+))\\44)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\47)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\51)|\\*+(?!/))*))\\50)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\65))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\66))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)(?:(?=(\\p{space}*))\\69))?::)*))\\46))((?:(?:(?=(\\p{space}*))\\71)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\75)|\\*+(?!/))*))\\74)(\\*/))(?:(?=(\\p{space}*))\\77))+|(?:(?=(\\p{space}+))\\78)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\81)|\\*+(?!/))*))\\80)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\84)|\\*+(?!/))*))\\83)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\86)|\\*+(?!/))*))\\85)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\88)|\\*+(?!/))*))\\87)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\90)|\\*+(?!/))*))\\89)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\92)|\\*+(?!/))*))\\91)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\93))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\94))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\95))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\96))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\97))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\98))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\101)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\105)|\\*+(?!/))*))\\104)(\\*/))(?:(?=(\\p{space}*))\\107))+|(?:(?=(\\p{space}+))\\108)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\110)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\114)|\\*+(?!/))*))\\113)(\\*/))(?:(?=(\\p{space}*))\\116))+|(?:(?=(\\p{space}+))\\117)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\119)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\123)|\\*+(?!/))*))\\122)(\\*/))(?:(?=(\\p{space}*))\\125))+|(?:(?=(\\p{space}+))\\126)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\129)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\133)|\\*+(?!/))*))\\132)(\\*/))(?:(?=(\\p{space}*))\\135))+|(?:(?=(\\p{space}+))\\136)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\139)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\143)|\\*+(?!/))*))\\142)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\145)|\\*+(?!/))*))\\144)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\147)|\\*+(?!/))*))\\146)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\149)|\\*+(?!/))*))\\148)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\151)|\\*+(?!/))*))\\150)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\152))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\153))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\154))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\155))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\156))*>)(?:(?=(\\p{space}*))\\157))?::)*(?:(?=(\\p{space}*))\\158))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:reinterpret_cast|atomic_noexcept|uint_least16_t|uint_least32_t|uint_least64_t|atomic_cancel|atomic_commit|uint_least8_t|uint_fast16_t|uint_fast32_t|int_least16_t|int_least32_t|int_least64_t|uint_fast64_t|thread_local|int_fast16_t|int_fast32_t|int_fast64_t|synchronized|uint_fast8_t|dynamic_cast|int_least8_t|int_fast8_t|static_cast|suseconds_t|const_cast|useconds_t|constinit|co_return|uintmax_t|constexpr|consteval|constexpr|consteval|protected|namespace|blksize_t|co_return|in_addr_t|in_port_t|uintptr_t|template|noexcept|continue|co_await|co_yield|unsigned|u_quad_t|blkcnt_t|uint16_t|uint32_t|uint64_t|intptr_t|intmax_t|volatile|register|restrict|explicit|volatile|noexcept|operator|decltype|typename|requires|co_await|co_yield|reflexpr|swblk_t|virtual|ssize_t|concept|mutable|fixpt_t|int16_t|int32_t|int64_t|uint8_t|typedef|daddr_t|caddr_t|qaddr_t|default|nlink_t|segsz_t|u_short|wchar_t|private|__asm__|alignas|alignof|mutable|nullptr|clock_t|mode_t|public|size_t|double|quad_t|static|time_t|module|import|export|extern|inline|xor_eq|and_eq|return|friend|not_eq|signed|struct|int8_t|ushort|switch|u_long|typeid|u_char|sizeof|bitand|delete|ino_t|key_t|pid_t|off_t|uid_t|short|break|catch|compl|while|false|class|union|const|or_eq|const|throw|bitor|u_int|using|div_t|dev_t|gid_t|float|long|goto|uint|id_t|case|auto|void|enum|true|char|id_t|NULL|this|bool|else|for|new|not|xor|and|asm|int|try|do|if|or))((?:(?:(?=(\\p{space}*))\\161)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\165)|\\*+(?!/))*))\\164)(\\*/))(?:(?=(\\p{space}*))\\167))+|(?:(?=(\\p{space}+))\\168)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=\\()", "dgv", { hiddenCaptures: [1, 4, 7, 8, 10, 11, 16, 19, 20, 22, 23, 25, 28, 31, 32, 34, 35, 37, 40, 41, 43, 44, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 74, 75, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 101, 104, 105, 107, 108, 110, 113, 114, 116, 117, 119, 122, 123, 125, 126, 129, 132, 133, 135, 136, 139, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 161, 164, 165, 167, 168], lazyCompile: true }), new EmulatedRegExp("(?:(?:^|^|(?<=[\\;\\}]))|(?<=>|\\*/))(?:(?=(\\p{space}*))\\1)(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])template(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)|(?:thread_local|volatile|register|restrict|static|extern|const))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\16)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\20)|\\*+(?!/))*))\\19)(\\*/))(?:(?=(\\p{space}*))\\22))+|(?:(?=(\\p{space}+))\\23)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*)((?:(?=(\\p{space}*))\\25)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\28)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))(?:(?=(\\p{space}*))\\34))+|(?:(?=(\\p{space}+))\\35)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\37)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\41)|\\*+(?!/))*))\\40)(\\*/))(?:(?=(\\p{space}*))\\43))+|(?:(?=(\\p{space}+))\\44)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\47)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\51)|\\*+(?!/))*))\\50)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\65))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\66))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)(?:(?=(\\p{space}*))\\69))?::)*))\\46))((?:(?:(?=(\\p{space}*))\\71)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\75)|\\*+(?!/))*))\\74)(\\*/))(?:(?=(\\p{space}*))\\77))+|(?:(?=(\\p{space}+))\\78)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\81)|\\*+(?!/))*))\\80)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\84)|\\*+(?!/))*))\\83)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\86)|\\*+(?!/))*))\\85)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\88)|\\*+(?!/))*))\\87)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\90)|\\*+(?!/))*))\\89)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\92)|\\*+(?!/))*))\\91)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\93))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\94))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\95))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\96))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\97))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\98))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\101)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\105)|\\*+(?!/))*))\\104)(\\*/))(?:(?=(\\p{space}*))\\107))+|(?:(?=(\\p{space}+))\\108)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\110)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\114)|\\*+(?!/))*))\\113)(\\*/))(?:(?=(\\p{space}*))\\116))+|(?:(?=(\\p{space}+))\\117)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\119)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\123)|\\*+(?!/))*))\\122)(\\*/))(?:(?=(\\p{space}*))\\125))+|(?:(?=(\\p{space}+))\\126)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\129)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\133)|\\*+(?!/))*))\\132)(\\*/))(?:(?=(\\p{space}*))\\135))+|(?:(?=(\\p{space}+))\\136)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\139)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\143)|\\*+(?!/))*))\\142)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\145)|\\*+(?!/))*))\\144)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\147)|\\*+(?!/))*))\\146)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\149)|\\*+(?!/))*))\\148)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\151)|\\*+(?!/))*))\\150)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\152))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\153))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\154))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\155))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\156))*>)(?:(?=(\\p{space}*))\\157))?::)*(?:(?=(\\p{space}*))\\158))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:reinterpret_cast|atomic_noexcept|uint_least16_t|uint_least32_t|uint_least64_t|atomic_cancel|atomic_commit|uint_least8_t|uint_fast16_t|uint_fast32_t|int_least16_t|int_least32_t|int_least64_t|uint_fast64_t|thread_local|int_fast16_t|int_fast32_t|int_fast64_t|synchronized|uint_fast8_t|dynamic_cast|int_least8_t|int_fast8_t|static_cast|suseconds_t|const_cast|useconds_t|constinit|co_return|uintmax_t|constexpr|consteval|constexpr|consteval|protected|namespace|blksize_t|co_return|in_addr_t|in_port_t|uintptr_t|template|noexcept|continue|co_await|co_yield|unsigned|u_quad_t|blkcnt_t|uint16_t|uint32_t|uint64_t|intptr_t|intmax_t|volatile|register|restrict|explicit|volatile|noexcept|operator|decltype|typename|requires|co_await|co_yield|reflexpr|swblk_t|virtual|ssize_t|concept|mutable|fixpt_t|int16_t|int32_t|int64_t|uint8_t|typedef|daddr_t|caddr_t|qaddr_t|default|nlink_t|segsz_t|u_short|wchar_t|private|__asm__|alignas|alignof|mutable|nullptr|clock_t|mode_t|public|size_t|double|quad_t|static|time_t|module|import|export|extern|inline|xor_eq|and_eq|return|friend|not_eq|signed|struct|int8_t|ushort|switch|u_long|typeid|u_char|sizeof|bitand|delete|ino_t|key_t|pid_t|off_t|uid_t|short|break|catch|compl|while|false|class|union|const|or_eq|const|throw|bitor|u_int|using|div_t|dev_t|gid_t|float|long|goto|uint|id_t|case|auto|void|enum|true|char|id_t|NULL|this|bool|else|for|new|not|xor|and|asm|int|try|do|if|or))((?:(?:(?=(\\p{space}*))\\161)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\165)|\\*+(?!/))*))\\164)(\\*/))(?:(?=(\\p{space}*))\\167))+|(?:(?=(\\p{space}+))\\168)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=\\()", "dgv", { hiddenCaptures: [1, 4, 7, 8, 10, 11, 16, 19, 20, 22, 23, 25, 28, 31, 32, 34, 35, 37, 40, 41, 43, 44, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 74, 75, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 101, 104, 105, 107, 108, 110, 113, 114, 116, 117, 119, 122, 123, 125, 126, 129, 132, 133, 135, 136, 139, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 161, 164, 165, 167, 168], strategy: "clip_search", lazyCompile: true }), new EmulatedRegExp("(?:(?:^|￿|(?<=[\\;\\}]))|(?<=>|\\*/))(?:(?=(\\p{space}*))\\1)(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])template(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)|(?:thread_local|volatile|register|restrict|static|extern|const))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\16)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\20)|\\*+(?!/))*))\\19)(\\*/))(?:(?=(\\p{space}*))\\22))+|(?:(?=(\\p{space}+))\\23)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*)((?:(?=(\\p{space}*))\\25)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\28)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))(?:(?=(\\p{space}*))\\34))+|(?:(?=(\\p{space}+))\\35)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\37)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\41)|\\*+(?!/))*))\\40)(\\*/))(?:(?=(\\p{space}*))\\43))+|(?:(?=(\\p{space}+))\\44)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\47)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\51)|\\*+(?!/))*))\\50)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\65))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\66))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)(?:(?=(\\p{space}*))\\69))?::)*))\\46))((?:(?:(?=(\\p{space}*))\\71)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\75)|\\*+(?!/))*))\\74)(\\*/))(?:(?=(\\p{space}*))\\77))+|(?:(?=(\\p{space}+))\\78)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\81)|\\*+(?!/))*))\\80)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\84)|\\*+(?!/))*))\\83)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\86)|\\*+(?!/))*))\\85)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\88)|\\*+(?!/))*))\\87)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\90)|\\*+(?!/))*))\\89)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\92)|\\*+(?!/))*))\\91)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\93))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\94))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\95))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\96))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\97))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\98))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\101)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\105)|\\*+(?!/))*))\\104)(\\*/))(?:(?=(\\p{space}*))\\107))+|(?:(?=(\\p{space}+))\\108)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\110)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\114)|\\*+(?!/))*))\\113)(\\*/))(?:(?=(\\p{space}*))\\116))+|(?:(?=(\\p{space}+))\\117)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\119)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\123)|\\*+(?!/))*))\\122)(\\*/))(?:(?=(\\p{space}*))\\125))+|(?:(?=(\\p{space}+))\\126)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\129)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\133)|\\*+(?!/))*))\\132)(\\*/))(?:(?=(\\p{space}*))\\135))+|(?:(?=(\\p{space}+))\\136)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\139)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\143)|\\*+(?!/))*))\\142)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\145)|\\*+(?!/))*))\\144)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\147)|\\*+(?!/))*))\\146)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\149)|\\*+(?!/))*))\\148)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\151)|\\*+(?!/))*))\\150)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\152))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\153))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\154))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\155))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\156))*>)(?:(?=(\\p{space}*))\\157))?::)*(?:(?=(\\p{space}*))\\158))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:reinterpret_cast|atomic_noexcept|uint_least16_t|uint_least32_t|uint_least64_t|atomic_cancel|atomic_commit|uint_least8_t|uint_fast16_t|uint_fast32_t|int_least16_t|int_least32_t|int_least64_t|uint_fast64_t|thread_local|int_fast16_t|int_fast32_t|int_fast64_t|synchronized|uint_fast8_t|dynamic_cast|int_least8_t|int_fast8_t|static_cast|suseconds_t|const_cast|useconds_t|constinit|co_return|uintmax_t|constexpr|consteval|constexpr|consteval|protected|namespace|blksize_t|co_return|in_addr_t|in_port_t|uintptr_t|template|noexcept|continue|co_await|co_yield|unsigned|u_quad_t|blkcnt_t|uint16_t|uint32_t|uint64_t|intptr_t|intmax_t|volatile|register|restrict|explicit|volatile|noexcept|operator|decltype|typename|requires|co_await|co_yield|reflexpr|swblk_t|virtual|ssize_t|concept|mutable|fixpt_t|int16_t|int32_t|int64_t|uint8_t|typedef|daddr_t|caddr_t|qaddr_t|default|nlink_t|segsz_t|u_short|wchar_t|private|__asm__|alignas|alignof|mutable|nullptr|clock_t|mode_t|public|size_t|double|quad_t|static|time_t|module|import|export|extern|inline|xor_eq|and_eq|return|friend|not_eq|signed|struct|int8_t|ushort|switch|u_long|typeid|u_char|sizeof|bitand|delete|ino_t|key_t|pid_t|off_t|uid_t|short|break|catch|compl|while|false|class|union|const|or_eq|const|throw|bitor|u_int|using|div_t|dev_t|gid_t|float|long|goto|uint|id_t|case|auto|void|enum|true|char|id_t|NULL|this|bool|else|for|new|not|xor|and|asm|int|try|do|if|or))((?:(?:(?=(\\p{space}*))\\161)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\165)|\\*+(?!/))*))\\164)(\\*/))(?:(?=(\\p{space}*))\\167))+|(?:(?=(\\p{space}+))\\168)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=\\()", "dgv", { hiddenCaptures: [1, 4, 7, 8, 10, 11, 16, 19, 20, 22, 23, 25, 28, 31, 32, 34, 35, 37, 40, 41, 43, 44, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 74, 75, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 101, 104, 105, 107, 108, 110, 113, 114, 116, 117, 119, 122, 123, 125, 126, 129, 132, 133, 135, 136, 139, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 161, 164, 165, 167, 168], lazyCompile: true }), new EmulatedRegExp("(?:(?:^|^|(?<=[\\;\\}]))|(?<=>|\\*/))(?:(?=(\\p{space}*))\\1)(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])template(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)|(?:thread_local|volatile|register|restrict|static|extern|const))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\16)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\20)|\\*+(?!/))*))\\19)(\\*/))(?:(?=(\\p{space}*))\\22))+|(?:(?=(\\p{space}+))\\23)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*)((?:(?=(\\p{space}*))\\25)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\28)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))(?:(?=(\\p{space}*))\\34))+|(?:(?=(\\p{space}+))\\35)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\37)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\41)|\\*+(?!/))*))\\40)(\\*/))(?:(?=(\\p{space}*))\\43))+|(?:(?=(\\p{space}+))\\44)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\47)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\51)|\\*+(?!/))*))\\50)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\65))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\66))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)(?:(?=(\\p{space}*))\\69))?::)*))\\46))((?:(?:(?=(\\p{space}*))\\71)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\75)|\\*+(?!/))*))\\74)(\\*/))(?:(?=(\\p{space}*))\\77))+|(?:(?=(\\p{space}+))\\78)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\81)|\\*+(?!/))*))\\80)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\84)|\\*+(?!/))*))\\83)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\86)|\\*+(?!/))*))\\85)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\88)|\\*+(?!/))*))\\87)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\90)|\\*+(?!/))*))\\89)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\92)|\\*+(?!/))*))\\91)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\93))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\94))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\95))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\96))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\97))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\98))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\101)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\105)|\\*+(?!/))*))\\104)(\\*/))(?:(?=(\\p{space}*))\\107))+|(?:(?=(\\p{space}+))\\108)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\110)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\114)|\\*+(?!/))*))\\113)(\\*/))(?:(?=(\\p{space}*))\\116))+|(?:(?=(\\p{space}+))\\117)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\119)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\123)|\\*+(?!/))*))\\122)(\\*/))(?:(?=(\\p{space}*))\\125))+|(?:(?=(\\p{space}+))\\126)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\129)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\133)|\\*+(?!/))*))\\132)(\\*/))(?:(?=(\\p{space}*))\\135))+|(?:(?=(\\p{space}+))\\136)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\139)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\143)|\\*+(?!/))*))\\142)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\145)|\\*+(?!/))*))\\144)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\147)|\\*+(?!/))*))\\146)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\149)|\\*+(?!/))*))\\148)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\151)|\\*+(?!/))*))\\150)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\152))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\153))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\154))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\155))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\156))*>)(?:(?=(\\p{space}*))\\157))?::)*(?:(?=(\\p{space}*))\\158))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:reinterpret_cast|atomic_noexcept|uint_least16_t|uint_least32_t|uint_least64_t|atomic_cancel|atomic_commit|uint_least8_t|uint_fast16_t|uint_fast32_t|int_least16_t|int_least32_t|int_least64_t|uint_fast64_t|thread_local|int_fast16_t|int_fast32_t|int_fast64_t|synchronized|uint_fast8_t|dynamic_cast|int_least8_t|int_fast8_t|static_cast|suseconds_t|const_cast|useconds_t|constinit|co_return|uintmax_t|constexpr|consteval|constexpr|consteval|protected|namespace|blksize_t|co_return|in_addr_t|in_port_t|uintptr_t|template|noexcept|continue|co_await|co_yield|unsigned|u_quad_t|blkcnt_t|uint16_t|uint32_t|uint64_t|intptr_t|intmax_t|volatile|register|restrict|explicit|volatile|noexcept|operator|decltype|typename|requires|co_await|co_yield|reflexpr|swblk_t|virtual|ssize_t|concept|mutable|fixpt_t|int16_t|int32_t|int64_t|uint8_t|typedef|daddr_t|caddr_t|qaddr_t|default|nlink_t|segsz_t|u_short|wchar_t|private|__asm__|alignas|alignof|mutable|nullptr|clock_t|mode_t|public|size_t|double|quad_t|static|time_t|module|import|export|extern|inline|xor_eq|and_eq|return|friend|not_eq|signed|struct|int8_t|ushort|switch|u_long|typeid|u_char|sizeof|bitand|delete|ino_t|key_t|pid_t|off_t|uid_t|short|break|catch|compl|while|false|class|union|const|or_eq|const|throw|bitor|u_int|using|div_t|dev_t|gid_t|float|long|goto|uint|id_t|case|auto|void|enum|true|char|id_t|NULL|this|bool|else|for|new|not|xor|and|asm|int|try|do|if|or))((?:(?:(?=(\\p{space}*))\\161)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\165)|\\*+(?!/))*))\\164)(\\*/))(?:(?=(\\p{space}*))\\167))+|(?:(?=(\\p{space}+))\\168)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=\\()", "dgv", { hiddenCaptures: [1, 4, 7, 8, 10, 11, 16, 19, 20, 22, 23, 25, 28, 31, 32, 34, 35, 37, 40, 41, 43, 44, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 74, 75, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 101, 104, 105, 107, 108, 110, 113, 114, 116, 117, 119, 122, 123, 125, 126, 129, 132, 133, 135, 136, 139, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 161, 164, 165, 167, 168], strategy: "clip_search", lazyCompile: true })]
      },
      beginCaptures: {
        "0": { name: "meta.head.function.definition.cpp" },
        "1": { name: "storage.type.template.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "7": {
          patterns: [
            {
              captures: {
                "1": { name: "storage.modifier.$1.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)|(?:thread_local|volatile|register|restrict|static|extern|const))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:constexpr|consteval|explicit|mutable|virtual|inline|friend)|(?:thread_local|volatile|register|restrict|static|extern|const))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            }
          ]
        },
        "8": { name: "storage.modifier.$8.cpp" },
        "9": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "10": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "11": { name: "comment.block.cpp" },
        "12": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "13": {
          name: "meta.qualified-type.cpp",
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "storage.type.$0.cpp"
            },
            { include: "#attributes_context" },
            { include: "#storage_types" },
            { include: "source.cpp#number_literal" },
            { include: "#string_context" },
            { include: "source.cpp#comma" },
            { include: "source.cpp#scope_resolution_inner_generated" },
            { include: "#template_call_range_helper" },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.type.cpp"
            }
          ]
        },
        "14": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "15": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "16": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "17": { name: "comment.block.cpp" },
        "18": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "19": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "20": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "21": { name: "comment.block.cpp" },
        "22": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "23": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.type.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "24": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "25": {},
        "26": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "27": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "28": { name: "comment.block.cpp" },
        "29": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "30": {},
        "31": {
          patterns: [
            {
              match: /\*/dgv,
              name: "storage.modifier.pointer.cpp"
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              },
              name: "invalid.illegal.reference-type.cpp"
            },
            {
              match: /&/dgv,
              name: "storage.modifier.reference.cpp"
            }
          ]
        },
        "32": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "33": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "34": { name: "comment.block.cpp" },
        "35": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "36": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "37": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "38": { name: "comment.block.cpp" },
        "39": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "40": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "41": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "42": { name: "comment.block.cpp" },
        "43": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "44": { name: "storage.type.modifier.calling-convention.cpp" },
        "45": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "46": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "47": { name: "comment.block.cpp" },
        "48": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "49": {
          patterns: [
            { include: "source.cpp#scope_resolution_function_definition_inner_generated" }
          ]
        },
        "50": { name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.function.definition.cpp" },
        "51": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "52": {},
        "53": { name: "entity.name.function.definition.cpp" },
        "54": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "55": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "56": { name: "comment.block.cpp" },
        "57": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      end: /(?:(?<=\}|%>|\?\?>)|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.function.definition.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.function.definition.cpp" }
          },
          name: "meta.head.function.definition.cpp",
          patterns: [
            { include: "#ever_present_context" },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.parameters.begin.bracket.round.cpp" }
              },
              contentName: "meta.function.definition.parameters",
              end: /\)|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.parameters.end.bracket.round.cpp" }
              },
              patterns: [
                { include: "#ever_present_context" },
                { include: "#parameter_or_maybe_value" },
                { include: "source.cpp#comma" },
                { include: "#evaluation_context" }
              ]
            },
            {
              captures: {
                "1": { name: "punctuation.definition.function.return-type.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": {
                  name: "meta.qualified-type.cpp",
                  patterns: [
                    {
                      match: /::/dgv,
                      name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
                    },
                    {
                      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                      name: "storage.type.$0.cpp"
                    },
                    { include: "#attributes_context" },
                    { include: "#storage_types" },
                    { include: "source.cpp#number_literal" },
                    { include: "#string_context" },
                    { include: "source.cpp#comma" },
                    { include: "source.cpp#scope_resolution_inner_generated" },
                    { include: "#template_call_range_helper" },
                    {
                      match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
                      name: "entity.name.type.cpp"
                    }
                  ]
                },
                "7": {
                  patterns: [
                    { include: "#attributes_context" },
                    { include: "source.cpp#number_literal" }
                  ]
                },
                "8": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "9": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "10": { name: "comment.block.cpp" },
                "11": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "12": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "14": { name: "comment.block.cpp" },
                "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "16": {
                  patterns: [
                    {
                      match: /::/dgv,
                      name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
                    },
                    {
                      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                      name: "entity.name.scope-resolution.type.cpp"
                    },
                    { include: "#template_call_range_helper" }
                  ]
                },
                "17": {
                  patterns: [
                    { include: "#template_call_range_helper" }
                  ]
                },
                "18": {},
                "19": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "20": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "21": { name: "comment.block.cpp" },
                "22": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "23": {}
              },
              match: {
                A: [new EmulatedRegExp("(?<=^|\\))(?:\\p{space}+)?(->)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:(?=(\\p{space}*))\\12)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\15)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\19)|\\*+(?!/))*))\\18)(\\*/))(?:(?=(\\p{space}*))\\21))+|(?:(?=(\\p{space}+))\\22)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\34)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\38)|\\*+(?!/))*))\\37)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\41)|\\*+(?!/))*))\\40)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\43)|\\*+(?!/))*))\\42)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\45)|\\*+(?!/))*))\\44)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\47)|\\*+(?!/))*))\\46)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\49)|\\*+(?!/))*))\\48)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\50))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\51))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\52))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\53))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\54))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\55))*>)(?:(?=(\\p{space}*))\\56))?::)*))\\33))((?:(?:(?=(\\p{space}*))\\58)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)(\\*/))(?:(?=(\\p{space}*))\\64))+|(?:(?=(\\p{space}+))\\65)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\68)|\\*+(?!/))*))\\67)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\70)|\\*+(?!/))*))\\69)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\72)|\\*+(?!/))*))\\71)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\74)|\\*+(?!/))*))\\73)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\76)|\\*+(?!/))*))\\75)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\77))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\78))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\81))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 18, 19, 21, 22, 24, 27, 28, 30, 31, 33, 34, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 61, 62, 64, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81], lazyCompile: true }), new EmulatedRegExp("(?<=^|\\))(?:\\p{space}+)?(->)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:(?=(\\p{space}*))\\12)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\15)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\19)|\\*+(?!/))*))\\18)(\\*/))(?:(?=(\\p{space}*))\\21))+|(?:(?=(\\p{space}+))\\22)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\34)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\38)|\\*+(?!/))*))\\37)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\41)|\\*+(?!/))*))\\40)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\43)|\\*+(?!/))*))\\42)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\45)|\\*+(?!/))*))\\44)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\47)|\\*+(?!/))*))\\46)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\49)|\\*+(?!/))*))\\48)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\50))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\51))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\52))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\53))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\54))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\55))*>)(?:(?=(\\p{space}*))\\56))?::)*))\\33))((?:(?:(?=(\\p{space}*))\\58)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)(\\*/))(?:(?=(\\p{space}*))\\64))+|(?:(?=(\\p{space}+))\\65)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\68)|\\*+(?!/))*))\\67)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\70)|\\*+(?!/))*))\\69)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\72)|\\*+(?!/))*))\\71)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\74)|\\*+(?!/))*))\\73)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\76)|\\*+(?!/))*))\\75)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\77))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\78))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\81))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 18, 19, 21, 22, 24, 27, 28, 30, 31, 33, 34, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 61, 62, 64, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81], lazyCompile: true })]
              }
            },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.function.definition.cpp" }
          },
          name: "meta.body.function.definition.cpp",
          patterns: [
            { include: "#function_body_context" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.function.definition.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    function_parameter_context: {
      patterns: [
        { include: "#ever_present_context" },
        { include: "#parameter" },
        { include: "source.cpp#comma" }
      ]
    },
    function_pointer: {
      begin: {
        A: [new EmulatedRegExp("((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\5)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)(\\*/))(?:(?=(\\p{space}*))\\11))+|(?:(?=(\\p{space}+))\\12)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\24)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\39)|\\*+(?!/))*))\\38)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\45))*>)(?:(?=(\\p{space}*))\\46))?::)*))\\23))((?:(?:(?=(\\p{space}*))\\48)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)(\\*/))(?:(?=(\\p{space}*))\\54))+|(?:(?=(\\p{space}+))\\55)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\66)|\\*+(?!/))*))\\65)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\74)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\78)|\\*+(?!/))*))\\77)(\\*/))(?:(?=(\\p{space}*))\\80))+|(?:(?=(\\p{space}+))\\81)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\83)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\87)|\\*+(?!/))*))\\86)(\\*/))(?:(?=(\\p{space}*))\\89))+|(?:(?=(\\p{space}+))\\90)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\92)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\96)|\\*+(?!/))*))\\95)(\\*/))(?:(?=(\\p{space}*))\\98))+|(?:(?=(\\p{space}+))\\99)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()(\\*)(?:\\p{space}+)?((?:(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)?)(?:\\p{space}+)?(?:(\\[)([\\p{L}\\p{M}\\p{N}\\p{Pc}]*)(\\])(?:\\p{space}+)?)*(\\))(?:\\p{space}+)?(\\()", "dgv", { hiddenCaptures: [2, 5, 8, 9, 11, 12, 14, 17, 18, 20, 21, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 74, 77, 78, 80, 81, 83, 86, 87, 89, 90, 92, 95, 96, 98, 99], lazyCompile: true }), new EmulatedRegExp("((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\5)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)(\\*/))(?:(?=(\\p{space}*))\\11))+|(?:(?=(\\p{space}+))\\12)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\24)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\39)|\\*+(?!/))*))\\38)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\45))*>)(?:(?=(\\p{space}*))\\46))?::)*))\\23))((?:(?:(?=(\\p{space}*))\\48)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)(\\*/))(?:(?=(\\p{space}*))\\54))+|(?:(?=(\\p{space}+))\\55)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\66)|\\*+(?!/))*))\\65)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\74)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\78)|\\*+(?!/))*))\\77)(\\*/))(?:(?=(\\p{space}*))\\80))+|(?:(?=(\\p{space}+))\\81)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\83)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\87)|\\*+(?!/))*))\\86)(\\*/))(?:(?=(\\p{space}*))\\89))+|(?:(?=(\\p{space}+))\\90)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\92)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\96)|\\*+(?!/))*))\\95)(\\*/))(?:(?=(\\p{space}*))\\98))+|(?:(?=(\\p{space}+))\\99)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()(\\*)(?:\\p{space}+)?((?:(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)?)(?:\\p{space}+)?(?:(\\[)([\\p{L}\\p{M}\\p{N}\\p{Pc}]*)(\\])(?:\\p{space}+)?)*(\\))(?:\\p{space}+)?(\\()", "dgv", { hiddenCaptures: [2, 5, 8, 9, 11, 12, 14, 17, 18, 20, 21, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 74, 77, 78, 80, 81, 83, 86, 87, 89, 90, 92, 95, 96, 98, 99], lazyCompile: true })]
      },
      beginCaptures: {
        "1": {
          name: "meta.qualified-type.cpp",
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "storage.type.$0.cpp"
            },
            { include: "#attributes_context" },
            { include: "#storage_types" },
            { include: "source.cpp#number_literal" },
            { include: "#string_context" },
            { include: "source.cpp#comma" },
            { include: "source.cpp#scope_resolution_inner_generated" },
            { include: "#template_call_range_helper" },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.type.cpp"
            }
          ]
        },
        "2": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "3": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "4": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "5": { name: "comment.block.cpp" },
        "6": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "7": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "9": { name: "comment.block.cpp" },
        "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "11": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.type.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "12": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "13": {},
        "14": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "15": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "16": { name: "comment.block.cpp" },
        "17": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "18": {},
        "19": {
          patterns: [
            {
              match: /\*/dgv,
              name: "storage.modifier.pointer.cpp"
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              },
              name: "invalid.illegal.reference-type.cpp"
            },
            {
              match: /&/dgv,
              name: "storage.modifier.reference.cpp"
            }
          ]
        },
        "20": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "21": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "22": { name: "comment.block.cpp" },
        "23": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "24": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "25": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "26": { name: "comment.block.cpp" },
        "27": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "28": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "29": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "30": { name: "comment.block.cpp" },
        "31": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "32": { name: "punctuation.section.parens.begin.bracket.round.function.pointer.cpp" },
        "33": { name: "punctuation.definition.function.pointer.dereference.cpp" },
        "34": { name: "variable.other.definition.pointer.function.cpp" },
        "35": { name: "punctuation.definition.begin.bracket.square.cpp" },
        "36": {
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        "37": { name: "punctuation.definition.end.bracket.square.cpp" },
        "38": { name: "punctuation.section.parens.end.bracket.round.function.pointer.cpp" },
        "39": { name: "punctuation.section.parameters.begin.bracket.round.function.pointer.cpp" }
      },
      end: {
        A: [new EmulatedRegExp("(\\))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))+(?=\\p{space}*[\\n\\r\\;\\=\\{])((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\n\\)\\,\\;\\=\\>\\{])(?!\\()|(?=(?<!\\\\)\\n)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] }), new EmulatedRegExp("(\\))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))+(?=\\p{space}*[\\n\\r\\;\\=\\{])((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\n\\)\\,\\;\\=\\>\\{])(?!\\()|(?=(?<!\\\\)\\n)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] })]
      },
      endCaptures: {
        "1": { name: "punctuation.section.parameters.end.bracket.round.function.pointer.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "8": { name: "comment.block.cpp" },
        "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "10": { name: "storage.modifier.specifier.functional.post-parameters.$10.cpp" },
        "11": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "13": { name: "comment.block.cpp" },
        "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      patterns: [
        { include: "#function_parameter_context" }
      ]
    },
    function_pointer_parameter: {
      begin: {
        A: [new EmulatedRegExp("((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\5)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)(\\*/))(?:(?=(\\p{space}*))\\11))+|(?:(?=(\\p{space}+))\\12)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\24)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\39)|\\*+(?!/))*))\\38)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\45))*>)(?:(?=(\\p{space}*))\\46))?::)*))\\23))((?:(?:(?=(\\p{space}*))\\48)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)(\\*/))(?:(?=(\\p{space}*))\\54))+|(?:(?=(\\p{space}+))\\55)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\66)|\\*+(?!/))*))\\65)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\74)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\78)|\\*+(?!/))*))\\77)(\\*/))(?:(?=(\\p{space}*))\\80))+|(?:(?=(\\p{space}+))\\81)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\83)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\87)|\\*+(?!/))*))\\86)(\\*/))(?:(?=(\\p{space}*))\\89))+|(?:(?=(\\p{space}+))\\90)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\92)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\96)|\\*+(?!/))*))\\95)(\\*/))(?:(?=(\\p{space}*))\\98))+|(?:(?=(\\p{space}+))\\99)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()(\\*)(?:\\p{space}+)?((?:(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)?)(?:\\p{space}+)?(?:(\\[)([\\p{L}\\p{M}\\p{N}\\p{Pc}]*)(\\])(?:\\p{space}+)?)*(\\))(?:\\p{space}+)?(\\()", "dgv", { hiddenCaptures: [2, 5, 8, 9, 11, 12, 14, 17, 18, 20, 21, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 74, 77, 78, 80, 81, 83, 86, 87, 89, 90, 92, 95, 96, 98, 99], lazyCompile: true }), new EmulatedRegExp("((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\5)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)(\\*/))(?:(?=(\\p{space}*))\\11))+|(?:(?=(\\p{space}+))\\12)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\24)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\39)|\\*+(?!/))*))\\38)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\45))*>)(?:(?=(\\p{space}*))\\46))?::)*))\\23))((?:(?:(?=(\\p{space}*))\\48)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)(\\*/))(?:(?=(\\p{space}*))\\54))+|(?:(?=(\\p{space}+))\\55)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\66)|\\*+(?!/))*))\\65)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\74)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\78)|\\*+(?!/))*))\\77)(\\*/))(?:(?=(\\p{space}*))\\80))+|(?:(?=(\\p{space}+))\\81)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\83)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\87)|\\*+(?!/))*))\\86)(\\*/))(?:(?=(\\p{space}*))\\89))+|(?:(?=(\\p{space}+))\\90)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\92)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\96)|\\*+(?!/))*))\\95)(\\*/))(?:(?=(\\p{space}*))\\98))+|(?:(?=(\\p{space}+))\\99)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()(\\*)(?:\\p{space}+)?((?:(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)?)(?:\\p{space}+)?(?:(\\[)([\\p{L}\\p{M}\\p{N}\\p{Pc}]*)(\\])(?:\\p{space}+)?)*(\\))(?:\\p{space}+)?(\\()", "dgv", { hiddenCaptures: [2, 5, 8, 9, 11, 12, 14, 17, 18, 20, 21, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 74, 77, 78, 80, 81, 83, 86, 87, 89, 90, 92, 95, 96, 98, 99], lazyCompile: true })]
      },
      beginCaptures: {
        "1": {
          name: "meta.qualified-type.cpp",
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "storage.type.$0.cpp"
            },
            { include: "#attributes_context" },
            { include: "#storage_types" },
            { include: "source.cpp#number_literal" },
            { include: "#string_context" },
            { include: "source.cpp#comma" },
            { include: "source.cpp#scope_resolution_inner_generated" },
            { include: "#template_call_range_helper" },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.type.cpp"
            }
          ]
        },
        "2": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "3": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "4": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "5": { name: "comment.block.cpp" },
        "6": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "7": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "9": { name: "comment.block.cpp" },
        "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "11": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.type.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "12": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "13": {},
        "14": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "15": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "16": { name: "comment.block.cpp" },
        "17": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "18": {},
        "19": {
          patterns: [
            {
              match: /\*/dgv,
              name: "storage.modifier.pointer.cpp"
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              },
              name: "invalid.illegal.reference-type.cpp"
            },
            {
              match: /&/dgv,
              name: "storage.modifier.reference.cpp"
            }
          ]
        },
        "20": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "21": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "22": { name: "comment.block.cpp" },
        "23": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "24": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "25": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "26": { name: "comment.block.cpp" },
        "27": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "28": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "29": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "30": { name: "comment.block.cpp" },
        "31": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "32": { name: "punctuation.section.parens.begin.bracket.round.function.pointer.cpp" },
        "33": { name: "punctuation.definition.function.pointer.dereference.cpp" },
        "34": { name: "variable.parameter.pointer.function.cpp" },
        "35": { name: "punctuation.definition.begin.bracket.square.cpp" },
        "36": {
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        "37": { name: "punctuation.definition.end.bracket.square.cpp" },
        "38": { name: "punctuation.section.parens.end.bracket.round.function.pointer.cpp" },
        "39": { name: "punctuation.section.parameters.begin.bracket.round.function.pointer.cpp" }
      },
      end: {
        A: [new EmulatedRegExp("(\\))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))+(?=\\p{space}*[\\n\\r\\;\\=\\{])((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\n\\)\\,\\;\\=\\>\\{])(?!\\()|(?=(?<!\\\\)\\n)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] }), new EmulatedRegExp("(\\))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))+(?=\\p{space}*[\\n\\r\\;\\=\\{])((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\n\\)\\,\\;\\=\\>\\{])(?!\\()|(?=(?<!\\\\)\\n)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] })]
      },
      endCaptures: {
        "1": { name: "punctuation.section.parameters.end.bracket.round.function.pointer.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "8": { name: "comment.block.cpp" },
        "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "10": { name: "storage.modifier.specifier.functional.post-parameters.$10.cpp" },
        "11": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "13": { name: "comment.block.cpp" },
        "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      patterns: [
        { include: "#function_parameter_context" }
      ]
    },
    gcc_attributes: {
      begin: /__attribute(?:__)?\p{space}*\(\p{space}*\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.attribute.begin.cpp" }
      },
      end: /\)\p{space}*\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.attribute.end.cpp" }
      },
      name: "support.other.attribute.cpp",
      patterns: [
        { include: "#attributes_context" },
        {
          begin: /\(/dgv,
          beginCaptures: {},
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          patterns: [
            { include: "#attributes_context" },
            { include: "#string_context" },
            { include: "#ever_present_context" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.other.using.directive.cpp" },
            "2": { name: "entity.name.namespace.cpp" }
          },
          match: /(using)\p{space}+((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))/dgv
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.attribute.cpp"
        },
        {
          match: /:/dgv,
          name: "punctuation.accessor.attribute.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])(?=::)/dgv,
          name: "entity.name.namespace.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "entity.other.attribute.$0.cpp"
        },
        { include: "source.cpp#number_literal" },
        { include: "#ever_present_context" }
      ]
    },
    inheritance_context: {
      patterns: [
        { include: "#ever_present_context" },
        {
          match: /,/dgv,
          name: "punctuation.separator.delimiter.comma.inheritance.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])p(?:rotected|rivate|ublic)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "storage.type.modifier.access.$0.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])virtual(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "storage.type.modifier.virtual.cpp"
        },
        {
          captures: {
            "1": {
              name: "meta.qualified-type.cpp",
              patterns: [
                {
                  match: /::/dgv,
                  name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
                },
                {
                  match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "storage.type.$0.cpp"
                },
                { include: "#attributes_context" },
                { include: "#storage_types" },
                { include: "source.cpp#number_literal" },
                { include: "#string_context" },
                { include: "source.cpp#comma" },
                { include: "source.cpp#scope_resolution_inner_generated" },
                { include: "#template_call_range_helper" },
                {
                  match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
                  name: "entity.name.type.cpp"
                }
              ]
            },
            "2": {
              patterns: [
                { include: "#attributes_context" },
                { include: "source.cpp#number_literal" }
              ]
            },
            "3": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "4": {
              patterns: [
                {
                  captures: {
                    "1": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "2": { name: "comment.block.cpp" },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\5)|\\*+(?!/))*))\\4)(\\*/))(?:(?=(\\p{space}*))\\7)", "dgv", { hiddenCaptures: [1, 4, 5, 7] })
                }
              ]
            },
            "5": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "6": {
              patterns: [
                {
                  captures: {
                    "1": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "2": { name: "comment.block.cpp" },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\5)|\\*+(?!/))*))\\4)(\\*/))(?:(?=(\\p{space}*))\\7)", "dgv", { hiddenCaptures: [1, 4, 5, 7] })
                }
              ]
            },
            "7": {
              patterns: [
                {
                  match: /::/dgv,
                  name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
                },
                {
                  match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "entity.name.scope-resolution.type.cpp"
                },
                { include: "#template_call_range_helper" }
              ]
            },
            "8": {
              patterns: [
                { include: "#template_call_range_helper" }
              ]
            },
            "9": {},
            "10": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "11": {
              patterns: [
                {
                  captures: {
                    "1": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "2": { name: "comment.block.cpp" },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\5)|\\*+(?!/))*))\\4)(\\*/))(?:(?=(\\p{space}*))\\7)", "dgv", { hiddenCaptures: [1, 4, 5, 7] })
                }
              ]
            },
            "12": {}
          },
          match: {
            A: [new EmulatedRegExp("(?<=protected|virtual|private|public|[\\,\\:])(?:\\p{space}+)?(?!p(?:rotected|rivate|ublic)|virtual)((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?(((?:(?:(?=(\\p{space}*))\\6)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)\\*/(?:(?=(\\p{space}*))\\9))+)|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))(((?:(?:(?=(\\p{space}*))\\13)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\15)|\\*+(?!/))*))\\14)\\*/(?:(?=(\\p{space}*))\\16))+)|(?:(?=(\\p{space}+))\\17)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\20)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\24)|\\*+(?!/))*))\\23)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\29)|\\*+(?!/))*))\\28)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\36))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\37))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\38))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)(?:(?=(\\p{space}*))\\42))?::)*))\\19))(((?:(?:(?=(\\p{space}*))\\45)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\47)|\\*+(?!/))*))\\46)\\*/(?:(?=(\\p{space}*))\\48))+)|(?:(?=(\\p{space}+))\\49)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\61))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\62))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\65))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 19, 20, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65], lazyCompile: true }), new EmulatedRegExp("(?<=protected|virtual|private|public|[\\,\\:])(?:\\p{space}+)?(?!p(?:rotected|rivate|ublic)|virtual)((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?(((?:(?:(?=(\\p{space}*))\\6)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)\\*/(?:(?=(\\p{space}*))\\9))+)|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))(((?:(?:(?=(\\p{space}*))\\13)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\15)|\\*+(?!/))*))\\14)\\*/(?:(?=(\\p{space}*))\\16))+)|(?:(?=(\\p{space}+))\\17)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\20)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\24)|\\*+(?!/))*))\\23)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\29)|\\*+(?!/))*))\\28)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\36))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\37))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\38))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\39))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)(?:(?=(\\p{space}*))\\42))?::)*))\\19))(((?:(?:(?=(\\p{space}*))\\45)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\47)|\\*+(?!/))*))\\46)\\*/(?:(?=(\\p{space}*))\\48))+)|(?:(?=(\\p{space}+))\\49)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\61))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\62))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\65))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 19, 20, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65], lazyCompile: true })]
          }
        }
      ]
    },
    lambdas: {
      begin: {
        A: [new EmulatedRegExp("(?:(?<=\\P{space}|^)(?<![\\]\"\\&\\)\\*\\>\\[\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<=(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)return))(?:\\p{space}+)?(\\[(?!\\[|(?:(?=( *))\\2)\"|(?:(?=( *))\\3)\\p{Nd}))((?:(?=((?:[^\\]\\[]|((?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\8)(?:(?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\10)(?:(?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\12)(?:(?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\14)(?:(?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\16)(?:)?)+))\\15)\\])?)+))\\13)\\])?)+))\\11)\\])?)+))\\9)\\])?)+))\\7)\\]))*))\\5))(\\](?!((?:(?:(?=(\\p{space}*))\\19)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\23)|\\*+(?!/))*))\\22)(\\*/))(?:(?=(\\p{space}*))\\25))+|(?:(?=(\\p{space}+))\\26)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))[\\]\\;\\=\\[]))", "dgv", { hiddenCaptures: [2, 3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 22, 23, 25, 26] }), new EmulatedRegExp("(?:(?<=\\P{space}|^)(?<![\\]\"\\&\\)\\*\\>\\[\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<=(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)return))(?:\\p{space}+)?(\\[(?!\\[|(?:(?=( *))\\2)\"|(?:(?=( *))\\3)\\p{Nd}))((?:(?=((?:[^\\]\\[]|((?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\8)(?:(?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\10)(?:(?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\12)(?:(?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\14)(?:(?<!\\[)\\[(?!\\[)(?:(?=((?:(?:(?=([^\\]\\[]*))\\16)(?:)?)+))\\15)\\])?)+))\\13)\\])?)+))\\11)\\])?)+))\\9)\\])?)+))\\7)\\]))*))\\5))(\\](?!((?:(?:(?=(\\p{space}*))\\19)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\23)|\\*+(?!/))*))\\22)(\\*/))(?:(?=(\\p{space}*))\\25))+|(?:(?=(\\p{space}+))\\26)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))[\\]\\;\\=\\[]))", "dgv", { hiddenCaptures: [2, 3, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 22, 23, 25, 26] })]
      },
      beginCaptures: {
        "1": { name: "punctuation.definition.capture.begin.lambda.cpp" },
        "2": {
          name: "meta.lambda.capture.cpp",
          patterns: [
            { include: "source.cpp#the_this_keyword" },
            {
              captures: {
                "1": { name: "variable.parameter.capture.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "punctuation.separator.delimiter.comma.cpp" },
                "7": { name: "keyword.operator.assignment.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?=\\]|$|(?=\\n?$))|(,))|(=))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?=\\]|$|(?=\\n?$))|(,))|(=))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            { include: "#evaluation_context" }
          ]
        },
        "3": {},
        "4": { name: "punctuation.definition.capture.end.lambda.cpp" },
        "5": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "6": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "7": { name: "comment.block.cpp" },
        "8": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      end: /(?<=[\;\}])|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.parameters.begin.lambda.cpp" }
          },
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.parameters.end.lambda.cpp" }
          },
          name: "meta.function.definition.parameters.lambda.cpp",
          patterns: [
            { include: "#function_parameter_context" }
          ]
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:constexpr|consteval|mutable)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "storage.modifier.lambda.$0.cpp"
        },
        {
          begin: /->/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.lambda.return-type.cpp" }
          },
          end: /(?=\{)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          patterns: [
            { include: "#comments" },
            {
              match: /\P{space}+/dgv,
              name: "storage.type.return-type.lambda.cpp"
            }
          ]
        },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.lambda.cpp" }
          },
          end: /\}|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.lambda.cpp" }
          },
          name: "meta.function.definition.body.lambda.cpp",
          patterns: [
            { include: "#function_body_context" }
          ]
        }
      ]
    },
    line: {
      begin: {
        A: [new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(#)(?:\\p{space}+)?line\\b", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(#)(?:\\p{space}+)?line\\b", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "0": { name: "keyword.control.directive.line.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "punctuation.definition.directive.cpp" }
      },
      end: /(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$)))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.preprocessor.line.cpp",
      patterns: [
        { include: "#string_context" },
        { include: "source.cpp#preprocessor_number_literal" },
        { include: "source.cpp#line_continuation_character" }
      ]
    },
    line_comment: {
      begin: new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)(//)", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "1": { name: "punctuation.definition.comment.cpp" }
      },
      end: /(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$)))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "comment.line.double-slash.cpp",
      patterns: [
        { include: "source.cpp#line_continuation_character" }
      ]
    },
    macro: {
      begin: {
        A: [new EmulatedRegExp("^(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(#)(?:\\p{space}+)?define)\\b(?:\\p{space}+)?((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("^(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(#)(?:\\p{space}+)?define)\\b(?:\\p{space}+)?((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.control.directive.define.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.definition.directive.cpp" },
        "7": { name: "entity.name.function.preprocessor.cpp" }
      },
      end: /(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$)))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.preprocessor.macro.cpp",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.parameters.begin.preprocessor.cpp" },
            "2": {
              name: "meta.function.preprocessor.parameters.cpp",
              patterns: [
                {
                  captures: {
                    "1": { name: "variable.parameter.preprocessor.cpp" }
                  },
                  match: /(?<=[\(\,])(?:\p{space}+)?((?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*)(?:\p{space}+)?/dgv
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.parameters.cpp"
                },
                {
                  match: /\.\.\./dgv,
                  name: "punctuation.vararg-ellipses.variable.parameter.preprocessor.cpp"
                }
              ]
            },
            "3": { name: "punctuation.definition.parameters.end.preprocessor.cpp" }
          },
          match: {
            G: [/￿(?:\p{space}+)?(\()([^\(]*)(\))/dgv, /(?:\p{space}+)?(\()([^\(]*)(\))/dgvy]
          }
        },
        { include: "#macro_context" },
        { include: "source.cpp#macro_argument" }
      ]
    },
    macro_context: {
      patterns: [
        { include: "source.cpp.embedded.macro" }
      ]
    },
    method_access: {
      begin: {
        A: [new EmulatedRegExp("(?:((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])this(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?:(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))|(?<=[\\]\\)]))(?:\\p{space}+)?)(?:(\\.\\*?)|(->\\*?))((?:(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?:\\p{space}+)?(?:\\.\\*?|->\\*?)(?:\\p{space}+)?)*)(?:\\p{space}+)?(~?(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)(?:\\p{space}+)?(\\()", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])this(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?:(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))|(?<=[\\]\\)]))(?:\\p{space}+)?)(?:(\\.\\*?)|(->\\*?))((?:(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?:\\p{space}+)?(?:\\.\\*?|->\\*?)(?:\\p{space}+)?)*)(?:\\p{space}+)?(~?(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)(?:\\p{space}+)?(\\()", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "variable.language.this.cpp" },
        "6": { name: "variable.lower-case.cpp variable.other.object.access.$6.cpp" },
        "7": { name: "variable.snake-case.cpp variable.other.object.access.$7.cpp" },
        "8": { name: "variable.camel-case.cpp variable.other.object.access.$8.cpp" },
        "9": { name: "variable.upper-case.cpp variable.other.object.access.$9.cpp" },
        "10": { name: "variable.other.unknown.$10.cpp" },
        "11": { name: "punctuation.separator.dot-access.cpp" },
        "12": { name: "punctuation.separator.pointer-access.cpp" },
        "13": {
          patterns: [
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "5": { name: "variable.language.this.cpp" },
                "6": { name: "variable.lower-case.cpp variable.other.object.property.cpp" },
                "7": { name: "variable.snake-case.cpp variable.other.object.property.cpp" },
                "8": { name: "variable.camel-case.cpp variable.other.object.property.cpp" },
                "9": { name: "variable.upper-case.cpp variable.other.object.property.cpp" },
                "10": { name: "variable.other.unknown.$10.cpp" },
                "11": { name: "punctuation.separator.dot-access.cpp" },
                "12": { name: "punctuation.separator.pointer-access.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?<=\\.\\*?|->\\*??)(?:\\p{space}+)?(?:((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])this(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?:(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))|(?<=[\\]\\)]))(?:\\p{space}+)?)(?:(\\.\\*?)|(->\\*?))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?<=\\.\\*?|->\\*??)(?:\\p{space}+)?(?:((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])this(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?:(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))|(?<=[\\]\\)]))(?:\\p{space}+)?)(?:(\\.\\*?)|(->\\*?))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              }
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "5": { name: "variable.language.this.cpp" },
                "6": { name: "variable.lower-case.cpp variable.other.object.access.$6.cpp" },
                "7": { name: "variable.snake-case.cpp variable.other.object.access.$7.cpp" },
                "8": { name: "variable.camel-case.cpp variable.other.object.access.$8.cpp" },
                "9": { name: "variable.upper-case.cpp variable.other.object.access.$9.cpp" },
                "10": { name: "variable.other.unknown.$10.cpp" },
                "11": { name: "punctuation.separator.dot-access.cpp" },
                "12": { name: "punctuation.separator.pointer-access.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?:((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])this(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?:(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))|(?<=[\\]\\)]))(?:\\p{space}+)?)(?:(\\.\\*?)|(->\\*?))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])this(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))|(?:(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))|(?<=[\\]\\)]))(?:\\p{space}+)?)(?:(\\.\\*?)|(->\\*?))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              }
            },
            { include: "source.cpp#member_access" },
            { include: "#method_access" }
          ]
        },
        "14": { name: "entity.name.function.member.cpp" },
        "15": { name: "punctuation.section.arguments.begin.bracket.round.function.member.cpp" }
      },
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.function.member.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    ms_attributes: {
      begin: /__declspec\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.attribute.begin.cpp" }
      },
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.attribute.end.cpp" }
      },
      name: "support.other.attribute.cpp",
      patterns: [
        { include: "#attributes_context" },
        {
          begin: /\(/dgv,
          beginCaptures: {},
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          patterns: [
            { include: "#attributes_context" },
            { include: "#string_context" },
            { include: "#ever_present_context" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.other.using.directive.cpp" },
            "2": { name: "entity.name.namespace.cpp" }
          },
          match: /(using)\p{space}+((?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}]))/dgv
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.attribute.cpp"
        },
        {
          match: /:/dgv,
          name: "punctuation.accessor.attribute.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])(?=::)/dgv,
          name: "entity.name.namespace.cpp"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "entity.other.attribute.$0.cpp"
        },
        { include: "source.cpp#number_literal" },
        { include: "#ever_present_context" }
      ]
    },
    namespace_block: {
      begin: /((?<![\p{L}\p{M}\p{N}\p{Pc}])namespace(?![\p{L}\p{M}\p{N}\p{Pc}]))/dgv,
      beginCaptures: {
        "0": { name: "meta.head.namespace.cpp" },
        "1": { name: "keyword.other.namespace.definition.cpp storage.type.namespace.definition.cpp" }
      },
      end: /(?:(?<=\}|%>|\?\?>)|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.block.namespace.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.namespace.cpp" }
          },
          name: "meta.head.namespace.cpp",
          patterns: [
            { include: "#ever_present_context" },
            { include: "#attributes_context" },
            { include: "#normal_variable_assignment" },
            { include: "#normal_variable_declaration" },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#scope_resolution_namespace_block_inner_generated" }
                  ]
                },
                "2": { name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.namespace.block.cpp" },
                "3": {
                  patterns: [
                    { include: "#template_call_range_helper" }
                  ]
                },
                "4": {},
                "5": { name: "entity.name.namespace.cpp" },
                "6": { name: "punctuation.separator.scope-resolution.namespace.block.cpp" },
                "7": { name: "storage.modifier.inline.cpp" }
              },
              match: new EmulatedRegExp("((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\3)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\11)|\\*+(?!/))*))\\10)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\13)|\\*+(?!/))*))\\12)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\15)|\\*+(?!/))*))\\14)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\16))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\17))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\18))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\19))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\20))*>)(?:(?=(\\p{space}*))\\21))?::)*(?:(?=(\\p{space}*))\\22))(?:\\p{space}+)?((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))(?:\\p{space}+)?(?:(::)(?:\\p{space}+)?(inline))?", "dgv", { hiddenCaptures: [3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] })
            }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.namespace.cpp" }
          },
          name: "meta.body.namespace.cpp",
          patterns: [
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.namespace.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    noexcept_operator: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])noexcept(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])noexcept(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.operator.functionlike.cpp keyword.operator.noexcept.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.noexcept.cpp" }
      },
      contentName: "meta.arguments.operator.noexcept",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.operator.noexcept.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    normal_variable_assignment: {
      begin: {
        A: [new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:((?:(?:(?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:thread_local|volatile|register|restrict|static|extern|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\p{space}+)+)((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=(\\p{space}*))\\30)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\42)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\46)|\\*+(?!/))*))\\45)(\\*/))(?:(?=(\\p{space}*))\\48))+|(?:(?=(\\p{space}+))\\49)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\52)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\59)|\\*+(?!/))*))\\58)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\61)|\\*+(?!/))*))\\60)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\63)|\\*+(?!/))*))\\62)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\65)|\\*+(?!/))*))\\64)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\72))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\73))*>)(?:(?=(\\p{space}*))\\74))?::)*))\\51))((?:(?:(?=(\\p{space}*))\\76)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\80)|\\*+(?!/))*))\\79)(\\*/))(?:(?=(\\p{space}*))\\82))+|(?:(?=(\\p{space}+))\\83)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\86)|\\*+(?!/))*))\\85)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\88)|\\*+(?!/))*))\\87)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\90)|\\*+(?!/))*))\\89)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\92)|\\*+(?!/))*))\\91)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\94)|\\*+(?!/))*))\\93)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\95))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\96))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\97))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\98))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\99))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\102)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\106)|\\*+(?!/))*))\\105)(\\*/))(?:(?=(\\p{space}*))\\108))+|(?:(?=(\\p{space}+))\\109)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\111)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\115)|\\*+(?!/))*))\\114)(\\*/))(?:(?=(\\p{space}*))\\117))+|(?:(?=(\\p{space}+))\\118)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\120)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\124)|\\*+(?!/))*))\\123)(\\*/))(?:(?=(\\p{space}*))\\126))+|(?:(?=(\\p{space}+))\\127)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))((?:(?:(?=(\\p{space}*))\\134)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\138)|\\*+(?!/))*))\\137)(\\*/))(?:(?=(\\p{space}*))\\140))+|(?:(?=(\\p{space}+))\\141)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:((?:[\\-\\%\\*\\+]|(?<!\\()/)=)|((?:[\\&\\^]|<<|>>|\\|)=)|(=)))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28, 30, 33, 36, 37, 39, 40, 42, 45, 46, 48, 49, 51, 52, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 76, 79, 80, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 102, 105, 106, 108, 109, 111, 114, 115, 117, 118, 120, 123, 124, 126, 127, 134, 137, 138, 140, 141], lazyCompile: true }), new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:((?:(?:(?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:thread_local|volatile|register|restrict|static|extern|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\p{space}+)+)((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=(\\p{space}*))\\30)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\42)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\46)|\\*+(?!/))*))\\45)(\\*/))(?:(?=(\\p{space}*))\\48))+|(?:(?=(\\p{space}+))\\49)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\52)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\59)|\\*+(?!/))*))\\58)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\61)|\\*+(?!/))*))\\60)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\63)|\\*+(?!/))*))\\62)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\65)|\\*+(?!/))*))\\64)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\72))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\73))*>)(?:(?=(\\p{space}*))\\74))?::)*))\\51))((?:(?:(?=(\\p{space}*))\\76)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\80)|\\*+(?!/))*))\\79)(\\*/))(?:(?=(\\p{space}*))\\82))+|(?:(?=(\\p{space}+))\\83)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\86)|\\*+(?!/))*))\\85)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\88)|\\*+(?!/))*))\\87)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\90)|\\*+(?!/))*))\\89)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\92)|\\*+(?!/))*))\\91)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\94)|\\*+(?!/))*))\\93)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\95))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\96))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\97))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\98))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\99))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\102)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\106)|\\*+(?!/))*))\\105)(\\*/))(?:(?=(\\p{space}*))\\108))+|(?:(?=(\\p{space}+))\\109)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\111)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\115)|\\*+(?!/))*))\\114)(\\*/))(?:(?=(\\p{space}*))\\117))+|(?:(?=(\\p{space}+))\\118)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\120)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\124)|\\*+(?!/))*))\\123)(\\*/))(?:(?=(\\p{space}*))\\126))+|(?:(?=(\\p{space}+))\\127)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))((?:(?:(?=(\\p{space}*))\\134)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\138)|\\*+(?!/))*))\\137)(\\*/))(?:(?=(\\p{space}*))\\140))+|(?:(?=(\\p{space}+))\\141)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:((?:[\\-\\%\\*\\+]|(?<!\\()/)=)|((?:[\\&\\^]|<<|>>|\\|)=)|(=)))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28, 30, 33, 36, 37, 39, 40, 42, 45, 46, 48, 49, 51, 52, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 76, 79, 80, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 102, 105, 106, 108, 109, 111, 114, 115, 117, 118, 120, 123, 124, 126, 127, 134, 137, 138, 140, 141], lazyCompile: true })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "meta.assignment.cpp" },
        "6": {
          patterns: [
            { include: "source.cpp#storage_specifiers" }
          ]
        },
        "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "8": { name: "comment.block.cpp" },
        "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "10": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "11": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "12": { name: "comment.block.cpp" },
        "13": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "14": {
          name: "meta.qualified-type.cpp",
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "storage.type.$0.cpp"
            },
            { include: "#attributes_context" },
            { include: "#storage_types" },
            { include: "source.cpp#number_literal" },
            { include: "#string_context" },
            { include: "source.cpp#comma" },
            { include: "source.cpp#scope_resolution_inner_generated" },
            { include: "#template_call_range_helper" },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.type.cpp"
            }
          ]
        },
        "15": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "16": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "18": { name: "comment.block.cpp" },
        "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "20": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "21": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "22": { name: "comment.block.cpp" },
        "23": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "24": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.type.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "25": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "26": {},
        "27": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "28": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "29": { name: "comment.block.cpp" },
        "30": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "31": {},
        "32": {
          patterns: [
            {
              match: /\*/dgv,
              name: "storage.modifier.pointer.cpp"
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              },
              name: "invalid.illegal.reference-type.cpp"
            },
            {
              match: /&/dgv,
              name: "storage.modifier.reference.cpp"
            }
          ]
        },
        "33": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "34": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "35": { name: "comment.block.cpp" },
        "36": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "37": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "38": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "39": { name: "comment.block.cpp" },
        "40": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "41": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "42": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "43": { name: "comment.block.cpp" },
        "44": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "45": { name: "variable.lower-case.cpp variable.other.assignment.cpp" },
        "46": { name: "variable.snake-case.cpp variable.other.assignment.cpp" },
        "47": { name: "variable.camel-case.cpp variable.other.assignment.cpp" },
        "48": { name: "variable.upper-case.cpp variable.other.assignment.cpp" },
        "49": { name: "variable.other.unknown.$49.cpp" },
        "50": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "51": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "52": { name: "comment.block.cpp" },
        "53": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "54": { name: "keyword.operator.assignment.compound.cpp" },
        "55": { name: "keyword.operator.assignment.compound.bitwise.cpp" },
        "56": { name: "keyword.operator.assignment.cpp" }
      },
      end: /(?=;)|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.assignment.cpp",
      patterns: [
        { include: "#normal_variable_assignment" },
        { include: "source.cpp#variable_assignment" },
        { include: "$self" }
      ]
    },
    normal_variable_declaration: {
      begin: {
        A: [new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:((?:(?:(?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:thread_local|volatile|register|restrict|static|extern|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\p{space}+)+)((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=(\\p{space}*))\\30)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\42)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\46)|\\*+(?!/))*))\\45)(\\*/))(?:(?=(\\p{space}*))\\48))+|(?:(?=(\\p{space}+))\\49)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\52)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\59)|\\*+(?!/))*))\\58)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\61)|\\*+(?!/))*))\\60)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\63)|\\*+(?!/))*))\\62)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\65)|\\*+(?!/))*))\\64)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\72))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\73))*>)(?:(?=(\\p{space}*))\\74))?::)*))\\51))((?:(?:(?=(\\p{space}*))\\76)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\80)|\\*+(?!/))*))\\79)(\\*/))(?:(?=(\\p{space}*))\\82))+|(?:(?=(\\p{space}+))\\83)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\86)|\\*+(?!/))*))\\85)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\88)|\\*+(?!/))*))\\87)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\90)|\\*+(?!/))*))\\89)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\92)|\\*+(?!/))*))\\91)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\94)|\\*+(?!/))*))\\93)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\95))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\96))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\97))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\98))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\99))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\102)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\106)|\\*+(?!/))*))\\105)(\\*/))(?:(?=(\\p{space}*))\\108))+|(?:(?=(\\p{space}+))\\109)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\111)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\115)|\\*+(?!/))*))\\114)(\\*/))(?:(?=(\\p{space}*))\\117))+|(?:(?=(\\p{space}+))\\118)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\120)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\124)|\\*+(?!/))*))\\123)(\\*/))(?:(?=(\\p{space}*))\\126))+|(?:(?=(\\p{space}+))\\127)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))((?:(?:(?=(\\p{space}*))\\134)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\138)|\\*+(?!/))*))\\137)(\\*/))(?:(?=(\\p{space}*))\\140))+|(?:(?=(\\p{space}+))\\141)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=[\\,\\;\\[])(?!(?:(?=([^\\=]+))\\142)=))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28, 30, 33, 36, 37, 39, 40, 42, 45, 46, 48, 49, 51, 52, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 76, 79, 80, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 102, 105, 106, 108, 109, 111, 114, 115, 117, 118, 120, 123, 124, 126, 127, 134, 137, 138, 140, 141, 142], lazyCompile: true }), new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:((?:(?:(?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:thread_local|volatile|register|restrict|static|extern|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\p{space}+)+)((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=(\\p{space}*))\\30)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\42)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\46)|\\*+(?!/))*))\\45)(\\*/))(?:(?=(\\p{space}*))\\48))+|(?:(?=(\\p{space}+))\\49)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\52)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\59)|\\*+(?!/))*))\\58)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\61)|\\*+(?!/))*))\\60)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\63)|\\*+(?!/))*))\\62)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\65)|\\*+(?!/))*))\\64)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\72))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\73))*>)(?:(?=(\\p{space}*))\\74))?::)*))\\51))((?:(?:(?=(\\p{space}*))\\76)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\80)|\\*+(?!/))*))\\79)(\\*/))(?:(?=(\\p{space}*))\\82))+|(?:(?=(\\p{space}+))\\83)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\86)|\\*+(?!/))*))\\85)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\88)|\\*+(?!/))*))\\87)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\90)|\\*+(?!/))*))\\89)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\92)|\\*+(?!/))*))\\91)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\94)|\\*+(?!/))*))\\93)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\95))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\96))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\97))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\98))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\99))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\102)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\106)|\\*+(?!/))*))\\105)(\\*/))(?:(?=(\\p{space}*))\\108))+|(?:(?=(\\p{space}+))\\109)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\111)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\115)|\\*+(?!/))*))\\114)(\\*/))(?:(?=(\\p{space}*))\\117))+|(?:(?=(\\p{space}+))\\118)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\120)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\124)|\\*+(?!/))*))\\123)(\\*/))(?:(?=(\\p{space}*))\\126))+|(?:(?=(\\p{space}+))\\127)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:\\b(?:(?:(?:([0-9a-z]+)|([0-9A-Za-z]+_[0-9A-Za-z]*))|([a-z]+[A-Z][0-9A-Za-z]*))|([A-Z][0-9A-Z_]*))\\b|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))((?:(?:(?=(\\p{space}*))\\134)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\138)|\\*+(?!/))*))\\137)(\\*/))(?:(?=(\\p{space}*))\\140))+|(?:(?=(\\p{space}+))\\141)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=[\\,\\;\\[])(?!(?:(?=([^\\=]+))\\142)=))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28, 30, 33, 36, 37, 39, 40, 42, 45, 46, 48, 49, 51, 52, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 76, 79, 80, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 102, 105, 106, 108, 109, 111, 114, 115, 117, 118, 120, 123, 124, 126, 127, 134, 137, 138, 140, 141, 142], lazyCompile: true })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "meta.declaration.cpp" },
        "6": {
          patterns: [
            { include: "source.cpp#storage_specifiers" }
          ]
        },
        "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "8": { name: "comment.block.cpp" },
        "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "10": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "11": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "12": { name: "comment.block.cpp" },
        "13": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "14": {
          name: "meta.qualified-type.cpp",
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "storage.type.$0.cpp"
            },
            { include: "#attributes_context" },
            { include: "#storage_types" },
            { include: "source.cpp#number_literal" },
            { include: "#string_context" },
            { include: "source.cpp#comma" },
            { include: "source.cpp#scope_resolution_inner_generated" },
            { include: "#template_call_range_helper" },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.type.cpp"
            }
          ]
        },
        "15": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "16": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "18": { name: "comment.block.cpp" },
        "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "20": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "21": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "22": { name: "comment.block.cpp" },
        "23": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "24": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.type.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "25": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "26": {},
        "27": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "28": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "29": { name: "comment.block.cpp" },
        "30": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "31": {},
        "32": {
          patterns: [
            {
              match: /\*/dgv,
              name: "storage.modifier.pointer.cpp"
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              },
              name: "invalid.illegal.reference-type.cpp"
            },
            {
              match: /&/dgv,
              name: "storage.modifier.reference.cpp"
            }
          ]
        },
        "33": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "34": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "35": { name: "comment.block.cpp" },
        "36": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "37": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "38": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "39": { name: "comment.block.cpp" },
        "40": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "41": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "42": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "43": { name: "comment.block.cpp" },
        "44": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "45": { name: "variable.lower-case.cpp variable.other.declare.cpp" },
        "46": { name: "variable.snake-case.cpp variable.other.declare.cpp" },
        "47": { name: "variable.camel-case.cpp variable.other.declare.cpp" },
        "48": { name: "variable.upper-case.cpp variable.other.declare.cpp" },
        "49": { name: "variable.other.unknown.$49.cpp" },
        "50": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "51": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "52": { name: "comment.block.cpp" },
        "53": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      end: /(?=;)|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.declaration.cpp",
      patterns: [
        { include: "#normal_variable_assignment" },
        { include: "source.cpp#variable_assignment" },
        { include: "$self" }
      ]
    },
    operator_overload: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:((?:(?=(\\p{space}*))\\11)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\23)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))(?:(?=(\\p{space}*))\\29))+|(?:(?=(\\p{space}+))\\30)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\33)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\40)|\\*+(?!/))*))\\39)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\42)|\\*+(?!/))*))\\41)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\44)|\\*+(?!/))*))\\43)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\46)|\\*+(?!/))*))\\45)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\48)|\\*+(?!/))*))\\47)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\49))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\50))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\51))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\52))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\53))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\54))*>)(?:(?=(\\p{space}*))\\55))?::)*))\\32))((?:(?:(?=(\\p{space}*))\\57)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\61)|\\*+(?!/))*))\\60)(\\*/))(?:(?=(\\p{space}*))\\63))+|(?:(?=(\\p{space}+))\\64)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\70)|\\*+(?!/))*))\\69)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\72)|\\*+(?!/))*))\\71)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\74)|\\*+(?!/))*))\\73)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\76)|\\*+(?!/))*))\\75)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\78)|\\*+(?!/))*))\\77)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\81))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\82))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\83))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\84))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\87)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\91)|\\*+(?!/))*))\\90)(\\*/))(?:(?=(\\p{space}*))\\93))+|(?:(?=(\\p{space}+))\\94)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\96)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\100)|\\*+(?!/))*))\\99)(\\*/))(?:(?=(\\p{space}*))\\102))+|(?:(?=(\\p{space}+))\\103)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\105)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\109)|\\*+(?!/))*))\\108)(\\*/))(?:(?=(\\p{space}*))\\111))+|(?:(?=(\\p{space}+))\\112)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\115)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\119)|\\*+(?!/))*))\\118)(\\*/))(?:(?=(\\p{space}*))\\121))+|(?:(?=(\\p{space}+))\\122)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:(?:(?=(\\p{space}*))\\124)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\128)|\\*+(?!/))*))\\127)(\\*/))(?:(?=(\\p{space}*))\\130))+|(?:(?=(\\p{space}+))\\131)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\134)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\138)|\\*+(?!/))*))\\137)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\141)|\\*+(?!/))*))\\140)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\143)|\\*+(?!/))*))\\142)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\145)|\\*+(?!/))*))\\144)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\147)|\\*+(?!/))*))\\146)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\149)|\\*+(?!/))*))\\148)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\150))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\151))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\152))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\153))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\154))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\155))*>)(?:(?=(\\p{space}*))\\156))?::)*))\\133))(operator)(?:((?:(?:(?=(\\p{space}*))\\159)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\163)|\\*+(?!/))*))\\162)(\\*/))(?:(?=(\\p{space}*))\\165))+|(?:(?=(\\p{space}+))\\166)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])const(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))?((?:(?:(?=(\\p{space}*))\\169)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\173)|\\*+(?!/))*))\\172)(\\*/))(?:(?=(\\p{space}*))\\175))+|(?:(?=(\\p{space}+))\\176)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\179)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\183)|\\*+(?!/))*))\\182)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\185)|\\*+(?!/))*))\\184)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\187)|\\*+(?!/))*))\\186)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\189)|\\*+(?!/))*))\\188)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\191)|\\*+(?!/))*))\\190)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\192))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\193))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\194))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\195))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\196))*>)(?:(?=(\\p{space}*))\\197))?::)*))\\178))(?:(?:(delete\\[\\]|delete|new\\[\\]|<=>|<<=|new|>>=|->\\*|/=|%=|&=|>=|\\|=|\\+\\+|--|\\(\\)|\\[\\]|->|\\+\\+|<<|>>|--|<=|\\^=|==|!=|&&|\\|\\||\\+=|-=|\\*=|[\\!\\%\\&\\*-\\-\\/\\<\\=\\>\\^\\|\\~])|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(((?:(?:(?=(\\p{space}*))\\202)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\206)|\\*+(?!/))*))\\205)(\\*/))(?:(?=(\\p{space}*))\\208))+|(?:(?=(\\p{space}+))\\209)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\211)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\215)|\\*+(?!/))*))\\214)(\\*/))(?:(?=(\\p{space}*))\\217))+|(?:(?=(\\p{space}+))\\218)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\220)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\224)|\\*+(?!/))*))\\223)(\\*/))(?:(?=(\\p{space}*))\\226))+|(?:(?=(\\p{space}+))\\227)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:\\[\\])?)))|(\"\")((?:(?:(?=(\\p{space}*))\\231)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\235)|\\*+(?!/))*))\\234)(\\*/))(?:(?=(\\p{space}*))\\237))+|(?:(?=(\\p{space}+))\\238)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))((?:(?:(?=(\\p{space}*))\\241)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\245)|\\*+(?!/))*))\\244)(\\*/))(?:(?=(\\p{space}*))\\247))+|(?:(?=(\\p{space}+))\\248)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=[\\(\\;\\<])", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 11, 14, 17, 18, 20, 21, 23, 26, 27, 29, 30, 32, 33, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 57, 60, 61, 63, 64, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 87, 90, 91, 93, 94, 96, 99, 100, 102, 103, 105, 108, 109, 111, 112, 115, 118, 119, 121, 122, 124, 127, 128, 130, 131, 133, 134, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 159, 162, 163, 165, 166, 169, 172, 173, 175, 176, 178, 179, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 202, 205, 206, 208, 209, 211, 214, 215, 217, 218, 220, 223, 224, 226, 227, 231, 234, 235, 237, 238, 241, 244, 245, 247, 248], lazyCompile: true }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:((?:(?=(\\p{space}*))\\11)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\23)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\27)|\\*+(?!/))*))\\26)(\\*/))(?:(?=(\\p{space}*))\\29))+|(?:(?=(\\p{space}+))\\30)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\33)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\40)|\\*+(?!/))*))\\39)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\42)|\\*+(?!/))*))\\41)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\44)|\\*+(?!/))*))\\43)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\46)|\\*+(?!/))*))\\45)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\48)|\\*+(?!/))*))\\47)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\49))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\50))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\51))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\52))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\53))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\54))*>)(?:(?=(\\p{space}*))\\55))?::)*))\\32))((?:(?:(?=(\\p{space}*))\\57)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\61)|\\*+(?!/))*))\\60)(\\*/))(?:(?=(\\p{space}*))\\63))+|(?:(?=(\\p{space}+))\\64)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\67)|\\*+(?!/))*))\\66)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\70)|\\*+(?!/))*))\\69)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\72)|\\*+(?!/))*))\\71)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\74)|\\*+(?!/))*))\\73)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\76)|\\*+(?!/))*))\\75)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\78)|\\*+(?!/))*))\\77)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\79))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\80))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\81))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\82))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\83))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\84))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\87)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\91)|\\*+(?!/))*))\\90)(\\*/))(?:(?=(\\p{space}*))\\93))+|(?:(?=(\\p{space}+))\\94)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\96)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\100)|\\*+(?!/))*))\\99)(\\*/))(?:(?=(\\p{space}*))\\102))+|(?:(?=(\\p{space}+))\\103)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\105)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\109)|\\*+(?!/))*))\\108)(\\*/))(?:(?=(\\p{space}*))\\111))+|(?:(?=(\\p{space}+))\\112)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:__(?:cdec|clrcal|stdcal|fastcal|thiscal|vectorcal)l)?)((?:(?:(?=(\\p{space}*))\\115)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\119)|\\*+(?!/))*))\\118)(\\*/))(?:(?=(\\p{space}*))\\121))+|(?:(?=(\\p{space}+))\\122)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:(?:(?=(\\p{space}*))\\124)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\128)|\\*+(?!/))*))\\127)(\\*/))(?:(?=(\\p{space}*))\\130))+|(?:(?=(\\p{space}+))\\131)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\134)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\138)|\\*+(?!/))*))\\137)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\141)|\\*+(?!/))*))\\140)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\143)|\\*+(?!/))*))\\142)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\145)|\\*+(?!/))*))\\144)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\147)|\\*+(?!/))*))\\146)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\149)|\\*+(?!/))*))\\148)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\150))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\151))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\152))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\153))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\154))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\155))*>)(?:(?=(\\p{space}*))\\156))?::)*))\\133))(operator)(?:((?:(?:(?=(\\p{space}*))\\159)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\163)|\\*+(?!/))*))\\162)(\\*/))(?:(?=(\\p{space}*))\\165))+|(?:(?=(\\p{space}+))\\166)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])const(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))?((?:(?:(?=(\\p{space}*))\\169)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\173)|\\*+(?!/))*))\\172)(\\*/))(?:(?=(\\p{space}*))\\175))+|(?:(?=(\\p{space}+))\\176)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\179)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\183)|\\*+(?!/))*))\\182)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\185)|\\*+(?!/))*))\\184)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\187)|\\*+(?!/))*))\\186)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\189)|\\*+(?!/))*))\\188)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\191)|\\*+(?!/))*))\\190)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\192))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\193))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\194))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\195))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\196))*>)(?:(?=(\\p{space}*))\\197))?::)*))\\178))(?:(?:(delete\\[\\]|delete|new\\[\\]|<=>|<<=|new|>>=|->\\*|/=|%=|&=|>=|\\|=|\\+\\+|--|\\(\\)|\\[\\]|->|\\+\\+|<<|>>|--|<=|\\^=|==|!=|&&|\\|\\||\\+=|-=|\\*=|[\\!\\%\\&\\*-\\-\\/\\<\\=\\>\\^\\|\\~])|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(((?:(?:(?=(\\p{space}*))\\202)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\206)|\\*+(?!/))*))\\205)(\\*/))(?:(?=(\\p{space}*))\\208))+|(?:(?=(\\p{space}+))\\209)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\211)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\215)|\\*+(?!/))*))\\214)(\\*/))(?:(?=(\\p{space}*))\\217))+|(?:(?=(\\p{space}+))\\218)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\220)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\224)|\\*+(?!/))*))\\223)(\\*/))(?:(?=(\\p{space}*))\\226))+|(?:(?=(\\p{space}+))\\227)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:\\[\\])?)))|(\"\")((?:(?:(?=(\\p{space}*))\\231)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\235)|\\*+(?!/))*))\\234)(\\*/))(?:(?=(\\p{space}*))\\237))+|(?:(?=(\\p{space}+))\\238)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))((?:(?:(?=(\\p{space}*))\\241)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\245)|\\*+(?!/))*))\\244)(\\*/))(?:(?=(\\p{space}*))\\247))+|(?:(?=(\\p{space}+))\\248)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=[\\(\\;\\<])", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 11, 14, 17, 18, 20, 21, 23, 26, 27, 29, 30, 32, 33, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 57, 60, 61, 63, 64, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 87, 90, 91, 93, 94, 96, 99, 100, 102, 103, 105, 108, 109, 111, 112, 115, 118, 119, 121, 122, 124, 127, 128, 130, 131, 133, 134, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 159, 162, 163, 165, 166, 169, 172, 173, 175, 176, 178, 179, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 202, 205, 206, 208, 209, 211, 214, 215, 217, 218, 220, 223, 224, 226, 227, 231, 234, 235, 237, 238, 241, 244, 245, 247, 248], lazyCompile: true })]
      },
      beginCaptures: {
        "0": { name: "meta.head.function.definition.special.operator-overload.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": {
          name: "meta.qualified-type.cpp",
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "storage.type.$0.cpp"
            },
            { include: "#attributes_context" },
            { include: "#storage_types" },
            { include: "source.cpp#number_literal" },
            { include: "#string_context" },
            { include: "source.cpp#comma" },
            { include: "source.cpp#scope_resolution_inner_generated" },
            { include: "#template_call_range_helper" },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.type.cpp"
            }
          ]
        },
        "6": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "7": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "9": { name: "comment.block.cpp" },
        "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "11": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "13": { name: "comment.block.cpp" },
        "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "15": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.type.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "16": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "17": {},
        "18": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "19": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "20": { name: "comment.block.cpp" },
        "21": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "22": {},
        "23": {
          patterns: [
            {
              match: /\*/dgv,
              name: "storage.modifier.pointer.cpp"
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              },
              name: "invalid.illegal.reference-type.cpp"
            },
            {
              match: /&/dgv,
              name: "storage.modifier.reference.cpp"
            }
          ]
        },
        "24": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "25": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "26": { name: "comment.block.cpp" },
        "27": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "28": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "29": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "30": { name: "comment.block.cpp" },
        "31": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "32": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "33": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "34": { name: "comment.block.cpp" },
        "35": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "36": { name: "storage.type.modifier.calling-convention.cpp" },
        "37": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "38": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "39": { name: "comment.block.cpp" },
        "40": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "41": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "42": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "43": { name: "comment.block.cpp" },
        "44": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "45": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.operator.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.operator.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "46": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "47": {},
        "48": { name: "keyword.other.operator.overload.cpp" },
        "49": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "50": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "51": { name: "comment.block.cpp" },
        "52": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "53": { name: "storage.modifier.const.cpp" },
        "54": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "55": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "56": { name: "comment.block.cpp" },
        "57": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "58": {
          patterns: [
            {
              match: /::/dgv,
              name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.operator-overload.cpp"
            },
            {
              match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
              name: "entity.name.scope-resolution.operator-overload.cpp"
            },
            { include: "#template_call_range_helper" }
          ]
        },
        "59": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "60": {},
        "61": { name: "entity.name.operator.cpp" },
        "62": { name: "entity.name.operator.type.cpp" },
        "63": {
          patterns: [
            {
              match: /\*/dgv,
              name: "entity.name.operator.type.pointer.cpp"
            },
            {
              captures: {
                "1": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "3": { name: "comment.block.cpp" },
                "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
              },
              name: "invalid.illegal.reference-type.cpp"
            },
            {
              match: /&/dgv,
              name: "entity.name.operator.type.reference.cpp"
            }
          ]
        },
        "64": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "65": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "66": { name: "comment.block.cpp" },
        "67": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "68": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "69": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "70": { name: "comment.block.cpp" },
        "71": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "72": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "73": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "74": { name: "comment.block.cpp" },
        "75": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "76": { name: "entity.name.operator.type.array.cpp" },
        "77": { name: "entity.name.operator.custom-literal.cpp" },
        "78": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "79": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "80": { name: "comment.block.cpp" },
        "81": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "82": { name: "entity.name.operator.custom-literal.cpp" },
        "83": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "84": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "85": { name: "comment.block.cpp" },
        "86": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      end: /(?:(?<=\}|%>|\?\?>)|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.function.definition.special.operator-overload.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.function.definition.special.operator-overload.cpp" }
          },
          name: "meta.head.function.definition.special.operator-overload.cpp",
          patterns: [
            { include: "#ever_present_context" },
            { include: "#template_call_range_helper" },
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.section.parameters.begin.bracket.round.special.operator-overload.cpp" }
              },
              contentName: "meta.function.definition.parameters.special.operator-overload",
              end: /\)|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.parameters.end.bracket.round.special.operator-overload.cpp" }
              },
              patterns: [
                { include: "#function_parameter_context" },
                { include: "#evaluation_context" }
              ]
            },
            { include: "#qualifiers_and_specifiers_post_parameters" },
            {
              captures: {
                "1": { name: "keyword.operator.assignment.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "keyword.other.default.function.cpp" },
                "7": { name: "keyword.other.delete.function.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("(=)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(default)|(delete))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.function.definition.special.operator-overload.cpp" }
          },
          name: "meta.body.function.definition.special.operator-overload.cpp",
          patterns: [
            { include: "#function_body_context" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.function.definition.special.operator-overload.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    operators: {
      patterns: [
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])sizeof(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])sizeof(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
          },
          beginCaptures: {
            "1": { name: "keyword.operator.functionlike.cpp keyword.operator.sizeof.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.sizeof.cpp" }
          },
          contentName: "meta.arguments.operator.sizeof",
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.operator.sizeof.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])alignof(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])alignof(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
          },
          beginCaptures: {
            "1": { name: "keyword.operator.functionlike.cpp keyword.operator.alignof.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.alignof.cpp" }
          },
          contentName: "meta.arguments.operator.alignof",
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.operator.alignof.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])alignas(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])alignas(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
          },
          beginCaptures: {
            "1": { name: "keyword.operator.functionlike.cpp keyword.operator.alignas.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.alignas.cpp" }
          },
          contentName: "meta.arguments.operator.alignas",
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.operator.alignas.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])typeid(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])typeid(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
          },
          beginCaptures: {
            "1": { name: "keyword.operator.functionlike.cpp keyword.operator.typeid.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.typeid.cpp" }
          },
          contentName: "meta.arguments.operator.typeid",
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.operator.typeid.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])noexcept(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])noexcept(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
          },
          beginCaptures: {
            "1": { name: "keyword.operator.functionlike.cpp keyword.operator.noexcept.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.noexcept.cpp" }
          },
          contentName: "meta.arguments.operator.noexcept",
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.operator.noexcept.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          begin: {
            A: [new EmulatedRegExp("\\b(sizeof\\.\\.\\.)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("\\b(sizeof\\.\\.\\.)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
          },
          beginCaptures: {
            "1": { name: "keyword.operator.functionlike.cpp keyword.operator.sizeof.variadic.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.sizeof.variadic.cpp" }
          },
          contentName: "meta.arguments.operator.sizeof.variadic",
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.operator.sizeof.variadic.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          match: /--/dgv,
          name: "keyword.operator.decrement.cpp"
        },
        {
          match: /\+\+/dgv,
          name: "keyword.operator.increment.cpp"
        },
        {
          match: /<<|>>/dgv,
          name: "keyword.operator.bitwise.shift.cpp"
        },
        {
          match: /!=|<=|>=|==|[\<\>]/dgv,
          name: "keyword.operator.comparison.cpp"
        },
        {
          match: /&&|!|\|\|/dgv,
          name: "keyword.operator.logical.cpp"
        },
        {
          match: /[\&\^\|\~]/dgv,
          name: "keyword.operator.bitwise.cpp"
        },
        {
          captures: {
            "1": { name: "keyword.operator.assignment.compound.cpp" },
            "2": { name: "keyword.operator.assignment.compound.bitwise.cpp" },
            "3": { name: "keyword.operator.assignment.cpp" }
          },
          match: /((?:[\-\%\*\+]|(?<!\()\/)=)|((?:[\&\^]|<<|>>|\|)=)|(=)/dgv
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.cpp"
        },
        { include: "#ternary_operator" }
      ]
    },
    parameter: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      end: /(?:(?=\))|(,))|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "1": { name: "punctuation.separator.delimiter.comma.cpp" }
      },
      name: "meta.parameter.cpp",
      patterns: [
        { include: "#ever_present_context" },
        { include: "#string_context" },
        { include: "#function_pointer_parameter" },
        { include: "#decltype" },
        { include: "source.cpp#vararg_ellipses" },
        {
          captures: {
            "1": {
              patterns: [
                { include: "#storage_types" }
              ]
            },
            "2": { name: "storage.modifier.specifier.parameter.cpp" },
            "3": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "4": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "5": { name: "comment.block.cpp" },
            "6": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "7": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "9": { name: "comment.block.cpp" },
            "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "11": { name: "storage.type.primitive.cpp storage.type.built-in.primitive.cpp" },
            "12": { name: "storage.type.cpp storage.type.built-in.cpp" },
            "13": { name: "support.type.posix-reserved.pthread.cpp support.type.built-in.posix-reserved.pthread.cpp" },
            "14": { name: "support.type.posix-reserved.cpp support.type.built-in.posix-reserved.cpp" },
            "15": { name: "entity.name.type.parameter.cpp" },
            "16": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "18": { name: "comment.block.cpp" },
            "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("((?:(thread_local|volatile|register|restrict|static|extern|const)((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))+)((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?=(\\p{space}*))\\21)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:(?:(unsigned|wchar_t|double|signed|short|float|auto|void|long|char|bool|int)|(uint_least32_t|uint_least64_t|uint_least16_t|uint_fast64_t|uint_least8_t|int_least64_t|int_least32_t|int_least16_t|uint_fast16_t|uint_fast32_t|int_least8_t|int_fast16_t|int_fast32_t|int_fast64_t|uint_fast8_t|int_fast8_t|suseconds_t|useconds_t|uintmax_t|in_port_t|uintmax_t|in_addr_t|blksize_t|uintptr_t|intmax_t|intptr_t|blkcnt_t|intmax_t|u_quad_t|uint16_t|uint32_t|uint64_t|ssize_t|fixpt_t|qaddr_t|u_short|int16_t|int32_t|int64_t|uint8_t|daddr_t|caddr_t|swblk_t|clock_t|segsz_t|nlink_t|time_t|u_long|ushort|quad_t|mode_t|size_t|u_char|int8_t|u_int|uid_t|off_t|pid_t|gid_t|dev_t|div_t|key_t|ino_t|id_t|uint))|(pthread_(?:rwlockattr_|mutexattr_|condattr_|rwlock_|mutex_|cond_|attr_|once_|key_|)t))|([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*_t))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\b\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:thread_local|volatile|register|restrict|static|extern|const))))((?:(?:(?=(\\p{space}*))\\28)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))(?:(?=(\\p{space}*))\\34))+|(?:(?=(\\p{space}+))\\35)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=[\\)\\,\\=])", "dgv", { hiddenCaptures: [4, 7, 8, 10, 11, 13, 16, 17, 19, 20, 21, 28, 31, 32, 34, 35] }), new EmulatedRegExp("((?:(thread_local|volatile|register|restrict|static|extern|const)((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))+)((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?=(\\p{space}*))\\21)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:(?:(unsigned|wchar_t|double|signed|short|float|auto|void|long|char|bool|int)|(uint_least32_t|uint_least64_t|uint_least16_t|uint_fast64_t|uint_least8_t|int_least64_t|int_least32_t|int_least16_t|uint_fast16_t|uint_fast32_t|int_least8_t|int_fast16_t|int_fast32_t|int_fast64_t|uint_fast8_t|int_fast8_t|suseconds_t|useconds_t|uintmax_t|in_port_t|uintmax_t|in_addr_t|blksize_t|uintptr_t|intmax_t|intptr_t|blkcnt_t|intmax_t|u_quad_t|uint16_t|uint32_t|uint64_t|ssize_t|fixpt_t|qaddr_t|u_short|int16_t|int32_t|int64_t|uint8_t|daddr_t|caddr_t|swblk_t|clock_t|segsz_t|nlink_t|time_t|u_long|ushort|quad_t|mode_t|size_t|u_char|int8_t|u_int|uid_t|off_t|pid_t|gid_t|dev_t|div_t|key_t|ino_t|id_t|uint))|(pthread_(?:rwlockattr_|mutexattr_|condattr_|rwlock_|mutex_|cond_|attr_|once_|key_|)t))|([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*_t))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\b\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:thread_local|volatile|register|restrict|static|extern|const))))((?:(?:(?=(\\p{space}*))\\28)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))(?:(?=(\\p{space}*))\\34))+|(?:(?=(\\p{space}+))\\35)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=[\\)\\,\\=])", "dgv", { hiddenCaptures: [4, 7, 8, 10, 11, 13, 16, 17, 19, 20, 21, 28, 31, 32, 34, 35] })]
          }
        },
        { include: "#storage_types" },
        { include: "source.cpp#scope_resolution_parameter_inner_generated" },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "storage.type.$0.cpp"
        },
        {
          begin: /(?<==)/dgv,
          beginCaptures: {},
          end: /(?:(?=\))|(,))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.delimiter.comma.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.cpp"
        },
        {
          captures: {
            "1": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "3": { name: "comment.block.cpp" },
            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "5": { name: "variable.parameter.cpp" },
            "6": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "8": { name: "comment.block.cpp" },
            "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("(?<![\\(\\,\\:\\p{space}])((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=[\\n\\)\\,\\=\\[])", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19] }), new EmulatedRegExp("(?<![\\(\\,\\:\\p{space}])((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=[\\n\\)\\,\\=\\[])", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19] })]
          }
        },
        { include: "#attributes_context" },
        {
          begin: /\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.begin.bracket.square.array.type.cpp" }
          },
          end: /\]|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.end.bracket.square.array.type.cpp" }
          },
          name: "meta.bracket.square.array.cpp",
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*\b(?<!(?:[^\p{L}\p{M}\p{N}\p{Pc}]|^)(?:struct|class|union|enum))/dgv,
          name: "entity.name.type.parameter.cpp"
        },
        { include: "#template_call_range_helper" },
        {
          captures: {
            "0": {
              patterns: [
                {
                  match: /\*/dgv,
                  name: "storage.modifier.pointer.cpp"
                },
                {
                  captures: {
                    "1": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "3": { name: "comment.block.cpp" },
                    "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                  },
                  name: "invalid.illegal.reference-type.cpp"
                },
                {
                  match: /&/dgv,
                  name: "storage.modifier.reference.cpp"
                }
              ]
            },
            "1": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "3": { name: "comment.block.cpp" },
            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "5": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "6": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "7": { name: "comment.block.cpp" },
            "8": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\11)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\15)|\\*+(?!/))*))\\14)(\\*/))(?:(?=(\\p{space}*))\\17))+|(?:(?=(\\p{space}+))\\18)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*]", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 11, 14, 15, 17, 18] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\11)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\15)|\\*+(?!/))*))\\14)(\\*/))(?:(?=(\\p{space}*))\\17))+|(?:(?=(\\p{space}+))\\18)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*]", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 11, 14, 15, 17, 18] })]
          }
        },
        { include: "#ever_present_context" }
      ]
    },
    parameter_or_maybe_value: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}])", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
      },
      end: /(?:(?=\))|(,))|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "1": { name: "punctuation.separator.delimiter.comma.cpp" }
      },
      name: "meta.parameter.cpp",
      patterns: [
        { include: "#ever_present_context" },
        { include: "#function_pointer_parameter" },
        { include: "source.cpp#memory_operators" },
        { include: "#builtin_storage_type_initilizer" },
        { include: "#curly_initializer" },
        { include: "#decltype" },
        { include: "source.cpp#vararg_ellipses" },
        {
          captures: {
            "1": {
              patterns: [
                { include: "#storage_types" }
              ]
            },
            "2": { name: "storage.modifier.specifier.parameter.cpp" },
            "3": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "4": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "5": { name: "comment.block.cpp" },
            "6": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "7": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "9": { name: "comment.block.cpp" },
            "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "11": { name: "storage.type.primitive.cpp storage.type.built-in.primitive.cpp" },
            "12": { name: "storage.type.cpp storage.type.built-in.cpp" },
            "13": { name: "support.type.posix-reserved.pthread.cpp support.type.built-in.posix-reserved.pthread.cpp" },
            "14": { name: "support.type.posix-reserved.cpp support.type.built-in.posix-reserved.cpp" },
            "15": { name: "entity.name.type.parameter.cpp" },
            "16": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "18": { name: "comment.block.cpp" },
            "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("((?:(thread_local|volatile|register|restrict|static|extern|const)((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))+)((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?=(\\p{space}*))\\21)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:(?:(unsigned|wchar_t|double|signed|short|float|auto|void|long|char|bool|int)|(uint_least32_t|uint_least64_t|uint_least16_t|uint_fast64_t|uint_least8_t|int_least64_t|int_least32_t|int_least16_t|uint_fast16_t|uint_fast32_t|int_least8_t|int_fast16_t|int_fast32_t|int_fast64_t|uint_fast8_t|int_fast8_t|suseconds_t|useconds_t|uintmax_t|in_port_t|uintmax_t|in_addr_t|blksize_t|uintptr_t|intmax_t|intptr_t|blkcnt_t|intmax_t|u_quad_t|uint16_t|uint32_t|uint64_t|ssize_t|fixpt_t|qaddr_t|u_short|int16_t|int32_t|int64_t|uint8_t|daddr_t|caddr_t|swblk_t|clock_t|segsz_t|nlink_t|time_t|u_long|ushort|quad_t|mode_t|size_t|u_char|int8_t|u_int|uid_t|off_t|pid_t|gid_t|dev_t|div_t|key_t|ino_t|id_t|uint))|(pthread_(?:rwlockattr_|mutexattr_|condattr_|rwlock_|mutex_|cond_|attr_|once_|key_|)t))|([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*_t))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\b\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:thread_local|volatile|register|restrict|static|extern|const))))((?:(?:(?=(\\p{space}*))\\28)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))(?:(?=(\\p{space}*))\\34))+|(?:(?=(\\p{space}+))\\35)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=[\\)\\,\\=])", "dgv", { hiddenCaptures: [4, 7, 8, 10, 11, 13, 16, 17, 19, 20, 21, 28, 31, 32, 34, 35] }), new EmulatedRegExp("((?:(thread_local|volatile|register|restrict|static|extern|const)((?:(?:(?=(\\p{space}*))\\4)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\8)|\\*+(?!/))*))\\7)(\\*/))(?:(?=(\\p{space}*))\\10))+|(?:(?=(\\p{space}+))\\11)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))+)((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?=(\\p{space}*))\\21)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?:(?:(unsigned|wchar_t|double|signed|short|float|auto|void|long|char|bool|int)|(uint_least32_t|uint_least64_t|uint_least16_t|uint_fast64_t|uint_least8_t|int_least64_t|int_least32_t|int_least16_t|uint_fast16_t|uint_fast32_t|int_least8_t|int_fast16_t|int_fast32_t|int_fast64_t|uint_fast8_t|int_fast8_t|suseconds_t|useconds_t|uintmax_t|in_port_t|uintmax_t|in_addr_t|blksize_t|uintptr_t|intmax_t|intptr_t|blkcnt_t|intmax_t|u_quad_t|uint16_t|uint32_t|uint64_t|ssize_t|fixpt_t|qaddr_t|u_short|int16_t|int32_t|int64_t|uint8_t|daddr_t|caddr_t|swblk_t|clock_t|segsz_t|nlink_t|time_t|u_long|ushort|quad_t|mode_t|size_t|u_char|int8_t|u_int|uid_t|off_t|pid_t|gid_t|dev_t|div_t|key_t|ino_t|id_t|uint))|(pthread_(?:rwlockattr_|mutexattr_|condattr_|rwlock_|mutex_|cond_|attr_|once_|key_|)t))|([A-Z_a-z][\\p{L}\\p{M}\\p{N}\\p{Pc}]*_t))(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\b\\b(?<!(?:[^\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(?:thread_local|volatile|register|restrict|static|extern|const))))((?:(?:(?=(\\p{space}*))\\28)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\32)|\\*+(?!/))*))\\31)(\\*/))(?:(?=(\\p{space}*))\\34))+|(?:(?=(\\p{space}+))\\35)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=[\\)\\,\\=])", "dgv", { hiddenCaptures: [4, 7, 8, 10, 11, 13, 16, 17, 19, 20, 21, 28, 31, 32, 34, 35] })]
          }
        },
        { include: "#storage_types" },
        { include: "#function_call" },
        { include: "source.cpp#scope_resolution_parameter_inner_generated" },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "storage.type.$0.cpp"
        },
        {
          begin: /(?<==)/dgv,
          beginCaptures: {},
          end: /(?:(?=\))|(,))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.separator.delimiter.comma.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          captures: {
            "1": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "3": { name: "comment.block.cpp" },
            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "5": { name: "variable.parameter.cpp" },
            "6": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "8": { name: "comment.block.cpp" },
            "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("(?<![\\(\\,\\:\\p{space}])((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?=[\\)\\,\\=\\[]|//|(?:\\n|(?=\\n?$)))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19] }), new EmulatedRegExp("(?<![\\(\\,\\:\\p{space}])((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?=[\\)\\,\\=\\[]|//|(?:\\n|(?=\\n?$)))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19] })]
          }
        },
        { include: "#attributes_context" },
        {
          begin: /\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.begin.bracket.square.array.type.cpp" }
          },
          end: /\]|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.end.bracket.square.array.type.cpp" }
          },
          name: "meta.bracket.square.array.cpp",
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*\b(?<!(?:[^\p{L}\p{M}\p{N}\p{Pc}]|^)(?:struct|class|union|enum))/dgv,
          name: "entity.name.type.parameter.cpp"
        },
        { include: "#template_call_range_helper" },
        {
          captures: {
            "0": {
              patterns: [
                {
                  match: /\*/dgv,
                  name: "storage.modifier.pointer.cpp"
                },
                {
                  captures: {
                    "1": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "3": { name: "comment.block.cpp" },
                    "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                  },
                  name: "invalid.illegal.reference-type.cpp"
                },
                {
                  match: /&/dgv,
                  name: "storage.modifier.reference.cpp"
                }
              ]
            },
            "1": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "3": { name: "comment.block.cpp" },
            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "5": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "6": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "7": { name: "comment.block.cpp" },
            "8": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\11)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\15)|\\*+(?!/))*))\\14)(\\*/))(?:(?=(\\p{space}*))\\17))+|(?:(?=(\\p{space}+))\\18)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*]", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 11, 14, 15, 17, 18] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\11)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\15)|\\*+(?!/))*))\\14)(\\*/))(?:(?=(\\p{space}*))\\17))+|(?:(?=(\\p{space}+))\\18)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*]", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 11, 14, 15, 17, 18] })]
          }
        },
        { include: "#evaluation_context" },
        { include: "#ever_present_context" }
      ]
    },
    parentheses: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.parens.begin.bracket.round.cpp" }
      },
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.end.bracket.round.cpp" }
      },
      name: "meta.parens.cpp",
      patterns: [
        { include: "#range_for_inner" },
        { include: "source.cpp#over_qualified_types" },
        {
          match: /(?<!:):(?!:)/dgv,
          name: "punctuation.separator.colon.range-based.cpp"
        },
        { include: "#evaluation_context" }
      ]
    },
    pragma: {
      begin: {
        A: [new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(#)(?:\\p{space}+)?pragma\\b", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(#)(?:\\p{space}+)?pragma\\b", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "0": { name: "keyword.control.directive.pragma.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "punctuation.definition.directive.cpp" }
      },
      end: /(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$)))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.preprocessor.pragma.cpp",
      patterns: [
        { include: "#comments" },
        { include: "#string_context" },
        {
          match: /[\$A-Z_a-z][\-\$\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "entity.other.attribute-name.pragma.preprocessor.cpp"
        },
        { include: "source.cpp#preprocessor_number_literal" },
        { include: "source.cpp#line_continuation_character" }
      ]
    },
    preprocessor_conditional_context: {
      patterns: [
        { include: "#preprocessor_conditional_defined" },
        { include: "#comments" },
        { include: "source.cpp#language_constants" },
        { include: "#string_context" },
        { include: "source.cpp#preprocessor_number_literal" },
        { include: "#operators" },
        { include: "source.cpp#predefined_macros" },
        { include: "source.cpp#macro_name" },
        { include: "source.cpp#line_continuation_character" }
      ]
    },
    preprocessor_conditional_defined: {
      begin: /((?<![\p{L}\p{M}\p{N}\p{Pc}])defined(?![\p{L}\p{M}\p{N}\p{Pc}]))(\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.directive.conditional.defined.cpp" },
        "2": { name: "punctuation.section.parens.control.defined.cpp" }
      },
      end: /(?:\)|(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$))))|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.control.defined.cpp" }
      },
      patterns: [
        { include: "source.cpp#macro_name" }
      ]
    },
    preprocessor_conditional_parentheses: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.parens.begin.bracket.round.cpp" }
      },
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.end.bracket.round.cpp" }
      },
      name: "meta.parens.preprocessor.conditional.cpp"
    },
    preprocessor_conditional_range: {
      begin: {
        A: [new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(#)(?:\\p{space}+)?(if(?:n?def|))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("^((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(#)(?:\\p{space}+)?(if(?:n?def|))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "0": { name: "keyword.control.directive.conditional.$6.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "punctuation.definition.directive.cpp" },
        "6": {}
      },
      contentName: "meta.preprocessor.conditional",
      end: /(?<!\\)(?:(?=\n)|(?<=(?:^|[^\\])\n)(?=(?=\n?$)))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      patterns: [
        { include: "#preprocessor_conditional_context" }
      ]
    },
    preprocessor_context: {
      patterns: [
        { include: "source.cpp#pragma_mark" },
        { include: "#pragma" },
        { include: "source.cpp#include" },
        { include: "#line" },
        { include: "#diagnostic" },
        { include: "source.cpp#undef" },
        { include: "#preprocessor_conditional_range" },
        { include: "#macro" },
        { include: "source.cpp#preprocessor_conditional_standalone" },
        { include: "source.cpp#macro_argument" }
      ]
    },
    qualifiers_and_specifiers_post_parameters: {
      patterns: [
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])requires(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])requires(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
          },
          beginCaptures: {
            "1": { name: "keyword.other.functionlike.cpp keyword.other.requires.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": { name: "punctuation.section.arguments.begin.bracket.round.requires.cpp" }
          },
          contentName: "meta.arguments.requires",
          end: /\)|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.arguments.end.bracket.round.requires.cpp" }
          },
          patterns: [
            { include: "#evaluation_context" }
          ]
        },
        {
          captures: {
            "1": {
              patterns: [
                {
                  captures: {
                    "1": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "3": { name: "comment.block.cpp" },
                    "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "5": { name: "storage.modifier.specifier.functional.post-parameters.$5.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                  }
                }
              ]
            }
          },
          match: {
            A: [new EmulatedRegExp("((?:(?:(?:(?:(?=(\\p{space}*))\\2)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\4)|\\*+(?!/))*))\\3)\\*/(?:(?=(\\p{space}*))\\5))+|(?:(?=(\\p{space}+))\\6)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))+)(?=\\p{space}*[\\n\\r\\;\\=\\{])", "dgv", { hiddenCaptures: [2, 3, 4, 5, 6] }), new EmulatedRegExp("((?:(?:(?:(?:(?=(\\p{space}*))\\2)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\4)|\\*+(?!/))*))\\3)\\*/(?:(?=(\\p{space}*))\\5))+|(?:(?=(\\p{space}+))\\6)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))+)(?=\\p{space}*[\\n\\r\\;\\=\\{])", "dgv", { hiddenCaptures: [2, 3, 4, 5, 6] })]
          }
        }
      ]
    },
    range_for_inner: {
      begin: /(?<=(?:[^\p{L}\p{M}\p{N}\p{Pc}]|^)for ?\()/dgv,
      beginCaptures: {},
      end: /(?=\))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.parens.control.for.cpp",
      patterns: [
        {
          captures: {
            "1": { name: "meta.type.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#storage_specifiers" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "8": { name: "comment.block.cpp" },
            "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "10": {
              name: "meta.qualified-type.cpp",
              patterns: [
                {
                  match: /::/dgv,
                  name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
                },
                {
                  match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "storage.type.$0.cpp"
                },
                { include: "#attributes_context" },
                { include: "#storage_types" },
                { include: "source.cpp#number_literal" },
                { include: "#string_context" },
                { include: "source.cpp#comma" },
                { include: "source.cpp#scope_resolution_inner_generated" },
                { include: "#template_call_range_helper" },
                {
                  match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
                  name: "entity.name.type.cpp"
                }
              ]
            },
            "11": {
              patterns: [
                { include: "#attributes_context" },
                { include: "source.cpp#number_literal" }
              ]
            },
            "12": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "14": { name: "comment.block.cpp" },
            "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "16": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "18": { name: "comment.block.cpp" },
            "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "20": {
              patterns: [
                {
                  match: /::/dgv,
                  name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
                },
                {
                  match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "entity.name.scope-resolution.type.cpp"
                },
                { include: "#template_call_range_helper" }
              ]
            },
            "21": {
              patterns: [
                { include: "#template_call_range_helper" }
              ]
            },
            "22": {},
            "23": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "24": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "25": { name: "comment.block.cpp" },
            "26": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "27": {},
            "28": {
              patterns: [
                {
                  match: /\*/dgv,
                  name: "storage.modifier.pointer.cpp"
                },
                {
                  captures: {
                    "1": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "3": { name: "comment.block.cpp" },
                    "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                  },
                  name: "invalid.illegal.reference-type.cpp"
                },
                {
                  match: /&/dgv,
                  name: "storage.modifier.reference.cpp"
                }
              ]
            },
            "29": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "30": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "31": { name: "comment.block.cpp" },
            "32": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "33": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "34": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "35": { name: "comment.block.cpp" },
            "36": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "37": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "38": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "39": { name: "comment.block.cpp" },
            "40": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "41": { name: "variable.other.object.declare.for.cpp" },
            "42": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "43": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "44": { name: "comment.block.cpp" },
            "45": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "46": { name: "punctuation.separator.colon.range-based.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("((?:((?:(?:(?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:thread_local|volatile|register|restrict|static|extern|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\p{space}+)+)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=(\\p{space}*))\\21)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\43)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\47)|\\*+(?!/))*))\\46)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\50)|\\*+(?!/))*))\\49)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\59))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\60))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\61))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\62))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)(?:(?=(\\p{space}*))\\65))?::)*))\\42))((?:(?:(?=(\\p{space}*))\\67)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\71)|\\*+(?!/))*))\\70)(\\*/))(?:(?=(\\p{space}*))\\73))+|(?:(?=(\\p{space}+))\\74)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\79)|\\*+(?!/))*))\\78)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\81)|\\*+(?!/))*))\\80)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\83)|\\*+(?!/))*))\\82)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\85)|\\*+(?!/))*))\\84)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\86))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\87))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\88))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\89))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\90))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\93)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\97)|\\*+(?!/))*))\\96)(\\*/))(?:(?=(\\p{space}*))\\99))+|(?:(?=(\\p{space}+))\\100)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\102)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\106)|\\*+(?!/))*))\\105)(\\*/))(?:(?=(\\p{space}*))\\108))+|(?:(?=(\\p{space}+))\\109)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?)((?:(?:(?=(\\p{space}*))\\111)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\115)|\\*+(?!/))*))\\114)(\\*/))(?:(?=(\\p{space}*))\\117))+|(?:(?=(\\p{space}+))\\118)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\121)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\125)|\\*+(?!/))*))\\124)(\\*/))(?:(?=(\\p{space}*))\\127))+|(?:(?=(\\p{space}+))\\128)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(:)(?!:)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40, 42, 43, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 70, 71, 73, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 93, 96, 97, 99, 100, 102, 105, 106, 108, 109, 111, 114, 115, 117, 118, 121, 124, 125, 127, 128], lazyCompile: true }), new EmulatedRegExp("((?:((?:(?:(?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:thread_local|volatile|register|restrict|static|extern|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\p{space}+)+)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=(\\p{space}*))\\21)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\43)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\47)|\\*+(?!/))*))\\46)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\50)|\\*+(?!/))*))\\49)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\59))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\60))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\61))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\62))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)(?:(?=(\\p{space}*))\\65))?::)*))\\42))((?:(?:(?=(\\p{space}*))\\67)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\71)|\\*+(?!/))*))\\70)(\\*/))(?:(?=(\\p{space}*))\\73))+|(?:(?=(\\p{space}+))\\74)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\79)|\\*+(?!/))*))\\78)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\81)|\\*+(?!/))*))\\80)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\83)|\\*+(?!/))*))\\82)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\85)|\\*+(?!/))*))\\84)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\86))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\87))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\88))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\89))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\90))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\93)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\97)|\\*+(?!/))*))\\96)(\\*/))(?:(?=(\\p{space}*))\\99))+|(?:(?=(\\p{space}+))\\100)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\102)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\106)|\\*+(?!/))*))\\105)(\\*/))(?:(?=(\\p{space}*))\\108))+|(?:(?=(\\p{space}+))\\109)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?)((?:(?:(?=(\\p{space}*))\\111)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\115)|\\*+(?!/))*))\\114)(\\*/))(?:(?=(\\p{space}*))\\117))+|(?:(?=(\\p{space}+))\\118)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)((?:(?:(?=(\\p{space}*))\\121)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\125)|\\*+(?!/))*))\\124)(\\*/))(?:(?=(\\p{space}*))\\127))+|(?:(?=(\\p{space}+))\\128)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(:)(?!:)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40, 42, 43, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 70, 71, 73, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 93, 96, 97, 99, 100, 102, 105, 106, 108, 109, 111, 114, 115, 117, 118, 121, 124, 125, 127, 128], lazyCompile: true })]
          }
        },
        {
          captures: {
            "1": { name: "meta.type.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#storage_specifiers" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "8": { name: "comment.block.cpp" },
            "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "10": {
              name: "meta.qualified-type.cpp",
              patterns: [
                {
                  match: /::/dgv,
                  name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
                },
                {
                  match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "storage.type.$0.cpp"
                },
                { include: "#attributes_context" },
                { include: "#storage_types" },
                { include: "source.cpp#number_literal" },
                { include: "#string_context" },
                { include: "source.cpp#comma" },
                { include: "source.cpp#scope_resolution_inner_generated" },
                { include: "#template_call_range_helper" },
                {
                  match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
                  name: "entity.name.type.cpp"
                }
              ]
            },
            "11": {
              patterns: [
                { include: "#attributes_context" },
                { include: "source.cpp#number_literal" }
              ]
            },
            "12": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "14": { name: "comment.block.cpp" },
            "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "16": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "18": { name: "comment.block.cpp" },
            "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "20": {
              patterns: [
                {
                  match: /::/dgv,
                  name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
                },
                {
                  match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "entity.name.scope-resolution.type.cpp"
                },
                { include: "#template_call_range_helper" }
              ]
            },
            "21": {
              patterns: [
                { include: "#template_call_range_helper" }
              ]
            },
            "23": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "24": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "25": { name: "comment.block.cpp" },
            "26": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "28": {
              patterns: [
                {
                  match: /\*/dgv,
                  name: "storage.modifier.pointer.cpp"
                },
                {
                  captures: {
                    "1": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "3": { name: "comment.block.cpp" },
                    "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                  },
                  name: "invalid.illegal.reference-type.cpp"
                },
                {
                  match: /&/dgv,
                  name: "storage.modifier.reference.cpp"
                }
              ]
            },
            "29": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "30": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "31": { name: "comment.block.cpp" },
            "32": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "33": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "34": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "35": { name: "comment.block.cpp" },
            "36": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "37": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "38": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "39": { name: "comment.block.cpp" },
            "40": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "41": { name: "punctuation.definition.begin.bracket.square.binding.cpp" },
            "42": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "43": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "44": { name: "comment.block.cpp" },
            "45": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "46": { name: "variable.other.for.cpp" },
            "47": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "48": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "49": { name: "comment.block.cpp" },
            "50": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "51": { name: "punctuation.separator.delimiter.comma.cpp" },
            "52": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "53": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "54": { name: "comment.block.cpp" },
            "55": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "56": { name: "variable.other.for.cpp" },
            "57": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "58": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "59": { name: "comment.block.cpp" },
            "60": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "61": { name: "punctuation.definition.end.bracket.square.binding.cpp" },
            "62": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "63": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "64": { name: "comment.block.cpp" },
            "65": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "66": { name: "punctuation.separator.colon.range-based.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("((?:((?:(?:(?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:thread_local|volatile|register|restrict|static|extern|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\p{space}+)+)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=(\\p{space}*))\\21)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\43)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\47)|\\*+(?!/))*))\\46)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\50)|\\*+(?!/))*))\\49)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\59))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\60))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\61))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\62))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)(?:(?=(\\p{space}*))\\65))?::)*))\\42))((?:(?:(?=(\\p{space}*))\\67)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\71)|\\*+(?!/))*))\\70)(\\*/))(?:(?=(\\p{space}*))\\73))+|(?:(?=(\\p{space}+))\\74)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\79)|\\*+(?!/))*))\\78)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\81)|\\*+(?!/))*))\\80)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\83)|\\*+(?!/))*))\\82)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\85)|\\*+(?!/))*))\\84)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\86))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\87))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\88))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\89))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\90))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\93)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\97)|\\*+(?!/))*))\\96)(\\*/))(?:(?=(\\p{space}*))\\99))+|(?:(?=(\\p{space}+))\\100)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\102)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\106)|\\*+(?!/))*))\\105)(\\*/))(?:(?=(\\p{space}*))\\108))+|(?:(?=(\\p{space}+))\\109)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?)((?:(?:(?=(\\p{space}*))\\111)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\115)|\\*+(?!/))*))\\114)(\\*/))(?:(?=(\\p{space}*))\\117))+|(?:(?=(\\p{space}+))\\118)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\[)((?:(?:(?=(\\p{space}*))\\121)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\125)|\\*+(?!/))*))\\124)(\\*/))(?:(?=(\\p{space}*))\\127))+|(?:(?=(\\p{space}+))\\128)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)(?:((?:(?:(?=(\\p{space}*))\\131)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\135)|\\*+(?!/))*))\\134)(\\*/))(?:(?=(\\p{space}*))\\137))+|(?:(?=(\\p{space}+))\\138)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(,)((?:(?:(?=(\\p{space}*))\\141)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\145)|\\*+(?!/))*))\\144)(\\*/))(?:(?=(\\p{space}*))\\147))+|(?:(?=(\\p{space}+))\\148)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*))*((?:(?:(?=(\\p{space}*))\\151)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\155)|\\*+(?!/))*))\\154)(\\*/))(?:(?=(\\p{space}*))\\157))+|(?:(?=(\\p{space}+))\\158)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\])((?:(?:(?=(\\p{space}*))\\161)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\165)|\\*+(?!/))*))\\164)(\\*/))(?:(?=(\\p{space}*))\\167))+|(?:(?=(\\p{space}+))\\168)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(:)(?!:)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40, 42, 43, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 70, 71, 73, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 93, 96, 97, 99, 100, 102, 105, 106, 108, 109, 111, 114, 115, 117, 118, 121, 124, 125, 127, 128, 131, 134, 135, 137, 138, 141, 144, 145, 147, 148, 151, 154, 155, 157, 158, 161, 164, 165, 167, 168], lazyCompile: true }), new EmulatedRegExp("((?:((?:(?:(?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:thread_local|volatile|register|restrict|static|extern|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\p{space}+)+)((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=(\\p{space}*))\\21)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\43)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\47)|\\*+(?!/))*))\\46)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\50)|\\*+(?!/))*))\\49)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\54)|\\*+(?!/))*))\\53)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\56)|\\*+(?!/))*))\\55)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\59))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\60))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\61))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\62))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\63))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\64))*>)(?:(?=(\\p{space}*))\\65))?::)*))\\42))((?:(?:(?=(\\p{space}*))\\67)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\71)|\\*+(?!/))*))\\70)(\\*/))(?:(?=(\\p{space}*))\\73))+|(?:(?=(\\p{space}+))\\74)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\77)|\\*+(?!/))*))\\76)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\79)|\\*+(?!/))*))\\78)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\81)|\\*+(?!/))*))\\80)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\83)|\\*+(?!/))*))\\82)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\85)|\\*+(?!/))*))\\84)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\86))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\87))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\88))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\89))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\90))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\93)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\97)|\\*+(?!/))*))\\96)(\\*/))(?:(?=(\\p{space}*))\\99))+|(?:(?=(\\p{space}+))\\100)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\102)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\106)|\\*+(?!/))*))\\105)(\\*/))(?:(?=(\\p{space}*))\\108))+|(?:(?=(\\p{space}+))\\109)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?)((?:(?:(?=(\\p{space}*))\\111)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\115)|\\*+(?!/))*))\\114)(\\*/))(?:(?=(\\p{space}*))\\117))+|(?:(?=(\\p{space}+))\\118)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\[)((?:(?:(?=(\\p{space}*))\\121)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\125)|\\*+(?!/))*))\\124)(\\*/))(?:(?=(\\p{space}*))\\127))+|(?:(?=(\\p{space}+))\\128)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)(?:((?:(?:(?=(\\p{space}*))\\131)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\135)|\\*+(?!/))*))\\134)(\\*/))(?:(?=(\\p{space}*))\\137))+|(?:(?=(\\p{space}+))\\138)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(,)((?:(?:(?=(\\p{space}*))\\141)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\145)|\\*+(?!/))*))\\144)(\\*/))(?:(?=(\\p{space}*))\\147))+|(?:(?=(\\p{space}+))\\148)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*))*((?:(?:(?=(\\p{space}*))\\151)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\155)|\\*+(?!/))*))\\154)(\\*/))(?:(?=(\\p{space}*))\\157))+|(?:(?=(\\p{space}+))\\158)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\])((?:(?:(?=(\\p{space}*))\\161)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\165)|\\*+(?!/))*))\\164)(\\*/))(?:(?=(\\p{space}*))\\167))+|(?:(?=(\\p{space}+))\\168)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(:)(?!:)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40, 42, 43, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 70, 71, 73, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 93, 96, 97, 99, 100, 102, 105, 106, 108, 109, 111, 114, 115, 117, 118, 121, 124, 125, 127, 128, 131, 134, 135, 137, 138, 141, 144, 145, 147, 148, 151, 154, 155, 157, 158, 161, 164, 165, 167, 168], lazyCompile: true })]
          },
          name: "meta.binding.cpp"
        },
        { include: "#evaluation_context" }
      ]
    },
    requires_keyword: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])requires(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])requires(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.other.functionlike.cpp keyword.other.requires.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.requires.cpp" }
      },
      contentName: "meta.arguments.requires",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.requires.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    sizeof_operator: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])sizeof(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])sizeof(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.operator.functionlike.cpp keyword.operator.sizeof.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.sizeof.cpp" }
      },
      contentName: "meta.arguments.operator.sizeof",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.operator.sizeof.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    sizeof_variadic_operator: {
      begin: {
        A: [new EmulatedRegExp("\\b(sizeof\\.\\.\\.)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("\\b(sizeof\\.\\.\\.)((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.operator.functionlike.cpp keyword.operator.sizeof.variadic.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.sizeof.variadic.cpp" }
      },
      contentName: "meta.arguments.operator.sizeof.variadic",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.operator.sizeof.variadic.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    square_brackets: {
      begin: /([A-Z_a-z][0-9A-Z_a-z]*|(?<=[\]\)]))?(\[)(?!\])/dgv,
      beginCaptures: {
        "1": { name: "variable.other.object" },
        "2": { name: "punctuation.definition.begin.bracket.square" }
      },
      end: /\]|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.end.bracket.square" }
      },
      name: "meta.bracket.square.access",
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    static_assert: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])static_assert|_Static_assert(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])static_assert|_Static_assert(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9, 12, 15, 16, 18, 19] })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "keyword.other.static-assert.cpp" },
        "6": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "8": { name: "comment.block.cpp" },
        "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "10": { name: "punctuation.section.arguments.begin.bracket.round.static-assert.cpp" }
      },
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.static-assert.cpp" }
      },
      patterns: [
        {
          begin: /(,)(?:\p{space}+)?(?=(?:L|u8?|U(?:\p{space}+)?")?)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.delimiter.comma.cpp" }
          },
          end: /(?=\))|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.static-assert.message.cpp",
          patterns: [
            { include: "#string_context" }
          ]
        },
        { include: "#evaluation_context" }
      ]
    },
    storage_types: {
      patterns: [
        { include: "source.cpp#storage_specifiers" },
        { include: "source.cpp#inline_builtin_storage_type" },
        { include: "#decltype" },
        { include: "source.cpp#typename" }
      ]
    },
    string_context: {
      patterns: [
        {
          begin: /((?:u8??|[LU])?)"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.cpp" },
            "1": { name: "meta.encoding.cpp" }
          },
          end: /(")(?:((?:[A-Za-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*)|(_(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*))?|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.cpp" },
            "2": { name: "keyword.other.suffix.literal.user-defined.reserved.string.cpp" },
            "3": { name: "keyword.other.suffix.literal.user-defined.string.cpp" }
          },
          name: "string.quoted.double.cpp",
          patterns: [
            {
              match: /\\(?:u\p{AHex}{4}|U\p{AHex}{8})/dgv,
              name: "constant.character.escape.cpp"
            },
            {
              match: /\\["'\?\\abfnrtv]/dgv,
              name: "constant.character.escape.cpp"
            },
            {
              match: /\\[0-7]{1,3}/dgv,
              name: "constant.character.escape.cpp"
            },
            {
              captures: {
                "1": { name: "constant.character.escape.cpp" },
                "2": { name: "invalid.illegal.unknown-escape.cpp" }
              },
              match: /(\\x0*\p{AHex}{2}(?!\p{AHex}))|(\\x\p{AHex}*)/dgv
            },
            { include: "source.cpp#string_escapes_context_c" }
          ]
        },
        {
          begin: /(?<!\p{AHex})((?:u8??|[LU])?)'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.cpp" },
            "1": { name: "meta.encoding.cpp" }
          },
          end: /(')(?:((?:[A-Za-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*)|(_(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*))?|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.cpp" },
            "2": { name: "keyword.other.suffix.literal.user-defined.reserved.character.cpp" },
            "3": { name: "keyword.other.suffix.literal.user-defined.character.cpp" }
          },
          name: "string.quoted.single.cpp",
          patterns: [
            {
              captures: {
                "1": { name: "constant.character.escape.cpp" },
                "2": { name: "invalid.illegal.unknown-escape.cpp" }
              },
              match: /(\\x0*\p{AHex}{2}(?!\p{AHex}))|(\\x\p{AHex}*)/dgv
            },
            { include: "source.cpp#string_escapes_context_c" },
            { include: "source.cpp#line_continuation_character" }
          ]
        },
        {
          begin: /((?:[LUu]8?)?R)"(?:(?:_r|re)|regex)\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.cpp" },
            "1": { name: "meta.encoding.cpp" }
          },
          end: /\)(?:(?:_r|re)|regex)"|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.cpp" }
          },
          name: "string.quoted.double.raw.regex.cpp",
          patterns: [
            { include: "source.regexp.python" }
          ]
        },
        {
          begin: /((?:[LUu]8?)?R)"(?:glsl|GLSL)\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.cpp" },
            "1": { name: "meta.encoding.cpp" }
          },
          end: /\)(?:glsl|GLSL)"|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.cpp" }
          },
          name: "meta.string.quoted.double.raw.glsl.cpp",
          patterns: [
            { include: "source.glsl" }
          ]
        },
        {
          begin: /((?:[LUu]8?)?R)"\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.cpp" },
            "1": { name: "meta.encoding.cpp" }
          },
          end: /\)"|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.cpp" }
          },
          name: "string.quoted.double.raw.cpp",
          patterns: [
            {}
          ]
        },
        {
          begin: /((?:u8??|[LU])?R)"(?:([^\t \(\)\\]{0,16})|([^\t \(\)\\]*))\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.$2.begin" },
            "1": { name: "meta.encoding" },
            "3": { name: "invalid.illegal.delimiter-too-long" }
          },
          end: /(\)(2)(3)")(?:((?:[A-Za-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*)|(_(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*))?|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.$2.end" },
            "3": { name: "invalid.illegal.delimiter-too-long" },
            "4": { name: "keyword.other.suffix.literal.user-defined.reserved.string.cpp" },
            "5": { name: "keyword.other.suffix.literal.user-defined.string.cpp" }
          },
          name: "string.quoted.double.raw.$2"
        }
      ]
    },
    struct_block: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])struct(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])struct(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] })]
      },
      beginCaptures: {
        "0": { name: "meta.head.struct.cpp" },
        "1": { name: "storage.type.$1.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "7": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "9": { name: "comment.block.cpp" },
        "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "11": {
          patterns: [
            {
              captures: {
                "1": { name: "storage.type.modifier.final.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            {
              captures: {
                "1": { name: "entity.name.type.struct.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "storage.type.modifier.final.cpp" },
                "7": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "9": { name: "comment.block.cpp" },
                "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] })]
              }
            },
            {
              match: /DLLEXPORT/dgv,
              name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cpp"
            },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cpp"
            }
          ]
        },
        "12": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "14": { name: "comment.block.cpp" },
        "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "16": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "18": { name: "comment.block.cpp" },
        "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "20": { name: "punctuation.separator.colon.inheritance.cpp" }
      },
      end: /(?:(?:(?<=\}|%>|\?\?>)(?:\p{space}+)?(;)|(;))|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.statement.cpp" },
        "2": { name: "punctuation.terminator.statement.cpp" }
      },
      name: "meta.block.struct.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.struct.cpp" }
          },
          name: "meta.head.struct.cpp",
          patterns: [
            { include: "#ever_present_context" },
            { include: "#inheritance_context" },
            { include: "#template_call_range_helper" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.struct.cpp" }
          },
          name: "meta.body.struct.cpp",
          patterns: [
            { include: "#function_pointer" },
            { include: "#static_assert" },
            { include: "#constructor_inline" },
            { include: "#destructor_inline" },
            { include: "#operator_overload" },
            { include: "#normal_variable_declaration" },
            { include: "#normal_variable_assignment" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.struct.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    switch_conditional_parentheses: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "punctuation.section.parens.begin.bracket.round.conditional.switch.cpp" }
      },
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.end.bracket.round.conditional.switch.cpp" }
      },
      name: "meta.conditional.switch.cpp",
      patterns: [
        { include: "#range_for_inner" },
        { include: "#evaluation_context" }
      ]
    },
    switch_statement: {
      begin: {
        A: [new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])switch(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])switch(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
      },
      beginCaptures: {
        "0": { name: "meta.head.switch.cpp" },
        "1": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "3": { name: "comment.block.cpp" },
        "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "5": { name: "keyword.control.switch.cpp" }
      },
      end: /(?:(?<=\}|%>|\?\?>)|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      name: "meta.block.switch.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.switch.cpp" }
          },
          name: "meta.head.switch.cpp",
          patterns: [
            { include: "#switch_conditional_parentheses" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.switch.cpp" }
          },
          name: "meta.body.switch.cpp",
          patterns: [
            { include: "#default_statement" },
            { include: "#case_statement" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.switch.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    template_call_context: {
      patterns: [
        { include: "#ever_present_context" },
        { include: "#template_call_range_helper" },
        { include: "#storage_types" },
        { include: "source.cpp#language_constants" },
        { include: "source.cpp#scope_resolution_template_call_inner_generated" },
        { include: "#operators" },
        { include: "source.cpp#number_literal" },
        { include: "#string_context" },
        { include: "source.cpp#comma_in_template_argument" },
        { include: "source.cpp#qualified_type" }
      ]
    },
    template_call_range: {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.angle-brackets.begin.template.call.cpp" }
      },
      end: />|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.angle-brackets.end.template.call.cpp" }
      },
      name: "meta.template.call.cpp",
      patterns: [
        { include: "#template_call_context" }
      ]
    },
    template_call_range_helper: {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                {
                  begin: /(?=[^\n])/dgv,
                  beginCaptures: {},
                  end: /(?=\n?$)|(?=(?<!\\)\n)/dgv,
                  endCaptures: {},
                  patterns: [
                    {
                      captures: {
                        "1": { name: "keyword.other.unit.hexadecimal.cpp" },
                        "2": {
                          name: "constant.numeric.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "3": { name: "punctuation.separator.constant.numeric.cpp" },
                        "4": { name: "constant.numeric.hexadecimal.cpp" },
                        "5": {
                          name: "constant.numeric.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "6": { name: "punctuation.separator.constant.numeric.cpp" },
                        "7": { name: "keyword.other.unit.exponent.hexadecimal.cpp" },
                        "8": { name: "keyword.operator.plus.exponent.hexadecimal.cpp" },
                        "9": { name: "keyword.operator.minus.exponent.hexadecimal.cpp" },
                        "10": {
                          name: "constant.numeric.exponent.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "11": { name: "keyword.other.suffix.literal.built-in.floating-point.cpp keyword.other.unit.suffix.floating-point.cpp" },
                        "12": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=\p{AHex})\.|\.(?=\p{AHex}))(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=\p{AHex})\.|\.(?=\p{AHex}))(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": {
                          name: "constant.numeric.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "2": { name: "punctuation.separator.constant.numeric.cpp" },
                        "3": { name: "constant.numeric.decimal.point.cpp" },
                        "4": {
                          name: "constant.numeric.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "5": { name: "punctuation.separator.constant.numeric.cpp" },
                        "6": { name: "keyword.other.unit.exponent.decimal.cpp" },
                        "7": { name: "keyword.operator.plus.exponent.decimal.cpp" },
                        "8": { name: "keyword.operator.minus.exponent.decimal.cpp" },
                        "9": {
                          name: "constant.numeric.exponent.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "10": { name: "keyword.other.suffix.literal.built-in.floating-point.cpp keyword.other.unit.suffix.floating-point.cpp" },
                        "11": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=[0-9])\.|\.(?=[0-9]))([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=[0-9])\.|\.(?=[0-9]))([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": { name: "keyword.other.unit.binary.cpp" },
                        "2": {
                          name: "constant.numeric.binary.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "3": { name: "punctuation.separator.constant.numeric.cpp" },
                        "4": { name: "keyword.other.suffix.literal.built-in.integer.cpp keyword.other.unit.suffix.integer.cpp" },
                        "5": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(0[Bb])([01](?:[01]|((?<=\p{AHex})'(?=\p{AHex})))*)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Bb])([01](?:[01]|((?<=\p{AHex})'(?=\p{AHex})))*)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": { name: "keyword.other.unit.octal.cpp" },
                        "2": {
                          name: "constant.numeric.octal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "3": { name: "punctuation.separator.constant.numeric.cpp" },
                        "4": { name: "keyword.other.suffix.literal.built-in.integer.cpp keyword.other.unit.suffix.integer.cpp" },
                        "5": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(0)((?:[0-7]|((?<=\p{AHex})'(?=\p{AHex})))+)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0)((?:[0-7]|((?<=\p{AHex})'(?=\p{AHex})))+)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": { name: "keyword.other.unit.hexadecimal.cpp" },
                        "2": {
                          name: "constant.numeric.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "3": { name: "punctuation.separator.constant.numeric.cpp" },
                        "4": { name: "keyword.other.unit.exponent.hexadecimal.cpp" },
                        "5": { name: "keyword.operator.plus.exponent.hexadecimal.cpp" },
                        "6": { name: "keyword.operator.minus.exponent.hexadecimal.cpp" },
                        "7": {
                          name: "constant.numeric.exponent.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "8": { name: "keyword.other.suffix.literal.built-in.integer.cpp keyword.other.unit.suffix.integer.cpp" },
                        "9": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": {
                          name: "constant.numeric.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "2": { name: "punctuation.separator.constant.numeric.cpp" },
                        "3": { name: "keyword.other.unit.exponent.decimal.cpp" },
                        "4": { name: "keyword.operator.plus.exponent.decimal.cpp" },
                        "5": { name: "keyword.operator.minus.exponent.decimal.cpp" },
                        "6": {
                          name: "constant.numeric.exponent.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "7": { name: "keyword.other.suffix.literal.built-in.integer.cpp keyword.other.unit.suffix.integer.cpp" },
                        "8": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      match: /(?:['\.0-9A-Z_a-z]|(?<=[EPep])[\-\+])+/dgv,
                      name: "invalid.illegal.constant.numeric.cpp"
                    }
                  ]
                }
              ]
            },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": {
              patterns: [
                {
                  captures: {
                    "1": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "2": { name: "comment.block.cpp" },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\5)|\\*+(?!/))*))\\4)(\\*/))(?:(?=(\\p{space}*))\\7)", "dgv", { hiddenCaptures: [1, 4, 5, 7] })
                }
              ]
            },
            "4": { name: "keyword.operator.bitwise.shift.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("\\b((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\.?\\p{Nd}(?:['\\.0-9A-Z_a-z]|(?<=[EPep])[\\-\\+])*)(((?:(?:(?=(\\p{space}*))\\4)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)\\*/(?:(?=(\\p{space}*))\\7))+)|(?:(?=(\\p{space}+))\\8)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(<<)", "dgv", { hiddenCaptures: [4, 5, 6, 7, 8] }), new EmulatedRegExp("\\b((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\.?\\p{Nd}(?:['\\.0-9A-Z_a-z]|(?<=[EPep])[\\-\\+])*)(((?:(?:(?=(\\p{space}*))\\4)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)\\*/(?:(?=(\\p{space}*))\\7))+)|(?:(?=(\\p{space}+))\\8)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(<<)", "dgv", { hiddenCaptures: [4, 5, 6, 7, 8] })]
          }
        },
        {
          captures: {
            "1": {
              patterns: [
                {
                  begin: /(?=[^\n])/dgv,
                  beginCaptures: {},
                  end: /(?=\n?$)|(?=(?<!\\)\n)/dgv,
                  endCaptures: {},
                  patterns: [
                    {
                      captures: {
                        "1": { name: "keyword.other.unit.hexadecimal.cpp" },
                        "2": {
                          name: "constant.numeric.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "3": { name: "punctuation.separator.constant.numeric.cpp" },
                        "4": { name: "constant.numeric.hexadecimal.cpp" },
                        "5": {
                          name: "constant.numeric.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "6": { name: "punctuation.separator.constant.numeric.cpp" },
                        "7": { name: "keyword.other.unit.exponent.hexadecimal.cpp" },
                        "8": { name: "keyword.operator.plus.exponent.hexadecimal.cpp" },
                        "9": { name: "keyword.operator.minus.exponent.hexadecimal.cpp" },
                        "10": {
                          name: "constant.numeric.exponent.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "11": { name: "keyword.other.suffix.literal.built-in.floating-point.cpp keyword.other.unit.suffix.floating-point.cpp" },
                        "12": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=\p{AHex})\.|\.(?=\p{AHex}))(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=\p{AHex})\.|\.(?=\p{AHex}))(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": {
                          name: "constant.numeric.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "2": { name: "punctuation.separator.constant.numeric.cpp" },
                        "3": { name: "constant.numeric.decimal.point.cpp" },
                        "4": {
                          name: "constant.numeric.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "5": { name: "punctuation.separator.constant.numeric.cpp" },
                        "6": { name: "keyword.other.unit.exponent.decimal.cpp" },
                        "7": { name: "keyword.operator.plus.exponent.decimal.cpp" },
                        "8": { name: "keyword.operator.minus.exponent.decimal.cpp" },
                        "9": {
                          name: "constant.numeric.exponent.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "10": { name: "keyword.other.suffix.literal.built-in.floating-point.cpp keyword.other.unit.suffix.floating-point.cpp" },
                        "11": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=[0-9])\.|\.(?=[0-9]))([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?((?<=[0-9])\.|\.(?=[0-9]))([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)?(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?([FLfl](?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": { name: "keyword.other.unit.binary.cpp" },
                        "2": {
                          name: "constant.numeric.binary.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "3": { name: "punctuation.separator.constant.numeric.cpp" },
                        "4": { name: "keyword.other.suffix.literal.built-in.integer.cpp keyword.other.unit.suffix.integer.cpp" },
                        "5": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(0[Bb])([01](?:[01]|((?<=\p{AHex})'(?=\p{AHex})))*)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Bb])([01](?:[01]|((?<=\p{AHex})'(?=\p{AHex})))*)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": { name: "keyword.other.unit.octal.cpp" },
                        "2": {
                          name: "constant.numeric.octal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "3": { name: "punctuation.separator.constant.numeric.cpp" },
                        "4": { name: "keyword.other.suffix.literal.built-in.integer.cpp keyword.other.unit.suffix.integer.cpp" },
                        "5": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(0)((?:[0-7]|((?<=\p{AHex})'(?=\p{AHex})))+)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0)((?:[0-7]|((?<=\p{AHex})'(?=\p{AHex})))+)((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": { name: "keyword.other.unit.hexadecimal.cpp" },
                        "2": {
                          name: "constant.numeric.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "3": { name: "punctuation.separator.constant.numeric.cpp" },
                        "4": { name: "keyword.other.unit.exponent.hexadecimal.cpp" },
                        "5": { name: "keyword.operator.plus.exponent.hexadecimal.cpp" },
                        "6": { name: "keyword.operator.minus.exponent.hexadecimal.cpp" },
                        "7": {
                          name: "constant.numeric.exponent.hexadecimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "8": { name: "keyword.other.suffix.literal.built-in.integer.cpp keyword.other.unit.suffix.integer.cpp" },
                        "9": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(0[Xx])(\p{AHex}(?:\p{AHex}|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Pp])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![Pp\p{AHex}])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      captures: {
                        "1": {
                          name: "constant.numeric.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "2": { name: "punctuation.separator.constant.numeric.cpp" },
                        "3": { name: "keyword.other.unit.exponent.decimal.cpp" },
                        "4": { name: "keyword.operator.plus.exponent.decimal.cpp" },
                        "5": { name: "keyword.operator.minus.exponent.decimal.cpp" },
                        "6": {
                          name: "constant.numeric.exponent.decimal.cpp",
                          patterns: [
                            {
                              match: /(?<=\p{AHex})'(?=\p{AHex})/dgv,
                              name: "punctuation.separator.constant.numeric.cpp"
                            }
                          ]
                        },
                        "7": { name: "keyword.other.suffix.literal.built-in.integer.cpp keyword.other.unit.suffix.integer.cpp" },
                        "8": { name: "keyword.other.suffix.literal.user-defined.integer.cpp keyword.other.unit.user-defined.cpp" }
                      },
                      match: {
                        G: [/￿(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgv, /(?=[\.0-9])(?!0[BXbx])([0-9](?:[0-9]|((?<=\p{AHex})'(?=\p{AHex})))*)(?:(?<!')([Ee])(\+?)(-?)([0-9](?:[0-9]|(?<=\p{AHex})'(?=\p{AHex}))*))?((?:[Uu]|[Uu]ll?|[Uu]LL?|ll?[Uu]?|LL?[Uu]?|[Ff])(?![\p{L}\p{M}\p{N}\p{Pc}]))?((?:[\p{L}\p{M}\p{N}\p{Pc}](?<![0-9Ee])[\p{L}\p{M}\p{N}\p{Pc}]*)?)(?=\n?$)/dgvy]
                      }
                    },
                    {
                      match: /(?:['\.0-9A-Z_a-z]|(?<=[EPep])[\-\+])+/dgv,
                      name: "invalid.illegal.constant.numeric.cpp"
                    }
                  ]
                }
              ]
            },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": {
              patterns: [
                {
                  captures: {
                    "1": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "2": { name: "comment.block.cpp" },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: new EmulatedRegExp("(?:(?=(\\p{space}*))\\1)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\5)|\\*+(?!/))*))\\4)(\\*/))(?:(?=(\\p{space}*))\\7)", "dgv", { hiddenCaptures: [1, 4, 5, 7] })
                }
              ]
            },
            "4": { name: "keyword.operator.comparison.cpp" }
          },
          match: {
            A: [new EmulatedRegExp("\\b((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\.?\\p{Nd}(?:['\\.0-9A-Z_a-z]|(?<=[EPep])[\\-\\+])*)(((?:(?:(?=(\\p{space}*))\\4)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)\\*/(?:(?=(\\p{space}*))\\7))+)|(?:(?=(\\p{space}+))\\8)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(<)", "dgv", { hiddenCaptures: [4, 5, 6, 7, 8] }), new EmulatedRegExp("\\b((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])\\.?\\p{Nd}(?:['\\.0-9A-Z_a-z]|(?<=[EPep])[\\-\\+])*)(((?:(?:(?=(\\p{space}*))\\4)/\\*(?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)\\*/(?:(?=(\\p{space}*))\\7))+)|(?:(?=(\\p{space}+))\\8)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(<)", "dgv", { hiddenCaptures: [4, 5, 6, 7, 8] })]
          }
        },
        { include: "#template_call_range" }
      ]
    },
    template_definition: {
      begin: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(template)(?:\p{space}+)?(<)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.template.cpp" },
        "2": { name: "punctuation.section.angle-brackets.begin.template.definition.cpp" }
      },
      end: />|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.angle-brackets.end.template.definition.cpp" }
      },
      name: "meta.template.definition.cpp",
      patterns: [
        {
          begin: /(?<=[\p{L}\p{M}\p{N}\p{Pc}])(?:\p{space}+)?</dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.angle-brackets.begin.template.call.cpp" }
          },
          end: />|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.angle-brackets.end.template.call.cpp" }
          },
          patterns: [
            { include: "#template_call_context" }
          ]
        },
        { include: "#template_definition_context" }
      ]
    },
    template_definition_context: {
      patterns: [
        { include: "source.cpp#scope_resolution_template_definition_inner_generated" },
        { include: "source.cpp#template_definition_argument" },
        { include: "source.cpp#template_argument_defaulted" },
        { include: "source.cpp#template_call_innards" },
        { include: "#evaluation_context" }
      ]
    },
    ternary_operator: {
      applyEndPatternLast: 1,
      begin: /\?/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.ternary.cpp" }
      },
      end: /:|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "keyword.operator.ternary.cpp" }
      },
      patterns: [
        { include: "#ever_present_context" },
        { include: "#string_context" },
        { include: "source.cpp#number_literal" },
        { include: "#method_access" },
        { include: "source.cpp#member_access" },
        { include: "source.cpp#predefined_macros" },
        { include: "#operators" },
        { include: "source.cpp#memory_operators" },
        { include: "source.cpp#wordlike_operators" },
        { include: "source.cpp#type_casting_operators" },
        { include: "source.cpp#control_flow_keywords" },
        { include: "source.cpp#exception_keywords" },
        { include: "source.cpp#the_this_keyword" },
        { include: "source.cpp#language_constants" },
        { include: "source.cpp#constructor_bracket_call" },
        { include: "source.cpp#simple_constructor_call" },
        { include: "source.cpp#simple_array_assignment" },
        { include: "#builtin_storage_type_initilizer" },
        { include: "#qualifiers_and_specifiers_post_parameters" },
        { include: "source.cpp#functional_specifiers_pre_parameters" },
        { include: "#storage_types" },
        { include: "#lambdas" },
        { include: "#attributes_context" },
        { include: "#parentheses" },
        { include: "#function_call" },
        { include: "source.cpp#scope_resolution_inner_generated" },
        { include: "#square_brackets" },
        { include: "source.cpp#semicolon" },
        { include: "source.cpp#comma" },
        { include: "source.cpp#unknown_variable" }
      ]
    },
    typedef_class: {
      begin: /((?<![\p{L}\p{M}\p{N}\p{Pc}])typedef(?![\p{L}\p{M}\p{N}\p{Pc}]))(?:\p{space}+)?(?=(?<![\p{L}\p{M}\p{N}\p{Pc}])class(?![\p{L}\p{M}\p{N}\p{Pc}]))/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.typedef.cpp" }
      },
      end: /(?<=;)|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      patterns: [
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])class(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])class(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] })]
          },
          beginCaptures: {
            "0": { name: "meta.head.class.cpp" },
            "1": { name: "storage.type.$1.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": {
              patterns: [
                { include: "#attributes_context" },
                { include: "source.cpp#number_literal" }
              ]
            },
            "7": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "9": { name: "comment.block.cpp" },
            "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "11": {
              patterns: [
                {
                  captures: {
                    "1": { name: "storage.type.modifier.final.cpp" },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
                  }
                },
                {
                  captures: {
                    "1": { name: "entity.name.type.class.cpp" },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "6": { name: "storage.type.modifier.final.cpp" },
                    "7": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "9": { name: "comment.block.cpp" },
                    "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] })]
                  }
                },
                {
                  match: /DLLEXPORT/dgv,
                  name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cpp"
                },
                {
                  match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
                  name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cpp"
                }
              ]
            },
            "12": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "14": { name: "comment.block.cpp" },
            "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "16": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "18": { name: "comment.block.cpp" },
            "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "20": { name: "punctuation.separator.colon.inheritance.cpp" }
          },
          end: /(?:(?:(?<=\}|%>|\?\?>)(?:\p{space}+)?(;)|(;))|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.cpp" },
            "2": { name: "punctuation.terminator.statement.cpp" }
          },
          name: "meta.block.class.cpp",
          patterns: [
            {
              begin: {
                G: [/￿ ?/dgv, / ?/dgvy]
              },
              beginCaptures: {},
              end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.block.begin.bracket.curly.class.cpp" }
              },
              name: "meta.head.class.cpp",
              patterns: [
                { include: "#ever_present_context" },
                { include: "#inheritance_context" },
                { include: "#template_call_range_helper" }
              ]
            },
            {
              begin: /(?<=\{|<%|\?\?<)/dgv,
              beginCaptures: {},
              end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.block.end.bracket.curly.class.cpp" }
              },
              name: "meta.body.class.cpp",
              patterns: [
                { include: "#function_pointer" },
                { include: "#static_assert" },
                { include: "#constructor_inline" },
                { include: "#destructor_inline" },
                { include: "#operator_overload" },
                { include: "#normal_variable_declaration" },
                { include: "#normal_variable_assignment" },
                { include: "$self" }
              ]
            },
            {
              begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
              beginCaptures: {},
              end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
              endCaptures: {},
              name: "meta.tail.class.cpp",
              patterns: [
                {
                  captures: {
                    "1": {
                      patterns: [
                        {
                          match: /\*/dgv,
                          name: "storage.modifier.pointer.cpp"
                        },
                        {
                          captures: {
                            "1": {
                              patterns: [
                                { include: "source.cpp#inline_comment" }
                              ]
                            },
                            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                            "3": { name: "comment.block.cpp" },
                            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                          },
                          match: {
                            A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                          },
                          name: "invalid.illegal.reference-type.cpp"
                        },
                        {
                          match: /&/dgv,
                          name: "storage.modifier.reference.cpp"
                        }
                      ]
                    },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "6": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "8": { name: "comment.block.cpp" },
                    "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "10": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "11": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "12": { name: "comment.block.cpp" },
                    "13": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "14": { name: "entity.name.type.alias.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28] }), new EmulatedRegExp("(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28] })]
                  }
                },
                {
                  match: /,/dgv
                }
              ]
            }
          ]
        }
      ]
    },
    typedef_function_pointer: {
      begin: /((?<![\p{L}\p{M}\p{N}\p{Pc}])typedef(?![\p{L}\p{M}\p{N}\p{Pc}]))(?:\p{space}+)?(?=[^\n]*\(\*\p{space}*(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*\p{space}*\))/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.typedef.cpp" }
      },
      end: /(?<=;)|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      patterns: [
        {
          begin: {
            A: [new EmulatedRegExp("((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\5)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)(\\*/))(?:(?=(\\p{space}*))\\11))+|(?:(?=(\\p{space}+))\\12)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\24)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\39)|\\*+(?!/))*))\\38)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\45))*>)(?:(?=(\\p{space}*))\\46))?::)*))\\23))((?:(?:(?=(\\p{space}*))\\48)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)(\\*/))(?:(?=(\\p{space}*))\\54))+|(?:(?=(\\p{space}+))\\55)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\66)|\\*+(?!/))*))\\65)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\74)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\78)|\\*+(?!/))*))\\77)(\\*/))(?:(?=(\\p{space}*))\\80))+|(?:(?=(\\p{space}+))\\81)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\83)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\87)|\\*+(?!/))*))\\86)(\\*/))(?:(?=(\\p{space}*))\\89))+|(?:(?=(\\p{space}+))\\90)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\92)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\96)|\\*+(?!/))*))\\95)(\\*/))(?:(?=(\\p{space}*))\\98))+|(?:(?=(\\p{space}+))\\99)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()(\\*)(?:\\p{space}+)?((?:(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)?)(?:\\p{space}+)?(?:(\\[)([\\p{L}\\p{M}\\p{N}\\p{Pc}]*)(\\])(?:\\p{space}+)?)*(\\))(?:\\p{space}+)?(\\()", "dgv", { hiddenCaptures: [2, 5, 8, 9, 11, 12, 14, 17, 18, 20, 21, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 74, 77, 78, 80, 81, 83, 86, 87, 89, 90, 92, 95, 96, 98, 99], lazyCompile: true }), new EmulatedRegExp("((?:(?=(\\p{space}*))\\2)((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))?((?:(?:(?=(\\p{space}*))\\5)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)(\\*/))(?:(?=(\\p{space}*))\\11))+|(?:(?=(\\p{space}+))\\12)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:(?:unsigned|signed|short|long)|(?:struct|class|union|enum))((?:(?:(?=(\\p{space}*))\\14)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\18)|\\*+(?!/))*))\\17)(\\*/))(?:(?=(\\p{space}*))\\20))+|(?:(?=(\\p{space}+))\\21)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*(?:((?:::)?(?:(?=((?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\24)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\31)|\\*+(?!/))*))\\30)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\33)|\\*+(?!/))*))\\32)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\35)|\\*+(?!/))*))\\34)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\39)|\\*+(?!/))*))\\38)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\40))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\41))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\42))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\43))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\44))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\45))*>)(?:(?=(\\p{space}*))\\46))?::)*))\\23))((?:(?:(?=(\\p{space}*))\\48)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\52)|\\*+(?!/))*))\\51)(\\*/))(?:(?=(\\p{space}*))\\54))+|(?:(?=(\\p{space}+))\\55)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?!(?:transaction_safe_dynamic|__has_cpp_attribute|reinterpret_cast|transaction_safe|atomic_noexcept|atomic_commit|__has_include|atomic_cancel|synchronized|thread_local|dynamic_cast|static_cast|const_cast|constexpr|co_return|constinit|namespace|protected|consteval|constexpr|co_return|consteval|co_await|continue|template|reflexpr|volatile|register|co_await|co_yield|restrict|noexcept|volatile|override|explicit|decltype|operator|noexcept|typename|requires|co_yield|nullptr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|define|module|sizeof|switch|delete|pragma|and_eq|inline|xor_eq|typeid|import|extern|public|bitand|static|export|return|friend|ifndef|not_eq|false|final|break|const|catch|endif|ifdef|undef|error|audit|while|using|axiom|or_eq|compl|throw|bitor|const|line|case|else|this|true|goto|else|NULL|elif|new|asm|xor|and|try|not|for|do|if|or|if)\\b)(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*\\b((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\58)|\\*+(?!/))*))\\57)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\60)|\\*+(?!/))*))\\59)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\62)|\\*+(?!/))*))\\61)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\64)|\\*+(?!/))*))\\63)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\66)|\\*+(?!/))*))\\65)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\67))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\68))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\69))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\70))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\71))*>)?(?![\\.\\:\\<\\p{L}\\p{M}\\p{N}\\p{Pc}]))(((?:(?:(?=(\\p{space}*))\\74)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\78)|\\*+(?!/))*))\\77)(\\*/))(?:(?=(\\p{space}*))\\80))+|(?:(?=(\\p{space}+))\\81)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\83)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\87)|\\*+(?!/))*))\\86)(\\*/))(?:(?=(\\p{space}*))\\89))+|(?:(?=(\\p{space}+))\\90)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\92)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\96)|\\*+(?!/))*))\\95)(\\*/))(?:(?=(\\p{space}*))\\98))+|(?:(?=(\\p{space}+))\\99)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()(\\*)(?:\\p{space}+)?((?:(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*)?)(?:\\p{space}+)?(?:(\\[)([\\p{L}\\p{M}\\p{N}\\p{Pc}]*)(\\])(?:\\p{space}+)?)*(\\))(?:\\p{space}+)?(\\()", "dgv", { hiddenCaptures: [2, 5, 8, 9, 11, 12, 14, 17, 18, 20, 21, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 74, 77, 78, 80, 81, 83, 86, 87, 89, 90, 92, 95, 96, 98, 99], lazyCompile: true })]
          },
          beginCaptures: {
            "1": {
              name: "meta.qualified-type.cpp",
              patterns: [
                {
                  match: /::/dgv,
                  name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.cpp"
                },
                {
                  match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:struct|class|union|enum)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "storage.type.$0.cpp"
                },
                { include: "#attributes_context" },
                { include: "#storage_types" },
                { include: "source.cpp#number_literal" },
                { include: "#string_context" },
                { include: "source.cpp#comma" },
                { include: "source.cpp#scope_resolution_inner_generated" },
                { include: "#template_call_range_helper" },
                {
                  match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
                  name: "entity.name.type.cpp"
                }
              ]
            },
            "2": {
              patterns: [
                { include: "#attributes_context" },
                { include: "source.cpp#number_literal" }
              ]
            },
            "3": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "4": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "5": { name: "comment.block.cpp" },
            "6": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "7": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "9": { name: "comment.block.cpp" },
            "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "11": {
              patterns: [
                {
                  match: /::/dgv,
                  name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.type.cpp"
                },
                {
                  match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
                  name: "entity.name.scope-resolution.type.cpp"
                },
                { include: "#template_call_range_helper" }
              ]
            },
            "12": {
              patterns: [
                { include: "#template_call_range_helper" }
              ]
            },
            "13": {},
            "14": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "15": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "16": { name: "comment.block.cpp" },
            "17": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "18": {},
            "19": {
              patterns: [
                {
                  match: /\*/dgv,
                  name: "storage.modifier.pointer.cpp"
                },
                {
                  captures: {
                    "1": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "3": { name: "comment.block.cpp" },
                    "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                  },
                  name: "invalid.illegal.reference-type.cpp"
                },
                {
                  match: /&/dgv,
                  name: "storage.modifier.reference.cpp"
                }
              ]
            },
            "20": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "21": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "22": { name: "comment.block.cpp" },
            "23": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "24": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "25": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "26": { name: "comment.block.cpp" },
            "27": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "28": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "29": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "30": { name: "comment.block.cpp" },
            "31": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "32": { name: "punctuation.section.parens.begin.bracket.round.function.pointer.cpp" },
            "33": { name: "punctuation.definition.function.pointer.dereference.cpp" },
            "34": { name: "entity.name.type.alias.cpp entity.name.type.pointer.function.cpp" },
            "35": { name: "punctuation.definition.begin.bracket.square.cpp" },
            "36": {
              patterns: [
                { include: "#evaluation_context" }
              ]
            },
            "37": { name: "punctuation.definition.end.bracket.square.cpp" },
            "38": { name: "punctuation.section.parens.end.bracket.round.function.pointer.cpp" },
            "39": { name: "punctuation.section.parameters.begin.bracket.round.function.pointer.cpp" }
          },
          end: {
            A: [new EmulatedRegExp("(\\))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?:((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))+(?=\\p{space}*[\\n\\r\\;\\=\\{])((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\n\\)\\,\\;\\=\\>\\{])(?!\\()|(?=(?<!\\\\)\\n)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] }), new EmulatedRegExp("(\\))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?:((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:override|volatile|noexcept|final|const)(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])))+(?=\\p{space}*[\\n\\r\\;\\=\\{])((?:(?:(?=(\\p{space}*))\\22)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\26)|\\*+(?!/))*))\\25)(\\*/))(?:(?=(\\p{space}*))\\28))+|(?:(?=(\\p{space}+))\\29)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\n\\)\\,\\;\\=\\>\\{])(?!\\()|(?=(?<!\\\\)\\n)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 22, 25, 26, 28, 29] })]
          },
          endCaptures: {
            "1": { name: "punctuation.section.parameters.end.bracket.round.function.pointer.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "8": { name: "comment.block.cpp" },
            "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "10": { name: "storage.modifier.specifier.functional.post-parameters.$10.cpp" },
            "11": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "12": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "13": { name: "comment.block.cpp" },
            "14": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
          },
          patterns: [
            { include: "#function_parameter_context" }
          ]
        }
      ]
    },
    typedef_struct: {
      begin: /((?<![\p{L}\p{M}\p{N}\p{Pc}])typedef(?![\p{L}\p{M}\p{N}\p{Pc}]))(?:\p{space}+)?(?=(?<![\p{L}\p{M}\p{N}\p{Pc}])struct(?![\p{L}\p{M}\p{N}\p{Pc}]))/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.typedef.cpp" }
      },
      end: /(?<=;)|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      patterns: [
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])struct(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])struct(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] })]
          },
          beginCaptures: {
            "0": { name: "meta.head.struct.cpp" },
            "1": { name: "storage.type.$1.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": {
              patterns: [
                { include: "#attributes_context" },
                { include: "source.cpp#number_literal" }
              ]
            },
            "7": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "9": { name: "comment.block.cpp" },
            "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "11": {
              patterns: [
                {
                  captures: {
                    "1": { name: "storage.type.modifier.final.cpp" },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
                  }
                },
                {
                  captures: {
                    "1": { name: "entity.name.type.struct.cpp" },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "6": { name: "storage.type.modifier.final.cpp" },
                    "7": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "9": { name: "comment.block.cpp" },
                    "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] })]
                  }
                },
                {
                  match: /DLLEXPORT/dgv,
                  name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cpp"
                },
                {
                  match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
                  name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cpp"
                }
              ]
            },
            "12": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "14": { name: "comment.block.cpp" },
            "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "16": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "18": { name: "comment.block.cpp" },
            "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "20": { name: "punctuation.separator.colon.inheritance.cpp" }
          },
          end: /(?:(?:(?<=\}|%>|\?\?>)(?:\p{space}+)?(;)|(;))|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.cpp" },
            "2": { name: "punctuation.terminator.statement.cpp" }
          },
          name: "meta.block.struct.cpp",
          patterns: [
            {
              begin: {
                G: [/￿ ?/dgv, / ?/dgvy]
              },
              beginCaptures: {},
              end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.block.begin.bracket.curly.struct.cpp" }
              },
              name: "meta.head.struct.cpp",
              patterns: [
                { include: "#ever_present_context" },
                { include: "#inheritance_context" },
                { include: "#template_call_range_helper" }
              ]
            },
            {
              begin: /(?<=\{|<%|\?\?<)/dgv,
              beginCaptures: {},
              end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.block.end.bracket.curly.struct.cpp" }
              },
              name: "meta.body.struct.cpp",
              patterns: [
                { include: "#function_pointer" },
                { include: "#static_assert" },
                { include: "#constructor_inline" },
                { include: "#destructor_inline" },
                { include: "#operator_overload" },
                { include: "#normal_variable_declaration" },
                { include: "#normal_variable_assignment" },
                { include: "$self" }
              ]
            },
            {
              begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
              beginCaptures: {},
              end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
              endCaptures: {},
              name: "meta.tail.struct.cpp",
              patterns: [
                {
                  captures: {
                    "1": {
                      patterns: [
                        {
                          match: /\*/dgv,
                          name: "storage.modifier.pointer.cpp"
                        },
                        {
                          captures: {
                            "1": {
                              patterns: [
                                { include: "source.cpp#inline_comment" }
                              ]
                            },
                            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                            "3": { name: "comment.block.cpp" },
                            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                          },
                          match: {
                            A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                          },
                          name: "invalid.illegal.reference-type.cpp"
                        },
                        {
                          match: /&/dgv,
                          name: "storage.modifier.reference.cpp"
                        }
                      ]
                    },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "6": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "8": { name: "comment.block.cpp" },
                    "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "10": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "11": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "12": { name: "comment.block.cpp" },
                    "13": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "14": { name: "entity.name.type.alias.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28] }), new EmulatedRegExp("(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28] })]
                  }
                },
                {
                  match: /,/dgv
                }
              ]
            }
          ]
        }
      ]
    },
    typedef_union: {
      begin: /((?<![\p{L}\p{M}\p{N}\p{Pc}])typedef(?![\p{L}\p{M}\p{N}\p{Pc}]))(?:\p{space}+)?(?=(?<![\p{L}\p{M}\p{N}\p{Pc}])union(?![\p{L}\p{M}\p{N}\p{Pc}]))/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.typedef.cpp" }
      },
      end: /(?<=;)|(?=(?<!\\)\n)/dgv,
      endCaptures: {},
      patterns: [
        {
          begin: {
            A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])union(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])union(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] })]
          },
          beginCaptures: {
            "0": { name: "meta.head.union.cpp" },
            "1": { name: "storage.type.$1.cpp" },
            "2": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "4": { name: "comment.block.cpp" },
            "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "6": {
              patterns: [
                { include: "#attributes_context" },
                { include: "source.cpp#number_literal" }
              ]
            },
            "7": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "9": { name: "comment.block.cpp" },
            "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "11": {
              patterns: [
                {
                  captures: {
                    "1": { name: "storage.type.modifier.final.cpp" },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
                  }
                },
                {
                  captures: {
                    "1": { name: "entity.name.type.union.cpp" },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "6": { name: "storage.type.modifier.final.cpp" },
                    "7": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "9": { name: "comment.block.cpp" },
                    "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] })]
                  }
                },
                {
                  match: /DLLEXPORT/dgv,
                  name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cpp"
                },
                {
                  match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
                  name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cpp"
                }
              ]
            },
            "12": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "14": { name: "comment.block.cpp" },
            "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "16": {
              patterns: [
                { include: "source.cpp#inline_comment" }
              ]
            },
            "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
            "18": { name: "comment.block.cpp" },
            "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
            "20": { name: "punctuation.separator.colon.inheritance.cpp" }
          },
          end: /(?:(?:(?<=\}|%>|\?\?>)(?:\p{space}+)?(;)|(;))|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.terminator.statement.cpp" },
            "2": { name: "punctuation.terminator.statement.cpp" }
          },
          name: "meta.block.union.cpp",
          patterns: [
            {
              begin: {
                G: [/￿ ?/dgv, / ?/dgvy]
              },
              beginCaptures: {},
              end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.block.begin.bracket.curly.union.cpp" }
              },
              name: "meta.head.union.cpp",
              patterns: [
                { include: "#ever_present_context" },
                { include: "#inheritance_context" },
                { include: "#template_call_range_helper" }
              ]
            },
            {
              begin: /(?<=\{|<%|\?\?<)/dgv,
              beginCaptures: {},
              end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.block.end.bracket.curly.union.cpp" }
              },
              name: "meta.body.union.cpp",
              patterns: [
                { include: "#function_pointer" },
                { include: "#static_assert" },
                { include: "#constructor_inline" },
                { include: "#destructor_inline" },
                { include: "#operator_overload" },
                { include: "#normal_variable_declaration" },
                { include: "#normal_variable_assignment" },
                { include: "$self" }
              ]
            },
            {
              begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
              beginCaptures: {},
              end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
              endCaptures: {},
              name: "meta.tail.union.cpp",
              patterns: [
                {
                  captures: {
                    "1": {
                      patterns: [
                        {
                          match: /\*/dgv,
                          name: "storage.modifier.pointer.cpp"
                        },
                        {
                          captures: {
                            "1": {
                              patterns: [
                                { include: "source.cpp#inline_comment" }
                              ]
                            },
                            "2": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                            "3": { name: "comment.block.cpp" },
                            "4": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
                          },
                          match: {
                            A: [new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] }), new EmulatedRegExp("(?:&((?:(?:(?=(\\p{space}*))\\2)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\6)|\\*+(?!/))*))\\5)(\\*/))(?:(?=(\\p{space}*))\\8))+|(?:(?=(\\p{space}+))\\9)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))){2,}&", "dgv", { hiddenCaptures: [2, 5, 6, 8, 9] })]
                          },
                          name: "invalid.illegal.reference-type.cpp"
                        },
                        {
                          match: /&/dgv,
                          name: "storage.modifier.reference.cpp"
                        }
                      ]
                    },
                    "2": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "4": { name: "comment.block.cpp" },
                    "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "6": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "7": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "8": { name: "comment.block.cpp" },
                    "9": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "10": {
                      patterns: [
                        { include: "source.cpp#inline_comment" }
                      ]
                    },
                    "11": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                    "12": { name: "comment.block.cpp" },
                    "13": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                    "14": { name: "entity.name.type.alias.cpp" }
                  },
                  match: {
                    A: [new EmulatedRegExp("(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28] }), new EmulatedRegExp("(((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))?(?:[\\&\\*]((?:(?:(?=(\\p{space}*))\\12)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\16)|\\*+(?!/))*))\\15)(\\*/))(?:(?=(\\p{space}*))\\18))+|(?:(?=(\\p{space}+))\\19)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*[\\&\\*])?((?:(?:(?=(\\p{space}*))\\21)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\25)|\\*+(?!/))*))\\24)(\\*/))(?:(?=(\\p{space}*))\\27))+|(?:(?=(\\p{space}+))\\28)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 12, 15, 16, 18, 19, 21, 24, 25, 27, 28] })]
                  }
                },
                {
                  match: /,/dgv
                }
              ]
            }
          ]
        }
      ]
    },
    typeid_operator: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])typeid(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])typeid(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(\\()", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
      },
      beginCaptures: {
        "1": { name: "keyword.operator.functionlike.cpp keyword.operator.typeid.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": { name: "punctuation.section.arguments.begin.bracket.round.operator.typeid.cpp" }
      },
      contentName: "meta.arguments.operator.typeid",
      end: /\)|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.arguments.end.bracket.round.operator.typeid.cpp" }
      },
      patterns: [
        { include: "#evaluation_context" }
      ]
    },
    union_block: {
      begin: {
        A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])union(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])union(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:(?=\\{)|(?:((?:(?:(?:\\[\\[[^\\n]*?\\]\\]|__attribute(?:__)?\\p{space}*\\(\\p{space}*\\([^\\n]*?\\)\\p{space}*\\))|__declspec\\([^\\n]*?\\))|alignas\\([^\\n]*?\\))(?!\\)))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?((?:(?=((?:(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])((?:(?:(?=(\\p{space}*))\\24)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\28)|\\*+(?!/))*))\\27)(\\*/))(?:(?=(\\p{space}*))\\30))+|(?:(?=(\\p{space}+))\\31)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))*))\\22))?(?:((?:(?:(?=(\\p{space}*))\\33)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\37)|\\*+(?!/))*))\\36)(\\*/))(?:(?=(\\p{space}*))\\39))+|(?:(?=(\\p{space}+))\\40)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(:(?!:)))?)", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20, 22, 24, 27, 28, 30, 31, 33, 36, 37, 39, 40] })]
      },
      beginCaptures: {
        "0": { name: "meta.head.union.cpp" },
        "1": { name: "storage.type.$1.cpp" },
        "2": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "4": { name: "comment.block.cpp" },
        "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "6": {
          patterns: [
            { include: "#attributes_context" },
            { include: "source.cpp#number_literal" }
          ]
        },
        "7": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "9": { name: "comment.block.cpp" },
        "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "11": {
          patterns: [
            {
              captures: {
                "1": { name: "storage.type.modifier.final.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10] })]
              }
            },
            {
              captures: {
                "1": { name: "entity.name.type.union.cpp" },
                "2": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "3": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "4": { name: "comment.block.cpp" },
                "5": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
                "6": { name: "storage.type.modifier.final.cpp" },
                "7": {
                  patterns: [
                    { include: "source.cpp#inline_comment" }
                  ]
                },
                "8": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
                "9": { name: "comment.block.cpp" },
                "10": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" }
              },
              match: {
                A: [new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|￿|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] }), new EmulatedRegExp("((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\3)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\7)|\\*+(?!/))*))\\6)(\\*/))(?:(?=(\\p{space}*))\\9))+|(?:(?=(\\p{space}+))\\10)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$))(?:((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])final(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))((?:(?:(?=(\\p{space}*))\\13)(/\\*)((?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)(\\*/))(?:(?=(\\p{space}*))\\19))+|(?:(?=(\\p{space}+))\\20)|(?<=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?=[^\\p{L}\\p{M}\\p{N}\\p{Pc}])|^|\\n?(?=\\n?$)|^|(?=\\n?$)))?(?=[\\:\\{]|(?=\\n?$))", "dgv", { hiddenCaptures: [3, 6, 7, 9, 10, 13, 16, 17, 19, 20] })]
              }
            },
            {
              match: /DLLEXPORT/dgv,
              name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cpp"
            },
            {
              match: /(?:[A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\(?:u\p{AHex}{4}|U\p{AHex}{8}))*/dgv,
              name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cpp"
            }
          ]
        },
        "12": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "13": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "14": { name: "comment.block.cpp" },
        "15": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "16": {
          patterns: [
            { include: "source.cpp#inline_comment" }
          ]
        },
        "17": { name: "comment.block.cpp punctuation.definition.comment.begin.cpp" },
        "18": { name: "comment.block.cpp" },
        "19": { name: "comment.block.cpp punctuation.definition.comment.end.cpp" },
        "20": { name: "punctuation.separator.colon.inheritance.cpp" }
      },
      end: /(?:(?:(?<=\}|%>|\?\?>)(?:\p{space}+)?(;)|(;))|(?=[\]\;\=\>\[]))|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.statement.cpp" },
        "2": { name: "punctuation.terminator.statement.cpp" }
      },
      name: "meta.block.union.cpp",
      patterns: [
        {
          begin: {
            G: [/￿ ?/dgv, / ?/dgvy]
          },
          beginCaptures: {},
          end: /(?:\{|<%|\?\?<|(?=;))|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.begin.bracket.curly.union.cpp" }
          },
          name: "meta.head.union.cpp",
          patterns: [
            { include: "#ever_present_context" },
            { include: "#inheritance_context" },
            { include: "#template_call_range_helper" }
          ]
        },
        {
          begin: /(?<=\{|<%|\?\?<)/dgv,
          beginCaptures: {},
          end: /\}|%>|\?\?>|(?=(?<!\\)\n)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.block.end.bracket.curly.union.cpp" }
          },
          name: "meta.body.union.cpp",
          patterns: [
            { include: "#function_pointer" },
            { include: "#static_assert" },
            { include: "#constructor_inline" },
            { include: "#destructor_inline" },
            { include: "#operator_overload" },
            { include: "#normal_variable_declaration" },
            { include: "#normal_variable_assignment" },
            { include: "$self" }
          ]
        },
        {
          begin: /(?<=\}|%>|\?\?>)\p{space}*/dgv,
          beginCaptures: {},
          end: /\p{space}*(?=;)|(?=(?<!\\)\n)/dgv,
          endCaptures: {},
          name: "meta.tail.union.cpp",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    using_namespace: {
      begin: new EmulatedRegExp("(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(using)\\p{space}+(namespace)\\p{space}+((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|atomic_noexcept|atomic_commit|atomic_cancel|__has_include|thread_local|dynamic_cast|synchronized|static_cast|const_cast|consteval|co_return|protected|constinit|constexpr|co_return|consteval|namespace|constexpr|co_await|explicit|volatile|noexcept|co_yield|noexcept|requires|typename|decltype|operator|template|continue|co_await|co_yield|volatile|register|restrict|reflexpr|mutable|alignof|include|private|defined|typedef|_Pragma|__asm__|concept|mutable|warning|default|virtual|alignas|public|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|ifndef|define|pragma|export|import|module|catch|throw|const|or_eq|compl|while|ifdef|const|bitor|union|class|undef|error|break|using|endif|goto|line|enum|this|case|else|elif|else|not|try|for|asm|and|xor|new|do|if|or|if)\\b)(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:(?=(\\p{space}*))\\5)(((?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\9)|\\*+(?!/))*))\\8)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\11)|\\*+(?!/))*))\\10)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\13)|\\*+(?!/))*))\\12)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\15)|\\*+(?!/))*))\\14)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:(?<!<)<(?!<)(?:/\\*(?:(?=((?:(?:(?=([^\\*]+))\\17)|\\*+(?!/))*))\\16)\\*/|\"(?:[^\"]*|\\\\\")\"|'(?:[^']*|\\\\')'|(?:)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\18))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\19))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\20))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\21))*>)|(?:(?=((?:[^\"'\\/\\<\\>]|/[^\\*])+))\\22))*>)(?:(?=(\\p{space}*))\\23))?::)*(?:(?=(\\p{space}*))\\24))?((?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:[A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))(?:[0-9A-Z_a-z]|\\\\(?:u\\p{AHex}{4}|U\\p{AHex}{8}))*(?![\\p{L}\\p{M}\\p{N}\\p{Pc}]))(?=[\\n\\;])", "dgv", { hiddenCaptures: [5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }),
      beginCaptures: {
        "1": { name: "keyword.other.using.directive.cpp" },
        "2": { name: "keyword.other.namespace.directive.cpp storage.type.namespace.directive.cpp" },
        "3": {
          patterns: [
            { include: "source.cpp#scope_resolution_namespace_using_inner_generated" }
          ]
        },
        "4": { name: "punctuation.separator.namespace.access.cpp punctuation.separator.scope-resolution.namespace.using.cpp" },
        "5": {
          patterns: [
            { include: "#template_call_range_helper" }
          ]
        },
        "6": {},
        "7": { name: "entity.name.namespace.cpp" }
      },
      end: /;|(?=(?<!\\)\n)/dgv,
      endCaptures: {
        "0": { name: "punctuation.terminator.statement.cpp" }
      },
      name: "meta.using-namespace.cpp"
    }
  },
  dependencies: [
    "regexp",
    "glsl"
  ]
};
