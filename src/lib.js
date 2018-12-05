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
  return Math.abs(parseInt(list)) || 10;
};

const head = function(fs,inputs,filesList){
  let delimiter = '';
  for (let file of filesList){
    let content = fs.readFileSync(file, 'utf8');
    if (filesList.length > 1){
      console.log(delimiter + createHeading(file));
      delimiter = '\n';
    }
    console.log(getHeadType(inputs)(content,findInteger(inputs)));
  }
};

module.exports = {createHeading, extractLines, extractBytes, getHeadType, findInteger, head};
