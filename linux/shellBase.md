man command-name # 查看help

## 文件（目录）操作
### 1. cd 目录切换
cd path
cd - # 切换至上一个工作目录
cd ~user_name # 切换至不同user根目录

### 2. mkdir 创建新目录
mkdir -p dirname1 ... # -p 递归创建

### 3. touch 创建文件
touch filename1 ...

### 4. ls显示文件
ls -l path # 显示详细列表, 缩写ll
ls -R path # 显示所有子目录及文件
ls -i # 显示节点数
ls -a # 显示所有文件（包括隐藏文件）
file filename # 查看文件类型

### 5. pwd显示当前路径
pwd # 显示当前路径

### 6. less显示文件内容
less fileName # View file contents or dir contents
vim 编辑

### 7. rm 删除文件或目录
rm file? # 删除档名中有五个字元，前四个字元为file 之所有文档.
rm f* # 删除以 f 为字首之所有文档
rm -r dir1 # 删除dir1及子文件 -r, --recursive 递归
rm -f dir1 # -f, force

### 8. cp 复制
cp fileName fileName
cp -r # 复制快捷方式
cp -R # 复制整个目录
cp -u *.html destination # -u update
cp -a # 复制文件和目录，以及它们的属性，包括所有权和权限。
cp -v # 详细

### 9. mv 移动
mv url newUrl # 移动文件

### 10. find系统中查找文件
find path filename

### 11. ln 创建硬链接和符号链接 #  文件硬链接:一个node多个文件名，软连接：一个Node多个快捷方式
ln file1 file2 # 创建硬链接
ln -s file1 file2 # 创建软连接

#### 通配符
* 匹配任意多个字符
? 匹配任意一个字符（不包括零个）
[a-z] 匹配任意一个属于字符集中的字符
[!characters] 匹配任意一个不是字符集中的字符
[[:class:]]	匹配任意一个属于指定字符类中的字符

[:alnum:]	匹配任意一个字母或数字
[:alpha:]	匹配任意一个字母
[:digit:]	匹配任意一个数字
[:lower:]	匹配任意一个小写字母
[:upper:]	匹配任意一个大写字母

## 命令
type command #  说明怎样解释一个命令名
which command # 显示会执行哪个可执行程序
help command # 输出shell命令帮助文档
man # 显示命令手册页
whatis # 显示非常简洁的命令说明
apropos # 显示一系列适合的命令
info # 显示命令 info
alias # 创建命令别名
	type foo # 查找foo命令是否被占用
	alias foo='cd /usr; ls cd -' # 创建命令别名
	ualias foo # 删除别名

## 重定向 >（重写输入） >> (尾部追加)
ls -l /usr/bin > ls-output.txt # 将command 显示信息输出到 ls-output.txt中(没有创建, 重写入文件)

### cat 连接文件
cat file # 读取文件并复制他们到标准输出
cat # 无file参数连接标准输入
cat < input.txt

管道 | 
ls -l /usr/bin | sort | uniq | less # sort 排序
uniq # 去除重复行
wc filename # 打印行数、字数、字节数 -l  行数

### grep 打印匹配行
grep pattern filename
grep -rn '====' a.js # 在a.js文件中查找===字符串，并且显示行号
brew list|grep python # 查看python

### head/tail 打印文件开头/结尾
head -n 5 ls-output.txt # 打印5行

### tee 从Stdin读取数据，并同时输出到Stdout和文件
ls /usr/bin | tee ls.txt

### echo 显示一行文本(文件)， \:转义, "":字符串, '':不展开引用
echo /usr/*/share
echo .* 显示隐藏文件
echo $((expression))
echo Front-{A,B,C}-Back  # Front-A-Back Front-B-Back Front-C-Back
echo {Z..A} # Z Y X W V U T S R Q P O N M L K J I H G F E D C B A
$USER # 用户名
$1 # 引用
echo "this is a    test" # 防止单词分割

### 键盘操作
clear
history 
!number # 重复历史列表中第 number 行的命令。
!string	# 重复最近历史列表中，以这个字符串开头的命令。
!?string # 重复最近历史列表中，包含这个字符串的命令。

### 权限
id # 显示用户身份
chmod # 更改文件模式
umask # 设置默认的文件权限
su # 以另一个用户的身份来运行 shell
sudo # 以另一个用户的身份来执行命令
chown # 更改文件所有者
chgrp # 更改文件组所有权
passwd # 更改用户密码

### 进程
ps # 报告当前进程快照, ps aux 更多详细信息
top # 动态查看进程
jobs # 列出活跃的任务
bg # 把一个任务放到后台执行
fg # 把一个任务放到前台执行
kill -signal PID # 给一个进程发送信号, signal值kill -l查看
killall # 杀死指定名字的进程
shutdown # 关机或重启系统
& # 启动一个程序放置后台执行
pstree	# 输出一个树型结构的进程列表，这个列表展示了进程间父/子关系。

## shell 环境
printenv # 打印部分或所有的环境变量
set # 设置 shell 选项
export # 导出环境变量，让随后执行的程序知道。
source .bashrc #  强制刷新bash

## 存储媒介
mount # 挂在一个文件系统
umount # 卸载文件系统
fsck # 检查和修复一个文件系统
fdisk # 分区表控制器
mkfs # 创建文件系统

## 网络系统
ping
tranceroute # 打印网络主机的路由数据包
netstat -ie # 打印网络连接，路由表，接口统计数据，伪装连接
		-r # 打印路由表

### 查找文件
locate # 查找名字
find # 在目录层次结构中搜索
touch # 更改文件时间
stat # 显示文件或文件系统状态

### 归档和备份
gzip 压缩或展开文件 -d 解压缩, 
bzip2 块排序文件压缩器
tar 磁带打包工具
zip 打包和压缩文件
rsync 同步远端文件和目录

### 启动目录
export PATH = ~/bin:"$PATH" # 添加当前目录在$PATH路径中
. .bashrc # . 为source缩写
a="string # 定义并赋值变量(=号没有空格)
$a # 使用变量 mv $filename ${filename}1
declare -r TITLE=”Page Title” # 定义只读常量

### 分支结构
if [ $x = 5 ]; then
	echo "x equals 5.";
else 
	echo "x does not equal 5.";
fi

file 
FILE=~/.bashrc
[ -e file ] : file 存在
[ -w file ] : file 存在并且可写
[ -x file ] : file 存在并且可执行
string
-n string : 字符串 string 的长度大于零
-z string : 字符串 string 的长度为零
(( c语言 expression )), [[]], &&, ||

## 交互
read [-options] [variable...] # 键盘输入
read -a 
read -d 

## 流程控制
while [ expression ]; do # while
done

until [ expression ]; do # until
done

case express in # case 
	0)
		;;
	1)
		;;
	2)
		;;
	*)
esac

a)	            若单词为 “a”，则匹配
[[:alpha:]])	若单词是一个字母字符，则匹配
???)	        若单词只有3个字符，则匹配
*.txt)	        若单词以 “.txt” 字符结尾，则匹配
*)	            

for i in {A..D}; do echo $i; done # for循环

## 位置参数 $n
[me@linuxbox ~]$ posit-param a b c d
$0 = /home/me/bin/posit-param
$1 = a
$2 = b
$3 = c
$4 = d
