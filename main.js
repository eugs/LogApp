var logger = require('./log-app.js');
var printer = require('./printer.js');

checkArgs(process.argv.slice(2));


function checkArgs(args) {
  if(!args.length) {
    printer.print("please, use ADD | LIST | REMOVE | READ | BURNALL");
    return;
  }

  var command = args[0];

  switch (command.toUpperCase()) {
    case "ADD":
      execute(logger.addNote, args[1], args[2]);
      break;

    case "LIST":
      execute(logger.listNotes);
      break;

    case "REMOVE":
      execute(logger.removeNote, args[1]);
      break;

    case "READ":
      execute(logger.readNote, args[1]);
      break;

    case "BURNALL":
      execute(logger.removeAll, args[1]);
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
