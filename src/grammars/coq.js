export default {
  name: "coq",
  displayName: "Rocq",
  scopeName: "source.rocq",
  patterns: [
    {
      match: /\b(From|Require|Import|Export|Local|Global|Include)\b/dgv,
      name: "keyword.control.import.rocq"
    },
    {
      match: /\b((Open|Close|Delimit|Undelimit|Bind|Declare)\p{space}+Scope)\b/dgv,
      name: "keyword.control.import.rocq"
    },
    {
      captures: {
        "1": { name: "keyword.source.rocq" },
        "2": { name: "entity.name.function.theorem.rocq" }
      },
      match: /\b(Theorem|Lemma|Remark|Fact|Corollary|Property|Proposition)\p{space}+(([_ \p{L}])(['0-9_ \p{L}])*)/dgv
    },
    {
      match: /\bGoal\b/dgv,
      name: "keyword.source.rocq"
    },
    {
      captures: {
        "1": { name: "keyword.source.rocq" },
        "2": { name: "keyword.source.rocq" },
        "3": { name: "entity.name.assumption.rocq" }
      },
      match: /\b(Parameters?|Axioms?|Conjectures?|Variables?|Hypothesis|Hypotheses)(\p{space}+Inline)?\b\p{space}*\(?\p{space}*(([_ \p{L}])(['0-9_ \p{L}])*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.source.rocq" },
        "3": { name: "entity.name.assumption.rocq" }
      },
      match: /\b(Context)\b\p{space}*`?\p{space}*([\(\{])?\p{space}*(([_ \p{L}])(['0-9_ \p{L}])*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.source.rocq" },
        "2": { name: "keyword.source.rocq" },
        "3": { name: "entity.name.function.rocq" }
      },
      match: /(\b(?:Program|Local)\p{space}+)?\b(Definition|Fixpoint|CoFixpoint|Function|Example|Let(?:(?:\p{space}+|\p{space}+Co)Fixpoint)?|Instance|Equations|Equations?)\p{space}+(([_ \p{L}])(['0-9_ \p{L}])*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.source.rocq" }
      },
      match: /\b((Show\p{space}+)?Obligation\p{space}+Tactic|Obligations\p{space}+of|Obligation|Next\p{space}+Obligation(\p{space}+of)?|Solve\p{space}+Obligations(\p{space}+of)?|Solve\p{space}+All\p{space}+Obligations|Admit\p{space}+Obligations(\p{space}+of)?|Instance)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.source.rocq" },
        "3": { name: "entity.name.type.rocq" }
      },
      match: /\b(CoInductive|Inductive|Variant|Record|Structure|Class)\p{space}+(>\p{space}*)?(([_ \p{L}])(['0-9_ \p{L}])*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.source.rocq" },
        "2": { name: "entity.name.function.ltac" }
      },
      match: /\b(Ltac)\p{space}+(([_ \p{L}])(['0-9_ \p{L}])*)/dgv
    },
    {
      captures: {
        "1": { name: "keyword.source.rocq" },
        "2": { name: "keyword.source.rocq" },
        "3": { name: "entity.name.function.ltac" }
      },
      match: /\b(Ltac2)\p{space}+(mutable\p{space}+)?(rec\p{space}+)?(([_ \p{L}])(['0-9_ \p{L}])*)/dgv
    },
    {
      match: /\b(Hint(\p{space}+Mode)?|Create\p{space}+HintDb|Constructors|Resolve|Rewrite|Ltac2??|Implicit(\p{space}+Types?)?|Set|Unset|Remove\p{space}+Printing|Arguments|((Tactic|Reserved)\p{space}+)?Notation|Infix|Section|Module(\p{space}+Type)?|End|Check|Print(\p{space}+All)?|Eval|Compute|Search|Universe|Coercions|Generalizable(\p{space}+(All|Variable))?|Existing(\p{space}+(Class|Instance))?|Canonical|About|Locate|Collection|Typeclasses\p{space}+(Opaque|Transparent))\b/dgv,
      name: "keyword.source.rocq"
    },
    {
      match: /\b(Proof|Qed|Defined|Save|Abort(\p{space}+All)?|Undo(\p{space}+To)?|Restart|Focus|Unfocus|Unfocused|Show\p{space}+Proof|Show\p{space}+Existentials|Show|Unshelve)\b/dgv,
      name: "keyword.source.rocq"
    },
    {
      match: /\b(Quit|Drop|Time|Redirect|Timeout|Fail)\b/dgv,
      name: "keyword.debug.rocq"
    },
    {
      match: /\b(admit|Admitted)\b/dgv,
      name: "invalid.illegal.admit.rocq"
    },
    {
      match: /[\-\*\+\:\<\=\>\{\|\}¬→↔∧∨≠≤≥]/dgv,
      name: "keyword.operator.rocq"
    },
    {
      match: /\b(forall|exists|Type|Set|Prop|nat|bool|option|list|unit|sum|prod|comparison|Empty_set)\b|[∀∃]/dgv,
      name: "support.type.rocq"
    },
    {
      match: /\b(try|repeat|rew|progress|fresh|solve|now|first|tryif|at|once|do|only)\b/dgv,
      name: "keyword.control.ltac"
    },
    {
      match: /\b(into|with|eqn|by|move|as|using)\b/dgv,
      name: "keyword.control.ltac"
    },
    {
      match: /\b(match|lazymatch|multimatch|match!|lazy_match!|multi_match!|fun|with|return|end|let|in|if|then|else|fix|for|where|and)\b|λ/dgv,
      name: "keyword.control.gallina"
    },
    {
      match: /\b(intros??|revert|induction|destruct|auto|eauto|tauto|eassumption|apply|eapply|assumption|constructor|econstructor|reflexivity|inversion|injection|assert|split|esplit|omega|fold|unfold|specialize|rewrite|erewrite|change|symmetry|refine|simpl|intuition|firstorder|generalize|idtac|exists??|eexists|elim|eelim|rename|subst|congruence|trivial|left|right|set|pose|discriminate|clear|clearbody|contradict|contradiction|exact|dependent|remember|case|easy|unshelve|pattern|transitivity|etransitivity|f_equal|exfalso|replace|abstract|cycle|swap|revgoals|shelve|unshelve)\b/dgv,
      name: "support.function.builtin.ltac"
    },
    {
      applyEndPatternLast: 1,
      begin: /\(\*\*(?!\*)/dgv,
      end: /\*\)/dgv,
      name: "comment.doc.rocq",
      patterns: [
        { include: "#doc_comment" },
        { include: "#block_comment" },
        { include: "#block_double_quoted_string" }
      ]
    },
    {
      applyEndPatternLast: 1,
      begin: /\(\*(?!#)/dgv,
      end: /\*\)/dgv,
      name: "comment.block.rocq",
      patterns: [
        { include: "#block_comment" },
        { include: "#block_double_quoted_string" }
      ]
    },
    {
      match: /\b((0([Xx])\p{AHex}+)|([0-9]+(\.[0-9]+)?))\b/dgv,
      name: "constant.numeric.gallina"
    },
    {
      match: /\b(True|False|tt|false|true|Some|None|nil|cons|pair|inl|inr|[OS]|Eq|Lt|Gt|id|ex|all|unique)\b/dgv,
      name: "constant.language.constructor.gallina"
    },
    {
      match: /\b_\b/dgv,
      name: "constant.language.wildcard.rocq"
    },
    {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.rocq" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.rocq" }
      },
      name: "string.quoted.double.rocq"
    }
  ],
  repository: {
    block_comment: {
      applyEndPatternLast: 1,
      begin: /\(\*(?!#)/dgv,
      end: /\*\)/dgv,
      name: "comment.block.rocq",
      patterns: [
        { include: "#block_comment" },
        { include: "#block_double_quoted_string" }
      ]
    },
    block_double_quoted_string: {
      applyEndPatternLast: 1,
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.rocq" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.rocq" }
      },
      name: "string.quoted.double.rocq"
    },
    doc_comment: {
      applyEndPatternLast: 1,
      begin: /\(\*\*(?!\*)/dgv,
      end: /\*\)/dgv,
      name: "comment.doc.rocq",
      patterns: [
        { include: "#doc_comment" },
        { include: "#block_comment" },
        { include: "#block_double_quoted_string" }
      ]
    }
  },
  dependencies: []
};
