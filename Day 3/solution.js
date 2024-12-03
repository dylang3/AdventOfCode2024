const fs = require('node:fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {

  if (err) {
    console.error(err);
    return;
  }

  const regex = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g;

  const instructions = getValidInstructions(data, regex);
  const total = calculateTotal(instructions);
  console.log(total);

})

function getValidInstructions(string, pattern) {
  return string.match(pattern);
}

function calculateTotal(instructions) {
  let total = 0;
  let isDisabled = false;

  instructions.forEach(set => {
    if (set === "don't()") {
      isDisabled = true;
      return;
    }

    if (set === "do()") {
      isDisabled = false;
      return;
    }

    if (isDisabled) {
      return;
    }

    const values = set.match(/\d{1,3}/g);
    total += values[0] * values[1];
  })

  return total;
}
