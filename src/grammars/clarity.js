export default {
  name: "clarity",
  displayName: "Clarity",
  scopeName: "source.clar",
  patterns: [
    { include: "#expression" },
    { include: "#define-constant" },
    { include: "#define-data-var" },
    { include: "#define-map" },
    { include: "#define-function" },
    { include: "#define-fungible-token" },
    { include: "#define-non-fungible-token" },
    { include: "#define-trait" },
    { include: "#use-trait" }
  ],
  repository: {
    "built-in-func": {
      begin: /(\()\p{space}*([\-\+]|<=|>=|[\*\/\<\>]|and|append|as-contract\???|as-max-len\?|asserts!|at-block|begin|bit-and|bit-not|bit-or|bit-shift-left|bit-shift-right|bit-xor|buff-to-int-be|buff-to-int-le|buff-to-uint-be|buff-to-uint-le|concat|contract-call\?|contract-of|default-to|element-at\???|filter|fold|from-consensus-buff\?|ft-burn\?|ft-get-balance|ft-get-supply|ft-mint\?|ft-transfer\?|get-block-info\?|get-burn-block-info\?|get-stacks-block-info\?|get-tenure-info\?|hash160|if|impl-trait|index-of\???|int-to-ascii|int-to-utf8|is-eq|is-err|is-none|is-ok|is-some|is-standard|keccak256|len|log2|map|match|merge|mod|nft-burn\?|nft-get-owner\?|nft-mint\?|nft-transfer\?|not|or|pow|principal-construct\?|principal-destruct\?|principal-of\?|print|replace-at\?|secp256k1-recover\?|secp256k1-verify|sha256|sha512|sha512\/256|slice\?|sqrti|string-to-int\?|string-to-uint\?|to-ascii\?|stx-account|stx-burn\?|stx-get-balance|stx-transfer-memo\?|stx-transfer\?|to-consensus-buff\?|to-int|to-uint|try!|unwrap!|unwrap-err!|unwrap-err-panic|unwrap-panic|xor|contract-hash\?|restrict-assets\?|with-stx|with-ft|with-nft|with-stacking|with-staking|with-pox|with-all-assets-unsafe|secp256r1-verify|verify-merkle-proof|get-bitcoin-tx-output\?|ed25519-verify|secp256k1-decompress\?)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "punctuation.built-in-function.start.clarity" },
        "2": { name: "keyword.declaration.built-in-function.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.built-in-function.end.clarity" }
      },
      name: "meta.built-in-function",
      patterns: [
        { include: "#expression" },
        { include: "#user-func" }
      ]
    },
    comment: {
      match: /(?<=^|[\]"'\(\)\,\;\[\`\{\}\p{space}])(;)[^\n]*(?=\n?$)/dgv,
      name: "comment.line.semicolon.clarity"
    },
    "data-type": {
      patterns: [
        { include: "#comment" },
        {
          match: /\b(u?int)\b/dgv,
          name: "entity.name.type.numeric.clarity"
        },
        {
          match: /\b(principal)\b/dgv,
          name: "entity.name.type.principal.clarity"
        },
        {
          match: /\b(bool)\b/dgv,
          name: "entity.name.type.bool.clarity"
        },
        {
          captures: {
            "1": { name: "punctuation.string_type-def.start.clarity" },
            "2": { name: "entity.name.type.string_type.clarity" },
            "3": { name: "constant.numeric.string_type-len.clarity" },
            "4": { name: "punctuation.string_type-def.end.clarity" }
          },
          match: /(\()\p{space}*(string-(?:ascii|utf8))\p{space}+(\p{Nd}+)\p{space}*(\))/dgv
        },
        {
          captures: {
            "1": { name: "punctuation.buff-def.start.clarity" },
            "2": { name: "entity.name.type.buff.clarity" },
            "3": { name: "constant.numeric.buf-len.clarity" },
            "4": { name: "punctuation.buff-def.end.clarity" }
          },
          match: /(\()\p{space}*(buff)\p{space}+(\p{Nd}+)\p{space}*(\))/dgv
        },
        {
          begin: /(\()\p{space}*(optional)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "punctuation.optional-def.start.clarity" },
            "2": { name: "storage.type.modifier" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.optional-def.end.clarity" }
          },
          name: "meta.optional-def",
          patterns: [
            { include: "#data-type" }
          ]
        },
        {
          begin: /(\()\p{space}*(response)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "punctuation.response-def.start.clarity" },
            "2": { name: "storage.type.modifier" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.response-def.end.clarity" }
          },
          name: "meta.response-def",
          patterns: [
            { include: "#data-type" }
          ]
        },
        {
          begin: /(\()\p{space}*(list)\p{space}+(\p{Nd}+)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "punctuation.list-def.start.clarity" },
            "2": { name: "entity.name.type.list.clarity" },
            "3": { name: "constant.numeric.list-len.clarity" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.list-def.end.clarity" }
          },
          name: "meta.list-def",
          patterns: [
            { include: "#data-type" }
          ]
        },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.tuple-def.start.clarity" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.tuple-def.end.clarity" }
          },
          name: "meta.tuple-def",
          patterns: [
            {
              match: /([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)(?=:)/dgv,
              name: "entity.name.tag.tuple-data-type-key.clarity"
            },
            { include: "#data-type" }
          ]
        }
      ]
    },
    "define-constant": {
      begin: /(\()\p{space}*(define-constant)\p{space}+([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "punctuation.define-constant.start.clarity" },
        "2": { name: "keyword.declaration.define-constant.clarity" },
        "3": { name: "entity.name.constant-name.clarity variable.other.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.define-constant.end.clarity" }
      },
      name: "meta.define-constant",
      patterns: [
        { include: "#expression" }
      ]
    },
    "define-data-var": {
      begin: /(\()\p{space}*(define-data-var)\p{space}+([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "punctuation.define-data-var.start.clarity" },
        "2": { name: "keyword.declaration.define-data-var.clarity" },
        "3": { name: "entity.name.data-var-name.clarity variable.other.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.define-data-var.end.clarity" }
      },
      name: "meta.define-data-var",
      patterns: [
        { include: "#data-type" },
        { include: "#expression" }
      ]
    },
    "define-function": {
      begin: /(\()\p{space}*(define-(?:public|private|read-only))\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "punctuation.define-function.start.clarity" },
        "2": { name: "keyword.declaration.define-function.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.define-function.end.clarity" }
      },
      name: "meta.define-function",
      patterns: [
        { include: "#expression" },
        {
          begin: /(\()\p{space}*([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.function-signature.start.clarity" },
            "2": { name: "entity.name.function.clarity" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.function-signature.end.clarity" }
          },
          name: "meta.define-function-signature",
          patterns: [
            {
              begin: /(\()\p{space}*([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
              beginCaptures: {
                "1": { name: "punctuation.function-argument.start.clarity" },
                "2": { name: "variable.parameter.clarity" }
              },
              end: /(\))/dgv,
              endCaptures: {
                "1": { name: "punctuation.function-argument.end.clarity" }
              },
              name: "meta.function-argument",
              patterns: [
                { include: "#data-type" }
              ]
            }
          ]
        },
        { include: "#user-func" }
      ]
    },
    "define-fungible-token": {
      captures: {
        "1": { name: "punctuation.define-fungible-token.start.clarity" },
        "2": { name: "keyword.declaration.define-fungible-token.clarity" },
        "3": { name: "entity.name.fungible-token-name.clarity variable.other.clarity" },
        "4": { name: "constant.numeric.fungible-token-total-supply.clarity" },
        "5": { name: "punctuation.define-fungible-token.end.clarity" }
      },
      match: /(\()\p{space}*(define-fungible-token)\p{space}+([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)(?:\p{space}+(u\p{Nd}+))?/dgv
    },
    "define-map": {
      begin: /(\()\p{space}*(define-map)\p{space}+([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "punctuation.define-map.start.clarity" },
        "2": { name: "keyword.declaration.define-map.clarity" },
        "3": { name: "entity.name.map-name.clarity variable.other.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.define-map.end.clarity" }
      },
      name: "meta.define-map",
      patterns: [
        { include: "#data-type" },
        { include: "#expression" }
      ]
    },
    "define-non-fungible-token": {
      begin: /(\()\p{space}*(define-non-fungible-token)\p{space}+([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "punctuation.define-non-fungible-token.start.clarity" },
        "2": { name: "keyword.declaration.define-non-fungible-token.clarity" },
        "3": { name: "entity.name.non-fungible-token-name.clarity variable.other.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.define-non-fungible-token.end.clarity" }
      },
      name: "meta.define-non-fungible-token",
      patterns: [
        { include: "#data-type" }
      ]
    },
    "define-trait": {
      begin: /(\()\p{space}*(define-trait)\p{space}+([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "punctuation.define-trait.start.clarity" },
        "2": { name: "keyword.declaration.define-trait.clarity" },
        "3": { name: "entity.name.trait-name.clarity variable.other.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.define-trait.end.clarity" }
      },
      name: "meta.define-trait",
      patterns: [
        {
          begin: /(\()\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.define-trait-body.start.clarity" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.define-trait-body.end.clarity" }
          },
          name: "meta.define-trait-body",
          patterns: [
            { include: "#expression" },
            {
              begin: /(\()\p{space}*([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
              beginCaptures: {
                "1": { name: "punctuation.trait-function.start.clarity" },
                "2": { name: "entity.name.function.clarity" }
              },
              end: /(\))/dgv,
              endCaptures: {
                "1": { name: "punctuation.trait-function.end.clarity" }
              },
              name: "meta.trait-function",
              patterns: [
                { include: "#data-type" },
                {
                  begin: /(\()\p{space}*/dgv,
                  beginCaptures: {
                    "1": { name: "punctuation.trait-function-args.start.clarity" }
                  },
                  end: /(\))/dgv,
                  endCaptures: {
                    "1": { name: "punctuation.trait-function-args.end.clarity" }
                  },
                  name: "meta.trait-function-args",
                  patterns: [
                    { include: "#data-type" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    expression: {
      patterns: [
        { include: "#comment" },
        { include: "#keyword" },
        { include: "#literal" },
        { include: "#let-func" },
        { include: "#built-in-func" },
        { include: "#get-set-func" }
      ]
    },
    "get-set-func": {
      begin: /(\()\p{space}*(var-get|var-set|map-get\?|map-set|map-insert|map-delete|get)\p{space}+([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "punctuation.get-set-func.start.clarity" },
        "2": { name: "keyword.control.clarity" },
        "3": { name: "variable.other.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.get-set-func.end.clarity" }
      },
      name: "meta.get-set-func",
      patterns: [
        { include: "#expression" }
      ]
    },
    keyword: {
      match: /(?<!\P{space})(?!-)\b(?:block-height|burn-block-height|chain-id|contract-caller|is-in-regtest|stacks-block-height|stx-liquid-supply|tenure-height|tx-sender|tx-sponsor?|current-contract|stacks-block-time)\b(?!\p{space}*-)/dgv,
      name: "constant.language.clarity"
    },
    "let-func": {
      begin: /(\()\p{space}*(let)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "punctuation.let-function.start.clarity" },
        "2": { name: "keyword.declaration.let-function.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.let-function.end.clarity" }
      },
      name: "meta.let-function",
      patterns: [
        { include: "#expression" },
        { include: "#user-func" },
        {
          begin: /(\()\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.let-var.start.clarity" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.let-var.end.clarity" }
          },
          name: "meta.let-var",
          patterns: [
            {
              begin: /(\()([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
              beginCaptures: {
                "1": { name: "punctuation.let-local-var.start.clarity" },
                "2": { name: "entity.name.let-local-var-name.clarity variable.parameter.clarity" }
              },
              end: /(\))/dgv,
              endCaptures: {
                "1": { name: "punctuation.let-local-var.end.clarity" }
              },
              name: "meta.let-local-var",
              patterns: [
                { include: "#expression" },
                { include: "#user-func" }
              ]
            },
            { include: "#expression" }
          ]
        }
      ]
    },
    literal: {
      patterns: [
        { include: "#number-literal" },
        { include: "#bool-literal" },
        { include: "#string-literal" },
        { include: "#tuple-literal" },
        { include: "#principal-literal" },
        { include: "#list-literal" },
        { include: "#optional-literal" },
        { include: "#response-literal" }
      ],
      repository: {
        "bool-literal": {
          match: /(?<!\P{space})(?!-)\b(true|false)\b(?!\p{space}*-)/dgv,
          name: "constant.language.bool.clarity"
        },
        "list-literal": {
          begin: /(\()\p{space}*(list)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "punctuation.list.start.clarity" },
            "2": { name: "entity.name.type.list.clarity" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { names: "punctuation.list.end.clarity" }
          },
          name: "meta.list",
          patterns: [
            { include: "#expression" },
            { include: "#user-func" }
          ]
        },
        "number-literal": {
          patterns: [
            {
              match: /(?<!\P{space})(?!-)\bu\p{Nd}+\b(?!\p{space}*-)/dgv,
              name: "constant.numeric.uint.clarity"
            },
            {
              match: /(?<!\P{space})(?!-)\b\p{Nd}+\b(?!\p{space}*-)/dgv,
              name: "constant.numeric.int.clarity"
            },
            {
              match: /(?<!\P{space})(?!-)\b0x[0-9a-f]*\b(?!\p{space}*-)/dgv,
              name: "constant.numeric.hex.clarity"
            }
          ]
        },
        "optional-literal": {
          patterns: [
            {
              match: /(?<!\P{space})(?!-)\b(none)\b(?!\p{space}*-)/dgv,
              name: "constant.language.none.clarity"
            },
            {
              begin: /(\()\p{space}*(some)\p{space}+/dgv,
              beginCaptures: {
                "1": { name: "punctuation.some.start.clarity" },
                "2": { name: "constant.language.some.clarity" }
              },
              end: /(\))/dgv,
              endCaptures: {
                "1": { name: "punctuation.some.end.clarity" }
              },
              name: "meta.some",
              patterns: [
                { include: "#expression" }
              ]
            }
          ]
        },
        "principal-literal": {
          match: /'[0-9A-Z]{28,41}(:?\.[A-Za-z][\-0-9A-Za-z]+){0,2}|(\.[A-Za-z][\-0-9A-Za-z]*){1,2}(?=[\(\)\,\{\}\p{space}]|(?=\n?$))/dgv,
          name: "constant.other.principal.clarity"
        },
        "response-literal": {
          begin: /(\()\p{space}*(ok|err)\p{space}+/dgv,
          beginCaptures: {
            "1": { name: "punctuation.response.start.clarity" },
            "2": { name: "constant.language.ok-err.clarity" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.response.end.clarity" }
          },
          name: "meta.response",
          patterns: [
            { include: "#expression" },
            { include: "#user-func" }
          ]
        },
        "string-literal": {
          patterns: [
            {
              begin: /(u?)(")/dgv,
              beginCaptures: {
                "1": { name: "string.quoted.utf8.clarity" },
                "2": { name: "punctuation.definition.string.begin.clarity" }
              },
              end: /"/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.string.end.clarity" }
              },
              name: "string.quoted.double.clarity",
              patterns: [
                {
                  match: /\\[^\n]/dgv,
                  name: "constant.character.escape.quote"
                }
              ]
            }
          ]
        },
        "tuple-literal": {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.tuple.start.clarity" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.tuple.end.clarity" }
          },
          name: "meta.tuple",
          patterns: [
            {
              match: /([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)(?=:)/dgv,
              name: "entity.name.tag.tuple-key.clarity"
            },
            { include: "#expression" },
            { include: "#user-func" }
          ]
        }
      }
    },
    "use-trait": {
      begin: /(\()\p{space}*(use-trait)\p{space}+([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "punctuation.use-trait.start.clarity" },
        "2": { name: "keyword.declaration.use-trait.clarity" },
        "3": { name: "entity.name.trait-alias.clarity variable.other.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.use-trait.end.clarity" }
      },
      name: "meta.use-trait",
      patterns: [
        { include: "#literal" }
      ]
    },
    "user-func": {
      begin: /(\()\p{space}*(([A-Za-z][\-\!\?\p{L}\p{M}\p{N}\p{Pc}]*))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "punctuation.user-function.start.clarity" },
        "2": { name: "entity.name.function.clarity" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.user-function.end.clarity" }
      },
      name: "meta.user-function",
      patterns: [
        { include: "#expression" },
        { include: "$self" }
      ]
    }
  },
  dependencies: []
};
