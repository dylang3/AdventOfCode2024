const fs = require('node:fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {

  let listOne = [];
  let listTwo = [];

  if (err) {
    console.error(err);
    return;
  }

  // Split text input into lines, filtering out any blank lines
  const lines = data.split('\n').filter(line => line.trim() !== '');

  // Split each line into two values and add them to their respective array
  lines.forEach(line => {
    const [firstNum, secondNum] = line.trim().split(/\s+/);
    listOne.push(parseInt(firstNum));
    listTwo.push(parseInt(secondNum));
  })

  // Sort both lists from smallest to largest value
  listOne.sort((a, b) => a - b);
  listTwo.sort((a, b) => a - b);

  const totalDistance = getTotalDistance(listOne, listTwo);
  const similarityScore = calculateSimilarityScore(listOne, listTwo);
})

function getTotalDistance(arrOne, arrTwo) {
  
  if (arrOne.length !== arrTwo.length) {
    console.error('Arrays must be of equal length');
    return;
  }

  const distances = [];

  for (let i = 0; i < arrOne.length; i++) {
    distances.push(calculateDistance(arrOne[i], arrTwo[i]));
  }

  const totalDistance = distances.reduce((acc, curr) => {
    return acc + curr;
  }, 0)

  return totalDistance;
}

function calculateDistance(numOne, numTwo) {
  return Math.abs(numOne - numTwo);
}

function calculateSimilarityScore(arrOne, arrTwo) {
  let totalScore = 0;

  for (let i = 0; i < arrOne.length; i++) {
    let timesNumberFound = 0;

    arrTwo.forEach(number => {
      if (number === arrOne[i]) {
        timesNumberFound++;
      }
    })

    totalScore += arrOne[i] * timesNumberFound;
  }

  return totalScore;
}