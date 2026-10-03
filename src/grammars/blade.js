import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "blade",
  displayName: "Blade",
  scopeName: "text.html.php.blade",
  patterns: [
    { include: "text.html.derivative" }
  ],
  repository: {
    balance_brackets: {
      patterns: [
        {
          begin: /\(/dgv,
          end: /\)/dgv,
          patterns: [
            { include: "#balance_brackets" }
          ]
        },
        {
          match: /[^\(\)]+/dgv
        }
      ]
    },
    blade: {
      patterns: [
        {
          begin: /\{\{--/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.blade" }
          },
          end: /--\}\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.blade" }
          },
          name: "comment.block.blade",
          patterns: [
            {
              begin: /^(\p{space}*)(?=<\?(?![^\?]*\?>))/dgv,
              beginCaptures: {
                "0": { name: "punctuation.whitespace.embedded.leading.php" }
              },
              end: {
                G: [/(?!￿)(\p{space}*(?=\n?$)\n)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n)?", "dgv", { strategy: "clip_search" })]
              },
              endCaptures: {
                "0": { name: "punctuation.whitespace.embedded.trailing.php" }
              },
              name: "invalid.illegal.php-code-in-comment.blade",
              patterns: [
                {
                  begin: /<\?(?:php|=)?/dgiv,
                  beginCaptures: {
                    "0": { name: "punctuation.section.embedded.begin.php" }
                  },
                  contentName: "source.php",
                  end: /(\?)>/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.embedded.end.php" },
                    "1": { name: "source.php" }
                  },
                  name: "meta.embedded.block.php",
                  patterns: [
                    { include: "#language" }
                  ]
                }
              ]
            },
            {
              begin: /<\?(?:php|=)?(?![^\?]*\?>)/dgiv,
              beginCaptures: {
                "0": { name: "punctuation.section.embedded.begin.php" }
              },
              contentName: "source.php",
              end: /(\?)>/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.embedded.end.php" },
                "1": { name: "source.php" }
              },
              name: "invalid.illegal.php-code-in-comment.blade.meta.embedded.block.php",
              patterns: [
                { include: "#language" }
              ]
            },
            {
              begin: /<\?(?:php|=)?/dgiv,
              beginCaptures: {
                "0": { name: "punctuation.section.embedded.begin.php" }
              },
              end: />/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.embedded.end.php" }
              },
              name: "invalid.illegal.php-code-in-comment.blade.meta.embedded.line.php",
              patterns: [
                {
                  captures: {
                    "1": { name: "source.php" },
                    "2": { name: "punctuation.section.embedded.end.php" },
                    "3": { name: "source.php" }
                  },
                  match: {
                    G: [/￿(\p{space}*)((\?))(?=>)/dgv, /(\p{space}*)((\?))(?=>)/dgvy]
                  },
                  name: "meta.special.empty-tag.php"
                },
                {
                  begin: {
                    G: [/￿/dgv, /(?:)/dgv]
                  },
                  contentName: "source.php",
                  end: /(\?)(?=>)/dgv,
                  endCaptures: {
                    "0": { name: "punctuation.section.embedded.end.php" },
                    "1": { name: "source.php" }
                  },
                  patterns: [
                    { include: "#language" }
                  ]
                }
              ]
            }
          ]
        },
        {
          begin: /(?<!@)\{\{\{/dgv,
          beginCaptures: {
            "0": { name: "support.function.construct.begin.blade" }
          },
          contentName: "source.php",
          end: /\}\}\}/dgv,
          endCaptures: {
            "0": { name: "support.function.construct.end.blade" },
            "1": { name: "source.php" }
          },
          name: "meta.function.echo.blade",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /(?<![\@\{])\{\{/dgv,
          beginCaptures: {
            "0": { name: "support.function.construct.begin.blade" }
          },
          contentName: "source.php",
          end: /\}\}/dgv,
          endCaptures: {
            "0": { name: "support.function.construct.end.blade" },
            "1": { name: "source.php" }
          },
          name: "meta.function.echo.blade",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /(?<!@)\{!!/dgv,
          beginCaptures: {
            "0": { name: "support.function.construct.begin.blade" }
          },
          contentName: "source.php",
          end: /!!\}/dgv,
          endCaptures: {
            "0": { name: "support.function.construct.end.blade" },
            "1": { name: "source.php" }
          },
          name: "meta.function.echo.blade",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /(@)\{\{/dgv,
          beginCaptures: {
            "0": { name: "begin.bracket.round.blade" },
            "1": { name: "variable.other.index.php" }
          },
          contentName: "source.php",
          end: /\}\}/dgv,
          endCaptures: {
            "0": { name: "end.bracket.round.blade" },
            "1": { name: "source.php" }
          },
          name: "meta.function.echo.blade",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /(?<![0-9\@-Z_a-z])(@(?:[Aa][Uu][Tt][Hh]|[Bb][Rr][Ee][Aa][KKk]|[Cc][Aa][Nn]|[Cc][Aa][Nn][Aa][Nn][Yy]|[Cc][Aa][Nn][Nn][Oo][Tt]|[Cc][Aa][Ssſ][Ee]|[Cc][Hh][Oo][Ii][Cc][Ee]|[Cc][Oo][Mm][Pp][Oo][Nn][Ee][Nn][Tt]|[Cc][Oo][Nn][Tt][Ii][Nn][Uu][Ee]|[Dd][Dd]|[Dd][Uu][Mm][Pp]|[Ee][Aa][Cc][Hh]|[Ee][Ll][Ssſ][Ee][Cc][Aa][Nn]|[Ee][Ll][Ssſ][Ee][Cc][Aa][Nn][Aa][Nn][Yy]|[Ee][Ll][Ssſ][Ee][Cc][Aa][Nn][Nn][Oo][Tt]|[Ee][Ll][Ssſ][Ee][Ii][Ff]|[Ee][Mm][Pp][Tt][Yy]|[Ee][Rr][Rr][Oo][Rr]|[Ee][Xx][Tt][Ee][Nn][Dd][Ssſ]|[Ff][Oo][Rr]|[Ff][Oo][Rr][Ee][Aa][Cc][Hh]|[Ff][Oo][Rr][Ee][Ll][Ssſ][Ee]|[Gg][Uu][Ee][Ssſ][Tt]|[Hh][Aa][Ssſ][Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ii][Ff]|[Ii][Nn][Cc][Ll][Uu][Dd][Ee]|[Ii][Nn][Cc][Ll][Uu][Dd][Ee][Ff][Ii][Rr][Ssſ][Tt]|[Ii][Nn][Cc][Ll][Uu][Dd][Ee][Ii][Ff]|[Ii][Nn][Cc][Ll][Uu][Dd][Ee][Uu][Nn][Ll][Ee][Ssſ][Ssſ]|[Ii][Nn][Cc][Ll][Uu][Dd][Ee][Ww][Hh][Ee][Nn]|[Ii][Nn][Jj][Ee][Cc][Tt]|[Ii][Ssſ][Ssſ][Ee][Tt]|[Jj][Ssſ][Oo][Nn]|[Ll][Aa][Nn][Gg]|[Oo][Nn][Cc][Ee]|[Pp][Rr][Ee][Pp][Ee][Nn][Dd]|[Pp][Uu][Ssſ][Hh]|[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn][Mm][Ii][Ssſ][Ssſ][Ii][Nn][Gg]|[Ssſ][Ll][Oo][Tt]|[Ssſ][Tt][Aa][Cc][KKk]|[Ssſ][Ww][Ii][Tt][Cc][Hh]|[Uu][Nn][Ll][Ee][Ssſ][Ssſ]|[Uu][Nn][Ssſ][Ee][Tt]|[Ww][Hh][Ii][Ll][Ee]|[Yy][Ii][Ee][Ll][Dd]|[Ssſ][Ee][Rr][Vv][Ee][Rr][Ssſ]|[Tt][Aa][Ssſ][KKk]|[Ssſ][Tt][Oo][Rr][Yy]|[Ff][Ii][Nn][Ii][Ssſ][Hh][Ee][Dd]|[Pp][Rr][Oo][Dd][Uu][Cc][Tt][Ii][Oo][Nn]|[Ssſ][Ll][Aa][Cc][KKk]|[Mm][Ee][Tt][Hh][Oo][Dd]|[Pp][Rr][Oo][Pp][Ssſ]|[Ee][Nn][Vv]|[Ll][Ii][Vv][Ee][Ww][Ii][Rr][Ee]|[Pp][Hh][Pp]|[Cc][Ll][Aa][Ssſ][Ssſ]|[Aa][Ww][Aa][Rr][Ee]|[Jj][Ssſ]|[Cc][Hh][Ee][Cc][KKk][Ee][Dd]|[Ssſ][Ee][Ll][Ee][Cc][Tt][Ee][Dd]|[Dd][Ii][Ssſ][Aa][Bb][Ll][Ee][Dd]|[Ssſ][Tt][Yy][Ll][Ee]|[Rr][Ee][Aa][Dd][Oo][Nn][Ll][Yy]|[Rr][Ee][Qq][Uu][Ii][Rr][Ee][Dd]|[Pp][Uu][Ssſ][Hh][Oo][Nn][Cc][Ee]|[Pp][Uu][Ssſ][Hh][Ii][Ff]|[Pp][Rr][Ee][Pp][Ee][Nn][Dd][Oo][Nn][Cc][Ee]|[Uu][Ssſ][Ee]|[Vv][Ii][Tt][Ee])[\t ]*)(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.blade" },
            "2": { name: "begin.bracket.round.blade.php" }
          },
          contentName: "source.php",
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "end.bracket.round.blade.php" }
          },
          name: "meta.directive.blade",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /(?<![0-9\@-Z_a-z])(@(?:[Aa][Pp][Pp][Ee][Nn][Dd]|[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ee][Ll][Ssſ][Ee]|[Ee][Nn][Dd][Aa][Uu][Tt][Hh]|[Ee][Nn][Dd][Cc][Aa][Nn]|[Ee][Nn][Dd][Cc][Aa][Nn][Aa][Nn][Yy]|[Ee][Nn][Dd][Cc][Aa][Nn][Nn][Oo][Tt]|[Ee][Nn][Dd][Cc][Oo][Mm][Pp][Oo][Nn][Ee][Nn][Tt]|[Ee][Nn][Dd][Ee][Mm][Pp][Tt][Yy]|[Ee][Nn][Dd][Ee][Rr][Rr][Oo][Rr]|[Ee][Nn][Dd][Ff][Oo][Rr]|[Ee][Nn][Dd][Ff][Oo][Rr][Ee][Aa][Cc][Hh]|[Ee][Nn][Dd][Ff][Oo][Rr][Ee][Ll][Ssſ][Ee]|[Ee][Nn][Dd][Gg][Uu][Ee][Ssſ][Tt]|[Ee][Nn][Dd][Ii][Ff]|[Ee][Nn][Dd][Ii][Ssſ][Ssſ][Ee][Tt]|[Ee][Nn][Dd][Ll][Aa][Nn][Gg]|[Ee][Nn][Dd][Oo][Nn][Cc][Ee]|[Ee][Nn][Dd][Pp][Rr][Ee][Pp][Ee][Nn][Dd]|[Ee][Nn][Dd][Pp][Uu][Ssſ][Hh]|[Ee][Nn][Dd][Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ee][Nn][Dd][Ssſ][Ll][Oo][Tt]|[Ee][Nn][Dd][Ssſ][Ww][Ii][Tt][Cc][Hh]|[Ee][Nn][Dd][Uu][Nn][Ll][Ee][Ssſ][Ssſ]|[Ee][Nn][Dd][Ww][Hh][Ii][Ll][Ee]|[Oo][Vv][Ee][Rr][Ww][Rr][Ii][Tt][Ee]|[Pp][Aa][Rr][Ee][Nn][Tt]|[Ssſ][Hh][Oo][Ww]|[Ssſ][Tt][Oo][Pp]|[Ee][Nn][Dd][Tt][Aa][Ssſ][KKk]|[Ee][Nn][Dd][Ssſ][Tt][Oo][Rr][Yy]|[Ee][Nn][Dd][Ff][Ii][Nn][Ii][Ssſ][Hh][Ee][Dd]|[Ee][Nn][Dd][Pp][Rr][Oo][Dd][Uu][Cc][Tt][Ii][Oo][Nn]|[Ee][Nn][Dd][Ee][Nn][Vv]|[Ee][Nn][Dd][Pp][Uu][Ssſ][Hh][Oo][Nn][Cc][Ee]|[Ee][Nn][Dd][Pp][Uu][Ssſ][Hh][Ii][Ff]|[Ee][Nn][Dd][Pp][Rr][Ee][Pp][Ee][Nn][Dd][Oo][Nn][Cc][Ee])[\t ]*)(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.blade" },
            "2": { name: "begin.bracket.round.blade.php" }
          },
          contentName: "comment.blade",
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "end.bracket.round.blade.php" }
          },
          name: "meta.directive.blade",
          patterns: [
            { include: "#balance_brackets" }
          ]
        },
        {
          match: /(?<![0-9\@-Z_a-z])@(?:append|break|continue|csrf|default|each|else|overwrite|parent|sectionMissing|show|stack|stop|livewireStyles|livewireScripts)\b/dgv,
          name: "keyword.blade"
        },
        {
          match: /(?<![0-9\@-Z_a-z])@(end)?(?:[Aa][Uu][Tt][Hh]|[Cc][Aa][Nn]|[Cc][Aa][Nn][Aa][Nn][Yy]|[Cc][Aa][Nn][Nn][Oo][Tt]|[Cc][Oo][Mm][Pp][Oo][Nn][Ee][Nn][Tt]|[Ee][Mm][Pp][Tt][Yy]|[Ee][Rr][Rr][Oo][Rr]|[Ff][Oo][Rr]|[Ff][Oo][Rr][Ee][Aa][Cc][Hh]|[Ff][Oo][Rr][Ee][Ll][Ssſ][Ee]|[Gg][Uu][Ee][Ssſ][Tt]|[Ii][Ff]|[Ii][Ssſ][Ssſ][Ee][Tt]|[Ll][Aa][Nn][Gg]|[Pp][Rr][Ee][Pp][Ee][Nn][Dd]|[Pp][Uu][Ssſ][Hh]|[Ssſ][Ee][Cc][Tt][Ii][Oo][Nn]|[Ssſ][Ll][Oo][Tt]|[Ssſ][Ww][Ii][Tt][Cc][Hh]|[Uu][Nn][Ll][Ee][Ssſ][Ssſ]|[Vv][Ee][Rr][Bb][Aa][Tt][Ii][Mm]|[Ww][Hh][Ii][Ll][Ee]|[Tt][Aa][Ssſ][KKk]|[Ssſ][Tt][Oo][Rr][Yy]|[Ff][Ii][Nn][Ii][Ssſ][Hh][Ee][Dd]|[Pp][Rr][Oo][Dd][Uu][Cc][Tt][Ii][Oo][Nn]|[Ee][Nn][Vv]|[Oo][Nn][Cc][Ee]|[Pp][Uu][Ssſ][Hh][Oo][Nn][Cc][Ee]|[Pp][Uu][Ssſ][Hh][Ii][Ff]|[Pp][Rr][Ee][Pp][Ee][Nn][Dd][Oo][Nn][Cc][Ee]|[Ssſ][Ee][Ssſ][Ssſ][Ii][Oo][Nn])\b/dgv,
          name: "keyword.blade"
        },
        {
          begin: /(?<![0-9\@-Z_a-z])@(?:[Pp][Hh][Pp]|[Ssſ][Ee][Tt][Uu][Pp])\b/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" }
          },
          contentName: "source.php",
          end: /(?<![0-9\@-Z_a-z])(?=@[Ee][Nn][Dd](?:[Pp][Hh][Pp]|[Ssſ][Ee][Tt][Uu][Pp])\b)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" }
          },
          name: "meta.embedded.block.blade",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /(?<![0-9\@-Z_a-z])(@[Ee][Nn][Dd](?:[Pp][Hh][Pp]|[Ssſ][Ee][Tt][Uu][Pp])[\t ]*)(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.embedded.end.php" },
            "2": { name: "begin.bracket.round.blade.php" }
          },
          contentName: "comment.blade",
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "end.bracket.round.blade.php" }
          },
          name: "meta.directive.blade",
          patterns: [
            { include: "#balance_brackets" }
          ]
        },
        {
          match: /(?<![0-9\@-Z_a-z])@(?:[Ee][Nn][Dd][Pp][Hh][Pp]|[Ee][Nn][Dd][Ssſ][Ee][Tt][Uu][Pp])\b/dgv,
          name: "punctuation.section.embedded.end.php"
        },
        {
          begin: /(?<![0-9\@-Z_a-z])(@[\p{L}\p{M}\p{N}\p{Pc}]+(?:::w+)?[\t ]*)(\()/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.blade" },
            "2": { name: "begin.bracket.round.blade.php" }
          },
          contentName: "source.php",
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "end.bracket.round.blade.php" }
          },
          name: "meta.directive.custom.blade",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          match: /(?<![0-9\@-Z_a-z])@[\p{L}\p{M}\p{N}\p{Pc}]+(?:::w+)?\b/dgv,
          name: "entity.name.function.blade"
        },
        {
          begin: /(:[\-a-z]+)(=)(")/dgv,
          beginCaptures: {
            "0": { name: "meta.attribute.unrecognized.$1.html" },
            "1": { name: "entity.other.attribute-name.html" },
            "2": { name: "punctuation.separator.key-value.html" },
            "3": { name: "string.quoted.double.html" },
            "4": { name: "punctuation.definition.string.begin.html" }
          },
          contentName: "source.php",
          end: /(")/dgv,
          endCaptures: {
            "0": { name: "string.quoted.double.html" },
            "1": { name: "punctuation.definition.string.end.html" }
          },
          patterns: [
            { include: "#language" }
          ]
        }
      ]
    },
    "class-builtin": {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.separator.inheritance.php" }
          },
          match: new EmulatedRegExp("(\\\\)?\\b((A(?:PC|ppend))Iterator|Array(Access|Iterator|Object)|Bad(Function|Method)CallException|(Ca(?:ching|llbackFilter))Iterator|Collator|Collectable|Cond|Countable|CURLFile|Date(Interval|Period|Time(Interface|Immutable|Zone)?)?|Directory(Iterator)?|DomainException|DOM(Attr|CdataSection|CharacterData|Comment|Document(Fragment)?|Element|EntityReference|Implementation|NamedNodeMap|Node(list)?|ProcessingInstruction|Text|XPath)|(Error)?Exception|EmptyIterator|finfo|Ev(Check|Child|Embed|Fork|Idle|Io|Loop|Periodic|Prepare|Signal|Stat|Timer|Watcher)?|Event(Base|Buffer(Event)?|SslContext|Http(Request|Connection)?|Config|DnsBase|Util|Listener)?|FANNConnection|(Fil(?:ter|esystem))Iterator|Gender\\\\Gender|GlobIterator|Gmagick(Draw|Pixel)?|Haru(Annotation|Destination|Doc|Encoder|Font|Image|Outline|Page)|Http(((?:In|De)flate)?Stream|Message|Request(Pool)?|Response|QueryString)|HRTime\\\\(PerformanceCounter|StopWatch)|Intl(Calendar|((CodePoint|RuleBased)?Break|Parts)?Iterator|DateFormatter|TimeZone)|Imagick(Draw|Pixel(Iterator)?)?|InfiniteIterator|InvalidArgumentException|Iterator(Aggregate|Iterator)?|JsonSerializable|KTaglib_(MPEG_(File|AudioProperties)|Tag|ID3v2_(Tag|(AttachedPicture)?Frame))|Lapack|(L(?:ength|ocale|ogic))Exception|LimitIterator|Lua(Closure)?|Mongo(BinData|Client|Code|Collection|CommandCursor|Cursor(Exception)?|Date|DB(Ref)?|DeleteBatch|Grid(FS(Cursor|File)?)|Id|InsertBatch|Int(32|64)|Log|Pool|Regex|ResultException|Timestamp|UpdateBatch|Write(Batch|ConcernException))?|Memcache(d)?|MessageFormatter|MultipleIterator|Mutex|mysqli(_(driver|stmt|warning|result))?|MysqlndUh(Connection|PreparedStatement)|NoRewindIterator|Normalizer|NumberFormatter|OCI-(Collection|Lob)|OuterIterator|(O(?:utOf(Bounds|Range)|verflow))Exception|ParentIterator|PDO(Statement)?|Phar(Data|FileInfo)?|php_user_filter|Pool|QuickHash(Int(S(?:et|tringHash))|StringIntHash)|Recursive(Array|Caching|Directory|Fallback|Filter|Iterator|Regex|Tree)?Iterator|Reflection(Class|Function(Abstract)?|Method|Object|Parameter|Property|(Zend)?Extension)?|RangeException|Reflector|RegexIterator|ResourceBundle|RuntimeException|RRD(Creator|Graph|Updater)|SAM(Connection|Message)|SCA(_((?:Soap|Local)Proxy))?|SDO_(DAS_(ChangeSummary|Data(Factory|Object)|Relational|Setting|XML(_Document)?)|Data(Factory|Object)|Exception|List|Model_(Property|ReflectionDataObject|Type)|Sequence)|SeekableIterator|Serializable|SessionHandler(Interface)?|SimpleXML(Iterator|Element)|SNMP|Soap(Client|Fault|Header|Param|Server|Var)|SphinxClient|Spoofchecker|Spl(DoublyLinkedList|Enum|File(Info|Object)|FixedArray|(M(?:ax|in))?Heap|Observer|ObjectStorage|(Priority)?Queue|Stack|Subject|Type|TempFileObject)|SQLite(3(Result|Stmt)?|Database|Result|Unbuffered)|stdClass|streamWrapper|SVM(Model)?|Swish(Result(s)?|Search)?|Sync(Event|Mutex|ReaderWriter|Semaphore)|Thread(ed)?|tidy(Node)?|TokyoTyrant(Table|Iterator|Query)?|Transliterator|Traversable|UConverter|(Un(?:derflow|expectedValue))Exception|V8Js(Exception)?|Varnish(Admin|Log|Stat)|Worker|Weak(Map|Ref)|XML(Diff\\\\(Base|DOM|File|Memory)|Reader|Writer)|XsltProcessor|Yaf_(Route_(Interface|Map|Regex|Rewrite|Simple|Supervar)|Action_Abstract|Application|Config_(Simple|Ini|Abstract)|Controller_Abstract|Dispatcher|Exception|Loader|Plugin_Abstract|Registry|Request_(Abstract|Simple|Http)|Response_Abstract|Router|Session|View_(Simple|Interface))|Yar_(Client(_Exception)?|Concurrent_Client|Server(_Exception)?)|ZipArchive|ZMQ(Context|Device|Poll|Socket)?)\\b", "dgiv", { lazyCompile: true }),
          name: "support.class.builtin.php"
        }
      ]
    },
    "class-name": {
      patterns: [
        {
          begin: /(?=\\?[0-9_a-z]+\\)/dgiv,
          end: /([_a-z][0-9_a-z]*)?(?=[^0-9\\_a-z])/dgiv,
          endCaptures: {
            "1": { name: "support.class.php" }
          },
          patterns: [
            { include: "#namespace" }
          ]
        },
        { include: "#class-builtin" },
        {
          begin: /(?=[A-Z\\_a-z])/dgv,
          end: /([_a-z][0-9_a-z]*)?(?=[^0-9\\_a-z])/dgiv,
          endCaptures: {
            "1": { name: "support.class.php" }
          },
          patterns: [
            { include: "#namespace" }
          ]
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: /\/\*\*(?=\p{space})/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.php" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.php" }
          },
          name: "comment.block.documentation.phpdoc.php",
          patterns: [
            { include: "#php_doc" }
          ]
        },
        {
          begin: /\/\*/dgv,
          captures: {
            "0": { name: "punctuation.definition.comment.php" }
          },
          end: /\*\//dgv,
          name: "comment.block.php"
        },
        {
          begin: /(^\p{space}+)?(?=\/\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.php" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /\/\//dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.php" }
              },
              end: /\n|(?=\?>)/dgv,
              name: "comment.line.double-slash.php"
            }
          ]
        },
        {
          begin: /(^\p{space}+)?(?=#)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.php" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /#/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.php" }
              },
              end: /\n|(?=\?>)/dgv,
              name: "comment.line.number-sign.php"
            }
          ]
        }
      ]
    },
    constants: {
      patterns: [
        {
          match: /\b(TRUE|FALSE|NULL|__(FILE|DIR|FUNCTION|CLASS|METHOD|LINE|NAMESPACE)__|ON|OFF|YES|NO|NL|BR|TAB)\b/dgiv,
          name: "constant.language.php"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.inheritance.php" }
          },
          match: /(\\)?\b(DEFAULT_INCLUDE_PATH|EAR_(INSTALL|EXTENSION)_DIR|E_(ALL|COMPILE_(ERROR|WARNING)|CORE_(ERROR|WARNING)|DEPRECATED|ERROR|NOTICE|PARSE|RECOVERABLE_ERROR|STRICT|USER_(DEPRECATED|ERROR|NOTICE|WARNING)|WARNING)|PHP_(ROUND_HALF_(DOWN|EVEN|ODD|UP)|(MAJOR|MINOR|RELEASE)_VERSION|MAXPATHLEN|BINDIR|SHLIB_SUFFIX|SYSCONFDIR|SAPI|CONFIG_FILE_(PATH|SCAN_DIR)|INT_(MAX|SIZE)|ZTS|OS|OUTPUT_HANDLER_(START|CONT|END)|DEBUG|DATADIR|URL_(SCHEME|HOST|USER|PORT|PASS|PATH|QUERY|FRAGMENT)|PREFIX|EXTRA_VERSION|EXTENSION_DIR|EOL|VERSION(_ID)?|WINDOWS_(NT_(SERVER|DOMAIN_CONTROLLER|WORKSTATION)|VERSION_(M(?:AJOR|INOR))|BUILD|SUITEMASK|SP_(M(?:AJOR|INOR))|PRODUCTTYPE|PLATFORM)|LIBDIR|LOCALSTATEDIR)|STD(ERR|IN|OUT)|ZEND_(DEBUG_BUILD|THREAD_SAFE))\b/dgv,
          name: "support.constant.core.php"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.inheritance.php" }
          },
          match: /(\\)?\b(__COMPILER_HALT_OFFSET__|AB(MON_([1-9]|10|11|12)|DAY[1-7])|AM_STR|ASSERT_(ACTIVE|BAIL|CALLBACK_QUIET_EVAL|WARNING)|ALT_DIGITS|CASE_(UPPER|LOWER)|CHAR_MAX|CONNECTION_(ABORTED|NORMAL|TIMEOUT)|CODESET|COUNT_(NORMAL|RECURSIVE)|CREDITS_(ALL|DOCS|FULLPAGE|GENERAL|GROUP|MODULES|QA|SAPI)|CRYPT_(BLOWFISH|EXT_DES|MD5|SHA(256|512)|SALT_LENGTH|STD_DES)|CURRENCY_SYMBOL|D_(T_)?FMT|DATE_(ATOM|COOKIE|ISO8601|RFC(822|850|1036|1123|2822|3339)|RSS|W3C)|DAY_[1-7]|DECIMAL_POINT|DIRECTORY_SEPARATOR|ENT_(COMPAT|IGNORE|(NO)?QUOTES)|EXTR_(IF_EXISTS|OVERWRITE|PREFIX_(ALL|IF_EXISTS|INVALID|SAME)|REFS|SKIP)|ERA(_(D_(T_)?FMT)|T_FMT|YEAR)?|FRAC_DIGITS|GROUPING|HASH_HMAC|HTML_(ENTITIES|SPECIALCHARS)|INF|INFO_(ALL|CREDITS|CONFIGURATION|ENVIRONMENT|GENERAL|LICENSEMODULES|VARIABLES)|INI_(ALL|CANNER_(NORMAL|RAW)|PERDIR|SYSTEM|USER)|INT_(CURR_SYMBOL|FRAC_DIGITS)|LC_(ALL|COLLATE|CTYPE|MESSAGES|MONETARY|NUMERIC|TIME)|LOCK_(EX|NB|SH|UN)|LOG_(ALERT|AUTH(PRIV)?|CRIT|CRON|CONS|DAEMON|DEBUG|EMERG|ERR|INFO|LOCAL[1-7]|LPR|KERN|MAIL|NEWS|NODELAY|NOTICE|NOWAIT|ODELAY|PID|PERROR|WARNING|SYSLOG|UCP|USER)|M_(1_PI|SQRT(1_2|[23]|PI)|2_(SQRT)?PI|PI(_([24]))?|E(ULER)?|LN(10|2|PI)|LOG(10|2)E)|MON_([1-9]|10|11|12|DECIMAL_POINT|GROUPING|THOUSANDS_SEP)|N_(CS_PRECEDES|SEP_BY_SPACE|SIGN_POSN)|NAN|NEGATIVE_SIGN|NO(EXPR|STR)|P_(CS_PRECEDES|SEP_BY_SPACE|SIGN_POSN)|PM_STR|POSITIVE_SIGN|PATH(_SEPARATOR|INFO_(EXTENSION|(BASE|DIR|FILE)NAME))|RADIXCHAR|SEEK_(CUR|END|SET)|SORT_(ASC|DESC|LOCALE_STRING|REGULAR|STRING)|STR_PAD_(BOTH|LEFT|RIGHT)|T_FMT(_AMPM)?|THOUSEP|THOUSANDS_SEP|UPLOAD_ERR_(CANT_WRITE|EXTENSION|(FORM|INI)_SIZE|NO_(FILE|TMP_DIR)|OK|PARTIAL)|YES(EXPR|STR))\b/dgv,
          name: "support.constant.std.php"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.inheritance.php" }
          },
          match: new EmulatedRegExp("(\\\\)?\\b(GLOB_(MARK|BRACE|NO(SORT|CHECK|ESCAPE)|ONLYDIR|ERR|AVAILABLE_FLAGS)|XML_(SAX_IMPL|(DTD|DOCUMENT(_(FRAG|TYPE))?|HTML_DOCUMENT|NOTATION|NAMESPACE_DECL|PI|COMMENT|DATA_SECTION|TEXT)_NODE|OPTION_(SKIP_(TAGSTART|WHITE)|CASE_FOLDING|TARGET_ENCODING)|ERROR_((BAD_CHAR|(ATTRIBUTE_EXTERNAL|BINARY|PARAM|RECURSIVE)_ENTITY)_REF|MISPLACED_XML_PI|SYNTAX|NONE|NO_(MEMORY|ELEMENTS)|TAG_MISMATCH|INCORRECT_ENCODING|INVALID_TOKEN|DUPLICATE_ATTRIBUTE|UNCLOSED_(CDATA_SECTION|TOKEN)|UNDEFINED_ENTITY|UNKNOWN_ENCODING|JUNK_AFTER_DOC_ELEMENT|PARTIAL_CHAR|EXTERNAL_ENTITY_HANDLING|ASYNC_ENTITY)|ENTITY_(((REF|DECL)_)?NODE)|ELEMENT(_DECL)?_NODE|LOCAL_NAMESPACE|ATTRIBUTE_(N(?:MTOKEN(S)?|OTATION|ODE))|CDATA|ID(REF(S)?)?|DECL_NODE|ENTITY|ENUMERATION)|MHASH_(RIPEMD(128|160|256|320)|GOST|MD([245])|SHA(1|224|256|384|512)|SNEFRU256|HAVAL(128|160|192|224|256)|CRC23(B)?|TIGER(1(?:28|60))?|WHIRLPOOL|ADLER32)|MYSQL_(BOTH|NUM|CLIENT_(SSL|COMPRESS|IGNORE_SPACE|INTERACTIVE|ASSOC))|MYSQLI_(REPORT_(STRICT|INDEX|OFF|ERROR|ALL)|REFRESH_(GRANT|MASTER|BACKUP_LOG|STATUS|SLAVE|HOSTS|THREADS|TABLES|LOG)|READ_DEFAULT_(FILE|GROUP)|(GROUP|MULTIPLE_KEY|BINARY|BLOB)_FLAG|BOTH|STMT_ATTR_(CURSOR_TYPE|UPDATE_MAX_LENGTH|PREFETCH_ROWS)|STORE_RESULT|SERVER_QUERY_(NO_((GOOD_)?INDEX_USED)|WAS_SLOW)|SET_(CHARSET_NAME|FLAG)|NO_(D(?:EFAULT_VALUE_FLAG|ATA))|NOT_NULL_FLAG|NUM(_FLAG)?|CURSOR_TYPE_(READ_ONLY|SCROLLABLE|NO_CURSOR|FOR_UPDATE)|CLIENT_(SSL|NO_SCHEMA|COMPRESS|IGNORE_SPACE|INTERACTIVE|FOUND_ROWS)|TYPE_(GEOMETRY|((MEDIUM|LONG|TINY)_)?BLOB|BIT|SHORT|STRING|SET|YEAR|NULL|NEWDECIMAL|NEWDATE|CHAR|TIME(STAMP)?|TINY|INT24|INTERVAL|DOUBLE|DECIMAL|DATE(TIME)?|ENUM|VAR_STRING|FLOAT|LONG(LONG)?)|TIME_STAMP_FLAG|INIT_COMMAND|ZEROFILL_FLAG|ON_UPDATE_NOW_FLAG|OPT_(NET_((CMD|READ)_BUFFER_SIZE)|CONNECT_TIMEOUT|INT_AND_FLOAT_NATIVE|LOCAL_INFILE)|DEBUG_TRACE_ENABLED|DATA_TRUNCATED|USE_RESULT|(ENUM|(PART|PRI|UNIQUE)_KEY|UNSIGNED)_FLAG|ASSOC|ASYNC|AUTO_INCREMENT_FLAG)|MCRYPT_(RC([26])|RIJNDAEL_(128|192|256)|RAND|GOST|XTEA|MODE_(STREAM|NOFB|CBC|CFB|OFB|ECB)|MARS|BLOWFISH(_COMPAT)?|SERPENT|SKIPJACK|SAFER(64|128|PLUS)|CRYPT|CAST_(128|256)|TRIPLEDES|THREEWAY|TWOFISH|IDEA|(3)?DES|DECRYPT|DEV_(U)?RANDOM|PANAMA|ENCRYPT|ENIGNA|WAKE|LOKI97|ARCFOUR(_IV)?)|STREAM_(REPORT_ERRORS|MUST_SEEK|MKDIR_RECURSIVE|BUFFER_(NONE|FULL|LINE)|SHUT_(RD)?WR|SOCK_(RDM|RAW|STREAM|SEQPACKET|DGRAM)|SERVER_(BIND|LISTEN)|NOTIFY_(REDIRECTED|RESOLVE|MIME_TYPE_IS|SEVERITY_(INFO|ERR|WARN)|COMPLETED|CONNECT|PROGRESS|FILE_SIZE_IS|FAILURE|AUTH_(RE(?:QUIRED|SULT)))|CRYPTO_METHOD_((SSLv2(3)?|SSLv3|TLS)_(CLIENT|SERVER))|CLIENT_((ASYNC_)?CONNECT|PERSISTENT)|CAST_(AS_STREAM|FOR_SELECT)|(I(?:GNORE|S))_URL|IPPROTO_(RAW|TCP|ICMP|IP|UDP)|OOB|OPTION_(READ_(BUFFER|TIMEOUT)|BLOCKING|WRITE_BUFFER)|URL_STAT_(LINK|QUIET)|USE_PATH|PEEK|PF_(INET(6)?|UNIX)|ENFORCE_SAFE_MODE|FILTER_(ALL|READ|WRITE))|SUNFUNCS_RET_(DOUBLE|STRING|TIMESTAMP)|SQLITE_(READONLY|ROW|MISMATCH|MISUSE|BOTH|BUSY|SCHEMA|NOMEM|NOTFOUND|NOTADB|NOLFS|NUM|CORRUPT|CONSTRAINT|CANTOPEN|TOOBIG|INTERRUPT|INTERNAL|IOERR|OK|DONE|PROTOCOL|PERM|ERROR|EMPTY|FORMAT|FULL|LOCKED|ABORT|ASSOC|AUTH)|SQLITE3_(BOTH|BLOB|NUM|NULL|TEXT|INTEGER|OPEN_(READ(ONLY|WRITE)|CREATE)|FLOAT_ASSOC)|CURL(M_(BAD_((EASY)?HANDLE)|CALL_MULTI_PERFORM|INTERNAL_ERROR|OUT_OF_MEMORY|OK)|MSG_DONE|SSH_AUTH_(HOST|NONE|DEFAULT|PUBLICKEY|PASSWORD|KEYBOARD)|CLOSEPOLICY_(SLOWEST|CALLBACK|OLDEST|LEAST_(RECENTLY_USED|TRAFFIC)|INFO_(REDIRECT_(COUNT|TIME)|REQUEST_SIZE|SSL_VERIFYRESULT|STARTTRANSFER_TIME|(S(?:IZE|PEED))_((?:DOWN|UP)LOAD)|HTTP_CODE|HEADER_(OUT|SIZE)|NAMELOOKUP_TIME|CONNECT_TIME|CONTENT_(TYPE|LENGTH_((?:DOWN|UP)LOAD))|CERTINFO|TOTAL_TIME|PRIVATE|PRETRANSFER_TIME|EFFECTIVE_URL|FILETIME)|OPT_(RESUME_FROM|RETURNTRANSFER|REDIR_PROTOCOLS|REFERER|READ(DATA|FUNCTION)|RANGE|RANDOM_FILE|MAX(CONNECTS|REDIRS)|BINARYTRANSFER|BUFFERSIZE|SSH_(HOST_PUBLIC_KEY_MD5|(P(?:RIVATE|UBLIC))_KEYFILE)|AUTH_TYPES)|SSL(CERT(TYPE|PASSWD)?|ENGINE(_DEFAULT)?|VERSION|KEY(TYPE|PASSWD)?)|SSL_(CIPHER_LIST|VERIFY(HOST|PEER))|STDERR|HTTP(GET|HEADER|200ALIASES|_VERSION|PROXYTUNNEL|AUTH)|HEADER(FUNCTION)?|NO(BODY|SIGNAL|PROGRESS)|NETRC|CRLF|CONNECTTIMEOUT(_MS)?|COOKIE(SESSION|JAR|FILE)?|CUSTOMREQUEST|CERTINFO|CLOSEPOLICY|CA(INFO|PATH)|TRANSFERTEXT|TCP_NODELAY|TIME(CONDITION|OUT(_MS)?|VALUE)|INTERFACE|INFILE(SIZE)?|IPRESOLVE|DNS_(CACHE_TIMEOUT|USE_GLOBAL_CACHE)|URL|USER(AGENT|PWD)|UNRESTRICTED_AUTH|UPLOAD|PRIVATE|PROGRESSFUNCTION|PROXY(TYPE|USERPWD|PORT|AUTH)?|PROTOCOLS|PORT|POST(REDIR|QUOTE|FIELDS)?|PUT|EGDSOCKET|ENCODING|VERBOSE|KRB4LEVEL|KEYPASSWD|QUOTE|FRESH_CONNECT|FTP(APPEND|LISTONLY|PORT|SSLAUTH)|FTP_(SSL|SKIP_PASV_IP|CREATE_MISSING_DIRS|USE_EP(RT|SV)|FILEMETHOD)|FILE(TIME)?|FORBID_REUSE|FOLLOWLOCATION|FAILONERROR|WRITE(FUNCTION|HEADER)|LOW_SPEED_(LIMIT|TIME)|AUTOREFERER)|PROXY_(HTTP|SOCKS([45]))|PROTO_(SCP|SFTP|HTTP(S)?|TELNET|TFTP|DICT|FTP(S)?|FILE|LDAP(S)?|ALL)|E_((RE(?:CV|AD))_ERROR|GOT_NOTHING|MALFORMAT_USER|BAD_(CONTENT_ENCODING|CALLING_ORDER|PASSWORD_ENTERED|FUNCTION_ARGUMENT)|SSH|SSL_(CIPHER|CONNECT_ERROR|CERTPROBLEM|CACERT|PEER_CERTIFICATE|ENGINE_(NOTFOUND|SETFAILED))|SHARE_IN_USE|SEND_ERROR|HTTP_(RANGE_ERROR|NOT_FOUND|PORT_FAILED|POST_ERROR)|COULDNT_(RESOLVE_(HOST|PROXY)|CONNECT)|TOO_MANY_REDIRECTS|TELNET_OPTION_SYNTAX|OBSOLETE|OUT_OF_MEMORY|OPERATION|TIMEOUTED|OK|URL_MALFORMAT(_USER)?|UNSUPPORTED_PROTOCOL|UNKNOWN_TELNET_OPTION|PARTIAL_FILE|FTP_(BAD_DOWNLOAD_RESUME|SSL_FAILED|COULDNT_(RETR_FILE|GET_SIZE|STOR_FILE|SET_(BINARY|ASCII)|USE_REST)|CANT_(GET_HOST|RECONNECT)|USER_PASSWORD_INCORRECT|PORT_FAILED|QUOTE_ERROR|WRITE_ERROR|WEIRD_((PASS|PASV|SERVER|USER)_REPLY|227_FORMAT)|ACCESS_DENIED)|FILESIZE_EXCEEDED|FILE_COULDNT_READ_FILE|FUNCTION_NOT_FOUND|FAILED_INIT|WRITE_ERROR|LIBRARY_NOT_FOUND|LDAP_(SEARCH_FAILED|CANNOT_BIND|INVALID_URL)|ABORTED_BY_CALLBACK)|VERSION_NOW|FTP(METHOD_(MULTI|SINGLE|NO)CWD|SSL_(ALL|NONE|CONTROL|TRY)|AUTH_(DEFAULT|SSL|TLS))|AUTH_(ANY(SAFE)?|BASIC|DIGEST|GSSNEGOTIATE|NTLM))|CURL_(HTTP_VERSION_(1_([01])|NONE)|NETRC_(REQUIRED|IGNORED|OPTIONAL)|TIMECOND_(IF(UN)?MODSINCE|LASTMOD)|IPRESOLVE_(V([46])|WHATEVER)|VERSION_(SSL|IPV6|KERBEROS4|LIBZ))|IMAGETYPE_(GIF|XBM|BMP|SWF|COUNT|TIFF_(MM|II)|ICO|IFF|UNKNOWN|JB2|JPX|JP2|JPC|JPEG(2000)?|PSD|PNG|WBMP)|INPUT_(REQUEST|GET|SERVER|SESSION|COOKIE|POST|ENV)|ICONV_(MIME_DECODE_(STRICT|CONTINUE_ON_ERROR)|IMPL|VERSION)|DNS_(MX|SRV|SOA|HINFO|NS|NAPTR|CNAME|TXT|PTR|ANY|ALL|AAAA|A(6)?)|DOM(STRING_SIZE_ERR)|DOM_((SYNTAX|HIERARCHY_REQUEST|NO_((?:MODIFICATION|DATA)_ALLOWED)|NOT_(FOUND|SUPPORTED)|NAMESPACE|INDEX_SIZE|USE_ATTRIBUTE|VALID_(MODIFICATION|STATE|CHARACTER|ACCESS)|PHP|VALIDATION|WRONG_DOCUMENT)_ERR)|JSON_(HEX_(TAG|QUOT|AMP|APOS)|NUMERIC_CHECK|ERROR_(SYNTAX|STATE_MISMATCH|NONE|CTRL_CHAR|DEPTH|UTF8)|FORCE_OBJECT)|PREG_((D_UTF8(_OFFSET)?|NO|INTERNAL|(BACKTRACK|RECURSION)_LIMIT)_ERROR|GREP_INVERT|SPLIT_(NO_EMPTY|(DELIM|OFFSET)_CAPTURE)|SET_ORDER|OFFSET_CAPTURE|PATTERN_ORDER)|PSFS_(PASS_ON|ERR_FATAL|FEED_ME|FLAG_(NORMAL|FLUSH_(CLOSE|INC)))|PCRE_VERSION|POSIX_(([FRWX])_OK|S_IF(REG|BLK|SOCK|CHR|IFO))|FNM_(NOESCAPE|CASEFOLD|PERIOD|PATHNAME)|FILTER_(REQUIRE_(SCALAR|ARRAY)|NULL_ON_FAILURE|CALLBACK|DEFAULT|UNSAFE_RAW|SANITIZE_(MAGIC_QUOTES|STRING|STRIPPED|SPECIAL_CHARS|NUMBER_(INT|FLOAT)|URL|EMAIL|ENCODED|FULL_SPCIAL_CHARS)|VALIDATE_(REGEXP|BOOLEAN|INT|IP|URL|EMAIL|FLOAT)|FORCE_ARRAY|FLAG_(SCHEME_REQUIRED|STRIP_(BACKTICK|HIGH|LOW)|HOST_REQUIRED|NONE|NO_(RES|PRIV)_RANGE|ENCODE_QUOTES|IPV([46])|PATH_REQUIRED|EMPTY_STRING_NULL|ENCODE_(HIGH|LOW|AMP)|QUERY_REQUIRED|ALLOW_(SCIENTIFIC|HEX|THOUSAND|OCTAL|FRACTION)))|FILE_(BINARY|SKIP_EMPTY_LINES|NO_DEFAULT_CONTEXT|TEXT|IGNORE_NEW_LINES|USE_INCLUDE_PATH|APPEND)|FILEINFO_(RAW|MIME(_(ENCODING|TYPE))?|SYMLINK|NONE|CONTINUE|DEVICES|PRESERVE_ATIME)|FORCE_(DEFLATE|GZIP)|LIBXML_(XINCLUDE|NSCLEAN|NO(XMLDECL|BLANKS|NET|CDATA|ERROR|EMPTYTAG|ENT|WARNING)|COMPACT|DTD(VALID|LOAD|ATTR)|((DOTTED|LOADED)_)?VERSION|PARSEHUGE|ERR_(NONE|ERROR|FATAL|WARNING)))\\b", "dgv", { lazyCompile: true }),
          name: "support.constant.ext.php"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.inheritance.php" }
          },
          match: /(\\)?\b(T_(RETURN|REQUIRE(_ONCE)?|GOTO|GLOBAL|(MINUS|MOD|MUL|XOR)_EQUAL|METHOD_C|ML_COMMENT|BREAK|BOOL_CAST|BOOLEAN_(AND|OR)|BAD_CHARACTER|SR(_EQUAL)?|STRING(_CAST|VARNAME)?|START_HEREDOC|STATIC|SWITCH|SL(_EQUAL)?|HALT_COMPILER|NS_(C|SEPARATOR)|NUM_STRING|NEW|NAMESPACE|CHARACTER|COMMENT|CONSTANT(_ENCAPSED_STRING)?|CONCAT_EQUAL|CONTINUE|CURLY_OPEN|CLOSE_TAG|CLONE|CLASS(_C)?|CASE|CATCH|TRY|THROW|IMPLEMENTS|ISSET|IS_((GREATER|SMALLER)_OR_EQUAL|(NOT_)?(IDENTICAL|EQUAL))|INSTANCEOF|INCLUDE(_ONCE)?|INC|INT_CAST|INTERFACE|INLINE_HTML|IF|OR_EQUAL|OBJECT_(CAST|OPERATOR)|OPEN_TAG(_WITH_ECHO)?|OLD_FUNCTION|DNUMBER|DIR|DIV_EQUAL|DOC_COMMENT|DOUBLE_(ARROW|CAST|COLON)|DOLLAR_OPEN_CURLY_BRACES|DO|DEC|DECLARE|DEFAULT|USE|UNSET(_CAST)?|PRINT|PRIVATE|PROTECTED|PUBLIC|PLUS_EQUAL|PAAMAYIM_NEKUDOTAYIM|EXTENDS|EXIT|EMPTY|ENCAPSED_AND_WHITESPACE|END(SWITCH|IF|DECLARE|FOR(EACH)?|WHILE)|END_HEREDOC|ECHO|EVAL|ELSE(IF)?|VAR(IABLE)?|FINAL|FILE|FOR(EACH)?|FUNC_C|FUNCTION|WHITESPACE|WHILE|LNUMBER|LIST|LINE|LOGICAL_(AND|OR|XOR)|ARRAY_(CAST)?|ABSTRACT|AS|AND_EQUAL))\b/dgv,
          name: "support.constant.parser-token.php"
        },
        {
          match: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
          name: "constant.other.php"
        }
      ]
    },
    "function-call": {
      patterns: [
        {
          begin: /(\\?\b[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*(?:\\[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)+)\p{space}*(\()/dgiv,
          beginCaptures: {
            "1": {
              patterns: [
                { include: "#namespace" },
                {
                  match: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
                  name: "entity.name.function.php"
                }
              ]
            },
            "2": { name: "punctuation.definition.arguments.begin.bracket.round.php" }
          },
          end: /\)|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.bracket.round.php" }
          },
          name: "meta.function-call.php",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /(\\)?\b([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}*(\()/dgiv,
          beginCaptures: {
            "1": {
              patterns: [
                { include: "#namespace" }
              ]
            },
            "2": {
              patterns: [
                { include: "#support" },
                {
                  match: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
                  name: "entity.name.function.php"
                }
              ]
            },
            "3": { name: "punctuation.definition.arguments.begin.bracket.round.php" }
          },
          end: /\)|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.bracket.round.php" }
          },
          name: "meta.function-call.php",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          match: /\b(print|echo)\b/dgiv,
          name: "support.function.construct.output.php"
        }
      ]
    },
    "function-parameters": {
      patterns: [
        { include: "#comments" },
        {
          match: /,/dgv,
          name: "punctuation.separator.delimiter.php"
        },
        {
          begin: /(array)\p{space}+((&)?\p{space}*(\$+)[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}*(=)\p{space}*(array)\p{space}*(\()/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.php" },
            "2": { name: "variable.other.php" },
            "3": { name: "storage.modifier.reference.php" },
            "4": { name: "punctuation.definition.variable.php" },
            "5": { name: "keyword.operator.assignment.php" },
            "6": { name: "support.function.construct.php" },
            "7": { name: "punctuation.definition.array.begin.bracket.round.php" }
          },
          contentName: "meta.array.php",
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.array.end.bracket.round.php" }
          },
          name: "meta.function.parameter.array.php",
          patterns: [
            { include: "#comments" },
            { include: "#strings" },
            { include: "#numbers" }
          ]
        },
        {
          captures: {
            "1": { name: "storage.type.php" },
            "2": { name: "variable.other.php" },
            "3": { name: "storage.modifier.reference.php" },
            "4": { name: "punctuation.definition.variable.php" },
            "5": { name: "keyword.operator.assignment.php" },
            "6": { name: "constant.language.php" },
            "7": { name: "punctuation.section.array.begin.php" },
            "8": {
              patterns: [
                { include: "#parameter-default-types" }
              ]
            },
            "9": { name: "punctuation.section.array.end.php" },
            "10": { name: "invalid.illegal.non-null-typehinted.php" }
          },
          match: new EmulatedRegExp("(array|callable)\\p{space}+((&)?\\p{space}*(\\$+)[_a-z\\x7F-ÿ][0-9_a-z\\x7F-ÿ]*)(?:\\p{space}*(=)\\p{space}*(?:(null)|(\\[)((?:(?=([^\\]\\[]+|\\[(?:(?:(?=([^\\]\\[]+|\\[(?:(?:(?=([^\\]\\[]+|\\[(?:(?:(?=([^\\]\\[]+|\\[(?:(?:(?=([^\\]\\[]+|\\[(?:)\\]))\\13)*)\\]))\\12)*)\\]))\\11)*)\\]))\\10)*)\\]))\\9)*)(\\])|(\\P{space}*?\\(\\)|\\P{space}*?)))?\\p{space}*(?=[\\)\\,]|/[\\*\\/]|#|(?=\\n?$))", "dgiv", { hiddenCaptures: [9, 10, 11, 12, 13] }),
          name: "meta.function.parameter.array.php"
        },
        {
          begin: /(\\?(?:[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*\\)*)([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}+((&)?\p{space}*(\.\.\.)?(\$+)[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)/dgiv,
          beginCaptures: {
            "1": {
              name: "support.other.namespace.php",
              patterns: [
                {
                  match: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
                  name: "storage.type.php"
                },
                {
                  match: /\\/dgv,
                  name: "punctuation.separator.inheritance.php"
                }
              ]
            },
            "2": { name: "storage.type.php" },
            "3": { name: "variable.other.php" },
            "4": { name: "storage.modifier.reference.php" },
            "5": { name: "keyword.operator.variadic.php" },
            "6": { name: "punctuation.definition.variable.php" }
          },
          end: /(?=[\)\,]|\/[\*\/]|#)/dgv,
          name: "meta.function.parameter.typehinted.php",
          patterns: [
            {
              begin: /=/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.assignment.php" }
              },
              end: /(?=[\)\,]|\/[\*\/]|#)/dgv,
              patterns: [
                { include: "#language" }
              ]
            }
          ]
        },
        {
          captures: {
            "1": { name: "variable.other.php" },
            "2": { name: "storage.modifier.reference.php" },
            "3": { name: "keyword.operator.variadic.php" },
            "4": { name: "punctuation.definition.variable.php" }
          },
          match: /((&)?\p{space}*(\.\.\.)?(\$+)[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}*(?=[\)\,]|\/[\*\/]|#|(?=\n?$))/dgiv,
          name: "meta.function.parameter.no-default.php"
        },
        {
          begin: new EmulatedRegExp("((&)?\\p{space}*(\\.\\.\\.)?(\\$+)[_a-z\\x7F-ÿ][0-9_a-z\\x7F-ÿ]*)\\p{space}*(=)\\p{space}*(?:(\\[)((?:(?=([^\\]\\[]+|\\[(\\[)\\]))\\8)*)(\\]))?", "dgiv", { hiddenCaptures: [8, 9], transfers: [[6, [9]]] }),
          beginCaptures: {
            "1": { name: "variable.other.php" },
            "2": { name: "storage.modifier.reference.php" },
            "3": { name: "keyword.operator.variadic.php" },
            "4": { name: "punctuation.definition.variable.php" },
            "5": { name: "keyword.operator.assignment.php" },
            "6": { name: "punctuation.section.array.begin.php" },
            "7": {
              patterns: [
                { include: "#parameter-default-types" }
              ]
            },
            "8": { name: "punctuation.section.array.end.php" }
          },
          end: /(?=[\)\,]|\/[\*\/]|#)/dgv,
          name: "meta.function.parameter.default.php",
          patterns: [
            { include: "#parameter-default-types" }
          ]
        }
      ]
    },
    heredoc: {
      patterns: [
        {
          begin: /(?=<<<\p{space}*("?)([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)(\1)\p{space}*(?=\n?$))/dgiv,
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          name: "string.unquoted.heredoc.php",
          patterns: [
            { include: "#heredoc_interior" }
          ]
        },
        {
          begin: /(?=<<<\p{space}*'([A-Z_a-z]+[0-9A-Z_a-z]*)'\p{space}*(?=\n?$))/dgv,
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          name: "string.unquoted.nowdoc.php",
          patterns: [
            { include: "#nowdoc_interior" }
          ]
        }
      ]
    },
    heredoc_interior: {
      patterns: [
        {
          begin: /(<<<)\p{space}*("?)(HTML)(\2)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "text.html",
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.heredoc.php" }
          },
          name: "meta.embedded.html",
          patterns: [
            { include: "#interpolation" },
            { include: "text.html.basic" }
          ]
        },
        {
          begin: /(<<<)\p{space}*("?)(BLADE)(\2)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "text.blade",
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.heredoc.php" }
          },
          name: "meta.embedded.blade",
          patterns: [
            { include: "#interpolation" },
            { include: "text.html.basic" },
            { include: "#blade" }
          ]
        },
        {
          begin: /(<<<)\p{space}*("?)(XML)(\2)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "text.xml",
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.heredoc.php" }
          },
          name: "meta.embedded.xml",
          patterns: [
            { include: "#interpolation" },
            { include: "text.xml" }
          ]
        },
        {
          begin: /(<<<)\p{space}*("?)(SQL)(\2)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "source.sql",
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.heredoc.php" }
          },
          name: "meta.embedded.sql",
          patterns: [
            { include: "#interpolation" },
            { include: "source.sql" }
          ]
        },
        {
          begin: /(<<<)\p{space}*("?)(J(?:AVASCRIPT|S))(\2)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "source.js",
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.heredoc.php" }
          },
          name: "meta.embedded.js",
          patterns: [
            { include: "#interpolation" },
            { include: "source.js" }
          ]
        },
        {
          begin: /(<<<)\p{space}*("?)(JSON)(\2)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "source.json",
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.heredoc.php" }
          },
          name: "meta.embedded.json",
          patterns: [
            { include: "#interpolation" },
            { include: "source.json" }
          ]
        },
        {
          begin: /(<<<)\p{space}*("?)(CSS)(\2)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "source.css",
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.heredoc.php" }
          },
          name: "meta.embedded.css",
          patterns: [
            { include: "#interpolation" },
            { include: "source.css" }
          ]
        },
        {
          begin: /(<<<)\p{space}*("?)(REGEXP?)(\2)(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "string.regexp.heredoc.php",
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.heredoc.php" }
          },
          patterns: [
            { include: "#interpolation" },
            {
              match: /(\\){1,2}[\]\$\.\[\^\{\}]/dgv,
              name: "constant.character.escape.regex.php"
            },
            {
              captures: {
                "1": { name: "punctuation.definition.arbitrary-repitition.php" },
                "3": { name: "punctuation.definition.arbitrary-repitition.php" }
              },
              match: /(\{)\p{Nd}+(,\p{Nd}+)?(\})/dgv,
              name: "string.regexp.arbitrary-repitition.php"
            },
            {
              begin: /\[(?:\^?\])?/dgv,
              captures: {
                "0": { name: "punctuation.definition.character-class.php" }
              },
              end: /\]/dgv,
              name: "string.regexp.character-class.php",
              patterns: [
                {
                  match: /\\[\]'\[\\]/dgv,
                  name: "constant.character.escape.php"
                }
              ]
            },
            {
              match: /[\$\*\+\^]/dgv,
              name: "keyword.operator.regexp.php"
            },
            {
              begin: /(?<=^|\p{space})(#)\p{space}(?=[\-\t \!\,\.0-9\?_a-z\x7F-ÿ[^\x00-\x7F]]*(?=\n?$))/dgiv,
              beginCaptures: {
                "1": { name: "punctuation.definition.comment.php" }
              },
              end: /(?=\n?$)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.comment.php" }
              },
              name: "comment.line.number-sign.php"
            }
          ]
        },
        {
          begin: /(<<<)\p{space}*("?)([_a-z\x7F-ÿ]+[0-9_a-z\x7F-ÿ]*)(\2)(\p{space}*)/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.php" },
            "3": { name: "keyword.operator.heredoc.php" },
            "5": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          end: /^\p{space}*(3)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.heredoc.php" }
          },
          patterns: [
            { include: "#interpolation" }
          ]
        }
      ]
    },
    instantiation: {
      begin: /(new)\p{space}+/dgiv,
      beginCaptures: {
        "1": { name: "keyword.other.new.php" }
      },
      end: /(?=[^0-9\\_a-z\x7F-ÿ])/dgiv,
      patterns: [
        {
          match: /(parent|static|self)(?![0-9_a-z\x7F-ÿ])/dgiv,
          name: "storage.type.php"
        },
        { include: "#class-name" },
        { include: "#variable-name" }
      ]
    },
    interpolation: {
      patterns: [
        {
          match: /\\[0-7]{1,3}/dgv,
          name: "constant.character.escape.octal.php"
        },
        {
          match: /\\x\p{AHex}{1,2}/dgv,
          name: "constant.character.escape.hex.php"
        },
        {
          match: /\\u\{\p{AHex}+\}/dgv,
          name: "constant.character.escape.unicode.php"
        },
        {
          match: /\\["\$\\efnrtv]/dgv,
          name: "constant.character.escape.php"
        },
        {
          begin: /\{(?=\$[^\n]*?\})/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.variable.php" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.variable.php" }
          },
          patterns: [
            { include: "#language" }
          ]
        },
        { include: "#variable-name" }
      ]
    },
    "invoke-call": {
      captures: {
        "1": { name: "punctuation.definition.variable.php" },
        "2": { name: "variable.other.php" }
      },
      match: /(\$+)([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)(?=\p{space}*\()/dgiv,
      name: "meta.function-call.invoke.php"
    },
    language: {
      patterns: [
        { include: "#comments" },
        {
          begin: /^\p{space}*(interface)\p{space}+([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}*(extends)?\p{space}*/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.interface.php" },
            "2": { name: "entity.name.type.interface.php" },
            "3": { name: "storage.modifier.extends.php" }
          },
          end: /((?:[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*\p{space}*,\p{space}*)*)([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)?\p{space}*(?:(?=\{)|(?=\n?$))/dgiv,
          endCaptures: {
            "1": {
              patterns: [
                {
                  match: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
                  name: "entity.other.inherited-class.php"
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.classes.php"
                }
              ]
            },
            "2": { name: "entity.other.inherited-class.php" }
          },
          name: "meta.interface.php",
          patterns: [
            { include: "#namespace" }
          ]
        },
        {
          begin: /^\p{space}*(trait)\p{space}+([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.trait.php" },
            "2": { name: "entity.name.type.trait.php" }
          },
          end: /(?=\{)/dgv,
          name: "meta.trait.php",
          patterns: [
            { include: "#comments" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.other.namespace.php" },
            "2": {
              name: "entity.name.type.namespace.php",
              patterns: [
                {
                  match: /\\/dgv,
                  name: "punctuation.separator.inheritance.php"
                }
              ]
            }
          },
          match: /(?:^|(?<=<\?php))\p{space}*(namespace)\p{space}+([0-9\\_a-z\x7F-ÿ]+)(?=\p{space}*;)/dgiv,
          name: "meta.namespace.php"
        },
        {
          begin: /(?:^|(?<=<\?php))\p{space}*(namespace)\p{space}+/dgiv,
          beginCaptures: {
            "1": { name: "keyword.other.namespace.php" }
          },
          end: /(?<=\})|(?=\?>)/dgv,
          name: "meta.namespace.php",
          patterns: [
            { include: "#comments" },
            {
              captures: {
                "0": {
                  patterns: [
                    {
                      match: /\\/dgv,
                      name: "punctuation.separator.inheritance.php"
                    }
                  ]
                }
              },
              match: /[0-9\\_a-z\x7F-ÿ]+/dgiv,
              name: "entity.name.type.namespace.php"
            },
            {
              begin: /\{/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.namespace.begin.bracket.curly.php" }
              },
              end: /\}|(?=\?>)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.namespace.end.bracket.curly.php" }
              },
              patterns: [
                { include: "#language" }
              ]
            },
            {
              match: /\P{space}+/dgv,
              name: "invalid.illegal.identifier.php"
            }
          ]
        },
        {
          match: /\p{space}+(?=use\b)/dgv
        },
        {
          begin: /\buse\b/dgiv,
          beginCaptures: {
            "0": { name: "keyword.other.use.php" }
          },
          end: /(?<=\})|(?=;)/dgv,
          name: "meta.use.php",
          patterns: [
            {
              match: /\b(const|function)\b/dgv,
              name: "storage.type.${1:/downcase}.php"
            },
            {
              begin: /\{/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.use.begin.bracket.curly.php" }
              },
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.use.end.bracket.curly.php" }
              },
              patterns: [
                { include: "#scope-resolution" },
                {
                  captures: {
                    "1": { name: "keyword.other.use-as.php" },
                    "2": { name: "storage.modifier.php" },
                    "3": { name: "entity.other.alias.php" }
                  },
                  match: /\b(as)\p{space}+(final|abstract|public|private|protected|static)\p{space}+([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\b/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.other.use-as.php" },
                    "2": {
                      patterns: [
                        {
                          match: /^(?:final|abstract|public|private|protected|static)(?=\n?$)/dgv,
                          name: "storage.modifier.php"
                        },
                        {
                          match: /[^\n]+/dgv,
                          name: "entity.other.alias.php"
                        }
                      ]
                    }
                  },
                  match: /\b(as)\p{space}+([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\b/dgiv
                },
                {
                  captures: {
                    "1": { name: "keyword.other.use-insteadof.php" },
                    "2": { name: "support.class.php" }
                  },
                  match: /\b(insteadof)\p{space}+([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)/dgiv
                },
                {
                  match: /;/dgv,
                  name: "punctuation.terminator.expression.php"
                },
                { include: "#use-inner" }
              ]
            },
            { include: "#use-inner" }
          ]
        },
        {
          begin: /^\p{space}*(?:(abstract|final)\p{space}+)?(class)\p{space}+([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)/dgiv,
          beginCaptures: {
            "1": { name: "storage.modifier.${1:/downcase}.php" },
            "2": { name: "storage.type.class.php" },
            "3": { name: "entity.name.type.class.php" }
          },
          end: /\}|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.class.end.bracket.curly.php" }
          },
          name: "meta.class.php",
          patterns: [
            { include: "#comments" },
            {
              begin: /(extends)\p{space}+/dgiv,
              beginCaptures: {
                "1": { name: "storage.modifier.extends.php" }
              },
              contentName: "meta.other.inherited-class.php",
              end: /(?=[^0-9\\_a-z\x7F-ÿ])/dgiv,
              patterns: [
                {
                  begin: /(?=\\?[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*\\)/dgiv,
                  end: /([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)?(?=[^0-9\\_a-z\x7F-ÿ])/dgiv,
                  endCaptures: {
                    "1": { name: "entity.other.inherited-class.php" }
                  },
                  patterns: [
                    { include: "#namespace" }
                  ]
                },
                { include: "#class-builtin" },
                { include: "#namespace" },
                {
                  match: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
                  name: "entity.other.inherited-class.php"
                }
              ]
            },
            {
              begin: /(implements)\p{space}+/dgiv,
              beginCaptures: {
                "1": { name: "storage.modifier.implements.php" }
              },
              end: /(?=[\;\{])/dgv,
              patterns: [
                { include: "#comments" },
                {
                  begin: /(?=[0-9\\_a-z\x7F-ÿ]+)/dgiv,
                  contentName: "meta.other.inherited-class.php",
                  end: /\p{space}*(?:,|(?=[^0-9\\_a-z\x7F-ÿ\p{space}]))\p{space}*/dgiv,
                  patterns: [
                    {
                      begin: /(?=\\?[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*\\)/dgiv,
                      end: /([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)?(?=[^0-9\\_a-z\x7F-ÿ])/dgiv,
                      endCaptures: {
                        "1": { name: "entity.other.inherited-class.php" }
                      },
                      patterns: [
                        { include: "#namespace" }
                      ]
                    },
                    { include: "#class-builtin" },
                    { include: "#namespace" },
                    {
                      match: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
                      name: "entity.other.inherited-class.php"
                    }
                  ]
                }
              ]
            },
            {
              begin: /\{/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.class.begin.bracket.curly.php" }
              },
              contentName: "meta.class.body.php",
              end: /(?=\}|\?>)/dgv,
              patterns: [
                { include: "#language" }
              ]
            }
          ]
        },
        { include: "#switch_statement" },
        {
          captures: {
            "1": { name: "keyword.control.${1:/downcase}.php" }
          },
          match: /\p{space}*\b(break|case|continue|declare|default|die|do|else(if)?|end(declare|for(each)?|if|switch|while)|exit|for(each)?|if|return|switch|use|while|yield)\b/dgv
        },
        {
          begin: /\b((?:require|include)(?:_once)?)\p{space}+/dgiv,
          beginCaptures: {
            "1": { name: "keyword.control.import.include.php" }
          },
          end: /(?=[\;\p{space}]|(?=\n?$)|\?>)/dgv,
          name: "meta.include.php",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /\b(catch)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "keyword.control.exception.catch.php" },
            "2": { name: "punctuation.definition.parameters.begin.bracket.round.php" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.parameters.end.bracket.round.php" }
          },
          name: "meta.catch.php",
          patterns: [
            { include: "#namespace" },
            {
              captures: {
                "1": { name: "support.class.exception.php" },
                "2": {
                  patterns: [
                    {
                      match: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
                      name: "support.class.exception.php"
                    },
                    {
                      match: /\|/dgv,
                      name: "punctuation.separator.delimiter.php"
                    }
                  ]
                },
                "3": { name: "variable.other.php" },
                "4": { name: "punctuation.definition.variable.php" }
              },
              match: /([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)((?:\p{space}*\|\p{space}*[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)*)\p{space}*((\$+)[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)/dgiv
            }
          ]
        },
        {
          match: /\b(catch|try|throw|exception|finally)\b/dgv,
          name: "keyword.control.exception.php"
        },
        {
          begin: /\b(function)\p{space}*(?=\()/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.function.php" }
          },
          end: /(?=\{)/dgv,
          name: "meta.function.closure.php",
          patterns: [
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.parameters.begin.bracket.round.php" }
              },
              contentName: "meta.function.parameters.php",
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.parameters.end.bracket.round.php" }
              },
              patterns: [
                { include: "#function-parameters" }
              ]
            },
            {
              begin: /(use)\p{space}*(\()/dgiv,
              beginCaptures: {
                "1": { name: "keyword.other.function.use.php" },
                "2": { name: "punctuation.definition.parameters.begin.bracket.round.php" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.parameters.end.bracket.round.php" }
              },
              patterns: [
                {
                  captures: {
                    "1": { name: "variable.other.php" },
                    "2": { name: "storage.modifier.reference.php" },
                    "3": { name: "punctuation.definition.variable.php" }
                  },
                  match: /((&)?\p{space}*(\$+)[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}*(?=[\)\,])/dgiv,
                  name: "meta.function.closure.use.php"
                }
              ]
            }
          ]
        },
        {
          begin: /((?:(?:final|abstract|public|private|protected|static)\p{space}+)*)(function)\p{space}+(?:(__(?:[Cc][Aa][Ll][Ll]|[Cc][Oo][Nn][Ssſ][Tt][Rr][Uu][Cc][Tt]|[Dd][Ee][Bb][Uu][Gg][Ii][Nn][Ff][Oo]|[Dd][Ee][Ssſ][Tt][Rr][Uu][Cc][Tt]|[Gg][Ee][Tt]|[Ssſ][Ee][Tt]|[Ii][Ssſ][Ssſ][Ee][Tt]|[Uu][Nn][Ssſ][Ee][Tt]|[Tt][Oo][Ssſ][Tt][Rr][Ii][Nn][Gg]|[Cc][Ll][Oo][Nn][Ee]|[Ssſ][Ee][Tt]_[Ssſ][Tt][Aa][Tt][Ee]|[Ssſ][Ll][Ee][Ee][Pp]|[Ww][Aa][KKk][Ee][Uu][Pp]|[Aa][Uu][Tt][Oo][Ll][Oo][Aa][Dd]|[Ii][Nn][Vv][Oo][KKk][Ee]|[Cc][Aa][Ll][Ll][Ssſ][Tt][Aa][Tt][Ii][Cc]))|([A-Za-zſK_a-zA-ZſK\x7F-ÿŸΜẞÅ][0-9A-Za-zſK_a-zA-ZſK\x7F-ÿŸΜẞÅ]*))\p{space}*(\()/dgv,
          beginCaptures: {
            "1": {
              patterns: [
                {
                  match: /final|abstract|public|private|protected|static/dgv,
                  name: "storage.modifier.php"
                }
              ]
            },
            "2": { name: "storage.type.function.php" },
            "3": { name: "support.function.magic.php" },
            "4": { name: "entity.name.function.php" },
            "5": { name: "punctuation.definition.parameters.begin.bracket.round.php" }
          },
          contentName: "meta.function.parameters.php",
          end: /(\))(?:\p{space}*(:)\p{space}*([A-Z_a-z\x7F-ÿ][0-9A-Z_a-z\x7F-ÿ]*))?/dgv,
          endCaptures: {
            "1": { name: "punctuation.definition.parameters.end.bracket.round.php" },
            "2": { name: "keyword.operator.return-value.php" },
            "3": { name: "storage.type.php" }
          },
          name: "meta.function.php",
          patterns: [
            { include: "#function-parameters" }
          ]
        },
        { include: "#invoke-call" },
        { include: "#scope-resolution" },
        { include: "#variables" },
        { include: "#strings" },
        {
          captures: {
            "1": { name: "support.function.construct.php" },
            "2": { name: "punctuation.definition.array.begin.bracket.round.php" },
            "3": { name: "punctuation.definition.array.end.bracket.round.php" }
          },
          match: /(array)(\()(\))/dgv,
          name: "meta.array.empty.php"
        },
        {
          begin: /(array)(\()/dgv,
          beginCaptures: {
            "1": { name: "support.function.construct.php" },
            "2": { name: "punctuation.definition.array.begin.bracket.round.php" }
          },
          end: /\)|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.array.end.bracket.round.php" }
          },
          name: "meta.array.php",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.storage-type.begin.bracket.round.php" },
            "2": { name: "storage.type.php" },
            "3": { name: "punctuation.definition.storage-type.end.bracket.round.php" }
          },
          match: /(\()\p{space}*(array|real|double|float|int(?:eger)?|bool(?:ean)?|string|object|binary|unset)\p{space}*(\))/dgiv
        },
        {
          match: /\b(array|real|double|float|int(eger)?|bool(ean)?|string|class|var|function|interface|trait|parent|self|object)\b/dgiv,
          name: "storage.type.php"
        },
        {
          match: /\b(global|abstract|const|extends|implements|final|private|protected|public|static)\b/dgiv,
          name: "storage.modifier.php"
        },
        { include: "#object" },
        {
          match: /;/dgv,
          name: "punctuation.terminator.expression.php"
        },
        {
          match: /:/dgv,
          name: "punctuation.terminator.statement.php"
        },
        { include: "#heredoc" },
        { include: "#numbers" },
        {
          match: /\bclone\b/dgiv,
          name: "keyword.other.clone.php"
        },
        {
          match: /\.=?/dgv,
          name: "keyword.operator.string.php"
        },
        {
          match: /=>/dgv,
          name: "keyword.operator.key.php"
        },
        {
          captures: {
            "1": { name: "keyword.operator.assignment.php" },
            "2": { name: "storage.modifier.reference.php" },
            "3": { name: "storage.modifier.reference.php" }
          },
          match: /(=)(&)|(&)(?=[\$_a-z])/dgiv
        },
        {
          match: /@/dgv,
          name: "keyword.operator.error-control.php"
        },
        {
          match: /===?|!==?|<>/dgv,
          name: "keyword.operator.comparison.php"
        },
        {
          match: /(?:|[\-\%\&\*\+\/\^\|]|<<|>>)=/dgv,
          name: "keyword.operator.assignment.php"
        },
        {
          match: /<=>?|>=|[\<\>]/dgv,
          name: "keyword.operator.comparison.php"
        },
        {
          match: /--|\+\+/dgv,
          name: "keyword.operator.increment-decrement.php"
        },
        {
          match: /[\-\%\*\+\/]/dgv,
          name: "keyword.operator.arithmetic.php"
        },
        {
          match: /(!|&&|\|\|)|\b(and|or|xor|as)\b/dgiv,
          name: "keyword.operator.logical.php"
        },
        { include: "#function-call" },
        {
          match: /<<|>>|[\&\^\|\~]/dgv,
          name: "keyword.operator.bitwise.php"
        },
        {
          begin: /\b(instanceof)\p{space}+(?=[\$\\_a-z])/dgiv,
          beginCaptures: {
            "1": { name: "keyword.operator.type.php" }
          },
          end: /(?=[^\$0-9\\_a-z\x7F-ÿ])/dgv,
          patterns: [
            { include: "#class-name" },
            { include: "#variable-name" }
          ]
        },
        { include: "#instantiation" },
        {
          captures: {
            "1": { name: "keyword.control.goto.php" },
            "2": { name: "support.other.php" }
          },
          match: /(goto)\p{space}+([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)/dgiv
        },
        {
          captures: {
            "1": { name: "entity.name.goto-label.php" }
          },
          match: /^\p{space}*([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}*:(?!:)/dgiv
        },
        { include: "#string-backtick" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.begin.bracket.curly.php" }
          },
          end: /\}|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.end.bracket.curly.php" }
          },
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /\[/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.array.begin.php" }
          },
          end: /\]|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.array.end.php" }
          },
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.begin.bracket.round.php" }
          },
          end: /\)|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.end.bracket.round.php" }
          },
          patterns: [
            { include: "#language" }
          ]
        },
        { include: "#constants" },
        {
          match: /,/dgv,
          name: "punctuation.separator.delimiter.php"
        }
      ]
    },
    namespace: {
      begin: /(?:(namespace)|[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)?(\\)(?=[^\n]*?[^0-9\\_a-z\x7F-ÿ])/dgiv,
      beginCaptures: {
        "1": { name: "variable.language.namespace.php" },
        "2": { name: "punctuation.separator.inheritance.php" }
      },
      end: /(?=[0-9_a-z\x7F-ÿ]*[^0-9\\_a-z\x7F-ÿ])/dgiv,
      name: "support.other.namespace.php",
      patterns: [
        {
          match: /\\/dgv,
          name: "punctuation.separator.inheritance.php"
        }
      ]
    },
    nowdoc_interior: {
      patterns: [
        {
          begin: /(<<<)\p{space}*'(HTML)'(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "text.html",
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.nowdoc.php" }
          },
          name: "meta.embedded.html",
          patterns: [
            { include: "text.html.basic" }
          ]
        },
        {
          begin: /(<<<)\p{space}*'(BLADE)'(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "text.blade",
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.nowdoc.php" }
          },
          name: "meta.embedded.blade",
          patterns: [
            { include: "text.html.basic" },
            { include: "#blade" }
          ]
        },
        {
          begin: /(<<<)\p{space}*'(XML)'(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "text.xml",
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.nowdoc.php" }
          },
          name: "meta.embedded.xml",
          patterns: [
            { include: "text.xml" }
          ]
        },
        {
          begin: /(<<<)\p{space}*'(SQL)'(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "source.sql",
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.nowdoc.php" }
          },
          name: "meta.embedded.sql",
          patterns: [
            { include: "source.sql" }
          ]
        },
        {
          begin: /(<<<)\p{space}*'(J(?:AVASCRIPT|S))'(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "source.js",
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.nowdoc.php" }
          },
          name: "meta.embedded.js",
          patterns: [
            { include: "source.js" }
          ]
        },
        {
          begin: /(<<<)\p{space}*'(JSON)'(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "source.json",
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.nowdoc.php" }
          },
          name: "meta.embedded.json",
          patterns: [
            { include: "source.json" }
          ]
        },
        {
          begin: /(<<<)\p{space}*'(CSS)'(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "source.css",
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.nowdoc.php" }
          },
          name: "meta.embedded.css",
          patterns: [
            { include: "source.css" }
          ]
        },
        {
          begin: /(<<<)\p{space}*'(REGEXP?)'(\p{space}*)(?=\n?$)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" },
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          contentName: "string.regexp.nowdoc.php",
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "keyword.operator.nowdoc.php" }
          },
          patterns: [
            {
              match: /(\\){1,2}[\]\$\.\[\^\{\}]/dgv,
              name: "constant.character.escape.regex.php"
            },
            {
              captures: {
                "1": { name: "punctuation.definition.arbitrary-repitition.php" },
                "3": { name: "punctuation.definition.arbitrary-repitition.php" }
              },
              match: /(\{)\p{Nd}+(,\p{Nd}+)?(\})/dgv,
              name: "string.regexp.arbitrary-repitition.php"
            },
            {
              begin: /\[(?:\^?\])?/dgv,
              captures: {
                "0": { name: "punctuation.definition.character-class.php" }
              },
              end: /\]/dgv,
              name: "string.regexp.character-class.php",
              patterns: [
                {
                  match: /\\[\]'\[\\]/dgv,
                  name: "constant.character.escape.php"
                }
              ]
            },
            {
              match: /[\$\*\+\^]/dgv,
              name: "keyword.operator.regexp.php"
            },
            {
              begin: /(?<=^|\p{space})(#)\p{space}(?=[\-\t \!\,\.0-9\?_a-z\x7F-ÿ[^\x00-\x7F]]*(?=\n?$))/dgiv,
              beginCaptures: {
                "1": { name: "punctuation.definition.comment.php" }
              },
              end: /(?=\n?$)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.comment.php" }
              },
              name: "comment.line.number-sign.php"
            }
          ]
        },
        {
          begin: /(<<<)\p{space}*'([_a-z\x7F-ÿ]+[0-9_a-z\x7F-ÿ]*)'(\p{space}*)/dgiv,
          beginCaptures: {
            "1": { name: "punctuation.definition.string.php" },
            "2": { name: "keyword.operator.nowdoc.php" },
            "3": { name: "invalid.illegal.trailing-whitespace.php" }
          },
          end: /^\p{space}*(2)\b/dgv,
          endCaptures: {
            "1": { name: "keyword.operator.nowdoc.php" }
          }
        }
      ]
    },
    numbers: {
      patterns: [
        {
          match: /0[Xx]\p{AHex}+/dgv,
          name: "constant.numeric.hex.php"
        },
        {
          match: /0[Bb][01]+/dgv,
          name: "constant.numeric.binary.php"
        },
        {
          match: /0[0-7]+/dgv,
          name: "constant.numeric.octal.php"
        },
        {
          captures: {
            "1": { name: "punctuation.separator.decimal.period.php" },
            "2": { name: "punctuation.separator.decimal.period.php" }
          },
          match: /[0-9]*(\.)[0-9]+(?:[Ee][\-\+]?[0-9]+)?|[0-9]+(\.)[0-9]*(?:[Ee][\-\+]?[0-9]+)?|[0-9]+[Ee][\-\+]?[0-9]+/dgv,
          name: "constant.numeric.decimal.php"
        },
        {
          match: /0|[1-9][0-9]*/dgv,
          name: "constant.numeric.decimal.php"
        }
      ]
    },
    object: {
      patterns: [
        {
          begin: /(->)(\$?\{)/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.class.php" },
            "2": { name: "punctuation.definition.variable.php" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.variable.php" }
          },
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /(->)([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}*(\()/dgiv,
          beginCaptures: {
            "1": { name: "keyword.operator.class.php" },
            "2": { name: "entity.name.function.php" },
            "3": { name: "punctuation.definition.arguments.begin.bracket.round.php" }
          },
          end: /\)|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.bracket.round.php" }
          },
          name: "meta.method-call.php",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.operator.class.php" },
            "2": { name: "variable.other.property.php" },
            "3": { name: "punctuation.definition.variable.php" }
          },
          match: /(->)((\$+)?[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)?/dgiv
        }
      ]
    },
    "parameter-default-types": {
      patterns: [
        { include: "#strings" },
        { include: "#numbers" },
        { include: "#string-backtick" },
        { include: "#variables" },
        {
          match: /=>/dgv,
          name: "keyword.operator.key.php"
        },
        {
          match: /=/dgv,
          name: "keyword.operator.assignment.php"
        },
        {
          match: /&(?=\p{space}*\$)/dgv,
          name: "storage.modifier.reference.php"
        },
        {
          begin: /(array)\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "support.function.construct.php" },
            "2": { name: "punctuation.definition.array.begin.bracket.round.php" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.array.end.bracket.round.php" }
          },
          name: "meta.array.php",
          patterns: [
            { include: "#parameter-default-types" }
          ]
        },
        { include: "#instantiation" },
        {
          begin: /(?=[0-9\\_a-z\x7F-ÿ]+(::)([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)?)/dgiv,
          end: /(::)([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)?/dgiv,
          endCaptures: {
            "1": { name: "keyword.operator.class.php" },
            "2": { name: "constant.other.class.php" }
          },
          patterns: [
            { include: "#class-name" }
          ]
        },
        { include: "#constants" }
      ]
    },
    php_doc: {
      patterns: [
        {
          match: /^(?!\p{space}*\*)[^\n]*?(?:(?=\*\/)|(?=\n?$)\n?)/dgv,
          name: "invalid.illegal.missing-asterisk.phpdoc.php"
        },
        {
          captures: {
            "1": { name: "keyword.other.phpdoc.php" },
            "3": { name: "storage.modifier.php" },
            "4": { name: "invalid.illegal.wrong-access-type.phpdoc.php" }
          },
          match: /^\p{space}*\*\p{space}*(@access)\p{space}+((p(?:ublic|rivate|rotected))|([^\n]+))\p{space}*(?=\n?$)/dgv
        },
        {
          captures: {
            "1": { name: "keyword.other.phpdoc.php" },
            "2": { name: "markup.underline.link.php" }
          },
          match: /(@xlink)\p{space}+([^\n]+)\p{space}*(?=\n?$)/dgv
        },
        {
          begin: /(@(?:global|param|property(-(read|write))?|return|throws|var))\p{space}+(?=[\(A-Z\\_a-z\x7F-ÿ])/dgv,
          beginCaptures: {
            "1": { name: "keyword.other.phpdoc.php" }
          },
          contentName: "meta.other.type.phpdoc.php",
          end: /(?=\p{space}|\*\/)/dgv,
          patterns: [
            { include: "#php_doc_types_array_multiple" },
            { include: "#php_doc_types_array_single" },
            { include: "#php_doc_types" }
          ]
        },
        {
          match: /@(api|abstract|author|category|copyright|example|global|inherit[Dd]oc|internal|license|link|method|property(-(read|write))?|package|param|return|see|since|source|static|subpackage|throws|todo|var|version|uses|deprecated|final|ignore)\b/dgv,
          name: "keyword.other.phpdoc.php"
        },
        {
          captures: {
            "1": { name: "keyword.other.phpdoc.php" }
          },
          match: /\{(@(link|inherit[Dd]oc))[^\n]+?\}/dgv,
          name: "meta.tag.inline.phpdoc.php"
        }
      ]
    },
    php_doc_types: {
      captures: {
        "0": {
          patterns: [
            {
              match: /\b(string|integer|int|boolean|bool|float|double|object|mixed|array|resource|void|null|callback|false|true|self)\b/dgv,
              name: "keyword.other.type.php"
            },
            { include: "#class-name" },
            {
              match: /\|/dgv,
              name: "punctuation.separator.delimiter.php"
            }
          ]
        }
      },
      match: /[\\_a-z\x7F-ÿ][0-9\\_a-z\x7F-ÿ]*(\|[\\_a-z\x7F-ÿ][0-9\\_a-z\x7F-ÿ]*)*/dgiv
    },
    php_doc_types_array_multiple: {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.type.begin.bracket.round.phpdoc.php" }
      },
      end: /(\))(\[\])|(?=\*\/)/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.type.end.bracket.round.phpdoc.php" },
        "2": { name: "keyword.other.array.phpdoc.php" }
      },
      patterns: [
        { include: "#php_doc_types_array_multiple" },
        { include: "#php_doc_types_array_single" },
        { include: "#php_doc_types" },
        {
          match: /\|/dgv,
          name: "punctuation.separator.delimiter.php"
        }
      ]
    },
    php_doc_types_array_single: {
      captures: {
        "1": {
          patterns: [
            { include: "#php_doc_types" }
          ]
        },
        "2": { name: "keyword.other.array.phpdoc.php" }
      },
      match: /([\\_a-z\x7F-ÿ][0-9\\_a-z\x7F-ÿ]*)(\[\])/dgiv
    },
    "regex-double-quoted": {
      begin: new EmulatedRegExp("\"/(?=(?:(?=((\\\\[^\\n]|[^\"\\/])+))\\1)/[ADSUXeimsux]*\")", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.php" }
      },
      end: /(\/)([ADSUXeimsux]*)(")/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.php" }
      },
      name: "string.regexp.double-quoted.php",
      patterns: [
        {
          match: /(\\){1,2}[\]\$\.\[\^\{\}]/dgv,
          name: "constant.character.escape.regex.php"
        },
        { include: "#interpolation" },
        {
          captures: {
            "1": { name: "punctuation.definition.arbitrary-repetition.php" },
            "3": { name: "punctuation.definition.arbitrary-repetition.php" }
          },
          match: /(\{)\p{Nd}+(,\p{Nd}+)?(\})/dgv,
          name: "string.regexp.arbitrary-repetition.php"
        },
        {
          begin: /\[(?:\^?\])?/dgv,
          captures: {
            "0": { name: "punctuation.definition.character-class.php" }
          },
          end: /\]/dgv,
          name: "string.regexp.character-class.php",
          patterns: [
            { include: "#interpolation" }
          ]
        },
        {
          match: /[\$\*\+\^]/dgv,
          name: "keyword.operator.regexp.php"
        }
      ]
    },
    "regex-single-quoted": {
      begin: new EmulatedRegExp("'/(?=(?:(?=((\\\\(?:\\\\(?:\\\\['\\\\]?|[^'])|[^\\n])|[^'\\/])+))\\1)/[ADSUXeimsux]*')", "dgv", { hiddenCaptures: [1] }),
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.php" }
      },
      end: /(\/)([ADSUXeimsux]*)(')/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.php" }
      },
      name: "string.regexp.single-quoted.php",
      patterns: [
        { include: "#single_quote_regex_escape" },
        {
          captures: {
            "1": { name: "punctuation.definition.arbitrary-repetition.php" },
            "3": { name: "punctuation.definition.arbitrary-repetition.php" }
          },
          match: /(\{)\p{Nd}+(,\p{Nd}+)?(\})/dgv,
          name: "string.regexp.arbitrary-repetition.php"
        },
        {
          begin: /\[(?:\^?\])?/dgv,
          captures: {
            "0": { name: "punctuation.definition.character-class.php" }
          },
          end: /\]/dgv,
          name: "string.regexp.character-class.php"
        },
        {
          match: /[\$\*\+\^]/dgv,
          name: "keyword.operator.regexp.php"
        }
      ]
    },
    "scope-resolution": {
      patterns: [
        {
          captures: {
            "1": {
              patterns: [
                {
                  match: /\b(self|static|parent)\b/dgv,
                  name: "storage.type.php"
                },
                {
                  match: /[\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
                  name: "entity.name.class.php"
                },
                { include: "#class-name" },
                { include: "#variable-name" }
              ]
            }
          },
          match: /\b([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)(?=\p{space}*::)/dgiv
        },
        {
          begin: /(::)\p{space}*([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)\p{space}*(\()/dgiv,
          beginCaptures: {
            "1": { name: "keyword.operator.class.php" },
            "2": { name: "entity.name.function.php" },
            "3": { name: "punctuation.definition.arguments.begin.bracket.round.php" }
          },
          end: /\)|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.bracket.round.php" }
          },
          name: "meta.method-call.static.php",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          captures: {
            "1": { name: "keyword.operator.class.php" },
            "2": { name: "keyword.other.class.php" }
          },
          match: /(::)\p{space}*(class)\b/dgiv
        },
        {
          captures: {
            "1": { name: "keyword.operator.class.php" },
            "2": { name: "variable.other.class.php" },
            "3": { name: "punctuation.definition.variable.php" },
            "4": { name: "constant.other.class.php" }
          },
          match: /(::)\p{space}*(?:((\$+)[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)|([_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*))?/dgiv
        }
      ]
    },
    single_quote_regex_escape: {
      match: /\\(?:\\(?:\\['\\]?|[^'])|[^\n])/dgv,
      name: "constant.character.escape.php"
    },
    "sql-string-double-quoted": {
      begin: /"\p{space}*(?=(SELECT|INSERT|UPDATE|DELETE|CREATE|REPLACE|ALTER|AND)\b)/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.php" }
      },
      contentName: "source.sql.embedded.php",
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.php" }
      },
      name: "string.quoted.double.sql.php",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.comment.sql" }
          },
          match: /(#)(\\"|[^"])*(?="|(?=\n?$))/dgv,
          name: "comment.line.number-sign.sql"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.sql" }
          },
          match: /(--)(\\"|[^"])*(?="|(?=\n?$))/dgv,
          name: "comment.line.double-dash.sql"
        },
        {
          match: /\\["'\\\`]/dgv,
          name: "constant.character.escape.php"
        },
        {
          match: /'(?=((\\')|[^"'])*("|(?=\n?$)))/dgv,
          name: "string.quoted.single.unclosed.sql"
        },
        {
          match: /`(?=((\\`)|[^"\`])*("|(?=\n?$)))/dgv,
          name: "string.quoted.other.backtick.unclosed.sql"
        },
        {
          begin: /'/dgv,
          end: /'/dgv,
          name: "string.quoted.single.sql",
          patterns: [
            { include: "#interpolation" }
          ]
        },
        {
          begin: /`/dgv,
          end: /`/dgv,
          name: "string.quoted.other.backtick.sql",
          patterns: [
            { include: "#interpolation" }
          ]
        },
        { include: "#interpolation" },
        { include: "source.sql" }
      ]
    },
    "sql-string-single-quoted": {
      begin: /'\p{space}*(?=(SELECT|INSERT|UPDATE|DELETE|CREATE|REPLACE|ALTER|AND)\b)/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.php" }
      },
      contentName: "source.sql.embedded.php",
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.php" }
      },
      name: "string.quoted.single.sql.php",
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.comment.sql" }
          },
          match: /(#)(\\'|[^'])*(?='|(?=\n?$))/dgv,
          name: "comment.line.number-sign.sql"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.comment.sql" }
          },
          match: /(--)(\\'|[^'])*(?='|(?=\n?$))/dgv,
          name: "comment.line.double-dash.sql"
        },
        {
          match: /\\["'\\\`]/dgv,
          name: "constant.character.escape.php"
        },
        {
          match: /`(?=((\\`)|[^'\`])*('|(?=\n?$)))/dgv,
          name: "string.quoted.other.backtick.unclosed.sql"
        },
        {
          match: /"(?=((\\")|[^"'])*('|(?=\n?$)))/dgv,
          name: "string.quoted.double.unclosed.sql"
        },
        { include: "source.sql" }
      ]
    },
    "string-backtick": {
      begin: /`/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.php" }
      },
      end: /`/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.php" }
      },
      name: "string.interpolated.php",
      patterns: [
        {
          match: /\\[^\n]/dgv,
          name: "constant.character.escape.php"
        },
        { include: "#interpolation" }
      ]
    },
    "string-double-quoted": {
      begin: /"/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.php" }
      },
      end: /"/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.php" }
      },
      name: "string.quoted.double.php",
      patterns: [
        { include: "#interpolation" }
      ]
    },
    "string-single-quoted": {
      begin: /'/dgv,
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.php" }
      },
      end: /'/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.php" }
      },
      name: "string.quoted.single.php",
      patterns: [
        {
          match: /\\['\\]/dgv,
          name: "constant.character.escape.php"
        }
      ]
    },
    strings: {
      patterns: [
        { include: "#regex-double-quoted" },
        { include: "#sql-string-double-quoted" },
        { include: "#string-double-quoted" },
        { include: "#regex-single-quoted" },
        { include: "#sql-string-single-quoted" },
        { include: "#string-single-quoted" }
      ]
    },
    support: {
      patterns: [
        {
          match: /\bapc_(store|sma_info|compile_file|clear_cache|cas|cache_info|inc|dec|define_constants|delete(_file)?|exists|fetch|load_constants|add|bin_(dump|load)(file)?)\b/dgiv,
          name: "support.function.apc.php"
        },
        {
          match: /\b(shuffle|sizeof|sort|next|nat(case)?sort|count|compact|current|in_array|usort|uksort|uasort|pos|prev|end|each|extract|ksort|key(_exists)?|krsort|list|asort|arsort|rsort|reset|range|array(_(shift|sum|splice|search|slice|chunk|change_key_case|count_values|column|combine|(diff|intersect)(_(u)?(key|assoc))?|u(diff|intersect)(_(u)?assoc)?|unshift|unique|pop|push|pad|product|values|keys|key_exists|filter|fill(_keys)?|flip|walk(_recursive)?|reduce|replace(_recursive)?|reverse|rand|multisort|merge(_recursive)?|map)?))\b/dgiv,
          name: "support.function.array.php"
        },
        {
          match: /\b(show_source|sys_getloadavg|sleep|highlight_(file|string)|constant|connection_(aborted|status)|time_(nanosleep|sleep_until)|ignore_user_abort|die|define(d)?|usleep|uniqid|unpack|__halt_compiler|php_(check_syntax|strip_whitespace)|pack|eval|exit|get_browser)\b/dgiv,
          name: "support.function.basic_functions.php"
        },
        {
          match: /\bbc(scale|sub|sqrt|comp|div|pow(mod)?|add|mod|mul)\b/dgiv,
          name: "support.function.bcmath.php"
        },
        {
          match: /\bblenc_encrypt\b/dgiv,
          name: "support.function.blenc.php"
        },
        {
          match: /\bbz(compress|close|open|decompress|errstr|errno|error|flush|write|read)\b/dgiv,
          name: "support.function.bz2.php"
        },
        {
          match: /\b((French|Gregorian|Jewish|Julian)ToJD|cal_(to_jd|info|days_in_month|from_jd)|unixtojd|jdto(unix|jewish)|easter_(da(?:te|ys))|JD(MonthName|To(Gregorian|Julian|French)|DayOfWeek))\b/dgiv,
          name: "support.function.calendar.php"
        },
        {
          match: /\b(class_alias|all_user_method(_array)?|is_(a|subclass_of)|__autoload|(class|interface|method|property|trait)_exists|get_(class(_(vars|methods))?|(called|parent)_class|object_vars|declared_(classes|interfaces|traits)))\b/dgiv,
          name: "support.function.classobj.php"
        },
        {
          match: /\b(com_(create_guid|print_typeinfo|event_sink|load_typelib|get_active_object|message_pump)|variant_(sub|set(_type)?|not|neg|cast|cat|cmp|int|idiv|imp|or|div|date_(from|to)_timestamp|pow|eqv|fix|and|add|abs|round|get_type|xor|mod|mul))\b/dgiv,
          name: "support.function.com.php"
        },
        {
          begin: /\b(isset|unset|eval|empty|list)\b/dgiv,
          name: "support.function.construct.php"
        },
        {
          match: /\b(print|echo)\b/dgiv,
          name: "support.function.construct.output.php"
        },
        {
          match: /\bctype_(space|cntrl|digit|upper|punct|print|lower|alnum|alpha|graph|xdigit)\b/dgiv,
          name: "support.function.ctype.php"
        },
        {
          match: /\bcurl_(share_(close|init|setopt)|strerror|setopt(_array)?|copy_handle|close|init|unescape|pause|escape|errno|error|exec|version|file_create|reset|getinfo|multi_(strerror|setopt|select|close|init|info_read|(add|remove)_handle|getcontent|exec))\b/dgiv,
          name: "support.function.curl.php"
        },
        {
          match: /\b(strtotime|str[fp]time|checkdate|time|timezone_name_(from_abbr|get)|idate|timezone_((location|offset|transitions|version)_get|(abbreviations|identifiers)_list|open)|date(_(sun(rise|set)|sun_info|sub|create(_(immutable_)?from_format)?|timestamp_([gs]et)|timezone_([gs]et)|time_set|isodate_set|interval_(create_from_date_string|format)|offset_get|diff|default_timezone_([gs]et)|date_set|parse(_from_format)?|format|add|get_last_errors|modify))?|localtime|get(date|timeofday)|gm(strftime|date|mktime)|microtime|mktime)\b/dgiv,
          name: "support.function.datetime.php"
        },
        {
          match: /\bdba_(sync|handlers|nextkey|close|insert|optimize|open|delete|popen|exists|key_split|firstkey|fetch|list|replace)\b/dgiv,
          name: "support.function.dba.php"
        },
        {
          match: /\bdbx_(sort|connect|compare|close|escape_string|error|query|fetch_row)\b/dgiv,
          name: "support.function.dbx.php"
        },
        {
          match: /\b(scandir|chdir|chroot|closedir|opendir|dir|rewinddir|readdir|getcwd)\b/dgiv,
          name: "support.function.dir.php"
        },
        {
          match: /\beio_(sync(fs)?|sync_file_range|symlink|stat(vfs)?|sendfile|set_min_parallel|set_max_(idle|poll_(reqs|time)|parallel)|seek|n(threads|op|pending|reqs|ready)|chown|chmod|custom|close|cancel|truncate|init|open|dup2|unlink|utime|poll|event_loop|f(sync|stat(vfs)?|chown|chmod|truncate|datasync|utime|allocate)|write|lstat|link|rename|realpath|read(ahead|dir|link)?|rmdir|get_(event_stream|last_error)|grp(_(add|cancel|limit))?|mknod|mkdir|busy)\b/dgiv,
          name: "support.function.eio.php"
        },
        {
          match: /\benchant_(dict_(store_replacement|suggest|check|is_in_session|describe|quick_check|add_to_(personal|session)|get_error)|broker_(set_ordering|init|dict_exists|describe|free(_dict)?|list_dicts|request_(pwl_)?dict|get_error))\b/dgiv,
          name: "support.function.enchant.php"
        },
        {
          match: /\bsplit(i)?|sql_regcase|ereg(i)?(_replace)?\b/dgiv,
          name: "support.function.ereg.php"
        },
        {
          match: /\b((restore|set)_(e(?:rror|xception)_handler)|trigger_error|debug_(print_)?backtrace|user_error|error_(log|reporting|get_last))\b/dgiv,
          name: "support.function.errorfunc.php"
        },
        {
          match: /\bshell_exec|system|passthru|proc_(nice|close|terminate|open|get_status)|escapeshell(arg|cmd)|exec\b/dgiv,
          name: "support.function.exec.php"
        },
        {
          match: /\b(exif_(thumbnail|tagname|imagetype|read_data)|read_exif_data)\b/dgiv,
          name: "support.function.exif.php"
        },
        {
          match: /\bfann_((duplicate|length|merge|shuffle|subset)_train_data|scale_(train(_data)?|((?:in|out)put)(_train_data)?)|set_(scaling_params|sarprop_(step_error_(shift|threshold_factor)|temperature|weight_decay_shift)|cascade_(num_candidate_groups|candidate_(change_fraction|limit|stagnation_epochs)|output_(change_fraction|stagnation_epochs)|weight_multiplier|activation_(functions|steepnesses)|(m(?:ax|in))_(cand|out)_epochs)|callback|training_algorithm|train_(error|stop)_function|((?:in|out)put)_scaling_params|error_log|quickprop_(decay|mu)|weight(_array)?|learning_(momentum|rate)|bit_fail_limit|activation_(function|steepness)(_(hidden|layer|output))?|rprop_(((?:de|in)crease)_factor|delta_(max|min|zero)))|save(_train)?|num_((?:in|out)put)_train_data|copy|clear_scaling_params|cascadetrain_on_(file|data)|create_((s(?:parse|hortcut|tandard))(_array)?|train(_from_callback)?|from_file)|test(_data)?|train(_(on_(file|data)|epoch))?|init_weights|descale_(input|output|train)|destroy(_train)?|print_error|run|reset_(MSE|err(no|str))|read_train_from_file|randomize_weights|get_(sarprop_(step_error_(shift|threshold_factor)|temperature|weight_decay_shift)|num_(input|output|layers)|network_type|MSE|connection_(array|rate)|bias_array|bit_fail(_limit)?|cascade_(num_(candidate(?:s|_groups))|(candidate|output)_(change_fraction|limit|stagnation_epochs)|weight_multiplier|activation_(functions|steepnesses)(_count)?|(m(?:ax|in))_(cand|out)_epochs)|total_((?:connecti|neur)ons)|training_algorithm|train_(error|stop)_function|err(no|str)|quickprop_(decay|mu)|learning_(momentum|rate)|layer_array|activation_(function|steepness)|rprop_(((?:de|in)crease)_factor|delta_(max|min|zero))))\b/dgiv,
          name: "support.function.fann.php"
        },
        {
          match: /\b(symlink|stat|set_file_buffer|chown|chgrp|chmod|copy|clearstatcache|touch|tempnam|tmpfile|is_(dir|(uploaded_)?file|executable|link|readable|writ(e)?able)|disk_(free|total)_space|diskfreespace|dirname|delete|unlink|umask|pclose|popen|pathinfo|parse_ini_(file|string)|fscanf|fstat|fseek|fnmatch|fclose|ftell|ftruncate|file(size|[acm]time|type|inode|owner|perms|group)?|file_(exists|(get|put)_contents)|f(open|puts|putcsv|passthru|eof|flush|write|lock|read|gets(s)?|getc(sv)?)|lstat|lchown|lchgrp|link(info)?|rename|rewind|read(file|link)|realpath(_cache_(get|size))?|rmdir|glob|move_uploaded_file|mkdir|basename)\b/dgiv,
          name: "support.function.file.php"
        },
        {
          match: /\b(finfo_(set_flags|close|open|file|buffer)|mime_content_type)\b/dgiv,
          name: "support.function.fileinfo.php"
        },
        {
          match: /\bfilter_(has_var|input(_array)?|id|var(_array)?|list)\b/dgiv,
          name: "support.function.filter.php"
        },
        {
          match: /\bfastcgi_finish_request\b/dgiv,
          name: "support.function.fpm.php"
        },
        {
          match: /\b(call_user_(func|method)(_array)?|create_function|unregister_tick_function|forward_static_call(_array)?|function_exists|func_(num_args|get_arg(s)?)|register_(shutdown|tick)_function|get_defined_functions)\b/dgiv,
          name: "support.function.funchand.php"
        },
        {
          match: /\b((n)?gettext|textdomain|d((?:(n)?|c(n)?)gettext)|bind(textdomain|_textdomain_codeset))\b/dgiv,
          name: "support.function.gettext.php"
        },
        {
          match: /\bgmp_(scan[01]|strval|sign|sub|setbit|sqrt(rem)?|hamdist|neg|nextprime|com|clrbit|cmp|testbit|intval|init|invert|import|or|div(exact)?|div_(qr??|r)|jacobi|popcount|pow(m)?|perfect_square|prob_prime|export|fact|legendre|and|add|abs|root(rem)?|random(_(bits|range))?|gcd(ext)?|xor|mod|mul)\b/dgiv,
          name: "support.function.gmp.php"
        },
        {
          match: /\bhash(_(hmac(_file)?|copy|init|update(_(file|stream))?|pbkdf2|equals|file|final|algos))?\b/dgiv,
          name: "support.function.hash.php"
        },
        {
          match: /\b(http_(support|send_(status|stream|content_(disposition|type)|data|file|last_modified)|head|negotiate_(charset|content_type|language)|chunked_decode|cache_(etag|last_modified)|throttle|inflate|deflate|date|post_(data|fields)|put_(data|file|stream)|persistent_handles_(count|clean|ident)|parse_(cookie|headers|message|params)|redirect|request(_(method_(exists|name|(un)?register)|body_encode))?|get(_request_(headers|body(_stream)?))?|match_(etag|modified|request_header)|build_(cookie|str|url))|ob_(etag|deflate|inflate)handler)\b/dgiv,
          name: "support.function.http.php"
        },
        {
          match: /\b(iconv(_(str(pos|len|rpos)|substr|([gs]et)_encoding|mime_(decode(_headers)?|encode)))?|ob_iconv_handler)\b/dgiv,
          name: "support.function.iconv.php"
        },
        {
          match: /\biis_((st(?:art|op))_(serv(?:ice|er))|set_(script_map|server_rights|dir_security|app_settings)|(add|remove)_server|get_(script_map|service_state|server_(rights|by_(comment|path))|dir_security))\b/dgiv,
          name: "support.function.iisfunc.php"
        },
        {
          match: /\b(iptc(embed|parse)|(jpeg|png)2wbmp|gd_info|getimagesize(fromstring)?|image(s[xy]|scale|(char|string)(up)?|set(style|thickness|tile|interpolation|pixel|brush)|savealpha|convolution|copy(resampled|resized|merge(gray)?)?|colors(forindex|total)|color(set|closest(alpha|hwb)?|transparent|deallocate|(allocate|exact|resolve)(alpha)?|at|match)|crop(auto)?|create(truecolor|from(string|jpeg|png|wbmp|webp|gif|gd(2(part)?)?|xpm|xbm))?|types|ttf(bbox|text)|truecolortopalette|istruecolor|interlace|2wbmp|destroy|dashedline|jpeg|_type_to_(extension|mime_type)|ps(slantfont|text|(encode|extend|free|load)font|bbox)|png|polygon|palette(copy|totruecolor)|ellipse|ft(text|bbox)|filter|fill|filltoborder|filled(arc|ellipse|polygon|rectangle)|font(height|width)|flip|webp|wbmp|line|loadfont|layereffect|antialias|affine(matrix(concat|get))?|alphablending|arc|rotate|rectangle|gif|gd(2)?|gammacorrect|grab(screen|window)|xbm))\b/dgiv,
          name: "support.function.image.php"
        },
        {
          match: /\b(sys_get_temp_dir|set_(time_limit|include_path|magic_quotes_runtime)|cli_([gs]et)_process_title|ini_(alter|get(_all)?|restore|set)|zend_(thread_id|version|logo_guid)|dl|php(credits|info|version)|php_(sapi_name|ini_(scanned_files|loaded_file)|uname|logo_guid)|putenv|extension_loaded|version_compare|assert(_options)?|restore_include_path|gc_(collect_cycles|disable|enable(d)?)|getopt|get_(cfg_var|current_user|defined_constants|extension_funcs|include_path|included_files|loaded_extensions|magic_quotes_(gpc|runtime)|required_files|resources)|get(env|lastmod|rusage|my(inode|[gpu]id))|memory_get_(peak_)?usage|main|magic_quotes_runtime)\b/dgiv,
          name: "support.function.info.php"
        },
        {
          match: /\bibase_(set_event_handler|service_((?:at|de)tach)|server_info|num_(fields|params)|name_result|connect|commit(_ret)?|close|trans|delete_user|drop_db|db_info|pconnect|param_info|prepare|err(code|msg)|execute|query|field_info|fetch_(assoc|object|row)|free_(event_handler|query|result)|wait_event|add_user|affected_rows|rollback(_ret)?|restore|gen_id|modify_user|maintain_db|backup|blob_(cancel|close|create|import|info|open|echo|add|get))\b/dgiv,
          name: "support.function.interbase.php"
        },
        {
          match: /\b(normalizer_(normalize|is_normalized)|idn_to_(unicode|utf8|ascii)|numfmt_(set_(symbol|(text_)?attribute|pattern)|create|(parse|format)(_currency)?|get_(symbol|(text_)?attribute|pattern|error_(code|message)|locale))|collator_(sort(_with_sort_keys)?|set_(attribute|strength)|compare|create|asort|get_(strength|sort_key|error_(code|message)|locale|attribute))|transliterator_(create(_(inverse|from_rules))?|transliterate|list_ids|get_error_(code|message))|intl(cal|tz)_get_error_(code|message)|intl_(is_failure|error_name|get_error_(code|message))|datefmt_(set_(calendar|lenient|pattern|timezone(_id)?)|create|is_lenient|parse|format(_object)?|localtime|get_(calendar(_object)?|time(type|zone(_id)?)|datetype|pattern|error_(code|message)|locale))|locale_(set_default|compose|canonicalize|parse|filter_matches|lookup|accept_from_http|get_(script|display_(script|name|variant|language|region)|default|primary_language|keywords|all_variants|region))|resourcebundle_(create|count|locales|get(_(error_(code|message)))?)|grapheme_(str(i?str|r?i?pos|len)|substr|extract)|msgfmt_(set_pattern|create|(format|parse)(_message)?|get_(pattern|error_(code|message)|locale)))\b/dgiv,
          name: "support.function.intl.php"
        },
        {
          match: /\bjson_(decode|encode|last_error(_msg)?)\b/dgiv,
          name: "support.function.json.php"
        },
        {
          match: /\bldap_(start|tls|sort|search|sasl_bind|set_(option|rebind_proc)|(first|next)_(attribute|entry|reference)|connect|control_paged_result(_response)?|count_entries|compare|close|t61_to_8859|8859_to_t61|dn2ufn|delete|unbind|parse_(re(?:ference|sult))|escape|errno|err2str|error|explode_dn|bind|free_result|list|add|rename|read|get_(option|dn|entries|values(_len)?|attributes)|modify(_batch)?|mod_(add|del|replace))\b/dgiv,
          name: "support.function.ldap.php"
        },
        {
          match: /\blibxml_(set_(streams_context|external_entity_loader)|clear_errors|disable_entity_loader|use_internal_errors|get_(errors|last_error))\b/dgiv,
          name: "support.function.libxml.php"
        },
        {
          match: /\b(ezmlm_hash|mail)\b/dgiv,
          name: "support.function.mail.php"
        },
        {
          match: /\b((a)?(cos|sin|tan)(h)?|sqrt|srand|hypot|hexdec|ceil|is_(nan|(in)?finite)|octdec|dec(hex|oct|bin)|deg2rad|pi|pow|exp(m1)?|floor|fmod|lcg_value|log(1([0p]))?|atan2|abs|round|rand|rad2deg|getrandmax|mt_(srand|rand|getrandmax)|max|min|bindec|base_convert)\b/dgiv,
          name: "support.function.math.php"
        },
        {
          match: /\bmb_(str(cut|str|to(lower|upper)|istr|ipos|imwidth|pos|width|len|rchr|richr|ripos|rpos)|substitute_character|substr(_count)?|split|send_mail|http_((?:in|out)put)|check_encoding|convert_(case|encoding|kana|variables)|internal_encoding|output_handler|decode_(numericentity|mimeheader)|detect_(encoding|order)|parse_str|preferred_mime_name|encoding_aliases|encode_(numericentity|mimeheader)|ereg(i(_replace)?)?|ereg_(search(_(get(pos|regs)|init|regs|(set)?pos))?|replace(_callback)?|match)|list_encodings|language|regex_(set_options|encoding)|get_info)\b/dgiv,
          name: "support.function.mbstring.php"
        },
        {
          match: /\b(m(?:crypt_(cfb|create_iv|cbc|ofb|decrypt|encrypt|ecb|list_(algorithms|modes)|generic(_((de)?init|end))?|enc_(self_test|is_block_(algorithm|algorithm_mode|mode)|get_(supported_key_sizes|(block|iv|key)_size|(algorithms|modes)_name))|get_(cipher_name|(block|iv|key)_size)|module_(close|self_test|is_block_(algorithm|algorithm_mode|mode)|open|get_(supported_key_sizes|algo_(block|key)_size)))|decrypt_generic))\b/dgiv,
          name: "support.function.mcrypt.php"
        },
        {
          match: /\bmemcache_debug\b/dgiv,
          name: "support.function.memcache.php"
        },
        {
          match: /\bmhash(_(count|keygen_s2k|get_(hash_name|block_size)))?\b/dgiv,
          name: "support.function.mhash.php"
        },
        {
          match: /\b(log_(cmd_(insert|delete|update)|killcursor|write_batch|reply|getmore)|bson_((?:de|en)code))\b/dgiv,
          name: "support.function.mongo.php"
        },
        {
          match: /\bmysql_(stat|set_charset|select_db|num_(fields|rows)|connect|client_encoding|close|create_db|escape_string|thread_id|tablename|insert_id|info|data_seek|drop_db|db_(name|query)|unbuffered_query|pconnect|ping|errno|error|query|field_(seek|name|type|table|flags|len)|fetch_(object|field|lengths|assoc|array|row)|free_result|list_(tables|dbs|processes|fields)|affected_rows|result|real_escape_string|get_(client|host|proto|server)_info)\b/dgiv,
          name: "support.function.mysql.php"
        },
        {
          match: /\bmysqli_(ssl_set|store_result|stat|send_(query|long_data)|set_(charset|opt|local_infile_(default|handler))|stmt_(store_result|send_long_data|next_result|close|init|data_seek|prepare|execute|fetch|free_result|attr_([gs]et)|result_metadata|reset|get_(result|warnings)|more_results|bind_(param|result))|select_db|slave_query|savepoint|next_result|change_user|character_set_name|connect|commit|client_encoding|close|thread_safe|init|options|((?:en|dis)able)_(r(?:eads_from_master|pl_parse))|dump_debug_info|debug|data_seek|use_result|ping|poll|param_count|prepare|escape_string|execute|embedded_server_(start|end)|kill|query|field_seek|free_result|autocommit|rollback|report|refresh|fetch(_(object|fields|field(_direct)?|assoc|all|array|row))?|rpl_(parse_enabled|probe|query_type)|release_savepoint|reap_async_query|real_(connect|escape_string|query)|more_results|multi_query|get_(charset|connection_stats|client_(stats|info|version)|cache_stats|warnings|links_stats|metadata)|master_query|bind_(param|result)|begin_transaction)\b/dgiv,
          name: "support.function.mysqli.php"
        },
        {
          match: /\bmysqlnd_memcache_(set|get_config)\b/dgiv,
          name: "support.function.mysqlnd-memcache.php"
        },
        {
          match: /\bmysqlnd_ms_(set_(user_pick_server|qos)|dump_servers|query_is_select|fabric_select_(shard|global)|get_(stats|last_(used_connection|gtid))|xa_(commit|rollback|gc|begin)|match_wild)\b/dgiv,
          name: "support.function.mysqlnd-ms.php"
        },
        {
          match: /\bmysqlnd_qc_(set_(storage_handler|cache_condition|is_select|user_handlers)|clear_cache|get_(normalized_query_trace_log|core_stats|cache_info|query_trace_log|available_handlers))\b/dgiv,
          name: "support.function.mysqlnd-qc.php"
        },
        {
          match: /\bmysqlnd_uh_(set_(statement|connection)_proxy|convert_to_mysqlnd)\b/dgiv,
          name: "support.function.mysqlnd-uh.php"
        },
        {
          match: /\b(syslog|socket_(set_(blocking|timeout)|get_status)|set(raw)?cookie|http_response_code|openlog|headers_(list|sent)|header(_(re(?:gister_callback|move)))?|checkdnsrr|closelog|inet_(ntop|pton)|ip2long|openlog|dns_(check_record|get_(record|mx))|define_syslog_variables|(p)?fsockopen|long2ip|get(servby(name|port)|host(name|by(name(l)?|addr))|protoby(n(?:ame|umber))|mxrr))\b/dgiv,
          name: "support.function.network.php"
        },
        {
          match: /\bnsapi_(virtual|response_headers|request_headers)\b/dgiv,
          name: "support.function.nsapi.php"
        },
        {
          match: /\b(oci(?:(statementtype|setprefetch|serverversion|savelob(file)?|numcols|new(collection|cursor|descriptor)|nlogon|column(scale|size|name|type(raw)?|isnull|precision)|coll(size|trim|assign(elem)?|append|getelem|max)|commit|closelob|cancel|internaldebug|definebyname|plogon|parse|error|execute|fetch(statement|into)?|free(statement|collection|cursor|desc)|write(temporarylob|lobtofile)|loadlob|log(o(?:n|ff))|rowcount|rollback|result|bindbyname)|_(statement_type|set_(client_(i(?:nfo|dentifier))|prefetch|edition|action|module_name)|server_version|num_(fields|rows)|new_(connect|collection|cursor|descriptor)|connect|commit|client_version|close|cancel|internal_debug|define_by_name|pconnect|password_change|parse|error|execute|bind_(array_)?by_name|field_(scale|size|name|type(_raw)?|is_null|precision)|fetch(_(object|assoc|all|array|row))?|free_(statement|descriptor)|lob_(copy|is_equal)|rollback|result|get_implicit_resultset)))\b/dgiv,
          name: "support.function.oci8.php"
        },
        {
          match: /\bopcache_(compile_file|invalidate|reset|get_(status|configuration))\b/dgiv,
          name: "support.function.opcache.php"
        },
        {
          match: /\bopenssl_(sign|spki_(new|export(_challenge)?|verify)|seal|csr_(sign|new|export(_to_file)?|get_(subject|public_key))|cipher_iv_length|open|dh_compute_key|digest|decrypt|public_((?:de|en)crypt)|encrypt|error_string|pkcs12_(export(_to_file)?|read)|pkcs7_(sign|decrypt|encrypt|verify)|verify|free_key|random_pseudo_bytes|pkey_(new|export(_to_file)?|free|get_(details|public|private))|private_((?:de|en)crypt)|pbkdf2|get_((cipher|md)_methods|cert_locations|(p(?:ublic|rivate))key)|x509_(check_private_key|checkpurpose|parse|export(_to_file)?|fingerprint|free|read))\b/dgiv,
          name: "support.function.openssl.php"
        },
        {
          match: /\b(output_(add_rewrite_var|reset_rewrite_vars)|flush|ob_(start|clean|implicit_flush|end_(clean|flush)|flush|list_handlers|gzhandler|get_(status|contents|clean|flush|length|level)))\b/dgiv,
          name: "support.function.output.php"
        },
        {
          match: /\bpassword_(hash|needs_rehash|verify|get_info)\b/dgiv,
          name: "support.function.password.php"
        },
        {
          match: /\bpcntl_(strerror|signal(_dispatch)?|sig(timedwait|procmask|waitinfo)|setpriority|errno|exec|fork|w(stopsig|termsig|if((?:stopp|signal|exit)ed))|wait(pid)?|alarm|getpriority|get_last_error)\b/dgiv,
          name: "support.function.pcntl.php"
        },
        {
          match: /\bpg_(socket|send_(prepare|execute|query(_params)?)|set_(client_encoding|error_verbosity)|select|host|num_(fields|rows)|consume_input|connection_(status|reset|busy)|connect(_poll)?|convert|copy_(from|to)|client_encoding|close|cancel_query|tty|transaction_status|trace|insert|options|delete|dbname|untrace|unescape_bytea|update|pconnect|ping|port|put_line|parameter_status|prepare|version|query(_params)?|escape_(string|identifier|literal|bytea)|end_copy|execute|flush|free_result|last_(notice|error|oid)|field_(size|num|name|type(_oid)?|table|is_null|prtlen)|affected_rows|result_(status|seek|error(_field)?)|fetch_(object|assoc|all(_columns)?|array|row|result)|get_(notify|pid|result)|meta_data|lo_(seek|close|create|tell|truncate|import|open|unlink|export|write|read(_all)?)|)\b/dgiv,
          name: "support.function.pgsql.php"
        },
        {
          match: /\b(virtual|getallheaders|apache_(([gs]et)env|note|child_terminate|lookup_uri|response_headers|reset_timeout|request_headers|get_(version|modules)))\b/dgiv,
          name: "support.function.php_apache.php"
        },
        {
          match: /\bdom_import_simplexml\b/dgiv,
          name: "support.function.php_dom.php"
        },
        {
          match: /\bftp_(ssl_connect|systype|site|size|set_option|nlist|nb_(continue|f?(put|get))|ch(dir|mod)|connect|cdup|close|delete|put|pwd|pasv|exec|quit|f(put|get)|login|alloc|rename|raw(list)?|rmdir|get(_option)?|mdtm|mkdir)\b/dgiv,
          name: "support.function.php_ftp.php"
        },
        {
          match: /\bimap_((create|delete|list|rename|scan)(mailbox)?|status|sort|subscribe|set_quota|set(flag_full|acl)|search|savebody|num_(recent|msg)|check|close|clearflag_full|thread|timeout|open|header(info)?|headers|append|alerts|reopen|8bit|unsubscribe|undelete|utf7_((?:de|en)code)|utf8|uid|ping|errors|expunge|qprint|gc|fetch(structure|header|text|mime|body)|fetch_overview|lsub|list(s(?:can|ubscribed))|last_error|rfc822_(parse_(headers|adrlist)|write_address)|get(subscribed|acl|mailboxes)|get_quota(root)?|msgno|mime_header_decode|mail_(copy|compose|move)|mail|mailboxmsginfo|binary|body(struct)?|base64)\b/dgiv,
          name: "support.function.php_imap.php"
        },
        {
          match: /\bmssql_(select_db|num_(fields|rows)|next_result|connect|close|init|data_seek|pconnect|execute|query|field_(seek|name|type|length)|fetch_(object|field|assoc|array|row|batch)|free_(statement|result)|rows_affected|result|guid_string|get_last_message|min_(error|message)_severity|bind)\b/dgiv,
          name: "support.function.php_mssql.php"
        },
        {
          match: /\bodbc_(statistics|specialcolumns|setoption|num_(fields|rows)|next_result|connect|columns|columnprivileges|commit|cursor|close(_all)?|tables|tableprivileges|do|data_source|pconnect|primarykeys|procedures|procedurecolumns|prepare|error(msg)?|exec(ute)?|field_(scale|num|name|type|precision|len)|foreignkeys|free_result|fetch_(into|object|array|row)|longreadlen|autocommit|rollback|result(_all)?|gettypeinfo|binmode)\b/dgiv,
          name: "support.function.php_odbc.php"
        },
        {
          match: /\bpreg_(split|quote|filter|last_error|replace(_callback)?|grep|match(_all)?)\b/dgiv,
          name: "support.function.php_pcre.php"
        },
        {
          match: /\b(spl_(classes|object_hash|autoload(_(call|unregister|extensions|functions|register))?)|class_(implements|uses|parents)|iterator_(count|to_array|apply))\b/dgiv,
          name: "support.function.php_spl.php"
        },
        {
          match: /\bzip_(close|open|entry_(name|compressionmethod|compressedsize|close|open|filesize|read)|read)\b/dgiv,
          name: "support.function.php_zip.php"
        },
        {
          match: /\bposix_(strerror|set(s|e?u|[ep]?g)id|ctermid|ttyname|times|isatty|initgroups|uname|errno|kill|access|get(sid|cwd|uid|pid|ppid|pwnam|pwuid|pgid|pgrp|euid|egid|login|rlimit|gid|grnam|groups|grgid)|get_last_error|mknod|mkfifo)\b/dgiv,
          name: "support.function.posix.php"
        },
        {
          match: /\bset(thread|proc)title\b/dgiv,
          name: "support.function.proctitle.php"
        },
        {
          match: /\bpspell_(store_replacement|suggest|save_wordlist|new(_(config|personal))?|check|clear_session|config_(save_repl|create|ignore|(d(?:ata|ict))_dir|personal|runtogether|repl|mode)|add_to_(session|personal))\b/dgiv,
          name: "support.function.pspell.php"
        },
        {
          match: /\breadline(_(completion_function|clear_history|callback_(handler_(install|remove)|read_char)|info|on_new_line|write_history|list_history|add_history|redisplay|read_history))?\b/dgiv,
          name: "support.function.readline.php"
        },
        {
          match: /\brecode(_(string|file))?\b/dgiv,
          name: "support.function.recode.php"
        },
        {
          match: /\brrd(c_disconnect|_(create|tune|info|update|error|version|first|fetch|last(update)?|restore|graph|xport))\b/dgiv,
          name: "support.function.rrd.php"
        },
        {
          match: /\b(shm_((get|has|remove|put)_var|detach|attach|remove)|sem_(acquire|release|remove|get)|ftok|msg_((get|remove|set|stat)_queue|send|queue_exists|receive))\b/dgiv,
          name: "support.function.sem.php"
        },
        {
          match: /\bsession_(status|start|set_(save_handler|cookie_params)|save_path|name|commit|cache_(expire|limiter)|is_registered|id|destroy|decode|unset|unregister|encode|write_close|abort|reset|register(_shutdown)?|regenerate_id|get_cookie_params|module_name)\b/dgiv,
          name: "support.function.session.php"
        },
        {
          match: /\bshmop_(size|close|open|delete|write|read)\b/dgiv,
          name: "support.function.shmop.php"
        },
        {
          match: /\bsimplexml_(import_dom|load_(string|file))\b/dgiv,
          name: "support.function.simplexml.php"
        },
        {
          match: /\b(snmp(?:(walk(oid)?|realwalk|get(next)?|set)|_(set_(valueretrieval|quick_print|enum_print|oid_(numeric_print|output_format))|read_mib|get_(valueretrieval|quick_print))|[23]_(set|walk|real_walk|get(next)?)))\b/dgiv,
          name: "support.function.snmp.php"
        },
        {
          match: /\b(is_soap_fault|use_soap_error_handler)\b/dgiv,
          name: "support.function.soap.php"
        },
        {
          match: /\bsocket_(shutdown|strerror|send(to|msg)?|set_((non)?block|option)|select|connect|close|clear_error|bind|create(_(pair|listen))?|cmsg_space|import_stream|write|listen|last_error|accept|recv(from|msg)?|read|get(peer|sock)name|get_option)\b/dgiv,
          name: "support.function.sockets.php"
        },
        {
          match: /\bsqlite_(single_query|seek|has_(more|prev)|num_(fields|rows)|next|changes|column|current|close|create_(aggregate|function)|open|unbuffered_query|udf_((?:de|en)code)_binary|popen|prev|escape_string|error_string|exec|valid|key|query|field_name|factory|fetch_(string|single|column_types|object|all|array)|lib(encoding|version)|last_(insert_rowid|error)|array_query|rewind|busy_timeout)\b/dgiv,
          name: "support.function.sqlite.php"
        },
        {
          match: /\bsqlsrv_(send_stream_data|server_info|has_rows|num_(fields|rows)|next_result|connect|configure|commit|client_info|close|cancel|prepare|errors|execute|query|field_metadata|fetch(_(array|object))?|free_stmt|rows_affected|rollback|get_(config|field)|begin_transaction)\b/dgiv,
          name: "support.function.sqlsrv.php"
        },
        {
          match: /\bstats_(harmonic_mean|covariance|standard_deviation|skew|cdf_(noncentral_(chisquare|f)|negative_binomial|chisquare|cauchy|t|uniform|poisson|exponential|f|weibull|logistic|laplace|gamma|binomial|beta)|stat_(noncentral_t|correlation|innerproduct|independent_t|powersum|percentile|paired_t|gennch|binomial_coef)|dens_(normal|negative_binomial|chisquare|cauchy|t|pmf_(hypergeometric|poisson|binomial)|exponential|f|weibull|logistic|laplace|gamma|beta)|den_uniform|variance|kurtosis|absolute_deviation|rand_(setall|phrase_to_seeds|ranf|get_seeds|gen_(noncentral_[ft]|noncenral_chisquare|normal|chisquare|t|int|i(uniform|poisson|binomial(_negative)?)|exponential|f(uniform)?|gamma|beta)))\b/dgiv,
          name: "support.function.stats.php"
        },
        {
          match: /\b(s(?:et_socket_blocking|tream_(socket_(shutdown|sendto|server|client|pair|enable_crypto|accept|recvfrom|get_name)|set_(chunk_size|timeout|(read|write)_buffer|blocking)|select|notification_callback|supports_lock|context_(set_(option|default|params)|create|get_(options|default|params))|copy_to_stream|is_local|encoding|filter_(append|prepend|register|remove)|wrapper_((un)?register|restore)|resolve_include_path|register_wrapper|get_(contents|transports|filters|wrappers|line|meta_data)|bucket_(new|prepend|append|make_writeable))))\b/dgiv,
          name: "support.function.streamsfuncs.php"
        },
        {
          match: /\b(money_format|md5(_file)?|metaphone|bin2hex|sscanf|sha1(_file)?|str(str|c?spn|n(at)?(case)?cmp|chr|coll|(case)?cmp|to(upper|lower)|tok|tr|istr|pos|pbrk|len|rchr|ri?pos|rev)|str_(getcsv|ireplace|pad|repeat|replace|rot13|shuffle|split|word_count)|strip(c?slashes|os)|strip_tags|similar_text|soundex|substr(_(count|compare|replace))?|setlocale|html(specialchars(_decode)?|entities)|html_entity_decode|hex2bin|hebrev(c)?|number_format|nl2br|nl_langinfo|chop|chunk_split|chr|convert_(cyr_string|uu((?:de|en)code))|count_chars|crypt|crc32|trim|implode|ord|uc(first|words)|join|parse_str|print(f)?|echo|explode|v?[fs]?printf|quoted_printable_((?:de|en)code)|quotemeta|wordwrap|lcfirst|[lr]trim|localeconv|levenshtein|addc?slashes|get_html_translation_table)\b/dgiv,
          name: "support.function.string.php"
        },
        {
          match: /\bsybase_(set_message_handler|select_db|num_(fields|rows)|connect|close|deadlock_retry_count|data_seek|unbuffered_query|pconnect|query|field_seek|fetch_(object|field|assoc|array|row)|free_result|affected_rows|result|get_last_message|min_(client|error|message|server)_severity)\b/dgiv,
          name: "support.function.sybase.php"
        },
        {
          match: /\b(taint|is_tainted|untaint)\b/dgiv,
          name: "support.function.taint.php"
        },
        {
          match: /\b(tidy_(([gs]et)opt|set_encoding|save_config|config_count|clean_repair|is_(x(?:html|ml))|diagnose|(access|error|warning)_count|load_config|reset_config|(parse|repair)_(string|file)|get_(status|html(_ver)?|head|config|output|opt_doc|root|release|body))|ob_tidyhandler)\b/dgiv,
          name: "support.function.tidy.php"
        },
        {
          match: /\btoken_(name|get_all)\b/dgiv,
          name: "support.function.tokenizer.php"
        },
        {
          match: /\btrader_(stoch([fr]|rsi)?|stddev|sin(h)?|sum|sub|set_(compat|unstable_period)|sqrt|sar(ext)?|sma|ht_(sine|trend(line|mode)|dc(p(?:eriod|hase))|phasor)|natr|cci|cos(h)?|correl|cdl(shootingstar|shortline|sticksandwich|stalledpattern|spinningtop|separatinglines|hikkake(mod)?|highwave|homingpigeon|hangingman|harami(cross)?|hammer|concealbabyswall|counterattack|closingmarubozu|thrusting|tasukigap|takuri|tristar|inneck|invertedhammer|identical3crows|2crows|onneck|doji(star)?|darkcloudcover|dragonflydoji|unique3river|upsidegap2crows|3(starsinsouth|inside|outside|whitesoldiers|linestrike|blackcrows)|piercing|engulfing|evening(doji)?star|kicking(bylength)?|longline|longleggeddoji|ladderbottom|advanceblock|abandonedbaby|risefall3methods|rickshawman|gapsidesidewhite|gravestonedoji|xsidegap3methods|morning(doji)?star|mathold|matchinglow|marubozu|belthold|breakaway)|ceil|cmo|tsf|typprice|t3|tema|tan(h)?|trix|trima|trange|obv|div|dema|dx|ultosc|ppo|plus_d[im]|errno|exp|ema|var|kama|floor|wclprice|willr|wma|ln|log10|bop|beta|bbands|linearreg(_(slope|intercept|angle))?|asin|acos|atan|atr|adosc|add??|adx(r)?|apo|avgprice|aroon(osc)?|rsi|rocp??|rocr(100)?|get_(compat|unstable_period)|min(index)?|minus_d[im]|minmax(index)?|mid(p(?:oint|rice))|mom|mult|medprice|mfi|macd(ext|fix)?|mavp|max(index)?|ma(ma)?)\b/dgiv,
          name: "support.function.trader.php"
        },
        {
          match: /\buopz_(copy|compose|implement|overload|delete|undefine|extend|function|flags|restore|rename|redefine|backup)\b/dgiv,
          name: "support.function.uopz.php"
        },
        {
          match: /\b(http_build_query|(raw)?url((?:de|en)code)|parse_url|get_(headers|meta_tags)|base64_((?:de|en)code))\b/dgiv,
          name: "support.function.url.php"
        },
        {
          match: /\b(strval|settype|serialize|(bool|double|float)val|debug_zval_dump|intval|import_request_variables|isset|is_(scalar|string|null|numeric|callable|int(eger)?|object|double|float|long|array|resource|real|bool)|unset|unserialize|print_r|empty|var_(dump|export)|gettype|get_(defined_vars|resource_type))\b/dgiv,
          name: "support.function.var.php"
        },
        {
          match: /\bwddx_(serialize_(va(?:lue|rs))|deserialize|packet_(start|end)|add_vars)\b/dgiv,
          name: "support.function.wddx.php"
        },
        {
          match: /\bxhprof_(sample_)?((?:dis|en)able)\b/dgiv,
          name: "support.function.xhprof.php"
        },
        {
          match: /\b(utf8_((?:de|en)code)|xml_(set_((notation|(end|start)_namespace|unparsed_entity)_decl_handler|(character_data|default|element|external_entity_ref|processing_instruction)_handler|object)|parse(_into_struct)?|parser_(([gs]et)_option|create(_ns)?|free)|error_string|get_(current_((column|line)_number|byte_index)|error_code)))\b/dgiv,
          name: "support.function.xml.php"
        },
        {
          match: /\bxmlrpc_(server_(call_method|create|destroy|add_introspection_data|register_(introspection_callback|method))|is_fault|decode(_request)?|parse_method_descriptions|encode(_request)?|([gs]et)_type)\b/dgiv,
          name: "support.function.xmlrpc.php"
        },
        {
          match: /\bxmlwriter_((end|start|write)_(comment|cdata|dtd(_(attlist|entity|element))?|document|pi|attribute|element)|(start|write)_(attribute|element)_ns|write_raw|set_indent(_string)?|text|output_memory|open_(memory|uri)|full_end_element|flush|)\b/dgiv,
          name: "support.function.xmlwriter.php"
        },
        {
          match: /\b(zlib_(decode|encode|get_coding_type)|readgzfile|gz(seek|compress|close|tell|inflate|open|decode|deflate|uncompress|puts|passthru|encode|eof|file|write|rewind|read|getc|getss?))\b/dgiv,
          name: "support.function.zlib.php"
        },
        {
          match: /\bis_int(eger)?\b/dgiv,
          name: "support.function.alias.php"
        }
      ]
    },
    switch_statement: {
      patterns: [
        {
          match: /\p{space}+(?=switch\b)/dgv
        },
        {
          begin: /\bswitch\b(?!\p{space}*\([^\n]*\)\p{space}*:)/dgv,
          beginCaptures: {
            "0": { name: "keyword.control.switch.php" }
          },
          end: /\}|(?=\?>)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.section.switch-block.end.bracket.curly.php" }
          },
          name: "meta.switch-statement.php",
          patterns: [
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.switch-expression.begin.bracket.round.php" }
              },
              end: /\)|(?=\?>)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.switch-expression.end.bracket.round.php" }
              },
              patterns: [
                { include: "#language" }
              ]
            },
            {
              begin: /\{/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.section.switch-block.begin.bracket.curly.php" }
              },
              end: /(?=\}|\?>)/dgv,
              patterns: [
                { include: "#language" }
              ]
            }
          ]
        }
      ]
    },
    "use-inner": {
      patterns: [
        { include: "#comments" },
        {
          begin: /\b(as)\p{space}+/dgiv,
          beginCaptures: {
            "1": { name: "keyword.other.use-as.php" }
          },
          end: /[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*/dgiv,
          endCaptures: {
            "0": { name: "entity.other.alias.php" }
          }
        },
        { include: "#class-name" },
        {
          match: /,/dgv,
          name: "punctuation.separator.delimiter.php"
        }
      ]
    },
    var_basic: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.variable.php" }
          },
          match: /(\$+)[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*\b/dgiv,
          name: "variable.other.php"
        }
      ]
    },
    var_global: {
      captures: {
        "1": { name: "punctuation.definition.variable.php" }
      },
      match: /(\$)((_(COOKIE|FILES|GET|POST|REQUEST))|arg([cv]))\b/dgv,
      name: "variable.other.global.php"
    },
    var_global_safer: {
      captures: {
        "1": { name: "punctuation.definition.variable.php" }
      },
      match: /(\$)((GLOBALS|_(ENV|SERVER|SESSION)))/dgv,
      name: "variable.other.global.safer.php"
    },
    var_language: {
      captures: {
        "1": { name: "punctuation.definition.variable.php" }
      },
      match: /(\$)this\b/dgv,
      name: "variable.language.this.php"
    },
    "variable-name": {
      patterns: [
        { include: "#var_global" },
        { include: "#var_global_safer" },
        {
          captures: {
            "1": { name: "variable.other.php" },
            "2": { name: "punctuation.definition.variable.php" },
            "4": { name: "keyword.operator.class.php" },
            "5": { name: "variable.other.property.php" },
            "6": { name: "punctuation.section.array.begin.php" },
            "7": { name: "constant.numeric.index.php" },
            "8": { name: "variable.other.index.php" },
            "9": { name: "punctuation.definition.variable.php" },
            "10": { name: "string.unquoted.index.php" },
            "11": { name: "punctuation.section.array.end.php" }
          },
          match: new EmulatedRegExp("((\\$)(?<name>[_a-z\\x7F-ÿ][0-9_a-z\\x7F-ÿ]*))(?:(->)(([_a-z\\x7F-ÿ][0-9_a-z\\x7F-ÿ]*))|(\\[)(?:(\\p{Nd}+)|((\\$)([_a-z\\x7F-ÿ][0-9_a-z\\x7F-ÿ]*))|([_a-z\\x7F-ÿ][0-9_a-z\\x7F-ÿ]*))(\\]))?", "dgiv", { hiddenCaptures: [6, 11], transfers: [[3, [6, 11]]] })
        },
        {
          captures: {
            "1": { name: "variable.other.php" },
            "2": { name: "punctuation.definition.variable.php" },
            "4": { name: "punctuation.definition.variable.php" }
          },
          match: /((\$\{)(?<name>[_a-z\x7F-ÿ][0-9_a-z\x7F-ÿ]*)(\}))/dgiv
        }
      ]
    },
    variables: {
      patterns: [
        { include: "#var_language" },
        { include: "#var_global" },
        { include: "#var_global_safer" },
        { include: "#var_basic" },
        {
          begin: /\$\{(?=[^\n]*?\})/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.variable.php" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.variable.php" }
          },
          patterns: [
            { include: "#language" }
          ]
        }
      ]
    }
  },
  injections: {
    "text.html.php.blade - (meta.embedded | meta.tag | comment.block.blade), L:(text.html.php.blade meta.tag - (comment.block.blade | meta.embedded.block.blade)), L:(source.js.embedded.html - (comment.block.blade | meta.embedded.block.blade))": {
      patterns: [
        { include: "#blade" },
        {
          begin: /^(\p{space}*)(?=<\?(?![^\?]*\?>))/dgv,
          beginCaptures: {
            "0": { name: "punctuation.whitespace.embedded.leading.php" }
          },
          end: {
            G: [/(?!￿)(\p{space}*(?=\n?$)\n)?/dgv, new EmulatedRegExp("(?!^)(\\p{space}*(?=\\n?$)\\n)?", "dgv", { strategy: "clip_search" })]
          },
          endCaptures: {
            "0": { name: "punctuation.whitespace.embedded.trailing.php" }
          },
          patterns: [
            {
              begin: /<\?(?:php|=)?/dgiv,
              beginCaptures: {
                "0": { name: "punctuation.section.embedded.begin.php" }
              },
              contentName: "source.php",
              end: /(\?)>/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.embedded.end.php" },
                "1": { name: "source.php" }
              },
              name: "meta.embedded.block.php",
              patterns: [
                { include: "#language" }
              ]
            }
          ]
        },
        {
          begin: /<\?(?:php|=)?(?![^\?]*\?>)/dgiv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" }
          },
          contentName: "source.php",
          end: /(\?)>/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" },
            "1": { name: "source.php" }
          },
          name: "meta.embedded.block.php",
          patterns: [
            { include: "#language" }
          ]
        },
        {
          begin: /<\?(?:php|=)?/dgiv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.php" }
          },
          end: />/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.php" }
          },
          name: "meta.embedded.line.php",
          patterns: [
            {
              captures: {
                "1": { name: "source.php" },
                "2": { name: "punctuation.section.embedded.end.php" },
                "3": { name: "source.php" }
              },
              match: {
                G: [/￿(\p{space}*)((\?))(?=>)/dgv, /(\p{space}*)((\?))(?=>)/dgvy]
              },
              name: "meta.special.empty-tag.php"
            },
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              contentName: "source.php",
              end: /(\?)(?=>)/dgv,
              endCaptures: {
                "0": { name: "punctuation.section.embedded.end.php" },
                "1": { name: "source.php" }
              },
              patterns: [
                { include: "#language" }
              ]
            }
          ]
        }
      ]
    }
  },
  dependencies: [
    "html-derivative",
    "html",
    "xml",
    "sql",
    "javascript",
    "json",
    "css"
  ]
};
