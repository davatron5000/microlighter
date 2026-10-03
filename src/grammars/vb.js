import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "vb",
  displayName: "Visual Basic",
  scopeName: "source.asp.vb.net",
  patterns: [
    {
      match: /\n/dgv,
      name: "meta.ending-space"
    },
    { include: "#round-brackets" },
    {
      begin: /^(?=\t)/dgv,
      end: /(?=[^\t])/dgv,
      name: "meta.leading-space",
      patterns: [
        {
          captures: {
            "1": { name: "meta.odd-tab.tabs" },
            "2": { name: "meta.even-tab.tabs" }
          },
          match: /(\t)(\t)?/dgv
        }
      ]
    },
    {
      begin: /^(?= )/dgv,
      end: /(?=[^ ])/dgv,
      name: "meta.leading-space",
      patterns: [
        {
          captures: {
            "1": { name: "meta.odd-tab.spaces" },
            "2": { name: "meta.even-tab.spaces" }
          },
          match: /(  )(  )?/dgv
        }
      ]
    },
    {
      captures: {
        "1": { name: "storage.type.function.asp" },
        "2": { name: "entity.name.function.asp" },
        "3": { name: "punctuation.definition.parameters.asp" },
        "4": { name: "variable.parameter.function.asp" },
        "5": { name: "punctuation.definition.parameters.asp" }
      },
      match: /^\p{space}*((?:[Ff][Uu][Nn][Cc][Tt][Ii][Oo][Nn]|[Ssſ][Uu][Bb]))\p{space}*([A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*)\p{space}*(\()([^\)]*)(\))[^\n]*\n?/dgv,
      name: "meta.function.asp"
    },
    {
      begin: /(^[\t ]+)?(?=')/dgv,
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.asp" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        {
          begin: /'/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.asp" }
          },
          end: /\n/dgv,
          name: "comment.line.apostrophe.asp"
        }
      ]
    },
    {
      match: /\b(If|Then|Else|ElseIf|Else If|End If|While|Wend|For|To|Each|Case|Select|End Select|Return|Continue|Do|Until|Loop|Next|With|Exit Do|Exit For|Exit Function|Exit Property|Exit Sub|IIf)\b/dgiv,
      name: "keyword.control.asp"
    },
    {
      match: /\b(Mod|And|Not|Or|Xor|as)\b/dgiv,
      name: "keyword.operator.asp"
    },
    {
      captures: {
        "1": { name: "storage.type.asp" },
        "2": { name: "variable.other.bfeac.asp" },
        "3": { name: "meta.separator.comma.asp" }
      },
      match: /(dim)\p{space}*\b([7A-Z_a-z][0-9A-Z_a-z]*?)\b\p{space}*(,?)/dgiv,
      name: "variable.other.dim.asp"
    },
    {
      match: /\p{space}*\b(Call|Class|Const|Dim|Redim|Function|Sub|Private Sub|Public Sub|End Sub|End Function|End Class|End Property|Public Property|Private Property|Set|Let|Get|New|Randomize|Option Explicit|On Error Resume Next|On Error GoTo)\b\p{space}*/dgiv,
      name: "storage.type.asp"
    },
    {
      match: /\b(Private|Public|Default)\b/dgiv,
      name: "storage.modifier.asp"
    },
    {
      match: /\p{space}*\b(Empty|False|Nothing|Null|True)\b/dgiv,
      name: "constant.language.asp"
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.asp" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.asp" }
      },
      name: "string.quoted.double.asp",
      patterns: [
        {
          match: /""/dgv,
          name: "constant.character.escape.apostrophe.asp"
        }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.definition.variable.asp" }
      },
      match: /(\$)[7A-Z_a-z][0-9A-Z_a-z]*?\b\p{space}*/dgv,
      name: "variable.other.asp"
    },
    {
      match: /\b(Application|ObjectContext|Request|Response|Server|Session)\b/dgiv,
      name: "support.class.asp"
    },
    {
      match: /\b(Contents|StaticObjects|ClientCertificate|Cookies|Form|QueryString|ServerVariables)\b/dgiv,
      name: "support.class.collection.asp"
    },
    {
      match: /\b(TotalBytes|Buffer|CacheControl|Charset|ContentType|Expires|ExpiresAbsolute|IsClientConnected|PICS|Status|ScriptTimeout|CodePage|LCID|SessionID|Timeout)\b/dgiv,
      name: "support.constant.asp"
    },
    {
      match: /\b(Lock|Unlock|SetAbort|SetComplete|BinaryRead|AddHeader|AppendToLog|BinaryWrite|Clear|End|Flush|Redirect|Write|CreateObject|HTMLEncode|MapPath|URLEncode|Abandon|Convert|Regex)\b/dgiv,
      name: "support.function.asp"
    },
    {
      match: /\b(Application_OnEnd|Application_OnStart|OnTransactionAbort|OnTransactionCommit|Session_OnEnd|Session_OnStart)\b/dgiv,
      name: "support.function.event.asp"
    },
    {
      match: /(?<=as )\b([7A-Z_a-z][0-9A-Z_a-z]*?)\b/dgiv,
      name: "support.type.vb.asp"
    },
    {
      match: /\b(Array|Add|Asc|Atn|CBool|CByte|CCur|CDate|CDbl|Chr|CInt|CLng|Conversions|Cos|CreateObject|CSng|CStr|Date|DateAdd|DateDiff|DatePart|DateSerial|DateValue|Day|Derived|Math|Escape|Eval|Exists|Exp|Filter|FormatCurrency|FormatDateTime|FormatNumber|FormatPercent|GetLocale|GetObject|GetRef|Hex|Hour|InputBox|InStr|InStrRev|Int|Fix|IsArray|IsDate|IsEmpty|IsNull|IsNumeric|IsObject|Items??|Join|Keys|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|RTrim|Trim|Maths|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Remove|RemoveAll|Replace|RGB|Right|Rnd|Round|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion|ScriptEngineMinorVersion|Second|SetLocale|Sgn|Sin|Space|Split|Sqr|StrComp|String|StrReverse|Tan|Timer??|TimeSerial|TimeValue|TypeName|UBound|UCase|Unescape|VarType|Weekday|WeekdayName|Year)\b/dgiv,
      name: "support.function.vb.asp"
    },
    {
      match: /-?\b((0([Xx])\p{AHex}*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)([Ll]|UL|ul|[FUfu])?\b/dgv,
      name: "constant.numeric.asp"
    },
    {
      match: /\b(vbtrue|vbfalse|vbcr|vbcrlf|vbformfeed|vblf|vbnewline|vbnullchar|vbnullstring|int32|vbtab|vbverticaltab|vbbinarycompare|vbtextcomparevbsunday|vbmonday|vbtuesday|vbwednesday|vbthursday|vbfriday|vbsaturday|vbusesystemdayofweek|vbfirstjan1|vbfirstfourdays|vbfirstfullweek|vbgeneraldate|vblongdate|vbshortdate|vblongtime|vbshorttime|vbobjecterror|vbEmpty|vbNull|vbInteger|vbLong|vbSingle|vbDouble|vbCurrency|vbDate|vbString|vbObject|vbError|vbBoolean|vbVariant|vbDataObject|vbDecimal|vbByte|vbArray)\b/dgiv,
      name: "support.type.vb.asp"
    },
    {
      captures: {
        "1": { name: "entity.name.function.asp" }
      },
      match: /\b([7A-Z_a-z][0-9A-Z_a-z]*?)\b(?=\(\)?)/dgiv,
      name: "support.function.asp"
    },
    {
      match: /((?<=([\-\&\(\+\,\/\<\=\>\\]))\p{space}*\b([7A-Z_a-z][0-9A-Z_a-z]*?)\b(?!([\(\.]))|\b([7A-Z_a-z][0-9A-Z_a-z]*?)\b(?=\p{space}*([\-\&\(\)\+\/\<\=\>\\])))/dgiv,
      name: "variable.other.asp"
    },
    {
      match: /[\!\$\%\&\*]|--?|\+\+|[\+\~]|===?|=|!==??|<=|>=|<<=|>>=|>>>=|<>|[\!\<\>]|&&|\|\||\?:|\*=|\/=|%=|\+=|-=|&=|\^=|\b(in|instanceof|new|delete|typeof|void)\b/dgv,
      name: "keyword.operator.js"
    }
  ],
  repository: {
    "round-brackets": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.round-brackets.begin.asp" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.round-brackets.end.asp" }
      },
      name: "meta.round-brackets",
      patterns: [
        { include: "source.asp.vb.net" }
      ]
    }
  },
  dependencies: []
};
