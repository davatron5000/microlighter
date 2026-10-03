import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "gdscript",
  displayName: "GDScript",
  aliases: [
    "gd"
  ],
  scopeName: "source.gdscript",
  patterns: [
    { include: "#statement" },
    { include: "#expression" }
  ],
  repository: {
    annotated_parameter: {
      begin: /\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(:)\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?/dgv,
      beginCaptures: {
        "1": { name: "variable.parameter.function.language.gdscript" },
        "2": { name: "punctuation.separator.annotation.gdscript" },
        "3": { name: "entity.name.type.class.gdscript" }
      },
      end: /(,)|(?=\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.separator.parameters.gdscript" }
      },
      patterns: [
        { include: "#expression" },
        {
          match: /=(?!=)/dgv,
          name: "keyword.operator.assignment.gdscript"
        }
      ]
    },
    annotations: {
      captures: {
        "1": { name: "entity.name.function.decorator.gdscript" },
        "2": { name: "entity.name.function.decorator.gdscript" }
      },
      match: /(@)(abstract|export|export_category|export_color_no_alpha|export_custom|export_dir|export_enum|export_exp_easing|export_file|export_file_path|export_flags|export_flags_2d_navigation|export_flags_2d_physics|export_flags_2d_render|export_flags_3d_navigation|export_flags_3d_physics|export_flags_3d_render|export_flags_avoidance|export_global_dir|export_global_file|export_group|export_multiline|export_node_path|export_placeholder|export_range|export_storage|export_subgroup|export_tool_button|icon|onready|rpc|static_unload|tool|warning_ignore|warning_ignore_restore|warning_ignore_start)\b/dgv
    },
    any_method: {
      match: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b(?=\p{space}*\()/dgv,
      name: "entity.name.function.other.gdscript"
    },
    any_property: {
      captures: {
        "1": { name: "punctuation.accessor.gdscript" },
        "2": { name: "constant.language.gdscript" },
        "3": { name: "variable.other.property.gdscript" }
      },
      match: /\b(\.)\p{space}*(?<![\#\$\%\@])(?:([A-Z_][0-9A-Z_]*)|([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))\b(?!\()/dgv
    },
    any_variable: {
      match: /\b(?<![\#\$\%\@])([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b(?!\()/dgv,
      name: "variable.other.gdscript"
    },
    arithmetic_operator: {
      match: /->|\+=|-=|\*\*=|\*=|\^=|\/=|%=|&=|~=|\|=|\*\*|[\-\%\*\+\/]/dgv,
      name: "keyword.operator.arithmetic.gdscript"
    },
    assignment_operator: {
      match: /=/dgv,
      name: "keyword.operator.assignment.gdscript"
    },
    base_expression: {
      patterns: [
        { include: "#builtin_get_node_shorthand" },
        { include: "#nodepath_object" },
        { include: "#nodepath_function" },
        { include: "#strings" },
        { include: "#builtin_classes" },
        { include: "#const_vars" },
        { include: "#keywords" },
        { include: "#operators" },
        { include: "#lambda_declaration" },
        { include: "#class_declaration" },
        { include: "#variable_declaration" },
        { include: "#signal_declaration_bare" },
        { include: "#signal_declaration" },
        { include: "#function_declaration" },
        { include: "#statement_keyword" },
        { include: "#assignment_operator" },
        { include: "#in_keyword" },
        { include: "#control_flow" },
        { include: "#match_keyword" },
        { include: "#curly_braces" },
        { include: "#square_braces" },
        { include: "#round_braces" },
        { include: "#function_call" },
        { include: "#region" },
        { include: "#comment" },
        { include: "#func" },
        { include: "#letter" },
        { include: "#numbers" },
        { include: "#pascal_case_class" },
        { include: "#line_continuation" }
      ]
    },
    bitwise_operator: {
      match: /[\&\|]|<<=|>>=|<<|>>|[\^\~]/dgv,
      name: "keyword.operator.bitwise.gdscript"
    },
    boolean_operator: {
      match: /(&&|\|\|)/dgv,
      name: "keyword.operator.boolean.gdscript"
    },
    builtin_classes: {
      match: /(?<![^\.]\.|:)\b(Vector2i??|Vector3i??|Vector4i??|Color|Rect2i??|Array|Basis|Dictionary|Plane|Quat|RID|Rect3|Transform|Transform2D|Transform3D|AABB|String|Color|NodePath|PoolByteArray|PoolIntArray|PoolRealArray|PoolStringArray|PoolVector2Array|PoolVector3Array|PoolColorArray|bool|int|float|Signal|Callable|StringName|Quaternion|Projection|PackedByteArray|PackedInt32Array|PackedInt64Array|PackedFloat32Array|PackedFloat64Array|PackedStringArray|PackedVector2Array|PackedVector2iArray|PackedVector3Array|PackedVector3iArray|PackedVector4Array|PackedColorArray|JSON|UPNP|OS|IP|JSONRPC|XRVRS|Variant|void)\b/dgv,
      name: "entity.name.type.class.builtin.gdscript"
    },
    builtin_get_node_shorthand: {
      patterns: [
        { include: "#builtin_get_node_shorthand_quoted" },
        { include: "#builtin_get_node_shorthand_bare" },
        { include: "#builtin_get_node_shorthand_bare_multi" }
      ]
    },
    builtin_get_node_shorthand_bare: {
      captures: {
        "1": { name: "keyword.control.flow.gdscript" },
        "2": { name: "constant.character.escape.gdscript" },
        "3": { name: "constant.character.escape.gdscript" },
        "4": { name: "constant.character.escape.gdscript" }
      },
      match: /(?<!\/\p{space}*)(\$\p{space}*|%|\$%\p{space}*)(\/\p{space}*)?([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b(?!\p{space}*\/)/dgv,
      name: "meta.literal.nodepath.bare.gdscript"
    },
    builtin_get_node_shorthand_bare_multi: {
      begin: /(\$\p{space}*|%|\$%\p{space}*)(\/\p{space}*)?([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.flow.gdscript" },
        "2": { name: "constant.character.escape.gdscript" },
        "3": { name: "constant.character.escape.gdscript" }
      },
      end: /(?!\p{space}*\/\p{space}*%?\p{space}*[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
      name: "meta.literal.nodepath.bare.gdscript",
      patterns: [
        {
          captures: {
            "1": { name: "constant.character.escape.gdscript" },
            "2": { name: "keyword.control.flow.gdscript" },
            "3": { name: "constant.character.escape.gdscript" }
          },
          match: /(\/)\p{space}*(%)?\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*/dgv
        }
      ]
    },
    builtin_get_node_shorthand_quoted: {
      begin: /(?:([\$\%])|([\&\@\^]))(["'])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.flow.gdscript" },
        "2": { name: "variable.other.enummember.gdscript" }
      },
      end: /(3)/dgv,
      name: "string.quoted.gdscript meta.literal.nodepath.gdscript constant.character.escape.gdscript",
      patterns: [
        {
          match: /%/dgv,
          name: "keyword.control.flow"
        }
      ]
    },
    class_declaration: {
      captures: {
        "1": { name: "entity.name.type.class.gdscript" },
        "2": { name: "class.other.gdscript" }
      },
      match: /(?<=^class)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?=:)/dgv
    },
    class_enum: {
      captures: {
        "1": { name: "entity.name.type.class.gdscript" },
        "2": { name: "variable.other.enummember.gdscript" }
      },
      match: /\b([A-Z][0-9A-Z_a-z]*)\.([0-9A-Z_]+)/dgv
    },
    class_is: {
      captures: {
        "1": { name: "storage.type.is.gdscript" },
        "2": { name: "storage.type.not.gdscript" },
        "3": { name: "entity.name.type.class.gdscript" }
      },
      match: /\p{space}+(is)\p{space}+(not?)\p{space}+\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
    },
    class_name: {
      captures: {
        "1": { name: "entity.name.type.class.gdscript" },
        "2": { name: "class.other.gdscript" }
      },
      match: /(?<=class_name)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*(\.([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?)/dgv
    },
    class_new: {
      captures: {
        "1": { name: "entity.name.type.class.gdscript" },
        "2": { name: "storage.type.new.gdscript" },
        "3": { name: "punctuation.parenthesis.begin.gdscript" }
      },
      match: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)[^\n](new)\(/dgv
    },
    comment: {
      captures: {
        "1": { name: "punctuation.definition.comment.number-sign.gdscript" }
      },
      match: /(##?)[^\n]*(?=\n?$)\n?/dgv,
      name: "comment.line.number-sign.gdscript"
    },
    compare_operator: {
      match: /<=|>=|==|[\<\>]|!=?/dgv,
      name: "keyword.operator.comparison.gdscript"
    },
    const_vars: {
      match: /\b([A-Z_][0-9A-Z_]*)\b/dgv,
      name: "variable.other.constant.gdscript"
    },
    control_flow: {
      match: /\b(?:if|elif|else|while|break|continue|pass|return|when|yield|await)\b/dgv,
      name: "keyword.control.gdscript"
    },
    curly_braces: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.dict.begin.gdscript" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.dict.end.gdscript" }
      },
      patterns: [
        { include: "#base_expression" },
        { include: "#any_variable" }
      ]
    },
    expression: {
      patterns: [
        { include: "#getter_setter_godot4" },
        { include: "#base_expression" },
        { include: "#assignment_operator" },
        { include: "#annotations" },
        { include: "#class_name" },
        { include: "#builtin_classes" },
        { include: "#class_new" },
        { include: "#class_is" },
        { include: "#class_enum" },
        { include: "#any_method" },
        { include: "#any_variable" },
        { include: "#any_property" }
      ]
    },
    extends_statement: {
      captures: {
        "1": { name: "keyword.language.gdscript" },
        "2": { name: "entity.other.inherited-class.gdscript" }
      },
      match: /(extends)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*\.[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?/dgv
    },
    func: {
      match: /\bfunc\b/dgv,
      name: "keyword.language.gdscript storage.type.function.gdscript"
    },
    function_arguments: {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.arguments.begin.gdscript" }
      },
      contentName: "meta.function.parameters.gdscript",
      end: /(?=\))(?!\)\p{space}*\()/dgv,
      patterns: [
        {
          match: /(,)/dgv,
          name: "punctuation.separator.arguments.gdscript"
        },
        {
          captures: {
            "1": { name: "variable.parameter.function-call.gdscript" },
            "2": { name: "keyword.operator.assignment.gdscript" }
          },
          match: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(=)(?!=)/dgv
        },
        {
          match: /=(?!=)/dgv,
          name: "keyword.operator.assignment.gdscript"
        },
        { include: "#base_expression" },
        {
          captures: {
            "1": { name: "punctuation.definition.arguments.end.gdscript" },
            "2": { name: "punctuation.definition.arguments.begin.gdscript" }
          },
          match: /\p{space}*(\))\p{space}*(\()/dgv
        },
        { include: "#letter" },
        { include: "#any_variable" },
        { include: "#any_property" },
        { include: "#keywords" }
      ]
    },
    function_call: {
      begin: /(?=\b[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*\b\p{space}*\()/dgv,
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.arguments.end.gdscript" }
      },
      name: "meta.function-call.gdscript",
      patterns: [
        { include: "#function_name" },
        { include: "#function_arguments" }
      ]
    },
    function_declaration: {
      begin: /\p{space}*(func)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.language.gdscript storage.type.function.gdscript" },
        "2": { name: "entity.name.function.gdscript" }
      },
      end: /(:)|\n/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.function.begin.gdscript" }
      },
      name: "meta.function.gdscript",
      patterns: [
        { include: "#parameters" },
        { include: "#line_continuation" },
        { include: "#base_expression" }
      ]
    },
    function_name: {
      patterns: [
        { include: "#builtin_classes" },
        {
          match: /\b(preload)\b/dgv,
          name: "keyword.language.gdscript"
        },
        {
          match: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
          name: "entity.name.function.gdscript"
        }
      ]
    },
    getter_setter_godot4: {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.gdscript" },
            "2": { name: "punctuation.separator.annotation.gdscript" }
          },
          match: /(get)\p{space}*(:)/dgv,
          name: "meta.variable.declaration.getter.gdscript"
        },
        {
          captures: {
            "1": { name: "entity.name.function.gdscript" },
            "2": { name: "punctuation.definition.arguments.begin.gdscript" },
            "3": { name: "variable.other.gdscript" },
            "4": { name: "punctuation.definition.arguments.end.gdscript" },
            "5": { name: "punctuation.separator.annotation.gdscript" }
          },
          match: /(set)\p{space}*(\()\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\))\p{space}*(:)/dgv,
          name: "meta.variable.declaration.setter.gdscript"
        }
      ]
    },
    in_keyword: {
      patterns: [
        {
          begin: /\b(for)\b/dgv,
          captures: {
            "1": { name: "keyword.control.gdscript" }
          },
          end: /:/dgv,
          patterns: [
            {
              match: /\bin\b/dgv,
              name: "keyword.control.gdscript"
            },
            { include: "#base_expression" },
            { include: "#any_variable" },
            { include: "#any_property" }
          ]
        },
        {
          match: /\bin\b/dgv,
          name: "keyword.operator.wordlike.gdscript"
        }
      ]
    },
    keywords: {
      match: /\b(?:class|class_name|is|onready|tool|static|export|as|enum|assert|breakpoint|sync|remote|master|puppet|slave|remotesync|mastersync|puppetsync|trait|namespace|super|self)\b/dgv,
      name: "keyword.language.gdscript"
    },
    lambda_declaration: {
      begin: /(func)\p{space}?(?=\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.language.gdscript storage.type.function.gdscript" },
        "2": { name: "entity.name.function.gdscript" }
      },
      end: /(:|(?=[\n"\#']))/dgv,
      end2: "(\\s*(\\-\\>)\\s*(void\\w*)|([a-zA-Z_]\\w*)\\s*\\:)",
      endCaptures2: {
        "1": { name: "punctuation.separator.annotation.result.gdscript" },
        "2": { name: "entity.name.type.class.builtin.gdscript" },
        "3": { name: "entity.name.type.class.gdscript markup.italic" }
      },
      name: "meta.function.gdscript",
      patterns: [
        { include: "#parameters" },
        { include: "#line_continuation" },
        { include: "#base_expression" },
        { include: "#any_variable" },
        { include: "#any_property" }
      ]
    },
    letter: {
      match: /\b(?:true|false|null)\b/dgv,
      name: "constant.language.literal.gdscript"
    },
    line_continuation: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.continuation.line.gdscript" },
            "2": { name: "invalid.illegal.line.continuation.gdscript" }
          },
          match: /(\\)\p{space}*(\P{space}[^\n]*(?=\n?$)\n?)/dgv
        },
        {
          begin: /(\\)\p{space}*(?=\n?$)\n?/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.continuation.line.gdscript" }
          },
          end: {
            G: [/(?=^\p{space}*(?=\n?$))|(?!(\p{space}*[Rr]?('''|"""|["']))|￿()(?=\n?$))/dgv, new EmulatedRegExp("(?=^\\p{space}*(?=\\n?$))|(?!(\\p{space}*[Rr]?('''|\"\"\"|[\"']))|^()(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            { include: "#base_expression" }
          ]
        }
      ]
    },
    loose_default: {
      begin: /(=)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.gdscript" }
      },
      end: /(,)|(?=\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.separator.parameters.gdscript" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    match_keyword: {
      captures: {
        "1": { name: "keyword.control.flow.gdscript" }
      },
      match: /(?:^|:)\p{space}*(match)\b/dgv
    },
    nodepath_function: {
      begin: /(get_node_or_null|has_node|has_node_and_resource|find_node|get_node)\p{space}*(\()/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.gdscript" },
        "2": { name: "punctuation.definition.parameters.begin.gdscript" }
      },
      contentName: "meta.function.parameters.gdscript",
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.parameters.end.gdscript" }
      },
      name: "meta.function.gdscript",
      patterns: [
        {
          begin: /(["'])/dgv,
          end: /1/dgv,
          name: "string.quoted.gdscript meta.literal.nodepath.gdscript constant.character.escape.gdscript",
          patterns: [
            {
              match: /%/dgv,
              name: "keyword.control.flow.gdscript"
            }
          ]
        },
        { include: "#expression" }
      ]
    },
    nodepath_object: {
      begin: /(NodePath)\p{space}*\(/dgv,
      beginCaptures: {
        "1": { name: "support.class.library.gdscript" }
      },
      end: /\)/dgv,
      name: "meta.literal.nodepath.gdscript",
      patterns: [
        {
          begin: /(["'])/dgv,
          end: /1/dgv,
          name: "string.quoted.gdscript constant.character.escape.gdscript",
          patterns: [
            {
              match: /%/dgv,
              name: "keyword.control.flow.gdscript"
            }
          ]
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /0b[01_]+/dgv,
          name: "constant.numeric.integer.binary.gdscript"
        },
        {
          match: /0x[_\p{AHex}]+/dgv,
          name: "constant.numeric.integer.hexadecimal.gdscript"
        },
        {
          match: /\.[0-9][0-9_]*([Ee][\-\+]?[0-9_]+)?/dgv,
          name: "constant.numeric.float.gdscript"
        },
        {
          match: /([0-9][0-9_]*)\.[0-9_]*([Ee][\-\+]?[0-9_]+)?/dgv,
          name: "constant.numeric.float.gdscript"
        },
        {
          match: /([0-9][0-9_]*)?\.[0-9_]*([Ee][\-\+]?[0-9_]+)/dgv,
          name: "constant.numeric.float.gdscript"
        },
        {
          match: /[0-9][0-9_]*[Ee][\-\+]?[0-9_]+/dgv,
          name: "constant.numeric.float.gdscript"
        },
        {
          match: /-?[0-9][0-9_]*/dgv,
          name: "constant.numeric.integer.gdscript"
        }
      ]
    },
    operators: {
      patterns: [
        { include: "#wordlike_operator" },
        { include: "#boolean_operator" },
        { include: "#arithmetic_operator" },
        { include: "#bitwise_operator" },
        { include: "#compare_operator" }
      ]
    },
    parameters: {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.parameters.begin.gdscript" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.parameters.end.gdscript" }
      },
      name: "meta.function.parameters.gdscript",
      patterns: [
        { include: "#annotated_parameter" },
        {
          captures: {
            "1": { name: "variable.parameter.function.language.gdscript" },
            "2": { name: "punctuation.separator.parameters.gdscript" }
          },
          match: /([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?:(,)|(?=[\n\#\)\=]))/dgv
        },
        { include: "#comment" },
        { include: "#loose_default" }
      ]
    },
    pascal_case_class: {
      match: /\b[A-Z]+(?:[a-z]+[0-9A-Z_a-z]*)+\b/dgv,
      name: "entity.name.type.class.gdscript"
    },
    region: {
      match: /#(end)?region[^\n]*(?=\n?$)\n?/dgv,
      name: "keyword.language.region.gdscript"
    },
    round_braces: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.begin.gdscript" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.end.gdscript" }
      },
      patterns: [
        { include: "#base_expression" },
        { include: "#any_variable" }
      ]
    },
    signal_declaration: {
      begin: /\p{space}*(signal)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.language.gdscript storage.type.function.gdscript" },
        "2": { name: "entity.name.function.gdscript" }
      },
      end: /((?=[\n"\#']))/dgv,
      name: "meta.signal.gdscript",
      patterns: [
        { include: "#parameters" },
        { include: "#line_continuation" }
      ]
    },
    signal_declaration_bare: {
      captures: {
        "1": { name: "keyword.language.gdscript storage.type.function.gdscript" },
        "2": { name: "entity.name.function.gdscript" }
      },
      match: /\p{space}*(signal)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)(?=[\n\p{space}])/dgv,
      name: "meta.signal.gdscript"
    },
    square_braces: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.list.begin.gdscript" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.list.end.gdscript" }
      },
      patterns: [
        { include: "#base_expression" },
        { include: "#any_variable" }
      ]
    },
    statement: {
      patterns: [
        { include: "#extends_statement" }
      ]
    },
    statement_keyword: {
      patterns: [
        {
          match: /\b(?<!\.)(continue|assert|break|elif|else|if|pass|return|while)\b/dgv,
          name: "keyword.control.flow.gdscript"
        },
        {
          match: /\b(?<!\.)(class)\b/dgv,
          name: "storage.type.class.gdscript"
        },
        {
          captures: {
            "1": { name: "keyword.control.flow.gdscript" }
          },
          match: /(?:^|:)\p{space}*(case|match)(?=\p{space}*([\-"\#'\(\+\:\[\{\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]|(?=\n?$)))\b/dgv
        }
      ]
    },
    string_bracket_placeholders: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.character.format.placeholder.other.gdscript" },
            "3": { name: "storage.type.format.gdscript" },
            "4": { name: "storage.type.format.gdscript" }
          },
          match: /(\{\{|\}\}|\{[\p{L}\p{M}\p{N}\p{Pc}]*(\.[_\p{Alpha}][\p{L}\p{M}\p{N}\p{Pc}]*|\[[^\]"']+\])*(![ars])?(:[\p{L}\p{M}\p{N}\p{Pc}]?[\<\=\>\^]?[\- \+]?#?\p{Nd}*,?(\.\p{Nd}+)?[\%EFGXb-gnosx]?)?\})/dgv,
          name: "meta.format.brace.gdscript"
        },
        {
          captures: {
            "1": { name: "constant.character.format.placeholder.other.gdscript" },
            "3": { name: "storage.type.format.gdscript" },
            "4": { name: "storage.type.format.gdscript" }
          },
          match: /(\{[\p{L}\p{M}\p{N}\p{Pc}]*(\.[_\p{Alpha}][\p{L}\p{M}\p{N}\p{Pc}]*|\[[^\]"']+\])*(![ars])?(:)[^\n"'\{\}]*(?:\{[^\n"'\}]*?\}[^\n"'\{\}]*)*\})/dgv,
          name: "meta.format.brace.gdscript"
        }
      ]
    },
    string_percent_placeholders: {
      captures: {
        "1": { name: "constant.character.format.placeholder.other.gdscript" }
      },
      match: /(%(\([\p{L}\p{M}\p{N}\p{Pc}\p{space}]*\))?[\- \#\+0]*(\p{Nd}+|\*)?(\.(\p{Nd}+|\*))?([Lhl])?[\%EFGXa-giorsux])/dgv,
      name: "meta.format.percent.gdscript"
    },
    strings: {
      begin: /(r)?("""|'''|["'])/dgv,
      beginCaptures: {
        "1": { name: "constant.character.escape.gdscript" }
      },
      end: /2/dgv,
      name: "string.quoted.gdscript",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.gdscript"
        },
        { include: "#string_percent_placeholders" },
        { include: "#string_bracket_placeholders" }
      ]
    },
    variable_declaration: {
      begin: /\b(?:(var)|(const))\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.language.gdscript storage.type.var.gdscript" },
        "2": { name: "keyword.language.gdscript storage.type.const.gdscript" }
      },
      end: /(?=\n?$)|;/dgv,
      name: "meta.variable.declaration.gdscript",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.annotation.gdscript" },
            "2": { name: "entity.name.function.gdscript" },
            "3": { name: "entity.name.function.gdscript" }
          },
          match: /(:)?\p{space}*([gs]et)\p{space}+=\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv
        },
        {
          match: /:=|=(?!=)/dgv,
          name: "keyword.operator.assignment.gdscript"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.annotation.gdscript" },
            "2": { name: "entity.name.type.class.gdscript" }
          },
          match: /(:)\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)?/dgv
        },
        {
          captures: {
            "1": { name: "keyword.language.gdscript" },
            "2": { name: "entity.name.function.gdscript" },
            "3": { name: "entity.name.function.gdscript" }
          },
          match: /(setget)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)(?:,\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?/dgv
        },
        { include: "#expression" },
        { include: "#letter" },
        { include: "#any_variable" },
        { include: "#any_property" },
        { include: "#keywords" }
      ]
    },
    wordlike_operator: {
      match: /\b(and|or|not)\b/dgv,
      name: "keyword.operator.wordlike.gdscript"
    }
  },
  dependencies: []
};
