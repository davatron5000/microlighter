export default {
  name: "lean",
  displayName: "Lean 4",
  aliases: [
    "lean4"
  ],
  scopeName: "source.lean4",
  patterns: [
    { include: "#comments" },
    {
      match: /\b(Prop|Type|Sort)\b/dgv,
      name: "storage.type.lean4"
    },
    {
      captures: {
        "1": { name: "storage.modifier.lean4" },
        "2": { name: "storage.modifier.lean4" },
        "3": { name: "storage.modifier.lean4" }
      },
      match: /\b(attribute\b\p{space}*)(?:(\[[^\]\p{space}]*\])|\[([^\]\p{space}]*))/dgv
    },
    {
      captures: {
        "1": { name: "storage.modifier.lean4" },
        "2": { name: "storage.modifier.lean4" },
        "3": { name: "storage.modifier.lean4" }
      },
      match: /(@)(?:(\[[^\]\p{space}]*\])|\[([^\]\p{space}]*))/dgv
    },
    {
      match: /\b(?<!\.)(local|scoped|partial|unsafe|nonrec|public|private|protected|noncomputable|meta)(?!\.)\b/dgv,
      name: "storage.modifier.lean4"
    },
    {
      match: /\b(sorry|admit|#exit)\b/dgv,
      name: "invalid.illegal.lean4"
    },
    {
      match: /#(print|eval!??|reduce|synth|widget|where|version|with_exporting|check|check_tactic|check_tactic_failure|check_failure|check_simp|discr_tree_key|discr_tree_simp_key|guard|guard_expr|guard_msgs)\b/dgv,
      name: "keyword.other.lean4"
    },
    {
      match: /\bderiving\p{space}+instance\b/dgv,
      name: "keyword.other.command.lean4"
    },
    {
      begin: /\b(?<!\.)(inductive|coinductive|structure|theorem|axiom|abbrev|lemma|def|instance|class)\b\p{space}+(\{[^\}]*\})?/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.definitioncommand.lean4" }
      },
      end: /(?=\bwith\b|\bextends\b|\bwhere\b|[\(\:\<\>\[\{\|⦃])/dgv,
      name: "meta.definitioncommand.lean4",
      patterns: [
        { include: "#comments" },
        { include: "#definitionName" },
        {
          match: /,/dgv
        }
      ]
    },
    {
      match: /\b(?<!\.)(theorem|show|have|using|haveI|from|suffices|nomatch|nofun|no_index|def|class|structure|instance|elab|set_option|initialize|builtin_initialize|example|inductive_fixpoint|inductive|coinductive_fixpoint|coinductive|termination_by\??|decreasing_by|partial_fixpoint|axiom|universe|variable|module|import all|import|open|export|prelude|renaming|hiding|do|by\??|letI??|let_expr|extends|mutual|mut|where|rec|declare_syntax_cat|syntax|macro_rules|macro|binop_lazy%|binop%|unop%|binrel_no_prop%|binrel%|leftact%|rightact%|max_prec|leading_parser|elab_rules|deriving|fun|section|namespace|end|prefix|postfix|infixl|infixr?|notation|abbrev|if|bif|then|else|calc|matches|match_expr|match|with|forall|for|while|repeat|unless|until|panic!|unreachable!|assert!|try|catch|finally|return|continue|break|exists|mod_cast|exact\?%|include_str|include|in|trailing_parser|tactic_tag|tactic_alt|tactic_extension|register_tactic_tag|type_of%|binder_predicate|grind_propagator|builtin_grind_propagator|grind_pattern|simproc|builtin_simproc|simproc_pattern%|builtin_simproc_pattern%|simproc_decl|builtin_simproc_decl|dsimproc|builtin_dsimproc|dsimproc_decl|builtin_dsimproc_decl|show_panel_widgets|show_term|seal|unseal|nat_lit|norm_cast_add_elim|println!|private_decl%|declare_config_elab|decl_name%|register_error_explanation|register_builtin_option|register_option|register_parser_alias|register_simp_attr|register_linter_set|register_label_attr|recommended_spelling|reportIssue!|reprove|run_elab|run_cmd|run_meta|value_of%|add_decl_doc|omit|opaque|json%|dbg_trace|trace_goal\[[^\]\p{space}]*\]|trace\[[^\]\p{space}]*\]|throwErrorAt|throwError|throwNamedErrorAt|throwNamedError|logNamedWarningAt|logNamedWarning|logNamedErrorAt|logNamedError)(?!\.)\b/dgv,
      name: "keyword.other.lean4"
    },
    {
      begin: /«/dgv,
      contentName: "entity.name.lean4",
      end: /»/dgv
    },
    {
      begin: /(s!|m!|throwError|dbg_trace|panic!|reportIssue!|trace(?:_goal|)\[[^\]\p{space}]*\])\p{space}*"/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.lean4" }
      },
      end: /"/dgv,
      name: "string.interpolated.lean4",
      patterns: [
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.lean4" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "keyword.other.lean4" }
          },
          patterns: [
            { include: "$self" }
          ]
        },
        {
          match: /\\["'\\nrt]/dgv,
          name: "constant.character.escape.lean4"
        },
        {
          match: /\\x\p{AHex}\p{AHex}/dgv,
          name: "constant.character.escape.lean4"
        },
        {
          match: /\\u\p{AHex}\p{AHex}\p{AHex}\p{AHex}/dgv,
          name: "constant.character.escape.lean4"
        }
      ]
    },
    {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.lean4",
      patterns: [
        {
          match: /\\["'\\nrt]/dgv,
          name: "constant.character.escape.lean4"
        },
        {
          match: /\\x\p{AHex}\p{AHex}/dgv,
          name: "constant.character.escape.lean4"
        },
        {
          match: /\\u\p{AHex}\p{AHex}\p{AHex}\p{AHex}/dgv,
          name: "constant.character.escape.lean4"
        }
      ]
    },
    {
      match: /\b(true|false)\b/dgv,
      name: "constant.language.lean4"
    },
    {
      match: /(?<![\]\p{L}\p{M}\p{N}\p{Pc}])'[^'\\]'/dgv,
      name: "string.quoted.single.lean4"
    },
    {
      captures: {
        "1": { name: "constant.character.escape.lean4" }
      },
      match: /(?<![\]\p{L}\p{M}\p{N}\p{Pc}])'(\\(x\p{AHex}\p{AHex}|u\p{AHex}\p{AHex}\p{AHex}\p{AHex}|[^\n]))'/dgv,
      name: "string.quoted.single.lean4"
    },
    {
      match: /\b([0-9]+|0([Xx]\p{AHex}+)|-?(0|[1-9][0-9]*)(\.[0-9]+)?([Ee][\-\+]?[0-9]+)?)\b/dgv,
      name: "constant.numeric.lean4"
    }
  ],
  repository: {
    blockComment: {
      begin: /\/-/dgv,
      end: /-\//dgv,
      name: "comment.block.lean4",
      patterns: [
        { include: "source.lean4.markdown" },
        { include: "#blockComment" }
      ]
    },
    comments: {
      patterns: [
        { include: "#dashComment" },
        { include: "#docComment" },
        { include: "#modDocComment" },
        { include: "#blockComment" }
      ]
    },
    dashComment: {
      begin: /--/dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.double-dash.lean4",
      patterns: [
        { include: "source.lean4.markdown" }
      ]
    },
    definitionName: {
      patterns: [
        {
          match: /\b[^\(\)\:\=\?\{\}«»λ→∀\p{space}][^\(\)\:\{\}«»\p{space}]*/dgv,
          name: "entity.name.function.lean4"
        },
        {
          begin: /«/dgv,
          contentName: "entity.name.function.lean4",
          end: /»/dgv
        }
      ]
    },
    docComment: {
      begin: /\/--/dgv,
      end: /-\//dgv,
      name: "comment.block.documentation.lean4",
      patterns: [
        { include: "source.lean4.markdown" },
        { include: "#blockComment" }
      ]
    },
    modDocComment: {
      begin: /\/-!/dgv,
      end: /-\//dgv,
      name: "comment.block.documentation.lean4",
      patterns: [
        { include: "source.lean4.markdown" },
        { include: "#blockComment" }
      ]
    }
  },
  dependencies: []
};
