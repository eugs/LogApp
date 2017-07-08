var fs = require('fs');
var path = "./notes.json";
var notes = [];
var dec = "------"
var printer = require('./printer.js');

exports.addNote = addNote;
exports.removeNote = removeNote;
exports.listNotes = listNotes;
exports.readNote = readNote;

function addNote(title, body) {
  //check empty fields
  if(!title) { throw ("please, set the title"); }
  if(!body) { body = "<no description>"; }

  notes = readFile();
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
  // try {
    var data = fs.readFileSync(path);
      return (data != '') ? JSON.parse(data) : [];
    // } catch(error) {
      // throw("Problems with reading " + path + "\n" + error);
      // printer.print("Problems with reading " + path + "\n" + error);
      // return [];
    // }
  }

function writeFile(notes) {
  fs.writeFileSync(path, JSON.stringify(notes, null, ' '));
}
