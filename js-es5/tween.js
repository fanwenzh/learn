~ function() {
    var effect = {
            Linear: function(t, b, c, d) {
                return c * t / d + b;
            }
        }
        // 多属性变化动画
    function move(curEle, target, duration) {
        var begin = {},
            change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) { // 私有
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = 0;
        curEle.timer = window.setInterval(function() {
                if (time >= duration) {
                    utils.css(curEle, target);
                    window.clearInterval(curEle.timer);
                    return;
                }
                if (target.hasOwnProperty(key)) { // 私有
                    time += 10;
                }, 10);
        }
    }();