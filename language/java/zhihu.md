https://www.zhihu.com/question/56110328

## 输入输出流
```java
BufferedReader br = new BufferedReader(new InputStreamReader(System.in)); // br.read() 读一个字符, br.readLine() 读字符串
/*
	do{
		c = (char) br.read(); // r.readLine()
		System.out.println(c);
	} while(c != 'q'); // !str.equals("end")
*/
FileInputStream readfile = FieInputSteam(File file) // String Path
byte buffer[] = new byte[2500];// 创建字节数组
int off = readfile.read(buffer, 1, 2000) ;
String str = new String(buffer, 0, b, "Default");
readfile.close()
	.read() // 1个字节
	.read(byte[] b)
	.read(byte[] b, int off, int len) // off: 偏移量
	.skip(long n)

InputStream f = new FieInputSteam(File file);
OutputStream os = FileOutputStream(File file, boolean append)
FileOutputStream(String pathname, boolean append)
	.close()
	.write(byte[] b)
	.write(byte[] b, int off, int len)
	.write(int b)
// OutputStreamWriter // 写入缓冲区

文件和i/o
// File(String pathname)
File d = new File(dirname);
// InputStream f = new FileInputStream(d)
d.mkdir(); // 创建目录
d.isDirectory(), d.list() // 包含的文件和文件夹列表

// Scanner 获取用户输入
Scanner scan = new Scanner(System.in);
scan.next() // 空格结束
/* if(scan.hasNext()){   
		String str1 = scan.next();
		System.out.println("输入的数据为："+str1);  
	}  */
if(scan.hasNextLine()){   // enter结束
	String str2 = scan.nextLine();
	System.out.println("输入的数据为："+str2);  
}  
Scanner console = new Scanner(System.in);
Scanner in = new Scanner(Path.get("myfile.txt")) // 文件读取
PrintWriter out = new PrintWriter("myfile.txt") // 文件写入

```

<!-- instanceof -->
## 继承:仅支持单继承
```java
class Manager extends Employee {
	Manager() {
		super();
		// this() 调用本身
	}
	public void test() {
		super.test(); // 调用父类方法
	}
	public final String getName() { // 不能被重写
		return null;
	}
}
// 抽象
// 抽象类就是一个专门用来扩展的祖先类
// 抽象方法起一个占位的作用
```

## Object类
```java
equals(Object obj) // ==: 比较内存首地址
finalize()
getClass() // 获得该类
hashCode() // 为了提高比较效率，java底层会先判断hashCode是否相等，如果hashCode相等，在来判断equals是否相等，如果hashCode不相等，则不会判断equals而直接返回false,只有hashCode相等，而且equals也相等，才会认为两个对象完全相等
notify
notifyAll();
wait()
clone()
toString()
```

## Java对象包装器 自动打包解包
```java
// 每一个基本类型 都有一个与之对应的类，这个类就称为对象包装器。 将基本类型包装为一个对象(类)
int -  // Long、Double、Float、Short、Byte、Character
```

## 反射机制
http://www.cnblogs.com/lzq198754/p/5780331.html
```java
// 实例化类对象
package net.xsoftlab.baike;
public class TestReflect {
    public static void main(String[] args) throws Exception {
        Class<?> class1 = null;
        Class<?> class2 = null;
        Class<?> class3 = null;
        // 一般采用这种形式
        class1 = Class.forName("net.xsoftlab.baike.TestReflect");
        class2 = new TestReflect().getClass();
        class3 = TestReflect.class;
        // 方法一, 创建类实例
        TestReflect t1 = (TestReflect) class1.newInstance(); 
        // 方法二, 通过构造函数创建
		Constructor<?> cons[] = class1.getConstructors();
		Class<?> clazzs[] = cons[i].getParameterTypes();
		TestReflect t2 = (TestReflect) cons[0].newInstance(); // 可判断参数

        System.out.println("类名称   " + class1.getName());
        System.out.println("类名称   " + class2.getName());
        System.out.println("类名称   " + class3.getName());
        Class<?> parentClass = class1.getSuperclass(); // 获得父类
        Class<?> intes[] = clazz.getInterfaces(); // 获取所有的接口

        // 获得所有本类属性
        Field[] field = class1.getDeclaredFields();
        // 取得实现的接口或者父类的属性
        Field[] filed1 = clazz.getFields();
        // 获取权限修饰符
        // 权限修饰符
        int mo = field[i].getModifiers();
        String priv = Modifier.toString(mo);
        // 获得属性类型
        Class<?> type = field[i].getType();
    	System.out.println(priv + " " + type.getName() + " " + field[i].getName() + ";");

    	// 获得类方法
    	Method method[] = class1.getMethods();
    	Class<?> returnType = method[i].getReturnType();
        Class<?> para[] = method[i].getParameterTypes(); // para[j].getName()
        // 权限修饰符
        int temp = method[i].getModifiers();
        System.out.print(Modifier.toString(temp) + " ");
        System.out.print(returnType.getName() + "  ");
        System.out.print(method[i].getName() + " ");
        // 获取异常信息
        Class<?> exce[] = method[i].getExceptionTypes(); // exce[k].getName()

        // 调用某个类方法
        Class<?> clazz = Class.forName("net.xsoftlab.baike.TestReflect");
        // 调用TestReflect类中的reflect1方法
        Method method = clazz.getMethod("reflect1");
        method.invoke(clazz.newInstance());
        method = clazz.getMethod("reflect2", int.class, String.class);
        method.invoke(clazz.newInstance(), 20, "张三"); // args

        // 通过反射机制操作某个类的属性
        Field field = clazz.getDeclaredField("proprety");
        field.setAccessible(true);
        field.set(obj, "Java反射机制");
        System.out.println(field.get(obj));

        // 反射机制的动态代理
        // 获取类加载器的方法
		TestReflect testReflect = new TestReflect();
		System.out.println("类加载器  " + testReflect.getClass().getClassLoader().getClass().getName());
		import java.lang.reflect.InvocationHandler;
		import java.lang.reflect.Method;
		import java.lang.reflect.Proxy;
		interface Subject { //定义项目接口
		    public String say(String name, int age);
		}
		class RealSubject implements Subject { // 定义真实项目
		    public String say(String name, int age) {
		        return name + "  " + age;
		    }
		}
		class MyInvocationHandler implements InvocationHandler {
		    private Object obj = null;
		    public Object bind(Object obj) {
		        this.obj = obj;
		        return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), this);
		    }
		    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		        Object temp = method.invoke(this.obj, args);
		        return temp;
		    }
		}
		/**
		 * 在java中有三种类类加载器。
		 * 1）Bootstrap ClassLoader 此加载器采用c++编写，一般开发中很少见。
		 * 2）Extension ClassLoader 用来进行扩展类的加载，一般对应的是jrelibext目录中的类
		 * 3）AppClassLoader 加载classpath指定的类，是最常用的加载器。同时也是java中默认的加载器。
		 * 如果想要完成动态代理，首先需要定义一个InvocationHandler接口的子类，已完成代理的具体操作。
		 */
		public class TestReflect {
		    public static void main(String[] args) throws Exception {
		        MyInvocationHandler demo = new MyInvocationHandler();
		        Subject sub = (Subject) demo.bind(new RealSubject());
		        String info = sub.say("Rollen", 20);
		        System.out.println(info);
		    }
		}

		// 通过反射取得并修改数组的信息
		import java.lang.reflect.Array;
		public class TestReflect {
		    public static void main(String[] args) throws Exception {
		        int[] temp = { 1, 2, 3, 4, 5 };
		        Class<?> demo = temp.getClass().getComponentType();
		        System.out.println("数组类型： " + demo.getName());
		        System.out.println("数组长度  " + Array.getLength(temp));
		        System.out.println("数组的第一个元素: " + Array.get(temp, 0));
		        Array.set(temp, 0, 100);
		        System.out.println("修改之后数组第一个元素为： " + Array.get(temp, 0));
		    }
		}

		// 修改数组大小
		String[] atr = { "a", "b", "c" };
        String[] str1 = (String[]) arrayInc(atr, 8);
        // 修改数组大小
	    public static Object arrayInc(Object obj, int len) {
	        Class<?> arr = obj.getClass().getComponentType();
	        Object newArr = Array.newInstance(arr, len);
	        int co = Array.getLength(obj);
	        System.arraycopy(obj, 0, newArr, 0, co);
	        return newArr;
	    }

	    // 将反射机制应用于工厂模式
    }
}
```

## java对象克隆
```java
// 1. 深度克隆
public class Attribute implements Cloneable {  // 1. 实现java.lang.Cloneable接口
    public Object clone() {   // 重载java.lang.Object.clone()方法
        try {   
            return super.clone();   
        } catch (CloneNotSupportedException e) {   
            return null;   
        }   
    }   
}   
// 2.对象序列化
```

## java回调函数
```java
// 拉模式, 推模式
// http://www.cnblogs.com/aoguren/p/5544865.html
```

## 泛型的约束和局限性
```java
// https://www.jianshu.com/p/f1b70ae8858d
// 反射创建实例
public static <T> Couple<T> createInstance(Class<T> clazz) {
    try {
        return new Couple<T>(clazz.newInstance(), clazz.newInstance());
    } catch (Exception e) {
        return null ;
    }
}
// 反射创建数组
public static <T extends Comparable<T>> T[] maxTwo(T[] array) {
    // Type safety: Unchecked cast from Object[] to T[]
    return (T[]) Array.newInstance(array.getClass().getComponentType(), 2) ;
}
```
## 泛型类型的继承规则
```java
// Student是Person的子类，但是ArrayList<Student>并不是ArrayList<Person> 的子类 
ArrayList<Student> students= new ArrayList<Student>();  // error
```

## 集合
```java
Set 不能放重复元素添加重复的元素将毫无用处
	HashSet效率最高，但是不能保证集合里面的元素是按顺序读取的
	TreeSet 通过所存储的元素的值对元素进行排序，比HashSet慢
	LinkedHashSet 通过集合里面的元素插入的时候的顺序进行排序
List 有顺序的集合，可以存放重复的元素
	ArrayList: 数组
	LinkedList: 链表
Queue 先进先出的集合FIFO (first-in-first-out)
Map 用键值对的关系来存储数据，键值不能重复，一个键只能对应一个值。 SortedSet, SortedMap分别是Set和map的排序版本
	Map的基本方法： (put, get, containsKey, containsValue, size, and isEmpty)
Collection 接口：集合框架中的最顶的接口，集合中最抽象的一个接口
// 其他实现
Vector
Stack
HashTable: 线程安全HashMap
ConcurrentHashMap: 线程安全HashMap
CopyOnWriteArrayList: 线程安全List
```
