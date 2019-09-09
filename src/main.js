import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import routes from './router'
import Notifications from 'vue-notification'
import 'es6-promise/auto'
import axios from 'axios'
import { store } from './store'
import * as moment from 'moment'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Notifications)

Vue.prototype.$http = axios
Vue.prototype.$moment = moment
Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
