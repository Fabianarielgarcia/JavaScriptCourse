'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; ///this line of code takes out the two original elements before the foreach was executed. innerHTML is simmilar to text context. The difference is that text context simply returns the text itself, while HTML returns everithing, including the HTML
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    //this method accepts 2 strings: firt: the position in which we want to attach the html; second: the string containing de html that we want to insert
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
///ARRAY METHODS
let arr = ['a', 'b', 'c', 'd', 'e'];

////SLICE METHOD: we can extract part of any array without changing the original array

console.log(arr.slice(2)); ///index at which we will start extracting (from 'c', to the end). This slice method will return a new array. This does not mutate the original arr array, it returns a new array
///we can also define the end parameter
console.log(arr.slice(2, 4)); //['c', 'd']. Just like in strings, the end parameter is not included in the output. The length of the new array will be the end parameter(4) minus the initial parameter(2) 4-2 = 2.

///like in strings, we can define a negative begin parameter, and then it will start to copy from the end of the array.
console.log(arr.slice(-2)); ///['d', 'e']; ---> -1 is always the last element of the array
console.log(arr.slice(1, -2)); ///['b', 'c']; it starts extracting at position 1 and extracts everything except the last two elements

///we can use the slice method to create a shallow copy of the array. To do that, we simply call it without any parameter
console.log(arr.slice());
///we can doit with the spread operator
console.log([...arr]);

///SPLICE METHOD: it works in a similar way to the slice method, but it actually change (mutate) the original array. In general, we are not interesting in which elements retur the splice method, we just use it to delete elements. It is used generally to remove the last elelement of the array
console.log(arr.splice(2)); ///['a', 'b', 'c'], but the arr array changed
console.log(arr); //['a', 'b'] it changed
console.log(arr.splice(-1)); //['b']
///The splice method with 2 parameters means: the first parameters is not included and the second parameter are the elements that are going to be removed. Example, if we have the original arr array, and we do arr.splice(1, 2), means that we ar going to remove from index one the following two elements. So ['a', 'b', 'c', 'd', 'e'] will be transformed into ['a', 'd', 'e']

///REVERSE METHOD
let ar = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); ///the reverse method actually mutate the original array
console.log(arr2);

///CONCAT METHOD: is used to cancatenate two arrays. We have to specified the second array. THIS METHOD DOES NOT MUTATE THE ORIGINAL ARRAY
const letters = ar.concat(arr2);
console.log(letters); ///USING THE CONCAT METHOD

///we also did it in a different way
console.log([...ar, ...arr2]); ///USING THE SPREAD OPERATOR TO CONCATENATE TWO ARRAYS

///JOIN METHOD: it joins all the elements passing a separator as parameter
console.log(letters.join(' - ')); ///the result is a string with the separator that we specified

///WE HAVE ALREADY SEEN METHODS: PUSH(), SHIFT(), UNSHIFT(), POP(), INDEXOF(), INCLUDES().
*/

/*
///LOOPING ARRAYS: FOREACH
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///LET'S LOOP OVER THIS ARRAY IN ORDER TO PRINT SOMETHING FOE EACH MOVEMENT IN THIS BANK ACCOUNT

///Example using the for of loop
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`); ///math.abs shows the absolute value by removing the sign (-)
  }
}

///EXAMPLE USING THE FOREACH LOOP. The foreach function requires a callback function. foreach() is a higer order function which requires a callback function in order to tell it what to do. Te forEach method will loop over the array and in ech iteration it will call the callback function. In each iteration, the forEach method will pass the current element of the array as an argument
console.log('----FOREACH-----');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

///WHAT IF WE NEED ACCES TO A COUNTER VARIABLE HERE
console.log('---FOR OF LOOP WITH ENTRIES()----');
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('----FOREACH WITH INDEX-----');
///FOREACH METHOD PASSES THE CURRENT ELEMENT OF THE ARRAY, THE INDEX AND THE ENTIRE ARRAY WE ARE LOOPING. THEREFOR WE CAN SPECIFY THEM IN THE PARAMETERS LIST
///first parameter: current elelement, second parameter: the current index, third parameter: the entire array. This is the order in which the current parameters are passed in the callback function
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

///DIFFERENCE BETWEEN FOREACH LOOP AND FOR OF LOOP: WE CANNOT BREAK UP A FOREACH LOOP, SO THE CONTINUE AND BREAK STATEMENTS DOES NOT WORK ON A FOREACH LOOP AT ALL. iF WE NEED TO BREAK UP A LOOP, WE HAVE TO CONTINUE USING THE FOR OF LOOP.
*/

/*
///FOREACH WITH MAPS AND SETS

///Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

///Set
///THE KEY IS EXACTLY THE SAME AS THE VALUE
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
*/
