export default {
  name: "cmake",
  displayName: "CMake",
  scopeName: "source.cmake",
  patterns: [
    {
      match: /\b(?:APPLE|BORLAND|(CMAKE_)?(CL_64|COMPILER_2005|HOST_APPLE|HOST_SYSTEM|HOST_SYSTEM_NAME|HOST_SYSTEM_PROCESSOR|HOST_SYSTEM_VERSION|HOST_UNIX|HOST_WIN32|LIBRARY_ARCHITECTURE|LIBRARY_ARCHITECTURE_REGEX|OBJECT_PATH_MAX|SYSTEM|SYSTEM_NAME|SYSTEM_PROCESSOR|SYSTEM_VERSION)|CYGWIN|MSVC|MSVC80|MSVC_IDE|MSVC_VERSION|UNIX|WIN32|XCODE_VERSION|MSVC60|MSVC70|MSVC90|MSVC71)\b/dgiv,
      name: "constant.source.cmake"
    },
    {
      match: /\b(?:ABSOLUTE|AND|BOOL|CACHE|COMMAND|COMMENT|DEFINED|DOC|EQUAL|EXISTS|EXT|FALSE|GREATER|GREATER_EQUAL|INTERNAL|IN_LIST|IS_ABSOLUTE|IS_DIRECTORY|IS_NEWER_THAN|IS_SYMLINK|LESS|LESS_EQUAL|MATCHES|NAMES??|NAME_WE|NOT|OFF|ON|OR|PATHS??|POLICY|PROGRAM|STREQUAL|STRGREATER|STRGREATER_EQUAL|STRING|STRLESS|STRLESS_EQUAL|TARGET|TEST|TRUE|VERSION_EQUAL|VERSION_GREATER|VERSION_GREATER_EQUAL|VERSION_LESS)\b/dgiv,
      name: "keyword.cmake"
    },
    {
      match: /^\p{space}*\b(?:add_compile_options|add_custom_command|add_custom_target|add_definitions|add_dependencies|add_executable|add_library|add_subdirectory|add_test|aux_source_directory|break|build_command|build_name|cmake_host_system_information|cmake_minimum_required|cmake_policy|configure_file|continue|create_test_sourcelist|ctest_build|ctest_configure|ctest_coverage|ctest_empty_binary_directory|ctest_memcheck|ctest_read_custom_files|ctest_run_script|ctest_sleep|ctest_start|ctest_submit|ctest_test|ctest_update|ctest_upload|define_property|else|elseif|enable_language|enable_testing|endforeach|endfunction|endif|endmacro|endwhile|exec_program|execute_process|export|export_library_dependencies|file|find_file|find_library|find_package|find_path|find_program|fltk_wrap_ui|foreach|function|get_cmake_property|get_directory_property|get_filename_component|get_property|get_source_file_property|get_target_property|get_test_property|if|include|include_directories|include_external_msproject|include_regular_expression|install|install_files|install_programs|install_targets|link_directories|link_libraries|list|load_cache|load_command|macro|make_directory|mark_as_advanced|math|message|option|output_required_files|project|qt_wrap_cpp|qt_wrap_ui|remove|remove_definitions|return|separate_arguments|set|set_directory_properties|set_property|set_source_files_properties|set_target_properties|set_tests_properties|site_name|source_group|string|subdir_depends|subdirs|target_compile_definitions|target_compile_features|target_compile_options|target_include_directories|target_link_libraries|target_sources|try_compile|try_run|unset|use_mangled_mesa|utility_source|variable_requires|variable_watch|while|write_file)\b/dgiv,
      name: "keyword.cmake"
    },
    {
      match: /\b(?:BUILD_SHARED_LIBS|(CMAKE_)?(ABSOLUTE_DESTINATION_FILES|AUTOMOC_RELAXED_MODE|BACKWARDS_COMPATIBILITY|BUILD_TYPE|COLOR_MAKEFILE|CONFIGURATION_TYPES|DEBUG_TARGET_PROPERTIES|DISABLE_FIND_PACKAGE_[\p{L}\p{M}\p{N}\p{Pc}]+|FIND_LIBRARY_PREFIXES|FIND_LIBRARY_SUFFIXES|IGNORE_PATH|INCLUDE_PATH|INSTALL_DEFAULT_COMPONENT_NAME|INSTALL_PREFIX|LIBRARY_PATH|MFC_FLAG|MODULE_PATH|NOT_USING_CONFIG_FLAGS|POLICY_DEFAULT_CMP[\p{L}\p{M}\p{N}\p{Pc}]+|PREFIX_PATH|PROGRAM_PATH|SKIP_INSTALL_ALL_DEPENDENCY|SYSTEM_IGNORE_PATH|SYSTEM_INCLUDE_PATH|SYSTEM_LIBRARY_PATH|SYSTEM_PREFIX_PATH|SYSTEM_PROGRAM_PATH|USER_MAKE_RULES_OVERRIDE|WARN_ON_ABSOLUTE_INSTALL_DESTINATION))\b/dgiv,
      name: "variable.source.cmake"
    },
    {
      match: /\$\{[\p{L}\p{M}\p{N}\p{Pc}]+\}/dgv,
      name: "storage.source.cmake"
    },
    {
      match: /\$ENV\{[\p{L}\p{M}\p{N}\p{Pc}]+\}/dgv,
      name: "storage.source.cmake"
    },
    {
      match: /\b(?:(CMAKE_)?([\p{L}\p{M}\p{N}\p{Pc}]+_POSTFIX|ARCHIVE_OUTPUT_DIRECTORY|AUTOMOC|AUTOMOC_MOC_OPTIONS|BUILD_WITH_INSTALL_RPATH|DEBUG_POSTFIX|EXE_LINKER_FLAGS|EXE_LINKER_FLAGS_[\p{L}\p{M}\p{N}\p{Pc}]+|Fortran_FORMAT|Fortran_MODULE_DIRECTORY|GNUtoMS|INCLUDE_CURRENT_DIR|INCLUDE_CURRENT_DIR_IN_INTERFACE|INSTALL_NAME_DIR|INSTALL_RPATH|INSTALL_RPATH_USE_LINK_PATH|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_PATH_FLAG|LINK_DEF_FILE_FLAG|LINK_DEPENDS_NO_SHARED|LINK_INTERFACE_LIBRARIES|LINK_LIBRARY_FILE_FLAG|LINK_LIBRARY_FLAG|MACOSX_BUNDLE|NO_BUILTIN_CHRPATH|PDB_OUTPUT_DIRECTORY|POSITION_INDEPENDENT_CODE|RUNTIME_OUTPUT_DIRECTORY|SKIP_BUILD_RPATH|SKIP_INSTALL_RPATH|TRY_COMPILE_CONFIGURATION|USE_RELATIVE_PATHS|WIN32_EXECUTABLE)|EXECUTABLE_OUTPUT_PATH|LIBRARY_OUTPUT_PATH)\b/dgiv,
      name: "variable.source.cmake"
    },
    {
      match: /\b(?:CMAKE_(AR|ARGC|ARGV0|BINARY_DIR|BUILD_TOOL|CACHEFILE_DIR|CACHE_MAJOR_VERSION|CACHE_MINOR_VERSION|CACHE_PATCH_VERSION|CFG_INTDIR|COMMAND|CROSSCOMPILING|CTEST_COMMAND|CURRENT_BINARY_DIR|CURRENT_LIST_DIR|CURRENT_LIST_FILE|CURRENT_LIST_LINE|CURRENT_SOURCE_DIR|DL_LIBS|EDIT_COMMAND|EXECUTABLE_SUFFIX|EXTRA_GENERATOR|EXTRA_SHARED_LIBRARY_SUFFIXES|GENERATOR|HOME_DIRECTORY|IMPORT_LIBRARY_PREFIX|IMPORT_LIBRARY_SUFFIX|LINK_LIBRARY_SUFFIX|MAJOR_VERSION|MAKE_PROGRAM|MINOR_VERSION|PARENT_LIST_FILE|PATCH_VERSION|PROJECT_NAME|RANLIB|ROOT|SCRIPT_MODE_FILE|SHARED_LIBRARY_PREFIX|SHARED_LIBRARY_SUFFIX|SHARED_MODULE_PREFIX|SHARED_MODULE_SUFFIX|SIZEOF_VOID_P|SKIP_RPATH|SOURCE_DIR|STANDARD_LIBRARIES|STATIC_LIBRARY_PREFIX|STATIC_LIBRARY_SUFFIX|TWEAK_VERSION|USING_VC_FREE_TOOLS|VERBOSE_MAKEFILE|VERSION)|PROJECT_BINARY_DIR|PROJECT_NAME|PROJECT_SOURCE_DIR|[\p{L}\p{M}\p{N}\p{Pc}]+_BINARY_DIR|[\p{L}\p{M}\p{N}\p{Pc}]+__SOURCE_DIR)\b/dgiv,
      name: "variable.source.cmake"
    },
    {
      begin: /#\[(=*)\[/dgv,
      end: /\]1\]/dgv,
      name: "comment.source.cmake",
      patterns: [
        {
          match: /\\([^\n]|(?=\n?$))/dgv,
          name: "constant.character.escape"
        }
      ]
    },
    {
      begin: /\[(=*)\[/dgv,
      end: /\]1\]/dgv,
      name: "argument.source.cmake",
      patterns: [
        {
          match: /\\([^\n]|(?=\n?$))/dgv,
          name: "constant.character.escape"
        }
      ]
    },
    {
      match: /#+[^\n]*(?=\n?$)/dgv,
      name: "comment.source.cmake"
    },
    {
      match: /\b(?:ADVANCED|HELPSTRING|MODIFIED|STRINGS|TYPE|VALUE)\b/dgiv,
      name: "entity.source.cmake"
    },
    {
      match: /\b(?:ABSTRACT|COMPILE_DEFINITIONS|COMPILE_DEFINITIONS_<CONFIG>|COMPILE_FLAGS|EXTERNAL_OBJECT|Fortran_FORMAT|GENERATED|HEADER_FILE_ONLY|KEEP_EXTENSION|LABELS|LANGUAGE|LOCATION|MACOSX_PACKAGE_LOCATION|OBJECT_DEPENDS|OBJECT_OUTPUTS|SYMBOLIC|WRAP_EXCLUDE)\b/dgiv,
      name: "entity.source.cmake"
    },
    {
      match: /\b(?:ATTACHED_FILES|ATTACHED_FILES_ON_FAIL|COST|DEPENDS|ENVIRONMENT|FAIL_REGULAR_EXPRESSION|LABELS|MEASUREMENT|PASS_REGULAR_EXPRESSION|PROCESSORS|REQUIRED_FILES|RESOURCE_LOCK|RUN_SERIAL|TIMEOUT|WILL_FAIL|WORKING_DIRECTORY)\b/dgiv,
      name: "entity.source.cmake"
    },
    {
      match: /\b(?:ADDITIONAL_MAKE_CLEAN_FILES|CACHE_VARIABLES|CLEAN_NO_CUSTOM|COMPILE_DEFINITIONS|COMPILE_DEFINITIONS_[\p{L}\p{M}\p{N}\p{Pc}]+|DEFINITIONS|EXCLUDE_FROM_ALL|IMPLICIT_DEPENDS_INCLUDE_TRANSFORM|INCLUDE_DIRECTORIES|INCLUDE_REGULAR_EXPRESSION|INTERPROCEDURAL_OPTIMIZATION|INTERPROCEDURAL_OPTIMIZATION_[\p{L}\p{M}\p{N}\p{Pc}]+|LINK_DIRECTORIES|LISTFILE_STACK|MACROS|PARENT_DIRECTORY|RULE_LAUNCH_COMPILE|RULE_LAUNCH_CUSTOM|RULE_LAUNCH_LINK|TEST_INCLUDE_FILE|VARIABLES|VS_GLOBAL_SECTION_POST_[\p{L}\p{M}\p{N}\p{Pc}]+|VS_GLOBAL_SECTION_PRE_[\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgiv,
      name: "entity.source.cmake"
    },
    {
      match: /\b(?:ALLOW_DUPLICATE_CUSTOM_TARGETS|DEBUG_CONFIGURATIONS|DISABLED_FEATURES|ENABLED_FEATURES|ENABLED_LANGUAGES|FIND_LIBRARY_USE_LIB64_PATHS|FIND_LIBRARY_USE_OPENBSD_VERSIONING|GLOBAL_DEPENDS_DEBUG_MODE|GLOBAL_DEPENDS_NO_CYCLES|IN_TRY_COMPILE|PACKAGES_FOUND|PACKAGES_NOT_FOUND|PREDEFINED_TARGETS_FOLDER|REPORT_UNDEFINED_PROPERTIES|RULE_LAUNCH_COMPILE|RULE_LAUNCH_CUSTOM|RULE_LAUNCH_LINK|RULE_MESSAGES|TARGET_ARCHIVES_MAY_BE_SHARED_LIBS|TARGET_SUPPORTS_SHARED_LIBS|USE_FOLDERS|__CMAKE_DELETE_CACHE_CHANGE_VARS_)\b/dgiv,
      name: "entity.source.cmake"
    },
    {
      match: /\b(?:[\p{L}\p{M}\p{N}\p{Pc}]+_(OUTPUT_NAME|POSTFIX)|ARCHIVE_OUTPUT_(DIRECTORY(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|NAME(_[\p{L}\p{M}\p{N}\p{Pc}]+)?)|AUTOMOC(_MOC_OPTIONS)?|BUILD_WITH_INSTALL_RPATH|BUNDLE(_EXTENSION)??|COMPATIBLE_INTERFACE_BOOL|COMPATIBLE_INTERFACE_STRING|COMPILE_(DEFINITIONS(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|FLAGS)|DEBUG_POSTFIX|DEFINE_SYMBOL|ENABLE_EXPORTS|EXCLUDE_FROM_ALL|EchoString|FOLDER|FRAMEWORK|Fortran_(FORMAT|MODULE_DIRECTORY)|GENERATOR_FILE_NAME|GNUtoMS|HAS_CXX|IMPLICIT_DEPENDS_INCLUDE_TRANSFORM|IMPORTED|IMPORTED_(CONFIGURATIONS|IMPLIB(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LINK_DEPENDENT_LIBRARIES(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LINK_INTERFACE_LANGUAGES(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LINK_INTERFACE_LIBRARIES(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LINK_INTERFACE_MULTIPLICITY(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LOCATION(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|NO_SONAME(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|SONAME(_[\p{L}\p{M}\p{N}\p{Pc}]+)?)|IMPORT_PREFIX|IMPORT_SUFFIX|INSTALL_NAME_DIR|INSTALL_RPATH|INSTALL_RPATH_USE_LINK_PATH|INTERFACE|INTERFACE_COMPILE_DEFINITIONS|INTERFACE_INCLUDE_DIRECTORIES|INTERPROCEDURAL_OPTIMIZATION|INTERPROCEDURAL_OPTIMIZATION_[\p{L}\p{M}\p{N}\p{Pc}]+|LABELS|LIBRARY_OUTPUT_DIRECTORY(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LIBRARY_OUTPUT_NAME(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LINKER_LANGUAGE|LINK_DEPENDS|LINK_FLAGS(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LINK_INTERFACE_LIBRARIES(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LINK_INTERFACE_MULTIPLICITY(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|LINK_LIBRARIES|LINK_SEARCH_END_STATIC|LINK_SEARCH_START_STATIC|LOCATION(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|MACOSX_BUNDLE|MACOSX_BUNDLE_INFO_PLIST|MACOSX_FRAMEWORK_INFO_PLIST|MAP_IMPORTED_CONFIG_[\p{L}\p{M}\p{N}\p{Pc}]+|NO_SONAME|OSX_ARCHITECTURES(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|OUTPUT_NAME(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|PDB_NAME(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|POST_INSTALL_SCRIPT|PREFIX|PRE_INSTALL_SCRIPT|PRIVATE|PRIVATE_HEADER|PROJECT_LABEL|PUBLIC|PUBLIC_HEADER|RESOURCE|RULE_LAUNCH_(COMPILE|CUSTOM|LINK)|RUNTIME_OUTPUT_(DIRECTORY(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|NAME(_[\p{L}\p{M}\p{N}\p{Pc}]+)?)|SKIP_BUILD_RPATH|SOURCES|SOVERSION|STATIC_LIBRARY_FLAGS(_[\p{L}\p{M}\p{N}\p{Pc}]+)?|SUFFIX|TYPE|VERSION|VS_DOTNET_REFERENCES|VS_GLOBAL_([\p{L}\p{M}\p{N}\p{Pc}]+|KEYWORD|PROJECT_TYPES)|VS_KEYWORD|VS_SCC_(AUXPATH|LOCALPATH|PROJECTNAME|PROVIDER)|VS_WINRT_EXTENSIONS|VS_WINRT_REFERENCES|WIN32_EXECUTABLE|XCODE_ATTRIBUTE_[\p{L}\p{M}\p{N}\p{Pc}]+)\b/dgiv,
      name: "entity.source.cmake"
    },
    {
      begin: /\\"/dgv,
      end: /\\"/dgv,
      name: "string.source.cmake",
      patterns: [
        {
          match: /\\([^\n]|(?=\n?$))/dgv,
          name: "constant.character.escape"
        }
      ]
    },
    {
      begin: /"/dgv,
      end: /"/dgv,
      name: "string.source.cmake",
      patterns: [
        {
          match: /\\([^\n]|(?=\n?$))/dgv,
          name: "constant.character.escape"
        }
      ]
    },
    {
      match: /\bBUILD_NAME\b/dgv,
      name: "invalid.deprecated.source.cmake"
    },
    {
      match: /\b(CMAKE_)?(C(?:XX_FLAGS|MAKE_CXX_FLAGS_DEBUG|MAKE_CXX_FLAGS_MINSIZEREL|MAKE_CXX_FLAGS_RELEASE|MAKE_CXX_FLAGS_RELWITHDEBINFO))\b/dgiv,
      name: "variable.source.cmake"
    }
  ],
  repository: {},
  dependencies: []
};
