'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const income = 'фриланс',
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = 100000,
    period = 10,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:'),
    expenses = [];
let money;

const start = function() {
    do { //1.
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

start();

const showTypeOf = function(data) {
    console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов:');

        let amount;
        do { //2.
            amount = prompt('Во сколько это обойдется?');
        } while (!isNumber(amount));
        
        sum += +amount;
    }
    console.log(expenses);
    return sum;
}

const expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
    return money - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth);
};

const budgetDay = Math.floor(accumulatedMonth / 30);

const reachTarget = function() { //3.
    if (budgetDay <= 0) {
        return 'Цель не будет достигнута';
    } else {
        return 'Цель будет достигнута за: ' + getTargetMonth() + ' месяцев';
    }
};

console.log('Расходы за месяц: ', expensesAmount); 
console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));
console.log(reachTarget());  //3.
console.log('Бюджет на день: ', budgetDay); 

const getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return 'К сожалению, у вас уровень дохода ниже среднего';
    } else {
        return 'Что-то пошло не так: Ваши расходы превышают Ваши доходы';
    }
};

console.log(getStatusIncome());