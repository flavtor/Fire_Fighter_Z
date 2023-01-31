// set up global variables
let iturn = 1;
let defence_p = 0;
let turndef_p = 0;
let defence_m = 0;
let turndef_m = 0;

// recover html id
hp_monster = document.getElementById("monster_hp");
hp_player = document.getElementById("player_hp");
mana_points = document.getElementById("mana_p");

import allgo from "./allgo";

// check if player or zombie are dead
function check_death () {
    (hp_monster.textContent <= 0) ? alert("You Win!") : (hp_player.textContent <= 0) ? alert("You Lose!") : null;
  }

// gestion of mana points
function managestion(Cost){

    mana_points.textContent -= Cost;
    
    console.log("Mana: ", mana_points.textContent);
    if (mana_points.textContent < 0) {
        alert("vous n'avez plus assez de mana pour lancé votre competence vous passé votre tour");
        turndef_m = Math.abs(turndef_m - 1);
        if (turndef_m <= 0) {
            defence_m = 0;
        }
        mana_points.textContent = 3;
        iturn += 1;
        return 1;
    }
    console.log("Mana2: ", mana_points.textContent);
    console.log("iturn%3: ", iturn%3);
    if (iturn % 4 == 1) {
        console.log("gain en mana : 4");
        mana_points.textContent = 4;
    }
    return 0;
}

// gestion of player turn
function playerturn(activeCard) {
    let hp_p = hp_player.textContent;
    
    console.log(activeCard);

    if (managestion(activeCard.Cost) == 1) {
        return;
    }
    
    let nbr = allgo(activeCard.Attack, defence_m, activeCard.Heal, false, false);
    defence_p += activeCard.Defence;

    if (defence_p > 0 && turndef_p == 0) {
        turndef_p = 3;
    }

    if (nbr >= 100) {
        hp_p = Math.floor((-hp_p - (nbr - 100)))*-1;
        hp_player.textContent = hp_p;
        console.log("le pombier utilise une competence et se soigne de %i pv", nbr-100);
      if (hp_p >= 180) {
        hp_player.textContent = 180;
      } 
    } else if (nbr <= 99) {
        hp_monster.textContent -= nbr;
        console.log("le pombier utilise une competence et inflige %i de degat", nbr);
        check_death();
    }
    turndef_m <= 0 ? defence_m = 0 : null;
    turndef_m = Math.abs(turndef_m - 1);
    iturn += 1;
  }

  // gestion of all zombie attack
function monsterattack(alea) {
    let damage = 0;
    let regen = Math.random() * (0.5 - 0.3) + 0.3
    let hp_m = hp_monster.textContent;

    //attack basic
    if (alea >= 0 && alea <= 6) {
        damage = allgo(10, defence_p, 0, false, false);
        hp_player.textContent -= damage;
        check_death();
        console.log("zombie utilise attaque basique est fait %i damage", damage);
    //strong attack
    } else if (alea >= 7 && alea <= 9) {
        damage = allgo(11, defence_p, 0, true, false);
        hp_player.textContent -= damage;
        check_death();
        console.log("zombie utilise forte attack est fait %i damage", damage);
    }
    //steal life attack
    else if (alea == 10) {
        damage = allgo(10, defence_p, 0, false, false);
        regen = damage*regen;
        hp_m = Math.floor((-regen - hp_m) * -1);
        hp_m >= 100 ? hp_monster.textContent = 100 : hp_monster.textContent = hp_m;
        hp_player.textContent -= damage;
        check_death();
        console.log("zombie utilise steal life attack est fait %i dommage et recupere %i de vie", damage, regen);
    }
    
}

// gestion of all zombie heal
function monsterheal(alea) {
    let heal = 0
    let hp_m = hp_monster.textContent;

    //heal basic
    if (alea >= 0 && alea <= 8) {
        heal = allgo(0,0,10,false,false);
        hp_m = Math.floor((-hp_m - (heal - 100)))*-1;
        hp_monster.textContent = hp_m;
        console.log("le zombie utilise une competence de soin basique et récupére %i pv", heal-100);
        if (hp_m >= 100) {
            hp_monster.textContent = 100;
        }
    //strong heal
    if (alea >= 9 && alea <= 10){
        heal = allgo(0,0,13,false,false);
        hp_m = Math.floor((-hp_p - (heal - 100)))*-1;
        hp_monster.textContent = hp_m;
        console.log("le zombie utilise une forte competence de soin et recupére %i pv", heal-100);
        if (hp_p >= 180) {
            hp_player.textContent = 180;
            }
        }
    }
}

// gestion of all zombie defence
function monsterdefence() {
    defence_m += 15;
    turndef_m = 3;
    
    console.log("le zombie se renforce et augmente sa defense");
}

// gestion of zombie turn
function monsterturn(nbr) {
    alea = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    managestion(0);
    
    switch (nbr) {
        //attack
        case 1:
        case 2:
        case 3:
            monsterattack(alea);
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
    turndef_p = Math.abs(turndef_p -1);
    if (turndef_p <= 0) {
        defence_p = 0;
    }
    iturn += 1;
}

// turn by turn gestion
export default function turngestion(activeCard) {
    console.log("tour avant la baisse de défense du joueur: %i", turndef_p);
    console.log("tour avant la baisse de défense du zombie: %i", turndef_m);
    console.log("tour de jeu: %i", iturn);
    if (iturn %2 == 1) {
        console.log("Tour du joueur");
        playerturn(activeCard);
    }
    else if (iturn %2 == 0) {
        console.log("Tour du zombie");
        monsterturn(Math.floor(Math.random() * (5 - 1 + 1) + 1));
    } else
    console.log("error");
}