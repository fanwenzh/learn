package MyCompletableFuture;

import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;
import java.util.function.Supplier;
/**
 * @author fwz
 * @date 2019-03-14 23:31
 * @desc anyOf并行CompletableFuture, 返回最先返回的异步CompletableFuture
 *       allOf并行CompletableFuture, 只能用CompletableFuture<Void>类型接收, 当所有的返回执行异步thenAccept
 * @use  CompletableFuture<returnType> res = CompletableFuture.anyOf(s1, s2)
 *       res.thenAccept(new Consumer(){
 *            public void accept(returnType result) {
 *                 System.out.println("Reuslt: " + result);
 *             }
 *       })
 *       res.join()
 */
public class CompletableFutureAnyOfSample {

    static class StockPrice {
        final float price;
        final String from;

        StockPrice(float price, String from) {
            this.price = price;
            this.from = from;
        }

        public String toString() {
            return "Price: " + price + " from " + from;
        }
    }

    static class StockFromSina implements Supplier<StockPrice> {

        @Override
        public StockPrice get() {
            String url = "http://hq.sinajs.cn/list=sh000001";
            System.out.println("GET: " + url);
            try {
                String result = DownloadUtil.download(url);
                String[] ss = result.split(",");
                return new StockPrice(Float.parseFloat(ss[3]), "sina");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    static class StockFromNetease implements Supplier<StockPrice> {

        @Override
        public StockPrice get() {
            String url = "http://api.money.126.net/data/feed/0000001,money.api";
            System.out.println("GET: " + url);
            try {
                String result = DownloadUtil.download(url);
                int priceIndex = result.indexOf("\"price\"");
                int start = result.indexOf(":", priceIndex);
                int end = result.indexOf(",", priceIndex);
                return new StockPrice(Float.parseFloat(result.substring(start + 1, end)), "netease");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        CompletableFuture<StockPrice> getStockFromSina = CompletableFuture.supplyAsync(new StockFromSina());
        CompletableFuture<StockPrice> getStockFromNetease = CompletableFuture.supplyAsync(new StockFromNetease());
        CompletableFuture<Object> getStock = CompletableFuture.anyOf(getStockFromSina, getStockFromNetease);
        getStock.thenAccept(new Consumer<Object>() {
            public void accept(Object result) {
                System.out.println("Reuslt: " + result);
            }
        });
        getStock.join();
    }

}
