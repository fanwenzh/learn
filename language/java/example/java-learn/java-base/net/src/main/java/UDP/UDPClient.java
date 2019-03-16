package UDP;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.charset.StandardCharsets;
/**
 * @author fwz
 * @date 2019-03-15 19:04
 * @desc DatagramSocket sock = new DatagramSocket()
 *       sock.connect(addr, 9090)
 *       // 发送
 *       byte[] data =
 *       DatagramPacket packet = new DatagramPacket(data, data.length);
 *       sock.send(packet);
 *       // 接收
 *       byte[] buffer = new byte[1024];
 *       DatagramPacket resp = new DatagramPacket(buffer, buffer.length);
 *       sock.revceive(resp);
 */
public class UDPClient {
    public static void main(String[] args) throws Exception {
        InetAddress addr = InetAddress.getLoopbackAddress();
        try (DatagramSocket sock = new DatagramSocket()) {
            sock.connect(addr, 9090);
            byte[] data = "time".getBytes(StandardCharsets.UTF_8);
            DatagramPacket packet = new DatagramPacket(data, data.length);
            sock.send(packet);
            System.out.println("Data was sent.");
            Thread.sleep(1000);
            byte[] buffer = new byte[1024];
            DatagramPacket resp = new DatagramPacket(buffer, buffer.length);
            sock.receive(resp);
            byte[] respData = resp.getData();
            String respText = new String(respData, 0, resp.getLength(), StandardCharsets.UTF_8);
            System.out.println("Response: " + respText);
        }
    }
}
