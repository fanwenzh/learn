# 13 - Slide in on Scroll

1. window
- innerheight 显示区viewport的高度
- innerwidth 显示区viewport的宽度
- scrollX 已滚动x轴长度
- scrollY 已滚动y轴长度
- length 窗口框架数
- pageXOffset 视窗相对于(0, 0)的横轴位置
- pageYOffset 视窗相对于(0, 0)的纵轴位置
- 窗口左上角相对于（0，0）的位置
	IE、Safari、Opera
		screenLeft
		screenTop
	Firefox、 Safari 
		screenX
		screenY

2. element
offset, client, scroll

3. css
- 选择器
	.align-left.slide-in ：有align-left且slide-in的元素。 
	.align-left .slide-in ： 有align-left类元素中有slide-in的子元素

4. debounce延迟触发函数
	