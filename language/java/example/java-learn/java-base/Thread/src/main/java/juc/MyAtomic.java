package juc;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author fwz
 * @date 2019-03-14 22:23
 * @desc AtomicInteger,AtomicLong, AtomicIntegerArray
 * @fun addAndGet(inr), incrementAndGet(), get(),
 *      CAS(compare and set): boolean compareAndSet(int expect, int update) // 如果为expect则更新为update,返回true
 */

class MyAtomic {

    private AtomicInteger value = new AtomicInteger(0);

    public int add(int m) {
        return this.value.addAndGet(m);
    }

    public int dec(int m) {
        return this.value.addAndGet(-m);
    }

    public int get() {
        return this.value.get();
    }
}
