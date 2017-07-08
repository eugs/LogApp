var fs = require('fs');
var path = "./notes.json";
var printer = require('./printer.js');
var notes = [];

exports.addNote = addNote;
exports.removeNote = removeNote;
exports.listNotes = listNotes;
exports.readNote = readNote;
exports.removeAll = removeAll;

function addNote(title, body) {
  //check empty fields
  if(!title) { throw ("please, set the title"); }
  if(!body) { body = "<no description>"; }

  //create array even if file doesn't exists
  try {
    notes = readFile();
  } catch(e) {
    notes = []
  }

  checkDuplicates(title);

  var note = {
    title: title,
    body: body
  };

  notes.push(note);
  writeFile(notes);
  printer.print("note added:", "\t"+note.title, "\t" + note.body)
}

function listNotes() {
    notes = readFile();

    if(!notes.length) {
      printer.print("Found no notes!");
      return;
    }

    printer.log("\nHere's the list of all notes:");
    //form a string
    var outputString = "\n";
    for (note of notes) {
      outputString += (note.title + " : " + note.body + "\n");
    }
    printer.print(outputString);
}

function removeNote(title) {
  notes = readFile();

  var note = findNote(title);

  var ind = notes.indexOf(note);
  if(ind === -1) {
    printer.print("no such note: " + title);
  } else {
    notes.splice(ind, 1);
    printer.print("note removed: " + title);
    writeFile(notes);
  }
}

function removeAll() {
  notes = [];
  writeFile(notes);
  printer.print("all notes were removed");
}

function readNote(title) {
  notes = readFile();

  var note = findNote(title);

  if(note) {
    printer.log("your note:")
    printer.print(note.title + " : " + note.body);
  } else {
    printer.print("no note founded: " + title);
  }
}

function findNote(title) {
  if(!title) return null;

  var note = null;
  for (var i = 0; i < notes.length; i+=1) {
    if (notes[i].title.toLowerCase() === title.toLowerCase()) {
      note = notes[i];
      break;
    }
  }
  return note;
}

function checkDuplicates(title) {
  if(findNote(title)) {
    throw ("note: " + title + " already exists");
  }
}

function readFile() {
    var data = fs.readFileSync(path);
    return (data != '') ? JSON.parse(data) : [];
  }

function writeFile(notes) {
  fs.writeFileSync(path, JSON.stringify(notes, null, ' '));
}
