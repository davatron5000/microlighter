export default {
  name: "actionscript-3",
  displayName: "ActionScript",
  aliases: [
    "actionscript",
    "as3"
  ],
  scopeName: "source.actionscript.3",
  patterns: [
    { include: "#comments" },
    { include: "#package" },
    { include: "#class" },
    { include: "#interface" },
    { include: "#namespace_declaration" },
    { include: "#import" },
    { include: "#mxml" },
    { include: "#strings" },
    { include: "#regexp" },
    { include: "#variable_declaration" },
    { include: "#numbers" },
    { include: "#primitive_types" },
    { include: "#primitive_error_types" },
    { include: "#dynamic_type" },
    { include: "#language_constants" },
    { include: "#language_variables" },
    { include: "#guess_type" },
    { include: "#guess_constant" },
    { include: "#other_operators" },
    { include: "#arithmetic_operators" },
    { include: "#logical_operators" },
    { include: "#array_access_operators" },
    { include: "#vector_creation_operators" },
    { include: "#control_keywords" },
    { include: "#other_keywords" },
    { include: "#use_namespace" },
    { include: "#functions" },
    { include: "#primitive_functions" },
    { include: "#function_call" }
  ],
  repository: {
    arithmetic_operators: {
      match: /([\-\%\+\/]|(?<!:)\*)/dgv,
      name: "keyword.operator.actionscript.3"
    },
    array_access_operators: {
      match: /([\]\[])/dgv,
      name: "keyword.operator.actionscript.3"
    },
    class: {
      begin: /(^|\p{space}+|;)(\b(dynamic|final|abstract)\b\p{space}+)?(\b(internal|public)\b\p{space}+)?(\b(dynamic|final|abstract)\b\p{space}+)?(?=\bclass\b)/dgv,
      beginCaptures: {
        "3": { name: "storage.modifier.actionscript.3" },
        "5": { name: "storage.modifier.actionscript.3" },
        "7": { name: "storage.modifier.actionscript.3" }
      },
      end: /\}/dgv,
      name: "meta.class.actionscript.3",
      patterns: [
        { include: "#class_declaration" },
        { include: "#declaration_code_block" },
        { include: "#metadata" },
        { include: "#method" },
        { include: "#comments" },
        { include: "#strings" },
        { include: "#regexp" },
        { include: "#numbers" },
        { include: "#primitive_types" },
        { include: "#primitive_error_types" },
        { include: "#dynamic_type" },
        { include: "#language_constants" },
        { include: "#language_variables" },
        { include: "#other_operators" },
        { include: "#other_keywords" },
        { include: "#use_namespace" },
        { include: "#guess_type" },
        { include: "#guess_constant" },
        { include: "#arithmetic_operators" },
        { include: "#array_access_operators" },
        { include: "#vector_creation_operators" },
        { include: "#variable_declaration" },
        { include: "#object_literal" },
        { include: "#conditional_compilation" },
        { include: "#primitive_functions" },
        { include: "#function_call" }
      ]
    },
    class_declaration: {
      begin: /\b(class)\b\p{space}+([\$\.0-9A-Z_a-z]+|\*)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.class.actionscript.3" },
        "2": { name: "entity.name.class.actionscript.3" }
      },
      end: /\{/dgv,
      name: "meta.class_declaration.actionscript.3",
      patterns: [
        { include: "#extends" },
        { include: "#implements" },
        { include: "#comments" }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /\/\*\*(?!\/)/dgv,
          end: /\*\//dgv,
          name: "comment.block.documentation.actionscript.3",
          patterns: [
            {
              match: /@(copy|default|eventType|example|exampleText|includeExample|inheritDoc|internal|param|private|return|see|since|throws)\b/dgv,
              name: "keyword.other.documentation.actionscript.3.asdoc"
            }
          ]
        },
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.actionscript.3"
        },
        {
          match: /\/\/[^\n]*/dgv,
          name: "comment.line.actionscript.3"
        }
      ]
    },
    conditional_compilation: {
      captures: {
        "2": { name: "constant.other.actionscript.3" },
        "3": { name: "constant.other.actionscript.3" }
      },
      match: /(^|\p{space}+|;)\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b::\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
      name: "meta.conditional.actionscript.3"
    },
    control_keywords: {
      match: /\b(if|else|do|while|for|each|continue|return|switch|case|default|break|try|catch|finally|throw|with)\b/dgv,
      name: "keyword.control.actionscript.3"
    },
    declaration_code_block: {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "meta.code_block.actionscript.3",
      patterns: [
        { include: "#method" },
        { include: "#variable_declaration" },
        { include: "#comments" },
        { include: "#strings" },
        { include: "#regexp" },
        { include: "#numbers" },
        { include: "#primitive_types" },
        { include: "#primitive_error_types" },
        { include: "#dynamic_type" },
        { include: "#language_constants" },
        { include: "#language_variables" },
        { include: "#guess_type" },
        { include: "#guess_constant" },
        { include: "#other_operators" },
        { include: "#arithmetic_operators" },
        { include: "#logical_operators" },
        { include: "#array_access_operators" },
        { include: "#vector_creation_operators" },
        { include: "#control_keywords" },
        { include: "#other_keywords" },
        { include: "#use_namespace" },
        { include: "#functions" },
        { include: "#import" },
        { include: "#primitive_functions" },
        { include: "#function_call" }
      ]
    },
    dynamic_type: {
      captures: {
        "1": { name: "support.type.actionscript.3" }
      },
      match: /(?<=:)\p{space}*(\*)/dgv
    },
    escapes: {
      match: /\\(x\p{AHex}{2}|[012][0-7]{0,2}|3[0-6][0-7]|37[0-7]?|[4-7][0-7]?|[^\n])/dgv,
      name: "constant.character.escape.actionscript.3"
    },
    extends: {
      captures: {
        "1": { name: "keyword.other.actionscript.3" },
        "2": { name: "entity.other.inherited-class.actionscript.3" },
        "3": { name: "entity.other.inherited-class.actionscript.3" }
      },
      match: /\b(extends)\b\p{space}+([\$\.0-9A-Z_a-z]+)\p{space}*(?:,\p{space}*([\$\.0-9A-Z_a-z]+))*\p{space}*/dgv,
      name: "meta.extends.actionscript.3"
    },
    function_arguments: {
      begin: /\(/dgv,
      end: /\)/dgv,
      name: "meta.function_arguments.actionscript.3",
      patterns: [
        { include: "#parameters" },
        { include: "#comments" }
      ]
    },
    function_call: {
      captures: {
        "1": { name: "entity.name.function.actionscript.3" }
      },
      match: /\b([\$0-9A-Z_a-z]+)(?=\p{space}*\()/dgv
    },
    functions: {
      begin: /\b(function)\b(?:\p{space}+\b([gs]et)\b\p{space}+)?\p{space}*([\$0-9A-Z_a-z]+\b)?/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.actionscript.3" },
        "2": { name: "storage.modifier.actionscript.3" },
        "3": { name: "entity.name.function.actionscript.3" }
      },
      end: /((?=\n?$)|;|(?=\{))/dgv,
      name: "meta.function.actionscript.3",
      patterns: [
        { include: "#function_arguments" },
        { include: "#return_type" },
        { include: "#comments" }
      ]
    },
    guess_constant: {
      captures: {
        "1": { name: "constant.other.actionscript.3" }
      },
      match: /\b([\$A-Z][0-9A-Z_]+)\b/dgv
    },
    guess_type: {
      captures: {
        "1": { name: "support.type.actionscript.3" }
      },
      match: /\b((?:[\$0-9A-Z_a-z]+\.)*[A-Z][0-9A-Z]*[a-z]+[\$0-9A-Z_a-z]*)\b/dgv
    },
    implements: {
      captures: {
        "1": { name: "keyword.other.actionscript.3" },
        "2": { name: "entity.other.inherited-class.actionscript.3" },
        "3": { name: "entity.other.inherited-class.actionscript.3" }
      },
      match: /\b(implements)\b\p{space}+([\$\.0-9A-Z_a-z]+)\p{space}*(?:,\p{space}*([\$\.0-9A-Z_a-z]+))*\p{space}*/dgv,
      name: "meta.implements.actionscript.3"
    },
    import: {
      captures: {
        "2": { name: "keyword.control.import.actionscript.3" },
        "3": { name: "support.type.actionscript.3" }
      },
      match: /(^|\p{space}+|;)\b(import)\b\p{space}+([\$\.0-9A-Z_a-z]+(?:\.\*)?)\p{space}*(?=;|(?=\n?$))/dgv,
      name: "meta.import.actionscript.3"
    },
    interface: {
      begin: /(^|\p{space}+|;)(\b(internal|public)\b\p{space}+)?(?=\binterface\b)/dgv,
      beginCaptures: {
        "3": { name: "storage.modifier.actionscript.3" }
      },
      end: /\}/dgv,
      name: "meta.interface.actionscript.3",
      patterns: [
        { include: "#interface_declaration" },
        { include: "#metadata" },
        { include: "#functions" },
        { include: "#comments" }
      ]
    },
    interface_declaration: {
      begin: /\b(interface)\b\p{space}+([\$\.0-9A-Z_a-z]+)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.interface.actionscript.3" },
        "2": { name: "entity.name.class.actionscript.3" }
      },
      end: /\{/dgv,
      name: "meta.class_declaration.actionscript.3",
      patterns: [
        { include: "#extends" },
        { include: "#comments" }
      ]
    },
    language_constants: {
      match: /\b(true|false|null|Infinity|-Infinity|NaN|undefined)\b/dgv,
      name: "constant.language.actionscript.3"
    },
    language_variables: {
      match: /\b(super|this|arguments)\b/dgv,
      name: "variable.language.actionscript.3"
    },
    local_code_block: {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "meta.code_block.actionscript.3",
      patterns: [
        { include: "#local_code_block" },
        { include: "#comments" },
        { include: "#strings" },
        { include: "#regexp" },
        { include: "#variable_declaration" },
        { include: "#numbers" },
        { include: "#primitive_types" },
        { include: "#primitive_error_types" },
        { include: "#dynamic_type" },
        { include: "#language_constants" },
        { include: "#language_variables" },
        { include: "#guess_type" },
        { include: "#guess_constant" },
        { include: "#other_operators" },
        { include: "#arithmetic_operators" },
        { include: "#logical_operators" },
        { include: "#array_access_operators" },
        { include: "#vector_creation_operators" },
        { include: "#control_keywords" },
        { include: "#other_keywords" },
        { include: "#use_namespace" },
        { include: "#functions" },
        { include: "#import" },
        { include: "#primitive_functions" },
        { include: "#function_call" }
      ]
    },
    logical_operators: {
      match: /([\!\&\<\>\?\^\|\~])/dgv,
      name: "keyword.operator.actionscript.3"
    },
    metadata: {
      begin: /(?<=(?:^|[\;\{\}]|\*\/)\p{space}*)\[\p{space}*\b([\$A-Z_a-z][\$0-9A-Z_a-z]+)\b/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.actionscript.3" }
      },
      end: /\]/dgv,
      name: "meta.metadata_info.actionscript.3",
      patterns: [
        { include: "#metadata_info" }
      ]
    },
    metadata_info: {
      begin: /\(/dgv,
      end: /\)/dgv,
      patterns: [
        { include: "#strings" },
        {
          captures: {
            "1": { name: "variable.parameter.actionscript.3" },
            "2": { name: "keyword.operator.actionscript.3" }
          },
          match: /([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)/dgv
        }
      ]
    },
    method: {
      begin: /(^|\p{space}+)(([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+)?(([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+)?(([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+)?(([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+)?(?=\bfunction\b)/dgv,
      beginCaptures: {
        "3": { name: "storage.modifier.actionscript.3" },
        "5": { name: "storage.modifier.actionscript.3" },
        "7": { name: "storage.modifier.actionscript.3" },
        "8": { name: "storage.modifier.actionscript.3" }
      },
      end: /(?<=([\;\}]))/dgv,
      name: "meta.method.actionscript.3",
      patterns: [
        { include: "#functions" },
        { include: "#local_code_block" }
      ]
    },
    mxml: {
      begin: /<!\[CDATA\[/dgv,
      end: /\]\]>/dgv,
      name: "meta.cdata.actionscript.3",
      patterns: [
        { include: "#comments" },
        { include: "#import" },
        { include: "#metadata" },
        { include: "#class" },
        { include: "#namespace_declaration" },
        { include: "#use_namespace" },
        { include: "#class_declaration" },
        { include: "#method" },
        { include: "#comments" },
        { include: "#strings" },
        { include: "#regexp" },
        { include: "#numbers" },
        { include: "#primitive_types" },
        { include: "#primitive_error_types" },
        { include: "#dynamic_type" },
        { include: "#language_constants" },
        { include: "#language_variables" },
        { include: "#other_keywords" },
        { include: "#guess_type" },
        { include: "#guess_constant" },
        { include: "#other_operators" },
        { include: "#arithmetic_operators" },
        { include: "#array_access_operators" },
        { include: "#vector_creation_operators" },
        { include: "#variable_declaration" },
        { include: "#primitive_functions" },
        { include: "#function_call" }
      ]
    },
    namespace_declaration: {
      captures: {
        "2": { name: "storage.modifier.actionscript.3" },
        "3": { name: "storage.modifier.actionscript.3" }
      },
      match: /(([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+)?(namespace)\p{space}+[\$0-9A-Z_a-z]+/dgv,
      name: "meta.namespace_declaration.actionscript.3"
    },
    numbers: {
      match: /\b((0([Xx])\p{AHex}*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)([Ll]|UL|ul|[FUfu])?\b/dgv,
      name: "constant.numeric.actionscript.3"
    },
    object_literal: {
      begin: /\{/dgv,
      end: /\}/dgv,
      name: "meta.object_literal.actionscript.3",
      patterns: [
        { include: "#object_literal" },
        { include: "#comments" },
        { include: "#strings" },
        { include: "#regexp" },
        { include: "#numbers" },
        { include: "#primitive_types" },
        { include: "#primitive_error_types" },
        { include: "#dynamic_type" },
        { include: "#language_constants" },
        { include: "#language_variables" },
        { include: "#guess_type" },
        { include: "#guess_constant" },
        { include: "#array_access_operators" },
        { include: "#vector_creation_operators" },
        { include: "#functions" },
        { include: "#primitive_functions" },
        { include: "#function_call" }
      ]
    },
    other_keywords: {
      match: /\b(as|delete|in|instanceof|is|native|new|to|typeof)\b/dgv,
      name: "keyword.other.actionscript.3"
    },
    other_operators: {
      match: /([\.\=])/dgv,
      name: "keyword.operator.actionscript.3"
    },
    package: {
      begin: /(^|\p{space}+)(package)\b/dgv,
      beginCaptures: {
        "2": { name: "keyword.other.actionscript.3" }
      },
      end: /\}/dgv,
      name: "meta.package.actionscript.3",
      patterns: [
        { include: "#package_name" },
        { include: "#variable_declaration" },
        { include: "#method" },
        { include: "#comments" },
        { include: "#return_type" },
        { include: "#import" },
        { include: "#use_namespace" },
        { include: "#strings" },
        { include: "#numbers" },
        { include: "#language_constants" },
        { include: "#metadata" },
        { include: "#class" },
        { include: "#interface" },
        { include: "#namespace_declaration" }
      ]
    },
    package_name: {
      begin: /(?<=package)\p{space}+([\._\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
      end: /\{/dgv,
      name: "meta.package_name.actionscript.3"
    },
    parameters: {
      begin: /(\.\.\.)?\p{space}*([\$A-Z_a-z][\$0-9A-Z_a-z]*)(?:\p{space}*(:)\p{space}*(?:([\$A-Za-z][\$0-9A-Z_a-z]+(?:\.[\$A-Za-z][\$0-9A-Z_a-z]+)*)(?:\.<([\$A-Za-z][\$0-9A-Z_a-z]+(?:\.[\$A-Za-z][\$0-9A-Z_a-z]+)*)>)?|(\*)))?(?:\p{space}*(=))?/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.actionscript.3" },
        "2": { name: "variable.parameter.actionscript.3" },
        "3": { name: "keyword.operator.actionscript.3" },
        "4": { name: "support.type.actionscript.3" },
        "5": { name: "support.type.actionscript.3" },
        "6": { name: "support.type.actionscript.3" },
        "7": { name: "keyword.operator.actionscript.3" }
      },
      end: /,|(?=\))/dgv,
      patterns: [
        { include: "#strings" },
        { include: "#numbers" },
        { include: "#language_constants" },
        { include: "#comments" },
        { include: "#primitive_types" },
        { include: "#primitive_error_types" },
        { include: "#dynamic_type" },
        { include: "#guess_type" },
        { include: "#guess_constant" }
      ]
    },
    primitive_error_types: {
      captures: {
        "1": { name: "support.class.error.actionscript.3" }
      },
      match: /\b((Argument|Definition|Eval|Internal|Range|Reference|Security|Syntax|Type|URI|Verify)?Error)\b/dgv
    },
    primitive_functions: {
      captures: {
        "1": { name: "support.function.actionscript.3" }
      },
      match: /\b(decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|isFinite|isNaN|isXMLName|parseFloat|parseInt|trace|unescape)(?=\p{space}*\()/dgv
    },
    primitive_types: {
      captures: {
        "1": { name: "support.class.builtin.actionscript.3" }
      },
      match: /\b(Array|Boolean|Class|Date|Function|int|JSON|Math|Namespace|Number|Object|QName|RegExp|String|uint|Vector|XML|XMLList|\*(?<=a))\b/dgv
    },
    regexp: {
      begin: /(?<=[\(\,\:\=\[]|^|return|&&|\|\||!)\p{space}*(\/)(?![\*\+\/\?\{\}])/dgv,
      end: /(?=\n?$)|(\/)[gim]*/dgv,
      name: "string.regex.actionscript.3",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.actionscript.3"
        },
        {
          match: /\[(\\\]|[^\]])*\]/dgv,
          name: "constant.character.class.actionscript.3"
        }
      ]
    },
    return_type: {
      captures: {
        "1": { name: "keyword.operator.actionscript.3" },
        "2": { name: "support.type.actionscript.3" },
        "3": { name: "support.type.actionscript.3" },
        "4": { name: "support.type.actionscript.3" }
      },
      match: /(:)\p{space}*([\$A-Za-z][\$0-9A-Z_a-z]+(?:\.[\$A-Za-z][\$0-9A-Z_a-z]+)*)(?:\.<([\$A-Za-z][\$0-9A-Z_a-z]+(?:\.[\$A-Za-z][\$0-9A-Z_a-z]+)*)>)?|(\*)/dgv
    },
    strings: {
      patterns: [
        {
          begin: /@"/dgv,
          end: /"/dgv,
          name: "string.quoted.verbatim.actionscript.3"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.actionscript.3",
          patterns: [
            { include: "#escapes" }
          ]
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.actionscript.3",
          patterns: [
            { include: "#escapes" }
          ]
        }
      ]
    },
    use_namespace: {
      captures: {
        "2": { name: "keyword.other.actionscript.3" },
        "3": { name: "keyword.other.actionscript.3" },
        "4": { name: "storage.modifier.actionscript.3" }
      },
      match: /(^|\p{space}+|;)(use\p{space}+)?(namespace)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(;|(?=\n?$))/dgv
    },
    variable_declaration: {
      captures: {
        "2": { name: "storage.modifier.actionscript.3" },
        "4": { name: "storage.modifier.actionscript.3" },
        "6": { name: "storage.modifier.actionscript.3" },
        "7": { name: "storage.modifier.actionscript.3" },
        "8": { name: "keyword.operator.actionscript.3" }
      },
      match: /((static)\p{space}+)?(([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+)?((static)\p{space}+)?(const|var)\p{space}+[\$0-9A-Z_a-z]+(?:\p{space}*(:))?/dgv,
      name: "meta.variable_declaration.actionscript.3"
    },
    vector_creation_operators: {
      match: /([\<\>])/dgv,
      name: "keyword.operator.actionscript.3"
    }
  },
  dependencies: []
};
