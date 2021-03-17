import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author fwz
 * @date 2019-03-15 22:50
 * @desc 简化单方法接口: Comparator, Runnable, Callable
 */
class Person {
    String name;
    public Person(String name) {
        this.name = name;
    }
}

public class LambdaSample {

    public static void main(String[] args) throws Exception {
        String[] words = "Improving code with Lambda expressions in Java".split(" ");
        // 原
        Arrays.sort(words, new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                // 忽略大小写排序:
                return s1.toLowerCase().compareTo(s2.toLowerCase());
            }
        });
        // lambda
        Arrays.sort(words, (s1, s2) -> {
           return s1.toLowerCase().compareTo(s2);
        });

//        隐含第一个参数
//        String str1 = "123", str2 = "234";
//        str1.compareToIgnoreCase(str2);
//        Comparator.compare(str1, str2);
        Arrays.sort(words, String::compareToIgnoreCase);

        System.out.println(Arrays.toString(words));

        List<String> names = Arrays.asList("abc", "bcd", "cef");
        List<Person> persons = names.stream().map(Person::new).collect(Collectors.toList());
    }
}
