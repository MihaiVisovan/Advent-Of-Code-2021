// first golden star
const fs = require('fs');
let counterFirstStar = 0;

fs.readFile('./file.txt', 'utf8', (err, data) => {
    data.split('\r\n').reduce((prev, curr) => {
        if (parseInt(curr) > parseInt(prev)) {
            counterFirstStar++;
        }
        return curr;
    });
});

// second golden star
let counterSecondStar = 0;
let nextAcc = 0, acc = 0;

fs.readFile('./file.txt', 'utf8', (err, data) => {
    data.split('\r\n').forEach((element, index, array) => {
        if (index >= 3) {
            // subtract the first element and add the current element to
            // the second accumulator
            nextAcc -= parseInt(array[index - 3]);
            nextAcc += parseInt(element);

            // compare the two accumulators
            if (nextAcc > acc) {
                counterSecondStar++;
            }
            acc = nextAcc;
        } else {
            // add the first three elements to both accumulators
            acc += parseInt(element);
            nextAcc = acc;
        }
    });
});

