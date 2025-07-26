export class ExampleSquaresRenderer {
  selectors = {
    exampleSquares: '.examples__list .square',
  };

  constructor() {
    this.exampleSquares = document.querySelectorAll(this.selectors.exampleSquares);
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.exampleSquares.forEach((square) => {
      square.addEventListener('click', this.squareClickHandler);
    });
  }

  squareClickHandler = (evt) => {
    // this.showExampleTooltip();
  };
}
