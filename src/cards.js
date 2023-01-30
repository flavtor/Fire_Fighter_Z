export default class Card {
  constructor() {
    this.cards = [];
    this.json_obj = [];
  }

  initClickEvent(data) {
    this.cards.forEach((card) => {
      card.addEventListener("click", () => {
        const card_id = card.getAttribute("card_id");
        let filteredCards = data.filter(data => data.id !== card_id);
        data = filteredCards;
        console.log(data);
        card.classList.add("selected");
        setTimeout(() => {
          card.classList.remove("selected");
        }, 1000);
      });
    });
  }

  async fetchCards() {
    let response = await fetch("http://localhost:8080/listplayercards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    localStorage.setItem("listCards", JSON.stringify(data));
    const listCards = localStorage.getItem("listCards");
    this.json_obj = JSON.parse(listCards);
    return this.json_obj;
  }

  createCards(data) {
    const cardsContainer = document.querySelector(".cards");

    for (let i = 0; i < data.length; i++) {
      const cardsData = data[i];
      const cardElement = document.createElement("div");
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
}