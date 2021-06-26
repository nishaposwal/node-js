const fs = require("fs");
const chalk = require("chalk");

function addNotes(title, body) {
  const notes = loadNotes();
  const duplicate = notes.filter((note) => {
    return note.title === title;
  });

  if (duplicate.length == 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Successfully added new note"));
  } else {
    console.log(chalk.red.inverse("Duplicate title"));
  }
}

function saveNotes(notes) {
  const notesString = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesString);
}

function loadNotes() {
  try {
    const dataJSON = JSON.parse(dataBuffer);
    return dataJSON;
  } catch (error) {
    return [];
  }
}

function removeNote(title) {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log(chalk.red.inverse("No notes available"));
    return;
  }

  noteAfterRemoving = notes.filter((note) => {
    return note.title != title;
  });
  if (noteAfterRemoving.length === notes.length) {
    console.log(chalk.red.inverse("No note available with this title"));
  } else {
    saveNotes(noteAfterRemoving);
    console.log(chalk.green.inverse("Successfully removed note"));
  }
}

function listNotes(){
const notes = loadNotes();
console.log(chalk.blue.inverse("Your Notes"));
notes.forEach(note => {
    console.log(chalk.blue.inverse(note.title));
});
}

function readNote(title){
const notes = loadNotes();
const note = notes.find(note=>{
    return note.title === title
})
if(note){
  console.log(chalk.yellow.inverse('title; ', note.title));  
  console.log(chalk.yellow.inverse('body: ', note.body));  
} else {
    console.log(chalk.red.inverse("No Note is available with this title")); 
      
}
}

module.exports = {
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes : listNotes,
  readNote : readNote
};
