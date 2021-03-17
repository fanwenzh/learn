import org.bouncycastle.pqc.math.linearalgebra.ByteUtils;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;

/**
 * @author fwz
 * @date 2019-03-14 16:45
 * @desc 摘要算法/哈希算法/Digest
 * MD5:128bit, SHA-1: 160bits, SHA-256: 256bits, SHA-512: 512bits, RipeMD-160:160bits
 */
public class Digest {
    /**
     * @Description MD5, 如Object.hashCode(), 验证文件完整性
     */
    public static byte[] toMD5(byte[] input) {
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        md.update(input);
        return md.digest();
    }
    public static void testMD5() throws Exception{
        String s = "MD5摘要算法测试";
        String salt = "helloworld";
        byte[] r = toMD5((salt + s).getBytes("UTF-8"));
        System.out.println(String.format("%032x", new BigInteger(1, r)));
    }

    /**
     * @Description BouncyCastle 第三方算法提供商
     */
    public static byte[] digest(String hashAlgorithm, byte[] input) {
        MessageDigest md;
        try {
            md = MessageDigest.getInstance(hashAlgorithm);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        md.update(input);
        return md.digest();
    }

    public static void testDigest() throws UnsupportedEncodingException {
        String s = "Java摘要算法测试";
        byte[] input = s.getBytes("UTF-8");
        byte[] r1 = digest("MD5", input);
//        System.out.println(r1.length + ": " + new BigInteger(1, r1));
        System.out.println(r1.length + ": " + ByteUtils.toHexString(r1));
        byte[] r2 = digest("SHA-1", input);
        System.out.println(r2.length + ": " + ByteUtils.toHexString(r2));
        byte[] r3 = digest("SHA-256", input);
        System.out.println(r3.length + ": " + ByteUtils.toHexString(r3));
        // 把BouncyCastle作为Provider添加到java.security中, 原jdk不提供RipeMD160算法
        // Security.addProvider(new BouncyCastleProvider());
        byte[] r4 = digest("RipeMD160", input);
        System.out.println(r3.length + ": " + ByteUtils.toHexString(r4));
    }

    /**
     * @Description hmac
     */
    public static byte[] hmac(String hmacAlgorithm, SecretKey skey, byte[] input) throws Exception {
        Mac mac = Mac.getInstance(hmacAlgorithm);
        mac.init(skey);
        mac.update(input);
        return mac.doFinal();
    }
    public static void testHmac() throws Exception {
        // http://docs.oracle.com/javase/6/docs/technotes/guides/security/StandardNames.html#Mac
        String algorithm = "HmacSHA1";
        // 原始数据:
        String data = "helloworld";
        // 随机生成一个Key:
        KeyGenerator keyGen = KeyGenerator.getInstance(algorithm);
        SecretKey skey = keyGen.generateKey();
        // 打印Key:
        byte[] key = skey.getEncoded();
        // String.format("%0"+length+"d", long)
        // x表示16进制, d为十进制
        // 前面达不到length时用0表示
        System.out.println(String.format("Key: %0" + (key.length * 2) + "x", new BigInteger(1, key)));
        // 用这个Key计算HmacSHA1:
        byte[] result = hmac(algorithm, skey, data.getBytes("UTF-8"));
        System.out.println(String.format("Hash: %0" + (result.length * 2) + "x", new BigInteger(1, result)));
    }

    public static void main(String[] args) throws Exception {
         testDigest();
        // testHmac();
        // testMD5();
    }
}
