
// Variables
let country = "Argentina";
let population = 44000000;

console.log(country);
console.log(population);

//Tipo de Datos
const isIsland = false;
let language = "Spanish";
/*
console.log(typeof country);
console.log(typeof population);
console.log(typeof isIsland);
console.log(typeof language);

//Basic Operators
let firstHalf = population / 2;
let secondHalf = population / 2;

console.log(firstHalf, secondHalf);

let populationPlusOne = ++population;
console.log(populationPlusOne);

let finlandPopulation = 6000000;

console.log(population > finlandPopulation);

let avgPopulation = 33000000;

console.log(population < avgPopulation);

let description = `Portugal is in Europe, and its 11 millon people speak portuguese.`;

console.log(description);
*/

//FIRST CODING CHALLENGE

//Mark´s data1
let marksWeight = 78;
let marksHeight = 1.69
/*
//Mark´s data2
let marksWeight = 95;
let marksHeight = 1.88
*/
//John´s data1
let johnsWeight = 92;
let johnsHeight = 1.95;
/*
//John´s data2
let johnsWeight = 85;
let johnsHeight = 1.76;
*/
let marksBMI = marksWeight / (marksHeight ** 2);

let johnsBMI = johnsWeight / (johnsHeight ** 2);

console.log(marksBMI, johnsBMI);
/*
let markHigherBMI = marksBMI > johnsBMI;
console.log(markHigherBMI);
*/
if (marksBMI > johnsBMI) {
    console.log(`Marks´s BMI: ${marksBMI} is higher than John´s.`)
} else {
    console.log(`John´s BMI: ${johnsBMI} is higher than Mark´s.`)
}

//TAKING DECISIONES 
/*
If your country's population is greater that 33 million, log a string like this to the
console: 'Portugal's population is above average'. Otherwise, log a string like
'Portugal's population is 22 million below average' (the 22 is the average of 33
minus the country's population)

if (population > 33000000) {
    console.log(`Portugal's population is above average.`);
} else {
    console.log(`Portugal's population is 22 million below average.`)
}*/
/*
///Type converion and coercion
console.log('9' - '5');//4
console.log('19' - '13' + '17');//'617'
console.log('19' - '13' + 17);//23
console.log('123' < 57);//false
console.log(5 + 6 + '4' + 9 - 4 - 2);//1143
*/

/*
//EQUALITY OPERTORS: == VS ===
let numNeighbours = Number(prompt('How many neighbour countries does your country have?'));

if (numNeighbours === 1) {
    console.log('1 vecino!');
} else if (numNeighbours > 1) {
    console.log("Mas de un vecino");
} else {
    console.log("no hay vecinos");
}
*/

if (population < 50000000 && !isIsland && language === "English") {
    console.log("Is the right country for Sarah");
} else {
    console.log("It is not the right country for Sarah.");
}

//CODING CHALLENGE 3
///TEST DATA 1
///DOLPHNS SCORE 96, 108 AND 89. KOALAS SCORE 88, 91, 110
/*
let dolphinsAvg = (96 + 108 + 89) / 3;
let koalasAvg = (88 + 91 + 110) / 3;

if (dolphinsAvg === koalasAvg) {
    console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
    console.log("Both teams have the same score.")
} else if (dolphinsAvg > koalasAvg) {
    console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
    console.log("Dolphins win.");
} else {
    console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
    console.log("Koalas win.");
}



///TEST DATA 2
///DOLPHNS SCORE 97, 112 AND 101. KOALAS SCORE 109, 95, 123

let dolphinsAvg = (97 + 112 + 101) / 3;
let koalasAvg = (109 + 95 + 123) / 3;
const minScore = 100;
if (dolphinsAvg >= minScore || koalasAvg >= minScore) {
    if (dolphinsAvg === koalasAvg) {
        console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
        console.log("Both teams have the same score.")
    } else if (dolphinsAvg > koalasAvg) {
        console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
        console.log("Dolphins win.");
    } else {
        console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
        console.log("Koalas win.");
    }
} else {
    console.log(`The average score of both teams are less tna 100 points`);
}



///TEST DATA 3
///DOLPHNS SCORE 97, 112 AND 101. KOALAS SCORE 109, 95, 106

let dolphinsAvg = (97 + 112 + 101) / 3;
let koalasAvg = (109 + 95 + 106) / 3;
const minScore = 100;
if (dolphinsAvg >= minScore || koalasAvg >= minScore) {
    if (dolphinsAvg === koalasAvg) {
        console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
        console.log("Both teams have the same score.")
    } else if (dolphinsAvg > koalasAvg) {
        console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
        console.log("Dolphins win.");
    } else {
        console.log(`Dolph´s score: ${dolphinsAvg}, Koala´s score: ${koalasAvg}.`);
        console.log("Koalas win.");
    }
} else {
    console.log(`The average score of both teams are less tna 100 points`);
}


///THE SWITCH STATEMENT Video

let day = prompt(`Ingrese un dia de la semana`);
if (day === "monday") {
    console.log(`Plan course structure.`);
} else if (day === "tuesday") {
    console.log("Prepare theory videos.");
}
else if (day === "wednesday" || day === "thursday") {
    console.log("Write code examples");
}
else if (day === "friday") {
    console.log("Record videos.");
}
else if (day === "saturday" || day === "sunday") {
    console.log("Enjoy the weekend");
} else {
    console.log("Not a valid day");
}
*/

///THE SWITCH STATEMENT PRACTICE
/*
let languageNew = prompt(`Write down a language: `);
switch (languageNew) {
    case "chinese":
    case "mandarin": console.log(`MOST number of native speakers.`);
        break;

    case "spanish": console.log(`2nd place in number of native speakers`);
        break;

    case "english": console.log(`3rd place.`);
        break;

    case "hindi": console.log(`Number 4.`);
        break;

    case "arabic": console.log(`5th most spoken language.`);
        break;

    default: console.log(`Great language too!`);
        break;
}


///THE CONDITIONAL (TERNARY) OPERATOR
let ternaryOperator = (population > 33000000) ? "Argentina´s population is above range." : "Argentin´s population is below range";
console.log(ternaryOperator);
*/

///FINAL CHALLENGE 

let bill = prompt("How much does it cost de meal?");
let tip = (bill >= 50 && bill <= 300) ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip}, the total value was ${Number(bill) + tip}.`);


