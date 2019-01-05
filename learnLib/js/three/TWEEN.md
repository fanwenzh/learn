```js
function initTween()
{
  // 个人控制x, y, z 点更好
  new TWEEN.Tween( mesh.position)
      .to( { x: -400 }, 3000 ).repeat( Infinity ).start();
}
```