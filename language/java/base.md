# ByteBuffer 和 byte[]
```java
// put data array
byte[] sequenceHeader = ByteBuffer.allocate(4).putInt(sequenceNumber).array();
ByteBuffer bb = ByteBuffer.allocate(this.mtu);
bb.put(sequenceHeader)
bb.putInt(sequenceNumber)
// get data
ByteBuffer totalBuffer = ByteBuffer.wrap(receivePacket.getData());
sequenceNumber = totalBuffer.getInt();
byte[] b = new byte[4];
ByteBuffer bb = ByteBuffer.wrap(packet.getData());
int seq1 = bb.get(b,0,4).getInt();
```
# 4 java反射与泛型
# 4.1 反射
```java
// class本质
int.class === Integer.TYPE
// 获取class实例
Class cls = String.class;
Class cls = "str".getClass();
Class cls = Class.forName("java.lang.String");
// 从class获取class信息
getName() // 全路径名
getSimpleName() // 获取类名
getPackage() // 获取包名
// 从Class实例判断class类型
instanceof, ==
isInterface()
isEnum()
isArray()
isPrimitive() // 是否为原始类型
// 创建class
cls.newInstance() // return Object
// 获取class的属性field
getFiled(name) // 获取public的filed, 包括父类
getDeclaredField(name) // 获取当前类的某个filed, 不包括父类
  // nameField.setAccessible(true);
  // nameField.get(obj) // 属性访问
getFileds() // 获取所有public的field, 包括父类
getDeclaredFields() // 获取当前类所有的filed, 不包括父类
// 获取filed的属性
getName()
getType()
getModifiers() // 修饰符的序号之和：@return int, String modifiers = Modifier.toString(mod);
// Modifier.toString(Modifier.methodModifiers()) // 列举所有修饰符

// 获取和设置field的值, 通过反射访问Field需要通过SecurityManager设置的规则
field.get(Object obj)
field.set(Object, Object) // setAccessible(true) 设置非public字段
// 通过Class获取方法
getMethod(name, Class...) // 获取某个public的method(包括父类). 
getDeclaredMethod(name, Class...) // 获取当前类的某个method(不包括父类) 
getMethods() // 获取所有public的method(包括父类) 
getDeclaredMethods() // 获取当前类的所有method(不包括父类)

// 获取method属性
getName() 
getReturnType() 
getParameters() // @return Parameter[]
  // String parmType = parms[i].getType().getSimpleName()
  // String parmName = parms[i].getName() // arg0
getParameterTypes() // 
getModifiers()      // @return int; String modifiers = Modifier.toString(mod);
getExceptionTypes() // @return Class<?>[] cs, c.getSimpleName()
// 调用方法
setAccessible(true)
Object invoke(Object obj, Object... args)

// 调用public无参数构造方法
Class.newInstance()
// 获取Constructor
getConstructor(Class...) // 获取某个public的Constructor 
getDeclaredConstructor(Class...) // 获取某个Constructor(Integer.class)
getConstructors() // 获取所有public的Constructor 
getDeclaredConstructors() // 获取所有Constructor
setAccessible(true) // 设置访问非public构造方法
// 获取继承关系
Class getSuperclass() // Object的父类是null interface的父类是null
Class[] getInterfaces() // 不包括间接实现的interface 没有interface的class返回空数组 interface返回继承的interface
// 判断向上转型
bool isAssignableFrom(Class) // class1.isAssignableFrom(class2)
Number.class.isAssignableFrom(Integer.class) // true, Number n = (Integer) i
```
# 4.2 注解
```java
// jdk注解
@Override 
@Deprecated // 废弃
@SuppressWarnings(value=1) // 使用参数
// 定义注解
public @interface myAnnotation {
  int type() default 0;
  String value() default "info";
}
// 元注解
@Target(ElementType.TYPE) // 必须设置定义注解应用范围, ElementType.FIELD, .METHOD, .CONSTRUCTOR, .PARAMETER
@Retention // 定义注解生命周期, 默认为仅运行时RUNTIME: 仅编译器RetentionPolicy.SOURCE, 仅class文件: RetentionPolicy.CLASS
@Repeatable // 可重复
@Inherited // 可继承
// 判断是否有Annotation
Class.isAnnotationPresent(Class) 
Field.isAnnotationPresent(Class) 
Method.isAnnotationPresent(Class) 
Constructor.isAnnotationPresent(Class) 
// 获取注解
Field.getAnnotation(Class) 
Method.getAnnotation(Class) 
Constructor.getAnnotation(Class) 
// 获取注解参数, (多注解多参数) Annotation[][] = annos = method.getParameterAnnotations()
getParameterAnnotations()
```

# 4.3 泛型
```java
// 普通方法使用
public class myArray<T> { public T[] array; }
// static方法使用泛型, 与类中的泛型<T>无关
public static <K> Pair<K> create(K first, K last){}
// 使用new创建实例
public Pair(Class<T> clazz) {
  first = clazz.newInstance()
  last = clazz.newInstance()
}
// 泛型继承, 获取Pair<Integer>的泛型类型T-Integer
public class IntPair extends Pair<Integer> {}
Class<IntPair> clazz = IntPair.class; // Class clazz = IntPair.class;
System.out.println(clazz.getSuperclass()) //getSuperclass()获得该类的父类 // com.test.Pair
//Type是 Java 编程语言中所有类型的公共高级接口。它们包括原始类型、参数化类型、数组类型、类型变量和基本类型。
Type t = clazz.getGenericsuperclass(); // 获得带有泛型的父类 // com.test.Pair<com.test.Integer>
//ParameterizedType参数化类型，即泛型
ParameterizedType pt = (ParameterizedType) t;
Type[] types = pt.getActuralTypeArguments();
Type firstType = types[0];
Class typeClass = (Class) firstType;
System.out.println(typeClass); // Integer

// extends, super通配符, 限制T的类型
// extends只读, supser只写, ?不读不写
1. <? extends T> 只能用于方法返回，告诉编译器此返参的类型的最小继承边界为T，T和T的父类都能接收，但是入参类型无法确定，只能接受null的传入
2. <? super T>只能用于限定方法入参，告诉编译器入参只能是T或其子类型，而返参只能用Object类接收
3. ? 既不能用于入参也不能用于返参
// 泛型数组初始化
Pair<String>[] ps = null; // 不能直接new泛型数组
Pair<String>[] ps = (Pair<String>[]) new Pair[2]; // 必须通过强制转型
// 可以通过Array.newInstance(Class<T>, int)创建T[]数组，需要强制转型
// 利用变参创建T[]数组
public class ArrayHelper {
  @SafeVarags
  static <T> T[] asArray(T... objs) {
    return objs;
  }
}
String[] ss = ArrayHelper.asArray("a", "b", "c");
Integer[] ns = ArrayHelper.asArray(1, 2, 3);
```
# 5.集合
```java
// Collection统一接口 // List, Set, Queue 为implement接口
// 避免添加null
List: ArrayList, LinkedList
  add(e), add(index, e), remove(e), remove(index), get(index), size()
  遍历:
    for(int i = 0; i < list.size(); i++){list.get(i)}
    for(Iterator<String> it = list.iterator(); it.hasNext(); ){String s = it.next()}
    for(String s: list){} // 实现iteratable接口
  // array和list转化
  Integer[] arr = list.toArray(new Integer[5]) // {1,2,3,null,null}
  List<Integer> list = Arrays.asList(arr) // 只读
  List<Integer> arrayList = new ArrayList<>(Arrays.asList(array)); // 或用 addAll() // 复制
  // 查找 // 实现equals // Object.equals(p.name, this.name) // jdk提供的检查null比较方法
  .contains(), indexOf()

Map: HashMap, TreeMap
  get(K key), put(K key, V value)
  遍历：
    for (K key: map.keySet()){map.get(key)}
    for (Map.Entry<String, Integer> entry : map.entrySet()) {map.getKey();map.getValue();}
  // 排序(key)
  Map<String, Integer> map = new TreeMap<>(new Comparator<String>() {
    public int compare(String o1, String o2) { return o1.compareTo(o2)}
  })
  // 查找 // 实现equals() // 必须实现hashCode()， 根据key内存位置获取唯一标识
  public int hasCode() {
    return Objects.hash(this.name, this.age); // 根据name和age唯一标识
  }

Set: HashSet, TreeSet
  boolean add(e), remove(o), contains(o), size()
  // 查找 // 实现equals()和hashCode()
  Set<String> set = new TreeSet<>(new Comparator<String>() {
    public int compare(String o1, String o2) { return o1.compareTo(o2)}
  })
  // 遗留类: Hashtable(线程安全map), Vector(线程安全List), Stack(基于Vector的LIFO栈)

Queue: LinkedList // Queue<String> queue = new LinkedList<>();
  size(), isEmpty()
  // throwException   返回false或null
      add(e)            offer(e)   // 将元素添加到队尾
      remove(e)         poll(e)    // 获取队列头并删除
      element()         peek()     // 获取队列头不删除
PriorityQueue: // 实现Comparable接口 // 总返回优先级最高的元素
  public class Person implements Comparable<Person> {
    public int compareTo(Person o) {return this.name.compareTo(o.name);}
  }
  Queue<Person> queue = new PriorityQueue<>();
  // 或直接定义comparable接口
  Queue<Person> queue = new PriorityQueue<>(new Comparator<Person>() {
    public int compare(Person o1, Person o2) {
      return o1.getName().compareTo(o2.getName);
    }
  })
Deque: 双端队列, 实现类: ArrayDeque, LinkedList
  addLast(), offerLast() // addFirst(), offerFirst()
  removeFirst(), pollFirst() // removeLast(), pollLast()
  getFirst(), peekFirst()  // getLst(), getLast()
  Deque<String> deque = new LinkedList<>()

Stack: Deque
  push(), // addFirst()
  pop(),  // removeFirst()
  peek()  // peekFirst()

Iterator // 实现Iterable<E>接口
public class ReadOnlyList<E> implements Iterable<E> {
  @Override
  public Iterator<E> iterator() {
    return new ReadOnlyIterator() // 一般用内部类实现Iterator()
  }
}
// 其他函数
Collections.sort(), Collections.sort(list, Collections.reverseOrder())
Collections.suffle(),Collections.max(), .min()
unmodifiableList / unmodifiableSet / unmodifiableMap // 创建不可变集合
synchronizedList / synchronizedSet / synchronizedMap(已不推荐使用) // 创建线程安全的集合
```
# 5.2properties
```java
String f = "setting.properties";
Propertirs props = new Properties(); // hashTable实现(废弃)
// 读取多个properties， 后覆盖前
props.load(new FileInputStream(f)); // 通过FileInputStream读取
props.load(getClass().getResourceAsStream(f)); // classpath: 通过getResourceAsStream读取 
String url = props.getProperty("url"); // url = "123"
```

# 6.IO编程
```java
// IO流: 以字节为单位byte[], 处理二进制 -- InputStream, OutputStream
// 字符流: 以字符为单位char[], 处理字符(默认utf8) -- Reader, Writer
// 抽象类: InputStream,     OutputStream,     Reader    , Writer
// 实现类: FileInputStream, FileOutputStream, FileReader, FileWriter

// 获取当前路径
File file = new File(".") // 传入路径Path
file.getCanonicalPath() // 传回规范目录
file.getAbsolutePath() // 传回未规范目录
file.getPath() // 传回path
.isFile(), .isDirectory(), 
canRead(), canWrite(), canExecute(), length()
File.createNewFile(), FIle.ceateTempFIle(String prefix, Stering suffix), delete(), deleteOnExit() // JVM退出时删除该文件
// 为目录时
list(), listFiles(), listFiles(FileFilter filter), listFiles(FilenameFilter filter)
mkdir(), mkdirs()

// InputStream
// FileInputStream实现了文件流输入, ByteArrayInputStream模拟字节流输入
read(), read(byte[] b), read(byte[] b, int off, int len), close() 
try (InputStream input = new FileInputStream("src/readme.txt")) {
  byte[] buffer = new byte[1000];
  int n;
  while ((n = input.read(buffer)) != -1) {
    System.out.println(n)
  }
}
// OutputStream
// FileOutputStream, ByteArrayOutputStream
write(), write(byte[] b), write(byte[] b, int off, int len), close(), flush()
try (OutputStream output = new FIleOutputStream("out/readme.txt")) {
  byte[] b = "Hello".getBytes("UTF-8");
  output.write(b);
}

// 直接提供数据的InputStream
FileInputStream, ByteArrayInputStream, ServletInputStream, Socket.getInputStream
// 提供额外附加功能的FilterInputStream
BufferedInputStream, DigestInputStream, CipherInputStream
InputStream input = new GZIPInputStream(new BufferedInputStream(new FileInputStream("test.gz")));
// 直接提供写接口的OutputStream
FileOutputStream, ByteArrayOutputStream, ServletOutputStream...
// 提供额外附加功能的FilterOutputStream
BufferedOutputStream, DataOutputStream, CheckedOutputStream

// ZipOutputStream 文件打包为zip
try (ZipOutputStream zip = new ZipOutputStream(...)) {
  File[] files = ...;
  for (File file : files) {
    zip.putNextEntry(new ZipEntry(file.getName()));
    zip.write(getFIleDataAsBytes(file));
    zip.closeEntry();
  }
}

// classpath
InputStream input = getClass().getResourceAsStream("/path/file") // 不存在返回null

// 序列化(转化为byte[]): Class实现Serializable接口, 添加serialVersionUID
// ClassNotFoundException: 没有对应的Class, InvalidClassException: Class属性不匹配
try (ObjectOutputStream output = new ObjectOutputStream(...)) {
  output.writeObject(new Person("xiaoming")); // output.writeInt(), output.writeUTF("string")
  output.writeObject(new Person("xiaohong"));
}
try (ObjectInputStream input = new ObjectInputStream(...)) {
  Object p1 = input.readObject();
  Person p2 = (Person) input.readObject();
}

// Reader: 字符流(BufferedReader, FileReader, CharArrayReader)
try(Reader reader = new FileReader("readme.md")) { // 使用系统默认字符编码
  char[] buffer = new char[1000];
  int n; 
  while((n = reader.read()) != -1) { // n = reader.reader(buffer)
    System.out.println((char)n);
  }
}
// CharArrayReader: 在内存中模拟字符流
char[] data = {'a', 'b', 'c'}
Reader reader = new CharArrayReader(data)
// Reader本质是设置编码的InputStream
InputStream input = new FileInputStream(filename);
Reader reader = new InputStreamReader(input, "UTF-8");
reader.close()
```
# 7.日期和时间
```java
// java.util.Data, .Calendar 
// java.time.LocalDate, .LocalTime , .ZonedDateTime, .Instant (JDK >= 1.8)

// Date 获取当前时间
.getYear(), getMonth(), getDate(), getHours(), getMinutes(), getSeconds()
new Date(), // GMT, long转化为Date
long getTime(), System.currentTimeMillis() // long
// Date转化为String
toString(), toGMTString(), toLocaleString()
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String s = sdf.format(new Date());        // 2018-12-18 23:12:23
// String转化为Date
Date d = new SimpleDateFormate("yyyy-MM-dd HH:mm:ss", Locale.US).parse(s);

// Calendar
Calendar c = Calendar.getInstance();
// Calendar.MONTH, .DAY_OF_MONTH, .DAY_OF_WEEK, .HOUR_OF_DAY, .MINUTE, .SECOND, .MILLISECOND
int y = c.get(Calendar.YEAR);
c.set(Calendar.YEAR, 2000);
c.add(Calendar.DATE, -1);
// Calendar 转化Date
Date d = c.getTime();
c = Calendar.setTime(d);

// java.time // 不变类, 同String
LocalDate d = LocalDate.now(); // 获取当前日期
LocalTime t = LocalTime.now(); // 获取当前时间
LocalDateTime dt = LocalDateTime.now() // 获取当前日期和时间
LocalDate d = LocalDate.of(2018, 12, 25);
LocalDate d = LocalDate.parse("2016-11-30");
// 时间和日期运算 // 支持链式
LocalDate d2 = d.plusDays(5).minusWeeks(1); // +5天 -1周
// 日期调整
LocalDate firstDat = d2.withDayOfMonth(1); // 本月第1天
LocalTime at = LocalTime.now().withSecond(0) // 秒数设为0
LocalDate firstSunday = LocalDate.now().with(TemporalAjusters.firstInMonth(DayOfWeek.SUNDAY)); // 本月第1个周日
// 比较
.isBefore(), .isAfter(), .equals()
// 日期间隔计算
Period p = d2.until(d1); // getYears(), getMonths(), getDays()

// java与数据库, java.sql.Timestamp派生至java.util.Date
数据库       旧java类             新java类
DATETIME    java.util.Date      LocalDateTime
DATE        java.sql.Date       LocalDate
TIME        java.sql.Time       LocalTime
TIMESTAMP   java.sql.Timestamp  LocalDateTime
// 新旧API的相互转换, 通过long转换, 对应数据库BIGINT
// 用JDK处理时区间的转换
String epochToString(long epoch, Locale lo, String zoneId) {
  Instant ins = Instant.ofEpochMilli(epoch);
  DateTimeFormatter f = DateTimeFormatter.ofLocalizeDateTime(FormatStyle.MEDIUM, FormatStyle.SHORT);
  return f.withLocale(lo).format(ZonedDateTime.ofInstant(ins, ZoneId.of(zoneId)));
}
```
# 9. 正则表达式
```java
// 使用1
String regex = "^\\d{3,4}\\-\\d{6,8}$";
String obj = "010-12345678";
obj.matches(regex); // true
obj.replaceAll(regex, otherStr);
// 使用2
Pattern pattern = Pattern.compile(regex);
Matcher m = pattern.matcher(obj);
boolean matches = m.matches(); // true
// 多匹配, 并提取子串
while (m.find()) {
  String sub = s.substring(m.start(), m.end());
  System.out.println(sub);
}
// 分组匹配()
String whole = matcher.group(0); // 0为整个字符串
// 非贪婪匹配?, (\\d??)
// 分割字符串
"a,b ;; c".split("[\\,\\;\\s]+"); // {"a", "b", "c"}
```
# 11 多线程编程
```java
Thread.sleep()
// .currentThread(), .getState(), .yield() // 让步
// 创建线程1, 继承Thread, 覆写run方法
public class MyThread extends Thread {
  public void run() {}
}
Thread t = new MyThread();
t.start()
// 创建进程2, 实现Runnable接口, 覆写run方法
public class MyThread implements Runnable {
  public volatile boolean running = true; // volatile线程共享变量
  public void run() {
    while(!isInterrupted()) { // interrupted
      System.out.println("Hello!");
    } catch (InterruptedException e) {
      e.printStackTrace();
      return;
    }
  }
}
Runnable r = new MyThread();
Thread t = new Thread(r);
t.start();
t.join(); // 等待线程结束
t.stop(); // 强制结束, 不推荐
// Thread.setPriority(int n); // 设置调度优先级1-10, 默认为5
// 线程状态
New(创建), Runnable(运行中), Blocked(阻塞), Waiting(等待), Timed Waiting(计时等待), Ternubated(终止)
// 守护线程: 不能持有资源, 持续运行, JVM进程关闭后关闭
.setDaemon(true)
```
# 11. 线程同步
# 11.1 原生
```java
// 原子操作: 基本类型(long和double类型除外)赋值, 引用类型赋值
// 线程安全类: StringBuffer
// 加锁: synchronized
// 代码段加锁
final Object lock = new Object();
synchronized(lock) { // 以对象为锁
  count += n;
}
// 方法加锁
public synchronized void add(int n) {
  count += n;
}
// 多线程协调wait(), notify(), notifyAll()
public synchronized String getTask() {
  while(queue.isEmpty()) {
    this.wait(); // 等待notify()
  }
  return queue.remove();
}
```
# 11.2 concurrent包 jdk>1.5
```java
// ReentrantLock 代替synchronized（底层）
import java.util.locks.ReentrantLock; 
import java.util.concurrent.locks.Lock;
Class counter {
  final Lock lock = new ReentrantLock(); // 创建锁
  final Condition notEmpty = lock.newCondition(); // 添加Condition 设置wait,notify功能
  // notEmpty.await(), .signal(), .signalAll() // 相当于wait(), notify(), notifyAll()
  public void inc() {
    // 获得锁synchronized功能
    lock.lock();  
    try {
      while (this.queue.isEmpty()) {
        notEmpty.await();
      }
      return queue.remove();
    } finally {
      lock.unlock(); // 放开锁
    }
    // 尝试获得锁，防止死锁
    if (lock.tryLock(1, TimeUnit.SECONDS)) { // 设置超时时间为1秒
      try {
        n = n+ 1;
      } finally {
        lock.unlock();
      }
    }
  }
}
// ReadWriteLock: 允许多线程读，单线程写
class Counter {
  final ReadWriteLock lock = new ReentrantReadWriteLock();
  final Lock rLock = lock.readLock();
  final Lock wLock = lock.writeLock();
  public void inc () {
    wlock.lock();
    try {
      value += 1;
    } finally {
      wlock.unlock()
    }
  }
  public int get() {
    rlock.lock()
    try {
      return value;
    } finally {
      rlock.unlock();
    }
  }
}

// 线程安全类实现
BlockingQueue<t> t;
t.put("123");
String item = t.take();
// 线程安全扩展类
Interface     Non-thread safe         Thread safe
List          ArrayList               CopyOnWriteArrayList
Map           HashMap                 ConcurrentHashMap
Set           HashSet, TreeSet        CopyOnWriteArraySet
Queue         ArrayDeque,LinkedList   ArrayBlockQueue, LinkedBlockingQueue
Deque         ArrayDeque, LinkedList  LinkedBlockingDeque
// 线程安全原子类Atomic
// AtomicInteger, AtomicLong, AtomicIntegerArray等
.addAndGet(int delta), .incrementAndGet(), get(), compareAndSet(int except, int update) // CAS
```
# 11.3 线程池
```java
// FixedThreadPool, CachedThreadPool(ThreadPoolExecutor) 动态调整线程数, SingleThreadExecutor: 单线程
ExecuterService executor = Executors.newFixeThreadPool(4); // 固定大小线程池
executor.submit(task); // task为实现Runnable接口类或继承Thread, 实现run方法
executor.shutdown(); // 关闭
// ScheduledThreadPool: FixedRate和FiexdDelay两种模式
ScheduleExecutorService executor = Executors.newScheduledThreadPool()
executor.scheduleAtFixedRate(task1);  // 固定task总时间
executor.scheduleWithFixedDelay(task2); // 固定task任务之间间隔时间
// java.util.Timer: 一个Timer对应一个thread jdk < 1.5
Timer.cancel() // 结束timer任务
```

# 11.4 Future
```java
// Future（Callable）: 有返回值的多线程, 获取异步返回结果
class Task impements Callable<String> {
  public String call() throws Exception {
    return longTimeCalculation();
  }
}
Callable<String> task = new Task();
ExecutorService executor = Executors.newFixedThreadPool(4); // executor.shutdown()
Future<String> funture = executor.submit(task);
String result = future.get(); // 阻塞
// get(long tiemout, TimeUnit unit), cancel(boolean myInterruptIfRunning), isDone() // 轮询

// CompletableFuture: 回调；
CompletableFuture<String> cf = CompletableFuture.supplyAsync("异步执行实例"); // 实例实现Supplier接口
cf.thenAccept(new Consumer<String>() {  // cf.thenAccept((result) -> {})
  public void accept(String result) {
    System.out.println(result);
  }
});
cf.exceptionally(new Function<Throwable, String>() { // cf.exceptionally((t) -> {})
  public String apply(Throwable t) {
    System.out.println(t.getMessage());
    return null;
  }
})
// CompletableFuture串行执行
// xxx(): 在已有的线程中执行, xxxAsync()用Executor的新线程执行
CompletableFuture<String> cf1 = CompletableFuture.supplyAsync("异步执行实例1");
CompletableFuture<Float> cf2 = cf1.thenApplyAsync("异步执行实例2");
cf2.thenAccept("cf2执行后的操作");
// anyOf任一个返回
CompletableFunture<Object> join1 = CompletableFuture.anyOf(cf1, cf2);
join1.join();
// allOf 都返回时执行
CompletableFunture<Void> join2 = CompletableFuture.allOf(cf1, cf2);
join2.join();

// Fork/Join 多核分治 jdk>1.7
class MyTask extends RecursiveTask<Long> { // 实现RecursiveTask接口(有返回值) 或 RecursiveAction(无返回值)
  protected Long compute() { // 覆写compute方法
    SumTask subtask1 = new MyTask(...);
    SumTask subtask2 = new MyTask(...);
    invokeAll(subtask1, subtask2); // 同时运行两个任务
    Long result1 = subtask1.join();
    Long result2 = subtask2.join();
    return result1 + result2;
  }
}
ForkJoinTask<Long> task = new MyTask();
Long result = ForkJoinPool.commonPool().invoke(task);
// Fork/Join模式的应用
java.util.Arrays.parallelSort(array);
```
# 11.5 ThreadLocal线程绑定值
```java
static ThreadLocal<String> threadLocalUser = new ThreadLocal()<>
threadLocalUser.set("bob");
String current = threadLocalUser.get();
threadLocalUser.remove(); // finally
```
# 13.网络编程
```java
// http(基于TCP)发送请求 // get
URL url = new URL("http://www.baidu.com/");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
int code = conn.getResponseCode();
try (InputStream input = conn.getInputStream()){
  // 读取响应数据
}
conn.disconnect();
// post
URL url = new URL("http://www.baidu.com/");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("POST");
conn.setDoOutput(true); // 设置发送请求数据
byte[] postData = "test";
conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
conn.setRequestProperty("Content-Length", String.valueOf(postData.length));
try (OutputStream output = conn.getOutputStream()) {
  output.write(postData);
}
// 省略同get方法
```
# 16.函数编程lambda: jdk>=1.8
```java
// 省略单个抽象方法@FunctionalInterface
Arrays.sout(arr, new Comparator<String>() {
  public int compare(String s1, String s2) {
    return s1.compareTo(s2)
  }
})
// 简化为
Arrays.sort(arr, (s1, s2) -> { 
  return s1.toLowerCase().compareTo(s2)
})
Tread t = new Thread(() -> {})

// 方法引用
Arrays.sort(arr, SortedBy::staicMed) // 静态方法 => (str1, str2)
Arrays.sort(arr, SortedBy::notStaticMeh) // 实例方法 => (str2) // 默认第一个为this
arr.stream().map(Person::new).collect(Collectors.toList()) // 调用new Person(String name)构造方法 // s -> {}

// java.util.stream // 实时计算, 惰性分配
// 创建Stream1
Stream<Integer> s = Stream.of(1,2,3,4,5);
Stream<Integer> s = Arrays.stream(array);
Stream<Integer> s = collection.stream(); // collection: ArrayList等
// 实现Supplier<T>接口及get()方法 提供无限制序列
Stream<String> s = Stream.generate(new MyImpl()); // 基本类型: IntStream, LongStream, DoubleStream
.limit(10), skip(), .forEach(item) // 无限序列需要先limit, forEach无返回值
.filter(), .map(), 
.reduce(init, Fun), .reduce(Fun).get()
.sorted(), sorted(Comparator<? super T> cp)
.distinct() // 去重
.contact(stream1, stream2)
.flatMap() // 拆开Collection并合并为stream
.parallel() // 尽可能并行处理
.count(), max(), min(), sum(), average()
.allMatch(), anyMatch() // 返回boolean
// Stream 转换为其他类型
Object[] s = st.toArray()
String[] arr = st.toArray(String[]::new)
List<String> list = st.collect(Collectors.toList());
```