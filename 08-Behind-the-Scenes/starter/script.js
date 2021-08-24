'use strict';
///DIFFERENT EXAMPLES OF SCOPING
/*
//Function calcAge define in the global scope
function calcAge(birthyear) {
  ///It creates its own scope
  const age = 2037 - birthyear;
  console.log(firstName); ///this variables is available
  return age; ////because is a global variable
}

const firstName = 'Fabian';
calcAge(1991);
*/

/*
///The engine , when executing the printAge() function, is trying to find the age variable in the current scope. However, it cannot find it there. Therefore, it goes to the parent scope where it will find this age variable. The same happens with the birthyear variable.
function calcAge(birthyear) { 
  const age = 2037 - birthyear;

  function printAge() {
    const output = `You are ${age}, born in ${birthyear}.`;
    console.log(output);
  }

  printAge();

  return age;
}

const firstName = 'Fabian';
calcAge(1991);
console.log(age); ///Not possible, only reachable inside calcAge function
printAge(); ///global scope do not have access to printAge function because it is only reachable within calcAge function.
*/

/*
function calcAge(birthyear) {
  const age = 2037 - birthyear;

  function printAge() {
    const output = `You are ${age}, born in ${birthyear}.`;
    console.log(output);

    if (birthyear >= 1981 && birthyear <= 1996) {
      var millenial = true;
      const str = `Oh, and you're a millenial, ${firstName}`;
    }
    console.log(str); //it will not be printed because const and let variables are block scope. Str will be printed if console.log(str) is inside the if block
    console.log(millenial); //it will be printed because var variables are function scope so they simply ignore the block
  }

  printAge();

  return age;
}

const firstName = 'Fabian';
*/

///Functions are also block scope starting in the ES6
/*
function calcAge(birthyear) {
  const age = 2037 - birthyear;

  function printAge() {
    const output = `You are ${age}, born in ${birthyear}.`;
    console.log(output);

    if (birthyear >= 1981 && birthyear <= 1996) {
      var millenial = true;
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    console.log(millenial);
    console.log(add(2, 3)); ///not working becase the scope of add function is only the block where it was define. This is only true when we use the 'strict mode'. If we take out the 'strict mode', add function can be called.
  }

  printAge();

  return age;
}

const firstName = 'Fabian';
*/
/*
//What happens if we create a new varible inside the if block?
function calcAge(birthyear) {
  const age = 2037 - birthyear;

  function printAge() {
    const output = `You are ${age}, born in ${birthyear}.`;
    console.log(output);

    if (birthyear >= 1981 && birthyear <= 1996) {
      var millenial = true;
      const firstName = 'Erik';
      const str = `Oh, and you're a millenial, ${firstName}`; ///this block will print Fabian o Erik? It will print Erik because JavaScript looks for the variable name in the local scope. There is no problem in having two variables with the same name becase they are defined in different scopes
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    console.log(millenial);
    //console.log(add(2, 3));
  }

  printAge();

  return age;
}

const firstName = 'Fabian';
*/

/*
///What happens when we redefine a variable from a parent scope inside of a inner scope?
///We are in the printAge scope. At the beginning, we have the output variable. Then we have an inner scope, where we redefine the output variable from the outer scope
function calcAge(birthyear) {
  const age = 2037 - birthyear;

  function printAge() {
    let output = `You are ${age}, born in ${birthyear}.`;
    console.log(output);

    if (birthyear >= 1981 && birthyear <= 1996) {
      var millenial = true;
      const firstName = 'Erik';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      output = 'NEW OUTPUT';
    }

    console.log(millenial);
    //console.log(add(2, 3));
    console.log(output); ///It will print 'NEW OUTPUT'. This is because we manipulated an existing variable inside of a child scope.
  }

  printAge();

  return age;
}

const firstName = 'Fabian';
*/

///This key word in practice
//console.log(this); ///is simply the window object

/*
//declare function
const calcAge = function (birthyear) {
  console.log(2037 - birthyear);
  console.log(this); ///undefined: this takes this value because of the'strict mode'
};

calcAge(1988);
*/

/*
///arrow function
const calcAge = birthyear => {
  console.log(2037 - birthyear);
  console.log(this); ///window object. Arrow function does not get its own keyword. it simply uses the lexical keyword (the keyword of its parent function or scope, in this case, the window object)
};

calcAge(1988);
*/

/*
const fabian = {
  year: 1988,
  calcAge: function () {
    console.log(this); //fabian object
    console.log(2037 - this.year);
  },
};

fabian.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = fabian.calcAge; ///method borrowing
matilda.calcAge(); ///this keyword points to the ibject that is calling the mothod, in this case, matilda
*/

///this keyword in arrow functions and regular functions
/*
const fabian = {
  firstname: 'Fabian',
  year: 1988,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: () => console.log(`Hey ${this.firstName}`),
};

fabian.greet(); ///output --> Hey undefined
//This happens because arrow functions do not get their own this keyword. It will simply use the yhis keyword from its surroundings (the global scope in this case). 
*/
/*
var firstName = 'Matilda';
const fabian = {
  firdtname: 'Fabian',
  year: 1988,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: () => {
    console.log(`Hey ${this.firstName}`);
  },
};

fabian.greet(); ///output --> Hey Matilda
//This happens because arrow functions do not get their own this keyword. It will simply use the yhis keyword from its surroundings (var firstName). That is why, although fabian is calling the method, it prints "Hey Matilda".
*/
/*
const fabian = {
  firstname: 'Fabian',
  year: 1988,
  calcAge: function () {
    console.log(2037 - this.year);

    const isMillenial = function () {
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },

  greet: () => {
    console.log(`Hey ${this.firstName}`); ///Hey undefined
  },
};

fabian.greet();
fabian.calcAge();
*/

////Primitives vs Object in Practice
///changing primitive values in the call stack
///Primitive types
let lastName = 'William';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName, oldLastName);

////changing values of an object

///Reference types
const Jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = Jessica; ///just another variable in the stack pointing to the same memory address of the heap
marriedJessica.lastName = 'Davis';
///both objects have the same lastName because both have the same memory address reference
//console.log('Before marriage:', Jessica);
//console.log('After marriage:', marriedJessica);
/*
////How do I solve this?
///Changing objects
const Jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const jessicaCopy = Object.assign({}, Jessica2);
jessicaCopy.lastName = 'Davis';
console.log('Before marriage:', Jessica2);
console.log('After marriage:', jessicaCopy); ///A real copy of the original in  a new object
*/
///Problems with Object.assign
///Both object have 4 family members when that is not the case. ONE SOLUTION TO THIS PROBLEM WOULD BE TO USE AN EXTERNAL LIBRARY CALLED LO-DASH BUT THIS WILL BE SEEN LATER ON THE COURSE
const Jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Bob', 'Alice'],
};

const jessicaCopy = Object.assign({}, Jessica2); ///A shallow solution. It does not work for objects within an object
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary', 'John');
console.log('Before marriage:', Jessica2);
console.log('After marriage:', jessicaCopy);
