## 常用指令
```java
// 访问
${user[0].name}
// 字符串切分
name[0..4] // 包含结尾
name[0..<5] // 不包含结尾 或 name[0..!5]
name[0..*5] // 基于长度(宽容处理)
name[5..] // 去除开头
// 判断
<#if user == "Big Joe">, our beloved leader <#else> test </#if>
// 循环
<#list animals as animal>
  <tr><td>${animal.name}<td>${animal.price} Euros ${i}
</#list>
// 或者
<#list misc.fruits>
  <ul>
    <#items as fruit>

      <li>${fruit}, 
        ${fruit?index} // 从0开始
        ${fruit?counter} // 从1开始
    </#items>
  </ul>
</#list>
// 包含其他页面
 <#include "/copyright_footer.html">
// 内建函数， ?(问号)代替 .(点)来访问
  user?html // user 的HTML转义
  user?upper_case // user 值的大写
  animal.name?cap_first // 首字母大写
  user?length // 长度
  animals?size // 模型个数
  animal.protected?string("Y", "N") // 基于 animal.protected 的布尔值来返回字符串 "Y" 或 "N"。
  fruits?join(", ") // 通过连接所有项，将列表转换为字符串， 在每个项之间插入参数分隔符(比如 "orange banana")
  user?starts_with("J") // 根据 user 的首字母是否是 "J" 返回布尔值true或false
// 默认值
<h1>Welcome ${user!"visitor"}!</h1>
// 判断是否存在
<#if user??><h1>Welcome ${user}!</h1></#if>
```