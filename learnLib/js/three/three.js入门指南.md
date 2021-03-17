## 第一章 hello world!
```js
// 渲染器 renderer
// 直接添加canvas Dom
var renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('mainCanvas')
})
renderer = new THREE.WebGLRenderer()
renderer.setSize(400, 300)
// 设置背景色
renderer.setClearColor(0x000000); 
document.getElementsByTagName('body')[0].appendChild(renderer.domElement)
// 场景 scene
var scene = new THREE.Scene()
// 照相机 camera
var camera = new THREE.PerspectiveCamera(45, 4/3, 1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
// 添加长方体
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
	new THREE.MeshBasicMaterial({ color: 0xff0000 }))
scene.add(cube)
// 渲染
renderer.render(scene, camera)
```

## 第二章 camera
```js
// 
var camera = THREE.OrthographicCamera(left, right, top, bottom, near, far) 
camera.position.set(1, 0, 5)
camera.lookAt(0, 0, 0)
// 透视照相机: 
// fov 照相机张角（与aspect区别？）
// near和far分别是照相机到视景体最近、最远的距离 
THREE.PerspectiveCamera(fov, aspect, near, far) 

```

## 第3章 几何形状
```js
// 创建物体：形状、材质
var cube = new THREE.Mesh(geometry, material)
// width: x, height: y, depth: z, 后三个参数为分段数，默认为1
THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) // 立方体
THREE.PlaneGeometry(width, height, widthSegments, heightSegments) // 平面
// phiStart, phiLength 维度开始结束的位置（度数）
// thetaStart, thetaLength 经度开始结束的位置
THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength) // 球体
THREE.CircleGeometry(radius, segments, thetaStart, thetaLength） // 圆形
// openend：boolean  是否有顶部和底部 
THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded) // 圆柱形
// 正n面体(4，8，20), detail为细节层次数
THREE.TetrahedronGeometry(radius, detail)
THREE.OctahedronGeometry(radius, detail)
THREE.IcosahedronGeometry(radius, detail) 
THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc) // 圆环
// heightScale 为z轴方向上的缩放
THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale) // 圆环节
// 三维文字：
// 其中，text是文字字符串，parameters是以下参数组成的对象：
// size：字号大小，一般为大写字母的高度
// height：文字的厚度
// curveSegments：弧线分段数，使得文字的曲线更加光滑
// font：字体，默认是'helvetiker'，需对应引用的字体文件
// weight：值为'normal'或'bold'，表示是否加粗
// style：值为'normal'或'italics'，表示是否斜体
// bevelEnabled：布尔值，是否使用倒角，意为在边缘处斜切
// bevelThickness：倒角厚度
// bevelSize：倒角宽度
THREE.TextGeometry(text, parameters) 
// 自定义形状，需要自己添加顶点
// 初始化几何形状
var geometry = new THREE.Geometry();
// 设置顶点位置
// 顶部4顶点
geometry.vertices.push(new THREE.Vector3(-1, 2, -1));
geometry.vertices.push(new THREE.Vector3(1, 2, -1));
geometry.vertices.push(new THREE.Vector3(1, 2, 1));
geometry.vertices.push(new THREE.Vector3(-1, 2, 1));
// 底部4顶点
geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
geometry.vertices.push(new THREE.Vector3(2, 0, -2));
geometry.vertices.push(new THREE.Vector3(2, 0, 2));
geometry.vertices.push(new THREE.Vector3(-2, 0, 2));
// 设置顶点连接情况
// 顶面：添加三角形面(face4已弃用)
geometry.faces.push(new THREE.Face3(0, 1, 2, 3));

```

## 第4章 材质
```js
// 基本材质
// visible：是否可见，默认为true
// side：渲染面片正面或是反面，默认为正面THREE.FrontSide，可设置为反面THREE.BackSide，或双面THREE.DoubleSide
// wireframe：是否渲染线而非面，默认为false
// color：十六进制RGB颜色，如红色表示为0xff0000
// map：使用纹理贴图，详见4.5节
THREE.MeshBasicMaterial(opt) 

// lambert材质
// 光照模型：Idiffuse = Kd * Id * cos(theta) 
// 其中，Idiffuse是漫反射光强，Kd是物体表面的漫反射属性，Id是光强，theta是光的入射角弧度。
new THREE.MeshLambertMaterial({ 
	color: 0xffff00,   // 散射光颜色
	emissive: 0xff0000 // 自发光颜色
}) 

// Phong材质
// 光照模型：Ispecular = Ks * Is * (cos(alpha)) ^ n 
// 其中，Ispecular是镜面反射的光强，Ks是材质表面镜面反射系数，Is是光源强度，alpha是反射光与视线的夹角，n是高光指数，越大则高光光斑越小。
material = new THREE.MeshPhongMaterial({
    color: 0xff0000, // 红色散射光
    specular: 0xffff00, // 黄色镜面光
    shininess: 100
}); 

// 法向材质: 材质的颜色与照相机与该物体的角度相关
new THREE.MeshNormalMaterial() 

// 纹理贴图
// 导入纹理图片
var texture = THREE.ImageUtils.loadTexture('../img/0.png', {}, function(){
	// 图片加载完成后重新渲染
	renderer.render(scene, camera)
});
// 设置纹理
var material = new THREE.MeshLambertMaterial({
    map: texture
}); 
// 重复纹理
texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
texture.repeat.set(4, 4); // s, t方向各重复4次
```

## 第5章 网格
```js
var mesh = new THREE.Mesh(geometry, material)
mesh.position.set(1.5, -0.5, 0); 
```
## 第6章 动画
```js

```
