'use strict';

// 1.
const money = 40000,
    income = 'фриланс',
    deposit = true,
    mission = 200000,
    period = 10;
let addExpenses = 'Учеба, коммуналка, еда';

// 2.
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);

const budgetDay = money / 30;
console.log(budgetDay);