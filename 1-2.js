import fs from 'fs/promises';

const file = await fs.readFile('input.txt', 'utf-8');

const lines = file.split(/\r?\n/); // handle windows and *nix
const splitLines = lines.map((line) => line.split(' ').filter((v) => v.trim()));

const leftList = [];
const rightList = [];
splitLines.forEach((splitLine) => {
    leftList.push(+splitLine[0]);
    rightList.push(+splitLine[1]);
});

const countOccurrences = (haystack = [], needle = 0) => {
    return haystack.reduce((count, val) => (val === needle ? count + 1 : count), 0);
};

let distance = 0;
for (let i = 0; i < lines.length; i++) {
    const leftListNumber = leftList[i];
    if (!leftListNumber) continue;
    const multiplier = countOccurrences(rightList, leftListNumber);
    console.log({ leftListNumber, multiplier });
    distance += leftListNumber * multiplier;
}

console.log(distance);
