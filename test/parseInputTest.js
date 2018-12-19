const assert = require("assert");

const { parseUserInput } = require("../src/parseInput");

describe("parseUserInput", function() {
  it("it should return input after parsing the user input", function() {
    let expectedOutput = { input: ["-n1"], filesList: ["readme.md"] };
    assert.deepEqual(parseUserInput(["-n1", "readme.md"]), expectedOutput);
  });

  it("shold seperate the input when files is greter then 1", function(){
    let userInput = ['-c','10','readme.md','ABC.js'];
    let expectedOutput = { input: ["-c",'10'], filesList: ["readme.md","ABC.js"] };
    assert.deepEqual(parseUserInput(userInput), expectedOutput);
  });

  it('should return empty array of input when only file names is given', function(){
    let expectedOutput = { input: [], filesList: ["readme.md"] };
    assert.deepEqual(parseUserInput(['readme.md']), expectedOutput);
  });
});
