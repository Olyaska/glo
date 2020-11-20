'use strict';

const money = 40000,
    income = 'фриланс',
    deposit = true,
    mission = 200000,
    period = 10,
    addExpenses = 'Учеба, коммуналка, еда',
    budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);