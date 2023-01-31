import { API_URL } from "./game";
import turngestion from "./battle";

export default class Card {
  constructor() {
    this.cards = [];
    this.json_obj = [];
    this.loading = false;
  }

  initClickEvent(data) {
    this.cards.forEach((card) => {
      card.addEventListener("click", () => {
        const tab_id = card.getAttribute("tab_id");
        const card_id = card.getAttribute("card_id");
        const activeCard = data[tab_id];
        data.splice(tab_id, 1);
        turngestion(activeCard);
        card.classList.add("selected");
        setTimeout(() => {
          card.parentNode.removeChild(card);
          this.playDrawcard(card_id);
        }, 700);
      });
    });
  }

  async fetchCards() {
    let username = sessionStorage.getItem("username");
    let response = await fetch(`${API_URL}/init?username=`+username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.showLoading();

    let data = await response.json();
    sessionStorage.setItem("listCards", JSON.stringify(data));
    const listCards = sessionStorage.getItem("listCards");
    this.json_obj = JSON.parse(listCards);
    return this.json_obj;
  }

  createCards(data) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const cardsData = data[i];
      const cardElement = document.createElement("div");
      cardElement.setAttribute("tab_id", i);
      cardElement.setAttribute("card_id", cardsData.id);
      cardElement.classList.add("cards__item");
      cardElement.classList.add(`card-${i + 1}`);

      cardElement.innerHTML = `
      <img src="./Cards/${cardsData.Path}">
    `;
      cardsContainer.appendChild(cardElement);
    }
    this.cards = document.querySelectorAll(".cards__item");
    this.initClickEvent(data);
  }

  async getCards() {
    const data = await this.fetchCards();
    this.createCards(data);
  }

  async playDrawcard(id) {
    let username = sessionStorage.getItem("username");
    let response = await fetch(`${API_URL}/play_drawcard?id=`+id+'&username='+username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    sessionStorage.setItem("listPlayerCards", JSON.stringify(data));
    const listCards = sessionStorage.getItem("listPlayerCards");
    this.json_obj = JSON.parse(listCards);
    this.createCards(this.json_obj);
  }

  showLoading() {
    this.loading = true;
    const loadingElement = document.querySelector(".loading");
    const cardsElement = document.querySelector('.cards')
    const boxElement = document.querySelector('.box-content')
    loadingElement.classList.add("disappear");
    this.showElements([cardsElement, boxElement])
  }

  showElements(elements) {
    elements.forEach(element => {
      element.classList.remove("hidden");
    });
  }
}
