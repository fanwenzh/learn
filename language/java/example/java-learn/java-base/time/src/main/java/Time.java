import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * @author fwz
 * @date 2019-03-16 10:10
 * @desc 时间处理: Date, LocalDateTime
 */
public class Time {
    public static void main(String[] args) throws ParseException {
        // java.util.Date同时表示日期和时间 java.sql.Date仅表示日期 // 小于jdk1.8: java.util.Date/Calendar
        Date now = new Date();
        long nowLon = now.getTime();
        String nowStr = now.toString(); // .toLocaleStream()
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String s = sdf.format(now);
        Date newDate = sdf.parse("2019-11-10 13:14:15");

        // java.time.LocalDate/LocalTime/LocalDateTime // 大于1.8, 无法和long类型进行直接转换
        LocalDateTime dt = LocalDateTime.now(); // 2019-11-10T15 13:14:15
        LocalDateTime dt1 = LocalDateTime.of(2019, 11, 30, 23, 20, 30);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        dtf.format(dt1);
        LocalDateTime dt2 = LocalDateTime.parse("2018-11-30 13:14:15", dtf);
        LocalDate d = LocalDate.parse("2018-11-30");
        LocalTime t = LocalTime.parse("15:16:17");
        dt2.plusDays(1); // 添加了日期时间的计算
        dt2.isAfter(dt1); // .isBefore(), .util()

        // java.sql.Time仅表示时间
        // java.sql.Date 仅表示日期
        // java.sql.Timestamp 表示数据库的TIMESTAMP类型
        // 使用long类型作为中间类型存储、转换
        Long secend = dt.toEpochSecond(ZoneOffset.of("+8"));
        Long milliSecond = dt.toInstant(ZoneOffset.of("+8")).toEpochMilli();
        Date OriD = Date.from(dt.toInstant(ZoneOffset.of("+8")));
        LocalDateTime NewD = OriD.toInstant().atOffset(ZoneOffset.of("+8")).toLocalDateTime();
    }
}
