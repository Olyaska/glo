'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const income = 'фриланс', 
    mission = 100000,
    period = 10,
    expenses = [];
let money;

const start = function() {
    do { 
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

start();

const deposit = confirm('Есть ли у вас депозит в банке?'),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');

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
        do { 
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

const reachTarget = function() { 
    if (budgetDay <= 0) {
        return 'Цель не будет достигнута';
    } else {
        return 'Цель будет достигнута за: ' + getTargetMonth() + ' месяцев';
    }
};

console.log('Расходы за месяц: ', expensesAmount); 
console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));
console.log(reachTarget());  
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
