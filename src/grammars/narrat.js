export default {
  name: "narrat",
  displayName: "Narrat Language",
  aliases: [
    "nar"
  ],
  scopeName: "source.narrat",
  patterns: [
    { include: "#comments" },
    { include: "#expression" }
  ],
  repository: {
    commands: {
      patterns: [
        {
          match: /\b(set|var)\b/dgv,
          name: "keyword.commands.variables.narrat"
        },
        {
          match: /\b(t(?:alk|hink))\b/dgv,
          name: "keyword.commands.text.narrat"
        },
        {
          match: /\b(jump|run|wait|return|save|save_prompt)/dgv,
          name: "keyword.commands.flow.narrat"
        },
        {
          match: /\b((?:|clear_dia)log)\b/dgv,
          name: "keyword.commands.helpers.narrat"
        },
        {
          match: /\b(set_screen|empty_layer|set_button)/dgv,
          name: "keyword.commands.screens.narrat"
        },
        {
          match: /\b(play|pause|stop)\b/dgv,
          name: "keyword.commands.audio.narrat"
        },
        {
          match: /\b(notify|enable_notifications|disable_notifications)\b/dgv,
          name: "keyword.commands.notifications.narrat"
        },
        {
          match: /\b(set_stat|get_stat_value|add_stat)/dgv,
          name: "keyword.commands.stats.narrat"
        },
        {
          match: /\b(neg|abs|random|random_float|random_from_args|min|max|clamp|floor|round|ceil|sqrt|^)\b/dgv,
          name: "keyword.commands.math.narrat"
        },
        {
          match: /\b(concat|join)\b/dgv,
          name: "keyword.commands.string.narrat"
        },
        {
          match: /\b(text_field)\b/dgv,
          name: "keyword.commands.text_field.narrat"
        },
        {
          match: /\b(add_level|set_level|add_xp|roll|get_level|get_xp)\b/dgv,
          name: "keyword.commands.skills.narrat"
        },
        {
          match: /\b(add_item|remove_item|enable_interaction|disable_interaction|has_item?|item_amount?)/dgv,
          name: "keyword.commands.inventory.narrat"
        },
        {
          match: /\b(start_quest|start_objective|complete_objective|complete_quest|quest_started?|objective_started?|quest_completed?|objective_completed?)/dgv,
          name: "keyword.commands.quests.narrat"
        }
      ]
    },
    comments: {
      patterns: [
        {
          match: /\/\/[^\n]*(?=\n?$)/dgv,
          name: "comment.line.narrat"
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#keywords" },
        { include: "#commands" },
        { include: "#operators" },
        { include: "#primitives" },
        { include: "#strings" },
        { include: "#paren-expression" }
      ]
    },
    interpolation: {
      patterns: [
        {
          match: /([\.\p{L}\p{M}\p{N}\p{Pc}])+/dgv,
          name: "variable.interpolation.narrat"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(if|else|choice)\b/dgv,
          name: "keyword.control.narrat"
        },
        {
          match: /\$[\.\|\p{L}\p{M}\p{N}\p{Pc}]+\b/dgv,
          name: "variable.value.narrat"
        },
        {
          match: /^[\p{L}\p{M}\p{N}\p{Pc}]+(?=([\p{space}\p{L}\p{M}\p{N}\p{Pc}])*:)/dgv,
          name: "entity.name.function.narrat"
        },
        {
          match: /^[\p{L}\p{M}\p{N}\p{Pc}]+(?!([\p{space}\p{L}\p{M}\p{N}\p{Pc}])*:)/dgv,
          name: "invalid.label.narrat"
        },
        {
          match: /(?<=[\p{L}\p{M}\p{N}\p{Pc}])[^\^]\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b(?=([\p{space}\p{L}\p{M}\p{N}\p{Pc}])*:)/dgv,
          name: "entity.other.attribute-name"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /(&&|\|\||!=|==|>=|<=|[\!\<\>\?])\p{space}/dgv,
          name: "keyword.operator.logic.narrat"
        },
        {
          match: /([\-\*\+\/])\p{space}/dgv,
          name: "keyword.operator.arithmetic.narrat"
        }
      ]
    },
    "paren-expression": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.paren.open" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.paren.close" }
      },
      name: "expression.group",
      patterns: [
        { include: "#expression" }
      ]
    },
    primitives: {
      patterns: [
        {
          match: /\b\p{Nd}+\b/dgv,
          name: "constant.numeric.narrat"
        },
        {
          match: /\btrue\b/dgv,
          name: "constant.language.true.narrat"
        },
        {
          match: /\bfalse\b/dgv,
          name: "constant.language.false.narrat"
        },
        {
          match: /\bnull\b/dgv,
          name: "constant.language.null.narrat"
        },
        {
          match: /\bundefined\b/dgv,
          name: "constant.language.undefined.narrat"
        }
      ]
    },
    strings: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.narrat",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.narrat"
        },
        {
          begin: /%\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.template.open" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.template.close.narrat" }
          },
          name: "expression.template",
          patterns: [
            { include: "#expression" },
            { include: "#interpolation" }
          ]
        }
      ]
    }
  },
  dependencies: []
};
