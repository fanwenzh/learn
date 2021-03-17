spring mvc
```java
// 1. 前端控制器DispatcherServlet: 接收请求，进行相应(请求转发)
// 2. 处理器映射器HandlerMapping: 根据请求的url查找Handler（xml配置，注解方式）
// 3. 处理器适配器HandlerAdaper: 按特定的规则（根据适配器）执行Handler
// 4. 处理器Handler: [程序员开发]的执行控件Controller（注解开发），具体返回类型包括ModelAndView, String（逻辑视图名）, void（通过在Handler的形参中添加request,可指定response响应结果返回json数据）
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

// 前端控制器源码查看
第一步：前端控制器接收请求 // 调用doDiapatch
第二步：前端控制器调用处理器映射器查找Handler // mappedHandler = getHandler(processedRequest, false)
第三步：调用处理器适配器执行Handler, 得到执行结果ModelAndView // mv = ha.handle(processedRequest, response, mappedHandler.getHandler())
第四步：视图渲染，将model数据填充到request域。// view = resolveViewName(mv.getViewName(), mv.getModelInternal(), locale, request)
视图解析得到view, 调用render方法渲染数据
```

spring 和 mybaits整合
```java
第一步：整合dao层
	mybaits和spring整合，通过spring管理mapper接口
	使用Mapper的扫描器自动扫描mapper接口在spring中进行注册
第二步：整合service层
	通过spring管理service接口。
	使用配置方式将service接口配置在spring配置文件中。
	实现事务控制。
第三步：整合springmvc(表现层)
	由于springmvc是spring的模块，不需要整合
	创建springmvc.xml文件，配置处理器映射器、适配器、视图解析器
第四步：加载spring容器
	将mapper（自动扫描）、service（声明式配置）、controller（组件扫描）加载到spring容器中，因此需要将spring内的配置文件加载到springmvc.xml中

	建议使用通配符加载配置文件，在web.xml中添加spring容器监听器，加载spring容器

所需jar包：
	数据库驱动：mysql
	持久层：mybatis
	log4j
	数据库连接池：dbcp
	spring
```

springmvc
```java
// Controller 自定义参数绑定
1. 日期类型转换需要自定义Converter<S, T>source, target接口 
2. 将自定义的Converter实现类注入处理器适配器中

// Springmvc中的 po
1. 逆向工程的po
2. 继承的customPo
3. 包装类型customVo(组合)

```

springmvc 和 struts2的区别
```java
1. springmvc基于方法开发，struts2基于类开发
springmvc将url和controller方法映射，映射成功后springmvc生成一个Handler对象，对象中只包括了一个method。方法执行结束，行参数据销毁。
springmvc的controller开发类似service开发。
2. springmvc可以进行单例开发，并建议使用单例开发，struts2通过类的成员变量接受参数（多线程共享变量），无法使用单例，只能使用多例
3. 测试发现，struts2速度慢，在于使用struts标签，所以使用时建议使用jstl

```

服务端校验
```java
// 控制层controller: 校验页面请求的参数合法性。
// 业务层service（使用较多）: 主要校验关键业务参数，仅限于service接口中使用的参数
// 持久层dao: 一般不校验

// hibernate校验框架 validation
// 1. 环境配置：hibernate-validator-.jar
// 2. 配置校验器
// 3. 校验器注入到处理器适配器中
// 4. 在pojo中添加校验规则，@Size, @NotNull
// 5. 统一配置错误信息CustomValidationMessage.properties
// 6. controller捕获校验信息
// 7. controller将错误信息传到页面中

// 分组校验
// 每个controller方法使用不同的校验分组
```

数据回显
```java
// springmvc默认对pojo数据回显
// pojo数据传入controller方法后，springmvc自动将pojo数据放到request域中，其中key等于pojo类型（首字母小写）
// 1.@ModelAttribute
// 2.可直接通过model.addAttribute(attr, obj) 显示

```

异常处理
```java
// springmvc前端处理器定义ExceptionResolver(异常处理器)
// 自定义异常类，继承Exception

// 如果该异常类型是系统自定义的异常，直接取出异常信息，在错误页面展示
// 如果该异常不是系统自定义的异常，构造一个自定义异常类（未知错误）

// 自定义异常处理器
// 配置异常处理器
```

上传图片
```java
// 1. 配置multipart类型解析器，提交enctype="multipart/form-data"时，需要springmvc对multipart类型的数据进行解析, 并添加jar包：commons-fileupload, commons-io

// 2. 创建虚拟保存目录
// 	（1）可通过图形界面修改
// 	（2）也conf/server.xml文件添加虚拟目录
// 	<Context docBase="F:\develop\upload\temp" path="\pic" reloadable="false"/>

// 3、图片上传代码

```

json数据交互
```java
@RequestBody: 将json串转成java对象
@ResponseBody: 将java对象转换成json串

1. jar包：jackson-core-asl, jackson-mapper-asl 用于json转换
2. 配置Json转换器
```

拦截器
```java
1. springmvc拦截器是针对 [HandlerMapping] 进行拦截设置。
如果在摸个HandlerMapping中配置拦截，经过该HandlerMapping映射成功的handler最终使用该拦截器。
2. springmvc配置类似全局的拦截器，springmvc框架将配置拦截器注入 [每个HandlerMapping] 中。
例：拦截器1、拦截器2
其中拦截器preHandle按顺序执行，postHandle和afterCompletion按拦截器配置的逆向顺序执行。
拦截器2不放行，拦截器2postHandle和afterCompletion不执行, 拦截器1只执行afterCompletion方法。
所以统一日志处理的拦截器放在拦截器链第一位，且preHandle放行。
```


