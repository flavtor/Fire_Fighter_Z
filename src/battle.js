import Animate from "./animation";

const animation = new Animate();

// set up global variables
let iturn = 1;
let defence_p = 0;
let turndef_p = 0;
let defence_m = 0;
let turndef_m = 0;
let turn_buff = 0;


// recover html id
hp_monster = document.getElementById("monster_hp");
hp_player = document.getElementById("player_hp");
mana_points = document.getElementById("mana_p");
const action = document.querySelector('.action')

import allgo from "./allgo";

// check if player or zombie are dead
function check_death () {
    (hp_monster.textContent <= 0) ? alert("You Win!") : (hp_player.textContent <= 0) ? alert("You Lose!") : null;
  }

// gestion of mana points
function manage_mana(Cost){

    mana_points.textContent -= Cost;
    
    if (mana_points.textContent < 0) {
        alert("vous n'avez plus assez de mana pour lancé votre competence vous passé votre tour");
        turndef_m = Math.abs(turndef_m - 1);
        if (turndef_m <= 0) {
            defence_m = 0;
        }
        mana_points.textContent = 4;
        iturn += 1;
        return 1;
    }
    if (iturn % 5 == 1)
        mana_points.textContent = 4;
    return 0;
}

// gestion attaque buff
// function manage_buff(activeCard) {
//     if (activeCard.Buff === true || buff === true) {
//         buff = true;
//         turn_buff += 1;
//         if (turn_buff === 1) {
//             buff = true;
//         } else if (turn_buff === 3) {
//          buff = false;
//          turn_buff = 0;
//         }
//     }
// }

// gestion of player turn
function playerturn(activeCard) {
    animation.animateSprite('firefighter', 1750)

    let hp_p = hp_player.textContent;
    
    let nbr = 0;
    
    animation.animateSprite('firefighter', 1750);
    console.log(activeCard);
    if (manage_mana(activeCard.Cost) == 1)
        return;
    activeCard.Buff = manage_buff(activeCard.Buff);
    console.log("card buff : ", activeCard.Buff);
    nbr = allgo(activeCard.Attack, defence_m, activeCard.Heal, activeCard.Buff, activeCard.CC, activeCard.Miss, activeCard.Multi);
    
    manage_defence(activeCard);
    manage_heal(activeCard, nbr);
    if (activeCard.Attack > 0 && activeCard.LifeTheft != true) {
        hp_monster.textContent -= nbr;
        console.log("Attack: ", nbr);
        action.innerHTML = `You : uses a skill and inflicts ${Math.floor(nbr)} damage`
        check_death();
    } else if (activeCard.LifeTheft === true)
        manage_LifeTheft(nbr);
    turndef_m <= 0 ? defence_m = 0 : null;
    turndef_m = Math.abs(turndef_m - 1);
    iturn += 1;
    return;
}

  // gestion of all zombie attack
function monsterattack(alea) {
    let damage = 0;
    let regen = Math.random() * (0.5 - 0.3) + 0.3
    let hp_m = hp_monster.textContent;

    //attack basic
    if (alea >= 0 && alea <= 5) {
        damage = allgo(13, defence_p, 0, false, 0.1, 0.02, 1);
        hp_player.textContent -= damage;
        console.log("DamageZomvie: ", damage);
        check_death();
        action.innerHTML = `Zombie :  uses basic attack and inflicts ${damage} damage`

    //strong attack
    } else if (alea >= 6 && alea <= 8) {
        damage = allgo(20, defence_p, 0, true, 0.05, 0.02, 1);
        hp_player.textContent -= damage;
        check_death();
        action.innerHTML = `Zombie :  uses strong attack and inflicts ${damage} damage`
    }
    //steal life attack
    else if (alea == 9) {
        damage = allgo(17, defence_p, 0, false, 0.05, 0.02, 1);
        regen = damage*regen;
        hp_m = Math.floor((-regen - hp_m) * -1);
        hp_m >= 100 ? hp_monster.textContent = 100 : hp_monster.textContent = hp_m;
        hp_player.textContent -= damage;
        check_death();
        action.innerHTML = `Zombie :  uses steal life attack and inflicts ${Math.floor(damage)} damage and recover ${Math.floor(regen)} hp`
    }
}

// gestion of all zombie heal
function monsterheal(alea) {
    let heal = 0
    let hp_m = hp_monster.textContent;

    //heal basic
    if (alea >= 0 && alea <= 8) {
        heal = allgo(0,0,10,false, 0.05, 0.02, 1);
        hp_m = Math.floor((-hp_m - heal))*-1;
        hp_monster.textContent = hp_m;
        action.innerHTML = `Zombie :  uses a basic healing skill and recovers ${heal} hp`
        if (hp_m >= 100) {
            hp_monster.textContent = 100;
        }
    //strong heal
    if (alea >= 9 && alea <= 10){
        heal = allgo(0,0,13,false, 0.05, 0.02, 1);
        hp_m = Math.floor((-hp_m - heal))*-1;
        hp_monster.textContent = hp_m;
        action.innerHTML = `Zombie :  uses a strong healing skill and recovers ${Math.floor(heal)} hp`

        if (hp_m >= 100) {
            hp_monster.textContent = 100;
            }
        }
    }
}

// gestion of all zombie defence
function monsterdefence() {
    defence_m += 15;
    turndef_m = 3;
    
    action.innerHTML = `Zombie :  gets stronger and increases its defense`
}

// gestion of zombie turn
function monsterskill(nbr) {
    setTimeout(() => {
        console.log('go')
        animation.animateSprite('zombie', 3500)
        alea = Math.floor(Math.random() * (10 - 1 + 1) + 1);

        switch (nbr) {
            //attack
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                monsterattack(alea);
            break;
            //heal
            case 7:
            case 8:
                monsterheal(alea);
            break;
            //defence
            case 9:
            case 10:
                monsterdefence();
            break;
        }
    turndef_p = Math.abs(turndef_p -1);
    if (turndef_p <= 0) {
        defence_p = 0;
    }
    iturn += 1;
    }, 1500);
}

// gestion of zombie turn
export function zombieturn() {

    console.log("Tour du zombie");
    document.querySelector('.cards').classList.add('hidden')
    monsterskill(Math.floor(Math.random() * (10 - 1 + 1) + 1));
    setTimeout(() => {
        document.querySelector('.cards').classList.remove('hidden')
    }, 3000);
    return;
}