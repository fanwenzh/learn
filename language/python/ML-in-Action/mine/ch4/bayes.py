#coding=utf-8
from numpy import *
#文本转化为词向量
def loadDataSet():
    postingList=[['my', 'dog', 'has', 'flea', 'problems', 'help', 'please'],
                 ['maybe', 'not', 'take', 'him', 'to', 'dog', 'park', 'stupid'],
                 ['my', 'dalmation', 'is', 'so', 'cute', 'I', 'love', 'him'],
                 ['stop', 'posting', 'stupid', 'worthless', 'garbage'],
                 ['mr', 'licks', 'ate', 'my', 'steak', 'how', 'to', 'stop', 'him'],
                 ['quit', 'buying', 'worthless', 'dog', 'food', 'stupid']]
    classVec = [0,1,0,1,0,1]    #1表示侮辱性文字，0表示正常言论
    return postingList,classVec #词条切分后的分档和类别标签

#返回dataSet所有(不重复元素)词的list
def createVocabList(dataSet):
    vocabSet=set([])#创建空集，set是返回不带重复词的list
    for document in dataSet:
        vocabSet = vocabSet|set(document) # 两个set集合的并集
    return list(vocabSet)

#返回单词列表向量(判断inputSet的单词是否在vocabList中出现, 出现returnVec相应位置置1，不出现置0)
def setOfWords2Vec(vocabList, inputSet):#参数为词汇表和单词集
    returnVec = [0]*len(vocabList)
    for word in inputSet:
        if word in vocabList:
            returnVec[vocabList.index(word)] = 1
        else: print("the word: %s is not in my Vocabulary!" % word)
    return returnVec

#朴素贝叶斯分类训练函数
def trainNB0(trainMatrix, trainCategory):
    numTrainDocs = len(trainMatrix)
    numWords = len(trainMatrix[0])
    pAbusive = sum(trainCategory)/float(numTrainDocs) # 文档侮辱性分类的概率
    # p0Num = zeros(numWords); p1Num = zeros(numWords)
    # p0Denom = 0.0; p1Denom = 0.0
    p0Num = ones(numWords); p1Num = ones(numWords)
    p0Denom = 2.0; p1Denom = 2.0
    for i in range(numTrainDocs): # 遍历文档
        if trainCategory[i] == 1:
            p1Num += trainMatrix[i]
            p1Denom += sum(trainMatrix[i])
        else:
            p0Num += trainMatrix[i]
            p0Denom += sum(trainMatrix[i])
    # p1Vec = p1Num / p1Denom # p(w|c1) 侮辱性文档分类时，各单词出现的概率
    # p0Vec = p0Num / p0Denom # p(w|c0) 正常文档分类中，各单词出现的概率
    # 由于python中很小的数四舍五入后得到0，无法取得准确成绩。因此用对数解决：ln(a * b) = ln(a) + ln(b)
    p1Vec = log(p1Num / p1Denom)
    p0Vec = log(p0Num / p0Denom)
    return p0Vec, p1Vec, pAbusive

# 给定词向量，判断类别
def classifyNB(vec2Classify, p0Vec, p1Vec, pClass1): #第一个参数为0,1组合二分类矩阵，对应词汇表各个词是否出现
    # p0Vec和p1Vec为非对数时，应相乘
    p1 = sum(vec2Classify * p1Vec) + log(pClass1)
    p0 = sum(vec2Classify * p0Vec) + log(1.0 - pClass1)
    if p1 > p0:
        return 1
    else:
        return 0

# bayes测试函数
def testingNB():
    listOPosts, listClasses = loadDataSet() #导入数据，第一个存储文档，第二个存储文档标记类别
    myVocabList = createVocabList(listOPosts) #返回dataSet所有(不重复元素)词的list
    trainMat = []
    for postinDoc in listOPosts: 
        trainMat.append(setOfWords2Vec(myVocabList, postinDoc)) # 生成词向量，保存在trainMat中
    p0V, p1V, pAb = trainNB0(array(trainMat), array(listClasses)) # array约等于list[[],[]]
    testDoc = ['love','my','dalmation']
    testVec = array(setOfWords2Vec(myVocabList,testDoc)) #判断测试词条在词汇list中是否出现，生成Doc的词向量
    print(testDoc,'classified as:',classifyNB(testVec,p0V,p1V,pAb))
    testDoc = ['stupid','garbage']
    testVec = array(setOfWords2Vec(myVocabList,testDoc))
    print(testDoc,'classified as:',classifyNB(testVec,p0V,p1V,pAb))

# 词袋模型(记录词出现次数)
def bagOfWords2VecMN(vocabList, inputSet):
    returnVec = [0] * len(vocabList)
    for word in inputSet:
        if word in vocabList:
            returnVec[vocabList.index(word)] += 1
        else:
            print("the word: %s is not in my Vocabulary!" % word) 
    return returnVec

# 示例：过滤垃圾邮件
# 字符串划分
def textParse(bigString):
    import re
    listOfTokens = re.split(r'\W*', bigString) # listOfTokens=re.split('x*',bigString)
    return [tok.lower() for tok in listOfTokens if len(tok) > 2] #去掉少于两个的字符串, 全部转化为小写

#过滤邮件 训练+测试
def spamTest():
    docList = []; classList = []; fullText = []
    for i in range(1, 26): # 读取训练集 1-25
        wordList = textParse(open('ch4/email/spam/%d.txt' % i, "rb").read().decode('GBK', 'ignore'))
        docList.append(wordList)
        fullText.extend(wordList) #添加元素 去掉数组格式
        classList.append(1)
        wordList = textParse(open('ch4/email/ham/%d.txt' % i, "rb").read().decode('GBK', 'ignore'))
        docList.append(wordList)
        fullText.extend(wordList) #添加元素 去掉数组格式
        classList.append(0)
    vocabList = createVocabList(docList) # 创建词列表
    trainingSet = list(range(50)) # spam + ham = 50 # 存储训练集的index
    testSet = []
    for i in range(10): # 随机选择10封邮件作为测试集
        randIndex = int(random.uniform(0, len(trainingSet)))
        testSet.append(trainingSet[randIndex])
        del(trainingSet[randIndex])
    trainMat = []; trainClasses = []
    for docIndex in trainingSet: # 遍历训练集
        trainMat.append(setOfWords2Vec(vocabList, docList[docIndex])) # 对每一封邮件创建词向量并计算分类概率
        trainClasses.append(classList[docIndex]) # 类别
    p0V, p1V, pSpam = trainNB0(array(trainMat), array(trainClasses)) 
    errorCount = 0
    for docIndex in testSet:
        wordVector = setOfWords2Vec(vocabList, docList[docIndex])
        if classifyNB(array(wordVector), p0V, p1V, pSpam) != classList[docIndex]:
            errorCount += 1
    print('the error rate is', float(errorCount) / len(testSet))

#从个人广告中获取区域倾向
#RSS源分类器及高频词去除函数
def calcMostFreq(vocabList, fullText): # 对所有词出现频率进行排序，返回排序后出现频率最高的前30个
    import operator
    freqDict = {}
    for token in vocabList:
        freqDict[token] = fullText.count(token)
    sortedFreq = sorted(freqDict.items(), key = operator.itemgetter(1), reverse = True)
    return sortedFreq[0:30]

def localWords(feed1, feed0):
    docList = []; classList = []; fullText = []
    minLen = min(len(feed1['entries']), len(feed0['entries']))
    for i in range(minLen):
        wordList = textParse(feed1['entries'][i]['summary'])
        docList.append(wordList)
        fullText.extend(wordList)
        classList.append(1)
        wordList = textParse(feed0['entries'][i]['summary'])
        docList.append(wordList)
        fullText.extend(wordList)
        classList.append(0)
    vocabList = createVocabList(docList)
    top30Words = calcMostFreq(vocabList, fullText)
    for pairW in top30Words:
        if pairW[0] in vocabList: vocabList.remove(pairW[0])
    trainingSet = list(range(2 * minLen))
    testSet = []
    for i in range(20):
        randIndex = int(random.uniform(0, len(trainingSet)))
        testSet.append(trainingSet[randIndex])
        del(trainingSet[randIndex])
    trainMat = []; trainClasses = []
    for docIndex in trainingSet:
        trainMat.append(bagOfWords2VecMN(vocabList, docIndex))
        trainClasses.append(classList[docIndex])
    p0V, p1V, pSpam = trainNB0(array(trainMat), array(trainClasses))
    errorCount = 0
    for docIndex in testSet:
        wordVector = bagOfWords2VecMN(vocabList, docList[docIndex])
        if classifyNB(array(wordVector), p0V, p1V, pSpam) != classList[docIndex]:
            errorCount += 1
    print('the error rate is: ', float(errorCount) / len(testSet))
    return vocabList, p0V, p1V

# 显示地域相关的用词
def getTopWords(ny, sf):
    import operator
    vocabList, p0V, p1V = localWords(ny, sf)
    topNY = []; topSF = []
    for i in range(len(p0V)):
        if p0V[i] > -1.0: topSF.append((vocabList[i]), p0V[i])
        if p1V[i] > -1.0: topNY.append((vocabList[i]), p1V[i])
    sortedSF = sorted(topSF, key=lambda pair:pair[1], reverse=True)
    print("SF**SF**SF**SF**SF**SFpipSF**SF**SF**SF**SF**SF**SF**SF**SF**SF**")
    for item in sortedSF:
        print (item[0])
    sortedNY = sorted(topNY, key=lambda pair:pair[1], reverse=True)
    print ("NY**NY**NY**NY**NY**NY**NY**NY**NY**NY**NY**NY**NY**NY**NY**NY**")
    for item in sortedNY:
        print (item[0])

# testingNB()

# import re
# regEx = re.compile('\\W*') # 分隔除数字、字母以外的字符
# mySent = ['This book is the best book on Python or M.L. I have ever laid eyes upon.']
# listOfTokens = regEx.split(mySent)
# words = [tok.lower() for tok in listOfTokens if len(tok) > 0] # lower(), upper()

# spamTest()

# import feedparser
# 服务器301
# ny = feedparser.parse('http://newyork.craigslist.org/stp/index.rss')
# sf = feedparser.parse('http://sfbay.craigslist.org/stp/index.rss')
# print(ny, sf)
# vocaBlist, pSF, pNY = localWords(ny, sf)
# vocaBlist, pSF, pNY = localWords(ny, sf)