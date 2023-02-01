import { API_URL } from "./game";
import { playerturn } from "./battle";
import { zombieturn } from "./battle";

export default class Card {
  constructor() {
    this.cards = []; // Array to store cards elements
    this.json_obj = []; // Array to store JSON data fetched from the API
    this.loading = false; // Boolean to check if cards are loaded or not
  }

  // Initialize click event on the card element
  initClickEvent(data) {
    // Loop through the cards array and add event listener to each card
    this.cards.forEach((card) => {
      card.addEventListener("click", () => {
        // Get the tab_id and card_id attributes of the clicked card
        const tab_id = card.getAttribute("tab_id");
        const card_id = card.getAttribute("card_id");
        const activeCard = data[tab_id];
        // Remove the selected card from the data array
        data.splice(tab_id, 1);
        playerturn(activeCard)
        card.classList.add("selected");
        setTimeout(() => {
          // Remove the card element from the DOM
          card.parentNode.removeChild(card);
          this.playDrawcard(card_id);
        }, 700);
      });
    });
  }

  // Fetch the cards from the API
  async fetchCards() {
    let username = sessionStorage.getItem("username");

    // Make a GET request to the API to fetch the cards
    let response = await fetch(`${API_URL}/init?username=`+username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Call showLoading method which displays cards once loaded
    this.showLoading();

    let data = await response.json();
    sessionStorage.setItem("listCards", JSON.stringify(data));
    const listCards = sessionStorage.getItem("listCards");
    this.json_obj = JSON.parse(listCards);

    // Retrun data into json object
    return this.json_obj;
  }

  // Create the card elements and display them
  createCards(data) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    // Loop through the cards data and create card elements
    for (let i = 0; i < data.length; i++) {
      const cardsData = data[i];
      const cardElement = document.createElement("div");

      // Set the tab_id and card_id attributes for each card
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

  // Asynchronously retrieve cards data from API
  async getCards() {
    // Fetch data
    const data = await this.fetchCards();
    // Create cards from fetched data
    this.createCards(data);
  }

  // Asynchronously play a draw card data from API
  async playDrawcard(id) {
    zombieturn();
    let username = sessionStorage.getItem("username");

    // Send a GET request to the API to play a draw card
    let response = await fetch(`${API_URL}/play_drawcard?id=`+id+'&username='+username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    sessionStorage.setItem("listPlayerCards", JSON.stringify(data));
    const listCards = sessionStorage.getItem("listPlayerCards");
    // Parse the list of cards from JSON to an object
    this.json_obj = JSON.parse(listCards);

    // Create the cards from the updated data
    this.createCards(this.json_obj);
  }

  // Element to appear when maps are loaded
  showLoading() {
    this.loading = true;
    const loadingElement = document.querySelector(".loading");
    const cardsElement = document.querySelector('.cards')
    const boxElement = document.querySelector('.box-content')
    loadingElement.classList.add("disappear");
    this.showElements([cardsElement, boxElement])
  }

  // Show a list of elements by removing their hidden class
  showElements(elements) {
    elements.forEach(element => {
      element.classList.remove("hidden");
    });
  }
}
