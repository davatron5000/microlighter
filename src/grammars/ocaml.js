export default {
  name: "ocaml",
  displayName: "OCaml",
  scopeName: "source.ocaml",
  patterns: [
    { include: "#comment" },
    { include: "#pragma" },
    { include: "#decl" }
  ],
  repository: {
    attribute: {
      begin: /(\[)\p{space}*((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])@{1,3}(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))/dgv,
      beginCaptures: {
        "1": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" },
        "2": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" }
      },
      patterns: [
        { include: "#attributePayload" }
      ]
    },
    attributeIdentifier: {
      captures: {
        "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
        "2": { name: "punctuation.definition.tag" }
      },
      match: /((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])%(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)/dgv
    },
    attributePayload: {
      patterns: [
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)%)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])[\:\?](?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))|(?<=\p{space})|(?=\])/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            { include: "#pathModuleExtended" },
            { include: "#pathRecord" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(?=\])/dgv,
          patterns: [
            { include: "#signature" },
            { include: "#type" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)\?)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(?=\])/dgv,
          patterns: [
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)\?)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              end: /(?=\])|\bwhen\b/dgv,
              endCaptures: {
                "1": {}
              },
              patterns: [
                { include: "#pattern" }
              ]
            },
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)when)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?=\])/dgv,
              patterns: [
                { include: "#term" }
              ]
            }
          ]
        },
        { include: "#term" }
      ]
    },
    bindClassTerm: {
      patterns: [
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:and|class|type))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])(:)|(=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:and|class|type))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?=(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*\p{space}*,|[^\%\p{space}\p{Lower}])|(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*|(?=\btype\b)/dgv,
              endCaptures: {
                "0": { name: "entity.name.function strong emphasis" }
              },
              patterns: [
                { include: "#attributeIdentifier" }
              ]
            },
            {
              begin: /\[/dgv,
              captures: {
                "0": { name: "punctuation.definition.tag" }
              },
              end: /\]/dgv,
              patterns: [
                { include: "#type" }
              ]
            },
            { include: "#bindTermArgs" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])=(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|val)\b)/dgv,
          endCaptures: {
            "0": { name: "support.type strong" }
          },
          patterns: [
            { include: "#literalClassType" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /\band\b|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" }
          },
          patterns: [
            { include: "#term" }
          ]
        }
      ]
    },
    bindClassType: {
      patterns: [
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:and|class|type))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])(:)|(=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:and|class|type))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?=(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*\p{space}*,|[^\%\p{space}\p{Lower}])|(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*|(?=\btype\b)/dgv,
              endCaptures: {
                "0": { name: "entity.name.function strong emphasis" }
              },
              patterns: [
                { include: "#attributeIdentifier" }
              ]
            },
            {
              begin: /\[/dgv,
              captures: {
                "0": { name: "punctuation.definition.tag" }
              },
              end: /\]/dgv,
              patterns: [
                { include: "#type" }
              ]
            },
            { include: "#bindTermArgs" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])=(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|val)\b)/dgv,
          endCaptures: {
            "0": { name: "support.type strong" }
          },
          patterns: [
            { include: "#literalClassType" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /\band\b|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" }
          },
          patterns: [
            { include: "#literalClassType" }
          ]
        }
      ]
    },
    bindConstructor: {
      patterns: [
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)exception)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])|(?<=[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]\+=|^\+=|[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]=|^=|[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]\||^\|)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(:)|\b(of)\b|((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\|(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "punctuation.definition.tag" },
            "3": { name: "support.type strong" }
          },
          patterns: [
            { include: "#attributeIdentifier" },
            {
              match: /\.\./dgv,
              name: "variable.other.class.js message.error variable.interpolation string.regexp"
            },
            {
              match: /\b\b(?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*\b(?!\p{space}*(?:\.|\([^\*]))/dgv,
              name: "constant.language constant.numeric entity.other.attribute-name.id.css strong"
            },
            { include: "#type" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)of)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\|(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "0": { name: "support.type strong" }
          },
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    bindSignature: {
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)type)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])=(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          endCaptures: {
            "0": { name: "support.type strong" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#pathModuleExtended" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /\band\b|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" }
          },
          patterns: [
            { include: "#signature" }
          ]
        }
      ]
    },
    bindStructure: {
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)and)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])|(?=\p{Upper})/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])(:(?!=))|(:?=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            { include: "#comment" },
            {
              match: /\bmodule\b/dgv,
              name: "markup.inserted constant.language support.constant.property-value entity.name.filename"
            },
            {
              match: /\b(?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "entity.name.function strong emphasis"
            },
            {
              begin: /\((?!\))/dgv,
              captures: {
                "0": { name: "punctuation.definition.tag" }
              },
              end: /\)/dgv,
              patterns: [
                { include: "#comment" },
                {
                  begin: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]):(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
                  beginCaptures: {
                    "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" }
                  },
                  end: /(?=\))/dgv,
                  patterns: [
                    { include: "#signature" }
                  ]
                },
                { include: "#variableModule" }
              ]
            },
            { include: "#literalUnit" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /\b(and)\b|((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])=(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            { include: "#signature" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]:|^:|[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /\b(?:(and)|(with))\b|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" },
            "2": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" }
          },
          patterns: [
            { include: "#structure" }
          ]
        }
      ]
    },
    bindTerm: {
      patterns: [
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)!)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:and|external|let|method|val))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /\b(module)\b|\b(open)\b|(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])(:)|((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])=(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename" },
            "2": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "4": { name: "support.type strong" }
          },
          patterns: [
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)!)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:and|external|let|method|val))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?=\b(?:module|open)\b)|(?=(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*\p{space}*,|[^\%\p{space}\p{Lower}])|\b(rec)\b|((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)/dgv,
              endCaptures: {
                "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
                "2": { name: "entity.name.function strong emphasis" }
              },
              patterns: [
                { include: "#attributeIdentifier" },
                { include: "#comment" }
              ]
            },
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)rec)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)|(?=[^\p{space}\p{Alpha}])/dgv,
              endCaptures: {
                "0": { name: "entity.name.function strong emphasis" }
              },
              patterns: [
                { include: "#bindTermArgs" }
              ]
            },
            { include: "#bindTermArgs" }
          ]
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)module)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          patterns: [
            { include: "#declModule" }
          ]
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)open)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?=\bin\b)|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          patterns: [
            { include: "#pathModuleSimple" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])=(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "0": { name: "support.type strong" }
          },
          patterns: [
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              end: /\btype\b|(?=\P{space})/dgv,
              endCaptures: {
                "0": { name: "keyword.control" }
              }
            },
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)type)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\.(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              endCaptures: {
                "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
              },
              patterns: [
                { include: "#pattern" }
              ]
            },
            { include: "#type" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /\band\b|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" }
          },
          patterns: [
            { include: "#term" }
          ]
        }
      ]
    },
    bindTermArgs: {
      patterns: [
        {
          applyEndPatternLast: true,
          begin: /[\?\~]/dgv,
          beginCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          end: /:|(?=\P{space})/dgv,
          endCaptures: {
            "0": { name: "keyword" }
          },
          patterns: [
            {
              begin: /(?<=[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]~|^~|[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]\?|^\?)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              end: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*|(?<=\))/dgv,
              endCaptures: {
                "0": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename" }
              },
              patterns: [
                { include: "#comment" },
                {
                  begin: /\((?!\*)/dgv,
                  captures: {
                    "0": { name: "punctuation.definition.tag" }
                  },
                  end: /\)/dgv,
                  patterns: [
                    {
                      begin: /(?<=\()/dgv,
                      end: /[\:\=]/dgv,
                      endCaptures: {
                        "0": { name: "keyword" }
                      },
                      patterns: [
                        {
                          match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
                          name: "markup.inserted constant.language support.constant.property-value entity.name.filename"
                        }
                      ]
                    },
                    {
                      begin: /(?<=:)/dgv,
                      end: /=|(?=\))/dgv,
                      endCaptures: {
                        "0": { name: "keyword" }
                      },
                      patterns: [
                        { include: "#type" }
                      ]
                    },
                    {
                      begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
                      end: /(?=\))/dgv,
                      patterns: [
                        { include: "#term" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { include: "#pattern" }
      ]
    },
    bindType: {
      patterns: [
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:and|type))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\+=|=(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "0": { name: "support.type strong" }
          },
          patterns: [
            { include: "#attributeIdentifier" },
            { include: "#pathType" },
            {
              match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "entity.name.function strong"
            },
            { include: "#type" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]\+|^\+|[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /\band\b|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" }
          },
          patterns: [
            { include: "#bindConstructor" }
          ]
        }
      ]
    },
    comment: {
      patterns: [
        { include: "#attribute" },
        { include: "#extension" },
        { include: "#commentBlock" },
        { include: "#commentDoc" }
      ]
    },
    commentBlock: {
      begin: /\(\*(?!\*[^\)])/dgv,
      contentName: "emphasis",
      end: /\*\)/dgv,
      name: "comment constant.regexp meta.separator.markdown",
      patterns: [
        { include: "#commentBlock" },
        { include: "#commentDoc" }
      ]
    },
    commentDoc: {
      begin: /\(\*\*/dgv,
      end: /\*\)/dgv,
      name: "comment constant.regexp meta.separator.markdown",
      patterns: [
        {
          match: /\*/dgv
        },
        { include: "#comment" }
      ]
    },
    decl: {
      patterns: [
        { include: "#declClass" },
        { include: "#declException" },
        { include: "#declInclude" },
        { include: "#declModule" },
        { include: "#declOpen" },
        { include: "#declTerm" },
        { include: "#declType" }
      ]
    },
    declClass: {
      begin: /\bclass\b/dgv,
      beginCaptures: {
        "0": { name: "entity.name.class constant.numeric markup.underline" }
      },
      end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#pragma" },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)class)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          beginCaptures: {
            "0": { name: "entity.name.class constant.numeric markup.underline" }
          },
          end: /\btype\b|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|val)\b)/dgv,
          endCaptures: {
            "0": { name: "keyword" }
          },
          patterns: [
            { include: "#bindClassTerm" }
          ]
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)type)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          patterns: [
            { include: "#bindClassType" }
          ]
        }
      ]
    },
    declException: {
      begin: /\bexception\b/dgv,
      beginCaptures: {
        "0": { name: "keyword markup.underline" }
      },
      end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag" }
      },
      patterns: [
        { include: "#attributeIdentifier" },
        { include: "#comment" },
        { include: "#pragma" },
        { include: "#bindConstructor" }
      ]
    },
    declInclude: {
      begin: /\binclude\b/dgv,
      beginCaptures: {
        "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
      },
      end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag" }
      },
      patterns: [
        { include: "#attributeIdentifier" },
        { include: "#comment" },
        { include: "#pragma" },
        { include: "#signature" }
      ]
    },
    declModule: {
      begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)module)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])|\bmodule\b/dgv,
      beginCaptures: {
        "0": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename markup.underline" }
      },
      end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#pragma" },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)module)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /\b(type)\b|(?=\p{Upper})/dgv,
          endCaptures: {
            "0": { name: "keyword" }
          },
          patterns: [
            { include: "#attributeIdentifier" },
            { include: "#comment" },
            {
              match: /\brec\b/dgv,
              name: "variable.other.class.js message.error variable.interpolation string.regexp"
            }
          ]
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)type)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          patterns: [
            { include: "#bindSignature" }
          ]
        },
        {
          begin: /(?=\p{Upper})/dgv,
          end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          patterns: [
            { include: "#bindStructure" }
          ]
        }
      ]
    },
    declOpen: {
      begin: /\bopen\b/dgv,
      beginCaptures: {
        "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
      },
      end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag" }
      },
      patterns: [
        { include: "#attributeIdentifier" },
        { include: "#comment" },
        { include: "#pragma" },
        { include: "#pathModuleExtended" }
      ]
    },
    declTerm: {
      begin: /\b(?:(external|val)|(method)|(let))\b(!?)/dgv,
      beginCaptures: {
        "1": { name: "support.type markup.underline" },
        "2": { name: "storage.type markup.underline" },
        "3": { name: "keyword.control markup.underline" },
        "4": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
      },
      end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#pragma" },
        { include: "#bindTerm" }
      ]
    },
    declType: {
      begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)type)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])|\btype\b/dgv,
      beginCaptures: {
        "0": { name: "keyword markup.underline" }
      },
      end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag" }
      },
      patterns: [
        { include: "#comment" },
        { include: "#pragma" },
        { include: "#bindType" }
      ]
    },
    extension: {
      begin: /(\[)((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])%{1,3}(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))/dgv,
      beginCaptures: {
        "1": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" },
        "2": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" }
      },
      patterns: [
        { include: "#attributePayload" }
      ]
    },
    literal: {
      patterns: [
        { include: "#termConstructor" },
        { include: "#literalArray" },
        { include: "#literalBoolean" },
        { include: "#literalCharacter" },
        { include: "#literalList" },
        { include: "#literalNumber" },
        { include: "#literalObjectTerm" },
        { include: "#literalString" },
        { include: "#literalRecord" },
        { include: "#literalUnit" }
      ]
    },
    literalArray: {
      begin: /\[\|/dgv,
      captures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" }
      },
      end: /\|\]/dgv,
      patterns: [
        { include: "#term" }
      ]
    },
    literalBoolean: {
      match: /\bfalse|true\b/dgv,
      name: "constant.language constant.numeric entity.other.attribute-name.id.css strong"
    },
    literalCharacter: {
      begin: /(?<![\p{Alpha}\p{M}\p{Nd}\p{Pc}])'/dgv,
      end: /'/dgv,
      name: "markup.punctuation.quote.beginning",
      patterns: [
        { include: "#literalCharacterEscape" }
      ]
    },
    literalCharacterEscape: {
      match: /\\(?:["'\\bnrt]|\p{Nd}\p{Nd}\p{Nd}|x\p{AHex}\p{AHex}|o[0-3][0-7][0-7])/dgv
    },
    literalClassType: {
      patterns: [
        { include: "#comment" },
        {
          begin: /\bobject\b/dgv,
          captures: {
            "0": { name: "punctuation.definition.tag emphasis" }
          },
          end: /\bend\b/dgv,
          patterns: [
            {
              begin: /\binherit\b/dgv,
              beginCaptures: {
                "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
              },
              end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.tag" }
              },
              patterns: [
                {
                  begin: /\bas\b/dgv,
                  beginCaptures: {
                    "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
                  },
                  end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
                  patterns: [
                    { include: "#variablePattern" }
                  ]
                },
                { include: "#type" }
              ]
            },
            { include: "#pattern" },
            { include: "#declTerm" }
          ]
        },
        {
          begin: /\[/dgv,
          end: /\]/dgv
        }
      ]
    },
    literalList: {
      patterns: [
        {
          begin: /\[/dgv,
          captures: {
            "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" }
          },
          end: /\]/dgv,
          patterns: [
            { include: "#term" }
          ]
        }
      ]
    },
    literalNumber: {
      match: /(?<!\p{Alpha})\p{Nd}\p{Nd}*(\.\p{Nd}\p{Nd}*)?/dgv,
      name: "constant.numeric"
    },
    literalObjectTerm: {
      patterns: [
        { include: "#comment" },
        {
          begin: /\bobject\b/dgv,
          captures: {
            "0": { name: "punctuation.definition.tag emphasis" }
          },
          end: /\bend\b/dgv,
          patterns: [
            {
              begin: /\binherit\b/dgv,
              beginCaptures: {
                "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
              },
              end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.tag" }
              },
              patterns: [
                {
                  begin: /\bas\b/dgv,
                  beginCaptures: {
                    "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
                  },
                  end: /;;|(?=[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
                  patterns: [
                    { include: "#variablePattern" }
                  ]
                },
                { include: "#term" }
              ]
            },
            { include: "#pattern" },
            { include: "#declTerm" }
          ]
        },
        {
          begin: /\[/dgv,
          end: /\]/dgv
        }
      ]
    },
    literalRecord: {
      begin: /\{/dgv,
      captures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong strong" }
      },
      end: /\}/dgv,
      patterns: [
        {
          begin: /(?<=[\;\{])/dgv,
          end: /(:)|(=)|(;)|(with)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" },
            "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "4": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#pathModulePrefixSimple" },
            {
              match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "markup.inserted constant.language support.constant.property-value entity.name.filename emphasis"
            }
          ]
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)with)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(:)|(=)|(;)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" },
            "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            {
              match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "markup.inserted constant.language support.constant.property-value entity.name.filename emphasis"
            }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(;)|(=)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            { include: "#type" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /;|(?=\})/dgv,
          endCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            { include: "#term" }
          ]
        }
      ]
    },
    literalString: {
      patterns: [
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string beginning.punctuation.definition.quote.markdown",
          patterns: [
            { include: "#literalStringEscape" }
          ]
        },
        {
          begin: /(\{)([_\p{Lower}]*?)(\|)/dgv,
          end: /(\|)(2)(\})/dgv,
          name: "string beginning.punctuation.definition.quote.markdown",
          patterns: [
            { include: "#literalStringEscape" }
          ]
        }
      ]
    },
    literalStringEscape: {
      match: /\\(?:["\\bnrt]|\p{Nd}\p{Nd}\p{Nd}|x\p{AHex}\p{AHex}|o[0-3][0-7][0-7])/dgv
    },
    literalUnit: {
      match: /\(\)/dgv,
      name: "constant.language constant.numeric entity.other.attribute-name.id.css strong"
    },
    pathModuleExtended: {
      patterns: [
        { include: "#pathModulePrefixExtended" },
        {
          match: /\b(?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
          name: "entity.name.class constant.numeric"
        }
      ]
    },
    pathModulePrefixExtended: {
      begin: /\b(?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*\.|(?=\n?$)|\()/dgv,
      beginCaptures: {
        "0": { name: "entity.name.class constant.numeric" }
      },
      end: /(?![\.\p{space}]|(?=\n?$)|\()/dgv,
      patterns: [
        { include: "#comment" },
        {
          begin: /\(/dgv,
          captures: {
            "0": { name: "keyword.control" }
          },
          end: /\)/dgv,
          patterns: [
            {
              match: /\b((?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*\)))/dgv,
              name: "string.other.link variable.language variable.parameter emphasis"
            },
            { include: "#structure" }
          ]
        },
        {
          begin: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\.(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          beginCaptures: {
            "0": { name: "keyword strong" }
          },
          end: /\b((?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*\.|(?=\n?$)))|\b((?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*(?:(?=\n?$)|\()))|\b((?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*\)))|(?![\.\p{space}\p{Upper}]|(?=\n?$)|\()/dgv,
          endCaptures: {
            "1": { name: "entity.name.class constant.numeric" },
            "2": { name: "entity.name.function strong" },
            "3": { name: "string.other.link variable.language variable.parameter emphasis" }
          }
        }
      ]
    },
    pathModulePrefixExtendedParens: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "keyword.control" }
      },
      end: /\)/dgv,
      patterns: [
        {
          match: /\b((?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*\)))/dgv,
          name: "string.other.link variable.language variable.parameter emphasis"
        },
        { include: "#structure" }
      ]
    },
    pathModulePrefixSimple: {
      begin: /\b(?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*\.)/dgv,
      beginCaptures: {
        "0": { name: "entity.name.class constant.numeric" }
      },
      end: /(?![\.\p{space}])/dgv,
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\.(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          beginCaptures: {
            "0": { name: "keyword strong" }
          },
          end: /\b((?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*\.))|\b((?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*(?=\p{space}*))|(?![\.\p{space}\p{Upper}])/dgv,
          endCaptures: {
            "1": { name: "entity.name.class constant.numeric" },
            "2": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" }
          }
        }
      ]
    },
    pathModuleSimple: {
      patterns: [
        { include: "#pathModulePrefixSimple" },
        {
          match: /\b(?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
          name: "entity.name.class constant.numeric"
        }
      ]
    },
    pathRecord: {
      patterns: [
        {
          begin: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
          end: /(?=[^\.\p{space}])(?!\(\*)/dgv,
          patterns: [
            { include: "#comment" },
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)\.)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\.(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              beginCaptures: {
                "0": { name: "keyword strong" }
              },
              end: /((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\.(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))|((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|mutable|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)|(?<=\))|(?<=\])/dgv,
              endCaptures: {
                "1": { name: "keyword strong" },
                "2": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename" }
              },
              patterns: [
                { include: "#comment" },
                { include: "#pathModulePrefixSimple" },
                {
                  begin: /\((?!\*)/dgv,
                  captures: {
                    "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
                  },
                  end: /\)/dgv,
                  patterns: [
                    { include: "#term" }
                  ]
                },
                {
                  begin: /\[/dgv,
                  captures: {
                    "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
                  },
                  end: /\]/dgv,
                  patterns: [
                    { include: "#pattern" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    pattern: {
      patterns: [
        { include: "#comment" },
        { include: "#patternArray" },
        { include: "#patternLazy" },
        { include: "#patternList" },
        { include: "#patternMisc" },
        { include: "#patternModule" },
        { include: "#patternRecord" },
        { include: "#literal" },
        { include: "#patternParens" },
        { include: "#patternType" },
        { include: "#variablePattern" },
        { include: "#termOperator" }
      ]
    },
    patternArray: {
      begin: /\[\|/dgv,
      captures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" }
      },
      end: /\|\]/dgv,
      patterns: [
        { include: "#pattern" }
      ]
    },
    patternLazy: {
      match: /lazy/dgv,
      name: "variable.other.class.js message.error variable.interpolation string.regexp"
    },
    patternList: {
      begin: /\[/dgv,
      captures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" }
      },
      end: /\]/dgv,
      patterns: [
        { include: "#pattern" }
      ]
    },
    patternMisc: {
      captures: {
        "1": { name: "string.regexp strong" },
        "2": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
        "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
      },
      match: /((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]),(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))|([\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]+)|\b(as)\b/dgv
    },
    patternModule: {
      begin: /\bmodule\b/dgv,
      beginCaptures: {
        "0": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename" }
      },
      end: /(?=\))/dgv,
      patterns: [
        { include: "#declModule" }
      ]
    },
    patternParens: {
      begin: /\((?!\))/dgv,
      captures: {
        "0": { name: "punctuation.definition.tag" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]):(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          beginCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" }
          },
          end: /(?=\))/dgv,
          patterns: [
            { include: "#type" }
          ]
        },
        { include: "#pattern" }
      ]
    },
    patternRecord: {
      begin: /\{/dgv,
      captures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong strong" }
      },
      end: /\}/dgv,
      patterns: [
        {
          begin: /(?<=[\;\{])/dgv,
          end: /(:)|(=)|(;)|(with)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" },
            "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "4": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#pathModulePrefixSimple" },
            {
              match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "markup.inserted constant.language support.constant.property-value entity.name.filename emphasis"
            }
          ]
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)with)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(:)|(=)|(;)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" },
            "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            {
              match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "markup.inserted constant.language support.constant.property-value entity.name.filename emphasis"
            }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(;)|(=)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            { include: "#type" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /;|(?=\})/dgv,
          endCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            { include: "#pattern" }
          ]
        }
      ]
    },
    patternType: {
      begin: /\btype\b/dgv,
      beginCaptures: {
        "0": { name: "keyword" }
      },
      end: /(?=\))/dgv,
      patterns: [
        { include: "#declType" }
      ]
    },
    pragma: {
      begin: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])#(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.tag" }
      },
      end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#literalNumber" },
        { include: "#literalString" }
      ]
    },
    signature: {
      patterns: [
        { include: "#comment" },
        { include: "#signatureLiteral" },
        { include: "#signatureFunctor" },
        { include: "#pathModuleExtended" },
        { include: "#signatureParens" },
        { include: "#signatureRecovered" },
        { include: "#signatureConstraints" }
      ]
    },
    signatureConstraints: {
      begin: /\bwith\b/dgv,
      beginCaptures: {
        "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" }
      },
      end: /(?=\))|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
      patterns: [
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)with)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /\b(?:(module)|(type))\b/dgv,
          endCaptures: {
            "1": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename" },
            "2": { name: "keyword" }
          }
        },
        { include: "#declModule" },
        { include: "#declType" }
      ]
    },
    signatureFunctor: {
      patterns: [
        {
          begin: /\bfunctor\b/dgv,
          beginCaptures: {
            "0": { name: "keyword" }
          },
          end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          patterns: [
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)functor)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(\(\))|(\((?!\)))/dgv,
              endCaptures: {
                "1": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" },
                "2": { name: "punctuation.definition.tag" }
              }
            },
            {
              begin: /(?<=\()/dgv,
              end: /(:)|(\))/dgv,
              endCaptures: {
                "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
                "2": { name: "punctuation.definition.tag" }
              },
              patterns: [
                { include: "#variableModule" }
              ]
            },
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.tag" }
              },
              patterns: [
                { include: "#signature" }
              ]
            },
            {
              begin: /(?<=\))/dgv,
              end: /(\()|((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])->(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag" },
                "2": { name: "support.type strong" }
              }
            },
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)->)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
              patterns: [
                { include: "#signature" }
              ]
            }
          ]
        },
        {
          match: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])->(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          name: "support.type strong"
        }
      ]
    },
    signatureLiteral: {
      begin: /\bsig\b/dgv,
      captures: {
        "0": { name: "punctuation.definition.tag emphasis" }
      },
      end: /\bend\b/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#pragma" },
        { include: "#decl" }
      ]
    },
    signatureParens: {
      begin: /\((?!\))/dgv,
      captures: {
        "0": { name: "punctuation.definition.tag" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]):(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          beginCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" }
          },
          end: /(?=\))/dgv,
          patterns: [
            { include: "#signature" }
          ]
        },
        { include: "#signature" }
      ]
    },
    signatureRecovered: {
      patterns: [
        {
          begin: /\(|(?<=[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]:|^:|[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]->|^->)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:include|open))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /\bmodule\b|(?!(?=\n?$)|\p{space}|\bmodule\b)/dgv,
          endCaptures: {
            "0": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename" }
          }
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)module)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          patterns: [
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)module)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /\btype\b/dgv,
              endCaptures: {
                "0": { name: "keyword" }
              }
            },
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)type)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /\bof\b/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.tag" }
              }
            },
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)of)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
              patterns: [
                { include: "#signature" }
              ]
            }
          ]
        }
      ]
    },
    structure: {
      patterns: [
        { include: "#comment" },
        { include: "#structureLiteral" },
        { include: "#structureFunctor" },
        { include: "#pathModuleExtended" },
        { include: "#structureParens" }
      ]
    },
    structureFunctor: {
      patterns: [
        {
          begin: /\bfunctor\b/dgv,
          beginCaptures: {
            "0": { name: "keyword" }
          },
          end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          patterns: [
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)functor)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(\(\))|(\((?!\)))/dgv,
              endCaptures: {
                "1": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong" },
                "2": { name: "punctuation.definition.tag" }
              }
            },
            {
              begin: /(?<=\()/dgv,
              end: /(:)|(\))/dgv,
              endCaptures: {
                "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
                "2": { name: "punctuation.definition.tag" }
              },
              patterns: [
                { include: "#variableModule" }
              ]
            },
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.tag" }
              },
              patterns: [
                { include: "#signature" }
              ]
            },
            {
              begin: /(?<=\))/dgv,
              end: /(\()|((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])->(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.tag" },
                "2": { name: "support.type strong" }
              }
            },
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)->)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              end: /(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
              patterns: [
                { include: "#structure" }
              ]
            }
          ]
        },
        {
          match: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])->(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          name: "support.type strong"
        }
      ]
    },
    structureLiteral: {
      begin: /\bstruct\b/dgv,
      captures: {
        "0": { name: "punctuation.definition.tag emphasis" }
      },
      end: /\bend\b/dgv,
      patterns: [
        { include: "#comment" },
        { include: "#pragma" },
        { include: "#decl" }
      ]
    },
    structureParens: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.definition.tag" }
      },
      end: /\)/dgv,
      patterns: [
        { include: "#structureUnpack" },
        { include: "#structure" }
      ]
    },
    structureUnpack: {
      begin: /\bval\b/dgv,
      beginCaptures: {
        "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
      },
      end: /(?=\))/dgv
    },
    term: {
      patterns: [
        { include: "#termLet" },
        { include: "#termAtomic" }
      ]
    },
    termAtomic: {
      patterns: [
        { include: "#comment" },
        { include: "#termConditional" },
        { include: "#termConstructor" },
        { include: "#termDelim" },
        { include: "#termFor" },
        { include: "#termFunction" },
        { include: "#literal" },
        { include: "#termMatch" },
        { include: "#termMatchRule" },
        { include: "#termPun" },
        { include: "#termOperator" },
        { include: "#termTry" },
        { include: "#termWhile" },
        { include: "#pathRecord" }
      ]
    },
    termConditional: {
      match: /\b(?:if|then|else)\b/dgv,
      name: "keyword.control"
    },
    termConstructor: {
      patterns: [
        { include: "#pathModulePrefixSimple" },
        {
          match: /\b(?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
          name: "constant.language constant.numeric entity.other.attribute-name.id.css strong"
        }
      ]
    },
    termDelim: {
      patterns: [
        {
          begin: /\((?!\))/dgv,
          captures: {
            "0": { name: "punctuation.definition.tag" }
          },
          end: /\)/dgv,
          patterns: [
            { include: "#term" }
          ]
        },
        {
          begin: /\bbegin\b/dgv,
          captures: {
            "0": { name: "punctuation.definition.tag" }
          },
          end: /\bend\b/dgv,
          patterns: [
            { include: "#attributeIdentifier" },
            { include: "#term" }
          ]
        }
      ]
    },
    termFor: {
      patterns: [
        {
          begin: /\bfor\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control" }
          },
          end: /\bdone\b/dgv,
          endCaptures: {
            "0": { name: "keyword.control" }
          },
          patterns: [
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)for)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])=(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              endCaptures: {
                "0": { name: "support.type strong" }
              },
              patterns: [
                { include: "#pattern" }
              ]
            },
            {
              begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
              end: /\b(?:downto|to)\b/dgv,
              endCaptures: {
                "0": { name: "keyword.control" }
              },
              patterns: [
                { include: "#term" }
              ]
            },
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)to)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /\bdo\b/dgv,
              endCaptures: {
                "0": { name: "keyword.control" }
              },
              patterns: [
                { include: "#term" }
              ]
            },
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)do)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?=\bdone\b)/dgv,
              patterns: [
                { include: "#term" }
              ]
            }
          ]
        }
      ]
    },
    termFunction: {
      captures: {
        "1": { name: "storage.type" },
        "2": { name: "storage.type" }
      },
      match: /\b(?:(fun)|(function))\b/dgv
    },
    termLet: {
      patterns: [
        {
          begin: /(?:(?<=[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]=|^=|[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]->|^->)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?<=[\(\;]))(?=\p{space}|\blet\b)|(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:begin|do|else|in|struct|then|try))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])|(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)@@)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\p{space}+/dgv,
          end: /\b(?:(and)|(let))\b|(?=\P{space})(?!\(\*)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" },
            "2": { name: "storage.type markup.underline" }
          },
          patterns: [
            { include: "#comment" }
          ]
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:and|let))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])|(let)/dgv,
          beginCaptures: {
            "1": { name: "storage.type markup.underline" }
          },
          end: /\b(?:(and)|(in))\b|(?=[\]\)\}]|\b(?:end|class|exception|external|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp markup.underline" },
            "2": { name: "storage.type markup.underline" }
          },
          patterns: [
            { include: "#bindTerm" }
          ]
        }
      ]
    },
    termMatch: {
      begin: /\bmatch\b/dgv,
      captures: {
        "0": { name: "keyword.control" }
      },
      end: /\bwith\b/dgv,
      patterns: [
        { include: "#term" }
      ]
    },
    termMatchRule: {
      patterns: [
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)(?:fun|function|with))(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])(\|)|(->)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          endCaptures: {
            "1": { name: "support.type strong" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#attributeIdentifier" },
            { include: "#pattern" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\[\^\|\~]|^)\|)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])|(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\|(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          beginCaptures: {
            "0": { name: "support.type strong" }
          },
          end: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])(\|)|(->)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          endCaptures: {
            "1": { name: "support.type strong" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            { include: "#pattern" },
            {
              begin: /\bwhen\b/dgv,
              beginCaptures: {
                "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
              },
              end: /(?=(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])->(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))/dgv,
              patterns: [
                { include: "#term" }
              ]
            }
          ]
        }
      ]
    },
    termOperator: {
      patterns: [
        {
          begin: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])#(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          beginCaptures: {
            "0": { name: "keyword" }
          },
          end: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
          endCaptures: {
            "0": { name: "entity.name.function" }
          }
        },
        {
          captures: {
            "0": { name: "keyword.control strong" }
          },
          match: /<-/dgv
        },
        {
          captures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "2": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          match: /(,|[\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]+)|(;)/dgv
        },
        {
          match: /\b(?:and|assert|asr|land|lazy|lsr|lxor|mod|new|or)\b/dgv,
          name: "variable.other.class.js message.error variable.interpolation string.regexp"
        }
      ]
    },
    termPun: {
      applyEndPatternLast: true,
      begin: /(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])\?|~(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
      beginCaptures: {
        "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
      },
      end: /:|(?=[^\:\p{space}])/dgv,
      endCaptures: {
        "0": { name: "keyword" }
      },
      patterns: [
        {
          begin: /(?<=[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]\?|^\?|[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]~|^~)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
          endCaptures: {
            "0": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename" }
          }
        }
      ]
    },
    termTry: {
      begin: /\btry\b/dgv,
      captures: {
        "0": { name: "keyword.control" }
      },
      end: /\bwith\b/dgv,
      patterns: [
        { include: "#term" }
      ]
    },
    termWhile: {
      patterns: [
        {
          begin: /\bwhile\b/dgv,
          beginCaptures: {
            "0": { name: "keyword.control" }
          },
          end: /\bdone\b/dgv,
          endCaptures: {
            "0": { name: "keyword.control" }
          },
          patterns: [
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)while)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /\bdo\b/dgv,
              endCaptures: {
                "0": { name: "keyword.control" }
              },
              patterns: [
                { include: "#term" }
              ]
            },
            {
              begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)do)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
              end: /(?=\bdone\b)/dgv,
              patterns: [
                { include: "#term" }
              ]
            }
          ]
        }
      ]
    },
    type: {
      patterns: [
        { include: "#comment" },
        {
          match: /\bnonrec\b/dgv,
          name: "variable.other.class.js message.error variable.interpolation string.regexp"
        },
        { include: "#pathModulePrefixExtended" },
        { include: "#typeLabel" },
        { include: "#typeObject" },
        { include: "#typeOperator" },
        { include: "#typeParens" },
        { include: "#typePolymorphicVariant" },
        { include: "#typeRecord" },
        { include: "#typeConstructor" }
      ]
    },
    typeConstructor: {
      patterns: [
        {
          begin: /(_)|((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)|(')((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)|(?<=[^\*]\)|\])/dgv,
          beginCaptures: {
            "1": { name: "comment constant.regexp meta.separator.markdown" },
            "3": { name: "string.other.link variable.language variable.parameter emphasis strong emphasis" },
            "4": { name: "keyword.control emphasis" }
          },
          end: /(?=\((?!\*)|[\]\)-\.\:\;\=\>\[\{\|\}])|((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)[\:aceps]*(?!\(\*|[\p{Alpha}\p{M}\p{Nd}\p{Pc}])|(?=;;|[\]\)\}]|\b(?:end|and|class|exception|external|in|include|inherit|initializer|let|method|module|open|type|val)\b)/dgv,
          endCaptures: {
            "1": { name: "entity.name.function strong" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#pathModulePrefixExtended" }
          ]
        }
      ]
    },
    typeLabel: {
      patterns: [
        {
          begin: /(\??)((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)\p{space}*((?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]):(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))/dgv,
          captures: {
            "1": { name: "keyword strong emphasis" },
            "2": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename emphasis" },
            "3": { name: "keyword" }
          },
          end: /(?=(?<![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])->(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]))/dgv,
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    typeModule: {
      begin: /\bmodule\b/dgv,
      beginCaptures: {
        "0": { name: "markup.inserted constant.language support.constant.property-value entity.name.filename" }
      },
      end: /(?=\))/dgv,
      patterns: [
        { include: "#pathModuleExtended" },
        { include: "#signatureConstraints" }
      ]
    },
    typeObject: {
      begin: /</dgv,
      captures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong strong" }
      },
      end: />/dgv,
      patterns: [
        {
          begin: /(?<=[\;\<])/dgv,
          end: /(:)|(?=>)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "4": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#pathModulePrefixSimple" },
            {
              match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "markup.inserted constant.language support.constant.property-value entity.name.filename emphasis"
            }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(;)|(?=>)/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    typeOperator: {
      patterns: [
        {
          match: /[\,\;]|[\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]+/dgv,
          name: "variable.other.class.js message.error variable.interpolation string.regexp strong"
        }
      ]
    },
    typeParens: {
      begin: /\(/dgv,
      captures: {
        "0": { name: "punctuation.definition.tag" }
      },
      end: /\)/dgv,
      patterns: [
        {
          match: /,/dgv,
          name: "variable.other.class.js message.error variable.interpolation string.regexp"
        },
        { include: "#typeModule" },
        { include: "#type" }
      ]
    },
    typePolymorphicVariant: {
      begin: /\[/dgv,
      end: /\]/dgv,
      patterns: []
    },
    typeRecord: {
      begin: /\{/dgv,
      captures: {
        "0": { name: "constant.language constant.numeric entity.other.attribute-name.id.css strong strong" }
      },
      end: /\}/dgv,
      patterns: [
        {
          begin: /(?<=[\;\{])/dgv,
          end: /(:)|(=)|(;)|(with)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" },
            "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "4": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            { include: "#comment" },
            { include: "#pathModulePrefixSimple" },
            {
              match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "markup.inserted constant.language support.constant.property-value entity.name.filename emphasis"
            }
          ]
        },
        {
          begin: /(?<=(?:[^\p{Alpha}\p{M}\p{Nd}\p{Pc}]|^)with)(?![\p{Alpha}\p{M}\p{Nd}\p{Pc}])/dgv,
          end: /(:)|(=)|(;)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp strong" },
            "2": { name: "support.type strong" },
            "3": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            {
              match: /(?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv,
              name: "markup.inserted constant.language support.constant.property-value entity.name.filename emphasis"
            }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^):)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /(;)|(=)|(?=\})/dgv,
          endCaptures: {
            "1": { name: "variable.other.class.js message.error variable.interpolation string.regexp" },
            "2": { name: "support.type strong" }
          },
          patterns: [
            { include: "#type" }
          ]
        },
        {
          begin: /(?<=(?:[^\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~]|^)=)(?![\-\!\#-\&\*\+\.\/\:\<-\@\^\|\~])/dgv,
          end: /;|(?=\})/dgv,
          endCaptures: {
            "0": { name: "variable.other.class.js message.error variable.interpolation string.regexp" }
          },
          patterns: [
            { include: "#type" }
          ]
        }
      ]
    },
    variableModule: {
      captures: {
        "0": { name: "string.other.link variable.language variable.parameter emphasis" }
      },
      match: /\b(?=\p{Upper})[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*/dgv
    },
    variablePattern: {
      captures: {
        "1": { name: "comment constant.regexp meta.separator.markdown" },
        "2": { name: "string.other.link variable.language variable.parameter emphasis" }
      },
      match: /\b(_)\b|((?!\b(?:and|'|asr??|assert|\*|begin|class|[\,\:\@]|constraint|do|done|downto|else|end|=|exception|external|false|for|\.|fun|function|functor|[\-\>]|if|in|include|inherit|initializer|land|lazy|[\(\<\[\{]|let|lor|lsl|lsr|lxor|match|method|mod|module|mutable|new|nonrec|#|object|of|open|or|[\%\+]|private|["\?]|rec|[\]\)\;\\\}]|sig|\/|struct|then|~|to|true|try|type|val|\||virtual|when|while|with)\b(?:[^']|(?=\n?$)))\b(?=[_\p{Lower}])[_\p{Alpha}]['\p{Alpha}\p{M}\p{Nd}\p{Pc}]*)/dgv
    }
  },
  dependencies: []
};
