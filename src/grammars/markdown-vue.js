import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "markdown-vue",
  scopeName: "markdown.vue.codeblock",
  patterns: [
    { include: "#vue-code-block" }
  ],
  repository: {
    "vue-code-block": {
      begin: {
        G: [/(^|￿)(\p{space}*)(`{3,}|~{3,})\p{space}*(vue)((\p{space}+|[\,\:\?\{])[^\`\~]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(\\p{space}*)(`{3,}|~{3,})\\p{space}*(vue)((\\p{space}+|[\\,\\:\\?\\{])[^\\`\\~]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
      },
      beginCaptures: {
        "3": { name: "punctuation.definition.markdown" },
        "4": { name: "fenced_code.block.language.markdown" },
        "5": {
          name: "fenced_code.block.language.attributes.markdown",
          patterns: []
        }
      },
      end: {
        G: [/(^|￿)(2|\p{space}{0,3})(3)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2|\\p{space}{0,3})(3)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "3": { name: "punctuation.definition.markdown" }
      },
      name: "markup.fenced_code.block.markdown",
      patterns: [
        { include: "text.html.vue" }
      ]
    }
  },
  injectionSelector: "L:text.html.markdown",
  injectTo: [
    "text.html.markdown"
  ],
  dependencies: []
};
