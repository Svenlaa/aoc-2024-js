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

leftList.sort();
rightList.sort();

let distance = 0;
for (let i = 0; i < lines.length; i++) {
    let difference = leftList[i] - rightList[i];
    if (!difference) difference = 0; // handle NaN and empty cases
    if (difference < 0) difference = -difference; // make sure distance will always add

    distance += difference;
}

console.log(distance);
