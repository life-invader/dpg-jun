import { ContributionCalculator } from '@services/ContributionCalculator.js';
import { Tooltip } from './Tooltip.js';

/**
 * Класс для отображения примеров квадратов
 * Отвечает за создание и управление примерами квадратов контрибьютов
 */
export class ExampleSquaresRenderer {
  selectors = {
    exampleSquares: '.examples__list .square',
  };

  constructor() {
    this.exampleSquares = document.querySelectorAll(this.selectors.exampleSquares);
    this.attachEventListeners();
  }

  /**
   * Привязывает обработчики событий к примерам квадратов
   */
  attachEventListeners() {
    this.exampleSquares.forEach((square) => {
      square.addEventListener('click', this.squareClickHandler);
    });
  }

  squareClickHandler = (evt) => {
    const { currentTarget } = evt;

    const colorLevel = parseInt(currentTarget.dataset.color) || 0; // 0 - 4
    const contributionCount = ContributionCalculator.getContributionDescription(colorLevel);
    this.showExampleTooltip(currentTarget, contributionCount);
  };

  /**
   * Показывает подсказку для примера квадрата
   * @param {HTMLElement} square - Элемент квадрата
   * @param {string} description - Описание уровня вкладов
   */
  showExampleTooltip(square, contributionCount) {
    const event = new CustomEvent(Tooltip.eventNames.show, {
      bubbles: true,
      detail: { contributionCount },
    });
    square.dispatchEvent(event);
  }
}
