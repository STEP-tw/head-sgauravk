const assert = require('assert');
const {createHeading, extractLines, extractBytes, getHeadType, findInteger} = require('../src/lib.js');

describe('createHeading', function(){

  it('should create a head line using a file name', function(){
    assert.equal(createHeading('lib.js'),'==> lib.js <==');
    assert.equal(createHeading('createHead.js'),'==> createHead.js <==');
  });

  it('should create a head line when file name is empty', function(){
    assert.equal(createHeading(''), '==>  <==');
  });

  it('should create a head line when no file name is given', function(){
    assert.equal(createHeading(), '==> undefined <==');
  });

});


describe('extractLines', function(){

  it('should give the numbers of line we want of a file', function(){
    let input = 'this\nis\na\nsample\nline';
    assert.equal(extractLines(input,1),'this');
    assert.equal(extractLines(input,3),'this\nis\na');
  });

  it('should give the numbers of line when file size is less then user input', function(){
    assert.equal(extractLines('sample\nline',12),'sample\nline');
    assert.equal(extractLines('test\nline',15),'test\nline');
  });

});


describe('extractBytes', function(){

  it('should give the number of bytes we want from a file', function(){
    let input = 'this\nis\na\nsample\nline';
    assert.equal(extractBytes(input,1),'t');
    assert.equal(extractBytes(input,5),'this\n');
  });

  it('should give the number of bytes when file size is less then user input', function(){
    assert.equal(extractBytes('line',5),'line');
    assert.equal(extractBytes('sample\nfile',15),'sample\nfile');
  });

});


describe('getHeadType', function(){

  it('should return the function according to the user input', function(){
    assert.equal(''+getHeadType(['node','head.js','-n5']),''+extractLines);
    assert.equal(''+getHeadType(['node','head.js','-c3','file1']),''+extractBytes);
  });

  it('should return extractLines function when no type is given', function(){
    assert.equal(''+getHeadType(['node','head.js']),''+extractLines);
  });

});


describe('findInteger', function(){

  it('should return the integer from input', function(){
    assert.equal(findInteger(['-n1']),1);
    assert.equal(findInteger(['./head.js','-c5']),5);
  });

  it('should return NaN when input have no integer', function(){
    assert.equal(''+findInteger(['-n','-c']),'NaN');
    assert.equal(''+findInteger(['./head.js','-c']),'NaN');
  });

  it('should return last integer when input have more then one integer', function(){
    assert.equal(findInteger(['-n1','-c2']),2);
    assert.equal(findInteger(['./head.js','8','-c5']),5);
  });

});
