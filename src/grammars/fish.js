import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "fish",
  displayName: "Fish",
  scopeName: "source.fish",
  patterns: [
    { include: "#string-double" },
    { include: "#string-single" },
    { include: "#comment" },
    { include: "#subshell-bare" },
    { include: "#subshell" },
    { include: "#command" },
    { include: "#keywords" },
    { include: "#io-redirection" },
    { include: "#operators" },
    { include: "#options" },
    { include: "#variable" },
    { include: "#escape" }
  ],
  repository: {
    command: {
      captures: {
        "2": { name: "keyword.operator.pipe.fish" },
        "3": { name: "keyword.control.fish" },
        "5": { name: "support.function.command.fish" }
      },
      match: /(^\p{space}*|&&\p{space}*|(\|)\p{space}*|\(\p{space}*|;\p{space}*|\b(if|while)\b\p{space}+)(?!(?<!\.)\b(function|while|if|else|switch|case|for|in|begin|end|continue|break|return|source|exit|wait|and|or|not)\b(?![\!\?]))([\-\]\.0-9A-\[_a-z]+)/dgv
    },
    "command-subshell": {
      captures: {
        "2": { name: "keyword.operator.pipe.fish" },
        "3": { name: "keyword.control.fish" },
        "5": { name: "support.function.command.fish" }
      },
      match: {
        G: [/(￿\p{space}*|&&\p{space}*|(\|)\p{space}*|\(\p{space}*|;\p{space}*|\b(if|while)\b\p{space}+)(?!(?<!\.)\b(function|while|if|else|switch|case|for|in|begin|end|continue|break|return|source|exit|wait|and|or|not)\b(?![\!\?]))([\-\]\.0-9A-\[_a-z]+)/dgv, new EmulatedRegExp("(^\\p{space}*|&&\\p{space}*|(\\|)\\p{space}*|\\(\\p{space}*|;\\p{space}*|\\b(if|while)\\b\\p{space}+)(?!(?<!\\.)\\b(function|while|if|else|switch|case|for|in|begin|end|continue|break|return|source|exit|wait|and|or|not)\\b(?![\\!\\?]))([\\-\\]\\.0-9A-\\[_a-z]+)", "dgv", { strategy: "clip_search" })]
      }
    },
    comment: {
      captures: {
        "1": { name: "punctuation.definition.comment.fish" }
      },
      match: /(?<!\$)(#)(?!\{)[^\n]*(?=\n?$)\n?/dgv,
      name: "comment.line.number-sign.fish"
    },
    escape: {
      patterns: [
        {
          match: /\\[\] "\#\$\&-\*\;\<\>\?\[\^abefnrtv\{-\~]/dgv,
          name: "constant.character.escape.string.fish"
        },
        {
          match: /\\x\p{AHex}{1,2}/dgv,
          name: "constant.character.escape.hex-ascii.fish"
        },
        {
          match: /\\X\p{AHex}{1,2}/dgv,
          name: "constant.character.escape.hex-byte.fish"
        },
        {
          match: /\\[0-7]{1,3}/dgv,
          name: "constant.character.escape.octal.fish"
        },
        {
          match: /\\u\p{AHex}{1,4}/dgv,
          name: "constant.character.escape.unicode-16-bit.fish"
        },
        {
          match: /\\U\p{AHex}{1,8}/dgv,
          name: "constant.character.escape.unicode-32-bit.fish"
        },
        {
          match: /\\c[A-Za-z]/dgv,
          name: "constant.character.escape.control.fish"
        }
      ]
    },
    "io-redirection": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.redirect.fish" },
            "2": { name: "keyword.operator.redirect.target.fish" }
          },
          match: /(<|(?:[\>\^]|>>|\^\^)(?:&[\-012])?|[012](?:[\<\>]|>>)(?:&[\-012])?)\p{space}*(?!\()([\--9A-Z_a-z]+)/dgv
        },
        {
          match: /<|([\>\^]|>>|\^\^)(&[\-012])?|[012]([\<\>]|>>)(&[\-012])?/dgv,
          name: "keyword.operator.redirect.fish"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          captures: {
            "2": { name: "keyword.control.fish" }
          },
          match: /(^\p{space}*|&&\p{space}*|(?<=\|)\p{space}*|\(\p{space}*|;\p{space}*|(?<=\bwhile\b)\p{space}+|(?<=\bif\b)\p{space}+|(?<=\band\b)\p{space}+|(?<=\bor\b)\p{space}+|(?<=\bnot\b)\p{space}+)(?<!\.)\b(while|if|and|or|not)\b(?![\!\?])/dgv
        },
        {
          captures: {
            "2": { name: "keyword.control.fish" }
          },
          match: /(^\p{space}*|&&\p{space}*|(?<=\|)\p{space}*|\(\p{space}*|;\p{space}*)(?<!\.)\b(function|else|switch|case|for|begin|end|continue|break|return|source|exit|wait)\b(?![\!\?])/dgv
        },
        {
          match: /\b(in)\b(?![\!\?])/dgv,
          name: "keyword.control.fish"
        }
      ]
    },
    "keywords-subshell": {
      patterns: [
        {
          captures: {
            "2": { name: "keyword.control.fish" }
          },
          match: {
            G: [/(￿\p{space}*|&&\p{space}*|(?<=\|)\p{space}*|\(\p{space}*|;\p{space}*|(?<=\bwhile\b)\p{space}+|(?<=\bif\b)\p{space}+|(?<=\band\b)\p{space}+|(?<=\bor\b)\p{space}+|(?<=\bnot\b)\p{space}+)(?<!\.)\b(while|if|and|or|not)\b(?![\!\?])/dgv, new EmulatedRegExp("(^\\p{space}*|&&\\p{space}*|(?<=\\|)\\p{space}*|\\(\\p{space}*|;\\p{space}*|(?<=\\bwhile\\b)\\p{space}+|(?<=\\bif\\b)\\p{space}+|(?<=\\band\\b)\\p{space}+|(?<=\\bor\\b)\\p{space}+|(?<=\\bnot\\b)\\p{space}+)(?<!\\.)\\b(while|if|and|or|not)\\b(?![\\!\\?])", "dgv", { strategy: "clip_search" })]
          }
        },
        {
          captures: {
            "2": { name: "keyword.control.fish" }
          },
          match: {
            G: [/(￿\p{space}*|&&\p{space}*|(?<=\|)\p{space}*|\(\p{space}*|;\p{space}*)(?<!\.)\b(function|else|switch|case|for|begin|end|continue|break|return|source|exit|wait)\b(?![\!\?])/dgv, new EmulatedRegExp("(^\\p{space}*|&&\\p{space}*|(?<=\\|)\\p{space}*|\\(\\p{space}*|;\\p{space}*)(?<!\\.)\\b(function|else|switch|case|for|begin|end|continue|break|return|source|exit|wait)\\b(?![\\!\\?])", "dgv", { strategy: "clip_search" })]
          }
        },
        {
          match: /\b(in)\b(?![\!\?])/dgv,
          name: "keyword.control.fish"
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /&/dgv,
          name: "keyword.operator.background.fish"
        },
        {
          match: /\*\*|[\*\?]/dgv,
          name: "keyword.operator.glob.fish"
        }
      ]
    },
    options: {
      captures: {
        "1": { name: "source.option.fish" }
      },
      match: /\p{space}(-{1,2}[\-0-9A-Z_a-z]+|-[\p{L}\p{M}\p{N}\p{Pc}])\b/dgv
    },
    slice: {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.slice.begin.fish" }
      },
      end: /(?<!\\)((\\\\)*)(\])/dgv,
      endCaptures: {
        "1": { name: "constant.character.escape.string.fish" },
        "3": { name: "punctuation.definition.slice.end.fish" }
      },
      name: "meta.embedded.slice.fish variable.interpolation.fish",
      patterns: [
        { include: "#string-double" },
        { include: "#string-single" },
        { include: "#subshell-bare" },
        { include: "#subshell" },
        { include: "#variable" },
        { include: "#escape" }
      ]
    },
    "slice-string-double": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.slice.begin.fish" }
      },
      end: /(?<!\\)((\\\\)*)(\])/dgv,
      endCaptures: {
        "1": { name: "constant.character.escape.string.fish" },
        "3": { name: "punctuation.definition.slice.end.fish" }
      },
      name: "meta.embedded.slice.fish variable.interpolation.string.fish",
      patterns: [
        { include: "#subshell" },
        { include: "#variable" },
        {
          match: /\\(["\$]|(?=\n?$)|\\)/dgv,
          name: "constant.character.escape.fish"
        }
      ]
    },
    "string-double": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.fish" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.fish" }
      },
      name: "string.quoted.double.fish",
      patterns: [
        { include: "#subshell" },
        { include: "#variable-string-double" },
        {
          match: /\\(["\$]|(?=\n?$)|\\)/dgv,
          name: "constant.character.escape.fish"
        }
      ]
    },
    "string-single": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.fish" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.fish" }
      },
      name: "string.quoted.single.fish",
      patterns: [
        {
          match: /\\(['\\\`])/dgv,
          name: "constant.character.escape.fish"
        }
      ]
    },
    subshell: {
      begin: /\$\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.subshell.begin.fish" }
      },
      end: /(?<!\\)((\\\\)*)(\))/dgv,
      endCaptures: {
        "1": { name: "constant.character.escape.string.fish" },
        "3": { name: "punctuation.definition.subshell.end.fish" }
      },
      name: "meta.embedded.subshell.fish",
      patterns: [
        { include: "#string-double" },
        { include: "#string-single" },
        { include: "#comment" },
        { include: "#keywords-subshell" },
        { include: "#command-subshell" },
        { include: "#io-redirection" },
        { include: "#operators" },
        { include: "#options" },
        { include: "#subshell" },
        { include: "#variable" },
        { include: "#escape" }
      ]
    },
    "subshell-bare": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.subshell.begin.fish" }
      },
      end: /(?<!\\)((\\\\)*)(\))/dgv,
      endCaptures: {
        "1": { name: "constant.character.escape.string.fish" },
        "3": { name: "punctuation.definition.subshell.end.fish" }
      },
      name: "meta.embedded.subshell.fish",
      patterns: [
        { include: "#string-double" },
        { include: "#string-single" },
        { include: "#comment" },
        { include: "#keywords-subshell" },
        { include: "#command-subshell" },
        { include: "#io-redirection" },
        { include: "#operators" },
        { include: "#options" },
        { include: "#subshell-bare" },
        { include: "#subshell" },
        { include: "#variable" },
        { include: "#escape" }
      ]
    },
    variable: {
      patterns: [
        {
          begin: /(\$)(argv|CMD_DURATION|COLUMNS|fish_bind_mode|fish_color_autosuggestion|fish_color_cancel|fish_color_command|fish_color_comment|fish_color_cwd|fish_color_cwd_root|fish_color_end|fish_color_error|fish_color_escape|fish_color_hg_added|fish_color_hg_clean|fish_color_hg_copied|fish_color_hg_deleted|fish_color_hg_dirty|fish_color_hg_modified|fish_color_hg_renamed|fish_color_hg_unmerged|fish_color_hg_untracked|fish_color_history_current|fish_color_host|fish_color_host_remote|fish_color_match|fish_color_normal|fish_color_operator|fish_color_param|fish_color_quote|fish_color_redirection|fish_color_search_match|fish_color_selection|fish_color_status|fish_color_user|fish_color_valid_path|fish_complete_path|fish_function_path|fish_greeting|fish_key_bindings|fish_pager_color_completion|fish_pager_color_description|fish_pager_color_prefix|fish_pager_color_progress|fish_pid|fish_prompt_hg_status_added|fish_prompt_hg_status_copied|fish_prompt_hg_status_deleted|fish_prompt_hg_status_modified|fish_prompt_hg_status_order|fish_prompt_hg_status_unmerged|fish_prompt_hg_status_untracked|FISH_VERSION|history|hostname|IFS|LINES|pipestatus|status|umask|version)\b(?=\[)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.variable.fish" },
            "2": { name: "variable.language.fish" }
          },
          end: /(?<=\])/dgv,
          name: "variable.language.fish",
          patterns: [
            { include: "#slice" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.fish" }
          },
          match: /(\$)(argv|CMD_DURATION|COLUMNS|fish_bind_mode|fish_color_autosuggestion|fish_color_cancel|fish_color_command|fish_color_comment|fish_color_cwd|fish_color_cwd_root|fish_color_end|fish_color_error|fish_color_escape|fish_color_hg_added|fish_color_hg_clean|fish_color_hg_copied|fish_color_hg_deleted|fish_color_hg_dirty|fish_color_hg_modified|fish_color_hg_renamed|fish_color_hg_unmerged|fish_color_hg_untracked|fish_color_history_current|fish_color_host|fish_color_host_remote|fish_color_match|fish_color_normal|fish_color_operator|fish_color_param|fish_color_quote|fish_color_redirection|fish_color_search_match|fish_color_selection|fish_color_status|fish_color_user|fish_color_valid_path|fish_complete_path|fish_function_path|fish_greeting|fish_key_bindings|fish_pager_color_completion|fish_pager_color_description|fish_pager_color_prefix|fish_pager_color_progress|fish_pid|fish_prompt_hg_status_added|fish_prompt_hg_status_copied|fish_prompt_hg_status_deleted|fish_prompt_hg_status_modified|fish_prompt_hg_status_order|fish_prompt_hg_status_unmerged|fish_prompt_hg_status_untracked|FISH_VERSION|history|hostname|IFS|LINES|pipestatus|status|umask|version)\b/dgv,
          name: "variable.language.fish"
        },
        {
          begin: /(\$)([A-Z_a-z][0-9A-Z_a-z]*)(?=\[)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.variable.fish" },
            "2": { name: "variable.other.normal.fish" }
          },
          end: /(?<=\])/dgv,
          name: "variable.other.normal.fish",
          patterns: [
            { include: "#slice" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.fish" }
          },
          match: /(\$)[A-Z_a-z][0-9A-Z_a-z]*/dgv,
          name: "variable.other.normal.fish"
        }
      ]
    },
    "variable-string-double": {
      patterns: [
        {
          begin: /(\$)(argv|CMD_DURATION|COLUMNS|fish_bind_mode|fish_color_autosuggestion|fish_color_cancel|fish_color_command|fish_color_comment|fish_color_cwd|fish_color_cwd_root|fish_color_end|fish_color_error|fish_color_escape|fish_color_hg_added|fish_color_hg_clean|fish_color_hg_copied|fish_color_hg_deleted|fish_color_hg_dirty|fish_color_hg_modified|fish_color_hg_renamed|fish_color_hg_unmerged|fish_color_hg_untracked|fish_color_history_current|fish_color_host|fish_color_host_remote|fish_color_match|fish_color_normal|fish_color_operator|fish_color_param|fish_color_quote|fish_color_redirection|fish_color_search_match|fish_color_selection|fish_color_status|fish_color_user|fish_color_valid_path|fish_complete_path|fish_function_path|fish_greeting|fish_key_bindings|fish_pager_color_completion|fish_pager_color_description|fish_pager_color_prefix|fish_pager_color_progress|fish_pid|fish_prompt_hg_status_added|fish_prompt_hg_status_copied|fish_prompt_hg_status_deleted|fish_prompt_hg_status_modified|fish_prompt_hg_status_order|fish_prompt_hg_status_unmerged|fish_prompt_hg_status_untracked|FISH_VERSION|history|hostname|IFS|LINES|pipestatus|status|umask|version)\b(?=\[)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.variable.fish" },
            "2": { name: "variable.language.fish" }
          },
          end: /(?<=\])/dgv,
          name: "variable.language.fish",
          patterns: [
            { include: "#slice-string-double" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.fish" }
          },
          match: /(\$)(argv|CMD_DURATION|COLUMNS|fish_bind_mode|fish_color_autosuggestion|fish_color_cancel|fish_color_command|fish_color_comment|fish_color_cwd|fish_color_cwd_root|fish_color_end|fish_color_error|fish_color_escape|fish_color_hg_added|fish_color_hg_clean|fish_color_hg_copied|fish_color_hg_deleted|fish_color_hg_dirty|fish_color_hg_modified|fish_color_hg_renamed|fish_color_hg_unmerged|fish_color_hg_untracked|fish_color_history_current|fish_color_host|fish_color_host_remote|fish_color_match|fish_color_normal|fish_color_operator|fish_color_param|fish_color_quote|fish_color_redirection|fish_color_search_match|fish_color_selection|fish_color_status|fish_color_user|fish_color_valid_path|fish_complete_path|fish_function_path|fish_greeting|fish_key_bindings|fish_pager_color_completion|fish_pager_color_description|fish_pager_color_prefix|fish_pager_color_progress|fish_pid|fish_prompt_hg_status_added|fish_prompt_hg_status_copied|fish_prompt_hg_status_deleted|fish_prompt_hg_status_modified|fish_prompt_hg_status_order|fish_prompt_hg_status_unmerged|fish_prompt_hg_status_untracked|FISH_VERSION|history|hostname|IFS|LINES|pipestatus|status|umask|version)\b/dgv,
          name: "variable.language.fish"
        },
        {
          begin: /(\$)([A-Z_a-z][0-9A-Z_a-z]*)(?=\[)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.variable.fish" },
            "2": { name: "variable.other.normal.fish" }
          },
          end: /(?<=\])/dgv,
          name: "variable.other.normal.fish",
          patterns: [
            { include: "#slice-string-double" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.variable.fish" }
          },
          match: /(\$)[A-Z_a-z][0-9A-Z_a-z]*/dgv,
          name: "variable.other.normal.fish"
        }
      ]
    }
  },
  dependencies: []
};
