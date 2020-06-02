import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import "./axios"
import mavonEditor from 'mavon-editor'
import "mavon-editor/dist/css/index.css"
import "./permission"
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
