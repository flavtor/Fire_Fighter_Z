export default class Sound {
  constructor() {
    this.music = new Audio("./Audio/Music.mp3");
  }

  PlayMusic() {
    this.music.play();
    this.music.addEventListener("ended", () => {
      this.music.currentTime = 0;
      this.music.play();
    });
  }
}
