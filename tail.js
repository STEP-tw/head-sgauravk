const fs = require("fs");
const { getFinalOutput } = require("./src/lib.js");
const { extractCount } = require("./src/util.js");
const { parseUserInput } = require("./src/parseInput");

const main = function() {
  let inputs = process.argv.slice(2);
  const { input, filesList } = parseUserInput(inputs);
   if (extractCount(input) == "0") process.exit();
  console.log(getFinalOutput(fs.readFileSync, fs.existsSync, input, filesList, 'tail'));
};

main();
