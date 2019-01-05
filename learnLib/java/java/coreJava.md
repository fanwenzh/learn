```java
// 字符串
str = str.substring(0,3) + 'p';
str1.equals(str2);
str1.equalsIgnoreCase("hello");
str1.compareTo("hello") == 0; // c++ 写法
if(str != null && str.length() != 0)

// StringBuilder
StringBuilder builder = new StringBuilder();
builder.append("hello");
String str = builder.toString();

// Scanner 
Scanner in = new Scanner(System.in);
Stiing name = in.nextLine();
String firstName = in.next(); // 读取一个单词
int age = int.nextInt();
// Console 密码输入
Console cons = System.console();
String username = cons.readLine("User name: ");
char[] passwd = cons.readPassword("Password: ");

// 格式化输出
System.out.print(x);
System.out.println(); // 末尾加"/n"
System.out.printf("%8.2f", x);
String message = String.format("hello, %s. Next year.", name);

// 文件的输入与输出
Scanner in = new Scanner(Paths.get("c:\\mydirector\\myfile.txt"));
Scanner in = new Scanner("c:\\mydirector\\myfile.txt") // error: 地址解析错误
PrintWriter out = new PrintWriter("myfile.txt"); // 写入文件

// BigInteger大数值: java没有提供运算符重载功能
BigInteger c = a.add(b); // a+b

// 数组
int[] a = new int[100];
int[] b = {2, 3, 4, 5};
// 数组操作
Arrays.toString(a); // [2,3,4,5]
Arrays.copyOf(); // 数组拷贝
// 扩展数组
// Employee[] a = new Employee[100];
// a = Arrays.copyOf(a, 2 * a.length);
Arrays.sort(a);
Arrays.getLength(a);

// 循环
for (int element: myList)
for (int i = 0; i < array.length; i++)

// 二维数组
int[][] magicSquare = {
	{1,2,3,4},
	{5,6,7,8},
	{9,10,11,12},
	{13,14,15,16}
}
Arrays.deepToString(a); // 二维数组toString
// 不规则数组
int[][] odds = new int[nmax + 1][];

// Date
// getDay(), getMonth, getYear()
// GregorianCalendar
GregorianCalendar time = new GregorianCalendar(1999, 11, 31, 23, 59, 59); // 1999年12月31日23时59分59秒

// 随机数
Math.random();
Math.nextInt(int n);

```

```java
// 类
Employee.getNextId(); // 类名调用类静态方法
// java中对象引用进行的是值传递
```
<!-- http://blog.csdn.net/DayDreamingBoy/article/details/9701655 -->
```c
void swap(int* a, int* b)  
{  
    int *t = b;  
    b = a;  
    a = t;  
    printf("In swap: %d %d\n", *a, *b);  
}  
  
void main(void)  
{  
    int a = 1;  
    int b = 2;  
    swap(&a, &b);  
    printf("%d %d\n", a, b);  
}  
// In swap: 2 1 
// 1 2  
```
```java
class Employee{
	private static int nextId = 1;
	private in id;

	// 初始化块
	{
		id = nextId;
		// System.exit(0);
	}
	public Employee(double s)
	{
		this("Employee"); // 调用其他重载的构造器
		nextId++;
	}
}
// Runtime.addShutdownHook // 关闭钩子
// java中所有的继承都是共有继承
// 可以将子类的对象赋给超类变量：指向超类调用超类方法，指向子类调用子类方法
// 不能将超类对象赋值给子类
class Manager extends Employee
{
	public Manager()
	{
		super("Employee");
	}
	// ...可以接受任意数量的对象
	public Manager(String fmt, Object... args) {
	}
}
// 包含一个或多个抽象方法的类本身必须被声明为抽象
abstract class Person
{

}
// intanceof 判断类归属，但没有解决子类的情况

// 控制可见性
// private 仅对本类可见
// public 对所有类可见
// protected 对本包和所有子类可见
// 对本包可见 默认

x.toString() == +x;

// ArrayList泛型数组列表: 动态数组（第三方加入标准库）
ArrayList<Employee> staff = new ArrayList<>(); // ArrayList<Employee> staff = new ArrayList<>(100);
starff.ensureCapacity(100); // 固定数组大小
staff.trimToSize(); // 减少数组大小
staff.add(index, staff1);
staff.size();
staff.remove(index);
staff.set(index, staff1);
staff.get(index);
staff.contains(obj);

// 枚举类 191
public enum Size {SMALL, MEDIUM, LARGE}
```

java反射机制
```java
// 反射：检查类的结构 Object.class
Employee e = new Employee();
// 取得Class实例三种方法
Class cl1 = e.getClass();
Class cl2 = Class.forName("Employee");
Class cl3 = Employee.class;
cl1.newInstance(); // 取得该class的一个实例
cl1.getClassLoader(); // 返回该类的类加载器
cl1.getComponentType(); // 返回表示数组类型的Class
cl1.getSuperclass(); // 返回此Class所表示的实体
cl1.isArray(); // 判断Class对象是否表示一个数组类

// 返回int类型表示的String类型的修饰符：PUBLIC: 1, PRIVATE: 2
String modifiers == Modifier.toString(c.getModifiers());
// 获取构造函数的修饰
Constructor[] constructors = cl.getDeclaredConstructors();
for (Constructor c : constructors) {
	String name = c.getName();
	String modifiers = Modifier.toString(c.getModifiers());
	Class[] paramTypes = c.getParameterTypes();
}
// 方法
Mothed[] mothods = cl.getDeclaredMethods();
for (Mothod m : mothods)
{
	Class retType = m.getReturnType();
	String name = m.getName();
	Class[] paramTypes = m.getParameterTypes();
}
// 从对象中获取方法:getMethod 
Method m1 = Employee.class.getMethod("methodName", double.class);

m1.getFields() // 取得某个类所有公共字段:public
m1.getDeclaredFields() // 取得某个类所有声明字段：public, private, protected
m1.getConstructors()、getDeclaredConstructors()、getMethods()、getDeclaredMethods()

// http://azrael6619.iteye.com/blog/429797
// 利用反射机制执行某对象方法
public Object invokeMethod(Object owner, String methodName, Object[] args) throws Exception {  
	// 区别owner.getClass()
     Class ownerClass = owner.getClass();  
     Class[] argsClass = new Class[args.length];  
     for (int i = 0, j = args.length; i < j; i++) {  
         argsClass[i] = args[i].getClass();  
     }  
     Method method = ownerClass.getMethod(methodName,argsClass);  
     // 区别method.invoke(null, args); 
     return method.invoke(owner, args);  
}  
// 利用反射机制执行某个类的静态方法
public Object invokeStaticMethod(String className, String methodName,  
             Object[] args) throws Exception {  
     Class ownerClass = Class.forName(className);  
     Class[] argsClass = new Class[args.length];  
     for (int i = 0, j = args.length; i < j; i++) {  
         argsClass[i] = args[i].getClass();  
     }  
    Method method = ownerClass.getMethod(methodName,argsClass);  
     return method.invoke(null, args);  
 } 

// 新建数组
Object newArray = Array.newInstance(componentType, newLength);
```

接口
```java
import javax.swing.Timer;

// 比较接口（Array.sort()函数）
public interface Comparable
{
	int compareTo(Object other);
}

public class Employee implements Comparable<Employee>, Cloneable, ActionListener
{
	// 实现比较接口函数
	public int compareTo(Employee othoer)
	{
		return Double.compare(salary, other.salary);
	}
	// 实现clone克隆解扩函数
	public Employee clone () throws CloneNotSupportedException
	{
		return (Employee) super.clone();
	}
	// 实现回调接口函数
	public void acionPerformed(ActionEvent event)
	{
		// 暂不了解
		Toolkit.getDefaultToolkiy().beep();
	}
}
// 内部类（暂时跳过）

// 线程
class BallRunnable implements Runnable{}
Runnable r = new BallRunnable();
Thread t = new Thread(r);
t.sleep(500);
t.start();  // t.run()
// 中断线程
Thead t = Thead.currentThread(); // 获得当前线程
t.inperrput(); // 中断请求
t.inperrputed()； // 测试中断请求
t.isInterrupted(); // 判断是否中断
// 线程状态：New, Runnable, Blocked, Waiting, Timed waiting, Terminated
t.join(); // 等待终止指定的线程
t.join(500); // 经过500ms终止线程
t.getState(); // 获取线程状态：NEW, RUNNABLE, BLOCKED, WAITING, THMED_WAITING, TERMINATED
t.setPriority(int newPriority); // 设置优先级

// 锁对象
Lock backLock = new ReentrantLock();
Lock backLock2 = new ReentrantLock(boolean fair); // 公平锁：等待更长时间的线程
bankLock.lock();
bankLock.unlock();
// 锁相关的条件对象
Condition sufficientFunds = bankLock.newCondition();
sufficientFunds.await(); // 等待获得线程锁，区别于线程的await -- 将该线程放到条件的等待集中
sufficientFunds.signalAll(); // 打开线程
sufficientFunds.signal(); // 从该条件的等待集中随机选择一个线程，解除其阻塞状态
// synchronized关键字，对象的内部锁
public synchronized void transfer(int from, int amount)
{
	while (accounts[from] < amount)
		wait(); // .await()
	accounts[from] -= amount;
	accounts[to] += amount;
	notifyAll(); // .signalAll()
}
// 创建读写锁
// (1) 构造读写锁对象
private ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();
// (2) 抽取读锁写锁
private Lock readLock = rwl.readLock();
private Lock writeLock = rwl.writeLock();
// (3) 对所有的获取方法加读写锁
public double getTotalBalance()
{
	readLock.lock();
	try{}
	finally {readLock.unlock();}
}
// (4) 对所有的司改方法加写锁
public void transfer()
{
	writeLock.lock();
	try{}
	finally {writeLock.unlock();}
}
thread.suspend();
thread.stop();
thread.suspend();

// 线程阻塞队列 ？暂认识不深，跳过

// 流与文件
// Path类, 目录名列表
// File类，中等长度文本文件
byte[] fileBytes = Files.readAllBytes(path);
Strubg content = new String(bytes, charset); // 字符串读入
List<String> lines = Files.readAllLines(path, charset); // 按行读入
Flies.write(path, content.getBytes(charset)); // 将字符串写入文件中
// 大文件写入
InputStream in = Files.newInputStream(path);
OutputStream out = Files.newOutputStream(path);
Reader in = Files.newBufferedReader(path, charset);
Writer out = FIles.newBufferedWriter(path, charset);
// 复制、移动和删除文件
Files.copy(fromPath, toPath);
Files.move(fromPath, toPath);
Files.delete(path);
Files.deleteIfExists(path);
// 创建目录和文件(如果文件存在则会抛出异常)
Files.createDirectory(path);
Files.createDirectories(path);
Files.createFile(path);
Path newPath = Files.createTempFile(dir, prefix, suffix);
Path newPath = Files.createTempDirectory(dir, prefix);
// 获取文件信息
BasicFileAttributes attributes = files.readAttributes(path, BasicFileAttributes.class);
// ByteBuffer, CharBuffer
// 文件锁
FileChannel = FileChannel.open(path);
FileLock lock = channel.lock(); // FileLock lock = channel.tryLock();

```