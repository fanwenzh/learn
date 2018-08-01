// Babel
//     npm install --global babel-cli
//     npm install --save babel-polyfill
// Traceur
//     npm install -g traceur

// 1.let, const
    块作用域，不声明提升
// 2.解构:destructuring不成功为 undefined
    let a = {a1:1, a2:2};
    let {a1, a2} = a;            // 实现Symbol.Iterator接口的类都能被解析（有generator函数）
    let [a = 3, ...b] = [1, 2, 3]; // 函数设置默认值, 不完全解构
    ({x} = {x:1}) // 对象的单属性解构加()
    for(let [key, value] of map) //map遍历
    let [x, y, z] = new Set(['a', 'b', 'c']) //set解构
    let { p, p: [x, { y }] } = obj;  // p: 为模式而不是变量，undefined
    // 写法一
    const clone1 = {
        __proto__: Object.getPrototypeOf(obj),
        ...obj
    };
    // 写法二
    const clone2 = Object.assign(
        Object.create(Object.getPrototypeOf(obj)),
        obj
    );
// Iterator接口: 可用for of 循环
// 3.字符串扩展String
    indexOf() // -1 or index
    .includes(), startsWith(), endsWith() // 返回boolean值
    .repeat(n), padStart(n, val), padEnd(n, val) // 补数据，n为总位数
    模板: `${ js执行域 }`
// 4.正则的扩展
    str.match(), .replace(), search()/return index, split()
    /^.$/u  四字节字符匹配, //y == /^/, //s .可匹配任意单个字符，但不包括'\n'
    先行(否定)断言：(?=), (?!), 后行(否定)断言:(?<=), (?<!)

// 5. 数值的扩展
    0B(ob)二进制, 0O(0o)八进制
    Number.isFinit(), .isNaN(), Number.isInteger()
    Number.parseInt(), Number.parseFloat()
    Number.EPSILON // 极小数常量判断准确性
    Number.isSafeInteger(), Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER
    Math.trunc() // 去除小数部分, ceil, floor
    Math.sign()  // 整数+1, 负数-1, -0返回-0, 其他NaN
    ** 指数运算 Math.pow
    Math.ceil, round, floor, random, max, min
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
    Array.from(ary, (x)=>x*x) //.map不该变原数组 // 将具有长度的对象(类数组)转换为数组 Array.prototype.slice // iterable object to convert to an array.
    Array.of(target1, target2, target3) // 组成元素为target1, 2, 3的数组,length=3
    .find(function(value, index, arr){})//value在前！ === .findIndex(function(){}) // 返回[value, index, Array, callee, Symbol(Symbol.iterator)]
    .indexOf, .includes
    .fill(value, start, end), entries, keys, values, 
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
    var two = Object.assign({}, one);
    for(let key in obj)

    Object.getOwnPropertyDescriptor(obj, key)
    Object.getOwnPropertyDescriptors()

// 9. Symbol // 模块引用, 模拟私有属性
    var k = Symbol('key') // 没有new, 可转为字符串，每次调用返回不同的Symbol
    Symbol.for('key') // 现在全局搜索key，没有则返回新的Symbol，否则返回同一Symbol
    Symbol.keyFor('key') // 返回Symbol的key
    k.toString() === String(k);
    属性：
        Symbol.hasInstance : Foo[Symbol.hasInstance](foo) // foo instanceof Foo
        Foo[Symbol.isConcatSpreadable boolean]: Array.prototype.concat(Foo)时，是否可以展开
        Foo[Symbol.species] : 指向当前对象的构造函数
        myObject{[Symbol.match](string) {return;}} : 当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值 
        searchValue[Symbol.replace](this, replaceValue) // String.prototype.replace(searchValue, replaceValue)
        Foo[Symbol.iterator]()
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
    (3)has(target, propKey)                  //拦截propKey in proxy
    (4)deleteProperty(target, propKey)       // 拦截delete proxy[propKey]
    (5)ownKeys(target)                       // 拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)
    (6)getOwnPropertyDescriptor(target, propKey) //拦截Object.getOwnPropertyDescriptor(proxy, propKey)
    (7)defineProperty(target, propKey, propDesc) //拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)
    (8)preventExtensions(target) //拦截Object.preventExtensions(proxy)
    (9)getPrototypeOf(target) // 拦截Object.getPrototypeOf(proxy)
    (10)isExtensible(target) //拦截Object.isExtensible(proxy)
    (11)setPrototypeOf(target, proto)  //拦截Object.setPrototypeOf(proxy, proto)
    // 函数的拦截
    (12)apply(target, cxt, args) //proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
    (13)construct(target, args) // 拦截new proxy(...args)
// 12.Reflect
    (1)Reflect.apply(target,thisArg,args)
    (2)Reflect.construct(target,args)
    (3)Reflect.get(target,name,receiver)   // 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver
    (4)Reflect.set(target,name,value,receiver)
    (5)Reflect.defineProperty(target,name,desc)
    (6)Reflect.deleteProperty(target,name)
    (7)Reflect.has(target,name)
    (8)Reflect.ownKeys(target)
    (9)Reflect.isExtensible(target)
    (10)Reflect.preventExtensions(target)
    (11)Reflect.getOwnPropertyDescriptor(target, name)
    (12)Reflect.getPrototypeOf(target)
    (13)Reflect.setPrototypeOf(target, prototype)
    Reflect.function(objectFunction, obj, arguments)
    Function.prototype.apply.call(Math.floor, undefined, [1.75]) -> Reflect.apply(Math.floor, undefined, [1.75])
// 13.Promise
    new Promisze(function(resolve, reject){
    }).then(function(){}, function(){}).catch();
    Promise.all([]), Promise.race([]), Promise.resolve(), Promise.reject(), .done(), finally()
    all: .then(function(){arguments[0]}), arguments[0]为返回值
    Promise.try (Bluebird、Q和when)
        (async () => f())().then(...).catch(...)  // f同步函数同步执行，异步函数异步执行
// 14.Iterator和for...of循环
    [Symbol.iterator] 可遍历, 原生具备Array, Map, Set, String, TypedArray, 函数的 arguments 对象
    NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
    let it = Obj[Symbol.iterator]();
        it.next()  {value: 1, done: true};
    场合：
        1.解构赋值...
        2.let generator = function *(){
            yield 1;
            yield* [2,3,4];
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
// 16.generator 的异步应用
    回调, promise, yield, async await
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
    //for await( of ) 遍历Iterator接口
    for await (const x of createRejectingIterable())
18.class // 不存在类函数提升
    class Point{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
        toString(){}
    }
    // new.target 构造函数中判断new命令的调用方式: new.target === className(创建类的类名) || undefined
19.class 的继承extends
    class ColorPoint extends Point {}
    Object.getPrototypeOf()
    super:
        1.super作为函数调用时，代表父类的构造函数 A.prototype.constructor.call(this)
        2.super作为对象时，在普通方法中，指向父类的原型对象, this绑定子类
        prototype和__proto__
            (1)子类的__proto__属性，表示构造函数的继承，总是指向父类。
            (2)子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性，函数的this指向子类
21. 模块化
    1.export命令导出的只是引用指针，并不是值
    2.当模块内部更改此变量时，外部的引用也会发生变化
    3.只能通过模块内部对他进行更改，外部无法引用
    4.export 只能在导入文件的顶层定义（不能在函数内定义）
    export 
    export default 
    import d, {fun as a} from ''

遍历：
// Object.keys(obj)  得到自身可枚举的属性，但得不到原型链上的属性
// Object.getOwnPropertyNames(obj)  得到包括不可枚举的属性，但得不到原型链上的属性
// Object.getOwnPropertySymbols(obj) 得到Symbols属性，包括不可枚举的属性，但得不到原型链上的属性
// for(let key in obj) 得到所有自创建的可枚举属性，包括原型链上的属性


http://es6.ruanyifeng.com/