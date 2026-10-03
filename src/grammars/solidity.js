export default {
  name: "solidity",
  displayName: "Solidity",
  scopeName: "source.solidity",
  patterns: [
    { include: "#natspec" },
    { include: "#declaration-userType" },
    { include: "#comment" },
    { include: "#operator" },
    { include: "#global" },
    { include: "#control" },
    { include: "#constant" },
    { include: "#primitive" },
    { include: "#type-primitive" },
    { include: "#type-modifier-extended-scope" },
    { include: "#declaration" },
    { include: "#function-call" },
    { include: "#assembly" },
    { include: "#punctuation" }
  ],
  repository: {
    assembly: {
      patterns: [
        {
          match: /\b(assembly)\b/dgv,
          name: "keyword.control.assembly"
        },
        {
          match: /\b(let)\b/dgv,
          name: "storage.type.assembly"
        }
      ]
    },
    comment: {
      patterns: [
        { include: "#comment-line" },
        { include: "#comment-block" }
      ]
    },
    "comment-block": {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block",
      patterns: [
        { include: "#comment-todo" }
      ]
    },
    "comment-line": {
      begin: /(?<!tp:)\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line",
      patterns: [
        { include: "#comment-todo" }
      ]
    },
    "comment-todo": {
      match: /\b(FIXME|TODO|CHANGED|XXX|IDEA|HACK|NOTE|REVIEW|NB|BUG|QUESTION|COMBAK|TEMP|SUPPRESS|LINT|[\p{L}\p{M}\p{N}\p{Pc}]+-disable|[\p{L}\p{M}\p{N}\p{Pc}]+-suppress)\b/dgiv,
      name: "keyword.comment.todo"
    },
    constant: {
      patterns: [
        { include: "#constant-boolean" },
        { include: "#constant-time" },
        { include: "#constant-currency" }
      ]
    },
    "constant-boolean": {
      match: /\b(true|false)\b/dgv,
      name: "constant.language.boolean"
    },
    "constant-currency": {
      match: /\b(ether|wei|gwei|finney|szabo)\b/dgv,
      name: "constant.language.currency"
    },
    "constant-time": {
      match: /\b((?:second|minute|hour|day|week|year)s)\b/dgv,
      name: "constant.language.time"
    },
    control: {
      patterns: [
        { include: "#control-flow" },
        { include: "#control-using" },
        { include: "#control-import" },
        { include: "#control-pragma" },
        { include: "#control-underscore" },
        { include: "#control-unchecked" },
        { include: "#control-other" }
      ]
    },
    "control-flow": {
      patterns: [
        {
          match: /\b(if|else|for|while|do|break|continue|try|catch|finally|throw|return|global)\b/dgv,
          name: "keyword.control.flow"
        },
        {
          begin: /\b(returns)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.flow.return" }
          },
          end: /(?=\))/dgv,
          patterns: [
            { include: "#declaration-function-parameters" }
          ]
        }
      ]
    },
    "control-import": {
      patterns: [
        {
          begin: /\b(import)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.import" }
          },
          end: /(?=;)/dgv,
          patterns: [
            {
              begin: /((?=\{))/dgv,
              end: /((?=\}))/dgv,
              patterns: [
                {
                  match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
                  name: "entity.name.type.interface"
                }
              ]
            },
            {
              match: /\b(from)\b/dgv,
              name: "keyword.control.import.from"
            },
            { include: "#string" },
            { include: "#punctuation" }
          ]
        },
        {
          match: /\b(import)\b/dgv,
          name: "keyword.control.import"
        }
      ]
    },
    "control-other": {
      match: /\b(new|delete|emit)\b/dgv,
      name: "keyword.control"
    },
    "control-pragma": {
      captures: {
        "1": { name: "keyword.control.pragma" },
        "2": { name: "entity.name.tag.pragma" },
        "3": { name: "constant.other.pragma" }
      },
      match: /\b(pragma)(?:\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}+(\P{space}+))?\b/dgv
    },
    "control-unchecked": {
      match: /\b(unchecked)\b/dgv,
      name: "keyword.control.unchecked"
    },
    "control-underscore": {
      match: /\b(_)\b/dgv,
      name: "constant.other.underscore"
    },
    "control-using": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.using" },
            "2": { name: "entity.name.type.library" },
            "3": { name: "keyword.control.for" },
            "4": { name: "entity.name.type" }
          },
          match: /\b(using)\b\p{space}+\b([A-Z_a-z\p{Nd}]+)\b\p{space}+\b(for)\b\p{space}+\b([A-Z_a-z\p{Nd}]+)/dgv
        },
        {
          match: /\b(using)\b/dgv,
          name: "keyword.control.using"
        }
      ]
    },
    declaration: {
      patterns: [
        { include: "#declaration-contract" },
        { include: "#declaration-userType" },
        { include: "#declaration-interface" },
        { include: "#declaration-library" },
        { include: "#declaration-function" },
        { include: "#declaration-modifier" },
        { include: "#declaration-constructor" },
        { include: "#declaration-event" },
        { include: "#declaration-storage" },
        { include: "#declaration-error" }
      ]
    },
    "declaration-constructor": {
      patterns: [
        {
          begin: /\b(constructor)\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.constructor" }
          },
          end: /(?=\{)/dgv,
          patterns: [
            {
              begin: {
                G: [/￿\p{space}*(?=\()/dgv, /\p{space}*(?=\()/dgvy]
              },
              end: /(?=\))/dgv,
              patterns: [
                { include: "#declaration-function-parameters" }
              ]
            },
            {
              begin: /(?<=\))/dgv,
              end: /(?=\{)/dgv,
              patterns: [
                { include: "#type-modifier-access" },
                { include: "#function-call" }
              ]
            }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.constructor" }
          },
          match: /\b(constructor)\b/dgv
        }
      ]
    },
    "declaration-contract": {
      patterns: [
        {
          begin: /\b(contract)\b\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b\p{space}+\b(is)\b\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "storage.type.contract" },
            "2": { name: "entity.name.type.contract" },
            "3": { name: "storage.modifier.is" }
          },
          end: /(?=\{)/dgv,
          patterns: [
            {
              match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
              name: "entity.name.type.contract.extend"
            }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.contract" },
            "2": { name: "entity.name.type.contract" }
          },
          match: /\b(contract)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
        }
      ]
    },
    "declaration-enum": {
      patterns: [
        {
          begin: /\b(enum)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.enum" },
            "2": { name: "entity.name.type.enum" }
          },
          end: /(?=\})/dgv,
          patterns: [
            {
              match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
              name: "variable.other.enummember"
            },
            { include: "#punctuation" },
            { include: "#comment" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.enum" },
            "3": { name: "entity.name.type.enum" }
          },
          match: /\b(enum)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
        }
      ]
    },
    "declaration-error": {
      captures: {
        "1": { name: "storage.type.error" },
        "3": { name: "entity.name.type.error" }
      },
      match: /\b(error)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
    },
    "declaration-event": {
      patterns: [
        {
          begin: /\b(event)\b(?:\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b)?/dgv,
          beginCaptures: {
            "1": { name: "storage.type.event" },
            "2": { name: "entity.name.type.event" }
          },
          end: /(?=\))/dgv,
          patterns: [
            { include: "#type-primitive" },
            {
              captures: {
                "1": { name: "storage.type.modifier.indexed" },
                "2": { name: "variable.parameter.event" }
              },
              match: /\b(?:(indexed)\p{space})?([\p{L}\p{M}\p{N}\p{Pc}]+)(?:,\p{space}*|)/dgv
            },
            { include: "#punctuation" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.event" },
            "3": { name: "entity.name.type.event" }
          },
          match: /\b(event)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
        }
      ]
    },
    "declaration-function": {
      patterns: [
        {
          begin: /\b(function)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          beginCaptures: {
            "1": { name: "storage.type.function" },
            "2": { name: "entity.name.function" }
          },
          end: /(?=[\;\{])/dgv,
          patterns: [
            { include: "#natspec" },
            { include: "#global" },
            { include: "#declaration-function-parameters" },
            { include: "#type-modifier-access" },
            { include: "#type-modifier-payable" },
            { include: "#type-modifier-immutable" },
            { include: "#type-modifier-extended-scope" },
            { include: "#control-flow" },
            { include: "#function-call" },
            { include: "#modifier-call" },
            { include: "#punctuation" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.function" },
            "2": { name: "entity.name.function" }
          },
          match: /\b(function)\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv
        }
      ]
    },
    "declaration-function-parameters": {
      begin: {
        G: [/￿\p{space}*(?=\()/dgv, /\p{space}*(?=\()/dgvy]
      },
      end: /(?=\))/dgv,
      patterns: [
        { include: "#type-primitive" },
        { include: "#declaration-storage-mapping" },
        { include: "#type-function" },
        { include: "#type-modifier-access" },
        { include: "#type-modifier-extended-scope" },
        {
          captures: {
            "1": { name: "storage.type.struct" }
          },
          match: /\b([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv
        },
        { include: "#variable" },
        { include: "#punctuation" },
        { include: "#comment" }
      ]
    },
    "declaration-interface": {
      patterns: [
        {
          begin: /\b(interface)\b\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b\p{space}+\b(is)\b\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "storage.type.interface" },
            "2": { name: "entity.name.type.interface" },
            "3": { name: "storage.modifier.is" }
          },
          end: /(?=\{)/dgv,
          patterns: [
            {
              match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
              name: "entity.name.type.interface.extend"
            }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.interface" },
            "2": { name: "entity.name.type.interface" }
          },
          match: /\b(interface)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
        }
      ]
    },
    "declaration-library": {
      captures: {
        "1": { name: "storage.type.library" },
        "3": { name: "entity.name.type.library" }
      },
      match: /\b(library)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
    },
    "declaration-modifier": {
      patterns: [
        {
          begin: /\b(modifier)\b\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.function.modifier" },
            "2": { name: "entity.name.function.modifier" }
          },
          end: /(?=\{)/dgv,
          patterns: [
            { include: "#declaration-function-parameters" },
            {
              begin: /(?<=\))/dgv,
              end: /(?=\{)/dgv,
              patterns: [
                { include: "#declaration-function-parameters" },
                { include: "#type-modifier-access" },
                { include: "#type-modifier-payable" },
                { include: "#type-modifier-immutable" },
                { include: "#type-modifier-extended-scope" },
                { include: "#function-call" },
                { include: "#modifier-call" },
                { include: "#control-flow" }
              ]
            }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.modifier" },
            "3": { name: "entity.name.function" }
          },
          match: /\b(modifier)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
        }
      ]
    },
    "declaration-storage": {
      patterns: [
        { include: "#declaration-storage-mapping" },
        { include: "#declaration-struct" },
        { include: "#declaration-enum" },
        { include: "#declaration-storage-field" }
      ]
    },
    "declaration-storage-field": {
      patterns: [
        { include: "#comment" },
        { include: "#control" },
        { include: "#type-primitive" },
        { include: "#type-modifier-access" },
        { include: "#type-modifier-immutable" },
        { include: "#type-modifier-transient" },
        { include: "#type-modifier-payable" },
        { include: "#type-modifier-constant" },
        { include: "#primitive" },
        { include: "#constant" },
        { include: "#operator" },
        { include: "#punctuation" }
      ]
    },
    "declaration-storage-mapping": {
      patterns: [
        {
          begin: /\b(mapping)\p{space}*\(/dgv,
          beginCaptures: {
            "1": { name: "storage.type.mapping" }
          },
          end: /\)/dgv,
          patterns: [
            { include: "#declaration-storage-mapping" },
            { include: "#type-primitive" },
            { include: "#operator" },
            { include: "#punctuation" }
          ]
        },
        {
          match: /\b(mapping)\b/dgv,
          name: "storage.type.mapping"
        }
      ]
    },
    "declaration-struct": {
      patterns: [
        {
          captures: {
            "1": { name: "storage.type.struct" },
            "3": { name: "entity.name.type.struct" }
          },
          match: /\b(struct)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
        },
        {
          begin: /\b(struct)\b\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)?\b\p{space}*(?=\{)/dgv,
          beginCaptures: {
            "1": { name: "storage.type.struct" },
            "2": { name: "entity.name.type.struct" }
          },
          end: /(?=\})/dgv,
          patterns: [
            { include: "#type-primitive" },
            { include: "#variable" },
            { include: "#punctuation" },
            { include: "#comment" }
          ]
        }
      ]
    },
    "declaration-userType": {
      captures: {
        "1": { name: "storage.type.userType" },
        "2": { name: "entity.name.type.userType" },
        "3": { name: "storage.modifier.is" }
      },
      match: /\b(type)\b\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\b\p{space}+\b(is)\b/dgv
    },
    "function-call": {
      captures: {
        "1": { name: "entity.name.function" },
        "2": { name: "punctuation.parameters.begin" }
      },
      match: /\b([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\()/dgv
    },
    global: {
      patterns: [
        { include: "#global-variables" },
        { include: "#global-functions" }
      ]
    },
    "global-functions": {
      patterns: [
        {
          match: /\b(require|assert|revert)\b/dgv,
          name: "keyword.control.exceptions"
        },
        {
          match: /\b(s(?:elfdestruct|uicide))\b/dgv,
          name: "keyword.control.contract"
        },
        {
          match: /\b(addmod|mulmod|keccak256|sha256|sha3|ripemd160|ecrecover)\b/dgv,
          name: "support.function.math"
        },
        {
          match: /\b(unicode)\b/dgv,
          name: "support.function.string"
        },
        {
          match: /\b(blockhash|gasleft)\b/dgv,
          name: "variable.language.transaction"
        },
        {
          match: /\b(type)\b/dgv,
          name: "variable.language.type"
        }
      ]
    },
    "global-variables": {
      patterns: [
        {
          match: /\b(this)\b/dgv,
          name: "variable.language.this"
        },
        {
          match: /\b(super)\b/dgv,
          name: "variable.language.super"
        },
        {
          match: /\b(abi)\b/dgv,
          name: "variable.language.builtin.abi"
        },
        {
          match: /\b(msg\.sender|msg|block|tx|now)\b/dgv,
          name: "variable.language.transaction"
        },
        {
          match: /\b(tx\.origin|tx\.gasprice|msg\.data|msg\.sig|msg\.value)\b/dgv,
          name: "variable.language.transaction"
        }
      ]
    },
    "modifier-call": {
      patterns: [
        { include: "#function-call" },
        {
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv,
          name: "entity.name.function.modifier"
        }
      ]
    },
    natspec: {
      patterns: [
        {
          begin: /\/\*\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.documentation",
          patterns: [
            { include: "#natspec-tags" }
          ]
        },
        {
          begin: /\/\/\//dgv,
          end: /(?=\n?$)/dgv,
          name: "comment.block.documentation",
          patterns: [
            { include: "#natspec-tags" }
          ]
        }
      ]
    },
    "natspec-tag-author": {
      match: /(@author)\b/dgv,
      name: "storage.type.author.natspec"
    },
    "natspec-tag-custom": {
      match: /(@custom:[\p{L}\p{M}\p{N}\p{Pc}]*)\b/dgv,
      name: "storage.type.dev.natspec"
    },
    "natspec-tag-dev": {
      match: /(@dev)\b/dgv,
      name: "storage.type.dev.natspec"
    },
    "natspec-tag-inheritdoc": {
      match: /(@inheritdoc)\b/dgv,
      name: "storage.type.author.natspec"
    },
    "natspec-tag-notice": {
      match: /(@notice)\b/dgv,
      name: "storage.type.dev.natspec"
    },
    "natspec-tag-param": {
      captures: {
        "1": { name: "storage.type.param.natspec" },
        "3": { name: "variable.other.natspec" }
      },
      match: /(@param)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
    },
    "natspec-tag-return": {
      captures: {
        "1": { name: "storage.type.return.natspec" },
        "3": { name: "variable.other.natspec" }
      },
      match: /(@return)(\p{space}+([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*))?\b/dgv
    },
    "natspec-tag-title": {
      match: /(@title)\b/dgv,
      name: "storage.type.title.natspec"
    },
    "natspec-tags": {
      patterns: [
        { include: "#comment-todo" },
        { include: "#natspec-tag-title" },
        { include: "#natspec-tag-author" },
        { include: "#natspec-tag-notice" },
        { include: "#natspec-tag-dev" },
        { include: "#natspec-tag-param" },
        { include: "#natspec-tag-return" },
        { include: "#natspec-tag-custom" },
        { include: "#natspec-tag-inheritdoc" }
      ]
    },
    "number-decimal": {
      match: /\b([0-9_]+(\.[0-9_]+)?)\b/dgv,
      name: "constant.numeric.decimal"
    },
    "number-hex": {
      match: /\b(0[Xx]\p{AHex}+)\b/dgv,
      name: "constant.numeric.hexadecimal"
    },
    "number-scientific": {
      match: /\b(?:0\.(?:0[0-9]|[0-9][0-9_]?)|[0-9][0-9_]*(?:\.\p{Nd}{1,2})?)(?:e[\-\+]?[0-9_]+)?/dgv,
      name: "constant.numeric.scientific"
    },
    operator: {
      patterns: [
        { include: "#operator-logic" },
        { include: "#operator-mapping" },
        { include: "#operator-arithmetic" },
        { include: "#operator-binary" },
        { include: "#operator-assignment" }
      ]
    },
    "operator-arithmetic": {
      match: /([\-\*\+\/])/dgv,
      name: "keyword.operator.arithmetic"
    },
    "operator-assignment": {
      match: /(:?=)/dgv,
      name: "keyword.operator.assignment"
    },
    "operator-binary": {
      match: /([\&\^\|]|<<|>>)/dgv,
      name: "keyword.operator.binary"
    },
    "operator-logic": {
      match: /(==|!=|<(?!<)|<=|>(?!>)|>=|&&|\|\||:(?!=)|[\!\?])/dgv,
      name: "keyword.operator.logic"
    },
    "operator-mapping": {
      match: /(=>)/dgv,
      name: "keyword.operator.mapping"
    },
    primitive: {
      patterns: [
        { include: "#number-decimal" },
        { include: "#number-hex" },
        { include: "#number-scientific" },
        { include: "#string" }
      ]
    },
    punctuation: {
      patterns: [
        {
          match: /;/dgv,
          name: "punctuation.terminator.statement"
        },
        {
          match: /\./dgv,
          name: "punctuation.accessor"
        },
        {
          match: /,/dgv,
          name: "punctuation.separator"
        },
        {
          match: /\{/dgv,
          name: "punctuation.brace.curly.begin"
        },
        {
          match: /\}/dgv,
          name: "punctuation.brace.curly.end"
        },
        {
          match: /\[/dgv,
          name: "punctuation.brace.square.begin"
        },
        {
          match: /\]/dgv,
          name: "punctuation.brace.square.end"
        },
        {
          match: /\(/dgv,
          name: "punctuation.parameters.begin"
        },
        {
          match: /\)/dgv,
          name: "punctuation.parameters.end"
        }
      ]
    },
    string: {
      patterns: [
        {
          match: /"(?:\\"|[^"])*"/dgv,
          name: "string.quoted.double"
        },
        {
          match: /'(?:\\'|[^'])*'/dgv,
          name: "string.quoted.single"
        }
      ]
    },
    "type-function": {
      begin: /\b(function)\p{space}*\(/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#type-function" },
        { include: "#type-primitive" },
        { include: "#punctuation" }
      ]
    },
    "type-modifier-access": {
      match: /\b(internal|external|private|public)\b/dgv,
      name: "storage.type.modifier.access"
    },
    "type-modifier-constant": {
      match: /\b(constant)\b/dgv,
      name: "storage.type.modifier.readonly"
    },
    "type-modifier-extended-scope": {
      match: /\b(pure|view|inherited|indexed|storage|memory|virtual|calldata|override|abstract)\b/dgv,
      name: "storage.type.modifier.extendedscope"
    },
    "type-modifier-immutable": {
      match: /\b(immutable)\b/dgv,
      name: "storage.type.modifier.readonly"
    },
    "type-modifier-payable": {
      match: /\b((?:non|)payable)\b/dgv,
      name: "storage.type.modifier.payable"
    },
    "type-modifier-transient": {
      match: /\b(transient)\b/dgv,
      name: "storage.type.modifier.readonly"
    },
    "type-primitive": {
      patterns: [
        {
          begin: /\b(address|string\p{Nd}*|bytes\p{Nd}*|int\p{Nd}*|uint\p{Nd}*|bool\p{Nd}*)\b\[\](\()/dgv,
          beginCaptures: {
            "1": { name: "support.type.primitive" }
          },
          end: /(\))/dgv,
          patterns: [
            { include: "#primitive" },
            { include: "#punctuation" },
            { include: "#global" },
            { include: "#variable" }
          ]
        },
        {
          match: /\b(address|string\p{Nd}*|bytes\p{Nd}*|int\p{Nd}*|uint\p{Nd}*|bool\p{Nd}*)\b/dgv,
          name: "support.type.primitive"
        }
      ]
    },
    variable: {
      patterns: [
        {
          captures: {
            "1": { name: "variable.parameter.function" }
          },
          match: /\b(_[\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv
        },
        {
          captures: {
            "1": { name: "support.variable.property" }
          },
          match: /\.([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv
        },
        {
          captures: {
            "1": { name: "variable.parameter.other" }
          },
          match: /\b([\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgv
        }
      ]
    }
  },
  dependencies: []
};
