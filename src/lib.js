const createHeading = function(fileName){
  return "==> " + fileName + " <==";
};

const extractLines = function(index, file, linesRequired) {
  let result = file.split("\n").splice(index, linesRequired);
  return result.join("\n");
};

const extractBytes = function(index, file, BytesRequired) {
  let result = file.slice(index,index+BytesRequired);
  return result;
};

const getHeadType = function(inputs) { //bad name inputs  --['-n', '10-c'] its work fine as per your logic
  let list = inputs.join(""); //list ?? 
  if (list.includes("-c")) {
    return extractBytes;
  }
  return extractLines;
};

const findInteger = function(input) { //bad name
  let index = 0;
  let list = input.join(""); //list ??
  while (!parseInt(list) && index < input.join().length) { //complax logic
    if (parseInt(list) == 0) {
      return 0;
    }
    list = input.join("");
    index++;
    list = list.slice(index);
  }
  if (!input.join("").includes("-c") && !input.join("").includes("-n")) {
    return Math.abs(parseInt(list));
  }
  return parseInt(list);
};

const findIllegalVal = function(input) { //unnecessory abbreviation of val, illigal spelling wrongly written
  let list = "abdefghijklmopqrstuvwxyz"; //this could have a better way to solve
  list = list.split("");  //bad argument name input
  input = input.join("");
  let result = "";
  if (list.some(x => input.includes(x))) {
    result = input.slice(2);
  }
  return result;
};

const extractError = function(input, type) {  //bad argument name input, type can be named batter,  complax logic
  let object = {head: {}, tail: "offset --"}; // an object named as object ??
  object['head'][extractLines] = "line count --";
  object['head'][extractBytes] =  "byte count --";
  let variable = object[type]; //bad name variable
  if(type == 'head'){
    variable = object['head'][getHeadType(input)];
  }
  if (findIllegalVal(input) || findInteger(input) < 1) {
    return (type+": illegal "+variable+" "+(findIllegalVal(input)||findInteger(input)));
  }
};

const headReducer = function(result,fileName){ //poor name of function and args , It's doing too much
  const {readFileSync, existsFileSync, inputs, output, delimiter} = result; // poor variable name input output
  if(existsFileSync(fileName)){
    let content = readFileSync(fileName, "utf8");
    output.push(delimiter + createHeading(fileName));  //changing input array
    output.push(getHeadType(inputs)(0, content, findInteger(inputs) || 10));
    result.delimiter = "\n";
    return result;
  }
  result.delimiter = "\n";
  output.push('head: '+fileName+': No such file or directory');
  return result;
};

const head = function(readFileSync, existsFileSync, inputs, filesList) { 
  let delimiter = "";
  let output = [];
  let result = {readFileSync, existsFileSync, inputs, output, delimiter};
  if (extractError(inputs, 'head')) {
    return extractError(inputs, 'head');
  }
  if(filesList.length == 1 && existsFileSync(filesList[0])){
    let content = readFileSync(filesList[0], "utf8");
    return getHeadType(inputs)(0, content, findInteger(inputs) || 10);
  }
  return filesList.reduce(headReducer,result)['output'].join('\n');
};

const tailReducer = function(result,fileName){//bad fucntion name, duplication bad variable name as well
  const {readFileSync, existsFileSync, inputs, output, delimiter} = result;
  let object = {};
  if(existsFileSync(fileName)){
    let content = readFileSync(fileName, "utf8");
    object[extractLines] = content.split('\n').length - (findInteger(result.inputs)||10);
    object[extractBytes] = content.length - (findInteger(result.inputs)||10);
    let index = object[getHeadType(inputs)];
    if (index < 0) { index = 0; }
    output.push(delimiter + createHeading(fileName));
    output.push(getHeadType(inputs)(index, content, findInteger(inputs)||10));
    result.delimiter = "\n";
    return result;
  }
  result.delimiter = "\n";
  output.push('tail: '+fileName+': No such file or directory');
  return result;
};

const tail = function(readFileSync, existsFileSync, inputs, filesList) {
  let delimiter = "";
  let output = [];
  let result = {readFileSync, existsFileSync, inputs, output, delimiter};
  let object = {};
  if (extractError(inputs, 'tail')) {
    return extractError(inputs, 'tail');
  }
  if(filesList.length == 1 && existsFileSync(filesList[0])){
    let content = readFileSync(filesList[0], "utf8");
    object[extractLines] = content.split('\n').length - (findInteger(result.inputs)||10);
    object[extractBytes] = content.length - (findInteger(result.inputs)||10);
    let index = object[getHeadType(inputs)];
    if (index < 0) { index = 0; }
    return getHeadType(inputs)(index, content, findInteger(inputs)||10);
  }
  return filesList.reduce(tailReducer,result)['output'].join('\n');
};

module.exports = { createHeading, extractLines, extractBytes, 
  getHeadType, findInteger, findIllegalVal, extractError, head, tail }; // indent properly 
