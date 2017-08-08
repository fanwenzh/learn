# 14 - JavaScript References VS Copying
引用对象复制
1. 数组
```
	const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    let copy1 = players.slice();
    let copy2 = [].concat(players);
    let copy3 = [...players];
    let copy4 = Array.from(players);
    // for in, for, push
```
2. object
```
	const person = {
      name: 'Wes Bos',
      age: 80
    };
    const person1 = Object.assign({}, person, { number: 99, age: 12 });
	const person2 = JSON.parse(JSON.stringify(person));
	<!-- 注意：JSON 方法只能复制对象属性， 但无法复制引用类型属性 -->
	function a(){console.log('test')}
	var b = {a:a, b:2}
	JSON.stringify(b) -> {"b":2}
	
```
浅复制： _.clone(obj)
3. 元素为对象的数组的深度复制
通过判断是否为引用类型：
Object.prototype.toString.call(obj) // '[object Object]'
Object.prototype.toString.call(obj) // '[object Array]'
```
function deepClone(obj) {
	
	for(let ele in obj) {
		if{

		}
	}
}
```
_.clone(obj, true)
_.cloneDeep()
	