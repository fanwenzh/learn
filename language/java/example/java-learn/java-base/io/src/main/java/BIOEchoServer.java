import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author fwz
 * @date 2019-03-18 11:36
 * @desc
 */
public class BIOEchoServer {
    public void serve(int port) throws IOException {
        final ServerSocket socket = new ServerSocket(port);
        while(true) {
            // 阻塞直到收到新的客户端
            final Socket clientSocket = socket.accept();
            System.out.println("Accepted connection from " + clientSocket);
            // 创建子线程处理客户端请求
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try(BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                        PrintWriter writer = new PrintWriter(new OutputStreamWriter(clientSocket.getOutputStream()))) {
                        // 直接回写客户端读取数据
                        while(true) {
                            writer.println(reader.readLine());
                            writer.flush();
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }).start();
        }
    }
    /**
     * @Description java(非Go)线程开销较大, 引用线程池处理
     */
    public void improvedServe(int port) throws IOException {
        final ServerSocket socket = new ServerSocket(port);
        ExecutorService executorService = Executors.newFixedThreadPool(6);
        while(true) {
            final Socket clientSocket = socket.accept();
            System.out.println("Accepted connection from " + clientSocket);
            executorService.execute(()->{
                try(BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                    PrintWriter writer = new PrintWriter(new OutputStreamWriter(clientSocket.getOutputStream()))) {
                    // 直接回写客户端读取数据
                    while(true) {
                        writer.println(reader.readLine());
                        writer.flush();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
    }
}
