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

/***We're building a football betting app (soccer for my American friends ????)!
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
GOOD LUCK ???? 
*/
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
/*
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

///THIS LOOP WILL AUTOMATICALLY LOOP OVER THE ENTIRE ARRAY AND IN EACH ITERATION, IT WILL GIVE US ACCESS TO THE CURRENT ARRAY ELEMENT, WHICH WE SPECIFY AS "ITEM" IN THIS EXAMPLE. WITH THE FOR OF LOOP, WE DO NOT HAVE TO WORRY ABOUT ALL THE UNDERLYING DETAILS SUCH AS COUNTERS AND CONDITIONS. WHAT??S ALSO GREAT ABOUT THE FOR-OF LOOP, IS THAT WE CAN STILL USE THE CONTINUE AND BREAK KEYWORDS.
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
/*
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
*/
/*
Coding Challenge #2
Let's continue with our football betting app! Keep using the 'game' variable from
before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have the
same property names ????
4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
Gnarby: 1,
Hummels: 1,
Lewandowski: 2
}
GOOD LUCK ????
*/
/*
///1
const entries = Object.entries(game.scored);
//console.log(entries);
for (const [index, value] of entries) {
  console.log(`Goal ${Number(index) + 1}: ${value}`);
}

///TEACHER??S SOLUTION

//for(const [i, player] of game.scored.entries()) console.log(`Goal ${i + 1}: ${player}`);

//2
const oddsData = Object.entries(game.odds);
console.log(oddsData);
let sum = 0;
for (const [key, value] of oddsData) {
  console.log(key, value);
  sum += value;
}
let prom = sum / oddsData.length;
console.log(prom);

///TEACHER??S SOLUTION
//let average = 0;
//const odds = Object.values(game.odds);

//for(const odd of Object.values(game.odds)){
  //average += odd;
//}
//average /= odds.length;
//console.log(average);

///3
for (const [key, value] of oddsData) {
  if (key === 'team1') {
    console.log(`Odd of victory Bayern Munich: ${value}`);
  } else if (key === 'x') {
    console.log(`Odd of draw: ${value}`);
  } else {
    console.log(`Odd of victory Borrussia Dortmund: ${value}`);
  }
}
///TEACHER'S SOLUTION
//for(const {team, odd} of Object.entries(game.odds)){
 // const teamStr = team === 'x' ? 'draw' : 'victory ${game[team]};
 // console.log(`Odd of ${teamStr} ${odd});
//}


//4

// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

*/

/*
///SET
///Collection that not accept duplicate values. It looks like an array. There are not key value pairs,it??s just a bunch of values grouped together. Sets are also iterables. Sets are different from an array. First, because its elements are unique, and second, because the oreder of elements in the set is irrelevant.

const orderSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Rissotto', 'Pasta']);
console.log(orderSet);

console.log(new Set('Fabian'));

///get the size of a set
console.log(orderSet.size);

///check if a certain element is on a set
console.log(orderSet.has('Pizza')); ///true
console.log(orderSet.has('Bread')); ///false

///add elelements to a set
orderSet.add('Garlic Bread');

console.log(orderSet);

///delete elements on a set
orderSet.delete('Rissotto');

console.log(orderSet);

///delete all of the elements of a set
///orderSet.clear();

///iterate on a set

for (const order of orderSet) console.log(order);

///In a normal code base, the main use case of sets is actually to remove duplicate values of arrays. Example

const staff = ['Waiter', 'Cheff', 'Waiter', 'Manager', 'Cheff', 'Waiter'];

///we unpack the new set using the spread operator and then these elements will be put into the new constructed array
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
*/

///MAPS: FUNDAMENTALS
///A map is a data structure that we can use to map values to keys. Data is stored in key value pairs in maps. The big difference between objects and maps is that in maps, the keys can have any type and this can be huge. so, in objects, the keys are basically always strings. But in maps, we can have any type of key. It could even be objects, or arrays, or other maps.

/*
const rest = new Map();

///Introduce data in a map. First--->key, second---->value
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenzze, Italy');
rest.set(2, 'Lisbon, Portugal');

console.log(rest);

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are close');

///read data from a map
console.log(rest.get('name'));
console.log(rest.get(true));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

///check if a map contains a certain key
console.log(rest.has('categories'));

///delete a key
rest.delete(2);
console.log(rest);

///size property in maps
console.log(rest.size);

///delete all elements
//rest.clear();

rest.set([1, 2], 'Test');
console.log(rest);

console.log(rest.get([1, 2])); ///output--> undefined. This happens because although the arrays are identical, they are different objects in the heap. In order to make it work, we have to create an array and pass it as a variable

const array = [1, 2];
rest.set(array, 'Test');
console.log(rest.get(array));

rest.set(document.querySelector('h1', 'Headline'));
*/
/*
///MAPS: ITERATION

///There??s another way of populating a map without having to use the set method

const question = new Map([
  ['question', 'What is the best programming in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'try it again'],
]);

console.log(question);

///There is an easy way to convert from objects to maps
const hoursMap = new Map(Object.entries(openingHours));

console.log(hoursMap);

///for loop in maps

for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

const answer = Number(prompt('Your answer'));
console.log(answer);

answer != 3
  ? console.log(question.get(false))
  : console.log(question.get(true));

///teacher's solution
///console.log(question.get(question.get('correct') === answer));

///Sometimes we need to convert a map back into an array.
console.log([...question]);
*/

///WHICH DATA STRUCTURE TO USE AND WHEN SHOULD I USE IT?
///First decition: Do we need a simple list of values? If so, we are going to use an array or a set. On the oder hand, if we need key value pairs, then we need an object or a map. With a key values pair, we have a way of discribing the values, so by using the key. On the other hand, in a list like an array or a set, we simply have the values without any description.
///ARRAY VS SET: We use arrays whenever we need to store values in order and when these values might contain duplicates. Also, we dhould always use arrays when we need to manipulate data becasuse there are a ton of useful array methods. Sets should be used when we are working with unique values. Besides that, we should use sets when high performance is really important, because operations like searching for an item or deleting an item from a set can be up to 10 times faster in sets than in arrays

///OBJECTS VS MAPS:Maps are way better suited for simple key value stores because thet offer better perfrmance in fact. Also map keys can have any data type, are easy to iterate amd it's easy to compute the size of a map. The biggest advantage of objects is probably how easy it is to write them and to access data by simply using the dot or the brackets operator. We should use maps when we simply need to map keys to values and also when we need keys that are not strings. Then, if we need functions as values, then we should absolutely use an object for that

///CODING CHALLENGE #3
/*Let's continue with our football betting app! This time, we have a map called
'gameEvents' (see below) with a log of the events that happened during the
game. The values are the events themselves, and the keys are the minutes in which
each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Create an array 'events' of the different game events that happened (no
duplicates)
2. After the game has finished, is was found that the yellow card from minute 64
was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on
average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17:
???
GOAL
GOOD LUCK ????
*/
/*
const gameEvents = new Map([
  [17, '??? GOAL'],
  [36, '???? Substitution'],
  [47, '??? GOAL'],
  [61, '???? Substitution'],
  [64, '???? Yellow card'],
  [69, '???? Red card'],
  [70, '???? Substitution'],
  [72, '???? Substitution'],
  [76, '??? GOAL'],
  [80, '??? GOAL'],
  [92, '???? Yellow card'],
]);

///1
const setEvents = new Set();
for (const [key, value] of gameEvents) {
  setEvents.add(value);
}

const arrEvents = [...setEvents];
console.log(arrEvents);

///TEACHER'S SOLUTION
///const events = [...new Set(gameEvents.values())]
///console.log(events);

///2
gameEvents.delete(64);
console.log(gameEvents);

///3
const time = [...gameEvents.keys()].pop();
///console.log(time);
console.log(`An event happened, on
average, every ${time / gameEvents.size} minutes`);

///4

for (const [key, value] of gameEvents) {
  key < 45
    ? console.log(`[FIRST HALF] ${key}: ${value}`)
    : console.log(`[SECOND HALF] ${key}: ${value}`);
}

///TEACHER'S SOLUTION
///const hlaf = min <= 45 ? 'FIRST' : 'SECOND';
///    for(const [key, value] of gameEvents){
///      console.log(`[${half} HALF] ${min}: ${event}`)
///   }
*/

////WORKING WITH STRINGS - PART 1
const airline = 'TAP Air Argentina';
const plane = 'A320';
/*
///get the character of a string at a certain position
console.log(plane[0]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

///string methods
///indexOf(): the position in which appears the first occurrence of that value
console.log(airline.indexOf('r'));
console.log(airline.indexOf('Argentina')); ///position in which the word begins
console.log(airline.indexOf('argentina')); ///-1: not found because JavaScript is case sensitive

///lastIndexOf(): the last position in which a certain value appears
console.log(airline.lastIndexOf('r'));

///slice(): extract part of a string. This method does not change the underlying string because it's actually impossible to mutate strings
console.log(airline.slice(4)); ///output-->Air Argentina
///we can also specified an end parameter. The length will be the last parameter minus first parameter 7-4= 3
console.log(airline.slice(4, 7)); ///output--> Air

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

///begin to extract from the end of the string
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

///write a function that recieves an airplane seat and logs to the console whether it is a middle seat or not

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat');
  else {
    console.log('You got lucky');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

///Whenever we call a method on a string, JavaScript, behinde the scenes, will convert that string primitive to a String object with the same content. Then is on that object where the method is called. This process is called boxing. Then, when the operation is done, the object is converted back to a regular string primitive.
*/
/*
////WORKING WITH STRINGS - PART 2

///changing the case of a string
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

///EXAMPLE: fix the capitalization on a passenger name
function passengerCorrectName(passengerName) {
  const passengerLower = passengerName.toLowerCase();
  const passengerCorrect =
    passengerLower[0].toUpperCase() + passengerLower.slice(1);
  console.log(passengerCorrect);
}

const passenger = 'fAbI'; ///Fabi

passengerCorrectName(passenger);

///EXAMPLE: comparing a user input email
const email = 'hello@fabi.io';
const loginEmail = '  Hello@Fabi.IO \n';

//const lowerEmail = loginEmail.toLowerCase();
//console.log(lowerEmail);

//const trimmedEmail = lowerEmail.trim();
//console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

console.log(email === normalizedEmail);

///replace parts of a string. The replace method is case sensitive
const priceLondon = '288,97??';
const priceUS = priceLondon.replace('??', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23';
console.log(announcement.replace('door', 'gate')); ///this only replace the first occurrence of the search string
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); ///regular expression....g goes for global

///methods that return booleans
///includes()
const plane1 = 'Airbus A320neo';
console.log(plane1.includes('A320'));
console.log(plane1.includes('Boing'));

///startsWith()
console.log(plane1.startsWith('Boing'));
console.log(plane1.startsWith('Air'));

///check if the current plane is part of the new Airbus family
if (plane1.startsWith('Airbus') && plane1.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

///Practice exercise: check if the baggage of a passenger is allow to be checked in

const checkBagage = function (items) {
  const baggage = items.toLowerCase(); ///to compare it with one standard
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board.');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBagage('I have a laptop, some Food and a pocket Knife');
checkBagage('Socks and camera');
checkBagage('Got some snacks and a gun for protection');
*/
/*
///WORKING WITH STRINGS - PART 3
///split(): allows us to split a string into multiple parts based on a divider string

console.log('a+very+nice+string'.split('+'));
console.log('Fabian Garcia'.split(' '));

const [firstName, lastName] = 'Fabian Garcia'.split(' ');
console.log(firstName, lastName);

///join(): the opposite of split()
const newName = ['Mr', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    ///namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica and smith davis');
capitalizeName('fabian garcia');

///padding a string: add a number of characters to the string until the string has a certain desired length.

const message = 'Go to gate 23';
console.log(message.padStart(25, '+').padEnd(30, '-')); ///padding(length, value to add to the string)

console.log('Jonas'.padStart(25, '+').padEnd(30, '-'));

///real example of padding
const maskCreditCard = function (number) {
  const str = number + '';

  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard('000254152510106'));
console.log(maskCreditCard('000253254853196'));

///repeat(): repeats a certain string multiple times
const message1 = 'Bad weather...All departures delayed...';
console.log(message1.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'???'.repeat(n)}`);
};

planesInLine(5);
planesInLine(6);
planesInLine(15);
*/

/*Coding Challenge #4
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase ???
firstName ??????
someVariable ?????????
calculateAge ????????????
delayedDeparture ???????????????
Hints:
?? Remember which character defines a new line in the textarea ????
?? The solution only needs to work for a variable made out of 2 words, like a_b
?? Start without worrying about the ???. Tackle that only after you have the variable
name conversion working ????
?? This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
Afterwards, test with your own test data!
GOOD LUCK ????

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  //console.log(text);
  const rows = text.split('\n');
  //console.log(rows);
  //console.log(typeof rows);
  for (const [i, n] of rows.entries()) {
    const [first, second] = n.toLowerCase().trim().split('_'); //split the two words
    ///console.log(first, second);
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase() ///apllying camelCase
    )}`;
    console.log(`${output.padEnd(20, ' ')}${'???'.repeat(i + 1)}`);
  }
});
*/

////STRING METHODS PRACTICE
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//console.log(flights.split('+'));

for (const flight of flights.split('+')) {
  //console.log(flight.split(';'));
  const [arrival, from, to, time] = flight.split(';');
  //console.log(arrival, from, to, time);
  const state = arrival.replaceAll('_', ' ');
  const firstAirport = from.slice(0, 3);
  const secondAirport = to.slice(0, 3);
  const message =
    `${state} from ${firstAirport.toUpperCase()} to ${secondAirport.toUpperCase()} (${time.replace(
      ':',
      'h'
    )})`.padStart(36, ' ');
  state.includes('Delayed')
    ? console.log(`???? ${message}`)
    : console.log(message);
}
