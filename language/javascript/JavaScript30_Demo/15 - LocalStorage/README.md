# 15 - LocalStorage

1. dom元素form
属性：
	acceptCharset: 可接受的字符集
	action: 设置返回表单
	enctype: 设置或返回表单编码内容的MIME类型
	length: 表单中的元素数目
	method: 提交方法
	target: 提交地址
	name: 提交表单名（服务器使用）
事件：
	onreset
	onsubmit
使用
```
<!-- 监听事件时要停止默认的提交事件, 否则默认提交事件触发，刷新页面 -->
var t = document.querySelector('form');
t.addEventListener('submit', function(e) {
	e.preventDefault();
});

```
2. 存储
	localStorage, sessionStorage, cookie, indexedDB, Web SQL
	
