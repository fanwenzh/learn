package TCP.mult;

import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author fwz
 * @date 2019-03-15 18:57
 * @desc socket循环accept
 */
public class TCPServer {
    public static void main(String[] args) throws Exception {
        @SuppressWarnings("resource")
        ServerSocket ss = new ServerSocket(9090);
        System.out.println("TCP server ready.");
        while(true){
            Socket sock = ss.accept();
            System.out.println("Accept from " + sock.getRemoteSocketAddress());
            TimeHandler handler = new TimeHandler(sock);
            handler.start();
        }
    }

    static class TimeHandler extends Thread {
        TimeHandler(Socket socket) {

        }

        @Override
        public void run() {
            super.run();
        }
    }
}
