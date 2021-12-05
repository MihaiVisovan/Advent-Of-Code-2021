const fs = require('fs');
const data = fs.readFileSync('./file.txt').toString();

// third golden star
let horizontalPositionThirdStar = 0;
let depthThirdStar = 0;

data.split('\r\n').forEach(element => {
    const [position, noOfSteps] = element.split(' ');
    const noOfStepsInt = parseInt(noOfSteps);

    if (position === 'forward') {
        horizontalPositionThirdStar += noOfStepsInt;
    } else if (position === 'up') {
        depthThirdStar -= noOfStepsInt;
    } else if (position === 'down') {
        depthThirdStar += noOfStepsInt;
    }
})
const resultThirdStar = depthThirdStar * horizontalPositionThirdStar;


// forth golden star
let aim = 0;
let depthForthStar = 0;
let horizontalPositionForthStar = 0;

data.split('\r\n').forEach(element => {
    const [position, noOfSteps] = element.split(' ');
    const noOfStepsInt = parseInt(noOfSteps);

    if (position === 'forward') {
        horizontalPositionForthStar += noOfStepsInt;
        depthForthStar += aim * noOfStepsInt;
    } else if (position === 'up') {
        aim -= noOfStepsInt;
    } else if (position === 'down') {
        aim += noOfStepsInt;
    }
})
const resultForthStar = depthForthStar * horizontalPositionForthStar;
