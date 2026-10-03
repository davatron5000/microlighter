export default {
  name: "cairo",
  displayName: "Cairo",
  scopeName: "source.cairo0",
  patterns: [
    {
      begin: /\b(if)[^\n]*\(/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.if" },
        "2": { name: "entity.name.condition" }
      },
      contentName: "source.cairo0",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "keyword.control.end" }
      },
      name: "meta.control.if",
      patterns: [
        { include: "source.cairo0" }
      ]
    },
    {
      begin: /\b(with)\p{space}+([^\n]+)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.with" },
        "2": { name: "entity.name.identifiers" }
      },
      contentName: "source.cairo0",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "keyword.control.end" }
      },
      name: "meta.control.with",
      patterns: [
        { include: "source.cairo0" }
      ]
    },
    {
      begin: /\b(with_attr)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*[\(\{]/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.with_attr" },
        "2": { name: "entity.name.function" }
      },
      contentName: "source.cairo0",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "keyword.control.end" }
      },
      name: "meta.control.with_attr",
      patterns: [
        { include: "source.cairo0" }
      ]
    },
    {
      match: /\belse\b/dgv,
      name: "keyword.control.else"
    },
    {
      match: /\b(call|jmp|ret|abs|rel|if)\b/dgv,
      name: "keyword.other.opcode"
    },
    {
      match: /\b([af]p)\b/dgv,
      name: "keyword.other.register"
    },
    {
      match: /\b(const|let|local|tempvar|felt|as|from|import|static_assert|return|assert|cast|alloc_locals|with|with_attr|nondet|dw|codeoffset|new|using|and)\b/dgv,
      name: "keyword.other.meta"
    },
    {
      match: /\b(SIZE(?:OF_LOCALS|))\b/dgv,
      name: "markup.italic"
    },
    {
      match: /\/\/[^\n]*\n/dgv,
      name: "comment.line.sharp"
    },
    {
      match: /\b[A-Z_a-z][0-9A-Z_a-z]*:\p{space}*(?=\n?$)/dgv,
      name: "entity.name.function"
    },
    {
      begin: /\b(func)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*[\(\{]/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.cairo" },
        "2": { name: "entity.name.function" }
      },
      contentName: "source.cairo0",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "storage.type.function.cairo" }
      },
      name: "meta.function.cairo",
      patterns: [
        { include: "source.cairo0" }
      ]
    },
    {
      begin: /\b(struct|namespace)\p{space}+([A-Z_a-z][0-9A-Z_a-z]*)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.cairo" },
        "2": { name: "entity.name.function" }
      },
      contentName: "source.cairo0",
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "storage.type.function.cairo" }
      },
      name: "meta.function.cairo",
      patterns: [
        { include: "source.cairo0" }
      ]
    },
    {
      match: /\b[\-\+]?[0-9]+\b/dgv,
      name: "constant.numeric.decimal"
    },
    {
      match: /\b[\-\+]?0x\p{AHex}+\b/dgv,
      name: "constant.numeric.hexadecimal"
    },
    {
      match: /'[^']*'/dgv,
      name: "string.quoted.single"
    },
    {
      match: /"[^"]*"/dgv,
      name: "string.quoted.double"
    },
    {
      begin: /%\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.embedded.begin.python" }
      },
      contentName: "source.python",
      end: /%\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.embedded.end.python" },
        "1": { name: "source.python" }
      },
      name: "meta.embedded.block.python",
      patterns: [
        { include: "source.python" }
      ]
    }
  ],
  dependencies: [
    "python"
  ]
};
