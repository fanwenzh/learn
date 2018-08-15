import torch
import numpy as np
from torch.autograd import Variable
import torch.nn.functional as fn
import matplotlib.pyplot as plt

# 相互转换
# np_data = np.arange(6).reshape((2,3))
# torch_data = torch.from_numpy(np_data)
# tensor2array = torch_data.numpy()
# print(
#   '\nnumpy', np_data,
#   '\ntorch', torch_data,
#   '\ntensor2arrau', tensor2array
# )

# 运算
# https: // pytorch.org/docs/stable/torch.html#math-operations
# data = [[-1, 2], [1, -2]]
# tensor = torch.FloatTensor(data) # 32-bit floating point
# data = np.array(data)
# print(
#     # 矩阵相乘运算
#     '\nnumpy', np.dot(data, data),
#     '\ntorch', torch.mm(tensor, tensor) 
# )

## 8 Variable(0.4版本后与tensor整合)
# tensor = torch.FloatTensor([[1,2], [3,4]])
# var = Variable(tensor, requires_grad=True)  # 是否在反向传播过程中对该节点求梯度

# t_out = torch.mean(tensor * tensor) # x^2
# v_out = torch.mean(var * var)

# print(t_out, v_out)
# v_out.backward() # 反向传递
# # v_out = 1/4*sum(var*var)
# # d(v_out)/d(var) = 1/4*2*variable = variable/2 
# print(var.grad, var.data) # var.data: Tensor

# 9 激励函数Activation function
# sigmoid, relu, tanh, softplus(可微分用于反向传播)
# x = torch.linspace(-5, 5, 200)
# x = Variable(x)
# x_np = x.data.numpy()

# y_relu = fn.relu(x).data.numpy()
# y_sigmoid = fn.sigmoid(x).data.numpy()
# y_tanh = fn.tanh(x).data.numpy()
# y_softplus = fn.softplus(x).data.numpy()

# plt.figure(1, figsize=(8, 6))
# plt.subplot(221)
# plt.plot(x_np, y_relu, c='red', label='relu')
# plt.ylim((-1, 5))
# plt.legend(loc='best')

# plt.subplot(222)
# plt.plot(x_np, y_sigmoid, c='red', label='sigmoid')
# plt.ylim((-0.2, 1.2))
# plt.legend(loc='best')

# plt.subplot(223)
# plt.plot(x_np, y_tanh, c='red', label='tanh')
# plt.ylim((-1.2, 1.2))
# plt.legend(loc='best')

# plt.subplot(224)
# plt.plot(x_np, y_softplus, c='red', label='softplus')
# plt.ylim((-0.2, 6))
# plt.legend(loc='best')
# plt.show()

## 11. 回归
# x = torch.unsqueeze(torch.linspace(-1, 1, 100), dim=1)  # upsqueeze 转换为2维数据
# y = x.pow(2) + 0.2*torch.rand(x.size()) # 加噪音
# x, y = Variable(x), Variable(y)
# # plt.scatter(x.data.numpy(), y.data.numpy())
# # plt.show()

# class Net(torch.nn.Module):
#   def __init__(self, n_feature, n_hidden, n_output):
#     super(Net, self).__init__()
#     self.hidden = torch.nn.Linear(n_feature, n_hidden)
#     self.predict = torch.nn.Linear(n_hidden, n_output)
#     pass

#   def forward(self, x):
#     x = fn.relu(self.hidden(x))
#     x = self.predict(x)
#     return x
  
# net = Net(1, 10, 1)
# print(net)

# plt.ion() # 实时打印

# optimizer = torch.optim.SGD(net.parameters(), lr=0.5) # learning rate: 步长
# loss_func = torch.nn.MSELoss() # MSE: 均方差
# for t in range(100):
#   prediction = net(x)
#   loss = loss_func(prediction, y)

#   optimizer.zero_grad() # 梯度降为0
#   loss.backward() # 反向传递，计算梯度
#   optimizer.step() # 以lr为步长，更新net的parameters

#   if t%5 ==0:
#     plt.cla()
#     plt.scatter(x.data.numpy(), y.data.numpy())
#     plt.plot(x.data.numpy(), prediction.data.numpy(), 'r-', lw=5)
#     plt.text(0.5, 0, 'Loss=%.4f' % loss.data[0], fontdict={'size': 20, 'color': 'red'})
#     plt.pause(0.1)

# plt.ioff()
# plt.show()

# 12 分类
data  = torch.ones(100, 2) 
x0 = torch.normal(2*data, 1) # normal(mean, std)的正太分布
y0 = torch.zeros(100)
x1 = torch.normal(-2*data, 1)
y1 = torch.ones(100)

#  合并数据
