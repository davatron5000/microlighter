export default {
  name: "liquid",
  displayName: "Liquid",
  scopeName: "text.html.liquid",
  patterns: [
    { include: "#core" }
  ],
  repository: {
    attribute: {
      begin: /[\p{L}\p{M}\p{N}\p{Pc}]+:/dgv,
      beginCaptures: {
        "0": { name: "entity.other.attribute-name.liquid" }
      },
      end: /(?=,|%\}|\}\}|\|)/dgv,
      patterns: [
        { include: "#value_expression" }
      ]
    },
    attribute_liquid: {
      begin: /[\p{L}\p{M}\p{N}\p{Pc}]+:/dgv,
      beginCaptures: {
        "0": { name: "entity.other.attribute-name.liquid" }
      },
      end: /(?=[\,\|])|(?=\n?$)/dgv,
      patterns: [
        { include: "#value_expression" }
      ]
    },
    comment_block: {
      begin: /\{%-?\p{space}*comment\p{space}*-?%\}/dgv,
      end: /\{%-?\p{space}*endcomment\p{space}*-?%\}/dgv,
      name: "comment.block.liquid",
      patterns: [
        { include: "#comment_block" },
        {
          match: /([^\n](?!\{%-?\p{space}*((?:|end)comment)\p{space}*-?%\}))*[^\n]/dgv
        }
      ]
    },
    core: {
      patterns: [
        { include: "#raw_tag" },
        { include: "#doc_tag" },
        { include: "#comment_block" },
        { include: "#style_codefence" },
        { include: "#stylesheet_codefence" },
        { include: "#json_codefence" },
        { include: "#javascript_codefence" },
        { include: "#object" },
        { include: "#tag" },
        { include: "text.html.basic" }
      ]
    },
    doc_tag: {
      begin: /\{%-?\p{space}*(doc)\p{space}*-?%\}/dgv,
      beginCaptures: {
        "0": { name: "meta.tag.liquid" },
        "1": { name: "entity.name.tag.doc.liquid" }
      },
      contentName: "comment.block.documentation.liquid",
      end: /\{%-?\p{space}*(enddoc)\p{space}*-?%\}/dgv,
      endCaptures: {
        "0": { name: "meta.tag.liquid" },
        "1": { name: "entity.name.tag.doc.liquid" }
      },
      name: "meta.block.doc.liquid",
      patterns: [
        { include: "#liquid_doc_description_tag" },
        { include: "#liquid_doc_param_tag" },
        { include: "#liquid_doc_example_tag" },
        { include: "#liquid_doc_prompt_tag" },
        { include: "#liquid_doc_fallback_tag" }
      ]
    },
    filter: {
      captures: {
        "1": { name: "support.function.liquid" }
      },
      match: /\|\p{space}*((?![\.0-9])[\-0-9A-Z_a-z]+:?)\p{space}*/dgv
    },
    injection: {
      patterns: [
        { include: "#raw_tag" },
        { include: "#comment_block" },
        { include: "#object" },
        { include: "#tag_injection" }
      ]
    },
    invalid_range: {
      match: /\(([^\n](?!\.\.))+\)/dgv,
      name: "invalid.illegal.range.liquid"
    },
    javascript_codefence: {
      begin: /(\{%-?)\p{space}*(javascript)\p{space}*(-?%\})/dgv,
      beginCaptures: {
        "0": { name: "meta.tag.metadata.javascript.start.liquid" },
        "1": { name: "punctuation.definition.tag.begin.liquid" },
        "2": { name: "entity.name.tag.javascript.liquid" },
        "3": { name: "punctuation.definition.tag.begin.liquid" }
      },
      contentName: "meta.embedded.block.js",
      end: /(\{%-?)\p{space}*(endjavascript)\p{space}*(-?%\})/dgv,
      endCaptures: {
        "0": { name: "meta.tag.metadata.javascript.end.liquid" },
        "1": { name: "punctuation.definition.tag.end.liquid" },
        "2": { name: "entity.name.tag.javascript.liquid" },
        "3": { name: "punctuation.definition.tag.end.liquid" }
      },
      name: "meta.block.javascript.liquid",
      patterns: [
        { include: "source.js" }
      ]
    },
    json_codefence: {
      begin: /(\{%-?)\p{space}*(schema)\p{space}*(-?%\})/dgv,
      beginCaptures: {
        "0": { name: "meta.tag.metadata.schema.start.liquid" },
        "1": { name: "punctuation.definition.tag.begin.liquid" },
        "2": { name: "entity.name.tag.schema.liquid" },
        "3": { name: "punctuation.definition.tag.begin.liquid" }
      },
      contentName: "meta.embedded.block.json",
      end: /(\{%-?)\p{space}*(endschema)\p{space}*(-?%\})/dgv,
      endCaptures: {
        "0": { name: "meta.tag.metadata.schema.end.liquid" },
        "1": { name: "punctuation.definition.tag.end.liquid" },
        "2": { name: "entity.name.tag.schema.liquid" },
        "3": { name: "punctuation.definition.tag.end.liquid" }
      },
      name: "meta.block.schema.liquid",
      patterns: [
        { include: "source.json" }
      ]
    },
    language_constant: {
      match: /\b(false|true|nil|blank)\b|empty(?!\?)/dgv,
      name: "constant.language.liquid"
    },
    liquid_doc_description_tag: {
      begin: /(@description)\b\p{space}*/dgv,
      beginCaptures: {
        "0": { name: "comment.block.documentation.liquid" },
        "1": { name: "storage.type.class.liquid" }
      },
      contentName: "string.quoted.single.liquid",
      end: /(?=@prompt|@example|@param|@description|\{%-?\p{space}*enddoc\p{space}*-?%\})/dgv
    },
    liquid_doc_example_tag: {
      begin: /(@example)\b\p{space}*/dgv,
      beginCaptures: {
        "0": { name: "comment.block.documentation.liquid" },
        "1": { name: "storage.type.class.liquid" }
      },
      contentName: "meta.embedded.block.liquid",
      end: /(?=@prompt|@example|@param|@description|\{%-?\p{space}*enddoc\p{space}*-?%\})/dgv,
      patterns: [
        { include: "#core" }
      ]
    },
    liquid_doc_fallback_tag: {
      captures: {
        "1": { name: "comment.block.liquid" }
      },
      match: /(@[\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv
    },
    liquid_doc_param_tag: {
      captures: {
        "1": { name: "storage.type.class.liquid" },
        "2": { name: "entity.name.type.instance.liquid" },
        "3": { name: "variable.other.liquid" },
        "4": { name: "string.quoted.single.liquid" }
      },
      match: /(@param)\p{space}+(?:(\{[^\}]*\}?)\p{space}+)?(\[?[A-Z_a-z][\-\p{L}\p{M}\p{N}\p{Pc}]*\]?)?(?:\p{space}+([^\n]*))?/dgv
    },
    liquid_doc_prompt_tag: {
      begin: /(@prompt)\b\p{space}*/dgv,
      beginCaptures: {
        "0": { name: "comment.block.documentation.liquid" },
        "1": { name: "storage.type.class.liquid" }
      },
      contentName: "string.quoted.single.liquid",
      end: /(?=@prompt|@example|@param|@description|\{%-?\p{space}*enddoc\p{space}*-?%\})/dgv
    },
    number: {
      match: /(([\-\+])\p{space}*)?[0-9]+(\.[0-9]+)?/dgv,
      name: "constant.numeric.liquid"
    },
    object: {
      begin: /(?<!comment %\})(?<!comment -%\})(?<!comment%\})(?<!comment-%\})(?<!raw %\})(?<!raw -%\})(?<!raw%\})(?<!raw-%\})\{\{-?/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.tag.begin.liquid" }
      },
      end: /-?\}\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.liquid" }
      },
      name: "meta.object.liquid",
      patterns: [
        { include: "#filter" },
        { include: "#attribute" },
        { include: "#value_expression" }
      ]
    },
    operator: {
      captures: {
        "1": { name: "keyword.operator.expression.liquid" }
      },
      match: /(?:(?<=\p{space})|\b)(==|!=|[\<\>]|>=|<=|or|and|contains)(?:(?=\p{space})|\b)/dgv
    },
    range: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.parens.begin.liquid" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.end.liquid" }
      },
      name: "meta.range.liquid",
      patterns: [
        {
          match: /\.\./dgv,
          name: "punctuation.range.liquid"
        },
        { include: "#variable_lookup" },
        { include: "#number" }
      ]
    },
    raw_tag: {
      begin: /\{%-?\p{space}*(raw)\p{space}*-?%\}/dgv,
      beginCaptures: {
        "1": { name: "entity.name.tag.liquid" }
      },
      contentName: "string.unquoted.liquid",
      end: /\{%-?\p{space}*(endraw)\p{space}*-?%\}/dgv,
      endCaptures: {
        "1": { name: "entity.name.tag.liquid" }
      },
      name: "meta.entity.tag.raw.liquid",
      patterns: [
        {
          match: /([^\n](?!\{%-?\p{space}*endraw\p{space}*-?%\}))*[^\n]/dgv
        }
      ]
    },
    string: {
      patterns: [
        { include: "#string_single" },
        { include: "#string_double" }
      ]
    },
    string_double: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.liquid"
    },
    string_single: {
      begin: /'/dgv,
      end: /'/dgv,
      name: "string.quoted.single.liquid"
    },
    style_codefence: {
      begin: /(\{%-?)\p{space}*(style)\p{space}*(-?%\})/dgv,
      beginCaptures: {
        "0": { name: "meta.tag.metadata.style.start.liquid" },
        "1": { name: "punctuation.definition.tag.begin.liquid" },
        "2": { name: "entity.name.tag.style.liquid" },
        "3": { name: "punctuation.definition.tag.begin.liquid" }
      },
      contentName: "meta.embedded.block.css",
      end: /(\{%-?)\p{space}*(endstyle)\p{space}*(-?%\})/dgv,
      endCaptures: {
        "0": { name: "meta.tag.metadata.style.end.liquid" },
        "1": { name: "punctuation.definition.tag.end.liquid" },
        "2": { name: "entity.name.tag.style.liquid" },
        "3": { name: "punctuation.definition.tag.end.liquid" }
      },
      name: "meta.block.style.liquid",
      patterns: [
        { include: "source.css" }
      ]
    },
    stylesheet_codefence: {
      begin: /(\{%-?)\p{space}*(stylesheet)\p{space}*(-?%\})/dgv,
      beginCaptures: {
        "0": { name: "meta.tag.metadata.style.start.liquid" },
        "1": { name: "punctuation.definition.tag.begin.liquid" },
        "2": { name: "entity.name.tag.style.liquid" },
        "3": { name: "punctuation.definition.tag.begin.liquid" }
      },
      contentName: "meta.embedded.block.css",
      end: /(\{%-?)\p{space}*(endstylesheet)\p{space}*(-?%\})/dgv,
      endCaptures: {
        "0": { name: "meta.tag.metadata.style.end.liquid" },
        "1": { name: "punctuation.definition.tag.end.liquid" },
        "2": { name: "entity.name.tag.style.liquid" },
        "3": { name: "punctuation.definition.tag.end.liquid" }
      },
      name: "meta.block.style.liquid",
      patterns: [
        { include: "source.css" }
      ]
    },
    tag: {
      begin: /(?<!comment %\})(?<!comment -%\})(?<!comment%\})(?<!comment-%\})(?<!raw %\})(?<!raw -%\})(?<!raw%\})(?<!raw-%\})\{%-?/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.tag.begin.liquid" }
      },
      end: /-?%\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.liquid" }
      },
      name: "meta.tag.liquid",
      patterns: [
        { include: "#tag_body" }
      ]
    },
    tag_assign: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(assign|echo)\b/dgv,
      beginCaptures: {
        "1": { name: "entity.name.tag.liquid" }
      },
      end: /(?=%\})/dgv,
      name: "meta.entity.tag.liquid",
      patterns: [
        { include: "#filter" },
        { include: "#attribute" },
        { include: "#value_expression" }
      ]
    },
    tag_assign_liquid: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(assign|echo)\b/dgv,
      beginCaptures: {
        "1": { name: "entity.name.tag.liquid" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.entity.tag.liquid",
      patterns: [
        { include: "#filter" },
        { include: "#attribute_liquid" },
        { include: "#value_expression" }
      ]
    },
    tag_body: {
      patterns: [
        { include: "#tag_liquid" },
        { include: "#tag_assign" },
        { include: "#tag_comment_inline" },
        { include: "#tag_case" },
        { include: "#tag_conditional" },
        { include: "#tag_for" },
        { include: "#tag_paginate" },
        { include: "#tag_render" },
        { include: "#tag_tablerow" },
        { include: "#tag_expression" }
      ]
    },
    tag_case: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(case|when)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.case.liquid" }
      },
      end: /(?=%\})/dgv,
      name: "meta.entity.tag.case.liquid",
      patterns: [
        { include: "#value_expression" }
      ]
    },
    tag_case_liquid: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(case|when)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.case.liquid" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.entity.tag.case.liquid",
      patterns: [
        { include: "#value_expression" }
      ]
    },
    tag_comment_block_liquid: {
      begin: /^\p{space}*(comment)\b/dgv,
      end: /^\p{space}*(endcomment)\b/dgv,
      name: "comment.block.liquid",
      patterns: [
        { include: "#tag_comment_block_liquid" },
        {
          match: /^\p{space}*(?!((?:|end)comment))[^\n]*/dgv
        }
      ]
    },
    tag_comment_inline: {
      begin: /#/dgv,
      end: /(?=%\})/dgv,
      name: "comment.line.number-sign.liquid"
    },
    tag_comment_inline_liquid: {
      begin: /^\p{space}*#[^\n]*/dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.number-sign.liquid"
    },
    tag_conditional: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(if|elsif|unless)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.conditional.liquid" }
      },
      end: /(?=%\})/dgv,
      name: "meta.entity.tag.conditional.liquid",
      patterns: [
        { include: "#value_expression" }
      ]
    },
    tag_conditional_liquid: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(if|elsif|unless)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.conditional.liquid" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.entity.tag.conditional.liquid",
      patterns: [
        { include: "#value_expression" }
      ]
    },
    tag_expression: {
      patterns: [
        { include: "#tag_expression_without_arguments" },
        {
          begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.liquid" }
          },
          end: /(?=%\})/dgv,
          name: "meta.entity.tag.liquid",
          patterns: [
            { include: "#value_expression" }
          ]
        }
      ]
    },
    tag_expression_liquid: {
      patterns: [
        { include: "#tag_expression_without_arguments" },
        {
          begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.tag.liquid" }
          },
          end: /(?=\n?$)/dgv,
          name: "meta.entity.tag.liquid",
          patterns: [
            { include: "#value_expression" }
          ]
        }
      ]
    },
    tag_expression_without_arguments: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.conditional.liquid" }
          },
          match: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(end(?:unless|if))\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control.loop.liquid" }
          },
          match: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(end(?:for|tablerow|paginate))\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control.case.liquid" }
          },
          match: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(endcase)\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control.other.liquid" }
          },
          match: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(capture|case|comment|form??|if|javascript|paginate|schema|style)\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control.other.liquid" }
          },
          match: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(end(?:capture|case|comment|form??|if|javascript|paginate|schema|style))\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.control.other.liquid" }
          },
          match: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(else|break|continue)\b/dgv
        }
      ]
    },
    tag_for: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(for)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.for.liquid" }
      },
      end: /(?=%\})/dgv,
      name: "meta.entity.tag.for.liquid",
      patterns: [
        { include: "#tag_for_body" }
      ]
    },
    tag_for_body: {
      patterns: [
        {
          match: /\b(in|reversed)\b/dgv,
          name: "keyword.control.liquid"
        },
        {
          match: /\b(offset|limit):/dgv,
          name: "keyword.control.liquid"
        },
        { include: "#value_expression" }
      ]
    },
    tag_for_liquid: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(for)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.for.liquid" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.entity.tag.for.liquid",
      patterns: [
        { include: "#tag_for_body" }
      ]
    },
    tag_injection: {
      begin: /(?<!comment %\})(?<!comment -%\})(?<!comment%\})(?<!comment-%\})(?<!raw %\})(?<!raw -%\})(?<!raw%\})(?<!raw-%\})\{%-?(?!-?\p{space}*(end(?:style|javascript|comment|raw)))/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.tag.end.liquid" }
      },
      end: /-?%\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.liquid" }
      },
      name: "meta.tag.liquid",
      patterns: [
        { include: "#tag_body" }
      ]
    },
    tag_liquid: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(liquid)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.liquid.liquid" }
      },
      end: /(?=%\})/dgv,
      name: "meta.entity.tag.liquid.liquid",
      patterns: [
        { include: "#tag_comment_block_liquid" },
        { include: "#tag_comment_inline_liquid" },
        { include: "#tag_assign_liquid" },
        { include: "#tag_case_liquid" },
        { include: "#tag_conditional_liquid" },
        { include: "#tag_for_liquid" },
        { include: "#tag_paginate_liquid" },
        { include: "#tag_render_liquid" },
        { include: "#tag_tablerow_liquid" },
        { include: "#tag_expression_liquid" }
      ]
    },
    tag_paginate: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(paginate)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.paginate.liquid" }
      },
      end: /(?=%\})/dgv,
      name: "meta.entity.tag.paginate.liquid",
      patterns: [
        { include: "#tag_paginate_body" }
      ]
    },
    tag_paginate_body: {
      patterns: [
        {
          match: /\b(by)\b/dgv,
          name: "keyword.control.liquid"
        },
        { include: "#value_expression" }
      ]
    },
    tag_paginate_liquid: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(paginate)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.paginate.liquid" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.entity.tag.paginate.liquid",
      patterns: [
        { include: "#tag_paginate_body" }
      ]
    },
    tag_render: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(render)\b/dgv,
      beginCaptures: {
        "1": { name: "entity.name.tag.render.liquid" }
      },
      end: /(?=%\})/dgv,
      name: "meta.entity.tag.render.liquid",
      patterns: [
        { include: "#tag_render_special_keywords" },
        { include: "#attribute" },
        { include: "#value_expression" }
      ]
    },
    tag_render_liquid: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(render)\b/dgv,
      beginCaptures: {
        "1": { name: "entity.name.tag.render.liquid" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.entity.tag.render.liquid",
      patterns: [
        { include: "#tag_render_special_keywords" },
        { include: "#attribute_liquid" },
        { include: "#value_expression" }
      ]
    },
    tag_render_special_keywords: {
      match: /\b(with|as|for)\b/dgv,
      name: "keyword.control.other.liquid"
    },
    tag_tablerow: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(tablerow)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.tablerow.liquid" }
      },
      end: /(?=%\})/dgv,
      name: "meta.entity.tag.tablerow.liquid",
      patterns: [
        { include: "#tag_tablerow_body" }
      ]
    },
    tag_tablerow_body: {
      patterns: [
        {
          match: /\b(in)\b/dgv,
          name: "keyword.control.liquid"
        },
        {
          match: /\b(cols|offset|limit):/dgv,
          name: "keyword.control.liquid"
        },
        { include: "#value_expression" }
      ]
    },
    tag_tablerow_liquid: {
      begin: /(?:(?<=\{%)|(?<=\{%-)|^)\p{space}*(tablerow)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.tablerow.liquid" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.entity.tag.tablerow.liquid",
      patterns: [
        { include: "#tag_tablerow_body" }
      ]
    },
    value_expression: {
      patterns: [
        {
          captures: {
            "2": { name: "invalid.illegal.filter.liquid" },
            "3": { name: "invalid.illegal.filter.liquid" }
          },
          match: /(\[)(\|)(?=[^\]]*)(?=\])/dgv
        },
        {
          match: /(?<=\p{space})([\-\*\+\/])(?=\p{space})/dgv,
          name: "invalid.illegal.filter.liquid"
        },
        { include: "#language_constant" },
        { include: "#operator" },
        { include: "#invalid_range" },
        { include: "#range" },
        { include: "#number" },
        { include: "#string" },
        { include: "#variable_lookup" }
      ]
    },
    variable_lookup: {
      patterns: [
        {
          match: /\b(additional_checkout_buttons|address|all_country_option_tags|all_products|articles??|block|blogs??|canonical_url|cart|checkout|collections??|comment|content_for_additional_checkout_buttons|content_for_header|content_for_index|content_for_layout|country_option_tags|currency|current_page|current_tags|customer|customer_address|discount_allocation|discount_application|external_video|font|forloop|form|fulfillment|gift_card|handle|images??|line_item|link|linklists??|location|localization|metafield|model|model_source|order|page|page_description|page_image|page_title|pages|paginate|part|policy|powered_by_link|predictive_search|product|product_option|product_variant|recommendations|request|routes|scripts??|search|section|selling_plan|selling_plan_allocation|selling_plan_group|settings|shipping_method|shop|shop_locale|store_availability|tablerow|tax_line|template|theme|transaction|unit_price_measurement|variant|video|video_source)\b/dgv,
          name: "variable.language.liquid"
        },
        {
          match: /((?<=[\p{L}\p{M}\p{N}\p{Pc}]:\p{space})[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          name: "variable.parameter.liquid"
        },
        {
          begin: /(?<=[\p{L}\p{M}\p{N}\p{Pc}])\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.brackets.begin.liquid" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.brackets.end.liquid" }
          },
          name: "meta.brackets.liquid",
          patterns: [
            { include: "#string" }
          ]
        },
        {
          match: /(?<=([\]\p{L}\p{M}\p{N}\p{Pc}])\.)([\-\p{L}\p{M}\p{N}\p{Pc}]+\??)/dgv,
          name: "variable.other.member.liquid"
        },
        {
          match: /(?<=[\p{L}\p{M}\p{N}\p{Pc}])\.(?=[\p{L}\p{M}\p{N}\p{Pc}])/dgv,
          name: "punctuation.accessor.liquid"
        },
        {
          match: /[_a-z]([\p{L}\p{M}\p{N}\p{Pc}]|-(?!\}\}))*/dgiv,
          name: "variable.other.liquid"
        }
      ]
    }
  },
  injections: {
    "L:meta.embedded.block.js, L:meta.embedded.block.css, L:meta.embedded.block.html, L:string.quoted": {
      patterns: [
        { include: "#injection" }
      ]
    }
  },
  dependencies: [
    "html",
    "css",
    "json",
    "javascript"
  ]
};
