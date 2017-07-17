算法复习
// 1 二叉树
// 1.1 层级遍历
// queue队列，广度（宽度）优先
// last: 正在打印的当前行最右节点，当弹出节点==last, last = nlast
// nlast: 下一行的最右节点，nlast随新入栈的节点更新
// 1.2序列化和反序列化（重建二叉树）
// 先序，中序，后序，层级序列化（需添加结束符）
```
	// 先序测试
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
// 2 排序:http://blog.csdn.net/fanwenzh/article/details/70174573
时间复杂度O(n2)冒泡排序, 选择排序, 插入排序（与数组有序性相关）
时间复杂度O(nlogn)归并排序，快速排序(划分值调整到首或尾, 递归调用), 堆排序(建堆, 堆顶和堆底输出堆顶, 调整堆logk), 希尔排序(递减步长的插入排序)
时间复杂度O(n) 桶排序：计数排序(按值划分桶), 基排序(按位数值划分桶)
空间复杂度
稳定性：相同元素排序后的先后顺序
工程上的排序：综合排序
1）数组较小：插入排序
2）数组较大：快速排序或其他O(nlogn)排序，按其常量系数选择排序算法

题目：
1.有序数组排序，最小调整范围为k：
1)插入排序; 2)k优化堆排序（因为递归函数调用函数栈，其空间复杂度为O(logN)，所以需要改为非递归O(1)）
2.判断数组是否有重复值，空间复杂度为O(1)
没有空间复杂度：hash表
有空间复杂度：排序后判断
3.把两个有序数组合并为一个数组，第一个数组空间正好可容纳两个数组
从后往前判断，赋值到a[length-1]
4.荷兰国旗问题：只包含0,1,2的整数数组进行排序，要求使用交换，原地排序
模拟快排，左右判断
5.二维数组中找数
右上角开始查找v[0][col],向左向下移动
6.需要排序的最短数组长度
0~n遍历最大值大于遍历i的最大index, n~0查找遍历最小值小于遍历i的最小值index，时间复杂度O(n),空间复杂度O(1);
7.给定一个整型数组arr，返回如果排序后相邻两数的最大差值：1234789，返回7-4=3；
桶排序思想：划分9-1=8个桶的区间，查找最大差值, 时间复杂度O(n),空间复杂度O(n)

// 3字符串
回文, 子串(不连续), 子序列(不连续), 前缀树(Trie树), 后缀树和后缀数组, 匹配, 字典序
1)规则判断 2)数字运算（大整数加减乘除） 3)与数组相关的操作（调整，排序，划分）4)字符计数（hash表，固定数组长度，滑动窗口，寻找无重复字符子串）5)动态规划 6)搜索类型 7)高级算法与数据结构问题（难）
1.完全独立的t1和t2树，判断t1中是否有t2树拓扑结构完全相同的子树
普通：二叉树遍历+匹配，时间复杂度O（N*M）
最优: 二叉树序列化+KMP算法: 时间复杂度O(M+N)
固定长度数组替代哈希表！
1.如果一个字符串str，把字符串任意的部分挪到后面去形成的字符串叫做str的旋转词，判断a和b是否互为旋转词；
时间复杂度O(n)判断长度 -> 生成str1+str1的大字符串 -> KMP算法判断大字符串中是否含有str2
2. 给定一个字符串str， 在单词间做逆序调整： i love you -> you love i
字符逆序函数 -> str 逆序 i love you 转化为 uoy evol i -> 每个单词逆序 you love i
3.给定字符串str, 和一个整数i。将str[0...i] 移到右侧，str[i+1...N-1]移到左侧。要求时间复杂度为O(n), 空间复杂度为O(1)
将str[0..i]字符串作逆序调整 -> str[i+1~N-1]作逆序调整 -> 3将整个str字符逆序
#4.给定一个字符串类型的数组strs，请找到一种拼接顺序，使得将所有字符串拼接起来组成的大字符串是所有可能性中字典顺序最小的，并返回这个大字符串.最优O(N*logN)
错误：比较单独每个字符串的字典顺序，而后合并
正确：如果str1+str2 < str2+str1, 则str1在前面，否则str2在前面
5.给定一个字符串str，将其中所有空格字符替换为"%20"
先判断空格数量，而后从后往左判断并赋值
6.给定一个字符串str，判断是不是整体有效的括号字符串：如str"(())", true
num代表（出现次数和)出现次数的差，遍历结束判断num==0;
7.给定一个字符串str,返回str的最长无重复字符串的长度。时间空间复杂度O(N),空间复杂度 O(N)
哈希表map -> 统计每个字符之前出现的位置
整形变量pre -> 代表以s[i-1]结尾的情况下，最长无重复子串的长度

// 4队列和栈
栈：先进后出, 队列：先进先出
可实现数组和队列的形式
栈：push, top/peek, pop, size   O(1)时间复杂度操作
队列: push, pop, front,  (双端队列, 优先级队列类stack)
深度优先(DFS, 栈), 宽度优先(BFS, 队列)
递归函数 -> 非递归实现
1. 为stack添加 返回最小元素的方法
实现: stackData, stackMin两个stack (是否重复亚茹stackMin两个方案)
2. 用两个栈实现队列, 支持队列push, pop, front操作
实现：StackPush, StackPop两个栈互倒数据
3.  实现一个栈的逆序，但只能用递归函数和这个栈的本身来操作, 不能申请而外的数据结构
返回并删除栈底元素:
public int get(stack<int> s){
	int result = s.pop();
	if(s.empty()) {
		return result;
	} else {
		int last = get(s);
		stack.push(result);
		return last;
	}
}
栈元素逆序:
public void reverse(stack<int> s) {
	if(s.empty()){
		return;
	} else {
		int i = get(s);
		reverse(s);
		s.push(i);
	}
}
4. 将栈中元素(int)从顶到底从大到小排序，只允许申请一个栈
实现: stack, res两个栈
*5. arr数组和大小为w的窗口，返回窗口内最大值的数组
arr = [4,3,5,4,3], w = 3 => [5,5,5,4,3] // 普通解法: 遍历边框w
最佳实现双端队列qmax: 记录arr的下标
6.没有重复数组的arr，生成这个数组的MaxTree函数(每一个子树的最大值为数组头)
找到每个数的左边和右边第一个比其大的数(利用stack), 每一个数的父节点为左右非null值最小的数, 其中数组中的最大值为root

// 链表