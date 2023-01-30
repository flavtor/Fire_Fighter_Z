const MIN_DAMAGE = 1.3;
const MAX_DAMAGE = 0.7;
const CRITICAL_HIT_CHANCE = 0.1;
const MISS_CHANCE = 0.05;
const BUFF_MULTIPLIER = 1.5;
const DEBUFF_MULTIPLIER = 0.5;
const ATTACK_RANGE = [1, 1];

function calculateDamage(attack, defense, isBuff, isDeBuff) {
    let damage = (Math.random() * (MIN_DAMAGE- MAX_DAMAGE) + MIN_DAMAGE)*attack;
    let damageModifier = (isBuff ? BUFF_MULTIPLIER : 1) * (isDeBuff ? DEBUFF_MULTIPLIER : 1);
   
    damage = Math.floor(damage * damageModifier);
    let isCriticalHit = Math.random() < CRITICAL_HIT_CHANCE;
    if (isCriticalHit) {
      damage = damage * 2;
      alert("critical hit!");
    }
    
    let isMiss = Math.random() < MISS_CHANCE;
    if (isMiss) {
      damage = 0;
      alert("miss!");
    } else {
      damage = Math.max(Math.floor(damage - defense), 1);
    }
    return damage;
}

function finaledegat(attack, defense, isBuff, isDeBuff) {
    let finalDamage = 0;
    let attackCount = ATTACK_RANGE[1] - ATTACK_RANGE[0] + 1;
  
    for (let i = 0; i < attackCount; i++) {
        finalDamage += calculateDamage(attack, defense, isBuff, isDeBuff);
    }
    finalDamage = Math.floor(finalDamage / attackCount);
    return finalDamage;
}

export default function allgo(attack, defense, heal, isBuff, isDeBuff) {
    if (attack === 0 && defense === 0 && heal > 0) {
        //let nbrheal = healcalculate(heal)
        //return (nbrheal + 100);
        return 0;

    } else if (attack > 0 && heal === 0) {
        let nbrdegat = finaledegat(attack, defense, isBuff, isDeBuff)
        return (nbrdegat);
    } else
    alert("cards error");
    return 0;
}