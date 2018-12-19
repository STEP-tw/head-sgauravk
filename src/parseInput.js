const parseUserInput = function(userInput) {
  let result = {};
  result.filesList = userInput.filter(file => !file.startsWith("-") && !file.match(/^\d/));
  result.input = userInput.slice(0, userInput.length - result.filesList.length);
  return result;
};

module.exports = { parseUserInput };
