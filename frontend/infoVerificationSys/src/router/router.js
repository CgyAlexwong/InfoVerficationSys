import Vue from 'vue'
import Router from 'vue-router'
import routes from './index'

// 创建路由
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.num === 0) {
    document.title = to.meta.title;
    next()
  } else if (to.meta.num < from.meta.num) {
    document.title = from.meta.title;
    to.path = from.path;
    next(to.path)
  } else {
    document.title = to.meta.title;
    next()
  }
})

export default router
