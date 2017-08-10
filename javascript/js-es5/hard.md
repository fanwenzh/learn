var arr = [1,2,3,4,5]
// 传入this时，为callback.call(thisArg, element, index, array)，在构造函数创建的实例中指向obj
<!-- passed value if in strict mode, global object if in non-strict mode -->
arr.forEach(callback[, thisArg]); 
```
window.foo = 'window';
var MyObj = function(){
  this.foo = 'object';
};
MyObj.prototype.itirate = function () {
  var _this = this;
  [''].forEach(function(val, index, arr){
    console.log('this: ' + this.foo); // logs 'window'
    console.log('_this: ' + _this.foo); // logs 'object'
  });
};
var newObj = new MyObj();

newObj.itirate();
// this: window
// _this: object
```
```
window.foo = 'window';

var MyObj = function(){
  this.foo = 'object';
};

MyObj.prototype.itirate = function () {
  var _this = this;

  [''].forEach(function(val, index, arr){
    console.log('this: ' + this.foo); // logs 'window'
    console.log('_this: ' + _this.foo); // logs 'object'
  }, this);
};

var newObj = new MyObj();

newObj.itirate();
VM661:11 this: object
VM661:12 _this: object
```

