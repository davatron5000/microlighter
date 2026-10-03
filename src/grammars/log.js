export default {
  name: "log",
  displayName: "Log file",
  scopeName: "text.log",
  patterns: [
    {
      match: /\b([Tt]race|TRACE)\b:?/dgv,
      name: "comment log.verbose"
    },
    {
      match: /\[(v(?:erbose|erb|rb|b?))\]/dgiv,
      name: "comment log.verbose"
    },
    {
      match: /(?<=^[p\p{space}\p{Nd}]*)\bV\b/dgv,
      name: "comment log.verbose"
    },
    {
      match: /\b(D(?:EBUG|ebug))\b|\b([Dd][Ee][Bb][Uu][Gg]):/dgv,
      name: "markup.changed log.debug"
    },
    {
      match: /\[(d(?:ebug|bug|bg|e?))\]/dgiv,
      name: "markup.changed log.debug"
    },
    {
      match: /(?<=^[p\p{space}\p{Nd}]*)\bD\b/dgv,
      name: "markup.changed log.debug"
    },
    {
      match: /\b(HINT|INFO|INFORMATION|Info|NOTICE|II)\b|\b([Ii][Nn][Ff][Oo](?:|[Rr][Mm][Aa][Tt][Ii][Oo][Nn])):/dgv,
      name: "markup.inserted log.info"
    },
    {
      match: /\[(i(?:nformation|nfo?|n?))\]/dgiv,
      name: "markup.inserted log.info"
    },
    {
      match: /(?<=^[p\p{space}\p{Nd}]*)\bI\b/dgv,
      name: "markup.inserted log.info"
    },
    {
      match: /\b(W(?:ARNING|ARN|arn|W))\b|\b([Ww][Aa][Rr][Nn][Ii][Nn][Gg]):/dgv,
      name: "markup.deleted log.warning"
    },
    {
      match: /\[(w(?:arning|arn|rn|n?))\]/dgiv,
      name: "markup.deleted log.warning"
    },
    {
      match: /(?<=^[p\p{space}\p{Nd}]*)\bW\b/dgv,
      name: "markup.deleted log.warning"
    },
    {
      match: /\b(ALERT|CRITICAL|EMERGENCY|ERROR|FAILURE|FAIL|Fatal|FATAL|Error|EE)\b|\b([Ee][Rr][Rr][Oo][Rr]):/dgv,
      name: "string.regexp, strong log.error"
    },
    {
      match: /\[(error|eror|err?|e|fatal|fatl|ftl|fa?)\]/dgiv,
      name: "string.regexp, strong log.error"
    },
    {
      match: /(?<=^[p\p{space}\p{Nd}]*)\bE\b/dgv,
      name: "string.regexp, strong log.error"
    },
    {
      match: /\b\p{Nd}{4}-\p{Nd}{2}-\p{Nd}{2}(?=T|\b)/dgv,
      name: "comment log.date"
    },
    {
      match: /(?<=(^|\p{space}))\p{Nd}{2}[^\p{L}\p{M}\p{N}\p{Pc}\p{space}]\p{Nd}{2}[^\p{L}\p{M}\p{N}\p{Pc}\p{space}]\p{Nd}{4}\b/dgv,
      name: "comment log.date"
    },
    {
      match: /T?\p{Nd}{1,2}:\p{Nd}{2}(:\p{Nd}{2}([\,\.]\p{Nd}+)?)?(Z| ?[\-\+]\p{Nd}{1,2}:\p{Nd}{2})?\b/dgv,
      name: "comment log.date"
    },
    {
      match: /T\p{Nd}{2}\p{Nd}{2}(\p{Nd}{2}([\,\.]\p{Nd}+)?)?(Z| ?[\-\+]\p{Nd}{1,2}\p{Nd}{2})?\b/dgv,
      name: "comment log.date"
    },
    {
      match: /\b(\p{AHex}{40}|\p{AHex}{10}|\p{AHex}{7})\b/dgv,
      name: "constant.language"
    },
    {
      match: /\b\p{AHex}{8}-?(\p{AHex}{4}-?){3}\p{AHex}{12}\b/dgv,
      name: "constant.language log.constant"
    },
    {
      match: /\b(\p{AHex}{2,}[\-\:])+(?:\p{AHex}{2,})+\b/dgv,
      name: "constant.language log.constant"
    },
    {
      match: /\b([0-9]+|true|false|null)\b/dgv,
      name: "constant.language log.constant"
    },
    {
      match: /\b(0x\p{AHex}+)\b/dgv,
      name: "constant.language log.constant"
    },
    {
      match: /"[^"]*"/dgv,
      name: "string log.string"
    },
    {
      match: /(?<![\p{L}\p{M}\p{N}\p{Pc}])'[^']*'/dgv,
      name: "string log.string"
    },
    {
      match: /\b([\.A-Za-z]*Exception)\b/dgv,
      name: "string.regexp, emphasis log.exceptiontype"
    },
    {
      begin: /^[\t ]*at[\t ]/dgv,
      end: /(?=\n?$)/dgv,
      name: "string.key, emphasis log.exception"
    },
    {
      match: /\b[a-z]+:\/\/\P{space}+\b\/?/dgv,
      name: "constant.language log.constant"
    },
    {
      match: /(?<![\/\\\p{L}\p{M}\p{N}\p{Pc}])([\-\p{L}\p{M}\p{N}\p{Pc}]+\.)+([\-\p{L}\p{M}\p{N}\p{Pc}])+(?![\/\\\p{L}\p{M}\p{N}\p{Pc}])/dgv,
      name: "constant.language log.constant"
    }
  ],
  dependencies: []
};
