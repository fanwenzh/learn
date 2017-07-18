const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('./a.txt')
        // output:
});

rl.on('line', (line) => {
    console.log('Line from file:', line);
});