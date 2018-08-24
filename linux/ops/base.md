### 1 
# 网络
vi /etc/sysconfig/network-scripts/ifcfg-xxx => ONBOOT=yes # 修改网络配置
service network start|stop|restart # 启动网络

ifconfig -a
ifconfig eth0 192.168.118.2  # 桥接 or HostOnly 配置ip地址

ssh root@192.168.1.110 # 远程ssh

# 目录
/bin/ # 所有用户公用执行文件
/sbin/ # 超级单用户（安全模式）执行文件
/sur/bin  # 所有用户公用启动无关的执行文件
/sur/sbin  # 超级单用户（安全模式）启动无关执行文件

/boot/ # 启动文件夹
/dev/ # 设备文件夹
/etc/ # 默认配置文件夹
/home/ # 宿主目录 /home/fwz
/lib/ # 库目录
/lost+found # 启动异常的文件碎片备份目录 # fsck 检测修复命令 file system check

/media/ # 挂载媒体
/mnt/ # 挂载移动硬盘
/misc/ # 挂载NFS服务的共享目录

/usr/local # 第三方安装软件保存目录, 同 /opt/
/proc/ # 内存的虚拟文件系统: 设备信息
/sys/ # 虚拟文件系统：内核信息
/srv/ # 服务数据目录
/tmp/ # 临时目录
/usr/ # 系统软件资源目录 Unix Software Resource
/var/ # 动态数据保存位置, 保存缓存、日志等

# 命令 [-option] [参数]
-:二进制文件, d:目录, -l:link软链接
ctrl + l : clear
free

## 菜鸟学院
si::sysinit:/etc/rc.d/rc.sysinit # 系统初始化配置(连接文件)
man [指令] # 查看指令
shutdown -h now # now:马上关机, 10:十分钟后, 20:25, -r: 重启
reboot # 重启
halt # 关闭系统, poweroff
# 文件属性
chgrp [-R] 新属组名 文件名 # 改变文件属组
chown [-R] 新属主名 文件名 # 改变文件拥有者
chmod [-R] 770 文件或目录名 # 改变权限
# 目录命令
ls -alhd /etc # a:all, l: long详情, h：人性化显示，d:查看目录信息
pwd [-P] # 当前路径 P:真实路径
mkdir -p [目录名] # -p 递归创建
cp -rp [原路径] [目标路径] # r:复制目录, p:保留文件属性
mv [源路径] [目标路径] # 剪切or改名
rm [路径] # -r:递归删除目录, -f:强制删除
touch # 创建文件
# 查看文件内容
cat -n # 浏览文件内容
tac # 最后一行显示
less [文件名] # 
    空白键    ：向下翻动一页；
    [pagedown]：向下翻动一页；
    [pageup]  ：向上翻动一页；
    /字串     ：向下搜寻『字串』的功能；
    ?字串     ：向上搜寻『字串』的功能；
    n         ：重复前一个搜寻 (与 / 或 ? 有关！)
    N         ：反向的重复前一个搜寻 (与 / 或 ? 有关！)
    q         ：离开 less 这个程序；
head -n 20 # 查看文件前n行
tail -n 20 # 查看文件后n行, -f:动态显示, 用于监控日志
# 用户和用户组管理: 
useradd [选项] 用户名 # -g:指定用户组, -u:指定用户
userdel -r 用户名 # -r:删除用户主目录
passwd [选项] 用户名 # -d:删除口令, -l: 锁定用户 # /etc/passwd
groupadd 用户组 # 添加新用户组 # /etc/group
groupdel 用户组 # 删除用户组
groupmod [选项] 用户组 # -n:改变用户名
# 磁盘管理
df -ah # 文件系统属性
fdisk -l # 磁盘分区表
mkfs [-t 文件系统格式] 装置文件名 # 磁盘格式化
mount [选项] 装置文件名  挂载点 # 挂载
umount [-fn] 装置文件名或挂载点
# yum
yum update # 更新所有软件
yum install <name>
yum update <name>
yum list
yum remove <name>
yum search <name>
yum clean # 清除安装缓存和header
