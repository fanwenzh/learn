package RMI;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.time.LocalDateTime;

/**
 * @author fwz
 * @date 2019-03-15 20:11
 * @desc 客户端远程方法调用RMI
 * @use  public interface Clock extends Remote
 */
public interface Clock extends Remote {

    LocalDateTime currentTime() throws RemoteException;
}
