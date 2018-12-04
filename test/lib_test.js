const assert = require('assert');
const {createHeading, extractLines, extractBytes, findInteger} = require('../src/lib.js');

describe('createHeading', function(){
  it('should create a head line using a file name', function(){
    assert.equal(createHeading('lib.js'),'==> lib.js <==');
    assert.equal(createHeading('createHead.js'),'==> createHead.js <==');
  });
});

describe('extractLines', function(){
  it('should give the numbers of line we want of a file', function(){
    let input = 'this\nis\na\nsample\nline';
    assert.equal(extractLines(input,1),'this');
    assert.equal(extractLines(input,3),'this\nis\na');
  });
});

describe('extractBytes', function(){
  it('should give the number of bytes we want from a file', function(){
    let input = 'this\nis\na\nsample\nline';
    assert.equal(extractBytes(input,1),'t');
    assert.equal(extractBytes(input,5),'this\n');
  });
});

describe('findInteger', function(){
  it('should return the integer from input', function(){
    assert.equal(findInteger(['-n1']),1);
    assert.equal(findInteger(['./head.js','-c5']),5);
  });
});
