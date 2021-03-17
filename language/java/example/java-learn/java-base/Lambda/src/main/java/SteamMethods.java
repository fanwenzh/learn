import java.util.Arrays;
import java.util.stream.Stream;

/**
 * @author fwz
 * @date 2019-03-15 23:17
 * @desc
 */
public class SteamMethods {
    public static void main(String[] args) throws Exception {
        // map, forEach
        String[] array1 = "Stream API supports functional-style operations".split(" ");
        Stream<String> stream = Arrays.stream(array1);
        stream.map(String::toUpperCase).forEach(System.out::println);
        // filter
        String[] array = { "Java", " Python ", " ", null, "\n\n", " Ruby " };
        Stream<String> normalized = Arrays.stream(array).filter(s -> s != null && !s.trim().isEmpty())
                .map(s -> s.trim());
        normalized.forEach(System.out::println);
        // reduce
        int r = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9).reduce((acc, x) -> acc * x).get();
        System.out.println(r);
        // distinct 去重
        // limit 截取前n个元素
        // skip 跳过前n个元素
        // count, max, min, sum, average
        // allMatch, anymatch

    }
}
