var decor = "--------"

module.exports.print = print;
module.exports.log = log;

function print() {
  console.log(decor);
  for (var i = 0; i < arguments.length; i+=1) {
      console.log(arguments[i]);
  }
  console.log(decor);
}

function log() {
  for (var i = 0; i < arguments.length; i+=1) {
      console.log(arguments[i]);
  }
}
