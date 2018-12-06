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
    return 'extractBytes';
  }
  return 'extractLines';
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
  if(!input.join('').includes('-c') && !input.join('').includes('-n')){
    return Math.abs(parseInt(list));
  }
  return parseInt(list);
};

const findIllegalVal = function(input){
  let list = 'abdefghijklmopqrstuvwxyz';
  list = list.split('');
  input = input.join('');
  let result = '';
  if (list.some(x=>input.includes(x))){
    result = input.slice(2);
  }
  return result;
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
    console.log(eval(getHeadType(inputs))(content,findInteger(inputs) || 10));
  }
};
 
const checkError = function(input){
  let object = {'extractLines':'line count --','extractBytes':'byte count --'};
  if (findInteger(input) < 1){
    console.log('head: illegal',object[getHeadType(input)],findInteger(input));
    process.exit();
  }
  if (findIllegalVal(input)){
    console.log('head: illegal',object[getHeadType(input)],findIllegalVal(input));
    process.exit();
  }
};

module.exports = {createHeading, extractLines, extractBytes, getHeadType, findInteger, head};
