export default {
  name: "sdbl",
  displayName: "1C (Query)",
  aliases: [
    "1c-query"
  ],
  scopeName: "source.sdbl",
  patterns: [
    {
      match: /^(\p{space}*\/\/[^\n]*)(?=\n?$)/dgv,
      name: "comment.line.double-slash.sdbl"
    },
    {
      begin: /\/\//dgv,
      end: /(?=\n?$)/dgv,
      name: "comment.line.double-slash.sdbl"
    },
    {
      begin: /"/dgv,
      end: /"(?!")/dgv,
      name: "string.quoted.double.sdbl",
      patterns: [
        {
          match: /""/dgv,
          name: "constant.character.escape.sdbl"
        },
        {
          match: /^(\p{space}*\/\/[^\n]*)(?=\n?$)/dgv,
          name: "comment.line.double-slash.sdbl"
        }
      ]
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Неопределено|Undefined|Истина|True|Ложь|False|NULL)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "constant.language.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(\p{Nd}+\.?\p{Nd}*)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgv,
      name: "constant.numeric.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Выбор|Case|Когда|When|Тогда|Then|Иначе|Else|Конец|End)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "keyword.control.conditional.sdbl"
    },
    {
      match: /(?<!КАК\p{space}|AS\p{space})(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(НЕ|NOT|И|AND|ИЛИ|OR|В\p{space}+ИЕРАРХИИ|IN\p{space}+HIERARCHY|В|In|Между|Between|Есть(\p{space}+НЕ)?\p{space}+NULL|Is(\p{space}+NOT)?\p{space}+NULL|Ссылка|Refs|Подобно|Like)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "keyword.operator.logical.sdbl"
    },
    {
      match: /<=|>=|[\<\=\>]/dgv,
      name: "keyword.operator.comparison.sdbl"
    },
    {
      match: /([\-\%\*\+\/])/dgv,
      name: "keyword.operator.arithmetic.sdbl"
    },
    {
      match: /([\,\;])/dgv,
      name: "keyword.operator.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Выбрать|Select|Разрешенные|Allowed|Различные|Distinct|Первые|Top|Как|As|ПустаяТаблица|EmptyTable|Поместить|Into|Уничтожить|Drop|Из|From|((Левое|Left|Правое|Right|Полное|Full)\p{space}+(Внешнее\p{space}+|Outer\p{space}+)?Соединение|Join)|((Внутреннее|Inner)\p{space}+Соединение|Join)|Где|Where|(Сгруппировать\p{space}+По(\p{space}+Группирующим\p{space}+Наборам)?)|(Group\p{space}+By(\p{space}+Grouping\p{space}+Set)?)|Имеющие|Having|Объединить(\p{space}+Все)?|Union(\p{space}+All)?|(Упорядочить\p{space}+По)|(Order\p{space}+By)|Автоупорядочивание|Autoorder|Итоги|Totals|По(\p{space}+Общие)?|By(\p{space}+Overall)?|(Только\p{space}+)?Иерархия|(Only\p{space}+)?Hierarchy|Периодами|Periods|Индексировать|Index|Выразить|Cast|Возр|Asc|Убыв|Desc|Для\p{space}+Изменения|(For\p{space}+Update(\p{space}+Of)?)|Спецсимвол|Escape|СгруппированоПо|GroupedBy)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "keyword.control.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Значение|Value|ДатаВремя|DateTime|Тип|Type)(?=\()/dgiv,
      name: "support.function.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Подстрока|Substring|НРег|Lower|ВРег|Upper|Лев|Left|Прав|Right|ДлинаСтроки|StringLength|СтрНайти|StrFind|СтрЗаменить|StrReplace|СокрЛП|TrimAll|СокрЛ|TrimL|СокрП|TrimR)(?=\()/dgiv,
      name: "support.function.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Год|Year|Квартал|Quarter|Месяц|Month|ДеньГода|DayOfYear|День|Day|Неделя|Week|ДеньНедели|Weekday|Час|Hour|Минута|Minute|Секунда|Second|НачалоПериода|BeginOfPeriod|КонецПериода|EndOfPeriod|ДобавитьКДате|DateAdd|РазностьДат|DateDiff|Полугодие|HalfYear|Декада|TenDays)(?=\()/dgiv,
      name: "support.function.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ACOS|COS|ASIN|SIN|ATAN|TAN|EXP|POW|LOG|LOG10|Цел|Int|Окр|Round|SQRT)(?=\()/dgiv,
      name: "support.function.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(Сумма|Sum|Среднее|Avg|Минимум|Min|Максимум|Max|Количество|Count)(?=\()/dgiv,
      name: "support.function.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|^)(ЕстьNULL|IsNULL|Представление|Presentation|ПредставлениеСсылки|RefPresentation|ТипЗначения|ValueType|АвтономерЗаписи|RecordAutoNumber|РазмерХранимыхДанных|StoredDataSize|УникальныйИдентификатор|UUID)(?=\()/dgiv,
      name: "support.function.sdbl"
    },
    {
      match: /(?<=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}])(Число|Number|Строка|String|Дата|Date|Булево|Boolean)(?=[^\.а-яё\p{L}\p{M}\p{N}\p{Pc}]|(?=\n?$))/dgiv,
      name: "support.type.sdbl"
    },
    {
      match: /(&[а-яё\p{L}\p{M}\p{N}\p{Pc}]+)/dgv,
      name: "variable.parameter.sdbl"
    }
  ],
  dependencies: []
};
