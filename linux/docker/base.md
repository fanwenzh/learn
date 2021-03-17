# centos7
```shell
yum install net-tools

```
# 管理防火墙
```shell
# 查看、启动、关闭、重启防火墙
firewall-cmd --state 
service firewall start
service firewall stop
service firewall restart

# 端口策略管理
firewall-cmd --permanent --add-port
firewall-cmd --reload # 重新加载设置
firewall-cmd --permanent --remove-port
firewall-cmd --permanent --list-ports    # 查看应用策略
firewall-cmd --permanent --list-services # 查看端口程序

# 用例
firewall-cmd --permanent --add-port=8080-8085/tcp
```

docker配置
```shell
yum -y update # -y 全自动
yum -y install docker
# 管理docker
service docker start
service docker restart
service docker stop
# DaoCloud docker加速器
# https://www.daocloud.io/mirror
# 配置docker(删除结尾,号)
vim /etc/docker/vim daemon.json 

# 导出导入镜像
docker save java > /home/java.tar.gz # 导出地址
docker load < /home/java.tar.gz
docker images
docker rmi java # 删除镜像

# 启动容器
# -t让docker分配一个伪终端并绑定到容器的标准输入上, -i 进入交互界面
docker run -it --name myjava java bash # -it 启动并开启交互接口, exit退出容器 # 默认bash:运行的程序类型
docker run -it --name myjava -p 9000:8080 -p 9001:8085 java bash # 把容器8080端口映射到宿主机的9000端口上
docker run -it --name myjava -v /home/project:/soft --privileged java bash # 把容器/soft映射到宿主机/home/project上 # --privileged 权限参数
# 进入容器
docker exec -it containerName bash
# 用例
docker run -it -p 9000:8080 -p 9001:8085 -v /home/project:/soft --privileged --name myjava docker.io/java bash
# 管理容器
docker pause dockerNameOrId
docker unpause dockerNameOrId
docker stop dockerNameOrId
docker start -i dockerNameOrId 
docker rm dockerNameOrId
docker ps -a # -a查看所有容器, -l:--latest

# mysql集群方案
Replication: 速度快, 弱一致性, 低价值, 如日志、新闻、帖子
PXC(Percona XtraDB Cluster): 速度慢, 强一致性, 高价值, 如订单、账户、财务 (PerconaServer)
# https://hub.docker.com/r/percona/percona-xtradb-cluster/
# 拉取pxc镜像
docker pull percona/percona-xtradb-cluster
# 修改镜像名字
docker tag docker.io/percona/percona-xtradb-cluster newName

# 创建docker内部网段 
docker network create net1 # net1:名字, docker内置网段从172.17.0.XX开始
docker network inspect net1 # 查看网段线信息
docker network rm net1
# 实例
docker network create --subnet=172.18.0.0/24 net1

# docker卷(pxc无法直接实现docker的映射)
docker volume create --name v1 # 在宿主机创建卷映射给docker
docker inspect v1
docker volume rm v1

# 创建PXC容器
# docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=pw123 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=pw123 -v v1:/var/lib/mysql --privileged --name=node1 --net=net1 --ip 172.18.0.2 pxc
docker run -d -p 3306:3306 # -d :后台运行 
-e MYSQL_ROOT_PASSWORD=qwe123 # -e 参数, 创建的数据库密码
-e CLUSTER_NAME=PXC # 自定义集群名字
-e XTRABACKUP_PASSWORD=qwe123 # 数据库同步密码
-v v1:/var/lib/mysql # 券映射
--privileged --name=node1 --net=net1 --ip 172.18.0.2 pxc # --name 容器名字, --net使用网段, 设置ip

# 创建相似容器
# docker run -d -p 3307:3306 -e CLUSTER_JOIN=node1 -v v2:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=pw123 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=pw123 --privileged --name=node2 --net=net1 --ip 172.18.0.3 pxc
docker run -d -p 3307:3306 
-e CLUSTER_JOIN=node1 # 加入集群参数
-v v2:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=qwe123 -e CLUSTER_NAME=PXC -e XTRABACKUP_PASSWORD=qwe123 --privileged --name=node2 --net=net1 --ip 172.18.0.3 pxc

# 关闭容器中的防火墙(Ubuntu), pxc默认4567端口
iptables -A INPUT -p tcp --dport 4567 -j DROP
iptables -A OUTPUT -p tcp --dport 4567 -j DROP

# Haproxy负载均衡
docker pull haproxy
# 创建haproxy配置文件: https://zhang.ge/5125.html
touch /home/soft/haproxy/haproxy.cfg
# 创建Haproxy容器
# docker run -it -d -p 4001:8888 -p 4002:3306 -v /home/soft/haproxy:/usr/local/etc/haproxy --name h1 --privileged --net=net1 haproxy
docker run -it -d 
-p 4001:8888 -p 4002:3306 # 8888:为后台监控端口
-v /home/soft/haproxy:/usr/local/etc/haproxy # 目录映射
--name h1 --privileged --net=net1 haproxy
# 运行haproxy, -f 加载配置文件
haproxy -f /usr/local/etc/haproxy/haproxy.cfg
# 在node1节点中创建心跳账户
CREATE USER 'haproxy'@'%' IDENTIFIED BY '';

# 在Haproxy容器中安装keepalived
docker exec -it h1 bash
apt-get update
apt-get install keepalived
# 设置争抢虚拟ip
vim /etc/keepalived/keepalived.conf
# vrrp_instance  VI_1 {
#     state  MASTER
#     interface  eth0
#     virtual_router_id  51
#     priority  100
#     advert_int  1
#     authentication {
#         auth_type  PASS
#         auth_pass  123456
#     }
#     virtual_ipaddress {
#         172.18.0.201
#     }
# }
# 启动Keepalived
service keepalived start
#宿主机执行ping命令, 检查网络连通
ping 172.18.0.201

# 热备份
# mysql常见热备份方案:LVM和XtraBackup
```

