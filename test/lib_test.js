const assert = require("assert");

const {
  getIndex,
  getFinalOutput
} = require("../src/lib.js");

describe("getIndex", function () {
  let content = "i\nam\nresponsible\nfor\nmy\nown\nhappiness";

  it('should return the index of tail according to user args and file content length', function () {
    assert.deepEqual(getIndex(['-n5'], content), { head: 0, tail: 2 });
  });

  it('should return the 0 index of tail when file content length is less then count', function () {
    assert.deepEqual(getIndex(['-n1000'], content), { head: 0, tail: 0 });
  });

  it('should return always 0 index for head', function () {
    assert.deepEqual(getIndex(['-n2'], content), { head: 0, tail: 5 });
  });
});

describe("HEAD", function () {
  describe("HEAD: for single file", function () {
    let existsFile = function (file) {
      return [file, randomText].includes(file);
    };

    let readFile = function (file) {
      return file;
    };

    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let randomText = "only\ngreat\nminds\ncan\nafford\na\nsimple\nstyle";

    it("should return the first line of file", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n1"], [file], 'head'), "1");
    });

    it("should return the two lines of file", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n2"], [file], 'head'), "1\n2");
    });

    it("should return the first 10 lines of file when count is not specified", function () {
      assert.equal(getFinalOutput(readFile, existsFile, [], [file], 'head'), file);
    });

    it("should return the given number of lines when only count is given", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-3"], [file], 'head'), "1\n2\n3");
    });

    it("should return the given number of lines when count and option is given without spaces", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n2"], [file], 'head'), "1\n2");
    });

    it("should return the given number of lines when count and option is given with spaces", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n", "1"], [file], 'head'), "1");
    });

    it("should return the given number of characters when count is given with spaces", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-c", "3"], [randomText], 'head'), "onl");
    });

    it("should return the given number of characters when count is given without spaces", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-c7"], [randomText], 'head'), "only\ngr");
    });

    it("should return the whole file when count is greter file size", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n10000"], [file], 'head'), file);
    });
  });

  describe("HEAD: for multiple file", function () {
    let randomText = "only\ngreat\nminds\ncan\nafford\na\nsimple\nstyle";

    let existsFile = function (file) {
      return [file, randomText].includes(file);
    };

    let readFile = function (file) {
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    };

    let readRandomText = function (randomText) {
      return "only\ngreat\nminds\ncan\nafford\na\nsimple\nstyle";
    };

    it("should return the first 10 lines of file when count is not specified", function () {
      let expectedOutput = "==> file <==\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(getFinalOutput(readFile, existsFile, [], ["file", "file"], 'head'), expectedOutput);
    });

    it("should return the given number of lines when only count is given", function () {
      let expectedOutput = "==> file <==\n1\n2\n3";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(getFinalOutput(readFile, existsFile, ["-3"], ["file", "file"], 'head'), expectedOutput);
    });

    it("should return the given number of lines when count and option is given without spaces", function () {
      let expectedOutput = "==> file <==\n1\n2";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(getFinalOutput(readFile, existsFile, ["-n2"], ["file", "file"], 'head'), expectedOutput);
    });

    it("should return the given number of lines when count and option is given with spaces", function () {
      let expectedOutput = "==> file <==\n1\n2\n3";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(getFinalOutput(readFile, existsFile, ["-n", "3"], ["file", "file"], 'head'), expectedOutput);
    });

    it("should return the given number of characters when count is given with spaces", function () {
      let expectedOutput = "==> randomText <==\nonl";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        getFinalOutput(readRandomText, existsFile, ["-c", "3"], ["randomText", "randomText"], 'head'), expectedOutput);
    });

    it("should return the given number of characters when count is given without spaces", function () {
      let expectedOutput = "==> randomText <==\nonly\ngr";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        getFinalOutput(readRandomText, existsFile, ["-c7"], ["randomText", "randomText"], 'head'), expectedOutput);
    });
  });

  describe("HEAD: errors handling", function () {
    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    let existsFile = function (file) {
      return ["file", "randomText"].includes(file);
    };

    let readFile = function (file) {
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    };

    it("should return the error message when given number of line is 0", function () {
      let expectedOutput = "head: illegal line count -- 0";
      assert.equal(getFinalOutput(readFile, existsFile, ["-n0"], [file], 'head'), expectedOutput);
    });

    it("should return the error message when  is count is 0 without -c or -n", function () {
      let expectedOutput = "head: illegal line count -- 0";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-0"], ["file", "randomText"], 'head'), expectedOutput);
    });

    it("should return the error message when  is count is invalid with -c or -n", function () {
      let expectedOutput = "head: illegal line count -- -12";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n-12"], ["file", "randomText"], 'head'), expectedOutput);
    });

    it("should return the error message when  file is not present in the directory", function () {
      let expectedOutput =
        "head: README.mdafs: No such file or directory\n\n==> file <==\n1\n2\n3";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n3"], ["README.mdafs", "file"], 'head'), expectedOutput);
    });

    it("should return the error message when given file is not present in directory", function () {
      let expectedOutput = "head: README.mdafs: No such file or directory";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n3"], ["README.mdafs"], 'head'), expectedOutput);
    });

    it("should return the whole file when count is greter file size and other is not in the directory", function () {
      let expectedOutput =
        "head: randomName: No such file or directory\n\n==> file <==\n" + file;
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n10000"], ["randomName", "file"], 'head'), expectedOutput);
    });

    it("should return the error message when -n or -c and then alphanumeric combination is given", function () {
      let expectedOutput = "head: illegal line count -- u922";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-nu922"], ["README.mdafs", "file"], 'head'), expectedOutput);
      expectedOutput = "head: illegal byte count -- u922";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-cu922"], ["README.mdafs", "randomText"], 'head'), expectedOutput);
    });
  });
});

describe("TAIL", function () {
  describe("TAIL: for single file", function () {
    let existsFile = function (file) {
      return [file, randomText].includes(file);
    };

    let readFile = function (file) {
      return file;
    };

    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let randomText = "only\ngreat\nminds\ncan\nafford\na\nsimple\nstyle";

    it("should return the first line of file", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n1"], [file], 'tail'), "10");
    });

    it("should return the two lines of file", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n2"], [file], 'tail'), "9\n10");
    });

    it("should return the first 10 lines of file when count is not specified", function () {
      assert.equal(getFinalOutput(readFile, existsFile, [], [file], 'tail'), file);
    });

    it("should return the given number of lines when only count is given", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-3"], [file], 'tail'), "8\n9\n10");
    });

    it("should return the given number of lines when count and option is given without spaces", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n2"], [file], 'tail'), "9\n10");
    });

    it("should return the given number of lines when count and option is given with spaces", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n", "1"], [file], 'tail'), "10");
    });

    it("should return the given number of characters when count is given with spaces", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-c", "3"], [randomText], 'tail'), "yle");
    });

    it("should return the given number of characters when count is given without spaces", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-c7"], [randomText], 'tail'), "e\nstyle");
    });

    it("should return the whole file when count is greter file size", function () {
      assert.equal(getFinalOutput(readFile, existsFile, ["-n10000"], [file], 'tail'), file);
    });
  });

  describe("TAIL: for multiple file", function () {
    let randomText = "only\ngreat\nminds\ncan\nafford\na\nsimple\nstyle";

    let existsFile = function (file) {
      return [file, randomText].includes(file);
    };

    let readFile = function (file) {
      return "10\n9\n8\n7\n6\n5\n4\n3\n2\n1";
    };

    let readRandomText = function (randomText) {
      return "only\ngreat\nminds\ncan\nafford\na\nsimple\nstyle";
    };

    it("should return the first 10 lines of file when count is not specified", function () {
      let expectedOutput = "==> file <==\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        getFinalOutput(readFile, existsFile, [], ["file", "file"], 'tail'), expectedOutput);
    });

    it("should return the given number of lines when only count is given", function () {
      let expectedOutput = "==> file <==\n3\n2\n1";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-3"], ["file", "file"], 'tail'), expectedOutput);
    });

    it("should return the given number of lines when count and option is given without spaces", function () {
      let expectedOutput = "==> file <==\n2\n1";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n2"], ["file", "file"], 'tail'), expectedOutput);
    });

    it("should return the given number of lines when count and option is given with spaces", function () {
      let expectedOutput = "==> file <==\n3\n2\n1";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n", "3"], ["file", "file"], 'tail'), expectedOutput);
    });

    it("should return the given number of characters when count is given with spaces", function () {
      let expectedOutput = "==> randomText <==\nyle";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        getFinalOutput(readRandomText, existsFile, ["-c", "3"], ["randomText", "randomText"], 'tail'), expectedOutput);
    });

    it("should return the given number of characters when count is given without spaces", function () {
      let expectedOutput = "==> randomText <==\ne\nstyle";
      expectedOutput += "\n\n" + expectedOutput;
      assert.equal(
        getFinalOutput(readRandomText, existsFile, ["-c7"], ["randomText", "randomText"], 'tail'), expectedOutput);
    });
  });

  describe("TAIL: errors handling", function () {
    let file = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    let existsFile = function (file) {
      return ["file", "randomText"].includes(file);
    };

    let readFile = function (file) {
      return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    };

    let readRandomText = function (randomText) {
      return "only\ngreat\nminds\ncan\nafford\na\nsimple\nstyle";
    };

    it("should return the error message when given number of line is 0", function () {
      let expectedOutput = "tail: illegal offset -- 0";
      assert.equal(getFinalOutput(readFile, existsFile, ["-n0"], [file], 'tail'), expectedOutput);
    });

    it("should return the error message when  is count is 0 without -c or -n", function () {
      let expectedOutput = "tail: illegal offset -- 0";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-0"], ["file", "randomText"], 'tail'), expectedOutput);
    });

    it("should return the error message when  is count is invalid with -c or -n", function () {
      let expectedOutput = "tail: illegal offset -- -12";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n-12"], ["file", "randomText"], 'tail'), expectedOutput);
    });

    it("should return the error message when  file is not present in the directory", function () {
      let expectedOutput =
        "tail: README.mdafs: No such file or directory\n\n==> file <==\n8\n9\n10";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n3"], ["README.mdafs", "file"], 'tail'), expectedOutput);
    });

    it("should return the error message when given file is not present in directory", function () {
      let expectedOutput = "tail: README.mdafs: No such file or directory";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n3"], ["README.mdafs"], 'tail'), expectedOutput);
    });

    it("should return the whole file when count is greter file size and other is invalid", function () {
      let expectedOutput =
        "tail: README.mdsn: No such file or directory\n\n==> file <==\n" + file;
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-n10000"], ["README.mdsn", "file"], 'tail'), expectedOutput);
    });

    it("should return the error message when -n or -c and then alphanumeric combination is given", function () {
      let expectedOutput = "tail: illegal offset -- u922";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-nu922"], ["README.mdafs", "file"], 'tail'), expectedOutput);
      expectedOutput = "tail: illegal offset -- u922";
      assert.equal(
        getFinalOutput(readFile, existsFile, ["-cu922"], ["README.mdafs", "randomText"], 'tail'), expectedOutput);
    });
  });
});