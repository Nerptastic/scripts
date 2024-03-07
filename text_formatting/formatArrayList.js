const fs = require('fs');

function formatArrayList(fileName) {
  // Read the file content
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading the file: ${err.message}`);
      return;
    }

    // Step 1: Remove numbers and colons at the start of each line
    let result = data.replace(/^\d+:\s*"/gm, '');

    // Step 2: Remove ending quotes from each line, if the previous step didn't catch them
    result = result.replace(/"$/gm, '');

    // Step 3: Remove empty lines
    result = result.replace(/^\s*[\r\n]/gm, '');

    // Define a new file Name to save the result
    const newFileName = `modified_${fileName}`;

    // Write the result to a new file
    fs.writeFile(newFileName, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing the modified file: ${err.message}`);
        return;
      }
      console.log(`File has been modified and saved as ${newFileName}`);
    });
  });
}

const fileName = process.argv[2];

// Check if fileName is provided
if (!fileName) {
    console.log('Usage: node formatArrayList.js <fileName>');
  } else {
    // Call the function with the file name
    formatArrayList(fileName);
}