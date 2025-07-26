import { CalendarApp } from '@components/CalendarApp';
import { Tooltip } from '@components/Tooltip';

/**
 * Главная точка входа в приложение
 * Инициализирует и запускает календарь контрибьютов
 */
export class App {
  constructor() {
    this.calendarApp = null;
    this.isInitialized = false;
  }

  /**
   * Инициализирует приложение
   */
  init() {
    try {
      this.calendarApp = new CalendarApp();
      this.tooltipPlugin = new Tooltip();
      this.isInitialized = true;

      console.debug('[App]: Приложение успешно запущено');
    } catch (error) {
      console.error('[App]: Ошибка при инициализации приложения:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Обрабатывает ошибки инициализации
   */
  handleInitializationError(error) {}
}
