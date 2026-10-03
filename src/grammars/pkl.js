export default {
  name: "pkl",
  displayName: "Pkl",
  scopeName: "source.pkl",
  patterns: [
    {
      captures: {
        "1": { name: "variable.language.pkl" },
        "2": { name: "variable.other.module.pkl" }
      },
      match: /\b(module)\p{space}+([\$_\p{L}][\$0-9_\p{L}]*(?:\.[\$_\p{L}][\$0-9_\p{L}]*)*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.class.pkl" },
        "2": { name: "entity.name.type.pkl" },
        "3": { name: "punctuation.pkl" },
        "4": { name: "entity.name.type.pkl" }
      },
      match: /(typealias)\p{space}+([\$_\p{L}][\$0-9_\p{L}]*)\p{space}*(=)\p{space}*([\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??\p{space}*(\|\p{space}*[\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??)*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.class.pkl" }
      },
      match: /\b(class)\p{space}+[\$_\p{L}][\$0-9_\p{L}]*/dgv,
      name: "entity.name.type.pkl"
    },
    {
      captures: {
        "1": { name: "keyword.control.pkl" },
        "2": { name: "variable.other.property.pkl" },
        "3": { name: "variable.other.property.pkl" },
        "4": { name: "storage.modifier.pkl" }
      },
      match: /\b(for)\p{space}*\(([\$_\p{L}][\$0-9_\p{L}]*)(?:\p{space}*,\p{space}*([\$_\p{L}][\$0-9_\p{L}]*))*\p{space}+(in)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.control.pkl" },
        "2": { name: "entity.name.type.pkl" }
      },
      match: /\b(new)\p{space}+([\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??\p{space}*(\|\p{space}*[\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??)*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.pkl" },
        "2": { name: "variable.other.property.pkl" }
      },
      match: /\b(function)\p{space}+([\$_\p{L}][\$0-9_\p{L}]*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.pkl" },
        "2": { name: "entity.name.type.pkl" }
      },
      match: /\b(as)\p{space}+([\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??\p{space}*(\|\p{space}*[\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??)*)/dgv
    },
    {
      match: /\b(true|false|null)\b/dgv,
      name: "constant.character.language.pkl"
    },
    {
      match: /\/\/[^\n]*/dgv,
      name: "comment.line.pkl"
    },
    {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      name: "comment.block.pkl"
    },
    {
      begin: /((?:\b|\p{space}*)[\$_\p{L}][\$0-9_\p{L}]*|`[^\`]+`)\p{space}*(:)\p{space}*([\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??\p{space}*(\|\p{space}*[\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??)*)/dgv,
      captures: {
        "1": { name: "variable.other.property.pkl" },
        "2": { name: "punctuation.pkl" },
        "3": { name: "entity.name.type.pkl" }
      },
      end: /\p{space}*=|[\)\,]|^[\t ]*(?=\n?$)/dgv
    },
    {
      captures: {
        "1": { name: "variable.other.property.pkl" },
        "2": { name: "punctuation.pkl" }
      },
      match: /(\b[\$_\p{L}][\$0-9_\p{L}]*|`[^\`]+`)\p{space}*(=)(?!=)/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.pkl" },
        "2": { name: "entity.name.type.pkl" }
      },
      match: /(:)\p{space}*([\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??\p{space}*(\|\p{space}*[\$_\p{L}][\$0-9_\p{L}]*\p{space}*(?:<[^\>]*>)?\p{space}*(?:\([^\)]*\))?\p{space}*\??)*)/dgv
    },
    {
      captures: {
        "1": { name: "variable.other.property.pkl" }
      },
      match: /^\p{space}*([\$_\p{L}][\$0-9_\p{L}]*)\p{space}*\{/dgv
    },
    {
      match: /\b(hidden|local|abstract|external|open|in|out|amends|extends|fixed|const)\b/dgv,
      name: "storage.modifier.pkl"
    },
    {
      match: /\b(amends|as|extends|function|is|let|read\???|import|throw|trace)\b/dgv,
      name: "keyword.pkl"
    },
    {
      match: /\b(if|else|when|for|import|new)\b/dgv,
      name: "keyword.control.pkl"
    },
    {
      match: /\b0x(?:[A-Fa-f\p{Nd}][A-F_a-f\p{Nd}]*[A-Fa-f\p{Nd}]|[A-F_a-f\p{Nd}])\b/dgv,
      name: "constant.numeric.hex.pkl"
    },
    {
      match: /\b0b(?:[01][01_]*[01]|[01])\b/dgv,
      name: "constant.numeric.binary.pkl"
    },
    {
      match: /\b0o(?:[0-7][0-7_]*[0-7]|[0-7])\b/dgv,
      name: "constant.numeric.octal.pkl"
    },
    {
      match: /\b\p{Nd}(?:[0-9_]*\p{Nd}|)\b/dgv,
      name: "constant.numeric.decimal.pkl"
    },
    {
      match: /\b(?:(?:\p{Nd}(?:[0-9_]*\p{Nd}|))?\.\p{Nd}(?:[0-9_]*\p{Nd}|)(?:[Ee][\-\+]?\p{Nd}(?:[0-9_]*\p{Nd}|))?|\p{Nd}(?:[0-9_]*\p{Nd}|)[Ee][\-\+]?\p{Nd}(?:[0-9_]*\p{Nd}|))\b/dgv,
      name: "constant.numeric.pkl"
    },
    {
      match: /[\-\*\+\/]|~\/|%|\*\*|>=??|<=??|==|!=?|&&|\|\||\|>|\?\?|!!|=|->|\|/dgv,
      name: "keyword.operator.pkl"
    },
    {
      match: /\b(this|module|outer|super)\b/dgv,
      name: "variable.language.pkl"
    },
    {
      match: /\b(unknown|never)\b/dgv,
      name: "support.type.pkl"
    },
    {
      match: /[\]\(\)\[\{\}]/dgv,
      name: "meta.brace.pkl"
    },
    {
      match: /\b(class|typealias)\b/dgv,
      name: "keyword.class.pkl"
    },
    {
      match: /\.\?|[\.\:\;]/dgv,
      name: "punctuation.pkl"
    },
    {
      match: /@[\$_\p{L}][\$0-9_\p{L}]*/dgv,
      name: "entity.name.type.pkl"
    },
    {
      begin: /(""")/dgv,
      captures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /(""")/dgv,
      name: "string.quoted.triple.0.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\[^\n])/dgv,
          name: "constant.character.escape.0.pkl"
        }
      ]
    },
    {
      begin: /(")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /(")|([^\n]?)(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.delimimter.pkl" },
        "2": { name: "invalid.illegal.newline.pkl" }
      },
      name: "string.quoted.double.0.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\[^\n])/dgv,
          name: "constant.character.escape.0.pkl"
        }
      ]
    },
    {
      begin: /(#""")/dgv,
      captures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("""#)/dgv,
      name: "string.quoted.triple.1.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\#(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\#[^\n])/dgv,
          name: "constant.character.escape.1.pkl"
        }
      ]
    },
    {
      begin: /(#")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("#)|([^\n]?)(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.delimimter.pkl" },
        "2": { name: "invalid.illegal.newline.pkl" }
      },
      name: "string.quoted.double.1.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\#(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\#[^\n])/dgv,
          name: "constant.character.escape.1.pkl"
        }
      ]
    },
    {
      begin: /(##""")/dgv,
      captures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("""##)/dgv,
      name: "string.quoted.triple.2.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\##(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\##[^\n])/dgv,
          name: "constant.character.escape.2.pkl"
        }
      ]
    },
    {
      begin: /(##")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("##)|([^\n]?)(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.delimimter.pkl" },
        "2": { name: "invalid.illegal.newline.pkl" }
      },
      name: "string.quoted.double.2.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\##(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\##[^\n])/dgv,
          name: "constant.character.escape.2.pkl"
        }
      ]
    },
    {
      begin: /(###""")/dgv,
      captures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("""###)/dgv,
      name: "string.quoted.triple.3.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\###(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\###[^\n])/dgv,
          name: "constant.character.escape.3.pkl"
        }
      ]
    },
    {
      begin: /(###")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("###)|([^\n]?)(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.delimimter.pkl" },
        "2": { name: "invalid.illegal.newline.pkl" }
      },
      name: "string.quoted.double.3.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\###(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\###[^\n])/dgv,
          name: "constant.character.escape.3.pkl"
        }
      ]
    },
    {
      begin: /(####""")/dgv,
      captures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("""####)/dgv,
      name: "string.quoted.triple.4.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\####(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\####[^\n])/dgv,
          name: "constant.character.escape.4.pkl"
        }
      ]
    },
    {
      begin: /(####")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("####)|([^\n]?)(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.delimimter.pkl" },
        "2": { name: "invalid.illegal.newline.pkl" }
      },
      name: "string.quoted.double.4.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\####(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\####[^\n])/dgv,
          name: "constant.character.escape.4.pkl"
        }
      ]
    },
    {
      begin: /(#####""")/dgv,
      captures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("""#####)/dgv,
      name: "string.quoted.triple.5.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\#####(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\#####[^\n])/dgv,
          name: "constant.character.escape.5.pkl"
        }
      ]
    },
    {
      begin: /(#####")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("#####)|([^\n]?)(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.delimimter.pkl" },
        "2": { name: "invalid.illegal.newline.pkl" }
      },
      name: "string.quoted.double.5.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\#####(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\#####[^\n])/dgv,
          name: "constant.character.escape.5.pkl"
        }
      ]
    },
    {
      begin: /(######""")/dgv,
      captures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("""######)/dgv,
      name: "string.quoted.triple.6.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\######(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\######[^\n])/dgv,
          name: "constant.character.escape.6.pkl"
        }
      ]
    },
    {
      begin: /(######")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.delimiter.pkl" }
      },
      end: /("######)|([^\n]?)(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.delimimter.pkl" },
        "2": { name: "invalid.illegal.newline.pkl" }
      },
      name: "string.quoted.double.6.pkl",
      patterns: [
        {
          captures: {
            "1": { name: "invalid.illegal.unrecognized-string-escape.pkl" }
          },
          match: /\\######(?:["\\nrt]|u\{[A-Fa-f\p{Nd}]+\}|\([^\n]+?\))|(\\######[^\n])/dgv,
          name: "constant.character.escape.6.pkl"
        }
      ]
    }
  ],
  dependencies: []
};
