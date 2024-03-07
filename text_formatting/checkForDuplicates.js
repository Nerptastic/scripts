const fs = require('fs');

const [fileName] = process.argv.slice(2);

function checkForDuplicates(fileName) {

    // Read the file content and split it into lines
    const content = fs.readFileSync(fileName, 'utf8');
    const lines = content.split('\n');

    // Object to track occurrences of each line
    const occurrences = {};

    // Iterate through each line to fill the occurrences object
    lines.forEach(line => {
        if (occurrences[line]) {
            occurrences[line] += 1; // Increment count if line exists
        } else {
            occurrences[line] = 1; // Initialize with 1 if new line
        }
    });

    // Now, identify and print duplicates
    for (const [line, count] of Object.entries(occurrences)) {
        if (count > 1) {
            console.log(`Duplicate: "${line}" - Count: ${count}`);
        }
    }
    
}

// Check if fileName is provided
if (!fileName) {
    console.log('Usage: node checkForDuplicates.js <fileName>');
  } else {
    // Call the function with the file name and characters to remove
    checkForDuplicates(fileName);
}