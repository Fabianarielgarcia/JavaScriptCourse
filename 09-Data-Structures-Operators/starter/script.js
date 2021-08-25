'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

///ARRAY DESTRUCTURING (UNPACKING VALUES INTO SEPARATE VARIABLES)

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
/*
const [first, second] = restaurant.categories;
console.log(first, second);
*/
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
console.log(c, d, f); ///we get r = undefined because one of
