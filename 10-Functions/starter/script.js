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
