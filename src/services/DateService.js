/**
 * Сервис для работы с датами: форматирование, генерация диапазонов, локализация.
 */
export class DateService {
  /**
   * Массив английских названий месяцев.
   * @returns {string[]}
   */
  static get MONTHS() {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  /**
   * Массив локализованных (русских) названий месяцев.
   * @returns {string[]}
   */
  static get LOCAL_MONTHS() {
    return [
      'Янв.',
      'Фев.',
      'Март',
      'Апр.',
      'Май',
      'Июнь',
      'Июль',
      'Авг.',
      'Сент.',
      'Окт.',
      'Нояб.',
      'Дек.',
    ];
  }

  /**
   * Массив английских названий дней недели.
   * @returns {string[]}
   */
  static get DAYS() {
    return ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday', 'Saturday'];
  }

  /**
   * Форматирует объект Date в строку формата ISO (YYYY-MM-DD).
   * @param {Date} date - Дата для форматирования.
   * @returns {string} Строка в формате ISO.
   */
  static formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Преобразует строку даты из формата DD.MM.YYYY в YYYY-MM-DD.
   * @param {string} dateString - Строка даты в формате DD.MM.YYYY.
   * @returns {string} Строка даты в формате YYYY-MM-DD.
   */
  static splitAndFormatDate(dateString) {
    const dateParts = dateString.split('.');
    return dateParts.reverse().join('-');
  }

  /**
   * Форматирует строку даты для отображения (например, "Monday, January 1, 2023").
   * @param {string} dateString - Строка даты.
   * @returns {string} Отформатированная строка для отображения.
   */
  static formatDateForDisplay(dateString) {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = DateService.MONTHS[date.getMonth()];
    const day = date.getDate();
    const weekDay = DateService.DAYS[date.getDay()];

    return `${weekDay}, ${month} ${day}, ${year}`;
  }

  /**
   * Генерирует массив дат в диапазоне от startDate до endDate (включительно).
   * @param {Date} startDate - Начальная дата.
   * @param {Date} endDate - Конечная дата.
   * @returns {Date[]} Массив объектов Date в диапазоне.
   */
  static generateDateRange(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate.getTime()));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}
