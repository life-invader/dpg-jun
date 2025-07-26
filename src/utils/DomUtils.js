export class DomUtils {
  static createElementFromString(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstElementChild;
  }

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

  static addClass(element, className) {
    if (Array.isArray(className)) {
      element.classList.add(...className);
    } else {
      element.classList.add(className);
    }
  }

  static removeClass(element, className) {
    if (Array.isArray(className)) {
      element.classList.remove(...className);
    } else {
      element.classList.remove(className);
    }
  }

  static hasClass(element, className) {
    return element.classList.contains(className);
  }

  static toggleClass(element, className) {
    element.classList.toggle(className);
  }

  static setStyles(element, styles) {
    Object.entries(styles).forEach(([property, value]) => {
      element.style[property] = value;
    });
  }

  static removeElement(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  static clearElement(element) {
    if (element) {
      element.innerHTML = '';
    }
  }

  static isElementInDOM(element) {
    return element && document.contains(element);
  }
}
