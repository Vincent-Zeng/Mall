import Vue from 'vue'
import App from './app'
import router from './routes'
import VeeValidate, { Validator } from 'vee-validate'
import VueCookie from 'vue-cookie'

Vue.use(VeeValidate)
Vue.use(VueCookie)

// form validate
Validator.extend('verify_password', {
  getMessage: field => field + `must start with letter,length 6-18,letter and number and '_'`,
  validate: value => {
    var strongRegex = new RegExp('^[a-zA-Z]\\w{5,17}$')
    return strongRegex.test(value)
  }
})

const baseURL = 'http://104.236.159.184:8080/web-ssm'

Vue.http.interceptors.push((request, next) => {
  request.url = `${baseURL}${request.url}`
  next()
})

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
