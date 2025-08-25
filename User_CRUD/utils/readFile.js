// utils/readJSONFile.js
const fs = require('fs');

function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading or parsing file at ${filePath}:`, error.message);
        return null;
    }
}

module.exports = readFile;
