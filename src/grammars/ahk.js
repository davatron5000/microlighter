import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "ahk",
  displayName: "AutoHotkey",
  aliases: [
    "ahk1"
  ],
  scopeName: "source.ahk",
  patterns: [
    { include: "#comment" },
    { include: "#string" },
    { include: "#script-block" },
    { include: "#function" },
    { include: "#function-call" },
    { include: "#keyword" },
    { include: "#punctuation" },
    { include: "#text" }
  ],
  repository: {
    comment: {
      patterns: [
        {
          captures: {
            "2": { name: "punctuation.definition.comment.ahk" }
          },
          example: ";comment",
          match: /(^\p{space}*|\p{space}+)(;)[^\n]*/dgv,
          name: "comment.line.semicolon.ahk"
        },
        {
          begin: /^\p{space}*\/\*/dgv,
          end: /^\p{space}*\*\//dgv,
          example: "/* comment */",
          name: "comment.block.slashstar.ahk"
        }
      ]
    },
    function: {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.ahk" },
            "2": { name: "punctuation.bracket.parenthesis.ahk" },
            "3": {
              patterns: [
                { include: "#text" }
              ]
            },
            "4": { name: "punctuation.bracket.parenthesis.ahk" },
            "5": { name: "punctuation.bracket.curly.ahk" },
            "6": { name: "comment.line.semicolon.functionline.ahk" }
          },
          example: "fun(){",
          match: /^(\p{space}*[\p{L}\p{M}\p{N}\p{Pc}]+)(?<!if|while)(\()([^\n]*)(\))\p{space}*(\{)(\p{space}+;[^\n]*)?(?=\n?$)/dgiv,
          name: "functionline.ahk"
        }
      ]
    },
    "function-call": {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                { include: "$self" }
              ]
            },
            "2": { name: "comment.line.semicolon.if.ahk" }
          },
          example: "#if [expression]",
          match: /#\bif\b([^\n]*?)(\p{space}+;[^\n]*)?(?=\n?$)/dgiv,
          name: "keyword.control.if.ahk"
        },
        {
          captures: {
            "1": { name: "string.parameter.import.ahk" },
            "2": { name: "comment.line.semicolon.import.ahk" }
          },
          example: "#include",
          match: /#\binclude(?:|again)\b([^\n]*?)(\p{space}+;[^\n]*)?(?=\n?$)/dgiv,
          name: "keyword.control.import.ahk"
        },
        {
          captures: {
            "1": { name: "string.parameter.directives.ahk" },
            "2": { name: "comment.line.semicolon.directive.ahk" }
          },
          example: "#persistent",
          match: /#\b(?:allowsamelinecomments|clipboardtimeout|commentflag|delimiter|derefchar|errorstdout|escapechar|hotkeyinterval|hotkeymodifiertimeout|hotstring|iftimeout|ifwinactive|ifwinexist|ifwinnotactive|ifwinnotexist|inputlevel|installkeybdhook|installmousehook|keyhistory|ltrim|maxhotkeysperinterval|maxmem|maxthreads|maxthreadsbuffer|maxthreadsperhotkey|menumaskkey|noenv|notrayicon|persistent|requires|singleinstance|usehook|warn|winactivateforce)\b([^\n]*?)(\p{space}+;[^\n]*)?(?=\n?$)/dgiv,
          name: "keyword.control.directives.ahk"
        },
        {
          example: "winkill",
          match: /\b(?:autotrim|blockinput|click|clipwait|control|controlclick|controlfocus|controlget|controlgetfocus|controlgetpos|controlgettext|controlmove|controlsend|controlsendraw|controlsettext|coordmode|detecthiddentext|detecthiddenwindows|drive|driveget|drivespacefree|edit|envadd|envdiv|envget|envmult|envset|envsub|envupdate|fileappend|filecopy|filecopydir|filecreatedir|filecreateshortcut|filedelete|fileencoding|filegetattrib|filegetshortcut|filegetsize|filegettime|filegetversion|fileinstall|filemove|filemovedir|fileread|filereadline|filerecycle|filerecycleempty|fileremovedir|fileselectfile|fileselectfolder|filesetattrib|filesettime|formattime|getkeystate|gosub|goto|groupactivate|groupadd|groupclose|groupdeactivate|gui|guicontrol|guicontrolget|hotkey|ifequal|ifexist|ifgreater|ifgreaterorequal|ifinstring|ifless|iflessorequal|ifmsgbox|ifnotequal|ifnotexist|ifnotinstring|ifwinactive|ifwinexist|ifwinnotactive|ifwinnotexist|imagesearch|inidelete|iniread|iniwrite|input|inputbox|keyhistory|keywait|listhotkeys|listlines|listvars|menu|mouseclick|mouseclickdrag|mousegetpos|mousemove|msgbox|onexit|outputdebug|pause|pixelgetcolor|pixelsearch|postmessage|process|progress|random|regdelete|regread|regwrite|reload|run|runas|runwait|send|sendevent|sendinput|sendlevel|sendmessage|sendmode|sendplay|sendraw|setbatchlines|setcapslockstate|setcontroldelay|setdefaultmousespeed|setenv|setformat|setkeydelay|setmousedelay|setnumlockstate|setscrolllockstate|setstorecapslockmode|setregview|settimer|settitlematchmode|setwindelay|setworkingdir|shutdown|sleep|sort|soundbeep|soundget|soundgetwavevolume|soundplay|soundset|soundsetwavevolume|splashimage|splashtextoff|splashtexton|splitpath|statusbargettext|statusbarwait|stringcasesense|stringgetpos|stringleft|stringlen|stringlower|stringmid|stringreplace|stringright|stringsplit|stringtrimleft|stringtrimright|stringupper|suspend|sysget|thread|tooltip|transform|traytip|urldownloadtofile|winactivate|winactivatebottom|winclose|winget|wingetactivestats|wingetactivetitle|wingetclass|wingetpos|wingettext|wingettitle|winhide|winkill|winmaximize|winmenuselectitem|winminimize|winminimizeall|winminimizeallundo|winmove|winrestore|winset|winsettitle|winshow|winwait|winwaitactive|winwaitclose|winwaitnotactive)\b/dgiv,
          name: "support.function.ahk"
        },
        {
          example: ".length",
          match: /\b(?!MsgBox)(?<=\.)(?:[Ll][Ee][Nn][Gg][Tt][Hh]|[Aa][Tt][Ee][Oo][Ff]|[Ee][Nn][Cc][Oo][Dd][Ii][Nn][Gg]|__[Hh][Aa][Nn][Dd][Ll][Ee]|[Nn][Aa][Mm][Ee]|[Ii][Ssſ][Bb][Uu][Ii][Ll][Tt][Ii][Nn]|[Ii][Ssſ][Vv][Aa][Rr][Ii][Aa][Dd][Ii][Cc]|[Mm][Ii][Nn][Pp][Aa][Rr][Aa][Mm][Ssſ]|[Mm][Aa][Xx][Pp][Aa][Rr][Aa][Mm][Ssſ]|[Pp][Oo][Ssſ][Ii][Tt][Ii][Oo][Nn]|[Pp][Oo][Ssſ])(?![\(\.\[])\b/dgv,
          name: "support.function.ahk"
        },
        {
          example: "A_ScriptDir",
          match: new EmulatedRegExp("\\b(?!MsgBox)(?:[Aa]_[Aa][Hh][KKk][Pp][Aa][Tt][Hh]|[Aa]_[Aa][Rr][Gg][Ssſ]|[Aa]_[Ll][Ii][Ssſ][Tt][Ll][Ii][Nn][Ee][Ssſ]|[Aa]_[Ssſ][Ee][Nn][Dd][Mm][Oo][Dd][Ee]|[Aa]_[Ssſ][Ee][Nn][Dd][Ll][Ee][Vv][Ee][Ll]|[Aa]_[Ssſ][Tt][Oo][Rr][Ee][Cc][Aa][Pp][Ssſ][Ll][Oo][Cc][KKk][Mm][Oo][Dd][Ee]|[Aa]_[Cc][Oo][Oo][Rr][Dd][Mm][Oo][Dd][Ee][Tt][Oo][Oo][Ll][Tt][Ii][Pp]|[Aa]_[Cc][Oo][Oo][Rr][Dd][Mm][Oo][Dd][Ee][Pp][Ii][Xx][Ee][Ll]|[Aa]_[Cc][Oo][Oo][Rr][Dd][Mm][Oo][Dd][Ee][Mm][Oo][Uu][Ssſ][Ee]|[Aa]_[Cc][Oo][Oo][Rr][Dd][Mm][Oo][Dd][Ee][Cc][Aa][Rr][Ee][Tt]|[Aa]_[Cc][Oo][Oo][Rr][Dd][Mm][Oo][Dd][Ee][Mm][Ee][Nn][Uu]|[Aa]_[Tt][Ii][Mm][Ee][Ii][Dd][Ll][Ee][KKk][Ee][Yy][Bb][Oo][Aa][Rr][Dd]|[Aa]_[Tt][Ii][Mm][Ee][Ii][Dd][Ll][Ee][Mm][Oo][Uu][Ssſ][Ee]|[Aa]_[Dd][Ee][Ff][Aa][Uu][Ll][Tt][Gg][Uu][Ii]|[Aa]_[Dd][Ee][Ff][Aa][Uu][Ll][Tt][Ll][Ii][Ssſ][Tt][Vv][Ii][Ee][Ww]|[Aa]_[Dd][Ee][Ff][Aa][Uu][Ll][Tt][Tt][Rr][Ee][Ee][Vv][Ii][Ee][Ww]|[Aa]_[Cc][Oo][Mm][Ssſ][Pp][Ee][Cc]|[Aa]_[Aa][Hh][KKk][Vv][Ee][Rr][Ssſ][Ii][Oo][Nn]|[Aa]_[Aa][Pp][Pp][Dd][Aa][Tt][Aa]|[Aa]_[Aa][Pp][Pp][Dd][Aa][Tt][Aa][Cc][Oo][Mm][Mm][Oo][Nn]|[Aa]_[Aa][Uu][Tt][Oo][Tt][Rr][Ii][Mm]|[Aa]_[Bb][Aa][Tt][Cc][Hh][Ll][Ii][Nn][Ee][Ssſ]|[Aa]_[Cc][Aa][Rr][Ee][Tt][Xx]|[Aa]_[Cc][Aa][Rr][Ee][Tt][Yy]|[Aa]_[Cc][Ll][Ii][Pp][Bb][Oo][Aa][Rr][Dd]|[Aa]_[Cc][Oo][Mm][Pp][Uu][Tt][Ee][Rr][Nn][Aa][Mm][Ee]|[Aa]_[Cc][Oo][Nn][Tt][Rr][Oo][Ll][Dd][Ee][Ll][Aa][Yy]|[Aa]_[Cc][Uu][Rr][Ssſ][Oo][Rr]|[Aa]_[Dd][Dd][Dd]??|[Aa]_[Dd][Dd][Dd][Dd]|[Aa]_[Dd][Ee][Ff][Aa][Uu][Ll][Tt][Mm][Oo][Uu][Ssſ][Ee][Ssſ][Pp][Ee][Ee][Dd]|[Aa]_[Dd][Ee][Ssſ][KKk][Tt][Oo][Pp]|[Aa]_[Dd][Ee][Ssſ][KKk][Tt][Oo][Pp][Cc][Oo][Mm][Mm][Oo][Nn]|[Aa]_[Dd][Ee][Tt][Ee][Cc][Tt][Hh][Ii][Dd][Dd][Ee][Nn][Tt][Ee][Xx][Tt]|[Aa]_[Dd][Ee][Tt][Ee][Cc][Tt][Hh][Ii][Dd][Dd][Ee][Nn][Ww][Ii][Nn][Dd][Oo][Ww][Ssſ]|[Aa]_[Ee][Nn][Dd][Cc][Hh][Aa][Rr]|[Aa]_[Ee][Vv][Ee][Nn][Tt][Ii][Nn][Ff][Oo]|[Aa]_[Ee][Xx][Ii][Tt][Rr][Ee][Aa][Ssſ][Oo][Nn]|[Aa]_[Ff][Ii][Ll][Ee][Ee][Nn][Cc][Oo][Dd][Ii][Nn][Gg]|[Aa]_[Ff][Oo][Rr][Mm][Aa][Tt][Ff][Ll][Oo][Aa][Tt]|[Aa]_[Ff][Oo][Rr][Mm][Aa][Tt][Ii][Nn][Tt][Ee][Gg][Ee][Rr]|[Aa]_[Gg][Uu][Ii]|[Aa]_[Gg][Uu][Ii][Ee][Vv][Ee][Nn][Tt]|[Aa]_[Gg][Uu][Ii][Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Aa]_[Gg][Uu][Ii][Cc][Oo][Nn][Tt][Rr][Oo][Ll][Ee][Vv][Ee][Nn][Tt]|[Aa]_[Gg][Uu][Ii][Hh][Ee][Ii][Gg][Hh][Tt]|[Aa]_[Gg][Uu][Ii][Ww][Ii][Dd][Tt][Hh]|[Aa]_[Gg][Uu][Ii][Xx]|[Aa]_[Gg][Uu][Ii][Yy]|[Aa]_[Hh][Oo][Uu][Rr]|[Aa]_[Ii][Cc][Oo][Nn][Ff][Ii][Ll][Ee]|[Aa]_[Ii][Cc][Oo][Nn][Hh][Ii][Dd][Dd][Ee][Nn]|[Aa]_[Ii][Cc][Oo][Nn][Nn][Uu][Mm][Bb][Ee][Rr]|[Aa]_[Ii][Cc][Oo][Nn][Tt][Ii][Pp]|[Aa]_[Ii][Nn][Dd][Ee][Xx]|[Aa]_[Ii][Nn][Ii][Tt][Ii][Aa][Ll][Ww][Oo][Rr][KKk][Ii][Nn][Gg][Dd][Ii][Rr]|[Aa]_[Ii][Pp][Aa][Dd][Dd][Rr][Ee][Ssſ][Ssſ]1|[Aa]_[Ii][Pp][Aa][Dd][Dd][Rr][Ee][Ssſ][Ssſ]2|[Aa]_[Ii][Pp][Aa][Dd][Dd][Rr][Ee][Ssſ][Ssſ]3|[Aa]_[Ii][Pp][Aa][Dd][Dd][Rr][Ee][Ssſ][Ssſ]4|[Aa]_[Ii][Ssſ]64[Bb][Ii][Tt][Oo][Ssſ]|[Aa]_[Ii][Ssſ][Aa][Dd][Mm][Ii][Nn]|[Aa]_[Ii][Ssſ][Cc][Oo][Mm][Pp][Ii][Ll][Ee][Dd]|[Aa]_[Ii][Ssſ][Cc][Rr][Ii][Tt][Ii][Cc][Aa][Ll]|[Aa]_[Ii][Ssſ][Pp][Aa][Uu][Ssſ][Ee][Dd]|[Aa]_[Ii][Ssſ][Ssſ][Uu][Ssſ][Pp][Ee][Nn][Dd][Ee][Dd]|[Aa]_[Ii][Ssſ][Uu][Nn][Ii][Cc][Oo][Dd][Ee]|[Aa]_[KKk][Ee][Yy][Dd][Ee][Ll][Aa][Yy][Pp][Ll][Aa][Yy]|[Aa]_[KKk][Ee][Yy][Dd][Ee][Ll][Aa][Yy]|[Aa]_[KKk][Ee][Yy][Dd][Uu][Rr][Aa][Tt][Ii][Oo][Nn][Pp][Ll][Aa][Yy]|[Aa]_[KKk][Ee][Yy][Dd][Uu][Rr][Aa][Tt][Ii][Oo][Nn]|[Aa]_[Ll][Aa][Nn][Gg][Uu][Aa][Gg][Ee]|[Aa]_[Ll][Aa][Ssſ][Tt][Ee][Rr][Rr][Oo][Rr]|[Aa]_[Ll][Ii][Nn][Ee][Ff][Ii][Ll][Ee]|[Aa]_[Ll][Ii][Nn][Ee][Nn][Uu][Mm][Bb][Ee][Rr]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ee][Ll][Dd]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Aa][Tt][Tt][Rr][Ii][Bb]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Dd][Ii][Rr]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Ee][Xx][Tt]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Ff][Uu][Ll][Ll][Pp][Aa][Tt][Hh]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Ll][Oo][Nn][Gg][Pp][Aa][Tt][Hh]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Nn][Aa][Mm][Ee]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Pp][Aa][Tt][Hh]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Ssſ][Hh][Oo][Rr][Tt][Nn][Aa][Mm][Ee]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Ssſ][Hh][Oo][Rr][Tt][Pp][Aa][Tt][Hh]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Ssſ][Ii][Zz][Ee]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Ssſ][Ii][Zz][Ee][KKk][Bb]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Ssſ][Ii][Zz][Ee][Mm][Bb]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Tt][Ii][Mm][Ee][Aa][Cc][Cc][Ee][Ssſ][Ssſ][Ee][Dd]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Tt][Ii][Mm][Ee][Cc][Rr][Ee][Aa][Tt][Ee][Dd]|[Aa]_[Ll][Oo][Oo][Pp][Ff][Ii][Ll][Ee][Tt][Ii][Mm][Ee][Mm][Oo][Dd][Ii][Ff][Ii][Ee][Dd]|[Aa]_[Ll][Oo][Oo][Pp][Rr][Ee][Aa][Dd][Ll][Ii][Nn][Ee]|[Aa]_[Ll][Oo][Oo][Pp][Rr][Ee][Gg][KKk][Ee][Yy]|[Aa]_[Ll][Oo][Oo][Pp][Rr][Ee][Gg][Nn][Aa][Mm][Ee]|[Aa]_[Ll][Oo][Oo][Pp][Rr][Ee][Gg][Ssſ][Uu][Bb][KKk][Ee][Yy]|[Aa]_[Ll][Oo][Oo][Pp][Rr][Ee][Gg][Tt][Ii][Mm][Ee][Mm][Oo][Dd][Ii][Ff][Ii][Ee][Dd]|[Aa]_[Ll][Oo][Oo][Pp][Rr][Ee][Gg][Tt][Yy][Pp][Ee]|[Aa]_[Mm][Dd][Aa][Yy]|[Aa]_[Mm][Ii][Nn]|[Aa]_[Mm][Mm][Mm]??|[Aa]_[Mm][Mm][Mm][Mm]|[Aa]_[Mm][Oo][Nn]|[Aa]_[Mm][Oo][Uu][Ssſ][Ee][Dd][Ee][Ll][Aa][Yy][Pp][Ll][Aa][Yy]|[Aa]_[Mm][Oo][Uu][Ssſ][Ee][Dd][Ee][Ll][Aa][Yy]|[Aa]_[Mm][Ssſ][Ee][Cc]|[Aa]_[Mm][Yy][Dd][Oo][Cc][Uu][Mm][Ee][Nn][Tt][Ssſ]|[Aa]_[Nn][Oo][Ww]|[Aa]_[Nn][Oo][Ww][Uu][Tt][Cc]|[Aa]_[Nn][Uu][Mm][Bb][Aa][Tt][Cc][Hh][Ll][Ii][Nn][Ee][Ssſ]|[Aa]_[Oo][Ssſ][Tt][Yy][Pp][Ee]|[Aa]_[Oo][Ssſ][Vv][Ee][Rr][Ssſ][Ii][Oo][Nn]|[Aa]_[Pp][Rr][Ii][Oo][Rr][Hh][Oo][Tt][KKk][Ee][Yy]|[Aa]_[Pp][Rr][Ii][Oo][Rr][KKk][Ee][Yy]|[Aa]_[Pp][Rr][Oo][Gg][Rr][Aa][Mm][Ff][Ii][Ll][Ee][Ssſ]|[Aa]_[Pp][Rr][Oo][Gg][Rr][Aa][Mm][Ssſ]|[Aa]_[Pp][Rr][Oo][Gg][Rr][Aa][Mm][Ssſ][Cc][Oo][Mm][Mm][Oo][Nn]|[Aa]_[Pp][Tt][Rr][Ssſ][Ii][Zz][Ee]|[Aa]_[Rr][Ee][Gg][Vv][Ii][Ee][Ww]|[Aa]_[Ssſ][Cc][Rr][Ee][Ee][Nn][Dd][Pp][Ii]|[Aa]_[Ssſ][Cc][Rr][Ee][Ee][Nn][Hh][Ee][Ii][Gg][Hh][Tt]|[Aa]_[Ssſ][Cc][Rr][Ee][Ee][Nn][Ww][Ii][Dd][Tt][Hh]|[Aa]_[Ssſ][Cc][Rr][Ii][Pp][Tt][Dd][Ii][Rr]|[Aa]_[Ssſ][Cc][Rr][Ii][Pp][Tt][Ff][Uu][Ll][Ll][Pp][Aa][Tt][Hh]|[Aa]_[Ssſ][Cc][Rr][Ii][Pp][Tt][Hh][Ww][Nn][Dd]|[Aa]_[Ssſ][Cc][Rr][Ii][Pp][Tt][Nn][Aa][Mm][Ee]|[Aa]_[Ssſ][Ee][Cc]|[Aa]_[Ssſ][Pp][Aa][Cc][Ee]|[Aa]_[Ssſ][Tt][Aa][Rr][Tt][Mm][Ee][Nn][Uu]|[Aa]_[Ssſ][Tt][Aa][Rr][Tt][Mm][Ee][Nn][Uu][Cc][Oo][Mm][Mm][Oo][Nn]|[Aa]_[Ssſ][Tt][Aa][Rr][Tt][Uu][Pp]|[Aa]_[Ssſ][Tt][Aa][Rr][Tt][Uu][Pp][Cc][Oo][Mm][Mm][Oo][Nn]|[Aa]_[Ssſ][Tt][Rr][Ii][Nn][Gg][Cc][Aa][Ssſ][Ee][Ssſ][Ee][Nn][Ssſ][Ee]|[Aa]_[Tt][Aa][Bb]|[Aa]_[Tt][Ee][Mm][Pp]|[Aa]_[Tt][Hh][Ii][Ssſ][Ff][Uu][Nn][Cc]|[Aa]_[Tt][Hh][Ii][Ssſ][Hh][Oo][Tt][KKk][Ee][Yy]|[Aa]_[Tt][Hh][Ii][Ssſ][Ll][Aa][Bb][Ee][Ll]|[Aa]_[Tt][Hh][Ii][Ssſ][Mm][Ee][Nn][Uu]|[Aa]_[Tt][Hh][Ii][Ssſ][Mm][Ee][Nn][Uu][Ii][Tt][Ee][Mm]|[Aa]_[Tt][Hh][Ii][Ssſ][Mm][Ee][Nn][Uu][Ii][Tt][Ee][Mm][Pp][Oo][Ssſ]|[Aa]_[Tt][Ii][Cc][KKk][Cc][Oo][Uu][Nn][Tt]|[Aa]_[Tt][Ii][Mm][Ee][Ii][Dd][Ll][Ee]|[Aa]_[Tt][Ii][Mm][Ee][Ii][Dd][Ll][Ee][Pp][Hh][Yy][Ssſ][Ii][Cc][Aa][Ll]|[Aa]_[Tt][Ii][Mm][Ee][Ssſ][Ii][Nn][Cc][Ee][Pp][Rr][Ii][Oo][Rr][Hh][Oo][Tt][KKk][Ee][Yy]|[Aa]_[Tt][Ii][Mm][Ee][Ssſ][Ii][Nn][Cc][Ee][Tt][Hh][Ii][Ssſ][Hh][Oo][Tt][KKk][Ee][Yy]|[Aa]_[Tt][Ii][Tt][Ll][Ee][Mm][Aa][Tt][Cc][Hh][Mm][Oo][Dd][Ee]|[Aa]_[Tt][Ii][Tt][Ll][Ee][Mm][Aa][Tt][Cc][Hh][Mm][Oo][Dd][Ee][Ssſ][Pp][Ee][Ee][Dd]|[Aa]_[Uu][Ssſ][Ee][Rr][Nn][Aa][Mm][Ee]|[Aa]_[Ww][Dd][Aa][Yy]|[Aa]_[Ww][Ii][Nn][Dd][Ee][Ll][Aa][Yy]|[Aa]_[Ww][Ii][Nn][Dd][Ii][Rr]|[Aa]_[Ww][Oo][Rr][KKk][Ii][Nn][Gg][Dd][Ii][Rr]|[Aa]_[Yy][Dd][Aa][Yy]|[Aa]_[Yy][Ee][Aa][Rr]|[Aa]_[Yy][Ww][Ee][Ee][KKk]|[Aa]_[Yy][Yy][Yy][Yy]|[Cc][Ll][Ii][Pp][Bb][Oo][Aa][Rr][Dd]|[Cc][Ll][Ii][Pp][Bb][Oo][Aa][Rr][Dd][Aa][Ll][Ll]|[Cc][Oo][Mm][Ssſ][Pp][Ee][Cc]|[Ee][Rr][Rr][Oo][Rr][Ll][Ee][Vv][Ee][Ll]|[Pp][Rr][Oo][Gg][Rr][Aa][Mm][Ff][Ii][Ll][Ee][Ssſ]|[Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ssſ][Ee])\\b", "dgv", { lazyCompile: true }),
          name: "constant.language.ahk"
        }
      ]
    },
    keyword: {
      patterns: [
        {
          example: "this",
          match: /\b(?!MsgBox)[Tt][Hh][Ii][Ssſ]\b/dgv,
          name: "support.class.ahk"
        },
        {
          example: "LButton",
          match: new EmulatedRegExp("\\b(?!MsgBox)(?:[Nn][Ee][Ww]|__[Nn][Ee][Ww]|__[Dd][Ee][Ll][Ee][Tt][Ee]|__[Ssſ][Ee][Tt]|__[Gg][Ee][Tt]|__[Cc][Aa][Ll][Ll]|[Ssſ][Hh][Ii][Ff][Tt]|[Ll][Ssſ][Hh][Ii][Ff][Tt]|[Rr][Ssſ][Hh][Ii][Ff][Tt]|[Aa][Ll][Tt]|[Ll][Aa][Ll][Tt]|[Rr][Aa][Ll][Tt]|[Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Ll][Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Rr][Cc][Oo][Nn][Tt][Rr][Oo][Ll]|[Cc][Tt][Rr][Ll]|[Ll][Cc][Tt][Rr][Ll]|[Rr][Cc][Tt][Rr][Ll]|[Ll][Ww][Ii][Nn]|[Rr][Ww][Ii][Nn]|[Aa][Pp][Pp][Ssſ][KKk][Ee][Yy]|[Aa][Ll][Tt][Dd][Oo][Ww][Nn]|[Aa][Ll][Tt][Uu][Pp]|[Ssſ][Hh][Ii][Ff][Tt][Dd][Oo][Ww][Nn]|[Ssſ][Hh][Ii][Ff][Tt][Uu][Pp]|[Cc][Tt][Rr][Ll][Dd][Oo][Ww][Nn]|[Cc][Tt][Rr][Ll][Uu][Pp]|[Ll][Ww][Ii][Nn][Dd][Oo][Ww][Nn]|[Ll][Ww][Ii][Nn][Uu][Pp]|[Rr][Ww][Ii][Nn][Dd][Oo][Ww][Nn]|[Rr][Ww][Ii][Nn][Uu][Pp]|[Ll][Bb][Uu][Tt][Tt][Oo][Nn]|[Rr][Bb][Uu][Tt][Tt][Oo][Nn]|[Mm][Bb][Uu][Tt][Tt][Oo][Nn]|[Ww][Hh][Ee][Ee][Ll][Uu][Pp]|[Ww][Hh][Ee][Ee][Ll][Ll][Ee][Ff][Tt]|[Ww][Hh][Ee][Ee][Ll][Rr][Ii][Gg][Hh][Tt]|[Ww][Hh][Ee][Ee][Ll][Dd][Oo][Ww][Nn]|[Xx][Bb][Uu][Tt][Tt][Oo][Nn]1|[Xx][Bb][Uu][Tt][Tt][Oo][Nn]2|[Jj][Oo][Yy]1|[Jj][Oo][Yy]2|[Jj][Oo][Yy]3|[Jj][Oo][Yy]4|[Jj][Oo][Yy]5|[Jj][Oo][Yy]6|[Jj][Oo][Yy]7|[Jj][Oo][Yy]8|[Jj][Oo][Yy]9|[Jj][Oo][Yy]10|[Jj][Oo][Yy]11|[Jj][Oo][Yy]12|[Jj][Oo][Yy]13|[Jj][Oo][Yy]14|[Jj][Oo][Yy]15|[Jj][Oo][Yy]16|[Jj][Oo][Yy]17|[Jj][Oo][Yy]18|[Jj][Oo][Yy]19|[Jj][Oo][Yy]20|[Jj][Oo][Yy]21|[Jj][Oo][Yy]22|[Jj][Oo][Yy]23|[Jj][Oo][Yy]24|[Jj][Oo][Yy]25|[Jj][Oo][Yy]26|[Jj][Oo][Yy]27|[Jj][Oo][Yy]28|[Jj][Oo][Yy]29|[Jj][Oo][Yy]30|[Jj][Oo][Yy]31|[Jj][Oo][Yy]32|[Jj][Oo][Yy][Xx]|[Jj][Oo][Yy][Yy]|[Jj][Oo][Yy][Zz]|[Jj][Oo][Yy][Rr]|[Jj][Oo][Yy][Uu]|[Jj][Oo][Yy][Vv]|[Jj][Oo][Yy][Pp][Oo][Vv]|[Jj][Oo][Yy][Nn][Aa][Mm][Ee]|[Jj][Oo][Yy][Bb][Uu][Tt][Tt][Oo][Nn][Ssſ]|[Jj][Oo][Yy][Aa][Xx][Ee][Ssſ]|[Jj][Oo][Yy][Ii][Nn][Ff][Oo]|[Ssſ][Pp][Aa][Cc][Ee]|[Tt][Aa][Bb]|[Ee][Nn][Tt][Ee][Rr]|[Ee][Ssſ][Cc][Aa][Pp][Ee]|[Ee][Ssſ][Cc]|[Bb][Aa][Cc][KKk][Ssſ][Pp][Aa][Cc][Ee]|[Bb][Ssſ]|[Dd][Ee][Ll][Ee][Tt][Ee]|[Dd][Ee][Ll]|[Ii][Nn][Ssſ][Ee][Rr][Tt]|[Ii][Nn][Ssſ]|[Pp][Gg][Uu][Pp]|[Pp][Gg][Dd][Nn]|[Hh][Oo][Mm][Ee]|[Ee][Nn][Dd]|[Uu][Pp]|[Dd][Oo][Ww][Nn]|[Ll][Ee][Ff][Tt]|[Rr][Ii][Gg][Hh][Tt]|[Pp][Rr][Ii][Nn][Tt][Ssſ][Cc][Rr][Ee][Ee][Nn]|[Cc][Tt][Rr][Ll][Bb][Rr][Ee][Aa][KKk]|[Pp][Aa][Uu][Ssſ][Ee]|[Ssſ][Cc][Rr][Oo][Ll][Ll][Ll][Oo][Cc][KKk]|[Cc][Aa][Pp][Ssſ][Ll][Oo][Cc][KKk]|[Nn][Uu][Mm][Ll][Oo][Cc][KKk]|[Nn][Uu][Mm][Pp][Aa][Dd]0|[Nn][Uu][Mm][Pp][Aa][Dd]1|[Nn][Uu][Mm][Pp][Aa][Dd]2|[Nn][Uu][Mm][Pp][Aa][Dd]3|[Nn][Uu][Mm][Pp][Aa][Dd]4|[Nn][Uu][Mm][Pp][Aa][Dd]5|[Nn][Uu][Mm][Pp][Aa][Dd]6|[Nn][Uu][Mm][Pp][Aa][Dd]7|[Nn][Uu][Mm][Pp][Aa][Dd]8|[Nn][Uu][Mm][Pp][Aa][Dd]9|[Nn][Uu][Mm][Pp][Aa][Dd][Mm][Uu][Ll][Tt]|[Nn][Uu][Mm][Pp][Aa][Dd][Aa][Dd][Dd]|[Nn][Uu][Mm][Pp][Aa][Dd][Ssſ][Uu][Bb]|[Nn][Uu][Mm][Pp][Aa][Dd][Dd][Ii][Vv]|[Nn][Uu][Mm][Pp][Aa][Dd][Dd][Oo][Tt]|[Nn][Uu][Mm][Pp][Aa][Dd][Dd][Ee][Ll]|[Nn][Uu][Mm][Pp][Aa][Dd][Ii][Nn][Ssſ]|[Nn][Uu][Mm][Pp][Aa][Dd][Cc][Ll][Ee][Aa][Rr]|[Nn][Uu][Mm][Pp][Aa][Dd][Uu][Pp]|[Nn][Uu][Mm][Pp][Aa][Dd][Dd][Oo][Ww][Nn]|[Nn][Uu][Mm][Pp][Aa][Dd][Ll][Ee][Ff][Tt]|[Nn][Uu][Mm][Pp][Aa][Dd][Rr][Ii][Gg][Hh][Tt]|[Nn][Uu][Mm][Pp][Aa][Dd][Hh][Oo][Mm][Ee]|[Nn][Uu][Mm][Pp][Aa][Dd][Ee][Nn][Dd]|[Nn][Uu][Mm][Pp][Aa][Dd][Pp][Gg][Uu][Pp]|[Nn][Uu][Mm][Pp][Aa][Dd][Pp][Gg][Dd][Nn]|[Nn][Uu][Mm][Pp][Aa][Dd][Ee][Nn][Tt][Ee][Rr]|[Ff]1|[Ff]2|[Ff]3|[Ff]4|[Ff]5|[Ff]6|[Ff]7|[Ff]8|[Ff]9|[Ff]10|[Ff]11|[Ff]12|[Ff]13|[Ff]14|[Ff]15|[Ff]16|[Ff]17|[Ff]18|[Ff]19|[Ff]20|[Ff]21|[Ff]22|[Ff]23|[Ff]24|[Bb][Rr][Oo][Ww][Ssſ][Ee][Rr]_[Bb][Aa][Cc][KKk]|[Bb][Rr][Oo][Ww][Ssſ][Ee][Rr]_[Ff][Oo][Rr][Ww][Aa][Rr][Dd]|[Bb][Rr][Oo][Ww][Ssſ][Ee][Rr]_[Rr][Ee][Ff][Rr][Ee][Ssſ][Hh]|[Bb][Rr][Oo][Ww][Ssſ][Ee][Rr]_[Ssſ][Tt][Oo][Pp]|[Bb][Rr][Oo][Ww][Ssſ][Ee][Rr]_[Ssſ][Ee][Aa][Rr][Cc][Hh]|[Bb][Rr][Oo][Ww][Ssſ][Ee][Rr]_[Ff][Aa][Vv][Oo][Rr][Ii][Tt][Ee][Ssſ]|[Bb][Rr][Oo][Ww][Ssſ][Ee][Rr]_[Hh][Oo][Mm][Ee]|[Vv][Oo][Ll][Uu][Mm][Ee]_[Mm][Uu][Tt][Ee]|[Vv][Oo][Ll][Uu][Mm][Ee]_[Dd][Oo][Ww][Nn]|[Vv][Oo][Ll][Uu][Mm][Ee]_[Uu][Pp]|[Mm][Ee][Dd][Ii][Aa]_[Nn][Ee][Xx][Tt]|[Mm][Ee][Dd][Ii][Aa]_[Pp][Rr][Ee][Vv]|[Mm][Ee][Dd][Ii][Aa]_[Ssſ][Tt][Oo][Pp]|[Mm][Ee][Dd][Ii][Aa]_[Pp][Ll][Aa][Yy]_[Pp][Aa][Uu][Ssſ][Ee]|[Ll][Aa][Uu][Nn][Cc][Hh]_[Mm][Aa][Ii][Ll]|[Ll][Aa][Uu][Nn][Cc][Hh]_[Mm][Ee][Dd][Ii][Aa]|[Ll][Aa][Uu][Nn][Cc][Hh]_[Aa][Pp][Pp]1|[Ll][Aa][Uu][Nn][Cc][Hh]_[Aa][Pp][Pp]2|[Vv][KKk]\\p{Nd}+|[Ssſ][Cc]\\p{Nd}+)\\b(?!\\p{space}*\\()\\b", "dgv", { lazyCompile: true }),
          name: "keyword.keys.ahk"
        },
        {
          example: "text",
          match: /\b(?!MsgBox)(?<!\.)(?:[Aa][Hh][KKk]_[Ii][Dd]|[Aa][Hh][KKk]_[Ee][Xx][Ee]|[Aa][Hh][KKk]_[Pp][Ii][Dd]|[Aa][Hh][KKk]_[Cc][Ll][Aa][Ssſ][Ssſ]|[Aa][Hh][KKk]_[Gg][Rr][Oo][Uu][Pp]|[Nn][Oo][Tt]|[Oo][Rr]|[Aa][Nn][Dd]|[Ssſ][Tt][Aa][Tt][Ii][Cc]|[Gg][Ll][Oo][Bb][Aa][Ll]|[Ll][Oo][Cc][Aa][Ll]|[Bb][Yy][Rr][Ee][Ff]|[Ee][Rr][Rr][Oo][Rr]|[Ssſ][Ii][Nn][Gg][Ll][Ee]|[Gg][Uu][Ii][Ee][Ssſ][Cc][Aa][Pp][Ee]|[Gg][Uu][Ii][Cc][Ll][Oo][Ssſ][Ee]|[Gg][Uu][Ii][Ssſ][Ii][Zz][Ee]|[Gg][Uu][Ii][Cc][Oo][Nn][Tt][Ee][Xx][Tt][Mm][Ee][Nn][Uu]|[Gg][Uu][Ii][Dd][Rr][Oo][Pp][Ff][Ii][Ll][Ee][Ssſ]|[Bb][Uu][Tt][Tt][Oo][Nn][Ssſ]|[Ll][Ii][Nn][Ee][Ssſ]|[Bb][Ll][Ii][Nn][Dd]|[Rr][Aa][Ww]|[Aa][Ll][Ll]|[Bb][Aa][Ssſ][Ee])(?![\(\.\[])\b/dgv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=::\p{space}*)(AltTab|ShiftAltTab|AltTabMenu|AltTabAndMenu|AltTabMenuDismiss)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\b(AutoTrim|DetectHiddenText|DetectHiddenWindows|ListLines|SetStoreCapsLockMode)\b\p{space}*,?\p{space}*)(O(?:n|ff))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bBlockInput\b\p{space}*,?\p{space}*)(On|Off|Send|Mouse|SendAndMouse|Default|MouseMove|MouseMoveOff)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bControl\b\p{space}*,?\p{space}*)(Check|Uncheck|Enable|Disable|Show|Hide|Style|ExStyle|ShowDropDown|HideDropDown|TabLeft|TabRight|Add|Delete|Choose|ChooseString|EditPaste)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bControlClick\b\p{space}*,?[^\,]*,[^\,]+,[^\,]*,\p{space}*)(L|Left|R|Right|M|Middle|X1|XButton1|X2|XButton2|WheelUp|WU|WheelDown|WD|WheelLeft|WL|WheelRight|WR)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bControlClick\b\p{space}*,?[^\,]*,[^\,]+,[^\,]*,[^\,]*,[^\,]*,[^\,]*)(NA|[DU]|Pos)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bCoordMode\b\p{space}*,?\p{space}*)(ToolTip|Pixel|Mouse|Caret|Menu)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bCoordMode\b\p{space}*,?[^\,]+,\p{space}*)(Screen|Relative|Window|Client)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bDrive\b\p{space}*,?\p{space}*)(Label|Lock|Unlock|Eject)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bDriveGet\b\p{space}*,?[^\,]+,\p{space}*)(List|Capacity|FS|FileSystem|Label|Serial|Type|Status|StatusCD)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bDriveGet\b\p{space}*,?[^\,]+,\p{space}*List\p{space}*,\p{space}*)(CDROM|REMOVABLE|FIXED|NETWORK|RAMDISK|UNKNOWN)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\b(Env(?:Add|Sub))\b\p{space}*,?[^\,]+,[^\,]+,\p{space}*)(Seconds|Minutes|Hours|Days|[DHMS])\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=([\-\+])=[^\,]+,\p{space}*)(Seconds|Minutes|Hours|Days|[DHMS])\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bFileEncoding\b\p{space}*,?\p{space}*)(UTF-8|UTF-8-RAW|UTF-16|UTF-16-RAW|CP\p{Nd}{3,5})\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bFor\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%)\p{space}*(,\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%))?\p{space}+)(in)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bFormatTime\b\p{space}*,?[^\,]+,[^\,]*,\p{space}*)(Time|ShortDate|LongDate|YearMonth|YDay0??|WDay|YWeek)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGetKeyState\b\p{space}*,?[^\,]+,[^\,]+,\p{space}*)([PT])\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?)(New|Add|Show|Submit|Cancel|Hide|Destroy|Font|Color|Margin|Menu|Minimize|Maximize|Restore|Flash|Default|ListView)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*)(Text|Edit|UpDown|Picture|Pic|Button|Checkbox|Radio|DropDownList|DDL|ComboBox|ListBox|ListView|TreeView|Link|Hotkey|DateTime|MonthCal|Slider|Progress|GroupBox|Tab2??|Tab3|StatusBar|ActiveX|Custom)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Show\p{space}*,[^\,]*)(Center|xCenter|yCenter|AutoSize|Minimize|Maximize|Restore|NoActivate|NA|Hide)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Submit\p{space}*,\p{space}*)NoHide\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Font\p{space}*,[^\,]*)(Bold|Italic|Strike|Underline|Norm|c(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Color\p{space}*,\p{space}*)(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Flash\p{space}*,\p{space}*)Off\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*((([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?New\p{space}*,)?[^\,]*)(AlwaysOnTop|Border|Caption|Delimiter|Disabled|DPIScale|Hwnd|Label|LastFound|LastFoundExist|MaximizeBox|MinimizeBox|MinSize|MaxSize|OwnDialogs|Owner|Parent|Resize|SysMenu|Theme|ToolWindow)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%)\p{space}*,[^\,]*)(wp|hp|xp|yp|xm|ym|xs|ys)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%)\p{space}*,[^\,]*)(AltSubmit|Choose|Disabled|Hidden|Left|Right|Center|Section|Tabstop|Wrap|VScroll|HScroll|Controls|BackgroundTrans|Background|Border|HwndOutputVar|Theme|c(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*Edit\p{space}*,[^\,]*)(Limit|Lowercase|Multi|Number|Password|ReadOnly|Uppercase|WantCtrlA|WantReturn|WantTab|Wrap)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*UpDown\p{space}*,[^\,]*)(Horz|Left|Range|Wrap|16|0x80)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*(Pic(?:ture|))\p{space}*,[^\,]*)(Icon\p{Nd}+)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*Button\p{space}*,[^\,]*)(Default)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*CheckBox\p{space}*,[^\,]*)(Check(?:3|ed|edGray))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*Radio\p{space}*,[^\,]*)(Group|Checked)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*(D(?:ropDownList|DL))\p{space}*,[^\,]*)(Choose|Uppercase|Lowercase|Sort)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*ComboBox\p{space}*,[^\,]*)(Limit|Simple)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*ListBox\p{space}*,[^\,]*)(Choose|Multi|ReadOnly|Sort|0x100)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*DateTime\p{space}*,[^\,]*,[^\,]*)(LongDate|Time|Choose|ChooseNone|Range|Right)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*MonthCal\p{space}*,[^\,]*)(Multi|Range|Colors|[48]|16)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*Slider\p{space}*,[^\,]*)(Buddy1|Buddy2|Center|Invert|Left|Line|NoTicks|Page|Range|Thick|TickInterval|ToolTip|Vertical)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*Progress\p{space}*,[^\,]*)(Background|Range|Smooth|Vertical|c(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua)|Background(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*(Tab[23]??)\p{space}*,[^\,]*)(Choose|Background|Buttons|Left|Right|Bottom|Wrap)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*ListView\p{space}*,[^\,]*)(AltSubmit|Background|Checked|Count|Grid|Hdr|LV|LV0x10|LV0x20|Multi|NoSortHdr|NoSort|ReadOnly|Sort|SortDesc|WantF2|Icon|Tile|IconSmall|List|Report|c(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGui\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?Add\p{space}*,\p{space}*TreeView\p{space}*,[^\,]*)(AltSubmit|Background|Buttons|Checked|HScroll|ImageList|Lines|ReadOnly|WantF2|c(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGuiControl\b\p{space}*,?\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?)(Text|Move|MoveDraw|Focus|Disable|Enable|Hide|Show|Delete|Choose|ChooseString|Font|Options)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGuiControl\b\p{space}*,?[^\,]*([\-\+]))(g|Redraw|AltSubmit|Choose|Disabled|Hidden|Left|Right|Center|Section|Tabstop|Wrap|VScroll|HScroll|Controls|BackgroundTrans|Background|Border|HwndOutputVar|Theme)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGuiControl\b\p{space}*,?[^\,]*([\-\+]))(Limit|Lowercase|Multi|Number|Password|ReadOnly|Uppercase|WantCtrlA|WantReturn|WantTab|Wrap|Horz|Left|Range|Wrap|16|0x80|Icon|Default|Check3|Checked|CheckedGray|Group|Checked|Choose|Uppercase|Lowercase|Sort|Limit|Simple|Choose|Multi|ReadOnly|Sort|0x100|LongDate|Time|Choose|ChooseNone|Range|Right|Multi|Range|Colors|[48]|16|Buddy1|Buddy2|Center|Invert|Left|Line|NoTicks|Page|Range|Thick|TickInterval|ToolTip|Vertical|Background|Range|Smooth|Vertical|Choose|Background|Buttons|Left|Right|Bottom|Wrap|AltSubmit|Background|Checked|Count|Grid|Hdr|LV|LV0x10|LV0x20|Multi|NoSortHdr|NoSort|ReadOnly|Sort|SortDesc|WantF2|Icon|Tile|IconSmall|List|Report|AltSubmit|Background|Buttons|Checked|HScroll|ImageList|Lines|ReadOnly|WantF2)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bGuiControlGet\b\p{space}*,?[^\,]+,\p{space}*(([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%):\p{space}*)?)(Pos|FocusV??|Enabled|Visible|Hwnd|Name)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bIf\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%)\p{space}+)(is\p{space}+(not\p{space}+)?(Integer|Float|Number|Digit|Xdigit|Alpha|Upper|Lower|Alnum|Space|Time|Date))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bIf\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+|%[\p{L}\p{M}\p{N}\p{Pc}]+%)\p{space}+(not\p{space}+)?)(between|contains|in)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bIfMsgBox\p{space}*,?\p{space}*)(Yes|No|OK|Cancel|Abort|Ignore|Retry|Continue|TryAgain|Timeout)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bInputBox\b\p{space}*,?[^\,]+,[^\,]+,[^\,]+,\p{space}*)(HIDE)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bLoop\b\p{space}*,?\p{space}*)(Files|Parse|Read|Reg)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bLoop\b\p{space}*,?\p{space}*Files\p{space}*,[^\,]+,\p{space}*)(DF?R?|DR?F?|FD?R?|FR?D?|RD?F?|RF?D?)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bLoop\b\p{space}*,?\p{space}*Parse\p{space}*,[^\,]+,\p{space}*)(CSV)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bLoop\b\p{space}*,?\p{space}*Reg\p{space}*,\p{space}*)(HK(?:EY_LOCAL_MACHINE|EY_USERS|EY_CURRENT_USER|EY_CLASSES_ROOT|EY_CURRENT_CONFIG|LM|U|CU|CR|CC))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bLoop\b\p{space}*,?\p{space}*Reg\p{space}*,[^\,]+,\p{space}*)(KV?R?|KR?V?|VK?R?|VR?K?|RK?V?|RV?K?)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bMenu\b\p{space}*,?\p{space}*)Tray\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bMenu\b\b\p{space}*,?[^\,]+,\p{space}*)(Add|Insert|Delete|DeleteAll|Rename|Check|Uncheck|ToggleCheck|Enable|Disable|ToggleEnable|Default|NoDefault|Standard|NoStandard|Icon|NoIcon|Tip|Show|Color|Click|MainWindow|NoMainWindow|UseErrorLevel)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bMouseClick(Drag)?\b\p{space}*,?\p{space}*)(L|Left|R|Right|M|Middle|X1|X2)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bPixelGetColor\b\p{space}*,?[^\,]+,[^\,]+,[^\,]+,[^\,]*)(Alt|Slow|RGB)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bPixelSearch\b\p{space}*,?[^\,]+,[^\,]+,[^\,]+,[^\,]+,[^\,]+,[^\,]+,[^\,]+,[^\,]+,[^\,]*)(Fast|RGB)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bProcess\b\p{space}*,?\p{space}*)(Exist|Close|List|Priority|Wait|WaitClose)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bProcess\b\p{space}*,?\p{space}*Priority\p{space}*,[^\,]+,\p{space}*)(L|Low|B|BelowNormal|N|Normal|A|AboveNormal|H|High|R|Realtime)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\b(Progress|SplashImage)\b\p{space}*,?\p{space}*)(Off|Show)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bProgress\b\p{space}*,?[^\,]*)(A|([BM])([12])?|T|Hide|(C[BTW])(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bRegDelete\b\p{space}*,?\p{space}*)(HK(?:EY_LOCAL_MACHINE|EY_USERS|EY_CURRENT_USER|EY_CLASSES_ROOT|EY_CURRENT_CONFIG|LM|U|CU|CR|CC))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bRegDelete\b\p{space}*,?[^\,]+,\p{space}*)(AHK_DEFAULT)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bRegRead\b\p{space}*,?[^\,]+,\p{space}*)(HK(?:EY_LOCAL_MACHINE|EY_USERS|EY_CURRENT_USER|EY_CLASSES_ROOT|EY_CURRENT_CONFIG|LM|U|CU|CR|CC))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bRegWrite\b\p{space}*,?\p{space}*)(REG_(?:SZ|EXPAND_SZ|MULTI_SZ|DWORD|BINARY))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bRegWrite\b\p{space}*,?[^\,]+,\p{space}*)(HK(?:EY_LOCAL_MACHINE|EY_USERS|EY_CURRENT_USER|EY_CLASSES_ROOT|EY_CURRENT_CONFIG|LM|U|CU|CR|CC))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\b(Run(?:|Wait))\b\p{space}*,?[^\,]+,[^\,]*,\p{space}*)(Max|Min|Hide|UseErrorLevel)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSendMode\b\p{space}*,?\p{space}*)(Event|Input|InputThenPlay|Play)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\b(Set(?:Caps|Num|Scroll)LockState)\b\p{space}*,?\p{space}*)(On|Off|AlwaysOn|AlwaysOff)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSetFormat\b\p{space}*,?\p{space}*)((?:Integer|Float)(?:|Fast))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSetFormat\b\p{space}*,?\p{space}*(Integer(?:|Fast))\p{space}*,\p{space}*)([DH]|HEX)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSetMouseDelay\b\p{space}*,?[^\,]+,\p{space}*)(Play)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSetKeyDelay\b\p{space}*,?[^\,]+,[^\,]+,\p{space}*)(Play)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSetRegView\b\p{space}*,?\p{space}*)(32|64|Default)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSetTimer\b\p{space}*,?[^\,]*,\p{space}*)(On|Off|Delete)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSetTitleMatchMode\b\p{space}*,?\p{space}*)(RegEx|Fast|Slow)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSoundSet\b\p{space}*,?[^\,]+,\p{space}*)(MASTER|SPEAKERS|DIGITAL|LINE|MICROPHONE|SYNTH|CD|TELEPHONE|PCSPEAKER|WAVE|AUX|ANALOG|HEADPHONES|N\/A)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSoundSet\b\p{space}*,?[^\,]+,[^\,]*,\p{space}*)(VOLUME|VOL|ONOFF|MUTE|MONO|LOUDNESS|STEREOENH|BASSBOOST|PAN|QSOUNDPAN|BASS|TREBLE|EQUALIZER)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSplashImage\b\p{space}*,?[^\,]+,[^\,]*)(A|([BM])([12])?|T|Hide|(C[BTW])(Default|Black|Silver|Gray|White|Maroon|Red|Purple|Fuchsia|Green|Lime|Olive|Yellow|Navy|Blue|Teal|Aqua))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bStringCaseSense\b\p{space}*,?\p{space}*)(On|Off|Locale)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bSysGet\b\p{space}*,?[^\,]+,\p{space}*)(Monitor(?:Count|Primary||WorkArea|Name))\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bThread\b\p{space}*,?\p{space}*)(NoTimers|Priority|Interrupt)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bTransform\b\p{space}*,?[^\,]+,\p{space}*)(Unicode|Deref|HTML|Asc|Chr|Mod|Exp|Sqrt|Log|Ln|Round|Ceil|Floor|Abs|Sin|Cos|Tan|ASin|ACos|ATan|Pow|BitNot|BitAnd|BitOr|BitXOr|BitShiftLeft|BitShiftRight)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bWinGet\b\p{space}*,?[^\,]+,\p{space}*)(ID|IDLast|PID|ProcessName|ProcessPath|Count|List|MinMax|ControlList|ControlListHwnd|Transparent|TransColor|Style|ExStyle)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?<=\bWinSet\b\p{space}*,?\p{space}*)(AlwaysOnTop|Bottom|Top|Disable|Enable|Redraw|Style|ExStyle|Region|Transparent|TransColor)\b/dgiv,
          name: "keyword.other.ahk"
        },
        {
          match: /\b(?!MsgBox)(?<!\.)(?:[Ii][Ff]|[Ee][Ll][Ssſ][Ee]|[Ssſ][Ww][Ii][Tt][Cc][Hh]|[Cc][Aa][Ssſ][Ee]|[Rr][Ee][Tt][Uu][Rr][Nn]|[Ll][Oo][Oo][Pp]|[Bb][Rr][Ee][Aa][KKk]|[Ff][Oo][Rr]|[Ww][Hh][Ii][Ll][Ee]|[Cc][Ll][Aa][Ssſ][Ssſ]|[Ee][Xx][Tt][Ee][Nn][Dd][Ssſ]|[Cc][Aa][Tt][Cc][Hh]|[Ff][Ii][Nn][Aa][Ll][Ll][Yy]|[Tt][Hh][Rr][Oo][Ww]|[Tt][Rr][Yy]|[Uu][Nn][Tt][Ii][Ll]|[Cc][Oo][Nn][Tt][Ii][Nn][Uu][Ee]|[Cc][Rr][Ii][Tt][Ii][Cc][Aa][Ll]|[Ee][Xx][Ii][Tt]|[Ee][Xx][Ii][Tt][Aa][Pp][Pp])\b/dgv,
          name: "keyword.control.ahk"
        },
        {
          match: /\b((0([Xx])\p{AHex}*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))(([Ee])([\-\+])?[0-9]+)?)\b/dgv,
          name: "constant.numeric.ahk"
        },
        {
          match: /[\-\!\#\&\*\+\/\^\|\~]/dgv,
          name: "keyword.operator.arithmetic.ahk"
        },
        {
          match: /:=|\.=|=|::/dgv,
          name: "keyword.operator.assignment.ahk"
        },
        {
          match: /[\<\>]|<>|[\<\=\>]=|!=/dgv,
          name: "keyword.operator.comparison.ahk"
        }
      ]
    },
    punctuation: {
      patterns: [
        {
          match: /[\,\:\?\`]/dgv,
          name: "punctuation.ahk"
        },
        {
          match: /[\]\(\)\[\{\}]/dgv,
          name: "punctuation.bracket.ahk"
        },
        {
          match: /%/dgv,
          name: "punctuation.definition.variable.percent.ahk"
        }
      ]
    },
    "script-block": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.class.ahk" },
            "2": { name: "support.class.ahk" },
            "4": { name: "keyword.class.ahk" },
            "5": { name: "support.class.ahk" }
          },
          example: "class A extends B",
          match: /\b([Cc][Ll][Aa][Ssſ][Ssſ])\b\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*((extends)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?/dgv,
          name: "classline.ahk"
        },
        {
          captures: {
            "1": { name: "entity.name.function.label.ahk" },
            "2": { name: "comment.line.semicolon.label.ahk" }
          },
          example: "label:",
          match: /^\p{space}*([\p{L}\p{M}\p{N}\p{Pc}]+:)(\p{space}+;[^\n]*)?(?=\n?$)/dgv,
          name: "labelline.ahk"
        },
        {
          captures: {
            "1": { name: "support.function.ahk" },
            "2": { name: "entity.name.function.label.ahk" }
          },
          example: "Gosub label",
          match: /(Gosub)(?:\p{space}*,\p{space}*|\p{space}+)([\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv,
          name: "golabel.ahk"
        },
        {
          captures: {
            "1": { name: "entity.name.function.label.ahk" },
            "2": { name: "plaintext" }
          },
          example: "::hot::",
          match: / *(:[\*0bceiknprsz]{0,2}:[^\n]+::)([^\n]+)/dgiv,
          name: "hotstring.ahk"
        },
        {
          captures: {
            "1": { name: "entity.name.function.label.ahk" },
            "2": { name: "punctuation.definition.equals.colon" }
          },
          example: "^c::",
          match: /^\p{space}*([^"]+)(::)/dgv,
          name: "hotkeyline.ahk"
        }
      ]
    },
    string: {
      patterns: [
        {
          begin: /^\p{space}*\((?![^\n]*\))/dgv,
          end: /^\p{space}*\)/dgv,
          example: "I can't get mean.",
          name: "string.ahk"
        }
      ]
    },
    text: {
      patterns: [
        {
          match: /\b(?:autotrim|Exception|blockinput|click|clipwait|control|controlclick|controlfocus|controlget|controlgetfocus|controlgetpos|controlgettext|controlmove|controlsend|controlsendraw|controlsettext|coordmode|detecthiddentext|detecthiddenwindows|drive|driveget|drivespacefree|edit|envadd|envdiv|envget|envmult|envset|envsub|envupdate|fileappend|filecopy|filecopydir|filecreatedir|filecreateshortcut|filedelete|fileencoding|filegetattrib|filegetshortcut|filegetsize|filegettime|filegetversion|fileinstall|filemove|filemovedir|fileread|filereadline|filerecycle|filerecycleempty|fileremovedir|fileselectfile|fileselectfolder|filesetattrib|filesettime|formattime|getkeystate|gosub|goto|groupactivate|groupadd|groupclose|groupdeactivate|gui|guicontrol|guicontrolget|hotkey|ifequal|ifexist|ifgreater|ifgreaterorequal|ifinstring|ifless|iflessorequal|ifmsgbox|ifnotequal|ifnotexist|ifnotinstring|ifwinactive|ifwinexist|ifwinnotactive|ifwinnotexist|imagesearch|inidelete|iniread|iniwrite|input|inputbox|keyhistory|keywait|listhotkeys|listlines|listvars|menu|mouseclick|mouseclickdrag|mousegetpos|mousemove|msgbox|onexit|outputdebug|pause|pixelgetcolor|pixelsearch|postmessage|process|progress|random|regdelete|regread|regwrite|reload|run|runas|runwait|send|sendevent|sendinput|sendlevel|sendmessage|sendmode|sendplay|sendraw|setbatchlines|setcapslockstate|setcontroldelay|setdefaultmousespeed|setenv|setformat|setkeydelay|setmousedelay|setnumlockstate|setscrolllockstate|setstorecapslockmode|setregview|settimer|settitlematchmode|setwindelay|setworkingdir|shutdown|sleep|sort|soundbeep|soundget|soundgetwavevolume|soundplay|soundset|soundsetwavevolume|splashimage|splashtextoff|splashtexton|splitpath|statusbargettext|statusbarwait|stringcasesense|stringgetpos|stringleft|stringlen|stringlower|stringmid|stringreplace|stringright|stringsplit|stringtrimleft|stringtrimright|stringupper|suspend|sysget|thread|tooltip|transform|traytip|urldownloadtofile|winactivate|winactivatebottom|winclose|winget|wingetactivestats|wingetactivetitle|wingetclass|wingetpos|wingettext|wingettitle|winhide|winkill|winmaximize|winmenuselectitem|winminimize|winminimizeall|winminimizeallundo|winmove|winrestore|winset|winsettitle|winshow|winwait|winwaitactive|winwaitclose|winwaitnotactive)\b/dgiv,
          name: "support.function.ahk"
        },
        {
          match: new EmulatedRegExp("\\b(?!MsgBox)(?:[Aa][Bb][Ssſ]|[Pp][Uu][Ssſ][Hh]|[Ll][Ee][Nn][Gg][Tt][Hh]|[Rr][Ee][Mm][Oo][Vv][Ee][Aa][Tt]|[Cc][Oo][Uu][Nn][Tt]|[Ii][Nn][Ssſ][Ee][Rr][Tt][Aa][Tt]|[Oo][Bb][Jj][Gg][Ee][Tt][Cc][Aa][Pp][Aa][Cc][Ii][Tt][Yy]|[Oo][Bb][Jj][Rr][Ee][Mm][Oo][Vv][Ee][Aa][Tt]|[Oo][Bb][Jj][Ii][Nn][Ssſ][Ee][Rr][Tt][Aa][Tt]|[Ssſ][Tt][Rr][Rr][Ee][Pp][Ll][Aa][Cc][Ee]|[Oo][Bb][Jj][Dd][Ee][Ll][Ee][Tt][Ee]|[Aa][Cc][Oo][Ssſ]|[Aa][Ssſ][Cc]|[Aa][Ssſ][Ii][Nn]|[Aa][Tt][Aa][Nn]|[Cc][Ee][Ii][Ll]|[Cc][Hh][Rr]|[Cc][Oo][Ssſ]|[Oo][Bb][Jj][Aa][Dd][Dd][Rr][Ee][Ff]|[Oo][Bb][Jj][Rr][Ee][Ll][Ee][Aa][Ssſ][Ee]|[Cc][Oo][Mm][Oo][Bb][Jj][Ee][Cc][Tt]|[Cc][Oo][Mm][Oo][Bb][Jj][Cc][Rr][Ee][Aa][Tt][Ee]|[Cc][Oo][Mm][Oo][Bb][Jj][Aa][Cc][Tt][Ii][Vv][Ee]|[Cc][Oo][Mm][Oo][Bb][Jj][Aa][Rr][Rr][Aa][Yy]|[Cc][Oo][Mm][Oo][Bb][Jj][Cc][Oo][Nn][Nn][Ee][Cc][Tt]|[Cc][Oo][Mm][Oo][Bb][Jj][Ee][Nn][Ww][Rr][Aa][Pp]|[Cc][Oo][Mm][Oo][Bb][Jj][Ee][Rr][Rr][Oo][Rr]|[Cc][Oo][Mm][Oo][Bb][Jj][Ff][Ll][Aa][Gg][Ssſ]|[Cc][Oo][Mm][Oo][Bb][Jj][Gg][Ee][Tt]|[Cc][Oo][Mm][Oo][Bb][Jj][Mm][Ii][Ssſ][Ssſ][Ii][Nn][Gg]|[Cc][Oo][Mm][Oo][Bb][Jj][Pp][Aa][Rr][Aa][Mm][Ee][Tt][Ee][Rr]|[Cc][Oo][Mm][Oo][Bb][Jj][Qq][Uu][Ee][Rr][Yy]|[Cc][Oo][Mm][Oo][Bb][Jj][Tt][Yy][Pp][Ee]|[Cc][Oo][Mm][Oo][Bb][Jj][Uu][Nn][Ww][Rr][Aa][Pp]|[Cc][Oo][Mm][Oo][Bb][Jj][Vv][Aa][Ll][Uu][Ee]|[Dd][Ll][Ll][Cc][Aa][Ll][Ll]|[Ee][Xx][Pp]|[Ff][Ii][Ll][Ee][Ee][Xx][Ii][Ssſ][Tt]|[Ff][Ii][Ll][Ee][Oo][Pp][Ee][Nn]|[Ff][Ll][Oo][Oo][Rr]|[Ff][Oo][Rr][Mm][Aa][Tt]|[Ff][Uu][Nn][Cc]|[Gg][Ee][Tt][KKk][Ee][Yy][Nn][Aa][Mm][Ee]|[Gg][Ee][Tt][KKk][Ee][Yy][Vv][KKk]|[Gg][Ee][Tt][KKk][Ee][Yy][Ssſ][Cc]|[Gg][Ee][Tt][KKk][Ee][Yy][Ssſ][Tt][Aa][Tt][Ee]|[Ii][Ll]_[Aa][Dd][Dd]|[Ii][Ll]_[Cc][Rr][Ee][Aa][Tt][Ee]|[Ii][Ll]_[Dd][Ee][Ssſ][Tt][Rr][Oo][Yy]|[Ii][Nn][Ssſ][Tt][Rr]|[Ii][Ssſ][Bb][Yy][Rr][Ee][Ff]|[Ii][Ssſ][Ff][Uu][Nn][Cc]|[Ii][Ssſ][Ll][Aa][Bb][Ee][Ll]|[Ii][Ssſ][Oo][Bb][Jj][Ee][Cc][Tt]|[Ll][Nn]|[Ll][Oo][Gg]|[Ll][Tt][Rr][Ii][Mm]|[Ll][Vv]_[Aa][Dd][Dd]|[Ll][Vv]_[Dd][Ee][Ll][Ee][Tt][Ee]|[Ll][Vv]_[Dd][Ee][Ll][Ee][Tt][Ee][Cc][Oo][Ll]|[Ll][Vv]_[Gg][Ee][Tt][Cc][Oo][Uu][Nn][Tt]|[Ll][Vv]_[Gg][Ee][Tt][Nn][Ee][Xx][Tt]|[Ll][Vv]_[Gg][Ee][Tt][Tt][Ee][Xx][Tt]|[Ll][Vv]_[Ii][Nn][Ssſ][Ee][Rr][Tt]|[Ll][Vv]_[Ii][Nn][Ssſ][Ee][Rr][Tt][Cc][Oo][Ll]|[Ll][Vv]_[Mm][Oo][Dd][Ii][Ff][Yy]|[Ll][Vv]_[Mm][Oo][Dd][Ii][Ff][Yy][Cc][Oo][Ll]|[Ll][Vv]_[Ssſ][Ee][Tt][Ii][Mm][Aa][Gg][Ee][Ll][Ii][Ssſ][Tt]|[Mm][Oo][Dd]|[Oo][Nn][Mm][Ee][Ssſ][Ssſ][Aa][Gg][Ee]|[Nn][Uu][Mm][Gg][Ee][Tt]|[Nn][Uu][Mm][Pp][Uu][Tt]|[Rr][Ee][Gg][Ee][Xx][Mm][Aa][Tt][Cc][Hh]|[Rr][Ee][Gg][Ee][Xx][Rr][Ee][Pp][Ll][Aa][Cc][Ee]|[Rr][Ee][Gg][Ii][Ssſ][Tt][Ee][Rr][Cc][Aa][Ll][Ll][Bb][Aa][Cc][KKk]|[Rr][Oo][Uu][Nn][Dd]|[Rr][Tt][Rr][Ii][Mm]|[Ssſ][Bb]_[Ssſ][Ee][Tt][Ii][Cc][Oo][Nn]|[Ssſ][Bb]_[Ssſ][Ee][Tt][Pp][Aa][Rr][Tt][Ssſ]|[Ssſ][Bb]_[Ssſ][Ee][Tt][Tt][Ee][Xx][Tt]|[Ssſ][Ii][Nn]|[Ssſ][Qq][Rr][Tt]|[Ssſ][Tt][Rr][Gg][Ee][Tt]|[Ssſ][Tt][Rr][Ll][Ee][Nn]|[Ssſ][Tt][Rr][Pp][Uu][Tt]|[Ssſ][Tt][Rr][Ssſ][Pp][Ll][Ii][Tt]|[Ssſ][Uu][Bb][Ssſ][Tt][Rr]|[Tt][Aa][Nn]|[Tt][Rr][Ii][Mm]|[Tt][Vv]_[Aa][Dd][Dd]|[Tt][Vv]_[Dd][Ee][Ll][Ee][Tt][Ee]|[Tt][Vv]_[Gg][Ee][Tt][Cc][Hh][Ii][Ll][Dd]|[Tt][Vv]_[Gg][Ee][Tt][Cc][Oo][Uu][Nn][Tt]|[Tt][Vv]_[Gg][Ee][Tt][Nn][Ee][Xx][Tt]|[Tt][Vv]_[Gg][Ee][Tt]|[Tt][Vv]_[Gg][Ee][Tt][Pp][Aa][Rr][Ee][Nn][Tt]|[Tt][Vv]_[Gg][Ee][Tt][Pp][Rr][Ee][Vv]|[Tt][Vv]_[Gg][Ee][Tt][Ssſ][Ee][Ll][Ee][Cc][Tt][Ii][Oo][Nn]|[Tt][Vv]_[Gg][Ee][Tt][Tt][Ee][Xx][Tt]|[Tt][Vv]_[Mm][Oo][Dd][Ii][Ff][Yy]|[Vv][Aa][Rr][Ssſ][Ee][Tt][Cc][Aa][Pp][Aa][Cc][Ii][Tt][Yy]|[Ww][Ii][Nn][Aa][Cc][Tt][Ii][Vv][Ee]|[Ww][Ii][Nn][Ee][Xx][Ii][Ssſ][Tt])(?=\\()\\b", "dgv", { lazyCompile: true }),
          name: "support.function.ahk"
        },
        {
          match: /\b(?!MsgBox)(?<=\.)(?:[Rr][Ee][Aa][Dd]|[Ww][Rr][Ii][Tt][Ee]|[Rr][Ee][Aa][Dd][Ll][Ii][Nn][Ee]|[Ww][Rr][Ii][Tt][Ee][Ll][Ii][Nn][Ee]|[Rr][Ee][Aa][Dd][Uu][Ii][Nn][Tt]|[Rr][Ee][Aa][Dd][Ii][Nn][Tt]|[Rr][Ee][Aa][Dd][Ii][Nn][Tt]64|[Rr][Ee][Aa][Dd][Ssſ][Hh][Oo][Rr][Tt]|[Rr][Ee][Aa][Dd][Uu][Ssſ][Hh][Oo][Rr][Tt]|[Rr][Ee][Aa][Dd][Cc][Hh][Aa][Rr]|[Rr][Ee][Aa][Dd][Uu][Cc][Hh][Aa][Rr]|[Rr][Ee][Aa][Dd][Dd][Oo][Uu][Bb][Ll][Ee]|[Rr][Ee][Aa][Dd][Ff][Ll][Oo][Aa][Tt]|[Ww][Rr][Ii][Tt][Ee][Uu][Ii][Nn][Tt]|[Ww][Rr][Ii][Tt][Ee][Ii][Nn][Tt]|[Ww][Rr][Ii][Tt][Ee][Ii][Nn][Tt]64|[Ww][Rr][Ii][Tt][Ee][Ssſ][Hh][Oo][Rr][Tt]|[Ww][Rr][Ii][Tt][Ee][Uu][Ssſ][Hh][Oo][Rr][Tt]|[Ww][Rr][Ii][Tt][Ee][Cc][Hh][Aa][Rr]|[Ww][Rr][Ii][Tt][Ee][Uu][Cc][Hh][Aa][Rr]|[Ww][Rr][Ii][Tt][Ee][Dd][Oo][Uu][Bb][Ll][Ee]|[Ww][Rr][Ii][Tt][Ee][Ff][Ll][Oo][Aa][Tt]|[Rr][Aa][Ww][Rr][Ee][Aa][Dd]|[Rr][Aa][Ww][Ww][Rr][Ii][Tt][Ee]|[Ssſ][Ee][Ee][KKk]|[Tt][Ee][Ll][Ll]|[Cc][Ll][Oo][Ssſ][Ee]|[Ii][Nn][Ssſ][Ee][Rr][Tt]|[Rr][Ee][Mm][Oo][Vv][Ee]|[Mm][Ii][Nn][Ii][Nn][Dd][Ee][Xx]|[Mm][Aa][Xx][Ii][Nn][Dd][Ee][Xx]|[Ssſ][Ee][Tt][Cc][Aa][Pp][Aa][Cc][Ii][Tt][Yy]|[Gg][Ee][Tt][Cc][Aa][Pp][Aa][Cc][Ii][Tt][Yy]|[Gg][Ee][Tt][Aa][Dd][Dd][Rr][Ee][Ssſ][Ssſ]|[Nn][Ee][Ww][Ee][Nn][Uu][Mm]|[Hh][Aa][Ssſ][KKk][Ee][Yy]|[Cc][Ll][Oo][Nn][Ee]|[Ii][Ssſ][Oo][Pp][Tt][Ii][Oo][Nn][Aa][Ll]|__[Nn][Ee][Ww]|__[Cc][Aa][Ll][Ll]|__[Gg][Ee][Tt]|__[Ssſ][Ee][Tt]|__[Dd][Ee][Ll][Ee][Tt][Ee])(?=\()\b/dgv,
          name: "support.function.ahk"
        },
        {
          example: "fun(",
          match: /\b(?!MsgBox)[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*(?=\()/dgv,
          name: "entity.name.function.ahk"
        },
        {
          begin: /(")/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.ahk" }
          },
          end: /(")(?!")|^/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.ahk" }
          },
          example: "\"string\"",
          name: "string.quoted.double.ahk",
          patterns: [
            {
              match: /""/dgv,
              name: "constant.character.escape.ahk"
            }
          ]
        },
        {
          match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
          name: "variable.def.ahk"
        }
      ]
    }
  },
  dependencies: []
};
