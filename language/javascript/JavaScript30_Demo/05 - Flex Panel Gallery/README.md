# 05 - Flex Panel Gallery

1. vw, vh, vmin, vmax
举例:
	一个1000px（宽）和800px（高）的视窗(Viewport)
    vw——代表视窗(Viewport)的宽度为1%，在我们的例子里50vw = 500px。
    vh——窗口高度的百分比 50vh = 400px。
    vmin——vmin的值是当前vw和vh中较小的值。在我们的例子里因为是横向模式，所以50vim = 400px。
    vmax——大尺寸的百分比。50vmax = 500px。
![flex语法](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
2.flex
容器
```
	<!-- 第一个为默认属性 -->
	display: flex | inline-flex;
	flex-direction: row | row-reverse | column | column-reverse;
	flex-wrap: nowrap | wrap | wrap-reverse;
	flex-flow: flex-direction flex-wrap;
	justify-content: flex-start | flex-end | center | space-between | space-around;
	<!-- 交叉轴 -->
	align-items: flex-start | flex-end | center | baseline | stretch;
	<!-- 多轴对齐方式 -->
	align-content: flex-start | flex-end | center | space-between | space-around | stretch;

```
子元素
```
	order: number;
	flex-grow: 放大比例;
	flex-shrink: 缩小比例;
	flex-basis: length | auto;
	flex: none | flex-grow flex-shrink flex-basis
	align-self: auto | flex-start | flex-end | center | baseline | stretch;
```
3. css能解决的问题不用js(css类控制子元素)
```
	<!--运动, 选择  -->
	.panel>*:last-child {transform: translateY(100%);}
    .panel.open-active>*:last-child {transform:translateY(0);}
```
4. 兼容性
```
	<!-- style设置 -->
	.panel {
		transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), background 0.2s;
	}
	<!-- Safari transitionend event.propertyName === flex  -->
	<!-- Chrome + FF transitionend event.propertyName === flex-grow  -->
   ele.addEventListener('transitionend', function(event){
   		if(event.propertyName === 'flex') {}
   })
```
5. 调试技巧
```
	<!-- 帮助辨认元素所在的区域 -->
	border: 1px solid #f00;

```
改进：监听click事件，字体延迟出现transition .5s .7s;