# 多维数据
import numpy as np

x = np.linspace(0, 1, 12, endpoint=True)[1:-1]  # 线性空间除去头尾的数组
# np.random.normal(mean,stdev,size), 均值为mean，标准差为stdev的正太分布
x = np.rnadom.normal(0, 1, 20)
np.random.uniform(0, 1, 100)  # 随机100个0~1的数
np.random.randint(0, 10, 100)  # 随机100个0~10
umpy.random.randn(3,5) #从标准正态分布中返回3*5个样本值
# 返回3*5随机样本位于[0, 1)中, 同np.random.random((3, 5))  # 随机3*5, 其值为0~1
numpy.random.rand(3, 5)

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
m = np.eye(3)
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
m.mean()
m.dot(y) # np.dot(x,y) 矩阵相乘 A * B
m.sort()
m.astype(np.float32, np.float64) # 类型转换
np.add.reduce(m)
sum(m)
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
# Z - Z%1 == np.floor(Z) == np.ceil(Z)-1 == Z.astype(int) == np.trunc(Z)

np.random.shuffle(m) # 随机打乱
np.bitcount(A) # 统计A各元素的个数
np.bitcount(I, minlength=len(A)) # 统计基于I的A元素个数
np.nonzero(m)
np.diag(1+np.arange(4), k=-1) # 对角函数
np.array(100, (6,7,8)) # 在三维6*7*8的矩阵里100的下标
np.tile( np.array([[0,1],[1,0]]), (4,4)) # 将矩阵2*2长宽扩展为4倍, np.tile(val, (x, y))

np.atleast_2d(m) # 如果m小于2维，转换为2维[] => [[]]
np.cumsum(m) # 返回各位置前面元素叠加的矩阵(累加)
np.diff(m) # 后一个元素减前一个元素组成的矩阵(累减)
m.argmax() # 返回最大值的坐标
m.argmin()
U, S, V = np.linalg.svd(Z) # Singular Value Decomposition 矩阵分解
np.argpartition(-m,n)[:n] # 返回m数组前n个最大值的坐标
yi = np.interp(x, y, xi, method) # y = f(x)函数插值xi的值, method: nearest, linear默认, spline

# 查找Z中与v最相近的值
Z = np.arange(100)
v = np.random.uniform(0,100)
index = (np.abs(Z-v)).argmin()
# 计算点与点之间的距离1
Z = np.random.random((10,2))
X,Y = np.atleast_2d(Z[:,0]), np.atleast_2d(Z[:,1])
D = np.sqrt( (X-X.T)**2 + (Y-Y.T)**2)
print(D)
# 读取以,分隔的txt
np.genfromtxt("missing.dat", delimiter=",")
# 遍历matrix(或两个for循环)
Z = np.arange(9).reshape(3,3)
for index, value in np.ndenumerate(Z):
    print(index, value)
for index in np.ndindex(Z.shape):
    print(index, Z[index])
# 每一行减去平均数
X = np.random.rand(5, 10)
# Recent versions of numpy
Y = X - X.mean(axis=1, keepdims=True)
# Older versions of numpy
Y = X - X.mean(axis=1).reshape(-1, 1)
# 根据第n列排序
Z = np.random.randint(0,10,(3,3))
z = Z[Z[:,1].argsort()]
# 分辨2维数组是否有空列
Z = np.random.randint(0,3,(3,10))
(~Z.any(axis=0)).any()
# 根据权重D计算S值
D = np.random.uniform(0,1,100)
S = np.random.randint(0,10,100)
D_sums = np.bincount(S, weights=D)
# np.einsum()
np.einsum('i->', A)       # np.sum(A)
np.einsum('i,i->i', A, B) # A * B  #对应位置相乘
np.einsum('i,i', A, B)    # np.inner(A, B) # 对应位置相乘相加 np.dot(A, B)
np.einsum('i,j', A, B)    # np.outer(A, B) # 法向量

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

