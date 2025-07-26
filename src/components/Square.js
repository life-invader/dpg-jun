import { ContributionCalculator } from '@services/ContributionCalculator.js';
import { DateService } from '@services/DateService.js';
import { DomUtils } from '@utils/DomUtils.js';
import { Tooltip } from './Tooltip.js';

export class Square {
  constructor(contributionLevel = 0, contributionData = []) {
    this.contributionLevel = contributionLevel;
    this.contributionData = contributionData;

    this.element = this.createElement();
  }

  createElement() {
    const [date] = this.contributionData;
    const formattedDate = DateService.formatDateForDisplay(date);
    const contributionCount = ContributionCalculator.getContributionDescription(
      this.contributionLevel,
    );
    const contributionLevel = this.contributionLevel.toString();
    const ariaLabel = `${contributionCount} contributions, ${formattedDate}`;

    const squareElement = DomUtils.createElementFromString(
      this.getSquareMarkup(contributionLevel, ariaLabel),
    );

    this.element = squareElement;
    this.attachEventListeners();

    return squareElement;
  }

  getElement() {
    return this.element;
  }

  attachEventListeners() {
    if (!this.element) return;

    this.element.addEventListener('click', this.handleClick);
  }

  handleClick = () => {
    this.showTooltip();
  };

  showTooltip() {
    const [date] = this.contributionData;
    const square = this.getElement();

    const formattedDate = DateService.formatDateForDisplay(date); // Прим.: Понедельник, December 16, 2024
    const contributionCount = ContributionCalculator.getContributionDescription(
      this.contributionLevel,
    );

    const event = new CustomEvent(Tooltip.eventNames.show, {
      bubbles: true,
      detail: { contributionCount, date: formattedDate, datetime: date },
    });
    square.dispatchEvent(event);
  }

  getSquareMarkup(contributionLevel, ariaLabel) {
    return `
      <li data-color="${contributionLevel}" tabindex="0" aria-label="${ariaLabel}" class="square"></li>
    `;
  }
}
