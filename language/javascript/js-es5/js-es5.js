// 数据类型
// Array
	[].reverse, .splice, copyWidthin(target, start, end) // 改变数组
	[].join, reverse // 改变数组并返回引用本身
	sort // 中文按字典序：str1.localCompare
	[].push, pop, unshift, shift, lenth
	concat // 合并复制
	splice // 改变原数组，取出子数组
	slice // 不改变原数组，取出子数组
	indexOf, lastIndexOf
	every(fn), some, filter, forEach, map(不改变原数组)
	reduce, reduceRight
// String
	cancat(+), slice(start, end), substr(s, length) // / l < 0 则 l = 0, substring(s, e) // e<0 变substring(0, s)
	indexOf, lastIndexOf
	trim, toUpperCase, toLowerCase
	match, search, replace, split // 四个函数可与RegExp匹配
	str.replace(otherStr, function(subs, index, str){})
	localeCompare() // 字典序比较
// Number
	toFixed, toString(2)
// Bollean
	true.valueOf() // true、false
	toString // 'true'、'false'
// Date
	toString, toUTString
	.now, getTime, getFullYear, getMonth + 1, getDate, getDay, getHours, getMinutes, getSeconds
// Math
	max, min, ceil, floor, round, random, abs
// Function
	arguments.callee // 自身
	arguments.callee.caller // 调用的函数
	call, apply, bind
// JSON
	JSON.stringify()
	JSON.parse()
  
// 类型检测
1. typeof
   返回 字符串，对应其数据类型
   如："number"、"string"、"object"、"undefined"、"function"、"boolean"
   局限性：1.typeof null -> "object"
          2.不能细分数组、正则、对象、null，都返回"object"
2. intanceof
    局限性：
    1.不能处理用字面量方式创建出来的基本数据类型值
    对于基本数据类型(1, "", true, undefined, null), 字面量方式创建和实例创建方式不同，严格来说，只有实例创建出来的结果才是标准的对象数据类型
    1 instaceof Number      -> false // 非严谨实例
    true instanceof Boolean -> false
    "" instanceof String    -> false
    new Number(1) intanceof Number -> true
    typeof new Number(1)    -> "object"
    2.instanceof的特性，只要在当前实例的原型链上，检测结果都是true
    3.在浏览器中不允许
3. constructor
    var obj = [];
    console.log(obj.constructor === Array); //false
    var num = 1;
    console.log(obj.constructor === Number); //true
    可以处理基本类型
    局限性：把类原型constructor覆盖后，检测出来的结果不准确
4. Object.prototype.toString.call()  //最常用最准确
    Object.prototype.toString.call([]); // "[object Array]"
    Object.prototype.toString.call(RegExp); // "[object RegExp]"
    Object.prototype.toString.call(new Date); // "[object Date]"
    Object.prototype.toString.call("123"); // "[object String]"
    Object.prototype.toString.call(true); // "[object Boolean]"
    Object.prototype.toString.call(null); // "[object Null]"
    Object.prototype.toString.call(undefined); // "[object undefined]"
	Object.prototype.toString.call(function() {}); // "[object Function]"
	
// Object相关
Object.getOwnPropetyDescriptor
Object.defineProperty
Object.getPrototypeOf
Object.keys(); // for in 可枚举类型
Object.getOwnPropertyNames(); // 无论是否可枚举，输出自定义属性名
.isPrototypeOf()
.hasOwnProperty()
.delete(key)

//window
	encodeURI, decodeURI // ecodeURI 转换所有空格符 % 20
	encodeURIComponent, decodeRIComponent // 转换所有非字幕数字字符
	location.assign(url), .href = url.replace
	// http: //   www.baidu.com  :8000   / dir /   ?cb=fn    #section
    //     location.hostname, port, pathname, search( ? query) hash
    navigator
    userAgent
    screen
    history: go, back, forward

// 视口大小:
    document.documentElement.clientHeight, document.documentElement.clientWidth
// (显示屏大小)移动设备
	window.innerHeight, window.innerWidth
	
// DOM:
// dom1Node接口:
    nodeType: element为1, attribute为2, text为3, comment为8, document为9
        // 返回Node类型 - IE9后返回节点
    nextSibling, previousSibling, parentNode, firstChild, lastChild
    方法: appendChild(node), insertBefore, removeChild, replaceChild
// document
    .title, domain, URL
    forms, images // 集合
    getElementById, getElementsByName
    createElement("link"), createDocumentFragment
    element
    nodeType, nodeName, className
    // 因为getAttribute在IE7,8表现不一致P226，推荐style操作
	getAttribute, setAttribute, removeAttribute
// dom扩展
	addEventListener, removeEventListener
	querySelector, querySelectorAll, getElementByClassName
	// *.className: add, contains, remove, toggle
	// .nodeName == "DIV", nodeType == 1
	// 返回elememt类型
	// childElementCount, firstElementChild, lastElementChild, previousSibling, nextElementSibling
// 自定义属性
// <div data-appID="123"></div>
// var appid = div.dataset.appID;
// innerHTML, outerHTML(包括本身), innerText *

// 滚动
scrollIntoView(ture / false), scrollIntoViewIfNeeded() // 作用对象是元素的容器
scrollByLines(), scrollByPages() // 对用对象是元素自身
// dom2
    .getComputedStyle(ele, [伪类null]).width //以后用这个！
    .currentStyle //ie8+
// event
	cancelable = true, stopPropagation(), stopImmediatePropagation() // 包括任何被调用的事件
	preventDefault() // ie6~8

// 触摸设备
// 不支持dblclick事件
// 轻击屏幕触发: 单击会触发mousemove事件, 随后触发mousedown, mouseup, click事件
// 两指随屏幕移动会触发mousewheel和scroll事件

HTMLElement, HTMLCollection, NodeList
ELement, Text, Comment等节点的基类为Node
ELEMENT_NODE 1, TEXT_NODE 3, COMMENT_NODE 8
document.getElementById
	.nextElementSbling // 下一个element节点
	.nextSibling // 下一个element节点
	.parentNode // 父element节点
	.tagName == "DIV"
el.hasChildNodes()
el.cloneNode(true) // true为深复制
el.hasAttributes()
el.attributes.length
el.nodeName == "DIV"