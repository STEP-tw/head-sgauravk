const fs = require("fs");
const { head } = require("./src/lib.js");

const main = function() {
  let inputs = process.argv.slice(2);
  let filesList = inputs.filter(file => !file.startsWith("-") && !file.match(/^\d/));
  inputs = inputs.slice(0, inputs.length - filesList.length);
  console.log(head(fs.readFileSync, fs.existsSync, inputs, filesList));
};

main();
