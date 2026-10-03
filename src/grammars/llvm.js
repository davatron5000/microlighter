export default {
  name: "llvm",
  displayName: "LLVM IR",
  scopeName: "source.llvm",
  patterns: [
    {
      match: /\b(?:void\b|half\b|bfloat\b|float\b|double\b|x86_fp80\b|fp128\b|ppc_fp128\b|label\b|metadata\b|x86_mmx\b|x86_amx\b|type\b|label\b|opaque\b|token\b|i\p{Nd}+\**)/dgv,
      name: "storage.type.llvm"
    },
    {
      captures: {
        "1": { name: "storage.type.llvm" }
      },
      match: /!([A-Za-z]+)\p{space}*\(/dgv
    },
    {
      match: /(?:(?<=\p{space}|^)#dbg_(assign|declare|label|value)|\badd|\baddrspacecast|\balloca|\band|\barcp|\bashr|\batomicrmw|\bbitcast|\bbr|\bcatchpad|\bcatchswitch|\bcatchret|\bcall|\bcallbr|\bcleanuppad|\bcleanupret|\bcmpxchg|\beq|\bexact|\bextractelement|\bextractvalue|\bfadd|\bfast|\bfcmp|\bfdiv|\bfence|\bfmul|\bfpext|\bfptosi|\bfptoui|\bfptrunc|\bfree|\bfrem|\bfreeze|\bfsub|\bfneg|\bgetelementptr|\bicmp|\binbounds|\bindirectbr|\binsertelement|\binsertvalue|\binttoptr|\binvoke|\blandingpad|\bload|\blshr|\bmalloc|\bmax|\bmin|\bmul|\bnand|\bne|\bninf|\bnnan|\bnsw|\bnsz|\bnuw|\boeq|\boge|\bogt|\bole|\bolt|\bone|\bord??|\bphi|\bptrtoint|\bresume|\bret|\bsdiv|\bselect|\bsext|\bsge|\bsgt|\bshl|\bshufflevector|\bsitofp|\bsle|\bslt|\bsrem|\bstore|\bsub|\bswitch|\btrunc|\budiv|\bueq|\buge|\bugt|\buitofp|\bule|\bult|\bumax|\bumin|\bune|\buno|\bunreachable|\bunwind|\burem|\bva_arg|\bxchg|\bxor|\bzext)\b/dgv,
      name: "keyword.instruction.llvm"
    },
    {
      match: /\b(?:acq_rel|acquire|addrspace|alias|align|alignstack|allocsize|alwaysinline|appending|argmemonly|arm_aapcs_vfpcc|arm_aapcscc|arm_apcscc|asm|atomic|available_externally|blockaddress|builtin|byref|byval|c|caller|catch|ccc??|cleanup|cold|coldcc|comdat|common|constant|convergent|datalayout|declare|default|define|deplibs|dereferenceable|dereferenceable_or_null|distinct|dllexport|dllimport|dso_local|dso_preemptable|except|extern_weak|external|externally_initialized|fastcc|filter|from|gc|global|hhvm_ccc|hhvmcc|hidden|hot|immarg|inaccessiblemem_or_argmemonly|inaccessiblememonly|inalloc|initialexec|inlinehint|inreg|intel_ocl_bicc|inteldialect|internal|jumptable|linkonce|linkonce_odr|local_unnamed_addr|localdynamic|localexec|minsize|module|monotonic|msp430_intrcc|mustprogress|musttail|naked|nest|noalias|nobuiltin|nocallback|nocapture|nocf_check|noduplicate|nofree|noimplicitfloat|noinline|noipa|nomerge|nooutline|nonlazybind|nonnull|noprofile|norecurse|noredzone|noreturn|nosync|noundef|nounwind|nosanitize_bounds|nosanitize_coverage|null_pointer_is_valid|optforfuzzing|optnone|optsize|personality|preallocated|private|protected|ptx_device|ptx_kernel|readnone|readonly|release|returned|returns_twice|safestack|sanitize_address|sanitize_alloc_token|sanitize_hwaddress|sanitize_memory|sanitize_memtag|sanitize_thread|section|seq_cst|shadowcallstack|sideeffect|signext|source_filename|speculatable|speculative_load_hardening|spir_func|spir_kernel|sret|ssp|sspreq|sspstrong|strictfp|swiftcc|swifterror|swiftself|syncscope|tail|tailcc|target|thread_local|to|triple|unnamed_addr|unordered|uselistorder|uwtable|volatile|weak|weak_odr|willreturn|win64cc|within|writeonly|x86_64_sysvcc|x86_fastcallcc|x86_stdcallcc|x86_thiscallcc|zeroext)\b/dgv,
      name: "storage.modifier.llvm"
    },
    {
      match: /@[\-\$\.A-Z_a-z][\-\$\.0-9A-Z_a-z]*/dgv,
      name: "entity.name.function.llvm"
    },
    {
      match: /[\!\%\@]\p{Nd}+\b/dgv,
      name: "variable.llvm"
    },
    {
      match: /%[\-\$\.A-Z_a-z][\-\$\.0-9A-Z_a-z]*/dgv,
      name: "variable.llvm"
    },
    {
      captures: {
        "1": { name: "variable.llvm" }
      },
      match: /(![\-\$\.A-Z_a-z][\-\$\.0-9A-Z_a-z]*)\p{space}*(?=\n?$)/dgv
    },
    {
      captures: {
        "1": { name: "variable.llvm" }
      },
      match: /(![\-\$\.A-Z_a-z][\-\$\.0-9A-Z_a-z]*)\p{space}*[\!\=]/dgv
    },
    {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.quoted.double.llvm",
      patterns: [
        {
          match: /\./dgv,
          name: "constant.character.escape.untitled"
        }
      ]
    },
    {
      match: /[\-\$\.A-Z_a-z][\-\$\.0-9A-Z_a-z]*:/dgv,
      name: "entity.name.label.llvm"
    },
    {
      match: /-?\b\p{Nd}+\.\p{Nd}*(e[\-\+]\p{Nd}+)?\b/dgv,
      name: "constant.numeric.float"
    },
    {
      match: /\b0x\p{AHex}+\b/dgv,
      name: "constant.numeric.float"
    },
    {
      match: /-?\b\p{Nd}+\b/dgv,
      name: "constant.numeric.integer"
    },
    {
      match: /\b(?:true|false|null|zeroinitializer|undef|poison|null|none)\b/dgv,
      name: "constant.language"
    },
    {
      match: /\bD(?:W_TAG_[_a-z]+|W_ATE_[A-Z_a-z]+|W_OP_[0-9A-Z_a-z]+|W_LANG_[0-9A-Z_a-z]+|W_VIRTUALITY_[_a-z]+|IFlag[A-Za-z]+)\b/dgv,
      name: "constant.other"
    },
    {
      match: /;\p{space}*PR\p{Nd}*\p{space}*(?=\n?$)/dgv,
      name: "string.regexp"
    },
    {
      match: /;\p{space}*REQUIRES:[^\n]*(?=\n?$)/dgv,
      name: "string.regexp"
    },
    {
      match: /;\p{space}*RUN:[^\n]*(?=\n?$)/dgv,
      name: "string.regexp"
    },
    {
      match: /;\p{space}*ALLOW_RETRIES:[^\n]*(?=\n?$)/dgv,
      name: "string.regexp"
    },
    {
      match: /;\p{space}*CHECK:[^\n]*(?=\n?$)/dgv,
      name: "string.regexp"
    },
    {
      match: /;\p{space}*CHECK-(NEXT|NOT|DAG|SAME|LABEL):[^\n]*(?=\n?$)/dgv,
      name: "string.regexp"
    },
    {
      match: /;\p{space}*XFAIL:[^\n]*(?=\n?$)/dgv,
      name: "string.regexp"
    },
    {
      match: /;[^\n]*(?=\n?$)/dgv,
      name: "comment.line.llvm"
    }
  ],
  dependencies: []
};
