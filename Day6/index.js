const fs = require('fs');
const data = fs.readFileSync('./file.txt').toString().split(',').map(x => parseInt(x));
const noOfDays = 256;
const fishMap = new Map();

// initialize the map with possible keys
for (i = 0; i <= 8; i++) {
    fishMap.set(i, 0);
}

// storage numbers within a map to prevent heap memory crashes
[...data].forEach((fishDays, _) => {
    const noOfFishDays = fishMap.get(fishDays) ? fishMap.get(fishDays) + 1 : 1;
    fishMap.set(
       fishDays,
       noOfFishDays
    );
});

function getFishMap(fishMap, noOfDays) {
    let kids = 0;
    const updatedMap = new Map();

    fishMap.forEach((noOfFishDays, fishDays) => {
        // subtract each day by one if it's bigger than 1
         if (fishDays >= 1) {
            // this case is only because both 0 and 7 transforms into 6
            const noOfExistingFishDays = updatedMap.get(fishDays - 1) ? updatedMap.get(fishDays - 1) : 0;
            updatedMap.set(fishDays - 1, noOfFishDays + noOfExistingFishDays);
        }
 
        // otherwise increase the number of kids to be added
        // and reset the current fish to 6
        else {
            updatedMap.set(6, noOfFishDays);
            kids += noOfFishDays;
        }
    });

    // add the kids
    updatedMap.set(8, kids);

    if (noOfDays === 0) {
        let result = 0;
        fishMap.forEach((noOfFishDays, _) => {
            result += noOfFishDays;
        });
        return result;
    }
    return getFishMap(updatedMap, --noOfDays);
};

const result = getFishMap(fishMap, noOfDays);

