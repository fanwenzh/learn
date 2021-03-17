import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Base64;

/**
 * @author fwz
 * @date 2019-03-14 16:43
 * @desc
 */
public class Encode {
    /**
     * @Description 编码算法 base64
     */
    public static void base64() throws UnsupportedEncodingException {
        String original = "Hello\u00ff编码测试";
        String b64 = Base64.getEncoder().encodeToString(original.getBytes("UTF-8"));
        System.out.println(b64);
        String ori = new String(Base64.getDecoder().decode(b64), "UTF-8");
        System.out.println(ori);
    }
    /**
     * @Description 编码算法 url
     */
    public static void url() throws UnsupportedEncodingException {
        String original = "URL 参数";
        String encoded = URLEncoder.encode(original, "UTF-8");
        System.out.println(encoded);
        String ori = new String(URLDecoder.decode(encoded, "UTF-8"));
        System.out.println(ori);
    }

    public static void main(String[] args) throws Exception{
        base64();
        url();
    }
}
