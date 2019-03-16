import java.util.Arrays;

/**
 * @author fwz
 * @date 2019-03-15 23:09
 * @desc 创建Stream
 *       1) Stream<Integer> s = Stream.of(1,2,3,4);       // Stream.of(T... t);
 *       2) Stream<Integer> s = Arrays.stream(theArray);  // Arrays.stream(array);
 *       3) Stream<Integer> s = aList.stream();           // collection.stream()
 *       4) implements Supplier<T>
 *       IntStream, LongStream, DoubleStream 避免装箱拆箱操作
 */
public class StreamBasic {

    public static void main(String[] args) throws Exception {
        String[] array = "JDK Stream API supports functional-style operations".split(" ");
        // array -> stream:
        long n = Arrays.stream(array)
                // .filter((s) -> s.equals(s.toUpperCase()))
                .count();
        System.out.println("How many words? " + n);
    }
}
