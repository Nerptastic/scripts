const fs = require('fs');
const path = require('path');

// Specify the path to your file
const filePath = path.join(__dirname, 'urls.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading the file: ${err.message}`);
        return;
    }

    // Split the file content into lines
    const urls = data.split('\n').filter(line => line.trim() !== '');

    // Format the lines as a JavaScript array
    const formattedUrls = urls.map(url => `'${url}'`).join(',\n');

    console.log(`[\n${formattedUrls}\n]`);
});
