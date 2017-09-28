```js

var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms
// 将stats的界面对应左上角
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
// mesh 为物体
var mesh = new THREE.Mesh( geometry,material);
function animation()
{
  mesh.position.x-=1;
  renderer.render(scene, camera);
  requestAnimationFrame(animation);

  stats.update();
}
// stats测试帧率
setInterval( function () {
    stats.begin();
    // 你的每一帧的代码 animation()
    stats.end();
}, 1000 / 60 );
```