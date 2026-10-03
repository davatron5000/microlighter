import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "razor",
  displayName: "ASP.NET Razor",
  scopeName: "text.aspnetcorerazor",
  patterns: [
    { include: "#razor-control-structures" },
    { include: "text.html.basic" }
  ],
  repository: {
    "addTagHelper-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.addTagHelper" },
        "3": {
          patterns: [
            { include: "#tagHelper-directive-argument" }
          ]
        }
      },
      match: /(@)(addTagHelper)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "attribute-directive": {
      begin: /(@)(attribute)\b\p{space}+/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.attribute" }
      },
      end: /(?<=\])|(?=\n?$)/dgv,
      name: "meta.directive",
      patterns: [
        { include: "source.cs#attribute-section" }
      ]
    },
    "await-prefix": {
      match: /(await)\p{space}+/dgv,
      name: "keyword.other.await.cs"
    },
    "balanced-brackets-csharp": {
      begin: /(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.squarebracket.open.cs" }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": { name: "punctuation.squarebracket.close.cs" }
      },
      name: "razor.test.balanced.brackets",
      patterns: [
        { include: "source.cs" }
      ]
    },
    "balanced-parenthesis-csharp": {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.parenthesis.open.cs" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parenthesis.close.cs" }
      },
      name: "razor.test.balanced.parenthesis",
      patterns: [
        { include: "source.cs" }
      ]
    },
    "catch-clause": {
      begin: /(?:^|(?<=\}))\p{space}*(catch)\b\p{space}*?(?=[\n\(\{])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.try.catch.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.catch.razor",
      patterns: [
        { include: "#catch-condition" },
        { include: "source.cs#when-clause" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "catch-condition": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.open.cs" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.cs" }
      },
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "source.cs#type" }
              ]
            },
            "6": { name: "entity.name.variable.local.cs" }
          },
          match: new EmulatedRegExp("(?<$0_type_name>(?:(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<$1_name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<$2_type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*|(?<tuple>\\p{space}*\\((?:[^\\(\\)]|(?:\\p{space}*\\((?:[^\\(\\)]|(?:\\p{space}*\\((?:[^\\(\\)]|(?:\\p{space}*\\((?:[^\\(\\)]|(?:\\p{space}*\\((?:[^\\(\\)]|(?:))+\\)))+\\)))+\\)))+\\)))+\\)))(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*)\\p{space}*(?:((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))\\b)?", "dgv", { hiddenCaptures: [4, 6, 7, 8, 11], transfers: [[2, [4, 7, 11]], [3, [6]], [5, [8]]] })
        }
      ]
    },
    "code-directive": {
      begin: /(@)(code)((?=\{)|\p{space}+)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.code" }
      },
      end: /(?<=\})|\p{space}/dgv,
      patterns: [
        { include: "#directive-codeblock" }
      ]
    },
    "csharp-code-block": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.curlybrace.open.cs" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.curlybrace.close.cs" }
      },
      name: "meta.structure.razor.csharp.codeblock",
      patterns: [
        { include: "#razor-codeblock-body" }
      ]
    },
    "csharp-condition": {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.parenthesis.open.cs" }
      },
      end: /(\))/dgv,
      endCaptures: {
        "1": { name: "punctuation.parenthesis.close.cs" }
      },
      patterns: [
        { include: "source.cs#local-variable-declaration" },
        { include: "source.cs#expression" },
        { include: "source.cs#punctuation-comma" },
        { include: "source.cs#punctuation-semicolon" }
      ]
    },
    "directive-codeblock": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.razor.directive.codeblock.open" }
      },
      contentName: "source.cs",
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "keyword.control.razor.directive.codeblock.close" }
      },
      name: "meta.structure.razor.directive.codeblock",
      patterns: [
        { include: "source.cs#class-or-struct-members" }
      ]
    },
    "directive-markupblock": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.razor.directive.codeblock.open" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "keyword.control.razor.directive.codeblock.close" }
      },
      name: "meta.structure.razor.directive.markblock",
      patterns: [
        { include: "$self" }
      ]
    },
    directives: {
      patterns: [
        { include: "#code-directive" },
        { include: "#functions-directive" },
        { include: "#page-directive" },
        { include: "#addTagHelper-directive" },
        { include: "#removeTagHelper-directive" },
        { include: "#tagHelperPrefix-directive" },
        { include: "#model-directive" },
        { include: "#inherits-directive" },
        { include: "#implements-directive" },
        { include: "#namespace-directive" },
        { include: "#inject-directive" },
        { include: "#attribute-directive" },
        { include: "#section-directive" },
        { include: "#layout-directive" },
        { include: "#using-directive" },
        { include: "#rendermode-directive" },
        { include: "#preservewhitespace-directive" },
        { include: "#typeparam-directive" }
      ]
    },
    "do-statement": {
      begin: /(@)(do)\b\p{space}/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.loop.do.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.do.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "do-statement-with-optional-transition": {
      begin: /(?:^\p{space}*|(@))(do)\b\p{space}/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.loop.do.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.do.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "else-part": {
      begin: /(?:^|(?<=\}))\p{space}*(else)\b\p{space}*?(?: (if))?\p{space}*?(?=[\n\(\{])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.conditional.else.cs" },
        "2": { name: "keyword.control.conditional.if.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.else.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "escaped-transition": {
      match: /@@/dgv,
      name: "constant.character.escape.razor.transition"
    },
    "explicit-razor-expression": {
      begin: /(@)\(/dgv,
      beginCaptures: {
        "0": { name: "keyword.control.cshtml" },
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "keyword.control.cshtml" }
      },
      name: "meta.expression.explicit.cshtml",
      patterns: [
        { include: "source.cs#expression" }
      ]
    },
    "finally-clause": {
      begin: /(?:^|(?<=\}))\p{space}*(finally)\b\p{space}*?(?=[\n\{])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.try.finally.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.finally.razor",
      patterns: [
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "for-statement": {
      begin: /(@)(for)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.loop.for.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.for.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "for-statement-with-optional-transition": {
      begin: /(?:^\p{space}*|(@))(for)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.loop.for.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.for.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "foreach-condition": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.parenthesis.open.cs" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.parenthesis.close.cs" }
      },
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.var.cs" },
            "2": {
              patterns: [
                { include: "source.cs#type" }
              ]
            },
            "7": { name: "entity.name.variable.local.cs" },
            "8": { name: "keyword.control.loop.in.cs" }
          },
          match: new EmulatedRegExp("(?:\\b(var)\\b|(?<$0_type_name>(?:(?:(?<identifier>@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*::\\p{space}*)?(?<$1_name_and_type_args>(@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(?<$2_type_args>\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?)(?:\\p{space}*\\.\\p{space}*((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*)\\p{space}*(\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:\\p{space}*<(?:[^\\<\\>]|(?:))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*))+>\\p{space}*)?))*|(?<tuple>\\p{space}*\\((?:[^\\(\\)]|(?:\\p{space}*\\((?:[^\\(\\)]|(?:\\p{space}*\\((?:[^\\(\\)]|(?:\\p{space}*\\((?:[^\\(\\)]|(?:\\p{space}*\\((?:[^\\(\\)]|(?:))+\\)))+\\)))+\\)))+\\)))+\\)))(?:\\p{space}*\\?\\p{space}*)?(?:\\p{space}*\\[(?:\\p{space}*,\\p{space}*)*\\]\\p{space}*)*))\\p{space}+((@?[_\\p{Alpha}][_\\p{Alpha}\\p{Nd}]*))\\p{space}+\\b(in)\\b", "dgv", { hiddenCaptures: [5, 7, 8, 9, 12], transfers: [[3, [5, 8, 12]], [4, [7]], [6, [9]]] })
        },
        {
          captures: {
            "1": { name: "keyword.other.var.cs" },
            "2": {
              patterns: [
                { include: "source.cs#tuple-declaration-deconstruction-element-list" }
              ]
            },
            "3": { name: "keyword.control.loop.in.cs" }
          },
          match: /(?:\b(var)\b\p{space}*)?(?<tuple>\((?:[^\(\)]|(?:\((?:[^\(\)]|(?:\((?:[^\(\)]|(?:\((?:[^\(\)]|(?:\((?:[^\(\)]|(?:))+\)))+\)))+\)))+\)))+\))\p{space}+\b(in)\b/dgv
        },
        { include: "source.cs#expression" }
      ]
    },
    "foreach-statement": {
      begin: /(@)(await\p{space}+)?(foreach)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": {
          patterns: [
            { include: "#await-prefix" }
          ]
        },
        "3": { name: "keyword.control.loop.foreach.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.foreach.razor",
      patterns: [
        { include: "#foreach-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "foreach-statement-with-optional-transition": {
      begin: /(?:^\p{space}*|(@)(await\p{space}+)?)(foreach)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": {
          patterns: [
            { include: "#await-prefix" }
          ]
        },
        "3": { name: "keyword.control.loop.foreach.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.foreach.razor",
      patterns: [
        { include: "#foreach-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "functions-directive": {
      begin: /(@)(functions)((?=\{)|\p{space}+)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.functions" }
      },
      end: /(?<=\})|\p{space}/dgv,
      patterns: [
        { include: "#directive-codeblock" }
      ]
    },
    "if-statement": {
      begin: /(@)(if)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.conditional.if.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.if.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "if-statement-with-optional-transition": {
      begin: /(?:^\p{space}*|(@))(if)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.conditional.if.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.if.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "implements-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.implements" },
        "3": {
          patterns: [
            { include: "source.cs#type" }
          ]
        }
      },
      match: /(@)(implements)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "implicit-expression": {
      begin: /(?<![\p{Alpha}\p{Alpha}\p{Nd}])(@)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        }
      },
      contentName: "source.cs",
      end: /(?=[\]"'\)\<\>\{\}\p{space}])/dgv,
      name: "meta.expression.implicit.cshtml",
      patterns: [
        { include: "#await-prefix" },
        { include: "#implicit-expression-body" }
      ]
    },
    "implicit-expression-accessor": {
      match: /(?<=\.)[_\p{Alpha}][_\p{Alpha}\p{Nd}]*/dgv,
      name: "variable.other.object.property.cs"
    },
    "implicit-expression-accessor-start": {
      begin: /([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)/dgv,
      beginCaptures: {
        "1": { name: "variable.other.object.cs" }
      },
      end: /(?=[\]"'\)\<\>\{\}\p{space}])/dgv,
      patterns: [
        { include: "#implicit-expression-continuation" }
      ]
    },
    "implicit-expression-body": {
      end: /(?=[\]"'\)\<\>\{\}\p{space}])/dgv,
      patterns: [
        { include: "#implicit-expression-invocation-start" },
        { include: "#implicit-expression-accessor-start" }
      ]
    },
    "implicit-expression-continuation": {
      end: /(?=[\]"'\)\<\>\{\}\p{space}])/dgv,
      patterns: [
        { include: "#balanced-parenthesis-csharp" },
        { include: "#balanced-brackets-csharp" },
        { include: "#implicit-expression-invocation" },
        { include: "#implicit-expression-accessor" },
        { include: "#implicit-expression-extension" }
      ]
    },
    "implicit-expression-dot-operator": {
      captures: {
        "1": { name: "punctuation.accessor.cs" }
      },
      match: /(\.)(?=[_\p{Alpha}][_\p{Alpha}\p{Nd}]*)/dgv
    },
    "implicit-expression-invocation": {
      match: /(?<=\.)[_\p{Alpha}][_\p{Alpha}\p{Nd}]*(?=\()/dgv,
      name: "entity.name.function.cs"
    },
    "implicit-expression-invocation-start": {
      begin: /([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)(?=\()/dgv,
      beginCaptures: {
        "1": { name: "entity.name.function.cs" }
      },
      end: /(?=[\]"'\)\<\>\{\}\p{space}])/dgv,
      patterns: [
        { include: "#implicit-expression-continuation" }
      ]
    },
    "implicit-expression-null-conditional-operator": {
      captures: {
        "1": { name: "keyword.operator.null-conditional.cs" }
      },
      match: /(\?)(?=[\.\[])/dgv
    },
    "implicit-expression-null-forgiveness-operator": {
      captures: {
        "1": { name: "keyword.operator.logical.cs" }
      },
      match: /(!)(?=\.[_\p{Alpha}][_\p{Alpha}\p{Nd}]*|[\(\?\[])/dgv
    },
    "implicit-expression-operator": {
      patterns: [
        { include: "#implicit-expression-dot-operator" },
        { include: "#implicit-expression-null-conditional-operator" },
        { include: "#implicit-expression-null-forgiveness-operator" }
      ]
    },
    "inherits-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.inherits" },
        "3": {
          patterns: [
            { include: "source.cs#type" }
          ]
        }
      },
      match: /(@)(inherits)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "inject-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.inject" },
        "3": {
          patterns: [
            { include: "source.cs#type" }
          ]
        },
        "4": { name: "entity.name.variable.property.cs" }
      },
      match: /(@)(inject)\p{space}*([\P{space}\p{space}]+?)?\p{space}*([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)?\p{space}*(?=(?=\n?$))/dgv,
      name: "meta.directive"
    },
    "inline-template": {
      patterns: [
        { include: "#inline-template-void-tag" },
        { include: "#inline-template-non-void-tag" }
      ]
    },
    "inline-template-non-void-tag": {
      begin: /(@)(<)(!)?([^\/\>\p{space}]+)(?=\p{space}|\/?>)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "punctuation.definition.tag.begin.html" },
        "3": { name: "constant.character.escape.razor.tagHelperOptOut" },
        "4": { name: "entity.name.tag.html" }
      },
      end: /(<\/)(4)\p{space}*(>)|(\/>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html" },
        "2": { name: "entity.name.tag.html" },
        "3": { name: "punctuation.definition.tag.end.html" },
        "4": { name: "punctuation.definition.tag.end.html" }
      },
      patterns: [
        {
          begin: /(?<=>)(?!(?=\n?$))/dgv,
          end: /(?=<\/)/dgv,
          patterns: [
            { include: "#inline-template" },
            { include: "#wellformed-html" },
            { include: "#razor-control-structures" }
          ]
        },
        { include: "#razor-control-structures" },
        { include: "text.html.basic#attribute" }
      ]
    },
    "inline-template-void-tag": {
      begin: /(@)(<)(!)?(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)(?=\p{space}|\/?>)/dgiv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "punctuation.definition.tag.begin.html" },
        "3": { name: "constant.character.escape.razor.tagHelperOptOut" },
        "4": { name: "entity.name.tag.html" }
      },
      end: /\/?>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.html" }
      },
      name: "meta.tag.structure.$4.void.html",
      patterns: [
        { include: "#razor-control-structures" },
        { include: "text.html.basic#attribute" }
      ]
    },
    "layout-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.layout" },
        "3": {
          patterns: [
            { include: "source.cs#type" }
          ]
        }
      },
      match: /(@)(layout)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "lock-statement": {
      begin: /(@)(lock)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.other.lock.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.lock.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "lock-statement-with-optional-transition": {
      begin: /(?:^\p{space}*|(@))(lock)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.other.lock.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.lock.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "model-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.model" },
        "3": {
          patterns: [
            { include: "source.cs#type" }
          ]
        }
      },
      match: /(@)(model)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "namespace-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.namespace" },
        "3": {
          patterns: [
            { include: "#namespace-directive-argument" }
          ]
        }
      },
      match: /(@)(namespace)\p{space}+(\P{space}+)?/dgv,
      name: "meta.directive"
    },
    "namespace-directive-argument": {
      captures: {
        "1": { name: "entity.name.type.namespace.cs" },
        "2": { name: "punctuation.accessor.cs" }
      },
      match: /([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)(\.)?/dgv
    },
    "non-void-tag": {
      begin: /(?=<(!)?([^\/\>\p{space}]+)(\p{space}|\/?>))/dgv,
      end: /(<\/)(2)\p{space}*(>)|(\/>)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html" },
        "2": { name: "entity.name.tag.html" },
        "3": { name: "punctuation.definition.tag.end.html" },
        "4": { name: "punctuation.definition.tag.end.html" }
      },
      patterns: [
        {
          begin: /(<)(!)?([^\/\>\p{space}]+)(?=\p{space}|\/?>)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.html" },
            "2": { name: "constant.character.escape.razor.tagHelperOptOut" },
            "3": { name: "entity.name.tag.html" }
          },
          end: /(?=\/?>)/dgv,
          patterns: [
            { include: "#razor-control-structures" },
            { include: "text.html.basic#attribute" }
          ]
        },
        {
          begin: />/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.tag.end.html" }
          },
          end: /(?=<\/)/dgv,
          patterns: [
            { include: "#wellformed-html" },
            { include: "$self" }
          ]
        }
      ]
    },
    "optionally-transitioned-csharp-control-structures": {
      patterns: [
        { include: "#using-statement-with-optional-transition" },
        { include: "#if-statement-with-optional-transition" },
        { include: "#else-part" },
        { include: "#foreach-statement-with-optional-transition" },
        { include: "#for-statement-with-optional-transition" },
        { include: "#while-statement" },
        { include: "#switch-statement-with-optional-transition" },
        { include: "#lock-statement-with-optional-transition" },
        { include: "#do-statement-with-optional-transition" },
        { include: "#try-statement-with-optional-transition" }
      ]
    },
    "optionally-transitioned-razor-control-structures": {
      patterns: [
        { include: "#razor-comment" },
        { include: "#razor-codeblock" },
        { include: "#explicit-razor-expression" },
        { include: "#escaped-transition" },
        { include: "#directives" },
        { include: "#optionally-transitioned-csharp-control-structures" },
        { include: "#implicit-expression" }
      ]
    },
    "page-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.page" },
        "3": {
          patterns: [
            { include: "source.cs#string-literal" }
          ]
        }
      },
      match: /(@)(page)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "preservewhitespace-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.preservewhitespace" },
        "3": {
          patterns: [
            { include: "source.cs#boolean-literal" }
          ]
        }
      },
      match: /(@)(preservewhitespace)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "razor-codeblock": {
      begin: /(@)(\{)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.codeblock.open" }
      },
      contentName: "source.cs",
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "keyword.control.razor.directive.codeblock.close" }
      },
      name: "meta.structure.razor.codeblock",
      patterns: [
        { include: "#razor-codeblock-body" }
      ]
    },
    "razor-codeblock-body": {
      patterns: [
        { include: "#text-tag" },
        { include: "#inline-template" },
        { include: "#wellformed-html" },
        { include: "#razor-single-line-markup" },
        { include: "#optionally-transitioned-razor-control-structures" },
        { include: "source.cs" }
      ]
    },
    "razor-comment": {
      begin: /(@)(\*)/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.comment.star" }
      },
      contentName: "comment.block.razor",
      end: /(\*)(@)/dgv,
      endCaptures: {
        "1": { name: "keyword.control.razor.comment.star" },
        "2": {
          patterns: [
            { include: "#transition" }
          ]
        }
      },
      name: "meta.comment.razor"
    },
    "razor-control-structures": {
      patterns: [
        { include: "#razor-comment" },
        { include: "#razor-codeblock" },
        { include: "#explicit-razor-expression" },
        { include: "#escaped-transition" },
        { include: "#directives" },
        { include: "#transitioned-csharp-control-structures" },
        { include: "#implicit-expression" }
      ]
    },
    "razor-single-line-markup": {
      captures: {
        "1": { name: "keyword.control.razor.singleLineMarkup" },
        "2": {
          patterns: [
            { include: "#razor-control-structures" },
            { include: "text.html.basic" }
          ]
        }
      },
      match: /(@:)([^\$]*)(?=\n?$)/dgv
    },
    "removeTagHelper-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.removeTagHelper" },
        "3": {
          patterns: [
            { include: "#tagHelper-directive-argument" }
          ]
        }
      },
      match: /(@)(removeTagHelper)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "rendermode-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.rendermode" },
        "3": {
          patterns: [
            { include: "source.cs#type" }
          ]
        }
      },
      match: /(@)(rendermode)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "section-directive": {
      begin: /(@)(section)\b\p{space}+([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)?/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.section" },
        "3": { name: "variable.other.razor.directive.sectionName" }
      },
      end: /(?<=\})/dgv,
      name: "meta.directive.block",
      patterns: [
        { include: "#directive-markupblock" }
      ]
    },
    "switch-code-block": {
      begin: /(\{)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.curlybrace.open.cs" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.curlybrace.close.cs" }
      },
      name: "meta.structure.razor.csharp.codeblock.switch",
      patterns: [
        { include: "source.cs#switch-label" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "switch-statement": {
      begin: /(@)(switch)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.switch.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.switch.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#switch-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "switch-statement-with-optional-transition": {
      begin: /(?:^\p{space}*|(@))(switch)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.switch.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.switch.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#switch-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "tagHelper-directive-argument": {
      patterns: [
        { include: "source.cs#string-literal" },
        { include: "#unquoted-string-argument" }
      ]
    },
    "tagHelperPrefix-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.tagHelperPrefix" },
        "3": {
          patterns: [
            { include: "#tagHelper-directive-argument" }
          ]
        }
      },
      match: /(@)(tagHelperPrefix)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "text-tag": {
      begin: /(<text\p{space}*>)/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.cshtml.transition.textTag.open" }
      },
      end: /(<\/text>)/dgv,
      endCaptures: {
        "1": { name: "keyword.control.cshtml.transition.textTag.close" }
      },
      patterns: [
        { include: "#wellformed-html" },
        { include: "$self" }
      ]
    },
    transition: {
      match: /@/dgv,
      name: "keyword.control.cshtml.transition"
    },
    "transitioned-csharp-control-structures": {
      patterns: [
        { include: "#using-statement" },
        { include: "#if-statement" },
        { include: "#else-part" },
        { include: "#foreach-statement" },
        { include: "#for-statement" },
        { include: "#while-statement" },
        { include: "#switch-statement" },
        { include: "#lock-statement" },
        { include: "#do-statement" },
        { include: "#try-statement" }
      ]
    },
    "try-block": {
      begin: /(@)(try)\b\p{space}*/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.try.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.try.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "try-block-with-optional-transition": {
      begin: /(?:^\p{space}*|(@))(try)\b\p{space}*/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.try.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.try.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "try-statement": {
      patterns: [
        { include: "#try-block" },
        { include: "#catch-clause" },
        { include: "#finally-clause" }
      ]
    },
    "try-statement-with-optional-transition": {
      patterns: [
        { include: "#try-block-with-optional-transition" },
        { include: "#catch-clause" },
        { include: "#finally-clause" }
      ]
    },
    "typeparam-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.razor.directive.typeparam" },
        "3": {
          patterns: [
            { include: "source.cs#type" }
          ]
        }
      },
      match: /(@)(typeparam)\p{space}+([^\$]+)?/dgv,
      name: "meta.directive"
    },
    "unquoted-string-argument": {
      match: /[^\$]+/dgv,
      name: "string.quoted.double.cs"
    },
    "using-alias-directive": {
      captures: {
        "1": { name: "entity.name.type.alias.cs" },
        "2": { name: "keyword.operator.assignment.cs" },
        "3": {
          patterns: [
            { include: "source.cs#type" }
          ]
        }
      },
      match: /([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\b\p{space}*(=)\p{space}*([^\n]+)\p{space}*/dgv
    },
    "using-directive": {
      captures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.other.using.cs" },
        "3": {
          patterns: [
            { include: "#using-static-directive" },
            { include: "#using-alias-directive" },
            { include: "#using-standard-directive" }
          ]
        },
        "4": { name: "keyword.control.razor.optionalSemicolon" }
      },
      match: /(@)(using)\b\p{space}+(?![\(\p{space}])([^\n]+?)?(;)?(?=\n?$)/dgv,
      name: "meta.directive"
    },
    "using-standard-directive": {
      captures: {
        "1": { name: "entity.name.type.namespace.cs" }
      },
      match: /([_\p{Alpha}][_\p{Alpha}\p{Nd}]*)\p{space}*/dgv
    },
    "using-statement": {
      begin: /(@)(using)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.other.using.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.using.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "using-statement-with-optional-transition": {
      begin: /(?:^\p{space}*|(@))(using)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.other.using.cs" }
      },
      end: /(?<=\})|(?<=;)|(?=^\p{space}*\})/dgv,
      name: "meta.statement.using.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    },
    "using-static-directive": {
      captures: {
        "1": { name: "keyword.other.static.cs" },
        "2": {
          patterns: [
            { include: "source.cs#type" }
          ]
        }
      },
      match: /(static)\b\p{space}+([^\n]+)/dgv
    },
    "void-tag": {
      begin: /(<)(!)?(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)(?=\p{space}|\/?>)/dgiv,
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.html" },
        "2": { name: "constant.character.escape.razor.tagHelperOptOut" },
        "3": { name: "entity.name.tag.html" }
      },
      end: /\/?>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.tag.end.html" }
      },
      name: "meta.tag.structure.$3.void.html",
      patterns: [
        { include: "text.html.basic#attribute" }
      ]
    },
    "wellformed-html": {
      patterns: [
        { include: "#void-tag" },
        { include: "#non-void-tag" }
      ]
    },
    "while-statement": {
      begin: /(?:(@)|^\p{space}*|(?<=\})\p{space}*)(while)\b\p{space}*(?=\()/dgv,
      beginCaptures: {
        "1": {
          patterns: [
            { include: "#transition" }
          ]
        },
        "2": { name: "keyword.control.loop.while.cs" }
      },
      end: /(?<=\})|(;)/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.statement.cs" }
      },
      name: "meta.statement.while.razor",
      patterns: [
        { include: "#csharp-condition" },
        { include: "#csharp-code-block" },
        { include: "#razor-codeblock-body" }
      ]
    }
  },
  injections: {
    "source.cs": {
      patterns: [
        { include: "#inline-template" }
      ]
    },
    "string.quoted.double.html": {
      patterns: [
        { include: "#explicit-razor-expression" },
        { include: "#implicit-expression" }
      ]
    },
    "string.quoted.single.html": {
      patterns: [
        { include: "#explicit-razor-expression" },
        { include: "#implicit-expression" }
      ]
    }
  },
  dependencies: [
    "html",
    "csharp"
  ]
};
