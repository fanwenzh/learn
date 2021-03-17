<!-- https://www.w3cschool.cn/java/dict -->
```java
// java 修饰符
// 访问控制修饰符：default, public, protected, private
// 非访问控制修饰符：final, abstract, strictfp(精确浮点运算)

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
Object.equals() // ==:比较内存首地址
	hashCode() // 为了提高比较效率，java底层会先判断hashCode是否相等，如果hashCode相等，在来判断equals是否相等，如果hashCode不相等，则不会判断equals而直接返回false,只有hashCode相等，而且equals也相等，才会认为两个对象完全相等
	clone()
	toString()
// 深度克隆
public class Attribute implements Cloneable {  // 1. 实现java.lang.Cloneable接口
    public Object clone() {   // 重载java.lang.Object.clone()方法
        try {   
            return super.clone();   
        } catch (CloneNotSupportedException e) {   
            return null;   
        }   
    }   
}   

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
// 集合与数组之间的转换
String[] values = [];
HashSet<String> staff = new HashSet<>(Arrays.asList(valus))
staff.toArray(new String[staff.size()])

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

```

## 反射机制
http://www.cnblogs.com/lzq198754/p/5780331.html
```java
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