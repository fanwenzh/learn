https://maven.apache.org/users/index.html
```
mvn archetype:generate -DinteractiveMode=false -DgroupId=com.imooc -DartifactId=first-app-by-maven -Dversion=1.0.0-SNAPSHOT 
mvn spring-boot:run

pom文件
<packaging> : 主(父)工程类型
<module> : 子模块工程
<dependencyManagement> : 子模块依赖管理

主项目添加：new Module
```

https://www.imooc.com/learn/956
devtools 热部署

定时任务
```java
@EnableScheduling 开启定时任务，自动扫描
@Scheduled(fixedRate=3000)
@Scheduled(conf="") // http://cron.qqe2.com
```
异步任务
```java
@EnableAsync
@Component
@Async 
```