## 1
@SpringBootApplication: springboo应用
@RestController

打包插件：spring-boot-maven-plugin 
mvn package

配置：application.properties、application.yml

## 2.数据库
JPA为POJO（plain ordinary java object）提供持久化的标准规范，即将java的普通对象通过对象关系映射（Object-Relational Mapping, ORM）持久化到数据库中。
@Repository 定义资源库
public interface UserRepository extends JpaRepository<User, Long>{}
@Table(name = “tableName”) 数据库表
@Id 唯一标识
@GeneratedValue(strategy = GenerationType.IDENTITY) 自动生成

@ManyToOne 多对一
@JoinColumn(name = “did”)
private Department department;
@JoinTable(name=”user_role”,joinColuns={@JoinColumn(name=“user_id”)})

@JsonBackReference: 标注的属性序列化时忽略
@JsonManagedReference: 标注的属性序列化时不忽略，反序列时注入
@JsonIgnore：直接忽略某个属性，且发序列化时不会自动注入属性

@EnableTransactionManagement(proxyTargetClass = true) 启用事务管理
@EnableJpaRepositories(basePackages = “dbdemo.**.repository”) 指定接口资源库repository类的位置
@EntiryScan(basePackages = “dbdemo.**.entity”) 指定定义实体Entity类的位置

@RunWith(SpringJunit4ClassRunner.class) 运行测试类
@ContextConfiguration(classes = {JpaConfiguration.class})
@Before、@After、@Around 所有拦截器之前、之后、前后

com.google.code.gson
@Autowired
private RedisTemplate<String, String> redisTemplate;
Gson gson = new Gson();
redisTemplate.opsForValue().set(key, gson.toJson(user), time, timeUnit.MINUTES)

@PropertySource 读取数据库配置
@Relationship(type=”ACTS_IN”, derection=Relationship.INCOMING) 关系表
@JsonIdentityInfo 节点实体
@RelationshipEntity 关系实体
@StartNode 起始节点的实体
@EndNode 终止节点的实体
关系构造函数

extends GraphRepository<Movie>

@DateTimeFormat 转换成日期
@DateLong  转换成Long

## 4.1  druid
@Query(“select t from User t where t.name =?1 and t.email = ?2”) 自定义查询语句
在JPA配置类中，通过@EnableJpaRepositories加载装备bean
@EnableJpaRepositories(basePackages=”com.**.repository”, repositoryFactoryBeanClass=ExpandJpaRepositoryFactoryBean.class) //扩展接口
4.3 Redis做缓存
@Cacheable（value=“mysql:findById:role”, keyGenerator=”simpleKey”）存取缓存
@CachePut（value=“mysql:findById:role”, keyGenerator=”objectId”） 修改缓存
@CacheEvict 删除缓存

## 5.2安全策略配置
HttpSecurity安全策略配置
loginPage: 
loginSuccessHandler
permitAll: 允许访问url
logout:
logoutSuccessUrl:
rememberMe:
csrf: 跨站请求伪造
accessDeniedPage: 配置拒绝的提示链接

## 6.2 OAuth2服务端配置
@EnableAuthorizationServer 启用OAuth2认证服务器功能
@EnableOAuth2Sso 标注为SSO客户端
@EnableResourceServer 资源服务器

## 7 分布式文件系统FastDFS
store服务器（存储文件）、tracker服务器（调度任务）

## 8 云应用开发
@EnableConfigServer 弃用配置管理服务
@EnableDiscoveryClient 发现服务客户端
@RefreshScope 在线更新配置

##10 Spring Boot 自动配置实现原理
@SpringBootApplication = 
@Configuration
@EnableAutoConfiguration
@ComponentScan

