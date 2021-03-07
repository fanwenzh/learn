// Babel
//     npm install --global babel-cli
//     npm install --save babel-polyfill
// Traceur
//     npm install -g traceur

// 1.let, const
    // 块作用域，不声明提升: ES6的块级作用域必须有大括号
    // for 循环为父作用域, 循环体为子作用域
    for(let i = 0; i < 5; i++) {
        arr[i] = (()=>i);
    }
    arr[0]() -> 0
    // 暂时性死区
    // 该区域仅有let声明的一个tmp
    var tmp = 123
    if(true) {
        tmp = '123' // ReferenceError
        let temp
    }
    globalThis == window 

// 2.(可嵌套)解构: 实现【Symbol.Iterator接口】的【类、对象】
// destructuring不成功为 undefined
    let a = {a1:1, a2:2};
    let {a1, a2: bieming} = a;     
    let [a = 3, ...b] = [1, 2, 3]; // 函数设置默认值, 不完全解构
    ({x} = {x:1}) // 对象的单属性解构加()
    for(let [key, value] of map) //map遍历
    let [x='test', y, z] = new Set(['a', 'b', 'c']) //set解构, 默认值
    let { p, p: [x, { y }] } = obj;  // p: 为模式而不是变量，undefined
    // 写法一
    const clone1 = {
        __proto__: Object.getPrototypeOf(obj),
        ...obj
    };
    // 写法二
    const clone2 = Object.assign( // assign为属性(浅)拷贝
        Object.create(Object.getPrototypeOf(obj)),
        obj
    );
    // Symbol.Iterator接口: 可用for of 循环
    JSON.stringify(), JSON.parse()

    // 标签模板
    tag`Hello ${a + b} world ${a * b}`;
    // 等同于
    tag(['Hello ', ' world ', ''], 15, 50);
    // 相关操作如下
    for (index = 0; index < values.length; index++) {
        output += literals[index] + values[index];
    }

    // 防止恶意输入
    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

// 3.字符串扩展String
    String.raw // 返回/转义字符串
    .normalize() // 用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化
    indexOf() // -1 or index
    .includes(), startsWith(), endsWith() // 返回boolean值
    .repeat(n), padStart(n, val), padEnd(n, val) // 补数据，n为总位数
    .trimStart(), .trimEnd()
    模板: `${ js执行域 }`

// 4.正则的扩展
    str.match(), .replace(), search()/return index, split()
    .matchAll(), .replaceAll() // .repalce('/b/'g, '$&')
/*
    $&：匹配的子字符串。
    $`：匹配结果前面的文本。
    $'：匹配结果后面的文本。
    $n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
*/
    // 粘连修饰符y, Unicode模式修饰符
    /^.$/u  四字节字符匹配, //y == /^/, //s .可匹配任意单个字符，但不包括'\n'
    const r2 = /hello/u;
    r2.unicode // true
    var r = /hello\d/y;
    r.sticky // true
    r2.source // hello\d
    r2.flag // gi

    // index, lastIndex
    const match = REGEX.exec('xaya');
    match.index // 3
    REGEX.lastIndex // 4

    // 断言：
    // (?=) // 先行断言
    // (?!) // 先行否定断言
    /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
    /\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
    // 后行断言: // (?<=), (?<!) // 执行顺序是从左到右匹配，从右到左完成引用
    /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  / / ["100"]
    /(?<!\$)\d+/.exec('it’s is worth about €90')                / / ["90"]
    // 具名匹配
    const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    const matchObj = RE_DATE.exec('1999-12-31');
    const year = matchObj.groups.year; // 1999

// 5. 数值的扩展
    0B(ob)二进制, 0O(0o)八进制
    Number.isFinit(), .isNaN(), Number.isInteger()
    Number.parseInt(), Number.parseFloat()
    Number.EPSILON // 极小数常量判断准确性
    Number.isSafeInteger(), Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER
    Math.trunc() // 去除小数部分, ceil, floor
    Math.sign()  // 整数+1, 负数-1, -0返回-0, 其他NaN
    Math.cbrt() // 立方根
    ** 指数运算 Math.pow
    Math.ceil, round, floor, random, max, min 
    Math.expm1() // ex - 1
    Math.log1p() // Math.log(1 + x)
    Math.log10() // 以10为底的对数
    Math.log2()
    BigInt()

// 6.函数的扩展
    默认值, rest参数, 'use strict'
    () => {};  // 作用域内arguments, super 不存在
    const numbers = (...nums) => nums; 返回 [1,2,3,4,5]
    foo::bar; // 等同于 bar.bind(foo); 如c++
    foo::bar(...arguments); // 等同于 bar.apply(foo, arguments);, arguments非Array
    obj::obj.foo // ::obj.foo, 可采用链式写法

// 7.数组扩展:具有Iterator接口: for ...in: key, for...of: value // {}没有实现接口
    Math.max(...[14, 3, 77]), arr1.push(...arr2), 合并数组[1, 2, ...more]
    Array.isArray(), // arguments false
    res = Array.from(ary, (x)=>x*x) //.map不该变原数组 // 将具有长度的对象(类数组)转换为数组 Array.prototype.slice // iterable object to convert to an array.
    Array.of(target1, target2, target3) // 组成元素为target1, 2, 3的数组,length=3
    .find(function(value, index, arr){})//value在前！ === .findIndex(function(){}) // 返回[value, index, Array, callee, Symbol(Symbol.iterator)]
    .indexOf, .includes
    .fill(value, start, end), entries, keys, values, 
    Array(number).fill([])
    .flat(Infinity), .flatMap() // map then flat

// 8.对象扩展
    属性简写，属性名表达式
    Object.is(a, b) //（地址）是否相等===， Object.assign(a, ...b) // assign是扩展a可枚举的属性!
    // 遍历:
    ES5:
        for...in循环：只遍历对象自身的和继承的可枚举的属性
        Object.keys()：返回对象自身的所有可枚举的属性的键名
        JSON.stringify()：只串行化对象自身的可枚举的属性
    ES6:
    *Object.keys(), Object.values(), Object.entries() // 先转对象，后输出数组，过滤属性名为 Symbol 值的属性
    *for(let [key, value] of obj)
        Object.getOwnPropertyNames(obj)  // 返回数组
        Object.getOwnPropertySymbols(obj)
        Reflect.ownKeys(obj)
    obj.__proto__:
        Object.setPrototypeOf(), Object.getPrototypeOf(), Object.create()
    // 复制：
    const clone1 = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
    const clone2 = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    )
    // 表达式为Object时, typeof keyB == 'object'
    const myObject = {
        [keyA]: 'valueA',
        [keyB]: 'valueB'
    };
    myObject // Object {[object Object]: "valueB"}

    Object.getOwnPropertyDescriptor(obj, key)
    //  {
    //    value: 123,
    //    writable: true,
    //    enumerable: true, 
        // for...in, Object.keys(), JSON.stringify, Object.assign()
        // Reflect.ownKeys(obj) // 包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
    //    configurable: true
    //  }
    Object.getOwnPropertyDescriptors()
    // 链式判断符 ?. 如果为非undefined 或 null
    const firstName = message?.body?.user?.firstName || 'default';
    iterator.return?.() // 如果return方法存在则执行 // obj?.prop // 对象属性
    // null 判断符 ?? // 只有运算符左侧的值为null或undefined时，才会返回右侧的值
    const headerText = response.settings.headerText ?? 'Hello, world!';
    Object.is()
    // Object.fromEntries()方法是Object.entries()的逆操作

// 9. Symbol // 模块引用, 模拟私有属性
    var k = Symbol('key') // 没有new, 可转为字符串，每次调用返回不同的Symbol
    Symbol.for('key') // 现在全局搜索key，没有则返回新的Symbol，否则返回同一Symbol
    Symbol.keyFor('key') // 返回Symbol的key值, 即新的Symbol值
    k.toString() === String(k);
    属性:
        Symbol.hasInstance : Foo[Symbol.hasInstance](foo) // foo instanceof Foo
        Foo[Symbol.isConcatSpreadable boolean]: Array.prototype.concat(Foo)时，是否可以展开
        Foo[Symbol.species] : 指向当前对象的构造函数
        myObject{[Symbol.match](string) {return;}} : 当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值 
        searchValue[Symbol.replace](this, replaceValue) // String.prototype.replace(searchValue, replaceValue)
        Foo[Symbol.iterator]()
        [Symbol.toStringTag] : Object.prototype.toString.call(x) -> '[Object Number]'

// 10. set、map
set
    let set = new Set([1, 2, 3, 4, 4]); // new Set(arr)
    set.size    // add 对象完全相同(地址相同)===才能去重
    set.add(i);  // for(let i of s){}, NaN可加入，唯一
    set.delete, has, clear
*   [...new Set(array)] or Array.from(new Set(array));// 去重
    遍历：.keys, values, entries, forEach, ..., for of
    Set.prototype[Symbol.iterator] === Set.prototype.values

    let union = new Set([...a, ...b]);  // 并集
    let intersect = new Set([...a].filter(x => b.has(x)));  // 交集
    let difference = new Set([...a].filter(x => !b.has(x))); // 差集
    WeakSet: 用于存储DOM节点
        1.成员只能是对象!, 2.WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
        add, delete, has  // 但不能遍历
map（hash）
    const m = new Map([['1','a'],['2','b']])  // 可直接用obj地址为key
    m.set(obj, 'content'), get, has, delete, size, clear
 *  遍历：keys, values, entries, forEach((value, key, map)=>{} // for(let [key, value] of map.entries())
    WeakMap: 放置内存泄漏，如注册监听事件的listener对象,key释放，function释放
        1.只接受对象作为键名（null除外）2.get, set, has, delete 不支持遍历

// 11.Proxy: 设置代理
    var obj = new Proxy({}, {
        get: function (target, key, receiver) {
            console.log(`getting ${key}!`);
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            console.log(`setting ${key}!`);
            return Reflect.set(target, key, value, receiver);
        },
        has:...,
        deleteProperty:...,
        apply:...,
        construct:...,
        getOwnPropertyDescriptor:...,
        defineProperty:...,
        getPrototypeOf:...,
        setPrototypeOf:...,
        enumerate:..., // for in 检测无效···
        ownKeys:...,
        preventExtensions:...,
        isExtensible:...
    });
    (1)get(target, propKey, receiver)        // 拦截proxy.foo和proxy['foo']
    (2)set(target, propKey, value, receiver) // 拦截proxy.foo = v或proxy['foo'] = v
    (3)has(target, propKey)                  //拦截propKey in proxy // a in obj, for in 
    (4)deleteProperty(target, propKey)       // 拦截delete proxy[propKey]
    (5)ownKeys(target)                       // 拦截Object.getOwnPropertyNames(proxy)、
                                            //      Object.getOwnPropertySymbols(proxy)、
                                            //      Object.keys(proxy), for...in
    (6)getOwnPropertyDescriptor(target, propKey) //拦截Object.getOwnPropertyDescriptor(proxy, propKey)
    (7)defineProperty(target, propKey, propDesc) //拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)
    (8)preventExtensions(target) //拦截Object.preventExtensions(proxy), 返回boolean值
    (9)getPrototypeOf(target) // 拦截Object.getPrototypeOf(proxy)
    (10)isExtensible(target) //拦截Object.isExtensible(proxy)
    (11)setPrototypeOf(target, proto)  //拦截Object.setPrototypeOf(proxy, proto)
    // 函数的拦截
    (12)apply(target, cxt, args) //proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
    (13)construct(target, args) // 拦截new proxy(...args)
                                // this 指向 proxy对象
    let { proxy, revoke } = Proxy.revocable(target, handler);
    revoke() // 取消代理
// 12.Reflect: 与Proxy对象方法一一对应
    (1)Reflect.apply(target,thisArg,args)
    (2)Reflect.construct(target,args)
    (3)Reflect.get(target,name,receiver)   // 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver
    (4)Reflect.set(target,name,value,receiver)
    (5)Reflect.defineProperty(target, name, desc) // 失败返回false, 代替Object.defineProperty(target, property, attributes)抛出错误
    (6)Reflect.deleteProperty(target,name)
    (7)Reflect.has(target, name) // 原写法：'assign' in Object
    (8)Reflect.ownKeys(target)
    (9)Reflect.isExtensible(target)
    (10)Reflect.preventExtensions(target)
    (11)Reflect.getOwnPropertyDescriptor(target, name)
    (12)Reflect.getPrototypeOf(target)
    (13)Reflect.setPrototypeOf(target, prototype)
    Reflect.function(objectFunction, obj, arguments)
    Function.prototype.apply.call(Math.floor, undefined, [1.75]) -> Reflect.apply(Math.floor, undefined, [1.75])


    // 13.Promise
    new Promisze(function(resolve, reject){}).then(function(){}, function(){}).catch();
    Promise.all([]), Promise.race([]), Promise.resolve(), Promise.reject(), .done(), finally()
    all: .then(function(){arguments[0]}), arguments[0]为返回值
    Promise.try (Bluebird、Q和when)
        (async () => f())().then(...).catch(...)  // f同步函数同步执行，异步函数异步执行

    // 14.Iterator和for...of循环
    [Symbol.iterator] // 可遍历, 原生具备Array, Map, Set, String, TypedArray, 函数的 arguments 对象, NodeList 对象
    Symbol.asyncIterator
    NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
    let it = Obj[Symbol.iterator]();
        it.next()  {value: 1, done: true};
    场合:
        1.解构赋值...
        2.let generator = function *(){
            yield 1;
            yield* [2,3,4]; // 遍历接口yield*
        }
        generator.next()
        3.对象中设置遍历
    for(let index in ary) // for(let item of ary)

// 15.generator
    let A = function *a(){
        let a1 = yield 1;
        console.log(a1);  // 3
        let a2 = yield* [2,3,4];
        return 5;     // {value: 5, done: true}
    }
    A.next();   {value: 1, done:false}
    A.next(3);  {value: 2, done:false} //传参数
    A.throw() // 从内部抛出错误
    A.return('foo') // { value: "foo", done: true } // 终止迭代器, 直接进入内部的finally块

// 16.generator 的异步应用
    

// 17.async 函数
    async function() {
        let data = await function(){}(); // function 返回promise对象，也可能是reject
        await doSomething().catch(function(e){});
        let [foo, bar] = await Promise.all([getFoo(), getBar()]); // 同时触发getFoo和getBar
    }
    // 并发请求
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });
    // async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
    // reject的参数会被catch方法的回调函数接收到
    // 注意：
    // 1.await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中
    async function myFunction () {
        try {
            await somethingThatReturnsAPromise();
        } catch (err) {
            console.log(err);
        }
    }
    // 第二种写法
    async function myFunction () {
        await somethingThatReturnsAPromise()
            .catch(function (err) {
                console.log(err);
            });
    }
    // 2.同时出发多个Promise, 效率更高
    // 写法一
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
    // 写法二
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;

    //for await( of ) 遍历Iterator接口
    for await (const x of createRejectingIterable())
    
// 18.class // 不存在类函数提升
    class Point{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
        toString(){}
    }
    // new.target 构造函数中判断new命令的调用方式: new.target === className(创建类的类名) || undefined
    // 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
        // Object.keys(Point.prototype) // 显示constructor()函数中 this.x
        // []
        // Object.getOwnPropertyNames(Point.prototype)
        // ["constructor","toString"]

    // this的指向
    // 类的方法内部如果含有this，它默认指向类的实例
    // static 方法, 类调用(方法内的this为类而非类实例)
    class Foo {
        bar = 'hello';
        baz = 'world';
        // 等同于
        constructor() {
            this.bar = 'hello';
            this.baz = 'world';
        }
        static pro = '123'
    }
    // 等同于
    Foo.pro = '123'

    // 私有方法、属性: #修饰
    class Foo {
        #a;
        constructor(a) {
            this.#a = a;
        }
        #sum () {
            return this.#a + this.#b;
        }
        printSum () {
            console.log(this.#sum());
        }
    }
    // new.target
    // new是从构造函数生成实例的类

    // 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，
    // 赋值的属性会变成子类实例的属性。

    // 19.class 的继承extends
    class ColorPoint extends Point {}
    // Object.getPrototypeOf(obj), Object.setPrototypeOf(obj)
    super:
        1.super作为函数调用时，代表父类的构造函数 A.prototype.constructor.call(this)
        2.super作为对象时，在普通方法中，指向父类的原型对象, this绑定子类
        prototype和__proto__
            (1)子类的__proto__属性，表示构造函数的继承，总是指向父类。
            (2)子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性，函数的this指向子类
    
    // 21. 模块化
    // CommenJS (require()和module.exports) : 输出的是值的拷贝
    module.exports = {}
    let { stat, exists, readfile } = require('fs'); // require在运行时执行
    // ES6模块 (import和export): export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例
    import { stat, exists, readFile } from 'fs'; // import在静态解析阶段执行

    1.export命令导出的只是引用指针，并不是值
    2.当模块内部更改此变量时，外部的引用也会发生变化
    3.只能通过模块内部对他进行更改，外部无法引用
    4.export 只能在导入文件的顶层定义（不能在函数内定义）

    // 两种导出方式
    // 方法一：
    // export.js
    export var m = 1 == export {m} == export {n as m}
    // import.js
    import { m as a } from './export.js' 
    import * as circle from './export.js'
    circle.a

    // 方法二：
    export default // 指定默认模块, 1个文件中只能出现1次
    // export-default.js
    export default function () {
        console.log('foo');
    }
    // import-default.js, 引用时自定义名称
    // ES6 模块也允许内嵌在网页
    import customName from './export-default';
    customName(); // 'foo'

    // 方法三：
    export { add as default } // export default add;
    // app.js
    import { default as foo } from 'modules';
    // 等同于
    // import foo from 'modules';
    // ES2020 动态添加模块
    import()

    // ES6 中不存在的顶层变量：
    //arguments, require, module, exports, __filename, __dirname

    // 循环依赖
    // CommonJS : 因为a.js还没有执行完，从exports属性只能取回已经执行的部分，而不是最后的值
    // ES6: 当a.js已加载过来，继续执行b.js, 则在引用a.js的变量时会报无命名错误

    遍历：
    // Object.keys(obj)  得到自身可枚举的属性，但得不到原型链上的属性
    // Object.getOwnPropertyNames(obj)  得到包括不可枚举的属性，但得不到原型链上的属性
    // Object.getOwnPropertySymbols(obj) 得到Symbols属性，包括不可枚举的属性，但得不到原型链上的属性
    // for(let key in obj) 得到所有自创建的可枚举属性，包括原型链上的属性


http://es6.ruanyifeng.com/