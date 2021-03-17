ubuntu: apt-get update
# 设置ftp服务
```shell
sudo apt-get install vsftpd
service vsftpd start # 开启fpt服务
# 设置新用户uftp
sudo mkdir /home/uftp 
sudo useradd -d /home/uftp -s /bin/bash uftp # 新建用户, 并设置主目录
passwd uftp 
sudo chown uftp:uftp /home/uftp # 设置所属者和所属组为uftp
# 添加允许访问用户列表
touch /etc/vsftpd.user_list
sudo vim /etc/vsftpd.user_list # 在文件中添加用户名uftp
# 配置vsftpd作如下修改
sudo vim /etc/vsftpd.conf
# 打开注释: write_enable=YES
# 添加信息: userlist_file=/etc/vsftpd.user_list
# 添加信息: userlist_enable=YES
# 添加信息: userlist_deny=NO
sudo /etc/init.d/vsftpd restart
```
# 配置 ssl
```shell
# https://www.jianshu.com/p/1a8a4593958a?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
# 生成SSL/TLS证书
sudo mkdir /etc/ssl/private
sudo openssl req -x509 -nodes -keyout /etc/ssl/private/vsftpd.pem -out /etc/ssl/private/vsftpd.pem -days 365 -newkey rsa:2048
# 如果启用了UFW防火墙，开启端口
sudo ufw allow 990/tcp
sudo ufw allow 40000:50000/tcp
sudo ufw status
# 在vsftpd.conf中配置ssl
sudo vi /etc/vsftpd/vsftpd.conf
# ssl_enable=YES
# ssl_tlsv1=YES
# ssl_sslv2=NO
# ssl_sslv3=NO
# 添加证书
# rsa_cert_file=/etc/ssl/private/vsftpd.pem
# rsa_private_key_file=/etc/ssl/private/vsftpd.pem
# 配置登录
# allow_anon_ssl=NO
# force_local_data_ssl=YES
# force_local_logins_ssl=YES
# require_ssl_reuse=NO
# ssl_ciphers=HIGH
# 配置访问端口
# pasv_min_port=40000
# pasv_max_port=50000
sudo /etc/init.d/vsftpd restart # 重启服务
```

# 环境配置
```shell
# 安装nvm
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm ls-remote
nvm install v11.0.0
# 安装java
sudo apt-get install default-jre # 安装JRE
sudo apt-get install default-jdk # 安装JDK
sudo add-apt-repository ppa:webupd8team/java  # 配置源
sudo apt-get update  
sudo apt-get install oracle-java8-installer  # 安装oracle-java8-installer
# 配置java环境
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64 # apt-get默认安装路径/usr/lib
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
```
fastDFS + ngnix
```shell
# https://www.cnblogs.com/cnmenglang/p/6251696.html
# 安装编译环境
sudo apt-get install build-essential 
sudo apt-get install gcc
sudo apt-get install g++
sudo apt-get install zip
sudo apt-get install upzip

# 安装所需包
# libfastcommon-master
unzip libfastcommon-master.zip
cd libfastcommon-master
./make.sh
./make.sh install
# 安装fastdfs
tar -xzvf FastDFS_v5.08.tar.gz
cd FastDFS
./make.sh
./make.sh install

# 安装tracker服务
cp /FastDFS/conf/* /etc/fdfs/ # 复制所有配置文件
# 1.修改tracker配置
vim /etc/fdfs/tracker.conf
# 2.修改的内容如下：
disabled=false              # 启用配置文件
port=22122                  # tracker服务器端口（默认22122）
base_path=/fastdfs/tracker  # 存储日志和数据的根目录
其它参数保留默认配置， 具体配置解释可参考官方文档说明：http://bbs.chinaunix.net/thread-1941456-1-1.html
# 3. 创建指定目录
mkdir -p /fastdfs/tracker
# 4. 启动tracker服务器
/usr/bin/fdfs_trackerd  /etc/fdfs/tracker.conf # 指定目录
/usr/bin/fdfs_trackerd  /etc/fdfs/tracker.conf restart # 重启
# 初次启动，会在/fastdfs/tracker目录下生成logs、data两个目录。
# drwxr-xr-x 2 root root 4096 1月   4 15:00 data
# drwxr-xr-x 2 root root 4096 1月   4 14:38 logs
# 检查FastDFS Tracker Server是否启动成功：
# ps -ef | grep fdfs_trackerd

# 安装storage服务
# 1.修改storage配置文件
vim /etc/fdfs/storage.conf
# disabled=false                      
# port=23000                          # storage服务端口
# base_path=/fastdfs/storage          # 数据和日志文件存储根目录
# store_path0=/fastdfs/storage        # 第一个存储目录
# tracker_server=ip01:22122  # tracker服务器IP和端口 # 用公网ip需要应用端口, 推荐应用内网
# http.server_port=8888               # http访问文件的端口
# 其它参数保留默认配置， 具体配置解释可参考官方文档说明：http://bbs.chinaunix.net/thread-1941456-1-1.html
# 2.创建基础数据目录
mkdir -p /fastdfs/storage
# 3.启动服务器
/usr/bin/fdfs_storaged /etc/fdfs/storage.conf
 

# 文件上传测试
# 1.修改client配置文件
vim /etc/fdfs/cilent.conf
# base_path=/fastdfs/client
# tracker_server=ip01:22122
# 2.启动storage服务
/usr/bin/fdfs_storaged /etc/fdfs/storage.conf # start
/usr/bin/restart.sh /usr/bin/fdfs_storaged /etc/fdfs/storage.conf # restart
# 3.执行测试命令
/usr/bin/fdfs_test  /etc/fdfs/client.conf upload /home/uftp/tx.png
# 查看文件数量
ls -l |grep "^-"|wc -l

# nigix映射
# 1. 解压fastdfs-nginx-module
cd /usr/local/src
tar -xzvf fastdfs-nginx-module_v1.16.tar.gz
# 2. 修改config
vim fastdfs-nginx-module/stc/config
# 删除所有 /local, 改为
# CORE_INCS="$CORE_INCS /usr/include/fastdfs /usr/include/fastcommon/"
# CORE_LIBS="$CORE_LIBS -L/usr/lib -lfastcommon -lfdfsclient"
# 3. 安装nigix依赖库
# 查看是否安装 dpkg -l | grep zlib
apt-get install g++ 
sudo apt-get install libpcre3 libpcre3-dev # 正则表达式
sudo apt-get install openssl libssl-dev
sudo apt-get install zlib1g-dev
# 4.安装nigix
tar -xzvf nginx-1.10.0.tar.gz
cd nginx-1.10.0
# nigix目录下: ./configure --help
# --prefix=/usr/local/nginx \ # nginx安装目录, 默认为/usr/local/nginx
# --pid-path=/var/run/nginx/nginx.pid \ # 存储的主进程的进程号的文件
# --lock-path=/var/lock/nginx.lock \ # 锁文件
# --error-log-path=/var/log/nginx/error.log \ # 错误日志路径
# --http-log-path=/var/log/nginx/access.log \ # 访问日志路径
# --with-http_gzip_static_module \ # 允许http发送gzip静态文件（模块）
# --http-client-body-temp-path=/var/temp/nginx/client \ # 存储用户请求内容的临时文件夹路径
# --http-proxy-temp-path=/var/temp/ngnix/proxy \ # 存储代理临时文件夹路径
# --http-fastcgi-temp-path=/var/temp/nginx/fastcgi \ # common GI 进程管器临时文件路径
# --http-uwsgi-temp-path=/var/temp/nginx/uwsgi \ # Web Server Gateway Interface
# --http-scgi-temp-path=/var/temp/nginx/scgi \ # Simple CGI
# --add-module=/home/fastdfs-nginx-module/src # 添加fastdfs-nginx-module模块
./configure \
--prefix=/usr/local/nginx \
--pid-path=/var/run/nginx/nginx.pid \
--lock-path=/var/lock/nginx.lock \
--error-log-path=/var/log/nginx/error.log \
--http-log-path=/var/log/nginx/access.log \
--with-http_gzip_static_module \
--http-client-body-temp-path=/var/temp/nginx/client \
--http-proxy-temp-path=/var/temp/ngnix/proxy \
--http-fastcgi-temp-path=/var/temp/nginx/fastcgi \
--http-uwsgi-temp-path=/var/temp/nginx/uwsgi \
--http-scgi-temp-path=/var/temp/nginx/scgi \
--add-module=/home/fastdfs-nginx-module/src 

make && make install
# 5.配置fastdfs-nginx-module
cp /home/fastdfs-nginx-module/src/mod_fastdfs.conf /etc/fdfs
vim /etc/fdfs/mod_fastdfs.conf
# base_path=/fastdfs/tmp # 存储模块log文件
# tracker_server=tracker:22122
# group_name=file
# url_have_group_name = true
mkdir /fastdfs/tmp
# 6.配置nginx 
vim /usr/local/nginx/conf/nginx.conf
# 添加文件server配置(读取)
# server {
#     listen  88;
#     server_name IP或hostname;
#     location /file/M00 { # 与group_path对应: ~/group([0-9])/M00 # 多group
#         ngx_fastdfs_module;
#     }
# }
# 7. 启动nginx
cd /usr/local/nginx/sbin
/usr/local/nginx/sbin/nginx # 启动
/usr/local/nginx/sbin/nginx -s reload # 重启

netstat -tln | grep 80 # 查看端口是否被监听 
lsof -i :80 # 查看端口占用进程
kill -9 进程id

# nginx反向代理tomcat
cd /usr/local/nginx/conf
vim nginx.conf
  # 添加tomcats(名称自取, tomcat默认8080端口)
  upstream tomcats {
      server 172.16.0.2:8080;
  }
  server {
      listen       80;
      server_name  localhost;
      location / {
          # root   html;
          proxy_pass http://tomcats; # 修改
          index  index.html index.htm;
      }
# 重启nginx
cd /usr/local/nginx/sbin
./nginx -s reload

# 1.安装mysql
sudo apt-get install mysql-server (卸载是sudo aptitude purge mysql-server)
apt-get isntall mysql-client
sudo apt-get install libmysqlclient-dev
# 查看是否按装成功
sudo netstat -tap | grep mysql
mysql -u root -p # 登陆
# 2.配置远程链接
# 本地登录mysql, 授权远程访问
grant all privileges on *.* to 'root'@'%' identified by 'password';
flush privileges; # 命令生效
  # 修改配置文件远程可登陆地址
  vim /etc/mysql/my.cnf
  # 添加可访问地址
  [mysqld] 
  bind-address=0.0.0.0
# 重启服务
service mysql restart # stop, start
```

配置云服务器的文件服务内网ip
```shell
cd /etc/fdfs
vim storage.conf 
  tracker_server=内网ip:22122
vim mod_fastdfs.conf # 已通过nginx映射
  tracker_server=172.16.0.2:22122
```

```shell
# 查找被占用的端口
netstat -tln
netstat -tln | grep 80
# 查看端口被哪个进程占用
lsof -i :80
# 杀掉占用80端口的进程
kill -9 进程id
```