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
