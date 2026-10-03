export default {
  name: "soy",
  displayName: "Closure Templates",
  aliases: [
    "closure-templates"
  ],
  scopeName: "text.html.soy",
  patterns: [
    { include: "#alias" },
    { include: "#delpackage" },
    { include: "#namespace" },
    { include: "#template" },
    { include: "#comment" }
  ],
  repository: {
    alias: {
      captures: {
        "1": { name: "storage.type.soy" },
        "2": { name: "entity.name.type.soy" },
        "3": { name: "storage.type.soy" },
        "4": { name: "entity.name.type.soy" }
      },
      match: /\{(alias)\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+)(?:\p{space}+(as)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?\}/dgv
    },
    attribute: {
      captures: {
        "1": { name: "storage.other.attribute.soy" },
        "2": { name: "string.double.quoted.soy" }
      },
      match: /([\p{L}\p{M}\p{N}\p{Pc}]+)=("(?:\\?[^\n])*?")/dgv
    },
    body: {
      patterns: [
        { include: "#comment" },
        { include: "#let" },
        { include: "#call" },
        { include: "#css" },
        { include: "#xid" },
        { include: "#condition" },
        { include: "#condition-control" },
        { include: "#for" },
        { include: "#literal" },
        { include: "#msg" },
        { include: "#special-character" },
        { include: "#print" },
        { include: "text.html.basic" }
      ]
    },
    boolean: {
      match: /true|false/dgv,
      name: "language.constant.boolean.soy"
    },
    call: {
      patterns: [
        {
          begin: /\{((?:del)?call)\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+)(?=[^\/]*?\})/dgv,
          beginCaptures: {
            "1": { name: "storage.type.function.soy" },
            "2": { name: "entity.name.function.soy" }
          },
          end: /\{\/(1)\}/dgv,
          endCaptures: {
            "1": { name: "storage.type.function.soy" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#variant" },
            { include: "#attribute" },
            { include: "#param" }
          ]
        },
        {
          begin: /\{((?:del)?call)(\p{space}+[\.\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.function.soy" },
            "2": { name: "entity.name.function.soy" }
          },
          end: /\/\}/dgv,
          patterns: [
            { include: "#variant" },
            { include: "#attribute" }
          ]
        }
      ]
    },
    comment: {
      patterns: [
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.documentation.soy",
          patterns: [
            {
              captures: {
                "1": { name: "keyword.parameter.soy" },
                "2": { name: "variable.parameter.soy" }
              },
              match: /(@param\??)\p{space}+(\P{space}+)/dgv
            }
          ]
        },
        {
          match: /^\p{space}*(\/\/[^\n]*)(?=\n?$)/dgv,
          name: "comment.line.double-slash.soy"
        }
      ]
    },
    condition: {
      begin: /\{\/?(if|elseif|switch|case)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.soy" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#attribute" },
        { include: "#expression" }
      ]
    },
    "condition-control": {
      captures: {
        "1": { name: "keyword.control.soy" }
      },
      match: /\{(else|ifempty|default)\}/dgv
    },
    css: {
      begin: /\{(css)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.soy" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    delpackage: {
      captures: {
        "1": { name: "storage.type.soy" },
        "2": { name: "entity.name.type.soy" }
      },
      match: /\{(delpackage)\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+)\}/dgv
    },
    expression: {
      patterns: [
        { include: "#boolean" },
        { include: "#number" },
        { include: "#function" },
        { include: "#null" },
        { include: "#string" },
        { include: "#variable-ref" },
        { include: "#operator" }
      ]
    },
    for: {
      begin: /\{\/?(for(?:each|))(?=[\}\p{space}])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.soy" }
      },
      end: /\}/dgv,
      patterns: [
        {
          match: /in/dgv,
          name: "keyword.control.soy"
        },
        { include: "#expression" },
        { include: "#body" }
      ]
    },
    function: {
      begin: /([\p{L}\p{M}\p{N}\p{Pc}]+)\(/dgv,
      beginCaptures: {
        "1": { name: "support.function.soy" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#expression" }
      ]
    },
    let: {
      patterns: [
        {
          begin: /\{(let)\p{space}+(\$[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*:)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.soy" },
            "2": { name: "variable.soy" }
          },
          end: /\/\}/dgv,
          patterns: [
            { include: "#comment" },
            { include: "#expression" }
          ]
        },
        {
          begin: /\{(let)\p{space}+(\$[\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.soy" },
            "2": { name: "variable.soy" }
          },
          end: /\{\/(1)\}/dgv,
          endCaptures: {
            "1": { name: "storage.type.soy" }
          },
          patterns: [
            { include: "#attribute" },
            { include: "#body" }
          ]
        }
      ]
    },
    literal: {
      begin: /\{(literal)\}/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.soy" }
      },
      end: /\{\/(1)\}/dgv,
      endCaptures: {
        "1": { name: "keyword.other.soy" }
      },
      name: "meta.literal"
    },
    msg: {
      captures: {
        "1": { name: "keyword.other.soy" }
      },
      end: /\}/dgv,
      match: /\{\/?((?:|fallback)msg)/dgv,
      patterns: [
        { include: "#attribute" }
      ]
    },
    namespace: {
      captures: {
        "1": { name: "storage.type.soy" },
        "2": { name: "entity.name.type.soy" }
      },
      match: /\{(namespace)\p{space}+([\.\p{L}\p{M}\p{N}\p{Pc}]+)\}/dgv
    },
    null: {
      match: /null/dgv,
      name: "language.constant.null.soy"
    },
    number: {
      match: /-?\.?\p{Nd}+|\p{Nd}[\.\p{Nd}]*/dgv,
      name: "language.constant.numeric"
    },
    operator: {
      match: /-|not|[\%\*\+\/]|<=|>=|[\<\>]|==|!=|and|or|\?:|[\:\?]/dgv,
      name: "keyword.operator.soy"
    },
    param: {
      patterns: [
        {
          begin: /\{(param)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*:)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.soy" },
            "2": { name: "variable.parameter.soy" }
          },
          end: /\/\}/dgv,
          patterns: [
            { include: "#expression" }
          ]
        },
        {
          begin: /\{(param)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.soy" },
            "2": { name: "variable.parameter.soy" }
          },
          end: /\{\/(1)\}/dgv,
          endCaptures: {
            "1": { name: "storage.type.soy" }
          },
          patterns: [
            { include: "#attribute" },
            { include: "#body" }
          ]
        }
      ]
    },
    print: {
      begin: /\{(print)?\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.soy" }
      },
      end: /\}/dgv,
      patterns: [
        {
          captures: {
            "1": { name: "support.function.soy" }
          },
          match: /\|\p{space}*(changeNewlineToBr|truncate|bidiSpanWrap|bidiUnicodeWrap)/dgv
        },
        { include: "#expression" }
      ]
    },
    "special-character": {
      captures: {
        "1": { name: "language.support.constant" }
      },
      match: /\{(sp|nil|\\r|\\n|\\t|lb|rb)\}/dgv
    },
    string: {
      begin: /'/dgv,
      end: /'/dgv,
      name: "string.quoted.single.soy",
      patterns: [
        {
          match: /\\(?:["'\\bfnrt]|u\p{AHex}{4})/dgv,
          name: "constant.character.escape.soy"
        }
      ]
    },
    template: {
      begin: /\{((?:|del)template)\p{space}([\.\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.soy" },
        "2": { name: "entity.name.function.soy" }
      },
      end: /\{(\/1)\}/dgv,
      endCaptures: {
        "1": { name: "storage.type.soy" }
      },
      patterns: [
        {
          begin: /\{(@param)(\??)\p{space}+(\P{space}+\p{space}*:)/dgv,
          beginCaptures: {
            "1": { name: "keyword.parameter.soy" },
            "2": { name: "storage.modifier.keyword.operator.soy" },
            "3": { name: "variable.parameter.soy" }
          },
          end: /\}/dgv,
          name: "meta.parameter.soy",
          patterns: [
            { include: "#type" }
          ]
        },
        { include: "#variant" },
        { include: "#body" },
        { include: "#attribute" }
      ]
    },
    type: {
      patterns: [
        {
          match: /any|null|\?|string|bool|int|float|number|html|uri|js|css|attributes/dgv,
          name: "support.type.soy"
        },
        {
          begin: /(list|map)(<)/dgv,
          beginCaptures: {
            "1": { name: "support.type.soy" },
            "2": { name: "support.type.punctuation.soy" }
          },
          end: /(>)/dgv,
          endCaptures: {
            "1": { name: "support.type.modifier.soy" }
          },
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    "variable-ref": {
      match: /\$[\x07-z][\.\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.soy"
    },
    variant: {
      begin: /(variant)=(")/dgv,
      beginCaptures: {
        "1": { name: "storage.other.attribute.soy" },
        "2": { name: "string.double.quoted.soy" }
      },
      contentName: "string.double.quoted.soy",
      end: /(")/dgv,
      endCaptures: {
        "1": { name: "string.double.quoted.soy" }
      },
      patterns: [
        { include: "#expression" }
      ]
    },
    xid: {
      begin: /\{(xid)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.soy" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "#expression" }
      ]
    }
  },
  injections: {
    "meta.tag": {
      patterns: [
        { include: "#body" }
      ]
    }
  },
  dependencies: [
    "html"
  ]
};
