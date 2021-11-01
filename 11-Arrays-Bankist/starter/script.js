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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; ///this line of code takes out the two original elements before the foreach was executed. innerHTML is simmilar to text context. The difference is that text context simply returns the text itself, while HTML returns everithing, including the HTML

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    //this method accepts 2 strings: firt: the position in which we want to attach the html; second: the string containing de html that we want to insert
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

///Calculating and Display Balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((interest, i, arr) => {
      ///only calculate the interest when there are at least 1 euro
      //console.log(arr);
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interest}€`;
};

///Computing user's name
const createUserNames = function (accs) {
  ///array with all the accounts
  accs.forEach(function (acc) {
    //acc each account
    ///create a new property call username
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0]) //output ---> ['s', 't', 'w']
      .join(''); ///output--->stw
  });
};

createUserNames(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  ///display balance
  calcDisplayBalance(acc);
  ///display summary
  calcDisplaySummary(acc);
};

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

///IMPLEMENTING LOGIN
///Event handler
///when we attached an event listener to a button in a form element (in HTML, the default behavior when we click the submit button is for the page to reload) we need to stop the reloading of the page from happening. For that, we need to give the function the event parameter, and on that event we can call a method called preventDefault()

let currentAccount;

btnLogin.addEventListener('click', function (event) {
  ///prevent form from submitting
  event.preventDefault();

  ///the find() method will return undefined if no element matches the condition
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  ///optional chaining (?)first is checked if the current account exists, then if the cuurentAccount.pin is === to .....
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    ///display ui and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    ///opacity 100 so the information of the page appears
    containerApp.style.opacity = 100;

    ///clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    ///taking the cursor out of the pin input
    inputLoginPin.blur();
    ///display movements
    updateUI(currentAccount);
  }
});

///TRANSFER MONEY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //because is a form

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    ///doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
});

///GET A LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    ///add movement
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

///THE FINDINDEX METHOD
///THIS METHOD RETURNS THE INDEX OF THE FOUND ELEMENT AND NOT THE ELEMENT ITSELF
///Let's implement the closing an account method of our application

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    ///
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //Delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

///now we need to set sort = true whenever a person clicks on the sort button
///if we click on the buttton again it does not go back to normal. We change this by using a state variable which will monitor if we are currently sorting the array or not
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

///let's loop over the array, take the first letter of each element and then put them together into a new array

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

/*Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉
GOOD LUCK 😀


const julias1 = [3, 5, 2, 12, 7];
const kates1 = [4, 1, 15, 8, 3];
const julias2 = [9, 16, 6, 8, 3];
const kates2 = [10, 5, 6, 1, 4];

const checkDogs = function (arr1, arr2) {
  const juliasCorrect = arr1.slice();
  ///remove the first cat of the array
  juliasCorrect.splice(0, 1);
  ///remove the last two cats from the array
  juliasCorrect.splice(-2);

  ///creating one array with both data
  const newArr = juliasCorrect.concat(arr2);

  ///foreach
  newArr.forEach(function (dog, i) {
    dog >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old.`)
      : console.log(
          `Dog number ${i + 1} is still a puppy, and is ${dog} years old.`
        );
  });
};

checkDogs(julias1, kates1);
console.log('-----data 2------');
checkDogs(julias2, kates2);
*/

///DATA TRANSFORMATION:MAP, FILTER,REDUCE
///basically we use these methods to create new arrays based on transforming data from other arrays

///MAP: we can loop over the arrays. Is similar to the foreach method with the defference that map creates a brand new array based on the original array. Map builds us a brand new array containing the results of applying an operation to the original array. Example, [3, 1, 4] MAP current * 2 ---> [6, 2, 8]

/// FILTER: is used to filter for elements in the original array which satisfy a certain condition. In oder words, elements for which the condition is true, will be included in a new array that the filter method returns. All other elements will get filtered out, so they will not be included in the new array. Example, [3, 1, 4] FILTER current < 2 --->[1]

///REDUCE: used to boil down all the elements of the original array into one single value. An example of this,  can be to add all the elements of an array together. Is the single value the one that is return from the reduce method in the end, so there is no new array in this case, but only the reduce value.

/*
///THE MAP METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///Let's suppose that this movements are in Euros and we want to convert them to US dollars. 1 Euro = 1.1 US dollar
const eurToUsd = 1.1;

const movementsUsd = movements.map(function (mov) {
  return mov * eurToUsd;
});

///we are going to do the same but with an arrow function
const movToUsd = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUsd);
console.log(movToUsd);

///Just as the forEach() loop. the map method has access to same three parameters (value, index, array)
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);
*/

/*
///THE FILTER METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

/*
///THE REDUCE METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///movements.reduce() takes two parameters. First, the callback function, second the accumulator used in the callback function (the firdt element "acc")

const balance = movements.reduce(function (acc, mov, i, arr) {
  ///first element: accumulator
  ///second element: current element of the array
  ///third element: index
  ///forth element: array
  return acc + mov;
}, 0);
console.log(balance);

// now with an arrow function
// const balance = movements.reduce((acc, mov) => acc + mov, 0);
// console.log(balance);

///We can also do other stuff than add some values when using the reduce() method

///Let's get the maximum value of the movements array
const maximum = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(maximum);
*/
/*CODING CHALLENGE #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀


const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  //1.
  const dogAgeInHumans = ages.map(age => (age <= 2 ? age * 2 : age * 4 + 16));
  console.log(dogAgeInHumans);

  //2.
  const dogsOlder18 = dogAgeInHumans.filter(age => age > 18);
  console.log(dogsOlder18);

  //3.
  const avg =
    dogsOlder18.reduce((acc, age) => acc + age, 0) / dogsOlder18.length;
  return avg;
};

console.log(calcAverageHumanAge(data1));
console.log(calcAverageHumanAge(data2));
*/

/*
///THE MAGIC OF CHAINING METHODS
///lET'S SAY THAT WE WANTED TO TAKE ALL THE MOVEMENTS DEPOSITS THEN CONVERT THEM FROM EUROS TO DOLLARS AND FINALLY ADD THEM ALL UP RO KNOW HOW MUCH WE DEPOSITED IN THE ACCOUNT IN US DOLLARS. WE CAN CHAIN A METHOD AFTER ANOTHER ONE IF THE RETURNING METHOD RETURNS AN ARRAY

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
///first we filter de deposits, then we transform the money to dollars and then we sum all the deposits
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/

/*Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge(data1));
console.log(calcAverageHumanAge(data2));
*/
/*
///THE FIND METHOD
///WE CAN USE THE FIND METHOD TO RETRIEVE ONE ELEMENT OF AN ARRAY BASED ON A CONDITION. THE FIND METHOD ALSO NEEDS A CALLBACK FUNCTION THAT RETURNS A BOOLEAN. UNLIKE THE FILTER METHOD, THE FIND METHOD WILL ACTUALLY NOT RETURN A NEW ARRAY BUT IT WILL ONLY RETURN THE FIRST ELEMENT IN THE ARRAY THAT SATISFIES THIS CONDITION

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

/*
///SOME AND EVERY
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///here the includes() method only checks for equality
console.log(movements);
console.log(movements.includes(-130));

///What if we want to test for a condition? Here the some method comes into play. Let's say that we want to know if there has been any deposit on this account

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); ///output--->true

///EVERY
console.log(movements.every(mov => mov > 0));

///Separate callback

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
*/

/*
///FLAT AND FLATMAP

///What if we wanted to take all these elements in the separate and put all of these together in just one big array
///The falt method removed the nested arrays and flattened the array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [
  [
    [1, 2, 3],
    [4, 5, 6],
  ],
  7,
  8,
];
console.log(arrDeep.flat(2)); ///The argument inside the flat() method especifies the level of nested arrays we want to go in order to flat the array

///Let's say that the bank wants to calculate the overall balance of all the movements of all the accounts

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

///The flatMap() method essentially combines a map and a flat method into just one method which is better for performance

const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);
*/

/*
///SORTING ARRAYS

///With strings
const owners = ['Erik', 'Fede', 'Fabi', 'Brenda'];
console.log(owners.sort()); ///we get our array sorted automatically from A to Z. This actually mutate our original array
console.log(owners);

//With numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
console.log(movements.sort()); ///this is not the result we are expecting because these numbers are not at all ordered in any way. The reason for this is that the sort method does the sorting based on strings. We can fix this by passing in a compare callback function into the sort method. This callback function is called with two arguments(the current and the sort value)
/// RETURN < 0, A, B (keep order)
/// RETURN > 0, B, A (switch order)
///ascending order
movements.sort((a, b) => {
  if (a > b) return 1; ///means to switch the order
  if (b > a) return -1;
});
console.log(movements);

movements.sort((a, b) => a - b);
console.log(movements);
///descending order
movements.sort((a, b) => {
  if (a > b) return -1; ///means to switch the order
  if (b > a) return 1;
});
console.log(movements);
*/
/*
///MORE WAYS OF CREATING AND FILLING ARRAYS
///we've been creating arrays like this:

///EMPTY ARRAYS + FILL METHOD
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
///In these examples we have our data so we could then manually create these arrays

///We can actually generate arrays programmatically. The easiest one is to again, use the array() constructor function

///When we pass one argument to the array constructor then it creates a new empty argument with that length. We can only use one method in this array and that method is thr fill() method. This method mutates the actual array.

///FILL METHOD: besides the value that we want to fill the array with, we can also specify where we want it to start to fill

const x = new Array(7);
console.log(x);
//x.fill(1);--->output-->[1, 1, 1, 1, 1, 1, 1]
//x.fill(1, 3); //output-->[empty x 3, 1, 1, 1, 1]
x.fill(1, 3, 5); //output-->[empty x 3, 1, 1, empty x 2]
console.log(x);

///we can also fill arrays that are not empty
arr.fill(23, 2, 6);
console.log(arr);

///ARRAY.FROM() FUNCTION
///we are not using the from method on an array, instead we are using it on the Array() constructor.

//first argument: an object with the length, second argument: a mapping function, exactly like the call back function that we pass into the map() method
const y = Array.from({ length: 7 }, () => 1); ///recreating the array fill with seven 1
console.log(y);

///let's create the intial array from 1 to 7. We put the underscore to show other programmenrs taht we only need to use the second parameter
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

///1) We use Array.from() to create an array from the result of document.querySelectorAll() which is a nodeList, which is not really an array, but an array like structure that can easily be converted to ana array
//2) We included a mapping function which then forms that initial array to an array exactly as we want it

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
});
*/

///SUMMARY: WHICH ARRAY METHOD TO USE?
/*MUTATE THE ORIGINAL ARRAY

ADD TO ORIGINAL:
.PUSH (END)
.UNSHIFT (START)

REMOVE FROM ORIGINAL:
.POP (END)
.SHIFT (START)
.SPLICE (ANY)

OTHERS:
.REVERSE()
.SORT()
.FILL()
*/

/* A NEW ARRAY

COMPUTED FROM ORIGINAL:
.MAP (LOOP)

FILTER USING CONDITION:
.FILTER()

PORTION OF ORIGINAL:
.SLICE()

ADDING ORIGINAL TO OTHER:
.CONCAT()

FLATTERING THE ORIGINAL:
.FLAT()
.FLATMAP()
*/

/* AN ARRAY INDEX

BASED ON VALUE:
.INDEXOF()

BASED ON CONDITION:
.FINDINDEX()
*/

/* AN ARRAY ELEMENT
.FIND()
*/

/* KNOW IF ARRAY INCLUDES

BASED ON VALUE:
.INCLUDES()

BASED ON TEST CONDITION:
.SOME()
.EVERY()
/*

/* A NEW STRING

BASED ON SEPARATORS STRING:
.JOIN()
*/

/* TO TRANSFORM TO VALUE

BASED ON ACCUMULATOR:
.REDUCE()
*/

/* JUST TO LOOP ARRAY

BASED ON CALLBACK:
.FOREACH()
*/

////ARRAY METHODS PRACTICE
/*
///1. Calculate how much money was deposit in total in the bank

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

///2.Count how many deposits there have been in the bank with at least $1.000

///option 1

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);


///option 2
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
///(cur >= 1000 ? count + 1 : count)
console.log(numDeposits1000);

///3.Create an object which contains the sum of the deposits and of the withdrawals

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

//4.Create a simple function to convert any string to a title case
///this is a nice title ->? This Is a Nice Title

const convertTitlecase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'and', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLocaleLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  ///Logic: if the current word is included in the exceptions array then simply return that word. If not, then capitalize it
  return capitalize(titleCase);
};

console.log(convertTitlecase('this is a nice title'));
console.log(convertTitlecase('this is a LONG title but not too long'));
console.log(convertTitlecase('and here is another title with a EXAMPLE'));
*/
/*Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)

Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
Test data:
const dogs = [
{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
{ weight: 8, curFood: 200, owners: ['Matilda'] },
{ weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
{ weight: 32, curFood: 340, owners: ['Michael'] },
];
GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
dogs.forEach(function (dog, i) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

//2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'much.' : 'little.'
  }`
);

//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

//6.
const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(checkEatingOkay));

//7.
const dogsEatingOk = dogs.filter(checkEatingOkay);
console.log(dogsEatingOk);

//.8
const arr = dogs.slice();
console.log(
  arr.sort((a, b) => {
    if (a.recommendedFood < b.recommendedFood) return -1;
    if (b.recommendedFood < a.recommendedFood) return 1;
  })
);
