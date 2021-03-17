import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousServerSocketChannel;
import java.nio.channels.AsynchronousSocketChannel;
import java.nio.channels.CompletionHandler;
import java.util.concurrent.CountDownLatch;

/**
 * @author fwz
 * @date 2019-03-18 13:02
 * @desc
 */
public class AIOEchoServer {
    public void serve(int port) throws IOException {
        System.out.println("Listening for connections on port " + port);
        final AsynchronousServerSocketChannel serverChannel = AsynchronousServerSocketChannel.open();
        InetSocketAddress address = new InetSocketAddress(port);
        // 将ServerSocket绑定到指定的端口
        serverChannel.bind(address);
        final CountDownLatch latch = new CountDownLatch(1);
        // 开始接收新的客户端请求, 一旦一个客户端请求被接收, CompletionHandler就会被调停
        serverChannel.accept(null, new CompletionHandler<AsynchronousSocketChannel, Object>() {
            @Override
            public void completed(AsynchronousSocketChannel channel, Object attachment) {
                // 一旦处理完成, 再次接收新的客户端请求
                serverChannel.accept(null, this);
                ByteBuffer buffer = ByteBuffer.allocate(100);
                // 在channel里植入一个读操作EchoCompletionHandler，一旦buffer有数据吸入, EchoCompletionHander就会被唤醒
                channel.read(buffer,buffer,new EchoCompletionHandler(channel));
            }

            @Override
            public void failed(Throwable exc, Object attachment) {
                try {
                    serverChannel.close();
                } catch (IOException e) {

                } finally {
                    latch.countDown();
                }
            }
        });
    }
    private final class EchoCompletionHandler implements CompletionHandler<Integer, ByteBuffer> {
        private final AsynchronousSocketChannel channel;

        EchoCompletionHandler(AsynchronousSocketChannel channel) {this.channel = channel;}

        @Override
        public void completed(Integer result, ByteBuffer buffer) {
            if (buffer.hasRemaining()) {
                // 如果buffer还有内容, 则再次出发写入操作, 将buffer里的内容写入channel
                channel.write(buffer);
            } else {
                // 清除buffer内容
                buffer.compact();
                // 如果channel里还有内容需要读入buffer里, 则再次出发写入操作将channel里的内容读入channel
                channel.read(buffer, buffer, EchoCompletionHandler.this);
            }
        }

        @Override
        public void failed(Throwable exc, ByteBuffer attachment) {
            try {
                channel.close();
            } catch (IOException e) {

            }
        }
    }
}
