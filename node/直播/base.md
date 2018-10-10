# 直播协议
HLS(http live stream, Apple): m3u8(ts),兼容html5即可勃发
RTMP(Real Time Messaging Protocol, Adobe)协议: flv(实时性好),基于flash
http-flv: 将音视频数据封装成FLV, 通过HTTP协议传输给客户端
WebRTC?

## nginx
brew install nginx-full -with-rtmp-module
# 设置权限, 改变所有者
sudo chown - R fwz 文件夹位置
# 启动服务 # http://localhost:8080
brew services start nginx
# 关闭服务
brew services stop nginx
# 重新加载nginx
nginx - s reload
# 停止nginx
nginx - s stop
# nginx配置文件
vim /usr/local/etc/nginx/nginx.conf 

## ffmpeg
brew install ffmpeg
# 推流、切割视频
ffmpeg -re -i test.mp4 -vcodec libx264 -acodec aac -f flv rtmp://localhost:1935/rtmplive/rtmp
### 直播地址
1. [hls](http://127.0.0.1:7002/live/movie.m3u8)
2. [flv](http://127.0.0.1:7001/live/movie.flv)
3. [rtmp](rtmp://localhost:1935/live/movie)

#  播放器选择
vedio.js // 完整框架，包括ui
hls.js   // 适合做hls直播、点播
flv.js   // b站开源框架

## HLS 直播测试流
1. http://live.streamingfast.net/osmflivech4.m3u8
2. http://live.streamingfast.net/osmflivech5.m3u8
3. http://live.streamingfast.net/hls-live/goodtv/_definst_/liveevent/live-ch2-3.m3u8
4. http://live.streamingfast.net/hls-live/goodtv/_definst_/liveevent/live-ch5-2.m3u8
