import java.util.LinkedList;
import java.util.Queue;

/**
 * @author fwz
 * @date 2019-03-14 20:51
 * @desc synchronize
 */
public class BasicThread {
    static class TaskQueue {
        final Queue<String> queue = new LinkedList<>();

        public synchronized String getTask() throws InterruptedException {
            while (this.queue.isEmpty()) {
                this.wait();
            }
            return queue.remove();
        }

        public synchronized void addTask(String name) {
            this.queue.add(name);
            this.notify(); // 随机选取一个线程激活
            // this.notifyAll(); // 所有线程竞争
        }
    }

    static class MyThread1 extends Thread {
        String name;
        public MyThread1(String name) {
            this.name = name;
        }

        public void run() {
            while(!isInterrupted()) {
                System.out.println("Hello, " + name + "!");
            }

        }
    }

    static class MyThread2 implements Runnable {
        @Override
        public void run() {
            System.out.println("Hello world");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        TaskQueue taskQueue = new TaskQueue();
        Thread t1 = new MyThread1("myThread");
        t1.start();
        Thread.sleep(1000);
        t1.interrupt();
        t1.join(); // 等待线程t1执行结束
        new MyThread2().run();
    }
}
