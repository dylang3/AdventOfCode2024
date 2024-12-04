const fs = require('node:fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\r\n');

    // console.log(checkLines(lines, /XMAS/g))
    console.log(findXMAS(lines));
    
});

function checkLines(linesArray, searchString) {
    let total = 0;

    linesArray.forEach(line => {
        total += calculateMatches(line, searchString);
        total += calculateMatches(reverseString(line), searchString);
    })

    const originalLines = structuredClone(linesArray);
    const reversedLines = linesArray.reverse();

    const rightDownDiagonals = constructRightDiagonals(originalLines);
    const rightUpDiagonals = constructRightDiagonals(reversedLines);
    const leftDownDiagonals = constructLeftDiagonals(originalLines);
    const leftUpDiagonals = constructLeftDiagonals(reversedLines);

    const downColumns = constructColumns(originalLines);
    const upColumns = constructColumns(reversedLines);

    rightDownDiagonals.forEach(line => {
        total += calculateMatches(line, searchString);
    })

    rightUpDiagonals.forEach(line => {
        total += calculateMatches(line, searchString);
    })

    leftDownDiagonals.forEach(line => {
        total += calculateMatches(line, searchString);
    })

    leftUpDiagonals.forEach(line => {
        total += calculateMatches(line, searchString);
    })

    downColumns.forEach(line => {
        total += calculateMatches(line, searchString);
    });

    upColumns.forEach(line => {
        total += calculateMatches(line, searchString);
    });

    return total;
}

function reverseString(string) {
    return string.split('').reverse().join('');
}

function calculateMatches(line, searchString) {
    const matches = line.match(searchString);
    return matches ? matches.length : 0;
}

function constructRightDiagonals(array) {
    const diagonals = [];
    for (let i = 0; i < array.length - 3; i++) {
        for (let y = 0; y < array[i].length - 3; y++) {
            diagonals.push(array[i][y] + array[i+1][y+1] + array[i+2][y+2] + array[i+3][y+3]);
        }
    }
    return diagonals;
}

function constructLeftDiagonals(array) {
    const diagonals = [];
    for (let i = 0; i < array.length - 3; i++) {
        for (let y = 3; y < array[i].length; y++) {
            diagonals.push(array[i][y] + array[i+1][y-1] + array[i+2][y-2] + array[i+3][y-3]);
        }
    }
    return diagonals;
}

function constructColumns(array) {
    const columns = [];

    const numRows = array.length;
    const numCols = array[0].length;

    for (let i = 0; i < numCols; i++) {
        columns[i] = '';
    }
    
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            columns[j] += array[i][j];
        }
    }

    return columns;
}

// Part 2

// 1. Find the As
// 2. Construct two arrays
//      - Up 1 row, left 1 column + down 1 row, right 1 column
//      - Down 1 row, left 1 column + up 1 row, right 1 column
// 3. If both arrays spell either MAS or SAM, then count it

function findXMAS(array) {
    let total = 0;

    for (let i = 1; i < array.length - 1; i++) {
        for (let j = 1; j < array[i].length - 1; j++) {
            if (array[i][j] === 'A') {
                // console.log(`Letter A found at ${i}, ${j}`)
                const left = [array[i-1][j-1], array[i][j], array[i+1][j+1]];
                const right = [array[i-1][j+1], array[i][j], array[i+1][j-1]];
                const matchLeft = left.join('').match(/MAS|SAM/g);
                const matchRight = right.join('').match(/MAS|SAM/g);

                if (matchLeft && matchRight) {
                    total++;
                }
            }
        }
    }

    return total;
}
