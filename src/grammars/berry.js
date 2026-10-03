export default {
  name: "berry",
  displayName: "Berry",
  aliases: [
    "be"
  ],
  scopeName: "source.berry",
  patterns: [
    { include: "#controls" },
    { include: "#strings" },
    { include: "#comment-block" },
    { include: "#comments" },
    { include: "#keywords" },
    { include: "#function" },
    { include: "#member" },
    { include: "#identifier" },
    { include: "#number" },
    { include: "#operator" }
  ],
  repository: {
    "comment-block": {
      begin: /#-/dgv,
      end: /-#/dgv,
      name: "comment.berry",
      patterns: [
        {}
      ]
    },
    comments: {
      begin: /#/dgv,
      end: /\n/dgv,
      name: "comment.line.berry",
      patterns: [
        {}
      ]
    },
    controls: {
      patterns: [
        {
          match: /\b(if|elif|else|for|while|do|end|break|continue|return|try|except|raise)\b/dgv,
          name: "keyword.control.berry"
        }
      ]
    },
    function: {
      patterns: [
        {
          match: /\b([A-Z_a-z][0-9A-Z_a-z]*(?=\p{space}*\())/dgv,
          name: "entity.name.function.berry"
        }
      ]
    },
    identifier: {
      patterns: [
        {
          match: /\b[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]+\b/dgv,
          name: "identifier.berry"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /\b(var|static|def|class|true|false|nil|self|super|import|as|_class)\b/dgv,
          name: "keyword.berry"
        }
      ]
    },
    member: {
      patterns: [
        {
          captures: {
            "0": { name: "entity.other.attribute-name.berry" }
          },
          match: /\.([A-Z_a-z][0-9A-Z_a-z]*)/dgv
        }
      ]
    },
    number: {
      patterns: [
        {
          match: /0x\p{AHex}+|\p{Nd}+|(\p{Nd}+\.?|\.\p{Nd})\p{Nd}*([Ee][\-\+]?\p{Nd}+)?/dgv,
          name: "constant.numeric.berry"
        }
      ]
    },
    operator: {
      patterns: [
        {
          match: /[\-\]\!\%\&\(-\+\.\/\:\<\=\>\[\^\|\~]/dgv,
          name: "keyword.operator.berry"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /f(?=["'])/dgv,
          patterns: [
            {
              begin: /"/dgv,
              end: /"/dgv,
              name: "string.quoted.other.berry",
              patterns: [
                {
                  match: /(\\x\p{AHex}{2})|(\\[0-7]{3})|(\\\\)|(\\")|(\\')|(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)/dgv,
                  name: "constant.character.escape.berry"
                },
                {
                  match: /\{\{[^\}]*\}\}/dgv,
                  name: "string.quoted.other.berry"
                },
                {
                  begin: /\{/dgv,
                  end: /\}/dgv,
                  name: "keyword.other.unit.berry",
                  patterns: [
                    { include: "#keywords" },
                    { include: "#numbers" },
                    { include: "#identifier" },
                    { include: "#operator" },
                    { include: "#member" },
                    { include: "#function" }
                  ]
                }
              ]
            },
            {
              begin: /'/dgv,
              end: /'/dgv,
              name: "string.quoted.other.berry",
              patterns: [
                {
                  match: /(\\x\p{AHex}{2})|(\\[0-7]{3})|(\\\\)|(\\")|(\\')|(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)/dgv,
                  name: "constant.character.escape.berry"
                },
                {
                  match: /\{\{[^\}]*\}\}/dgv,
                  name: "string.quoted.other.berry"
                },
                {
                  begin: /\{/dgv,
                  end: /\}/dgv,
                  name: "keyword.other.unit.berry",
                  patterns: [
                    { include: "#keywords" },
                    { include: "#numbers" },
                    { include: "#identifier" },
                    { include: "#operator" },
                    { include: "#member" },
                    { include: "#function" }
                  ]
                }
              ]
            }
          ],
          while: {
            G: [/￿|^[\t ]*(?=["'])/dgv, /|^[\t ]*(?=["'])/dgv]
          }
        },
        {
          begin: /(["'])/dgv,
          end: /1/dgv,
          name: "string.quoted.double.berry",
          patterns: [
            {
              match: /(\\x\p{AHex}{2})|(\\[0-7]{3})|(\\\\)|(\\")|(\\')|(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)/dgv,
              name: "constant.character.escape.berry"
            }
          ]
        }
      ]
    }
  },
  dependencies: []
};
