//  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
window.onresize=function (){
  // 480px图纸
  document.documentElement.style.fontSize=document.documentElement.clientWidth/48+'px';
};
window.onresize()

// 事件: touchmove, touchend
oDiv.addElementEvent('touchstart', function(e){
  let x = e.targetTouches[0].clientX
  oBox.style.transform=`translate(${x}px,${y}px)`;
})
oDiv.removeEventListener()
// 多点触摸：
// 1.避免影响——消除干扰
//   平均坐标
// 2.需要多点——手势
//   i.旋转    后角度-前角度 // Math.atan(b/a) 或 Math.atan2(b, a);
//   ii.缩放   后距离/前距离

// 真机测试
// 1. 夜神模拟器(游戏)
// 2. browsersync 多端同步测试 // cnpm i -g brower-sync
// browser-sync init // bs-config.js的files属性设为true
// browser-sync start --server
// 3000端口：文件，30001端口：配置
// 3.webpack-dev-server

// 外网服务器——部署：
// 1.服务器环境配置——Linux
//   yum、mysql、httpd、iptable、...
// 2.代码——ftp
//   ssh
// 3.维护

// 库
// vconcole 移动端console
// browsersync 多端同步、console
// iscroll 滚动
// hammer 手势