'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },
};

///THE SPREAD OPERATOR
///We can use the spread operator to basically expand an array into all its elements

///What happens if we want to create a new array based on this array but with new elements at the beginning
const arr = [7, 8, 9];

/*we could do:
const newArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(newArr);
*/

///Using the spread operator
const newArr = [1, 2, ...arr];
console.log(newArr); ///---> [1, 2 ,7, 8 ,9]
console.log(...newArr); ///it logs the individual elements of the array

/***THE BIG DIFFERENCE BETWEEN THE SPREAD OPERATOR AND DESTRUCTURING IS THAT THE SPREAD OPERATOR TAKES ALL THE ELEMENTS FROM THE ARRAY AND IT ALSO DOES NOT CREATE NEW VARIABLES. AS A CONSEQUENCE, WE CAN ONLY USE IT IN PLACES WHERE WE WOULD OTHERWISE WRITE VALUES SEPARATED BY COMMAS.
 */

///1) Copy array.
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

///2) Join 2 arrays
const newMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(newMenu);

///The spread operator works on all iterables. Iterables are arrays, strings, maps, sets, NOT OBJECTS

const str = 'Fabian';
const letters = [...str];
console.log(letters);

///Write a function that accepts multiple arguments and the use the spread operator to actually pass those argumments

const ingredients = [
  prompt("Let's make pasta! Ingrediente 1?"),
  prompt('Ingrediente 2?'),
  prompt('Ingrediente 3?'),
];

console.log(ingredients);

restaurant.orderPasta(...ingredients);

///Since  ES 2018, the spread operator also works on objects

///Objects
///Lets create a new restaurant with the original data plus some additional data

const newRestaurant = { founding: 1998, ...restaurant, founder: 'Fabian' };

console.log(newRestaurant);

///Copy an object
const restaurantCopy = { ...restaurant };

///changing the name of the copy restaurant
restaurantCopy.name = 'La Piazzeta';

console.log(restaurantCopy.name);
console.log(restaurant.name);
/*If we do this
const newArr = [1, 2, arr];
console.log(newArr); ---> [1, 2, Array(3)]
///DESTRUCTURING OBJECTS
//To destructure an object we use "{}". Then we provide the variable names that exactly match the property names that we want to retrieve from the object. We do not have to forget that in an ovject the order of the properties do not matter

const { name, openingHours, categories } = restaurant;
//console.log(name, openingHours, categories);

///What if we want the variable names to be different from the properties names?
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
//console.log(restaurantName, hours, tags);
///DEFAULT VALUES
///We can have default values for examples when we are trying to read a property that does not exist on the object. This can be useful wen we do not work with hard-coded data
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

///MUTATING VARIABLES
///mutating variables while destructuring objects

let a = 111; ///should become 23
let b = 999; ///should become 7

const obj = { a: 23, b: 7, c: 14 };

///{a, b} = obj; Error because JavaScript expects a block of code when we start a new line with "{}"

({ a, b } = obj);
console.log(a, b);

///NESTED OBJECTS
const {
  fri: { open, close },
} = openingHours;
console.log(open, close); ///output --> 11 23

///ARRAY DESTRUCTURING (UNPACKING VALUES INTO SEPARATE VARIABLES)
/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const v = arr[2];
//or
const [x, y, z] = arr;
console.log(x, y, z);
///the original array is not affected
console.log(arr);

///working with the restaurant

const [first, second] = restaurant.categories;
console.log(first, second);

///what if we want to destruct the first and the third element?
const [first, , third] = restaurant.categories;
console.log(first, third);

///what if the owner of the restaurant decides to change the order of the categories
//switching variables
let [main, secondary] = restaurant.categories;

[main, secondary] = [secondary, main];
console.log(main, secondary);

//Receive 2 return values from a function
const [starter, mainMenu] = restaurant.order(2, 0);
console.log(starter, mainMenu);

///What happens if we have a nested array
const nested = [2, 4, [5, 6]];

const [i, , j] = nested;
console.log(i, j);

//what happens if we want all the individual values

const [l, , [m, n]] = nested;
console.log(l, m, n);

///we also can set default values for the variables when we are destructuring

///default values
const [p, q, r] = [8, 9];
console.log(p, q, r); ///we get r = undefined because one of the arrays have only two values

///this can be useful for example when we get data from an API
const [c = 1, d = 1, f = 1] = [8, 9];
console.log(c, d, f); ///we get c=8, d= 9, f=1
*/
