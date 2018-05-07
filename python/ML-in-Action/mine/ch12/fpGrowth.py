# -*- coding: utf-8 -*-

# FP树中节点类
class treeNode:
    def __init__(self, nameValue, numOccur, parentNode):
        self.name = nameValue
        self.count = numOccur
        self.nodeLink = None #nodeLink 变量用于链接相似的元素项
        self.parent = parentNode
        self.children = {}
    
    def inc(self, numOccur):
        self.count += numOccur

    # 将树以文本形式显示
    def disp(self, ind=1):
        print('  ' * ind, self.name, ' ', self.count)
        for child in self.children.values():
            child.disp(ind + 1)

# 以最小支持度minSup构建FP-tree
def createTree(dataSet, minSup=1):
    headerTable = {}
    for trans in dataSet:
        for item in trans:
            headerTable[item] = headerTable.get(item, 0) + dataSet[trans]
    #删除低于小频繁度的数据
    for k in list(headerTable):
        if headerTable[k] < minSup:
            del (headerTable[k])
    freqItemSet = set(headerTable.keys())
    if len(freqItemSet) == 0:
        return None, None
    for k in headerTable:
        headerTable[k] = [headerTable[k], None]
    retTree = treeNode('Null Set', 1, None) #初始化tree
    for tranSet, count in dataSet.items(): 
        localD = {}
        # 根据全局频率对频繁集中的元素进行排序
        for item in tranSet:
            if item in freqItemSet: 
                localD[item] = headerTable[item][0]
        #使用排序后的频率项集对树进行填充
        if len(localD) > 0:
            orderedItems = [v[0] for v in sorted(localD.items(), key=lambda p: p[1], reverse=True)]
            updateTree(orderedItems, retTree, headerTable, count)
    return retTree, headerTable #返回树和头指针表

# 将items[0](最高频率元素)加入inTree子节点，并以items[0]为头结点遍历items[1::]
# 即items集合中同频数的item依然会以父子关系生成FP-tree
def updateTree(items, inTree, headerTable, count):
    if items[0] in inTree.children:  # 首先检查是否存在该节点
        inTree.children[items[0]].inc(count)  # 存在则计数增加
    else:  # 不存在则将新建该节点
        inTree.children[items[0]] = treeNode(items[0], count, inTree)#创建一个新节点
        if headerTable[items[0]][1] == None:  # 若原来不存在该类别，更新头指针列表
            headerTable[items[0]][1] = inTree.children[items[0]]#更新指向
        else: # 更新指向
            updateHeader(headerTable[items[0]][1], inTree.children[items[0]])
    if len(items) > 1:  #仍有未分配完的树，迭代
        updateTree(items[1::], inTree.children[items[0]], headerTable, count)

def updateHeader(nodeToTest, targetNode):
    while (nodeToTest.nodeLink != None):
        nodeToTest = nodeToTest.nodeLink
    nodeToTest.nodeLink = targetNode

def loadSimpDat():
    simpDat = [['r', 'z', 'h', 'j', 'p'],
               ['z', 'y', 'x', 'w', 'v', 'u', 't', 's'],
               ['z'],
               ['r', 'x', 'n', 'o', 's'],
               ['y', 'r', 'x', 'z', 'q', 't', 'p'],
               ['y', 'z', 'x', 'e', 'q', 's', 't', 'm']]
    return simpDat
#createInitSet() 用于实现上述从列表到字典的类型转换过程
def createInitSet(dataSet):
    retDict = {}
    for trans in dataSet:
        retDict[frozenset(trans)] = 1
    return retDict


def ascendTree(leafNode, prefixPath):
    if leafNode.parent != None:
        prefixPath.append(leafNode.name)
        ascendTree(leafNode.parent, prefixPath)

# 根据headTable创建每个元素的前缀路径(条件模式基)
# basePet频繁项，treeNode为FP树的节点
def findPrefixPath(basePat, treeNode):
    condPaths = {}
    while treeNode != None:
        prefixPath = []
        ascendTree(treeNode, prefixPath)
        if len(prefixPath) > 1:
            # prefixPath[1:] 除去第一个元素(treeNode)，则得到元素的前缀路径
            condPaths[frozenset(prefixPath[1:])] = treeNode.count
        treeNode = treeNode.nodeLink
    return condPaths

# https://blog.csdn.net/gamer_gyt/article/details/51113753
# 递归查找频繁项集
def mineTree(inTree, headerTable, minSup, preFix, freqItemList):
    # 头指针表中的元素项按照频繁度排序,从小到大
    bigL = [v[0] for v in sorted(headerTable.items(), key=lambda p:str(p[1]))]
    for basePat in bigL:
        #加入频繁项列表
        newFreqSet = preFix.copy()
        newFreqSet.add(basePat)
        #print ('finalFrequent Item: ',newFreqSet)
        freqItemList.append(newFreqSet)
        condPattBases = findPrefixPath(basePat, headerTable[basePat][1])
        #print ('condPattBases :',basePat, condPattBases)
        # 构建条件模式Tree
        myCondTree, myHead = createTree(condPattBases, minSup)
        #将创建的条件基作为新的数据集添加到fp-tree
        #print ('head from conditional tree: ', myHead)
        if myHead != None:
            print ('conditional tree for: ',newFreqSet)
            myCondTree.disp(1)
            mineTree(myCondTree, myHead, minSup, newFreqSet, freqItemList)

# 封装FP-growth算法
def fpGrowth(dataSet, minSup=3):
    initSet = createInitSet(dataSet)
    myFPtree, myHeaderTab = createTree(initSet, minSup)
    freqItems = []
    mineTree(myFPtree, myHeaderTab, minSup, set([]), freqItems)
    return freqItems

simpDat = loadSimpDat()
initSet = createInitSet(simpDat)
# print(initSet)
myFPtree, myHeaderTab = createTree(initSet, 3)
# print(myHeaderTab)
# myFPtree.disp()
freqItems = []
mineTree(myFPtree, myHeaderTab, 3, set([]), freqItems)
print(freqItems)