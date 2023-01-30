var hp_p = 180;
var hp_m = 100;

let turn = 1;
let iturn = 1;
let defense = 0;

import allgo from "./allgo";

export default function playerturn(activeCard) {
    hp_monster = document.getElementById("monster_hp");
    hp_player = document.getElementById("player_hp");
    let nbr = allgo(activeCard.Attack, activeCard.Defence, activeCard.Heal, false, false);
    console.log("test");
      
    if (nbr >= 100) {
      hp_p += nbr - 100;
      hp_player.textContent = hp_p;
      if (hp_p >= 180) {
        hp_p = 180;
        hp_player.textContent = hp_p;
      }
    }
    hp_m -= nbr;
    console.log("hp :", hp_m);
    hp_monster.textContent = hp_m;
    console.log("test", nbr);
    //hp_monster.txt(hp_m);
    if (hp_m <= 0) {
      alert("You win!");
    }
    turn = 2;
    iturn += 1;
  }

