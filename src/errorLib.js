const { 
  getOption,
extractLines,
extractBytes,
extractCount
} = require("./util.js");

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
  
module.exports = {extractIllegalCount, extractError};  