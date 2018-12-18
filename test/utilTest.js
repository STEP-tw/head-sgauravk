const assert = require("assert");

const {
    createHeading,
    extractLines,
    extractBytes,
    getOption,
    extractCount,
  } = require("../src/util.js");


describe("createHeading", function() {
    it("should create a head line using a file name when filesListLength is greter then 1", function() {
      assert.equal(createHeading("lib.js", 2), "==> lib.js <==");
      assert.equal(createHeading("createHead.js", 3), "==> createHead.js <==");
    });
  
    it("should create a head line when file name is empty", function() {
      assert.equal(createHeading("", 5), "==>  <==");
    });
  
    it("should return a empty string when filesListLength is 1", function() {
      assert.equal(createHeading("parseInput.js", 1), "");
    });
  });
  
  describe("extractLines", function() {
    it("should give the numbers of line we want of a file", function() {
      let input = "this\nis\na\nsample\nline";
      assert.equal(extractLines(0, input, 1), "this");
      assert.equal(extractLines(0, input, 3), "this\nis\na");
    });
  
    it("should give the numbers of line when file size is less then user input", function() {
      assert.equal(extractLines(0, "sample\nline", 12), "sample\nline");
      assert.equal(extractLines(0, "test\nline", 15), "test\nline");
    });
  });
  
  describe("extractBytes", function() {
    it("should give the number of bytes we want from a file", function() {
      let input = "this\nis\na\nsample\nline";
      assert.equal(extractBytes(0, input, 1), "t");
      assert.equal(extractBytes(0, input, 5), "this\n");
    });
  
    it("should give the number of bytes when file size is less then user input", function() {
      assert.equal(extractBytes(0, "line", 5), "line");
      assert.equal(extractBytes(0, "sample\nfile", 15), "sample\nfile");
    });
  });
  
  describe("getOption", function() {
    it("should return the function according to the user input", function() {
      assert.equal(getOption(["node", "head.js", "-n5"]), extractLines);
      assert.equal(getOption(["node", "head.js", "-c3", "file1"]), extractBytes);
    });
  
    it("should return extractLines function when no type is given", function() {
      assert.equal(getOption(["node", "head.js"]), extractLines);
    });
  });
  
  describe("extractCount", function() {
    it("should return the integer from input", function() {
      assert.equal(extractCount(["-n1"]), 1);
      assert.equal(extractCount(["./head.js", "-c5"]), 5);
    });
  
    it("should return NaN when input have no integer", function() {
      assert.equal("" + extractCount(["-n", "-c"]), "" + NaN);
      assert.equal("" + extractCount(["./head.js", "-c"]), "" + NaN);
    });
  
    it("should return first integer when input have more then one integer", function() {
      assert.equal(extractCount(["-n1", "-c2"]), 1);
      assert.equal(extractCount(["./head.js", "c", "12"]), 12);
    });
  });