#coding=utf-8

from numpy import *

def loadDataSet(fileName):
    dataMat = []
    fr = open(fileName)
    for line in fr.readlines():
        curLine = line.strip().split('\t')
        fltLine = list(map(float, curLine))
        dataMat.append(fltLine)
    return dataMat

# 向量AB的欧式距离
def distEclud(vecA, vecB):
    return sqrt(sum(power(vecA - vecB, 2))) 

# 构建随机质心
def randCent(dataSet, k):
    n = shape(dataSet)[1]
    centroids = mat(zeros((k, n)))
    for j in range(n): 
        minJ = min(dataSet[:, j])
        rangeJ = float(max(dataSet[:,j]) - minJ)
        centroids[:, j] = mat(minJ + rangeJ * random.rand(k, 1)) # why(k, 1)
    return centroids

# K-均值算法
# @Param dataset, num of cluster, distance func, initCen
# @return centroids聚类质心向量
# @return clusterAssment所有元素的聚类(index和误差值)
def kMeans(dataSet, k, distMeans=distEclud, createCent=randCent):
    m = shape(dataSet)[0]
    clusterAssment = mat(zeros((m, 2)))
    centroids = createCent(dataSet, k)
    clusterChanged = True
    while clusterChanged:
        clusterChanged = False
        for i in range(m):
            minDist = inf; minIndex = -1
            for j in range(k):
                distJI = distMeans(centroids[j,:], dataSet[i,:])
                if distJI < minDist:
                    minDist = distJI; minIndex = j
            if clusterAssment[i, 0] != minIndex:
                clusterChanged = True
            clusterAssment[i, :] = minIndex, minDist**2
        for cent in range(k):
            # 所有中心等于cent的数据的index
            ptsInClust = dataSet[nonzero(clusterAssment[:, 0].A == cent)[0]]
            centroids[cent, :] = mean(ptsInClust, axis=0) #axis=0，为行压缩; axis=1,为列压缩
    return centroids, clusterAssment

# 二分K-均值聚类
# SSE（Sum of Squared Error, 误差平方和）
def biKmeans(dataSet, k, distMeas=distEclud):
    m = shape(dataSet)[0]
    clusterAssment = mat(zeros((m, 2)))
    centroid0 = mean(dataSet, axis=0).tolist()[0] #定义质心
    centList = [centroid0]
    for j in range(m): # 初始化到质心的距离
        clusterAssment[j, 1] = distMeas(mat(centroid0), dataSet[j, :]) ** 2
    while(len(centList) < k):
        lowestSSE = inf
        for i in range(len(centList)):
            ptsInCurrCluster = dataSet[nonzero(clusterAssment[:, 0].A == i)[0], :] # 将簇中所有点看做小的数据集
            centroidMat, splitClustAss = kMeans(ptsInCurrCluster, 2, distMeas) 
            sseSplit = sum(splitClustAss[:, 1]) # 计算该簇划分后的SSE
            sseNotSplit = sum(clusterAssment[nonzero(clusterAssment[:, 0].A != i)[0], 1]) # 计算该簇以外的点的SSE
            print("sseSplit, and notSplit: ", sseSplit, sseNotSplit)
            if (sseSplit + sseNotSplit) < lowestSSE: 
                bestCentToSplit = i
                bestNewCents = centroidMat
                bestClustAss = splitClustAss.copy()
                lowestSSE = sseSplit + sseNotSplit
        # bestClustAss[array, index] = newIndex
        print('nonzero(bestClustAss[:, 0].A == 1)[0]', nonzero(bestClustAss[:, 0].A == 1)[0])
        print(bestClustAss[nonzero(bestClustAss[:, 0].A == 1)[0], 0])
        # 分类后bestClustAss中的簇编号分别分0和1
        bestClustAss[nonzero(bestClustAss[:, 0].A == 1)[0], 0] = len(centList) # 将1变为 len
        bestClustAss[nonzero(bestClustAss[:, 0].A == 0)[0], 0] = bestCentToSplit # 将0变为 bestIndex
        print('the bestCentToSplit is: ', bestCentToSplit)
        print('the len of bestClustAss is: ', len(bestClustAss))
        centList[bestCentToSplit] = bestNewCents[0, :].tolist()[0]  # replace a centroid with two best centroids
        centList.append(bestNewCents[1, :].tolist()[0])
        clusterAssment[nonzero(clusterAssment[:, 0].A == bestCentToSplit)[0],:] = bestClustAss  # reassign new clusters, and SSE
    return mat(centList), clusterAssment

# datMat = mat(loadDataSet('ch10/testSet.txt'))
# centroids, clusterAssment = kMeans(datMat, 4)
# print(centroids)

datMat3 = mat(loadDataSet('ch10/testSet2.txt'))
centList, myNewAssments = biKmeans(datMat3, 3)