export default {
  name: "reg",
  displayName: "Windows Registry Script",
  scopeName: "source.reg",
  patterns: [
    {
      match: /Windows Registry Editor Version 5\.00|REGEDIT4/dgv,
      name: "keyword.control.import.reg"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.comment.reg" }
      },
      match: /(;)[^\n]*(?=\n?$)/dgv,
      name: "comment.line.semicolon.reg"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.section.reg" },
        "2": { name: "entity.section.reg" },
        "3": { name: "punctuation.definition.section.reg" }
      },
      match: /^\p{space}*(\[(?!-))([^\n]*?)(\])/dgv,
      name: "entity.name.function.section.add.reg"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.section.reg" },
        "2": { name: "entity.section.reg" },
        "3": { name: "punctuation.definition.section.reg" }
      },
      match: /^\p{space}*(\[-)([^\n]*?)(\])/dgv,
      name: "entity.name.function.section.delete.reg"
    },
    {
      captures: {
        "2": { name: "punctuation.definition.quote.reg" },
        "3": { name: "support.function.regname.ini" },
        "4": { name: "punctuation.definition.quote.reg" },
        "5": { name: "punctuation.definition.equals.reg" },
        "7": { name: "keyword.operator.arithmetic.minus.reg" },
        "9": { name: "punctuation.definition.quote.reg" },
        "10": { name: "string.name.regdata.reg" },
        "11": { name: "punctuation.definition.quote.reg" },
        "13": { name: "support.type.dword.reg" },
        "14": { name: "keyword.operator.arithmetic.colon.reg" },
        "15": { name: "constant.numeric.dword.reg" },
        "17": { name: "support.type.dword.reg" },
        "18": { name: "keyword.operator.arithmetic.parenthesis.reg" },
        "19": { name: "keyword.operator.arithmetic.parenthesis.reg" },
        "20": { name: "constant.numeric.hex.size.reg" },
        "21": { name: "keyword.operator.arithmetic.parenthesis.reg" },
        "22": { name: "keyword.operator.arithmetic.colon.reg" },
        "23": { name: "constant.numeric.hex.reg" },
        "24": { name: "keyword.operator.arithmetic.linecontinuation.reg" },
        "25": { name: "comment.declarationline.semicolon.reg" }
      },
      match: /^(\p{space}*(["']?)([^\n]+?)(["']?)\p{space}*(=))?\p{space}*((-)|((["'])([^\n]*?)(["']))|(([Dd][Ww][Oo][Rr][Dd])(:)\p{space}*([A-Fa-f\p{Nd}]{1,8}))|(([Hh][Ee][Xx])((\()(\p{Nd}*)(\)))?(:)([^\n]*?)(\\?)))\p{space}*(;[^\n]*)?(?=\n?$)/dgv,
      name: "meta.declaration.reg"
    },
    {
      match: /[0-9]+/dgv,
      name: "constant.numeric.reg"
    },
    {
      match: /[A-Fa-f]+/dgv,
      name: "constant.numeric.hex.reg"
    },
    {
      match: /,+/dgv,
      name: "constant.numeric.hex.comma.reg"
    },
    {
      match: /\\/dgv,
      name: "keyword.operator.arithmetic.linecontinuation.reg"
    }
  ],
  dependencies: []
};
