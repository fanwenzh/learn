import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;
/**
 * @author fwz
 * @date 2019-03-15 20:54
 * @desc SAX流式解析XML
 */
class MyHandler extends DefaultHandler {

    void print(Object... objs) {
        for (Object obj : objs) {
            System.out.print(obj);
            System.out.print(" ");
        }
        System.out.println();
    }

    @Override
    public void startDocument() throws SAXException {
        print("start document");
    }

    @Override
    public void endDocument() throws SAXException {
        print("end document");
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        print("start element:", localName, qName);
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        print("end element:", localName, qName);
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        print("characters:", new String(ch, start, length));
    }

    @Override
    public void error(SAXParseException e) throws SAXException {
        print("error:", e);
    }

}


public class SAXSample {

    static final String XML_URL = "http://rss.sina.com.cn/tech/internet/home28.xml";

    public static void main(String[] args) throws Exception {
        SAXParserFactory spf = SAXParserFactory.newInstance();
        SAXParser saxParser = spf.newSAXParser();
        saxParser.parse(XML_URL, new MyHandler());
    }
}

