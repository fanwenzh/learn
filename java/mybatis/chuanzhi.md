## 原生jdbc
```java
// 数据库驱动包: mysql-connector-java
// 问题总结
1. 数据库频繁连接和关闭。 解决方案：数据库连接池
2. 将sql语句硬编码到java代码中，不利于系统的维护。 
3. 向statement设置参数时，对占位符和参数位置硬编码到java中。 
4. 从resultSet中遍历结果集数据，获取字段及参数时进行硬编码
设想：将sql语句、占位符和参数值位置写入配置文件中，查询结果映射成java对象
```
## 框架原理
```java
// mybatis是一个apach的持久层框架。
// mybatis: 通过映射半自动生成满足需要的sql语句，输入参数自动进行输入映射，将查询结果集映射成java对象。
SqlMapConfig.xml 全局配置文件，配置了数据源、事务等运行环境及sql映射文件mapper.xml
SqlSessionFactory 创建SqlSession
SqlSession 操作数据库，发出增删改查请求
Executor (缓存)执行器，在SqlSession内部执行sql语句
MappedStatement 底层封装对象, 封装sql语句、输入参数、输出结果类型(java 简单类型hashmap, pojo自定义)
```

### 映射文件
```java
// 1. 创建po类
// 2. 创建映射文件
// 3. 在sqlMapConfig.xml加载映射文件

// mysql自增主键返回: SELECT LAST_INSERT_ID()
// myql非自增主键返回: uuid(), 需要修改表中id字段类型为string, 长度设置成35位 

// hibernate: sql优化、修改相对困难，相对简单应用快速开发
// mybatis: 专注sql编写，复杂应用开发
```

### mybatis开发dao方法（传统+mapper）
```
通过SqlSessionFactoryBuilder（new 创建一次即可)创建sqlSessionFactory
通过sqSessionFactory(可使用单例模式, 如Spring)创建SqlSession.
SqlSession提供数据库操作方法, 如selectOne(), selectList()
	SqlSession是线程不安全的，在SqlSession实现类中出了接口方法（数据库操作），还有数据域属性.所以最佳应用方式是在方法体内定义为局部变量
dao实现方法
1. 原始dao开发方法(程序员实现dao接口和dao实现类)
	在dao实现类中注入SqlSessionFactory，在方法体内通过SqlSessionFactory创建SqlSession
问题总结：
	1) sql模板重复, sqlSession.open, .close等
	2) 调用sqlSession方法时,statement的id硬编码
	3） sqlsession方法使用泛型，传入变量类型在编译时不报错
mapper代理方法
	1) 编写mapper.xml映射文件
	2）编写mapper规范接口(相当于dao接口)，使mybatis自动生成mapper接口实现类代理对象
		a. 在mapper.xml中namespace等于mapper接口地址
			<mapper namespace="com.fwz.mybatis.mapper.UserMapper"></mapper>
		b. mapper.java接口中的方法名和mapper.xml中statement的id一致
		c. mapper.java接口中的方法输入参数、返回类型和mapper.xml中statement的parameterType、returnType类型一致，即接口方法的参数只能有一个
总结：
	通过接口规范生成调用方法
		User user = sqlSession.selectOne("test.findUserById", id);
		sqlSession.insert("test.insertUser", user);
	如果mapper方法返回单个pojo对象，代理对象通过selectOne查询数据库，返回集合对象，通过selectList查询
	mapper接口方法参数只能有一个，可以使用包装类型的pojo满足不同业务方法的需求。
```

### SqlMapConfig.xml配置文件
```
properties(属性)
settings(全局配置参数，看文档)
typeAliases(类别别名)：可针对parameterType或resultType指定的类型定义别名，在mapper.xml中定义别名
	默认别名
	自定义别名
typeHandlers(类型处理器)：完成jdbc类型和java类型的转换
objectFactory(对象工厂)
plugins(插件)
environments(环境集合属性对象)：在spring中废弃掉
	enviroment(环境子属性对象)
		transactionManager(事务管理)
		dataSource(数据源)
mappers(映射器)
```

### 输入、输出映射
```java
// 通过parameterType指定输入参数的类型，可以是简单类型、hashmap、pojo的包装类型
// 自定义返回类UserCustom, UserQueryVo

// resultType输出类型，查询属性名称与数据库存储一致

// resultMap 高级输出，自定义查询属性映射
```

### 动态sql
```java
// 对查询条件进行判断
// <where></where>, <if></if>, <forEach></foreach>

// 定义sql片段供全局调用

// 在用户查询列表和查询总数的statement中增加多个id输入查询
// select * from user where 1=1 and（id=1 or id=10 or id=16）
// select * from user where id in(1,10,16)
```

### 业务分析
```java
// user -> order: 一个用户可以创建多个订单，一对多
// ！orders -> user: 一个订单只有一个用户创建，一对一

// sql 语句
// 1. 确定查询的主表
// 2. 确定查询的关联表
// 	关联查询使用内连接 或 外链接，通过关联查询只能查出一条记录，可使用内连接
// 	SELECT orders.*,
// 		   User.username,
// 		   User.sex,
// 		   User.address
// 	FROM order,USER WHERE orders.user_id = user_id

总结：
实现一对一查询：
resultType: 使用resultType实现较为简单，如果Pojo中没有包括查询出来得列名，需要增加列名对应的属性即可完成映射
resultMap: 需要单独定义resultMap，实现有点麻烦，如果对查询结果有特殊要求，使用resultMap完成关联映射
resultMap可实现延迟加载

实现一对多查询：order -> orderdetail
SELECT orders.*,
    User.username,
    User.sex,
    User.address,
    orderdetail.items_id,
    orderdetail.item_num,
    orderdetail.order_id
FROM order,USER WHERE orders.user_id = user_id AND orders.id=orderdetail.order_id
使用collection对关联查询的多条记录映射到list集合的属性中。
使用resultType实现：
将订单明细映射到orders中的orderdetail中，需要程序员循环遍历去重

实现多对多查询: 
SELECT orders.*,
    User.username,
    User.sex, 
    User.address,
    orderdetail.items_id,
    orderdetail.item_num,
    orderdetail.order_id,
    items.name items_name,
    items.detail items_detail,
    items.price items_price 
FROM order,USER WHERE orders.user_id = user_id AND orders.id=orderdetail.order_id AND orderdetail.items_id=items.id
```

### 延迟加载
```java
//resultMap的association 和 collection
mapper.xml
	1. 只查询订单信息
	SELECT * FROM order 
	在查询订单的statement中使用association去延迟加载（2）
	2. 关联查询订单信息(通过上面订单信息中user_id去关联用户信息)
	SELECT orders.*,
		(SELECT username FROM USER WHERE orders.user_id = user.id)username,
		(SELECT sex FROM USER WHERE orders.user_id = user.id)sex
		FROM orders
    <association property="user" javaType="com.fwz.mybatis.po.User" select="com.fwz.mybatis.mapper.UserMappe.findUserById" column="user_id">
    </association>
// mybaitis 默认不开启延迟加载，需要在配置文件中配置
    lazyLoadingEnabledL 设置为true时，全局懒加载, 默认false
    aggressiveLazyLoading 积极加载，默认true

// 思考：不使用mybatis得association和collection实现
实现方法如下：
定义两个mapper方法，先后执行：
	1、查询订单列表
	2、根据用户id查询用户信息
```

### 查询缓存
```java
mybatis 提供一级和二级缓存
一级缓存：sqlSession
在操作数据库时需要构造sqlSession对象，在对象中有一个数据结构（HashMap）用于存储缓存数据。
不同的sqlSession之间的缓存数据区域(HashMap)互不影响。
二级缓存：mapper（按namespace划分，即每一个namespace有一个二级缓存）
多个sqlSession去操作同一个mapper的sql语句，即sqlSession共用二级mapper缓存

一级缓存：sqlSession执行commit操作（插入、更新、删除），清空sqlSession的一级缓存（避免脏读）
与spring整合时，调用service的方法结束，sqlSession关闭

开启二级缓存：
1.全局配置setting配置, 
2.mapper.xml配置
3.pojo类实现序列化(二级缓存介质不一定)
sqlSession执行close操作，将sqlsession中数据写到二级缓存
如果sqlSession执行commit操作，清空该mapper的缓存
属性：
userCache="false", 针对每次查询都要最新数据的sql
flushCache="true", commit操作（insert、update、delete）清空缓存，默认true
还有其他flushInterval刷新间隔、size引用数目、readOnly只读等
```

### mybatis 整合ehcache(分布式缓存，如redis, memcached, ehcache)
```java
// 实现cache接口 org.apache.ibatis.cache(Cache.class), 参考默认实现类PerpetualCache.class写
1. 添加关联包
ehcache-core-2.6.5.jar
mybatis-ehcache-1.0.2.jar
2. 二级缓存mapper指定cache接口类型
<cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
3. 引入缓存配置文件ehcache.xml
应用场景：
耗时较高的统计分析sql、电话账单查询sql等，通过flushInterval 设置刷新频率更新缓存
局限性：
单次sqlSession的commit，刷新缓存，即细粒度太差
```
### spring 和 mybatis 整合
```java
// 应用spring通过单例方式管理SqlSessionFactory
// 1）原始dao开发
1. mapper.xml, 在SqlMapConfig.xml加载User.xml
2. 实现dao接口：继承SqlSessionDaoSupport、UserDao结果, 实现UserDaoImpl 
// 2）mapper代理开发
1. mapper.xml 和 mapper.java
2. mapper配置
	MapperFactoryBean配置单个mapper
	MapperScannerConfigurer扫描配置，自动创建代理对象在spring中注册 // mapper.java和mapper.xml映射文件名称一致，且在一个目录 
```

### 逆向工程
// mybatis官方提供逆向工程，由数据库的表单自动生成(mapper.java, mapper.xml, po)
// mybatis-generator-coer-1.3.2-bundle
```java

```