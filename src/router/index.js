import Vue from 'vue'
import Router from 'vue-router'
import allinfo from '@/components/AllInfo'
import main from '@/components/SearchPanel'
import header from '@/components/Header'
import message from '@/components/Message'

Vue.use(Router)
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    { path: '/', redirect: '/header/main' },
    {
      path: '/header', name: 'header', component: header, children: [
        { path: '/header/main', name: 'main', component: main },
        { path: '/header/message', name: 'message', component: message },
        { path: '/header/allinfo', name: 'allinfo', component: allinfo },
      ]
    }
  ]
})


