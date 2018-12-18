const assert = require("assert");

const {
    extractIllegalCount,
    extractError
   } = require("../src/errorLib.js");
  

describe("extractIllegalCount", function() {
    it("should return a empty string when no illegal count is given", function() {
      assert.equal(extractIllegalCount(["-n1"]), "");
      assert.equal(extractIllegalCount(["-n", "5"]), "");
    });
  
    it("should return the illegal value present in the input", function() {
      assert.equal(extractIllegalCount(["-nr"]), "r");
      assert.equal(extractIllegalCount(["-n", "r1"]), "r1");
      assert.equal(extractIllegalCount(["-n", "-1r"]), "-1r");
    });
  });
  
  describe("extractError", function() {
    it("should return the undefined when no error present in input", function() {
      assert.equal(extractError(["-n1"], "head"), undefined);
      assert.equal(extractError(["-n", "5"], "head"), undefined);
    });
  
    it("should return the error message when we pass 0 in input", function() {
      let expectedOutput = "head: illegal line count -- 0";
      assert.equal(extractError(["-n0"], "head"), expectedOutput);
    });
  
    it("should return the error message when a negative integer is passed in input", function() {
      let expectedOutput = "head: illegal byte count -- -3";
      assert.equal(extractError(["-c", "-3"], "head"), expectedOutput);
      assert.equal(extractError(["-c-3"], "head"), expectedOutput);
    });
  
    it("should return the error message when illegal charecter is present in input", function() {
      let expectedOutput = "head: illegal line count -- 1r";
      assert.equal(extractError(["-n1r"], "head"), expectedOutput);
    });
  });
  