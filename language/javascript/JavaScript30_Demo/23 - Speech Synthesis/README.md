# 23 - Speech Synthesis
1. SpeechSynthesisUtterance
```
// 创建语音输出实例
const msg = new SpeechSynthesisUtterance();
// 设置阅读选项
msg.text = value;
msg.rate = 1
msg.pitch 1 // 音调?
msg.voice = 'en-US' // 英语类别 通过voiceschanged事件监听

// 停止、开始阅读
speechSynthesis.cancel()
speechSynthesis.speak(msg)
```
2. css
```
// 相当好看的连笔英语书写
 font-family: 'Pacifico', cursive;
 // 1/6圆
radial-gradient(circle at 100% 150%, #3BC1AC 24%, #42D2BB 25%, #42D2BB 28%, #3BC1AC 29%, #3BC1AC 36%, #42D2BB 36%, #42D2BB 40%, transparent 40%, transparent),
```