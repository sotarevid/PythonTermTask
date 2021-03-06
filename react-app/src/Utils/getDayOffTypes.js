function getDayOffTypes() {
    return [
        { type: "Б", text: "Временная нетрудоспособность с назначением пособия согласно законодательству" },
        { type: "ОТ", text: "Ежегодный основной оплачиваемый отпуск" },
        { type: "ОД", text: "Ежегодный дополнительный оплачиваемый отпуск" },
        { type: "ДО", text: "Отпуск без сохранения заработной платы, предоставленный работнику по разрешению работодателя" },
        { type: "ОЗ", text: "Отпуск без сохранения заработной платы при условиях, предусмотренных действующим законодательством Российской Федерации" },

        { type: "Т", text: "Временная нетрудоспособность без назначения пособия в случаях, предусмотренных законодательством" },
        { type: "ЛЧ", text: "Сокращенная продолжительность рабочего времени против нормальной продолжительности рабочего дня в случаях, предусмотренных законодательством" },
        { type: "ПВ", text: "Время вынужденного прогула в случае признания увольнения, перевода на другую работу или отстранения от работы незаконным с восстановлением на прежней работе" },
        { type: "Г", text: "Невыход на время исполнения государственных или общественных обязанностей согласно законодательству" },
        { type: "ПР", text: "Прогулы (отсутствие на рабочем месте без уважительных причин в течение времени, установленного законодательством)" },
        { type: "НС", text: "Продолжительность работы в режиме неполного рабочего дня по инициативе работодателя в случаях, предусмотренных законодательством " },
        { type: "ОВ", text: "Дополнительные выходные дни (оплачиваемые)" },
        { type: "НВ", text: "Дополнительные выходные дни (без сохранения заработной платы)" },
        { type: "ЗБ", text: "Забастовка (при условиях и в порядке, предусмотренных законом)" },
        { type: "НН", text: "Неявки по невыясненным причинам (до выяснения обстоятельств)" },
        { type: "РП", text: "Время простоя по вине работодателя" },
        { type: "НП", text: "Время простоя по причинам, не зависящим от работодателя и работника" },
        { type: "ВП", text: "Время простоя по вине работника" },
        { type: "НО", text: "Отстранение от работы (недопущение к работе) с оплатой (пособием) в соответствии с законодательством" },
        { type: "НБ", text: "Отстранение от работы (недопущение к работе) по причинам, предусмотренным законодательство, без начисления заработной платы" },
        { type: "НЗ", text: "Время приостановки работы в случае задержки выплаты заработной платы" },
        { type: "Я", text: "Продолжительность работы в дневное время" },
        { type: "Н", text: "Продолжительность работы в ночное время" },
        { type: "РВ", text: "Продолжительность работы в выходные и нерабочие праздничные дни" },
        { type: "С", text: "Продолжительность сверхурочной работы" },
        { type: "ВМ", text: "Продолжительность работы вахтовым методом" },
        { type: "К", text: "Служебная командировка" },
        { type: "ПК", text: "Повышение квалификации с отрывом от работы" },
        { type: "ПМ", text: "Повышение квалификации с отрывом от работы в другой местности" },
        { type: "У", text: "Дополнительный отпуск в связи с обучением с сохранением среднего заработка работникам, совмещающим работу с обучением" },
        { type: "УВ", text: "Сокращенная продолжительность рабочего времени для обучающихся без отрыва от производства с частичным сохранением заработной платы" },
        { type: "УД", text: "Дополнительный отпуск в связи с обучением без сохранения заработной платы" },
        { type: "Р", text: "Отпуск по беременности и родам (отпуск в связи с усыновлением новорожденного ребенка)" },
        { type: "ОЖ", text: "Отпуск по уходу за ребенком до достижения им возраста трех лет" },
        { type: "ДБ", text: "Отпуск без сохранения заработной платы при условиях, предусмотренных действующим законодательством Российской Федерации" },
    ]
}

export default getDayOffTypes;