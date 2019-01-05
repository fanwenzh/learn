### 1 
ssh username@host
# 网络
vi /etc/sysconfig/network-scripts/ifcfg-xxx => ONBOOT=yes # 启动网卡
service network start|stop|restart # 启动网络服务
    IPADDR=192.168.1.102 # 配置IP
    NETMASK=255.255.255.0
    GATEWAY=192.168.1.1
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
/lib/ # 库目录#
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
-:二进制文件, d:目录, -l:link软链接 f:文件
ctrl + l : clear
free

## 菜鸟学院
si::sysinit:/etc/rc.d/rc.sysinit # 系统初始化配置(连接文件)
man [指令] # 查看指令
shutdown -h now # now:马上关机, 10:十分钟后, 20:25, -r: 重启
reboot # 重启
halt # 关闭系统, poweroff
logout
# 文件属性 -R 递归
chgrp [-R] 新属组名 文件名 # 改变文件属组
chown [-R] 新属主名 文件名 # 改变文件拥有者
chmod [-R] 770 文件或目录名 # 改变权限
    chmod g=rwx [文件名] # g:group
    chmod 760 [文件名] # r:4, w:2, x:1
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
useradd [选项] 用户名 # -G:指定用户初始组, -u:指定用户
userdel -r 用户名 # -r:删除用户主目录
passwd [选项] 用户名 # -d:删除口令, -l: 锁定用户 -u:解锁用户 # /etc/passwd
usermod [选项] 用户名 # -L:锁定用户 -U:解锁用户 -G:加入组
chage -d 0 [用户名] # 登录改密码
id [用户名] # 查看用户id信息
su - [用户名] # 切换用户和环境变量 # -c 切换用户执行某条指令
whoami # 查看当前登录账号
env # 当前用户变量
groupadd 用户组 # 添加新用户组 # /etc/group
groupdel 用户组 # 删除用户组
groupmod [选项] 用户组 # -n:改变用户名
who # 查看登录用户, tty为本地登录, pts远程终端
w   # 详细登录用户信息
# ACL
df 查看分区状况
dumpe2fs -h /dev/sda3 # 查看文件的分区是否支持ACL权限 # /etc/fstab # 自动挂载文件
getfacle 文件名 # 查看acl权限
setfacl [选项] [文件名] # -m:设定权限 -R:递归 # setfacl -m u:用户名:rx [文件或文件夹]setfacl -m u:组名:权限 [文件或文件夹]
setfacl -m m:rx 设置mask权限 # -x: 删除权限 -b:删除所有acl权限
# 文件特殊权限
SUID、SGID、Sticky BIT:只能删除自己建立的文件
chattr # 系统文件属性
lsattr # 查看文件属性

# 磁盘管理 # 文件系统属性
df -ah # 查看文件系统空间
du -sh # 查看文件总大小
fdisk -l # 可识别的磁盘分区表
dumpe2fs [目标文件] # 显示磁盘状态
mkfs [-t 文件系统格式] 装置文件名 # 磁盘格式化
mount [选项] 装置文件名  挂载点 # 挂载 -a:根据/etc/fstab配置自动重新挂载
umount [-fn] 装置文件名或挂载点 # -o remount,rw 重新挂载并设置读写权限
/etc/fstab 配置自动挂载点
# yum
webmin : 系统管理浏览器简化
VI /etc/yum.repos.d/CentOS-Base.repo # yum源配置
yum update # 更新所有软件 -y # 自动yes
yum install <name>
yum update <name>
yum list
yum remove <name>
yum search <name>
yum clean # 清除安装缓存和header
yum grouplist # 组查看、安装
# 链接
ln -s [源文件] [目标文件] # s:创建软链接
umask # 设置默认权限
# 文件查找
find [搜索范围][匹配条件] # -name: 文件名, -mmin -5:5分钟内修改文件内容, # -cmin: 改变文件属性 -type: f文件d目录l链接
locate [文件名] # updatedb 更新文件索引库
which [命令名] # 查找命令绝对路径及别名
grep -iv [指定字符串] [文件名] # i:不区分大小写, -v:排除指定字符串
    grep [正则]"a\{2,5\}" [文件名]
# 帮助命令
man [命令] # 命令或配置文件, NAME 作用, /选项
whatis [命令] # man 5 配置文件
apropos [配置文件]
命令 --help
# 解压缩
gzip [文件名] # gunzip 解压
tar [-zcf] [压缩后文件名] [目标文件夹] # -c:打包, -f:指定文件名, -z:打包同时压缩 
tar -zxvf [文件名]# .tar.gz文件解压
zip -r [压缩后文件名] [文件或目录] # unzip [文件名]
# 网络
write [用户名] # 给指定用户发信息
wall [信息] # 广播信息, write all
pint -c IP # -c 发送次数
ifconfig 
mail [用户名] # 发送邮件 # mail 查看邮件： 1, d 删除，h 返回
last # 所有用户登录时间信息
lastlog -u uid # 指定用户登录信息 
traceroute [地址或域名] # 查看节点 
netstat [选项] # 显示网络信息 -t:TCP -u:UDP -l:监听 -r:路由
    -tlun -an:正在连接 -rn:网关
setup # 网络配置

# 字符提取
grep # 提取行
cut -f 2,3 -d ": " [文件名] # f:第几列, d:分隔符 # 提取列 # 提取空格并不方便
    cat /etc/passwd | grep /bin/bash | grep -v root | cut -d ":" -f 1 # 提取非root用户名
printf "输出类型和格式%m.nf" 输出内容 # \n:换行, \r:回车 \t:制表符
awk '条件{动作}' 文件名 # 列提取, 可处理连续空格
    awk 'BEGIN{FS:"分隔符"} END'
sed [选项] '[动作]' # 选取、替换、删除、新增 # -n:输出到屏幕, -i:修改文件
sort 文件名 # 排序
wc [选项] 文件名 # 统计命令 
# 条件判断
test -e [文件名] # 或 [-e '文件名'] # option: 文件、记录、文件夹，读写权限(不分用户、组)

# 服务
chkconfig --list # RPM包已安装服务状态(自启动)
/usr/local # 源码包安装的服务
netstat -tlun # 进程端口
# 通用服务 配置
/etc/init.d # 独立服务启动脚本位置
/etc/sysconfig/ # 初始化环境配置文件位置
/etc/ # 配置文件位置
/etc/xinetd.conf # xinetd配置文件
/etc/xinetd.d/ # 基于xinetd服务的启动脚本
/var/lib/ # 服务产生的数据
/var/log/ # 日志
# 启动
service --status-all # 所有安装的服务
chkconfig [--level 2345] [服务:httpd] on # 自启动 off:关闭
/etc/rc.local # 自启动文件配置

# 系统资源
vmstat [刷新演示 刷新次数] # 监控系统资源
dmesg # 开机内核检测信息
free -m # 内存使用窗台
uptime # top, w
uname # 查看内核相关信息
lsof [选项] # 查看进程调用文件 # -p pid, -c 进程名, -u 用户名

# 进程
ps -le # 查看已运行进程, ps aux
top [选项] # 查看进程运行状态 -d: 每3秒更新一次
    P: CPU排序, M:内存排序, q:退出, ?:帮助
pstree -p : 进程树, p:详细结构
kill -l # 查看可用的进程信息
    -1:重启, -9:强制终止, -15:正常终止(默认) + PID
killall -9 [进程名] # 按进程名杀死一类进程
pkill -t 终端号 # t:按用户杀死进程(踢用户)
    w # 查看用户
    pkill -9 -t tty1 # 踢出本地登录tty1

# 工作管理
命令 + & # 放后台运行
命令 后 ctrl +z # 放后台暂停
jobs -l # 查看后台进程(工作号)
fg %工作号 # 恢复前台执行
bg %工作号 # 恢复后台执行

# 定时服务 crond
crontab [选项] # -e:编辑定时任务, -l:查询定时任务, -r:删除任务
    * * * * * command # *:所有, ,:不连续, -:连续, */10:每隔10单位时间执行

# 日志
/var/log/cron # 系统定时任务日志
/var/log/dmesg #系统开机自检日志 # dmesg
/var/log/btmp # 系统错误登录日志 # lastb命令查看
/var/log/lastlog # 所有用户最后一次登录日志 #lastlog 命令
/var/log/message # 系统所有重要信息日志
/var/log/secure # 验证授权日志（账户密码）
/var/log/wtmp # 所有用户的登录、注销信息 # last
/var/log/utmp # 当前登录用户的信息, w, who, users
# 配置
/etc/rsyslog.conf
# 日志轮替配置
/etc/logrotate.conf # lgrotate -f /etc/logrotate.conf # 强制轮替

# 启动管理
init # 0:关机, 1:单用户,5图形界面, 6重启 # cat /etc/inittab
runlevel # 查看当前运行等级
# 配置开机等级(centos 6)
vim /etc/inittab 
# centos7, grub配置
/boot/grub2

# 备份和恢复
dump 
restore