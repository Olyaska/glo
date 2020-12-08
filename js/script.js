'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function(str) {
    str.trim();
    return isNaN(str) && str !== '';
};
const btnStart = document.getElementById('start'), //Рассчитать
    btnCancel = document.getElementById('cancel'),
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

const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.mission = 0;
    this.expensesMonth = 0;
};
AppData.prototype.checkAmountInput = function() {
    btnStart.disabled = false;
};
AppData.prototype.start = function() {
    if (salaryAmount.value === '') {
        btnStart.disabled = true;
        return;
    }
    this.budget = +salaryAmount.value;
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth(); 
    this.getBudget(); 
    this.getAddExpenses();
    this.getAddIncome();
    this.showResult();

    periodSelect.addEventListener('input', this.checkPeriod.bind(this));

    const inputs = document.querySelectorAll('.data input[type=text]');
    for (let input of inputs) {
        input.disabled = true;
    }

    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';
};
AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);

    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        btnPlusExpenses.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function() { 
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        btnPlusIncome.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value.trim(),
            cashExpenses = +item.querySelector('.expenses-amount').value.trim();

        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function() { 
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value.trim(),
        cashIncome = +item.querySelector('.income-amount').value.trim();

        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
};
AppData.prototype.getAddExpenses = function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function() {   
    for (let key in this.expenses) { 
        this.expensesMonth += this.expenses[key]; 
    }
};
AppData.prototype.getBudget = function() { 
    this.budgetMonth = this.budget - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30); 
};
AppData.prototype.getTargetMonth = function() { 
    return this.budgetDay <= 0 ?
    'Цель не будет достигнута' : Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function() { 
    if (this.budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
        return 'К сожалению, у вас уровень дохода ниже среднего';
    } else {
        return 'Что-то пошло не так: Ваши расходы превышают Ваши доходы';
    }
}
AppData.prototype.getInfoDeposit = function() {
    if(this.deposit) {
        this.moneyDeposit = promptNum('Какая сумма на депозите?', 10000);
        this.percentDeposit = promptNum('Какой годовой процент?', 6);
    }
};
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.checkPeriod = function() { 
    incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.reset = function() {
    const inputs = document.querySelectorAll('.calc input[type=text]');
    for (let input of inputs) {
        input.value = '';
        input.disabled = false;
    }

    if (incomeItems.length > 1) {
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
        }
        btnPlusIncome.style.display = 'block';
    }
    if (expensesItems.length > 1) {
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
        }
        btnPlusExpenses.style.display = 'block';
    }

    depositСheck.checked = false;
    periodSelect.value = 1;
    periodAmount.textContent = 1;

    periodSelect.removeEventListener('input', this.checkPeriod.bind(this));

    btnStart.style.display = 'block';
    btnCancel.style.display = 'none';

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.mission = 0;
    this.expensesMonth = 0;  
};

AppData.prototype.eventListeners = function() {
    salaryAmount.addEventListener('change', this.checkAmountInput.bind(this));
    periodSelect.addEventListener('input', function() { 
        periodAmount.textContent = periodSelect.value;
    });
    
    btnPlusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
    btnPlusIncome.addEventListener('click', this.addIncomeBlock.bind(this));
    
    btnStart.addEventListener('click', this.start.bind(this)); 
    btnCancel.addEventListener('click', this.reset.bind(this));
};
const appData = new AppData();
appData.eventListeners();
