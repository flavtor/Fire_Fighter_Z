import initGame from "./game";

export default function intro(){
  const introSection = document.querySelector(".intro");
  const game = document.querySelector(".game-ui")
  const eventButton = document.querySelector(".place button.visited");

  eventButton.addEventListener("click", () => {
    introSection.classList.add("appear");
    game.classList.remove("disappear");
    initGame();
  });
}