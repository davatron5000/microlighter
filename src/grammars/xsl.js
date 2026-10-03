export default {
  name: "xsl",
  displayName: "XSL",
  scopeName: "text.xml.xsl",
  patterns: [
    {
      begin: /(<)(xsl)((:))(template)/dgv,
      captures: {
        "1": { name: "punctuation.definition.tag.xml" },
        "2": { name: "entity.name.tag.namespace.xml" },
        "3": { name: "entity.name.tag.xml" },
        "4": { name: "punctuation.separator.namespace.xml" },
        "5": { name: "entity.name.tag.localname.xml" }
      },
      end: /(>)/dgv,
      name: "meta.tag.xml.template",
      patterns: [
        {
          captures: {
            "1": { name: "entity.other.attribute-name.namespace.xml" },
            "2": { name: "entity.other.attribute-name.xml" },
            "3": { name: "punctuation.separator.namespace.xml" },
            "4": { name: "entity.other.attribute-name.localname.xml" }
          },
          match: / (?:([\-0-9A-Z_a-z]+)((:)))?([\-A-Za-z]+)/dgv
        },
        { include: "#doublequotedString" },
        { include: "#singlequotedString" }
      ]
    },
    { include: "text.xml" }
  ],
  repository: {
    doublequotedString: {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.xml" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.xml" }
      },
      name: "string.quoted.double.xml"
    },
    singlequotedString: {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.xml" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.xml" }
      },
      name: "string.quoted.single.xml"
    }
  },
  dependencies: [
    "xml"
  ]
};
