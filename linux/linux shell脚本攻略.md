# 1.15 比较与测试
## 算数比较
[condition] && action;
[ $count -eq 0 ] || action;
-eq: 相等
-ne: not equal
-gt: 大于
-ge: 大于或等于
-le: 小于或等于
## 文件系统相关测试（返回真）
[-f $file_var ] : 为正确文件路径
[-x $var] : 包含可执行文件
[-d $var ] : 包含目录
[-e $var] : 包含的文件存在
[-c $var] : 字符设备文件路径
[-b $var] : 块设备文件路径
[-w $var] : 文件可写
[-r $var] : 文件可读
[-L $var] : 包含连接符
## 字符串比较 ==, !=, <, >, 
$str1 == $str2 
$str1 != $str2
[[-z $str]] : 为空字符串
[[-n $str]] : 非空字符串

## 2.11 扩展名匹配
file_jpg="sample.123.jpg"
name=${file_jpg%.*} # 从又往左非贪婪匹配
$name # sample.123
name2=${file_jpg%%.*} # 从又往左贪婪匹配
$name2 # sample
extension=${file_jpg#*.} # 123.jpg
extension2=${file_jpg##*.} # .jpg
### 移动目录文件
```bash
count=1;
for img in *.jpg *.png
do
  new=image-$count.${img##*.}
  mv "$img" "$new" 2> /dev/null # 2> 错误输出
  if [$? -eq 0]; # $?命令错误返回0
  then
    echo "Renaming $img to $new"
    let count++
  fi
done
```
./test.sh fu # $1为第一个参数fu
## expect 实现自动化
```bash
#!/user/bin/expect
spawn ./interactive .sh
expect "Enter number:"
send "1\n"
expect "Enter name:"
send "hello\n"
expect eof
# 解析
spawn 指定需要自动化的命令
expect 参数提供需要等待的消息
send 发送的消息
expect eof 命令交互结束
```
## 3.4 awk行处理器
```bash
# 判断目录存在
if [-e /home/slynux]; then
  # 创建目录
fi
# 忽略已创建目录
mkdir -p /home/slynux/test/hello/child
chmod 764 filename -R 递归
```
