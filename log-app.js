var fs = require('fs');
var path = "./notes.json";
var notes = [];
var dec = "------"

// addNote("a titile2", "body");
// addNote("ht1", "finish ht1 today");
// addNote("ht2", "finish ht2 today");
// addNote("gitHub", "push code to git");
listNotes();
readNote("ht2");
removeNote("ht1");
listNotes();

function addNote(title, body) {
  var note = {
    title: title,
    body: body
  };
  notes = readFile();
  //TODO check duplicates

  notes.push(note);
  writeFile(notes);
  console.log(dec);
  console.log("NOTE ADDED: ");
  console.log("\t"+note.title);
  console.log(dec);
}

function listNotes() {
  try {
    notes = readFile();
    console.log("\n========");

    for (note of notes) {
      console.log(note.title + " : " + note.body);
    }
    console.log("\n========");

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
  var note = null;
  for (var i = 0; i < notes.length; i+=1) {
    if (notes[i].title.toLowerCase() === title.toLowerCase()) {
      note = notes[i];
      break;
    }
  }
  return note;
}

function readFile() {
  try {
    var data = fs.readFileSync(path);
    // console.log("READED: " + data);
      return (data != '') ? JSON.parse(data) : [];
    } catch(error) {
      console.error("Problems while reading " + path + "\n" + error);
      return [];
    }
  }

function writeFile(notes) {
  fs.writeFileSync(path, JSON.stringify(notes, null, ' '));
}
