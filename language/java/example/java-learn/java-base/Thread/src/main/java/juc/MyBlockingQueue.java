package juc;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
/**
 * @author fwz
 * @date 2019-03-14 22:18
 * @desc 线程安全队列: BlockingQueue<T>, take()
 */

public class MyBlockingQueue {

    static class WorkerThread extends Thread {
        BlockingQueue<String> taskQueue;

        public WorkerThread(BlockingQueue<String> taskQueue) {
            this.taskQueue = taskQueue;
        }

        public void run() {
            while (!isInterrupted()) {
                String name;
                try {
                    name = taskQueue.take();
                } catch (InterruptedException e) {
                    break;
                }
                String result = "Hello, " + name + "!";
                System.out.println(result);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        BlockingQueue<String> taskQueue = new ArrayBlockingQueue<>(100);
        WorkerThread worker = new WorkerThread(taskQueue);
        worker.start();
        // add task:
        taskQueue.put("Bob");
        Thread.sleep(1000);
        taskQueue.put("Alice");
        Thread.sleep(1000);
        taskQueue.put("Tim");
        Thread.sleep(1000);
        worker.interrupt();
        worker.join();
        System.out.println("END");
    }
}