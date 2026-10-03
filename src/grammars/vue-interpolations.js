export default {
  name: "vue-interpolations",
  scopeName: "vue.interpolations",
  patterns: [
    { include: "text.html.vue#vue-interpolations" }
  ],
  injectionSelector: "L:text.pug -comment -string.comment, L:text.html.derivative -comment.block, L:text.html.markdown -comment.block",
  injectTo: [
    "source.vue",
    "text.html.markdown",
    "text.html.derivative",
    "text.pug"
  ],
  dependencies: []
};
