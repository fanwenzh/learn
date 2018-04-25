spring mvc
```java
// 1. 前端控制器DispatcherServlet: 作用接受请求，相应结果(请求转发)
// 2. 处理器映射器HandlerMapping: 根据请求的url查找Handler
// 3. 处理器适配器HandlerAdaper: 按特定的规则（根据适配器）执行Handler
// 4. 处理器Handler: [程序员开发]的执行控件
// 5. 视图解析器View resolver: 根据逻辑视图名解析成view
// 6. 视图view: 接口，[程序员开发]实现类支持不同的view类型（jsp、freemaker等）

// 1. 用户发起请求到前端控制器DispatcherServlet
// 2. 前端控制器请求向处理器映射器HandlerMapping查找Handler（xml配置、注解查找）
// 3. 前端控制器调用处理器适配器执行Handler
// 4. Handler向处理器适配器返回ModelAndView
// 5. 处理器适配器向前端控制器返回ModelAndView
//   ModelAndView为springmvc框架的底层对象，包括model和view
// 6. 前端控制器请求视图解析器进行视图解析
// 根据逻辑视图名解析成视图jsp
// 7. 视图解析器向前端控制器返回view
// 8. 前端控制器进行视图渲染
//  视图渲染将模型数据（ModelAndView对象中）填充到request域
// 9. 前端控制器向用户相应结果


```