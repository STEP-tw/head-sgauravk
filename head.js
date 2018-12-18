const fs = require("fs");
const { getFinalOutput } = require("./src/lib.js");
const { parseUserInput } = require("./src/parseInput");

const main = function() {
  let inputs = process.argv.slice(2);
  console.log(getFinalOutput( fs.readFileSync, fs.existsSync,
      parseUserInput(inputs).input,
      parseUserInput(inputs).filesList, 'head'));
};

main();
