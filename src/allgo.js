const MIN_DAMAGE = 1.3;
const MAX_DAMAGE = 0.7;
const BUFF_MULTIPLIER = 1.5;
const DEBUFF_MULTIPLIER = 0.5;
let CRITICAL_HIT_CHANCE = 0.1;
let MISS_CHANCE = 0.05;
let ATTACK_RANGE = [1, 1];

// calculate damage
function calculateDamage(attack, defence, isBuff, isDeBuff) {
    let damage = (Math.random() * (MIN_DAMAGE- MAX_DAMAGE) + MIN_DAMAGE)*attack;
    let damageModifier = (isBuff ? BUFF_MULTIPLIER : 1) * (isDeBuff ? DEBUFF_MULTIPLIER : 1);
   
    damage = Math.floor(damage * damageModifier);

    // chance of critical hit
    let isCriticalHit = Math.random() < CRITICAL_HIT_CHANCE;
    if (isCriticalHit) {
      damage = damage * 2;
      alert("critical hit!");
    }
    
    //chance of miss
    let isMiss = Math.random() < MISS_CHANCE;
    if (isMiss) {
      damage = 0;
      alert("miss!");
    } else {
      damage = Math.max(Math.floor(damage - defence * 0.7), 1);
    }
    return damage;
}

// finale degat gestion
function finaledegat(attack, defence, isBuff, isDeBuff) {
    let finalDamage = 0;
    let attackCount = ATTACK_RANGE[1] - ATTACK_RANGE[0] + 1;
  
    for (let i = 0; i < attackCount; i++) {
        finalDamage += calculateDamage(attack, defence, isBuff, isDeBuff);
    }
    finalDamage = Math.floor(finalDamage / attackCount);
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
export default function allgo(attack, defence, heal, isBuff, isDeBuff) {
    if (heal > 0) {
        let nbrheal = healcalculate(heal)
        return (nbrheal);
    } else if (attack > 0) {
        let nbrdegat = finaledegat(attack, defence, isBuff, isDeBuff)
        return (nbrdegat);
    } else
    console.log("cards de defense ou cards inutile");
    return 0;
}