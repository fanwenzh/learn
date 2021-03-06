package sample;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;

/**
 * @author fwz
 * @date 2019-02-13 10:18
 * @desc
 */
public class ProxyFactory {
    /*
     *   JDK动态代理实现(可设置返回Object类)
     *   @param: 监控类
     */
    public static BaseService build(Class classFile) throws Exception {
        // 1.创建被监控实例
        BaseService obj = (BaseService) classFile.newInstance();
        // 2. 创建通知对象
        InvocationHandler adviser = new Invaction(obj);
        // 3.向JVM申请复杂监控obj对象指定行为的监控对象(代理对象)
        /*
        *  @loader: 被监控对象隶属的类文件在内存中真实地址
        *  @interface: 被监控对象隶属的类文件实现的接口方法
        *  @h: 通知对象
        */
        BaseService proxyInstance = (BaseService)Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(),adviser);
        return proxyInstance;
    }
}
