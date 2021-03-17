package MyCompletableFuture;

import java.net.URLEncoder;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * @author fwz
 * @date 2019-03-14 23:00
 * @desc 串行CompletableFuture
 * @use  class MySupplier implements Supplier<returnType1> {
 *          public returnType1 get(){ return }
 *       }
 *       CompletableFuture<returnType1> cf1 = CompletableFuture.supplyAsync(new MySupplier)
 *       CompletableFuture<returnType2> cf2 = cf1.thenApplyAsync(new Function<returnType1, returnType2>{
 *           public returnType2 apply(returnType1 res1) { return }
 *       })
 *       //实例2获得结果后的操作
 *       cf2.thenAccept(new Consumer<returnType2>{
 *          public void accept(returnType2 res2){ return }
 *       })
 *       cf2.join()
 */

public class CompletableFutureSequenceSample {
    static class Price {
        final String code;
        final float price;

        Price(String code, float price) {
            this.code = code;
            this.price = price;
        }
    }

    static class StockLookupSupplier implements Supplier<String> {
        String name;

        public StockLookupSupplier(String name) {
            this.name = name;
        }

        public String get() {
            System.out.println("lookup: " + name);
            try {
                String url = "http://suggest3.sinajs.cn/suggest/type=11,12&key=" + URLEncoder.encode(name, "UTF-8");
                String result = DownloadUtil.download(url);
                String[] ss = result.split(",");
                return ss[3];
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        String name = "上证指数";
        CompletableFuture<String> getStockCodeFuture = CompletableFuture.supplyAsync(new StockLookupSupplier(name));
        CompletableFuture<Price> getStockPriceFuture = getStockCodeFuture.thenApplyAsync(new Function<String, Price>() {
            public Price apply(String code) {
                System.out.println("got code: " + code);
                try {
                    String url = "http://hq.sinajs.cn/list=" + code;
                    String result = DownloadUtil.download(url);
                    String[] ss = result.split(",");
                    return new Price(code, Float.parseFloat(ss[3]));
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        });
        getStockPriceFuture.thenAccept(new Consumer<Price>() {
            public void accept(Price p) {
                System.out.println(p.code + ": " + p.price);
            }
        });
        getStockPriceFuture.join();
    }

}

