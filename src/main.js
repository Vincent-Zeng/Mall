import Vue from 'vue'
import App from './app'
import router from './routes'

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
