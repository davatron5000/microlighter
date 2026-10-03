export default {
  name: "jssm",
  displayName: "JSSM",
  aliases: [
    "fsl"
  ],
  scopeName: "source.jssm",
  patterns: [
    {
      begin: /\/\*/dgv,
      captures: {
        "0": { name: "punctuation.definition.comment.mn" }
      },
      end: /\*\//dgv,
      name: "comment.block.jssm"
    },
    {
      begin: /\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.jssm"
    },
    {
      begin: /\$\{/dgv,
      captures: {
        "0": { name: "entity.name.function" }
      },
      end: /\}/dgv,
      name: "keyword.other"
    },
    {
      match: /([0-9]*)(\.)([0-9]*)(\.)([0-9]*)/dgv,
      name: "constant.numeric"
    },
    {
      match: /graph_layout(\p{space}*)(:)/dgv,
      name: "constant.language.jssmLanguage"
    },
    {
      match: /machine_name(\p{space}*)(:)/dgv,
      name: "constant.language.jssmLanguage"
    },
    {
      match: /machine_version(\p{space}*)(:)/dgv,
      name: "constant.language.jssmLanguage"
    },
    {
      match: /jssm_version(\p{space}*)(:)/dgv,
      name: "constant.language.jssmLanguage"
    },
    {
      match: /<->/dgv,
      name: "keyword.control.transition.jssmArrow.legal_legal"
    },
    {
      match: /<-/dgv,
      name: "keyword.control.transition.jssmArrow.legal_none"
    },
    {
      match: /->/dgv,
      name: "keyword.control.transition.jssmArrow.none_legal"
    },
    {
      match: /<=>/dgv,
      name: "keyword.control.transition.jssmArrow.main_main"
    },
    {
      match: /=>/dgv,
      name: "keyword.control.transition.jssmArrow.none_main"
    },
    {
      match: /<=/dgv,
      name: "keyword.control.transition.jssmArrow.main_none"
    },
    {
      match: /<~>/dgv,
      name: "keyword.control.transition.jssmArrow.forced_forced"
    },
    {
      match: /~>/dgv,
      name: "keyword.control.transition.jssmArrow.none_forced"
    },
    {
      match: /<~/dgv,
      name: "keyword.control.transition.jssmArrow.forced_none"
    },
    {
      match: /<-=>/dgv,
      name: "keyword.control.transition.jssmArrow.legal_main"
    },
    {
      match: /<=->/dgv,
      name: "keyword.control.transition.jssmArrow.main_legal"
    },
    {
      match: /<-~>/dgv,
      name: "keyword.control.transition.jssmArrow.legal_forced"
    },
    {
      match: /<~->/dgv,
      name: "keyword.control.transition.jssmArrow.forced_legal"
    },
    {
      match: /<=~>/dgv,
      name: "keyword.control.transition.jssmArrow.main_forced"
    },
    {
      match: /<~=>/dgv,
      name: "keyword.control.transition.jssmArrow.forced_main"
    },
    {
      match: /([0-9]+)%/dgv,
      name: "constant.numeric.jssmProbability"
    },
    {
      match: /'[^']*'/dgv,
      name: "constant.character.jssmAction"
    },
    {
      match: /"[^"]*"/dgv,
      name: "entity.name.tag.jssmLabel.doublequoted"
    },
    {
      match: /([\!\#\&\(\)\+\,\.0-9\?-Z_a-z])/dgv,
      name: "entity.name.tag.jssmLabel.atom"
    }
  ],
  dependencies: []
};
