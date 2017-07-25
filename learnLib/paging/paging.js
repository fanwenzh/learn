// http://www.lovewebgames.com/jsmodule/paging.html
// 初始化
$('#pageTool').Paging({ pagesize: 10, count: 100 }); // Paging not a function-> pagination
var p = new Paging();
p.init({ target: '#pageTool', pagesize: 10, count: 100 })

// pagesize:每页的条数
// callback:function(page,size,count) //翻页时的回调方法，page为当前页码,size为每页条数，count为总页数
// current:1
// prevTpl: 上一页的模板,默认“上一页”
// nextTpl: 下一页的模板，默认“下一页”
// firstTpl: 首页的模板，默认“首页”
// lastTpl: 末页的模板，默认“末页”
// ellipseTpl: 省略号的模板，默认“...”
// toolbar: bool 是否显示工具栏,默认为false
// pageSizeList:[] 当显示工具栏时有效，可设置每页条数，默认为[5,10,15,20]
//  changePagesize:function(ps) 修改每页的条数,参数为int
// go:function(p) 跳转至某一页,默认到current
// render:function(ops) 重新渲染,ops:{count:int,pagesize:int,current:int,pagecount:int}