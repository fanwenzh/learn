/**
 * Created by fanwenzh on 2017/6/10.
 */
var utils = (function() {
    // 标志位直接检测IE6-8浏览器，不需要多次检测, IE6~8没有getComputedStype
    var flag = "getComputedStyle" in window;

    function listToArray(similarArray) {
        var a = [];
        if (flag) {
            a = Array.prototype.slice.call(similarArray);
        } else {
            var a = [];
            for (var i = 0; i < similarArray.length; i++) {
                a[a.length] = similarArray[i];
            }
        }
        return a;
    }
    // ie6~8没有JSON对象
    function jsonParse(jsonStr) {
        // return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
        return flag ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }
    // 时间格式处理方法
    /*  输入 str = "2015/3/20 23/5/19" format = "{0}年{1}月{2}日 {3}:{4}:{5}"
     *   输出 "2015年03月20 23:05:19"
     */
    function myFormatTime(str, format) {
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})$/g;
        var ary = [];
        str.replace(reg, function() {
            // for (var i = 1; i <= 6; i++) {
            //     var cur = Number(arguments[i]);
            //     cur = cur < 10 ? "0" + cur : cur;
            //     ary.push(cur);
            // }
            ary = [].slice.call(arguments).slice(1, 7);
        });
        format = arguments[1] || "{0}年{1}月{2}日 {3}:{4}:{5}";
        return format.replace(/{(\d+)}/g, function() {
            var val = ary[arguments[1]];
            return val.length === 1 ? "0" + val : val;
        });
    }

    function offset(ele) {
        var eleLeft = ele.offsetLeft;
        var eleTop = ele.offsetTop;
        var eleParent = ele.offsetParent;
        var left = null;
        var top = null;
        left += eleLeft;
        top += eleTop;
        while (eleParent) {
            //console.log(eleParent);
            /*
             *  ps: ie8中会有一个问题如果在ie8中就不加父级的边框了。因为已经加过了。
             *  判断我的当前浏览器是不是ie8   1 可以用正则 test MSIE 8.0   2 字符串
             *  中的indexOf MSIE 8.0 判断 -1. window.navigator.userAgent
             * */
            // window.navigator.userAgent.indexOf('MSIE 8.0') !== -1 
            if (!flag) {
                left += eleParent.offsetLeft;
                top += eleParent.offsetTop;
            } else {
                left += eleParent.clientLeft + eleParent.offsetLeft;
                top += eleParent.clientTop + eleParent.offsetTop;
            }
            eleParent = eleParent.offsetParent;
        }
        return { left: left, top: top };
    }

    function win(attr, val) { //一个参数的时候是读取，两个参数可以赋值
        if (val !== undefined) {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }
    // 获取curEle下所有元素节点，兼容所有的浏览器
    // 如果传递tagName[String], 可把指定标签名获取到
    function children(curEle, tagName) {
        var ary = [];
        // /MSIE [6-8]/i.test(navigator.userAgent)
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                curNode.nodeType === 1 ? ary[ary.lengh] = curNode : null
            }
            nodeList = null;
        } else {
            ary = Array.prototype.slice.call(curEle.children);
            // ary = this.listToArray(curEle.children);
        }
        // 进行子节点选择
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curEleNode = ary[k];
                if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            }
        }
        return ary;
    }

    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSiling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSiling;
        }
        return pre;
    }

    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var next = curEle.nextSibling;
        while (next && next.nodeName !== 1) {
            next = next.nextSbling;
        }
        return next;
    }

    function preAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    function nextAll(curEle) {
        var ary = [];
        var next = this.next(curEle);
        while (next) {
            ary.push(next);
            next = this.next(next);
        }
        return ary;
    }
    // 获取相邻的两个元素节点
    function sibling(curEle) {
        var pre = this.prev(curEle);
        var next = this.next(curEle);
        var ary = [];
        pre ? ary.push(pre) : null;
        next ? ary.push(next) : null;
        return ary;
    }
    // 获取所有的兄弟元素节点
    function siblings(curEle) {
        return this.preAll(curEle).concat(this.nextAll(curEle));
    }
    // 获取当前元素的索引
    function index(curEle) {
        return this.preAll(curEle).length;
    }
    // 获取第一个元素子节点
    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[0] : null;
    }

    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

    function append(newEle, container) {
        container.appendChild(newEle);
    }

    function preappend(newEle, container) {
        var fir = contianer.firstChild();
        if (fir) {
            container.insertBefore(newELe, fir);
            return;
        }
        contianer.appendChild(newEle);
    }

    function insertBefore(newELe, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    function insertAfter(newEle, oldEle) {
        var next = this.next(oldEle);
        if (next) {
            oldEle.parentNode.insertBefore(newEle, next);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }
    // hasClass 判断是否存在某一个样式类名
    function hasClass(curEle, className) {
        // key in obj
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    function addClass(curEle, className) {
        if (!this.hasClass(curEle, className)) {
            curEle.className += " " + className;
        }
    }

    // addClasses 增加样式类名
    function addClasses(curEle, className) {
        var ary = className.replace(/(^ +| +$)/, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }
    // removeClass 删除样式类名
    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    function getElementsByClass(className, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(className));
        }
        // IE6~8
        var classNameAry = className.replace(/(^ +| +$)/, "").split(/ +/g);
        // 获取上下文所有的标签
        var nodeList = context.getElementsByTagName("*");
        var eleAry = [];
        for (var i = 0, iLen = nodeList.length; i < iLen; i++) {
            var isOk = true;
            var curNode = nodeList[i];
            for (var j = 0, jLen = classNameAry.length; j < jLen; j++) {
                // new RegExp("(^| +)" + classNameAry[j] + "( +|$)")
                if (!hasClass(curNode, classNameAry[j])) {
                    isOk = false;
                    break;
                }
            }
            if (isOk) {
                eleAry.push(curNode);
            }
        }
        return eleAry;
    }
    // getCss
    function getCss(attr) {
        var val = null,
            reg = null;
        if (flag) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr === "opacity") {
                val = this.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+)(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr]; // IE
            }
        }
    }
    // 66setCss
    function setCss(attr, value) {
        // 兼容IE
        if (attr === "float") {
            this["style"]["float"] = value;
            this["style"]["styleFloat"] = value;
            return;
        }
        if (attr === "opacity") {
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }

        var reg = /(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr) && !isNaN(value)) {
            value += "px";
        }
        this["style"][attr] = value;
    }
    // setGroupCss
    function setGroupCss(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key]);
            }
        }
    }
    // 68 jquery: css，属性获取，单独设置，批量设置
    function css(curEle) {
        var ary = Array.prototype.slice.call(arguments, 1);
        var argTwo = arguments[1];
        if (typeof argTwo === "string") {
            if (typeof arguments[2] === "undefined") {
                return getCss.call(curEle, ary);
            } else {
                setCss.apply(curEle, ary);
                return;
            }
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(curEle, ary);
        }
    }
    // 获取url中的参数值
    function getQueryURLParameter(url) {
        var reg = /([^?&=]+)=([^?&=]+)/g,
            obj;
        url.replace(reg, function() {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }
    return {
        removeClass,
        addClasses,
        addClass,
        hasClass,
        win,
        offset,
        listToArray,
        jsonParse,
        myFormatTime,
        getCss,
        setCss,
        children,
        setGroupCss,
        getQueryURLParameter,
        prev,
        next,
        preAll,
        nextAll,
        sibling,
        siblings,
        index,
        firstChild,
        lastChild,
        preappend,
        insertBefore,
        insertAfter,
        // setGroupCss,
        // setCss,
        // getCss,
        css
    }
})()