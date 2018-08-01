# coding=utf-8
from numpy import *

def loadDataSet(fileName):
    dataMat = []
    fr = open(fileName)
    for line in fr.readlines():
        curLine = line.strip().split('\t')
        fltLine = list(map(float, curLine)) # 每行映射成浮点数
        dataMat.append(fltLine)
    return dataMat

# 按特征feature的值value切分数据集
def binSplitDataSet(dataSet, feature, value):
    mat0 = dataSet[nonzero(dataSet[:, feature] > value)[0], :]
    mat1 = dataSet[nonzero(dataSet[:, feature] <= value)[0], :]
    return mat0, mat1

#Tree结点类型：回归树
def regLeaf(dataSet): #生成叶结点，在回归树中是目标变量特征的均值
    return mean(dataSet[:, -1])
#误差计算函数：回归误差
def regErr(dataSet): #计算目标的平方误差（均方误差*总样本数）
    return var(dataSet[:, -1]) * shape(dataSet)[0]

def chooseBestSplit(dataSet, leafType = regLeaf, errType = regErr, ops = (1,4)):
    # 切分特征的参数阙值，用户初始设置好
    tolS = ops[0] # 允许的误差下降值
    tolN = ops[1] # 切分的最小样本数
    # 若所有特征值都相同，停止切分
    if len(set(dataSet[:, -1].T.tolist()[0])) == 1: # 倒数第一列转换成list，不重复
        return None, leafType(dataSet) # 如果剩余特征数为1， 停止切分
        # 找不到好的切分特征，调用regLeaf直接生成叶结点
    m, n = shape(dataSet)
    S = errType(dataSet) # 最好的特征通过计算平均误差
    bestS = inf; bestIndex = 0; bestValue = 0
    for featIndex in range(n - 1): # 遍历数据的每个属性特征
        for splitVal in set((dataSet[:, featIndex].T.A.tolist())[0]): # 遍历每个特征里不同的特征值 .A toArray
            mat0, mat1 = binSplitDataSet(dataSet, featIndex, splitVal) # 对每个特征进行二元分类
            if (shape(mat0)[0] < tolN) or (shape(mat1)[0] < tolN): continue
            newS = errType(mat0) + errType(mat1)
            if newS < bestS:
                bestIndex = featIndex
                bestValue = splitVal
                bestS = newS
    #如果切分后误差效果下降不大，则取消切分，直接创建叶结点
    if (S - bestS) < tolS:
        return None,leafType(dataSet) #停止切分2
    mat0, mat1 = binSplitDataSet(dataSet, bestIndex, bestValue)
    #判断切分后子集大小，小于最小允许样本数停止切分3
    if (shape(mat0)[0] < tolN) or (shape(mat1)[0] < tolN):
        return None, leafType(dataSet)
    return bestIndex,bestValue#返回特征编号和用于切分的特征值

# 构建tree
def createTree(dataSet, leafType=regLeaf, errType=regErr, ops=(1,4)):
    #数据集默认NumPy Mat 其他可选参数【结点类型：回归树，误差计算函数，ops包含树构建所需的其他元组】
    feat,val = chooseBestSplit(dataSet, leafType, errType, ops)
    if feat == None: return val #满足停止条件时返回叶结点值
    #切分后赋值
    retTree = {}
    retTree['spInd'] = feat
    retTree['spVal'] = val
    #切分后的左右子树
    lSet, rSet = binSplitDataSet(dataSet, feat, val)
    retTree['left'] = createTree(lSet, leafType, errType, ops)
    retTree['right'] = createTree(rSet, leafType, errType, ops)
    return retTree

# 判断输入是否为一棵树
def isTree(obj):
    return (type(obj).__name__ == 'dict') # 判断为字典类型返回true

# 返回树的平均值
def getMean(tree):
    if isTree(tree['right']):
        tree['right'] = getMean(tree['right'])
    if isTree(tree['left']):
        tree['left'] = getMean(tree['left'])
    return (tree['left']+tree['right'])/2.0

# 树的后剪枝
def prune(tree, testData):
    if shape(testData)[0] == 0: return getMean(tree) # 确认数据集非空
    # 假设发生过拟合，采用测试数据对树进行剪枝
    if (isTree(tree['right'])) or isTree(tree['left']): # 左右子树非空
        lSet, rSet = binSplitDataSet(testData, tree['spInd'], tree['spVal'])
    if isTree(tree['left']): tree['left'] = prune(tree['left'], lSet)
    if isTree(tree['right']): tree['right'] = prune(tree['right'], rSet)
    # 剪枝后判断是否还是有子树
    if not isTree(tree['left']) and not isTree(tree['right']):
        lSet, rSet = binSplitDataSet(testData, tree['spInd'], tree['spVal'])
        # 判断是否merge
        errorNoMerge = sum(power(lSet[:, -1] - tree['left'], 2)) + \
                       sum(power(rSet[:, -1] - tree['right'], 2))
        treeMean = (tree['left'] + tree['right']) / 2.0
        errorMerge = sum(power(testData[:, -1] - treeMean, 2))
        if errorMerge < errorNoMerge:
            print('merging')
            return treeMean
        else:
            return tree
    else:
        return tree

# 模型树, 分段线性
def linearSolve(dataSet):
    m, n = shape(dataSet)
    X= mat(ones((m, n))); Y = mat(ones((m, 1)))
    X[:, 1:n] = dataSet[:, 0:n-1]; Y = dataSet[: -1]
    xTx = X.T * X
    if linalg.det(xTx) == 0.0:
        raise NameError('This matrix is singular, cannot do inverse,\n\
        try increasing the second value of ops') 
    ws = xTx.I * (X.T * Y)
    return ws, X, Y

def modelLeaf(dataSet): # 不需要切分时生成模型树叶节点
    ws,X,Y = linearSolve(dataSet)
    return ws

def modelErr(dataSet): # 用来计算误差找到最佳切分
    ws,X,Y = linearSolve(dataSet)
    yHat = X * ws
    return sum(power(Y- yHat, 2))

# 用树回归进行预测
# 1-回归树
def regTreeEval(model, inDat):
    return float(model)
# 2-模型树
def modelTreeEval(model, inDat):
    n = shape(inDat)[1]
    X = mat(ones((1, n + 1)))
    X[:, 1:n+1] = inDat
    return float(X * model)

# 对于输入的单个数据点，treeForeCast返回一个预测值
def treeForeCast(tree, inData, modelEval=regTreeEval): # 指定树模型
    if not isTree(tree): return modelEval(tree, inData)
    if inData[tree['spInd']] > tree['spVal']:
        if isTree(tree['left']): # 有左子树，递归进入子树
            return treeForeCast(tree['left'], inData, modelEval)
        else:
            return modelEval(tree['left'], inData)
    else:
        if isTree(tree['right']):
            return treeForeCast(tree['right'], inData, modelEval)
        else:
            return modelEval(tree['right'], inData)
    
# 对数据进行树结构建模
def createForeCast(tree, testData, modelEval = regTreeEval):
    m = len(testData)
    yHat = mat(zeros((m, 1)))
    for i in range(m):
        yHat[i, 0] = treeForeCast(tree, mat(testData[i]), modelEval)
    return yHat
# 测试线性回归效果，与树回归对比
def linearSolve(dataSet):
    m, n = shape(dataSet)
    X = mat(ones((m, n))); Y = mat(ones((m, 1)))
    X[:, 1:n] = dataSet[:, 0:n-1]; Y = dataSet[:, -1]
    xTx = X.T * X
    if linalg.det(xTx) == 0.0:
        raise NameError('This matrix is singular, cannot do inverse,\n\
        try increasing the second value of ops')
    ws = xTx.I * (X.T * Y)
    return ws,X,Y      

# 生成树
# myDat2 = loadDataSet('ch9/ex2.txt')
# myMat2 = mat(myDat2)
# myTree = createTree(myMat2, ops=(0,1))
# print('myTree: ', myTree)
# 后剪枝
# myDatTest = loadDataSet('ch9/ex2test.txt')
# myMat2Test = mat(myDatTest)
# myTree2 = prune(myTree, myMat2Test)
# print('myTree2: ', myTree2)

# 回归树
# trainMat = mat(loadDataSet('ch9/bikeSpeedVsIq_train.txt'))
# testMat = mat(loadDataSet('ch9/bikeSpeedVsIq_test.txt'))
# myTree = createTree(trainMat, ops=(1, 20))
# yHat = createForeCast(myTree, testMat[:, 0])
# print(corrcoef(yHat, testMat[:, 1], rowvar=0)[0,1])
# 模型树
# myTree2 = createTree(trainMat, modelLeaf, modelErr, (1,20))
# yHat2 = createForeCast(myTree2, testMat[:,0], modelTreeEval)
# print(corrcoef(yHat2, testMat[:, 1], rowvar=0)[0,1])

