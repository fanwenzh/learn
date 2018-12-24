<!-- https://www.w3cschool.cn/java/dict -->
```java
// java 修饰符
// 访问控制修饰符：default, public, protected, private
// 非访问控制修饰符：final, abstract, strictfp(精确浮点运算)

// enum 枚举

// 一个源文件只能有一个public类
public class Puppy {
	public Puppy(String name) {
		// 构造函数
	}
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}

// 内置类型
byte, short, int, long, float, double
boolean, char, 
// 包装类：
Byte, Integer, Double, Short, Float, Long
// 包装类方法
xxxValue() // 将number对象转换为xxx数据值并返回
compareTo(), equals(), toString()
valueOf() // 转为Integer对象, parseInt()

// 类型范围
// Byte.SIZE, Byte.MIN_VALUE, Byte.MAX_VALUE
// 类型转换：低  ------------------------------------>  高
// byte,short,char—> int —> long—> float —> double 

// instanceof
// 类
Math.toString(), abs(), ceil(), floor(), round()
min(), max(), random(), sin(Math.Pi/2) 
// 字符char的包装类
Character.isLetter(), isDigit(), isWhitespace()
isUpperCase(), isLowerCase(), toUpperCase(), toLowerCase()
toString()

String:
char[] arr = {'h', 'e', 'l', 'l', 'o'}
String str = String(arr)
str.length(), concat(str1), charAt(int index), String.format()
compareTo(str), compareToIgnoreCase(str)
startsWith(), endsWith(str), equals(str)
indexOf(str1, index), lastIndexOf(str1, index)
replace(), replaceAll(), replaceFirst()
split(String regex), substring(int beginIndex, int endIndex)
toCharArray(), toLowerCase(), toUpperCase(), trim()
getBytes(), == 判断是否为同一字符串地址，equals判断字符串内容是否相同

StringBuffer() 
append(), reverse(), delete(), insert(int offset, int i), toString() // 转化为String类型
replace(int start, int end, String str), capacity() // 当前容量
StringBuilder() //同StringBuffer, 但不是线程安全
// 转换字符串的方法
包装类.toString(), String.valueOf(), 包装类+""
Integer.parseInt(str), Integer.valueOf(str) 

// 数组
// for(int x : numbers)
double [] myList;
int[] arr = new int[size]
int[] arr = {value0, value1, value2}
String strp[][] = new String[length1][length2]

java.util.Arrays // 静态方法
fill(arr, 1, 3, 8) // 1-3 位填充数字8
sort(arr, 1, 3)    // 1-3 位排序
equals(arr1, arr2)
binarySearch(arr, target) // 查找已排序的数据
copyOf(arr, 3) // substring(0, 3)
copyOfRange(arr, first, last)

Date.after(date), before(date), equals() // 返回boolean
clone(), getTime() 返回毫秒数, toString() // 返回日期
SimpleDateFormat ft = new SimpleDateFormat ("E yyyy.MM.dd 'at' hh:mm:ss a zzz");
System.out.println("Current Date: " + ft.format(dNow)); // 或ft.parse(dNow)
Calendar calender; calender.getTime()
calendarObj.YEAR, .MONTH + 1, .DAY_OF_MONTH, .HOUR_OF_DAY, .MINUTE, .SECOND
calendarObj.set(), add()

Thread.sleep(time)
System.currentTimeMillis()
Calendar.getInstance()
// 正则表达式: http://www.runoob.com/java/java-regular-expressions.html
Pattern.matches(strPattern, strContent)
String pattern = "(\\D*)(\\d+)(.*)"
Patten r = Pattren.compile(pattern) // 创建pattern对象 // throw PatternSyntaxException
Matcher m = r.matcher(line)         // m.group(0) == line, m.group(n) 为第n个捕获
m.find(), m.start(), m.end() 
m.replaceAll(), m.replaceFirst(), m.appendTail()

// 方法:method
// 命令行参数
// public static void main(String args[])
System.out.println(args[0])
// java 1.java // 执行命令

// 不确定参数: 同上
public void myMethod(double... d) {
	System.out.println(d[0]) 
}

// 重载：多方法
// 重写：覆盖
// 成员变量和局部变量同名时，局部变量优先级高（就近原则）

// 静态方法中可以直接调用同类中的静态成员，但不能直接调用非静态成员
// 普通成员方法则可以直接访问同类的非静态和静态变量
// 静态方法中不能直接调用非静态方法，需要通过new 新对象来访问非静态方法

// 静态初始化块只在类加载时执行，且只会执行一次，同时静态初始化块只能给静态变量赋值，不能初始化普通的成员变量。

// 类内存回收方法
myclassObj.finalize() // 整体回收 System.gc()
// 成员内部类
public class Outer {
	private int a = 99;
	int b = 92;
	public class Inner {
		int b = 2;
		public void test() {
			System.out.println("访问外部类中的a " + a + Outer.this.b); // outer成员变量
			System.out.println("访问内部类中的b " + b);
		}
	}
	public static class SInner {
		int b = 2;
		public void test() {}
	}

	// 测试成员内部类
	public static void main(String[] args) {
		Outer o = new Outer();
		Inner i = o.new Inner(); // 成员内部类inner 类中定义的 test() 方法可以直接访问 Outer 类中的数据，而不受访问控制符的影响
		i.test();
		SInner si = new SInner(); // 直接创建静态内部类
		si.test();
	}
}
// 方法内部类：在方法内部定义的类，不能在外部类的方法以外的地方使用，因此方法内部类不能使用访问控制符和 static 修饰符

虚方法：
Son s = new Father()
Father f = new Father()
s.method() // 调用自类方法(虚方法)

Object 类（所有类的父类）:
toString() 返回对象的哈希码（对象地址字符串）
equals() 比较的是对象的引用是否指向同一块内存地址

引用类型转换：
Dog dog = new Dog();
Animal animal = dog;
Dog dog2 = (Dog)animal; // 存在转换风险

接口：interface，可继承多个父接口
接口就是用来被继承、被实现的，修饰符一般建议用public, 不能使用private和protected修饰
接口中的常量：pulic static final修饰
[修饰符] class 类名 extends 父类 implements 接口1, 接口2
匿名内部类: Interface i = new Interface(){}

// 集合接口
Collection: 
sort() - 默认比较：comparable接口 即 compareTo()方法, 临时比较：Comparator接口， 即compare()方法
List: ArrayList // 泛型数组列表
add(int index, E object), addAll(int index, Arrays.asList(arr)),
(Course)get(index) // get方法返回Object类型，需要强制转换
size(), set(int index, E object), remove(int index, E object), removeAll(int index, Arrays.asList(arr)), 
clear, contains(Object obj)存引用 - equals, containsAll, isEmpty, 
toArray, indexOf, lastIndexOf, subList(int start, int end)
clone(), removeRange(int fromIndex, int toIndex)
// 迭代器
Iterator it = arrayListName.iterator(); it.hasNext();(arrayListName) it.next();
for(Object obj : arrList)(arrayListName)obj;
LinkedList: 构造同步List: List list = Collections.synchronizedList(new LinkedList(...)); // 链表List
Vector: 同步ArrayList, 抛出ConcurrentModificationException异常
Stack:push, pop, peel, empty, search
// 集合与数组之间的转换
String[] values = [];
HashSet<String> staff = new HashSet<>(Arrays.asList(valus))
staff.toArray(new String[staff.size()])

泛型：规定集合只能存放特定类型及其子类型的对象
x.compareTo(y) // 比较接口
public List<className> courses;
courses = new ArrayList<Course>(); // new List<String>() 泛型
泛型中不能使用基本类型，必须使用包装类: int-Integer, long-Long, boolean-Boolean
public static <E> void fanxingMethod(E[] arr){}
public static <T extends Comparable<T>> T maximum(T x, T y, T z) // 利用泛型返回最大值

// 序列化: 实现Serializable接口的类，要求
// 该类必须实现 java.io.Serializable 对象。
// 该类的所有属性必须是可序列化的。
// 序列化:
FileOutputStream fileOut = new FileOutputStream("/tmp/employee.ser");
ObjectOutputStream out = new ObjectOutputStream(fileOut);
out.writeObject(e);
out.close();
fileOut.close();
// 反序列化:
FileInputStream fileIn = new FileInputStream("/tmp/employee.ser");
ObjectInputStream in = new ObjectInputStream(fileIn);
e = (Employee) in.readObject();
in.close();
fileIn.close();

// 网络编程: url读取网页
URL url = new URL("http://www.w3cschool.cn");
URLConnection urlConnection = url.openConnection();
HttpURLConnection connection = null;
if (urlConnection instanceof HttpURLConnection) {
	connection = (HttpURLConnection) urlConnection;
} else {
	System.out.println("Please enter an HTTP URL.");
	return;
}
BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
while((String = in.readLine()) != null){}

queue: LinkedList
set(无序，不重复，永远是第一次添加的对象): HashSet
遍历set只能用foreach, iterator

Map<key(Entry类), value>: HashMap, key 和 value可为null
put(K key, V value), remove(Object key), contialsKey(), contailsValue()
Set<class> keySet = someMap.keySet(); values(), get(id)
Set<Entry<String, Student>> entrySet = students.entrySet();
for(Entry<String, Student> entry: entrySet){entry.getKey();entry.getValue();}

List与Set不同点：
contains(Object obj) - equals()
contails(Object obj) - hashCode() - equals()
indexOf(), lastIndexOf() - equals()

e.getClass().getName() // getSuperclass()
className a = Class.forName(className).new Instance() // 创建新类

// 反射
java.lang.reflect // Field, Method, Constructor
class.getFields, getMethods, getConstructors
Contructor c = class.getDeclaredContructors()
String modifiers = Modifier.toString(c.getModifiers()) // public, private, protected, static, final
Class[] paramTypes = c.getParameterTypes()
Method[] methods = cl.getDeclaredMethods()
Class retType = m.getReturnType()
String name = m.getName()
Method m1 = className.class.getMethod("getName")
m1.invoke(null, params)

// 线程
java.lang.Thread
Thread.sleep(1000);
// 创建单独线程执行任务
public interface Runnable{
	void run()
}
class MyRunnable implements Runnable {
	public void run() {
		// Mytask
	}
}
Runnable r = new MyRunnable();
Thread t = new Thread(r); // 创建新县城
t.start()
!Thread.currentThread().isInterruputed(); // 检查线程是否被中断 // interrupted() 测试当前线程是否被中断，同时将中断线程状态设置为false
t.setPriority(int newPriority);
.getState(); // 获取线程状态
.join(); // 等待线程终止
.yield(); // 让步
t.setDaemon(true); // 转换为守护进程，为其他线程提供服务的线程

// 锁对象
private Lock backLock = new ReentrantLock(); // 只要有一个线程进入临界状态，任何其他线程都无法通过lock语句 // (boolean fair); 公平策略：等待时间长的线程
private Condition condition = backLock.newCondition();
myLock.lock(); // myLock.tryLock(100, TimeUtil.MILLISECONDS) // 设置超时参数
try{
	// 临界状态
	while(c)
		condition.await() // 线程阻塞, 等待condition.signalAll()事件
	condition.signalAll() // signal(), 从等待及中随机选择一个线程，解除其阻塞状态
} finally {
	myLock.unlock();
}
// synchronized 关键字: 仅能被同一线程访问
public synchronized void method() {}
// 相当于
public void method(){
	this.intrinsicLock.lock();
	try{
		// method body
	} finally {
		this.intrinsicLock.unlock();
	}
}
// 同步阻塞: 客户端锁，不推荐使用
private Object lock = new Object();
synchronized(lock){
	// task
}
// 原子变量：并发更新标识,getter后跟setter(两个线程总看到某一成员变量的同一个值)
private volatile boolean done;
// tryLock(), trylock(long time, TimeUnit unit), lockInteruptibly() // Lock
// await(long time, timeUit unit), awaitUniterruptibly() // Condition
// 读写锁
private ReentrantReadWriteLock rwl = new ReentrantReadWriteLock(); // 构造读写锁对象
private Lock readLock = rwl.readLock();
private Lock writeLock = rwl.writeLock();
public double getTotalBalance(){ // 对所有获取方法加锁，同理writeLock.lock(), .unlock()
	readLock.lock();
	try{}
	finally {readLock.unlock();}
}

// 阻塞队列，推荐：上层开发包
import java.util.concurrent.*
BlockingQueue<File> queue = new ArrayBlockingQueue<>(10);
// add, element, offer, peek,  poll, put, remove, take
```
