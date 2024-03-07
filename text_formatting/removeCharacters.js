// Load the fs module to work with the file system
const fs = require('fs');

// Get the file name and characters to remove from the command line arguments
const [fileName, charactersToRemove] = process.argv.slice(2);

// Define a function to remove the characters
function removeCharactersFromFile(filePath, characters) {
  // Read the file content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading the file: ${err.message}`);
      return;
    }

    // Replace the specified characters with an empty string
    const result = data.replace(new RegExp(characters, 'g'), '');

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

// Check if both fileName and charactersToRemove are provided
if (!fileName || !charactersToRemove) {
  console.log('Usage: node removeCharacters.js <fileName> <charactersToRemove>');
} else {
  // Call the function with the file name and characters to remove
  removeCharactersFromFile(fileName, charactersToRemove);
}