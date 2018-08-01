# 06 - Type Ahead

1. 交互
fetch
```
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// 结构
// body:ReadableStream
	.bodyUsed 示body是否被读取过的 Boolean 值
	.arrayBuffer(), blob(), formData(), json(), text()
// header: Headers // new Headers
	.append(), delete(), entries(), getAll(), has(), keys(), set(), values()
// request // new Request()
	只读属性： .url, .headers,  .mode //是否同源, .cache, .redirect
	方法： 同body
// response // new Response()
	只读属性： .type, .url, .status, .ok , .headers, .bodyUsed
	方法：同body + .redirect

fetch(url)
	.then(res => 
		if(res.ok) {
			return res.json()) // res.text(), res.formData()
		} else {
			throw new Error('获取失败');
		}
	.then(data => data)
	.catch(err => console.log(err));
```
ajax复习
```
	let xhr = new XMLHttpRequest;
	xhr.open('GET', url);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
			const res = xhr.responseText;
		}
	}
	xhr.onprocess = function(){}
	xhr.onerror = function(){}
	xhr.send();
```
2. dom操作复习
```
// es2015
js/es2015
```
3. js技巧使用
```
// numberWithCommas: 正则的？使用4种，js/es2015
num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// filter, match, indexOf, index,
```
4. css
```
transform: perspective(100px); // 改变3d选择元素底部位置
outline: 外边框 // border外
```