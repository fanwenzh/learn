d3.select("querySelector")
d3.selectAll(".querySelectorAll")

// 将数据绑定在数据集上
doms.datum(str) // 所有doms绑定text内容为str
doms.data(arr).text(function(data, index){}) // data和dom逐个匹配遍历

let s = selector
.append(s) // 末尾插入元素
.insert(s [, before]) // 开头加入元素
.remove() // 删除自身

let p = d3.select("body").selectAll("p").text(function(text, index){return text;})
p.style("color", "red").style("font-size", "15px");
// 在 body 中 id 为 myid 的元素前添加一个段落元素
body.insert('p', '#myid').text("insert p element").remove()

// 添加画布
// <svg class="svg">
//     <rect></rect>
//     <rect></rect>
// </svg>

var width = 300;  //画布的宽度
var height = 300;   //画布的高度
var svg = d3.select(".svg")     //选择文档中的body元素
    .append("svg")          //添加一个svg元素
    .attr("width", width)       //设定宽度
    .attr("height", height);    //设定高度

 d3.timer(function(){}) // 一直循环 
