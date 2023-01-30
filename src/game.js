import GameMenu from "./menu";
import Card from "./cards";

const menu = new GameMenu(["Play"]);

export default function initGame() {
  const card = new Card();
  card.getCards();
  console.log("game launch");
}
