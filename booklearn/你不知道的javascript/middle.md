## 第1章 类型
```javascript
typeof undefined === "undefined" // true
typeof true === "boolean" // true
// 检验null
Obeject.prototype.toString.call('null') === ['object Null']
(!a && typeof a === "object") // true: a = null
a === null
function fn(a, b){} // fn.length === 2 参数长度
```
## 第2章 值
2.1 数组  
```javascript
// 稀疏数组
var a = []
a[2] = [3]
a[1]; // undefined
a.length // 3
// 字符串索引不计算数组长度
// 解决方法: Object存储
var a = []
a[0] = 1
a["footer"] = 2
a.length // 1
a.footer // 2
a["footer"] // 2
// 字符串键值的强转换
var a = []
a.["13"] = 2
a.length // 14
// 类数组转换
Array.prototype.slice.call(arg)
Array.from(arg)
```
2.2 字符串  
```javascript
var a = "123"
var c = a.split('').reverse().join('')
```
2.3 数字
```javascript
a.toFixed(0) // 显示小数位数
a.toPrecision(1) // 有效位数
// 精确比较 0.1 + 0.2 === 0.3 // false
function numbersCloseEnoughToEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON ? Number.EPSILON : Math.pow(2, -52)
}
// 整数安全范围
Number.max_SAFE_INTEGER // 2^53 - 1
Number.min_SAFE_INTEGER 
var a = 1 / 0 // Infinity
var b = -1 / 0 // -Infinity
// 整数检测
Number.isInteger(n) // typeof num == "number" && num % 1 == 0
```
2.4 特殊数值
```js
// 特殊数字
var a = 2 / "foo" // NaN
var b = "foo"
// window.NaN的bug
window.isNaN(a) // true
window.isNaN(b) // true
typeof a === "number" //true
NaN != NaN // true
// ES6修正
Number.NaN(n) // typeof n === "number" && window.isNaN(n) // return n !== n 
// 零值
var a = -0
a.toString() // a + "" -> "0"
// 等式, 能用== 或 === 解决不用
Object.is(a, b) 
```
2.5 值和引用
```js
arr.slice() // 浅复制
JSON.parse(JSON.stringfy(obj)) // 非函数的浅复制, 同时改变constructor
Object.assign({}, a)
```
## 第3章：原生函数
```js
// 封装与拆封
var a = "abc"
var b = new String(a)
typeof b; // "object"
b instanceof String; // true
Object.prototype.toString.call(b) // "[object String]"
var c = b + "" 
typeof c; // "string"
// Array
var a = new Array(1,2,3)
var b = new Array(3) // [ , , ]
// Symbol
var mysym = Symbol("mysym")
mysym.toString() // "Symbol(my own symbol)"
typeof mysym; // "symbol"
var a = {}
a[mysym] = "foobar"
Object.getOwnPropertySymbols(a);
// String 不改变原字符串，创建新字符串
indexOf, 
substr, substring, slice
toUpperCase, toLowerCase
trim, concat(浅复制) // 记住
```
## 第4章 强制类型转换
```js
// 假值表
undefined, null, false, +0、-0和NaN, ""
// ~x -> -(x+1)
.valueOf()
```
## 第5章 语法
```js
var a = 42
// 为undefined设置默认值
function foo( a = 42, b = a + 1 ) {}
```