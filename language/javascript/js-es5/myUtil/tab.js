~ function() {
    /*
    <div class="box">
        <ul>
            <li>页卡一</li>
            <li>页卡二</li>
            <li>页卡三</li>
            <li class="select">页卡四</li>
        </ul>
        <div>内容一</div>
        <div>内容二</div>
        <div>内容三</div>
        <div class="select">内容四</div>
    </div>
    */
    function TabChange(container, defaultIndex) {
        return this.init(container, defaultIndex);
    }
    TabChange.prototype = {
            constructor: TabChange,
            // 默认让当前元素按照索引来设置选中的页卡
            defaultIndexEvent: function() {
                utils.addClasses(this.oLis[this.defaultIndex], "select");
                utils.addClasses(this.divList[this.defaultIndex], "select");
            },
            // 事件委托实现事件绑定
            liveClick: function() {
                var _this = this;
                this.tabFirst.onclick = function(e) {
                    e = e || window.event;
                    // ie: e.srcElement
                    e.target = e.target || e.srcElement;
                    if (e.target.tagName.toLowerCase() === "li") {
                        _this.detailFn(e.target);
                    }
                }
            },
            detailFn: function(curEle) {
                var index = utils.index(curEle);
                utils.addClasses(curEle, "select");
                for (var i = 0, len = this.divList.length; i < len; i++) {
                    i === index ? utils.addClass(this.divList[i], "select") :
                        (utils.removeClass(this.divList[i], "select"), utils.removeClass(this.oLis[i], "select"));
                }
            },
            // 初始化，当前插件的唯一入口
            init: function(container, defaultIndex) {
                this.container = container || null;
                this.defaultIndex = defaultIndex || 0;
                this.tabFirst = utils.firstChild(this.container);
                this.oLis = utils.children(this.tabFirst);
                this.divList = utils.children(this.container, "div");
                this.defaultIndexEvent();
                this.liveClick();
                // 返回实例
                return this;
            },
        }
        // container: 选项卡容器
        // defaultIndex: 默认选中项索引
    function tabChange(container, defaultIndex) {
        var tabFirst = utils.firstChild(container),
            oLis = utils.children(tabFirst),
            divList = utils.children(container, "div");
        defaultIndex = defaultIndex || 0;
        utils.addClasses(oLis[defaultIndex], "select");
        utils.addClasses(divList[defaultIndex], "select");

        // 事件委托优化点击操作
        tabFirst.onclick = function(e) {
                e = e || window.event;
                // ie: e.srcElement
                e.target = e.target || e.srcElement;
                if (e.target.tagName.toLowerCase() === "li") {
                    detailFn.call(e.target, oLis, divList);
                }
            }
            // 直接dom操作,绑定至每一个选项卡
            // for (var i = 0; i < oLis.length; i++) {
            //     oLis[i].onclick = function() {
            //         var curSiblings = utils.siblings(this);
            //         for (var i = 0; i < curSiblings.length; i++) {
            //             utils.removeClass(curSiblings[i], "select");
            //         }
            //         utils.addClasses(this, "select");
            //         var divList = utils.nextAll(this.parentNode);
            //         var index = utils.index(this);
            //         for (i = 0; i < divList.length; i++) {
            //             i === index ? utils.addClass(divList[i], "select") :
            //                 utils.removeClass(divList[i], "select");
            //         }
            //     }
            // }
    }

    function detailFn(oLis, divList) {
        // this -> li
        var index = utils.index(this);
        utils.addClasses(this, "select");
        for (var i = 0, len = divList.length; i < len; i++) {
            i === index ? utils.addClass(divList[i], "select") :
                (utils.removeClass(divList[i], "select"), utils.removeClass(oLis[i], "select"));
        }
    }
    // 事件委托绑定
    window.tabChange = tabChange;
    // 面向对象思想构造
    window.TabChange = TabChange;
}();