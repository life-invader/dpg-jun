import { ContributionCalculator } from '@services/ContributionCalculator.js';
import { DateService } from '@services/DateService.js';
import { DomUtils } from '@utils/DomUtils.js';
import { Square } from './Square.js';

export class CalendarGrid {
  selectors = {
    squaresContainer: '.squares',
    monthsContainer: '.months',
  };

  constructor() {
    this.squaresContainer = document.querySelector(this.selectors.squaresContainer);
    this.monthsContainer = document.querySelector(this.selectors.monthsContainer);
  }

  createGrid(startDate, endDate, contributionData = {}) {
    this.renderMonths();
    const dates = DateService.generateDateRange(startDate, endDate);

    // Используем DocumentFragment для оптимизации вставки в DOM
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

  findDataForDate(data, dateString) {
    return Object.entries(data).find(([date]) => date === dateString) || null;
  }

  renderMonths(monthsCount = 12) {
    for (let i = 0; i < monthsCount; i++) {
      const currentDate = new Date();
      const previousMonthTime = currentDate.setMonth(currentDate.getMonth() - i);
      const monthNumber = new Date(previousMonthTime).getMonth();

      const monthElement = this.createMonthElement(monthNumber);
      this.monthsContainer.prepend(monthElement);
    }
  }

  createMonthElement(monthNumber) {
    const monthElement = DomUtils.createElement('li', {}, DateService.LOCAL_MONTHS[monthNumber]);
    DomUtils.addClass(monthElement, 'month');

    return monthElement;
  }
}
