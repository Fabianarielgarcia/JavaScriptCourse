// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*Given an array of temperatures of one day, calculate the temperature amplitude.
 */
/*
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

///Understanding the problem

//Breaking up into sub-problems

///Checked
const findSmallTemperature = function (array) {
  let minTemperature;

  if (array !== null && !isNaN(array[0])) {
    minTemperature = array[0];
    for (let i = 0; i < array.length; i++) {
      if (array[i] <= minTemperature && !isNaN(array[i])) {
        minTemperature = array[i];
        i++;
      }
    }
  }
  return minTemperature;
};

const findHigherTemperature = function (array) {
  let maxTemperature;

  if (array !== null && !isNaN(array[0])) {
    maxTemperature = array[0];

    for (let i = 0; i < array.length; i++) {
      if (array[i] >= maxTemperature && !isNaN(array[i])) {
        maxTemperature = array[i];
        i++;
      }
    }
  }
  return maxTemperature;
};

const calcAmplitude = function (array) {
  let amplitude = 0;
  const minTemperature = findSmallTemperature(array);
  const maxTemperature = findHigherTemperature(array);

  amplitude = maxTemperature - minTemperature;
  return amplitude;
};
console.log(findSmallTemperature(temperatures));
console.log(findHigherTemperature(temperatures));
console.log(calcAmplitude(temperatures));
*/
/*TEACHERS SOLUTION
const calcTempAmplitude = function (array){
    let max = array[0];
    let min = array[0];

    for(let i = 0; i < array.length; i++){
        const currentTemp = array[i];

        if(typeOf currentTemp !== 'number') continue;

        if(currentTemp > max) max = currentTemp;
        if(currentTemp < min) min = currentTemp;
    }
    console.log(max, min);
    return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);
*/
/*Coding Challenge #1
Given an array of forecasted maximum temperatures, the thermometer displays a
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1
days ... 21ºC in 2 days ... 23ºC in 3 days ..."
Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a
string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up
into sub-problems!
Test data:
§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]
GOOD LUCK 😀
*/
/*MESSAGE: THE SOLUTION OF THIS PROBLEM WAS EASIER THAN I EXPECTED. I LOOKED UP FOR DIFFERENT FUNCTIONS
I COULD APLLIED TO STRINGS LIKE JOIN(), TOSTRING(), CONCAT(), ETC. IN THE END, I JUST HAD TO CREATE A NEW STRING WHILE LOOPING THROUGH THE ARRAY AND ADD THE INFORMATION THAT WAS NEEDED TO ACHIVE THIS TASK. ALTHOUGH I DID NOT RESOLVE THE TASK ON MY OWN, I NEVER GAVE UP ON IT AND I TRIED TO DO IT WITHOUT LOOKING TO THE ANSWER. LETS KEEP GOING..!!! 💪💪 
const forecasted = [17, 21, 23];
const forecasted1 = [12, 5, -5, 0, 4];

/*Primer intento
const printForecast = function (arr) {
  let string = '';
  for (let i = 0; i < arr.length; i++) {
    string = arr.join('...', `${arr}° in ${i}days`);
  }
  return string;
};
*/

const printForecast = function (arr) {
  let string = '';

  for (let i = 0; i < arr.length; i++) {
    string += `${arr[i]}°C in ${i + 1} days...`;
  }
  console.log('... ' + string);
};

printForecast(forecasted);
printForecast(forecasted1);
/*

/* THIS WORKS BUT IT IS NOT A SINGLE STRING
const comidas = ['Desayunar', 'Almorzar', 'Comer', 'Merendar', 'Cenar'];
comidas.forEach(function (comida, index) {
  console.log(`${index} : ${comida}`);
});
*/
