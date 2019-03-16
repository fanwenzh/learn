package RMI;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.time.LocalDateTime;
/**
 * @author fwz
 * @date 2019-03-15 20:23
 * @desc 调用Clock
 */
public class ClockClient {

    public static void main(String[] args) throws Exception {
        Registry registry = LocateRegistry.getRegistry(null); // null = "localhost"
        Clock clock = (Clock) registry.lookup("Clock");
        LocalDateTime dt = clock.currentTime();
        System.out.println("RMI result: " + dt);
    }
}
