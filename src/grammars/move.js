export default {
  name: "move",
  displayName: "Move",
  scopeName: "source.move",
  patterns: [
    { include: "#address" },
    { include: "#comments" },
    { include: "#extend_module" },
    { include: "#module" },
    { include: "#script" },
    { include: "#annotation" },
    { include: "#entry" },
    { include: "#public-scope" },
    { include: "#public" },
    { include: "#native" },
    { include: "#import" },
    { include: "#friend" },
    { include: "#const" },
    { include: "#struct" },
    { include: "#has_ability" },
    { include: "#enum" },
    { include: "#macro" },
    { include: "#fun" },
    { include: "#spec" }
  ],
  repository: {
    "=== DEPRECATED_BELOW ===": {},
    abilities: {
      match: /\b(store|key|drop|copy)\b/dgv,
      name: "support.type.ability.move"
    },
    address: {
      begin: /\b(address)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.type.address.keyword.move" }
      },
      end: /(?<=\})/dgv,
      name: "meta.address_block.move",
      patterns: [
        { include: "#comments" },
        {
          begin: /(?<=address)/dgv,
          end: /(?=\{)/dgv,
          name: "meta.address.definition.move",
          patterns: [
            { include: "#comments" },
            { include: "#address_literal" },
            {
              match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
              name: "entity.name.type.move"
            }
          ]
        },
        { include: "#module" }
      ]
    },
    address_literal: {
      match: /\b0x\p{AHex}+\b/dgv,
      name: "support.constant.address.base16.move"
    },
    annotation: {
      begin: /#\[/dgv,
      end: /\]/dgv,
      name: "support.constant.annotation.move",
      patterns: [
        { include: "#comments" },
        {
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?==)/dgv,
          name: "meta.annotation.name.move"
        },
        {
          begin: /=/dgv,
          end: /(?=[\]\,])/dgv,
          name: "meta.annotation.value.move",
          patterns: [
            { include: "#literals" }
          ]
        }
      ]
    },
    as: {
      match: /\b(as)\b/dgv,
      name: "keyword.control.as.move"
    },
    "as-import": {
      match: /\b(as)\b/dgv,
      name: "meta.import.as.move"
    },
    block: {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "meta.block.move",
      patterns: [
        { include: "#expr" }
      ]
    },
    "block-comments": {
      patterns: [
        {
          begin: /\/\*[\!\*](?![\*\/])/dgv,
          end: /\*\//dgv,
          name: "comment.block.documentation.move"
        },
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.move"
        }
      ]
    },
    capitalized: {
      match: /\b([A-Z][0-9A-Z_a-z]*)\b/dgv,
      name: "entity.name.type.use.move"
    },
    comments: {
      name: "meta.comments.move",
      patterns: [
        { include: "#doc-comments" },
        { include: "#line-comments" },
        { include: "#block-comments" }
      ]
    },
    const: {
      begin: /\b(const)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.const.move" }
      },
      end: /;/dgv,
      name: "meta.const.move",
      patterns: [
        { include: "#comments" },
        { include: "#primitives" },
        { include: "#literals" },
        { include: "#types" },
        {
          match: /\b([A-Z][0-9A-Z_]+)\b/dgv,
          name: "constant.other.move"
        },
        { include: "#error_const" }
      ]
    },
    control: {
      match: /\b(return|while|loop|if|else|break|continue|abort)\b/dgv,
      name: "keyword.control.move"
    },
    "doc-comments": {
      begin: /\/\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.block.documentation.move",
      patterns: [
        {
          captures: {
            "1": { name: "markup.underline.link.move" }
          },
          match: /`([\p{L}\p{M}\p{N}\p{Pc}]+)`/dgv
        }
      ]
    },
    entry: {
      match: /\b(entry)\b/dgv,
      name: "storage.modifier.visibility.entry.move"
    },
    enum: {
      begin: /\b(enum)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.enum.move" }
      },
      end: /(?<=\})/dgv,
      name: "meta.enum.move",
      patterns: [
        { include: "#comments" },
        { include: "#escaped_identifier" },
        { include: "#type_param" },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
          name: "entity.name.type.enum.move"
        },
        { include: "#has" },
        { include: "#abilities" },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.enum.definition.move",
          patterns: [
            { include: "#comments" },
            {
              match: /\b([A-Z][0-9A-Z_a-z]*)\b(?=\p{space}*\()/dgv,
              name: "entity.name.function.enum.move"
            },
            {
              match: /\b([A-Z][0-9A-Z_a-z]*)\b/dgv,
              name: "entity.name.type.enum.move"
            },
            {
              begin: /\(/dgv,
              end: /\)/dgv,
              name: "meta.enum.tuple.move",
              patterns: [
                { include: "#comments" },
                { include: "#expr_generic" },
                { include: "#capitalized" },
                { include: "#types" }
              ]
            },
            {
              begin: /\{/dgv,
              end: /\}/dgv,
              name: "meta.enum.struct.move",
              patterns: [
                { include: "#comments" },
                { include: "#escaped_identifier" },
                { include: "#expr_generic" },
                { include: "#capitalized" },
                { include: "#types" }
              ]
            }
          ]
        }
      ]
    },
    error_const: {
      match: /\b(E[A-Z][0-9A-Z_a-z]*)\b/dgv,
      name: "variable.other.error.const.move"
    },
    escaped_identifier: {
      begin: /`/dgv,
      end: /`/dgv,
      name: "variable.language.escaped.move"
    },
    expr: {
      name: "meta.expression.move",
      patterns: [
        { include: "#comments" },
        { include: "#escaped_identifier" },
        { include: "#expr_generic" },
        { include: "#packed_field" },
        { include: "#import" },
        { include: "#as" },
        { include: "#mut" },
        { include: "#let" },
        { include: "#types" },
        { include: "#literals" },
        { include: "#control" },
        { include: "#move_copy" },
        { include: "#self_access" },
        { include: "#module_access" },
        { include: "#label" },
        { include: "#macro_call" },
        { include: "#local_call" },
        { include: "#method_call" },
        { include: "#path_access" },
        { include: "#match_expression" },
        {
          match: /\$(?=[a-z])/dgv,
          name: "keyword.operator.macro.dollar.move"
        },
        {
          match: /(?<=\$)[a-z][0-9A-Z_a-z]*/dgv,
          name: "variable.other.meta.move"
        },
        {
          match: /\b([A-Z][A-Z_]+)\b/dgv,
          name: "constant.other.move"
        },
        { include: "#error_const" },
        {
          match: /\b([A-Z][0-9A-Z_a-z]*)\b/dgv,
          name: "entity.name.type.move"
        },
        { include: "#paren" },
        { include: "#block" }
      ]
    },
    expr_generic: {
      begin: /<(?=([\,0-9\<\>A-Z_a-z\p{space}]+>))/dgv,
      end: />/dgv,
      name: "meta.expression.generic.type.move",
      patterns: [
        { include: "#comments" },
        { include: "#types" },
        { include: "#capitalized" },
        { include: "#expr_generic" }
      ]
    },
    extend_module: {
      begin: /\b(extend)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.type.extend.move" }
      },
      end: /(?<=[\;\}])/dgv,
      name: "meta.extend_module.move",
      patterns: [
        { include: "#comments" },
        { include: "#module" }
      ]
    },
    friend: {
      begin: /\b(friend)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.type.move" }
      },
      end: /;/dgv,
      name: "meta.friend.move",
      patterns: [
        { include: "#comments" },
        { include: "#address_literal" },
        {
          match: /\b([A-Za-z][0-9A-Z_a-z]*)\b/dgv,
          name: "entity.name.type.module.move"
        }
      ]
    },
    fun: {
      patterns: [
        { include: "#fun_signature" },
        { include: "#block" }
      ]
    },
    fun_body: {
      begin: /\{/dgv,
      end: /(?<=\})/dgv,
      name: "meta.fun_body.move",
      patterns: [
        { include: "#expr" }
      ]
    },
    fun_call: {
      begin: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(?:<[\,\p{L}\p{M}\p{N}\p{Pc}\p{space}]+>)?\p{space}*\(/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.call.move" }
      },
      end: /\)/dgv,
      name: "meta.fun_call.move",
      patterns: [
        { include: "#comments" },
        { include: "#self_access" },
        { include: "#module_access" },
        { include: "#move_copy" },
        { include: "#literals" },
        { include: "#fun_call" },
        { include: "#block" },
        { include: "#mut" },
        { include: "#as" }
      ]
    },
    fun_signature: {
      begin: /\b(fun)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.fun.move" }
      },
      end: /(?=[\;\{])/dgv,
      name: "meta.fun_signature.move",
      patterns: [
        { include: "#comments" },
        { include: "#module_access" },
        { include: "#capitalized" },
        { include: "#types" },
        { include: "#mut" },
        {
          begin: /(?<=\bfun)/dgv,
          end: /(?=[\(\<])/dgv,
          name: "meta.function_name.move",
          patterns: [
            { include: "#comments" },
            { include: "#escaped_identifier" },
            {
              match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
              name: "entity.name.function.move"
            }
          ]
        },
        { include: "#fun_type_param" },
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          name: "meta.parentheses.move",
          patterns: [
            { include: "#comments" },
            { include: "#self_access" },
            { include: "#expr_generic" },
            { include: "#escaped_identifier" },
            { include: "#module_access" },
            { include: "#capitalized" },
            { include: "#types" },
            { include: "#mut" }
          ]
        },
        {
          match: /\b(acquires)\b/dgv,
          name: "storage.modifier"
        }
      ]
    },
    fun_type_param: {
      begin: /</dgv,
      end: />/dgv,
      name: "meta.fun_generic_param.move",
      patterns: [
        { include: "#comments" },
        { include: "#types" },
        { include: "#phantom" },
        { include: "#capitalized" },
        { include: "#module_access" },
        { include: "#abilities" }
      ]
    },
    has: {
      match: /\b(has)\b/dgv,
      name: "keyword.control.ability.has.move"
    },
    has_ability: {
      begin: /(?<=[\)\}])\p{space}+(has)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.type.move" }
      },
      end: /;/dgv,
      name: "meta.has.ability.move",
      patterns: [
        { include: "#comments" },
        { include: "#abilities" }
      ]
    },
    ident: {
      match: /\b([A-Za-z][0-9A-Z_a-z]*)\b/dgv,
      name: "meta.identifier.move"
    },
    import: {
      begin: /\b(use)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.type.move" }
      },
      end: /;/dgv,
      name: "meta.import.move",
      patterns: [
        { include: "#comments" },
        { include: "#use_fun" },
        { include: "#address_literal" },
        { include: "#as-import" },
        {
          match: /\b([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
          name: "entity.name.type.move"
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          patterns: [
            { include: "#comments" },
            { include: "#as-import" },
            {
              match: /\b([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
              name: "entity.name.type.move"
            }
          ]
        },
        {
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          name: "meta.entity.name.type.module.move"
        }
      ]
    },
    label: {
      match: /'[a-z][0-9_a-z]*/dgv,
      name: "string.quoted.single.label.move"
    },
    let: {
      match: /\b(let)\b/dgv,
      name: "keyword.control.move"
    },
    "line-comments": {
      begin: /\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.double-slash.move"
    },
    literals: {
      name: "meta.literal.move",
      patterns: [
        {
          match: /@[0-9][0-9_]*/dgv,
          name: "support.constant.address.decimal.move"
        },
        {
          match: /@0x\p{AHex}+/dgv,
          name: "support.constant.address.base16.move"
        },
        {
          match: /@[A-Za-z][0-9A-Z_a-z]*/dgv,
          name: "support.constant.address.name.move"
        },
        {
          captures: {
            "1": { name: "constant.numeric.hex.move" },
            "2": { name: "entity.name.type.integer.move" }
          },
          match: /\b(0x[_\p{AHex}]+)([iu](8|16|32|64|128|256))?\b/dgv,
          name: "meta.constant.numeric.hex.move"
        },
        {
          captures: {
            "1": { name: "constant.numeric.decimal.move" },
            "2": { name: "entity.name.type.integer.move" }
          },
          match: /\b([0-9][0-9_]*)([iu](8|16|32|64|128|256))?\b/dgv,
          name: "meta.constant.numeric.move"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "meta.string.literal.move",
          patterns: [
            {
              match: /\\x\p{AHex}\p{AHex}/dgv,
              name: "constant.character.escape.hex.move"
            },
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.move"
            },
            {
              match: /[^\n]/dgv,
              name: "string.quoted.double.raw.move"
            }
          ]
        },
        {
          begin: /\bb"/dgv,
          end: /"/dgv,
          name: "meta.vector.literal.ascii.move",
          patterns: [
            {
              match: /\\x\p{AHex}\p{AHex}/dgv,
              name: "constant.character.escape.hex.move"
            },
            {
              match: /\\[^\n]/dgv,
              name: "constant.character.escape.move"
            },
            {
              match: /[^\n]/dgv,
              name: "string.quoted.double.raw.move"
            }
          ]
        },
        {
          begin: /x"/dgv,
          end: /"/dgv,
          name: "meta.vector.literal.hex.move",
          patterns: [
            {
              match: /\p{AHex}+/dgv,
              name: "constant.character.move"
            }
          ]
        },
        {
          match: /\b(?:true|false)\b/dgv,
          name: "constant.language.boolean.move"
        },
        {
          begin: /\b(vector)\b\[/dgv,
          captures: {
            "1": { name: "support.type.vector.move" }
          },
          end: /\]/dgv,
          name: "meta.vector.literal.move",
          patterns: [
            { include: "#expr" }
          ]
        }
      ]
    },
    local_call: {
      match: /\b([a-z][0-9_a-z]*)(?=[\(\<])/dgv,
      name: "entity.name.function.call.local.move"
    },
    macro: {
      begin: /\b(macro)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.macro.move" }
      },
      end: /(?<=\})/dgv,
      name: "meta.macro.move",
      patterns: [
        { include: "#comments" },
        { include: "#fun" }
      ]
    },
    macro_call: {
      captures: {
        "2": { name: "support.function.macro.move" },
        "3": { name: "support.function.operator.macro.move" }
      },
      match: /(\b|\.)([a-z][0-9A-Z_a-z]*)(!)/dgv,
      name: "meta.macro.call"
    },
    match_expression: {
      begin: /\b(match)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.match.move" }
      },
      end: /(?<=\})/dgv,
      name: "meta.match.move",
      patterns: [
        { include: "#comments" },
        { include: "#escaped_identifier" },
        { include: "#types" },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.match.block.move",
          patterns: [
            {
              match: /=>/dgv,
              name: "operator.match.move"
            },
            { include: "#expr" }
          ]
        },
        { include: "#expr" }
      ]
    },
    method_call: {
      captures: {
        "1": { name: "entity.name.function.call.path.move" }
      },
      match: /\.([a-z][0-9_a-z]*)(?=[\(\<])/dgv,
      name: "meta.path.call.move"
    },
    module: {
      begin: /\b(module)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.type.move" }
      },
      end: /(?<=[\;\}])/dgv,
      name: "meta.module.move",
      patterns: [
        { include: "#comments" },
        {
          begin: /(?<=\b(module)\b)/dgv,
          end: /(?=[\;\{])/dgv,
          patterns: [
            { include: "#comments" },
            { include: "#escaped_identifier" },
            {
              begin: /(?<=\b(module))/dgv,
              end: /(?=[\(\)\:\{])/dgv,
              name: "constant.other.move",
              patterns: [
                { include: "#comments" },
                { include: "#escaped_identifier" }
              ]
            },
            {
              begin: /(?<=::)/dgv,
              end: /(?=[\;\{\p{space}])/dgv,
              name: "entity.name.type.move",
              patterns: [
                { include: "#comments" },
                { include: "#escaped_identifier" }
              ]
            }
          ]
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.module_scope.move",
          patterns: [
            { include: "#comments" },
            { include: "#annotation" },
            { include: "#entry" },
            { include: "#public-scope" },
            { include: "#public" },
            { include: "#native" },
            { include: "#import" },
            { include: "#friend" },
            { include: "#const" },
            { include: "#struct" },
            { include: "#has_ability" },
            { include: "#enum" },
            { include: "#macro" },
            { include: "#fun" },
            { include: "#spec" }
          ]
        }
      ]
    },
    module_access: {
      captures: {
        "1": { name: "meta.entity.name.type.accessed.module.move" },
        "2": { name: "entity.name.function.call.move" }
      },
      match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)::([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
      name: "meta.module_access.move"
    },
    move_copy: {
      match: /\b(move|copy)\b/dgv,
      name: "variable.language.move"
    },
    mut: {
      match: /\b(mut)\b/dgv,
      name: "storage.modifier.mut.move"
    },
    native: {
      match: /\b(native)\b/dgv,
      name: "storage.modifier.visibility.native.move"
    },
    packed_field: {
      match: /[a-z][0-9_a-z]+\p{space}*:\p{space}*(?=\p{space})/dgv,
      name: "meta.struct.field.move"
    },
    paren: {
      begin: /\(/dgv,
      end: /\)/dgv,
      name: "meta.paren.move",
      patterns: [
        { include: "#expr" }
      ]
    },
    path_access: {
      match: /\.[a-z][0-9_a-z]*\b/dgv,
      name: "meta.path.access.move"
    },
    phantom: {
      match: /\b(phantom)\b/dgv,
      name: "keyword.control.phantom.move"
    },
    primitives: {
      match: /\b([iu](8|16|32|64|128|256)|address|bool|signer)\b/dgv,
      name: "support.type.primitives.move"
    },
    public: {
      match: /\b(public)\b/dgv,
      name: "storage.modifier.visibility.public.move"
    },
    "public-scope": {
      begin: /(?<=\b(public))\p{space}*\(/dgv,
      end: /\)/dgv,
      name: "meta.public.scoped.move",
      patterns: [
        { include: "#comments" },
        {
          match: /\b(friend|script|package)\b/dgv,
          name: "keyword.control.public.scope.move"
        }
      ]
    },
    resource_methods: {
      match: /\b(borrow_global|borrow_global_mut|exists|move_from|move_to_sender|move_to)\b/dgv,
      name: "support.function.typed.move"
    },
    script: {
      begin: /\b(script)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.script.move" }
      },
      end: /(?<=\})/dgv,
      name: "meta.script.move",
      patterns: [
        { include: "#comments" },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.script_scope.move",
          patterns: [
            { include: "#const" },
            { include: "#comments" },
            { include: "#import" },
            { include: "#fun" }
          ]
        }
      ]
    },
    self_access: {
      captures: {
        "1": { name: "variable.language.self.move" },
        "2": { name: "entity.name.function.call.move" }
      },
      match: /\b(Self)::([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
      name: "meta.self_access.move"
    },
    spec: {
      begin: /\b(spec)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.spec.move" }
      },
      end: /(?<=[\;\}])/dgv,
      name: "meta.spec.move",
      patterns: [
        {
          match: /\b(module|schema|struct|fun)/dgv,
          name: "storage.modifier.spec.target.move"
        },
        {
          match: /\b(define)/dgv,
          name: "storage.modifier.spec.define.move"
        },
        {
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          name: "entity.name.function.move"
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          patterns: [
            { include: "#comments" },
            { include: "#spec_block" },
            { include: "#spec_types" },
            { include: "#spec_define" },
            { include: "#spec_keywords" },
            { include: "#control" },
            { include: "#fun_call" },
            { include: "#literals" },
            { include: "#types" },
            { include: "#let" }
          ]
        }
      ]
    },
    spec_block: {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "meta.spec_block.move",
      patterns: [
        { include: "#comments" },
        { include: "#spec_block" },
        { include: "#spec_types" },
        { include: "#fun_call" },
        { include: "#literals" },
        { include: "#control" },
        { include: "#types" },
        { include: "#let" }
      ]
    },
    spec_define: {
      begin: /\b(define)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.move.spec" }
      },
      end: /(?=[\;\{])/dgv,
      name: "meta.spec_define.move",
      patterns: [
        { include: "#comments" },
        { include: "#spec_types" },
        { include: "#types" },
        {
          begin: /(?<=\bdefine)/dgv,
          end: /(?=\()/dgv,
          patterns: [
            { include: "#comments" },
            {
              match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
              name: "entity.name.function.move"
            }
          ]
        }
      ]
    },
    spec_keywords: {
      match: /\b(global|pack|unpack|pragma|native|include|ensures|requires|invariant|apply|aborts_if|modifies)\b/dgv,
      name: "keyword.control.move.spec"
    },
    spec_types: {
      match: /\b(range|num|vector|bool|u8|u16|u32|u64|u128|u256|address)\b/dgv,
      name: "support.type.vector.move"
    },
    struct: {
      begin: /\b(struct)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.type.move" }
      },
      end: /(?<=[\)\;\}])/dgv,
      name: "meta.struct.move",
      patterns: [
        { include: "#comments" },
        { include: "#escaped_identifier" },
        { include: "#has" },
        { include: "#abilities" },
        {
          match: /\b[A-Z][0-9A-Z_a-z]*\b/dgv,
          name: "entity.name.type.struct.move"
        },
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          name: "meta.struct.paren.move",
          patterns: [
            { include: "#comments" },
            { include: "#capitalized" },
            { include: "#types" }
          ]
        },
        { include: "#type_param" },
        {
          begin: /\(/dgv,
          end: /(?<=\))/dgv,
          name: "meta.struct.paren.move",
          patterns: [
            { include: "#comments" },
            { include: "#types" }
          ]
        },
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          name: "meta.struct.body.move",
          patterns: [
            { include: "#comments" },
            { include: "#self_access" },
            { include: "#escaped_identifier" },
            { include: "#module_access" },
            { include: "#expr_generic" },
            { include: "#capitalized" },
            { include: "#types" }
          ]
        },
        { include: "#has_ability" }
      ]
    },
    struct_pack: {
      begin: /(?<=[0-9\>A-Z_a-z])\p{space}*\{/dgv,
      end: /\}/dgv,
      name: "meta.struct.pack.move",
      patterns: [
        { include: "#comments" }
      ]
    },
    type_param: {
      begin: /</dgv,
      end: />/dgv,
      name: "meta.generic_param.move",
      patterns: [
        { include: "#comments" },
        { include: "#phantom" },
        { include: "#capitalized" },
        { include: "#module_access" },
        { include: "#abilities" }
      ]
    },
    types: {
      name: "meta.types.move",
      patterns: [
        { include: "#primitives" },
        { include: "#vector" }
      ]
    },
    use_fun: {
      begin: /\b(fun)\b/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.fun.move" }
      },
      end: /(?=;)/dgv,
      name: "meta.import.fun.move",
      patterns: [
        { include: "#comments" },
        {
          match: /\b(as)\b/dgv,
          name: "keyword.control.as.move"
        },
        {
          match: /\b(Self)\b/dgv,
          name: "variable.language.self.use.fun.move"
        },
        {
          match: /\b([a-z][0-9_a-z]*)\b/dgv,
          name: "meta.entity.name.function.use.move"
        },
        { include: "#types" },
        { include: "#escaped_identifier" },
        { include: "#capitalized" }
      ]
    },
    vector: {
      match: /\b(vector)\b/dgv,
      name: "support.type.vector.move"
    }
  },
  dependencies: []
};
