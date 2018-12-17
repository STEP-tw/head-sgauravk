const fs = require('fs');
const {tail, extractCount} = require('./src/lib.js');

const main = function(){
  let inputs = process.argv.slice(2);
  let filesList = inputs.filter(file => !file.startsWith('-') && !file.match(/^\d/));
  inputs = inputs.slice(0, inputs.length-filesList.length);
  if (extractCount(inputs) == '0') { process.exit(); }
  console.log(tail(fs.readFileSync,fs.existsSync,inputs,filesList));
};

main();

