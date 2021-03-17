# 03 - CSS Variables
1. css变量
```
// 定义变量
:root {
    --name: ;
}
// 使用变量
h1 {
    padding: var(--name);
}
// :root根元素 document.documentElement
// 操作变量 ele
ele.style.setProperty('--name', val);
ele.style.getPropertyValue('margin'); // "1px 2px"
ele.style.removeProperty(attr);
ele.style.getPropertyPriority('margin') === 'important'
```
2. 自定义标签属性
```
<p data-test='hi'></p>
// js
var p = document.querySelector('p');
p.dataset.test === 'hi' // true
```