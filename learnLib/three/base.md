three.js 基础
### 第一章
```js
// 场景
var scene = new THREE.Scene() 
// 相机
var camera = new THREE.PerspectiveCemera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
// 渲染器
var renderer = THREE.WbbGLREnderer()
renderer.setSize(windwo.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement); // 添加webGL
// 渲染器渲染
renderer.render( scene, camera, renderTarget, forceClear )

// 将物体添加到场景中
// CubeGeometry(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides) // 立方体 x, y, z
var geometry = new THREE.CubeGeometry(1,1,1)
var material = new THREE.MeshBasicMaterial({color: 0x00ff00})
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

```
### 第二章1
```js
// 定义一个点
var point1 = new THREE.Vector3(-100,0,100) // x, y, z
var point2 = new THREE.Vector3(100,0,-100)
point2.set(3, 8, 9)
// 添加到geometry
geometry.vertices.push(point1);
geometry.vertices.push(point2);
geometry.colors.push( color1, color2 ); // 添加颜色
// 定义一条线条的材质
var material = THREE.LineBasicMaterial({Color, Linewidth, Linecap, Linejoin, Fog})
// 定义一条线
var line = new THREE.Line( geometry, material, THREE.LinePieces );
scene.add(line);
```
### 第二章2
```js
// camera设置
camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000)
camera.position.x = 0
camera.position.y = 1000
camera.position.z = 0
// 相机头顶朝向，必须设置和lookAt垂直
camera.up.x = 0
camera.up.y = 0
cemera.up.z = 1
cemera.lookAt({
  x : 0,
  y : 0,
  z : 0
})
// 添加光线
var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
}

```
## 第4章 三维空间的观察
```js
// 正投影相机THREE.OrthographicCamera(远近高低比例相同)
OrthographicCamera( left, right, top, bottom, near, far )
// 透视投影相机THREE.PerspectiveCamera
PerspectiveCamera( fov, aspect, near, far )
```

## 第5章 五彩的光源(一)
```js
// 光
THREE.light
THREE.AmbientLight() // 环境光
THREE.PointLight(color, intensity, distance) // intensity:光强度
THREE.SpotLight(hex, intensity, distance, angle, exponent) // exponent: 衰减参数
THREE.DirectionalLight(hex, intensity) // 方向光
// 材质
MeshLambertMaterial() // 兰伯特材质
// 物体呈现的颜色为光源的叠加
```
## 第6章 纹理，不一样的皮肤(一)
```js
THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
var image = THREE.ImageUtils.loadTexture(url); // image
THREE.UVMapping() // 纹理坐标
wrapS // x轴的纹理是否重叠
wrapT // y轴的纹理是否重叠
THREE.RGBAFormat // format表示加载的图片的格式，这个参数可以取值THREE.RGBAFormat，RGBFormat等
THREE.UnsignedByteType // 表示存储纹理的内存的每一个字节的格式
anisotropy // 各向异性过滤

// 纹理坐标
0,1 - 1,1 - 1,0 - 0,0
左上，右上，右下，左下
```