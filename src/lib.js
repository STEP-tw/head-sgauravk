const createHeading = function(fileName, filesListLength) {
  if (filesListLength > 1) return "==> " + fileName + " <==";
  return "";
};

const extractLines = function(index, file, linesRequired) {
  let result = file.split("\n").splice(index, linesRequired);
  return result.join("\n");
};

const extractBytes = function(index, file, BytesRequired) {
  let result = file.slice(index, index + BytesRequired);
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
  let list = userArgs.join("");
  while (!parseInt(list) && index < userArgs.join().length) {
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

const extractIllegalCount = function(userArgs) {
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
  let output = { head: {}, tail: "offset --" };
  output["head"][extractLines] = "line count --";
  output["head"][extractBytes] = "byte count --";
  let variable = output[option];
  if (option == "head") variable = output["head"][getOption(userArgs)];
  if (extractIllegalCount(userArgs) || extractCount(userArgs) < 1)
    return (option + ": illegal " + variable + " " +
      (extractIllegalCount(userArgs) || extractCount(userArgs)));
};

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

const getContent = function(readFileSync, existsFileSync, userArgs, filesList, type) {
  let delimiter = "";
  let output = [];
  let result = { readFileSync, existsFileSync, userArgs, output, delimiter };
  result.filesListLength = filesList.length;
  result.type = type;
  if (extractError(userArgs, type)) return extractError(userArgs, type);
  return filesList.reduce(reducer, result)["output"].join("\n");
};

module.exports = {
  createHeading,
  extractLines,
  extractBytes,
  getOption,
  extractCount,
  extractIllegalCount,
  extractError,
  getContent
};