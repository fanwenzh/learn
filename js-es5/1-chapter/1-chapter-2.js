// 1单例模式:分组编写代码的模式
// 把描述同一个事物（对象）的属性和方法中放在同一个命名空间(person)中，起到分组的作用，
// 不同事物(对象)之间的属性相同也不会冲突 
var person = {
        name: 'a',
        age: '18'
    }
    // 工作中的最简单的模块化分组开发

// 12工厂模式：工厂模式
// 单例模式解决分组问题, 但是不能实现批量生产, 属于手工业模式 -> 工厂模式
// 把相同功能的代码放到一个函数中 -> 函数的封装 
// -> 低耦合(相同)高内聚(重复利用率): 减少页面中的冗余代码，提高代码的利用率
function createPerson(name, age) {
    var obj = {}; // new Object()
    obj.name = name;
    obj.age = age;
    obj.speak = function() {
        console.log("my name is " + obj.name);
    }
    return obj;
}
var p1 = createPerson('a', 1);
var p2 = createPerson('b', 2);
// 面向对象: 继承、封装、多态
// 多态: 重载和重写
// js中不存在重载，方法名相同时，后面的把前面的覆盖掉
// js可重写: 子类重写父类的方法

// 13构造函数模式: 创建一个自定义类, 并且创建这个类的实例
// 1.js 中所有的类都是函数数据类型的, 所有实例都是对象数据类型的
// 2.构造函数中, 类中（函数体中）出现的this.xxx中的this是当前类的一个实例，注意和方法中的this区分
// 3.构造函数创建的实例是单独的个体，所有私有属性（函数）不相等
// 构造函数模式和工厂模式的区别
// 1、函数执行时
// 普通函数执行 -> createPerson()
// 构造函数模式 -> new CreatePerson() // 通过new构造一个新对象(类)，类名大写
// p1 为CreatePerson类的一个实例
// 2、在函数执行的时候
// 相同：都形成一个私有的作用域，然后 形参赋值 -> 预解释 -> 代码从上到下执行
// 不同点：1.在代码执行之前，不用自己在手动创建Obj对象 
//        2.接下来代码从上到下执行，以当前的实例为执行主体，进行初始化赋值
//        3.(new)最后函数将新的实例(Object)返回
//          注意：不同实例之间的方法(地址)不一样，实例为不同个体，私有属性之间不相等
function CreatePerson(name, age) {
    //var obj = {}; // new Object() 浏览器默认穿件对象，不用自己手动创建(不同点1)，以当前对象为主体this(不同点2)
    this.name = name;
    this.age = age;
    this.speak = function() {
            console.log("my name is " + this.name);
        }
        // 4.在构造函数中，类(函数体)中的this为类中的一个实例
}
var p1 = new CreatePerson('a', 1);
// 区分this的区别 .
p1.speak() // speak -> this 为p1
var p2 = CreatePerson('b', 2); //普通函数执行,没有返回值， p2 = undefined，方法中的this是window
CreatePerson.speak() // not function!!!  构造函数没有创建实例！从原型上理解
    // 内置类创建数组
    // var ary = []; // 字面量方式
    // var ary = new Array(); // 实例创建模式
    // 两者都是Array类的实例

// 14.构造函数模式扩展
function Fn() {
    // 私有作用域中的私有变量，与实例无关
    var x = 10;
    // this为当前实例
    this.x = 100;
    this.getX = function() {
        // 根据getX执行对象决定，p2.getX() 指 p2
        console.log(this.x);
    }
}
var f1 = new Fn;
var t = f1.getX();
t(); // this 为 window，输出undefined
console.log(f1.x) //->100
    // 1、在构造函数模式中new Fn()执行，如果Fn不需要传递参数的话，后面的小括号可以省略
    // 2、this的问题：在类中出现的this.xxx中的this都是当前类的实例，而某一个属性值(方法)，方法中
    //    的this需要看方法执行的时候，前面是否有"."，才能确定this为谁
    // 3、类作为普通函数执行时，var x是当前形成的私有作用域中的私有变量，和实例无关，而this.x才是实例的私有属性
    // 4、在构造函数中，浏览器会默认返回实例(对象数据类型的值)，如果我们手动写return返回，new
    //    如果返回的是一个基本数据类型的值，当前实例不变，例如：return 100;
    //    如果返回的是一个引用数据类型的值，当前的实例会被自己返回的值替换掉，例如：return {name: 'c'}, f1就不再是Fn的实例，而是对象{name: 'c'}
function Fn() {
    var x = 10;
    this.x = 100;
    this.getX = function() {
        console.log(this.x);
    }
    return; // 添加return的区别
}
var f1 = new Fn();
// 5、检查一个实例是否属于这个类 -> instanceof
//   console.log(f1 instanceof Fn)  // typeof
//   console.log(f1 instanceof Object) // js中所有引用类型为对象
//   其中typeof不能细分object下的对象、数组、正则...
// 6、f1和f2都是Fn这个类的实例，都拥有x和getX两个属性，且为私有
console.log(f1.getX === f2.getX); //->false
//   检测某一个属性是否属于这个对象:
// in: 检测某一个属性是否属于对象(arr in object), 不管私有属性还是公有属性，只要存在都是true
console.log('getX' in f1);
// hasOwnProperty: 用来检测某个属性是否为这个对象的“私有属性”
console.log(f1.hasOwnProperty('getX'))
    // 检查某一个属性是否为该对象的“共有属性”， 自定义hasPubProperty
function hasPubProperty(obj, attr) {
    return (attr in obj) && !obj.hasOwnProperty(attr)
}
// 7、isPrototypeOf 是否是原型属性

// 15.原型链模式基础
// 解决实例之间相同的属性和方法的问题
// 1. 每一个函数数据类型（普通函数、类）都有prototype(原型)，为对象数据类型
// 2、在prototype上浏览器给其添加了属性constructor(构造函数),属性值是当前构造函数本身（指向当前类本身）
// 3、每一个对象数据类型（普通对象、实例、prototype）有属性__proto__，属性值是当前实例所属类的prototype(原型)
function Fn() {
    this.x = 100;
}
Fn.prototype.getX = function() {
    console.log(this.x);
}
var f1 = new Fn();
var f2 = new Fn();
console.log(Fn.prototype.constructor === Fn) //->true
console.log(f1.__proto__ === Fn.prototype) //->true
console.log(Fn.prototype.__proto__ === Object.prototype); //->true
// Objects是js中所有对象的基类（最顶层的类）
// 1、f1 instanceof Object -> true 因为f1通过—__proto__可以向上级查找，最终为Object
// 2、在Object.prototype上没有__proto__属性(唯一没有__proto__属性的对象)
// 3、原型链模式
// f1.hasOwnProperty('x')
// 通过 对象名.属性名查找时，查找顺序为 私有属性 -> __proto__的属性 ->  最终查找到Object.prototype的属性
f1.getX === f2.getX - > true
f1.__proto__.getX === f2.getX - > true
f1.getX === Fn.prototype.getX - > true
    // 在IE浏览器中，禁止使用__proto__
f1.sum = function() {}; // 修改私有sum,没有添加
f1.__proto__.sum = function() {} // 修改所属类原型的sum
Fn.prototype.sum = function() {} // 所有浏览器通用方式！
    // 控制台查看方法
console.dir(Array) 简写 dir(Array) // 打印对象所有属性和方法
console.log("%d年%d月%d日", 2011, 3, 26);
// 打印分组
console.group("第一组信息");　　　　
console.log("第一组第一条:我的XX");　　　　
console.log("第一组第二条:");　　
console.groupEnd();
// 显示网页的某个节点（node，getElementById）所包含的html/xml代码
console.dirxml()
    // 16 原型链模式扩展-this 和原型扩展
    // 在原型模式中，this常用的有两种情况：
    // 在类中this.xxx=xxx, this->当前类的实例
    // 某一个方法中的this->看执行的时候.前面的是谁
var f = new Fn;
f.getX(); // this为实例
f.__proto__.getX(); // this为f.__proto__实例
Fn.prototype.getX(); // thisw为f.__proto__实例
// 在内置类的原型上扩展我们的方法：数组去重
Array.prototype.myUnique = function() {
        let obj = {};
        for (let i = 0; i < this.length; i++) {
            let cur = this[i];
            if (obj[cur] == cur) {
                this[i] = this[this.length - 1];
                this.length--;
                i--;
                continue;
            } else {
                obj[cur] = cur;
            }
        }
        obj = null;
        return this; // 实现链式写法
    }
    // 自实现
var ary = [1, 2, 3, 4]
ary.sort();
for (var i = 1; i < a.length; i++) {
    if (a[i] === a[i - 1]) {
        a.splice(i, 1);
        i--;
    }
}
// 链式写法
// 原理：返回Array.prototype.sort\reverse返回数组，而pop()返回数组栈顶值
ary.sort(function(a, b) {
    return a - b;
}).reverse().pop();
// 实现slice(start, end)
// 1.slice(s, e), slice(s), sclie(), s > e, s\e < 0, s\e不是负数
// push 使用 ary[ary.length - 1] = xxx;
Array.prototype.mySlice = function(s, e) {
        let res = [];
        let l = this.length;
        let i, j;
        if (typeof s === 'undefined') {
            s = 0;
        }
        if (typeof e === 'undefined') {
            e = l;
        }
        if (l == 0 || s >= l || s == e || e == 0 || (s >= 0 && (e > 0 ? e < s : l + e <= s)) || e <= -l || (s < 0 && (e > 0 ? e <= s + l : s < e))) {
            return res
        } else {
            s %= i;
            e %= l;
            if (e == 0) {
                e = l;
            }
            if (s < 0 && e < 0) {
                i = s + l;
                j = e + l;
            } else if (s < 0 && e > 0) {
                i = s + i;
                j = e;
            } else if (s > 0 && e < 0) {
                i = s;
                j = e + l;
            } else { // s > 0 && e > 0
                i = s;
                j = e;
            }
            for (; i < j; i++) {
                res[res.length] = this[i];
            }
        }
        return res;
    }
    // 2.实现(5).plus(10).reduce(2)
Number.prototype.plus = function(next) {
        // 正则判断 -要转义
        // let reg = /^\-?[0-9]+.?[0-9]*$/;
        // reg.test(next)
        if (isNaN(next)) {
            alert('Not number');
            return;
        }
        // valueOf()返回数值,  toString()返回字符串
        let sum = next + this.valueOf();
        return sum;
    }
    // 17. 原型链拓展： 批量设置共有属性
function Fn() {
    this.x = 100;
}
// 1. 起别名
var pro = Fn.prototype; // jq实现
pro.getX = function() {}
pro.getY = function() {}
Fn.constructor === Fn
    // 2. 重构原型对象方式
    // 重新开辟堆内存，将原先浏览器默认开辟的对象替换掉
Fn.prototype = {
    // 手动添加constructor！完全构成构造函数的prototype，否则没有constructor
    // jquery方法，否则为默认Object
    constructor: Fn, //返回对创建对象的函数引用：test.constructor == Array
    getX: function() {},
    getY: function() {}
}
var f = new Fn;
// 如果没有设置constructor, 新开辟的对象[没有]contructor，沿__proto__向上查找，为Object
f.constructor == Object
    // [但是]浏览器屏蔽以替换原型类型prototype对象的方式
Array.prototype = {
        // 以这种方式定义contructor, 该属性可枚举（原生不可枚举）
        constructor: Array,
        unique: function() {}
    }
    // [允许]通过原型上直接修改内置方法，所以在内置类的原型上增加方法，命名都需要加特殊的前缀
Array.prototype.sort = function() { console.log(this) }

// 18. 深入扩展原型链模式常用的六种继承方法
// 字面量和构造函数创建引用类型的类型一样
var o1 = {};
var o2 = new Object();
// 而基本数据类型不同
var n1 = 1;
var n2 = new Number(1); // 构造函数创建的严格的实例，为Object类型
// obj.propertyIsEnumberable('key') true // 私有属性判断
// for-in 循环遍历时可把自己私有的和所属类原型上扩展的属性和方法都可以遍历
for (var key in obj) {
    // if (obj.propertyIsEnumberable(key)) {
    //     console.log(key)
    // }
    // 更常用
    if (obj.hasOwnProperty(key) {
            console.log(key)
        })
}
// Object.create()创建一个拥有原型和若干指定属性的对象, E5增加，与IE6~8不兼容
// 克隆相同对象
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        obj1[key] = obj[key]
    }
}
obj1.__proto__ === Object;
obj2 = Object.cteate(obj); // obj 为obj2的原型
obj2.__proto__.__proto__ === Object;
// Object.create()原理
function object(o) {
    function Fn() {}
    Fn.prototype = o;
    return new Fn; // 返回新的实例
}
// 1、原型继承(js中最常用)
// #div.__proto__ -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype ->
// Node.prototype -> EventTarget.prototype -> Object.prototype
// document.__proto__ -> HTMLDcoment -> Document -> Node.prototype
// B 继承父类中所有属性和方法（私有和共有），变成子类共有属性和方法
B.prototype = new A;
// B运用A中的方法，属性
var b = new B;
b.__proto__.x = 2000 === B.prototype.x = 2000
    // 2、call继承
    // call继承：把父类私有的属性和方法[克隆]一份一模一样的作为子类私有的属性
function A() {
    this.x = 100;
}
A.prototype.getX = function() {
    console.log(this.x);
}

function B() {
    // 将父类当做普通函数执行，this -> n
    A.call(this);
}
var n = new B;
n.getX();
// 3、对象继承
// 把父类私有的、共有的 [克隆]一份一模一样的给子类私有的
function B() {
    // this -> n
    var temp = new A;
    for (var key in temp) {
        // 用.hasOwnPropoty() 判断可形成和call继承一样效果
        this[key] = temp[key];
    }
    temp = null;
}
var n = new B;
// 4、混合模式继承：原型 + call 继承
function A() {
    this.x = 100;
}
A.prototype.getX = function() {
    console.log(this.x);
}

function B() {
    A.call(this); // A执行第1次
}
B.prototype = new A; // A执行第2次，且B多一个属性：B.prototype: x =100
B.prototype.constructor = B;
var n = new B;
n.getX();
// 5、寄生组合式继承
function A() {
    this.x = 100;
}
A.prototype.getX = function() {
    console.log(this.x);
}

function B() {
    A.call(this);
}
B.prototype = Object.create(A.prototype); // B.prototype为A.prototype, 从内存创建上理解
B.prototype.constructor = B;
var n = new B;
n.getX();
// 为兼容IE6-8的Object.create方法不能使用
function objectCreate(o) {
    function fn() {}
    fn.prototype = o;
    return new fn;
}
// 6、中间类继承法 -不兼容IE 操作__ptoto__
// 求(去除最大最小值的)平均数
function avgFn() {
    // Array为构造函数，无实例中的方法
    Array.prototype.sort.call(arguments, function(a, b) {
        return a - b;
    });
    Array.prototype.pop.call(arguments);
    Array.prototype.shift.call(arguments);
    return (eval(Array.prototype.join.call(arguments, "+")) / arguments.length).toFixed(2);
}
console.log(avgFn(1, 23, 4, 56));
// arguments在函数中为Object类型，而不是Array类型
function avgFn() {
    arguments.__proto__ = Array.prototype;
    arguments.sort(function(a, b) {
        // true交换
        return a - b;
    });
    arguments.pop();
    arguments.shift();
    return arguments.reduce(function(a, b) { return a + b });
}
console.log(avgFn(1, 23, 4, 56));
// 19 原型链综合复习参考
function Fn() {
    this.x = 100;
    this.y = 200;
}
Fn.prototype.getX = function getX() {
    console.log(this.x);
}
Fn.prototype.setX = function(n) {
        this.x = n;
    }
    // 1.确定this，函数前执行是否有.，有为对象，没有为window
    // 2.替换查找的对象
    // 3.按原型链向上查找
var f1 = new Fn;
f1.getX(); //-> 100
f1.__proto__.getX() //->undefined
Fn.prototype.setX(300); // 设置原型Fn.prototype的this.x
f1.getX(); // 100
f1.__proto__.getX(); // 300
f1.setX(500); // 设置f1的this.x
f1.getX(500); // 500
// 内置方法支持链式写法，有return this
var a = 2;
var b; // undefined
a + b // 2
    //->div、a、document、body
    // http://javascript.ruanyifeng.com/
div
// 属性：
// childNodes:NodeList 文档、元素、元素属性、文本、注释都为节点
// firstChild: 第一个子节点
// lastChild: 
// nextSibling: 下一个节点
// previousSibling
// parentNode

// .style.  所有style属性
// IE
// childElementCount: 子元素个数
// children：HTMLCollection(类Array)，[i]访问，储存子元素
// firstElementChild: 第一个element子元素
// lastElementChild: 
// nextElementSibling: 下一个兄弟element元素
// previousElementSibling
// parentElement

// *attributes:NamedNodeMap(类Array)  储存div所有属性
// className, id, tagName, hidden(style属性?), localName. nodeName, textContent,  nodetype
// clientHeight, clientWidth: padding+内容 
// clientLeft, clientTop : border宽度
// offsetHeight, offsetWidth: (padding+内容 = clientXXX) + border宽度
// offsetLeft, offsetTop, 相对于版面或父坐标offsetPartent的位置信息
// offsetPartent 返回父节点
// scrollHeight, scrollLeft: 滚动区域的总宽高
// scrollTop, scrollWidth: 已滚动(屏幕外)的高度

// innerHTML, outerHTML, innerText, outerText(设置(包括标签)或获取(不包括标签)对象的文本)

// 从DOM层次来看，nodeName是node 接口上的property，而tagName是element 接口上的property，所有的节点
// （元素节点，属性节点，文本节点等12种）都继承了node接口，而只有元素节点才继承了element节点，因此nodeName
// 比tagName具有更大的使用范围。