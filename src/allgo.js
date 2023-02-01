const MIN_DAMAGE = 1.3;
const MAX_DAMAGE = 0.7;
const BUFF_MULTIPLIER = 1.5;
let CRITICAL_HIT_CHANCE = 0.1;
let MISS_CHANCE = 0.05;
let ATTACK_RANGE = [1, 1];

// calculate damage : damage can be from 30% less to 30% more
function calculateDamage(attack, defence, isBuff) {
    let damage = (Math.random() * (MIN_DAMAGE- MAX_DAMAGE) + MIN_DAMAGE)*attack;
    let damageModifier = (isBuff ? BUFF_MULTIPLIER : 1);
  
    damage = Math.floor(damage * damageModifier);

    // chance of critical hit
    let isCriticalHit = Math.random() < CRITICAL_HIT_CHANCE;
    if (isCriticalHit) {
      alert("critical hit!");
      damage = damage * 2;
      
    }
    
    //chance of miss
    let isMiss = Math.random() < MISS_CHANCE;
    if (isMiss) {
      damage = 0;
      alert("miss!");
    } else if (!isCriticalHit){
      return (damage = Math.max(Math.floor(damage - defence * 0.6), 1));
    }
    return damage;
}

// finale degat gestion
function finaledegat(attack, defence, isBuff) {
    let finalDamage = 0;

    // random multi attack following variable ATTACK_RANGE 
    let attackCount = Math.floor(Math.random() * (ATTACK_RANGE[1] - ATTACK_RANGE[0] + 1) + ATTACK_RANGE[0]);
    for (let i = 0; i < attackCount; i++) {
        finalDamage += calculateDamage(attack, defence, isBuff);
    }
    finalDamage = Math.floor(finalDamage);
    return finalDamage;
}

//  calculate health
function healcalculate(heal) {
    heal *= (Math.random() * (MIN_DAMAGE- MAX_DAMAGE) + MIN_DAMAGE);

    let isCriticalHeal = Math.random() < CRITICAL_HIT_CHANCE;
    if (isCriticalHeal) {
      heal = heal * 2;
      alert("critical heal!");
    }
    
    let isMiss = Math.random() < MISS_CHANCE;
    if (isMiss) {
      heal = 0;
      alert("miss!");
    } else 
    return heal;
}

// check if is attack card or heal card
export default function allgo(attack, defence, heal, isBuff, CC, Miss, Multi) {
    CRITICAL_HIT_CHANCE = CC;
    MISS_CHANCE = Miss;
    ATTACK_RANGE = [1, Multi];

    if (heal > 0) {
        let nbrheal = healcalculate(heal)
        return (nbrheal);
    } else if (attack > 0) {
        let nbrdegat = finaledegat(attack, defence, isBuff)
        return (nbrdegat);
    } else
    return 0;
}