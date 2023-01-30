export default class Card {
  constructor() {
    this.cards = document.querySelectorAll(".cards__item");
    this.initEvents();
  }

  initEvents() {
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

    // for (const cardsData of this.json_obj) {
    //   const cardElement = document.createElement("div");
    //   cardElement.classList.add("cards__item");
    //   // cardElement.classList.add(`card-${card.id}`);
    //   cardElement.innerHTML = `
    //     <img src="./assets/Cards${cardsData.Path}">
    //   `;
    //   cardsContainer.appendChild(cardElement);
    // }

    for (let i = 0; i < this.json_obj.length; i++) {
      const cardsData = this.json_obj[i];
      console.log(cardsData);
      const cardElement = document.createElement("div");
      cardElement.classList.add("cards__item");
      cardElement.classList.add(`card-${i + 1}`);
      cardElement.innerHTML = `
        <img src="./assets/Cards/${cardsData.Path}">
      `;
      cardsContainer.appendChild(cardElement);
    }
  }
}
