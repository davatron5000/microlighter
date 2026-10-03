import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "dax",
  displayName: "DAX",
  scopeName: "source.dax",
  patterns: [
    { include: "#comments" },
    { include: "#keywords" },
    { include: "#labels" },
    { include: "#parameters" },
    { include: "#strings" },
    { include: "#numbers" }
  ],
  repository: {
    comments: {
      patterns: [
        {
          begin: /\/\//dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.dax" }
          },
          end: /\n/dgv,
          name: "comment.line.dax"
        },
        {
          begin: /--/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.dax" }
          },
          end: /\n/dgv,
          name: "comment.line.dax"
        },
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.dax" }
          },
          end: /\*\//dgv,
          name: "comment.block.dax"
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: new EmulatedRegExp("\\b(YIELDMAT|YIELDDISC|YIELD|YEARFRAC|YEAR|XNPV|XIRR|WEEKNUM|WEEKDAY|VDB|VARX[^\\n]S|VARX[^\\n]P|VAR[^\\n]S|VAR[^\\n]P|VALUES?|UTCTODAY|UTCNOW|USERPRINCIPALNAME|USEROBJECTID|USERNAME|USERELATIONSHIP|USERCULTURE|UPPER|UNION|UNICODE|UNICHAR|TRUNC|TRUE|TRIM|TREATAS|TOTALYTD|TOTALQTD|TOTALMTD|TOPNSKIP|TOPNPERLEVEL|TOPN|TODAY|TIMEVALUE|TIME|TBILLYIELD|TBILLPRICE|TBILLEQ|TANH?|T[^\\n]INV[^\\n]2T|T[^\\n]INV|T[^\\n]DIST[^\\n]RT|T[^\\n]DIST[^\\n]2T|T[^\\n]DIST|SYD|SWITCH|SUMX|SUMMARIZECOLUMNS|SUMMARIZE|SUM|SUBSTITUTEWITHINDEX|SUBSTITUTE|STDEVX[^\\n]S|STDEVX[^\\n]P|STDEV[^\\n]S|STDEV[^\\n]P|STARTOFYEAR|STARTOFQUARTER|STARTOFMONTH|SQRTPI|SQRT|SLN|SINH?|SIGN|SELECTEDVALUE|SELECTEDMEASURENAME|SELECTEDMEASUREFORMATSTRING|SELECTEDMEASURE|SELECTCOLUMNS|SECOND|SEARCH|SAMPLE|SAMEPERIODLASTYEAR|RRI|ROW|ROUNDUP|ROUNDDOWN|ROUND|ROLLUPISSUBTOTAL|ROLLUPGROUP|ROLLUPADDISSUBTOTAL|ROLLUP|RIGHT|REPT|REPLACE|REMOVEFILTERS|RELATEDTABLE|RELATED|RECEIVED|RATE|RANKX|RANK[^\\n]EQ|RANDBETWEEN|RAND|RADIANS|QUOTIENT|QUARTER|PV|PRODUCTX?|PRICEMAT|PRICEDISC|PRICE|PREVIOUSYEAR|PREVIOUSQUARTER|PREVIOUSMONTH|PREVIOUSDAY|PPMT|POWER|POISSON[^\\n]DIST|PMT|PI|PERMUT|PERCENTILEX[^\\n]INC|PERCENTILEX[^\\n]EXC|PERCENTILE[^\\n]INC|PERCENTILE[^\\n]EXC|PDURATION|PATHLENGTH|PATHITEMREVERSE|PATHITEM|PATHCONTAINS|PATH|PARALLELPERIOD|OR|OPENINGBALANCEYEAR|OPENINGBALANCEQUARTER|OPENINGBALANCEMONTH|ODDLYIELD|ODDLPRICE|ODDFYIELD|ODDFPRICE|ODD|NPER|NOW|NOT|NORM[^\\n]S[^\\n]INV|NORM[^\\n]S[^\\n]DIST|NORM[^\\n]INV|NORM[^\\n]DIST|NONVISUAL|NOMINAL|NEXTYEAR|NEXTQUARTER|NEXTMONTH|NEXTDAY|NATURALLEFTOUTERJOIN|NATURALINNERJOIN|MROUND|MONTH|MOD|MINX|MINUTE|MINA?|MID|MEDIANX?|MDURATION|MAXX|MAXA?|LOWER|LOOKUPVALUE|LOG10|LOG|LN|LEN|LEFT|LCM|LASTNONBLANKVALUE|LASTNONBLANK|LASTDATE|KEYWORDMATCH|KEEPFILTERS|ISTEXT|ISSUBTOTAL|ISSELECTEDMEASURE|ISPMT|ISONORAFTER|ISODD|ISO[^\\n]CEILING|ISNUMBER|ISNONTEXT|ISLOGICAL|ISINSCOPE|ISFILTERED|ISEVEN|ISERROR|ISEMPTY|ISCROSSFILTERED|ISBLANK|ISAFTER|IPMT|INTRATE|INTERSECT|INT|IGNORE|IFERROR|IF[^\\n]EAGER|IF|HOUR|HASONEVALUE|HASONEFILTER|HASH|GROUPBY|GEOMEANX?|GENERATESERIES|GENERATEALL|GENERATE|GCD|FV|FORMAT|FLOOR|FIXED|FIRSTNONBLANKVALUE|FIRSTNONBLANK|FIRSTDATE|FIND|FILTERS?|FALSE|FACT|EXPON[^\\n]DIST|EXP|EXCEPT|EXACT|EVEN|ERROR|EOMONTH|ENDOFYEAR|ENDOFQUARTER|ENDOFMONTH|EFFECT|EDATE|EARLIEST|EARLIER|DURATION|DOLLARFR|DOLLARDE|DIVIDE|DISTINCTCOUNTNOBLANK|DISTINCTCOUNT|DISTINCT|DISC|DETAILROWS|DEGREES|DDB|DB|DAY|DATEVALUE|DATESYTD|DATESQTD|DATESMTD|DATESINPERIOD|DATESBETWEEN|DATEDIFF|DATEADD|DATE|DATATABLE|CUSTOMDATA|CURRENTGROUP|CURRENCY|CUMPRINC|CUMIPMT|CROSSJOIN|CROSSFILTER|COUPPCD|COUPNUM|COUPNCD|COUPDAYSNC|COUPDAYS|COUPDAYBS|COUNTX|COUNTROWS|COUNTBLANK|COUNTAX?|COUNT|COTH?|COSH?|CONVERT|CONTAINSSTRINGEXACT|CONTAINSSTRING|CONTAINSROW|CONTAINS|CONFIDENCE[^\\n]T|CONFIDENCE[^\\n]NORM|CONCATENATEX?|COMBINEVALUES|COMBINA?|COLUMNSTATISTICS|COALESCE|CLOSINGBALANCEYEAR|CLOSINGBALANCEQUARTER|CLOSINGBALANCEMONTH|CHISQ[^\\n]INV[^\\n]RT|CHISQ[^\\n]INV|CHISQ[^\\n]DIST[^\\n]RT|CHISQ[^\\n]DIST|CEILING|CALENDARAUTO|CALENDAR|CALCULATETABLE|CALCULATE|BLANK|BETA[^\\n]INV|BETA[^\\n]DIST|AVERAGEX|AVERAGEA?|ATANH?|ASINH?|APPROXIMATEDISTINCTCOUNT|AND|AMORLINC|AMORDEGRC|ALLSELECTED|ALLNOBLANKROW|ALLEXCEPT|ALLCROSSFILTERED|ALL|ADDMISSINGITEMS|ADDCOLUMNS|ACOTH?|ACOSH?|ACCRINTM?|ABS)\\b", "dgv", { lazyCompile: true }),
          name: "variable.language.dax"
        },
        {
          match: /\b(DEFINE|EVALUATE|ORDER BY|RETURN|VAR)\b/dgv,
          name: "keyword.control.dax"
        },
        {
          match: /[\{\}]/dgv,
          name: "keyword.array.constructor.dax"
        },
        {
          match: /[\<\>]|>=|<=|=(?!==)/dgv,
          name: "keyword.operator.comparison.dax"
        },
        {
          match: /&&|IN|NOT|\|\|/dgv,
          name: "keyword.operator.logical.dax"
        },
        {
          match: /[\-\*\+\/]/dgv,
          name: "keyword.arithmetic.operator.dax"
        },
        {
          begin: /\[/dgv,
          end: /\]/dgv,
          name: "support.function.dax"
        },
        {
          begin: /"/dgv,
          end: /"/dgv,
          name: "string.quoted.double.dax"
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "support.class.dax"
        }
      ]
    },
    labels: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.label.dax" },
            "2": { name: "entity.name.label.dax" }
          },
          match: /^(([^\n]*?)\p{space}*([\!\:]=))/dgv
        }
      ]
    },
    metas: {
      patterns: [
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "meta.brace.round.dax" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "meta.brace.round.dax" }
          }
        }
      ]
    },
    numbers: {
      match: /-?(?:0|[1-9]\p{Nd}*)(?:(?:\.\p{Nd}+)?(?:[Ee][\-\+]?\p{Nd}+)?)?/dgv,
      name: "constant.numeric.dax"
    },
    parameters: {
      patterns: [
        {
          begin: /\b(?<!\.)(VAR)\b(?<!\.)\b/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.dax" },
            "2": { name: "variable.other.readwrite.dax" }
          },
          end: /=/dgv,
          endCaptures: {
            "0": { name: "keyword.operator.assignment.dax" }
          },
          name: "meta.function.definition.parameters.dax",
          patterns: [
            {
              match: /=/dgv,
              name: "keyword.control.dax"
            }
          ]
        },
        {
          match: /[\$_\p{Alpha}][\$_\p{Alpha}\p{Nd}]*/dgv,
          name: "variable.other.constant.dax"
        }
      ]
    },
    strings: {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.dax",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.dax"
        }
      ]
    }
  },
  dependencies: []
};
