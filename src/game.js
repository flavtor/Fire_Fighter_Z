import GameMenu from "./menu";
import Card from "./cards";

export const API_URL = "http://localhost:8080";

if (!localStorage.getItem("username")) {
  window.location.href = "./login.html";
}
const logoutButton = document.querySelector('#logout')

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('username');
  window.location.href = './login.html';
});

new GameMenu(["Play"]);

export default function initGame() {
  const card = new Card();
  card.getCards();
  console.log("game launch");
}
