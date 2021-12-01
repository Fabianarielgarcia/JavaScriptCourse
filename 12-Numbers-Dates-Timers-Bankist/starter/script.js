'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-11-03T17:01:17.194Z',
    '2021-11-19T23:36:17.929Z',
    '2021-11-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2021-11-19T18:49:59.371Z',
    '2021-11-21T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  ///console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} dys ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);
    const calcDaysPassed = (date1, date2) =>
      Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

    const formattedMov = formatCurr(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    //Decrese one second
    time--;
  };
  //set time to 5 minutes
  let time = 120;
  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
///////////////////////////////////////
// Event handlers
let currentAccount, timer;

///FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

///Experimenting API

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    ///Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);

      ///Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);

      //Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  /*
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  */
  displayMovements(acc.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
////CONVERTING AND CHECKING NUMBERS

///All numbers in JavaScript are represented internally as floating numbers.
console.log(23 === 23.0); ///output-> true

console.log(0.1 + 0.2); ///->0.3000004
console.log(0.1 + 0.2 === 0.3); //false

///convert a string into a number
console.log(Number('23'));
console.log(+'23'); //when JavaScript sees the plus symbol it will do type coercion

///Parsing: in order to this to function, the string needs to start with a number
console.log(Number.parseInt('30px', 10)); //output-> 30
console.log(Number.parseInt('a30', 10)); //->output NaN

console.log(Number.parseFloat('2.5rem')); //output-> 2.5
console.log(Number.parseInt('2.5rem')); //output-> 2, we only get the integer part

///the parseInt() function actually accepts a second argument, which is the so-called regex (the base of the numeral system that we are using)

///isNaN(): check if value NaN
console.log(Number.isNaN(20)); //output->false because 20 is a number
console.log(Number.isNaN('20')); //output->false, because it is a regular value
console.log(Number.isNaN(+'20X')); //output-> true
console.log(Number.isNaN(23 / 0)); //output->false, infinity is also NaN

//isFinite(): better way to check if a value is a number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false

///isInteger()
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //false
*/

/*
///MATH AND ROUNDING

/// Square root (raiz cuadrada)
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3)); // 2

///get the maximum value of a coule of values
console.log(Math.max(5, 2, 23, 25, 10)); //25
console.log(Math.max(5, 2, 23, '25', 10)); // 25

console.log(Math.max(5, 2, 23, '25px', 10)); // NaN;
console.log(Math.max(5, 2, 23, 25, '10x')); // NaN

///get the minimum value of a coule of values
console.log(Math.min(5, 2, 23, 25, 10)); // 29

///constants on the math object
console.log(Math.PI * Number.parseFloat('10px') ** 2); ///el area de un circulo con la constante PI

//random() function
console.log(Math.trunc(Math.random() * 6) + 1);

//lets generalize this formula to always get two different random numbers between two numbers

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

//console.log(randomInt(10, 20));

///Rounding Integers
//Math.trunc(): it removes any decimal part
console.log(Math.trunc(23.3));
console.log(Math.trunc('23.3'));

///Math.round(): it rounds to the nearest Integer
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

///Math.ceil(): it rounds up
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

//Math.floor(): it rounds down
console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

///Trunc and floor do the same when working with positive numbers. However, they do not function in the same way when working with negative numbers

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24

///Rounding decimals
//toFixed() method: this method will always return a string instead of a number
console.log((2.7).toFixed(0)); /// 3
console.log((2.7).toFixed(3)); /// 2.700, it adds 0 until it has exactly three decimal parts
console.log((2.345).toFixed(2)); //2.35
console.log(+(2.345).toFixed(2)); //2.35
*/

/*
///THE REMINDER OPERATOR
//The reminder operator has some special use cases. It simply returns the reminder of a division

console.log(5 % 2); // 1 (reminder)
console.log(5 / 2); // 5 = 2 * 2 + 1 ( reminder)
console.log(8 % 3); // 2

///check if a certain number is even or odd
console.log(6 % 2); // 0
console.log(7 % 2); // 1

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

///Let's paint our even rows orange and blue
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
///WORKKING WITH BIGINT
///Is a special type of integers. Whe indicate that we are using a big integer by adding a 'n' at the end of the number. We can´t mix BigInt with regular numbers

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4444444444566666666666455132n);
console.log(BigInt(444444444456));

///Operations
console.log(10000n + 10000n);
console.log(55542163241634163411541n * 54135416541351653411n);

///Math operations are not allow with BigInt
///console.log(Math.sqrt(16n));///error
const huge = 221135416531534163513103n;
const num = 23;
//console.log(huge * num); ///error
console.log(huge * BigInt(num));

///There are two exceptions to this which are the comparison operators and the plus operator when working eith strings

///Exception
console.log(20n > 15); ///true
console.log(20n === 20); ///false because when we use the triple operator JavaScript does not do type coercion, and these two values have different type (a regular number and a BigInt)
console.log(typeof 20n);
console.log(20n == 20); ///true

//huge (BigInt) is converted to a string
console.log(huge + 'is REALLY big!!!');

///Dvisions
console.log(10n / 3n); ///3n, it returns the closest BigInt, and the decimal part is cut
console.log(10 / 3);
*/

///CREATING DATES
//Date and time can be a little be messy and confusing in JavaScript

///We need to actually create a date
/*
///first way:to sumply use the new date constructor
const now = new Date();
console.log(now);

///second way: to parse the date from a date string
console.log(new Date('Fri Nov 05 2021 17:41:24'));
///we can also write a string ourselves. However, it is not a good idea to do this because it can be quite unreliable. If the string was created by JavaScript, then of course it is pretty safe
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

///we can also pass year, day, hours, minutes and even seconds in this constructor
console.log(new Date(2017, 10, 19, 15, 23, 5)); ///output-> Sun Nov 19 2017 15:23:05 GMT-0300 (The month is zero based second parameter = 10 = Nov )

///JavaScript automatically corrects the date as November does not have 31 days, it corrects to December the first
console.log(new Date(2017, 10, 31));

//we can also pass into the  date constructor function, the amount of miliseconds passed since the beginning of the unix time, which is January 1, 1970
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

///Date's methods
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

///getFullYear()
console.log(future.getFullYear()); //2037
//getMonth()
console.log(future.getMonth()); //10 (Nov)
///getDay()
console.log(future.getDate()); //19
//getDat()
console.log(future.getDay()); //4 (day of the week)
///getHours()
console.log(future.getHours());
//getMinutes()
console.log(future.getMinutes());
//get Seconds()
console.log(future.getSeconds());
///toISOString(): get a formated string
console.log(future.toISOString());
//get timestamp(): miliseconds which have passed dince January 1, 1970
console.log(future.getTime()); //2142267780000
///we can reverse the number that we got above
console.log(new Date(2142267780000));

///get the timestamp from right now
console.log(Date.now());

///Set data to the time
future.setFullYear(2040);
console.log(future);
*/

/*
///OPERATION WITH DATE

///SUBSTRACTION WITH DATES
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

///create a function that takes two dates and calculate how many days pass between those two dates

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1);
*/

/*
///INTERNATIONALIZING NUMBERS (INTL)
const num = 3884764.23;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  useGrouping: false,
};
console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));

console.log(
  'Germany:      ',
  new Intl.NumberFormat('de-DE', options).format(num)
);

console.log('Argentina: ', new Intl.NumberFormat('es-Ar', options).format(num));

console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

///TIMERS:SETTIMEOUT AND SETINTERVAL

/// SETTIMEOUT timer runs just once after a defined time, while the SETINTERVAL timer keeps running basically forever, until we stop it.

///let´s use settimeout to simulate ordering a pizza
///first parameter: a callback function
///second parameter: the amount of milliseconds that will pass until this function is called

const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(() => console.log('Here is your pizza 🍕'), 3000);
console.log('Waiting');
///everything that comes after the milisecinds are the parameters used in the callback function
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza  with ${ing1} and ${ing2}🍕`),
  3000,
  ...ingredients
);
///this conditional is executed to delete the setTimeout
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

///SETINTERVAL
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 5000);
