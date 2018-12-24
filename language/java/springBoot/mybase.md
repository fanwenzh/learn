## 1. 启动
```java
@SpringBootApplication = @EnableAutoConfiguration 自动装配 + @ComponentScan(excludeFilters={@ComponentScan.Filter(type=CUSTOM,classes=TypeExcludeFilter.class),}) 默认配置 等等
// 自配置：
@ComponentScan(basePackages = "com.fwz.controller")
@EnableAutoConfiguration
```

## 2. 静态资源
```java
// 默认 : src/main/resources/static
// web模板配置：application.properties
spring.mvc.view.prefix=/WEB-INF/jsp/
spring.mvc.view.suffix=.jsp
```

## 3. 全局捕获异常

## 备注：注解
```java
// https://blog.csdn.net/weixin_37490221/article/details/78406810
@ComponentScan(basePackages ={""}) // 扫描Component
@Component 元注解
@Controller
@Servce
@Repository // hibernate的DAO层
// 注册Bean方法，返回Bean类型
@Bean(initMethod=“init”,destroyMethod=“destroy”)
@PostConstruct // 构造函数完成后执行的函数
@PreDestroy // 销毁对象之前执行的函数

// 依赖注入
@Autowired
@Resource
// 声明配置(java)类
@Configuration
@PropertySource
@ImportResource() // 加载xml配置
// web映射
@RestController // 返回json
@ResponseBody // 单个方法
@RequestMapping(value = "/url/{id}", method = RequestMethod.GET)
  public String func(@PathVariable("id") Integer id)
@GetMapping(value="/url") // 映射：/url?id=2
  public String func(@RequestParam(value = "id", required = false, defaultValue = "0") Integer id)
@PostMapping

// AOP
@Aspect // springboot2.0以上默认开启：@EnableAspectJAutoProxy
@After
@Before
@Around
@PointCut

// 事务
@Transactional
// 异步
@EnableAsync // 配置类支持异步
@Async // 异步方法
// Junit注解
@RunWith(Test.class)
// 异常处理
@ExceptionHandler

```