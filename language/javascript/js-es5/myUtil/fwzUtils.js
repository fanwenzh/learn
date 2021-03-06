var fwz = {
    bind: function(fn, context) {
        return function() {
            return fn.apply(context, arguments);
        }
    },
    /** 
     * 时间字符串格式化
     * @str = "2015/3/20 23/5/19" format = "{0}年{1}月{2}日 {3}:{4}:{5}"
     * @return "2015年03月20 23:05:19"
     */
    myFormatTime: function(str, format) {
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
        let res = format.replace(/{(\d+)}/g, function() {
            var val = ary[arguments[1]];
            return val.length === 1 ? "0" + val : val;
        })
        return res;
    },

    // 获取url中的参数值
    getQueryURLParameter: function(url) {
        var reg = /([^?&=]+)=([^?&=]+)/g,
            obj;
        url.replace(reg, function() {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    },

    // 选择器
    $f: function(selector, context = document) {
        var elements = context.querySelectorAll(selector)
        return Array.from(elements)
    },

    // 获取距离的document的offset
    getOffset : function (el) {
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

}

// rem布局动态计算font-size
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