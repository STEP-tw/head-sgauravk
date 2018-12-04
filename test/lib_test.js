const assert = require('assert');
const {createHead} = require('../src/lib.js');

describe('createHead', function(){
  it('shold create a head line above a file content', function(){
    assert.equal(createHead('lib.js'),'==> lib.js <==');
    assert.equal(createHead('createHead.js'),'==> createHead.js <==');
  });
});

