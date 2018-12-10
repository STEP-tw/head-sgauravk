const assert = require("assert");
const {
  createHeading,
  extractLines,
  extractBytes,
  getHeadType,
  findInteger,
  findIllegalVal,
  extractError
} = require("../src/lib.js");

describe("createHeading", function() {
  it("should create a head line using a file name", function() {
    assert.equal(createHeading("lib.js"), "==> lib.js <==");
    assert.equal(createHeading("createHead.js"), "==> createHead.js <==");
  });

  it("should create a head line when file name is empty", function() {
    assert.equal(createHeading(""), "==>  <==");
  });

  it("should create a head line when no file name is given", function() {
    assert.equal(createHeading(), "==> undefined <==");
  });
});

describe("extractLines", function() {
  it("should give the numbers of line we want of a file", function() {
    let input = "this\nis\na\nsample\nline";
    assert.equal(extractLines(0,input, 1), "this");
    assert.equal(extractLines(0,input, 3), "this\nis\na");
  });

  it("should give the numbers of line when file size is less then user input", function() {
    assert.equal(extractLines(0,"sample\nline", 12), "sample\nline");
    assert.equal(extractLines(0,"test\nline", 15), "test\nline");
  });
});

describe("extractBytes", function() {
  it("should give the number of bytes we want from a file", function() {
    let input = "this\nis\na\nsample\nline";
    assert.equal(extractBytes(0,input, 1), "t");
    assert.equal(extractBytes(0,input, 5), "this\n");
  });

  it("should give the number of bytes when file size is less then user input", function() {
    assert.equal(extractBytes(0,"line", 5), "line");
    assert.equal(extractBytes(0,"sample\nfile", 15), "sample\nfile");
  });
});

describe("getHeadType", function() {
  it("should return the function according to the user input", function() {
    assert.equal(getHeadType(["node", "head.js", "-n5"]), "extractLines");
    assert.equal(
      getHeadType(["node", "head.js", "-c3", "file1"]),
      "extractBytes"
    );
  });

  it("should return extractLines function when no type is given", function() {
    assert.equal(getHeadType(["node", "head.js"]), "extractLines");
  });
});

describe("findInteger", function() {
  it("should return the integer from input", function() {
    assert.equal(findInteger(["-n1"]), 1);
    assert.equal(findInteger(["./head.js", "-c5"]), 5);
  });

  it("should return NaN when input have no integer", function() {
    assert.equal("" + findInteger(["-n", "-c"]), "" + NaN);
    assert.equal("" + findInteger(["./head.js", "-c"]), "" + NaN);
  });

  it("should return first integer when input have more then one integer", function() {
    assert.equal(findInteger(["-n1", "-c2"]), 1);
    assert.equal(findInteger(["./head.js", "c", "12"]), 12);
  });
});

describe("findIllegalVal", function() {
  it("should return a empty string when no illegal count is given", function() {
    assert.equal(findIllegalVal(["-n1"]), "");
    assert.equal(findIllegalVal(["-n", "5"]), "");
  });

  it("should return the illegal value present in the input", function() {
    assert.equal(findIllegalVal(["-nr"]), "r");
    assert.equal(findIllegalVal(["-n", "r1"]), "r1");
    assert.equal(findIllegalVal(["-n", "-1r"]), "-1r");
  });
});

describe("extractError", function() {
  it("should return the undefined when no error present in input", function() {
    assert.equal(extractError(["-n1"]), undefined);
    assert.equal(extractError(["-n", "5"]), undefined);
  });

  it("should return the error message when we pass 0 in input", function() {
    let expectedOutput = "head: illegal line count -- 0";
    assert.equal(extractError(["-n0"]), expectedOutput);
  });

  it("should return the error message when a negative integer is passed in input", function() {
    let expectedOutput = "head: illegal byte count -- -3";
    assert.equal(extractError(["-c", "-3"]), expectedOutput);
    assert.equal(extractError(["-c-3"]), expectedOutput);
  });

  it("should return the error message when illegal charecter is present in input", function() {
    let expectedOutput = "head: illegal line count -- 1r";
    assert.equal(extractError(["-n1r"]), expectedOutput);
  });

});
