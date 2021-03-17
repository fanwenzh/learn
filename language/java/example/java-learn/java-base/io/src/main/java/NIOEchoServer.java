import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

/**
 * @author fwz
 * @date 2019-03-18 12:05
 * @desc
 */
public class NIOEchoServer {
    public void serve(int port) throws IOException {
        System.out.println("Listening for connections on port " + port);
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        ServerSocket ss = serverSocketChannel.socket();
        InetSocketAddress address = new InetSocketAddress(port);
        // 将ServerSocket绑定到指定的端口
        ss.bind(address);
        serverSocketChannel.configureBlocking(false);
        Selector selector = Selector.open();
        // 将channel注册到Selector里，并说明让Selector关注的连接事件
        serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);
        while(true) {
            try {
                // 阻塞等待就绪的Channel, 没有与客户端连接前就一直轮询
                selector.select();
            } catch (IOException e) {
                e.printStackTrace();
                // 业务处理
                break;
            }
            // 获取到Selector里所有就绪的SelectedKey实例，每将一个channel注册到一个selector就会产生一个Selecter
            Set<SelectionKey> readyKeys = selector.selectedKeys();
            Iterator<SelectionKey> iterator = readyKeys.iterator();
            while(iterator.hasNext()) {
                SelectionKey key = (SelectionKey) iterator.next();
                // 将就绪的SelectedKey从Selector中移除, 并进行处理
                iterator.remove();
                try {
                    // 若SelectedKey处于Acceptable状态
                    if (key.isAcceptable()) {
                        ServerSocketChannel server = (ServerSocketChannel) key.channel();
                        // 接收客户端的连接
                        SocketChannel client = server.accept();
                        System.out.println("Accepted connection from " + client);
                        client.configureBlocking(false);
                        // 向Selector注册socketchannel, 主要关注读写, 并掺入一个ByteBuffer实例供读写缓存
                        client.register(selector, SelectionKey.OP_READ | SelectionKey.OP_WRITE, ByteBuffer.allocate(100));
                    }
                    if (key.isReadable()) {
                        SocketChannel client = (SocketChannel) key.channel();
                        ByteBuffer output = (ByteBuffer) key.attachment();
                        // 从channel里读取数据存入ByteBuffer里
                        client.read(output);
                    }
                    // 若SelectedKey处于可写状态
                    if (key.isWritable()) {
                        SocketChannel client = (SocketChannel) key.channel();
                        ByteBuffer output = (ByteBuffer) key.attachment();
                        output.flip();
                        // 将ByteBuffer里的数据写入到channel里
                        client.write(output);
                        output.compact();
                    }

                } catch (IOException e) {
                    key.cancel();
                    try {
                        key.channel().close();
                    } catch (IOException ex) {}
                }
            }
        }
    }
}
