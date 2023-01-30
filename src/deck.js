import cards from "../data/cards";

export default function Deck() {
  const attackCards = cards.data.filter((card) => card.type === "attack");
  const defenseCards = cards.data.filter((card) => card.type === "defense");
  const healCards = cards.data.filter((card) => card.type === "heal");

  const deck = [];

  for (let i = 0; i < 3; i++) {
    deck.push(attackCards[Math.floor(Math.random() * attackCards.length)]);
  }

  deck.push(defenseCards[Math.floor(Math.random() * defenseCards.length)]);
  deck.push(healCards[Math.floor(Math.random() * healCards.length)]);
  console.log(deck)

  return(deck)

}
