#coding=utf-8
from math import log
import operator
import matplotlib.pyplot as plt

def createDataSet():
    dataSet = [[1, 1, 'yes'],
               [1, 1, 'yes'],
               [1, 0, 'no'],
               [0, 1, 'no'],
               [0, 1, 'no']]
    labels = ['no surfacing','flippers']
    return dataSet, labels

#计算香农熵 度量数据集无序程度
def calcShannonEnt(dataSet):
    numEntries = len(dataSet)
    labelCounts = {}
    for fearVec in dataSet:
        currentLabel = fearVec[-1]  #取最后一列键值 记录当前类别出现次数
        if currentLabel not in labelCounts.keys():
             labelCounts[currentLabel] = 0
        labelCounts[currentLabel] += 1
    shannonEnt = 0.0
    for key in labelCounts:
        prob = float(labelCounts[key])/numEntries # 该类别的概率
        shannonEnt -= prob*log(prob, 2) #计算香农熵
    return shannonEnt

#划分数据集
#数据集、特征index、特征值
def splitDataSet(dataSet, axis, value):#待划分的数据集 数据集特征 需要返回的特征值
    retDataSet = []
    for featVec in dataSet:
        if featVec[axis] == value:
             reducedFeatVec = featVec[:axis]  # chop out axis used for splitting
             reducedFeatVec.extend(featVec[axis + 1:])#extend方法是讲添加元素融入集合
             retDataSet.append(reducedFeatVec)#append将添加元素作为一个元素加入
    return retDataSet

#选择最好的数据集划分
def chooseBestFeatureToSplit(dataSet):
    numFeatures = len(dataSet[0]) - 1
    baseEntropy = calcShannonEnt(dataSet) # 基础香农熵
    bestInfoGain = 0.0
    bestFeature = -1
    for i in range(numFeatures):
        featList = [example[i] for example in dataSet] #使用列表推导来创建新的列表
        uniqueVals = set(featList) #python的集合set数据类型保存，从列表中创建集合来获取列表中的唯一元素值
        newEntropy = 0.0
        for value in uniqueVals: # 计算每种划分的信息熵
            subDataSet = splitDataSet(dataSet, i, value)
            prob = len(subDataSet) / float(len(dataSet))
            newEntropy += prob * calcShannonEnt(subDataSet) 
        infoGain = baseEntropy - newEntropy # 信息增益
        if (infoGain > bestInfoGain): # 保存熵值最大的feature
            bestInfoGain = infoGain
            bestFeature = i
    return bestFeature

#确定决策树叶子节点的分类
def majorityCnt(classList):
    classCount={}
    for vote in classList:
        if vote not in classCount.keys(): classCount[vote] = 0
        classCount[vote] += 1
    sortedClassCount = sorted(classCount.items(), key = operator.itemgetter(1), reverse=True)
    return sortedClassCount[0][0]

def createTree(dataSet, labels):
    classList = [example[-1] for example in dataSet]
    if classList.count(classList[0]) == len(classList): # 类别相同，停止划分
        return classList[0] 
    if len(dataSet[0]) == 1: # 使用完了所有的特征 ?? 待考虑
        return majorityCnt(classList) # 返回出现次数最多的特征
    # 创建树
    bestFeatIndex = chooseBestFeatureToSplit(dataSet) #选取信息量最大的特征放在bestFeatIndex中
    bestFeatLabel = labels[bestFeatIndex] #特征标签
    myTree = {bestFeatLabel:{}} # 使用特征标签创建树
    del(labels[bestFeatIndex]) # del用于list列表操作，删除一个或者连续几个元素
    featValues=[example[bestFeatIndex] for example in dataSet]
    uniqueVals = set(featValues)
    for value in uniqueVals:
        subLabels = labels[:] # copy all of labels, so trees don't mess up existing labels
        myTree[bestFeatLabel][value] = createTree(splitDataSet(dataSet, bestFeatIndex, value), subLabels)
    return myTree

# 使用决策树分类
def classify(inputTree, featLabels, testVec):
    firstSides = list(inputTree.keys())
    firstStr = firstSides[0] # 找到输入的第一个元素标签
    secondDic = inputTree[firstStr]
    featIndex = featLabels.index(firstStr)
    for key in secondDic.keys():
        if testVec[featIndex] == key: # 若该特征值等于当前key，往下走
            if type(secondDic[key]).__name__ == 'dict': # 若为树结构
                classLabel = classify(secondDic[key], featLabels, testVec)
            else: classLabel = secondDic[key]
    return classLabel # 分类结果

# 存储决策树
def storeTree(inputTree, filename): #序列化的对象可以在磁盘上保存，需要时读取
    import pickle  #python序列化对象，这里序列化保存树结构的字典对象
    fw = open(filename, 'wb')
    pickle.dump(inputTree, fw)
    fw.close()
def grabTree(filename):
    import pickle
    fr = open(filename, 'rb')
    return pickle.load(fr)
            
# myDat, labels = createDataSet()
# labelsTemp = labels[:] # createTree会删除labels的元素
# myTree = createTree(myDat, labelsTemp)
# 测试
# ans = classify(myTree, labels, [1, 1])
# print(ans)
