# -*- coding: utf-8 -*-

from numpy import *

def loadDataSet():
    return [[1, 3, 4], [2, 3, 5], [1, 2, 3, 5], [2, 5]]

# C1是大小为1的所有候选项集的集合
def createC1(dataSet):
    C1 = []
    for transaction in dataSet:
        for item in transaction:
            if not [item] in C1:
                C1.append([item])

    C1.sort()
    return list(map(frozenset, C1))

# des 取出不满足最小支持度的项集
# @param 数据集、候选项集列表Ck、最小支持度minSupport
# @return 满足最小支持度的项集, 所有项集及支持度
def scanD(D, Ck, minSupport):
    ssCnt = {}
    for tid in D:
        for can in Ck:
            if can.issubset(tid):
                if not can in ssCnt:
                    ssCnt[can] = 1
                else:
                    ssCnt[can] += 1
    numItems = float(len(D))
    retList = []
    supportData = {}
    # 计算所有项的支持度
    for key in ssCnt:
        support = ssCnt[key] / numItems
        if support >= minSupport:
            retList.insert(0, key)
        supportData[key] = support
    return retList, supportData

def aprioriGen(Lk, k):
    # Lk:频繁项集列表, Lk:项集元素个数 k
    retList = []
    lenLk = len(Lk)
    for i in range(lenLk):
        for j in range(i + 1, lenLk):
            # 前k-1项相同(第k项不同)时，直接合并两个list
            L1 = list(Lk[i])[:k-2]; L2 = list(Lk[j])[:k-2]
            L1.sort(); L2.sort()
            if L1 == L2:
                retList.append(Lk[i] | Lk[j])
    return retList

def apriori(dataSet, minSupport = 0.5):
    C1 = createC1(dataSet)
    D = list(map(set, dataSet))
    L1, supportData = scanD(D, C1, minSupport)
    L = [L1]
    k = 2
    while (len(L[k-2]) > 0):
        Ck = aprioriGen(L[k-2], k)
        Lk, supK = scanD(D, Ck, minSupport)
        supportData.update(supK)
        L.append(Lk)
        k += 1
    return L, supportData

# 生成关联规则
def generateRules(L, supportData, minConf=0.7):
    #频繁项集列表、包含那些频繁项集支持数据的字典、最小可信度阈值
    bigRuleList = [] #存储所有的关联规则
    for i in range(1, len(L)):
        for freqSet in L[i]:
            H1 = [frozenset([item]) for item in freqSet]
            if (i > 1):
                rulesFromConseq(freqSet, H1, supportData, bigRuleList, minConf)
            else:
                calcConf(freqSet, H1, supportData, bigRuleList, minConf)
    return bigRuleList

# 生成候选规则集合：计算规则的可信度以及找到满足最小可信度要求的规则
def calcConf(freqSet, H, supportData, brl, minConf=0.7):
    #针对项集中只有两个元素时，计算可信度
    prunedH = [] # 返回一个满足最小可信度要求的规则列表
    for conseq in H: # 后件，遍历 H中的所有项集并计算它们的可信度值
        conf = supportData[freqSet]/supportData[freqSet - conseq] #可信度计算，结合支持度数据
        if conf >= minConf:
            print(freqSet - conseq, '-->', conseq, 'conf:', conf)
            #如果某条规则满足最小可信度值,那么将这些规则输出到屏幕显示
            brl.append((freqSet - conseq, conseq, conf)) #添加到规则里，brl 是前面通过检查的 bigRuleList
            prunedH.append(conseq) #同样需要放入列表到后面检查
    return prunedH

#合并
def rulesFromConseq(freqSet, H, supportData, brl, minConf=0.7):
    #参数:一个是频繁项集,另一个是可以出现在规则右部的元素列表 H
    m = len(H[0])
    if (len(freqSet) > (m + 1)): #频繁项集元素数目大于单个集合的元素数
        Hmp1 = aprioriGen(H, m+1) #存在不同顺序、元素相同的集合，合并具有相同部分的集合
        Hmp1 = calcConf(freqSet, Hmp1, supportData, brl, minConf) #计算可信度
        if len(Hmp1) > 1: #满足最小可信度要求的规则列表多于1,则递归
            rulesFromConseq(freqSet, Hmp1, supportData, brl, minConf)

dataSet = loadDataSet()
# C1 = createC1(dataSet)
# D = list(map(set, dataSet)) # list可直接套map迭代器
# L1, suppData0 = scanD(D, C1, 0.5)
# print(L1, suppData0)
L, suppData = apriori(dataSet, minSupport=0.5)
print(L, suppData)
rules = generateRules(L, suppData, minConf=0.7)
print(rules)

