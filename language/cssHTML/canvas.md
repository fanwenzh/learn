# https://developer.mozilla.org/kab/docs/Web/API/Canvas_API
## canvas
```js
// <canvas id="myCanvas" width="200" height="150"/>
let myCanvas = document.getElementById('myCanvas')
let ctx = myCanvas.getContext('2d')
// 文字
ctx.font = '30px 宋体'
ctx.strokeText('abc', x, y)
ctx.fillText('fill', x, y)
// 线条
ctx.beginPath() // 清除前面路径操作
ctx.closePath() // 闭合路径
ctx.lineCap="round" // 闭合形状
ctx.lineWidth = 10
ctx.moveTo(100, 100)
ctx.lineTo(150,100)
ctx.fillStyle = '#eee'
ctx.fill()
ctx.strokeStyle='red'
ctx.stroke()
// 特殊曲线
ctx.elipse()
ctx.artTo()
ctx.bezierCurveTo()
ctx.quadrativCurveTo()
// 矩形
ctx.rect(x, y, w, h)
ctx.strokeStyle='red'
ctx.strokeRect()
ctx.fillRect(x, y, w, h)
ctx.clearRect(x, y, w, h)
// 弧(路径)
ctx.arc(cx, cy, r, start弧度, end弧度, 是否是逆时针) // ang*Math.PI/180
ctx.stroke()
ctx.translate(x, y) // 转移重心
ctx.rotate(30)
// 图像保存恢复
ctx.save()
ctx.restore() // 恢复
ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
canvas.toDataURL('image/png')
// 保存在history中
let h = window.history
h.back()
h.forward()
h.go() // n
let state = context.getImageData(0, 0, canvas.width, canvas.height)
h.putState(state, null)
context.putImageData(state, 0, 0)

// window刷新
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimation ||
         window.mozRequestAnimation ||
         window.oRequestAnimation ||
         window.msRequestAnimation ||
         function() {
           window.setTimeout(callback, 1000/60)
         }
})
requestAnimFrame(animate) // 动作函数animate

// Mutation Observer
var mo = new MutationObserver(function(mutationRecords, mutationObserver){

})
mko.observe(oDiv, {
  attributes: false, // 是否观察目标节点的所有属性 
  characterData: false, // 是否观察目标节点的子文字节点
  childList: true // 是否观察目标节点的子节点
})

```

