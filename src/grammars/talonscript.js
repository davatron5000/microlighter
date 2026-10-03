export default {
  name: "talonscript",
  displayName: "TalonScript",
  aliases: [
    "talon"
  ],
  scopeName: "source.talon",
  patterns: [
    { include: "#body-header" },
    { include: "#header" },
    { include: "#body-noheader" },
    { include: "#comment" },
    { include: "#settings" }
  ],
  repository: {
    action: {
      begin: /([\.0-9A-Z_a-z]+)(\()/dgv,
      beginCaptures: {
        "1": {
          name: "entity.name.function.talon",
          patterns: [
            {
              match: /\./dgv,
              name: "punctuation.separator.talon"
            }
          ]
        },
        "2": { name: "punctuation.definition.parameters.begin.talon" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.parameters.end.talon" }
      },
      name: "variable.parameter.talon",
      patterns: [
        { include: "#action" },
        { include: "#qstring-long" },
        { include: "#qstring" },
        { include: "#argsep" },
        { include: "#number" },
        { include: "#operator" },
        { include: "#varname" }
      ]
    },
    "action-gamepad": {
      captures: {
        "2": { name: "punctuation.definition.parameters.begin.talon" },
        "3": {
          name: "variable.parameter.talon",
          patterns: [
            { include: "#key-mods" }
          ]
        },
        "4": { name: "punctuation.definition.parameters.key.talon" }
      },
      match: /(deck|gamepad|action|face|parrot)(\()([^\n]*)(\))/dgv,
      name: "entity.name.function.talon"
    },
    "action-key": {
      captures: {
        "1": { name: "punctuation.definition.parameters.begin.talon" },
        "2": {
          name: "variable.parameter.talon",
          patterns: [
            { include: "#key-prefixes" },
            { include: "#key-mods" },
            { include: "#keystring" }
          ]
        },
        "3": { name: "punctuation.definition.parameters.key.talon" }
      },
      match: /key(\()([^\n]*)(\))/dgv,
      name: "entity.name.function.talon"
    },
    argsep: {
      match: /,/dgv,
      name: "punctuation.separator.talon"
    },
    assignment: {
      begin: /(\P{space}*)(\p{space}?=\p{space}?)/dgv,
      beginCaptures: {
        "1": { name: "variable.other.talon" },
        "2": { name: "keyword.operator.talon" }
      },
      end: /\n/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#comment-invalid" },
        { include: "#expression" }
      ]
    },
    "body-header": {
      begin: /^-(?=\n?$)/dgv,
      end: /(?=not)possible/dgv,
      patterns: [
        { include: "#body-noheader" }
      ]
    },
    "body-noheader": {
      patterns: [
        { include: "#comment" },
        { include: "#comment-invalid" },
        { include: "#other-rule-definition" },
        { include: "#speech-rule-definition" }
      ]
    },
    capture: {
      match: /(<[\.0-9A-Z_a-z]+>)/dgv,
      name: "variable.parameter.talon"
    },
    comment: {
      match: /^\p{space}*(#[^\n]*)(?=\n?$)/dgv,
      name: "comment.line.number-sign.talon"
    },
    "comment-invalid": {
      match: /(\p{space}*#[^\n]*)(?=\n?$)/dgv,
      name: "invalid.illegal"
    },
    context: {
      captures: {
        "1": {
          name: "entity.name.tag.talon",
          patterns: [
            {
              match: /(and |or )/dgv,
              name: "keyword.operator.talon"
            }
          ]
        },
        "2": {
          name: "entity.name.type.talon",
          patterns: [
            { include: "#comment" },
            { include: "#comment-invalid" },
            { include: "#regexp" }
          ]
        }
      },
      match: /([^\n]*): ([^\n]*)/dgv
    },
    expression: {
      patterns: [
        { include: "#qstring-long" },
        { include: "#action-key" },
        { include: "#action" },
        { include: "#operator" },
        { include: "#number" },
        { include: "#qstring" },
        { include: "#varname" }
      ]
    },
    fstring: {
      captures: {
        "1": {
          patterns: [
            { include: "#action" },
            { include: "#operator" },
            { include: "#number" },
            { include: "#varname" },
            { include: "#qstring" }
          ]
        }
      },
      match: /\{([^\n]+?)\}/dgv,
      name: "constant.character.format.placeholder.talon"
    },
    header: {
      begin: /(?=(?:^app|title|os|tag|list|language):)/dgv,
      end: /(?=^-(?=\n?$))/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#context" }
      ]
    },
    "key-mods": {
      captures: {
        "1": { name: "keyword.operator.talon" },
        "2": { name: "keyword.control.talon" }
      },
      match: /(:)(up|down|change|repeat|start|stop|\p{Nd}+)/dgv,
      name: "keyword.operator.talon"
    },
    "key-prefixes": {
      captures: {
        "1": { name: "keyword.control.talon" },
        "2": { name: "keyword.operator.talon" }
      },
      match: /(ctrl|shift|cmd|alt|win|super)(-)/dgv
    },
    keystring: {
      begin: /(["'])/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.talon" }
      },
      end: /(1)|(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.talon" }
      },
      name: "string.quoted.double.talon",
      patterns: [
        { include: "#string-body" },
        { include: "#key-mods" },
        { include: "#key-prefixes" }
      ]
    },
    list: {
      match: /(\{[\.0-9A-Z_a-z]+?\})/dgv,
      name: "string.interpolated.talon"
    },
    number: {
      match: /(?<=\b)\p{Nd}+(\.\p{Nd}+)?/dgv,
      name: "constant.numeric.talon"
    },
    operator: {
      match: /\p{space}([\-\*\+\/]|or)\p{space}/dgv,
      name: "keyword.operator.talon"
    },
    "other-rule-definition": {
      begin: /^([a-z]+\([^\n]*[^\-]\)|[a-z]+\([^\n]*--\)|[a-z]+\(-\)|[a-z]+\(\)):/dgv,
      beginCaptures: {
        "1": {
          name: "entity.name.tag.talon",
          patterns: [
            { include: "#action-key" },
            { include: "#action-gamepad" },
            { include: "#rule-specials" }
          ]
        }
      },
      end: /(?=^[^\#\p{space}])/dgv,
      patterns: [
        { include: "#statement" }
      ]
    },
    qstring: {
      begin: /(["'])/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.talon" }
      },
      end: /(1)|(?=\n?$)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.talon" }
      },
      name: "string.quoted.double.talon",
      patterns: [
        { include: "#string-body" }
      ]
    },
    "qstring-long": {
      begin: /("""|''')/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.talon" }
      },
      end: /(1)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.talon" }
      },
      name: "string.quoted.triple.talon",
      patterns: [
        { include: "#string-body" }
      ]
    },
    regexp: {
      begin: /(\/)/dgv,
      end: /(\/)/dgv,
      name: "string.regexp.talon",
      patterns: [
        {
          match: /\./dgv,
          name: "support.other.match.any.regexp"
        },
        {
          match: /\$/dgv,
          name: "support.other.match.end.regexp"
        },
        {
          match: /\^/dgv,
          name: "support.other.match.begin.regexp"
        },
        {
          match: /\\[\$\*\+\.\?\^]/dgv,
          name: "constant.character.escape.talon"
        },
        {
          match: /\[(\\\]|[^\]])*\]/dgv,
          name: "constant.other.set.regexp"
        },
        {
          match: /[\*\+\?]/dgv,
          name: "keyword.operator.quantifier.regexp"
        }
      ]
    },
    "rule-specials": {
      captures: {
        "1": { name: "entity.name.function.talon" },
        "2": { name: "punctuation.definition.parameters.begin.talon" },
        "3": { name: "punctuation.definition.parameters.end.talon" }
      },
      match: /(settings|tag)(\()(\))/dgv
    },
    "speech-rule-definition": {
      begin: /^([^\n]*?):/dgv,
      beginCaptures: {
        "1": {
          name: "entity.name.tag.talon",
          patterns: [
            {
              match: /^\^/dgv,
              name: "string.regexp.talon"
            },
            {
              match: /\$(?=\n?$)/dgv,
              name: "string.regexp.talon"
            },
            {
              match: /\(/dgv,
              name: "punctuation.definition.parameters.begin.talon"
            },
            {
              match: /\)/dgv,
              name: "punctuation.definition.parameters.end.talon"
            },
            {
              match: /\|/dgv,
              name: "punctuation.separator.talon"
            },
            { include: "#capture" },
            { include: "#list" }
          ]
        }
      },
      end: /(?=^[^\#\p{space}])/dgv,
      patterns: [
        { include: "#statement" }
      ]
    },
    statement: {
      patterns: [
        { include: "#comment" },
        { include: "#comment-invalid" },
        { include: "#qstring-long" },
        { include: "#action-key" },
        { include: "#action" },
        { include: "#qstring" },
        { include: "#assignment" }
      ]
    },
    "string-body": {
      patterns: [
        {
          match: /\{\{|\}\}/dgv,
          name: "string.quoted.double.talon"
        },
        {
          match: /\\["'\\nrt]/dgv,
          name: "constant.character.escape.python"
        },
        { include: "#fstring" }
      ]
    },
    varname: {
      captures: {
        "2": {
          name: "constant.numeric.talon",
          patterns: [
            {
              match: /_/dgv,
              name: "keyword.operator.talon"
            }
          ]
        }
      },
      match: /([\.0-9A-Z_a-z])(_(list|\p{Nd}+)(?=[^\.0-9A-Z_a-z]))?/dgv,
      name: "variable.parameter.talon"
    }
  },
  dependencies: []
};
