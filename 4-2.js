import fs from 'fs/promises';

const file = await fs.readFile('input.txt', 'utf-8');

const rawlines = file.split(/\r?\n/); // handle windows and *nix

const lines = rawlines.map((l) => l + '..');
const lineLenght = lines[0].length;
lines.push('.'.repeat(lineLenght));
lines.push('.'.repeat(lineLenght));

let counts = 0;
lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (char === '.') return;
        let isMiddleA = lines[y + 1][x + 1] === 'A';
        if (!isMiddleA) return;

        const tl = lines[y][x];
        const br = lines[y + 2][x + 2];
        if (tl === br) return;
        const c1 = tl === 'M' && br === 'S';
        const c2 = tl === 'S' && br === 'M';
        if (!(c1 || c2)) return;

        const bl = lines[y + 2][x];
        const tr = lines[y][x + 2];
        if (tr === bl) return;
        const c3 = tr === 'M' && bl === 'S';
        const c4 = tr === 'S' && bl === 'M';
        if (!(c3 || c4)) return;

        counts++;
    });
});

console.log(counts);
