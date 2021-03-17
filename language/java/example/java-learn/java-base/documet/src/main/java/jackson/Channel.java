package jackson;

import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
/**
 * @author fwz
 * @date 2019-03-15 22:25
 * @desc
 */

public class Channel {
    public String title;
    public String description;
    public String language;
    public int ttl;
    public String category;

    @JacksonXmlProperty(localName = "item")
    // 不会从itemsC子节点查找items
    @JacksonXmlElementWrapper(useWrapping = false)
    public List<Item> items = Collections.emptyList();

}
