## 高级特性
```python
# 迭代
from collections import Iterable
isinstance('abc', Iterable) # str是否可迭代, for in, 但是list、dict、str等数据类型不是Iterator
it = iter([1, 2, 3, 4, 5])
for i, value in enumerate(['A', 'B', 'C']): # 添加索引

# 生成器
 L = [x * x for x in range(10)] # list []
 g = (x * x for x in range(10)) # generator ()
 next(g) # 下一个生成器返回值，没有抛出StopIteration错误，所以基本不用
 yield b # yield关键字，使函数变成generator

# 高阶函数
map(fun, list)
list(map(str, [1, 2, 3, 4, 5, 6, 7, 8, 9])) # ['1', '2', '3', '4', '5', '6', '7', '8', '9']
from functools import reduce
reduce(fun, list)
filter(fun, list)
sorted(fun, key=fun, reverse=True)

# 偏函数
max2 = functools.partial(max, 10) # 添加 *arg

# 获取对象信息
type()
isinstance()
dir() # 获取一个对象的所有属性和方法
len() # obj.__len__()
hasattr(obj, key)
getattr(obj, key)
setattr(obj, key)

# 面向对象高级编程
# 固定属性名
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称
# getter,setter
class Student(object):
    @property
    def score(self): # def get_score(self, value)
        return self._score
    @score.setter
    def score(self, value): # def set_score(self, value)
    	self._score = value
# 多重继承
class Student(User, Person)
	def __init__(self)

# 枚举
from enum import Enum, unique # @unique 检查重复
Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))

# 元类: class名称, 继承的父类集合, 方法名称与函数fn绑定
Hello = type('Hello', (object,), dict(hello=fn)) # 创建Hello class
h = Hello()
# metaclass: 改变类创建时的行为
# 实现ORM: https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014319106919344c4ef8b1e04c48778bb45796e0335839000
class ListMetaclass(type): # metaclass是类的模板，所以必须从`type`类型派生：
    def __new__(cls, name, bases, attrs): # __new__ 先于类__init__执行， 参数为当前准备创建的类的对象, 类的名字, 类继承的父类集合, 类的方法集合
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)
class MyList(list, metaclass=ListMetaclass): # 通过metaclass创建MyList
    pass
L = MyList()
L.add(1) # [1]

# 错误处理
class FooError(ValueError):
	pass
import logging # 异常记录
try:
	raise BaseException("error") # 所有异常的父类BaseException
except BaseException as e:
	logging.info("test") # info, debug, warning, error
	logging.exception(e) # 打印错误后继续执行，然后正常退出
	raise # 记录错误后继续向外抛出
else:
	print("imposible")
finally:
	print("end")
# 调试
import logging # 异常记录
logging.basicConfig(level=logging.INFO) # 指定只输出info内容
assert n != 0, 'n is zero!' # 断言
# pdp调试
import pdb
pdb.set_trace() # n(下一个), ENTER(重复上次命令), q(退出), p 变量(打印变量), c(继续), l(查找当前位于哪里), s(进入子程序), r(运行直到子程序结束)

# 单元测试
import unittest
from mydict import Dict
class TestDict(unittest.TestCase): # 继承unittest.TestCase
    def test_init(self): # 以test开头
        d = Dict(a=1, b='test')
        self.assertEqual(d.a, 1) # assertEqual
        self.assertEqual(d.b, 'test')
        self.assertTrue(isinstance(d, dict)) # assertTrue
    def test_key(self):
        d = Dict()
        d['key'] = 'value'
        self.assertEqual(d.key, 'value')

    def setUp(self): # 每个测试方法前执行
        print('setUp...')
    def tearDown(self): # 每个测试方法后执行
        print('tearDown...')
if __name__ == '__main__': # 运行单元测试
    unittest.main()
# 文档测试, 运行文档注释中的代码
if __name__=='__main__':
    import doctest
    doctest.testmod()

# IO编程
# 文件读写
with open(path, mode) as f: # utf-8的文本
	f.read() # f.raed(size)
	f.readline()
	for line in f.readlines()
		line.strip()
# 读取二进制文件
f = open('/Users/michael/test.jpg', 'rb') # b模式为binary
f = open('/Users/michael/gbk.txt', 'r', encoding='gbk', errors='ignore')
# 写文件
with open('/Users/michael/test.txt', 'w') as f: # a模式为append
    f.write('Hello, world!')

# StringIO和BytesIO, 内存中读写
from io import StringIO
f = StringIO()
f.write("hello")
f.readline() 读一行
f.getvalue() 读所有
f.read()
# BytesIO二进制
f = BytesIO()
f.write('中文'.encode('utf-8'))
f.read()

# 操作文件和目录
import os
os.name # 操作系统类型
os.uname() # 详细系统信息
os.environ # 所有环境变量
os.environ.get('PATH')
os.path.abspath('.') # 查看当前目录的绝对路径:
os.path.join('/Users/michael', 'testdir') # 在某个目录下创建一个新目录路径（不同系统分隔符不同\/，所以应用join函数合并）
os.mkdir('/Users/michael/testdir') # 创建目录
os.rmdir('/Users/michael/testdir') # 删除目录
os.path.split('/Users/michael/testdir/file.txt') # 划分目录和文件名 ('/Users/michael/testdir', 'file.txt')
os.path.splitext('/path/to/file.txt') # 获取文件扩展名 ('/path/to/file', '.txt')
os.listdir('.') # 获取目录所有文件
os.path.isfile(x)
os.path.isdir(x)

# 序列化
import pickle
d = dict(name='Bob', age=20, score=88)
pickle.dumps(d) # 对象序列化
f = open('dump.txt', 'rb') 
d = pickle.load(f) # 读取
# 读取json
import json
d = dict(name='Bob', age=20, score=88)
json.dumps(d) # 序列化 JSON字符串: '{"age": 20, "score": 88, "name": "Bob"}'
json.loads(json_str) # 反序列化 JSON格式： {'age': 20, 'score': 88, 'name': 'Bob'}
# 将类序列化
class Student(object):
    def __init__(self, name, age, score):
        self.name = name
        self.age = age
        self.score = score
	def student2dict(std):
	    return {
	        'name': std.name,
	        'age': std.age,
	        'score': std.score
	    }
s = Student('Bob', 20, 88)
print(json.dumps(s, default=student2dict)) # defaut 设置序列化函数
json.dumps(s, default=lambda obj: obj.__dict__) # 将任意实例对象序列用dict表示 obj.__dict__

# 多进程
# Linux：fork():父进程获取子进程id, 为0时无子进程, getppid(): 子进程获取父进程id, getpid(): 获取自身id
from multiprocessing import Process # 跨平台
import os
def run_proc(name): # 子进程要执行的代码
    print('Run child process %s (%s)...' % (name, os.getpid()))
if __name__=='__main__':
    print('Parent process %s.' % os.getpid())
    p = Process(target=run_proc, args=('test',))
    print('Child process will start.')
    p.start() # 进程p开始
    p.join() # 进程p结束
    print('Child process end.')
# 启动大量进程
from multiprocessing import Pool
import os, time, random
def long_time_task(name):
    print('Run task %s (%s)...' % (name, os.getpid()))
    start = time.time()
    time.sleep(random.random() * 3)
    end = time.time()
    print('Task %s runs %0.2f seconds.' % (name, (end - start)))
if __name__=='__main__':
    print('Parent process %s.' % os.getpid())
    p = Pool(4) # 4: cpu数量
    for i in range(5):
        p.apply_async(long_time_task, args=(i,)) # apply_async 异步开始
    print('Waiting for all subprocesses done...')
    p.close() # 调用join()之前必须先调用close()，调用close()之后就不能继续添加新的Process
    p.join() # 所有子进程执行完毕
    print('All subprocesses done.')
# 进程通信
from multiprocessing import Process, Queue
import os, time, random
def write(q): # 写数据进程执行的代码:
    print('Process to write: %s' % os.getpid())
    for value in ['A', 'B', 'C']:
        print('Put %s to queue...' % value)
        q.put(value)
        time.sleep(random.random())

def read(q): # 读数据进程执行的代码:
    print('Process to read: %s' % os.getpid())
    while True:
        value = q.get(True)
        print('Get %s from queue.' % value)
if __name__=='__main__': # 父进程创建Queue，并传给各个子进程：
    q = Queue()
    pw = Process(target=write, args=(q,))
    pr = Process(target=read, args=(q,))
    pw.start() # 启动子进程pw，写入:
    pr.start() # 启动子进程pr，读取:
    pw.join()  # 等待pw结束:
    pr.terminate() # pr进程里是死循环，无法等待其结束，只能强行终止:
# 多线程
import time, threading
threading.current_thread().name # 返回当前线程的名字
# 锁
lock = threading.Lock()
lock.acquire()
lock.release()
# 由于设计原因，python有Global Interpreter Lock(GIL锁)，只能运用单核 -- CPython
# ThreadLocal
import threading
local_school = threading.local() # 一个线程在多函数域传值
local_school.student = name
std = local_school.student

# 正则表达式
import re
m = re.match(r'^(\d{3})-(\d{3,8]})$', '010-12312')
m.group(0) # 匹配全字符, 1:分组1
re_telephone = re.compile(r'^(\d{3})-(\d{3,8})$') # 预编译，用于多次匹配
re_telephone.match('010-12345').groups()
```
## 常用内联模块
```python
from datetime import datetime
now = datetime.now() 
now.timestamp()
datetime.fromtimestamp(t)
cday = datetime.strptime('2015-6-1 18:19:59', '%Y-%m-%d %H:%M:%S') # str转换为datetime
now.strftime('%a, %b %d %H:%M') # datetime转换为str

# 自定义索引tuple: 
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(1, 2)
p.x # 1
# 双向队列
from collections import deque
q = deque(['a', 'b', 'c'])
q.append('x') # pop()
q.appendleft('y') # popleft()
# key有序字典， 按字典插入顺序排序
from collections import OrderedDict
od = OrderedDict([('a', 1), ('b', 2), ('c', 3)])
# base64编码二进制
import base64
base64.b64encode(b'binary\x00string')
base64.b64decode(b'YmluYXJ5AHN0cmluZw==') # 不足64位等号填充
# 摘要算法
import hashlib
md5 = hashlib.md5() # hashlib.sha1()
md5.update(('how to use md5 in python hashlib?' + 'salt').encode('utf-8'))
md5.hexdigest()
# 加哈希的摘要算法
import hmac
message = b'Hello, world!'
key = b'secret'
h = hmac.new(key, message, digestmod='MD5')
h.hexdigest()
# with，实现__enter__, __exit__两个方法的类，即可在构造时带上with
from contextlib import contextmanager
class Query(object):
    def __init__(self, name):
        self.name = name
    def query(self):
        print('Query info about %s...' % self.name)
@contextmanager # 还有@closeing装饰器等
def create_query(name):
    print('Begin')
    q = Query(name)
    yield q
    print('End')
with create_query('Bob') as q:
    q.query()

# urllib 发送请求
from urllib import request
# GET
req = request.Request('http://www.douban.com/')
req.add_header('key', 'data')
with request.urlopen(req) as f:
	    print('Status:', f.status, f.reason) 
    for k, v in f.getheaders():
        print('%s: %s' % (k, v))
    print('Data:', f.read().decode('utf-8'))
# POST
from urllib import request, parse
login_data = parse.urlencode([
    ('username', email),
    ('password', passwd)])
with request.urlopen(req, data = login_data.encode('utf-8')) as f:
# requests
import requests
r = requests.get('https://www.douban.com/', params={'q': 'python', 'cat': '1001'})
r.status_code = 200
r.encoding
r.content
r.json()
# POST
params = {'key': 'value'}
r = requests.post(url, json=params) # 内部自动序列化为JSON
upload_files = {'file': open('report.xls', 'rb')}
cs = {'token': '12345', 'status': 'working'}
r = requests.post(url, files=upload_files, cookies=cs)
r.headers
r.headers['Content-Type']
r.cookies['ts']

# 读取xml文件
from xml.parsers.expat import ParserCreate
class DefaultSaxHandler(object):
    def start_element(self, name, attrs):
        print('sax:start_element: %s, attrs: %s' % (name, str(attrs)))
    def end_element(self, name):
        print('sax:end_element: %s' % name)
    def char_data(self, text):
        print('sax:char_data: %s' % text)
handler = DefaultSaxHandler()
parser = ParserCreate()
parser.StartElementHandler = handler.start_element # 标签头
parser.EndElementHandler = handler.end_element  # 标签内容
parser.CharacterDataHandler = handler.char_data # 闭合标签
parser.Parse(xml)
# 解析html
from html.parser import HTMLParser
class MyHTMLParser(HTMLParser):
	def __init__(self):
		HTMLParser.__init__(self)
parser.feed(htmlDoc)

# 常用第三方模块
# 图像处理
from PIL import Image 
im = Imgae.open('test.jpg')
w, h = im.size
im.thumbnail((w//2, h//2)) # 长款缩放50%
im2 = im.filter(ImageFilter.BLUR)
im2.save('blur.jpg', 'jpeg')
# 生成二维码
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random
def rndChar(): # 随机字母:
    return chr(random.randint(65, 90))
def rndColor(): # 随机颜色1:
    return (random.randint(64, 255), random.randint(64, 255), random.randint(64, 255))
def rndColor2(): # 随机颜色2:
    return (random.randint(32, 127), random.randint(32, 127), random.randint(32, 127))
width = 60 * 4 # 240 x 60:
height = 60
image = Image.new('RGB', (width, height), (255, 255, 255))
font = ImageFont.truetype('Arial.ttf', 36) # 创建Font对象:
draw = ImageDraw.Draw(image) # 创建Draw对象:
for x in range(width): # 填充每个像素:
    for y in range(height):
        draw.point((x, y), fill=rndColor())
for t in range(4): # 输出文字:
    draw.text((60 * t + 10, 10), rndChar(), font=font, fill=rndColor2())
image = image.filter(ImageFilter.BLUR) # 模糊:
image.save('code.jpg', 'jpeg')

# chardet 字符串检查编码
# 运维信息
# https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001511052957192bb91a56a2339485c8a8c79812b400d49000
import psutil
psutil.cpu_count() # CPU逻辑数量
psutil.cpu_times() # 统计CPU的用户/系统/空闲时间
psutil.cpu_percent(interval=1, percpu=True) # cpu 使用率，每秒刷新一次
psutil.virtual_memory() # 物理内存
psutil.swap_memory() # 交互内存
psutil.net_io_counters() # 获取网络读写字节／包的个数
psutil.net_if_addrs() # 获取网络接口信息
psutil.net_if_stats() # 获取网络接口状态
psutil.pids() # 进程信息
p = psutil.Process(3776) 
p.name, p.exe() # 路径 
p.cwd() # 进程工作目录
p.ppid() # 父进程ID

# virtualenv 不同版本冲突
# socket : https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001432004374523e495f640612f4b08975398796939ec3c000
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('www.sina.com.cn', 80)) # 建立tcp连接
s.send(b'GET / HTTP/1.1\r\nHost: www.sina.com.cn\r\nConnection: close\r\n\r\n') # 发送数据
# 接收数据:
buffer = []
while True:
    # 每次最多接收1k字节:
    d = s.recv(1024)
    if d:
        buffer.append(d)
    else:
        break
data = b''.join(buffer)
s.close() # 关闭连接

# SQLAlchemy ： sql数据库映射
from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 协程: 单线程多程序
.send(), yield
# 异步
import asyncio # io
@asyncio.coroutine # 标记为协同程序
def hello():
    print("Hello world!")
    yield from asyncio.sleep(1) # yield from 调用另一个generator
    print("Hello again!")
loop = asyncio.get_event_loop() # 获取EventLoop:
tasks = [hello(), hello()]
loop.run_until_complete(asyncio.wait(tasks)) # 执行coroutine
loop.close()
# async await
async def hello():
	print("Hello world!")
	r = await asyncio.sleep(1) # async await语法
	print("Hello again!") 
# 服务端异步
from aiohttp import web 

```