export default {
  name: "diff",
  displayName: "Diff",
  scopeName: "source.diff",
  patterns: [
    {
      captures: {
        "1": { name: "punctuation.definition.separator.diff" }
      },
      match: /^((\*{15})|(={67})|(-{3}))(?=\n?$)\n?/dgv,
      name: "meta.separator.diff"
    },
    {
      match: /^\p{Nd}+(,\p{Nd}+)*([acd])\p{Nd}+(,\p{Nd}+)*(?=\n?$)\n?/dgv,
      name: "meta.diff.range.normal"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.range.diff" },
        "2": { name: "meta.toc-list.line-number.diff" },
        "3": { name: "punctuation.definition.range.diff" }
      },
      match: /^(@@)\p{space}*([^\n]+?)\p{space}*(@@)((?=\n?$)\n?)?/dgv,
      name: "meta.diff.range.unified"
    },
    {
      captures: {
        "3": { name: "punctuation.definition.range.diff" },
        "4": { name: "punctuation.definition.range.diff" },
        "6": { name: "punctuation.definition.range.diff" },
        "7": { name: "punctuation.definition.range.diff" }
      },
      match: /^(((-{3}) [^\n]+ (-{4}))|((\*{3}) [^\n]+ (\*{4})))(?=\n?$)\n?/dgv,
      name: "meta.diff.range.context"
    },
    {
      match: /^diff --git a\/[^\n]*(?=\n?$)\n?/dgv,
      name: "meta.diff.header.git"
    },
    {
      match: /^diff (-|\P{space}+\p{space}+\P{space}+)[^\n]*(?=\n?$)\n?/dgv,
      name: "meta.diff.header.command"
    },
    {
      captures: {
        "4": { name: "punctuation.definition.from-file.diff" },
        "6": { name: "punctuation.definition.from-file.diff" },
        "7": { name: "punctuation.definition.from-file.diff" }
      },
      match: /^((((-{3}) [^\n]+)|((\*{3}) [^\n]+))(?=\n?$)\n?|(={4}) [^\n]+(?= - ))/dgv,
      name: "meta.diff.header.from-file"
    },
    {
      captures: {
        "2": { name: "punctuation.definition.to-file.diff" },
        "3": { name: "punctuation.definition.to-file.diff" },
        "4": { name: "punctuation.definition.to-file.diff" }
      },
      match: /(^(\+{3}) [^\n]+(?=\n?$)\n?| (-) [^\n]* (={4})(?=\n?$)\n?)/dgv,
      name: "meta.diff.header.to-file"
    },
    {
      captures: {
        "3": { name: "punctuation.definition.inserted.diff" },
        "6": { name: "punctuation.definition.inserted.diff" }
      },
      match: /^(((>)( [^\n]*)?)|((\+)[^\n]*))(?=\n?$)\n?/dgv,
      name: "markup.inserted.diff"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.changed.diff" }
      },
      match: /^(!)[^\n]*(?=\n?$)\n?/dgv,
      name: "markup.changed.diff"
    },
    {
      captures: {
        "3": { name: "punctuation.definition.deleted.diff" },
        "6": { name: "punctuation.definition.deleted.diff" }
      },
      match: /^(((<)( [^\n]*)?)|((-)[^\n]*))(?=\n?$)\n?/dgv,
      name: "markup.deleted.diff"
    },
    {
      begin: /^(#)/dgv,
      captures: {
        "1": { name: "punctuation.definition.comment.diff" }
      },
      end: /\n/dgv,
      name: "comment.line.number-sign.diff"
    },
    {
      match: /^index [0-9a-f]{7,40}\.\.[0-9a-f]{7,40}[^\n]*(?=\n?$)\n?/dgv,
      name: "meta.diff.index.git"
    },
    {
      captures: {
        "1": { name: "punctuation.separator.key-value.diff" },
        "2": { name: "meta.toc-list.file-name.diff" }
      },
      match: /^Index(:) ([^\n]+)(?=\n?$)\n?/dgv,
      name: "meta.diff.index"
    },
    {
      match: /^Only in [^\n]*: [^\n]*(?=\n?$)\n?/dgv,
      name: "meta.diff.only-in"
    }
  ],
  dependencies: []
};
