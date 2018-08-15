import torch
from torch.autograd import Variable
import torch.nn as nn
import numpy as np 

class NeuralNetwork(nn.Module):
  def __init__(self, inodes, hnodes, onodes, learning_rate):
    super().__init__()
    self.inodes = inodes
    self.hnodes = hnodes
    self.onodes = onodes
    self.lr = learning_rate
    
    # 设置权重
    self.linear_ih = nn.Linear(inodes, hnodes, bias=False)
    self.linear_ho = nn.Linear(hnodes, onodes, bias=False)

    self.activation = nn.Sigmoid()
    self.error_function = nn.MSELoss(size_average=False)
    # SGD: stochastic gradient descent 随机梯度下降 
    self.optimiser = torch.optim.SGD(self.parameters(), self.lr)
    pass
  
  def forward(self, inputs_list):
    # gpu计算
    #  inputs = Variable(torch.cuda.FloatTensor(inputs_list).view(1, self.inodes))
    inputs = Variable(torch.FloatTensor(inputs_list).view(1, self.inodes))

    hidden_inputs = self.linear_ih(inputs)
    hidden_outputs = self.activation(hidden_inputs)
    final_inputs = self.linear_ho(hidden_outputs)
    final_ouputs = self.activation(final_inputs)
    return final_ouputs

  def train(self, input_list, targets_list):
    out_put = self.forward(input_list)


    # target_variable = Variable(torch.cuda.FloatTensor(targets_list).view(1, self.onodes), requires_grad=False)
    target_variable = Variable(torch.FloatTensor(targets_list).view(1, self.onodes))
    loss = self.error_function(out_put, target_variable)
    # print('Calculate error： ', loss.data[0])

    self.optimiser.zero_grad() # 将模型中梯度参数设为0
    loss.backward() # 反向传播
    self.optimiser.step() # 更新权重
    pass
  pass


# 初始化
input_nodes = 784  # 24*24
hidden_nodes = 200  # >100
outputnodes = 10
learningrate = 0.01
n = NeuralNetwork(input_nodes, hidden_nodes, outputnodes, learningrate)
# 是否能使用cuda模块, 即GPU
if torch.cuda.is_available():
  n.cuda()

# 读取训练数据
training_data_file = open('./mnist_dataset/mnist_train_100.csv', 'r')
training_data_list = training_data_file.readlines()
training_data_file.close()

# 循环训练次数:欠拟合-过拟合
epochs = 10
for e in range(epochs):
  for record in training_data_list:
    all_values = record.split(',')
    inputs = (np.asfarray(all_values[1:])/255.0 * 0.99) + 0.01
    targets = np.zeros(outputnodes) + 0.01
    targets[int(all_values[0])] = 0.99
    n.train(inputs, targets)

    # 逆时针旋转10度
    # inputs_plusx_img = scipy.ndimage.interpolation.rotate(inputs.reshape(28, 28), 10, cval=0.01, order=1, reshape=False)
    # n.train(inputs_plusx_img.reshape(784), targets)
    # 顺时针旋转10度
    # inputs_minusx_img = scipy.ndimage.interpolation.rotate(inputs.reshape(28, 28), -10, cval=0.01, order=1, reshape=False)
    # n.train(inputs_minusx_img.reshape(784), targets)
    pass
  pass

# 读取测试数据
tast_data_file = open('./mnist_dataset/mnist_test_10.csv', 'r')
test_data_list = tast_data_file.readlines()
tast_data_file.close()

scorecard = []
for record in test_data_list:
  all_values = record.split(',')
  correct_label = int(all_values[0])
  inputs = (np.asfarray(all_values[1:])/255.0 * 0.99) + 0.01
  outputs = n.forward(inputs)
  m, label = outputs.max(1)
  if label.data[0] == correct_label:
    scorecard.append(1)
  else:
    scorecard.append(0)
  pass

scorecard_array = np.asarray(scorecard)
print(scorecard_array.sum()/scorecard_array.size)
