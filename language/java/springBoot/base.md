# 3.spring boot配置
@Configuration  // xml配置文件，作用于类
@Bean // <bean>，作用于方法
## 3.2
```java
@Service
public class UserService {
  @Autowired
  private UserDao userDao;
  public List<User> queryUserList() {
    return this.userDAO.queryUserList();
  }
}
@Configuration
@ComponentScan(basePackages="cn.itcast.sprintboot.javaconfig")
public class SpringConfig {
  @Bean   // 注册bean
  public UserDAO getUserDAO() {
    return new UserDAO();
  }
}
public class Main {
  public static void main(String[] args) {
    // 获得上下文容器
    AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
    // 获得Bean对象
    UserService userService = context.getBean(UserService.class);
    context.destroy();
  }
}
```
## 3.3 去读外部资源配置
### xml配置数据库连接池
```xml
<!-- 配置依赖 -->
  <dependency>
    <groupId>com.jolbox</groupId>
    <artifactId>bonecp-spring</artifactId>
    <version>0.8.0.RELEASE</version>
  </dependency>


<!-- 定义数据源 -->
	<bean id="dataSource" class="com.jolbox.bonecp.BoneCPDataSource"
		destroy-method="close">
		<!-- 数据库驱动 -->
		<property name="driverClass" value="${jdbc.driverClassName}" />
		<!-- 相应驱动的jdbcUrl -->
		<property name="jdbcUrl" value="${jdbc.url}" />
		<!-- 数据库的用户名 -->
		<property name="username" value="${jdbc.username}" />
		<!-- 数据库的密码 -->
		<property name="password" value="${jdbc.password}" />
		<!-- 检查数据库连接池中空闲连接的间隔时间，单位是分，默认值：240，如果要取消则设置为0 -->
		<property name="idleConnectionTestPeriod" value="60" />
		<!-- 连接池中未使用的链接最大存活时间，单位是分，默认值：60，如果要永远存活设置为0 -->
		<property name="idleMaxAge" value="30" />
		<!-- 每个分区最大的连接数 -->
		<!-- 
			判断依据：请求并发数
		 -->
		<property name="maxConnectionsPerPartition" value="100" />
		<!-- 每个分区最小的连接数 -->
		<property name="minConnectionsPerPartition" value="5" />
	</bean>
```
java配置
```java
@Configuration //通过该注解来表明该类是一个Spring的配置，相当于一个xml文件
@ComponentScan(basePackages = "cn.itcast.springboot.javaconfig") //配置扫描包
@PropertySource(value= {"classpath:jdbc.properties"}, ignoreResourceNotFound=true)
public class SpringConfig {
  @Bean // 通过该注解来表明是一个Bean对象，相当于xml中的<bean>
  public UserDAO getUserDAO(){
      return new UserDAO(); // 直接new对象做演示
  }

  @Value("${jdbc.url}")
  private String jdbcUrl;
  @Value("${jdbc.driverClassName}")
  private String jdbcDriverClassName;
  @Value("${jdbc.username}")
  private String jdbcUsername;
  @Value("${jdbc.password}")
  private String jdbcPassword;

  @Bean(destroyMethod = "close")
  public DataSource dataSource() {
    BoneCPDataSource boneCPDataSource = new BoneCPDataSource();
    // 数据库驱动
    boneCPDataSource.setDriverClass(jdbcDriverClassName);
    // 相应驱动的jdbcUrl
    boneCPDataSource.setJdbcUrl(jdbcUrl);
    // 数据库的用户名
    boneCPDataSource.setUsername(jdbcUsername);
    // 数据库的密码
    boneCPDataSource.setPassword(jdbcUsername);
    // 检查数据库连接池中空闲连接的间隔时间，单位是分，默认值：240，如果要取消则设置为0
    boneCPDataSource.setIdleConnectionTestPeriodInMinutes(60);
    // 连接池中未使用的链接最大存活时间，单位是分，默认值：60，如果要永远存活设置为0
    boneCPDataSource.setIdleMaxAgeInMinutes(30);
    // 每个分区最大的连接数
    boneCPDataSource.setMaxConnectionsPerPartition(100);
    // 每个分区最小的连接数    
    boneCPDataSource.setMinConnectionsPerPartition(5);
    return boneCPDataSource;
  }
}
```
## 4 Springboot
xml配置
```xml
<!-- Spring boot的项目必须要将parent设置为spring boot的parent(包含默认配置、版本号) -->
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>1.5.2.RELEASE</version>
</parent>
<!-- 1.1.1.	spring boot的web支持-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!-- spring boot 插件 -->
<plugin>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```
### 4.3 spring应用
```java
@Controller
@SpringBootApplication // 开启自动配置
@Configuration
public class HelloApplication {
    
    @RequestMapping("hello") // 映射(访问))地址
    @ResponseBody 
    public String hello(){
        return "hello world！";
    }
    // 应用的入口
    public static void main(String[] args) {
        SpringApplication.run(HelloApplication.class, args);
    }
}
```

