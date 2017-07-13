// 基本数据类型
// Number\ String\ Boolean \null \undefined

//  引用数据类型
// object: {}\ []\ /^$/ \Date
// function
第一章
第一节
1 预解释
// 1、浏览器加载hmtl是，提供全局js代码执行的环境 -> window\ global
// 2、在作用域中，js代码执行前，浏览器对所有var、function进行声明或定义
// (1) 理解声明和定义
// 声明 declare
// 定义 defined
// （2）var和function的区别
// var -> (声明提升)预解析是只提前声明 undefined
function - > 预解析时声明并定义(所以肯定提前)
    // (3)预解析只发生在当前作用域下，只有函数执行时才会对函数内的进行解析
    // 3、js中内存的分类
    // 栈内存：用来提供供js代码执行的环境（函数执行一次形成一个栈内存）
    // 堆内存：用来存储引用数据类型的值 -> 对象存储的是属性名和属性值，函数存储的是d代码字符串（声明并赋值形成堆内存）
2 作用域链、 闭包
// 1、如何区分私有变量和全局变量
// 1)在全局作用域下声明（预解释）的变量是全局变量
// 2)在“私有作用域中声明的变量var!”和“函数的形参”都是私有变量
// 2、当函数执行时，首先形成私有作用域
// 1)如果有形参，先给形参赋值
// 2)进行私有作用于中的预解释
要和if() {}
中的var声明(提升至全局) 区别
    // 3)私有作用域中的代码从上到下执行
    // （作用域链）如果是私有变量（已声明或预解释时再次声明, 只执行声明以外的事情，如赋值），则与外域无关系；
    // 如果不是私有变量，向上级作用域查找，直至window
    // （闭包）函数执行时形成的私有作用域保护私有变量不受外界干扰的机制
3 全局变量的细节
// 没有var声明，直接赋值在window中，没有声明提升
// a = 1;
4 预解析机制
// console.log(('num' in window))
// 1）if(){}中的var声明（提升至全局,不同于c++）,而函数内形成私有作用域
// 2) 预解释时只对'='左边的，右边的值不参与预解释
// 匿名函数预解释时，fn = undefined
// var fn = function(){}
// 3)在全局作用域中(window)，执行函数定义的function在全局作用域下不进行预解释，当代码执行到这个位置时定义和执行一起完成
// 自执行函数：
// (function(num){})(100)
// 自定义自执行函数：
// ~function(num){}(100)
// +function(num){}(100)
// -funciton(num){}(100)
// !function(num){}(100)
// 4)函数内return后的代码不执行，但会进行预解释
// 5)在预解释时候，如果变量（名字）已经声明过了，不进行重新声明，但会重新赋值
fn(); //->2
function fn() { console.log(1) };
fn(); //->1
var fn = 3;
fn(); //->not function
function fn() { console.log(2) };
fn(); //->2
5 如何查找上级作用域
// 看当前函数是在哪一个作用域下定义的，那么他的上级作用域就是谁,注意与this区别
// 和函数在哪执行没有任何关系
var num = 12;

function fn() {
    var num = 120;
    return function() { // 返回新的内存地址
        console.log(num);
    }
}
var f = fn(); // 返回函数内存地址
f(); //->120
~ function() {
    var num = 1200;
    f(); //->120
}()
6 内存的释放和作用域销毁
// 堆内存
// 对象数据类型或函数数据类型在定义时开辟堆内存，内存有一个引用地址
// 如果外面变量知道这个地址，则内存被占用，不能销毁
var obj1 = { name: '张三' };
var obj2 = obj1;
// 内存地址没有被指向，浏览器空闲时会销毁（javascript高级程序设计）
// chrome 定期检查内存地址有没被指向 
// ie, firefox 计数器（引用次数）为0，销毁内存
obj1 = null;
obj2 = null;
// 栈内存
// 1）全局作用域
// 只有当页面关闭的时候全局作用域才会销毁
// 2）私有作用域（只有在函数执行时会产生私有作用域）
// 当私有作用域中的代码执行完成后，我们当前作用域会进行释放和销毁
// 若干私有作用域内存被作用域外的变量占用，则不能销毁（设置为null的重要作用）
// a、函数执行返回引用数据类型的值，且给函数外参数赋值
// b、通过dom方法获取的元素、元素集合都是对象数据类型的值（dom.onclick = function(){}）
// c、fn返回的函数没有被其他东西占用，但是还需要执行一次，暂时不销毁，当返回值的值执行
// 完成后，浏览器会在空闲的时候把他销毁
function fn() {
    var num = 100;
    return function() {}
}
fn()(); // 函数执行完成后，浏览器空闲时销毁
7 作用域练习题
1) let i = 5;
console.log(2 + (i++) + (++i) + (++i) + (i++)) // ->30
    // 2 + 5 + 7 + 8 + 8 = 30 
2)

function fn() {
    var i = 10;
    return function(n) {
        console.log(n + (++i))
    }
}
var f = fn(); // 创建作用域(栈), 返回地址被存储，内存不销毁(注意：永远不会改变栈中的声明定义的值)
f(10); // ->21
f(20); // ->32
fn()(10); // 立即执行函数创建执行作用域(栈)，执行完后销毁 ->21
fn()(20); // 立即执行函数创建执行作用域(栈)，执行完后销毁 ->31
var g = fn();
g(30) //->41
3)

function fn(i) {
    //其实执行了 var i 赋值 
    return function(n) {
        console.log(n + i++);
    }
}
var f = fn(13);
f(12); //->13 + 12 = 25
f(13); //->14 + 13 = 27
fn(15)(12); //->27
fn(16)(13); //->29
8 this关键字
// 函数中的this
// js中的this代表的是当前行为执行的主体(obj)，js中的context代表的是当前行为执行的环境（区域）
// 小明在沙县小吃 吃蛋炒饭,this->小明，context->沙县小吃
// this和函数定义在哪，在哪执行没有关系
// 1、函数执行，查看前面是否有'.', 没有点this为window
// 2、自执行函数中的this永远是window
// 3、给元素的某一个事件绑定方法，当事件触发时执行对应的方法，方法中的this是当前元素
// 实例中的this只对象本身
function fn() {
    console.log(this);
}

function sum() {
    // this->window
    fn(); //this->window
}
sum();
var oo = {
    sum: function() {
        // this->oo
        fn(); //this->window
    }
}
oo.sum() // sum的this->oo, fn的this->为window
document.getElementById("div1").onclick = function() {
    // this->#div1
    fn(); //this->window
}
9 综合练习题
var num = 20;
var obj = {
    num: 30,
    fn: (function(num) { // (A)返回地址被fn引用，当前栈内存作用域不销毁
            this.num *= 3; // ->window.num *= 3 为60
            num += 15;
            var num = 45; // 已定义num，不进行再次声明
            return function() { // 私有作用域被外域fn引用，因此匿名函数作用域不销毁
                this.num *= 4;
                num += 20;
                console.log(num);
            }
        })(num) // 全局num -> 20, 局部obj.num -> 30 或 this.num
};
var fn = obj.fn;
fn(); // 形成栈内存作用域
// this.num *= 4 -> window.num *= 4 -> 240
// num += 20 -> obj.num += 20 -> 45 + 20 = 65 
obj.fn(); // 形成新的栈内存作用域
// this.num *= 4 ->obj.num *= 4 -> 120
// num += 20 -> A下的num = 85
console.log(window.num, obj.num); // 240, 120
10 综合实战题
// 按钮累计按键次数
// 1、利用全局变量
var count = 0;
var oBtn = document.getElementById('oBtn');
var span = document.getElementById('span');
oBtn.onclick = function() {
        count++;
        span.innerHTML = count;
    }
    // 2、利用自执行函数
    ~ function() {
        var count = 0;
        oBtn.onclick = function() {
            count++;
            spanNum.innerHTML = count;
        }
    }()
oBtn.onclick = (function() {
    var count = 0;
    return function() {
        count++;
        spanNum.innerHTML = count;
    }
})();
// 弊端:有一个不销毁的私有作用域,占用少量内存
// 3、利用innerHTML的方式处理，每次获取最新之，然后累加，再赋值回去
oBtn.onclick = function() {
        spanNum.innerHTML++; // ++可默认转化为Number类型
        // spanNum.innerHTML = parseInt(spanNum.innerHTML) + 1；
    }
    // 弊端：每一次都需要把页面中的内容先转换为字符串然后再累加，累加完再重新添加回去，
    // 获取和添加过程都需要浏览器重新渲染
    // 4、利用自定义属性存储（推荐）
oBtn.count = 0;
oBtn.onclick = function() {
    spanNum.innerHTML = ++oBtn.count;
}