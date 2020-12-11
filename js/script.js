'use strict';
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
    periodAmount = document.querySelector('.period-amount'),
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    resultInputs = document.querySelectorAll('.result input');
    
let leftInputs = document.querySelectorAll('.data input[type=text]'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    resultStorage = {};

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
const isString = function(str) {
    str.trim();
    return isNaN(str) && str !== '';
};
const setCookie = (key, value) => {
    let cookieStr = key + '=' + value;
    let date = Date.now() + 1000*60*60*24*7;
    date = new Date(date);
    cookieStr += '; expires = ' + date.toGMTString();
    document.cookie = cookieStr;
};
const unsetCookie = (key) => {
    let cookieStr = key + '= ""';
    let date = Date.now() - 1000000;
    date = new Date(date);
    cookieStr += '; expires = ' + date.toGMTString();
    document.cookie = cookieStr;
};
const checkCookie = (resultObj) => {
    for (const key in resultObj) {
        if(!document.cookie.includes(key)) {return false;}
    }
    if(!document.cookie.includes('isLoad')) {return false;}
    return true;
};

const init = function() {
    if (localStorage.budget) {
        resultStorage = JSON.parse(localStorage.budget);
        if (checkCookie(resultStorage)) { //все куки на месте?
            // да: нарисуй из локалСт
            resultInputs.forEach(item => {
                item.value = resultStorage[item.classList[1]];
            });
            for (let input of leftInputs) {
                input.disabled = true;
            }
            btnStart.style.display = 'none';
            btnCancel.style.display = 'block';
        } else { //нет: грохнуть весь сторедж
            for (const key in resultStorage) {
                unsetCookie(key);
            }
            unsetCookie('isLoad');
            localStorage.removeItem('budget');
        }
        
    } 
};

class AppData {
    constructor() {
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
    }
        
    checkAmountInput() {
        btnStart.disabled = false;
    }
    start() {
        if (salaryAmount.value === '') {
            btnStart.disabled = true;
            return;
        }
        if (depositСheck.checked) { 
            if (depositPercent.value > 100) {
                alert('Введите корректное значение в поле проценты'); 
                return;
            }
        }
        this.budget = +salaryAmount.value;
        this.getIncome();
        this.getExpenses();
        this.getExpensesMonth(); 
        this.getInfoDeposit();
        this.getBudget(); 
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();
        this.saveToStorage();

        periodSelect.addEventListener('input', this.checkPeriod.bind(this));

        leftInputs = document.querySelectorAll('.data input[type=text]');
        for (let input of leftInputs) {
            input.disabled = true;
        }

        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    }
    saveToStorage() {
        const inputObj = {};
        for (let input of resultInputs) {
            inputObj[input.classList[1]] = input.value;
        }
        localStorage.budget = JSON.stringify(inputObj);

        setCookie('isLoad', 'true');
        for (const key in inputObj) {
            setCookie(key, inputObj[key]);
        }
        
    }
    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnPlusExpenses.style.display = 'none';
        }
    }
    addIncomeBlock() { 
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncome);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnPlusIncome.style.display = 'none';
        }
    }
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value.trim(),
                cashExpenses = +item.querySelector('.expenses-amount').value.trim();

            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    getIncome() { 
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value.trim(),
            cashIncome = +item.querySelector('.income-amount').value.trim();

            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
    }
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() {   
        for (let key in this.expenses) { 
            this.expensesMonth += this.expenses[key]; 
        }
    }
    getBudget() { 
        const monthDeposit = depositСheck.checked ? (this.moneyDeposit * (this.percentDeposit / 100)) / 12 : 0; 
        this.budgetMonth = Math.floor(this.budget - this.expensesMonth + monthDeposit);
        this.budgetDay = Math.floor(this.budgetMonth / 30); 
    }
    getTargetMonth() { 
        return this.budgetDay <= 0 ?
        'Цель не будет достигнута' : Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome() { 
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
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    checkPeriod() { 
        incomePeriodValue.value = this.calcSavedMoney();
    }
    reset() {
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

        for (const key in resultStorage) {
            unsetCookie(key);
        }
        unsetCookie('isLoad');
        localStorage.removeItem('budget');

    }


    getInfoDeposit() {
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') { 
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            depositPercent.addEventListener('input', () => {               
                depositPercent.value = depositPercent.value.replace(/[^\d]/g, ''); 
                if (depositPercent.value > 100) {
                    depositPercent.value = 100;
                }
            });
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            depositPercent.removeEventListener('input', this.checkPercent);
        }
    }

    depositHandler() {
        if(depositСheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventListeners() {
        salaryAmount.addEventListener('change', this.checkAmountInput.bind(this));
        periodSelect.addEventListener('input', function() { 
            periodAmount.textContent = periodSelect.value;
        });
        
        btnPlusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
        btnPlusIncome.addEventListener('click', this.addIncomeBlock.bind(this));
        
        btnStart.addEventListener('click', this.start.bind(this)); 
        btnCancel.addEventListener('click', this.reset.bind(this));

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}
const appData = new AppData();
appData.eventListeners();

init();