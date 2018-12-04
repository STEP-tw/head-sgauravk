const createHead = function(head){
  return '==> ' + head + ' <==';
};

const extrectLines = function(file,lineRequired){
  let result = file.split('\n').slice(0,lineRequired);
  return result.join('\n');
};


module.exports = {createHead, extrectLines};
