1.联网
  改配置
    vi /etc/sysconfig/network-scripts/ifcfg-xxx
      =>ONBOOT=yes

  重启网络
    service network start|stop|restart
    或
    /etc/init.d/network restart
    /etc/init.d/初始化脚本

2.更新系统、软件
  yum update -y
  yum upgrade

  yum install wget
  yum install net-tools -y
  yum install vim -y
  ifconfig    查询ip、保存

3.更新源
  备份原来的源
  mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak

  163源下载
  wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
  mv CentOS7-Base-163.repo /etc/yum.repos.d/

  yum clean all
  yum makecache

4.远程登录
  linux : Cyberduck
  window: putty

5.命令
  ps -ef | grep name // 查看进程列表
  chown 用户:组 目录|文件 -R  // -R 递归修改权限

--------------------------------------------------------------------------------

防火墙 iptables
  iptables -L -N 查看命令
  iptables -F 删除所有防火墙指令

--------------------------------------------------------------------------------

node
  1.添加源
  https://nodejs.org/en/download/package-manager/

  2.装
  yum install nodejs -y

nginx
  1.添加源
  http://nginx.org/en/linux_packages.html#stable
  yum install nginx -y

  2.配置
      vim /etc/nginx/nginx.conf 主配置文件
      vim /etc/nginx/conf.d/default.conf
      /usr/share/nginx/html
    重载配置文件
      /usr/sbin/nginx -s reload

    setsebool -P httpd_can_network_connect 1

  3.端口转发

  4.反向代理

  --------------------------------------------------------------------------------

mysql == mariaDB

1.安装
  yum install mariadb-server -y
  mysql_install_db // 启动

2.配置
  ls /usr/share/mysql/  查看默认配置模板
  cp /usr/share/mysql/my-small.cnf /etc/my.cnf

3.实验启动
  mysqld_safe

4.正式启动
  service mariadb start
  service mariadb status // 常看status

  mysql 进入客户端
  mysql -uroot -p 以用户名root进入

5.用户添加密码
  mysqladmin -u 用户名 password

6.权限(外部访问)
  grant all privileges  on *.* to root@'%' identified by "password"; 允许以root用户通过所有路径(%)访问任何数据库的表
  grant all privileges  on database.table to root@'%url' identified by "newPassword"

--------------------------------------------------------------------------------

把node程序变成服务：
npm i -g forever

  forever start|stop|restart|stopall

  forever start xxxx.js
  forever stop xxx.js
  forever restart xxx.js