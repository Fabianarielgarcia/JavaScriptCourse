'use strict';
/*
///Funciones

/*
function describeCountry(country, population, capitalCity) {
    let pais = `${country} has ${population} millon people and its capital city is ${capitalCity}.`;
    return pais;
}

let Finald = describeCountry("Finlandia", 6, "Helsinki");
let Argentina = describeCountry("Argentina", 44, "Buenos Aires");
let Brasil = describeCountry("Brasil", 306, "Brasilia");

console.log(Finald);
console.log(Argentina);
console.log(Brasil);

*/
//FUNCTION DECLARATIONS AND FUNCTION EXPRESSIONS
/*
function percentageOfWorld(population) {
    const worldPopulation = 7900000000;

    let avgPopulation = (population * 100) / worldPopulation;

    return avgPopulation;
}
*/
/*
function percentageOfWorld1(country, population) {
    const worldPopulation = 7900000000;
    let avgPopulation = (population * 100) / worldPopulation;
    let info = `${country} has ${population} people, so it´s about ${avgPopulation}% of the world population.`;

    return info;
}

let china = percentageOfWorld1("China", 1441000000);
console.log(china);

let percentageOfWorld2 = function (country, population) {
    const worldPopulation = 7900000000;
    let avgPopulation = (population * 100) / worldPopulation;
    let info = `${country} has ${population} people, so it´s about ${avgPopulation}% of the world population.`;

    return info;
}

let china2 = percentageOfWorld2("China", 1441000000);

console.log(china2);

*/
//ARROW FUNTIONS

/*
let percentageOfWorld3 = (country, population) => {
    const worldPopulation = 7900000000;
    let avgPopulation = (population * 100) / worldPopulation;
    let info = `${country} has ${population} people, so it´s about ${avgPopulation}% of the world population.`;

    return info;
}

console.log(percentageOfWorld3("China", 1441000000));

*/

///FUNCTIONS CALLING OTHER FUNTIONS

/*
function describePopulaton(country, population) {
    let avg = percentageOfWorld(population);
    return `${country} has ${population} millon people, which is about ${avg} of the world population.`;
}

console.log(describePopulaton("China", 1441000000));

///COODING CHALLENGE #1 JavaScript Fundamentals – Part 2
/*
Your tasks:
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
to the console, together with the victory points, according to the rule above.
Example: "Koalas win (30 vs. 13)"
4. Use the 'checkWinner' function to determine the winner for both Data 1 and
Data 2
5. Ignore draws this time
Test data:
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
§ Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
Hints:
§ To calculate average of 3 values, add them all together and divide by 3
§ To check if number A is at least double number B, check for A >= 2 * B.
Apply this to the team's average scores 😉


let calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;


///data1

let dolphinsScoreAvg = calcAverage(44, 23, 71);
let koalasScoreAvg = calcAverage(65, 54, 49);

function checkWinner(avgDolhins, avgKoalas) {
    if (avgDolhins >= (avgKoalas * 2)) {
        console.log(`Dolphins win ${avgDolhins} vs ${avgKoalas}`);
    } else if (avgKoalas >= (avgDolhins * 2)) {
        console.log(`Koalas win ${avgKoalas} vs ${avgDolhins}`);
    } else {
        console.log(`No team wins.`);
    }
}

checkWinner(dolphinsScoreAvg, koalasScoreAvg);

///data 2
dolphinsScoreAvg = calcAverage(85, 54, 41);
koalasScoreAvg = calcAverage(23, 34, 27);
checkWinner(dolphinsScoreAvg, koalasScoreAvg);

*/

///ARRAYS

/*
const population = [10000000, 20000000, 30000000, 40000000];

if (population.length === 4) {
    console.log(`true`);
} else {
    console.log(`false`);
}

const percentage = [percentageOfWorld(population[1])];
console.log(percentage);


*/
/*
LECTURE: Basic Array Operations (Methods)
1. Create an array containing all the neighbouring countries of a country of your
choice. Choose a country which has at least 2 or 3 neighbours. Store the array
into a variable called 'neighbours'
2. At some point, a new country called 'Utopia' is created in the neighbourhood of
your selected country. So add it to the end of the 'neighbours' array
3. Unfortunately, after some time, the new country is dissolved. So remove it from
the end of the array
4. If the 'neighbours' array does not include the country ‘Germany’, log to the
console: 'Probably not a central European country :D'
5. Change the name of one of your neighbouring countries. To do that, find the
index of the country in the 'neighbours' array, and then use that index to
change the array at that index position. For example, you can search for
'Sweden' in the array, and then replace it with 'Republic of Sweden'.

//1
const neighbours = ['Brasil', 'Uruguay', 'Chile', 'Paraguay', 'Bolivia'];

console.log(neighbours);///testing the array
//2
neighbours.push('Utopia');

console.log(neighbours);///array with the new country
//3
neighbours.pop();

console.log(neighbours);
//4
const germany = neighbours.includes('Germany');

if (!germany) {
    console.log(`Probably not a central European country :D`);
}

//5
const positionCountry = neighbours.indexOf('Paraguay');

console.log(positionCountry);

neighbours[positionCountry] = 'Utopia';

console.log(neighbours);

*/

/*
Coding Challenge #2
Steven is still building his tip calculator, using the same rules as before: Tip 15% of
the bill if the bill value is between 50 and 300, and if the value is different, the tip is
20%.
Your tasks:
1. Write a function 'calcTip' that takes any bill value as an input and returns
the corresponding tip, calculated based on the rules above (you can check out
the code from first tip calculator challenge if you need to). Use the function
type you like the most. Test the function using a bill value of 100
2. And now let's use arrays! So create an array 'bills' containing the test data
below
3. Create an array 'tips' containing the tip value for each bill, calculated from
the function you created before
4. Bonus: Create an array 'total' containing the total values, so the bill + tip
Test data: 125, 555 and 44
Hint: Remember that an array needs a value in each position, and that value can
actually be the returned value of a function! So you can just call a function as array
values (so don't store the tip values in separate variables first, but right in the new
array) 😉
GOOD LUCK 😀
*/
/*MINE
//1
const bill = Number(prompt('Total bill: '));//Use prompt so I do not have to hardcodear the data. I have not learnt exceptions yet.
function calcTip(bill) {

    let tip = 0;

    if (bill >= 50 && bill <= 300) {
        tip = bill * 0.15;
    } else {
        tip = bill * 0.2;
    }
    return tip;
}

//2
let bills = [];
bills.push(bill);
console.log(bills);

//3
let tips = [];
tips.push(calcTip(bill));
console.log(tips);

//4
let total = [];
total.push(bills[0] + tips[0]);
console.log(total);
*/
/*
//TEACHER´S RESOLUTION
let calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

let bills = [125, 555, 44];

let tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

let totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills, tips, totals);
*/

//LECTURE: Introduction to Objects
/*
1. Create an object called 'myCountry' for a country of your choice, containing
properties 'country', 'capital', 'language', 'population' and
'neighbours' (an array like we used in previous assignments)

let myCountry = {
    country: 'Argentina',
    capital: 'Buenos Aires',
    language: 'Spanish',
    population: 44000000,
    neighbours: ['Brasil', 'Uruguay', 'Chile', 'Paraguay', 'Bolivia']
};

console.log(myCountry);
*/

//Challenge
//Write this sentence: "Fabian tiene 3 amigos, y  su mejor amigo es Erik."
/*
const persona = {
    firstName: 'Fabian',
    lastName: 'Garcia',
    edad: 32,
    profesion: 'comerciante',
    amigos: ['Erik', 'Fede', 'Rodri']
};

console.log(`${persona.firstName} has ${persona.amigos.length} friends, and his best friend is ${persona.amigos[0]}.`);
*/
/*
LECTURE: Dot vs. Bracket Notation
1. Using the object from the previous assignment, log a string like this to the
console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries
and a capital called Helsinki.'
2. Increase the country's population by two million using dot notation, and then
decrease it by two million using brackets notation.

let myCountry = {
    country: 'Argentina',
    capital: 'Buenos Aires',
    language: 'Spanish',
    population: 44000000,
    neighbours: ['Brasil', 'Uruguay', 'Chile', 'Paraguay', 'Bolivia']
};

console.log(`{${myCountry.country} has ${myCountry.population} millon ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neibours countries and a capital called ${myCountry.capital}.`);

myCountry.population = 42000000;
console.log(myCountry);

myCountry['population'] = 44000000;
console.log(myCountry);
*/

/*
LECTURE: Object Methods
1. Add a method called 'describe' to the 'myCountry' object. This method
will log a string to the console, similar to the string logged in the previous
assignment, but this time using the 'this' keyword.
2. Call the 'describe' method
3. Add a method called 'checkIsland' to the 'myCountry' object. This
method will set a new property on the object, called 'isIsland'.
'isIsland' will be true if there are no neighbouring countries, and false if
there are. Use the ternary operator to set the property.


let myCountry = {
    country: 'Argentina',
    capital: 'Buenos Aires',
    language: 'Spanish',
    population: 44000000,
    neighbours: ['Brasil', 'Uruguay', 'Chile', 'Paraguay', 'Bolivia'],
    describe: function () {
        const message = `${this.country}' capital is ${this.capital}. There are ${this.population} millon people living in it. They speak ${this.language}.`;
        return message;
    },
    checkIsIsland: function () {
        return this.neighbours.length > 0 ? this.isIsland = false : this.isIsland = true;
    }
};
console.log(myCountry.describe());
myCountry.checkIsIsland();
console.log(myCountry);
*/
/*
Coding Challenge #3
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
implement the calculations! Remember: BMI = mass / height ** 2 = mass
/ (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their full name, mass, and
height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same
method on both objects). Store the BMI value to a property, and also return it
from the method
3. Log to the console who has the higher BMI, together with the full name and the
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
tall.
GOOD LUCK 😀


const mark = {
    firstName: 'Mark',
    lastName: 'Dell',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.mass / (this.height ** 2);
        return this.bmi;
    }
};

const john = {
    firstName: 'John',
    lastName: 'Wright',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.mass / (this.height ** 2);
        return this.bmi;
    }
};

const bmiMark = mark.calcBMI();
const bmiJohn = john.calcBMI();

console.log(mark);
console.log(john);

if (bmiMark > bmiJohn) {
    console.log(`${mark.firstName}'s BMI (${bmiMark}) is haigher than John's (${bmiJohn})!`);
} else {
    console.log(`${john.firstName}'s BMI (${bmiJohn}) is haigher than Mark's (${bmiMark})!`);
}
*/
/*
LECTURE: Iteration: The for Loop
1. There are elections in your country! In a small town, there are only 50 voters.
Use a for loop to simulate the 50 people voting, by logging a string like this to
the console (for numbers 1 to 50): 'Voter number 1 is currently voting'

for (let i = 1; i <= 50; i++) {
    console.log(`Voter number ${i} is currently voting`);
}
*/

/*
LECTURE: Looping Arrays, Breaking and Continuing
1. Let's bring back the 'populations' array from a previous assignment
2. Use a for loop to compute an array called 'percentages2' containing the
percentages of the world population for the 4 population values. Use the
function 'percentageOfWorld1' that you created earlier
3. Confirm that 'percentages2' contains exactly the same values as the
'percentages' array that we created manually in
*/

const population = [10000000, 20000000, 30000000, 40000000];
const percentage2 = [];
function percentageOfWorld(population) {
    const worldPopulation = 7900000000;

    let percentage2 = (population * 100) / worldPopulation;

    return percentage2;
}

for (let i = 0; i < population.length; i++) {
    percentage2.push(percentageOfWorld(population[i]));
}

console.log(percentage2);
if (percentage2.length === population.length) {
    console.log(`Both arrays have the same length.`)
}