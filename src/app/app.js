import { CalendarApp } from '@components/CalendarApp';
import { Tooltip } from '@components/Tooltip';

export class App {
  constructor() {
    this.calendarApp = null;
    this.isInitialized = false;
  }

  init() {
    try {
      this.calendarApp = new CalendarApp();
      this.tooltipPlugin = new Tooltip();
      this.isInitialized = true;

      console.debug('[App]: Приложение успешно запущено');
    } catch (error) {
      console.error('[App]: Ошибка при инициализации приложения:', error);
      // this.handleInitializationError(error);
    }
  }
}
