export default {
  name: "nextflow",
  displayName: "Nextflow",
  aliases: [
    "nf"
  ],
  scopeName: "source.nextflow",
  patterns: [
    { include: "#nextflow" }
  ],
  repository: {
    "enum-def": {
      begin: /^\p{space}*(enum)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "keyword.nextflow" },
        "2": { name: "storage.type.groovy" }
      },
      end: /\}/dgv,
      patterns: [
        { include: "source.nextflow-groovy#groovy" },
        { include: "#enum-values" }
      ]
    },
    "enum-values": {
      patterns: [
        {
          begin: /(?<=;|^)\p{space}*\b([0-9A-Z_]+)(?=\p{space}*(?:[\(\,\}]|(?=\n?$)))/dgv,
          beginCaptures: {
            "1": { name: "constant.enum.name.groovy" }
          },
          end: /,|(?=\})|^(?!\p{space}*[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*(?:,|(?=\n?$)))/dgv,
          patterns: [
            {
              begin: /\(/dgv,
              end: /\)/dgv,
              name: "meta.enum.value.groovy",
              patterns: [
                {
                  match: /,/dgv,
                  name: "punctuation.definition.seperator.parameter.groovy"
                },
                { include: "#groovy-code" }
              ]
            }
          ]
        }
      ]
    },
    "function-body": {
      patterns: [
        {
          match: /\p{space}/dgv
        },
        {
          begin: /(?=[\<\p{L}\p{M}\p{N}\p{Pc}][^\(]*\p{space}+[\$\<\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*\()/dgv,
          end: /(?=[\$\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*\()/dgv,
          name: "meta.method.return-type.java",
          patterns: [
            { include: "source.nextflow-groovy#types" }
          ]
        },
        {
          begin: /([\$\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*\(/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.nextflow" }
          },
          end: /\)/dgv,
          name: "meta.definition.method.signature.java",
          patterns: [
            {
              begin: /(?=[^\)])/dgv,
              end: /(?=\))/dgv,
              name: "meta.method.parameters.groovy",
              patterns: [
                {
                  begin: /(?=[^\)\,])/dgv,
                  end: /(?=[\)\,])/dgv,
                  name: "meta.method.parameter.groovy",
                  patterns: [
                    {
                      match: /,/dgv,
                      name: "punctuation.definition.separator.groovy"
                    },
                    {
                      begin: /=/dgv,
                      beginCaptures: {
                        "0": { name: "keyword.operator.assignment.groovy" }
                      },
                      end: /(?=[\)\,])/dgv,
                      name: "meta.parameter.default.groovy",
                      patterns: [
                        { include: "source.nextflow-groovy#groovy-code" }
                      ]
                    },
                    { include: "source.nextflow-groovy#parameters" }
                  ]
                }
              ]
            }
          ]
        },
        {
          begin: /(?=<)/dgv,
          end: /(?=\p{space})/dgv,
          name: "meta.method.paramerised-type.groovy",
          patterns: [
            {
              begin: /</dgv,
              end: />/dgv,
              name: "storage.type.parameters.groovy",
              patterns: [
                { include: "source.nextflow-groovy#types" },
                {
                  match: /,/dgv,
                  name: "punctuation.definition.seperator.groovy"
                }
              ]
            }
          ]
        },
        {
          begin: /\{/dgv,
          end: /(?=\})/dgv,
          name: "meta.method.body.java",
          patterns: [
            { include: "source.nextflow-groovy#groovy-code" }
          ]
        }
      ]
    },
    "function-def": {
      applyEndPatternLast: 1,
      begin: /(?<=;|^|\{)(?=\p{space}*(?:def|(?:(?:boolean|byte|char|short|int|float|long|double)|@?(?:[A-Za-z][\p{L}\p{M}\p{N}\p{Pc}]*\.)*[A-Z]+[\p{L}\p{M}\p{N}\p{Pc}]*)[\]\[]*(?:<[^\n]*>)?)\p{space}+([^\=]+\p{space}+)?[\p{L}\p{M}\p{N}\p{Pc}]+\p{space}*\()/dgv,
      end: /\}|(?=[^\{])/dgv,
      name: "meta.definition.method.groovy",
      patterns: [
        { include: "#function-body" }
      ]
    },
    "include-decl": {
      patterns: [
        {
          match: /^\b(include)\b/dgv,
          name: "keyword.nextflow"
        },
        {
          match: /\b(from)\b/dgv,
          name: "keyword.nextflow"
        }
      ]
    },
    nextflow: {
      patterns: [
        { include: "#record-def" },
        { include: "#enum-def" },
        { include: "#function-def" },
        { include: "#process-def" },
        { include: "#workflow-def" },
        { include: "#params-def" },
        { include: "#output-def" },
        { include: "#include-decl" },
        { include: "source.nextflow-groovy" }
      ]
    },
    "output-def": {
      begin: /^\p{space}*(output)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "keyword.nextflow" }
      },
      end: /\}/dgv,
      name: "output.nextflow",
      patterns: [
        { include: "source.nextflow-groovy#groovy" }
      ]
    },
    "params-def": {
      begin: /^\p{space}*(params)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "keyword.nextflow" }
      },
      end: /\}/dgv,
      name: "params.nextflow",
      patterns: [
        { include: "source.nextflow-groovy#groovy" }
      ]
    },
    "process-body": {
      patterns: [
        {
          match: /(?:input|output|when|script|shell|exec):/dgv,
          name: "constant.block.nextflow"
        },
        {
          match: /\b(val|env|file|path|stdin|stdout|tuple)([\(\p{space}])/dgv,
          name: "entity.name.function.nextflow"
        },
        { include: "source.nextflow-groovy#groovy" }
      ]
    },
    "process-def": {
      begin: /^\p{space}*(process)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "keyword.nextflow" },
        "2": { name: "entity.name.function.nextflow" }
      },
      end: /\}/dgv,
      name: "process.nextflow",
      patterns: [
        { include: "#process-body" }
      ]
    },
    "record-def": {
      begin: /^\p{space}*(record)\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "keyword.nextflow" },
        "2": { name: "storage.type.groovy" }
      },
      end: /\}/dgv,
      name: "record.nextflow",
      patterns: [
        { include: "source.nextflow-groovy#groovy" }
      ]
    },
    "workflow-body": {
      patterns: [
        {
          match: /(?:take|main|emit|publish):/dgv,
          name: "constant.block.nextflow"
        },
        { include: "source.nextflow-groovy#groovy" }
      ]
    },
    "workflow-def": {
      begin: /^\p{space}*(workflow)(?:\p{space}+([\p{L}\p{M}\p{N}\p{Pc}]+))?\p{space}*\{/dgv,
      beginCaptures: {
        "1": { name: "keyword.nextflow" },
        "2": { name: "entity.name.function.nextflow" }
      },
      end: /\}/dgv,
      name: "workflow.nextflow",
      patterns: [
        { include: "#workflow-body" }
      ]
    }
  },
  dependencies: [
    "nextflow-groovy"
  ]
};
