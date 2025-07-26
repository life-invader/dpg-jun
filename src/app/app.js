import { CalendarApp } from '@components/CalendarApp';

export class App {
  constructor() {
    this.calendarApp = null;
    this.isInitialized = false;
  }

  init() {
    try {
      this.calendarApp = new CalendarApp();
      this.isInitialized = true;

      console.debug('[App]: Приложение успешно запущено');
    } catch (error) {
      console.error('[App]: Ошибка при инициализации приложения:', error);
      // this.handleInitializationError(error);
    }
  }
}
