package MyCompletableFuture;

import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;
/**
 * @author fwz
 * @date 2019-03-14 22:59
 * @desc CompletableFuture: 即连续Promise
 *          以xxx()结尾, 继续在已有线程执行
 *          以xxxAsync()结尾, 用Executor的新线程执行
 * @use class MySupplier implements Supplier<returnType>{
 *          public returnType get() { return }
 *      }
 *      CompletableFuture<returnType> f = CompletableFuture.supplyAsync(new MySupplier())
 *      f.thenAccept(new Consumer<returnType>() {
 *          public void accept(returnType res){}
 *      })
 *      f.exceptionally(new Function<Throwable, returnType>() {
 *          public returnType apply(Throwable t) {
 *                 System.out.println("Error: " + t.getMessage());
 *                 return returnType.NaN;
 *          }
 *      })
 */
public class CompletableFutureSample {

    static class StockSupplier implements Supplier<Float> {

        @Override
        public Float get() {
            String url = "http://hq.sinajs.cn/list=sh000001";
            System.out.println("GET: " + url);
            try {
                String result = DownloadUtil.download(url);
                String[] ss = result.split(",");
                return Float.parseFloat(ss[3]);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        CompletableFuture<Float> getStockFuture = CompletableFuture.supplyAsync(new StockSupplier());
        getStockFuture.thenAccept(new Consumer<Float>() {
            @Override
            public void accept(Float price) {
                System.out.println("Current price: " + price);
            }
        });
        getStockFuture.exceptionally(new Function<Throwable, Float>() {
            @Override
            public Float apply(Throwable t) {
                System.out.println("Error: " + t.getMessage());
                return Float.NaN;
            }
        });
        getStockFuture.join();
    }

}
