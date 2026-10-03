export default {
  name: "fortran-fixed-form",
  displayName: "Fortran (Fixed Form)",
  aliases: [
    "f",
    "for",
    "f77"
  ],
  scopeName: "source.fortran.fixed",
  patterns: [
    { include: "#comments" },
    {
      begin: /^(?=[^\n]{5}|(?<!^)\t)\p{space}*(?:([0-9]{1,5})\p{space}+)?(format)\b/dgiv,
      beginCaptures: {
        "1": { name: "constant.numeric.fortran" },
        "2": { name: "keyword.control.format.fortran" }
      },
      end: /(?=^(?![^\n\!\#]{5}\P{space}))/dgv,
      name: "meta.statement.IO.fortran",
      patterns: [
        { include: "#comments" },
        { include: "#line-header" },
        {
          match: /![^\n]*(?=\n?$)/dgv,
          name: "comment.line.fortran"
        },
        { include: "source.fortran.free#string-constant" },
        { include: "source.fortran.free#numeric-constant" },
        { include: "source.fortran.free#operators" },
        { include: "source.fortran.free#format-parentheses" }
      ]
    },
    { include: "#line-header" },
    { include: "source.fortran.free" }
  ],
  repository: {
    comments: {
      patterns: [
        {
          begin: /^[\*Cc]/dgv,
          end: /\n/dgv,
          name: "comment.line.fortran"
        },
        {
          begin: /^ *!/dgv,
          end: /\n/dgv,
          name: "comment.line.fortran"
        }
      ]
    },
    "line-end-comment": {
      begin: /(?<=^[^\n]{72})(?!\n)/dgv,
      end: /(?=\n)/dgv,
      name: "comment.line-end.fortran"
    },
    "line-header": {
      captures: {
        "1": { name: "constant.numeric.fortran" },
        "2": { name: "keyword.line-continuation-operator.fortran" },
        "3": { name: "source.fortran.free" },
        "4": { name: "invalid.error.fortran" }
      },
      match: /^(?!\p{space}*[\!\#])(?:([ \p{Nd}]{5} )|( {5}[^\n])|(\t)|([^\n]{1,5}))/dgv
    }
  },
  injections: {
    "source.fortran.fixed - ( string | comment )": {
      patterns: [
        { include: "#line-header" },
        { include: "#line-end-comment" }
      ]
    }
  },
  dependencies: [
    "fortran-free-form"
  ]
};
