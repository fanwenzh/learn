// core
// jQuery(ele, [context])
//     .length, .get(n), .eq(n),
//     // <div data-[key] = [value]></div>
//     .data(key, val)
//     .index(dom)
// jQuery.fn.extend({ fun1: function() {} }) //扩展$()元素
// $().fun1
// jQuery.extend({ fun2: function() {} }) // 扩展$
// $.fun2
// var test {};
// test.$ = jQuery.noConflict(true) // 可解决不同版本间冲突

// selector
// parent > child
// prev + next
// prev ~ siblings
// :parent
// :first,:not(),: even,: odd
// :first-child, :last-child, nth-child, nth-last-child
// .contains(text)
// .has(selector)
// [attribut!=value] ^=, $=, 

// ajax
// $.ajax({
//     type: "POST", // GET
//     url: "",
//     data: "", //转？'&foo=bar1&foo=bar2' // 发送数据
//     dataType: "", // jsonp, json, text... // 返回数据类型
//     async: true
//     jsonp: "callback", // callback=?
//     jsonpCallBack: "siyu", // 指定回调函数名字
//     beforeSend: function1,
//     success: function2,
//     error: function3,
//     complete: function4
// })

// attribute
// attr(key, val|fn)
// removeAttr(name)
// prop(key, val|fn)
// remove(key, val)
// addClass(class|fn)
// removeClass(class|fn)
// toggleClass(class|fn)
// hasClass()
// html(val|fn)
// text(val|fn)
// val(val|fn)

// css
// css(name, val|fn)
// offset({left:1, top:2})  // 相对视窗
// position({left:1, top:2}) //相对父节点
// scrollTop(val)
// scrollLeft(val)
// height(val|fn)  // 高度height
// width(val|fn)
// innerHeight()  // 内部+padding
// innerWidth() 
// outerHeight()  // padding + border
// outerWidth()

// 文档处理 pass

// 筛选
// eq()
// first(), last()
// is(el|fn)
// not()
// siblings()
// children(exp)
// filter(exp|ele|fn)
// find(ex|el|fn)
// next, nextAll, nextUntil
// prev(exp), prevall(exp), prevUntil()
// parent(exp), parents(exp), parentsUntil(ex|el|fn)
// offsetParent()
// add()
// map(cb)
// slice(start, [end])
// addBack() //加入自身
// end() // 上一次操作状态

// 事件
// ready(fn)
// on(ev, [self], [data], fn), e.stopPropagation(), e.preventDefault
// off()
// trigger(type, [data])
// triggerHandler(type, [data]) // 只对集合[第一个]元素触发, 不触发浏览器默认事件, 返回fn的return值而不是可链式的jq对象
// realize() //窗口大小变化事件
// blur, change, click, dblclick, focus, keydown, keyup, keypress,
// mousedown, mouseenter, mouseleave, mousemove, mouseout, mouseover, mouseup
// select, submit, unload

// show, hide, toggle
// slideDown, slideUp, slideToggle
// fadeIn, fadeOut, fadeToggle, fadeTo
// animate({ left: 50, opacity: 10 }, 500)
// stop, delay, finish
// jQuery.fx.off // 关闭页面所有动画
// jQuery.fx.interval //设置动画显示帧速

//工具 pass

//事件对象 pass

// 回调函数
// $.callbacks
// .add(fn)
// .fire(args)
// .disable() 禁用回调列表
// .empty() 清空回调列表
// .fireWith([context], [,args]) // 访问上下文中的回调函数
// .has(fn)
// .lock() //锁定回调函数列表
// .unlocked()  //确定是否锁定···
// .remove(cb)