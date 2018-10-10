## 常用指令
```java
// 访问
${user[0].name}
// 判断
<#if user == "Big Joe">, our beloved leader <#else> test </#if>
// 循环
<#list animals as animal>
  <tr><td>${animal.name}<td>${animal.price} Euros
</#list>
// 或者
<#list misc.fruits>
  <ul>
    <#items as fruit>
      <li>${fruit}
    </#items>
  </ul>
</#list>
// 包含其他页面
 <#include "/copyright_footer.html">
// 内建函数， ?(问号)代替 .(点)来访问
user?html // user 的HTML转义版本
user?upper_case // user 值的大写版本
```