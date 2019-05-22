import Vue from 'vue'
import Router from 'vue-router'
import routes from './index'

// 创建路由
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if(to.matched.length === 0){
    next('/stu')
  }
  else {
    if (to.meta.num === 0) {
      document.title = to.meta.title
      next()
    } else if (to.meta.num < from.meta.num) {
      document.title = from.meta.title
      to.path = this.path
      next(to.path)
    } else {
      document.title = to.meta.title
      next()
    }
  }
})

export default router
