'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function(str) {
    str.trim();
    return isNaN(str) && str !== '';
};
const promptNum = function(question, value) {
    let answer;
    do { 
        answer = prompt(question, value);
    } while (!isNumber(answer));
    return +answer;
};
const promptStr = function(question, value) {
    let answer;
    do { 
        answer = prompt(question, value);
    } while (!isString(answer));
    return answer;
};

let money;

const start = function() {
    money = promptNum('Ваш месячный доход?', 33000);
};

start(); 
//можно сразу  присвоить money = promptNum и запустить без функции start, но убирать не сталаб т.к. в задании этого нет

const appData = {
    budget: money,
    budgetDay: 0, 
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    expensesMonth: 0,

    asking: function() {

        if (confirm('Есть ли у Вас дополнительный заработок?')) {           
            const itemIncome = promptStr('Какой у Вас есть дополнительный заработок?', 'Фриланс'),
                cashIncome = promptNum('Сколько в месяц зарабатываете на этом?', 10000);
                
            appData.income[itemIncome] = cashIncome;
        }

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:', 'Образование, транспорт');
        appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');

        for (let i = 0; i < 2; i++) {
            const key = promptStr('Введите обязательную статью расходов:', 'Кварплата'),
                amount = promptNum('Во сколько это обойдется?', 8000);
            appData.expenses[key] = amount;
        }
    },

    getExpensesMonth: function() {   
        for (let key in appData.expenses) { 
            appData.expensesMonth += appData.expenses[key]; 
        }
    },

    getBudget: function() { 
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() { 
        if (appData.budgetDay <= 0) {
            return 'Цель не будет достигнута';
        } else {
            return 'Цель будет достигнута за: ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяцев';
        }
    },

    getStatusIncome: function() { 
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return 'К сожалению, у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так: Ваши расходы превышают Ваши доходы';
        }
    },

    getInfoDeposit: function() {
        if(appData.deposit) {
            appData.moneyDeposit = promptNum('Какая сумма на депозите?', 10000);
            appData.percentDeposit = promptNum('Какой годовой процент?', 6);
        }
    },

    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking(); 
appData.getInfoDeposit();
appData.getExpensesMonth(); // expensesMonth
appData.getBudget(); // budgetMonth, budgetDay


// Вывод в консоль:
console.log('Расходы за месяц: ', appData.expensesMonth); 
console.log(appData.getTargetMonth()); // Цель будет достигнута ...
console.log(appData.getStatusIncome()); // Уровень дохода

//2.
appData.addExpenses = appData.addExpenses.map(function(item){
    return item[0].toUpperCase() + item.slice(1);
});
console.log(appData.addExpenses.join(', '));

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//     console.log(key + ':');
//     console.log(appData[key]);
// }

console.log(appData);