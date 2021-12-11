const fs = require('fs');
const data = fs.readFileSync('./file.txt').toString();

// seventh golden star

// split the file content
const numbersToBeExtracted = [...data.split('\n')[0].split(',')];
const matrices = [...data.split('\n\r')].slice(1);
const matrixLength = matrices[0].split('\r\n')[0].split('\n').slice(1).toString().split(' ').filter(x => x !== '').length;

// parse the matrices strings into actual matrices, so we can access them via indices
const parsedMatrices = matrices.map(matrix => {
    const parsedMatrix = [];

    for (i = 0; i < matrixLength; i++) {
        // ith row of the matrix with numbers as strings
        const matrixRow = matrix.split('\r')[i].split('\n').slice(1).toString().split(' ').filter(x => x !== '');
        parsedMatrix.push(matrixRow);s
    }

    return parsedMatrix;
});

function createMatchedMatrices(matrices, numberToBeMatched) {

    // replace the number in the matrix with 'matched' since we don't need that number anymore
    const matchedMatrices = matrices.map(matrix => {
        const matrixCopy = JSON.parse(JSON.stringify(matrix));

        for (i = 0; i < matrixLength; i++) {
            for (j = 0; j < matrixLength; j++) {
                if (matrix[i][j] === numberToBeMatched) {
                    matrixCopy[i][j] = 'matched';
                    return matrixCopy;
                }
            }
        }
        // if the matrix doesn't contain the number, return it
        return matrixCopy;
    });
    return matchedMatrices;
}


function findMatrixWinner(matrices, index) {
    const numberToBeMatched = numbersToBeExtracted[index].toString();
    const matchedMatrices = createMatchedMatrices(matrices, numberToBeMatched);

    const matrixWinner = matchedMatrices.find(matrix => {
        for (i = 0; i < matrixLength; i++) {
            const arrayColumn = matrix.map(x => x[i]);
            if (matrix[i].every(element => element === 'matched') ||
                arrayColumn.every(element => element === 'matched')) {
                return matrix;
            }
        }
    });

    // if we find the matrix, return the result
    if (matrixWinner) {
        const sumOfUnmarkedNumbers = flatten(matrixWinner).filter(x => x !== 'matched').reduce((a, b) => parseInt(a) +  parseInt(b));
        return (sumOfUnmarkedNumbers * parseInt(numberToBeMatched));
    } else {
        return findMatrixWinner(matchedMatrices, ++index);
    }
};  

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }


// result
const resultSeventhGoldenStar = findMatrixWinner(parsedMatrices, 0);


// eight golden star
function checkMatrixLastWinner(matrices, index) {
    const numberToBeMatched = numbersToBeExtracted[index].toString();
    const matchedMatrices = createMatchedMatrices(matrices, numberToBeMatched);

    const filteredMatrices = matchedMatrices.filter(matrix => {
        let notMatched = true;

        // if a column or line has matched on every position, filter it out
        for (i = 0; i < matrixLength; i++) {
            const arrayColumn = matrix.map(x => x[i]);
            if (matrix[i].every(element => element === 'matched') ||
                arrayColumn.every(element => element === 'matched')) {
                notMatched = false;
            };
        }
        return notMatched;
    });

    // the last matrix is the last winner
    if (filteredMatrices.length === 0) {
        const sumOfUnmarkedNumbers = flatten(matchedMatrices[0]).filter(x => x !== 'matched').reduce((a, b) => parseInt(a) +  parseInt(b));
        return (sumOfUnmarkedNumbers * parseInt(numberToBeMatched));
    } else {
        return checkMatrixLastWinner(filteredMatrices, ++index);
    }
}

// result
const resultEightMatrices = checkMatrixLastWinner(parsedMatrices, 0);