// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import MintUI from 'mint-ui'
import './main.css'

Vue.use(MintUI)
// document.getElementsByTagName('body')[0].style.zoom = 0.9

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>',
  render: (h) => h(App)
}).$mount('#app')
