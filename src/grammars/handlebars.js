// Reference: VS Code Handlebars extension (MIT), ported from daaain/Handlebars
// (MIT) — https://github.com/microsoft/vscode/blob/main/extensions/handlebars/syntaxes/Handlebars.tmLanguage.json
// (original: https://github.com/daaain/Handlebars). Adapted for this engine:
// patterns are compiled without the `u` flag, so the source grammar's Unicode
// property escapes (\p{L}, \p{N}) are replaced with \w; and HTML tag/attribute
// parsing is delegated to text.html.basic instead of the source grammar's own
// duplicated (and Oniguruma-only, case-insensitive-group-using) html_tags
// repository.
export default {
  scopeName: "text.html.handlebars",
  dependencies: ["html"],
  patterns: [
    { include: "#escaped-backslash" },
    { include: "#escaped-expression" },
    { include: "#extends" },
    { include: "#block-comment" },
    { include: "#comment" },
    { include: "#block-helper" },
    { include: "#end-block" },
    { include: "#else" },
    { include: "#partial-and-var" },
    { include: "text.html.basic#comments" },
    { include: "text.html.basic#doctype" },
    { include: "text.html.basic#embedded-css" },
    { include: "text.html.basic#embedded-json" },
    { include: "text.html.basic#embedded-javascript" },
    { include: "text.html.basic#raw-text" },
    { include: "#tags" },
    { include: "text.html.basic#entities" }
  ],
  repository: {
    "escaped-backslash": {
      comment: "A backslash escapes the following backslash, so each \\\\ pair renders as a single literal backslash ahead of a mustache.",
      match: "\\\\\\\\(?=\\\\*\\{{2,3})",
      name: "constant.character.escape.handlebars"
    },
    "escaped-expression": {
      comment: "A backslash escapes a mustache so it renders literally, e.g. \\{{foo}}.",
      match: "\\\\\\{{2,3}",
      name: "constant.character.escape.handlebars"
    },
    extends: {
      begin: "(\\{\\{!<)\\s([-\\w./]+)",
      end: "(\\}\\})",
      name: "meta.preprocessor.handlebars",
      beginCaptures: {
        1: { name: "punctuation.section.embedded.begin" },
        2: { name: "entity.name.function" }
      },
      endCaptures: { 1: { name: "punctuation.section.embedded.end" } }
    },
    "block-comment": {
      begin: "\\{\\{~?!--",
      end: "--~?\\}\\}",
      name: "comment.block.handlebars",
      patterns: [{ match: "@\\w*", name: "keyword.annotation.handlebars" }]
    },
    comment: {
      begin: "\\{\\{~?!",
      end: "~?\\}\\}",
      name: "comment.block.handlebars",
      patterns: [{ match: "@\\w*", name: "keyword.annotation.handlebars" }]
    },
    "block-helper": {
      begin: "(\\{\\{)(~?#)([-\\w./>]+)\\s?(@?[-\\w./]+)*\\s?(@?[-\\w./]+)*\\s?(@?[-\\w./]+)*",
      end: "(~?\\}\\})",
      name: "meta.function.block.start.handlebars",
      beginCaptures: {
        1: { name: "punctuation.section.embedded.begin" },
        2: { name: "keyword.control" },
        3: { name: "keyword.control" },
        4: { name: "variable.parameter.handlebars" },
        5: { name: "variable.parameter.handlebars" },
        6: { name: "variable.parameter.handlebars" }
      },
      endCaptures: { 1: { name: "punctuation.section.embedded.end" } },
      patterns: [{ include: "#string" }, { include: "#hash-argument" }]
    },
    "end-block": {
      begin: "(\\{\\{)(~?/)([\\w/.-]+)\\s*",
      end: "(~?\\}\\})",
      name: "meta.function.block.end.handlebars",
      beginCaptures: {
        1: { name: "punctuation.section.embedded.begin" },
        2: { name: "keyword.control" },
        3: { name: "keyword.control" }
      },
      endCaptures: { 1: { name: "punctuation.section.embedded.end" } }
    },
    else: {
      begin: "(\\{\\{)(~?else)(@?\\s(if)\\s([-\\w.()\\s/]+))?",
      end: "(~?\\}\\}\\}*)",
      name: "meta.function.inline.else.handlebars",
      beginCaptures: {
        1: { name: "punctuation.section.embedded.begin" },
        2: { name: "keyword.control" },
        4: { name: "keyword.control" }
      },
      endCaptures: { 1: { name: "punctuation.section.embedded.end" } }
    },
    "partial-and-var": {
      begin: "(\\{\\{~?\\{*(?:>|!<|&)*)\\s*(@?[-\\w$./]+)*",
      end: "(~?\\}\\}\\}*)",
      name: "meta.function.inline.other.handlebars",
      beginCaptures: {
        1: { name: "punctuation.section.embedded.begin" },
        2: { name: "variable.parameter.handlebars" }
      },
      endCaptures: { 1: { name: "punctuation.section.embedded.end" } },
      patterns: [{ include: "#string" }, { include: "#hash-argument" }]
    },
    "hash-argument": {
      patterns: [{ include: "#hash-argument-name" }, { include: "#hash-argument-value" }]
    },
    "hash-argument-name": {
      begin: "\\b([-\\w.]+)\\b=",
      end: "(?='|\"|)",
      captures: { 1: { name: "entity.other.attribute-name" } }
    },
    "hash-argument-value": {
      begin: "([-\\w./]+)\\b",
      end: "('|\"|)",
      captures: { 1: { name: "variable.parameter.handlebars" } },
      patterns: [{ include: "#string" }]
    },
    string: {
      patterns: [{ include: "#string-single-quoted" }, { include: "#string-double-quoted" }]
    },
    "string-single-quoted": {
      begin: "'",
      end: "'",
      name: "string.quoted.single.handlebars",
      beginCaptures: { 0: { name: "punctuation.definition.string.begin" } },
      endCaptures: { 0: { name: "punctuation.definition.string.end" } },
      patterns: [{ match: "\\\\'", name: "constant.character.escape" }]
    },
    "string-double-quoted": {
      begin: "\"",
      end: "\"",
      name: "string.quoted.double.handlebars",
      beginCaptures: { 0: { name: "punctuation.definition.string.begin" } },
      endCaptures: { 0: { name: "punctuation.definition.string.end" } },
      patterns: [{ match: "\\\\\"", name: "constant.character.escape" }]
    },
    tags: {
      begin: "<(/?)([a-zA-Z][\\w.-]*)",
      end: ">",
      beginCaptures: { 2: { name: "entity.name.tag" } },
      patterns: [
        { include: "#block-helper" },
        { include: "#end-block" },
        { include: "#else" },
        { include: "#partial-and-var" },
        { include: "#attributes" },
        { include: "text.html.basic#unquoted-attributes" },
        { include: "text.html.basic#boolean-attributes" }
      ]
    },
    attributes: {
      begin: "[ \\t]+([a-zA-Z_:][\\w:.-]*)\\s*=\\s*(['\"])",
      end: "\\2",
      beginCaptures: {
        1: { name: "entity.other.attribute-name" },
        2: { name: "punctuation.definition.string.begin" }
      },
      endCaptures: { 0: { name: "punctuation.definition.string.end" } },
      contentName: "string.quoted.attribute-value",
      patterns: [
        { include: "#block-helper" },
        { include: "#end-block" },
        { include: "#else" },
        { include: "#partial-and-var" },
        { include: "text.html.basic#entities" }
      ]
    }
  }
};
