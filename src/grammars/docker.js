export default {
  name: "docker",
  displayName: "Dockerfile",
  aliases: [
    "dockerfile"
  ],
  scopeName: "source.dockerfile",
  patterns: [
    {
      captures: {
        "1": { name: "keyword.other.special-method.dockerfile" },
        "2": { name: "keyword.other.special-method.dockerfile" }
      },
      match: /^\p{space}*\b(FROM)\b[^\n]*?\b(AS)\b/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.control.dockerfile" },
        "2": { name: "keyword.other.special-method.dockerfile" }
      },
      match: /^\p{space}*(?:(ONBUILD)\p{space}+)?(ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)\p{space}/dgiv
    },
    {
      captures: {
        "1": { name: "keyword.operator.dockerfile" },
        "2": { name: "keyword.other.special-method.dockerfile" }
      },
      match: /^\p{space}*(?:(ONBUILD)\p{space}+)?(CMD|ENTRYPOINT)\p{space}/dgiv
    },
    { include: "#string-character-escape" },
    {
      begin: /"/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.dockerfile" }
      },
      end: /"/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.dockerfile" }
      },
      name: "string.quoted.double.dockerfile",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    {
      begin: /'/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.string.begin.dockerfile" }
      },
      end: /'/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.dockerfile" }
      },
      name: "string.quoted.single.dockerfile",
      patterns: [
        { include: "#string-character-escape" }
      ]
    },
    {
      captures: {
        "1": { name: "punctuation.whitespace.comment.leading.dockerfile" },
        "2": { name: "comment.line.number-sign.dockerfile" },
        "3": { name: "punctuation.definition.comment.dockerfile" }
      },
      match: /^(\p{space}*)((#)[^\n]*(?=\n?$)\n?)/dgv
    }
  ],
  repository: {
    "string-character-escape": {
      match: /\\[^\n]/dgv,
      name: "constant.character.escaped.dockerfile"
    }
  },
  dependencies: []
};
