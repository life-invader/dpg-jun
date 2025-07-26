/**
 * Утилитарный класс для работы с DOM: создание, изменение, удаление элементов и классов.
 */
export class DomUtils {
  /**
   * Создаёт DOM-элемент из HTML-строки.
   * @param {string} htmlString - HTML-строка для преобразования в элемент.
   * @returns {Element|null} Первый элемент из строки или null.
   */
  static createElementFromString(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstElementChild;
  }

  /**
   * Создаёт DOM-элемент с заданными атрибутами и текстом.
   * @param {string} tagName - Имя тега.
   * @param {Object} [attributes={}] - Атрибуты элемента.
   * @param {string} [textContent=''] - Текстовое содержимое.
   * @returns {Element} Созданный элемент.
   */
  static createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);

    // Установка атрибутов
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    // Установка текстового содержимого
    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  }

  /**
   * Добавляет класс или массив классов к элементу.
   * @param {Element} element - DOM-элемент.
   * @param {string|string[]} className - Класс или массив классов.
   */
  static addClass(element, className) {
    if (Array.isArray(className)) {
      element.classList.add(...className);
    } else {
      element.classList.add(className);
    }
  }

  /**
   * Удаляет класс или массив классов у элемента.
   * @param {Element} element - DOM-элемент.
   * @param {string|string[]} className - Класс или массив классов.
   */
  static removeClass(element, className) {
    if (Array.isArray(className)) {
      element.classList.remove(...className);
    } else {
      element.classList.remove(className);
    }
  }

  /**
   * Проверяет наличие класса у элемента.
   * @param {Element} element - DOM-элемент.
   * @param {string} className - Класс для проверки.
   * @returns {boolean} true, если класс присутствует.
   */
  static hasClass(element, className) {
    return element.classList.contains(className);
  }

  /**
   * Переключает наличие класса у элемента.
   * @param {Element} element - DOM-элемент.
   * @param {string} className - Класс для переключения.
   */
  static toggleClass(element, className) {
    element.classList.toggle(className);
  }

  /**
   * Устанавливает стили для элемента.
   * @param {Element} element - DOM-элемент.
   * @param {Object} styles - Объект со стилями (css-свойство: значение).
   */
  static setStyles(element, styles) {
    Object.entries(styles).forEach(([property, value]) => {
      element.style[property] = value;
    });
  }

  /**
   * Удаляет элемент из DOM.
   * @param {Element} element - DOM-элемент для удаления.
   */
  static removeElement(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  /**
   * Очищает содержимое элемента.
   * @param {Element} element - DOM-элемент для очистки.
   */
  static clearElement(element) {
    if (element) {
      element.innerHTML = '';
    }
  }

  /**
   * Проверяет, находится ли элемент в DOM.
   * @param {Element} element - DOM-элемент.
   * @returns {boolean} true, если элемент в DOM.
   */
  static isElementInDOM(element) {
    return element && document.contains(element);
  }
}
