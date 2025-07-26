export class DataService {
  apiUrl = process.env.API_URL;

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
