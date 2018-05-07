#coding:utf-8

from numpy import *
import operator

def createDataSet():
    group = array([[1.0,1.1],[1.0,1.0],[0,0],[0,0.1]])
    labels = ['A','A','B','B']
    return group,labels

# 从距离最近的k个点中选择出现频率最高的类别作为当前的预测分类
# dataSet 提供矩阵的行维度（行数）
def classify0(inX,dataSet,labels,k):
    dataSetSize = dataSet.shape[0] #shape读取数据矩阵第一维度的长度
    diffMat = tile(inX, (dataSetSize, 1)) - dataSet #tile重复数组inX，有dataSet行 1个dataSet列，减法计算差值
    sqDiffMat = diffMat ** 2 #**幂运算，计算欧式距离
    sqDisttances = sqDiffMat.sum(axis=1) #普通sum默认参数为axis=0为普通相加，axis=1为一行的行向量相加
    distances = sqDisttances ** 0.5 
    sortedDistIndicies = distances.argsort() #argsort返回数值从小到大的索引值（数组索引0,1,2,3）
    classCount = {}  #选择距离最小的k个点
    for i in range(k):
        label = labels[sortedDistIndicies[i]] #根据排序结果的索引值返回靠近的前k个标签
        classCount[label] = classCount.get(label, 0) + 1 #各个标签出现频数
    #sorted(iterable, cmp=None, key=None, reverse=False) --> new sorted list。
    # reverse默认升序, key关键字排序itemgetter（1）按照第一维度排序(0,1,2,3)
    sortedClassCount = sorted(classCount.items(), key=operator.itemgetter(1), reverse=True)  #频数排序
    return sortedClassCount[0][0] #返回频数最高的label

def file2matrix(filename):
    fr = open(filename)
    arrayLines = fr.readlines()
    numberOfLines = len(arrayLines)
    returnMat = zeros((numberOfLines, 3))
    classLabelVector = []
    index = 0
    for line in arrayLines:
        line = line.strip()  #删除空白符
        listFromLine = line.split('\t') #按\t字符分割字符串
        returnMat[index, :] = listFromLine[0:3] #选取前3个元素(特征)存储在返回矩阵中
        classLabelVector.append(int(listFromLine[-1])) #-1索引表示最后一列元素
        index+=1
    return returnMat,classLabelVector

def autoNorm(dataSet):
    minVals = dataSet.min(0) # .min()矩阵最小值，min(0)每列最小值，min(1)每行最小值, 都是1*n的矩阵
    maxVals = dataSet.max(0)
    ranges = maxVals - minVals
    m = dataSet.shape[0] # m行数
    normDataSet = dataSet - tile(minVals, (m,1))
    normDataSet = normDataSet/tile(ranges, (m,1)) # 点除（对应位置相除）
    return normDataSet, ranges, minVals

#测试约会网站分类结果代码
def datingClassTest():
    hoRatio = 0.10 # 通常用数据的90%作为训练样本来训练分类器，其余10%为测试数据(吴恩达:80%-20%)
    datingDataMat, datingLabels = file2matrix('datingTestSet.txt')
    normMat, ranges, minVals = autoNorm(datingDataMat)
    m = normMat.shape[0]
    numTestVecs = int(m*hoRatio)
    errorCount = 0.0
    for i in range(numTestVecs):
        classifierResult = classify0(normMat[i,:], normMat[numTestVecs:m,:],datingLabels[numTestVecs:m],3)
        print("the classifier came back with: %d, the real answer is: %d" % (classifierResult, datingLabels[i]))
        if (classifierResult != datingLabels[i]): errorCount += 1.0
    print("the total error rate is: %f" % (errorCount/float(numTestVecs)))     

#完整的约会网站预测：给定一个人，判断时候适合约会
def classifyPerson():
    resultList = ['not at all','in small doses','in large doses']
    percentTats = float(input("percentage of time spent playing video games?"))
    ffMiles = float(input("frequent flier miles earned per year?"))
    iceCream = float(input("liters of ice cream consumed per year?"))
    datingDataMat,datingLabels = file2matrix('datingTestSet.txt')
    normMat, ranges, minVals = autoNorm(datingDataMat)
    inArr = array([ffMiles,percentTats,iceCream])
    classifierResult = classify0((inArr-minVals)/ranges,normMat,datingLabels,3)
    print("You will probably like this person:", resultList[classifierResult-1])

import os, sys
def img2vector(filename):
    returnVect = zeros((1,1024)) #每个手写识别为32x32大小的二进制图像矩阵 转换为1x1024 numpy向量数组returnVect
    fr = open(filename) #打开指定文件
    for i in range(32): #循环读出前32行
        lineStr = fr.readline()
        for j in range(32):
            returnVect[0,32*i+j] = int(lineStr[j])#将每行的32个字符值存储在numpy数组中
    return returnVect
#识别测试算法
def handwritingClassTest():
    hwLabels = []
    trainingFileList = os.listdir('trainingDigits')
    m = len(trainingFileList)
    trainingMat = zeros((m, 1024)) #定义文件数x每个向量的训练集
    for i in range(m):
        fileNameStr = trainingFileList[i]
        fileStr = fileNameStr.split('.')[0] #获取文件名
        classNumStr = int(fileStr.split('_')[0]) #获取解析的数字
        hwLabels.append(classNumStr) # 存储
        trainingMat[i,:] = img2vector('trainingDigits/%s'%fileNameStr) #访问第i个文件内的数据
    # 测试数据集
    testFileList = os.listdir('testDigits')
    errorCount = 0.0
    mTest = len(testFileList)
    for i in range(mTest):
        fileNameStr = testFileList[i]
        fileStr = fileNameStr.split('.')[0]
        classNumStr = int(fileStr.split('_')[0])#从文件名中分离出数字作为基准
        vectorUnderTest = img2vector('testDigits/%s'%fileNameStr)#访问第i个文件内的测试数据，不存储类 直接测试
        classifierResult = classify0(vectorUnderTest, trainingMat, hwLabels, 3)
        print("the classifier came back with: %d,the real answer is: %d" %(classifierResult, classNumStr))
        if(classifierResult != classNumStr):
            errorCount+=1.0
    print("\nthe total number of errors is: %d" % errorCount)
    print("\nthe total rate is:%f"% (errorCount/float(mTest))) 

# handwritingClassTest()

# 图表显示
# import matplotlib
# import matplotlib.pyplot as plt
# plt.rcParams['font.sans-serif']=['SimHei'] #用来正常显示中文标签
# plt.rcParams['axes.unicode_minus']=False #用来正常显示负号
# fig = plt.figure()
# fig.suptitle("test title")
# ax = fig.add_subplot(1,1,1) # 将画布划为1行1列,ax为第一块
# # scatter(row, list, size, color)
# ax.scatter(datingDataMat[:,1], datingDataMat[:,2], 15.0*array(datingLabels), 15.0*array(datingLabels))
# plt.xlabel(u'每周消费的冰淇淋公升数')
# plt.ylabel(u'玩视频游戏所耗时间百分比')
# plt.legend(loc='upper left')
# plt.show()


