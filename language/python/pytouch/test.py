import os
import torch
import numpy as np
from torch.autograd import Variable
import torch.nn as nn
import torch.nn.functional as fn
import matplotlib.pyplot as plt
import torch.utils.data as Data
import torchvision      # 数据库模块

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
# loss_func = torch.nn.MSELoss() # MSE: mean squre error均方差，回归问题
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
# data  = torch.ones(100, 2) 
# x0 = torch.normal(2*data, 1) # normal(mean, std)的正太分布
# y0 = torch.zeros(100)
# x1 = torch.normal(-2*data, 1)
# y1 = torch.ones(100)

# #  合并数据
# x = torch.cat((x0, x1), 0).type(torch.FloatTensor) # 32bit float, 默认axis=0 (纵向)合并
# y = torch.cat((y0, y1), ).type(torch.LongTensor) # 64bit integer

# x, y = Variable(x), Variable(y)

# # plt.scatter(x.data.numpy()[:, 0], x.data.numpy()[:, 1], c=y.data.numpy(), s=100, lw=0, cmap='RdYlGn')
# # plt.show()

# class Net(torch.nn.Module):
#   def __init__(self, n_feature, n_hidden, n_output):
#     super(Net, self).__init__()
#     self.hidden = torch.nn.Linear(n_feature, n_hidden)
#     self.predict = torch.nn.Linear(n_hidden, n_output)
  
#   def forward(self, x):
#     x = fn.relu(self.hidden(x))
#     x = self.predict(x)
#     return x

# net = Net(2, 10, 2)
# plt.ion()
# optimizer = torch.optim.SGD(net.parameters(), lr=0.02)
# loss_func = torch.nn.CrossEntropyLoss()  # 交叉熵损失, 类似[0,0,0,1,0]，分类问题
# for t in range(10):
#   out = net(x)
#   loss = loss_func(out, y)
#   optimizer.zero_grad()
#   loss.backward()
#   optimizer.step()

#   if t%2 == 0:
#     plt.cla()
#     # res = torch.max(input, dim) # dim: 0纵向, 1横向 
#     # res[0]:最大值, res[1]:最大值索引, res[1].data 只返回variable中的数据部分（去掉Variable containing:）
#     # res[1].data.numpy().squeeze() 把数据条目中维度为1 的删除掉
#     prediction = torch.max(fn.softmax(out), 1)[1] # softmax转换为类别概率
#     pred_y = prediction.data.numpy().squeeze()
#     target_y = y.data.numpy()
#     plt.scatter(x.data.numpy()[:, 0], x.data.numpy()[:, 1], c=pred_y, s=100, cmap='RdYlGn')
#     accuracy = sum(pred_y == target_y)/200
#     plt.text(1.5, -4, 'Accuracy=%.2f' % accuracy, fontdict={'size': 20, 'color': 'red'})
#     plt.pause(0.1)
# plt.ioff()
# plt.show()

# 13 快速搭建神经网络
# net = torch.nn.Sequential(
#   torch.nn.Linear(1, 10),
#   torch.nn.ReLU(),
#   torch.nn.Linear(10, 1)
# )

# 14 保存提取
# torch.save(net1, 'net.pkl') # 保存整个网络
# torch.save(net1.state_dict(), 'net_params.pkl') # 只保存网络中的参数
# # 提取整个网络
# net2 = torch.load('net.pkl')
# prediction = net2(x) # 网络的使用
# # 提取网络参数
# net3.load_state_dict(torch.load('net_params.pkl')) # 从建立的网络net3中读取参数
# prediction = net3(x) # 网络的使用

# 15 批数据训练
# BATCH_SIZE = 5 # 每次训练5个数据
# x = torch.linspace(1, 10, 10)
# y = torch.linspace(10, 1, 10)

# torch_dataset = Data.TensorDataset(data_tensor=x, target_tensor=y)
# loader = Data.DataLoader(
#   dataest=torch_dataset,
#   batch_size=BATCH_SIZE,
#   shuffle=True,
#   num_workers=2
# )

# for epoch in range(3):  # 训练所有所有数据 3 次
#   for step, (batch_x, batch_y) in enumerate(loader):  # 每一步 loader 释放一小批数据用来学习
#     # trainning
#     print('Epoch: ', epoch, '| Step: ', step, '| batch x: ',batch_x.numpy(), '| batch y: ', batch_y.numpy())

# 16 优化神经网络
# stochastic gradient descent(SGD)
# momentum: w += (b1*m - learningRate*dx) # 梯度乘以bi - 学习速度*dx的矫正 
# adaGrad: w += -learningRate*dx/(dx^2)
# RMSProp: 
# Adam: momentum + adaGrad

# 17 Optimizer优化器
# hyper parameters
# LR = 0.01
# opt_SGD = torch.optim.SGD(net_SGD.parameters(), lr=LR)
# opt_Momentum = torch.optim.SGD(net_Momentum.parameters(), lr=LR, momentum=0.8)
# opt_RMSprop = torch.optim.RMSprop(net_RMSprop.parameters(), lr=LR, alpha=0.9)
# opt_Adam = torch.optim.Adam(net_Adam.parameters(), lr=LR, betas=(0.9, 0.99))

# 19 卷积神经网络 CNN(Convolutional Neural Network)
# 19.nn

# 20.RNN 
# Recurrent Neeural Network: 循环神经网络
# LSTM RNN: long-short term memory 