import { DataService } from '@services/DataService';
import { DAYS_365_MS } from '@constants/index';

export class CalendarApp {
  constructor() {
    this.loader = document.querySelector('.loader');

    this.dataService = new DataService(); // API-сервис
    this.contributionData = {};

    this.init();
  }

  async init() {
    try {
      await this.loadContributionData(); // загрузка контрибьютов по api
      this.createCalendar(); // создание карты контрибьютов

      console.debug('[CalendarApp]: Приложение календаря успешно инициализировано');
    } catch (error) {
      console.error('[CalendarApp]: Ошибка при инициализации приложения:', error);
    }
  }

  async loadContributionData() {
    try {
      this.contributionData = await this.dataService.fetchContributionData();
    } catch (error) {
      console.error('[CalendarApp]: Ошибка при загрузке данных о контрибьютах:', error);
    }

    this.removeLoader();
  }

  createCalendar() {
    const today = new Date();
    const startDate = new Date(today.getTime() - DAYS_365_MS); // 356 дней назад
    const endDate = today;
  }

  removeLoader() {
    this.loader.remove();
  }
}
