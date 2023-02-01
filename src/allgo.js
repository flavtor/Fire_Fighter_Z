const MIN_DAMAGE = 1.3;
const MAX_DAMAGE = 0.7;
const BUFF_MULTIPLIER = 1.5;
let CRITICAL_HIT_CHANCE = 0.1;
let MISS_CHANCE = 0.05;
let ATTACK_RANGE = [1, 1];

// calculate damage
function calculateDamage(attack, defence, isBuff, isDeBuff) {
    let damage = (Math.random() * (MIN_DAMAGE- MAX_DAMAGE) + MIN_DAMAGE)*attack;
    let damageModifier = (isBuff ? BUFF_MULTIPLIER : 1);
   
    console.log("-------------------------------------------------------------------------------------------------- damageModifier:", damageModifier);
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
function finaledegat(attack, defence, isBuff, isDeBuff) {
    let finalDamage = 0;
    let attackCount = Math.floor(Math.random() * (ATTACK_RANGE[1] - ATTACK_RANGE[0] + 1) + ATTACK_RANGE[0]);
    for (let i = 0; i < attackCount; i++) {
        console.log("nombre d'attaque : ", attackCount);
        finalDamage += calculateDamage(attack, defence, isBuff, isDeBuff);
    }
    finalDamage = Math.floor(finalDamage);
    console.log("----------------------------------------------------------------\n Final damage: %i\n---------------------------------------------------------------- ", finalDamage);
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
export default function allgo(attack, defence, heal, isBuff, isDeBuff, CC, Miss, Multi) {
  console.log("allgo");
    CRITICAL_HIT_CHANCE = CC;
    MISS_CHANCE = Miss;
    ATTACK_RANGE = [1, Multi];

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