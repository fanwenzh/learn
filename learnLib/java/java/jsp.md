
<!-- 插入代码段 -->
<% 代码片段 %> 
或 xml形式
<jsp:scriptlet>代码片段<jsp:scriptlet>

<!-- 中文编码 -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- jsp声明 -->
<%! int i = 0; %>
或
<jsp:declaration>
   代码片段
</jsp:declaration>

<!-- jsp表达式 -->
<%= 表达式 %>
或 
<jsp:expression>
   表达式
</jsp:expression>

<!-- jsp注释 -->
<%-- 该部分注释在网页中不会被显示--%> 

<!-- jsp指令 -->
<%@ page %> 定义页面属性
<%@ include %> 包含其他文件（静态或动态资源）
<%@ taglib %> 引入标签库的定义
	
<!-- jsp行为 -->
<jsp:include>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<p c:foreach></p> // 运用类库中的方法
jsp:include	用于在当前页面中包含静态或动态资源
	<%@ include file="文件相对url地址" %>
jsp:useBean	寻找和初始化一个JavaBean组件
	<jsp:useBean id="name" class="package.class" /> // 读取java中的bean(java类)
	<jsp:setProperty name="test" property="message" value="菜鸟教程..." /> // 初始化bean
	<jsp:getProperty name="test" property="message"/>
jsp:setProperty	设置 JavaBean组件的值
jsp:getProperty	将 JavaBean组件的值插入到 output中
jsp:forward	从一个JSP文件向另一个文件传递一个包含用户请求的request对象
jsp:plugin	用于在生成的HTML页面中包含Applet和JavaBean对象
jsp:element	动态创建一个XML元素
jsp:attribute	定义动态创建的XML元素的属性
jsp:body	定义动态创建的XML元素的主体
jsp:text	用于封装模板数据

<!-- jsp隐含对象 -->
request	    HttpServletRequest类的实例
response	HttpServletResponse类的实例
out	        PrintWriter类的实例，用于把结果输出至网页上
session	    HttpSession类的实例
application	ServletContext类的实例，与应用上下文有关
config	    ServletConfig类的实例
pageContext	PageContext类的实例，提供对JSP页面所有对象以及命名空间的访问
page	    类似于Java类中的this关键字
Exception	Exception类的对象，代表发生错误的JSP页面中对应的异常对象

<!-- jsp字面量 -->
boolean, int, float, string, Null

<!-- 中文编码 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>