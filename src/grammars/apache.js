export default {
  name: "apache",
  displayName: "Apache Conf",
  scopeName: "source.apacheconf",
  patterns: [
    {
      captures: {
        "1": { name: "punctuation.definition.comment.apacheconf" }
      },
      match: /^(\p{space})*(#)[^\n]*(?=\n?$)\n?/dgv,
      name: "comment.line.hash.ini"
    },
    {
      captures: {
        "1": { name: "punctuation.definition.tag.apacheconf" },
        "2": { name: "entity.tag.apacheconf" },
        "4": { name: "string.value.apacheconf" },
        "5": { name: "punctuation.definition.tag.apacheconf" }
      },
      match: /(<)(Proxy|ProxyMatch|IfVersion|Directory|DirectoryMatch|Files|FilesMatch|IfDefine|IfModule|Limit|LimitExcept|Location|LocationMatch|VirtualHost|Macro|If|Else|ElseIf)(\p{space}([^\n]+?))?(>)/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.definition.tag.apacheconf" },
        "2": { name: "entity.tag.apacheconf" },
        "3": { name: "punctuation.definition.tag.apacheconf" }
      },
      match: /(<\/)(Proxy|ProxyMatch|IfVersion|Directory|DirectoryMatch|Files|FilesMatch|IfDefine|IfModule|Limit|LimitExcept|Location|LocationMatch|VirtualHost|Macro|If|Else|ElseIf)(>)/dgv
    },
    {
      captures: {
        "3": { name: "string.regexp.apacheconf" },
        "4": { name: "string.replacement.apacheconf" }
      },
      match: /(?<=(Rewrite(Rule|Cond)))\p{space}+([^\n]+?)\p{space}+([^\n]+?)((?=\n?$)|\p{space})/dgv
    },
    {
      captures: {
        "2": { name: "entity.status.apacheconf" },
        "3": { name: "string.regexp.apacheconf" },
        "5": { name: "string.path.apacheconf" }
      },
      match: /(?<=RedirectMatch)(\p{space}+(\p{Nd}\p{Nd}\p{Nd}|permanent|temp|seeother|gone))?\p{space}+([^\n]+?)\p{space}+(([^\n]+?)((?=\n?$)|\p{space}))?/dgv
    },
    {
      captures: {
        "2": { name: "entity.status.apacheconf" },
        "3": { name: "string.path.apacheconf" },
        "5": { name: "string.path.apacheconf" }
      },
      match: /(?<=Redirect)(\p{space}+(\p{Nd}\p{Nd}\p{Nd}|permanent|temp|seeother|gone))?\p{space}+([^\n]+?)\p{space}+(([^\n]+?)((?=\n?$)|\p{space}))?/dgv
    },
    {
      captures: {
        "1": { name: "string.regexp.apacheconf" },
        "3": { name: "string.path.apacheconf" }
      },
      match: /(?<=(?:Script|)AliasMatch)\p{space}+([^\n]+?)\p{space}+(([^\n]+?)\p{space})?/dgv
    },
    {
      captures: {
        "1": { name: "string.path.apacheconf" },
        "3": { name: "string.path.apacheconf" }
      },
      match: /(?<=RedirectPermanent|RedirectTemp|ScriptAlias|Alias)\p{space}+([^\n]+?)\p{space}+(([^\n]+?)((?=\n?$)|\p{space}))?/dgv
    },
    {
      captures: {
        "1": { name: "keyword.core.apacheconf" }
      },
      match: /\b(AcceptPathInfo|AccessFileName|AddDefaultCharset|AddOutputFilterByType|AllowEncodedSlashes|AllowOverride|AuthName|AuthType|CGIMapExtension|ContentDigest|DefaultType|Define|DocumentRoot|EnableMMAP|EnableSendfile|ErrorDocument|ErrorLog|FileETag|ForceType|HostnameLookups|IdentityCheck|Include(Optional)?|KeepAlive|KeepAliveTimeout|LimitInternalRecursion|LimitRequestBody|LimitRequestFields|LimitRequestFieldSize|LimitRequestLine|LimitXMLRequestBody|LogLevel|MaxKeepAliveRequests|Mutex|NameVirtualHost|Options|Require|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScriptInterpreterSource|ServerAdmin|ServerAlias|ServerName|ServerPath|ServerRoot|ServerSignature|ServerTokens|SetHandler|SetInputFilter|SetOutputFilter|Time([Oo])ut|TraceEnable|UseCanonicalName|Use|ErrorLogFormat|GlobalLog|PHPIniDir|SSLHonorCipherOrder|SSLCompression|SSLUseStapling|SSLStapling[\p{L}\p{M}\p{N}\p{Pc}]+|SSLCARevocationCheck|SSLSRPVerifierFile|SSLSessionTickets|RequestReadTimeout|ProxyHTML[\p{L}\p{M}\p{N}\p{Pc}]+|MaxRanges)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.mpm.apacheconf" }
      },
      match: /\b(AcceptMutex|AssignUserID|BS2000Account|ChildPerUserID|CoreDumpDirectory|EnableExceptionHook|Group|Listen|ListenBacklog|LockFile|MaxClients|MaxConnectionsPerChild|MaxMemFree|MaxRequestsPerChild|MaxRequestsPerThread|MaxRequestWorkers|MaxSpareServers|MaxSpareThreads|MaxThreads|MaxThreadsPerChild|MinSpareServers|MinSpareThreads|NumServers|PidFile|ReceiveBufferSize|ScoreBoardFile|SendBufferSize|ServerLimit|StartServers|StartThreads|ThreadLimit|ThreadsPerChild|ThreadStackSize|User|Win32DisableAcceptEx)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.access.apacheconf" }
      },
      match: /\b(Allow|Deny|Order)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.actions.apacheconf" }
      },
      match: /\b(Action|Script)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.alias.apacheconf" }
      },
      match: /\b(Alias|AliasMatch|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ScriptAlias|ScriptAliasMatch)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.auth.apacheconf" }
      },
      match: /\b(Auth(?:Authoritative|GroupFile|UserFile|BasicProvider|BasicFake|BasicAuthoritative|BasicUseDigestAlgorithm))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.auth_anon.apacheconf" }
      },
      match: /\b(Anonymous(?:|_Authoritative|_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.auth_dbm.apacheconf" }
      },
      match: /\b(AuthDBM(?:Authoritative|GroupFile|Type|UserFile))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.auth_digest.apacheconf" }
      },
      match: /\b(AuthDigest(?:Algorithm|Domain|File|GroupFile|NcCheck|NonceFormat|NonceLifetime|Qop|ShmemSize|Provider))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.auth_ldap.apacheconf" }
      },
      match: /\b(AuthLDAP(?:Authoritative|BindDN|BindPassword|CharsetConfig|CompareDNOnServer|DereferenceAliases|Enabled|FrontPageHack|GroupAttribute|GroupAttributeIsDN|RemoteUserIsDN|Url))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.autoindex.apacheconf" }
      },
      match: /\b(AddAlt|AddAltByEncoding|AddAltByType|AddDescription|AddIcon|AddIconByEncoding|AddIconByType|DefaultIcon|HeaderName|IndexIgnore|IndexOptions|IndexOrderDefault|IndexStyleSheet|IndexHeadInsert|ReadmeName)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.filter.apacheconf" }
      },
      match: /\b(Balancer(?:Member|Growth|Persist|Inherit))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.cache.apacheconf" }
      },
      match: /\b(Cache(?:DefaultExpire|Disable|Enable|ForceCompletion|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|LastModifiedFactor|MaxExpire))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.cern_meta.apacheconf" }
      },
      match: /\b(Meta(?:Dir|Files|Suffix))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.cgi.apacheconf" }
      },
      match: /\b(ScriptLog(?:|Buffer|Length))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.cgid.apacheconf" }
      },
      match: /\b(Script(?:Log|LogBuffer|LogLength|Sock))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.charset_lite.apacheconf" }
      },
      match: /\b(Charset(?:Default|Options|SourceEnc))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.dav.apacheconf" }
      },
      match: /\b(Dav(?:|DepthInfinity|MinTimeout|LockDB))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.deflate.apacheconf" }
      },
      match: /\b(Deflate(?:BufferSize|CompressionLevel|FilterNote|MemLevel|WindowSize))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.dir.apacheconf" }
      },
      match: /\b(DirectoryIndex|DirectorySlash|FallbackResource)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.disk_cache.apacheconf" }
      },
      match: /\b(Cache(?:DirLength|DirLevels|ExpiryCheck|GcClean|GcDaily|GcInterval|GcMemUsage|GcUnused|MaxFileSize|MinFileSize|Root|Size|TimeMargin))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.dumpio.apacheconf" }
      },
      match: /\b(DumpIO(?:In|Out)put)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.env.apacheconf" }
      },
      match: /\b((?:Pass|Set|Unset)Env)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.expires.apacheconf" }
      },
      match: /\b(Expires(?:Active|ByType|Default))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.ext_filter.apacheconf" }
      },
      match: /\b(ExtFilter(?:Define|Options))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.file_cache.apacheconf" }
      },
      match: /\b((?:Cache|MMap)File)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.filter.apacheconf" }
      },
      match: /\b(AddOutputFilterByType|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.headers.apacheconf" }
      },
      match: /\b((?:|Request)Header)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.imap.apacheconf" }
      },
      match: /\b(Imap(?:Base|Default|Menu))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.include.apacheconf" }
      },
      match: /\b(SSIEndTag|SSIErrorMsg|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|XBitHack)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.isapi.apacheconf" }
      },
      match: /\b(ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.ldap.apacheconf" }
      },
      match: /\b(LDAP(?:CacheEntries|CacheTTL|ConnectionTimeout|OpCacheEntries|OpCacheTTL|SharedCacheFile|SharedCacheSize|TrustedCA|TrustedCAType))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.log.apacheconf" }
      },
      match: /\b(BufferedLogs|CookieLog|CustomLog|LogFormat|TransferLog|ForensicLog)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.mem_cache.apacheconf" }
      },
      match: /\b(MCache(?:MaxObjectCount|MaxObjectSize|MaxStreamingBuffer|MinObjectSize|RemovalAlgorithm|Size))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.mime.apacheconf" }
      },
      match: /\b(AddCharset|AddEncoding|AddHandler|AddInputFilter|AddLanguage|AddOutputFilter|AddType|DefaultLanguage|ModMimeUsePathInfo|MultiviewsMatch|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|TypesConfig)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.misc.apacheconf" }
      },
      match: /\b(ProtocolEcho|Example|AddModuleInfo|MimeMagicFile|CheckSpelling|ExtendedStatus|SuexecUserGroup|UserDir)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.negotiation.apacheconf" }
      },
      match: /\b(CacheNegotiatedDocs|ForceLanguagePriority|LanguagePriority)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.nw_ssl.apacheconf" }
      },
      match: /\b(NWSSLTrustedCerts|NWSSLUpgradeable|SecureListen)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.proxy.apacheconf" }
      },
      match: /\b(AllowCONNECT|NoProxy|ProxyBadHeader|ProxyBlock|ProxyDomain|ProxyErrorOverride|ProxyFtpDirCharset|ProxyIOBufferSize|ProxyMaxForwards|ProxyPass|ProxyPassMatch|ProxyPassReverse|ProxyPreserveHost|ProxyReceiveBufferSize|ProxyRemote|ProxyRemoteMatch|ProxyRequests|ProxyTimeout|ProxyVia)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.rewrite.apacheconf" }
      },
      match: /\b(Rewrite(?:Base|Cond|Engine|Lock|Log|LogLevel|Map|Options|Rule))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.setenvif.apacheconf" }
      },
      match: /\b(BrowserMatch|BrowserMatchNoCase|SetEnvIf|SetEnvIfNoCase)\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.so.apacheconf" }
      },
      match: /\b(Load(?:File|Module))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.ssl.apacheconf" }
      },
      match: /\b(SSL(?:CACertificateFile|CACertificatePath|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Engine|Mutex|Options|PassPhraseDialog|Protocol|ProxyCACertificateFile|ProxyCACertificatePath|ProxyCARevocationFile|ProxyCARevocationPath|ProxyCipherSuite|ProxyEngine|ProxyMachineCertificateFile|ProxyMachineCertificatePath|ProxyProtocol|ProxyVerify|ProxyVerifyDepth|RandomSeed|Require|RequireSSL|SessionCache|SessionCacheTimeout|UserName|VerifyClient|VerifyDepth|InsecureRenegotiation|OpenSSLConfCmd))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.substitute.apacheconf" }
      },
      match: /\b(Substitute(?:|InheritBefore|MaxLineLength))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.usertrack.apacheconf" }
      },
      match: /\b(Cookie(?:Domain|Expires|Name|Style|Tracking))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.vhost_alias.apacheconf" }
      },
      match: /\b(Virtual(?:DocumentRoot|DocumentRootIP|ScriptAlias|ScriptAliasIP))\b/dgv
    },
    {
      captures: {
        "1": { name: "keyword.php.apacheconf" },
        "3": { name: "entity.property.apacheconf" },
        "5": { name: "string.value.apacheconf" }
      },
      match: /\b(php_(?:value|flag|admin_value|admin_flag))\b(\p{space}+([^\n]+?)(\p{space}+("[^\n]+?"|[^\n]+?))?)?\p{space}/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.variable.apacheconf" },
        "3": { name: "variable.env.apacheconf" },
        "4": { name: "variable.misc.apacheconf" },
        "5": { name: "punctuation.variable.apacheconf" }
      },
      match: /(%\{)((HTTP_USER_AGENT|HTTP_REFERER|HTTP_COOKIE|HTTP_FORWARDED|HTTP_HOST|HTTP_PROXY_CONNECTION|HTTP_ACCEPT|REMOTE_ADDR|REMOTE_HOST|REMOTE_PORT|REMOTE_USER|REMOTE_IDENT|REQUEST_METHOD|SCRIPT_FILENAME|PATH_INFO|QUERY_STRING|AUTH_TYPE|DOCUMENT_ROOT|SERVER_ADMIN|SERVER_NAME|SERVER_ADDR|SERVER_PORT|SERVER_PROTOCOL|SERVER_SOFTWARE|TIME_YEAR|TIME_MON|TIME_DAY|TIME_HOUR|TIME_MIN|TIME_SEC|TIME_WDAY|TIME|API_VERSION|THE_REQUEST|REQUEST_URI|REQUEST_FILENAME|IS_SUBREQ|HTTPS)|([^\n]*?))(\})/dgv
    },
    {
      captures: {
        "1": { name: "entity.mime-type.apacheconf" }
      },
      match: /\b((text|image|application|video|audio)\/[^\n]+?)\p{space}/dgv
    },
    {
      captures: {
        "1": { name: "entity.helper.apacheconf" }
      },
      match: /\b(export|from|unset|set|on|off)\b/dgiv
    },
    {
      captures: {
        "1": { name: "constant.numeric.integer.decimal.apacheconf" }
      },
      match: /\b(\p{Nd}+)\b/dgv
    },
    {
      captures: {
        "1": { name: "punctuation.definition.flag.apacheconf" },
        "2": { name: "string.flag.apacheconf" },
        "3": { name: "punctuation.definition.flag.apacheconf" }
      },
      match: /\p{space}(\[)([^\n]*?)(\])\p{space}/dgv
    }
  ],
  dependencies: []
};
