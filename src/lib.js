const createHead = function(head){
  return '==> ' + head + ' <==';
};

const extrectLines = function(file,lineRequired){
  let result = file.split('\n').slice(0,lineRequired);
  return result.join('\n');
};

const extrectWords = function(file,wordRequired){
  let result = file.split('').slice(0,wordRequired);
  return result.join('');
};

const getHeadType = function(inputs){
  let list = inputs.join('').split('');
  if(list.includes('c')){
    return extrectWords;
  }
  return extrectLines;
};



module.exports = {createHead, extrectLines, extrectWords, getHeadType};
