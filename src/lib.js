const createHeading = function(fileName){
  return '==> ' + fileName + ' <==';
};

const extractLines = function(file,linesRequired){
  let result = file.split('\n').slice(0,linesRequired);
  return result.join('\n');
};

const extractBytes = function(file,BytesRequired){
  let result = file.slice(0,BytesRequired);
  return result;
};

const getHeadType = function(inputs){
  let list = inputs.join('');
  if(list.includes('c')){
    return extractBytes;
  }
  return extractLines;
};

const findInteger = function(input){
  let index = 0;
  let list = input.join('');
  while(!parseInt(list) && index < input.join().length){
    list = input.join('');
    index++;
    list = list.slice(index);
  }
  return Math.abs(parseInt(list));
};


module.exports = {createHeading, extractLines, extractBytes, getHeadType, findInteger};
