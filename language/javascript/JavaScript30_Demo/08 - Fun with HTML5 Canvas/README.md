# 08 - Fun with HTML5 Canvas

![hsl取色](http://mothereffinghsl.com/)

canvas:
- 基本方法
```
	const c = document.querySelector('#canvas');
	const ctx = c.getContext("2d");
	c.setAttribute('width', 320);
	c.setAttribute('height', 640);
```
- 属性
	fillStyle // 线条填充颜色 // rgba, rgb, hsl
	strokeStyle // 线条边缘颜色 
	lineWidth  // 设置线条宽度
	lineCap  // 设置线条末端样式  // butt, round, square
	lineJoin = type // 线条结合处样式 // bevel, round, miter
	shadowOffsetX  // 阴影
	shadowOffsetY
	shadowBlur
	shadowColor

- 功能划分方法
	fillRect(x, y, width, height) // 矩形  
	strokeRect(x, y, width, height)  
	arc(x,y,r,0,Math.PI)          // 圆形  
	clearRect(x, y, width, height)   

	- 线条
	ctx.beginPath(); // 开始路径  
	ctx.moveTo()  
	ctx.lineTo(x, y)  
	ctx.arcTo(x1, y1, x2, y2, radius) // 弧形  
	ctx.stroke()  // 轮廓   
	ctx.fill()    // 填充， "nonzero", "evenodd"  
	ctx.closePath()  
	quadraticCurveTo(cp1x, cp1y, x, y) // 二次贝塞尔曲线  
	bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) // 三次贝塞尔曲线

	文本填充  
	ctx.font="30px Arial";  
	ctx.fillText(text,x,y) 
	strokeText(text,x,y)  

	绘制图像  
	var imgocument.getElementById("scream");  
	ctx.drawImage(img, x, y, width, height);  

	渐变  
	createLinearGradient(x,y,x1,y1) // 线条渐变    
	createRadialGradient(x1, y1, r1, x2, y2, r2) // 圆渐变   

	保存  
	save(). //保存  
	restore() // 重新加载上次保存信息  
	
	运动  
	rotate(angle) // 以(0, 0)为中心选装canvas  
	translate(x, y)  
	scale(xsize, ysize). 
	transform(m1, m12, m21, m22, dx, dy) // https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Transformations  
	setTransform(1, 0, 0, 1, 0, 0)  // resetTransform()  