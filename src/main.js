import Vue from 'vue'
import App from './app'
import router from './routes'
import VeeValidate, { Validator } from 'vee-validate'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(VeeValidate)
Vue.use(VueCookie)
Vue.use(ElementUI, { locale })

// form validate
Validator.extend('verify_password', {
  getMessage: field => field + `must start with letter,length 6-18,letter and number and '_'`,
  validate: value => {
    var strongRegex = new RegExp('^[a-zA-Z]\\w{5,17}$')
    return strongRegex.test(value)
  }
})

const baseURL = 'http://106.14.70.91:8080/web-ssm'
// const baseURL = 'http://172.20.10.14:8080'

Vue.http.interceptors.push((request, next) => {
  request.url = `${baseURL}${request.url}`
  let ownerId = Vue.cookie.get('ownerId')
  let customerId = Vue.cookie.get('customerId')
  request.headers.set('Authorization', `ownerId=${ownerId};customerId=${customerId}`)
  next()
})
/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
