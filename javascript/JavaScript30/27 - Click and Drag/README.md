# 27 - Click and Drag

1. event
```
// http://www.2cto.com/kf/201409/333401.html
const div = document.querySelector('div');
div.addEventListener('click', e => {
    e.clientX; // 相对浏览器视窗的x轴位置， 通用
    e.pageX;  // 相对文档位置（同e.clientX）,ie事件没有
    e.offsetX // 相对于事件源的位置 ， 只有ie有该属性
    e.screenX // 相对于显示屏屏幕x坐标
})
// div
div.clientLeft, .clientTop, .clientWidth, .clientHeight
div.offsetLeft, .clientTop, .clientWidth, .clientHeight, .cilentParent
div.scrollLeft, .scrollTop, .scrollWidth, .scrollHeight

// window
window.innerWidth, .innerHight // 相对浏览器视窗宽高
window.outerWidth, .outerHight // 显示屏(除顶栏)宽高
window.screen.width, .height // 显示屏宽高
window.screenLeft, .screenTop, .screenX, .screenY // 视窗相对显示器高度

```
2. css
```
// perspective：旋转木马效果
http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/
// 子元素inline-flex布局, 即flex:1 且平均分配
// 父元素设置width: 100%, 子元素撑满父元素
// width: cale(100% - 10px), 计算属性  
```