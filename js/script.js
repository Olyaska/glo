'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
    do { 
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

start();

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 5,
    budgetDay: 0, //3
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
        appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');

        for (let i = 0; i < 2; i++) {
            let key = prompt('Введите обязательную статью расходов:');

            let amount;
            do { 
                amount = prompt('Во сколько это обойдется?');
            } while (!isNumber(amount));
            
            appData.expenses[key] = +amount;
        }
    },

    getExpensesMonth: function() {   //4 
        for (let key in appData.expenses) { //8
            appData.expensesMonth += appData.expenses[key]; 
        }
    },

    getBudget: function() { //9
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() { //10
        if (appData.budgetDay <= 0) {
            return 'Цель не будет достигнута';
        } else {
            return 'Цель будет достигнута за: ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяцев';
        }
    },

    getStatusIncome: function() { //10
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return 'К сожалению, у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так: Ваши расходы превышают Ваши доходы';
        }
    }
};

appData.asking(); //6
appData.budget = money; //2
appData.getExpensesMonth(); // expensesMonth
appData.getBudget(); // budgetMonth, budgetDay


// 12 Вывод в консоль:
console.log('Расходы за месяц: ', appData.expensesMonth); 
console.log(appData.getTargetMonth()); // Цель будет достигнута ...
console.log(appData.getStatusIncome()); // Уровень дохода

// 13 
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log(key + ':');
    console.log(appData[key]);
}
