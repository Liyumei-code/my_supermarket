import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload';

import toast from 'components/common/toast'
import FastClick from 'fastclick'

Vue.config.productionTip = false

Vue.prototype.$EventBus = new Vue()
Vue.use(toast)
// 使用vue懒加载
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

// 解决移动客户端300ms的延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
