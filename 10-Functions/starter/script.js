'use strict';
////FUNCTIONS: DEFAULT PARAMETERS
/*
const bookings = [];
const createBooking = function (flightNum, numPassenger = 1, price = 199) {
  //ES5
  //numPassenger = numPassenger || 1;
  //price = price || 199;

  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 500);
createBooking('Lh123', undefined, 20); ///to skip a default parameter
*/
/*
////HOW PASSING ARGUMENTS WORKS: VALUE VS. REFERENCE

const flight = 'LH123'; ///primitive type
const fabian = {
  name: 'Fabian',
  passport: 1234567,
};

///flightNum: is a copy of the original value
///passenger: we pass the fabian object, not a copy of it
const checkIN = function (flightNum, passenger) {
  flightNum = 'LH321'; ///as is a copy it does not change the original value
  passenger.name = 'Mr.' + passenger.name; ///it will change the name of the object

  if (passenger.passport === 1234567) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};
checkIN(flight, fabian);
console.log(flight); ///output---> LH123 eventhough we changed it in the checkIn function
console.log(fabian); ///output--->Mr Fabian
///WHEN WE PASS A REFERENCE TYPE TO A FUNCTION, WHAT IS COPIED IS REALLY JUST A REFERENCE TO THE OBJECT IN THE MEMORY HEAP (DOING THIS flightNum = flight). WHEN WE TRY TO COPY AN OBJECT LIKE THIS (const passenger = fabian) WE ARE REALLY ONLY COPYING THE REFERENCE TO THAT OBJECT IN THE MEMORY HEAP, BUT THEY BOTH POINT TO THE SAME OBJECT IN MEMORY. THAT IS WHY, WHEN WE PASS THE OBJECT AS AN ARGUMENT IN THE FUNCTION IT IS EXACTLY THE SAME AS MANIPULATING THE FABIAN OBJECT BECAUSE BOTH ARE THE SAME OBJECT IN THE MEMORY HEAP.

///PASSING BY VALUE AND PASSING BY REFERENCE. JAVASCRIPT DOES NOT HAVE PASSING BY REFERENCE. fOR OBJECTS, WE DO IN FACT PASS IN A REFERENCE, HOWEVER THAT REFERENCE ITSELF IS STILL A VALUE THAT CONTAINS A MEMORY ADDRESS. BASICALLY WE PASS A REFERENCE TO THE FUNCTION, BUT WE DO NOT PASS BY REFERENCE
*/

///FIRST-CLASS AND HIGHER-ORDER FUNCTIONS
///JavaScript is a language that has first class functions which in technical terms means that functions are so-called first citizens. In practice, that means that functions are simply treated as values. Since functions are values, there is a bunch of interesting things that we can do with them, like storing them in variables or objects properties, passing functions as arguments in other functions or return a function from another function. As functions are objects, there are also methods that we can call on functions.
///A higher order function is either a function that receives another function as an argument (callback function), or a function that returns a new function.

///FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
/*
///Creating a function that accepts aother functions as an input

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

///higher-order function
const transformer = function (str, fn) {
  console.log(`Originak string: ${str}`);
  console.log(`Transform string: ${fn(str)} `);

  console.log(`Transformed by: ${fn.name}`); ///fn.name-->the name of the function
};

transformer('JavaScript is the best', upperFirstWord);
transformer('JavaScript is the best', oneWord);
*/

/*
///FUNCTIONS RETURNING FUNCTIONS
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Erik');

///We can call the function at once
greet('Hello')('Fabian');

///Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Fede');
*/
/*
///THE CALL AND APLLY METHODS

const aerolineas = {
  airline: 'Aerolineas Argentinas',
  iataCode: 'AA',
  booking: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.booking.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const book = aerolineas.book;

aerolineas.book(239, 'Fabian Garcia');
aerolineas.book(634, 'Erik Dell');
//console.log(aerolineas);

const lapa = {
  airline: 'Lapa',
  iataCode: 'LP',
  booking: [],
};

///book(23, 'Federico Guevara '); ///This method will result in a typeError because book() is now just a regular function, and the this keyword in regular functions point to undefined. The this key word depends on how the function is actually called

///how do we tell javaScript explicitly or manually what the this keyword should look like?. There are 3 function methods to do that: call, apply and bind
*/
/*
///CALL METHOD
book.call(lapa, 23, 'Federico Guevara'); ///first argument: where the this keyword should point, then the rest of the arguments
console.log(lapa);

///let's recap what happened here
///we do not call the book function ourselves. Instead, we called the call method and it's then this call method, which will call the book function with the this keyword set to Lapa. So whatever we pass has the first argument of the call method. This allows us to manually and explicitly set the this keyword of any function that we want to call. Then all the arguments after the firstone are simply the arguments of the original function.

book.call(aerolineas, 555, 'Brenda Barrios');
console.log(aerolineas);

///APLLY METHOD
const flightData = [583, 'Fabian Garcia'];
book.apply(lapa, flightData); ///it is not used in modern javascript, usually replace by ---> book.call(lapa, ...flightData)
console.log(lapa);
book.call(lapa, ...flightData);
console.log(lapa);

///THE BIND METHOD
///The bind method does not immediately call the function. Instead it returns a new function where the this keyword is bound. So it's set to whatever value we pass into bind.
///Let's suppose that we need to use the book function for Lapa all the time

///book.call(lapa, 23, 'Federico Guevara');
const bookAA = book.bind(aerolineas);
const bookLa = book.bind(lapa); ///this will not call the book function.Instead it will return a new function where the this keyword will always be set to Lapa
bookLa(23, 'Silvia Daroch');

const bookLa23 = book.bind(lapa, 23); ///bookLa23 only needs the name because the flight number was set to 23
bookLa23('Walter Dell');
bookLa23('Viviana Pasos');

///We can use the bind method when we use objects together with event listeners
aerolineas.planes = 300;
aerolineas.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

///document.querySelector('.buy').addEventListener('click', aerolineas.buyPlane);output--> NaN because in an event handler function, the this keyword always points to the element on which that handler is attached to (aerolineas.buyPlane is attached to document.querySelector(".buy")). We need to manually define the this keyword
document
  .querySelector('.buy')
  .addEventListener('click', aerolineas.buyPlane.bind(aerolineas));

///Partial application for the bind method
///general function for adding tax
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

///now let's say that there is one tax that we use all the time

const addVAT = addTax.bind(null, 0.23);
///addVAT = value => value + value * 0.23
///the first parameter is where the this keyword points. In this case, it does not matter where the this keyword points because it is not even in the function addTax(), so it's kind of standard to just use null

console.log(addVAT(100));
console.log(addVAT(23));

///CREATE A FUNCTION THAT RETURND A FUNCTION WHICH SHOULD DO WHAT addVAT does.
///FUNCTIONS RETURNING FUNCTIONS

const otherTax = function (value) {
  return function (rate) {
    console.log(value + value * rate);
  };
};

const val = otherTax(200);
val(0.23);

///TEACHER'S SOLUTION
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(200));
*/
/*
Coding Challenge #1
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by
1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?
The Complete JavaScript Course 21
Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
Hints: Use many of the tools you learned about in this and the last section 😉
GOOD LUCK 😀

const poll = {
question: "What is your favourite programming language?",
options: ["0: JavaScript", "1: Python", "2: Rust", "3:
C++"],
// This generates [0, 0, 0, 0]. More in the next section!
answers: new Array(4).fill(0),
};
*/

/*My resolution
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const op = prompt(
      `What is your favourite programming language?
        0: JavaScript 
        1: Python 
        2: Rust 
        3: C++`
    );
    if (op < 0 || op > 3) {
      poll.registerNewAnswer();
    } else {
      poll.answers[op] = poll.answers[op] + 1;
      this.displayResults();
    }
  },
  displayResults: function (type) {
    console.log(poll.answers);
  },
};
//console.log(poll);
//poll.registerNewAnswer();
//console.log(poll.answers);
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

*/

///TEACHER'S RESOLUTION

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    ///get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    ///register the answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResult();
    this.displayResult('string');
  },
  displayResult(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      ///"Poll results are 13, 2, 4, 1"
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//Test data for bonus:
//§ Data 1: [5, 2, 3]
//§ Data 2: [1, 5, 3, 9, 6, 1]

poll.displayResult.call({ answers: [5, 2, 3] }, 'string');
