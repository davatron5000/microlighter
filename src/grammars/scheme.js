import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "scheme",
  displayName: "Scheme",
  scopeName: "source.scheme",
  patterns: [
    { include: "#comment" },
    { include: "#block-comment" },
    { include: "#sexp" },
    { include: "#string" },
    { include: "#language-functions" },
    { include: "#quote" },
    { include: "#illegal" }
  ],
  repository: {
    "block-comment": {
      begin: /#\|/dgv,
      contentName: "comment",
      end: /\|#/dgv,
      name: "comment",
      patterns: [
        {
          include: "#block-comment",
          name: "comment"
        }
      ]
    },
    comment: {
      begin: /(^[\t ]+)?(?=;)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.scheme" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /;/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.scheme" }
          },
          end: /\n/dgv,
          name: "comment.line.semicolon.scheme"
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /#[ft\|]/dgv,
          name: "constant.language.boolean.scheme"
        },
        {
          match: /(?<=[\(\p{space}])((#[ei])?[0-9]+(\.[0-9]+)?|(#x)\p{AHex}+|(#o)[0-7]+|(#b)[01]+)(?=[\]"'\(\)\,\;\[\p{space}])/dgv,
          name: "constant.numeric.scheme"
        }
      ]
    },
    illegal: {
      match: /[\]\(\)\[]/dgv,
      name: "invalid.illegal.parenthesis.scheme"
    },
    "language-functions": {
      patterns: [
        {
          match: /(?<=([\(\[\p{space}]))(do|or|and|else|quasiquote|begin|if|case|set!|cond|let|unquote|define|let\*|unquote-splicing|delay|letrec)(?=([\(\p{space}]))/dgv,
          name: "keyword.control.scheme"
        },
        {
          match: /(?<=([\(\p{space}]))(char-alphabetic|char-lower-case|char-numeric|char-ready|char-upper-case|char-whitespace|(?:char|string)(?:-ci)?(?:=|<=?|>=?)|atom|boolean|bound-identifier=|char|complex|identifier|integer|symbol|free-identifier=|inexact|eof-object|exact|list|(?:in|out)put-port|pair|real|rational|zero|vector|negative|odd|null|string|eq|equal|eqv|even|number|positive|procedure)(\?)(?=([\(\p{space}]))/dgv,
          name: "support.function.boolean-test.scheme"
        },
        {
          match: /(?<=([\(\p{space}]))(char->integer|exact->inexact|inexact->exact|integer->char|symbol->string|list->vector|list->string|identifier->symbol|vector->list|string->list|string->number|string->symbol|number->string)(?=([\(\p{space}]))/dgv,
          name: "support.function.convert-type.scheme"
        },
        {
          match: /(?<=([\(\p{space}]))(set-c[ad]r|(?:vector|string)-(?:fill|set))(!)(?=([\(\p{space}]))/dgv,
          name: "support.function.with-side-effects.scheme"
        },
        {
          match: /(?<=([\(\p{space}]))(>=?|<=?|[\-\*\+\/\=])(?=([\(\p{space}]))/dgv,
          name: "keyword.operator.arithmetic.scheme"
        },
        {
          match: /(?<=([\(\p{space}]))(append|apply|approximate|call-with-current-continuation|call\/cc|catch|construct-identifier|define-syntax|display|foo|for-each|force|format|cd|gen-counter|gen-loser|generate-identifier|last-pair|length|let-syntax|letrec-syntax|list|list-ref|list-tail|load|log|macro|magnitude|map|map-streams|max|member|memq|memv|min|newline|nil|not|peek-char|rationalize|read|read-char|return|reverse|sequence|substring|syntax|syntax-rules|transcript-off|transcript-on|truncate|unwrap-syntax|values-list|write|write-char|cons|c([ad]){1,4}r|abs|acos|angle|asin|assoc|assq|assv|atan|ceiling|cos|floor|round|sin|sqrt|tan|(?:real|imag)-part|numerator|denominatormodulo|expt??|remainder|quotient|lcm|call-with-(?:in|out)put-file|c(?:lose|urrent)-(?:in|out)put-port|with-(?:in|out)put-from-file|open-(?:in|out)put-file|char-(?:downcase|upcase|ready)|make-(?:polar|promise|rectangular|string|vector)string(?:-(?:append|copy|length|ref))?|vector-(?:length|ref))(?=([\(\p{space}]))/dgv,
          name: "support.function.general.scheme"
        }
      ]
    },
    quote: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.section.quoted.symbol.scheme" }
          },
          match: /(')\p{space}*([\p{Alpha}\p{Nd}][\!\$\%\&\*-\/\:\<-\@\^_\~\p{Alpha}\p{Nd}]*)/dgv,
          name: "constant.other.symbol.scheme"
        },
        {
          captures: {
            "1": { name: "punctuation.section.quoted.empty-list.scheme" },
            "2": { name: "meta.expression.scheme" },
            "3": { name: "punctuation.section.expression.begin.scheme" },
            "4": { name: "punctuation.section.expression.end.scheme" }
          },
          match: /(')\p{space}*((\()\p{space}*(\)))/dgv,
          name: "constant.other.empty-list.schem"
        },
        {
          begin: /(')\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.quoted.scheme" }
          },
          end: /(?=[\(\)\p{space}])|(?<=\n)/dgv,
          name: "string.other.quoted-object.scheme",
          patterns: [
            { include: "#quoted" }
          ]
        }
      ]
    },
    "quote-sexp": {
      begin: /(?<=\()\p{space}*(quote)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.quote.scheme" }
      },
      contentName: "string.other.quote.scheme",
      end: /(?=[\)\p{space}])|(?<=\n)/dgv,
      patterns: [
        { include: "#quoted" }
      ]
    },
    quoted: {
      patterns: [
        { include: "#string" },
        {
          begin: /(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.expression.begin.scheme" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.expression.end.scheme" }
          },
          name: "meta.expression.scheme",
          patterns: [
            { include: "#quoted" }
          ]
        },
        { include: "#quote" },
        { include: "#illegal" }
      ]
    },
    sexp: {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.section.expression.begin.scheme" }
      },
      end: /(\))(\n)?/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.expression.end.scheme" },
        "2": { name: "meta.after-expression.scheme" }
      },
      name: "meta.expression.scheme",
      patterns: [
        { include: "#comment" },
        {
          begin: /(?<=\()(define)\p{space}+(\()([\p{Alpha}\p{Nd}][\!\$\%\&\*-\/\:\<-\@\^_\~\p{Alpha}\p{Nd}]*)((\p{space}+([\p{Alpha}\p{Nd}][\!\$\%\&\*-\/\:\<-\@\^_\~\p{Alpha}\p{Nd}]*|[\._]))*)\p{space}*(\))/dgv,
          captures: {
            "1": { name: "keyword.control.scheme" },
            "2": { name: "punctuation.definition.function.scheme" },
            "3": { name: "entity.name.function.scheme" },
            "4": { name: "variable.parameter.function.scheme" },
            "7": { name: "punctuation.definition.function.scheme" }
          },
          end: /(?=\))/dgv,
          name: "meta.declaration.procedure.scheme",
          patterns: [
            { include: "#comment" },
            { include: "#sexp" },
            { include: "#illegal" }
          ]
        },
        {
          begin: /(?<=\()(lambda)\p{space}+(\()((?:([\p{Alpha}\p{Nd}][\!\$\%\&\*-\/\:\<-\@\^_\~\p{Alpha}\p{Nd}]*|[\._])\p{space}+)*([\p{Alpha}\p{Nd}][\!\$\%\&\*-\/\:\<-\@\^_\~\p{Alpha}\p{Nd}]*|[\._])?)(\))/dgv,
          captures: {
            "1": { name: "keyword.control.scheme" },
            "2": { name: "punctuation.definition.variable.scheme" },
            "3": { name: "variable.parameter.scheme" },
            "6": { name: "punctuation.definition.variable.scheme" }
          },
          end: /(?=\))/dgv,
          name: "meta.declaration.procedure.scheme",
          patterns: [
            { include: "#comment" },
            { include: "#sexp" },
            { include: "#illegal" }
          ]
        },
        {
          begin: /(?<=\()(define)\p{space}([\p{Alpha}\p{Nd}][\!\$\%\&\*-\/\:\<-\@\^_\~\p{Alpha}\p{Nd}]*)\p{space}*[^\n]*?/dgv,
          captures: {
            "1": { name: "keyword.control.scheme" },
            "2": { name: "variable.other.scheme" }
          },
          end: /(?=\))/dgv,
          name: "meta.declaration.variable.scheme",
          patterns: [
            { include: "#comment" },
            { include: "#sexp" },
            { include: "#illegal" }
          ]
        },
        { include: "#quote-sexp" },
        { include: "#quote" },
        { include: "#language-functions" },
        { include: "#string" },
        { include: "#constants" },
        {
          match: /(?<=[\(\p{space}])(#\\)(space|newline|tab)(?=[\)\p{space}])/dgv,
          name: "constant.character.named.scheme"
        },
        {
          match: /(?<=[\(\p{space}])(#\\)x[0-9A-F]{2,4}(?=[\)\p{space}])/dgv,
          name: "constant.character.hex-literal.scheme"
        },
        {
          match: /(?<=[\(\p{space}])(#\\)[^\n](?=[\)\p{space}])/dgv,
          name: "constant.character.escape.scheme"
        },
        {
          match: /(?<=[ \(\)])\.(?=[ \(\)])/dgv,
          name: "punctuation.separator.cons.scheme"
        },
        { include: "#sexp" },
        { include: "#illegal" }
      ]
    },
    string: {
      begin: /(")/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.scheme" }
      },
      end: /(")/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.scheme" }
      },
      name: "string.quoted.double.scheme",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.scheme"
        }
      ]
    }
  },
  dependencies: []
};
