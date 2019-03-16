import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author fwz
 * @date 2019-03-14 15:51
 * @desc
 */
public class Main {
    public static void main(String[] args) {
        // \d: 0-9
        // \w: a-z, A-Z, 0-9, _
        // \s: 空格, Tab键
        // \d?? 非贪婪匹配
        Pattern pattern = Pattern.compile("(\\d{1})-(\\d{1})");
        Matcher matcher = pattern.matcher("12-3");
        // matcher.find(), matcher.start(), matcher.end()
        if (matcher.matches()) {
            String m1 = matcher.group(0); // 整串
            String m2 = matcher.group(1); // 第一个分组
        }

    }
}
