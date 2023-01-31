var mana = 3;

let turn = 1;
let iturn = 1;
let defence_p = 0;
let turndef_p = 0;
let defence_m = 0;
let turndef_m = 0;

hp_monster = document.getElementById("monster_hp");
hp_player = document.getElementById("player_hp");
mana_points = document.getElementById("mana_p");

import allgo from "./allgo";

function managestion(Cost){

    mana_points.textContent -= Cost;
    
    if (mana_points.textContent < 0) {
        alert("no more mana, you must end turn");
        turndef_m -= 1;
        if (turndef_m <= 0) {
            defence_m = 0;
        }
        turn = 2;
        iturn += 1;
        mana_points.textContent = 3;
        return 1;
    }
    return 0;
}


function playerturn(activeCard) {
    
    console.log(activeCard);

    if (managestion(activeCard.Cost) == 1) {
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
    hp_monster.textContent -= nbr;
    console.log("test", nbr);
    if (hp_monster.textContent <= 0) {
      alert("You win!");
    }
    turndef_m <= 0 ? defence_m = 0 : turndef_m;
    turn = 2;
    iturn += 1;
  }

  function monsterattack(hp_player, alea) {
    let damage = 0;

    //attack basic
    if (alea <= 4) {
        damage = allgo(10, defence_p, 0, false, false);
        hp_player.textContent -= damage;
        return


       }
    
  }

  function monsterheal(alea) {
    return
  }

  function monsterdefence() {
    return
  }

  function monsterturn(nbr) {
    alea = Math.floor(Math.random() * (10 - 1 + 1) + 1);

    switch (nbr) {
        //attack
        case 1:
        case 2:
        case 3:
            monsterattack(hp_player, alea);
        break;
        //heal
        case 4:
            monsterheal(alea);
        break;
        //defence
        case 5:
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
        monsterturn(Math.floor(Math.random() * (5 - 1 + 1) + 1));
    } else
    alert("error");
}