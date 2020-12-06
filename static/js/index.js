
// Formats the script in the text area
function formatScript() {
  let scriptText = document.getElementById('txtScript').value;
  let scriptLines = scriptText.split("\n");

  let formattedText = '';
  let indentLength = 0;

  for (const line of scriptLines) {
    let trimmedLine = line.trim();
    console.log("INFO: Processing line: " + trimmedLine);

    // Reduces indent length if this is the end of a block
    if (trimmedLine.startsWith("end-if")) {
      indentLength -= 4;
    } else if (trimmedLine.startsWith("end-for")) {
      indentLength -= 4;
    }
    // Create the indent for this line
    let indent = ' '.repeat(indentLength);

    // Prepares the indent length for the next lines
    if (trimmedLine.startsWith("if (") || trimmedLine.startsWith("if(")) {
      indentLength += 4;
    } else if (trimmedLine.startsWith("for (") || trimmedLine.startsWith("for(")) {
      indentLength += 4;
    } 

    // Apply indent to current line
    let formattedLine = indent + trimmedLine;
    formattedText += formattedLine + "\n";
  }

  document.getElementById('txtScript').value = formattedText;
  btnSubmit.blur();
}

// Bind click event
let btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener('click', formatScript);
