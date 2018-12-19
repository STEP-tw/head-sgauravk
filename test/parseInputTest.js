const assert = require('assert');

const { parseUserInput } = require('../src/parseInput');

describe('parseUserInput', function () {
    it('it should return input after parsing the user input', function () {
        let expectedOutput = {input:['-n1'], filesList:['readme.md']};
        assert.deepEqual(parseUserInput(['-n1','readme.md']), expectedOutput);
    });
});