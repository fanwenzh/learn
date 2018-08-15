import numpy as np
import scipy.special
import scipy.ndimage

# 三层神经网络
class neuralNetwork:
  def __init__(self, inputnodes, hiddennodes, outputnodes, learningrate):
    self.inodes = inputnodes
    self.hnodes  = hiddennodes
    self.onodes = outputnodes

    # 初始化权重矩阵, 初始化规则:1/输入节点的开根号
    self.wih = np.random.normal(0.0, pow(self.inodes, -0.5), (self.hnodes, self.inodes))
    self.who = np.random.normal(0.0, pow(self.hnodes, -0.5), (self.onodes, self.hnodes))
    # 学习速率
    self.lr = learningrate
    # 激励函数
    self.activation_function = lambda x: scipy.special.expit(x)
    pass
  
  def train(self, input_list, tragets_list):
    inputs = np.array(input_list, ndmin=2).T
    targets = np.array(tragets_list, ndmin=2).T

    hidden_inputs = np.dot(self.wih, inputs)
    hidden_outputs = self.activation_function(hidden_inputs)
    final_inputs = np.dot(self.who, hidden_outputs)
    final_outputs = self.activation_function(final_inputs)
    output_error = targets - final_outputs
    hidden_error = np.dot(self.who.T, output_error) 

    self.who += self.lr * np.dot(output_error*final_outputs*(1-final_outputs), hidden_outputs.T)
    self.wih += self.lr * np.dot(hidden_error*hidden_outputs*(1-hidden_outputs), inputs.T)

    pass

  def query(self, input_list):
    inputs = np.array(input_list, ndmin=2).T
    hidden_inputs = np.dot(self.wih, inputs)
    hidden_outputs = self.activation_function(hidden_inputs)
    final_inputs = np.dot(self.who, hidden_outputs)
    final_outputs = self.activation_function(final_inputs)
    return final_outputs
  pass

# 初始化
input_nodes= 784 # 24*24
hidden_nodes = 200 # >100
outputnodes = 10
learningrate = 0.01
n = neuralNetwork(input_nodes, hidden_nodes, outputnodes, learningrate)

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
  outputs = n.query(inputs)
  label = np.argmax(outputs)
  if label == correct_label:
    scorecard.append(1)
  else:
    scorecard.append(0)
  pass

scorecard_array = np.asarray(scorecard)
print(scorecard_array.sum()/scorecard_array.size)
