原生js操作
// previousElementSibling, nextElementSibing, 
// childElementCount, firstElementChild, lastElementChild

// previousSibling, nextSibing
// firstChild, lastChild, children[]
// appendChild, removeChild, replaceChild

// 37正则表达式
// 1. 判断字符串是否符合规则
    /
    \d / .test()
    // 2. 捕获符合正则的字符串
    /
    \s / .exec("1") // -> ["1", index: 0, input: "1"]
    // (1)创建方式
    // 字面量方式
var reg = /\d/;
// 实例创建方式
var reg = new RegExp("");
// 只能用实例创建方式, 且需要将字面量创建的转义 \, 待试验* . ? + $ ^ [ ] ( ) { } | \ /
var name = "test"
var reg = new RegExp("^\\d+" + name + "\\d+$", "g");

// 38正则的元字符
// 元字符：每一个正则表达式式由元字符和修饰符组成，在//之间具有意义的字符
// 1.特殊元字符
// \ :转义字符, ^ 开头, $ 结尾, 
// \n: 匹配一个换行符, . 匹配除\n以外的任意字符
// (): 分组, RegExp.$1,
// x|y: x或y， [xyz]: xyz任一字符， [^xyz]除了xyz的人一个字符，[a-z]
// \d: [0-9], \D 除了0-9以外的所有字符
// \b: 一个边界符, "w1 w2 w3" -> ""|w1| |w2| |w3|", \B匹配除了边界符以外的
// \w: 数字、字母、下划线的任一个字符, [0-9a-zA-Z_], \W
// \s: 匹配一个空白符、空格、制表符、换页符, \S
// 2.两次元字符
// * 0-n, + 1-n, ? 0-1, {n}, {n, }, {n, m}

正则使用规则：
// 1.中括号中出现的所有字符都代表字符本身[+.\]
// 2.使用|要用()分组，改变默认优先级
reg = /^18|19$/ // (^18)|(19&), (^1)8|1(9$),(^18)|1(9^)...所以需要用()分组

// 39 - 40 正则实例
// 1、匹配有效数字的正则，正数、负数、零、小数
// 1). 可以出现时，后面需跟1个或多个数字
// 2)+/- 可有可无
// 3)整数部分可以是0-9，多位数不能以0开头
var reg = /^[-+]?(\d|([1-9]\d+))(\.\d+)?$/;
// 2、18~65之间
var reg = /^(1[8-9]|[2-5]\d|6[0-5])$/; // |的优先级最低
// 3、验证邮箱
// fwz13680@qq.com.cn
//  | 最低优先级
var reg = /^[\w.-]+@[0-9a-zA-Z]+(\.[a-zA-Z]{2,4}){1,2}$/;
// 4、中国标准真实名字 2-4位汉字（ASCII判断）
var reg = /^[\u4e00-\u9fa5]{2,4}$/;
// 5、身份证号码
// 18位，最后一位是数字或X
var reg = /^\d{17}(\d|X)$/ // 或 /^\d{17}[\dX]$/ 
    // reg = /^\d{17}(\d|X)$/
    // 省 市县  生日     填充 男 
    // 13 0828 19901204 06  1 7
    // reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|X)$/

// 41正则捕获的懒惰性（只捕获第一个符合规定的字符串）和贪婪性（匹配尽可能多的字符）
// exec
// 捕获的内容格式 或 null（为null后lastIndex自动修改为0）
// 1)捕获到的内容是一个数组: 
// ["大正则捕获内容", index: "开始的索引位置", "原始字符串"]
// 2、正则捕获特点
// 1)exec只捕获第一个匹配的内容
// lastIndex: 正则每一次捕获在字符串中开始查找的位置，默认值为0
// 2)修饰符
// global(g):全局匹配
// ignoreCase(i):忽略大小写
// multiline(m):多行匹配
// var reg = /\d+/g; // 添加g全局，自动改变lastIndex
// 获取所有匹配字符串
// var ary = [];
// var res = reg.exec(str)
// while(res) {
//     ary.push(res[0]);
//     res = reg.exec(str);
// }
// console.log(res);
// 2、解决正则的贪婪性,?在正则中的作用
// 1)在普通元字符后代表出现0-1次，/\d?/ 
// 2)放在一个量词后面的元字符后面取消捕获的贪婪性
// var reg = /\d+?/g; 
// var str = "qwe123qwe123qwe123"
// reg.exec(str); // ->"1"
// 3、String中的match方法->把所有正则匹配都捕获到
// var ary = str.match(reg); // ary得到同上的结果
// 但是match无法捕获小正则()的内容?

// 42分组捕获
// 1、改变优先级
// 2、分组引用
// \2代表和第一个分组一样的内容(字符完全相同)，包括匹配的值
var reg = /^(\w)\2\1(\w)$/
    // 3、捕获大正则和小正则的内容
    // (?:)在分组中?:的意思是只匹配，不捕获
reg = /(\d{2})w(\d{2})/
var str = "12w34w56w78";
// ary[0]:大正则（reg）捕获的内容，小分组ary[n]（n>0）,index为大正则起始位置
// 无g情况下与上相同
var ary = reg.exec(str); // ["12w34", "12", "34", index: 0, input: "12w34w56w78"]
str.match(reg); // 贪婪匹配：["12w34w56w78", index: 0, input: "12w34w56w78"]
// String.match() 有g情况下，只能捕获所有符合大正则的内容
reg = /(\d{2})w(\d{2})/g
reg.exec(str); //["12w34", "12", "34", index: 0, input: "12w34w56w78"], index累加
str.match(reg); //["12w34", "56w78"]
RegExp.$1 // 在IE不兼容

// 43replace
// 实现原理
str = "hello1hello2";
/\d+/g.exec(str); // ["1", index:0, input:"hello1hello2"]
str.replace(/\d+/g, "hiBaby");
// 多次执行exec，捕获所有符合正则的匹配，而后把捕获内容替换
str = str.replace(/\d+/g, function() {
    console.log(arguments); // 1. ["1", 0, "hello1hello2"]
    return "hiBaby"; // 无return，返回undefined
})
str = str.replace(/(\d+)/g, function() {
        // arguments: totalContent, fragement ,index, input
        console.log(arguments[1]); // [1]为捕获到的第一个分组序列 ,输出["1","1", 0, "hello1hello2"]
        return "hiBaby"; // 无return，返回undefined
    })
    // 实例
var str = "20170613"
var ary = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
str = str.replace(/\d/g, function() {
    return ary[arguments[0]];
})

// 44 正则捕获实例
String.prototype.match = function(reg) {
        // 还要判断g, i, m, function...
        var ary = [];
        var res = reg.exec(this);
        while (res) {
            ary.push(res[0]);
            res = reg.exec(this);
        }
        return ary;
    }
    // 分组替换, 模板引擎实现原理
var str = "my name is {0}, may age is {1}, I love {2}";
var ary = ["fan", 26, "js"];
var reg = /{(\d+)}/g
str.replace(reg, function() {
        return ary[arguments[1]];
        // return ary[RegExp.$1]; // 在IE6-8上不兼容
    })
    // 获取url中的参数值
strPro.myQueryURLParameter = function() {
    var reg = /([^?&=]+)=([^?&=]+)/g,
        obj;
    this.replace(reg, function() {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}

// 45replace案例
// replace在不使用正则的情况下，replace执行一次只能替换第一次查找到的内容
var str = "qwe111qwe222qwe333";
str = str.replace("qwe", "fff").replace("qwe", "fff");
// 全局匹配可用正则//g；
// 1)正则表达式捕获几次，获取内容几次（执行exec几次）
// arguments[0]  大正则捕获内容
// arguments[1]  index:开始捕获的索引
// arugments[2]  index:需捕获的原始字符串
// 可以获取小分组捕获内容！
// 2)return 返回需要替换的内容
str = str.replace(/qwe/g, function() {
        return ""
    })
    // 输出出现最大次数的字母
str = "qweasdkdfzoijdfkjer";
// 1)统计所有的次数
var obj = {};
str.replace(/[a-z]/gi, function() {
        var val = arguments[0];
        obj[val] >= 1 ? obj[val]++ : obj[val] = 1;
    })
    // 2)获取最多出现的次数
var maxNum = 0;
for (var key in obj) {
    obj[key] > maxNum ? maxNum = obj[key] : null;
}
// 3)获取所有出现maxNum次数的字母
var ary = [];
for (var key in obj) {
    obj[key] === maxNum ? ary.push(key) : null;
}
console.log(ary.toString());

// 46 时间字符串格式化
var str = "2015-06-10 14:53:00";
// var reg = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})\s{1}(\d{2}):(\d{2}):(\d{2})$/;
// 正则中的空格可以直接用 表示
var reg = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2}) +(\d{2}):(\d{2}):(\d{2})$/;
var res = str.match(reg);
// str.replace(reg, function(){
//     var ary = ([].slice.call(arguments)).slice(1, 7);
// })
var resStr = "{0}年{1}月{2}日 {3}时{4}分{5}秒";
resStr.replace(/{(\d)}/g, function() {
    var num = arguments[1];
    var val = res[parseInt(num) + 1];
    val.toString().length < 2 ? val = "0" + val : null;
    return val;
})

// 47数据类型检测的四种方式
// 1、typeof
// 返回 字符串，对应其数据类型
// 如："number"、"string"、"object"、"undefined"、"function"、"boolean"
// 局限性：1.typeof null -> "object"
//        2.不能细分数组、正则、对象、null，都返回"object"
function fn(num, callback) {
    if (typeof num === "undefined") {
        num = 0;
    }
    // num = num || 0; //但num = false时，依然为0
    // typeof callback === "function" ? callback() : null;
    callback && callback();
}
// 2、intanceof 检测某一实例是否属于某类
var obj = [12, 23];
console.log(obj instanceof Array);
// 局限性：
// 1.不能处理用字面量方式创建出来的基本数据类型值
// 对于基本数据类型(1, "", true, undefined, null), 字面量方式创建和实例创建方式不同，严格来说，只有实例创建出来的结果才是标准的对象数据类型
// 1 instaceof Number      -> false // 非严谨实例
// true instanceof Boolean -> false
// "" instanceof String    -> false
// new Number(1) intanceof Number -> true
// typeof new Number(1)    -> "object"
// 2.instanceof的特性，只要在当前实例的原型链上，检测结果都是true
// 3.在浏览器中不允许运用instanceof检测 null, undefined，所属类Null和Undefined不允许在外访问
// 3、constructor
var obj = [];
console.log(obj.constructor === Array); //false
var num = 1;
console.log(obj.constructor === Number); //true
// 可以处理基本类型
// 局限性：把类原型constructor覆盖后，检测出来的结果不准确
// 4、Object.prototype.toString.call()  //最常用最准确
// -> "[object Object]" 第一个object是当前实例是对象数据类型（固定）
// 第二个Object代表的是obj所属的类Object
//  Object.prototype.toString.call()检测
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(RegExp); // "[object RegExp]"
Object.prototype.toString.call(new Date); // "[object Date]"
Object.prototype.toString.call("123"); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object undefined]"
Object.prototype.toString.call(function() {}); // "[object Function]"
var reg = /^\[object Array\]$/
console.log(reg.test());
// 5、toString的理解
// 1.对于Number、String、Boolean、Array、RegExp、Date、Function
// 原型上的toString方法是把当前的数据转换为字符串 或 把数字转化为2/8/10进制的书，.toString(2)
// 2.Object.prototype.toString的作用是返回当前方法执行主体(方法中的this)
// 所属类的详细信息，可用于类型判断
console.log((1).toString()) // "1"-> Number.prototype.toString 转化为字符串
    //"[object Object]" -> Object.prototype.toString()
console.log((1).__proto__.__proto__.toString());
.toString(2) //转2进制
var obj = { name: "fwz" };
// 运用的是Object.prototype.toString()
console.log(obj);
// for(var key in obj);
// Object:对象Object数据类型的基类的构造函数或Object对象
// Object.prototype.hasOwnProperty\isPrototypeOf\propertyIsEnumerable
//                 \toString\toLocalString\valueOf

// 48 正则深入-replace应用千分符
var str = "9348128381" //9,348,128,381
    // 正则以字母为单位替换
var reg = /\d(?!$)/g;
str.replace(reg, function(r, i) {
        // r 为原匹配字符串，i 为index;
        // arguments: 0 原匹配，1 index, 2 str
        if ((str.length - i - 1) % 3 === 0) {
            return r + ",";
        } else {
            return r;
        }
    })
    // 或
reg = /(\d)(?=(\d{3})+$)/g
    // $1为第一个小括号的捕获
str = str.replace(reg, "$1,");

// 正则正向预测匹配
str.replace(/(?=(\d{3})+$)/g, ',');
// 上面function解释
str.replace(/(?=(\d{3})+$)/g, function() {
    // arguments[0] === null, ?=正向预测不捕获
    return ','
})

// 转换为数组翻转拼接
str = str.split("").reverse().join("");
str = str.replace(/\d{3}/g, function() {
    return arguments[0] + ',';
})
str = str.split("").reverse().join("");

// 49 正则复习
// ? 的使用
// 1.? 两次 0或1
var reg = /^(\+|-)?\d+(\.\d+)?$/; // \+|- 而不是 \+ | \-
var reg = /^[+-]?\d+(\.\d+)?$/; // []内为原字符字母
// 2.匹配不捕获:()内的?:
var reg = /^(?:\+|-)?\d+(?:\.]d+)?$/;
// 3.非懒惰匹配：量词后加?, 如+?
// 4.正则断言：必须有括号（但不被捕获），仅是设置条件if
// (?=exp), (?!exp) //修饰左边  (?<=exp), (?>!exp) // 这两个方法js不支持，修饰右边
// /d{3}(?!/d)      匹配三位数字，而且这三位数字的后面不能是数字（修饰后面，?!放置在后面））

// 去除重复
str = str.replace(/(\w)\1+/g, "$1");

// 替换所有注释 <!-- 奥术大师多 -->
var reg = /<\!--[\s\S]*? -->/g
    // 检验非空
    !/^\s*$/.test(str);
// 去首尾空格
String.prototype.trim = function() {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
    // 性能提升
String.prototype.trim = function() {
    var str = this,
        str = str.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
}

// 在ES5的严格模式下是不能使用
// argument.callee