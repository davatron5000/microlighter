export default {
  name: "bat",
  displayName: "Batch File",
  aliases: [
    "batch",
    "cmd"
  ],
  scopeName: "source.batchfile",
  patterns: [
    { include: "#commands" },
    { include: "#comments" },
    { include: "#constants" },
    { include: "#controls" },
    { include: "#escaped_characters" },
    { include: "#labels" },
    { include: "#numbers" },
    { include: "#operators" },
    { include: "#parens" },
    { include: "#strings" },
    { include: "#variables" }
  ],
  repository: {
    command_set: {
      patterns: [
        {
          begin: /(?<=^|[\@\p{space}])SET(?=(?=\n?$)|\p{space})/dgiv,
          beginCaptures: {
            "0": { name: "keyword.command.batchfile" }
          },
          end: /(?=(?=\n?$)\n|[\&\)\<\>\|])/dgv,
          patterns: [
            { include: "#command_set_inside" }
          ]
        }
      ]
    },
    command_set_group: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.group.begin.batchfile" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.group.end.batchfile" }
          },
          patterns: [
            { include: "#command_set_inside_arithmetic" }
          ]
        }
      ]
    },
    command_set_inside: {
      patterns: [
        { include: "#escaped_characters" },
        { include: "#variables" },
        { include: "#numbers" },
        { include: "#parens" },
        { include: "#command_set_strings" },
        { include: "#strings" },
        {
          begin: /([^ ][^\=]*)(=)/dgv,
          beginCaptures: {
            "1": { name: "variable.other.readwrite.batchfile" },
            "2": { name: "keyword.operator.assignment.batchfile" }
          },
          end: /(?=(?=\n?$)\n|[\&\)\<\>\|])/dgv,
          patterns: [
            { include: "#escaped_characters" },
            { include: "#variables" },
            { include: "#numbers" },
            { include: "#parens" },
            { include: "#strings" }
          ]
        },
        {
          begin: /\p{space}+\/[Aa]\p{space}+/dgv,
          end: /(?=(?=\n?$)\n|[\&\)\<\>\|])/dgv,
          name: "meta.expression.set.batchfile",
          patterns: [
            {
              begin: /"/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.string.begin.batchfile" }
              },
              end: /"/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.string.end.batchfile" }
              },
              name: "string.quoted.double.batchfile",
              patterns: [
                { include: "#command_set_inside_arithmetic" },
                { include: "#command_set_group" },
                { include: "#variables" }
              ]
            },
            { include: "#command_set_inside_arithmetic" },
            { include: "#command_set_group" }
          ]
        },
        {
          begin: /\p{space}+\/[Pp]\p{space}+/dgv,
          end: /(?=(?=\n?$)\n|[\&\)\<\>\|])/dgv,
          patterns: [
            { include: "#command_set_strings" },
            {
              begin: /([^ ][^\=]*)(=)/dgv,
              beginCaptures: {
                "1": { name: "variable.other.readwrite.batchfile" },
                "2": { name: "keyword.operator.assignment.batchfile" }
              },
              end: /(?=(?=\n?$)\n|[\&\)\<\>\|])/dgv,
              name: "meta.prompt.set.batchfile",
              patterns: [
                { include: "#strings" }
              ]
            }
          ]
        }
      ]
    },
    command_set_inside_arithmetic: {
      patterns: [
        { include: "#command_set_operators" },
        { include: "#numbers" },
        {
          match: /,/dgv,
          name: "punctuation.separator.batchfile"
        }
      ]
    },
    command_set_operators: {
      patterns: [
        {
          captures: {
            "1": { name: "variable.other.readwrite.batchfile" },
            "2": { name: "keyword.operator.assignment.augmented.batchfile" }
          },
          match: /([^ ]*)((?:[\-\*\+\/]|%%|[\&\^\|]|<<|>>)=)/dgv
        },
        {
          match: /[\-\*\+\/]|%%|[\&\^\|]|<<|>>|~/dgv,
          name: "keyword.operator.arithmetic.batchfile"
        },
        {
          match: /!/dgv,
          name: "keyword.operator.logical.batchfile"
        },
        {
          captures: {
            "1": { name: "variable.other.readwrite.batchfile" },
            "2": { name: "keyword.operator.assignment.batchfile" }
          },
          match: /([^ \=]*)(=)/dgv
        }
      ]
    },
    command_set_strings: {
      patterns: [
        {
          begin: /(")\p{space}*([^ ][^\=]*)(=)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.batchfile" },
            "2": { name: "variable.other.readwrite.batchfile" },
            "3": { name: "keyword.operator.assignment.batchfile" }
          },
          end: /"/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.batchfile" }
          },
          name: "string.quoted.double.batchfile",
          patterns: [
            { include: "#variables" },
            { include: "#numbers" },
            { include: "#escaped_characters" }
          ]
        }
      ]
    },
    commands: {
      patterns: [
        {
          match: /(?<=^|[\@\p{space}])(?:adprep|append|arp|assoc|at|atmadm|attrib|auditpol|autochk|autoconv|autofmt|bcdboot|bcdedit|bdehdcfg|bitsadmin|bootcfg|brea|cacls|cd|certreq|certutil|change|chcp|chdir|chglogon|chgport|chgusr|chkdsk|chkntfs|choice|cipher|clip|cls|clscluadmin|cluster|cmd|cmdkey|cmstp|color|comp|compact|convert|copy|cprofile|cscript|csvde|date|dcdiag|dcgpofix|dcpromo|defra|del|dfscmd|dfsdiag|dfsrmig|diantz|dir|dirquota|diskcomp|diskcopy|diskpart|diskperf|diskraid|diskshadow|dispdiag|doin|dnscmd|doskey|driverquery|dsacls|dsadd|dsamain|dsdbutil|dsget|dsmgmt|dsmod|dsmove|dsquery|dsrm|edit|endlocal|eraseesentutl|eventcreate|eventquery|eventtriggers|evntcmd|expand|extract|fc|filescrn|find|findstr|finger|flattemp|fonde|forfiles|format|freedisk|fsutil|ftp|ftype|fveupdate|getmac|gettype|gpfixup|gpresult|gpupdate|graftabl|hashgen|hep|helpctr|hostname|icacls|iisreset|inuse|ipconfig|ipxroute|irftp|ismserv|jetpack|klist|ksetup|ktmutil|ktpass|label|ldifd|ldp|lodctr|logman|logoff|lpq|lpr|macfile|makecab|manage-bde|mapadmin|md|mkdir|mklink|mmc|mode|more|mount|mountvol|move|mqbup|mqsvc|mqtgsvc|msdt|msg|msiexec|msinfo32|mstsc|nbtstat|net computer|net group|net localgroup|net print|net session|net share|net start|net stop|net user??|net view|net|netcfg|netdiag|netdom|netsh|netstat|nfsadmin|nfsshare|nfsstat|nlb|nlbmgr|nltest|nslookup|ntackup|ntcmdprompt|ntdsutil|ntfrsutl|openfiles|pagefileconfig|path|pathping|pause|pbadmin|pentnt|perfmon|ping|pnpunatten|pnputil|popd|powercfg|powershell|powershell_ise|print|prncnfg|prndrvr|prnjobs|prnmngr|prnport|prnqctl|prompt|pubprn|pushd|pushprinterconnections|pwlauncher|qappsrv|qprocess|query|quser|qwinsta|rasdial|rcp|rd|rdpsign|regentc|recover|redircmp|redirusr|reg|regini|regsvr32|relog|ren|rename|rendom|repadmin|repair-bde|replace|reset session|rxec|risetup|rmdir|robocopy|route|rpcinfo|rpcping|rsh|runas|rundll32|rwinsta|sc|schtasks|scp|scwcmd|secedit|serverceipoptin|servrmanagercmd|serverweroptin|setspn|setx|sfc|sftp|shadow|shift|showmount|shutdown|sort|ssh|ssh-add|ssh-agent|ssh-keygen|ssh-keyscan|start|storrept|subst|sxstrace|ysocmgr|systeminfo|takeown|tapicfg|taskkill|tasklist|tcmsetup|telnet|tftp|time|timeout|title|tlntadmn|tpmvscmgr|tacerpt|tracert|tree|tscon|tsdiscon|tsecimp|tskill|tsprof|type|typeperf|tzutil|uddiconfig|umount|unlodctr|ver|verifier|verif|vol|vssadmin|w32tm|waitfor|wbadmin|wdsutil|wecutil|wevtutil|where|whoami|winnt|winnt32|winpop|winrm|winrs|winsat|wlbs|wmic|wscript|wsl|xcopy)(?=(?=\n?$)|\p{space})/dgiv,
          name: "keyword.command.batchfile"
        },
        {
          begin: /(?<=^|[\@\p{space}])(echo)(?:(?=(?=\n?$)|[\.\:])|\p{space}+(?:(o(?:n|ff))(?=\p{space}*(?=\n?$)))?)/dgiv,
          beginCaptures: {
            "1": { name: "keyword.command.batchfile" },
            "2": { name: "keyword.other.special-method.batchfile" }
          },
          end: /(?=(?=\n?$)\n|[\&\)\<\>\|])/dgv,
          patterns: [
            { include: "#escaped_characters" },
            { include: "#variables" },
            { include: "#numbers" },
            { include: "#strings" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.command.batchfile" },
            "2": { name: "keyword.other.special-method.batchfile" }
          },
          match: /(?<=^|[\@\p{space}])(setlocal)(?:\p{space}*(?=\n?$)|\p{space}+((?:En|Dis)able(?:Extensions|DelayedExpansion))(?=\p{space}*(?=\n?$)))/dgiv
        },
        { include: "#command_set" }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /(?:^|(&))\p{space}*(?=(:[ \+\,\:\;\=]))/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.conditional.batchfile" }
          },
          end: /\n/dgv,
          patterns: [
            {
              begin: /(:[ \+\,\:\;\=])/dgv,
              beginCaptures: {
                "1": { name: "punctuation.definition.comment.batchfile" }
              },
              end: /(?=\n)/dgv,
              name: "comment.line.colon.batchfile"
            }
          ]
        },
        {
          begin: /(?<=^|[\@\p{space}])(REM)(\.)/dgiv,
          beginCaptures: {
            "1": { name: "keyword.command.rem.batchfile" },
            "2": { name: "punctuation.separator.batchfile" }
          },
          end: /(?=(?=\n?$)\n|[\&\)\<\>\|])/dgv,
          name: "comment.line.rem.batchfile"
        },
        {
          begin: /(?<=^|[\@\p{space}])rem\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.command.rem.batchfile" }
          },
          end: /\n/dgv,
          name: "comment.line.rem.batchfile",
          patterns: [
            {
              match: /[\<\>\|]/dgv,
              name: "invalid.illegal.unexpected-character.batchfile"
            }
          ]
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\bNUL\b/dgiv,
          name: "constant.language.batchfile"
        }
      ]
    },
    controls: {
      patterns: [
        {
          match: /(?<=^|\p{space})(?:call|exit(?=(?=\n?$)|\p{space})|goto(?=(?=\n?$)|[\:\p{space}]))/dgiv,
          name: "keyword.control.statement.batchfile"
        },
        {
          captures: {
            "1": { name: "keyword.control.conditional.batchfile" },
            "2": { name: "keyword.operator.logical.batchfile" },
            "3": { name: "keyword.other.special-method.batchfile" }
          },
          match: /(?<=^|\p{space})(if)\p{space}+(?:(not)\p{space}+)?(exist|defined|errorlevel|cmdextversion)(?=\p{space})/dgiv
        },
        {
          match: /(?<=^|\p{space})(?:if|else)(?=(?=\n?$)|\p{space})/dgiv,
          name: "keyword.control.conditional.batchfile"
        },
        {
          begin: /(?<=^|[\&\(\^\p{space}])for(?=\p{space})/dgiv,
          beginCaptures: {
            "0": { name: "keyword.control.repeat.batchfile" }
          },
          end: /\n/dgv,
          name: "meta.block.repeat.batchfile",
          patterns: [
            {
              begin: /(?<=[\^\p{space}])in(?=\p{space})/dgiv,
              beginCaptures: {
                "0": { name: "keyword.control.repeat.in.batchfile" }
              },
              end: /(?<=[\)\^\p{space}])do(?=\p{space})|\n/dgiv,
              endCaptures: {
                "0": { name: "keyword.control.repeat.do.batchfile" }
              },
              patterns: [
                { include: "$self" }
              ]
            },
            { include: "$self" }
          ]
        }
      ]
    },
    escaped_characters: {
      patterns: [
        {
          match: /%%|\^\^!|\^(?=[^\n])|\^\n/dgv,
          name: "constant.character.escape.batchfile"
        }
      ]
    },
    labels: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.batchfile" },
            "2": { name: "keyword.other.special-method.batchfile" }
          },
          match: /(?:^\p{space}*|(?<=call|goto)\p{space}*)(:)([^\+\,\:\;\=\p{space}]\P{space}*)/dgiv
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /(?<=^|[\=\p{space}])(0[Xx]\p{AHex}*|[\-\+]?\p{Nd}+)(?=(?=\n?$)|[\<\>\p{space}])/dgv,
          name: "constant.numeric.batchfile"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /@(?=\P{space})/dgv,
          name: "keyword.operator.at.batchfile"
        },
        {
          match: /(?<=\p{space})(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)(?=\p{space})|==/dgiv,
          name: "keyword.operator.comparison.batchfile"
        },
        {
          match: /(?<=\p{space})(NOT)(?=\p{space})/dgiv,
          name: "keyword.operator.logical.batchfile"
        },
        {
          match: /(?<!\^)&&?|\|\|/dgv,
          name: "keyword.operator.conditional.batchfile"
        },
        {
          match: /(?<!\^)\|/dgv,
          name: "keyword.operator.pipe.batchfile"
        },
        {
          match: /<&?|>[\&\>]?/dgv,
          name: "keyword.operator.redirection.batchfile"
        }
      ]
    },
    parens: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.group.begin.batchfile" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.group.end.batchfile" }
          },
          name: "meta.group.batchfile",
          patterns: [
            {
              match: /[\,\;]/dgv,
              name: "punctuation.separator.batchfile"
            },
            { include: "$self" }
          ]
        }
      ]
    },
    repeatParameter: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.variable.batchfile" }
          },
          match: /(%%)(?:~[AaDdFfNnPpSsſTtXxZz]*(?:\$[Pp][Aa][Tt][Hh]:)?)?[A-Za-z]/dgv,
          name: "variable.parameter.repeat.batchfile"
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.batchfile" }
          },
          end: /(")|(\n)/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.batchfile" },
            "2": { name: "invalid.illegal.newline.batchfile" }
          },
          name: "string.quoted.double.batchfile",
          patterns: [
            {
              match: /%%/dgv,
              name: "constant.character.escape.batchfile"
            },
            { include: "#variables" }
          ]
        }
      ]
    },
    variable: {
      patterns: [
        {
          begin: /%(?=[^\%]+%)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.variable.begin.batchfile" }
          },
          end: /(%)|\n/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.variable.end.batchfile" }
          },
          name: "variable.other.readwrite.batchfile",
          patterns: [
            {
              begin: /:~/dgv,
              beginCaptures: {
                "0": { name: "punctuation.separator.batchfile" }
              },
              end: /(?=[\n\%])/dgv,
              name: "meta.variable.substring.batchfile",
              patterns: [
                { include: "#variable_substring" }
              ]
            },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "punctuation.separator.batchfile" }
              },
              end: /(?=[\n\%])/dgv,
              name: "meta.variable.substitution.batchfile",
              patterns: [
                { include: "#variable_replace" },
                {
                  begin: /=/dgv,
                  beginCaptures: {
                    "0": { name: "punctuation.separator.batchfile" }
                  },
                  end: /(?=[\n\%])/dgv,
                  patterns: [
                    { include: "#variable_delayed_expansion" },
                    {
                      match: /[^\%]+/dgv,
                      name: "string.unquoted.batchfile"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    variable_delayed_expansion: {
      patterns: [
        {
          begin: /!(?=[^\!]+!)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.variable.begin.batchfile" }
          },
          end: /(!)|\n/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.variable.end.batchfile" }
          },
          name: "variable.other.readwrite.batchfile",
          patterns: [
            {
              begin: /:~/dgv,
              beginCaptures: {
                "0": { name: "punctuation.separator.batchfile" }
              },
              end: /(?=[\n\!])/dgv,
              name: "meta.variable.substring.batchfile",
              patterns: [
                { include: "#variable_substring" }
              ]
            },
            {
              begin: /:/dgv,
              beginCaptures: {
                "0": { name: "punctuation.separator.batchfile" }
              },
              end: /(?=[\n\!])/dgv,
              name: "meta.variable.substitution.batchfile",
              patterns: [
                { include: "#escaped_characters" },
                { include: "#variable_replace" },
                { include: "#variable" },
                {
                  begin: /=/dgv,
                  beginCaptures: {
                    "0": { name: "punctuation.separator.batchfile" }
                  },
                  end: /(?=[\n\!])/dgv,
                  patterns: [
                    { include: "#variable" },
                    {
                      match: /[^\!]+/dgv,
                      name: "string.unquoted.batchfile"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    variable_replace: {
      patterns: [
        {
          match: /[^\n\!\%\=]+/dgv,
          name: "string.unquoted.batchfile"
        }
      ]
    },
    variable_substring: {
      patterns: [
        {
          captures: {
            "1": { name: "constant.numeric.batchfile" },
            "2": { name: "punctuation.separator.batchfile" },
            "3": { name: "constant.numeric.batchfile" }
          },
          match: /([\-\+]?\p{Nd}+)(?:(,)([\-\+]?\p{Nd}+))?/dgv
        }
      ]
    },
    variables: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.variable.batchfile" }
          },
          match: /(%)(?:(?:~[adfnpstxz]*(?:\$PATH:)?)?\p{Nd}|\*)/dgiv,
          name: "variable.parameter.batchfile"
        },
        { include: "#variable" },
        { include: "#variable_delayed_expansion" }
      ]
    }
  },
  injections: {
    "L:meta.block.repeat.batchfile": {
      patterns: [
        { include: "#repeatParameter" }
      ]
    }
  },
  dependencies: []
};
