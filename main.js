function any(a,b){
  console.log('calc Any');
  return (a+b);
}
function factorial(n){
  console.log('calc factorial');
  if(n===1){
    return 1;
  }
  return n*factorial(n-1);
}

var STKit=require('./task2-3.js');
/*test memoizer*/
var a=STKit.memoizer(any);
a(2,3);
a(8,8);
a(2,3);
var f=STKit.memoizer(factorial);
console.log(f(3));
console.log(f(4));
console.log(f(4));

/*test debehaviorizer*/
console.log(STKit.debehaviorizer(Object.freeze(({c:5,b:7})),true));
console.log(STKit.debehaviorizer(({c:5,b:7}), true));

/*test semiColonSON*/
var obj=STKit.semiColonSON(';key,value;methodName,|return true;|;key2,value2;');
console.log(obj.key);
console.log(obj.methodName());
console.log(obj.key2);
obj=STKit.semiColonSON(';key,value;methodName,|function (a) { return a + 1; }|;');
console.log(obj.key);
console.log(obj.methodName(3));
