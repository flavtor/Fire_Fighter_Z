import Intro from "./intro";
import Sound from "./sound";
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
    const intro = document.querySelector(".intro");
    playButton.addEventListener("click", () => {
      menu.classList.add("disappear");
      intro.classList.remove("disappear");
      const audio = new Sound();
      audio.PlayMusic();
      Intro();
    });
  }
}
