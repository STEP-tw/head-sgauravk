const createHeading = function(head){
  return '==> ' + head + ' <==';
};

const extractLines = function(file,lineRequired){
  let result = file.split('\n').slice(0,lineRequired);
  return result.join('\n');
};

const extractBytes = function(file,wordRequired){
  let result = file.split('').slice(0,wordRequired);
  return result.join('');
};

const getHeadType = function(inputs){
  let list = inputs.join('').split('');
  if(list.includes('c')){
    return extractBytes;
  }
  return extractLines;
};

const findInteger = function(input){
  let list = input.join('').split('');
  return parseInt(list.reverse());
};

module.exports = {createHeading, extractLines, extractBytes, getHeadType, findInteger};
