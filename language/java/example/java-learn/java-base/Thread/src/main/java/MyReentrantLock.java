import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.*;

/**
 * @author fwz
 * @date 2019-03-14 21:51
 * @desc MyReentrantLock
 */
public class MyReentrantLock {
    /**
     * @Description lock(), tryLock()
     */
    class CounterLock {
        final Lock lock = new ReentrantLock();
        final Condition notEmpty = lock.newCondition();

        // 可重复读锁
        public void inc() throws InterruptedException {
            // lock.lock(); // 可重入锁

            // 1秒内没有获取锁返回false
            // 有tryLock则不用lock()
            if (lock.tryLock(1, TimeUnit.SECONDS)) {
                try {

                } finally {
                    lock.unlock();
                }
            }
        }

        /**
         * @Description Condition解决synchronized的wait(), notify()/notifyAll()问题
         */
        public void conditionFun() throws InterruptedException {
            notEmpty.await(); // await时被主动调用interrupt
            notEmpty.signal();
            notEmpty.signalAll();
        }
    }

    /**
     * @Description ReadWriteLock
     */
    class CounterReadWrite {
        final ReadWriteLock lock = new ReentrantReadWriteLock();
        final Lock rlock = lock.readLock();
        final Lock wlock = lock.writeLock();
        int value = 1;

        public void inc() {
            wlock.lock();
            try {
                value += 1;
            } finally {
                wlock.unlock();
            }
        }

        public int get() {
            rlock.lock();
            try {
                return value;
            } finally {
                rlock.unlock();
            }
        }
    }

}
