import fs from 'fs/promises';

const file = await fs.readFile('input.txt', 'utf-8');

const statements = [];

const doSplits = file.split('do()');
doSplits.forEach((dontSplit) => {
    const doBlock = dontSplit.split("don't()")[0] ?? '';

    statements.push.apply(statements, doBlock.match(/mul\(\d{1,3},\d{1,3}\)/g));
});

let total = 0;
statements.forEach((statement) => {
    const [n1, n2] = statement.replace('mul(', '').replace(')', '').split(',');
    total += +n1 * +n2;
});

console.log(total);
