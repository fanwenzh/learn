![canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)
https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Finale
## canvas
```js
// 行内元素定义高宽，css可能出现扭曲
// <canvas id="tutorial" width="150" height="150"></canvas>
var canvas = document.getElementById('tutorial')
canvas.setAttribute('width',132); // 函数添加属性
canvas.setAttribute('height',150);
var ctx = canvas.getContext('2d')
// 填充颜色
ctx.fillStyle = "rgba(0,0,200,0.5)"
// 绘制矩形：ctx.fillRect(x, y, width, height)
ctx.fillRect(30, 30, 55, 50)
ctx.clearRect(45,45,60,60);
ctx.strokeRect(50,50,50,50);
// 绘制圆形：arc(x, y, radius, startAngle, endAngle, anticlockwise)
ctx.arc(75,75,50,0,Math.PI*2,true)
ctx.arcTo(x1, y1, x2, y2, radius)
// 绘制路径
ctx.beginPath()
ctx.moveTo(x, y)
ctx.lineTo(x, y)
ctx.closePath()
ctx.stroke() // 不自动闭合
ctx.fill() // nonzero, evenodd 画线条间隔区域
// 贝塞尔曲线
ctx.quadraticCurveTo(cp1x, cp1y, x, y)
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
// 缓存（克隆）路径或图像，使用 SVG paths
new Path2D(path)
var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
// 线条(区域中间)
lineWidth = value // 设置线条宽度
lineCap = type // 设置线条末端样式, butt，round, fsquare
lineJoin = type // 设定线条与线条间接合处的样式
miterLimit = value // 限制当两条线相交时交接处最大长度
getLineDash() // 返回一个包含当前虚线样式，长度为非负偶数的数组
setLineDash(segments) // 设置当前虚线样式。
lineDashOffset = value // 设置虚线样式的起始偏移量
// 渐变
var lineargradient = ctx.createLinearGradient(0,0,150,150);
lineargradient.addColorStop(0,'white');
lineargradient.addColorStop(1,'black');
// 图片显示
var ptrn = ctx.createPattern(imgUrl,'repeat'); // repeat, repeat-x, repeat-y, no-repeat
// 阴影
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
// 文本
ctx.fillText(text, x, y [, maxWidth])
ctx.strokeText(text, x, y [, maxWidth])
ctx.font = value // 字体10px sans-serif
ctx.textAlign = value // 文本对齐选项
ctx.textBaseline = value // 基线对齐选项
ctx.direction = value // 文本方向
// 图像 image可为img, video, canvas标签
ctx.drawImage(image, x, y, width, height)
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
ctx.mozImageSmoothingEnabled = false; // 值为 false 时，图像不会平滑地缩放。默认是 true
// 状态保存和恢复
ctx.save()
ctx.restore()
// 变形
ctx.translate(x, y)
ctx.rotate(x, y)
ctx.scale(x, y)
// m11：水平方向的缩放
// m12：水平方向的偏移
// m21：竖直方向的偏移
// m22：竖直方向的缩放
// dx：水平方向的移动
// dy：竖直方向的移动
ctx.transform(m11, m12, m21, m22, dx, dy) 
ctx.setTransform(1, 0, 0, 1, 0, 0);
// 覆盖策略: source-over, source-in, source-out, source-atop···
// https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing
ctx.globalCompositeOperation
// 先创建裁剪路径，后调用clip裁剪
ctx.beginPath();
ctx.arc(0,0,60,0,Math.PI*2,true);
ctx.clip()
// 重绘前回调函数
raf = window.requestAnimationFrame(draw);
window.cancelAnimationFrame(raf);

// canvas 对象
width, height: px
ctx.data: Uint8ClampedArray（1维数组） -> RGBA(1个像素4bytes)
ctx.data.length 像素数组大小
// 创建新的ImageData对象
var myImageData = ctx.createImageData(width, height)
ctx.createImageData(anotherImageData)
ctx.getImageData(left, top, width, height)
ctx.drawImage(img, 0, 0)
ctx.putImageData(myImageData, dx, dy); // ctx.putImageData(myImageData, 0, 0)
// 们将10×10像素的对原画布的裁剪调整为 200×200 
zoomctx.drawImage(canvas, 
                  Math.abs(x - 5), Math.abs(y - 5),
                  10, 10, 0, 0, 200, 200);
// 放大锯齿处理：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
zoomctx.imageSmoothingEnabled 
zoomctx.mozImageSmoothingEnabled 
zoomctx.webkitImageSmoothingEnabled 
zoomctx.msImageSmoothingEnabled 
// 保存图片
canvas.toDataURL('image/png')
canvas.toDataURL('image/jpeg', quality) // 品质：0-1
canvas.toBlob(callback, type, encoderOptions); // 或创建Blob对象保存 
var canvas = document.getElementById("canvas");
canvas.toBlob(function(blob) {
  var newImg = document.createElement("img"),
      url = URL.createObjectURL(blob); // 转换为url
  newImg.onload = function() {
    URL.revokeObjectURL(url); // 释放已转换对象
  };
  newImg.src = url;
  document.body.appendChild(newImg);
});
```