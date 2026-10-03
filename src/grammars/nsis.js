export default {
  name: "nsis",
  displayName: "NSIS",
  scopeName: "source.nsis",
  patterns: [
    {
      captures: {
        "1": { name: "keyword.nsis" },
        "2": { name: "entity.name.function.nsis" }
      },
      match: /^\p{space}*(Function)\p{space}+(\.?[\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.other.nsis" },
        "2": { name: "entity.name.function.macro.nsis" }
      },
      match: /^\p{space}*(!macro)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.other.nsis" },
        "2": { name: "entity.name.constant.define.nsis" }
      },
      match: /^\p{space}*(!define)\p{space}+(?:\/[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}+)*([\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.nsis" },
        "2": { name: "entity.name.variable.nsis" }
      },
      match: /^\p{space}*(Var)\p{space}+(?:\/GLOBAL\p{space}+)?"?([\p{L}\p{M}\p{N}\p{Pc}]+)"?/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.nsis" },
        "2": { name: "string.quoted.double.nsis" },
        "3": { name: "string.quoted.single.nsis" },
        "4": { name: "string.quoted.back.nsis" },
        "5": { name: "entity.name.section.nsis" }
      },
      match: /^\p{space}*(Section(?:Group)?)\p{space}+(?:\/[eo]\p{space}+)?(?:("[^"]*")|('[^']*')|(`[^\`]*`))\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.nsis" },
        "2": { name: "entity.name.section.nsis string.quoted.double.nsis" },
        "3": { name: "entity.name.section.nsis string.quoted.single.nsis" },
        "4": { name: "entity.name.section.nsis string.quoted.back.nsis" },
        "5": { name: "entity.name.section.nsis" }
      },
      match: /^\p{space}*(Section(?:Group)?)\p{space}+(?:\/[eo]\p{space}+)?(?:"([^"]+)"|'([^']+)'|`([^\`]+)`|([\-\.\p{L}\p{M}\p{N}\p{Pc}]+))\p{space}*(?=\n?$)/dgiv
    },
    {
      match: /^\p{space}*(Abort|AddBrandingImage|AddSize|AllowRootDirInstall|AllowSkipFiles|AutoCloseWindow|BGFont|BGGradient|BrandingText|BringToFront|Call|CallInstDLL|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CPU|CRCCheck|CreateDirectory|CreateFont|CreateShortCut|Delete|DeleteINISec|DeleteINIStr|DeleteRegKey|DeleteRegValue|DetailPrint|DetailsButtonText|DirText|DirVar|DirVerify|EnableWindow|EnumRegKey|EnumRegValue|Exch|Exec|ExecShell|ExecShellWait|ExecWait|ExpandEnvStrings|File|FileBufSize|FileClose|FileErrorText|FileOpen|FileRead|FileReadByte|FileReadUTF16LE|FileReadWord|FileWriteUTF16LE|FileSeek|FileWrite|FileWriteByte|FileWriteWord|FindClose|FindFirst|FindNext|FindWindow|FlushINI|Function(End)?|GetCurInstType|GetCurrentAddress|GetDlgItem|GetDLLVersion|GetDLLVersionLocal|GetErrorLevel|GetFileTime|GetFileTimeLocal|GetFullPathName|GetFunctionAddress|GetInstDirError|GetKnownFolderPath|GetLabelAddress|GetRegView|GetShellVarContext|GetTempFileName|GetWinVer|Goto|HideWindow|Icon|IfAbort|IfAltRegView|IfErrors|IfFileExists|IfRebootFlag|IfRtlLanguage|IfShellVarContextAll|IfSilent|InitPluginsDir|InstallButtonText|InstallColors|InstallDir|InstallDirRegKey|InstProgressFlags|InstType|InstTypeGetText|InstTypeSetText|Int64CmpU??|Int64Fmt|IntCmpU??|IntFmt|IntOp|IntPtrCmpU??|IntPtrOp|IsWindow|LangString|LicenseBkColor|LicenseData|LicenseForceSelection|LicenseLangString|LicenseText|LoadAndSetImage|LoadLanguageFile|LockWindow|LogSet|LogText|ManifestAppendCustomString|ManifestDisableWindowFiltering|ManifestDPIAware|ManifestGdiScaling|ManifestLongPathAware|ManifestMaxVersionTested|ManifestSupportedOS|MessageBox|MiscButtonText|Name|Nop|OutFile|Page|PageCallbacks|PageEx(End)?|PEAddResource|PEDllCharacteristics|PERemoveResource|PESubsysVer|Pop|Push|Quit|ReadEnvStr|ReadINIStr|ReadMemory|ReadRegDWORD|ReadRegStr|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|Section(End)?|SectionGroup(End)?|SectionGetFlags|SectionGetInstTypes|SectionGetSize|SectionGetText|SectionIn|SectionSetFlags|SectionSetInstTypes|SectionSetSize|SectionSetText|SendMessage|SetAutoClose|SetBrandingImage|SetCompress|SetCompressionLevel|SetCompressor|SetCompressorDictSize|SetCtlColors|SetCurInstType|SetDatablockOptimize|SetDateSave|SetDetailsPrint|SetDetailsView|SetErrorLevel|SetErrors|SetFileAttributes|SetFont|SetOutPath|SetOverwrite|SetRebootFlag|SetRegView|SetShellVarContext|SetSilent|ShowInstDetails|ShowUninstDetails|ShowWindow|SilentInstall|SilentUnInstall|Sleep|SpaceTexts|StrCmpS??|StrCpy|StrLen|SubCaption|Target|Unicode|UninstallButtonText|UninstallCaption|UninstallIcon|UninstallSubCaption|UninstallText|UninstPage|UnRegDLL|UnsafeStrCpy|Var|VIAddVersionKey|VIFileVersion|VIProductVersion|WindowIcon|WriteINIStr|WriteRegBin|WriteRegDWORD|WriteRegExpandStr|WriteRegMultiStr|WriteRegNone|WriteRegStr|WriteUninstaller|XPStyle)\b/dgiv,
      name: "keyword.nsis"
    },
    {
      match: /^\p{space}*(CompareDLLVersions|CompareFileTimes|DirShow|DisabledBitmap|EnabledBitmap|GetFullDLLPath|GetParent|GetWinampInstPath|LangStringUP|PackEXEHeader|SectionDivider|SetPluginUnload|SubSection(End)?|UninstallExeName)\b/dgiv,
      name: "invalid.deprecated.nsis"
    },
    {
      match: /^\p{space}*!(addincludedir|addplugindir|appendfile|assert|cd|define|delfile|echo|error|execute|finalize|getdllversion|gettlbversion|include|insertmacro|macro|macroend|makensis|packhdr|pragma|searchparse|searchreplace|system|tempfile|undef|uninstfinalize|verbose|warning)\b/dgiv,
      name: "keyword.other.nsis"
    },
    {
      match: /^\p{space}*!(ifdef|ifndef|if|ifmacrodef|ifmacrondef|else|endif)\b/dgiv,
      name: "keyword.control.nsis"
    },
    {
      match: /^\p{space}*[\p{L}\p{M}\p{N}\p{Pc}]+::[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
      name: "support.class.nsis"
    },
    {
      match: /[\!\<\>]?=|<>|[\<\>]/dgv,
      name: "keyword.operator.comparison.nsis"
    },
    {
      match: /\b(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_HIDDEN|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HIDDEN|HKCC|HKCR(32|64)?|HKCU(32|64)?|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM(32|64)?|HKPD|HKU|IDABORT|IDCANCEL|IDD_DIR|IDD_INST|IDD_INSTFILES|IDD_LICENSE|IDD_SELCOM|IDD_UNINST|IDD_VERIFY|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|MB_YESNOCANCEL|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SW_HIDE|SW_SHOWDEFAULT|SW_SHOWMAXIMIZED|SW_SHOWMINIMIZED|SW_SHOWNORMAL|SYSTEM|TEMPORARY)\b/dgiv,
      name: "entity.other.attribute-name.nsis"
    },
    {
      match: /\b(true|on)\b/dgiv,
      name: "constant.language.boolean.true.nsis"
    },
    {
      match: /\b(false|off)\b/dgiv,
      name: "constant.language.boolean.false.nsis"
    },
    {
      match: /\b((un\.)?components|(un\.)?custom|(un\.)?directory|(un\.)?instfiles|(un\.)?license|uninstConfirm|admin|all|amd64-unicode|auto|both|bottom|bzip2|current|force|hide|highest|ifdiff|ifnewer|lastused|leave|left|listonly|lzma|nevershow|none|normal|notset|right|show|silent|silentlog|textonly|top|try|user|Win10|Win7|Win8|WinVista|x86-(ansi|unicode)|zlib)\b/dgiv,
      name: "entity.other.attribute-name.nsis"
    },
    {
      match: /\p{space}+\/(BRANDING|CENTER|COMPONENTSONLYONCUSTOM|CUSTOMSTRING=|ENABLECANCEL|EXERESOURCE|FILESONLY|FINAL|GLOBAL|IMGID=|ITALIC|LANG=|NOCUSTOM|NONFATAL|OVERWRITE|REBOOTOK|REPLACE|RESIZETOFIT|SHORT|SILENT|SOLID|STRIKE|STRINGID|TRIM|UNDERLINE|a|date|e|file|gray|ifempty|ifndef|ignorecase|noerrors|nonfatal|o|oname=|r|redef|utcdate|windows|x)\b/dgiv,
      name: "constant.language.slash-option.nsis"
    },
    {
      match: /\b((0([Xx])\p{AHex}+)|([0-9]+(\.[0-9]+)?))\b/dgv,
      name: "constant.numeric.nsis"
    },
    {
      match: /\$\{(BannerTrimPath|DirState|DriveSpace|Get(BaseName|Drives|ExeName|ExePath|FileAttributes|FileExt|FileName|FileVersion|OptionsS??|Parameters|Parent|Root|Size|Time)|Locate|RefreshShellIcons)\}(?=\p{space}|(?=\n?$))/dgiv,
      name: "constant.language.nsis"
    },
    {
      match: /\$\{(And(If(Not)?|Unless)|Break|Case([2-5]|Else)?|Continue|Default|Do(Until|While)?|Else(If(Not)?|Unless)?|End(If|Select|Switch)|Exit(Do|For|While)|For(Each)?|If(Cmd|Not(Then)?|Then)?|Loop(Until|While)?|Next|Or(If(Not)?|Unless)|Select|Switch|Unless|While)\}(?=\p{space}|(?=\n?$))/dgiv,
      name: "constant.language.nsis"
    },
    {
      match: /\$\{(Memento(Section(Done|End|Restore|Save)?|UnselectedSection))\}(?=\p{space}|(?=\n?$))/dgiv,
      name: "constant.language.nsis"
    },
    {
      match: /\$\{(Config(ReadS??|WriteS??)|File(Join|ReadFromEnd|Recode)|Line(Find|Read|Sum)|Text(CompareS??)|TrimNewLines)\}(?=\p{space}|(?=\n?$))/dgiv,
      name: "constant.language.nsis"
    },
    {
      match: /\$\{((At(Least|Most)|Is)(ServicePack|Win(7|8\.1|8|10|11|95|98|20(00|03|08(R2)?|12(R2)?)|ME|NT4|Vista|XP))|Is(NT|Server))\}(?=\p{space}|(?=\n?$))/dgiv,
      name: "constant.language.nsis"
    },
    {
      match: /\$\{(StrFilterS?|Version(Co(?:mpare|nvert))|Word(AddS?|Find(([23])X)?S?|InsertS?|ReplaceS?))\}(?=\p{space}|(?=\n?$))/dgiv,
      name: "constant.language.nsis"
    },
    {
      match: /\$\{(((?:Dis|En)able)X64FSRedirection|RunningX64)\}(?=\p{space}|(?=\n?$))/dgiv,
      name: "constant.language.nsis"
    },
    {
      match: /\$\{[\-\!\.\:\^\p{L}\p{M}\p{N}\p{Pc}]+\}/dgv,
      name: "constant.other.nsis"
    },
    {
      match: /\$\([\-\!\.\:\^\p{L}\p{M}\p{N}\p{Pc}]+\)/dgv,
      name: "constant.other.nsis"
    },
    {
      match: /\$(\{__DATE__\}|\{__FILE__\}|\{__FILEDIR__\}|\{__LINE__\}|\{__TIME__\}|\{__TIMESTAMP__\}|ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|NSIS_MAX_STRLEN|NSIS_VERSION|NSISDIR|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES(32|64)?|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)\b/dgiv,
      name: "variable.language.nsis"
    },
    {
      match: /\$[\p{L}\p{M}\p{N}\p{Pc}][\.\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
      name: "variable.other.nsis"
    },
    {
      match: /\\(?=\n)/dgv,
      name: "constant.character.escape.line-continuation.nsis"
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nsis" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nsis" }
      },
      name: "string.quoted.double.nsis",
      patterns: [
        {
          match: /\${2}[\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "constant.character.escape.nsis"
        },
        {
          match: /\$\\[^\n]/dgv,
          name: "constant.character.escape.nsis"
        },
        {
          match: /\$\{[\-\!\.\:\^\p{L}\p{M}\p{N}\p{Pc}]+\}/dgv,
          name: "constant.other.nsis"
        },
        {
          match: /\$\([\-\!\.\:\^\p{L}\p{M}\p{N}\p{Pc}]+\)/dgv,
          name: "constant.other.nsis"
        },
        {
          match: /\$(\{__DATE__\}|\{__FILE__\}|\{__FILEDIR__\}|\{__LINE__\}|\{__TIME__\}|\{__TIMESTAMP__\}|ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|NSIS_MAX_STRLEN|NSIS_VERSION|NSISDIR|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES(32|64)?|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)\b/dgiv,
          name: "variable.language.nsis"
        },
        {
          match: /\$[\p{L}\p{M}\p{N}\p{Pc}][\.\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.nsis"
        }
      ]
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nsis" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nsis" }
      },
      name: "string.quoted.single.nsis",
      patterns: [
        {
          match: /\${2}[\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "constant.character.escape.nsis"
        },
        {
          match: /\$\\[^\n]/dgv,
          name: "constant.character.escape.nsis"
        },
        {
          match: /\$\{[\-\!\.\:\^\p{L}\p{M}\p{N}\p{Pc}]+\}/dgv,
          name: "constant.other.nsis"
        },
        {
          match: /\$\([\-\!\.\:\^\p{L}\p{M}\p{N}\p{Pc}]+\)/dgv,
          name: "constant.other.nsis"
        },
        {
          match: /\$(\{__DATE__\}|\{__FILE__\}|\{__FILEDIR__\}|\{__LINE__\}|\{__TIME__\}|\{__TIMESTAMP__\}|ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|NSIS_MAX_STRLEN|NSIS_VERSION|NSISDIR|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES(32|64)?|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)\b/dgiv,
          name: "variable.language.nsis"
        },
        {
          match: /\$[\p{L}\p{M}\p{N}\p{Pc}][\.\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.nsis"
        }
      ]
    },
    {
      begin: /`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.nsis" }
      },
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.nsis" }
      },
      name: "string.quoted.back.nsis",
      patterns: [
        {
          match: /\${2}[\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "constant.character.escape.nsis"
        },
        {
          match: /\$\\[^\n]/dgv,
          name: "constant.character.escape.nsis"
        },
        {
          match: /\$\{[\-\!\.\:\^\p{L}\p{M}\p{N}\p{Pc}]+\}/dgv,
          name: "constant.other.nsis"
        },
        {
          match: /\$\([\-\!\.\:\^\p{L}\p{M}\p{N}\p{Pc}]+\)/dgv,
          name: "constant.other.nsis"
        },
        {
          match: /\$(\{__DATE__\}|\{__FILE__\}|\{__FILEDIR__\}|\{__LINE__\}|\{__TIME__\}|\{__TIMESTAMP__\}|ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|NSIS_MAX_STRLEN|NSIS_VERSION|NSISDIR|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES(32|64)?|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)\b/dgiv,
          name: "variable.language.nsis"
        },
        {
          match: /\$[\p{L}\p{M}\p{N}\p{Pc}][\.\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "variable.other.nsis"
        }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.definition.comment.nsis" }
      },
      match: /([\#\;])[^\n]*(?=\n?$)\n?/dgv,
      name: "comment.line.nsis"
    },
    {
      begin: /\/\*/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.nsis" }
      },
      end: /\*\//dgv,
      name: "comment.block.nsis"
    }
  ],
  dependencies: []
};
