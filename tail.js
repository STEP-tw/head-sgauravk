const fs = require('fs');
const {tail, findInteger} = require('./src/lib.js');

const main = function(){
  let inputs = process.argv.slice(2);
  let filesList = inputs.filter(file => !file.startsWith('-') && !file.match(/^\d/));
  inputs = inputs.slice(0, inputs.length-filesList.length);
  if (findInteger(inputs) == '0'){
    process.exit(); }
  console.log(tail(fs.readFileSync,fs.existsSync,inputs,filesList));
};

main();

