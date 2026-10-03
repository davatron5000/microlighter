export default {
  name: "rbs",
  displayName: "RBS",
  aliases: [
    "ruby-signature"
  ],
  scopeName: "source.rbs",
  patterns: [
    { include: "#comments" },
    { include: "#keywords" },
    { include: "#strings" }
  ],
  repository: {
    comments: {
      begin: /#/dgv,
      end: /\n/dgv,
      name: "comment.line.number-sign"
    },
    keywords: {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.control.class.rbs" },
            "2": { name: "entity.name.class" }
          },
          match: /\b(class)\p{space}+((::)?([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))*[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
          name: "keyword.control.class.rbs"
        },
        {
          match: /\b(type)\b/dgv,
          name: "keyword.control.type.rbs"
        },
        {
          captures: {
            "1": { name: "keyword.control.def.rbs" },
            "2": { name: "entity.name.function.rbs" }
          },
          match: /\b(def)\b([^\:]+)/dgv,
          name: "keyword.control.def.rbs"
        },
        {
          match: /\b(self)\b/dgv,
          name: "keyword.control.self.rbs"
        },
        {
          match: /\b(void)\b/dgv,
          name: "keyword.control.void.rbs"
        },
        {
          match: /\b(untyped)\b/dgv,
          name: "keyword.control.untyped.rbs"
        },
        {
          match: /\b(top)\b/dgv,
          name: "keyword.control.top.rbs"
        },
        {
          match: /\b(bot)\b/dgv,
          name: "keyword.control.bot.rbs"
        },
        {
          match: /\b(instance)\b/dgv,
          name: "keyword.control.instance.rbs"
        },
        {
          match: /\b(bool)\b/dgv,
          name: "keyword.control.bool.rbs"
        },
        {
          match: /\b(nil)\b/dgv,
          name: "keyword.control.nil.rbs"
        },
        {
          match: /\b(singleton)\b/dgv,
          name: "keyword.control.singleton.rbs"
        },
        {
          captures: {
            "1": { name: "keyword.control.interface.rbs" },
            "2": { name: "entity.name.class" }
          },
          match: /\b(interface)\p{space}+((::)?([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))*_[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
          name: "keyword.control.interface.rbs"
        },
        {
          match: /\b(end)\b/dgv,
          name: "keyword.control.end.rbs"
        },
        {
          captures: {
            "1": { name: "keyword.control.include.rbs" },
            "2": { name: "variable.other.constant.rbs" }
          },
          match: /\b(include)\p{space}+((::)?([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))*_?[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
          name: "keyword.control.include.rbs"
        },
        {
          captures: {
            "1": { name: "keyword.control.extend.rbs" },
            "2": { name: "variable.other.constant.rbs" }
          },
          match: /\b(extend)\p{space}+((::)?([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))*_?[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
          name: "keyword.control.extend.rbs"
        },
        {
          captures: {
            "1": { name: "keyword.control.prepend.rbs" },
            "2": { name: "variable.other.constant.rbs" }
          },
          match: /\b(prepend)\p{space}+((::)?([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))*[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
          name: "keyword.control.prepend.rbs"
        },
        {
          captures: {
            "1": { name: "keyword.control.module.rbs" },
            "2": { name: "entity.name.class" }
          },
          match: /\b(module)\p{space}+((::)?([A-Z][\p{L}\p{M}\p{N}\p{Pc}]*(::))*[A-Z][\p{L}\p{M}\p{N}\p{Pc}]*)/dgv,
          name: "keyword.control.module.rbs"
        },
        {
          match: /\b(attr_reader)\b/dgv,
          name: "keyword.control.attr_reader.rbs"
        },
        {
          match: /\b(attr_writer)\b/dgv,
          name: "keyword.control.attr_writer.rbs"
        },
        {
          match: /\b(attr_accessor)\b/dgv,
          name: "keyword.control.attr_accessor.rbs"
        },
        {
          match: /\b(public)\b/dgv,
          name: "keyword.control.public.rbs"
        },
        {
          match: /\b(private)\b/dgv,
          name: "keyword.control.private.rbs"
        },
        {
          match: /\b(alias)\b/dgv,
          name: "keyword.control.alias.rbs"
        },
        {
          match: /\b(unchecked)\b/dgv,
          name: "keyword.control.unchecked.rbs"
        },
        {
          match: /\b(out)\b/dgv,
          name: "keyword.control.out.rbs"
        },
        {
          match: /\b(in)\b/dgv,
          name: "keyword.control.in.rbs"
        },
        {
          match: /\b(use)\b/dgv,
          name: "keyword.other.use.rbs"
        },
        {
          match: /\b(as)\b/dgv,
          name: "keyword.other.as.rbs"
        }
      ]
    },
    strings: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.rbs",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.rbs"
        }
      ]
    }
  },
  dependencies: []
};
