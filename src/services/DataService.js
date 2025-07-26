/**
 * Сервис для получения данных о вкладах с удалённого API.
 */
export class DataService {
  /**
   * URL API для получения данных о вкладах.
   * @type {string}
   */
  apiUrl = process.env.API_URL;

  /**
   * Асинхронно получает данные о вкладах с API.
   * @returns {Promise<Object>} Объект с данными о вкладах или пустой объект в случае ошибки.
   */
  async fetchContributionData() {
    try {
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error(`[DataService]: HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[DataService]: Ошибка при получении данных:', error);
      return {};
    }
  }
}
