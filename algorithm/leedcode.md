## 算法复习
1 二叉树
1.1 层级遍历
queue队列，广度（宽度）优先
last: 正在打印的当前行最右节点，当弹出节点==last, last = nlast
nlast: 下一行的最右节点，nlast随新入栈的节点更新
1.2序列化和反序列化（重建二叉树）
先序，中序，后序，层级序列化（需添加结束符）

## 先序测试
```C
vector<vector<int> > printTree(TreeNode* root) {
    vector<vector<int>> res;
    vector<int> curL;
    queue<TreeNode*> q;
    TreeNode* last = root;
    TreeNode* nlast = NULL;
    q.push(root);
    while(!q.empty()) {
        TreeNode* cur = q.front();
        q.pop();
        curL.push_back(cur->val);
        if(cur->left != NULL){
            q.push(cur->left);
            nlast = cur->left;
        }
        if(cur->right != NULL) {
            q.push(cur->right);
            nlast = cur->right;
        }
        if(cur == last){
            last = nlast;
            res.push_back(curL);
            curL.clear();
        }
    }
    return res;
}
```
2 排序:http://blog.csdn.net/fanwenzh/article/details/70174573
时间复杂度O(n2) 冒泡排序, 选择排序, 插入排序（ 与数组有序性相关）
时间复杂度O(nlogn) 归并排序， 快速排序(划分值调整到首或尾, 递归调用), 堆排序(建堆, 堆顶和堆底输出堆顶, 调整堆logk), 希尔排序(递减步长的插入排序)
时间复杂度O(n) 桶排序： 计数排序(按值划分桶), 基排序(按位数值划分桶)
空间复杂度
稳定性： 相同元素排序后的先后顺序
工程上的排序： 综合排序
1） 数组较小： 插入排序
2） 数组较大： 快速排序或其他O(nlogn) 排序， 按其常量系数选择排序算法

# 二叉树合并
```C
Node* reduce(Node* t1, Node* t2){
    if(t1 == NULL)return t2;
    if(t2 == NULL)return t1;
    t1->val += t2->val;
    t1->left = reduce(t1->left, t2->left);
    t1->right = reduce(t1->right, t2->right);
    return t1;
}
```
题目：
1. 有序数组排序， 最小调整范围为k：
1) 插入排序;
2) k优化堆排序（ 因为递归函数调用函数栈， 其空间复杂度为O(logN)， 所以需要改为非递归O(1)）
2. 判断数组是否有重复值， 空间复杂度为O(1)
没有空间复杂度： hash表
有空间复杂度： 排序后判断
3. 把两个有序数组合并为一个数组， 第一个数组空间正好可容纳两个数组
从后往前判断， 赋值到a[length - 1]
4. 荷兰国旗问题： 只包含0, 1, 2 的整数数组进行排序， 要求使用交换， 原地排序
模拟快排， 左右判断
5. 二维数组中找数
1）右上角开始查找v[0][col], 向左向下移动2）二分查找
6. 需要排序的最短数组的长度
0~n遍历最大值大于遍历i的最大index, n~0 查找遍历最小值小于遍历i的最小值index， 时间复杂度O(n), 空间复杂度O(1);
7. 给定一个整型数组arr， 返回排序后相邻两数的最大差值： 1234789， 返回7 - 4 = 3；
桶排序思想： 划分1 - 9 为 n（题中为7） 个桶的区间， 查找最大差值, 时间复杂度O(n), 空间复杂度O(n)

## 3字符串
回文, 子串(不连续), 子序列(不连续), 前缀树(Trie树), 后缀树和后缀数组, 匹配, 字典序
1) 规则判断 2) 数字运算（ 大整数加减乘除） 3) 与数组相关的操作（ 调整， 排序， 划分） 4) 字符计数（ hash表， 固定数组长度， 滑动窗口， 寻找无重复字符子串） 5) 动态规划 6) 搜索类型 7) 高级算法与数据结构问题（ 难）
1. 完全独立的t1和t2树， 判断t1中是否有t2树拓扑结构完全相同的子树
普通： 二叉树遍历 + 匹配， 时间复杂度O（ N * M）
最优: 二叉树序列化 + KMP算法？: 时间复杂度O(M + N)
固定长度数组替代哈希表！
1. 如果一个字符串str， 把字符串任意的部分挪到后面去形成的字符串叫做str的旋转词， 判断a和b是否互为旋转词；
时间复杂度O(n) 判断长度 - > 生成str1 + str1的大字符串 - > KMP算法判断大字符串中是否含有str2
2. 给定一个字符串str， 在单词间做逆序调整： i love you - > you love i
字符逆序函数 - > str 逆序 i love you 转化为 uoy evol i - > 每个单词逆序 you love i
3. 给定字符串str, 和一个整数i。 将str[0...i] 移到右侧， str[i + 1...N - 1] 移到左侧。 要求时间复杂度为O(n), 空间复杂度为O(1)
将str[0..i] 字符串作逆序调整 - > str[i + 1~N - 1] 作逆序调整 - > 3 将整个str字符逆序
#4.给定一个字符串类型的数组strs，请找到一种拼接顺序，使得将所有字符串拼接起来组成的大字符串是所有可能性中字典顺序最小的，并返回这个大字符串.最优O(N*logN)
错误：比较单独每个字符串的字典顺序，而后合并
正确：如果str1+str2 < str2+str1, 则str1在前面，否则str2在前面
5.给定一个字符串str，将其中所有空格字符替换为"%20"
先判断空格数量，而后从后往左判断并赋值
6.给定一个字符串str，判断是不是整体有效的括号字符串：如str"(())", true
num代表（出现次数和)出现次数的差，遍历结束判断num= = 0;
7. 给定一个字符串str, 返回str的最长无重复字符串的长度。 时间空间复杂度O(N), 空间复杂度 O(N)
哈希表map - > 统计每个字符之前出现的位置
整形变量pre - > 代表以s[i - 1] 结尾的情况下， 最长无重复子串的长度

## 4队列和栈
栈： 先进后出, 队列： 先进先出
可实现数组和队列的形式
栈： push, top / peek, pop, size O(1) 时间复杂度操作
队列: push, pop, front, (双端队列, 优先级队列类stack)
深度优先(DFS, 栈), 宽度优先(BFS, 队列)
递归函数 - > 非递归实现
1. 为stack添加 记录每一弹出一个元素剩下元素最小元素的方法
实现: stackData, stackMin两个stack(是否重复stackMin两个方案)
2. 用两个栈实现队列, 支持队列 push, pop, front操作
实现： StackPush, StackPop两个栈互倒数据
3. 实现一个栈的逆序， 但只能用递归函数和这个栈的本身来操作, 不能申请而外的数据结构
```C
// 返回并删除栈底元素:
    public int get(stack < int > s) {
        int result = s.pop();
        if (s.empty()) {
            return result;
        } else {
            int last = get(s);
            stack.push(result);
            return last;
        }
    }
// 栈元素逆序:
    public void reverse(stack < int > s) {
        if (s.empty()) {
            return;
        } else {
            int i = get(s);
            reverse(s);
            s.push(i);
        }
    }
```
4. 将栈中元素(int) 从顶到底从大到小排序， 只允许申请一个栈
实现: stack, res两个栈 
* 5. arr数组和大小为w的窗口， 返回窗口内最大值的数组
arr = [4, 3, 5, 4, 3], w = 3 => [5, 5, 5, 4, 3] // 普通解法: 遍历边框w
最佳实现双端队列qmax: 记录arr的下标
6. 没有重复数组的arr， 生成这个数组的MaxTree函数(每一个子树的最大值为数组头)
找到每个数的左边和右边第一个比其大的数(利用stack), 每一个数的父节点为左右非null值最小的数, 其中数组中的最大值为root

## 5链表
单链表, 双链表, 普通链表, 循环链表
1. 给定整数n， 如何在节点值有序的环形链表中插入一个节点值为num的节点， 并保证链表有序
    1. 链表为空, 节点指向自己
    2. pre, cur循环遍历
    3. 循环后放置头部或末尾
2. 给定链表的头节点head, 再给定一个数num, 请把链表调整成节点值小于Num在链表左边， 等于num在中间， 大于num在链表右边
    1) 把链表放入数组, 再排序;
    2) 遍历划分链表
3. 每k个节点逆序
    1) stack（ 空间复杂度为O(k)）
    2) 遍历
4. 判断链表回文
    1) 利用stack逆序再比较
    2) 快指针2步, 慢指针1步, 将慢指针压stack
    3) 快指针2步, 慢指针1步, 找中间节点, 并将后半段逆序, 比较后并再将后半段逆序回来
5. 复制不仅含有next指针, 还含有random指针的链表;
    第一次遍历拷贝每个节点, 并置于原节点;
    第二次遍历将random指向正确节点;
    第三次遍历将拷贝节点连成链;
6. 判断单链表是否有环, 返回环入口节点
    1） 快慢指针, 相遇后快指针重新在头结点开始， 每次1步向前走
    2) 哈希表
7. 判断两个无环单链表是否相交, 返回相交头结点
    1) 哈希表
    2) 利用相交尾部一定相等
8. 判断两个有环单链表是否相交， 返回相交头节点
    1) 找到入环节点, 判断两者是否等
    2) 开始到入环节点是否有相交节点(题7)

## 6二分搜索
有序序列O(logN), 有序循环数组; // 重点在边界条件判定
mid = left + (right - left)/2; //以防溢出
1.返回局部最小位置: a[i]< a[i-1]&&a[i]<a[i+1], 二分查找O(logN)
    判断长度为0和1 - 判断left和right - 二分查找
2.有序重复数组查找Num最左边出现的位置
*3.查找循环数组(折叠)中的最小数字
    1) 如果arr[l] < arr[r], l-r有序, 返回l
    2) 则arr[l] >= arr[r]
            如果arr[l] > arr[m], 最小值在l和m之间
            如果arr[m] > arr[l], 最小值在m和r之间
            arr[l] <= arr[m], arr[m] <= arr[r], 则arr[l] = arr[m] = arr[r] -> 通过遍历l-r搜索
4.不含重复的有序数组arr, 寻找满足arr[i] = i的最左位置
    先判断arr[0] > n-1, 后判断m
5.给一棵完全二叉树，返回这个数的节点个数.普通解法O(N), 二分解法O(logN)
    遍历root的最左子节点, 得到高度H, 遍历root右节点的最左子节点
        如果能到达最后一层，计算左子数h-1层的节点个数, 再递归计算root的右节点个数
        否则root的右子树为高度h-2的满二叉树, 再递归计算root的左节点个数
6.求整数k的n次方
    10^75 = 10^64 * 10^8 * 10^2 * 10

## 7二叉树
先序遍历, 非递归
stack: 先压右后压左
中序遍历,非递归
stack: 不断压左节点，弹出输出，再输入加入右节点，至stack空
*后序遍历，非递归
1)两个栈实现:
    1.把头结点压入s1中。 
    2.从s1中弹出的节点即为cur，然后先把cur的左孩子压入s1中，再把cur的右孩子压入s1中
    3.在这个过程中,每一个从s1中弹出的节点都放进第二个栈s2中
    4.重复步骤2和3, 直到s1为空
    5.从s2中弹出节点并打印，为后续遍历顺序
2)一个栈实现:
    1.h最近弹出并打印的节点, c为栈顶节点, 初始为null
    2.令c等于stack的栈顶节点，但是不从stack中弹出, 分以下三种情况
        (1)如果c的左孩子不为空, 且h不等于c左、右孩子, 则把c压入stack中
        (2)如果1不成立，并且c的右孩子不为空，并且c的右孩子不为空，并且h不等于c的右孩子，则把c的右孩子压入stack中
        (3)如果1、2都不成立，那么从stack弹出c并打印，令h等于c
    3.一直重复2，直到stack为空

## 8二叉树按层遍历, 队列queue
last, nlast 打印层级
1.给定二叉树头结点head, 并已知二叉树节点值的类型为32整型, 设计序列化(转字符串)和反序列化方案
    按先序（中序，后序）str="", "#"表示空节点null, ”!“表示节点值的结束
子树\平衡二叉树(AVL树)左右子节点的高度差不超过1
判断是否为平衡二叉树（后续遍历）
```C
public boolean isBalance(Node head) {
    boolean res = true;
    getHeight(head, 1, res);
    return res;
}
public int getHeight(Node head, int level, boolean& res) {
    if(head == null) 
        return level;
    int LH = getHeight(head.left, level + 1, res);
    if(!res) 
        return level;
    int RH = getHeight(head.right, level+1, res);
    if(!res)
        return level;
    if(Math.abs(LH - RH)>1)
        res = false;
    return Math.max(LH, RH);
}
```

## 9搜索二叉树，每棵树的头结点的值逗比各自左子树上的所有节点值大，比右节点值小，即中序排列后为从小到大递增序列
2. 给定head, 判断是否为搜索二叉树
中序遍历, 逐个比较
满二叉树的节点个数 N = 2^L - 1
完全二叉树，除最后一层外，L - 1为满二叉树，且缺少的子节点都在最后一层右侧
3.判断完全二叉树
1)按层遍历，当前节点有右节点但没有做节点,返回false;如果当前节点并不是左右孩子都有，则之后的节点必须为叶子，否则返回false;结束返回true
节点类型: 数据项, 左孩子, 右孩子;工程上通常包含指向父亲的指针;
后继节点: 中序遍历序列的下一个节点
前驱节点：中序遍历中的前一个节点
4. 在有父节点的二叉树中，给定其中的任意一个节点node，返回其后继节点
    1)先找到root节点，而后按中序排列, 找到后继节点。 时间空间复杂度都为O(n)
    2)如果node有右子树, 则后继节点为右子树上最左边的节点。时间复杂度为O(L),空间复杂度为O(1)
        如果没有右子树，则判断node是否为父节点的左孩子。
            左孩子则返回父节点
            右孩子则向上查找父节点，直到cur为父节点的做孩子为止, 返回父节点
            如果父节点为null, 则没有后继节点, 返回null
5.  纸条从下到上对折n次，从上到下打印折痕的方向。 n = 3 => 下下上 (中序遍历)
递归实现
*6. 一棵搜索二叉树, 调换了两个节点位置, 找出这两个错误节点
1)中序遍历, 错误节点出现降序;
如果出现两次降序, 第一个错误节点为第一次降序较大的节点，第二个错误的节点为第二次降序较小的节点。1,5,3,4,2 调换 2,5 => 1,2,3,4,5
如果只出现一次降序, 第一次错误节点为这次降序时的较大节点, 第二个错误节点为这次降序时的较小节点。 1,2,4,3,5 调换 4,3 => 1,2,3,4,5
*7.数中向上走和向子节点走的步数为1，求整棵数的最大距离
1)h左子树的最大距离; h右子树的最大距离; h左子树和右子树最远距离+1
后序遍历：
对每棵子树执行, 对root, 处理h的左子树得到最大距离Lmax1, 及左子树距离root的最远距离lmax2, 同理处理右子子树得Rmax1, Rmax2, 比较Rmax1, Rmax2 和 Lmax1 + Rmax2 + 1
8.给头结点head, 所有结点值不一样，找到含有节点最多的搜索二叉子树，并返回头结点

## 10位运算: & | ^ ~ << >> >>>
1. 布隆过滤器:k个哈希函数(输出域>=m), bitArray长度为m(映射结果)
大小为m, 样本数量为n, 失误率为p
m = - (n*ln p) / (ln2)^2, k = ln2 * m/n, 实际失误率p 
2. 不用额外空间, 交换整数a、b的值
a = a^b, b = a^b, a = a^b
异或运算^满足交换律和结合律, p^p=0, p^0=p

## 11排列组合
组合法、划分法、隔板法
卡特兰数公式:
蓄水池算法

## 12大数据
hash函数：大范围输入域，固定范围输出域
hash函数的优劣：输出域均匀分布
Map-Reduce
1. Map阶段: 用哈希函数将大任务分成子任务
2. Reduce阶段: 
hashMap, bitMap

## 13动态规划：暴力搜索、记忆搜索、动态规划
1.钱数arr=[5,10,25,1],组成aim=1000块的方法总数
```C
// 记忆搜搜：时间复杂度O(arr*aim的平方)
public int coins2(int[] arr, int aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return 0;
  }
  int[][] map = new int[arr.length + 1][aim + 1]
  return process2(arr, 0, aim, map)
}
public int process2(int[] arr, int index, int aim, int[][] map) {
  int res = 0;
  if (index == arr.length) {
    res = aim == 0?1:0;
  } else {
    int mapValue = 0;
    for (int i = 0; arr[index]*i <= aim; i++) {
      mapValue = map[index + 1][aim-arr[index]*i];
      if (mapValue != 0) { // 匹配数不为0
        res += mapValue == -1?0:mapValue; // 匹配数不为空，则已进行计算
      } else {
        res += process2(arr, index + 1, aim -arr[index]*i, map);
      }
    }
  }
  map[index][aim] = res == 0? -1: res;
  return res;
}
// 动态规划：申请空间记录每一个暴力搜索的计算结果(规定计算顺序的记忆搜索)，时间复杂度O(arr*aim)
背包、换钱、字符串替换(插入代价ic, 删除代价dc, 替换代价rc)
 
```