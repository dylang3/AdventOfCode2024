const fs = require('node:fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {

  if (err) {
    console.error(err);
    return;
  }

  // Split text input into lines, filtering out any blank lines
  const lines = data.split('\n').filter(line => line.trim() !== '');

  const reports = lines.map(line => line.split(' ').map(Number));

  console.log(calculateNumberOfSafeReports(reports));
})

function calculateNumberOfSafeReports(reports) {
  let result = 0;

  reports.forEach(report => {
    if (reportIsSafe(report)) {
      result++;
    }
  })

  return result;
}

function reportIsSafe(report) {

  // If the first and second levels are equal, return false
  if (report[0] === report[1]) {
    return false;
  }

  // Determine the initial direction of change
  const initialDirection = report[0] > report[1] ? 'decreasing' : 'increasing';

  // Initialize result as true
  let result = true;

  for (let i = 0; i < report.length - 1; i++) {

    // Check if consecutive levels are equal
    if (report[i] === report[i+1]) {
      result = false;
    }

    // Check if direction matches initial direction
    const direction = report[i] > report[i+1] ? 'decreasing' : 'increasing';
    if (direction != initialDirection) {
      result = false;
    }

    // Check if change is greater than 3 levels
    if (Math.abs(report[i] - report[i+1]) > 3) {
      result = false;
    }
  }

  return result;
}