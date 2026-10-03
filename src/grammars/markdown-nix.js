import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "markdown-nix",
  scopeName: "markdown.nix.codeblock",
  patterns: [
    { include: "#nix-code-block" }
  ],
  repository: {
    "nix-code-block": {
      begin: {
        G: [/(^|￿)(\p{space}*)(`{3,}|~{3,})\p{space}*(nix)(\p{space}+[^\`\~]*)?(?=\n?$)/dgiv, new EmulatedRegExp("(^|^)(\\p{space}*)(`{3,}|~{3,})\\p{space}*(nix)(\\p{space}+[^\\`\\~]*)?(?=\\n?$)", "dgiv", { strategy: "clip_search" })]
      },
      beginCaptures: {
        "3": { name: "punctuation.definition.markdown" },
        "5": { name: "fenced_code.block.language" },
        "6": { name: "fenced_code.block.language.attributes" }
      },
      end: {
        G: [/(^|￿)(2|\p{space}{0,3})(3)\p{space}*(?=\n?$)/dgv, new EmulatedRegExp("(^|^)(2|\\p{space}{0,3})(3)\\p{space}*(?=\\n?$)", "dgv", { strategy: "clip_search" })]
      },
      endCaptures: {
        "3": { name: "punctuation.definition.markdown" }
      },
      name: "markup.fenced_code.block.markdown",
      patterns: [
        {
          begin: {
            G: [/(^|￿)(\p{space}*)([^\n]*)/dgv, new EmulatedRegExp("(^|^)(\\p{space}*)([^\\n]*)", "dgv", { strategy: "clip_search" })]
          },
          contentName: "meta.embedded.block.nix",
          patterns: [
            { include: "source.nix" }
          ],
          while: {
            G: [/(^|￿)(?!\p{space}*([\`\~]{3,})\p{space}*(?=\n?$))/dgv, new EmulatedRegExp("(^|^)(?!\\p{space}*([\\`\\~]{3,})\\p{space}*(?=\\n?$))", "dgv", { strategy: "clip_search" })]
          }
        }
      ]
    }
  },
  injectionSelector: "L:text.html.markdown",
  injectTo: [
    "text.html.markdown"
  ],
  dependencies: []
};
