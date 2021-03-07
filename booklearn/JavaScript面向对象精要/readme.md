## 第一章 原始类型和引用类型
#### 1.2.1 鉴别原始类型
```javascript
// 原始类型 Boolean, Number, String, Null, Undefined
typeof "str" // "string"
typeof 10    // "number"
typeof true  // "boolean"
typeof undefined // "undefined"
typeof null // "object" // null类型地址表示为000, 同object
typeof ref // 对于所有的非函数引用类型 -> "object"

// 良好习惯: 将不用的对象引用设为null
obj = null
```

#### 原始封装类型
```javascript
// 自动的拆包和解包
var name = "test"
var firstChar = name.charAt(0) // name instanceof String -> false, instanceof无法读取临时对象
console.log(firstChar) // "t"
// 相当于
var name = "test"
var temp = new String(name)   // typeof temp -> "object", 包装类型可读写属性:temp.a = 5
var firstChar = temp.charAt(0) 
temp = null
console.log(firstChar)

```

## 第二章 函数
```javascript
// ECMAScript 定义 typeof 操作符对任何具有[[Call]]属性的对象返回"function"
// 函数声明(funciton name(){})会被提升至上下文的顶部
```

## 第三章 理解对象
```javascript
// 查找自身属性
for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
        // do something
    }
}

Object.defineProperty(obj, property, {
    value: 123,       // 需要设定初始值，否则boolean特征为false
    enumerable: true, // 可被for of 等枚举
    configurable: true, // 可编辑(属性)
    writable: true // 可写(值)
})
// Object.getOwnPropertyDescriptor(obj, property)
// 禁止扩展
Object.preventExtensions(obj) // [[Extensible]] 为 false
Object.isExtensible(obj) 
// 封印对象
Object.seal(obj) // [[Extensible]]、[[Configurable]]为false
Object.isSealed(obj)
// 冻结对象
Object.freeze(obj)
Object.isFrozen(obj)
```

## 第四章 构造函数和原型对象
```javascript
obj.hasOwnProperty("hasOwnProperty")
Object.prototype.hasOwnProperty("hasOwnProperty")
// delete 操作符仅对自身属性起作用，无法删除对象的原型属性
// [[Prototype]]属性是对象实例的自有属性，属性本身被冻结，但其指向的值（原型对象）并没有冻结

```

## 第五章 继承
```javascript
// valueOf() 返回一个对象的值表达
// 原始封装类型重写了valueOf()以使得它对String返回一个字符串，对Boolean返回一个布尔，对Number返回一个数字，对Date对象返回一个epoch时间，单位是毫秒。

```

## 第六章 对象模式
```javascript
function Obj (){
    var id // 类共有属性
    this.name = name // 实例私有属性
}
// ES6 
class Obj {
    id = 5 // 均为私有属性
}
```

#### 6.2 混入
```javascript
// ES5
function mixin(receiver, supplier) {
    for (var property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            receiver[property] = supplier[property]
        }
    }
    return receiver
}

// 伪类继承:避免多实例情况下相同函数创建
Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Father
Father.prototype.fn = function(){}

// 复制访问器版本的mixin
function minxi(receiver, supplier) {
    Object.keys(supplier).forEach(function(property) {
        var descriptor = Object.getOwnPropertyDescriptor(supplier, property)
        Object.defineProperty(receiver, property, descriptor)
    })
    return receiver
}
```