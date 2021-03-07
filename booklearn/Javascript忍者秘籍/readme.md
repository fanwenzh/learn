## 第二章代码测试
```javascript
// 兼容测试
function log(...args) {
    try {
        console.log.apply(console, args)
    } catch (e) {
        try {
            opera.postError.apply(opera, args)
        }
    } catch(e) {
        alert(Array.prototype.join.call(args, " "))
    }
}
// 测试框架JsUnit, Qunit, Selenuim, YUI Test
```

## 第三章 函数根基
```javascript
// 每个声明项的作用域不仅取决于它的声明，还取决于它是变量还是函数
fn() // ok
console.log(a) // undefined

function fn() {
    console.log('ok')
}
var a = 1
```

## 第四章 挥舞函数
```javascript
// 多种函数引用方式
var ninja = {
    chrip: function signal(n) {
        // ninja.chrip(n-1)
        // 内联函数引用, 防止对象ninja丢失时函数无法引用
        return n > 1 ? signal(n-1) + "-chirp" : "chirp"
        // arguments.callee(n - 1)
    }
}

// 利用参数个数进行函数重载（根据函数参数个数）
// 方法一: 冗长
var ninja = {
    whatever : function (...args) {
        switch (args.length) {
            case 0:
                // do something
            case 1: 
                // do something
            default: 
                break
        }
    } 
}

// 方法二: 闭包重载
function addMethod(o, name, fn) {
    let oldFn = o[name]
    object[name] = function(...args) {
        // arguments.length
        if (fn.length == args.length) {
            return oldFn.apply(o, args)
        } else {
            return fn.apply(o, args)
        }
    }
}

var ninja = {}
addMethod(ninja, 'fn1', function(){/* do something */})
addMethod(ninja, 'fn2', function(){/* do something */})
addMethod(ninja, 'fn3', function(){/* do something */})

// 类型判断
Object.prototype.toString.call(fn) === "[Object Function]"
typeof fn == "function" // 在不同浏览器可能不统一
```

## 第五章 闭包
```javascript
// 浏览器的事件处理系统认为函数调用的上下文是实现的目标函数

// bind 的实现
function bind(context, name) {
    return function(...args) {
        return context[name].apply(context, args)
    }
}

// 函数的记忆方法（不适用闭包）
Function.prototype.memorized = function(key) {
    this._values = this.values || {}
    return this._value[key] !== undefined ? 
        this._values[key] :
        this._values[key] = this.apply(this, arguments)
}
function isPrime(num){}
isPrime.memorized(5) // => isPrime._values[5]
// 闭包实现
Function.prototype.memorize = function(key) {
    var fn = this
    return function() {
        return fn.memorized.apply(fn, arguments)
    }
}
var isPrime = (function(num) {}).memorize()
isPrime(5)

// 增强函数
// wrapper: Function
function wrap(object, method, wrapper) {
    var fn = object[method]
    return object[method] = function() {
        // [fn, [...args]]
        return wrapper.apply(this, [fn.bind(this)].concat(
            Array.prototype.slice.call(arguments)
        ))
    }
}

```

## 第六章 原型与面向对象
```javascript
// 实现Array的forEach功能 -> this[i]
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, context) {
        for (var i = 0; i < this.length; i++) {
            // [].forEach((value, index, arr) => {})
            callback.call(context || null, this[i], i, this)
        }
    }
}

// 修复new调用, 同class
function User(name) {
    if (!(this instanceof arguments.callee)) {
        return new User(name)
    }
    this.name = name
}

function User(name) {
    if (!new.target) {
        return new User(name)
    }
    this.name = name
}
```

## 第八章 驯服线程和定时器
```javascript
// 认识setTimeout 和 setInterval的区别
/**
 * 在setTimeout()中，要在前一个callback回调执行结束并延迟10毫秒（可能更多，但不会更少）以后，才能再次执行setTimeout(). 而setInterval()是每隔10毫秒就尝试执行callback回调，而不关注上一个callback是何时执行
*/
```

## 第10章 with语句
```javascript
// with语句会创建一个作用域，在该作用域内，在引用特定对象的属性时，可以不使用前缀
with(obj) {
    // obj.a
    a = 5
    // 如果obj.a不存在, 则绑定在windows上
}

// ...p$1
"".replace(/[asd]/g, function(matchStr, p$1, p$2, offset, originalStr){})
```