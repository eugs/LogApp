var logger = require('./log-app.js');
checkArgs(process.argv.slice(2));


function checkArgs(args) {
  if(!args.length) {
    //TODO info
    console.log("please, use ADD | LIST | REMOVE | READ");
    return;
  }

  var command = args[0];

  switch (command.toUpperCase()) {
    case "ADD":
      addNote(args[1], args[2]);
      break;

    case "LIST":
      logger.listNotes();
      break;

    case "REMOVE":
      logger.removeNote(args[1]);
      break;

    case "READ":
      logger.readNote(args[1]);
      break;

    default:
      console.log("no such command: " + command);
      break;
  }
}

function addNote(title, body) {
  try {
    logger.addNote(title, body);
  } catch(e) {
    console.log("ERROR: " + e);
  }
}
