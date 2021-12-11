const fs = require('fs');
const data = fs.readFileSync('./file.txt').toString();

// ninth golden star
const coordinatePairs = data.split('\r\n').map(pair => {
    const [first, second] = pair.split(' -> ');
    const firstCoordinate = [...first.split(',')].map(x => parseInt(x));
    const secondCoordinate = [...second.split(',')].map(x => parseInt(x));

    return {
        firstCoordinate,
        secondCoordinate,
    }
});


const map = new Map();

function updateCoordinateValue(i, j) {
    const obj = JSON.stringify({X: i, Y: j});
    const existingValue = map.get(obj);
    const value = existingValue ? (existingValue + 1) : 1;
    map.set(obj, value);
}

function getCoordinateMap() {
    coordinatePairs.forEach(pair => {
        let [x1, x2, y1, y2] = [pair.firstCoordinate[0], pair.secondCoordinate[0],
            pair.firstCoordinate[1], pair.secondCoordinate[1]];

        // swap the coordinates if start is higher than end
        if (x1 >= x2) {
            [x1, x2] = [x2, x1];
        }

        if (y1 >= y2) {
            [y1, y2] = [y2, y1];
        }

        // for vertical or horizontal line, increase the one that is not equal
        if (x1 === x2 || y1 === y2) {
            for (let i = x1; i <= x2; i++) {
                for (let j = y1; j <= y2; j++) {
                    updateCoordinateValue(i, j);
                }
            }
        }

        // for diagonal lines, increase each index with 1
        // this is tenth golden star
        else {
            [x1, x2, y1, y2] = [pair.firstCoordinate[0], pair.secondCoordinate[0],
            pair.firstCoordinate[1], pair.secondCoordinate[1]];
            const xIncrement = (x1 < x2) ? 1 : -1;
            const yIncrement = (y1 < y2) ? 1 : -1;

            if (xIncrement === 1) {
                for (let i = x1, j = y1; i <= x2; i += xIncrement, j += yIncrement) {
                    updateCoordinateValue(i, j);
                }
            } else {
                for (let i = x1, j = y1; i >= x2; i += xIncrement, j += yIncrement) {
                    updateCoordinateValue(i, j);
                } 
            }
        }
    });
}

let result = 0;
getCoordinateMap();

map.forEach((value, key) => {
    if (value >= 2) {
        result++;
    }
})