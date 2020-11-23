'use strict';

const money = +prompt('Ваш месячный доход?'), //2.
    income = 'фриланс',
    deposit = confirm('Есть ли у вас депозит в банке?'), //4.
    mission = 100000,
    period = 10,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:'), //3.
    expenses1 = prompt('Введите обязательную статью расходов:'), //5.
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите вторую обязательную статью расходов:'),
    amount2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = money - amount1 - amount2, //6.
    achievementSpeed = Math.ceil(mission/budgetMonth), //7.
    budgetDay = Math.floor(budgetMonth/30); //8.

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log('Цель будет достигнута за: ' + achievementSpeed + ' месяцев'); //7.
console.log('Бюджет на месяц: ', budgetMonth); //6.
console.log('Бюджет на день: ', budgetDay); //8.

//9.
if (budgetDay >= 1200) console.log('У вас высокий уровень дохода');
else if (budgetDay >= 600 && budgetDay < 1200) console.log('У вас средний уровень дохода');
else if (budgetDay < 600 && budgetDay >= 0) console.log('К сожалению, у вас уровень дохода ниже среднего');
else console.log('Что-то пошло не так: Ваши расходы превышают Ваши доходы');
