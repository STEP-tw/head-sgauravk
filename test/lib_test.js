const assert = require("assert");
const {
  createHeading,
  extractLines,
  extractBytes,
  getOption,
  extractCount,
  extractIllegalCount,
  extractError,
  head,
  tail
} = require("../src/lib.js");

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

describe("HEAD", function(){
  describe("HEAD: for single file", function() {
    let existsFile = function(file) {
      return [file, randomText].includes(file);
    };

    let readFile = function(file) {
      return file;
    };

    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let randomText = "gaurav\nis\na\ngood\nboy";

    it("should return the first line of file", function() {
      assert.equal(head(readFile, existsFile, ["-n1"], [file]), "1");
    });

    it("should return the two lines of file", function() {
      assert.equal(head(readFile, existsFile, ["-n2"], [file]), "1\n2");
    });

    it("should return the first 10 lines of file when count is not specified", function() {
      assert.equal(head(readFile, existsFile, [], [file]), file);
    });

    it("should return the given number of lines when only count is given", function() {
      assert.equal(head(readFile, existsFile, ["-3"], [file]), "1\n2\n3");
    });

    it("should return the given number of lines when count and option is given without spaces", function() {
      assert.equal(head(readFile, existsFile, ["-n2"], [file]), "1\n2");
    });

    it("should return the given number of lines when count and option is given with spaces", function() {
      assert.equal(head(readFile, existsFile, ["-n", "1"], [file]), "1");
    });

    it("should return the given number of characters when count is given with spaces", function() {
      assert.equal(head(readFile, existsFile, ["-c", "3"], [randomText]), "gau");
    });

    it("should return the given number of characters when count is given without spaces", function() {
      assert.equal(head(readFile, existsFile, ["-c7"], [randomText]), "gaurav\n");
    });

    it("should return the whole file when count is greter file size", function() {
      assert.equal(head(readFile, existsFile, ["-n10000"], [file]), file);
    });
  });

  describe("HEAD: for multiple file", function() {
    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let randomText = "gaurav\nis\na\ngood\nboy";

    let existsFile = function(file) {
      return [file, randomText].includes(file);
    };

    let readFile = function(file) {
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    };

    let readRandomText = function(randomText) {
      return "gaurav\nis\na\ngood\nboy";
    };

    it("should return the first 10 lines of file when count is not specified", function() {
      let expectedOutput = "==> file <==\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(head(readFile, existsFile, [], ["file", "file"]),expectedOutput);
    });

    it("should return the given number of lines when only count is given", function() {
      let expectedOutput = "==> file <==\n1\n2\n3";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(head(readFile, existsFile, ["-3"], ["file", "file"]),expectedOutput);
    });

    it("should return the given number of lines when count and option is given without spaces", function() {
      let expectedOutput = "==> file <==\n1\n2";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(head(readFile, existsFile, ["-n2"], ["file", "file"]),expectedOutput);
    });

    it("should return the given number of lines when count and option is given with spaces", function() {
      let expectedOutput = "==> file <==\n1\n2\n3";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(head(readFile, existsFile, ["-n", "3"], ["file", "file"]),expectedOutput);
    });

    it("should return the given number of characters when count is given with spaces", function() {
      let expectedOutput = "==> randomText <==\ngau";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        head(readRandomText,existsFile,["-c", "3"],["randomText", "randomText"]),expectedOutput);
    });

    it("should return the given number of characters when count is given without spaces", function() {
      let expectedOutput = "==> randomText <==\ngaurav\n";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        head(readRandomText, existsFile, ["-c7"], ["randomText", "randomText"]),expectedOutput);
    });
  });

  describe("HEAD: errors handling", function() {
    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let randomText = "gaurav\nis\na\ngood\nboy";

    let existsFile = function(file) {
      return ["file", "randomText"].includes(file);
    };

    let readFile = function(file) {
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    };

    let readRandomText = function(randomText) {
      return "gaurav\nis\na\ngood\nboy";
    };

    it("should return the error message when given number of line is 0", function() {
      let expectedOutput = "head: illegal line count -- 0";
      assert.equal(head(readFile, existsFile, ["-n0"], [file]), expectedOutput);
    });

    it("should return the error message when  is count is 0 without -c or -n", function() {
      let expectedOutput = "head: illegal line count -- 0";
      assert.equal(
        head(readFile, existsFile, ["-0"], ["file", "randomText"]),expectedOutput);
    });

    it("should return the error message when  is count is invalid with -c or -n", function() {
      let expectedOutput = "head: illegal line count -- -12";
      assert.equal(
        head(readFile, existsFile, ["-n-12"], ["file", "randomText"]),expectedOutput);
    });

    it("should return the error message when  file is not present in the directory", function() {
      let expectedOutput =
        "head: README.mdafs: No such file or directory\n\n==> file <==\n1\n2\n3";
      assert.equal(
        head(readFile, existsFile, ["-n3"], ["README.mdafs", "file"]),expectedOutput);
    });

    it("should return the error message when given file is not present in directory", function() {
      let expectedOutput = "head: README.mdafs: No such file or directory";
      assert.equal(
        head(readFile, existsFile, ["-n3"], ["README.mdafs"]),expectedOutput);
    });

    it("should return the whole file when count is greter file size and other is not in the directory", function() {
      let expectedOutput =
        "head: randomName: No such file or directory\n\n==> file <==\n" + file;
      assert.equal(
        head(readFile, existsFile, ["-n10000"], ["randomName", "file"]),expectedOutput);
    });

    it("should return the error message when -n or -c and then alphanumeric combination is given", function() {
      let expectedOutput = "head: illegal line count -- u922";
      assert.equal(
        head(readFile, existsFile, ["-nu922"], ["README.mdafs", "file"]),expectedOutput);
      expectedOutput = "head: illegal byte count -- u922";
      assert.equal(
        head(readFile, existsFile, ["-cu922"], ["README.mdafs", "randomText"]),expectedOutput);
    });
  });
});

describe("TAIL", function(){
  describe("TAIL: for single file", function() {
    let existsFile = function(file) {
      return [file, randomText].includes(file);
    };

    let readFile = function(file) {
      return file;
    };

    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let randomText = "gaurav\nis\na\ngood\nboy";

    it("should return the first line of file", function() {
      assert.equal(tail(readFile, existsFile, ["-n1"], [file]), "10");
    });

    it("should return the two lines of file", function() {
      assert.equal(tail(readFile, existsFile, ["-n2"], [file]), "9\n10");
    });

    it("should return the first 10 lines of file when count is not specified", function() {
      assert.equal(tail(readFile, existsFile, [], [file]), file);
    });

    it("should return the given number of lines when only count is given", function() {
      assert.equal(tail(readFile, existsFile, ["-3"], [file]), "8\n9\n10");
    });

    it("should return the given number of lines when count and option is given without spaces", function() {
      assert.equal(tail(readFile, existsFile, ["-n2"], [file]), "9\n10");
    });

    it("should return the given number of lines when count and option is given with spaces", function() {
      assert.equal(tail(readFile, existsFile, ["-n", "1"], [file]), "10");
    });

    it("should return the given number of characters when count is given with spaces", function() {
      assert.equal(tail(readFile, existsFile, ["-c", "3"], [randomText]), "boy");
    });

    it("should return the given number of characters when count is given without spaces", function() {
      assert.equal(tail(readFile, existsFile, ["-c7"], [randomText]), "ood\nboy");
    });

    it("should return the whole file when count is greter file size", function() {
      assert.equal(tail(readFile, existsFile, ["-n10000"], [file]), file);
    });
  });

  describe("TAIL: for multiple file", function() {
    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let randomText = "gaurav\nis\na\ngood\nboy";

    let existsFile = function(file) {
      return [file, randomText].includes(file);
    };

    let readFile = function(file) {
      return "10\n9\n8\n7\n6\n5\n4\n3\n2\n1";
    };

    let readRandomText = function(randomText) {
      return "gaurav\nis\na\ngood\nboy";
    };

    it("should return the first 10 lines of file when count is not specified", function() {
      let expectedOutput = "==> file <==\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        tail(readFile, existsFile, [], ["file", "file"]),expectedOutput);
    });

    it("should return the given number of lines when only count is given", function() {
      let expectedOutput = "==> file <==\n3\n2\n1";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        tail(readFile, existsFile, ["-3"], ["file", "file"]),expectedOutput);
    });

    it("should return the given number of lines when count and option is given without spaces", function() {
      let expectedOutput = "==> file <==\n2\n1";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        tail(readFile, existsFile, ["-n2"], ["file", "file"]),expectedOutput);
    });

    it("should return the given number of lines when count and option is given with spaces", function() {
      let expectedOutput = "==> file <==\n3\n2\n1";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        tail(readFile, existsFile, ["-n", "3"], ["file", "file"]),expectedOutput);
    });

    it("should return the given number of characters when count is given with spaces", function() {
      let expectedOutput = "==> randomText <==\nboy";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        tail(readRandomText,existsFile,["-c", "3"],["randomText", "randomText"]),expectedOutput);
    });

    it("should return the given number of characters when count is given without spaces", function() {
      let expectedOutput = "==> randomText <==\nood\nboy";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        tail(readRandomText, existsFile, ["-c7"], ["randomText", "randomText"]),expectedOutput);
    });
  });

  describe("TAIL: errors handling", function() {
    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let randomText = "gaurav\nis\na\ngood\nboy";

    let existsFile = function(file) {
      return ["file", "randomText"].includes(file);
    };

    let readFile = function(file) {
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    };

    let readRandomText = function(randomText) {
      return "gaurav\nis\na\ngood\nboy";
    };

    it("should return the error message when given number of line is 0", function() {
      let expectedOutput = "tail: illegal offset -- 0";
      assert.equal(tail(readFile, existsFile, ["-n0"], [file]), expectedOutput);
    });

    it("should return the error message when  is count is 0 without -c or -n", function() {
      let expectedOutput = "tail: illegal offset -- 0";
      assert.equal(
        tail(readFile, existsFile, ["-0"], ["file", "randomText"]),expectedOutput);
    });

    it("should return the error message when  is count is invalid with -c or -n", function() {
      let expectedOutput = "tail: illegal offset -- -12";
      assert.equal(
        tail(readFile, existsFile, ["-n-12"], ["file", "randomText"]),expectedOutput);
    });

    it("should return the error message when  file is not present in the directory", function() {
      let expectedOutput =
        "tail: README.mdafs: No such file or directory\n\n==> file <==\n8\n9\n10";
      assert.equal(
        tail(readFile, existsFile, ["-n3"], ["README.mdafs", "file"]),expectedOutput);
    });

    it("should return the error message when given file is not present in directory", function() {
      let expectedOutput = "tail: README.mdafs: No such file or directory";
      assert.equal(
        tail(readFile, existsFile, ["-n3"], ["README.mdafs"]),expectedOutput);
    });

    it("should return the whole file when count is greter file size and other is invalid", function() {
      let expectedOutput =
        "tail: README.mdsn: No such file or directory\n\n==> file <==\n" + file;
      assert.equal(
        tail(readFile, existsFile, ["-n10000"], ["README.mdsn", "file"]),expectedOutput);
    });

    it("should return the error message when -n or -c and then alphanumeric combination is given", function() {
      let expectedOutput = "tail: illegal offset -- u922";
      assert.equal(
        tail(readFile, existsFile, ["-nu922"], ["README.mdafs", "file"]),expectedOutput);
      expectedOutput = "tail: illegal offset -- u922";
      assert.equal(
        tail(readFile, existsFile, ["-cu922"], ["README.mdafs", "randomText"]),expectedOutput);
    });
  });
});
