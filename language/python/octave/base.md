```python
pinv(x) # 逆
eye(5) # 矩阵I，identity maxrix
x' # 转置
1 ~= 2 # 不等于!= 
% 注释
disp(a) #输出a
sprintf('2 decimals: %0.2f', a) # 输出两位小数
format long # 长整型
v = 1:0.1:2 # 从1开始，0.1递增，直到2
ones(1,3) # 1行3列
zeros(1,3)
rand(3,3) # 0 < a < 1
randn(1,3) # -1 < a < 1
sqrt(n) # 开平方
hist(w, 50) # 直方图 划分50等分
help fun # 查看fun
size(A) # size(A, 1) 返回行(第一个元素)
length(A) # size
pwd # 当前位置
ls # 列出当前文件

load fileName # 读取文件 or load('fileName')
who # 当前存在的变量
whos # 变量 及 详情
clear variable # 释放资源 clear # 删除所有
var(1:10) # var 变量的1至10行
save fileName.mat v # 保存v变量为fileName : save hello.txt v -ascii
A(1,2) # A(:,2) # 元素选择
A(:,2) = [10;11;12] # 赋值
A=[A,[1,9,9]] # 添加列
A(:) # A变成一列
C =[A B] # C = [A, B] and C = [A; B] 

# 运算
A * B
A .* B # Aij * Bij # B是1*n向量时为()列相乘
A .^2 # Aij元素的值平方
1 ./ A # 1除以Aij
log(A), exp(A), abs(v), -v
v + ones(length(v), 1) # v所有元素加1， v + 1
A' # A 的转置
[val, index] = max(A) # min 
A < 3 # 1 or 0 matrix
[row, col] = find(A < 3) # 返回小于3的元素的index
A = magic(3)
sum(A)
sum(A, 1) # 列和
sum(A, 2) # 行和
sum(sum(A .*eye(9))) # A矩阵对角和
prod(A) # a乘积
floor(a) # 舍小数
ceil(a) # up小数
max(A, B)
max(A,[],1) # A 与 [] 每列最大的数(1：列维度)
max(A,[],2) # A 与 [] 每行最大的数(1：行维度)

max(A) # 每列最大值
max(max(A)) # A矩阵最大值 max(A(:)), A化为vector
flipud(A) # A对角变换

# 作图
polt(x, y) # x为取值, y为函数
hold on # 保存图像
xlabel('string')
ylabel('string')
legend('str1', 'str2') # 标识
title('string')
print -dpng 'myPlog.png' # 输出作图文件
close # 关闭作图
figure(1); plog(t,y1)
figure(2); plog(t,t2)
subplot(1,2,1) # 同时作多图 1*2 的第1幅图
axis([xstart xend ystart yend])
clf # 清除图像
imagesc(A) # 以A中数值给图像上色
```

### constrol statement
```python
# for 1-10
v = zeros(10, 1)
for i=1:10,
	v(i) = 2^i;
end;
indices=1:10 # 1-10
# while, end
while i <=5,
	v(i)=100
	if i == 6,
		break;
	elseif i ==7,
		disp('7')
	elseif
		disp('8')
	end;
	i=i+1;
end;

# exit, quit
# function定义
function y = functionName(x)
y = x^2
function [y1, y2] = functionName1(x)
y1 = x^2
y3 = x^3
# 使用函数
functionName(5) 
addpath('str') # 添加默认读取路径

# 梯度下降Octive,R > 2
options = optimset('GradObj', 'on', 'MaxIter', '100')
initialTheta = zeros(2,1)
[optTheta, functionVal, exitFlag] = fminunc(@costFunction, initialTheta, options) # @ 指向代价函数

# 反向传播应用
thetaVector = [ Theta1(:); Theta2(:); Theta3(:); ]
deltaVector = [ D1(:); D2(:); D3(:) ]
Theta1 = reshape(thetaVector(1:110),10,11)
Theta2 = reshape(thetaVector(111:220),10,11)
Theta3 = reshape(thetaVector(221:231),1,11)
```
