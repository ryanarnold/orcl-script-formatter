
// Formats the script in the text area
function formatScript() {
  // let scriptText = document.getElementById('editor').innerHTML;
  let editor = ace.edit("editor");
  let scriptText = editor.getValue();
  let scriptLines = scriptText.split("\n");

  let formattedText = '';
  let indentLength = 0;

  let isElse = false;

  for (const line of scriptLines) {
    let trimmedLine = line.trim();
    console.log("INFO: Processing line: " + trimmedLine);

    // Reduces indent length if this is the end of a block
    if (trimmedLine.startsWith("end-if")) {
      indentLength -= 4;
    } else if (trimmedLine.startsWith("end-for")) {
      indentLength -= 4;
    }

    // Temporarily unindent for "else"
    if (trimmedLine.startsWith("else")) {
      isElse = true;
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

    // Temporarily unindent for "else"
    if (isElse) {
      indentLength += 4;
      isElse = false;
    }
  }

  formattedText = formattedText.slice(0, -1);

  // document.getElementById('editor').innherHTML = formattedText;
  // let editor = ace.edit("editor");
  editor.setValue(formattedText);
  // editor.blur();
  editor.focus();
  // editor.clearSelection();
}

// Bind click event
let btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener('click', formatScript);
