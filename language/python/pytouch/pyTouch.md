
<!-- https://zhuanlan.zhihu.com/p/25572330 -->
### what is PyTorch
```python
import torch
x = torch.Tensor(5, 3)  # 构造一个未初始化的5*3的矩阵
x = torch.rand(5, 3)  # 构造一个随机初始化的矩阵
x.size() # 矩阵大小

# 矩阵相加
torch.add(x, y) # x + y
# 输出tensor
result = torch.Tensor(5, 3)
torch.add(x, y, out=result)
y.add_(x)
# 切片
x[:,1] # 输出第二列所有值

# resize/reshape tensor # torch.view
x = torch.randn(4,4) # -1 ~ 1
y = x.view(16) 
z = x.view(-1, 8) # 

# Tensor与numpy相互转换，共享一地址
import numpy as np
a = torch.ones(5) # 5*1
b = a.numpy() # 1*5 # torch.from_numpy(a)
a.add_(1)
a = np.ones(5)
b = torch.from_numpy(a)
np.add(a, 1, out=a)

# 移动到GPU运算.cuda()
if torch.cuda.is_available():
    x = x.cuda()
    y = y.cuda()
    x + y

```

### Autograd: automatic differentiation 神经网络
```python
# 创建变量
import torch
from torch.autograd import Variable
# 非用户创建变量，y有y.grad_fn属性（创建该变量的函数）
x = Variable(torch.ones(2, 2), requires_grad=True)
y = x.mean() # 期望
out.backward() 
pritnt(x.grad) # 自动求导 d(out)/dx

# .norm  求向量或者矩阵的范数
# differentiate 微分
```


