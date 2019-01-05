apt-get update
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