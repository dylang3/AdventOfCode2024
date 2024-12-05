const fs = require('node:fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {

    if (err) {
        console.error(err);
        return;
    }

    const rules = data.split('\n\r\n')[0].split('\r\n').map(el => el.trim());
    const updates = data.split('\n\r\n')[1].split('\r\n');

    
    const rulesObj = constructRulesObj(rules);

    const alreadyCorrectUpdates = [];

    updates.forEach(update => {
        const pages = update.split(',');
        const orderedPages = orderPages(pages, rulesObj);
        if (orderedPages.join(',') === pages.join(',')) {
            alreadyCorrectUpdates.push(orderedPages);
        }
    })

    let sumMiddleNums = 0;

    alreadyCorrectUpdates.forEach(update => {
        sumMiddleNums += parseInt(getMiddleValue(update));
    })

    console.log('Sum of correctly ordered updates:' + sumMiddleNums);

    const incorrectUpdates = [];

    updates.forEach(update => {
        const pages = update.split(',');
        const orderedPages = orderPages(pages, rulesObj);
        if (orderedPages.join(',') !== pages.join(',')) {
            incorrectUpdates.push(orderedPages);
        }
    })

    let sumIncorrectMiddleNums = 0;

    incorrectUpdates.forEach(update => {
        sumIncorrectMiddleNums += parseInt(getMiddleValue(update));
    })

    console.log('Sum of incorrectly ordered updates:' + sumIncorrectMiddleNums);

});

function constructRulesObj(rulesArray) {
    const rules = {
        // '47': ['53', '13', '61']
    };

    rulesArray.forEach(set => {
        const pages = set.split('|');
        if (!rules[pages[0]]) {
            rules[pages[0]] = [];
        }
        rules[pages[0]].push(pages[1]);
    })

    return rules;
}

function orderPages(pages, rulesObj) {
    const orderedPages = [pages[0]];

    for (let i = 1; i < pages.length; i++) {
        let added = false;

        if (rulesObj[pages[i]]) {
            const rules = rulesObj[pages[i]];
            for (const orderedPage of orderedPages) {
                if (rules.includes(orderedPage)) {
                    orderedPages.splice(orderedPages.indexOf(orderedPage), 0, pages[i]);
                    added = true;
                    break;
                }
            }
        }

        if (!added) {
            orderedPages.push(pages[i]);
        }

    }

    return orderedPages;
}

function getMiddleValue(array) {
    if (array.length === 0) {
        return undefined;
    }

    const middleIndex = Math.floor(array.length / 2);

    if (array.length % 2 === 0) {
        return 'Even number of elements -- no true middle number';
    }

    return array[middleIndex];
}