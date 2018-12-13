const createHeading = function(fileName) {
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

const getHeadType = function(inputs) {
  let list = inputs.join("");
  if (list.includes("-c")) {
    return "extractBytes";
  }
  return "extractLines";
};

const findInteger = function(input) {
  let index = 0;
  let list = input.join("");
  while (!parseInt(list) && index < input.join().length) {
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

const findIllegalVal = function(input) {
  let list = "abdefghijklmopqrstuvwxyz";
  list = list.split("");
  input = input.join("");
  let result = "";
  if (list.some(x => input.includes(x))) {
    result = input.slice(2);
  }
  return result;
};

const extractError = function(input, type) {
  let object = { head: {extractLines: "line count --", extractBytes: "byte count --" },
    tail: "offset --" };
    let variable = object[type];
    if(type == 'head'){
      variable = object[type][getHeadType(input)]; }
  if (findIllegalVal(input) || findInteger(input) < 1) {
    return (type+": illegal "+variable+" "+(findIllegalVal(input)||findInteger(input)));
  }
};

const headReducer = function(result,fileName){
  const {readFileSync, existsFileSync, inputs, output, delimiter} = result;
  if(existsFileSync(fileName)){
    let content = readFileSync(fileName, "utf8");
    output.push(delimiter + createHeading(fileName));
    output.push(eval(getHeadType(inputs))(0, content, findInteger(inputs) || 10));
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
    return (eval(getHeadType(inputs))(0, content, findInteger(inputs) || 10));
  }
  return filesList.reduce(headReducer,result)['output'].join('\n');
};

const tailReducer = function(result,fileName){
  const {readFileSync, existsFileSync, inputs, output, delimiter} = result;
  if(existsFileSync(fileName)){
    let content = readFileSync(fileName, "utf8");
    let object = {'extractLines':content.split('\n').length - (findInteger(result.inputs)||10),
    'extractBytes':content.length - (findInteger(result.inputs)||10)};
    let index = object[getHeadType(inputs)];
    if (index < 0) { index = 0; }
    output.push(delimiter + createHeading(fileName));
    output.push(eval(getHeadType(inputs))(index, content, findInteger(inputs)||10));
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
  if (extractError(inputs, 'tail')) {
    return extractError(inputs, 'tail');
  }
  if(filesList.length == 1 && existsFileSync(filesList[0])){
    let content = readFileSync(filesList[0], "utf8");
    let object = {'extractLines':content.split('\n').length - (findInteger(result.inputs)||10),
      'extractBytes':content.length - (findInteger(result.inputs)||10)};
    let index = object[getHeadType(inputs)];
    if (index < 0) { index = 0; }
    return (eval(getHeadType(inputs))(index, content, findInteger(inputs)||10));
  }
  return filesList.reduce(tailReducer,result)['output'].join('\n');
};

module.exports = { createHeading, extractLines, extractBytes, 
  getHeadType, findInteger, findIllegalVal, extractError, head, tail }; 
