export class DateService {
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

  static get DAYS() {
    return ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday', 'Saturday'];
  }

  static formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static splitAndFormatDate(dateString) {
    const dateParts = dateString.split('.');
    return dateParts.reverse().join('-');
  }

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
