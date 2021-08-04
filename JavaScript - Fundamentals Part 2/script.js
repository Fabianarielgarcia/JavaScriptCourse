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

const worldPopulation = 7900000000;

let avgPopulation = (population * 100) / worldPopulation;

return avgPopulation;
}
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

console.log('Hellow world');

