~ function() {
    var effect = {
        Linear: function(t, b, c, d) {
            return parseInt(c) * t / d + parseInt(b);
        }
    };
    // effect: 运动方式
    // 1)数字：0 -> Linear
    // 2)数组：
    // 3)default: Linear
    // 多属性变化动画
    function move(curEle, target, duration, effect, callBack) {
        // 79 完善animate
        var tempEffect = effect.Linear;
        if (typeof effect === "number") {
            switch (effect) {}
        } else if (effect instanceof Array) {
            tempEffect = null;
        } else if (typeof effect === "function") {
            callBack = effect;
        }

        window.clearInterval(curEle.timer);
        var begin = {},
            change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) { // 私有
                begin[key] = utils.css(curEle, key);
                // 读取为Number，设置为String+"px"最佳方案应如何解决?需要看库~
                if ({}.toString.call(begin[key].slice(-2)) === "[object String]")
                    change[key] = parseInt(target[key]) - parseInt(begin[key]) + "px";
                else
                    change[key] = target[key] - begin[key];
            }
        }
        var time = 0;
        curEle.timer = window.setInterval(function() {
            time += 10;
            if (time >= duration) {
                utils.css(curEle, target);
                window.clearInterval(curEle.timer);
                // 回调函数执行
                callBack && callBack.call(curEle);
                return;
            }
            for (var key in target) {
                if (target.hasOwnProperty(key)) { // 私有
                    var curPos = effect.Linear(time, begin[key], change[key], duration);
                    utils.css(curEle, key, curPos);
                };
            }
        }, 10);
    }
    window.move = move;
}();