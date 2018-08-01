# 10 - Hold Shift and Check Checkboxes

1. css选择器运用
```
	<!-- 利用选择器设置样式，input[type="checkbox"] -->
    input:checked + p {
      background:#F9F9F9;
      <!-- 横线 -->
      text-decoration: line-through;
    }

```
2. dom属性
```
	<input type="checkbox"></input>

	let input = document.querySelector('input');
	input.checked == true; // 先style变成true，后出发click事件
```