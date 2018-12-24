# mysql基本命令
/usr/local/mysql/bin/mysql -uroot -pqwe123
show databases;
create database safety;
select databaseName;
show tables;
select * from tableName;
drop table tableName;
exit;
/usr/local/mysql/bin/mysql databaseName -uroot -pqwe123< fileName
添加列:
ALTER TABLE `user` ADD COLUMN `salt` varchar(64) NULL DEFAULT ""  AFTER `password`
describe table

# 3.XSS(cross site scripting 跨站脚本攻击)
数据 => 脚本(获取页面数据、cookies、劫持前端逻辑、发送请求)
3-1 XSS攻击类型
	反射型: 通过url添加脚本, 缩短网址
	存储型: 通过提交到数据库被其他用户访问
3-2 XSS攻击注入点
	HTML节点内容: #{content}
	HTML属性: <img src="1" onerror="alert(1)">
	javascript代码: var data = "google";alert(1);"
	富文本: 保留HTML格式
3-3 XSS防御处理
	HTML节点内容: (存入数据库或页面显示时)转义< => &lt; 和 > => &gt;
	HTML属性: " => &quto, ' => &#39, space => &#32;
	javascript代码: 转义"\"或转化为json
	富文本: 文本过滤, cheerio
3-4 CSP（Content Security Policy: 指定哪些内容可执行）
	
# 4.CSRF(cross site request forgy 跨站请求伪造)
4-1 CSRF攻击类型
	POST: 伪造form表单提交
	GET: <img src="请求链接或 a标签包裹的请求链接">, 链接
4-2 CSRF攻击原理和危害
	利用用户的登录态度, 如cookie
4-3 CSRF防御-samesite: strict, lax
4-4 CSRF防御-目标前端输入验证码: ccap图形验证码生成模块  
4-5 CSRF防御-token
4-6 CSRF防御-referer

# 5.Cookies: 同源策略:协议地址端口一致
	设置cookie响应: set-cookie
	前端：document.cookie=
5-1 Cookies特性
	domain、expires、path、http-only(js脚本无法读取cookie信息), secure(https), samesite
	(删除cookie)设置过期时间: document.cookie = "aaa=1; expires=" + new Data().toGMTString()
5-2 Cookies安全策略
	签名、加密、http-only(防止XSS)、secure、samesite

# 6.点击劫持
	通过iframe设置透明度，默认提交请求
6-2 点击劫持防御
	if(top.location != window.location) {top.location = window.location}
	sandbox 前端禁止js内嵌
	X-Franme-Options

# 7.传输安全
7-1 HTTP窃听
	tranceroute website
	anyproxy 工具代理
7-2 HTTPS原理(TLS加密)SSL
	CA发布证书(访问需要验证证书, 保证不被中间人攻击)
7-3 HTTPS部署：SSL For Free
	switch host: connect请求
7-4 真实服务器申请部署HTTPS
	
# 8.密码安全
8-1密码加固
	salt, 单向hash
8-2密码传输安全
	https传输, 频率相纸, 前端加密(意义有限)
8-3生物密码
	指纹、声纹、虹膜、人脸
	密码特征: 私密性、安全性(碰撞)、唯一性

# 9.接入层注入问题
9-1 SQL注入防御
	关闭错误输出
	检查数据类型
	数据转义
	- 参数化查询
	使用ORM(对象关系映射), 映射内部进行数据检查
9-2 NOSQL注入和防御
	mongoose: 检查数据类型, 类型转换, 写完整条件

# 10.接入层上传问题: php在访问时会在浏览器执行.php文件
10-1 上传漏洞防御
	限制上传文件后缀
	文件类型检查: file.type(如image/png)
	- 文件内容检查: 不同类型的文件的前几位buffer固定
	限制程序执行, 但读写过程降低性能
	权限控制：上传文件目录可写可执行互斥

# 11.社会工程学和信息泄露
11-1 利用OAuth思想保护用户资料

# 12.其他安全问题
12-1 DOS 攻击(Deny of service 拒绝服务攻击, DDOS大规模)
	方式: TCP半连接、HTTP连接、DNS
	措施: 防火墙、交换机或路由器（流量清洗）、高防IP(云服务厂商提供)
	预防: 避免逻辑重复、快速失败快速返回、防雪崩机制、有损服务、CDN(静态文件)
12-2 重放攻击
	措施: 加密(HTTPS)、时间戳(时间间隔)、token(session)、nonce(number once)、签名
