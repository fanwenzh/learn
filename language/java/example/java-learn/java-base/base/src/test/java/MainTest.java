import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.*;
import java.util.*;

/**
 * @author fwz
 * @date 2019-03-13 12:57
 * @desc
 */
public class MainTest {

    @Before
    public void before(){}
    @After
    public void after(){}


    public class classTest {
        classTest(){

        }
        public void say(){}
    }

    public enum Color {
        RED, GREEN, BLUE;
        // RED("红色",1), GREEN("绿色",2), GREEN("蓝色",3),
    }

    /**
     * @Description 数组操作
     */
    @Test
    public void array() {
        // 初始化
        Integer[] arr1 = {1,4,5,2,3};
        Integer[] arr2 = new Integer[]{1,2,3};
        String[] strs = new String[]{"123", "12", "3466"};
        Arrays.sort(arr1); // Arrays.sort(arr, int start, int end);
        Arrays.sort(arr1, Collections.reverseOrder());
        Arrays.sort(strs, Comparator.comparingInt(String::length));
        Arrays.sort(strs, (a, b)->a.length() - b.length());
        System.out.println(strs[0]);
        // Arrays.copyOf(); Arrays.copyOfRange();
        // Arrays.stream()
        // Arrays.binarySearch()
        // Arrays.asList()

    }

    /**
     * @Description java基本类型
     */
    @Test
    public void basicVariable() {
        // 基本数据类型:拆包装包
        // byte, short, int, long
        // float, double
        // char // 16bit
        // boolean
    }

    /**
     * @Description java的String类型
     */
    @Test
    public void stringTest() throws UnsupportedEncodingException {
        String str = "abaca";
        String subStr = new String(str.getBytes("UTF-8"), "UTF-8");
        // contentEquals/equals/equalsIgnoresCase,
        // startsWith(), endsWith, matches, contains
        // charAt, compareTo/compareToIgnore, concat,
        // copyValueOf(char[] data, int offset, int count),
        // getBytes()
        // getChars(int srcBegin, int srcEnd, char[] dst, int desBegin)
        // indexOf(String str), lastIndexOf()
        // length()
        // replaceFirst(), replaceAll()
        // split(), join() ,substring(), toCharArray()
        // toLowerCase(), toUpperCase(), trim()
        // valueOf()
        System.out.println(subStr);
    }

    /**
     * @Description java原生工具类
     */
    @Test
    public void basicTool() {
        // Math.ceil().floor().abs().max().min()

         //Random random = new Random(); // SecureRandom
        // random.setSeed(1);
        // int i =  random.nextInt(100); // [0, 100)

        // BigInteger 任意大小的整数
        // BigDecimal 任意精度的浮点数
    }

    @Test
    public void annotation() {
        // 元注解
        // @Target(ElementType.TYPE)
        // @Retention(RetentionPolicy.RUNTIME)
        // @Repeatable
        // @Inherited

        // 反射读取注解
//        ClassA.isAnnotationPresent(ClassB) // 注解(@interface)B是否在ClassA上
//        Field.isAnnotationPresent(Class)
//        Method.isAnnotationPresent(Class)
//        Constructor.isAnnotationPresent(Class)
        classTest.class.getAnnotations();
//        Class.getAnnotation(Class)
//        Field.getAnnotation(Class)
//        Method.getAnnotation(Class)
//        Constructor.getAnnotation(Class)
//        method.getParameterAnnotations()
    }

    @Test
    public void propertiesTest() throws IOException {
        String f = "setting.properties"; // 获取.properties属性, 仅支持ASCII
        Properties props = new Properties();
        props.load(new FileInputStream(f));
        props.getProperty("mysql");
    }

}