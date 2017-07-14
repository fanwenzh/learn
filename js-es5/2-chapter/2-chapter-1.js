// 20 原型深入
// 获取元素方法 
document.getElementById // 上下文是document  //HTMLDocument -> Document
document.getElementsByName // 上下文是document
document.getElementsByClassName // 元素  // HTMLDivElement -> HTMLElement ->Element
document.getElementsByTagName // 元素
    // css方法
document.querySelector
document.querySelectorAll

document.documentElement
document.body

document.forms
document.images
    // 屏幕宽高(html)
document.documentElement.clientWidth
document.documentElement.clientHeight
document.documentElement.clientTop
document.documentElement.clientLeft
    // 屏幕宽高, 多用于兼容IE
document.body.clientHeight
document.body.clientWidth
document.body.clientLeft
document.body.clientTop

// #div.__proto__ -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype ->
// Node.prototype -> EventTarget.prototype -> Object.prototype
// document.__proto__ -> HTMLDcoment -> Document -> Node.prototype

// 21 函数的三种角色：理解Function的原型链
// 所有函数都是Function函数类的一个实例
Function.prototype.__proto__ === Object.prototype， 函数本身就是Objcet
Function.__proto__ === Function.prototype // funcition anonymous(){}
Object.__proto__ 没有__proto__;
// 函数属性：
// length: 形参的个数
// name: 函数名
// prototype 类原型，在原型上定义的方法都是当前Fn这个类实例的共有方法
// ___proto__ 作为对象的函数，指向Function类的原型对象
// 函数的多面性
// 1.普通函数: 执行时形成私有作用域（闭包），形参赋值，预解释，代码执行后栈内存 销毁/不销毁
// 2.类: 有自己的实例，prototype指向自己的原型，其实例指向自己的原型
// 3.普通对象：和var obj ={}中的obj一样，为普通对象，可以有自己的私有属性，通过__proto__找到Function.prototype
// 三者没有必然关系
function Fn() {
    var num = 500; // 作为函数定义私有变量
    this.x = 100; // 作为类，私有属性
}
Fn.prototype.getX = function() {
    console.log(this.x);
}
Fn.aaa = 1000; // 作为对象
var f = new Fn; // 构造函数创建，只与this, __proto__ 有关系，即Fn内的this 和 prototype

f.num // -> undefined
f.aaa // -> undefined // 和Fn作为类没有关系
var res = Fn(); // Fn中的this位window
res // undefined 
Fn.aaa //1000
    // Function.prototype 是函数数据类型，但相关操作和之前一样：类型anonymous

// 22 call 方法深入
// Function.prototype.call = function (){} // 原型上定义call
// 原理：让原型上的call方法执行，在执行call方法时，让fn方法中的this变成obj
// 作用：改变函数执行时的this
function fn() {
    console.log(this);
}
fn.call(obj);
// 模拟call方法
Function.prototype.myCall = function(context) {
    // 1.fn中的this 改为 context
    // this.toString().replace('this', 'context');
    // 2.执行fn方法
    // this();
}
Function.prototype.myCall = function(x) {
    x = x || {};
    x['fn'] = this;
    var args = ''; //参数列表
    var type;
    for (var i = 1; i < arguments.length; i++) {
        if (typeof arguments[i] === 'string') { //参数是字符串，需要在两边加引号，因为在拼接参数的时候会被丢掉
            type = '"' + arguments[i] + '"';
        } else if (typeof arguments[i] === 'function') { //参数是函数的话，"反编译"出函数的代码
            type = arguments[i].toString();
        } else if (typeof arguments[i] === 'object') { //数组和对象可能含有复杂的组合类型数据，可以通过遍历变量转成字符串
            if (/function Array()/.test(arguments[i]['constructor'])) { //参数是数组则在数组两边加上[,]
                type = "[" + arguments[i] + "]";
            } else {
                type = JSON.stringify(arguments[i]) //对象的话，json化，然后执行的时候反json化
            }
        } else {
            type = arguments[i]; //数字类型
        }
        args = args + type + ',';
    }
    args = args.slice(0, args.length - 1); //去掉最后的逗号
    var q = new Function('var x = arguments[0];x.fn(' + args + ')') //new Function的时候作用域是独立的，无法访问call里面的x，所以需要传进去
    q(x);
}

function fn1() { console.log(1) }

function fn2() { console.log(2) }
// 首先让fn1通过原型链机制找到Function.prototype上的call方法并执行，此时call中的this为fn1
// 在call方法执行过程中，先让fn1中的"this"变为fn2,然后再[fn1]这个方法执行
// 注意：执行的是fn1
fn1.call(fn2); // 1
Function.prototype.call = function(context) {
        // 1.fn中的this 改为 context
        // this.toString().replace('this', 'context');
        // 2.执行fn方法
        // this(); -> fn2()
    }
    // fn1.call 首先fn1通过原型链找到 Function.prototype上的call，然后再让call方法通过原型整改带Function.prototype
    // 在第二次找到call的时候让方法执行，方法中的this为fn1.call，首先让这个方法中的this变为fn2，让后再让fn1.call执行，
    // 简单来说：第一个call使第二个call的this变成了fn2，函数从右往左执行！
    // 输出结果2
fn1.call.call(fn2); // 2
// 令temp = fn1.call
// temp.call(fn2) -> 让call方法执行，call的this是temp，temp中的this改为fn2，再让temp执行
fn1.call.call.call(fn2) // 2 
    // Function.prototype为anonymous类型的空函数
    // Function.prototype中的this改为fn1 -> 执行 Function.prototype -> this() 空函数误操作
Function.prototype.call(fn1); // undefined
FUnction.prototype.call.call(fn1); // 1

// 23 call、apply、bind
var obj = { name: 'fwz' }

function fn(num1, num2) {
    console.log(num1 + num2);
    console.log(this);
}
// 严格模式: "use strict"; 
fn(100, 200); // this->window, num1 = 100, num2 = 200
fn.call(100, 200); // this->100, num1 = 200, num2 = undefined // NaN
fn.call(null); // this->window
fn.call(undefined); // this->window
fn.call(obj, 100, 200)
fn.apply(obj, [100, 200])
    // call, apply // 改变this, 并执行fn函数
    // bind: 在IE6~8下不兼容
    // 预处理：将函数this 和 其参数值赋给变量，用时直接执行
fn.bind(obj, 1, 2) // 只是改变this, 并没有执行fn函数，返回将fn改变后的结果返回
var tempFn = fn.bind(obj, 1, 2);
tempFn();
// 24 获取数组最大值
// 1、arr.sort(), arr[0], arr[arr.length - 1]
// 2、var max, min 进行遍历
// 3、Math.min(), Math.max()
var min = Math.max.apply(null, ary);
// toString() 或 join()
var max = eval("Math.max(" + ary.toString() + ")");
// 4、eval() 将内部转换为js环境
// 5、括号表达式, 将最后一项的值传入其中
function fn1() { console.log(1); }

function fn2() { console.log(this); }
var obj = { name: 'fwz', fn: fn2 }
    (fn1, fn2)() // this -> window
    (fn1, obj.fn)() // this -> window
    (obj.fn)() // this -> obj

// 25 求平均数
var avg = arr.reduce(function(a, b) { return a + b; }) / arr.length;

function avgFn() {
    // agruments 为类数组集合，不能使用数组方法
    var arr = [];
    // for (let i = 0; i < arguments.length; i++) {
    //     arr[i] = arguments[i];
    // }
    // 利用Array.prototype.slice
    arr = Array.prototype.slice.call(arguments)
    arr = [].slice.call(arguments)
    ary.sort(function(a, b) { return a - b; });
    arr.shift();
    arr.pop();
    // 利用Array.prototype.sort.call
    // Array.sort.call(arguments, function(a,b){return a - b;});
    // [].shift.call(arguments);
    // [].pop.call(arguments);
    // return (eval([].join('+')) / arguments.length).toFixed(2);
    return (eval(arr.join('+')) / arr.length).toFixed(2);
}

// 26类数组转换为数组
function fn() {
    var ary = [].slice.call(arguments);
}
var divs = document.getElementsByTagName('div'); // HTMLCollection元素集合，类数组
divs.item(); // 返回指定位置的节点
divs.namedItem('name1'); // 从集合中取回带有指定名称的节点或元素
var oLis = document.getElementsByName('name'); // NodeList节点集合，类数组
divs.item();
// 在IE6~8浏览器中，不支持借用数组的slice实现将（HTMLCollection和NodeList）元素集合的类数组转换为数组
// 但对于arguments借用数组方法，不存在任何兼容性问题
// 因此需要通过循环实现array赋值，解决方法try,catch机制
// try, catch浏览器异常信息捕获
try {
    console.log(num);
} catch (e) {
    // console.log(e.message); // 得到错误信息
    // 手动抛出异常, 终止向下执行
    throw new Error('你的人品已经欠费，活该');
    // new ReferenceError -> 引用错误，常量没定义
    // new TypeError -> 类型错误
    // new RangeError -> 范围错误
} finally {
    // 一般不用
}
console.log('ok')
    // 解决方式
function listToAry(likeAry) {
    var ary = [];
    try {
        ary = Array.prototype.slice.call(likeAry);
    } catch (e) {
        // 解决IE6-8兼容
        for (let i = 0; i < likeAry.length; i++) {
            ary[i] = likeAry[i];
        }
    }
    return ary;
}

// 27 sort深入研究
var ary = [
    { name: '中1', age: 1 },
    { name: '中2', age: 2 },
    { name: '中3', age: 3 },
    { name: '中4', age: 4 },
]
ary.sort(function(a, b) {
    // return parseFloat(a.age) - b.age;
    // localeCompare: string用字符的 Unicode 编码比较字符串(通俗理解：转化为pingyin后排列)
    return a.name.localeCompare(b.name);
})

// 28json操作
// Json是对象数据类型
var obj = { name: "fwz", age: 7 };
var jsonObj = { "name": "fwz", "age": 7 }
    // JSON的属性名用双引号包含起来
    // window.JSON
    // 1. JSON.parse()      //json字符串转对象
    // 2. JSON.stringify()  //json对象转字符串
    // 在IE6~7浏览器中，window下没有JSON对象
    // JSON格式的字符串转JSON对象
eval("(" + str + ")"); // 经验：浏览器标志JSON格式
// JSON对象转JSON格式

// 29数据绑定及dom回流
// css设定文本超出行宽自动截取，并用...显示
// text-overflow: ellipsis; // ellipsis: 截取后以...作为省略，clip: 没有省略号
// overflow: hidden; // 隐藏溢出
// white-space: nowrap; // 强制不换行
// js的Dom操作class
var oUl = document.getElementById('ul1')
var oLis = oUl.getElementsByTagName('li') // HTMLcollection的实例
function changeBg() {
    this.sytle.backgroundColor = "pink";
}

function recoverBg() {
    this.stype.backgroundColor = "";
}
// Array.prototype.forEach.call(oLis, function(){})
for (let i = 0; i < oLis.length; i++) {
    oLis[i].onmouseover = changeBg;
    oLis[i].onmouseleave = recoverBg;
}
// 1.动态创建元素节点的方式并把它追加到页面中的方式实现数据绑定，对原来HTML元素没有影响
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    var oLi = document.createElement("li");
    oLi.innerHTML = "<span>" + i + "</span>" + cur.title;
    oUl.appendChild(oLi);
}
// 缺陷：多次触发重排重绘
// 2.字符串拼接的方式：首先循环需要绑定的数据，然后把需要绑定的标签以字符串的方式拼接到一起，最后添加到页面中
var str = "";
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    str += "<li><span>" + i + "</span>" + cur.title;
}
oUl.innerHTML += str;
// 弊端: 原来前3个li绑定的事件消失；
// 原因: oUl.innerHTML = oUl.innerHTML(把原来的li元素以字符串的形式获取) + str, 以字符串拼接的形式添加入页面中
// 浏览器还需要把字符串渲染成为对应的标签
// 初始化时可以使用（效率高），常用 -> 如模板引擎jade

// js中Dom的重排(reflow)和重绘
// 重排：页面中的HTML结构发生改变（增加、删除元素、位置变化），浏览器重新计算DOM结构，并进行渲染
// 1.Dom元素的几何属性发生变化
// 2.Dom树的结构变化
// 3.获取某些元素
// offsetTop、offsetLeft、offsetWidth、offsetHeight
// scrollTop、scrollLeft、scrollWidth、scrollHeight
// clientTop、clientLeft、clientWidth、clientHeight
// getComputedStyle() 
// 重绘：某一个元素的样式发生变化（如背景），浏览器只需要重新渲染当前的元素

// 3.文档碎片
var frg = document.createDocumentFragment(); //临时创建html容器，__proto__为DocumentFrament的实例
for (var i = 0; i < ary.length; i++) {
    var cur = ary[i];
    var oLi = document.createElement("li");
    oLi.innerHTML = "<span>" + i + "</span>" + cur.title;
    frg.appendChild(oLi);
}
oUl.appendChild(ftg);
frg = null; // 切记将内存释放
// 不影响原HTML元素绑定的事件

// 30表格排序及dom映射
// 1.把HTMLCollection转换为数组
var ary = utils.listToArray(oLis);
// 2.将数组按li的text内容大小排序
ary.sort(function(a, b) {
        return parseInt(a.innerText) - parseInt(b.innerText);
    })
    // 3.按照ary中存储的最新顺序把对应Li添加到页面中
var frg = document.createDocumentFragment();
for (var i = 0; i < ary.length; i++) {
    frg.appendChild(ary[i]);
}
oUl.appendChild(frg); // 由于dom映射，oUl的li数量不变（再次添加同一元素）
frg = null;
// dom映射机制：页面中的标签和JS中获取到的元素对象（元素集合）绑定，
// 页面中的HTML结构发生改变，Js中获取的元素同时发生改变（不需要重新获取）
var oUl = docuemnt.getElementById("ul1");
var oLis = oUl.getElementsByTagName("li");
console.log(oLis.length); // 5
var oLi = document.createElement("li");
oUl.appendChild(oLi);
console.log(oLis.length); // 6，根据页面内容发生改变