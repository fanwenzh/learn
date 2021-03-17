## ssr 配置
npm install vue vue-server-renderer --save
# vue 与 服务器集成
渲染 vue实例
```js
// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})

// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
```
服务端
```js
// server.js
// const Vue = require('vue')
// const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('/path/to/built-server-bundle.js')
server.get('*', (req, res) => {
  // [可以]通过传入一个"渲染上下文对象", 提供插值数据
  const context = { url: req.url }
  createApp(context).then(app => {
      renderer.renderToString(app, (err, html) => {
        if (err) {
          if (err.code === 404) {
            res.status(404).end('Page not found')
          } else {
            res.status(500).end('Internal Server Error')
          }
        } else {
          res.end(html)
        }
      })
    })
})
server.listen(8080)

```
通用代码解决方案
```js
// 1. 服务器上预取数据 "pre-fetching" data, 但禁用响应式数据
// 2. 只有 beforeCreate 和 created 会在服务器端渲染(SSR)过程中被调用
3. 访问特定平台(Platform-Specific) API // 服务端和客户端两套
4. 自定义指令
```
为每个请求创建一个新的根 Vue 实例，存储在服务器内存中
```js
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return { app, router, store }
}
```
客户端 entry
```js
// entry-client.js
import { createApp } from './app'
// 客户端特定引导逻辑……
const { app, router } = createApp()
// 运行加载所有模块
router.onReady(() => {
  app.$mount('#app')
})
```
服务器 entry
```js
// entry-server.js
import { createApp } from './app'
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
```
router配置
```js
// router.js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./components/Home.vue') },
      { path: '/item/:id', component: () => import('./components/Item.vue') }
    ]
  })
}
```
vuex获取首屏data
```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
import { fetchItem } from './api'
export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}
```
数据预获取
```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
import { fetchItem } from './api'
export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}
```