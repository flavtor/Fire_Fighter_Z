import GameMenu from "./menu";
import Card from "./cards";
import animateScript from "./animation";

export const API_URL = "http://localhost:8080";

const menu = new GameMenu(["Play"]);

export default function initGame() {
  const card = new Card();
  card.getCards();
  console.log("game launch");
  animateScript();
}
