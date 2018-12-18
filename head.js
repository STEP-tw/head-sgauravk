const fs = require("fs");
const { getFinalOutput } = require("./src/lib.js");
const { parseUserInput } = require("./src/parseInput");

const main = function() {
  let inputs = process.argv.slice(2);
  const { input, filesList } = parseUserInput(inputs);
  console.log(getFinalOutput( fs.readFileSync, fs.existsSync, input, filesList, 'head'));
};

main();
