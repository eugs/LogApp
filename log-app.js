var fs = require('fs');
var path = "./notes.json";
var notes = [];
var dec = "------"

exports.addNote = addNote;
exports.removeNote = removeNote;
exports.listNotes = listNotes;
exports.readNote = readNote;

function addNote(title, body) {
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
  console.log(dec);
  console.log("NOTE ADDED: ");
  console.log("\t"+note.title+"\n\t" + note.body);
  console.log(dec);
}

function listNotes() {
  try {
    notes = readFile();
    console.log("\nHere's the list of all notes:");
    console.log(dec);

    for (note of notes) {
      console.log(note.title + " : " + note.body);
    }
    console.log(dec);

  } catch (error) {
    console.log("error while reading file: " + path +" : " + error);
  }
}

function removeNote(title) {
  notes = readFile();

  var note = findNote(title);

  var ind = notes.indexOf(note);
  if(ind === -1) {
    console.log("no such note: " + title);
  } else {
    notes.splice(ind, 1);
    console.log("note removed: " + title);
    // console.log(notes);
    writeFile(notes);
  }
}

function readNote(title) {
  notes = readFile();

  var note = findNote(title);

  if(note) {
    console.log(dec);
    console.log(note.title + " : " + note.body);
    console.log(dec);
  } else {
    console.log("no note founded: " + title);
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
    throw ("note: " + title+ " already exists");
  }
}

function readFile() {
  try {
    var data = fs.readFileSync(path);
      return (data != '') ? JSON.parse(data) : [];
    } catch(error) {
      console.error("Problems with reading " + path + "\n" + error);
      return [];
    }
  }

function writeFile(notes) {
  fs.writeFileSync(path, JSON.stringify(notes, null, ' '));
}
