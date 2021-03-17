package sample;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * @author fwz
 * @date 2019-02-13 10:27
 * @desc 通知类
 */
public class Invaction implements InvocationHandler {

    // 具体被监控的(行为)对象, 为Object类?
    private BaseService obj;

    public Invaction(BaseService obj) {
        this.obj = obj;
    }

    /*
     * invoke方法: 在被监控行为要执行时，会被JVM拦截
     *            被监控行为和行为实现放会被作为参数传送至invoke方法

     * @param: proxy 代理对象
     * @oaram: method 监控方法
     * @param: args method执行的方法集合
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object res;
        String methodName = method.getName();
        if (methodName.equals("eat")) {
            addService();
            res = method.invoke(obj, args);
        } else {
            res = method.invoke(obj, args);
            addService();
        }
        return res;
    }

    // other service
    public void addService() {
        System.out.println("添加的服务");
    }
}
