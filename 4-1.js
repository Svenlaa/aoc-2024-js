import fs from 'fs/promises';

const file = await fs.readFile('input.txt', 'utf-8');

const lines = file.split(/\r?\n/); // handle windows and *nix

let matchCount = 0;

const getMatchesForStrings = (strings) => {
    let count = 0;
    strings.forEach((string) => {
        const matches = string.match(/XMAS/g) ?? [];
        const reverseMatches = string.match(/SAMX/g) ?? [];
        count += matches.length + reverseMatches.length;
    });
    return count;
};

matchCount += getMatchesForStrings(lines);

let columns = [];
for (let col = 0; col < lines[0].length; col++) {
    let column = '';
    lines.forEach((line) => {
        column += line[col];
    });
    columns[col] = column;
}
matchCount += getMatchesForStrings(columns);

let diagonalsDR = [];

const padCount = lines.length - 1;
const padding = ' '.repeat(padCount);
const paddedLines = [...lines].map((line) => padding + line + padding);
for (let diagDR = 0; diagDR < paddedLines[0].length; diagDR++) {
    let str = '';

    paddedLines.forEach((paddedLine, y) => {
        str += paddedLine[diagDR + y] ?? '';
    });
    const trimmedStr = str.replaceAll(' ', '');
    if (trimmedStr.length > 0) {
        diagonalsDR.push(trimmedStr);
    }
}
matchCount += getMatchesForStrings(diagonalsDR);

const diagonalsDL = [];
for (let diagDL = 0; diagDL < paddedLines[0].length; diagDL++) {
    let str = '';

    paddedLines.forEach((paddedLine, y) => {
        str += paddedLine[diagDL + -y] ?? '';
    });
    const trimmedStr = str.replaceAll(' ', '');
    if (trimmedStr.length > 0) {
        diagonalsDL.push(trimmedStr);
    }
}
matchCount += getMatchesForStrings(diagonalsDL);

console.log(matchCount);
