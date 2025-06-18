import fs from 'fs/promises';

const file = await fs.readFile('input.txt', 'utf-8');

const lines = file.split(/\r?\n/); // handle windows and *nix

const split = lines.findIndex((v) => v === '');
const rules = lines.slice(0, split).map((rule) => rule.split('|'));
const pages = lines
    .slice(split + 1)
    .filter((p) => p !== '')
    .map((page) => page.split(','));

const finePages = pages.filter((page) => {
    let isFine = true;
    rules.forEach((rule) => {
        const index1 = page.findIndex((v) => v === rule[0]);
        const index2 = page.findIndex((v) => v === rule[1]);

        if (index1 < 0 || index2 < 0) return;
        if (index1 > index2) {
            isFine = false;
        }
    });
    return isFine;
});

const total = finePages.reduce((a, page) => {
    const middleIndex = Math.floor(page.length / 2);
    const middleNumber = +page[middleIndex];
    return a + middleNumber;
}, 0);

console.log(total);
