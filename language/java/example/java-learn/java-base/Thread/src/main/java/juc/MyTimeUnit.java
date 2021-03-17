package juc;

import java.util.concurrent.TimeUnit;

/**
 * @author fwz
 * @date 2019-03-16 15:27
 * @desc
 */
public class MyTimeUnit {
    public static void main(String[] args) throws InterruptedException {
        //睡眠13分钟
        TimeUnit.MINUTES.sleep(13);
        //Thread.sleep(780000);//这样写你知道是多久吗？
        //Thread.sleep(13*60*1000);//这样写会稍微好些

        //睡眠1小时
        TimeUnit.HOURS.sleep(1);
        //Thread.sleep(3600000);

        MyTimeUnit test = new MyTimeUnit();

        Thread thread = new Thread(() -> test.work());

        //10秒内Join
        TimeUnit.SECONDS.timedJoin(thread,10);
        //thread.join(10000);


    }

    public  synchronized  void work() {
        System.out.println("Begin Work");
        try {
            //等待30秒后，自动唤醒继续执行
            TimeUnit.SECONDS.timedWait(this, 30);
            //wait(30000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Work End");
    }

}
