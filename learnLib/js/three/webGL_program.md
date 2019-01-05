
```js
function getWebGLContext(canvas, opt_debug) {
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) return null;
  if (arguments.length < 2 || opt_debug) {
    gl = WebGLDebugUtils.makeDebugContext(gl);
  }
  return gl;
}

// fwz
var canvas = document.getElementById('canvas')
// var gl 
var gl = canvas.getContext('webgl')
// gl.clearColor(red, green, blue, alpha) 0.0 - 1.0
// gl.clearDepth(depth)
// gl.clearStencil(s) // 模板缓冲区
// 清空背景色（颜色缓冲区）
gl.clear(gl.COLOR_BUFFER_BIT)

// webGL系统
// 顶点着色器: 大小位置
var VSHADER_SOURCE = 
	'void main() {\n' + 
	'  gl_Posiiton = vec4(0.0, 0.0, 0.0, 1.0);\n' +  // 位置
	'  gl_PointSize = 10.0;\n' +  // 大小
	'}\n'

// 片元着色器: 颜色
var FSHADER_SOURCE = 
	'void main() {\n' +
	'  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	'}\n';

// GLSL（OpenGL Shading Language）
// 类型： float, vec4(float, float, float, float)
// 三维坐标(x, y, z), 齐次坐标(x, y, z, w) => (x/w, y/w. z/w)

// 绘制图形
// gl.drawArrays(mode, first, count) 
// mode: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP
//       gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN
gl.drawArrays(gl.POINTS, 0, 1);

// 存储限定符
// attribute：传输与顶点相关的数据
// uniform：传输与顶点无关的数据
// attribute vec4 a_Position

// gl.vertexAttrib1f, gl.vertexAttrib2f, gl.vertexAttrib3f, gl.vertexAttrib4f
// gl.vectexAttrib3f(location, v0, v1, v2) // 3参数个数， f表示浮点数，i表示整数

```