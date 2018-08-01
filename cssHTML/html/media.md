```js
// <audio id="audio" src="" controls autoplay loop></audio> 
// <video id="video"  src="" controls autoplay loop muted poster="封面图片.jpg">
// 	<!-- 播放速度设置：playbackRate兼容性不好
// 	1. 服务器保存多个速度的视频
// 	2. 点播时调整码率，浏览器负载大
// 	试看5分钟：
// 	1. 切成两个视频
// 	下载按钮
// 	1. 通过流视频
// 	 -->
// 	<source src="" type="audio/mp3">
// 字幕文件
// <track kind="" src="" default><track/>
// </video>
let video = document.getElementBYId('video')
video.addEventListener('error', function(){
  let error = video.error
  switch(error.code)
  {
    case 1:
      console.log('下载过程被终止')
      break
    case 2:
      console.log('网络发生故障被终止')
      break
    case 3:
      console.log('解码失败')
      break
    case 4:
      console.log('媒体资源格式不支持')
      break
  }
}, false)
video.addEventListener('progress', function(e){
  if(video.networkState == 2) { // 正在加载中
    console.log('总共' + e.total + 'byte, 已下载' + e.loaded)
  } else if (video.networkState == 3){
    console.log('媒体资源格式不支持')
  }
})
video.play()
video.pause()
video.load() // 重新载入媒体

```