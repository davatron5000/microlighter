import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "powershell",
  displayName: "PowerShell",
  aliases: [
    "ps",
    "ps1",
    "pwsh"
  ],
  scopeName: "source.powershell",
  patterns: [
    {
      begin: /<#/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.comment.block.begin.powershell" }
      },
      end: /#>/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.comment.block.end.powershell" }
      },
      name: "comment.block.powershell",
      patterns: [
        { include: "#commentEmbeddedDocs" }
      ]
    },
    {
      match: /[2-6]>&1|>>?|<<|[\<\>]|>\||[1-6]>|[1-6]>>/dgv,
      name: "keyword.operator.redirection.powershell"
    },
    { include: "#commands" },
    { include: "#commentLine" },
    { include: "#variable" },
    { include: "#subexpression" },
    { include: "#function" },
    { include: "#attribute" },
    { include: "#UsingDirective" },
    { include: "#type" },
    { include: "#hashtable" },
    { include: "#doubleQuotedString" },
    { include: "#scriptblock" },
    { include: "#doubleQuotedStringEscapes" },
    {
      applyEndPatternLast: true,
      begin: /['‘-‛]/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.powershell" }
      },
      end: /['‘-‛]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.powershell" }
      },
      name: "string.quoted.single.powershell",
      patterns: [
        {
          match: /['‘-‛]{2}/dgv,
          name: "constant.character.escape.powershell"
        }
      ]
    },
    {
      begin: /(@["“”„])\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.powershell" }
      },
      end: /^["“”„]@/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.powershell" }
      },
      name: "string.quoted.double.heredoc.powershell",
      patterns: [
        { include: "#variableNoProperty" },
        { include: "#doubleQuotedStringEscapes" },
        { include: "#interpolation" }
      ]
    },
    {
      begin: /(@['‘-‛])\p{space}*(?=\n?$)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.powershell" }
      },
      end: /^['‘-‛]@/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.powershell" }
      },
      name: "string.quoted.single.heredoc.powershell"
    },
    { include: "#numericConstant" },
    {
      begin: /(@)(\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.array.begin.powershell" },
        "2": { name: "punctuation.section.group.begin.powershell" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.group.end.powershell" }
      },
      name: "meta.group.array-expression.powershell",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      begin: /((\$))(\()/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.substatement.powershell" },
        "2": { name: "punctuation.definition.subexpression.powershell" },
        "3": { name: "punctuation.section.group.begin.powershell" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.group.end.powershell" }
      },
      name: "meta.group.complex.subexpression.powershell",
      patterns: [
        { include: "$self" }
      ]
    },
    {
      match: /\b((([\-\.0-9A-Z_a-z]+)\.(?:[Ee][Xx][Ee]|[Cc][Oo][Mm]|[Cc][Mm][Dd]|[Bb][Aa][Tt])))\b/dgv,
      name: "support.function.powershell"
    },
    {
      match: /(?<![\-\.\p{L}\p{M}\p{N}\p{Pc}])((?:begin|break|catch|clean|continue|data|default|define|do|dynamicparam|else|elseif|end|exit|finally|for|from|if|in|inlinescript|parallel|param|process|return|sequence|switch|throw|trap|try|until|var|while)|[\%\?])(?![\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
      name: "keyword.control.powershell"
    },
    {
      match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}]|[^\)]\.)((foreach|where)(?!-object)|[\%\?])(?![\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
      name: "keyword.control.powershell"
    },
    {
      begin: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(--%)(?![\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.powershell" }
      },
      end: /(?=\n?$)/dgv,
      patterns: [
        {
          match: /[^\n]+/dgv,
          name: "string.unquoted.powershell"
        }
      ]
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])((?:hidden|static))(?![\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
      name: "storage.modifier.powershell"
    },
    {
      captures: {
        "1": { name: "storage.type.powershell" },
        "2": { name: "entity.name.function" }
      },
      match: /(?<![\-\p{L}\p{M}\p{N}\p{Pc}])(class|[\%\?])\p{space}+((?:[\-_\p{L}\p{Nd}]?)+)\b/dgiv
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])-(?:is(?:not)?|as)\b/dgiv,
      name: "keyword.operator.comparison.powershell"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])-[ci]?(?:eq|ne|[gl][et]|(?:not)?(?:like|match|contains|in)|replace)(?!\p{L})/dgiv,
      name: "keyword.operator.comparison.powershell"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])-(?:join|split)(?!\p{L})|!/dgiv,
      name: "keyword.operator.unary.powershell"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])-(?:and|or|not|xor)(?!\p{L})|!/dgiv,
      name: "keyword.operator.logical.powershell"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])-(?:band|bor|bnot|bxor|shl|shr)(?!\p{L})/dgiv,
      name: "keyword.operator.bitwise.powershell"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])-f(?!\p{L})/dgiv,
      name: "keyword.operator.string-format.powershell"
    },
    {
      match: /[\-\%\*\+\/]?=|[\-\%\*\+\/]/dgv,
      name: "keyword.operator.assignment.powershell"
    },
    {
      match: /\|{2}|&{2}|;/dgv,
      name: "punctuation.terminator.statement.powershell"
    },
    {
      match: /&|(?<![\p{L}\p{M}\p{N}\p{Pc}])\.(?= )|[\,\`\|]/dgv,
      name: "keyword.operator.other.powershell"
    },
    {
      match: /(?<!\p{space}|^)\.\.(?=-?\p{Nd}|[\$\(])/dgv,
      name: "keyword.operator.range.powershell"
    }
  ],
  repository: {
    RequiresDirective: {
      begin: /(?<=#)(requires)\p{space}/dgiv,
      beginCaptures: {
        "0": { name: "keyword.control.requires.powershell" }
      },
      end: /(?=\n?$)/dgv,
      name: "meta.requires.powershell",
      patterns: [
        {
          match: /-(?:Modules|PSSnapin|RunAsAdministrator|ShellId|Version|Assembly|PSEdition)/dgiv,
          name: "keyword.other.powershell"
        },
        {
          match: /(?<!-)\b\p{L}+|\p{Nd}+(?:\.\p{Nd}+)*/dgv,
          name: "variable.parameter.powershell"
        },
        { include: "#hashtable" }
      ]
    },
    UsingDirective: {
      captures: {
        "1": { name: "keyword.control.using.powershell" },
        "2": { name: "keyword.other.powershell" },
        "3": { name: "variable.parameter.powershell" }
      },
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])(using)\p{space}+(namespace|module)\p{space}+((?:[\p{L}\p{M}\p{N}\p{Pc}]+\.?)+)/dgiv
    },
    attribute: {
      begin: /(\[)\p{space}*\b(cmdletbinding|alias|outputtype|parameter|validatenotnull|validatenotnullorempty|validatecount|validateset|allownull|allowemptycollection|allowemptystring|validatescript|validaterange|validatepattern|validatelength|supportswildcards)\b/dgiv,
      beginCaptures: {
        "1": { name: "punctuation.section.bracket.begin.powershell" },
        "2": { name: "support.function.attribute.powershell" }
      },
      end: /(\])/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.bracket.end.powershell" }
      },
      name: "meta.attribute.powershell",
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.group.begin.powershell" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.group.end.powershell" }
          },
          patterns: [
            { include: "$self" },
            {
              captures: {
                "1": { name: "variable.parameter.attribute.powershell" },
                "2": { name: "keyword.operator.assignment.powershell" }
              },
              match: /\b(mandatory|valuefrompipeline|valuefrompipelinebypropertyname|valuefromremainingarguments|position|parametersetname|defaultparametersetname|supportsshouldprocess|supportspaging|positionalbinding|helpuri|confirmimpact|helpmessage)\b(?:\p{space}+)?(=)?/dgiv
            }
          ]
        }
      ]
    },
    commands: {
      patterns: [
        {
          match: /(?:([\-\:\\_\p{L}\p{Nd}])*\\)?\b(?:Add|Approve|Assert|Backup|Block|Build|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Deploy|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Mount|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Write)-[^\n]+?(?:\.(?:exe|cmd|bat|ps1))?\b/dgiv,
          name: "support.function.powershell"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])foreach-object(?![\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
          name: "support.function.powershell"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])where-object(?![\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
          name: "support.function.powershell"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])sort-object(?![\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
          name: "support.function.powershell"
        },
        {
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])tee-object(?![\p{L}\p{M}\p{N}\p{Pc}])/dgiv,
          name: "support.function.powershell"
        }
      ]
    },
    commentEmbeddedDocs: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.string.documentation.powershell" },
            "2": { name: "keyword.operator.documentation.powershell" }
          },
          match: {
            G: [/(?:^|￿)\p{space}*(\.)(COMPONENT|DESCRIPTION|EXAMPLE|FUNCTIONALITY|INPUTS|LINK|NOTES|OUTPUTS|ROLE|SYNOPSIS)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(\\.)(COMPONENT|DESCRIPTION|EXAMPLE|FUNCTIONALITY|INPUTS|LINK|NOTES|OUTPUTS|ROLE|SYNOPSIS)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          name: "comment.documentation.embedded.powershell"
        },
        {
          captures: {
            "1": { name: "constant.string.documentation.powershell" },
            "2": { name: "keyword.operator.documentation.powershell" },
            "3": { name: "keyword.operator.documentation.powershell" }
          },
          match: {
            G: [/(?:^|￿)\p{space}*(\.)(EXTERNALHELP|FORWARDHELP(?:CATEGORY|TARGETNAME)|PARAMETER|REMOTEHELPRUNSPACE)\p{space}+([^\n]+?)\p{space}*(?=\n?$)/dgiv, new EmulatedRegExp("(?:^|^)\\p{space}*(\\.)(EXTERNALHELP|FORWARDHELP(?:CATEGORY|TARGETNAME)|PARAMETER|REMOTEHELPRUNSPACE)\\p{space}+([^\\n]+?)\\p{space}*(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
          },
          name: "comment.documentation.embedded.powershell"
        }
      ]
    },
    commentLine: {
      begin: /(?<![\-\\\`])(#)#*/dgv,
      captures: {
        "1": { name: "punctuation.definition.comment.powershell" }
      },
      end: /(?=\n?$)\n?/dgv,
      name: "comment.line.powershell",
      patterns: [
        { include: "#commentEmbeddedDocs" },
        { include: "#RequiresDirective" }
      ]
    },
    doubleQuotedString: {
      applyEndPatternLast: true,
      begin: /["“”„]/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.powershell" }
      },
      end: /["“”„]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.powershell" }
      },
      name: "string.quoted.double.powershell",
      patterns: [
        {
          match: /\b[\-\%\+\.0-9A-Z_]+@[\-\.0-9A-Z]+\.[A-Z]{2,64}\b/dgiv
        },
        { include: "#variableNoProperty" },
        { include: "#doubleQuotedStringEscapes" },
        {
          match: /["“”„]{2}/dgv,
          name: "constant.character.escape.powershell"
        },
        { include: "#interpolation" },
        {
          match: /`\p{space}*(?=\n?$)/dgv,
          name: "keyword.other.powershell"
        }
      ]
    },
    doubleQuotedStringEscapes: {
      patterns: [
        {
          match: /`["\$'0\`abefnrtv‘-„]/dgv,
          name: "constant.character.escape.powershell"
        },
        { include: "#unicodeEscape" }
      ]
    },
    function: {
      begin: new EmulatedRegExp("^(?:(?=(\\p{space}*))\\1)(function|filter|configuration|workflow)\\p{space}+(?:(global|local|script|private):)?([\\-\\._\\p{L}\\p{Nd}]+)", "dgiv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "meta.function.powershell" },
        "1": { name: "storage.type.powershell" },
        "2": { name: "storage.modifier.scope.powershell" },
        "3": { name: "entity.name.function.powershell" }
      },
      end: /(?=[\(\{])/dgv,
      patterns: [
        { include: "#commentLine" }
      ]
    },
    hashtable: {
      begin: /(@)(\{)/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.hashtable.begin.powershell" },
        "2": { name: "punctuation.section.braces.begin.powershell" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.braces.end.powershell" }
      },
      name: "meta.hashtable.powershell",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.string.begin.powershell" },
            "2": { name: "variable.other.readwrite.powershell" },
            "3": { name: "punctuation.definition.string.end.powershell" },
            "4": { name: "keyword.operator.assignment.powershell" }
          },
          match: /\b(["']?)([\p{L}\p{M}\p{N}\p{Pc}]+)(["']?)(?:\p{space}+)?(=)(?:\p{space}+)?/dgv,
          name: "meta.hashtable.assignment.powershell"
        },
        { include: "#scriptblock" },
        { include: "$self" }
      ]
    },
    interpolation: {
      begin: /(((\$)))((\())/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.substatement.powershell" },
        "2": { name: "punctuation.definition.substatement.powershell" },
        "3": { name: "punctuation.section.embedded.substatement.begin.powershell" },
        "4": { name: "punctuation.section.group.begin.powershell" },
        "5": { name: "punctuation.section.embedded.substatement.begin.powershell" }
      },
      contentName: "interpolated.complex.source.powershell",
      end: /(\))/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.group.end.powershell" },
        "1": { name: "punctuation.section.embedded.substatement.end.powershell" }
      },
      name: "meta.embedded.substatement.powershell",
      patterns: [
        { include: "$self" }
      ]
    },
    numericConstant: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.numeric.hex.powershell" },
            "2": { name: "keyword.other.powershell" }
          },
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?0[Xx][_\p{AHex}]+(?:[LUlu]|UL|Ul|uL|ul|LU|Lu|lU|lu)?)((?:[GgKKkMmPpTt][Bb])?)\b/dgv
        },
        {
          captures: {
            "1": { name: "constant.numeric.integer.powershell" },
            "2": { name: "keyword.other.powershell" }
          },
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?(?:[0-9_]+)?\.[0-9_]+(?:[Ee][0-9]+)?[DFMdfm]?)((?:[GgKKkMmPpTt][Bb])?)\b/dgv
        },
        {
          captures: {
            "1": { name: "constant.numeric.octal.powershell" },
            "2": { name: "keyword.other.powershell" }
          },
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?0[Bb][01_]+(?:[LUlu]|UL|Ul|uL|ul|LU|Lu|lU|lu)?)((?:[GgKKkMmPpTt][Bb])?)\b/dgv
        },
        {
          captures: {
            "1": { name: "constant.numeric.integer.powershell" },
            "2": { name: "keyword.other.powershell" }
          },
          match: new EmulatedRegExp("(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])([\\-\\+]?[0-9_]+[Ee](?:(?=([0-9_]?))\\2)[DFMdfm]?)((?:[GgKKkMmPpTt][Bb])?)\\b", "dgv", { hiddenCaptures: [2] })
        },
        {
          captures: {
            "1": { name: "constant.numeric.integer.powershell" },
            "2": { name: "keyword.other.powershell" }
          },
          match: new EmulatedRegExp("(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])([\\-\\+]?[0-9_]+\\.[Ee](?:(?=([0-9_]?))\\2)[DFMdfm]?)((?:[GgKKkMmPpTt][Bb])?)\\b", "dgv", { hiddenCaptures: [2] })
        },
        {
          captures: {
            "1": { name: "constant.numeric.integer.powershell" },
            "2": { name: "keyword.other.powershell" }
          },
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?[0-9_]+\.?[DFMdfm])((?:[GgKKkMmPpTt][Bb])?)\b/dgv
        },
        {
          captures: {
            "1": { name: "constant.numeric.integer.powershell" },
            "2": { name: "keyword.other.powershell" }
          },
          match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])([\-\+]?[0-9_]+\.?(?:[LUlu]|UL|Ul|uL|ul|LU|Lu|lU|lu)?)((?:[GgKKkMmPpTt][Bb])?)\b/dgv
        }
      ]
    },
    scriptblock: {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.braces.begin.powershell" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.braces.end.powershell" }
      },
      name: "meta.scriptblock.powershell",
      patterns: [
        { include: "$self" }
      ]
    },
    subexpression: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.group.begin.powershell" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.group.end.powershell" }
      },
      name: "meta.group.simple.subexpression.powershell",
      patterns: [
        { include: "$self" }
      ]
    },
    type: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.bracket.begin.powershell" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.bracket.end.powershell" }
      },
      patterns: [
        {
          match: /(?!\p{Nd}+|\.)[\.\p{L}\p{N}]+/dgv,
          name: "storage.type.powershell"
        },
        { include: "$self" }
      ]
    },
    unicodeEscape: {
      patterns: [
        {
          match: new EmulatedRegExp("`u\\{(?:(?:10)?(\\p{AHex}){1,4}|0?(\\p{AHex}){1,5})\\}", "dgv", { hiddenCaptures: [2], transfers: [[1, [2]]] }),
          name: "constant.character.escape.powershell"
        },
        {
          match: /`u(?:\{\p{AHex}{0,6}[^\n])?/dgv,
          name: "invalid.character.escape.powershell"
        }
      ]
    },
    variable: {
      patterns: [
        {
          captures: {
            "0": { name: "constant.language.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" }
          },
          match: /(\$)(False|Null|True)\b/dgiv
        },
        {
          captures: {
            "0": { name: "variable.other.constant.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "3": { name: "variable.other.member.powershell" }
          },
          match: /(\$)(Error|ExecutionContext|Host|Home|PID|PsHome|PsVersionTable|ShellID)((?:\.[_\p{L}\p{Nd}]+)*\b)?\b/dgiv
        },
        {
          captures: {
            "0": { name: "support.variable.automatic.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "3": { name: "variable.other.member.powershell" }
          },
          match: /(\$)([\$\?\^]|(?:_|Args|ConsoleFileName|Event|EventArgs|EventSubscriber|ForEach|Input|LastExitCode|Matches|MyInvocation|NestedPromptLevel|Profile|PSBoundParameters|PsCmdlet|PsCulture|PSDebugContext|PSItem|PSCommandPath|PSScriptRoot|PsUICulture|Pwd|Sender|SourceArgs|SourceEventArgs|StackTrace|Switch|This)\b)((?:\.[_\p{L}\p{Nd}]+)*\b)?/dgiv
        },
        {
          captures: {
            "0": { name: "variable.language.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "3": { name: "variable.other.member.powershell" }
          },
          match: /(\$)(ConfirmPreference|DebugPreference|ErrorActionPreference|ErrorView|FormatEnumerationLimit|InformationPreference|LogCommandHealthEvent|LogCommandLifecycleEvent|LogEngineHealthEvent|LogEngineLifecycleEvent|LogProviderHealthEvent|LogProviderLifecycleEvent|MaximumAliasCount|MaximumDriveCount|MaximumErrorCount|MaximumFunctionCount|MaximumHistoryCount|MaximumVariableCount|OFS|OutputEncoding|PSCulture|PSDebugContext|PSDefaultParameterValues|PSEmailServer|PSItem|PSModuleAutoLoadingPreference|PSModuleAutoloadingPreference|PSSenderInfo|PSSessionApplicationName|PSSessionConfigurationName|PSSessionOption|ProgressPreference|VerbosePreference|WarningPreference|WhatIfPreference)((?:\.[_\p{L}\p{Nd}]+)*\b)?\b/dgiv
        },
        {
          captures: {
            "0": { name: "variable.other.readwrite.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "2": { name: "storage.modifier.scope.powershell" },
            "4": { name: "variable.other.member.powershell" }
          },
          match: /([\$\@])(global|local|private|script|using|workflow):([_\p{L}\p{Nd}]+)((?:\.[_\p{L}\p{Nd}]+)*\b)?/dgiv
        },
        {
          captures: {
            "0": { name: "variable.other.readwrite.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "2": { name: "punctuation.section.braces.begin.powershell" },
            "3": { name: "storage.modifier.scope.powershell" },
            "5": { name: "punctuation.section.braces.end.powershell" },
            "6": { name: "variable.other.member.powershell" }
          },
          match: /(\$)(\{)(global|local|private|script|using|workflow):([^\}]*[^\`\}])(\})((?:\.[_\p{L}\p{Nd}]+)*\b)?/dgiv
        },
        {
          captures: {
            "0": { name: "variable.other.readwrite.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "2": { name: "support.variable.drive.powershell" },
            "4": { name: "variable.other.member.powershell" }
          },
          match: /([\$\@])([_\p{L}\p{Nd}]+:)?([_\p{L}\p{Nd}]+)((?:\.[_\p{L}\p{Nd}]+)*\b)?/dgv
        },
        {
          captures: {
            "0": { name: "variable.other.readwrite.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "2": { name: "punctuation.section.braces.begin.powershell" },
            "3": { name: "support.variable.drive.powershell" },
            "5": { name: "punctuation.section.braces.end.powershell" },
            "6": { name: "variable.other.member.powershell" }
          },
          match: /(\$)(\{)([_\p{L}\p{Nd}]+:)?([^\}]*[^\`\}])(\})((?:\.[_\p{L}\p{Nd}]+)*\b)?/dgv
        }
      ]
    },
    variableNoProperty: {
      patterns: [
        {
          captures: {
            "0": { name: "constant.language.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" }
          },
          match: /(\$)(False|Null|True)\b/dgiv
        },
        {
          captures: {
            "0": { name: "variable.other.constant.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "3": { name: "variable.other.member.powershell" }
          },
          match: /(\$)(Error|ExecutionContext|Host|Home|PID|PsHome|PsVersionTable|ShellID)\b/dgiv
        },
        {
          captures: {
            "0": { name: "support.variable.automatic.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "3": { name: "variable.other.member.powershell" }
          },
          match: /(\$)([\$\?\^]|(?:_|Args|ConsoleFileName|Event|EventArgs|EventSubscriber|ForEach|Input|LastExitCode|Matches|MyInvocation|NestedPromptLevel|Profile|PSBoundParameters|PsCmdlet|PsCulture|PSDebugContext|PSItem|PSCommandPath|PSScriptRoot|PsUICulture|Pwd|Sender|SourceArgs|SourceEventArgs|StackTrace|Switch|This)\b)/dgiv
        },
        {
          captures: {
            "0": { name: "variable.language.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "3": { name: "variable.other.member.powershell" }
          },
          match: /(\$)(ConfirmPreference|DebugPreference|ErrorActionPreference|ErrorView|FormatEnumerationLimit|InformationPreference|LogCommandHealthEvent|LogCommandLifecycleEvent|LogEngineHealthEvent|LogEngineLifecycleEvent|LogProviderHealthEvent|LogProviderLifecycleEvent|MaximumAliasCount|MaximumDriveCount|MaximumErrorCount|MaximumFunctionCount|MaximumHistoryCount|MaximumVariableCount|OFS|OutputEncoding|PSCulture|PSDebugContext|PSDefaultParameterValues|PSEmailServer|PSItem|PSModuleAutoLoadingPreference|PSModuleAutoloadingPreference|PSSenderInfo|PSSessionApplicationName|PSSessionConfigurationName|PSSessionOption|ProgressPreference|VerbosePreference|WarningPreference|WhatIfPreference)\b/dgiv
        },
        {
          captures: {
            "0": { name: "variable.other.readwrite.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "2": { name: "storage.modifier.scope.powershell" },
            "4": { name: "variable.other.member.powershell" }
          },
          match: /(\$)(global|local|private|script|using|workflow):([_\p{L}\p{Nd}]+)/dgiv
        },
        {
          captures: {
            "0": { name: "variable.other.readwrite.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "2": { name: "storage.modifier.scope.powershell" },
            "4": { name: "keyword.other.powershell" },
            "5": { name: "variable.other.member.powershell" }
          },
          match: /(\$)(\{)(global|local|private|script|using|workflow):([^\}]*[^\`\}])(\})/dgiv
        },
        {
          captures: {
            "0": { name: "variable.other.readwrite.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "2": { name: "support.variable.drive.powershell" },
            "4": { name: "variable.other.member.powershell" }
          },
          match: /(\$)([_\p{L}\p{Nd}]+:)?([_\p{L}\p{Nd}]+)/dgv
        },
        {
          captures: {
            "0": { name: "variable.other.readwrite.powershell" },
            "1": { name: "punctuation.definition.variable.powershell" },
            "2": { name: "punctuation.section.braces.begin" },
            "3": { name: "support.variable.drive.powershell" },
            "5": { name: "punctuation.section.braces.end" }
          },
          match: /(\$)(\{)([_\p{L}\p{Nd}]+:)?([^\}]*[^\`\}])(\})/dgv
        }
      ]
    }
  },
  dependencies: []
};
