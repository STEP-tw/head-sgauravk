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
  if(list.includes('-c')){
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

const head = function(readFileSync,existsFileSync,inputs,filesList){
  let delimiter = '';
  checkError(inputs);
  for (let index=0; index<filesList.length; index++){
    if (!existsFileSync(filesList[index])){
      console.log('head:',filesList[index]+': No such file or directory');
      index++;
    }
    if (index == filesList.length){ process.exit();}
    let content = readFileSync(filesList[index], 'utf8');
    if (filesList.length > 1){
      console.log(delimiter + createHeading(filesList[index]));
      delimiter = '\n';
    }
    console.log(getHeadType(inputs)(content,findInteger(inputs)));
  }
};
 
const checkError = function(input){
  if (findInteger(input) == 0 && getHeadType(input) == extractLines){
    console.log('head: illegal line count -- 0');
    process.exit();
  }
  if (findInteger(input) == 0 && getHeadType(input) == extractBytes){
    console.log('head: illegal byte count -- 0');
    process.exit();
  }
};

module.exports = {createHeading, extractLines, extractBytes, getHeadType, findInteger, head};
