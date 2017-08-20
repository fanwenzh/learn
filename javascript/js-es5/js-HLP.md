### 数据类型
- Array
    // reverse, splice, // copyWidthin 改变数组
    join, reverse //改变数组并返回印用本身
    sort // 中文按字典序: str1.localCompare(str2)
    push, pop, unshift, shift, length,
    concat(合并, 不改变原数组)
    splice // 改变原数组，返回取出子数组
    slice //从原字符串取出子字符串并返回，不改变原字符串
    indexOf, lastIndexOf
    every(所有元素返回true时返回true), filter, forEach(遍历), map(不改变原数组), some(有一个元素返回true时返回true)
    reduce, reduceRight, item == []
        [].copyWithin(target, start, end)
- String
    concat, slice(start, end), substr(s, length) // l < 0 则 l = 0, substring(s, e) // e<0 变substring(0, s)
    indexOf, lastIndexOf // 返回尾部第一个顺数位置
    trim, toUpperCase, toLowerCase
    match, search, replace, split //四个可RegExp匹配
        str.replace(otherStr, function(subs, index, str){})
    localeCompare //字典序比较
- Function
    arguments.callee
    arguments.callee.caller
    call, apply, bind
- RegExp
    exec, test, RegExp.$n
- Number
    toFixed, toString(2)
- Bollean
    valueOf() true / false
    toString()
    "true" / "false"
- Date
toString, toUTCString
    .now, getTime, getFullYear, getMonth + 1, getDate, getDay, getHours, getMinutes, getSeconds
- Math
max, min, ceil, floor, round, random, abs

### 类型检测方法
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

### Object相关
Object.getOwnPropertyDescriptor;
Object.defineProperty;
Object.getPrototypeOf;
Object.keys(); // for in 可枚举类型
Object.getOwnPropertyNames(); // 无论是否可枚举，输出自定义属性名
.isPrototypeOf();
.hasOwnProperty();
.delete(key);

window
encodeURI, decodeURI 转换所有空格符 % 20
encodeURIComponent, decodeURIComponent, 转换所有非字母数字字符
location.assign(url), .href = url.replace
http: //   www.baidu.com  :8000   / dir /   ?cb=fn    #section
    location.hostname, port, pathname, search( ? query) hash
navigator
userAgent
screen
history
go, back, forward

视口大小:
    document.documentElement.clientHeight, document.documentElement.clientWidth
(显示屏大小)移动设备
window.innerHeight, window.innerWidth

DOM:
    dom1的Node接口
nodeType: element为1, attribute为2, text为3, comment为8, document为9
    // 返回Node类型 - IE9后返回节点
nextSibling, previousSibling, parentNode, firstChild, lastChild
方法: appendChild(node), insertBefore, removeChild, replaceChid
document
    .title, domain, URL
forms, images // 集合
getElementById, getElementsByName
createElement("link"), createDocumentFragment
element
nodeType, nodeName, className
// 因为getAttribute在IE7,8表现不一致P226，推荐style操作
getAttribute, setAttribute, removeAttribute

ie8用jq
dom扩展: ie9及以上支持, addEventListener, removeEventListener
elememt
querySelector, querySelectorAll, getElementByClassName
// *.className: add, contains, remove, toggle
// .nodeName == "DIV", nodeType == 1
// 返回elememt类型
// childElementCount, firstElementChild, lastElementChild, previousSibling, nextElementSibling
// 自定义属性
// <div data-appID = "123" > < /div>
// var appid = div.dataset.appID;
// innerHTML, outerHTML(包括本身), innerText *
滚动
// 2,3,4由 Safari和Chrome实现
scrollIntoView(ture / false), scrollIntoViewIfNeeded() // 作用对象是元素的容器
scrollByLines(), scrollByPages() // 对用对象是元素自身
dom2
    .getComputedStyle(ele, [伪类null]).width //以后用这个！
    .currentStyle //ie8+
event
cancelable = true, stopPropagation(), stopImmediatePropagation() // 包括任何被调用的事件
preventDefault(), returnValue = false // ie6~8

触摸设备
不支持dblclick事件
轻击屏幕触发: 单击会触发mousemove事件, 随后触发mousedown, mouseup, click事件
两指随屏幕移动会触发mousewheel和scroll事件

表单脚本
bn.disabled = true;
bn.timer = window.setTimeout(function() {
    bn.disabled = false;
    window.clearTimeout(bn.timer);
}, 500);
form.submit()
提交内容标签select, select multiple, input, textarea
button(type = "button reset submit")
支持blur, change, focus事件
富文本操作

canvas

HTML5脚本编程
corss - document messaging: XML
    //http://www.zhangxinxu.com/study/201202/web-messing-cross-document-messaging-window.html
var message = "";
// 改变message即可触发
window.addEventListener("message", function(e) {
    if (event.origin == "http://www.wrox.com") {
        pressesMassage(e.data);
        // e.souce == window
        e.source.postMessage("Received!", "http://www.wrox.com")
    }
})
拖放事件: P482
目标元素: dragstart, drag, dragend
可有效放置元素: dragenter, dragover, dragleave或drop
e.dataTrasfer 对象
媒体元素
video, audio

错误实例:
    // if (value)在url(2 K = 2048 个字符长度限制) 以查询形式发送数据给服务器前, 要进行 encodeURIComponent() 编码
    // 使用Image发送错误: 避免跨域限制, 所有浏览器支持Image对象, 不一定支持XMLHttpRequest
    // var img = new Image()
    // img.src = "错误信息";

    进度事件:
    // xhr.onload = uploadComplete;
    // xhr.onerror =  uploadFailed;
    // xhr.upload.onprogress = progressFunction 传输过程不断调用
    // xhr.upload.onloadstart
    // xhr.upload.onloadend
    var data;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        data = xhr.responseText;
    }
};
xhr.onprogress = function(e) {
    let divStatus = document.getElementById("status");
    if (e.lengthComputable) {
        divStatus.innerHTML = "Received" + e.loaded + " of " + e.total + " bytes";
    }
};
xhr.open("post", "url", true);
xhr.send(form);

跨域处理：
1. CORS(Cross - Origin Resource Sharing)
    // 客户端添加Origin报文头
    // Origin: url
    // Access-Control-Request-Method:*
    // Access-Control-Request-Headers:*
    // 服务器返回允许报文头
    // Access - Control - Allow - Origin: * // 
    // Access - Control - Allow - Methods: POST, GET
    // Access - Control - Allow - Headers: 允许的头部
    // Access - Control - Max - Age: 17200
Ajax请求
2. JSONP, 图片ping(不能接收返回数据)
3. Web Sockets:
    // ws(s安全)自定义协议
    // WebSocket.readyState
    // 1正在建立连接, 2已经建立连接, 3正在关闭连接, 4已经关闭连接
    // .onopen, .onerror, .onclose
    var socket = new WebSocket("wss://www.example.com/server.php");
socket.onmessage = function(e) {
    var data = e.data;
}
socket.send("data");
4. postmessage, ie11
    postMessage(JSON.stringify(data), targetOrigin)
```
    window.frames[0].postMessage('getcolor','http://lslib.com');
    window.addEventListener('message',function(e){})
```
5. node 代理（证书未了解！）

惰性载入: 保存兼容判断结果
函数柯里化
高级定时器: p611
    // 仅当没有该定时器的任何其他代码实例时, 才将定时器代码添加到队列中. 
    // 产生两个问题:(1)某些间隔时间的定时器被跳过. (2)多个定时器代码之间的执行间隔可能比预期小
setInterval(function() {}, 300)
    // 解决方案
setTimeout(function() {
    setTimeout(arguments.callee, interval);
}, 300)

HTMLElement, HTMLCollection, NodeList解析
Element, Text, Comment等节点的基类为Node, ELEMENT_NODE 1, TEXT_NODE 3, COMMENT_NODE 8
nodeType = 1
document.getElementById // 只取得Element节点
    .nextElementSibling // 下一个element节点
    .nextSibling // 下一个element节点
    .parentNode // 父element节点
    .tagName == "DIV" //大写
el.hasChildNodes()
el.cloneNode(true) // 深度复制, () 浅复制
el.hasAttibutes()
el.attributes.length
el.nodeName == "DIV" // BODY, #text, 