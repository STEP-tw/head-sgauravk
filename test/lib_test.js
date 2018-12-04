const assert = require('assert');
const {createHead, extrectLines} = require('../src/lib.js');

describe('createHead', function(){
  it('shold create a head line above a file content', function(){
    assert.equal(createHead('lib.js'),'==> lib.js <==');
    assert.equal(createHead('createHead.js'),'==> createHead.js <==');
  });
});

describe('extrectLines', function(){
  it('should give the numbers of line we want of a file', function(){
    let input = 'this\nis\na\nsample\nline'
    assert.equal(extrectLines(input,1),'this');
    assert.equal(extrectLines(input,3),'this\nis\na');
  });
});

