# 04 - Array Cardio Day 1
1. 调试
console.table()
console.assert()
console.dir)()
2. reduce
```
// 通过传参设置val起始值
// 通过return 返回下一个val
array.reduce(function(val, a){
   return val += a;
}, 0)
```
3. 复习array其他函数
```
// map, filter, includes
const de = links.map(link => link.textContent)
                .filter(streetName => streetName.includes('de'));
// ary.sort(function(fir, sec){
    return 1; //交换，<0不交换; 通常用fir - sec、1, -1标志
})
```