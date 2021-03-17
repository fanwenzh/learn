// ### 1.let, const
// const 物理内存地址不能被修改
// let, const不能声明两次，而var会忽略第二次
// let config; {
//     config = [];
//     config.unshift(1); //移入
// }

// ### 2.class, 声明不提升
// 继承方式对比
// function User(name, age) {
//     this.name = name;
//     this.age = age;
// }
class User {
    constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        // User.getClassName = function(){
        //     return 'User';
        // }
        // 绑定在class User中的方法，即c = new User, c.getClassName不可用
    static getClassName() {
            return 'User';
        }
        // User.prototype.changeName = function(name) {
        //     this.name = name;
        // }
    changeName(name) {
            this.name = name;
        }
        // User.prototype.changeAge = function(age) {
        //     this.age = age;
        // }
    changeAge(name) {
            this.age = age;
        }
        // Object.defineProperty(User.prototype, 'info', {
        //     get() {
        //         return 'name' + this.name + '| age' + this.age;
        //     }
        // })
    get info() {
        return 'name:' + this.name + '| age:' + this.age;
    }
}

// function Manager(name, age, password) {
//     User.call(this, name, age);
//     this.password = password;
// }
// 继承静态方法
// Manager.__proto__ = User;
// 继承prototype方法
// Manager.prototype = User.prototype;
class Manager extends User {
    constructor(name, age, password) {
            super(name, age);
            this.password = password;
        }
        // Manager.prototype.changePassword = function(pwd){
        //     this.password = password;
        // }
    changePass(password) {
        this.password = password;
    }
    get info() {
        let info = super.info;
        console.log(info);
        return info + ' --new';
    }
}

// ### 3. promise
/* promise实例
function asyncFun(a, b) {
    return new Promise(function(resolve, reject) {
        if (a > b)
            resolve(a + b);
        else reject('error');
    })
}
asyncFun(3, 2).then(function(res) {
        // console.log('1',res);
        // 三种方式都可以返回Promise
        // var promise = Promise.resolve('abc');

        // var promise = new Promise(function(resolve, reject){
        //     resolve('abc');
        // )}
        throw new Error('error!');
        return 'abc'; // 不返回res
    }, function(rej) {}).then(function(res) {
        console.log('2', res);
        return;
    })
    // .catch(function(e) {
    //     console.log('err1', e);
    //     return Promise.resolve('abc2'); //catch后的then无效
    // })
    .then(function(res) {}, function(res) {
        console.log('1', res);             // reject也会捕获异常, 则后面catch无效
    }).catch(function(err) {
        console.log('2', err);
    })
    */

function createPromise(url) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url,
            dataType: 'json',
            success(arr) {
                resolve(arr)
            },
            error(err) {
                reject(err);
            }
        })
    })
}

Promise.all([createPromise(url1), createPromise(url2)])
    .then(function(arr) {
        let [res1, res2] = arr
    }, function(err) {
        console.log(err)
    })

Promise.race([
    $.ajax({url1}),
    $.ajax({url2})
]).then(result=>{}, err=>{}) // result === [res1, res2]

// ## generator
function *show(num1, num2) {
    console.log(num1) // 0
    alert('hi');
    let a = yield 1;
    console.log(a) // 5
    alert('2');
}
let genObj = show(0) // 生成generator
let res1 = genObj.next(3) // {value: 1, done:false} // 第一个next传参没用
let res2 = genObj.next(5) // {value: undefined, done: true}
// koa实例
const koa = require('koa')
const mysql = require('koa-mysql')

let db = mysql.createPool({host: 'localhost', user: 'root', password: '123', database: 'name'})
let server = new koa()

server.user(function *(){
    let data = yield db.query('SELECT * FROM table_name')
    this.body = data
})
server.listen(8080)
//### 4 symbols
// 私有属性
// let name = Symbol('name');
// let obj = {
//     age: 22,
//     [name]: 'leo'
// };
// console.log(Object.keys(obj)); // 'age'
// for(let k in obj)  // 'age'
// console.log(Object.getOwnPropertySymbols(obj); // [Symbol(name)]

class userGroup {
    constructor(users) {
        // json
        this.users = users;
    };
    //创建遍历函数
    [Symbol.iterator]() {
        let i = 0,
            self = this;
        const names = Object.keys(this.users);
        const length = names.length;
        return {
            next: function() {
                let name = names[i++];
                let qq = self.users[name];
                return { value: { name, qq }, done: i > length }
            }
        }
    };
};
// let group = new userGroup({'leo':'123', 'zem': '234'});
// for(let user of group){
//     console.log(user);
// }
// let iterator = group[Symbol.iterator]();
// iterator.next();      // {value: {'leo':'123'}, done: false};

// 创建对象遍历
// var obj = {
//     length: 2,
//     '0':'a',
//     '1':'b',
//     'a':'c'
// }
// obj[Symbol.iterator] = [][Symbol.iterator];
// for(let i of obj){
//     console.log(i);  // 输出value: a b
// }

//### 5.Set, Map
// Set.prototype[Symbol.iterator] === Set.prototype.values
// s.add(NaN).add(NaN) // NaN === NaN

//### 6.Array
// Array.from // 类数组转数组 apply
// Array.of // 通过多个参数生成数组 call
// Array.isArray();
// [].find(function(value, index, array) { // 返回value
//     return value > 10;
// });
// [].findIndex() //返回index
// 区分indexOf

//### 7.类型化数组 ArrayBuffer
// Uint8Array 1, Uint16Array 2, Uint32Array 4
// Int8Array, Int16Array, Int32Array
// Float32Array 4个字节, Float64Array 8
// var buffer = new ArrayBuffer(8);
// // 无符号，操作同一内存块
// var arr1 = new Uint8Array(buffer); // length, 0~256
// arr1[0] = 1;  // 8bit
// var arr2 = new Uin16Array(buffer);
// arr2[0] = 1;  // 16bit
// var arr3 = new Uint32Array(buffer);
// buffer.getInt8(0); // buffer.getInt16, .getInt32, .getUnit8
// arr3.length, arr3.byteLength

// subarray 用同一内存
// var tar = new Int16Array([1,2,3,4,5]);
// var tar2 = tar.subarray(1,3); // start, end
// console.log(tar.buffer === tar2.buffer)  // true
// set 复制
// var tar = new Int8Array([1,2,3,4]);
// var tar2 = new Int16Array(5);
// tar2.set(tar, ture); // false, true小端大端读写

//### 7对象
// let ok = '123';
// var obj = {
//     ['mid']:'007',
//     ['asd' + ok]: 123
// }

// Object.is({}, {}) //false, 地址不同
// {} === {}  // false
// Object.is(NaN, NaN) // true!
// NaN === NaN  //false
// Object.is(+0, -0); //false
// +0 === -0 // true

// let obj = {age:15};
// let skey = Symbol('test');
// let obj2 = Object.assign(obj, {name:'fwz'}, {[skey]:'ok'}); // assign是扩展obj可枚举的属性!, 和Symbol
// console.log(obj === obj2, obj2[skey]);  // true 'ok'

// Object.keys(obj)  得到自身可枚举的属性，但得不到原型链上的属性
// Object.getOwnPropertyNames(obj)  得到包括不可枚举的属性，但得不到原型链上的属性
// Object.getOwnPropertySymbols(obj) 得到Symbols属性，包括不可枚举的属性，但得不到原型链上的属性
// for(let key in obj) 得到所有自创建的可枚举属性，包括原型链上的属性
// Object.getOwnPropertyDescriptor(obj, attr)

// setPrototypeOf  __proto__
// getPrototypeOf

// Object.entries()
// Object.values()

// ### 8字符串
// var str = 'hello';
// console.log(str.includes("e", 1)); // 默认0，index
// str.startsWith("e", 2);
// str.endsWith("e", 2);

// 模板字符串
// let a = 1, b = 2;
// var str = `${a+b>0?a:b}`

// function tag(strArr, arg){
//     console.log(strArr);
//     console.log(arg);
//     console.log(arguments);
// }
// let name = 'leo';
// let result = tag`hello${name}`;  // ['hello', ''], leo // 1、 hello 和 断点形成数组, 2、${name}

// ### 变量解析
// let { name } = { name: 'leo', age: 33 };
// let obj = {
//         a: {
//             b: {
//                 c: 123
//             }
//         }
//     }
//     // a: 为模式（相当于c++的a::）,只有b 为变量
// let { a: { b } } = obj;
// console.log(b);

// let [x = 15, y] = [undefined, 13]; // 只有undefined才能采取默认值

// let obj = {
//         name: 'leo',
//         age: 22
//     }
// id: ?
// let { name, id: uid = '007', age } = obj;
// console.log(name, uid, age);

// 错误
// let {x:{y}} = {name:{y:1}}; // y undefined

// name被定义? 应该解析的问题
// var name; { name } = { name: 'leo' };

// ### 函数的解构和默认赋值
// 相当于[x=2, y=3] = undefined, 应改为 [x=2, y=3] = []
// function test([x = 2, y = 3]) {
//     console.log(x, y);
// }
// test();

// function test([x = 2, y = 3] = []) {
//     console.log(x, y);
// }
// 输入是undefined 或 [], 其他形式为错误
// test(null); //Cannot read property 'Symbol(Symbol.iterator)' of null

// function test([x = 1, [y = 2, z = 3] = []] = []) {
//     console.log(x, y, z);
// }
// test();

// function test({ x, y } = { x: 12, y: 22 }) {
//     console.log(x, y);
// }
// test(); // 12, 13

// function test([x = 33, y = 55] = [22, 66]) {
//     console.log(x, y);
// }
// test(); // 22, 66
// test([]); //33, 55

// *function test([x = 33, y = 55] = []) {
//     console.log(x, y);
// }
// test(); //33 55

// function test([x = 1, y = 2, z = 3] = [], { name = 'leo1', qq = 'leo2' } = {}) {
//     return {x, y, z, name, qq};
// }
// let {y, x, z,qq,name} = test(); // 与返回的值名字相必配
// console.log(x,y,z,name,qq);

//### proxy
// var obj = {name:'leo'};
// var proxy = new Proxy(obj, {
//     拦取所有get操作
//     get:function(target, key){
//         return 'none';
//     },
//     set:function(target,key,value) {
//         // target为obj
//         // console.log(target, key, value); // {name, 'leo'} 'name' 'fwz'
//         // 设置原始obj对象的默认值
//         // Reflect.set(target,key,value);
//         deletProperty:function(target, key){
//             if(key !== 'name') {
//                 // 若无任何操作, 则无法进行删除操作
//             } else {
//                 Reflect.delete(target,key);
//             }
//         }
//     }
// })
// console.log(proxy.name);
// proxy.name='fwz';
// console.log(obj.name);

// in 拦截
// var obj = {
//     _name:"hello"
// };
// var proxy = new Proxy(obj, {
//     has: function(target, key) {
//         if(key[0] ==='_'){
//             return false;
//         } else {
//             return key in target;
//         }
//     }
// });
// var bool = '_name' in obj;
// console.log('has name', bool);
// console.log('has _name', '_name' in proxy);

// ES7移除了enumerate!
// Object.keys() (own enumerable properties only)
// Object.getOwnPropertyNames() (own properties)
// Reflect.ownKeys() (own properties and Symbols)
// var obj2 = {
//     _name: 'leo',
//     name: 'leo2',
//     age: 22,
//     group: 'javascript'
// };
// var proxy2 = new Proxy(obj2, {
//     has: function(target) {
//         console.log('enter 1', target);
//         if (target[0] === '_') return false;
//         return true;
//     },
//     ownKeys: function(target) {
//         console.log('enter 2', target);
//         if (target[0] == '_') return;
//         return Reflect.ownKeys(target);
//     }
// });
// proxy2
// for (var key in proxy2) {
//     console.log(key);
// }
// console.log(Object.keys(proxy2));

// function test() {
//     console.log("hello word");
// }
// var proxyFun = new Proxy(test, {
//     apply: function(target, cxt, args) {
//         console.log("enter", target);
//         return Reflect.apply(target, cxt, args);
//     }
// });
// proxyFun();
// proxyFun.apply(null, args);
// proxyFun.call(null);

// 构造函数没有进入apply
// function User1() {
//     console.log("this is class");
// }
// var userClassProxy = new Proxy(User1, {
//     apply: function(target, cxt, args) {
//         console.log('enter apply');  // 构造函数没有进入
//         return Reflect.apply(target, cxt, args);
//     },
//     construct: function(target, args) {
//         console.log('this is class proxy handle');
//         return Reflect.construct(target, args);
//     }
// });
// new userClassProxy();

// ### 模块化
// 1.export命令导出的只是引用指针，并不是值
// 2.当模块内部更改此变量时，外部的引用也会发生变化
// 3.只能通过模块内部对他进行更改，外部无法引用
// 4.export 只能在导入文件的顶层定义（不能在函数内定义）
// export var name = 6;
// export default function test() {};
// export class User {};
// export name = 6;

// 通过default输出的为值，而不是引用！！！

// // 导入
// import a, { name as myName } from './m';  // 默认导入function test()
// // import { default as a } from './m.js'; //设置default
// console.log(a, myName); // a为default的test

// import * as my from './m'; // 所有都保存在对象中{default, ...}
// console.log(obj.name, obj.User);

// ### jspm: 浏览器ES6模块化
// npm install jspm 
// ./node_modules/.bin/jspm init
// Bebal