// lodash 4.16.1
// http: //www.css88.com/doc/lodash/#_chunkarray-size1
// Array
_.chunk(array, [size = 1]) // 以size为单位拆分array, 返回二维数组
_.compact(array); //过滤array中的假值

_.difference(arr1, arr2) // arr1中过滤arr2, 
_.differenceBy(array, [value], [Array | Function | Object | String]) // 在function或string中，array过滤value;
_.differenceWith([arrays], fun) // 同difference
_.intersection(arr1, arr2) // 交集
_.intersectionBy([arrays], [Array | Function | Object | String])
_.intersectionWith([arrays], [comparator])
_.xor([arrays]) // [...new Set([...arr1, ...arr2])]
_.xorBy()
_.xorWith()

_.drop(arr, [n = 1])
_.dropRightWhile(arr, [fun | attr]) // 返回有attr 或 fun为true的值 // dropTrue
_.dropWhile(arr, [fun | attr]) // 返回没有attr 或 fun为false的值 // dropFalse

_.flatten(array) // 减少一级array嵌套深度
_.flattenDeep(array) // 将array递归为一维数组
_.flattenDepth(array, [depth = 1])

_.fromPairs(array) // [['fwz',1]] => {'fwz':1} // 返回键值对对象

_.pull(array, [values]) // 返回 移除array所有与values相同的值 的原数组
_.pull(array, arr1)
_.pullAllBy(array, values, [Array | Function | Object | string])
_.pullAllWith(array, values, fun) // 改变数组
_.pullAt(array, [indexes]) // 返回所有移除index的数组

_.without(array, [values]) // 返回 移除array所有与values相同的值 的新数组

_.sortedIndex(array, value) // 返回插入value的index(从小(<=)到大), _.sortedIndex([30, 50], 40); => 1
_.sortedIndexBy(array, value, [Array | Function | Object | string]) // 
_.sortedIndexOf(array, value)
_.sortedLastIndex(array, value)
_.sortedLastIndexBy(array, value, [Array | Function | Object | string])
_.sortedLastIndexOf(array, value)

_.uniq(array) // 返回去重后的数组副本 // [...new Set(array)]
_.uniqBy([arrays], fun(a))
_.uniqWith([arrays], fun(a, b))
_.union([arrays])
_.unionBy([arrays], fun(a))
_.unionWith([arrays], fun(a, b))
_.sortedUniq(array) // [...new Set(array.sort())]
_.sortedUniqBy(array, fun)

_.take(array, [n = 1]) // 从array数组的起始元素开始提取n个元素
_.takeWhile(array, fun) // 从array数组的起始元素开始返回假值
_.takeRight(array, [n = 1])
_.takeRightWhile(array, fun)

_.zip(arr1, arr2) // [[arr1[0], arr2[0], ...], [arr1[1], arr2[1], ...]]
_.zipWith([arrays], function(a, b, c...) {})
_.unzip()
_.unzipWith([arrays], fun)
_.zipObject([props = []], [values = []]) // 返回obj
_.zipObjectDeep([props = []], [values = []]) // 极少用

//  Collection
_countBy(arr, (x) => x + 1) // 返回迭代次数的数组: _.countBy([6.1, 4.2, 6.3], Math.floor) => { '4': 1, '6': 2 }