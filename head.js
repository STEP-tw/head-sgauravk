const fs = require('fs');
const {head} = require('./src/lib.js');

const main = function(){
  let inputs = process.argv.slice(2);
  let filesList = inputs.filter(file => file.includes('.'));
  inputs = inputs.slice(0, inputs.length-filesList.length);
  head(fs.readFileSync,fs.existsSync,inputs,filesList);
};

main();
