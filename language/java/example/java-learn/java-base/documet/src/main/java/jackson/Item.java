package jackson;

import java.time.ZonedDateTime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
/**
 * @author fwz
 * @date 2019-03-15 22:26
 * @desc
 */
public class Item {
    public String title;
    public String link;
    public String author;
    public String category;

    @JsonSerialize(using = ZonedDateTimeSerializer.class)
    @JsonDeserialize(using = ZonedDateTimeDeserializer.class)
    public ZonedDateTime pubDate;

    public String description;

}