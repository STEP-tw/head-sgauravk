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

module.exports = {
  createHeading,
  extractLines,
  extractBytes,
  getOption,
  extractCount
};
