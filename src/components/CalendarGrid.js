import { ContributionCalculator } from '@services/ContributionCalculator.js';
import { DateService } from '@services/DateService.js';
import { DomUtils } from '@utils/DomUtils.js';
import { Square } from './Square.js';

/**
 * Класс для управления сеткой календаря
 * Отвечает за создание и управление сеткой квадратов контрибьютов
 */
export class CalendarGrid {
  selectors = {
    squaresContainer: '.squares',
    monthsContainer: '.months',
  };

  constructor() {
    this.squaresContainer = document.querySelector(this.selectors.squaresContainer);
    this.monthsContainer = document.querySelector(this.selectors.monthsContainer);
  }

  /**
   * Создает сетку календаря для заданного диапазона дат
   * @param {Date} startDate - Начальная дата
   * @param {Date} endDate - Конечная дата
   * @param {Object} contributionData - Данные о вкладах
   */
  createGrid(startDate, endDate, contributionData = {}) {
    this.renderMonths();
    const dates = DateService.generateDateRange(startDate, endDate);

    // Используем DocumentFragment для оптимизации рендера в DOM
    const fragment = document.createDocumentFragment();
    for (const date of dates) {
      const dateString = DateService.formatDateToISO(date); // прим.: 2024-07-15
      const contributionInfo = this.findDataForDate(contributionData, dateString); // прим.: ['2024-07-15', 21]

      const contributionCount = contributionInfo ? contributionInfo[1] : 0;
      const contributionLevel =
        ContributionCalculator.calculateContributionLevel(contributionCount); // 0 - 4

      const square = new Square(contributionLevel, [dateString, contributionCount]);
      const squareElement = square.getElement();

      fragment.appendChild(squareElement);
    }
    this.squaresContainer.appendChild(fragment);
  }

  /**
   * Находит данные для конкретной даты
   * @param {Object} data - Объект с данными о вкладах
   * @param {string} dateString - Дата в формате YYYY-MM-DD
   * @returns {Array|null} Массив с датой и количеством контрибьютов или null
   */
  findDataForDate(data, dateString) {
    return Object.entries(data).find(([date]) => date === dateString) || null;
  }

  /**
   * Создает отображение месяцев
   * @param {number} monthsCount - Количество месяцев для отображения
   */
  renderMonths(monthsCount = 12) {
    for (let i = 0; i < monthsCount; i++) {
      const currentDate = new Date();
      const previousMonthTime = currentDate.setMonth(currentDate.getMonth() - i);
      const monthNumber = new Date(previousMonthTime).getMonth();

      const monthElement = this.createMonthElement(monthNumber);
      this.monthsContainer.prepend(monthElement);
    }
  }

  /**
   * Создает элемент месяца
   * @param {number} monthNumber - Номер месяца (0-11)
   * @returns {HTMLLIElement} Элемент месяца
   */
  createMonthElement(monthNumber) {
    const monthElement = DomUtils.createElement('li', {}, DateService.LOCAL_MONTHS[monthNumber]);
    DomUtils.addClass(monthElement, 'month');

    return monthElement;
  }
}
