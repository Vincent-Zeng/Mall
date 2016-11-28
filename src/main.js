import Vue from 'vue'
import App from './app'
import router from './routes'

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

const baseURL = 'http://192.168.1.106'

Vue.http.interceptors.push((request, next) => {
  request.url = `${baseURL}${request.url}`
  console.log(request.url)
})
