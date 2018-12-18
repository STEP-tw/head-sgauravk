const { createHeading, extractLines,
  extractBytes, getOption, extractCount
} = require('./util.js');

const {extractIllegalCount,
   extractError
  } = require("./errorLib.js");

const getIndex = function(userArgs, fileContent) {
  let result = { head: 0 };
  let sampleObject = {};
  sampleObject[extractLines] =
    fileContent.split("\n").length - (extractCount(userArgs) || 10);
  sampleObject[extractBytes] =
    fileContent.length - (extractCount(userArgs) || 10);
  result.tail = sampleObject[getOption(userArgs)];
  if (result.tail < 0) result.tail = 0;
  return result;
};

const reducer = function(result, fileName) {
  if (result.existsFileSync(fileName)) {
    let content = result.readFileSync(fileName, "utf8");
    let index = getIndex(result.userArgs, content)[result.type];
    let heading = createHeading(fileName, result.filesListLength);
    heading && result.output.push(result.delimiter + heading);
    result.output.push(getOption(result.userArgs)(index,content,
      extractCount(result.userArgs) || 10));
    result.delimiter = "\n";
    return result;
  }
  result.delimiter = "\n";
  result.output.push(
    result.type + ": " + fileName + ": No such file or directory");
  return result;
};

const getFinalOutput = function(readFileSync, existsFileSync, userArgs, filesList, type) {
  let delimiter = "";
  let output = [];
  let result = { readFileSync, existsFileSync, userArgs, output, delimiter };
  result.filesListLength = filesList.length;
  result.type = type;
  if (extractError(userArgs, type)) return extractError(userArgs, type);
  return filesList.reduce(reducer, result)["output"].join("\n");
};

module.exports = {
  getFinalOutput
};
