const createHeading = function(head){
  return '==> ' + head + ' <==';
};

const extractLines = function(file,lineRequired){
  let result = file.split('\n').slice(0,lineRequired);
  return result.join('\n');
};

const extractBytes = function(file,wordRequired){
  let result = file.slice(0,wordRequired);
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
    list = list.slice(index)
  }
  return Math.abs(parseInt(list));
};


module.exports = {createHeading, extractLines, extractBytes, getHeadType, findInteger};
