import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "swift",
  displayName: "Swift",
  scopeName: "source.swift",
  patterns: [
    { include: "#root" }
  ],
  repository: {
    "async-throws": {
      captures: {
        "1": { name: "invalid.illegal.await-must-precede-throws.swift" },
        "2": { name: "storage.modifier.exception.swift" },
        "3": { name: "storage.modifier.async.swift" }
      },
      match: /\b(?:((?:throws\p{space}+|rethrows\p{space}+)async)|((?:|re)throws)|(async))\b/dgv
    },
    attributes: {
      patterns: [
        {
          begin: /((@)available)(\()/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.attribute.swift" },
            "2": { name: "punctuation.definition.attribute.swift" },
            "3": { name: "punctuation.definition.arguments.begin.swift" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.swift" }
          },
          name: "meta.attribute.available.swift",
          patterns: [
            {
              captures: {
                "1": { name: "keyword.other.platform.os.swift" },
                "2": { name: "constant.numeric.swift" }
              },
              match: /\b(swift|(?:iOS|macOS|OSX|watchOS|tvOS|visionOS|UIKitForMac)(?:ApplicationExtension)?)\b(?:\p{space}+([0-9]+(?:\.[0-9]+)*)\b)?/dgv
            },
            {
              begin: /\b((?:introduc|deprecat|obsolet)ed)\p{space}*(:)\p{space}*/dgv,
              beginCaptures: {
                "1": { name: "keyword.other.swift" },
                "2": { name: "punctuation.separator.key-value.swift" }
              },
              end: {
                G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                {
                  match: /\b[0-9]+(?:\.[0-9]+)*\b/dgv,
                  name: "constant.numeric.swift"
                }
              ]
            },
            {
              begin: /\b(message|renamed)\p{space}*(:)\p{space}*(?=")/dgv,
              beginCaptures: {
                "1": { name: "keyword.other.swift" },
                "2": { name: "punctuation.separator.key-value.swift" }
              },
              end: {
                G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
              },
              patterns: [
                { include: "#literals" }
              ]
            },
            {
              captures: {
                "1": { name: "keyword.other.platform.all.swift" },
                "2": { name: "keyword.other.swift" },
                "3": { name: "invalid.illegal.character-not-allowed-here.swift" }
              },
              match: /(?:(\*)|\b(deprecated|unavailable|noasync)\b)\p{space}*([^\n]*?)(?=[\)\,])/dgv
            }
          ]
        },
        {
          begin: /((@)objc)(\()/dgv,
          beginCaptures: {
            "1": { name: "storage.modifier.attribute.swift" },
            "2": { name: "punctuation.definition.attribute.swift" },
            "3": { name: "punctuation.definition.arguments.begin.swift" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.swift" }
          },
          name: "meta.attribute.objc.swift",
          patterns: [
            {
              captures: {
                "1": { name: "invalid.illegal.missing-colon-after-selector-piece.swift" }
              },
              match: /[\p{L}\p{M}\p{N}\p{Pc}]*(?::(?:[\p{L}\p{M}\p{N}\p{Pc}]*:)*([\p{L}\p{M}\p{N}\p{Pc}]*))?/dgv,
              name: "entity.name.function.swift"
            }
          ]
        },
        {
          begin: /(@)(?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2)/dgv,
          beginCaptures: {
            "0": { name: "storage.modifier.attribute.swift" },
            "1": { name: "punctuation.definition.attribute.swift" },
            "2": { name: "punctuation.definition.identifier.swift" },
            "3": { name: "punctuation.definition.identifier.swift" }
          },
          end: {
            G: [/(?!￿\()/dgv, new EmulatedRegExp("(?!^\\()", "dgv", { strategy: "clip_search" })]
          },
          name: "meta.attribute.swift",
          patterns: [
            {
              begin: /\(/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.arguments.begin.swift" }
              },
              end: /\)/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.arguments.end.swift" }
              },
              name: "meta.arguments.attribute.swift",
              patterns: [
                { include: "#expressions" }
              ]
            }
          ]
        }
      ]
    },
    "builtin-functions": {
      patterns: [
        {
          match: /(?<=\.)(?:s(?:ort(?:ed)?|plit)|contains|index|partition|f(?:i(?:lter|rst)|orEach|latMap)|with(?:MutableCharacters|CString|U(?:nsafe(?:Mutable(?:BufferPointer|Pointer(?:s|To(?:Header|Elements)))|BufferPointer)|TF8Buffer))|m(?:in|a[px]))(?=\p{space}*[\(\{])\b/dgv,
          name: "support.function.swift"
        },
        {
          match: /(?<=\.)(?:s(?:ymmetricDifference|t(?:oreBytes|arts|ride)|ortInPlace|u(?:ccessor|ffix|btract(?:ing|InPlace|WithOverflow)?)|quareRoot|amePosition)|h(?:oldsUnique(?:|OrPinned)Reference|as(?:Suf|Pre)fix)|ne(?:gated?|xt)|c(?:o(?:untByEnumerating|py(?:Bytes)?)|lamp(?:ed)?|reate)|t(?:o(?:IntMax|Opaque|UIntMax)|ake(?:R|Unr)etainedValue|r(?:uncatingRemainder|a(?:nscodedLength|ilSurrogate)))|i(?:s(?:MutableAndUniquelyReferenced(?:OrPinned)?|S(?:trictSu(?:perset(?:Of)?|bset(?:Of)?)|u(?:perset(?:Of)?|bset(?:Of)?))|Continuation|T(?:otallyOrdered|railSurrogate)|Disjoint(?:With)?|Unique(?:Reference|lyReferenced(?:OrPinned)?)|Equal|Le(?:ss(?:ThanOrEqualTo)?|adSurrogate))|n(?:sert(?:ContentsOf)?|tersect(?:ion|InPlace)?|itialize(?:Memory|From)?|dex(?:Of|ForKey)))|o(?:verlaps|bjectAt)|d(?:i(?:stance(?:To)?|vide(?:d|WithOverflow)?)|e(?:s(?:cendant|troy)|code(?:CString)?|initialize|alloc(?:ate(?:Capacity)?)?)|rop(?:First|Last))|u(?:n(?:ion(?:InPlace)?|derestimateCount|wrappedOrError)|p(?:date(?:Value)?|percased))|join(?:ed|WithSeparator)|p(?:op(?:First|Last)|ass(?:R|Unr)etained|re(?:decessor|fix))|e(?:scaped?|n(?:code|umerated?)|lementsEqual|xclusiveOr(?:InPlace)?)|f(?:orm(?:Remainder|S(?:ymmetricDifference|quareRoot)|TruncatingRemainder|In(?:tersection|dex)|Union)|latten|rom(?:CString(?:RepairingIllFormedUTF8)?|Opaque))|w(?:i(?:thMemoryRebound|dth)|rite(?:To)?)|l(?:o(?:wercased|ad)|e(?:adSurrogate|xicographical(?:Compare|lyPrecedes)))|a(?:ss(?:ign(?:(?:Backward|)From)?|umingMemoryBound)|d(?:d(?:ing(?:Product)?|Product|WithOverflow)?|vanced(?:By)?)|utorelease|ppend(?:ContentsOf)?|lloc(?:ate)?|bs)|r(?:ound(?:ed)?|e(?:serveCapacity|tain|duce|place(?:(?:R|Subr)ange)?|versed?|quest(?:Native|UniqueMutableBacking)Buffer|lease|m(?:ove(?:Range|Subrange|Value(?:ForKey)?|First|Last|A(?:tIndex|ll))?|ainder(?:WithOverflow)?)))|ge(?:nerate|t(?:Objects|Element))|m(?:in(?:imum(?:Magnitude)?|Element)|ove(?:Initialize(?:Memory|BackwardFrom|From)?|Assign(?:From)?)?|ultipl(?:y(?:WithOverflow)?|ied)|easure|a(?:ke(?:Iterator|Description)|x(?:imum(?:Magnitude)?|Element)))|bindMemory)(?=\p{space}*\()/dgv,
          name: "support.function.swift"
        },
        {
          match: /(?<=\.)(?:s(?:uperclassMirror|amePositionIn|tartsWith)|nextObject|c(?:haracterAtIndex|o(?:untByEnumeratingWithState|pyWithZone)|ustom(?:Mirror|PlaygroundQuickLook))|is(?:EmptyInput|ASCII)|object(?:Enumerator|ForKey|AtIndex)|join|put|keyEnumerator|withUnsafeMutablePointerToValue|length|getMirror|m(?:oveInitializeAssignFrom|ember))(?=\p{space}*\()/dgv,
          name: "support.function.swift"
        }
      ]
    },
    "builtin-global-functions": {
      patterns: [
        {
          begin: /\b(type)(\()\p{space}*(of)(:)/dgv,
          beginCaptures: {
            "1": { name: "support.function.dynamic-type.swift" },
            "2": { name: "punctuation.definition.arguments.begin.swift" },
            "3": { name: "support.variable.parameter.swift" },
            "4": { name: "punctuation.separator.argument-label.begin.swift" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.swift" }
          },
          patterns: [
            { include: "#expressions" }
          ]
        },
        {
          match: /\ba(?:nyGenerator|utoreleasepool)(?=\p{space}*[\(\{])\b/dgv,
          name: "support.function.swift"
        },
        {
          match: /\b(?:s(?:tride(?:of(?:Value)?)?|izeof(?:Value)?|equence|wap)|numericCast|transcode|is(?:UniquelyReferenced(?:NonObjC)?|KnownUniquelyReferenced)|zip|d(?:ump|ebugPrint)|unsafe(?:BitCast|Downcast|Unwrap|Address(?:Of)?)|pr(?:int|econdition(?:Failure)?)|fatalError|with(?:Unsafe(?:Mutable|)Pointer|ExtendedLifetime|VaList)|a(?:ssert(?:ionFailure)?|lignof(?:Value)?|bs)|re(?:peatElement|adLine)|getVaList|m(?:in|ax))(?=\p{space}*\()/dgv,
          name: "support.function.swift"
        },
        {
          match: /\b(?:s(?:ort|uffix|pli(?:ce|t))|insert|overlaps|d(?:istance|rop(?:First|Last))|join|prefix|extend|withUnsafe(?:Mutable|)Pointers|lazy|advance|re(?:flect|move(?:Range|Last|A(?:tIndex|ll))))(?=\p{space}*\()/dgv,
          name: "support.function.swift"
        }
      ]
    },
    "builtin-properties": {
      patterns: [
        {
          match: /(?<=(?:^|[^\p{L}\p{M}\p{N}\p{Pc}])(?:Process\.|CommandLine\.))(arguments|argc|unsafeArgv)/dgv,
          name: "support.variable.swift"
        },
        {
          match: /(?<=\.)(?:s(?:t(?:artIndex|ri(?:ngValue|de))|i(?:ze|gn(?:BitIndex|ificand(?:Bit(?:Count|Pattern)|Width)?|alingNaN)?)|u(?:perclassMirror|mmary|bscriptBaseAddress))|h(?:eader|as(?:hValue|PointerRepresentation))|n(?:ulTerminatedUTF8|ext(?:Down|Up)|a(?:n|tiveOwner))|c(?:haracters|ount(?:TrailingZeros)?|ustom(?:Mirror|PlaygroundQuickLook)|apacity)|i(?:s(?:S(?:ign(?:Minus|aling(?:NaN)?)|ubnormal)|N(?:ormal|aN)|Canonical|Infinite|Zero|Empty|Finite|ASCII)|n(?:dices|finity)|dentity)|owner|de(?:|bugDe)scription|u(?:n(?:safelyUnwrapped|icodeScalars?|derestimatedCount)|tf(?:16|8(?:Start|C(?:String|odeUnitCount))?)|intValue|ppercaseString|lp(?:OfOne)?)|p(?:i|ointee)|e(?:ndIndex|lements|xponent(?:Bit(?:Count|Pattern))?)|values?|keys|quietNaN|f(?:irst(?:ElementAddress(?:IfContiguous)?)?|loatingPointClass)|l(?:ittleEndian|owercaseString|eastNo(?:nzero|rmal)Magnitude|a(?:st|zy))|a(?:l(?:ignment|l(?:ocatedElementCount|Zeros))|rray(?:PropertyIsNativeTypeChecked)?)|ra(?:dix|wValue)|greatestFiniteMagnitude|m(?:in|emory|ax)|b(?:yteS(?:ize|wapped)|i(?:nade|tPattern|gEndian)|uffer|ase(?:Address)?))\b/dgv,
          name: "support.variable.swift"
        },
        {
          match: /(?<=\.)(?:boolValue|disposition|end|objectIdentifier|quickLookObject|start|valueType)\b/dgv,
          name: "support.variable.swift"
        },
        {
          match: /(?<=\.)(?:s(?:calarValue|i(?:ze|gnalingNaN)|o(?:und|me)|uppressed|prite|et)|n(?:one|egative(?:Subnormal|Normal|Infinity|Zero))|c(?:ol(?:or|lection)|ustomized)|t(?:o(?:NearestOr(?:Even|AwayFromZero)|wardZero)|uple|ext)|i(?:nt|mage)|optional|d(?:ictionary|o(?:uble|wn))|u(?:Int|p|rl)|p(?:o(?:sitive(?:Subnormal|Normal|Infinity|Zero)|int)|lus)|e(?:rror|mptyInput)|view|quietNaN|float|a(?:ttributedString|wayFromZero)|r(?:ectangle|ange)|generated|minus|b(?:ool|ezierPath))\b/dgv,
          name: "support.variable.swift"
        }
      ]
    },
    "builtin-types": {
      patterns: [
        { include: "#builtin-types-builtin-class-type" },
        { include: "#builtin-types-builtin-enum-type" },
        { include: "#builtin-types-builtin-protocol-type" },
        { include: "#builtin-types-builtin-struct-type" },
        { include: "#builtin-types-builtin-typealias" },
        {
          match: /\bAny\b/dgv,
          name: "support.type.any.swift"
        }
      ]
    },
    "builtin-types-builtin-class-type": {
      match: /\b(Managed((?:|Proto)Buffer)|NonObjectiveCBase|AnyGenerator)\b/dgv,
      name: "support.class.swift"
    },
    "builtin-types-builtin-enum-type": {
      patterns: [
        {
          match: /\b(?:CommandLine|Process(?=\.))\b/dgv,
          name: "support.constant.swift"
        },
        {
          match: /\bNever\b/dgv,
          name: "support.constant.never.swift"
        },
        {
          match: /\b(?:ImplicitlyUnwrappedOptional|Representation|MemoryLayout|FloatingPointClassification|SetIndexRepresentation|SetIteratorRepresentation|FloatingPointRoundingRule|UnicodeDecodingResult|Optional|DictionaryIndexRepresentation|AncestorRepresentation|DisplayStyle|PlaygroundQuickLook|Never|FloatingPointSign|Bit|DictionaryIteratorRepresentation)\b/dgv,
          name: "support.type.swift"
        },
        {
          match: /\b(?:MirrorDisposition|QuickLookObject)\b/dgv,
          name: "support.type.swift"
        }
      ]
    },
    "builtin-types-builtin-protocol-type": {
      patterns: [
        {
          match: /\bActor\b/dgv,
          name: "support.type.swift"
        },
        {
          match: /\b(?:Ra(?:n(?:domAccess(?:Collection|Indexable)|geReplaceable(?:Collection|Indexable))|wRepresentable)|M(?:irrorPath|utable(?:Collection|Indexable))|Bi(?:naryFloatingPoint|twiseOperations|directional(?:Collection|Indexable))|S(?:tr(?:ide|eam)able|igned(?:Number|Integer)|e(?:tAlgebra|quence))|Hashable|C(?:o(?:llection|mparable)|ustom(?:Reflecta|StringConverti|DebugStringConverti|PlaygroundQuickLooka|LeafReflecta)ble|VarArg)|TextOutputStream|I(?:n(?:teger(?:Arithmetic)?|dexable(?:Base)?)|teratorProtocol)|OptionSet|Un(?:signedInteger|icodeCodec)|E(?:quatable|rror|xpressibleBy(?:BooleanLiteral|String(?:Interpolation|Literal)|NilLiteral|IntegerLiteral|DictionaryLiteral|UnicodeScalarLiteral|ExtendedGraphemeClusterLiteral|FloatLiteral|ArrayLiteral))|FloatingPoint|L(?:osslessStringConvertible|azy(?:Sequence|Collection)Protocol)|A(?:nyObject|bsoluteValuable))\b/dgv,
          name: "support.type.swift"
        },
        {
          match: /\b(?:Ran(?:domAccessIndex|geReplaceableCollection)Type|GeneratorType|M(?:irror(?:|Path)Type|utable(?:Sliceable|CollectionType))|B(?:i(?:twiseOperations|directionalIndex)Type|oolean(?:Type|LiteralConvertible))|S(?:tring(?:Interpolation|Literal)Convertible|i(?:nk|gned(?:Numb|Integ)er)Type|e(?:tAlgebra|quence)Type|liceable)|NilLiteralConvertible|C(?:ollection|VarArg)Type|Inte(?:rvalType|ger(?:Type|LiteralConvertible|ArithmeticType))|O(?:utputStream|ptionSet)Type|DictionaryLiteralConvertible|Un(?:signedIntegerType|icode(?:ScalarLiteralConvertible|CodecType))|E(?:rrorType|xten(?:sibleCollectionType|dedGraphemeClusterLiteralConvertible))|F(?:orwardIndexType|loat(?:ingPointType|LiteralConvertible))|A(?:nyCollectionType|rrayLiteralConvertible))\b/dgv,
          name: "support.type.swift"
        }
      ]
    },
    "builtin-types-builtin-struct-type": {
      patterns: [
        {
          match: /\b(?:R(?:e(?:peat(?:ed)?|versed(?:RandomAccess(?:Collection|Index)|Collection|Index))|an(?:domAccessSlice|ge(?:Replaceable(?:RandomAccess|Bidirectional|)Slice|Generator)?))|Generator(?:Sequence|OfOne)|M(?:irror|utable(?:Ran(?:domAccess|geReplaceable(?:RandomAccess|Bidirectional|))|Bidirectional|)Slice|anagedBufferPointer)|B(?:idirectionalSlice|ool)|S(?:t(?:aticString|ri(?:ng|deT(?:hrough(?:(?:Gen|It)erator)?|o(?:(?:Gen|It)erator)?)))|et(?:I(?:ndex|terator))?|lice)|HalfOpenInterval|C(?:haracter(?:View)?|o(?:ntiguousArray|untable(?:|Closed)Range|llectionOfOne)|OpaquePointer|losed(?:Range(?:I(?:ndex|terator))?|Interval)|VaListPointer)|I(?:n(?:t(?:16|8|32|64)?|d(?:ices|ex(?:ing(?:Gen|It)erator)?))|terator(?:Sequence|OverOne)?)|Zip2(?:Sequence|Iterator)|O(?:paquePointer|bjectIdentifier)|D(?:ictionary(?:I(?:ndex|terator)|Literal)?|ouble|efault(?:RandomAccess|Bidirectional|)Indices)|U(?:n(?:safe(?:RawPointer|Mutable(?:Raw|Buffer|)Pointer|BufferPointer(?:(?:Gen|It)erator)?|Pointer)|icodeScalar(?:View)?|foldSequence|managed)|TF(?:16(?:View)?|8(?:View)?|32)|Int(?:16|8|32|64)?)|Join(?:Generator|ed(?:Sequence|Iterator))|PermutationGenerator|E(?:numerate(?:Generator|Sequence|d(?:Sequence|Iterator))|mpty(?:Generator|Collection|Iterator))|Fl(?:oat(?:80)?|atten(?:Generator|BidirectionalCollection(?:Index)?|Sequence|Collection(?:Index)?|Iterator))|L(?:egacyChildren|azy(?:RandomAccessCollection|Map(?:RandomAccessCollection|Generator|BidirectionalCollection|Sequence|Collection|Iterator)|BidirectionalCollection|Sequence|Collection|Filter(?:Generator|BidirectionalCollection|Sequence|Collection|I(?:ndex|terator))))|A(?:ny(?:RandomAccessCollection|Generator|BidirectionalCollection|Sequence|Hashable|Collection|I(?:ndex|terator))|utoreleasingUnsafeMutablePointer|rray(?:Slice)?))\b/dgv,
          name: "support.type.swift"
        },
        {
          match: /\b(?:R(?:everse(?:RandomAccess(?:Collection|Index)|Collection|Index)|awByte)|Map(?:Generator|Sequence|Collection)|S(?:inkOf|etGenerator)|Zip2Generator|DictionaryGenerator|Filter(?:Generator|Sequence|Collection(?:Index)?)|LazyForwardCollection|Any(?:RandomAccessIndex|BidirectionalIndex|Forward(?:Collection|Index)))\b/dgv,
          name: "support.type.swift"
        }
      ]
    },
    "builtin-types-builtin-typealias": {
      patterns: [
        {
          match: /\b(?:Raw(?:Significand|Exponent|Value)|B(?:ooleanLiteralType|uffer|ase)|S(?:t(?:orage|r(?:i(?:ngLiteralType|de)|eam[12]))|ubSequence)|NativeBuffer|C(?:hild(?:ren)?|Bool|S(?:hort|ignedChar)|odeUnit|Char(?:16|32)?|Int|Double|Unsigned(?:Short|Char|Int|Long(?:Long)?)|Float|WideChar|Long(?:Long)?)|I(?:n(?:t(?:Max|egerLiteralType)|d(?:ices|ex(?:Distance)?))|terator)|Distance|U(?:n(?:icodeScalar(?:Type|Index|View|LiteralType)|foldFirstSequence)|TF(?:16(?:Index|View)|8Index)|IntMax)|E(?:lements?|x(?:tendedGraphemeCluster(?:|Literal)Type|ponent))|V(?:oid|alue)|Key|Float(?:32|LiteralType|64)|AnyClass)\b/dgv,
          name: "support.type.swift"
        },
        {
          match: /\b(?:Generator|PlaygroundQuickLook|UWord|Word)\b/dgv,
          name: "support.type.swift"
        }
      ]
    },
    "code-block": {
      begin: /\{/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.scope.begin.swift" }
      },
      end: /\}/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.scope.end.swift" }
      },
      patterns: [
        { include: "$self" }
      ]
    },
    comments: {
      patterns: [
        {
          captures: {
            "1": { name: "punctuation.definition.comment.swift" }
          },
          match: {
            A: [/￿^(#!)[^\n]*(?=\n?$)\n?/dgv, /^^(#!)[^\n]*(?=\n?$)\n?/dgv]
          },
          name: "comment.line.number-sign.swift"
        },
        {
          begin: /\/\*\*(?!\/)/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.swift" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.swift" }
          },
          name: "comment.block.documentation.swift",
          patterns: [
            { include: "#comments-nested" }
          ]
        },
        {
          begin: /\/\*:/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.swift" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.swift" }
          },
          name: "comment.block.documentation.playground.swift",
          patterns: [
            { include: "#comments-nested" }
          ]
        },
        {
          begin: /\/\*/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.swift" }
          },
          end: /\*\//dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.swift" }
          },
          name: "comment.block.swift",
          patterns: [
            { include: "#comments-nested" }
          ]
        },
        {
          match: /\*\//dgv,
          name: "invalid.illegal.unexpected-end-of-block-comment.swift"
        },
        {
          begin: /(^[\t ]+)?(?=\/\/)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.swift" }
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              begin: /\/\/\//dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.swift" }
              },
              end: /(?=\n?$)/dgv,
              name: "comment.line.triple-slash.documentation.swift"
            },
            {
              begin: /\/\/:/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.swift" }
              },
              end: /(?=\n?$)/dgv,
              name: "comment.line.double-slash.documentation.swift"
            },
            {
              begin: /\/\//dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.comment.swift" }
              },
              end: /(?=\n?$)/dgv,
              name: "comment.line.double-slash.swift"
            }
          ]
        }
      ]
    },
    "comments-nested": {
      begin: /\/\*/dgv,
      end: /\*\//dgv,
      patterns: [
        { include: "#comments-nested" }
      ]
    },
    "compiler-control": {
      patterns: [
        {
          begin: /^\p{space}*(#)(if|elseif)\p{space}+(false)\b[^\n]*?(?=(?=\n?$)|\/\/|\/\*)/dgv,
          beginCaptures: {
            "0": { name: "meta.preprocessor.conditional.swift" },
            "1": { name: "punctuation.definition.preprocessor.swift" },
            "2": { name: "keyword.control.import.preprocessor.conditional.swift" },
            "3": { name: "constant.language.boolean.swift" }
          },
          contentName: "comment.block.preprocessor.swift",
          end: /(?=^\p{space}*(#(e(?:lseif|lse|ndif)))\b)/dgv
        },
        {
          begin: /^\p{space}*(#)(if|elseif)\p{space}+/dgv,
          captures: {
            "1": { name: "punctuation.definition.preprocessor.swift" },
            "2": { name: "keyword.control.import.preprocessor.conditional.swift" }
          },
          end: /(?=\p{space}*\/[\*\/])|(?=\n?$)/dgv,
          name: "meta.preprocessor.conditional.swift",
          patterns: [
            {
              match: /(&&|\|\|)/dgv,
              name: "keyword.operator.logical.swift"
            },
            {
              match: /\b(true|false)\b/dgv,
              name: "constant.language.boolean.swift"
            },
            {
              captures: {
                "1": { name: "keyword.other.condition.swift" },
                "2": { name: "punctuation.definition.parameters.begin.swift" },
                "3": { name: "support.constant.platform.architecture.swift" },
                "4": { name: "punctuation.definition.parameters.end.swift" }
              },
              match: /\b(arch)\p{space}*(\()\p{space}*(?:(arm|arm64|powerpc64|powerpc64le|i386|x86_64|s390x)|[\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\))/dgv
            },
            {
              captures: {
                "1": { name: "keyword.other.condition.swift" },
                "2": { name: "punctuation.definition.parameters.begin.swift" },
                "3": { name: "support.constant.platform.os.swift" },
                "4": { name: "punctuation.definition.parameters.end.swift" }
              },
              match: /\b(os)\p{space}*(\()\p{space}*(?:(macOS|OSX|iOS|tvOS|watchOS|visionOS|Android|Linux|FreeBSD|Windows|PS4)|[\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(\))/dgv
            },
            {
              captures: {
                "1": { name: "keyword.other.condition.swift" },
                "2": { name: "punctuation.definition.parameters.begin.swift" },
                "3": { name: "entity.name.type.module.swift" },
                "4": { name: "punctuation.definition.parameters.end.swift" }
              },
              match: /\b(canImport)\p{space}*(\()([_\p{L}][_\p{L}\p{N}\p{M}]*)(\))/dgv
            },
            {
              begin: /\b(targetEnvironment)\p{space}*(\()/dgv,
              beginCaptures: {
                "1": { name: "keyword.other.condition.swift" },
                "2": { name: "punctuation.definition.parameters.begin.swift" }
              },
              end: /(\))|(?=\n?$)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.parameters.end.swift" }
              },
              patterns: [
                {
                  match: /\b(simulator|UIKitForMac)\b/dgv,
                  name: "support.constant.platform.environment.swift"
                }
              ]
            },
            {
              begin: /\b(swift|compiler)\p{space}*(\()/dgv,
              beginCaptures: {
                "1": { name: "keyword.other.condition.swift" },
                "2": { name: "punctuation.definition.parameters.begin.swift" }
              },
              end: /(\))|(?=\n?$)/dgv,
              endCaptures: {
                "1": { name: "punctuation.definition.parameters.end.swift" }
              },
              patterns: [
                {
                  match: />=|</dgv,
                  name: "keyword.operator.comparison.swift"
                },
                {
                  match: /\b[0-9]+(?:\.[0-9]+)*\b/dgv,
                  name: "constant.numeric.swift"
                }
              ]
            }
          ]
        },
        {
          captures: {
            "1": { name: "punctuation.definition.preprocessor.swift" },
            "2": { name: "keyword.control.import.preprocessor.conditional.swift" },
            "3": {
              patterns: [
                {
                  match: /\P{space}+/dgv,
                  name: "invalid.illegal.character-not-allowed-here.swift"
                }
              ]
            }
          },
          match: /^\p{space}*(#)(e(?:lse|ndif))([^\n]*?)(?=(?=\n?$)|\/\/|\/\*)/dgv,
          name: "meta.preprocessor.conditional.swift"
        },
        {
          captures: {
            "1": { name: "punctuation.definition.preprocessor.swift" },
            "2": { name: "keyword.control.import.preprocessor.sourcelocation.swift" },
            "4": { name: "punctuation.definition.parameters.begin.swift" },
            "5": {
              patterns: [
                {
                  begin: /(file)\p{space}*(:)\p{space}*(?=")/dgv,
                  beginCaptures: {
                    "1": { name: "support.variable.parameter.swift" },
                    "2": { name: "punctuation.separator.key-value.swift" }
                  },
                  end: {
                    G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
                  },
                  patterns: [
                    { include: "#literals" }
                  ]
                },
                {
                  captures: {
                    "1": { name: "support.variable.parameter.swift" },
                    "2": { name: "punctuation.separator.key-value.swift" },
                    "3": { name: "constant.numeric.integer.swift" }
                  },
                  match: /(line)\p{space}*(:)\p{space}*([0-9]+)/dgv
                },
                {
                  match: /,/dgv,
                  name: "punctuation.separator.parameters.swift"
                },
                {
                  match: /\P{space}+/dgv,
                  name: "invalid.illegal.character-not-allowed-here.swift"
                }
              ]
            },
            "6": { name: "punctuation.definition.parameters.begin.swift" },
            "7": {
              patterns: [
                {
                  match: /\P{space}+/dgv,
                  name: "invalid.illegal.character-not-allowed-here.swift"
                }
              ]
            }
          },
          match: /^\p{space}*(#)(sourceLocation)((\()([^\)]*)(\)))([^\n]*?)(?=(?=\n?$)|\/\/|\/\*)/dgv,
          name: "meta.preprocessor.sourcelocation.swift"
        }
      ]
    },
    conditionals: {
      patterns: [
        {
          begin: /(?<!\.)\b(if|guard|switch|for)\b/dgv,
          beginCaptures: {
            "1": {
              patterns: [
                { include: "#keywords" }
              ]
            }
          },
          end: /(?=\{)/dgv,
          patterns: [
            { include: "#expressions-without-trailing-closures" }
          ]
        },
        {
          begin: /(?<!\.)\b(while)\b/dgv,
          beginCaptures: {
            "1": {
              patterns: [
                { include: "#keywords" }
              ]
            }
          },
          end: /(?=\{)|(?=\n?$)/dgv,
          patterns: [
            { include: "#expressions-without-trailing-closures" }
          ]
        }
      ]
    },
    declarations: {
      patterns: [
        { include: "#declarations-function" },
        { include: "#declarations-function-initializer" },
        { include: "#declarations-function-subscript" },
        { include: "#declarations-typed-variable-declaration" },
        { include: "#declarations-import" },
        { include: "#declarations-operator" },
        { include: "#declarations-precedencegroup" },
        { include: "#declarations-protocol" },
        { include: "#declarations-type" },
        { include: "#declarations-extension" },
        { include: "#declarations-typealias" },
        { include: "#declarations-macro" }
      ]
    },
    "declarations-available-types": {
      patterns: [
        { include: "#comments" },
        { include: "#builtin-types" },
        { include: "#attributes" },
        {
          match: /\basync\b/dgv,
          name: "storage.modifier.async.swift"
        },
        {
          match: /\b(?:|re)throws\b/dgv,
          name: "storage.modifier.exception.swift"
        },
        {
          match: /\bsome\b/dgv,
          name: "keyword.other.operator.type.opaque.swift"
        },
        {
          match: /\bany\b/dgv,
          name: "keyword.other.operator.type.existential.swift"
        },
        {
          match: /\b(?:repeat|each)\b/dgv,
          name: "keyword.control.loop.swift"
        },
        {
          match: /\b(?:inout|isolated|borrowing|consuming)\b/dgv,
          name: "storage.modifier.swift"
        },
        {
          match: /\bnonisolated(?:\(nonsending\)|\b)/dgv,
          name: "storage.modifier.swift"
        },
        {
          match: /\bSelf\b/dgv,
          name: "variable.language.swift"
        },
        {
          captures: {
            "1": { name: "keyword.operator.type.function.swift" }
          },
          match: /(?<![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])(->)(?![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.type.composition.swift" }
          },
          match: /(?<![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])(&)(?![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])/dgv
        },
        {
          match: /[\!\?]/dgv,
          name: "keyword.operator.type.optional.swift"
        },
        {
          match: /\.\.\./dgv,
          name: "keyword.operator.function.variadic-parameter.swift"
        },
        {
          match: /\bprotocol\b/dgv,
          name: "keyword.other.type.composition.swift"
        },
        {
          match: /(?<=\.)(?:Protocol|Type)\b/dgv,
          name: "keyword.other.type.metatype.swift"
        },
        { include: "#declarations-available-types-tuple-type" },
        { include: "#declarations-available-types-collection-type" },
        { include: "#declarations-generic-argument-clause" }
      ]
    },
    "declarations-available-types-collection-type": {
      begin: /\[/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.collection-type.begin.swift" }
      },
      end: /\]|(?=[\)\>\{\}])/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.collection-type.end.swift" }
      },
      patterns: [
        { include: "#declarations-available-types" },
        { include: "#literals-numeric" },
        {
          match: /\b_\b/dgv,
          name: "support.variable.inferred.swift"
        },
        {
          match: /(?<=\p{space})\bof\b(?=\p{space}+[\(\[_\p{L}\p{Nd}\p{N}\p{M}])/dgv,
          name: "keyword.other.inline-array.swift"
        },
        {
          begin: /:/dgv,
          beginCaptures: {
            "0": { name: "punctuation.separator.key-value.swift" }
          },
          end: /(?=[\]\)\>\{\}])/dgv,
          patterns: [
            {
              match: /:/dgv,
              name: "invalid.illegal.extra-colon-in-dictionary-type.swift"
            },
            { include: "#declarations-available-types" }
          ]
        }
      ]
    },
    "declarations-available-types-tuple-type": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.tuple-type.begin.swift" }
      },
      end: /\)|(?=[\]\>\{\}])/dgv,
      endCaptures: {
        "0": { name: "punctuation.section.tuple-type.end.swift" }
      },
      patterns: [
        { include: "#declarations-available-types" }
      ]
    },
    "declarations-extension": {
      begin: /\b(extension)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "storage.type.$1.swift" }
      },
      end: /(?<=\})/dgv,
      name: "meta.definition.type.$1.swift",
      patterns: [
        {
          begin: {
            G: [/￿(?!\p{space}*[\n\:\{])/dgv, /(?!\p{space}*[\n\:\{])/dgvy]
          },
          end: {
            G: [/(?=\p{space}*[\n\:\{])|(?!￿)(?=\p{space}*where\b)/dgv, new EmulatedRegExp("(?=\\p{space}*[\\n\\:\\{])|(?!^)(?=\\p{space}*where\\b)", "dgv", { strategy: "clip_search" })]
          },
          name: "entity.name.type.swift",
          patterns: [
            { include: "#declarations-available-types" }
          ]
        },
        { include: "#comments" },
        { include: "#declarations-generic-where-clause" },
        { include: "#declarations-inheritance-clause" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.type.begin.swift" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.type.end.swift" }
          },
          name: "meta.definition.type.body.swift",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "declarations-function": {
      begin: new EmulatedRegExp("\\b(func)\\p{space}+((?<q>`?)[_\\p{L}][_\\p{L}\\p{N}\\p{M}]*(\\3)|(?:((?<oph>[\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|(?<opc>[̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}]))*)|(\\.(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|([̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}])|\\.)+)))\\p{space}*(?=[\\(\\<])", "dgv", { hiddenCaptures: [8, 12, 13], transfers: [[6, [8, 12]], [9, [13]]] }),
      beginCaptures: {
        "1": { name: "storage.type.function.swift" },
        "2": { name: "entity.name.function.swift" },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      end: /(?<=\})|(?=\n?$)/dgv,
      name: "meta.definition.function.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-parameter-clause" },
        { include: "#declarations-parameter-clause" },
        { include: "#declarations-function-result" },
        { include: "#async-throws" },
        { include: "#declarations-generic-where-clause" },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.function.begin.swift" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.function.end.swift" }
          },
          name: "meta.definition.function.body.swift",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "declarations-function-initializer": {
      begin: /(?<!\.)\b(init[\!\?]*)\p{space}*(?=[\(\<])/dgv,
      beginCaptures: {
        "1": {
          name: "storage.type.function.swift",
          patterns: [
            {
              match: /(?<=[\!\?])[\!\?]+/dgv,
              name: "invalid.illegal.character-not-allowed-here.swift"
            }
          ]
        }
      },
      end: /(?<=\})|(?=\n?$)/dgv,
      name: "meta.definition.function.initializer.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-parameter-clause" },
        { include: "#declarations-parameter-clause" },
        { include: "#async-throws" },
        { include: "#declarations-generic-where-clause" },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.function.begin.swift" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.function.end.swift" }
          },
          name: "meta.definition.function.body.swift",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "declarations-function-result": {
      begin: /(?<![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])(->)(?![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.function-result.swift" }
      },
      end: {
        G: [/(?!￿)(?=\{|\bwhere\b|[\;\=])|(?=\n?$)/dgv, new EmulatedRegExp("(?!^)(?=\\{|\\bwhere\\b|[\\;\\=])|(?=\\n?$)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.function-result.swift",
      patterns: [
        {
          match: /\bsending\b/dgv,
          name: "storage.modifier.swift"
        },
        { include: "#declarations-available-types" }
      ]
    },
    "declarations-function-subscript": {
      begin: /(?<!\.)\b(subscript)\p{space}*(?=[\(\<])/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.swift" }
      },
      end: /(?<=\})|(?=\n?$)/dgv,
      name: "meta.definition.function.subscript.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-parameter-clause" },
        { include: "#declarations-parameter-clause" },
        { include: "#declarations-function-result" },
        { include: "#async-throws" },
        { include: "#declarations-generic-where-clause" },
        {
          begin: /(\{)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.section.function.begin.swift" }
          },
          end: /(\})/dgv,
          endCaptures: {
            "1": { name: "punctuation.section.function.end.swift" }
          },
          name: "meta.definition.function.body.swift",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "declarations-generic-argument-clause": {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.separator.generic-argument-clause.begin.swift" }
      },
      end: />|(?=[\]\)\{\}])/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.generic-argument-clause.end.swift" }
      },
      name: "meta.generic-argument-clause.swift",
      patterns: [
        { include: "#literals-numeric" },
        { include: "#declarations-available-types" }
      ]
    },
    "declarations-generic-parameter-clause": {
      begin: /</dgv,
      beginCaptures: {
        "0": { name: "punctuation.separator.generic-parameter-clause.begin.swift" }
      },
      end: />|(?=[^\&\,\:\<\=\>\`\p{L}\p{M}\p{N}\p{Pc}\p{Nd}\p{space}])/dgv,
      endCaptures: {
        "0": { name: "punctuation.separator.generic-parameter-clause.end.swift" }
      },
      name: "meta.generic-parameter-clause.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-where-clause" },
        {
          match: /\blet\b/dgv,
          name: "keyword.other.declaration-specifier.swift"
        },
        {
          match: /\beach\b/dgv,
          name: "keyword.control.loop.swift"
        },
        {
          captures: {
            "1": { name: "variable.language.generic-parameter.swift" }
          },
          match: /\b((?!\p{Nd})[\p{L}\p{M}\p{N}\p{Pc}][\p{L}\p{M}\p{N}\p{Pc}\p{Nd}]*)\b/dgv
        },
        {
          match: /,/dgv,
          name: "punctuation.separator.generic-parameters.swift"
        },
        {
          begin: /(:)\p{space}*/dgv,
          beginCaptures: {
            "1": { name: "punctuation.separator.generic-parameter-constraint.swift" }
          },
          end: {
            G: [/(?=[\,\>]|(?!￿)\bwhere\b)/dgv, new EmulatedRegExp("(?=[\\,\\>]|(?!^)\\bwhere\\b)", "dgv", { strategy: "clip_search" })]
          },
          name: "meta.generic-parameter-constraint.swift",
          patterns: [
            {
              begin: {
                G: [/￿/dgv, /(?:)/dgv]
              },
              end: {
                G: [/(?=[\,\>]|(?!￿)\bwhere\b)/dgv, new EmulatedRegExp("(?=[\\,\\>]|(?!^)\\bwhere\\b)", "dgv", { strategy: "clip_search" })]
              },
              name: "entity.other.inherited-class.swift",
              patterns: [
                { include: "#declarations-type-identifier" },
                { include: "#declarations-type-operators" }
              ]
            }
          ]
        }
      ]
    },
    "declarations-generic-where-clause": {
      begin: /\b(where)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.generic-constraint-introducer.swift" }
      },
      end: {
        G: [/(?!￿)(?=\n?$)|(?=[\n\;\>\{\}]|\/\/|\/\*)/dgv, new EmulatedRegExp("(?!^)(?=\\n?$)|(?=[\\n\\;\\>\\{\\}]|//|/\\*)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.generic-where-clause.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-where-clause-requirement-list" }
      ]
    },
    "declarations-generic-where-clause-requirement-list": {
      begin: {
        G: [/￿|,\p{space}*/dgv, /|,\p{space}*/dgv]
      },
      end: /(?=[\n\,\;\>\{\}]|\/\/|\/\*)/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#constraint" },
        { include: "#declarations-available-types" },
        {
          begin: /(?<![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])(==)(?![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.generic-constraint.same-type.swift" }
          },
          end: /(?=\p{space}*[\n\,\;\>\{\}]|\/\/|\/\*)/dgv,
          name: "meta.generic-where-clause.same-type-requirement.swift",
          patterns: [
            { include: "#declarations-available-types" }
          ]
        },
        {
          begin: /(?<![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])(:)(?![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])/dgv,
          beginCaptures: {
            "1": { name: "keyword.operator.generic-constraint.conforms-to.swift" }
          },
          end: /(?=\p{space}*[\n\,\;\>\{\}]|\/\/|\/\*)/dgv,
          name: "meta.generic-where-clause.conformance-requirement.swift",
          patterns: [
            {
              begin: {
                G: [/￿\p{space}*/dgv, /\p{space}*/dgvy]
              },
              contentName: "entity.other.inherited-class.swift",
              end: /(?=\p{space}*[\n\,\;\>\{\}]|\/\/|\/\*)/dgv,
              patterns: [
                { include: "#declarations-available-types" }
              ]
            }
          ]
        }
      ]
    },
    "declarations-import": {
      begin: /(?<!\.)\b(import)\p{space}+/dgv,
      beginCaptures: {
        "1": { name: "keyword.control.import.swift" }
      },
      end: /(;)|(?=\n?$)\n?|(?=\/[\*\/])/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.statement.swift" }
      },
      name: "meta.import.swift",
      patterns: [
        {
          begin: {
            G: [/￿(?!;|(?=\n?$)|\/\/|\/\*)(?:(typealias|struct|class|actor|enum|protocol|var|func)\p{space}+)?/dgv, /(?!;|(?=\n?$)|\/\/|\/\*)(?:(typealias|struct|class|actor|enum|protocol|var|func)\p{space}+)?/dgvy]
          },
          beginCaptures: {
            "1": { name: "storage.modifier.swift" }
          },
          end: /(?=;|(?=\n?$)|\/\/|\/\*)/dgv,
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.identifier.swift" },
                "2": { name: "punctuation.definition.identifier.swift" }
              },
              match: {
                G: [/(?<=￿|\.)(?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\1)/dgv, new EmulatedRegExp("(?<=^|\\.)(?<q>`?)[_\\p{L}][_\\p{L}\\p{N}\\p{M}]*(\\1)", "dgv", { strategy: "clip_search" })]
              },
              name: "entity.name.type.swift"
            },
            {
              match: {
                G: [/(?<=￿|\.)\$[0-9]+/dgv, new EmulatedRegExp("(?<=^|\\.)\\$[0-9]+", "dgv", { strategy: "clip_search" })]
              },
              name: "entity.name.type.swift"
            },
            {
              captures: {
                "1": {
                  patterns: [
                    {
                      match: /\./dgv,
                      name: "invalid.illegal.dot-not-allowed-here.swift"
                    }
                  ]
                }
              },
              match: {
                G: [new EmulatedRegExp("(?<=￿|\\.)(?:((?<oph>[\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|(?<opc>[̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}]))*)|(\\.(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|([̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}])|\\.)+))(?=[\\.\\;]|(?=\\n?$)|//|/\\*|\\p{space})", "dgv", { hiddenCaptures: [4, 8, 9], transfers: [[2, [4, 8]], [5, [9]]] }), new EmulatedRegExp("(?<=^|\\.)(?:((?<oph>[\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|(?<opc>[̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}]))*)|(\\.(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|([̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}])|\\.)+))(?=[\\.\\;]|(?=\\n?$)|//|/\\*|\\p{space})", "dgv", { hiddenCaptures: [4, 8, 9], transfers: [[2, [4, 8]], [5, [9]]], strategy: "clip_search" })]
              },
              name: "entity.name.type.swift"
            },
            {
              match: /\./dgv,
              name: "punctuation.separator.import.swift"
            },
            {
              begin: /(?!\p{space}*(;|(?=\n?$)|\/\/|\/\*))/dgv,
              end: /(?=\p{space}*(;|(?=\n?$)|\/\/|\/\*))/dgv,
              name: "invalid.illegal.character-not-allowed-here.swift"
            }
          ]
        }
      ]
    },
    "declarations-inheritance-clause": {
      begin: /(:)(?=\p{space}*\{)|(:)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "invalid.illegal.empty-inheritance-clause.swift" },
        "2": { name: "punctuation.separator.inheritance-clause.swift" }
      },
      end: {
        G: [/(?!￿)(?=\n?$)|(?=[\=\{\}]|(?!￿)\bwhere\b)/dgv, new EmulatedRegExp("(?!^)(?=\\n?$)|(?=[\\=\\{\\}]|(?!^)\\bwhere\\b)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.inheritance-clause.swift",
      patterns: [
        {
          begin: /\bclass\b/dgv,
          beginCaptures: {
            "0": { name: "storage.type.class.swift" }
          },
          end: {
            G: [/(?=[\=\{\}]|(?!￿)\bwhere\b)/dgv, new EmulatedRegExp("(?=[\\=\\{\\}]|(?!^)\\bwhere\\b)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            { include: "#comments" },
            { include: "#declarations-inheritance-clause-more-types" }
          ]
        },
        {
          begin: {
            G: [/￿/dgv, /(?:)/dgv]
          },
          end: {
            G: [/(?!￿)(?=\n?$)|(?=[\=\{\}]|(?!￿)\bwhere\b)/dgv, new EmulatedRegExp("(?!^)(?=\\n?$)|(?=[\\=\\{\\}]|(?!^)\\bwhere\\b)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            { include: "#attributes" },
            { include: "#comments" },
            { include: "#declarations-inheritance-clause-inherited-type" },
            { include: "#declarations-inheritance-clause-more-types" },
            { include: "#declarations-type-operators" }
          ]
        }
      ]
    },
    "declarations-inheritance-clause-inherited-type": {
      begin: /(?=[_\`\p{L}])/dgv,
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      name: "entity.other.inherited-class.swift",
      patterns: [
        { include: "#declarations-type-identifier" }
      ]
    },
    "declarations-inheritance-clause-more-types": {
      begin: /,\p{space}*/dgv,
      end: {
        G: [/(?!￿)(?!\/[\*\/])|(?=[\,\=\{\}]|(?!￿)\bwhere\b)/dgv, new EmulatedRegExp("(?!^)(?!/[\\*\\/])|(?=[\\,\\=\\{\\}]|(?!^)\\bwhere\\b)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.inheritance-list.more-types",
      patterns: [
        { include: "#attributes" },
        { include: "#comments" },
        { include: "#declarations-inheritance-clause-inherited-type" },
        { include: "#declarations-inheritance-clause-more-types" },
        { include: "#declarations-type-operators" }
      ]
    },
    "declarations-macro": {
      begin: /\b(macro)\p{space}+((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))\p{space}*(?=[\(\<\=])/dgv,
      beginCaptures: {
        "1": { name: "storage.type.function.swift" },
        "2": { name: "entity.name.function.swift" },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      end: /(?=\n?$)|(?=;|\/\/|\/\*|[\=\}])/dgv,
      name: "meta.definition.macro.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-parameter-clause" },
        { include: "#declarations-parameter-clause" },
        { include: "#declarations-function-result" },
        { include: "#async-throws" },
        { include: "#declarations-generic-where-clause" }
      ]
    },
    "declarations-operator": {
      begin: new EmulatedRegExp("(?:\\b((?:pre|in|post)fix)\\p{space}+)?\\b(operator)\\p{space}+(((?<oph>[\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])(?:(?=((([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|\\.|(?<opc>[̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}]))*))\\6))|(\\.(?:(?=((([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|([̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}])|\\.)+))\\11)))\\p{space}*", "dgv", { hiddenCaptures: [6, 8, 11, 13, 14], transfers: [[5, [8, 13]], [9, [14]]] }),
      beginCaptures: {
        "1": { name: "storage.modifier.swift" },
        "2": { name: "storage.type.function.operator.swift" },
        "3": { name: "entity.name.function.operator.swift" },
        "4": {
          name: "entity.name.function.operator.swift",
          patterns: [
            {
              match: /\./dgv,
              name: "invalid.illegal.dot-not-allowed-here.swift"
            }
          ]
        }
      },
      end: /(;)|(?=\n?$)\n?|(?=\/[\*\/])/dgv,
      endCaptures: {
        "1": { name: "punctuation.terminator.statement.swift" }
      },
      name: "meta.definition.operator.swift",
      patterns: [
        { include: "#declarations-operator-swift2" },
        { include: "#declarations-operator-swift3" },
        {
          match: /((?!(?=\n?$)|;|\/\/|\/\*)\P{space})+/dgv,
          name: "invalid.illegal.character-not-allowed-here.swift"
        }
      ]
    },
    "declarations-operator-swift2": {
      begin: {
        G: [/￿(\{)/dgv, /(\{)/dgvy]
      },
      beginCaptures: {
        "1": { name: "punctuation.definition.operator.begin.swift" }
      },
      end: /(\})/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.operator.end.swift" }
      },
      patterns: [
        { include: "#comments" },
        {
          captures: {
            "1": { name: "storage.modifier.swift" },
            "2": { name: "keyword.other.operator.associativity.swift" }
          },
          match: /\b(associativity)\p{space}+(left|right)\b/dgv
        },
        {
          captures: {
            "1": { name: "storage.modifier.swift" },
            "2": { name: "constant.numeric.integer.swift" }
          },
          match: /\b(precedence)\p{space}+([0-9]+)\b/dgv
        },
        {
          captures: {
            "1": { name: "storage.modifier.swift" }
          },
          match: /\b(assignment)\b/dgv
        }
      ]
    },
    "declarations-operator-swift3": {
      captures: {
        "2": {
          name: "entity.other.inherited-class.swift",
          patterns: [
            { include: "#declarations-types-precedencegroup" }
          ]
        },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      match: {
        G: [/￿(:)\p{space}*((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))/dgv, /(:)\p{space}*((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))/dgvy]
      }
    },
    "declarations-parameter-clause": {
      begin: /(\()/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.parameters.begin.swift" }
      },
      end: /(\))(?:\p{space}*(async)\b)?/dgv,
      endCaptures: {
        "1": { name: "punctuation.definition.parameters.end.swift" },
        "2": { name: "storage.modifier.async.swift" }
      },
      name: "meta.parameter-clause.swift",
      patterns: [
        { include: "#declarations-parameter-list" }
      ]
    },
    "declarations-parameter-list": {
      patterns: [
        {
          captures: {
            "1": { name: "entity.name.function.swift" },
            "2": { name: "punctuation.definition.identifier.swift" },
            "3": { name: "punctuation.definition.identifier.swift" },
            "4": { name: "variable.parameter.function.swift" },
            "5": { name: "punctuation.definition.identifier.swift" },
            "6": { name: "punctuation.definition.identifier.swift" }
          },
          match: /((?<q1>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))\p{space}+((?<q2>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\5))(?=\p{space}*:)/dgv
        },
        {
          captures: {
            "1": { name: "variable.parameter.function.swift" },
            "2": { name: "entity.name.function.swift" },
            "3": { name: "punctuation.definition.identifier.swift" },
            "4": { name: "punctuation.definition.identifier.swift" }
          },
          match: /(((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3)))(?=\p{space}*:)/dgv
        },
        {
          begin: /:\p{space}*(?!\p{space})/dgv,
          end: /(?=[\)\,])/dgv,
          patterns: [
            {
              match: /\bsending\b/dgv,
              name: "storage.modifier.swift"
            },
            { include: "#declarations-available-types" },
            {
              match: /:/dgv,
              name: "invalid.illegal.extra-colon-in-parameter-list.swift"
            },
            {
              begin: /=/dgv,
              beginCaptures: {
                "0": { name: "keyword.operator.assignment.swift" }
              },
              end: /(?=[\)\,])/dgv,
              patterns: [
                { include: "#expressions" }
              ]
            }
          ]
        }
      ]
    },
    "declarations-precedencegroup": {
      begin: /\b(precedencegroup)\p{space}+((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))\p{space}*(?=\{)/dgv,
      beginCaptures: {
        "1": { name: "storage.type.precedencegroup.swift" },
        "2": { name: "entity.name.type.precedencegroup.swift" },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.definition.precedencegroup.swift",
      patterns: [
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.precedencegroup.begin.swift" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.precedencegroup.end.swift" }
          },
          patterns: [
            { include: "#comments" },
            {
              captures: {
                "1": { name: "storage.modifier.swift" },
                "2": {
                  name: "entity.other.inherited-class.swift",
                  patterns: [
                    { include: "#declarations-types-precedencegroup" }
                  ]
                },
                "3": { name: "punctuation.definition.identifier.swift" },
                "4": { name: "punctuation.definition.identifier.swift" }
              },
              match: /\b((?:high|low)erThan)\p{space}*:\p{space}*((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))/dgv
            },
            {
              captures: {
                "1": { name: "storage.modifier.swift" },
                "2": { name: "keyword.other.operator.associativity.swift" }
              },
              match: /\b(associativity)\b(?:\p{space}*:\p{space}*(right|left|none)\b)?/dgv
            },
            {
              captures: {
                "1": { name: "storage.modifier.swift" },
                "2": { name: "constant.language.boolean.swift" }
              },
              match: /\b(assignment)\b(?:\p{space}*:\p{space}*(true|false)\b)?/dgv
            }
          ]
        }
      ]
    },
    "declarations-protocol": {
      begin: /\b(protocol)\p{space}+((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))/dgv,
      beginCaptures: {
        "1": { name: "storage.type.$1.swift" },
        "2": { name: "entity.name.type.$1.swift" },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      end: /(?<=\})/dgv,
      name: "meta.definition.type.protocol.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-inheritance-clause" },
        { include: "#declarations-generic-where-clause" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.type.begin.swift" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.type.end.swift" }
          },
          name: "meta.definition.type.body.swift",
          patterns: [
            { include: "#declarations-protocol-protocol-method" },
            { include: "#declarations-protocol-protocol-initializer" },
            { include: "#declarations-protocol-associated-type" },
            { include: "$self" }
          ]
        }
      ]
    },
    "declarations-protocol-associated-type": {
      begin: /\b(associatedtype)\p{space}+((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.declaration-specifier.swift" },
        "2": { name: "variable.language.associatedtype.swift" },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      end: {
        G: [/(?!￿)(?=\n?$)|(?=[\;\}]|(?=\n?$))/dgv, new EmulatedRegExp("(?!^)(?=\\n?$)|(?=[\\;\\}]|(?=\\n?$))", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.definition.associatedtype.swift",
      patterns: [
        { include: "#declarations-inheritance-clause" },
        { include: "#declarations-generic-where-clause" },
        { include: "#declarations-typealias-assignment" }
      ]
    },
    "declarations-protocol-protocol-initializer": {
      begin: /(?<!\.)\b(init[\!\?]*)\p{space}*(?=[\(\<])/dgv,
      beginCaptures: {
        "1": {
          name: "storage.type.function.swift",
          patterns: [
            {
              match: /(?<=[\!\?])[\!\?]+/dgv,
              name: "invalid.illegal.character-not-allowed-here.swift"
            }
          ]
        }
      },
      end: /(?=\n?$)|(?=;|\/\/|\/\*|\})/dgv,
      name: "meta.definition.function.initializer.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-parameter-clause" },
        { include: "#declarations-parameter-clause" },
        { include: "#async-throws" },
        { include: "#declarations-generic-where-clause" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.function.begin.swift" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.swift" }
          },
          name: "invalid.illegal.function-body-not-allowed-in-protocol.swift",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "declarations-protocol-protocol-method": {
      begin: new EmulatedRegExp("\\b(func)\\p{space}+((?<q>`?)[_\\p{L}][_\\p{L}\\p{N}\\p{M}]*(\\3)|(?:((?<oph>[\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|(?<opc>[̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}]))*)|(\\.(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|([̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}])|\\.)+)))\\p{space}*(?=[\\(\\<])", "dgv", { hiddenCaptures: [8, 12, 13], transfers: [[6, [8, 12]], [9, [13]]] }),
      beginCaptures: {
        "1": { name: "storage.type.function.swift" },
        "2": { name: "entity.name.function.swift" },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      end: /(?=\n?$)|(?=;|\/\/|\/\*|\})/dgv,
      name: "meta.definition.function.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-parameter-clause" },
        { include: "#declarations-parameter-clause" },
        { include: "#declarations-function-result" },
        { include: "#async-throws" },
        { include: "#declarations-generic-where-clause" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.function.begin.swift" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.function.end.swift" }
          },
          name: "invalid.illegal.function-body-not-allowed-in-protocol.swift",
          patterns: [
            { include: "$self" }
          ]
        }
      ]
    },
    "declarations-type": {
      patterns: [
        {
          begin: /\b(class(?!\p{space}+(?:func|var|let)\b)|struct|actor)\b\p{space}*((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))/dgv,
          beginCaptures: {
            "1": { name: "storage.type.$1.swift" },
            "2": { name: "entity.name.type.$1.swift" },
            "3": { name: "punctuation.definition.identifier.swift" },
            "4": { name: "punctuation.definition.identifier.swift" }
          },
          end: /(?<=\})/dgv,
          name: "meta.definition.type.$1.swift",
          patterns: [
            { include: "#comments" },
            { include: "#declarations-generic-parameter-clause" },
            { include: "#declarations-generic-where-clause" },
            { include: "#declarations-inheritance-clause" },
            {
              begin: /\{/dgv,
              beginCaptures: {
                "0": { name: "punctuation.definition.type.begin.swift" }
              },
              end: /\}/dgv,
              endCaptures: {
                "0": { name: "punctuation.definition.type.end.swift" }
              },
              name: "meta.definition.type.body.swift",
              patterns: [
                { include: "$self" }
              ]
            }
          ]
        },
        { include: "#declarations-type-enum" }
      ]
    },
    "declarations-type-enum": {
      begin: /\b(enum)\p{space}+((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))/dgv,
      beginCaptures: {
        "1": { name: "storage.type.$1.swift" },
        "2": { name: "entity.name.type.$1.swift" },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      end: /(?<=\})/dgv,
      name: "meta.definition.type.$1.swift",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-generic-parameter-clause" },
        { include: "#declarations-generic-where-clause" },
        { include: "#declarations-inheritance-clause" },
        {
          begin: /\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.type.begin.swift" }
          },
          end: /\}/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.type.end.swift" }
          },
          name: "meta.definition.type.body.swift",
          patterns: [
            { include: "#declarations-type-enum-enum-case-clause" },
            { include: "$self" }
          ]
        }
      ]
    },
    "declarations-type-enum-associated-values": {
      begin: {
        G: [/￿\(/dgv, /\(/dgvy]
      },
      beginCaptures: {
        "0": { name: "punctuation.definition.parameters.begin.swift" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.swift" }
      },
      patterns: [
        { include: "#comments" },
        {
          begin: /(?:(_)|((?<q1>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*\3))\p{space}+(((?<q2>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*\6))\p{space}*(:)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.swift" },
            "2": { name: "invalid.illegal.distinct-labels-not-allowed.swift" },
            "5": { name: "variable.parameter.function.swift" },
            "7": { name: "punctuation.separator.argument-label.swift" }
          },
          end: /(?=[\]\)\,])/dgv,
          patterns: [
            { include: "#declarations-available-types" }
          ]
        },
        {
          begin: /(((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*\3))\p{space}*(:)/dgv,
          beginCaptures: {
            "1": { name: "entity.name.function.swift" },
            "2": { name: "variable.parameter.function.swift" },
            "4": { name: "punctuation.separator.argument-label.swift" }
          },
          end: /(?=[\]\)\,])/dgv,
          patterns: [
            { include: "#declarations-available-types" }
          ]
        },
        {
          begin: /(?![\]\)\,])(?=\P{space})/dgv,
          end: /(?=[\]\)\,])/dgv,
          patterns: [
            { include: "#declarations-available-types" },
            {
              match: /:/dgv,
              name: "invalid.illegal.extra-colon-in-parameter-list.swift"
            }
          ]
        }
      ]
    },
    "declarations-type-enum-enum-case": {
      begin: /((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "variable.other.enummember.swift" }
      },
      end: /(?<=\))|(?![\(\=])/dgv,
      patterns: [
        { include: "#comments" },
        { include: "#declarations-type-enum-associated-values" },
        { include: "#declarations-type-enum-raw-value-assignment" }
      ]
    },
    "declarations-type-enum-enum-case-clause": {
      begin: /\b(case)\b\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "storage.type.enum.case.swift" }
      },
      end: {
        G: [/(?=[\;\}])|(?!￿)(?!\/[\*\/])(?=[^\,\p{space}])/dgv, new EmulatedRegExp("(?=[\\;\\}])|(?!^)(?!/[\\*\\/])(?=[^\\,\\p{space}])", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        { include: "#comments" },
        { include: "#declarations-type-enum-enum-case" },
        { include: "#declarations-type-enum-more-cases" }
      ]
    },
    "declarations-type-enum-more-cases": {
      begin: /,\p{space}*/dgv,
      end: {
        G: [/(?!￿)(?!\/[\*\/])(?=[\;\}[^\,\p{space}]])/dgv, new EmulatedRegExp("(?!^)(?!/[\\*\\/])(?=[\\;\\}[^\\,\\p{space}]])", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.enum-case.more-cases",
      patterns: [
        { include: "#comments" },
        { include: "#declarations-type-enum-enum-case" },
        { include: "#declarations-type-enum-more-cases" }
      ]
    },
    "declarations-type-enum-raw-value-assignment": {
      begin: /(=)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.assignment.swift" }
      },
      end: {
        G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        { include: "#comments" },
        { include: "#literals" }
      ]
    },
    "declarations-type-identifier": {
      begin: /((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))\p{space}*/dgv,
      beginCaptures: {
        "1": {
          name: "meta.type-name.swift",
          patterns: [
            { include: "#builtin-types" }
          ]
        },
        "2": { name: "punctuation.definition.identifier.swift" },
        "3": { name: "punctuation.definition.identifier.swift" }
      },
      end: /(?!<)/dgv,
      patterns: [
        {
          begin: /(?=<)/dgv,
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            { include: "#declarations-generic-argument-clause" }
          ]
        }
      ]
    },
    "declarations-type-operators": {
      patterns: [
        {
          captures: {
            "1": { name: "keyword.operator.type.composition.swift" }
          },
          match: /(?<![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])(&)(?![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])/dgv
        },
        {
          captures: {
            "1": { name: "keyword.operator.type.requirement-suppression.swift" }
          },
          match: /(?<![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])(~)(?![\-\!\%\&\*\+\.\/\<\=\>\^\|\~])/dgv
        }
      ]
    },
    "declarations-typealias": {
      begin: /\b(typealias)\p{space}+((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3))\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.other.declaration-specifier.swift" },
        "2": { name: "entity.name.type.typealias.swift" },
        "3": { name: "punctuation.definition.identifier.swift" },
        "4": { name: "punctuation.definition.identifier.swift" }
      },
      end: {
        G: [/(?!￿)(?=\n?$)|(?=;|\/\/|\/\*|(?=\n?$))/dgv, new EmulatedRegExp("(?!^)(?=\\n?$)|(?=;|//|/\\*|(?=\\n?$))", "dgv", { strategy: "clip_search" })]
      },
      name: "meta.definition.typealias.swift",
      patterns: [
        {
          begin: {
            G: [/￿(?=<)/dgv, /(?=<)/dgvy]
          },
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            { include: "#declarations-generic-parameter-clause" }
          ]
        },
        { include: "#declarations-typealias-assignment" }
      ]
    },
    "declarations-typealias-assignment": {
      begin: /(=)\p{space}*/dgv,
      beginCaptures: {
        "1": { name: "keyword.operator.assignment.swift" }
      },
      end: {
        G: [/(?!￿)(?=\n?$)|(?=;|\/\/|\/\*|(?=\n?$))/dgv, new EmulatedRegExp("(?!^)(?=\\n?$)|(?=;|//|/\\*|(?=\\n?$))", "dgv", { strategy: "clip_search" })]
      },
      patterns: [
        { include: "#declarations-available-types" }
      ]
    },
    "declarations-typed-variable-declaration": {
      begin: /\b(?:(async)\p{space}+)?(let|var)\b\p{space}+(?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\3)\p{space}*:/dgv,
      beginCaptures: {
        "1": { name: "storage.modifier.async.swift" },
        "2": { name: "keyword.other.declaration-specifier.swift" }
      },
      end: /(?=(?=\n?$)|[\=\{])/dgv,
      patterns: [
        { include: "#declarations-available-types" }
      ]
    },
    "declarations-types-precedencegroup": {
      patterns: [
        {
          match: /\b(?:BitwiseShift|Assignment|RangeFormation|Casting|Addition|NilCoalescing|Comparison|LogicalConjunction|LogicalDisjunction|Default|Ternary|Multiplication|FunctionArrow)Precedence\b/dgv,
          name: "support.type.swift"
        }
      ]
    },
    expressions: {
      patterns: [
        { include: "#expressions-without-trailing-closures-or-member-references" },
        { include: "#expressions-trailing-closure" },
        { include: "#member-reference" }
      ]
    },
    "expressions-trailing-closure": {
      patterns: [
        {
          captures: {
            "1": { name: "support.function.any-method.swift" },
            "2": { name: "punctuation.definition.identifier.swift" },
            "3": { name: "punctuation.definition.identifier.swift" }
          },
          match: /(#?(?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))(?=\p{space}*\{)/dgv,
          name: "meta.function-call.trailing-closure-only.swift"
        },
        {
          captures: {
            "1": { name: "support.function.any-method.trailing-closure-label.swift" },
            "2": { name: "punctuation.definition.identifier.swift" },
            "3": { name: "punctuation.definition.identifier.swift" },
            "4": { name: "punctuation.separator.argument-label.swift" }
          },
          match: /((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))\p{space}*(:)(?=\p{space}*\{)/dgv
        }
      ]
    },
    "expressions-without-trailing-closures": {
      patterns: [
        { include: "#expressions-without-trailing-closures-or-member-references" },
        { include: "#member-references" }
      ]
    },
    "expressions-without-trailing-closures-or-member-references": {
      patterns: [
        { include: "#comments" },
        { include: "#code-block" },
        { include: "#attributes" },
        { include: "#expressions-without-trailing-closures-or-member-references-closure-parameter" },
        { include: "#literals" },
        { include: "#operators" },
        { include: "#builtin-types" },
        { include: "#builtin-functions" },
        { include: "#builtin-global-functions" },
        { include: "#builtin-properties" },
        { include: "#expressions-without-trailing-closures-or-member-references-compound-name" },
        { include: "#conditionals" },
        { include: "#keywords" },
        { include: "#expressions-without-trailing-closures-or-member-references-availability-condition" },
        { include: "#expressions-without-trailing-closures-or-member-references-function-or-macro-call-expression" },
        { include: "#expressions-without-trailing-closures-or-member-references-macro-expansion" },
        { include: "#expressions-without-trailing-closures-or-member-references-subscript-expression" },
        { include: "#expressions-without-trailing-closures-or-member-references-parenthesized-expression" },
        {
          match: /\b_\b/dgv,
          name: "support.variable.discard-value.swift"
        }
      ]
    },
    "expressions-without-trailing-closures-or-member-references-availability-condition": {
      begin: /\B(#(?:un)?available)(\()/dgv,
      beginCaptures: {
        "1": { name: "support.function.availability-condition.swift" },
        "2": { name: "punctuation.definition.arguments.begin.swift" }
      },
      end: /\)/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.swift" }
      },
      patterns: [
        {
          captures: {
            "1": { name: "keyword.other.platform.os.swift" },
            "2": { name: "constant.numeric.swift" }
          },
          match: /\p{space}*\b((?:iOS|macOS|OSX|watchOS|tvOS|visionOS|UIKitForMac)(?:ApplicationExtension)?)\b\p{space}+([0-9]+(?:\.[0-9]+)*)\b/dgv
        },
        {
          captures: {
            "1": { name: "keyword.other.platform.all.swift" },
            "2": { name: "invalid.illegal.character-not-allowed-here.swift" }
          },
          match: /(\*)\p{space}*([^\n]*?)(?=[\)\,])/dgv
        },
        {
          match: /[^\)\,\p{space}]+/dgv,
          name: "invalid.illegal.character-not-allowed-here.swift"
        }
      ]
    },
    "expressions-without-trailing-closures-or-member-references-closure-parameter": {
      match: /\$[0-9]+/dgv,
      name: "variable.language.closure-parameter.swift"
    },
    "expressions-without-trailing-closures-or-member-references-compound-name": {
      captures: {
        "1": { name: "entity.name.function.compound-name.swift" },
        "2": { name: "punctuation.definition.entity.swift" },
        "3": { name: "punctuation.definition.entity.swift" },
        "4": {
          patterns: [
            {
              captures: {
                "1": { name: "punctuation.definition.entity.swift" },
                "2": { name: "punctuation.definition.entity.swift" }
              },
              match: /(?<q>`?)(?!_:)[_\p{L}][_\p{L}\p{N}\p{M}]*(\1):/dgv,
              name: "entity.name.function.compound-name.swift"
            }
          ]
        }
      },
      match: /((?<q1>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))\(((((?<q2>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\7)):)+)\)/dgv
    },
    "expressions-without-trailing-closures-or-member-references-expression-element-list": {
      patterns: [
        { include: "#comments" },
        {
          begin: /((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))\p{space}*(:)/dgv,
          beginCaptures: {
            "1": { name: "support.function.any-method.swift" },
            "2": { name: "punctuation.definition.identifier.swift" },
            "3": { name: "punctuation.definition.identifier.swift" },
            "4": { name: "punctuation.separator.argument-label.swift" }
          },
          end: /(?=[\]\)\,])/dgv,
          patterns: [
            { include: "#expressions" }
          ]
        },
        {
          begin: /(?![\]\)\,])(?=\P{space})/dgv,
          end: /(?=[\]\)\,])/dgv,
          patterns: [
            { include: "#expressions" }
          ]
        }
      ]
    },
    "expressions-without-trailing-closures-or-member-references-function-or-macro-call-expression": {
      patterns: [
        {
          begin: /(#?(?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "support.function.any-method.swift" },
            "2": { name: "punctuation.definition.identifier.swift" },
            "3": { name: "punctuation.definition.identifier.swift" },
            "4": { name: "punctuation.definition.arguments.begin.swift" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.swift" }
          },
          name: "meta.function-call.swift",
          patterns: [
            { include: "#expressions-without-trailing-closures-or-member-references-expression-element-list" }
          ]
        },
        {
          begin: /(?<=[\]\)\>_\`\}\p{L}\p{N}\p{M}])\p{space}*(\()/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.arguments.begin.swift" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.swift" }
          },
          name: "meta.function-call.swift",
          patterns: [
            { include: "#expressions-without-trailing-closures-or-member-references-expression-element-list" }
          ]
        }
      ]
    },
    "expressions-without-trailing-closures-or-member-references-macro-expansion": {
      match: /(#(?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))/dgv,
      name: "support.function.any-method.swift"
    },
    "expressions-without-trailing-closures-or-member-references-parenthesized-expression": {
      begin: /\(/dgv,
      beginCaptures: {
        "0": { name: "punctuation.section.tuple.begin.swift" }
      },
      end: /(\))\p{space}*((?:\b(?:async|throws|rethrows)\p{space})*)/dgv,
      endCaptures: {
        "1": { name: "punctuation.section.tuple.end.swift" },
        "2": {
          patterns: [
            {
              match: /\brethrows\b/dgv,
              name: "invalid.illegal.rethrows-only-allowed-on-function-declarations.swift"
            },
            { include: "#async-throws" }
          ]
        }
      },
      patterns: [
        { include: "#expressions-without-trailing-closures-or-member-references-expression-element-list" }
      ]
    },
    "expressions-without-trailing-closures-or-member-references-subscript-expression": {
      begin: /(?<=[_\`\p{L}\p{N}\p{M}])\p{space}*(\[)/dgv,
      beginCaptures: {
        "1": { name: "punctuation.definition.arguments.begin.swift" }
      },
      end: /\]/dgv,
      endCaptures: {
        "0": { name: "punctuation.definition.arguments.end.swift" }
      },
      name: "meta.subscript-expression.swift",
      patterns: [
        { include: "#expressions-without-trailing-closures-or-member-references-expression-element-list" }
      ]
    },
    keywords: {
      patterns: [
        {
          match: /(?<!\.)\b(?:if|else|guard|where|switch|case|default|fallthrough)\b/dgv,
          name: "keyword.control.branch.swift"
        },
        {
          match: /(?<!\.)\b(?:continue|break|fallthrough|return|yield)\b/dgv,
          name: "keyword.control.transfer.swift"
        },
        {
          match: /(?<!\.)\b(?:while|for|in|each)\b/dgv,
          name: "keyword.control.loop.swift"
        },
        {
          match: /(?<=\p{space})\bof\b(?=\p{space}+[\(\[_\p{L}\p{Nd}\p{N}\p{M}])/dgv,
          name: "keyword.other.inline-array.swift"
        },
        {
          match: /\bany\b(?=\p{space}*`?[_\p{L}])/dgv,
          name: "keyword.other.operator.type.existential.swift"
        },
        {
          captures: {
            "1": { name: "keyword.control.loop.swift" },
            "2": { name: "punctuation.whitespace.trailing.repeat.swift" }
          },
          match: /(?<!\.)\b(repeat)\b(\p{space}*)/dgv
        },
        {
          match: /(?<!\.)\bdefer\b/dgv,
          name: "keyword.control.defer.swift"
        },
        {
          captures: {
            "1": { name: "invalid.illegal.try-must-precede-await.swift" },
            "2": { name: "keyword.control.await.swift" }
          },
          match: /(?<!\.)\b(?:(await\p{space}+try)|(await))\b/dgv
        },
        {
          match: /(?<!\.)\b(?:catch|throw|try)\b|\btry[\!\?]\B/dgv,
          name: "keyword.control.exception.swift"
        },
        {
          match: /(?<!\.)\b(?:|re)throws\b/dgv,
          name: "storage.modifier.exception.swift"
        },
        {
          captures: {
            "1": { name: "keyword.control.exception.swift" },
            "2": { name: "punctuation.whitespace.trailing.do.swift" }
          },
          match: /(?<!\.)\b(do)\b(\p{space}*)/dgv
        },
        {
          captures: {
            "1": { name: "storage.modifier.async.swift" },
            "2": { name: "keyword.other.declaration-specifier.swift" }
          },
          match: /(?<!\.)\b(?:(async)\p{space}+)?(let|var)\b/dgv
        },
        {
          match: /(?<!\.)\b(?:associatedtype|operator|typealias)\b/dgv,
          name: "keyword.other.declaration-specifier.swift"
        },
        {
          match: /(?<!\.)\b(class|enum|extension|precedencegroup|protocol|struct|actor)\b(?=\p{space}*`?[_\p{L}])/dgv,
          name: "storage.type.$1.swift"
        },
        {
          match: /(?<!\.)\b(?:inout|static|final|lazy|mutating|nonmutating|optional|indirect|required|override|dynamic|convenience|infix|prefix|postfix|distributed|borrowing|consuming)\b/dgv,
          name: "storage.modifier.swift"
        },
        {
          match: /(?<!\.)\bnonisolated(?:\(nonsending\)|\b)/dgv,
          name: "storage.modifier.swift"
        },
        {
          match: /\binit[\!\?]|\binit\b|(?<!\.)\b(?:func|deinit|subscript|didSet|set|willSet|yielding\p{space}+borrow|yielding\p{space}+mutate)\b/dgv,
          name: "storage.type.function.swift"
        },
        {
          captures: {
            "1": { name: "storage.type.function.swift" },
            "2": { name: "invalid.illegal.async-must-precede-throws.swift" },
            "3": { name: "storage.modifier.async.swift" },
            "4": { name: "storage.modifier.exception.swift" }
          },
          match: /\b(get)(?:\p{space}+(throws\p{space}+async)|\p{space}+(async)(?:\p{space}+(throws))?)?\b/dgv
        },
        {
          match: /(?<!\.)\b(?:fileprivate|private|internal|public|open|package)\b/dgv,
          name: "keyword.other.declaration-specifier.accessibility.swift"
        },
        {
          match: /(?<!\.)\bunowned\((?:|un)safe\)|(?<!\.)\b(?:weak|unowned)\b/dgv,
          name: "keyword.other.capture-specifier.swift"
        },
        {
          captures: {
            "1": { name: "keyword.other.type.swift" },
            "2": { name: "keyword.other.type.metatype.swift" }
          },
          match: /(?<=\.)(?:(dynamicType|self)|(Protocol|Type))\b/dgv
        },
        {
          match: /(?<!\.)\b(?:super|self|Self)\b/dgv,
          name: "variable.language.swift"
        },
        {
          match: /(?:\B#(?:file|filePath|fileID|line|column|function|dsohandle|isolation)|\b__(?:FILE|LINE|COLUMN|FUNCTION|DSO_HANDLE)__)\b/dgv,
          name: "support.variable.swift"
        },
        {
          match: /(?<!\.)\bimport\b/dgv,
          name: "keyword.control.import.swift"
        },
        {
          match: /(?<!\.)\bconsume(?=\p{space}+`?[_\p{L}])/dgv,
          name: "keyword.control.consume.swift"
        },
        {
          match: /(?<!\.)\bcopy(?=\p{space}+`?[_\p{L}])/dgv,
          name: "keyword.control.copy.swift"
        }
      ]
    },
    literals: {
      patterns: [
        { include: "#literals-boolean" },
        { include: "#literals-numeric" },
        { include: "#literals-string" },
        {
          match: /\bnil\b/dgv,
          name: "constant.language.nil.swift"
        },
        {
          match: /\B#((?:color|image|file)Literal)\b/dgv,
          name: "support.function.object-literal.swift"
        },
        {
          match: /\B#externalMacro\b/dgv,
          name: "support.function.builtin-macro.swift"
        },
        {
          match: /\B#keyPath\b/dgv,
          name: "support.function.key-path.swift"
        },
        {
          begin: /\B(#selector)(\()(?:\p{space}*([gs]etter)\p{space}*(:))?/dgv,
          beginCaptures: {
            "1": { name: "support.function.selector-reference.swift" },
            "2": { name: "punctuation.definition.arguments.begin.swift" },
            "3": { name: "support.variable.parameter.swift" },
            "4": { name: "punctuation.separator.argument-label.swift" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.arguments.end.swift" }
          },
          patterns: [
            { include: "#expressions" }
          ]
        },
        { include: "#literals-regular-expression-literal" }
      ]
    },
    "literals-boolean": {
      match: /\b(true|false)\b/dgv,
      name: "constant.language.boolean.swift"
    },
    "literals-numeric": {
      patterns: [
        {
          match: /(\B-|\b)(?<![\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)[0-9][0-9_]*(?=\.[0-9]|[Ee])(?:\.[0-9][0-9_]*)?(?:[Ee][\-\+]?[0-9][0-9_]*)?\b(?!\.[0-9])/dgv,
          name: "constant.numeric.float.decimal.swift"
        },
        {
          match: /(\B-|\b)(?<![\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)(0x\p{AHex}[_\p{AHex}]*)(?:\.\p{AHex}[_\p{AHex}]*)?[Pp][\-\+]?[0-9][0-9_]*\b(?!\.[0-9])/dgv,
          name: "constant.numeric.float.hexadecimal.swift"
        },
        {
          match: /(\B-|\b)(?<![\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)(0x\p{AHex}[_\p{AHex}]*)(?:\.\p{AHex}[_\p{AHex}]*)?[Pp][\-\+]?[\p{L}\p{M}\p{N}\p{Pc}]*\b(?!\.[0-9])/dgv,
          name: "invalid.illegal.numeric.float.invalid-exponent.swift"
        },
        {
          match: /(\B-|\b)(?<![\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)(0x\p{AHex}[_\p{AHex}]*)\.[0-9][\.\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "invalid.illegal.numeric.float.missing-exponent.swift"
        },
        {
          match: /(?<=\p{space}|^)-?\.[0-9][\.\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "invalid.illegal.numeric.float.missing-leading-zero.swift"
        },
        {
          match: /(\B-|\b)0[box]_[_\p{AHex}]*(?:[EPep][\-\+]?[\p{L}\p{M}\p{N}\p{Pc}]+)?[\.\p{L}\p{M}\p{N}\p{Pc}]+/dgv,
          name: "invalid.illegal.numeric.leading-underscore.swift"
        },
        {
          match: /(?<=[\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)[0-9]+\b/dgv
        },
        {
          match: /(\B-|\b)(?<![\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)0b[01][01_]*\b(?!\.[0-9])/dgv,
          name: "constant.numeric.integer.binary.swift"
        },
        {
          match: /(\B-|\b)(?<![\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)0o[0-7][0-7_]*\b(?!\.[0-9])/dgv,
          name: "constant.numeric.integer.octal.swift"
        },
        {
          match: /(\B-|\b)(?<![\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)[0-9][0-9_]*\b(?!\.[0-9])/dgv,
          name: "constant.numeric.integer.decimal.swift"
        },
        {
          match: /(\B-|\b)(?<![\]\(\)\[_\{\}\p{L}\p{N}\p{M}]\.)0x\p{AHex}[_\p{AHex}]*\b(?!\.[0-9])/dgv,
          name: "constant.numeric.integer.hexadecimal.swift"
        },
        {
          match: /(\B-|\b)[0-9][\.\p{L}\p{M}\p{N}\p{Pc}]*/dgv,
          name: "invalid.illegal.numeric.other.swift"
        }
      ]
    },
    "literals-regular-expression-literal": {
      patterns: [
        {
          begin: /(#+)\/\n/dgv,
          end: /\/1/dgv,
          name: "string.regexp.block.swift",
          patterns: [
            { include: "#literals-regular-expression-literal-regex-guts" },
            { include: "#literals-regular-expression-literal-line-comment" }
          ]
        },
        {
          captures: {
            "0": {
              patterns: [
                { include: "#literals-regular-expression-literal-regex-guts" }
              ]
            },
            "1": { name: "punctuation.definition.string.begin.regexp.swift" },
            "3": { name: "punctuation.definition.string.end.regexp.swift" }
          },
          match: new EmulatedRegExp("(/)(?!\\p{space})(?!/)(?:\\\\\\p{space}(?=/)|(?:(?=((?<guts>(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/)[^\\n])*))\\5)(?:\\\\E|(?=/))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\6)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/)[^\\n])*))\\9)(?:\\\\E|(?=/))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\10)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/)[^\\n])*))\\13)(?:\\\\E|(?=/))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\14)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/)[^\\n])*))\\17)(?:\\\\E|(?=/))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\18)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/)[^\\n])*))\\21)(?:\\\\E|(?=/))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\22)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:)?))\\23)\\)|(?:(?!/)[^\\(\\)\\[\\\\])+)+))\\20))?))\\19)\\)|(?:(?!/)[^\\(\\)\\[\\\\])+)+))\\16))?))\\15)\\)|(?:(?!/)[^\\(\\)\\[\\\\])+)+))\\12))?))\\11)\\)|(?:(?!/)[^\\(\\)\\[\\\\])+)+))\\8))?))\\7)\\)|(?:(?!/)[^\\(\\)\\[\\\\])+)+))\\4))?))\\2)(?<!\\p{space}))(/)", "dgv", { hiddenCaptures: [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] }),
          name: "string.regexp.line.swift"
        },
        {
          captures: {
            "0": {
              patterns: [
                { include: "#literals-regular-expression-literal-regex-guts" }
              ]
            },
            "1": { name: "punctuation.definition.string.begin.regexp.swift" },
            "4": { name: "punctuation.definition.string.end.regexp.swift" },
            "5": { name: "invalid.illegal.returns-not-allowed.regexp" }
          },
          match: new EmulatedRegExp("((#+)/)(?:(?=((?<guts>(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/\\2)[^\\n])*))\\6)(?:\\\\E|(?=/\\2))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\7)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/\\2)[^\\n])*))\\10)(?:\\\\E|(?=/\\2))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\11)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/\\2)[^\\n])*))\\14)(?:\\\\E|(?=/\\2))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\15)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/\\2)[^\\n])*))\\18)(?:\\\\E|(?=/\\2))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\19)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:(?:(?=((?:\\\\Q(?:(?=((?:(?!\\\\E)(?!/\\2)[^\\n])*))\\22)(?:\\\\E|(?=/\\2))|\\\\[^\\n]|\\(\\?#[^\\)]*\\)|\\(\\?(?:(?=(\\{(?:[^\\{][^\\n]*?|\\{[^\\{][^\\n]*?\\}|\\{\\{[^\\{][^\\n]*?\\}\\}|\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}|\\{\\{\\{\\{[^\\{][^\\n]*?\\}\\}\\}\\}|\\{\\{\\{\\{\\{[^\\n]+?\\}\\}\\}\\}\\})\\}))\\23)(?:\\[(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+\\])?[\\<\\>X]?\\)|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\]|\\[(?:\\\\[^\\n]|[^\\]\\[\\\\])+\\])+\\])+\\])+\\]|\\((?:(?=((?:)?))\\24)\\)|(?:(?!/\\2)[^\\(\\)\\[\\\\])+)+))\\21))?))\\20)\\)|(?:(?!/\\2)[^\\(\\)\\[\\\\])+)+))\\17))?))\\16)\\)|(?:(?!/\\2)[^\\(\\)\\[\\\\])+)+))\\13))?))\\12)\\)|(?:(?!/\\2)[^\\(\\)\\[\\\\])+)+))\\9))?))\\8)\\)|(?:(?!/\\2)[^\\(\\)\\[\\\\])+)+))\\5))?))\\3)(/\\2)|#+/[^\\n]+(\\n)", "dgv", { hiddenCaptures: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }),
          name: "string.regexp.line.extended.swift"
        }
      ]
    },
    "literals-regular-expression-literal-backreference-or-subpattern": {
      patterns: [
        {
          captures: {
            "1": { name: "constant.character.escape.backslash.regexp" },
            "2": { name: "variable.other.group-name.regexp" },
            "3": { name: "keyword.operator.recursion-level.regexp" },
            "4": { name: "constant.numeric.integer.decimal.regexp" },
            "5": { name: "constant.numeric.integer.decimal.regexp" },
            "6": { name: "keyword.operator.recursion-level.regexp" },
            "7": { name: "constant.numeric.integer.decimal.regexp" },
            "8": { name: "constant.character.escape.backslash.regexp" }
          },
          match: /(\\g\{)(?:((?!\p{Nd})[\p{L}\p{M}\p{N}\p{Pc}]+)(?:([\-\+])(\p{Nd}+))?|([\-\+]?\p{Nd}+)(?:([\-\+])(\p{Nd}+))?)(\})/dgv
        },
        {
          captures: {
            "1": { name: "constant.character.escape.backslash.regexp" },
            "2": { name: "constant.numeric.integer.decimal.regexp" },
            "3": { name: "keyword.operator.recursion-level.regexp" },
            "4": { name: "constant.numeric.integer.decimal.regexp" }
          },
          match: /(\\g)([\-\+]?\p{Nd}+)(?:([\-\+])(\p{Nd}+))?/dgv
        },
        {
          captures: {
            "1": { name: "constant.character.escape.backslash.regexp" },
            "2": { name: "variable.other.group-name.regexp" },
            "3": { name: "keyword.operator.recursion-level.regexp" },
            "4": { name: "constant.numeric.integer.decimal.regexp" },
            "5": { name: "constant.numeric.integer.decimal.regexp" },
            "6": { name: "keyword.operator.recursion-level.regexp" },
            "7": { name: "constant.numeric.integer.decimal.regexp" },
            "8": { name: "constant.character.escape.backslash.regexp" }
          },
          match: /(\\[gk]<)(?:((?!\p{Nd})[\p{L}\p{M}\p{N}\p{Pc}]+)(?:([\-\+])(\p{Nd}+))?|([\-\+]?\p{Nd}+)(?:([\-\+])(\p{Nd}+))?)(>)/dgv
        },
        {
          captures: {
            "1": { name: "constant.character.escape.backslash.regexp" },
            "2": { name: "variable.other.group-name.regexp" },
            "3": { name: "keyword.operator.recursion-level.regexp" },
            "4": { name: "constant.numeric.integer.decimal.regexp" },
            "5": { name: "constant.numeric.integer.decimal.regexp" },
            "6": { name: "keyword.operator.recursion-level.regexp" },
            "7": { name: "constant.numeric.integer.decimal.regexp" },
            "8": { name: "constant.character.escape.backslash.regexp" }
          },
          match: /(\\[gk]')(?:((?!\p{Nd})[\p{L}\p{M}\p{N}\p{Pc}]+)(?:([\-\+])(\p{Nd}+))?|([\-\+]?\p{Nd}+)(?:([\-\+])(\p{Nd}+))?)(')/dgv
        },
        {
          captures: {
            "1": { name: "constant.character.escape.backslash.regexp" },
            "2": { name: "variable.other.group-name.regexp" },
            "3": { name: "keyword.operator.recursion-level.regexp" },
            "4": { name: "constant.numeric.integer.decimal.regexp" },
            "5": { name: "constant.character.escape.backslash.regexp" }
          },
          match: /(\\k\{)((?!\p{Nd})[\p{L}\p{M}\p{N}\p{Pc}]+)(?:([\-\+])(\p{Nd}+))?(\})/dgv
        },
        {
          match: /\\[1-9][0-9]+/dgv,
          name: "keyword.other.back-reference.regexp"
        },
        {
          captures: {
            "1": { name: "keyword.other.back-reference.regexp" },
            "2": { name: "variable.other.group-name.regexp" },
            "3": { name: "keyword.operator.recursion-level.regexp" },
            "4": { name: "constant.numeric.integer.decimal.regexp" },
            "5": { name: "keyword.other.back-reference.regexp" }
          },
          match: /(\(\?(?:P[\=\>]|&))((?!\p{Nd})[\p{L}\p{M}\p{N}\p{Pc}]+)(?:([\-\+])(\p{Nd}+))?(\))/dgv
        },
        {
          match: /\(\?R\)/dgv,
          name: "keyword.other.back-reference.regexp"
        },
        {
          captures: {
            "1": { name: "keyword.other.back-reference.regexp" },
            "2": { name: "constant.numeric.integer.decimal.regexp" },
            "3": { name: "keyword.operator.recursion-level.regexp" },
            "4": { name: "constant.numeric.integer.decimal.regexp" },
            "5": { name: "keyword.other.back-reference.regexp" }
          },
          match: /(\(\?)([\-\+]?\p{Nd}+)(?:([\-\+])(\p{Nd}+))?(\))/dgv
        }
      ]
    },
    "literals-regular-expression-literal-backtracking-directive-or-global-matching-option": {
      captures: {
        "1": { name: "keyword.control.directive.regexp" },
        "2": { name: "keyword.control.directive.regexp" },
        "3": { name: "keyword.control.directive.regexp" },
        "4": { name: "variable.language.tag.regexp" },
        "5": { name: "keyword.control.directive.regexp" },
        "6": { name: "keyword.operator.assignment.regexp" },
        "7": { name: "constant.numeric.integer.decimal.regexp" },
        "8": { name: "keyword.control.directive.regexp" },
        "9": { name: "keyword.control.directive.regexp" }
      },
      match: /(\(\*)(?:(ACCEPT|FAIL|F|MARK(?=:)|(?=:)|COMMIT|PRUNE|SKIP|THEN)(?:(:)([^\)]+))?|(LIMIT_(?:DEPTH|HEAP|MATCH))(=)(\p{Nd}+)|(CRLF|CR|ANYCRLF|ANY|LF|NUL|BSR_ANYCRLF|BSR_UNICODE|NOTEMPTY_ATSTART|NOTEMPTY|NO_AUTO_POSSESS|NO_DOTSTAR_ANCHOR|NO_JIT|NO_START_OPT|UTF|UCP))(\))/dgv
    },
    "literals-regular-expression-literal-callout": {
      captures: {
        "1": { name: "punctuation.definition.group.regexp" },
        "2": { name: "keyword.control.callout.regexp" },
        "3": { name: "constant.numeric.integer.decimal.regexp" },
        "4": { name: "entity.name.function.callout.regexp" },
        "5": { name: "entity.name.function.callout.regexp" },
        "6": { name: "entity.name.function.callout.regexp" },
        "7": { name: "entity.name.function.callout.regexp" },
        "8": { name: "entity.name.function.callout.regexp" },
        "9": { name: "entity.name.function.callout.regexp" },
        "10": { name: "entity.name.function.callout.regexp" },
        "11": { name: "entity.name.function.callout.regexp" },
        "12": { name: "punctuation.definition.group.regexp" },
        "13": { name: "punctuation.definition.group.regexp" },
        "14": { name: "keyword.control.callout.regexp" },
        "15": { name: "entity.name.function.callout.regexp" },
        "16": { name: "variable.language.tag-name.regexp" },
        "17": { name: "punctuation.definition.group.regexp" },
        "18": { name: "punctuation.definition.group.regexp" },
        "19": { name: "keyword.control.callout.regexp" },
        "21": { name: "variable.language.tag-name.regexp" },
        "22": { name: "keyword.control.callout.regexp" },
        "23": { name: "punctuation.definition.group.regexp" }
      },
      match: new EmulatedRegExp("(\\()(?<keyw>\\?C)(?:(?<num>\\p{Nd}+)|`(?<name>(?:[^\\`]|``)*)`|'((?:[^']|'')*)'|\"((?:[^\"]|\"\")*)\"|\\^((?:[^\\^]|\\^\\^)*)\\^|%((?:[^\\%]|%%)*)%|#((?:[^\\#]|##)*)#|\\$((?:[^\\$]|\\$\\$)*)\\$|\\{((?:[^\\}]|\\}\\})*)\\})?(\\))|(\\()(\\*)((?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)(?:\\[(?<tag>(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)\\])?(?:\\{[^\\,\\}]+(?:,[^\\,\\}]+)*\\})?(\\))|(\\()(\\?)(?:(?=((\\{(?:(?:\\{(?:(?:\\{(?:(?:\\{(?:(?:\\{(?:(?:)|(?!\\{)[^\\n]*?)\\})|(?!\\{)[^\\n]*?)\\})|(?!\\{)[^\\n]*?)\\})|(?!\\{)[^\\n]*?)\\})|(?!\\{)[^\\n]*?)\\})))\\20)(?:\\[((?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)\\])?([\\<\\>X]?)(\\))", "dgv", { hiddenCaptures: [20] }),
      name: "meta.callout.regexp"
    },
    "literals-regular-expression-literal-character-properties": {
      captures: {
        "1": { name: "support.variable.character-property.regexp" },
        "2": { name: "punctuation.definition.character-class.regexp" },
        "3": { name: "support.variable.character-property.regexp" },
        "4": { name: "punctuation.definition.character-class.regexp" }
      },
      match: /\\[Pp]\{([\-\p{space}\p{L}\p{M}\p{N}\p{Pc}]+(?:=[\-\p{space}\p{L}\p{M}\p{N}\p{Pc}]+)?)\}|(\[:)([\-\p{space}\p{L}\p{M}\p{N}\p{Pc}]+(?:=[\-\p{space}\p{L}\p{M}\p{N}\p{Pc}]+)?)(:\])/dgv,
      name: "constant.other.character-class.set.regexp"
    },
    "literals-regular-expression-literal-custom-char-class": {
      patterns: [
        {
          begin: /(\[)(\^)?/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.character-class.regexp" },
            "2": { name: "keyword.operator.negation.regexp" }
          },
          end: /\]/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.character-class.regexp" }
          },
          name: "constant.other.character-class.set.regexp",
          patterns: [
            { include: "#literals-regular-expression-literal-custom-char-class-members" }
          ]
        }
      ]
    },
    "literals-regular-expression-literal-custom-char-class-members": {
      patterns: [
        {
          match: /\\b/dgv,
          name: "constant.character.escape.backslash.regexp"
        },
        { include: "#literals-regular-expression-literal-custom-char-class" },
        { include: "#literals-regular-expression-literal-quote" },
        { include: "#literals-regular-expression-literal-set-operators" },
        { include: "#literals-regular-expression-literal-unicode-scalars" },
        { include: "#literals-regular-expression-literal-character-properties" }
      ]
    },
    "literals-regular-expression-literal-group-option-toggle": {
      match: /\(\?(?:\^(?:[DJPSUWimnswx]|xx|y\{[gw]\})*|(?:[DJPSUWimnswx]|xx|y\{[gw]\})+|(?:[DJPSUWimnswx]|xx|y\{[gw]\})*-(?:[DJPSUWimnswx]|xx|y\{[gw]\})*)\)/dgv,
      name: "keyword.other.option-toggle.regexp"
    },
    "literals-regular-expression-literal-group-or-conditional": {
      patterns: [
        {
          begin: /(\()(\?~)/dgv,
          beginCaptures: {
            "1": { name: "punctuation.definition.group.regexp" },
            "2": { name: "keyword.control.conditional.absent.regexp" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.absent.regexp",
          patterns: [
            { include: "#literals-regular-expression-literal-regex-guts" }
          ]
        },
        {
          begin: new EmulatedRegExp("(\\()(?<cond>\\?\\()(?:(?<NumberRef>(?<num>[\\-\\+]?\\p{Nd}+)(?:(?<op>[\\-\\+])(\\p{Nd}+))?)|(R)(([\\-\\+]?\\p{Nd}+)(?:([\\-\\+])(\\p{Nd}+))?)?|(R&)(?<NamedRef>(?<name>(?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)(?:([\\-\\+])(\\p{Nd}+))?)|(<)(?:(((?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)(?:([\\-\\+])(\\p{Nd}+))?)|(([\\-\\+]?\\p{Nd}+)(?:([\\-\\+])(\\p{Nd}+))?))(>)|(')(?:(((?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)(?:([\\-\\+])(\\p{Nd}+))?)|(([\\-\\+]?\\p{Nd}+)(?:([\\-\\+])(\\p{Nd}+))?))(')|(DEFINE)|(VERSION)(?<compar>>?=)(\\p{Nd}+\\.\\p{Nd}+))(\\))|(\\()(\\?)(?=\\()", "dgv", { hiddenCaptures: [8, 9, 10, 11, 18, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 34, 35], transfers: [[3, [8, 22, 32]], [4, [9, 23, 33]], [5, [10, 24, 34]], [6, [11, 25, 35]], [13, [18, 28]], [14, [19, 29]], [15, [20, 30]], [16, [21, 31]]] }),
          beginCaptures: {
            "1": { name: "punctuation.definition.group.regexp" },
            "2": { name: "keyword.control.conditional.regexp" },
            "4": { name: "constant.numeric.integer.decimal.regexp" },
            "5": { name: "keyword.operator.recursion-level.regexp" },
            "6": { name: "constant.numeric.integer.decimal.regexp" },
            "7": { name: "keyword.control.conditional.regexp" },
            "8": { name: "keyword.control.conditional.regexp" },
            "10": { name: "variable.other.group-name.regexp" },
            "11": { name: "keyword.operator.recursion-level.regexp" },
            "12": { name: "constant.numeric.integer.decimal.regexp" },
            "13": { name: "keyword.control.conditional.regexp" },
            "14": { name: "keyword.control.conditional.regexp" },
            "15": { name: "keyword.control.conditional.regexp" },
            "16": { name: "keyword.control.conditional.regexp" },
            "17": { name: "keyword.control.conditional.regexp" },
            "18": { name: "keyword.control.conditional.regexp" },
            "19": { name: "keyword.operator.comparison.regexp" },
            "20": { name: "constant.numeric.integer.decimal.regexp" },
            "21": { name: "keyword.control.conditional.regexp" },
            "22": { name: "punctuation.definition.group.regexp" },
            "23": { name: "keyword.control.conditional.regexp" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.conditional.regexp",
          patterns: [
            { include: "#literals-regular-expression-literal-regex-guts" }
          ]
        },
        {
          begin: new EmulatedRegExp("(\\()(?:(?=(((\\?)(?:([\\!\\*\\:\\=\\>\\|]|<[\\!\\*\\=])|P?<(?:((?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)(-))?((?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)>|'(?:((?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)(-))?((?!\\p{Nd})[\\p{L}\\p{M}\\p{N}\\p{Pc}]+)'|(?:\\^(?:[DJPSUWimnswx]|xx|y\\{[gw]\\})*|(?:[DJPSUWimnswx]|xx|y\\{[gw]\\})+|(?:[DJPSUWimnswx]|xx|y\\{[gw]\\})*-(?:[DJPSUWimnswx]|xx|y\\{[gw]\\})*):)|\\*(atomic|pla|positive_lookahead|nla|negative_lookahead|plb|positive_lookbehind|nlb|negative_lookbehind|napla|non_atomic_positive_lookahead|naplb|non_atomic_positive_lookbehind|sr|script_run|asr|atomic_script_run):)?))\\2)", "dgv", { hiddenCaptures: [2] }),
          beginCaptures: {
            "1": { name: "punctuation.definition.group.regexp" },
            "2": { name: "keyword.other.group-options.regexp" },
            "3": { name: "punctuation.definition.group.regexp" },
            "4": { name: "punctuation.definition.group.regexp" },
            "5": { name: "variable.other.group-name.regexp" },
            "6": { name: "keyword.operator.balancing-group.regexp" },
            "7": { name: "variable.other.group-name.regexp" },
            "8": { name: "variable.other.group-name.regexp" },
            "9": { name: "keyword.operator.balancing-group.regexp" },
            "10": { name: "variable.other.group-name.regexp" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.group.regexp" }
          },
          name: "meta.group.regexp",
          patterns: [
            { include: "#literals-regular-expression-literal-regex-guts" }
          ]
        }
      ]
    },
    "literals-regular-expression-literal-line-comment": {
      captures: {
        "1": { name: "punctuation.definition.comment.regexp" }
      },
      match: /(#)[^\n]*(?=\n?$)/dgv,
      name: "comment.line.regexp"
    },
    "literals-regular-expression-literal-quote": {
      begin: /\\Q/dgv,
      beginCaptures: {
        "0": { name: "constant.character.escape.backslash.regexp" }
      },
      end: /\\E|(\n)/dgv,
      endCaptures: {
        "0": { name: "constant.character.escape.backslash.regexp" },
        "1": { name: "invalid.illegal.returns-not-allowed.regexp" }
      },
      name: "string.quoted.other.regexp.swift"
    },
    "literals-regular-expression-literal-regex-guts": {
      patterns: [
        { include: "#literals-regular-expression-literal-quote" },
        {
          begin: /\(\?#/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.begin.regexp" }
          },
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.comment.end.regexp" }
          },
          name: "comment.block.regexp"
        },
        {
          begin: /<\{/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.regexp" }
          },
          end: /\}>/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.regexp" }
          },
          name: "meta.embedded.expression.regexp"
        },
        { include: "#literals-regular-expression-literal-unicode-scalars" },
        { include: "#literals-regular-expression-literal-character-properties" },
        {
          match: /[\$\^]|\\[ABGYZbyz]|\\K/dgv,
          name: "keyword.control.anchor.regexp"
        },
        { include: "#literals-regular-expression-literal-backtracking-directive-or-global-matching-option" },
        { include: "#literals-regular-expression-literal-callout" },
        { include: "#literals-regular-expression-literal-backreference-or-subpattern" },
        {
          match: /\.|\\[CDHNORSVWXdhsvw]/dgv,
          name: "constant.character.character-class.regexp"
        },
        {
          match: /\\c[^\n]/dgv,
          name: "constant.character.entity.control-character.regexp"
        },
        {
          match: /\\[^c]/dgv,
          name: "constant.character.escape.backslash.regexp"
        },
        {
          match: /\|/dgv,
          name: "keyword.operator.or.regexp"
        },
        {
          match: /[\*\+\?]/dgv,
          name: "keyword.operator.quantifier.regexp"
        },
        {
          match: /\{(?:\p{space}*\p{Nd}+\p{space}*(?:,\p{space}*\p{Nd}*\p{space}*)?\}|\p{space}*,\p{space}*\p{Nd}+\p{space}*\})/dgv,
          name: "keyword.operator.quantifier.regexp"
        },
        { include: "#literals-regular-expression-literal-custom-char-class" },
        { include: "#literals-regular-expression-literal-group-option-toggle" },
        { include: "#literals-regular-expression-literal-group-or-conditional" }
      ]
    },
    "literals-regular-expression-literal-set-operators": {
      patterns: [
        {
          match: /&&/dgv,
          name: "keyword.operator.intersection.regexp.swift"
        },
        {
          match: /--/dgv,
          name: "keyword.operator.subtraction.regexp.swift"
        },
        {
          match: /~~/dgv,
          name: "keyword.operator.symmetric-difference.regexp.swift"
        }
      ]
    },
    "literals-regular-expression-literal-unicode-scalars": {
      match: /\\(?:u\{\p{space}*(?:\p{AHex}+\p{space}*)+\}|u\p{AHex}{4}|x\{\p{AHex}+\}|x\p{AHex}{0,2}|U\p{AHex}{8}|o\{[0-7]+\}|0[0-7]{0,3}|N\{(?:U\+\p{AHex}{1,8}|[\-\p{space}\p{L}\p{M}\p{N}\p{Pc}]+)\})/dgv,
      name: "constant.character.numeric.regexp"
    },
    "literals-string": {
      patterns: [
        {
          begin: /"""/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.swift" }
          },
          end: /"""(#*)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.swift" },
            "1": { name: "invalid.illegal.extra-closing-delimiter.swift" }
          },
          name: "string.quoted.double.block.swift",
          patterns: [
            {
              match: {
                G: [/￿(?:[^\n]+(?=""")|[^\n]+)/dgv, /(?:[^\n]+(?=""")|[^\n]+)/dgvy]
              },
              name: "invalid.illegal.content-after-opening-delimiter.swift"
            },
            {
              match: /\\\p{space}*\n/dgv,
              name: "constant.character.escape.newline.swift"
            },
            { include: "#literals-string-string-guts" },
            {
              match: /\P{space}((?!\\\()[^\n])*(?=""")/dgv,
              name: "invalid.illegal.content-before-closing-delimiter.swift"
            }
          ]
        },
        {
          begin: /#"""(?!#)(?=(?:[^"]|"(?!#))*(?=\n?$))/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.swift" }
          },
          end: /"""#(#*)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.swift" },
            "1": { name: "invalid.illegal.extra-closing-delimiter.swift" }
          },
          name: "string.quoted.double.block.raw.swift",
          patterns: [
            {
              match: {
                G: [/￿(?:[^\n]+(?=""")|[^\n]+)/dgv, /(?:[^\n]+(?=""")|[^\n]+)/dgvy]
              },
              name: "invalid.illegal.content-after-opening-delimiter.swift"
            },
            {
              match: /\\#\p{space}*\n/dgv,
              name: "constant.character.escape.newline.swift"
            },
            { include: "#literals-string-raw-string-guts" },
            {
              match: /\P{space}((?!\\#\()[^\n])*(?=""")/dgv,
              name: "invalid.illegal.content-before-closing-delimiter.swift"
            }
          ]
        },
        {
          begin: /(?<!#)(##+)"""(?!\1)(?=(?:[^"]|"(?!\1))*(?=\n?$))/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.swift" }
          },
          end: /"""1(#*)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.swift" },
            "1": { name: "invalid.illegal.extra-closing-delimiter.swift" }
          },
          name: "string.quoted.double.block.raw.swift",
          patterns: [
            {
              match: {
                G: [/￿(?:[^\n]+(?=""")|[^\n]+)/dgv, /(?:[^\n]+(?=""")|[^\n]+)/dgvy]
              },
              name: "invalid.illegal.content-after-opening-delimiter.swift"
            }
          ]
        },
        {
          begin: /"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.swift" }
          },
          end: /"(#*)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.swift" },
            "1": { name: "invalid.illegal.extra-closing-delimiter.swift" }
          },
          name: "string.quoted.double.single-line.swift",
          patterns: [
            {
              match: /[\n\r]/dgv,
              name: "invalid.illegal.returns-not-allowed.swift"
            },
            { include: "#literals-string-string-guts" }
          ]
        },
        {
          begin: /(?<!#)(##+)"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.raw.swift" }
          },
          end: /"1(#*)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.raw.swift" },
            "1": { name: "invalid.illegal.extra-closing-delimiter.swift" }
          },
          name: "string.quoted.double.single-line.raw.swift",
          patterns: [
            {
              match: /[\n\r]/dgv,
              name: "invalid.illegal.returns-not-allowed.swift"
            }
          ]
        },
        {
          begin: /#"/dgv,
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.raw.swift" }
          },
          end: /"#(#*)/dgv,
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.raw.swift" },
            "1": { name: "invalid.illegal.extra-closing-delimiter.swift" }
          },
          name: "string.quoted.double.single-line.raw.swift",
          patterns: [
            {
              match: /[\n\r]/dgv,
              name: "invalid.illegal.returns-not-allowed.swift"
            },
            { include: "#literals-string-raw-string-guts" }
          ]
        }
      ]
    },
    "literals-string-raw-string-guts": {
      patterns: [
        {
          match: /\\#["'0\\nrt]/dgv,
          name: "constant.character.escape.swift"
        },
        {
          match: /\\#u\{\p{AHex}{1,8}\}/dgv,
          name: "constant.character.escape.unicode.swift"
        },
        {
          begin: /\\#\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.swift" }
          },
          contentName: "source.swift",
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.swift" }
          },
          name: "meta.embedded.line.swift",
          patterns: [
            { include: "$self" },
            {
              begin: /\(/dgv,
              end: /\)/dgv
            }
          ]
        },
        {
          match: /\\#[^\n]/dgv,
          name: "invalid.illegal.escape-not-recognized"
        }
      ]
    },
    "literals-string-string-guts": {
      patterns: [
        {
          match: /\\["'0\\nrt]/dgv,
          name: "constant.character.escape.swift"
        },
        {
          match: /\\u\{\p{AHex}{1,8}\}/dgv,
          name: "constant.character.escape.unicode.swift"
        },
        {
          begin: /\\\(/dgv,
          beginCaptures: {
            "0": { name: "punctuation.section.embedded.begin.swift" }
          },
          contentName: "source.swift",
          end: /\)/dgv,
          endCaptures: {
            "0": { name: "punctuation.section.embedded.end.swift" }
          },
          name: "meta.embedded.line.swift",
          patterns: [
            { include: "$self" },
            {
              begin: /\(/dgv,
              end: /\)/dgv
            }
          ]
        },
        {
          match: /\\[^\n]/dgv,
          name: "invalid.illegal.escape-not-recognized"
        }
      ]
    },
    "member-reference": {
      patterns: [
        {
          captures: {
            "1": { name: "variable.other.swift" },
            "2": { name: "punctuation.definition.identifier.swift" },
            "3": { name: "punctuation.definition.identifier.swift" }
          },
          match: /(?<=\.)((?<q>`?)[_\p{L}][_\p{L}\p{N}\p{M}]*(\2))/dgv
        }
      ]
    },
    operators: {
      patterns: [
        {
          match: /\b(is\b|as([\!\?]\B|\b))/dgv,
          name: "keyword.operator.type-casting.swift"
        },
        {
          begin: new EmulatedRegExp("(?=(?<oph>[\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|\\.(([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷‖‗†-‧‰-‾⁁-⁓⁕-⁞←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰])|[\\.̀-ͯ᷀-᷿⃐-⃿︀-️︠-︯\\u{E0100}-\\u{E01EF}]))", "dgv", { hiddenCaptures: [3], transfers: [[1, [3]]] }),
          end: {
            G: [/(?!￿)/dgv, new EmulatedRegExp("(?!^)", "dgv", { strategy: "clip_search" })]
          },
          patterns: [
            {
              captures: {
                "0": {
                  patterns: [
                    {
                      match: {
                        G: [/￿(\+\+|--)(?=\n?$)/dgv, /(\+\+|--)(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.increment-or-decrement.swift"
                    },
                    {
                      match: {
                        G: [/￿([\-\+])(?=\n?$)/dgv, /([\-\+])(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.arithmetic.unary.swift"
                    },
                    {
                      match: {
                        G: [/￿!(?=\n?$)/dgv, /!(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.logical.not.swift"
                    },
                    {
                      match: {
                        G: [/￿~(?=\n?$)/dgv, /~(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.bitwise.not.swift"
                    },
                    {
                      match: /[^\n]+/dgv,
                      name: "keyword.operator.custom.prefix.swift"
                    }
                  ]
                }
              },
              match: {
                G: [new EmulatedRegExp("￿(?<=^|[\\(\\,\\:\\;\\[\\{\\p{space}])(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)(?![\\]\\)\\,\\:\\;\\}\\p{space}]|$)", "dgv", { hiddenCaptures: [1] }), new EmulatedRegExp("(?<=^|[\\(\\,\\:\\;\\[\\{\\p{space}])(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)(?![\\]\\)\\,\\:\\;\\}\\p{space}]|$)", "dgvy", { hiddenCaptures: [1] })]
              }
            },
            {
              captures: {
                "0": {
                  patterns: [
                    {
                      match: {
                        G: [/￿(\+\+|--)(?=\n?$)/dgv, /(\+\+|--)(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.increment-or-decrement.swift"
                    },
                    {
                      match: {
                        G: [/￿!(?=\n?$)/dgv, /!(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.increment-or-decrement.swift"
                    },
                    {
                      match: /[^\n]+/dgv,
                      name: "keyword.operator.custom.postfix.swift"
                    }
                  ]
                }
              },
              match: {
                G: [new EmulatedRegExp("￿(?<!^|[\\(\\,\\:\\;\\[\\{\\p{space}])(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)(?=[\\]\\)\\,\\:\\;\\}\\p{space}]|$)", "dgv", { hiddenCaptures: [1] }), new EmulatedRegExp("(?<!^|[\\(\\,\\:\\;\\[\\{\\p{space}])(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)(?=[\\]\\)\\,\\:\\;\\}\\p{space}]|$)", "dgvy", { hiddenCaptures: [1] })]
              }
            },
            {
              captures: {
                "0": {
                  patterns: [
                    {
                      match: {
                        G: [/￿=(?=\n?$)/dgv, /=(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.assignment.swift"
                    },
                    {
                      match: {
                        G: [/￿([\-\%\*\+\/]|<<|>>|[\&\^\|]|&&|\|\|)=(?=\n?$)/dgv, /([\-\%\*\+\/]|<<|>>|[\&\^\|]|&&|\|\|)=(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.assignment.compound.swift"
                    },
                    {
                      match: {
                        G: [/￿([\-\*\+\/])(?=\n?$)/dgv, /([\-\*\+\/])(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.arithmetic.swift"
                    },
                    {
                      match: {
                        G: [/￿&([\-\*\+])(?=\n?$)/dgv, /&([\-\*\+])(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.arithmetic.overflow.swift"
                    },
                    {
                      match: {
                        G: [/￿%(?=\n?$)/dgv, /%(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.arithmetic.remainder.swift"
                    },
                    {
                      match: {
                        G: [/￿(==|!=|[\<\>]|>=|<=|~=)(?=\n?$)/dgv, /(==|!=|[\<\>]|>=|<=|~=)(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.comparison.swift"
                    },
                    {
                      match: {
                        G: [/￿\?\?(?=\n?$)/dgv, /\?\?(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.coalescing.swift"
                    },
                    {
                      match: {
                        G: [/￿(&&|\|\|)(?=\n?$)/dgv, /(&&|\|\|)(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.logical.swift"
                    },
                    {
                      match: {
                        G: [/￿([\&\^\|]|<<|>>)(?=\n?$)/dgv, /([\&\^\|]|<<|>>)(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.bitwise.swift"
                    },
                    {
                      match: {
                        G: [/￿([\!\=]==)(?=\n?$)/dgv, /([\!\=]==)(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.bitwise.swift"
                    },
                    {
                      match: {
                        G: [/￿\?(?=\n?$)/dgv, /\?(?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.ternary.swift"
                    },
                    {
                      match: /[^\n]+/dgv,
                      name: "keyword.operator.custom.infix.swift"
                    }
                  ]
                }
              },
              match: {
                G: [new EmulatedRegExp("￿(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)", "dgv", { hiddenCaptures: [1] }), new EmulatedRegExp("(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)", "dgvy", { hiddenCaptures: [1] })]
              }
            },
            {
              captures: {
                "0": {
                  patterns: [
                    {
                      match: /[^\n]+/dgv,
                      name: "keyword.operator.custom.prefix.dot.swift"
                    }
                  ]
                }
              },
              match: {
                G: [new EmulatedRegExp("￿(?<=^|[\\(\\,\\:\\;\\[\\{\\p{space}])\\.(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\.\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)(?![\\]\\)\\,\\:\\;\\}\\p{space}]|$)", "dgv", { hiddenCaptures: [1] }), new EmulatedRegExp("(?<=^|[\\(\\,\\:\\;\\[\\{\\p{space}])\\.(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\.\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)(?![\\]\\)\\,\\:\\;\\}\\p{space}]|$)", "dgvy", { hiddenCaptures: [1] })]
              }
            },
            {
              captures: {
                "0": {
                  patterns: [
                    {
                      match: /[^\n]+/dgv,
                      name: "keyword.operator.custom.postfix.dot.swift"
                    }
                  ]
                }
              },
              match: {
                G: [new EmulatedRegExp("￿(?<!^|[\\(\\,\\:\\;\\[\\{\\p{space}])\\.(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\.\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)(?=[\\]\\)\\,\\:\\;\\}\\p{space}]|$)", "dgv", { hiddenCaptures: [1] }), new EmulatedRegExp("(?<!^|[\\(\\,\\:\\;\\[\\{\\p{space}])\\.(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\.\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)(?=[\\]\\)\\,\\:\\;\\}\\p{space}]|$)", "dgvy", { hiddenCaptures: [1] })]
              }
            },
            {
              captures: {
                "0": {
                  patterns: [
                    {
                      match: {
                        G: [/￿\.\.[\.\<](?=\n?$)/dgv, /\.\.[\.\<](?=\n?$)/dgvy]
                      },
                      name: "keyword.operator.range.swift"
                    },
                    {
                      match: /[^\n]+/dgv,
                      name: "keyword.operator.custom.infix.dot.swift"
                    }
                  ]
                }
              },
              match: {
                G: [new EmulatedRegExp("￿\\.(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\.\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)", "dgv", { hiddenCaptures: [1] }), new EmulatedRegExp("\\.(?:(?=(((?!(//|/\\*|\\*/))([\\-\\!\\%\\&\\*\\+\\.\\/\\<-\\?\\^\\|\\~¡-§©«¬®°±¶»¿×÷̀-ͯ᷀-᷿‖‗†-‧‰-‾⁁-⁓⁕-⁞⃐-⃿←-⏿─-❵➔-⯿⸀-⹿、。〃〈-〰︀-️︠-︯\\u{E0100}-\\u{E01EF}]))+))\\1)", "dgvy", { hiddenCaptures: [1] })]
              }
            }
          ]
        },
        {
          match: /:/dgv,
          name: "keyword.operator.ternary.swift"
        }
      ]
    },
    root: {
      patterns: [
        { include: "#compiler-control" },
        { include: "#declarations" },
        { include: "#expressions" }
      ]
    }
  },
  dependencies: []
};
