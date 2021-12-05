const fs = require('fs');
const data = fs.readFileSync('./file.txt').toString().split('\r\n');

// fifth golden star
const mostCommonBit = {
    zeros: 0,
    ones: 0,
}

const arrayLength = [...data[0]].length;

// initialize the array
const mostCommonBits = new Array(arrayLength).fill().map((_) => {
    return {
        ...mostCommonBit
    }
});

// find the number of zeros and ones on each column
data.forEach((element, i) => {
    const numberList = [...element];

    for(let index = 0; index < arrayLength; index++) {
        const number = parseInt(numberList[index]);

        // check digit
        if (!number) {
            mostCommonBits[index].zeros++;
        } else {
            mostCommonBits[index].ones++;
        }
    }
});

const getGammaAndEpsilonRates = () => {
    let gammaRate = '';
    let epsilonRate = '';
    
    // get the most common bits from each column
    mostCommonBits.forEach((el, i) => {
        if (el.zeros > el.ones) {
            gammaRate += '0';
            epsilonRate += '1';
        } else {
            gammaRate += '1';
            epsilonRate += '0';
        }
    });

    return { gammaRate, epsilonRate };
}

const calculatePowerConsumption = () => {
    let { gammaRate, epsilonRate } = getGammaAndEpsilonRates();
    gammaRate = parseInt(gammaRate, 2);
    epsilonRate = parseInt(epsilonRate, 2);

    return gammaRate * epsilonRate;
}

const powerConsumption = calculatePowerConsumption();


// sixth golden star
const { gammaRate, epsilonRate } = getGammaAndEpsilonRates();

function filterData(sentData, bit, position, ratingType) {

    const newData = sentData.filter(number => {
        return [...number][position] === bit;
    })
    const nextPosition = position + 1;

    if (newData.length === 1) {
        return newData[0];
    } else {
        let bit = getMostCommonBitOnPosition(newData, nextPosition);
        if (ratingType === 'CO2Scrubber') {
            bit = bit === '1' ? '0' : '1';
        }
        return filterData(newData, bit, nextPosition, ratingType);
    }
}

function getMostCommonBitOnPosition(data, position) {
    const commonBits = {
        zeros: 0,
        ones: 0,
    };
    data.forEach(number => {
        if([...number][position] === '0') {
            commonBits.zeros++;
        } else {
            commonBits.ones++;
        }
    });

    return commonBits.ones >= commonBits.zeros ? '1' : '0';
}

const oxygenGeneratorRate = filterData(data, [...gammaRate][0], 0, 'OxygenGenerator');
const co2ScrubberRate = filterData(data, [...epsilonRate][0], 0, 'CO2Scrubber');
const lifeSupportRating = parseInt(oxygenGeneratorRate, 2) * parseInt(co2ScrubberRate, 2);

