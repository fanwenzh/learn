## html5和css3简介
polyfill 浏览器兼容

## html5样式的标记
1. html5: 
```
<!doctyle html>
<html lang="en">
    <head>
    // 兼容ie
    <!--[if lt IE 9]>
        <script src="js/script.js" defer async></script>
    <![endif]-->
    // 简化meta标签
    <meta charset="utf-8">// <meta http-equiv="Content-Type" content="text/html;charset=utf-u">
    </head>
</html>
```
3. 标签
```
header, nav, section, article, aside, footer, details
<progress min="0" max="100" value="0"></progress>
```
4. 表单
```
<form>
    <ul>
        <li>
            <label for="na,e"></label>
            <!--pattern可指定RegExp格式, autofocus  -->
            <input type="text" required palceholder="" pattern=""></input>
        </li>
    </ul>
</form>
<!--属性：autofucus, multiple  -->
<!--input type:button, checkbox, file, hidden, image, password, radio, reset, submit,text  
html5: search, email, url, tel, datetime, date, month, week, time, datetime-local,number, range, color -->
```
5. 音频视频
```
<!--controls启用本机控件  -->
<vedio src=url width="" height="" controls autoplay loop>
    <source scr="1.mp4" type="video/mp4">
</vedio>
var video = document.querySelector('vedio')
vedio.play()
vedio.pause() // vedio.paused === true
vedio.muted = true; // 静音
vedio.addEventListener('ended',()=>{}) // ended, timeupdate, error, 
vedio.playbackRate
vedio.src
vedio.readyState // 1-4
vedio.duration // 总播放时长
```
6. css3
```
:nth-child(n)
:nth-last-child(n)
:first-child
:last-child
:not(query)
<!--颜色  -->
rgba(0,0,0,1)
hsla(0-360, 10%,10%, .5) // 色调, 饱和度, 亮度
<!--圆角  -->
border-radus
box-shadow // 可内嵌多个shadow
```
7. 渐变和多背景
```
// 渐变
linear-gradient(30deg, #000 0%, #FFF 100%); // 线性渐变
radial-gradient(#FFF, #000) // 径向渐变
repeating-linear-gradient() // 重复渐变
// 多背景
background-color
background-position
background-size: 100px auto
    ,contain // 缩放图像的同时保持其长宽比
    ,cover // 完全覆盖元素，背景可能被裁剪
background-repeat
background-clip:border-box
background-origin:padding-box
background-attachment: scroll
background-img: url()

```
8. 转换和过渡
```
transition: property during time-function delay
transform: tanslate  scale  rotate skew //倾斜skew(x, y)
transform-origin
// animation
keyframs 'name' {
    0, 100% {
        opacity: 0
    }
    20%, 80% {
        opacity: 1
    }
}
.div {
    animation: 'name' duration time-function count direction delay fill-mode
    // direction: normal, alternate 迭代时反向播放
    // fill-mode: none forwords-停留在结束帧 backwards-停留在初始帧 both 
}
```
9. 嵌入字体和多列布局
```
@font-face {
    font-family: 'fontName';
    src: url() format('woff'),
        url() format('truetype');
    font-weight: bold;
    font-sytle: italic
}
// 多列划分
column-count: n
column-gap: 10px
column-width:
// 媒体查询
@media only screen and (min-device-width: 320px) and (max-device-width: 480px)
```
10. 地理定位、离线web应用和web存储