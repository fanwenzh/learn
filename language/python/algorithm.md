```python
# 字典排序
import operator
s = sorted(res.items(), reverse = True) # 字典始终按key值排序
# s = sorted(zip(res.keys(), res.values()), reverse=True)
# s = sorted(res.items(),key=operator.itemgetter(0))#按照item中的第一个字符进行排序，即按照key排序

# 476 返回补码
    def findComplement(self, num):
        return int('1'*(len(bin(num))-2), 2) ^ num # 101 XOR 111 = 010

# 迭代器
range(start, end, step)
zip(list1, list2)
dict(enumerate(seasons, start=3)) # 枚举偏移量
map((lambda x: x+3),[1,2,3,4])
list(filter((lambda x:x>0),range(-5,5))) # [1, 2, 3, 4], filter(fun, list)

reduce((lambda x,y:x+y),[1,2,3,4]) # reduce, reduce(fun, list)
import operator,functools
functools.reduce(operator.add,[2,4,6])

[[row[i] for row in matrix] for i in range(4)] # 列表推导
list(zip(*matrix)) # [(1, 5, 9), (2, 6, 10), (3, 7, 11), (4, 8, 12)]

# 尾递归，在函数返回的时候，调用自身本身，并且return语句不能包含表达式，编译器或者解释器就可以把尾递归做优化，只占用一个栈帧
def fact_iter(num, product):
    if num == 1:
        return product
    return fact_iter(num - 1, num * product) # num - 1和num * product在函数调用前就会被计算

```