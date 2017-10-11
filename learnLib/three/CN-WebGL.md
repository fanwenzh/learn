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
// CubeGeometry(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides) 
// width：立方体x轴的长度, height：立方体y轴的长度, depth：立方体z轴的深度
var geometry = new THREE.CubeGeometry(1,1,1)
var material = new THREE.MeshBasicMaterial({color: 0x00ff00})
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)
camera.position.z = 5

function render() {
	requestAnimationFrame(render)
	cube.rotation.x += 0.1
	cube.rotation.y += 0.1 
	renderer.render(scene, camera)
}
render()

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
// lookAt为眼睛聚焦点
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
## 第3章 让场景动起来
```js
	// 1. 场景运动
	function animate() {
		render();
		requestAnimationFrame(animate)
	}
	// 2. 相机位置移动
	// 3. 物体位置移动
```
<!-- 性能监视 -->
- ![stats.js](http://www.hewebgl.com/article/getarticle/58)
```js
	var stats = new Stats();
	stats.setMode(1); // 0: fps, 1: ms
	// 将stats的界面对应左上角
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );
	setInterval( function () {
	    stats.begin();
	    // 你的每一帧的代码
	    stats.end();
	}, 1000 / 60 );
```
Tween.js创建动画
```js
	function initTween()
	{
	    new TWEEN.Tween( mesh.position)
	        .to( { x: -400 }, 3000 ).repeat( Infinity ).start();
	}
```

## 第4章 三维空间的观察
```js
// 正投影相机THREE.OrthographicCamera(远近高低比例相同)
THREE.OrthographicCamera( left, right, top, bottom, near, far )
// 透视投影相机THREE.PerspectiveCamera
// aspect 相机长宽比
THREE.PerspectiveCamera( fov, aspect, near, far )
```

## 第5章 五彩的光源(一)
```js
// 光
THREE.light(hex) // hex: 0xFF0000
THREE.AmbientLight() // 环境光: 均匀不衰减
THREE.PointLight(color, intensity, distance) // intensity:光强度
THREE.SpotLight(hex, intensity, distance, angle, exponent) // exponent: 衰减参数
THREE.DirectionalLight(hex, intensity) // 方向光：没有衰减的平行的光线
THREE.AreaLight() // 区域光
// 材质
THREE.MeshLambertMaterial() // 兰伯特材质
// 物体呈现的颜色为光源的叠加
```
## 第6章 纹理，不一样的皮肤(一)
```js
	// 1. 画一个平面
	var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
	// 2. 定义平面4个顶点
	geometry.vertices[0].uv = new THREE.Vector2(0,0);
	geometry.vertices[1].uv = new THREE.Vector2(2,0);
	geometry.vertices[2].uv = new THREE.Vector2(2,2);
	geometry.vertices[3].uv = new THREE.Vector2(0,2);
	// 3. 加载纹理图片
	// THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
	var texture = THREE.ImageUtils.loadTexture(url); // image
	// THREE.UVMapping() // 纹理坐标
	// wrapS // x轴的纹理是否重叠
	// wrapT // y轴的纹理是否重叠
	// THREE.RGBAFormat // format表示加载的图片的格式，这个参数可以取值THREE.RGBAFormat，RGBFormat等
	// THREE.UnsignedByteType // 表示存储纹理的内存的每一个字节的格式
	// anisotropy // 各向异性过滤

	// 纹理坐标
	// 0,1 - 1,1 - 1,0 - 0,0
	// 左上，右上，右下，左下

	// 4. 将纹理应用于材质
	var material = new THREE.MeshBasicMaterial({map:texture});
	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
```

## 第6章 将canvas作为纹理，将动画作为纹理（二）
```js
// 三维六面时钟
// THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
var texture = new THREE.Texture(canvas) // image 可以是canvas标签
var material = new THREE.MeshBasicMaterial({map:texture});
var mesh = new THREE.Mesh( geometry,material );
// 持续动画: texture.needsUpdate为true，并且render函数要一直调用
```

## 第7章 3D模型的加载与使用
```js
   var material = new THREE.MeshLambertMaterial( { color:0xffffff, side: THREE.DoubleSide } );
    var loader = new THREE.VTKLoader();
    loader.addEventListener( 'load', function ( event ) {
        var geometry = event.content;
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.setY( - 0.09 );
        scene.add( mesh );
    } );
    loader.load( "models/vtk/bunny.vtk" );
```

## 第8章 动画基础-网格模型旋转的常用技巧和方法
```js
// THREE.BoxGeometry = function ( width, height, depth, widthSegments, heightSegments, depthSegments )
setInterval(func, msec)
requestAnimationFrame(func)
```

## 第7章 外部模型
```js
// *.obj
// *.obj, *.mtl
// *.dae
// *.ctm
// *.ply
// *.stl
// *.wrl
// *.vtk 
// 不同模型导入方法及loader不同
var loader = new THREE.OBJLoader()
loader.load('../lib/port.obj', function(obj) {
	// 正反面绘制
    obj.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshLambertMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide
            });
        }
    });
    mesh = obj;
    scene.add(obj);
})
```

## 第8章 光与影
```js
// 环境光
var light = new THREE.AmbientLight(0xffffff);
scene.add(light); 
// 环境光并不在乎物体材质的color属性，而是物体的ambient属性
var greenCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
        new THREE.MeshLambertMaterial({ambient: 0x00ff00})); // 默认值是0xffffff
greenCube.position.x = 3;
// 点光源 THREE.PointLight(hex, intensity, distance) 
var light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 1.5, 2);
scene.add(light); 
// 平行光：THREE.DirectionalLight(hex, intensity)
var light = new THREE.DirectionalLight();
light.position.set(2, 5, 3);
scene.add(light); 
// 聚光灯：THREE.SpotLight(hex, intensity, distance, angle, exponent)
var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
// 固定位置
light.position.set(x1, y1, z1);
light.target.position.set(x2, y2, z2); 
// 聚光灯跟随物体
light.target = cube; 

// 阴影: three.js 入门
// 在Three.js中，能形成阴影的光源只有THREE.DirectionalLight与THREE.SpotLight；而相对地，能表现阴影效果的材质只有THREE.LambertMaterial与THREE.PhongMaterial。
// 聚光灯阴影
renderer.shadowMapEnabled = true; // 设置渲染阴影
xxx.castShadow = true; // 设置对于光源以及所有要产生阴影的物体
xxx.receiveShadow = true; // 设置接收阴影的物体调用
// 平行光
// 需要设置shadowCameraNear、shadowCameraFar、shadowCameraLeft、shadowCameraRight、shadowCameraTop以及shadowCameraBottom
light.shadowCameraVisible = true  // 显示摄像机位置
light.shadowDarkness // 0-1 阴影的深浅
renderer.shadowMapSoft = true // 软阴影效果? 

```

## 第9章 着色器 - 未理解
```js
// const, attribute, uniform, varying
varying vec2 vUv; // 声明类型为vec2的vUv变量
vUv = uv
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0)

```