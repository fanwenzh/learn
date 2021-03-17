import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-1, 1, 50)
y = 2*x + 1

plt.figure() # 定义窗口
plt.figure(num=3, figsize=(8,5)) # 编号为3，大小为(8,5)
l1 = plt.plot(x, y, color='red', linewidth=1.0, linestype='--', label='redline') # 默认直线, --虚线
# 设置坐标
plt.xlim((-1, 2))
plt.ylim((-2, 3))
plt.xticks([0,1, 0,2, 0,3], ['test1', 'test2', 'test3']) # 设置坐标刻度
plt.xlabel('x坐标名称')
plt.ylabel('y坐标名称')
plt.legend(loc='best') # 图示位置: upper right
# plt.legend(handles=[l1], labels=['labelName'], loc='best') # 方法2
plt.show() 

# 散点图
n = 1024 # data size
x = np.random.normal(0, 1, n)
y = np.random.normal)0, 1, n) 
T=np.arctan2(Y, X)  # for color value
plt.scatter(x, y, s=75, c=T, alpha=0.5)
plt.show()

# 子图
plt.figure()
ax1=plt.subplot2grid((3, 3), (0, 0), colspan=3)  # 占3列
ax1.plot([1, 2], [1, 2])    # 画小图
ax1.set_title('ax1_title')  # 设置小图的标题
ax2=plt.subplot2grid((3, 3), (1, 2), rowspan=2) # 占两行
ax2.scatter([1,2], [2,2])
plt.show()

plt.ion() # 实时画图
plt.ioff() # 停止实时画图
plt.cla() # clear()
plt.pause(0.1) # 暂停0.1秒
plt.close() # 关闭序号为0的子图
plt.close('all') # 关闭所有图
plt.savefig('/tmp/1.png')

plt.sca(ax2)  # 选择图表2的子图2
plt.plot(x, np.cos(i*x)) # 而后画图
