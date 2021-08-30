'use strict';
/*
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

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
*/
/**We can use the && and || operators for short circuiting. Logical operators can use any data type and they can return any data type. In the case of the or operator, short-circuiting means that if the first value is a trurhy value, then the other operand will not even be avaluated and it will immediately return that first value.*/

/*
console.log('----OR-->SHORT-CIRCUITING-----');
console.log(33 || 'Fabian');
console.log('' || 'Fabian');
console.log(true || '0');
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);


*/
/**When it comes to short-circuiting, the AND operator works in the opposite way of the or operator. The and operator short circuits when the first value is falsy. Then immediately returns that falsy value without even evaluating the second operand*/

/*
console.log('----&&-->SHORT-CIRCUITING-----');

console.log(0 && 'Fabian');
console.log(7 && 'Fabian');
console.log(7 && 'Fabian' && null && undefined && 0);

///practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');


*/
///REST PATTERNS AND REST PARAMETERS
/** The rest patter has the same look as the spread operator but it does exactly the opposite. The rest pattern is used to collect multiple elements and condense them into an array*/
/*
//1) Destructuring
///SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

///REST, because on LEFT side of = . As the rest pattern does not skipped any element, so, for that reason, the rest patter always must be the last in  the destructuring assignment because otherwise how will JavaScript know until when it should collect the rest of the array. For the same reason, there can only be one rest pattern in any destructuring assignment.
const [a, b, ...others] = [1, 2, 3, 4, 3];
console.log(a, b, others);

const [pizza, , rissotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, rissotto, otherFood);

///Rest pattern in objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat, weekDays);

///2) funcionas
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

restaurant.orderPizza('mushrooms');
*/

///THE SPREAD OPERATOR
///We can use the spread operator to basically expand an array into all its elements

///What happens if we want to create a new array based on this array but with new elements at the beginning
const arr = [7, 8, 9];

/*we could do:
const newArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(newArr);
*/

///Using the spread operator

/*
const newArr = [1, 2, ...arr];
console.log(newArr); ///---> [1, 2 ,7, 8 ,9]
console.log(...newArr); ///it logs the individual elements of the array



*/
/***THE BIG DIFFERENCE BETWEEN THE SPREAD OPERATOR AND DESTRUCTURING IS THAT THE SPREAD OPERATOR TAKES ALL THE ELEMENTS FROM THE ARRAY AND IT ALSO DOES NOT CREATE NEW VARIABLES. AS A CONSEQUENCE, WE CAN ONLY USE IT IN PLACES WHERE WE WOULD OTHERWISE WRITE VALUES SEPARATED BY COMMAS.
 */

/*
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

*/
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

/***We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team (variables 'players1' and
'players2')
2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
3. Create an array 'allPlayers' containing all players of both teams (22
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored
GOOD LUCK 😀 

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

///1: Destructuring game.players
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

///2
const [gk, ...fieldPlayers] = game.players[0]; ///or players1;
console.log(gk);
console.log(fieldPlayers);

///3
const allPlayers = [...game.players[0], ...game.players[1]]; ///or [...players1, ...players2]
console.log(allPlayers);

///4
const players1Final = [...game.players[0], 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

///5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//Solution 2
//const{ odds: {team1, x: draw, team2}} = game;
///console.log(team1, draw, team2);


///6
const printGoals = function (...players) {
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
  }

  const cantGoals = players.length;
  console.log(`Cantidad de goles : ${cantGoals}`);
};

///printGoals(...game.scored);
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

//7
game.odds.team1 < game.odds.team2 &&
  console.log('Team 1 is more likely to win'); ///if (game.odds.team1 < game.odds.team2 ) === true, then ('Team 1 is more likely to win') is printed
game.odds.team1 > game.odds.team2 &&
  console.log('Team 2 is more likely to win');
///if the first agument of line 373 is false, nothing is printed and pass to the next line of the code.
*/

/*
///FOR-OF LOOP

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

///THIS LOOP WILL AUTOMATICALLY LOOP OVER THE ENTIRE ARRAY AND IN EACH ITERATION, IT WILL GIVE US ACCESS TO THE CURRENT ARRAY ELEMENT, WHICH WE SPECIFY AS "ITEM" IN THIS EXAMPLE. WITH THE FOR OF LOOP, WE DO NOT HAVE TO WORRY ABOUT ALL THE UNDERLYING DETAILS SUCH AS COUNTERS AND CONDITIONS. WHAT´S ALSO GREAT ABOUT THE FOR-OF LOOP, IS THAT WE CAN STILL USE THE CONTINUE AND BREAK KEYWORDS.
for (const item of menu) console.log(item);

///What if we also want the current inde and not just the current element?
for (const item of menu.entries()) {
  console.log(item);
}
//console.log([...menu.entries()]);
///menu.entries() is an array which in each position contains a new array, which contains the element, so the element entity index number of that element in the original array.

///Printed in a better and cool way
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

///We can also improve last example by destructuring the item  array
for (const [i, element] of menu.entries()) {
  console.log(`${i + 1}: ${element}`);
}
*/

///ES6 INTRODUCED THREE WAYS, WHICH MAKE IT EASIER TO WRITE OBJECT LITERALS LIKE THE RESTAURANT OBJECT

const openingHours = {
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
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  ///1) ES6 enheance object literals. We can add an object without having to assign it to a variable -->openingHours = openingHours
  openingHours,

  /// 2) we do not have to create a property and then set it to a function expression. We get rid of the keyword function and the semicolon
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
///OPTIONAL CAHINING
///ES2020 introduced afeature called optional chaining. With optional chaining if a certain property does not exist, then undefined is returned immediately.

///checking if restaurant has a property called openingHours adn if it does open on mondays
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

///console.log(restaurant.openingHours.mon.open);///error: cannot read property 'open' of undefined
///with optional chaining
///only if the property that is before this question mark exists (if it is not null or undefined...if its 0 or '' then still exits), then the open property will be read from there. But if not, then immediately undefined will be returned

console.log(restaurant.openingHours.mon?.open);

////We can have multiple optional chainings
console.log(restaurant.openingHours?.mon?.open);

///a more resl example

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  //console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

///optional chaining in methods for checking if a method exits before call it
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRissotto?.(0, 1) ?? 'Method does not exist');

////optional chaining in arrays
const users = [{ name: 'fabian', email: 'fabian@hello.ar' }];
console.log(users[0]?.name ?? 'Users array empty');

*/

///LOOPING OBJECTS: OBJECT KEYS, VALUES AND ENTRIES

///Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day},`;
}
console.log(openStr);

///Property VALUES
const values = Object.values(openingHours);
console.log(values);

///Looping over the entire object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
