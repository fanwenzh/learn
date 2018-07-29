配置
vi ~/.zshrc 
export PATH="/Users/fwz/anaconda3/bin:$PATH"
https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001431675624710bb20e9734ef343bbb4bd64bcd37d4b52000

2. 基本元素: 数字、字符串、变量
```python
type(1)          # <class 'int'>
type(1.1)        # <class 'float'>
type('abc')      # <class 'str'>
#类型转换
bin() # 二进制
int()
float()
str() 
bool()
# v.clip() 截取
``` 可创建多行字符串 
```python 
  len(str) // 获取长度 
  str.split(',')
  ','.join(arr)
  .startswith(), endswith('s') // true or false
  .find(), .rfind()
  .count()
  .strip(' ') // 删除以' '头尾尾的字符串 .strip(a)
  .title() // 所有单词的开头字母变成大写
  .lower(), .upper()
  .replace(originStr, replaceStr, times) # 创建一个新字符串并返回
  isalnum() 是字母或数字
  \ 转义, 如\t
  + 拼接
  * 复制
```
```
/ 浮点数除法
// 整数除法
% 模除
** 幂
divmod(9, 5) -> (1, 4) // 模除和商

0b/0B  二进制
0o/0O  八进制
0x/0X  十六进制
```
分片(字符串、列表、元组)
```python
[:] 提取从开头到结尾的整个字符串[0:-1] # [::-1] 反转顺序
[start:] -> [0:-1]
[:end]
[start:end]  // 小于起始位置偏移量当0, 大于起始位置偏移量当-1 
[start:end:step] -> [::-1]
```

max(), min(), abs()
3. 容器：列表、元组、字典和集合
```python
# 列表(数组)
[] or list()
arr[offset] // offset: -1
arr[o1][o2]
分片[start:end:step]
  .append() // 尾部添加元素
  .extend(list2) // 扩展列表
  .insert(index, el) // 插入元素
  .remove(el) //删除
  .sort(cmp=None, key=None, reverse=False)
  .reverse()
del arr[-1] // 删除最后一个元素 del arr[index]
  .pop(0) 表头, .pop() or .pop(-1) 表尾 // append(), pop()
  .index(el) // 查询位置
el in list // True or Flase
  .count(el)
  .sort(reverse=True)
  .copy() // 复制一份

# 元组: 常量列表, 不可增删查改
() -> a, b, c = (el1, el2, el3) // 析构
a, b = b, a // 交换
a + b
tuple(list)
tuple.sort()
t = (1,) # 避免括号歧义
t.index(i)
t.count()
t[0:4] # 切片结果仍是元组

# 字典 (js的Object)
{} or dict(['a', 'b'], ['c', 'd']) -> ['a': 'b', 'c': 'd']
myDict[key]
  .update(otherDict) // 合并 
del myDict[key]
  .get(key, defaultValue)
  .clear()
  .has_key(key) # python2, 在python3中表达为 in
el in myDict
  .keys() # 获取所有key
  .values() # 获取所有值
  .items() # 获取所有键值对
  .copy() # 深复制
  .pop(key) # 推出
# 字典初始化
  dict.([(key1,val1),(key2, val2),(key3, val3)])
  dict.fromkeys(arr, val) # 生成字典
  dict(zip(['key1', 'key2', 'key3'], [1,2,3]))
  {k:v for (k,v) in zip(['key1', 'key2', 'key3'], [1,2,3])}

# 集合
set(): set('letter') -> {'l', 'e', 't', 't', 'e', 'r'}
val in mySet
.add(el)
.remove(el)
.discard(obj) # 如果obj是集合s中的元素，从集合s中删除对象obj
.pop()
.clear()
& # 交集运算符 .intersection()
| # 并集运算符 .union()
- # 差集运算符 .difference()
^ # 异或运算符 .symmetric_difference()
<= # 子集
>= # 超类
```

4. 代码结构
```python
# 注释 """ 多行注释 """
\ 行链接
and or not
False
  False, None, 0, 0.0, '', [], (), {}, set()
zip() # 并行迭代 for a, b, c in zip(as, bs, ds):
range(start, stop, step) # 生成自然数序列
# 推导
[expression for item in iterable if condition]

for # [(row, col) for row in rows for col in cols]
    # {number for number in range(1, 6) if number % 3 == 1}
    # for food, count in dict_counter.item()

if not food in set1:
elif
else
def fun(arr1='arr1'): # 关键字默认参数, 默认参数为[]时，保持不变；所以应设置L=None，if L is None: L = []
  pass # 跳过
  return None
def fun(*arg): # 可变参数 fun(1,2,3) or fun(*list or *tuple)
  a = input() # 输入
  print(arg) # js的arguments, 保存为元组(arg1, arg2), args[0]
def person(name, age, *args, city, job): # 可变(位置)参数, person('Jack', 24, 'Beijing', 'Engineer')
# 作用域
def fun(**argKey): # 字典参数，key:word 字典形式收集参数. 应用fun(arg1='1', arg2='2') or fun(**dict)
  global a # 读取全局a元素：locals(), globals()
  print(argKey) #收集参数的键, argKey输出字典{}
def person(name, age, *, city, job): # 只接收city和job作为关键字参数, person('Jack', 24, city='Beijing', job='Engineer')
def fun2(fun1, arg) # 一切为对象，可将函数作为参数传入
# 匿名函数lambda
fun(args, lambda arg: arg.capitalize() + '!')
# 生成器
yield number # 返回生成器对象
# 装饰器: 在现有函数基础上添加操作
def document_name(fun):
  def new_function(*args, **kwargs):
    print('Running function:', fun.__name__)
    print('Positional arguments:', args)
    print('Keyword arguments:', kwargs)
    result = fun(*args, **kwargs)
    print('Result:', result)
    return result
  return new_function
# 1. 直接调用 newFun = document_name(fun)
# 2. 通过@修饰函数调用
@document_name
def add(a, b):
  return  a + b
add(a = 1, b = 2) # add(1, 2)
# 定义异常
class myException(Exception):
  pass
# 异常捕获
try: 
  print()
  raise myException('hello')
except IndexError as err:
  print()
```
5. 模块
```python
# 导入模块
from sources import daily, weekly # daliy.forcast() # 调用函数
import source as s# 导入模块
# 模块导入顺序
import sys
for place in sys.path:
  print(place)
# 处理缺失值, 补充字典值
table.setdefault(item) # 键不存在，添加元素, 存在则不添加
table.defaultdict(item) # 指定元素默认值

import os
print os.getcwd()
print os.path.abspath(os.curdir)
print os.path.abspath('.')

# 库
from collections import Counter # 计数器
breakfast = ['spam', 'eggs', 'spam']
bc = Counter(breakfast) # Counter({'spam':2, 'eggs': 1}), 可进行+-&|操作
from collections import OrderedDic # 按键排序
quotes = OrderdDict[
  ('moe', 'a wise guy, huh?'),
  ('larry', 'ow!'),
  ('Curly', 'Nyuk nyuk!')
  ]
for stooge in quotes: // 按字典序输出
  print(stooge)
from collections import deque # 双队列
dq = deque(word)
dq.pop(), dq.pop(0)-dq.popleft()
# import itertools
itertools.chain([1,2], ['a', 'b']) # 连续迭代
itertools.cycle() # 循环迭代
itertools.accumulate([1,2,3,4]) # 累加
itertools.accumulate( ,fun ) # 自定义迭代函数
```
6.对象和类
```python
# @property # 设置getter
# @name.setter # 设置setter
# @classmethod # 类方法，第一个参数为类本身self
# @staticmethod # 静态方法
class Person():
  count = 1 # 静态属性
  def __init__(self, name):
    super().__init__(name) # 调用超类的构造函数
    self.name = name # self自定义属性
    self.__name = name # 私有属性，无法用.__name访问，但可用._Person__name访问
  def get_name(self):
    return self.name + 't'
  def set_name(self, input_name)
    self.name = input_name
  name = property(get_name, set_name) # 设置getter和setter方法
  # 或者 装饰器设置getter(@property), setter(@name.setter)
  @property # 设置getter
  def name(self):
    return self.name + 't'
  @name.setter # 设置setter
  def name(self, input_name)
    self.name = input_name
# 继承，函数可直接覆盖
class SuperMan(Person): 
  pass # 可添加方法
  # 类方法
  @classmethod
  def fun:
    pass
  # 静态方法, 不影响类和类对象
  @staticmethod
  def fun2:
    print('hi')
# 组合
class Duck():
  def __init__(self, tail):
    self.tail = tail
  def all():
    return tail.name
class Tail():
  def __init__(self, tail)
    self.name = name
tail = Tail('long')
duck = Duck(tail)
# 定义符号函数
  # 比较相关
  def __eq__(self, other) # self == other
  def __ne__(self, ohter) # self != other
  def __lt__(self, other) # self < other
  def __gt__(self, other) # self > other
  def __le__(self, other) # self <= other
  def __ge__(self, oter) # self >= other
  # 数学相关
  def __add__(self, other) # self + other
  def __sub__(self, other) # self - other
  def __mul__(self, other) # self * other
  def __floordiv__(self, other) # self // other
  def __truediv__(self, other) # self / other
  def __mod__(self, other) # self % other
  def __pow__(self, other) # self ** other
  # 其他
  def __str__(self) # str(self) # 序列化 print
  def __repr__(self) # repr(self)
  def __len__(self) #len(self)
```

## 7. 编码
```python
str.encode('utf-8') # ascii
str.decode('utf-8')
#  格式化
"hello %d %f %s" % (25, 25.0, True)
'hello, {0} {1:lf}%'.format('小明', 17.25)
%s 字符串
%d 十进制
%10.4d 10个字符宽,浮点数在为小数点后4位
# 正则表达式
import re
source = 'Young Frankenstein'
m = re.match('You', source) # .match('\d') :\d \D \w \W \s \S \b \B 
m.group()
re.search() # 返回第一次匹配
re.findAll() # 返回所有不重叠的匹配
re.split() # 划分段落
re.sub() # 
```

## 8 文件
```python
## 
fout = open('fileName', 'wt') # rwxa # read, write, create, append
fout.write(str)
fout.close()
.read(), readline(), readlines()
with expression as variable
seek() 跳转到其他字节位置
tell() 
## csv, xml
import xml.etree.ElementTree as et
import json
isinstance(obj, class) # 判断是否为该类型, if not isinstance(x, (int, float)):
```

## 10 系统
```python
import os
os.path.exists("fileName")
os.path.isfile("fileName")
os.path.isdir("dirName") #.当前目录, ..上一目录
os.path.abspath() # 相对路径
os.path.realpath() # 绝对路径
os.remove(fileName)
os.mkdir(dirName) #创建目录
os.rmdir()
os.listDir(dirName)
os.chdir(path) # 改变当前目录
os.getcwd() # 获取当前目录
os.getpid() # 获取当前进程
# 文件复制
import shutil
import time
time.sleep(5)
time.time() # 返回当前时间戳
time.mktime(t) # 将一个struct_time转化为时间戳。

shutil.copy('source', 'des')
shutil.move()
# 创建进程
import subprocess # 单进程
import multiprocessing # 多进程
p = multiprocessing.Process(target=loopy, args=()) # 新建进程
p.start() # 开始
p.terminate() # 结束

# datetime模块 # 时间处理
from datetime import date
helloween = date(2014, 10, 31)
helloween.day, .month, .year
date.today # date.now()
day = datetime.time(12,3,0)
day.hour, .minute, .second

# 多进程
import multiprocessing as multiprocessing
dq = mp.JoinableQueue() # 队列
d = mpProcess(target=fun, args=(dq))
d.daemo = True
d.start()
dq.join() # 所有进程结束
# 线程
import threading, queue
# 自动转换快线程、慢线程(绿色线程)
import gavent
```

## python科学
```python
import math
math.fabs(), .floor(), .ceil(), .sqrt()
# 精度
from decimal import Decimal
# 多维数据
import numpy as np
arr = np.array([1,2,3,4]) # 创建数组 a[0, 0]
arr = np.arange(10, dtype=float) # 0.0-10.0
np.mat() # 数组化为矩阵
mt = np.mat([[1,2],[3,4]]) # 矩阵mt
mt.getA() # np.asarray(self) 转换为ndarray类型
mt.getA1() # 转换为1维矩阵
mt.getH() # 复数时为对偶矩阵，实数时为转置
mt.getI() # 返回可逆矩阵的逆
m = np.zeros((3,4)) # 3*4 为0的矩阵
m = np.ones((1,3)) # 全为1.0
m = np.empty((1,3)) # 空数组，近似0[(1, 5, 9), (2, 6, 10), (3, 7, 11), (4, 8, 12)]
m = np.linespace(0,2,9) # 0-2的9个等差数列 [ 0., 0.25, 0.5, 0.75, 1., 1.25,  1.5, 1.75, 2.]
m.ndim # 维数（行）
m.size # 元素个数
m.itemsize # 每个元素占空间大小
m.shape # -> 3*4 or m.shape = (1,4)
m.dtype # 数据类型
m.reshape(1,8) # 改变矩阵形状 : arange(24).reshape(2, 3, 4)
m.resize((2, 12))
m.ravel() # 变成一维数组（视图）
m.flatten() # 返回一维数组
m.transpose() # 转置
m.dot(y) # np.dot(x,y) 矩阵相乘 A * B
m.T # 转置
m.I # 逆
solve(A, B) # 解线性方程组
m.copy() # 深拷贝
m > 2 # .max(), .min(), .sum()
np.hstack((a,b)) # 水平叠加 np.concatenate((a,b), axis = 1) or np.column_stack((a,b))
np.vstack((a,b)) # 垂直叠加 np.concatenate((a,b), axis = 0) or np.row_stack((a, b))
np.hsplit(a,3) # 对a纵向拆分 or np.split(a,3,axis = 1)
np.vsplit(a,3) # 对a横向拆分 or np.split(a,3,axis = 0)
np.dsplit(c,3) # 深度拆分

# pandas
# https://www.joinquant.com/post/603903d2c8f565caa6712bd53bad4a7a?f=stydy&m=python
import pandas as pd
s = pd.Series([1,2,3]) # 创建一维数组
dates = pd.date_range('20130101', periods=6)
df = pd.DataFrame(np.random.randn(6,4),index=dates,columns=list('ABCD'))
df.head() # 获取头部元素
df.tail() # 获取尾部元素
df.index # 获取列表索引
df.columns # 获取列名
df.values # 获取值
df.describe() # 快速统计
df.T # 转置
df.sort(columns='open') #根据open列排序
df['open'], df.open # 选择列数据 d['a', 'b'], d['a':'b']
# df.loc[行标签,列标签]
df.loc['a':'b'] #选取 ab 两行数据
df.loc[:,'open'] #选取 open 列的数据
df.iloc[行位置,列位置]
df.iloc[1,1] #选取第二行，第二列的值，返回的为单个值
df.iloc[[0,2],:] #选取第一行及第三行的数据
df.iloc[0:2,:] #选取第一行到第三行（不包含）的数据
df.iloc[:,1] #选取所有记录的第二列的值，返回的为一个Series
PS：iloc 则为 integer & location 的缩写
# 切片
df[df.open > 8.8 & df.close < 9.0] # open列大于8.8
df[df > 9.0] = 0 # 大于9.0的设置为0
# 过滤
df[df['high'].isin([0.00,9.00])] # 选取 high 列中数为 0 和 9 的数。
df.dropna() # 去掉包缺失值得行
df.fillna(value = 0) # 对缺失值进行填充
pd.isnull(df) # 判断数据是否为nan，并进行布尔填充
df.mean()#列计算平均值
df.mean(1)#行计算平均值
df.mean(axis = 1,skipna = False) # skipna参数默认是 True 表示排除缺失值
df.sort_index()#行名字排序
df.sort_index(axis=1)#列名字排序
df.sort_index(axis=1,ascending = False) # 数据默认是按升序排序的，也可以降序排序, 等等函数
df.median() # 中位数
df.std() # 标准差
# 数据规整
pd.concat([df1, df2], axis=0) # 纵向拼接
pd.concat([df1, df2], axis=1) # 横向拼接
df1.append(s, ignore_index=False) # ignore_index=False 表示索引不变; ignore_index=True, 索引重置
df.duplicated() # 查看重复数据：
df.drop_duplicated() # 移除重复数据：
z.groupby('open').sum() # open列值相等的(其他列)以相加的形式合并

# 设置断点
import ipdb
ipdb.set_trace()
# n(下一个), ENTER(重复上次命令), q(退出), p 变量(打印变量), c(继续), l(查找当前位于哪里), s(进入子程序), r(运行直到子程序结束)

import time
start = time.clock()
end = time.clock()

# -*- coding: utf-8 -*- # UTF-8编码
```
