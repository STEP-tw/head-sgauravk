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
    if (parseInt(list) == 0){ return 0; }
    list = input.join('');
    index++;
    list = list.slice(index);
  }
  return Math.abs(parseInt(list) || 10);
};

const head = function(fs,inputs,filesList){
  let delimiter = '';
  checkError(inputs);
  for (let file of filesList){
    let content = fs(file, 'utf8');
    if (filesList.length > 1){
      console.log(delimiter + createHeading(file));
      delimiter = '\n';
    }
    console.log(getHeadType(inputs)(content,findInteger(inputs)));
  }
};
 
const checkError = function(input){
  if (findInteger(input) == 0 && getHeadType(input) == extractLines){
    console.log('head: illegal line count -- 0');
  }
  if (findInteger(input) == 0 && getHeadType(input) == extractBytes){
    console.log('head: illegal byte count -- 0');
  }
  return process.exit();
};

module.exports = {createHeading, extractLines, extractBytes, getHeadType, findInteger, head};
