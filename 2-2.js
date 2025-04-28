import fs from 'fs/promises';

const file = await fs.readFile('input.txt', 'utf-8');
const reports = file.split(/\r?\n/); // handle windows and *nix

const countOccurrences = (haystack = [], needle = 0) => {
    return haystack.reduce((count, val) => (val === needle ? count + 1 : count), 0);
};

const checkIfCorrect = (levels = []) => {
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
};

const boolReports = reports.map((report) => {
    const levels = report.split(' ');

    if (checkIfCorrect(levels)) return true;

    for (let i = 0; i < levels.length; i++) {
        const dampenedLevels = [...levels];
        dampenedLevels.splice(i, 1);
        if (checkIfCorrect(dampenedLevels)) return true;
    }
    return false;
});
console.log(countOccurrences(boolReports, true));
