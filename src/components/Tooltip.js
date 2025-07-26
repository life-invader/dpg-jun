import { DomUtils } from '@utils/DomUtils.js';

/**
 * Класс для управления всплывающими подсказками (tooltip) в календаре
 *
 * Отвечает за отображение и скрытие подсказок при клике на квадраты календаря.
 * Подсказки показывают количество вкладов (contributions) и дату для выбранного дня.
 *
 * @class Tooltip
 * @example
 * const tooltip = new Tooltip();
 */
export class Tooltip {
  /**
   * Названия событий, используемых классом
   * @static
   * @type {Object}
   * @property {string} show - Событие показа подсказки
   * @property {string} click - Событие клика по документу
   */
  static eventNames = {
    show: 'tooltip:show',
    click: 'click',
  };

  /**
   * CSS селекторы для поиска элементов
   * @type {Object}
   * @property {string} square - Селектор для квадратов календаря
   */
  selectors = {
    square: '.square',
  };

  /**
   * Создает экземпляр класса Tooltip
   *
   * Инициализирует обработчики событий для показа и скрытия подсказок.
   *
   * @constructor
   */
  constructor() {
    /**
     * Текущая активная подсказка
     * @type {Object}
     * @property {HTMLElement|null} container - Контейнер подсказки
     * @property {HTMLElement|null} element - Элемент подсказки
     */
    this.currentTooltip = {
      container: null,
      element: null,
    };
    this.init();
  }

  /**
   * Инициализирует обработчики событий
   *
   * @private
   */
  init() {
    document.addEventListener(Tooltip.eventNames.show, this.squareClickHandler);
    document.addEventListener(Tooltip.eventNames.click, this.documentClickHandler);
  }

  /**
   * Обработчик клика по документу для скрытия подсказки
   *
   * Скрывает подсказку, если клик произошел вне квадрата календаря
   *
   * @private
   * @param {Event} evt - Событие клика
   */
  documentClickHandler = (evt) => {
    const { target } = evt;

    if (!target.closest(this.selectors.square)) {
      this.hideTooltip();
    }
  };

  /**
   * Обработчик события показа подсказки
   *
   * Показывает подсказку для выбранного квадрата календаря
   *
   * @private
   * @param {CustomEvent} evt - Событие показа подсказки
   * @param {HTMLElement} evt.target - Целевой элемент (квадрат календаря)
   * @param {Object} evt.detail - Данные для подсказки
   */
  squareClickHandler = (evt) => {
    const { target, detail } = evt;
    this.showTooltip(target, detail);
  };

  /**
   * Показывает подсказку для указанного контейнера
   *
   * Создает и отображает подсказку с информацией о вкладах и дате.
   * Если подсказка уже показана для этого контейнера, ничего не делает.
   *
   * @param {HTMLElement} container - Контейнер для размещения подсказки
   * @param {Object} data - Данные для отображения в подсказке
   * @param {number} data.contributionCount - Количество вкладов
   * @param {string} [data.date=''] - Отображаемая дата
   * @param {string} [data.datetime=''] - Атрибут datetime для элемента time
   * @returns {HTMLElement|null} Созданный элемент подсказки или null
   */
  showTooltip(container, data) {
    if (this.currentTooltip.container === container) {
      return;
    }

    const { contributionCount, date = '', datetime = '' } = data;
    this.hideTooltip();

    const node = DomUtils.createElementFromString(
      this.getTooltipMarkup(contributionCount, date, datetime),
    );
    container.append(node);
    this.saveTooltip({ container, element: node });

    return node;
  }

  /**
   * Скрывает текущую подсказку
   *
   * Удаляет элемент подсказки из DOM и сбрасывает состояние
   */
  hideTooltip() {
    const { element } = this.currentTooltip;
    element && element.remove();

    this.currentTooltip = {
      container: null,
      element: null,
    };
  }

  /**
   * Сохраняет информацию о текущей подсказке
   *
   * @private
   * @param {Object} cfg - Конфигурация подсказки
   * @param {HTMLElement} cfg.container - Контейнер подсказки
   * @param {HTMLElement} cfg.element - Элемент подсказки
   */
  saveTooltip(cfg) {
    this.currentTooltip = {
      ...cfg,
    };
  }

  /**
   * Генерирует HTML разметку для подсказки
   *
   * @param {number} contributionCount - Количество вкладов
   * @param {string} [date=''] - Отображаемая дата
   * @param {string} [datetime=''] - Атрибут datetime для элемента time
   * @returns {string} HTML разметка подсказки
   */
  getTooltipMarkup(contributionCount, date = '', datetime = '') {
    return `
        <div class='tooltip'>
          <p class='tooltip__text'>${contributionCount} contributions</p>
          ${date && `<time class='tooltip__date' datetime="${datetime}">${date}</time>`}
        </div>
        `;
  }
}
