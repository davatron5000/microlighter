export default {
  name: "qss",
  displayName: "Qt Style Sheets",
  scopeName: "source.qss",
  patterns: [
    { include: "#comment-block" },
    { include: "#rule-list" },
    { include: "#selector" }
  ],
  repository: {
    color: {
      patterns: [
        {
          begin: /\b(rgba??|hsva??|hsla??)\p{space}*\(/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.qss" }
          },
          description: "Color Type",
          end: /\)/dgv,
          patterns: [
            { include: "#comment-block" },
            { include: "#number" }
          ]
        },
        {
          match: /\b(white|black|red|darkred|green|darkgreen|blue|darkblue|cyan|darkcyan|magenta|darkmagenta|yellow|darkyellow|gray|darkgray|lightgray|transparent|color0|color1)\b/dgv,
          name: "support.constant.property-value.named-color.qss"
        },
        {
          match: /#(\p{AHex}{3}|\p{AHex}{6}|\p{AHex}{8})\b/dgv,
          name: "support.constant.property-value.color.qss"
        }
      ]
    },
    "comment-block": {
      patterns: [
        {
          begin: /\/\*/dgv,
          end: /\*\//dgv,
          name: "comment.block.qss"
        }
      ]
    },
    "icon-properties": {
      patterns: [
        {
          match: /\b((?:backward|cd|computer|desktop|dialog-apply|dialog-cancel|dialog-close|dialog-discard|dialog-help|dialog-no|dialog-ok|dialog-open|dialog-reset|dialog-save|dialog-yes|directory-closed|directory|directory-link|directory-open|dockwidget-close|downarrow|dvd|file|file-link|filedialog-contentsview|filedialog-detailedview|filedialog-end|filedialog-infoview|filedialog-listview|filedialog-new-directory|filedialog-parent-directory|filedialog-start|floppy|forward|harddisk|home|leftarrow|messagebox-critical|messagebox-information|messagebox-question|messagebox-warning|network|rightarrow|titlebar-contexthelp|titlebar-maximize|titlebar-menu|titlebar-minimize|titlebar-normal|titlebar-close|titlebar-shade|titlebar-unshade|trash|uparrow)-icon)\b/dgv,
          name: "support.type.property-name.qss"
        }
      ]
    },
    "id-selector": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.entity.qss" },
            "2": { name: "entity.name.tag.qss" }
          },
          match: /(#)([A-Za-z][\-0-9A-Z_a-z]*)/dgv
        }
      ]
    },
    number: {
      patterns: [
        {
          description: "floating number",
          match: /\b(\p{Nd}+)?\.(\p{Nd}+)\b/dgv,
          name: "constant.numeric.qss"
        },
        {
          description: "percentage",
          match: /\b(\p{Nd}+)%/dgv,
          name: "constant.numeric.qss"
        },
        {
          description: "length",
          match: /\b(\p{Nd}+)(px|pt|em|ex)?\b/dgv,
          name: "constant.numeric.qss"
        },
        {
          description: "integer",
          match: /\b(\p{Nd}+)\b/dgv,
          name: "constant.numeric.qss"
        }
      ]
    },
    properties: {
      patterns: [
        { include: "#property-values" },
        {
          match: /\b(paint-alternating-row-colors-for-empty-area|dialogbuttonbox-buttons-have-icons|titlebar-show-tooltips-on-buttons|messagebox-text-interaction-flags|lineedit-password-mask-delay|outline-bottom-right-radius|lineedit-password-character|selection-background-color|outline-bottom-left-radius|border-bottom-right-radius|alternate-background-color|widget-animation-duration|border-bottom-left-radius|show-decoration-selected|outline-top-right-radius|outline-top-left-radius|border-top-right-radius|border-top-left-radius|background-attachment|subcontrol-position|border-bottom-width|border-bottom-style|border-bottom-color|background-position|border-right-width|border-right-style|border-right-color|subcontrol-origin|border-left-width|border-left-style|border-left-color|background-origin|background-repeat|border-top-width|border-top-style|border-top-color|background-image|background-color|text-decoration|selection-color|background-clip|padding-bottom|outline-radius|outline-offset|image-position|gridline-color|padding-right|outline-style|outline-color|margin-bottom|button-layout|border-radius|border-bottom|padding-left|margin-right|border-width|border-style|border-image|border-color|border-right|padding-top|margin-left|font-weight|font-family|border-left|text-align|min-height|max-height|margin-top|font-style|border-top|background|min-width|max-width|icon-size|font-size|position|spacing|padding|outline|opacity|margin|height|bottom|border|width|right|image|color|left|font|top)\b/dgv,
          name: "support.type.property-name.qss"
        },
        { include: "#icon-properties" }
      ]
    },
    "property-selector": {
      patterns: [
        {
          begin: /\[/dgv,
          end: /\]/dgv,
          patterns: [
            { include: "#comment-block" },
            { include: "#string" },
            {
              match: /\b[A-Z_a-z][\p{L}\p{M}\p{N}\p{Pc}]*\b/dgv,
              name: "variable.parameter.qml"
            }
          ]
        }
      ]
    },
    "property-values": {
      patterns: [
        {
          begin: /:/dgv,
          end: /;|(?=\})/dgv,
          patterns: [
            { include: "#comment-block" },
            { include: "#color" },
            {
              begin: /\b(q(?:linear|radial|conical)gradient)\p{space}*\(/dgv,
              beginCaptures: {
                "1": { name: "entity.name.function.qss" }
              },
              description: "Gradient Type",
              end: /\)/dgv,
              patterns: [
                { include: "#comment-block" },
                {
                  match: /\b(x1|y1|x2|y2|stop|angle|radius|cx|cy|fx|fy)\b/dgv,
                  name: "variable.parameter.qss"
                },
                { include: "#color" },
                { include: "#number" }
              ]
            },
            {
              begin: /\b(url)\p{space}*\(/dgv,
              beginCaptures: {
                "1": { name: "entity.name.function.qss" }
              },
              contentName: "string.unquoted.qss",
              description: "URL Type",
              end: /\)/dgv
            },
            {
              match: /\bpalette\p{space}*(?=\()\b/dgv,
              name: "entity.name.function.qss"
            },
            {
              match: /\b(highlighted-text|alternate-base|line-through|link-visited|dot-dot-dash|window-text|button-text|bright-text|underline|no-repeat|highlight|overline|absolute|relative|repeat-y|repeat-x|midlight|selected|disabled|dot-dash|content|padding|oblique|stretch|repeat|window|shadow|button|border|margin|active|italic|normal|outset|groove|double|dotted|dashed|repeat|scroll|center|bottom|light|solid|ridge|inset|fixed|right|text|link|dark|base|bold|none|left|mid|off|top|on)\b/dgv,
              name: "support.constant.property-value.qss"
            },
            {
              match: /\b(true|false)\b/dgv,
              name: "constant.language.boolean.qss"
            },
            { include: "#string" },
            { include: "#number" }
          ]
        }
      ]
    },
    "pseudo-states": {
      patterns: [
        {
          match: /\b(active|adjoins-item|alternate|bottom|checked|closable|closed|default|disabled|editable|edit-focus|enabled|exclusive|first|flat|floatable|focus|has-children|has-siblings|horizontal|hover|indeterminate|last|left|maximized|middle|minimized|movable|no-frame|non-exclusive|off|on|only-one|open|next-selected|pressed|previous-selected|read-only|right|selected|top|unchecked|vertical|window)\b/dgv,
          name: "keyword.control.qss"
        }
      ]
    },
    "rule-list": {
      patterns: [
        {
          begin: /\{/dgv,
          end: /\}/dgv,
          patterns: [
            { include: "#comment-block" },
            { include: "#properties" },
            { include: "#icon-properties" }
          ]
        }
      ]
    },
    selector: {
      patterns: [
        { include: "#stylable-widgets" },
        { include: "#sub-controls" },
        { include: "#pseudo-states" },
        { include: "#property-selector" },
        { include: "#id-selector" }
      ]
    },
    string: {
      description: "String literal with double or signle quote.",
      patterns: [
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.qml"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.qml"
        }
      ]
    },
    "stylable-widgets": {
      patterns: [
        {
          match: /\b(Q(?:AbstractScrollArea|AbstractItemView|CheckBox|ColumnView|ComboBox|DateEdit|DateTimeEdit|Dialog|DialogButtonBox|DockWidget|DoubleSpinBox|Frame|GroupBox|HeaderView|Label|LineEdit|ListView|ListWidget|MainWindow|Menu|MenuBar|MessageBox|ProgressBar|PlainTextEdit|PushButton|RadioButton|ScrollBar|SizeGrip|Slider|SpinBox|Splitter|StatusBar|TabBar|TabWidget|TableView|TableWidget|TextEdit|TimeEdit|ToolBar|ToolButton|ToolBox|ToolTip|TreeView|TreeWidget|Widget))\b/dgv,
          name: "entity.name.type.qss"
        }
      ]
    },
    "sub-controls": {
      patterns: [
        {
          match: /\b(add-line|add-page|branch|chunk|close-button|corner|down-arrow|down-button|drop-down|float-button|groove|indicator|handle|icon|item|left-arrow|left-corner|menu-arrow|menu-button|menu-indicator|right-arrow|pane|right-corner|scroller|section|separator|sub-line|sub-page|tab|tab-bar|tear|tearoff|text|title|up-arrow|up-button)\b/dgv,
          name: "entity.other.inherited-class.qss"
        }
      ]
    }
  },
  dependencies: []
};
