#coding=utf-8
# from numpy import *
import numpy as np

def loadDataSet(fileName):
    numFeat = len(open(fileName).readline().split('\t')) - 1
    dataMat = []; labelMat = []
    fr = open(fileName)
    for line in fr.readlines():
        lineArr = []
        curLine = line.strip().split('\t')
        for i in range(numFeat):
            lineArr.append(float(curLine[i]))
        dataMat.append(lineArr)
        labelMat.append(float(curLine[-1]))
    return dataMat, labelMat

def standRegres(xArr, yArr):
    xMat = np.mat(xArr); yMat = np.mat(yArr).T
    xTx = xMat.T * xMat
    if np.linalg.det(xTx) == 0.0:  #矩阵行列式|A|=0,则矩阵不可逆
        print("This matrix is singular, cannot do inverse")
        return
    ws = xTx.I * (xMat.T * yMat)
    return ws # 回归系数w

# 局部加权线性回归 LWLR
def lwlr(testPoint, xArr, yArr, k = 1.0):
    xMat = np.mat(xArr); yMat = np.mat(yArr).T
    m = np.shape(xMat)[0]
    weights = np.mat(np.eye((m)))
    for j in range(m):
        diffMat = testPoint - xMat[j, :] # 计算样本点与预测值的距离
        weights[j, j] = np.exp(diffMat * diffMat.T/ (-2*k**2)) #计算高斯核函数W
    xTx = xMat.T * (weights * xMat)
    if np.linalg.det(xTx) == 0.0: # 判断是否可逆
        print("This matrix is singular, cannot do inverse")
        return
    ws = xTx.I * (xMat.T * (weights * yMat))
    return testPoint * ws

#测试
def lwlrTest(testArr,xArr,yArr,k=1.0):  #loops over all the data points and applies lwlr to each one
    m = np.shape(testArr)[0]
    yHat = np.zeros(m)
    for i in range(m):
        yHat[i] = lwlr(testArr[i],xArr,yArr,k)
    return yHat

def rssError(yArr, yHatArr):
    return ((yArr - yHatArr)**2).sum()

# 岭回归
def ridgeRegress(xMat, yMat, lam=0.2):
    xTx = xMat.T * xMat
    demon = xTx + np.eye(np.shape(xMat)[1]) * lam
    if np.linalg.det(demon) == 0.0:
        print("This matrix is singular,cannot do inverse")
        return
    ws = demon.I * (xMat.T * yMat)
    return ws

def ridgeTest(xArr, yArr):
    xMat = np.mat(xArr); yMat = np.mat(yArr).T # 数据标准化（特征标准化处理），减去均值，除以方差
    yMean = np.mean(yMat, 0)
    yMat = yMat - yMean
    xMeans = np.mean(xMat, 0)
    xVar = np.var(xMat, 0)
    xMat = (xMat - xMeans) / xVar
    numTestPts = 30
    wMat = np.zeros((numTestPts, np.shape(xMat)[1]))
    for i in range(numTestPts):
        ws = ridgeRegress(xMat, yMat, np.exp(i - 10))
        wMat[i, :] = ws.T
    return wMat

def regularize(xMat): #regularize by columns
    inMat = xMat.copy()
    inMeans = np.mean(inMat, 0)
    inVar = np.var(inMat, 0)
    inMat = (inMat - inMeans)/inVar
    return inMat 

# 前向逐步线性回归
# @Param eps迭代步长，numIt迭代次数
def stageWise(xArr, yArr, eps = 0.01, numIt = 100):
    xMat = np.mat(xArr); yMat = np.mat(yArr).T
    yMean = np.mean(yMat, 0)
    yMat = yMat - yMean
    xMat = regularize(xMat)
    m, n = np.shape(xMat)
    returnMat = np.zeros((numIt, n))
    ws = np.zeros((n, 1)); wsTest = ws.copy(); wsMax = ws.copy()
    for i in range(numIt):
        print(ws.T)
        lowestError = np.inf
        for j in range(n):
            for sign in [-1, 1]:
                wsTest = ws.copy()
                wsTest[j] += eps * sign
                yTest = xMat * wsTest
                rssE = rssError(yMat.A, yTest.A) # 平方误差
                if rssE < lowestError:
                    lowestError = rssE
                    wsMax = wsTest
        ws = wsMax.copy()
        returnMat[i, :] = ws.T
    return returnMat

# 线性回归
# xArr, yArr = loadDataSet('ch8/ex0.txt')
# xMat = mat(xArr)
# yMat = mat(yArr)
# ws = standRegres(xMat, yMat)
# import matplotlib.pyplot as plt
# fig = plt.figure()
# ax = fig.add_subplot(111)
# ax.scatter(xMat[:,1].flatten().A[0], yMat.T[:,0].flatten().A[0])
# xCopy = xMat.copy()
# xCopy.sort(0)
# yHat = xCopy * ws
# ax.plot(xCopy[:,1], yHat)
# plt.show()

# 相关系数
# yHat = xMat * ws
# corr = corrcoef(yHat.T, yMat)
# print(corr)

# 局部加权线性回归
# yHat = lwlrTest(xArr, xArr, yArr, 0.003)
# xMat = mat(xArr)
# srtInd = xMat[:, 1].argsort(0)
# xSort = xMat[srtInd][:, 0, :]
# import matplotlib.pyplot as plt
# fig = plt.figure()
# ax = fig.add_subplot(111)
# ax.plot(xSort[:, 1], yHat[srtInd])
# ax.scatter(xMat[:, 1].flatten().A[0], mat(yArr).T.flatten().A[0], s=2, c='red')
# plt.show()

# abX, abY = loadDataSet('ch8/abalone.txt')
# abY = np.array(abY)
# yHat01 = lwlrTest(abX[0:99], abX[0:99], abY[0:99], 0.1)
# res = rssError(abY[0:99], yHat01.T)
# print('rssError', res)
# yHat1 = lwlrTest(abX[0:99], abX[0:99], abY[0:99], 1)
# res = rssError(abY[0:99], yHat1.T)
# print('rssError', res)
# yHat10 = lwlrTest(abX[0:99], abX[0:99], abY[0:99], 10)
# res = rssError(abY[0:99], yHat10.T)
# print('rssError', res)

# 岭回归
# abX, abY = loadDataSet('ch8/abalone.txt')
# ridegeWeights = ridgeTest(abX, abY)
# import matplotlib.pyplot as plt
# fig = plt.figure()
# ax = fig.add_subplot(111)
# ax.plot(ridegeWeights)
# plt.show()


