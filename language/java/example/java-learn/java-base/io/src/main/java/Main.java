import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.NoSuchPaddingException;
import java.io.*;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author fwz
 * @date 2019-03-14 15:09
 * @desc io接口, flush()强制输出
 */
public class Main {
    public void main(String[] args) throws IOException, NoSuchAlgorithmException, NoSuchPaddingException {
        // 字节流 InputStream, OutputStream
        // 字符流 Reader, Writer

        // 文件操作
        File file = new File("test.txt");
        file.isFile(); file.isDirectory();
        file.canRead(); file.canWrite(); file.canExecute();
        file.length();
        file.delete();
        file.deleteOnExit(); // JVM退出时删除
        // File.createTempFile();
        // 目录操作
        file.list(); // 所有文件名和子目录名
        File[] files = file.listFiles();
        file.mkdir(); // file.mkdirs()

        // InputStream: FileInputStream, ByteArrayInputStream
        InputStream in1 = new FileInputStream(file);
        InputStream in2 = new ByteArrayInputStream(new byte[10]);
        OutputStream out1 = new FileOutputStream(file);
        OutputStream out2 = new ByteArrayOutputStream(10);
        try {
            // 阻塞
            int read = in1.read();
            int read2 = in2.read(new byte[10]);
            out1.write(new byte[10]);
            out2.write(new byte[10]);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            in1.close();
            in2.close();
        }

        // Filter模式(装饰者模式)
        // 直接提供数据的InputStream
        // FileInputStream // 从文件读取流
        // ByteArrayInputStream // 读取字节流
        // ServletInputStream // 从HTTP请求中读取数据
        // Socket.getInputStream 从TCP连接读取数据
        InputStream in3 = new FileInputStream("text.txt");
        InputStream bin3 = new BufferedInputStream(in3);
        InputStream Din3 = new DigestInputStream(in3, MessageDigest.getInstance("MD5")); // 添加签名: SHA1, SHA256
        InputStream Cin3 = new CipherInputStream(in3, Cipher.getInstance("MD5")); // 解密
        // InputStream Gin3 = new GZIPInputStream(in3, 30);

        // 读取classpath的资源
        InputStream inputStream = getClass().getResourceAsStream("default.properties");
        // 序列化: 将java对象变成二进制内容(byte[])

        // 字符流char
        Reader reader0 = new InputStreamReader(in3,  "UTF-8");
        Reader reader1 = new FileReader(new File("text.txt"));
        Reader reader2 = new CharArrayReader(new char[10]);
        // read(), read(new char[10])
        Writer writer0 = new OutputStreamWriter(out1, "UTF-8");
        Writer writer1 = new FileWriter(new File("text2.txt"));
        Writer writer2 = new CharArrayWriter(10);
    }
}

