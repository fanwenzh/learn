#coding=utf-8
from numpy import *

def loadDataSet():
    dataMat = []; labelMat = []
    fr = open('ch5/testSet.txt')
    for line in fr.readlines():
        lineArr = line.strip().split()
        dataMat.append([1.0, float(lineArr[0]), float(lineArr[1])]) # x1 = 1, x2, x3
        labelMat.append(int(lineArr[2]))
    return dataMat, labelMat

def sigmoid(inX):
    return 1.0 / (1 + exp(-inX))

# 梯度（gradient up）上升函数
def gradAscent(dataMatIn, classLabels):
    dataMatrix = mat(dataMatIn) # 转换为NumPy矩阵数据类型
    labelMat = mat(classLabels).transpose() # .T
    m, n = shape(dataMatrix)
    alpha = 0.001 # 梯度上升（下降）参数
    maxCycles = 500 # 循环（迭代）次数
    weights = ones((n, 1)) # 初始系数为1
    for k in range(maxCycles):
        h = sigmoid(dataMatrix * weights)
        error = labelMat - h # y的增量：实际类型和预测类型的差
        weights = weights + alpha * dataMatrix.transpose() * error
        # 换成梯度下降: https://blog.csdn.net/achuo/article/details/51160101
        # error = h - labelMat
        # weights = weights - alpha * dataMatrix.transpose() * error
    return weights.getA() # 返回拟合的 parameter # matrix.getA() = array(matrix) 矩阵变换为ndarray类型

def plotBestFit(weights):
    import matplotlib.pyplot as plt
    dataMat, labelMat = loadDataSet()
    dataArr = array(dataMat)
    n = shape(dataArr)[0]
    xcord1 = []; ycord1 = []
    xcord2 = []; ycord2 = []
    for i in range(n):
        if int(labelMat[i]) == 1:
            xcord1.append(dataArr[i, 1]); ycord1.append(dataArr[i, 2])
        else:
            xcord2.append(dataArr[i, 1]); ycord2.append(dataArr[i, 2])
    fig = plt.figure()
    ax = fig.add_subplot(111)
    ax.scatter(xcord1, ycord1, s = 30, c = 'red', marker = 's')
    ax.scatter(xcord2, ycord2, s = 30, c = 'blue')
    x = arange(-3.0, 3.0, 0.1) # start, end, step
    y = (-weights[0] - weights[1] * x) / weights[2] # t0 + t1x1 + t2x2 = 0 => x2 = (-t0 - t1x1) / t2
    ax.plot(x, y)
    plt.xlabel('X1'); plt.ylabel('X2')
    plt.show()

#随机梯度上升(ng课程)
def stocGradAscent0(dataMatrix, classLabels):
    m, n = shape(dataMatrix)
    alpha = 0.01
    weights = ones(n)
    for i in range(m): # 每个样本进行一次梯度下降
        h = sigmoid(sum(dataMatrix[i]) * weights)
        error = classLabels[i] - h
        weights = weights + alpha * error * dataMatrix[i] 
    return weights

# 迭代随机梯度numIter次，且a随着迭代次数增加逐渐减小，减少逼近震荡（ng课程）
def stocGradAscent1(dataMatrix, classLabels, numIter=150):
    m, n = shape(dataMatrix)
    weights = ones(n)
    for j in range(numIter):
        dataIndex = list(range(m))
        for i in range(m):
            alpha = 4 / (1.0 + j + i) + 0.01 # 4收敛效果更好？why
            randIndex = int(random.uniform(0, len(dataIndex)))
            h = sigmoid(sum(dataMatrix[randIndex] * weights))
            error = classLabels[randIndex] - h
            weights = weights + alpha * error * array(dataMatrix[randIndex])
            del(dataIndex[randIndex])
    return weights

# 测试
def classifyVector(intX, weights):
    prob = sigmoid(sum(intX * weights))
    if prob > 0.5: return 1.0
    else: return 0.0

def colicTest():
    frTrain = open('ch5/horseColicTraining.txt')
    frTest = open('ch5/horseColicTest.txt')
    trainingSet = []
    trainingLabels = []
    for line in frTrain.readlines():
        currLine = line.strip().split('\t')
        lineArr = []
        for i in range(21):
            lineArr.append(float(currLine[i]))
        trainingSet.append(lineArr)
        trainingLabels.append(float(currLine[21]))
    trainWeights = stocGradAscent1(array(trainingSet), trainingLabels, 500)
    errorCount = 0; numTestVec = 0.0
    for line in frTest.readlines():
        numTestVec += 1.0
        currLine = line.strip().split('\t')
        lineArr = []  
        for i in range(21):
            lineArr.append(float(currLine[i]))
        if int(classifyVector(array(lineArr),trainWeights)) != int(currLine[21]):
            errorCount += 1
    errorRate = (float(errorCount) / numTestVec)
    print("the error rate of this test is:%f" % errorRate)
    return errorRate    

def multiTest():
    numTests = 6; errorSum = 0.0
    for k in range(numTests):
        errorSum += colicTest()
    print("after %d iteration the average error rate is:%f" % (numTests,errorSum/float(numTests)))

# dataMat, labelMat = loadDataSet()
# weights = gradAscent(dataMat, labelMat)
# weights0 = stocGradAscent0(dataMat, labelMat)
# weights1 = stocGradAscent1(dataMat, labelMat)
# plotBestFit(weights1)

# multiTest()
