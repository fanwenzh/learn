# 第一部分
## 第1章：作用域
1.1 编译原理  
```js
// 分词／词法分析  tokenizing/lexing
var a = 2; // => var, a, =, 2  转化为词法单元
// 解析／语法分析  parsing 
// 将词法单元流转换成抽象语法树
// 代码生成：转换为可执行代码
// 1.2 作用域
// 赋值操作：LHS 左侧查询   TypeError作用域判别成功，变量操作不合法null , undefined
// 寻值操作： RHS右侧查询    ReferenceError作用域判别失败
// 1.3 作用域嵌套
// 由内向外查询
```
## 第2章
```js
// 2.2 词法欺骗
// 非"use strict"，弃用
eval() //  代码嵌入作用域, 不同于setTimeout(), setInterval() 
// setTimeout,setInterval实质是闭包，里面函数访问外面参数
with(obj) // 可修改，不可添加属性
```
## 第3章 函数作用域和块作用域
```js
3.2 隐藏内部实现
function out(){
function in(){} //隐藏
var a = 1;  // 无var 为全局声明window.a
}
3.3 函数作用域
// 立即执行函数表达式：IIFE，immediately invoked function expression ,避免污染全局
(function(){}()) 
(function(window){})(window)  //可传参
// 倒置代码运行顺序，将需要运行的函数放在第二位，UMD(Universal module definition)
(function second(first){
    //调用first
    })(function first();
)}  
最佳实践：避免匿名函数
3.4 块作用域
for(var i = 1; i < 10; i++)  // i在全局定义, 同if
for(let j = 1; j < 10; j++)  // j在for块作用域内, 同if
 // 错误检测机制
try{   
} catch(err){}
// 内存回收 p149 
全局中用{}括起来的变量、函数
//const: 声明变量的指针不能变,  但内存后序列可改变
const set = [];
set.push(1);
```
## 第4章 提升
编译器提速原理：编译时将所有声明（含function f(){}），串联放置代码首

## 第五章 作用域闭包
```js
for(var i = 1; i <=5; i++){
    let j = i;
    setTimeout( function timer() {
        console.log(j);
    }, j * 1000);
}
// let i 绑定到当前for内 i = n 的作用域
for(let i = 1; i <= 5; i++){
    setTimeout( function timer() {
        console.log(i);
    }, i * 1000);
}
// 5.5 模块
var api  = (function(){
    // 定义函数、变量
    return {
        fun1 : fun1,
        fun2 : fun2
        ...
    }
})
// 5.5.1 现代模块机制* p69
var myModules = (function manager() {
    var modules = {};
    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        // 重点函数： 将deps作为依赖注入 impl函数，并保存至modules[name]
        // 即在impl函数区域中可使用module[name]里的函数 //name 属于 deps
        modules[name] = impl.apply(impl, deps);
    }
    function get(name) {
        return modules[name];
    }
    return { define, get }
})();

myModules.define('bar', [], function() {
    function hello(who) {
        return "Let me introduce: " + who; }
    return { hello: hello }; });

// 将bar 注入 foo作为依赖
myModules.define('foo', ['bar'], function(bar) {
    var hungry = "hippo";
    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {awesome: awesome}
})

var bar = myModules.get('bar');
var foo = myModules.get('foo');
console.log(bar.hello("hippo"));
foo.awesome();

// 5.5.2 未来的模块机制
//原理为闭包
export module
import name from module

附录A：动态作用域--在函数作用域内向上查找
附录B：块作用域代替方案
ES5：try{throw}catch(err){} 或 IIFE
附录C：this词法
ES5：1、var self = this; 
   2、function(){}.bind(this)
ES6 : => 继承父函数this
```
## 第二部分：this和对象原型
## 第1章：关于this
```js
function getName(){return this.name}
getName.call(obj)
函数内的this:
//函数声明时的this，为默认绑定, 指向window。在'use strict'模式，绑定到undefined
function foo(){this.count++;}
// 指向自身 *
function foo(){foo.count++;}
//弃用方法：arguments.callee.count++
```
## 第二章：this的全面解释
```js
// 函数调用栈，this绑定到调用对象，
// call 硬绑定（仅能绑定对象一次）
// 1. 默认绑定；独立函数调用
// 2.隐式绑定；函数调用位置有上下文对象，obj.fun1()
function foo(){console.log(this.a);}
var obj = {
    a : 2,
    foo: foo 
}
obj.foo() // 2
// 3.显式绑定；apply, call
// 创建绑定函数
function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    }
}
var newFun = bind(fun1, obj1);
//以 obj1 为作用域调用fun1, 传出参数是args
bar res = newFun(args);
//API 调用上下文
forEach(fun1(data, index, dataArray));
forEach(fun1, obj) obj为作用域，即fun1函数里this所指（内置函数由此功能，看源码）
// 4.new 绑定 : 绑定到新对象上
// 优先级：显式 > new > 隐式 > 默认
var fun2 = fun1.bind(null, arg1)   //将 arg1 传给下层函数*
var fun3 = fun2(arg2)
// 展开数组
// ES5 : fun1.apply(null, [2,3])
// ES6 : ...[2,3]
*函数柯里化：返回含预定义参数的函数
百度百科：把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数
间接引用：(p.foo = o.foo)() // p.foo = o.foo 返回foo声明时的引用
*软绑定 p98
// 显示绑定后，默认this绑定到指定obj //原apply, call 只能绑定 一次
if(! Function.prototype.softBind) {
Function.prototype.softBind = funtion(obj) {
// 获取所有参数
var curried = [].slice.call(arguments, 1);
var bound = function() {
return fn.apply(
    // 若this为全局或null、undefind，返回obj（作用域）
    (!this || this === (window || global )) ? obj : this,
        curried.concat.apply(curried, arugments)
        );
    };
    bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}
```
## 第三章：对象
```js
// 主要类型：string , number , boolean, null, undefined, object
// 内置对象：String, Number, Boolean, Object, Function, Array, Date, RegExp, Error
// 其中object, string, function按引用调用
// 在对象中，属性名永远是字符串：toString()
var myObject = {};
myObject[myObject] = 'a';
myObject['object Object']; // 'a'
// ES6: 可计算属性名
var myObject = {['1'+'2']:'a'}
// 3.3.3 数组
通过array.attr = data 形式增加的属性，不改变array.length值
最佳实践：array['attr'] = data
// 3.3.4 复制对象
var a2 = JSON.parse( JSON.stringify( a ) )   //浅复制，仅复制Number、String、Array等能够被json表示的数据结构
var a3 = Object.assign(a0,a1...) //浅复制，所有类型复制给a3
// 深复制
jQuery.extend()
为什么是一层：http://blog.csdn.net/waiterwaiter/article/details/50267787
// 3.3.5 属性描述符
var myObject = {
    a:2
}
Object.getOwnPropertyDescriptor( myObject, "a");
{
    value: 2,
    writable: true,       // 可写性，即a的值是否可以更改
    enumerable: true,  //所有普通属性可被枚举
    configurable: true   //false 时，不可再配置属性描述，且该属性无法删除
}
Object.defineProperty( myObject, "a", {//上面的属性} )  //在严格模式，违反属性描述出错，普通模式则不会相应
// 3.3.6 不变性
// 禁止扩展：
var myObject = {a:1}
Object.preventExtensions( myObject );
myObject.b = 3; //undefined
// 密封:
Object.seal(myObject) //对象不允许扩展，所有属性configurable: false
// 冻结：
Object.freeze(myObject) //seal后，所有属性writable: false
// 3.3.9 getter和setter*
scene1:
var myObject = {
    get a(){return 2;}
};
Object.defineProperty(
    myObject,
    "b",
    {
        get:function(){return this.a * 2},
        enumberable: true
    }
)
myObject.b; //4
Scene2:
var myObject = {
    get a(){ return this._a_; },  //属性a的getter
    set a(val){ this._a_ = val * 2; } //属性b的setter
}
// 3.3.10 存在性 
可枚举性  x//enumberable: true
myObject.hasOwnProperty()  //检查属性是否在对象属性中
in //检查属性是否在对象及其[[ Prototype ]]原型链中的可枚举类型(简单而言，即该对象的属性)
// 4 in [2, 4, 6]; //false,  属性名是0, 1, 2
myObject.propertyIsEnumerable("attr"); //在对象中的属性检查是否可枚举
Object.getOwnPropertyNames(myObject)//返回对象属性名字的数组
Object.keys(myObject) //返回对象属性中可枚举的属性名字的数组
// 3.4 遍历
for(var key in array){}
for(var val of array){}   //forEach(通过index,array修改，无返回), map(有return)
迭代器 @@iterator
var myArray = [1, 2]
var it = myArray[Symbol.iterator]();   //P139
Object.defineProperty( myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys( o );
        return {
            next: function {
            return {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                };
            }
        };
    }
})
it.next() //{value:1, done:false}
it.next() //{value:2, done:false}
it.next() //{done:true}
```
## 第四章：混合对象“类”
```js
// 设计模式：迭代器模式、观察者模式、工厂模式、单例模式等
// ES5 : 每一个对象都有__proto__属性，指向对应的构造函数的prototype属性
// ES6 ：class为构造函数的语法糖
// 类的实现：阮一峰讲得更详细清楚
// http://es6.ruanyifeng.com/?search=super&x=0&y=0#docs/class
class A{}
class B extends A{}
B.__proto__ === A //true
B.prototype.__proto__ === A.prototype
// extends实现：
// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// B的实例继承A的静态属性
Object.setPrototypeOf(B, A);
// setPrototype实现：
B.prototype.__proto__ = A.prototype;
B.__proto__ = A;
// 类的继承：可看《javascript高级程序设计》，《javascript设计模式》
```
## 第5章 原型  //类名大写
```js
// 原型链屏蔽: myObject.foo = "bar"
1. [[Prototype]]链上存在为foo，且writable:true，则在myObject中添加foo新属性(常见问题)
2. [[Prototype]]链上存在foo，且writable:false, 则无法修改和创建foo属性
3. [[Prototype]]链上存在foo，且为setter，则调用setter，foo不会被添加到myObject
// 强制添加：Object.defineProperty()
// 5.2 构造函数
//new 构造
function one(){
    this.a='1'; 
    function af(){console.log('123');}
}
var two = new one() // new调用one.prototype.constructor进行构造，默认为原函数
// 调用prototype的构造函数，而并非one
two.constructor === one  // false
two.constuctor === Object // true
two // {a:1}   无this声明的属性都不存在
// 5.3（原型）继承
ES5: child.prototype = Object.create( father.prototype) // 推荐使用
ES6: Object.setPrototypeOf( child.prototype, father.prototype)
child.prototype = new Father() // 修改father影响child
// 继承判断：
instanceof检查
father.isPrototypeOf(child) //father是否出现在child的原型链中
Object.getPrototypeOf(child) // 取得child的prototype原型对象
child.__proto__ 
child.prototype
Object.create(null, a, b, ...) //创建无继承的空对象
```
## 第六章：行为委托，继承、class的运用
```js
匿名函数：没有name标识，会导致
1、调试栈更难追踪
2、自我引用（递归、事件、解除绑定）更难
 ES6通过判断then()方法判断是否为Promise类型
```