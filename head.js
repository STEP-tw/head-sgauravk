const fs = require('fs');
const {createHeading, findInteger, getHeadType} = require('./src/lib.js');

const main = function(){
  let inputs = process.argv.slice(2);
  let filesList = inputs.filter(file => file.includes('.'));
  let delimeter = '';
  inputs = inputs.slice(0, inputs.length-filesList.length);
  for(let file of filesList){
    let content = fs.readFileSync(file, 'utf8');
    if (filesList.length > 1){
      console.log(createHeading(file));
      delimeter = '\n';
    }
    console.log(getHeadType(inputs)(content,findInteger(inputs) || 10),delimeter);
  }
};
main();
