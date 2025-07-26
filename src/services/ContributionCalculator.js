/**
 * Класс для вычисления уровня вклада пользователя на основе количества его вкладов.
 */
export class ContributionCalculator {
  /**
   * Геттер для пороговых значений уровней вклада.
   * @returns {{HIGH: number, MEDIUM: number, LOW: number, MINIMAL: number}} Объект с порогами для каждого уровня.
   */
  static get CONTRIBUTION_THRESHOLDS() {
    return {
      HIGH: 30,
      MEDIUM: 20,
      LOW: 10,
      MINIMAL: 1,
    };
  }

  /**
   * Вычисляет уровень вклада на основе количества вкладов.
   * @param {number} contributionCount - Количество вкладов пользователя.
   * @returns {number} Уровень вклада (0 - нет, 1 - минимальный, 2 - низкий, 3 - средний, 4 - высокий).
   */
  static calculateContributionLevel(contributionCount) {
    const { HIGH, MEDIUM, LOW, MINIMAL } = ContributionCalculator.CONTRIBUTION_THRESHOLDS;

    if (contributionCount >= HIGH) return 4;
    if (contributionCount >= MEDIUM) return 3;
    if (contributionCount >= LOW) return 2;
    if (contributionCount >= MINIMAL) return 1;

    return 0;
  }

  /**
   * Возвращает текстовое описание уровня вклада.
   * @param {number} level - Уровень вклада (0-4).
   * @returns {string} Описание уровня вклада.
   */
  static getContributionDescription(level) {
    const descriptions = {
      0: 'No',
      1: '1-9',
      2: '10-19',
      3: '20-29',
      4: '30+',
    };

    return descriptions[level] || 'Unknown';
  }
}
