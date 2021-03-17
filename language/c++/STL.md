### vector:
	1.赋值
		v.assign(begin, end) //迭代器
		v(n, val)
	2.访问元素
		v.begin(), v.rbegin(), v.end(), v.rend()  //迭代器
		v.back(), v.front()   //值访问
	3.添加元素
		v.push_back(), v.insert(q, val)
	  删除元素
	  	v.pop_back(), v.erase(q) or v.erase(q, end), v.clear()
	4. 容器大小
		v.size(), c.empty()

### queue:
	q.pop(), q.push(x), q.front(), q.back(), q.empty(), q.size()

	deque:双端队列
		q.push_back(), q.push_front()
		q.pop_back(), q.pop_front(), 
		q.insert(q, e), q.erase(q), q.clear()
	priority_queue: 优先队列
		q.push(), q.pop(), q.top(), q.size(), q.empty(), q.erase()
		priority_queue<int,vector<int>,greater<int>/less<int> >q;
		
### stack
	s.push(x), s.pop(), s.top(), s.size(), s.empty()

### pair
	pair<t1, t2> p(key, value), make_pair(k, v)
	p.first, p.second

### set/unordered_set
	1.元素访问
		s.begin(), s.end(), s.rbegin(), s.rend()
	2.元素添加
		s.insert()
	3.删除
		s.erase(it), clear()
	4.访问
		s.size(), s.empty(), 
		s.find() *it or s.end()
		s.count() *it or 0;
### map/unordered_map
	1.元素访问
		m.begin(), m.end(), m.rbegin(), .rend(), 
	  数组方式访问
	  	map[a]
	2.添加元素
		iter = m.insert(make_pair(a, b))//不能覆盖, 返回迭代器，插入成功iter.second == true
		iter = m.insert(iter2, e) ;
		m[a] = b//覆盖, key为int时可用 for(int i = 0; i < m.size(); i++)遍历
	3.删除
		m.erase(key), m.clear();
	4.访问
		s.size(), s.empty(), 
		s.find(key) *it or s.end()
		s.count(key) *it or 0;
	iter->first, iter->second
### 指针iterator
	map<int, string>::iterator  iter;

ASCII表字符: 0~127
	0: ' '
char word;
int temp[128] = {0};
while(cin >> word){
    if(word >= 0 && word <= 127){ // char类型可直接比较
        temp[word]++;             // 并直接插入
    }
}

初始化：
	int s[100] = {0};
	vector< vector<int> > v(10, vector<int>(10, 0));

排序：
bool compare(const string& s1, const string &s2) {
	return s1 < s1; // 可直接字符串比较
}
sort(res.begin(), res.end(), compare); // sort！！！
sort(res.begin(), res.end(), less<int>())  // greater<int>()
stable_sort() 对给定区间所有元素进行稳定排序  

输入带空格的字符串
1)#include<stdio.h>  gets(char *str)
2)#include<stdio.h>  scanf("%[^\n]", str) //正则匹配：非\n
3)#include<string>  getline(cin, string str)

string input;
vector<string>arr;
while(cin>>input){
    arr.push_back(input);
}

大小写转换
#include <algorithm>
transform(strA.begin(), strA.end(), strA.begin(), ::toupper)
transform(strA.begin(), strA.end(), strA.begin(), ::tolower)
toupper(str[i]), tolower(str[i])

幂运算
#include<math.h>
pow(x, y)

输入十六进制转换十进制
int a;
cin>>hex>>a;
个人实现：
for (int i = 2; i < str.length(); ++i) {
    if (str[i] >= '0' && str[i] <= '9')
        num = num * 16 + (str[i] - '0');
    else
        num = num * 16 + (str[i] - 'A' + 10);
}