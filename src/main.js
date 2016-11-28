import Vue from 'vue'
import App from './app'
import router from './routes'
import fetchIntercept from 'fetch-intercept'

fetchIntercept.register({
  request (url, config) {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://192.168.1.106/' : 'http://192.168.1.106/'
    const _config = {
      headers: {
      },
      ...config
    }

    if (_config.method === 'POST' || _config.method === 'PUT') {
      _config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }

    return [`${baseUrl}${url}`, _config]
  },

  requestError (error) {
    return Promise.reject(error)
  },

  response (response) {
    return response
  },

  responseError (error) {
    return Promise.reject(error)
  }
})

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
