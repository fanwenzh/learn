import os
import torch
import numpy as np
from torch.autograd import Variable
import torch.nn as nn
import torch.nn.functional as fn
import matplotlib.pyplot as plt
import torch.utils.data as Data
import torchvision      # 数据库模块

# hyper parameters
EPOCH = 1
BARCH_SIZE = 64
TIME_STEP = 28           # image height
INPUT_SIZE = 28          # image width
LR = 0.01
DOWNLOAD_MNIST = False

if not (os.path.exists('./minist/')):
  DOWNLOAD_MNIST = True

train_data = torchvision.datasets.MNIST(
    root='./mnist/',  # 保存或提取的路径
    train=True,      # 训练数据
    transform=torchvision.transforms.ToTensor(),  # transforms: 0~255 => 0~1
    download=DOWNLOAD_MNIST
)
test_data = torchvision.datasets.MNIST(root="./mnist", train=False, transform=torchvision.transforms.ToTensor())
train_loader = torch.utils.data.DataLoader(dataset=train_data, batch_size=BARCH_SIZE, shuffle=True)
test_x = test_data.test_data.type(torch.FloatTensor)[:2000]/255
test_y = test_data.test_labels.numpy().squeeze()[:2000]

class RNN(nn.Module):
  def __init__(self):
    super(RNN, self).__init__()

    self.rnn = nn.LSTM( # nn.RNN
      input_size=INPUT_SIZE,  # 每次输入量:图片每行的像素点
      hidden_size=64,         # hidden unit
      num_layers=1,           # 层数
      batch_first=True,       # (batch, time_step, input) 输入控制
    )
    self.out = nn.Linear(64, 10) # 输出层

  def forward(self, x):
    # x shape (batch, time_step, input_size)
    # r_out shape (batch, time_step, output_size)
    # RNN:  只有一个hidden state 
    # h_n shape (n_layers, batch, hidden_size)   LSTM 有两个 hidden states, h_n 是分线, h_c 是主线
    # h_c shape (n_layers, batch, hidden_size)
    r_out, (h_n, h_c) = self.rnn(x, None) # None: 初始化没有hidden state
    out = self.out(r_out[:, -1, :])  # r_out的(batch, time_step, output_size) 最后一个输出, 即h_n
    return out

rnn = RNN()
# print(rnn)

optimizer = torch.optim.Adam(rnn.parameters(), lr=LR)
loss_func = nn.CrossEntropyLoss() 

for epoch in range(EPOCH):
  for step, (x, b_y) in enumerate(train_loader):  # gives batch data
    b_x = x.view(-1, 28, 28)  # reshape x to (batch, time_step, input_size)

    output = rnn(b_x)
    loss = loss_func(output, b_y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if step % 50 == 0:
      test_output = rnn(test_x)
      pred_y = torch.max(test_output, 1)[1].data.numpy().squeeze()
      accuracy = float((pred_y == test_y).astype(int).sum()) / float(test_y.size)
      print('Epoch: ', epoch, '| train loss: %.4f' % loss.data.numpy(), '| test accuracy: %.2f' % accuracy)

test_output = rnn(test_x[:10].view(-1, 28, 28))
pred_y = torch.max(test_output, 1)[1].data.numpy().squeeze()
print(pred_y, 'prediction number')
print(test_y[:10], 'real number')


