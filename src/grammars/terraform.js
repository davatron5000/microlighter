export default {
  name: "terraform",
  displayName: "Terraform",
  aliases: [
    "tf",
    "tfvars"
  ],
  scopeName: "source.hcl.terraform",
  patterns: [
    { include: "#comments" },
    { include: "#attribute_definition" },
    { include: "#block" },
    { include: "#expressions" }
  ],
  repository: {
    attribute_access: {
      begin: /\.(?!\*)/dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.accessor.hcl" }
      },
      end: /\p{Alpha}[\-\p{L}\p{M}\p{N}\p{Pc}]*|\p{Nd}*/dgv,
      endCaptures: {
        "0": {
          patterns: [
            {
              match: /(?!null|false|true)\p{Alpha}[\-\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
              name: "variable.other.member.hcl"
            },
            {
              match: /\p{Nd}+/dgv,
              name: "constant.numeric.integer.hcl"
            }
          ]
        }
      }
    },
    attribute_definition: {
      captures: {
        "1": { name: "punctuation.section.parens.begin.hcl" },
        "2": { name: "variable.other.readwrite.hcl" },
        "3": { name: "punctuation.section.parens.end.hcl" },
        "4": { name: "keyword.operator.assignment.hcl" }
      },
      match: /(\()?\b((?!(?:null|false|true)\b)\p{Alpha}[\-_\p{Alpha}\p{Nd}]*)(\))?\p{space}*(=(?![\=\>]))\p{space}*/dgv,
      name: "variable.declaration.hcl"
    },
    attribute_splat: {
      begin: /\./dgv,
      beginCaptures: {
        "0": { name: "keyword.operator.accessor.hcl" }
      },
      end: /\*/dgv,
      endCaptures: {
        "0": { name: "keyword.operator.splat.hcl" }
      }
    },
    block: {
      begin: /([\p{L}\p{M}\p{N}\p{Pc}][\-\p{L}\p{M}\p{N}\p{Pc}]*)([\-"\p{space}\p{L}\p{M}\p{N}\p{Pc}]*)(\{)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            {
              match: /\bdata|check|import|locals|module|output|provider|resource|terraform|variable\b/dgv,
              name: "entity.name.type.terraform"
            },
            {
              match: /\b(?!null|false|true)\p{Alpha}[\-_\p{Alpha}\p{Nd}]*\b/dgv,
              name: "entity.name.type.hcl"
            }
          ]
        },
        "2": {
          patterns: [
            {
              match: /[\-"\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
              name: "variable.other.enummember.hcl"
            }
          ]
        },
        "3": { name: "punctuation.section.block.begin.hcl" },
        "5": { name: "punctuation.section.block.begin.hcl" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.block.end.hcl" }
      },
      name: "meta.block.hcl",
      patterns: [
        { include: "#comments" },
        { include: "#attribute_definition" },
        { include: "#block" },
        { include: "#expressions" }
      ]
    },
    block_inline_comments: {
      begin: /\/\*/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.hcl" }
      },
      end: /\*\//dgv,
      name: "comment.block.hcl"
    },
    brackets: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.brackets.begin.hcl" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.brackets.end.hcl" }
      },
      patterns: [
        {
          match: /\*/dgv,
          name: "keyword.operator.splat.hcl"
        },
        { include: "#comma" },
        { include: "#comments" },
        { include: "#inline_for_expression" },
        { include: "#inline_if_expression" },
        { include: "#expressions" },
        { include: "#local_identifiers" }
      ]
    },
    char_escapes: {
      match: /\\(?:["\\nrt]|u(\p{AHex}{8}|\p{AHex}{4}))/dgv,
      name: "constant.character.escape.hcl"
    },
    comma: {
      match: /,/dgv,
      name: "punctuation.separator.hcl"
    },
    comments: {
      patterns: [
        { include: "#hash_line_comments" },
        { include: "#double_slash_line_comments" },
        { include: "#block_inline_comments" }
      ]
    },
    double_slash_line_comments: {
      begin: /\/\//dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.hcl" }
      },
      end: /(?=\n?$)\n?/dgv,
      name: "comment.line.double-slash.hcl"
    },
    expressions: {
      patterns: [
        { include: "#literal_values" },
        { include: "#operators" },
        { include: "#tuple_for_expression" },
        { include: "#object_for_expression" },
        { include: "#brackets" },
        { include: "#objects" },
        { include: "#attribute_access" },
        { include: "#attribute_splat" },
        { include: "#functions" },
        { include: "#parens" }
      ]
    },
    for_expression_body: {
      patterns: [
        {
          match: /\bin\b/dgv,
          name: "keyword.operator.word.hcl"
        },
        {
          match: /\bif\b/dgv,
          name: "keyword.control.conditional.hcl"
        },
        {
          match: /:/dgv,
          name: "keyword.operator.hcl"
        },
        { include: "#expressions" },
        { include: "#comments" },
        { include: "#comma" },
        { include: "#local_identifiers" }
      ]
    },
    functions: {
      begin: /([\-\:\p{L}\p{M}\p{N}\p{Pc}]+)(\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            {
              match: /\b(core::)?(abs|abspath|alltrue|anytrue|base64decode|base64encode|base64gzip|base64sha256|base64sha512|basename|bcrypt|can|ceil|chomp|chunklist|cidrhost|cidrnetmask|cidrsubnets??|coalesce|coalescelist|compact|concat|contains|csvdecode|dirname|distinct|element|endswith|file|filebase64|filebase64sha256|filebase64sha512|fileexists|filemd5|fileset|filesha1|filesha256|filesha512|flatten|floor|format|formatdate|formatlist|indent|index|join|jsondecode|jsonencode|keys|length|log|lookup|lower|matchkeys|max|md5|merge|min|nonsensitive|one|parseint|pathexpand|plantimestamp|pow|range|regex|regexall|replace|reverse|rsadecrypt|sensitive|setintersection|setproduct|setsubtract|setunion|sha1|sha256|sha512|signum|slice|sort|split|startswith|strcontains|strrev|substr|sum|templatefile|textdecodebase64|textencodebase64|timeadd|timecmp|timestamp|title|tobool|tolist|tomap|tonumber|toset|tostring|transpose|trim|trimprefix|trimspace|trimsuffix|try|upper|urlencode|uuid|uuidv5|values|yamldecode|yamlencode|zipmap)\b/dgv,
              name: "support.function.builtin.terraform"
            },
            {
              match: /\bprovider::\p{Alpha}[\-_\p{L}\p{M}\p{N}\p{Pc}]*::\p{Alpha}[\-_\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
              name: "support.function.provider.terraform"
            }
          ]
        },
        "2": { name: "punctuation.section.parens.begin.hcl" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.end.hcl" }
      },
      name: "meta.function-call.hcl",
      patterns: [
        { include: "#comments" },
        { include: "#expressions" },
        { include: "#comma" }
      ]
    },
    hash_line_comments: {
      begin: /#/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.hcl" }
      },
      end: /(?=\n?$)\n?/dgv,
      name: "comment.line.number-sign.hcl"
    },
    hcl_type_keywords: {
      match: /\b(any|string|number|bool|list|set|map|tuple|object)\b/dgv,
      name: "storage.type.hcl"
    },
    heredoc: {
      begin: /(<<-?)\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.heredoc.hcl" },
        "2": { name: "keyword.control.heredoc.hcl" }
      },
      end: /^\p{space}*2\p{space}*(?=\n?$)/dgv,
      endCaptures: {
        "0": { name: "keyword.control.heredoc.hcl" }
      },
      name: "string.unquoted.heredoc.hcl",
      patterns: [
        { include: "#string_interpolation" }
      ]
    },
    inline_for_expression: {
      captures: {
        "1": { name: "keyword.control.hcl" },
        "2": {
          patterns: [
            {
              match: /=>/dgv,
              name: "storage.type.function.hcl"
            },
            { include: "#for_expression_body" }
          ]
        }
      },
      match: /(for)\b([^\n]*)\n/dgv
    },
    inline_if_expression: {
      begin: /(if)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.conditional.hcl" }
      },
      end: /\n/dgv,
      patterns: [
        { include: "#expressions" },
        { include: "#comments" },
        { include: "#comma" },
        { include: "#local_identifiers" }
      ]
    },
    language_constants: {
      match: /\b(true|false|null)\b/dgv,
      name: "constant.language.hcl"
    },
    literal_values: {
      patterns: [
        { include: "#numeric_literals" },
        { include: "#language_constants" },
        { include: "#string_literals" },
        { include: "#heredoc" },
        { include: "#hcl_type_keywords" },
        { include: "#named_value_references" }
      ]
    },
    local_identifiers: {
      match: /\b(?!null|false|true)\p{Alpha}[\-_\p{Alpha}\p{Nd}]*\b/dgv,
      name: "variable.other.readwrite.hcl"
    },
    named_value_references: {
      match: /\b(var|local|module|data|path|terraform)\b/dgv,
      name: "variable.other.readwrite.terraform"
    },
    numeric_literals: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.exponent.hcl" }
          },
          match: /\b\p{Nd}+([Ee][\-\+]?)\p{Nd}+\b/dgv,
          name: "constant.numeric.float.hcl"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.decimal.hcl" },
            "2": { name: "punctuation.separator.exponent.hcl" }
          },
          match: /\b\p{Nd}+(\.)\p{Nd}+(?:([Ee][\-\+]?)\p{Nd}+)?\b/dgv,
          name: "constant.numeric.float.hcl"
        },
        {
          match: /\b\p{Nd}+\b/dgv,
          name: "constant.numeric.integer.hcl"
        }
      ]
    },
    object_for_expression: {
      begin: /(\{)\p{space}?(for)\b/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.braces.begin.hcl" },
        "2": { name: "keyword.control.hcl" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.braces.end.hcl" }
      },
      patterns: [
        {
          match: /=>/dgv,
          name: "storage.type.function.hcl"
        },
        { include: "#for_expression_body" }
      ]
    },
    object_key_values: {
      patterns: [
        { include: "#comments" },
        { include: "#literal_values" },
        { include: "#operators" },
        { include: "#tuple_for_expression" },
        { include: "#object_for_expression" },
        { include: "#heredoc" },
        { include: "#functions" }
      ]
    },
    objects: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.braces.begin.hcl" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.braces.end.hcl" }
      },
      name: "meta.braces.hcl",
      patterns: [
        { include: "#comments" },
        { include: "#objects" },
        { include: "#inline_for_expression" },
        { include: "#inline_if_expression" },
        {
          captures: {
            "1": { name: "meta.mapping.key.hcl variable.other.readwrite.hcl" },
            "2": {
              name: "keyword.operator.assignment.hcl",
              patterns: [
                {
                  match: /=>/dgv,
                  name: "storage.type.function.hcl"
                }
              ]
            }
          },
          match: /\b((?!null|false|true)\p{Alpha}[\-_\p{Alpha}\p{Nd}]*)\p{space}*(=>?)\p{space}*/dgv
        },
        {
          captures: {
            "0": {
              patterns: [
                { include: "#named_value_references" }
              ]
            },
            "1": { name: "meta.mapping.key.hcl string.quoted.double.hcl" },
            "2": { name: "punctuation.definition.string.begin.hcl" },
            "3": { name: "punctuation.definition.string.end.hcl" },
            "4": { name: "keyword.operator.hcl" }
          },
          match: /\b((")[^\n]*("))\p{space}*(=)\p{space}*/dgv
        },
        {
          begin: /^\p{space}*\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.parens.begin.hcl" }
          },
          end: /(\))\p{space}*([\:\=])\p{space}*/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.parens.end.hcl" },
            "2": { name: "keyword.operator.hcl" }
          },
          name: "meta.mapping.key.hcl",
          patterns: [
            { include: "#named_value_references" },
            { include: "#attribute_access" }
          ]
        },
        { include: "#object_key_values" }
      ]
    },
    operators: {
      patterns: [
        {
          match: />=/dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /<=/dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /==/dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /!=/dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /\+/dgv,
          name: "keyword.operator.arithmetic.hcl"
        },
        {
          match: /-/dgv,
          name: "keyword.operator.arithmetic.hcl"
        },
        {
          match: /\*/dgv,
          name: "keyword.operator.arithmetic.hcl"
        },
        {
          match: /\//dgv,
          name: "keyword.operator.arithmetic.hcl"
        },
        {
          match: /%/dgv,
          name: "keyword.operator.arithmetic.hcl"
        },
        {
          match: /&&/dgv,
          name: "keyword.operator.logical.hcl"
        },
        {
          match: /\|\|/dgv,
          name: "keyword.operator.logical.hcl"
        },
        {
          match: /!/dgv,
          name: "keyword.operator.logical.hcl"
        },
        {
          match: />/dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /</dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /\?/dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /:/dgv,
          name: "keyword.operator.hcl"
        },
        {
          match: /=>/dgv,
          name: "keyword.operator.hcl"
        }
      ]
    },
    parens: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.parens.begin.hcl" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.parens.end.hcl" }
      },
      patterns: [
        { include: "#comments" },
        { include: "#expressions" }
      ]
    },
    string_interpolation: {
      begin: /(?<![\$\%])([\$\%]\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.interpolation.begin.hcl" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "keyword.other.interpolation.end.hcl" }
      },
      name: "meta.interpolation.hcl",
      patterns: [
        {
          match: /~\p{space}/dgv,
          name: "keyword.operator.template.left.trim.hcl"
        },
        {
          match: /\p{space}~/dgv,
          name: "keyword.operator.template.right.trim.hcl"
        },
        {
          match: /\b(if|else|endif|for|in|endfor)\b/dgv,
          name: "keyword.control.hcl"
        },
        { include: "#expressions" },
        { include: "#local_identifiers" }
      ]
    },
    string_literals: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.hcl" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.hcl" }
      },
      name: "string.quoted.double.hcl",
      patterns: [
        { include: "#string_interpolation" },
        { include: "#char_escapes" }
      ]
    },
    tuple_for_expression: {
      begin: /(\[)\p{space}?(for)\b/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.brackets.begin.hcl" },
        "2": { name: "keyword.control.hcl" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.brackets.end.hcl" }
      },
      patterns: [
        { include: "#for_expression_body" }
      ]
    }
  },
  dependencies: []
};
