const fs = require('fs');

const data = fs.readFileSync('./file.txt').toString().split(',').map(x => parseInt(x));

// thirteen golden star
function median(values){
    values.sort((a,b) => a - b);
  
    const half = Math.round(values.length / 2);

    if (values.length % 2)
      return values[half];
    
    return (values[half - 1] + values[half]) / 2;
}

const medianValue = median(data);

const firstTotalFuelConsumption = data.reduce((prev, curr) => {
    const diff = Math.abs(curr - medianValue);
    return prev + diff;
}, 0)


// fourteen golden star
function gauss (number) {
    return number * (number + 1) / 2;
}

const sum = data.reduce((a,b) => a + b);
const average = Math.floor(sum / data.length);

const secondTotalFuelConsumption = data.reduce((acc, curr) => {
    const diff = Math.abs(curr - average);
    const fuelConsumption = gauss(diff);
    return acc + fuelConsumption;
}, 0);