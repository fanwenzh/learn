import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author fwz
 * @date 2019-03-14 22:32
 * @desc ThreadPool
 */
public class MyThreadPool {

    static class PrintTask implements Runnable {
        String name;

        public PrintTask(String name) {
            this.name = name;
        }

        public void run() {
            for (int i = 0; i < 3; i++) {
                System.out.println("Hello, " + name + "!");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                }
            }
        }
    }

    public static void main(String[] args) throws Exception {
        // Executors.newCachedThreadPool();
        // Executors.newScheduledThreadPool(3); // 定期调度
        ExecutorService executor = Executors.newFixedThreadPool(3);
        executor.submit(new PrintTask("Bob"));
        executor.submit(new PrintTask("Alice"));
        executor.submit(new PrintTask("Tim"));
        executor.submit(new PrintTask("Robot"));
        Thread.sleep(10000);
        Thread.currentThread(); // 获取当前线程
        executor.shutdown();
    }
}
