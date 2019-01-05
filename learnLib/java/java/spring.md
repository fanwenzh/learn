## bean容器
```java
// 初始化
FileSystemXmlApplicationContext context = new FileSystemApplicationContext("fwz/qwe.xml"); // 文件形式
ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:spring-context.xml");
```

## bean的生命周期
```java
// 全局初始化
// <beans xmlns="" default-init-method="defaultInt" default-destroy-method="defaultDestroy">
// 初始化回调两种方法：
// 1.实现org.springframework.beans.factory.InitializingBean接口，覆盖afterPropertiesSet方法
public class ExampleInitializingBean implements InitializingBean {
	@Override
	public void afterPropertiesSet() throws Exception {
		// do something
	}
}
// 2.配置bean 的 init-method方法
// <bean id="exampleInitBean" class="examples.ExampleBean" init-method="init">
public class ExampleBean {
	public void init() {
		// do something
	}
} 
// 销毁回调两种方法
// 1. 实现org.springframework.beans.factory.DisposableBean接口，覆盖destroy方法
public class ExampleDisposableBean implements DisposableBean {
	@Override
	public void destroy() throws Exception {
		// do something
	}
}
// 2. destroy-method
// <bean id="exampleInitBean" class="examples.ExampleBean" destroy-method="destroy">
public class ExampleBean {
	public void destroy() {
		// do something
	}
} 

// Aware接口(以Aware结尾的接口)
ApplicationContextAware // 声明应用上下文
ApplicationEventPublisherAware
public class MoocApplicationContext implements ApplicationContextAware {
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		System.out.println(applicationContext.getBean("beanName"));
	}
}

```
## Resources 装载
```java
// UrlResource, ClassPathResource, FileSystemResource, ServletContextResource, InputStreamResource, ButeArrayReasource
// 所有ApplicationContext实现了ReasourcerLoader接口
public interface ResourceLoader {

}
```

##
```xml
<!-- Spring注入方法 -->
<!-- 1. 根据xml设值注入：property -->
<property name="name" value="val"></property>
<!-- 2. 根据构造器注入, java类中声明构造函数, xml中添加构造器标签 -->
<constructor-arg name="" class=""/>
<!-- 注入集合 -->
<!-- list -->
<property name="addressList">
 <list>
    <value>INDIA</value>
    <value>Pakistan</value>
    <value>USA</value>
    <value>USA</value>
 </list>
</property>
<!-- set -->
<set>
    <value>INDIA</value>
    <value>Pakistan</value>
    <value>USA</value>
    <value>USA</value>
</set>
<!-- map -->
<map>
    <entry key="1" value="INDIA"/>
    <entry key="2" value="Pakistan"/>
    <entry key="3" value="USA"/>
    <entry key="4" value="USA"/>
 </map>
 <!-- props -->
<props>
	<prop key="one">INDIA</prop>
	<prop key="two">Pakistan</prop>
	<prop key="three">USA</prop>
	<prop key="four">USA</prop>
</props>

```