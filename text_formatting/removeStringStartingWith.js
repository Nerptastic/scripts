const fs = require('fs');

// Get the file name and stringStart to remove from the command line arguments
const [fileName, lineStartsWith] = process.argv.slice(2);

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Define a function to remove lines that start with stringStart
function removeStringStartFromFile(filePath, stringStart) {
  // Read the file content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading the file: ${err.message}`);
      return;
    }

    // Escape special characters in stringStart and create a regex to match entire lines starting with stringStart
    const escapedStringStart = escapeRegExp(stringStart);
    const regex = new RegExp(`^${escapedStringStart}.*\\r?\\n?`, 'gm');

    // Replace lines starting with stringStart with an empty string
    const result = data.replace(regex, '');

    // Define a new file path to save the result
    const newFilePath = `modified_${filePath}`;

    // Write the result to a new file
    fs.writeFile(newFilePath, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing the modified file: ${err.message}`);
        return;
      }

      console.log(`File has been modified and saved as ${newFilePath}`);
    });
  });
}

// Check if both fileName and lineStartsWith are provided
if (!fileName || !lineStartsWith) {
  console.log('Usage: node removestringStart.js <fileName> <lineStartsWith>');
} else {
  // Call the function with the file name and the string to remove from the start of lines
  removeStringStartFromFile(fileName, lineStartsWith);
}