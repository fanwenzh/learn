import java.lang.reflect.*;

/**
 * @author fwz
 * @date 2019-03-14 10:59
 * @desc
 */
public class Main {
    public static void main(String[] args) throws InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException, ClassNotFoundException {
        // 获取类型
        Class cls1 = String.class;
        Class cls2 = Class.forName("java.lang.String");
        Class cls3 = "String".getClass(); // getPackeage()

        String str = "123";

        Class MC = Member.class;
        //判断类型
        MC.isInterface(); // isEnum, isArray, isPrimitive
        // 获取父类
        MC.getSuperclass(); // Object、interface的父类为null
        MC.getInterfaces();

        // 构造函数
        MC.newInstance();
        MC.getConstructors();
        MC.getConstructor( null);
        // 类属性
        Field[] fields = MC.getFields(); // 含父类的public属性
        fields = MC.getDeclaredFields(); // 获得该类的所有属性
        System.out.println(fields.length);
        fields[0].setAccessible(true);
        fields[0].getName(); fields[0].getType(); fields[0].getModifiers();
        Member member = new Member();
        // 判断类型
        fields[0].get(member); fields[0].set(member, "test");

        // 类方法
        Method[] methods = Member.class.getDeclaredMethods(); // getMethods()
        for (Method method : methods) {

            if (method.getName().equals("setNameAndAge")) {
                // 获取修饰符
                int mod = method.getModifiers();
                String modifiers = Modifier.toString(mod);
                // 方法属性
                method.getReturnType();
                method.getModifiers();
                method.getParameterTypes();
                method.getParameterCount();
                // 参数属性
                Parameter[] parms = method.getParameters();
                Class<?> type = parms[0].getType();
                for (Parameter para : parms ) {
                    System.out.println(para.getName() + ", " + para.getType() + " , " + para.getType().getSimpleName());
                }
                // 执行类方法
                method.invoke(member, "hi", 123);
                break;
            }
        }
        System.out.println(member.toString());
    }
}
