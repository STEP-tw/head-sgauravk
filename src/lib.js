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

const getOption = function(userArgs) {
  if (userArgs.join("").includes("-c")) {
    return extractBytes;
  }
  return extractLines;
};

const extractCount = function(userArgs) {
  let index = 0;
  let list = userArgs.join(""); //list ??
  while (!parseInt(list) && index < userArgs.join().length) { //complax logic
    if (parseInt(list) == 0) return 0;
    list = userArgs.join("");
    index++;
    list = list.slice(index);
  }
  if (!userArgs.join("").includes("-c") && !userArgs.join("").includes("-n")) {
    return Math.abs(parseInt(list));
  }
  return parseInt(list);
};

const findIllegalVal = function(userArgs){ 
  let list = "abdefghijklmopqrstuvwxyz";
  list = list.split("");
  userArgs = userArgs.join("");
  let result = "";
  if (list.some(x => userArgs.includes(x))) {
    result = userArgs.slice(2);
  }
  return result;
};

const extractError = function(userArgs, option) {
  let output = {head: {}, tail: "offset --"};
  output['head'][extractLines] = "line count --";
  output['head'][extractBytes] =  "byte count --";
  let variable = output[option]; //bad name variable
  if(option == 'head'){
    variable = output['head'][getOption(userArgs)];
  }
  if (findIllegalVal(userArgs) || extractCount(userArgs) < 1) {
    return (option+": illegal "+variable+" "+(findIllegalVal(userArgs)||extractCount(userArgs)));
  }
};

const headReducer = function(result,fileName){
  const {readFileSync, existsFileSync, userArgs, output, delimiter, index} = result;
  if(existsFileSync(fileName)){
    let content = readFileSync(fileName, "utf8");
    output.push(delimiter + createHeading(fileName));  //changing userArgs array
    output.push(getOption(userArgs)(index, content, extractCount(userArgs) || 10));
    result.delimiter = "\n";
    return result;
  }
  result.delimiter = "\n";
  output.push('head: '+fileName+': No such file or directory');
  return result;
};

const head = function(readFileSync, existsFileSync, userArgs, filesList) { 
  let delimiter = "";
  let output = [];
  let result = {readFileSync, existsFileSync, userArgs, output, delimiter};
  result.index = 0;
  if (extractError(userArgs, 'head')) return extractError(userArgs, 'head');
  if(filesList.length == 1 && existsFileSync(filesList[0])){
    let content = readFileSync(filesList[0], "utf8");
    return getOption(userArgs)(0, content, extractCount(userArgs) || 10);
  }
  return filesList.reduce(headReducer,result)['output'].join('\n');
};

const tailReducer = function(result,fileName){//bad fucntion name, duplication bad variable name as well
  const {readFileSync, existsFileSync, userArgs, output, delimiter} = result;
  let object = {};
  if(existsFileSync(fileName)){
    let content = readFileSync(fileName, "utf8");
    object[extractLines] = content.split('\n').length - (extractCount(result.userArgs)||10);
    object[extractBytes] = content.length - (extractCount(result.userArgs)||10);
    let index = object[getOption(userArgs)];
    if (index < 0) { index = 0; }
    output.push(delimiter + createHeading(fileName));
    output.push(getOption(userArgs)(index, content, extractCount(userArgs)||10));
    result.delimiter = "\n";
    return result;
  }
  result.delimiter = "\n";
  output.push('tail: '+fileName+': No such file or directory');
  return result;
};

const tail = function(readFileSync, existsFileSync, userArgs, filesList) {
  let delimiter = "";
  let output = [];
  let result = {readFileSync, existsFileSync, userArgs, output, delimiter};
  let object = {};
  if (extractError(userArgs, 'tail')) return extractError(userArgs, 'tail');
  if(filesList.length == 1 && existsFileSync(filesList[0])){
    let content = readFileSync(filesList[0], "utf8");
    object[extractLines] = content.split('\n').length - (extractCount(result.userArgs)||10);
    object[extractBytes] = content.length - (extractCount(result.userArgs)||10);
    let index = object[getOption(userArgs)];
    if (index < 0) { index = 0; }
    result.index = index;
    return getOption(userArgs)(index, content, extractCount(userArgs)||10);
  }
  return filesList.reduce(tailReducer,result)['output'].join('\n');
};

module.exports = { createHeading, extractLines, extractBytes, 
  getOption, extractCount, findIllegalVal, extractError, head, tail };
