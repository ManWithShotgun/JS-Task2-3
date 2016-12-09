
/**
* Creave new function with cache
* @param {function} func Determition function
* @return {function} Return new function
*/
function memoizer(func){
  var map={}, key;

  return function(){
    key=JSON.stringify(arguments);
    if(!map[key]){
      map[key]=func.apply(this,arguments);
    }
    return map[key];
  };
}
/**
* ???
* @param {object} obj complicated object
* @param {boolean} isBehaviorSeparate if true - return state object ; false - return array behaviors
* @return Return state object or array behaviors
*/
function debehaviorizer(obj,isBehaviorSeparate){
  try{
    var arrBehaviors=[], i=0;
    for(var a in obj){
      arrBehaviors[i]=a;//???
      if(!delete obj[a]){
        throw TypeError('Cannot delete property '+a);
      }
      i++;
    }
    if(isBehaviorSeparate){
      return arrBehaviors;
    }
    return obj;
  }catch(e){
    console.log(e.message);
  }
}

/**
* Parse string (format like ;key,value;methodName,|return true;|;key2,value2;) and return object
* @param {string} str string with format
* @return {object} new object with properties and methods
*/
function semiColonSON(str){
  var obj={}, props;
  /*Replase chars (in |body function|) ';' to '@' and ',' to '&'. Because they intefere parse all text*/
  str=str.replace(/\|(.*?)\|/, function(words){return words.replace(/;/g,'@').replace(/,/g,'&');});
  //console.log(str);
  var arr=str.split(';');
  arr=arr.slice(1,arr.length-1);
  for(var tmp in arr){
    props=arr[tmp].split(',');
    if(props[1].search(/\|/)===-1){//if property
      obj[props[0]]=props[1];
    }else{//if method
      obj[props[0]]=stringToFunction(props[1]);
    }
  }
  return obj;
}
/**
* Parse string and return function
* WARNING: this use constructor Function
* @private
* @param {string} str 'string function' (have arguments and body)
* @return {function}
*/
function stringToFunction(str){
  var tmp;
  /*Restore original chars*/
  str=str.replace(/@/g,';').replace(/&/g,',');
  if(str.search('function')!==-1){//if str like: function(a, b, c){return a+b+c;}
    str=str.replace('@',';');
    var arr=str.match(/\((.*?)\)/);//parameters
    tmp=str.match(/{(.*?)}/);//body function
    var f= new Function(arr[1],tmp[1]);
    return f;
  }else{//if str like: return true;
    return new Function('',str.slice(1,str.length-1));
  }
}

exports.memoizer=memoizer;
exports.debehaviorizer=debehaviorizer;
exports.semiColonSON=semiColonSON;
