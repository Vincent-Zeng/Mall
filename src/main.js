import Vue from 'vue'
import App from './app'
import router from './routes'
import VeeValidate, {Validator} from 'vee-validate'
Vue.use(VeeValidate)

// form validate
Validator.extend('verify_password', {
  getMessage: field => field + `must start with letter,length 6-18,letter and number and '_'`,
  validate: value => {
    var strongRegex = new RegExp('^[a-zA-Z]\\w{5,17}$')
    return strongRegex.test(value)
  }
})

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
