const createHeading = function(fileName, filesListLength){
  if(filesListLength > 1) return "==> " + fileName + " <==";
  return '';
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
  const {readFileSync, existsFileSync, userArgs, output, delimiter, filesListLength} = result;
  if(existsFileSync(fileName)){
    let content = readFileSync(fileName, "utf8");
    let heading = delimiter + createHeading(fileName, filesListLength);
    heading && output.push(heading);
    output.push(getOption(userArgs)(0, content, extractCount(userArgs) || 10));
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
  result.filesListLength = filesList.length;
  if (extractError(userArgs, 'head')) return extractError(userArgs, 'head');
  return filesList.reduce(headReducer,result)['output'].join('\n');
};

const getIndex = function(userArgs, fileContent){
  let result = {head: 0}
  let sampleObject = {};
  sampleObject[extractLines] = fileContent.split('\n').length - (extractCount(userArgs)||10);
  sampleObject[extractBytes] = fileContent.length - (extractCount(userArgs)||10);
  result.tail = sampleObject[getOption(userArgs)];
  if (result.tail < 0) { result.tail = 0; };
  return result;
};

const tailReducer = function(result,fileName){
  const {readFileSync, existsFileSync, userArgs, output, delimiter, filesListLength} = result;
  let object = {};
  if(existsFileSync(fileName)){
    let content = readFileSync(fileName, "utf8");
    let index = getIndex(userArgs, content).tail;
    let heading = createHeading(fileName,filesListLength);
    heading && output.push(delimiter + heading);
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
  result.filesListLength = filesList.length;
  if (extractError(userArgs, 'tail')) return extractError(userArgs, 'tail');
  return filesList.reduce(tailReducer,result)['output'].join('\n');
};

module.exports = { createHeading, extractLines, extractBytes, 
  getOption, extractCount, findIllegalVal, extractError, head, tail };
