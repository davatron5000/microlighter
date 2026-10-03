export default {
  name: "desktop",
  displayName: "Desktop",
  scopeName: "source.desktop",
  patterns: [
    { include: "#layout" },
    { include: "#keywords" },
    { include: "#values" },
    { include: "#inCommands" },
    { include: "#inCategories" }
  ],
  repository: {
    inCategories: {
      patterns: [
        {
          match: /(?<=^Categories[^\n]*)AudioVideo|(?<=^Categories[^\n]*)Audio|(?<=^Categories[^\n]*)Video|(?<=^Categories[^\n]*)Development|(?<=^Categories[^\n]*)Education|(?<=^Categories[^\n]*)Game|(?<=^Categories[^\n]*)Graphics|(?<=^Categories[^\n]*)Network|(?<=^Categories[^\n]*)Office|(?<=^Categories[^\n]*)Science|(?<=^Categories[^\n]*)Settings|(?<=^Categories[^\n]*)System|(?<=^Categories[^\n]*)Utility/dgv,
          name: "markup.bold"
        }
      ]
    },
    inCommands: {
      patterns: [
        {
          match: /(?<=^Exec[^\n]*\p{space})-+\P{space}+/dgv,
          name: "variable.parameter"
        },
        {
          match: /(?<=^Exec[^\n]*)\p{space}%[FUcfiku]\p{space}/dgv,
          name: "variable.language"
        },
        {
          match: /"[^\n]*"/dgv,
          name: "string"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /^(?:Type|Version|Name|GenericName|NoDisplay|Comment|Icon|Hidden|OnlyShowIn|NotShowIn|DBusActivatable|TryExec|Exec|Path|Terminal|Actions|MimeType|Categories|Implements|Keywords|StartupNotify|StartupWMClass|URL|PrefersNonDefaultGPU|Encoding)\b/dgv,
          name: "keyword"
        },
        {
          match: /^X-[\- 0-9A-z]*/dgv,
          name: "keyword.other"
        },
        {
          match: /(?<!^)\[[^\n]+\]/dgv,
          name: "constant.language"
        },
        {
          match: /^(?:GtkTheme|MetacityTheme|IconTheme|CursorTheme|ButtonLayout|ApplicationFont)\b/dgv,
          name: "keyword"
        }
      ]
    },
    layout: {
      patterns: [
        {
          begin: /^\[Desktop/dgv,
          end: /\]/dgv,
          name: "markup.heading"
        },
        {
          begin: /^\[X-[\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          end: /\]/dgv,
          name: "markup.heading"
        },
        {
          match: /^\p{space}*#[^\n]*/dgv,
          name: "comment"
        },
        {
          match: /;/dgv,
          name: "strong"
        }
      ]
    },
    values: {
      patterns: [
        {
          match: /(?<=^\P{space}+)=/dgv,
          name: "keyword.operator"
        },
        {
          match: /\b(?:tru|fals)e\b/dgv,
          name: "variable.other"
        },
        {
          match: /(?<=^Version[^\n]*)\p{Nd}+(\.?\p{Nd}*)/dgv,
          name: "variable.other"
        }
      ]
    }
  },
  dependencies: []
};
