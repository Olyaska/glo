'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function(str) {
    str.trim();
    return isNaN(str) && str !== '';
};

// 2.
const btnStart = document.getElementById('start'), //Рассчитать
    btnPlusIncome = document.getElementsByTagName('button')[0],//+
    btnPlusExpenses = document.getElementsByTagName('button')[1],
    depositСheck = document.querySelector('#deposit-check'),//checkbox Депозит
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),//d
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],//e
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], //Накопления за период
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),//f
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

const appData = {
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    expensesMonth: 0,

    start: function() {
        appData.budget = salaryAmount.value;
        appData.getIncome();
        appData.getExpenses();

        appData.getExpensesMonth(); // expensesMonth
        appData.getBudget(); // budgetMonth, budgetDay
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.showResult();
        console.log(appData);
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    addExpensesBlock: function() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnPlusExpenses.style.display = 'none';
        }
    },
    addIncomeBlock: function() { //2
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnPlusIncome.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value.trim(),
                cashExpenses = +item.querySelector('.expenses-amount').value.trim();

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() { //1
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value.trim(),
            cashIncome = +item.querySelector('.income-amount').value.trim();

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
    },
    getAddExpenses: function() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function() {   
        for (let key in appData.expenses) { 
            appData.expensesMonth += appData.expenses[key]; 
        }
    },

    getBudget: function() { 
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); //3
    },

    getTargetMonth: function() { 
        return appData.budgetDay <= 0 ?
        'Цель не будет достигнута' : Math.ceil(targetAmount.value / appData.budgetMonth);
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
        return appData.budgetMonth * periodSelect.value;
    }
};

btnStart.disabled = true; // 6
salaryAmount.addEventListener('change', function() {
    btnStart.disabled = false;
});
console.dir(btnStart);
btnStart.addEventListener('click', appData.start);
btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
btnPlusIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function() { //4
    periodAmount.textContent = periodSelect.value;
});
periodSelect.addEventListener('input', appData.showResult); //5