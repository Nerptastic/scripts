const fs = require('fs');
const path = require('path');

const [fileName] = process.argv.slice(2);

function removeDuplicates(fileName) {
    // Read the file content and split it into lines
    const content = fs.readFileSync(fileName, 'utf8');
    const lines = content.split('\n');

    // Set to track unique lines
    const uniqueLines = new Set();

    // Iterate through each line and add to the set for uniqueness
    lines.forEach(line => {
        uniqueLines.add(line);
    });

    // Convert the set back to a string with newline characters
    const uniqueContent = Array.from(uniqueLines).join('\n');

    // Generate a new filename with '_modified' appended before the extension
    const dir = path.dirname(fileName);
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    const newFileName = path.join(dir, `${baseName}_modified${ext}`);

    // Write the unique content to the new file
    fs.writeFileSync(newFileName, uniqueContent, 'utf8');
    console.log(`Duplicates removed. Modified file saved as ${newFileName}`);
}

// Check if fileName is provided
if (!fileName) {
    console.log('Usage: node removeDuplicates.js <fileName>');
} else {
    // Call the function with the file name
    removeDuplicates(fileName);
}
