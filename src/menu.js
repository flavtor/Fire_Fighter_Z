import initGame from "./game";

export default class GameMenu {
  constructor(options) {
    this.options = options;
    this.play = false;
    this.createMenu();
    this.gameLaunch();
  }

  createMenu() {
    this.optionsList = document.querySelector(".options");
    for (let i = 0; i < this.options.length; i++) {
      const option = document.createElement("button");
      option.classList.add(this.options[i].toLowerCase());
      option.innerText = this.options[i];

      this.optionsList.appendChild(option);
    }
  }

  gameLaunch() {
    const playButton = document.querySelector(".play");
    const menu = document.querySelector(".menu");
    const game = document.querySelector(".game-ui")
    playButton.addEventListener("click", () => {
      menu.classList.add("disappear");
      game.classList.remove("disappear");
      initGame();
    });
  }
}
