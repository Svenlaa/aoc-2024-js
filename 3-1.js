import fs from 'fs/promises';

const file = await fs.readFile('input.txt', 'utf-8');

// get the mul statements
const statements = file.match(/mul\(\d{1,3},\d{1,3}\)/g);

let total = 0;
statements.forEach((statement) => {
    const [n1, n2] = statement.replace('mul(', '').replace(')', '').split(',');
    total += +n1 * +n2;
});

console.log(total);
