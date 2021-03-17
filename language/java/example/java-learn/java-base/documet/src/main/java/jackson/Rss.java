package jackson;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
/**
 * @author fwz
 * @date 2019-03-15 22:26
 * @desc
 */

@JacksonXmlRootElement(localName = "rss")
public class Rss {

    public Channel channel;

}

