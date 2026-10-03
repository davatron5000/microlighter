export default {
  name: "kdl",
  displayName: "KDL",
  scopeName: "source.kdl",
  patterns: [
    { include: "#forbidden_ident" },
    { include: "#null" },
    { include: "#boolean" },
    { include: "#float_keyword" },
    { include: "#float_fraction" },
    { include: "#float_exp" },
    { include: "#decimal" },
    { include: "#hexadecimal" },
    { include: "#octal" },
    { include: "#binary" },
    { include: "#raw-string" },
    { include: "#string_multi_line" },
    { include: "#string_single_line" },
    { include: "#block_comment" },
    { include: "#block_doc_comment" },
    { include: "#slashdash_block_comment" },
    { include: "#slashdash_comment" },
    { include: "#slashdash_node_comment" },
    { include: "#slashdash_node_with_children_comment" },
    { include: "#line_comment" },
    { include: "#attribute" },
    { include: "#node_name" },
    { include: "#ident_string" }
  ],
  repository: {
    attribute: {
      captures: {
        "1": { name: "punctuation.separator.key-value.kdl" }
      },
      match: /(?![\]\#\/\;\=\[\\\{\}])[\!\$-\.\:\<\>\?\@\^_\`\|\~\p{L}\p{M}\p{N}\p{Pc}]+\p{Nd}*[\!\$-\.\:\<\>\?\@\^_\`\|\~\p{L}\p{M}\p{N}\p{Pc}]*(=)/dgv,
      name: "entity.other.attribute-name.kdl"
    },
    binary: {
      match: /\b0b[01][01_]*\b/dgv,
      name: "constant.numeric.integer.binary.rust"
    },
    block_comment: {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.kdl",
      patterns: [
        { include: "#block_doc_comment" },
        { include: "#block_comment" }
      ]
    },
    block_doc_comment: {
      begin: /\/\*[\!\*](?![\*\/])/dgv,
      end: /\*\//dgv,
      name: "comment.block.documentation.kdl",
      patterns: [
        { include: "#block_doc_comment" },
        { include: "#block_comment" }
      ]
    },
    boolean: {
      match: /#(?:true|false)/dgv,
      name: "constant.language.boolean.kdl"
    },
    decimal: {
      match: /\b[\-\+0-9][0-9_]*\b/dgv,
      name: "constant.numeric.integer.decimal.rust"
    },
    float_exp: {
      match: /\b[0-9][0-9_]*(\.[0-9][0-9_]*)?[Ee][\-\+]?[0-9_]+\b/dgv,
      name: "constant.numeric.float.rust"
    },
    float_fraction: {
      match: /\b([\-\+0-9])[0-9_]*\.[0-9][0-9_]*([Ee][\-\+]?[0-9_]+)?\b/dgv,
      name: "constant.numeric.float.rust"
    },
    float_keyword: {
      match: /#(?:nan|inf|-inf)/dgv,
      name: "constant.language.other.kdl"
    },
    forbidden_ident: {
      match: /(?<!#)(?:true|false|null|nan|-?inf)/dgv,
      name: "invalid.illegal.kdl.bad-ident"
    },
    hexadecimal: {
      match: /\b0x\p{AHex}[_\p{AHex}]*\b/dgv,
      name: "constant.numeric.integer.hexadecimal.rust"
    },
    ident_string: {
      match: /(?![\]\#\/\;\=\[\\\{\}])[\!\$-\.\:\<\>\?\@\^_\`\|\~\p{L}\p{M}\p{N}\p{Pc}]+\p{Nd}*[\!\$-\.\:\<\>\?\@\^_\`\|\~\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "string.unquoted"
    },
    line_comment: {
      begin: /\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.double-slash.kdl"
    },
    node_name: {
      match: /((?<=[\;\{])|^)\p{space}*(?![\]\#\/\;\=\[\\\{\}])[\!\$-\.\:\<\>\?\@\^_\`\|\~\p{L}\p{M}\p{N}\p{Pc}]+\p{Nd}*[\!\$-\.\:\<\>\?\@\^_\`\|\~\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "entity.name.tag"
    },
    null: {
      match: /#null/dgv,
      name: "constant.language.null.kdl"
    },
    octal: {
      match: /\b0o[0-7][0-7_]*\b/dgv,
      name: "constant.numeric.integer.octal.rust"
    },
    "raw-string": {
      begin: /(#+)("(?:""|))/dgv,
      end: /21/dgv,
      name: "string.quoted.other.raw.kdl"
    },
    slashdash_block_comment: {
      begin: /\/-\p{space}*\{/dgv,
      end: /\}/dgv,
      name: "comment.block.slashdash.kdl"
    },
    slashdash_comment: {
      begin: /(?<!^)\p{space}*\/-\p{space}*/dgv,
      end: /\p{space}/dgv,
      name: "comment.block.slashdash.kdl"
    },
    slashdash_node_comment: {
      begin: /(?<=^)\p{space}*\/-[^\{]+(?=\n?$)/dgv,
      end: /;|(?<!\\)(?=\n?$)/dgv,
      name: "comment.block.slashdash.kdl"
    },
    slashdash_node_with_children_comment: {
      begin: /(?<=^)\p{space}*\/-[^\{]+\{/dgv,
      end: /\}/dgv,
      name: "comment.block.slashdash.kdl"
    },
    string_multi_line: {
      begin: /"""/dgv,
      end: /"""/dgv,
      name: "string.quoted.triple.kdl",
      patterns: [
        {
          match: /\\(:?["\\bfnrst]|u\{\p{AHex}{1,6}\})/dgv,
          name: "constant.character.escape.kdl"
        }
      ]
    },
    string_single_line: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.kdl",
      patterns: [
        {
          match: /\\(:?["\\bfnrst]|u\{\p{AHex}{1,6}\})/dgv,
          name: "constant.character.escape.kdl"
        }
      ]
    }
  },
  dependencies: []
};
