22.bean的生命始末
1、destroy-method执行要求
	被销毁的对象是singletun，即是单例的
	容器需要被显示的关闭
<bean init-method="" destroy-method=""/>

((ClassPathXmlApplicationContext)ac).close()

23.bean的生命周期
step1: construct
step2: setProperty
<bean init-method="" destroy-method="">
	<property name="aPro" value="test"/> // 注入属性
</bean>
step3: set实现接口
step4：获取实现接口的beanFactory
step5: bean后处理器BeanPostProcessor的postProcessBeforeInitialization()
step6: 实现InitializingBean接口, bean初始化完成
	public void afterPropertiesSet() throws Exception{}
step7: <bean init-method=""/>
step8: bean后处理器BeanPostProcessor的postProcessAfterInitialization()
step9: 执行construct的方法
step10：DisposableBean接口:单例且手工关闭
	public void destroy() throws Exception{}
step11:<bean destroy-method=""/>

24.基于xml依赖注入
<bean>
	<property name="aPro" ref="object"/> // 注入属性
</bean>

25. 基于构造依赖注入
<bean>
	// 1.通过有参数constructor函数的参数顺序构造，从0开始
	<constructor-arg index="0" value="test">
        // 2. 通过属性名注入
	<constructor-arg name="proName" value="test">
</bean>
27.p命名空间(赋值)注入
<beans xmlns:c="http://www.springframework.org/schema/p">
	<bean id="myTest" class="com.bjpowernode.di04.myTest" p:name="myname" p:age="26" 
p:school-ref="schoolBean"/>
28.c命名空间（构造器）注入
<beans xmlns:c="http://www.springframework.org/schema/c">
	<bean id="myTest" class="com.bjpowernode.di04.myTest" c:name="myname" c:age="26" 
c:school-ref="schoolBean"/>
29.集合注入
public class some{
	private School[] schools;
	private List<String> myList;
	private Set<String> mySet;
	private Map<String, Object> myMap;
	private Properties myPros; // 键值对都是字符串
}
<bean id="some" class="com.bjpowernode.di05.Some">  // 简便写法：
	<property name="schools">
		<array>
			<ref bean="school1"> // 数组注入（引用）
		</array>
	</property>
	<property name="myList">  // 简便写法：<property name="myList" value="张三,李四"/> 
		<list>
			<value>张三</value>
			<value>李四</value>
		</list>
	</property>
	<property name="mySet">
		<set>
			<value>张三</value>
			<value>李四</value>
		</set>
	</property>
	<property name="myMap">
		<map>
			<entry key="QQ" value="123"></entry>
		</map>
	</property>
	<property name="myPros">
		<props>
			<prop key="myKey">value</props>
		</props>
	</property>
</bean>

31. 根据名称对(Object)域属性的自动注入
<bean id="myStudent" class="" autowire="byName"> // 根据bean（域属性名）id的名称自动注入
32. 根据域属性类型(查找相同类型的Bean)自动注入:要求具有is-a关系(继承)的bean仅有一个
<bean id="myStudent" class="" autowire="byType"> 
34.SPEL表达式 
	#{bean.pro} // 使用其他属性
	#{T(java.lang.Math).random()*50} // 使用通用方法
	#{myBean.fun()} // 使用类方法
35. 匿名bean, 内部匿名bean
	<property name="myPros">
		<bean></bean>
	</property>
36. 同、异类抽象bean
	<bean id="baseStudent" class="" abstract="true"></bean>
	<bean id="student" parent="baseStudent"> // 继承属性
38. spring多配置文件:平等关系
   1.   String resource = "/spring-*.xml"
	ApplicationContext ac = new ClassPathXmlApplicationContext(resource)
   2.   String r1 = "/spring-base.xml"
	String r2 = "/spring-beans.xml"
	ApplicationContext ac = new ClassPathXmlApplicationContext(r1, r2)
   3.   Spring[] rs ={r1, r2}
	ApplicationContext ac = new ClassPathXmlApplicationContext(rs)
39. spring多配置文件：包含关系
	<beans>
		<import resource="spring-*.xml">
	</beans>
43.基于注解注入
@Component("myschool") // value="myschool"
@Scope("prototype") // 默认是singleton
public class School {
  @Value("清华大学")
  private String sname;
}

// 扫描java类@Component，扫描some的子包, com.fwz.some扫描some及其子包
<context:component-scan base-package="com.fwz.some.*"/>
@Component("myStudent")
public class Student{
  @Autowired  // 域属性byType(类类型)
  private School school;
}
45. 与@Component具有相同功能，不同意义的注解
@Repository:注解在dao实现类
@Service:注解在service实现类
@Controller:注解在处理器实现类 
46. byName自动注入
@Autowired
@Qualifier("mySchool")
private School school;
47. jdk6以上 @Resource
@Resource  // byType
private School school;
@Resource("mySchool") // byName
private School school;
48. bean生命周期始末
@PostConstruct
@PreDestroy
((ClassPathXmlApplicationContext)ac).close()
49. javaConfig
@Configuration // Spring容器类
public class MyJavaConfig{
  @Bean(name="mySchool") // 应用byName时，要与student的属性名相同
  public School mySchoolCreator(){
    return new School("北京大学")
  }
  @Bean(name="myStudent", autowire=Autowire.BY_TYPE) // Autowire.BY_NAME
  public Student myStudentCreator(){
    return new Student("李四", 24)	  
  }
}
50. Junit测试@RunWith,@ContextConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:/applicationContext.xml")
public class myTest(){
  @Resource // @Resource(name="myStudent")
  private Student student;
  @Test
  public void test01(){
    System.out.println(student);
  }
}
51.优先级：（有set方法）xml > 注解注入
52. AOP(动态代理，装配器)
Aspect切面 - weaving织入 - join point连接点 - point cut切入点 - target目标对象 - advice通知 - 

advisor顾问
57. AOP通知
// 注册目标对象
<bean id="someService" class="" />
// 注册通知
<bean id="myAdvice" class="myMethodBeforeAdvice"/>
// 生成代理对象
<bean id="serviceProxy" class="org.springframework.aop.framework.ProxyFactory">
	<property name="traget" ref="someService"></property>
    //  <property name="targetName" value="someService">
        <property name="interceptorNames" value="myAdvice">
</bean>
public class myMethodBeforeAdvice implements MethodBeforeAdvice{
  @Override
  public void before(Method method, Object[] args, Object target) throws Throwable{
    System.out.println("执行前置通知方法")
  }
}
58.后置通知
public class MyAfterReturningAdvice implements AfterReturningAdvice{
  public void afterReturning(){}
}
59.环绕通知,可获取函数结果
public class MyMethodInterceptor implements MethodInterceptor{
	public Objcet invoke(MethodInvocation invocation) throws Throwable{
		System.out.println("执行前")
		Object result = invocation.proceed();
		System.out.println("执行后")
		return result;
	}
}
60.异常通知 ThrowsAdvice
<bean id="myAdvice" class="MyThrowsAdvice">
public class MyThrowsAdvice implements ThrowsAdvice{
  public void afterThrowing(Exception ex){}
}

61. 给目标方法添加多个切面
<bean id="serviceProxy" class="org.springframework.aop.framework.ProxyFactoryBean">
	<property name="target" ref="someService">
	// <property name="interceptorNames" value="myBeforeAdvice,myAfterAdvice"/>
	<property name="interceptorNames">
		<array>
			<value>myBeforeAdvice</value>
			<value>myAfterAdvice</value>
		</array>
	</property>
</bean>
62. 无接口的动态代理：CGLIB代理
63. (原jdkProxy)有接口CGLIB代理
<property name="proxyTargetClass" value="true">
// <property name="optimize" value="true">
64. advisor顾问分类:PointcutAdvisor:NameMatchMethodPointcutAdvisor
<bean id="myAdvisor" class="org.springframework.aop.support.NameMatchMethodPointcutAdvisor">
	<property name="advice" ref="myAdvice">
	<property name="mappedName" value="doFirst">
	// <property name="mappedNames" value="doFirst,doSecond"> // "*ir*"，匹配方法名
</bean>
65.正则表达式顾问：PointcutAdvisor:Regexp
<bean id="myAdvisor" class="org.springframework.aop.support.RegexpMethodPointcutAdvisor">
	<property name="advice" ref="myAdvice">
	<property name="pattern" value=".*ir.*"> // 匹配全限定性方法名(接口.方法)
	// <property name="pattern" value=".*fun1 | .*fun2">
	// <property name="patterns" value=".*fun1,fun2">
</bean>
67.自动代理生成器: 代理所有的目标对象
// 注册自动代理生成器
<bean class="org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCteator">
68.bean名称自动代理生成器
// 1.可以选择要增强的目标对象，2.切面可以是advice，也可以是advisor
<bean class="org.springframework.aop.framework.autoproxy.BeanNameAutoProxyCreator">
	<property name="beanNames" value="service1">
	<property name="interceptorNames" value="myAdvisor"> 
</bean>
69.AspectJ在Spring中对AOP的实现
execution(访问权限，返回类型，全限定性类名，方法名（参数名），抛出异常类型)
举例：
execution(public * *(..)) 任意公共方法
execution(* set*(..)) 任意以set开始的方法
execution(* *.service.*.*(..)) 一级包下service子包下的所有方法
execution(* *..service.*.*(..)) 所有service包下的所有方法
72.基于注解的aop实现
<bean id="someService" class="SomeServiceImpl"/>
<bean id="myAspect" class="MyAspect"/>
// 生成aspectj的自动代理
<aop:aspectj-autoproxy/>

@Aspect
public class MyAspect{
  // 前置通知
  @Before("execution(* *..ISomeService.doFirst(..))")
  public void before(){
    System.out.println("前置通知方法")
  }
  @Before("execution(* *..ISomeService.doFirst(..))")
  public void before(JoinPoint jp){ // 切入点
    System.out.println("前置通知方法before() jp=" + jp)
  }
  // 后置通知
  @AfterReturning("execution(* *..ISomeService.doSecond(..))")
  public void afterReturning(){
    System.out.println("后置通知方法")
  }
  @AfterReturning(value="execution(* *..ISomeService.doSecond(..))", returning="result")
  public void afterReturning(String result){
    System.out.println("后置通知方法 result = " + result)
  }
  // 环绕通知
  @Around("execution(* *..ISomeService.doSecond(..))")
  public Object around(ProceedingJoinPoint pjp) {
    System.out.println("环绕前")
    Obect result = pjp.proceed();
    System.out.println("环绕后")
    return ((String)result).toUpperCase();
  }  
  // 异常通知
  @AfterThrowing("execution(* *..ISomeService.doThird(..))")
  public void afterThrowing(){
    System.out.println("异常通知")
  }
  @AfterThrowing(value="execution(* *..ISomeService.doThird(..))", throwing="ex")
  public void afterThrowing(Exception ex){
    System.out.println("异常通知 ex="+ex.getMessage());
  }
  // 通过切入点 发送最终通知
  @After("doThirdPointcut()")
  public void after(){
     System.out.println("最终通知")
  }
  // 定义切入点
  @Pointcut("execution(* *..ISomeService.doThird(..))")
  public void doThirdPointcut(){}  
} 
78. 基于xml的aop实现
<bean id="myAspect" class="MyAspect">
<aop:config>
  <aop:pointcut expression="execution(* *..ISomeService.doFirst(..))" id="doFirstPointcut"/>
  <aop:aspect ref="MyAspect">
    <aop:before method="before" pointcut-ref="doFirstPointcut"/>
    <aop:before method="before" pointcut="execution(* *..ISomeService.doFirst(..))"/>
    <aop:before method="before(org.aspectj.lang.JoinPoint)" pointcut="execution(* 

*..ISomeService.doFirst(..))"/>
    <aop:after-returning method="afterReturning" point-ref="doSecondPointcut"/>
    <aop:after-returning method="afterReturning(java.lang.String)" pointcut-

ref="doSecondPointcut" returning="result"/>
    <aop:around method="around" pointcut-ref="doSecondPointcut"/>
    <aop:after-throwing method="afterThrowing" pointcut-ref="doThirdPointcut"/>
    <aop:after-throwing method="afterThrowing(java.lang.Exception)" pointcut-

ref="doThirdPointcut" throwing="ex"/>
    <aop:after method="after" pointcut-ref="doThirdPointcut"/>
  </aop:aspect>
</aop:config>
84. jdbc
spring-tx 事务
spring-jdbc
mysql-connector 数据驱动
85.jdbc模板
public class StudentDao extends JdbcDaoSupport implements IStudentDao {
    public void insterStudent(Student student) {
        // jdbc模板应用sql查询
        String sql = "insert into student(name, age) values(?,?)";
        this.getJdbcTemplate().update(sql,student.getName(), student.getAge());
    }
}
public class studentServiceImpl implements IStudentService{

}
// 注册数据源:spring内部数据源
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://127.0.0.1:3366/test"/>
    <property name="username" value="root"/>
    <property name="password" value="123"/>
</bean>
// DBCP数据源
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://127.0.0.1:3366/test"/>
    <property name="username" value="root"/>
    <property name="password" value="123"/>
</bean>
// C3P0数据源
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="com.mysql.jdbc.Driver"/>
    <property name="jdbcUrl" value="jdbc:mysql://127.0.0.1:3366/test"/>
    <property name="user" value="root"/>
    <property name="password" value="123"/>
</bean>
// 注册Jdbc模板对象
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="jdbcTemplate" ref="dataSource"/>
</bean>
// 注册Dao
<bean id="studentDao" class="com.bjpowernode.dao.StudentDaoImpl">
    <property name="jdbcTemplate" ref="jdbcTemplate"/>
</bean>
// 注册Service
<bean id="studentService" class="com.bjpowernode.service.StudentServiceImpl">
    <property name="dao" ref="studentDao">
</bean>
91. 从属性文件中读取DB链接
// jdbc.properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://127.0.0.1:3366/test
jdbc.user=root
jdbc.password=123
// 1.通过bean注册JDBC属性文件
<bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
    <property name="location" value="classpath:jdbc.properties">
    // 多个文件用locations
</bean>
// 2.通过context约束注册
<context:property-placeholder location="classpath:jdbc.properties"/>
92. 测试增删查改
public class MyTest{
    private IStudentService service;
    @Before
    public void before(){
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        service = (IStudentService) ac.getBean("studentService");
    }
    @Test
    public void testAdd(){
        // service进行各项数据库操作
    }
}
93.spring-Junit4测试
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(location="classpath:applicationContext.xml")
public class MyTest2{
    @Autowired
    private IStudentService service;
}
94. 将数据源注入dao
// 注册Jdbc模板对象与Dao, 不用手工注册Template
<bean id="studentDao" class="com.bjpowernode.dao.StudentDaoImpl">
    <property name="dataSource" ref="dataSource"/>
</bean>
<bean id="studentService" class="com.bjpowernode.service.StudentServiceImpl">
    <property name="dao" ref="studentDao"/>
</bean>
95. 查询
String sql = "select name from student";
this.getJdbcTemplate().queryForList(sql, String.class);
sql = "select name from student where id=?";
this.getJdbcTemplate().queryForObject(sql, String.class, id);

public class StudentRowMapper implements RowMapper<Student> {
    // rs仅表示遍历的一行记录
    @Override
    public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        studnent.setName(rs.getString("name"));
        student.setAge(rs.getInt("age"))
        return student;
    }
}
sql = "select id,name,age from student";
this.getJdbcTemplate().query(sql, new StudentRowMapper()) // 内部匿名类映射
97. jdbc模板对象是多例的
public class StudentDaoImpl extends JdbcDaoSupport implements IStudentDao{
    // 模板对象是多例的，执行结束后即销毁，所以不能抽象出来
    private JdbcTemplate jt;
}
98.事务管理
1)Spring 事务代理工厂管理事务
2)Spring 事务注解管理事务
3)AspectJ的AOP管理事务
109.spring事务代理工厂实现事务
// 注册事务管理器
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>
// 生成Service的事务代理对象（全局容器获取的是代理）
<bean id="serviceProxy" class="org.springframework.transaction.interceptor.TransactionProxyFactoryBean">
    <property name="target"> ref="buyStockService"</property>
    <property name="transactionManager" ref="transactionManager"></property>
    <property name="transactionAttributes">
        <props>
            // 在指定的切入点方法应用的事务属性
            <prop key="open*">ISOLATION_DEFAULT,PROPAGATION_REQUIRED</prop>
            // 默认为运行时异常回滚，首查异常执行
            ，自定义异常执行，-回滚+提交
            <prop key="buyStock">ISOLATION_DEFAULT,PROPAGATION_REQUIRED,-buyStockException</prop>
        </props>
    </property>
</bean>
111.spring的事务注解，需添加约束
// 注册事务管理器，用目标对象Service
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>
// 注册事务注解驱动
<tx:annotation-driven transaction-manager="transactionManager"/>

@transactional(isolation=Isolaction.DEFAULT, propagation=Propagation.REQUIRED, rollbackFor=buyStockException.class)
112.使用AspectJ的AOP配置管理事务
// 注册事务管理器，用目标对象Service
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>
// 注册事务通知
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
       // 配置连接点方法的事务属性
        <tx:method name="open*" isolation="DEFAULT" propagation="REQUIRED"/>
        <tx:method name="buyStock" isolation="DEFAULT" propagation="REQUIRED" rollback-for="BuyStockException"/>
    </tx:attributes>
</tx:advice>
// aop配置
<aop:config>
    // 指定切入点（应用于连接点）
    <aop:pointcut expression="execution(* *..service.*.*(..))" id="myPointcut">
    <aop:advisor advice-ref="txAdvice" pointcut-ref="myPointcut"/>
</aop:config>
115.与Hibernate整合
// 注册SessionFactory
<bean id="mySessionFactory" class="LocalSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="mappingDirectoryLocations" value="com/fwz/beans">
    <property name="hibernateProperties">
        <props>
            <prop></prop>
        </props>
    </property>
</bean>
116. 事务配置
// 注册事务管理器
<bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">
    <property name="sessionFactory" ref="mySessionFactory"/>
</bean>
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:method name="add*" isolation="DEFAULT" propagation="REQUIRED"/>
    <tx:method name="remove*" isolation="DEFAULT" propagation="REQUIRED"/>
    <tx:method name="modify*" isolation="DEFAULT" propagation="REQUIRED"/>
    <tx:method name="find*" isolation="DEFAULT" propagation="REQUIRED" read-only="true"/>
</tx:advice>
// aop配置
<aop:config>
    <aop:pointcut expression="execution(* *..service.*.*(..))" id="myPointcut"/>
    <aop:advisor advice-ref="txAdvice" pointcut-ref="myPointcut"/>
</aop:config>
117.映射文件
