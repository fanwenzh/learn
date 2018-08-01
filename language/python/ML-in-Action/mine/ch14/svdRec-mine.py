# -*- coding:utf-8 -*-
from numpy import *
from numpy import linalg as la

def loadExData0():
    return [[1,1],[7,7]]

def loadExData1():
    return [[0, 0, 0, 2, 2],
            [0, 0, 0, 3, 3],
            [0, 0, 0, 1, 1],
            [1, 1, 1, 0, 0],
            [2, 2, 2, 0, 0],
            [5, 5, 5, 0, 0],
            [1, 1, 1, 0, 0]]

def loadExData2():
    return [[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5],
            [0, 0, 0, 3, 0, 4, 0, 0, 0, 0, 3],
            [0, 0, 0, 0, 4, 0, 0, 1, 0, 4, 0],
            [3, 3, 4, 0, 0, 0, 0, 2, 2, 0, 0],
            [5, 4, 5, 0, 0, 0, 0, 5, 5, 0, 0],
            [0, 0, 0, 0, 5, 0, 1, 0, 0, 5, 0],
            [4, 3, 4, 0, 0, 0, 0, 5, 5, 0, 1],
            [0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4],
            [0, 0, 0, 2, 0, 2, 5, 0, 0, 1, 2],
            [0, 0, 0, 0, 5, 0, 0, 0, 0, 4, 0],
            [1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0]]

# 相似度 = 1/(1 + 欧氏距离)
def ecludSim(inA, inB):
    return 1.0/(1.0 + la.norm(inA - inB))
# 威尔逊距离 corrcoef
def pearsSim(inA, inB):
    if len(inA) < 3: return 1.0 # 是否存在3个以上的点
    return 0.5 + 0.5 * corrcoef(inA, inB, rowvar=0)[0][1]
# 余弦 
def cosSim(inA,inB):
    num = float(inA.T*inB)
    denom = la.norm(inA)*la.norm(inB)
    return 0.5 + 0.5 * (num / denom)

# @param 数据矩阵、用户编号、相似度计算方法和物品编号
def standEst(dataMat, user, simMeas, item):
    n = shape(dataMat)[1]
    simTotal = 0.0; ratSimTotal = 0.0
    for j in range(n):
        userRating = dataMat[user, j]
        if userRating == 0: continue
        # 寻找都评价了商品item和j的用户
        overLap = nonzero(logical_and(dataMat[:, item].A > 0, dataMat[:, j].A > 0))[0]
        if len(overLap) == 0:
            similarity = 0
        else: # 存在两个用户都评价的产品 计算相似度
            similarity = simMeas(dataMat[overLap, item], dataMat[overLap, j])
        print ('the %d and %d similarity is: %f' % (item, j, similarity))
        simTotal += similarity #计算每个用户对所有评价产品累计相似度
        ratSimTotal += similarity * userRating #根据评分计算比率
    if simTotal == 0:
        return 0
    else:
        # 归一化，使分数在0-5之间
        # item与所有其他用户也评分的商品的相似评分之和/总相似度 为 该模型定义的item分数
        return ratSimTotal / simTotal

def recommend(dataMat, user, N=3, simMeas=cosSim, estMethod=standEst):
    unratedItems = nonzero(dataMat[user, :].A == 0)[1] # 寻找用户未评价的产品
    if len(unratedItems) == 0: return 'you rated everything'
    itemScores = []
    for item in unratedItems:
        estimatedScore = estMethod(dataMat, user, simMeas, item) # 基于相似度的评分
        itemScores.append((item, estimatedScore))
    return sorted(itemScores, key=lambda t:t[1], reverse=True)[:N]

# 基于SVD的评分估计
def svdEst(dataMat, user, simMeas, item):
    n = shape(dataMat)[1]
    simTotal = 0.0; ratSimTotal = 0.0
    U, Sigma, VT = la.svd(dataMat) # SVD分解
    Sig4 = mat(eye(4) * Sigma[:4]) # 建立对角矩阵
    xformedItems = dataMat.T * U[:, :4] * Sig4.I #【重点】降维：变换到低维空间(降低用户数的维度。如果降低菜谱维度呢?)
    #下面依然是计算相似度，给出归一化评分
    for j in range(n):
        userRating = dataMat[user, j]
        if userRating == 0 or j == item: continue
        similarity = simMeas(xformedItems[item, :].T, xformedItems[j, :].T) #【重点】.T
        print ('the %d and %d similarity is: %f' % (item, j, similarity))
        simTotal += similarity
        ratSimTotal += similarity * userRating
    if simTotal == 0:
        return 0
    else:
        return ratSimTotal / simTotal

# SVD实现图像压缩
# 打印矩阵。由于矩阵包含了浮点数,因此必须定义浅色和深色。
def printMat(inMat, thresh=0.8):
    for i in range(32):
        for k in range(32):
            if float(inMat[i,k]) > thresh:
                print (1, end="")
            else: print (0, end="")
        print ('')

# 压缩
def imgCompress(numSV=3, thresh=0.8):
    myl = []
    for line in open('ch14/0_5.txt').readlines():
        newRow = []
        for i in range(32):
            newRow.append(int(line[i]))
        myl.append(newRow)
    myMat = mat(myl)
    print("****original matrix******")
    printMat(myMat, thresh)
    U, Sigma, VT = la.svd(myMat)
    SigRecon = mat(zeros((numSV, numSV))) # 创建初始特征
    for k in range(numSV): # 构建对角矩阵
        SigRecon[k, k] = Sigma[k]
    reconMat = U[:,:numSV]*SigRecon*VT[:numSV,:]
    print ("****reconstructed matrix using %d singular values******" % numSV)
    printMat(reconMat, thresh)

# 将m*n矩阵分解成, m*m, m*n, n*n三个矩阵，由于m*n矩阵为对角矩阵，压缩空间用array表示
# U, Sigma, Vt = la.svd(loadExData0()) 
# print(U)
# print(Sigma)
# print(Vt)

# data = loadExData1()
# U, Sigma, VT = la.svd(data)
# Sig3 = mat([[Sigma[0], 0, 0], [0, Sigma[1], 0], [0, 0, Sigma[2]]])
# calData = U[:,:3] * Sig3 * VT[:3,:]
# print(calData)

# recommend
# myMat = mat(loadExData1())
# myMat[0,1]=myMat[0,0]=myMat[1,0]=myMat[2,0]=4
# myMat[3,3]=2
# res = recommend(myMat, 2)
# print(res)

# svd推荐
# U, Sigma, VT = la.svd(loadExData2())
# Sig2 = Sigma**2
# totalSig = sum(Sig2) # 总能量(信息量)为542.0
# totalSig90 = totalSig * 0.9 # 最低信息量为90% = 487.8
# totalSig2 = sum(Sig2[:2]) # 信息量为378.8
# totalSig3 = sum(Sig2[:3]) # 信息量为500.5，符合要求
# print(totalSig, totalSig90, totalSig2, totalSig3)

# 图像压缩
imgCompress(2)