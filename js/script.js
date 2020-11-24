'use strict';

const money = +prompt('Ваш месячный доход?', 30000), 
    income = 'фриланс',
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = 100000,
    period = 10,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:'), 
    expenses1 = prompt('Введите обязательную статью расходов:', 'Кварплата'), 
    amount1 = +prompt('Во сколько это обойдется?', 7000),
    expenses2 = prompt('Введите вторую обязательную статью расходов:', 'Еда'),
    amount2 = +prompt('Во сколько это обойдется?', 10000);


const showTypeOf = function(data) {
    console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const getExpensesMonth = function(amount1, amount2) { //1.
    return amount1 + amount2;
};

const getAccumulatedMonth = function(money,expenses) { //2.
    return money - expenses;
};

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2)) //3.

const getTargetMonth = function(mission, accumulatedMonth) { //4.
    return Math.ceil(mission / accumulatedMonth);
};

const budgetDay = Math.floor(accumulatedMonth / 30); //6.

//7.
console.log('Расходы за месяц: ', getExpensesMonth(amount1, amount2)); 
console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев'); 
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
}

console.log(getStatusIncome());