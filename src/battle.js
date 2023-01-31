var hp_p = 180;
var hp_m = 100;
var mana = 3;

let turn = 1;
let iturn = 1;
let defence_p = 0;
let turndef_p = 0;
let defence_m = 0;
let turndef_m = 0;

import allgo from "./allgo";

function playerturn(activeCard) {
    hp_monster = document.getElementById("monster_hp");
    hp_player = document.getElementById("player_hp");
    mana_points = document.getElementById("mana_p");

    
    console.log(activeCard);
    
    mana -= activeCard.Cost;
    mana_points.textContent = mana;

    if (mana <= 0) {
        alert("no more mana, you must end turn");
        turndef_m -= 1;
        if (turndef_m <= 0) {
            defence_m = 0;
        }
        turn = 2;
        iturn += 1;
        mana = 3;
        mana_points.textContent = mana;
        return;
    }


    let nbr = allgo(activeCard.Attack, defence_m, activeCard.Heal, false, false);
    defence_p += activeCard.Defence;

    if (defence_p > 0 && turndef_p == 0) {
        turndef_p = 2;
    }

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
    if (hp_m <= 0) {
      alert("You win!");
    }
    turndef_m -= 1;
    if (turndef_m <= 0) {
        defence_m = 0;
    }
    turn = 2;
    iturn += 1;
  }

  function monsterattack(hp_player) {

  }

  function monsterheal(hp_monster) {
    return

  }

  function monsterdefence() {
    return
  }

  function monsterturn(nbr) {
    hp_player = document.getElementById("player_hp");
    hp_monster = document.getElementById("monster_hp");
    alea = Math.floor(Math.random() * (10 - 1 + 1) + 1);

    switch (nbr) {
        //attack
        case 1:
            monsterattack(hp_player, alea);
        break;
        //heal
        case 2:
            monsterheal(hp_monster, alea);
        break;
        //defence
        case 3:
            monsterdefence();
        break;
    }
    turndef_p -= 1;
    if (turndef_p <= 0) {
        defence_p = 0;
    }
    turn = 1;
    iturn += 1;
}

export default function turngestion(activeCard)
  {
    if (turn === 1) {
        playerturn(activeCard);
    }
    else if (turn === 2) {
        monsterturn(Math.floor(Math.random() * (3 - 1 + 1) + 1));
    } else
    alert("error");
}