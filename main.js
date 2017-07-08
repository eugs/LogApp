var logger = require('./log-app.js');
var printer = require('./printer.js');

checkArgs(process.argv.slice(2));


function checkArgs(args) {
  if(!args.length) {
    printer.print("please, use ADD | LIST | REMOVE | READ");
    return;
  }

  var command = args[0];

  switch (command.toUpperCase()) {
    case "ADD":
      execute(logger.addNote, args[1], args[2]);
      // addNote(args[1], args[2]);
      break;

    case "LIST":
      // logger.listNotes();
      execute(logger.listNotes);
      break;

    case "REMOVE":
      execute(logger.removeNote, args[1]);
      // logger.removeNote(args[1]);
      break;

    case "READ":
      execute(logger.readNote, args[1]);
      // logger.readNote(args[1]);
      break;

    default:
      printer.print("no such command: " + command);
      break;
  }
}

function execute(func, title, body) {
  try {
    func(title, body);
  } catch(e) {
    printer.print("ERROR: " + e);
  }
}

function addNote(title, body) {
  try {
    logger.addNote(title, body);
  } catch(e) {
    printer.print("ERROR: " + e);
  }
}
