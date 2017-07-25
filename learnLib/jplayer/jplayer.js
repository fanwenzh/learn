// http: //www.jplayer.cn/developer-guide.html#jPlayer-option-ready
jpObject.jPlayer("setMedia", { options })

$(this).JPlayer({
    ready: function() {}, //消除JS代码和Flash代码间的竞态条件
    timeupdate: function(event) { // 数据更新
        $('.info').attr("style", "width: " + event.jPlayer.status.currentPercentAbsolute + "%");
    },
    play: function(event) {},
    pause: function(event) {},
    ended: function(event) {},
    swfPath: '', //swf文件路径
    cssSelectorAncestor: '.playbox', // 定义所有cssSelect祖先的cssSelector
    supppied: 'mp3', // Firefox 3.6的设置
    wmode: 'window'
})