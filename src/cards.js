export default class Card {
  constructor() {
  }

  initEvents() {
    this.cards = document.querySelectorAll(".cards__item")
    this.cards.forEach((card) => {
      card.addEventListener("click", function () {
        this.classList.add("selected");
        setTimeout(() => {
          this.classList.remove("selected");
        }, 1000);
      });
    });
  }

  async getCards() {
    let response = await fetch("http://localhost:8080/listplayercards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    localStorage.setItem("listCards", JSON.stringify(data));
    const listCards = localStorage.getItem("listCards");
    const myJsonStr = JSON.stringify(data);
    this.json_obj = JSON.parse(myJsonStr);
    for (var item in this.json_obj) {
      this.objCard = this.json_obj[item];
    }

    const cardsContainer = document.querySelector(".cards");

    for (let i = 0; i < this.json_obj.length; i++) {
      const cardsData = this.json_obj[i];
      const cardElement = document.createElement("div");
      cardElement.setAttribute("card_id", cardsData.id)
      cardElement.classList.add("cards__item");
      cardElement.classList.add(`card-${i + 1}`);

      cardElement.innerHTML = `
        <img src="./Cards/${cardsData.Path}">
      `;
      cardsContainer.appendChild(cardElement);
    }

    this.initEvents()
  }
}
