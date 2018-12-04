const assert = require('assert');
const {createHead, extractLines, extractWords, findInteger} = require('../src/lib.js');

describe('createHead', function(){
  it('shold create a head line above a file content', function(){
    assert.equal(createHead('lib.js'),'==> lib.js <==');
    assert.equal(createHead('createHead.js'),'==> createHead.js <==');
  });
});

describe('extractLines', function(){
  it('should give the numbers of line we want of a file', function(){
    let input = 'this\nis\na\nsample\nline';
    assert.equal(extractLines(input,1),'this');
    assert.equal(extractLines(input,3),'this\nis\na');
  });
});

describe('extractWords', function(){
  it('should give the numbers of words we want from a file', function(){
    let input = 'this\nis\na\nsample\nline';
    assert.equal(extractWords(input,1),'t');
    assert.equal(extractWords(input,5),'this\n');
  });
});

describe('findInteger', function(){
  it('should return the integer from input', function(){
    assert.equal(findInteger(['-n1']),1);
    assert.equal(findInteger(['./head.js','-c5']),5);
  });
});

