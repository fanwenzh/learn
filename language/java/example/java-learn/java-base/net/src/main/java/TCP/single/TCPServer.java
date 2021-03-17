package TCP.single;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

/**
 * @author fwz
 * @date 2019-03-15 17:15
 * @desc ServerSocket ss = new ServerSocket(port);
 *       Socket sock = ss.accept();
 *       InputStream in = socket.getInputStream();
 *       OutputStream out = socket.getOutputStream();
 */
public class TCPServer {
    public LocalDateTime currentTime() {
        return LocalDateTime.now();
    }

    public static void main(String[] args) throws IOException {
        ServerSocket ss = new ServerSocket(9090);
        System.out.println("TCP server is ready");
        Socket sock = ss.accept();
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(sock.getInputStream(), StandardCharsets.UTF_8));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(sock.getOutputStream(), StandardCharsets.UTF_8));
            String rec = reader.readLine();
            if(rec.equals("time")) {
                writer.write(LocalDateTime.now().toString() + "\n");
                writer.flush();
            } else {
                writer.write("Sorry?\n");
                writer.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
