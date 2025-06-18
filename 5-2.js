import fs from 'fs/promises';

const file = await fs.readFile('input.txt', 'utf-8');

const lines = file.split(/\r?\n/); // handle windows and *nix

const split = lines.findIndex((v) => v === '');
const rules = lines.slice(0, split).map((rule) => rule.split('|'));
let pages = lines
    .slice(split + 1)
    .filter((p) => p !== '')
    .map((page) => page.split(','));

const findBrokenRules = (rules, page) => {
    let brokenRules = [];
    rules.forEach((rule) => {
        const index1 = page.findIndex((v) => v === rule[0]);
        const index2 = page.findIndex((v) => v === rule[1]);

        if (index1 < 0 || index2 < 0) return;
        if (index1 > index2) {
            brokenRules.push(rule);
        }
    });
    return brokenRules;
};

pages = pages.map((page) => {
    let brokenRules = findBrokenRules(rules, page);
    if (!brokenRules.length) return [];

    while (brokenRules.length) {
        brokenRules.forEach((rule) => {
            page = page.filter((i) => i !== rule[0]);
            const largerIndex = page.findIndex((v) => v === rule[1]);
            page.splice(largerIndex, 0, rule[0]);
        });
        brokenRules = findBrokenRules(rules, page);
    }

    return page;
});

const total = pages.reduce((a, page) => {
    if (!page.length) return a;
    const middleIndex = Math.floor(page.length / 2);
    const middleNumber = +page[middleIndex];
    return a + middleNumber;
}, 0);

console.log(total);
