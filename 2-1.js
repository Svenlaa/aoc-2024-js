import fs from 'fs/promises';

const file = await fs.readFile('input.example.txt', 'utf-8');
const reports = file.split(/\r?\n/); // handle windows and *nix

const countOccurrences = (haystack = [], needle = 0) => {
    return haystack.reduce((count, val) => (val === needle ? count + 1 : count), 0);
};

const boolReports = reports.map((report) => {
    const levels = report.split(' ');

    let isAscending = levels[1] - levels[0] > 0;

    for (let i = 1; i < levels.length; i++) {
        let previousLevel = levels[i - 1];
        let currentLevel = levels[i];

        const diff = currentLevel - previousLevel;
        if (isAscending && diff < 0) return false;
        if (!isAscending && diff > 0) return false;

        const normalizedDiff = diff > 0 ? diff : -diff;
        if (normalizedDiff < 1) return false;
        if (normalizedDiff > 3) return false;
    }

    return true;
});

console.log(countOccurrences(boolReports, true));
