import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * @author fwz
 * @date 2019-03-15 23:24
 * @desc Stream、Array和Collection的转换
 */
public class StreamTrans {
    public static void main(String[] args) {
        IntStream s = IntStream.of(1,2,3,4);
        // 无参时为Object[]
        Integer[] arr1 = Stream.of(1,2,3,4).toArray(Integer[]::new);
        List<Integer> list =  Stream.of(1,2,3,4).collect(Collectors.toList());

    }
}
