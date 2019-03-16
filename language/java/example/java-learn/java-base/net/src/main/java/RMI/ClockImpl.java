package RMI;

import java.rmi.RemoteException;
import java.time.LocalDateTime;
/**
 * @author fwz
 * @date 2019-03-15 20:22
 * @desc
 */
public class ClockImpl implements Clock {

    @Override
    public LocalDateTime currentTime() throws RemoteException {
        return LocalDateTime.now();
    }

}
