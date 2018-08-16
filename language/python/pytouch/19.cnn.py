import os
import torch
import numpy as np
from torch.autograd import Variable
import torch.nn as nn
import torch.nn.functional as fn
import matplotlib.pyplot as plt
import torch.utils.data as Data
import torchvision      # 数据库模块

EPOCH = 1
BARCH_SIZE = 50
LR = 0.001
DOWNLOAD_MNIST = False

if not (os.path.exists('./minist/')):
  DOWNLOAD_MNIST = True

train_data = torchvision.datasets.MNIST(
    root='./mnist/',  # 保存或提取的路径
    train=True,      # 训练数据
    transform=torchvision.transforms.ToTensor(),  # transforms: 0~255 => 0~1
    download=DOWNLOAD_MNIST
)

# plot one example
# print(train_data.train_data.size())  # [60000, 28, 28]
# print(train_data.train_labels.size())  # [60000]
# plt.imshow(train_data.train_data[0].numpy(), cmap='gray')
# plt.title('%i' % train_data.train_labels[0])
# plt.show()

train_loader = Data.DataLoader(
    dataset=train_data, batch_size=BARCH_SIZE, shuffle=True, num_workers=2)

test_data = torchvision.datasets.MNIST(root='./mnist', train=False)
# shape from (2000, 28, 28) to (2000, 1, 28, 28), value in range(0,1), 遍历前transform未转换
test_x = torch.unsqueeze(test_data.test_data, dim=1).type(
    torch.FloatTensor)[:2000]/255.
test_y = test_data.test_labels[:2000]


class CNN(nn.Module):
  def __init__(self):
    super(CNN, self).__init__()
    self.conv1 = nn.Sequential(  # input shape (1, 28, 28)
        nn.Conv2d(
            in_channels=1,    # 输入高度, 图片即通道数，rgb为3
            out_channels=16,  # n_filters 数量
            kernel_size=5,    # filter 大小
            stride=1,         # filter 步长
            padding=2,        # 补充的像素长度, (kernel_size-stride)/2
        ),
        nn.ReLU(),  # activation
        nn.MaxPool2d(kernel_size=2)  # 在 2x2 空间里向下采样, output shape (16, 14, 14)
    )
    self.conv2 = nn.Sequential(  # input shape  (16, 14, 14)
        nn.Conv2d(16, 32, 5, 1, 2),
        nn.ReLU(),
        nn.MaxPool2d(2),   # output shape (32, 7, 7)
    )
    self.out = nn.Linear(32 * 7 * 7, 10)  # fully connected layer

  def forward(self, x):
    x = self.conv1(x)
    x = self.conv2(x)          # shape (32, 7, 7)
    # 展平多维的卷积图成 (batch_size, 32 * 7 * 7), size(0):x轴数量, -1展成1维
    x = x.view(x.size(0), -1)
    output = self.out(x)
    return output, x


cnn = CNN()
# print(cnn)
optimizer = torch.optim.Adam(cnn.parameters(), lr=LR)
loss_func = nn.CrossEntropyLoss()

# 可视化
from matplotlib import cm
try: from sklearn.manifold import TSNE; HAS_SK=True
except:
  HAS_SK = False
  print('Please install sklearn for layer visualization')
HAS_SK = False # 太卡了！！

def polt_with_labels(lowDWeights, labels):
  plt.cla()
  X, Y = lowDWeights[:, 0], lowDWeights[:, 1]
  for x, y, s in zip(X, Y, labels):
    c = cm.rainbow(int(255*s/9))
    plt.text(x, y, s, backgroundcolor=c, fontsize=9)
  plt.xlim(X.min(), X.max()); plt.ylim(Y.min(), Y.max()); plt.title('Visualize last layer');plt.show(); plt.pause(0.01)

for epoch in range(EPOCH):
  for step, (b_x, b_y) in enumerate(train_loader):
    # print(b_x)
    output = cnn(b_x)[0]  # [output, x]
    loss = loss_func(output, b_y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if step % 50 == 0:
      test_output, last_layer = cnn(test_x)
      pred_y = torch.max(test_output, 1)[1].data.squeeze().numpy()
      accuracy = float((pred_y == test_y.data.numpy()).astype(
          int).sum()) / float(test_y.size(0))
      print('Epoch: ', epoch, '| train loss: %.4f' % loss.data.numpy(), '| test accuracy: %.2f' % accuracy)
      if HAS_SK:
        tsne = TSNE(perplexity=30, n_components=2, init='pca', n_iter=5000)
        plot_only = 500
        low_dim_embs = tsne.fit_transform(last_layer.data.numpy()[:plot_only, :])
        labels = test_y.numpy()[:plot_only]
        polt_with_labels(low_dim_embs, labels)
plt.ioff()

test_output, _ = cnn(test_x[:10])
pred_y = torch.max(test_output, 1)[1].data.numpy().squeeze()
print(pred_y, 'prediction number')
print(test_y[:10].numpy(), 'real number')

