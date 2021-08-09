// Remember, we're gonna use strict mode in all scripts now!
'use strict';
/*Given an array of temperatures of one day, calculate the temperature amplitude.
 */

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

///Understanding the problem

//Breaking up into sub-problems

///Checked
const findSmallTemperature = function (array) {
  let minTemperature = 0;

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
  let maxTemperature = 0;

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
