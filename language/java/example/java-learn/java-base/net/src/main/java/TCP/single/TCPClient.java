package TCP.single;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

/**
 * @author fwz
 * @date 2019-03-15 17:15
 * @desc Socket sock = new Socket(InetAddress, port);
 *       InputStream in = sock.getInputStream();
 *       OutputStream out = sock.getOutputStream();
 */
public class TCPClient {
    public static void main(String[] args) {
        InetAddress addr = InetAddress.getLoopbackAddress(); // 127.0.0.1
        try (Socket sock = new Socket(addr, 9090)) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(sock.getInputStream(), StandardCharsets.UTF_8));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(sock.getOutputStream(), StandardCharsets.UTF_8));
            writer.write("time\n");
            writer.flush();
            String res = reader.readLine();
            System.out.println("Response:" + res);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
