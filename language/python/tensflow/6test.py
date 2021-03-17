import tensorflow as tf 
import numpy as np 

# 模拟数据
x_data = np.random.rand(100).astype(np.float32) # 规定np.float32
y_data = x_data * 0.1 + 0.3

# 模型
# random_uniform(shape, dtype, seed=0, seed2=0, name=None)
weights = tf.Variable(tf.random_uniform([1], -1.0, 1.0)) # -1 至 1
biases = tf.Variable(tf.zeros([1]))
y = weights * x_data + biases

# 计算误差
loss = tf.reduce_mean(tf.square(y - y_data))

# 传播误差
optimizer = tf.train.GradientDescentOptimizer(0.5) # 步长0.5
train = optimizer.minimize(loss)

# 初始化定义的Variable
init = tf.global_variables_initializer()
# 创建会话
session = tf.Session()
session.run(init) # 执行初始化

for step in range(200):
  session.run(train)
  if step % 20 == 0:
    print(step, session.run(weights), session.run(biases))

# session
# session = tf.Session()
# result = session.run(product)
# print(result)
# session.close()

# with tf.Session() as session:
#   res = session.run(product)
#   print(res)

# 矩阵乘法
state = tf.Variable(0, name='counter') # 定义变量
matrix1 = tf.constant([[3, 3]])  # tf.constant 常量
matrix2 = tf.constant([[2],[2]])
product = tf.matmul(matrix1, matrix2) # matrix multiply
