import React, {Component} from "react"
import {BrowserRouter,Router, Switch, Route, Link} from 'react-router-dom'

let oDiv = document.getElementById('d1')
ReactDOM.render(<p>hi</p>, oDiv)

class Obj extends Component{
  constructor(...args) {
    super(...args)
    this.name = 'name'
    this.className = 'cName'
  }

  fn() {
    // this.state.color = "red"
    this.setState({
      color: 'red'
    })
    console.log(this.props.data)
  }

  render() {
    return (
    <BrowserRouter>
        // 内容
      <div className={this.className}>
        <label htmlFor="hi"></label>
        <input id="hi" type="button" onClick={this.fn.bind(this)}/>
        <li sytle={{ color: this.state.color}}>{this.name}</li>
      </div>
      // 导航
      <Link to="/">跳转1</Link>
      <Link to="/user">跳转2</Link>
      // 路由
      <Switch>
        <Route exact path="/" component={}/>
        <Route exact path="/user/:id" component={}/>
        // this.props.match,params.id
      </Switch>
    </BrowserRouter>)
  }
}

ReactDom.render(<Obj data="[1,2,3,4]"></Obj>)

// -----------------------------------------------------

ReactDom.render(Rhtml, oDiv)

// -----------------------------------------------------

// 1.JSX可以直接创建组件——直接写组件的HTML
//   * 创建出来的是组件——不是HTML标签
// 2.有且仅有一个父级
// 3.class-> className
// for-> htmlFor

// -----------------------------------------------------

// 1.所有组件必须继承自React.Component
// 2.必须：
// i.有constructor、并且super
// ii.首字母必须大写
// iii.有render方法

// -----------------------------------------------------

  // <div a="xxx"> 字符串
  // <div a={ xxx }> 变量

// -----------------------------------------------------

// 传参
name = "str"
name = { xxx }
// <MyClass data={}></MyClass>
this.props.data = '只读' // 但无法检测Array.push()
// 事件
onClick = { this.fn.bind(this) }
// 状态
this.state = {} // constructor初始化
this.state.data // 读取
this.setState({}) // 修改

// -----------------------------------------------------

// 组件通信: Flux、Redux
// 1.父级 -> 子级: 属性
// 父级 < Child data = { attr } > -> 子级this.props
// 2.子级-> 父级: 方法
// 子级this.props.fn -> 父级 <Child fn={ fatherFn }>
// 父级
// <Child fn={this.fn.bind(this)} data={this.state.data}>
// <Child2 ref="c1"></Child2>
// fn() {
//   let newData = this.state.data
//   newData = otherData
//   this.setState({data: newData})
//   this.refs.c1.child1fn()
// }
// 子级
// <input type="button" value="点击" onCLick={childFn}>
// childFn(){
//   this.props.fn(this.props.data)
// }

// -----------------------------------------------------

import {createStore} from 'redux'

let store = createStore(function (state={}, action){
  switch(action.type) {
    case 'action1':
      // doSomething
    default: 
      break
  }
  return state
})

this.state = {
  attr: store.getState().attr
}
store.dispatch({type:'fn'})
store.getState()
store.subscribe(()=> { // 修改状态
  this.setState({
    attr: store.getState().attr
  })
})

// -----------------------------------------------------

生命周期
componentWillMount
componentDidMount
componentWillReceiveProps
shouldComponentUpdate //返回一个布尔值。在组件接收到新的props或者state时被调用
componentWillUpdate
componentDidUpdate
componentWillUnmount

// -----------------------------------------------------

// stype="" => style={{}}
// keep-live 缓存组件 // 同vue