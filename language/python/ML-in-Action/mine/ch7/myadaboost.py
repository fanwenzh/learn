#coding=utf-8

from numpy import *
import matplotlib.pyplot as plt

def loadSimpData():
    datMat = matrix([[ 1. ,  2.1],
        [ 2. ,  1.1],
        [ 1.3,  1. ],
        [ 1. ,  1. ],
        [ 2. ,  1. ]])
    classLabels = [1.0, 1.0, -1.0, -1.0, 1.0]
    return datMat, classLabels

# 对数据进行分类
def stumpClassify(dataMatrix, dimen, threshVal, threshIneq): # just classify the data
    retArray = ones((shape(dataMatrix)[0], 1))
    if threshIneq == 'lt':
        retArray[dataMatrix[:, dimen] <= threshVal] = -1.0
    else:
        retArray[dataMatrix[:, dimen] > threshVal] = -1.0
    return retArray

# 单层决策树生成函数
# https://blog.csdn.net/u011551096/article/details/51115119
# @return 以第i个特征划分, 小于或大于(bestClasEst)阙值(threshVal)得单层决策树
def buildStump(dataArr, classLabels, D):
    dataMatrix = mat(dataArr); labelMat = mat(classLabels).T
    m, n = shape(dataMatrix)
    numSteps = 10.0; bestStump = {}; bestClasEst = mat(zeros((m,1)))
    minError = inf # 最小错误率， 开始初始化为无穷大
    for i in range(n): # 维度，即第i个特征
        rangeMin = dataMatrix[:,i].min(); rangeMax = dataMatrix[:,i].max() # 第i列最小值和最大值
        stepSize = (rangeMax - rangeMin) / numSteps
        for j in range(-1, int(numSteps) + 1): # 遍历不同步长时的情况
            threshVal = (rangeMin + float(j) * stepSize) # 设置阈值，寻找最佳划分
            for inequal in ['lt', 'gt']: # 大于/小于阈值 切换遍历
                predictedVals = stumpClassify(dataMatrix, i, threshVal, inequal) # 分类预测
                errArr = mat(ones((m, 1))) # 初始化全部为1（初始化为全部不相等）
                errArr[predictedVals == labelMat] = 0 #预测与label相等则为0，否则为1 # predictedVals和labelMat位置一项的元素相等，则置errArr相应的位置为一
                # 分类器与adaBoost交互
                # 权重向量×错误向量=计算权重误差（加权错误率）
                weightedError = D.T * errArr
                # print("split: dim %d, thresh %.2f, thresh ineqal: %s, the weighted error us %.3f" %(i, threshVal, inequal, weightedError))
                if weightedError < minError:
                    minError = weightedError #保存当前最小的错误率
                    bestClasEst = predictedVals.copy()  #预测类别
                    #保存该单层决策树
                    bestStump['dim'] = i
                    bestStump['thresh'] = threshVal
                    bestStump['ineq'] = inequal
    return bestStump, minError, bestClasEst  #返回字典，错误率和类别估计

# 完整adaboost算法
# https://wizardforcel.gitbooks.io/dm-algo-top10/content/adaboost.html
def adaBoostTrainDS(dataArr, classLabels, numIt = 40): #numIt 用户设置的迭代次数
    weakClassArr = []
    m = shape(dataArr)[0] # m表示数组行数
    D = mat(ones((m, 1)) / m)
    aggClassEst = mat(zeros((m, 1))) # 记录每个数据点的类别估计累计值
    for i in range(numIt):
        # 建立一个单层决策树，输入初始权重D
        bestStump, error, classEst = buildStump(dataArr, classLabels, D)
        print ("D:",D.T)
        # alpha表示本次输出结果权重
        alpha = float(0.5 * log((1.0 - error)/max(error, 1e-16)))#1e-16防止零溢出
        bestStump['alpha'] = alpha  #alpha加入字典
        weakClassArr.append(bestStump)     #字典加入列表
        print ("classEst: ", classEst.T)
        # 计算下次迭代的新权重D # multiply = .* 数组对应元素相乘
        ### -1 避免负值元素相乘分类label变化
        expon = multiply(-1 * alpha * mat(classLabels).T, classEst)
        D = multiply(D,exp(expon))
        D = D/D.sum()
        # 计算累加错误率
        aggClassEst += alpha * classEst
        print ("aggClassEst: ", aggClassEst.T)
        #计算错误率，aggClassEst本身是浮点数，需要通过sign来得到二分类结果
        aggErrors = multiply(sign(aggClassEst) != mat(classLabels).T, ones((m,1)))
        errorRate = aggErrors.sum() / m
        print ("total error: ", errorRate)
        if errorRate == 0.0: break#错误率为0时 停止迭代
    return weakClassArr, aggClassEst

# 测试adaboost
def adaClassify(datToClass, classifierArr):
    dataMatrix = mat(datToClass) # 待分类样例转换成numpy矩阵
    m = shape(dataMatrix)[0]
    aggClassEst = mat(zeros((m, 1)))
    print(len(classifierArr))
    for i in range(len(classifierArr)):
        classEst = stumpClassify(dataMatrix,\
                                 classifierArr[i]['dim'],\
                                 classifierArr[i]['thresh'],\
                                 classifierArr[i]['ineq'])
        #累加类别估计值
        aggClassEst += classifierArr[i]['alpha'] * classEst
        print (aggClassEst) #输出每次迭代侯变化的结果
    return sign(aggClassEst) #返回分类结果，大于0返回1，小于0返回-1       

#在难数据集上应用
#自适应数据加载函数
def loadDataSet(fileName):
    numFeat = len(open(fileName).readline().split('\t')) #get number of fields
    dataMat = []; labelMat = []
    fr = open(fileName)
    for line in fr.readlines():
        lineArr =[]
        curLine = line.strip().split('\t')
        for i in range(numFeat-1):
            lineArr.append(float(curLine[i]))
        dataMat.append(lineArr)
        labelMat.append(float(curLine[-1]))
    return dataMat,labelMat

# 描绘ROC曲线
# https://zh.wikipedia.org/wiki/ROC%E6%9B%B2%E7%BA%BF
def plotROC(predStrengths, classLabels):
    import matplotlib.pyplot as plt
    cur = (1.0, 1.0) 
    ySum = 0.0
    numPosClas = sum(array(classLabels) == 1.0)
    yStep = 1/float(numPosClas); xStep = 1/float(len(classLabels) - numPosClas)
    sortedIndicies = predStrengths.argsort()
    fig = plt.figure()
    fig.clf()
    ax = plt.subplot(111)
    for index in sortedIndicies.tolist()[0]:
        if classLabels[index] == 1.0:
            delX = 0; delY = yStep
        else:
            delX = xStep; delY = 0
            ySum += cur[1]
        ax.plot([cur[0], cur[0] - delX], [cur[1], cur[1] - delY], c = 'b')
        cur = (cur[0] - delX, cur[1] - delY)
    ax.plot([0,1], [0,1], 'b--')
    plt.xlabel('False positive Rate'); plt.ylabel('True Positive Rate')
    ax.axis([0,1,0,1])
    plt.show()
    print ("the Area Under the Curve is: ",ySum*xStep)

# 完整adaboost算法测试
# datMat, classLabels = loadSimpData()
# D = mat(ones((5, 1))/5)              
# bestStump, minError, bestClasEst = buildStump(datMat, classLabels, D)
# print(bestStump, minError, bestClasEst)
# classifierArray, aggClassEst = adaBoostTrainDS(datMat, classLabels, 30)
# res = adaClassify([[5,5],[0,0]], classifierArray)
# print('res:', res)

# 在难数据集上应用
# datArr, labelArr = loadDataSet("ch5/horseColicTest.txt")
# classifierArray, aggClassEst = adaBoostTrainDS(datArr, labelArr, 20)
# prediction = adaClassify(datArr, classifierArray)
# plotROC(aggClassEst.T, labelArr)

# a = ones((5,1))
# a[2][0] = 0
# b = ones((5,1))
# arr = zeros((5,1))
# arr[a == b] = 1
# print(arr)
