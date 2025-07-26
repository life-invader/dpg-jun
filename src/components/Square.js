import { ContributionCalculator } from '@services/ContributionCalculator.js';
import { DateService } from '@services/DateService.js';
import { DomUtils } from '@utils/DomUtils.js';
import { Tooltip } from './Tooltip.js';

/**
 * Класс для представления квадрата контрибьюта
 * Отвечает за создание и управление отдельным квадратом
 */
export class Square {
  /**
   * @param {number} contributionLevel - Уровень вкладов (0-4)
   * @param {Array} contributionData - Данные о вкладах [дата, количество]
   */
  constructor(contributionLevel = 0, contributionData = []) {
    this.contributionLevel = contributionLevel;
    this.contributionData = contributionData;

    this.element = this.createElement();
  }

  /**
   * Создает DOM-элемент квадрата с aria-атрибутами для доступности
   * @returns {HTMLLIElement} Элемент квадрата
   */
  createElement() {
    const [date] = this.contributionData;
    const formattedDate = DateService.formatDateForDisplay(date);
    const contributionCount = ContributionCalculator.getContributionDescription(
      this.contributionLevel,
    );
    const contributionLevel = this.contributionLevel.toString();
    const ariaLabel = `${contributionCount} contributions, ${formattedDate}`;

    const squareElement = DomUtils.createElementFromString(
      this.getSquareMarkup(contributionLevel, ariaLabel),
    );

    this.element = squareElement;
    this.element.instance = this;
    this.attachEventListeners();

    return squareElement;
  }

  /**
   * Возвращает DOM-элемент квадрата
   * @returns {HTMLLIElement} Элемент квадрата
   */
  getElement() {
    return this.element;
  }

  /**
   * Привязывает обработчики событий к квадрату
   */
  attachEventListeners() {
    if (!this.element) return;

    this.element.addEventListener('click', this.handleClick);
  }

  /**
   * Обработчик клика по квадрату
   * @param {Event} event - Событие клика
   */
  handleClick = () => {
    this.showTooltip();
  };

  /**
   * Показывает подсказку с информацией о вкладах
   */
  showTooltip() {
    const [date] = this.contributionData;
    const square = this.getElement();

    const formattedDate = DateService.formatDateForDisplay(date); // Прим.: Понедельник, December 16, 2024
    const contributionCount = ContributionCalculator.getContributionDescription(
      this.contributionLevel,
    );

    const event = new CustomEvent(Tooltip.eventNames.show, {
      bubbles: true,
      detail: { contributionCount, date: formattedDate, datetime: date },
    });
    square.dispatchEvent(event);
  }

  /**
   * Возвращает HTML-разметку квадрата
   * @param {string} contributionLevel - Уровень вклада в виде строки
   * @param {string} ariaLabel - Описание для aria-label
   * @returns {string} HTML-разметка квадрата
   */
  getSquareMarkup(contributionLevel, ariaLabel) {
    return `
      <li data-color="${contributionLevel}" tabindex="0" aria-label="${ariaLabel}" class="square"></li>
    `;
  }

  /**
   * Устанавливает активное состояние для квадрата
   */
  setActiveState() {
    this.element.classList.add('square--active');
  }

  /**
   * Удаляет активное состояние у квадрата
   */
  removeActiveState() {
    this.element.classList.remove('square--active');
  }
}
