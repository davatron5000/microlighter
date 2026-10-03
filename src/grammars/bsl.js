import { EmulatedRegExp } from "oniguruma-to-es";

export default {
  name: "bsl",
  displayName: "1C (Enterprise)",
  aliases: [
    "1c"
  ],
  scopeName: "source.bsl",
  patterns: [
    { include: "#basic" },
    { include: "#miscellaneous" },
    {
      begin: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Процедура|Procedure|Функция|Function)\p{space}+([0-9_a-zа-яё]+)\p{space}*(\()/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.bsl" },
        "2": { name: "entity.name.function.bsl" },
        "3": { name: "punctuation.bracket.begin.bsl" }
      },
      end: /(\))\p{space}*((Экспорт|Export)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$)))?/dgiv,
      endCaptures: {
        "1": { name: "punctuation.bracket.end.bsl" },
        "2": { name: "storage.modifier.bsl" }
      },
      patterns: [
        { include: "#annotations" },
        { include: "#basic" },
        {
          match: /(=)/dgv,
          name: "keyword.operator.assignment.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Знач|Val)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
          name: "storage.modifier.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)((?<==)[0-9_a-zA-ZſKа-яА-ЯЁё]+)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgv,
          name: "invalid.illegal.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)((?<==\p{space})\p{space}*[0-9_a-zA-ZſKа-яА-ЯЁё]+)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgv,
          name: "invalid.illegal.bsl"
        },
        {
          match: /[0-9_a-zа-яё]+/dgiv,
          name: "variable.parameter.bsl"
        }
      ]
    },
    {
      begin: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Перем|Var)\p{space}+([0-9_a-zа-яё]+)\p{space}*/dgiv,
      beginCaptures: {
        "1": { name: "storage.type.var.bsl" },
        "2": { name: "variable.bsl" }
      },
      end: /(;)/dgv,
      endCaptures: {
        "1": { name: "keyword.operator.bsl" }
      },
      patterns: [
        {
          match: /(,)/dgv,
          name: "keyword.operator.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Экспорт|Export)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
          name: "storage.modifier.bsl"
        },
        {
          match: /[0-9_a-zа-яё]+/dgiv,
          name: "variable.bsl"
        }
      ]
    },
    {
      begin: /(?<=;|^)\p{space}*(Если|If)/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.conditional.bsl" }
      },
      end: /(Тогда|Then)/dgiv,
      endCaptures: {
        "1": { name: "keyword.control.conditional.bsl" }
      },
      name: "meta.conditional.bsl",
      patterns: [
        { include: "#basic" },
        { include: "#miscellaneous" }
      ]
    },
    {
      begin: /(?<=;|^)\p{space}*([а-яё\p{L}\p{M}\p{N}\p{Pc}]+)\p{space}*(=)/dgiv,
      beginCaptures: {
        "1": { name: "variable.assignment.bsl" },
        "2": { name: "keyword.operator.assignment.bsl" }
      },
      end: /(?=(;|Иначе|Конец|Els|End))/dgiv,
      name: "meta.var-single-variable.bsl",
      patterns: [
        { include: "#basic" },
        { include: "#miscellaneous" }
      ]
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(КонецПроцедуры|EndProcedure|КонецФункции|EndFunction)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "storage.type.bsl"
    },
    {
      match: /#(Использовать|Use)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "keyword.control.import.bsl"
    },
    {
      match: /#native/dgiv,
      name: "keyword.control.native.bsl"
    },
    {
      match: /#stack/dgiv,
      name: "keyword.control.stack.bsl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Прервать|Break|Продолжить|Continue|Возврат|Return)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "keyword.control.bsl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Если|If|Иначе|Else|ИначеЕсли|ElsIf|Тогда|Then|КонецЕсли|EndIf)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "keyword.control.conditional.bsl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Попытка|Try|Исключение|Except|КонецПопытки|EndTry|ВызватьИсключение|Raise)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "keyword.control.exception.bsl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Пока|While|(Для|For)(\p{space}+(Каждого|Each))?|Из|In|По|To|Цикл|Do|КонецЦикла|EndDo)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "keyword.control.repeat.bsl"
    },
    {
      match: /&(НаКлиенте((НаСервере(БезКонтекста)?)?)|AtClient((AtServer(NoContext)?)?)|НаСервере(БезКонтекста)?|AtServer(NoContext)?)/dgiv,
      name: "storage.modifier.directive.bsl"
    },
    { include: "#annotations" },
    {
      match: /#(Если|If|ИначеЕсли|ElsIf|Иначе|Else|КонецЕсли|EndIf)[^\n]*(Тогда|Then)?/dgiv,
      name: "keyword.other.preprocessor.bsl"
    },
    {
      begin: /(#(Область|Region))(\p{space}+([а-яё\p{L}\p{M}\p{N}\p{Pc}]+))?/dgiv,
      beginCaptures: {
        "1": { name: "keyword.other.section.bsl" },
        "4": { name: "entity.name.section.bsl" }
      },
      end: /(?=\n?$)/dgv
    },
    {
      match: /#(КонецОбласти|EndRegion)/dgiv,
      name: "keyword.other.section.bsl"
    },
    {
      match: /#(Удаление|Delete)/dgiv,
      name: "keyword.other.section.bsl"
    },
    {
      match: /#(КонецУдаления|EndDelete)/dgiv,
      name: "keyword.other.section.bsl"
    },
    {
      match: /#(Вставка|Insert)/dgiv,
      name: "keyword.other.section.bsl"
    },
    {
      match: /#(КонецВставки|EndInsert)/dgiv,
      name: "keyword.other.section.bsl"
    }
  ],
  repository: {
    annotations: {
      patterns: [
        {
          begin: /(&([0-9_a-zа-яё]+))\p{space}*(\()/dgiv,
          beginCaptures: {
            "1": { name: "storage.type.annotation.bsl" },
            "3": { name: "punctuation.bracket.begin.bsl" }
          },
          end: /(\))/dgv,
          endCaptures: {
            "1": { name: "punctuation.bracket.end.bsl" }
          },
          patterns: [
            { include: "#annotations" },
            { include: "#basic" },
            {
              match: /(=)/dgv,
              name: "keyword.operator.assignment.bsl"
            },
            {
              match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)((?<==)[0-9_a-zA-ZſKа-яА-ЯЁё]+)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgv,
              name: "invalid.illegal.bsl"
            },
            {
              match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)((?<==\p{space})\p{space}*[0-9_a-zA-ZſKа-яА-ЯЁё]+)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgv,
              name: "invalid.illegal.bsl"
            },
            {
              match: /[0-9_a-zа-яё]+/dgiv,
              name: "variable.annotation.bsl"
            }
          ]
        },
        {
          match: /(&([0-9_a-zа-яё]+))/dgiv,
          name: "storage.type.annotation.bsl"
        }
      ]
    },
    basic: {
      patterns: [
        {
          begin: /\/\//dgv,
          end: /(?=\n?$)/dgv,
          name: "comment.line.double-slash.bsl"
        },
        {
          begin: /"/dgv,
          end: /"(?!")/dgv,
          name: "string.quoted.double.bsl",
          patterns: [
            { include: "#query" },
            {
              match: /""/dgv,
              name: "constant.character.escape.bsl"
            },
            {
              match: /^(\p{space}*\/\/[^\n]*)(?=\n?$)/dgv,
              name: "comment.line.double-slash.bsl"
            }
          ]
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Неопределено|Undefined|Истина|True|Ложь|False|NULL)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
          name: "constant.language.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(\p{Nd}+\.?\p{Nd}*)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgv,
          name: "constant.numeric.bsl"
        },
        {
          match: /'((\p{Nd}{4}[^'\p{Nd}]*\p{Nd}{2}[^'\p{Nd}]*\p{Nd}{2})([^'\p{Nd}]*\p{Nd}{2}[^'\p{Nd}]*\p{Nd}{2}([^'\p{Nd}]*\p{Nd}{2})?)?)'/dgv,
          name: "constant.other.date.bsl"
        },
        {
          match: /(,)/dgv,
          name: "keyword.operator.bsl"
        },
        {
          match: /(\()/dgv,
          name: "punctuation.bracket.begin.bsl"
        },
        {
          match: /(\))/dgv,
          name: "punctuation.bracket.end.bsl"
        }
      ]
    },
    miscellaneous: {
      patterns: [
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(НЕ|NOT|И|AND|ИЛИ|OR)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
          name: "keyword.operator.logical.bsl"
        },
        {
          match: /<=|>=|[\<\=\>]/dgv,
          name: "keyword.operator.comparison.bsl"
        },
        {
          match: /([\-\%\*\+\/])/dgv,
          name: "keyword.operator.arithmetic.bsl"
        },
        {
          match: /([\;\?])/dgv,
          name: "keyword.operator.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Новый|New)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(СтрДлина|StrLen|СокрЛ|TrimL|СокрП|TrimR|СокрЛП|TrimAll|Лев|Left|Прав|Right|Сред|Mid|СтрНайти|StrFind|ВРег|Upper|НРег|Lower|ТРег|Title|Символ|Char|КодСимвола|CharCode|ПустаяСтрока|IsBlankString|СтрЗаменить|StrReplace|СтрЧислоСтрок|StrLineCount|СтрПолучитьСтроку|StrGetLine|СтрЧислоВхождений|StrOccurrenceCount|СтрСравнить|StrCompare|СтрНачинаетсяС|StrStartWith|СтрЗаканчиваетсяНа|StrEndsWith|СтрРазделить|StrSplit|СтрСоединить|StrConcat)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Цел|Int|Окр|Round|ACos|ASin|ATan|Cos|Exp|Log|Log10|Pow|Sin|Sqrt|Tan)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Год|Year|Месяц|Month|День|Day|Час|Hour|Минута|Minute|Секунда|Second|НачалоГода|BegOfYear|НачалоДня|BegOfDay|НачалоКвартала|BegOfQuarter|НачалоМесяца|BegOfMonth|НачалоМинуты|BegOfMinute|НачалоНедели|BegOfWeek|НачалоЧаса|BegOfHour|КонецГода|EndOfYear|КонецДня|EndOfDay|КонецКвартала|EndOfQuarter|КонецМесяца|EndOfMonth|КонецМинуты|EndOfMinute|КонецНедели|EndOfWeek|КонецЧаса|EndOfHour|НеделяГода|WeekOfYear|ДеньГода|DayOfYear|ДеньНедели|WeekDay|ТекущаяДата|CurrentDate|ДобавитьМесяц|AddMonth)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Тип|Type|ТипЗнч|TypeOf)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Булево|Boolean|Число|Number|Строка|String|Дата|Date)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ПоказатьВопрос|ShowQueryBox|Вопрос|DoQueryBox|ПоказатьПредупреждение|ShowMessageBox|Предупреждение|DoMessageBox|Сообщить|Message|ОчиститьСообщения|ClearMessages|ОповеститьОбИзменении|NotifyChanged|Состояние|Status|Сигнал|Beep|ПоказатьЗначение|ShowValue|ОткрытьЗначение|OpenValue|Оповестить|Notify|ОбработкаПрерыванияПользователя|UserInterruptProcessing|ОткрытьСодержаниеСправки|OpenHelpContent|ОткрытьИндексСправки|OpenHelpIndex|ОткрытьСправку|OpenHelp|ПоказатьИнформациюОбОшибке|ShowErrorInfo|КраткоеПредставлениеОшибки|BriefErrorDescription|ПодробноеПредставлениеОшибки|DetailErrorDescription|ПолучитьФорму|GetForm|ЗакрытьСправку|CloseHelp|ПоказатьОповещениеПользователя|ShowUserNotification|ОткрытьФорму|OpenForm|ОткрытьФормуМодально|OpenFormModal|АктивноеОкно|ActiveWindow|ВыполнитьОбработкуОповещения|ExecuteNotifyProcessing)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ПоказатьВводЗначения|ShowInputValue|ВвестиЗначение|InputValue|ПоказатьВводЧисла|ShowInputNumber|ВвестиЧисло|InputNumber|ПоказатьВводСтроки|ShowInputString|ВвестиСтроку|InputString|ПоказатьВводДаты|ShowInputDate|ВвестиДату|InputDate)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Формат|Format|ЧислоПрописью|NumberInWords|НСтр|NStr|ПредставлениеПериода|PeriodPresentation|СтрШаблон|StrTemplate)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ПолучитьОбщийМакет|GetCommonTemplate|ПолучитьОбщуюФорму|GetCommonForm|ПредопределенноеЗначение|PredefinedValue|ПолучитьПолноеИмяПредопределенногоЗначения|GetPredefinedValueFullName)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ПолучитьЗаголовокСистемы|GetCaption|ПолучитьСкоростьКлиентскогоСоединения|GetClientConnectionSpeed|ПодключитьОбработчикОжидания|AttachIdleHandler|УстановитьЗаголовокСистемы|SetCaption|ОтключитьОбработчикОжидания|DetachIdleHandler|ИмяКомпьютера|ComputerName|ЗавершитьРаботуСистемы|Exit|ИмяПользователя|UserName|ПрекратитьРаботуСистемы|Terminate|ПолноеИмяПользователя|UserFullName|ЗаблокироватьРаботуПользователя|LockApplication|КаталогПрограммы|BinDir|КаталогВременныхФайлов|TempFilesDir|ПравоДоступа|AccessRight|РольДоступна|IsInRole|ТекущийЯзык|CurrentLanguage|ТекущийКодЛокализации|CurrentLocaleCode|СтрокаСоединенияИнформационнойБазы|InfoBaseConnectionString|ПодключитьОбработчикОповещения|AttachNotificationHandler|ОтключитьОбработчикОповещения|DetachNotificationHandler|ПолучитьСообщенияПользователю|GetUserMessages|ПараметрыДоступа|AccessParameters|ПредставлениеПриложения|ApplicationPresentation|ТекущийЯзыкСистемы|CurrentSystemLanguage|ЗапуститьСистему|RunSystem|ТекущийРежимЗапуска|CurrentRunMode|УстановитьЧасовойПоясСеанса|SetSessionTimeZone|ЧасовойПоясСеанса|SessionTimeZone|ТекущаяДатаСеанса|CurrentSessionDate|УстановитьКраткийЗаголовокПриложения|SetShortApplicationCaption|ПолучитьКраткийЗаголовокПриложения|GetShortApplicationCaption|ПредставлениеПрава|RightPresentation|ВыполнитьПроверкуПравДоступа|VerifyAccessRights|РабочийКаталогДанныхПользователя|UserDataWorkDir|КаталогДокументов|DocumentsDir|ПолучитьИнформациюЭкрановКлиента|GetClientDisplaysInformation|ТекущийВариантОсновногоШрифтаКлиентскогоПриложения|ClientApplicationBaseFontCurrentVariant|ТекущийВариантИнтерфейсаКлиентскогоПриложения|ClientApplicationInterfaceCurrentVariant|УстановитьЗаголовокКлиентскогоПриложения|SetClientApplicationCaption|ПолучитьЗаголовокКлиентскогоПриложения|GetClientApplicationCaption|НачатьПолучениеКаталогаВременныхФайлов|BeginGettingTempFilesDir|НачатьПолучениеКаталогаДокументов|BeginGettingDocumentsDir|НачатьПолучениеРабочегоКаталогаДанныхПользователя|BeginGettingUserDataWorkDir|ПодключитьОбработчикЗапросаНастроекКлиентаЛицензирования|AttachLicensingClientParametersRequestHandler|ОтключитьОбработчикЗапросаНастроекКлиентаЛицензирования|DetachLicensingClientParametersRequestHandler|КаталогБиблиотекиМобильногоУстройства|MobileDeviceLibraryDir)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ЗначениеВСтрокуВнутр|ValueToStringInternal|ЗначениеИзСтрокиВнутр|ValueFromStringInternal|ЗначениеВФайл|ValueToFile|ЗначениеИзФайла|ValueFromFile)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(КомандаСистемы|System|ЗапуститьПриложение|RunApp|ПолучитьCOMОбъект|GetCOMObject|ПользователиОС|OSUsers|НачатьЗапускПриложения|BeginRunningApplication)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ПодключитьВнешнююКомпоненту|AttachAddIn|НачатьУстановкуВнешнейКомпоненты|BeginInstallAddIn|УстановитьВнешнююКомпоненту|InstallAddIn|НачатьПодключениеВнешнейКомпоненты|BeginAttachingAddIn)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(КопироватьФайл|FileCopy|ПереместитьФайл|MoveFile|УдалитьФайлы|DeleteFiles|НайтиФайлы|FindFiles|СоздатьКаталог|CreateDirectory|ПолучитьИмяВременногоФайла|GetTempFileName|РазделитьФайл|SplitFile|ОбъединитьФайлы|MergeFiles|ПолучитьФайл|GetFile|НачатьПомещениеФайла|BeginPutFile|ПоместитьФайл|PutFile|ЭтоАдресВременногоХранилища|IsTempStorageURL|УдалитьИзВременногоХранилища|DeleteFromTempStorage|ПолучитьИзВременногоХранилища|GetFromTempStorage|ПоместитьВоВременноеХранилище|PutToTempStorage|ПодключитьРасширениеРаботыСФайлами|AttachFileSystemExtension|НачатьУстановкуРасширенияРаботыСФайлами|BeginInstallFileSystemExtension|УстановитьРасширениеРаботыСФайлами|InstallFileSystemExtension|ПолучитьФайлы|GetFiles|ПоместитьФайлы|PutFiles|ЗапроситьРазрешениеПользователя|RequestUserPermission|ПолучитьМаскуВсеФайлы|GetAllFilesMask|ПолучитьМаскуВсеФайлыКлиента|GetClientAllFilesMask|ПолучитьМаскуВсеФайлыСервера|GetServerAllFilesMask|ПолучитьРазделительПути|GetPathSeparator|ПолучитьРазделительПутиКлиента|GetClientPathSeparator|ПолучитьРазделительПутиСервера|GetServerPathSeparator|НачатьПодключениеРасширенияРаботыСФайлами|BeginAttachingFileSystemExtension|НачатьЗапросРазрешенияПользователя|BeginRequestingUserPermission|НачатьПоискФайлов|BeginFindingFiles|НачатьСозданиеКаталога|BeginCreatingDirectory|НачатьКопированиеФайла|BeginCopyingFile|НачатьПеремещениеФайла|BeginMovingFile|НачатьУдалениеФайлов|BeginDeletingFiles|НачатьПолучениеФайлов|BeginGettingFiles|НачатьПомещениеФайлов|BeginPuttingFiles|НачатьСозданиеДвоичныхДанныхИзФайла|BeginCreateBinaryDataFromFile)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: new EmulatedRegExp("(?<=[^\\.а-яё\\p{L}\\p{M}\\p{N}\\p{Pc}]|^)(НачатьТранзакцию|BeginTransaction|ЗафиксироватьТранзакцию|CommitTransaction|ОтменитьТранзакцию|RollbackTransaction|УстановитьМонопольныйРежим|SetExclusiveMode|МонопольныйРежим|ExclusiveMode|ПолучитьОперативнуюОтметкуВремени|GetRealTimeTimestamp|ПолучитьСоединенияИнформационнойБазы|GetInfoBaseConnections|НомерСоединенияИнформационнойБазы|InfoBaseConnectionNumber|КонфигурацияИзменена|ConfigurationChanged|КонфигурацияБазыДанныхИзмененаДинамически|DataBaseConfigurationChangedDynamically|УстановитьВремяОжиданияБлокировкиДанных|SetLockWaitTime|ОбновитьНумерациюОбъектов|RefreshObjectsNumbering|ПолучитьВремяОжиданияБлокировкиДанных|GetLockWaitTime|КодЛокализацииИнформационнойБазы|InfoBaseLocaleCode|УстановитьМинимальнуюДлинуПаролейПользователей|SetUserPasswordMinLength|ПолучитьМинимальнуюДлинуПаролейПользователей|GetUserPasswordMinLength|ИнициализироватьПредопределенныеДанные|InitializePredefinedData|УдалитьДанныеИнформационнойБазы|EraseInfoBaseData|УстановитьПроверкуСложностиПаролейПользователей|SetUserPasswordStrengthCheck|ПолучитьПроверкуСложностиПаролейПользователей|GetUserPasswordStrengthCheck|ПолучитьСтруктуруХраненияБазыДанных|GetDBStorageStructureInfo|УстановитьПривилегированныйРежим|SetPrivilegedMode|ПривилегированныйРежим|PrivilegedMode|ТранзакцияАктивна|TransactionActive|НеобходимостьЗавершенияСоединения|ConnectionStopRequest|НомерСеансаИнформационнойБазы|InfoBaseSessionNumber|ПолучитьСеансыИнформационнойБазы|GetInfoBaseSessions|ЗаблокироватьДанныеДляРедактирования|LockDataForEdit|УстановитьСоединениеСВнешнимИсточникомДанных|ConnectExternalDataSource|РазблокироватьДанныеДляРедактирования|UnlockDataForEdit|РазорватьСоединениеСВнешнимИсточникомДанных|DisconnectExternalDataSource|ПолучитьБлокировкуСеансов|GetSessionsLock|УстановитьБлокировкуСеансов|SetSessionsLock|ОбновитьПовторноИспользуемыеЗначения|RefreshReusableValues|УстановитьБезопасныйРежим|SetSafeMode|БезопасныйРежим|SafeMode|ПолучитьДанныеВыбора|GetChoiceData|УстановитьЧасовойПоясИнформационнойБазы|SetInfoBaseTimeZone|ПолучитьЧасовойПоясИнформационнойБазы|GetInfoBaseTimeZone|ПолучитьОбновлениеКонфигурацииБазыДанных|GetDataBaseConfigurationUpdate|УстановитьБезопасныйРежимРазделенияДанных|SetDataSeparationSafeMode|БезопасныйРежимРазделенияДанных|DataSeparationSafeMode|УстановитьВремяЗасыпанияПассивногоСеанса|SetPassiveSessionHibernateTime|ПолучитьВремяЗасыпанияПассивногоСеанса|GetPassiveSessionHibernateTime|УстановитьВремяЗавершенияСпящегоСеанса|SetHibernateSessionTerminateTime|ПолучитьВремяЗавершенияСпящегоСеанса|GetHibernateSessionTerminateTime|ПолучитьТекущийСеансИнформационнойБазы|GetCurrentInfoBaseSession|ПолучитьИдентификаторКонфигурации|GetConfigurationID|УстановитьНастройкиКлиентаЛицензирования|SetLicensingClientParameters|ПолучитьИмяКлиентаЛицензирования|GetLicensingClientName|ПолучитьДополнительныйПараметрКлиентаЛицензирования|GetLicensingClientAdditionalParameter|ПолучитьОтключениеБезопасногоРежима|GetSafeModeDisabled|УстановитьОтключениеБезопасногоРежима|SetSafeModeDisabled)\\p{space}*(?=\\()", "dgiv", { lazyCompile: true }),
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(НайтиПомеченныеНаУдаление|FindMarkedForDeletion|НайтиПоСсылкам|FindByRef|УдалитьОбъекты|DeleteObjects|УстановитьОбновлениеПредопределенныхДанныхИнформационнойБазы|SetInfoBasePredefinedDataUpdate|ПолучитьОбновлениеПредопределенныхДанныхИнформационнойБазы|GetInfoBasePredefinedData)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(XMLСтрока|XMLString|XMLЗначение|XMLValue|XMLТип|XMLType|XMLТипЗнч|XMLTypeOf|ИзXMLТипа|FromXMLType|ВозможностьЧтенияXML|CanReadXML|ПолучитьXMLТип|GetXMLType|ПрочитатьXML|ReadXML|ЗаписатьXML|WriteXML|НайтиНедопустимыеСимволыXML|FindDisallowedXMLCharacters|ИмпортМоделиXDTO|ImportXDTOModel|СоздатьФабрикуXDTO|CreateXDTOFactory)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ЗаписатьJSON|WriteJSON|ПрочитатьJSON|ReadJSON|ПрочитатьДатуJSON|ReadJSONDate|ЗаписатьДатуJSON|WriteJSONDate)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ЗаписьЖурналаРегистрации|WriteLogEvent|ПолучитьИспользованиеЖурналаРегистрации|GetEventLogUsing|УстановитьИспользованиеЖурналаРегистрации|SetEventLogUsing|ПредставлениеСобытияЖурналаРегистрации|EventLogEventPresentation|ВыгрузитьЖурналРегистрации|UnloadEventLog|ПолучитьЗначенияОтбораЖурналаРегистрации|GetEventLogFilterValues|УстановитьИспользованиеСобытияЖурналаРегистрации|SetEventLogEventUse|ПолучитьИспользованиеСобытияЖурналаРегистрации|GetEventLogEventUse|СкопироватьЖурналРегистрации|CopyEventLog|ОчиститьЖурналРегистрации|ClearEventLog)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ЗначениеВДанныеФормы|ValueToFormData|ДанныеФормыВЗначение|FormDataToValue|КопироватьДанныеФормы|CopyFormData|УстановитьСоответствиеОбъектаИФормы|SetObjectAndFormConformity|ПолучитьСоответствиеОбъектаИФормы|GetObjectAndFormConformity)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ПолучитьФункциональнуюОпцию|GetFunctionalOption|ПолучитьФункциональнуюОпциюИнтерфейса|GetInterfaceFunctionalOption|УстановитьПараметрыФункциональныхОпцийИнтерфейса|SetInterfaceFunctionalOptionParameters|ПолучитьПараметрыФункциональныхОпцийИнтерфейса|GetInterfaceFunctionalOptionParameters|ОбновитьИнтерфейс|RefreshInterface)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(УстановитьРасширениеРаботыСКриптографией|InstallCryptoExtension|НачатьУстановкуРасширенияРаботыСКриптографией|BeginInstallCryptoExtension|ПодключитьРасширениеРаботыСКриптографией|AttachCryptoExtension|НачатьПодключениеРасширенияРаботыСКриптографией|BeginAttachingCryptoExtension)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(УстановитьСоставСтандартногоИнтерфейсаOData|SetStandardODataInterfaceContent|ПолучитьСоставСтандартногоИнтерфейсаOData|GetStandardODataInterfaceContent)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(СоединитьБуферыДвоичныхДанных|ConcatBinaryDataBuffers)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Мин|Min|Макс|Max|ОписаниеОшибки|ErrorDescription|Вычислить|Eval|ИнформацияОбОшибке|ErrorInfo|Base64Значение|Base64Value|Base64Строка|Base64String|ЗаполнитьЗначенияСвойств|FillPropertyValues|ЗначениеЗаполнено|ValueIsFilled|ПолучитьПредставленияНавигационныхСсылок|GetURLsPresentations|НайтиОкноПоНавигационнойСсылке|FindWindowByURL|ПолучитьОкна|GetWindows|ПерейтиПоНавигационнойСсылке|GotoURL|ПолучитьНавигационнуюСсылку|GetURL|ПолучитьДопустимыеКодыЛокализации|GetAvailableLocaleCodes|ПолучитьНавигационнуюСсылкуИнформационнойБазы|GetInfoBaseURL|ПредставлениеКодаЛокализации|LocaleCodePresentation|ПолучитьДопустимыеЧасовыеПояса|GetAvailableTimeZones|ПредставлениеЧасовогоПояса|TimeZonePresentation|ТекущаяУниверсальнаяДата|CurrentUniversalDate|ТекущаяУниверсальнаяДатаВМиллисекундах|CurrentUniversalDateInMilliseconds|МестноеВремя|ToLocalTime|УниверсальноеВремя|ToUniversalTime|ЧасовойПояс|TimeZone|СмещениеЛетнегоВремени|DaylightTimeOffset|СмещениеСтандартногоВремени|StandardTimeOffset|КодироватьСтроку|EncodeString|РаскодироватьСтроку|DecodeString|Найти|Find|ПродолжитьВызов|ProceedWithCall)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ПередНачаломРаботыСистемы|BeforeStart|ПриНачалеРаботыСистемы|OnStart|ПередЗавершениемРаботыСистемы|BeforeExit|ПриЗавершенииРаботыСистемы|OnExit|ОбработкаВнешнегоСобытия|ExternEventProcessing|УстановкаПараметровСеанса|SessionParametersSetting|ПриИзмененииПараметровЭкрана|OnChangeDisplaySettings)\p{space}*(?=\()/dgiv,
          name: "support.function.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(WSСсылки|WSReferences|БиблиотекаКартинок|PictureLib|БиблиотекаМакетовОформленияКомпоновкиДанных|DataCompositionAppearanceTemplateLib|БиблиотекаСтилей|StyleLib|БизнесПроцессы|BusinessProcesses|ВнешниеИсточникиДанных|ExternalDataSources|ВнешниеОбработки|ExternalDataProcessors|ВнешниеОтчеты|ExternalReports|Документы|Documents|ДоставляемыеУведомления|DeliverableNotifications|ЖурналыДокументов|DocumentJournals|Задачи|Tasks|ИнформацияОбИнтернетСоединении|InternetConnectionInformation|ИспользованиеРабочейДаты|WorkingDateUse|ИсторияРаботыПользователя|UserWorkHistory|Константы|Constants|КритерииОтбора|FilterCriteria|Метаданные|Metadata|Обработки|DataProcessors|ОтправкаДоставляемыхУведомлений|DeliverableNotificationSend|Отчеты|Reports|ПараметрыСеанса|SessionParameters|Перечисления|Enums|ПланыВидовРасчета|ChartsOfCalculationTypes|ПланыВидовХарактеристик|ChartsOfCharacteristicTypes|ПланыОбмена|ExchangePlans|ПланыСчетов|ChartsOfAccounts|ПолнотекстовыйПоиск|FullTextSearch|ПользователиИнформационнойБазы|InfoBaseUsers|Последовательности|Sequences|РасширенияКонфигурации|ConfigurationExtensions|РегистрыБухгалтерии|AccountingRegisters|РегистрыНакопления|AccumulationRegisters|РегистрыРасчета|CalculationRegisters|РегистрыСведений|InformationRegisters|РегламентныеЗадания|ScheduledJobs|СериализаторXDTO|XDTOSerializer|Справочники|Catalogs|СредстваГеопозиционирования|LocationTools|СредстваКриптографии|CryptoToolsManager|СредстваМультимедиа|MultimediaTools|СредстваОтображенияРекламы|AdvertisingPresentationTools|СредстваПочты|MailTools|СредстваТелефонии|TelephonyTools|ФабрикаXDTO|XDTOFactory|ФайловыеПотоки|FileStreams|ФоновыеЗадания|BackgroundJobs|ХранилищаНастроек|SettingsStorages|ВстроенныеПокупки|InAppPurchases|ОтображениеРекламы|AdRepresentation|ПанельЗадачОС|OSTaskbar|ПроверкаВстроенныхПокупок|InAppPurchasesValidation)(?=[^а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
          name: "support.class.bsl"
        },
        {
          match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ГлавныйИнтерфейс|MainInterface|ГлавныйСтиль|MainStyle|ПараметрЗапуска|LaunchParameter|РабочаяДата|WorkingDate|ХранилищеВариантовОтчетов|ReportsVariantsStorage|ХранилищеНастроекДанныхФорм|FormDataSettingsStorage|ХранилищеОбщихНастроек|CommonSettingsStorage|ХранилищеПользовательскихНастроекДинамическихСписков|DynamicListsUserSettingsStorage|ХранилищеПользовательскихНастроекОтчетов|ReportsUserSettingsStorage|ХранилищеСистемныхНастроек|SystemSettingsStorage)(?=[^а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
          name: "support.variable.bsl"
        }
      ]
    },
    query: {
      begin: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Выбрать|Select(\p{space}+Разрешенные|\p{space}+Allowed)?(\p{space}+Различные|\p{space}+Distinct)?(\p{space}+Первые|\p{space}+Top)?)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      beginCaptures: {
        "1": { name: "keyword.control.sdbl" }
      },
      end: /(?="[^"])/dgv,
      patterns: [
        {
          begin: /^\p{space}*\/\//dgv,
          end: /(?=\n?$)/dgv,
          name: "comment.line.double-slash.bsl"
        },
        {
          match: /(\/\/(("")|[^"])*)/dgv,
          name: "comment.line.double-slash.sdbl"
        },
        {
          match: /""[^"]*""/dgv,
          name: "string.quoted.double.sdbl"
        },
        { include: "source.sdbl" }
      ]
    }
  },
  dependencies: [
    "sdbl"
  ]
};
