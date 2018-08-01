### 基本数据类型
- 基本数据类型5: Undefined, Null, Number, String, Boolean
- 引用数据类型: Array、Function、Math、Date、JSON、RegExp、Error
判断:
- 精确区分: Object.prototype.toString.call(obj) === "[object Array]"
- 模糊区分方法3: .constructor, instanceOf, typeof  
- isNaN, Array.isArray()

### 预解释：
- 理解声明和定义
	declare 声明 var a;
	defined 定义 var a = 1;
	var -> (声明提升)预解析是只提前声明 undefined
	function -> 预解析时声明并定义(声明提升)
- 内存管理
	栈内存: 用来提供供js代码执行的环境（函数执行一次形成一个栈内存）
	堆内存: 用来存储引用数据类型的值 -> 对象存储的是属性名和属性值, 函数存储的是d代码字符串(声明并赋值形成堆内存)

	自执行函数:
	~function(num){}(100)

### 事件模型
	DOM0:绑定冒泡阶段事件。
	DOM2事件流：从顶document沿DOM树至底目标，而后自底向上传播返回document, 即先捕获后冒泡，IE6~8不支持: attachEvent, detachEvent。
	阻止事件流传播：支持addEventListener, stopPropagation(); IE6~8: cancelBubble=true;
	阻止事件默认行为：支持addEventListener, preventDefault(); IE6~8: returnValue=false;
	事件委托/事件代理：利用事件冒泡的原理，将事件加到目标节点的父级节点上，触发执行效果。
	ie6~8中 change、select、submit、reset 事件均不产生事件冒泡, 所以以上事件不要依赖事件冒泡机制委托给其祖先元素处理。

### 面向对象
- this 
	1. `foo()`的调用形式被称为Function Invocation Pattern, 注意这里的foo是作为单独的变量出现，而不是属性。foo函数体中的this永远为Global对象，在浏览器中就是window对象。
	2. `foo.bar()`的调用形式被称为Method Invocation Pattern，注意其特点是被调用的函数作为一个对象的属性出现，必然会有“.”或者“[]”这样的关键符号。
	3. `new foo()`这种形式的调用被称为Constructor Pattern, 在这种模式下，foo函数内部的this永远是new foo()返回的对象。
	4. `foo.call(thisObject)`和`foo.apply(thisObject)`的形式被称为Apply Pattern, 在这种模式下，`call`和`apply`的第一个参数就是foo函数体内的this，如果thisObject是`null`或`undefined`，那么会变成Global对象。
	this 总结： 函数在哪里声明，以及调用含this的方式;

- 作用域：函数作用域，全局作用域，es6{}作用域

- property相关函数
	hasOwnProperty, propertyIsEnumberable, isPrototypeOf, Object.getPrototypeOf
	Object.create()
- 原型链顶端对象 Object.prototype
  获取原型对象方法：
	var a = {}
	* Object.getPrototypeOf(a)
	a.__proto__
	a.constructor.prototype

	* Function.__proto__ === Function.prototype 
	* Object.__proto__ 没有__proto__

- 设计模式
	单例: var person = {}
	工厂: function Persion() {
		var obj = {};
		return obj;
	}
	构造函数: function Persion(){this.attr1 = 1}
	构造函数+原型链函数:

- 继承
	实例继承：__proto__
	构造函数继承: prototype
	function C{B().call(this)}
	es5: Object.create(B)
	es6: class C: extend B{constructor(){super()}}
- DOM
	childNodes:NodeList 文档、元素、元素属性、文本、注释都为节点
	- node节点操作
		firstChild: 
		lastChild: 
		nextSibling: 
		previousSibling
		parentNode
	- element 节点操作
		childElementCount: 子元素个数
		firstElementChild: 第一个element子元素
		lastElementChild: 
		nextElementSibling: 下一个兄弟element元素
		previousElementSibling
		parentElement
		children: HTMLCollection(类Array)，[i]访问，储存子元素

	- DOM的增删改
		createElement
		document.createDocumentFragment()
		appendChild
		insertBefore          // 父节点调用，添加在某一子节点
		cloneNode(true/false) // 克隆节点内的所有元素/只克隆当前节点
		replaceChild
		removeChild
		get/set/removeAttribute

		document.createDocumentFragment, document.createElement
	- className, id, tagName, localName. nodeName, textContent,  nodetype

	- 属性
		.style.  所有style属性
		box.currentStyle.height // ie6~8
		window.getComputedStyle(dom, [null":after"]).height
		*attributes:NamedNodeMap(类Array)  储存div所有属性
		innerHTML, outerHTML, innerText
	- 位置内容长度相关
		clientHeight, clientWidth: padding+内容 
		clientLeft, clientTop : border(边框)宽度
		offsetHeight, offsetWidth: (padding+内容 = clientXXX) + border宽度
		offsetLeft, offsetTop, 相对于版面或父坐标offsetPartent的位置信息
		offsetPartent 返回父节点
		scrollHeight, scrollLeft: 滚动区域的总宽高
		scrollTop, scrollWidth: 已滚动(屏幕外)的高度
	
	- 盒子模型：
		DOM盒子模型
		clientHeight, clientWidth, clientTop, clientLeft
		offsetHeight, offsetWidth, offsetTop, offsetLeft, offsetParent
		scrollHeight, scrollWidth, scrollTop, scrollLeft

		css盒子模型
		margin, padding, box-sizing:border-box
muse-ui
```js
	// 获取距离的document的offset
	let getOffset = function (el) {
	  let box = el.getBoundingClientRect()
	  let body = document.body
	  let clientTop = el.clientTop || body.clientTop || 0
	  let clientLeft = el.clientLeft || body.clientLeft || 0
	  let scrollTop = window.pageYOffset || el.scrollTop
	  let scrollLeft = window.pageXOffset || el.scrollLeft
	  return {
	    top: box.top + scrollTop - clientTop,
	    left: box.left + scrollLeft - clientLeft
	  }
	}
```

### dom深入
- 获取元素方法 
	document.getElementById // 上下文是document  //HTMLDocument -> Document
	document.getElementsByName // 上下文是document
	element.getElementsByClassName // 元素  // HTMLDivElement -> HTMLElement ->Element
	element.getElementsByTagName // 元素
- css方法
	document.querySelector
	document.querySelectorAll
- dom 内置
	document.documentElement
	document.body
	document.forms
	document.images
- 视窗宽高(html)
	document.documentElement.clientWidth == window.innerWidth
	document.documentElement.clientHeight == windwo.innerHeight
	document.documentElement.clientTop == 0
	document.documentElement.clientLeft == 0
- 屏幕宽高, 多用于兼容IE
	document.body.clientHeight
	document.body.clientWidth
	document.body.clientLeft == 0
	document.body.clientTop == 0
	- 原生
	元素距离左侧和顶部的位置:
	let { left, top } = util.offset(ele)
	距离屏幕的高度：
	.getBoundingClientRect() : {top: 308, right: 381.140625, bottom: 332, left: 317.140625, width: 64…}
	- jq
	获取页面某一元素的绝对X,Y坐标，可以用offset()：
	var X = $(‘#DivID’).offset().top;
	var Y = $(‘#DivID’).offset().left;
	获取相对(父元素)位置:
	var X = $(‘#DivID’).position().top;
	var Y = $(‘#DivID’).position().left;
- 继承
	#div.__proto__ -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype ->
	Node.prototype -> EventTarget.prototype -> Object.prototype
	document.__proto__ -> HTMLDcoment -> Document -> Node.prototype

	Function.prototype.__proto__ === Object.prototype， 函数本身就是Objcet
	Function.__proto__ === Function.prototype // funcition anonymous(){}
	Object.__proto__ 没有__proto__;
	- 函数属性：
	// length: 形参的个数
	// name: 函数名
	// prototype 类原型，在原型上定义的方法都是当前Fn这个类实例的共有方法
	// ___proto__ 作为对象的函数，指向Function类的原型对象

	JSON.parse(), JSON.stringify()

	js中Dom的重排(reflow)和重绘
	重排：页面中的HTML结构发生改变（增加、删除元素、位置变化），浏览器重新计算DOM结构，并进行渲染
	1.Dom元素的几何属性发生变化
	2.Dom树的结构变化
	3.获取某些元素
	offsetTop、offsetLeft、offsetWidth、offsetHeight
	scrollTop、scrollLeft、scrollWidth、scrollHeight
	clientTop、clientLeft、clientWidth、clientHeight
	getComputedStyle() 
	重绘：某一个元素的样式发生变化（如背景），浏览器只需要重新渲染当前的元素

    - 表格排序操作
    table // cellspacing, cellpadding = "0"
    thead tbody tr th
    var table = document.getElementById("tab");
    // 表格特有属性：第一行rows[0], 所有列cells
    var oThs = table.tHead.rows[0].cells;
    // 获取tBody
    var tBody = table.tBodies[0];
    // 获取第一行所有列
    var oRows = tBody.rows;

- 正则匹配
    var reg = new RegExp("^\\d+" + name + "\\d+$", "gim");
    reg.test(), .exec(): ["大正则捕获内容", index: "开始的索引位置", "原始字符串"] or null
    str.match(reg): 把所有正则匹配都捕获到
	// 元字符：每一个正则表达式式由元字符和修饰符组成，在//之间具有意义的字符
	// 1.特殊元字符
	// \ :转义字符, ^ 开头, [^] 非, $ 结尾, 
	 \n: 匹配一个换行符, . 匹配除\n以外的任意字符
	// (): 分组, RegExp.$1,
	// x|y: x或y， [xyz]: xyz任一字符， [^xyz]除了xyz的人一个字符，[a-z]
	 \d: [0-9], \D 除了0-9以外的所有字符
	// \b: 一个边界符, "w1 w2 w3" -> ""|w1| |w2| |w3|", \B匹配除了边界符以外的
	 \w: 数字、字母、下划线的任一个字符, [0-9a-zA-Z_], \W
	 \s: 匹配一个空白符、空格、制表符、换页符, \S
	.为任意字符
	// 2.两次元字符
	// * 0-n, + 1-n, ? 0-1, {n}, {n, }, {n, m}

	// $1-$9存放着正则表达式中最近的9个正则表达式的匹配结果，这些结果按照子匹配的出现顺序依次排列。 
	// 除了replace中的第二个参数可以省略RegExp之外，其他地方使用都要加上RegExp, 即RegExp.$1
	// 去除重复
	str = str.replace(/(\w)\1+/g, "$1");
	// 划分类名
	var ary = className.replace(/(^ +| +$)/, "").split(/ +/g);

	?的作用
	1)在普通元字符后代表出现0-1次，/\d?/ 
	2)放在一个量词后面的元字符后面取消捕获的贪婪性 +?
	3)(?:)在分组中?:的意思是只匹配，不捕获
	4)正则正向预测匹配(?=): str.replace(/(?=(\d{3})+$)/g, ','); // 非?!

### css
	/*可省*/
    var box = document.getElementById("d1");
  * box.getAttribute("id");  
    box.attributes.getNamedItem("id");
    var typ = document.createAttribute("class");  // 创建新的attr节点
    typ.nodeValue = "democlass";                  // 设置节点value
    box.attributes.setNamedItem(typ); // 参数：Node
    box.attributes.item(0);
    box.attributes.removeNamedItem("name");

    // class, contains(), toggle
    box.className.add("123");
    box.className.remove("123");
    box.className += " text100";

	/*检查兼容*/
    /MSIE [6-8]/.test(navigator.userAgent)
	navigator.userAgent.indexOf("MSIE 8.0")

### 懒加载
	// 已加载图片不再进行处理
    if (curImg.complete) {
        continue;
    }

    function lazyImgs(ele) {
		// if(ele.isLoad === true) return;
		if(ele.complete == true) return;
        var oImg = new Image;
        oImg.src = ele.getAttribute("trueImg");
        oImg.onload = function() {
            ele.src = oImg.src;
            ele.style.display = "block";
            oImg = null;
        }
        ele.isLoad = true; //自添加元素
    }

    background: url() no-repeat center center // 添加默认图

    /*清除子元素浮动对父级的影响*/
    /*overflow: hidden;*/
	/*清除哥哥元素浮动对子元素的影响*/
    /*clear:both;*/

- 优化
    作用：保证页面打开速度（3s内首页打不开算死亡页面）
    原理：
    1）对于首屏内容中的图片：首先给对应的区域一张默认图片（<5kb）
    首屏内容加载完成后，再加载图片
    2）对于其他屏中的图片，给一张默认的图片占位，当滚动条滚动到对应区域时，再进行加载
    扩展：数据异步加载
    网站性能优化：
    尽量减少向服务器的请求次数, 减少HTTP请求：
        css/js文件合并
        icon图片雪碧图（css sprite）合并
        图片延迟加载
        数据异步加载
        移动端：尽量将css和js写成内嵌式

### jq复习
    //jq
    .attr() // 使用更频繁（两者不通用）
    .prop() // 内置属性
    // jq可进行集合操作
    $boxDivList = $("div", $box); // (selector, context)
    $boxDivList.addClass("c1"); // 内置遍历
    $boxDivList.removeClass("c1");
    $boxDivList.each(function() {}); // 手动遍历

    // jq 回调函数
    var $call = $.Callbacks();
    $call.add(fun1);
    $call.fire(arguments);
    $call.remove(fun1);

    $.ajax({
        url: "www.baidu.com",
        type: "get",
        dataType: "json", //->text, html, jsonp（跨域通信）
        async: false, 
        success: function(data) {
            console.log(data);
        }
    })
 	事件
    $("#box").on("click", function(){
        this: 当前元素（js原生对象）
    })

    工具
    $("div").each(function(index, item){})
    $.each([1,2,3], function(index, item){})

    效果动画
    $.("#box").animate({left:xxx},[speed]during,[easing],[fn])
    .stop(), .finish(), .delay()

    window.jQuery = window.$ = jQuery
    jQuery.extend({ aa: function() {} }) -> $.aa();      //向jq类库中增加其他方法
    jQuery.fn.extend({ bb: function() {} }) -> $().bb(); // 先创建jq对象$(),后执行bb()函数;向jQuery原型上扩展，编写jquery插件

### 事件
 	onclick, mouseover(mouseenter), mouseout(mouseleave), onmousemove, onmousedown, onmouseup, onmousewheel, onscroll
 	onresize, onload, onunload, onfocus, onblur
 	onkeydown, onkeyup, onkeypress -> oninput, onchange代替

	e: MouseEvent -> UIEvent -> Event -> Object
 	DOM0, 只能绑定一个事件
	box.onclick = function(e){}
	DOM2:
	box.addEventListener("click", function(){})
		*//ie6~8:只支持冒泡事件，且dom2事件this为window;
		attachEvent("onclick", function(){}), detachEvent("onclick", function(){}) 
	e = e || window.event
	e.target = e.target || e.srcElement
	e.clientX, e.clientY  //移动端 e.touches[0].clientX  // 相对视窗位置
	e.pageX = e.pageX = e.pageX || (e.clientX + (document.documentELement.scrollLeft || document.body.scrollLeft));  // 相对整个document位置
	// 阻止默认行为
	e.preventDefault() // e.returnValue = true
	e.stopPropagation() // e.cancelBubble = true

	事件委托
	e.target = e.target || e.srcElement  or e.target.tagName.toLowerCase(), e.target.parentNode.id

    dom2: DOMContentLoaded(页面中的HTML结构加载完成触发)
    box.addEventListener("DOMContentLoaded", function() {}, false);
    window.onload = function(){} 页面中的所有资源都加载完（图片、HTML、结构）后执行。DOM0事件，只执行一次
    jquery
    $(document).ready(function() {}) // HTML结构加载完成会触发，页面中可以触发多次
    $(function() {})
    window.addEventListener("load", function() {})
	DOM2事件：当行为触发时，按绑定的先后顺序依次绑定

	绑定鼠标
	this.setCapture();  //ie\火狐, SetCapture、ReleaseCapture
	设置目标移动: move.call(target, 位移)

### html5
    适配：
    // DPI适配: 不同尺寸的图片素材
    // logo.png 100*100
    // logo@2x.png 200*200
    // logo@3x.png 300*300
    1.流式布局:
	-容器或盒子宽度width使用百分比
    -其余样式（字体, 高度, margin, padding按设计稿标注尺寸的一半）
    -部分屏幕尺寸使用@media进行微调:
    2.rem响应式布局
    动态计算font-size的值
    ~ function() {
        var desW = 640,
            winW = document.documentElement.clientWidth, // ie6~8不支持rem, 不用兼容
            ratio = winW / desW;
        var oMain = document.getElementById("main");
        // 超过设计稿大小设置最大值，剩余部分留白显示（如京东）
        if (winW > desW) {
            oMain.style.width = desW + 'px';
            oMain.style.margin = '0 auto';
            return;
        }
        document.documentElement.style.fontSize = ratio * 100 + 'px';
    }()
    // 阻止touch move原生事件,同touch.js
    $(document).on('touchmove touchstart touchend', function(e) {
        e.preventDefault();
    });

    1.pc端事件
    click, mouseover, mouseout, mouseenter, mouseleave, mousemove, mousedown, mouseup
    mousewheel, keydown, keydown, DOMContentLoaded(DOM树加载完成), load(所有资源加载完成), unload, beforeunload, scroll, blur, focus, change
	// e.clientX, e.clientY, e.pageX, e.pageY
    3.移动端:
    click(单击), load, scroll, blur, focus, change和input, textInput(代替keyup, keydown键盘输入e.keycode)
    touch事件模型（单指操作）：touchstart, touchmove, touchend, touchcancel(操作过程中程序退出触发, 少用)
    gesture事件模型（多指操作）：gesturestar, gesturechange, gestureend //e多包含rotation和scale属性
    onorientationchange(屏幕旋转事件模型)
    event.preventDefault()
	//e.touches, targeTouchs, changeTouches(touchend)
	//e.touches[0].clientX, e.touches[0].clientY, pageX, pageY,相对于document元素 //screenX, screenY 相对于屏幕
	触摸事件顺序: touchstart -> mouseover -> mousemove -> mousedown -> mousedup -> click -> touchend
 
    单击和双击(300ms)
    点击和长按(750ms)
    点击和滑动(x/y轴偏移距离是否在30px以内)
    左右滑动和上下活动：X轴偏移距离 > Y轴偏移距离 为 左右滑动，反之为上下滑动

    3.移动端事件库(能ccs完成不用js，原生写完不用框架)
    fastclick.js： 解决click事件300MS的延迟
    touch.js： 百度云手势事件库:https://github.com/Clouda-team
    hammer.js： 移动端手势事件库：https://github.com/hammerjs/hammer.js
    zepto.js： 移动端事件：tap, singleTap, doubleTap, longTap, swipe, swipeUp, swipeDown, swipeLeft, swipeRight
    $('.box').singleTap(function(e){
        $(this).andmiate({目标值}, 1000, 'linear', function(){
            this.style.webkitTransform = 'rotate(0deg)';
        })
    }).on('touchstart', function(){});
    4.移动端支持
    position:fixed固定定位很多手机支持不好，尤其在定位的区域有虚拟键盘的弹出、收回
    原因：
    软键盘唤起后，页面的fixed元素将失效（即无法浮动，也可以理解为变成了 absolute 定位），所以当页面超过一屏且滚动时，失效的 fixed 元素就会跟随滚动了。
    解决方案：
		1.fixed元素内部必须嵌套一个position:absolute元素，用来装载内容
    	2.局部滚动处理(iscroll) 或 swiper(较大)

// 非数字、字母转义
	encodeURIComponent, decodeURIComponent
	encodeURI, decodeURI
    






















