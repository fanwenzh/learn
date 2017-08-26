2. 基本元素: 数字、字符串、变量
```python
type(1)          # <class 'int'>
type(1.1)        # <class 'float'>
type('abc')      # <class 'str'>
#类型转换
int()
float()
str() 
  ``` 可创建多行字符串 ```
  len(str) // 获取长度 
  str.split(',')
  ','.join(arr)
  .startswith(), endswith('s') // true or false
  .find(), .rfind()
  .count()
  .strip(' ') // 删除以' '结尾的字符串
  .title() // 所有单词的开头字母变成大写
  .lower(), .upper()
  .replace(originStr, replaceStr, times)
\ 转义
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
分片
```
[:] 提取从开头到结尾的整个字符串
[start:] -> [0:-1]
[:end]
[start:end]  // 小于起始位置偏移量当0, 大于起始位置偏移量当-1 
[start:end:step] -> [::-1]
```

3. 容器：列表、元组、字典和集合
```python
# 列表
[] or list()
arr[offset] // offset: -1
arr[o1][o2]
  .append() // 尾部添加元素
  .extend(list2) // 合并
  .insert(index, el) // 插入元素
  .remove(el) //删除
del arr[-1] // 删除最后一个元素
  .pop(0) 表头, .pop() or .pop(-1) 表尾
  .index(el)
el in list // True or Flase
  .count(el)
  .sort(reverse=True)
  .copy() // 复制一份

# 元组: 常量列表, 不可增删查改
() -> a, b, c = (el1, el2, el3) // 析构

# 字典 (js的Object)
{} or dict(['a', 'b'], ['c', 'd']) -> ['a': 'b', 'c': 'd']
myDict[key]
  .update(otherDict) // hebing 
del myDict[key]
  .clear()
el in myDict
  .keys() # 获取所有key
  .values() # 获取所有值
  .items() # 获取所有键值对
  .copy() # 深复制

# 集合
set(): set('letter') -> {'l', 'e', 't', 't', 'e', 'r'}
val in mySet
& # 交集运算符 .intersection()
| # 并集运算符 .union()
- # 差集运算符 .difference()
^ # 异或运算符 .symmetric_difference()
<= # 子集
>= # 超类
```

4. 代码结构
```python
# 注释
\ 行链接
False
  False, None, 0, 0.0, '', [], (), {}, set()
zip() # 并行迭代
range(start, stop, step) # 生成自然数序列
for # [(row, col) for row in rows for col in cols]
    # {number for number in range(1, 6) if number % 3 == 1}
    # for food, count in dict_counter.item()
if not food in set1:
def fun(arr1='arr1'): # 关键词参数
  return None
def fun(*arg):
  print(arg) # js的arguments
# 作用域
def fun(**argKey):
  global a # 读取全局a元素：locals(), globals()
  print('%s', %argKey) #手机参数的键
# 异常捕获
try: 
  print()
except IndexError as err:
  print()
# 装饰器: 在现有函数基础上添加操作
def document_name(fun):
  def new_function(*args, **kwargs):
    print('Running function:', fun.__name__)
    print('Positional arguments:', args)
    print('Keyword arguments:', kwargs)
    result = fun(*arg, **kwargs)
    print('Result:', result)
    return result
    pass
  return new_function
@document_name
def add(a, b)
  return a + b
```
5. 模块
```python
# 导入模块
from sources import daily, weekly # daliy.forcast() # 调用函数
# 处理缺失值
table.setdefault(item) # 键不存在，添加元素, 存在则不添加
table.defaultdict(item) # 指定元素默认值
# from collections import Counter
breakfast = ['spam', 'eggs', 'spam']
bc = Counter(breakfast) # Counter({'spam':2, 'eggs': 1}), 可进行+-&|操作
# from collections import OrderedDic
quotes = OrderdDict[
  ('moe', 'a wise guy, huh?'),
  ('larry', 'ow!'),
  ('Curly', 'Nyuk nyuk!')
  ]
for stooge in quotes: // 按字典序输出
  print(stooge)
# for collections import deque
dq = deque(word)
dq.pop(), dq.pop(0)-dq.popleft()
# import itertools
itertools.chain([1,2], ['a', 'b']) # 连续迭代
itertools.cycle() # 循环迭代
itertools.accumulate() # 累加
itertools.accumulate() # 累乘
```
6.对象和类
```python
class Person():
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
  @property
  def name(self):
    return self.name + 't'
  @name.setter
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
  def __init__(self, tail)
    self.tail = tail
class Tail():
  def __init__(self, tail)
    self.tail = tail
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
  def __str__(self) # str(self)
  def __repr__(self) # repr(self)
  def __len__(self) #len(self)
```