package RMI;


import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
/**
 * @author fwz
 * @date 2019-03-15 20:22
 * @desc 被调用Server
 */
public class ClockServer {

    public static void main(String[] args) throws Exception {
        Clock impl = new ClockImpl();
        // 暴露在网络端口1099上
        Clock stub = (Clock) UnicastRemoteObject.exportObject(impl, 1099);
        LocateRegistry.createRegistry(1099);
        Registry registry = LocateRegistry.getRegistry();
        registry.bind("Clock", stub);
        System.out.println("Clock server ready.");
    }
}